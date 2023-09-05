/**
 * @type {number}
 */
export const DROP: number;
export default PriorityQueue;
/**
 * @classdesc
 * Priority queue.
 *
 * The implementation is inspired from the Closure Library's Heap class and
 * Python's heapq module.
 *
 * See https://github.com/google/closure-library/blob/master/closure/goog/structs/heap.js
 * and https://hg.python.org/cpython/file/2.7/Lib/heapq.py.
 *
 * @template T
 */
declare class PriorityQueue<T> {
    /**
     * @param {function(T): number} priorityFunction Priority function.
     * @param {function(T): string} keyFunction Key function.
     */
    constructor(priorityFunction: (arg0: T) => number, keyFunction: (arg0: T) => string);
    /**
     * @type {function(T): number}
     * @private
     */
    private priorityFunction_;
    /**
     * @type {function(T): string}
     * @private
     */
    private keyFunction_;
    /**
     * @type {Array<T>}
     * @private
     */
    private elements_;
    /**
     * @type {Array<number>}
     * @private
     */
    private priorities_;
    /**
     * @type {!Object<string, boolean>}
     * @private
     */
    private queuedElements_;
    /**
     * FIXME empty description for jsdoc
     */
    clear(): void;
    /**
     * Remove and return the highest-priority element. O(log N).
     * @return {T} Element.
     */
    dequeue(): T;
    /**
     * Enqueue an element. O(log N).
     * @param {T} element Element.
     * @return {boolean} The element was added to the queue.
     */
    enqueue(element: T): boolean;
    /**
     * @return {number} Count.
     */
    getCount(): number;
    /**
     * Gets the index of the left child of the node at the given index.
     * @param {number} index The index of the node to get the left child for.
     * @return {number} The index of the left child.
     * @private
     */
    private getLeftChildIndex_;
    /**
     * Gets the index of the right child of the node at the given index.
     * @param {number} index The index of the node to get the right child for.
     * @return {number} The index of the right child.
     * @private
     */
    private getRightChildIndex_;
    /**
     * Gets the index of the parent of the node at the given index.
     * @param {number} index The index of the node to get the parent for.
     * @return {number} The index of the parent.
     * @private
     */
    private getParentIndex_;
    /**
     * Make this a heap. O(N).
     * @private
     */
    private heapify_;
    /**
     * @return {boolean} Is empty.
     */
    isEmpty(): boolean;
    /**
     * @param {string} key Key.
     * @return {boolean} Is key queued.
     */
    isKeyQueued(key: string): boolean;
    /**
     * @param {T} element Element.
     * @return {boolean} Is queued.
     */
    isQueued(element: T): boolean;
    /**
     * @param {number} index The index of the node to move down.
     * @private
     */
    private siftUp_;
    /**
     * @param {number} startIndex The index of the root.
     * @param {number} index The index of the node to move up.
     * @private
     */
    private siftDown_;
    /**
     * FIXME empty description for jsdoc
     */
    reprioritize(): void;
}
//# sourceMappingURL=PriorityQueue.d.ts.map