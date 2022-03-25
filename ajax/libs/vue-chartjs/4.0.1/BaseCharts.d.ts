import type { ChartComponentLike } from 'chart.js';
import type { TypedChartComponent } from './types';
export declare const generateChart: <TType extends keyof import("chart.js").ChartTypeRegistry = keyof import("chart.js").ChartTypeRegistry, TData = import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, TLabel = unknown>(chartId: string, chartType: TType, chartController: ChartComponentLike) => TypedChartComponent<TType, TData, TLabel>;
export declare const Bar: TypedChartComponent<"bar", number[], unknown>;
export declare const Doughnut: TypedChartComponent<"doughnut", number[], unknown>;
export declare const Line: TypedChartComponent<"line", (number | import("chart.js").ScatterDataPoint | null)[], unknown>;
export declare const Pie: TypedChartComponent<"pie", number[], unknown>;
export declare const PolarArea: TypedChartComponent<"polarArea", number[], unknown>;
export declare const Radar: TypedChartComponent<"radar", (number | null)[], unknown>;
export declare const Bubble: TypedChartComponent<"bubble", import("chart.js").BubbleDataPoint[], unknown>;
export declare const Scatter: TypedChartComponent<"scatter", (number | import("chart.js").ScatterDataPoint | null)[], unknown>;
declare const _default: {
    Bar: TypedChartComponent<"bar", number[], unknown>;
    Doughnut: TypedChartComponent<"doughnut", number[], unknown>;
    Line: TypedChartComponent<"line", (number | import("chart.js").ScatterDataPoint | null)[], unknown>;
    Pie: TypedChartComponent<"pie", number[], unknown>;
    PolarArea: TypedChartComponent<"polarArea", number[], unknown>;
    Radar: TypedChartComponent<"radar", (number | null)[], unknown>;
    Bubble: TypedChartComponent<"bubble", import("chart.js").BubbleDataPoint[], unknown>;
    Scatter: TypedChartComponent<"scatter", (number | import("chart.js").ScatterDataPoint | null)[], unknown>;
};
export default _default;
//# sourceMappingURL=BaseCharts.d.ts.map