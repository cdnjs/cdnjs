import * as React from 'react';
declare class JqxDraw extends React.PureComponent<IDrawProps, IState> {
    protected static getDerivedStateFromProps(props: IDrawProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IDrawProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IDrawProps): void;
    getOptions(option: string): any;
    attr(element?: any, attributes?: any): void;
    circle(cx?: number, cy?: number, r?: number, attributes?: any): any;
    clear(): void;
    getAttr(element?: any, attributes?: any): string;
    getSize(): any;
    line(x1?: number, y1?: number, x2?: number, y2?: number, attributes?: any): any;
    measureText(text?: string, angle?: number, attributes?: any): any;
    on(element?: any, event?: string, func?: any): void;
    off(element?: any, event?: string, func?: any): void;
    path(path?: string, attributes?: any): any;
    pieslice(cx?: number, xy?: number, innerRadius?: any, outerRadius?: any, fromAngle?: number, endAngle?: number, centerOffset?: number, attributes?: any): any;
    refresh(): void;
    rect(x?: number, y?: number, width?: number | string, height?: number | string, attributes?: any): any;
    saveAsJPEG(image?: string, url?: string): void;
    saveAsPNG(image?: string, url?: string): void;
    text(text?: string, x?: number, y?: number, width?: number | string, height?: number | string, angle?: number, attributes?: any, clip?: boolean, halign?: string, valign?: string, rotateAround?: string): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxDraw;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IDrawOptions {
    renderEngine?: 'SVG' | 'VML' | 'HTML5';
}
export interface IDrawProps extends IDrawOptions {
    className?: string;
    style?: React.CSSProperties;
}
