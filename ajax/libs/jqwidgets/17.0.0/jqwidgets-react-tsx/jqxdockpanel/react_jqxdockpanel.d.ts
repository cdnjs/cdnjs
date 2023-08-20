import * as React from 'react';
declare class JqxDockPanel extends React.PureComponent<IDockPanelProps, IState> {
    protected static getDerivedStateFromProps(props: IDockPanelProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IDockPanelProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IDockPanelProps): void;
    getOptions(option: string): any;
    refresh(): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxDockPanel;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IDockPanelOptions {
    disabled?: boolean;
    height?: string | number;
    lastchildfill?: boolean;
    width?: string | number;
}
export interface IDockPanelProps extends IDockPanelOptions {
    className?: string;
    style?: React.CSSProperties;
    onLayout?: (e?: Event) => void;
}
