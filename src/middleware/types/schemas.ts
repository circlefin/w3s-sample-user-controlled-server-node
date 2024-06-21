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

import * as yup from 'yup';

// User
export const createUserTokenSchema = yup.object({
  body: yup
    .object({
      userId: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const getUserSchema = yup.object({
  params: yup
    .object({
      id: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const initializeUserSchema = yup.object({
  body: yup
    .object({
      userId: yup.string().required(),
      blockchain: yup.array().of(yup.string().required()).optional(),
      accountType: yup.string().optional()
    })
    .noUnknown(true)
    .strict()
});

// Onboarding
export const authenticationSchema = yup.object({
  body: yup
    .object({
      email: yup.string().required(),
      password: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

// Wallets
export const walletTokenBalanceSchema = yup.object({
  params: yup
    .object({
      id: yup.string().required()
    })
    .noUnknown(true)
    .strict(),
  query: yup
    .object({
      userId: yup.string().optional(),
      includeAll: yup.bool().optional(),
      name: yup.string().optional(),
      tokenAddresses: yup.array().of(yup.string().required()).optional(),
      standard: yup.string().optional(),
      from: yup.date().optional(),
      to: yup.date().optional(),
      pageBefore: yup.string().optional(),
      pageAfter: yup.string().optional(),
      pageSize: yup.number().optional()
    })
    .noUnknown(true)
    .strict()
});

export const listWalletsSchema = yup.object({
  query: yup
    .object({
      userId: yup.string().optional(),
      address: yup.string().optional(),
      blockchain: yup.string().optional(),
      walletSetId: yup.string().optional(),
      refId: yup.string().optional(),
      from: yup.date().optional(),
      to: yup.date().optional(),
      pageBefore: yup.string().optional(),
      pageAfter: yup.string().optional(),
      pageSize: yup.number().optional()
    })
    .noUnknown(true)
    .strict()
});

export const getWalletSchema = yup.object({
  params: yup.object({
    id: yup.string().required()
  })
});

// Transactions
export const listTransactionsSchema = yup.object({
  query: yup
    .object({
      userId: yup.string().optional(),
      blockchain: yup.string().optional(),
      custodyType: yup.string().optional(),
      destinationAddress: yup.string().optional(),
      includeAll: yup.boolean().optional(),
      operation: yup.string().optional(),
      state: yup.string().optional(),
      txHash: yup.string().optional(),
      txType: yup.string().optional(),
      walletIds: yup.array().of(yup.string().required()).optional(),
      from: yup.date().optional(),
      to: yup.date().optional(),
      pageBefore: yup.string().optional(),
      pageAfter: yup.string().optional(),
      pageSize: yup.number().optional()
    })
    .noUnknown(true)
    .strict()
});

export const transferTokensSchema = yup.object({
  body: yup
    .object({
      idempotencyKey: yup.string().optional(),
      amounts: yup.array().of(yup.string().required()).optional(),
      destinationAddress: yup.string().required(),
      feeLevel: yup.string().optional(),
      gasLimit: yup.string().optional(),
      gasPrice: yup.string().optional(),
      maxFee: yup.string().optional(),
      priorityFee: yup.string().optional(),
      nftTokenIds: yup.array().of(yup.string().required()).optional(),
      refId: yup.string().optional(),
      tokenId: yup.string().required(),
      walletId: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const validateAddressSchema = yup.object({
  body: yup
    .object({
      address: yup.string().required(),
      blockchain: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const getTransactionSchema = yup.object({
  params: yup
    .object({
      id: yup.string().required()
    })
    .noUnknown(true)
    .strict(),
  query: yup
    .object({
      txType: yup.string().optional()
    })
    .noUnknown(true)
    .strict()
});

export const estimateTransferTokensSchema = yup.object({
  body: yup
    .object({
      amount: yup.array().of(yup.string().required()).required(),
      destinationAddress: yup.string().required(),
      nftTokenIds: yup.array().of(yup.string().required()).optional(),
      sourceAddress: yup.string().optional(),
      tokenId: yup.string().required(),
      walletId: yup.string().optional()
    })
    .noUnknown(true)
    .strict()
});

// Tokens
export const getTokenDetailsSchema = yup.object({
  params: yup
    .object({
      id: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

// Faucet
export const postFaucetDripSchema = yup.object({
  body: yup
    .object({
      address: yup.string().required(),
      blockchain: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});
