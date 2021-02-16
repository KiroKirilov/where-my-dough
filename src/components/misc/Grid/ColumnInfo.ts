import { ColumnType } from './ColumnType';

export class ColumnInfo {
  name!: string;
  title?: string;
  type?: ColumnType;
  sortable?: boolean;
}
