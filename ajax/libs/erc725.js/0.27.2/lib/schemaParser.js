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
 * @file lib/schemaParser.ts
 * @author Hugo Masclet <@Hugoo>
 * @date 2022
 */
import { keccak256 } from 'web3-utils';
import allSchemas from '../schemas';
import { dynamicTypesRegex, isDynamicKeyName } from './encodeKeyName';
const getSchemasByKeyType = (schemas) => {
    return {
        Singleton: schemas.filter((schema) => schema.keyType === 'Singleton'),
        Array: schemas.filter((schema) => schema.keyType === 'Array'),
        Mapping: schemas.filter((schema) => schema.keyType === 'Mapping'),
        MappingWithGrouping: schemas.filter((schema) => schema.keyType === 'MappingWithGrouping'),
    };
};
const fillDynamicKeyPart = (key, keySchema) => {
    const fillOneDynamicKeyPart = (key, keySchema, insertQuestionMarks = false) => {
        const result = Object.assign(Object.assign({}, keySchema), { key });
        const keyNameParts = keySchema.name.split(':');
        const secondWordHex = key.substring(26);
        // 2. "Semi defined mappings" i.e. "SupportedStandards:??????"
        let dynamicPartName = '??????'; // default for "unknown"
        // replace dynamic placeholder in the map part (e.g: <address>, <bytes32>) with the hex value
        if (isDynamicKeyName(keySchema.name) && !insertQuestionMarks) {
            dynamicPartName = secondWordHex;
            let dynamicName = `${keyNameParts[0]}:0x${dynamicPartName}`;
            let dynamicKeyPart = `0x${secondWordHex}`;
            const dynamicPartType = keyNameParts[1].match(dynamicTypesRegex);
            if (dynamicPartType) {
                const byteSize = dynamicPartType[1] === 'uint' || dynamicPartType[1] === 'int'
                    ? Number.parseInt(dynamicPartType[2]) / 8 // e.g: uint128 -> 128 / 8 -> 16 bytes
                    : Number.parseInt(dynamicPartType[2]); // e.g: bytes8 -> 8 bytes
                if (byteSize < 20) {
                    dynamicName = `${keyNameParts[0]}:0x${dynamicPartName.slice(0, byteSize * 2)}`;
                    dynamicKeyPart = `0x${secondWordHex.slice(0, byteSize * 2)}`;
                }
            }
            result.dynamicName = dynamicName;
            result.dynamicKeyParts = dynamicKeyPart;
            return result;
        }
        // if first 20 bytes of the hash of second word in schema match,
        // display the map part as plain word
        if (keccak256(keyNameParts[1]).substring(0, 42) === `0x${secondWordHex}`) {
            dynamicPartName = keyNameParts[1];
        }
        // DO NOT MODIFY THE NAME OF THE SCHEMA ITEM
        // OTHERWISE WE CAN NO LONGER FIND THE CORRESPONDING SCHEMA BY NAME.
        // result.name = `$keyNameParts[0]:$dynamicPartName`;
        return result;
    };
    if (Array.isArray(keySchema)) {
        const singleSchema = keySchema.find((schema) => schema.key === key);
        if (singleSchema) {
            return fillOneDynamicKeyPart(key, singleSchema);
        }
        return fillOneDynamicKeyPart(key, keySchema[0], true);
    }
    return fillOneDynamicKeyPart(key, keySchema);
};
const findSingletonSchemaForKey = (key, schemas) => {
    return schemas.find((schema) => schema.key === key) || null;
};
const findArraySchemaForKey = (key, schemas) => {
    // Should detect:
    // 1. Initial key
    const initialKeySchema = schemas.find((schema) => schema.key === key) || null;
    if (initialKeySchema) {
        return initialKeySchema;
    }
    // 2. Subsequent keys
    const bytes16Key = key.substring(0, 34);
    const arraySchema = schemas.find((schema) => schema.key.substring(0, 34) === bytes16Key) ||
        null;
    if (!arraySchema) {
        return null;
    }
    // https://stackoverflow.com/a/1779019/651299
    if (!/^\d+$/.test(key.substring(34))) {
        return null;
    }
    const elementIndex = Number.parseInt(key.substring(34), 10);
    return Object.assign(Object.assign({}, arraySchema), { key, dynamicName: arraySchema.name.replace('[]', `[${elementIndex}]`), dynamicKeyParts: `0x${key.substring(34)}`, name: arraySchema.name, keyType: 'Singleton' });
};
const findMappingSchemaForKey = (key, schemas) => {
    const firstWordHex = key.substring(0, 26);
    // Should detect:
    // Known/defined mapping
    const keySchema = schemas.find((schema) => schema.key === key) || null;
    if (keySchema) {
        return fillDynamicKeyPart(key, keySchema);
    }
    const keySchemas = schemas.filter((schema) => `${schema.key.substring(0, 22)}0000` === firstWordHex);
    if (keySchemas.length === 0) {
        return null;
    }
    return fillDynamicKeyPart(key, keySchemas);
};
const findMappingWithGroupingSchemaForKey = (key, schemas) => {
    const keySchema = schemas.find((schema) => schema.key.substring(0, 26) === key.substring(0, 26)) || null;
    if (keySchema) {
        const keyNameParts = keySchema.name.split(':');
        const dynamicKeyPart = key.substring(26);
        if (isDynamicKeyName(keySchema.name)) {
            keySchema.dynamicName = `${keyNameParts[0]}:${keyNameParts[1]}:0x${dynamicKeyPart}`;
            keySchema.dynamicKeyParts = `0x${dynamicKeyPart}`;
        }
        return Object.assign(Object.assign({}, keySchema), { key });
    }
    return null;
};
function schemaParser(key, schemas) {
    const schemasByKeyType = getSchemasByKeyType(schemas);
    let foundSchema = null;
    foundSchema = findSingletonSchemaForKey(key, schemasByKeyType.Singleton);
    if (foundSchema) {
        return foundSchema;
    }
    foundSchema = findArraySchemaForKey(key, schemasByKeyType.Array);
    if (foundSchema) {
        return foundSchema;
    }
    foundSchema = findMappingSchemaForKey(key, schemasByKeyType.Mapping);
    if (foundSchema) {
        return foundSchema;
    }
    foundSchema = findMappingWithGroupingSchemaForKey(key, schemasByKeyType.MappingWithGrouping);
    return foundSchema;
}
export function getSchema(keyOrKeys, providedSchemas) {
    let fullSchema = allSchemas;
    if (providedSchemas) {
        fullSchema = fullSchema.concat(providedSchemas);
    }
    if (Array.isArray(keyOrKeys)) {
        return keyOrKeys.reduce((acc, key) => {
            acc[key] = schemaParser(key, fullSchema);
            return acc;
        }, {});
    }
    return schemaParser(keyOrKeys, fullSchema);
}
//# sourceMappingURL=schemaParser.js.map