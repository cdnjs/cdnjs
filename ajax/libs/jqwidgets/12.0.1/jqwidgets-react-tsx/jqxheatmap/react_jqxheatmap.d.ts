import * as React from 'react';
declare class JqxHeatMap extends React.PureComponent<IHeatMapProps, IState> {
    protected static getDerivedStateFromProps(props: IHeatMapProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IHeatMapProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IHeatMapProps): void;
    getOptions(option: string): any;
    destroy(): void;
    setLegendPosition(position?: string): void;
    setOpposedXAxisPosition(opposedPosition: boolean): void;
    setOpposedYAxisPosition(opposedPosition: boolean): void;
    reverseXAxisPosition(isInversed: boolean): void;
    reverseYAxisPosition(isInversed: boolean): void;
    setPaletteType(type: string): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxHeatMap;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IHeatMapXAxis {
    labels?: any[];
    opposedPosition?: boolean;
    isInversed?: boolean;
    minimum?: Date;
    maximum?: Date;
    labelFormat?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
}
export interface IHeatMapYAxis {
    labels?: any[];
    opposedPosition?: boolean;
    isInversed?: boolean;
}
export interface IHeatMapPaletteSettings {
    palette?: any[];
    type?: 'Gradient' | 'Fixed';
    emptyPointColor?: string;
}
export interface IHeatMapPalette {
    value?: number;
    color?: string;
    label?: string;
}
export interface IHeatMapLegendSettings {
    position?: 'Top' | 'Bottom' | 'Left' | 'Right';
}
export interface IHeatMapTooltipRender {
    xLabel?: any[];
    yLabel?: any[];
    value?: string;
    content?: string;
    date?: Date;
}
interface IHeatMapOptions {
    xAxis?: IHeatMapXAxis;
    yAxis?: IHeatMapYAxis;
    paletteSettings?: IHeatMapPaletteSettings;
    legendSettings?: IHeatMapLegendSettings;
    source?: any[];
    title?: string;
    width?: number | string;
    tooltipRender?: (args: IHeatMapTooltipRender) => void;
}
export interface IHeatMapProps extends IHeatMapOptions {
    className?: string;
    style?: React.CSSProperties;
}
