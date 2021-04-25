import * as React from 'react';

declare module 'primereact/orderlist' {

    interface ChangeParams {
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
        onChange?(e: ChangeParams): void;
        itemTemplate?(item: any): React.ReactNode;
    }

    export class OrderList extends React.Component<OrderListProps, any> { }
}
