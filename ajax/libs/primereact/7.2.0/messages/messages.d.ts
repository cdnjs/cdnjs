import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

type MessagesSeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

type MessagesMessageType = MessagesMessage | MessagesMessage[];

export interface MessagesMessage {
    id?: string;
    severity?: MessagesSeverityType;
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
    transitionOptions?: CSSTransitionProps;
    onRemove?(message: MessagesMessage): void;
    onClick?(message: MessagesMessage): void;
}

export declare class Messages extends React.Component<MessagesProps, any> {
    public show(message: MessagesMessageType): void;
    public clear(): void;
    public replace(message: MessagesMessageType): void;
}
