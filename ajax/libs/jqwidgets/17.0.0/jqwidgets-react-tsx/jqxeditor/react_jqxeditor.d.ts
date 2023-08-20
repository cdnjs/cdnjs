import * as React from 'react';
declare class JqxEditor extends React.PureComponent<IEditorProps, IState> {
    protected static getDerivedStateFromProps(props: IEditorProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IEditorProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IEditorProps): void;
    getOptions(option: string): any;
    destroy(): void;
    focus(): void;
    print(): void;
    setMode(mode: boolean): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxEditor;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IEditorLocalization {
    bold?: string;
    italic?: string;
    underline?: string;
    format?: string;
    size?: number | string;
    font?: string;
    html?: string;
    color?: string;
    background?: string;
    left?: string;
    center?: string;
    right?: string;
    outdent?: string;
    indent?: string;
    ul?: string;
    ol?: string;
    image?: string;
    link?: string;
    clean?: string;
}
export interface IEditorCreateCommand {
    name?: string;
}
interface IEditorOptions {
    createCommand?: (name: IEditorCreateCommand['name']) => void;
    disabled?: boolean;
    editable?: boolean;
    height?: string | number;
    lineBreak?: 'br' | 'p' | 'div' | 'default';
    localization?: IEditorLocalization;
    pasteMode?: 'html' | 'text';
    rtl?: boolean;
    stylesheets?: any[];
    theme?: string;
    toolbarPosition?: 'top' | 'bottom';
    tools?: string;
    width?: string | number;
}
export interface IEditorProps extends IEditorOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
}
