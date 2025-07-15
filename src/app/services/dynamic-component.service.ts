import { Injectable, Type } from '@angular/core';
import { GaugeWidgetComponent } from '../components/widgets/gauge.component';
import { TableComponent } from '../components/table/table.component/table.component';

@Injectable({ providedIn: 'root' })
export class DynamicComponentService {
  private componentMap: Record<string, Type<any>> = {
    gauge: GaugeWidgetComponent,
    table: TableComponent
  };

  getComponent(type: string): Type<any> | null {
    return this.componentMap[type] ?? null;
  }
}
