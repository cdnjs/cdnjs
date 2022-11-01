import * as React from 'react';
import TreeNode from '../treenode';

type TreeSelectionModeType = 'single' | 'multiple' | 'checkbox';

type TreeSelectionKeys = string | TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null;

type TreeSelectionKeyType = boolean | TreeCheckboxSelectionKeyType;

type TreeFilterModeType = 'lenient' | 'strict';

type TreeHeaderTemplateType = React.ReactNode | ((options: TreeHeaderTemplateOptions) => React.ReactNode);

type TreeFilterTemplateType = React.ReactNode | ((options: TreeFilterOptions) => React.ReactNode);

type TreeFooterTemplateType = React.ReactNode | ((props: TreeProps) => React.ReactNode);

type TreeNodeTemplateType = React.ReactNode | ((node: TreeNode, options: TreeNodeTemplateOptions) => React.ReactNode);

type TreeTogglerTemplateType = React.ReactNode | ((node: TreeNode, options: TreeTogglerTemplateOptions) => React.ReactNode);

interface TreeHeaderTemplateOptions {
    filterContainerClassName: string;
    filterIconClasssName: string;
    filterInput: TreeFilterInputOptions;
    filterElement: JSX.Element;
    element: JSX.Element;
    props: TreeProps;
}

interface TreeFilterInputOptions {
    className: string;
    onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
    onChange(event: React.KeyboardEvent<HTMLInputElement>): void;
}

interface TreeNodeTemplateOptions {
    onTogglerClick(e: React.SyntheticEvent): void;
    className: string;
    element: JSX.Element;
    props: TreeProps;
    expanded: boolean;
}

interface TreeTogglerTemplateOptions {
    onClick(e: React.SyntheticEvent): void;
    containerClassName: string;
    iconClassName: string;
    element: JSX.Element;
    props: TreeProps;
    expanded: boolean;
}

interface TreeMultipleSelectionKeys {
    [key: string]: boolean;
}

interface TreeCheckboxSelectionKeys {
    [key: string]: TreeCheckboxSelectionKeyType;
}

interface TreeCheckboxSelectionKeyType {
    checked?: boolean;
    partialChecked?: boolean;
}

interface TreeExpandedKeysType {
    [key: string]: boolean;
}

interface TreeExpandedParams {
    originalEvent: React.SyntheticEvent;
    value: TreeExpandedKeysType;
}

interface TreeSelectionParams {
    originalEvent: React.SyntheticEvent;
    value: TreeSelectionKeys;
}

export interface TreeEventNodeParams {
    originalEvent: React.SyntheticEvent;
    node: TreeNode;
}

interface TreeDragDropParams {
    originalEvent: React.SyntheticEvent;
    value: TreeNode[];
    dragNode: TreeNode;
    dropNode: TreeNode;
    dropIndex: number;
}

interface TreeFilterValueChangeParams {
    originalEvent: React.FormEvent<HTMLInputElement>;
    value: string;
}

interface TreeNodeClickParams {
    originalEvent: React.SyntheticEvent;
    node: TreeNode;
}

interface TreeFilterOptions {
    filter?: (event?: KeyboardEvent) => void;
    reset?: () => void;
}

interface TreeNodeDoubleClickParams extends TreeNodeClickParams {}

export interface TreeProps {
    id?: string;
    value?: TreeNode[];
    disabled?: boolean;
    selectionMode?: TreeSelectionModeType;
    selectionKeys?: TreeSelectionKeys;
    contextMenuSelectionKey?: string;
    expandedKeys?: TreeExpandedKeysType;
    style?: React.CSSProperties;
    className?: string;
    contentStyle?: React.CSSProperties;
    contentClassName?: string;
    metaKeySelection?: boolean;
    propagateSelectionUp?: boolean;
    propagateSelectionDown?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    dragdropScope?: string;
    header?: TreeHeaderTemplateType;
    footer?: TreeFooterTemplateType;
    filterTemplate?: TreeFilterTemplateType;
    showHeader?: boolean;
    filter?: boolean;
    filterValue?: string;
    filterBy?: string;
    filterMode?: TreeFilterModeType;
    filterPlaceholder?: string;
    filterLocale?: string;
    togglerTemplate?: TreeTogglerTemplateType;
    nodeTemplate?: TreeNodeTemplateType;
    onSelectionChange?(e: TreeSelectionParams): void;
    onContextMenuSelectionChange?(e: TreeSelectionParams): void;
    onSelect?(e: TreeEventNodeParams): void;
    onUnselect?(e: TreeEventNodeParams): void;
    onExpand?(e: TreeEventNodeParams): void;
    onCollapse?(e: TreeEventNodeParams): void;
    onToggle?(e: TreeExpandedParams): void;
    onDragDrop?(e: TreeDragDropParams): void;
    onContextMenu?(e: TreeEventNodeParams): void;
    onFilterValueChange?(e: TreeFilterValueChangeParams): void;
    onNodeClick?(e: TreeNodeClickParams): void;
    onNodeDoubleClick?(e: TreeNodeDoubleClickParams): void;
    children?: React.ReactNode;
}

export declare class Tree extends React.Component<TreeProps, any> {
    public filter<T>(value: T): void;
    public getElement(): HTMLDivElement;
}
