import * as React from 'react';

declare module 'primereact/timeline' {

    type AlignType = 'left' | 'right' | 'alternate';

    type LayoutType = 'vertical' | 'horizontal';

    type TemplateType = React.ReactNode | ((item: any, index: number) => React.ReactNode);

    export interface TimelineProps {
        id?: string;
        value?: any[];
        align?: AlignType;
        layout?: LayoutType;
        dataKey?: string;
        className?: string;
        style?: object;
        opposite?: TemplateType;
        marker?: TemplateType;
        content?: TemplateType;
    }

    export class Timeline extends React.Component<TimelineProps, any> { }
}
