YUI.add('autocomplete-sources', function(Y) {

/**
 * Mixes support for JSONP and YQL result sources into AutoCompleteBase.
 *
 * @module autocomplete
 * @submodule autocomplete-sources
 */

var Lang = Y.Lang,

    _SOURCE_SUCCESS = '_sourceSuccess',

    MAX_RESULTS         = 'maxResults',
    REQUEST_TEMPLATE    = 'requestTemplate',
    RESULT_LIST_LOCATOR = 'resultListLocator';

function ACSources() {}

ACSources.prototype = {
    /**
     * Regular expression used to determine whether a String source is a YQL
     * query.
     *
     * @property _YQL_SOURCE_REGEX
     * @type RegExp
     * @protected
     * @for AutoCompleteBase
     */
    _YQL_SOURCE_REGEX: /^(?:select|set|use)\s+/i,

    /**
     * Creates a DataSource-like object that uses <code>Y.io</code> as a source.
     * See the <code>source</code> attribute for more details.
     *
     * @method _createIOSource
     * @param {String} source URL.
     * @return {Object} DataSource-like object.
     * @protected
     * @for AutoCompleteBase
     */
    _createIOSource: function (source) {
        var cache    = {},
            ioSource = {},
            that     = this,
            ioRequest, lastRequest, loading;

        ioSource.sendRequest = function (request) {
            var _sendRequest = function (request) {
                var query = request.request,
                    maxResults, requestTemplate, url;

                if (cache[query]) {
                    that[_SOURCE_SUCCESS](cache[query], request);
                } else {
                    maxResults      = that.get(MAX_RESULTS);
                    requestTemplate = that.get(REQUEST_TEMPLATE);
                    url             = source;

                    if (requestTemplate) {
                        url += requestTemplate(query);
                    }

                    url = Lang.sub(url, {
                        maxResults: maxResults > 0 ? maxResults : 1000,
                        query     : encodeURIComponent(query)
                    });

                    // Cancel any outstanding requests.
                    if (ioRequest && ioRequest.isInProgress()) {
                        ioRequest.abort();
                    }

                    ioRequest = Y.io(url, {
                        on: {
                            success: function (tid, response) {
                                var data;

                                try {
                                    data = Y.JSON.parse(response.responseText);
                                } catch (ex) {
                                    Y.error('JSON parse error', ex);
                                }

                                if (data) {
                                    cache[query] = data;
                                    that[_SOURCE_SUCCESS](data, request);
                                }
                            }
                        }
                    });
                }
            };

            // Keep track of the most recent request in case there are multiple
            // requests while we're waiting for the IO module to load. Only the
            // most recent request will be sent.
            lastRequest = request;

            if (!loading) {
                loading = true;

                // Lazy-load the io and json-parse modules if necessary, then
                // overwrite the sendRequest method to bypass this check in the
                // future.
                Y.use('io-base', 'json-parse', function () {
                    ioSource.sendRequest = _sendRequest;
                    _sendRequest(lastRequest);
                });
            }
        };

        return ioSource;
    },

    /**
     * Creates a DataSource-like object that uses the specified JSONPRequest
     * instance as a source. See the <code>source</code> attribute for more
     * details.
     *
     * @method _createJSONPSource
     * @param {JSONPRequest|String} source URL string or JSONPRequest instance.
     * @return {Object} DataSource-like object.
     * @protected
     * @for AutoCompleteBase
     */
    _createJSONPSource: function (source) {
        var cache       = {},
            jsonpSource = {},
            that        = this,
            lastRequest, loading;

        jsonpSource.sendRequest = function (request) {
            var _sendRequest = function (request) {
                var query = request.request;

                if (cache[query]) {
                    that[_SOURCE_SUCCESS](cache[query], request);
                } else {
                    // Hack alert: JSONPRequest currently doesn't support
                    // per-request callbacks, so we're reaching into the protected
                    // _config object to make it happen.
                    //
                    // This limitation is mentioned in the following JSONP
                    // enhancement ticket:
                    //
                    // http://yuilibrary.com/projects/yui3/ticket/2529371
                    source._config.on.success = function (data) {
                        cache[query] = data;
                        that[_SOURCE_SUCCESS](data, request);
                    };

                    source.send(query);
                }
            };

            // Keep track of the most recent request in case there are multiple
            // requests while we're waiting for the JSONP module to load. Only
            // the most recent request will be sent.
            lastRequest = request;

            if (!loading) {
                loading = true;

                // Lazy-load the JSONP module if necessary, then overwrite the
                // sendRequest method to bypass this check in the future.
                Y.use('jsonp', function () {
                    // Turn the source into a JSONPRequest instance if it isn't
                    // one already.
                    if (!(source instanceof Y.JSONPRequest)) {
                        source = new Y.JSONPRequest(source, {
                            format: Y.bind(that._jsonpFormatter, that)
                        });
                    }

                    jsonpSource.sendRequest = _sendRequest;
                    _sendRequest(lastRequest);
                });
            }
        };

        return jsonpSource;
    },

    /**
     * Creates a DataSource-like object that calls the specified  URL or
     * executes the specified YQL query for results. If the string starts
     * with "select ", "use ", or "set " (case-insensitive), it's assumed to be
     * a YQL query; otherwise, it's assumed to be a URL (which may be absolute
     * or relative). URLs containing a "{callback}" placeholder are assumed to
     * be JSONP URLs; all others will use XHR. See the <code>source</code>
     * attribute for more details.
     *
     * @method _createStringSource
     * @param {String} source URL or YQL query.
     * @return {Object} DataSource-like object.
     * @protected
     * @for AutoCompleteBase
     */
    _createStringSource: function (source) {
        if (this._YQL_SOURCE_REGEX.test(source)) {
            // Looks like a YQL query.
            return this._createYQLSource(source);
        } else if (source.indexOf('{callback}') !== -1) {
            // Contains a {callback} param and isn't a YQL query, so it must be
            // JSONP.
            return this._createJSONPSource(source);
        } else {
            // Not a YQL query or JSONP, so we'll assume it's an XHR URL.
            return this._createIOSource(source);
        }
    },

    /**
     * Creates a DataSource-like object that uses the specified YQL query string
     * to create a YQL-based source. See the <code>source</code> attribute for
     * details. If no <code>resultListLocator</code> is defined, this method
     * will set a best-guess locator that might work for many typical YQL
     * queries.
     *
     * @method _createYQLSource
     * @param {String} source YQL query.
     * @return {Object} DataSource-like object.
     * @protected
     * @for AutoCompleteBase
     */
    _createYQLSource: function (source) {
        var cache     = {},
            yqlSource = {},
            that      = this,
            lastRequest, loading;

        if (!this.get(RESULT_LIST_LOCATOR)) {
            this.set(RESULT_LIST_LOCATOR, this._defaultYQLLocator);
        }

        yqlSource.sendRequest = function (request) {
            var yqlRequest,

            _sendRequest = function (request) {
                var query = request.request,
                    callback, env, maxResults, opts, yqlQuery;

                if (cache[query]) {
                    that[_SOURCE_SUCCESS](cache[query], request);
                } else {
                    callback = function (data) {
                        cache[query] = data;
                        that[_SOURCE_SUCCESS](data, request);
                    };

                    env        = that.get('yqlEnv');
                    maxResults = that.get(MAX_RESULTS);

                    opts = {proto: that.get('yqlProtocol')};

                    yqlQuery = Lang.sub(source, {
                        maxResults: maxResults > 0 ? maxResults : 1000,
                        query     : query
                    });

                    // Only create a new YQLRequest instance if this is the
                    // first request. For subsequent requests, we'll reuse the
                    // original instance.
                    if (yqlRequest) {
                        yqlRequest._callback   = callback;
                        yqlRequest._opts       = opts;
                        yqlRequest._params.q   = yqlQuery;

                        if (env) {
                            yqlRequest._params.env = env;
                        }
                    } else {
                        yqlRequest = new Y.YQLRequest(yqlQuery, {
                            on: {success: callback},
                            allowCache: false // temp workaround until JSONP has per-URL callback proxies
                        }, env ? {env: env} : null, opts);
                    }

                    yqlRequest.send();
                }
            };

            // Keep track of the most recent request in case there are multiple
            // requests while we're waiting for the YQL module to load. Only the
            // most recent request will be sent.
            lastRequest = request;

            if (!loading) {
                // Lazy-load the YQL module if necessary, then overwrite the
                // sendRequest method to bypass this check in the future.
                loading = true;

                Y.use('yql', function () {
                    yqlSource.sendRequest = _sendRequest;
                    _sendRequest(lastRequest);
                });
            }
        };

        return yqlSource;
    },

    /**
     * Default resultListLocator used when a string-based YQL source is set and
     * the implementer hasn't already specified one.
     *
     * @method _defaultYQLLocator
     * @param {Object} response YQL response object.
     * @return {Array}
     * @protected
     * @for AutoCompleteBase
     */
    _defaultYQLLocator: function (response) {
        var results = response && response.query && response.query.results,
            values;

        if (results && Lang.isObject(results)) {
            // If there's only a single value on YQL's results object, that
            // value almost certainly contains the array of results we want. If
            // there are 0 or 2+ values, then the values themselves are most
            // likely the results we want.
            values  = Y.Object.values(results) || [];
            results = values.length === 1 ? values[0] : values;

            if (!Lang.isArray(results)) {
                results = [results];
            }
        } else {
            results = [];
        }

        return results;
    },

    /**
     * URL formatter passed to <code>JSONPRequest</code> instances.
     *
     * @method _jsonpFormatter
     * @param {String} url
     * @param {String} proxy
     * @param {String} query
     * @return {String} Formatted URL
     * @protected
     * @for AutoCompleteBase
     */
    _jsonpFormatter: function (url, proxy, query) {
        var maxResults      = this.get(MAX_RESULTS),
            requestTemplate = this.get(REQUEST_TEMPLATE);

        if (requestTemplate) {
            url += requestTemplate(query);
        }

        return Lang.sub(url, {
            callback  : proxy,
            maxResults: maxResults > 0 ? maxResults : 1000,
            query     : encodeURIComponent(query)
        });
    }
};

ACSources.ATTRS = {
    /**
     * YQL environment file URL to load when the <code>source</code> is set to
     * a YQL query. Set this to <code>null</code> to use the default Open Data
     * Tables environment file (http://datatables.org/alltables.env).
     *
     * @attribute yqlEnv
     * @type String
     * @default null
     * @for AutoCompleteBase
     */
    yqlEnv: {
        value: null
    },

    /**
     * URL protocol to use when the <code>source</code> is set to a YQL query.
     *
     * @attribute yqlProtocol
     * @type String
     * @default 'http'
     * @for AutoCompleteBase
     */
    yqlProtocol: {
        value: 'http'
    }
};

Y.Base.mix(Y.AutoCompleteBase, [ACSources]);


}, '@VERSION@' ,{optional:['io-base', 'json-parse', 'jsonp', 'yql'], requires:['autocomplete-base']});
