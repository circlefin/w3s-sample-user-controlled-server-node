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

import express from 'express';
import {
  authMiddleware,
  estimateTransferTokensSchema,
  getTransactionSchema,
  listTransactionsSchema,
  transferTokensSchema,
  validate,
  validateAddressSchema
} from '../middleware';
import {
  createTransaction,
  estimateTransferFee,
  getTransaction,
  listTransactions,
  validateAddress
} from '../controllers';

const transactions = express.Router();

const authTransRouter = express.Router();
authTransRouter.use(authMiddleware);

/**
 * GET - /transactions
 * Returns transactions.
 *
 * Params:
 *  userId: string             - filter by external user ID filters.
 *  blockchain: string         - filter by blockchain.
 *  custodyType: string        - filter by the custody type.
 *  destinationAddress: string - filter by the destination address.
 *  includeAll: bool           - include all tokens.
 *  operation: string          - filter by on the operation of the transaction.
 *  state: string              - filter by the state of the transaction.
 *  txHash: string             - filter on the transaction hash of the transaction.
 *  txType: string             - filter by on the transaction type.
 *  walletIds: [string]        - filter by the wallet IDs of the transaction.
 *  from: date                 - queries items created since the specified
 *                               date-time (inclusive).
 *  to: date                   - queries items created before the specified
 *                               date-time (inclusive).
 *  pageBefore: string         - A collection ID value used for pagination.
 *                               It marks the exclusive end of a page. When
 *                               provided, the collection resource will return
 *                               the next n items before the id, with n being
 *                               specified by pageSize.
 *  pageAfter: string          - A collection ID value used for pagination.
 *                               It marks the exclusive begin of a page. When
 *                               provided, the collection resource will return
 *                               the next n items after the id, with n being
 *                               specified by pageSize.
 *  pageSize: string           - Limits the number of items to be returned.
 *                               Some collections have a strict upper bound
 *                               that will disregard this value. In case the
 *                               specified value is higher than the allowed
 *                               limit, the collection limit will be used.
 *
 * Returns:
 *  transactions: [transaction] - array of the transaction information.
 *                                Read more about 'transaction':
 *                                https://developers.circle.com/w3s/reference/listtransactions
 *
 */
authTransRouter.get('/', validate(listTransactionsSchema), listTransactions);

/**
 * GET - /transactions/:id
 * Retrieves info for a single transaction using it's unique identifier.
 *
 * Params:
 *  id: string                      - Transaction id
 *  txType: string                  - Filter by on the transaction type.
 *
 * Returns:
 *  transaction: transactionObject  - transaction details.
 *                                    Read more about 'transactionObject':
 *                                    https://developers.circle.com/w3s/reference/gettransaction
 *
 */
authTransRouter.get('/:id', validate(getTransactionSchema), getTransaction);

/**
 * POST - /transactions/transfer
 * Creates a transaction
 *
 * Params:
 *  idempotencyKey: string     - Universally unique identifier (UUID v4) idempotency key.
 *                               This key is utilized to ensure exactly-once execution of
 *                               mutating requests.
 *  amounts: [string]          - Transfer amount in decimal number format.
 *  destinationAddress: string - The destination blockchain address for the transaction
 *  feeLevel: string           - A dynamic blockchain fee level setting (LOW, MEDIUM, or HIGH)
 *                               that will be used to pay gas for the transaction.
 *                               Calculated based on network traffic, supply of validators,
 *                               and demand for transaction verification. Cannot be used with gasLimit,
 *                               gasPrice, baseFee, priorityFee, or maxFee.
 *  gasLimit: string           - For blockchains with EIP-1559 support, the maximum price of gas,
 *                               in gwei, to be used per each unit of gas (see gasLimit). Requires
 *                               gasLimit. Cannot be used with feeLevel, baseFee, priorityFee, or maxFee.
 *  maxFee: string             - The maximum price per unit of gas (see gasLimit), in gwei. Requires baseFee,
 *                               priorityFee, and gasLimit to be present. Cannot be used with feeLevel or gasPrice
 *  priorityFee: string        - The “tip”, in gwei, to be added to the baseFee as an incentive for validators.
 *                               Requires baseFee, maxFee, and gasLimit to be present. Cannot be used with feeLevel
 *                               or gasPrice.
 *  nftTokenIds: [string]      - List of NFT token ids corresponding with the NFTs to be transferred. Batch transfers
 *                               are only supported for ERC-1155 tokens.
 *  refId: string              - Optional reference or description used to identify the transaction.
 *  tokenId: string            - System generated identifier of the token.
 *  walletId: string           - Unique system generated identifier of the wallet. Required when source Address
 *                               and blockchain is not provided. Mutually exclusive. For contract deploys this
 *                               wallet ID will be used as the source.
 *
 * Returns:
 *  challengeId: string - used to initiate a challenge flow
 *
 */
authTransRouter.post(
  '/transfer',
  validate(transferTokensSchema),
  createTransaction
);

/**
 * POST - /transactions/transfer/estimateFee
 * Estimates the fee to transfer tokens or nfts
 *
 * Params:
 *  amounts: [string]          - Transfer amount in decimal number format.
 *  destinationAddress: string - The destination blockchain address for the transaction
 *  nftTokenIds: [string]      - List of NFT token ids corresponding with the NFTs to be transferred. Batch transfers
 *                               are only supported for ERC-1155 tokens.
 *  tokenId: string            - System generated identifier of the token.
 *  walletId: string           - Unique system generated identifier of the wallet. Required when source Address
 *                               and blockchain is not provided. Mutually exclusive. For contract deploys this
 *                               wallet ID will be used as the source.
 *
 * Returns:
 *  gas object                 - Read more about the returned gas object here
 *                               https://developers.circle.com/w3s/reference/createtransferestimatefee
 *
 */
authTransRouter.post(
  '/transfer/estimateFee',
  validate(estimateTransferTokensSchema),
  estimateTransferFee
);

/*
 * POST - /transactions/validateAddress
 * Validates an address on a specific blockchain
 *
 * Params:
 *  address: string     - the blockchain address generated upon wallet creation.
 *  blockchain: string  - the blockchain network that the address is on.
 *
 * Returns:
 *  isValid: bool - true if valid, false if not
 *
 */
transactions.post(
  '/validateAddress',
  validate(validateAddressSchema),
  validateAddress
);

export { transactions, authTransRouter };
