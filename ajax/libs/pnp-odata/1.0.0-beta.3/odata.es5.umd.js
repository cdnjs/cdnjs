(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pnp/common'), require('tslib'), require('@pnp/logging')) :
	typeof define === 'function' && define.amd ? define(['exports', '@pnp/common', 'tslib', '@pnp/logging'], factory) :
	(factory((global.pnp = global.pnp || {}, global.pnp.odata = {}),global.common,global.tslib_1,global.logging));
}(this, (function (exports,common,tslib_1,logging) { 'use strict';

var CachingOptions = /** @class */ (function () {
    function CachingOptions(key) {
        this.key = key;
        this.expiration = common.Util.dateAdd(new Date(), "second", common.RuntimeConfig.defaultCachingTimeoutSeconds);
        this.storeName = common.RuntimeConfig.defaultCachingStore;
    }
    Object.defineProperty(CachingOptions.prototype, "store", {
        get: function () {
            if (this.storeName === "local") {
                return CachingOptions.storage.local;
            }
            else {
                return CachingOptions.storage.session;
            }
        },
        enumerable: true,
        configurable: true
    });
    CachingOptions.storage = new common.PnPClientStorage();
    return CachingOptions;
}());
var CachingParserWrapper = /** @class */ (function () {
    function CachingParserWrapper(_parser, _cacheOptions) {
        this._parser = _parser;
        this._cacheOptions = _cacheOptions;
    }
    CachingParserWrapper.prototype.parse = function (response) {
        var _this = this;
        // add this to the cache based on the options
        return this._parser.parse(response).then(function (data) {
            if (_this._cacheOptions.store !== null) {
                _this._cacheOptions.store.put(_this._cacheOptions.key, data, _this._cacheOptions.expiration);
            }
            return data;
        });
    };
    return CachingParserWrapper;
}());

/**
 * Represents an exception with an HttpClient request
 *
 */
var ProcessHttpClientResponseException = /** @class */ (function (_super) {
    tslib_1.__extends(ProcessHttpClientResponseException, _super);
    function ProcessHttpClientResponseException(status, statusText, data) {
        var _this = _super.call(this, "Error making HttpClient request in queryable: [" + status + "] " + statusText) || this;
        _this.status = status;
        _this.statusText = statusText;
        _this.data = data;
        _this.name = "ProcessHttpClientResponseException";
        logging.Logger.log({ data: _this.data, level: logging.LogLevel.Error, message: _this.message });
        return _this;
    }
    return ProcessHttpClientResponseException;
}(Error));
var AlreadyInBatchException = /** @class */ (function (_super) {
    tslib_1.__extends(AlreadyInBatchException, _super);
    function AlreadyInBatchException(msg) {
        if (msg === void 0) { msg = "This query is already part of a batch."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "AlreadyInBatchException";
        logging.Logger.log({ data: {}, level: logging.LogLevel.Error, message: "[" + _this.name + "]::" + _this.message });
        return _this;
    }
    return AlreadyInBatchException;
}(Error));

var ODataParserBase = /** @class */ (function () {
    function ODataParserBase() {
    }
    ODataParserBase.prototype.parse = function (r) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.handleError(r, reject)) {
                if ((r.headers.has("Content-Length") && parseFloat(r.headers.get("Content-Length") || "-1") === 0) || r.status === 204) {
                    resolve({});
                }
                else {
                    // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
                    r.text()
                        .then(function (txt) { return txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {}; })
                        .then(function (json) { return resolve(_this.parseODataJSON(json)); })
                        .catch(function (e) { return reject(e); });
                }
            }
        });
    };
    ODataParserBase.prototype.handleError = function (r, reject) {
        if (!r.ok) {
            r.json().then(function (json) {
                // include the headers as they contain diagnostic information
                var data = {
                    responseBody: json,
                    responseHeaders: r.headers,
                };
                reject(new ProcessHttpClientResponseException(r.status, r.statusText, data));
            }).catch(function (e) {
                // we failed to read the body - possibly it is empty. Let's report the original status that caused
                // the request to fail and log the error with parsing the body if anyone needs it for debugging
                logging.Logger.log({
                    data: e,
                    level: logging.LogLevel.Warning,
                    message: "There was an error parsing the error response body. See data for details.",
                });
                // include the headers as they contain diagnostic information
                var data = {
                    responseBody: "[[body not available]]",
                    responseHeaders: r.headers,
                };
                reject(new ProcessHttpClientResponseException(r.status, r.statusText, data));
            });
        }
        return r.ok;
    };
    ODataParserBase.prototype.parseODataJSON = function (json) {
        var result = json;
        if (json.hasOwnProperty("d")) {
            if (json.d.hasOwnProperty("results")) {
                result = json.d.results;
            }
            else {
                result = json.d;
            }
        }
        else if (json.hasOwnProperty("value")) {
            result = json.value;
        }
        return result;
    };
    return ODataParserBase;
}());

var ODataDefaultParser = /** @class */ (function (_super) {
    tslib_1.__extends(ODataDefaultParser, _super);
    function ODataDefaultParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ODataDefaultParser;
}(ODataParserBase));
var ODataValueParserImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ODataValueParserImpl, _super);
    function ODataValueParserImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ODataValueParserImpl.prototype.parse = function (r) {
        return _super.prototype.parse.call(this, r).then(function (d) { return d; });
    };
    return ODataValueParserImpl;
}(ODataParserBase));
function ODataValue() {
    return new ODataValueParserImpl();
}
var ODataRawParserImpl = /** @class */ (function () {
    function ODataRawParserImpl() {
    }
    ODataRawParserImpl.prototype.parse = function (r) {
        return r.json();
    };
    return ODataRawParserImpl;
}());
var ODataRaw = new ODataRawParserImpl();
var TextFileParser = /** @class */ (function () {
    function TextFileParser() {
    }
    TextFileParser.prototype.parse = function (r) {
        return r.text();
    };
    return TextFileParser;
}());
var BlobFileParser = /** @class */ (function () {
    function BlobFileParser() {
    }
    BlobFileParser.prototype.parse = function (r) {
        return r.blob();
    };
    return BlobFileParser;
}());
var JSONFileParser = /** @class */ (function () {
    function JSONFileParser() {
    }
    JSONFileParser.prototype.parse = function (r) {
        return r.json();
    };
    return JSONFileParser;
}());
var BufferFileParser = /** @class */ (function () {
    function BufferFileParser() {
    }
    BufferFileParser.prototype.parse = function (r) {
        if (common.Util.isFunction(r.arrayBuffer)) {
            return r.arrayBuffer();
        }
        return r.buffer();
    };
    return BufferFileParser;
}());

/**
 * Resolves the context's result value
 *
 * @param context The current context
 */
function returnResult(context) {
    logging.Logger.log({
        data: context.result,
        level: logging.LogLevel.Verbose,
        message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Returning result, see data property for value.",
    });
    return Promise.resolve(context.result || null);
}
/**
 * Sets the result on the context
 */
function setResult(context, value) {
    return new Promise(function (resolve) {
        context.result = value;
        context.hasResult = true;
        resolve(context);
    });
}
/**
 * Invokes the next method in the provided context's pipeline
 *
 * @param c The current request context
 */
function next(c) {
    var _next = c.pipeline.shift();
    if (typeof _next !== "undefined") {
        return _next(c);
    }
    else {
        return Promise.resolve(c);
    }
}
/**
 * Executes the current request context's pipeline
 *
 * @param context Current context
 */
function pipe(context) {
    return next(context)
        .then(function (ctx) { return returnResult(ctx); })
        .catch(function (e) {
        logging.Logger.log({
            data: e,
            level: logging.LogLevel.Error,
            message: "Error in request pipeline: " + e.message,
        });
        throw e;
    });
}
/**
 * decorator factory applied to methods in the pipeline to control behavior
 */
function requestPipelineMethod(alwaysRun) {
    if (alwaysRun === void 0) { alwaysRun = false; }
    return function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // if we have a result already in the pipeline, pass it along and don't call the tagged method
            if (!alwaysRun && args.length > 0 && args[0].hasOwnProperty("hasResult") && args[0].hasResult) {
                logging.Logger.write("[" + args[0].requestId + "] (" + (new Date()).getTime() + ") Skipping request pipeline method " + propertyKey + ", existing result in pipeline.", logging.LogLevel.Verbose);
                return Promise.resolve(args[0]);
            }
            // apply the tagged method
            logging.Logger.write("[" + args[0].requestId + "] (" + (new Date()).getTime() + ") Calling request pipeline method " + propertyKey + ".", logging.LogLevel.Verbose);
            // then chain the next method in the context's pipeline - allows for dynamic pipeline
            return method.apply(target, args).then(function (ctx) { return next(ctx); });
        };
    };
}
/**
 * Contains the methods used within the request pipeline
 */
var PipelineMethods = /** @class */ (function () {
    function PipelineMethods() {
    }
    /**
     * Logs the start of the request
     */
    PipelineMethods.logStart = function (context) {
        return new Promise(function (resolve) {
            logging.Logger.log({
                data: logging.Logger.activeLogLevel === logging.LogLevel.Info ? {} : context,
                level: logging.LogLevel.Info,
                message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Beginning " + context.verb + " request (" + context.requestAbsoluteUrl + ")",
            });
            resolve(context);
        });
    };
    /**
     * Handles caching of the request
     */
    PipelineMethods.caching = function (context) {
        return new Promise(function (resolve) {
            // handle caching, if applicable
            if (context.verb === "GET" && context.isCached) {
                logging.Logger.write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Caching is enabled for request, checking cache...", logging.LogLevel.Info);
                var cacheOptions = new CachingOptions(context.requestAbsoluteUrl.toLowerCase());
                if (typeof context.cachingOptions !== "undefined") {
                    cacheOptions = common.Util.extend(cacheOptions, context.cachingOptions);
                }
                // we may not have a valid store
                if (cacheOptions.store !== null) {
                    // check if we have the data in cache and if so resolve the promise and return
                    var data = cacheOptions.store.get(cacheOptions.key);
                    if (data !== null) {
                        // ensure we clear any help batch dependency we are resolving from the cache
                        logging.Logger.log({
                            data: logging.Logger.activeLogLevel === logging.LogLevel.Info ? {} : data,
                            level: logging.LogLevel.Info,
                            message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Value returned from cache.",
                        });
                        context.batchDependency();
                        return setResult(context, data).then(function (ctx) { return resolve(ctx); });
                    }
                }
                logging.Logger.write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Value not found in cache.", logging.LogLevel.Info);
                // if we don't then wrap the supplied parser in the caching parser wrapper
                // and send things on their way
                context.parser = new CachingParserWrapper(context.parser, cacheOptions);
            }
            return resolve(context);
        });
    };
    /**
     * Sends the request
     */
    PipelineMethods.send = function (context) {
        return new Promise(function (resolve, reject) {
            // send or batch the request
            if (context.isBatched) {
                // we are in a batch, so add to batch, remove dependency, and resolve with the batch's promise
                var p = context.batch.add(context.requestAbsoluteUrl, context.verb, context.options, context.parser);
                // we release the dependency here to ensure the batch does not execute until the request is added to the batch
                context.batchDependency();
                logging.Logger.write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Batching request in batch " + context.batch.batchId + ".", logging.LogLevel.Info);
                // we set the result as the promise which will be resolved by the batch's execution
                resolve(setResult(context, p));
            }
            else {
                logging.Logger.write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Sending request.", logging.LogLevel.Info);
                // we are not part of a batch, so proceed as normal
                var client = context.clientFactory();
                var opts = common.Util.extend(context.options || {}, { method: context.verb });
                client.fetch(context.requestAbsoluteUrl, opts)
                    .then(function (response) { return context.parser.parse(response); })
                    .then(function (result) { return setResult(context, result); })
                    .then(function (ctx) { return resolve(ctx); })
                    .catch(function (e) { return reject(e); });
            }
        });
    };
    /**
     * Logs the end of the request
     */
    PipelineMethods.logEnd = function (context) {
        return new Promise(function (resolve) {
            if (context.isBatched) {
                logging.Logger.log({
                    data: logging.Logger.activeLogLevel === logging.LogLevel.Info ? {} : context,
                    level: logging.LogLevel.Info,
                    message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") " + context.verb + " request will complete in batch " + context.batch.batchId + ".",
                });
            }
            else {
                logging.Logger.log({
                    data: logging.Logger.activeLogLevel === logging.LogLevel.Info ? {} : context,
                    level: logging.LogLevel.Info,
                    message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Completing " + context.verb + " request.",
                });
            }
            resolve(context);
        });
    };
    Object.defineProperty(PipelineMethods, "default", {
        get: function () {
            return [
                PipelineMethods.logStart,
                PipelineMethods.caching,
                PipelineMethods.send,
                PipelineMethods.logEnd,
            ];
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        requestPipelineMethod(true)
    ], PipelineMethods, "logStart", null);
    tslib_1.__decorate([
        requestPipelineMethod()
    ], PipelineMethods, "caching", null);
    tslib_1.__decorate([
        requestPipelineMethod()
    ], PipelineMethods, "send", null);
    tslib_1.__decorate([
        requestPipelineMethod(true)
    ], PipelineMethods, "logEnd", null);
    return PipelineMethods;
}());

var ODataQueryable = /** @class */ (function () {
    function ODataQueryable() {
        this._batch = null;
        this._query = new common.Dictionary();
        this._options = {};
        this._url = "";
        this._parentUrl = "";
        this._useCaching = false;
        this._cachingOptions = null;
    }
    /**
     * Directly concatonates the supplied string to the current url, not normalizing "/" chars
     *
     * @param pathPart The string to concatonate to the url
     */
    ODataQueryable.prototype.concat = function (pathPart) {
        this._url += pathPart;
        return this;
    };
    Object.defineProperty(ODataQueryable.prototype, "query", {
        /**
         * Provides access to the query builder for this url
         *
         */
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets custom options for current object and all derived objects accessible via chaining
     *
     * @param options custom options
     */
    ODataQueryable.prototype.configure = function (options) {
        common.mergeOptions(this._options, options);
        return this;
    };
    /**
     * Enables caching for this request
     *
     * @param options Defines the options used when caching this request
     */
    ODataQueryable.prototype.usingCaching = function (options) {
        if (!common.RuntimeConfig.globalCacheDisable) {
            this._useCaching = true;
            if (typeof options !== "undefined") {
                this._cachingOptions = options;
            }
        }
        return this;
    };
    /**
     * Adds this query to the supplied batch
     *
     * @example
     * ```
     *
     * let b = pnp.sp.createBatch();
     * pnp.sp.web.inBatch(b).get().then(...);
     * b.execute().then(...)
     * ```
     */
    ODataQueryable.prototype.inBatch = function (batch) {
        if (this.batch !== null) {
            throw new AlreadyInBatchException();
        }
        this._batch = batch;
        return this;
    };
    /**
     * Gets the currentl url, made absolute based on the availability of the _spPageContextInfo object
     *
     */
    ODataQueryable.prototype.toUrl = function () {
        return this._url;
    };
    /**
     * Executes the currently built request
     *
     * @param parser Allows you to specify a parser to handle the result
     * @param getOptions The options used for this request
     */
    ODataQueryable.prototype.get = function (parser, options) {
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        if (options === void 0) { options = {}; }
        return this.toRequestContext("GET", options, parser, PipelineMethods.default).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.getAs = function (parser, options) {
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        if (options === void 0) { options = {}; }
        return this.toRequestContext("GET", options, parser, PipelineMethods.default).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.postCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        return this.toRequestContext("POST", options, parser, PipelineMethods.default).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.postAsCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        return this.toRequestContext("POST", options, parser, PipelineMethods.default).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.patchCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        return this.toRequestContext("PATCH", options, parser, PipelineMethods.default).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.deleteCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        return this.toRequestContext("DELETE", options, parser, PipelineMethods.default).then(function (context) { return pipe(context); });
    };
    /**
     * Blocks a batch call from occuring, MUST be cleared by calling the returned function
    */
    ODataQueryable.prototype.addBatchDependency = function () {
        if (this._batch !== null) {
            return this._batch.addDependency();
        }
        return function () { return null; };
    };
    Object.defineProperty(ODataQueryable.prototype, "hasBatch", {
        /**
         * Indicates if the current query has a batch associated
         *
         */
        get: function () {
            return common.Util.objectDefinedNotNull(this._batch);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataQueryable.prototype, "batch", {
        /**
         * The batch currently associated with this query or null
         *
         */
        get: function () {
            return this.hasBatch ? this._batch : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Appends the given string and normalizes "/" chars
     *
     * @param pathPart The string to append
     */
    ODataQueryable.prototype.append = function (pathPart) {
        this._url = common.Util.combinePaths(this._url, pathPart);
    };
    Object.defineProperty(ODataQueryable.prototype, "parentUrl", {
        /**
         * Gets the parent url used when creating this instance
         *
         */
        get: function () {
            return this._parentUrl;
        },
        enumerable: true,
        configurable: true
    });
    return ODataQueryable;
}());

var ODataBatch = /** @class */ (function () {
    function ODataBatch(_batchId) {
        if (_batchId === void 0) { _batchId = common.Util.getGUID(); }
        this._batchId = _batchId;
        this._requests = [];
        this._dependencies = [];
    }
    Object.defineProperty(ODataBatch.prototype, "batchId", {
        get: function () {
            return this._batchId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataBatch.prototype, "requests", {
        /**
         * The requests contained in this batch
         */
        get: function () {
            return this._requests;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param url Request url
     * @param method Request method (GET, POST, etc)
     * @param options Any request options
     * @param parser The parser used to handle the eventual return from the query
     */
    ODataBatch.prototype.add = function (url, method, options, parser) {
        var info = {
            method: method.toUpperCase(),
            options: options,
            parser: parser,
            reject: null,
            resolve: null,
            url: url,
        };
        var p = new Promise(function (resolve, reject) {
            info.resolve = resolve;
            info.reject = reject;
        });
        this._requests.push(info);
        return p;
    };
    /**
     * Adds a dependency insuring that some set of actions will occur before a batch is processed.
     * MUST be cleared using the returned resolve delegate to allow batches to run
     */
    ODataBatch.prototype.addDependency = function () {
        var resolver = function () { return void (0); };
        var promise = new Promise(function (resolve) {
            resolver = resolve;
        });
        this._dependencies.push(promise);
        return resolver;
    };
    /**
     * Execute the current batch and resolve the associated promises
     *
     * @returns A promise which will be resolved once all of the batch's child promises have resolved
     */
    ODataBatch.prototype.execute = function () {
        var _this = this;
        // we need to check the dependencies twice due to how different engines handle things.
        // We can get a second set of promises added after the first set resolve
        return Promise.all(this._dependencies).then(function () { return Promise.all(_this._dependencies); }).then(function () { return _this.executeImpl(); });
    };
    return ODataBatch;
}());

exports.CachingOptions = CachingOptions;
exports.CachingParserWrapper = CachingParserWrapper;
exports.ODataParserBase = ODataParserBase;
exports.ProcessHttpClientResponseException = ProcessHttpClientResponseException;
exports.AlreadyInBatchException = AlreadyInBatchException;
exports.ODataDefaultParser = ODataDefaultParser;
exports.ODataValue = ODataValue;
exports.ODataRawParserImpl = ODataRawParserImpl;
exports.ODataRaw = ODataRaw;
exports.TextFileParser = TextFileParser;
exports.BlobFileParser = BlobFileParser;
exports.JSONFileParser = JSONFileParser;
exports.BufferFileParser = BufferFileParser;
exports.setResult = setResult;
exports.pipe = pipe;
exports.requestPipelineMethod = requestPipelineMethod;
exports.PipelineMethods = PipelineMethods;
exports.ODataQueryable = ODataQueryable;
exports.ODataBatch = ODataBatch;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=odata.es5.umd.js.map
