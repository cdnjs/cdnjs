import * as React from 'react';

interface BadgeProps {
    value?: any;
    severity?: string;
    size?: string;
    style?: object;
    className?: string;
}

export class Badge extends React.Component<BadgeProps,any> {}
