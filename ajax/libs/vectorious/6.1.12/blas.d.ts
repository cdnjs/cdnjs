import { TypedArray, DType } from './types';
export declare const NoTrans: any;
export declare const Trans: any;
export declare function axpy(dtype: DType, n: number, alpha: number, x: TypedArray, inc_x: number, y: TypedArray, inc_y: number): any;
export declare function dot(dtype: DType, n: number, x: TypedArray, inc_x: number, y: TypedArray, inc_y: number): any;
export declare function iamax(dtype: DType, n: number, x: TypedArray, inc_x: number): any;
export declare function gemm(dtype: DType, transx: number, transy: number, m: number, n: number, k: number, alpha: number, x: TypedArray, ldx: number, y: TypedArray, ldy: number, beta: number, z: TypedArray, ldz: number): any;
export declare function nrm2(dtype: DType, n: number, x: TypedArray, inc_x: number): any;
export declare function scal(dtype: DType, n: number, alpha: number, x: TypedArray, inc_x: number): any;
