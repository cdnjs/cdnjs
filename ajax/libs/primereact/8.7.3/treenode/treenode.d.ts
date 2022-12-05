import { IconType } from '../utils';

export default interface TreeNode {
    id?: string;
    key?: string | number;
    label?: string;
    data?: any;
    icon?: IconType<TreeNode>;
    children?: TreeNode[];
    style?: React.CSSProperties;
    className?: string;
    droppable?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    leaf?: boolean;
    expanded?: boolean;
}
