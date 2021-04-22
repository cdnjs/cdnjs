import * as React from 'react';

declare namespace OrderList {

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any;
    }

    interface OrderListProps {
        id?: string;
        value?: any[];
        header?: React.ReactNode;
        style?: object;
        className?: string;
        listStyle?: object;
        dragdrop?: boolean;
        tabIndex?: number;
        onChange?(e: ChangeParams): void;
        itemTemplate?(item: any): React.ReactNode;
    }
}

export declare class OrderList extends React.Component<OrderList.OrderListProps, any> { }
