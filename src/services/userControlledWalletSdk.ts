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
