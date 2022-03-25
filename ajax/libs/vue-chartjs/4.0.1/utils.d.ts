import type { ChartType, DefaultDataPoint, PluginOptionsByType } from 'chart.js';
import type { TChartData, TChartOptions, TypedChartJS } from './types';
import { SetupContext } from 'vue';
export declare enum ChartEmits {
    ChartRendered = "chart:rendered",
    ChartUpdated = "chart:updated",
    ChartDestroyed = "chart:destroyed",
    LabelsUpdated = "labels:updated"
}
export declare function chartCreate<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(createChartFunction: (data: TChartData<TType, TData, TLabel>, options: TChartOptions<TType>) => void, chartData: TChartData<TType, TData, TLabel>, chartOptions: TChartOptions<TType>, context?: SetupContext): void;
export declare function chartUpdate<TType extends ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(chart: TypedChartJS<TType, TData, TLabel>, context?: SetupContext): void;
export declare function chartDestroy<TType extends ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(chart: TypedChartJS<TType, TData, TLabel>, context?: SetupContext): void;
export declare function getChartData<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(data: TChartData<TType, TData, TLabel>, datasetIdKey: string): TChartData<TType, TData, TLabel>;
export declare function getChartOptions<TType extends ChartType = ChartType>(options?: TChartOptions<TType>, plugins?: PluginOptionsByType<TType>): TChartOptions<TType> | undefined;
export declare function setChartDatasets<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(oldData: TChartData<TType, TData, TLabel>, newData: TChartData<TType, TData, TLabel>, datasetIdKey: string): void;
export declare function setChartLabels<TType extends ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(chart: TypedChartJS<TType, TData, TLabel>, labels: TLabel[] | undefined, context?: SetupContext): void;
export declare function compareData<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(newData: TChartData<TType, TData, TLabel>, oldData: TChartData<TType, TData, TLabel>): boolean;
export declare const templateError = "Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components";
//# sourceMappingURL=utils.d.ts.map