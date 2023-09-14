import { TypedArray, DType } from './types';
export declare function getrf(dtype: DType, m: number, n: number, x: TypedArray, ldx: number, ipiv: Int32Array): any;
export declare function getri(dtype: DType, n: number, x: TypedArray, ldx: number, ipiv: Int32Array): any;
export declare function gesv(dtype: DType, n: number, nrhs: number, x: TypedArray, ldx: number, ipiv: Int32Array, y: TypedArray, ldy: number): any;
