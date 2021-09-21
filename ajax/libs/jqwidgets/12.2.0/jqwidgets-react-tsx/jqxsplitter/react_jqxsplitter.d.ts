import * as React from 'react';
declare class JqxSplitter extends React.PureComponent<ISplitterProps, IState> {
    protected static getDerivedStateFromProps(props: ISplitterProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ISplitterProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ISplitterProps): void;
    getOptions(option: string): any;
    collapse(): void;
    destroy(): void;
    disable(): void;
    enable(): void;
    expand(): void;
    renderWidget(): void;
    refresh(): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxSplitter;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface ISplitterPanel {
    size?: number | string;
    min?: number | string;
    collapsible?: boolean;
    collapsed?: boolean;
}
interface ISplitterOptions {
    disabled?: boolean;
    height?: string | number;
    orientation?: 'horizontal' | 'vertical';
    panels?: ISplitterPanel[];
    resizable?: boolean;
    splitBarSize?: number;
    showSplitBar?: boolean;
    theme?: string;
    width?: string | number;
}
export interface ISplitterProps extends ISplitterOptions {
    className?: string;
    style?: React.CSSProperties;
    onCollapsed?: (e?: Event) => void;
    onExpanded?: (e?: Event) => void;
    onResize?: (e?: Event) => void;
    onResizeStart?: (e?: Event) => void;
}
