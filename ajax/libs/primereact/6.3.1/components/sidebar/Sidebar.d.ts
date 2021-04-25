import * as React from 'react';

declare module 'primereact/sidebar' {

    type PositionType = 'top' | 'bottom' | 'left' | 'right';

    type TemplateType = React.ReactNode | ((props: SidebarProps) => React.ReactNode);

    export interface SidebarProps {
        id?: string;
        style?: object;
        className?: string;
        visible?: boolean;
        position?: PositionType;
        fullScreen?: boolean;
        blockScroll?: boolean;
        baseZIndex?: number;
        dismissable?: boolean;
        showCloseIcon?: boolean;
        ariaCloseLabel?: string;
        closeOnEscape?: boolean;
        icons?: TemplateType;
        modal?: boolean;
        transitionOptions?: object;
        onShow?(): void;
        onHide(): void;
    }

    export class Sidebar extends React.Component<SidebarProps, any> { }
}
