import * as React from 'react';

type TimelineAlignType = 'left' | 'right' | 'top' | 'bottom' | 'alternate';

type TimelineLayoutType = 'vertical' | 'horizontal';

type TimelineTemplateType = React.ReactNode | ((item: any, index: number) => React.ReactNode);

export interface TimelineProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    value?: any[];
    align?: TimelineAlignType;
    layout?: TimelineLayoutType;
    dataKey?: string;
    opposite?: TimelineTemplateType;
    marker?: TimelineTemplateType;
    content?: TimelineTemplateType;
    children?: React.ReactNode;
}

export declare class Timeline extends React.Component<TimelineProps, any> {
    public getElement(): HTMLDivElement;
}
