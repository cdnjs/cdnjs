import { NDArray } from '../';
export declare const V_MAXDIMS = 32;
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
    /**
     * @name contiguous
     * @memberof NDIter.prototype
     * @type Boolean
     */
    contiguous: boolean;
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
     * @function next1d
     * @memberof NDIter.prototype
     * @description Steps to the next position in the iterator, assuming it is 1 dimensional.
     */
    next1d(): void;
    /**
     * @function nextcontiguous
     * @memberof NDIter.prototype
     * @description Steps to the next position in the iterator, assuming its data is contiguous.
     */
    nextcontiguous(): void;
    /**
     * @function next2d
     * @memberof NDIter.prototype
     * @description Steps to the next position in the iterator, assuming it is 2 dimensional.
     */
    next2d(): void;
    /**
     * @function next2d
     * @memberof NDIter.prototype
     * @description Steps to the next position in the iterator
     */
    nextnd(): void;
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
    next(): IteratorResult<any, any>;
    [Symbol.iterator](): this;
}
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
