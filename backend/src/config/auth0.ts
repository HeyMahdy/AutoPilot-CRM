import { ManagementClient } from 'auth0';
import dotenv from 'dotenv';

dotenv.config();

export const auth0Management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});