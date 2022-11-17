/// <reference types="react" />
import type { ChartProps, ChartJSOrUndefined } from './types.js';
export declare const Line: <TData = (number | import("chart.js/dist/chunks/helpers.core.js").ad | null)[], TLabel = unknown>(props: Omit<ChartProps<"line", TData, TLabel>, "type"> & {
    ref?: import("./types.js").ForwardedRef<ChartJSOrUndefined<"line", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Bar: <TData = (number | [number, number] | null)[], TLabel = unknown>(props: Omit<ChartProps<"bar", TData, TLabel>, "type"> & {
    ref?: import("./types.js").ForwardedRef<ChartJSOrUndefined<"bar", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Radar: <TData = (number | null)[], TLabel = unknown>(props: Omit<ChartProps<"radar", TData, TLabel>, "type"> & {
    ref?: import("./types.js").ForwardedRef<ChartJSOrUndefined<"radar", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Doughnut: <TData = number[], TLabel = unknown>(props: Omit<ChartProps<"doughnut", TData, TLabel>, "type"> & {
    ref?: import("./types.js").ForwardedRef<ChartJSOrUndefined<"doughnut", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const PolarArea: <TData = number[], TLabel = unknown>(props: Omit<ChartProps<"polarArea", TData, TLabel>, "type"> & {
    ref?: import("./types.js").ForwardedRef<ChartJSOrUndefined<"polarArea", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Bubble: <TData = import("chart.js/dist/chunks/helpers.core.js").a9[], TLabel = unknown>(props: Omit<ChartProps<"bubble", TData, TLabel>, "type"> & {
    ref?: import("./types.js").ForwardedRef<ChartJSOrUndefined<"bubble", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Pie: <TData = number[], TLabel = unknown>(props: Omit<ChartProps<"pie", TData, TLabel>, "type"> & {
    ref?: import("./types.js").ForwardedRef<ChartJSOrUndefined<"pie", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Scatter: <TData = (number | import("chart.js/dist/chunks/helpers.core.js").ad | null)[], TLabel = unknown>(props: Omit<ChartProps<"scatter", TData, TLabel>, "type"> & {
    ref?: import("./types.js").ForwardedRef<ChartJSOrUndefined<"scatter", TData, TLabel>> | undefined;
}) => JSX.Element;
//# sourceMappingURL=typedCharts.d.ts.map