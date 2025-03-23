/**
 * @file lib/getSchemaElement.ts
 * @author Hugo Masclet <@Hugoo>
 * @date 2021
 */
import { DynamicKeyParts } from '../types/dynamicKeys';
import { ERC725JSONSchema } from '../types/ERC725JSONSchema';
/**
 *
 * @param schemas An array of ERC725JSONSchema objects.
 * @param {string} namedOrHashedKey A string of either the schema element name, or hashed key (with or without the 0x prefix).
 * @param dynamicKeyParts if a dynamic named key is given, you should also set the dynamicKeyParts.
 *
 * @return The requested schema element from the full array of schemas.
 */
export declare function getSchemaElement(schemas: ERC725JSONSchema[], namedOrHashedKey: string, dynamicKeyParts?: DynamicKeyParts): ERC725JSONSchema;
