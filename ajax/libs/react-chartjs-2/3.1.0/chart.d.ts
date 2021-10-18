import React from 'react';
import Chart from 'chart.js/auto';
import { Props } from './types';
declare const ChartComponent: React.ForwardRefExoticComponent<Props & React.RefAttributes<Chart<keyof import("chart.js").ChartTypeRegistry, (number | import("chart.js").ScatterDataPoint | import("chart.js").BubbleDataPoint | null)[], unknown> | undefined>>;
export default ChartComponent;
