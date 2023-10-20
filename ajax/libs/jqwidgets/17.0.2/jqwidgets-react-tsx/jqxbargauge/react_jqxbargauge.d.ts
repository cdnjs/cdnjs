import * as React from 'react';
declare class JqxBarGauge extends React.PureComponent<IBarGaugeProps, IState> {
    protected static getDerivedStateFromProps(props: IBarGaugeProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IBarGaugeProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IBarGaugeProps): void;
    getOptions(option: string): any;
    refresh(): void;
    renderWidget(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxBarGauge;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IBarGaugeLabelsFont {
    color?: string;
    size?: number | string;
    family?: string;
}
export interface IBarGaugeLabels {
    connectorColor?: string;
    connectorWidth?: number;
    font?: IBarGaugeLabelsFont;
    formatFunction?: (value: number, index?: number) => string;
    indent?: number;
    precision?: number;
    visible?: boolean;
}
export interface IBarGaugeTextFont {
    color?: string;
    family?: string;
    opacity?: number;
    size?: number | string;
    weight?: number;
}
export interface IBarGaugeTitleMargin {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
}
export interface IBarGaugeTitleSubtitle {
    text?: string;
    font?: IBarGaugeTextFont;
}
export interface IBarGaugeTitle {
    text?: string;
    font?: IBarGaugeTextFont;
    horizontalAlignment?: 'left' | 'center' | 'right';
    margin?: IBarGaugeTitleMargin;
    subtitle?: IBarGaugeTitleSubtitle;
    verticalAlignment?: 'top' | 'bottom';
}
export interface IBarGaugeTooltip {
    classname?: string;
    formatFunction?: (value: string, index?: number, color?: string) => string;
    visible?: boolean;
    precision?: number;
}
export interface IBarGaugeCustomColorScheme {
    name?: string;
    colors?: string[];
}
interface IBarGaugeOptions {
    animationDuration?: number;
    backgroundColor?: string;
    barSpacing?: number;
    baseValue?: number;
    colorScheme?: string;
    customColorScheme?: IBarGaugeCustomColorScheme;
    disabled?: boolean;
    endAngle?: number;
    formatFunction?: (value: number, index?: number, color?: string) => string;
    height?: string | number;
    labels?: IBarGaugeLabels;
    max?: number | string;
    min?: number;
    relativeInnerRadius?: number | string;
    rendered?: () => void;
    startAngle?: number;
    title?: IBarGaugeTitle;
    tooltip?: IBarGaugeTooltip;
    useGradient?: boolean;
    values?: number[];
    width?: string | number;
}
export interface IBarGaugeProps extends IBarGaugeOptions {
    className?: string;
    style?: React.CSSProperties;
    onDrawEnd?: (e?: Event) => void;
    onDrawStart?: (e?: Event) => void;
    onInitialized?: (e?: Event) => void;
    onTooltipClose?: (e?: Event) => void;
    onTooltipOpen?: (e?: Event) => void;
    onValueChanged?: (e?: Event) => void;
}
