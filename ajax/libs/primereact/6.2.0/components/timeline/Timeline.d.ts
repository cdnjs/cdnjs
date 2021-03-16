import * as React from 'react';

interface TimelineProps {
    id?: string;
    value?: Array<any>;
    align?: string;
    layout?: string;
    dataKey?: string;
    className?: string;
    style?: object;
    opposite?: any;
    marker?: any;
    content?: any;
}

export class Timeline extends React.Component<TimelineProps,any> {}
