var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var _a;
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function isPromise(value) {
  return Boolean(value && typeof value.then === "function");
}
function valueOrPromise(value, callback) {
  if (isPromise(value)) {
    return Promise.resolve(value).then(callback);
  } else {
    return callback(value);
  }
}
function handleRegularOrAsyncErr(onError, createError, callback) {
  function handle(e) {
    const error = createError(e);
    onError.emit(error);
    console.error(error);
    throw error;
  }
  try {
    const result = callback();
    if (isPromise(result)) {
      return result.catch(handle);
    }
    return result;
  } catch (e) {
    handle(e);
  }
}
function missingOptionError(option) {
  const options = (Array.isArray(option) ? option : [option]).map((val) => `'${val}'`);
  const lastPart = options.slice(-2).join(" or ");
  const firstPart = options.slice(0, -2);
  const stringifiedOptions = [...firstPart, lastPart].join(", ");
  return `Tolgee: You need to specify ${stringifiedOptions} option`;
}
function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}
function getFallback(value) {
  if (typeof value === "string") {
    return [value];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return void 0;
}
function getFallbackArray(value) {
  return getFallback(value) || [];
}
function getFallbackFromStruct(language, fallbackLanguage) {
  if (isObject(fallbackLanguage)) {
    return getFallbackArray(fallbackLanguage === null || fallbackLanguage === void 0 ? void 0 : fallbackLanguage[language]);
  } else {
    return getFallbackArray(fallbackLanguage);
  }
}
function unique(arr) {
  return Array.from(new Set(arr));
}
function sanitizeUrl(url) {
  return url ? url.replace(/\/+$/, "") : url;
}
function getErrorMessage(error) {
  if (typeof error === "string") {
    return error;
  } else if (typeof (error === null || error === void 0 ? void 0 : error.message) === "string") {
    return error.message;
  }
}
const defaultFetchFunction = (input, options) => fetch(input, options);
function headersInitToRecord(headersInit) {
  return Object.fromEntries(new Headers(headersInit).entries());
}
const createFetchFunction = (fetchFn = defaultFetchFunction) => {
  return (input, init) => {
    let headers = headersInitToRecord(init === null || init === void 0 ? void 0 : init.headers);
    if (headers["x-api-key"]) {
      headers = Object.assign({ "x-tolgee-sdk-type": "JS", "x-tolgee-sdk-version": "prerelease" }, headers);
    }
    return fetchFn(input, Object.assign(Object.assign({}, init), { headers }));
  };
};
const EventEmitter = (type, isActive) => {
  let handlers = [];
  return {
    listen(handler) {
      const handlerWrapper = (e) => {
        handler(e);
      };
      handlers.push(handlerWrapper);
      return {
        unsubscribe() {
          handlers = handlers.filter((i) => handlerWrapper !== i);
        }
      };
    },
    emit(data) {
      if (isActive()) {
        handlers.forEach((handler) => handler({ type, value: data }));
      }
    }
  };
};
function EventEmitterCombined(isActive) {
  let handlers = [];
  let queue = [];
  function solveQueue() {
    if (queue.length === 0) {
      return;
    }
    const queueCopy = queue;
    queue = [];
    handlers.forEach((handler) => {
      handler(queueCopy);
    });
  }
  return Object.freeze({
    listen(handler) {
      const handlerWrapper = (events) => {
        handler(events);
      };
      handlers.push(handlerWrapper);
      return {
        unsubscribe() {
          handlers = handlers.filter((i) => handlerWrapper !== i);
        }
      };
    },
    emit(e, delayed) {
      if (isActive()) {
        if (isActive()) {
          queue.push(e);
          if (!delayed) {
            solveQueue();
          } else {
            setTimeout(solveQueue, 0);
          }
        }
      }
    }
  });
}
function Events() {
  let emitterActive = true;
  function isActive() {
    return emitterActive;
  }
  const self2 = Object.freeze({
    onPendingLanguageChange: EventEmitter("pendingLanguage", isActive),
    onLanguageChange: EventEmitter("language", isActive),
    onLoadingChange: EventEmitter("loading", isActive),
    onFetchingChange: EventEmitter("fetching", isActive),
    onInitialLoaded: EventEmitter("initialLoad", isActive),
    onRunningChange: EventEmitter("running", isActive),
    onCacheChange: EventEmitter("cache", isActive),
    onPermanentChange: EventEmitter("permanentChange", isActive),
    onError: EventEmitter("error", isActive),
    onUpdate: EventEmitterCombined(isActive),
    setEmitterActive(active) {
      emitterActive = active;
    },
    on: (event, handler) => {
      switch (event) {
        case "pendingLanguage":
          return self2.onPendingLanguageChange.listen(handler);
        case "language":
          return self2.onLanguageChange.listen(handler);
        case "loading":
          return self2.onLoadingChange.listen(handler);
        case "fetching":
          return self2.onFetchingChange.listen(handler);
        case "initialLoad":
          return self2.onInitialLoaded.listen(handler);
        case "running":
          return self2.onRunningChange.listen(handler);
        case "cache":
          return self2.onCacheChange.listen(handler);
        case "update":
          return self2.onUpdate.listen(handler);
        case "permanentChange":
          return self2.onPermanentChange.listen(handler);
        case "error":
          return self2.onError.listen(handler);
      }
    }
  });
  self2.onInitialLoaded.listen((e) => self2.onUpdate.emit(e, false));
  self2.onLanguageChange.listen((e) => self2.onUpdate.emit(e, false));
  self2.onCacheChange.listen((e) => self2.onUpdate.emit(e, true));
  return self2;
}
class RecordFetchError extends Error {
  constructor(descriptor, cause, isDev = false) {
    const { language, namespace } = descriptor;
    super(`Tolgee: Failed to fetch record for "${language}"${namespace && ` and "${namespace}"`}`);
    this.cause = cause;
    this.isDev = isDev;
    this.name = "RecordFetchError";
    this.language = language;
    this.namespace = namespace;
  }
}
class LanguageDetectorError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "LanguageDetectorError";
  }
}
class LanguageStorageError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "LanguageStorageError";
  }
}
const flattenTranslationsToMap = (data) => {
  const result = /* @__PURE__ */ new Map();
  Object.entries(data).forEach(([key, value]) => {
    if (value === void 0 || value === null) {
      return;
    }
    if (typeof value === "object") {
      flattenTranslationsToMap(value).forEach((flatValue, flatKey) => {
        result.set(key + "." + flatKey, flatValue);
      });
      return;
    }
    result.set(key, value);
  });
  return result;
};
const flattenTranslations = (data) => {
  return Object.fromEntries(flattenTranslationsToMap(data).entries());
};
const decodeCacheKey = (key) => {
  const [firstPart, ...rest] = key.split(":");
  const secondPart = rest.join(":");
  return { language: firstPart, namespace: secondPart || "" };
};
const encodeCacheKey = ({ language, namespace }) => {
  if (namespace) {
    return `${language}:${namespace}`;
  } else {
    return language;
  }
};
function Cache(events, backendGetRecord, backendGetDevRecord, withDefaultNs, isInitialLoading, fetchingObserver, loadingObserver) {
  const asyncRequests = /* @__PURE__ */ new Map();
  const cache = /* @__PURE__ */ new Map();
  let staticData = {};
  let version = 0;
  function addRecordInternal(descriptor, data, recordVersion) {
    const cacheKey = encodeCacheKey(descriptor);
    cache.set(cacheKey, {
      data: flattenTranslations(data),
      version: recordVersion
    });
    events.onCacheChange.emit(decodeCacheKey(cacheKey));
  }
  async function fetchProd(keyObject) {
    function handleError(e) {
      const error = new RecordFetchError(keyObject, e);
      events.onError.emit(error);
      console.error(error);
      throw error;
    }
    const dataFromBackend = backendGetRecord(keyObject);
    if (isPromise(dataFromBackend)) {
      const result = await dataFromBackend.catch(handleError);
      if (result !== void 0) {
        return result;
      }
    }
    const staticDataValue = staticData[encodeCacheKey(keyObject)];
    if (typeof staticDataValue === "function") {
      try {
        return await staticDataValue();
      } catch (e) {
        handleError(e);
      }
    } else {
      return staticDataValue;
    }
  }
  async function fetchData(keyObject, isDev) {
    let result = void 0;
    if (isDev) {
      try {
        result = await backendGetDevRecord(keyObject);
      } catch (e) {
        const error = new RecordFetchError(keyObject, e, true);
        events.onError.emit(error);
        console.warn(error);
      }
    }
    if (!result) {
      result = await fetchProd(keyObject);
    }
    return result;
  }
  const self2 = Object.freeze({
    addStaticData(data) {
      if (Array.isArray(data)) {
        for (const record of data) {
          const key = encodeCacheKey(record);
          const existing = cache.get(key);
          if (!existing || existing.version === 0) {
            addRecordInternal(record, flattenTranslations(record.data), 0);
          }
        }
      } else if (data) {
        staticData = Object.assign(Object.assign({}, staticData), data);
        Object.entries(data).forEach(([key, value]) => {
          if (typeof value !== "function") {
            const descriptor = decodeCacheKey(key);
            const existing = cache.get(key);
            if (!existing || existing.version === 0) {
              addRecordInternal(descriptor, flattenTranslations(value), 0);
            }
          }
        });
      }
    },
    invalidate() {
      asyncRequests.clear();
      version += 1;
    },
    addRecord(descriptor, data) {
      addRecordInternal(descriptor, flattenTranslations(data), version);
    },
    exists(descriptor, strict = false) {
      const record = cache.get(encodeCacheKey(descriptor));
      if (record && strict) {
        return record.version === version;
      }
      return Boolean(record);
    },
    getRecord(descriptor) {
      const descriptorWithNs = withDefaultNs(descriptor);
      const cacheKey = encodeCacheKey(descriptorWithNs);
      const cacheRecord = cache.get(cacheKey);
      if (!cacheRecord) {
        return void 0;
      }
      return Object.assign(Object.assign({}, descriptorWithNs), { cacheKey, data: cacheRecord.data });
    },
    getAllRecords() {
      const entries = Array.from(cache.entries());
      return entries.map(([key]) => self2.getRecord(decodeCacheKey(key)));
    },
    getTranslation(descriptor, key) {
      var _a2;
      return (_a2 = cache.get(encodeCacheKey(descriptor))) === null || _a2 === void 0 ? void 0 : _a2.data[key];
    },
    getTranslationNs(namespaces, languages, key) {
      var _a2;
      for (const namespace of namespaces) {
        for (const language of languages) {
          const value = (_a2 = cache.get(encodeCacheKey({ language, namespace }))) === null || _a2 === void 0 ? void 0 : _a2.data[key];
          if (value !== void 0 && value !== null) {
            return [namespace];
          }
        }
      }
      return unique(namespaces);
    },
    getTranslationFallback(namespaces, languages, key) {
      var _a2;
      for (const namespace of namespaces) {
        for (const language of languages) {
          const value = (_a2 = cache.get(encodeCacheKey({ language, namespace }))) === null || _a2 === void 0 ? void 0 : _a2.data[key];
          if (value !== void 0 && value !== null) {
            return value;
          }
        }
      }
      return void 0;
    },
    changeTranslation(descriptor, key, value) {
      var _a2;
      const record = (_a2 = cache.get(encodeCacheKey(descriptor))) === null || _a2 === void 0 ? void 0 : _a2.data;
      if (record === null || record === void 0 ? void 0 : record[key]) {
        record[key] = value;
        events.onCacheChange.emit(Object.assign(Object.assign({}, descriptor), { key }));
      }
    },
    isFetching(ns) {
      if (isInitialLoading()) {
        return true;
      }
      if (ns === void 0) {
        return asyncRequests.size > 0;
      }
      const namespaces = getFallbackArray(ns);
      return Boolean(Array.from(asyncRequests.keys()).find((key) => namespaces.includes(decodeCacheKey(key).namespace)));
    },
    isLoading(language, ns) {
      const namespaces = getFallbackArray(ns);
      if (isInitialLoading()) {
        return true;
      }
      const pendingCacheKeys = Array.from(asyncRequests.keys());
      return Boolean(pendingCacheKeys.find((key) => {
        const descriptor = decodeCacheKey(key);
        return (!namespaces.length || namespaces.includes(descriptor.namespace)) && !self2.exists({
          namespace: descriptor.namespace,
          language
        });
      }));
    },
    async loadRecords(descriptors, options) {
      const withPromises = descriptors.map((descriptor) => {
        const keyObject = withDefaultNs(descriptor);
        const cacheKey = encodeCacheKey(keyObject);
        if (options === null || options === void 0 ? void 0 : options.useCache) {
          const exists = self2.exists(keyObject, true);
          if (exists) {
            return Object.assign(Object.assign({}, keyObject), { new: false, cacheKey, data: self2.getRecord(keyObject).data });
          }
        }
        const existingPromise = asyncRequests.get(cacheKey);
        if (existingPromise) {
          return Object.assign(Object.assign({}, keyObject), { new: false, promise: existingPromise, cacheKey });
        }
        const dataPromise = fetchData(keyObject, !(options === null || options === void 0 ? void 0 : options.noDev)) || Promise.resolve(void 0);
        asyncRequests.set(cacheKey, dataPromise);
        return Object.assign(Object.assign({}, keyObject), { new: true, promise: dataPromise, cacheKey });
      });
      fetchingObserver.notify();
      loadingObserver.notify();
      const promisesToWait = withPromises.map((val) => val.promise).filter(Boolean);
      const fetchedData = await Promise.all(promisesToWait);
      withPromises.forEach((value) => {
        var _a2;
        if (value.promise) {
          value.data = flattenTranslations((_a2 = fetchedData[0]) !== null && _a2 !== void 0 ? _a2 : {});
          fetchedData.shift();
        }
        const promiseChanged = asyncRequests.get(value.cacheKey) !== value.promise;
        if (value.new && !promiseChanged) {
          asyncRequests.delete(value.cacheKey);
          if (value.data) {
            self2.addRecord(value, value.data);
          } else if (!self2.getRecord(value)) {
            self2.addRecord(value, {});
          }
        }
      });
      fetchingObserver.notify();
      loadingObserver.notify();
      return withPromises.map((val) => {
        var _a2;
        return {
          language: val.language,
          namespace: val.namespace,
          data: (_a2 = val.data) !== null && _a2 !== void 0 ? _a2 : {},
          cacheKey: val.cacheKey
        };
      });
    }
  });
  return self2;
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
    textarea: ["placeholder"],
    input: ["value", "placeholder"],
    img: ["alt"],
    "*": ["aria-label", "title"]
  },
  restrictedElements: ["script", "style"],
  highlightKeys: ["Alt"],
  highlightColor: "rgb(255, 0, 0)",
  highlightWidth: 5,
  inputPrefix: "%-%tolgee:",
  inputSuffix: "%-%",
  passToParent: ["option", "optgroup"],
  fullKeyEncode: false
};
const DEFAULT_FORMAT_ERROR = "invalid";
const DEFAULT_API_URL = "https://app.tolgee.io";
const DEFAULT_MISSING_TRANSLATION = ({ key }) => key;
const defaultValues = {
  observerOptions: defaultObserverOptions,
  observerType: "invisible",
  onFormatError: DEFAULT_FORMAT_ERROR,
  apiUrl: DEFAULT_API_URL,
  autoLoadRequiredData: true,
  fetch: createFetchFunction(),
  onTranslationMissing: DEFAULT_MISSING_TRANSLATION
};
const combineOptions = (...states) => {
  let result = {};
  states.forEach((state) => {
    result = Object.assign(Object.assign(Object.assign({}, result), state), { observerOptions: Object.assign(Object.assign({}, result.observerOptions), state === null || state === void 0 ? void 0 : state.observerOptions) });
  });
  return result;
};
function initState(options, previousState) {
  const initialOptions = combineOptions(defaultValues, previousState === null || previousState === void 0 ? void 0 : previousState.initialOptions, options);
  initialOptions.apiUrl = sanitizeUrl(initialOptions.apiUrl);
  if (options === null || options === void 0 ? void 0 : options.fetch) {
    initialOptions.fetch = createFetchFunction(options.fetch);
  }
  return {
    initialOptions,
    activeNamespaces: (previousState === null || previousState === void 0 ? void 0 : previousState.activeNamespaces) || /* @__PURE__ */ new Map(),
    language: previousState === null || previousState === void 0 ? void 0 : previousState.language,
    pendingLanguage: previousState === null || previousState === void 0 ? void 0 : previousState.language,
    isInitialLoading: false,
    isRunning: false
  };
}
function Plugins(getLanguage, getInitialOptions, getAvailableLanguages, getFallbackNamespaces, getTranslationNs, getTranslation, changeTranslation, events) {
  const plugins = {
    ui: void 0
  };
  const instances = {
    formatters: [],
    finalFormatter: void 0,
    observer: void 0,
    devBackend: void 0,
    backends: [],
    ui: void 0,
    languageDetector: void 0,
    languageStorage: void 0
  };
  const onClick = async ({ keysAndDefaults, target }) => {
    var _a2;
    const withNs = keysAndDefaults.map(({ key, ns, defaultValue }) => {
      return {
        key,
        defaultValue,
        fallbackNamespaces: getFallbackNamespaces(ns),
        namespace: getTranslationNs({ key, ns })[0],
        translation: getTranslation({
          key,
          ns
        })
      };
    });
    (_a2 = instances.ui) === null || _a2 === void 0 ? void 0 : _a2.handleElementClick(withNs, target);
  };
  const findPositions = (key, ns) => {
    var _a2;
    return ((_a2 = instances.observer) === null || _a2 === void 0 ? void 0 : _a2.findPositions(key, ns)) || [];
  };
  function translate(props) {
    const translation = getTranslation({
      key: props.key,
      ns: props.ns
    });
    return self2.formatTranslation(Object.assign(Object.assign({}, props), { translation, formatEnabled: true }));
  }
  function getCommonProps() {
    return { fetch: getInitialOptions().fetch };
  }
  function setObserver(observer) {
    instances.observer = observer === null || observer === void 0 ? void 0 : observer();
  }
  function hasObserver() {
    return Boolean(instances.observer);
  }
  function addFormatter(formatter2) {
    if (formatter2) {
      instances.formatters.push(formatter2);
    }
  }
  function setFinalFormatter(formatter2) {
    instances.finalFormatter = formatter2;
  }
  function setUi(ui) {
    plugins.ui = ui;
  }
  function hasUi() {
    return Boolean(plugins.ui);
  }
  function setLanguageStorage(storage) {
    instances.languageStorage = storage;
  }
  function setLanguageDetector(detector) {
    instances.languageDetector = detector;
  }
  function storageLoadLanguage() {
    return handleRegularOrAsyncErr(events.onError, (e) => new LanguageStorageError("Tolgee: Failed to load language", e), () => {
      var _a2;
      return (_a2 = instances.languageStorage) === null || _a2 === void 0 ? void 0 : _a2.getLanguage(getCommonProps());
    });
  }
  function detectLanguage2() {
    if (!instances.languageDetector) {
      return void 0;
    }
    const availableLanguages = getAvailableLanguages();
    return handleRegularOrAsyncErr(events.onError, (e) => new LanguageDetectorError("Tolgee: Failed to detect language", e), () => {
      var _a2;
      return (_a2 = instances.languageDetector) === null || _a2 === void 0 ? void 0 : _a2.getLanguage(Object.assign({ availableLanguages }, getCommonProps()));
    });
  }
  function addBackend(backend) {
    if (backend) {
      instances.backends.push(backend);
    }
  }
  function setDevBackend(backend) {
    instances.devBackend = backend;
  }
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
      setLanguageStorage
    });
    plugin(tolgeeInstance, pluginTools);
  }
  const self2 = Object.freeze({
    addPlugin,
    findPositions,
    run() {
      var _a2, _b;
      const { apiKey, apiUrl, projectId, observerOptions, tagNewKeys, filterTag } = getInitialOptions();
      instances.ui = (_a2 = plugins.ui) === null || _a2 === void 0 ? void 0 : _a2.call(plugins, {
        apiKey,
        apiUrl,
        projectId,
        highlight: self2.highlight,
        changeTranslation,
        findPositions,
        onPermanentChange: (data) => events.onPermanentChange.emit(data),
        tagNewKeys,
        filterTag
      });
      (_b = instances.observer) === null || _b === void 0 ? void 0 : _b.run({
        mouseHighlight: true,
        options: observerOptions,
        translate,
        onClick
      });
    },
    stop() {
      var _a2;
      instances.ui = void 0;
      (_a2 = instances.observer) === null || _a2 === void 0 ? void 0 : _a2.stop();
    },
    getLanguageStorage() {
      return instances.languageStorage;
    },
    getInitialLanguage() {
      const availableLanguages = getAvailableLanguages();
      const languageOrPromise = storageLoadLanguage();
      return valueOrPromise(languageOrPromise, (language) => {
        if ((!availableLanguages || availableLanguages.includes(language)) && language) {
          return language;
        }
        return detectLanguage2();
      });
    },
    setStoredLanguage(language) {
      return handleRegularOrAsyncErr(events.onError, (e) => new LanguageStorageError("Tolgee: Failed to store language", e), () => {
        var _a2;
        return (_a2 = instances.languageStorage) === null || _a2 === void 0 ? void 0 : _a2.setLanguage(language, getCommonProps());
      });
    },
    getDevBackend() {
      return instances.devBackend;
    },
    getBackendRecord: async ({ language, namespace }) => {
      for (const backend of instances.backends) {
        const data = await backend.getRecord(Object.assign({
          language,
          namespace
        }, getCommonProps()));
        if (data !== void 0) {
          return data;
        }
      }
      return void 0;
    },
    getBackendDevRecord: async ({ language, namespace }) => {
      var _a2;
      const { apiKey, apiUrl, projectId, filterTag } = getInitialOptions();
      if (!apiKey || !apiUrl || !self2.hasDevBackend()) {
        return void 0;
      }
      return (_a2 = instances.devBackend) === null || _a2 === void 0 ? void 0 : _a2.getRecord(Object.assign({
        apiKey,
        apiUrl,
        projectId,
        language,
        namespace,
        filterTag
      }, getCommonProps()));
    },
    getLanguageDetector() {
      return instances.languageDetector;
    },
    retranslate() {
      var _a2;
      (_a2 = instances.observer) === null || _a2 === void 0 ? void 0 : _a2.retranslate();
    },
    highlight: (key, ns) => {
      var _a2, _b;
      return ((_b = (_a2 = instances.observer) === null || _a2 === void 0 ? void 0 : _a2.highlight) === null || _b === void 0 ? void 0 : _b.call(_a2, key, ns)) || { unhighlight() {
      } };
    },
    unwrap(text) {
      var _a2;
      if (instances.observer) {
        return (_a2 = instances.observer) === null || _a2 === void 0 ? void 0 : _a2.unwrap(text);
      }
      return { text, keys: [] };
    },
    wrap(params) {
      var _a2;
      if (instances.observer) {
        return (_a2 = instances.observer) === null || _a2 === void 0 ? void 0 : _a2.wrap(params);
      }
      return params.translation;
    },
    hasDevBackend() {
      return Boolean(self2.getDevBackend());
    },
    formatTranslation(_a2) {
      var _b;
      var { formatEnabled } = _a2, props = __rest(_a2, ["formatEnabled"]);
      const { key, translation, defaultValue, noWrap, params, ns, orEmpty } = props;
      const formattableTranslation = translation !== null && translation !== void 0 ? translation : defaultValue;
      let translationMissingResult = "";
      if (translation === void 0 || translation === null) {
        translationMissingResult = getInitialOptions().onTranslationMissing(props);
      }
      let result = formattableTranslation !== null && formattableTranslation !== void 0 ? formattableTranslation : orEmpty ? "" : translationMissingResult;
      const language = getLanguage();
      const isFormatEnabled = formatEnabled || !((_b = instances.observer) === null || _b === void 0 ? void 0 : _b.outputNotFormattable);
      const wrap = (result2) => {
        if (instances.observer && !noWrap) {
          return instances.observer.wrap({
            key,
            translation: result2,
            defaultValue,
            params,
            ns
          });
        }
        return result2;
      };
      result = wrap(result);
      try {
        if (formattableTranslation && language && isFormatEnabled) {
          for (const formatter2 of instances.formatters) {
            result = formatter2.format({
              translation: result,
              language,
              params
            });
          }
        }
        if (instances.finalFormatter && formattableTranslation && language && isFormatEnabled) {
          result = instances.finalFormatter.format({
            translation: result,
            language,
            params
          });
        }
      } catch (e) {
        console.error(e);
        const errorMessage = getErrorMessage(e) || DEFAULT_FORMAT_ERROR;
        const onFormatError = getInitialOptions().onFormatError;
        const formatErrorType = typeof onFormatError;
        if (formatErrorType === "string") {
          result = onFormatError;
        } else if (formatErrorType === "function") {
          result = onFormatError(errorMessage, props);
        } else {
          result = DEFAULT_FORMAT_ERROR;
        }
        result = wrap(result);
      }
      return result;
    }
  });
  return self2;
}
const ValueObserver = (initialValue, valueGetter, handler) => {
  let previousValue = initialValue;
  return Object.freeze({
    init(value) {
      previousValue = value;
    },
    notify() {
      const value = valueGetter();
      if (previousValue !== value) {
        handler(value);
      }
      previousValue = value;
    }
  });
};
function State(onLanguageChange, onPendingLanguageChange, onRunningChange) {
  let state = initState();
  let devCredentials = void 0;
  const self2 = Object.freeze({
    init(options) {
      state = initState(options, state);
    },
    isRunning() {
      return state.isRunning;
    },
    setRunning(value) {
      if (state.isRunning !== value) {
        state.isRunning = value;
        onRunningChange.emit(value);
      }
    },
    isInitialLoading() {
      return state.isInitialLoading;
    },
    setInitialLoading(value) {
      state.isInitialLoading = value;
    },
    getLanguage() {
      return state.language || state.initialOptions.language;
    },
    setLanguage(language) {
      if (state.language !== language) {
        state.language = language;
        onLanguageChange.emit(language);
      }
    },
    getPendingLanguage() {
      return state.pendingLanguage || self2.getLanguage();
    },
    setPendingLanguage(language) {
      if (state.pendingLanguage !== language) {
        state.pendingLanguage = language;
        onPendingLanguageChange.emit(language);
      }
    },
    getInitialOptions() {
      return Object.assign(Object.assign({}, state.initialOptions), devCredentials);
    },
    addActiveNs(ns) {
      const namespaces = getFallbackArray(ns);
      namespaces.forEach((namespace) => {
        const value = state.activeNamespaces.get(namespace);
        if (value !== void 0) {
          state.activeNamespaces.set(namespace, value + 1);
        } else {
          state.activeNamespaces.set(namespace, 1);
        }
      });
    },
    removeActiveNs(ns) {
      const namespaces = getFallbackArray(ns);
      namespaces.forEach((namespace) => {
        const value = state.activeNamespaces.get(namespace);
        if (value !== void 0 && value > 1) {
          state.activeNamespaces.set(namespace, value - 1);
        } else {
          state.activeNamespaces.delete(namespace);
        }
      });
    },
    getRequiredNamespaces() {
      return unique([
        self2.getDefaultNs(),
        ...state.initialOptions.ns || [],
        ...getFallbackArray(state.initialOptions.fallbackNs),
        ...state.activeNamespaces.keys()
      ]);
    },
    getFallbackLangs(lang) {
      const language = lang || self2.getLanguage();
      if (!language) {
        return [];
      }
      return unique([
        language,
        ...getFallbackFromStruct(language, state.initialOptions.fallbackLanguage)
      ]);
    },
    getFallbackNs() {
      return getFallbackArray(state.initialOptions.fallbackNs);
    },
    getNs() {
      var _a2, _b;
      return ((_a2 = state.initialOptions.ns) === null || _a2 === void 0 ? void 0 : _a2.length) ? state.initialOptions.ns : [(_b = state.initialOptions.defaultNs) !== null && _b !== void 0 ? _b : ""];
    },
    getDefaultNs(ns) {
      var _a2, _b, _c;
      return ns === void 0 ? (_c = (_a2 = state.initialOptions.defaultNs) !== null && _a2 !== void 0 ? _a2 : (_b = state.initialOptions.ns) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : "" : ns;
    },
    getAvailableLanguages() {
      if (state.initialOptions.availableLanguages) {
        return state.initialOptions.availableLanguages;
      } else if (state.initialOptions.staticData) {
        const languagesFromStaticData = Object.keys(state.initialOptions.staticData).map((key) => decodeCacheKey(key).language);
        return Array.from(new Set(languagesFromStaticData));
      }
    },
    getAvailableNs() {
      return state.initialOptions.availableNs;
    },
    withDefaultNs(descriptor) {
      return {
        namespace: descriptor.namespace === void 0 ? self2.getDefaultNs() : descriptor.namespace,
        language: descriptor.language
      };
    },
    overrideCredentials(credentials) {
      if (credentials) {
        devCredentials = Object.assign(Object.assign({}, credentials), { apiUrl: sanitizeUrl(credentials.apiUrl) });
      } else {
        devCredentials = void 0;
      }
    }
  });
  return self2;
}
function parseCombinedOptions(_a2) {
  var { ns, noWrap, orEmpty, params, language } = _a2, rest = __rest(_a2, ["ns", "noWrap", "orEmpty", "params", "language"]);
  const options = {
    ns,
    noWrap,
    orEmpty,
    language
  };
  return Object.assign(Object.assign({}, options), { params: Object.assign({}, rest) });
}
const getTranslateProps = (keyOrProps, ...params) => {
  let result = {};
  let options;
  if (typeof keyOrProps === "object") {
    result = keyOrProps;
  } else {
    result.key = keyOrProps;
    if (typeof params[0] === "string") {
      result.defaultValue = params[0];
      options = params[1];
    } else if (typeof params[0] === "object") {
      options = params[0];
    }
  }
  if (options) {
    result = Object.assign(Object.assign({}, parseCombinedOptions(options)), result);
  }
  return result;
};
function Controller({ options }) {
  const events = Events();
  const fetchingObserver = ValueObserver(false, () => cache.isFetching(), events.onFetchingChange.emit);
  const loadingObserver = ValueObserver(false, () => self2.isLoading(), events.onLoadingChange.emit);
  const state = State(events.onLanguageChange, events.onPendingLanguageChange, events.onRunningChange);
  const pluginService = Plugins(state.getLanguage, state.getInitialOptions, state.getAvailableLanguages, getDefaultAndFallbackNs, getTranslationNs, getTranslation, changeTranslation, events);
  const cache = Cache(events, pluginService.getBackendRecord, pluginService.getBackendDevRecord, state.withDefaultNs, state.isInitialLoading, fetchingObserver, loadingObserver);
  if (options) {
    init(options);
  }
  let runPromise;
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
  function getDefaultAndFallbackNs(ns) {
    return unique([...getFallbackArray(getDefaultNs(ns)), ...getFallbackNs()]);
  }
  function getRequiredNamespaces(ns) {
    return unique([
      ...getFallbackArray(ns !== null && ns !== void 0 ? ns : getDefaultNs()),
      ...state.getRequiredNamespaces()
    ]);
  }
  function changeTranslation(descriptor, key, value) {
    const keyObject = state.withDefaultNs(descriptor);
    const previousValue = cache.getTranslation(keyObject, key);
    cache.changeTranslation(keyObject, key, value);
    return {
      revert() {
        cache.changeTranslation(keyObject, key, previousValue);
      }
    };
  }
  function init(options2) {
    state.init(options2);
    cache.addStaticData(state.getInitialOptions().staticData);
  }
  function getRequiredDescriptors(lang, ns) {
    const languages = state.getFallbackLangs(lang);
    const namespaces = getRequiredNamespaces(ns);
    const result = [];
    languages.forEach((language) => {
      namespaces.forEach((namespace) => {
        result.push({ language, namespace });
      });
    });
    return result;
  }
  function getMissingDescriptors(lang, ns) {
    return getRequiredDescriptors(lang, ns).filter((descriptor) => !cache.exists(descriptor, true));
  }
  function getMatrixRecords(options2) {
    let languages = [];
    let namespaces = [];
    if (Array.isArray(options2.languages)) {
      languages = options2.languages;
    } else if (options2.languages === "all") {
      const availableLanguages = self2.getAvailableLanguages();
      if (!availableLanguages) {
        throw new Error(missingOptionError("availableLanguages"));
      }
      languages = availableLanguages;
    }
    if (Array.isArray(options2.namespaces)) {
      namespaces = options2.namespaces;
    } else if (options2.namespaces === "all") {
      const availableNs = self2.getAvailableNs();
      if (!availableNs) {
        throw new Error(missingOptionError("availableNs"));
      }
      namespaces = availableNs;
    }
    const records = [];
    languages.forEach((language) => {
      namespaces.forEach((namespace) => {
        records.push({ language, namespace });
      });
    });
    return records;
  }
  function getTranslationNs({ key, ns }) {
    const languages = state.getFallbackLangs();
    const namespaces = getDefaultAndFallbackNs(ns !== null && ns !== void 0 ? ns : void 0);
    return cache.getTranslationNs(namespaces, languages, key);
  }
  function getTranslation({ key, ns, language }) {
    const namespaces = getDefaultAndFallbackNs(ns !== null && ns !== void 0 ? ns : void 0);
    const languages = state.getFallbackLangs(language);
    return cache.getTranslationFallback(namespaces, languages, key);
  }
  function loadInitial() {
    const data = valueOrPromise(initializeLanguage(), () => {
      const missingDescriptors = getMissingDescriptors();
      if (missingDescriptors.length && state.getInitialOptions().autoLoadRequiredData) {
        return cache.loadRecords(missingDescriptors, { useCache: true });
      }
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
    } else {
      events.onInitialLoaded.emit();
    }
  }
  function initializeLanguage() {
    const existingLanguage = state.getLanguage();
    if (existingLanguage) {
      return;
    }
    const languageOrPromise = pluginService.getInitialLanguage();
    return valueOrPromise(languageOrPromise, (lang) => {
      const language = lang || state.getInitialOptions().defaultLanguage;
      language && state.setLanguage(language);
    });
  }
  function checkCorrectConfiguration() {
    const languageComputable = pluginService.getLanguageDetector() || pluginService.getLanguageStorage();
    if (languageComputable) {
      const availableLanguages = state.getAvailableLanguages();
      if (!availableLanguages) {
        throw new Error(missingOptionError("availableLanguages"));
      }
    }
    if (!state.getLanguage() && !state.getInitialOptions().defaultLanguage) {
      throw new Error(missingOptionError(["defaultLanguage", "language"]));
    }
  }
  const self2 = Object.freeze(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, events), state), pluginService), cache), {
    init,
    getTranslation,
    changeTranslation,
    getTranslationNs,
    getDefaultAndFallbackNs,
    findPositions: pluginService.findPositions,
    getRequiredDescriptors,
    async changeLanguage(language) {
      if (state.getPendingLanguage() === language && state.getLanguage() === language) {
        return;
      }
      state.setPendingLanguage(language);
      if (state.isRunning() && state.getInitialOptions().autoLoadRequiredData) {
        await cache.loadRecords(getRequiredDescriptors(language), {
          useCache: true
        });
      }
      if (language === state.getPendingLanguage()) {
        state.setLanguage(language);
        await pluginService.setStoredLanguage(language);
      }
    },
    async addActiveNs(ns, forget) {
      if (!forget) {
        state.addActiveNs(ns);
      }
      if (state.isRunning()) {
        await cache.loadRecords(getRequiredDescriptors(void 0, ns), {
          useCache: true
        });
      }
    },
    async loadRecord(descriptor, options2) {
      var _a2;
      return (_a2 = (await self2.loadRecords([descriptor], options2))[0]) === null || _a2 === void 0 ? void 0 : _a2.data;
    },
    isLoading(ns) {
      return cache.isLoading(state.getLanguage(), ns);
    },
    isLoaded(ns) {
      const language = state.getLanguage();
      if (!language) {
        return false;
      }
      const languages = state.getFallbackLangs(language);
      const namespaces = getRequiredNamespaces(ns);
      const result = [];
      languages.forEach((language2) => {
        namespaces.forEach((namespace) => {
          if (!cache.exists({ language: language2, namespace })) {
            result.push({ language: language2, namespace });
          }
        });
      });
      return result.length === 0;
    },
    t: (...args) => {
      const params = getTranslateProps(...args);
      const translation = getTranslation(params);
      return pluginService.formatTranslation(Object.assign(Object.assign({}, params), { translation }));
    },
    isDev() {
      return Boolean(state.getInitialOptions().apiKey && state.getInitialOptions().apiUrl);
    },
    async loadRequired(options2) {
      if (!(options2 === null || options2 === void 0 ? void 0 : options2.language)) {
        await initializeLanguage();
      }
      const requiredRecords = getRequiredDescriptors(options2 === null || options2 === void 0 ? void 0 : options2.language);
      return self2.loadRecords(requiredRecords, options2);
    },
    async loadMatrix(options2) {
      const records = getMatrixRecords(options2);
      return self2.loadRecords(records, options2);
    },
    run() {
      checkCorrectConfiguration();
      if (!state.isRunning()) {
        state.setRunning(true);
        pluginService.run();
        runPromise = loadInitial();
      }
      return Promise.resolve(runPromise);
    },
    stop() {
      if (state.isRunning()) {
        pluginService.stop();
        state.setRunning(false);
      }
    }
  }));
  return self2;
}
function createTolgee(options) {
  const controller = Controller({
    options
  });
  if (controller.isDev()) {
    controller.invalidate();
  }
  function withRestart(callback) {
    const wasRunning = controller.isRunning();
    wasRunning && controller.stop();
    callback();
    controller.isDev() && controller.invalidate();
    wasRunning && controller.run();
  }
  const self2 = Object.freeze({
    /**
     * Listen to tolgee events.
     */
    on: controller.on,
    /**
     * Turn off/on events emitting. Is on by default.
     */
    setEmitterActive: controller.setEmitterActive,
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
     * Load records which would be loaded by `run` function
     *
     * You can provide language if not previously set on tolgee instance
     */
    loadRequired: controller.loadRequired,
    /**
     * Load records in matrix (languages x namespaces)
     */
    loadMatrix: controller.loadMatrix,
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
     * Prefill static data
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
     * Returns descriptors of records needed for instance to be `loaded`
     */
    getRequiredDescriptors: controller.getRequiredDescriptors,
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
     * Find positions of keys in the DOM.
     */
    findPositions: controller.findPositions,
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
        withRestart(() => controller.addPlugin(self2, plugin));
      }
    },
    /**
     * Updates options after instance creation. Extends existing options,
     * so it only changes the fields, that are listed.
     *
     * When called in running state, tolgee stops and runs again.
     */
    updateOptions(options2) {
      if (options2) {
        withRestart(() => controller.init(options2));
      }
    }
  });
  return self2;
}
const TolgeeCore = () => {
  const state = {
    plugins: [],
    options: {}
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
    }
  });
  return tolgeeChain;
};
const ERROR_PARAM_EMPTY = 0, ERROR_UNEXPECTED_CHAR = 1, ERROR_UNEXPECTED_END = 2;
class FormatError extends Error {
  constructor(code, index, text) {
    let error;
    let hint = "";
    if (code === ERROR_PARAM_EMPTY) {
      error = "Empty parameter";
    } else if (code === ERROR_UNEXPECTED_CHAR) {
      error = "Unexpected character";
      hint = "Did you forget to use FormatIcu to render ICU message syntax?";
    } else {
      error = "Unexpected end";
    }
    super(`Tolgee parser: ${error} at ${index} in "${text}"` + (hint ? "\n" + hint : ""));
    this.code = code;
    this.index = index;
  }
}
function isWhitespace(ch) {
  return /\s/.test(ch);
}
const STATE_TEXT = 0, STATE_ESCAPE_MAYBE = 1, STATE_ESCAPE = 2, STATE_PARAM = 3, STATE_PARAM_AFTER = 4;
const END_STATES = /* @__PURE__ */ new Set([
  STATE_ESCAPE,
  STATE_ESCAPE_MAYBE,
  STATE_TEXT
]);
const CHAR_ESCAPE = "'";
const ESCAPABLE = /* @__PURE__ */ new Set(["{", "}", CHAR_ESCAPE]);
const isAllowedInParam = (char) => {
  return /[0-9a-zA-Z_]/.test(char);
};
function formatParser(translation) {
  let state = STATE_TEXT;
  let text = "";
  let param = "";
  let ch = "";
  const texts = [];
  const params = [];
  let i = 0;
  function parsingError(code) {
    throw new FormatError(code, i, translation);
  }
  const addText = () => {
    texts.push(text);
    text = "";
  };
  const addParamChar = () => {
    if (!isAllowedInParam(ch)) {
      parsingError(ERROR_UNEXPECTED_CHAR);
    }
    param += ch;
  };
  const addParam = () => {
    if (param === "") {
      parsingError(ERROR_PARAM_EMPTY);
    }
    params.push(param);
    param = "";
  };
  for (i = 0; i < translation.length; i++) {
    ch = translation[i];
    switch (state) {
      case STATE_TEXT:
        if (ch === CHAR_ESCAPE) {
          text += ch;
          state = STATE_ESCAPE_MAYBE;
        } else if (ch === "{") {
          addText();
          state = STATE_PARAM;
        } else {
          text += ch;
          state = STATE_TEXT;
        }
        break;
      case STATE_ESCAPE_MAYBE:
        if (ESCAPABLE.has(ch)) {
          text = text.slice(0, -1) + ch;
          state = STATE_ESCAPE;
        } else {
          text += ch;
          state = STATE_TEXT;
        }
        break;
      case STATE_ESCAPE:
        if (ch === CHAR_ESCAPE) {
          state = STATE_TEXT;
        } else {
          text += ch;
          state = STATE_ESCAPE;
        }
        break;
      case STATE_PARAM:
        if (ch === "}") {
          addParam();
          state = STATE_TEXT;
        } else if (!isWhitespace(ch)) {
          addParamChar();
          state = STATE_PARAM;
        } else if (param !== "") {
          addParam();
          state = STATE_PARAM_AFTER;
        }
        break;
      case STATE_PARAM_AFTER:
        if (ch == "}") {
          state = STATE_TEXT;
        } else if (isWhitespace(ch)) {
          state = STATE_PARAM_AFTER;
        } else {
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
    if (parameter === void 0) {
      throw new Error(`Missing parameter "${pars[i - 1]}" in "${translation}"`);
    }
    result.push(String(parameter));
    result.push(texts[i]);
  }
  return result.join("");
}
function createFormatSimple() {
  return {
    format: ({ translation, params }) => formatter(translation, params)
  };
}
const FormatSimple = () => (tolgee, tools) => {
  tools.setFinalFormatter(createFormatSimple());
  return tolgee;
};
const DEVTOOLS_ID = "__tolgee_dev_tools";
const PREFERRED_LANGUAGES_LOCAL_STORAGE_KEY = "__tolgee_preferredLanguages";
const TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE = "data-tolgee-key-only";
const TOLGEE_RESTRICT_ATTRIBUTE = "data-tolgee-restricted";
const TOLGEE_ATTRIBUTE_NAME = "_tolgee";
const TOLGEE_HIGHLIGHTER_CLASS = "_tolgee-highlighter";
function isSSR() {
  var _a2, _b;
  return typeof ((_b = (_a2 = globalThis.window) == null ? void 0 : _a2.document) == null ? void 0 : _b.createElement) === "undefined";
}
function throwIfSSR(origin) {
  if (isSSR()) {
    throw new Error(`${origin}: Can't run on the server`);
  }
}
function DomHelper(options) {
  function getParentElement(node) {
    if (node.parentElement) {
      return node.parentElement;
    }
    if (node.ownerElement) {
      return node.ownerElement || void 0;
    }
  }
  const self2 = Object.freeze({
    getSuitableParent(node) {
      const domParent = getParentElement(node);
      if (domParent === void 0) {
        console.error(node);
        throw new Error("No suitable parent found for node above.");
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
      if (typeof options.passToParent === "function") {
        if (!options.passToParent(domParent)) {
          return domParent;
        }
      }
      return self2.getSuitableParent(domParent);
    }
  });
  return self2;
}
function initElementMeta(element) {
  return {
    element,
    nodes: /* @__PURE__ */ new Map()
  };
}
function initNodeMeta(oldTextContent, keys) {
  return {
    oldTextContent,
    keys
  };
}
function getNodeText(node) {
  return node.textContent;
}
function setNodeText(node, text) {
  node.textContent = text;
}
function compareDescriptors(descriptor, criteria) {
  var _a2;
  const keyMatches = descriptor.key === void 0 || criteria.key === void 0 || criteria.key === descriptor.key;
  const nsMatches = descriptor.ns === void 0 || criteria.ns === void 0 || ((_a2 = descriptor.ns) == null ? void 0 : _a2.findIndex((ns) => {
    var _a3;
    return (_a3 = criteria.ns) == null ? void 0 : _a3.includes(ns);
  })) !== -1;
  return keyMatches && nsMatches;
}
function elementClickable(el) {
  while (el) {
    if (el.getAttribute("disabled") !== null) {
      return false;
    }
    el = el.parentElement;
  }
  return true;
}
const HIGHLIGHTER_BASE_STYLE = {
  position: "fixed",
  boxSizing: "content-box",
  zIndex: String(Number.MAX_SAFE_INTEGER),
  contain: "layout",
  display: "block",
  borderStyle: "solid",
  borderRadius: "4px"
};
function ElementHighlighter({ highlightColor, highlightWidth }) {
  function initHighlightFunction(element, elementMeta) {
    elementMeta.highlight = () => {
      if (!element.isConnected) {
        return;
      }
      const clickable = elementClickable(element);
      let highlightEl = elementMeta.highlightEl;
      if (!highlightEl) {
        highlightEl = document.createElement("div");
        highlightEl.classList.add(TOLGEE_HIGHLIGHTER_CLASS);
        Object.entries(HIGHLIGHTER_BASE_STYLE).forEach(([key, value]) => {
          highlightEl.style[key] = value;
        });
        highlightEl.style.borderColor = highlightColor;
        elementMeta.highlightEl = highlightEl;
        document.body.appendChild(highlightEl);
      }
      const shape = element.getBoundingClientRect();
      highlightEl.style.pointerEvents = clickable ? "none" : "auto";
      highlightEl.style.borderWidth = highlightWidth + "px";
      highlightEl.style.top = shape.top - highlightWidth + "px";
      highlightEl.style.left = shape.left - highlightWidth + "px";
      highlightEl.style.width = shape.width + "px";
      highlightEl.style.height = shape.height + "px";
    };
  }
  function initUnhighlightFunction(element, elementMeta) {
    elementMeta.unhighlight = () => {
      var _a2;
      (_a2 = elementMeta.highlightEl) == null ? void 0 : _a2.remove();
      elementMeta.highlightEl = void 0;
    };
  }
  return Object.freeze({
    initHighlighter(element, elementMeta) {
      initHighlightFunction(element, elementMeta);
      initUnhighlightFunction(element, elementMeta);
    }
  });
}
const eCapture = {
  capture: true
};
const ePassive = {
  capture: true,
  passive: true
};
const MODIFIER_MAP = /* @__PURE__ */ new Map([
  ["Control", "ctrlKey"],
  ["Alt", "altKey"],
  ["Meta", "metaKey"],
  ["Shift", "shiftKey"]
]);
function MouseEventHandler({
  highlightKeys,
  elementStore,
  onClick,
  options
}) {
  var _a2, _b;
  const keysDown = /* @__PURE__ */ new Set();
  let highlighted;
  let cursorPosition;
  let subscribedEvents = [];
  const documentOrShadowRoot = ((_a2 = options.targetElement) == null ? void 0 : _a2.getRootNode()) || document;
  const targetDocument = ((_b = options.targetElement) == null ? void 0 : _b.ownerDocument) || document;
  function highlight(el) {
    var _a3;
    if (highlighted !== el) {
      unhighlight();
      const meta = elementStore.get(el);
      if (meta) {
        meta.preventClean = true;
        (_a3 = meta.highlight) == null ? void 0 : _a3.call(meta);
        highlighted = el;
      }
    }
  }
  function unhighlight() {
    var _a3;
    const meta = elementStore.get(highlighted);
    if (meta) {
      meta.preventClean = false;
      (_a3 = meta.unhighlight) == null ? void 0 : _a3.call(meta);
      highlighted = void 0;
    }
  }
  function updateHighlight() {
    const position = cursorPosition;
    let newHighlighted;
    if (position && areKeysDown()) {
      const elements = documentOrShadowRoot.elementsFromPoint(position.x, position.y) || [];
      newHighlighted = getClosestTolgeeElement(elements);
    }
    highlight(newHighlighted);
  }
  function updateCursorPosition(position) {
    cursorPosition = position;
    updateHighlight();
  }
  function updateModifiers(e) {
    for (const [modifier, modifierProperty] of MODIFIER_MAP.entries()) {
      if (keysDown.has(modifier) && !e[modifierProperty]) {
        keysDown.delete(modifier);
      } else if (!keysDown.has(modifier) && e[modifierProperty]) {
        keysDown.add(modifier);
      }
    }
  }
  function blockEvents(e) {
    updateModifiers(e);
    if (areKeysDown() && !isInUiDialog(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  function onMouseMove(e) {
    updateModifiers(e);
    updateCursorPosition({ x: e.clientX, y: e.clientY });
  }
  function onKeyDown(e) {
    updateModifiers(e);
    updateHighlight();
  }
  function onKeyUp(e) {
    updateModifiers(e);
    updateHighlight();
  }
  function onScroll() {
    var _a3;
    const meta = elementStore.get(highlighted);
    (_a3 = meta == null ? void 0 : meta.highlight) == null ? void 0 : _a3.call(meta);
  }
  function handleClick(e) {
    blockEvents(e);
    updateModifiers(e);
    updateCursorPosition({ x: e.clientX, y: e.clientY });
    if (areKeysDown() && highlighted) {
      onClick(highlighted);
      unhighlight();
    }
  }
  function subscribe(type, listener, options2) {
    targetDocument.addEventListener(type, listener, options2);
    subscribedEvents.push([type, listener, options2]);
  }
  function initEventListeners() {
    subscribe("keydown", onKeyDown, eCapture);
    subscribe("keyup", onKeyUp, eCapture);
    subscribe("mousemove", onMouseMove, ePassive);
    subscribe("scroll", onScroll, ePassive);
    subscribe("click", handleClick, eCapture);
    subscribe("mouseenter", blockEvents, eCapture);
    subscribe("mouseover", blockEvents, eCapture);
    subscribe("mouseout", blockEvents, eCapture);
    subscribe("mouseleave", blockEvents, eCapture);
    subscribe("mousedown", blockEvents, eCapture);
    subscribe("mouseup", blockEvents, eCapture);
  }
  function removeEventListeners() {
    for (const params of subscribedEvents) {
      targetDocument.removeEventListener(...params);
    }
    subscribedEvents = [];
  }
  function isInUiDialog(element) {
    return Boolean(findAncestor(element, (el) => el.id === DEVTOOLS_ID));
  }
  function getClosestTolgeeElement(elements) {
    for (const element of elements) {
      const result = findAncestor(
        element,
        (el) => elementStore.get(el)
      );
      if (result !== void 0) {
        return result || void 0;
      }
    }
  }
  function findAncestor(element, func) {
    if (element.id === DEVTOOLS_ID) {
      return null;
    }
    if (func(element)) {
      return element;
    }
    if (element == null ? void 0 : element.parentElement) {
      return findAncestor(element.parentElement, func);
    }
    return void 0;
  }
  function areKeysDown() {
    for (const key of highlightKeys) {
      if (!keysDown.has(key)) {
        return false;
      }
    }
    return true;
  }
  return Object.freeze({
    stop() {
      removeEventListeners();
    },
    run() {
      initEventListeners();
    }
  });
}
function ElementRegistry(options, elementStore, onClick) {
  const elementHighlighter = ElementHighlighter({
    highlightColor: options.highlightColor,
    highlightWidth: options.highlightWidth
  });
  const eventHandler = MouseEventHandler({
    highlightKeys: options.highlightKeys,
    elementStore,
    onClick(el) {
      const meta = elementStore.get(el);
      onClick({
        target: el,
        keysAndDefaults: getKeysAndDefaults(meta)
      });
    },
    options
  });
  function isRestricted(element) {
    const restrictedElements = options.restrictedElements;
    return restrictedElements.indexOf(element.tagName.toLowerCase()) !== -1 || element.closest(`[${TOLGEE_RESTRICT_ATTRIBUTE}]`) !== null;
  }
  function cleanElementInactiveNodes(meta, removedNodes) {
    for (const [key] of meta.nodes) {
      if (removedNodes.has(key)) {
        meta.nodes.delete(key);
      }
    }
  }
  function cleanElement(element, meta) {
    var _a2;
    if (meta.highlightEl) {
      (_a2 = meta.unhighlight) == null ? void 0 : _a2.call(meta);
    }
    element.removeAttribute(TOLGEE_ATTRIBUTE_NAME);
    elementStore.remove(element);
  }
  function getKeyOptions(meta) {
    const nodes = Array.from(meta.nodes.values());
    return nodes.reduce(
      (acc, curr) => [
        ...acc,
        ...curr.keys.map((k) => ({
          key: k.key,
          defaultValue: k.defaultValue,
          ns: k.ns
        }))
      ],
      []
    );
  }
  function getKeysAndDefaults(meta) {
    return getKeyOptions(meta);
  }
  return Object.freeze({
    isRestricted,
    register(element, node, nodeMeta) {
      if (isRestricted(element)) {
        return;
      }
      const tolgeeElement = element;
      let elementMeta = elementStore.get(tolgeeElement);
      if (!elementMeta) {
        elementMeta = initElementMeta(tolgeeElement);
        elementStore.set(tolgeeElement, elementMeta);
        tolgeeElement.setAttribute(TOLGEE_ATTRIBUTE_NAME, "true");
      }
      elementMeta.nodes.set(node, nodeMeta);
      elementHighlighter.initHighlighter(tolgeeElement, elementMeta);
    },
    forEachElement: elementStore.forEachElement,
    cleanupLingeringKeyAttributes() {
      elementStore.forEachElement((element, meta) => {
        if (meta.preventClean) {
          return;
        }
        for (const [node] of meta.nodes) {
          if (node.nodeType === Node.ATTRIBUTE_NODE) {
            const attr = node;
            if (attr.name === TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE && attr.ownerElement === null) {
              meta.nodes.delete(attr);
            }
          }
        }
        if (meta.nodes.size === 0) {
          cleanElement(element, meta);
        }
      });
    },
    cleanupRemovedNodes(removedNodes) {
      elementStore.forEachElement((element, meta) => {
        if (meta.preventClean) {
          return;
        }
        if (!removedNodes.has(element)) {
          cleanElementInactiveNodes(meta, removedNodes);
        }
        if (removedNodes.has(element) || meta.nodes.size === 0) {
          cleanElement(element, meta);
        }
      });
    },
    findAll(key, ns) {
      const result = [];
      elementStore.forEachElement((_, meta) => {
        for (const nodeMeta of meta.nodes.values()) {
          const fits = nodeMeta.keys.find(
            (val) => compareDescriptors(
              { key, ns: getFallback(ns) },
              { key: val.key, ns: getFallback(val.ns) }
            )
          );
          if (fits) {
            result.push(meta);
            break;
          }
        }
      });
      return result;
    },
    run(mouseHighlight) {
      if (mouseHighlight) {
        eventHandler.run();
      }
    },
    stop() {
      eventHandler.stop();
      elementStore.forEachElement((_, meta) => {
        var _a2;
        if (meta.highlightEl) {
          (_a2 = meta.unhighlight) == null ? void 0 : _a2.call(meta);
        }
      });
    }
  });
}
function ElementStore() {
  const registredElements = /* @__PURE__ */ new Map();
  return Object.freeze({
    set(el, meta) {
      registredElements.set(el, meta);
    },
    get(el) {
      return el && registredElements.get(el);
    },
    remove(el) {
      return registredElements.delete(el);
    },
    forEachElement(callback) {
      registredElements.forEach((value, key) => callback(key, value));
    }
  });
}
function NodeHandler(options, wrapper) {
  const self2 = Object.freeze({
    handleAttributes(node, includeChild = true) {
      var _a2, _b;
      const result = [];
      const tagAttributes = Object.fromEntries(
        Object.entries(options.tagAttributes).map(([tag, attributes]) => [
          tag.toUpperCase(),
          attributes
        ])
      );
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        let attributes = (_a2 = tagAttributes[element.tagName.toUpperCase()]) != null ? _a2 : [];
        if ("*" in tagAttributes) {
          attributes = attributes.concat(tagAttributes["*"]);
        }
        result.push(
          ...attributes.filter((attrName) => element.hasAttribute(attrName)).map((attrName) => element.getAttributeNode(attrName)).filter(
            (attrNode) => wrapper.testAttribute(attrNode)
          )
        );
      }
      if (includeChild) {
        const walker = document.createTreeWalker(
          node,
          NodeFilter.SHOW_ELEMENT,
          (f) => {
            var _a3, _b2;
            return ((_a3 = tagAttributes[f.tagName.toUpperCase()]) == null ? void 0 : _a3.some(
              (t) => f.hasAttribute(t)
            )) || ((_b2 = tagAttributes["*"]) == null ? void 0 : _b2.some((t) => f.hasAttribute(t))) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        );
        while (walker.nextNode()) {
          const element = walker.currentNode;
          let attributes = (_b = tagAttributes[element.tagName.toUpperCase()]) != null ? _b : [];
          if ("*" in tagAttributes) {
            attributes = attributes.concat(tagAttributes["*"]);
          }
          result.push(
            ...attributes.filter((attrName) => element.hasAttribute(attrName)).map((attrName) => element.getAttributeNode(attrName)).filter(
              (attrNode) => wrapper.testAttribute(attrNode)
            )
          );
        }
      }
      return result;
    },
    handleChildList(node) {
      const result = [];
      result.push(...node.flatMap((n) => self2.handleAttributes(n, true)));
      result.push(...node.flatMap((n) => self2.handleText(n)));
      return result;
    },
    handleText(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return wrapper.testTextNode(node) ? [node] : [];
      }
      const nodes = [];
      const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        (f) => wrapper.testTextNode(f) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      );
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }
      return nodes;
    }
  });
  return self2;
}
function GeneralObserver() {
  let isObserving = false;
  let instance;
  const elementStore = ElementStore();
  function createRunningInstance({
    mouseHighlight,
    options,
    wrapper,
    onClick
  }) {
    if (isSSR()) {
      return {
        stop() {
          isObserving = false;
        },
        wrapper
      };
    }
    const domHelper = DomHelper(options);
    const nodeHandler = NodeHandler(options, wrapper);
    const elementRegistry = ElementRegistry(options, elementStore, onClick);
    function handleNodes(nodes) {
      for (const textNode of nodes) {
        const parent = textNode.parentElement;
        if (parent && elementRegistry.isRestricted(parent)) {
          continue;
        }
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
    function handleKeyAttributeAttr(attr) {
      const parentElement = domHelper.getSuitableParent(attr);
      elementRegistry.register(parentElement, attr, {
        oldTextContent: "",
        keys: [{ key: getNodeText(attr) }],
        keyAttributeOnly: true
      });
    }
    function handleKeyAttribute(node, includeChild) {
      if (node.nodeType === Node.ATTRIBUTE_NODE) {
        const attr = node;
        if (attr.name === TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE) {
          handleKeyAttributeAttr(attr);
          return;
        }
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        const attr = element.getAttributeNode(
          TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE
        );
        if (attr) {
          handleKeyAttributeAttr(attr);
        }
      }
      if (!includeChild) {
        return;
      }
      const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_ELEMENT,
        (e) => e.hasAttribute(TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      );
      while (walker.nextNode()) {
        const attr = walker.currentNode.getAttributeNode(
          TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE
        );
        handleKeyAttributeAttr(attr);
      }
    }
    const observer = new MutationObserver((mutationsList) => {
      if (!isObserving) {
        return;
      }
      const removedNodes = mutationsList.filter((m) => m.type === "childList").flatMap((m) => Array.from(m.removedNodes));
      const removedNodesSet = new Set(removedNodes);
      for (const node of removedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          for (let i = 0; i < node.attributes.length; i++) {
            removedNodesSet.add(node.attributes[i]);
          }
        }
        const treeWalker = document.createTreeWalker(
          node,
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
        );
        while (treeWalker.nextNode()) {
          const currentNode = treeWalker.currentNode;
          if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const element = currentNode;
            for (let i = 0; i < element.attributes.length; i++) {
              removedNodesSet.add(element.attributes[i]);
            }
          }
          removedNodesSet.add(currentNode);
        }
      }
      if (removedNodesSet.size > 0) {
        elementRegistry.cleanupRemovedNodes(removedNodesSet);
      }
      if (mutationsList.some(
        (m) => m.type === "attributes" && m.attributeName === TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE
      )) {
        elementRegistry.cleanupLingeringKeyAttributes();
      }
      const result = /* @__PURE__ */ new Set();
      for (const mutation of mutationsList) {
        switch (mutation.type) {
          case "characterData":
            nodeHandler.handleText(mutation.target).forEach((t) => result.add(t));
            break;
          case "childList":
            handleKeyAttribute(mutation.target, true);
            if (mutation.addedNodes.length > 0) {
              nodeHandler.handleChildList(Array.from(mutation.addedNodes)).forEach((t) => result.add(t));
            }
            if (mutation.removedNodes.length > 0) {
              nodeHandler.handleChildList(Array.from(mutation.removedNodes)).forEach((t) => result.delete(t));
            }
            break;
          case "attributes":
            if (mutation.attributeName === TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE) {
              handleKeyAttribute(mutation.target, false);
            }
            nodeHandler.handleAttributes(mutation.target, false).forEach((t) => result.add(t));
            break;
        }
      }
      handleNodes([...result]);
    });
    const targetElement = options.targetElement || document;
    isObserving = true;
    elementRegistry.run(mouseHighlight);
    handleKeyAttribute(targetElement, true);
    handleNodes(nodeHandler.handleChildList([targetElement]));
    const monitorAttributeList = /* @__PURE__ */ new Set();
    monitorAttributeList.add(TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE);
    Object.values(options.tagAttributes).forEach(
      (attrs) => attrs.forEach((attr) => monitorAttributeList.add(attr.toLowerCase()))
    );
    observer.observe(targetElement, {
      attributes: true,
      attributeFilter: [...monitorAttributeList],
      childList: true,
      subtree: true,
      characterData: true
    });
    return {
      stop() {
        isObserving = false;
        elementRegistry.stop();
        observer.disconnect();
      },
      elementRegistry,
      wrapper
    };
  }
  const self2 = Object.freeze({
    run(props) {
      instance = createRunningInstance(props);
    },
    stop() {
      instance == null ? void 0 : instance.stop();
    },
    forEachElement(callback) {
      var _a2, _b;
      (_b = (_a2 = instance == null ? void 0 : instance.elementRegistry) == null ? void 0 : _a2.forEachElement) == null ? void 0 : _b.call(_a2, callback);
    },
    highlight(key, ns) {
      var _a2;
      const elements = ((_a2 = instance == null ? void 0 : instance.elementRegistry) == null ? void 0 : _a2.findAll(key, ns)) || [];
      elements.forEach((el) => {
        var _a3;
        return (_a3 = el.highlight) == null ? void 0 : _a3.call(el);
      });
      return {
        unhighlight() {
          elements.forEach((el) => {
            var _a3;
            return (_a3 = el.unhighlight) == null ? void 0 : _a3.call(el);
          });
        }
      };
    },
    findPositions(key, ns) {
      var _a2;
      const elements = ((_a2 = instance == null ? void 0 : instance.elementRegistry) == null ? void 0 : _a2.findAll(key, ns)) || [];
      const result = [];
      elements.sort((a, b) => {
        if (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        } else {
          return 1;
        }
      });
      elements.forEach((meta) => {
        const shape = meta.element.getBoundingClientRect();
        meta.nodes.forEach((node) => {
          node.keys.forEach((val) => {
            if (compareDescriptors(
              { key, ns: getFallback(ns) },
              { key: val.key, ns: getFallback(val.ns) }
            ))
              result.push({
                position: {
                  x: shape.x,
                  y: shape.y,
                  width: shape.width,
                  height: shape.height
                },
                keyName: val.key,
                keyNamespace: val.ns || ""
              });
          });
        });
      });
      return result;
    },
    unwrap(text) {
      if (instance) {
        return instance.wrapper.unwrap(text);
      }
      return {
        text,
        keys: []
      };
    },
    wrap(props) {
      if (instance) {
        return instance.wrapper.wrap(props);
      }
      return props.translation || "";
    }
  });
  return self2;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var text_min = {};
(function(scope) {
  function B(r, e) {
    var f;
    return r instanceof Buffer ? f = r : f = Buffer.from(r.buffer, r.byteOffset, r.byteLength), f.toString(e);
  }
  var w = function(r) {
    return Buffer.from(r);
  };
  function h(r) {
    for (var e = 0, f = Math.min(256 * 256, r.length + 1), n = new Uint16Array(f), i = [], o = 0; ; ) {
      var t = e < r.length;
      if (!t || o >= f - 1) {
        var s = n.subarray(0, o), m = s;
        if (i.push(String.fromCharCode.apply(null, m)), !t)
          return i.join("");
        r = r.subarray(e), e = 0, o = 0;
      }
      var a = r[e++];
      if ((a & 128) === 0)
        n[o++] = a;
      else if ((a & 224) === 192) {
        var d = r[e++] & 63;
        n[o++] = (a & 31) << 6 | d;
      } else if ((a & 240) === 224) {
        var d = r[e++] & 63, l = r[e++] & 63;
        n[o++] = (a & 31) << 12 | d << 6 | l;
      } else if ((a & 248) === 240) {
        var d = r[e++] & 63, l = r[e++] & 63, R = r[e++] & 63, c = (a & 7) << 18 | d << 12 | l << 6 | R;
        c > 65535 && (c -= 65536, n[o++] = c >>> 10 & 1023 | 55296, c = 56320 | c & 1023), n[o++] = c;
      }
    }
  }
  function F(r) {
    for (var e = 0, f = r.length, n = 0, i = Math.max(32, f + (f >>> 1) + 7), o = new Uint8Array(i >>> 3 << 3); e < f; ) {
      var t = r.charCodeAt(e++);
      if (t >= 55296 && t <= 56319) {
        if (e < f) {
          var s = r.charCodeAt(e);
          (s & 64512) === 56320 && (++e, t = ((t & 1023) << 10) + (s & 1023) + 65536);
        }
        if (t >= 55296 && t <= 56319)
          continue;
      }
      if (n + 4 > o.length) {
        i += 8, i *= 1 + e / r.length * 2, i = i >>> 3 << 3;
        var m = new Uint8Array(i);
        m.set(o), o = m;
      }
      if ((t & 4294967168) === 0) {
        o[n++] = t;
        continue;
      } else if ((t & 4294965248) === 0)
        o[n++] = t >>> 6 & 31 | 192;
      else if ((t & 4294901760) === 0)
        o[n++] = t >>> 12 & 15 | 224, o[n++] = t >>> 6 & 63 | 128;
      else if ((t & 4292870144) === 0)
        o[n++] = t >>> 18 & 7 | 240, o[n++] = t >>> 12 & 63 | 128, o[n++] = t >>> 6 & 63 | 128;
      else
        continue;
      o[n++] = t & 63 | 128;
    }
    return o.slice ? o.slice(0, n) : o.subarray(0, n);
  }
  var u = "Failed to ", p = function(r, e, f) {
    if (r)
      throw new Error("".concat(u).concat(e, ": the '").concat(f, "' option is unsupported."));
  };
  var x = typeof Buffer == "function" && Buffer.from;
  var A = x ? w : F;
  function v() {
    this.encoding = "utf-8";
  }
  v.prototype.encode = function(r, e) {
    return p(e && e.stream, "encode", "stream"), A(r);
  };
  function U(r) {
    var e;
    try {
      var f = new Blob([r], { type: "text/plain;charset=UTF-8" });
      e = URL.createObjectURL(f);
      var n = new XMLHttpRequest();
      return n.open("GET", e, false), n.send(), n.responseText;
    } finally {
      e && URL.revokeObjectURL(e);
    }
  }
  var O = !x && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", S = ["utf-8", "utf8", "unicode-1-1-utf-8"], T = h;
  x ? T = B : O && (T = function(r) {
    try {
      return U(r);
    } catch (e) {
      return h(r);
    }
  });
  var y = "construct 'TextDecoder'", E = "".concat(u, " ").concat(y, ": the ");
  function g(r, e) {
    p(e && e.fatal, y, "fatal"), r = r || "utf-8";
    var f;
    if (x ? f = Buffer.isEncoding(r) : f = S.indexOf(r.toLowerCase()) !== -1, !f)
      throw new RangeError("".concat(E, " encoding label provided ('").concat(r, "') is invalid."));
    this.encoding = r, this.fatal = false, this.ignoreBOM = false;
  }
  g.prototype.decode = function(r, e) {
    p(e && e.stream, "decode", "stream");
    var f;
    return r instanceof Uint8Array ? f = r : r.buffer instanceof ArrayBuffer ? f = new Uint8Array(r.buffer) : f = new Uint8Array(r), T(f, this.encoding);
  };
  scope.TextEncoder = scope.TextEncoder || v;
  scope.TextDecoder = scope.TextDecoder || g;
})(typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal);
const FastTextEncoding = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: text_min
}, [text_min]);
(_a = console.assert) == null ? void 0 : _a.call(console, FastTextEncoding);
const INVISIBLE_CHARACTERS = ["‌", "‍"];
const INVISIBLE_REGEX = RegExp(
  `([${INVISIBLE_CHARACTERS.join("")}]{9})+`,
  "gu"
);
function toBytes(text) {
  return Array.from(new TextEncoder().encode(text));
}
function fromBytes(bytes) {
  return new TextDecoder().decode(new Uint8Array(bytes));
}
function padToWholeBytes(binary) {
  const needsToAdd = 8 - binary.length;
  return "0".repeat(needsToAdd) + binary;
}
function encodeMessage(text) {
  const bytes = toBytes(text).map(Number);
  const binary = bytes.map((byte) => padToWholeBytes(byte.toString(2)) + "0").join("");
  const result = Array.from(binary).map((b) => INVISIBLE_CHARACTERS[Number(b)]).join("");
  return result;
}
function decodeMessage(message) {
  const binary = Array.from(message).map((character) => {
    return INVISIBLE_CHARACTERS.indexOf(character);
  }).map(String).join("");
  const textBytes = binary.match(/(.{9})/g);
  const codes = Uint8Array.from(
    (textBytes == null ? void 0 : textBytes.map((byte) => parseInt(byte.slice(0, 8), 2))) || []
  );
  return fromBytes(codes);
}
function decodeFromText(text) {
  var _a2;
  const invisibleMessages = (_a2 = text.match(INVISIBLE_REGEX)) == null ? void 0 : _a2.filter((m) => m.length > 8);
  return (invisibleMessages == null ? void 0 : invisibleMessages.map(decodeMessage)) || [];
}
function removeSecrets(text) {
  return text.replace(INVISIBLE_REGEX, "");
}
function ValueMemory() {
  const values = [];
  return Object.freeze({
    valueToNumber(key) {
      let index = values.indexOf(key);
      if (index === -1) {
        index = values.length;
        values.push(key);
      }
      return index;
    },
    numberToValue(num) {
      return values[num];
    }
  });
}
const MESSAGE_END = "\n";
function InvisibleWrapper({ fullKeyEncode }) {
  const keyMemory = ValueMemory();
  function encodeValue(data) {
    const value = {
      k: data.key,
      n: data.ns || void 0,
      d: data.defaultValue
    };
    return JSON.stringify(value);
  }
  function decodeValue(value) {
    try {
      return JSON.parse(value || "{}");
    } catch (e) {
      console.error(e);
      return void 0;
    }
  }
  function retrieveMessages(text) {
    return text.split(MESSAGE_END).filter((m) => m.length).map((message) => {
      if (message[0] === "{") {
        return message;
      } else {
        const valueCode = Number(message);
        return keyMemory.numberToValue(valueCode);
      }
    });
  }
  function encodeWithSeparator(message) {
    return encodeMessage(message + MESSAGE_END);
  }
  return Object.freeze({
    unwrap(text) {
      const keysAndParams = [];
      const texts = decodeFromText(text);
      texts.forEach((encodedValue) => {
        const messages = retrieveMessages(encodedValue);
        messages.forEach((message) => {
          const decodedVal = decodeValue(message);
          if (decodedVal) {
            const { k: key, d: defaultValue, n: ns } = decodedVal;
            keysAndParams.push({
              key,
              defaultValue,
              ns
            });
          }
        });
      });
      const result = removeSecrets(text);
      return { text: result, keys: keysAndParams };
    },
    wrap({ key, defaultValue, translation, ns }) {
      let invisibleMark;
      if (fullKeyEncode) {
        const encodedValue = encodeValue({ key, ns });
        invisibleMark = encodeWithSeparator(encodedValue);
      } else {
        const encodedValue = encodeValue({ key, ns, defaultValue });
        const code = keyMemory.valueToNumber(encodedValue);
        invisibleMark = encodeWithSeparator(String(code));
      }
      const value = translation || "";
      return typeof value === "string" ? value + invisibleMark : value;
    },
    testTextNode(textNode) {
      var _a2, _b, _c;
      return (_c = ((_a2 = textNode.textContent) == null ? void 0 : _a2.includes(
        `${INVISIBLE_CHARACTERS[0]}${INVISIBLE_CHARACTERS[0]}`
      )) || ((_b = textNode.textContent) == null ? void 0 : _b.includes(
        `${INVISIBLE_CHARACTERS[1]}${INVISIBLE_CHARACTERS[0]}`
      ))) != null ? _c : false;
    },
    testAttribute(attribute) {
      return attribute.value.includes(
        `${INVISIBLE_CHARACTERS[0]}${INVISIBLE_CHARACTERS[0]}`
      ) || attribute.value.includes(
        `${INVISIBLE_CHARACTERS[1]}${INVISIBLE_CHARACTERS[0]}`
      );
    }
  });
}
const InvisibleObserver = () => () => {
  const observer = GeneralObserver();
  const self2 = Object.freeze(__spreadProps(__spreadValues({}, observer), {
    run(props) {
      const wrapper = InvisibleWrapper({
        fullKeyEncode: props.options.fullKeyEncode
      });
      observer.run(__spreadProps(__spreadValues({}, props), { wrapper }));
    },
    retranslate() {
    },
    outputNotFormattable: false
  }));
  return self2;
};
function isCharEscaped(position, fullString) {
  let escapeCharsCount = 0;
  while (position > -1 && fullString[position - 1] === "\\") {
    escapeCharsCount++;
    position--;
  }
  return escapeCharsCount % 2 == 1;
}
function TextWrapper({
  inputPrefix,
  inputSuffix,
  translate
}) {
  function getRawUnWrapRegex() {
    const escapedPrefix = escapeForRegExp(inputPrefix);
    const escapedSuffix = escapeForRegExp(inputSuffix);
    return `(\\\\?)(${escapedPrefix}(.*?)${escapedSuffix})`;
  }
  function parseUnwrapped(unwrappedString) {
    let escaped = false;
    let actual = "";
    let paramName = "";
    let readingState = "KEY";
    const result = {
      key: "",
      ns: void 0,
      params: {},
      defaultValue: void 0
    };
    const addNamespace = (ns) => {
      result.ns = ns;
    };
    for (const char of unwrappedString) {
      if (char === "\\" && !escaped) {
        escaped = true;
        continue;
      }
      if (escaped) {
        escaped = false;
        actual += char;
        continue;
      }
      if (readingState === "KEY" && char === ",") {
        readingState = "DEFAULT_VALUE";
        result.key = actual;
        actual = "";
        continue;
      }
      if (readingState === "KEY" && char === "|") {
        readingState = "NAMESPACE";
        result.key = actual;
        actual = "";
        continue;
      }
      if (readingState === "NAMESPACE" && char === ",") {
        readingState = "DEFAULT_VALUE";
        addNamespace(actual);
        actual = "";
        continue;
      }
      if (readingState === "KEY" && char === ":") {
        readingState = "PARAM_NAME";
        result.key = actual;
        actual = "";
        continue;
      }
      if (readingState === "DEFAULT_VALUE" && char === ":") {
        readingState = "PARAM_NAME";
        result.defaultValue = actual;
        actual = "";
        continue;
      }
      if (readingState === "PARAM_NAME" && char === ":") {
        readingState = "PARAM_VALUE";
        paramName = actual;
        actual = "";
        continue;
      }
      if (readingState === "PARAM_VALUE" && char === ",") {
        readingState = "PARAM_NAME";
        result.params[paramName] = actual;
        actual = "";
        continue;
      }
      actual += char;
    }
    if (readingState === "KEY") {
      result.key = actual;
    }
    if (readingState === "DEFAULT_VALUE") {
      result.defaultValue = actual;
    }
    if (readingState === "PARAM_VALUE") {
      result.params[paramName] = actual;
    }
    if (readingState === "NAMESPACE") {
      addNamespace(actual);
    }
    return result;
  }
  function getTranslatedWithMetadata(text) {
    const { key, params, defaultValue, ns } = parseUnwrapped(text);
    const translated = translate({
      key,
      params,
      defaultValue,
      ns,
      noWrap: true
    });
    return { translated, key, params, defaultValue, ns };
  }
  function escapeForRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function escapeParam(param) {
    if (typeof param === "string") {
      return param.replace(new RegExp("[,:|\\\\]", "gs"), "\\$&");
    }
    if (typeof param === "number" || typeof param === "bigint") {
      return param.toString();
    }
    console.warn(
      `Parameters of type "${typeof param}" are not supported in "text" wrapper mode.`
    );
    return param;
  }
  return Object.freeze({
    wrap({ key, params, defaultValue, ns }) {
      let paramString = Object.entries(params || {}).map(
        ([name, value]) => `${escapeParam(name)}:${escapeParam(value)}`
      ).join(",");
      paramString = paramString.length ? `:${paramString}` : "";
      const defaultString = defaultValue !== void 0 ? `,${escapeParam(defaultValue)}` : "";
      const nsArray = typeof ns === "string" ? [ns] : ns;
      const namespaces = (nsArray == null ? void 0 : nsArray.length) ? `|${nsArray.map((ns2) => escapeParam(ns2)).join("|")}` : "";
      return `${inputPrefix}${escapeParam(
        key
      )}${namespaces}${defaultString}${paramString}${inputSuffix}`;
    },
    unwrap(text) {
      const matchRegexp = new RegExp(getRawUnWrapRegex(), "gs");
      const keysAndParams = [];
      let matched = false;
      let match;
      let start = 0;
      let result = "";
      while ((match = matchRegexp.exec(text)) !== null) {
        let pre = match[1];
        const [fullMatch, _, wrapped, unwrapped] = match;
        const { index, input } = match;
        result += input.substr(start, index - start);
        start = index + fullMatch.length;
        if (pre === "\\") {
          if (!isCharEscaped(index, text)) {
            result += wrapped;
            continue;
          }
          pre = "";
        }
        const translated = getTranslatedWithMetadata(unwrapped);
        keysAndParams.push({
          key: translated.key,
          params: translated.params,
          defaultValue: translated.defaultValue,
          ns: translated.ns
        });
        matched = true;
        result += pre + translated.translated;
      }
      result += text.substring(start);
      if (matched) {
        return { text: result, keys: keysAndParams };
      }
      return { text, keys: [] };
    },
    testTextNode(textNode) {
      var _a2, _b, _c;
      return (_c = ((_a2 = textNode.textContent) == null ? void 0 : _a2.includes(inputPrefix)) && ((_b = textNode.textContent) == null ? void 0 : _b.includes(inputSuffix))) != null ? _c : false;
    },
    testAttribute(attribute) {
      return attribute.value.includes(inputPrefix) && attribute.value.includes(inputSuffix);
    }
  });
}
const TextObserver = () => () => {
  const observer = GeneralObserver();
  const self2 = Object.freeze(__spreadProps(__spreadValues({}, observer), {
    run(props) {
      const wrapper = TextWrapper({
        inputPrefix: props.options.inputPrefix,
        inputSuffix: props.options.inputSuffix,
        translate: props.translate
      });
      observer.run(__spreadProps(__spreadValues({}, props), { wrapper }));
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
    },
    outputNotFormattable: true
  }));
  return self2;
};
const ObserverPlugin = () => (tolgee, tools) => {
  if (tolgee.getInitialOptions().observerType === "text") {
    tools.setObserver(TextObserver());
  } else {
    tools.setObserver(InvisibleObserver());
  }
  return tolgee;
};
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function readChar(char) {
  const idx = alphabet.indexOf(char);
  if (idx === -1) {
    throw new Error("Invalid character found: " + char);
  }
  return idx;
}
function arrayBufferToString(buffer) {
  const bufView = new Uint8Array(buffer);
  const length = bufView.length;
  let result = "";
  let addition = Math.pow(2, 16) - 1;
  for (let i = 0; i < length; i += addition) {
    if (i + addition > length) {
      addition = length - i;
    }
    result += String.fromCharCode.apply(
      null,
      // @ts-ignore
      bufView.subarray(i, i + addition)
    );
  }
  return result;
}
function base32Decode(input) {
  input = input.toUpperCase();
  const length = input.length;
  let bits = 0;
  let value = 0;
  let index = 0;
  const output = new Uint8Array(length * 5 / 8 | 0);
  for (let i = 0; i < length; i++) {
    value = value << 5 | readChar(input[i]);
    bits += 5;
    if (bits >= 8) {
      output[index++] = value >>> bits - 8 & 255;
      bits -= 8;
    }
  }
  return arrayBufferToString(output.buffer);
}
function getProjectIdFromApiKey(key) {
  if (!key) {
    return void 0;
  }
  try {
    const [prefix, rest] = key.split("_");
    if (prefix === "tgpak") {
      const [projectId] = base32Decode(rest).split("_");
      return Number(projectId);
    }
  } catch (e) {
    console.warn("Tolgee: Api key can't be parsed");
  }
  return void 0;
}
function getApiKeyType(key) {
  if (!key) {
    return void 0;
  }
  const [prefix] = key.split("_");
  if (prefix === "tgpak") {
    return "tgpak";
  } else if (prefix === "tgpat") {
    return "tgpat";
  }
  return "legacy";
}
function composeUrl(base, path) {
  base = base.replace(/\/+$/, "");
  path = path.replace(/^\/+/, "");
  return `${base}/${path}`;
}
function joinUrls(...parts) {
  let result = parts[0];
  parts.slice(1).forEach((part) => {
    result = composeUrl(result, part);
  });
  return result;
}
function createUrl(...parts) {
  const base = typeof window === "undefined" ? void 0 : window.location.origin;
  return new URL(joinUrls(...parts), base);
}
function createDevBackend() {
  return {
    getRecord({
      apiUrl,
      apiKey,
      language,
      namespace,
      projectId,
      filterTag,
      fetch: fetch2
    }) {
      var _a2;
      const pId = (_a2 = getProjectIdFromApiKey(apiKey)) != null ? _a2 : projectId;
      let url;
      if (pId !== void 0) {
        url = createUrl(apiUrl, `/v2/projects/${pId}/translations/${language}`);
      } else {
        url = createUrl(apiUrl, `/v2/projects/translations/${language}`);
      }
      if (namespace) {
        url.searchParams.append("ns", namespace);
      }
      filterTag == null ? void 0 : filterTag.forEach((tag) => {
        url.searchParams.append("filterTag", tag);
      });
      if (getApiKeyType(apiKey) === "tgpat" && projectId === void 0) {
        throw new Error("You need to specify 'projectId' when using PAT key");
      }
      return fetch2(url.toString(), {
        headers: {
          "X-API-Key": apiKey || "",
          "Content-Type": "application/json"
        },
        // @ts-ignore - tell next.js to not use cache
        next: { revalidate: 0 }
      }).then((r) => {
        if (r.ok) {
          return r.json().then((data) => data[language]);
        } else {
          throw new Error(r.statusText);
        }
      });
    }
  };
}
const DevBackend = () => (tolgee, tools) => {
  tools.setDevBackend(createDevBackend());
  return tolgee;
};
function listen(type, callback) {
  const handler = (e) => {
    var _a2, _b;
    if (type.includes((_a2 = e.data) == null ? void 0 : _a2.type)) {
      callback((_b = e.data) == null ? void 0 : _b.data);
    }
  };
  window.addEventListener("message", handler, false);
  return {
    unsubscribe() {
      window.removeEventListener("message", handler);
    }
  };
}
function sendAndRecieve({
  message,
  recievingMessage,
  data,
  attempts = 1,
  timeout = 300
}) {
  let cancelled = false;
  const makeAttempt = () => new Promise((resolve, reject) => {
    const listener = listen(recievingMessage, handler);
    window.postMessage({ type: message, data }, window.origin);
    const timer = setTimeout(expire, timeout);
    function handler(data2) {
      clearTimeout(timer);
      removeEventListener();
      resolve(data2);
    }
    function removeEventListener() {
      listener.unsubscribe();
    }
    function expire() {
      removeEventListener();
      reject();
    }
  });
  const getData = async () => {
    for (let i = 0; i < attempts; i++) {
      if (cancelled) {
        return new Promise(() => {
        });
      }
      try {
        const result = await makeAttempt();
        return result;
      } catch (e) {
        continue;
      }
    }
    if (!cancelled) {
      throw `Didn't recieve ${recievingMessage.join(" or ")} in time.`;
    }
    return new Promise(() => {
    });
  };
  return {
    cancel() {
      cancelled = true;
    },
    promise: getData()
  };
}
function Handshaker() {
  let cancelLast = void 0;
  async function update(data) {
    cancelLast == null ? void 0 : cancelLast();
    const { cancel, promise } = sendAndRecieve({
      message: "TOLGEE_READY",
      recievingMessage: ["TOLGEE_PLUGIN_READY", "TOLGEE_PLUGIN_UPDATED"],
      data,
      attempts: 4
    });
    cancelLast = cancel;
    return promise;
  }
  return {
    update
  };
}
const IN_CONTEXT_FILE = "tolgee-in-context-tools.umd.min.js";
const IN_CONTEXT_UMD_NAME = "@tolgee/in-context-tools";
const IN_CONTEXT_EXPORT_NAME = "InContextTools";
const CDN_URL = "https://cdn.jsdelivr.net/npm";
function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", (e) => reject(e.error));
    document.head.appendChild(script);
  });
}
let injectPromise = null;
function loadInContextLib(version) {
  if (!injectPromise) {
    injectPromise = injectScript(
      `${CDN_URL}/@tolgee/web@${version}/dist/${IN_CONTEXT_FILE}`
    ).then(() => {
      return window[IN_CONTEXT_UMD_NAME][IN_CONTEXT_EXPORT_NAME];
    });
  }
  return injectPromise;
}
const API_KEY_LOCAL_STORAGE = "__tolgee_apiKey";
const API_URL_LOCAL_STORAGE = "__tolgee_apiUrl";
function getCredentials() {
  const apiKey = sessionStorage.getItem(API_KEY_LOCAL_STORAGE) || void 0;
  const apiUrl = sessionStorage.getItem(API_URL_LOCAL_STORAGE) || void 0;
  if (!apiKey || !apiUrl) {
    return void 0;
  }
  return {
    apiKey,
    apiUrl
  };
}
function clearSessionStorage() {
  sessionStorage.removeItem(API_KEY_LOCAL_STORAGE);
  sessionStorage.removeItem(API_URL_LOCAL_STORAGE);
}
function onDocumentReady(callback) {
  if (document.readyState !== "loading") {
    Promise.resolve().then(() => {
      callback();
    });
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", callback);
  }
}
let BrowserExtensionPlugin = () => (tolgee) => tolgee;
const sessionStorageAvailable = () => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return typeof sessionStorage !== "undefined" && sessionStorage;
  } catch (err) {
    console.error("sessionStorage not available", err);
    return false;
  }
};
if (sessionStorageAvailable()) {
  BrowserExtensionPlugin = () => (tolgee) => {
    const handshaker = Handshaker();
    const getConfig = () => ({
      // prevent extension downloading ui library
      uiPresent: true,
      uiVersion: void 0,
      // tolgee mode
      mode: tolgee.isDev() ? "development" : "production",
      // pass credentials
      config: {
        apiUrl: tolgee.getInitialOptions().apiUrl || "",
        apiKey: tolgee.getInitialOptions().apiKey || ""
      }
    });
    const getTolgeePlugin = async () => {
      const InContextTools = await loadInContextLib(
        "prerelease"
      );
      return (tolgee2) => {
        const credentials2 = getCredentials();
        tolgee2.addPlugin(InContextTools({ credentials: credentials2 }));
        return tolgee2;
      };
    };
    tolgee.on("running", ({ value: isRunning }) => {
      if (isRunning) {
        onDocumentReady(() => {
          handshaker.update(getConfig()).catch(clearSessionStorage);
        });
      }
    });
    const credentials = getCredentials();
    if (credentials) {
      getTolgeePlugin().then((plugin) => {
        tolgee.addPlugin(plugin);
      }).catch((e) => {
        console.error("Tolgee: Failed to load in-context tools");
        console.error(e);
      });
    }
    return tolgee;
  };
}
const CURRENT_LANGUAGE_LOCAL_STORAGE_KEY = "__tolgee_currentLanguage";
function createLanguageStorage() {
  return {
    getLanguage() {
      throwIfSSR("LanguageStorage");
      const storedLanguage = localStorage.getItem(
        CURRENT_LANGUAGE_LOCAL_STORAGE_KEY
      );
      return storedLanguage || void 0;
    },
    setLanguage(language) {
      throwIfSSR("LanguageStorage");
      localStorage.setItem(CURRENT_LANGUAGE_LOCAL_STORAGE_KEY, language);
    }
  };
}
const LanguageStorage = () => (tolgee, tools) => {
  tools.setLanguageStorage(createLanguageStorage());
  return tolgee;
};
function detectLanguage(language, availableLanguages) {
  const exactMatch = availableLanguages.find((l) => l === language);
  if (exactMatch) {
    return exactMatch;
  }
  const getTwoLetters = (fullTag) => fullTag.replace(/^(.+?)(-.*)?$/, "$1");
  const preferredTwoLetter = getTwoLetters(language);
  const twoLetterMatch = availableLanguages.find(
    (l) => getTwoLetters(l) === preferredTwoLetter
  );
  if (twoLetterMatch) {
    return twoLetterMatch;
  }
  return void 0;
}
function createLanguageDetector() {
  return {
    getLanguage({ availableLanguages }) {
      throwIfSSR("LanguageDetector");
      const preferred = window.navigator.language;
      return detectLanguage(preferred, availableLanguages);
    }
  };
}
const LanguageDetector = () => (tolgee, tools) => {
  tools.setLanguageDetector(createLanguageDetector());
  return tolgee;
};
function getHeaderLanguages(headers) {
  const acceptLanguageHeader = headers.get("Accept-Language");
  if (!acceptLanguageHeader) {
    return [];
  }
  const locales = acceptLanguageHeader.split(",").map((locale) => {
    const [localePart] = locale.trim().split(";");
    return localePart;
  });
  return [...new Set(locales.filter((locale) => locale && locale !== "*"))];
}
const detectLanguageFromHeaders = (headers, availableLanguages) => {
  const languages = getHeaderLanguages(headers);
  return languages[0] && detectLanguage(languages[0], availableLanguages);
};
const fetchWithTimeout = (fetch2, url, ms, _b) => {
  var _c = _b, { signal } = _c, options = __objRest(_c, ["signal"]);
  const controller = new AbortController();
  return new Promise((_resolve, _reject) => {
    const promise = fetch2(url, __spreadValues({ signal: controller.signal }, options));
    let done = false;
    function resolve(data) {
      !done && _resolve(data);
      done = true;
    }
    function reject(data) {
      !done && _reject(data);
      done = true;
    }
    function rejectWithTimout() {
      const error = new Error(`TIMEOUT: ${url}`);
      controller.abort(error);
      reject(error);
    }
    if (signal) {
      signal.addEventListener("abort", rejectWithTimout);
    }
    if (ms !== void 0) {
      const timeout = setTimeout(rejectWithTimout, ms);
      promise.finally(() => clearTimeout(timeout));
    }
    promise.catch(reject).then(resolve);
  });
};
function trimSlashes(path) {
  if (path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}
const defaultGetPath = ({ namespace, language, prefix }) => {
  if (namespace) {
    return `${trimSlashes(prefix)}/${namespace}/${language}.json`;
  } else {
    return `${trimSlashes(prefix)}/${language}.json`;
  }
};
function defaultGetData(r) {
  return r.json();
}
const DEFAULT_OPTIONS = {
  prefix: "/i18n",
  getPath: defaultGetPath,
  getData: defaultGetData,
  headers: {
    Accept: "application/json"
  },
  timeout: void 0,
  fallbackOnFail: false
};
function createBackendFetch(options) {
  const _a2 = __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_OPTIONS), options), {
    headers: __spreadValues(__spreadValues({}, DEFAULT_OPTIONS.headers), options == null ? void 0 : options.headers)
  }), {
    prefix,
    getPath,
    getData,
    headers,
    timeout,
    fallbackOnFail
  } = _a2, fetchOptions = __objRest(_a2, [
    "prefix",
    "getPath",
    "getData",
    "headers",
    "timeout",
    "fallbackOnFail"
  ]);
  return {
    async getRecord({ namespace, language, fetch: fetch2 }) {
      const path = getPath({
        namespace,
        language,
        prefix
      });
      try {
        const r = await fetchWithTimeout(fetch2, path, timeout, __spreadValues({
          headers
        }, fetchOptions));
        if (!r.ok) {
          throw new Error(`${r.url} ${r.status}`);
        }
        return await getData(r);
      } catch (e) {
        if (fallbackOnFail) {
          return void 0;
        } else {
          throw e;
        }
      }
    }
  };
}
const BackendFetch = (options) => (tolgee, tools) => {
  tools.addBackend(createBackendFetch(options));
  return tolgee;
};
function Tolgee() {
  return TolgeeCore().use(BrowserExtensionPlugin());
}
const DevTools = () => (tolgee) => tolgee;
export {
  BackendFetch,
  BrowserExtensionPlugin,
  DEVTOOLS_ID,
  DevBackend,
  DevTools,
  FormatSimple,
  LanguageDetector,
  LanguageDetectorError,
  LanguageStorage,
  LanguageStorageError,
  ObserverPlugin,
  PREFERRED_LANGUAGES_LOCAL_STORAGE_KEY,
  RecordFetchError,
  TOLGEE_ATTRIBUTE_NAME,
  TOLGEE_RESTRICT_ATTRIBUTE,
  TOLGEE_WRAPPED_ONLY_DATA_ATTRIBUTE,
  Tolgee,
  TolgeeCore,
  createFetchFunction,
  detectLanguage,
  detectLanguageFromHeaders,
  getFallback,
  getFallbackArray,
  getProjectIdFromApiKey,
  getTranslateProps,
  isSSR
};
//# sourceMappingURL=tolgee-web.production.esm.js.map
