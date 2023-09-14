import { NDArray } from '..';
/**
 * @class NDIter
 * @description Constructs an NDIter instance.
 * @param {NDArray} x
 */
export declare class NDIter implements Iterator<number[]> {
    /**
     * @name x
     * @memberof NDIter.prototype
     * @type NDArray
     */
    x: NDArray;
    /**
     * @name shape
     * @memberof NDIter.prototype
     * @type Number[]
     */
    shape: number[];
    /**
     * @name shapem1
     * @memberof NDIter.prototype
     * @type Number[]
     */
    shapem1: number[];
    /**
     * @name strides
     * @memberof NDIter.prototype
     * @type Number[]
     */
    strides: number[];
    /**
     * @name backstrides
     * @memberof NDIter.prototype
     * @type Number[]
     */
    backstrides: number[];
    /**
     * @name length
     * @memberof NDIter.prototype
     * @type Number
     */
    length: number;
    /**
     * @name lengthm1
     * @memberof NDIter.prototype
     * @type Number
     */
    lengthm1: number;
    /**
     * @name nd
     * @memberof NDIter.prototype
     * @type Number
     */
    nd: number;
    /**
     * @name ndm1
     * @memberof NDIter.prototype
     * @type Number
     */
    ndm1: number;
    /**
     * @name index
     * @memberof NDIter.prototype
     * @type Number
     */
    index: number;
    /**
     * @name coords
     * @memberof NDIter.prototype
     * @type Number[]
     */
    coords: number[];
    /**
     * @name pos
     * @memberof NDIter.prototype
     * @type Number
     */
    pos: number;
    /**
     * @name factors
     * @memberof NDIter.prototype
     * @type Number[]
     */
    factors: number[];
    constructor(x: NDArray | ArrayLike<any>);
    /**
     * @function done
     * @memberof NDIter.prototype
     * @description Returns true if the iterator is done, false otherwise
     * @returns {Boolean}
     * @example
     * import { array } from 'vectorious/core/array';
     * import { NDIter } from 'vectorious/iterator';
     *
     * const iter = new NDIter(array([1, 2, 3]));
     * iter.done(); // false
     */
    done(): boolean;
    /**
     * @function current
     * @memberof NDIter.prototype
     * @description Returns the current element of the iterator
     * @returns {Object} current
     * @returns {Number} [current.value]
     * @returns {Boolean} current.done
     * @example
     * import { array } from 'vectorious/core/array';
     * import { NDIter } from 'vectorious/iterator';
     *
     * const iter = new NDIter(array([1, 2, 3]));
     * iter.current(); // { value: 1, done: false }
     */
    current(): IteratorResult<number[] | any>;
    /**
     * @function next
     * @memberof NDIter.prototype
     * @description
     * Steps to the next position in the iterator.
     * Returns the current index of the iterator, or undefined if done.
     * @returns {Object}
     * @example
     * import { array } from 'vectorious/core/array';
     * import { NDIter } from 'vectorious/iterator';
     *
     * const iter = new NDIter(array([1, 2, 3]));
     * iter.next(); // { value: 2, done: false }
     * iter.next(); // { value: 3, done: false }
     * iter.next(); // { done: true }
     */
    next(): IteratorReturnResult<any> | IteratorYieldResult<any>;
    [Symbol.iterator](): this;
}
