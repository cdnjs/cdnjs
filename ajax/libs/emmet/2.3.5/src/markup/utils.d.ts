import { Abbreviation, AbbreviationNode } from '@emmetio/abbreviation';
export declare type Container = Abbreviation | AbbreviationNode;
export declare type WalkVisitor<S> = (node: AbbreviationNode, ancestors: Container[], state?: S) => void;
/**
 * Walks over each child node of given markup abbreviation AST node (not including
 * given one) and invokes `fn` on each node.
 * The `fn` callback accepts context node, list of ancestor nodes and optional
 * state object
 */
export declare function walk<S>(node: Container, fn: WalkVisitor<S>, state?: S): void;
/**
 * Finds node which is the deepest for in current node or node itself.
 */
export declare function findDeepest(node: Container): {
    node: Container;
    parent?: Container;
};
export declare function isNode(node: Container): node is AbbreviationNode;
