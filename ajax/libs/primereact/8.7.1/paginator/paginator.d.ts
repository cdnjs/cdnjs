import * as React from 'react';

interface PaginatorPageState {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

type PaginatorFirstPageLinkType = React.ReactNode | ((options: PaginatorFirstPageLinkOptions) => React.ReactNode);

type PaginatorPrevPageLinkType = React.ReactNode | ((options: PaginatorPrevPageLinkOptions) => React.ReactNode);

type PaginatorPageLinksType = React.ReactNode | ((options: PaginatorPageLinksOptions) => React.ReactNode);

type PaginatorNextPageLinkType = React.ReactNode | ((options: PaginatorNextPageLinkOptions) => React.ReactNode);

type PaginatorLastPageLinkType = React.ReactNode | ((options: PaginatorLastPageLinkOptions) => React.ReactNode);

type PaginatorRowsPerPageDropdownType = React.ReactNode | ((options: PaginatorRowsPerPageDropdownOptions) => React.ReactNode);

type PaginatorCurrentPageReportType = React.ReactNode | ((options: PaginatorCurrentPageReportOptions) => React.ReactNode);

type PaginatorJumpToPageInputType = React.ReactNode | ((options: PaginatorJumpToPageInputOptions) => React.ReactNode);

type PaginatorAppendToType = 'self' | HTMLElement | undefined | null;

interface PaginatorFirstPageLinkOptions {
    onClick(event: React.SyntheticEvent): void;
    className: string;
    iconClassName: string;
    disabled: boolean;
    element: JSX.Element;
    props: PaginatorProps;
}

interface PaginatorPrevPageLinkOptions {
    onClick(event: React.SyntheticEvent): void;
    className: string;
    iconClassName: string;
    disabled: boolean;
    element: JSX.Element;
    props: PaginatorProps;
}

interface PaginatorViewOptions {
    startPage: number;
    endPage: number;
}
interface PaginatorPageLinksOptions {
    onClick(event: React.SyntheticEvent): void;
    className: string;
    view: PaginatorViewOptions;
    page: number;
    currentPage: number;
    totalPages: number;
    element: JSX.Element;
    props: PaginatorProps;
}

interface PaginatorNextPageLinkOptions {
    onClick(event: React.SyntheticEvent): void;
    className: string;
    iconClassName: string;
    disabled: boolean;
    element: JSX.Element;
    props: PaginatorProps;
}

interface PaginatorLastPageLinkOptions {
    onClick(event: React.SyntheticEvent): void;
    className: string;
    iconClassName: string;
    disabled: boolean;
    element: JSX.Element;
    props: PaginatorProps;
}

interface PaginatorChangeTargetOptions {
    name: string;
    id: string;
    value: string | undefined | null;
}

interface PaginatorChangeParams {
    originalEvent: React.SyntheticEvent;
    value: string | undefined | null;
    stopPropagation(): void;
    preventDefault(): void;
    target: PaginatorChangeTargetOptions;
}

interface PaginatorRowsPerPageDropdownOptions {
    value: any;
    options: any[];
    onChange(e: PaginatorChangeParams): void;
    appendTo: PaginatorAppendToType;
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    element: JSX.Element;
    props: PaginatorProps;
    disabled: boolean;
}

interface PaginatorCurrentPageReportOptions {
    currentPage: number;
    totalPages: number;
    first: number;
    last: number;
    rows: number;
    totalRecords: number;
    className: string;
    element: JSX.Element;
    props: PaginatorProps;
}

interface PaginatorJumpToPageInputOptions {
    value: number;
    onChange(first: number, rows: number): void;
    disabled: boolean;
    className: string;
    element: JSX.Element;
    props: PaginatorProps;
}

interface PaginatorTemplateOptions {
    layout?: string;
    FirstPageLink?: PaginatorFirstPageLinkType;
    PrevPageLink?: PaginatorPrevPageLinkType;
    PageLinks?: PaginatorPageLinksType;
    NextPageLink?: PaginatorNextPageLinkType;
    LastPageLink?: PaginatorLastPageLinkType;
    RowsPerPageDropdown?: PaginatorRowsPerPageDropdownType;
    CurrentPageReport?: PaginatorCurrentPageReportType;
    JumpToPageInput?: PaginatorJumpToPageInputType;
}

export type PaginatorTemplate = string | PaginatorTemplateOptions;

export interface PaginatorProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    totalRecords?: number;
    rows?: number;
    first?: number;
    pageLinkSize?: number;
    rowsPerPageOptions?: number[];
    alwaysShow?: boolean;
    template?: PaginatorTemplate;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    currentPageReportTemplate?: string;
    dropdownAppendTo?: PaginatorAppendToType;
    onPageChange?(event: PaginatorPageState): void;
    children?: React.ReactNode;
}

export declare class Paginator extends React.Component<PaginatorProps, any> {
    public getElement(): HTMLDivElement;
}
