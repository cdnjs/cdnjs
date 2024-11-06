export { createDOMException };
export default setGlobalVars;
export type AnyValue = any;
export type SetConfig = (prop: import("./CFG.js").KeyofConfigValues | Partial<import("./CFG.js").ConfigValues>, val?: AnyValue) => any;
export type GetConfig = (prop: import("./CFG.js").KeyofConfigValues) => import("./CFG.js").ConfigValue;
export type SetUnicodeIdentifiers = (cfg: {
    UnicodeIDStart: string;
    UnicodeIDContinue: string;
}) => void;
export type ShimIndexedDB = (IDBFactory | object) & {
    __useShim: () => void;
    __debug: (val: boolean) => void;
    __setConfig: SetConfig;
    __getConfig: GetConfig;
    __setUnicodeIdentifiers: SetUnicodeIdentifiers;
    __setConnectionQueueOrigin: (origin?: string) => void;
};
export type Integer = number;
export type ShimmedObject = (typeof globalThis | object) & {
    indexedDB?: Partial<IDBFactory>;
    IDBFactory: typeof IDBFactory;
    IDBOpenDBRequest: typeof IDBOpenDBRequest;
    IDBRequest: typeof IDBRequest;
    IDBCursorWithValue: typeof IDBCursorWithValue;
    IDBCursor: typeof IDBCursor;
    IDBDatabase: typeof IDBDatabase;
    IDBTransaction: typeof IDBTransaction;
    IDBKeyRange: typeof IDBKeyRange;
    shimIndexedDB?: ShimIndexedDB;
};
import { createDOMException } from './DOMException.js';
/**
 * @typedef {(
 *   prop: import('./CFG.js').KeyofConfigValues
 * ) => import('./CFG.js').ConfigValue} GetConfig
 */
/**
 * @typedef {(cfg: {
 *   UnicodeIDStart: string,
 *   UnicodeIDContinue: string
 * }) => void} SetUnicodeIdentifiers
 */
/**
 * @typedef {(IDBFactory|object) & {
 *     __useShim: () => void,
 *     __debug: (val: boolean) => void,
 *     __setConfig: SetConfig,
 *     __getConfig: GetConfig,
 *     __setUnicodeIdentifiers: SetUnicodeIdentifiers,
 *     __setConnectionQueueOrigin: (origin?: string) => void
 *   }} ShimIndexedDB
 */
/**
 * @typedef {number} Integer
 */
/**
 * @typedef {(typeof globalThis|object) & {
 *   indexedDB?: Partial<IDBFactory>,
 *   IDBFactory: typeof IDBFactory,
 *   IDBOpenDBRequest: typeof IDBOpenDBRequest,
 *   IDBRequest: typeof IDBRequest,
 *   IDBCursorWithValue: typeof IDBCursorWithValue,
 *   IDBCursor: typeof IDBCursor,
 *   IDBDatabase: typeof IDBDatabase,
 *   IDBTransaction: typeof IDBTransaction,
 *   IDBKeyRange: typeof IDBKeyRange,
 *   shimIndexedDB?: ShimIndexedDB
 * }} ShimmedObject
 */
/**
 *
 * @param {ShimmedObject} [idb]
 * @param {import('./CFG.js').ConfigValues} [initialConfig]
 * @returns {ShimmedObject}
 */
declare function setGlobalVars(idb?: ShimmedObject | undefined, initialConfig?: import("./CFG.js").ConfigValues | undefined): ShimmedObject;
import { IDBFactory } from './IDBFactory.js';
//# sourceMappingURL=setGlobalVars.d.ts.map