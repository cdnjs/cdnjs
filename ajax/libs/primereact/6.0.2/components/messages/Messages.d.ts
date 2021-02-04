import * as React from 'react';

interface Message {
    id?: string;
    severity?: 'success' | 'info' | 'warn' | 'error',
    summary?: React.ReactNode;
    detail?: React.ReactNode;
    closable?: boolean;
    sticky?: boolean;
    life?: number;
}

interface MessagesProps {
    id?: string;
    className?: string;
    style?: object;
    onRemove?(message: Message): void;
    onClick?(message: Message): void;
}

export class Messages extends React.Component<MessagesProps, any> {
    public show(message: Message | Message[]): void;
    public clear(): void;
    public replace(message: Message | Message[]): void;
}
