import type { ForwardedRef } from 'react';
import type { ChartType, ChartData, DefaultDataPoint, ChartDataset } from 'chart.js';
export declare function reforwardRef<T>(ref: ForwardedRef<T>, value: T): void;
export declare function setNextDatasets<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(currentData: ChartData<TType, TData, TLabel>, nextDatasets: ChartDataset<TType, TData>[]): void;
