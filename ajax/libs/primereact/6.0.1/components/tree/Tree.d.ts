import * as React from 'react';
import TreeNode from "../treenode/TreeNode";

interface TreeProps {
    id?: string;
    value?: TreeNode[];
    disabled?: boolean;
    selectionMode?: string;
    selectionKeys?: any;
    onSelectionChange?(e: {originalEvent: Event, value: any}): void;
    contextMenuSelectionKey?: any;
    onContextMenuSelectionChange?(e: {originalEvent: Event, value: any}): void;
    expandedKeys?: any;
    style?: object;
    className?: string;
    contentStyle?: object;
    contentClassName?: string;
    metaKeySelection?: boolean;
    propagateSelectionUp?: boolean;
    propagateSelectionDown?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    dragdropScope?: string;
    filter?: boolean;
    filterBy?: any;
    filterMode?: string;
    filterPlaceholder?: string;
    filterLocale?: string;
    nodeTemplate?(node: any): JSX.Element;
    onSelect?(e: {originalEvent: Event, node: TreeNode}): void;
    onUnselect?(e: {originalEvent: Event, node: TreeNode}): void;
    onExpand?(e: {originalEvent: Event, node: TreeNode}): void;
    onCollapse?(e: {originalEvent: Event, node: TreeNode}): void;
    onToggle?(e: {originalEvent: Event, value: any}): void;
    onDragDrop?(e: {originalEvent: Event, value: any}): void;
    onContextMenu?(e: {originalEvent: Event, node: TreeNode}): void;
}

export class Tree extends React.Component<TreeProps,any> {}
