import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils/utils';

type MessagesSeverityType = 'success' | 'info' | 'warn' | 'error';

type MessagesMessageType = MessagesMessage | MessagesMessage[];

export interface MessagesMessage {
    id?: string;
    severity?: MessagesSeverityType;
    content?: React.ReactNode;
    summary?: React.ReactNode;
    detail?: React.ReactNode;
    closable?: boolean;
    sticky?: boolean;
    life?: number;
    icon?: IconType<MessagesProps>;
}

export interface MessagesProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    transitionOptions?: CSSTransitionProps;
    onRemove?(message: MessagesMessage): void;
    onClick?(message: MessagesMessage): void;
    children?: React.ReactNode;
}

export declare class Messages extends React.Component<MessagesProps, any> {
    public show(message: MessagesMessageType): void;
    public clear(): void;
    public replace(message: MessagesMessageType): void;
    public getElement(): HTMLDivElement;
}
