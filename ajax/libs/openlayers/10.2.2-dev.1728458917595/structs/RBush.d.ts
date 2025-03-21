export default RBush;
export type Entry<T> = import("rbush").BBox & {
    value: T;
};
/**
 * @typedef {import("rbush").BBox & {value: T}} Entry
 * @template T
 */
/**
 * @classdesc
 * Wrapper around the RBush by Vladimir Agafonkin.
 * See https://github.com/mourner/rbush.
 *
 * @template {Object} T
 */
declare class RBush<T extends unknown> {
    /**
     * @param {number} [maxEntries] Max entries.
     */
    constructor(maxEntries?: number | undefined);
    /**
     * @private
     * @type {RBush_<Entry<T>>}
     */
    private rbush_;
    /**
     * A mapping between the objects added to this rbush wrapper
     * and the objects that are actually added to the internal rbush.
     * @private
     * @type {Object<string, Entry<T>>}
     */
    private items_;
    /**
     * Insert a value into the RBush.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {T} value Value.
     */
    insert(extent: import("../extent.js").Extent, value: T): void;
    /**
     * Bulk-insert values into the RBush.
     * @param {Array<import("../extent.js").Extent>} extents Extents.
     * @param {Array<T>} values Values.
     */
    load(extents: Array<import("../extent.js").Extent>, values: Array<T>): void;
    /**
     * Remove a value from the RBush.
     * @param {T} value Value.
     * @return {boolean} Removed.
     */
    remove(value: T): boolean;
    /**
     * Update the extent of a value in the RBush.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {T} value Value.
     */
    update(extent: import("../extent.js").Extent, value: T): void;
    /**
     * Return all values in the RBush.
     * @return {Array<T>} All.
     */
    getAll(): Array<T>;
    /**
     * Return all values in the given extent.
     * @param {import("../extent.js").Extent} extent Extent.
     * @return {Array<T>} All in extent.
     */
    getInExtent(extent: import("../extent.js").Extent): Array<T>;
    /**
     * Calls a callback function with each value in the tree.
     * If the callback returns a truthy value, this value is returned without
     * checking the rest of the tree.
     * @param {function(T): *} callback Callback.
     * @return {*} Callback return value.
     */
    forEach(callback: (arg0: T) => any): any;
    /**
     * Calls a callback function with each value in the provided extent.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {function(T): *} callback Callback.
     * @return {*} Callback return value.
     */
    forEachInExtent(extent: import("../extent.js").Extent, callback: (arg0: T) => any): any;
    /**
     * @param {Array<T>} values Values.
     * @param {function(T): *} callback Callback.
     * @private
     * @return {*} Callback return value.
     */
    private forEach_;
    /**
     * @return {boolean} Is empty.
     */
    isEmpty(): boolean;
    /**
     * Remove all values from the RBush.
     */
    clear(): void;
    /**
     * @param {import("../extent.js").Extent} [extent] Extent.
     * @return {import("../extent.js").Extent} Extent.
     */
    getExtent(extent?: import("../extent.js").Extent | undefined): import("../extent.js").Extent;
    /**
     * @param {RBush<T>} rbush R-Tree.
     */
    concat(rbush: RBush<T>): void;
}
//# sourceMappingURL=RBush.d.ts.map