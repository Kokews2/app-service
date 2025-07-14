import { Component, Input, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsCoreOption } from 'echarts/core';

import { HmiGaugeOptions } from '../../models/items/gauge.model';
import { HmiItem } from '../../models/item.model';

@Component({
  selector: 'app-gauge-widget',
  standalone: true,
  imports: [NgxEchartsModule],
  template: `
    <div
      echarts
      [options]="gaugeOptions"
      class="widget"
      style="height: 200px;"
    ></div>
  `,
  styles: [
    `
      .widget {
        margin: 10px;
      }
    `,
  ],
})
export class GaugeWidgetComponent implements HmiItem, OnInit {
  @Input() id!: string;
  @Input() name!: string;
  @Input() type!: string;
  @Input() x!: number;
  @Input() y!: number;
  @Input() width!: number;
  @Input() height!: number;
  @Input() options!: HmiGaugeOptions;

  gaugeOptions!: EChartsCoreOption;

  ngOnInit() {
    this.gaugeOptions = {
      title: { text: this.options.title, left: 'center' },
      series: [
        {
          type: 'gauge',
          progress: { show: true },
          detail: { valueAnimation: true, formatter: '{value}%' },
          data: [{ value: this.options.value }],
        },
      ],
    };
  }
}
