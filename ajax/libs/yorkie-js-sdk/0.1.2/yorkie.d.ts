import Long from 'long';
import { Client, ClientOptions } from './core/client';
import { Document } from './document/document';
export { Client, Document };
export { ActorID } from './document/time/actor_id';
export { JSONElement } from './document/json/element';
export { JSONObject } from './document/json/object';
export { JSONArray } from './document/json/array';
export { PlainText } from './document/json/plain_text';
export { RichText } from './document/json/rich_text';
export { Change, ChangeType } from './document/json/rga_tree_split';
/**
 * The top-level yorkie namespace with additional properties.
 *
 * In production, this will be called exactly once and the result
 * assigned to the `yorkie` global.
 *
 * e.g) `yorkie.createClient(...);`
 */
declare const yorkie: {
    createClient(rpcAddr: string, opts?: ClientOptions): Client;
    createDocument(collection: string, document: string): Document;
    Long: Long.LongConstructor;
};
export default yorkie;
