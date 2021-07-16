import * as React from 'react';

type MessageSeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

type MessageContentType = React.ReactNode | ((props: MessageProps) => React.ReactNode);

export interface MessageProps {
    id?: string;
    className?: string;
    style?: object;
    text?: string;
    severity?: MessageSeverityType;
    content?: MessageContentType;
}

export declare class Message extends React.Component<MessageProps, any> { }
