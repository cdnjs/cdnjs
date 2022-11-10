import * as React from 'react';

type DataScrollerEmptyMessageType = React.ReactNode | ((props: DataScrollerProps) => React.ReactNode);

interface DataScrollerLazyLoadParams {
    first: number;
    rows: number;
}

export interface DataScrollerProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    buffer?: number;
    children?: React.ReactNode;
    emptyMessage?: DataScrollerEmptyMessageType;
    footer?: React.ReactNode;
    header?: React.ReactNode;
    inline?: boolean;
    lazy?: boolean;
    loader?: boolean;
    rows?: number;
    scrollHeight?: string;
    value?: any[];
    itemTemplate?(item: any): React.ReactNode;
    onLazyLoad?(e: DataScrollerLazyLoadParams): void;
}

export declare class DataScroller extends React.Component<DataScrollerProps, any> {
    public load(): void;
    public getElement(): HTMLDivElement;
}
