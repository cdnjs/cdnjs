import * as React from 'react';
declare class JqxScrollView extends React.PureComponent<IScrollViewProps, IState> {
    protected static getDerivedStateFromProps(props: IScrollViewProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IScrollViewProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IScrollViewProps): void;
    getOptions(option: string): any;
    back(): void;
    changePage(index: number): void;
    forward(): void;
    refresh(): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxScrollView;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IScrollViewOptions {
    animationDuration?: number;
    bounceEnabled?: boolean;
    buttonsOffset?: number[];
    currentPage?: number;
    disabled?: boolean;
    height?: string | number;
    moveThreshold?: number;
    showButtons?: boolean;
    slideShow?: boolean;
    slideDuration?: number;
    theme?: string;
    width?: string | number;
}
export interface IScrollViewProps extends IScrollViewOptions {
    className?: string;
    style?: React.CSSProperties;
    onPageChanged?: (e?: Event) => void;
}
