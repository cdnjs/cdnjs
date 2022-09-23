import * as React from 'react';

type BadgeSeverityType = 'success' | 'info' | 'warning' | 'danger';

type BadgeSizeType = 'normal' | 'large' | 'xlarge';

export interface BadgeProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'ref'> {
    value?: any;
    severity?: BadgeSeverityType;
    size?: BadgeSizeType;
    children?: React.ReactNode;
}

export declare class Badge extends React.Component<BadgeProps, any> {
    public getElement(): HTMLSpanElement;
}
