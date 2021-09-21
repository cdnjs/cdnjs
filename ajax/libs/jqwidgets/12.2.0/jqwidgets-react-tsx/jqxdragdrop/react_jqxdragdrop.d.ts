import * as React from 'react';
declare class JqxDragDrop extends React.PureComponent<IDragDropProps, IState> {
    protected static getDerivedStateFromProps(props: IDragDropProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IDragDropProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IDragDropProps): void;
    getOptions(option: string): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxDragDrop;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IDragDropOnDrag {
    data?: object;
    position?: object;
}
export interface IDragDropOnDragStart {
    position?: object;
}
export interface IDragDropOnTargetDrop {
    data?: object;
}
export interface IDragDropOnDropTargetLeave {
    data?: object;
}
interface IDragDropOptions {
    appendTo?: string;
    disabled?: boolean;
    distance?: number;
    data?: any;
    dropAction?: 'default' | 'none';
    dropTarget?: any;
    dragZIndex?: number;
    feedback?: 'clone' | 'original';
    initFeedback?: (feedback?: any) => void;
    opacity?: number;
    onDragEnd?: () => void;
    onDrag?: (data?: IDragDropOnDrag['data'], position?: IDragDropOnDrag['position']) => void;
    onDragStart?: (position?: IDragDropOnDragStart['position']) => void;
    onTargetDrop?: (data?: IDragDropOnTargetDrop['data']) => void;
    onDropTargetEnter?: () => void;
    onDropTargetLeave?: (data?: IDragDropOnDropTargetLeave['data']) => void;
    restricter?: string | object;
    revert?: boolean;
    revertDuration?: number;
    tolerance?: 'fit' | 'intersect';
}
export interface IDragDropProps extends IDragDropOptions {
    className?: string;
    style?: React.CSSProperties;
    onDragStart?: (e?: Event) => void;
    onDragEnd?: (e?: Event) => void;
    onDragging?: (e?: Event) => void;
    onDropTargetEnter?: (e?: Event) => void;
    onDropTargetLeave?: (e?: Event) => void;
}
