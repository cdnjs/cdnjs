import { ERC725JSONSchema } from '../types/ERC725JSONSchema';
import { DynamicKeyPart } from '../types/dynamicKeys';
/**
 * @param keyHash hashed key with the dynamic parts
 * @param keyNameOrSchema key name of schema definitions or schema
 *
 * @return: all decoded dynamic key parts, with their type and value
 */
export declare function decodeMappingKey(keyHash: string, keyNameOrSchema: string | ERC725JSONSchema): DynamicKeyPart[];
