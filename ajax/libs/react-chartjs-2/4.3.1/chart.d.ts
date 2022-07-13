import type { ForwardedRef, ChartProps } from './types';
export declare const Chart: <TType extends keyof import("chart.js").ChartTypeRegistry = keyof import("chart.js").ChartTypeRegistry, TData = import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, TLabel = unknown>(props: ChartProps<TType, TData, TLabel> & {
    ref?: ForwardedRef<import("./types").ChartJSOrUndefined<TType, TData, TLabel>> | undefined;
}) => JSX.Element;
//# sourceMappingURL=chart.d.ts.map