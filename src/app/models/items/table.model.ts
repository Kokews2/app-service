import { HmiItemOptions } from '../item.model';

export interface HmiTableOptions extends HmiItemOptions {
  data: any[];
  columns: string[];
}
