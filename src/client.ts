import { Mongoose, Connection } from 'mongoose';
export { Client };

class Client {
  private mongoose: Mongoose;
  private uri: any;

  constructor () {
    this.mongoose = new Mongoose();
    this.mongoose.Promise = global.Promise;
    this.uri =  process.env.URI;
  }

  public connect () : Promise<any> {
    return new Promise((resolve, reject) => {
      this.mongoose.connect(this.uri, { useMongoClient: true, promiseLibrary: global.Promise })
      .then(() => resolve())
      .catch((err) => reject(err));
    });
  }

  public disconnect () : Promise<any> {
    return new Promise((resolve, reject) => {
      this.mongoose.disconnect()
      .then(() => resolve())
      .catch((err) => reject(err));
    });
  }

  public getConnection() : Connection {
    return this.mongoose.connection;
  }

}
