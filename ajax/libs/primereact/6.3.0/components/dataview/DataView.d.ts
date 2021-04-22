import * as React from 'react';
import { Paginator } from '../paginator/Paginator';

declare namespace DataViewLayoutOptions {

    type LayoutType = 'list' | 'grid';

    interface ChangeParams {
        originalEvent: React.MouseEvent<HTMLButtonElement>;
        value: LayoutType;
    }

    interface DataViewLayoutOptionsProps {
        id?: string;
        layout?: LayoutType;
        style?: object;
        className?: string;
        onChange(e: ChangeParams): void;
    }
}

export declare class DataViewLayoutOptions extends React.Component<DataViewLayoutOptions.DataViewLayoutOptionsProps, any> { }

declare namespace DataView {

    type PaginatorPositionType = 'top' | 'bottom' | 'both';

    type SortOrderType = 1 | 0 | -1 | undefined | null;

    interface PageParams {
        originalEvent: React.SyntheticEvent;
        first: number;
        rows: number;
    }

    interface DataViewProps {
        id?: string;
        header?: React.ReactNode;
        footer?: React.ReactNode;
        value?: any[];
        layout?: DataViewLayoutOptions.LayoutType;
        rows?: number;
        first?: number;
        totalRecords?: number;
        paginator?: boolean;
        paginatorPosition?: PaginatorPositionType;
        alwaysShowPaginator?: boolean;
        paginatorClassName?: string;
        paginatorTemplate?: Paginator.PaginatorTemplate;
        paginatorLeft?: React.ReactNode;
        paginatorRight?: React.ReactNode;
        pageLinkSize?: number;
        paginatorDropdownAppendTo?: HTMLElement | string;
        rowsPerPageOptions?: number[];
        currentPageReportTemplate?: string;
        emptyMessage?: string;
        sortField?: string;
        sortOrder?: SortOrderType;
        style?: object;
        className?: string;
        lazy?: boolean;
        loading?: boolean;
        loadingIcon?: string;
        onPage?(e: PageParams): void;
        itemTemplate?(item: any, layout: DataViewLayoutOptions.LayoutType): React.ReactNode;
    }
}

// tslint:disable-next-line:max-classes-per-file
export declare class DataView extends React.Component<DataView.DataViewProps, any> { }
