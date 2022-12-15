/**
 * @classdesc
 * Events emitted by {@link module:ol/Collection~Collection} instances are instances of this
 * type.
 */
export class CollectionEvent extends Event {
    /**
     * @param {import("./CollectionEventType.js").default} type Type.
     * @param {*} [opt_element] Element.
     * @param {number} [opt_index] The index of the added or removed element.
     */
    constructor(type: any, opt_element?: any, opt_index?: number | undefined);
    /**
     * The element that is added to or removed from the collection.
     * @type {*}
     * @api
     */
    element: any;
    /**
     * The index of the added or removed element.
     * @type {number}
     * @api
     */
    index: number;
}
export default Collection;
export type Property = string;
/**
 * *
 */
export type CollectionOnSignature<Return> = ((type: "change" | "error", listener: (event: Event) => any) => Return) & ((type: "propertychange" | "change:length", listener: (event: import("./Object.js").ObjectEvent) => any) => Return) & ((type: "add" | "remove", listener: (event: CollectionEvent) => any) => Return) & ((type: ("propertychange" | "change" | "error" | "add" | "remove" | "change:length")[], listener: (event: Event | globalThis.Event) => any) => Return extends void | null ? void : Return[]);
export type Options = {
    /**
     * Disallow the same item from being added to
     * the collection twice.
     */
    unique?: boolean;
};
import Event from "./events/Event.js";
/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<import("./ObjectEventType").Types|'change:length', import("./Object").ObjectEvent, Return> &
 *   import("./Observable").OnSignature<'add'|'remove', CollectionEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types|
 *     'change:length'|'add'|'remove',Return>} CollectionOnSignature
 */
/**
 * @typedef {Object} Options
 * @property {boolean} [unique=false] Disallow the same item from being added to
 * the collection twice.
 */
/**
 * @classdesc
 * An expanded version of standard JS Array, adding convenience methods for
 * manipulation. Add and remove changes to the Collection trigger a Collection
 * event. Note that this does not cover changes to the objects _within_ the
 * Collection; they trigger events on the appropriate object, not on the
 * Collection as a whole.
 *
 * @fires CollectionEvent
 *
 * @template T
 * @api
 */
declare class Collection<T> extends BaseObject {
    /**
     * @param {Array<T>} [opt_array] Array.
     * @param {Options} [opt_options] Collection options.
     */
    constructor(opt_array?: T[] | undefined, opt_options?: Options | undefined);
    /***
     * @type {CollectionOnSignature<import("./events").EventsKey>}
     */
    on: CollectionOnSignature<import("./events").EventsKey>;
    /***
     * @type {CollectionOnSignature<import("./events").EventsKey>}
     */
    once: CollectionOnSignature<import("./events").EventsKey>;
    /***
     * @type {CollectionOnSignature<void>}
     */
    un: CollectionOnSignature<void>;
    /**
     * @private
     * @type {boolean}
     */
    private unique_;
    /**
     * @private
     * @type {!Array<T>}
     */
    private array_;
    /**
     * Remove all elements from the collection.
     * @api
     */
    clear(): void;
    /**
     * Add elements to the collection.  This pushes each item in the provided array
     * to the end of the collection.
     * @param {!Array<T>} arr Array.
     * @return {Collection<T>} This collection.
     * @api
     */
    extend(arr: T[]): Collection<T>;
    /**
     * Iterate over each element, calling the provided callback.
     * @param {function(T, number, Array<T>): *} f The function to call
     *     for every element. This function takes 3 arguments (the element, the
     *     index and the array). The return value is ignored.
     * @api
     */
    forEach(f: (arg0: T, arg1: number, arg2: T[]) => any): void;
    /**
     * Get a reference to the underlying Array object. Warning: if the array
     * is mutated, no events will be dispatched by the collection, and the
     * collection's "length" property won't be in sync with the actual length
     * of the array.
     * @return {!Array<T>} Array.
     * @api
     */
    getArray(): T[];
    /**
     * Get the element at the provided index.
     * @param {number} index Index.
     * @return {T} Element.
     * @api
     */
    item(index: number): T;
    /**
     * Get the length of this collection.
     * @return {number} The length of the array.
     * @observable
     * @api
     */
    getLength(): number;
    /**
     * Insert an element at the provided index.
     * @param {number} index Index.
     * @param {T} elem Element.
     * @api
     */
    insertAt(index: number, elem: T): void;
    /**
     * Remove the last element of the collection and return it.
     * Return `undefined` if the collection is empty.
     * @return {T|undefined} Element.
     * @api
     */
    pop(): T | undefined;
    /**
     * Insert the provided element at the end of the collection.
     * @param {T} elem Element.
     * @return {number} New length of the collection.
     * @api
     */
    push(elem: T): number;
    /**
     * Remove the first occurrence of an element from the collection.
     * @param {T} elem Element.
     * @return {T|undefined} The removed element or undefined if none found.
     * @api
     */
    remove(elem: T): T | undefined;
    /**
     * Remove the element at the provided index and return it.
     * Return `undefined` if the collection does not contain this index.
     * @param {number} index Index.
     * @return {T|undefined} Value.
     * @api
     */
    removeAt(index: number): T | undefined;
    /**
     * Set the element at the provided index.
     * @param {number} index Index.
     * @param {T} elem Element.
     * @api
     */
    setAt(index: number, elem: T): void;
    /**
     * @private
     */
    private updateLength_;
    /**
     * @private
     * @param {T} elem Element.
     * @param {number} [opt_except] Optional index to ignore.
     */
    private assertUnique_;
}
import BaseObject from "./Object.js";
//# sourceMappingURL=Collection.d.ts.map