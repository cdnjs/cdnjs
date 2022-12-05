import * as React from 'react';

type OrderListFilterTemplateType = React.ReactNode | ((options: OrderListFilterOptions) => React.ReactNode);

interface OrderListChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface OrderListFilterOptions {
    filter?: (event?: KeyboardEvent) => void;
    reset?: () => void;
}

export interface OrderListProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    value?: any[];
    header?: React.ReactNode;
    listStyle?: React.CSSProperties;
    dragdrop?: boolean;
    dataKey?: string;
    filter?: boolean;
    filterBy?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterLocale?: string;
    filterTemplate?: OrderListFilterTemplateType;
    onChange?(e: OrderListChangeParams): void;
    itemTemplate?(item: any): React.ReactNode;
    children?: React.ReactNode;
}

export declare class OrderList extends React.Component<OrderListProps, any> {
    public getElement(): HTMLDivElement;
}
