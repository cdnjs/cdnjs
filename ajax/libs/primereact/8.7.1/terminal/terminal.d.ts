import * as React from 'react';

export interface TerminalProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    welcomeMessage?: string;
    prompt?: string;
    children?: React.ReactNode;
}

export declare class Terminal extends React.Component<TerminalProps, any> {
    public getElement(): HTMLDivElement;
}
