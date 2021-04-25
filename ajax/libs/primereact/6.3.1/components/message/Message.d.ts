import * as React from 'react';

declare module 'primereact/message' {

    type SeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

    type ContentType = React.ReactNode | ((props: MessageProps) => React.ReactNode);

    export interface MessageProps {
        id?: string;
        className?: string;
        style?: object;
        text?: string;
        severity?: SeverityType;
        content?: ContentType;
    }

    export class Message extends React.Component<MessageProps, any> { }
}
