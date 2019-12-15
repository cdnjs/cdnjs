/**
 * @license
 * v1.3.8
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { mergeMaps, objectToMap, jsS, PnPClientStorage } from '@pnp/common';

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
    constructor(_settings = new Map()) {
        this._settings = _settings;
    }
    /**
     * Adds a new single setting, or overwrites a previous setting with the same key
     *
     * @param {string} key The key used to store this setting
     * @param {string} value The setting value to store
     */
    add(key, value) {
        this._settings.set(key, value);
    }
    /**
     * Adds a JSON value to the collection as a string, you must use getJSON to rehydrate the object when read
     *
     * @param {string} key The key used to store this setting
     * @param {any} value The setting value to store
     */
    addJSON(key, value) {
        this._settings.set(key, jsS(value));
    }
    /**
     * Applies the supplied hash to the setting collection overwriting any existing value, or created new values
     *
     * @param {TypedHash<any>} hash The set of values to add
     */
    apply(hash) {
        return new Promise((resolve, reject) => {
            try {
                this._settings = mergeMaps(this._settings, objectToMap(hash));
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
                this._settings = mergeMaps(this._settings, objectToMap(value));
                resolve();
            }).catch(reject);
        });
    }
    /**
     * Gets a value from the configuration
     *
     * @param {string} key The key whose value we want to return. Returns null if the key does not exist
     * @return {string} string value from the configuration
     */
    get(key) {
        return this._settings.get(key) || null;
    }
    /**
     * Gets a JSON value, rehydrating the stored string to the original object
     *
     * @param {string} key The key whose value we want to return. Returns null if the key does not exist
     * @return {any} object from the configuration
     */
    getJSON(key) {
        const o = this.get(key);
        if (o === undefined || o === null) {
            return o;
        }
        return JSON.parse(o);
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
        this.cacheKey = cacheKey;
        this.wrappedProvider = wrappedProvider;
        this.store = (cacheStore) ? cacheStore : this.selectPnPCache();
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
        // Cache not available, pass control to the wrapped provider
        if ((!this.store) || (!this.store.enabled)) {
            return this.wrappedProvider.getConfiguration();
        }
        return this.store.getOrPut(this.cacheKey, () => {
            return this.wrappedProvider.getConfiguration().then((providedConfig) => {
                this.store.put(this.cacheKey, providedConfig);
                return providedConfig;
            });
        });
    }
    selectPnPCache() {
        const pnpCache = new PnPClientStorage();
        if ((pnpCache.local) && (pnpCache.local.enabled)) {
            return pnpCache.local;
        }
        if ((pnpCache.session) && (pnpCache.session.enabled)) {
            return pnpCache.session;
        }
        throw Error("Cannot create a caching configuration provider since cache is not available.");
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
     * @param {string} listTitle Title of the SharePoint list, which contains the configuration settings (optional, default: "config")
     * @param {string} keyFieldName The name of the field in the list to use as the setting key (optional, default: "Title")
     * @param {string} valueFieldName The name of the field in the list to use as the setting value (optional, default: "Value")
     */
    constructor(web, listTitle = "config", keyFieldName = "Title", valueFieldName = "Value") {
        this.web = web;
        this.listTitle = listTitle;
        this.keyFieldName = keyFieldName;
        this.valueFieldName = valueFieldName;
    }
    /**
     * Loads the configuration values from the SharePoint list
     *
     * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
     */
    getConfiguration() {
        return this.web.lists.getByTitle(this.listTitle).items.select(this.keyFieldName, this.valueFieldName).get()
            .then((data) => data.reduce((c, item) => {
            c[item[this.keyFieldName]] = item[this.valueFieldName];
            return c;
        }, {}));
    }
    /**
     * Wraps the current provider in a cache enabled provider
     *
     * @return {CachingConfigurationProvider} Caching providers which wraps the current provider
     */
    asCaching(cacheKey = `pnp_configcache_splist_${this.web.toUrl()}+${this.listTitle}`) {
        return new CachingConfigurationProvider(this, cacheKey);
    }
}

export { Settings, CachingConfigurationProvider, SPListConfigurationProvider };
//# sourceMappingURL=config-store.js.map
