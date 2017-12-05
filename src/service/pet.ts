import { Pet } from 'pet-entity';
import { PetInterface, PetSchema } from '../schema/pet';

import { Model, Connection, DocumentQuery} from 'mongoose';
export { PetDb }

class PetDb {

  private model: Model<PetInterface>;

  constructor (connection: Connection) {
    this.model = connection.model<PetInterface>("pet", PetSchema);
  }

  public create (pet: Pet) : Promise<Pet> {
    let iPet: PetInterface = this.toDocument(pet);
    return new Promise ((resolve, reject) => {
      this.model.create(iPet)
      .then((result: PetInterface) => {
        if (result)
          resolve(this.toObject(result));
        else
          resolve(new Pet());
      })
      .catch((err: any) => reject(err));
    });
  }

  public retrieve (id: string) : Promise<Pet> {
    return new Promise ((resolve, reject) => {
      this.model.findById(id)
      .then((result: PetInterface) => {
        if (result)
          resolve(this.toObject(result));
        else
          resolve(new Pet());
      })
      .catch((err: any) => reject(err));
    });
  }

  public list () : Promise<Array<Pet>> {
    return new Promise ((resolve, reject) => {
      this.model.find().exec()
      .then((result: Array<PetInterface>) => {
        let array: Array<Pet> = [];
        for(let i = 0; i < result.length; i++) {
          let pet: Pet = this.toObject(result[i]);
          array.push(pet);
        }
        resolve(array);
      })
      .catch((err: any) => reject(err));
    });
  }

  public update (id: string, update: Pet) : Promise<Pet> {
    return new Promise ((resolve, reject) => {
      let iUpdate: PetInterface = this.toDocument(update);
      this.model.findByIdAndUpdate(id, iUpdate, { new: true})
      .then((result: PetInterface) => {
        if (result)
          resolve(this.toObject(result));
        else
          resolve(new Pet());
      })
      .catch((err: any) => reject(err));
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
