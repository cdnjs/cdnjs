/**
 * @file lib/encodeKeyName.ts
 * @author Hugo Masclet <@Hugoo>
 * @date 2022
 */
import { DynamicKeyParts } from '../types/dynamicKeys';
export declare const dynamicTypesRegex: RegExp;
/**
 *
 * @param type <string>, <uintM>, <intM>, <bool>, <bytesM>, <address>.
 * @param value
 * @param bytes the number of bytes to keep / padding
 */
export declare const encodeDynamicKeyPart: (type: string, value_: string, bytes: number) => string;
export declare function isDynamicKeyName(name: string): boolean;
/**
 *
 * @param name the schema element name.
 * @param dynamicKeyParts
 *
 * @return the name of the key encoded as per specifications.
 */
export declare function encodeKeyName(name: string, dynamicKeyParts?: DynamicKeyParts): string;
export declare const generateDynamicKeyName: (name: string, dynamicKeyParts: DynamicKeyParts) => string;
