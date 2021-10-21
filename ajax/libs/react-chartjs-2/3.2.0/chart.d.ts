import React from 'react';
import type { Props } from './types';
export declare const Chart: <TType extends keyof import("chart.js").ChartTypeRegistry = keyof import("chart.js").ChartTypeRegistry, TData = import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, TLabel = unknown>(props: Props<TType, TData, TLabel> & {
    ref?: React.ForwardedRef<import("./types").ChartJSOrUndefined<TType, TData, TLabel>> | undefined;
}) => JSX.Element;
