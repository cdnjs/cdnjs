import * as React from 'react';

interface ScrollableViewProps {
    header?: any;
    body?: any;
    footer?: any;
    frozen?: boolean;
    frozenWidth?: string;
    unfrozenWidth?: string;
    frozenBody?: any;
    virtualScroll?: boolean;
    rows?: number;
    totalRcords?: number;
    onVirtualScroll?(page: number): void;
}

export class ScrollableView extends React.Component<ScrollableViewProps,any> {}