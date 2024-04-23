import express from 'express';
import { getTokenDetailsSchema, validate } from '../middleware';
import { getTokenDetails } from '../controllers';

const tokens = express.Router();

/**
 * GET - /tokens/:id
 * Fetches details of a specific token given its unique identifier.
 *
 * Params:
 *  id: string         - Token ID
 *
 * Returns:
 *  token: tokenObject - token details.
 *                       Read more about 'tokenObject':
 *                       https://developers.circle.com/w3s/reference/gettokenid
 *
 */
tokens.get('/:id', validate(getTokenDetailsSchema), getTokenDetails);

export { tokens };
