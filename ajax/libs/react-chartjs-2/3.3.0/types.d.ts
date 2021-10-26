import type { CanvasHTMLAttributes, ForwardedRef, ReactNode, MouseEvent } from 'react';
import type { Chart, ChartType, ChartData, ChartOptions, DefaultDataPoint, Plugin, InteractionItem } from 'chart.js';
export interface ChartProps<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> extends CanvasHTMLAttributes<HTMLCanvasElement> {
    type: TType;
    /**
     * @todo Remove function variant.
     */
    data: ChartData<TType, TData, TLabel> | ((canvas: HTMLCanvasElement) => ChartData<TType, TData, TLabel>);
    options?: ChartOptions<TType>;
    plugins?: Plugin<TType>[];
    redraw?: boolean;
    /**
     * @todo Replace with `children` prop.
     */
    fallbackContent?: ReactNode;
    getDatasetAtEvent?: (dataset: InteractionItem[], event: MouseEvent<HTMLCanvasElement>) => void;
    getElementAtEvent?: (element: InteractionItem[], event: MouseEvent<HTMLCanvasElement>) => void;
    getElementsAtEvent?: (elements: InteractionItem[], event: MouseEvent<HTMLCanvasElement>) => void;
}
/**
 * @todo Replace `undefined` with `null`
 */
export declare type ChartJSOrUndefined<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> = Chart<TType, TData, TLabel> | undefined;
export declare type TypedChartComponent<TDefaultType extends ChartType = ChartType, TOmitType = false> = TOmitType extends true ? <TData = DefaultDataPoint<TDefaultType>, TLabel = unknown>(props: Omit<ChartProps<TDefaultType, TData, TLabel>, 'type'> & {
    ref?: ForwardedRef<ChartJSOrUndefined<TDefaultType, TData, TLabel>>;
}) => JSX.Element : <TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown>(props: ChartProps<TType, TData, TLabel> & {
    ref?: ForwardedRef<ChartJSOrUndefined<TType, TData, TLabel>>;
}) => JSX.Element;
