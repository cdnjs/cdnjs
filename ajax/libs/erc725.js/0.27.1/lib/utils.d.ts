/**
 * @file lib/utils.ts
 * @author Robert McLeod <@robertdavid010>
 * @author Fabian Vogelsteller <fabian@lukso.network>
 * @author Hugo Masclet <@Hugoo>
 * @date 2020
 */
import { URLDataToEncode, EncodeDataReturn, URLDataWithHash, Verification } from '../types';
import { ERC725JSONSchema, ERC725JSONSchemaKeyType, ERC725JSONSchemaValueType } from '../types/ERC725JSONSchema';
import { SUPPORTED_VERIFICATION_METHODS, SUPPORTED_VERIFICATION_METHOD_STRINGS } from '../constants/constants';
import { EncodeDataInput } from '../types/decodeData';
import { GetDataDynamicKey } from '../types/GetData';
/**
 *
 * @param {string} valueContent as per ERC725Schema definition
 * @param {string} valueType as per ERC725Schema definition
 * @param decodedValue can contain single value, an array, or an object as required by schema (JSONURL, or ASSETURL)
 * @param {string} [name]
 *
 * @return the encoded value as per the schema
 */
export declare function encodeKeyValue(valueContent: string, valueType: ERC725JSONSchemaValueType | string, decodedValue: string | string[] | number | number[] | URLDataToEncode | URLDataToEncode[] | boolean, name?: string): string | false;
/**
 *
 * @param key The schema key of a schema with keyType = 'Array'
 * @param index An integer representing the intended array index
 * @return The raw bytes key for the array element
 */
export declare function encodeArrayKey(key: string, index: number): string;
/**
 *
 * @param keyName the schema key name
 * @returns a guess of the schema key type
 */
export declare function guessKeyTypeFromKeyName(keyName: string): ERC725JSONSchemaKeyType;
export declare const encodeTupleKeyValue: (valueContent: string, valueType: string, decodedValues: Array<string | number | URLDataToEncode | string[]>) => string;
/**
 *
 * @param schema is an object of a schema definitions.
 * @param value will be either key-value pairs for a key type of Array, or a single value for type Singleton.
 *
 * @return the encoded value for the key as per the supplied schema.
 */
export declare function encodeKey(schema: ERC725JSONSchema, value: string | number | (string | number)[] | string[][] | URLDataToEncode | URLDataToEncode[] | boolean, startingIndex?: number, totalArrayLength?: number): string | false | {
    key: string;
    value: string;
}[] | null;
/**
 *
 * @param {string} valueContent as per ERC725Schema definition.
 * @param {string} valueType as per ERC725Schema definition.
 * @param {string} value the encoded value as string.
 * @param {string} [name]
 *
 * @return the decoded value as per the schema.
 */
export declare function decodeKeyValue(valueContent: string, valueType: ERC725JSONSchemaValueType | string, // string for tuples and CompactBytesArray
_value: any, name?: string): any;
/**
 * @param schema an array of schema definitions as per ${@link ERC725JSONSchema}
 * @param data an object of key-value pairs
 */
export declare function encodeData(data: EncodeDataInput | EncodeDataInput[], schema: ERC725JSONSchema[]): EncodeDataReturn;
export declare function getVerificationMethod(nameOrSig: string): {
    method: (data: string | object | Uint8Array | null) => string;
    name: SUPPORTED_VERIFICATION_METHOD_STRINGS;
    sig: SUPPORTED_VERIFICATION_METHODS;
} | undefined;
export declare function hashData(data: string | Uint8Array | Record<string, any>, nameOrSig: SUPPORTED_VERIFICATION_METHODS | string): string;
/**
 * Hashes the data received with the specified hashing function,
 * and compares the result with the provided hash.
 */
export declare function isDataAuthentic(data: string | Uint8Array, options: Verification, capture?: string[]): boolean;
/**
 * Transforms passed ipfsGateway url to correct format for fetching IPFS data
 *
 * @param ipfsGateway
 * @return {*}  string converted IPFS gateway URL
 */
export declare function convertIPFSGatewayUrl(ipfsGateway: string): string;
/**
 * Given a list of keys (dynamic or not) and a list of schemas with dynamic keys, it will
 * generate a "final"/non dynamic schemas list.
 */
export declare const generateSchemasFromDynamicKeys: (keyNames: Array<string | GetDataDynamicKey>, schemas: ERC725JSONSchema[]) => ERC725JSONSchema[];
/**
 * Changes the protocol from `ipfs://` to `http(s)://` and adds the selected IPFS gateway.
 * `ipfs://QmbKvCVEePiDKxuouyty9bMsWBAxZDGr2jhxd4pLGLx95D => https://ipfs.lukso.network/ipfs/QmbKvCVEePiDKxuouyty9bMsWBAxZDGr2jhxd4pLGLx95D`
 */
export declare function patchIPFSUrlsIfApplicable(receivedData: URLDataWithHash, ipfsGateway: string): URLDataWithHash;
export declare function countNumberOfBytes(data: string): number;
export declare function countSignificantBits(data: string): number;
/**
 * Given an input string which can define dynamic types, will return an array with all types
 * In: <address|uint256>
 * Out: ['address', 'uint256']
 *
 * In: NotDynamic
 * Out: ['NotDynamic']
 *
 * It does not veryfi whether these types are valid. It just processes the string.
 *
 * @param keyName
 */
export declare const splitMultiDynamicKeyNamePart: (keyName: string) => string[];
/**
 * This function helps to duplicate schema entries with multiple types to prepare schemas loaded on init.
 * It does not check whether the input schema is valid or not, as long as it have the name, key and keyType keys, it will proceed.
 *
 * Input:
 * {
 *   "name": "LSP8MetadataTokenURI:<address|uint256>",
 *   "key": "0x1339e76a390b7b9ec9010000<address|uint256>",
 *   "keyType": "Mapping",
 *   "valueType": "(bytes4,string)",
 *   "valueContent": "(Bytes4,URI)"
 * }
 *
 * Output:
 *
 * [{
 *   "name": "LSP8MetadataTokenURI:<address>",
 *   "key": "0x1339e76a390b7b9ec9010000<address>",
 *   "keyType": "Mapping",
 *   "valueType": "(bytes4,string)",
 *   "valueContent": "(Bytes4,URI)"
 * },
 * {
 *   "name": "LSP8MetadataTokenURI:<uint256>",
 *   "key": "0x1339e76a390b7b9ec9010000<uint256>",
 *   "keyType": "Mapping",
 *   "valueType": "(bytes4,string)",
 *   "valueContent": "(Bytes4,URI)"
 * }]
 *
 * Having such a duplicated schema for lookup will allow the rest of the lib to behave the same way as it was.
 *
 * @param schema
 */
export declare const duplicateMultiTypeERC725SchemaEntry: (schema: ERC725JSONSchema) => ERC725JSONSchema[];
export declare function isValidUintSize(bitSize: number): boolean;
export declare function isValidByteSize(bytesSize: number): boolean;
/**
 * @dev Check if the `valueContent` in a schema is defined as an hex literal string
 * @param valueContent The valueContent part of a schema
 * @returns true or false
 */
export declare function isValueContentLiteralHex(valueContent: string): boolean;
