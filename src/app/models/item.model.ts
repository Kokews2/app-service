export interface HmiItem {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  options: HmiItemOptions;
}

export interface HmiItemOptions {}
