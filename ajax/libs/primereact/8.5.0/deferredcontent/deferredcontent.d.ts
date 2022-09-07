import * as React from 'react';

export interface DeferredContentProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    onLoad?(event: React.SyntheticEvent): void;
    children?: React.ReactNode;
}

export declare class DeferredContent extends React.Component<DeferredContentProps, any> {
    public getElement(): HTMLDivElement;
}
