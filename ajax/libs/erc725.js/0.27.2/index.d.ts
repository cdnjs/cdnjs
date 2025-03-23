import { ProviderWrapper } from './provider/providerWrapper';
import { SUPPORTED_VERIFICATION_METHODS, SUPPORTED_VERIFICATION_METHOD_STRINGS } from './constants/constants';
import { ERC725Config, ERC725Options } from './types/Config';
import { Permissions } from './types/Method';
import { ERC725JSONSchema, ERC725JSONSchemaKeyType, ERC725JSONSchemaValueContent, ERC725JSONSchemaValueType } from './types/ERC725JSONSchema';
import type { DecodeDataInput, DecodeDataOutput, EncodeDataInput, FetchDataOutput } from './types/decodeData';
import type { GetDataDynamicKey } from './types/GetData';
import type { DynamicKeyPart, DynamicKeyParts } from './types/dynamicKeys';
import { AssetURLEncode } from './types/encodeData';
import { URLDataToEncode, URLDataWithHash, Verification } from './types';
export type { ERC725JSONSchema, ERC725JSONSchemaKeyType, ERC725JSONSchemaValueContent, ERC725JSONSchemaValueType, Permissions, };
export { ERC725Config, KeyValuePair, ProviderTypes } from './types';
export { encodeData, encodeArrayKey, getVerificationMethod, isDataAuthentic, } from './lib/utils';
export { decodeData } from './lib/decodeData';
export { encodeKeyName, isDynamicKeyName } from './lib/encodeKeyName';
export { decodeMappingKey } from './lib/decodeMappingKey';
export { encodeDataSourceWithHash, decodeDataSourceWithHash, encodeValueType, decodeValueType, encodeValueContent, decodeValueContent, } from './lib/encoder';
export { getDataFromExternalSources } from './lib/getDataFromExternalSources';
export { encodePermissions, decodePermissions, checkPermissions, mapPermission, } from './lib/permissions';
export { getSchema } from './lib/schemaParser';
export declare function supportsInterface(interfaceIdOrName: string, options: {
    address: string;
    rpcUrl: string;
    gas?: number;
    provider?: ProviderWrapper;
}): Promise<boolean>;
/**
 * This package is currently in early stages of development, <br/>use only for testing or experimentation purposes.<br/>
 *
 * @typeParam Schema
 *
 */
export declare class ERC725 {
    options: ERC725Options;
    /**
     * Creates an instance of ERC725.
     * @param {ERC725JSONSchema[]} schema More information available here: [LSP-2-ERC725YJSONSchema](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-2-ERC725YJSONSchema.md)
     * @param {string} address Address of the ERC725 contract you want to interact with
     * @param {any} provider
     * @param {ERC725Config} config Configuration object.
     *
     */
    constructor(schemas: ERC725JSONSchema[], address?: any, provider?: any, config?: ERC725Config);
    /**
     * To prevent weird behavior from the lib, we must make sure all the schemas are correct before loading them.
     *
     * @param schemas
     * @returns
     */
    private validateSchemas;
    protected static initializeProvider(providerOrRpcUrl: any, gasInfo: any): ProviderWrapper | undefined;
    private getAddressAndProvider;
    /**
     * Gets **decoded data** for one, many or all keys of the specified `ERC725` smart-contract.
     * When omitting the `keyOrKeys` parameter, it will get all the keys (as per {@link ERC725JSONSchema | ERC725JSONSchema} definition).
     *
     * Data returned by this function does not contain external data of [`JSONURL`](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-2-ERC725YJSONSchema.md#jsonurl)
     * or [`ASSETURL`](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-2-ERC725YJSONSchema.md#asseturl) schema elements.
     *
     * If you would like to receive everything in one go, you can use {@link ERC725.fetchData | `fetchData`} for that.
     *
     * @param {*} keyOrKeys The name (or the encoded name as the schema ‘key’) of the schema element in the class instance’s schema.
     *
     * @returns If the input is an array: an object with schema element key names as properties, with corresponding **decoded** data as values. If the input is a string, it directly returns the **decoded** data.
     */
    getData(keyOrKeys?: Array<string | GetDataDynamicKey>): Promise<DecodeDataOutput[]>;
    getData(keyOrKeys?: string | GetDataDynamicKey): Promise<DecodeDataOutput>;
    /**
     * Since {@link ERC725.getData | `getData`} exclusively returns data that is stored on the blockchain, `fetchData` comes in handy.
     * Additionally to the data from the blockchain, `fetchData` also returns data from IPFS or HTTP(s) endpoints
     * stored as [`JSONURL`](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-2-ERC725YJSONSchema.md#jsonurl) or [`ASSETURL`](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-2-ERC725YJSONSchema.md#asseturl).
     *
     * To ensure **data authenticity** `fetchData` compares the `hash` of the fetched JSON with the `hash` stored on the blockchain.
     *
     * @param {*} keyOrKeys The name (or the encoded name as the schema ‘key’) of the schema element in the class instance’s schema.
     *
     * @returns Returns the fetched and decoded value depending ‘valueContent’ for the schema element, otherwise works like getData.
     */
    fetchData(keyOrKeys?: Array<string | GetDataDynamicKey>): Promise<FetchDataOutput[]>;
    fetchData(keyOrKeys?: string | GetDataDynamicKey): Promise<FetchDataOutput>;
    /**
     * Parses a hashed key or a list of hashed keys and will attempt to return its corresponding LSP-2 ERC725YJSONSchema object.
     * The function will look for a corresponding key within the schemas:
     *  - in `./schemas` folder
     *  - provided at initialisation
     *  - provided in the function call
     *
     * @param keyOrKeys The hashed key or array of keys for which you want to find the corresponding LSP-2 ERC725YJSONSchema.
     * @param providedSchemas If you provide your own ERC725JSONSchemas, the parser will also try to find a key match against these schemas.
     */
    getSchema(keyOrKeys: string[], providedSchemas?: ERC725JSONSchema[]): Record<string, ERC725JSONSchema | null>;
    getSchema(keyOrKeys: string, providedSchemas?: ERC725JSONSchema[]): ERC725JSONSchema | null;
    /**
     * To be able to store your data on the blockchain, you need to encode it according to your {@link ERC725JSONSchema}.
     *
     * @param {{ [key: string]: any }} data An object with one or many properties, containing the data that needs to be encoded.
     * @param schemas Additionnal ERC725JSONSchemas which will be concatenated with the schemas provided on init.
     *
     * @returns An object with hashed keys and encoded values.
     *
     * When encoding JSON it is possible to pass in the JSON object and the URL where it is available publicly.
     * The JSON will be hashed with `keccak256`.
     */
    encodeData(data: EncodeDataInput[], schemas?: ERC725JSONSchema[]): import("./types").EncodeDataReturn;
    /**
     * To be able to store your data on the blockchain, you need to encode it according to your {@link ERC725JSONSchema}.
     *
     * @param {{ [key: string]: any }} data An object with one or many properties, containing the data that needs to be encoded.
     * @param schemas ERC725JSONSchemas which will be used to encode the keys.
     *
     * @returns An object with hashed keys and encoded values.
     *
     * When encoding JSON it is possible to pass in the JSON object and the URL where it is available publicly.
     * The JSON will be hashed with `keccak256`.
     */
    static encodeData(data: EncodeDataInput[], schemas: ERC725JSONSchema[]): import("./types").EncodeDataReturn;
    /**
     * In case you are reading the key-value store from an ERC725 smart-contract key-value store
     * without `@erc725/erc725.js` you can use `decodeData` to do the decoding for you.
     *
     * It is more convenient to use {@link ERC725.fetchData | `fetchData`}.
     * It does the `decoding` and `fetching` of external references for you automatically.
     *
     * @param {{ [key: string]: any }} data An object with one or many properties.
     * @param schemas ERC725JSONSchemas which will be used to encode the keys.
     *
     * @returns Returns decoded data as defined and expected in the schema:
     */
    decodeData(data: DecodeDataInput[], schemas?: ERC725JSONSchema[]): {
        [key: string]: any;
    };
    /**
     * In case you are reading the key-value store from an ERC725 smart-contract key-value store
     * without `@erc725/erc725.js` you can use `decodeData` to do the decoding for you.
     *
     * It is more convenient to use {@link ERC725.fetchData | `fetchData`}.
     * It does the `decoding` and `fetching` of external references for you automatically.
     *
     * @param {{ [key: string]: any }} data An object with one or many properties.
     * @param schemas ERC725JSONSchemas which will be used to encode the keys.
     *
     * @returns Returns decoded data as defined and expected in the schema:
     */
    static decodeData(data: DecodeDataInput[], schemas: ERC725JSONSchema[]): {
        [key: string]: any;
    };
    /**
     * An added utility method which simply returns the owner of the contract.
     * Not directly related to ERC725 specifications.
     *
     * @param {string} [address]
     * @returns The address of the contract owner as stored in the contract.
     *
     *    This method is not yet supported when using the `graph` provider type.
     *
     * ```javascript title="Example"
     * await myERC725.getOwner();
     * // '0x94933413384997F9402cc07a650e8A34d60F437A'
     *
     * await myERC725.getOwner("0x3000783905Cc7170cCCe49a4112Deda952DDBe24");
     * // '0x7f1b797b2Ba023Da2482654b50724e92EB5a7091'
     * ```
     */
    getOwner(_address?: string): Promise<any>;
    /**
     * A helper function which checks if a signature is valid according to the EIP-1271 standard.
     *
     * @param messageOrHash if it is a 66 chars string with 0x prefix, it will be considered as a hash (keccak256). If not, the message will be wrapped as follows: "\x19Ethereum Signed Message:\n" + message.length + message and hashed.
     * @param signature
     * @returns true if isValidSignature call on the contract returns the magic value. false otherwise
     */
    isValidSignature(messageOrHash: string, signature: string): Promise<boolean>;
    /**
     * Hashes a key name for use on an ERC725Y contract according to LSP2 ERC725Y JSONSchema standard.
     *
     * @param {string} keyName The key name you want to encode.
     * @param {DynamicKeyParts} dynamicKeyParts String or Array of String values used to construct the key.
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md ERC725YJsonSchema standard.
     * @returns {string} The keccak256 hash of the provided key name. This is the key that must be retrievable from the ERC725Y contract via ERC725Y.getData(bytes32 key).
     */
    static encodeKeyName(keyName: string, dynamicKeyParts?: DynamicKeyParts): string;
    /**
     * Hashes a key name for use on an ERC725Y contract according to LSP2 ERC725Y JSONSchema standard.
     *
     * @param {string} keyName The key name you want to encode.
     * @param {DynamicKeyParts} dynamicKeyParts String or Array of String values used to construct the key.
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md ERC725YJsonSchema standard.
     * @returns {string} The keccak256 hash of the provided key name. This is the key that must be retrievable from the ERC725Y contract via ERC725Y.getData(bytes32 key).
     */
    encodeKeyName(keyName: string, dynamicKeyParts?: DynamicKeyParts): string;
    /**
     * Decodes a hashed key used on an ERC725Y contract according to LSP2 ERC725Y JSONSchema standard.
     *
     * @param {string} keyHash Key hash that needs to be decoded.
     * @param {string | ERC725JSONSchema} keyNameOrSchema Key name following schema specifications or ERC725Y JSON Schema to follow in order to decode the key.
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md ERC725YJsonSchema standard.
     * @returns {DynamicKeyPart[]} The Array with all the key decoded dynamic parameters. Each object have an attribute type and value.
     */
    static decodeMappingKey(keyHash: string, keyNameOrSchema: string | ERC725JSONSchema): DynamicKeyPart[];
    /**
     * Decodes a hashed key used on an ERC725Y contract according to LSP2 ERC725Y JSONSchema standard.
     *
     * @param {string} keyHash Key hash that needs to be decoded.
     * @param {string | ERC725JSONSchema} keyNameOrSchema Key name following schema specifications or ERC725Y JSON Schema to follow in order to decode the key.
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md ERC725YJsonSchema standard.
     * @returns {DynamicKeyPart[]} The Array with all the key decoded dynamic parameters. Each object have an attribute type and value.
     */
    decodeMappingKey(keyHash: string, keyNameOrSchema: string | ERC725JSONSchema): DynamicKeyPart[];
    /**
     * Check if the ERC725 object supports
     * a certain interface.
     *
     * @param interfaceIdOrName Interface ID or supported interface name.
     * @returns {Promise<boolean>} if interface is supported.
     */
    supportsInterface(interfaceIdOrName: string): Promise<boolean>;
    /**
     * Check if a smart contract address
     * supports a certain interface.
     *
     * @param {string} interfaceIdOrName Interface ID or supported interface name.
     * @param options Object of address, RPC URL and optional gas.
     * @returns {Promise<boolean>} if interface is supported.
     */
    static supportsInterface(interfaceIdOrName: string, options: {
        address: string;
        rpcUrl: string;
        gas?: number;
    }): Promise<boolean>;
    /**
     * Encode permissions into a hexadecimal string as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param permissions The permissions you want to specify to be included or excluded. Any ommitted permissions will default to false.
     * @returns {*} The permissions encoded as a hexadecimal string as defined by the LSP6 Standard.
     */
    static encodePermissions(permissions: Permissions): string;
    /**
     * Encode permissions into a hexadecimal string as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param permissions The permissions you want to specify to be included or excluded. Any ommitted permissions will default to false.
     * @returns {*} The permissions encoded as a hexadecimal string as defined by the LSP6 Standard.
     */
    encodePermissions(permissions: Permissions): string;
    /**
     * Decodes permissions from hexadecimal as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param permissionHex The permission hexadecimal value to be decoded.
     * @returns Object specifying whether default LSP6 permissions are included in provided hexademical string.
     */
    static decodePermissions(permissionHex: string): {
        CHANGEOWNER: boolean;
        ADDCONTROLLER: boolean;
        EDITPERMISSIONS: boolean;
        ADDEXTENSIONS: boolean;
        CHANGEEXTENSIONS: boolean;
        ADDUNIVERSALRECEIVERDELEGATE: boolean;
        CHANGEUNIVERSALRECEIVERDELEGATE: boolean;
        REENTRANCY: boolean;
        SUPER_TRANSFERVALUE: boolean;
        TRANSFERVALUE: boolean;
        SUPER_CALL: boolean;
        CALL: boolean;
        SUPER_STATICCALL: boolean;
        STATICCALL: boolean;
        SUPER_DELEGATECALL: boolean;
        DELEGATECALL: boolean;
        DEPLOY: boolean;
        SUPER_SETDATA: boolean;
        SETDATA: boolean;
        ENCRYPT: boolean;
        DECRYPT: boolean;
        SIGN: boolean;
        EXECUTE_RELAY_CALL: boolean;
        ERC4337_PERMISSION: boolean;
        ALL_PERMISSIONS: boolean;
    };
    /**
     * Decodes permissions from hexadecimal as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param permissionHex The permission hexadecimal value to be decoded.
     * @returns Object specifying whether default LSP6 permissions are included in provided hexademical string.
     */
    decodePermissions(permissionHex: string): {
        CHANGEOWNER: boolean;
        ADDCONTROLLER: boolean;
        EDITPERMISSIONS: boolean;
        ADDEXTENSIONS: boolean;
        CHANGEEXTENSIONS: boolean;
        ADDUNIVERSALRECEIVERDELEGATE: boolean;
        CHANGEUNIVERSALRECEIVERDELEGATE: boolean;
        REENTRANCY: boolean;
        SUPER_TRANSFERVALUE: boolean;
        TRANSFERVALUE: boolean;
        SUPER_CALL: boolean;
        CALL: boolean;
        SUPER_STATICCALL: boolean;
        STATICCALL: boolean;
        SUPER_DELEGATECALL: boolean;
        DELEGATECALL: boolean;
        DEPLOY: boolean;
        SUPER_SETDATA: boolean;
        SETDATA: boolean;
        ENCRYPT: boolean;
        DECRYPT: boolean;
        SIGN: boolean;
        EXECUTE_RELAY_CALL: boolean;
        ERC4337_PERMISSION: boolean;
        ALL_PERMISSIONS: boolean;
    };
    /**
     * Check if the required permissions are included in the granted permissions as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param requiredPermissions An array of required permissions or a single required permission.
     * @param grantedPermissions The granted permissions as a 32-byte hex string.
     * @return A boolean value indicating whether the required permissions are included in the granted permissions.
     */
    static checkPermissions(requiredPermissions: string[] | string, grantedPermissions: string): boolean;
    /**
     * Check if the required permissions are included in the granted permissions as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param requiredPermissions An array of required permissions or a single required permission.
     * @param grantedPermissions The granted permissions as a 32-byte hex string.
     * @return A boolean value indicating whether the required permissions are included in the granted permissions.
     */
    checkPermissions(requiredPermissions: string[] | string, grantedPermissions: string): boolean;
    static mapPermission(permission: string): string | null;
    mapPermission(permission: string): string | null;
    /**
     * @param type The valueType to encode the value as
     * @param value The value to encode
     * @returns The encoded value
     */
    static encodeValueType(type: string, value: string | string[] | number | number[] | boolean | boolean[]): string;
    encodeValueType(type: string, value: string | string[] | number | number[] | boolean | boolean[]): string;
    /**
     * @param type The valueType to decode the value as
     * @param data The data to decode
     * @returns The decoded value
     */
    static decodeValueType(type: string, data: string): any;
    decodeValueType(type: string, data: string): any;
    static encodeValueContent(valueContent: string, value: string | number | AssetURLEncode | URLDataToEncode | boolean): string | false;
    encodeValueContent(valueContent: string, value: string | number | AssetURLEncode | URLDataToEncode | boolean): string | false;
    static decodeValueContent(valueContent: string, value: string): string | URLDataWithHash | number | boolean | null;
    decodeValueContent(valueContent: string, value: string): string | URLDataWithHash | number | boolean | null;
    encodeDataSourceWithHash(verification: undefined | Verification, dataSource: string): string;
    static encodeDataSourceWithHash(verification: undefined | Verification, dataSource: string): string;
    decodeDataSourceWithHash(value: string): URLDataWithHash;
    static decodeDataSourceWithHash(value: string): URLDataWithHash;
    static getVerificationMethod(nameOrSig: string): {
        method: (data: string | object | Uint8Array | null) => string;
        name: SUPPORTED_VERIFICATION_METHOD_STRINGS;
        sig: SUPPORTED_VERIFICATION_METHODS;
    } | undefined;
    getVerificationMethod(nameOrSig: string): {
        method: (data: string | object | Uint8Array | null) => string;
        name: SUPPORTED_VERIFICATION_METHOD_STRINGS;
        sig: SUPPORTED_VERIFICATION_METHODS;
    } | undefined;
    static isDataAuthentic(data: string | Uint8Array, verificationOptions: Verification): boolean;
    isDataAuthentic(data: string | Uint8Array, verificationOptions: Verification): boolean;
}
export default ERC725;
