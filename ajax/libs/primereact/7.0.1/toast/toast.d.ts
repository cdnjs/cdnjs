import * as React from 'react';

type ToastSeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

type ToastMessageType = ToastMessage | ToastMessage[];

type ToastPositionType = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';

export interface ToastMessage {
    severity?: ToastSeverityType;
    summary?: React.ReactNode;
    detail?: React.ReactNode;
    content?: React.ReactNode;
    closable?: boolean;
    sticky?: boolean;
    life?: number;
    className?: string;
    style?: object;
    contentClassName?: string;
    contentStyle?: object;
}

export interface ToastProps {
    id?: string;
    className?: string;
    style?: object;
    baseZIndex?: number;
    position?: ToastPositionType;
    transitionOptions?: object;
    onClick?(message: ToastMessage): void;
    onRemove?(message: ToastMessage): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class Toast extends React.Component<ToastProps, any> {
    public show(message: ToastMessageType): void;
    public clear(): void;
}
