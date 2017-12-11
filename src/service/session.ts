import { Session } from 'pet-entity';
import { SessionInterface, SessionSchema } from '../schema/session';

import { Model, Connection, DocumentQuery} from 'mongoose';
export { SessionDb }

class SessionDb {

  private model: Model<SessionInterface>;

  constructor (connection: Connection) {
    this.model = connection.model<SessionInterface>("session", SessionSchema);
  }

  /**
  * May return a Session if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public create (session: Session) : Promise<Session> {
    let iSession: SessionInterface = this.toDocument(session);
    return new Promise ((resolve, reject) => {
      this.model.create(iSession)
      .then((result: SessionInterface) => {
        if (result != null)
          resolve(this.toObject(result));
        else
          reject(0);
      })
      .catch((err: any) => reject(0));
    });
  }

  /**
  * May return a Session if successful.
  * **Reject codes**
  * - **0**: internal database error
  * - **1**: Session not found
  */
  public retrieve (id: string) : Promise<Session> {
    return new Promise ((resolve, reject) => {
      this.model.findById(id)
      .then((result: SessionInterface) => {
        if (result != null)
          resolve(this.toObject(result));
        else
          reject(1);
      })
      .catch((err: any) => reject(0));
    });
  }

  /**
  * May return a Session if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public list () : Promise<Array<Session>> {
    return new Promise ((resolve, reject) => {
      this.model.find().exec()
      .then((result: Array<SessionInterface>) => {
        let array: Array<Session> = [];
        for(let i = 0; i < result.length; i++) {
          let session: Session = this.toObject(result[i]);
          array.push(session);
        }
        resolve(array);
      })
      .catch((err: any) => reject(0));
    });
  }

  /**
  * May return a Session if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public update (id: string, update: Session) : Promise<Session> {
    return new Promise ((resolve, reject) => {
      let iUpdate: SessionInterface = this.toDocument(update);
      this.model.findByIdAndUpdate(id, iUpdate, { new: true})
      .then((result: SessionInterface) => {
        if (result != null)
          resolve(this.toObject(result));
        else
          reject(0);
      })
      .catch((err: any) => reject(0));
    });
  }

  /*
    Transforms DB object interface into common Session object.
  */
  public toObject (iSession: SessionInterface) : Session {
    let session: Session = new Session();

      session.setId(iSession.id);
      session.setCreated(iSession.created);
      session.setUpdated(iSession.updated);

      session.setAccountId(iSession.accountId);

    return session;
  }

  public toDocument (session: Session): SessionInterface {
    let document: SessionInterface = {} as SessionInterface;

      document.id = session.getId();
      document.created = session.getCreated();
      document.updated = session.getUpdated();

      document.accountId = session.getAccountId();

    return document;
  }
}
