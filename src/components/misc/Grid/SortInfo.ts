import { ColumnInfo } from './ColumnInfo';
import { SortDirection } from './SortDirection';

export class SortInfo {
  column?: ColumnInfo;
  direction!: SortDirection;
}
