import Long from 'long';
import { Client, ClientOptions } from './core/client';
import { Document } from './document/document';
export { Client, Document };
export { JSONElement } from './document/json/element';
export { JSONObject } from './document/json/object';
export { JSONArray } from './document/json/array';
export { PlainText } from './document/json/plain_text';
export { RichText } from './document/json/rich_text';
export { Change, ChangeType } from './document/json/rga_tree_split';
declare const _default: {
    createClient: (rpcAddr: string, opts?: ClientOptions) => Client;
    createDocument: (collection: string, document: string) => Document;
    Long: Long.LongConstructor;
};
export default _default;
