import { Schema, Document } from 'mongoose';

interface AccountInterface extends Document {
  id: string;
  created: number;
  updated: number;

  email: string;
  password: string;
  name: string;
  birthDate: number;
  address: string;
  level: number
}

const AccountSchema: Schema = new Schema({
  created: Number,
  updated: Number,

  email: String,
  password: String,
  name: String,
  birthDate: Number,
  address: String,
  level: Number
});

export { AccountInterface, AccountSchema };
