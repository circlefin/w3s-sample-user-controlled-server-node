import express from 'express';
import {
  createUser,
  createUserToken,
  getUser,
  initializeUser,
  restorePin
} from '../controllers';
import {
  createUserTokenSchema,
  initializeUserSchema,
  getUserSchema,
  validate,
  authMiddleware
} from '../middleware';

const users = express.Router();
const authUserRouter = express.Router();
authUserRouter.use(authMiddleware);

/**
 * POST - /users
 * Creates a user
 *
 * Returns:
 *  userId: UUID - the UUID of the newly created user
 */
users.post('/', createUser);

/**
 * GET - /users/:id
 * Gets the user object
 *
 * Params:
 *  id: string - the userId to retrieve
 *
 * Returns:
 *  - user object - Reference https://developers.circle.com/w3s/reference/getuser
 */
users.get('/:id', validate(getUserSchema), getUser);

/**
 * POST - /users/token
 * Creates a user token and encryption key
 *
 * Params:
 *  userId: string - the userId to create userToken and encryptionKey for
 *
 * Returns:
 *  userToken: string     - unique system generated JWT session token.
 *                          The token will expire after 60 minutes.
 *  encryptionKey: string - encryption key to use to execute challengeIds
 */
users.post('/token', validate(createUserTokenSchema), createUserToken);

/**
 * POST - /users/initialize
 * Creates a PIN setup and optionally, a new Wallet
 *
 * Params:
 *  userId: string        - the userId to create PIN for
 *  blockchains: [string] - the blockchains to create wallet on
 *  accountType: string   - accountType of the Wallet
 *                        - will default to "EOA" if not provided
 *
 * Returns:
 *  challengeId: string - used to initiate a challenge flow
 */
users.post('/initialize', validate(initializeUserSchema), initializeUser);

/**
 * POST - /users/pin/restore
 * Restore PIN flow
 *
 * Returns:
 *  challengeId: string - used to initiate a challenge flow for PIN restoration
 */
authUserRouter.post('/pin/restore', restorePin);

export { users, authUserRouter };
