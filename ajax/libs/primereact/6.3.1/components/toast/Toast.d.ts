import * as React from 'react';

declare module 'primereact/toast' {

    type SeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

    type MessageType = ToastMessage | ToastMessage[];

    type PositionType = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

    export interface ToastMessage {
        severity?: SeverityType;
        summary?: React.ReactNode;
        detail?: React.ReactNode;
        content?: React.ReactNode;
        closable?: boolean;
        sticky?: boolean;
        life?: number;
    }

    export interface ToastProps {
        id?: string;
        className?: string;
        style?: object;
        baseZIndex?: number;
        position?: PositionType;
        transitionOptions?: object;
        onClick?(message: ToastMessage): void;
        onRemove?(message: ToastMessage): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class Toast extends React.Component<ToastProps, any> {
        public show(message: MessageType): void;
        public clear(): void;
    }
}
