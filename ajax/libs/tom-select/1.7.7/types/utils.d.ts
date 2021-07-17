import TomSelect from './tom-select';
import { TomLoadCallback } from './types/index';
/**
 * Converts a scalar to its best string representation
 * for hash keys and HTML attribute values.
 *
 * Transformations:
 *   'str'     -> 'str'
 *   null      -> ''
 *   undefined -> ''
 *   true      -> '1'
 *   false     -> '0'
 *   0         -> '0'
 *   1         -> '1'
 *
 */
export declare const hash_key: (value: undefined | null | boolean | string) => string | null;
export declare const get_hash: (value: boolean | string) => string;
/**
 * Escapes a string for use within HTML.
 *
 */
export declare const escape_html: (str: string) => string;
/**
 * Debounce the user provided load function
 *
 */
export declare const loadDebounce: (fn: (value: string, callback: TomLoadCallback) => void, delay: number) => (this: TomSelect, value: string, callback: TomLoadCallback) => void;
/**
 * Debounce all fired events types listed in `types`
 * while executing the provided `fn`.
 *
 */
export declare const debounce_events: (self: TomSelect, types: string[], fn: () => void) => void;
/**
 * Determines the current selection within a text input control.
 * Returns an object containing:
 *   - start
 *   - length
 *
 */
export declare const getSelection: (input: HTMLInputElement) => {
    start: number;
    length: number;
};
/**
 * Prevent default
 *
 */
export declare const preventDefault: (evt?: Event | undefined, stop?: boolean) => void;
/**
 * Prevent default
 *
 */
export declare const addEvent: (target: EventTarget, type: string, callback: EventListenerOrEventListenerObject, options?: object | undefined) => void;
/**
 * Return true if the requested key is down
 * Will return false if more than one control character is pressed ( when [ctrl+shift+a] != [ctrl+a] )
 * The current evt may not always set ( eg calling advanceSelection() )
 *
 */
export declare const isKeyDown: (key_name: keyof (KeyboardEvent | MouseEvent), evt?: MouseEvent | KeyboardEvent | undefined) => boolean;
/**
 * Get the id of an element
 * If the id attribute is not set, set the attribute with the given id
 *
 */
export declare const getId: (el: Element, id: string) => string;
/**
 * Returns a string with backslashes added before characters that need to be escaped.
 */
export declare const addSlashes: (str: string) => string;
/**
 *
 */
export declare const append: (parent: Element | DocumentFragment, node: string | Node | null | undefined) => void;
