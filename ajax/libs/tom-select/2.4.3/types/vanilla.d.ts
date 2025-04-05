/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * param query should be {}
 */
export declare const getDom: (query: any) => HTMLElement;
export declare const isHtmlString: (arg: any) => boolean;
export declare const escapeQuery: (query: string) => string;
/**
 * Dispatch an event
 *
 */
export declare const triggerEvent: (dom_el: HTMLElement, event_name: string) => void;
/**
 * Apply CSS rules to a dom element
 *
 */
export declare const applyCSS: (dom_el: HTMLElement, css: {
    [key: string]: string | number;
}) => void;
/**
 * Add css classes
 *
 */
export declare const addClasses: (elmts: HTMLElement | HTMLElement[], ...classes: string[] | string[][]) => void;
/**
 * Remove css classes
 *
 */
export declare const removeClasses: (elmts: HTMLElement | HTMLElement[], ...classes: string[] | string[][]) => void;
/**
 * Return arguments
 *
 */
export declare const classesArray: (args: string[] | string[][]) => string[];
/**
 * Create an array from arg if it's not already an array
 *
 */
export declare const castAsArray: (arg: any) => Array<any>;
/**
 * Get the closest node to the evt.target matching the selector
 * Stops at wrapper
 *
 */
export declare const parentMatch: (target: null | HTMLElement, selector: string, wrapper?: HTMLElement) => HTMLElement | void;
/**
 * Get the first or last item from an array
 *
 * > 0 - right (last)
 * <= 0 - left (first)
 *
 */
export declare const getTail: (list: Array<any> | NodeList, direction?: number) => any;
/**
 * Return true if an object is empty
 *
 */
export declare const isEmptyObject: (obj: object) => boolean;
/**
 * Get the index of an element amongst sibling nodes of the same type
 *
 */
export declare const nodeIndex: (el: null | Element, amongst?: string) => number;
/**
 * Set attributes of an element
 *
 */
export declare const setAttr: (el: Element, attrs: {
    [key: string]: null | string | number;
}) => void;
/**
 * Replace a node
 */
export declare const replaceNode: (existing: Node, replacement: Node) => void;
