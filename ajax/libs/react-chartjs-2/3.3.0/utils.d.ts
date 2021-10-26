import type { ForwardedRef } from 'react';
import type { ChartType, ChartData, DefaultDataPoint, ChartDataset, ChartOptions, Chart } from 'chart.js';
export declare function reforwardRef<T>(ref: ForwardedRef<T>, value: T): void;
export declare function setOptions<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(chart: Chart<TType, TData, TLabel>, nextOptions: ChartOptions<TType>): void;
export declare function setLabels<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(currentData: ChartData<TType, TData, TLabel>, nextLabels: TLabel[] | undefined): void;
export declare function setDatasets<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(currentData: ChartData<TType, TData, TLabel>, nextDatasets: ChartDataset<TType, TData>[]): void;
export declare function cloneData<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(data: ChartData<TType, TData, TLabel>): ChartData<TType, TData, TLabel>;
