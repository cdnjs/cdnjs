import * as React from 'react';

declare module 'primereact/paginator' {

    interface PageState {
        first: number;
        rows: number;
        page: number;
        pageCount: number;
    }

    type FirstPageLinkType = React.ReactNode | ((options: FirstPageLinkOptions) => React.ReactNode);

    type PrevPageLinkType = React.ReactNode | ((options: PrevPageLinkOptions) => React.ReactNode);

    type PageLinksType = React.ReactNode | ((options: PageLinksOptions) => React.ReactNode);

    type NextPageLinkType = React.ReactNode | ((options: NextPageLinkOptions) => React.ReactNode);

    type LastPageLinkType = React.ReactNode | ((options: LastPageLinkOptions) => React.ReactNode);

    type RowsPerPageDropdownType = React.ReactNode | ((options: RowsPerPageDropdownOptions) => React.ReactNode);

    type CurrentPageReportType = React.ReactNode | ((options: CurrentPageReportOptions) => React.ReactNode);

    type AppendToType = 'self' | HTMLElement | undefined | null;

    interface FirstPageLinkOptions {
        onClick(event: React.SyntheticEvent): void;
        className: string;
        iconClassName: string;
        disabled: boolean;
        element: JSX.Element;
        props: PaginatorProps;
    }

    interface PrevPageLinkOptions {
        onClick(event: React.SyntheticEvent): void;
        className: string;
        iconClassName: string;
        disabled: boolean;
        element: JSX.Element;
        props: PaginatorProps;
    }

    interface ViewOptions {
        startPage: number;
        endPage: number;
    }
    interface PageLinksOptions {
        onClick(event: React.SyntheticEvent): void;
        className: string;
        view: ViewOptions;
        page: number;
        currentPage: number;
        totalPages: number;
        element: JSX.Element;
        props: PaginatorProps;
    }

    interface NextPageLinkOptions {
        onClick(event: React.SyntheticEvent): void;
        className: string;
        iconClassName: string;
        disabled: boolean;
        element: JSX.Element;
        props: PaginatorProps;
    }

    interface LastPageLinkOptions {
        onClick(event: React.SyntheticEvent): void;
        className: string;
        iconClassName: string;
        disabled: boolean;
        element: JSX.Element;
        props: PaginatorProps;
    }

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: string | undefined | null;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: string | undefined | null;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    interface RowsPerPageDropdownOptions {
        value: any;
        options: any[];
        onChange(e: ChangeParams): void;
        appendTo: AppendToType;
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        element: JSX.Element;
        props: PaginatorProps;
    }

    interface CurrentPageReportOptions {
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

    interface PaginatorTemplateOptions {
        layout: string;
        FirstPageLink: FirstPageLinkType;
        PrevPageLink: PrevPageLinkType;
        PageLinks: PageLinksType;
        NextPageLink: NextPageLinkType;
        LastPageLink: LastPageLinkType;
        RowsPerPageDropdown: RowsPerPageDropdownType;
        CurrentPageReport: CurrentPageReportType;
    }

    export type PaginatorTemplate = string | PaginatorTemplateOptions;

    export interface PaginatorProps {
        totalRecords?: number;
        rows?: number;
        first?: number;
        pageLinkSize?: number;
        rowsPerPageOptions?: number[];
        alwaysShow?: boolean;
        style?: object;
        className?: string;
        template?: PaginatorTemplate;
        leftContent?: React.ReactNode;
        rightContent?: React.ReactNode;
        currentPageReportTemplate?: string;
        dropdownAppendTo?: AppendToType;
        onPageChange?(event: PageState): void;
    }

    export class Paginator extends React.Component<PaginatorProps, any> { }
}
