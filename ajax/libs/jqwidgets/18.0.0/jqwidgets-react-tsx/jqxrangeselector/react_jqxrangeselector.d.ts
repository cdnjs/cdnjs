import * as React from 'react';
declare class JqxRangeSelector extends React.PureComponent<IRangeSelectorProps, IState> {
    protected static getDerivedStateFromProps(props: IRangeSelectorProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IRangeSelectorProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IRangeSelectorProps): void;
    getOptions(option: string): any;
    destroy(): void;
    getRange(): IRangeSelectorGetRange;
    renderWidget(): void;
    refresh(): void;
    setRange(from: any, to: any): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxRangeSelector;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IRangeSelectorRange {
    from?: number | string | Date;
    to?: number | string | Date;
    min?: number | string | object;
    max?: number | string | object;
}
export interface IRangeSelectorGetRange {
    from?: number | string;
    to?: number | string;
}
export interface IRangeSelectorLabelsFormatFunction {
    value?: number | string;
}
export interface IRangeSelectorMarkersFormatFunction {
    value?: number | string;
    position?: string;
}
export interface IRangeSelectorGroupLabelsFormatFunction {
    value?: string;
    date?: object;
}
interface IRangeSelectorOptions {
    disabled?: boolean;
    groupLabelsFormatFunction?: (value: IRangeSelectorGroupLabelsFormatFunction['value'], date: IRangeSelectorGroupLabelsFormatFunction['date']) => string;
    height?: string | number;
    labelsFormat?: string;
    labelsFormatFunction?: (value: IRangeSelectorLabelsFormatFunction['value']) => string;
    labelsOnTicks?: boolean;
    markersFormat?: string;
    markersFormatFunction?: (value: IRangeSelectorMarkersFormatFunction['value'], position: IRangeSelectorMarkersFormatFunction['position']) => string;
    majorTicksInterval?: any;
    minorTicksInterval?: any;
    max?: any;
    min?: any;
    moveOnClick?: boolean;
    padding?: number | string;
    range?: IRangeSelectorRange;
    resizable?: boolean;
    rtl?: boolean;
    showGroupLabels?: boolean;
    showMinorTicks?: boolean;
    snapToTicks?: boolean;
    showMajorLabels?: boolean;
    showMarkers?: boolean;
    theme?: string;
    width?: string | number;
}
export interface IRangeSelectorProps extends IRangeSelectorOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
}
