import * as React from 'react';

type ProgressBarModeType = 'determinate' | 'indeterminate';

type ProgressBarValueType = string | number | undefined | null;

export interface ProgressBarProps {
    id?: string;
    value?: ProgressBarValueType;
    showValue?: boolean;
    unit?: string;
    style?: object;
    className?: string;
    mode?: ProgressBarModeType;
    color?: string;
    displayValueTemplate?(value: ProgressBarValueType): React.ReactNode;
}

export declare class ProgressBar extends React.Component<ProgressBarProps, any> { }
