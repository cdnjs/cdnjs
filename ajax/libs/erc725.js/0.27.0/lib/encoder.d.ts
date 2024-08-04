/**
 * @file lib/encoder.ts
 * @author Robert McLeod <@robertdavid010>
 * @author Fabian Vogelsteller <fabian@lukso.network>
 * @author Hugo Masclet <@Hugoo>
 * @author Callum Grindle <@CallumGrindle>
 * @author Jean Cavallera <@CJ42>
 * @date 2023
 */
import { URLDataToEncode, URLDataWithHash, Verification } from '../types';
import { AssetURLEncode } from '../types/encodeData';
import { ERC725JSONSchemaValueType } from '../types/ERC725JSONSchema';
export declare const encodeDataSourceWithHash: (verification: undefined | Verification, dataSource: string) => string;
export declare const decodeDataSourceWithHash: (value: string) => URLDataWithHash;
export declare const valueContentEncodingMap: (valueContent: string) => {
    type: string;
    encode: (value: any) => string;
    decode: (value: string) => any;
};
export declare function encodeValueType(type: ERC725JSONSchemaValueType | string, // for tuples and CompactBytesArray,
value: string | string[] | number | number[] | boolean | boolean[]): string;
export declare function decodeValueType(type: ERC725JSONSchemaValueType | string, // for tuples and CompactBytesArray
data: string): any;
export declare function encodeValueContent(valueContent: string, value: string | number | AssetURLEncode | URLDataToEncode | boolean): string | false;
export declare function decodeValueContent(valueContent: string, value: string): string | URLDataWithHash | number | boolean | null;
