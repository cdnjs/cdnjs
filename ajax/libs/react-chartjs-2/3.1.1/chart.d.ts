import React from 'react';
import { Props, ChartJSOrUndefined } from './types';
export declare const Chart: <TType extends keyof import("chart.js").ChartTypeRegistry = keyof import("chart.js").ChartTypeRegistry, TData = import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, TLabel = unknown, TOtherType extends TType = TType>(props: Props<TType, TData, TLabel, TOtherType> & {
    ref?: React.ForwardedRef<ChartJSOrUndefined<TType, TData, TLabel>> | undefined;
}) => JSX.Element;
