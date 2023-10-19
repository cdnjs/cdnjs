import { ExtendedElement } from './diff';
import { VNode } from './vdom';
export declare function render(vnode: VNode, parent: Element | null, store?: unknown): ExtendedElement | ExtendedElement[] | null;
