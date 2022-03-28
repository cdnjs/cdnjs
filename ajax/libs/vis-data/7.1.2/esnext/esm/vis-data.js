/**
 * vis-data
 * http://visjs.org/
 *
 * Manage unstructured data using DataSet. Add, update, and remove data, and listen for changes in the data.
 *
 * @version 7.1.2
 * @date    2021-01-08T20:37:11.601Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

import { pureDeepObjectAssign } from 'vis-util/esnext/esm/vis-util.js';
export { DELETE } from 'vis-util/esnext/esm/vis-util.js';
import { v4 } from 'uuid';

/**
 * Create new data pipe.
 *
 * @param from - The source data set or data view.
 *
 * @remarks
 * Example usage:
 * ```typescript
 * interface AppItem {
 *   whoami: string;
 *   appData: unknown;
 *   visData: VisItem;
 * }
 * interface VisItem {
 *   id: number;
 *   label: string;
 *   color: string;
 *   x: number;
 *   y: number;
 * }
 *
 * const ds1 = new DataSet<AppItem, "whoami">([], { fieldId: "whoami" });
 * const ds2 = new DataSet<VisItem, "id">();
 *
 * const pipe = createNewDataPipeFrom(ds1)
 *   .filter((item): boolean => item.enabled === true)
 *   .map<VisItem, "id">((item): VisItem => item.visData)
 *   .to(ds2);
 *
 * pipe.start();
 * ```
 *
 * @returns A factory whose methods can be used to configure the pipe.
 */
function createNewDataPipeFrom(from) {
    return new DataPipeUnderConstruction(from);
}
/**
 * Internal implementation of the pipe. This should be accessible only through
 * `createNewDataPipeFrom` from the outside.
 *
 * @typeParam SI - Source item type.
 * @typeParam SP - Source item type's id property name.
 * @typeParam TI - Target item type.
 * @typeParam TP - Target item type's id property name.
 */
class SimpleDataPipe {
    /**
     * Create a new data pipe.
     *
     * @param _source - The data set or data view that will be observed.
     * @param _transformers - An array of transforming functions to be used to
     * filter or transform the items in the pipe.
     * @param _target - The data set or data view that will receive the items.
     */
    constructor(_source, _transformers, _target) {
        this._source = _source;
        this._transformers = _transformers;
        this._target = _target;
        /**
         * Bound listeners for use with `DataInterface['on' | 'off']`.
         */
        this._listeners = {
            add: this._add.bind(this),
            remove: this._remove.bind(this),
            update: this._update.bind(this),
        };
    }
    /** @inheritDoc */
    all() {
        this._target.update(this._transformItems(this._source.get()));
        return this;
    }
    /** @inheritDoc */
    start() {
        this._source.on("add", this._listeners.add);
        this._source.on("remove", this._listeners.remove);
        this._source.on("update", this._listeners.update);
        return this;
    }
    /** @inheritDoc */
    stop() {
        this._source.off("add", this._listeners.add);
        this._source.off("remove", this._listeners.remove);
        this._source.off("update", this._listeners.update);
        return this;
    }
    /**
     * Apply the transformers to the items.
     *
     * @param items - The items to be transformed.
     *
     * @returns The transformed items.
     */
    _transformItems(items) {
        return this._transformers.reduce((items, transform) => {
            return transform(items);
        }, items);
    }
    /**
     * Handle an add event.
     *
     * @param _name - Ignored.
     * @param payload - The payload containing the ids of the added items.
     */
    _add(_name, payload) {
        if (payload == null) {
            return;
        }
        this._target.add(this._transformItems(this._source.get(payload.items)));
    }
    /**
     * Handle an update event.
     *
     * @param _name - Ignored.
     * @param payload - The payload containing the ids of the updated items.
     */
    _update(_name, payload) {
        if (payload == null) {
            return;
        }
        this._target.update(this._transformItems(this._source.get(payload.items)));
    }
    /**
     * Handle a remove event.
     *
     * @param _name - Ignored.
     * @param payload - The payload containing the data of the removed items.
     */
    _remove(_name, payload) {
        if (payload == null) {
            return;
        }
        this._target.remove(this._transformItems(payload.oldData));
    }
}
/**
 * Internal implementation of the pipe factory. This should be accessible
 * only through `createNewDataPipeFrom` from the outside.
 *
 * @typeParam TI - Target item type.
 * @typeParam TP - Target item type's id property name.
 */
class DataPipeUnderConstruction {
    /**
     * Create a new data pipe factory. This is an internal constructor that
     * should never be called from outside of this file.
     *
     * @param _source - The source data set or data view for this pipe.
     */
    constructor(_source) {
        this._source = _source;
        /**
         * Array transformers used to transform items within the pipe. This is typed
         * as any for the sake of simplicity.
         */
        this._transformers = [];
    }
    /**
     * Filter the items.
     *
     * @param callback - A filtering function that returns true if given item
     * should be piped and false if not.
     *
     * @returns This factory for further configuration.
     */
    filter(callback) {
        this._transformers.push((input) => input.filter(callback));
        return this;
    }
    /**
     * Map each source item to a new type.
     *
     * @param callback - A mapping function that takes a source item and returns
     * corresponding mapped item.
     *
     * @typeParam TI - Target item type.
     * @typeParam TP - Target item type's id property name.
     *
     * @returns This factory for further configuration.
     */
    map(callback) {
        this._transformers.push((input) => input.map(callback));
        return this;
    }
    /**
     * Map each source item to zero or more items of a new type.
     *
     * @param callback - A mapping function that takes a source item and returns
     * an array of corresponding mapped items.
     *
     * @typeParam TI - Target item type.
     * @typeParam TP - Target item type's id property name.
     *
     * @returns This factory for further configuration.
     */
    flatMap(callback) {
        this._transformers.push((input) => input.flatMap(callback));
        return this;
    }
    /**
     * Connect this pipe to given data set.
     *
     * @param target - The data set that will receive the items from this pipe.
     *
     * @returns The pipe connected between given data sets and performing
     * configured transformation on the processed items.
     */
    to(target) {
        return new SimpleDataPipe(this._source, this._transformers, target);
    }
}

/**
 * Determine whether a value can be used as an id.
 *
 * @param value - Input value of unknown type.
 *
 * @returns True if the value is valid id, false otherwise.
 */
function isId(value) {
    return typeof value === "string" || typeof value === "number";
}

/**
 * A queue.
 *
 * @typeParam T - The type of method names to be replaced by queued versions.
 */
class Queue {
    /**
     * Construct a new Queue.
     *
     * @param options - Queue configuration.
     */
    constructor(options) {
        this._queue = [];
        this._timeout = null;
        this._extended = null;
        // options
        this.delay = null;
        this.max = Infinity;
        this.setOptions(options);
    }
    /**
     * Update the configuration of the queue.
     *
     * @param options - Queue configuration.
     */
    setOptions(options) {
        if (options && typeof options.delay !== "undefined") {
            this.delay = options.delay;
        }
        if (options && typeof options.max !== "undefined") {
            this.max = options.max;
        }
        this._flushIfNeeded();
    }
    /**
     * Extend an object with queuing functionality.
     * The object will be extended with a function flush, and the methods provided in options.replace will be replaced with queued ones.
     *
     * @param object - The object to be extended.
     * @param options - Additional options.
     *
     * @returns The created queue.
     */
    static extend(object, options) {
        const queue = new Queue(options);
        if (object.flush !== undefined) {
            throw new Error("Target object already has a property flush");
        }
        object.flush = () => {
            queue.flush();
        };
        const methods = [
            {
                name: "flush",
                original: undefined,
            },
        ];
        if (options && options.replace) {
            for (let i = 0; i < options.replace.length; i++) {
                const name = options.replace[i];
                methods.push({
                    name: name,
                    // @TODO: better solution?
                    original: object[name],
                });
                // @TODO: better solution?
                queue.replace(object, name);
            }
        }
        queue._extended = {
            object: object,
            methods: methods,
        };
        return queue;
    }
    /**
     * Destroy the queue. The queue will first flush all queued actions, and in case it has extended an object, will restore the original object.
     */
    destroy() {
        this.flush();
        if (this._extended) {
            const object = this._extended.object;
            const methods = this._extended.methods;
            for (let i = 0; i < methods.length; i++) {
                const method = methods[i];
                if (method.original) {
                    // @TODO: better solution?
                    object[method.name] = method.original;
                }
                else {
                    // @TODO: better solution?
                    delete object[method.name];
                }
            }
            this._extended = null;
        }
    }
    /**
     * Replace a method on an object with a queued version.
     *
     * @param object - Object having the method.
     * @param method - The method name.
     */
    replace(object, method) {
        /* eslint-disable-next-line @typescript-eslint/no-this-alias -- Function this is necessary in the function bellow, so class this has to be saved into a variable here. */
        const me = this;
        const original = object[method];
        if (!original) {
            throw new Error("Method " + method + " undefined");
        }
        object[method] = function (...args) {
            // add this call to the queue
            me.queue({
                args: args,
                fn: original,
                context: this,
            });
        };
    }
    /**
     * Queue a call.
     *
     * @param entry - The function or entry to be queued.
     */
    queue(entry) {
        if (typeof entry === "function") {
            this._queue.push({ fn: entry });
        }
        else {
            this._queue.push(entry);
        }
        this._flushIfNeeded();
    }
    /**
     * Check whether the queue needs to be flushed.
     */
    _flushIfNeeded() {
        // flush when the maximum is exceeded.
        if (this._queue.length > this.max) {
            this.flush();
        }
        // flush after a period of inactivity when a delay is configured
        if (this._timeout != null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (this.queue.length > 0 && typeof this.delay === "number") {
            this._timeout = setTimeout(() => {
                this.flush();
            }, this.delay);
        }
    }
    /**
     * Flush all queued calls
     */
    flush() {
        this._queue.splice(0).forEach((entry) => {
            entry.fn.apply(entry.context || entry.fn, entry.args || []);
        });
    }
}

/**
 * [[DataSet]] code that can be reused in [[DataView]] or other similar implementations of [[DataInterface]].
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */
class DataSetPart {
    constructor() {
        this._subscribers = {
            "*": [],
            add: [],
            remove: [],
            update: [],
        };
        /**
         * @deprecated Use on instead (PS: DataView.subscribe === DataView.on).
         */
        this.subscribe = DataSetPart.prototype.on;
        /**
         * @deprecated Use off instead (PS: DataView.unsubscribe === DataView.off).
         */
        this.unsubscribe = DataSetPart.prototype.off;
    }
    /**
     * Trigger an event
     *
     * @param event - Event name.
     * @param payload - Event payload.
     * @param senderId - Id of the sender.
     */
    _trigger(event, payload, senderId) {
        if (event === "*") {
            throw new Error("Cannot trigger event *");
        }
        [...this._subscribers[event], ...this._subscribers["*"]].forEach((subscriber) => {
            subscriber(event, payload, senderId != null ? senderId : null);
        });
    }
    /**
     * Subscribe to an event, add an event listener.
     *
     * @remarks Non-function callbacks are ignored.
     *
     * @param event - Event name.
     * @param callback - Callback method.
     */
    on(event, callback) {
        if (typeof callback === "function") {
            this._subscribers[event].push(callback);
        }
        // @TODO: Maybe throw for invalid callbacks?
    }
    /**
     * Unsubscribe from an event, remove an event listener.
     *
     * @remarks If the same callback was subscribed more than once **all** occurences will be removed.
     *
     * @param event - Event name.
     * @param callback - Callback method.
     */
    off(event, callback) {
        this._subscribers[event] = this._subscribers[event].filter((subscriber) => subscriber !== callback);
    }
}

/**
 * Data stream
 *
 * @remarks
 * [[DataStream]] offers an always up to date stream of items from a [[DataSet]] or [[DataView]].
 * That means that the stream is evaluated at the time of iteration, conversion to another data type or when [[cache]] is called, not when the [[DataStream]] was created.
 * Multiple invocations of for example [[toItemArray]] may yield different results (if the data source like for example [[DataSet]] gets modified).
 *
 * @typeParam Item - The item type this stream is going to work with.
 */
class DataStream {
    /**
     * Create a new data stream.
     *
     * @param pairs - The id, item pairs.
     */
    constructor(pairs) {
        this._pairs = pairs;
    }
    /**
     * Return an iterable of key, value pairs for every entry in the stream.
     */
    *[Symbol.iterator]() {
        for (const [id, item] of this._pairs) {
            yield [id, item];
        }
    }
    /**
     * Return an iterable of key, value pairs for every entry in the stream.
     */
    *entries() {
        for (const [id, item] of this._pairs) {
            yield [id, item];
        }
    }
    /**
     * Return an iterable of keys in the stream.
     */
    *keys() {
        for (const [id] of this._pairs) {
            yield id;
        }
    }
    /**
     * Return an iterable of values in the stream.
     */
    *values() {
        for (const [, item] of this._pairs) {
            yield item;
        }
    }
    /**
     * Return an array containing all the ids in this stream.
     *
     * @remarks
     * The array may contain duplicities.
     *
     * @returns The array with all ids from this stream.
     */
    toIdArray() {
        return [...this._pairs].map((pair) => pair[0]);
    }
    /**
     * Return an array containing all the items in this stream.
     *
     * @remarks
     * The array may contain duplicities.
     *
     * @returns The array with all items from this stream.
     */
    toItemArray() {
        return [...this._pairs].map((pair) => pair[1]);
    }
    /**
     * Return an array containing all the entries in this stream.
     *
     * @remarks
     * The array may contain duplicities.
     *
     * @returns The array with all entries from this stream.
     */
    toEntryArray() {
        return [...this._pairs];
    }
    /**
     * Return an object map containing all the items in this stream accessible by ids.
     *
     * @remarks
     * In case of duplicate ids (coerced to string so `7 == '7'`) the last encoutered appears in the returned object.
     *
     * @returns The object map of all id → item pairs from this stream.
     */
    toObjectMap() {
        const map = Object.create(null);
        for (const [id, item] of this._pairs) {
            map[id] = item;
        }
        return map;
    }
    /**
     * Return a map containing all the items in this stream accessible by ids.
     *
     * @returns The map of all id → item pairs from this stream.
     */
    toMap() {
        return new Map(this._pairs);
    }
    /**
     * Return a set containing all the (unique) ids in this stream.
     *
     * @returns The set of all ids from this stream.
     */
    toIdSet() {
        return new Set(this.toIdArray());
    }
    /**
     * Return a set containing all the (unique) items in this stream.
     *
     * @returns The set of all items from this stream.
     */
    toItemSet() {
        return new Set(this.toItemArray());
    }
    /**
     * Cache the items from this stream.
     *
     * @remarks
     * This method allows for items to be fetched immediatelly and used (possibly multiple times) later.
     * It can also be used to optimize performance as [[DataStream]] would otherwise reevaluate everything upon each iteration.
     *
     * ## Example
     * ```javascript
     * const ds = new DataSet([…])
     *
     * const cachedStream = ds.stream()
     *   .filter(…)
     *   .sort(…)
     *   .map(…)
     *   .cached(…) // Data are fetched, processed and cached here.
     *
     * ds.clear()
     * chachedStream // Still has all the items.
     * ```
     *
     * @returns A new [[DataStream]] with cached items (detached from the original [[DataSet]]).
     */
    cache() {
        return new DataStream([...this._pairs]);
    }
    /**
     * Get the distinct values of given property.
     *
     * @param callback - The function that picks and possibly converts the property.
     *
     * @typeParam T - The type of the distinct value.
     *
     * @returns A set of all distinct properties.
     */
    distinct(callback) {
        const set = new Set();
        for (const [id, item] of this._pairs) {
            set.add(callback(item, id));
        }
        return set;
    }
    /**
     * Filter the items of the stream.
     *
     * @param callback - The function that decides whether an item will be included.
     *
     * @returns A new data stream with the filtered items.
     */
    filter(callback) {
        const pairs = this._pairs;
        return new DataStream({
            *[Symbol.iterator]() {
                for (const [id, item] of pairs) {
                    if (callback(item, id)) {
                        yield [id, item];
                    }
                }
            },
        });
    }
    /**
     * Execute a callback for each item of the stream.
     *
     * @param callback - The function that will be invoked for each item.
     */
    forEach(callback) {
        for (const [id, item] of this._pairs) {
            callback(item, id);
        }
    }
    /**
     * Map the items into a different type.
     *
     * @param callback - The function that does the conversion.
     *
     * @typeParam Mapped - The type of the item after mapping.
     *
     * @returns A new data stream with the mapped items.
     */
    map(callback) {
        const pairs = this._pairs;
        return new DataStream({
            *[Symbol.iterator]() {
                for (const [id, item] of pairs) {
                    yield [id, callback(item, id)];
                }
            },
        });
    }
    /**
     * Get the item with the maximum value of given property.
     *
     * @param callback - The function that picks and possibly converts the property.
     *
     * @returns The item with the maximum if found otherwise null.
     */
    max(callback) {
        const iter = this._pairs[Symbol.iterator]();
        let curr = iter.next();
        if (curr.done) {
            return null;
        }
        let maxItem = curr.value[1];
        let maxValue = callback(curr.value[1], curr.value[0]);
        while (!(curr = iter.next()).done) {
            const [id, item] = curr.value;
            const value = callback(item, id);
            if (value > maxValue) {
                maxValue = value;
                maxItem = item;
            }
        }
        return maxItem;
    }
    /**
     * Get the item with the minimum value of given property.
     *
     * @param callback - The function that picks and possibly converts the property.
     *
     * @returns The item with the minimum if found otherwise null.
     */
    min(callback) {
        const iter = this._pairs[Symbol.iterator]();
        let curr = iter.next();
        if (curr.done) {
            return null;
        }
        let minItem = curr.value[1];
        let minValue = callback(curr.value[1], curr.value[0]);
        while (!(curr = iter.next()).done) {
            const [id, item] = curr.value;
            const value = callback(item, id);
            if (value < minValue) {
                minValue = value;
                minItem = item;
            }
        }
        return minItem;
    }
    /**
     * Reduce the items into a single value.
     *
     * @param callback - The function that does the reduction.
     * @param accumulator - The initial value of the accumulator.
     *
     * @typeParam T - The type of the accumulated value.
     *
     * @returns The reduced value.
     */
    reduce(callback, accumulator) {
        for (const [id, item] of this._pairs) {
            accumulator = callback(accumulator, item, id);
        }
        return accumulator;
    }
    /**
     * Sort the items.
     *
     * @param callback - Item comparator.
     *
     * @returns A new stream with sorted items.
     */
    sort(callback) {
        return new DataStream({
            [Symbol.iterator]: () => [...this._pairs]
                .sort(([idA, itemA], [idB, itemB]) => callback(itemA, itemB, idA, idB))[Symbol.iterator](),
        });
    }
}

/**
 * Add an id to given item if it doesn't have one already.
 *
 * @remarks
 * The item will be modified.
 *
 * @param item - The item that will have an id after a call to this function.
 * @param idProp - The key of the id property.
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 *
 * @returns true
 */
function ensureFullItem(item, idProp) {
    if (item[idProp] == null) {
        // generate an id
        item[idProp] = v4();
    }
    return item;
}
/**
 * # DataSet
 *
 * Vis.js comes with a flexible DataSet, which can be used to hold and
 * manipulate unstructured data and listen for changes in the data. The DataSet
 * is key/value based. Data items can be added, updated and removed from the
 * DataSet, and one can subscribe to changes in the DataSet. The data in the
 * DataSet can be filtered and ordered. Data can be normalized when appending it
 * to the DataSet as well.
 *
 * ## Example
 *
 * The following example shows how to use a DataSet.
 *
 * ```javascript
 * // create a DataSet
 * var options = {};
 * var data = new vis.DataSet(options);
 *
 * // add items
 * // note that the data items can contain different properties and data formats
 * data.add([
 *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
 *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
 *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
 *   {id: 4, text: 'item 4'}
 * ]);
 *
 * // subscribe to any change in the DataSet
 * data.on('*', function (event, properties, senderId) {
 *   console.log('event', event, properties);
 * });
 *
 * // update an existing item
 * data.update({id: 2, group: 1});
 *
 * // remove an item
 * data.remove(4);
 *
 * // get all ids
 * var ids = data.getIds();
 * console.log('ids', ids);
 *
 * // get a specific item
 * var item1 = data.get(1);
 * console.log('item1', item1);
 *
 * // retrieve a filtered subset of the data
 * var items = data.get({
 *   filter: function (item) {
 *     return item.group == 1;
 *   }
 * });
 * console.log('filtered items', items);
 * ```
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */
class DataSet extends DataSetPart {
    /**
     * Construct a new DataSet.
     *
     * @param data - Initial data or options.
     * @param options - Options (type error if data is also options).
     */
    constructor(data, options) {
        super();
        this._queue = null;
        // correctly read optional arguments
        if (data && !Array.isArray(data)) {
            options = data;
            data = [];
        }
        this._options = options || {};
        this._data = new Map(); // map with data indexed by id
        this.length = 0; // number of items in the DataSet
        this._idProp = this._options.fieldId || "id"; // name of the field containing id
        // add initial data when provided
        if (data && data.length) {
            this.add(data);
        }
        this.setOptions(options);
    }
    /** @inheritDoc */
    get idProp() {
        return this._idProp;
    }
    /**
     * Set new options.
     *
     * @param options - The new options.
     */
    setOptions(options) {
        if (options && options.queue !== undefined) {
            if (options.queue === false) {
                // delete queue if loaded
                if (this._queue) {
                    this._queue.destroy();
                    this._queue = null;
                }
            }
            else {
                // create queue and update its options
                if (!this._queue) {
                    this._queue = Queue.extend(this, {
                        replace: ["add", "update", "remove"],
                    });
                }
                if (options.queue && typeof options.queue === "object") {
                    this._queue.setOptions(options.queue);
                }
            }
        }
    }
    /**
     * Add a data item or an array with items.
     *
     * After the items are added to the DataSet, the DataSet will trigger an event `add`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * ## Example
     *
     * ```javascript
     * // create a DataSet
     * const data = new vis.DataSet()
     *
     * // add items
     * const ids = data.add([
     *   { id: 1, text: 'item 1' },
     *   { id: 2, text: 'item 2' },
     *   { text: 'item without an id' }
     * ])
     *
     * console.log(ids) // [1, 2, '<UUIDv4>']
     * ```
     *
     * @param data - Items to be added (ids will be generated if missing).
     * @param senderId - Sender id.
     *
     * @returns addedIds - Array with the ids (generated if not present) of the added items.
     *
     * @throws When an item with the same id as any of the added items already exists.
     */
    add(data, senderId) {
        const addedIds = [];
        let id;
        if (Array.isArray(data)) {
            // Array
            const idsToAdd = data.map((d) => d[this._idProp]);
            if (idsToAdd.some((id) => this._data.has(id))) {
                throw new Error("A duplicate id was found in the parameter array.");
            }
            for (let i = 0, len = data.length; i < len; i++) {
                id = this._addItem(data[i]);
                addedIds.push(id);
            }
        }
        else if (data && typeof data === "object") {
            // Single item
            id = this._addItem(data);
            addedIds.push(id);
        }
        else {
            throw new Error("Unknown dataType");
        }
        if (addedIds.length) {
            this._trigger("add", { items: addedIds }, senderId);
        }
        return addedIds;
    }
    /**
     * Update existing items. When an item does not exist, it will be created.
     *
     * @remarks
     * The provided properties will be merged in the existing item. When an item does not exist, it will be created.
     *
     * After the items are updated, the DataSet will trigger an event `add` for the added items, and an event `update`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * ## Example
     *
     * ```javascript
     * // create a DataSet
     * const data = new vis.DataSet([
     *   { id: 1, text: 'item 1' },
     *   { id: 2, text: 'item 2' },
     *   { id: 3, text: 'item 3' }
     * ])
     *
     * // update items
     * const ids = data.update([
     *   { id: 2, text: 'item 2 (updated)' },
     *   { id: 4, text: 'item 4 (new)' }
     * ])
     *
     * console.log(ids) // [2, 4]
     * ```
     *
     * ## Warning for TypeScript users
     * This method may introduce partial items into the data set. Use add or updateOnly instead for better type safety.
     *
     * @param data - Items to be updated (if the id is already present) or added (if the id is missing).
     * @param senderId - Sender id.
     *
     * @returns updatedIds - The ids of the added (these may be newly generated if there was no id in the item from the data) or updated items.
     *
     * @throws When the supplied data is neither an item nor an array of items.
     */
    update(data, senderId) {
        const addedIds = [];
        const updatedIds = [];
        const oldData = [];
        const updatedData = [];
        const idProp = this._idProp;
        const addOrUpdate = (item) => {
            const origId = item[idProp];
            if (origId != null && this._data.has(origId)) {
                const fullItem = item; // it has an id, therefore it is a fullitem
                const oldItem = Object.assign({}, this._data.get(origId));
                // update item
                const id = this._updateItem(fullItem);
                updatedIds.push(id);
                updatedData.push(fullItem);
                oldData.push(oldItem);
            }
            else {
                // add new item
                const id = this._addItem(item);
                addedIds.push(id);
            }
        };
        if (Array.isArray(data)) {
            // Array
            for (let i = 0, len = data.length; i < len; i++) {
                if (data[i] && typeof data[i] === "object") {
                    addOrUpdate(data[i]);
                }
                else {
                    console.warn("Ignoring input item, which is not an object at index " + i);
                }
            }
        }
        else if (data && typeof data === "object") {
            // Single item
            addOrUpdate(data);
        }
        else {
            throw new Error("Unknown dataType");
        }
        if (addedIds.length) {
            this._trigger("add", { items: addedIds }, senderId);
        }
        if (updatedIds.length) {
            const props = { items: updatedIds, oldData: oldData, data: updatedData };
            // TODO: remove deprecated property 'data' some day
            //Object.defineProperty(props, 'data', {
            //  'get': (function() {
            //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
            //    return updatedData;
            //  }).bind(this)
            //});
            this._trigger("update", props, senderId);
        }
        return addedIds.concat(updatedIds);
    }
    /**
     * Update existing items. When an item does not exist, an error will be thrown.
     *
     * @remarks
     * The provided properties will be deeply merged into the existing item.
     * When an item does not exist (id not present in the data set or absent), an error will be thrown and nothing will be changed.
     *
     * After the items are updated, the DataSet will trigger an event `update`.
     * When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * ## Example
     *
     * ```javascript
     * // create a DataSet
     * const data = new vis.DataSet([
     *   { id: 1, text: 'item 1' },
     *   { id: 2, text: 'item 2' },
     *   { id: 3, text: 'item 3' },
     * ])
     *
     * // update items
     * const ids = data.update([
     *   { id: 2, text: 'item 2 (updated)' }, // works
     *   // { id: 4, text: 'item 4 (new)' }, // would throw
     *   // { text: 'item 4 (new)' }, // would also throw
     * ])
     *
     * console.log(ids) // [2]
     * ```
     *
     * @param data - Updates (the id and optionally other props) to the items in this data set.
     * @param senderId - Sender id.
     *
     * @returns updatedIds - The ids of the updated items.
     *
     * @throws When the supplied data is neither an item nor an array of items, when the ids are missing.
     */
    updateOnly(data, senderId) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        const updateEventData = data
            .map((update) => {
            const oldData = this._data.get(update[this._idProp]);
            if (oldData == null) {
                throw new Error("Updating non-existent items is not allowed.");
            }
            return { oldData, update };
        })
            .map(({ oldData, update }) => {
            const id = oldData[this._idProp];
            const updatedData = pureDeepObjectAssign(oldData, update);
            this._data.set(id, updatedData);
            return {
                id,
                oldData: oldData,
                updatedData,
            };
        });
        if (updateEventData.length) {
            const props = {
                items: updateEventData.map((value) => value.id),
                oldData: updateEventData.map((value) => value.oldData),
                data: updateEventData.map((value) => value.updatedData),
            };
            // TODO: remove deprecated property 'data' some day
            //Object.defineProperty(props, 'data', {
            //  'get': (function() {
            //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
            //    return updatedData;
            //  }).bind(this)
            //});
            this._trigger("update", props, senderId);
            return props.items;
        }
        else {
            return [];
        }
    }
    /** @inheritDoc */
    get(first, second) {
        // @TODO: Woudn't it be better to split this into multiple methods?
        // parse the arguments
        let id = undefined;
        let ids = undefined;
        let options = undefined;
        if (isId(first)) {
            // get(id [, options])
            id = first;
            options = second;
        }
        else if (Array.isArray(first)) {
            // get(ids [, options])
            ids = first;
            options = second;
        }
        else {
            // get([, options])
            options = first;
        }
        // determine the return type
        const returnType = options && options.returnType === "Object" ? "Object" : "Array";
        // @TODO: WTF is this? Or am I missing something?
        // var returnType
        // if (options && options.returnType) {
        //   var allowedValues = ['Array', 'Object']
        //   returnType =
        //     allowedValues.indexOf(options.returnType) == -1
        //       ? 'Array'
        //       : options.returnType
        // } else {
        //   returnType = 'Array'
        // }
        // build options
        const filter = options && options.filter;
        const items = [];
        let item = undefined;
        let itemIds = undefined;
        let itemId = undefined;
        // convert items
        if (id != null) {
            // return a single item
            item = this._data.get(id);
            if (item && filter && !filter(item)) {
                item = undefined;
            }
        }
        else if (ids != null) {
            // return a subset of items
            for (let i = 0, len = ids.length; i < len; i++) {
                item = this._data.get(ids[i]);
                if (item != null && (!filter || filter(item))) {
                    items.push(item);
                }
            }
        }
        else {
            // return all items
            itemIds = [...this._data.keys()];
            for (let i = 0, len = itemIds.length; i < len; i++) {
                itemId = itemIds[i];
                item = this._data.get(itemId);
                if (item != null && (!filter || filter(item))) {
                    items.push(item);
                }
            }
        }
        // order the results
        if (options && options.order && id == undefined) {
            this._sort(items, options.order);
        }
        // filter fields of the items
        if (options && options.fields) {
            const fields = options.fields;
            if (id != undefined && item != null) {
                item = this._filterFields(item, fields);
            }
            else {
                for (let i = 0, len = items.length; i < len; i++) {
                    items[i] = this._filterFields(items[i], fields);
                }
            }
        }
        // return the results
        if (returnType == "Object") {
            const result = {};
            for (let i = 0, len = items.length; i < len; i++) {
                const resultant = items[i];
                // @TODO: Shoudn't this be this._fieldId?
                // result[resultant.id] = resultant
                const id = resultant[this._idProp];
                result[id] = resultant;
            }
            return result;
        }
        else {
            if (id != null) {
                // a single item
                return item ?? null;
            }
            else {
                // just return our array
                return items;
            }
        }
    }
    /** @inheritDoc */
    getIds(options) {
        const data = this._data;
        const filter = options && options.filter;
        const order = options && options.order;
        const itemIds = [...data.keys()];
        const ids = [];
        if (filter) {
            // get filtered items
            if (order) {
                // create ordered list
                const items = [];
                for (let i = 0, len = itemIds.length; i < len; i++) {
                    const id = itemIds[i];
                    const item = this._data.get(id);
                    if (item != null && filter(item)) {
                        items.push(item);
                    }
                }
                this._sort(items, order);
                for (let i = 0, len = items.length; i < len; i++) {
                    ids.push(items[i][this._idProp]);
                }
            }
            else {
                // create unordered list
                for (let i = 0, len = itemIds.length; i < len; i++) {
                    const id = itemIds[i];
                    const item = this._data.get(id);
                    if (item != null && filter(item)) {
                        ids.push(item[this._idProp]);
                    }
                }
            }
        }
        else {
            // get all items
            if (order) {
                // create an ordered list
                const items = [];
                for (let i = 0, len = itemIds.length; i < len; i++) {
                    const id = itemIds[i];
                    items.push(data.get(id));
                }
                this._sort(items, order);
                for (let i = 0, len = items.length; i < len; i++) {
                    ids.push(items[i][this._idProp]);
                }
            }
            else {
                // create unordered list
                for (let i = 0, len = itemIds.length; i < len; i++) {
                    const id = itemIds[i];
                    const item = data.get(id);
                    if (item != null) {
                        ids.push(item[this._idProp]);
                    }
                }
            }
        }
        return ids;
    }
    /** @inheritDoc */
    getDataSet() {
        return this;
    }
    /** @inheritDoc */
    forEach(callback, options) {
        const filter = options && options.filter;
        const data = this._data;
        const itemIds = [...data.keys()];
        if (options && options.order) {
            // execute forEach on ordered list
            const items = this.get(options);
            for (let i = 0, len = items.length; i < len; i++) {
                const item = items[i];
                const id = item[this._idProp];
                callback(item, id);
            }
        }
        else {
            // unordered
            for (let i = 0, len = itemIds.length; i < len; i++) {
                const id = itemIds[i];
                const item = this._data.get(id);
                if (item != null && (!filter || filter(item))) {
                    callback(item, id);
                }
            }
        }
    }
    /** @inheritDoc */
    map(callback, options) {
        const filter = options && options.filter;
        const mappedItems = [];
        const data = this._data;
        const itemIds = [...data.keys()];
        // convert and filter items
        for (let i = 0, len = itemIds.length; i < len; i++) {
            const id = itemIds[i];
            const item = this._data.get(id);
            if (item != null && (!filter || filter(item))) {
                mappedItems.push(callback(item, id));
            }
        }
        // order items
        if (options && options.order) {
            this._sort(mappedItems, options.order);
        }
        return mappedItems;
    }
    /**
     * Filter the fields of an item.
     *
     * @param item - The item whose fields should be filtered.
     * @param fields - The names of the fields that will be kept.
     *
     * @typeParam K - Field name type.
     *
     * @returns The item without any additional fields.
     */
    _filterFields(item, fields) {
        if (!item) {
            // item is null
            return item;
        }
        return (Array.isArray(fields)
            ? // Use the supplied array
                fields
            : // Use the keys of the supplied object
                Object.keys(fields)).reduce((filteredItem, field) => {
            filteredItem[field] = item[field];
            return filteredItem;
        }, {});
    }
    /**
     * Sort the provided array with items.
     *
     * @param items - Items to be sorted in place.
     * @param order - A field name or custom sort function.
     *
     * @typeParam T - The type of the items in the items array.
     */
    _sort(items, order) {
        if (typeof order === "string") {
            // order by provided field name
            const name = order; // field name
            items.sort((a, b) => {
                // @TODO: How to treat missing properties?
                const av = a[name];
                const bv = b[name];
                return av > bv ? 1 : av < bv ? -1 : 0;
            });
        }
        else if (typeof order === "function") {
            // order by sort function
            items.sort(order);
        }
        else {
            // TODO: extend order by an Object {field:string, direction:string}
            //       where direction can be 'asc' or 'desc'
            throw new TypeError("Order must be a function or a string");
        }
    }
    /**
     * Remove an item or multiple items by “reference” (only the id is used) or by id.
     *
     * The method ignores removal of non-existing items, and returns an array containing the ids of the items which are actually removed from the DataSet.
     *
     * After the items are removed, the DataSet will trigger an event `remove` for the removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * ## Example
     * ```javascript
     * // create a DataSet
     * const data = new vis.DataSet([
     *   { id: 1, text: 'item 1' },
     *   { id: 2, text: 'item 2' },
     *   { id: 3, text: 'item 3' }
     * ])
     *
     * // remove items
     * const ids = data.remove([2, { id: 3 }, 4])
     *
     * console.log(ids) // [2, 3]
     * ```
     *
     * @param id - One or more items or ids of items to be removed.
     * @param senderId - Sender id.
     *
     * @returns The ids of the removed items.
     */
    remove(id, senderId) {
        const removedIds = [];
        const removedItems = [];
        // force everything to be an array for simplicity
        const ids = Array.isArray(id) ? id : [id];
        for (let i = 0, len = ids.length; i < len; i++) {
            const item = this._remove(ids[i]);
            if (item) {
                const itemId = item[this._idProp];
                if (itemId != null) {
                    removedIds.push(itemId);
                    removedItems.push(item);
                }
            }
        }
        if (removedIds.length) {
            this._trigger("remove", { items: removedIds, oldData: removedItems }, senderId);
        }
        return removedIds;
    }
    /**
     * Remove an item by its id or reference.
     *
     * @param id - Id of an item or the item itself.
     *
     * @returns The removed item if removed, null otherwise.
     */
    _remove(id) {
        // @TODO: It origianlly returned the item although the docs say id.
        // The code expects the item, so probably an error in the docs.
        let ident;
        // confirm the id to use based on the args type
        if (isId(id)) {
            ident = id;
        }
        else if (id && typeof id === "object") {
            ident = id[this._idProp]; // look for the identifier field using ._idProp
        }
        // do the removing if the item is found
        if (ident != null && this._data.has(ident)) {
            const item = this._data.get(ident) || null;
            this._data.delete(ident);
            --this.length;
            return item;
        }
        return null;
    }
    /**
     * Clear the entire data set.
     *
     * After the items are removed, the [[DataSet]] will trigger an event `remove` for all removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
     *
     * @param senderId - Sender id.
     *
     * @returns removedIds - The ids of all removed items.
     */
    clear(senderId) {
        const ids = [...this._data.keys()];
        const items = [];
        for (let i = 0, len = ids.length; i < len; i++) {
            items.push(this._data.get(ids[i]));
        }
        this._data.clear();
        this.length = 0;
        this._trigger("remove", { items: ids, oldData: items }, senderId);
        return ids;
    }
    /**
     * Find the item with maximum value of a specified field.
     *
     * @param field - Name of the property that should be searched for max value.
     *
     * @returns Item containing max value, or null if no items.
     */
    max(field) {
        let max = null;
        let maxField = null;
        for (const item of this._data.values()) {
            const itemField = item[field];
            if (typeof itemField === "number" &&
                (maxField == null || itemField > maxField)) {
                max = item;
                maxField = itemField;
            }
        }
        return max || null;
    }
    /**
     * Find the item with minimum value of a specified field.
     *
     * @param field - Name of the property that should be searched for min value.
     *
     * @returns Item containing min value, or null if no items.
     */
    min(field) {
        let min = null;
        let minField = null;
        for (const item of this._data.values()) {
            const itemField = item[field];
            if (typeof itemField === "number" &&
                (minField == null || itemField < minField)) {
                min = item;
                minField = itemField;
            }
        }
        return min || null;
    }
    /**
     * Find all distinct values of a specified field
     *
     * @param prop - The property name whose distinct values should be returned.
     *
     * @returns Unordered array containing all distinct values. Items without specified property are ignored.
     */
    distinct(prop) {
        const data = this._data;
        const itemIds = [...data.keys()];
        const values = [];
        let count = 0;
        for (let i = 0, len = itemIds.length; i < len; i++) {
            const id = itemIds[i];
            const item = data.get(id);
            const value = item[prop];
            let exists = false;
            for (let j = 0; j < count; j++) {
                if (values[j] == value) {
                    exists = true;
                    break;
                }
            }
            if (!exists && value !== undefined) {
                values[count] = value;
                count++;
            }
        }
        return values;
    }
    /**
     * Add a single item. Will fail when an item with the same id already exists.
     *
     * @param item - A new item to be added.
     *
     * @returns Added item's id. An id is generated when it is not present in the item.
     */
    _addItem(item) {
        const fullItem = ensureFullItem(item, this._idProp);
        const id = fullItem[this._idProp];
        // check whether this id is already taken
        if (this._data.has(id)) {
            // item already exists
            throw new Error("Cannot add item: item with id " + id + " already exists");
        }
        this._data.set(id, fullItem);
        ++this.length;
        return id;
    }
    /**
     * Update a single item: merge with existing item.
     * Will fail when the item has no id, or when there does not exist an item with the same id.
     *
     * @param update - The new item
     *
     * @returns The id of the updated item.
     */
    _updateItem(update) {
        const id = update[this._idProp];
        if (id == null) {
            throw new Error("Cannot update item: item has no id (item: " +
                JSON.stringify(update) +
                ")");
        }
        const item = this._data.get(id);
        if (!item) {
            // item doesn't exist
            throw new Error("Cannot update item: no item with id " + id + " found");
        }
        this._data.set(id, { ...item, ...update });
        return id;
    }
    /** @inheritDoc */
    stream(ids) {
        if (ids) {
            const data = this._data;
            return new DataStream({
                *[Symbol.iterator]() {
                    for (const id of ids) {
                        const item = data.get(id);
                        if (item != null) {
                            yield [id, item];
                        }
                    }
                },
            });
        }
        else {
            return new DataStream({
                [Symbol.iterator]: this._data.entries.bind(this._data),
            });
        }
    }
}

/**
 * DataView
 *
 * A DataView offers a filtered and/or formatted view on a DataSet. One can subscribe to changes in a DataView, and easily get filtered or formatted data without having to specify filters and field types all the time.
 *
 * ## Example
 * ```javascript
 * // create a DataSet
 * var data = new vis.DataSet();
 * data.add([
 *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
 *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
 *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
 *   {id: 4, text: 'item 4'}
 * ]);
 *
 * // create a DataView
 * // the view will only contain items having a property group with value 1,
 * // and will only output fields id, text, and date.
 * var view = new vis.DataView(data, {
 *   filter: function (item) {
 *     return (item.group == 1);
 *   },
 *   fields: ['id', 'text', 'date']
 * });
 *
 * // subscribe to any change in the DataView
 * view.on('*', function (event, properties, senderId) {
 *   console.log('event', event, properties);
 * });
 *
 * // update an item in the data set
 * data.update({id: 2, group: 1});
 *
 * // get all ids in the view
 * var ids = view.getIds();
 * console.log('ids', ids); // will output [1, 2]
 *
 * // get all items in the view
 * var items = view.get();
 * ```
 *
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */
class DataView extends DataSetPart {
    /**
     * Create a DataView.
     *
     * @param data - The instance containing data (directly or indirectly).
     * @param options - Options to configure this data view.
     */
    constructor(data, options) {
        super();
        /** @inheritDoc */
        this.length = 0;
        this._ids = new Set(); // ids of the items currently in memory (just contains a boolean true)
        this._options = options || {};
        this._listener = this._onEvent.bind(this);
        this.setData(data);
    }
    /** @inheritDoc */
    get idProp() {
        return this.getDataSet().idProp;
    }
    // TODO: implement a function .config() to dynamically update things like configured filter
    // and trigger changes accordingly
    /**
     * Set a data source for the view.
     *
     * @param data - The instance containing data (directly or indirectly).
     *
     * @remarks
     * Note that when the data view is bound to a data set it won't be garbage
     * collected unless the data set is too. Use `dataView.setData(null)` or
     * `dataView.dispose()` to enable garbage collection before you lose the last
     * reference.
     */
    setData(data) {
        if (this._data) {
            // unsubscribe from current dataset
            if (this._data.off) {
                this._data.off("*", this._listener);
            }
            // trigger a remove of all items in memory
            const ids = this._data.getIds({ filter: this._options.filter });
            const items = this._data.get(ids);
            this._ids.clear();
            this.length = 0;
            this._trigger("remove", { items: ids, oldData: items });
        }
        if (data != null) {
            this._data = data;
            // trigger an add of all added items
            const ids = this._data.getIds({ filter: this._options.filter });
            for (let i = 0, len = ids.length; i < len; i++) {
                const id = ids[i];
                this._ids.add(id);
            }
            this.length = ids.length;
            this._trigger("add", { items: ids });
        }
        else {
            this._data = new DataSet();
        }
        // subscribe to new dataset
        if (this._data.on) {
            this._data.on("*", this._listener);
        }
    }
    /**
     * Refresh the DataView.
     * Useful when the DataView has a filter function containing a variable parameter.
     */
    refresh() {
        const ids = this._data.getIds({
            filter: this._options.filter,
        });
        const oldIds = [...this._ids];
        const newIds = {};
        const addedIds = [];
        const removedIds = [];
        const removedItems = [];
        // check for additions
        for (let i = 0, len = ids.length; i < len; i++) {
            const id = ids[i];
            newIds[id] = true;
            if (!this._ids.has(id)) {
                addedIds.push(id);
                this._ids.add(id);
            }
        }
        // check for removals
        for (let i = 0, len = oldIds.length; i < len; i++) {
            const id = oldIds[i];
            const item = this._data.get(id);
            if (item == null) {
                // @TODO: Investigate.
                // Doesn't happen during tests or examples.
                // Is it really impossible or could it eventually happen?
                // How to handle it if it does? The types guarantee non-nullable items.
                console.error("If you see this, report it please.");
            }
            else if (!newIds[id]) {
                removedIds.push(id);
                removedItems.push(item);
                this._ids.delete(id);
            }
        }
        this.length += addedIds.length - removedIds.length;
        // trigger events
        if (addedIds.length) {
            this._trigger("add", { items: addedIds });
        }
        if (removedIds.length) {
            this._trigger("remove", { items: removedIds, oldData: removedItems });
        }
    }
    /** @inheritDoc */
    get(first, second) {
        if (this._data == null) {
            return null;
        }
        // parse the arguments
        let ids = null;
        let options;
        if (isId(first) || Array.isArray(first)) {
            ids = first;
            options = second;
        }
        else {
            options = first;
        }
        // extend the options with the default options and provided options
        const viewOptions = Object.assign({}, this._options, options);
        // create a combined filter method when needed
        const thisFilter = this._options.filter;
        const optionsFilter = options && options.filter;
        if (thisFilter && optionsFilter) {
            viewOptions.filter = (item) => {
                return thisFilter(item) && optionsFilter(item);
            };
        }
        if (ids == null) {
            return this._data.get(viewOptions);
        }
        else {
            return this._data.get(ids, viewOptions);
        }
    }
    /** @inheritDoc */
    getIds(options) {
        if (this._data.length) {
            const defaultFilter = this._options.filter;
            const optionsFilter = options != null ? options.filter : null;
            let filter;
            if (optionsFilter) {
                if (defaultFilter) {
                    filter = (item) => {
                        return defaultFilter(item) && optionsFilter(item);
                    };
                }
                else {
                    filter = optionsFilter;
                }
            }
            else {
                filter = defaultFilter;
            }
            return this._data.getIds({
                filter: filter,
                order: options && options.order,
            });
        }
        else {
            return [];
        }
    }
    /** @inheritDoc */
    forEach(callback, options) {
        if (this._data) {
            const defaultFilter = this._options.filter;
            const optionsFilter = options && options.filter;
            let filter;
            if (optionsFilter) {
                if (defaultFilter) {
                    filter = function (item) {
                        return defaultFilter(item) && optionsFilter(item);
                    };
                }
                else {
                    filter = optionsFilter;
                }
            }
            else {
                filter = defaultFilter;
            }
            this._data.forEach(callback, {
                filter: filter,
                order: options && options.order,
            });
        }
    }
    /** @inheritDoc */
    map(callback, options) {
        if (this._data) {
            const defaultFilter = this._options.filter;
            const optionsFilter = options && options.filter;
            let filter;
            if (optionsFilter) {
                if (defaultFilter) {
                    filter = (item) => {
                        return defaultFilter(item) && optionsFilter(item);
                    };
                }
                else {
                    filter = optionsFilter;
                }
            }
            else {
                filter = defaultFilter;
            }
            return this._data.map(callback, {
                filter: filter,
                order: options && options.order,
            });
        }
        else {
            return [];
        }
    }
    /** @inheritDoc */
    getDataSet() {
        return this._data.getDataSet();
    }
    /** @inheritDoc */
    stream(ids) {
        return this._data.stream(ids || {
            [Symbol.iterator]: this._ids.keys.bind(this._ids),
        });
    }
    /**
     * Render the instance unusable prior to garbage collection.
     *
     * @remarks
     * The intention of this method is to help discover scenarios where the data
     * view is being used when the programmer thinks it has been garbage collected
     * already. It's stricter version of `dataView.setData(null)`.
     */
    dispose() {
        if (this._data?.off) {
            this._data.off("*", this._listener);
        }
        const message = "This data view has already been disposed of.";
        const replacement = {
            get: () => {
                throw new Error(message);
            },
            set: () => {
                throw new Error(message);
            },
            configurable: false,
        };
        for (const key of Reflect.ownKeys(DataView.prototype)) {
            Object.defineProperty(this, key, replacement);
        }
    }
    /**
     * Event listener. Will propagate all events from the connected data set to the subscribers of the DataView, but will filter the items and only trigger when there are changes in the filtered data set.
     *
     * @param event - The name of the event.
     * @param params - Parameters of the event.
     * @param senderId - Id supplied by the sender.
     */
    _onEvent(event, params, senderId) {
        if (!params || !params.items || !this._data) {
            return;
        }
        const ids = params.items;
        const addedIds = [];
        const updatedIds = [];
        const removedIds = [];
        const oldItems = [];
        const updatedItems = [];
        const removedItems = [];
        switch (event) {
            case "add":
                // filter the ids of the added items
                for (let i = 0, len = ids.length; i < len; i++) {
                    const id = ids[i];
                    const item = this.get(id);
                    if (item) {
                        this._ids.add(id);
                        addedIds.push(id);
                    }
                }
                break;
            case "update":
                // determine the event from the views viewpoint: an updated
                // item can be added, updated, or removed from this view.
                for (let i = 0, len = ids.length; i < len; i++) {
                    const id = ids[i];
                    const item = this.get(id);
                    if (item) {
                        if (this._ids.has(id)) {
                            updatedIds.push(id);
                            updatedItems.push(params.data[i]);
                            oldItems.push(params.oldData[i]);
                        }
                        else {
                            this._ids.add(id);
                            addedIds.push(id);
                        }
                    }
                    else {
                        if (this._ids.has(id)) {
                            this._ids.delete(id);
                            removedIds.push(id);
                            removedItems.push(params.oldData[i]);
                        }
                    }
                }
                break;
            case "remove":
                // filter the ids of the removed items
                for (let i = 0, len = ids.length; i < len; i++) {
                    const id = ids[i];
                    if (this._ids.has(id)) {
                        this._ids.delete(id);
                        removedIds.push(id);
                        removedItems.push(params.oldData[i]);
                    }
                }
                break;
        }
        this.length += addedIds.length - removedIds.length;
        if (addedIds.length) {
            this._trigger("add", { items: addedIds }, senderId);
        }
        if (updatedIds.length) {
            this._trigger("update", { items: updatedIds, oldData: oldItems, data: updatedItems }, senderId);
        }
        if (removedIds.length) {
            this._trigger("remove", { items: removedIds, oldData: removedItems }, senderId);
        }
    }
}

/**
 * Check that given value is compatible with Vis Data Set interface.
 *
 * @param idProp - The expected property to contain item id.
 * @param v - The value to be tested.
 *
 * @returns True if all expected values and methods match, false otherwise.
 */
function isDataSetLike(idProp, v) {
    return (typeof v === "object" &&
        v !== null &&
        idProp === v.idProp &&
        typeof v.add === "function" &&
        typeof v.clear === "function" &&
        typeof v.distinct === "function" &&
        typeof v.forEach === "function" &&
        typeof v.get === "function" &&
        typeof v.getDataSet === "function" &&
        typeof v.getIds === "function" &&
        typeof v.length === "number" &&
        typeof v.map === "function" &&
        typeof v.max === "function" &&
        typeof v.min === "function" &&
        typeof v.off === "function" &&
        typeof v.on === "function" &&
        typeof v.remove === "function" &&
        typeof v.setOptions === "function" &&
        typeof v.stream === "function" &&
        typeof v.update === "function" &&
        typeof v.updateOnly === "function");
}

/**
 * Check that given value is compatible with Vis Data View interface.
 *
 * @param idProp - The expected property to contain item id.
 * @param v - The value to be tested.
 *
 * @returns True if all expected values and methods match, false otherwise.
 */
function isDataViewLike(idProp, v) {
    return (typeof v === "object" &&
        v !== null &&
        idProp === v.idProp &&
        typeof v.forEach === "function" &&
        typeof v.get === "function" &&
        typeof v.getDataSet === "function" &&
        typeof v.getIds === "function" &&
        typeof v.length === "number" &&
        typeof v.map === "function" &&
        typeof v.off === "function" &&
        typeof v.on === "function" &&
        typeof v.stream === "function" &&
        isDataSetLike(idProp, v.getDataSet()));
}

export { DataSet, DataStream, DataView, Queue, createNewDataPipeFrom, isDataSetLike, isDataViewLike };
//# sourceMappingURL=vis-data.js.map
