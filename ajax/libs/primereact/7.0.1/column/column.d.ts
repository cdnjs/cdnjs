import * as React from 'react';

type ColumnHeaderType = React.ReactNode | ((options: ColumnHeaderOptions) => React.ReactNode);

type ColumnBodyType = React.ReactNode | ((data: any, options: ColumnBodyOptions) => React.ReactNode);

type ColumnFooterType = React.ReactNode | ((options: ColumnFooterOptions) => React.ReactNode);

type ColumnEditorType = React.ReactNode | ((options: ColumnEditorOptions) => React.ReactNode);

type ColumnFilterMatchModeType = 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom';

type ColumnSelectionModeType = 'single' | 'multiple';

type ColumnSortOrderType = 1 | 0 | -1 | undefined | null;

type ColumnDataType = 'text' | 'numeric' | 'date' | string;

type ColumnAlignFrozenType = 'left' | 'right';

type ColumnFilterOperatorType = 'and' | 'or';

type ColumnFilterClearType = React.ReactNode | ((options: ColumnFilterClearTemplateOptions) => React.ReactNode);

type ColumnFilterApplyType = React.ReactNode | ((options: ColumnFilterApplyTemplateOptions) => React.ReactNode);

type ColumnFilterHeaderType = React.ReactNode | ((options: ColumnFilterHeaderTemplateOptions) => React.ReactNode);

type ColumnFilterFooterType = React.ReactNode | ((options: ColumnFilterFooterTemplateOptions) => React.ReactNode);

type ColumnFilterElementType = React.ReactNode | ((options: ColumnFilterElementTemplateOptions) => React.ReactNode);

type ColumnFilterModelType = ColumnFilterMetaData | ColumnFilterMetaDataWithConstraint;

interface ColumnHeaderOptions {
    props: any;
}

interface ColumnFooterOptions extends ColumnHeaderOptions {}

interface ColumnBodyOptions {
    column: Column;
    field: string;
    rowIndex: number;
    props?: any;
    frozenRow?: boolean;
    expander?: ColumnBodyExpanderOptions;
    rowEditor?: ColumnBodyRowEditorOptions;
}

interface ColumnBodyExpanderOptions {
    onClick?(e: any): void;
    className?: string;
    iconClassName?: string;
    element?: React.ReactNode;
}

interface ColumnBodyRowEditorOptions {
    editing: boolean,
    onSaveClick?(e: any): void;
    saveClassName?: string;
    saveIconClassName?: string;
    onCancelClick?(e: any): void;
    cancelClassName?: string;
    cancelIconClassName?: string;
    onInitClick?(e: any): void;
    initClassName?: string;
    initIconClassName?: string;
}

interface ColumnEditorOptions {
    node?: any;
    rowData: any;
    value: any;
    column: Column;
    field: string;
    rowIndex: number;
    frozenRow?: boolean;
    props: any;
    editorCallback?(val: any): void;
}

interface ColumnFilterModelOptions {
    [key: string]: ColumnFilterModelType;
}

interface ColumnFilterClearTemplateOptions {
    field: string;
    filterModel: ColumnFilterModelOptions;
    filterClearCallback(): void;
}

interface ColumnFilterApplyTemplateOptions {
    field: string;
    filterModel: ColumnFilterModelOptions;
    filterApplyCallback(value?: any, index?: number): void;
}

interface ColumnFilterHeaderTemplateOptions extends ColumnFilterApplyTemplateOptions {}

interface ColumnFilterFooterTemplateOptions extends ColumnFilterApplyTemplateOptions {}

interface ColumnFilterElementTemplateOptions {
    field: string;
    index: number;
    filterModel: ColumnFilterModelOptions;
    value: any;
    filterApplyCallback(value?: any, index?: number): void;
    filterCallback(value?: any, index?: number): void;
}

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

interface ColumnFilterMetaDataWithConstraint {
    operator: ColumnFilterOperatorType;
    constraints: ColumnFilterMetaData[];
}

interface ColumnFilterApplyClickParams {
    field: string;
    constraints: ColumnFilterMetaData[];
}

interface ColumnFilterMatchModeChangeParams {
    field: string;
    matchMode: ColumnFilterMatchModeType;
}

interface ColumnFilterOperatorChangeParams {
    field: string;
    operator: ColumnFilterOperatorType;
}

interface ColumnFilterConstraintAddParams {
    field: string;
    constraing: ColumnFilterMetaData;
}

interface ColumnFilterConstraintRemoveParams extends ColumnFilterConstraintAddParams {}

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

interface ColumnFilterMatchModeOptions {
    [key: string]: string;
}

export interface ColumnProps {
    columnKey?: string;
    field?: string;
    sortField?: string;
    filterField?: string;
    header?: ColumnHeaderType;
    body?: ColumnBodyType;
    footer?: ColumnFooterType;
    sortable?: boolean;
    sortableDisabled?: boolean;
    dataType?: ColumnDataType;
    filter?: boolean;
    filterMatchMode?: ColumnFilterMatchModeType;
    filterPlaceholder?: string;
    filterType?: string;
    filterMaxLength?: number;
    filterElement?: ColumnFilterElementType;
    filterHeaderStyle?: object;
    filterHeaderClassName?: string;
    showFilterMenu?: boolean;
    showFilterOperator?: boolean;
    showClearButton?: boolean;
    showApplyButton?: boolean;
    showFilterMatchModes?: boolean;
    showFilterMenuOptions?: boolean;
    showAddButton?: boolean;
    filterMatchModeOptions?: ColumnFilterMatchModeOptions;
    maxConstraints?: number;
    filterMenuClassName?: string;
    filterMenuStyle?: object;
    alignFrozen?: ColumnAlignFrozenType;
    hidden?: boolean;
    onFilterClear?(): void;
    onFilterApplyClick?(e: ColumnFilterApplyClickParams): void;
    onFilterMatchModeChange?(e: ColumnFilterMatchModeChangeParams): void;
    onFilterOperatorChange?(e: ColumnFilterOperatorChangeParams): void;
    onFilterConstraintAdd?(e: ColumnFilterConstraintAddParams): void;
    onFilterConstraintRemove?(e: ColumnFilterConstraintRemoveParams): void;
    filterClear?: ColumnFilterClearType;
    filterApply?: ColumnFilterApplyType;
    filterHeader?: ColumnFilterHeaderType;
    filterFooter?: ColumnFilterFooterType;
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
    cellEditValidatorEvent?: string;
    rowEditor?: boolean;
    exportable?: boolean;
    reorderable?: boolean;
    excludeGlobalFilter?: boolean;
    onCellEditInit?(e: ColumnEventParams): void;
    onCellEditComplete?(e: ColumnEventParams): void;
    onCellEditCancel?(e: ColumnEventParams): void;
    sortFunction?(e: ColumnSortParams): void;
    filterFunction?(value: any, filter: any, filterLocale: string, params: ColumnFilterParams): void;
    editor?: ColumnEditorType;
    cellEditValidator?(e: ColumnEventParams): boolean;
    onBeforeCellEditHide?(e: ColumnEventParams): void;
    onBeforeCellEditShow?(e: ColumnEventParams): void;
}

export declare class Column extends React.Component<ColumnProps, any> { }
