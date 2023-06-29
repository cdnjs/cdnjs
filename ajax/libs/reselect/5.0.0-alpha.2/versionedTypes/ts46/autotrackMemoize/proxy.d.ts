import { Node } from './tracking';
export declare const REDUX_PROXY_LABEL: unique symbol;
export declare function createNode<T extends Array<unknown> | Record<string, unknown>>(value: T): Node<T>;
export declare function updateNode<T extends Array<unknown> | Record<string, unknown>>(node: Node<T>, newValue: T): void;
