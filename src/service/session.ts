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
  public async create (session: Session) : Promise<Session> {
    let iSession: SessionInterface = this.toDocument(session);

    try {
      iSession = await this.model.create(iSession);
    } catch (err) {
      throw (err);
    }

    if (iSession != null)
      return this.toObject(iSession);
    else
      throw (0);
  }

  /**
  * May return a Session if successful.
  * **Reject codes**
  * - **0**: internal database error
  * - **1**: Session not found
  */
  public async retrieve (id: string) : Promise<Session|number> {
    let iSession: SessionInterface;

    try {
      iSession = await this.model.findById(id);
    } catch (err) {
      throw (err);
    }

    if (iSession != null)
      return this.toObject(iSession);
    else
      return 1;
  }

  /**
  * May return a Session if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public async list () : Promise<Array<Session>> {
    let iSessionArray: Array<SessionInterface>;

    try {
      iSessionArray = await this.model.find().exec();
    }
    catch (err) {
      throw (err);
    }

    let array: Array<Session> = [];
    for(let i = 0; i < iSessionArray.length; i++) {
      let session: Session = this.toObject(iSessionArray[i]);
      array.push(session);
    }
    return array;
  }

  /**
  * May return a Session if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public async update (id: string, update: Session) : Promise<Session> {
    let iUpdate: SessionInterface = this.toDocument(update);

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
