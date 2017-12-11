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
  images: Array<string>;
}

const PetSchema: Schema = new Schema({
  created: Number,
  updated: Number,

  name: String,
  birthDate: Number,
  breed: Number,
  species: Number,
  status: Number,
  images: [String]
});

export { PetInterface, PetSchema };
