import { ParserOptionsSpec } from "./ParserOptionsSpec";
export interface MMTFobj {
    decode(data: Uint8Array | ArrayBuffer): any;
    decodeMsgpack(data: Uint8Array | ArrayBuffer): any;
}
/**
 * @param bindata - binary UInt8Array buffer or a base64 encoded string
 * @param ParserOptionsSpec
 * @category Parsers
*/
export declare function MMTFparser(bindata: any, options: ParserOptionsSpec): any[][] & Record<string, any>;
