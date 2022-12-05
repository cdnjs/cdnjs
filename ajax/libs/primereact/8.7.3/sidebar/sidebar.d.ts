import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

type SidebarPositionType = 'top' | 'bottom' | 'left' | 'right';

type SidebarTemplateType = React.ReactNode | ((props: SidebarProps) => React.ReactNode);

type SidebarAppendToType = 'self' | HTMLElement | undefined | null;

export interface SidebarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    maskStyle?: React.CSSProperties;
    maskClassName?: string;
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
    transitionOptions?: CSSTransitionProps;
    onShow?(): void;
    onHide(): void;
    children?: React.ReactNode;
}

export declare class Sidebar extends React.Component<SidebarProps, any> {
    public getElement(): HTMLDivElement;
    public getMask(): HTMLElement;
    public getCloseIcon(): HTMLButtonElement;
}
