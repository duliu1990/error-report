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
import { setTimeout } from 'timers';

@Injectable({
  providedIn: 'root'
})
export class BplErrorReportService {

  private config: Configuration;

  private errorMsg: any[] = [];

  constructor() { }

  init(config: any): void {

    this.config = config;

    if (this.config.delay == undefined) {
      this.config.delay = 10 * 1000;
    }
  }

  /**
   * 
   * @param error 
   */
  notifyError(error): void {
    this.error(error);
  }

  /**
   * 
   * @param errorMsg  add the mseege, but not report
   */
  push(errorMsg: ErrorMessage): void {

  }

  /**
   * 
   * @param msg 
   */
  info(msg): void {
    this.report(msg, 'info');
  }

  /**
   * 
   * @param msg 
   */
  debug(msg): void {
    this.report(msg, 'debug');
  }

  /**
   * 
   * @param msg 
   */
  warn(msg): void {
    this.report(msg, 'warn');
  }

  /**
   * 
   * @param msg 
   */
  error(msg): void {
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
    logLevel = isUndefined(logLevel) ? 'info' : logLevel;

    let errorMsg = this.processError(msg, logLevel);

    this.errorMsg.push(errorMsg);

    this.processLog(force);
  }

  /**
   * 
   * @param msg 
   * @param logLevel 
   */
  processError(msg, logLevel?: LogLevel, errorType?): any {
    let errorMsg = new ErrorMessage();

    errorMsg.setMessage(msg);
    errorMsg.setErrorType(errorType);

    return errorMsg;
  }

  processLog(force?: boolean): void {
    if (!this.errorMsg.length) {
      return;
    }

    if (focus) {
      this.submit();
    } else {
      setTimeout(() => {
        this.submit();
      }, this.config.delay);
    }
  }

  submit(): void {

    

  }




}
