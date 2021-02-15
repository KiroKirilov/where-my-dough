import PouchDb from 'pouchdb-browser';
import find from 'pouchdb-find';

PouchDb
  .plugin(find);

const db = new PouchDb('local_db');

export class DbProvider {
  public static getDbInstance() {
    return db;
  }
}
