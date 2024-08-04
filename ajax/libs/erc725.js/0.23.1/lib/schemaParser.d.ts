/**
 * @file lib/schemaParser.ts
 * @author Hugo Masclet <@Hugoo>
 * @date 2022
 */
import { ERC725JSONSchema } from '../types/ERC725JSONSchema';
export declare function getSchema(keyOrKeys: string | string[], providedSchemas?: ERC725JSONSchema[]): ERC725JSONSchema | null | Record<string, ERC725JSONSchema | null>;
