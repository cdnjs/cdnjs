import * as React from 'react';
declare class JqxMenu extends React.PureComponent<IMenuProps, IState> {
    protected static getDerivedStateFromProps(props: IMenuProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IMenuProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IMenuProps): void;
    getOptions(option: string): any;
    closeItem(itemID: number | string): void;
    close(): void;
    disable(itemID: number | string, value: boolean): void;
    destroy(): void;
    focus(): void;
    minimize(): void;
    open(left: number, top: number): void;
    openItem(itemID: number | string): void;
    restore(): void;
    setItemOpenDirection(item: number | string, horizontaldirection: string, verticaldirection: string): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxMenu;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
interface IMenuOptions {
    animationShowDuration?: number;
    animationHideDuration?: number;
    animationHideDelay?: number;
    animationShowDelay?: number;
    autoCloseInterval?: number;
    autoSizeMainItems?: boolean;
    autoCloseOnClick?: boolean;
    autoOpenPopup?: boolean;
    autoOpen?: boolean;
    autoCloseOnMouseLeave?: boolean;
    clickToOpen?: boolean;
    disabled?: boolean;
    enableHover?: boolean;
    easing?: string;
    height?: string | number;
    keyboardNavigation?: boolean;
    minimizeWidth?: number | string;
    mode?: 'horizontal' | 'vertical' | 'popup';
    popupZIndex?: number | string;
    rtl?: boolean;
    showTopLevelArrows?: boolean;
    source?: any;
    theme?: string;
    width?: string | number;
}
export interface IMenuProps extends IMenuOptions {
    className?: string;
    style?: React.CSSProperties;
    onClosed?: (e?: Event) => void;
    onItemclick?: (e?: Event) => void;
    onShown?: (e?: Event) => void;
}
