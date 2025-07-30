export type TypedIntArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array;
export type TypedFloatArray = Float32Array | Float64Array;
export declare const VERSION = "0.3.0";
export type Encoding = Encoding.ByteArray | Encoding.FixedPoint | Encoding.RunLength | Encoding.Delta | Encoding.IntervalQuantization | Encoding.IntegerPacking | Encoding.StringArray;
export interface EncodedDataBlock {
    header: string;
    categories: EncodedCategory[];
}
export interface EncodedCategory {
    name: string;
    rowCount: number;
    columns: EncodedColumn[];
}
export interface EncodedColumn {
    name: string;
    data: EncodedData;
    /**
     * The mask represents the presence or absent of particular "CIF value".
     * If the mask is not set, every value is present.
     *
     * 0 = Value is present
     * 1 = . = value not specified
     * 2 = ? = value unknown
     */
    mask?: EncodedData;
}
export interface EncodedData {
    encoding: Encoding[];
    data: Uint8Array;
}
export declare namespace Encoding {
    enum IntDataType {
        Int8 = 1,
        Int16 = 2,
        Int32 = 3,
        Uint8 = 4,
        Uint16 = 5,
        Uint32 = 6
    }
    enum FloatDataType {
        Float32 = 32,
        Float64 = 33
    }
    type DataType = IntDataType | FloatDataType;
    function getDataType(data: TypedIntArray | TypedFloatArray): DataType;
    function isSignedIntegerDataType(data: TypedIntArray): boolean;
    interface ByteArray {
        kind: 'ByteArray';
        type: DataType;
    }
    interface FixedPoint {
        kind: 'FixedPoint';
        factor: number;
        srcType: FloatDataType;
    }
    interface IntervalQuantization {
        kind: 'IntervalQuantization';
        min: number;
        max: number;
        numSteps: number;
        srcType: FloatDataType;
    }
    interface RunLength {
        kind: 'RunLength';
        srcType: IntDataType;
        srcSize: number;
    }
    interface Delta {
        kind: 'Delta';
        origin: number;
        srcType: IntDataType;
    }
    interface IntegerPacking {
        kind: 'IntegerPacking';
        byteCount: number;
        isUnsigned: boolean;
        srcSize: number;
    }
    interface StringArray {
        kind: 'StringArray';
        dataEncoding: Encoding[];
        stringData: string;
        offsetEncoding: Encoding[];
        offsets: Uint8Array;
    }
}
