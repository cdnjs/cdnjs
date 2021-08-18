import * as React from 'react';

interface OrderListChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

export interface OrderListProps {
    id?: string;
    value?: any[];
    header?: React.ReactNode;
    style?: object;
    className?: string;
    listStyle?: object;
    dragdrop?: boolean;
    tabIndex?: number;
    dataKey?: string;
    onChange?(e: OrderListChangeParams): void;
    itemTemplate?(item: any): React.ReactNode;
}

export declare class OrderList extends React.Component<OrderListProps, any> { }
