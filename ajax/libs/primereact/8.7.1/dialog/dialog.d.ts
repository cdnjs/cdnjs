import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

type DialogPositionType = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type DialogTemplateType = React.ReactNode | ((props: DialogProps) => React.ReactNode);

type DialogAppendToType = 'self' | HTMLElement | undefined | null;

interface DialogBreakpoints {
    [key: string]: string;
}

interface DialogMaximizeParams {
    originalEvent: React.SyntheticEvent;
    maximized: boolean;
}

export interface DialogProps {
    appendTo?: DialogAppendToType;
    ariaCloseIconLabel?: string;
    baseZIndex?: number;
    blockScroll?: boolean;
    breakpoints?: DialogBreakpoints;
    children?: React.ReactNode;
    className?: string;
    closable?: boolean;
    closeOnEscape?: boolean;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    dismissableMask?: boolean;
    draggable?: boolean;
    focusOnShow?: boolean;
    footer?: DialogTemplateType;
    header?: DialogTemplateType;
    headerClassName?: string;
    headerStyle?: React.CSSProperties;
    icons?: DialogTemplateType;
    id?: string;
    keepInViewport?: boolean;
    maskClassName?: string;
    maskStyle?: React.CSSProperties;
    maximizable?: boolean;
    maximized?: boolean;
    minX?: number;
    minY?: number;
    modal?: boolean;
    position?: DialogPositionType;
    resizable?: boolean;
    rtl?: boolean;
    showHeader?: boolean;
    style?: React.CSSProperties;
    transitionOptions?: CSSTransitionProps;
    visible?: boolean;
    onClick?(e: React.MouseEvent<HTMLElement>): void;
    onDrag?(e: React.DragEvent<HTMLElement>): void;
    onDragEnd?(e: React.DragEvent<HTMLElement>): void;
    onDragStart?(e: React.DragEvent<HTMLElement>): void;
    onHide(): void;
    onMaskClick?(e: React.MouseEvent<HTMLElement>): void;
    onMaximize?(e: DialogMaximizeParams): void;
    onResize?(e: React.MouseEvent<HTMLElement>): void;
    onResizeEnd?(e: React.MouseEvent<HTMLElement>): void;
    onResizeStart?(e: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
}

export declare class Dialog extends React.Component<DialogProps, any> {
    public resetPosition(): void;
    public getElement(): HTMLDivElement;
    public getMask(): HTMLDivElement;
    public getContent(): HTMLDivElement;
    public getHeader(): HTMLDivElement;
    public getFooter(): HTMLDivElement;
    public getCloseButton(): HTMLButtonElement;
}
