/**
 * @file lib/getDataFromExternalSources.ts
 * @author Hugo Masclet <@Hugoo>
 * @author Callum Grindle <@CallumGrindle>
 * @author Reto Ryter <@rryter>
 * @date 2021
 */
import type { DecodeDataOutput, GetDataExternalSourcesOutput } from '../types/decodeData';
import type { ERC725JSONSchema } from '../types/ERC725JSONSchema';
import type { ERC725Options } from '../types/Config';
export declare const getDataFromExternalSources: (schemas: ERC725JSONSchema[], dataFromChain: DecodeDataOutput[], ipfsGateway: string | ERC725Options) => Promise<GetDataExternalSourcesOutput[]>;
