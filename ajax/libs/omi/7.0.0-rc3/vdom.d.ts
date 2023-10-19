import { Fragment } from './utils';
export type Attributes = {
    key?: string | number;
    ignoreAttrs?: boolean;
    children?: VNode[] | null;
    [prop: string]: unknown;
};
export type ObjectVNode = {
    nodeName: string | Function;
    attributes: Attributes;
    children: VNode[];
    key: string | number | undefined;
};
export type VNode = ObjectVNode | string | number | boolean | null | undefined;
export declare function createElement(nodeName: string | Function, attributes: Attributes, restChildren: VNode[]): VNode | VNode[];
export declare namespace createElement {
    var f: typeof Fragment;
}
/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param vnode The virtual DOM element to clone
 * @param props Attributes/props to add when cloning
 * @param rest Any additional arguments will be used as replacement children.
 */
export declare function cloneElement(vnode: ObjectVNode, props: Attributes, ...rest: VNode[]): VNode | VNode[];
