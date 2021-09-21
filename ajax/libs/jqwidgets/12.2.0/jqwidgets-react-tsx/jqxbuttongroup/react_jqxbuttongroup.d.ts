import * as React from 'react';
declare class JqxButtonGroup extends React.PureComponent<IButtonGroupProps, IState> {
    protected static getDerivedStateFromProps(props: IButtonGroupProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IButtonGroupProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IButtonGroupProps): void;
    getOptions(option: string): any;
    disableAt(index: number): void;
    disable(): void;
    destroy(): void;
    enable(): void;
    enableAt(index: number): void;
    getSelection(): any;
    renderWidget(): void;
    setSelection(index: number): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxButtonGroup;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IButtonGroupOptions {
    disabled?: boolean;
    enableHover?: boolean;
    mode?: 'checkbox' | 'radio' | 'default';
    rtl?: boolean;
    template?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    theme?: string;
}
export interface IButtonGroupProps extends IButtonGroupOptions {
    className?: string;
    style?: React.CSSProperties;
    onButtonclick?: (e?: Event) => void;
    onSelected?: (e?: Event) => void;
    onUnselected?: (e?: Event) => void;
}
