import * as React from 'react';

export interface PageState {
    first: number,
    rows: number,
    page: number,
    pageCount: number
}

interface PaginatorProps {
    totalRecords?: number;
    rows?: number;
    first?: number;
    pageLinkSize?: number;
    rowsPerPageOptions?: any[];
    alwaysShow?: boolean;
    style?: object;
    className?: string;
    template?: string | object;
    leftContent?: JSX.Element | undefined;
    rightContent?: JSX.Element | undefined;
    currentPageReportTemplate?: string;
    dropdownAppendTo?: any;
    onPageChange?(event: PageState): void;
}

export class Paginator extends React.Component<PaginatorProps,any> {}
