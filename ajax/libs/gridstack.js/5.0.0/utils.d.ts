/**
 * utils.ts 5.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { GridStackElement, GridStackNode, GridStackOptions, numberOrString, GridStackPosition, GridStackWidget } from './types';
export interface HeightData {
    h: number;
    unit: string;
}
/** checks for obsolete method names */
export declare function obsolete(self: any, f: any, oldName: string, newName: string, rev: string): (...args: any[]) => any;
/** checks for obsolete grid options (can be used for any fields, but msg is about options) */
export declare function obsoleteOpts(opts: GridStackOptions, oldName: string, newName: string, rev: string): void;
/** checks for obsolete grid options which are gone */
export declare function obsoleteOptsDel(opts: GridStackOptions, oldName: string, rev: string, info: string): void;
/** checks for obsolete Jquery element attributes */
export declare function obsoleteAttr(el: HTMLElement, oldName: string, newName: string, rev: string): void;
/**
 * Utility methods
 */
export declare class Utils {
    /** convert a potential selector into actual list of html elements */
    static getElements(els: GridStackElement): HTMLElement[];
    /** convert a potential selector into actual single element */
    static getElement(els: GridStackElement): HTMLElement;
    /** returns true if a and b overlap */
    static isIntercepted(a: GridStackPosition, b: GridStackPosition): boolean;
    /** returns true if a and b touch edges or corners */
    static isTouching(a: GridStackPosition, b: GridStackPosition): boolean;
    /**
     * Sorts array of nodes
     * @param nodes array to sort
     * @param dir 1 for asc, -1 for desc (optional)
     * @param width width of the grid. If undefined the width will be calculated automatically (optional).
     **/
    static sort(nodes: GridStackNode[], dir?: -1 | 1, column?: number): GridStackNode[];
    /**
     * creates a style sheet with style id under given parent
     * @param id will set the 'gs-style-id' attribute to that id
     * @param parent to insert the stylesheet as first child,
     * if none supplied it will be appended to the document head instead.
     */
    static createStylesheet(id: string, parent?: HTMLElement): CSSStyleSheet;
    /** removed the given stylesheet id */
    static removeStylesheet(id: string): void;
    /** inserts a CSS rule */
    static addCSSRule(sheet: CSSStyleSheet, selector: string, rules: string): void;
    static toBool(v: unknown): boolean;
    static toNumber(value: null | string): number;
    static parseHeight(val: numberOrString): HeightData;
    /** copies unset fields in target to use the given default sources values */
    static defaults(target: any, ...sources: any[]): {};
    /** given 2 objects return true if they have the same values. Checks for Object {} having same fields and values (just 1 level down) */
    static same(a: unknown, b: unknown): boolean;
    /** copies over b size & position (GridStackPosition), and possibly min/max as well */
    static copyPos(a: GridStackWidget, b: GridStackWidget, minMax?: boolean): GridStackWidget;
    /** true if a and b has same size & position */
    static samePos(a: GridStackPosition, b: GridStackPosition): boolean;
    /** removes field from the first object if same as the second objects (like diffing) and internal '_' for saving */
    static removeInternalAndSame(a: unknown, b: unknown): void;
    /** return the closest parent (or itself) matching the given class */
    static closestByClass(el: HTMLElement, name: string): HTMLElement;
    /** delay calling the given function for given delay, preventing new calls from happening while waiting */
    static throttle(func: () => void, delay: number): () => void;
    static removePositioningStyles(el: HTMLElement): void;
    /** single level clone, returning a new object with same top fields. This will share sub objects and arrays */
    static clone<T>(obj: T): T;
    /**
     * Recursive clone version that returns a full copy, checking for nested objects and arrays ONLY.
     * Note: this will use as-is any key starting with double __ (and not copy inside) some lib have circular dependencies.
     */
    static cloneDeep<T>(obj: T): T;
}
