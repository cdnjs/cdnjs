import * as React from 'react';

declare namespace Badge {

    type SeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

    type SizeType = 'normal' | 'large' | 'xlarge';

    interface BadgeProps {
        value?: any;
        severity?: SeverityType;
        size?: SizeType;
        style?: object;
        className?: string;
    }
}

export declare class Badge extends React.Component<Badge.BadgeProps, any> { }
