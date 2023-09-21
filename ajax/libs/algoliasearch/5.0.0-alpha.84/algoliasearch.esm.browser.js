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
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      return Promise.resolve().then(() => {
        const keyAsString = JSON.stringify(key);
        const value = getNamespace()[keyAsString];
        return Promise.all([value || defaultValue(), value !== undefined]);
      }).then(([value, exists]) => {
        return Promise.all([value, exists || events.miss(value)]);
      }).then(([value]) => value);
    },
    set(key, value) {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();
        namespace[JSON.stringify(key)] = value;
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

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
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
    super('Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.', stackTrace, 'RetryError');
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
  let url = `${host.protocol}://${host.url}/${path.charAt(0) === '/' ? path.substr(1) : path}`;
  if (queryParametersAsString.length) {
    url += `?${queryParametersAsString}`;
  }
  return url;
}
function serializeQueryParameters(parameters) {
  const isObjectOrArray = value => Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]';
  return Object.keys(parameters).map(key => `${key}=${encodeURIComponent(isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key])}`).join('&');
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
      let responseTimeout = requestOptions.timeout;
      if (responseTimeout === undefined) {
        responseTimeout = isRead ? timeouts.read : timeouts.write;
      }
      const payload = {
        data,
        headers,
        method: request.method,
        url: serializeUrl(host, request.path, queryParameters),
        connectTimeout: getTimeout(timeoutsCount, timeouts.connect),
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
const apiClientVersion$4 = '5.0.0-alpha.84';
const REGIONS$2 = ['de', 'us'];
function getDefaultHosts$3(region) {
    const url = !region
        ? 'analytics.algolia.com'
        : 'analytics.{region}.algolia.com'.replace('{region}', region);
    return [{ url, accept: 'readWrite', protocol: 'https' }];
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createAbtestingClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, region: regionOption, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts$3(regionOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Abtesting',
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
         * Creates an A/B test.
         *
         * @summary Create an A/B test.
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
         * @summary Send requests to the Algolia REST API.
         * @param del - The del object.
         * @param del.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param del.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        del({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `del`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * Delete an A/B test. To determine the `id` for an A/B test, use the [`listABTests` operation](#tag/abtest/operation/listABTests).
         *
         * @summary Delete an A/B test.
         * @param deleteABTest - The deleteABTest object.
         * @param deleteABTest.id - Unique A/B test ID.
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
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param get - The get object.
         * @param get.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param get.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        get({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `get`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * Get specific details for an A/B test. To determine the `id` for an A/B test, use the [`listABTests` operation](#tag/abtest/operation/listABTests).
         *
         * @summary Get A/B test details.
         * @param getABTest - The getABTest object.
         * @param getABTest.id - Unique A/B test ID.
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
         * List all A/B tests.
         *
         * @summary List all A/B tests.
         * @param listABTests - The listABTests object.
         * @param listABTests.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param listABTests.limit - Number of records to return (page size).
         * @param listABTests.indexPrefix - Only return A/B tests for indices starting with this prefix.
         * @param listABTests.indexSuffix - Only return A/B tests for indices ending with this suffix.
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
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param post - The post object.
         * @param post.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param post.parameters - Query parameters to apply to the current query.
         * @param post.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        post({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `post`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * @summary Send requests to the Algolia REST API.
         * @param put - The put object.
         * @param put.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param put.parameters - Query parameters to apply to the current query.
         * @param put.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        put({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `put`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * If stopped, the test is over and can\'t be restarted. There is now only one index, receiving 100% of all search requests. The data gathered for stopped A/B tests is retained. To determine the `id` for an A/B test, use the [`listABTests` operation](#tag/abtest/operation/listABTests).
         *
         * @summary Stop an A/B test.
         * @param stopABTest - The stopABTest object.
         * @param stopABTest.id - Unique A/B test ID.
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
const apiClientVersion$3 = '5.0.0-alpha.84';
const REGIONS$1 = ['de', 'us'];
function getDefaultHosts$2(region) {
    const url = !region
        ? 'analytics.algolia.com'
        : 'analytics.{region}.algolia.com'.replace('{region}', region);
    return [{ url, accept: 'readWrite', protocol: 'https' }];
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createAnalyticsClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, region: regionOption, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts$2(regionOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Analytics',
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
         * @summary Send requests to the Algolia REST API.
         * @param del - The del object.
         * @param del.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param del.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        del({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `del`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * @summary Send requests to the Algolia REST API.
         * @param get - The get object.
         * @param get.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param get.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        get({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `get`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * Return the average click position for the complete time range and for individual days. > **Note**: If all `positions` have a `clickCount` of `0` or `null`, it means Algolia didn\'t receive any click events for tracked searches. A _tracked_ search is a search request where the `clickAnalytics` parameter is `true`.
         *
         * @summary Get average click position.
         * @param getAverageClickPosition - The getAverageClickPosition object.
         * @param getAverageClickPosition.index - Index name to target.
         * @param getAverageClickPosition.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getAverageClickPosition.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getAverageClickPosition.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Show the number of clicks events and their associated position in the search results.  > **Note**: If all `positions` have a `clickCount` of `0` or `null`, it means Algolia didn\'t receive any click events for tracked searches. A _tracked_ search is a search request where the `clickAnalytics` parameter is `true`.
         *
         * @summary Get click positions.
         * @param getClickPositions - The getClickPositions object.
         * @param getClickPositions.index - Index name to target.
         * @param getClickPositions.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getClickPositions.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getClickPositions.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Returns a [click-through rate (CTR)](https://www.algolia.com/doc/guides/search-analytics/concepts/metrics/#click-through-rate).
         *
         * @summary Get click-through rate (CTR).
         * @param getClickThroughRate - The getClickThroughRate object.
         * @param getClickThroughRate.index - Index name to target.
         * @param getClickThroughRate.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getClickThroughRate.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getClickThroughRate.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Return a [conversion rate](https://www.algolia.com/doc/guides/search-analytics/concepts/metrics/#conversion-rate).
         *
         * @summary Get conversion rate (CR).
         * @param getConversationRate - The getConversationRate object.
         * @param getConversationRate.index - Index name to target.
         * @param getConversationRate.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getConversationRate.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getConversationRate.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getConversationRate({ index, startDate, endDate, tags }, requestOptions) {
            if (!index) {
                throw new Error('Parameter `index` is required when calling `getConversationRate`.');
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
         * Returns the rate at which searches don\'t lead to any clicks. The endpoint returns a value for the complete given time range, as well as a value per day. It also returns the count of searches and searches without clicks.
         *
         * @summary Get no click rate.
         * @param getNoClickRate - The getNoClickRate object.
         * @param getNoClickRate.index - Index name to target.
         * @param getNoClickRate.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getNoClickRate.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getNoClickRate.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Returns the rate at which searches didn\'t return any results.
         *
         * @summary Get no results rate.
         * @param getNoResultsRate - The getNoResultsRate object.
         * @param getNoResultsRate.index - Index name to target.
         * @param getNoResultsRate.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getNoResultsRate.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getNoResultsRate.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Returns the number of searches within a time range.
         *
         * @summary Get number of searches.
         * @param getSearchesCount - The getSearchesCount object.
         * @param getSearchesCount.index - Index name to target.
         * @param getSearchesCount.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getSearchesCount.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getSearchesCount.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Return the most popular of the last 1,000 searches that didn\'t lead to any clicks.
         *
         * @summary Get top searches with no clicks.
         * @param getSearchesNoClicks - The getSearchesNoClicks object.
         * @param getSearchesNoClicks.index - Index name to target.
         * @param getSearchesNoClicks.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getSearchesNoClicks.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getSearchesNoClicks.limit - Number of records to return (page size).
         * @param getSearchesNoClicks.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param getSearchesNoClicks.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Returns the most popular of the latest 1,000 searches that didn\'t return any results.
         *
         * @summary Get top searches with no results.
         * @param getSearchesNoResults - The getSearchesNoResults object.
         * @param getSearchesNoResults.index - Index name to target.
         * @param getSearchesNoResults.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getSearchesNoResults.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getSearchesNoResults.limit - Number of records to return (page size).
         * @param getSearchesNoResults.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param getSearchesNoResults.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Return the latest update time of the Analytics API for an index. If the index has been recently created or no search has been performed yet, `updatedAt` will be `null`. > **Note**: The Analytics API is updated every 5&nbsp;minutes.
         *
         * @summary Get Analytics API status.
         * @param getStatus - The getStatus object.
         * @param getStatus.index - Index name to target.
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
         * Returns top countries. Limited to the 1,000 most frequent ones.
         *
         * @summary Get top countries.
         * @param getTopCountries - The getTopCountries object.
         * @param getTopCountries.index - Index name to target.
         * @param getTopCountries.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopCountries.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopCountries.limit - Number of records to return (page size).
         * @param getTopCountries.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param getTopCountries.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Return the most popular [filterable attributes](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/) in the 1,000 most recently used filters.
         *
         * @summary Get top filterable attributes.
         * @param getTopFilterAttributes - The getTopFilterAttributes object.
         * @param getTopFilterAttributes.index - Index name to target.
         * @param getTopFilterAttributes.search - User query.
         * @param getTopFilterAttributes.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopFilterAttributes.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopFilterAttributes.limit - Number of records to return (page size).
         * @param getTopFilterAttributes.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param getTopFilterAttributes.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Returns the most popular filter values for an attribute in the 1,000 most recently used filters.
         *
         * @summary Get top filter values for an attribute.
         * @param getTopFilterForAttribute - The getTopFilterForAttribute object.
         * @param getTopFilterForAttribute.attribute - Attribute name.
         * @param getTopFilterForAttribute.index - Index name to target.
         * @param getTopFilterForAttribute.search - User query.
         * @param getTopFilterForAttribute.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopFilterForAttribute.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopFilterForAttribute.limit - Number of records to return (page size).
         * @param getTopFilterForAttribute.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param getTopFilterForAttribute.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Returns top filters for filter-enabled searches that don\'t return results. Limited to the 1,000 most recently used filters.
         *
         * @summary Get top filters for a no result search.
         * @param getTopFiltersNoResults - The getTopFiltersNoResults object.
         * @param getTopFiltersNoResults.index - Index name to target.
         * @param getTopFiltersNoResults.search - User query.
         * @param getTopFiltersNoResults.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopFiltersNoResults.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopFiltersNoResults.limit - Number of records to return (page size).
         * @param getTopFiltersNoResults.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param getTopFiltersNoResults.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
         * Return the most popular clicked results in the last 1,000 searches.
         *
         * @summary Get top hits.
         * @param getTopHits - The getTopHits object.
         * @param getTopHits.index - Index name to target.
         * @param getTopHits.search - User query.
         * @param getTopHits.clickAnalytics - Whether to include [click and conversion](https://www.algolia.com/doc/guides/sending-events/getting-started/) rates for a search.
         * @param getTopHits.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopHits.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopHits.limit - Number of records to return (page size).
         * @param getTopHits.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param getTopHits.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopHits({ index, search, clickAnalytics, startDate, endDate, limit, offset, tags, }, requestOptions) {
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
         * Returns the most popular of the latest 1,000 searches. For each search, also returns the number of hits.
         *
         * @summary Get top searches.
         * @param getTopSearches - The getTopSearches object.
         * @param getTopSearches.index - Index name to target.
         * @param getTopSearches.clickAnalytics - Whether to include [click and conversion](https://www.algolia.com/doc/guides/sending-events/getting-started/) rates for a search.
         * @param getTopSearches.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopSearches.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getTopSearches.orderBy - Reorder the results.
         * @param getTopSearches.direction - Sorting direction of the results: ascending or descending.
         * @param getTopSearches.limit - Number of records to return (page size).
         * @param getTopSearches.offset - Position of the starting record. Used for paging. 0 is the first record.
         * @param getTopSearches.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        getTopSearches({ index, clickAnalytics, startDate, endDate, orderBy, direction, limit, offset, tags, }, requestOptions) {
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
         * Return the count of unique users.
         *
         * @summary Get user count.
         * @param getUsersCount - The getUsersCount object.
         * @param getUsersCount.index - Index name to target.
         * @param getUsersCount.startDate - Start date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getUsersCount.endDate - End date (a string in the format `YYYY-MM-DD`) of the period to analyze.
         * @param getUsersCount.tags - Filter analytics on the [`analyticsTags`](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) set at search time. Multiple tags can be combined with the operators OR and AND. If a tag contains characters like spaces or parentheses, it must be URL-encoded.
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
        /**
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param post - The post object.
         * @param post.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param post.parameters - Query parameters to apply to the current query.
         * @param post.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        post({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `post`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * @summary Send requests to the Algolia REST API.
         * @param put - The put object.
         * @param put.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param put.parameters - Query parameters to apply to the current query.
         * @param put.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        put({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `put`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
    };
}

// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.
const apiClientVersion$2 = '5.0.0-alpha.84';
const REGIONS = ['eu', 'us'];
function getDefaultHosts$1(region) {
    const url = 'personalization.{region}.algolia.com'.replace('{region}', region);
    return [{ url, accept: 'readWrite', protocol: 'https' }];
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createPersonalizationClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, region: regionOption, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts$1(regionOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Personalization',
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
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param del - The del object.
         * @param del.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param del.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        del({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `del`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * Delete the user profile and all its associated data.  Returns, as part of the response, a date until which the data can safely be considered as deleted for the given user. This means if you send events for the given user before this date, they will be ignored. Any data received after the deletedUntil date will start building a new user profile.  It might take a couple hours for the deletion request to be fully processed.
         *
         * @summary Delete a user profile.
         * @param deleteUserProfile - The deleteUserProfile object.
         * @param deleteUserProfile.userToken - UserToken representing the user for which to fetch the Personalization profile.
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
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param get - The get object.
         * @param get.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param get.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        get({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `get`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * The strategy contains information on the events and facets that impact user profiles and personalized search results.
         *
         * @summary Get the current strategy.
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
         * Get the user profile built from Personalization strategy.  The profile is structured by facet name used in the strategy. Each facet value is mapped to its score. Each score represents the user affinity for a specific facet value given the userToken past events and the Personalization strategy defined. Scores are bounded to 20. The last processed event timestamp is provided using the ISO 8601 format for debugging purposes.
         *
         * @summary Get a user profile.
         * @param getUserTokenProfile - The getUserTokenProfile object.
         * @param getUserTokenProfile.userToken - UserToken representing the user for which to fetch the Personalization profile.
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
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param post - The post object.
         * @param post.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param post.parameters - Query parameters to apply to the current query.
         * @param post.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        post({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `post`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * @summary Send requests to the Algolia REST API.
         * @param put - The put object.
         * @param put.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param put.parameters - Query parameters to apply to the current query.
         * @param put.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        put({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `put`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * A strategy defines the events and facets that impact user profiles and personalized search results.
         *
         * @summary Set a new strategy.
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
const apiClientVersion$1 = '5.0.0-alpha.84';
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
function createSearchClient({ appId: appIdOption, apiKey: apiKeyOption, authMode, algoliaAgents, ...options }) {
    const auth = createAuth(appIdOption, apiKeyOption, authMode);
    const transporter = createTransporter({
        hosts: getDefaultHosts(appIdOption),
        ...options,
        algoliaAgent: getAlgoliaAgent({
            algoliaAgents,
            client: 'Search',
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
         * Helper: Wait for a task to be published (completed) for a given `indexName` and `taskID`.
         *
         * @summary Helper method that waits for a task to be published (completed).
         * @param waitForTaskOptions - The waitForTaskOptions object.
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
         * Helper: Wait for an API key to be added, updated or deleted based on a given `operation`.
         *
         * @summary Helper method that waits for an API key task to be processed.
         * @param waitForApiKeyOptions - The waitForApiKeyOptions object.
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
                func: () => this.getApiKey({ key }, requestOptions).catch((error) => error),
                validate: (error) => operation === 'add' ? error.status !== 404 : error.status === 404,
            });
        },
        /**
         * Helper: Iterate on the `browse` method of the client to allow aggregating objects of an index.
         *
         * @summary Helper method that iterates on the `browse` method.
         * @param browseObjects - The browseObjects object.
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
         * @param browseObjects - The browseObjects object.
         * @param browseObjects.indexName - The index in which to perform the request.
         * @param browseObjects.searchRulesParams - The `searchRules` method parameters.
         * @param browseObjects.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
         * @param browseObjects.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
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
         * @param browseObjects - The browseObjects object.
         * @param browseObjects.indexName - The index in which to perform the request.
         * @param browseObjects.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
         * @param browseObjects.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
         * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchSynonyms` method and merged with the transporter requestOptions.
         */
        browseSynonyms({ indexName, validate, aggregator, ...browseSynonymsOptions }, requestOptions) {
            const params = {
                hitsPerPage: 1000,
                ...browseSynonymsOptions,
            };
            return createIterablePromise({
                func: (previousResponse) => {
                    return this.searchSynonyms({
                        ...params,
                        indexName,
                        page: previousResponse
                            ? previousResponse.page + 1
                            : browseSynonymsOptions.page || 0,
                    }, requestOptions);
                },
                validate: (response) => response.nbHits < params.hitsPerPage,
                ...browseSynonymsOptions,
            });
        },
        /**
         * Add a new API key with specific permissions and restrictions. The request must be authenticated with the admin API key. The response returns an API key string.
         *
         * @summary Add API key.
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
         * If you use an existing `objectID`, the existing record will be replaced with the new one.  To update only some attributes of an existing record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject) instead.  To add multiple records to your index in a single API request, use the [`batch` operation](#tag/Records/operation/batch).
         *
         * @summary Add or update a record (using objectID).
         * @param addOrUpdateObject - The addOrUpdateObject object.
         * @param addOrUpdateObject.indexName - Index on which to perform the request.
         * @param addOrUpdateObject.objectID - Unique record (object) identifier.
         * @param addOrUpdateObject.body - Algolia record.
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
         * Add a source to the list of allowed sources.
         *
         * @summary Add a source.
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
         * Assign or move a user ID to a cluster. The time it takes to move a user is proportional to the amount of data linked to the user ID.
         *
         * @summary Assign or move a user ID.
         * @param assignUserId - The assignUserId object.
         * @param assignUserId.xAlgoliaUserID - UserID to assign.
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
         * To reduce the time spent on network round trips, you can perform several write actions in a single API call. Actions are applied in the order they are specified. The supported `action`s are equivalent to the individual operations of the same name.
         *
         * @summary Batch write operations on one index.
         * @param batch - The batch object.
         * @param batch.indexName - Index on which to perform the request.
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
         * Assign multiple user IDs to a cluster. **You can\'t _move_ users with this operation.**.
         *
         * @summary Batch assign userIDs.
         * @param batchAssignUserIds - The batchAssignUserIds object.
         * @param batchAssignUserIds.xAlgoliaUserID - UserID to assign.
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
         * Add or remove a batch of dictionary entries.
         *
         * @summary Batch dictionary entries.
         * @param batchDictionaryEntries - The batchDictionaryEntries object.
         * @param batchDictionaryEntries.dictionaryName - Dictionary to search in.
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
         * Retrieve up to 1,000 records per call. Supports full-text search and filters. For better performance, it doesn\'t support: - The `distinct` query parameter - Sorting by typos, proximity, words, or geographical distance.
         *
         * @summary Get all records from an index.
         * @param browse - The browse object.
         * @param browse.indexName - Index on which to perform the request.
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
         * Delete all synonyms in the index.
         *
         * @summary Delete all synonyms.
         * @param clearAllSynonyms - The clearAllSynonyms object.
         * @param clearAllSynonyms.indexName - Index on which to perform the request.
         * @param clearAllSynonyms.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        clearAllSynonyms({ indexName, forwardToReplicas }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `clearAllSynonyms`.');
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
         * Delete the records but leave settings and index-specific API keys untouched.
         *
         * @summary Delete all records from an index.
         * @param clearObjects - The clearObjects object.
         * @param clearObjects.indexName - Index on which to perform the request.
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
         * Delete all rules in the index.
         *
         * @summary Delete all rules.
         * @param clearRules - The clearRules object.
         * @param clearRules.indexName - Index on which to perform the request.
         * @param clearRules.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
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
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param del - The del object.
         * @param del.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param del.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        del({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `del`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * Delete an existing API key. The request must be authenticated with the admin API key.
         *
         * @summary Delete API key.
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
         * This operation doesn\'t support all the query options, only its filters (numeric, facet, or tag) and geo queries. It doesn\'t accept empty filters or queries.
         *
         * @summary Delete all records matching a query.
         * @param deleteBy - The deleteBy object.
         * @param deleteBy.indexName - Index on which to perform the request.
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
         * Delete an existing index.
         *
         * @summary Delete index.
         * @param deleteIndex - The deleteIndex object.
         * @param deleteIndex.indexName - Index on which to perform the request.
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
         * To delete a set of records matching a query, use the [`deleteByQuery` operation](#tag/Records/operation/deleteBy) instead.
         *
         * @summary Delete a record.
         * @param deleteObject - The deleteObject object.
         * @param deleteObject.indexName - Index on which to perform the request.
         * @param deleteObject.objectID - Unique record (object) identifier.
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
         * Delete a rule by its `objectID`. To find the `objectID` for rules, use the [`search` operation](#tag/Rules/operation/searchRules).
         *
         * @summary Delete a rule.
         * @param deleteRule - The deleteRule object.
         * @param deleteRule.indexName - Index on which to perform the request.
         * @param deleteRule.objectID - Unique identifier of a rule object.
         * @param deleteRule.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
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
         * Remove a source from the list of allowed sources.
         *
         * @summary Remove a source.
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
         * Delete a synonym by its `objectID`. To find the object IDs of your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
         *
         * @summary Delete a synonym.
         * @param deleteSynonym - The deleteSynonym object.
         * @param deleteSynonym.indexName - Index on which to perform the request.
         * @param deleteSynonym.objectID - Unique identifier of a synonym object.
         * @param deleteSynonym.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
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
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param get - The get object.
         * @param get.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param get.parameters - Query parameters to apply to the current query.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        get({ path, parameters }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `get`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * Get the permissions and restrictions of a specific API key. When authenticating with the admin API key, you can request information for any of your application\'s keys. When authenticating with other API keys, you can only retrieve information for that key.
         *
         * @summary Get API key permissions.
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
         * Lists Algolia\'s [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/) and any customizations applied to each language\'s [stop word](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-stop-words/), [plural](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-plurals-and-other-declensions/), and [segmentation (compound)](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-segmentation/) features.
         *
         * @summary List available languages.
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
         * Get the languages for which [stop words are turned off](#tag/Dictionaries/operation/setDictionarySettings).
         *
         * @summary Get stop word settings.
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
         * The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl). Logs are held for the last seven days. There\'s also a logging limit of 1,000 API calls per server. This request counts towards your [operations quota](https://support.algolia.com/hc/en-us/articles/4406981829777-How-does-Algolia-count-records-and-operations-) but doesn\'t appear in the logs itself. > **Note**: To fetch the logs for a Distributed Search Network (DSN) cluster, target the [DSN\'s endpoint](https://www.algolia.com/doc/guides/scaling/distributed-search-network-dsn/#accessing-dsn-servers).
         *
         * @summary Return the latest log entries.
         * @param getLogs - The getLogs object.
         * @param getLogs.offset - First log entry to retrieve. Sorted by decreasing date with 0 being the most recent.
         * @param getLogs.length - Maximum number of entries to retrieve.
         * @param getLogs.indexName - Index for which log entries should be retrieved. When omitted, log entries are retrieved for all indices.
         * @param getLogs.type - Type of log entries to retrieve. When omitted, all log entries are retrieved.
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
         * To get more than one record, use the [`objects` operation](#tag/Records/operation/getObjects).
         *
         * @summary Get a record.
         * @param getObject - The getObject object.
         * @param getObject.indexName - Index on which to perform the request.
         * @param getObject.objectID - Unique record (object) identifier.
         * @param getObject.attributesToRetrieve - Attributes to include with the records in the response. This is useful to reduce the size of the API response. By default, all retrievable attributes are returned. `objectID` is always retrieved, even when not specified. [`unretrievableAttributes`](https://www.algolia.com/doc/api-reference/api-parameters/unretrievableAttributes/) won\'t be retrieved unless the request is authenticated with the admin API key.
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
         * Retrieve one or more records, potentially from different indices, in a single API operation. Results will be received in the same order as the requests.
         *
         * @summary Get multiple records.
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
         * Get a rule by its `objectID`. To find the `objectID` for rules, use the [`search` operation](#tag/Rules/operation/searchRules).
         *
         * @summary Get a rule.
         * @param getRule - The getRule object.
         * @param getRule.indexName - Index on which to perform the request.
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
         * Return an object containing an index\'s [configuration settings](https://www.algolia.com/doc/api-reference/settings-api-parameters/).
         *
         * @summary Get index settings.
         * @param getSettings - The getSettings object.
         * @param getSettings.indexName - Index on which to perform the request.
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
         * Get all allowed sources (IP addresses).
         *
         * @summary Get all allowed IP addresses.
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
         * Get a syonym by its `objectID`. To find the object IDs for your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
         *
         * @summary Get a synonym object.
         * @param getSynonym - The getSynonym object.
         * @param getSynonym.indexName - Index on which to perform the request.
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
         * Some operations, such as copying an index, will respond with a `taskID` value. Use this value here to check the status of that task.
         *
         * @summary Check a task\'s status.
         * @param getTask - The getTask object.
         * @param getTask.indexName - Index on which to perform the request.
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
         * Get the IDs of the 10 users with the highest number of records per cluster. Since it can take up to a few seconds to get the data from the different clusters, the response isn\'t real-time.
         *
         * @summary Get top userID.
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
         * Returns the userID data stored in the mapping. Since it can take up to a few seconds to get the data from the different clusters, the response isn\'t real-time.
         *
         * @summary Get userID.
         * @param getUserId - The getUserId object.
         * @param getUserId.userID - UserID to assign.
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
         * @summary Get migration and user mapping status.
         * @param hasPendingMappings - The hasPendingMappings object.
         * @param hasPendingMappings.getClusters - Indicates whether to include the cluster\'s pending mapping state in the response.
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
         * List all API keys associated with your Algolia application, including their permissions and restrictions.
         *
         * @summary List API keys.
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
         * List the available clusters in a multi-cluster setup.
         *
         * @summary List clusters.
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
         * List indices in an Algolia application.
         *
         * @summary List indices.
         * @param listIndices - The listIndices object.
         * @param listIndices.page - Returns the requested page number. The page size is determined by the `hitsPerPage` parameter. You can see the number of available pages in the `nbPages` response attribute. When `page` is null, the API response is not paginated.
         * @param listIndices.hitsPerPage - Maximum number of hits per page.
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
         * List the userIDs assigned to a multi-cluster application. Since it can take up to a few seconds to get the data from the different clusters, the response isn\'t real-time.
         *
         * @summary List userIDs.
         * @param listUserIds - The listUserIds object.
         * @param listUserIds.page - Returns the requested page number. The page size is determined by the `hitsPerPage` parameter. You can see the number of available pages in the `nbPages` response attribute. When `page` is null, the API response is not paginated.
         * @param listUserIds.hitsPerPage - Maximum number of hits per page.
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
         * To reduce the time spent on network round trips, you can perform several write actions in a single request. It\'s a multi-index version of the [`batch` operation](#tag/Records/operation/batch). Actions are applied in the order they are specified. The supported actions are equivalent to the individual operations of the same name.
         *
         * @summary Batch write operations on multiple indices.
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
         * This `operation`, _copy_ or _move_, will copy or move a source index\'s (`IndexName`) records, settings, synonyms, and rules to a `destination` index. If the destination index exists, it will be replaced, except for index-specific API keys and analytics data. If the destination index doesn\'t exist, it will be created.  The choice between moving or copying an index depends on your needs. Choose:  - **Move** to rename an index. - **Copy** to create a new index with the same records and configuration as an existing one.  > **Note**: When considering copying or moving, be aware of the [rate limitations](https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits) on these processes and the [impact on your analytics data](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/concepts/indices-analytics/).
         *
         * @summary Copy, move, or rename an index.
         * @param operationIndex - The operationIndex object.
         * @param operationIndex.indexName - Index on which to perform the request.
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
         * Add new attributes or update current ones in an existing record. You can use any first-level attribute but not nested attributes. If you specify a [nested attribute](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/creating-and-using-nested-attributes/), the engine treats it as a replacement for its first-level ancestor.
         *
         * @summary Update record attributes.
         * @param partialUpdateObject - The partialUpdateObject object.
         * @param partialUpdateObject.indexName - Index on which to perform the request.
         * @param partialUpdateObject.objectID - Unique record (object) identifier.
         * @param partialUpdateObject.attributesToUpdate - Object with attributes to update.
         * @param partialUpdateObject.createIfNotExists - Indicates whether to create a new record if it doesn\'t exist yet.
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
         * This method allow you to send requests to the Algolia REST API.
         *
         * @summary Send requests to the Algolia REST API.
         * @param post - The post object.
         * @param post.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param post.parameters - Query parameters to apply to the current query.
         * @param post.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        post({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `post`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * @summary Send requests to the Algolia REST API.
         * @param put - The put object.
         * @param put.path - Path of the endpoint, anything after \"/1\" must be specified.
         * @param put.parameters - Query parameters to apply to the current query.
         * @param put.body - Parameters to send with the custom request.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        put({ path, parameters, body }, requestOptions) {
            if (!path) {
                throw new Error('Parameter `path` is required when calling `put`.');
            }
            const requestPath = '/1{path}'.replace('{path}', path);
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
         * Remove a userID and its associated data from the multi-clusters.
         *
         * @summary Remove userID.
         * @param removeUserId - The removeUserId object.
         * @param removeUserId.userID - UserID to assign.
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
         * Replace all allowed sources.
         *
         * @summary Replace all sources.
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
         * Restore a deleted API key, along with its associated permissions. The request must be authenticated with the admin API key.
         *
         * @summary Restore API key.
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
         * Add a record (object) to an index or replace it. If the record doesn\'t contain an `objectID`, Algolia automatically adds it. If you use an existing `objectID`, the existing record is replaced with the new one. To add multiple records to your index in a single API request, use the [`batch` operation](#tag/Records/operation/batch).
         *
         * @summary Add or update a record.
         * @param saveObject - The saveObject object.
         * @param saveObject.indexName - Index on which to perform the request.
         * @param saveObject.body - The Algolia record.
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
         * To create or update more than one rule, use the [`batch` operation](#tag/Rules/operation/saveRules).
         *
         * @summary Create or update a rule.
         * @param saveRule - The saveRule object.
         * @param saveRule.indexName - Index on which to perform the request.
         * @param saveRule.objectID - Unique identifier of a rule object.
         * @param saveRule.rule - The rule object.
         * @param saveRule.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
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
         * Create or update multiple rules.
         *
         * @summary Save a batch of rules.
         * @param saveRules - The saveRules object.
         * @param saveRules.indexName - Index on which to perform the request.
         * @param saveRules.rules - The rules object.
         * @param saveRules.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
         * @param saveRules.clearExistingRules - Indicates whether existing rules should be deleted before adding this batch.
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
         * Add a [synonym](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#the-different-types-of-synonyms) to an index or replace it. If the synonym `objectID` doesn\'t exist, Algolia adds a new one. If you use an existing synonym `objectID`, the existing synonym is replaced with the new one. To add multiple synonyms in a single API request, use the [`batch` operation](#tag/Synonyms/operation/saveSynonyms).
         *
         * @summary Save a synonym.
         * @param saveSynonym - The saveSynonym object.
         * @param saveSynonym.indexName - Index on which to perform the request.
         * @param saveSynonym.objectID - Unique identifier of a synonym object.
         * @param saveSynonym.synonymHit - The synonymHit object.
         * @param saveSynonym.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
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
         * Create or update multiple synonyms.
         *
         * @summary Save a batch of synonyms.
         * @param saveSynonyms - The saveSynonyms object.
         * @param saveSynonyms.indexName - Index on which to perform the request.
         * @param saveSynonyms.synonymHit - The synonymHit object.
         * @param saveSynonyms.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
         * @param saveSynonyms.replaceExistingSynonyms - Indicates whether to replace all synonyms in the index with the ones sent with this request.
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
         * Send multiple search queries to one or more indices.
         *
         * @summary Search multiple indices.
         * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
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
         * Search for standard and [custom](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-stop-words/) entries in the [stop words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-stop-words/), [plurals](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-plurals-and-other-declensions/), or [segmentation (compounds)](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-segmentation/) dictionaries.
         *
         * @summary Search dictionary entries.
         * @param searchDictionaryEntries - The searchDictionaryEntries object.
         * @param searchDictionaryEntries.dictionaryName - Dictionary to search in.
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
         * [Search for a facet\'s values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values), optionally restricting the returned values to those contained in records matching other search criteria. > **Note**: Pagination isn\'t supported (`page` and `hitsPerPage` are ignored). By default, the engine returns a maximum of 10 values but you can adjust this with `maxFacetHits`.
         *
         * @summary Search for facet values.
         * @param searchForFacetValues - The searchForFacetValues object.
         * @param searchForFacetValues.indexName - Index on which to perform the request.
         * @param searchForFacetValues.facetName - Facet name.
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
         * Search for rules in your index. You can control the search with parameters. To list all rules, send an empty request body.
         *
         * @summary Search for rules.
         * @param searchRules - The searchRules object.
         * @param searchRules.indexName - Index on which to perform the request.
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
         * Return records that match the query.
         *
         * @summary Search an index.
         * @param searchSingleIndex - The searchSingleIndex object.
         * @param searchSingleIndex.indexName - Index on which to perform the request.
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
         * Search for synonyms in your index. You can control and filter the search with parameters. To get all synonyms, send an empty request body.
         *
         * @summary Search for synonyms.
         * @param searchSynonyms - The searchSynonyms object.
         * @param searchSynonyms.indexName - Index on which to perform the request.
         * @param searchSynonyms.type - Search for specific [types of synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#the-different-types-of-synonyms).
         * @param searchSynonyms.page - Returns the requested page number (the first page is 0). Page size is set by `hitsPerPage`. When null, there\'s no pagination.
         * @param searchSynonyms.hitsPerPage - Maximum number of hits per page.
         * @param searchSynonyms.searchSynonymsParams - Body of the `searchSynonyms` operation.
         * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
         */
        searchSynonyms({ indexName, type, page, hitsPerPage, searchSynonymsParams, }, requestOptions) {
            if (!indexName) {
                throw new Error('Parameter `indexName` is required when calling `searchSynonyms`.');
            }
            const requestPath = '/1/indexes/{indexName}/synonyms/search'.replace('{indexName}', encodeURIComponent(indexName));
            const headers = {};
            const queryParameters = {};
            if (type !== undefined) {
                queryParameters.type = type.toString();
            }
            if (page !== undefined) {
                queryParameters.page = page.toString();
            }
            if (hitsPerPage !== undefined) {
                queryParameters.hitsPerPage = hitsPerPage.toString();
            }
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
         * Since it can take up to a few seconds to get the data from the different clusters, the response isn\'t real-time. To ensure rapid updates, the user IDs index isn\'t built at the same time as the mapping. Instead, it\'s built every 12 hours, at the same time as the update of user ID usage. For example, if you add or move a user ID, the search will show an old value until the next time the mapping is rebuilt (every 12 hours).
         *
         * @summary Search for a user ID.
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
         * Set stop word settings for a specific language.
         *
         * @summary Set stop word settings.
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
         * Update the specified [index settings](https://www.algolia.com/doc/api-reference/settings-api-parameters/). Specifying null for a setting resets it to its default value.
         *
         * @summary Update index settings.
         * @param setSettings - The setSettings object.
         * @param setSettings.indexName - Index on which to perform the request.
         * @param setSettings.indexSettings - The indexSettings object.
         * @param setSettings.forwardToReplicas - Indicates whether changed index settings are forwarded to the replica indices.
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
         * Replace the permissions of an existing API key. Any unspecified parameter resets that permission to its default value. The request must be authenticated with the admin API key.
         *
         * @summary Update an API key.
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
const apiClientVersion = apiClientVersion$1;
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
        initAnalytics,
        initPersonalization,
        initAbtesting,
    };
}

export { algoliasearch, apiClientVersion };
