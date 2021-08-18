import * as React from 'react';

export interface TerminalProps {
    id?: string;
    style?: object;
    className?: string;
    welcomeMessage?: string;
    prompt?: string;
}

export declare class Terminal extends React.Component<TerminalProps, any> {}
