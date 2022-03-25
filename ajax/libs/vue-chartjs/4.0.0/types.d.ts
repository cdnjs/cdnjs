import { Chart as ChartJS } from 'chart.js';
import type { ChartType, ChartData, ChartOptions, PluginChartOptions, DefaultDataPoint, PluginOptionsByType } from 'chart.js';
import { ComponentOptionsMixin, ComputedOptions, DefineComponent, MethodOptions, Ref, ShallowRef } from 'vue';
import { ChartEmits } from './utils';
export declare type TChartData<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> = ChartData<TType, TData, TLabel>;
export declare type TChartOptions<TType extends ChartType> = ChartOptions<TType>;
export declare type TChartPlugins<TType extends ChartType> = PluginChartOptions<TType>;
export declare type TypedChartJS<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> = ChartJS<TType, TData, TLabel>;
export interface IChartProps<TType extends ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> {
    chartData: TChartData<TType, TData, TLabel>;
    datasetIdKey?: string;
    chartOptions?: TChartOptions<TType>;
    chartId?: string;
    width?: number;
    height?: number;
    cssClasses?: string;
    styles?: Partial<CSSStyleDeclaration>;
    plugins?: PluginOptionsByType<TType>;
}
export interface IChartComponentData<TType extends ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> {
    _chart: ShallowRef<TypedChartJS<TType, TData, TLabel> | null>;
    canvasEl: Ref<HTMLCanvasElement | null>;
    renderChart: (data: TChartData<TType, TData, TLabel>, options: TChartOptions<TType>) => void;
    chartDataHandler: (newValue: TChartData<TType, TData, TLabel>, oldValue: TChartData<TType, TData, TLabel>) => void;
}
export declare type TypedChartEmits = {
    [ChartEmits.ChartRendered]: () => true;
    [ChartEmits.ChartUpdated]: () => true;
    [ChartEmits.ChartDestroyed]: () => true;
    [ChartEmits.LabelsUpdated]: () => true;
};
export declare type TypedChartComponent<TType extends ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> = DefineComponent<IChartProps<TType, TData, TLabel>, IChartComponentData<TType, TData, TLabel>, unknown, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, TypedChartEmits>;
//# sourceMappingURL=types.d.ts.map