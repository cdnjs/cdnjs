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
 * @file lib/decodeData.ts
 * @author Robert McLeod <@robertdavid010>
 * @author Hugo Masclet <@Hugoo>
 * @author Callum Grindle <@CallumGrindle>
 * @date 2023
 */
import { COMPACT_BYTES_ARRAY_STRING, COMPACT_BYTES_ARRAY_STRING_AT_END, } from '../constants/constants';
import { ALL_VALUE_TYPES, isValidValueType, } from '../types/ERC725JSONSchema';
import { isDynamicKeyName } from './encodeKeyName';
import { valueContentEncodingMap, decodeValueType } from './encoder';
import { getSchemaElement } from './getSchemaElement';
import { countNumberOfBytes, decodeKeyValue, encodeArrayKey } from './utils';
import { isHex, size, slice } from 'viem';
const tupleValueTypesRegex = /bytes(\d+)/;
const valueContentsBytesRegex = /Bytes(\d+)/;
const isValidTupleDefinition = (tupleContent) => {
    if (tupleContent.length <= 2) {
        return false;
    }
    if (tupleContent[0] !== '(' &&
        tupleContent[tupleContent.length - 1] !== ')') {
        return false;
    }
    return true;
};
const extractTupleElements = (tupleContent) => tupleContent.substring(1, tupleContent.length - 1).split(',');
export const isValidTuple = (valueType, valueContent) => {
    if (!isValidTupleDefinition(valueType) ||
        !isValidTupleDefinition(valueContent)) {
        return false;
    }
    // At this stage, we can assume the user is trying to use a tuple,
    // let's throw errors instead of returning false
    // Sanitize the string to keep only the tuple, if we are dealing with `CompactBytesArray`
    const valueTypeToDecode = valueType.replace(COMPACT_BYTES_ARRAY_STRING, '');
    const valueTypeParts = extractTupleElements(valueTypeToDecode);
    const valueContentParts = extractTupleElements(valueContent);
    if (valueTypeParts.length !== valueContentParts.length) {
        throw new Error(`Invalid tuple for valueType: ${valueType} / valueContent: ${valueContent}. They should have the same number of elements. Got: ${valueTypeParts.length} and ${valueContentParts.length}`);
    }
    for (let i = 0; i < valueTypeParts.length; i++) {
        if (!isValidValueType(valueTypeParts[i])) {
            throw new Error(`Invalid tuple for valueType: ${valueType} / valueContent: ${valueContent}. Type: ${valueTypeParts[i]} is not valid. Valid types are: ${ALL_VALUE_TYPES}`);
        }
        const valueTypeBytesLength = valueTypeParts[i]
            .replace(/\[.*?\]$/, '')
            .split('bytes')[1];
        if (valueTypeParts[i].match(tupleValueTypesRegex) &&
            valueContentParts[i].match(valueContentsBytesRegex)) {
            const valueContentBytesLength = valueContentParts[i].slice(5);
            if (valueTypeBytesLength > valueContentBytesLength) {
                throw new Error(`Invalid tuple (${valueType},${valueContent}: ${valueType[i]} cannot fit in ${valueContent[i]}`);
            }
        }
        if (valueContentEncodingMap(valueContentParts[i]).type === 'unknown' &&
            valueContentParts[i].slice(0, 5) !== 'Bytes' &&
            valueContentParts[i].slice(0, 2) !== '0x') {
            throw new Error(`Invalid tuple for valueType: ${valueType} / valueContent: ${valueContent}. valueContent of type: ${valueContentParts[i]} is not valid`);
        }
        if (isHex(valueContentParts[i], { strict: true })) {
            // check if length of a hex literal in valueContent (e.g: 0x122334455)
            // is compatible with the valueType (e.g: bytes4)
            const hexLiteralLength = valueContentParts[i].length - 2;
            if (Number.parseInt(valueTypeBytesLength, 10) < hexLiteralLength) {
                throw new Error(`Invalid tuple (${valueType},${valueContent}: ${valueContent[i]} cannot fit in ${valueType[i]}`);
            }
        }
        else if (valueContentParts[i].startsWith('0x')) {
            // Value starts with 0x bit is not hex... hmmm... weird :)
            throw new Error(`Invalid tuple for valueType: ${valueType} / valueContent: ${valueContent}. valueContent of type: ${valueContentParts[i]} is not a valid hex value`);
        }
    }
    return true;
};
export const decodeTupleKeyValue = (valueContent, // i.e. (bytes4,Number,bytes16)
valueType, // i.e. (bytes4,bytes8,bytes16)
value) => {
    // We assume data has already been validated at this stage
    // Sanitize the string to keep only the tuple, if we are dealing with `CompactBytesArray`
    const valueTypeToDecode = valueType.replace(COMPACT_BYTES_ARRAY_STRING_AT_END, '');
    const valueTypeParts = extractTupleElements(valueTypeToDecode);
    const valueContentParts = extractTupleElements(valueContent);
    const consumed = {
        bytes: 0,
    };
    const total = size(value);
    const output = valueTypeParts.map((valueTypePart, index) => {
        return decodeKeyValue(valueContentParts[index], valueTypePart, consumed.bytes < size(value) ? slice(value, consumed.bytes) : '0x', consumed);
    });
    if (total !== consumed.bytes) {
        throw new Error('Tuple value is the wrong length returning null');
    }
    return output;
};
/**
 *
 * @param schema is an object of a schema definitions.
 * @param value will be either key-value pairs for a key type of Array, or a single value for type Singleton.
 *
 * @return the decoded value/values as per the schema definition.
 */
export function decodeKey(schema, value) {
    const lowerCaseKeyType = schema.keyType.toLowerCase();
    switch (lowerCaseKeyType) {
        case 'array': {
            // If user has requested a key which does not exist in the contract, value will be: 0x and value.find() will fail.
            if (!value || value === '0x') {
                return [];
            }
            // Decode as a Number when when the encoded value is to set the Array length only
            if (typeof value === 'string' &&
                countNumberOfBytes(value) === 16) {
                return decodeKeyValue('Number', 'uint128+', value, schema.name) || 0;
            }
            const valueElement = value.find((e) => e.key === schema.key);
            // Handle empty/non-existent array
            if (!valueElement) {
                return [];
            }
            const consumed = {
                bytes: 0,
                name: schema.name,
            };
            const arrayLength = decodeKeyValue('Number', 'uint128+', valueElement.value, consumed) || 0;
            const results = [];
            // This will not run if no match or arrayLength
            for (let index = 0; index < arrayLength; index++) {
                const dataElement = value.find((e) => e.key === encodeArrayKey(schema.key, index));
                if (dataElement) {
                    results.push(decodeKeyValue(schema.valueContent, schema.valueType, dataElement.value, consumed));
                }
            } // end for loop
            return results;
        }
        case 'mappingwithgrouping':
        case 'singleton':
        case 'mapping': {
            if (Array.isArray(value)) {
                const newValue = value.find((e) => e.key === schema.key);
                // Handle empty or non-values
                if (!newValue) {
                    return null;
                }
                return decodeKeyValue(schema.valueContent, schema.valueType, newValue.value, schema.name);
            }
            if (schema.valueType.endsWith(COMPACT_BYTES_ARRAY_STRING)) {
                const valueType = schema.valueType.replace(COMPACT_BYTES_ARRAY_STRING_AT_END, '');
                const valueContent = schema.valueContent.replace(COMPACT_BYTES_ARRAY_STRING_AT_END, '');
                if (valueType[0] === '(' && valueType[valueType.length - 1] === ')') {
                    const decodedCompactBytesArray = decodeValueType('bytes[CompactBytesArray]', value);
                    return decodedCompactBytesArray.map((element) => decodeTupleKeyValue(valueContent, valueType, element));
                }
                return decodeValueType(schema.valueType, value);
            }
            if (isValidTuple(schema.valueType, schema.valueContent)) {
                return decodeTupleKeyValue(schema.valueContent, schema.valueType, value);
            }
            return decodeKeyValue(schema.valueContent, schema.valueType, value, schema.name);
        }
        default: {
            throw new Error(`Incorrect data match or keyType in schema from decodeKey(): "${schema.keyType}"`);
        }
    }
}
export function decodeData(data, schema, throwExceptions = false) {
    const processDataInput = ({ keyName, dynamicKeyParts, value }, throwException = true) => {
        const isDynamic = isDynamicKeyName(keyName);
        const schemaElement = isDynamic
            ? getSchemaElement(schema, keyName, dynamicKeyParts)
            : getSchemaElement(schema, keyName);
        let decodedValue = null;
        try {
            decodedValue = decodeKey(schemaElement, value);
        }
        catch (error) {
            if (throwException) {
                throw error;
            }
            console.error(error);
        }
        const { key, name, dynamicName } = schemaElement;
        return {
            key,
            name,
            ...(dynamicName ? { dynamicName } : { dynamicName: name }),
            ...(dynamicKeyParts ? { dynamicKeyParts } : {}),
            value: decodedValue,
        };
    };
    if (Array.isArray(data)) {
        return data.map((dataInput) => processDataInput(dataInput, throwExceptions));
    }
    return processDataInput(data, throwExceptions);
}
//# sourceMappingURL=decodeData.js.map