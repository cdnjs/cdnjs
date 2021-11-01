export default interface TreeNode {
    key?: string | number;
    label?: string;
    data?: any;
    icon?: string;
    children?: TreeNode[];
    style?: object;
    className?: string;
    droppable?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    leaf?: boolean;
}
