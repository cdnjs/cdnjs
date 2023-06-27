export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
export type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Uint8ClampedArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export type DType = 'int8' | 'uint8' | 'int16' | 'uint16' | 'int32' | 'uint32' | 'uint8c' | 'float32' | 'float64' | 'complex64' | 'complex128';
export interface INDArray {
    data: TypedArray;
    dtype: DType;
    length: number;
    shape: number[];
    strides: number[];
}
