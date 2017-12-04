import 'mocha';
import { assert } from 'chai';
import * as Dotenv from 'dotenv';
import { Account } from 'pet-entity';
import { Client, AccountDb } from '../../index';

Dotenv.config();

describe('Account', () => {

  let client: Client;
  let accountDb: AccountDb;

  before((done: MochaDone) => {
    client = new Client();
    client.connect()
    .then(() => {
      accountDb = new AccountDb(client.getConnection());
      done();
    });
  });

  after((done: MochaDone) => {
    client.getConnection().db.dropCollection('accounts')
    .then(() => client.disconnect())
    .then(() => done());
  });

  describe('create()', () => {

    it('should return an account with an id', (done: MochaDone) => {
      let account: Account = new Account();

      accountDb.create(account)
      .then((result: Account) => {
        assert.isNotNull(result.getId());
        done();
      });
    });

  });

  describe('retrieve()', () => {

    it('should return an account that is retrievable by id', (done: MochaDone) => {
      let account: Account = new Account();

      accountDb.create(account)
      .then((result: Account) => {
        let id: string = result.getId();
        return accountDb.retrieve(id);
      })
      .then((result: Account) => {
        assert.isNotNull(result);
        assert.isNotNull(result.getId());
        done();
      });
    });

  });

  describe('retrieveByEmail()', () => {

    it('should return an account that is retrievable by id', (done: MochaDone) => {
      let account: Account = new Account();
      account.setEmail('user@test.com');

      accountDb.create(account)
      .then((result: Account) => {
        let email: string = result.getEmail();
        return accountDb.retrieveByEmail(email);
      })
      .then((result: Account) => {
        assert.isNotNull(result);
        assert.isNotNull(result.getId());
        assert.equal(result.getEmail(), account.getEmail());
        done();
      });
    });

  });

  describe('list()', () => {

    it('should return an account that is retrievable by id', (done: MochaDone) => {
      let account: Account = new Account();
      let account2: Account = new Account();

      accountDb.create(account)
      .then((result: Account) => accountDb.create(account2))
      .then((result: Account) => accountDb.list())
      .then((results: Array<Account>) => {
        assert.isArray(results);
        assert.isAbove(results.length, 0);
        done();
      });
    });

  });

  describe('update()', () => {

    it('should return an account with an id', (done: MochaDone) => {
      let account: Account = new Account();
      account.setEmail('user@test.com');

      let update: Account = new Account();
      update.setEmail('user2@test.com');

      accountDb.create(account)
      .then((result: Account) => {
        let id: string = result.getId();
        return accountDb.update(id, update)
      })
      .then((result: Account) => {
        assert.equal(result.getEmail(), update.getEmail());
        done();
      });

    });

  });

});
