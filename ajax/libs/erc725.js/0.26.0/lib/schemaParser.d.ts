import { DynamicNameSchema, ERC725JSONSchema } from '../types/ERC725JSONSchema';
export declare function getSchema(keyOrKeys: string | string[], providedSchemas?: ERC725JSONSchema[]): ERC725JSONSchema | DynamicNameSchema | null | Record<string, ERC725JSONSchema | DynamicNameSchema | null>;
