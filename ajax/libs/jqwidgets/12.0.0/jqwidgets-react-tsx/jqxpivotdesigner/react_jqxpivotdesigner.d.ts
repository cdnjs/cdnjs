import * as React from 'react';
declare class JqxPivotDesigner extends React.PureComponent<IPivotDesignerProps, IState> {
    protected static getDerivedStateFromProps(props: IPivotDesignerProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IPivotDesignerProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IPivotDesignerProps): void;
    getOptions(option: string): any;
    refresh(): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxPivotDesigner;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IPivotDesignerOptions {
    type?: string;
    target?: any;
}
export interface IPivotDesignerProps extends IPivotDesignerOptions {
    className?: string;
    style?: React.CSSProperties;
}
