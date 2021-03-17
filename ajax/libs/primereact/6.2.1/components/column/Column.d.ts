import * as React from 'react';

interface ColumnProps {
    columnKey?: string;
    field?: string;
    sortField?: string;
    filterField?: string;
    header?: any;
    body?: any;
    loadingBody?: any;
    footer?: any;
    sortable?: boolean;
    filter?: boolean;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterType?: string;
    filterMaxLength?: number;
    filterElement?: object;
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
    selectionMode?: string;
    colSpan?: number;
    rowSpan?: number;
    rowReorder?: boolean;
    rowReorderIcon?: string;
    editorValidatorEvent?: string;
    rowEditor?: boolean;
    exportable?: boolean;
    reorderable?: boolean;
    excludeGlobalFilter?: boolean;
    onEditorInit?(e: {originalEvent: Event, columnProps: any}): void;
    onEditorSubmit?(e: {originalEvent: Event, columnProps: any}): void;
    onEditorCancel?(e: {originalEvent: Event, columnProps: any}): void;
    sortFunction?(e: {field: string, order: number}): void;
    filterFunction?(value: any, filter: any): void;
    editor?(props: any): JSX.Element | undefined;
    editorValidator?(e: {originalEvent: Event, columnProps: any}): boolean;
    onBeforeEditorHide?(e: {originalEvent: Event, columnProps: any}): any;
    onBeforeEditorShow?(e: {originalEvent: Event, columnProps: any}): any;
}

export class Column extends React.Component<ColumnProps,any> {}
