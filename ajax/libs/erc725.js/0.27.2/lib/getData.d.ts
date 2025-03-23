import { DecodeDataOutput } from '../types/decodeData';
import { GetDataInput } from '../types/GetData';
import { ERC725Options } from '../types/Config';
/**
 * Gets **decoded data** for one, many or all keys of the specified `ERC725` smart-contract.
 * When omitting the `keyOrKeys` parameter, it will get all the keys (as per {@link ERC725JSONSchema | ERC725JSONSchema} definition).
 *
 * Data returned by this function does not contain external data of [`JSONURL`](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-2-ERC725YJSONSchema.md#jsonurl)
 * or [`ASSETURL`](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-2-ERC725YJSONSchema.md#asseturl) schema elements.
 *
 * If you would like to receive everything in one go, you can use fetchData() from index.ts for that.
 *
 * @param {*} keyOrKeys The name (or the encoded name as the schema ‘key’) of the schema element in the class instance’s schema.
 *
 * @returns If the input is an array: an object with schema element key names as properties, with corresponding **decoded** data as values. If the input is a string, it directly returns the **decoded** data.
 */
export declare const getData: (erc725Options: ERC725Options, _keyOrKeys?: GetDataInput) => Promise<DecodeDataOutput | DecodeDataOutput[]>;
