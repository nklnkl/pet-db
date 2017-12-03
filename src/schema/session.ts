import { Schema, Document } from 'mongoose';

interface SessionInterface extends Document {
  id: string;
  created: number;
  updated: number;
  userId: string;
}

const SessionSchema: Schema = new Schema({
  created: Number,
  updated: Number,
  userId: String
});

export { SessionInterface, SessionSchema };
