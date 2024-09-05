export type Float = number;
/**
 * Unused?
 */
export type KeyPathEvaluateFailure = {
    failure: boolean;
};
export type KeyPathEvaluateValueValueArray = KeyPathEvaluateValueValue[];
export type KeyPathEvaluateValueValue = undefined | number | string | Date | object | KeyPathEvaluateValueValue[];
export type KeyPathEvaluateValue = {
    value?: KeyPathEvaluateValueValue;
    failure?: boolean | undefined;
};
export type Integer = number;
export type CurrentNumberCallback = (cn: Integer) => void;
export type SQLFailureCallback = (exception: DOMException | Error) => void;
export type KeyForStoreCallback = (arg1: "failure" | null, arg2?: number | undefined, arg3?: number | undefined) => void;
export type ArrayBufferView = NodeJS.TypedArray | DataView;
export type BufferSource = ArrayBufferView | ArrayBuffer;
export type KeyType = "number" | "date" | "string" | "binary" | "array";
export type Value = any;
export type Key = any;
export type KeyPathArray = KeyPath[];
export type KeyPath = string | KeyPath[];
export type KeyValueObject = {
    /**
     * If not `KeyType`, indicates invalid value
     */
    type: KeyType | "NaN" | "null" | "undefined" | "boolean" | "object" | "symbol" | "function" | "bigint";
    value?: Value;
    invalid?: boolean | undefined;
    message?: string | undefined;
};
export type ValueTypePrimitive = number | string | Date | ArrayBuffer;
export type ValueTypeArray = ValueType[];
export type ValueType = ValueTypePrimitive | ValueType[];
export type AnyValue = any;
/**
 *
 * @param {Key} key
 * @param {boolean} [inArray]
 * @returns {string|null}
 */
export function encode(key: Key, inArray?: boolean | undefined): string | null;
/**
 *
 * @param {Key} key
 * @param {boolean} [inArray]
 * @throws {Error} Invalid number
 * @returns {undefined|ValueType}
 */
export function decode(key: Key, inArray?: boolean | undefined): undefined | ValueType;
/**
 *
 * @param {Key} key
 * @param {boolean} [inArray]
 * @returns {undefined|ValueType}
 */
export function roundTrip(key: Key, inArray?: boolean | undefined): undefined | ValueType;
/**
* Not currently in use but keeping for spec parity.
* @param {Key} key
* @throws {Error} Upon a "bad key"
* @returns {ValueType}
*/
export function convertKeyToValue(key: Key): ValueType;
/**
* Shortcut utility to avoid returning full keys from `convertValueToKey`
*   and subsequent need to process in calling code unless `fullKeys` is
*   set; may throw.
* @param {Value} input
* @param {Value[]|null} [seen]
* @param {boolean} [multiEntry]
* @param {boolean} [fullKeys]
* @throws {TypeError} See `getCopyBytesHeldByBufferSource`
* @todo Document other allowable `input`
* @returns {KeyValueObject}
*/
export function convertValueToKeyValueDecoded(input: Value, seen?: any[] | null | undefined, multiEntry?: boolean | undefined, fullKeys?: boolean | undefined): KeyValueObject;
/**
 *
 * @param {Key} key
 * @param {boolean} [fullKeys]
 * @returns {KeyValueObject}
 * @todo Document other allowable `key`?
 */
export function convertValueToMultiEntryKeyDecoded(key: Key, fullKeys?: boolean | undefined): KeyValueObject;
/**
 * Keys must be strings, numbers (besides `NaN`), Dates (if value is not
 *   `NaN`), binary objects or Arrays.
 * @param {Value} input The key input
 * @param {Value[]|null|undefined} [seen] An array of already seen keys
 * @returns {KeyValueObject}
 */
export function convertValueToKey(input: Value, seen?: Value[] | null | undefined): KeyValueObject;
/**
* Currently not in use.
* @param {Value} input
* @returns {KeyValueObject}
*/
export function convertValueToMultiEntryKey(input: Value): KeyValueObject;
/**
* An internal utility.
* @param {Value} input
* @param {Value[]|null|undefined} [seen]
* @throws {DOMException} `DataError`
* @returns {KeyValueObject}
*/
export function convertValueToKeyRethrowingAndIfInvalid(input: Value, seen?: Value[] | null | undefined): KeyValueObject;
/**
 *
 * @param {Value} value
 * @param {KeyPath} keyPath
 * @param {boolean} multiEntry
 * @returns {KeyValueObject|KeyPathEvaluateValue}
 * @todo Document other possible return?
 */
export function extractKeyFromValueUsingKeyPath(value: Value, keyPath: KeyPath, multiEntry: boolean): KeyValueObject | KeyPathEvaluateValue;
/**
* Not currently in use.
* @param {Value} value
* @param {KeyPath} keyPath
* @param {boolean} multiEntry
* @returns {KeyPathEvaluateValue}
*/
export function evaluateKeyPathOnValue(value: Value, keyPath: KeyPath, multiEntry: boolean): KeyPathEvaluateValue;
/**
* May throw, return `{failure: true}` (e.g., non-object on keyPath resolution)
*    or `{invalid: true}` (e.g., `NaN`).
* @param {Value} value
* @param {KeyPath} keyPath
* @param {boolean} [multiEntry]
* @param {boolean} [fullKeys]
* @returns {KeyValueObject|KeyPathEvaluateValue}
* @todo Document other possible return?
*/
export function extractKeyValueDecodedFromValueUsingKeyPath(value: Value, keyPath: KeyPath, multiEntry?: boolean | undefined, fullKeys?: boolean | undefined): KeyValueObject | KeyPathEvaluateValue;
/**
 * Sets the inline key value.
 * @param {{[key: string]: AnyValue}} value
 * @param {Key} key
 * @param {string} keyPath
 * @returns {void}
 */
export function injectKeyIntoValueUsingKeyPath(value: {
    [key: string]: any;
}, key: Key, keyPath: string): void;
/**
 *
 * @param {Value} value
 * @param {string} keyPath
 * @see https://github.com/w3c/IndexedDB/pull/146
 * @returns {boolean}
 */
export function checkKeyCouldBeInjectedIntoValue(value: Value, keyPath: string): boolean;
/**
 * Determines whether an index entry matches a multi-entry key value.
 * @param {string} encodedEntry     The entry value (already encoded)
 * @param {string} encodedKey       The full index key (already encoded)
 * @returns {boolean}
 */
export function isMultiEntryMatch(encodedEntry: string, encodedKey: string): boolean;
/**
 *
 * @param {Key} key
 * @param {import('./IDBKeyRange.js').IDBKeyRangeFull} range
 * @param {boolean} [checkCached]
 * @returns {boolean}
 */
export function isKeyInRange(key: Key, range: import('./IDBKeyRange.js').IDBKeyRangeFull, checkCached?: boolean | undefined): boolean;
/**
 *
 * @param {Key} keyEntry
 * @param {import('./IDBKeyRange.js').IDBKeyRangeFull|undefined} range
 * @returns {Key[]}
 */
export function findMultiEntryMatches(keyEntry: Key, range: import('./IDBKeyRange.js').IDBKeyRangeFull | undefined): Key[];
/**
 *
 * @param {SQLTransaction} tx
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {Integer} num
 * @param {CurrentNumberCallback} successCb
 * @param {SQLFailureCallback} failCb
 * @returns {void}
 */
export function assignCurrentNumber(tx: SQLTransaction, store: import('./IDBObjectStore.js').IDBObjectStoreFull, num: Integer, successCb: CurrentNumberCallback, failCb: SQLFailureCallback): void;
/**
 * @callback KeyForStoreCallback
 * @param {"failure"|null} arg1
 * @param {Integer} [arg2]
 * @param {Integer} [arg3]
 * @returns {void}
 */
/**
 *
 * @param {SQLTransaction} tx
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {KeyForStoreCallback} cb
 * @param {SQLFailureCallback} sqlFailCb
 * @returns {void}
 */
export function generateKeyForStore(tx: SQLTransaction, store: import('./IDBObjectStore.js').IDBObjectStoreFull, cb: KeyForStoreCallback, sqlFailCb: SQLFailureCallback): void;
/**
 *
 * @param {SQLTransaction} tx
 * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
 * @param {import('./Key.js').Key} key
 * @param {(num?: Integer) => void} successCb
 * @param {SQLFailureCallback} sqlFailCb
 * @returns {void}
 */
export function possiblyUpdateKeyGenerator(tx: SQLTransaction, store: import('./IDBObjectStore.js').IDBObjectStoreFull, key: import('./Key.js').Key, successCb: (num?: Integer) => void, sqlFailCb: SQLFailureCallback): void;
//# sourceMappingURL=Key.d.ts.map