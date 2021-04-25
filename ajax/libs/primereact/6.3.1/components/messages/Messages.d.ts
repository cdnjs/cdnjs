import * as React from 'react';

declare module 'primereact/messages' {

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

    export interface MessagesProps {
        id?: string;
        className?: string;
        style?: object;
        transitionOptions?: object;
        onRemove?(message: MessageOptions): void;
        onClick?(message: MessageOptions): void;
    }

    export class Messages extends React.Component<MessagesProps, any> {
        public show(message: MessageType): void;
        public clear(): void;
        public replace(message: MessageType): void;
    }
}
