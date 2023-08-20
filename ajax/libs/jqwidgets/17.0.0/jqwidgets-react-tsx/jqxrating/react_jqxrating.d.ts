import * as React from 'react';
declare class JqxRating extends React.PureComponent<IRatingProps, IState> {
    protected static getDerivedStateFromProps(props: IRatingProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IRatingProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IRatingProps): void;
    getOptions(option: string): any;
    disable(): void;
    enable(): void;
    getValue(): number;
    setValue(value: number): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxRating;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IRatingOptions {
    count?: number;
    disabled?: boolean;
    height?: string | number;
    itemHeight?: number;
    itemWidth?: number;
    precision?: number;
    singleVote?: boolean;
    value?: number;
    width?: string | number;
}
export interface IRatingProps extends IRatingOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
}
