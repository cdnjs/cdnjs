import * as React from 'react';

export interface DialogProps {
    id?: string;
    header?: any;
    footer?: any;
    visible?: boolean;
    position?: string;
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
    maximized?: boolean;
    icons?: ((props: object) => any | any);
    onMaximize?(e: {originalEvent: Event, maximized: boolean}): void;
    onHide(): void;
    onShow?(): void;
}

export class Dialog extends React.Component<DialogProps,any> {}
