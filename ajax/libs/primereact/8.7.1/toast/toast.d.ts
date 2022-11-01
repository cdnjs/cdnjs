import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

type ToastSeverityType = 'success' | 'info' | 'warn' | 'error';

type ToastMessageType = ToastMessage | ToastMessage[];

type ToastPositionType = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';

type ToastAppendToType = 'self' | HTMLElement | undefined | null;

export interface ToastMessage {
    severity?: ToastSeverityType;
    summary?: React.ReactNode;
    detail?: React.ReactNode;
    content?: React.ReactNode;
    closable?: boolean;
    sticky?: boolean;
    life?: number;
    className?: string;
    style?: React.CSSProperties;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
}

export interface ToastProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    baseZIndex?: number;
    position?: ToastPositionType;
    transitionOptions?: CSSTransitionProps;
    appendTo?: ToastAppendToType;
    onClick?(message: ToastMessage): void;
    onRemove?(message: ToastMessage): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class Toast extends React.Component<ToastProps, any> {
    public show(message: ToastMessageType): void;
    public clear(): void;
    public replace(message: ToastMessageType): void;
    public remove(message: ToastMessageType): void;
    public getElement(): HTMLDivElement;
}
