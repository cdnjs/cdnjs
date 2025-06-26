export type IDBOpenDBRequestFull = IDBRequestFull & IDBOpenDBRequest & {};
export type IDBRequestFull = IDBRequest & EventTarget & import("eventtargeter").ShimEventTarget & {
    transaction: import("./IDBTransaction.js").IDBTransactionFull;
    __done: boolean;
    __result: import("./IDBDatabase.js").IDBDatabaseFull | undefined;
    __error: null | DOMException | Error;
    __source: null | import("./IDBDatabase.js").IDBDatabaseFull | import("./IDBObjectStore.js").IDBObjectStoreFull | import("./IDBIndex.js").IDBIndexFull;
    __transaction: undefined | null | import("./IDBTransaction.js").IDBTransactionFull;
    addLateEventListener: (ev: string, listener: (e: Event & {
        __legacyOutputDidListenersThrowError: boolean;
    }) => void) => void;
    addDefaultEventListener: (ev: string, listener: (e: Event & {
        __legacyOutputDidListenersThrowError: boolean;
    }) => void) => void;
};
/**
 * The IDBRequest Object that is returns for all async calls.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#request-api
 * @class
 */
export function IDBRequest(): void;
export class IDBRequest {
    /**
     * @this {IDBRequestFull}
     * @returns {import('./IDBTransaction.js').IDBTransactionFull|null|undefined}
     */
    __getParent(this: IDBRequestFull): import("./IDBTransaction.js").IDBTransactionFull | null | undefined;
}
export namespace IDBRequest {
    /**
     * @typedef {IDBRequest & EventTarget & import('eventtargeter').ShimEventTarget & {
     *   transaction: import('./IDBTransaction.js').IDBTransactionFull,
     *   __done: boolean,
     *   __result: import('./IDBDatabase.js').IDBDatabaseFull|undefined,
     *   __error: null|DOMException|Error,
     *   __source: null|import('./IDBDatabase.js').IDBDatabaseFull|
     *     import('./IDBObjectStore.js').IDBObjectStoreFull|
     *     import('./IDBIndex.js').IDBIndexFull,
     *   __transaction: undefined|null|
     *     import('./IDBTransaction.js').IDBTransactionFull,
     *   addLateEventListener: (ev: string, listener: (e: Event & {
     *     __legacyOutputDidListenersThrowError: boolean
     *   }) => void) => void
     *   addDefaultEventListener: (ev: string, listener: (e: Event & {
     *     __legacyOutputDidListenersThrowError: boolean
     *   }) => void) => void
     * }} IDBRequestFull
     */
    /**
     * @class
     * @this {IDBRequestFull}
     */
    function __super(this: IDBRequestFull): void;
    /**
     * @returns {IDBRequestFull}
     */
    function __createInstance(): IDBRequestFull;
}
/**
 * @typedef {IDBRequestFull & IDBOpenDBRequest & {}} IDBOpenDBRequestFull
 */
/**
 * The IDBOpenDBRequest called when a database is opened.
 * @class
 */
export function IDBOpenDBRequest(): void;
export class IDBOpenDBRequest {
}
export namespace IDBOpenDBRequest {
    /**
     * @returns {IDBRequestFull & IDBOpenDBRequest}
     */
    function __createInstance(): IDBRequestFull & IDBOpenDBRequest;
}
//# sourceMappingURL=IDBRequest.d.ts.map