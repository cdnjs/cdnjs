import * as React from 'react';
import { PaginatorTemplate } from '../paginator';

type DataViewLayoutType = 'list' | 'grid' | (string & {});

type DataViewPaginatorPositionType = 'top' | 'bottom' | 'both';

type DataViewSortOrderType = 1 | 0 | -1 | undefined | null;

type DataViewAppendToType = 'self' | HTMLElement | undefined | null;

interface DataViewPageParams {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

interface DataViewLayoutOptionsChangeParams {
    originalEvent: React.MouseEvent<HTMLButtonElement>;
    value: DataViewLayoutType;
}

export interface DataViewLayoutOptionsProps {
    id?: string;
    layout?: DataViewLayoutType;
    style?: object;
    className?: string;
    onChange(e: DataViewLayoutOptionsChangeParams): void;
}

export declare class DataViewLayoutOptions extends React.Component<DataViewLayoutOptionsProps, any> { }

export interface DataViewProps {
    id?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    value?: any[];
    layout?: DataViewLayoutType;
    dataKey?: string;
    rows?: number;
    first?: number;
    totalRecords?: number;
    paginator?: boolean;
    paginatorPosition?: DataViewPaginatorPositionType;
    alwaysShowPaginator?: boolean;
    paginatorClassName?: string;
    paginatorTemplate?: PaginatorTemplate;
    paginatorLeft?: React.ReactNode;
    paginatorRight?: React.ReactNode;
    pageLinkSize?: number;
    paginatorDropdownAppendTo?: DataViewAppendToType;
    rowsPerPageOptions?: number[];
    currentPageReportTemplate?: string;
    emptyMessage?: string;
    sortField?: string;
    sortOrder?: DataViewSortOrderType;
    style?: object;
    className?: string;
    lazy?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    onPage?(e: DataViewPageParams): void;
    itemTemplate?(item: any, layout: DataViewLayoutType): React.ReactNode;
}

// tslint:disable-next-line:max-classes-per-file
export declare class DataView extends React.Component<DataViewProps, any> { }
