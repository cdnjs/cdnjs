export default IDBDatabase;
export type IDBObjectStoreProperties = {
    name: string;
    keyPath: import("./Key.js").KeyPath;
    autoInc: boolean;
    indexList: {
        [key: string]: import("./IDBIndex.js").IDBIndexProperties;
    };
    idbdb: IDBDatabaseFull;
    cursors?: (import("./IDBCursor.js").IDBCursorFull | import("./IDBCursor.js").IDBCursorWithValueFull)[];
};
export type Integer = number;
export type IDBDatabaseFull = IDBDatabase & EventTarget & {
    createObjectStore: (storeName: string) => IDBObjectStore;
    deleteObjectStore: (storeName: string) => void;
    close: () => void;
    transaction: (storeNames: string | string[], mode: string) => IDBTransaction;
    throwIfUpgradeTransactionNull: () => void;
    objectStoreNames: import("./DOMStringList.js").DOMStringListFull;
    name: string;
    __forceClose: (msg: string) => void;
    __db: import("websql-configurable/lib/websql/WebSQLDatabase.js").default;
    __oldVersion: Integer;
    __version: Integer;
    __name: string;
    __upgradeTransaction: null | import("./IDBTransaction.js").IDBTransactionFull;
    __versionTransaction: import("./IDBTransaction.js").IDBTransactionFull;
    __transactions: import("./IDBTransaction.js").IDBTransactionFull[];
    __objectStores: {
        [key: string]: IDBObjectStore;
    };
    __objectStoreNames: import("./DOMStringList.js").DOMStringListFull;
    __oldObjectStoreNames: import("./DOMStringList.js").DOMStringListFull;
    __unblocking: {
        check: () => void;
    };
};
/**
 * @typedef {{
 *   name: string,
 *   keyPath: import('./Key.js').KeyPath,
 *   autoInc: boolean,
 *   indexList: {[key: string]: import('./IDBIndex.js').IDBIndexProperties},
 *   idbdb: IDBDatabaseFull,
 *   cursors?: (import('./IDBCursor.js').IDBCursorFull|
 *     import('./IDBCursor.js').IDBCursorWithValueFull)[],
 * }} IDBObjectStoreProperties
 */
/**
 * IDB Database Object.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#database-interface
 * @class
 */
declare function IDBDatabase(): void;
declare class IDBDatabase {
    __versionTransaction: any;
    __objectStores: any;
    /** @type {import('./IDBTransaction.js').IDBTransactionFull[]} */
    __transactions: import("./IDBTransaction.js").IDBTransactionFull[];
    /**
     * Creates a new object store.
     * @param {string} storeName
     * @this {IDBDatabaseFull}
     * @returns {IDBObjectStore}
     */
    createObjectStore(this: IDBDatabaseFull, storeName: string, ...args: any[]): IDBObjectStore;
    /**
     * Deletes an object store.
     * @param {string} storeName
     * @throws {TypeError|DOMException}
     * @this {IDBDatabaseFull}
     * @returns {void}
     */
    deleteObjectStore(this: IDBDatabaseFull, storeName: string, ...args: any[]): void;
    /**
     * @throws {TypeError}
     * @this {IDBDatabaseFull}
     * @returns {void}
     */
    close(this: IDBDatabaseFull): void;
    __closePending: boolean | undefined;
    /**
     * Starts a new transaction.
     * @param {string|string[]} storeNames
     * @this {IDBDatabaseFull}
     * @returns {import('./IDBTransaction.js').IDBTransactionFull}
     */
    transaction(this: IDBDatabaseFull, storeNames: string | string[], ...args: any[]): import("./IDBTransaction.js").IDBTransactionFull;
    /**
     * @see https://github.com/w3c/IndexedDB/issues/192
     * @throws {DOMException}
     * @this {IDBDatabaseFull}
     * @returns {void}
     */
    throwIfUpgradeTransactionNull(this: IDBDatabaseFull): void;
    /**
     *
     * @param {string} msg
     * @this {IDBDatabaseFull}
     * @returns {void}
     */
    __forceClose(this: IDBDatabaseFull, msg: string): void;
}
declare namespace IDBDatabase {
    /**
     * @typedef {number} Integer
     */
    /**
     * @typedef {IDBDatabase & EventTarget & {
     *   createObjectStore: (storeName: string) => IDBObjectStore,
     *   deleteObjectStore: (storeName: string) => void,
     *   close: () => void,
     *   transaction: (storeNames: string|string[], mode: string) => IDBTransaction,
     *   throwIfUpgradeTransactionNull: () => void,
     *   objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
     *   name: string,
     *   __forceClose: (msg: string) => void,
     *   __db: import('websql-configurable/lib/websql/WebSQLDatabase.js').default,
     *   __oldVersion: Integer,
     *   __version: Integer,
     *   __name: string,
     *   __upgradeTransaction: null|import('./IDBTransaction.js').IDBTransactionFull,
     *   __versionTransaction: import('./IDBTransaction.js').IDBTransactionFull,
     *   __transactions: import('./IDBTransaction.js').IDBTransactionFull[],
     *   __objectStores: {[key: string]: IDBObjectStore},
     *   __objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
     *   __oldObjectStoreNames: import('./DOMStringList.js').DOMStringListFull,
     *   __unblocking: {
     *     check: () => void
     *   }
     * }} IDBDatabaseFull
     */
    /**
     * @param {import('websql-configurable').default} db
     * @param {string} name
     * @param {Integer} oldVersion
     * @param {Integer} version
     * @param {SQLResultSet} storeProperties
     * @returns {IDBDatabaseFull}
     */
    function __createInstance(db: any, name: string, oldVersion: Integer, version: Integer, storeProperties: SQLResultSet): IDBDatabaseFull;
}
import IDBObjectStore from './IDBObjectStore.js';
import IDBTransaction from './IDBTransaction.js';
//# sourceMappingURL=IDBDatabase.d.ts.map