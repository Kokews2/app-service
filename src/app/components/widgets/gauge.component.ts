import { Component, Input, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-gauge-widget',
  standalone: true,
  imports: [NgxEchartsModule],
  template: `
    <div
      echarts
      [options]="options"
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
export class GaugeWidgetComponent implements OnInit {
  @Input() value!: number;
  @Input() title!: string;

  options: any;

  ngOnInit() {
    this.options = {
      title: { text: this.title, left: 'center' },
      series: [
        {
          type: 'gauge',
          progress: { show: true },
          detail: { valueAnimation: true, formatter: '{value}%' },
          data: [{ value: this.value }],
        },
      ],
    };
  }
}
