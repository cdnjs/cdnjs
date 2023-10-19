import { ExtendedElement } from './diff';
import { VNode } from './vdom';
import './construct-style-sheets-polyfill';
/**
 * Convert a kebab-case string to camelCase.
 * @param str - The kebab-case string to convert.
 * @returns The camelCase version of the input string.
 */
export declare function camelCase(str: string): string;
/**
 * A functional component that renders its children.
 * @param props - The component's props.
 * @returns The component's children.
 */
export declare function Fragment(props: {
    children: any;
}): any;
/**
 * Invoke or update a ref, depending on whether it is a function or object ref.
 * @param ref - The ref to apply.
 * @param value - The value to set or pass to the ref.
 */
export declare function applyRef(ref: ((value: any) => void) | {
    current: any;
} | null, value: any): void;
/**
 * Check if the given object is an array.
 * @param obj - The object to check.
 * @returns True if the object is an array, false otherwise.
 */
export declare function isArray(obj: unknown): boolean;
/**
 * Convert a camelCase string to kebab-case.
 * @param str - The camelCase string to convert.
 * @returns The kebab-case version of the input string.
 */
export declare function hyphenate(str: string): string;
/**
 * Capitalize the first letter of each word in a kebab-case string.
 * @param name - The kebab-case string to capitalize.
 * @returns The capitalized version of the input string.
 */
export declare function capitalize(name: string): string;
/**
 * Create a new CSSStyleSheet with the given style.
 * @param style - The CSS style to apply to the new stylesheet.
 * @returns The created CSSStyleSheet.
 */
export declare function createStyleSheet(style: string): CSSStyleSheet;
/**
 * Check if two nodes are equivalent.
 * @param node - The DOM Node to compare.
 * @param vnode - The virtual DOM node to compare.
 * @param hydrating - If true, ignores component constructors when comparing.
 * @returns True if the nodes are equivalent, false otherwise.
 */
export declare function isSameNodeType(node: ExtendedElement, vnode: VNode): boolean;
/**
 * Check if an Element has a given nodeName, case-insensitively.
 * @param node - The DOM Element to inspect the name of.
 * @param nodeName - The unnormalized name to compare against.
 * @returns True if the element has the given nodeName, false otherwise.
 */
export declare function isNamedNode(node: ExtendedElement, nodeName: string): boolean;
/**
 * Get the global object (window in browsers, global in Node.js).
 * @returns The global object.
 */
export declare function getGlobal(): Window | typeof globalThis;
export declare function createRef(): {};
