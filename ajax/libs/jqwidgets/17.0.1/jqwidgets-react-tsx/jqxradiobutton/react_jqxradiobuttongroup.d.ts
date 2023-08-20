import * as React from 'react';
declare class JqxRadioButtonGroup extends React.PureComponent<IRadioButtonGroupProps, IState> {
    protected static getDerivedStateFromProps(props: IRadioButtonGroupProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IRadioButtonGroupProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IRadioButtonGroupProps): void;
    getOptions(option: string): any;
    getValue(): [];
    getValueAt(index: number): string;
    enableAt(index: number): void;
    disableAt(index: number): void;
    checkAt(index: number): void;
    uncheckAt(index: number): void;
    uncheckAll(): void;
    checkValue(value: string): void;
    uncheckValue(value: string): void;
    disable(): void;
    destroy(): void;
    enable(): void;
    renderWidget(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxRadioButtonGroup;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IRadioButtonGroupOptions {
    change?: (item?: any) => void;
    disabled?: boolean;
    items?: [];
    value?: [];
    layout?: string;
    labelPosition?: string;
    rtl?: boolean;
    theme?: string;
}
export interface IRadioButtonGroupProps extends IRadioButtonGroupOptions {
    className?: string;
    style?: React.CSSProperties;
}
