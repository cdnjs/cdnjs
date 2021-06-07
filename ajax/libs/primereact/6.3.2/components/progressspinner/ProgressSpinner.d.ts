import * as React from 'react';

export interface ProgressSpinnerProps {
    id?: string;
    style?: object;
    className?: string;
    strokeWidth?: string;
    fill?: string;
    animationDuration?: string
}

export declare class ProgressSpinner extends React.Component<ProgressSpinnerProps, any> { }
