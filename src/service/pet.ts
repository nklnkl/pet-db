import { Pet, PetError } from 'pet-entity';
import { PetInterface, PetSchema } from '../schema/pet';

import { Model, Connection, DocumentQuery} from 'mongoose';
export { PetDb }

class PetDb {

  private model: Model<PetInterface>;

  constructor (connection: Connection) {
    this.model = connection.model<PetInterface>("pet", PetSchema);
  }

  /*
    error codes
      0: internal database error
  */
  public create (pet: Pet) : Promise<Pet> {
    let iPet: PetInterface = this.toDocument(pet);
    return new Promise ((resolve, reject) => {
      let error: PetError = new PetError();
      error.source = 'PetDb';

      this.model.create(iPet)
      .then((result: PetInterface) => {
        if (result != null)
          resolve(this.toObject(result));
        else {
          error.code = 0;
          reject(error);
        }
      })
      .catch((err: any) => {
        error.code = 0;
        reject(error);
      });
    });
  }

  /*
    error codes
      0: internal database error
      1: pet not found
  */
  public retrieve (id: string) : Promise<Pet> {
    return new Promise ((resolve, reject) => {
      let error: PetError = new PetError();
      error.source = 'PetDb';

      this.model.findById(id)
      .then((result: PetInterface) => {
        if (result != null)
          resolve(this.toObject(result));
        else {
          error.code = 1;
          reject(error);
        }
      })
      .catch((err: any) => {
        error.code = 0;
        reject(error);
      });
    });
  }

  /*
    error codes
      0: internal database error
  */
  public list () : Promise<Array<Pet>> {
    return new Promise ((resolve, reject) => {
      let error: PetError = new PetError();
      error.source = 'PetDb';

      this.model.find().exec()
      .then((result: Array<PetInterface>) => {
        let array: Array<Pet> = [];
        for(let i = 0; i < result.length; i++) {
          let pet: Pet = this.toObject(result[i]);
          array.push(pet);
        }
        resolve(array);
      })
      .catch((err: any) => {
        error.code = 0;
        reject(error);
      });
    });
  }

  /*
    error codes
      0: internal database error
  */
  public update (id: string, update: Pet) : Promise<Pet> {
    return new Promise ((resolve, reject) => {
      let error: PetError = new PetError();
      error.source = 'PetDb';

      let iUpdate: PetInterface = this.toDocument(update);
      this.model.findByIdAndUpdate(id, iUpdate, { new: true})
      .then((result: PetInterface) => {
        if (result != null)
          resolve(this.toObject(result));
          else {
            error.code = 0;
            reject(error);
          }
      })
      .catch((err: any) => {
        error.code = 0;
        reject(error);
      });
    });
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

    return document;
  }
}
