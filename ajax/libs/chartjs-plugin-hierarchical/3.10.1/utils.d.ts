import { ILabelNode, ILabelNodes, IValueNode, IRawLabelNode } from './model';
export declare function asNode(label: string | IRawLabelNode, parent?: ILabelNode): ILabelNode;
export declare function toNodes(labels: readonly (IRawLabelNode | string)[]): ILabelNodes;
export declare function parentsOf(node: ILabelNode, flat: ILabelNodes): ILabelNodes;
export declare function lastOfLevel(node: ILabelNode, flat: ILabelNodes): ILabelNode;
export declare function preOrderTraversal(node: ILabelNode, visit: (node: ILabelNode) => void | boolean): void;
export declare function resolve(label: ILabelNode, flat: ILabelNodes, dataTree: (IValueNode | number)[]): number;
export declare function countExpanded(node: ILabelNode): number;
export declare function flatChildren(node: ILabelNode, flat: ILabelNodes): ILabelNodes;
export declare function determineVisible(flat: ILabelNodes): ILabelNodes;
export interface ISpanLogicResult {
    hasCollapseBox: boolean;
    hasFocusBox: boolean;
    leftVisible: ILabelNode;
    rightVisible: ILabelNode;
    groupLabelCenter: number;
    leftFirstVisible: boolean;
    rightLastVisible: boolean;
}
export declare function spanLogic(node: ILabelNode, flat: ILabelNodes, visibleNodes: Set<ILabelNode>, groupLabelPosition?: 'first' | 'center' | 'last' | 'between-first-and-second'): false | ISpanLogicResult;
//# sourceMappingURL=utils.d.ts.map