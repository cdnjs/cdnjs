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
 * @file lib/encoder.ts
 * @author Robert McLeod <@robertdavid010>
 * @author Fabian Vogelsteller <fabian@lukso.network>
 * @author Hugo Masclet <@Hugoo>
 * @author Callum Grindle <@CallumGrindle>
 * @author Jean Cavallera <@CJ42>
 * @date 2023
 */
import { SUPPORTED_VERIFICATION_METHOD_STRINGS, NONE_VERIFICATION_METHOD, } from '../constants/constants';
import { getVerificationMethod, hashData, countNumberOfBytes, isValidUintSize, countSignificantBits, isValidByteSize, isValueContentLiteralHex, negateSignedBigInt, } from './utils';
import { bytesToHex, concat, decodeAbiParameters, encodeAbiParameters, encodePacked, getAddress, hexToBytes, hexToNumber, hexToString, isAddress, isHex, numberToHex, pad, size, slice, stringToHex, toHex, } from 'viem';
const uintNValueTypeRegex = /^u?int(\d+)(\+?)$/;
const bytesNValueTypeRegex = /^bytes(\d+)$/;
const BytesNValueContentRegex = /Bytes(\d+)/;
export const encodeDataSourceWithHash = (verification, dataSource) => {
    const verificationMethod = getVerificationMethod(verification?.method || NONE_VERIFICATION_METHOD);
    return concat([
        '0x0000',
        verificationMethod?.sig ?? '0x00000000',
        verification?.data
            ? pad(toHex(size(verification.data)), {
                size: 2,
            })
            : '0x0000',
        verification?.data ?? '0x',
        toHex(dataSource),
    ]);
};
export const decodeDataSourceWithHash = (value) => {
    if (value.slice(0, 6) === '0x0000') {
        // DEAL with VerifiableURI
        // NOTE: A JSONURL with a 0x00000000 verification method is invalid.
        /*
          0        1         2         3         4         5         6         7         8
          12345678901234567890123456789012345678901234567890123456789012345678901234567890
          0x0000 code
                6f357c6a hash fn [6]
                        0020 data len [14]
                            820464ddfac1be...[18 + data len]
                                                           [18 + data len]...696670733a2f2...[...rest]
        */
        const verificationMethodSignature = `0x${value.slice(6, 14)}`;
        // NOTE: verificationMethodSignature can be 0x00000000 if no verification method is used
        // this means that an invalid verification method should still return all data
        // and not be an error. It's up to the method calling this to figure out
        // whether an unknown verification method is an error or not.
        const verificationMethod = getVerificationMethod(verificationMethodSignature);
        const encodedLength = `0x${value.slice(14, 18)}`; // Rest of data string after function hash
        const dataLength = hexToNumber(encodedLength);
        const dataHash = `0x${value.slice(18, 18 + dataLength * 2)}`; // Get jsonHash 32 bytes
        const dataSource = hexToString(`0x${value.slice(18 + dataLength * 2)}`); // Get remainder as URI
        return {
            verification: {
                method: verificationMethod?.name || verificationMethodSignature,
                data: dataHash,
            },
            url: dataSource,
        };
    }
    // @Deprecated code here:
    // Eventually we should no longer have JSONURL, AssetURL or (bytes4,URI)
    // DEAL with JSONURL
    const verificationMethodSignature = value.slice(0, 10);
    const verificationMethod = getVerificationMethod(verificationMethodSignature);
    const encodedData = value.slice(10); // Rest of data string after function hash
    try {
        // Special case where JSONURL is really (bytes4,URI) as specified
        // by the old version of LSP8TokenMetadataBaseURI
        // Catch error in case the buffor is not convertable to utf8.
        const dataSource = hexToString(`0x${encodedData}`); // Get as URI
        if (encodedData.length < 64 || /^[a-z]{2,}:[/\S]/.test(dataSource)) {
            // If the verification data starts with a utf8 sequence that looks like https:/ or data: or ar:/ for example.
            return {
                verification: {
                    method: NONE_VERIFICATION_METHOD,
                    data: '0x',
                },
                url: dataSource,
            };
        }
    }
    catch {
        // ignore
    }
    const dataHash = slice(`0x${encodedData}`, 0, 32); // Get jsonHash 32 bytes
    const dataSource = hexToString(slice(`0x${encodedData}`, 32)); // Get remainder as URI
    return {
        verification: {
            method: verificationMethod?.name || verificationMethodSignature,
            data: dataHash,
        },
        url: dataSource,
    };
};
const encodeToBytesN = (bytesN, value) => {
    const numberOfBytesInType = Number.parseInt(bytesN.split('bytes')[1], 10);
    let valueToEncode;
    if (!isHex(value)) {
        // if we receive a plain string (e.g: "hey!"), convert it to utf8-hex data
        valueToEncode = toHex(value);
    }
    else if (typeof value === 'number') {
        // if we receive a number as input, convert it to hex,
        // despite `bytesN` pads on the right, we pad number on the left side here
        // to symmetrically encode / decode
        valueToEncode = pad(numberToHex(value), {
            size: numberOfBytesInType,
        });
    }
    else {
        valueToEncode = value;
    }
    const numberOfBytesInValue = countNumberOfBytes(valueToEncode);
    if (typeof value === 'number' || typeof value === 'bigint') {
        valueToEncode = pad(valueToEncode, {
            size: numberOfBytesInType,
        });
    }
    else {
        valueToEncode = pad(valueToEncode, {
            size: numberOfBytesInType,
            dir: 'right',
        });
    }
    if (numberOfBytesInValue > numberOfBytesInType) {
        throw new Error(`Can't convert ${value} to ${bytesN}. Too many bytes, expected at most ${numberOfBytesInType} bytes, received ${numberOfBytesInValue}.`);
    }
    const abiEncodedValue = encodeAbiParameters([{ type: bytesN, name: '' }], [valueToEncode]);
    // abi-encoding right pads to 32 bytes, if we need less, we need to remove the padding
    if (numberOfBytesInType === 32) {
        return abiEncodedValue;
    }
    const bytesArray = hexToBytes(abiEncodedValue);
    return bytesToHex(bytesArray.slice(0, numberOfBytesInType));
};
/**
 * Encodes bytes to CompactBytesArray
 *
 * @param values An array of BytesLike strings
 * @returns bytes[CompactBytesArray]
 */
const encodeCompactBytesArray = (values) => {
    const compactBytesArray = values
        .filter((value, index) => {
        if (value === '') {
            return '0x';
        }
        if (!isHex(value)) {
            throw new Error(`Couldn't encode bytes[CompactBytesArray], value at index ${index} is not hex`);
        }
        if (value.length > 65_535 * 2 + 2) {
            throw new Error(`Couldn't encode bytes[CompactBytesArray], value at index ${index} exceeds 65_535 bytes`);
        }
        return true;
    })
        .reduce((acc, value) => {
        const numberOfBytes = value.slice(2).length / 2;
        const hexNumber = pad(numberToHex(numberOfBytes), {
            size: 2,
        });
        return concat([acc, hexNumber, value]);
    }, '0x');
    return compactBytesArray;
};
/**
 * Decodes CompactBytesArray of type bytes
 *
 * @param compactBytesArray A bytes[CompactBytesArray]
 * @returns An array of BytesLike strings decode from `compactBytesArray`
 */
const decodeCompactBytesArray = (compactBytesArray, consumed) => {
    if (!isHex(compactBytesArray))
        throw new Error("Couldn't decode, value is not hex");
    const encodedValues = [];
    let current = compactBytesArray;
    while (size(current) > 0) {
        const length = hexToNumber(slice(current, 0, 2));
        if (length === 0) {
            // empty entries (`0x0000`) in a CompactBytesArray are returned as empty entries in the array
            encodedValues.push('');
            current = slice(current, 2);
            if (consumed) {
                consumed.bytes += 2;
            }
        }
        else {
            if (length > size(current) - 2) {
                throw new Error("Couldn't decode bytes[CompactBytesArray] (invalid array item length)");
            }
            encodedValues.push(slice(current, 2, 2 + length));
            if (consumed) {
                consumed.bytes += 2 + length;
            }
            if (size(current) === 2 + length) {
                break;
            }
            current = slice(current, 2 + length);
        }
    }
    return encodedValues;
};
/**
 * Encodes bytesN to CompactBytesArray
 *
 * @param values An array of BytesLike strings
 * @param numberOfBytes The number of bytes for each value from `values`
 * @returns bytesN[CompactBytesArray]
 */
const encodeBytesNCompactBytesArray = (values, numberOfBytes) => {
    values.forEach((value, index) => {
        if (size(value) > numberOfBytes)
            throw new Error(`Hex bytes${numberOfBytes} value at index ${index} does not fit in ${numberOfBytes} bytes`);
    });
    return encodeCompactBytesArray(values);
};
/**
 * Decodes CompactBytesArray of type bytesN
 *
 * @param compactBytesArray A bytesN[CompactBytesArray]
 * @param numberOfBytes The number of bytes allowed per each element from `compactBytesArray`
 * @returns An array of BytesLike strings decoded from `compactBytesArray`
 */
const decodeBytesNCompactBytesArray = (compactBytesArray, numberOfBytes, consumed) => {
    const bytesValues = decodeCompactBytesArray(compactBytesArray, consumed);
    bytesValues.forEach((bytesValue, index) => {
        if (size(bytesValue) > numberOfBytes)
            throw new Error(`Hex bytes${numberOfBytes} value at index ${index} does not fit in ${numberOfBytes} bytes`);
    });
    return bytesValues;
};
/**
 * @returns Encoding/decoding for bytes1[CompactBytesArray] to bytes32[COmpactBytesArray]
 */
const returnTypesOfBytesNCompactBytesArray = () => {
    const types = {};
    for (let i = 1; i < 33; i++) {
        types[`bytes${i}[CompactBytesArray]`] = {
            encode: (value) => encodeBytesNCompactBytesArray(value, i),
            decode: (value, consumed) => decodeBytesNCompactBytesArray(value, i, consumed),
        };
    }
    return types;
};
/**
 * Encodes uintN to CompactBytesArray
 * @param values An array of BytesLike strings
 * @param numberOfBytes The number of bytes for each value from `values`
 * @returns uintN[CompactBytesArray]
 */
const encodeUintNCompactBytesArray = (values, numberOfBytes) => {
    const hexValues = values.map((value, index) => {
        const hexNumber = pad(numberToHex(value), {
            size: numberOfBytes,
        });
        if (hexNumber.slice(2).length > numberOfBytes * 2)
            throw new Error(`Hex uint${numberOfBytes * 8} value at index ${index} does not fit in ${numberOfBytes} bytes`);
        return hexNumber;
    });
    return encodeCompactBytesArray(hexValues);
};
/**
 * Decodes CompactBytesArray of type uintN
 * @param compactBytesArray A uintN[CompactBytesArray]
 * @param numberOfBytes The number of bytes allowed per each element from `compactBytesArray`
 * @returns An array of numbers decoded from `compactBytesArray`
 */
const decodeUintNCompactBytesArray = (compactBytesArray, numberOfBytes) => {
    const hexValues = decodeCompactBytesArray(compactBytesArray);
    return hexValues.map((hexValue, index) => {
        const hexValueStripped = hexValue.slice(2);
        if (hexValueStripped.length > numberOfBytes * 2)
            throw new Error(`Hex uint${numberOfBytes * 8} value at index ${index} does not fit in ${numberOfBytes} bytes`);
        return BigInt(hexValue);
    });
};
/**
 * @returns Encoding/decoding for uint8[CompactBytesArray] to uint256[COmpactBytesArray]
 */
const returnTypesOfUintNCompactBytesArray = () => {
    const types = {};
    for (let i = 1; i < 33; i++) {
        types[`uint${i * 8}[CompactBytesArray]`] = {
            encode: (value) => encodeUintNCompactBytesArray(value, i),
            decode: (value) => decodeUintNCompactBytesArray(value, i),
        };
    }
    return types;
};
/**
 * Encodes any set of strings to string[CompactBytesArray]
 *
 * @param values An array of non restricted strings
 * @returns string[CompactBytesArray]
 */
const encodeStringCompactBytesArray = (values) => {
    const hexValues = values.map((element) => stringToHex(element));
    return encodeCompactBytesArray(hexValues);
};
/**
 * Decode a string[CompactBytesArray] to an array of strings
 * @param compactBytesArray A string[CompactBytesArray]
 * @returns An array of strings
 */
const decodeStringCompactBytesArray = (compactBytesArray, consumed) => {
    const hexValues = decodeCompactBytesArray(compactBytesArray, consumed);
    const stringValues = hexValues.map((element) => hexToString(element));
    return stringValues;
};
function _decodeParameter(type) {
    return (value, consumed) => {
        // we need to abi-encode the value again to ensure that:
        //  - that data to decode does not go over N bytes.
        //  - if the data is less than N bytes, that it gets padded to N bytes long.
        let actualType = type;
        const [, baseType, bitSize, append] = /^(u?int)(\d*)(.*)$/.exec(type) || [];
        if (baseType && !isValidUintSize(Number.parseInt(bitSize, 10))) {
            throw new Error(`Invalid \`${type}\` provided. Expected a multiple of 8 bits between 8 and 256.`);
        }
        const numberOfBits = Number.parseInt(bitSize, 10);
        if (type === 'address') {
            actualType = 'bytes20';
        }
        else if (baseType) {
            const byteSize = numberOfBits / 8;
            actualType = `bytes${byteSize}${append}`; // decode as if they are bytes to make sure it's always right padded.
        }
        try {
            let result = decodeAbiParameters([{ type: actualType, name: '' }], `${value}0000000000000000000000000000000000000000000000000000000000000000`)[0];
            if (bitSize) {
                const convert = (value) => {
                    const isLikelyNegative = value.startsWith('0xff');
                    const result = BigInt(value);
                    if (!type.startsWith('u') && isLikelyNegative) {
                        return -negateSignedBigInt(result, numberOfBits);
                    }
                    return result;
                };
                result = Array.isArray(result)
                    ? result.map((result) => convert(result))
                    : convert(result);
            }
            if (consumed) {
                const out = type.endsWith(']')
                    ? encodeAbiParameters([{ type: actualType }], [result])
                    : encodePacked([type], [result]);
                const length = size(out);
                consumed.bytes += length;
            }
            return result;
        }
        catch (error) {
            throw new Error(`Error decoding value "${value}" as type "${type}": ${error instanceof Error ? error.message : String(error)}`);
        }
    };
}
const valueTypeEncodingMap = (type) => {
    const uintNRegexMatch = type.match(uintNValueTypeRegex);
    const bytesNRegexMatch = type.match(bytesNValueTypeRegex);
    const bytesLength = bytesNRegexMatch
        ? Number.parseInt(bytesNRegexMatch[1], 10)
        : '';
    const uintLength = uintNRegexMatch
        ? Number.parseInt(uintNRegexMatch[1], 10)
        : 0;
    if (type.includes('[CompactBytesArray]')) {
        const compactBytesArrayMap = {
            'bytes[CompactBytesArray]': {
                encode: (value) => encodeCompactBytesArray(value),
                decode: (value, consumed) => decodeCompactBytesArray(value, consumed),
            },
            'string[CompactBytesArray]': {
                encode: (value) => encodeStringCompactBytesArray(value),
                decode: (value, consumed) => decodeStringCompactBytesArray(value, consumed),
            },
            ...returnTypesOfBytesNCompactBytesArray(),
            ...returnTypesOfUintNCompactBytesArray(),
        };
        return compactBytesArrayMap[type];
    }
    if (type === 'bytes') {
        return {
            encode: (value) => isHex(value) ? value.toLowerCase() : toHex(value),
            decode: (value, consumed) => {
                if (consumed) {
                    const length = size(value);
                    consumed.bytes += length;
                }
                return value;
            },
        };
    }
    switch (type) {
        case 'bool':
        case 'boolean':
            return {
                encode: (value) => (value ? '0x01' : '0x00'),
                decode: (value, consumed) => {
                    if (consumed) {
                        consumed.bytes += 1;
                    }
                    return slice(value, 0, 1) === '0x01';
                },
            };
        case 'string':
            return {
                encode: (value) => {
                    // if we receive a number as input, convert each letter to its utf8 hex representation
                    if (typeof value === 'number') {
                        return stringToHex(`${value}`);
                    }
                    return stringToHex(value);
                },
                decode: (value, consumed) => {
                    if (consumed) {
                        consumed.bytes += size(value);
                    }
                    return hexToString(value);
                },
            };
        case 'address':
            return {
                encode: (value) => {
                    // abi-encode pads to 32 x 00 bytes on the left, so we need to remove them
                    const abiEncodedValue = encodeAbiParameters([{ type: 'address' }], [
                        value,
                    ]);
                    // convert to an array of individual bytes
                    const bytesArray = hexToBytes(abiEncodedValue);
                    // just keep the last 20 bytes, starting at index 12
                    return bytesToHex(slice(bytesArray, 12));
                },
                decode: (value, consumed) => {
                    const out = _decodeParameter('address')(value, consumed);
                    return getAddress(out);
                },
            };
        // NOTE: We could add conditional handling of numeric values here...
        case `int${uintLength}`:
            return {
                encode: (value) => {
                    if (!isValidUintSize(uintLength)) {
                        throw new Error(`Can't encode ${value} as ${type}. Invalid \`uintN\` provided. Expected a multiple of 8 bits between 8 and 256.`);
                    }
                    const abiEncodedValue = encodeAbiParameters([{ type }], [value]);
                    const bytesArray = hexToBytes(abiEncodedValue);
                    const numberOfBytes = uintLength / 8;
                    // abi-encoding always pad to 32 bytes. We need to keep the `n` rightmost bytes.
                    // where `n` = `numberOfBytes`
                    const startIndex = 32 - numberOfBytes;
                    return bytesToHex(bytesArray.slice(startIndex));
                },
                decode: (value, consumed) => {
                    const typeLength = (uintLength / 8) * 2 + 2;
                    let actualType = type;
                    if (value.length < typeLength) {
                        actualType = `int${Math.round((value.length - 2) / 2) * 8}`;
                    }
                    const out = _decodeParameter(actualType)(value, consumed);
                    return out;
                },
            };
        case `uint${uintLength}`:
            return {
                encode: (value) => {
                    if (!isValidUintSize(uintLength)) {
                        throw new Error(`Can't encode ${value} as ${type}. Invalid \`uintN\` provided. Expected a multiple of 8 bits between 8 and 256.`);
                    }
                    const abiEncodedValue = encodeAbiParameters([{ type, name: '' }], [value]);
                    const numberOfBits = countSignificantBits(abiEncodedValue);
                    if (numberOfBits > uintLength) {
                        throw new Error(`Can't represent value ${value} as ${type}. To many bits required ${numberOfBits} > ${uintLength}`);
                    }
                    const bytesArray = hexToBytes(abiEncodedValue);
                    const numberOfBytes = uintLength / 8;
                    // abi-encoding always pad to 32 bytes. We need to keep the `n` rightmost bytes.
                    // where `n` = `numberOfBytes`
                    const startIndex = 32 - numberOfBytes;
                    return bytesToHex(bytesArray.slice(startIndex));
                },
                decode: _decodeParameter(type),
            };
        case `uint${uintLength}\+`:
            return {
                encode: (value) => {
                    if (!isValidUintSize(uintLength)) {
                        throw new Error(`Can't encode ${value} as ${type}. Invalid \`uintN\` provided. Expected a multiple of 8 bits between 8 and 256.`);
                    }
                    const abiEncodedValue = encodeAbiParameters([{ type }], [value]);
                    const numberOfBits = countSignificantBits(abiEncodedValue);
                    if (numberOfBits > uintLength) {
                        throw new Error(`Can't represent value ${value} as ${type}. To many bits required ${numberOfBits} > ${uintLength}`);
                    }
                    const bytesArray = hexToBytes(abiEncodedValue);
                    const numberOfBytes = uintLength / 8;
                    // abi-encoding always pad to 32 bytes. We need to keep the `n` rightmost bytes.
                    // where `n` = `numberOfBytes`
                    const startIndex = 32 - numberOfBytes;
                    return bytesToHex(bytesArray.slice(startIndex));
                },
                decode: (value, consumed) => {
                    const byteLength = (value.length - 2) / 2;
                    const typeLength = Math.min(byteLength * 8, 256);
                    // Allow sizes smaller or larger, but consume the whole thing.
                    // This is used for arrayLengths.
                    return _decodeParameter(`uint${typeLength}`)(value, consumed);
                },
            };
        case `bytes${bytesLength}`:
            return {
                encode: (value) => {
                    if (!isValidByteSize(bytesLength)) {
                        throw new Error(`Can't encode ${value} as ${type}. Invalid \`bytesN\` provided. Expected a \`N\` value for bytesN between 1 and 32.`);
                    }
                    return encodeToBytesN(type, value);
                },
                decode: _decodeParameter(type),
            };
        case 'bool[]':
            return {
                encode: (value) => encodeAbiParameters([{ type: 'bool[]' }], [value]),
                decode: _decodeParameter('bool[]'),
            };
        case 'boolean[]':
            return {
                encode: (value) => encodeAbiParameters([{ type: 'bool[]' }], [value]),
                decode: _decodeParameter('bool[]'),
            };
        case 'string[]':
            return {
                encode: (value) => encodeAbiParameters([{ type: 'string[]' }], [value]),
                decode: _decodeParameter('string[]'),
            };
        case 'address[]':
            return {
                encode: (value) => encodeAbiParameters([{ type: 'address[]' }], [value]),
                decode: _decodeParameter('address[]'),
            };
        case 'uint256[]':
            return {
                encode: (value) => encodeAbiParameters([{ type: 'uint256[]' }], [value]),
                decode: (value, consumed) => {
                    // we want to return an array of numbers as [1, 2, 3], not an array of strings as [ '1', '2', '3']
                    return (_decodeParameter('uint256[]')(value, consumed) || []).map((numberAsString) => {
                        try {
                            return Number(numberAsString);
                        }
                        catch {
                            return BigInt(numberAsString);
                        }
                    });
                },
            };
        case 'bytes32[]':
            return {
                encode: (value) => encodeAbiParameters([{ type: 'bytes32[]' }], [value]),
                decode: _decodeParameter('bytes32[]'),
            };
        case 'bytes4[]':
            return {
                encode: (value) => encodeAbiParameters([{ type: 'bytes4[]' }], [value]),
                decode: _decodeParameter('bytes4[]'),
            };
        case 'bytes[]':
            return {
                encode: (value) => encodeAbiParameters([{ type: 'bytes[]' }], [value]),
                decode: _decodeParameter('bytes[]'),
            };
        case 'bytes[CompactBytesArray]':
            return {
                encode: (value) => encodeCompactBytesArray(value),
                decode: (value, consumed) => decodeCompactBytesArray(value, consumed),
            };
        case 'string[CompactBytesArray]':
            return {
                encode: (value) => encodeStringCompactBytesArray(value),
                decode: (value, consumed) => decodeStringCompactBytesArray(value, consumed),
            };
        default:
            return {
                encode: (value) => {
                    throw new Error(`Could not encode ${value}. Value type ${type} is unknown`);
                },
                decode: (value, _consumed) => {
                    throw new Error(`Could not decode ${value}. Value type ${type} is unknown`);
                },
            };
    }
};
// Use enum for type below
// Is it this enum ERC725JSONSchemaValueType? (If so, custom is missing from enum)
export const valueContentEncodingMap = (valueContent) => {
    const bytesNRegexMatch = valueContent.match(BytesNValueContentRegex);
    const bytesLength = bytesNRegexMatch
        ? Number.parseInt(bytesNRegexMatch[1], 10)
        : '';
    switch (valueContent) {
        case 'Keccak256': {
            return {
                type: 'bytes32',
                encode: (value) => value,
                decode: (value) => value,
            };
        }
        case 'Number': {
            return {
                type: 'uint256',
                encode: (value) => {
                    let parsedValue;
                    try {
                        parsedValue = Number.parseInt(value, 10);
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                    return pad(numberToHex(parsedValue), { size: 32 });
                },
                decode: (value) => BigInt(value),
            };
        }
        // NOTE: This is not symmetrical, and always returns a checksummed address
        case 'Address': {
            return {
                type: 'address',
                encode: (value) => {
                    if (isAddress(value)) {
                        return value.toLowerCase();
                    }
                    throw new Error(`Address: "${value}" is an invalid address.`);
                },
                decode: (value) => {
                    try {
                        return getAddress(value);
                    }
                    catch {
                        throw new Error(`Address: "${value}" is an invalid address.`);
                    }
                },
            };
        }
        case 'String': {
            return {
                type: 'string',
                encode: (value) => stringToHex(value),
                decode: (value) => hexToString(value),
            };
        }
        case 'Markdown': {
            return {
                type: 'string',
                encode: (value) => stringToHex(value),
                decode: (value) => hexToString(value),
            };
        }
        case 'URL': {
            return {
                type: 'string',
                encode: (value) => stringToHex(value),
                decode: (value) => hexToString(value),
            };
        }
        // https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#verifiableuri
        case 'AssetURL': // Deprecated since v0.22.0
        case 'JSONURL': // Deprecated since v0.22.0
        case 'VerifiableURI': {
            return {
                type: 'custom',
                encode: (dataToEncode) => {
                    const { verification: { data, method } = {}, json, url, } = dataToEncode;
                    let hashedJson = data;
                    if (json) {
                        if (method) {
                            throw new Error('When passing in the `json` property, we use "keccak256(utf8)" as a default verification method. You do not need to set a `verification.method`.');
                        }
                        hashedJson = hashData(json, SUPPORTED_VERIFICATION_METHOD_STRINGS.KECCAK256_UTF8);
                    }
                    if (!hashedJson) {
                        throw new Error('You have to provide either the verification.data or the json via the respective properties');
                    }
                    return encodeDataSourceWithHash({
                        method: method ||
                            SUPPORTED_VERIFICATION_METHOD_STRINGS.KECCAK256_UTF8,
                        data: hashedJson || '0x',
                    }, url);
                },
                decode: (dataToDecode) => decodeDataSourceWithHash(dataToDecode),
            };
        }
        case `Bytes${bytesLength}`: {
            return {
                type: 'bytes',
                encode: (value) => {
                    if (typeof value !== 'string' || !isHex(value)) {
                        throw new Error(`Value: ${value} is not hex.`);
                    }
                    if (bytesLength && !isValidByteSize(bytesLength)) {
                        throw new Error(`Provided bytes length: ${bytesLength} for encoding valueContent: ${valueContent} is not valid.`);
                    }
                    if (bytesLength && value.length !== 2 + bytesLength * 2) {
                        throw new Error(`Value: ${value} is not of type ${valueContent}. Expected hex value of length ${2 + bytesLength * 2}`);
                    }
                    return value;
                },
                decode: (value) => {
                    if (typeof value !== 'string' || !isHex(value)) {
                        console.error(`Value: ${value} is not hex.`);
                        return null;
                    }
                    if (bytesLength && !isValidByteSize(bytesLength)) {
                        // This is a schema error and not a data error so we can throw it.
                        throw new Error(`Provided bytes length: ${bytesLength} for encoding valueContent: ${valueContent} is not valid.`);
                    }
                    if (bytesLength && value.length !== 2 + bytesLength * 2) {
                        console.error(`Value: ${value} is not of type ${valueContent}. Expected hex value of length ${2 + bytesLength * 2}`);
                        return null;
                    }
                    return value;
                },
            };
        }
        case 'BitArray': {
            return {
                type: 'bytes',
                encode: (value) => {
                    if (typeof value !== 'string' || !isHex(value)) {
                        throw new Error(`Value: ${value} is not hex.`);
                    }
                    return value;
                },
                decode: (value) => {
                    if (typeof value !== 'string' || !isHex(value)) {
                        console.error(`Value: ${value} is not hex.`);
                        return null;
                    }
                    return value;
                },
            };
        }
        case 'Boolean': {
            return {
                type: 'bool',
                encode: (value) => {
                    return valueTypeEncodingMap('bool').encode(value);
                },
                decode: (value, consumed) => {
                    return valueTypeEncodingMap('bool').decode(value, consumed);
                },
            };
        }
        default: {
            return {
                type: 'unknown',
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                encode: (_value) => {
                    throw new Error(`Could not encode unknown (${valueContent}) valueContent.`);
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                decode: (_value) => {
                    throw new Error(`Could not decode unknown (${valueContent}) valueContent.`);
                },
            };
        }
    }
};
export function encodeValueType(type, // for tuples and CompactBytesArray,
value) {
    if (typeof value === 'undefined' || value === null) {
        return value;
    }
    return valueTypeEncodingMap(type).encode(value);
}
export function decodeValueType(type, // for tuples and CompactBytesArray
data, consumed) {
    if (data === '0x')
        return null;
    if (typeof data === 'undefined' || data === null) {
        return data;
    }
    return valueTypeEncodingMap(type).decode(data, consumed);
}
export function encodeValueContent(valueContent, value) {
    if (isValueContentLiteralHex(valueContent)) {
        // hex characters are always lower case, even if the schema define some hex words uppercase
        // e.g: 0xAabbcCddeE -> encoded as 0xaabbccddee
        return valueContent === value ? value.toLowerCase() : '0x';
    }
    const valueContentEncodingMethods = valueContentEncodingMap(valueContent);
    if (!valueContentEncodingMethods) {
        throw new Error(`Could not encode valueContent: ${valueContent}.`);
    }
    if (value === null || value === undefined) {
        return '0x';
    }
    if ((valueContent === 'AssetURL' ||
        valueContent === 'JSONURL' ||
        valueContent === 'Boolean') &&
        typeof value === 'string') {
        const expectedValueType = valueContent === 'Boolean' ? 'boolean' : 'object';
        throw new Error(`Could not encode valueContent: ${valueContent} with value: ${value}. Expected ${expectedValueType}.`);
    }
    return valueContentEncodingMethods.encode(value);
}
export function decodeValueContent(valueContent, value) {
    if (isValueContentLiteralHex(valueContent)) {
        return valueContent.toLowerCase() === value ? valueContent : null;
    }
    if (value == null || value === '0x') {
        // !value allows 0 values to become null.
        return null;
    }
    return valueContentEncodingMap(valueContent).decode(value);
}
//# sourceMappingURL=encoder.js.map