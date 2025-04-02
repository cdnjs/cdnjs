import type { CanvasHTMLAttributes, MutableRefObject, ReactNode, JSX } from 'react';
import type { Chart, ChartType, ChartData, ChartOptions, DefaultDataPoint, Plugin, UpdateMode } from 'chart.js';
export type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;
export interface ChartProps<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> extends CanvasHTMLAttributes<HTMLCanvasElement> {
    /**
     * Chart.js chart type
     */
    type: TType;
    /**
     * The data object that is passed into the Chart.js chart
     * @see https://www.chartjs.org/docs/latest/getting-started/
     */
    data: ChartData<TType, TData, TLabel>;
    /**
     * The options object that is passed into the Chart.js chart
     * @see https://www.chartjs.org/docs/latest/general/options.html
     * @default {}
     */
    options?: ChartOptions<TType>;
    /**
     * The plugins array that is passed into the Chart.js chart
     * @see https://www.chartjs.org/docs/latest/developers/plugins.html
     * @default []
     */
    plugins?: Plugin<TType>[];
    /**
     * Teardown and redraw chart on every update
     * @default false
     */
    redraw?: boolean;
    /**
     * Key name to identificate dataset
     * @default 'label'
     */
    datasetIdKey?: string;
    /**
     * A fallback for when the canvas cannot be rendered. Can be used for accessible chart descriptions
     * @see https://www.chartjs.org/docs/latest/general/accessibility.html
     * @default null
     * @todo Replace with `children` prop.
     */
    fallbackContent?: ReactNode;
    /**
     * A mode string to indicate transition configuration should be used.
     * @see https://www.chartjs.org/docs/latest/developers/api.html#update-mode
     */
    updateMode?: UpdateMode;
}
/**
 * @todo Replace `undefined` with `null`
 */
export type ChartJSOrUndefined<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> = Chart<TType, TData, TLabel> | undefined;
export type BaseChartComponent = <TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(props: ChartProps<TType, TData, TLabel> & {
    ref?: ForwardedRef<ChartJSOrUndefined<TType, TData, TLabel>>;
}) => JSX.Element;
export type TypedChartComponent<TDefaultType extends ChartType> = <TData = DefaultDataPoint<TDefaultType>, TLabel = unknown>(props: Omit<ChartProps<TDefaultType, TData, TLabel>, 'type'> & {
    ref?: ForwardedRef<ChartJSOrUndefined<TDefaultType, TData, TLabel>>;
}) => JSX.Element;
//# sourceMappingURL=types.d.ts.map