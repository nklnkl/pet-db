import 'mocha';
import { assert } from 'chai';
import * as Dotenv from 'dotenv';
import { Session } from 'pet-entity';
import { Client, SessionDb } from '../../index';

Dotenv.config();

describe('Session', () => {

  let client: Client;
  let sessionDb: SessionDb;

  before((done: MochaDone) => {
    client = new Client();
    client.connect()
    .then(() => {
      sessionDb = new SessionDb(client.getConnection());
      done();
    });
  });

  after((done: MochaDone) => {
    client.getConnection().db.dropCollection('sessions')
    .then(() => client.disconnect())
    .then(() => done());
  });

  describe('create()', () => {

    it('should return an session with an id', (done: MochaDone) => {
      let session: Session = new Session();
      session.setUserId('testId');

      sessionDb.create(session)
      .then((result: Session) => {
        assert.isNotNull(result.getId());
        assert.equal(result.getUserId(), session.getUserId())
        done();
      });
    });

  });

  describe('retrieve()', () => {

    it('should return an session that is retrievable by id', (done: MochaDone) => {
      let session: Session = new Session();
      session.setUserId('testId');

      sessionDb.create(session)
      .then((result: Session) => {
        let id: string = result.getId();
        return sessionDb.retrieve(id);
      })
      .then((result: Session) => {
        assert.isNotNull(result);
        assert.isNotNull(result.getId());
        assert.equal(result.getUserId(), session.getUserId())
        done();
      });
    });

  });

  describe('list()', () => {

    it('should return an session that is retrievable by id', (done: MochaDone) => {
      let session: Session = new Session();
      let session2: Session = new Session();

      sessionDb.create(session)
      .then((result: Session) => sessionDb.create(session2))
      .then((result: Session) => sessionDb.list())
      .then((results: Array<Session>) => {
        assert.isArray(results);
        assert.isAbove(results.length, 0);
        done();
      });
    });

  });

  describe('update()', () => {

    it('should return an session with an id', (done: MochaDone) => {
      let session: Session = new Session();
      session.setId('testId');

      let update: Session = new Session();
      update.setId('testId2');

      sessionDb.create(session)
      .then((result: Session) => {
        let id: string = result.getId();
        return sessionDb.update(id, update)
      })
      .then((result: Session) => {
        assert.equal(result.getUserId(), update.getUserId());
        done();
      });

    });

  });

});
