import * as React from 'react';
declare class JqxSlider extends React.PureComponent<ISliderProps, IState> {
    protected static getDerivedStateFromProps(props: ISliderProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ISliderProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ISliderProps): void;
    getOptions(option: string): any;
    destroy(): void;
    decrementValue(): void;
    disable(): void;
    enable(): void;
    focus(): void;
    getValue(): number;
    incrementValue(): void;
    setValue(index: number | number[]): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxSlider;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface ISliderTickLabelFormatFunction {
    value?: number;
}
export interface ISliderTooltipFormatFunction {
    value?: number;
}
interface ISliderOptions {
    buttonsPosition?: 'both' | 'left' | 'right';
    disabled?: boolean;
    height?: string | number;
    layout?: 'normal' | 'reverse';
    mode?: 'default' | 'fixed';
    minorTicksFrequency?: number;
    minorTickSize?: number;
    max?: number;
    min?: number;
    orientation?: string;
    rangeSlider?: boolean;
    rtl?: boolean;
    step?: number;
    showTicks?: boolean;
    showMinorTicks?: boolean;
    showTickLabels?: boolean;
    showButtons?: boolean;
    showRange?: boolean;
    template?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    theme?: string;
    ticksPosition?: 'top' | 'bottom' | 'both';
    ticksFrequency?: number;
    tickSize?: number;
    tickLabelFormatFunction?: (value: ISliderTickLabelFormatFunction['value']) => string;
    tooltip?: boolean;
    tooltipHideDelay?: number;
    tooltipPosition?: 'near' | 'far';
    tooltipFormatFunction?: (value: ISliderTooltipFormatFunction['value']) => any;
    value?: any;
    values?: number[];
    width?: number | string;
}
export interface ISliderProps extends ISliderOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
    onSlide?: (e?: Event) => void;
    onSlideStart?: (e?: Event) => void;
    onSlideEnd?: (e?: Event) => void;
}
