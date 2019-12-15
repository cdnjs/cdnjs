import { Dictionary, PnPClientStorage } from '@pnp/common';
import { Logger } from '@pnp/logging';

/**
 * Class used to manage the current application settings
 *
 */
class Settings {
    /**
     * Creates a new instance of the settings class
     *
     * @constructor
     */
    constructor() {
        this._settings = new Dictionary();
    }
    /**
     * Adds a new single setting, or overwrites a previous setting with the same key
     *
     * @param {string} key The key used to store this setting
     * @param {string} value The setting value to store
     */
    add(key, value) {
        this._settings.add(key, value);
    }
    /**
     * Adds a JSON value to the collection as a string, you must use getJSON to rehydrate the object when read
     *
     * @param {string} key The key used to store this setting
     * @param {any} value The setting value to store
     */
    addJSON(key, value) {
        this._settings.add(key, JSON.stringify(value));
    }
    /**
     * Applies the supplied hash to the setting collection overwriting any existing value, or created new values
     *
     * @param {TypedHash<any>} hash The set of values to add
     */
    apply(hash) {
        return new Promise((resolve, reject) => {
            try {
                this._settings.merge(hash);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Loads configuration settings into the collection from the supplied provider and returns a Promise
     *
     * @param {IConfigurationProvider} provider The provider from which we will load the settings
     */
    load(provider) {
        return new Promise((resolve, reject) => {
            provider.getConfiguration().then((value) => {
                this._settings.merge(value);
                resolve();
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
    /**
     * Gets a value from the configuration
     *
     * @param {string} key The key whose value we want to return. Returns null if the key does not exist
     * @return {string} string value from the configuration
     */
    get(key) {
        return this._settings.get(key);
    }
    /**
     * Gets a JSON value, rehydrating the stored string to the original object
     *
     * @param {string} key The key whose value we want to return. Returns null if the key does not exist
     * @return {any} object from the configuration
     */
    getJSON(key) {
        const o = this.get(key);
        if (typeof o === "undefined" || o === null) {
            return o;
        }
        return JSON.parse(o);
    }
}

class NoCacheAvailableException extends Error {
    constructor(msg = "Cannot create a caching configuration provider since cache is not available.") {
        super(msg);
        this.name = "NoCacheAvailableException";
        Logger.log({ data: {}, level: 3 /* Error */, message: `[${this.name}]::${this.message}` });
    }
}

/**
 * A caching provider which can wrap other non-caching providers
 *
 */
class CachingConfigurationProvider {
    /**
     * Creates a new caching configuration provider
     * @constructor
     * @param {IConfigurationProvider} wrappedProvider Provider which will be used to fetch the configuration
     * @param {string} cacheKey Key that will be used to store cached items to the cache
     * @param {IPnPClientStore} cacheStore OPTIONAL storage, which will be used to store cached settings.
     */
    constructor(wrappedProvider, cacheKey, cacheStore) {
        this.wrappedProvider = wrappedProvider;
        this.store = (cacheStore) ? cacheStore : this.selectPnPCache();
        this.cacheKey = `_configcache_${cacheKey}`;
    }
    /**
     * Gets the wrapped configuration providers
     *
     * @return {IConfigurationProvider} Wrapped configuration provider
     */
    getWrappedProvider() {
        return this.wrappedProvider;
    }
    /**
     * Loads the configuration values either from the cache or from the wrapped provider
     *
     * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
     */
    getConfiguration() {
        // Cache not available, pass control to  the wrapped provider
        if ((!this.store) || (!this.store.enabled)) {
            return this.wrappedProvider.getConfiguration();
        }
        // Value is found in cache, return it directly
        const cachedConfig = this.store.get(this.cacheKey);
        if (cachedConfig) {
            return new Promise((resolve) => {
                resolve(cachedConfig);
            });
        }
        // Get and cache value from the wrapped provider
        const providerPromise = this.wrappedProvider.getConfiguration();
        providerPromise.then((providedConfig) => {
            this.store.put(this.cacheKey, providedConfig);
        });
        return providerPromise;
    }
    selectPnPCache() {
        const pnpCache = new PnPClientStorage();
        if ((pnpCache.local) && (pnpCache.local.enabled)) {
            return pnpCache.local;
        }
        if ((pnpCache.session) && (pnpCache.session.enabled)) {
            return pnpCache.session;
        }
        throw new NoCacheAvailableException();
    }
}

/**
 * A configuration provider which loads configuration values from a SharePoint list
 *
 */
class SPListConfigurationProvider {
    /**
     * Creates a new SharePoint list based configuration provider
     * @constructor
     * @param {string} webUrl Url of the SharePoint site, where the configuration list is located
     * @param {string} listTitle Title of the SharePoint list, which contains the configuration settings (optional, default = "config")
     */
    constructor(sourceWeb, sourceListTitle = "config") {
        this.sourceWeb = sourceWeb;
        this.sourceListTitle = sourceListTitle;
    }
    /**
     * Gets the url of the SharePoint site, where the configuration list is located
     *
     * @return {string} Url address of the site
     */
    get web() {
        return this.sourceWeb;
    }
    /**
     * Gets the title of the SharePoint list, which contains the configuration settings
     *
     * @return {string} List title
     */
    get listTitle() {
        return this.sourceListTitle;
    }
    /**
     * Loads the configuration values from the SharePoint list
     *
     * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
     */
    getConfiguration() {
        return this.web.lists.getByTitle(this.listTitle).items.select("Title", "Value")
            .getAs().then((data) => {
            return data.reduce((configuration, item) => {
                return Object.defineProperty(configuration, item.Title, {
                    configurable: false,
                    enumerable: false,
                    value: item.Value,
                    writable: false,
                });
            }, {});
        });
    }
    /**
     * Wraps the current provider in a cache enabled provider
     *
     * @return {CachingConfigurationProvider} Caching providers which wraps the current provider
     */
    asCaching() {
        const cacheKey = `splist_${this.web.toUrl()}+${this.listTitle}`;
        return new CachingConfigurationProvider(this, cacheKey);
    }
}

export { Settings, CachingConfigurationProvider, SPListConfigurationProvider, NoCacheAvailableException };
//# sourceMappingURL=config-store.js.map
