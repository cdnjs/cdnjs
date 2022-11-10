import * as React from 'react';

export interface ScrollPanelProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    children?: React.ReactNode;
}

export declare class ScrollPanel extends React.Component<ScrollPanelProps, any> {
    public getElement(): HTMLDivElement;
    public getContent(): HTMLDivElement;
    public getXBar(): HTMLDivElement;
    public getYBar(): HTMLDivElement;
}
