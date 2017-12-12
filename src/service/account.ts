import { Account } from 'pet-entity';
import { AccountInterface, AccountSchema } from '../schema/account';

import { Model, Connection, DocumentQuery} from 'mongoose';
export { AccountDb }

class AccountDb {

  private model: Model<AccountInterface>;

  constructor (connection: Connection) {
    this.model = connection.model<AccountInterface>("account", AccountSchema);
  }

  /**
  * May return an Account if successful.
  * **Reject codes**
  * - **0**: internal database error
  */
  public async create (account: Account) : Promise<Account|number> {
    let iAccount: AccountInterface = this.toDocument(account);

    try {
      iAccount = await this.model.create(iAccount);
    } catch (err) {
      throw (err);
    }

    if (iAccount != null)
      return this.toObject(iAccount);
    else
      throw (0);
  }

  /**
  * May return an Account if successful.
  * **Reject codes**
  * - **0**: internal database error
  * - **1**: account not found
  */
  public async retrieve (id: string) : Promise<Account|number> {
    let iAccount: AccountInterface;

    try {
      iAccount = await this.model.findById(id);
    } catch (err) {
      throw (err);
    }

    if (iAccount != null)
      return this.toObject(iAccount);
    else
      return 1;
  }

  /**
  * May return an Account if successful.
  * **Reject codes**
  * - **0**: internal database error
  * - **1**: account not found
  */
  public async retrieveByEmail (email: string) : Promise<Account|number> {
    let iAccount: AccountInterface;

    try {
      iAccount = await this.model.findOne({email:email});
    } catch (err) {
      throw (err);
    }

    if (iAccount != null)
      return this.toObject(iAccount);
    else
      return 1;
  }

  /**
  * May return an Account if successful.
  * - **Reject codes**
  * - **0**: internal database error
  */
  public async list () : Promise<Array<Account>> {
    let iAccountArray: Array<AccountInterface>;

    try {
      iAccountArray = await this.model.find().exec();
    }
    catch (err) {
      throw (err);
    }

    let array: Array<Account> = [];
    for(let i = 0; i < iAccountArray.length; i++) {
      let account: Account = this.toObject(iAccountArray[i]);
      array.push(account);
    }
    return array;
  }

  /**
  * May return an Account if successful.
  * **Reject codes**
  * **0**: internal database error
  */
  public async update (id: string, update: Account) : Promise<Account> {
    let iUpdate: AccountInterface = this.toDocument(update);

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
    Transforms DB object interface into common Account object.
  */
  public toObject (iAccount: AccountInterface) : Account {
    let account: Account = new Account();

    account.setId(iAccount.id);
    account.setCreated(iAccount.created);
    account.setUpdated(iAccount.updated);

    account.setEmail(iAccount.email);
    account.setPassword(iAccount.password);
    account.setName(iAccount.name);
    account.setBirthDate(iAccount.birthDate);
    account.setAddress(iAccount.address);
    account.setLevel(iAccount.level);

    return account;
  }

  public toDocument (account: Account): AccountInterface {
    let document: AccountInterface = {} as AccountInterface;

    document.id = account.getId();
    document.created = account.getCreated();
    document.updated = account.getUpdated();

    document.email = account.getEmail();
    document.password = account.getPassword();
    document.name = account.getName();
    document.birthDate = account.getBirthDate();
    document.address = account.getAddress();
    document.level = account.getLevel();

    return document;
  }
}
