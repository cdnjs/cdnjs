/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IClone } from "./Clone";
import { Disposer, MultiDisposer, IDisposer } from "./Disposer";
import { EventDispatcher, AMEvent } from "./EventDispatcher";
import { Ordering } from "./Order";
import * as $iter from "./Iterator";
import * as $type from "./Type";
/**
 * @todo Description
 */
export declare class IndexedIterable<A> {
    /**
     * Item list
     */
    private _array;
    /**
     * Start index.
     */
    private _start;
    /**
     * End index.
     */
    private _end;
    /**
     * Constructor.
     *
     * @param array  List items
     * @param start  Start index
     * @param end    End index
     */
    constructor(array: Array<A>, start: number, end: number);
    /**
     * Returns a list item iterator.
     *
     * @return Iterator
     */
    iterator(): $iter.Iterator<A>;
    /**
     * Returns an interable list sorted backwards than current list.
     *
     * @return List
     */
    backwards(): IndexedIterable<A>;
    /**
     * Returns a new list consisting only of specific range of items between
     * `start` and `end` indexes.
     *
     * @param start  Start index
     * @param end    End index
     * @return List
     */
    range(start: number, end: number): IndexedIterable<A>;
}
/**
 * Defines events for the [[List]].
 */
export interface IListEvents<A> {
    /**
     * Invoked when item is added to the list.
     *
     * @todo remove this later?
     */
    inserted: {
        newValue: A;
    };
    /**
     * Invoked when item is removed from the list.
     *
     * @todo remove this later?
     */
    removed: {
        oldValue: A;
    };
    /**
     * Invoked when `setAll` method is called.
     */
    setAll: {
        oldArray: Array<A>;
        newArray: Array<A>;
    };
    /**
     * Invoked when `insertIndex` method is called.
     */
    insertIndex: {
        index: number;
        newValue: A;
    };
    /**
     * Invoked when `setIndex` method is called.
     */
    setIndex: {
        index: number;
        oldValue: A;
        newValue: A;
    };
    /**
     * Invoked when item is removed.
     */
    removeIndex: {
        index: number;
        oldValue: A;
    };
}
/**
 * ListGrouper organizes [[List]] items into groups.
 *
 * @ignore Exclude from docs
 */
export declare class ListGrouper<A> extends MultiDisposer {
    /**
     * Function that can be used to extract a "value" of the list element.
     *
     * Used for ordering.
     */
    private _getKey;
    /**
     * A function that  is used to order list groups.
     */
    private _sort;
    /**
     * Grouping keys.
     */
    private _keys;
    /**
     * List item groups.
     */
    private _groups;
    /**
     * Inserts an item (`x`) to a specific group (`key`) and specific `index`.
     *
     * @param x      Item
     * @param key    Group name
     * @param index  Index
     */
    private _insert;
    /**
     * Removes an item from the list.
     *
     * @param x Item to remove
     */
    private _remove;
    /**
     * Constructor.
     */
    constructor(list: $iter.Iterable<A> & {
        events: EventDispatcher<{
            inserted: {
                newValue: A;
            };
            removed: {
                oldValue: A;
            };
        }>;
    }, getKey: (value: A) => number, sort: (left: number, right: number) => Ordering);
    /**
     * Returns an iterator for the list.
     *
     * The iterator will iterate through all items in all groups.
     *
     * @return Iterator
     */
    iterator(): $iter.Iterator<A>;
}
/**
 * @todo Description
 * @ignore Exclude from docs
 */
export declare type ListLike<A> = $iter.Iterable<A> & {
    events: EventDispatcher<{
        removed: {
            oldValue: A;
        };
    }>;
};
/**
 * A disposable list, which when disposed itself will call `dispose()` method
 * on all its items.
 */
export declare class ListDisposer<A extends IDisposer> extends Disposer {
    constructor(list: ListLike<A>, disposeOnRemove?: boolean);
}
/**
 * A List class is used to hold a number of indexed items of the same type.
 */
export declare class List<T> {
    /**
     * List values.
     */
    private _values;
    /**
     * Event dispatcher.
     */
    events: EventDispatcher<AMEvent<this, IListEvents<T>>>;
    /**
     * Constructor
     *
     * @param initial  Inital list of values to add to list
     */
    constructor(initial?: Array<T>);
    /**
     * An array of values in the list.
     *
     * Do not use this property to add values. Rather use dedicated methods, like
     * `push()`, `removeIndex()`, etc.
     *
     * @readonly
     * @return List values
     */
    readonly values: Array<T>;
    /**
     * Checks if list contains specific item reference.
     *
     * @param item  Item to search for
     * @return `true` if found, `false` if not found
     */
    contains(value: T): boolean;
    /**
     * Removes specific item from the list.
     *
     * @param item An item to remove
     */
    removeValue(value: T): void;
    /**
     * Searches the list for specific item and returns its index.
     *
     * @param item  An item to search for
     * @return Index or -1 if not found
     */
    indexOf(value: T): number;
    /**
     * Number of items in list.
     *
     * @readonly
     * @return Number of items
     */
    readonly length: number;
    /**
     * Checks if there's a value at specific index.
     *
     * @param index  Index
     * @return Value exists?
     */
    hasIndex(index: number): boolean;
    /**
     * Returns an item at specified index.
     *
     * @param index  Index
     * @return List item
     */
    getIndex(index: number): T | undefined;
    /**
     * Sets value at specific index.
     *
     * If there's already a value at the index, it is overwritten.
     *
     * @param index  Index
     * @param value  New value
     * @return New value
     */
    setIndex(index: number, value: T): T;
    /**
     * Adds an item to the list at a specific index, which pushes all the other
     * items further down the list.
     *
     * @param index Index
     * @param item  An item to add
     */
    insertIndex(index: number, value: T): void;
    /**
     * [_sortQuicksort description]
     *
     * @todo Description
     * @param low    [description]
     * @param high   [description]
     * @param order  [description]
     */
    private _sortQuicksort;
    /**
     * [_sortPartition description]
     *
     * @todo Description
     * @param low    [description]
     * @param high   [description]
     * @param order  [description]
     * @return [description]
     */
    private _sortPartition;
    /**
     * Reorders list items according to specific ordering function.
     *
     * @param order  Ordering function
     */
    sort(order: (left: T, right: T) => Ordering): void;
    /**
     * Swaps indexes of two items in the list.
     *
     * @param a  Item 1
     * @param b  Item 2
     */
    swap(a: number, b: number): void;
    /**
     * Removes a value at specific index.
     *
     * @param index  Index of value to remove
     * @return Removed value
     */
    removeIndex(index: number): T;
    /**
     * Moves an item to a specific index within the list.
     *
     * If the index is not specified it will move the item to the end of the
     * list.
     *
     * @param value  Item to move
     * @param index  Index to place item at
     */
    moveValue(value: T, toIndex?: number): void;
    /**
     * Adds an item to the end of the list.
     *
     * @param item  An item to add
     */
    push<K extends T>(value: K): K;
    /**
     * Adds an item as a first item in the list.
     *
     * @param item  An item to add
     */
    unshift(value: T): void;
    /**
     * Adds multiple items to the list.
     *
     * @param items  An Array of items to add
     */
    pushAll(values: Array<T>): void;
    /**
     * Copies and adds items from abother list.
     *
     * @param source  A list top copy items from
     */
    copyFrom(source: this): void;
    /**
     * Returns the last item from the list, and removes it.
     *
     * @return Item
     */
    pop(): $type.Optional<T>;
    /**
     * Returns the first item from the list, and removes it.
     *
     * @return Item
     */
    shift(): $type.Optional<T>;
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
     *
     * `f` should have at least one parameter defined which will get a current
     * item, with optional second argument - index.
     */
    each(f: (value: T, index: number) => void): void;
    /**
     * Returns a specific range of list items, which can be iterated.
     *
     * @ignore Exclude from docs
     * @todo Code duplication with IndexedIterable
     * @param start  Start index
     * @param end    End index
     * @return Range
     */
    range(start: number, end: number): IndexedIterable<T>;
    /**
     * Returns an iterator that has list items sorted backwards.
     *
     * @ignore Exclude from docs
     * @return List
     */
    backwards(): IndexedIterable<T>;
}
/**
 * A version of a [[List]] that has a "template".
 *
 * A template is an instance of an object, that can be used to create new
 * elements in the list without actually needing to create instances for those.
 *
 * When new element is created in the list, e.g. by calling its `create()`
 * method, an exact copy of the element is created (including properties and
 * other attributes), inserted into the list and returned.
 */
export declare class ListTemplate<T extends IClone<T> & {
    isTemplate: boolean;
}> extends List<T> implements IClone<ListTemplate<T>> {
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
     * Instantiates a new object of the specified type, adds it to the end of
     * the list, and returns it.
     *
     * @param make  Item type to use. Will use the default type for the list if not specified.
     * @return      Newly created item
     */
    create(make: {
        new (): T;
    }): T;
    create(): T;
    /**
     * Creates an exact clone of the list, including its items and template.
     *
     * @return New list
     */
    clone(): ListTemplate<T>;
}
