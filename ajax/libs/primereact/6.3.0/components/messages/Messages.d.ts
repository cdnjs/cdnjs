import * as React from 'react';

declare namespace Messages {

    type SeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

    type MessageType = MessageOptions | MessageOptions[];

    interface MessageOptions {
        id?: string;
        severity?: SeverityType;
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
        transitionOptions?: object;
        onRemove?(message: MessageOptions): void;
        onClick?(message: MessageOptions): void;
    }
}

export declare class Messages extends React.Component<Messages.MessagesProps, any> {
    public show(message: Messages.MessageType): void;
    public clear(): void;
    public replace(message: Messages.MessageType): void;
}
