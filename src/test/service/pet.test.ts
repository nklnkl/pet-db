import 'mocha';
import { assert } from 'chai';
import * as Dotenv from 'dotenv';
import { Pet } from 'pet-entity';
import { Client, PetDb } from '../../index';

Dotenv.config();

describe('Pet', () => {

  let client: Client;
  let petDb: PetDb;

  before((done: MochaDone) => {
    client = new Client();
    client.connect()
    .then(() => {
      petDb = new PetDb(client.getConnection());
      done();
    });
  });

  after((done: MochaDone) => {
    client.getConnection().db.dropCollection('pets')
    .then(() => client.disconnect())
    .then(() => done());
  });

  describe('create()', () => {

    it('should return an pet with an id', (done: MochaDone) => {
      let pet: Pet = new Pet();

      petDb.create(pet)
      .then((result: Pet) => {
        assert.isNotNull(result.getId());
        done();
      });
    });

  });

  describe('retrieve()', () => {

    it('should return an pet that is retrievable by id', (done: MochaDone) => {
      let pet: Pet = new Pet();

      petDb.create(pet)
      .then((result: Pet) => {
        let id: string = result.getId();
        return petDb.retrieve(id);
      })
      .then((result: Pet) => {
        assert.isNotNull(result);
        assert.isNotNull(result.getId());
        done();
      });
    });

  });

  describe('list()', () => {

    it('should return an pet that is retrievable by id', (done: MochaDone) => {
      let pet: Pet = new Pet();
      let pet2: Pet = new Pet();

      petDb.create(pet)
      .then((result: Pet) => petDb.create(pet2))
      .then((result: Pet) => petDb.list())
      .then((results: Array<Pet>) => {
        assert.isArray(results);
        assert.isAbove(results.length, 0);
        done();
      });
    });

  });

  describe('update()', () => {

    it('should return an pet with an id', (done: MochaDone) => {
      let pet: Pet = new Pet();
      pet.setName('testName');

      let update: Pet = new Pet();
      update.setName('testName2');

      petDb.create(pet)
      .then((result: Pet) => {
        let id: string = result.getId();
        return petDb.update(id, update)
      })
      .then((result: Pet) => {
        assert.equal(result.getName(), update.getName());
        done();
      });

    });

  });

});
