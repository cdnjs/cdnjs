export default LinkedList;
export type Item = {
    /**
     * Previous.
     */
    prev?: Item | undefined;
    /**
     * Next.
     */
    next?: Item | undefined;
    /**
     * Data.
     */
    data: unknown;
};
/**
 * @module ol/structs/LinkedList
 */
/**
 * @typedef {Object} Item
 * @property {Item} [prev] Previous.
 * @property {Item} [next] Next.
 * @property {?} data Data.
 */
/**
 * @classdesc
 * Creates an empty linked list structure.
 */
declare class LinkedList {
    /**
     * @param {boolean} [opt_circular] The last item is connected to the first one,
     * and the first item to the last one. Default is true.
     */
    constructor(opt_circular?: boolean | undefined);
    /**
     * @private
     * @type {Item|undefined}
     */
    private first_;
    /**
     * @private
     * @type {Item|undefined}
     */
    private last_;
    /**
     * @private
     * @type {Item|undefined}
     */
    private head_;
    /**
     * @private
     * @type {boolean}
     */
    private circular_;
    /**
     * @private
     * @type {number}
     */
    private length_;
    /**
     * Inserts an item into the linked list right after the current one.
     *
     * @param {?} data Item data.
     */
    insertItem(data: unknown): void;
    /**
     * Removes the current item from the list. Sets the cursor to the next item,
     * if possible.
     */
    removeItem(): void;
    /**
     * Sets the cursor to the first item, and returns the associated data.
     *
     * @return {?} Item data.
     */
    firstItem(): unknown;
    /**
     * Sets the cursor to the last item, and returns the associated data.
     *
     * @return {?} Item data.
     */
    lastItem(): unknown;
    /**
     * Sets the cursor to the next item, and returns the associated data.
     *
     * @return {?} Item data.
     */
    nextItem(): unknown;
    /**
     * Returns the next item's data without moving the cursor.
     *
     * @return {?} Item data.
     */
    getNextItem(): unknown;
    /**
     * Sets the cursor to the previous item, and returns the associated data.
     *
     * @return {?} Item data.
     */
    prevItem(): unknown;
    /**
     * Returns the previous item's data without moving the cursor.
     *
     * @return {?} Item data.
     */
    getPrevItem(): unknown;
    /**
     * Returns the current item's data.
     *
     * @return {?} Item data.
     */
    getCurrItem(): unknown;
    /**
     * Sets the first item of the list. This only works for circular lists, and sets
     * the last item accordingly.
     */
    setFirstItem(): void;
    /**
     * Concatenates two lists.
     * @param {LinkedList} list List to merge into the current list.
     */
    concat(list: LinkedList): void;
    /**
     * Returns the current length of the list.
     *
     * @return {number} Length.
     */
    getLength(): number;
}
//# sourceMappingURL=LinkedList.d.ts.map