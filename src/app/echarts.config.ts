// src/app/echarts-config.ts
import * as echarts from 'echarts/core';

import { GaugeChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

// Regístralos en ECharts (esto es obligatorio con echarts/core)
echarts.use([
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  CanvasRenderer,
]);

export { echarts };
