export type Integer = number;
export type IDBIndexProperties = {
    columnName: string;
    keyPath: import("./Key.js").KeyPath;
    optionalParams: {
        unique: boolean;
        multiEntry: boolean;
    };
    deleted?: boolean;
    __deleted?: boolean;
    cursors?: import("./IDBCursor.js").IDBCursorWithValueFull[];
};
export type IDBIndexFull = IDBIndex & {
    name: string;
    keyPath: import("./Key.js").KeyPath;
    multiEntry: boolean;
    unique: boolean;
    objectStore: import("./IDBObjectStore.js").IDBObjectStoreFull;
    __pendingCreate?: boolean;
    __deleted?: boolean;
    __originalName: string;
    __currentName: string;
    __pendingName?: string;
    __pendingDelete?: boolean;
    __name: string;
    __multiEntry: boolean;
    __unique: boolean;
    __objectStore: import("./IDBObjectStore.js").IDBObjectStoreFull;
    __keyPath: import("./Key.js").KeyPath;
    __recreated?: boolean;
};
export type IndexList = {
    [key: string]: IDBIndexProperties;
};
export type Query = any | IDBKeyRange;
export type AnyValue = any;
/**
 * @param {boolean} nullDisallowed
 * @param {IDBIndexFull} index
 * @param {import('./Key.js').Value|import('./Key.js').Key} range
 * @param {"value"|"key"|"count"} opType
 * @param {boolean} multiChecks
 * @returns {[
 *   nullDisallowed: boolean,
 *   index: IDBIndexFull,
 *   hasRange: boolean,
 *   range: import('./Key.js').Value|import('./Key.js').Key,
 *   opType: "value"|"key"|"count",
 *   multiChecks: boolean,
 *   sql: string[],
 *   sqlValues: string[]
 * ]}
 */
export function buildFetchIndexDataSQL(nullDisallowed: boolean, index: IDBIndexFull, range: import("./Key.js").Value | import("./Key.js").Key, opType: "value" | "key" | "count", multiChecks: boolean): [nullDisallowed: boolean, index: IDBIndexFull, hasRange: boolean, range: import("./Key.js").Value | import("./Key.js").Key, opType: "value" | "key" | "count", multiChecks: boolean, sql: string[], sqlValues: string[]];
/**
 * @param {number|null} count
 * @param {boolean} unboundedDisallowed
 * @param {IDBIndexFull} index
 * @param {boolean} hasKey
 * @param {import('./Key.js').Value|import('./Key.js').Key} range
 * @param {"value"|"key"|"count"} opType
 * @param {boolean} multiChecks
 * @param {string[]} sql
 * @param {string[]} sqlValues
 * @param {SQLTransaction} tx
 * @param {null|undefined} args
 * @param {(result: number|undefined|[]|AnyValue|AnyValue[]) => void} success
 * @param {(tx: SQLTransaction, err: SQLError) => void} error
 * @returns {void}
 */
export function executeFetchIndexData(count: number | null, unboundedDisallowed: boolean, index: IDBIndexFull, hasKey: boolean, range: import("./Key.js").Value | import("./Key.js").Key, opType: "value" | "key" | "count", multiChecks: boolean, sql: string[], sqlValues: string[], tx: SQLTransaction, args: null | undefined, success: (result: number | undefined | [] | AnyValue | AnyValue[]) => void, error: (tx: SQLTransaction, err: SQLError) => void): void;
/**
 * @typedef {number} Integer
 */
/**
 * @typedef {{
 *   columnName: string,
 *   keyPath: import('./Key.js').KeyPath,
 *   optionalParams: {
 *     unique: boolean,
 *     multiEntry: boolean
 *   }
 *   deleted?: boolean,
 *   __deleted?: boolean,
 *   cursors?: import('./IDBCursor.js').IDBCursorWithValueFull[],
 * }} IDBIndexProperties
 */
/**
 * IDB Index.
 * @see http://www.w3.org/TR/IndexedDB/#idl-def-IDBIndex
 * @class
 */
export function IDBIndex(): void;
export class IDBIndex {
    /**
     * @typedef {any|IDBKeyRange} Query
     */
    /**
     * Retrieves index data for the given key.
     * @param {Query} range
     * @param {"value"|"key"|"count"} opType
     * @param {boolean} nullDisallowed
     * @param {number} [count]
     * @this {IDBIndexFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    __fetchIndexData(this: IDBIndexFull, range: Query, opType: "value" | "key" | "count", nullDisallowed: boolean, count?: number | undefined): import("./IDBRequest.js").IDBRequestFull;
    /**
     * Opens a cursor over the given key range.
     * @this {IDBIndexFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    openCursor(this: IDBIndexFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * Opens a cursor over the given key range.  The cursor only includes key values, not data.
     * @this {IDBIndexFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    openKeyCursor(this: IDBIndexFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {Query} query
     * @throws {TypeError}
     * @this {IDBIndexFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    get(this: IDBIndexFull, query: Query, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {Query} query
     * @throws {TypeError}
     * @this {IDBIndexFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    getKey(this: IDBIndexFull, query: Query, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBIndexFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    getAll(this: IDBIndexFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBIndexFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    getAllKeys(this: IDBIndexFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBIndexFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    count(this: IDBIndexFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
     * @param {string} oldName
     * @param {string} newName
     * @param {string[][]} colInfoToPreserveArr
     * @param {null|((
     *   tx: SQLTransaction,
     *   success: ((store: IDBObjectStore) => void)
     * ) => void)} cb
     * @this {IDBIndexFull}
     * @returns {void}
     */
    __renameIndex(this: IDBIndexFull, store: import("./IDBObjectStore.js").IDBObjectStoreFull, oldName: string, newName: string, colInfoToPreserveArr?: string[][], cb?: null | ((tx: SQLTransaction, success: ((store: IDBObjectStore) => void)) => void)): void;
}
export namespace IDBIndex {
    /**
     * @typedef {IDBIndex & {
     *   name: string,
     *   keyPath: import('./Key.js').KeyPath,
     *   multiEntry: boolean,
     *   unique: boolean,
     *   objectStore: import('./IDBObjectStore.js').IDBObjectStoreFull,
     *   __pendingCreate?: boolean,
     *   __deleted?: boolean,
     *   __originalName: string,
     *   __currentName: string,
     *   __pendingName?: string,
     *   __pendingDelete?: boolean,
     *   __name: string,
     *   __multiEntry: boolean,
     *   __unique: boolean,
     *   __objectStore: import('./IDBObjectStore.js').IDBObjectStoreFull,
     *   __keyPath: import('./Key.js').KeyPath,
     *   __recreated?: boolean
     * }} IDBIndexFull
     */
    /**
     *
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
     * @param {IDBIndexProperties} indexProperties
     * @returns {IDBIndexFull}
     */
    function __createInstance(store: import("./IDBObjectStore.js").IDBObjectStoreFull, indexProperties: IDBIndexProperties): IDBIndexFull;
    /**
     *
     * @param {IDBIndexFull} index
     * @param {string} [msg]
     * @throws {DOMException}
     * @returns {void}
     */
    function __invalidStateIfDeleted(index: IDBIndexFull, msg?: string | undefined): void;
    /**
     * Clones an IDBIndex instance for a different IDBObjectStore instance.
     * @param {IDBIndexFull} index
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
     * @returns {IDBIndexFull}
     */
    function __clone(index: IDBIndexFull, store: import("./IDBObjectStore.js").IDBObjectStoreFull): IDBIndexFull;
    /**
     * Creates a new index on an object store.
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
     * @param {IDBIndexFull} index
     * @returns {void}
     */
    function __createIndex(store: import("./IDBObjectStore.js").IDBObjectStoreFull, index: IDBIndexFull): void;
    /**
     * Deletes an index from an object store.
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
     * @param {IDBIndexFull} index
     * @returns {void}
     */
    function __deleteIndex(store: import("./IDBObjectStore.js").IDBObjectStoreFull, index: IDBIndexFull): void;
    /**
     * @typedef {{[key: string]: IDBIndexProperties}} IndexList
     */
    /**
     * Updates index list for the given object store.
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
     * @param {SQLTransaction} tx
     * @param {(store: IDBObjectStore) => void} success
     * @param {(
     *   tx: SQLTransaction,
     *   err: SQLError
     * ) => boolean} [failure]
     * @returns {void}
     */
    function __updateIndexList(store: import("./IDBObjectStore.js").IDBObjectStoreFull, tx: SQLTransaction, success: (store: IDBObjectStore) => void, failure?: ((tx: SQLTransaction, err: SQLError) => boolean) | undefined): void;
}
import { IDBKeyRange } from './IDBKeyRange.js';
import IDBObjectStore from './IDBObjectStore.js';
export { IDBIndex as default };
//# sourceMappingURL=IDBIndex.d.ts.map