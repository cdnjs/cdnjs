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
import allSchemas from '../schemas';
const getSchemasByKeyType = (schemas) => {
    return {
        Singleton: schemas.filter((schema) => schema.keyType === 'Singleton'),
        Array: schemas.filter((schema) => schema.keyType === 'Array'),
        Mapping: schemas.filter((schema) => schema.keyType === 'Mapping'),
        MappingWithGrouping: schemas.filter((schema) => schema.keyType === 'MappingWithGrouping'),
    };
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
    const elementIndex = parseInt(key.substring(34), 10);
    return Object.assign(Object.assign({}, arraySchema), { key, name: arraySchema.name.replace('[]', `[${elementIndex}]`), keyType: 'Singleton' });
};
const findMappingSchemaForKey = (key, schemas) => {
    // Should detect:
    // 1. Known/defined mapping
    let keySchema = schemas.find((schema) => schema.key === key) || null;
    if (keySchema) {
        return keySchema;
    }
    // 2. "Semi defined mappings" i.e. "SupportedStandards:??????"
    keySchema =
        schemas.find((schema) => `${schema.key.substring(0, 22)}0000` === key.substring(0, 26)) || null;
    if (!keySchema) {
        return null;
    }
    // TODO: Handle the SupportedStandard Keys; we can get the valueContent from the Keys
    return Object.assign(Object.assign({}, keySchema), { valueContent: '?', name: `${keySchema.name.split(':')[0]}:??????`, key });
};
const findMappingWithGroupingSchemaForKey = (key, schemas) => {
    const keySchema = schemas.find((schema) => schema.key.substring(0, 26) === key.substring(0, 26)) || null;
    const address = key.substring(26);
    if (keySchema) {
        return Object.assign(Object.assign({}, keySchema), { key, name: `${keySchema.name.substring(0, keySchema.name.lastIndexOf(':'))}:${address}` });
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