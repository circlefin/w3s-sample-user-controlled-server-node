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

import { initiateUserControlledWalletsClient } from '@circle-fin/user-controlled-wallets';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const circleApiBaseUrl =
  process.env.CIRCLE_API_BASE_URL ?? 'https://api.circle.com';

export const circleUserSdk = initiateUserControlledWalletsClient({
  apiKey: process.env.API_KEY ?? '',
  baseUrl: circleApiBaseUrl,
  userAgent: 'PW-USER-WALLET-WEB-SAMPLE-APP'
});
