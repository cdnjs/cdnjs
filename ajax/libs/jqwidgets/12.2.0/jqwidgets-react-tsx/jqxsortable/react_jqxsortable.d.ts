import * as React from 'react';
declare class JqxSortable extends React.PureComponent<ISortableProps, IState> {
    protected static getDerivedStateFromProps(props: ISortableProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ISortableProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ISortableProps): void;
    getOptions(option: string): any;
    cancelMethod(): void;
    destroy(): void;
    disable(): void;
    enable(): void;
    refresh(): void;
    refreshPositions(): void;
    serialize(object: any): string;
    toArray(): any[];
    private _manageProps;
    private _wireEvents;
}
export default JqxSortable;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface ISortableCursorAt {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
interface ISortableOptions {
    appendTo?: string;
    axis?: number | string;
    cancel?: string;
    connectWith?: string | boolean;
    containment?: string | boolean;
    cursor?: string;
    cursorAt?: ISortableCursorAt;
    delay?: number;
    disabled?: boolean;
    distance?: number;
    dropOnEmpty?: boolean;
    forceHelperSize?: boolean;
    forcePlaceholderSize?: boolean;
    grid?: number[];
    handle?: string | boolean;
    helper?: (originalEvent?: any, content?: any) => void | 'original' | 'clone';
    items?: string;
    opacity?: number | boolean;
    placeholderShow?: string | boolean;
    revert?: number | boolean;
    scroll?: boolean;
    scrollSensitivity?: number;
    scrollSpeed?: number;
    tolerance?: 'intersect' | 'pointer';
    zIndex?: number;
}
export interface ISortableProps extends ISortableOptions {
    className?: string;
    style?: React.CSSProperties;
    onActivate?: (e?: Event) => void;
    onBeforeStop?: (e?: Event) => void;
    onChange?: (e?: Event) => void;
    onDeactivate?: (e?: Event) => void;
    onOut?: (e?: Event) => void;
    onOver?: (e?: Event) => void;
    onReceive?: (e?: Event) => void;
    onRemove?: (e?: Event) => void;
    onSort?: (e?: Event) => void;
    onStart?: (e?: Event) => void;
    onStop?: (e?: Event) => void;
    onUpdate?: (e?: Event) => void;
}
