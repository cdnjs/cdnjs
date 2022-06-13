import { DType, TypedArray, TypedArrayConstructor } from './types';
export declare const flatten: (array: any[]) => number[];
export declare const is_typed_array: (array: any) => boolean;
export declare const get_length: (shape: number[]) => number;
export declare const get_shape: (array: any) => number[];
export declare const get_strides: (shape: number[]) => number[];
export declare const get_dtype: (array: TypedArray) => DType;
export declare const get_type: (dtype: DType) => TypedArrayConstructor;
