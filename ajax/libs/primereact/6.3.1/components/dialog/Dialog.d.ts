import * as React from 'react';

declare module 'primereact/dialog' {

    type PositionType = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

    type TemplateType = React.ReactNode | ((props: DialogProps) => React.ReactNode);

    type AppendToType = 'self' | HTMLElement | undefined | null;

    interface Breakpoints {
        [key: string]: string;
    }

    interface MaximizeParams {
        originalEvent: React.SyntheticEvent;
        maximized: boolean;
    }

    export interface DialogProps {
        id?: string;
        header?: TemplateType;
        footer?: TemplateType;
        visible?: boolean;
        position?: PositionType;
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
        appendTo?: AppendToType;
        baseZIndex?: number;
        maximizable?: boolean;
        blockScroll?: boolean;
        icons?: TemplateType;
        ariaCloseIconLabel?: string;
        focusOnShow?: boolean;
        minX?: number;
        minY?: number;
        keepInViewport?: boolean;
        maximized?: boolean;
        breakpoints?: Breakpoints;
        transitionOptions?: object;
        onMaximize?(e: MaximizeParams): void;
        onDragStart?(e: React.DragEvent<HTMLElement>): void;
        onDrag?(e: React.DragEvent<HTMLElement>): void;
        onDragEnd?(e: React.DragEvent<HTMLElement>): void;
        onResizeStart?(e: React.MouseEvent<HTMLElement>): void;
        onResize?(e: React.MouseEvent<HTMLElement>): void;
        onResizeEnd?(e: React.MouseEvent<HTMLElement>): void;
        onHide(): void;
        onShow?(): void;
    }

    export class Dialog extends React.Component<DialogProps, any> { }
}
