// Copyright (c) 2024, Circle Technologies, LLC. All rights reserved.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export interface Logger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
}

export class SampleServerLogger implements Logger {
  info(message: string) {
    console.log('[SampleServerLogger]: ' + message);
  }
  warn(message: string) {
    console.log('[SampleServerLogger]: ' + message);
  }
  error(message: string) {
    console.log('[SampleServerLogger]: ' + message);
  }
  debug(message: string) {
    console.log('[SampleServerLogger]: ' + message);
  }
}

export let logger: Logger;

export const registerLogger = (newLogger: Logger) => {
  logger = newLogger;
};
