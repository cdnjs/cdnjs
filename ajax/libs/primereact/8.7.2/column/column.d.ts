import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

type ColumnHeaderType = React.ReactNode | ((options: ColumnHeaderOptions) => React.ReactNode);

type ColumnBodyType = React.ReactNode | ((data: any, options: ColumnBodyOptions) => React.ReactNode);

type ColumnBodyClassType = string | ((data: any, options: ColumnBodyOptions) => string);

type ColumnExpanderType = boolean | ((data: any, options: ColumnBodyOptions) => boolean);

type ColumnFooterType = React.ReactNode | ((options: ColumnFooterOptions) => React.ReactNode);

type ColumnEditorType = React.ReactNode | ((options: ColumnEditorOptions) => React.ReactNode);

type ColumnFilterMatchModeType = 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom';

type ColumnSelectionModeType = 'single' | 'multiple';

type ColumnSortOrderType = 1 | 0 | -1 | undefined | null;

type ColumnDataType = 'text' | 'numeric' | 'date' | string;

type ColumnAlignType = 'left' | 'right' | 'center' | undefined | null;

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
    element?: JSX.Element;
}

interface ColumnBodyRowEditorOptions {
    editing?: boolean;
    element?: JSX.Element;
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
    value: any;
    field: string;
    rowData: any;
    rowIndex: number;
    cellIndex: number;
    selected: boolean;
    column: Column;
    newRowData: any;
    newValue: any;
}

interface ColumnSortMetaData {
    field: string;
    order: ColumnSortOrderType;
}

interface ColumnSortParams extends ColumnSortMetaData {
    data: any;
    multiSortMeta?: ColumnSortMetaData[];
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
    constraint: ColumnFilterMetaData;
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
    };
}

interface ColumnFilterMatchModeOptions {
    [key: string]: string;
}

export interface ColumnProps {
    align?: ColumnAlignType;
    alignFrozen?: ColumnAlignFrozenType;
    alignHeader?: ColumnAlignType;
    body?: ColumnBodyType;
    bodyClassName?: ColumnBodyClassType;
    bodyStyle?: React.CSSProperties;
    cellEditValidatorEvent?: string;
    children?: React.ReactNode;
    className?: string;
    colSpan?: number;
    columnKey?: string;
    dataType?: ColumnDataType;
    editor?: ColumnEditorType;
    excludeGlobalFilter?: boolean;
    expander?: ColumnExpanderType;
    exportable?: boolean;
    exportField?: string;
    field?: string;
    filter?: boolean;
    filterApply?: ColumnFilterApplyType;
    filterClear?: ColumnFilterClearType;
    filterElement?: ColumnFilterElementType;
    filterField?: string;
    filterFooter?: ColumnFilterFooterType;
    filterHeader?: ColumnFilterHeaderType;
    filterHeaderClassName?: string;
    filterHeaderStyle?: React.CSSProperties;
    filterMatchMode?: ColumnFilterMatchModeType;
    filterMatchModeOptions?: ColumnFilterMatchModeOptions[];
    filterMaxLength?: number;
    filterMenuClassName?: string;
    filterMenuStyle?: React.CSSProperties;
    filterPlaceholder?: string;
    filterType?: string;
    footer?: ColumnFooterType;
    footerClassName?: string;
    footerStyle?: React.CSSProperties;
    frozen?: boolean;
    header?: ColumnHeaderType;
    headerClassName?: string;
    headerStyle?: React.CSSProperties;
    headerTooltip?: string;
    headerTooltipOptions?: TooltipOptions;
    hidden?: boolean;
    maxConstraints?: number;
    reorderable?: boolean;
    resizeable?: boolean;
    rowEditor?: boolean;
    rowReorder?: boolean;
    rowReorderIcon?: string;
    rowSpan?: number;
    selectionMode?: ColumnSelectionModeType;
    showAddButton?: boolean;
    showApplyButton?: boolean;
    showClearButton?: boolean;
    showFilterMatchModes?: boolean;
    showFilterMenu?: boolean;
    showFilterMenuOptions?: boolean;
    showFilterOperator?: boolean;
    sortField?: string;
    sortable?: boolean;
    sortableDisabled?: boolean;
    style?: React.CSSProperties;
    cellEditValidator?(e: ColumnEventParams): boolean;
    filterFunction?(value: any, filter: any, filterLocale: string, params: ColumnFilterParams): void;
    onBeforeCellEditHide?(e: ColumnEventParams): void;
    onBeforeCellEditShow?(e: ColumnEventParams): void;
    onCellEditCancel?(e: ColumnEventParams): void;
    onCellEditComplete?(e: ColumnEventParams): void;
    onCellEditInit?(e: ColumnEventParams): void;
    onFilterApplyClick?(e: ColumnFilterApplyClickParams): void;
    onFilterClear?(): void;
    onFilterConstraintAdd?(e: ColumnFilterConstraintAddParams): void;
    onFilterConstraintRemove?(e: ColumnFilterConstraintRemoveParams): void;
    onFilterMatchModeChange?(e: ColumnFilterMatchModeChangeParams): void;
    onFilterOperatorChange?(e: ColumnFilterOperatorChangeParams): void;
    sortFunction?(e: ColumnSortParams): void;
}

export declare class Column extends React.Component<ColumnProps, any> {}
