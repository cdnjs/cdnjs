import type { CanvasHTMLAttributes, ForwardedRef, ReactNode, MouseEvent } from 'react';
import type { Chart, ChartType, ChartData, ChartOptions, DefaultDataPoint, Plugin, InteractionItem } from 'chart.js';
export interface Props<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown, TOtherType extends TType = TType> extends CanvasHTMLAttributes<HTMLCanvasElement> {
    type: TType;
    data: ChartData<TOtherType, TData, TLabel> | ((canvas: HTMLCanvasElement) => ChartData<TOtherType, TData, TLabel>);
    options?: ChartOptions<TOtherType>;
    plugins?: Plugin<TOtherType>[];
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
export declare type TypedChartComponent<TDefaultType extends ChartType = ChartType, TOmitType = false> = TOmitType extends true ? <TData = DefaultDataPoint<TDefaultType>, TLabel = unknown>(props: Omit<Props<TDefaultType, TData, TLabel>, 'type'> & {
    ref?: ForwardedRef<ChartJSOrUndefined<TDefaultType, TData, TLabel>>;
}) => JSX.Element : <TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown, TOtherType extends TType = TType>(props: Props<TType, TData, TLabel, TOtherType> & {
    ref?: ForwardedRef<ChartJSOrUndefined<TType, TData, TLabel>>;
}) => JSX.Element;
