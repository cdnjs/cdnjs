import * as React from 'react';

declare module 'primereact/datascroller' {
    interface LazyLoadParams {
        first: number;
        rows: number;
    }

    export interface DataScrollerProps {
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

    export class DataScroller extends React.Component<DataScrollerProps, any> {
        public load(): void;
    }
}
