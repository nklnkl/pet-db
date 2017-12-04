import * as Dotenv from 'dotenv';
import { Client } from './client';
import { AccountDb } from './service/account';
import { PetDb } from './service/pet';
import { SessionDb } from './service/session';
import { AccountSchema, AccountInterface } from './schema/account';
import { PetSchema, PetInterface } from './schema/pet';
import { SessionSchema, SessionInterface } from './schema/session';

Dotenv.config();

export {
  Client,
  AccountDb,
  PetDb,
  SessionDb,
  AccountSchema,
  AccountInterface,
  PetSchema,
  PetInterface,
  SessionSchema,
  SessionInterface
}
