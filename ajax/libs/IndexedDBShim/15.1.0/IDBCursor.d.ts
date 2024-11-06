export type Integer = number;
export type IDBCursorFull = IDBCursor & {
    primaryKey: import("./Key.js").Key;
    key: import("./Key.js").Key;
    direction: string;
    source: import("./IDBObjectStore.js").IDBObjectStoreFull | import("./IDBIndex.js").IDBIndexFull;
    __request: import("./IDBRequest.js").IDBRequestFull;
    __advanceCount: Integer | undefined;
    __indexSource: boolean;
    __key: import("./Key.js").Key;
    __primaryKey: import("./Key.js").Key;
    __value: import("./Key.js").Value;
    __store: import("./IDBObjectStore.js").IDBObjectStoreFull;
    __range: import("./IDBKeyRange.js").IDBKeyRangeFull | undefined;
    __keyColumnName: string;
    __valueColumnName: string;
    __keyOnly: boolean;
    __valueDecoder: {
        decode: (str: string) => any;
    };
    __count: boolean;
    __prefetchedIndex: Integer;
    __prefetchedData: null | SQLResultSetRowList | {
        data: RowItemNonNull[];
        length: Integer;
        item: (index: Integer) => RowItemNonNull;
    };
    __multiEntryIndex: boolean;
    __unique: boolean;
    __sqlDirection: "DESC" | "ASC";
    __matchedKeys: {
        [key: string]: true;
    };
    __invalidateCache: () => void;
};
export type IDBCursorWithValueFull = IDBCursorFull & {
    __request: import("./IDBRequest.js").IDBRequestFull;
};
export type KeySuccess = (k: import("./Key.js").Key, val: import("./Key.js").Value, primKey: import("./Key.js").Key) => void;
export type FindError = (tx: SQLTransaction | Error | DOMException | SQLError, err?: SQLError) => void;
export type StructuredCloneValue = any;
export type IndexedDBKey = any;
export type SuccessArg = (value: StructuredCloneValue, req: import("./IDBRequest.js").IDBRequestFull) => void;
export type SuccessCallback = (key: IndexedDBKey, value: StructuredCloneValue, primaryKey: IndexedDBKey) => void;
export type RowItemNonNull = {
    matchingKey: string;
    key: string;
    [k: string]: string;
};
export type AnyValue = any;
/**
 * @typedef {number} Integer
 */
/**
 * @typedef {IDBCursor & {
 *   primaryKey: import('./Key.js').Key,
 *   key:  import('./Key.js').Key,
 *   direction: string,
 *   source: import('./IDBObjectStore.js').IDBObjectStoreFull|
 *     import('./IDBIndex.js').IDBIndexFull,
 *   __request: import('./IDBRequest.js').IDBRequestFull,
 *   __advanceCount: Integer|undefined,
 *   __indexSource: boolean,
 *   __key: import('./Key.js').Key,
 *   __primaryKey: import('./Key.js').Key,
 *   __value: import('./Key.js').Value,
 *   __store: import('./IDBObjectStore.js').IDBObjectStoreFull,
 *   __range: import('./IDBKeyRange.js').IDBKeyRangeFull|undefined,
 *   __keyColumnName: string,
 *   __valueColumnName: string,
 *   __keyOnly: boolean,
 *   __valueDecoder: {
 *     decode: (str: string) => any,
 *   },
 *   __count: boolean,
 *   __prefetchedIndex: Integer,
 *   __prefetchedData: null|SQLResultSetRowList|{
 *     data: RowItemNonNull[],
 *     length: Integer,
 *     item: (index: Integer) => RowItemNonNull
 *   },
 *   __multiEntryIndex: boolean,
 *   __unique: boolean,
 *   __sqlDirection: "DESC"|"ASC",
 *   __matchedKeys: {[key: string]: true},
 *   __invalidateCache: () => void
 * }} IDBCursorFull
 */
/**
 * @typedef {IDBCursorFull & {
 *   __request: import('./IDBRequest.js').IDBRequestFull,
 * }} IDBCursorWithValueFull
 */
/**
 * @class
 */
export function IDBCursor(): void;
export class IDBCursor {
    /**
     *
     * @param {...any} args
     * @this {IDBCursorFull}
     * @returns {void}
     */
    __find(this: IDBCursorFull, ...args: any[]): void;
    /**
     * @typedef {(
     *   k: import('./Key.js').Key,
     *   val: import('./Key.js').Value,
     *   primKey: import('./Key.js').Key
     * ) => void} KeySuccess
     */
    /**
     * @typedef {(tx: SQLTransaction|Error|DOMException|SQLError, err?: SQLError) => void} FindError
     */
    /**
     *
     * @param {undefined|import('./Key.js').Key} key
     * @param {undefined|import('./Key.js').Key} primaryKey
     * @param {SQLTransaction} tx
     * @param {KeySuccess} success
     * @param {FindError} error
     * @param {Integer|undefined} recordsToLoad
     * @this {IDBCursorFull}
     * @returns {void}
     */
    __findBasic(this: IDBCursorFull, key: undefined | import("./Key.js").Key, primaryKey: undefined | import("./Key.js").Key, tx: SQLTransaction, success: KeySuccess, error: FindError, recordsToLoad: Integer | undefined): void;
    /**
     *
     * @param {undefined|import('./Key.js').Key} key
     * @param {undefined|import('./Key.js').Key} primaryKey
     * @param {SQLTransaction} tx
     * @param {KeySuccess} success
     * @param {FindError} error
     * @this {IDBCursorFull}
     * @returns {void}
     */
    __findMultiEntry(this: IDBCursorFull, key: undefined | import("./Key.js").Key, primaryKey: undefined | import("./Key.js").Key, tx: SQLTransaction, success: KeySuccess, error: FindError): void;
    /**
     * @typedef {any} StructuredCloneValue
     */
    /**
     * @typedef {any} IndexedDBKey
     */
    /**
    * @callback SuccessArg
    * @param {StructuredCloneValue} value
    * @param {import('./IDBRequest.js').IDBRequestFull} req
    * @returns {void}
    */
    /**
    * @callback SuccessCallback
    * @param {IndexedDBKey} key
    * @param {StructuredCloneValue} value
    * @param {IndexedDBKey} primaryKey
    * @returns {void}
    */
    /**
     * Creates an "onsuccess" callback.
     * @param {SuccessArg} success
     * @this {IDBCursorFull}
     * @returns {SuccessCallback}
     */
    __onsuccess(this: IDBCursorFull, success: SuccessArg): SuccessCallback;
    /**
     * @typedef {{
    *   matchingKey: string,
    *   key: string,
    *   [k: string]: string
    * }} RowItemNonNull
    */
    /**
     *
     * @param {RowItemNonNull} rowItem
     * @param {(
     *   key: import('./Key.js').Key,
     *   val: import('./Key.js').Value,
     *   primaryKey: import('./Key.js').Key,
     *   encKey?: string
     * ) => void} callback
     * @this {IDBCursorFull}
     * @returns {void}
     */
    __decode(this: IDBCursorFull, rowItem: RowItemNonNull, callback: (key: import("./Key.js").Key, val: import("./Key.js").Value, primaryKey: import("./Key.js").Key, encKey?: string) => void): void;
    /**
     * @this {IDBCursorFull}
     * @returns {void}
     */
    __sourceOrEffectiveObjStoreDeleted(this: IDBCursorFull): void;
    /**
     * @this {IDBCursorFull}
     * @returns {void}
     */
    __invalidateCache(this: IDBCursorFull): void;
    __prefetchedData: any;
    /**
     *
     * @param {import('./Key.js').Key} [key]
     * @param {boolean} [advanceContinue]
     * @this {IDBCursorFull}
     * @returns {void}
     */
    __continue(this: IDBCursorFull, key?: import("./Key.js").Key, advanceContinue?: boolean | undefined): void;
    /**
     *
     * @param {import('./Key.js').Key} key
     * @param {import('./Key.js').Key} primaryKey
     * @param {boolean} advanceState
     * @this {IDBCursorFull}
     * @returns {void}
     */
    __continueFinish(this: IDBCursorFull, key: import("./Key.js").Key, primaryKey: import("./Key.js").Key, advanceState: boolean): void;
    __gotValue: boolean | undefined;
    /**
     * @this {IDBCursorFull}
     * @returns {void}
     */
    continue(this: IDBCursorFull, ...args: any[]): void;
    /**
     *
     * @param {import('./Key.js').Key} key
     * @param {import('./Key.js').Key} primaryKey
     * @this {IDBCursorFull}
     * @returns {void}
     */
    continuePrimaryKey(this: IDBCursorFull, key: import("./Key.js").Key, primaryKey: import("./Key.js").Key): void;
    /**
     *
     * @param {Integer} count
     * @this {IDBCursorFull}
     * @returns {void}
     */
    advance(this: IDBCursorFull, count: Integer): void;
    /**
     * @typedef {any} AnyValue
     */
    /**
     *
     * @param {AnyValue} valueToUpdate
     * @this {IDBCursorFull}
     * @returns {IDBRequest}
     */
    update(this: IDBCursorFull, valueToUpdate: AnyValue, ...args: any[]): IDBRequest;
    /**
     * @this {IDBCursorFull}
     * @returns {IDBRequest}
     */
    delete(this: IDBCursorFull): IDBRequest;
}
export namespace IDBCursor {
    /**
     * The IndexedDB Cursor Object.
     * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBCursor
     * @param {IDBKeyRange} query
     * @param {string} direction
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
     * @param {import('./IDBObjectStore.js').IDBObjectStoreFull|
     *   import('./IDBIndex.js').IDBIndexFull} source
     * @param {string} keyColumnName
     * @param {string} valueColumnName
     * @param {boolean} count
     * @this {IDBCursorFull}
     * @returns {void}
     */
    function __super(this: IDBCursorFull, query: IDBKeyRange, direction: string, store: import("./IDBObjectStore.js").IDBObjectStoreFull, source: import("./IDBObjectStore.js").IDBObjectStoreFull | import("./IDBIndex.js").IDBIndexFull, keyColumnName: string, valueColumnName: string, count: boolean): void;
    /**
     *
     * @param {...any} args
     * @returns {IDBCursorFull}
     */
    function __createInstance(...args: any[]): IDBCursorFull;
}
/**
 * @class
 */
export function IDBCursorWithValue(): void;
export class IDBCursorWithValue {
}
export namespace IDBCursorWithValue {
    /**
     *
     * @param {...any} args
     * @returns {IDBCursorWithValueFull}
     */
    function __createInstance(...args: any[]): IDBCursorWithValueFull;
}
import { IDBRequest } from './IDBRequest.js';
//# sourceMappingURL=IDBCursor.d.ts.map