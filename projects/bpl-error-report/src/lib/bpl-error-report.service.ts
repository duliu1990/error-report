/**
 * Copyright 2019 @bpl. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Configuration, LogLevel } from './configuration';
import { ErrorMessage } from './error-message';
import { isUndefined } from 'util';
import { isOBJByType, isRepeat, report_log_tostring, getOriginalError, getDebugContext, getType } from './util';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BplErrorReportService {

  private config: Configuration;

  private errorMsg: any[] = [];

  private submitErros: any[] = [];

  private comboTimeout;

  constructor() { }

  init(config: any): void {

    this.config = config;

    if (this.config.delay == undefined) {
      this.config.delay = (5 * 1000);
    }

    if (this.config.random == undefined) {
      this.config.random = 1;
    }

    if (this.config.logLevel == undefined) {
      this.config.logLevel = 'info';
    }

    if (this.config.repeat == undefined) {
      this.config.repeat = 5;
    }
  }

  /**
   * Handle the ng error
   * 
   * @param error 
   */
  notifyError(error): void {

    if (!error)
      return;

    window.console && console.error(error);

    //http error
    if (error instanceof HttpErrorResponse) {

      let errorMsg: ErrorMessage = this.processError(error.message, 'error', error.name);

      errorMsg.setResponseStatusCode(error.status);
      errorMsg.setUrl(error.url);

      this.push(errorMsg);
    }

    if (error instanceof Error) {
      this.report(error.message, 'error', error.name);
    }

  }

  /**
   * 
   * @param error 
   */
  push(error): void {
    if (!error)
      return;

    this.errorMsg.push(error);

    this.processLog(false);
  }

  /**
   * 
   * @param msg 
   */
  info(msg): void {
    if (!msg)
      return;

    this.report(msg, 'info');
  }

  /**
   * 
   * @param msg 
   */
  debug(msg): void {
    if (!msg)
      return;

    this.report(msg, 'debug');
  }

  /**
   * 
   * @param msg 
   */
  warn(msg): void {
    if (!msg)
      return;

    this.report(msg, 'warn');
  }

  /**
   * 
   * @param msg 
   */
  error(msg): void {
    if (!msg)
      return;

    this.report(msg, 'error');
  }

  /**
   * 
   * @param msg the error message
   * @param logLevel the log level
   * @param errorType the error message type
   * @param callback  callback function
   * @param force force to submit, will sent the request immediately
   */
  report(msg, logLevel?: LogLevel, errorType?, callback?, force?: boolean): void {
    logLevel = isUndefined(logLevel) ? this.config.logLevel : logLevel;

    let errorMsg = this.processError(msg, logLevel, errorType);

    this.errorMsg.push(errorMsg);

    this.processLog(force);

    if (callback)
      callback();
  }

  /**
   * 
   * @param msg 
   * @param logLevel 
   */
  processError(msg, logLevel?: LogLevel, errorType?): any {
    errorType = isUndefined(errorType) ? 'caughtError' : errorType;

    let errorMsg = new ErrorMessage();

    errorMsg.setMessage(msg);
    errorMsg.setErrorType(errorType);
    errorMsg.setAppId(this.config.projectId);

    return errorMsg;
  }

  /**
   * 
   * @param force 
   */
  processLog(force?: boolean): void {
    if (!this.errorMsg.length) {
      return;
    }

    if (!this.config.reportUrl)
      return;

    let randomIgnore = Math.random() >= this.config.random;

    let errorMsgLenth = this.errorMsg.length;
    for (let index = 0; index < errorMsgLenth; index++) {
      const element = this.errorMsg[index];

      element.message = (element.message + "" || "").substr(0, 500); //set the meessage max length is 500

      //check the message is repeat
      if (isRepeat(element, this.submitErros, this.config.repeat))
        continue;
      //check ignore message key
      let isIgnore = false;

      if (isOBJByType(this.config.ignoreKey, "Array")) {
        for (let i = 0, l = this.config.ignoreKey.length; i < l; i++) {
          let rule = this.config.ignoreKey[i];
          if ((isOBJByType(rule, "RegExp") && rule.test(element.message)) || (isOBJByType(rule, "Function") && rule(element))) {
            isIgnore = true;
            break;
          }
        }
      }

      if (!isIgnore && !randomIgnore) {
        if (this.config.submit) {
          this.submitErros.push(element);
        } else {
          let logStr = report_log_tostring(element, this.submitErros.length);
          this.submitErros.push(logStr[0]);
        }

      }

    }

    this.errorMsg = [];

    //submit
    if (force) {
      this.submit();
    } else {
      this.comboTimeout = setTimeout(() => {
        this.submit();
      }, this.config.delay);
    }
  }

  /**
   * submit the error
   */
  submit(): void {
    clearTimeout(this.comboTimeout);

    if (!this.submitErros.length) {
      return;
    }

    if (this.config.submit) {
      this.config.submit(this.config.reportUrl, this.submitErros);
    } else {
      let url = this.config.reportUrl + "?" + this.submitErros.join("&") + "&count=" + this.submitErros.length + "&_t=" + (+new Date);
      new Image().src = url;
    }

    this.submitErros = [];

  }

}
