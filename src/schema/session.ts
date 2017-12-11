import { Schema, Document } from 'mongoose';

interface SessionInterface extends Document {
  id: string;
  created: number;
  updated: number;
  accountId: string;
}

const SessionSchema: Schema = new Schema({
  created: Number,
  updated: Number,
  accountId: String
});

export { SessionInterface, SessionSchema };
