import { DbProvider } from '../dbProvider';
import { BaseModel } from '../models/baseModel';

const db = DbProvider.getDbInstance();

export abstract class DbRepository<TModel extends BaseModel> {
  protected abstract type: string;

  public getAll(): Promise<TModel[]> {
    return db.find({
      selector: {
        type: this.type
      }
    }).then(x => (x.docs as unknown) as TModel[])
  }

  public create(model: TModel) {
    model.type = this.type;
    model.createdOn = new Date();
    return db.post(model);
  }

  public clearDb() {
    console.log('a');
  }
}
