import { DbProvider } from '../dbProvider';
import { BaseModel } from '../models/baseModel';

const db = DbProvider.getDbInstance();

export abstract class DbRepository<TModel extends BaseModel> {
  protected abstract type: string;

  public async getAll(): Promise<TModel[]> {
    await db.createIndex({
      index: { fields: ['createdOn', 'type'] }
    });

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

  public create(model: TModel) {
    model.type = this.type;
    model.createdOn = new Date().getTime();
    return db.post(model);
  }

  public update(model: TModel) {
    return db.put(model);
  }

  public clearDb() {
    console.log('a');
  }
}
