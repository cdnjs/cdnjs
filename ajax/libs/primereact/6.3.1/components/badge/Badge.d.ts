import * as React from 'react';

declare module 'primereact/badge' {

    type SeverityType = 'success' | 'info' | 'warn' | 'error' | (string & {});

    type SizeType = 'normal' | 'large' | 'xlarge';

    export interface BadgeProps {
        value?: any;
        severity?: SeverityType;
        size?: SizeType;
        style?: object;
        className?: string;
    }

    export class Badge extends React.Component<BadgeProps, any> { }
}
