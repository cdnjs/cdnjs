import * as React from 'react';

interface MessageProps {
    id?: string;
    className?: string;
    style?: object;
    text?: string;
    severity?: string,
    content?: ((props: object) => any | any);
}

export class Message extends React.Component<MessageProps,any> {}
