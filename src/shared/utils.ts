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

import { Request } from 'express';
import { FeeConfiguration } from '../middleware/types/types';

export const getFeeConfiguration = (req: Request): FeeConfiguration | null => {
  const body = req.body;
  if (body?.feeLevel) {
    return {
      type: 'level',
      config: {
        feeLevel: body.feeLevel
      }
    };
  } else if (body?.gasLimit && body?.gasPrice) {
    return {
      type: 'gas',
      config: {
        gasLimit: body.gasLimit,
        gasPrice: body.gasPrice
      }
    };
  } else if (body?.maxFee && body?.priorityFee && body?.gasLimit) {
    return {
      type: 'absolute',
      config: {
        maxFee: body.maxFee,
        priorityFee: body.priorityFee,
        gasLimit: body.gasLimit
      }
    };
  } else {
    return null;
  }
};
