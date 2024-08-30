import { InsertionTarget } from '../types';
/** Create a style element inside `target` or <head> after the last */
export declare const makeStyleTag: (target?: InsertionTarget | undefined) => HTMLStyleElement;
/** Get the CSSStyleSheet instance for a given style element */
export declare const getSheet: (tag: HTMLStyleElement) => CSSStyleSheet;
