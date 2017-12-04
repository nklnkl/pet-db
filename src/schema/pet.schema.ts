import { Schema, Document } from 'mongoose';

interface PetInterface extends Document {
  id: string;
  created: number;
  updated: number;

  name: string;
  birthDate: number;
  breed: number;
  species: number;
  status: number;
}

const PetSchema: Schema = new Schema({
  created: Number,
  updated: Number,

  name: String,
  birthDate: Number,
  breed: Number,
  species: Number,
  status: Number
});

export { PetInterface, PetSchema };
