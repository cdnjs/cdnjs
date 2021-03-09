import * as React from 'react';

interface SidebarProps {
    id?: string;
    style?: object;
    className?: string;
    visible?: boolean;
    position?: string;
    fullScreen?: boolean;
    blockScroll?: boolean;
    baseZIndex?: number;
    dismissable?: boolean;
    showCloseIcon?: boolean;
    ariaCloseLabel?: string;
    closeOnEscape?: boolean;
    icons?: ((props: object) => any | any);
    modal?: boolean;
    onShow?(): void;
    onHide(): void;
}

export class Sidebar extends React.Component<SidebarProps,any> {}
