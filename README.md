# Circle User-Controlled Wallets Sample App - Backend Server

Check out the [live demo](https://user-controlled-wallets-sample-app.circle.com/) first to see what to expect!

## Overview

The backend server is a crucial component of the User-Controlled Wallets Sample App, responsible for communicating with the [Circle Web3 Services API](https://developers.circle.com/w3s/reference). It leverages the [Circle Web3 Services Node.js SDK](https://developers.circle.com/w3s/docs/nodejs-sdk) to enable the client-side application to interact with Circle's Web3 Services, such as user-controlled wallets, which can perform gasless transactions because they are [Smart Contract Accounts (SCA)](https://developers.circle.com/w3s/docs/programmable-wallets-account-types) linked to Circle's paymaster policy.

## Prerequisites

1. Sign up for [Circle's Dev Console](https://developers.circle.com/w3s/docs/circle-developer-account).

2. Set up Testnet API key, see [guide](https://learn.circle.com/quickstarts/user-controlled-wallets#step-1-setting-up-your-testnet-api-key).

3. Install [nvm](https://github.com/nvm-sh/nvm) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), these are required development tools.

4. **_Important:_** Set up [Sample App Frontend UI](https://github.com/circlefin/w3s-sample-user-controlled-client-web) as well to get the end-to-end experience. Please be aware that the [SDK user token](https://developers.circle.com/w3s/reference/getusertoken) will expire after 60 minutes.

## Configure the Sample App

1. Run `yarn env:config`, and you will see a `.env` file generated in the root directory.
2. Paste your [API key](https://console.circle.com/api-keys) into the `.env` file.

## Get Started

Run the following commands to start the server with an in-memory SQLite database at `localhost:8080`:

``` bash
nvm use
yarn install
yarn dev
```

1. `nvm use`: set node version.
2. `yarn install`: install dependencies.
3. `yarn dev`: run the server, hot reload is supported.

## Architecture

The backend server will play the role as `Your Server`, see [details](<https://developers.circle.com/w3s/docs/sdk-architecture-for-user-controlled-wallets#sdk-architecture>).
![image](https://files.readme.io/a2a1678-SDK_UserC_Wallets_Sequence__Detailed2x.png)

## Code Structure

We use [Express](https://expressjs.com/) as web framework and [SQLite](https://www.sqlite.org/) as default database.

- The main logic to interact with Circle Web3 Services Node.js SDK is under `src/controllers`:
  - In `onboarding.ts`, we use the SDK to generate a user token for both our Sign Up and Sign In functions by calling the `createUserToken`:

    ```javascript
      const tokenResponse = await circleUserSdk.createUserToken({
        userId: newUserId
      });
    ```

  - Majority of files under `src/controllers` will require this user token to be passed within the header. For instance, creating a transaction with `circleUserSdk.createTransaction(...)` in  `transactions.ts`, `req.headers` holds the token value and `req.body` holds all the parameters that the client can pass in as an object. Once authorized and configured from the client, the SDK uses Programmable Wallets to send on-chain transactions:

    ```javascript
        const response = await circleUserSdk.createTransaction({
          userToken: req.headers['token'] as string,
          fee: feeConfig,
          idempotencyKey: req.body.idempotencyKey,
          refId: req.body.refId,
          amounts: req.body.amounts,
          destinationAddress: req.body.destinationAddress,
          nftTokenIds: req.body.nftTokenIds,
          tokenId: req.body.tokenId,
          walletId: req.body.walletId
        });
    ```

- Shared logic for the routers live in `src/middleware`:
  - `auth.ts`: logic to parse and validate user token
  - `errorHandler.ts`: logic to handle errors
  - `validation.ts`: logic to handle incoming parameter type
  
- `src/services` holds external resources that the server needs:
  - `userControlledWalletSdk.ts`: will initialize an instance of the user-controlled wallet sdk to be used by the controllers.
  - `db/`: configures the Sqlite database for the user credentials.
- `src/app.ts` sets up the express router configurations and sets the base path and sub paths for the controllers. Imported by `src/index.ts` as the entry point of the server.
- The above are the most important files to get an understanding of this server. All other files are specific to this server and not crucial to using Circle Web3 Services Node.js SDK.

**Happy Coding!**

## Additional Resources

- [Circle Web3 Services Node.js SDK](https://developers.circle.com/w3s/docs/nodejs-sdk) supports User-Controlled Wallets, Developer-Controlled Wallets and Smart Contract Platform. See [Programmable Wallets](https://developers.circle.com/w3s/docs/circle-programmable-wallets-an-overview) and [Smart Contract Platform](https://developers.circle.com/w3s/docs/smart-contract-platform) to learn about these features and concepts.
- Need help: <customer-support@circle.com>
- Join our Discord community: <https://discord.com/invite/buildoncircle>
