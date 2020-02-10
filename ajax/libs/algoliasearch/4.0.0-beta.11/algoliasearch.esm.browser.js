function createBrowserLocalStorageCache(options) {
    /* eslint-disable functional/immutable-data */
    const storage = options.localStorage || window.localStorage;
    const namespaceKey = `algoliasearch-client-js-${options.key}`;
    // eslint-disable-next-line functional/prefer-readonly-type
    const getNamespace = () => {
        return JSON.parse(storage.getItem(namespaceKey) || '{}');
    };
    return {
        get(key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            return Promise.resolve()
                .then(() => {
                const keyAsString = JSON.stringify(key);
                const value = getNamespace()[keyAsString];
                return Promise.all([value || defaultValue(), value !== undefined]);
            })
                .then(([value, exists]) => {
                return Promise.all([value, exists || events.miss(value)]);
            })
                .then(([value]) => value);
        },
        set(key, value) {
            return Promise.resolve().then(() => {
                const namespace = getNamespace();
                namespace[JSON.stringify(key)] = value;
                storage.setItem(namespaceKey, JSON.stringify(namespace));
                return value;
            });
        },
        delete(key) {
            return Promise.resolve().then(() => {
                const namespace = getNamespace();
                delete namespace[JSON.stringify(key)];
                storage.setItem(namespaceKey, JSON.stringify(namespace));
            });
        },
    };
}

// @todo Add logger on options to debug when caches go wrong.
function createFallbackableCache(options) {
    const caches = [...options.caches];
    // eslint-disable-next-line functional/immutable-data
    const current = caches.shift();
    if (current === undefined) {
        return createNullCache();
    }
    return {
        get(key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            return current.get(key, defaultValue, events).catch(() => {
                return createFallbackableCache({ caches }).get(key, defaultValue, events);
            });
        },
        set(key, value) {
            return current.set(key, value).catch(() => {
                return createFallbackableCache({ caches }).set(key, value);
            });
        },
        delete(key) {
            return current.delete(key).catch(() => {
                return createFallbackableCache({ caches }).delete(key);
            });
        },
    };
}

function createNullCache() {
    return {
        get(_key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            const value = defaultValue();
            return value
                .then(result => Promise.all([result, events.miss(result)]))
                .then(([result]) => result);
        },
        set(_key, value) {
            return Promise.resolve(value);
        },
        delete(_key) {
            return Promise.resolve();
        },
    };
}

function createInMemoryCache(options = { serializable: true }) {
    /* eslint-disable functional/immutable-data, functional/no-let, functional/prefer-readonly-type */
    const cache = {};
    return {
        get(key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            const keyAsString = JSON.stringify(key);
            if (keyAsString in cache) {
                return Promise.resolve(options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]);
            }
            const promise = defaultValue();
            const miss = (events && events.miss) || (() => Promise.resolve());
            return promise.then((value) => miss(value)).then(() => promise);
        },
        set(key, value) {
            cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;
            return Promise.resolve(value);
        },
        delete(key) {
            delete cache[JSON.stringify(key)];
            return Promise.resolve();
        },
    };
}

function createAuth(authMode, appId, apiKey) {
    const credentials = {
        'x-algolia-api-key': apiKey,
        'x-algolia-application-id': appId,
    };
    return {
        headers() {
            return authMode === AuthMode.WithinHeaders ? credentials : {};
        },
        queryParameters() {
            return authMode === AuthMode.WithinQueryParameters ? credentials : {};
        },
    };
}

function createRetryablePromise(callback) {
    // eslint-disable-next-line functional/no-let
    let retriesCount = 0;
    const retry = () => {
        retriesCount++;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(callback(retry));
            }, Math.min(100 * retriesCount, 1000));
        });
    };
    return callback(retry);
}

function createWaitablePromise(promise, wait = (_response, _requestOptions) => {
    return Promise.resolve();
}) {
    // eslint-disable-next-line functional/immutable-data
    return Object.assign(promise, {
        wait(requestOptions) {
            return createWaitablePromise(promise
                .then(response => Promise.all([wait(response, requestOptions), response]))
                .then(promiseResults => promiseResults[1]));
        },
    });
}

// eslint-disable-next-line functional/prefer-readonly-type
function shuffle(array) {
    let c = array.length - 1; // eslint-disable-line functional/no-let
    // eslint-disable-next-line functional/no-loop-statement
    for (c; c > 0; c--) {
        const b = Math.floor(Math.random() * (c + 1));
        const a = array[c];
        array[c] = array[b]; // eslint-disable-line functional/immutable-data, no-param-reassign
        array[b] = a; // eslint-disable-line functional/immutable-data, no-param-reassign
    }
    return array;
}
function addMethods(base, methods) {
    Object.keys(methods !== undefined ? methods : {}).forEach(key => {
        // @ts-ignore
        // eslint-disable-next-line functional/immutable-data, no-param-reassign
        base[key] = methods[key](base);
    });
    // @ts-ignore
    return base;
}
function encode(format, ...args) {
    // eslint-disable-next-line functional/no-let
    let i = 0;
    return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}

const version = '4.0.0-beta.11';

const AuthMode = {
    WithinQueryParameters: 0,
    WithinHeaders: 1,
};

function createMappedRequestOptions(requestOptions, timeout) {
    const options = requestOptions || {};
    // eslint-disable-next-line functional/prefer-readonly-type
    const data = options.data || {};
    Object.keys(options).forEach(key => {
        if (['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(key) === -1) {
            data[key] = options[key]; // eslint-disable-line functional/immutable-data
        }
    });
    return {
        data: Object.entries(data).length > 0 ? data : undefined,
        timeout: options.timeout || timeout,
        headers: options.headers || {},
        queryParameters: options.queryParameters || {},
        cacheable: options.cacheable,
    };
}

const CallEnum = {
    Read: 1,
    Write: 2,
    Any: 3,
};

const HostStatusEnum = {
    Up: 1,
    Down: 2,
    Timeouted: 3,
};

// By default, API Clients at Algolia have expiration delay
// of 5 mins. In the JavaScript client, we have 2 mins.
const EXPIRATION_DELAY = 2 * 60 * 1000;
function createStatefulHost(host, status = HostStatusEnum.Up) {
    return {
        ...host,
        status,
        lastUpdate: Date.now(),
    };
}
function isStatefulHostUp(host) {
    return host.status === HostStatusEnum.Up || Date.now() - host.lastUpdate > EXPIRATION_DELAY;
}
function isStatefulHostTimeouted(host) {
    return (host.status === HostStatusEnum.Timeouted && Date.now() - host.lastUpdate <= EXPIRATION_DELAY);
}

function createStatelessHost(options) {
    return {
        protocol: options.protocol || 'https',
        url: options.url,
        accept: options.accept,
    };
}

function createRetryableOptions(hostsCache, statelessHosts
// eslint-disable-next-line functional/prefer-readonly-type
) {
    return Promise.all(statelessHosts.map(statelessHost => {
        return hostsCache.get(statelessHost, () => {
            return Promise.resolve(createStatefulHost(statelessHost));
        });
    })).then(statefulHosts => {
        const hostsUp = statefulHosts.filter(host => isStatefulHostUp(host));
        const hostsTimeouted = statefulHosts.filter(host => isStatefulHostTimeouted(host));
        /**
         * Note, we put the hosts that previously timeouted on the end of the list.
         */
        const hostsAvailable = [...hostsUp, ...hostsTimeouted];
        const statelessHostsAvailable = hostsAvailable.length > 0
            ? hostsAvailable.map(host => createStatelessHost(host))
            : statelessHosts;
        return {
            getTimeout(timeoutsCount, baseTimeout) {
                /**
                 * Imagine that you have 4 hosts, if timeouts will increase
                 * on the following way: 1 (timeouted) > 4 (timeouted) > 5 (200)
                 *
                 * Note that, the very next request, we start from the previous timeout
                 *
                 *  5 (timeouted) > 6 (timeouted) > 7 ...
                 *
                 * This strategy may need to be reviewed, but is the strategy on the our
                 * current v3 version.
                 */
                const timeoutMultiplier = hostsTimeouted.length === 0 && timeoutsCount === 0
                    ? 1
                    : hostsTimeouted.length + 3 + timeoutsCount;
                return timeoutMultiplier * baseTimeout;
            },
            statelessHosts: statelessHostsAvailable,
        };
    });
}

const isNetworkError = ({ isTimedOut, status }) => {
    return !isTimedOut && ~~status === 0;
};
const isRetryable = (response) => {
    const status = response.status;
    const isTimedOut = response.isTimedOut;
    return (isTimedOut || isNetworkError(response) || (~~(status / 100) !== 2 && ~~(status / 100) !== 4));
};
const isSuccess = ({ status }) => {
    return ~~(status / 100) === 2;
};
const retryDecision = (response, outcomes) => {
    if (isRetryable(response)) {
        return outcomes.onRetry(response);
    }
    if (isSuccess(response)) {
        return outcomes.onSucess(response);
    }
    return outcomes.onFail(response);
};

function retryableRequest(transporter, statelessHosts, request, requestOptions) {
    const stackTrace = []; // eslint-disable-line functional/prefer-readonly-type
    /**
     * First we prepare the payload that do not depend from hosts.
     */
    const data = serializeData(request, requestOptions);
    const headers = { ...transporter.headers, ...requestOptions.headers };
    const method = request.method;
    const queryParameters = {
        ...transporter.queryParameters,
        ...requestOptions.queryParameters,
        'x-algolia-agent': transporter.userAgent.value,
    };
    let timeoutsCount = 0; // eslint-disable-line functional/no-let
    const retry = (hosts, // eslint-disable-line functional/prefer-readonly-type
    getTimeout) => {
        /**
         * We iterate on each host, until there is no host left.
         */
        const host = hosts.pop(); // eslint-disable-line functional/immutable-data
        if (host === undefined) {
            throw createRetryError(stackTrace);
        }
        const payload = {
            data,
            headers,
            method,
            url: serializeUrl(host, request.path, queryParameters),
            connectTimeout: getTimeout(timeoutsCount, transporter.timeouts.connect),
            responseTimeout: getTimeout(timeoutsCount, requestOptions.timeout),
        };
        const decisions = {
            onSucess: response => deserializeSuccess(response),
            onRetry(response) {
                const stackFrame = {
                    request: payload,
                    response,
                    host,
                    triesLeft: hosts.length,
                };
                /**
                 * The stackFrace is pushed to the stackTrace so we
                 * can have information about the failures once a
                 * retry error is thrown.
                 */
                stackTrace.push(stackFrame); // eslint-disable-line functional/immutable-data
                /**
                 * If response is a timeout, we increaset the number of
                 * timeouts so we can increase the timeout later.
                 */
                if (response.isTimedOut) {
                    timeoutsCount++; // eslint-disable-line no-param-reassign
                }
                return Promise.all([
                    /**
                     * Failures are individually send the logger, allowing
                     * the end user to debug / store stack frames even
                     * when a retry error does not happen.
                     */
                    transporter.logger.debug('Retryable failure', stackFrame),
                    /**
                     * We also store the state of the host in failure cases. If the host, is
                     * down it will remain down for the next 2 minutes. In a timeout situation,
                     * this host will be added end of the list of hosts on the next request.
                     */
                    transporter.hostsCache.set(host, createStatefulHost(host, response.isTimedOut ? HostStatusEnum.Timeouted : HostStatusEnum.Down)),
                ]).then(() => retry(hosts, getTimeout));
            },
            onFail(response) {
                throw deserializeFailure(response);
            },
        };
        return transporter.requester.send(payload).then(response => {
            return retryDecision(response, decisions);
        });
    };
    /**
     * Finally, for each retryable host perform request until we got a non
     * retryable response. Some notes here:
     *
     * 1. The reverse here is applied so we can apply a `pop` later on => more performant.
     * 2. We also get from the retryable options a timeout multiplier that is tailored
     * for the current context.
     */
    return createRetryableOptions(transporter.hostsCache, statelessHosts).then(options => {
        return retry([...options.statelessHosts].reverse(), options.getTimeout);
    });
}

function createTransporter(options) {
    const { hostsCache, logger, requester, requestsCache, responsesCache, timeouts, userAgent, } = options;
    const transporter = {
        hostsCache,
        logger,
        requester,
        requestsCache,
        responsesCache,
        timeouts,
        userAgent,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        headers: {},
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        queryParameters: {},
        hosts: [],
        addHeaders(headers) {
            // eslint-disable-next-line functional/immutable-data
            Object.assign(transporter.headers, headers);
        },
        addQueryParameters(queryParameters) {
            // eslint-disable-next-line functional/immutable-data
            Object.assign(transporter.queryParameters, queryParameters);
        },
        setHosts(values) {
            // eslint-disable-next-line functional/immutable-data
            transporter.hosts = values.map(hostOptions => createStatelessHost(hostOptions));
        },
        read(request, requestOptions) {
            /**
             * First, we compute the user request options. Now, keep in mind,
             * that using request options the user is able to modified the intire
             * payload of the request. Such as headers, query parameters, and others.
             */
            const mappedRequestOptions = createMappedRequestOptions(requestOptions, transporter.timeouts.read);
            const createRetryableRequest = () => {
                /**
                 * Then, we prepare a function factory that contains the construction of
                 * the retryable request. At this point, we may *not* perform the actual
                 * request. But we want to have the function factory ready.
                 */
                return retryableRequest(transporter, transporter.hosts.filter(host => (host.accept & CallEnum.Read) !== 0), request, mappedRequestOptions);
            };
            /**
             * Once we have the function factory ready, we need to determine of the
             * request is "cacheable" - should be cached. Note that, once again,
             * the user can force this option.
             */
            const cacheable = mappedRequestOptions.cacheable !== undefined
                ? mappedRequestOptions.cacheable
                : request.cacheable;
            /**
             * If is not "cacheable", we immediatly trigger the retryable request, no
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
                mappedRequestOptions,
                transporter: {
                    queryParameters: transporter.queryParameters,
                    headers: transporter.headers,
                },
            };
            /**
             * With the computed key, we first ask the responses cache
             * implemention if this request was been resolved before.
             */
            return transporter.responsesCache.get(key, () => {
                /**
                 * If the request has never resolved before, we actually ask if there
                 * is a current request with the same key on progress.
                 */
                return transporter.requestsCache.get(key, () => {
                    return (transporter.requestsCache
                        /**
                         * Finally, if there is no request in progress with the same key,
                         * this `createRetryableRequest()` will actually trigger the
                         * retryable request.
                         */
                        .set(key, createRetryableRequest())
                        .then(response => Promise.all([transporter.requestsCache.delete(key), response]), err => Promise.all([transporter.requestsCache.delete(key), Promise.reject(err)]))
                        .then(([_, response]) => response));
                });
            }, {
                /**
                 * Of course, once we get this response back from the server, we
                 * tell response cache to actually store the received response
                 * to be used later.
                 */
                miss: response => transporter.responsesCache.set(key, response),
            });
        },
        write(request, requestOptions) {
            /**
             * On write requests, no cache mechanisms are applied, and we
             * proxy the request immediately to the requester.
             */
            return retryableRequest(transporter, transporter.hosts.filter(host => (host.accept & CallEnum.Write) !== 0), request, createMappedRequestOptions(requestOptions, transporter.timeouts.write));
        },
    };
    return transporter;
}

function createUserAgent(version) {
    // eslint-disable-next-line functional/no-let
    const userAgent = {
        value: `Algolia for JavaScript (${version})`,
        add(options) {
            const addedUserAgent = `; ${options.segment}${options.version !== undefined ? ` (${options.version})` : ''}`;
            if (userAgent.value.indexOf(addedUserAgent) === -1) {
                // eslint-disable-next-line functional/immutable-data
                userAgent.value = `${userAgent.value}${addedUserAgent}`;
            }
            return userAgent;
        },
    };
    return userAgent;
}

function createDeserializationError(message, response) {
    return {
        name: 'DeserializationError',
        message,
        response,
    };
}

function deserializeSuccess(response) {
    // eslint-disable-next-line functional/no-try-statement
    try {
        return JSON.parse(response.content);
    }
    catch (e) {
        throw createDeserializationError(e.message, response);
    }
}
function deserializeFailure({ content, status }) {
    // eslint-disable-next-line functional/no-let
    let message = content;
    // eslint-disable-next-line functional/no-try-statement
    try {
        message = JSON.parse(content).message;
    }
    catch (e) {
        // ..
    }
    return createApiError(message, status);
}

function serializeUrl(host, path, queryParameters) {
    const queryParametersAsString = serializeQueryParameters(queryParameters);
    // eslint-disable-next-line functional/no-let
    let url = `${host.protocol}://${host.url}/${path.charAt(0) === '/' ? path.substr(1) : path}`;
    if (queryParametersAsString.length) {
        url += `?${queryParametersAsString}`;
    }
    return url;
}
function serializeQueryParameters(parameters) {
    const isObjectOrArray = (value) => Object.prototype.toString.call(value) === '[object Object]' ||
        Object.prototype.toString.call(value) === '[object Array]';
    return Object.keys(parameters)
        .map(key => encode('%s=%s', key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]))
        .join('&');
}
function serializeData(request, requestOptions) {
    if (request.data === undefined && requestOptions.data === undefined) {
        return undefined;
    }
    const data = Array.isArray(request.data)
        ? request.data
        : { ...request.data, ...requestOptions.data };
    return JSON.stringify(data);
}

function createApiError(message, status) {
    return {
        name: 'ApiError',
        message,
        status,
    };
}

function createRetryError(stackTrace) {
    return {
        name: 'RetryError',
        message: 'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
        stackTrace,
    };
}

const createAnalyticsClient = options => {
    const region = options.region || 'us';
    const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);
    const transporter = createTransporter({
        ...options,
        // No retry strategy on recommendation client
        hostsCache: createNullCache(),
    });
    const appId = options.appId;
    transporter.setHosts([{ url: `analytics.${region}.algolia.com`, accept: CallEnum.Any }]);
    transporter.addHeaders({
        ...auth.headers(),
        ...{ 'content-type': 'application/json' },
    });
    transporter.addQueryParameters(auth.queryParameters());
    return addMethods({ appId, transporter }, options.methods);
};

const MethodEnum = {
    Delete: 'DELETE',
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
};

const addABTest = (base) => {
    return (abTest, requestOptions) => {
        return base.transporter.write({
            method: MethodEnum.Post,
            path: '2/abtests',
            data: abTest,
        }, requestOptions);
    };
};

const deleteABTest = (base) => {
    return (abTestID, requestOptions) => {
        return base.transporter.write({
            method: MethodEnum.Delete,
            path: encode('2/abtests/%s', abTestID),
        }, requestOptions);
    };
};

const getABTest = (base) => {
    return (abTestID, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: encode('2/abtests/%s', abTestID),
        }, requestOptions);
    };
};

const getABTests = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: '2/abtests',
        }, requestOptions);
    };
};

const stopABTest = (base) => {
    return (abTestID, requestOptions) => {
        return base.transporter.write({
            method: MethodEnum.Post,
            path: encode('2/abtests/%s/stop', abTestID),
        }, requestOptions);
    };
};

const createRecommendationClient = options => {
    const region = options.region || 'us';
    const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);
    const transporter = createTransporter({
        ...options,
        // No retry strategy on recommendation client
        hostsCache: createNullCache(),
    });
    const appId = options.appId;
    transporter.setHosts([{ url: `recommendation.${region}.algolia.com`, accept: CallEnum.Any }]);
    transporter.addHeaders({
        ...auth.headers(),
        ...{ 'content-type': 'application/json' },
    });
    transporter.addQueryParameters(auth.queryParameters());
    return addMethods({ appId, transporter }, options.methods);
};

const getPersonalizationStrategy = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: '1/strategies/personalization',
        }, requestOptions);
    };
};

const setPersonalizationStrategy = (base) => {
    return (personalizationStrategy, requestOptions) => {
        return base.transporter.write({
            method: MethodEnum.Post,
            path: '1/strategies/personalization',
            data: personalizationStrategy,
        }, requestOptions);
    };
};

function createBrowsablePromise(options) {
    return new Promise(resolve => {
        const data = { page: 0 };
        const browse = () => {
            return options.request(data).then(response => {
                if (options.batch !== undefined) {
                    options.batch(response.hits);
                }
                if (options.shouldStop(response)) {
                    return resolve();
                }
                // eslint-disable-next-line functional/immutable-data
                data.page++;
                return browse();
            });
        };
        return browse();
    });
}

const createSearchClient = options => {
    const appId = options.appId;
    const transporter = createTransporter(options);
    transporter.setHosts([
        { url: `${appId}-dsn.algolia.net`, accept: CallEnum.Read },
        { url: `${appId}.algolia.net`, accept: CallEnum.Write },
    ].concat(shuffle([
        { url: `${appId}-1.algolianet.com`, accept: CallEnum.Any },
        { url: `${appId}-2.algolianet.com`, accept: CallEnum.Any },
        { url: `${appId}-3.algolianet.com`, accept: CallEnum.Any },
    ])));
    const auth = createAuth(options.authMode !== undefined ? options.authMode : AuthMode.WithinHeaders, appId, options.apiKey);
    transporter.addHeaders({
        ...auth.headers(),
        ...{ 'content-type': 'application/x-www-form-urlencoded' },
    });
    transporter.addQueryParameters(auth.queryParameters());
    const base = {
        transporter,
        appId,
        addAlgoliaAgent(segment, version) {
            transporter.userAgent.add({ segment, version });
        },
    };
    return addMethods(base, options.methods);
};

function createMissingObjectIDError() {
    return {
        name: 'MissingObjectIDError',
        message: 'All objects must have an unique objectID ' +
            '(like a primary key) to be valid. ' +
            'Algolia is also able to generate objectIDs ' +
            "automatically but *it's not recommended*. " +
            'To do it, use `saveObjects(objects, ' +
            "{'autoGenerateObjectIDIfNotExist': true})`.",
    };
}

function createObjectNotFoundError() {
    return {
        name: 'ObjectNotFoundError',
        message: 'Object not found.',
    };
}

const addApiKey = (base) => {
    return (acl, requestOptions) => {
        const { queryParameters, ...options } = requestOptions || {};
        const data = {
            acl,
            ...(queryParameters !== undefined ? { queryParameters } : {}),
        };
        const wait = (response, waitRequestOptions) => {
            return createRetryablePromise(retry => {
                return getApiKey(base)(response.key, waitRequestOptions).catch((apiError) => {
                    if (apiError.status === 404) {
                        throw apiError;
                    }
                    return retry();
                });
            });
        };
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: '1/keys',
            data,
        }, options), wait);
    };
};

const copyIndex = (base) => {
    return (from, to, requestOptions) => {
        const wait = (response, waitRequestOptions) => {
            return initIndex(base)(from, {
                methods: { waitTask },
            }).waitTask(response.taskID, waitRequestOptions);
        };
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/operation', from),
            data: {
                operation: 'copy',
                destination: to,
            },
        }, requestOptions), wait);
    };
};

const copySettings = (base) => {
    return (from, to, requestOptions) => {
        return copyIndex(base)(from, to, {
            ...(requestOptions === undefined ? {} : requestOptions),
            scope: [ScopeEnum.Settings],
        });
    };
};

const copySynonyms = (base) => {
    return (from, to, requestOptions) => {
        return copyIndex(base)(from, to, {
            ...(requestOptions === undefined ? {} : requestOptions),
            scope: [ScopeEnum.Synonyms],
        });
    };
};

const deleteApiKey = (base) => {
    return (apiKey, requestOptions) => {
        const wait = (_, waitRequestOptions) => {
            return createRetryablePromise(retry => {
                return getApiKey(base)(apiKey, waitRequestOptions)
                    .catch((apiError) => {
                    if (apiError.status !== 404) {
                        throw apiError;
                    }
                })
                    .then(retry);
            });
        };
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Delete,
            path: encode('1/keys/%s', apiKey),
        }, requestOptions), wait);
    };
};

const getApiKey = (base) => {
    return (apiKey, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: encode('1/keys/%s', apiKey),
        }, requestOptions);
    };
};

const getLogs = (base) => {
    return (requestOptions) => {
        const { length, offset, type, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (length) {
            mappedRequestOptions.queryParameters.length = length; // eslint-disable-line functional/immutable-data
        }
        if (offset) {
            mappedRequestOptions.queryParameters.offset = offset; // eslint-disable-line functional/immutable-data
        }
        if (type) {
            mappedRequestOptions.queryParameters.type = type; // eslint-disable-line functional/immutable-data
        }
        return base.transporter.read({
            method: MethodEnum.Get,
            path: '1/logs',
        }, mappedRequestOptions);
    };
};

const initIndex = (base) => {
    return (indexName, options = {}) => {
        const searchIndex = {
            transporter: base.transporter,
            appId: base.appId,
            indexName,
        };
        return addMethods(searchIndex, options.methods);
    };
};

const listApiKeys = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: '1/keys',
        }, requestOptions);
    };
};

const listClusters = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: '1/clusters',
        }, requestOptions);
    };
};

const listIndices = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: '1/indexes',
        }, requestOptions);
    };
};

const moveIndex = (base) => {
    return (from, to, requestOptions) => {
        const wait = (response, waitRequestOptions) => {
            return initIndex(base)(from, {
                methods: { waitTask },
            }).waitTask(response.taskID, waitRequestOptions);
        };
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/operation', from),
            data: {
                operation: 'move',
                destination: to,
            },
        }, requestOptions), wait);
    };
};

const multipleBatch = (base) => {
    return (requests, requestOptions) => {
        const wait = (response, waitRequestOptions) => {
            return Promise.all(Object.keys(response.taskID).map(indexName => {
                return initIndex(base)(indexName, {
                    methods: { waitTask },
                }).waitTask(response.taskID[indexName], waitRequestOptions);
            }));
        };
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: '1/indexes/*/batch',
            data: {
                requests,
            },
        }, requestOptions), wait);
    };
};

const multipleGetObjects = (base) => {
    return (requests, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Post,
            path: '1/indexes/*/objects',
            data: {
                requests,
            },
        }, requestOptions);
    };
};

const multipleQueries = (base) => {
    return (queries, requestOptions) => {
        const requests = queries.map(query => {
            return {
                ...query,
                params: serializeQueryParameters(query.params || {}),
            };
        });
        return base.transporter.read({
            method: MethodEnum.Post,
            path: '1/indexes/*/queries',
            data: {
                requests,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const multipleSearchForFacetValues = (base) => {
    return (queries, requestOptions) => {
        return Promise.all(queries.map(query => {
            const { facetName, facetQuery, ...params } = query.params;
            return initIndex(base)(query.indexName, {
                methods: { searchForFacetValues },
            }).searchForFacetValues(facetName, facetQuery, {
                ...requestOptions,
                ...params,
            });
        }));
    };
};

const restoreApiKey = (base) => {
    return (apiKey, requestOptions) => {
        const wait = (_, waitRequestOptions) => {
            return createRetryablePromise(retry => {
                return getApiKey(base)(apiKey, waitRequestOptions).catch((apiError) => {
                    if (apiError.status !== 404) {
                        throw apiError;
                    }
                    return retry();
                });
            });
        };
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/keys/%s/restore', apiKey),
        }, requestOptions), wait);
    };
};

const updateApiKey = (base) => {
    return (apiKey, requestOptions) => {
        const updatedFields = Object.assign({}, requestOptions);
        const { queryParameters, ...options } = requestOptions || {};
        const data = queryParameters ? { queryParameters } : {};
        const apiKeyFields = [
            'acl',
            'indexes',
            'referers',
            'restrictSources',
            'queryParameters',
            'description',
            'maxQueriesPerIPPerHour',
            'maxHitsPerQuery',
        ];
        const hasChanged = (getApiKeyResponse) => {
            return Object.keys(updatedFields)
                .filter(updatedField => apiKeyFields.indexOf(updatedField) !== -1)
                .every(updatedField => {
                return (
                // @ts-ignore
                getApiKeyResponse[updatedField] === updatedFields[updatedField]);
            });
        };
        const wait = (_, waitRequestOptions) => createRetryablePromise(retry => {
            return getApiKey(base)(apiKey, waitRequestOptions).then(getApiKeyResponse => {
                return hasChanged(getApiKeyResponse) ? Promise.resolve() : retry();
            });
        });
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Put,
            path: encode('1/keys/%s', apiKey),
            data,
        }, options), wait);
    };
};

const batch = (base) => {
    return (requests, requestOptions) => {
        const wait = (response, waitRequestOptions) => {
            return waitTask(base)(response.taskID, waitRequestOptions);
        };
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/batch', base.indexName),
            data: {
                requests,
            },
        }, requestOptions), wait);
    };
};

const browseObjects = (base) => {
    return (requestOptions) => {
        return createBrowsablePromise({
            ...requestOptions,
            shouldStop: response => response.cursor === undefined,
            request: (data) => base.transporter.read({
                method: MethodEnum.Post,
                path: encode('1/indexes/%s/browse', base.indexName),
                data,
            }, requestOptions),
        });
    };
};

const browseRules = (base) => {
    return (requestOptions) => {
        const options = {
            hitsPerPage: 1000,
            ...requestOptions,
        };
        return createBrowsablePromise({
            ...options,
            shouldStop: response => response.hits.length < options.hitsPerPage,
            request(data) {
                return searchRules(base)('', { ...requestOptions, ...data }).then((response) => {
                    return {
                        ...response,
                        hits: response.hits.map(rule => {
                            // @ts-ignore
                            // eslint-disable-next-line functional/immutable-data,no-param-reassign
                            delete rule._highlightResult;
                            return rule;
                        }),
                    };
                });
            },
        });
    };
};

const browseSynonyms = (base) => {
    return (requestOptions) => {
        const options = {
            hitsPerPage: 1000,
            ...requestOptions,
        };
        return createBrowsablePromise({
            ...options,
            shouldStop: response => response.hits.length < options.hitsPerPage,
            request(data) {
                return searchSynonyms(base)('', { ...requestOptions, ...data }).then((response) => {
                    return {
                        ...response,
                        hits: response.hits.map(synonym => {
                            // @ts-ignore
                            // eslint-disable-next-line functional/immutable-data,no-param-reassign
                            delete synonym._highlightResult;
                            return synonym;
                        }),
                    };
                });
            },
        });
    };
};

const chunk = (base) => {
    return (bodies, action, requestOptions) => {
        const { batchSize, ...options } = requestOptions || {};
        // eslint-disable-next-line functional/prefer-readonly-type
        const responses = [];
        const forEachBatch = (lastIndex = 0) => {
            // eslint-disable-next-line functional/prefer-readonly-type
            const bodiesChunk = [];
            // eslint-disable-next-line functional/no-let
            let index;
            /* eslint-disable-next-line functional/no-loop-statement */
            for (index = lastIndex; index < bodies.length; index++) {
                // eslint-disable-next-line functional/immutable-data
                bodiesChunk.push(bodies[index]);
                if (bodiesChunk.length === (batchSize || 1000)) {
                    break;
                }
            }
            if (bodiesChunk.length === 0) {
                return Promise.resolve(responses);
            }
            return batch(base)(bodiesChunk.map(body => {
                return {
                    action,
                    body,
                };
            }), options).then(response => {
                // eslint-disable-next-line functional/immutable-data
                responses.push(response);
                index++;
                return forEachBatch(index);
            });
        };
        return createWaitablePromise(forEachBatch(), (batchResponses, waitRequestOptions) => {
            return Promise.all(batchResponses.map(response => waitTask(base)(response.taskID, waitRequestOptions)));
        });
    };
};

const clearObjects = (base) => {
    return (requestOptions) => {
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/clear', base.indexName),
        }, requestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const clearRules = (base) => {
    return (requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/rules/clear', base.indexName),
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const clearSynonyms = (base) => {
    return (requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/synonyms/clear', base.indexName),
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteBy = (base) => {
    return (filters, requestOptions) => {
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/deleteByQuery', base.indexName),
            data: filters,
        }, requestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteIndex = (base) => {
    return (requestOptions) => {
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Delete,
            path: encode('1/indexes/%s', base.indexName),
        }, requestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteObject = (base) => {
    return (objectID, requestOptions) => {
        return createWaitablePromise(deleteObjects(base)([objectID], requestOptions).then(response => {
            return { taskID: response[0].taskID };
        }), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteObjects = (base) => {
    return (objectIDs, requestOptions) => {
        const objects = objectIDs.map(objectID => {
            return { objectID };
        });
        return chunk(base)(objects, BatchActionEnum.DeleteObject, requestOptions);
    };
};

const deleteRule = (base) => {
    return (objectID, requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Delete,
            path: encode('1/indexes/%s/rules/%s', base.indexName, objectID),
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteSynonym = (base) => {
    return (objectID, requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Delete,
            path: encode('1/indexes/%s/synonyms/%s', base.indexName, objectID),
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const exists = (base) => {
    return (requestOptions) => {
        return getSettings(base)(requestOptions)
            .then(() => true)
            .catch(error => {
            if (error.status !== 404) {
                throw error;
            }
            return false;
        });
    };
};

const findObject = (base) => {
    return (callback, requestOptions) => {
        const { query, paginate, ...options } = requestOptions || {};
        // eslint-disable-next-line functional/no-let
        let page = 0;
        const forEachPage = () => {
            return search(base)(query || '', { ...options, page }).then(result => {
                // eslint-disable-next-line functional/no-loop-statement
                for (const [position, hit] of Object.entries(result.hits)) {
                    // eslint-disable-next-line promise/no-callback-in-promise
                    if (callback(hit)) {
                        return {
                            object: hit,
                            position: parseInt(position, 10),
                            page,
                        };
                    }
                }
                page++;
                // paginate if option was set and has next page
                if (paginate === false || page >= result.nbPages) {
                    throw createObjectNotFoundError();
                }
                return forEachPage();
            });
        };
        return forEachPage();
    };
};

const getObject = (base) => {
    return (objectID, requestOptions) => {
        const { attributesToRetrieve, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (attributesToRetrieve) {
            mappedRequestOptions.queryParameters.attributesToRetrieve = attributesToRetrieve; // eslint-disable-line functional/immutable-data
        }
        return base.transporter.read({
            method: MethodEnum.Get,
            path: encode('1/indexes/%s/%s', base.indexName, objectID),
        }, mappedRequestOptions);
    };
};

const getObjectPosition = () => {
    return (searchResponse, objectID) => {
        // eslint-disable-next-line functional/no-loop-statement
        for (const [position, hit] of Object.entries(searchResponse.hits)) {
            if (hit.objectID === objectID) {
                return parseInt(position, 10);
            }
        }
        return -1;
    };
};

const getObjects = (base) => {
    return (objectIDs, requestOptions) => {
        const { attributesToRetrieve, ...options } = requestOptions || {};
        const requests = objectIDs.map(objectID => {
            return {
                indexName: base.indexName,
                objectID,
                ...(attributesToRetrieve ? { attributesToRetrieve } : {}),
            };
        });
        return base.transporter.read({
            method: MethodEnum.Post,
            path: '1/indexes/*/objects',
            data: {
                requests,
            },
        }, options);
    };
};

const getRule = (base) => {
    return (objectID, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: encode('1/indexes/%s/rules/%s', base.indexName, objectID),
        }, requestOptions);
    };
};

const getSettings = (base) => {
    return (requestOptions) => {
        const mappedRequestOptions = createMappedRequestOptions(requestOptions);
        // eslint-disable-next-line functional/immutable-data
        mappedRequestOptions.queryParameters.getVersion = '2';
        return base.transporter.read({
            method: MethodEnum.Get,
            path: encode('1/indexes/%s/settings', base.indexName),
        }, mappedRequestOptions);
    };
};

const getSynonym = (base) => {
    return (objectID, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: encode(`1/indexes/%s/synonyms/%s`, base.indexName, objectID),
        }, requestOptions);
    };
};

const getTask = (base) => {
    return (taskID, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Get,
            path: encode('1/indexes/%s/task/%s', base.indexName, taskID.toString()),
        }, requestOptions);
    };
};

const partialUpdateObject = (base) => {
    return (object, requestOptions) => {
        return createWaitablePromise(partialUpdateObjects(base)([object], requestOptions).then(response => {
            return {
                objectID: response[0].objectIDs[0],
                taskID: response[0].taskID,
            };
        }), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const partialUpdateObjects = (base) => {
    return (objects, requestOptions) => {
        const { createIfNotExists, ...options } = requestOptions || {};
        const action = createIfNotExists
            ? BatchActionEnum.PartialUpdateObject
            : BatchActionEnum.PartialUpdateObjectNoCreate;
        return chunk(base)(objects, action, options);
    };
};

const replaceAllObjects = (base) => {
    return (objects, requestOptions) => {
        const { safe, ...options } = requestOptions || {};
        const operation = (from, to, type, operatioRequestOptions) => {
            return createWaitablePromise(base.transporter.write({
                method: MethodEnum.Post,
                path: encode('1/indexes/%s/operation', from),
                data: {
                    operation: type,
                    destination: to,
                },
            }, operatioRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
        };
        const randomSuffix = Math.random()
            .toString(36)
            .substring(7);
        const temporaryIndexName = `${base.indexName}_tmp_${randomSuffix}`;
        const saveObjectsInTemporary = saveObjects({
            appId: base.appId,
            transporter: base.transporter,
            indexName: temporaryIndexName,
        });
        // eslint-disable-next-line prefer-const, functional/no-let, functional/prefer-readonly-type
        let responses = [];
        const copyWaitablePromise = operation(base.indexName, temporaryIndexName, 'copy', {
            ...options,
            scope: ['settings', 'synonyms', 'rules'],
        });
        // eslint-disable-next-line functional/immutable-data
        responses.push(copyWaitablePromise);
        const result = (safe ? copyWaitablePromise.wait(options) : copyWaitablePromise)
            .then(() => {
            const saveObjectsWaitablePromise = saveObjectsInTemporary(objects, options);
            // eslint-disable-next-line functional/immutable-data
            responses.push(saveObjectsWaitablePromise);
            return safe ? saveObjectsWaitablePromise.wait(options) : saveObjectsWaitablePromise;
        })
            .then(() => {
            const moveWaitablePromise = operation(temporaryIndexName, base.indexName, 'move', options);
            // eslint-disable-next-line functional/immutable-data
            responses.push(moveWaitablePromise);
            return safe ? moveWaitablePromise.wait(options) : moveWaitablePromise;
        })
            .then(() => Promise.resolve());
        return createWaitablePromise(result, (_, waitRequestOptions) => {
            return Promise.all(responses.map(response => response.wait(waitRequestOptions)));
        });
    };
};

const replaceAllRules = (base) => {
    return (rules, requestOptions) => {
        return saveRules(base)(rules, {
            ...requestOptions,
            clearExistingRules: true,
        });
    };
};

const replaceAllSynonyms = (base) => {
    return (synonyms, requestOptions) => {
        return saveSynonyms(base)(synonyms, {
            ...(requestOptions === undefined ? {} : requestOptions),
            replaceExistingSynonyms: true,
        });
    };
};

const saveObject = (base) => {
    return (object, requestOptions) => {
        return createWaitablePromise(saveObjects(base)([object], requestOptions).then(response => {
            return {
                objectID: response[0].objectIDs[0],
                taskID: response[0].taskID,
            };
        }), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const saveObjects = (base) => {
    return (objects, requestOptions) => {
        const { autoGenerateObjectIDIfNotExist, ...options } = requestOptions || {};
        const action = autoGenerateObjectIDIfNotExist
            ? BatchActionEnum.AddObject
            : BatchActionEnum.UpdateObject;
        if (action === BatchActionEnum.UpdateObject) {
            // eslint-disable-next-line functional/no-loop-statement
            for (const object of objects) {
                if (object.objectID === undefined) {
                    return createWaitablePromise(Promise.reject(createMissingObjectIDError()));
                }
            }
        }
        return chunk(base)(objects, action, options);
    };
};

const saveRule = (base) => {
    return (rule, requestOptions) => {
        return saveRules(base)([rule], requestOptions);
    };
};

const saveRules = (base) => {
    return (rules, requestOptions) => {
        const { forwardToReplicas, clearExistingRules, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        if (clearExistingRules) {
            mappedRequestOptions.queryParameters.clearExistingRules = 1; // eslint-disable-line functional/immutable-data
        }
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/rules/batch', base.indexName),
            data: rules,
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const saveSynonym = (base) => {
    return (synonym, requestOptions) => {
        return saveSynonyms(base)([synonym], requestOptions);
    };
};

const saveSynonyms = (base) => {
    return (synonyms, requestOptions) => {
        const { forwardToReplicas, replaceExistingSynonyms, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        if (replaceExistingSynonyms) {
            mappedRequestOptions.queryParameters.replaceExistingSynonyms = 1; // eslint-disable-line functional/immutable-data
        }
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/synonyms/batch', base.indexName),
            data: synonyms,
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const search = (base) => {
    return (query, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/query', base.indexName),
            data: {
                query,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const searchForFacetValues = (base) => {
    return (facetName, facetQuery, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/facets/%s/query', base.indexName, facetName),
            data: {
                facetQuery,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const searchRules = (base) => {
    return (query, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/rules/search', base.indexName),
            data: {
                query,
            },
        }, requestOptions);
    };
};

const searchSynonyms = (base) => {
    return (query, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/synonyms/search', base.indexName),
            data: {
                query,
            },
        }, requestOptions);
    };
};

const setSettings = (base) => {
    return (settings, requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = createMappedRequestOptions(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return createWaitablePromise(base.transporter.write({
            method: MethodEnum.Put,
            path: encode('1/indexes/%s/settings', base.indexName),
            data: settings,
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const waitTask = (base) => {
    return (taskID, requestOptions) => {
        return createRetryablePromise(retry => {
            return getTask(base)(taskID, requestOptions).then(response => {
                return response.status !== 'published' ? retry() : undefined;
            });
        });
    };
};

const BatchActionEnum = {
    AddObject: 'addObject',
    UpdateObject: 'updateObject',
    PartialUpdateObject: 'partialUpdateObject',
    PartialUpdateObjectNoCreate: 'partialUpdateObjectNoCreate',
    DeleteObject: 'deleteObject',
};

const ScopeEnum = {
    Settings: 'settings',
    Synonyms: 'synonyms',
    Rules: 'rules',
};

const LogLevelEnum = {
    Debug: 1,
    Info: 2,
    Error: 3,
};

/* eslint no-console: 0 */
function createConsoleLogger(logLevel) {
    return {
        debug(message, args) {
            if (LogLevelEnum.Debug >= logLevel) {
                console.debug(message, args);
            }
            return Promise.resolve();
        },
        info(message, args) {
            if (LogLevelEnum.Info >= logLevel) {
                console.info(message, args);
            }
            return Promise.resolve();
        },
        error(message, args) {
            console.error(message, args);
            return Promise.resolve();
        },
    };
}

function createBrowserXhrRequester() {
    return {
        send(request) {
            return new Promise((resolve) => {
                const baseRequester = new XMLHttpRequest();
                baseRequester.open(request.method, request.url, true);
                Object.keys(request.headers).forEach(key => baseRequester.setRequestHeader(key, request.headers[key]));
                const createTimeout = (timeout, content) => {
                    return setTimeout(() => {
                        baseRequester.abort();
                        resolve({
                            status: 0,
                            content,
                            isTimedOut: true,
                        });
                    }, timeout * 1000);
                };
                const connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');
                // eslint-disable-next-line functional/no-let
                let responseTimeout;
                // eslint-disable-next-line functional/immutable-data
                baseRequester.onreadystatechange = () => {
                    if (baseRequester.readyState > baseRequester.OPENED && responseTimeout === undefined) {
                        clearTimeout(connectTimeout);
                        responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
                    }
                };
                // eslint-disable-next-line functional/immutable-data
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
                //  eslint-disable-next-line functional/immutable-data
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
        },
    };
}

function algoliasearch(appId, apiKey, options = {}) {
    const logger = createConsoleLogger(options.logLevel || LogLevelEnum.Error);
    const clientOptions = {
        appId,
        apiKey,
        timeouts: {
            connect: 1,
            read: 2,
            write: 30,
        },
        requester: createBrowserXhrRequester(),
        logger,
        responsesCache: createInMemoryCache(),
        requestsCache: createInMemoryCache({ serializable: false }),
        hostsCache: createFallbackableCache({
            caches: [
                createBrowserLocalStorageCache({ key: `${version}-${appId}` }),
                createInMemoryCache(),
            ],
        }),
        userAgent: createUserAgent(version).add({ segment: 'Browser' }),
    };
    return createSearchClient({
        ...clientOptions,
        methods: {
            search: multipleQueries,
            searchForFacetValues: multipleSearchForFacetValues,
            multipleBatch,
            multipleGetObjects,
            multipleQueries,
            copyIndex,
            copySettings,
            copySynonyms,
            moveIndex,
            listIndices,
            getLogs,
            listClusters,
            multipleSearchForFacetValues,
            getApiKey,
            addApiKey,
            listApiKeys,
            updateApiKey,
            deleteApiKey,
            restoreApiKey,
            initIndex: base => (indexName) => {
                return initIndex(base)(indexName, {
                    methods: {
                        batch,
                        delete: deleteIndex,
                        getObject,
                        getObjects,
                        saveObject,
                        saveObjects,
                        search,
                        searchForFacetValues,
                        waitTask,
                        setSettings,
                        getSettings,
                        partialUpdateObject,
                        partialUpdateObjects,
                        deleteObject,
                        deleteObjects,
                        deleteBy,
                        clearObjects,
                        browseObjects,
                        getObjectPosition,
                        findObject,
                        exists,
                        saveSynonym,
                        saveSynonyms,
                        getSynonym,
                        searchSynonyms,
                        browseSynonyms,
                        deleteSynonym,
                        clearSynonyms,
                        replaceAllObjects,
                        replaceAllSynonyms,
                        searchRules,
                        getRule,
                        deleteRule,
                        saveRule,
                        saveRules,
                        replaceAllRules,
                        browseRules,
                        clearRules,
                    },
                });
            },
            initAnalytics: () => (region) => {
                return createAnalyticsClient({
                    ...clientOptions,
                    region,
                    methods: {
                        addABTest,
                        getABTest,
                        getABTests,
                        stopABTest,
                        deleteABTest,
                    },
                });
            },
            initRecommendation: () => (region) => {
                return createRecommendationClient({
                    ...clientOptions,
                    region,
                    methods: {
                        getPersonalizationStrategy,
                        setPersonalizationStrategy,
                    },
                });
            },
        },
    });
}

export default algoliasearch;
