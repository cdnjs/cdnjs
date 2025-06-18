import type { DecodeDataInput, DecodeDataOutput } from '../types/decodeData';
import { type ERC725JSONSchema } from '../types/ERC725JSONSchema';
export declare const isValidTuple: (valueType: string, valueContent: string) => boolean;
export declare const decodeTupleKeyValue: (valueContent: string, // i.e. (bytes4,Number,bytes16)
valueType: string, // i.e. (bytes4,bytes8,bytes16)
value: string) => Array<string>;
/**
 *
 * @param schema is an object of a schema definitions.
 * @param value will be either key-value pairs for a key type of Array, or a single value for type Singleton.
 *
 * @return the decoded value/values as per the schema definition.
 */
export declare function decodeKey(schema: ERC725JSONSchema, value: any): any;
/**
 * @param schema schema is an array of objects of schema definitions
 * @param data data is an array of objects of key-value pairs
 *
 * @return: all decoded data as per required by the schema and provided data
 */
export declare function decodeData(data: DecodeDataInput[], schema: ERC725JSONSchema[]): DecodeDataOutput[];
export declare function decodeData(data: DecodeDataInput, schema: ERC725JSONSchema[]): DecodeDataOutput;
