import * as React from 'react';
interface TimelineProps {
    id?: string;
    value?: Array<any>;
    align?: string;
    layout?: string;
    dataKey?: string;
    className?: string;
    style?: object;
    opposite?: ((item: any, index: number) => any | any);
    marker?: ((item: any, index: number) => any | any);
    content?: ((item: any, index: number) => any | any);
}

export class Timeline extends React.Component<TimelineProps,any> {}
