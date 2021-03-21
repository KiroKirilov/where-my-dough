import { DbProvider } from '../dbProvider';
import { BaseModel } from '../models/baseModel';

const db = DbProvider.getDbInstance();

export abstract class DbRepository<TModel extends BaseModel> {
  protected abstract type: string;
  protected db: PouchDB.Database<{}> = db;
  protected ensureIndex() {
    return db.createIndex({
      index: { fields: ['createdOn', 'type'] }
    });
  }

  public async getAll(): Promise<TModel[]> {
    await this.ensureIndex();
    const data = await db.find({
      selector: {
        createdOn: {
          $gt: null
        },
        type: this.type
      },
      sort: [{
        createdOn: 'desc'
      }]
    });

    return (data.docs as unknown) as TModel[];
  }

  public async getLatest(): Promise<TModel> {
    await this.ensureIndex();

    const data = await db.find({
      selector: {
        createdOn: {
          $gt: null
        },
        type: this.type
      },
      sort: [{
        createdOn: 'desc'
      }],
      limit: 1
    });

    return (data.docs[0] as unknown) as TModel;
  }

  public create(model: TModel) {
    model.type = this.type;
    model.createdOn = new Date().getTime();
    return db.post(model);
  }

  public update(model: TModel) {
    return db.put(model);
  }

  public delete(model: TModel) {
    return db.remove(model._id || '', model._rev || '', undefined);
  }

  public async clearTable() {
    const itemsToDelete = await this.getAll();
    return db.bulkDocs(itemsToDelete.map(x => ({
      _id: x._id,
      _rev: x._rev,
      _deleted: true
    })))
  }
}
