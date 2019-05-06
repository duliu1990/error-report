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
export type LogLevel = 'error' | 'debug' | 'info' | 'warn' | undefined;

//export type MsgType = 'TypeError' | 'caughtError' | 'httpError' | 'resourceError' | undefined;

export interface Configuration {
    /**
     * uid with report
     */
    projectId: string;

    /**
     * report send url
     */
    reportUrl: string;

    /**
     * log level
     */
    logLevel?: LogLevel;
    /**
     * RegExp or function check with message
     * 
     * if is function, eg check function(error: ErrorMessage){}
     * 
     */
    ignoreKey?: any[]; //

    /**
     * delay report, by default is 5s
     */
    delay?: number;

    /**
     * same message repeat times, if more the this time will ignore
     */
    repeat?: number;

    /**
     * custom report submit function
     * 
     * function(url, errors[])
     */
    submit: any; //submit function

    /**
     * random ignore the message collection
     */
    random: 1;
}