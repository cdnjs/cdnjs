import * as React from 'react';

declare namespace Message {

    type SeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

    type ContentType = React.ReactNode | ((props: MessageProps) => React.ReactNode);

    interface MessageProps {
        id?: string;
        className?: string;
        style?: object;
        text?: string;
        severity?: SeverityType;
        content?: ContentType;
    }
}

export declare class Message extends React.Component<Message.MessageProps, any> { }
