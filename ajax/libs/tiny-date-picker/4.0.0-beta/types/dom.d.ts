/**
 * Create an element.
 * @param {string} tag the tag name and / or classes (e.g. span.bright)
 * @param  {...any} args attributes object, and / or child nodes, text content, etc.
 * @returns {Element}
 */
export declare function h<T extends HTMLElement>(tag: string, ...args: any): T;
/**
 * Add event listener to the element, and return the dispose / off function.
 */
export declare function on<K extends keyof HTMLElementEventMap, T extends Pick<Element, 'addEventListener' | 'removeEventListener'>>(el: T, type: K, fn: (this: T, ev: HTMLElementEventMap[K]) => any, opts?: boolean | AddEventListenerOptions): () => any;
export declare function on<T extends Pick<Element, 'addEventListener' | 'removeEventListener'>>(el: T, type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | AddEventListenerOptions): () => any;
export declare type Handlers = Record<string, undefined | ((e: any) => void)>;
/**
 * Handle keykboard navigation in a target element.
 * @param numCols the number of columns the element contains
 * @param overrides key down handlers (optional)
 * @returns {EventHandler}
 */
export declare function keyboardNav(numCols: number, overrides?: Handlers): (e: any) => void;
//# sourceMappingURL=dom.d.ts.map