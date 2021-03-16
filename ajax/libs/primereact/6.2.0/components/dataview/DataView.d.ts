import * as React from 'react';

interface DataViewLayoutOptionsProps {
    id?: string;
    layout?: string;
    style?: string;
    className?: string;
    onChange(e: {originalEvent: Event, value: string}): void;
}

export class DataViewLayoutOptions extends React.Component<DataViewLayoutOptionsProps,any> {}

interface DataViewProps {
    id?: string;
    header?: JSX.Element | string;
    footer?: JSX.Element | string;
    value?: any[];
    layout?: string;
    rows?: number;
    first?: number;
    totalRecords?: number;
    paginator?: boolean;
    paginatorPosition?: string;
    alwaysShowPaginator?: boolean;
    paginatorClassName?: string;
    paginatorTemplate?: string | object;
    paginatorLeft?: any;
    paginatorRight?: any;
    pageLinkSize?: number;
    paginatorDropdownAppendTo?: any;
    rowsPerPageOptions?: number[];
    currentPageReportTemplate?: string;
    emptyMessage?: string;
    sortField?: string;
    sortOrder?: number;
    style?: string;
    className?: string;
    lazy?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    onPage?(e: {originalEvent: Event, first: number, rows: number}): void;
    itemTemplate?(item: any, layout: "grid" | "list"): JSX.Element | undefined;
}

// tslint:disable-next-line:max-classes-per-file
export class DataView extends React.Component<DataViewProps,any> {}
