import * as React from 'react';

interface OrderListProps {
    id?: string;
    value?: any[];
    header?: any;
    style?: object;
    className?: string;
    listStyle?: object;
    dragdrop?: boolean;
    tabIndex?: number;
    onChange?(e: {originalEvent: Event, value: any}): void;
    itemTemplate?(item: any): JSX.Element | undefined;
}

export class OrderList extends React.Component<OrderListProps,any> {}
