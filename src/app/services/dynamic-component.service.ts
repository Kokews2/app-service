import { Injectable, Type } from '@angular/core';
import { GaugeWidgetComponent } from '../components/widgets/gauge.component';

@Injectable({ providedIn: 'root' })
export class DynamicComponentService {
  private componentMap: Record<string, Type<any>> = {
    gauge: GaugeWidgetComponent,
  };

  getComponent(type: string): Type<any> | null {
    return this.componentMap[type] ?? null;
  }
}
