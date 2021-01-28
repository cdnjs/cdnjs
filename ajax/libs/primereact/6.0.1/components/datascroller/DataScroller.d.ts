import * as React from 'react';

interface DataScrollerProps {
    id?: string;
    value?: any[];
    rows?: number;
    inline?: boolean;
    scrollHeight?: any;
    loader?: any;
    buffer?: number;
    style?: object;
    className?: string;
    header?: any;
    footer?: any;
    lazy?: boolean;
    onLazyLoad?(e: {first: number, rows: number}): void;
    itemTemplate?(item: any): JSX.Element | undefined;
}

export class DataScroller extends React.Component<DataScrollerProps,any> {}
