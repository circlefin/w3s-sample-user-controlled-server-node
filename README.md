# Circle User-Controlled Wallets Sample App - Backend Server

## Overview

User-Controlled Wallets Sample App showcases the integration of Circle's Web3 Services products (Web SDK, [Smart Contract Accounts (SCA)](https://developers.circle.com/w3s/docs/programmable-wallets-account-types) user-controlled wallets, gasless transactions). You can download and easily run and configure for your own projects. The use case it will be supporting is integrating user-controlled wallets into an existing web application, so that you can provide wallets to your end users.

This is a sample backend server that plays a part in the larger Sample App project. We use [Circle Web3 Services Node.js SDK](https://developers.circle.com/w3s/docs/nodejs-sdk) to interact with Circle Web3 Services APIs. See more information about [Sample App](#additional-resources).

The backend server will play the role as `Your Server`, see [details](<https://developers.circle.com/w3s/docs/sdk-architecture-for-user-controlled-wallets#sdk-architecture>).
![image](https://files.readme.io/a2a1678-SDK_UserC_Wallets_Sequence__Detailed2x.png)

## Prerequisites

1. Sign up for [Circle's Dev Console](https://developers.circle.com/w3s/docs/circle-developer-account).

2. Set up Testnet API key, see [guide](https://learn.circle.com/quickstarts/user-controlled-wallets#step-1-setting-up-your-testnet-api-key).

3. Install [nvm](https://github.com/nvm-sh/nvm) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), these are required development tools.

## Configure the Sample App

1. Run `yarn env:config`, and you will see a `.env` file generated in the root directory.
2. Paste your API key into the `.env` file.

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
4. The main logic to interact with Circle Web3 Services Node.js SDK is under `src/controllers`.
5. Please be aware that the [SDK user token](https://developers.circle.com/w3s/reference/getusertoken) will expire after 60 minutes.

## Additional Resources

- Sample App
  - [Frontend Repo](https://github.com/circlefin/w3s-sample-user-controlled-client-web)
  - [Live Demo](http://sample-app.circle.com/pw-user-controlled/foundational)
  - Walkthrough Video: <TODO: link to video>

- [Circle Web3 Services Node.js SDK](https://developers.circle.com/w3s/docs/nodejs-sdk) supports User-Controlled Wallets, Developer-Controlled Wallets and Smart Contract Platform. See [Programmable Wallets](https://developers.circle.com/w3s/docs/circle-programmable-wallets-an-overview) and [Smart Contract Platform](https://developers.circle.com/w3s/docs/smart-contract-platform) to learn about these features and concepts.

- We use [Express](https://expressjs.com/) as web framework and [SQLite](https://www.sqlite.org/) as default database.
- Need help: <customer-support@circle.com>
- Join our Discord community: <https://discord.com/invite/buildoncircle>
