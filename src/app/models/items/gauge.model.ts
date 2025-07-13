import { HmiItem, HmiItemOptions } from '../item.model';

export interface HmiGauge extends HmiItem {
  options: HmiGaugeOptions;
}

export interface HmiGaugeOptions extends HmiItemOptions {
  title: string;
  value: number;
}
