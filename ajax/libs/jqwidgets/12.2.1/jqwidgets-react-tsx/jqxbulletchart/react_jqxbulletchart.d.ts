import * as React from 'react';
declare class JqxBulletChart extends React.PureComponent<IBulletChartProps, IState> {
    protected static getDerivedStateFromProps(props: IBulletChartProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IBulletChartProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IBulletChartProps): void;
    getOptions(option: string): any;
    destroy(): void;
    renderWidget(): void;
    refresh(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxBulletChart;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IBulletChartLabelsFormatFunction {
    value?: string;
    position?: string;
}
export interface IBulletChartTooltipFormatFunction {
    pointerValue?: number;
    targetValue?: number;
}
export interface IBulletChartPointer {
    value?: number;
    label?: string;
    size?: number | string;
    color?: string;
}
export interface IBulletChartRanges {
    startValue?: number;
    endValue?: number;
    opacity?: number;
    color?: string;
}
export interface IBulletChartTicks {
    position?: 'near' | 'far' | 'both' | 'none';
    interval?: number;
    size?: number | string;
}
interface IBulletChartOptions {
    animationDuration?: number;
    barSize?: number | string;
    description?: string;
    disabled?: boolean;
    height?: string | number;
    labelsFormat?: 'null' | 'd' | 'f' | 'n' | 'c' | 'p';
    labelsFormatFunction?: (value?: IBulletChartLabelsFormatFunction['value'], position?: IBulletChartLabelsFormatFunction['position']) => any;
    orientation?: 'horizontal' | 'vertical';
    pointer?: IBulletChartPointer;
    rtl?: boolean;
    ranges?: IBulletChartRanges[];
    showTooltip?: boolean;
    target?: IBulletChartPointer;
    ticks?: IBulletChartTicks;
    title?: string;
    tooltipFormatFunction?: (pointerValue?: IBulletChartTooltipFormatFunction['pointerValue'], targetValue?: IBulletChartTooltipFormatFunction['targetValue']) => string;
    width?: string | number;
}
export interface IBulletChartProps extends IBulletChartOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
}
