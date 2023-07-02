export type CreateSysDBSuccessCallback = () => void;
export type Integer = number;
export type DatabaseDeleted = () => void;
export type DatabaseFull = import("websql-configurable/lib/websql/WebSQLDatabase.js").default & {
    _db: {
        _db: {
            close: (errBack: (err: Error) => void) => void;
        };
    };
};
export type OpenDatabase = (name: string, version: string, displayName: string, estimatedSize: number) => import('websql-configurable/lib/websql/WebSQLDatabase.js').default;
export type IDBFactoryFull = globalThis.IDBFactory & {
    __openDatabase: OpenDatabase;
    __connections: {
        [key: string]: import("./IDBDatabase.js").IDBDatabaseFull[];
    };
};
/**
 * IDBFactory Class.
 * @see https://w3c.github.io/IndexedDB/#idl-def-IDBFactory
 * @class
 */
export function IDBFactory(): void;
export class IDBFactory {
    /**
     * The IndexedDB Method to create a new database and return the DB.
     * @param {string} name
     * @this {IDBFactoryFull}
     * @throws {TypeError} Illegal invocation or no arguments (for database name)
     * @returns {IDBOpenDBRequest}
     */
    open(this: IDBFactoryFull, name: string, ...args: any[]): IDBOpenDBRequest;
    /**
     * Deletes a database.
     * @param {string} name
     * @this {IDBFactoryFull}
     * @returns {IDBOpenDBRequest}
     */
    deleteDatabase(this: IDBFactoryFull, name: string, ...args: any[]): IDBOpenDBRequest;
    /**
     *
     * @param {import('./Key.js').Key} key1
     * @param {import('./Key.js').Key} key2
     * @throws {TypeError}
     * @returns {0|1|-1}
     */
    cmp(key1: import('./Key.js').Key, key2: import('./Key.js').Key, ...args: any[]): 0 | 1 | -1;
    /**
    * May return outdated information if a database has since been deleted.
    * @see https://github.com/w3c/IndexedDB/pull/240/files
    * @this {IDBFactoryFull}
    * @returns {Promise<{
    *   name: string,
    *   version: Integer
    * }[]>}
    */
    databases(this: IDBFactoryFull): Promise<{
        name: string;
        version: Integer;
    }[]>;
    /**
    * @todo forceClose: Test
    * This is provided to facilitate unit-testing of the
    *  closing of a database connection with a forced flag:
    * <http://w3c.github.io/IndexedDB/#steps-for-closing-a-database-connection>
    * @param {string} dbName
    * @param {Integer} connIdx
    * @param {string} msg
    * @throws {TypeError}
    * @this {IDBFactoryFull}
    * @returns {void}
    */
    __forceClose(this: IDBFactoryFull, dbName: string, connIdx: Integer, msg: string): void;
    /**
     *
     * @param {string} [origin]
     * @returns {void}
     */
    __setConnectionQueueOrigin(origin?: string | undefined): void;
}
export namespace IDBFactory {
    /**
     * @returns {IDBFactoryFull}
     */
    function __createInstance(): IDBFactoryFull;
}
import cmp from './cmp.js';
export const shimIndexedDB: IDBFactoryFull;
/**
 * @param {import('./CFG.js').FSApi} _fs
 * @returns {void}
 */
export function setFS(_fs: import('./CFG.js').FSApi): void;
import { IDBOpenDBRequest } from './IDBRequest.js';
export { cmp };
//# sourceMappingURL=IDBFactory.d.ts.map