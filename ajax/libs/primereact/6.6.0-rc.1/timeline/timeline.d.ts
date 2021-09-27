import * as React from 'react';

type TimelineAlignType = 'left' | 'right' | 'alternate';

type TimelineLayoutType = 'vertical' | 'horizontal';

type TimelineTemplateType = React.ReactNode | ((item: any, index: number) => React.ReactNode);

export interface TimelineProps {
    id?: string;
    value?: any[];
    align?: TimelineAlignType;
    layout?: TimelineLayoutType;
    dataKey?: string;
    className?: string;
    style?: object;
    opposite?: TimelineTemplateType;
    marker?: TimelineTemplateType;
    content?: TimelineTemplateType;
}

export declare class Timeline extends React.Component<TimelineProps, any> { }
