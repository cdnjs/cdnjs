import React from 'react';
import { Props, ChartJSOrUndefined } from './types';
export declare const Line: <TData = (number | import("chart.js").ScatterDataPoint | null)[], TLabel = unknown>(props: Omit<Props<"line", TData, TLabel>, "type"> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<"line", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Bar: <TData = number[], TLabel = unknown>(props: Omit<Props<"bar", TData, TLabel>, "type"> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<"bar", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Radar: <TData = (number | null)[], TLabel = unknown>(props: Omit<Props<"radar", TData, TLabel>, "type"> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<"radar", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Doughnut: <TData = number[], TLabel = unknown>(props: Omit<Props<"doughnut", TData, TLabel>, "type"> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<"doughnut", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const PolarArea: <TData = number[], TLabel = unknown>(props: Omit<Props<"polarArea", TData, TLabel>, "type"> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<"polarArea", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Bubble: <TData = import("chart.js").BubbleDataPoint[], TLabel = unknown>(props: Omit<Props<"bubble", TData, TLabel>, "type"> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<"bubble", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Pie: <TData = number[], TLabel = unknown>(props: Omit<Props<"pie", TData, TLabel>, "type"> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<"pie", TData, TLabel>> | undefined;
}) => JSX.Element;
export declare const Scatter: <TData = (number | import("chart.js").ScatterDataPoint | null)[], TLabel = unknown>(props: Omit<Props<"scatter", TData, TLabel>, "type"> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<"scatter", TData, TLabel>> | undefined;
}) => JSX.Element;
