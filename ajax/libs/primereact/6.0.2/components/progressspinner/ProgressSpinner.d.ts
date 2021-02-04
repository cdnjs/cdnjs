import * as React from 'react';

interface ProgressSpinnerProps {
    id?: string;
    style?: object;
    className?: string;
    strokeWidth?: string;
    fill?: string;
    animationDuration?: string
}

export class ProgressSpinner extends React.Component<ProgressSpinnerProps,any> {}