import * as React from 'react';

interface ProgressBarProps {
    id?: string;
    value?: number;
    showValue?: boolean;
    unit?: string;
    style?: object;
    className?: string;
    mode?: string;
    color?: string;
    displayValueTemplate?(value: any): JSX.Element;
}

export class ProgressBar extends React.Component<ProgressBarProps,any> {}
