/**
 * utils.ts 10.3.1
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { GridStackElement, GridStackNode, GridStackOptions, numberOrString, GridStackPosition, GridStackWidget } from './types';
export interface HeightData {
    h: number;
    unit: string;
}
export interface DragTransform {
    xScale: number;
    yScale: number;
    xOffset: number;
    yOffset: number;
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
    /** convert a potential selector into actual list of html elements. optional root which defaults to document (for shadow dom) */
    static getElements(els: GridStackElement, root?: HTMLElement | Document): HTMLElement[];
    /** convert a potential selector into actual single element. optional root which defaults to document (for shadow dom) */
    static getElement(els: GridStackElement, root?: HTMLElement | Document): HTMLElement;
    /** true if we should resize to content. strict=true when only 'sizeToContent:true' and not a number which lets user adjust */
    static shouldSizeToContent(n: GridStackNode | undefined, strict?: boolean): boolean;
    /** returns true if a and b overlap */
    static isIntercepted(a: GridStackPosition, b: GridStackPosition): boolean;
    /** returns true if a and b touch edges or corners */
    static isTouching(a: GridStackPosition, b: GridStackPosition): boolean;
    /** returns the area a and b overlap */
    static areaIntercept(a: GridStackPosition, b: GridStackPosition): number;
    /** returns the area */
    static area(a: GridStackPosition): number;
    /**
     * Sorts array of nodes
     * @param nodes array to sort
     * @param dir 1 for ascending, -1 for descending (optional)
     **/
    static sort(nodes: GridStackNode[], dir?: 1 | -1): GridStackNode[];
    /** find an item by id */
    static find(nodes: GridStackNode[], id: string): GridStackNode | undefined;
    /**
     * creates a style sheet with style id under given parent
     * @param id will set the 'gs-style-id' attribute to that id
     * @param parent to insert the stylesheet as first child,
     * if none supplied it will be appended to the document head instead.
     */
    static createStylesheet(id: string, parent?: HTMLElement, options?: {
        nonce?: string;
    }): CSSStyleSheet;
    /** removed the given stylesheet id */
    static removeStylesheet(id: string, parent?: HTMLElement): void;
    /** inserts a CSS rule */
    static addCSSRule(sheet: CSSStyleSheet, selector: string, rules: string): void;
    static toBool(v: unknown): boolean;
    static toNumber(value: null | string): number;
    static parseHeight(val: numberOrString): HeightData;
    /** copies unset fields in target to use the given default sources values */
    static defaults(target: any, ...sources: any[]): {};
    /** given 2 objects return true if they have the same values. Checks for Object {} having same fields and values (just 1 level down) */
    static same(a: unknown, b: unknown): boolean;
    /** copies over b size & position (GridStackPosition), and optionally min/max as well */
    static copyPos(a: GridStackWidget, b: GridStackWidget, doMinMax?: boolean): GridStackWidget;
    /** true if a and b has same size & position */
    static samePos(a: GridStackPosition, b: GridStackPosition): boolean;
    /** given a node, makes sure it's min/max are valid */
    static sanitizeMinMax(node: GridStackNode): void;
    /** removes field from the first object if same as the second objects (like diffing) and internal '_' for saving */
    static removeInternalAndSame(a: unknown, b: unknown): void;
    /** removes internal fields '_' and default values for saving */
    static removeInternalForSave(n: GridStackNode, removeEl?: boolean): void;
    /** return the closest parent (or itself) matching the given class */
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
    /** deep clone the given HTML node, removing teh unique id field */
    static cloneNode(el: HTMLElement): HTMLElement;
    static appendTo(el: HTMLElement, parent: string | HTMLElement): void;
    static addElStyles(el: HTMLElement, styles: {
        [prop: string]: string | string[];
    }): void;
    static initEvent<T>(e: DragEvent | MouseEvent, info: {
        type: string;
        target?: EventTarget;
    }): T;
    /** copies the MouseEvent properties and sends it as another event to the given target */
    static simulateMouseEvent(e: MouseEvent, simulatedType: string, target?: EventTarget): void;
    /**
     * defines an element that is used to get the offset and scale from grid transforms
     * returns the scale and offsets from said element
    */
    static getValuesFromTransformedElement(parent: HTMLElement): DragTransform;
    /** swap the given object 2 field values */
    static swap(o: unknown, a: string, b: string): void;
    /** returns true if event is inside the given element rectangle */
    /** true if the item can be rotated (checking for prop, not space available) */
    static canBeRotated(n: GridStackNode): boolean;
}
