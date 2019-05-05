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
  };
  user: string;
  reportLocation: {filePath: string; lineNumber: number; functionName: string;};
}

export class ErrorMessage {
    eventTime: string;
    message: string;
    context: Context;

}