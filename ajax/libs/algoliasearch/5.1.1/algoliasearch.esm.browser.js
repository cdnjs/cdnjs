function createAuth(appId, apiKey, authMode = 'WithinHeaders') {
  const credentials = {
    'x-algolia-api-key': apiKey,
    'x-algolia-application-id': appId
  };
  return {
    headers() {
      return authMode === 'WithinHeaders' ? credentials : {};
    },
    queryParameters() {
      return authMode === 'WithinQueryParameters' ? credentials : {};
    }
  };
}

/**
 * Helper: Returns the promise of a given `func` to iterate on, based on a given `validate` condition.
 *
 * @param createIterator - The createIterator options.
 * @param createIterator.func - The function to run, which returns a promise.
 * @param createIterator.validate - The validator function. It receives the resolved return of `func`.
 * @param createIterator.aggregator - The function that runs right after the `func` method has been executed, allows you to do anything with the response before `validate`.
 * @param createIterator.error - The `validate` condition to throw an error, and its message.
 * @param createIterator.timeout - The function to decide how long to wait between iterations.
 */
function createIterablePromise({
  func,
  validate,
  aggregator,
  error,
  timeout = () => 0
}) {
  const retry = previousResponse => {
    return new Promise((resolve, reject) => {
      func(previousResponse).then(response => {
        if (aggregator) {
          aggregator(response);
        }
        if (validate(response)) {
          return resolve(response);
        }
        if (error && error.validate(response)) {
          return reject(new Error(error.message(response)));
        }
        return setTimeout(() => {
          retry(response).then(resolve).catch(reject);
        }, timeout());
      }).catch(err => {
        reject(err);
      });
    });
  };
  return retry();
}

function createBrowserLocalStorageCache(options) {
  let storage;
  // We've changed the namespace to avoid conflicts with v4, as this version is a huge breaking change
  const namespaceKey = `algolia-client-js-${options.key}`;
  function getStorage() {
    if (storage === undefined) {
      storage = options.localStorage || window.localStorage;
    }
    return storage;
  }
  function getNamespace() {
    return JSON.parse(getStorage().getItem(namespaceKey) || '{}');
  }
  function setNamespace(namespace) {
    getStorage().setItem(namespaceKey, JSON.stringify(namespace));
  }
  function removeOutdatedCacheItems() {
    const timeToLive = options.timeToLive ? options.timeToLive * 1000 : null;
    const namespace = getNamespace();
    const filteredNamespaceWithoutOldFormattedCacheItems = Object.fromEntries(Object.entries(namespace).filter(([, cacheItem]) => {
      return cacheItem.timestamp !== undefined;
    }));
    setNamespace(filteredNamespaceWithoutOldFormattedCacheItems);
    if (!timeToLive) {
      return;
    }
    const filteredNamespaceWithoutExpiredItems = Object.fromEntries(Object.entries(filteredNamespaceWithoutOldFormattedCacheItems).filter(([, cacheItem]) => {
      const currentTimestamp = new Date().getTime();
      const isExpired = cacheItem.timestamp + timeToLive < currentTimestamp;
      return !isExpired;
    }));
    setNamespace(filteredNamespaceWithoutExpiredItems);
  }
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      return Promise.resolve().then(() => {
        removeOutdatedCacheItems();
        return getNamespace()[JSON.stringify(key)];
      }).then(value => {
        return Promise.all([value ? value.value : defaultValue(), value !== undefined]);
      }).then(([value, exists]) => {
        return Promise.all([value, exists || events.miss(value)]);
      }).then(([value]) => value);
    },
    set(key, value) {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();
        namespace[JSON.stringify(key)] = {
          timestamp: new Date().getTime(),
          value
        };
        getStorage().setItem(namespaceKey, JSON.stringify(namespace));
        return value;
      });
    },
    delete(key) {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();
        delete namespace[JSON.stringify(key)];
        getStorage().setItem(namespaceKey, JSON.stringify(namespace));
      });
    },
    clear() {
      return Promise.resolve().then(() => {
        getStorage().removeItem(namespaceKey);
      });
    }
  };
}

function createNullCache() {
  return {
    get(_key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      const value = defaultValue();
      return value.then(result => Promise.all([result, events.miss(result)])).then(([result]) => result);
    },
    set(_key, value) {
      return Promise.resolve(value);
    },
    delete(_key) {
      return Promise.resolve();
    },
    clear() {
      return Promise.resolve();
    }
  };
}

function createFallbackableCache(options) {
  const caches = [...options.caches];
  const current = caches.shift();
  if (current === undefined) {
    return createNullCache();
  }
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      return current.get(key, defaultValue, events).catch(() => {
        return createFallbackableCache({
          caches
        }).get(key, defaultValue, events);
      });
    },
    set(key, value) {
      return current.set(key, value).catch(() => {
        return createFallbackableCache({
          caches
        }).set(key, value);
      });
    },
    delete(key) {
      return current.delete(key).catch(() => {
        return createFallbackableCache({
          caches
        }).delete(key);
      });
    },
    clear() {
      return current.clear().catch(() => {
        return createFallbackableCache({
          caches
        }).clear();
      });
    }
  };
}

function createMemoryCache(options = {
  serializable: true
}) {
  let cache = {};
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      const keyAsString = JSON.stringify(key);
      if (keyAsString in cache) {
        return Promise.resolve(options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]);
      }
      const promise = defaultValue();
      return promise.then(value => events.miss(value)).then(() => promise);
    },
    set(key, value) {
      cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;
      return Promise.resolve(value);
    },
    delete(key) {
      delete cache[JSON.stringify(key)];
      return Promise.resolve();
    },
    clear() {
      cache = {};
      return Promise.resolve();
    }
  };
}

// By default, API Clients at Algolia have expiration delay of 5 mins.
// In the JavaScript client, we have 2 mins.
const EXPIRATION_DELAY = 2 * 60 * 1000;
function createStatefulHost(host, status = 'up') {
  const lastUpdate = Date.now();
  function isUp() {
    return status === 'up' || Date.now() - lastUpdate > EXPIRATION_DELAY;
  }
  function isTimedOut() {
    return status === 'timed out' && Date.now() - lastUpdate <= EXPIRATION_DELAY;
  }
  return {
    ...host,
    status,
    lastUpdate,
    isUp,
    isTimedOut
  };
}

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

class AlgoliaError extends Error {
  constructor(message, name) {
    super(message);
    _defineProperty(this, "name", 'AlgoliaError');
    if (name) {
      this.name = name;
    }
  }
}
class ErrorWithStackTrace extends AlgoliaError {
  constructor(message, stackTrace, name) {
    super(message, name);
    // the array and object should be frozen to reflect the stackTrace at the time of the error
    _defineProperty(this, "stackTrace", void 0);
    this.stackTrace = stackTrace;
  }
}
class RetryError extends ErrorWithStackTrace {
  constructor(stackTrace) {
    super('Unreachable hosts - your application id may be incorrect. If the error persists, please reach out to the Algolia Support team: https://alg.li/support.', stackTrace, 'RetryError');
  }
}
class ApiError extends ErrorWithStackTrace {
  constructor(message, status, stackTrace, name = 'ApiError') {
    super(message, stackTrace, name);
    _defineProperty(this, "status", void 0);
    this.status = status;
  }
}
class DeserializationError extends AlgoliaError {
  constructor(message, response) {
    super(message, 'DeserializationError');
    _defineProperty(this, "response", void 0);
    this.response = response;
  }
}
// DetailedApiError is only used by the ingestion client to return more informative error, other clients will use ApiClient.
class DetailedApiError extends ApiError {
  constructor(message, status, error, stackTrace) {
    super(message, status, stackTrace, 'DetailedApiError');
    _defineProperty(this, "error", void 0);
    this.error = error;
  }
}

function shuffle(array) {
  const shuffledArray = array;
  for (let c = array.length - 1; c > 0; c--) {
    const b = Math.floor(Math.random() * (c + 1));
    const a = array[c];
    shuffledArray[c] = array[b];
    shuffledArray[b] = a;
  }
  return shuffledArray;
}
function serializeUrl(host, path, queryParameters) {
  const queryParametersAsString = serializeQueryParameters(queryParameters);
  let url = `${host.protocol}://${host.url}${host.port ? `:${host.port}` : ''}/${path.charAt(0) === '/' ? path.substring(1) : path}`;
  if (queryParametersAsString.length) {
    url += `?${queryParametersAsString}`;
  }
  return url;
}
function serializeQueryParameters(parameters) {
  return Object.keys(parameters).filter(key => parameters[key] !== undefined).sort().map(key => `${key}=${encodeURIComponent(Object.prototype.toString.call(parameters[key]) === '[object Array]' ? parameters[key].join(',') : parameters[key]).replaceAll('+', '%20')}`).join('&');
}
function serializeData(request, requestOptions) {
  if (request.method === 'GET' || request.data === undefined && requestOptions.data === undefined) {
    return undefined;
  }
  const data = Array.isArray(request.data) ? request.data : {
    ...request.data,
    ...requestOptions.data
  };
  return JSON.stringify(data);
}
function serializeHeaders(baseHeaders, requestHeaders, requestOptionsHeaders) {
  const headers = {
    Accept: 'application/json',
    ...baseHeaders,
    ...requestHeaders,
    ...requestOptionsHeaders
  };
  const serializedHeaders = {};
  Object.keys(headers).forEach(header => {
    const value = headers[header];
    serializedHeaders[header.toLowerCase()] = value;
  });
  return serializedHeaders;
}
function deserializeSuccess(response) {
  try {
    return JSON.parse(response.content);
  } catch (e) {
    throw new DeserializationError(e.message, response);
  }
}
function deserializeFailure({
  content,
  status
}, stackFrame) {
  try {
    const parsed = JSON.parse(content);
    if ('error' in parsed) {
      return new DetailedApiError(parsed.message, status, parsed.error, stackFrame);
    }
    return new ApiError(parsed.message, status, stackFrame);
  } catch (e) {
    // ..
  }
  return new ApiError(content, status, stackFrame);
}

function isNetworkError({
  isTimedOut,
  status
}) {
  return !isTimedOut && ~~status === 0;
}
function isRetryable({
  isTimedOut,
  status
}) {
  return isTimedOut || isNetworkError({
    isTimedOut,
    status
  }) || ~~(status / 100) !== 2 && ~~(status / 100) !== 4;
}
function isSuccess({
  status
}) {
  return ~~(status / 100) === 2;
}

function stackTraceWithoutCredentials(stackTrace) {
  return stackTrace.map(stackFrame => stackFrameWithoutCredentials(stackFrame));
}
function stackFrameWithoutCredentials(stackFrame) {
  const modifiedHeaders = stackFrame.request.headers['x-algolia-api-key'] ? {
    'x-algolia-api-key': '*****'
  } : {};
  return {
    ...stackFrame,
    request: {
      ...stackFrame.request,
      headers: {
        ...stackFrame.request.headers,
        ...modifiedHeaders
      }
    }
  };
}

function createTransporter({
  hosts,
  hostsCache,
  baseHeaders,
  baseQueryParameters,
  algoliaAgent,
  timeouts,
  requester,
  requestsCache,
  responsesCache
}) {
  async function createRetryableOptions(compatibleHosts) {
    const statefulHosts = await Promise.all(compatibleHosts.map(compatibleHost => {
      return hostsCache.get(compatibleHost, () => {
        return Promise.resolve(createStatefulHost(compatibleHost));
      });
    }));
    const hostsUp = statefulHosts.filter(host => host.isUp());
    const hostsTimedOut = statefulHosts.filter(host => host.isTimedOut());
    // Note, we put the hosts that previously timed out on the end of the list.
    const hostsAvailable = [...hostsUp, ...hostsTimedOut];
    const compatibleHostsAvailable = hostsAvailable.length > 0 ? hostsAvailable : compatibleHosts;
    return {
      hosts: compatibleHostsAvailable,
      getTimeout(timeoutsCount, baseTimeout) {
        /**
         * Imagine that you have 4 hosts, if timeouts will increase
         * on the following way: 1 (timed out) > 4 (timed out) > 5 (200).
         *
         * Note that, the very next request, we start from the previous timeout.
         *
         *  5 (timed out) > 6 (timed out) > 7 ...
         *
         * This strategy may need to be reviewed, but is the strategy on the our
         * current v3 version.
         */
        const timeoutMultiplier = hostsTimedOut.length === 0 && timeoutsCount === 0 ? 1 : hostsTimedOut.length + 3 + timeoutsCount;
        return timeoutMultiplier * baseTimeout;
      }
    };
  }
  async function retryableRequest(request, requestOptions, isRead = true) {
    const stackTrace = [];
    /**
     * First we prepare the payload that do not depend from hosts.
     */
    const data = serializeData(request, requestOptions);
    const headers = serializeHeaders(baseHeaders, request.headers, requestOptions.headers);
    // On `GET`, the data is proxied to query parameters.
    const dataQueryParameters = request.method === 'GET' ? {
      ...request.data,
      ...requestOptions.data
    } : {};
    const queryParameters = {
      ...baseQueryParameters,
      ...request.queryParameters,
      ...dataQueryParameters
    };
    if (algoliaAgent.value) {
      queryParameters['x-algolia-agent'] = algoliaAgent.value;
    }
    if (requestOptions && requestOptions.queryParameters) {
      for (const key of Object.keys(requestOptions.queryParameters)) {
        // We want to keep `undefined` and `null` values,
        // but also avoid stringifying `object`s, as they are
        // handled in the `serializeUrl` step right after.
        if (!requestOptions.queryParameters[key] || Object.prototype.toString.call(requestOptions.queryParameters[key]) === '[object Object]') {
          queryParameters[key] = requestOptions.queryParameters[key];
        } else {
          queryParameters[key] = requestOptions.queryParameters[key].toString();
        }
      }
    }
    let timeoutsCount = 0;
    const retry = async (retryableHosts, getTimeout) => {
      /**
       * We iterate on each host, until there is no host left.
       */
      const host = retryableHosts.pop();
      if (host === undefined) {
        throw new RetryError(stackTraceWithoutCredentials(stackTrace));
      }
      let responseTimeout = isRead ? requestOptions.timeouts?.read || timeouts.read : requestOptions.timeouts?.write || timeouts.write;
      const payload = {
        data,
        headers,
        method: request.method,
        url: serializeUrl(host, request.path, queryParameters),
        connectTimeout: getTimeout(timeoutsCount, requestOptions.timeouts?.connect || timeouts.connect),
        responseTimeout: getTimeout(timeoutsCount, responseTimeout)
      };
      /**
       * The stackFrame is pushed to the stackTrace so we
       * can have information about onRetry and onFailure
       * decisions.
       */
      const pushToStackTrace = response => {
        const stackFrame = {
          request: payload,
          response,
          host,
          triesLeft: retryableHosts.length
        };
        stackTrace.push(stackFrame);
        return stackFrame;
      };
      const response = await requester.send(payload);
      if (isRetryable(response)) {
        const stackFrame = pushToStackTrace(response);
        // If response is a timeout, we increase the number of timeouts so we can increase the timeout later.
        if (response.isTimedOut) {
          timeoutsCount++;
        }
        /**
         * Failures are individually sent to the logger, allowing
         * the end user to debug / store stack frames even
         * when a retry error does not happen.
         */
        // eslint-disable-next-line no-console -- this will be fixed by exposing a `logger` to the transporter
        console.log('Retryable failure', stackFrameWithoutCredentials(stackFrame));
        /**
         * We also store the state of the host in failure cases. If the host, is
         * down it will remain down for the next 2 minutes. In a timeout situation,
         * this host will be added end of the list of hosts on the next request.
         */
        await hostsCache.set(host, createStatefulHost(host, response.isTimedOut ? 'timed out' : 'down'));
        return retry(retryableHosts, getTimeout);
      }
      if (isSuccess(response)) {
        return deserializeSuccess(response);
      }
      pushToStackTrace(response);
      throw deserializeFailure(response, stackTrace);
    };
    /**
     * Finally, for each retryable host perform request until we got a non
     * retryable response. Some notes here:
     *
     * 1. The reverse here is applied so we can apply a `pop` later on => more performant.
     * 2. We also get from the retryable options a timeout multiplier that is tailored
     * for the current context.
     */
    const compatibleHosts = hosts.filter(host => host.accept === 'readWrite' || (isRead ? host.accept === 'read' : host.accept === 'write'));
    const options = await createRetryableOptions(compatibleHosts);
    return retry([...options.hosts].reverse(), options.getTimeout);
  }
  function createRequest(request, requestOptions = {}) {
    /**
     * A read request is either a `GET` request, or a request that we make
     * via the `read` transporter (e.g. `search`).
     */
    const isRead = request.useReadTransporter || request.method === 'GET';
    if (!isRead) {
      /**
       * On write requests, no cache mechanisms are applied, and we
       * proxy the request immediately to the requester.
       */
      return retryableRequest(request, requestOptions, isRead);
    }
    const createRetryableRequest = () => {
      /**
       * Then, we prepare a function factory that contains the construction of
       * the retryable request. At this point, we may *not* perform the actual
       * request. But we want to have the function factory ready.
       */
      return retryableRequest(request, requestOptions);
    };
    /**
     * Once we have the function factory ready, we need to determine of the
     * request is "cacheable" - should be cached. Note that, once again,
     * the user can force this option.
     */
    const cacheable = requestOptions.cacheable || request.cacheable;
    /**
     * If is not "cacheable", we immediately trigger the retryable request, no
     * need to check cache implementations.
     */
    if (cacheable !== true) {
      return createRetryableRequest();
    }
    /**
     * If the request is "cacheable", we need to first compute the key to ask
     * the cache implementations if this request is on progress or if the
     * response already exists on the cache.
     */
    const key = {
      request,
      requestOptions,
      transporter: {
        queryParameters: baseQueryParameters,
        headers: baseHeaders
      }
    };
    /**
     * With the computed key, we first ask the responses cache
     * implementation if this request was been resolved before.
     */
    return responsesCache.get(key, () => {
      /**
       * If the request has never resolved before, we actually ask if there
       * is a current request with the same key on progress.
       */
      return requestsCache.get(key, () =>
      /**
       * Finally, if there is no request in progress with the same key,
       * this `createRetryableRequest()` will actually trigger the
       * retryable request.
       */
      requestsCache.set(key, createRetryableRequest()).then(response => Promise.all([requestsCache.delete(key), response]), err => Promise.all([requestsCache.delete(key), Promise.reject(err)])).then(([_, response]) => response));
    }, {
      /**
       * Of course, once we get this response back from the server, we
       * tell response cache to actually store the received response
       * to be used later.
       */
      miss: response => responsesCache.set(key, response)
    });
  }
  return {
    hostsCache,
    requester,
    timeouts,
    algoliaAgent,
    baseHeaders,
    baseQueryParameters,
    hosts,
    request: createRequest,
    requestsCache,
    responsesCache
  };
}

function createAlgoliaAgent(version) {
  const algoliaAgent = {
    value: `Algolia for JavaScript (${version})`,
    add(options) {
      const addedAlgoliaAgent = `; ${options.segment}${options.version !== undefined ? ` (${options.version})` : ''}`;
      if (algoliaAgent.value.indexOf(addedAlgoliaAgent) === -1) {
        algoliaAgent.value = `${algoliaAgent.value}${addedAlgoliaAgent}`;
      }
      return algoliaAgent;
    }
  };
  return algoliaAgent;
}

function getAlgoliaAgent({
  algoliaAgents,
  client,
  version
}) {
  const defaultAlgoliaAgent = createAlgoliaAgent(version).add({
    segment: client,
    version
  });
  algoliaAgents.forEach(algoliaAgent => defaultAlgoliaAgent.add(algoliaAgent));
  return defaultAlgoliaAgent;
}

const DEFAULT_CONNECT_TIMEOUT_BROWSER = 1000;
const DEFAULT_READ_TIMEOUT_BROWSER = 2000;
const DEFAULT_WRITE_TIMEOUT_BROWSER = 30000;

// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.
const apiClientVersion$5 = '5.1.1';
const REGIONS$2 = ['de', 'us'];
function getDefaultHosts$4(region) {
    const url = !region
        ? 'analytics.algolia.com'
        : 'analytics.{region}.algolia.com'.replace('{region}', region);
    return [{ url, accept: 'readWrite', protocol: 'https' }];
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createAbtestingClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, region: regionOption, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts$4(regionOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Abtesting',
            version: apiClientVersion$5,
        }),
        baseHeaders: {
            'content-type': 'text/plain',
            ...auth.headers(),
            ...options.baseHeaders,
        },
        baseQueryParameters: {
            ...auth.queryParameters(),
            ...options.baseQueryParameters,
        },
    });
    return {
        transporter,
        /**
         * The `appId` currently in use.
         */
        appId: appIdOption,
        /**
         * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
         */
        clearCache() {
            return Promise.all([
                transporter.requestsCache.clear(),
                transporter.responsesCache.clear(),
            ]).then(() => undefined);
        },
        /**
         * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
         */
        get _ua() {
            return transporter.algoliaAgent.value;
        },
        /**
         * Adds a `segment` to the `x-algolia-agent` sent with every requests.
         *
         * @param segment - The algolia agent (user-agent) segment to add.
         * @param version - The version of the agent.
         */
        addAlgoliaAgent(segment, version) {
            transporter.algoliaAgent.add({ segment, version });
        },
        /**
         * Creates a new A/B test.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param addABTestsRequest - The addABTestsRequest object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        addABTests(addABTestsRequest, requestOptions) {
            if (!addABTestsRequest) {
                throw new Error('Parameter `addABTestsRequest` is required when calling `addABTests`.');
            }
            if (!addABTestsRequest.name) {
                throw new Error('Parameter `addABTestsRequest.name` is required when calling `addABTests`.');
            }
            if (!addABTestsRequest.variants) {
                throw new Error('Parameter `addABTestsRequest.variants` is required when calling `addABTests`.');
            }
            if (!addABTestsRequest.endAt) {
                throw new Error('Parameter `addABTestsRequest.endAt` is required when calling `addABTests`.');
            }
            const requestPath = '/2/abtests';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: addABTestsRequest,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customDelete - The customDelete object.
         * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customDelete.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customDelete({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customDelete`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customGet - The customGet object.
         * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customGet.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customGet({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customGet`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPost - The customPost object.
         * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPost.parameters - Query parameters to apply to the current query.
         * @param customPost.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPost({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPost`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPut - The customPut object.
         * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPut.parameters - Query parameters to apply to the current query.
         * @param customPut.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPut({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPut`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes an A/B test by its ID.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param deleteABTest - The deleteABTest object.
         * @param deleteABTest.id - Unique A/B test identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteABTest({ id }, requestOptions) {
            if (!id) {
                throw new Error('Parameter `id` is required when calling `deleteABTest`.');
            }
            const requestPath = '/2/abtests/{id}'.replace('{id}', encodeURIComponent(id));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the details for an A/B test by its ID.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getABTest - The getABTest object.
         * @param getABTest.id - Unique A/B test identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getABTest({ id }, requestOptions) {
            if (!id) {
                throw new Error('Parameter `id` is required when calling `getABTest`.');
            }
            const requestPath = '/2/abtests/{id}'.replace('{id}', encodeURIComponent(id));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Lists all A/B tests you configured for this application.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param listABTests - The listABTests object.
         * @param listABTests.offset - Position of the first item to return.
         * @param listABTests.limit - Number of items to return.
         * @param listABTests.indexPrefix - Index name prefix. Only A/B tests for indices starting with this string are included in the response.
         * @param listABTests.indexSuffix - Index name suffix. Only A/B tests for indices ending with this string are included in the response.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        listABTests({ offset, limit, indexPrefix, indexSuffix } = {}, requestOptions = undefined) {
            const requestPath = '/2/abtests';
            const headers = {};
            const queryParameters = {};
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (indexPrefix !== undefined) {
                queryParameters.indexPrefix = indexPrefix.toString();
            }
            if (indexSuffix !== undefined) {
                queryParameters.indexSuffix = indexSuffix.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Schedule an A/B test to be started at a later time.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param scheduleABTestsRequest - The scheduleABTestsRequest object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        scheduleABTest(scheduleABTestsRequest, requestOptions) {
            if (!scheduleABTestsRequest) {
                throw new Error('Parameter `scheduleABTestsRequest` is required when calling `scheduleABTest`.');
            }
            if (!scheduleABTestsRequest.name) {
                throw new Error('Parameter `scheduleABTestsRequest.name` is required when calling `scheduleABTest`.');
            }
            if (!scheduleABTestsRequest.variants) {
                throw new Error('Parameter `scheduleABTestsRequest.variants` is required when calling `scheduleABTest`.');
            }
            if (!scheduleABTestsRequest.scheduledAt) {
                throw new Error('Parameter `scheduleABTestsRequest.scheduledAt` is required when calling `scheduleABTest`.');
            }
            if (!scheduleABTestsRequest.endAt) {
                throw new Error('Parameter `scheduleABTestsRequest.endAt` is required when calling `scheduleABTest`.');
            }
            const requestPath = '/2/abtests/schedule';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: scheduleABTestsRequest,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Stops an A/B test by its ID.  You can\'t restart stopped A/B tests.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param stopABTest - The stopABTest object.
         * @param stopABTest.id - Unique A/B test identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        stopABTest({ id }, requestOptions) {
            if (!id) {
                throw new Error('Parameter `id` is required when calling `stopABTest`.');
            }
            const requestPath = '/2/abtests/{id}/stop'.replace('{id}', encodeURIComponent(id));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
    };
}

// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.
const apiClientVersion$4 = '5.1.1';
const REGIONS$1 = ['de', 'us'];
function getDefaultHosts$3(region) {
    const url = !region
        ? 'analytics.algolia.com'
        : 'analytics.{region}.algolia.com'.replace('{region}', region);
    return [{ url, accept: 'readWrite', protocol: 'https' }];
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createAnalyticsClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, region: regionOption, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts$3(regionOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Analytics',
            version: apiClientVersion$4,
        }),
        baseHeaders: {
            'content-type': 'text/plain',
            ...auth.headers(),
            ...options.baseHeaders,
        },
        baseQueryParameters: {
            ...auth.queryParameters(),
            ...options.baseQueryParameters,
        },
    });
    return {
        transporter,
        /**
         * The `appId` currently in use.
         */
        appId: appIdOption,
        /**
         * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
         */
        clearCache() {
            return Promise.all([
                transporter.requestsCache.clear(),
                transporter.responsesCache.clear(),
            ]).then(() => undefined);
        },
        /**
         * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
         */
        get _ua() {
            return transporter.algoliaAgent.value;
        },
        /**
         * Adds a `segment` to the `x-algolia-agent` sent with every requests.
         *
         * @param segment - The algolia agent (user-agent) segment to add.
         * @param version - The version of the agent.
         */
        addAlgoliaAgent(segment, version) {
            transporter.algoliaAgent.add({ segment, version });
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customDelete - The customDelete object.
         * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customDelete.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customDelete({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customDelete`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customGet - The customGet object.
         * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customGet.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customGet({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customGet`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPost - The customPost object.
         * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPost.parameters - Query parameters to apply to the current query.
         * @param customPost.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPost({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPost`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPut - The customPut object.
         * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPut.parameters - Query parameters to apply to the current query.
         * @param customPut.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPut({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPut`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the add-to-cart rate for all of your searches with at least one add-to-cart event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getAddToCartRate - The getAddToCartRate object.
         * @param getAddToCartRate.index - Index name.
         * @param getAddToCartRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getAddToCartRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getAddToCartRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getAddToCartRate({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getAddToCartRate`.');
            }
            const requestPath = '/2/conversions/addToCartRate';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the average click position of your search results, including a daily breakdown.  The average click position is the average of all clicked search results\' positions. For example, if users only ever click on the first result for any search, the average click position is 1. By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getAverageClickPosition - The getAverageClickPosition object.
         * @param getAverageClickPosition.index - Index name.
         * @param getAverageClickPosition.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getAverageClickPosition.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getAverageClickPosition.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getAverageClickPosition({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getAverageClickPosition`.');
            }
            const requestPath = '/2/clicks/averageClickPosition';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the positions in the search results and their associated number of clicks.  This lets you check how many clicks the first, second, or tenth search results receive.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getClickPositions - The getClickPositions object.
         * @param getClickPositions.index - Index name.
         * @param getClickPositions.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getClickPositions.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getClickPositions.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getClickPositions({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getClickPositions`.');
            }
            const requestPath = '/2/clicks/positions';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the click-through rate for all of your searches with at least one click event, including a daily breakdown  By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getClickThroughRate - The getClickThroughRate object.
         * @param getClickThroughRate.index - Index name.
         * @param getClickThroughRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getClickThroughRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getClickThroughRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getClickThroughRate({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getClickThroughRate`.');
            }
            const requestPath = '/2/clicks/clickThroughRate';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the conversion rate for all of your searches with at least one conversion event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getConversionRate - The getConversionRate object.
         * @param getConversionRate.index - Index name.
         * @param getConversionRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getConversionRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getConversionRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getConversionRate({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getConversionRate`.');
            }
            const requestPath = '/2/conversions/conversionRate';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the fraction of searches that didn\'t lead to any click within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getNoClickRate - The getNoClickRate object.
         * @param getNoClickRate.index - Index name.
         * @param getNoClickRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getNoClickRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getNoClickRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getNoClickRate({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getNoClickRate`.');
            }
            const requestPath = '/2/searches/noClickRate';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the fraction of searches that didn\'t return any results within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getNoResultsRate - The getNoResultsRate object.
         * @param getNoResultsRate.index - Index name.
         * @param getNoResultsRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getNoResultsRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getNoResultsRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getNoResultsRate({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getNoResultsRate`.');
            }
            const requestPath = '/2/searches/noResultRate';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the purchase rate for all of your searches with at least one purchase event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getPurchaseRate - The getPurchaseRate object.
         * @param getPurchaseRate.index - Index name.
         * @param getPurchaseRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getPurchaseRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getPurchaseRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getPurchaseRate({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getPurchaseRate`.');
            }
            const requestPath = '/2/conversions/purchaseRate';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves revenue-related metrics, such as the total revenue or the average order value.  To retrieve revenue-related metrics, sent purchase events. By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getRevenue - The getRevenue object.
         * @param getRevenue.index - Index name.
         * @param getRevenue.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getRevenue.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getRevenue.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getRevenue({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getRevenue`.');
            }
            const requestPath = '/2/conversions/revenue';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the number of searches within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getSearchesCount - The getSearchesCount object.
         * @param getSearchesCount.index - Index name.
         * @param getSearchesCount.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getSearchesCount.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getSearchesCount.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getSearchesCount({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getSearchesCount`.');
            }
            const requestPath = '/2/searches/count';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the most popular searches that didn\'t lead to any clicks, from the 1,000 most frequent searches.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getSearchesNoClicks - The getSearchesNoClicks object.
         * @param getSearchesNoClicks.index - Index name.
         * @param getSearchesNoClicks.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getSearchesNoClicks.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getSearchesNoClicks.limit - Number of items to return.
         * @param getSearchesNoClicks.offset - Position of the first item to return.
         * @param getSearchesNoClicks.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getSearchesNoClicks({ index, startDate, endDate, limit, offset, tags, }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getSearchesNoClicks`.');
            }
            const requestPath = '/2/searches/noClicks';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the most popular searches that didn\'t return any results.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getSearchesNoResults - The getSearchesNoResults object.
         * @param getSearchesNoResults.index - Index name.
         * @param getSearchesNoResults.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getSearchesNoResults.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getSearchesNoResults.limit - Number of items to return.
         * @param getSearchesNoResults.offset - Position of the first item to return.
         * @param getSearchesNoResults.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getSearchesNoResults({ index, startDate, endDate, limit, offset, tags, }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getSearchesNoResults`.');
            }
            const requestPath = '/2/searches/noResults';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the time when the Analytics data for the specified index was last updated.  The Analytics data is updated every 5 minutes.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getStatus - The getStatus object.
         * @param getStatus.index - Index name.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getStatus({ index }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getStatus`.');
            }
            const requestPath = '/2/status';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the countries with the most searches to your index.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getTopCountries - The getTopCountries object.
         * @param getTopCountries.index - Index name.
         * @param getTopCountries.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopCountries.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopCountries.limit - Number of items to return.
         * @param getTopCountries.offset - Position of the first item to return.
         * @param getTopCountries.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopCountries({ index, startDate, endDate, limit, offset, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getTopCountries`.');
            }
            const requestPath = '/2/countries';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the most frequently used filter attributes.  These are attributes of your records that you included in the `attributesForFaceting` setting.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getTopFilterAttributes - The getTopFilterAttributes object.
         * @param getTopFilterAttributes.index - Index name.
         * @param getTopFilterAttributes.search - Search query.
         * @param getTopFilterAttributes.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopFilterAttributes.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopFilterAttributes.limit - Number of items to return.
         * @param getTopFilterAttributes.offset - Position of the first item to return.
         * @param getTopFilterAttributes.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopFilterAttributes({ index, search, startDate, endDate, limit, offset, tags, }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getTopFilterAttributes`.');
            }
            const requestPath = '/2/filters';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (search !== undefined) {
                queryParameters.search = search.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the most frequent filter (facet) values for a filter attribute.  These are attributes of your records that you included in the `attributesForFaceting` setting.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getTopFilterForAttribute - The getTopFilterForAttribute object.
         * @param getTopFilterForAttribute.attribute - Attribute name.
         * @param getTopFilterForAttribute.index - Index name.
         * @param getTopFilterForAttribute.search - Search query.
         * @param getTopFilterForAttribute.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopFilterForAttribute.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopFilterForAttribute.limit - Number of items to return.
         * @param getTopFilterForAttribute.offset - Position of the first item to return.
         * @param getTopFilterForAttribute.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopFilterForAttribute({ attribute, index, search, startDate, endDate, limit, offset, tags, }, requestOptions) {
            if (!attribute) {
                throw new Error('Parameter `attribute` is required when calling `getTopFilterForAttribute`.');
            }
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getTopFilterForAttribute`.');
            }
            const requestPath = '/2/filters/{attribute}'.replace('{attribute}', encodeURIComponent(attribute));
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (search !== undefined) {
                queryParameters.search = search.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the most frequently used filters for a search that didn\'t return any results.  To get the most frequent searches without results, use the [Retrieve searches without results](#tag/search/operation/getSearchesNoResults) operation.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getTopFiltersNoResults - The getTopFiltersNoResults object.
         * @param getTopFiltersNoResults.index - Index name.
         * @param getTopFiltersNoResults.search - Search query.
         * @param getTopFiltersNoResults.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopFiltersNoResults.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopFiltersNoResults.limit - Number of items to return.
         * @param getTopFiltersNoResults.offset - Position of the first item to return.
         * @param getTopFiltersNoResults.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopFiltersNoResults({ index, search, startDate, endDate, limit, offset, tags, }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getTopFiltersNoResults`.');
            }
            const requestPath = '/2/filters/noResults';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (search !== undefined) {
                queryParameters.search = search.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the object IDs of the most frequent search results.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getTopHits - The getTopHits object.
         * @param getTopHits.index - Index name.
         * @param getTopHits.search - Search query.
         * @param getTopHits.clickAnalytics - Whether to include metrics related to click and conversion events in the response.
         * @param getTopHits.revenueAnalytics - Whether to include revenue-related metrics in the response.  If true, metrics related to click and conversion events are also included in the response.
         * @param getTopHits.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopHits.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopHits.limit - Number of items to return.
         * @param getTopHits.offset - Position of the first item to return.
         * @param getTopHits.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopHits({ index, search, clickAnalytics, revenueAnalytics, startDate, endDate, limit, offset, tags, }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getTopHits`.');
            }
            const requestPath = '/2/hits';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (search !== undefined) {
                queryParameters.search = search.toString();
            }
            if (clickAnalytics !== undefined) {
                queryParameters.clickAnalytics = clickAnalytics.toString();
            }
            if (revenueAnalytics !== undefined) {
                queryParameters.revenueAnalytics = revenueAnalytics.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Returns the most popular search terms.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getTopSearches - The getTopSearches object.
         * @param getTopSearches.index - Index name.
         * @param getTopSearches.clickAnalytics - Whether to include metrics related to click and conversion events in the response.
         * @param getTopSearches.revenueAnalytics - Whether to include revenue-related metrics in the response.  If true, metrics related to click and conversion events are also included in the response.
         * @param getTopSearches.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopSearches.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getTopSearches.orderBy - Attribute by which to order the response items.  If the `clickAnalytics` parameter is false, only `searchCount` is available.
         * @param getTopSearches.direction - Sorting direction of the results: ascending or descending.
         * @param getTopSearches.limit - Number of items to return.
         * @param getTopSearches.offset - Position of the first item to return.
         * @param getTopSearches.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopSearches({ index, clickAnalytics, revenueAnalytics, startDate, endDate, orderBy, direction, limit, offset, tags, }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getTopSearches`.');
            }
            const requestPath = '/2/searches';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (clickAnalytics !== undefined) {
                queryParameters.clickAnalytics = clickAnalytics.toString();
            }
            if (revenueAnalytics !== undefined) {
                queryParameters.revenueAnalytics = revenueAnalytics.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (orderBy !== undefined) {
                queryParameters.orderBy = orderBy.toString();
            }
            if (direction !== undefined) {
                queryParameters.direction = direction.toString();
            }
            if (limit !== undefined) {
                queryParameters.limit = limit.toString();
            }
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the number of unique users within a time range, including a daily breakdown.  Since this endpoint returns the number of unique users, the sum of the daily values might be different from the total number.  By default, Algolia distinguishes search users by their IP address, _unless_ you include a pseudonymous user identifier in your search requests with the `userToken` API parameter or `x-algolia-usertoken` request header. By default, the analyzed period includes the last eight days including the current day.
         *
         * Required API Key ACLs:
         * - analytics.
         *
         * @param getUsersCount - The getUsersCount object.
         * @param getUsersCount.index - Index name.
         * @param getUsersCount.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getUsersCount.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
         * @param getUsersCount.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getUsersCount({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getUsersCount`.');
            }
            const requestPath = '/2/users/count';
            const headers = {};
            const queryParameters = {};
            if (index !== undefined) {
                queryParameters.index = index.toString();
            }
            if (startDate !== undefined) {
                queryParameters.startDate = startDate.toString();
            }
            if (endDate !== undefined) {
                queryParameters.endDate = endDate.toString();
            }
            if (tags !== undefined) {
                queryParameters.tags = tags.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
    };
}

// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.
const apiClientVersion$3 = '5.1.1';
const REGIONS = ['eu', 'us'];
function getDefaultHosts$2(region) {
    const url = 'personalization.{region}.algolia.com'.replace('{region}', region);
    return [{ url, accept: 'readWrite', protocol: 'https' }];
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createPersonalizationClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, region: regionOption, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts$2(regionOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Personalization',
            version: apiClientVersion$3,
        }),
        baseHeaders: {
            'content-type': 'text/plain',
            ...auth.headers(),
            ...options.baseHeaders,
        },
        baseQueryParameters: {
            ...auth.queryParameters(),
            ...options.baseQueryParameters,
        },
    });
    return {
        transporter,
        /**
         * The `appId` currently in use.
         */
        appId: appIdOption,
        /**
         * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
         */
        clearCache() {
            return Promise.all([
                transporter.requestsCache.clear(),
                transporter.responsesCache.clear(),
            ]).then(() => undefined);
        },
        /**
         * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
         */
        get _ua() {
            return transporter.algoliaAgent.value;
        },
        /**
         * Adds a `segment` to the `x-algolia-agent` sent with every requests.
         *
         * @param segment - The algolia agent (user-agent) segment to add.
         * @param version - The version of the agent.
         */
        addAlgoliaAgent(segment, version) {
            transporter.algoliaAgent.add({ segment, version });
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customDelete - The customDelete object.
         * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customDelete.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customDelete({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customDelete`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customGet - The customGet object.
         * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customGet.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customGet({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customGet`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPost - The customPost object.
         * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPost.parameters - Query parameters to apply to the current query.
         * @param customPost.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPost({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPost`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPut - The customPut object.
         * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPut.parameters - Query parameters to apply to the current query.
         * @param customPut.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPut({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPut`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes a user profile.  The response includes a date and time when the user profile can safely be considered deleted.
         *
         * Required API Key ACLs:
         * - recommendation.
         *
         * @param deleteUserProfile - The deleteUserProfile object.
         * @param deleteUserProfile.userToken - Unique identifier representing a user for which to fetch the personalization profile.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteUserProfile({ userToken }, requestOptions) {
            if (!userToken) {
                throw new Error('Parameter `userToken` is required when calling `deleteUserProfile`.');
            }
            const requestPath = '/1/profiles/{userToken}'.replace('{userToken}', encodeURIComponent(userToken));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the current personalization strategy.
         *
         * Required API Key ACLs:
         * - recommendation.
         *
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getPersonalizationStrategy(requestOptions) {
            const requestPath = '/1/strategies/personalization';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves a user profile and their affinities for different facets.
         *
         * Required API Key ACLs:
         * - recommendation.
         *
         * @param getUserTokenProfile - The getUserTokenProfile object.
         * @param getUserTokenProfile.userToken - Unique identifier representing a user for which to fetch the personalization profile.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getUserTokenProfile({ userToken }, requestOptions) {
            if (!userToken) {
                throw new Error('Parameter `userToken` is required when calling `getUserTokenProfile`.');
            }
            const requestPath = '/1/profiles/personalization/{userToken}'.replace('{userToken}', encodeURIComponent(userToken));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Creates a new personalization strategy.
         *
         * Required API Key ACLs:
         * - recommendation.
         *
         * @param personalizationStrategyParams - The personalizationStrategyParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        setPersonalizationStrategy(personalizationStrategyParams, requestOptions) {
            if (!personalizationStrategyParams) {
                throw new Error('Parameter `personalizationStrategyParams` is required when calling `setPersonalizationStrategy`.');
            }
            if (!personalizationStrategyParams.eventScoring) {
                throw new Error('Parameter `personalizationStrategyParams.eventScoring` is required when calling `setPersonalizationStrategy`.');
            }
            if (!personalizationStrategyParams.facetScoring) {
                throw new Error('Parameter `personalizationStrategyParams.facetScoring` is required when calling `setPersonalizationStrategy`.');
            }
            if (!personalizationStrategyParams.personalizationImpact) {
                throw new Error('Parameter `personalizationStrategyParams.personalizationImpact` is required when calling `setPersonalizationStrategy`.');
            }
            const requestPath = '/1/strategies/personalization';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: personalizationStrategyParams,
            };
            return transporter.request(request, requestOptions);
        },
    };
}

// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.
const apiClientVersion$2 = '5.1.1';
function getDefaultHosts$1(appId) {
    return [
        {
            url: `${appId}-dsn.algolia.net`,
            accept: 'read',
            protocol: 'https',
        },
        {
            url: `${appId}.algolia.net`,
            accept: 'write',
            protocol: 'https',
        },
    ].concat(shuffle([
        {
            url: `${appId}-1.algolianet.com`,
            accept: 'readWrite',
            protocol: 'https',
        },
        {
            url: `${appId}-2.algolianet.com`,
            accept: 'readWrite',
            protocol: 'https',
        },
        {
            url: `${appId}-3.algolianet.com`,
            accept: 'readWrite',
            protocol: 'https',
        },
    ]));
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createSearchClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts$1(appIdOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Search',
            version: apiClientVersion$2,
        }),
        baseHeaders: {
            'content-type': 'text/plain',
            ...auth.headers(),
            ...options.baseHeaders,
        },
        baseQueryParameters: {
            ...auth.queryParameters(),
            ...options.baseQueryParameters,
        },
    });
    return {
        transporter,
        /**
         * The `appId` currently in use.
         */
        appId: appIdOption,
        /**
         * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
         */
        clearCache() {
            return Promise.all([
                transporter.requestsCache.clear(),
                transporter.responsesCache.clear(),
            ]).then(() => undefined);
        },
        /**
         * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
         */
        get _ua() {
            return transporter.algoliaAgent.value;
        },
        /**
         * Adds a `segment` to the `x-algolia-agent` sent with every requests.
         *
         * @param segment - The algolia agent (user-agent) segment to add.
         * @param version - The version of the agent.
         */
        addAlgoliaAgent(segment, version) {
            transporter.algoliaAgent.add({ segment, version });
        },
        /**
         * Helper: Wait for a task to be published (completed) for a given `indexName` and `taskID`.
         *
         * @summary Helper method that waits for a task to be published (completed).
         * @param waitForTaskOptions - The `waitForTaskOptions` object.
         * @param waitForTaskOptions.indexName - The `indexName` where the operation was performed.
         * @param waitForTaskOptions.taskID - The `taskID` returned in the method response.
         * @param waitForTaskOptions.maxRetries - The maximum number of retries. 50 by default.
         * @param waitForTaskOptions.timeout - The function to decide how long to wait between retries.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
         */
        waitForTask({ indexName, taskID, maxRetries = 50, timeout = (retryCount) => Math.min(retryCount * 200, 5000), }, requestOptions) {
            let retryCount = 0;
            return createIterablePromise({
                func: () => this.getTask({ indexName, taskID }, requestOptions),
                validate: (response) => response.status === 'published',
                aggregator: () => (retryCount += 1),
                error: {
                    validate: () => retryCount >= maxRetries,
                    message: () => `The maximum number of retries exceeded. (${retryCount}/${maxRetries})`,
                },
                timeout: () => timeout(retryCount),
            });
        },
        /**
         * Helper: Wait for an application-level task to complete for a given `taskID`.
         *
         * @summary Helper method that waits for a task to be published (completed).
         * @param waitForAppTaskOptions - The `waitForTaskOptions` object.
         * @param waitForAppTaskOptions.taskID - The `taskID` returned in the method response.
         * @param waitForAppTaskOptions.maxRetries - The maximum number of retries. 50 by default.
         * @param waitForAppTaskOptions.timeout - The function to decide how long to wait between retries.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
         */
        waitForAppTask({ taskID, maxRetries = 50, timeout = (retryCount) => Math.min(retryCount * 200, 5000), }, requestOptions) {
            let retryCount = 0;
            return createIterablePromise({
                func: () => this.getAppTask({ taskID }, requestOptions),
                validate: (response) => response.status === 'published',
                aggregator: () => (retryCount += 1),
                error: {
                    validate: () => retryCount >= maxRetries,
                    message: () => `The maximum number of retries exceeded. (${retryCount}/${maxRetries})`,
                },
                timeout: () => timeout(retryCount),
            });
        },
        /**
         * Helper: Wait for an API key to be added, updated or deleted based on a given `operation`.
         *
         * @summary Helper method that waits for an API key task to be processed.
         * @param waitForApiKeyOptions - The `waitForApiKeyOptions` object.
         * @param waitForApiKeyOptions.operation - The `operation` that was done on a `key`.
         * @param waitForApiKeyOptions.key - The `key` that has been added, deleted or updated.
         * @param waitForApiKeyOptions.apiKey - Necessary to know if an `update` operation has been processed, compare fields of the response with it.
         * @param waitForApiKeyOptions.maxRetries - The maximum number of retries. 50 by default.
         * @param waitForApiKeyOptions.timeout - The function to decide how long to wait between retries.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getApikey` method and merged with the transporter requestOptions.
         */
        waitForApiKey({ operation, key, apiKey, maxRetries = 50, timeout = (retryCount) => Math.min(retryCount * 200, 5000), }, requestOptions) {
            let retryCount = 0;
            const baseIteratorOptions = {
                aggregator: () => (retryCount += 1),
                error: {
                    validate: () => retryCount >= maxRetries,
                    message: () => `The maximum number of retries exceeded. (${retryCount}/${maxRetries})`,
                },
                timeout: () => timeout(retryCount),
            };
            if (operation === 'update') {
                if (!apiKey) {
                    throw new Error('`apiKey` is required when waiting for an `update` operation.');
                }
                return createIterablePromise({
                    ...baseIteratorOptions,
                    func: () => this.getApiKey({ key }, requestOptions),
                    validate: (response) => {
                        for (const field of Object.keys(apiKey)) {
                            const value = apiKey[field];
                            const resValue = response[field];
                            if (Array.isArray(value) && Array.isArray(resValue)) {
                                if (value.length !== resValue.length ||
                                    value.some((v, index) => v !== resValue[index])) {
                                    return false;
                                }
                            }
                            else if (value !== resValue) {
                                return false;
                            }
                        }
                        return true;
                    },
                });
            }
            return createIterablePromise({
                ...baseIteratorOptions,
                func: () => this.getApiKey({ key }, requestOptions).catch((error) => {
                    if (error.status === 404) {
                        return undefined;
                    }
                    throw error;
                }),
                validate: (response) => operation === 'add' ? response !== undefined : response === undefined,
            });
        },
        /**
         * Helper: Iterate on the `browse` method of the client to allow aggregating objects of an index.
         *
         * @summary Helper method that iterates on the `browse` method.
         * @param browseObjects - The `browseObjects` object.
         * @param browseObjects.indexName - The index in which to perform the request.
         * @param browseObjects.browseParams - The `browse` parameters.
         * @param browseObjects.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is no `cursor` in the response.
         * @param browseObjects.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `browse` method and merged with the transporter requestOptions.
         */
        browseObjects({ indexName, browseParams, ...browseObjectsOptions }, requestOptions) {
            return createIterablePromise({
                func: (previousResponse) => {
                    return this.browse({
                        indexName,
                        browseParams: {
                            cursor: previousResponse ? previousResponse.cursor : undefined,
                            ...browseParams,
                        },
                    }, requestOptions);
                },
                validate: (response) => response.cursor === undefined,
                ...browseObjectsOptions,
            });
        },
        /**
         * Helper: Iterate on the `searchRules` method of the client to allow aggregating rules of an index.
         *
         * @summary Helper method that iterates on the `searchRules` method.
         * @param browseRules - The `browseRules` object.
         * @param browseRules.indexName - The index in which to perform the request.
         * @param browseRules.searchRulesParams - The `searchRules` method parameters.
         * @param browseRules.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
         * @param browseRules.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchRules` method and merged with the transporter requestOptions.
         */
        browseRules({ indexName, searchRulesParams, ...browseRulesOptions }, requestOptions) {
            const params = {
                hitsPerPage: 1000,
                ...searchRulesParams,
            };
            return createIterablePromise({
                func: (previousResponse) => {
                    return this.searchRules({
                        indexName,
                        searchRulesParams: {
                            ...params,
                            page: previousResponse
                                ? previousResponse.page + 1
                                : params.page || 0,
                        },
                    }, requestOptions);
                },
                validate: (response) => response.nbHits < params.hitsPerPage,
                ...browseRulesOptions,
            });
        },
        /**
         * Helper: Iterate on the `searchSynonyms` method of the client to allow aggregating rules of an index.
         *
         * @summary Helper method that iterates on the `searchSynonyms` method.
         * @param browseSynonyms - The `browseSynonyms` object.
         * @param browseSynonyms.indexName - The index in which to perform the request.
         * @param browseSynonyms.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
         * @param browseSynonyms.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
         * @param browseSynonyms.searchSynonymsParams - The `searchSynonyms` method parameters.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchSynonyms` method and merged with the transporter requestOptions.
         */
        browseSynonyms({ indexName, searchSynonymsParams, ...browseSynonymsOptions }, requestOptions) {
            const params = {
                page: 0,
                ...searchSynonymsParams,
                hitsPerPage: 1000,
            };
            return createIterablePromise({
                func: (_) => {
                    const resp = this.searchSynonyms({
                        indexName,
                        searchSynonymsParams: {
                            ...params,
                            page: params.page,
                        },
                    }, requestOptions);
                    params.page += 1;
                    return resp;
                },
                validate: (response) => response.nbHits < params.hitsPerPage,
                ...browseSynonymsOptions,
            });
        },
        /**
         * Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
         *
         * @summary Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
         * @param chunkedBatch - The `chunkedBatch` object.
         * @param chunkedBatch.indexName - The `indexName` to replace `objects` in.
         * @param chunkedBatch.objects - The array of `objects` to store in the given Algolia `indexName`.
         * @param chunkedBatch.action - The `batch` `action` to perform on the given array of `objects`, defaults to `addObject`.
         * @param chunkedBatch.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
         * @param chunkedBatch.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
         */
        async chunkedBatch({ indexName, objects, action = 'addObject', waitForTasks, batchSize = 1000, }, requestOptions) {
            let requests = [];
            const responses = [];
            const objectEntries = objects.entries();
            for (const [i, obj] of objectEntries) {
                requests.push({ action, body: obj });
                if (requests.length === batchSize || i === objects.length - 1) {
                    responses.push(await this.batch({ indexName, batchWriteParams: { requests } }, requestOptions));
                    requests = [];
                }
            }
            if (waitForTasks) {
                for (const resp of responses) {
                    await this.waitForTask({ indexName, taskID: resp.taskID });
                }
            }
            return responses;
        },
        /**
         * Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
         *
         * @summary Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
         * @param saveObjects - The `saveObjects` object.
         * @param saveObjects.indexName - The `indexName` to save `objects` in.
         * @param saveObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
         */
        async saveObjects({ indexName, objects }, requestOptions) {
            return await this.chunkedBatch({ indexName, objects, action: 'addObject' }, requestOptions);
        },
        /**
         * Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
         *
         * @summary Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
         * @param deleteObjects - The `deleteObjects` object.
         * @param deleteObjects.indexName - The `indexName` to delete `objectIDs` from.
         * @param deleteObjects.objectIDs - The objectIDs to delete.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
         */
        async deleteObjects({ indexName, objectIDs }, requestOptions) {
            return await this.chunkedBatch({
                indexName,
                objects: objectIDs.map((objectID) => ({ objectID })),
                action: 'deleteObject',
            }, requestOptions);
        },
        /**
         * Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
         *
         * @summary Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
         * @param partialUpdateObjects - The `partialUpdateObjects` object.
         * @param partialUpdateObjects.indexName - The `indexName` to update `objects` in.
         * @param partialUpdateObjects.objects - The array of `objects` to update in the given Algolia `indexName`.
         * @param partialUpdateObjects.createIfNotExists - To be provided if non-existing objects are passed, otherwise, the call will fail..
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
         */
        async partialUpdateObjects({ indexName, objects, createIfNotExists }, requestOptions) {
            return await this.chunkedBatch({
                indexName,
                objects,
                action: createIfNotExists
                    ? 'partialUpdateObject'
                    : 'partialUpdateObjectNoCreate',
            }, requestOptions);
        },
        /**
         * Helper: Replaces all objects (records) in the given `index_name` with the given `objects`. A temporary index is created during this process in order to backup your data.
         * See https://api-clients-automation.netlify.app/docs/add-new-api-client#5-helpers for implementation details.
         *
         * @summary Helper: Replaces all objects (records) in the given `index_name` with the given `objects`. A temporary index is created during this process in order to backup your data.
         * @param replaceAllObjects - The `replaceAllObjects` object.
         * @param replaceAllObjects.indexName - The `indexName` to replace `objects` in.
         * @param replaceAllObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
         * @param replaceAllObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `objects.length / batchSize`. Defaults to 1000.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch`, `operationIndex` and `getTask` method and merged with the transporter requestOptions.
         */
        async replaceAllObjects({ indexName, objects, batchSize }, requestOptions) {
            const randomSuffix = Math.floor(Math.random() * 1000000) + 100000;
            const tmpIndexName = `${indexName}_tmp_${randomSuffix}`;
            let copyOperationResponse = await this.operationIndex({
                indexName,
                operationIndexParams: {
                    operation: 'copy',
                    destination: tmpIndexName,
                    scope: ['settings', 'rules', 'synonyms'],
                },
            }, requestOptions);
            const batchResponses = await this.chunkedBatch({ indexName: tmpIndexName, objects, waitForTasks: true, batchSize }, requestOptions);
            await this.waitForTask({
                indexName: tmpIndexName,
                taskID: copyOperationResponse.taskID,
            });
            copyOperationResponse = await this.operationIndex({
                indexName,
                operationIndexParams: {
                    operation: 'copy',
                    destination: tmpIndexName,
                    scope: ['settings', 'rules', 'synonyms'],
                },
            }, requestOptions);
            await this.waitForTask({
                indexName: tmpIndexName,
                taskID: copyOperationResponse.taskID,
            });
            const moveOperationResponse = await this.operationIndex({
                indexName: tmpIndexName,
                operationIndexParams: { operation: 'move', destination: indexName },
            }, requestOptions);
            await this.waitForTask({
                indexName: tmpIndexName,
                taskID: moveOperationResponse.taskID,
            });
            return { copyOperationResponse, batchResponses, moveOperationResponse };
        },
        /**
         * Helper: calls the `search` method but with certainty that we will only request Algolia records (hits) and not facets.
         * Disclaimer: We don't assert that the parameters you pass to this method only contains `hits` requests to prevent impacting search performances, this helper is purely for typing purposes.
         *
         * @summary Search multiple indices for `hits`.
         * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchForHits(searchMethodParams, requestOptions) {
            return this.search(searchMethodParams, requestOptions);
        },
        /**
         * Helper: calls the `search` method but with certainty that we will only request Algolia facets and not records (hits).
         * Disclaimer: We don't assert that the parameters you pass to this method only contains `facets` requests to prevent impacting search performances, this helper is purely for typing purposes.
         *
         * @summary Search multiple indices for `facets`.
         * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchForFacets(searchMethodParams, requestOptions) {
            return this.search(searchMethodParams, requestOptions);
        },
        /**
         * Creates a new API key with specific permissions and restrictions.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param apiKey - The apiKey object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        addApiKey(apiKey, requestOptions) {
            if (!apiKey) {
                throw new Error('Parameter `apiKey` is required when calling `addApiKey`.');
            }
            if (!apiKey.acl) {
                throw new Error('Parameter `apiKey.acl` is required when calling `addApiKey`.');
            }
            const requestPath = '/1/keys';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: apiKey,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * If a record with the specified object ID exists, the existing record is replaced. Otherwise, a new record is added to the index.  To update _some_ attributes of an existing record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject) instead. To add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).
         *
         * Required API Key ACLs:
         * - addObject.
         *
         * @param addOrUpdateObject - The addOrUpdateObject object.
         * @param addOrUpdateObject.indexName - Name of the index on which to perform the operation.
         * @param addOrUpdateObject.objectID - Unique record identifier.
         * @param addOrUpdateObject.body - The record, a schemaless object with attributes that are useful in the context of search and discovery.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        addOrUpdateObject({ indexName, objectID, body }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `addOrUpdateObject`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `addOrUpdateObject`.');
            }
            if (!body) {
                throw new Error('Parameter `body` is required when calling `addOrUpdateObject`.');
            }
            const requestPath = '/1/indexes/{indexName}/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: body,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Adds a source to the list of allowed sources.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param source - Source to add.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        appendSource(source, requestOptions) {
            if (!source) {
                throw new Error('Parameter `source` is required when calling `appendSource`.');
            }
            if (!source.source) {
                throw new Error('Parameter `source.source` is required when calling `appendSource`.');
            }
            const requestPath = '/1/security/sources/append';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: source,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Assigns or moves a user ID to a cluster.  The time it takes to move a user is proportional to the amount of data linked to the user ID.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param assignUserId - The assignUserId object.
         * @param assignUserId.xAlgoliaUserID - Unique identifier of the user who makes the search request.
         * @param assignUserId.assignUserIdParams - The assignUserIdParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        assignUserId({ xAlgoliaUserID, assignUserIdParams }, requestOptions) {
            if (!xAlgoliaUserID) {
                throw new Error('Parameter `xAlgoliaUserID` is required when calling `assignUserId`.');
            }
            if (!assignUserIdParams) {
                throw new Error('Parameter `assignUserIdParams` is required when calling `assignUserId`.');
            }
            if (!assignUserIdParams.cluster) {
                throw new Error('Parameter `assignUserIdParams.cluster` is required when calling `assignUserId`.');
            }
            const requestPath = '/1/clusters/mapping';
            const headers = {};
            const queryParameters = {};
            if (xAlgoliaUserID !== undefined) {
                headers['X-Algolia-User-ID'] = xAlgoliaUserID.toString();
            }
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: assignUserIdParams,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Adds, updates, or deletes records in one index with a single API request.  Batching index updates reduces latency and increases data integrity.  - Actions are applied in the order they\'re specified. - Actions are equivalent to the individual API requests of the same name.
         *
         * @param batch - The batch object.
         * @param batch.indexName - Name of the index on which to perform the operation.
         * @param batch.batchWriteParams - The batchWriteParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        batch({ indexName, batchWriteParams }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `batch`.');
            }
            if (!batchWriteParams) {
                throw new Error('Parameter `batchWriteParams` is required when calling `batch`.');
            }
            if (!batchWriteParams.requests) {
                throw new Error('Parameter `batchWriteParams.requests` is required when calling `batch`.');
            }
            const requestPath = '/1/indexes/{indexName}/batch'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: batchWriteParams,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Assigns multiple user IDs to a cluster.  **You can\'t move users with this operation**.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param batchAssignUserIds - The batchAssignUserIds object.
         * @param batchAssignUserIds.xAlgoliaUserID - Unique identifier of the user who makes the search request.
         * @param batchAssignUserIds.batchAssignUserIdsParams - The batchAssignUserIdsParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        batchAssignUserIds({ xAlgoliaUserID, batchAssignUserIdsParams }, requestOptions) {
            if (!xAlgoliaUserID) {
                throw new Error('Parameter `xAlgoliaUserID` is required when calling `batchAssignUserIds`.');
            }
            if (!batchAssignUserIdsParams) {
                throw new Error('Parameter `batchAssignUserIdsParams` is required when calling `batchAssignUserIds`.');
            }
            if (!batchAssignUserIdsParams.cluster) {
                throw new Error('Parameter `batchAssignUserIdsParams.cluster` is required when calling `batchAssignUserIds`.');
            }
            if (!batchAssignUserIdsParams.users) {
                throw new Error('Parameter `batchAssignUserIdsParams.users` is required when calling `batchAssignUserIds`.');
            }
            const requestPath = '/1/clusters/mapping/batch';
            const headers = {};
            const queryParameters = {};
            if (xAlgoliaUserID !== undefined) {
                headers['X-Algolia-User-ID'] = xAlgoliaUserID.toString();
            }
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: batchAssignUserIdsParams,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param batchDictionaryEntries - The batchDictionaryEntries object.
         * @param batchDictionaryEntries.dictionaryName - Dictionary type in which to search.
         * @param batchDictionaryEntries.batchDictionaryEntriesParams - The batchDictionaryEntriesParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        batchDictionaryEntries({ dictionaryName, batchDictionaryEntriesParams, }, requestOptions) {
            if (!dictionaryName) {
                throw new Error('Parameter `dictionaryName` is required when calling `batchDictionaryEntries`.');
            }
            if (!batchDictionaryEntriesParams) {
                throw new Error('Parameter `batchDictionaryEntriesParams` is required when calling `batchDictionaryEntries`.');
            }
            if (!batchDictionaryEntriesParams.requests) {
                throw new Error('Parameter `batchDictionaryEntriesParams.requests` is required when calling `batchDictionaryEntries`.');
            }
            const requestPath = '/1/dictionaries/{dictionaryName}/batch'.replace('{dictionaryName}', encodeURIComponent(dictionaryName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: batchDictionaryEntriesParams,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves records from an index, up to 1,000 per request.  While searching retrieves _hits_ (records augmented with attributes for highlighting and ranking details), browsing _just_ returns matching records. This can be useful if you want to export your indices.  - The Analytics API doesn\'t collect data when using `browse`. - Records are ranked by attributes and custom ranking. - There\'s no ranking for: typo-tolerance, number of matched words, proximity, geo distance.  Browse requests automatically apply these settings:  - `advancedSyntax`: `false` - `attributesToHighlight`: `[]` - `attributesToSnippet`: `[]` - `distinct`: `false` - `enablePersonalization`: `false` - `enableRules`: `false` - `facets`: `[]` - `getRankingInfo`: `false` - `ignorePlurals`: `false` - `optionalFilters`: `[]` - `typoTolerance`: `true` or `false` (`min` and `strict` is evaluated to `true`)  If you send these parameters with your browse requests, they\'ll be ignored.
         *
         * Required API Key ACLs:
         * - browse.
         *
         * @param browse - The browse object.
         * @param browse.indexName - Name of the index on which to perform the operation.
         * @param browse.browseParams - The browseParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        browse({ indexName, browseParams }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `browse`.');
            }
            const requestPath = '/1/indexes/{indexName}/browse'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: browseParams ? browseParams : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes only the records from an index while keeping settings, synonyms, and rules.
         *
         * Required API Key ACLs:
         * - deleteIndex.
         *
         * @param clearObjects - The clearObjects object.
         * @param clearObjects.indexName - Name of the index on which to perform the operation.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        clearObjects({ indexName }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `clearObjects`.');
            }
            const requestPath = '/1/indexes/{indexName}/clear'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes all rules from the index.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param clearRules - The clearRules object.
         * @param clearRules.indexName - Name of the index on which to perform the operation.
         * @param clearRules.forwardToReplicas - Whether changes are applied to replica indices.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        clearRules({ indexName, forwardToReplicas }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `clearRules`.');
            }
            const requestPath = '/1/indexes/{indexName}/rules/clear'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes all synonyms from the index.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param clearSynonyms - The clearSynonyms object.
         * @param clearSynonyms.indexName - Name of the index on which to perform the operation.
         * @param clearSynonyms.forwardToReplicas - Whether changes are applied to replica indices.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        clearSynonyms({ indexName, forwardToReplicas }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `clearSynonyms`.');
            }
            const requestPath = '/1/indexes/{indexName}/synonyms/clear'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customDelete - The customDelete object.
         * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customDelete.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customDelete({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customDelete`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customGet - The customGet object.
         * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customGet.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customGet({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customGet`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPost - The customPost object.
         * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPost.parameters - Query parameters to apply to the current query.
         * @param customPost.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPost({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPost`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPut - The customPut object.
         * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPut.parameters - Query parameters to apply to the current query.
         * @param customPut.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPut({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPut`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes the API key.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param deleteApiKey - The deleteApiKey object.
         * @param deleteApiKey.key - API key.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteApiKey({ key }, requestOptions) {
            if (!key) {
                throw new Error('Parameter `key` is required when calling `deleteApiKey`.');
            }
            const requestPath = '/1/keys/{key}'.replace('{key}', encodeURIComponent(key));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This operation doesn\'t accept empty queries or filters.  It\'s more efficient to get a list of object IDs with the [`browse` operation](#tag/Search/operation/browse), and then delete the records using the [`batch` operation](#tag/Records/operation/batch).
         *
         * Required API Key ACLs:
         * - deleteIndex.
         *
         * @param deleteBy - The deleteBy object.
         * @param deleteBy.indexName - Name of the index on which to perform the operation.
         * @param deleteBy.deleteByParams - The deleteByParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteBy({ indexName, deleteByParams }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `deleteBy`.');
            }
            if (!deleteByParams) {
                throw new Error('Parameter `deleteByParams` is required when calling `deleteBy`.');
            }
            const requestPath = '/1/indexes/{indexName}/deleteByQuery'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: deleteByParams,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes an index and all its settings.  - Deleting an index doesn\'t delete its analytics data. - If you try to delete a non-existing index, the operation is ignored without warning. - If the index you want to delete has replica indices, the replicas become independent indices. - If the index you want to delete is a replica index, you must first unlink it from its primary index before you can delete it.   For more information, see [Delete replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/deleting-replicas/).
         *
         * Required API Key ACLs:
         * - deleteIndex.
         *
         * @param deleteIndex - The deleteIndex object.
         * @param deleteIndex.indexName - Name of the index on which to perform the operation.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteIndex({ indexName }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `deleteIndex`.');
            }
            const requestPath = '/1/indexes/{indexName}'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes a record by its object ID.  To delete more than one record, use the [`batch` operation](#tag/Records/operation/batch). To delete records matching a query, use the [`deleteByQuery` operation](#tag/Records/operation/deleteBy).
         *
         * Required API Key ACLs:
         * - deleteObject.
         *
         * @param deleteObject - The deleteObject object.
         * @param deleteObject.indexName - Name of the index on which to perform the operation.
         * @param deleteObject.objectID - Unique record identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteObject({ indexName, objectID }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `deleteObject`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `deleteObject`.');
            }
            const requestPath = '/1/indexes/{indexName}/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes a rule by its ID. To find the object ID for rules, use the [`search` operation](#tag/Rules/operation/searchRules).
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param deleteRule - The deleteRule object.
         * @param deleteRule.indexName - Name of the index on which to perform the operation.
         * @param deleteRule.objectID - Unique identifier of a rule object.
         * @param deleteRule.forwardToReplicas - Whether changes are applied to replica indices.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteRule({ indexName, objectID, forwardToReplicas }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `deleteRule`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `deleteRule`.');
            }
            const requestPath = '/1/indexes/{indexName}/rules/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes a source from the list of allowed sources.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param deleteSource - The deleteSource object.
         * @param deleteSource.source - IP address range of the source.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteSource({ source }, requestOptions) {
            if (!source) {
                throw new Error('Parameter `source` is required when calling `deleteSource`.');
            }
            const requestPath = '/1/security/sources/{source}'.replace('{source}', encodeURIComponent(source));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes a synonym by its ID. To find the object IDs of your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param deleteSynonym - The deleteSynonym object.
         * @param deleteSynonym.indexName - Name of the index on which to perform the operation.
         * @param deleteSynonym.objectID - Unique identifier of a synonym object.
         * @param deleteSynonym.forwardToReplicas - Whether changes are applied to replica indices.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteSynonym({ indexName, objectID, forwardToReplicas }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `deleteSynonym`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `deleteSynonym`.');
            }
            const requestPath = '/1/indexes/{indexName}/synonyms/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Gets the permissions and restrictions of an API key.  When authenticating with the admin API key, you can request information for any of your application\'s keys. When authenticating with other API keys, you can only retrieve information for that key.
         *
         * @param getApiKey - The getApiKey object.
         * @param getApiKey.key - API key.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getApiKey({ key }, requestOptions) {
            if (!key) {
                throw new Error('Parameter `key` is required when calling `getApiKey`.');
            }
            const requestPath = '/1/keys/{key}'.replace('{key}', encodeURIComponent(key));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Checks the status of a given application task.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param getAppTask - The getAppTask object.
         * @param getAppTask.taskID - Unique task identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getAppTask({ taskID }, requestOptions) {
            if (!taskID) {
                throw new Error('Parameter `taskID` is required when calling `getAppTask`.');
            }
            const requestPath = '/1/task/{taskID}'.replace('{taskID}', encodeURIComponent(taskID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Lists supported languages with their supported dictionary types and number of custom entries.
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getDictionaryLanguages(requestOptions) {
            const requestPath = '/1/dictionaries/*/languages';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves the languages for which standard dictionary entries are turned off.
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getDictionarySettings(requestOptions) {
            const requestPath = '/1/dictionaries/*/settings';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).  - Logs are held for the last seven days. - Up to 1,000 API requests per server are logged. - This request counts towards your [operations quota](https://support.algolia.com/hc/en-us/articles/4406981829777-How-does-Algolia-count-records-and-operations-) but doesn\'t appear in the logs itself.
         *
         * Required API Key ACLs:
         * - logs.
         *
         * @param getLogs - The getLogs object.
         * @param getLogs.offset - First log entry to retrieve. The most recent entries are listed first.
         * @param getLogs.length - Maximum number of entries to retrieve.
         * @param getLogs.indexName - Index for which to retrieve log entries. By default, log entries are retrieved for all indices.
         * @param getLogs.type - Type of log entries to retrieve. By default, all log entries are retrieved.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getLogs({ offset, length, indexName, type } = {}, requestOptions = undefined) {
            const requestPath = '/1/logs';
            const headers = {};
            const queryParameters = {};
            if (offset !== undefined) {
                queryParameters.offset = offset.toString();
            }
            if (length !== undefined) {
                queryParameters.length = length.toString();
            }
            if (indexName !== undefined) {
                queryParameters.indexName = indexName.toString();
            }
            if (type !== undefined) {
                queryParameters.type = type.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves one record by its object ID.  To retrieve more than one record, use the [`objects` operation](#tag/Records/operation/getObjects).
         *
         * Required API Key ACLs:
         * - search.
         *
         * @param getObject - The getObject object.
         * @param getObject.indexName - Name of the index on which to perform the operation.
         * @param getObject.objectID - Unique record identifier.
         * @param getObject.attributesToRetrieve - Attributes to include with the records in the response. This is useful to reduce the size of the API response. By default, all retrievable attributes are returned.  `objectID` is always retrieved.  Attributes included in `unretrievableAttributes` won\'t be retrieved unless the request is authenticated with the admin API key.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getObject({ indexName, objectID, attributesToRetrieve }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `getObject`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `getObject`.');
            }
            const requestPath = '/1/indexes/{indexName}/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            if (attributesToRetrieve !== undefined) {
                queryParameters.attributesToRetrieve = attributesToRetrieve.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves one or more records, potentially from different indices.  Records are returned in the same order as the requests.
         *
         * Required API Key ACLs:
         * - search.
         *
         * @param getObjectsParams - Request object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getObjects(getObjectsParams, requestOptions) {
            if (!getObjectsParams) {
                throw new Error('Parameter `getObjectsParams` is required when calling `getObjects`.');
            }
            if (!getObjectsParams.requests) {
                throw new Error('Parameter `getObjectsParams.requests` is required when calling `getObjects`.');
            }
            const requestPath = '/1/indexes/*/objects';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: getObjectsParams,
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves a rule by its ID. To find the object ID of rules, use the [`search` operation](#tag/Rules/operation/searchRules).
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param getRule - The getRule object.
         * @param getRule.indexName - Name of the index on which to perform the operation.
         * @param getRule.objectID - Unique identifier of a rule object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getRule({ indexName, objectID }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `getRule`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `getRule`.');
            }
            const requestPath = '/1/indexes/{indexName}/rules/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves an object with non-null index settings.
         *
         * Required API Key ACLs:
         * - search.
         *
         * @param getSettings - The getSettings object.
         * @param getSettings.indexName - Name of the index on which to perform the operation.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getSettings({ indexName }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `getSettings`.');
            }
            const requestPath = '/1/indexes/{indexName}/settings'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves all allowed IP addresses with access to your application.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getSources(requestOptions) {
            const requestPath = '/1/security/sources';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves a syonym by its ID. To find the object IDs for your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param getSynonym - The getSynonym object.
         * @param getSynonym.indexName - Name of the index on which to perform the operation.
         * @param getSynonym.objectID - Unique identifier of a synonym object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getSynonym({ indexName, objectID }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `getSynonym`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `getSynonym`.');
            }
            const requestPath = '/1/indexes/{indexName}/synonyms/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Checks the status of a given task.  Indexing tasks are asynchronous. When you add, update, or delete records or indices, a task is created on a queue and completed depending on the load on the server.  The indexing tasks\' responses include a task ID that you can use to check the status.
         *
         * Required API Key ACLs:
         * - addObject.
         *
         * @param getTask - The getTask object.
         * @param getTask.indexName - Name of the index on which to perform the operation.
         * @param getTask.taskID - Unique task identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTask({ indexName, taskID }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `getTask`.');
            }
            if (!taskID) {
                throw new Error('Parameter `taskID` is required when calling `getTask`.');
            }
            const requestPath = '/1/indexes/{indexName}/task/{taskID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{taskID}', encodeURIComponent(taskID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Get the IDs of the 10 users with the highest number of records per cluster.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopUserIds(requestOptions) {
            const requestPath = '/1/clusters/mapping/top';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Returns the user ID data stored in the mapping.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param getUserId - The getUserId object.
         * @param getUserId.userID - Unique identifier of the user who makes the search request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getUserId({ userID }, requestOptions) {
            if (!userID) {
                throw new Error('Parameter `userID` is required when calling `getUserId`.');
            }
            const requestPath = '/1/clusters/mapping/{userID}'.replace('{userID}', encodeURIComponent(userID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param hasPendingMappings - The hasPendingMappings object.
         * @param hasPendingMappings.getClusters - Whether to include the cluster\'s pending mapping state in the response.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        hasPendingMappings({ getClusters } = {}, requestOptions = undefined) {
            const requestPath = '/1/clusters/mapping/pending';
            const headers = {};
            const queryParameters = {};
            if (getClusters !== undefined) {
                queryParameters.getClusters = getClusters.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Lists all API keys associated with your Algolia application, including their permissions and restrictions.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        listApiKeys(requestOptions) {
            const requestPath = '/1/keys';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Lists the available clusters in a multi-cluster setup.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        listClusters(requestOptions) {
            const requestPath = '/1/clusters';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Lists all indices in the current Algolia application.  The request follows any index restrictions of the API key you use to make the request.
         *
         * Required API Key ACLs:
         * - listIndexes.
         *
         * @param listIndices - The listIndices object.
         * @param listIndices.page - Requested page of the API response. If `null`, the API response is not paginated.
         * @param listIndices.hitsPerPage - Number of hits per page.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        listIndices({ page, hitsPerPage } = {}, requestOptions = undefined) {
            const requestPath = '/1/indexes';
            const headers = {};
            const queryParameters = {};
            if (page !== undefined) {
                queryParameters.page = page.toString();
            }
            if (hitsPerPage !== undefined) {
                queryParameters.hitsPerPage = hitsPerPage.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Lists the userIDs assigned to a multi-cluster application.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param listUserIds - The listUserIds object.
         * @param listUserIds.page - Requested page of the API response. If `null`, the API response is not paginated.
         * @param listUserIds.hitsPerPage - Number of hits per page.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        listUserIds({ page, hitsPerPage } = {}, requestOptions = undefined) {
            const requestPath = '/1/clusters/mapping';
            const headers = {};
            const queryParameters = {};
            if (page !== undefined) {
                queryParameters.page = page.toString();
            }
            if (hitsPerPage !== undefined) {
                queryParameters.hitsPerPage = hitsPerPage.toString();
            }
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Adds, updates, or deletes records in multiple indices with a single API request.  - Actions are applied in the order they are specified. - Actions are equivalent to the individual API requests of the same name.
         *
         * @param batchParams - The batchParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        multipleBatch(batchParams, requestOptions) {
            if (!batchParams) {
                throw new Error('Parameter `batchParams` is required when calling `multipleBatch`.');
            }
            if (!batchParams.requests) {
                throw new Error('Parameter `batchParams.requests` is required when calling `multipleBatch`.');
            }
            const requestPath = '/1/indexes/*/batch';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: batchParams,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Copies or moves (renames) an index within the same Algolia application.  - Existing destination indices are overwritten, except for their analytics data. - If the destination index doesn\'t exist yet, it\'ll be created.  **Copy**  - Copying a source index that doesn\'t exist creates a new index with 0 records and default settings. - The API keys of the source index are merged with the existing keys in the destination index. - You can\'t copy the `enableReRanking`, `mode`, and `replicas` settings. - You can\'t copy to a destination index that already has replicas. - Be aware of the [size limits](https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits). - Related guide: [Copy indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/copy-indices/)  **Move**  - Moving a source index that doesn\'t exist is ignored without returning an error. - When moving an index, the analytics data keep their original name and a new set of analytics data is started for the new name.   To access the original analytics in the dashboard, create an index with the original name. - If the destination index has replicas, moving will overwrite the existing index and copy the data to the replica indices. - Related guide: [Move indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/move-indices/).
         *
         * Required API Key ACLs:
         * - addObject.
         *
         * @param operationIndex - The operationIndex object.
         * @param operationIndex.indexName - Name of the index on which to perform the operation.
         * @param operationIndex.operationIndexParams - The operationIndexParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        operationIndex({ indexName, operationIndexParams }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `operationIndex`.');
            }
            if (!operationIndexParams) {
                throw new Error('Parameter `operationIndexParams` is required when calling `operationIndex`.');
            }
            if (!operationIndexParams.operation) {
                throw new Error('Parameter `operationIndexParams.operation` is required when calling `operationIndex`.');
            }
            if (!operationIndexParams.destination) {
                throw new Error('Parameter `operationIndexParams.destination` is required when calling `operationIndex`.');
            }
            const requestPath = '/1/indexes/{indexName}/operation'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: operationIndexParams,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Adds new attributes to a record, or update existing ones.  - If a record with the specified object ID doesn\'t exist,   a new record is added to the index **if** `createIfNotExists` is true. - If the index doesn\'t exist yet, this method creates a new index. - You can use any first-level attribute but not nested attributes.   If you specify a nested attribute, the engine treats it as a replacement for its first-level ancestor.
         *
         * Required API Key ACLs:
         * - addObject.
         *
         * @param partialUpdateObject - The partialUpdateObject object.
         * @param partialUpdateObject.indexName - Name of the index on which to perform the operation.
         * @param partialUpdateObject.objectID - Unique record identifier.
         * @param partialUpdateObject.attributesToUpdate - Attributes with their values.
         * @param partialUpdateObject.createIfNotExists - Whether to create a new record if it doesn\'t exist.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        partialUpdateObject({ indexName, objectID, attributesToUpdate, createIfNotExists, }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `partialUpdateObject`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `partialUpdateObject`.');
            }
            if (!attributesToUpdate) {
                throw new Error('Parameter `attributesToUpdate` is required when calling `partialUpdateObject`.');
            }
            const requestPath = '/1/indexes/{indexName}/{objectID}/partial'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            if (createIfNotExists !== undefined) {
                queryParameters.createIfNotExists = createIfNotExists.toString();
            }
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: attributesToUpdate,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes a user ID and its associated data from the clusters.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param removeUserId - The removeUserId object.
         * @param removeUserId.userID - Unique identifier of the user who makes the search request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        removeUserId({ userID }, requestOptions) {
            if (!userID) {
                throw new Error('Parameter `userID` is required when calling `removeUserId`.');
            }
            const requestPath = '/1/clusters/mapping/{userID}'.replace('{userID}', encodeURIComponent(userID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Replaces the list of allowed sources.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param replaceSources - The replaceSources object.
         * @param replaceSources.source - Allowed sources.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        replaceSources({ source }, requestOptions) {
            if (!source) {
                throw new Error('Parameter `source` is required when calling `replaceSources`.');
            }
            const requestPath = '/1/security/sources';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: source,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Restores a deleted API key.  Restoring resets the `validity` attribute to `0`.  Algolia stores up to 1,000 API keys per application. If you create more, the oldest API keys are deleted and can\'t be restored.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param restoreApiKey - The restoreApiKey object.
         * @param restoreApiKey.key - API key.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        restoreApiKey({ key }, requestOptions) {
            if (!key) {
                throw new Error('Parameter `key` is required when calling `restoreApiKey`.');
            }
            const requestPath = '/1/keys/{key}/restore'.replace('{key}', encodeURIComponent(key));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Adds a record to an index or replace it.  - If the record doesn\'t have an object ID, a new record with an auto-generated object ID is added to your index. - If a record with the specified object ID exists, the existing record is replaced. - If a record with the specified object ID doesn\'t exist, a new record is added to your index. - If you add a record to an index that doesn\'t exist yet, a new index is created.  To update _some_ attributes of a record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject). To add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).
         *
         * Required API Key ACLs:
         * - addObject.
         *
         * @param saveObject - The saveObject object.
         * @param saveObject.indexName - Name of the index on which to perform the operation.
         * @param saveObject.body - The record, a schemaless object with attributes that are useful in the context of search and discovery.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        saveObject({ indexName, body }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `saveObject`.');
            }
            if (!body) {
                throw new Error('Parameter `body` is required when calling `saveObject`.');
            }
            const requestPath = '/1/indexes/{indexName}'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: body,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * If a rule with the specified object ID doesn\'t exist, it\'s created. Otherwise, the existing rule is replaced.  To create or update more than one rule, use the [`batch` operation](#tag/Rules/operation/saveRules).
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param saveRule - The saveRule object.
         * @param saveRule.indexName - Name of the index on which to perform the operation.
         * @param saveRule.objectID - Unique identifier of a rule object.
         * @param saveRule.rule - The rule object.
         * @param saveRule.forwardToReplicas - Whether changes are applied to replica indices.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        saveRule({ indexName, objectID, rule, forwardToReplicas }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `saveRule`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `saveRule`.');
            }
            if (!rule) {
                throw new Error('Parameter `rule` is required when calling `saveRule`.');
            }
            if (!rule.objectID) {
                throw new Error('Parameter `rule.objectID` is required when calling `saveRule`.');
            }
            const requestPath = '/1/indexes/{indexName}/rules/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: rule,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Create or update multiple rules.  If a rule with the specified object ID doesn\'t exist, Algolia creates a new one. Otherwise, existing rules are replaced.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param saveRules - The saveRules object.
         * @param saveRules.indexName - Name of the index on which to perform the operation.
         * @param saveRules.rules - The rules object.
         * @param saveRules.forwardToReplicas - Whether changes are applied to replica indices.
         * @param saveRules.clearExistingRules - Whether existing rules should be deleted before adding this batch.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        saveRules({ indexName, rules, forwardToReplicas, clearExistingRules, }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `saveRules`.');
            }
            if (!rules) {
                throw new Error('Parameter `rules` is required when calling `saveRules`.');
            }
            const requestPath = '/1/indexes/{indexName}/rules/batch'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            if (clearExistingRules !== undefined) {
                queryParameters.clearExistingRules = clearExistingRules.toString();
            }
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: rules,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * If a synonym with the specified object ID doesn\'t exist, Algolia adds a new one. Otherwise, the existing synonym is replaced. To add multiple synonyms in a single API request, use the [`batch` operation](#tag/Synonyms/operation/saveSynonyms).
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param saveSynonym - The saveSynonym object.
         * @param saveSynonym.indexName - Name of the index on which to perform the operation.
         * @param saveSynonym.objectID - Unique identifier of a synonym object.
         * @param saveSynonym.synonymHit - The synonymHit object.
         * @param saveSynonym.forwardToReplicas - Whether changes are applied to replica indices.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        saveSynonym({ indexName, objectID, synonymHit, forwardToReplicas }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `saveSynonym`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `saveSynonym`.');
            }
            if (!synonymHit) {
                throw new Error('Parameter `synonymHit` is required when calling `saveSynonym`.');
            }
            if (!synonymHit.objectID) {
                throw new Error('Parameter `synonymHit.objectID` is required when calling `saveSynonym`.');
            }
            if (!synonymHit.type) {
                throw new Error('Parameter `synonymHit.type` is required when calling `saveSynonym`.');
            }
            const requestPath = '/1/indexes/{indexName}/synonyms/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: synonymHit,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * If a synonym with the `objectID` doesn\'t exist, Algolia adds a new one. Otherwise, existing synonyms are replaced.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param saveSynonyms - The saveSynonyms object.
         * @param saveSynonyms.indexName - Name of the index on which to perform the operation.
         * @param saveSynonyms.synonymHit - The synonymHit object.
         * @param saveSynonyms.forwardToReplicas - Whether changes are applied to replica indices.
         * @param saveSynonyms.replaceExistingSynonyms - Whether to replace all synonyms in the index with the ones sent with this request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        saveSynonyms({ indexName, synonymHit, forwardToReplicas, replaceExistingSynonyms, }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `saveSynonyms`.');
            }
            if (!synonymHit) {
                throw new Error('Parameter `synonymHit` is required when calling `saveSynonyms`.');
            }
            const requestPath = '/1/indexes/{indexName}/synonyms/batch'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            if (replaceExistingSynonyms !== undefined) {
                queryParameters.replaceExistingSynonyms =
                    replaceExistingSynonyms.toString();
            }
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: synonymHit,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Sends multiple search request to one or more indices.  This can be useful in these cases:  - Different indices for different purposes, such as, one index for products, another one for marketing content. - Multiple searches to the same index—for example, with different filters.
         *
         * Required API Key ACLs:
         * - search.
         *
         * @param searchMethodParams - Muli-search request body. Results are returned in the same order as the requests.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        search(searchMethodParams, requestOptions) {
            if (searchMethodParams && Array.isArray(searchMethodParams)) {
                const newSignatureRequest = {
                    requests: searchMethodParams.map(({ params, ...legacyRequest }) => {
                        if (legacyRequest.type === 'facet') {
                            return {
                                ...legacyRequest,
                                ...params,
                                type: 'facet',
                            };
                        }
                        return {
                            ...legacyRequest,
                            ...params,
                            facet: undefined,
                            maxFacetHits: undefined,
                            facetQuery: undefined,
                        };
                    }),
                };
                // eslint-disable-next-line no-param-reassign
                searchMethodParams = newSignatureRequest;
            }
            if (!searchMethodParams) {
                throw new Error('Parameter `searchMethodParams` is required when calling `search`.');
            }
            if (!searchMethodParams.requests) {
                throw new Error('Parameter `searchMethodParams.requests` is required when calling `search`.');
            }
            const requestPath = '/1/indexes/*/queries';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: searchMethodParams,
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Searches for standard and custom dictionary entries.
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param searchDictionaryEntries - The searchDictionaryEntries object.
         * @param searchDictionaryEntries.dictionaryName - Dictionary type in which to search.
         * @param searchDictionaryEntries.searchDictionaryEntriesParams - The searchDictionaryEntriesParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchDictionaryEntries({ dictionaryName, searchDictionaryEntriesParams, }, requestOptions) {
            if (!dictionaryName) {
                throw new Error('Parameter `dictionaryName` is required when calling `searchDictionaryEntries`.');
            }
            if (!searchDictionaryEntriesParams) {
                throw new Error('Parameter `searchDictionaryEntriesParams` is required when calling `searchDictionaryEntries`.');
            }
            if (!searchDictionaryEntriesParams.query) {
                throw new Error('Parameter `searchDictionaryEntriesParams.query` is required when calling `searchDictionaryEntries`.');
            }
            const requestPath = '/1/dictionaries/{dictionaryName}/search'.replace('{dictionaryName}', encodeURIComponent(dictionaryName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: searchDictionaryEntriesParams,
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Searches for values of a specified facet attribute.  - By default, facet values are sorted by decreasing count.   You can adjust this with the `sortFacetValueBy` parameter. - Searching for facet values doesn\'t work if you have **more than 65 searchable facets and searchable attributes combined**.
         *
         * Required API Key ACLs:
         * - search.
         *
         * @param searchForFacetValues - The searchForFacetValues object.
         * @param searchForFacetValues.indexName - Name of the index on which to perform the operation.
         * @param searchForFacetValues.facetName - Facet attribute in which to search for values.  This attribute must be included in the `attributesForFaceting` index setting with the `searchable()` modifier.
         * @param searchForFacetValues.searchForFacetValuesRequest - The searchForFacetValuesRequest object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchForFacetValues({ indexName, facetName, searchForFacetValuesRequest, }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `searchForFacetValues`.');
            }
            if (!facetName) {
                throw new Error('Parameter `facetName` is required when calling `searchForFacetValues`.');
            }
            const requestPath = '/1/indexes/{indexName}/facets/{facetName}/query'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{facetName}', encodeURIComponent(facetName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: searchForFacetValuesRequest ? searchForFacetValuesRequest : {},
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Searches for rules in your index.
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param searchRules - The searchRules object.
         * @param searchRules.indexName - Name of the index on which to perform the operation.
         * @param searchRules.searchRulesParams - The searchRulesParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchRules({ indexName, searchRulesParams }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `searchRules`.');
            }
            const requestPath = '/1/indexes/{indexName}/rules/search'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: searchRulesParams ? searchRulesParams : {},
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Searches a single index and return matching search results (_hits_).  This method lets you retrieve up to 1,000 hits. If you need more, use the [`browse` operation](#tag/Search/operation/browse) or increase the `paginatedLimitedTo` index setting.
         *
         * Required API Key ACLs:
         * - search.
         *
         * @param searchSingleIndex - The searchSingleIndex object.
         * @param searchSingleIndex.indexName - Name of the index on which to perform the operation.
         * @param searchSingleIndex.searchParams - The searchParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchSingleIndex({ indexName, searchParams }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `searchSingleIndex`.');
            }
            const requestPath = '/1/indexes/{indexName}/query'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: searchParams ? searchParams : {},
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Searches for synonyms in your index.
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param searchSynonyms - The searchSynonyms object.
         * @param searchSynonyms.indexName - Name of the index on which to perform the operation.
         * @param searchSynonyms.searchSynonymsParams - Body of the `searchSynonyms` operation.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchSynonyms({ indexName, searchSynonymsParams }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `searchSynonyms`.');
            }
            const requestPath = '/1/indexes/{indexName}/synonyms/search'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: searchSynonymsParams ? searchSynonymsParams : {},
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.  To ensure rapid updates, the user IDs index isn\'t built at the same time as the mapping. Instead, it\'s built every 12 hours, at the same time as the update of user ID usage. For example, if you add or move a user ID, the search will show an old value until the next time the mapping is rebuilt (every 12 hours).
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param searchUserIdsParams - The searchUserIdsParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchUserIds(searchUserIdsParams, requestOptions) {
            if (!searchUserIdsParams) {
                throw new Error('Parameter `searchUserIdsParams` is required when calling `searchUserIds`.');
            }
            if (!searchUserIdsParams.query) {
                throw new Error('Parameter `searchUserIdsParams.query` is required when calling `searchUserIds`.');
            }
            const requestPath = '/1/clusters/mapping/search';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: searchUserIdsParams,
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Turns standard stop word dictionary entries on or off for a given language.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param dictionarySettingsParams - The dictionarySettingsParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        setDictionarySettings(dictionarySettingsParams, requestOptions) {
            if (!dictionarySettingsParams) {
                throw new Error('Parameter `dictionarySettingsParams` is required when calling `setDictionarySettings`.');
            }
            if (!dictionarySettingsParams.disableStandardEntries) {
                throw new Error('Parameter `dictionarySettingsParams.disableStandardEntries` is required when calling `setDictionarySettings`.');
            }
            const requestPath = '/1/dictionaries/*/settings';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: dictionarySettingsParams,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Update the specified index settings.  Index settings that you don\'t specify are left unchanged. Specify `null` to reset a setting to its default value.  For best performance, update the index settings before you add new records to your index.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param setSettings - The setSettings object.
         * @param setSettings.indexName - Name of the index on which to perform the operation.
         * @param setSettings.indexSettings - The indexSettings object.
         * @param setSettings.forwardToReplicas - Whether changes are applied to replica indices.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        setSettings({ indexName, indexSettings, forwardToReplicas }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `setSettings`.');
            }
            if (!indexSettings) {
                throw new Error('Parameter `indexSettings` is required when calling `setSettings`.');
            }
            const requestPath = '/1/indexes/{indexName}/settings'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            if (forwardToReplicas !== undefined) {
                queryParameters.forwardToReplicas = forwardToReplicas.toString();
            }
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: indexSettings,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Replaces the permissions of an existing API key.  Any unspecified attribute resets that attribute to its default value.
         *
         * Required API Key ACLs:
         * - admin.
         *
         * @param updateApiKey - The updateApiKey object.
         * @param updateApiKey.key - API key.
         * @param updateApiKey.apiKey - The apiKey object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        updateApiKey({ key, apiKey }, requestOptions) {
            if (!key) {
                throw new Error('Parameter `key` is required when calling `updateApiKey`.');
            }
            if (!apiKey) {
                throw new Error('Parameter `apiKey` is required when calling `updateApiKey`.');
            }
            if (!apiKey.acl) {
                throw new Error('Parameter `apiKey.acl` is required when calling `updateApiKey`.');
            }
            const requestPath = '/1/keys/{key}'.replace('{key}', encodeURIComponent(key));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: apiKey,
            };
            return transporter.request(request, requestOptions);
        },
    };
}

// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.
const apiClientVersion$1 = '5.1.1';
function getDefaultHosts(appId) {
    return [
        {
            url: `${appId}-dsn.algolia.net`,
            accept: 'read',
            protocol: 'https',
        },
        {
            url: `${appId}.algolia.net`,
            accept: 'write',
            protocol: 'https',
        },
    ].concat(shuffle([
        {
            url: `${appId}-1.algolianet.com`,
            accept: 'readWrite',
            protocol: 'https',
        },
        {
            url: `${appId}-2.algolianet.com`,
            accept: 'readWrite',
            protocol: 'https',
        },
        {
            url: `${appId}-3.algolianet.com`,
            accept: 'readWrite',
            protocol: 'https',
        },
    ]));
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createRecommendClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts(appIdOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Recommend',
            version: apiClientVersion$1,
        }),
        baseHeaders: {
            'content-type': 'text/plain',
            ...auth.headers(),
            ...options.baseHeaders,
        },
        baseQueryParameters: {
            ...auth.queryParameters(),
            ...options.baseQueryParameters,
        },
    });
    return {
        transporter,
        /**
         * The `appId` currently in use.
         */
        appId: appIdOption,
        /**
         * Clears the cache of the transporter for the `requestsCache` and `responsesCache` properties.
         */
        clearCache() {
            return Promise.all([
                transporter.requestsCache.clear(),
                transporter.responsesCache.clear(),
            ]).then(() => undefined);
        },
        /**
         * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
         */
        get _ua() {
            return transporter.algoliaAgent.value;
        },
        /**
         * Adds a `segment` to the `x-algolia-agent` sent with every requests.
         *
         * @param segment - The algolia agent (user-agent) segment to add.
         * @param version - The version of the agent.
         */
        addAlgoliaAgent(segment, version) {
            transporter.algoliaAgent.add({ segment, version });
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customDelete - The customDelete object.
         * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customDelete.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customDelete({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customDelete`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customGet - The customGet object.
         * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customGet.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customGet({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customGet`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPost - The customPost object.
         * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPost.parameters - Query parameters to apply to the current query.
         * @param customPost.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPost({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPost`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @param customPut - The customPut object.
         * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param customPut.parameters - Query parameters to apply to the current query.
         * @param customPut.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        customPut({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `customPut`.');
            }
            const requestPath = '/{path}'.replace('{path}', path);
            const headers = {};
            const queryParameters = parameters ? parameters : {};
            const request = {
                method: 'PUT',
                path: requestPath,
                queryParameters,
                headers,
                data: body ? body : {},
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Deletes a Recommend rule from a recommendation scenario.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param deleteRecommendRule - The deleteRecommendRule object.
         * @param deleteRecommendRule.indexName - Name of the index on which to perform the operation.
         * @param deleteRecommendRule.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
         * @param deleteRecommendRule.objectID - Unique record identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        deleteRecommendRule({ indexName, model, objectID }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `deleteRecommendRule`.');
            }
            if (!model) {
                throw new Error('Parameter `model` is required when calling `deleteRecommendRule`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `deleteRecommendRule`.');
            }
            const requestPath = '/1/indexes/{indexName}/{model}/recommend/rules/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{model}', encodeURIComponent(model))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'DELETE',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves a Recommend rule that you previously created in the Algolia dashboard.
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param getRecommendRule - The getRecommendRule object.
         * @param getRecommendRule.indexName - Name of the index on which to perform the operation.
         * @param getRecommendRule.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
         * @param getRecommendRule.objectID - Unique record identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getRecommendRule({ indexName, model, objectID }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `getRecommendRule`.');
            }
            if (!model) {
                throw new Error('Parameter `model` is required when calling `getRecommendRule`.');
            }
            if (!objectID) {
                throw new Error('Parameter `objectID` is required when calling `getRecommendRule`.');
            }
            const requestPath = '/1/indexes/{indexName}/{model}/recommend/rules/{objectID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{model}', encodeURIComponent(model))
                .replace('{objectID}', encodeURIComponent(objectID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Checks the status of a given task.  Deleting a Recommend rule is asynchronous. When you delete a rule, a task is created on a queue and completed depending on the load on the server. The API response includes a task ID that you can use to check the status.
         *
         * Required API Key ACLs:
         * - editSettings.
         *
         * @param getRecommendStatus - The getRecommendStatus object.
         * @param getRecommendStatus.indexName - Name of the index on which to perform the operation.
         * @param getRecommendStatus.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
         * @param getRecommendStatus.taskID - Unique task identifier.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getRecommendStatus({ indexName, model, taskID }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `getRecommendStatus`.');
            }
            if (!model) {
                throw new Error('Parameter `model` is required when calling `getRecommendStatus`.');
            }
            if (!taskID) {
                throw new Error('Parameter `taskID` is required when calling `getRecommendStatus`.');
            }
            const requestPath = '/1/indexes/{indexName}/{model}/task/{taskID}'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{model}', encodeURIComponent(model))
                .replace('{taskID}', encodeURIComponent(taskID));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'GET',
                path: requestPath,
                queryParameters,
                headers,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Retrieves recommendations from selected AI models.
         *
         * Required API Key ACLs:
         * - search.
         *
         * @param getRecommendationsParams - The getRecommendationsParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getRecommendations(getRecommendationsParams, requestOptions) {
            if (getRecommendationsParams && Array.isArray(getRecommendationsParams)) {
                const newSignatureRequest = {
                    requests: getRecommendationsParams,
                };
                // eslint-disable-next-line no-param-reassign
                getRecommendationsParams = newSignatureRequest;
            }
            if (!getRecommendationsParams) {
                throw new Error('Parameter `getRecommendationsParams` is required when calling `getRecommendations`.');
            }
            if (!getRecommendationsParams.requests) {
                throw new Error('Parameter `getRecommendationsParams.requests` is required when calling `getRecommendations`.');
            }
            const requestPath = '/1/indexes/*/recommendations';
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: getRecommendationsParams,
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
        /**
         * Searches for Recommend rules.  Use an empty query to list all rules for this recommendation scenario.
         *
         * Required API Key ACLs:
         * - settings.
         *
         * @param searchRecommendRules - The searchRecommendRules object.
         * @param searchRecommendRules.indexName - Name of the index on which to perform the operation.
         * @param searchRecommendRules.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
         * @param searchRecommendRules.searchRecommendRulesParams - The searchRecommendRulesParams object.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchRecommendRules({ indexName, model, searchRecommendRulesParams, }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `searchRecommendRules`.');
            }
            if (!model) {
                throw new Error('Parameter `model` is required when calling `searchRecommendRules`.');
            }
            const requestPath = '/1/indexes/{indexName}/{model}/recommend/rules/search'
                .replace('{indexName}', encodeURIComponent(indexName))
                .replace('{model}', encodeURIComponent(model));
            const headers = {};
            const queryParameters = {};
            const request = {
                method: 'POST',
                path: requestPath,
                queryParameters,
                headers,
                data: searchRecommendRulesParams ? searchRecommendRulesParams : {},
                useReadTransporter: true,
                cacheable: true,
            };
            return transporter.request(request, requestOptions);
        },
    };
}

function createXhrRequester() {
    function send(request) {
        return new Promise((resolve) => {
            const baseRequester = new XMLHttpRequest();
            baseRequester.open(request.method, request.url, true);
            Object.keys(request.headers).forEach((key) => baseRequester.setRequestHeader(key, request.headers[key]));
            const createTimeout = (timeout, content) => {
                return setTimeout(() => {
                    baseRequester.abort();
                    resolve({
                        status: 0,
                        content,
                        isTimedOut: true,
                    });
                }, timeout);
            };
            const connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');
            let responseTimeout;
            baseRequester.onreadystatechange = () => {
                if (baseRequester.readyState > baseRequester.OPENED &&
                    responseTimeout === undefined) {
                    clearTimeout(connectTimeout);
                    responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
                }
            };
            baseRequester.onerror = () => {
                // istanbul ignore next
                if (baseRequester.status === 0) {
                    clearTimeout(connectTimeout);
                    clearTimeout(responseTimeout);
                    resolve({
                        content: baseRequester.responseText || 'Network request failed',
                        status: baseRequester.status,
                        isTimedOut: false,
                    });
                }
            };
            baseRequester.onload = () => {
                clearTimeout(connectTimeout);
                clearTimeout(responseTimeout);
                resolve({
                    content: baseRequester.responseText,
                    status: baseRequester.status,
                    isTimedOut: false,
                });
            };
            baseRequester.send(request.data);
        });
    }
    return { send };
}

// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.
const apiClientVersion = apiClientVersion$2;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function algoliasearch(appId, apiKey, options) {
    if (!appId || typeof appId !== 'string') {
        throw new Error('`appId` is missing.');
    }
    if (!apiKey || typeof apiKey !== 'string') {
        throw new Error('`apiKey` is missing.');
    }
    const commonOptions = {
        apiKey,
        appId,
        timeouts: {
            connect: DEFAULT_CONNECT_TIMEOUT_BROWSER,
            read: DEFAULT_READ_TIMEOUT_BROWSER,
            write: DEFAULT_WRITE_TIMEOUT_BROWSER,
        },
        requester: createXhrRequester(),
        algoliaAgents: [{ segment: 'Browser' }],
        authMode: 'WithinQueryParameters',
        responsesCache: createMemoryCache(),
        requestsCache: createMemoryCache({ serializable: false }),
        hostsCache: createFallbackableCache({
            caches: [
                createBrowserLocalStorageCache({ key: `${apiClientVersion}-${appId}` }),
                createMemoryCache(),
            ],
        }),
        ...options,
    };
    function initRecommend(initOptions = {}) {
        return createRecommendClient({
            ...commonOptions,
            ...initOptions.options,
            ...initOptions,
        });
    }
    function initAnalytics(initOptions = {}) {
        if (initOptions.region &&
            (typeof initOptions.region !== 'string' ||
                !REGIONS$1.includes(initOptions.region))) {
            throw new Error(`\`region\` must be one of the following: ${REGIONS$1.join(', ')}`);
        }
        return createAnalyticsClient({
            ...commonOptions,
            ...initOptions.options,
            ...initOptions,
        });
    }
    function initAbtesting(initOptions = {}) {
        if (initOptions.region &&
            (typeof initOptions.region !== 'string' ||
                !REGIONS$2.includes(initOptions.region))) {
            throw new Error(`\`region\` must be one of the following: ${REGIONS$2.join(', ')}`);
        }
        return createAbtestingClient({
            ...commonOptions,
            ...initOptions.options,
            ...initOptions,
        });
    }
    function initPersonalization(initOptions) {
        if (!initOptions.region ||
            (initOptions.region &&
                (typeof initOptions.region !== 'string' ||
                    !REGIONS.includes(initOptions.region)))) {
            throw new Error(`\`region\` is required and must be one of the following: ${REGIONS.join(', ')}`);
        }
        return createPersonalizationClient({
            ...commonOptions,
            ...initOptions.options,
            ...initOptions,
        });
    }
    return {
        ...createSearchClient(commonOptions),
        /**
         * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
         */
        get _ua() {
            return this.transporter.algoliaAgent.value;
        },
        initAbtesting,
        initAnalytics,
        initPersonalization,
        initRecommend,
    };
}

export { algoliasearch, apiClientVersion };
