import { Dictionary, PnPClientStorage, RuntimeConfig, Util, mergeOptions } from '@pnp/common';
import { LogLevel, Logger } from '@pnp/logging';

class CachingOptions {
    constructor(key) {
        this.key = key;
        this.expiration = Util.dateAdd(new Date(), "second", RuntimeConfig.defaultCachingTimeoutSeconds);
        this.storeName = RuntimeConfig.defaultCachingStore;
    }
    get store() {
        if (this.storeName === "local") {
            return CachingOptions.storage.local;
        }
        else {
            return CachingOptions.storage.session;
        }
    }
}
CachingOptions.storage = new PnPClientStorage();
class CachingParserWrapper {
    constructor(_parser, _cacheOptions) {
        this._parser = _parser;
        this._cacheOptions = _cacheOptions;
    }
    parse(response) {
        // add this to the cache based on the options
        return this._parser.parse(response).then(data => {
            if (this._cacheOptions.store !== null) {
                this._cacheOptions.store.put(this._cacheOptions.key, data, this._cacheOptions.expiration);
            }
            return data;
        });
    }
}

/**
 * Represents an exception with an HttpClient request
 *
 */
class ProcessHttpClientResponseException extends Error {
    constructor(status, statusText, data) {
        super(`Error making HttpClient request in queryable: [${status}] ${statusText}`);
        this.status = status;
        this.statusText = statusText;
        this.data = data;
        this.name = "ProcessHttpClientResponseException";
        Logger.log({ data: this.data, level: LogLevel.Error, message: this.message });
    }
}
class AlreadyInBatchException extends Error {
    constructor(msg = "This query is already part of a batch.") {
        super(msg);
        this.name = "AlreadyInBatchException";
        Logger.log({ data: {}, level: LogLevel.Error, message: `[${this.name}]::${this.message}` });
    }
}

class ODataParserBase {
    parse(r) {
        return new Promise((resolve, reject) => {
            if (this.handleError(r, reject)) {
                if ((r.headers.has("Content-Length") && parseFloat(r.headers.get("Content-Length") || "-1") === 0) || r.status === 204) {
                    resolve({});
                }
                else {
                    // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
                    r.text()
                        .then(txt => txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {})
                        .then(json => resolve(this.parseODataJSON(json)))
                        .catch(e => reject(e));
                }
            }
        });
    }
    handleError(r, reject) {
        if (!r.ok) {
            r.json().then(json => {
                // include the headers as they contain diagnostic information
                const data = {
                    responseBody: json,
                    responseHeaders: r.headers,
                };
                reject(new ProcessHttpClientResponseException(r.status, r.statusText, data));
            }).catch(e => {
                // we failed to read the body - possibly it is empty. Let's report the original status that caused
                // the request to fail and log the error with parsing the body if anyone needs it for debugging
                Logger.log({
                    data: e,
                    level: LogLevel.Warning,
                    message: "There was an error parsing the error response body. See data for details.",
                });
                // include the headers as they contain diagnostic information
                const data = {
                    responseBody: "[[body not available]]",
                    responseHeaders: r.headers,
                };
                reject(new ProcessHttpClientResponseException(r.status, r.statusText, data));
            });
        }
        return r.ok;
    }
    parseODataJSON(json) {
        let result = json;
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
    }
}

class ODataDefaultParser extends ODataParserBase {
}
class ODataValueParserImpl extends ODataParserBase {
    parse(r) {
        return super.parse(r).then(d => d);
    }
}
function ODataValue() {
    return new ODataValueParserImpl();
}
class ODataRawParserImpl {
    parse(r) {
        return r.json();
    }
}
let ODataRaw = new ODataRawParserImpl();
class TextFileParser {
    parse(r) {
        return r.text();
    }
}
class BlobFileParser {
    parse(r) {
        return r.blob();
    }
}
class JSONFileParser {
    parse(r) {
        return r.json();
    }
}
class BufferFileParser {
    parse(r) {
        if (Util.isFunction(r.arrayBuffer)) {
            return r.arrayBuffer();
        }
        return r.buffer();
    }
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Resolves the context's result value
 *
 * @param context The current context
 */
function returnResult(context) {
    Logger.log({
        data: context.result,
        level: LogLevel.Verbose,
        message: `[${context.requestId}] (${(new Date()).getTime()}) Returning result, see data property for value.`,
    });
    return Promise.resolve(context.result || null);
}
/**
 * Sets the result on the context
 */
function setResult(context, value) {
    return new Promise((resolve) => {
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
    const _next = c.pipeline.shift();
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
        .then(ctx => returnResult(ctx))
        .catch((e) => {
        Logger.log({
            data: e,
            level: LogLevel.Error,
            message: `Error in request pipeline: ${e.message}`,
        });
        throw e;
    });
}
/**
 * decorator factory applied to methods in the pipeline to control behavior
 */
function requestPipelineMethod(alwaysRun = false) {
    return (target, propertyKey, descriptor) => {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            // if we have a result already in the pipeline, pass it along and don't call the tagged method
            if (!alwaysRun && args.length > 0 && args[0].hasOwnProperty("hasResult") && args[0].hasResult) {
                Logger.write(`[${args[0].requestId}] (${(new Date()).getTime()}) Skipping request pipeline method ${propertyKey}, existing result in pipeline.`, LogLevel.Verbose);
                return Promise.resolve(args[0]);
            }
            // apply the tagged method
            Logger.write(`[${args[0].requestId}] (${(new Date()).getTime()}) Calling request pipeline method ${propertyKey}.`, LogLevel.Verbose);
            // then chain the next method in the context's pipeline - allows for dynamic pipeline
            return method.apply(target, args).then((ctx) => next(ctx));
        };
    };
}
/**
 * Contains the methods used within the request pipeline
 */
class PipelineMethods {
    /**
     * Logs the start of the request
     */
    static logStart(context) {
        return new Promise(resolve => {
            Logger.log({
                data: Logger.activeLogLevel === LogLevel.Info ? {} : context,
                level: LogLevel.Info,
                message: `[${context.requestId}] (${(new Date()).getTime()}) Beginning ${context.verb} request (${context.requestAbsoluteUrl})`,
            });
            resolve(context);
        });
    }
    /**
     * Handles caching of the request
     */
    static caching(context) {
        return new Promise(resolve => {
            // handle caching, if applicable
            if (context.verb === "GET" && context.isCached) {
                Logger.write(`[${context.requestId}] (${(new Date()).getTime()}) Caching is enabled for request, checking cache...`, LogLevel.Info);
                let cacheOptions = new CachingOptions(context.requestAbsoluteUrl.toLowerCase());
                if (typeof context.cachingOptions !== "undefined") {
                    cacheOptions = Util.extend(cacheOptions, context.cachingOptions);
                }
                // we may not have a valid store
                if (cacheOptions.store !== null) {
                    // check if we have the data in cache and if so resolve the promise and return
                    const data = cacheOptions.store.get(cacheOptions.key);
                    if (data !== null) {
                        // ensure we clear any help batch dependency we are resolving from the cache
                        Logger.log({
                            data: Logger.activeLogLevel === LogLevel.Info ? {} : data,
                            level: LogLevel.Info,
                            message: `[${context.requestId}] (${(new Date()).getTime()}) Value returned from cache.`,
                        });
                        context.batchDependency();
                        return setResult(context, data).then(ctx => resolve(ctx));
                    }
                }
                Logger.write(`[${context.requestId}] (${(new Date()).getTime()}) Value not found in cache.`, LogLevel.Info);
                // if we don't then wrap the supplied parser in the caching parser wrapper
                // and send things on their way
                context.parser = new CachingParserWrapper(context.parser, cacheOptions);
            }
            return resolve(context);
        });
    }
    /**
     * Sends the request
     */
    static send(context) {
        return new Promise((resolve, reject) => {
            // send or batch the request
            if (context.isBatched) {
                // we are in a batch, so add to batch, remove dependency, and resolve with the batch's promise
                const p = context.batch.add(context.requestAbsoluteUrl, context.verb, context.options, context.parser);
                // we release the dependency here to ensure the batch does not execute until the request is added to the batch
                context.batchDependency();
                Logger.write(`[${context.requestId}] (${(new Date()).getTime()}) Batching request in batch ${context.batch.batchId}.`, LogLevel.Info);
                // we set the result as the promise which will be resolved by the batch's execution
                resolve(setResult(context, p));
            }
            else {
                Logger.write(`[${context.requestId}] (${(new Date()).getTime()}) Sending request.`, LogLevel.Info);
                // we are not part of a batch, so proceed as normal
                const client = context.clientFactory();
                const opts = Util.extend(context.options || {}, { method: context.verb });
                client.fetch(context.requestAbsoluteUrl, opts)
                    .then(response => context.parser.parse(response))
                    .then(result => setResult(context, result))
                    .then(ctx => resolve(ctx))
                    .catch(e => reject(e));
            }
        });
    }
    /**
     * Logs the end of the request
     */
    static logEnd(context) {
        return new Promise(resolve => {
            if (context.isBatched) {
                Logger.log({
                    data: Logger.activeLogLevel === LogLevel.Info ? {} : context,
                    level: LogLevel.Info,
                    message: `[${context.requestId}] (${(new Date()).getTime()}) ${context.verb} request will complete in batch ${context.batch.batchId}.`,
                });
            }
            else {
                Logger.log({
                    data: Logger.activeLogLevel === LogLevel.Info ? {} : context,
                    level: LogLevel.Info,
                    message: `[${context.requestId}] (${(new Date()).getTime()}) Completing ${context.verb} request.`,
                });
            }
            resolve(context);
        });
    }
    static get default() {
        return [
            PipelineMethods.logStart,
            PipelineMethods.caching,
            PipelineMethods.send,
            PipelineMethods.logEnd,
        ];
    }
}
__decorate([
    requestPipelineMethod(true)
], PipelineMethods, "logStart", null);
__decorate([
    requestPipelineMethod()
], PipelineMethods, "caching", null);
__decorate([
    requestPipelineMethod()
], PipelineMethods, "send", null);
__decorate([
    requestPipelineMethod(true)
], PipelineMethods, "logEnd", null);

class ODataQueryable {
    constructor() {
        this._batch = null;
        this._query = new Dictionary();
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
    concat(pathPart) {
        this._url += pathPart;
        return this;
    }
    /**
     * Provides access to the query builder for this url
     *
     */
    get query() {
        return this._query;
    }
    /**
     * Sets custom options for current object and all derived objects accessible via chaining
     *
     * @param options custom options
     */
    configure(options) {
        mergeOptions(this._options, options);
        return this;
    }
    /**
     * Enables caching for this request
     *
     * @param options Defines the options used when caching this request
     */
    usingCaching(options) {
        if (!RuntimeConfig.globalCacheDisable) {
            this._useCaching = true;
            if (typeof options !== "undefined") {
                this._cachingOptions = options;
            }
        }
        return this;
    }
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
    inBatch(batch) {
        if (this.batch !== null) {
            throw new AlreadyInBatchException();
        }
        this._batch = batch;
        return this;
    }
    /**
     * Gets the currentl url, made absolute based on the availability of the _spPageContextInfo object
     *
     */
    toUrl() {
        return this._url;
    }
    /**
     * Executes the currently built request
     *
     * @param parser Allows you to specify a parser to handle the result
     * @param getOptions The options used for this request
     */
    get(parser = new ODataDefaultParser(), options = {}) {
        return this.toRequestContext("GET", options, parser, PipelineMethods.default).then(context => pipe(context));
    }
    getAs(parser = new ODataDefaultParser(), options = {}) {
        return this.toRequestContext("GET", options, parser, PipelineMethods.default).then(context => pipe(context));
    }
    postCore(options = {}, parser = new ODataDefaultParser()) {
        return this.toRequestContext("POST", options, parser, PipelineMethods.default).then(context => pipe(context));
    }
    postAsCore(options = {}, parser = new ODataDefaultParser()) {
        return this.toRequestContext("POST", options, parser, PipelineMethods.default).then(context => pipe(context));
    }
    patchCore(options = {}, parser = new ODataDefaultParser()) {
        return this.toRequestContext("PATCH", options, parser, PipelineMethods.default).then(context => pipe(context));
    }
    deleteCore(options = {}, parser = new ODataDefaultParser()) {
        return this.toRequestContext("DELETE", options, parser, PipelineMethods.default).then(context => pipe(context));
    }
    /**
     * Blocks a batch call from occuring, MUST be cleared by calling the returned function
    */
    addBatchDependency() {
        if (this._batch !== null) {
            return this._batch.addDependency();
        }
        return () => null;
    }
    /**
     * Indicates if the current query has a batch associated
     *
     */
    get hasBatch() {
        return Util.objectDefinedNotNull(this._batch);
    }
    /**
     * The batch currently associated with this query or null
     *
     */
    get batch() {
        return this.hasBatch ? this._batch : null;
    }
    /**
     * Appends the given string and normalizes "/" chars
     *
     * @param pathPart The string to append
     */
    append(pathPart) {
        this._url = Util.combinePaths(this._url, pathPart);
    }
    /**
     * Gets the parent url used when creating this instance
     *
     */
    get parentUrl() {
        return this._parentUrl;
    }
}

class ODataBatch {
    constructor(_batchId = Util.getGUID()) {
        this._batchId = _batchId;
        this._requests = [];
        this._dependencies = [];
    }
    get batchId() {
        return this._batchId;
    }
    /**
     * The requests contained in this batch
     */
    get requests() {
        return this._requests;
    }
    /**
     *
     * @param url Request url
     * @param method Request method (GET, POST, etc)
     * @param options Any request options
     * @param parser The parser used to handle the eventual return from the query
     */
    add(url, method, options, parser) {
        const info = {
            method: method.toUpperCase(),
            options: options,
            parser: parser,
            reject: null,
            resolve: null,
            url: url,
        };
        const p = new Promise((resolve, reject) => {
            info.resolve = resolve;
            info.reject = reject;
        });
        this._requests.push(info);
        return p;
    }
    /**
     * Adds a dependency insuring that some set of actions will occur before a batch is processed.
     * MUST be cleared using the returned resolve delegate to allow batches to run
     */
    addDependency() {
        let resolver = () => void (0);
        const promise = new Promise((resolve) => {
            resolver = resolve;
        });
        this._dependencies.push(promise);
        return resolver;
    }
    /**
     * Execute the current batch and resolve the associated promises
     *
     * @returns A promise which will be resolved once all of the batch's child promises have resolved
     */
    execute() {
        // we need to check the dependencies twice due to how different engines handle things.
        // We can get a second set of promises added after the first set resolve
        return Promise.all(this._dependencies).then(() => Promise.all(this._dependencies)).then(() => this.executeImpl());
    }
}

export { CachingOptions, CachingParserWrapper, ODataParserBase, ProcessHttpClientResponseException, AlreadyInBatchException, ODataDefaultParser, ODataValue, ODataRawParserImpl, ODataRaw, TextFileParser, BlobFileParser, JSONFileParser, BufferFileParser, setResult, pipe, requestPipelineMethod, PipelineMethods, ODataQueryable, ODataBatch };
//# sourceMappingURL=odata.js.map
