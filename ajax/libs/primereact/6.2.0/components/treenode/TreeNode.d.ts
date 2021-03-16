export default interface TreeNode {
    key?: any;
    label?: string;
    data?: any;
    icon?: string;
    children: TreeNode[];
    style?: object;
    className?: string;
    droppable?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    leaf?: boolean;
}