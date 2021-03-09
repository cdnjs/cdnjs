import * as React from 'react';

export interface ToastMessage {
    severity?: 'success' | 'info' | 'warn' | 'error',
    summary?: any;
    detail?: any;
    content?: any;
    closable?: boolean;
    sticky?: boolean;
    life?: number;
}

interface ToastProps {
    id?: string;
    className?: string;
    style?: object;
    baseZIndex?: number;
    position?: string;
    onClick?(message: ToastMessage): void;
    onClose?(message: ToastMessage): void;
    onRemove?(message: ToastMessage): void;
}

export class Toast extends React.Component<ToastProps, any> {
    public show(message: ToastMessage | ToastMessage[]): void;
    public clear():void;
}
