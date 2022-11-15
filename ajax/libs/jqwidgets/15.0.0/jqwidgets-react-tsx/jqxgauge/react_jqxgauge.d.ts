import * as React from 'react';
declare class JqxGauge extends React.PureComponent<IGaugeProps, IState> {
    protected static getDerivedStateFromProps(props: IGaugeProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IGaugeProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IGaugeProps): void;
    getOptions(option: string): any;
    disable(): void;
    enable(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxGauge;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IGaugeStyle {
    fill?: string;
    stroke?: string;
}
export interface IGaugeBorder {
    size?: number | string;
    visible?: boolean;
    style?: IGaugeStyle;
    showGradient?: boolean;
}
export interface IGaugeCaption {
    value?: string;
    position?: 'top' | 'bottom';
    offset?: number[];
    visible?: boolean;
}
export interface IGaugeCap {
    size?: number | string;
    visible?: boolean;
    style?: IGaugeStyle;
}
export interface IGaugeLabels {
    distance?: string;
    position?: 'none' | 'inside' | 'outside';
    interval?: number | string;
    offset?: number[];
    visible?: boolean;
    formatValue?: (value?: number) => string;
}
export interface IGaugePointer {
    pointerType?: string;
    style?: IGaugeStyle;
    width?: number | string;
    length?: number | string;
    visible?: boolean;
}
export interface IGaugeRanges {
    startValue?: number | string;
    endValue?: number | string;
    startWidth?: number | string;
    endWidth?: number | string;
    startDistance?: number | string;
    endDistance?: number | string;
    style?: IGaugeStyle;
}
export interface IGaugeTicks {
    size?: number | string;
    interval?: number | string;
    visible?: boolean;
    style?: IGaugeStyle;
}
interface IGaugeOptions {
    animationDuration?: string | number;
    border?: IGaugeBorder;
    caption?: IGaugeCaption;
    cap?: IGaugeCap;
    colorScheme?: string;
    disabled?: boolean;
    easing?: 'linear' | 'easeOutBack' | 'easeInQuad' | 'easeInOutCirc' | 'easeInOutSine' | 'easeOutCubic';
    endAngle?: number | string;
    height?: number | string;
    int64?: boolean;
    labels?: IGaugeLabels;
    min?: number;
    max?: number | string;
    pointer?: IGaugePointer;
    radius?: number | string;
    ranges?: IGaugeRanges[];
    startAngle?: number | string;
    showRanges?: boolean;
    styles?: IGaugeStyle;
    ticksMajor?: IGaugeTicks;
    ticksMinor?: IGaugeTicks;
    ticksDistance?: string;
    value?: number;
    width?: number | string;
}
export interface IGaugeProps extends IGaugeOptions {
    className?: string;
    style?: React.CSSProperties;
    onValueChanging?: (e?: Event) => void;
    onValueChanged?: (e?: Event) => void;
}
