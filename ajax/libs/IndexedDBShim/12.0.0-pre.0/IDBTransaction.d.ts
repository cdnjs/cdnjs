export default IDBTransaction;
export type Integer = number;
export type RequestInfo = {
    op: SQLCallback;
    args: ObjectArray;
    req: import('./IDBRequest.js').IDBRequestFull | null;
};
export type IDBTransactionFull = EventTarget & {
    mode: "readonly" | "readwrite" | "versionchange";
    db: import('./IDBDatabase.js').IDBDatabaseFull;
    on__abort: () => void;
    on__complete: () => void;
    on__beforecomplete: (ev: Event & {
        complete: () => void;
    }) => void;
    on__preabort: () => void;
    __abortTransaction: (err: Error | DOMException | null) => void;
    __executeRequests: () => void;
    __tx: SQLTransaction;
    __id: Integer;
    __active: boolean;
    __running: boolean;
    __errored: boolean;
    __requests: RequestInfo[];
    __db: import('./IDBDatabase.js').IDBDatabaseFull;
    __mode: string;
    __error: null | DOMException | Error;
    __objectStoreNames: import('./DOMStringList.js').DOMStringListFull;
    __storeHandles: {
        [key: string]: import("./IDBObjectStore.js").IDBObjectStoreFull;
    };
    __requestsFinished: boolean;
    __transFinishedCb: (err: boolean, cb: (bool?: boolean) => void) => void;
    __transactionEndCallback: () => void;
    __transactionFinished: boolean;
    __completed: boolean;
    __internal: boolean;
    __abortFinished: boolean;
    __createRequest: (source: import('./IDBDatabase.js').IDBDatabaseFull | import('./IDBObjectStore.js').IDBObjectStoreFull | import('./IDBIndex.js').IDBIndexFull | import('./IDBCursor.js').IDBCursorFull) => import('./IDBRequest.js').IDBRequestFull;
    __pushToQueue: (request: import('./IDBRequest.js').IDBRequestFull | null, callback: SQLCallback, args?: ObjectArray) => void;
    __assertActive: () => void;
    __addNonRequestToTransactionQueue: (callback: SQLCallback, args?: ObjectArray) => void;
    __addToTransactionQueue: (callback: SQLCallback, args: ObjectArray | undefined, source: import('./IDBDatabase.js').IDBDatabaseFull | import('./IDBObjectStore.js').IDBObjectStoreFull | import('./IDBIndex.js').IDBIndexFull | import('./IDBCursor.js').IDBCursorFull) => import('./IDBRequest.js').IDBRequestFull;
    __assertWritable: () => void;
};
export type SQLCallback = (tx: SQLTransaction, args: ObjectArray, success: (result?: any, req?: import('./IDBRequest.js').IDBRequestFull) => void, error: (tx: SQLTransaction | Error | DOMException | SQLError, err?: SQLError) => void, executeNextRequest?: () => void) => void;
/**
 * @typedef {number} Integer
 */
/**
 * @typedef {{
 *   op: SQLCallback,
 *   args: ObjectArray,
 *   req: import('./IDBRequest.js').IDBRequestFull|null
 * }} RequestInfo
 */
/**
 * @typedef {EventTarget & {
 *   mode: "readonly"|"readwrite"|"versionchange",
 *   db: import('./IDBDatabase.js').IDBDatabaseFull,
 *   on__abort: () => void,
 *   on__complete: () => void,
 *   on__beforecomplete: (ev: Event & {
 *     complete: () => void
 *   }) => void,
 *   on__preabort: () => void,
 *   __abortTransaction: (err: Error|DOMException|null) => void,
 *   __executeRequests: () => void,
 *   __tx: SQLTransaction,
 *   __id: Integer,
 *   __active: boolean,
 *   __running: boolean,
 *   __errored: boolean,
 *   __requests: RequestInfo[],
 *   __db: import('./IDBDatabase.js').IDBDatabaseFull,
 *   __mode: string,
 *   __error: null|DOMException|Error,
 *   __objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
 *   __storeHandles: {
 *     [key: string]: import('./IDBObjectStore.js').IDBObjectStoreFull
 *   },
 *   __requestsFinished: boolean,
 *   __transFinishedCb: (err: boolean, cb: ((bool?: boolean) => void)) => void,
 *   __transactionEndCallback: () => void,
 *   __transactionFinished: boolean,
 *   __completed: boolean,
 *   __internal: boolean,
 *   __abortFinished: boolean,
 *   __createRequest: (
 *     source: import('./IDBDatabase.js').IDBDatabaseFull|
 *       import('./IDBObjectStore.js').IDBObjectStoreFull|
 *       import('./IDBIndex.js').IDBIndexFull|
 *       import('./IDBCursor.js').IDBCursorFull
 *   ) => import('./IDBRequest.js').IDBRequestFull,
 *   __pushToQueue: (
 *     request: import('./IDBRequest.js').IDBRequestFull|null,
 *     callback: SQLCallback,
 *     args?: ObjectArray
 *   ) => void,
 *   __assertActive: () => void,
 *   __addNonRequestToTransactionQueue: (
 *     callback: SQLCallback,
 *     args?: ObjectArray
 *   ) => void
 *   __addToTransactionQueue: (
 *     callback: SQLCallback,
 *     args: ObjectArray|undefined,
 *     source: import('./IDBDatabase.js').IDBDatabaseFull|
 *       import('./IDBObjectStore.js').IDBObjectStoreFull|
 *       import('./IDBIndex.js').IDBIndexFull|
 *       import('./IDBCursor.js').IDBCursorFull
 *   ) => import('./IDBRequest.js').IDBRequestFull
 *   __assertWritable: () => void,
 * }} IDBTransactionFull
 */
/**
 * The IndexedDB Transaction.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBTransaction
 * @class
 */
declare function IDBTransaction(): void;
declare class IDBTransaction {
    /**
     *
     * @param {boolean} err
     * @param {(bool: boolean) => void} cb
     * @returns {void}
     */
    __transFinishedCb(err: boolean, cb: (bool: boolean) => void): void;
    /**
     * @this {IDBTransactionFull}
     * @returns {void}
     */
    __executeRequests(this: IDBTransactionFull): void;
    __running: boolean | undefined;
    /**
     * Creates a new IDBRequest for the transaction.
     * NOTE: The transaction is not queued until you call {@link IDBTransaction#__pushToQueue}.
     * @param {import('./IDBDatabase.js').IDBDatabaseFull} source
     * @this {IDBTransactionFull}
     * @returns {IDBRequest}
     */
    __createRequest(this: IDBTransactionFull, source: import('./IDBDatabase.js').IDBDatabaseFull): IDBRequest;
    /**
     * @typedef {(
     *   tx: SQLTransaction,
     *   args: ObjectArray,
     *   success: (result?: any, req?: import('./IDBRequest.js').IDBRequestFull) => void,
     *   error: (tx: SQLTransaction|Error|DOMException|SQLError, err?: SQLError) => void,
     *   executeNextRequest?: () => void
     * ) => void} SQLCallback
     */
    /**
     * Adds a callback function to the transaction queue.
     * @param {SQLCallback} callback
     * @param {ObjectArray} args
     * @param {import('./IDBDatabase.js').IDBDatabaseFull|
     *   import('./IDBObjectStore.js').IDBObjectStoreFull|
     *   import('./IDBIndex.js').IDBIndexFull} source
     * @this {IDBTransactionFull}
     * @returns {import('./IDBRequest.js').IDBRequestFull}
     */
    __addToTransactionQueue(this: IDBTransactionFull, callback: SQLCallback, args: ObjectArray, source: import('./IDBDatabase.js').IDBDatabaseFull | import('./IDBObjectStore.js').IDBObjectStoreFull | import('./IDBIndex.js').IDBIndexFull): import('./IDBRequest.js').IDBRequestFull;
    /**
     * Adds a callback function to the transaction queue without generating a
     *   request.
     * @param {SQLCallback} callback
     * @param {ObjectArray} args
     * @this {IDBTransactionFull}
     * @returns {void}
     */
    __addNonRequestToTransactionQueue(this: IDBTransactionFull, callback: SQLCallback, args: ObjectArray): void;
    /**
     * Adds an IDBRequest to the transaction queue.
     * @param {import('./IDBRequest.js').IDBRequestFull|null} request
     * @param {SQLCallback} callback
     * @param {ObjectArray} args
     * @this {IDBTransactionFull}
     * @returns {void}
     */
    __pushToQueue(this: IDBTransactionFull, request: import('./IDBRequest.js').IDBRequestFull | null, callback: SQLCallback, args: ObjectArray): void;
    /**
     * @throws {DOMException}
     * @returns {void}
     */
    __assertActive(): void;
    /**
     * @throws {DOMException}
     * @this {IDBTransactionFull}
     * @returns {void}
     */
    __assertWritable(this: IDBTransactionFull): void;
    /**
     * @this {IDBTransactionFull}
     * @returns {void}
     */
    __assertVersionChange(this: IDBTransactionFull): void;
    /**
     * Returns the specified object store.
     * @param {string} objectStoreName
     * @this {IDBTransactionFull}
     * @returns {IDBObjectStore}
     */
    objectStore(this: IDBTransactionFull, objectStoreName: string, ...args: any[]): IDBObjectStore;
    /**
     *
     * @param {Error|DOMException|null} err
     * @this {IDBTransactionFull}
     * @returns {void}
     */
    __abortTransaction(this: IDBTransactionFull, err: Error | DOMException | null): void;
    __errored: boolean | undefined;
    __active: boolean | undefined;
    /**
     * @this {IDBTransactionFull}
     * @returns {void}
     */
    abort(this: IDBTransactionFull): void;
    /**
    * Used by our `EventTarget.prototype` library to implement bubbling/capturing.
     * @this {IDBTransactionFull}
    * @returns {import('./IDBDatabase.js').IDBDatabaseFull}
    */
    __getParent(this: IDBTransactionFull): import('./IDBDatabase.js').IDBDatabaseFull;
    constructor: typeof IDBTransaction;
}
declare namespace IDBTransaction {
    /**
     * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
     * @param {import('./DOMStringList.js').DOMStringListFull} storeNames
     * @param {string} mode
     * @returns {IDBTransactionFull}
     */
    function __createInstance(db: import("./IDBDatabase.js").IDBDatabaseFull, storeNames: import("./DOMStringList.js").DOMStringListFull, mode: string): IDBTransactionFull;
    /**
     *
     * @param {IDBTransactionFull|undefined} tx
     * @returns {void}
     */
    function __assertVersionChange(tx: IDBTransactionFull | undefined): void;
    /**
     *
     * @param {IDBTransactionFull} tx
     * @throws {DOMException}
     * @returns {void}
     */
    function __assertNotVersionChange(tx: IDBTransactionFull): void;
    /**
     *
     * @param {IDBTransactionFull|undefined} tx
     * @throws {DOMException}
     * @returns {void}
     */
    function __assertNotFinished(tx: IDBTransactionFull | undefined): void;
    /**
     *
     * @param {IDBTransactionFull} tx
     * @returns {void}
     */
    function __assertNotFinishedObjectStoreMethod(tx: IDBTransactionFull): void;
    /**
     *
     * @param {IDBTransactionFull|undefined} tx
     * @throws {DOMException}
     * @returns {void}
     */
    function __assertActive(tx: IDBTransactionFull | undefined): void;
}
import { IDBRequest } from './IDBRequest.js';
import IDBObjectStore from './IDBObjectStore.js';
//# sourceMappingURL=IDBTransaction.d.ts.map