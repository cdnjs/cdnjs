/**
@license
 * @pnp/common v1.0.1 - pnp - provides shared functionality across all pnp libraries
 * MIT (https://github.com/pnp/pnp/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: http://officedev.github.io/PnP-JS-Core
 * source: https://github.com/pnp/pnp
 * bugs: https://github.com/pnp/pnp/issues
 */
import { Logger } from '@pnp/logging';

/**
 * Reads a blob as text
 *
 * @param blob The data to read
 */
function readBlobAsText(blob) {
    return readBlobAs(blob, "string");
}
/**
 * Reads a blob into an array buffer
 *
 * @param blob The data to read
 */
function readBlobAsArrayBuffer(blob) {
    return readBlobAs(blob, "buffer");
}
/**
 * Generic method to read blob's content
 *
 * @param blob The data to read
 * @param mode The read mode
 */
function readBlobAs(blob, mode) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            switch (mode) {
                case "string":
                    reader.readAsText(blob);
                    break;
                case "buffer":
                    reader.readAsArrayBuffer(blob);
                    break;
            }
        }
        catch (e) {
            reject(e);
        }
    });
}

/**
 * Generic dictionary
 */
class Dictionary {
    /**
     * Creates a new instance of the Dictionary<T> class
     *
     * @constructor
     */
    constructor(keys = [], values = []) {
        this.keys = keys;
        this.values = values;
    }
    /**
     * Gets a value from the collection using the specified key
     *
     * @param key The key whose value we want to return, returns null if the key does not exist
     */
    get(key) {
        const index = this.keys.indexOf(key);
        if (index < 0) {
            return null;
        }
        return this.values[index];
    }
    /**
     * Adds the supplied key and value to the dictionary
     *
     * @param key The key to add
     * @param o The value to add
     */
    add(key, o) {
        const index = this.keys.indexOf(key);
        if (index > -1) {
            if (o === null) {
                this.remove(key);
            }
            else {
                this.values[index] = o;
            }
        }
        else {
            if (o !== null) {
                this.keys.push(key);
                this.values.push(o);
            }
        }
    }
    /**
     * Merges the supplied typed hash into this dictionary instance. Existing values are updated and new ones are created as appropriate.
     */
    merge(source) {
        if ("getKeys" in source) {
            const sourceAsDictionary = source;
            sourceAsDictionary.getKeys().map(key => {
                this.add(key, sourceAsDictionary.get(key));
            });
        }
        else {
            const sourceAsHash = source;
            for (const key in sourceAsHash) {
                if (sourceAsHash.hasOwnProperty(key)) {
                    this.add(key, sourceAsHash[key]);
                }
            }
        }
    }
    /**
     * Removes a value from the dictionary
     *
     * @param key The key of the key/value pair to remove. Returns null if the key was not found.
     */
    remove(key) {
        const index = this.keys.indexOf(key);
        if (index < 0) {
            return null;
        }
        const val = this.values[index];
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
        return val;
    }
    /**
     * Returns all the keys currently in the dictionary as an array
     */
    getKeys() {
        return this.keys;
    }
    /**
     * Returns all the values currently in the dictionary as an array
     */
    getValues() {
        return this.values;
    }
    /**
     * Clears the current dictionary
     */
    clear() {
        this.keys = [];
        this.values = [];
    }
    /**
     * Gets a count of the items currently in the dictionary
     */
    get count() {
        return this.keys.length;
    }
}

function deprecated(deprecationVersion, message) {
    return function (target, propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            Logger.log({
                data: {
                    descriptor: descriptor,
                    propertyKey: propertyKey,
                    target: target,
                },
                level: 2 /* Warning */,
                message: `(${deprecationVersion}) ${message}`,
            });
            return method.apply(this, args);
        };
    };
}
function beta(message = "This feature is flagged as beta and is subject to change.") {
    return function (target, propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            Logger.log({
                data: {
                    descriptor: descriptor,
                    propertyKey: propertyKey,
                    target: target,
                },
                level: 2 /* Warning */,
                message: message,
            });
            return method.apply(this, args);
        };
    };
}

class UrlException extends Error {
    constructor(msg) {
        super(msg);
        this.name = "UrlException";
        Logger.log({ data: {}, level: 3 /* Error */, message: `[${this.name}]::${this.message}` });
    }
}

function setup(config) {
    RuntimeConfig.extend(config);
}
class RuntimeConfigImpl {
    constructor() {
        this._v = new Dictionary();
        // setup defaults
        this._v.add("defaultCachingStore", "session");
        this._v.add("defaultCachingTimeoutSeconds", 60);
        this._v.add("globalCacheDisable", false);
        this._v.add("enableCacheExpiration", false);
        this._v.add("cacheExpirationIntervalMilliseconds", 750);
        this._v.add("spfxContext", null);
    }
    /**
     *
     * @param config The set of properties to add to the globa configuration instance
     */
    extend(config) {
        Object.keys(config).forEach((key) => {
            this._v.add(key, config[key]);
        });
    }
    get(key) {
        return this._v.get(key);
    }
    get defaultCachingStore() {
        return this.get("defaultCachingStore");
    }
    get defaultCachingTimeoutSeconds() {
        return this.get("defaultCachingTimeoutSeconds");
    }
    get globalCacheDisable() {
        return this.get("globalCacheDisable");
    }
    get enableCacheExpiration() {
        return this.get("enableCacheExpiration");
    }
    get cacheExpirationIntervalMilliseconds() {
        return this.get("cacheExpirationIntervalMilliseconds");
    }
    get spfxContext() {
        return this.get("spfxContext");
    }
}
const _runtimeConfig = new RuntimeConfigImpl();
let RuntimeConfig = _runtimeConfig;

/**
 * Gets a callback function which will maintain context across async calls.
 * Allows for the calling pattern getCtxCallback(thisobj, method, methodarg1, methodarg2, ...)
 *
 * @param context The object that will be the 'this' value in the callback
 * @param method The method to which we will apply the context and parameters
 * @param params Optional, additional arguments to supply to the wrapped method when it is invoked
 */
function getCtxCallback(context, method, ...params) {
    return function () {
        method.apply(context, params);
    };
}
/**
 * Adds a value to a date
 *
 * @param date The date to which we will add units, done in local time
 * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
 * @param units The amount to add to date of the given interval
 *
 * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
 */
function dateAdd(date, interval, units) {
    let ret = new Date(date); // don't change original date
    switch (interval.toLowerCase()) {
        case "year":
            ret.setFullYear(ret.getFullYear() + units);
            break;
        case "quarter":
            ret.setMonth(ret.getMonth() + 3 * units);
            break;
        case "month":
            ret.setMonth(ret.getMonth() + units);
            break;
        case "week":
            ret.setDate(ret.getDate() + 7 * units);
            break;
        case "day":
            ret.setDate(ret.getDate() + units);
            break;
        case "hour":
            ret.setTime(ret.getTime() + units * 3600000);
            break;
        case "minute":
            ret.setTime(ret.getTime() + units * 60000);
            break;
        case "second":
            ret.setTime(ret.getTime() + units * 1000);
            break;
        default:
            ret = undefined;
            break;
    }
    return ret;
}
/**
 * Combines an arbitrary set of paths ensuring and normalizes the slashes
 *
 * @param paths 0 to n path parts to combine
 */
function combinePaths(...paths) {
    return paths
        .filter(path => !Util.stringIsNullOrEmpty(path))
        .map(path => path.replace(/^[\\|\/]/, "").replace(/[\\|\/]$/, ""))
        .join("/")
        .replace(/\\/g, "/");
}
/**
 * Gets a random string of chars length
 *
 * @param chars The length of the random string to generate
 */
function getRandomString(chars) {
    const text = new Array(chars);
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < chars; i++) {
        text[i] = possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text.join("");
}
/**
 * Gets a random GUID value
 *
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
/* tslint:disable no-bitwise */
function getGUID() {
    let d = new Date().getTime();
    const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid;
}
/* tslint:enable */
/**
 * Determines if a given value is a function
 *
 * @param cf The thing to test for functionness
 */
function isFunc(cf) {
    return typeof cf === "function";
}
/**
 * Determines if an object is both defined and not null
 * @param obj Object to test
 */
function objectDefinedNotNull(obj) {
    return typeof obj !== "undefined" && obj !== null;
}
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
*/
function isArray(array) {
    if (Array.isArray) {
        return Array.isArray(array);
    }
    return array && typeof array.length === "number" && array.constructor === Array;
}
/**
 * Provides functionality to extend the given object by doing a shallow copy
 *
 * @param target The object to which properties will be copied
 * @param source The source object from which properties will be copied
 * @param noOverwrite If true existing properties on the target are not overwritten from the source
 *
 */
function extend(target, source, noOverwrite = false) {
    if (!Util.objectDefinedNotNull(source)) {
        return target;
    }
    // ensure we don't overwrite things we don't want overwritten
    const check = noOverwrite ? (o, i) => !(i in o) : () => true;
    return Object.getOwnPropertyNames(source)
        .filter((v) => check(target, v))
        .reduce((t, v) => {
        t[v] = source[v];
        return t;
    }, target);
}
/**
 * Determines if a given url is absolute
 *
 * @param url The url to check to see if it is absolute
 */
function isUrlAbsolute(url) {
    return /^https?:\/\/|^\/\//i.test(url);
}
/**
 * Determines if a string is null or empty or undefined
 *
 * @param s The string to test
 */
function stringIsNullOrEmpty(s) {
    return typeof s === "undefined" || s === null || s.length < 1;
}
class Util {
}
/**
 * Gets a callback function which will maintain context across async calls.
 * Allows for the calling pattern getCtxCallback(thisobj, method, methodarg1, methodarg2, ...)
 *
 * @param context The object that will be the 'this' value in the callback
 * @param method The method to which we will apply the context and parameters
 * @param params Optional, additional arguments to supply to the wrapped method when it is invoked
 */
Util.getCtxCallback = getCtxCallback;
/**
 * Adds a value to a date
 *
 * @param date The date to which we will add units, done in local time
 * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
 * @param units The amount to add to date of the given interval
 *
 * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
 */
Util.dateAdd = dateAdd;
/**
 * Combines an arbitrary set of paths ensuring and normalizes the slashes
 *
 * @param paths 0 to n path parts to combine
 */
Util.combinePaths = combinePaths;
/**
 * Gets a random string of chars length
 *
 * @param chars The length of the random string to generate
 */
Util.getRandomString = getRandomString;
/**
 * Gets a random GUID value
 *
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
Util.getGUID = getGUID;
/**
 * Determines if a given value is a function
 *
 * @param cf The thing to test for functionness
 */
Util.isFunc = isFunc;
/**
 * Determines if an object is both defined and not null
 * @param obj Object to test
 */
Util.objectDefinedNotNull = objectDefinedNotNull;
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
*/
Util.isArray = isArray;
/**
 * Provides functionality to extend the given object by doing a shallow copy
 *
 * @param target The object to which properties will be copied
 * @param source The source object from which properties will be copied
 * @param noOverwrite If true existing properties on the target are not overwritten from the source
 *
 */
Util.extend = extend;
/**
 * Determines if a given url is absolute
 *
 * @param url The url to check to see if it is absolute
 */
Util.isUrlAbsolute = isUrlAbsolute;
/**
 * Determines if a string is null or empty or undefined
 *
 * @param s The string to test
 */
Util.stringIsNullOrEmpty = stringIsNullOrEmpty;

function mergeHeaders(target, source) {
    if (typeof source !== "undefined" && source !== null) {
        const temp = new Request("", { headers: source });
        temp.headers.forEach((value, name) => {
            target.append(name, value);
        });
    }
}
function mergeOptions(target, source) {
    if (Util.objectDefinedNotNull(source)) {
        const headers = Util.extend(target.headers || {}, source.headers);
        target = Util.extend(target, source);
        target.headers = headers;
    }
}
/**
 * Makes requests using the global/window fetch API
 */
class FetchClient {
    fetch(url, options) {
        return global.fetch(url, options);
    }
}
/**
 * Makes requests using the fetch API adding the supplied token to the Authorization header
 */
class BearerTokenFetchClient extends FetchClient {
    constructor(_token) {
        super();
        this._token = _token;
    }
    fetch(url, options = {}) {
        const headers = new Headers();
        mergeHeaders(headers, options.headers);
        headers.set("Authorization", `Bearer ${this._token}`);
        options.headers = headers;
        return super.fetch(url, options);
    }
}

/**
 * A wrapper class to provide a consistent interface to browser based storage
 *
 */
class PnPClientStorageWrapper {
    /**
     * Creates a new instance of the PnPClientStorageWrapper class
     *
     * @constructor
     */
    constructor(store, defaultTimeoutMinutes = -1) {
        this.store = store;
        this.defaultTimeoutMinutes = defaultTimeoutMinutes;
        this.enabled = this.test();
        // if the cache timeout is enabled call the handler
        // this will clear any expired items and set the timeout function
        if (RuntimeConfig.enableCacheExpiration) {
            Logger.write(`Enabling cache expiration.`, 1 /* Info */);
            this.cacheExpirationHandler();
        }
    }
    /**
     * Get a value from storage, or null if that value does not exist
     *
     * @param key The key whose value we want to retrieve
     */
    get(key) {
        if (!this.enabled) {
            return null;
        }
        const o = this.store.getItem(key);
        if (o == null) {
            return null;
        }
        const persistable = JSON.parse(o);
        if (new Date(persistable.expiration) <= new Date()) {
            Logger.write(`Removing item with key '${key}' from cache due to expiration.`, 1 /* Info */);
            this.delete(key);
            return null;
        }
        else {
            return persistable.value;
        }
    }
    /**
     * Adds a value to the underlying storage
     *
     * @param key The key to use when storing the provided value
     * @param o The value to store
     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
     */
    put(key, o, expire) {
        if (this.enabled) {
            this.store.setItem(key, this.createPersistable(o, expire));
        }
    }
    /**
     * Deletes a value from the underlying storage
     *
     * @param key The key of the pair we want to remove from storage
     */
    delete(key) {
        if (this.enabled) {
            this.store.removeItem(key);
        }
    }
    /**
     * Gets an item from the underlying storage, or adds it if it does not exist using the supplied getter function
     *
     * @param key The key to use when storing the provided value
     * @param getter A function which will upon execution provide the desired value
     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
     */
    getOrPut(key, getter, expire) {
        if (!this.enabled) {
            return getter();
        }
        return new Promise((resolve) => {
            const o = this.get(key);
            if (o == null) {
                getter().then((d) => {
                    this.put(key, d, expire);
                    resolve(d);
                });
            }
            else {
                resolve(o);
            }
        });
    }
    /**
     * Deletes any expired items placed in the store by the pnp library, leaves other items untouched
     */
    deleteExpired() {
        return new Promise((resolve, reject) => {
            if (!this.enabled) {
                resolve();
            }
            try {
                for (let i = 0; i < this.store.length; i++) {
                    const key = this.store.key(i);
                    if (key !== null) {
                        // test the stored item to see if we stored it
                        if (/["|']?pnp["|']? ?: ?1/i.test(this.store.getItem(key))) {
                            // get those items as get will delete from cache if they are expired
                            this.get(key);
                        }
                    }
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Used to determine if the wrapped storage is available currently
     */
    test() {
        const str = "test";
        try {
            this.store.setItem(str, str);
            this.store.removeItem(str);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Creates the persistable to store
     */
    createPersistable(o, expire) {
        if (typeof expire === "undefined") {
            // ensure we are by default inline with the global library setting
            let defaultTimeout = RuntimeConfig.defaultCachingTimeoutSeconds;
            if (this.defaultTimeoutMinutes > 0) {
                defaultTimeout = this.defaultTimeoutMinutes * 60;
            }
            expire = Util.dateAdd(new Date(), "second", defaultTimeout);
        }
        return JSON.stringify({ pnp: 1, expiration: expire, value: o });
    }
    /**
     * Deletes expired items added by this library in this.store and sets a timeout to call itself
     */
    cacheExpirationHandler() {
        Logger.write("Called cache expiration handler.", 0 /* Verbose */);
        this.deleteExpired().then(_ => {
            // call ourself in the future
            setTimeout(Util.getCtxCallback(this, this.cacheExpirationHandler), RuntimeConfig.cacheExpirationIntervalMilliseconds);
        }).catch(e => {
            // we've got some error - so just stop the loop and report the error
            Logger.log({
                data: e,
                level: 3 /* Error */,
                message: "Error deleting expired cache entries, see data for details. Timeout not reset.",
            });
        });
    }
}
/**
 * A thin implementation of in-memory storage for use in nodejs
 */
class MemoryStorage {
    constructor(_store = new Dictionary()) {
        this._store = _store;
    }
    get length() {
        return this._store.count;
    }
    clear() {
        this._store.clear();
    }
    getItem(key) {
        return this._store.get(key);
    }
    key(index) {
        return this._store.getKeys()[index];
    }
    removeItem(key) {
        this._store.remove(key);
    }
    setItem(key, data) {
        this._store.add(key, data);
    }
}
/**
 * A class that will establish wrappers for both local and session storage
 */
class PnPClientStorage {
    /**
     * Creates a new instance of the PnPClientStorage class
     *
     * @constructor
     */
    constructor(_local = null, _session = null) {
        this._local = _local;
        this._session = _session;
    }
    /**
     * Provides access to the local storage of the browser
     */
    get local() {
        if (this._local === null) {
            this._local = typeof localStorage !== "undefined" ? new PnPClientStorageWrapper(localStorage) : new PnPClientStorageWrapper(new MemoryStorage());
        }
        return this._local;
    }
    /**
     * Provides access to the session storage of the browser
     */
    get session() {
        if (this._session === null) {
            this._session = typeof sessionStorage !== "undefined" ? new PnPClientStorageWrapper(sessionStorage) : new PnPClientStorageWrapper(new MemoryStorage());
        }
        return this._session;
    }
}

export { readBlobAsText, readBlobAsArrayBuffer, Dictionary, deprecated, beta, UrlException, setup, RuntimeConfigImpl, RuntimeConfig, mergeHeaders, mergeOptions, FetchClient, BearerTokenFetchClient, PnPClientStorageWrapper, PnPClientStorage, getCtxCallback, dateAdd, combinePaths, getRandomString, getGUID, isFunc, objectDefinedNotNull, isArray, extend, isUrlAbsolute, stringIsNullOrEmpty, Util };
//# sourceMappingURL=common.js.map
