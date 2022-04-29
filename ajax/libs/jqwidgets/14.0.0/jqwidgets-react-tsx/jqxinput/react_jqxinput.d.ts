import * as React from 'react';
declare class JqxInput extends React.PureComponent<IInputProps, IState> {
    protected static getDerivedStateFromProps(props: IInputProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IInputProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IInputProps): void;
    getOptions(option: string): any;
    destroy(): void;
    focus(): void;
    selectAll(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxInput;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IInputOptions {
    disabled?: boolean;
    dropDownWidth?: number | string;
    displayMember?: string;
    height?: string | number;
    items?: number;
    minLength?: number;
    maxLength?: number;
    opened?: boolean;
    placeHolder?: string;
    popupZIndex?: number;
    query?: string;
    renderer?: (itemValue?: string, inputValue?: string) => string;
    rtl?: boolean;
    searchMode?: 'none' | 'contains' | 'containsignorecase' | 'equals' | 'equalsignorecase' | 'startswithignorecase' | 'startswith' | 'endswithignorecase' | 'endswith';
    source?: any;
    theme?: string;
    valueMember?: string;
    width?: string | number;
    value?: number | string;
}
export interface IInputProps extends IInputOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
    onClose?: (e?: Event) => void;
    onOpen?: (e?: Event) => void;
    onSelect?: (e?: Event) => void;
}
