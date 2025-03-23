/**
 * @file lib/getDataFromExternalSources.ts
 * @author Hugo Masclet <@Hugoo>
 * @author Callum Grindle <@CallumGrindle>
 * @author Reto Ryter <@rryter>
 * @date 2021
 */
import { DecodeDataOutput, GetDataExternalSourcesOutput } from '../types/decodeData';
import { ERC725JSONSchema } from '../types/ERC725JSONSchema';
export declare const getDataFromExternalSources: (schemas: ERC725JSONSchema[], dataFromChain: DecodeDataOutput[], ipfsGateway: string, throwException?: boolean) => Promise<GetDataExternalSourcesOutput[]>;
