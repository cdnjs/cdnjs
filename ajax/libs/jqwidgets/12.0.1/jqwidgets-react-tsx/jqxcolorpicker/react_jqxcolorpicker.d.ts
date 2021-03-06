import * as React from 'react';
declare class JqxColorPicker extends React.PureComponent<IColorPickerProps, IState> {
    protected static getDerivedStateFromProps(props: IColorPickerProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IColorPickerProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IColorPickerProps): void;
    getOptions(option: string): any;
    getColor(): any;
    setColor(color: object | string): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxColorPicker;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IColorPickerOptions {
    color?: string;
    colorMode?: 'hue' | 'saturation';
    disabled?: boolean;
    height?: string | number;
    showTransparent?: boolean;
    width?: string | number;
}
export interface IColorPickerProps extends IColorPickerOptions {
    className?: string;
    style?: React.CSSProperties;
    onColorchange?: (e?: Event) => void;
}
