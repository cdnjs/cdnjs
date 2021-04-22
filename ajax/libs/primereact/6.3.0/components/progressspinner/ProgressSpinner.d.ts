import * as React from 'react';

declare namespace ProgressSpinner {

    interface ProgressSpinnerProps {
        id?: string;
        style?: object;
        className?: string;
        strokeWidth?: string;
        fill?: string;
        animationDuration?: string
    }
}

export declare class ProgressSpinner extends React.Component<ProgressSpinner.ProgressSpinnerProps, any> { }
