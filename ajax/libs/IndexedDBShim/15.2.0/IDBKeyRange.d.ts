export type IDBKeyRangeFull = globalThis.IDBKeyRange & {
    __lowerCached: string | null | false;
    __upperCached: string | null | false;
    __lowerOpen: boolean;
};
/**
 * @param {IDBKeyRangeFull|undefined} range
 * @param {string} quotedKeyColumnName
 * @param {string[]} sql
 * @param {string[]} sqlValues
 * @param {boolean} [addAnd]
 * @param {boolean} [checkCached]
 * @returns {void}
 */
export function setSQLForKeyRange(range: IDBKeyRangeFull | undefined, quotedKeyColumnName: string, sql: string[], sqlValues: string[], addAnd?: boolean | undefined, checkCached?: boolean | undefined): void;
/**
 * @typedef {globalThis.IDBKeyRange & {
*   __lowerCached: string|null|false,
*   __upperCached: string|null|false,
*   __lowerOpen: boolean,
* }} IDBKeyRangeFull
*/
/**
 * The IndexedDB KeyRange object.
 * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#dfn-key-range
 * @throws {TypeError}
 * @class
 */
export function IDBKeyRange(): void;
export class IDBKeyRange {
    __lowerOpen: any;
    __upperOpen: any;
    /**
     * @param {import('./Key.js').Key} key
     * @this {IDBKeyRangeFull}
     * @returns {boolean}
     */
    includes(this: IDBKeyRangeFull, key: import("./Key.js").Key, ...args: any[]): boolean;
}
export namespace IDBKeyRange {
    /**
     * @param {import('./Key.js').Key|null} lower
     * @param {import('./Key.js').Key|null} upper
     * @param {boolean} lowerOpen
     * @param {boolean} upperOpen
     * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull}
     */
    function __createInstance(lower: import("./Key.js").Key | null, upper: import("./Key.js").Key | null, lowerOpen: boolean, upperOpen: boolean): import("./IDBKeyRange.js").IDBKeyRangeFull;
    /**
     * @param {import('./Key.js').Value} value
     * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull}
     */
    function only(value: import("./Key.js").Value, ...args: any[]): import("./IDBKeyRange.js").IDBKeyRangeFull;
    /**
     * @param {import('./Key.js').Value} value
     * @returns {globalThis.IDBKeyRange}
     */
    function lowerBound(value: import("./Key.js").Value, ...args: any[]): globalThis.IDBKeyRange;
    /**
     * @param {import('./Key.js').Value} value
     * @returns {globalThis.IDBKeyRange}
     */
    function upperBound(value: import("./Key.js").Value, ...args: any[]): globalThis.IDBKeyRange;
    /**
     * @param {import('./Key.js').Value} lower
     * @param {import('./Key.js').Value} upper
     * @returns {globalThis.IDBKeyRange}
     */
    function bound(lower: import("./Key.js").Value, upper: import("./Key.js").Value, ...args: any[]): globalThis.IDBKeyRange;
}
/**
 * @param {import('./Key.js').Value} value
 * @param {boolean} [nullDisallowed]
 * @throws {DOMException}
 * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull|undefined}
 */
export function convertValueToKeyRange(value: import("./Key.js").Value, nullDisallowed?: boolean | undefined): import("./IDBKeyRange.js").IDBKeyRangeFull | undefined;
export { IDBKeyRange as default };
//# sourceMappingURL=IDBKeyRange.d.ts.map