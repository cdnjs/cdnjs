import { DType, INDArray, TypedArray } from '../types';
import { default as abs } from './abs';
import { default as acos } from './acos';
import { default as acosh } from './acosh';
import { default as add } from './add';
import { default as angle } from './angle';
import { default as asin } from './asin';
import { default as asinh } from './asinh';
import { default as atan } from './atan';
import { default as atanh } from './atanh';
import { default as augment } from './augment';
import { default as binOp } from './binOp';
import { default as cbrt } from './cbrt';
import { default as ceil } from './ceil';
import { default as check } from './check';
import { default as combine } from './combine';
import { default as copy } from './copy';
import { default as cos } from './cos';
import { default as cosh } from './cosh';
import { default as cross } from './cross';
import { default as det } from './det';
import { default as diagonal } from './diagonal';
import { default as dot } from './dot';
import { default as eig } from './eig';
import { default as equals } from './equals';
import { default as equidimensional } from './equidimensional';
import { default as equilateral } from './equilateral';
import { default as exp } from './exp';
import { default as expm1 } from './expm1';
import { default as fill } from './fill';
import { default as floor } from './floor';
import { default as forEach } from './forEach';
import { default as fround } from './fround';
import { default as gauss } from './gauss';
import { default as get } from './get';
import { default as inv } from './inv';
import { default as log } from './log';
import { default as log10 } from './log10';
import { default as log1p } from './log1p';
import { default as log2 } from './log2';
import { default as lu } from './lu';
import { default as lu_factor } from './lu_factor';
import { default as map } from './map';
import { default as max } from './max';
import { default as mean } from './mean';
import { default as min } from './min';
import { default as multiply } from './multiply';
import { default as norm } from './norm';
import { default as normalize } from './normalize';
import { default as pow } from './pow';
import { default as prod } from './prod';
import { default as product } from './product';
import { default as project } from './project';
import { default as push } from './push';
import { default as rank } from './rank';
import { default as reciprocal } from './reciprocal';
import { default as reduce } from './reduce';
import { default as reshape } from './reshape';
import { default as round } from './round';
import { default as row_add } from './row_add';
import { default as scale } from './scale';
import { default as set } from './set';
import { default as sign } from './sign';
import { default as sin } from './sin';
import { default as sinh } from './sinh';
import { default as slice } from './slice';
import { default as solve } from './solve';
import { default as sqrt } from './sqrt';
import { default as square } from './square';
import { default as subtract } from './subtract';
import { default as sum } from './sum';
import { default as swap } from './swap';
import { default as tan } from './tan';
import { default as tanh } from './tanh';
import { default as toArray } from './toArray';
import { default as toString } from './toString';
import { default as trace } from './trace';
import { default as transpose } from './transpose';
import { default as trunc } from './trunc';
declare const inspectSymbol: unique symbol;
/**
 * @class NDArray
 * @description Constructs or copies an NDArray instance.
 * @param data
 * @param {Object} [options]
 * @param {Number[]} [options.shape]
 * @param {Number} [options.length]
 * @param {Number[]} [options.strides]
 * @param {string} [options.dtype]
 * @example
 * import { NDArray } from 'vectorious';
 *
 * new NDArray() // => array([], dtype=float64)
 * new NDArray([]) // => array([], dtype=float64)
 * new NDArray([1, 2, 3]) // => array([1, 2, 3], dtype=float64)
 * new NDArray([[1, 2], [3, 4]]) // => array([ [ 1, 2 ], [ 3, 4 ] ], dtype=float64)
 * new NDArray(new Int32Array([1, 2, 3])) // => array([ 1, 2, 3 ], dtype=int32)
 * new NDArray([1, 2, 3, 4], {
 *   shape: [2, 2],
 *   dtype: 'uint32'
 * }) // => array([ [ 1, 2 ], [ 3, 4 ] ], dtype=uint32)
 */
export declare class NDArray implements INDArray {
    /**
     * @name data
     * @memberof NDArray.prototype
     * @type TypedArray
     * @default new Float64Array(0)
     */
    data: TypedArray;
    /**
     * @name dtype
     * @memberof NDArray.prototype
     * @type String
     * @default 'float64'
     */
    dtype: DType;
    /**
     * @name length
     * @memberof NDArray.prototype
     * @type Number
     * @default 0
     */
    length: number;
    /**
     * @name shape
     * @memberof NDArray.prototype
     * @type Number[]
     * @default [0]
     */
    shape: number[];
    /**
     * @name strides
     * @memberof NDArray.prototype
     * @type Number[]
     * @default [0]
     */
    strides: number[];
    [inspectSymbol]: () => string;
    abs: typeof abs;
    acos: typeof acos;
    acosh: typeof acosh;
    add: typeof add;
    angle: typeof angle;
    asin: typeof asin;
    asinh: typeof asinh;
    atan: typeof atan;
    atanh: typeof atanh;
    augment: typeof augment;
    binOp: typeof binOp;
    cbrt: typeof cbrt;
    ceil: typeof ceil;
    check: typeof check;
    combine: typeof combine;
    copy: typeof copy;
    cos: typeof cos;
    cosh: typeof cosh;
    cross: typeof cross;
    det: typeof det;
    diagonal: typeof diagonal;
    dot: typeof dot;
    eig: typeof eig;
    equals: typeof equals;
    equidimensional: typeof equidimensional;
    equilateral: typeof equilateral;
    exp: typeof exp;
    expm1: typeof expm1;
    fill: typeof fill;
    floor: typeof floor;
    forEach: typeof forEach;
    fround: typeof fround;
    gauss: typeof gauss;
    get: typeof get;
    inv: typeof inv;
    log: typeof log;
    log10: typeof log10;
    log1p: typeof log1p;
    log2: typeof log2;
    lu: typeof lu;
    lu_factor: typeof lu_factor;
    map: typeof map;
    max: typeof max;
    mean: typeof mean;
    min: typeof min;
    multiply: typeof multiply;
    norm: typeof norm;
    normalize: typeof normalize;
    pow: typeof pow;
    prod: typeof prod;
    product: typeof product;
    project: typeof project;
    push: typeof push;
    rank: typeof rank;
    reciprocal: typeof reciprocal;
    reduce: typeof reduce;
    reshape: typeof reshape;
    round: typeof round;
    row_add: typeof row_add;
    scale: typeof scale;
    set: typeof set;
    sign: typeof sign;
    sin: typeof sin;
    sinh: typeof sinh;
    slice: typeof slice;
    solve: typeof solve;
    sqrt: typeof sqrt;
    square: typeof square;
    subtract: typeof subtract;
    sum: typeof sum;
    swap: typeof swap;
    tan: typeof tan;
    tanh: typeof tanh;
    toArray: typeof toArray;
    toString: typeof toString;
    trace: typeof trace;
    transpose: typeof transpose;
    trunc: typeof trunc;
    constructor(data?: any, options?: {
        shape?: number[];
        length?: number;
        strides?: number[];
        dtype?: DType;
    });
    /**
     * @name x
     * @memberof NDArray.prototype
     * @description Gets or sets the value at index 0
     * @type Number
     */
    get x(): number;
    set x(value: number);
    /**
     * @name y
     * @memberof NDArray.prototype
     * @description Gets or sets the value at index 1
     * @type Number
     */
    get y(): number;
    set y(value: number);
    /**
     * @name z
     * @memberof NDArray.prototype
     * @description Gets or sets the value at index 2
     * @type Number
     */
    get z(): number;
    set z(value: number);
    /**
     * @name w
     * @memberof NDArray.prototype
     * @description Gets or sets the value at index 3
     * @type Number
     */
    get w(): number;
    set w(value: number);
    /**
     * @name T
     * @memberof NDArray.prototype
     * @description Short for this.copy().transpose()
     * @type NDArray
     */
    get T(): NDArray;
}
export { abs } from './abs';
export { acos } from './acos';
export { acosh } from './acosh';
export { add } from './add';
export { angle } from './angle';
export { array } from './array';
export { asin } from './asin';
export { asinh } from './asinh';
export { atan } from './atan';
export { atanh } from './atanh';
export { augment } from './augment';
export { binOp } from './binOp';
export { cbrt } from './cbrt';
export { ceil } from './ceil';
export { check } from './check';
export { combine } from './combine';
export { copy } from './copy';
export { cos } from './cos';
export { cosh } from './cosh';
export { cross } from './cross';
export { det } from './det';
export { diagonal } from './diagonal';
export { dot } from './dot';
export { eig } from './eig';
export { equals } from './equals';
export { equidimensional } from './equidimensional';
export { equilateral } from './equilateral';
export { exp } from './exp';
export { expm1 } from './expm1';
export { eye } from './eye';
export { fill } from './fill';
export { floor } from './floor';
export { forEach } from './forEach';
export { fround } from './fround';
export { gauss } from './gauss';
export { get } from './get';
export { inv } from './inv';
export { log } from './log';
export { log10 } from './log10';
export { log1p } from './log1p';
export { log2 } from './log2';
export { lu } from './lu';
export { lu_factor } from './lu_factor';
export { magic } from './magic';
export { map } from './map';
export { matrix } from './matrix';
export { max } from './max';
export { mean } from './mean';
export { min } from './min';
export { multiply } from './multiply';
export { norm } from './norm';
export { normalize } from './normalize';
export { ones } from './ones';
export { pow } from './pow';
export { prod } from './prod';
export { product } from './product';
export { project } from './project';
export { push } from './push';
export { random } from './random';
export { range } from './range';
export { rank } from './rank';
export { reciprocal } from './reciprocal';
export { reduce } from './reduce';
export { reshape } from './reshape';
export { round } from './round';
export { row_add } from './row_add';
export { scale } from './scale';
export { set } from './set';
export { sign } from './sign';
export { sin } from './sin';
export { sinh } from './sinh';
export { slice } from './slice';
export { solve } from './solve';
export { sqrt } from './sqrt';
export { square } from './square';
export { subtract } from './subtract';
export { sum } from './sum';
export { swap } from './swap';
export { tan } from './tan';
export { tanh } from './tanh';
export { toArray } from './toArray';
export { toString } from './toString';
export { trace } from './trace';
export { transpose } from './transpose';
export { trunc } from './trunc';
export { zeros } from './zeros';
