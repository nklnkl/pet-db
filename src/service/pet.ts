import { Pet } from 'pet-entity';
import { PetInterface, PetSchema } from '../schema/pet';

import { Model, Connection, DocumentQuery} from 'mongoose';
export { PetDb }

class PetDb {

  private model: Model<PetInterface>;

  constructor (connection: Connection) {
    this.model = connection.model<PetInterface>("pet", PetSchema);
  }

  /**
  * May return a Pet if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public async create (pet: Pet) : Promise<Pet> {
    let iPet: PetInterface = this.toDocument(pet);

    try {
      iPet = await this.model.create(iPet);
    } catch (err) {
      throw (err);
    }

    if (iPet != null)
      return this.toObject(iPet);
    else
      throw (0);
  }

  /**
  * May return a Pet if successful.
  * **Reject codes**
  * - **0**: internal database error
  * - **1**: Pet not found
  */
  public async retrieve (id: string) : Promise<Pet|number> {
    let iPet: PetInterface;

    try {
      iPet = await this.model.findById(id);
    } catch (err) {
      throw (err);
    }

    if (iPet != null)
      return this.toObject(iPet);
    else
      return 1;
  }

  /**
  * May return a list of Pets if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public async list () : Promise<Array<Pet>> {
    let iPetArray: Array<PetInterface>;

    try {
      iPetArray = await this.model.find().exec();
    }
    catch (err) {
      throw (err);
    }

    let array: Array<Pet> = [];
    for(let i = 0; i < iPetArray.length; i++) {
      let pet: Pet = this.toObject(iPetArray[i]);
      array.push(pet);
    }
    return array;
  }

  /**
  * May return a Pet if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public async update (id: string, update: Pet) : Promise<Pet> {
    let iUpdate: PetInterface = this.toDocument(update);

    try {
      iUpdate = await this.model.findByIdAndUpdate(id, iUpdate, { new: true});
    } catch (err) {
      throw (err);
    }

    if (iUpdate != null)
      return this.toObject(iUpdate);
    else
      throw (0);
  }

  /*
    Transforms DB object interface into common Pet object.
  */
  public toObject (iPet: PetInterface) : Pet {
    let pet: Pet = new Pet();

    pet.setId(iPet.id);
    pet.setCreated(iPet.created);
    pet.setUpdated(iPet.updated);

    pet.setName(iPet.name);
    pet.setBirthDate(iPet.birthDate);
    pet.setBreed(iPet.breed);
    pet.setSpecies(iPet.species);
    pet.setStatus(iPet.status)
    pet.setImages(iPet.images);

    return pet;
  }

  public toDocument (pet: Pet): PetInterface {
    let document: PetInterface = {} as PetInterface;

      document.id = pet.getId();
      document.created = pet.getCreated();
      document.updated = pet.getUpdated();

      document.name = pet.getName();
      document.birthDate = pet.getBirthDate();
      document.breed = pet.getBreed();
      document.species = pet.getSpecies();
      document.status = pet.getStatus();
      document.images = pet.getImages();

    return document;
  }
}
