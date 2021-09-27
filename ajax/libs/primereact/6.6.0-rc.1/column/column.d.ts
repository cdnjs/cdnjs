import * as React from 'react';

type ColumnBodyType = React.ReactNode | ((data: any, props: ColumnProps, ...parameters: any) => React.ReactNode);

type ColumnFilterMatchModeType = 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom';

type ColumnSelectionModeType = 'single' | 'multiple';

type ColumnSortOrderType = 1 | 0 | -1 | undefined | null;

interface ColumnEventParams {
    originalEvent: React.SyntheticEvent;
    columnProps: ColumnProps;
}

interface ColumnSortParams {
    field: string;
    order: ColumnSortOrderType;
}

interface ColumnFilterMetaData {
    value: any;
    matchMode: ColumnFilterMatchModeType;
}

interface ColumnFilterMeta {
    [key: string]: ColumnFilterMetaData;
}

interface ColumnFilterParams {
    rowData: any;
    filters: ColumnFilterMeta;
    props: any;
    column: {
        filterMeta: object | undefined | null;
        filterField: string;
        props: ColumnProps;
    }
}

export interface ColumnProps {
    columnKey?: string;
    field?: string;
    sortField?: string;
    filterField?: string;
    header?: React.ReactNode;
    body?: ColumnBodyType;
    footer?: React.ReactNode;
    sortable?: boolean;
    sortableDisabled?: boolean;
    filter?: boolean;
    filterMatchMode?: ColumnFilterMatchModeType;
    filterPlaceholder?: string;
    filterType?: string;
    filterMaxLength?: number;
    filterElement?: React.ReactNode;
    filterHeaderStyle?: object;
    filterHeaderClassName?: string;
    style?: object;
    className?: string;
    headerStyle?: object;
    headerClassName?: string;
    bodyStyle?: object;
    bodyClassName?: string;
    footerStyle?: object;
    footerClassName?: string;
    expander?: boolean;
    frozen?: boolean;
    selectionMode?: ColumnSelectionModeType;
    colSpan?: number;
    rowSpan?: number;
    rowReorder?: boolean;
    rowReorderIcon?: string;
    editorValidatorEvent?: string;
    rowEditor?: boolean;
    exportable?: boolean;
    reorderable?: boolean;
    excludeGlobalFilter?: boolean;
    loadingBody?(): React.ReactNode;
    onEditorInit?(e: ColumnEventParams): void;
    onEditorSubmit?(e: ColumnEventParams): void;
    onEditorCancel?(e: ColumnEventParams): void;
    sortFunction?(e: ColumnSortParams): void;
    filterFunction?(value: any, filter: any, filterLocale: string, params: ColumnFilterParams): void;
    editor?(props: ColumnProps): React.ReactNode;
    editorValidator?(e: ColumnEventParams): boolean;
    onBeforeEditorHide?(e: ColumnEventParams): void;
    onBeforeEditorShow?(e: ColumnEventParams): void;
}

export declare class Column extends React.Component<ColumnProps, any> { }
