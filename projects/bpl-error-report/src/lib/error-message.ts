import { isString, isNumber } from 'util';

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

export interface Context {
  httpRequest: {
    method: string; url: string; userAgent: string; referrer: string;
    responseStatusCode: number;
    remoteIp: string;
    params: any;
  };
  user: string;
}

export interface ReportLocation { filePath: string; lineNumber: number; functionName: string; };

export class ErrorMessage {
  version: string = "0.0.1";

  targetUrl: string;
  errorType: string;
  message: string;
  eventTime: string;

  locale: string;

  reportLocation: ReportLocation;

  context: Context; //for sent the http error

  constructor() {
    this.eventTime = new Date().toISOString();

    this.context = {
      httpRequest: {
        method: '',
        url: '',
        userAgent: '',
        referrer: '',
        responseStatusCode: 0,
        remoteIp: '',
        params: ''
      },
      user: '',
    };

    this.locale = window.navigator.language;
  }

  /**
   * 
   * @param targetUrl the error page url 
   */
  setTargetUrl(targetUrl?: string) {
    this.targetUrl = (isString(targetUrl) ? targetUrl : '')!;

    if (this.targetUrl == '') {
      this.targetUrl = window.location.href;
    }
  }

  /**
   * 
   * @param errorType the error type (ng error, httpError, script error)
   */
  setErrorType(errorType?: string) {
    this.errorType = (isString(errorType) ? errorType : '')!;

  }

  /**
  * Sets the message property on the instance.
  * @chainable
  * @param {String} message - the error message
  * @returns {this} - returns the instance for chaining
  */
  setMessage(message?: string) {
    this.message = (isString(message) ? message : '')!;

  }

  /**
   * Sets the eventTime property on the instance to an ISO-8601 compliant string
   * representing the current time at invocation.
   * @function setEventTimeToNow
   * @chainable
   * @returns {this} - returns the instance for chaining
   */
  setEventTimeToNow() {
    this.eventTime = new Date().toISOString();

  }

  /**
   * 
   * @param locale 
   */
  setLocale(locale?: string) {
    this.locale = (isString(locale) ? locale : '');
  }

  /**
   * Sets the context.httpRequest.method property on the instance.
   * @chainable
   * @param {String} method - the HTTP method on the request which caused the
   *  errors instantiation
   * @returns {this} - returns the instance for chaining
   */
  setHttpMethod(method?: string) {
    this.context.httpRequest.method = (isString(method) ? method : '')!;

  }

  /**
   * Sets the context.httpRequest.url property on the instance.
   * @chainable
   * @param {String} url - the requests target url
   * @returns {this} - returns the instance for chaining
   */
  setUrl(url?: string) {
    this.context.httpRequest.url = (isString(url) ? url : '')!;
  }

  /**
   * Sets the context.httpRequest.userAgent property on the instance.
   * @chainable
   * @param {String} userAgent - the requests user-agent
   * @returns {this} - returns the instance for chaining
   */
  setUserAgent(userAgent?: string) {
    this.context.httpRequest.userAgent =
      (isString(userAgent) ? userAgent : '')!;
  }

  /**
   * Sets the context.httpRequest.referrer property on the instance.
   * @chainable
   * @param {String} referrer - the requests referrer
   * @returns {this} - returns the instance for chaining
   */
  setReferrer(referrer?: string) {
    this.context.httpRequest.referrer = (isString(referrer) ? referrer : '')!;

  }

  /**
   * Sets the context.httpRequest.responseStatusCode property on the instance.
   * @chainable
   * @param {Number} responseStatusCode - the response status code
   * @returns {this} - returns the instance for chaining
   */
  setResponseStatusCode(responseStatusCode?: number) {
    this.context.httpRequest.responseStatusCode =
      (isNumber(responseStatusCode) ? responseStatusCode : 0)!;

  }

  /**
   * Sets the context.httpRequest.remoteIp property on the instance
   * @chainable
   * @param {String} remoteIp - the requesters remote IP
   * @returns {this} - returns the instance for chaining
   */
  setRemoteIp(remoteIp?: string) {
    this.context.httpRequest.remoteIp = (isString(remoteIp) ? remoteIp : '')!;

  }

  /**
   * Sets the context.user property on the instance
   * @chainable
   * @param {String} user - the vm instances user
   * @returns {this} - returns the instance for chaining
   */
  setUser(user?: string) {
    this.context.user = (isString(user) ? user : '')!;

  }

  /**
   * Sets the context.reportLocation.filePath property on the instance
   * @chainable
   * @param {String} filePath - the vm instances filePath
   * @returns {this} - returns the instance for chaining
   */
  setFilePath(filePath?: string) {
    this.reportLocation.filePath =
      (isString(filePath) ? filePath : '')!;

  }

  /**
   * Sets the context.reportLocation.lineNumber property on the instance
   * @chainable
   * @param {Number} lineNumber - the line number of the report context
   * @returns {this} - returns the instance for chaining
   */
  setLineNumber(lineNumber?: number) {
    this.reportLocation.lineNumber =
      (isNumber(lineNumber) ? lineNumber : 0)!;

  }

  /**
   * Sets the context.reportLocation.functionName property on the instance
   * @chainable
   * @param {String} functionName - the function name of the report context
   * @returns {this} - returns the instance for chaining
   */
  setFunctionName(functionName?: string) {
    this.reportLocation.functionName =
      (isString(functionName) ? functionName : '')!;

  }




}