import * as React from 'react';
declare class JqxLinearGauge extends React.PureComponent<ILinearGaugeProps, IState> {
    protected static getDerivedStateFromProps(props: ILinearGaugeProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ILinearGaugeProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ILinearGaugeProps): void;
    getOptions(option: string): any;
    disable(): void;
    enable(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxLinearGauge;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface ILinearGaugeRanges {
    startValue?: number;
    endValue?: number;
    style?: any;
}
export interface ILinearGaugeBackground {
    borderType?: 'rectangle' | 'roundedRectangle';
    borderRadius?: any;
    visible?: boolean;
    style?: any;
    showGradient?: boolean;
}
export interface ILinearGaugeLabels {
    position?: 'far' | 'near' | 'both';
    style?: any;
    interval?: number;
    offset?: number;
    formatValue?: (value: any, position: string) => any;
    visible?: boolean;
}
export interface ILinearGaugePointer {
    pointerType?: 'default' | 'rectangle';
    style?: any;
    size?: number | string;
    offset?: number;
    visible?: boolean;
}
export interface ILinearGaugeTicks {
    size?: number | string;
    interval?: number;
    visible?: boolean;
    style?: any;
}
interface ILinearGaugeOptions {
    animationDuration?: number;
    background?: ILinearGaugeBackground;
    colorScheme?: string;
    disabled?: boolean;
    easing?: 'linear' | 'easeOutBack' | 'easeInQuad' | 'easeInOutCirc' | 'easeInOutSine' | 'easeOutCubic';
    height?: number | string;
    int64?: boolean;
    labels?: ILinearGaugeLabels | ILinearGaugeLabels[];
    min?: number;
    max?: number;
    orientation?: 'vertical' | 'horizontal';
    pointer?: ILinearGaugePointer;
    rangesOffset?: number;
    rangeSize?: number | string;
    ranges?: ILinearGaugeRanges[];
    showRanges?: boolean;
    scaleStyle?: any;
    scaleLength?: number | string;
    ticksOffset?: Array<number | string>;
    ticksPosition?: 'far' | 'near' | 'both';
    ticksMinor?: ILinearGaugeTicks;
    ticksMajor?: ILinearGaugeTicks;
    value?: number;
    width?: number | string;
}
export interface ILinearGaugeProps extends ILinearGaugeOptions {
    className?: string;
    style?: React.CSSProperties;
    onValueChanging?: (e?: Event) => void;
    onValueChanged?: (e?: Event) => void;
}
