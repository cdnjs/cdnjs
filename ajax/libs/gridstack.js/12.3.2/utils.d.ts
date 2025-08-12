/**
 * utils.ts 12.3.2
 * Copyright (c) 2021-2025 Alain Dumesny - see GridStack root license
 */
import { GridStackElement, GridStackNode, numberOrString, GridStackPosition, GridStackWidget } from './types';
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
/**
 * Collection of utility methods used throughout GridStack.
 * These are general-purpose helper functions for DOM manipulation,
 * positioning calculations, object operations, and more.
 */
export declare class Utils {
    /**
     * Convert a potential selector into an actual list of HTML elements.
     * Supports CSS selectors, element references, and special ID handling.
     *
     * @param els selector string, HTMLElement, or array of elements
     * @param root optional root element to search within (defaults to document, useful for shadow DOM)
     * @returns array of HTML elements matching the selector
     *
     * @example
     * const elements = Utils.getElements('.grid-item');
     * const byId = Utils.getElements('#myWidget');
     * const fromShadow = Utils.getElements('.item', shadowRoot);
     */
    static getElements(els: GridStackElement, root?: HTMLElement | Document): HTMLElement[];
    /**
     * Convert a potential selector into a single HTML element.
     * Similar to getElements() but returns only the first match.
     *
     * @param els selector string or HTMLElement
     * @param root optional root element to search within (defaults to document)
     * @returns the first HTML element matching the selector, or null if not found
     *
     * @example
     * const element = Utils.getElement('#myWidget');
     * const first = Utils.getElement('.grid-item');
     */
    static getElement(els: GridStackElement, root?: HTMLElement | Document): HTMLElement;
    /**
     * Check if a widget should be lazy loaded based on node or grid settings.
     *
     * @param n the grid node to check
     * @returns true if the item should be lazy loaded
     *
     * @example
     * if (Utils.lazyLoad(node)) {
     *   // Set up intersection observer for lazy loading
     * }
     */
    static lazyLoad(n: GridStackNode): boolean;
    /**
     * Create a div element with the specified CSS classes.
     *
     * @param classes array of CSS class names to add
     * @param parent optional parent element to append the div to
     * @returns the created div element
     *
     * @example
     * const div = Utils.createDiv(['grid-item', 'draggable']);
     * const nested = Utils.createDiv(['content'], parentDiv);
     */
    static createDiv(classes: string[], parent?: HTMLElement): HTMLElement;
    /**
     * Check if a widget should resize to fit its content.
     *
     * @param n the grid node to check (can be undefined)
     * @param strict if true, only returns true for explicit sizeToContent:true (not numbers)
     * @returns true if the widget should resize to content
     *
     * @example
     * if (Utils.shouldSizeToContent(node)) {
     *   // Trigger content-based resizing
     * }
     */
    static shouldSizeToContent(n: GridStackNode | undefined, strict?: boolean): boolean;
    /**
     * Check if two grid positions overlap/intersect.
     *
     * @param a first position with x, y, w, h properties
     * @param b second position with x, y, w, h properties
     * @returns true if the positions overlap
     *
     * @example
     * const overlaps = Utils.isIntercepted(
     *   {x: 0, y: 0, w: 2, h: 1},
     *   {x: 1, y: 0, w: 2, h: 1}
     * ); // true - they overlap
     */
    static isIntercepted(a: GridStackPosition, b: GridStackPosition): boolean;
    /**
     * Check if two grid positions are touching (edges or corners).
     *
     * @param a first position
     * @param b second position
     * @returns true if the positions are touching
     *
     * @example
     * const touching = Utils.isTouching(
     *   {x: 0, y: 0, w: 2, h: 1},
     *   {x: 2, y: 0, w: 1, h: 1}
     * ); // true - they share an edge
     */
    static isTouching(a: GridStackPosition, b: GridStackPosition): boolean;
    /**
     * Calculate the overlapping area between two grid positions.
     *
     * @param a first position
     * @param b second position
     * @returns the area of overlap (0 if no overlap)
     *
     * @example
     * const overlap = Utils.areaIntercept(
     *   {x: 0, y: 0, w: 3, h: 2},
     *   {x: 1, y: 0, w: 3, h: 2}
     * ); // returns 4 (2x2 overlap)
     */
    static areaIntercept(a: GridStackPosition, b: GridStackPosition): number;
    /**
     * Calculate the total area of a grid position.
     *
     * @param a position with width and height
     * @returns the total area (width * height)
     *
     * @example
     * const area = Utils.area({x: 0, y: 0, w: 3, h: 2}); // returns 6
     */
    static area(a: GridStackPosition): number;
    /**
     * Sort an array of grid nodes by position (y first, then x).
     *
     * @param nodes array of nodes to sort
     * @param dir sort direction: 1 for ascending (top-left first), -1 for descending
     * @returns the sorted array (modifies original)
     *
     * @example
     * const sorted = Utils.sort(nodes); // Sort top-left to bottom-right
     * const reverse = Utils.sort(nodes, -1); // Sort bottom-right to top-left
     */
    static sort(nodes: GridStackNode[], dir?: 1 | -1): GridStackNode[];
    /**
     * Find a grid node by its ID.
     *
     * @param nodes array of nodes to search
     * @param id the ID to search for
     * @returns the node with matching ID, or undefined if not found
     *
     * @example
     * const node = Utils.find(nodes, 'widget-1');
     * if (node) console.log('Found node at:', node.x, node.y);
     */
    static find(nodes: GridStackNode[], id: string): GridStackNode | undefined;
    /**
     * Convert various value types to boolean.
     * Handles strings like 'false', 'no', '0' as false.
     *
     * @param v value to convert
     * @returns boolean representation
     *
     * @example
     * Utils.toBool('true');  // true
     * Utils.toBool('false'); // false
     * Utils.toBool('no');    // false
     * Utils.toBool('1');     // true
     */
    static toBool(v: unknown): boolean;
    /**
     * Convert a string value to a number, handling null and empty strings.
     *
     * @param value string or null value to convert
     * @returns number value, or undefined for null/empty strings
     *
     * @example
     * Utils.toNumber('42');  // 42
     * Utils.toNumber('');    // undefined
     * Utils.toNumber(null);  // undefined
     */
    static toNumber(value: null | string): number;
    /**
     * Parse a height value with units into numeric value and unit string.
     * Supports px, em, rem, vh, vw, %, cm, mm units.
     *
     * @param val height value as number or string with units
     * @returns object with h (height) and unit properties
     *
     * @example
     * Utils.parseHeight('100px');  // {h: 100, unit: 'px'}
     * Utils.parseHeight('2rem');   // {h: 2, unit: 'rem'}
     * Utils.parseHeight(50);       // {h: 50, unit: 'px'}
     */
    static parseHeight(val: numberOrString): HeightData;
    /**
     * Copy unset fields from source objects to target object (shallow merge with defaults).
     * Similar to Object.assign but only sets undefined/null fields.
     *
     * @param target the object to copy defaults into
     * @param sources one or more source objects to copy defaults from
     * @returns the modified target object
     *
     * @example
     * const config = { width: 100 };
     * Utils.defaults(config, { width: 200, height: 50 });
     * // config is now { width: 100, height: 50 }
     */
    static defaults(target: any, ...sources: any[]): {};
    /**
     * Compare two objects for equality (shallow comparison).
     * Checks if objects have the same fields and values at one level deep.
     *
     * @param a first object to compare
     * @param b second object to compare
     * @returns true if objects have the same values
     *
     * @example
     * Utils.same({x: 1, y: 2}, {x: 1, y: 2}); // true
     * Utils.same({x: 1}, {x: 1, y: 2}); // false
     */
    static same(a: unknown, b: unknown): boolean;
    /**
     * Copy position and size properties from one widget to another.
     * Copies x, y, w, h and optionally min/max constraints.
     *
     * @param a target widget to copy to
     * @param b source widget to copy from
     * @param doMinMax if true, also copy min/max width/height constraints
     * @returns the target widget (a)
     *
     * @example
     * Utils.copyPos(widget1, widget2); // Copy position/size
     * Utils.copyPos(widget1, widget2, true); // Also copy constraints
     */
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
    /** copies the MouseEvent (or convert Touch) properties and sends it as another event to the given target */
    static simulateMouseEvent(e: MouseEvent | Touch, simulatedType: string, target?: EventTarget): void;
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
