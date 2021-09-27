import * as React from 'react';

type SidebarPositionType = 'top' | 'bottom' | 'left' | 'right';

type SidebarTemplateType = React.ReactNode | ((props: SidebarProps) => React.ReactNode);

type SidebarAppendToType = 'self' | HTMLElement | undefined | null;

export interface SidebarProps {
    id?: string;
    style?: object;
    className?: string;
    visible?: boolean;
    position?: SidebarPositionType;
    fullScreen?: boolean;
    blockScroll?: boolean;
    baseZIndex?: number;
    dismissable?: boolean;
    showCloseIcon?: boolean;
    ariaCloseLabel?: string;
    closeOnEscape?: boolean;
    icons?: SidebarTemplateType;
    modal?: boolean;
    appendTo?: SidebarAppendToType;
    transitionOptions?: object;
    onShow?(): void;
    onHide(): void;
}

export declare class Sidebar extends React.Component<SidebarProps, any> { }
