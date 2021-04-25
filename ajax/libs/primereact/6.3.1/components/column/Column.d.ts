import * as React from 'react';

declare module 'primereact/column' {

    type BodyType = React.ReactNode | ((data: any, props: ColumnProps, ...parameters: any) => React.ReactNode);

    type FilterMatchModeType = 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom';

    type SelectionModeType = 'single' | 'multiple';

    type SortOrderType = 1 | 0 | -1 | undefined | null;

    interface EventParams {
        originalEvent: React.SyntheticEvent;
        columnProps: ColumnProps;
    }

    interface SortParams {
        field: string;
        order: SortOrderType;
    }

    interface FilterMetaData {
        value: any;
        matchMode: FilterMatchModeType;
    }

    interface FilterMeta {
        [key: string]: FilterMetaData;
    }

    interface FilterParams {
        rowData: any;
        filters: FilterMeta;
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
        body?: BodyType;
        footer?: React.ReactNode;
        sortable?: boolean;
        sortableDisabled?: boolean;
        filter?: boolean;
        filterMatchMode?: FilterMatchModeType;
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
        selectionMode?: SelectionModeType;
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
        onEditorInit?(e: EventParams): void;
        onEditorSubmit?(e: EventParams): void;
        onEditorCancel?(e: EventParams): void;
        sortFunction?(e: SortParams): void;
        filterFunction?(value: any, filter: any, filterLocale: string, params: FilterParams): void;
        editor?(props: ColumnProps): React.ReactNode;
        editorValidator?(e: EventParams): boolean;
        onBeforeEditorHide?(e: EventParams): void;
        onBeforeEditorShow?(e: EventParams): void;
    }

    export class Column extends React.Component<ColumnProps, any> { }
}
