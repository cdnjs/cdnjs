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
/**
 * @file lib/encodeKeyName.ts
 * @author Hugo Masclet <@Hugoo>
 * @date 2022
 */
import { isAddress, isHex } from 'web3-validator';
import { keccak256, leftPad, numberToHex, padLeft, padRight } from 'web3-utils';
import { encodeArrayKey, guessKeyTypeFromKeyName } from './utils';
// https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#mapping
const dynamicTypes = ['<string>', '<address>', '<bool>'];
// https://docs.soliditylang.org/en/v0.8.14/abi-spec.html#types
export const dynamicTypesRegex = /<(uint|int|bytes)(\d+)>/;
/**
 *
 * @param type <string>, <uintM>, <intM>, <bool>, <bytesM>, <address>.
 * @param value
 * @param bytes the number of bytes to keep / padding
 */
export const encodeDynamicKeyPart = (type, value_, bytes) => {
    let baseType = '';
    let size = 0;
    let value = value_;
    if (dynamicTypes.includes(type)) {
        baseType = type.slice(1, -1);
    }
    else {
        const regexMatch = type.match(dynamicTypesRegex);
        if (!regexMatch) {
            throw new Error(`Dynamic key: ${type} is not supported`);
        }
        // eslint-disable-next-line prefer-destructuring
        baseType = regexMatch[1];
        size = Number.parseInt(regexMatch[2], 10);
    }
    switch (baseType) {
        case 'string':
            return keccak256(value).slice(2, 2 + bytes * 2);
        case 'bool': {
            if (value !== 'true' && value !== 'false') {
                throw new Error(`Wrong value: ${value} for dynamic key with type: <bool>. Expected "true" or "false".`);
            }
            return leftPad(
            // In theory passing in 0x1 should also work
            value === 'true' || Number(value) === 1 ? 1 : 0, bytes * 2).slice(2);
        }
        case 'address': {
            if (!value.startsWith('0x')) {
                value = `0x${value}`;
            }
            if (!isAddress(value)) {
                throw new Error(`Wrong value: ${value} for dynamic key with type: <address>. Value is not an address.`);
            }
            return padLeft(value.slice(0, 2 + bytes * 2), bytes * 2)
                .slice(2)
                .toLowerCase(); // keys should not contain upper case chars (i.e. original checksummed stuff)
        }
        case 'uint': {
            if (size > 256 || size % 8 !== 0) {
                throw new Error(`Wrong dynamic key type: ${type}. 0 < M <= 256, M % 8 == 0. Got: ${size}.`);
            }
            // NOTE: we could verify if the number given is not too big for the given size.
            // e.g.: uint8 max value is 255, uint16 is 65535...
            let hex = numberToHex(value).slice(2);
            if (hex.length > size / 4) {
                throw new Error(`Value: ${value} is too big for uint${size}.`);
            }
            if (hex.length > bytes * 2) {
                hex = `0x${hex.slice(-bytes * 2)}`;
            }
            else {
                hex = `0x${hex}`;
            }
            return padLeft(hex, bytes * 2).slice(2);
        }
        case 'int':
            // TODO:
            throw new Error('The encoding of <intM> has not been implemented yet.');
        case 'bytes': {
            if (!value.startsWith('0x')) {
                value = `0x${value}`;
            }
            if (!isHex(value)) {
                throw new Error(`Wrong value: ${value} for dynamic key with type: $type. Value is not in hex.`);
            }
            if (value.length > 2 + size * 2) {
                throw new Error(`Wrong value: ${value} for dynamic key with type: $type. Value is too big.`);
            }
            return padRight(value.slice(0, 2 + bytes * 2), bytes * 2).slice(2);
        }
        default:
            throw new Error(`Dynamic key: ${type} is not supported`);
    }
};
// This function does not support multi dynamic types such as MyName:<string|address>
export function isDynamicKeyName(name) {
    if (name.startsWith('0x') && name.includes('<')) {
        return true;
    }
    const keyNameParts = name.split(':');
    for (let i = 0; i < keyNameParts.length; i++) {
        if (dynamicTypes.includes(keyNameParts[i]) ||
            keyNameParts[i].match(dynamicTypesRegex)) {
            return true;
        }
    }
    return false;
}
/**
 * Encodes a MappingWithGrouping with dynamic values, according to LSP-2 ERC725YJSONSchema.
 * https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#mapping
 * bytes10:bytes2(0):bytes20
 *
 *
 * @param name Ex: MyKeyName:<address>
 * @param dynamicKeyParts ['0xcafecafecafecafecafecafecafecafecafecafe']
 * @returns the encoded key
 */
const encodeDynamicMapping = (name, dynamicKeyParts) => {
    if (dynamicKeyParts.length !== 1) {
        throw new Error(`Dynamic key of type: Mapping expects exactly 1 variable. Got: ${dynamicKeyParts.length} (${dynamicKeyParts})`);
    }
    const keyNameSplit = name.split(':'); // LSP5ReceivedAssetsMap:<address>
    const encodedKey = keccak256(keyNameSplit[0]).slice(0, 22);
    return `${encodedKey}0000${encodeDynamicKeyPart(keyNameSplit[1], dynamicKeyParts[0], 20)}`;
};
/**
 * Encodes a MappingWithGrouping with dynamic values, according to LSP-2 ERC725YJSONSchema.
 * https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#mappingwithgrouping
 * bytes6:bytes4:bytes2(0):bytes20
 *
 * @param name
 * @param dynamicKeyParts
 * @returns the encoded key
 */
const encodeDynamicMappingWithGrouping = (name, dynamicKeyParts) => {
    const keyNameSplit = name.split(':'); // MyGroup:<string>:<address>
    let numberOfVariables = 0;
    if (isDynamicKeyName(keyNameSplit[1])) {
        numberOfVariables += 1;
    }
    if (isDynamicKeyName(keyNameSplit[2])) {
        numberOfVariables += 1;
    }
    if (numberOfVariables !== dynamicKeyParts.length) {
        throw new Error(`Can not encode dynamic key of type: MappingWithGrouping. Wrong number of arguments. Expects exactly ${numberOfVariables} variable(s), got: ${dynamicKeyParts.length} (${dynamicKeyParts})`);
    }
    const firstPart = keccak256(keyNameSplit[0]).slice(0, 14);
    let secondPart = '';
    if (keyNameSplit[1].startsWith('0x')) {
        secondPart = padRight(keyNameSplit[1].slice(0, 2 + 4 * 2), 4 * 2).slice(2);
    }
    else if (isDynamicKeyName(keyNameSplit[1])) {
        secondPart = encodeDynamicKeyPart(keyNameSplit[1], dynamicKeyParts[0], 4);
    }
    else {
        secondPart = keccak256(keyNameSplit[1]).slice(2, 2 + 4 * 2);
    }
    let lastPart = '';
    if (keyNameSplit[2].startsWith('0x')) {
        lastPart = padRight(keyNameSplit[2].slice(0, 2 + 20 * 2), 20 * 2).slice(2);
    }
    else if (isDynamicKeyName(keyNameSplit[2])) {
        lastPart = encodeDynamicKeyPart(keyNameSplit[2], dynamicKeyParts[dynamicKeyParts.length - 1], 20);
    }
    else {
        lastPart = keccak256(keyNameSplit[2]).slice(2, 2 + 20 * 2);
    }
    return `${firstPart}${secondPart}0000${lastPart}`;
};
function encodeDynamicKeyName(name, dynamicKeyParts) {
    if (!dynamicKeyParts) {
        throw new Error(`Can't encode dynamic key name: ${name} without dynamicKeyParts`);
    }
    const dynamicKeyPartsArray = typeof dynamicKeyParts === 'string' ? [dynamicKeyParts] : dynamicKeyParts;
    const keyType = guessKeyTypeFromKeyName(name);
    switch (keyType) {
        case 'Mapping':
            return encodeDynamicMapping(name, dynamicKeyPartsArray);
        case 'MappingWithGrouping':
            return encodeDynamicMappingWithGrouping(name, dynamicKeyPartsArray);
        default:
            throw new Error(`Could not encode dynamic key: ${name} of type: ${keyType}`);
    }
}
/**
 *
 * @param name the schema element name.
 * @param dynamicKeyParts
 *
 * @return the name of the key encoded as per specifications.
 */
export function encodeKeyName(name, dynamicKeyParts) {
    if (isDynamicKeyName(name)) {
        return encodeDynamicKeyName(name, dynamicKeyParts);
    }
    const keyType = guessKeyTypeFromKeyName(name);
    switch (keyType) {
        case 'MappingWithGrouping': {
            const keyNameSplit = name.split(':');
            return encodeDynamicMappingWithGrouping(`${keyNameSplit[0]}:<string>:<address>`, [keyNameSplit[1], keyNameSplit[2]]);
        }
        case 'Mapping': {
            const keyNameSplit = name.split(':');
            if (isAddress(keyNameSplit[1])) {
                return encodeDynamicMapping(`${keyNameSplit[0]}:<address>`, [
                    keyNameSplit[1],
                ]);
            }
            return encodeDynamicMapping(`${keyNameSplit[0]}:<string>`, [
                keyNameSplit[1],
            ]);
        }
        case 'Array': // Warning: this can not correctly encode subsequent keys of array, only the initial Array key will work
            // encode for array index
            if (dynamicKeyParts && typeof dynamicKeyParts === 'number') {
                return encodeArrayKey(keccak256(name), dynamicKeyParts);
            }
            // encode for array length
            return keccak256(name);
        case 'Singleton':
            return keccak256(name);
        default:
            return keccak256(name);
    }
}
export const generateDynamicKeyName = (name, dynamicKeyParts) => {
    let dynamicKeyPartsIndex = 0;
    const dynamicKeyPartsArray = typeof dynamicKeyParts === 'string' ? [dynamicKeyParts] : dynamicKeyParts;
    return name
        .split(':')
        .map((keyNamePart) => {
        if (!isDynamicKeyName(keyNamePart)) {
            return keyNamePart;
        }
        // We could add more checks to make sure the variable in dynamicKeyParts[i] is matching the type in the keyName
        if (!dynamicKeyPartsArray[dynamicKeyPartsIndex]) {
            throw new Error(`Can not generate key name: ${name}. Missing/not enough dynamicKeyParts: ${dynamicKeyPartsArray}`);
        }
        const dynamicKeyPart = dynamicKeyPartsArray[dynamicKeyPartsIndex];
        if (keyNamePart === '<address>') {
            if (!isAddress(dynamicKeyPart)) {
                throw new Error(`Dynamic key is expecting an <address> but got: ${dynamicKeyPart}`);
            }
        }
        // Add more checks for bytes, etc.
        dynamicKeyPartsIndex += 1;
        return dynamicKeyPart;
    })
        .join(':');
};
//# sourceMappingURL=encodeKeyName.js.map