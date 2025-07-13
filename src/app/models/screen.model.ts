import { HmiItem } from './item.model';

export interface HmiScreen {
  id: string;
  name: string;
  isActive: boolean;
  items: HmiItem[];
}
