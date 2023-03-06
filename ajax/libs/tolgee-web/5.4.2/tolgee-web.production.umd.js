(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["@tolgee/web"] = global["@tolgee/web"] || {}, global["@tolgee/web"].production = {})));
})(this, (function (exports) { 'use strict';

    // needs to be same as in @tolgee/core package
    const DEVTOOLS_ID = '__tolgee_dev_tools';
    const PREFERRED_LANGUAGES_LOCAL_STORAGE_KEY = '__tolgee_preferredLanguages';
    /**
     * Use this if you want to indicate to tolgee that element contains key
     */
    const TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE = 'data-tolgee-key-only';
    /**
     * Use this attribute if you want tolgee Observer to not touch part of the DOM
     */
    const TOLGEE_RESTRICT_ATTRIBUTE = 'data-tolgee-restricted';
    /**
     * This attribute is present on elements that have been registred by tolgee and are clickable for in-context
     */
    const TOLGEE_ATTRIBUTE_NAME = '_tolgee';
    const TOLGEE_HIGHLIGHTER_CLASS = '_tolgee-highlighter';

    function isSSR() {
        var _a, _b;
        return typeof ((_b = (_a = globalThis.window) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.createElement) === 'undefined';
    }
    function throwIfSSR(origin) {
        if (isSSR()) {
            throw new Error(`${origin}: Can't run on the server`);
        }
    }

    const DomHelper = (options) => {
        function getParentElement(node) {
            if (node.parentElement) {
                return node.parentElement;
            }
            if (node.ownerElement) {
                return node.ownerElement || undefined;
            }
        }
        function getSuitableParent(node) {
            const domParent = getParentElement(node);
            if (domParent === undefined) {
                // eslint-disable-next-line no-console
                console.error(node);
                throw new Error('No suitable parent found for node above.');
            }
            if (!options.passToParent) {
                return domParent;
            }
            if (Array.isArray(options.passToParent)) {
                const tagNameEquals = (elementTagName) => domParent.tagName.toLowerCase() === elementTagName.toLowerCase();
                if (options.passToParent.findIndex(tagNameEquals) === -1) {
                    return domParent;
                }
            }
            if (typeof options.passToParent === 'function') {
                if (!options.passToParent(domParent)) {
                    return domParent;
                }
            }
            return getSuitableParent(domParent);
        }
        return Object.freeze({
            getSuitableParent,
        });
    };

    function initElementMeta() {
        return {
            nodes: new Map(),
        };
    }
    function initNodeMeta(oldTextContent, keys) {
        return {
            oldTextContent,
            keys,
        };
    }

    function isPromise(value) {
        return Boolean(value && typeof value.then === 'function');
    }
    const valueOrPromise = (value, callback) => {
        if (isPromise(value)) {
            return Promise.resolve(value).then(callback);
        }
        else {
            return callback(value);
        }
    };
    const missingOptionError = (option) => `Tolgee: You need to specify '${option}' option`;
    function isObject(item) {
        return typeof item === 'object' && !Array.isArray(item) && item !== null;
    }
    function getFallback(value) {
        if (typeof value === 'string') {
            return [value];
        }
        if (Array.isArray(value)) {
            return value;
        }
        return undefined;
    }
    function getFallbackArray(value) {
        return getFallback(value) || [];
    }
    function getFallbackFromStruct(language, fallbackLanguage) {
        if (isObject(fallbackLanguage)) {
            return getFallbackArray(fallbackLanguage === null || fallbackLanguage === void 0 ? void 0 : fallbackLanguage[language]);
        }
        else {
            return getFallbackArray(fallbackLanguage);
        }
    }
    function unique(arr) {
        return Array.from(new Set(arr));
    }
    function sanitizeUrl(url) {
        return url ? url.replace(/\/+$/, '') : url;
    }
    function getErrorMessage(error) {
        if (typeof error === 'string') {
            return error;
        }
        else if (typeof (error === null || error === void 0 ? void 0 : error.message) === 'string') {
            return error.message;
        }
    }

    const EventEmitter = (isActive) => {
        let handlers = [];
        const listen = (handler) => {
            const handlerWrapper = (e) => {
                handler(e);
            };
            handlers.push(handlerWrapper);
            return {
                unsubscribe: () => {
                    handlers = handlers.filter((i) => handlerWrapper !== i);
                },
            };
        };
        const emit = (data) => {
            if (isActive()) {
                handlers.forEach((handler) => handler({ value: data }));
            }
        };
        return Object.freeze({ listen, emit });
    };

    const EventEmitterSelective = (isActive, getFallbackNs, getDefaultNs) => {
        const listeners = new Set();
        const partialListeners = new Set();
        const listen = (handler) => {
            listeners.add(handler);
            const result = {
                unsubscribe: () => {
                    listeners.delete(handler);
                },
            };
            return result;
        };
        const listenSome = (handler) => {
            const handlerWrapper = {
                fn: (e) => {
                    handler(e);
                },
                namespaces: new Set(),
            };
            partialListeners.add(handlerWrapper);
            const result = {
                unsubscribe: () => {
                    partialListeners.delete(handlerWrapper);
                },
                subscribeNs: (ns) => {
                    getFallbackArray(ns).forEach((val) => handlerWrapper.namespaces.add(val));
                    if (ns === undefined) {
                        // subscribing to default ns
                        handlerWrapper.namespaces.add(getDefaultNs());
                    }
                    return result;
                },
            };
            return result;
        };
        const callHandlers = (ns) => {
            // everything is implicitly subscribed to fallbacks
            // as it can always fall through to it
            const fallbackNamespaces = new Set(getFallbackNs());
            partialListeners.forEach((handler) => {
                const nsMatches = ns === undefined ||
                    (ns === null || ns === void 0 ? void 0 : ns.findIndex((ns) => fallbackNamespaces.has(ns) || handler.namespaces.has(ns))) !== -1;
                if (nsMatches) {
                    handler.fn({ value: undefined });
                }
            });
        };
        let queue = [];
        // merge events in queue into one event
        const solveQueue = () => {
            if (queue.length === 0) {
                return;
            }
            const queueCopy = queue;
            queue = [];
            listeners.forEach((handler) => {
                handler({ value: undefined });
            });
            let namespaces = new Set();
            queueCopy.forEach((ns) => {
                if (ns === undefined) {
                    // when no ns specified, it affects all namespaces
                    namespaces = undefined;
                }
                else if (namespaces !== undefined) {
                    ns.forEach((ns) => namespaces.add(ns));
                }
            });
            const namespacesArray = namespaces
                ? Array.from(namespaces.keys())
                : undefined;
            callHandlers(namespacesArray);
        };
        const emit = (ns, delayed) => {
            if (isActive()) {
                queue.push(ns);
                if (!delayed) {
                    solveQueue();
                }
                else {
                    setTimeout(solveQueue, 0);
                }
            }
        };
        return Object.freeze({ listenSome, listen, emit });
    };

    const Events = (getFallbackNs, getDefaultNs) => {
        let emitterActive = true;
        function isActive() {
            return emitterActive;
        }
        const onPendingLanguageChange = EventEmitter(isActive);
        const onLanguageChange = EventEmitter(isActive);
        const onLoadingChange = EventEmitter(isActive);
        const onFetchingChange = EventEmitter(isActive);
        const onInitialLoaded = EventEmitter(isActive);
        const onRunningChange = EventEmitter(isActive);
        const onCacheChange = EventEmitter(isActive);
        const onUpdate = EventEmitterSelective(isActive, getFallbackNs, getDefaultNs);
        onInitialLoaded.listen(() => onUpdate.emit());
        onLanguageChange.listen(() => onUpdate.emit());
        onCacheChange.listen(({ value }) => {
            onUpdate.emit([value.namespace], true);
        });
        const on = (event, handler) => {
            switch (event) {
                case 'pendingLanguage':
                    return onPendingLanguageChange.listen(handler);
                case 'language':
                    return onLanguageChange.listen(handler);
                case 'loading':
                    return onLoadingChange.listen(handler);
                case 'fetching':
                    return onFetchingChange.listen(handler);
                case 'initialLoad':
                    return onInitialLoaded.listen(handler);
                case 'running':
                    return onRunningChange.listen(handler);
                case 'cache':
                    return onCacheChange.listen(handler);
                case 'update':
                    return onUpdate.listen(handler);
            }
        };
        function setEmmiterActive(active) {
            emitterActive = active;
        }
        return Object.freeze({
            onPendingLanguageChange,
            onLanguageChange,
            onLoadingChange,
            onFetchingChange,
            onInitialLoaded,
            onRunningChange,
            onCacheChange,
            onUpdate,
            setEmmiterActive,
            on,
        });
    };

    const flattenTranslations = (data) => {
        const result = new Map();
        Object.entries(data).forEach(([key, value]) => {
            // ignore empty values
            if (value === undefined || value === null) {
                return;
            }
            if (typeof value === 'object') {
                flattenTranslations(value).forEach((flatValue, flatKey) => {
                    result.set(key + '.' + flatKey, flatValue);
                });
                return;
            }
            result.set(key, value);
        });
        return result;
    };
    const decodeCacheKey = (key) => {
        const [firstPart, ...rest] = key.split(':');
        // if namespaces contains ":" it won't get lost
        const secondPart = rest.join(':');
        return { language: firstPart, namespace: secondPart || '' };
    };
    const encodeCacheKey = ({ language, namespace, }) => {
        if (namespace) {
            return `${language}:${namespace}`;
        }
        else {
            return language;
        }
    };

    const Cache = (onCacheChange, backendGetRecord, backendGetDevRecord, withDefaultNs, isInitialLoading, fetchingObserver, loadingObserver) => {
        const asyncRequests = new Map();
        const cache = new Map();
        let staticData = {};
        let version = 0;
        function addStaticData(data) {
            if (data) {
                staticData = Object.assign(Object.assign({}, staticData), data);
                Object.entries(data).forEach(([key, value]) => {
                    if (typeof value !== 'function') {
                        const descriptor = decodeCacheKey(key);
                        const existing = cache.get(key);
                        if (!existing || existing.version === 0) {
                            addRecordInternal(descriptor, value, 0);
                        }
                    }
                });
            }
        }
        function invalidate() {
            asyncRequests.clear();
            version += 1;
        }
        function addRecordInternal(descriptor, data, recordVersion) {
            const cacheKey = encodeCacheKey(descriptor);
            cache.set(cacheKey, {
                data: flattenTranslations(data),
                version: recordVersion,
            });
            onCacheChange.emit(descriptor);
        }
        function addRecord(descriptor, data) {
            addRecordInternal(descriptor, data, version);
        }
        function exists(descriptor, strict = false) {
            const record = cache.get(encodeCacheKey(descriptor));
            if (record && strict) {
                return record.version === version;
            }
            return Boolean(record);
        }
        function getRecord(descriptor) {
            var _a;
            return (_a = cache.get(encodeCacheKey(withDefaultNs(descriptor)))) === null || _a === void 0 ? void 0 : _a.data;
        }
        function getTranslation(descriptor, key) {
            var _a;
            return (_a = cache.get(encodeCacheKey(descriptor))) === null || _a === void 0 ? void 0 : _a.data.get(key);
        }
        function getTranslationNs(namespaces, languages, key) {
            var _a;
            for (const namespace of namespaces) {
                for (const language of languages) {
                    const value = (_a = cache
                        .get(encodeCacheKey({ language, namespace }))) === null || _a === void 0 ? void 0 : _a.data.get(key);
                    if (value !== undefined && value !== null) {
                        return [namespace];
                    }
                }
            }
            return unique(namespaces);
        }
        function getTranslationFallback(namespaces, languages, key) {
            var _a;
            for (const namespace of namespaces) {
                for (const language of languages) {
                    const value = (_a = cache
                        .get(encodeCacheKey({ language, namespace }))) === null || _a === void 0 ? void 0 : _a.data.get(key);
                    if (value !== undefined && value !== null) {
                        return value;
                    }
                }
            }
            return undefined;
        }
        function changeTranslation(descriptor, key, value) {
            var _a;
            const record = (_a = cache.get(encodeCacheKey(descriptor))) === null || _a === void 0 ? void 0 : _a.data;
            record === null || record === void 0 ? void 0 : record.set(key, value);
            onCacheChange.emit(Object.assign(Object.assign({}, descriptor), { key }));
        }
        function isFetching(ns) {
            if (isInitialLoading()) {
                return true;
            }
            if (ns === undefined) {
                return asyncRequests.size > 0;
            }
            const namespaces = getFallbackArray(ns);
            return Boolean(Array.from(asyncRequests.keys()).find((key) => namespaces.includes(decodeCacheKey(key).namespace)));
        }
        function isLoading(language, ns) {
            const namespaces = getFallbackArray(ns);
            return Boolean(isInitialLoading() ||
                Array.from(asyncRequests.keys()).find((key) => {
                    const descriptor = decodeCacheKey(key);
                    return ((!namespaces.length || namespaces.includes(descriptor.namespace)) &&
                        !exists({
                            namespace: descriptor.namespace,
                            language: language,
                        }));
                }));
        }
        /**
         * Fetches production data
         */
        function fetchProd(keyObject) {
            let dataPromise = undefined;
            if (!dataPromise) {
                const staticDataValue = staticData[encodeCacheKey(keyObject)];
                if (typeof staticDataValue === 'function') {
                    dataPromise = staticDataValue();
                }
            }
            if (!dataPromise) {
                dataPromise = backendGetRecord(keyObject);
            }
            return dataPromise;
        }
        function fetchData(keyObject, isDev) {
            var _a;
            let dataPromise = undefined;
            if (isDev) {
                dataPromise = (_a = backendGetDevRecord(keyObject)) === null || _a === void 0 ? void 0 : _a.catch(() => {
                    // eslint-disable-next-line no-console
                    console.warn(`Tolgee: Failed to fetch data from dev backend`);
                    // fallback to prod fetch if dev fails
                    return fetchProd(keyObject);
                });
            }
            if (!dataPromise) {
                dataPromise = fetchProd(keyObject);
            }
            return dataPromise;
        }
        async function loadRecords(descriptors, isDev) {
            const withPromises = descriptors.map((descriptor) => {
                const keyObject = withDefaultNs(descriptor);
                const cacheKey = encodeCacheKey(keyObject);
                const existingPromise = asyncRequests.get(cacheKey);
                if (existingPromise) {
                    return {
                        new: false,
                        promise: existingPromise,
                        keyObject,
                        cacheKey,
                    };
                }
                const dataPromise = fetchData(keyObject, isDev) || Promise.resolve(undefined);
                asyncRequests.set(cacheKey, dataPromise);
                return {
                    new: true,
                    promise: dataPromise,
                    keyObject,
                    cacheKey,
                };
            });
            fetchingObserver.notify();
            loadingObserver.notify();
            const results = await Promise.all(withPromises.map((val) => val.promise));
            withPromises.forEach((value, i) => {
                const promiseChanged = asyncRequests.get(value.cacheKey) !== value.promise;
                // if promise has changed in between, it means cache been invalidated or
                // new data are being fetched
                if (value.new && !promiseChanged) {
                    asyncRequests.delete(value.cacheKey);
                    const data = results[i];
                    if (data) {
                        addRecord(value.keyObject, data);
                    }
                    else if (!getRecord(value.keyObject)) {
                        // if no data exist, put empty object
                        addRecord(value.keyObject, {});
                    }
                }
            });
            fetchingObserver.notify();
            loadingObserver.notify();
            return withPromises.map((val) => getRecord(val.keyObject));
        }
        function getAllRecords() {
            const entries = Array.from(cache.entries());
            return entries.map(([key, entry]) => {
                return Object.assign(Object.assign({}, decodeCacheKey(key)), { data: entry.data });
            });
        }
        return Object.freeze({
            addStaticData,
            invalidate,
            addRecord,
            exists,
            getRecord,
            getTranslation,
            getTranslationNs,
            getTranslationFallback,
            changeTranslation,
            isFetching,
            isLoading,
            loadRecords,
            getAllRecords,
        });
    };

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __rest$1(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    const defaultObserverOptions = {
        tagAttributes: {
            textarea: ['placeholder'],
            input: ['value', 'placeholder'],
            img: ['alt'],
            '*': ['aria-label', 'title'],
        },
        restrictedElements: ['script', 'style'],
        highlightKeys: ['Alt'],
        highlightColor: 'rgb(255, 0, 0)',
        highlightWidth: 5,
        inputPrefix: '%-%tolgee:',
        inputSuffix: '%-%',
        passToParent: ['option', 'optgroup'],
    };

    const DEFAULT_FORMAT_ERROR = 'invalid';
    const DEFAULT_API_URL = 'https://app.tolgee.io';
    const defaultValues = {
        defaultNs: '',
        observerOptions: defaultObserverOptions,
        observerType: 'invisible',
        onFormatError: DEFAULT_FORMAT_ERROR,
        apiUrl: DEFAULT_API_URL,
    };
    const combineOptions = (...states) => {
        let result = {};
        states.forEach((state) => {
            result = Object.assign(Object.assign(Object.assign({}, result), state), { observerOptions: Object.assign(Object.assign({}, result.observerOptions), state === null || state === void 0 ? void 0 : state.observerOptions) });
        });
        return result;
    };
    const initState = (options, previousState) => {
        const initialOptions = combineOptions(defaultValues, previousState === null || previousState === void 0 ? void 0 : previousState.initialOptions, options);
        // remove extra '/' from url end
        initialOptions.apiUrl = sanitizeUrl(initialOptions.apiUrl);
        return {
            initialOptions,
            activeNamespaces: (previousState === null || previousState === void 0 ? void 0 : previousState.activeNamespaces) || new Map(),
            language: previousState === null || previousState === void 0 ? void 0 : previousState.language,
            pendingLanguage: previousState === null || previousState === void 0 ? void 0 : previousState.language,
            isInitialLoading: false,
            isRunning: false,
        };
    };

    const Plugins = (getLanguage, getInitialOptions, getAvailableLanguages, getTranslationNs, getTranslation, changeTranslation) => {
        const plugins = {
            ui: undefined,
        };
        const instances = {
            formatters: [],
            finalFormatter: undefined,
            observer: undefined,
            devBackend: undefined,
            backends: [],
            ui: undefined,
            languageDetector: undefined,
            languageStorage: undefined,
        };
        const onClick = async ({ keysAndDefaults, event }) => {
            var _a;
            const withNs = keysAndDefaults.map(({ key, ns, defaultValue }) => {
                return {
                    key,
                    defaultValue,
                    ns: getTranslationNs({ key, ns }),
                    translation: getTranslation({
                        key,
                        ns,
                    }),
                };
            });
            (_a = instances.ui) === null || _a === void 0 ? void 0 : _a.handleElementClick(withNs, event);
        };
        const stop = () => {
            var _a;
            instances.ui = undefined;
            (_a = instances.observer) === null || _a === void 0 ? void 0 : _a.stop();
        };
        const highlight = (key, ns) => {
            var _a, _b;
            return ((_b = (_a = instances.observer) === null || _a === void 0 ? void 0 : _a.highlight) === null || _b === void 0 ? void 0 : _b.call(_a, key, ns)) || { unhighlight() { } };
        };
        const translate = (props) => {
            const translation = getTranslation({
                key: props.key,
                ns: props.ns,
            });
            return formatTranslation(Object.assign(Object.assign({}, props), { translation, formatEnabled: true }));
        };
        const setObserver = (observer) => {
            instances.observer = observer === null || observer === void 0 ? void 0 : observer();
        };
        const hasObserver = () => {
            return Boolean(instances.observer);
        };
        const addFormatter = (formatter) => {
            if (formatter) {
                instances.formatters.push(formatter);
            }
        };
        const setFinalFormatter = (formatter) => {
            instances.finalFormatter = formatter;
        };
        const setUi = (ui) => {
            plugins.ui = ui;
        };
        const hasUi = () => {
            return Boolean(plugins.ui);
        };
        const setLanguageStorage = (storage) => {
            instances.languageStorage = storage;
        };
        const getLanguageStorage = () => {
            return instances.languageStorage;
        };
        const setStoredLanguage = (language) => {
            var _a;
            (_a = instances.languageStorage) === null || _a === void 0 ? void 0 : _a.setLanguage(language);
        };
        const setLanguageDetector = (detector) => {
            instances.languageDetector = detector;
        };
        const getLanguageDetector = () => {
            return instances.languageDetector;
        };
        const detectLanguage = () => {
            if (!instances.languageDetector) {
                return undefined;
            }
            const availableLanguages = getAvailableLanguages();
            return instances.languageDetector.getLanguage({
                availableLanguages,
            });
        };
        const getInitialLanguage = () => {
            var _a;
            const availableLanguages = getAvailableLanguages();
            const languageOrPromise = (_a = instances.languageStorage) === null || _a === void 0 ? void 0 : _a.getLanguage();
            return valueOrPromise(languageOrPromise, (language) => {
                if ((!availableLanguages || availableLanguages.includes(language)) &&
                    language) {
                    return language;
                }
                return detectLanguage();
            });
        };
        const addBackend = (backend) => {
            if (backend) {
                instances.backends.push(backend);
            }
        };
        const setDevBackend = (backend) => {
            instances.devBackend = backend;
        };
        const run = () => {
            var _a, _b;
            const { apiKey, apiUrl, projectId, observerOptions } = getInitialOptions();
            instances.ui = (_a = plugins.ui) === null || _a === void 0 ? void 0 : _a.call(plugins, {
                apiKey: apiKey,
                apiUrl: apiUrl,
                projectId,
                highlight,
                changeTranslation,
            });
            (_b = instances.observer) === null || _b === void 0 ? void 0 : _b.run({
                mouseHighlight: true,
                options: observerOptions,
                translate,
                onClick,
            });
        };
        const getDevBackend = () => {
            return instances.devBackend;
        };
        const getBackendDevRecord = ({ language, namespace }) => {
            var _a;
            const { apiKey, apiUrl, projectId } = getInitialOptions();
            return (_a = instances.devBackend) === null || _a === void 0 ? void 0 : _a.getRecord({
                apiKey,
                apiUrl,
                projectId,
                language,
                namespace,
            });
        };
        const getBackendRecord = ({ language, namespace }) => {
            for (const backend of instances.backends) {
                const data = backend.getRecord({ language, namespace });
                if (isPromise(data)) {
                    return data === null || data === void 0 ? void 0 : data.catch((e) => {
                        // eslint-disable-next-line no-console
                        console.error(e);
                        return {};
                    });
                }
                if (data !== undefined) {
                    return data;
                }
            }
            return undefined;
        };
        const unwrap = (text) => {
            var _a;
            if (instances.observer) {
                return (_a = instances.observer) === null || _a === void 0 ? void 0 : _a.unwrap(text);
            }
            return { text, keys: [] };
        };
        const retranslate = () => {
            var _a;
            (_a = instances.observer) === null || _a === void 0 ? void 0 : _a.retranslate();
        };
        function addPlugin(tolgeeInstance, plugin) {
            const pluginTools = Object.freeze({
                setFinalFormatter,
                addFormatter,
                setObserver,
                hasObserver,
                setUi,
                hasUi,
                setDevBackend,
                addBackend,
                setLanguageDetector,
                setLanguageStorage,
            });
            plugin(tolgeeInstance, pluginTools);
        }
        function formatTranslation(_a) {
            var _b;
            var { formatEnabled } = _a, props = __rest$1(_a, ["formatEnabled"]);
            const { key, translation, defaultValue, noWrap, params, orEmpty, ns } = props;
            const formattableTranslation = translation || defaultValue;
            let result = formattableTranslation || (orEmpty ? '' : key);
            const language = getLanguage();
            const isFormatEnabled = formatEnabled || !((_b = instances.observer) === null || _b === void 0 ? void 0 : _b.outputNotFormattable);
            const wrap = (result) => {
                if (instances.observer && !noWrap) {
                    return instances.observer.wrap({
                        key,
                        translation: result,
                        defaultValue,
                        params,
                        ns,
                    });
                }
                return result;
            };
            result = wrap(result);
            try {
                if (formattableTranslation && language && isFormatEnabled) {
                    for (const formatter of instances.formatters) {
                        result = formatter.format({
                            translation: result,
                            language,
                            params,
                        });
                    }
                }
                if (instances.finalFormatter &&
                    formattableTranslation &&
                    language &&
                    isFormatEnabled) {
                    result = instances.finalFormatter.format({
                        translation: result,
                        language,
                        params,
                    });
                }
            }
            catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
                const errorMessage = getErrorMessage(e) || DEFAULT_FORMAT_ERROR;
                const onFormatError = getInitialOptions().onFormatError;
                const formatErrorType = typeof onFormatError;
                if (formatErrorType === 'string') {
                    result = onFormatError;
                }
                else if (formatErrorType === 'function') {
                    result = onFormatError(errorMessage, props);
                }
                else {
                    result = DEFAULT_FORMAT_ERROR;
                }
                // wrap error message, so it's detectable
                result = wrap(result);
            }
            return result;
        }
        function hasDevBackend() {
            return Boolean(getDevBackend());
        }
        const wrap = (params) => {
            var _a;
            if (instances.observer) {
                return (_a = instances.observer) === null || _a === void 0 ? void 0 : _a.wrap(params);
            }
            return params.translation;
        };
        return Object.freeze({
            addPlugin,
            formatTranslation,
            getDevBackend,
            getBackendRecord,
            getBackendDevRecord,
            getLanguageDetector,
            getLanguageStorage,
            getInitialLanguage,
            setStoredLanguage,
            run,
            stop,
            retranslate,
            highlight,
            unwrap,
            wrap,
            hasDevBackend,
        });
    };

    const ValueObserver = (initialValue, valueGetter, handler) => {
        let previousValue = initialValue;
        function init(value) {
            previousValue = value;
        }
        function notify() {
            const value = valueGetter();
            if (previousValue !== value) {
                handler(value);
            }
            previousValue = value;
        }
        return Object.freeze({
            init,
            notify,
        });
    };

    const State = (onLanguageChange, onPendingLanguageChange, onRunningChange) => {
        let state = initState();
        let devCredentials = undefined;
        function init(options) {
            state = initState(options, state);
        }
        function isRunning() {
            return state.isRunning;
        }
        function setRunning(value) {
            if (state.isRunning !== value) {
                state.isRunning = value;
                onRunningChange.emit(value);
            }
        }
        function isInitialLoading() {
            return state.isInitialLoading;
        }
        function setInitialLoading(value) {
            state.isInitialLoading = value;
        }
        function getLanguage() {
            return state.language || state.initialOptions.language;
        }
        function setLanguage(language) {
            if (state.language !== language) {
                state.language = language;
                onLanguageChange.emit(language);
            }
        }
        function getPendingLanguage() {
            return state.pendingLanguage || getLanguage();
        }
        function setPendingLanguage(language) {
            if (state.pendingLanguage !== language) {
                state.pendingLanguage = language;
                onPendingLanguageChange.emit(language);
            }
        }
        function getInitialOptions() {
            return Object.assign(Object.assign({}, state.initialOptions), devCredentials);
        }
        function addActiveNs(ns) {
            const namespaces = getFallbackArray(ns);
            namespaces.forEach((namespace) => {
                const value = state.activeNamespaces.get(namespace);
                if (value !== undefined) {
                    state.activeNamespaces.set(namespace, value + 1);
                }
                else {
                    state.activeNamespaces.set(namespace, 1);
                }
            });
        }
        function removeActiveNs(ns) {
            const namespaces = getFallbackArray(ns);
            namespaces.forEach((namespace) => {
                const value = state.activeNamespaces.get(namespace);
                if (value !== undefined && value > 1) {
                    state.activeNamespaces.set(namespace, value - 1);
                }
                else {
                    state.activeNamespaces.delete(namespace);
                }
            });
        }
        function getRequiredNamespaces() {
            return unique([
                ...(state.initialOptions.ns || [state.initialOptions.defaultNs]),
                ...getFallbackArray(state.initialOptions.fallbackNs),
                ...state.activeNamespaces.keys(),
            ]);
        }
        function getFallbackLangs(lang) {
            const language = lang || getLanguage();
            if (!language) {
                return [];
            }
            return unique([
                language,
                ...getFallbackFromStruct(language, state.initialOptions.fallbackLanguage),
            ]);
        }
        function getFallbackNs() {
            return getFallbackArray(state.initialOptions.fallbackNs);
        }
        function getDefaultNs(ns) {
            return ns === undefined ? state.initialOptions.defaultNs : ns;
        }
        function getAvailableLanguages() {
            if (state.initialOptions.availableLanguages) {
                return state.initialOptions.availableLanguages;
            }
            else if (state.initialOptions.staticData) {
                const languagesFromStaticData = Object.keys(state.initialOptions.staticData).map((key) => decodeCacheKey(key).language);
                return Array.from(new Set(languagesFromStaticData));
            }
        }
        function withDefaultNs(descriptor) {
            return {
                namespace: descriptor.namespace === undefined
                    ? getInitialOptions().defaultNs
                    : descriptor.namespace,
                language: descriptor.language,
            };
        }
        function overrideCredentials(credentials) {
            if (credentials) {
                devCredentials = Object.assign(Object.assign({}, credentials), { apiUrl: sanitizeUrl(credentials.apiUrl) });
            }
            else {
                devCredentials = undefined;
            }
        }
        return Object.freeze({
            init,
            isRunning,
            setRunning,
            isInitialLoading,
            setInitialLoading,
            getLanguage,
            setLanguage,
            getPendingLanguage,
            setPendingLanguage,
            getInitialOptions,
            addActiveNs,
            removeActiveNs,
            getRequiredNamespaces,
            getFallbackLangs,
            getFallbackNs,
            getDefaultNs,
            getAvailableLanguages,
            withDefaultNs,
            overrideCredentials,
        });
    };

    function parseCombinedOptions(_a) {
        var { ns, noWrap, orEmpty, params } = _a, rest = __rest$1(_a, ["ns", "noWrap", "orEmpty", "params"]);
        const options = {
            ns: ns,
            noWrap: noWrap,
            orEmpty: orEmpty,
        };
        return Object.assign(Object.assign({}, options), { params: Object.assign({}, rest) });
    }
    const getTranslateProps = (keyOrProps, ...params) => {
        let result = {};
        let options;
        if (typeof keyOrProps === 'object') {
            result = keyOrProps;
        }
        else {
            result.key = keyOrProps;
            if (typeof params[0] === 'string') {
                result.defaultValue = params[0];
                options = params[1];
            }
            else if (typeof params[0] === 'object') {
                options = params[0];
            }
        }
        if (options) {
            result = Object.assign(Object.assign({}, parseCombinedOptions(options)), result);
        }
        return result;
    };

    const Controller = ({ options }) => {
        const events = Events(getFallbackNs, getDefaultNs);
        const fetchingObserver = ValueObserver(false, () => cache.isFetching(), events.onFetchingChange.emit);
        const loadingObserver = ValueObserver(false, () => isLoading(), events.onLoadingChange.emit);
        const state = State(events.onLanguageChange, events.onPendingLanguageChange, events.onRunningChange);
        const pluginService = Plugins(state.getLanguage, state.getInitialOptions, state.getAvailableLanguages, getTranslationNs, getTranslation, changeTranslation);
        const cache = Cache(events.onCacheChange, pluginService.getBackendRecord, pluginService.getBackendDevRecord, state.withDefaultNs, state.isInitialLoading, fetchingObserver, loadingObserver);
        if (options) {
            init(options);
        }
        events.onUpdate.listen(() => {
            if (state.isRunning()) {
                pluginService.retranslate();
            }
        });
        function getFallbackNs() {
            return state.getFallbackNs();
        }
        function getDefaultNs(ns) {
            return state.getDefaultNs(ns);
        }
        // gets all namespaces where translation could be located
        // takes (ns|default, fallback ns)
        function getDefaultAndFallbackNs(ns) {
            return [...getFallbackArray(getDefaultNs(ns)), ...getFallbackNs()];
        }
        // gets all namespaces which need to be loaded
        // takes (ns|default, initial ns, fallback ns, active ns)
        function getRequiredNamespaces(ns) {
            return [
                ...getFallbackArray(ns || getDefaultNs()),
                ...state.getRequiredNamespaces(),
            ];
        }
        function changeTranslation(descriptor, key, value) {
            const keyObject = state.withDefaultNs(descriptor);
            const previousValue = cache.getTranslation(keyObject, key);
            cache.changeTranslation(keyObject, key, value);
            return {
                revert: () => {
                    cache.changeTranslation(keyObject, key, previousValue);
                },
            };
        }
        function init(options) {
            state.init(options);
            cache.addStaticData(state.getInitialOptions().staticData);
        }
        function isLoading(ns) {
            return cache.isLoading(state.getLanguage(), ns);
        }
        function isDev() {
            return Boolean(state.getInitialOptions().apiKey && state.getInitialOptions().apiUrl);
        }
        async function addActiveNs(ns, forget) {
            if (!forget) {
                state.addActiveNs(ns);
            }
            if (state.isRunning()) {
                await loadRequiredRecords(undefined, ns);
            }
        }
        function getRequiredRecords(lang, ns) {
            const languages = state.getFallbackLangs(lang);
            const namespaces = getRequiredNamespaces(ns);
            const result = [];
            languages.forEach((language) => {
                namespaces.forEach((namespace) => {
                    if (!cache.exists({ language, namespace }, true)) {
                        result.push({ language, namespace });
                    }
                });
            });
            return result;
        }
        function isLoaded(ns) {
            const language = state.getLanguage();
            if (!language) {
                return false;
            }
            const languages = state.getFallbackLangs(language);
            const namespaces = getRequiredNamespaces(ns);
            const result = [];
            languages.forEach((language) => {
                namespaces.forEach((namespace) => {
                    if (!cache.exists({ language, namespace })) {
                        result.push({ language, namespace });
                    }
                });
            });
            return result.length === 0;
        }
        function loadRequiredRecords(lang, ns) {
            const descriptors = getRequiredRecords(lang, ns);
            if (descriptors.length) {
                return valueOrPromise(loadRecords(descriptors), () => { });
            }
        }
        async function changeLanguage(language) {
            if (state.getPendingLanguage() === language &&
                state.getLanguage() === language) {
                return;
            }
            state.setPendingLanguage(language);
            if (state.isRunning()) {
                await loadRequiredRecords(language);
            }
            if (language === state.getPendingLanguage()) {
                // there might be parallel language change
                // we only want to apply latest
                state.setLanguage(language);
                pluginService.setStoredLanguage(language);
            }
        }
        function getTranslationNs({ key, ns }) {
            const languages = state.getFallbackLangs();
            const namespaces = getDefaultAndFallbackNs(ns || undefined);
            return cache.getTranslationNs(namespaces, languages, key);
        }
        function getTranslation({ key, ns }) {
            const namespaces = getDefaultAndFallbackNs(ns || undefined);
            const languages = state.getFallbackLangs();
            return cache.getTranslationFallback(namespaces, languages, key);
        }
        function loadInitial() {
            const data = valueOrPromise(initializeLanguage(), () => {
                // fail if there is no language
                return loadRequiredRecords();
            });
            if (isPromise(data)) {
                state.setInitialLoading(true);
                fetchingObserver.notify();
                loadingObserver.notify();
                return Promise.resolve(data).then(() => {
                    state.setInitialLoading(false);
                    fetchingObserver.notify();
                    loadingObserver.notify();
                    events.onInitialLoaded.emit();
                });
            }
            else {
                events.onInitialLoaded.emit();
            }
        }
        function initializeLanguage() {
            const existingLanguage = state.getLanguage();
            if (existingLanguage) {
                return;
            }
            if (!state.getInitialOptions().defaultLanguage) {
                throw new Error(missingOptionError('defaultLanguage'));
            }
            const languageOrPromise = pluginService.getInitialLanguage();
            return valueOrPromise(languageOrPromise, (lang) => {
                const language = lang ||
                    state.getInitialOptions().defaultLanguage;
                language && state.setLanguage(language);
            });
        }
        async function loadRecord(descriptor) {
            return (await loadRecords([descriptor]))[0];
        }
        function loadRecords(descriptors) {
            return cache.loadRecords(descriptors, isDev());
        }
        const checkCorrectConfiguration = () => {
            const languageComputable = pluginService.getLanguageDetector() || pluginService.getLanguageStorage();
            if (languageComputable) {
                const availableLanguages = state.getAvailableLanguages();
                if (!availableLanguages) {
                    throw new Error(missingOptionError('availableLanguages'));
                }
            }
            if (!state.getLanguage() && !state.getInitialOptions().defaultLanguage) {
                if (languageComputable) {
                    throw new Error(missingOptionError('defaultLanguage'));
                }
                else {
                    throw new Error(missingOptionError('language'));
                }
            }
        };
        function run() {
            let result = undefined;
            checkCorrectConfiguration();
            if (!state.isRunning()) {
                if (isDev()) {
                    cache.invalidate();
                }
                state.setRunning(true);
                pluginService.run();
                result = loadInitial();
            }
            return Promise.resolve(result);
        }
        function stop() {
            if (state.isRunning()) {
                pluginService.stop();
                state.setRunning(false);
            }
        }
        const t = (...args) => {
            // @ts-ignore
            const params = getTranslateProps(...args);
            const translation = getTranslation(params);
            return pluginService.formatTranslation(Object.assign(Object.assign({}, params), { translation }));
        };
        return Object.freeze(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, events), state), pluginService), cache), { init,
            changeLanguage,
            getTranslation,
            changeTranslation,
            addActiveNs,
            loadRecords,
            loadRecord,
            isLoading,
            isLoaded,
            t,
            isDev,
            run,
            stop }));
    };

    const createTolgee = (options) => {
        const controller = Controller({
            options,
        });
        // restarts tolgee while applying callback
        const withRestart = (callback) => {
            const wasRunning = controller.isRunning();
            wasRunning && controller.stop();
            callback();
            wasRunning && controller.run();
        };
        const tolgee = Object.freeze({
            /**
             * Listen to tolgee events.
             */
            on: controller.on,
            /**
             * Listen for specific namespaces changes.
             *
             * ```
             * const sub = tolgee.onUpdate(handler)
             *
             * // subscribe to selected namespace
             * sub.subscribeNs(['common'])
             *
             * // unsubscribe
             * sub.unsubscribe()
             * ```
             */
            onNsUpdate: controller.onUpdate.listenSome,
            /**
             * Turn off/on events emitting. Is on by default.
             */
            setEmmiterActive: controller.setEmmiterActive,
            /**
             * @return current language if set.
             */
            getLanguage: controller.getLanguage,
            /**
             * `pendingLanguage` represents language which is currently being loaded.
             * @return current `pendingLanguage` if set.
             */
            getPendingLanguage: controller.getPendingLanguage,
            /**
             * Change current language.
             * - if not running sets `pendingLanguage`, `language` to the new value
             * - if running sets `pendingLanguage` to the value, fetches necessary data and then changes `language`
             *
             * @return Promise which is resolved when `language` is changed.
             */
            changeLanguage: controller.changeLanguage,
            /**
             * Temporarily change translation in cache.
             * @return object with revert method.
             */
            changeTranslation: controller.changeTranslation,
            /**
             * Adds namespace(s) list of active namespaces. And if tolgee is running, loads required data.
             */
            addActiveNs: controller.addActiveNs,
            /**
             * Remove namespace(s) from active namespaces.
             *
             * Tolgee internally counts how many times was each active namespace added,
             * so this method will remove namespace only if the counter goes down to 0.
             */
            removeActiveNs: controller.removeActiveNs,
            /**
             * Manually load multiple records from `Backend` (or `DevBackend` when in dev mode)
             *
             * It loads data together and adds them to cache in one operation, to prevent partly loaded state.
             */
            loadRecords: controller.loadRecords,
            /**
             * Manually load record from `Backend` (or `DevBackend` when in dev mode)
             */
            loadRecord: controller.loadRecord,
            /**
             *
             */
            addStaticData: controller.addStaticData,
            /**
             * Get record from cache.
             */
            getRecord: controller.getRecord,
            /**
             * Get all records from cache.
             */
            getAllRecords: controller.getAllRecords,
            /**
             * @param ns optional list of namespaces that you are interested in
             * @return `true` if there are data that need to be fetched.
             */
            isLoaded: controller.isLoaded,
            /**
             * @return `true` if tolgee is loading initial data (triggered by `run`).
             */
            isInitialLoading: controller.isInitialLoading,
            /**
             * @param ns optional list of namespaces that you are interested in
             * @return `true` if tolgee is loading some translations for the first time.
             */
            isLoading: controller.isLoading,
            /**
             * @param ns optional list of namespaces that you are interested in
             * @return `true` if tolgee is fetching some translations.
             */
            isFetching: controller.isFetching,
            /**
             * @return `true` if tolgee is running.
             */
            isRunning: controller.isRunning,
            /**
             * Changes internal state to running: true and loads initial files.
             * Runs runnable plugins mainly Observer if present.
             */
            run: controller.run,
            /**
             * Changes internal state to running: false and stops runnable plugins.
             */
            stop: controller.stop,
            /**
             * Returns translated and formatted key.
             * If Observer is present and tolgee is running, wraps result to be identifiable in the DOM.
             */
            t: controller.t,
            /**
             * Highlight keys that match selection.
             */
            highlight: controller.highlight,
            /**
             * @return current Tolgee options.
             */
            getInitialOptions: controller.getInitialOptions,
            /**
             * Tolgee is in dev mode if `DevTools` plugin is used and `apiKey` + `apiUrl` are specified.
             * @return `true` if tolgee is in dev mode.
             */
            isDev: controller.isDev,
            /**
             * Wraps translation if there is `Observer` plugin
             */
            wrap: controller.wrap,
            /**
             * Unwrap translation
             */
            unwrap: controller.unwrap,
            /**
             * Override creadentials passed on initialization.
             *
             * When called in running state, tolgee stops and runs again.
             */
            overrideCredentials(credentials) {
                withRestart(() => controller.overrideCredentials(credentials));
            },
            /**
             * Add tolgee plugin after initialization.
             *
             * When called in running state, tolgee stops and runs again.
             */
            addPlugin(plugin) {
                if (plugin) {
                    withRestart(() => controller.addPlugin(tolgee, plugin));
                }
            },
            /**
             * Updates options after instance creation. Extends existing options,
             * so it only changes the fields, that are listed.
             *
             * When called in running state, tolgee stops and runs again.
             */
            updateOptions(options) {
                if (options) {
                    withRestart(() => controller.init(options));
                }
            },
        });
        return tolgee;
    };
    /**
     * Tolgee chainable constructor.
     *
     * Usage:
     * ```
     * const tolgee = Tolgee().use(...).init(...)
     * ```
     */
    const TolgeeCore = () => {
        const state = {
            plugins: [],
            options: {},
        };
        const tolgeeChain = Object.freeze({
            use(plugin) {
                state.plugins.push(plugin);
                return tolgeeChain;
            },
            updateDefaults(options) {
                state.options = combineOptions(state.options, options);
                return tolgeeChain;
            },
            init(options) {
                const tolgee = createTolgee(combineOptions(state.options, options));
                state.plugins.forEach(tolgee.addPlugin);
                return tolgee;
            },
        });
        return tolgeeChain;
    };

    const ERROR_PARAM_EMPTY = 0, ERROR_UNEXPECTED_CHAR = 1, ERROR_UNEXPECTED_END = 2;
    class FormatError extends Error {
        constructor(code, index, text) {
            let error;
            if (code === ERROR_PARAM_EMPTY) {
                error = 'Empty parameter';
            }
            else if (code === ERROR_UNEXPECTED_CHAR) {
                error = 'Unexpected character';
            }
            else {
                error = 'Unexpected end';
            }
            super(`Tolgee parser: ${error} at ${index} in "${text}"`);
            this.code = code;
            this.index = index;
        }
    }

    function isWhitespace(ch) {
        return /\s/.test(ch);
    }
    const STATE_TEXT = 0, STATE_ESCAPE_MAYBE = 1, STATE_ESCAPE = 2, STATE_PARAM = 3, STATE_PARAM_AFTER = 4;
    const END_STATES = new Set([
        STATE_ESCAPE,
        STATE_ESCAPE_MAYBE,
        STATE_TEXT,
    ]);
    const CHAR_ESCAPE = "'";
    const ESCAPABLE = new Set(['{', '}', CHAR_ESCAPE]);
    const isAllowedInParam = (char) => {
        return /[0-9a-zA-Z_]/.test(char);
    };
    function formatParser(translation) {
        let state = STATE_TEXT;
        let text = '';
        let param = '';
        let ch = '';
        const texts = [];
        const params = [];
        let i = 0;
        function parsingError(code) {
            throw new FormatError(code, i, translation);
        }
        const addText = () => {
            texts.push(text);
            text = '';
        };
        const addParamChar = () => {
            if (!isAllowedInParam(ch)) {
                parsingError(ERROR_UNEXPECTED_CHAR);
            }
            param += ch;
        };
        const addParam = () => {
            if (param === '') {
                parsingError(ERROR_PARAM_EMPTY);
            }
            params.push(param);
            param = '';
        };
        for (i = 0; i < translation.length; i++) {
            ch = translation[i];
            switch (state) {
                case STATE_TEXT:
                    if (ch === CHAR_ESCAPE) {
                        text += ch;
                        state = STATE_ESCAPE_MAYBE;
                    }
                    else if (ch === '{') {
                        addText();
                        state = STATE_PARAM;
                    }
                    else {
                        text += ch;
                        state = STATE_TEXT;
                    }
                    break;
                case STATE_ESCAPE_MAYBE:
                    if (ESCAPABLE.has(ch)) {
                        text = text.slice(0, -1) + ch;
                        state = STATE_ESCAPE;
                    }
                    else {
                        text += ch;
                        state = STATE_TEXT;
                    }
                    break;
                case STATE_ESCAPE:
                    if (ch === CHAR_ESCAPE) {
                        state = STATE_TEXT;
                    }
                    else {
                        text += ch;
                        state = STATE_ESCAPE;
                    }
                    break;
                case STATE_PARAM:
                    if (ch === '}') {
                        addParam();
                        state = STATE_TEXT;
                    }
                    else if (!isWhitespace(ch)) {
                        addParamChar();
                        state = STATE_PARAM;
                    }
                    else if (param !== '') {
                        addParam();
                        state = STATE_PARAM_AFTER;
                    }
                    break;
                case STATE_PARAM_AFTER:
                    if (ch == '}') {
                        state = STATE_TEXT;
                    }
                    else if (isWhitespace(ch)) {
                        state = STATE_PARAM_AFTER;
                    }
                    else {
                        parsingError(ERROR_UNEXPECTED_CHAR);
                    }
            }
        }
        if (!END_STATES.has(state)) {
            parsingError(ERROR_UNEXPECTED_END);
        }
        addText();
        return [texts, params];
    }

    function formatter(translation, params) {
        const [texts, pars] = formatParser(translation);
        const result = [texts[0]];
        for (let i = 1; i < texts.length; i++) {
            const parameter = params === null || params === void 0 ? void 0 : params[pars[i - 1]];
            if (parameter === undefined) {
                throw new Error(`Missing parameter "${pars[i - 1]}" in "${translation}"`);
            }
            result.push(String(parameter));
            result.push(texts[i]);
        }
        return result.join('');
    }

    function createFormatSimple() {
        return {
            format: ({ translation, params }) => formatter(translation, params),
        };
    }
    const FormatSimple = () => (tolgee, tools) => {
        tools.setFinalFormatter(createFormatSimple());
        return tolgee;
    };

    const HIGHLIGHTER_BASE_STYLE = {
        pointerEvents: 'none',
        position: 'fixed',
        boxSizing: 'content-box',
        zIndex: String(Number.MAX_SAFE_INTEGER),
        contain: 'layout',
        display: 'block',
        borderStyle: 'solid',
        borderRadius: '4px',
    };
    const ElementHighlighter = ({ highlightColor, highlightWidth, }) => {
        function initHighlightFunction(element, elementMeta) {
            elementMeta.highlight = () => {
                if (!element.isConnected) {
                    return;
                }
                let highlightEl = elementMeta.highlightEl;
                if (!highlightEl) {
                    highlightEl = document.createElement('div');
                    highlightEl.classList.add(TOLGEE_HIGHLIGHTER_CLASS);
                    Object.entries(HIGHLIGHTER_BASE_STYLE).forEach(([key, value]) => {
                        // @ts-ignore
                        highlightEl.style[key] = value;
                    });
                    highlightEl.style.borderColor = highlightColor;
                    elementMeta.highlightEl = highlightEl;
                    document.body.appendChild(highlightEl);
                }
                const shape = element.getBoundingClientRect();
                highlightEl.style.borderWidth = highlightWidth + 'px';
                highlightEl.style.top = shape.top - highlightWidth + 'px';
                highlightEl.style.left = shape.left - highlightWidth + 'px';
                highlightEl.style.width = shape.width + 'px';
                highlightEl.style.height = shape.height + 'px';
            };
        }
        function initUnhighlightFunction(element, elementMeta) {
            elementMeta.unhighlight = () => {
                var _a;
                (_a = elementMeta.highlightEl) === null || _a === void 0 ? void 0 : _a.remove();
                elementMeta.highlightEl = undefined;
            };
        }
        function initHighlighter(element, elementMeta) {
            initHighlightFunction(element, elementMeta);
            initUnhighlightFunction(element, elementMeta);
        }
        return Object.freeze({ initHighlighter });
    };

    function xPathEvaluate(expression, targetNode) {
        var _a;
        const searchableElement = closestElement(targetNode);
        const result = [];
        if (!searchableElement) {
            return result;
        }
        const evaluated = document === null || document === void 0 ? void 0 : document.evaluate(expression, searchableElement, undefined, XPathResult.ANY_TYPE);
        let node;
        while ((node = (_a = evaluated === null || evaluated === void 0 ? void 0 : evaluated.iterateNext) === null || _a === void 0 ? void 0 : _a.call(evaluated))) {
            result.push(node);
        }
        return result;
    }
    function closestElement(node) {
        switch (node.nodeType) {
            case Node.ATTRIBUTE_NODE:
                return node.ownerElement || undefined;
            case Node.TEXT_NODE:
                return node.parentElement || undefined;
            case Node.DOCUMENT_NODE:
            case Node.ELEMENT_NODE:
                return node;
            default:
                // we are not interested in other nodes
                return undefined;
        }
    }
    function getNodeText(node) {
        return node.textContent;
    }
    function setNodeText(node, text) {
        node.textContent = text;
    }
    function nodeContains(descendant, node) {
        if (descendant.contains(node)) {
            return true;
        }
        if (node instanceof Attr) {
            const ownerContainsAttr = node.ownerElement &&
                Object.values(node.ownerElement.attributes).indexOf(node) > -1;
            if (descendant.contains(node.ownerElement) && ownerContainsAttr) {
                return true;
            }
        }
        return false;
    }
    const compareDescriptors = (descriptor, criteria) => {
        var _a;
        const keyMatches = descriptor.key === undefined ||
            criteria.key === undefined ||
            criteria.key === descriptor.key;
        const nsMatches = descriptor.ns === undefined ||
            criteria.ns === undefined ||
            ((_a = descriptor.ns) === null || _a === void 0 ? void 0 : _a.findIndex((ns) => { var _a; return (_a = criteria.ns) === null || _a === void 0 ? void 0 : _a.includes(ns); })) !== -1;
        return keyMatches && nsMatches;
    };

    const eCapture = {
        capture: true,
    };
    const ePassive = {
        capture: true,
        passive: true,
    };
    const MouseEventHandler = ({ highlightKeys, elementStore, onClick, options, }) => {
        var _a, _b;
        let keysDown = new Set();
        let highlighted;
        let cursorPosition;
        const documentOrShadowRoot = (((_a = options.targetElement) === null || _a === void 0 ? void 0 : _a.getRootNode()) ||
            document);
        const targetDocument = ((_b = options.targetElement) === null || _b === void 0 ? void 0 : _b.ownerDocument) || document;
        const highlight = (el) => {
            var _a;
            if (highlighted !== el) {
                unhighlight();
                const meta = elementStore.get(el);
                if (meta) {
                    meta.preventClean = true;
                    (_a = meta.highlight) === null || _a === void 0 ? void 0 : _a.call(meta);
                    highlighted = el;
                }
            }
        };
        const unhighlight = () => {
            var _a;
            const meta = elementStore.get(highlighted);
            if (meta) {
                meta.preventClean = false;
                (_a = meta.unhighlight) === null || _a === void 0 ? void 0 : _a.call(meta);
                highlighted = undefined;
            }
        };
        function updateHighlight() {
            const position = cursorPosition;
            let newHighlighted;
            if (position && areKeysDown()) {
                const element = documentOrShadowRoot.elementFromPoint(position.x, position.y);
                if (element) {
                    newHighlighted = getClosestTolgeeElement(element);
                }
            }
            highlight(newHighlighted);
        }
        function updateCursorPosition(position) {
            cursorPosition = position;
            updateHighlight();
        }
        const blockEvents = (e) => {
            if (areKeysDown() && !isInUiDialog(e.target)) {
                e.stopPropagation();
                e.preventDefault();
            }
        };
        const onMouseMove = (e) => {
            updateCursorPosition({ x: e.clientX, y: e.clientY });
        };
        const onBlur = () => {
            keysDown = new Set();
            // keysChanged.emit(areKeysDown());
            updateHighlight();
        };
        const onKeyDown = (e) => {
            const modifierKey = e.key;
            if (modifierKey !== undefined) {
                keysDown.add(modifierKey);
                // keysChanged.emit(areKeysDown());
            }
            updateHighlight();
        };
        const onKeyUp = (e) => {
            keysDown.delete(e.key);
            // keysChanged.emit(areKeysDown());
            updateHighlight();
        };
        const onScroll = () => {
            var _a;
            const meta = elementStore.get(highlighted);
            (_a = meta === null || meta === void 0 ? void 0 : meta.highlight) === null || _a === void 0 ? void 0 : _a.call(meta);
        };
        const handleClick = (e) => {
            blockEvents(e);
            if (areKeysDown() && highlighted) {
                onClick(e, highlighted);
                unhighlight();
            }
        };
        function initEventListeners() {
            targetDocument.addEventListener('blur', onBlur, eCapture);
            targetDocument.addEventListener('keydown', onKeyDown, eCapture);
            targetDocument.addEventListener('keyup', onKeyUp, eCapture);
            targetDocument.addEventListener('mousemove', onMouseMove, ePassive);
            targetDocument.addEventListener('scroll', onScroll, ePassive);
            targetDocument.addEventListener('click', handleClick, eCapture);
            targetDocument.addEventListener('mouseenter', blockEvents, eCapture);
            targetDocument.addEventListener('mouseover', blockEvents, eCapture);
            targetDocument.addEventListener('mouseout', blockEvents, eCapture);
            targetDocument.addEventListener('mouseleave', blockEvents, eCapture);
            targetDocument.addEventListener('mousedown', blockEvents, eCapture);
            targetDocument.addEventListener('mouseup', blockEvents, eCapture);
        }
        function removeEventListeners() {
            targetDocument.removeEventListener('blur', onBlur, eCapture);
            targetDocument.removeEventListener('keydown', onKeyDown, eCapture);
            targetDocument.removeEventListener('keyup', onKeyUp, eCapture);
            targetDocument.removeEventListener('mousemove', onMouseMove, ePassive);
            targetDocument.removeEventListener('scroll', onScroll, ePassive);
            targetDocument.removeEventListener('click', handleClick, eCapture);
            targetDocument.removeEventListener('mouseenter', blockEvents, eCapture);
            targetDocument.removeEventListener('mouseover', blockEvents, eCapture);
            targetDocument.removeEventListener('mouseout', blockEvents, eCapture);
            targetDocument.removeEventListener('mouseleave', blockEvents, eCapture);
            targetDocument.removeEventListener('mousedown', blockEvents, eCapture);
            targetDocument.removeEventListener('mouseup', blockEvents, eCapture);
        }
        function isInUiDialog(element) {
            return Boolean(findAncestor(element, (el) => el.id === DEVTOOLS_ID));
        }
        function getClosestTolgeeElement(element) {
            return findAncestor(element, (el) => elementStore.get(el));
        }
        function findAncestor(element, func) {
            if (func(element)) {
                return element;
            }
            if (element === null || element === void 0 ? void 0 : element.parentElement) {
                return findAncestor(element.parentElement, func);
            }
            return undefined;
        }
        function areKeysDown() {
            for (const key of highlightKeys) {
                if (!keysDown.has(key)) {
                    return false;
                }
            }
            return true;
        }
        function stop() {
            removeEventListeners();
        }
        function run() {
            initEventListeners();
        }
        return Object.freeze({
            run,
            stop,
        });
    };

    const ElementRegistry = (options, elementStore, onClick) => {
        const elementHighlighter = ElementHighlighter({
            highlightColor: options.highlightColor,
            highlightWidth: options.highlightWidth,
        });
        const eventHandler = MouseEventHandler({
            highlightKeys: options.highlightKeys,
            elementStore,
            onClick: (event, el) => {
                const meta = elementStore.get(el);
                onClick({
                    event,
                    keysAndDefaults: getKeysAndDefaults(meta),
                });
            },
            options,
        });
        function register(element, node, nodeMeta) {
            if (isRestricted(element)) {
                return;
            }
            const tolgeeElement = element;
            let elementMeta = elementStore.get(tolgeeElement);
            if (!elementMeta) {
                elementMeta = initElementMeta();
                elementStore.set(tolgeeElement, elementMeta);
                tolgeeElement.setAttribute(TOLGEE_ATTRIBUTE_NAME, 'true');
            }
            elementMeta.nodes.set(node, nodeMeta);
            elementHighlighter.initHighlighter(tolgeeElement, elementMeta);
        }
        function run(mouseHighlight) {
            if (mouseHighlight) {
                eventHandler.run();
            }
        }
        function stop() {
            eventHandler.stop();
            elementStore.forEachElement((_, meta) => {
                var _a;
                if (meta.highlightEl) {
                    (_a = meta.unhighlight) === null || _a === void 0 ? void 0 : _a.call(meta);
                }
            });
        }
        function isRestricted(element) {
            const restrictedElements = options.restrictedElements;
            return (restrictedElements.indexOf(element.tagName.toLowerCase()) !== -1 ||
                element.closest(`[${TOLGEE_RESTRICT_ATTRIBUTE}]`) !== null);
        }
        function refreshAll() {
            elementStore.forEachElement((element, meta) => {
                if (meta.preventClean) {
                    return;
                }
                cleanElementInactiveNodes(meta);
                if (meta.nodes.size === 0) {
                    cleanElement(element, meta);
                }
            });
        }
        function findAll(key, ns) {
            const result = [];
            elementStore.forEachElement((_, meta) => {
                for (const nodeMeta of meta.nodes.values()) {
                    const fits = nodeMeta.keys.find((val) => compareDescriptors({ key, ns: getFallback(ns) }, { key: val.key, ns: getFallback(val.ns) }));
                    if (fits) {
                        result.push(meta);
                        break;
                    }
                }
            });
            return result;
        }
        function cleanElementInactiveNodes(meta) {
            meta.nodes = new Map(getActiveNodes(meta));
        }
        function getTargetElement() {
            return options.targetElement || document.body;
        }
        function* getActiveNodes(meta) {
            for (const [node, nodeMeta] of meta.nodes.entries()) {
                if (nodeContains(getTargetElement(), node)) {
                    yield [node, nodeMeta];
                }
            }
        }
        function cleanElement(element, meta) {
            var _a;
            if (meta.highlightEl) {
                (_a = meta.unhighlight) === null || _a === void 0 ? void 0 : _a.call(meta);
            }
            element.removeAttribute(TOLGEE_ATTRIBUTE_NAME);
            elementStore.remove(element);
        }
        function getKeyOptions(meta) {
            const nodes = Array.from(meta.nodes.values());
            return nodes.reduce((acc, curr) => [
                ...acc,
                ...curr.keys.map((k) => ({
                    key: k.key,
                    defaultValue: k.defaultValue,
                    ns: k.ns,
                })),
            ], []);
        }
        function getKeysAndDefaults(meta) {
            return getKeyOptions(meta);
        }
        return Object.freeze({
            register,
            forEachElement: elementStore.forEachElement,
            findAll,
            refreshAll,
            run,
            stop,
        });
    };

    const ElementStore = () => {
        const registredElements = new Map();
        function set(el, meta) {
            registredElements.set(el, meta);
        }
        function get(el) {
            return el && registredElements.get(el);
        }
        function remove(el) {
            return registredElements.delete(el);
        }
        function forEachElement(callback) {
            registredElements.forEach((value, key) => callback(key, value));
        }
        return Object.freeze({
            set,
            get,
            remove,
            forEachElement,
        });
    };

    const NodeHandler = (options, wrapper) => {
        const handleText = (node) => {
            const xPath = wrapper.getTextXPath();
            const nodes = xPathEvaluate(xPath, node);
            return nodes;
        };
        const handleAttributes = (node) => {
            let result = [];
            for (const [tag, attributes] of Object.entries(options.tagAttributes)) {
                for (const attribute of attributes) {
                    const expression = wrapper.getAttributeXPath({ tag, attribute });
                    const nodes = xPathEvaluate(expression, node);
                    result = [...result, ...nodes];
                }
            }
            return result;
        };
        const handleChildList = (node) => {
            let result = [];
            result = result.concat(handleAttributes(node));
            result = result.concat(handleText(node));
            // wrappedHandler(node);
            return result;
        };
        return Object.freeze({
            handleAttributes,
            handleChildList,
            handleText,
        });
    };

    const GeneralObserver = () => {
        let isObserving = false;
        let instance;
        const elementStore = ElementStore();
        const createRunningInstance = ({ mouseHighlight, options, wrapper, onClick, }) => {
            if (isSSR()) {
                return;
            }
            const domHelper = DomHelper(options);
            const nodeHandler = NodeHandler(options, wrapper);
            const elementRegistry = ElementRegistry(options, elementStore, onClick);
            function handleNodes(nodes) {
                for (const textNode of nodes) {
                    const oldTextContent = getNodeText(textNode);
                    const result = oldTextContent ? wrapper.unwrap(oldTextContent) : null;
                    if (result) {
                        const { text, keys } = result;
                        setNodeText(textNode, text);
                        const nodeMeta = initNodeMeta(oldTextContent, keys);
                        const parentElement = domHelper.getSuitableParent(textNode);
                        elementRegistry.register(parentElement, textNode, nodeMeta);
                    }
                }
            }
            const handleKeyAttribute = (node) => {
                const xPath = `./descendant-or-self::*[@${TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE}]`;
                const elements = xPathEvaluate(xPath, node);
                elements.forEach((element) => {
                    const node = element.getAttributeNode(TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE);
                    const parentElement = domHelper.getSuitableParent(node);
                    elementRegistry.register(parentElement, node, {
                        oldTextContent: '',
                        keys: [{ key: getNodeText(node) }],
                        keyAttributeOnly: true,
                    });
                });
            };
            const observer = new MutationObserver((mutationsList) => {
                if (!isObserving) {
                    return;
                }
                for (const mutation of mutationsList) {
                    let result = [];
                    switch (mutation.type) {
                        case 'characterData':
                            result = nodeHandler.handleText(mutation.target);
                            break;
                        case 'childList':
                            handleKeyAttribute(mutation.target);
                            result = nodeHandler.handleChildList(mutation.target);
                            break;
                        case 'attributes':
                            handleKeyAttribute(mutation.target);
                            result = nodeHandler.handleAttributes(mutation.target);
                            break;
                    }
                    handleNodes(result);
                    elementRegistry.refreshAll();
                }
            });
            const targetElement = options.targetElement || document.body;
            isObserving = true;
            elementRegistry.run(mouseHighlight);
            // initially go through all elements
            handleKeyAttribute(targetElement);
            handleNodes(nodeHandler.handleChildList(targetElement));
            // then observe for changes
            observer.observe(targetElement, {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
            });
            return {
                stop() {
                    isObserving = false;
                    elementRegistry.stop();
                    observer.disconnect();
                },
                elementRegistry,
                wrapper,
            };
        };
        const self = Object.freeze({
            run(props) {
                instance = createRunningInstance(props);
            },
            stop() {
                instance === null || instance === void 0 ? void 0 : instance.stop();
            },
            forEachElement(callback) {
                var _a, _b;
                (_b = instance === null || instance === void 0 ? void 0 : (_a = instance.elementRegistry).forEachElement) === null || _b === void 0 ? void 0 : _b.call(_a, callback);
            },
            highlight(key, ns) {
                const elements = (instance === null || instance === void 0 ? void 0 : instance.elementRegistry.findAll(key, ns)) || [];
                elements.forEach((el) => { var _a; return (_a = el.highlight) === null || _a === void 0 ? void 0 : _a.call(el); });
                return {
                    unhighlight() {
                        elements.forEach((el) => { var _a; return (_a = el.unhighlight) === null || _a === void 0 ? void 0 : _a.call(el); });
                    },
                };
            },
            unwrap(text) {
                if (instance) {
                    return instance.wrapper.unwrap(text);
                }
                return {
                    text,
                    keys: [],
                };
            },
            wrap(props) {
                if (instance) {
                    return instance.wrapper.wrap(props);
                }
                return props.translation || '';
            },
        });
        return self;
    };

    const INVISIBLE_CHARACTERS = ['\u200C', '\u200D'];
    const INVISIBLE_REGEX = RegExp(`([${INVISIBLE_CHARACTERS.join('')}]{9})+`, 'gu');
    const toBytes = (text) => {
        return Array.from(new TextEncoder().encode(text));
    };
    const fromBytes = (bytes) => {
        return new TextDecoder().decode(new Uint8Array(bytes));
    };
    const padToWholeBytes = (binary) => {
        const needsToAdd = 8 - binary.length;
        return '0'.repeat(needsToAdd) + binary;
    };
    const encodeMessage = (text) => {
        const bytes = toBytes(text).map(Number);
        const binary = bytes
            .map((byte) => padToWholeBytes(byte.toString(2)) + '0')
            .join('');
        const result = Array.from(binary)
            .map((b) => INVISIBLE_CHARACTERS[Number(b)])
            .join('');
        return result;
    };
    const decodeMessage = (message) => {
        const binary = Array.from(message)
            .map((character) => {
            return INVISIBLE_CHARACTERS.indexOf(character);
        })
            .map(String)
            .join('');
        const textBytes = binary.match(/(.{9})/g);
        const codes = Uint8Array.from((textBytes === null || textBytes === void 0 ? void 0 : textBytes.map((byte) => parseInt(byte.slice(0, 8), 2))) || []);
        return fromBytes(codes);
    };
    const decodeFromText = (text) => {
        var _a;
        const invisibleMessages = (_a = text
            .match(INVISIBLE_REGEX)) === null || _a === void 0 ? void 0 : _a.filter((m) => m.length > 8);
        return (invisibleMessages === null || invisibleMessages === void 0 ? void 0 : invisibleMessages.map(decodeMessage)) || [];
    };
    const removeSecrets = (text) => {
        return text.replace(INVISIBLE_REGEX, '');
    };
    const stringToCodePoints = (text) => {
        const result = [];
        for (const codePoint of text) {
            result.push(codePoint.codePointAt(0));
        }
        return result;
    };

    const ValueMemory = () => {
        const values = [];
        const valueToNumber = (key) => {
            let index = values.indexOf(key);
            if (index === -1) {
                index = values.length;
                values.push(key);
            }
            return index;
        };
        const numberToValue = (num) => {
            return values[num];
        };
        return Object.freeze({ valueToNumber, numberToValue });
    };

    const InvisibleWrapper = () => {
        const keyMemory = ValueMemory();
        const unwrap = (text) => {
            const keysAndParams = [];
            const messages = decodeFromText(text);
            messages.forEach((msg) => {
                const [valueCode] = stringToCodePoints(msg);
                const encodedValue = keyMemory.numberToValue(valueCode);
                const { k: key, d: defaultValue, n: ns } = decodeValue(encodedValue);
                keysAndParams.push({
                    key,
                    defaultValue,
                    ns,
                });
            });
            const result = removeSecrets(text);
            return { text: result, keys: keysAndParams };
        };
        const encodeValue = (data) => {
            const value = {
                k: data.key,
                n: data.ns || undefined,
                d: data.defaultValue,
            };
            return JSON.stringify(value);
        };
        const decodeValue = (value) => {
            return JSON.parse(value || '{}');
        };
        const wrap = ({ key, defaultValue, translation, ns, }) => {
            const encodedValue = encodeValue({ key, ns, defaultValue });
            const code = keyMemory.valueToNumber(encodedValue);
            const value = translation || '';
            const invisibleMark = encodeMessage(String.fromCodePoint(code));
            return typeof value === 'string' ? value + invisibleMark : value;
        };
        const getTextXPath = () => {
            return `./descendant-or-self::text()[contains(., '${INVISIBLE_CHARACTERS[0]}${INVISIBLE_CHARACTERS[0]}') or contains(., '${INVISIBLE_CHARACTERS[1]}${INVISIBLE_CHARACTERS[0]}')]`;
        };
        const getAttributeXPath = ({ tag, attribute, }) => {
            return `descendant-or-self::${tag}/@${attribute}[contains(., '${INVISIBLE_CHARACTERS[0]}${INVISIBLE_CHARACTERS[0]}') or contains(., '${INVISIBLE_CHARACTERS[1]}${INVISIBLE_CHARACTERS[0]}')]`;
        };
        return Object.freeze({
            unwrap,
            wrap,
            getTextXPath,
            getAttributeXPath,
        });
    };

    const InvisibleObserver = () => () => {
        const observer = GeneralObserver();
        const self = Object.freeze(Object.assign(Object.assign({}, observer), { run(props) {
                const wrapper = InvisibleWrapper();
                observer.run(Object.assign(Object.assign({}, props), { wrapper }));
            },
            retranslate() { }, outputNotFormattable: false }));
        return self;
    };

    function isCharEscaped(position, fullString) {
        let escapeCharsCount = 0;
        while (position > -1 && fullString[position - 1] === '\\') {
            escapeCharsCount++;
            position--;
        }
        return escapeCharsCount % 2 == 1;
    }

    const TextWrapper = ({ inputPrefix, inputSuffix, translate, }) => {
        function getRawUnWrapRegex() {
            const escapedPrefix = escapeForRegExp(inputPrefix);
            const escapedSuffix = escapeForRegExp(inputSuffix);
            return `(\\\\?)(${escapedPrefix}(.*?)${escapedSuffix})`;
        }
        function parseUnwrapped(unwrappedString) {
            let escaped = false;
            let actual = '';
            let paramName = '';
            let readingState = 'KEY';
            const result = {
                key: '',
                ns: undefined,
                params: {},
                defaultValue: undefined,
            };
            const addNamespace = (ns) => {
                result.ns = ns;
            };
            for (const char of unwrappedString) {
                if (char === '\\' && !escaped) {
                    escaped = true;
                    continue;
                }
                if (escaped) {
                    escaped = false;
                    actual += char;
                    continue;
                }
                if (readingState === 'KEY' && char === ',') {
                    readingState = 'DEFAULT_VALUE';
                    result.key = actual;
                    actual = '';
                    continue;
                }
                if (readingState === 'KEY' && char === '|') {
                    readingState = 'NAMESPACE';
                    result.key = actual;
                    actual = '';
                    continue;
                }
                if (readingState === 'NAMESPACE' && char === ',') {
                    readingState = 'DEFAULT_VALUE';
                    addNamespace(actual);
                    actual = '';
                    continue;
                }
                if (readingState === 'KEY' && char === ':') {
                    readingState = 'PARAM_NAME';
                    result.key = actual;
                    actual = '';
                    continue;
                }
                if (readingState === 'DEFAULT_VALUE' && char === ':') {
                    readingState = 'PARAM_NAME';
                    result.defaultValue = actual;
                    actual = '';
                    continue;
                }
                if (readingState === 'PARAM_NAME' && char === ':') {
                    readingState = 'PARAM_VALUE';
                    paramName = actual;
                    actual = '';
                    continue;
                }
                if (readingState === 'PARAM_VALUE' && char === ',') {
                    readingState = 'PARAM_NAME';
                    result.params[paramName] = actual;
                    actual = '';
                    continue;
                }
                actual += char;
            }
            if (readingState === 'KEY') {
                result.key = actual;
            }
            if (readingState === 'DEFAULT_VALUE') {
                result.defaultValue = actual;
            }
            if (readingState === 'PARAM_VALUE') {
                result.params[paramName] = actual;
            }
            if (readingState === 'NAMESPACE') {
                addNamespace(actual);
            }
            return result;
        }
        const unwrap = (text) => {
            const matchRegexp = new RegExp(getRawUnWrapRegex(), 'gs');
            const keysAndParams = [];
            let matched = false;
            let match;
            let start = 0;
            let result = '';
            while ((match = matchRegexp.exec(text)) !== null) {
                let pre = match[1];
                const [fullMatch, _, wrapped, unwrapped] = match;
                const { index, input } = match;
                result += input.substr(start, index - start);
                start = index + fullMatch.length;
                if (pre === '\\') {
                    if (!isCharEscaped(index, text)) {
                        result += wrapped;
                        continue;
                    }
                    pre = '';
                }
                const translated = getTranslatedWithMetadata(unwrapped);
                keysAndParams.push({
                    key: translated.key,
                    params: translated.params,
                    defaultValue: translated.defaultValue,
                    ns: translated.ns,
                });
                matched = true;
                result += pre + translated.translated;
            }
            result += text.substring(start);
            if (matched) {
                return { text: result, keys: keysAndParams };
            }
            return { text: text, keys: [] };
        };
        const wrap = ({ key, params, defaultValue, ns, }) => {
            let paramString = Object.entries(params || {})
                .map(([name, value]) => `${escapeParam(name)}:${escapeParam(value)}`)
                .join(',');
            paramString = paramString.length ? `:${paramString}` : '';
            const defaultString = defaultValue !== undefined ? `,${escapeParam(defaultValue)}` : '';
            const nsArray = typeof ns === 'string' ? [ns] : ns;
            const namespaces = (nsArray === null || nsArray === void 0 ? void 0 : nsArray.length)
                ? `|${nsArray.map((ns) => escapeParam(ns)).join('|')}`
                : '';
            return `${inputPrefix}${escapeParam(key)}${namespaces}${defaultString}${paramString}${inputSuffix}`;
        };
        function getTranslatedWithMetadata(text) {
            const { key, params, defaultValue, ns } = parseUnwrapped(text);
            const translated = translate({
                key,
                params,
                defaultValue,
                ns,
                noWrap: true,
            });
            return { translated, key, params, defaultValue, ns };
        }
        const escapeForRegExp = (string) => {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };
        const escapeParam = (param) => {
            if (typeof param === 'string') {
                return param.replace(/[,:|\\]/gs, '\\$&');
            }
            if (typeof param === 'number' || typeof param === 'bigint') {
                return param.toString();
            }
            // eslint-disable-next-line no-console
            console.warn(`Parameters of type "${typeof param}" are not supported in "text" wrapper mode.`);
            return param;
        };
        const getTextXPath = () => {
            return `./descendant-or-self::text()[contains(., '${inputPrefix}') and contains(., '${inputSuffix}')]`;
        };
        const getAttributeXPath = ({ tag, attribute, }) => {
            return `descendant-or-self::${tag}/@${attribute}[contains(., '${inputPrefix}') and contains(., '${inputSuffix}')]`;
        };
        return Object.freeze({
            wrap,
            unwrap,
            getTextXPath,
            getAttributeXPath,
        });
    };

    const TextObserver = () => () => {
        const observer = GeneralObserver();
        const self = Object.freeze(Object.assign(Object.assign({}, observer), { run(props) {
                const wrapper = TextWrapper({
                    inputPrefix: props.options.inputPrefix,
                    inputSuffix: props.options.inputSuffix,
                    translate: props.translate,
                });
                observer.run(Object.assign(Object.assign({}, props), { wrapper }));
            },
            retranslate() {
                observer.forEachElement((_, elMeta) => {
                    for (const [node, nodeMeta] of elMeta.nodes.entries()) {
                        if (nodeMeta.keyAttributeOnly) {
                            return;
                        }
                        const result = observer.unwrap(nodeMeta.oldTextContent);
                        if (result) {
                            setNodeText(node, result.text);
                        }
                    }
                });
            }, outputNotFormattable: true }));
        return self;
    };

    const ObserverPlugin = () => (tolgee, tools) => {
        if (tolgee.getInitialOptions().observerType === 'text') {
            tools.setObserver(TextObserver());
        }
        else {
            tools.setObserver(InvisibleObserver());
        }
        return tolgee;
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    function readChar(char) {
        const idx = alphabet.indexOf(char);
        if (idx === -1) {
            throw new Error('Invalid character found: ' + char);
        }
        return idx;
    }
    function arrayBufferToString(buffer) {
        const bufView = new Uint8Array(buffer);
        const length = bufView.length;
        let result = '';
        let addition = Math.pow(2, 16) - 1;
        for (let i = 0; i < length; i += addition) {
            if (i + addition > length) {
                addition = length - i;
            }
            result += String.fromCharCode.apply(null, 
            // @ts-ignore
            bufView.subarray(i, i + addition));
        }
        return result;
    }
    function base32Decode(input) {
        input = input.toUpperCase();
        const length = input.length;
        let bits = 0;
        let value = 0;
        let index = 0;
        const output = new Uint8Array(((length * 5) / 8) | 0);
        for (let i = 0; i < length; i++) {
            value = (value << 5) | readChar(input[i]);
            bits += 5;
            if (bits >= 8) {
                output[index++] = (value >>> (bits - 8)) & 255;
                bits -= 8;
            }
        }
        return arrayBufferToString(output.buffer);
    }
    function getProjectIdFromApiKey(key) {
        if (!key) {
            return undefined;
        }
        try {
            const [prefix, rest] = key.split('_');
            if (prefix === 'tgpak') {
                const [projectId] = base32Decode(rest).split('_');
                return Number(projectId);
            }
        }
        catch (_a) {
            // eslint-disable-next-line no-console
            console.warn("Tolgee: Api key can't be parsed");
        }
        return undefined;
    }
    function getApiKeyType(key) {
        if (!key) {
            return undefined;
        }
        const [prefix] = key.split('_');
        if (prefix === 'tgpak') {
            return 'tgpak';
        }
        else if (prefix === 'tgpat') {
            return 'tgpat';
        }
        return 'legacy';
    }

    const createDevBackend = () => ({
        getRecord({ apiUrl, apiKey, language, namespace, projectId }) {
            var _a;
            const pId = (_a = getProjectIdFromApiKey(apiKey)) !== null && _a !== void 0 ? _a : projectId;
            let url = pId !== undefined
                ? `${apiUrl}/v2/projects/${pId}/translations/${language}`
                : `${apiUrl}/v2/projects/translations/${language}`;
            if (namespace) {
                url += `?ns=${namespace}`;
            }
            if (getApiKeyType(apiKey) === 'tgpat' && projectId === undefined) {
                throw new Error("You need to specify 'projectId' when using PAT key");
            }
            return fetch(url, {
                headers: {
                    'X-API-Key': apiKey || '',
                    'Content-Type': 'application/json',
                },
            }).then((r) => {
                if (r.ok) {
                    return r.json().then((data) => data[language]);
                }
                else {
                    throw new Error(r.statusText);
                }
            });
        },
    });
    const DevBackend = () => (tolgee, tools) => {
        tools.setDevBackend(createDevBackend());
        return tolgee;
    };

    function listen(type, callback) {
        const handler = (e) => {
            var _a, _b;
            if (type.includes((_a = e.data) === null || _a === void 0 ? void 0 : _a.type)) {
                callback((_b = e.data) === null || _b === void 0 ? void 0 : _b.data);
            }
        };
        window.addEventListener('message', handler, false);
        return {
            unsubscribe: () => {
                window.removeEventListener('message', handler);
            },
        };
    }
    function sendAndRecieve({ message, recievingMessage, data, attempts = 1, }) {
        let cancelled = false;
        const makeAttempt = () => new Promise((resolve, reject) => {
            const listener = listen(recievingMessage, handler);
            window.postMessage({ type: message, data }, window.origin);
            const timer = setTimeout(timeout, 300);
            function handler(data) {
                clearTimeout(timer);
                removeEventListener();
                resolve(data);
            }
            function removeEventListener() {
                listener.unsubscribe();
            }
            function timeout() {
                removeEventListener();
                reject();
            }
        });
        const getData = async () => {
            for (let i = 0; i < attempts; i++) {
                if (cancelled) {
                    return new Promise(() => { });
                }
                try {
                    const result = await makeAttempt();
                    return result;
                }
                catch (e) {
                    continue;
                }
            }
            if (!cancelled) {
                throw `Didn't recieve ${recievingMessage.join(' or ')} in time.`;
            }
            return new Promise(() => { });
        };
        return {
            cancel: () => (cancelled = true),
            promise: getData(),
        };
    }
    function Handshaker() {
        let cancelLast = undefined;
        async function update(data) {
            cancelLast === null || cancelLast === void 0 ? void 0 : cancelLast();
            const { cancel, promise } = sendAndRecieve({
                message: 'TOLGEE_READY',
                recievingMessage: ['TOLGEE_PLUGIN_READY', 'TOLGEE_PLUGIN_UPDATED'],
                data,
                attempts: 4,
            });
            cancelLast = cancel;
            return promise;
        }
        return {
            update,
        };
    }

    const IN_CONTEXT_FILE = 'tolgee-in-context-tools.umd.min.js';
    const IN_CONTEXT_UMD_NAME = '@tolgee/in-context-tools';
    const IN_CONTEXT_EXPORT_NAME = 'InContextTools';

    const CDN_URL = 'https://cdn.jsdelivr.net/npm';
    function injectScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.addEventListener('load', () => resolve());
            script.addEventListener('error', (e) => reject(e.error));
            document.body.appendChild(script);
        });
    }
    let injectPromise = null;
    function loadInContextLib(version) {
        if (!injectPromise) {
            injectPromise = injectScript(`${CDN_URL}/@tolgee/web@${version}/dist/${IN_CONTEXT_FILE}`).then(() => {
                // @ts-ignore
                return window[IN_CONTEXT_UMD_NAME][IN_CONTEXT_EXPORT_NAME];
            });
        }
        return injectPromise;
    }

    const API_KEY_LOCAL_STORAGE = '__tolgee_apiKey';
    const API_URL_LOCAL_STORAGE = '__tolgee_apiUrl';
    function getCredentials() {
        const apiKey = sessionStorage.getItem(API_KEY_LOCAL_STORAGE) || undefined;
        const apiUrl = sessionStorage.getItem(API_URL_LOCAL_STORAGE) || undefined;
        if (!apiKey || !apiUrl) {
            return undefined;
        }
        return {
            apiKey,
            apiUrl,
        };
    }
    function clearSessionStorage() {
        sessionStorage.removeItem(API_KEY_LOCAL_STORAGE);
        sessionStorage.removeItem(API_URL_LOCAL_STORAGE);
    }
    function onDocumentReady(callback) {
        // in case the document is already rendered
        if (document.readyState !== 'loading') {
            Promise.resolve().then(() => {
                callback();
            });
        }
        // modern browsers
        else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback);
        }
    }
    exports.BrowserExtensionPlugin = () => (tolgee) => tolgee;
    if (typeof window !== 'undefined') {
        exports.BrowserExtensionPlugin = () => (tolgee) => {
            const handshaker = Handshaker();
            const getConfig = () => ({
                // prevent extension downloading ui library
                uiPresent: true,
                uiVersion: undefined,
                // tolgee mode
                mode: tolgee.isDev() ? 'development' : 'production',
                // pass credentials
                config: {
                    apiUrl: tolgee.getInitialOptions().apiUrl || '',
                    apiKey: tolgee.getInitialOptions().apiKey || '',
                },
            });
            const getTolgeePlugin = async () => {
                const InContextTools = await loadInContextLib("5.4.2" );
                return (tolgee) => {
                    const credentials = getCredentials();
                    tolgee.addPlugin(InContextTools({ credentials }));
                    return tolgee;
                };
            };
            tolgee.on('running', ({ value: isRunning }) => {
                if (isRunning) {
                    onDocumentReady(() => {
                        handshaker.update(getConfig()).catch(clearSessionStorage);
                    });
                }
            });
            const credentials = getCredentials();
            if (credentials) {
                getTolgeePlugin()
                    .then((plugin) => {
                    tolgee.addPlugin(plugin);
                })
                    .catch((e) => {
                    // eslint-disable-next-line no-console
                    console.error('Tolgee: Failed to load in-context tools');
                    // eslint-disable-next-line no-console
                    console.error(e);
                });
            }
            return tolgee;
        };
    }

    const CURRENT_LANGUAGE_LOCAL_STORAGE_KEY = '__tolgee_currentLanguage';
    const createLanguageStorage = () => {
        return {
            getLanguage() {
                throwIfSSR('LanguageStorage');
                const storedLanguage = localStorage.getItem(CURRENT_LANGUAGE_LOCAL_STORAGE_KEY);
                return storedLanguage || undefined;
            },
            setLanguage(language) {
                throwIfSSR('LanguageStorage');
                localStorage.setItem(CURRENT_LANGUAGE_LOCAL_STORAGE_KEY, language);
            },
        };
    };
    const LanguageStorage = () => (tolgee, tools) => {
        tools.setLanguageStorage(createLanguageStorage());
        return tolgee;
    };

    const createLanguageDetector = () => {
        return {
            getLanguage({ availableLanguages }) {
                throwIfSSR('LanguageDetector');
                const preferred = window.navigator.language;
                const exactMatch = availableLanguages.find((l) => l === preferred);
                if (exactMatch) {
                    return exactMatch;
                }
                const getTwoLetters = (fullTag) => fullTag.replace(/^(.+?)(-.*)?$/, '$1');
                const preferredTwoLetter = getTwoLetters(window.navigator.language);
                const twoLetterMatch = availableLanguages.find((l) => getTwoLetters(l) === preferredTwoLetter);
                if (twoLetterMatch) {
                    return twoLetterMatch;
                }
                return undefined;
            },
        };
    };
    const LanguageDetector = () => (tolgee, tools) => {
        tools.setLanguageDetector(createLanguageDetector());
        return tolgee;
    };

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    const trimSlashes = (path) => {
        if (path.endsWith('/')) {
            return path.slice(0, -1);
        }
        return path;
    };
    const defaultGetPath = ({ namespace, language, prefix }) => {
        if (namespace) {
            return `${trimSlashes(prefix)}/${namespace}/${language}.json`;
        }
        else {
            return `${trimSlashes(prefix)}/${language}.json`;
        }
    };
    const defaultGetData = (r) => r.json();
    const DEFAULT_OPTIONS = {
        prefix: '/i18n',
        getPath: defaultGetPath,
        getData: defaultGetData,
        headers: {
            Accept: 'application/json',
        },
    };
    const createBackendFetch = (options) => {
        const _a = Object.assign(Object.assign(Object.assign({}, DEFAULT_OPTIONS), options), { headers: Object.assign(Object.assign({}, DEFAULT_OPTIONS.headers), options === null || options === void 0 ? void 0 : options.headers) }), { prefix, getPath, getData, headers } = _a, fetchOptions = __rest(_a, ["prefix", "getPath", "getData", "headers"]);
        return {
            getRecord({ namespace, language }) {
                const path = getPath({
                    namespace,
                    language,
                    prefix,
                });
                return fetch(path, Object.assign({ headers }, fetchOptions)).then((r) => {
                    if (!r.ok) {
                        throw new Error(`${r.url} ${r.status}`);
                    }
                    return getData(r);
                });
            },
        };
    };
    const BackendFetch = (options) => (tolgee, tools) => {
        tools.addBackend(createBackendFetch(options));
        return tolgee;
    };

    const Tolgee = () => {
        return TolgeeCore().use(exports.BrowserExtensionPlugin());
    };

    const DevTools = () => (tolgee) => tolgee;

    exports.BackendFetch = BackendFetch;
    exports.DEVTOOLS_ID = DEVTOOLS_ID;
    exports.DevBackend = DevBackend;
    exports.DevTools = DevTools;
    exports.FormatSimple = FormatSimple;
    exports.LanguageDetector = LanguageDetector;
    exports.LanguageStorage = LanguageStorage;
    exports.ObserverPlugin = ObserverPlugin;
    exports.PREFERRED_LANGUAGES_LOCAL_STORAGE_KEY = PREFERRED_LANGUAGES_LOCAL_STORAGE_KEY;
    exports.TOLGEE_ATTRIBUTE_NAME = TOLGEE_ATTRIBUTE_NAME;
    exports.TOLGEE_RESTRICT_ATTRIBUTE = TOLGEE_RESTRICT_ATTRIBUTE;
    exports.TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE = TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE;
    exports.Tolgee = Tolgee;
    exports.TolgeeCore = TolgeeCore;
    exports.getFallback = getFallback;
    exports.getFallbackArray = getFallbackArray;
    exports.getProjectIdFromApiKey = getProjectIdFromApiKey;
    exports.getTranslateProps = getTranslateProps;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tolgee-web.production.umd.js.map
