/*
    This file is part of @erc725/erc725.js.
    @erc725/erc725.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    @erc725/erc725.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with @erc725/erc725.js.  If not, see <http://www.gnu.org/licenses/>.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @file index.ts
 * @author Robert McLeod <@robertdavid010>
 * @author Fabian Vogelsteller <fabian@lukso.network>
 * @author Hugo Masclet <@Hugoo>
 * @author Jean Cavallera <@CJ42>
 * @date 2020
 */
import HttpProvider from 'web3-providers-http';
import { ProviderWrapper } from './provider/providerWrapper';
import { encodeData, convertIPFSGatewayUrl, generateSchemasFromDynamicKeys, duplicateMultiTypeERC725SchemaEntry, getVerificationMethod, isDataAuthentic, } from './lib/utils';
import { getSchema } from './lib/schemaParser';
import { isValidSignature } from './lib/isValidSignature';
import { DEFAULT_GAS_VALUE, } from './constants/constants';
import { encodeKeyName, isDynamicKeyName } from './lib/encodeKeyName';
import { decodeData } from './lib/decodeData';
import { getDataFromExternalSources } from './lib/getDataFromExternalSources';
import { getData } from './lib/getData';
import { encodeDataSourceWithHash, decodeDataSourceWithHash, encodeValueType, decodeValueType, encodeValueContent, decodeValueContent, } from './lib/encoder';
import { internalSupportsInterface } from './lib/detector';
import { decodeMappingKey } from './lib/decodeMappingKey';
import { encodePermissions, decodePermissions, checkPermissions, mapPermission, } from './lib/permissions';
import { isAddress } from 'web3-validator';
export { ProviderTypes } from './types';
export { encodeData, encodeArrayKey, getVerificationMethod, isDataAuthentic, } from './lib/utils';
export { decodeData } from './lib/decodeData';
export { encodeKeyName, isDynamicKeyName } from './lib/encodeKeyName';
export { decodeMappingKey } from './lib/decodeMappingKey';
export { encodeDataSourceWithHash, decodeDataSourceWithHash, encodeValueType, decodeValueType, encodeValueContent, decodeValueContent, } from './lib/encoder';
export { getDataFromExternalSources } from './lib/getDataFromExternalSources';
export { encodePermissions, decodePermissions, checkPermissions, mapPermission, } from './lib/permissions';
export { getSchema } from './lib/schemaParser';
// PRIVATE FUNCTION
function initializeProvider(providerOrRpcUrl, gasInfo) {
    // do not fail on no-provider
    if (!providerOrRpcUrl)
        return undefined;
    // if provider is a string, assume it's a rpcUrl
    if (typeof providerOrRpcUrl === 'string') {
        return new ProviderWrapper(new HttpProvider(providerOrRpcUrl), gasInfo);
    }
    if (typeof providerOrRpcUrl.request === 'function' ||
        typeof providerOrRpcUrl.send === 'function')
        return new ProviderWrapper(providerOrRpcUrl, gasInfo);
    throw new Error(`Incorrect or unsupported provider ${providerOrRpcUrl}`);
}
// PUBLIC FUNCTION
export function supportsInterface(interfaceIdOrName, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isAddress(options.address)) {
            throw new Error('Invalid address');
        }
        if (!options.rpcUrl) {
            throw new Error('Missing RPC URL');
        }
        return internalSupportsInterface(interfaceIdOrName, {
            address: options.address,
            provider: options.provider ||
                initializeProvider(options.rpcUrl, (options === null || options === void 0 ? void 0 : options.gas) ? options === null || options === void 0 ? void 0 : options.gas : DEFAULT_GAS_VALUE),
        });
    });
}
/**
 * This package is currently in early stages of development, <br/>use only for testing or experimentation purposes.<br/>
 *
 * @typeParam Schema
 *
 */
export class ERC725 {
    /**
     * Creates an instance of ERC725.
     * @param {ERC725JSONSchema[]} schema More information available here: [LSP-2-ERC725YJSONSchema](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-2-ERC725YJSONSchema.md)
     * @param {string} address Address of the ERC725 contract you want to interact with
     * @param {any} provider
     * @param {ERC725Config} config Configuration object.
     *
     */
    constructor(schemas, address, provider, config) {
        // NOTE: provider param can be either the provider, or and object with {provider:xxx ,type:xxx}
        // TODO: Add check for schema format?
        if (!schemas) {
            throw new Error('Missing schema.');
        }
        const defaultConfig = {
            ipfsGateway: 'https://api.universalprofile.cloud/ipfs/',
            gas: DEFAULT_GAS_VALUE,
        };
        this.options = {
            schemas: this.validateSchemas(schemas.flatMap((schema) => duplicateMultiTypeERC725SchemaEntry(schema))),
            address,
            provider: initializeProvider(provider, (config === null || config === void 0 ? void 0 : config.gas) ? config === null || config === void 0 ? void 0 : config.gas : defaultConfig.gas),
            ipfsGateway: (config === null || config === void 0 ? void 0 : config.ipfsGateway)
                ? convertIPFSGatewayUrl(config === null || config === void 0 ? void 0 : config.ipfsGateway)
                : defaultConfig.ipfsGateway,
            gas: (config === null || config === void 0 ? void 0 : config.gas) ? config === null || config === void 0 ? void 0 : config.gas : defaultConfig.gas,
        };
    }
    /**
     * To prevent weird behavior from the lib, we must make sure all the schemas are correct before loading them.
     *
     * @param schemas
     * @returns
     */
    // eslint-disable-next-line class-methods-use-this
    validateSchemas(schemas) {
        return schemas.filter((schema) => {
            if (schema.valueContent === 'AssetURL' ||
                schema.valueContent === 'JSONURL') {
                console.warn(`[Deprecation notice] The schema with keyName: ${schema.name} uses deprecated valueContent: ${schema.valueContent}. It has been replaced by VerifiableURI. Decoding is backward compatible but value will be encoded as VerifiableURI.`);
            }
            try {
                const encodedKeyName = encodeKeyName(schema.name);
                const isKeyValid = schema.key === encodedKeyName;
                if (!isKeyValid) {
                    console.warn(`The schema with keyName: ${schema.name} is skipped because its key hash does not match its key name (expected: ${encodedKeyName}, got: ${schema.key}).`);
                }
                return isKeyValid;
            }
            catch (err) {
                // We could not encodeKeyName, probably because the key is dynamic (Mapping or MappingWithGrouping).
                // TODO: make sure the dynamic key name is valid:
                // - has max 2 variables
                // - variables are correct (<string>, <bool>, etc.)
                // Keeping dynamic keys may be an issue for getData / fetchData functions.
                return true;
            }
        });
    }
    static initializeProvider(providerOrRpcUrl, gasInfo) {
        return initializeProvider(providerOrRpcUrl, gasInfo);
    }
    getAddressAndProvider() {
        if (!this.options.address || !isAddress(this.options.address)) {
            throw new Error('Missing ERC725 contract address.');
        }
        if (!this.options.provider) {
            throw new Error('Missing provider.');
        }
        return {
            address: this.options.address,
            provider: this.options.provider,
        };
    }
    getData(keyOrKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getAddressAndProvider();
            return getData(this.options, keyOrKeys);
        });
    }
    fetchData(keyOrKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            let keyNames;
            let throwException = false;
            if (Array.isArray(keyOrKeys)) {
                keyNames = keyOrKeys;
            }
            else if (!keyOrKeys) {
                keyNames = this.options.schemas
                    .map((element) => element.name)
                    .filter((key) => !isDynamicKeyName(key));
            }
            else {
                throwException = true; // If it's explicitely a single key, then we allow throwing an exception
                keyNames = [keyOrKeys];
            }
            const dataFromChain = yield this.getData(keyNames);
            // NOTE: this step is executed in getData function above
            // We can optimize by computing it only once.
            const schemas = generateSchemasFromDynamicKeys(keyNames, this.options.schemas);
            const dataFromExternalSources = yield getDataFromExternalSources(schemas, dataFromChain, this.options.ipfsGateway, throwException);
            if (keyOrKeys &&
                !Array.isArray(keyOrKeys) &&
                dataFromExternalSources.length > 0) {
                return dataFromExternalSources[0];
            }
            return dataFromExternalSources;
        });
    }
    getSchema(keyOrKeys, providedSchemas) {
        return getSchema(keyOrKeys, this.options.schemas.concat(providedSchemas || []));
    }
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
    encodeData(data, schemas) {
        return encodeData(data, Array.prototype.concat(this.options.schemas, schemas));
    }
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
    static encodeData(data, schemas) {
        return encodeData(data, schemas);
    }
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
    decodeData(data, schemas) {
        return decodeData(data, Array.prototype.concat(this.options.schemas, schemas));
    }
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
    static decodeData(data, schemas) {
        return decodeData(data, schemas);
    }
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
    getOwner(_address) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address, provider } = this.getAddressAndProvider();
            return provider.getOwner(_address || address);
        });
    }
    /**
     * A helper function which checks if a signature is valid according to the EIP-1271 standard.
     *
     * @param messageOrHash if it is a 66 chars string with 0x prefix, it will be considered as a hash (keccak256). If not, the message will be wrapped as follows: "\x19Ethereum Signed Message:\n" + message.length + message and hashed.
     * @param signature
     * @returns true if isValidSignature call on the contract returns the magic value. false otherwise
     */
    isValidSignature(messageOrHash, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.address || !isAddress(this.options.address)) {
                throw new Error('Missing ERC725 contract address.');
            }
            if (!this.options.provider) {
                throw new Error('Missing provider.');
            }
            return isValidSignature(messageOrHash, signature, this.options.address, this.options.provider);
        });
    }
    /**
     * Hashes a key name for use on an ERC725Y contract according to LSP2 ERC725Y JSONSchema standard.
     *
     * @param {string} keyName The key name you want to encode.
     * @param {DynamicKeyParts} dynamicKeyParts String or Array of String values used to construct the key.
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md ERC725YJsonSchema standard.
     * @returns {string} The keccak256 hash of the provided key name. This is the key that must be retrievable from the ERC725Y contract via ERC725Y.getData(bytes32 key).
     */
    static encodeKeyName(keyName, dynamicKeyParts) {
        return encodeKeyName(keyName, dynamicKeyParts);
    }
    /**
     * Hashes a key name for use on an ERC725Y contract according to LSP2 ERC725Y JSONSchema standard.
     *
     * @param {string} keyName The key name you want to encode.
     * @param {DynamicKeyParts} dynamicKeyParts String or Array of String values used to construct the key.
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md ERC725YJsonSchema standard.
     * @returns {string} The keccak256 hash of the provided key name. This is the key that must be retrievable from the ERC725Y contract via ERC725Y.getData(bytes32 key).
     */
    encodeKeyName(keyName, dynamicKeyParts) {
        return encodeKeyName(keyName, dynamicKeyParts);
    }
    /**
     * Decodes a hashed key used on an ERC725Y contract according to LSP2 ERC725Y JSONSchema standard.
     *
     * @param {string} keyHash Key hash that needs to be decoded.
     * @param {string | ERC725JSONSchema} keyNameOrSchema Key name following schema specifications or ERC725Y JSON Schema to follow in order to decode the key.
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md ERC725YJsonSchema standard.
     * @returns {DynamicKeyPart[]} The Array with all the key decoded dynamic parameters. Each object have an attribute type and value.
     */
    static decodeMappingKey(keyHash, keyNameOrSchema) {
        return decodeMappingKey(keyHash, keyNameOrSchema);
    }
    /**
     * Decodes a hashed key used on an ERC725Y contract according to LSP2 ERC725Y JSONSchema standard.
     *
     * @param {string} keyHash Key hash that needs to be decoded.
     * @param {string | ERC725JSONSchema} keyNameOrSchema Key name following schema specifications or ERC725Y JSON Schema to follow in order to decode the key.
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md ERC725YJsonSchema standard.
     * @returns {DynamicKeyPart[]} The Array with all the key decoded dynamic parameters. Each object have an attribute type and value.
     */
    decodeMappingKey(keyHash, keyNameOrSchema) {
        return decodeMappingKey(keyHash, keyNameOrSchema);
    }
    /**
     * Check if the ERC725 object supports
     * a certain interface.
     *
     * @param interfaceIdOrName Interface ID or supported interface name.
     * @returns {Promise<boolean>} if interface is supported.
     */
    supportsInterface(interfaceIdOrName) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address, provider } = this.getAddressAndProvider();
            return internalSupportsInterface(interfaceIdOrName, {
                address,
                provider,
            });
        });
    }
    /**
     * Check if a smart contract address
     * supports a certain interface.
     *
     * @param {string} interfaceIdOrName Interface ID or supported interface name.
     * @param options Object of address, RPC URL and optional gas.
     * @returns {Promise<boolean>} if interface is supported.
     */
    static supportsInterface(interfaceIdOrName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return supportsInterface(interfaceIdOrName, options);
        });
    }
    // Permissions related functions
    // -----------------------------
    /**
     * Encode permissions into a hexadecimal string as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param permissions The permissions you want to specify to be included or excluded. Any ommitted permissions will default to false.
     * @returns {*} The permissions encoded as a hexadecimal string as defined by the LSP6 Standard.
     */
    static encodePermissions(permissions) {
        return encodePermissions(permissions);
    }
    /**
     * Encode permissions into a hexadecimal string as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param permissions The permissions you want to specify to be included or excluded. Any ommitted permissions will default to false.
     * @returns {*} The permissions encoded as a hexadecimal string as defined by the LSP6 Standard.
     */
    encodePermissions(permissions) {
        return encodePermissions(permissions);
    }
    /**
     * Decodes permissions from hexadecimal as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param permissionHex The permission hexadecimal value to be decoded.
     * @returns Object specifying whether default LSP6 permissions are included in provided hexademical string.
     */
    static decodePermissions(permissionHex) {
        return decodePermissions(permissionHex);
    }
    /**
     * Decodes permissions from hexadecimal as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param permissionHex The permission hexadecimal value to be decoded.
     * @returns Object specifying whether default LSP6 permissions are included in provided hexademical string.
     */
    decodePermissions(permissionHex) {
        return decodePermissions(permissionHex);
    }
    /**
     * Check if the required permissions are included in the granted permissions as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param requiredPermissions An array of required permissions or a single required permission.
     * @param grantedPermissions The granted permissions as a 32-byte hex string.
     * @return A boolean value indicating whether the required permissions are included in the granted permissions.
     */
    static checkPermissions(requiredPermissions, grantedPermissions) {
        return checkPermissions(requiredPermissions, grantedPermissions);
    }
    /**
     * Check if the required permissions are included in the granted permissions as defined by the LSP6 KeyManager Standard.
     *
     * @link https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md LSP6 KeyManager Standard.
     * @param requiredPermissions An array of required permissions or a single required permission.
     * @param grantedPermissions The granted permissions as a 32-byte hex string.
     * @return A boolean value indicating whether the required permissions are included in the granted permissions.
     */
    checkPermissions(requiredPermissions, grantedPermissions) {
        return checkPermissions(requiredPermissions, grantedPermissions);
    }
    static mapPermission(permission) {
        return mapPermission(permission);
    }
    mapPermission(permission) {
        return mapPermission(permission);
    }
    // Encoding methods
    // ----------------
    /**
     * @param type The valueType to encode the value as
     * @param value The value to encode
     * @returns The encoded value
     */
    static encodeValueType(type, value) {
        return encodeValueType(type, value);
    }
    encodeValueType(type, value) {
        return encodeValueType(type, value);
    }
    /**
     * @param type The valueType to decode the value as
     * @param data The data to decode
     * @returns The decoded value
     */
    static decodeValueType(type, data) {
        return decodeValueType(type, data);
    }
    decodeValueType(type, data) {
        return decodeValueType(type, data);
    }
    static encodeValueContent(valueContent, value) {
        return encodeValueContent(valueContent, value);
    }
    encodeValueContent(valueContent, value) {
        return encodeValueContent(valueContent, value);
    }
    static decodeValueContent(valueContent, value) {
        return decodeValueContent(valueContent, value);
    }
    decodeValueContent(valueContent, value) {
        return decodeValueContent(valueContent, value);
    }
    // External Data Source utilities (`VerifiableURI` and `JSONURI`)
    // ----------------------------------------------------------------
    encodeDataSourceWithHash(verification, dataSource) {
        return encodeDataSourceWithHash(verification, dataSource);
    }
    static encodeDataSourceWithHash(verification, dataSource) {
        return encodeDataSourceWithHash(verification, dataSource);
    }
    decodeDataSourceWithHash(value) {
        return decodeDataSourceWithHash(value);
    }
    static decodeDataSourceWithHash(value) {
        return decodeDataSourceWithHash(value);
    }
    static getVerificationMethod(nameOrSig) {
        return getVerificationMethod(nameOrSig);
    }
    getVerificationMethod(nameOrSig) {
        return getVerificationMethod(nameOrSig);
    }
    static isDataAuthentic(data, verificationOptions) {
        return isDataAuthentic(data, verificationOptions);
    }
    isDataAuthentic(data, verificationOptions) {
        return isDataAuthentic(data, verificationOptions);
    }
}
export default ERC725;
//# sourceMappingURL=index.js.map