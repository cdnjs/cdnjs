import * as React from 'react';

type DataScrollerEmptyMessageType = React.ReactNode | ((props: DataScrollerProps) => React.ReactNode);

interface DataScrollerLazyLoadParams {
    first: number;
    rows: number;
}

export interface DataScrollerProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    value?: any[];
    rows?: number;
    inline?: boolean;
    scrollHeight?: string;
    loader?: boolean;
    buffer?: number;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    lazy?: boolean;
    emptyMessage?: DataScrollerEmptyMessageType;
    onLazyLoad?(e: DataScrollerLazyLoadParams): void;
    itemTemplate?(item: any): React.ReactNode;
    children?: React.ReactNode;
}

export declare class DataScroller extends React.Component<DataScrollerProps, any> {
    public load(): void;
    public getElement(): HTMLDivElement;
}
