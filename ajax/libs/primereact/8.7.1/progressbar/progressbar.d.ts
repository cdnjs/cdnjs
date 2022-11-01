import * as React from 'react';

type ProgressBarModeType = 'determinate' | 'indeterminate';

type ProgressBarValueType = string | number | undefined | null;

export interface ProgressBarProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    value?: ProgressBarValueType;
    showValue?: boolean;
    unit?: string;
    mode?: ProgressBarModeType;
    color?: string;
    displayValueTemplate?(value: ProgressBarValueType): React.ReactNode;
    children?: React.ReactNode;
}

export declare class ProgressBar extends React.Component<ProgressBarProps, any> {
    public getElement(): HTMLDivElement;
}
