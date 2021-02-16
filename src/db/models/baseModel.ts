export abstract class BaseModel {
  _id?: string;
  _rev?: string;
  createdOn?: Date | number;
  type?: string;
}
