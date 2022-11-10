import * as React from 'react';

export interface ProgressSpinnerProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    strokeWidth?: string;
    fill?: string;
    animationDuration?: string;
    children?: React.ReactNode;
}

export declare class ProgressSpinner extends React.Component<ProgressSpinnerProps, any> {
    public getElement(): HTMLDivElement;
}
