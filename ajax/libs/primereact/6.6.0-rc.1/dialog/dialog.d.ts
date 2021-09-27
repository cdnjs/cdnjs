import * as React from 'react';

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
    id?: string;
    header?: DialogTemplateType;
    footer?: DialogTemplateType;
    visible?: boolean;
    position?: DialogPositionType;
    draggable?: boolean;
    resizable?: boolean;
    modal?: boolean;
    contentStyle?: object;
    contentClassName?: string;
    closeOnEscape?: boolean;
    dismissableMask?: boolean;
    rtl?: boolean;
    closable?: boolean;
    style?: object;
    className?: string;
    maskClassName?: string;
    showHeader?: boolean;
    appendTo?: DialogAppendToType;
    baseZIndex?: number;
    maximizable?: boolean;
    blockScroll?: boolean;
    icons?: DialogTemplateType;
    ariaCloseIconLabel?: string;
    focusOnShow?: boolean;
    minX?: number;
    minY?: number;
    keepInViewport?: boolean;
    maximized?: boolean;
    breakpoints?: DialogBreakpoints;
    transitionOptions?: object;
    onMaximize?(e: DialogMaximizeParams): void;
    onDragStart?(e: React.DragEvent<HTMLElement>): void;
    onDrag?(e: React.DragEvent<HTMLElement>): void;
    onDragEnd?(e: React.DragEvent<HTMLElement>): void;
    onResizeStart?(e: React.MouseEvent<HTMLElement>): void;
    onResize?(e: React.MouseEvent<HTMLElement>): void;
    onResizeEnd?(e: React.MouseEvent<HTMLElement>): void;
    onHide(): void;
    onShow?(): void;
    onMaskClick?(e: React.MouseEvent<HTMLElement>): void;
    onClick?(e: React.MouseEvent<HTMLElement>): void;
}

export declare class Dialog extends React.Component<DialogProps, any> { }
