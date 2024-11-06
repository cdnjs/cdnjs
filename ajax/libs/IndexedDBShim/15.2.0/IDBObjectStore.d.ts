export default IDBObjectStore;
export type Integer = number;
export type IDBObjectStoreFull = IDBObjectStore & {
    name: string;
    keyPath: import("./Key.js").KeyPath;
    transaction?: import("./IDBTransaction.js").IDBTransactionFull;
    indexNames: import("./DOMStringList.js").DOMStringListFull;
    autoIncrement: boolean;
    __autoIncrement: boolean;
    __indexes: {
        [key: string]: import("./IDBIndex.js").IDBIndexFull;
    };
    __indexHandles: {
        [key: string]: import("./IDBIndex.js").IDBIndexFull;
    };
    __indexNames: import("./DOMStringList.js").DOMStringListFull;
    __oldIndexNames: import("./DOMStringList.js").DOMStringListFull;
    __transaction?: import("./IDBTransaction.js").IDBTransactionFull;
    __name: string;
    __keyPath: import("./Key.js").KeyPath;
    __originalName: string;
    __currentName: string;
    __pendingName?: string;
    __pendingDelete?: boolean;
    __pendingCreate?: boolean;
    __deleted?: boolean;
    __cursors: (import("./IDBCursor.js").IDBCursorFull | import("./IDBCursor.js").IDBCursorWithValueFull)[];
    __idbdb: import("./IDBDatabase.js").IDBDatabaseFull;
};
export type KeyValueArray = [import("./Key.js").Key, import("./Key.js").Value];
/**
 * @typedef {number} Integer
 */
/**
 * IndexedDB Object Store.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBObjectStore
 * @class
 */
declare function IDBObjectStore(): void;
declare class IDBObjectStore {
    /**
     * @typedef {[import('./Key.js').Key, import('./Key.js').Value]} KeyValueArray
     */
    /**
     * Determines whether the given inline or out-of-line key is valid,
     *   according to the object store's schema.
     * @param {import('./Key.js').Value} value Used for inline keys
     * @param {import('./Key.js').Key} key Used for out-of-line keys
     * @param {boolean} cursorUpdate
     * @throws {DOMException}
     * @this {IDBObjectStoreFull}
     * @returns {KeyValueArray}
     */
    __validateKeyAndValueAndCloneValue(this: IDBObjectStoreFull, value: import("./Key.js").Value, key: import("./Key.js").Key, cursorUpdate: boolean): KeyValueArray;
    /**
     * From the store properties and object, extracts the value for the key in
     *   the object store
     * If the table has auto increment, get the current number (unless it has
     *   a keyPath leading to a valid but non-numeric or < 1 key).
     * @param {SQLTransaction} tx
     * @param {import('./Key.js').Value} value
     * @param {import('./Key.js').Key} key
     * @param {(key: import('./Key.js').Key, cn?: Integer) => void} success
     * @param {import('./Key.js').SQLFailureCallback} failCb
     * @this {IDBObjectStoreFull}
     * @returns {void}
     */
    __deriveKey(this: IDBObjectStoreFull, tx: SQLTransaction, value: import("./Key.js").Value, key: import("./Key.js").Key, success: (key: import("./Key.js").Key, cn?: Integer) => void, failCb: import("./Key.js").SQLFailureCallback): void;
    /**
     *
     * @param {SQLTransaction} tx
     * @param {string} encoded
     * @param {import('./Key.js').Value} value
     * @param {import('./Key.js').Key|Integer} clonedKeyOrCurrentNumber
     * @param {Integer|undefined} oldCn
     * @param {(
     *   clonedKeyOrCurrentNumber: import('./Key.js').Key|Integer
     * ) => void} success
     * @param {(err: Error|DOMException) => void} error
     * @this {IDBObjectStoreFull}
     * @returns {SyncPromise}
     */
    __insertData(this: IDBObjectStoreFull, tx: SQLTransaction, encoded: string, value: import("./Key.js").Value, clonedKeyOrCurrentNumber: import("./Key.js").Key | Integer, oldCn: Integer | undefined, success: (clonedKeyOrCurrentNumber: import("./Key.js").Key | Integer) => void, error: (err: Error | DOMException) => void): SyncPromise;
    /**
     *
     * @param {import('./Key.js').Value} value
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    add(this: IDBObjectStoreFull, value: import("./Key.js").Value, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {import('./Key.js').Value} value
     * @throws {TypeError}
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    put(this: IDBObjectStoreFull, value: import("./Key.js").Value, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {SQLTransaction} tx
     * @param {import('./Key.js').Key} key
     * @param {(tx: SQLTransaction) => void} cb
     * @param {(err: SQLError) => void} error
     * @this {IDBObjectStoreFull}
     * @returns {void}
     */
    __overwrite(this: IDBObjectStoreFull, tx: SQLTransaction, key: import("./Key.js").Key, cb: (tx: SQLTransaction) => void, error: (err: SQLError) => void): void;
    /**
     *
     * @param {import('./Key.js').Value} query
     * @param {boolean} [getKey]
     * @param {boolean} [getAll]
     * @param {Integer} [count]
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    __get(this: IDBObjectStoreFull, query: import("./Key.js").Value, getKey?: boolean | undefined, getAll?: boolean | undefined, count?: number | undefined): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {import('./Key.js').Value} query
     * @throws {TypeError}
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    get(this: IDBObjectStoreFull, query: import("./Key.js").Value, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {import('./Key.js').Value} query
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    getKey(this: IDBObjectStoreFull, query: import("./Key.js").Value, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    getAll(this: IDBObjectStoreFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    getAllKeys(this: IDBObjectStoreFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {import('./Key.js').Value} query
     * @throws {TypeError}
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    delete(this: IDBObjectStoreFull, query: import("./Key.js").Value, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    clear(this: IDBObjectStoreFull): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    count(this: IDBObjectStoreFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    openCursor(this: IDBObjectStoreFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    openKeyCursor(this: IDBObjectStoreFull, ...args: any[]): import("./IDBRequest.js").IDBRequestFull;
    /**
     *
     * @param {string} indexName
     * @this {IDBObjectStoreFull}
     * @returns {import('./IDBIndex.js').IDBIndexFull}
     */
    index(this: IDBObjectStoreFull, indexName: string, ...args: any[]): import("./IDBIndex.js").IDBIndexFull;
    /**
     * Creates a new index on the object store.
     * @param {string} indexName
     * @param {string|string[]} keyPath
     * @this {IDBObjectStoreFull}
     * @returns {IDBIndex}
     */
    createIndex(this: IDBObjectStoreFull, indexName: string, keyPath: string | string[], ...args: any[]): IDBIndex;
    /**
     *
     * @param {string} name
     * @this {IDBObjectStoreFull}
     * @returns {void}
     */
    deleteIndex(this: IDBObjectStoreFull, name: string, ...args: any[]): void;
}
declare namespace IDBObjectStore {
    /**
     * @typedef {IDBObjectStore & {
     *   name: string,
     *   keyPath: import('./Key.js').KeyPath,
     *   transaction?: import('./IDBTransaction.js').IDBTransactionFull,
     *   indexNames: import('./DOMStringList.js').DOMStringListFull,
     *   autoIncrement: boolean,
     *   __autoIncrement: boolean,
     *   __indexes: {[key: string]: import('./IDBIndex.js').IDBIndexFull},
     *   __indexHandles: {[key: string]: import('./IDBIndex.js').IDBIndexFull},
     *   __indexNames: import('./DOMStringList.js').DOMStringListFull,
     *   __oldIndexNames: import('./DOMStringList.js').DOMStringListFull,
     *   __transaction?: import('./IDBTransaction.js').IDBTransactionFull,
     *   __name: string,
     *   __keyPath: import('./Key.js').KeyPath,
     *   __originalName: string,
     *   __currentName: string,
     *   __pendingName?: string,
     *   __pendingDelete?: boolean,
     *   __pendingCreate?: boolean,
     *   __deleted?: boolean,
     *   __cursors: (
     *     import('./IDBCursor.js').IDBCursorFull|
     *     import('./IDBCursor.js').IDBCursorWithValueFull
     *   )[],
     *   __idbdb: import('./IDBDatabase.js').IDBDatabaseFull,
     * }} IDBObjectStoreFull
     */
    /**
     *
     * @param {import('./IDBDatabase.js').IDBObjectStoreProperties} storeProperties
     * @param {import('./IDBTransaction.js').IDBTransactionFull} [transaction]
     * @returns {IDBObjectStoreFull}
     */
    function __createInstance(storeProperties: import("./IDBDatabase.js").IDBObjectStoreProperties, transaction?: import("./IDBTransaction.js").IDBTransactionFull | undefined): IDBObjectStoreFull;
    /**
     * Clones an IDBObjectStore instance for a different IDBTransaction instance.
     * @param {IDBObjectStoreFull} store
     * @param {import('./IDBTransaction.js').IDBTransactionFull} transaction
     * @returns {IDBObjectStoreFull}
     */
    function __clone(store: IDBObjectStoreFull, transaction: import("./IDBTransaction.js").IDBTransactionFull): IDBObjectStoreFull;
    /**
     *
     * @param {IDBObjectStoreFull|import('./IDBIndex.js').IDBIndexFull} store
     * @param {string} [msg]
     * @throws {DOMException}
     * @returns {void}
     */
    function __invalidStateIfDeleted(store: IDBObjectStoreFull | import("./IDBIndex.js").IDBIndexFull, msg?: string | undefined): void;
    /**
     * Creates a new object store in the database.
     * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
     * @param {IDBObjectStoreFull} store
     * @returns {IDBObjectStore}
     */
    function __createObjectStore(db: import("./IDBDatabase.js").IDBDatabaseFull, store: IDBObjectStoreFull): IDBObjectStore;
    /**
     * Deletes an object store from the database.
     * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
     * @returns {void}
     */
    function __deleteObjectStore(db: import("./IDBDatabase.js").IDBDatabaseFull, store: import("./IDBObjectStore.js").IDBObjectStoreFull): void;
    /**
     *
     * @param {import('./IDBRequest.js').IDBRequestFull} request
     * @param {IDBObjectStoreFull} store
     * @param {boolean} invalidateCache
     * @param {import('./Key.js').Value} value
     * @param {boolean} noOverwrite
     * @returns {void}
     */
    function __storingRecordObjectStore(request: import("./IDBRequest.js").IDBRequestFull, store: IDBObjectStoreFull, invalidateCache: boolean, value: import("./Key.js").Value, noOverwrite: boolean, ...args: any[]): void;
}
import SyncPromise from 'sync-promise-expanded';
import { IDBIndex } from './IDBIndex.js';
//# sourceMappingURL=IDBObjectStore.d.ts.map