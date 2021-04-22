import * as React from 'react';

declare namespace DataScroller {
    interface LazyLoadParams {
        first: number;
        rows: number;
    }

    interface DataScrollerProps {
        id?: string;
        value?: any[];
        rows?: number;
        inline?: boolean;
        scrollHeight?: string;
        loader?: boolean;
        buffer?: number;
        style?: object;
        className?: string;
        header?: React.ReactNode;
        footer?: React.ReactNode;
        lazy?: boolean;
        onLazyLoad?(e: LazyLoadParams): void;
        itemTemplate?(item: any): React.ReactNode;
    }
}

export declare class DataScroller extends React.Component<DataScroller.DataScrollerProps, any> {
    public load(): void;
}
