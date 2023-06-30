import { NDArray } from '..';
import { NDIter } from './single';
/**
 * @class NDMultiIter
 * @description Constructs an NDMultiIter instance.
 * @param {NDArray[]} ...args
 */
export declare class NDMultiIter implements Iterator<number[]> {
    /**
     * @name iters
     * @memberof NDMultiIter.prototype
     * @type NDIter[]
     */
    iters: NDIter[];
    /**
     * @name shape
     * @memberof NDMultiIter.prototype
     * @type Number[]
     */
    shape: number[];
    /**
     * @name nd
     * @memberof NDMultiIter.prototype
     * @type Number
     */
    nd: number;
    /**
     * @name length
     * @memberof NDMultiIter.prototype
     * @type Number
     */
    length: number;
    /**
     * @name lengthm1
     * @memberof NDMultiIter.prototype
     * @type Number
     */
    lengthm1: number;
    /**
     * @name numiter
     * @memberof NDMultiIter.prototype
     * @type Number
     */
    numiter: number;
    /**
     * @name index
     * @memberof NDMultiIter.prototype
     * @type Number
     */
    index: number;
    /**
     * @name pos
     * @memberof NDMultiIter.prototype
     * @type Number[]
     */
    pos: number[];
    constructor(...args: (NDArray | ArrayLike<any>)[]);
    /**
     * @function done
     * @memberof NDMultiIter
     * @description Returns true if the iterator is done, false otherwise
     * @returns {Boolean}
     * @example
     * import { array } from 'vectorious/core/array';
     * import { NDMultiIter } from 'vectorious/iterator';
     *
     * const iter = new NDMultiIter(array([1, 2, 3]), array([4, 5, 6]));
     * iter.done(); // false
     */
    done(): boolean;
    /**
     * @function current
     * @memberof NDMultiIter
     * @description Returns the current indices of the iterators
     * @returns {Object} current
     * @returns {Number[]} [current.value]
     * @returns {Boolean} current.done
     * @example
     * import { array } from 'vectorious/core/array';
     * import { NDMultiIter } from 'vectorious/iterator';
     *
     * const iter = new NDMultiIter(array([1, 2, 3]), array([4, 5, 6]));
     * iter.current(); // { value: [0, 0], done: false }
     */
    current(): IteratorResult<number[] | any>;
    /**
     * @function next
     * @memberof NDMultiIter
     * @description
     * Steps to the next position in the iterator.
     * Returns the current indices of the iterators, or undefined if done.
     * @returns {Object} current
     * @returns {Number[]} [current.value]
     * @returns {Boolean} current.done
     * @example
     * import { array } from 'vectorious/core/array';
     * import { NDMultiIter } from 'vectorious/iterator';
     *
     * const iter = new NDMultiIter(array([1, 2, 3]), array([4, 5, 6]));
     * iter.next(); // { value: [0, 0], done: false }
     * iter.next(); // { value: [1, 1], done: false }
     * iter.next(); // { value: [2, 2], done: false },
     * iter.next(); // { value: undefined, done: true },
     */
    next(): IteratorResult<any, any>;
    [Symbol.iterator](): this;
}
