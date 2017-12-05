import { Account } from 'pet-entity';
import { AccountInterface, AccountSchema } from '../schema/account';

import { Model, Connection, DocumentQuery} from 'mongoose';
export { AccountDb }

class AccountDb {

  private model: Model<AccountInterface>;

  constructor (connection: Connection) {
    this.model = connection.model<AccountInterface>("account", AccountSchema);
  }

  public create (account: Account) : Promise<Account> {
    let iAccount: AccountInterface = this.toDocument(account);
    return new Promise ((resolve, reject) => {
      this.model.create(iAccount)
      .then((result: AccountInterface) => {
        if (result)
          resolve(this.toObject(result));
        else
          resolve(new Account());
      })
      .catch((err: any) => reject(err));
    });
  }

  public retrieve (id: string) : Promise<Account> {
    return new Promise ((resolve, reject) => {
      this.model.findById(id)
      .then((result: AccountInterface) => {
        if (result)
          resolve(this.toObject(result));
        else
          resolve(new Account());
      })
      .catch((err: any) => reject(err));
    });
  }

  public retrieveByEmail (email: string) : Promise<Account> {
    return new Promise ((resolve, reject) => {
      this.model.findOne({email:email})
      .then((result: AccountInterface) => {
        if (result)
          resolve(this.toObject(result));
        else
          resolve(new Account());
      })
      .catch((err: any) => reject(err));
    });
  }

  public list () : Promise<Array<Account>> {
    return new Promise ((resolve, reject) => {
      this.model.find().exec()
      .then((result: Array<AccountInterface>) => {
        let array: Array<Account> = [];
        for(let i = 0; i < result.length; i++) {
          let account: Account = this.toObject(result[i]);
          array.push(account);
        }
        resolve(array);
      })
      .catch((err: any) => reject(err));
    });
  }

  public update (id: string, update: Account) : Promise<Account> {
    return new Promise ((resolve, reject) => {
      let iUpdate: AccountInterface = this.toDocument(update);
      this.model.findByIdAndUpdate(id, iUpdate, { new: true})
      .then((result: AccountInterface) => {
        if (result)
          resolve(this.toObject(result));
        else
          resolve(new Account());
      })
      .catch((err: any) => reject(err));
    });
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
