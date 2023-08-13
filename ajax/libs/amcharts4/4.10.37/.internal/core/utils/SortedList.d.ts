/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { EventDispatcher, AMEvent } from "./EventDispatcher";
import { Ordering } from "./Order";
import { IClone } from "./Clone";
import * as $iter from "./Iterator";
/**
 * Defines evends for [[SortedList]].
 */
export interface ISortedListEvents<A> {
    /**
     * Invoked when new value is inserted into the list.
     */
    inserted: {
        /**
         * Index where the element was inserted.
         */
        index: number;
        /**
         * Inserted value.
         */
        newValue: A;
    };
    /**
     * Invoked when a value is removed from the list.
     */
    removed: {
        /**
         * Index of the element which was removed.
         */
        index: number;
        /**
         * Removed value.
         */
        oldValue: A;
    };
}
/**
 * Ordered list contains values of any type in an indexed array.
 */
export declare class OrderedList<T> {
    /**
     * Holds list values.
     */
    protected _values: Array<T>;
    /**
     * Event dispatcher.
     */
    events: EventDispatcher<AMEvent<OrderedList<T>, ISortedListEvents<T>>>;
    /**
     * Constructor
     *
     * @param initial  Inital list of values to add to list
     */
    constructor(initial?: Array<T>);
    /**
     * All items of the list.
     *
     * Do not modify the list directly. Rather use `insert()` and `remove()`
     * methods.
     *
     * @return List values
     */
    readonly values: Array<T>;
    /**
     * Inserts a value into list item array.
     *
     * @param value  Value
     */
    protected _insert(value: T): number;
    /**
     * Number of items in the list.
     *
     * @readonly
     * @return Length
     */
    readonly length: number;
    /**
     * Returns the index of the specific `value`.
     *
     * -1 if not found.
     *
     * @param value  Value
     * @return Index
     */
    indexOf(value: T): number;
    /**
     * Checks if list contains the `value`.
     *
     * @param value  Value
     * @return In the list?
     */
    contains(value: T): boolean;
    /**
     * Returns an item at specific `index`.
     *
     * @param index  Index
     * @return Item
     */
    getIndex(index: number): T | undefined;
    /**
     * First item in the list.
     *
     * @return Item
     */
    readonly first: T | undefined;
    /**
     * Last item in the list.
     *
     * @return Item
     */
    readonly last: T | undefined;
    /**
     * Inserts a value into list.
     *
     * @param value  Value
     */
    insert(value: T): void;
    /**
     * Removes an item with the `value` from the list.
     *
     * @param value  Value
     */
    remove(value: T): void;
    /**
     * Sets multiple items to the list.
     *
     * All current items are removed.
     *
     * @param newArray  New items
     */
    setAll(newArray: Array<T>): void;
    /**
     * Removes all items from the list.
     */
    clear(): void;
    /**
     * Returns part of the list between `start` and `end` indexes, as a new
     * [[OrderedList]].
     *
     * @param start  Start index
     * @param end    End index
     * @return Items in range
     */
    slice(start: number, end: number): OrderedList<T>;
    /**
     * Finds a closest available index to the `value` in specified direction.
     *
     * @ignore exclude from docs
     * @param value      value to search for
     * @param fn         A callback function that returns value of the item
     * @param direction  Direciton
     * @return Index
     */
    findClosestIndex(value: number, fn: (value: T) => number, direction?: "left" | "right" | "any"): number;
    /**
     * Returns a list iterator.
     *
     * @return Iterator
     */
    iterator(): $iter.Iterator<T>;
    /**
     * Returns an ES6 iterator for the list.
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Calls `f` for each element in the list.
     */
    each(f: (value: T, index: number) => void): void;
}
/**
 * A list where all items are ordered according to specific ordering function,
 * which is passed in via constructor parameter, when creating an instance of
 * [[SortedList]].
 */
export declare class SortedList<T> extends OrderedList<T> {
    /**
     * A reference to the ordering function.
     */
    private _ordering;
    /**
     * Constructor.
     *
     * @param sort  Ordering function
     */
    constructor(sort: (left: T, right: T) => Ordering);
    /**
     * Inserts item into the list.
     *
     * @param value  Item
     */
    protected _insert(value: T): number;
    /**
     * Returns index of the item in list if found.
     *
     * -1 if item is not in the list.
     *
     * @param value  Item to search for
     * @return Index
     */
    indexOf(value: T): number;
    /**
     * [udpate description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param value [description]
     */
    update(value: T): void;
}
/**
 * A version of a [[OrderedList]] that has a "template".
 *
 * A template is an instance of an object, that can be used to create new
 * elements in the list without actually needing to create instances for those.
 *
 * When new element is created in the list, e.g. by calling its `create()`
 * method, an exact copy of the element is created (including properties and
 * other attributes), inserted into the list and returned.
 */
export declare class OrderedListTemplate<T extends IClone<T> & {
    isTemplate: boolean;
}> extends OrderedList<T> {
    /**
     * A template object.
     *
     * @todo Make this private
     */
    _template: T;
    /**
     * Constructor
     *
     * @param t Template object
     */
    constructor(t: T);
    /**
     * A "template" object to copy all properties from when creating new list
     * items.
     *
     * @param v  Template object
     */
    /**
    * @return Template object
    */
    template: T;
    /**
     * Copies all elements from other list.
     *
     * @param source  Source list
     */
    copyFrom(source: this): void;
    /**
     * Returns part of the list, starting at `start` and ending at `end` indexes,
     * as a new [[OrderedListTemplate]].
     *
     * @param start  Start index
     * @param end    End index
     * @return New list
     */
    slice(start: number, end: number): OrderedListTemplate<T>;
    /**
     * Instantiates a new object of the specified type, adds it to the end of
     * the list, and returns it.
     *
     * @param make  Item type to use. Will use the default type for the list if not specified.
     * @return      Newly created item
     */
    create<T>(make: {
        new (): T;
    }): T;
    create(): T;
}
/**
 * A version of a [[SortedList]] that has a "template".
 *
 * A template is an instance of an object, that can be used to create new
 * elements in the list without actually needing to create instances for those.
 *
 * When new element is created in the list, e.g. by calling its `create()`
 * method, an exact copy of the element is created (including properties and
 * other attributes), inserted into the list and returned.
 */
export declare class SortedListTemplate<T extends IClone<T> & {
    isTemplate: boolean;
}> extends SortedList<T> {
    /**
     * A template object.
     *
     * @todo Make this private
     */
    _template: T;
    /**
     * Constructor
     *
     * @param t     Template object
     * @param sort  Ordering function
     */
    constructor(t: T, sort: (left: T, right: T) => Ordering);
    /**
     * A "template" object to copy all properties from when creating new list
     * items.
     *
     * @param v  Template object
     */
    /**
    * @return Template object
    */
    template: T;
    /**
     * Copies all elements from other list.
     *
     * @param source  Source list
     */
    copyFrom(source: this): void;
    /**
     * Instantiates a new object of the specified type, adds it to the end of
     * the list, and returns it.
     *
     * @param make  Item type to use. Will use the default type for the list if not specified.
     * @return      Newly created item
     */
    create<T>(make: {
        new (): T;
    }): T;
    create(): T;
}
