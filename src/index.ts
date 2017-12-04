import * as Dotenv from 'dotenv';
import { Client } from './client';
import { AccountDb } from './service/account.service';
import { PetDb } from './service/pet.service';
import { SessionDb } from './service/session.service';
import { AccountSchema, AccountInterface } from './schema/account.schema';
import { PetSchema, PetInterface } from './schema/pet.schema';
import { SessionSchema, SessionInterface } from './schema/session.schema';

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
