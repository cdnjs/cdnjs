import * as React from 'react';

export interface DialogProps {
    id?: string;
    header?: any;
    footer?: any;
    visible?: boolean;
    position?: string;
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
    appendTo?: HTMLElement;
    baseZIndex?: number;
    maximizable?: boolean;
    blockScroll?: boolean;
    ariaCloseIconLabel?: string;
    focusOnShow?: boolean;
    minX?: number;
    minY?: number;
    keepInViewport?: boolean;
    maximized?: boolean;
    breakpoints?: {[key: string]: string};
    icons?: ((props: object) => any | any);
    onMaximize?(e: {originalEvent: Event, maximized: boolean}): void;
    onDragStart?(e: Event): void;
    onDrag?(e: Event): void;
    onDragEnd?(e: Event): void;
    onResizeStart?(e: Event): void;
    onResize?(e: Event): void;
    onResizeEnd?(e: Event): void;
    onHide(): void;
    onShow?(): void;
}

export class Dialog extends React.Component<DialogProps,any> {}
