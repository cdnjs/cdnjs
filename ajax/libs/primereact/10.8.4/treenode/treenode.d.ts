/**
 *
 * This module contains the data interface for nodes in tree components.
 *
 * @module treenode
 *
 */
import { IconType } from '../utils';

/**
 * Defines model of TreeNode API.
 * @group Model
 */
export interface TreeNode {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Unique key of the node.
     */
    key?: string | number | undefined;
    /**
     * Label of the node.
     */
    label?: string | undefined;
    /**
     * Data represented by the node.
     */
    data?: any | undefined;
    /**
     * Icon of the node to display next to content.
     */
    icon?: IconType<TreeNode> | undefined;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: TreeNode[] | undefined;
    /**
     * Inline style of the node.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the node.
     */
    className?: string | undefined;
    /**
     * Whether the node is droppable when dragdrop is enabled.
     * @defaultValue true
     */
    droppable?: boolean | undefined;
    /**
     * Whether the node is draggable when dragdrop is enabled.
     * @defaultValue true
     */
    draggable?: boolean | undefined;
    /**
     * Whether the node is selectable when selection mode is enabled.
     */
    selectable?: boolean | undefined;
    /**
     * Specifies if the node has children. Used in lazy loading.
     */
    leaf?: boolean | undefined;
    /**
     * Visibility of node.
     */
    expanded?: boolean | undefined;
}
