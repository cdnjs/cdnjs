/*!
 * Copyright 2014 Netflix, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var falcor = require(7);
var get = require(52);
var set = require(88);
var inv = require(80);
var prototype = falcor.Model.prototype;

prototype._getBoundValue = get.getBoundValue;
prototype._getValueSync = get.getValueSync;
prototype._getPathSetsAsValues = get.getAsValues;
prototype._getPathSetsAsJSON = get.getAsJSON;
prototype._getPathSetsAsPathMap = get.getAsPathMap;
prototype._getPathSetsAsJSONG = get.getAsJSONG;
prototype._getPathMapsAsValues = get.getAsValues;
prototype._getPathMapsAsJSON = get.getAsJSON;
prototype._getPathMapsAsPathMap = get.getAsPathMap;
prototype._getPathMapsAsJSONG = get.getAsJSONG;

prototype._setPathSetsAsJSON = set.setPathSetsAsJSON;
prototype._setPathSetsAsJSONG = set.setPathSetsAsJSONG;
prototype._setPathSetsAsPathMap = set.setPathSetsAsPathMap;
prototype._setPathSetsAsValues = set.setPathSetsAsValues;

prototype._setPathMapsAsJSON = set.setPathMapsAsJSON;
prototype._setPathMapsAsJSONG = set.setPathMapsAsJSONG;
prototype._setPathMapsAsPathMap = set.setPathMapsAsPathMap;
prototype._setPathMapsAsValues = set.setPathMapsAsValues;

prototype._setJSONGsAsJSON = set.setJSONGsAsJSON;
prototype._setJSONGsAsJSONG = set.setJSONGsAsJSONG;
prototype._setJSONGsAsPathMap = set.setJSONGsAsPathMap;
prototype._setJSONGsAsValues = set.setJSONGsAsValues;

prototype._invPathSetsAsJSON = inv.invPathSetsAsJSON;
prototype._invPathSetsAsJSONG = inv.invPathSetsAsJSONG;
prototype._invPathSetsAsPathMap = inv.invPathSetsAsPathMap;
prototype._invPathSetsAsValues = inv.invPathSetsAsValues;

prototype._setCache = set.setCache;

module.exports = falcor;


},{"52":52,"7":7,"80":80,"88":88}],2:[function(require,module,exports){
if (typeof falcor === 'undefined') {
    var falcor = {};
}
var Rx = require(160);

falcor.__Internals = {};
falcor.Observable = Rx.Observable;
falcor.EXPIRES_NOW = 0;
falcor.EXPIRES_NEVER = 1;
/**
 * The current semVer'd data version of falcor.
 */
falcor.dataVersion = '0.1.0';

falcor.now = function now() {
    return Date.now();
};
falcor.NOOP = function() {};

module.exports = falcor;

},{"160":160}],3:[function(require,module,exports){
var falcor = require(2);
var ModelRoot = require(6);
var RequestQueue = require(39);
var ImmediateScheduler = require(41);
var ASAPScheduler = require(40);
var TimeoutScheduler = require(42);
var ERROR = require(138);
var ModelResponse = require(5);
var ModelDataSourceAdapter = require(4);
var call = require(8);
var operations = require(13);
var pathSyntax = require(177);
var getBoundValue = require(48);
var collect = require(85);
var slice = Array.prototype.slice;
var $ref = require(139);
var $error = require(138);
var $atom = require(137);
var getGeneration = require(49);
var noop = function(){};

/**
 * A Model object is used to execute commands against a {@link JSONGraph} object. {@link Model}s can work with a local JSONGraph cache, or it can work with a remote {@link JSONGraph} object through a {@link DataSource}.
 * @constructor
 * @param {?Object} options - A set of options to customize behavior
 * @param {?DataSource} options.source - A data source to retrieve and manage the {@link JSONGraph}
 * @param {?JSONGraph} options.cache - Initial state of the {@link JSONGraph}
 * @param {?number} options.maxSize - The maximum size of the cache
 * @param {?number} options.collectRatio - The ratio of the maximum size to collect when the maxSize is exceeded
 * @param {?Model~errorSelector} options.errorSelector - A function used to translate errors before they are returned
 */
var Model = module.exports = falcor.Model = function Model(options) {

    if (!options) {
        options = {};
    }

    this._materialized = options.materialized || false;
    this._boxed = options.boxed || false;
    this._treatErrorsAsValues = options.treatErrorsAsValues || false;

    this._dataSource = options.source;
    this._maxSize = options.maxSize || Math.pow(2, 53) - 1;
    this._collectRatio = options.collectRatio || 0.75;
    this._scheduler = new ImmediateScheduler();
    this._request = new RequestQueue(this, this._scheduler);
    this._errorSelector = options.errorSelector || Model.prototype._errorSelector;
    this._router = options.router;

    this._root = options.root || new ModelRoot();
    
    if (options.cache && typeof options.cache === "object") {
        this.setCache(options.cache);
    } else {
        this._cache = {};
    }
    this._path = [];
};

/**
 * The {@link Model}'s error selector is applied to any errors that occur during Model operations.  The return value of the error selector is substituted for the input error, giving clients the opportunity to translate error objects before they are returned from the {@link Model}.
 * @callback Model~errorSelector
 * @param {Object} requestedPath the requested path at which the error was found.
 * @error {Error} error the error that occured during the {@link Model} operation.
 * @returns {Error} the translated error object.
 */

Model.EXPIRES_NOW = falcor.EXPIRES_NOW;
Model.EXPIRES_NEVER = falcor.EXPIRES_NEVER;

Model.ref = function(path) {
    if (typeof path === 'string') {
        path = pathSyntax(path);
    }
    return {$type: $ref, value: path};
};

Model.error = function(error) {
    return {$type: $error, value: error};
};

Model.atom = function(value) {
    return {$type: $atom, value: value};
};

Model.prototype = {
    _boxed: false,
    _progressive: false,
    _errorSelector: function(x, y) { return y; },
    _comparator: function(a, b) {
        if (Boolean(a) && typeof a === "object" && a.hasOwnProperty("value") &&
            Boolean(b) && typeof b === "object" && b.hasOwnProperty("value")) {
            return a.value === b.value;
        }
        return a === b;
    },
    /**
     * The get method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model}. The get method is versatile and may be called in several different ways, allowing you to make different trade-offs between performance and expressiveness. The simplest invocation returns an ModelResponse stream that contains a JSON object with all of the requested values. An optional selector function can also be passed in order to translate the retrieved data before it appears in the Observable stream. If a selector function is provided, the output will be an Observable stream with the result of the selector function invocation instead of a ModelResponse stream.
     If you intend to transform the JSON data into another form, specifying a selector function may be more efficient. The selector function is run once all of the requested path values are available. In the body of the selector function, you can read data from the Model's cache using {@link Model.prototype.getValueSync} and transform it directly into its final representation (ex. an HTML string). This technique can reduce allocations by preventing the get method from copying the data in {@link Model}'s cache into an intermediary JSON representation.
     Instead of directly accessing the cache within the selector function, you can optionally pass arguments to the selector function and they will be automatically bound to the corresponding {@link Path} or {@link PathSet} passed to the get method. If a {@link Path} is bound to a selector function argument, the function argument will contain the value found at that path. However if a {@link PathSet} is bound to a selector function argument, the function argument will be a JSON structure containing all of the path values. Using argument binding can provide a good balance between allocations and expressiveness. For more detail on how {@link Path}s and {@link PathSet}s are bound to selector function arguments, see the examples below.  
     * @function
     * @param {...PathSet} path - The path(s) to retrieve
     * @param {?Function} selector - The callback to execute once all of the paths have been retrieved
     * @return {ModelResponse.<JSONEnvelope>|Observable} - The requested data as JSON, or the result of the optional selector function.
     */
    get: operations("get"),
    /**
     * Sets the value at one or more places in the JSONGraph model. The set method accepts one or more {@link PathValue}s, each of which is a combination of a location in the document and the value to place there.  In addition to accepting  {@link PathValue}s, the set method also returns the values after the set operation is complete.
     * @function
     * @param {...(PathValue | JSONGraphEnvelope | JSONEnvelope)} value - A value or collection of values to set into the Model.
     * @return {ModelResponse.<JSON> | Observable} - An {@link Observable} stream containing the values in the JSONGraph model after the set was attempted.
     */
    set: operations("set"),
    invalidate: operations("invalidate"),
    // TODO: Document selector function
    /*
     * Invoke a function
     * @function
     * @param {Path} functionPath - The path to the function to invoke
     * @param {Array.<Object>} args - The arguments to pass to the function
     * @param {Array.<PathSet>} pathSuffixes - The paths to retrieve from objects returned from the function
     * @param {Array.<PathSet>} calleePaths - The paths to retrieve from function callee after successful function execution
     * @param {Function} selector The selector function
     * @returns {ModelResponse.<*> | Observable} The {JSONGraph} fragment and associated metadata returned from the invoked function
     */
    call: call,
    /**
     * Get data for a single {@link Path}
     * @param {Path} path - The path to retrieve
     * @return {Observable.<*>} - The value for the path
     * @example
     var model = new falcor.Model({source: new falcor.HttpDataSource("/model.json") });

     model.
         getValue('user.name').
         subscribe(function(name) {
             console.log(name);
         });

     // The code above prints "Jim" to the console.
     */
    getValue: function(path) {
        return this.get(path, function(x) { return x; });
    },
    setValue: function(path, value) {
        path = pathSyntax.fromPath(path);
        return this.set(Array.isArray(path) ?
        {path: path, value: value} :
            path, function(x) { return x; });
    },
    /**
     * Returns a clone of the {@link Model} bound to a location within the {@link JSONGraph}. The bound location is never a {@link Reference}: any {@link Reference}s encountered while resolving the bound {@link Path} are always replaced with the {@link Reference}s target value. For subsequent operations on the {@link Model}, all paths will be evaluated relative to the bound path. Bind allows you to:
     * - Expose only a fragment of the {@link JSONGraph} to components, rather than the entire graph
     * - Hide the location of a {@link JSONGraph} fragment from components
     * - Optimize for executing multiple operations and path looksup at/below the same location in the {@link JSONGraph}
     * @param {Path} boundPath - The path to bind to
     * @param {...PathSet} relativePathsToPreload - Paths to preload before Model is created. These paths are relative to the bound path.
     * @return {Observable.<Model>} - An Observable stream with a single value, the bound {@link Model}, or an empty stream if nothing is found at the path
    */
    bind: function(boundPath) {

        var model = this, root = model._root,
            paths = new Array(arguments.length - 1),
            i = -1, n = arguments.length - 1;

        boundPath = pathSyntax.fromPath(boundPath);

        while(++i < n) {
            paths[i] = pathSyntax.fromPath(arguments[i + 1]);
        }

        if(root.allowSync <= 0 && n === 0) {
            throw new Error("Model#bind requires at least one value path.");
        }

        var syncBoundModelObs = falcor.Observable.create(function(observer) {
            var error;
            var boundModel;
            root.allowSync++;
            try {
                boundModel = model.bindSync(model._path.concat(boundPath));
            } catch(e) {
                error = e;
            }
            if(boundModel && !error) {
                observer.onNext(boundModel);
                observer.onCompleted();
            } else {
                observer.onError(error);
            }
            --root.allowSync;
        });

        return syncBoundModelObs.
            flatMap(function(boundModel) {
                if(paths.length > 0) {
                    return boundModel.get.apply(boundModel, paths.concat(function() {
                        return boundModel;
                    })).
                    catchException(falcor.Observable.empty());
                }
                return falcor.Observable.returnValue(boundModel);
            }).
            catchException(function() {
                if(paths.length > 0) {
                    var boundPaths = paths.map(function(path) {
                        return boundPath.concat(path);
                    });
                    boundPaths.push(noop);
                    return model.get.
                        apply(model, boundPaths).
                        flatMap(model.bind(boundPath));
                }
                return falcor.Observable.empty();
            });
    },
    /**
     * Set the local cache to a {@link JSONGraph} fragment. This method can be a useful way of mocking a remote document, or restoring the local cache from a previously stored state
     * @param {JSONGraph} jsonGraph - The {@link JSONGraph} fragment to use as the local cache
     */
    setCache: function(cache) {
        var size = this._cache && this._cache.$size || 0;
        var lru = this._root;
        var expired = lru.expired;
        this._cache = {};
        collect(lru, expired, -1, size, 0, 0);
        if(Array.isArray(cache.paths) && cache.jsong && typeof cache.jsong === "object") {
            this._setJSONGsAsJSON(this, [cache], []);
        } else {
            this._setCache(this, cache);
        }
        return this;
    },
    /**
     * Get the local {@link JSONGraph} cache. This method can be a useful to store the state of the cache
     * @param {...Array.<PathSet>} [pathSets] - The path(s) to retrieve. If no paths are specified, the entire {@link JSONGraph} is returned
     * @return {JSONGraph} jsonGraph - A {@link JSONGraph} fragment
     * @example
     // Storing the boxshot of the first 10 titles in the first 10 genreLists to local storage.
     localStorage.setItem('cache', JSON.stringify(model.getCache("genreLists[0...10][0...10].boxshot")));
     */ 
    getCache: function() {
        var paths = slice.call(arguments);
        if(paths.length === 0) {
            paths[0] = { json: this._cache };
        }
        var result;
        this.get.apply(this.
                withoutDataSource().
                boxValues().
                treatErrorsAsValues().
                materialize(), paths).
            toJSONG().
            subscribe(function(envelope) {
                result = envelope.jsong;
            });
        return result;
    },
    getGeneration: function(path) {
        path = path && pathSyntax.fromPath(path) || [];
        if (Array.isArray(path) === false) {
            throw new Error("Model#getGenerationSync must be called with an Array path.");
        }
        if (this._path.length) {
            path = this._path.concat(path);
        }
        return this._getGeneration(this, path);
    },
    _getGeneration: getGeneration,
    // TODO: Does not throw if given a PathSet rather than a Path, not sure if it should or not.
    // TODO: Doc not accurate? I was able to invoke directly against the Model, perhaps because I don't have a data source?
    // TODO: Not clear on what it means to "retrieve objects in addition to JSONGraph values"
    /**
     * Synchronously retrieves a single path from the local {@link Model} only and will not retrieve missing paths from the {@link DataSource}. This method can only be invoked when the {@link Model} does not have a {@link DataSource} or from within a selector function. See {@link Model.prototype.get}. The getValueSync method differs from the asynchronous get methods (ex. get, getValues) in that it can be used to retrieve objects in addition to JSONGraph values.
     * @arg {Path} path - The path to retrieve
     * @return {*} - The value for the specified path
     */
    getValueSync: function(path) {
        path = pathSyntax.fromPath(path);
        if (Array.isArray(path) === false) {
            throw new Error("Model#getValueSync must be called with an Array path.");
        }
        if (this._path.length) {
            path = this._path.concat(path);
        }
        return this.syncCheck("getValueSync") && this._getValueSync(this, path).value;
    },
    setValueSync: function(path, value, errorSelector) {
        path = pathSyntax.fromPath(path);

        if(Array.isArray(path) === false) {
            if(typeof errorSelector !== "function") {
                errorSelector = value || this._errorSelector;
            }
            value = path.value;
            path  = path.path;
        }

        if(Array.isArray(path) === false) {
            throw new Error("Model#setValueSync must be called with an Array path.");
        }

        if(this.syncCheck("setValueSync")) {

            var json = {};
            var tEeAV = this._treatErrorsAsValues;
            var boxed = this._boxed;

            this._treatErrorsAsValues = true;
            this._boxed = true;

            this._setPathSetsAsJSON(this, [{path: path, value: value}], [json], errorSelector);

            this._treatErrorsAsValues = tEeAV;
            this._boxed = boxed;

            json = json.json;

            if(json && json.$type === ERROR && !this._treatErrorsAsValues) {
                if(this._boxed) {
                    throw json;
                } else {
                    throw json.value;
                }
            } else if(this._boxed) {
                return json;
            }

            return json && json.value;
        }
    },
    // TODO: Document selector function elsewhere and link
    /**
     * Synchronously returns a clone of the {@link Model} bound to a location within the {@link JSONGraph}. The bound location is never a {@link Reference}: any {@link Reference}s encountered while resolving the bound {@link Path} are always replaced with the {@link Reference}s target value. For subsequent operations on the {@link Model}, all paths will be evaluated relative to the bound path. This method can only be invoked when the {@link Model} does not have a {@link DataSource} or from within a selector function. Bind allows you to:
     * - Expose only a fragment of the {@link JSONGraph} to components, rather than the entire graph
     * - Hide the location of a {@link JSONGraph} fragment from components
     * - Optimize for executing multiple operations and path looksup at/below the same location in the {@link JSONGraph}
     * @param {Path} path - The path to bind to
     * @return {Model}
     */
    bindSync: function(path) {
        path = pathSyntax.fromPath(path);
        if(Array.isArray(path) === false) {
            throw new Error("Model#bindSync must be called with an Array path.");
        }
        var boundValue = this.syncCheck("bindSync") && getBoundValue(this, this._path.concat(path));
        var node = boundValue.value;
        path = boundValue.path;
        if(boundValue.shorted) {
            if(Boolean(node)) {
                if(node.$type === ERROR) {
                    if(this._boxed) {
                        throw node;
                    }
                    throw node.value;
                    // throw new Error("Model#bindSync can\'t bind to or beyond an error: " + boundValue.toString());
                }
            }
            return undefined;
        } else if(Boolean(node) && node.$type === ERROR) {
            if(this._boxed) {
                throw node;
            }
            throw node.value;
        }
        return this.clone(["_path", boundValue.path]);
    },
    /**
     * Synchronously returns a clone of the {@link Model} bound to a location within the {@link JSONGraph}. Unlike bind or bindSync, softBind never optimizes its path.  Soft bind is ideal if you want to retrieve the bound path every time, rather than retrieve the optimized path once and then always retrieve paths from that object in the JSON Graph. For example, if you always wanted to retrieve the name from the first item in a list you could softBind to the path "list[0]".
     * @param {Path} path - The path prefix to retrieve every time an operation is executed on a Model.
     * @return {Model}
     */    
    softBind: function(path) {
        path = pathSyntax.fromPath(path);
        if(Array.isArray(path) === false) {
            throw new Error("Model#softBind must be called with an Array path.");
        }
        return this.clone(["_path", path]);
    },    
    clone: function() {

        var self = this;
        var clone = new Model();

        var key, keyValue;

        var keys = Object.keys(self);
        var keysIdx = -1;
        var keysLen = keys.length;
        while(++keysIdx < keysLen) {
            key = keys[keysIdx];
            clone[key] = self[key];
        }

        var argsIdx = -1;
        var argsLen = arguments.length;
        while(++argsIdx < argsLen) {
            keyValue = arguments[argsIdx];
            clone[keyValue[0]] = keyValue[1];
        }

        return clone;
    },
    // TODO: Should we be clearer this only applies to "get" operations? I'm assuming that is true
    /**
     * Returns a clone of the {@link Model} that eanbles batching. Within the configured time period, paths for operations of the same type are collected and executed on the {@link DataSource} in a batch. Batching can make more efficient use of the {@link DataSource} depending on its implementation, for example, reducing the number of HTTP requests to the server
     * @param {?Scheduler|number} schedulerOrDelay - Either a {@link Scheduler} that determines when to send a batch to the {@link DataSource}, or the number in milliseconds to collect a batch before sending to the {@link DataSource}. If this parameter is omitted, then batch collection ends at the end of the next tick.
     * @return {Model}
     */
    batch: function(schedulerOrDelay) {
        if(typeof schedulerOrDelay === "number") {
            schedulerOrDelay = new TimeoutScheduler(Math.round(Math.abs(schedulerOrDelay)));
        } else if(!schedulerOrDelay || !schedulerOrDelay.schedule) {
            schedulerOrDelay = new ASAPScheduler();
        }
        return this.clone(["_request", new RequestQueue(this, schedulerOrDelay)]);
    },
    /**
     * Returns a clone of the {@link Model} that disables batching. This is the default mode. Each operation will be executed on the {@link DataSource} separately
     * @name unbatch
     * @memberof Model.prototype
     * @function
     * @return {Model} a {@link Model} that batches requests of the same type and sends them to the data source together.
     */
    unbatch: function() {
        return this.clone(["_request", new RequestQueue(this, new ImmediateScheduler())]);
    },
    // TODO: Add example of treatErrorsAsValues
    /**
     * Returns a clone of the {@link Model} that treats errors as values. Errors will be reported in the same callback used to report data. Errors will appear as objects in responses, rather than being sent to the {@link Observable~onErrorCallback} callback of the {@link ModelResponse}.
     * @return {Model}
     */
    treatErrorsAsValues: function() {
        return this.clone(["_treatErrorsAsValues", true]);
    },
    asDataSource: function() {
        return new ModelDataSourceAdapter(this);
    },
    materialize: function() {
        return this.clone(["_materialized", true]);
    },
    /**
     * Returns a clone of the {@link Model} that boxes values returning the wrapper ({@link Atom}, {@link Reference}, or {@link Error}), rather than the value inside it. This allows any metadata attached to the wrapper to be inspected
     * @return {Model}
     */
    boxValues: function() {
        return this.clone(["_boxed", true]);
    },
    /**
     * Returns a clone of the {@link Model} that unboxes values, returning the value inside of the wrapper ({@link Atom}, {@link Reference}, or {@link Error}), rather than the wrapper itself. This is the default mode.
     * @return {Model}
     */
    unboxValues: function() {
        return this.clone(["_boxed", false]);
    },
    /**
     * Returns a clone of the {@link Model} that only uses the local {@link JSONGraph} and never uses a {@link DataSource} to retrieve missing paths
     * @return {Model}
     */
    withoutDataSource: function() {
        return this.clone(["_dataSource", null]);
    },
    withComparator: function(compare) {
        return this.clone(["_comparator", compare]);
    },
    withoutComparator: function(compare) {
        return this.clone(["_comparator", Model.prototype._comparator]);
    },
    syncCheck: function(name) {
        if (Boolean(this._dataSource) && this._root.allowSync <= 0 && this._root.unsafeMode === false) {
            throw new Error("Model#" + name + " may only be called within the context of a request selector.");
        }
        return true;
    },
    toJSON: function() {
        return { $type: "ref", value: this._path };
    }
};

},{"13":13,"137":137,"138":138,"139":139,"177":177,"2":2,"39":39,"4":4,"40":40,"41":41,"42":42,"48":48,"49":49,"5":5,"6":6,"8":8,"85":85}],4:[function(require,module,exports){
function ModelDataSourceAdapter(model) {
    this._model = model.materialize().boxValues().treatErrorsAsValues();
}

ModelDataSourceAdapter.prototype = {
    get: function(pathSets) {
        return this._model.get.apply(this._model, pathSets).toJSONG();
    },
    set: function(jsongResponse) {
        return this._model.set(jsongResponse).toJSONG();
    },
    call: function(path, args, suffixes, paths) {
        var params = [path, args, suffixes].concat(paths);
        return this._model.call.apply(this._model, params).toJSONG();
    }
};

module.exports = ModelDataSourceAdapter;
},{}],5:[function(require,module,exports){
var falcor = require(2);
var pathSyntax = require(177);

if(typeof Promise !== "undefined" && Promise) {
    falcor.Promise = Promise;
} else {
    falcor.Promise = require(184);
}

var Observable  = falcor.Observable,
    valuesMixin = { format: { value: "AsValues"  } },
    jsonMixin   = { format: { value: "AsPathMap" } },
    jsongMixin  = { format: { value: "AsJSONG"   } },
    progressiveMixin = { operationIsProgressive: { value: true } };

/**
 * A container for the results of an operation performed on a {@link Model}, which can convert the data into any of the following formats: JSON, {@link JSONGraph}, a stream of {@link PathValue}s, or a scalar value. Once the data format is determined, the ModelResponse container can be converted into any of the following container types: Observable (default), or a Promise. A ModelResponse can also push data to a node-style callback.
 * @constructor
 * @augments Observable
 */
function ModelResponse(forEach) {
    this._subscribe = forEach;
}

ModelResponse.create = function(forEach) {
    return new ModelResponse(forEach);
};

ModelResponse.fromOperation = function(model, args, selector, forEach) {
    return new ModelResponse(function(observer) {
        return forEach(Object.create(observer, {
            operationModel: {value: model},
            operationArgs: {value: pathSyntax.fromPathsOrPathValues(args)},
            operationSelector: {value: selector}
        }));
    });
};

function noop() {}
function mixin(self) {
    var mixins = Array.prototype.slice.call(arguments, 1);
    return new ModelResponse(function(other) {
        return self.subscribe(mixins.reduce(function(proto, mixin) {
            return Object.create(proto, mixin);
        }, other));
    });
}

ModelResponse.prototype = Observable.create(noop);
ModelResponse.prototype.format = "AsPathMap";

/**
 * Converts the data format to a stream of {@link PathValue}s
 * @return ModelResponse.<PathValue>
 */
ModelResponse.prototype.toPathValues = function() {
    return mixin(this, valuesMixin);
};

/**
 * Converts the data format to JSON 
 * @return ModelResponse.<JSONEnvelope>
 */
ModelResponse.prototype.toJSON = function() {
    return mixin(this, jsonMixin);
};

// TODO: Adapt this to eventual progressive API on model.
// TODO: Pretty sure this documentation is wrong as this just modifies output correct?

/**
 * The progressive method retrieves several {@link Path}s or {@link PathSet}s from the JSONGraph object, and makes them
 * available in the local cache. Like the {@link Model.prototype.getProgressively} function, getProgressively invokes a 
 * selector function every time is available, creating a stream of objects where each new object is a more populated version 
 * of the one before. The getProgressively function is a memory-efficient alternative to the getProgressively function, because get does not convert the requested data from JSONGraph to JSON. Instead the getProgressively function attempts to ensure that the requested paths are locally available in the cache when it invokes a selector function. Within the selector function, data is synchronously retrieved from the local cache and translated into another form - usually a view object. Within the selector function you can use helper methods like getValueSync and setValueSync to synchronously retrieve data from the cache. These methods are only valid within the selector function, and will throw if executed anywhere else.
 * @param {...PathSet} path - The path(s) to retrieve
 * @param {Function} selector - The callback to execute once all the paths have been retrieved
 * @return {ModelResponse.<JSONEnvelope>} the values found at the requested paths.
 */
ModelResponse.prototype.progressively = function() {
    return mixin(this, progressiveMixin);
};

/**
 * Converts the data format to {@link JSONGraph}
 * @return ModelResponse.<JSONGraphEnvelope>
 */
ModelResponse.prototype.toJSONG = function() {
    return mixin(this, jsongMixin);
};
ModelResponse.prototype.withErrorSelector = function(project) {
    return mixin(this, { errorSelector: { value: project } });
};
ModelResponse.prototype.withComparator = function(compare) {
    return mixin(this, { comparator: { value: compare } });
};
ModelResponse.prototype.then = function(onNext, onError) {
    var self = this;
    return new falcor.Promise(function(resolve, reject) {
        var value = undefined;
        var error = undefined;
        self.toArray().subscribe(
            function(values) {
                if(values.length <= 1) {
                    value = values[0];
                } else {
                    value = values;
                }
            },
            function(errors) {
                if(errors.length <= 1) {
                    error = errors[0];
                } else {
                    error = errors;
                }
                resolve = undefined;
                reject(error);
            },
            function() {
                if(Boolean(resolve)) {
                    resolve(value);
                }
            }
        );
    }).then(onNext, onError);
};

module.exports = ModelResponse;

},{"177":177,"184":184,"2":2}],6:[function(require,module,exports){
function ModelRoot() {
    this.expired = [];
    this.allowSync = 0;
    this.unsafeMode = false;
}

module.exports = ModelRoot;
},{}],7:[function(require,module,exports){
var falcor = require(2);
var Model = require(3);
falcor.Model = Model;

module.exports = falcor;

},{"2":2,"3":3}],8:[function(require,module,exports){
var $ref = require(139);
var falcor = require(2);
var Observable = falcor.Observable;
var pathSyntax = require(177);
var ModelResponse = require(5);

function mapPathSyntax(path) {
    if(typeof path === "string") {
        return pathSyntax(path);
    }
    return path;
}

module.exports = function call(path, args, suffixes, extraPaths, selector) {

    var model = this;
    
    args && Array.isArray(args) || (args = []);
    suffixes && Array.isArray(suffixes) || (suffixes = []);
    extraPaths = Array.prototype.slice.call(arguments, 3);
    if (typeof (selector = extraPaths[extraPaths.length - 1]) !== "function") {
        selector = undefined;
    } else {
        extraPaths = extraPaths.slice(0, -1);
    }

    path = mapPathSyntax(path);
    suffixes = suffixes.map(mapPathSyntax);
    extraPaths = extraPaths.map(mapPathSyntax);

    return ModelResponse.create(function (options) {

        var rootModel = model.clone(["_path", []]);
        var localRoot = rootModel.withoutDataSource();
        var dataSource = model._dataSource;
        var boundPath = model._path;
        var callPath = boundPath.concat(path);
        var thisPath = callPath.slice(0, -1);
        
        var localFnObs = model.
            withoutDataSource().
            get(path, function(localFn) {
                return {
                    model: rootModel.bindSync(thisPath).boxValues(),
                    localFn: localFn
                };
            });
        
        var localFnCallObs = localFnObs.flatMap(getLocalCallObs);
        
        var localOrRemoteCallObs = localFnCallObs.
            defaultIfEmpty(getRemoteCallObs(dataSource)).
            mergeAll();
        
        var setCallValuesObs = localOrRemoteCallObs.flatMap(setCallEnvelope);
        
        var innerDisposable;
        var disposable = setCallValuesObs.last().subscribe(function (envelope) {
            var paths = envelope.paths;
            var invalidated = envelope.invalidated;
            if (selector) {
                paths.push(function () {
                    return selector.call(model, paths);
                });
            }
            var innerObs = model.get.apply(model, paths);
            if(options.format === "AsJSONG") {
                innerObs = innerObs.toJSONG().doAction(function(envelope) {
                    envelope.invalidated = invalidated;
                });
            }
            innerDisposable = innerObs.subscribe(options);
        },
        function (e) { options.onError(e); });

        return {
            dispose: function () {
                disposable && disposable.dispose();
                innerDisposable && innerDisposable.dispose();
                disposable = undefined;
                innerDisposable = undefined;
            }
        };
        
        function getLocalCallObs(tuple) {

            var localFn = tuple && tuple.localFn;

            if (typeof localFn === "function") {

                var localFnModel = tuple.model;
                var localThisPath = localFnModel._path;
                var localFnCallObs = localFn.apply(localFnModel, args);
                var localFnResults = localFnCallObs.reduce(aggregateFnResults, {
                    values: [],
                    references: [],
                    invalidations: [],
                    localThisPath: localThisPath
                });
                var localSetValues = localFnResults.flatMap(setLocalValues);
                var remoteGetValues = localSetValues.flatMap(getRemoteValues);

                return Observable.returnValue(remoteGetValues);
            }

            return Observable.empty();

            function aggregateFnResults(results, pathValue) {
                var localThisPath = results.localThisPath;
                if (Boolean(pathValue.invalidated)) {
                    results.invalidations.push(localThisPath.concat(pathValue.path));
                } else {
                    var path = pathValue.path;
                    var value = pathValue.value;
                    if (Boolean(value) && typeof value === "object" && value.$type === $ref) {
                        results.references.push({
                            path: prependThisPath(path),
                            value: pathValue.value
                        });
                    } else {
                        results.values.push({
                            path: prependThisPath(path),
                            value: pathValue.value
                        });
                    }
                }
                return results;
            }

            function setLocalValues(results) {
                var values = results.values.concat(results.references);
                if(values.length > 0) {
                    return localRoot.set.
                        apply(localRoot, values).
                        toJSONG().
                        map(function(envelope) {
                            return { results: results, envelope: envelope };
                        });
                } else {
                    return Observable.returnValue({
                        results: results,
                        envelope: { jsong: {}, paths: [] }
                    });
                }
            }

            function getRemoteValues(tuple) {
                
                var envelope = tuple.envelope;
                var results = tuple.results;
                var values = results.values;
                var references = results.references;
                var invalidations = results.invalidations;
                
                var rootValues = values.map(pluckPath).map(prependThisPath);
                var rootSuffixes = references.reduce(prependRefToSuffixes, []);
                var rootExtraPaths = extraPaths.map(prependThisPath);
                var rootPaths = rootSuffixes.concat(rootExtraPaths);
                var envelopeObs;
                
                debugger;
                
                if(rootPaths.length > 0) {
                    envelopeObs = rootModel.get.apply(rootModel, rootValues.concat(rootPaths)).toJSONG();
                } else {
                    envelopeObs = Observable.returnValue(envelope);
                }
                
                return envelopeObs.doAction(function (envelope) {
                    envelope.invalidated = invalidations;
                });
            }

            function prependRefToSuffixes(refPaths, refPathValue) {
                var refPath = refPathValue.path;
                refPaths.push.apply(refPaths, suffixes.map(function (pathSuffix) {
                    return refPath.concat(pathSuffix);
                }));
                return refPaths;
            }

            function pluckPath(pathValue) {
                return pathValue.path;
            }

            function prependThisPath(path) {
                return thisPath.concat(path);
            }
        }
        
        function getRemoteCallObs(dataSource) {
            if(dataSource && typeof dataSource === "object") {
                return dataSource.
                    call(path, args, suffixes, extraPaths).
                    flatMap(invalidateLocalValues);
            }
            
            return Observable.empty();
            
            function invalidateLocalValues(envelope) {
                var invalidations = envelope.invalidated;
                if(invalidations && invalidations.length) {
                    return rootModel.invalidate.
                        apply(rootModel, invalidations).
                        map(function() { return envelope; })
                }
                return Observable.returnValue(envelope);
            }
        }

        function setCallEnvelope(envelope) {
            return localRoot.set(envelope, function () {
                return {
                    invalidated: envelope.invalidated,
                    paths: envelope.paths.map(function (path) {
                        return path.slice(boundPath.length);
                    })
                }
            });
        }

    });
};
},{"139":139,"177":177,"2":2,"5":5}],9:[function(require,module,exports){
var combineOperations = require(25);
var setSeedsOrOnNext = require(38);

/**
 * The initial args that are passed into the async request pipeline.
 * @see lib/falcor/operations/request.js for how initialArgs are used
 */
module.exports = function getInitialArgs(options, seeds, onNext) {
    var seedRequired = options.format !== 'AsValues';
    var isProgressive = options.operationIsProgressive;
    var spreadOperations = false;
    var operations =
        combineOperations(
            options.operationArgs, options.format, 'get',
            spreadOperations, isProgressive);
    setSeedsOrOnNext(
        operations, seedRequired, seeds, onNext, options.operationSelector);
    var requestOptions;
    return [operations];
};

},{"25":25,"38":38}],10:[function(require,module,exports){
var getSourceObserver = require(26);
var partitionOperations = require(33);
var mergeBoundPath = require(30);

module.exports = getSourceRequest;

function getSourceRequest(
    options, onNext, seeds, combinedResults, requestOptions, cb) {

    var model = options.operationModel;
    var boundPath = model._path;
    var missingPaths = combinedResults.requestedMissingPaths;
    if (boundPath.length) {
        for (var i = 0; i < missingPaths.length; ++i) {
            var pathSetIndex = missingPaths[i].pathSetIndex;
            var path = missingPaths[i] = boundPath.concat(missingPaths[i]);
            path.pathSetIndex = pathSetIndex;
        }
    }

    return model._request.get(
        missingPaths,
        combinedResults.optimizedMissingPaths,
        getSourceObserver(
            model,
            missingPaths,
            function getSourceCallback(err, results) {
                if (err) {
                    cb(err);
                    return;
                }

                // partitions the operations by their pathSetIndex
                var partitionOperationsAndSeeds = partitionOperations(
                    results,
                    seeds,
                    options.format,
                    onNext);

                // We allow for the rerequesting to happen.
                cb(null, partitionOperationsAndSeeds);
            }));
}


},{"26":26,"30":30,"33":33}],11:[function(require,module,exports){
var getInitialArgs = require(9);
var getSourceRequest = require(10);
var shouldRequest = require(12);
var request = require(16);
var processOperations = require(35);
var get = request(
    getInitialArgs,
    getSourceRequest,
    processOperations,
    shouldRequest);

module.exports = get;

},{"10":10,"12":12,"16":16,"35":35,"9":9}],12:[function(require,module,exports){
module.exports = function(model, combinedResults) {
    return model._dataSource && combinedResults.requestedMissingPaths.length > 0;
};

},{}],13:[function(require,module,exports){
var ModelResponse = require(5);
var get = require(11);
var set = require(18);
var invalidate = require(14);

module.exports = function modelOperation(name) {
    return function() {
        var model = this, root = model._root,
            args = Array.prototype.slice.call(arguments),
            selector = args[args.length - 1];
        if (typeof selector === 'function') {
            args.pop();
        } else {
            selector = false;
        }

        var modelResponder;
        switch (name) {
            case 'get':
                modelResponder = get;
                break;
            case 'set':
                modelResponder = set;
                break;
            case 'invalidate':
                modelResponder = invalidate;
                break;
        }
        return ModelResponse.fromOperation(
            model,
            args,
            selector,
            modelResponder);
    };
};

},{"11":11,"14":14,"18":18,"5":5}],14:[function(require,module,exports){
var invalidateInitialArgs = require(15);
var request = require(16);
var processOperations = require(35);
var invalidate = request(
    invalidateInitialArgs,
    null,
    processOperations);

module.exports = invalidate;

},{"15":15,"16":16,"35":35}],15:[function(require,module,exports){
var combineOperations = require(25);
var setSeedsOrOnNext = require(38);
module.exports = function getInitialArgs(options, seeds, onNext) {
    var seedRequired = options.format !== 'AsValues';
    var operations = combineOperations(
        options.operationArgs, options.format, 'inv');
    setSeedsOrOnNext(
        operations, seedRequired, seeds,
        onNext, options.operationSelector);

    return [operations, seeds];
};

},{"25":25,"38":38}],16:[function(require,module,exports){
var setSeedsOrOnNext = require(38);
var onNextValues = require(32);
var onCompletedOrError = require(31);
var primeSeeds = require(34);
var autoFalse = function() { return false; };

module.exports = request;

function request(initialArgs, sourceRequest, processOperations, shouldRequestFn, finalize) {
    if (!shouldRequestFn) {
        shouldRequestFn = autoFalse;
    }
    if(!finalize) {
        finalize = onCompletedOrError;
    }
    return function innerRequest(options) {
        var selector = options.operationSelector;
        var model = options.operationModel;
        var args = options.operationArgs;
        var onNext = options.onNext.bind(options);
        var onError = options.onError.bind(options);
        var onCompleted = options.onCompleted.bind(options);
        var isProgressive = options.operationIsProgressive;
        var errorSelector = options.errorSelector || model._errorSelector;
        var comparator = options.comparator || model._comparator;
        var selectorLength = selector && selector.length || 0;

        // State variables
        var errors = [];
        var format = options.format = selector && 'AsJSON' ||
            options.format || 'AsPathMap';
        var toJSONG = format === 'AsJSONG';
        var toJSON = format === 'AsPathMap';
        var toPathValues = format === 'AsValues';
        var seedRequired = toJSON || toJSONG || selector;
        var boundPath = model._path;
        var i, len;
        var foundValue = false;
        var seeds = primeSeeds(selector, selectorLength);
        var loopCount = 0;

        function recurse(operations, opts) {
            if (loopCount > 50) {
                throw 'Loop Kill switch thrown.';
            }
            var combinedResults = processOperations(
                model,
                operations,
                errorSelector,
                loopCount > 0 ? comparator : null,
                opts);

            foundValue = foundValue || combinedResults.valuesReceived;
            if (combinedResults.errors.length) {
                errors = errors.concat(combinedResults.errors);
            }

            // if in progressiveMode, values are emitted
            // each time through the recurse loop.  This may have
            // to change when the router is considered.
            if (isProgressive && !toPathValues) {
                onNextValues(model, onNext, seeds, selector);
            }

            // Performs the recursing via dataSource
            if (shouldRequestFn(model, combinedResults, loopCount)) {
                sourceRequest(
                    options,
                    onNext,
                    seeds,
                    combinedResults,
                    opts,
                    function onCompleteFromSourceSet(err, results) {
                        if (err) {
                            errors = errors.concat(err);
                            recurse([], seeds);
                            return;
                        }
                        ++loopCount;

                        // We continue to string the opts through
                        recurse(results, opts);
                    });
            }

            // Else we need to onNext values and complete/error.
            else {
                if (!toPathValues && !isProgressive && foundValue) {
                    onNextValues(model, onNext, seeds, selector);
                }
                finalize(model, onCompleted, onError, errors);
            }
        }

        try {
            recurse.apply(null,
                initialArgs(options, seeds, onNext));
        } catch(e) {
            errors = [e];
            finalize(model, onCompleted, onError, errors);
        }
    };
}

},{"31":31,"32":32,"34":34,"38":38}],17:[function(require,module,exports){
var collect = require(85);
var onCompletedOrError = require(31);

module.exports = function finalizeAndCollect(model, onCompleted, onError, errors) {
    onCompletedOrError(model, onCompleted, onError, errors);
    collect(
        model._root,
        model._root.expired,
        model._version,
        model._cache.$size || 0,
        model._maxSize,
        model._collectRatio
    );
};

},{"31":31,"85":85}],18:[function(require,module,exports){
var setInitialArgs = require(19);
var setSourceRequest = require(21);
var request = require(16);
var setProcessOperations = require(20);
var shouldRequest = require(22);
var finalize = require(17);
var set = request(
    setInitialArgs,
    setSourceRequest,
    setProcessOperations,
    shouldRequest,
    finalize
);

module.exports = set;

},{"16":16,"17":17,"19":19,"20":20,"21":21,"22":22}],19:[function(require,module,exports){
var combineOperations = require(25);
var setSeedsOrOnNext = require(38);
var Formats = require(23);
var toPathValues = Formats.toPathValues;
var toJSONG = Formats.toJSONG;
module.exports = function setInitialArgs(options, seeds, onNext) {
    var isPathValues = options.format === toPathValues;
    var seedRequired = !isPathValues;
    var shouldRequest = Boolean(options.operationModel._dataSource);
    var format = options.format;
    var args = options.operationArgs;
    var selector = options.operationSelector;
    var isProgressive = options.operationIsProgressive;
    var firstSeeds, operations;
    var requestOptions = {
        removeBoundPath: shouldRequest
    };

    // If Model is a slave, in shouldRequest mode,
    // a single seed is required to accumulate the jsong results.
    if (shouldRequest) {
        operations =
            combineOperations(args, toJSONG, 'set', selector, false);
        firstSeeds = [{}];
        setSeedsOrOnNext(
            operations, true, firstSeeds, false, options.selector);

        // we must keep track of the set seeds.
        requestOptions.requestSeed = firstSeeds[0];
    }

    // This model is the master, therefore a regular set can be performed.
    else {
        firstSeeds = seeds;
        operations = combineOperations(args, format, 'set');
        setSeedsOrOnNext(
            operations, seedRequired, seeds, onNext, options.operationSelector);
    }

    // We either have to construct the master operations if
    // the ModelResponse is isProgressive
    // the ModelResponse is toPathValues
    // but luckily we can just perform a get for the progressive or
    // toPathValues mode.
    if ((isProgressive || isPathValues) && shouldRequest && format !== toJSONG) {
        var getOps = combineOperations(
            args, format, 'get', selector, true);
        setSeedsOrOnNext(
            getOps, seedRequired, seeds, onNext, options.operationSelector);
        operations = operations.concat(getOps);

        requestOptions.isProgressive = true;
    }

    return [operations, requestOptions];
};

},{"23":23,"25":25,"38":38}],20:[function(require,module,exports){
var processOperations = require(35);
var combineOperations = require(25);
var mergeBoundPath = require(30);
var Formats = require(23);
var toPathValues = Formats.toPathValues;

module.exports = setProcessOperations;

function setProcessOperations(model, operations, errorSelector, comparator, requestOptions) {

    var boundPath = model._path;
    var hasBoundPath = boundPath.length > 0;
    var removeBoundPath = requestOptions && requestOptions.removeBoundPath;
    var isProgressive = requestOptions && requestOptions.isProgressive;
    var progressiveOperations;

    // if in progressive mode, then the progressive operations
    // need to be executed but the bound path must stay intact.
    if (isProgressive && removeBoundPath && hasBoundPath) {
        progressiveOperations = operations.filter(function(op) {
            return op.isProgressive;
        });
        operations = operations.filter(function(op) {
            return !op.isProgressive;
        });
    }

    if (removeBoundPath && hasBoundPath) {
        model._path = [];

        // For every operations arguments, the bound path must be adjusted.
        for (var i = 0, opLen = operations.length; i < opLen; i++) {
            var args = operations[i].args;
            for (var j = 0, argsLen = args.length; j < argsLen; j++) {
                args[j] = mergeBoundPath(args[j], boundPath);
            }
        }
    }

    var results = processOperations(model, operations, errorSelector, comparator);

    // We need to set the requestSeed to be the optimizedPaths only.
    // The bound path must be removed for this to work.
    if (removeBoundPath && model._dataSource && results.optimizedPaths) {
        var requestSeed = requestOptions.requestSeed = {};
        model._getPathSetsAsJSONG(model, results.optimizedPaths, [requestSeed]);
    }

    // Undo what we have done to the model's bound path.
    if (removeBoundPath && hasBoundPath) {
        model._path = boundPath;
    }

    // executes the progressive ops
    if (progressiveOperations) {
        processOperations(model, progressiveOperations, errorSelector, comparator);
    }

    return results;
}

},{"23":23,"25":25,"30":30,"35":35}],21:[function(require,module,exports){
var getSourceObserver = require(26);
var combineOperations = require(25);
var setSeedsOrOnNext = require(38);
var toPathValues = require(23).toPathValues;

module.exports = setSourceRequest;

function setSourceRequest(
        options, onNext, seeds, combinedResults, requestOptions, cb) {
    var model = options.operationModel;
    var seedRequired = options.format !== toPathValues;
    var requestSeed = requestOptions.requestSeed;
    return model._request.set(
        requestSeed,
        getSourceObserver(
            model,
            requestSeed.paths,
            function setSourceRequestCB(err, results) {
                if (err) {
                    cb(err);
                }

                // Sets the results into the model.
                model._setJSONGsAsJSON(model, [results], []);

                // Gets the original paths / maps back out.
                var operations = combineOperations(
                        options.operationArgs, options.format, 'get');
                setSeedsOrOnNext(
                    operations, seedRequired,
                    seeds, onNext, options.operationSelector);

                // unset the removeBoundPath.
                requestOptions.removeBoundPath = false;

                cb(null, operations);
            }));
}


},{"23":23,"25":25,"26":26,"38":38}],22:[function(require,module,exports){
// Set differs from get in the sense that the first time through
// the recurse loop a server operation must be performed if it can be.
module.exports = function(model, combinedResults, loopCount) {
    return model._dataSource && (
        combinedResults.requestedMissingPaths.length > 0 ||
        loopCount === 0);
};

},{}],23:[function(require,module,exports){
module.exports = {
    toPathValues: 'AsValues',
    toJSON: 'AsPathMap',
    toJSONG: 'AsJSONG',
    selector: 'AsJSON'
};

},{}],24:[function(require,module,exports){
module.exports = function buildJSONGOperation(format, seeds, jsongOp, seedOffset, onNext) {
    return {
        methodName: '_setJSONGs' + format,
        format: format,
        isValues: format === 'AsValues',
        onNext: onNext,
        seeds: seeds,
        seedsOffset: seedOffset,
        args: [jsongOp]
    };
};

},{}],25:[function(require,module,exports){
var isSeedRequired = require(36);
var isJSONG = require(28);
var isPathOrPathValue = require(29);
var Formats = require(23);
var toSelector = Formats.selector;
module.exports = function combineOperations(args, format, name, spread, isProgressive) {
    var seedRequired = isSeedRequired(format);
    var isValues = !seedRequired;
    var hasSelector = seedRequired && format === toSelector;
    var seedsOffset = 0;

    return args.
        reduce(function(groups, argument) {
            var group = groups[groups.length - 1];
            var type  = isPathOrPathValue(argument) ? "PathSets" :
                isJSONG(argument) ? "JSONGs" : "PathMaps";
            var groupType = group && group.type;
            var methodName = '_' + name + type + format;

            if (!groupType || type !== groupType || spread) {
                group = {
                    methodName: methodName,
                    format: format,
                    operation: name,
                    isValues: isValues,
                    seeds: [],
                    onNext: null,
                    seedsOffset: seedsOffset,
                    isProgressive: isProgressive,
                    type: type,
                    args: []
                };
                groups.push(group);
            }
            if (hasSelector) {
                ++seedsOffset;
            }
            group.args.push(argument);
            return groups;
        }, []);
};

},{"23":23,"28":28,"29":29,"36":36}],26:[function(require,module,exports){
var insertErrors = require(27);
/**
 * creates the model source observer
 * @param {Model} model
 * @param {Array.<Array>} requestedMissingPaths
 * @param {Function} cb
 */
function getSourceObserver(model, requestedMissingPaths, cb) {
    var incomingValues;
    return {
        onNext: function(jsongEnvelop) {
            incomingValues = {
                jsong: jsongEnvelop.jsong,
                paths: requestedMissingPaths
            };
        },
        onError: function(err) {
            cb(insertErrors(model, requestedMissingPaths, err));
        },
        onCompleted: function() {
            cb(false, incomingValues);
        }
    };
}

module.exports = getSourceObserver;

},{"27":27}],27:[function(require,module,exports){
/**
 * will insert the error provided for every requestedPath.
 * @param {Model} model
 * @param {Array.<Array>} requestedPaths
 * @param {Object} err
 */
module.exports = function insertErrors(model, requestedPaths, err) {
    var out = model._setPathSetsAsJSON.apply(null, [model].concat(
        requestedPaths.
            reduce(function(acc, r) {
                acc[0].push({
                    path: r,
                    value: err
                });
                return acc;
            }, [[]]),
        [[]],
        model._errorSelector,
        model._comparator
    ));
    return out.errors;
};


},{}],28:[function(require,module,exports){
module.exports = function isJSONG(x) {
    return x.hasOwnProperty("jsong");
};

},{}],29:[function(require,module,exports){
module.exports = function isPathOrPathValue(x) {
    return Array.isArray(x) || (
        x.hasOwnProperty("path") && x.hasOwnProperty("value"));
};

},{}],30:[function(require,module,exports){
var isJSONG = require(28);
var isPathValue = require(29);

module.exports =  mergeBoundPath;

function mergeBoundPath(arg, boundPath) {
    return isJSONG(arg) && mergeBoundPathIntoJSONG(arg, boundPath) ||
        isPathValue(arg) && mergeBoundPathIntoPathValue(arg, boundPath) ||
        mergeBoundPathIntoJSON(arg, boundPath);
}

function mergeBoundPathIntoJSONG(jsongEnv, boundPath) {
    var newJSONGEnv = {jsong: jsongEnv.jsong, paths: jsongEnv.paths};
    if (boundPath.length) {
        var paths = [];
        for (i = 0, len = jsongEnv.paths.length; i < len; i++) {
            paths[i] = boundPath.concat(jsongEnv.paths[i]);
        }
        newJSONGEnv.paths = paths;
    }

    return newJSONGEnv;
}

function mergeBoundPathIntoJSON(arg, boundPath) {
    var newArg = arg;
    if (boundPath.length) {
        newArg = {};
        for (var i = 0, len = boundPath.length - 1; i < len; i++) {
            newArg[boundPath[i]] = {};
        }
        newArg[boundPath[i]] = arg;
    }

    return newArg;
}

function mergeBoundPathIntoPathValue(arg, boundPath) {
    return {
        path: boundPath.concat(arg.path),
        value: arg.value
    };
}

},{"28":28,"29":29}],31:[function(require,module,exports){
module.exports = function onCompletedOrError(model, onCompleted, onError, errors) {
    if (errors.length) {
        onError(errors);
    } else {
        onCompleted();
    }
};

},{}],32:[function(require,module,exports){
/**
 * will onNext the observer with the seeds provided.
 * @param {Model} model
 * @param {Function} onNext
 * @param {Array.<Object>} seeds
 * @param {Function} [selector]
 */
module.exports = function onNextValues(model, onNext, seeds, selector) {
    var root = model._root;

    root.allowSync++;
    try {
        if (selector) {
            if (seeds.length) {
                // they should be wrapped in json items
                onNext(selector.apply(model, seeds.map(function(x, i) {
                    return x.json;
                })));
            } else {
                onNext(selector.call(model));
            }
        } else {
            // this means there is an onNext function that is not AsValues or progressive,
            // therefore there must only be one onNext call, which should only be the 0
            // index of the values of the array
            onNext(seeds[0]);
        }
    } catch (err) {
        throw err;
    } finally {
        root.allowSync--;
    }
};

},{}],33:[function(require,module,exports){
var buildJSONGOperation = require(24);

/**
 * It performs the opposite of combine operations.  It will take a JSONG
 * response and partition them into the required amount of operations.
 * @param {{jsong: Object, paths: Array}} jsongResponse
 */
module.exports = partitionOperations;

function partitionOperations(
        jsongResponse, seeds, format, onNext) {

    var partitionedOps = [];
    var requestedMissingPaths = jsongResponse.paths;

    if (format === 'AsJSON') {
        // fast collapse ass the requestedMissingPaths into their
        // respective groups
        var opsFromRequestedMissingPaths = [];
        var op = null;
        for (var i = 0, len = requestedMissingPaths.length; i < len; i++) {
            var missingPath = requestedMissingPaths[i];
            if (!op || op.idx !== missingPath.pathSetIndex) {
                op = {
                    idx: missingPath.pathSetIndex,
                    paths: []
                };
                opsFromRequestedMissingPaths.push(op);
            }
            op.paths.push(missingPath);
        }
        opsFromRequestedMissingPaths.forEach(function(op, i) {
            var seed = [seeds[op.idx]];
            var jsong = {
                jsong: jsongResponse.jsong,
                paths: op.paths
            };
            partitionedOps.push(buildJSONGOperation(
                format,
                seed,
                jsong,
                op.idx,
                onNext));
        });
    } else {
        partitionedOps[0] = buildJSONGOperation(format, seeds, jsongResponse, 0, onNext);
    }
    return partitionedOps;
}


},{"24":24}],34:[function(require,module,exports){
module.exports = function primeSeeds(selector, selectorLength) {
    var seeds = [];
    if (selector) {
        for (i = 0; i < selectorLength; i++) {
            seeds.push({});
        }
    } else {
        seeds[0] = {};
    }
    return seeds;
};

},{}],35:[function(require,module,exports){
module.exports = function processOperations(model, operations, errorSelector, comparator, boundPath) {
    return operations.reduce(function(memo, operation) {

        var jsonGraphOperation = model[operation.methodName];
        var seedsOrFunction = operation.isValues ?
            operation.onNext : operation.seeds;
        var results = jsonGraphOperation(
            model,
            operation.args,
            seedsOrFunction,
            errorSelector,
            comparator,
            boundPath);
        var missing = results.requestedMissingPaths;
        var offset = operation.seedsOffset;

        for (var i = 0, len = missing.length; i < len; i++) {
            missing[i].boundPath = boundPath;
            missing[i].pathSetIndex += offset;
        }

        memo.requestedMissingPaths = memo.requestedMissingPaths.concat(missing);
        memo.optimizedMissingPaths = memo.optimizedMissingPaths.concat(results.optimizedMissingPaths);
        memo.optimizedPaths = memo.optimizedPaths.concat(results.optimizedPaths);
        memo.errors = memo.errors.concat(results.errors);
        memo.valuesReceived = memo.valuesReceived || results.requestedPaths.length > 0;

        return memo;
    }, {
        errors: [],
        requestedMissingPaths: [],
        optimizedMissingPaths: [],
        optimizedPaths: [],
        valuesReceived: false
    });
}

},{}],36:[function(require,module,exports){
module.exports = function isSeedRequired(format) {
    return format === 'AsJSON' || format === 'AsJSONG' || format === 'AsPathMap';
};

},{}],37:[function(require,module,exports){
module.exports = function setSeedsOnGroups(groups, seeds, hasSelector) {
    var valueIndex = 0;
    var seedsLength = seeds.length;
    var j, i, len = groups.length, gLen, group;
    if (hasSelector) {
        for (i = 0; i < len && valueIndex < seedsLength; i++) {
            group = groups[i];
            gLen = gLen = group.args.length;
            for (j = 0; j < gLen && valueIndex < seedsLength; j++, valueIndex++) {
                group.seeds.push(seeds[valueIndex]);
            }
        }
    } else {
        for (i = 0; i < len && valueIndex < seedsLength; i++) {
            groups[i].seeds = seeds;
        }
    }
}

},{}],38:[function(require,module,exports){
var setSeedsOnGroups = require(37);
module.exports = function setSeedsOrOnNext(operations, seedRequired, seeds, onNext, selector) {
    if (seedRequired) {
        setSeedsOnGroups(operations, seeds, selector);
    } else {
        for (i = 0; i < operations.length; i++) {
            operations[i].onNext = onNext;
        }
    }
};

},{"37":37}],39:[function(require,module,exports){
var falcor = require(2);
var NOOP = falcor.NOOP;
var RequestQueue = function(jsongModel, scheduler) {
    this._scheduler = scheduler;
    this._jsongModel = jsongModel;

    this._scheduled = false;
    this._requests = [];
};

RequestQueue.prototype = {
    _get: function() {
        var i = -1;
        var requests = this._requests;
        while (++i < requests.length) {
            if (!requests[i].pending && requests[i].isGet) {
                return requests[i];
            }
        }
        return requests[requests.length] = new GetRequest(this._jsongModel, this);
    },
    _set: function() {
        var i = -1;
        var requests = this._requests;

        // TODO: Set always sends off a request immediately, so there is no batching.
        while (++i < requests.length) {
            if (!requests[i].pending && requests[i].isSet) {
                return requests[i];
            }
        }
        return requests[requests.length] = new SetRequest(this._jsongModel, this);
    },

    remove: function(request) {
        for (var i = this._requests.length - 1; i > -1; i--) {
            if (this._requests[i].id === request.id && this._requests.splice(i, 1)) {
                break;
            }
        }
    },

    set: function(jsongEnv, observer) {
        var self = this;
        var disposable = self._set().batch(jsongEnv, observer).flush();

        return {
            dispose: function() {
                disposable.dispose();
            }
        };
    },

    get: function(requestedPaths, optimizedPaths, observer) {
        var self = this;
        var disposable = null;

        // TODO: get does not batch across requests.
        self._get().batch(requestedPaths, optimizedPaths, observer);

        if (!self._scheduled) {
            self._scheduled = true;
            disposable = self._scheduler.schedule(self._flush.bind(self));
        }

        return {
            dispose: function() {
                disposable.dispose();
            }
        };
    },

    _flush: function() {
        this._scheduled = false;

        var requests = this._requests, i = -1;
        var disposables = [];
        while (++i < requests.length) {
            if (!requests[i].pending) {
                disposables[disposables.length] = requests[i].flush();
            }
        }

        return {
            dispose: function() {
                disposables.forEach(function(d) { d.dispose(); });
            }
        };
    }
};

var REQUEST_ID = 0;

var SetRequest = function(model, queue) {
    var self = this;
    self._jsongModel = model;
    self._queue = queue;
    self.observers = [];
    self.jsongEnvs = [];
    self.pending = false;
    self.id = ++REQUEST_ID;
    self.isSet = true;
};

SetRequest.prototype = {
    batch: function(jsongEnv, observer) {
        var self = this;
        observer.onNext = observer.onNext || NOOP;
        observer.onError = observer.onError || NOOP;
        observer.onCompleted = observer.onCompleted || NOOP;

        if (!observer.__observerId) {
            observer.__observerId = ++REQUEST_ID;
        }
        observer._requestId = self.id;

        self.observers[self.observers.length] = observer;
        self.jsongEnvs[self.jsongEnvs.length] = jsongEnv;

        return self;
    },
    flush: function() {
        var incomingValues, query, op, len;
        var self = this;
        var jsongs = self.jsongEnvs;
        var observers = self.observers;
        var model = self._jsongModel;
        self.pending = true;

        // TODO: Set does not batch.
        return model._dataSource.
            set(jsongs[0]).
            subscribe(function(response) {
                incomingValues = response;
            }, function(err) {
                var i = -1;
                var n = observers.length;
                while (++i < n) {
                    obs = observers[i];
                    obs.onError && obs.onError(err);
                }
            }, function() {
                var i, n, obs;
                self._queue.remove(self);
                i = -1;
                n = observers.length;
                while (++i < n) {
                    obs = observers[i];
                    obs.onNext && obs.onNext({
                        jsong: incomingValues.jsong || incomingValues.value,
                        paths: incomingValues.paths
                    });
                    obs.onCompleted && obs.onCompleted();
                }
            });
    }
};



var GetRequest = function(jsongModel, queue) {
    var self = this;
    self._jsongModel = jsongModel;
    self._queue = queue;
    self.observers = [];
    self.optimizedPaths = [];
    self.requestedPaths = [];
    self.pending = false;
    self.id = ++REQUEST_ID;
    self.isGet = true;
};

GetRequest.prototype = {

    batch: function(requestedPaths, optimizedPaths, observer) {
        // TODO: Do we need to gap fill?
        var self = this;
        observer.onNext = observer.onNext || NOOP;
        observer.onError = observer.onError || NOOP;
        observer.onCompleted = observer.onCompleted || NOOP;

        if (!observer.__observerId) {
            observer.__observerId = ++REQUEST_ID;
        }
        observer._requestId = self.id;

        self.observers[self.observers.length] = observer;
        self.optimizedPaths[self.optimizedPaths.length] = optimizedPaths;
        self.requestedPaths[self.requestedPaths.length] = requestedPaths;

        return self;
    },

    flush: function() {
        var incomingValues, query, op, len;
        var self = this;
        var requested = self.requestedPaths;
        var optimized = self.optimizedPaths;
        var observers = self.observers;
        var disposables = [];
        var results = [];
        var model = self._jsongModel;
        self._scheduled = false;
        self.pending = true;

        var optimizedMaps = {};
        var requestedMaps = {};
        var r, o, i, j, obs, resultIndex;
        for (i = 0, len = requested.length; i < len; i++) {
            r = requested[i];
            o = optimized[i];
            obs = observers[i];
            for (j = 0; j < r.length; j++) {
                pathsToMapWithObservers(r[j], 0, readyNode(requestedMaps, null, obs), obs);
                pathsToMapWithObservers(o[j], 0, readyNode(optimizedMaps, null, obs), obs);
            }
        }
        return model._dataSource.
            get(collapse(optimizedMaps)).
            subscribe(function(response) {
                incomingValues = response;
            }, function(err) {
                var i = -1;
                var n = observers.length;
                while (++i < n) {
                    obs = observers[i];
                    obs.onError && obs.onError(err);
                }
            }, function() {
                var i, n, obs;
                self._queue.remove(self);
                i = -1;
                n = observers.length;
                while (++i < n) {
                    obs = observers[i];
                    obs.onNext && obs.onNext({
                        jsong: incomingValues.jsong || incomingValues.value,
                        paths: incomingValues.paths
                    });
                    obs.onCompleted && obs.onCompleted();
                }
            });
    },
    // Returns the paths that are contained within this request.
    contains: function(requestedPaths, optimizedPaths) {
        // TODO:
    }
};

function pathsToMapWithObservers(path, idx, branch, observer) {
    var curr = path[idx];

    // Object / Array
    if (typeof curr === 'object') {
        if (Array.isArray(curr)) {
            curr.forEach(function(v) {
                readyNode(branch, v, observer);
                if (path.length > idx + 1) {
                    pathsToMapWithObservers(path, idx + 1, branch[v], observer);
                }
            });
        } else {
            var from = curr.from || 0;
            var to = curr.to >= 0 ? curr.to : curr.length;
            for (var i = from; i <= to; i++) {
                readyNode(branch, i, observer);
                if (path.length > idx + 1) {
                    pathsToMapWithObservers(path, idx + 1, branch[i], observer);
                }
            }
        }
    } else {
        readyNode(branch, curr, observer);
        if (path.length > idx + 1) {
            pathsToMapWithObservers(path, idx + 1, branch[curr], observer);
        }
    }
}

/**
 * Builds the set of collapsed
 * queries by traversing the tree
 * once
 */
var charPattern = /\D/i;

function readyNode(branch, key, observer) {
    if (key === null) {
        branch.__observers = branch.__observers || [];
        !containsObserver(branch.__observers, observer) && branch.__observers.push(observer);
        return branch;
    }

    if (!branch[key]) {
        branch[key] = {__observers: []};
    }

    !containsObserver(branch[key].__observers, observer) && branch[key].__observers.push(observer);
    return branch;
}

function containsObserver(observers, observer) {
    if (!observer) {
        return;
    }
    return observers.reduce(function(acc, x) {
        return acc || x.__observerId === observer.__observerId;
    }, false);
}

function collapse(pathMap) {
    return rangeCollapse(buildQueries(pathMap));
}

/**
 * Collapse ranges, e.g. when there is a continuous range
 * in an array, turn it into an object instead
 *
 * [1,2,3,4,5,6] => {"from":1, "to":6}
 *
 */
function rangeCollapse(paths) {
    paths.forEach(function (path) {
        path.forEach(function (elt, index) {
            var range;
            if (Array.isArray(elt) && elt.every(isNumber) && allUnique(elt)) {
                elt.sort(function(a, b) {
                    return a - b;
                });
                if (elt[elt.length-1] - elt[0] === elt.length-1) {
                    // create range
                    range = {};
                    range.from = elt[0];
                    range.to = elt[elt.length-1];
                    path[index] = range;
                }
            }
        });
    });
    return paths;
}

/* jshint forin: false */
function buildQueries(root) {

    if (root == null || typeof root !== 'object') {
        return [ [] ];
    }

    var children = Object.keys(root).filter(notPathMapInternalKeys),
        child, memo, paths, key, childIsNum,
        list, head, tail, clone, results,
        i = -1, n = children.length,
        j, k, x;

    if (n === 0 || Array.isArray(root) === true) {
        return [ [] ];
    }

    memo = {};
    while(++i < n) {
        child = children[i];
        paths = buildQueries(root[child]);
        key = createKey(paths);

        childIsNum = typeof child === 'string' && !charPattern.test(child);

        if ((list = memo[key]) && (head = list.head)) {
            head[head.length] = childIsNum ? parseInt(child, 10) : child;
        } else {
            memo[key] = {
                head: [childIsNum ? parseInt(child, 10) : child],
                tail: paths
            };
        }
    }

    results = [];
    for(x in memo) {
        head = (list = memo[x]).head;
        tail = list.tail;
        i = -1;
        n = tail.length;
        while(++i < n) {
            list = tail[i];
            j = -1;
            k = list.length;
            if(head[0] === '') {
                clone = [];
            } else {
                clone = [head.length === 1 ? head[0] : head];
                while(++j < k) {
                    clone[j + 1] = list[j];
                }
            }
            results[results.length] = clone;
        }
    }
    return results;
}

function notPathMapInternalKeys(key) {
    return (
        key !== "__observers" &&
        key !== "__pending" &&
        key !== "__batchID"
        );
}

/**
 * Return true if argument is a number
 */
function isNumber(val) {
    return typeof val === "number";
}

/**
 * allUnique
 * return true if every number in an array is unique
 */
function allUnique(arr) {
    var hash = {},
        index,
        len;

    for (index = 0, len = arr.length; index < len; index++) {
        if (hash[arr[index]]) {
            return false;
        }
        hash[arr[index]] = true;
    }
    return true;
}

/**
 * Sort a list-of-lists
 * Used for generating a unique hash
 * key for each subtree; used by the
 * memoization
 */
function sortLol(lol) {
    return lol.reduce(function (result, curr) {
        if (curr instanceof Array) {
            result.push(sortLol(curr).slice(0).sort());
            return result;
        }
        return result.concat(curr);
    }, []).slice(0).sort();
}

/**
 * Create a unique hash key for a set
 * of paths
 */
function createKey(list) {
    return JSON.stringify(sortLol(list));
}
// Note: For testing
falcor.__Internals.buildQueries = buildQueries;

module.exports = RequestQueue;

},{"2":2}],40:[function(require,module,exports){
var asap = require(147);


function ASAPScheduler() {
}

ASAPScheduler.prototype = {
    schedule: function(action) {
        asap(action);
    }
};

module.exports = ASAPScheduler;

},{"147":147}],41:[function(require,module,exports){
function ImmediateScheduler() {
}

ImmediateScheduler.prototype = {
    schedule: function(action) {
        action();
    }
};

module.exports = ImmediateScheduler;

},{}],42:[function(require,module,exports){
function TimeoutScheduler(delay) {
    this.delay = delay;
}

TimeoutScheduler.prototype = {
    schedule: function(action) {
        setTimeout(action, this.delay);
    }
};

module.exports = TimeoutScheduler;

},{}],43:[function(require,module,exports){
var hardLink = require(57);
var createHardlink = hardLink.create;
var onValue = require(55);
var isExpired = require(58);
var $path = require(139);
var __context = require(65);
var promote = require(61).promote;

function followReference(model, root, node, referenceContainer, reference, seed, outputFormat) {

    var depth = 0;
    var k, next;

    while (true) { //eslint-disable-line no-constant-condition
        if (depth === 0 && referenceContainer[__context]) {
            depth = reference.length;
            next = referenceContainer[__context];
        } else {
            k = reference[depth++];
            next = node[k];
        }
        if (next) {
            var type = next.$type;
            var value = type && next.value || next;

            if (depth < reference.length) {
                if (type) {
                    node = next;
                    break;
                }

                node = next;
                continue;
            }

            // We need to report a value or follow another reference.
            else {

                node = next;

                if (type && isExpired(next)) {
                    break;
                }

                if (!referenceContainer[__context]) {
                    createHardlink(referenceContainer, next);
                }

                // Restart the reference follower.
                if (type === $path) {
                    if (outputFormat === 'JSONG') {
                        onValue(model, next, seed, null, null, reference, null, outputFormat);
                    } else {
                        promote(model, next);
                    }

                    depth = 0;
                    reference = value;
                    referenceContainer = next;
                    node = root;
                    continue;
                }

                break;
            }
        } else {
            node = undefined;
        }
        break;
    }


    if (depth < reference.length && node !== undefined) {
        var ref = [];
        for (var i = 0; i < depth; i++) {
            ref[i] = reference[i];
        }
        reference = ref;
    }

    return [node, reference];
}

module.exports = followReference;

},{"139":139,"55":55,"57":57,"58":58,"61":61,"65":65}],44:[function(require,module,exports){
var getBoundValue = require(48);
var isPathValue = require(60);
module.exports = function(walk) {
    return function getAsJSON(model, paths, values) {
        var results = {
            values: [],
            errors: [],
            requestedPaths: [],
            optimizedPaths: [],
            requestedMissingPaths: [],
            optimizedMissingPaths: []
        };
        var requestedMissingPaths = results.requestedMissingPaths;
        var inputFormat = Array.isArray(paths[0]) || isPathValue(paths[0]) ?
            'Paths' : 'JSON';
        var cache = model._cache;
        var boundPath = model._path;
        var currentCachePosition;
        var missingIdx = 0;
        var boundOptimizedPath, optimizedPath;
        var i, j, len, bLen;

        results.values = values;
        if (!values) {
            values = [];
        }
        if (boundPath.length) {
            var boundValue = getBoundValue(model, boundPath);
            currentCachePosition = boundValue.value;
            optimizedPath = boundOptimizedPath = boundValue.path;
        } else {
            currentCachePosition = cache;
            optimizedPath = boundOptimizedPath = [];
        }

        for (i = 0, len = paths.length; i < len; i++) {
            var valueNode = undefined;
            var pathSet = paths[i];
            if (values[i]) {
                valueNode = values[i];
            }
            if (len > 1) {
                optimizedPath = [];
                for (j = 0, bLen = boundOptimizedPath.length; j < bLen; j++) {
                    optimizedPath[j] = boundOptimizedPath[j];
                }
            }
            if(inputFormat == 'JSON') {
                pathSet = pathSet.json;
            } else if (pathSet.path) {
                pathSet = pathSet.path;
            }

            walk(model, cache, currentCachePosition, pathSet, 0, valueNode, [], results, optimizedPath, [], inputFormat, 'JSON');
            if (missingIdx < requestedMissingPaths.length) {
                for (j = missingIdx, length = requestedMissingPaths.length; j < length; j++) {
                    requestedMissingPaths[j].pathSetIndex = i;
                }
                missingIdx = length;
            }
        }

        return results;
    };
};


},{"48":48,"60":60}],45:[function(require,module,exports){
var getBoundValue = require(48);
var isPathValue = require(60);
module.exports = function(walk) {
    return function getAsJSONG(model, paths, values) {
        var results = {
            values: [],
            errors: [],
            requestedPaths: [],
            optimizedPaths: [],
            requestedMissingPaths: [],
            optimizedMissingPaths: []
        };
        var inputFormat = Array.isArray(paths[0]) || isPathValue(paths[0]) ?
            'Paths' : 'JSON';
        results.values = values;
        var cache = model._cache;
        var boundPath = model._path;
        var currentCachePosition;
        if (boundPath.length) {
            throw 'It is not legal to use the JSON Graph format from a bound Model. JSON Graph format can only be used from a root model.';
        } else {
            currentCachePosition = cache;
        }

        for (var i = 0, len = paths.length; i < len; i++) {
            var pathSet = paths[i];
            if(inputFormat == 'JSON') {
                pathSet = pathSet.json;
            } else if (pathSet.path) {
                pathSet = pathSet.path;
            }
            walk(model, cache, currentCachePosition, pathSet, 0, values[0], [], results, [], [], inputFormat, 'JSONG');
        }
        return results;
    };
};


},{"48":48,"60":60}],46:[function(require,module,exports){
var getBoundValue = require(48);
var isPathValue = require(60);
module.exports = function(walk) {
    return function getAsPathMap(model, paths, values) {
        var valueNode;
        var results = {
            values: [],
            errors: [],
            requestedPaths: [],
            optimizedPaths: [],
            requestedMissingPaths: [],
            optimizedMissingPaths: []
        };
        var inputFormat = Array.isArray(paths[0]) || isPathValue(paths[0]) ?
            'Paths' : 'JSON';
        valueNode = values[0];
        results.values = values;

        var cache = model._cache;
        var boundPath = model._path;
        var currentCachePosition;
        var optimizedPath, boundOptimizedPath;
        if (boundPath.length) {
            var boundValue = getBoundValue(model, boundPath);
            currentCachePosition = boundValue.value;
            optimizedPath = boundOptimizedPath = boundValue.path;
        } else {
            currentCachePosition = cache;
            optimizedPath = boundOptimizedPath = [];
        }

        for (var i = 0, len = paths.length; i < len; i++) {
            if (len > 1) {
                optimizedPath = [];
                for (j = 0, bLen = boundOptimizedPath.length; j < bLen; j++) {
                    optimizedPath[j] = boundOptimizedPath[j];
                }
            }
            var pathSet = paths[i];
            if(inputFormat == 'JSON') {
                pathSet = pathSet.json;
            } else if (pathSet.path) {
                pathSet = pathSet.path;
            }
            walk(model, cache, currentCachePosition, pathSet, 0, valueNode, [], results, optimizedPath, [], inputFormat, 'PathMap');
        }
        return results;
    };
};

},{"48":48,"60":60}],47:[function(require,module,exports){
var getBoundValue = require(48);
var isPathValue = require(60);
module.exports = function(walk) {
    return function getAsValues(model, paths, onNext) {
        var results = {
            values: [],
            errors: [],
            requestedPaths: [],
            optimizedPaths: [],
            requestedMissingPaths: [],
            optimizedMissingPaths: []
        };
        var inputFormat = Array.isArray(paths[0]) || isPathValue(paths[0]) ?
            'Paths' : 'JSON';
        var cache = model._cache;
        var boundPath = model._path;
        var currentCachePosition;
        var optimizedPath, boundOptimizedPath;
        if (boundPath.length) {
            var boundValue = getBoundValue(model, boundPath);
            currentCachePosition = boundValue.value;
            optimizedPath = boundOptimizedPath = boundValue.path;
        } else {
            currentCachePosition = cache;
            optimizedPath = boundOptimizedPath = [];
        }

        for (var i = 0, len = paths.length; i < len; i++) {
            if (len > 1) {
                optimizedPath = [];
                for (j = 0, bLen = boundOptimizedPath.length; j < bLen; j++) {
                    optimizedPath[j] = boundOptimizedPath[j];
                }
            }
            var pathSet = paths[i];
            if(inputFormat == 'JSON') {
                pathSet = pathSet.json;
            } else if (pathSet.path) {
                pathSet = pathSet.path;
            }
            walk(model, cache, currentCachePosition, pathSet, 0, onNext, null, results, optimizedPath, [], inputFormat, 'Values');
        }
        return results;
    };
};


},{"48":48,"60":60}],48:[function(require,module,exports){
var getValueSync = require(50);
module.exports = function getBoundValue(model, path) {
    var boxed, value, shorted;

    boxed = model._boxed;
    model._boxed = true;
    value = getValueSync(model, path.concat(null));
    model._boxed = boxed;
    path = value.optimizedPath;
    shorted = value.shorted;
    value = value.value;
    while (path.length && path[path.length - 1] === null) {
        path.pop();
    }

    return {
        path: path,
        value: value,
        shorted: shorted
    };
};


},{"50":50}],49:[function(require,module,exports){
var __generation = require(66);

module.exports = function _getGeneration(model, path) {
    // ultra fast clone for boxed values.
    var gen = model._getValueSync({
        _boxed: true,
        _root: model._root,
        _cache: model._cache,
        _treatErrorsAsValues: model._treatErrorsAsValues
    }, path, true).value;
    return gen && gen[__generation];
};

},{"66":66}],50:[function(require,module,exports){
var followReference = require(43);
var clone = require(56);
var isExpired = require(58);
var promote = require(61).promote;
var $path = require(139);
var $atom = require(137);
var $error = require(138);

module.exports = function getValueSync(model, simplePath, noClone) {
    var root = model._cache;
    var len = simplePath.length;
    var optimizedPath = [];
    var shorted = false, shouldShort = false;
    var depth = 0;
    var key, i, next = root, type, curr = root, out, ref, refNode;
    do {
        key = simplePath[depth++];
        if (key !== null) {
            next = curr[key];
            optimizedPath[optimizedPath.length] = key;
        }

        if (!next) {
            out = undefined;
            shorted = true;
            break;
        }

        type = next.$type;

        // Up to the last key we follow references
        if (depth < len) {
            if (type === $path) {
                ref = followReference(model, root, root, next, next.value);
                refNode = ref[0];

                if (!refNode) {
                    out = undefined;
                    break;
                }
                type = refNode.$type;
                next = refNode;
                optimizedPath = ref[1].slice(0);
            }

            if (type) {
                break;
            }
        }
        // If there is a value, then we have great success, else, report an undefined.
        else {
            out = next;
        }
        curr = next;

    } while (next && depth < len);

    if (depth < len) {
        // Unfortunately, if all that follows are nulls, then we have not shorted.
        for (i = depth; i < len; ++i) {
            if (simplePath[depth] !== null) {
                shouldShort = true;
                break;
            }
        }
        // if we should short or report value.  Values are reported on nulls.
        if (shouldShort) {
            shorted = true;
            out = undefined;
        } else {
            out = next;
        }

        for (i = depth; i < len; ++i) {
            optimizedPath[optimizedPath.length] = simplePath[i];
        }
    }

    // promotes if not expired
    if (out) {
        if (isExpired(out)) {
            out = undefined;
        } else {
            promote(model, out);
        }
    }

    if (out && out.$type === $error && !model._treatErrorsAsValues) {
        throw {path: simplePath, value: out.value};
    } else if (out && model._boxed) {
        out = Boolean(type) && !noClone ? clone(out) : out;
    } else if (!out && model._materialized) {
        out = {$type: $atom};
    } else if (out) {
        out = out.value;
    }

    return {
        value: out,
        shorted: shorted,
        optimizedPath: optimizedPath
    };
};

},{"137":137,"138":138,"139":139,"43":43,"56":56,"58":58,"61":61}],51:[function(require,module,exports){
var followReference = require(43);
var onError = require(53);
var onMissing = require(54);
var onValue = require(55);
var lru = require(61);
var hardLink = require(57);
var isMaterialized = require(59);
var removeHardlink = hardLink.remove;
var splice = lru.splice;
var isExpired = require(58);
var permuteKey = require(62);
var $path = require(139);
var $error = require(138);
var __invalidated = require(68);
var prefix = require(73);

function getWalk(model, root, curr, pathOrJSON, depth, seedOrFunction, positionalInfo, outerResults, optimizedPath, requestedPath, inputFormat, outputFormat, fromReference) {
    if ((!curr || curr && curr.$type) &&
        evaluateNode(model, curr, pathOrJSON, depth, seedOrFunction, requestedPath, optimizedPath, positionalInfo, outerResults, outputFormat, fromReference)) {
        return;
    }

    // We continue the search to the end of the path/json structure.
    else {

        // Base case of the searching:  Have we hit the end of the road?
        // Paths
        // 1) depth === path.length
        // PathMaps (json input)
        // 2) if its an object with no keys
        // 3) its a non-object
        var jsonQuery = inputFormat === 'JSON';
        var atEndOfJSONQuery = false;
        var k, i, len;
        if (jsonQuery) {
            // it has a $type property means we have hit a end.
            if (pathOrJSON && pathOrJSON.$type) {
                atEndOfJSONQuery = true;
            }

            else if (pathOrJSON && typeof pathOrJSON === 'object') {
                k = Object.keys(pathOrJSON);

                // Parses out all the prefix keys so that later parts
                // of the algorithm do not have to consider them.
                var parsedKeys = [];
                var parsedKeysLength = -1;
                for (i = 0, len = k.length; i < len; ++i) {
                    if (k[i][0] !== prefix && k[i][0] !== '$') {
                        parsedKeys[++parsedKeysLength] = k[i];
                    }
                }
                k = parsedKeys;
                if (k.length === 1) {
                    k = k[0];
                }
            }

            // found a primitive, we hit the end.
            else {
                atEndOfJSONQuery = true;
            }
        } else {
            k = pathOrJSON[depth];
        }

        // BaseCase: we have hit the end of our query without finding a 'leaf' node, therefore emit missing.
        if (atEndOfJSONQuery || !jsonQuery && depth === pathOrJSON.length) {
            if (isMaterialized(model)) {
                onValue(model, curr, seedOrFunction, outerResults, requestedPath, optimizedPath, positionalInfo, outputFormat, fromReference);
                return;
            }
            onMissing(model, curr, pathOrJSON, depth, seedOrFunction, outerResults, requestedPath, optimizedPath, positionalInfo, outputFormat);
            return;
        }

        var memo = {done: false};
        var permutePosition = positionalInfo;
        var permuteRequested = requestedPath;
        var permuteOptimized = optimizedPath;
        var asJSONG = outputFormat === 'JSONG';
        var asJSON = outputFormat === 'JSON';
        var isKeySet = false;
        var hasChildren = false;
        depth++;

        var key;
        if (k && typeof k === 'object') {
            memo.isArray = Array.isArray(k);
            memo.arrOffset = 0;

            key = permuteKey(k, memo);
            isKeySet = true;

            // The complex key provided is actual empty
            if (memo.done) {
                return;
            }
        } else {
            key = k;
            memo.done = true;
        }

        if (asJSON && isKeySet) {
            permutePosition = [];
            for (i = 0, len = positionalInfo.length; i < len; i++) {
                permutePosition[i] = positionalInfo[i];
            }
            permutePosition.push(depth - 1);
        }

        do {
            fromReference = false;
            if (!memo.done) {
                permuteOptimized = [];
                permuteRequested = [];
                for (i = 0, len = requestedPath.length; i < len; i++) {
                    permuteRequested[i] = requestedPath[i];
                }
                for (i = 0, len = optimizedPath.length; i < len; i++) {
                    permuteOptimized[i] = optimizedPath[i];
                }
            }

            var nextPathOrPathMap = jsonQuery ? pathOrJSON[key] : pathOrJSON;
            if (jsonQuery && nextPathOrPathMap) {
                if (typeof nextPathOrPathMap === 'object') {
                    if (nextPathOrPathMap.$type) {
                        hasChildren = false;
                    } else {
                        hasChildren = Object.keys(nextPathOrPathMap).length > 0;
                    }
                }
            }

            var next;
            if (key === null || jsonQuery && key === '__null') {
                next = curr;
            } else {
                next = curr[key];
                permuteOptimized.push(key);
                permuteRequested.push(key);
            }

            if (next) {
                var nType = next.$type;
                var value = nType && next.value || next;

                if (jsonQuery && hasChildren || !jsonQuery && depth < pathOrJSON.length) {

                    if (nType && nType === $path && !isExpired(next)) {
                        if (asJSONG) {
                            onValue(model, next, seedOrFunction, outerResults, false, permuteOptimized, permutePosition, outputFormat);
                        }
                        var ref = followReference(model, root, root, next, value, seedOrFunction, outputFormat);
                        fromReference = true;
                        next = ref[0];
                        var refPath = ref[1];

                        permuteOptimized = [];
                        for (i = 0, len = refPath.length; i < len; i++) {
                            permuteOptimized[i] = refPath[i];
                        }
                    }
                }
            }
            getWalk(model, root, next, nextPathOrPathMap, depth, seedOrFunction, permutePosition, outerResults, permuteOptimized, permuteRequested, inputFormat, outputFormat, fromReference);

            if (!memo.done) {
                key = permuteKey(k, memo);
            }

        } while (!memo.done);
    }
}

function evaluateNode(model, curr, pathOrJSON, depth, seedOrFunction, requestedPath, optimizedPath, positionalInfo, outerResults, outputFormat, fromReference) {
    // BaseCase: This position does not exist, emit missing.
    if (!curr) {
        if (isMaterialized(model)) {
            onValue(model, curr, seedOrFunction, outerResults, requestedPath, optimizedPath, positionalInfo, outputFormat, fromReference);
        } else {
            onMissing(model, curr, pathOrJSON, depth, seedOrFunction, outerResults, requestedPath, optimizedPath, positionalInfo, outputFormat);
        }
        return true;
    }

    var currType = curr.$type;

    positionalInfo = positionalInfo || [];

    // The Base Cases.  There is a type, therefore we have hit a 'leaf' node.
    if (currType === $error) {
        if (fromReference) {
            requestedPath.push(null);
        }
        if (outputFormat === 'JSONG' || model._treatErrorsAsValues) {
            onValue(model, curr, seedOrFunction, outerResults, requestedPath, optimizedPath, positionalInfo, outputFormat, fromReference);
        } else {
            onError(model, curr, requestedPath, optimizedPath, outerResults);
        }
    }

    // Else we have found a value, emit the current position information.
    else {
        if (isExpired(curr)) {
            if (!curr[__invalidated]) {
                splice(model, curr);
                removeHardlink(curr);
            }
            onMissing(model, curr, pathOrJSON, depth, seedOrFunction, outerResults, requestedPath, optimizedPath, positionalInfo, outputFormat);
        } else {
            onValue(model, curr, seedOrFunction, outerResults, requestedPath, optimizedPath, positionalInfo, outputFormat, fromReference);
        }
    }

    return true;
}

module.exports = getWalk;

},{"138":138,"139":139,"43":43,"53":53,"54":54,"55":55,"57":57,"58":58,"59":59,"61":61,"62":62,"68":68,"73":73}],52:[function(require,module,exports){
var walk = require(51);
module.exports = {
    getAsJSON: require(44)(walk),
    getAsJSONG: require(45)(walk),
    getAsValues: require(47)(walk),
    getAsPathMap: require(46)(walk),
    getValueSync: require(50),
    getBoundValue: require(48)
};


},{"44":44,"45":45,"46":46,"47":47,"48":48,"50":50,"51":51}],53:[function(require,module,exports){
var lru = require(61);
var clone = require(56);
var promote = lru.promote;
module.exports = function onError(model, node, permuteRequested, permuteOptimized, outerResults) {
    outerResults.errors.push({path: permuteRequested, value: node.value});
    promote(model, node);
};


},{"56":56,"61":61}],54:[function(require,module,exports){
var support = require(64);
var fastCat = support.fastCat,
    fastCatSkipNulls = support.fastCatSkipNulls,
    fastCopy = support.fastCopy;
var isExpired = require(58);
var spreadJSON = require(63);
var clone = require(56);

module.exports = function onMissing(model, node, path, depth, seedOrFunction, outerResults, permuteRequested, permuteOptimized, permutePosition, outputFormat) {
    var pathSlice;
    if (Array.isArray(path)) {
        if (depth < path.length) {
            pathSlice = fastCopy(path, depth);
        } else {
            pathSlice = [];
        }

        concatAndInsertMissing(pathSlice, outerResults, permuteRequested, permuteOptimized, permutePosition, outputFormat);
    } else {
        pathSlice = [];
        spreadJSON(path, pathSlice);

        for (var i = 0, len = pathSlice.length; i < len; i++) {
            concatAndInsertMissing(pathSlice[i], outerResults, permuteRequested, permuteOptimized, permutePosition, outputFormat, true);
        }
    }
};

function concatAndInsertMissing(remainingPath, results, permuteRequested, permuteOptimized, permutePosition, outputFormat, __null) {
    var i = 0, len;
    if (__null) {
        for (i = 0, len = remainingPath.length; i < len; i++) {
            if (remainingPath[i] === '__null') {
                remainingPath[i] = null;
            }
        }
    }
    if (outputFormat === 'JSON') {
        permuteRequested = fastCat(permuteRequested, remainingPath);
        for (i = 0, len = permutePosition.length; i < len; i++) {
            var idx = permutePosition[i];
            var r = permuteRequested[idx];
            permuteRequested[idx] = [r];
        }
        results.requestedMissingPaths.push(permuteRequested);
        results.optimizedMissingPaths.push(fastCatSkipNulls(permuteOptimized, remainingPath));
    } else {
        results.requestedMissingPaths.push(fastCat(permuteRequested, remainingPath));
        results.optimizedMissingPaths.push(fastCatSkipNulls(permuteOptimized, remainingPath));
    }
}


},{"56":56,"58":58,"63":63,"64":64}],55:[function(require,module,exports){
var lru = require(61);
var clone = require(56);
var promote = lru.promote;
var $path = require(139);
var $atom = require(137);
var $error = require(138);
module.exports = function onValue(model, node, seedOrFunction, outerResults, permuteRequested, permuteOptimized, permutePosition, outputFormat, fromReference) {
    var i, len, k, key, curr, prev, prevK;
    var materialized = false, valueNode;
    if (node) {
        promote(model, node);
    }

    if (!node || node.value === undefined) {
        materialized = model._materialized;
    }

    // materialized
    if (materialized) {
        valueNode = {$type: $atom};
    }

    // Boxed Mode will clone the node.
    else if (model._boxed) {
        valueNode = clone(node);
    }

    // JSONG always clones the node.
    else if (node.$type === $path || node.$type === $error) {
        if (outputFormat === 'JSONG') {
            valueNode = clone(node);
        } else {
            valueNode = node.value;
        }
    }

    else {
        if (outputFormat === 'JSONG') {
            if (typeof node.value === 'object') {
                valueNode = clone(node);
            } else {
                valueNode = node.value;
            }
        } else {
            valueNode = node.value;
        }
    }


    if (permuteRequested) {
        if (fromReference && permuteRequested[permuteRequested.length - 1] !== null) {
            permuteRequested.push(null);
        }
        outerResults.requestedPaths.push(permuteRequested);
        outerResults.optimizedPaths.push(permuteOptimized);
    }

    switch (outputFormat) {

        case 'Values':
            // Its difficult to invert this statement, so for now i am going
            // to leave it as is.  This just prevents onNexts from happening on
            // undefined nodes
            if (valueNode === undefined ||
                !materialized && !model._boxed && valueNode &&
                valueNode.$type === $atom && valueNode.value === undefined) {
                return;
            }
            seedOrFunction({path: permuteRequested, value: valueNode});
            break;

        case 'PathMap':
            len = permuteRequested.length - 1;
            if (len === -1) {
                seedOrFunction.json = valueNode;
            } else {
                curr = seedOrFunction.json;
                if (!curr) {
                    curr = seedOrFunction.json = {};
                }
                for (i = 0; i < len; i++) {
                    k = permuteRequested[i];
                    if (!curr[k]) {
                        curr[k] = {};
                    }
                    prev = curr;
                    prevK = k;
                    curr = curr[k];
                }
                k = permuteRequested[i];
                if (k !== null) {
                    curr[k] = valueNode;
                } else {
                    prev[prevK] = valueNode;
                }
            }
            break;

        case 'JSON':
            if (seedOrFunction) {
                if (permutePosition.length) {
                    if (!seedOrFunction.json) {
                        seedOrFunction.json = {};
                    }
                    curr = seedOrFunction.json;
                    for (i = 0, len = permutePosition.length - 1; i < len; i++) {
                        k = permutePosition[i];
                        key = permuteRequested[k];

                        if (!curr[key]) {
                            curr[key] = {};
                        }
                        curr = curr[key];
                    }

                    // assign the last
                    k = permutePosition[i];
                    key = permuteRequested[k];
                    curr[key] = valueNode;
                } else {
                    seedOrFunction.json = valueNode;
                }
            }
            break;

        case 'JSONG':
            curr = seedOrFunction.jsong;
            if (!curr) {
                curr = seedOrFunction.jsong = {};
                seedOrFunction.paths = [];
            }
            for (i = 0, len = permuteOptimized.length - 1; i < len; i++) {
                key = permuteOptimized[i];

                if (!curr[key]) {
                    curr[key] = {};
                }
                curr = curr[key];
            }

            // assign the last
            key = permuteOptimized[i];

            // TODO: Special case? do string comparisons make big difference?
            curr[key] = materialized ? {$type: $atom} : valueNode;
            if (permuteRequested) {
                seedOrFunction.paths.push(permuteRequested);
            }
            break;
    }
};



},{"137":137,"138":138,"139":139,"56":56,"61":61}],56:[function(require,module,exports){
// Copies the node
var prefix = require(73);
module.exports = function clone(node) {
    var outValue, i, len;
    var keys = Object.keys(node);
    
    outValue = {};
    for (i = 0, len = keys.length; i < len; i++) {
        var k = keys[i];
        if (k[0] === prefix) {
            continue;
        }
        outValue[k] = node[k];
    }
    return outValue;
};


},{"73":73}],57:[function(require,module,exports){
var __ref = require(76);
var __context = require(65);
var __ref_index = require(75);
var __refs_length = require(77);

function createHardlink(from, to) {
    
    // create a back reference
    var backRefs  = to[__refs_length] || 0;
    to[__ref + backRefs] = from;
    to[__refs_length] = backRefs + 1;
    
    // create a hard reference
    from[__ref_index] = backRefs;
    from[__context] = to;
}

function removeHardlink(cacheObject) {
    var context = cacheObject[__context];
    if (context) {
        var idx = cacheObject[__ref_index];
        var len = context[__refs_length];
        
        while (idx < len) {
            context[__ref + idx] = context[__ref + idx + 1];
            ++idx;
        }
        
        context[__refs_length] = len - 1;
        cacheObject[__context] = undefined;
        cacheObject[__ref_index] = undefined;
    }
}

module.exports = {
    create: createHardlink,
    remove: removeHardlink
};

},{"65":65,"75":75,"76":76,"77":77}],58:[function(require,module,exports){
var now = require(123);
module.exports = function isExpired(node) {
    var $expires = node.$expires === undefined && -1 || node.$expires;
    return $expires !== -1 && $expires !== 1 && ($expires === 0 || $expires < now());
};

},{"123":123}],59:[function(require,module,exports){
module.exports = function isMaterialized(model) {
    return model._materialized && !(model._router || model._dataSource);
};

},{}],60:[function(require,module,exports){
module.exports = function(x) {
    return x.path && x.value;
};
},{}],61:[function(require,module,exports){
var __head = require(67);
var __tail = require(78);
var __next = require(70);
var __prev = require(74);
var __invalidated = require(68);

// [H] -> Next -> ... -> [T]
// [T] -> Prev -> ... -> [H]
function lruPromote(model, object) {
    var root = model._root;
    var head = root[__head];
    if (head === object) {
        return;
    }

    // First insert
    if (!head) {
        root[__head] = object;
        return;
    }

    // The head and the tail need to separate
    if (!root[__tail]) {
        root[__head] = object;
        root[__tail] = head;
        object[__next] = head;
        
        // Now tail
        head[__prev] = object;
        return;
    }

    // Its in the cache.  Splice out.
    var prev = object[__prev];
    var next = object[__next];
    if (next) {
        next[__prev] = prev;
    }
    if (prev) {
        prev[__next] = next;
    }
    object[__prev] = undefined;

    // Insert into head position
    root[__head] = object;
    object[__next] = head;
    head[__prev] = object;
}

function lruSplice(model, object) {
    var root = model._root;

    // Its in the cache.  Splice out.
    var prev = object[__prev];
    var next = object[__next];
    if (next) {
        next[__prev] = prev;
    }
    if (prev) {
        prev[__next] = next;
    }
    object[__prev] = undefined;
    
    if (object === root[__head]) {
        root[__head] = undefined;
    }
    if (object === root[__tail]) {
        root[__tail] = undefined;
    }
    object[__invalidated] = true;
    root.expired.push(object);
}

module.exports = {
    promote: lruPromote,
    splice: lruSplice
};
},{"67":67,"68":68,"70":70,"74":74,"78":78}],62:[function(require,module,exports){
module.exports = function permuteKey(key, memo) {
    if (memo.isArray) {
        if (memo.loaded && memo.rangeOffset > memo.to) {
            memo.arrOffset++;
            memo.loaded = false;
        }

        var idx = memo.arrOffset, length = key.length;
        if (idx === length) {
            memo.done = true;
            return '';
        }

        var el = key[memo.arrOffset];
        var type = typeof el;
        if (type === 'object') {
            if (!memo.loaded) {
                memo.from = el.from || 0;
                memo.to = el.to ||
                    typeof el.length === 'number' && memo.from + el.length - 1 || 0;
                memo.rangeOffset = memo.from;
                memo.loaded = true;
            }

            return memo.rangeOffset++;
        } else {
            memo.arrOffset = idx + 1;
            return el;
        }
    } else {
        if (!memo.loaded) {
            memo.from = key.from || 0;
            memo.to = key.to ||
                typeof key.length === 'number' && memo.from + key.length - 1 || 0;
            memo.rangeOffset = memo.from;
            memo.loaded = true;
        }
        if (memo.rangeOffset > memo.to) {
            memo.done = true;
            return '';
        }

        return memo.rangeOffset++;
    }
};


},{}],63:[function(require,module,exports){
var fastCopy = require(64).fastCopy;
module.exports = function spreadJSON(root, bins, bin) {
    bin = bin || [];
    if (!bins.length) {
        bins.push(bin);
    }
    if (!root || typeof root !== 'object' || root.$type) {
        return [];
    }
    var keys = Object.keys(root);
    if (keys.length === 1) {
        bin.push(keys[0]);
        spreadJSON(root[keys[0]], bins, bin);
    } else {
        for (var i = 0, len = keys.length; i < len; i++) {
            var k = keys[i];
            var nextBin = fastCopy(bin);
            nextBin.push(k);
            bins.push(nextBin);
            spreadJSON(root[k], bins, nextBin);
        }
    }
};

},{"64":64}],64:[function(require,module,exports){


function fastCopy(arr, i) {
    var a = [], len, j;
    for (j = 0, i = i || 0, len = arr.length; i < len; j++, i++) {
        a[j] = arr[i];
    }
    return a;
}

function fastCatSkipNulls(arr1, arr2) {
    var a = [], i, len, j;
    for (i = 0, len = arr1.length; i < len; i++) {
        a[i] = arr1[i];
    }
    for (j = 0, len = arr2.length; j < len; j++) {
        if (arr2[j] !== null) {
            a[i++] = arr2[j];
        }
    }
    return a;
}

function fastCat(arr1, arr2) {
    var a = [], i, len, j;
    for (i = 0, len = arr1.length; i < len; i++) {
        a[i] = arr1[i];
    }
    for (j = 0, len = arr2.length; j < len; j++) {
        a[i++] = arr2[j];
    }
    return a;
}



module.exports = {
    fastCat: fastCat,
    fastCatSkipNulls: fastCatSkipNulls,
    fastCopy: fastCopy
};

},{}],65:[function(require,module,exports){
module.exports = require(73) + "context";
},{"73":73}],66:[function(require,module,exports){
module.exports = require(73) + "generation";
},{"73":73}],67:[function(require,module,exports){
module.exports = require(73) + "head";
},{"73":73}],68:[function(require,module,exports){
module.exports = require(73) + "invalidated";
},{"73":73}],69:[function(require,module,exports){
module.exports = require(73) + "key";
},{"73":73}],70:[function(require,module,exports){
module.exports = require(73) + "next";
},{"73":73}],71:[function(require,module,exports){
module.exports = require(73) + "offset";
},{"73":73}],72:[function(require,module,exports){
module.exports = require(73) + "parent";
},{"73":73}],73:[function(require,module,exports){
/**
 * http://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
 * record separator character.
 */
module.exports = String.fromCharCode(30);

},{}],74:[function(require,module,exports){
module.exports = require(73) + "prev";
},{"73":73}],75:[function(require,module,exports){
module.exports = require(73) + "ref-index";
},{"73":73}],76:[function(require,module,exports){
module.exports = require(73) + "ref";
},{"73":73}],77:[function(require,module,exports){
module.exports = require(73) + "refs-length";
},{"73":73}],78:[function(require,module,exports){
module.exports = require(73) + "tail";
},{"73":73}],79:[function(require,module,exports){
module.exports = require(73) + "version";
},{"73":73}],80:[function(require,module,exports){
module.exports = {
    invPathSetsAsJSON: require(81),
    invPathSetsAsJSONG: require(82),
    invPathSetsAsPathMap: require(83),
    invPathSetsAsValues: require(84)
};
},{"81":81,"82":82,"83":83,"84":84}],81:[function(require,module,exports){
module.exports = invalidate_path_sets_as_json_dense;

var clone = require(105);
var array_clone = require(103);
var array_slice = require(104);

var options = require(124);
var walk_path_set = require(145);

var is_object = require(119);

var get_valid_key = require(113);
var update_graph = require(135);
var invalidate_node = require(117);

var collect = require(85);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function invalidate_path_sets_as_json_dense(model, pathsets, values) {

    var roots = options([], model);
    var index = -1;
    var count = pathsets.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json, hasValue;

    roots[_cache] = roots.root;

    while (++index < count) {

        json = values && values[index];
        if (is_object(json)) {
            roots[_json] = parents[_json] = nodes[_json] = json.json || (json.json = {})
        } else {
            roots[_json] = parents[_json] = nodes[_json] = undefined;
        }

        var pathset = pathsets[index];
        roots.index = index;
        
        walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);

        if (is_object(json)) {
            json.json = roots.json;
        }
        delete roots.json;
    }

    collect(
        roots.lru,
        roots.expired,
        roots.version,
        roots.root.$size || 0,
        model._maxSize,
        model._collectRatio
    );

    return {
        values: values,
        errors: roots.errors,
        hasValue: true,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[_json];
        parent = parents[_cache];
    } else {
        json = is_keyset && nodes[_json] || parents[_json];
        parent = nodes[_cache];
    }

    var node = parent[key];

    if (is_reference) {
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    if (is_branch) {
        parents[_cache] = nodes[_cache] = node;
        if (is_keyset && Boolean(parents[_json] = json)) {
            nodes[_json] = json[keyset] || (json[keyset] = {});
        }
        return;
    }

    nodes[_cache] = node;

    if (Boolean(json)) {
        var type = is_object(node) && node.$type || undefined;
        var jsonkey = keyset;
        if (jsonkey == null) {
            json = roots;
            jsonkey = 3;
        }
        json[jsonkey] = clone(roots, node, type, node && node.value);
    }

    var lru = roots.lru;
    var size = node.$size || 0;
    var version = roots.version;
    invalidate_node(parent, node, key, roots.lru);
    update_graph(parent, size, version, lru);
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {
    roots.json = roots[_json];
    roots.hasValue = true;
    roots.requestedPaths.push(array_slice(requested, roots.offset));
}
},{"103":103,"104":104,"105":105,"113":113,"117":117,"119":119,"124":124,"126":126,"135":135,"145":145,"85":85}],82:[function(require,module,exports){
module.exports = invalidate_path_sets_as_json_graph;

var $path = require(139);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_set = require(144);

var is_object = require(119);

var get_valid_key = require(113);
var update_graph = require(135);
var invalidate_node = require(117);
var clone_success = require(129);
var collect = require(85);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function invalidate_path_sets_as_json_graph(model, pathsets, values) {

    var roots = options([], model);
    var index = -1;
    var count = pathsets.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];

    roots[_cache] = roots.root;
    roots[_jsong] = parents[_jsong] = nodes[_jsong] = json.jsong || (json.jsong = {});
    roots.requestedPaths = json.paths || (json.paths = roots.requestedPaths);

    while (++index < count) {
        var pathset = pathsets[index];
        walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);
    }

    collect(
        roots.lru,
        roots.expired,
        roots.version,
        roots.root.$size || 0,
        model._maxSize,
        model._collectRatio
    );

    return {
        values: values,
        errors: roots.errors,
        hasValue: true,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[_jsong];
        parent = parents[_cache];
    } else {
        json = nodes[_jsong];
        parent = nodes[_cache];
    }

    var jsonkey = key;
    var node = parent[key];

    if (is_reference) {
        parents[_cache] = parent;
        nodes[_cache] = node;
        parents[_jsong] = json;
        nodes[_jsong] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    var type = is_object(node) && node.$type || undefined;
    
    if (is_branch) {
        parents[_cache] = nodes[_cache] = node;
        parents[_jsong] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
        } else {
            nodes[_jsong] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    nodes[_cache] = node;

    json[jsonkey] = clone(roots, node, type, node && node.value);

    var lru = roots.lru;
    var size = node.$size || 0;
    var version = roots.version;
    invalidate_node(parent, node, key, roots.lru);
    update_graph(parent, size, version, lru);
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {
    clone_success(roots, requested, optimized);
    roots.json = roots[_jsong];
    roots.hasValue = true;
}

},{"103":103,"105":105,"113":113,"117":117,"119":119,"124":124,"126":126,"129":129,"135":135,"139":139,"144":144,"85":85}],83:[function(require,module,exports){
module.exports = invalidate_path_sets_as_json_sparse;

var clone = require(105);
var array_clone = require(103);
var array_slice = require(104);

var options = require(124);
var walk_path_set = require(145);

var is_object = require(119);

var get_valid_key = require(113);
var update_graph = require(135);
var invalidate_node = require(117);

var collect = require(85);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function invalidate_path_sets_as_json_sparse(model, pathsets, values) {

    var roots = options([], model);
    var index = -1;
    var count = pathsets.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];

    roots[_cache] = roots.root;
    roots[_json] = parents[_json] = nodes[_json] = json.json || (json.json = {});

    while (++index < count) {
        var pathset = pathsets[index];
        walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);
    }

    collect(
        roots.lru,
        roots.expired,
        roots.version,
        roots.root.$size || 0,
        model._maxSize,
        model._collectRatio
    );

    return {
        values: values,
        errors: roots.errors,
        hasValue: true,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        jsonkey = get_valid_key(requested);
        json = parents[_json];
        parent = parents[_cache];
    } else {
        jsonkey = key;
        json = nodes[_json];
        parent = nodes[_cache];
    }

    var node = parent[key];

    if (is_reference) {
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    if (is_branch) {
        parents[_cache] = nodes[_cache] = node;
        parents[_json] = json;
        nodes[_json] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    nodes[_cache] = node;

    var type = is_object(node) && node.$type || undefined;
    json[jsonkey] = clone(roots, node, type, node && node.value);

    var lru = roots.lru;
    var size = node.$size || 0;
    var version = roots.version;
    invalidate_node(parent, node, key, roots.lru);
    update_graph(parent, size, version, lru);
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {
    roots.json = roots[_json];
    roots.hasValue = true;
    roots.requestedPaths.push(array_slice(requested, roots.offset));
}
},{"103":103,"104":104,"105":105,"113":113,"117":117,"119":119,"124":124,"126":126,"135":135,"145":145,"85":85}],84:[function(require,module,exports){
module.exports = invalidate_path_sets_as_json_values;

var clone = require(105);
var array_clone = require(103);
var array_slice = require(104);

var options = require(124);
var walk_path_set = require(145);

var is_object = require(119);

var get_valid_key = require(113);
var update_graph = require(135);
var invalidate_node = require(117);

var collect = require(85);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function invalidate_path_sets_as_json_values(model, pathsets, onNext) {

    var roots = options([], model);
    var index = -1;
    var count = pathsets.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];

    roots[_cache] = roots.root;
    roots.onNext = onNext;

    while (++index < count) {
        var pathset = pathsets[index];
        walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);
    }

    collect(
        roots.lru,
        roots.expired,
        roots.version,
        roots.root.$size || 0,
        model._maxSize,
        model._collectRatio
    );

    return {
        values: null,
        errors: roots.errors,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        parent = parents[_cache];
    } else {
        parent = nodes[_cache];
    }

    var node = parent[key];

    if (is_reference) {
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    if (is_branch) {
        parents[_cache] = nodes[_cache] = node;
        return;
    }

    nodes[_cache] = node;

    var lru = roots.lru;
    var size = node.$size || 0;
    var version = roots.version;
    invalidate_node(parent, node, key, roots.lru);
    update_graph(parent, size, version, lru);
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || undefined;
    var onNext = roots.onNext;
    if (Boolean(type) && onNext) {
        onNext({
            path: array_clone(requested),
            value: clone(roots, node, type, node && node.value)
        });
    }
    roots.requestedPaths.push(array_slice(requested, roots.offset));
}
},{"103":103,"104":104,"105":105,"113":113,"117":117,"119":119,"124":124,"126":126,"135":135,"145":145,"85":85}],85:[function(require,module,exports){
var __head = require(67);
var __tail = require(78);
var __next = require(70);
var __prev = require(74);

var update_graph = require(135);
module.exports = function(lru, expired, version, total, max, ratio) {

    var targetSize = max * ratio;
    var node, size;

    while(Boolean(node = expired.pop())) {
        size = node.$size || 0;
        total -= size;
        update_graph(node, size, version, lru);
    }

    if(total >= max) {
        var prev = lru[__tail];
        while((total >= targetSize) && Boolean(node = prev)) {
            prev = prev[__prev];
            size = node.$size || 0;
            total -= size;
            update_graph(node, size, version, lru);
        }

        if((lru[__tail] = lru[__prev] = prev) == null) {
            lru[__head] = lru[__next] = undefined;
        } else {
            prev[__next] = undefined;
        }
    }
};
},{"135":135,"67":67,"70":70,"74":74,"78":78}],86:[function(require,module,exports){
var $expires_never = require(140);
var __head = require(67);
var __tail = require(78);
var __next = require(70);
var __prev = require(74);

var is_object = require(119);
module.exports = function(root, node) {
    if(is_object(node) && (node.$expires !== $expires_never)) {
        var head = root[__head], tail = root[__tail],
            next = node[__next], prev = node[__prev];
        if (node !== head) {
            (next != null && typeof next === "object") && (next[__prev] = prev);
            (prev != null && typeof prev === "object") && (prev[__next] = next);
            (next = head) && (head != null && typeof head === "object") && (head[__prev] = node);
            (root[__head] = root[__next] = head = node);
            (head[__next] = next);
            (head[__prev] = undefined);
        }
        if (tail == null || node === tail) {
            root[__tail] = root[__prev] = tail = prev || node;
        }
    }
    return node;
};
},{"119":119,"140":140,"67":67,"70":70,"74":74,"78":78}],87:[function(require,module,exports){
var __head = require(67);
var __tail = require(78);
var __next = require(70);
var __prev = require(74);

module.exports = function(root, node) {
    var head = root[__head], tail = root[__tail],
        next = node[__next], prev = node[__prev];
    (next != null && typeof next === "object") && (next[__prev] = prev);
    (prev != null && typeof prev === "object") && (prev[__next] = next);
    (node === head) && (root[__head] = root[__next] = next);
    (node === tail) && (root[__tail] = root[__prev] = prev);
    node[__next] = node[__prev] = undefined;
    head = tail = next = prev = undefined;
};
},{"67":67,"70":70,"74":74,"78":78}],88:[function(require,module,exports){
module.exports = {
    setPathSetsAsJSON: require(98),
    setPathSetsAsJSONG: require(99),
    setPathSetsAsPathMap: require(100),
    setPathSetsAsValues: require(101),
    
    setPathMapsAsJSON: require(94),
    setPathMapsAsJSONG: require(95),
    setPathMapsAsPathMap: require(96),
    setPathMapsAsValues: require(97),
    
    setJSONGsAsJSON: require(90),
    setJSONGsAsJSONG: require(91),
    setJSONGsAsPathMap: require(92),
    setJSONGsAsValues: require(93),
    
    setCache: require(89)
};

},{"100":100,"101":101,"89":89,"90":90,"91":91,"92":92,"93":93,"94":94,"95":95,"96":96,"97":97,"98":98,"99":99}],89:[function(require,module,exports){
module.exports = set_cache;

var $error = require(138);
var $atom = require(137);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_map = require(143);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var promote = require(86);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_cache(model, pathmap, error_selector) {

    var roots = options([], model, error_selector);
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var keys_stack = [];
    
    roots[_cache] = roots.root;

    walk_path_map(onNode, onEdge, pathmap, keys_stack, 0, roots, parents, nodes, requested, optimized);

    return model;
}

function onNode(pathmap, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        parent = parents[_cache];
    } else {
        parent = nodes[_cache];
    }

    var node = parent[key],
        type;

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = nodes[_cache] = node;
        return;
    }

    var selector = roots.error_selector;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var mess = pathmap;

    type = is_object(mess) && mess.$type || undefined;
    mess = wrap_node(mess, type, Boolean(type) ? mess.value : mess);
    type || (type = $atom);

    if (type == $error && Boolean(selector)) {
        mess = selector(requested, mess);
    }

    node = replace_node(parent, node, mess, key, roots.lru);
    node = graph_node(root, parent, node, key, inc_generation());
    update_graph(parent, size - node.$size, roots.version, roots.lru);
    nodes[_cache] = node;
}

function onEdge(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset) {
    if(depth > 0) {
        promote(roots.lru, nodes[_cache]);
    }
}
},{"103":103,"105":105,"111":111,"113":113,"114":114,"115":115,"119":119,"124":124,"126":126,"128":128,"134":134,"135":135,"136":136,"137":137,"138":138,"143":143,"86":86}],90:[function(require,module,exports){
module.exports = set_json_graph_as_json_dense;

var $path = require(139);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_set = require(144);

var is_object = require(119);

var get_valid_key = require(113);
var merge_node = require(122);

var set_node_if_missing_path = require(132);
var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_graph_as_json_dense(model, envelopes, values, error_selector, comparator) {

    var roots = [];
    roots.offset = model._path.length;
    roots.bound = [];
    roots = options(roots, model, error_selector, comparator);

    var index = -1;
    var index2 = -1;
    var count = envelopes.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json, hasValue, hasValues;

    roots[_cache] = roots.root;

    while (++index < count) {
        var envelope = envelopes[index];
        var pathsets = envelope.paths;
        var jsong = envelope.jsong || envelope.values || envelope.value;
        var index3 = -1;
        var count2 = pathsets.length;
        roots[_message] = jsong;
        nodes[_message] = jsong;
        while (++index3 < count2) {

            json = values && values[++index2];
            if (is_object(json)) {
                roots.json = roots[_json] = parents[_json] = nodes[_json] = json.json || (json.json = {});
            } else {
                roots.json = roots[_json] = parents[_json] = nodes[_json] = undefined;
            }

            var pathset = pathsets[index3];
            roots.index = index3;

            walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);

            hasValue = roots.hasValue;
            if (Boolean(hasValue)) {
                hasValues = true;
                if (is_object(json)) {
                    json.json = roots.json;
                }
                delete roots.json;
                delete roots.hasValue;
            } else if (is_object(json)) {
                delete json.json;
            }
        }
    }

    return {
        values: values,
        errors: roots.errors,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, messageParent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[_json];
        parent = parents[_cache];
        messageParent = parents[_message];
    } else {
        json = is_keyset && nodes[_json] || parents[_json];
        parent = nodes[_cache];
        messageParent = nodes[_message];
    }

    var node = parent[key];
    var message = messageParent && messageParent[key];

    nodes[_message] = message;
    nodes[_cache] = node = merge_node(roots, parent, node, messageParent, message, key, requested);

    if (is_reference) {
        parents[_cache] = parent;
        parents[_message] = messageParent;
        return;
    }

    var length = requested.length;
    var offset = roots.offset;

    parents[_json] = json;

    if (is_branch) {
        parents[_cache] = node;
        parents[_message] = message;
        if ((length > offset) && is_keyset && Boolean(json)) {
            nodes[_json] = json[keyset] || (json[keyset] = {});
        }
    }
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);
    var isMissingPath = set_node_if_missing_path(roots, node, type, pathset, depth, requested, optimized);

    if (isMissingPath) {
        return;
    }

    var isError = set_node_if_error(roots, node, type, requested);

    if (isError) {
        return;
    }

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        if (keyset == null) {
            roots.json = clone(roots, node, type, node && node.value);
        } else if (Boolean(json = parents[_json])) {
            json[keyset] = clone(roots, node, type, node && node.value);
        }
        roots.hasValue = true;
    }
}
},{"103":103,"105":105,"113":113,"119":119,"122":122,"124":124,"126":126,"129":129,"131":131,"132":132,"139":139,"144":144}],91:[function(require,module,exports){
module.exports = set_json_graph_as_json_graph;

var $path = require(139);

var clone = require(106);
var array_clone = require(103);

var options = require(124);
var walk_path_set = require(144);

var is_object = require(119);

var get_valid_key = require(113);
var merge_node = require(122);

var set_node_if_missing_path = require(132);
var set_node_if_error = require(131);
var set_successful_paths = require(129);

var promote = require(86);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_graph_as_json_graph(model, envelopes, values, error_selector, comparator) {

    var roots = [];
    roots.offset = 0;
    roots.bound = [];
    roots = options(roots, model, error_selector, comparator);

    var index = -1;
    var count = envelopes.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];
    var hasValue;

    roots[_cache] = roots.root;
    roots[_jsong] = parents[_jsong] = nodes[_jsong] = json.jsong || (json.jsong = {});
    roots.requestedPaths = json.paths || (json.paths = roots.requestedPaths);

    while (++index < count) {
        var envelope = envelopes[index];
        var pathsets = envelope.paths;
        var jsong = envelope.jsong || envelope.values || envelope.value;
        var index2 = -1;
        var count2 = pathsets.length;
        roots[_message] = jsong;
        nodes[_message] = jsong;
        while (++index2 < count2) {
            var pathset = pathsets[index2];
            walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);
        }
    }

    hasValue = roots.hasValue;
    if (hasValue) {
        json.jsong = roots[_jsong];
    } else {
        delete json.jsong;
        delete json.paths;
    }

    return {
        values: values,
        errors: roots.errors,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, messageParent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[_jsong];
        parent = parents[_cache];
        messageParent = parents[_message];
    } else {
        json = nodes[_jsong];
        parent = nodes[_cache];
        messageParent = nodes[_message];
    }

    var jsonkey = key;
    var node = parent[key];
    var message = messageParent && messageParent[key];

    nodes[_message] = message;
    nodes[_cache] = node = merge_node(roots, parent, node, messageParent, message, key, requested);

    if (is_reference) {
        parents[_cache] = parent;
        parents[_message] = messageParent;
        parents[_jsong] = json;
        nodes[_jsong] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    var type = is_object(node) && node.$type || undefined;

    if (is_branch) {
        parents[_cache] = node;
        parents[_message] = message;
        parents[_jsong] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
            roots.hasValue = true;
        } else {
            nodes[_jsong] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    if(roots.is_distinct === true) {
        roots.is_distinct = false;
        json[jsonkey] = clone(roots, node, type, node && node.value);
        roots.hasValue = true;
    }
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);

    var isMissingPath = set_node_if_missing_path(roots, node, type, pathset, depth, requested, optimized);

    if (isMissingPath) {
        return;
    }

    promote(roots.lru, node);

    set_successful_paths(roots, requested, optimized);

    if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
        node = clone(roots, node, type, node && node.value);
        json = roots[_jsong];
        json.$type = node.$type;
        json.value = node.value;
    }
    roots.hasValue = true;
}
},{"103":103,"106":106,"113":113,"119":119,"122":122,"124":124,"126":126,"129":129,"131":131,"132":132,"139":139,"144":144,"86":86}],92:[function(require,module,exports){
module.exports = set_json_graph_as_json_sparse;

var $path = require(139);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_set = require(144);

var is_object = require(119);

var get_valid_key = require(113);
var merge_node = require(122);

var set_node_if_missing_path = require(132);
var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_graph_as_json_sparse(model, envelopes, values, error_selector, comparator) {

    var roots = [];
    roots.offset = model._path.length;
    roots.bound = [];
    roots = options(roots, model, error_selector, comparator);

    var index = -1;
    var count = envelopes.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];
    var hasValue;

    roots[_cache] = roots.root;
    roots[_json] = parents[_json] = nodes[_json] = json.json || (json.json = {});

    while (++index < count) {
        var envelope = envelopes[index];
        var pathsets = envelope.paths;
        var jsong = envelope.jsong || envelope.values || envelope.value;
        var index2 = -1;
        var count2 = pathsets.length;
        roots[_message] = jsong;
        nodes[_message] = jsong;
        while (++index2 < count2) {
            var pathset = pathsets[index2];
            walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);
        }
    }

    hasValue = roots.hasValue;
    if (hasValue) {
        json.json = roots[_json];
    } else {
        delete json.json;
    }

    return {
        values: values,
        errors: roots.errors,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, messageParent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        jsonkey = get_valid_key(requested);
        json = parents[_json];
        parent = parents[_cache];
        messageParent = parents[_message];
    } else {
        jsonkey = key;
        json = nodes[_json];
        parent = nodes[_cache];
        messageParent = nodes[_message];
    }

    var node = parent[key];
    var message = messageParent && messageParent[key];

    nodes[_message] = message;
    nodes[_cache] = node = merge_node(roots, parent, node, messageParent, message, key, requested);

    if (is_reference) {
        parents[_cache] = parent;
        parents[_message] = messageParent;
        return;
    }

    parents[_json] = json;

    if (is_branch) {
        var length = requested.length;
        var offset = roots.offset;
        var type = is_object(node) && node.$type || undefined;

        parents[_cache] = node;
        parents[_message] = message;
        if ((length > offset) && (!type || type == $path)) {
            nodes[_json] = json[jsonkey] || (json[jsonkey] = {});
        }
    }
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);

    var isMissingPath = set_node_if_missing_path(roots, node, type, pathset, depth, requested, optimized);

    if (isMissingPath) {
        return;
    }

    var isError = set_node_if_error(roots, node, type, requested);

    if (isError) {
        return;
    }

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
            node = clone(roots, node, type, node && node.value);
            json = roots[_json];
            json.$type = node.$type;
            json.value = node.value;
        } else {
            json = parents[_json];
            json[key] = clone(roots, node, type, node && node.value);
        }
        roots.hasValue = true;
    }
}
},{"103":103,"105":105,"113":113,"119":119,"122":122,"124":124,"126":126,"129":129,"131":131,"132":132,"139":139,"144":144}],93:[function(require,module,exports){
module.exports = set_json_graph_as_json_values;

var $path = require(139);

var clone = require(105);
var array_clone = require(103);
var array_slice = require(104);

var options = require(124);
var walk_path_set = require(144);

var is_object = require(119);

var get_valid_key = require(113);
var merge_node = require(122);

var set_node_if_missing_path = require(132);
var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_graph_as_json_values(model, envelopes, onNext, error_selector, comparator) {

    var roots = [];
    roots.offset = model._path.length;
    roots.bound = [];
    roots = options(roots, model, error_selector, comparator);

    var index = -1;
    var count = envelopes.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];

    roots[_cache] = roots.root;
    roots.onNext = onNext;

    while (++index < count) {
        var envelope = envelopes[index];
        var pathsets = envelope.paths;
        var jsong = envelope.jsong || envelope.values || envelope.value;
        var index2 = -1;
        var count2 = pathsets.length;
        roots[_message] = jsong;
        nodes[_message] = jsong;
        while (++index2 < count2) {
            var pathset = pathsets[index2];
            walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);
        }
    }

    return {
        values: null,
        errors: roots.errors,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset) {

    var parent, messageParent;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        parent = parents[_cache];
        messageParent = parents[_message];
    } else {
        parent = nodes[_cache];
        messageParent = nodes[_message];
    }

    var node = parent[key];
    var message = messageParent && messageParent[key];

    nodes[_message] = message;
    nodes[_cache] = node = merge_node(roots, parent, node, messageParent, message, key, requested);

    if (is_reference) {
        parents[_cache] = parent;
        parents[_message] = messageParent;
        return;
    }

    if (is_branch) {
        parents[_cache] = node;
        parents[_message] = message;
    }
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset, is_keyset) {

    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);
    var isMissingPath = set_node_if_missing_path(roots, node, type, pathset, depth, requested, optimized);

    if (isMissingPath) {
        return;
    }

    var isError = set_node_if_error(roots, node, type, requested);

    if (isError) {
        return;
    }

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        roots.onNext({
            path: array_slice(requested, roots.offset),
            value: clone(roots, node, type, node && node.value)
        });
    }
}
},{"103":103,"104":104,"105":105,"113":113,"119":119,"122":122,"124":124,"126":126,"129":129,"131":131,"132":132,"139":139,"144":144}],94:[function(require,module,exports){
module.exports = set_json_sparse_as_json_dense;

var $path = require(139);
var $error = require(138);
var $atom = require(137);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_map = require(143);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_sparse_as_json_dense(model, pathmaps, values, error_selector, comparator) {

    var roots = options([], model, error_selector, comparator);
    var index = -1;
    var count = pathmaps.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var keys_stack = [];
    var json, hasValue, hasValues;

    roots[_cache] = roots.root;

    while (++index < count) {

        json = values && values[index];
        if (is_object(json)) {
            roots.json = roots[_json] = parents[_json] = nodes[_json] = json.json || (json.json = {})
        } else {
            roots.json = roots[_json] = parents[_json] = nodes[_json] = undefined;
        }

        var pathmap = pathmaps[index].json;
        roots.index = index;

        walk_path_map(onNode, onEdge, pathmap, keys_stack, 0, roots, parents, nodes, requested, optimized);

        hasValue = roots.hasValue;
        if (Boolean(hasValue)) {
            hasValues = true;
            if (is_object(json)) {
                json.json = roots.json;
            }
            delete roots.json;
            delete roots.hasValue;
        } else if (is_object(json)) {
            delete json.json;
        }
    }

    return {
        values: values,
        errors: roots.errors,
        hasValue: hasValues,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathmap, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[_json];
        parent = parents[_cache];
    } else {
        json = is_keyset && nodes[_json] || parents[_json];
        parent = nodes[_cache];
    }

    var node = parent[key],
        type;

    if (is_reference) {
        type = is_object(node) && node.$type || undefined;
        type = type && is_branch && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    parents[_json] = json;

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = nodes[_cache] = node;
        if (is_keyset && Boolean(json)) {
            nodes[_json] = json[keyset] || (json[keyset] = {});
        }
        return;
    }

    var selector = roots.error_selector;
    var comparator = roots.comparator;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var message = pathmap;

    type = is_object(message) && message.$type || undefined;
    message = wrap_node(message, type, Boolean(type) ? message.value : message);
    type || (type = $atom);

    if (type == $error && Boolean(selector)) {
        message = selector(requested, message);
    }

    var is_distinct = roots.is_distinct = true;

    if(Boolean(comparator)) {
        is_distinct = roots.is_distinct = !comparator(requested, node, message);
    }

    if (is_distinct) {
        node = replace_node(parent, node, message, key, roots.lru);
        node = graph_node(root, parent, node, key, inc_generation());
        update_graph(parent, size - node.$size, roots.version, roots.lru);
    }
    nodes[_cache] = node;
}

function onEdge(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);

    var isError = set_node_if_error(roots, node, type, requested);

    if (isError) {
        return;
    }

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        if (keyset == null) {
            roots.json = clone(roots, node, type, node && node.value);
        } else if (Boolean(json = parents[_json])) {
            json[keyset] = clone(roots, node, type, node && node.value);
        }
        roots.hasValue = true;
    }
}
},{"103":103,"105":105,"111":111,"113":113,"114":114,"115":115,"119":119,"124":124,"126":126,"128":128,"129":129,"131":131,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"143":143}],95:[function(require,module,exports){
module.exports = set_json_sparse_as_json_graph;

var $path = require(139);
var $error = require(138);
var $atom = require(137);

var clone = require(106);
var array_clone = require(103);

var options = require(124);
var walk_path_map = require(142);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var set_node_if_error = require(131);
var set_successful_paths = require(129);

var promote = require(86);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_sparse_as_json_graph(model, pathmaps, values, error_selector, comparator) {

    var roots = options([], model, error_selector, comparator);
    var index = -1;
    var count = pathmaps.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var keys_stack = [];
    var json = values[0];
    var hasValue;

    roots[_cache] = roots.root;
    roots[_jsong] = parents[_jsong] = nodes[_jsong] = json.jsong || (json.jsong = {});
    roots.requestedPaths = json.paths || (json.paths = roots.requestedPaths);

    while (++index < count) {
        var pathmap = pathmaps[index].json;
        walk_path_map(onNode, onEdge, pathmap, keys_stack, 0, roots, parents, nodes, requested, optimized);
    }

    hasValue = roots.hasValue;
    if (hasValue) {
        json.jsong = roots[_jsong];
    } else {
        delete json.jsong;
        delete json.paths;
    }

    return {
        values: values,
        errors: roots.errors,
        hasValue: hasValue,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathmap, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[_jsong];
        parent = parents[_cache];
    } else {
        json = nodes[_jsong];
        parent = nodes[_cache];
    }

    var jsonkey = key;
    var node = parent[key],
        type;

    if (is_reference) {
        type = is_object(node) && node.$type || undefined;
        type = type && is_branch && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        parents[_jsong] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
            roots.hasValue = true;
        } else {
            nodes[_jsong] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        type = node.$type;
        parents[_cache] = nodes[_cache] = node;
        parents[_jsong] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
            roots.hasValue = true;
        } else {
            nodes[_jsong] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    var selector = roots.error_selector;
    var comparator = roots.comparator;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var message = pathmap;

    type = is_object(message) && message.$type || undefined;
    message = wrap_node(message, type, Boolean(type) ? message.value : message);
    type || (type = $atom);

    if (type == $error && Boolean(selector)) {
        message = selector(requested, message);
    }

    var is_distinct = roots.is_distinct = true;

    if(Boolean(comparator)) {
        is_distinct = roots.is_distinct = !comparator(requested, node, message);
    }

    if (is_distinct) {
        node = replace_node(parent, node, message, key, roots.lru);
        node = graph_node(root, parent, node, key, inc_generation());
        update_graph(parent, size - node.$size, roots.version, roots.lru);

        json[jsonkey] = clone(roots, node, type, node && node.value);
        roots.hasValue = true;
    }
    nodes[_cache] = node;
}

function onEdge(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);

    promote(roots.lru, node);

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
            node = clone(roots, node, type, node && node.value);
            json = roots[_jsong];
            json.$type = node.$type;
            json.value = node.value;
        }
        roots.hasValue = true;
    }
}
},{"103":103,"106":106,"111":111,"113":113,"114":114,"115":115,"119":119,"124":124,"126":126,"128":128,"129":129,"131":131,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"142":142,"86":86}],96:[function(require,module,exports){
module.exports = set_json_sparse_as_json_sparse;

var $path = require(139);
var $error = require(138);
var $atom = require(137);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_map = require(143);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_sparse_as_json_sparse(model, pathmaps, values, error_selector, comparator) {

    var roots = options([], model, error_selector, comparator);
    var index = -1;
    var count = pathmaps.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var keys_stack = [];
    var json = values[0];
    var hasValue;

    roots[_cache] = roots.root;
    roots[_json] = parents[_json] = nodes[_json] = json.json || (json.json = {});

    while (++index < count) {
        var pathmap = pathmaps[index].json;
        walk_path_map(onNode, onEdge, pathmap, keys_stack, 0, roots, parents, nodes, requested, optimized);
    }

    hasValue = roots.hasValue;
    if (hasValue) {
        json.json = roots[_json];
    } else {
        delete json.json;
    }

    return {
        values: values,
        errors: roots.errors,
        hasValue: hasValue,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathmap, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        jsonkey = get_valid_key(requested);
        json = parents[_json];
        parent = parents[_cache];
    } else {
        jsonkey = key;
        json = nodes[_json];
        parent = nodes[_cache];
    }

    var node = parent[key],
        type;

    if (is_reference) {
        type = is_object(node) && node.$type || undefined;
        type = type && is_branch && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    parents[_json] = json;

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = nodes[_cache] = node;
        nodes[_json] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    var selector = roots.error_selector;
    var comparator = roots.comparator;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var message = pathmap;

    type = is_object(message) && message.$type || undefined;
    message = wrap_node(message, type, Boolean(type) ? message.value : message);
    type || (type = $atom);

    if (type == $error && Boolean(selector)) {
        message = selector(requested, message);
    }

    var is_distinct = roots.is_distinct = true;

    if(Boolean(comparator)) {
        is_distinct = roots.is_distinct = !comparator(requested, node, message);
    }

    if (is_distinct) {
        node = replace_node(parent, node, message, key, roots.lru);
        node = graph_node(root, parent, node, key, inc_generation());
        update_graph(parent, size - node.$size, roots.version, roots.lru);
    }
    nodes[_cache] = node;
}

function onEdge(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);

    var isError = set_node_if_error(roots, node, type, requested);

    if(isError) {
        return;
    }

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
            node = clone(roots, node, type, node && node.value);
            json = roots[_json];
            json.$type = node.$type;
            json.value = node.value;
        } else {
            json = parents[_json];
            json[key] = clone(roots, node, type, node && node.value);
        }
        roots.hasValue = true;
    }
}
},{"103":103,"105":105,"111":111,"113":113,"114":114,"115":115,"119":119,"124":124,"126":126,"128":128,"129":129,"131":131,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"143":143}],97:[function(require,module,exports){
module.exports = set_path_map_as_json_values;

var $error = require(138);
var $atom = require(137);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_map = require(143);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_path_map_as_json_values(model, pathmaps, onNext, error_selector, comparator) {

    var roots = options([], model, error_selector, comparator);
    var index = -1;
    var count = pathmaps.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var keys_stack = [];
    roots[_cache] = roots.root;
    roots.onNext = onNext;

    while (++index < count) {
        var pathmap = pathmaps[index].json;
        walk_path_map(onNode, onEdge, pathmap, keys_stack, 0, roots, parents, nodes, requested, optimized);
    }

    return {
        values: null,
        errors: roots.errors,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathmap, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        parent = parents[_cache];
    } else {
        parent = nodes[_cache];
    }

    var node = parent[key],
        type;

    if (is_reference) {
        type = is_object(node) && node.$type || undefined;
        type = type && is_branch && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = nodes[_cache] = node;
        return;
    }

    var selector = roots.error_selector;
    var comparator = roots.comparator;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var message = pathmap;

    type = is_object(message) && message.$type || undefined;
    message = wrap_node(message, type, Boolean(type) ? message.value : message);
    type || (type = $atom);

    if (type == $error && Boolean(selector)) {
        message = selector(requested, message);
    }

    var is_distinct = roots.is_distinct = true;

    if(Boolean(comparator)) {
        is_distinct = roots.is_distinct = !comparator(requested, node, message);
    }

    if (is_distinct) {
        node = replace_node(parent, node, message, key, roots.lru);
        node = graph_node(root, parent, node, key, inc_generation());
        update_graph(parent, size - node.$size, roots.version, roots.lru);
    }

    nodes[_cache] = node;
}

function onEdge(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);

    var isError = set_node_if_error(roots, node, type, requested);

    if(isError) {
        return;
    }

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        roots.onNext({
            path: array_clone(requested),
            value: clone(roots, node, type, node && node.value)
        });
    }
}
},{"103":103,"105":105,"111":111,"113":113,"114":114,"115":115,"119":119,"124":124,"126":126,"128":128,"129":129,"131":131,"134":134,"135":135,"136":136,"137":137,"138":138,"143":143}],98:[function(require,module,exports){
module.exports = set_json_values_as_json_dense;

var $path = require(139);
var $error = require(138);
var $atom = require(137);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_set = require(145);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var invalidate_node = require(117);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var set_node_if_missing_path = require(132);
var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_values_as_json_dense(model, pathvalues, values, error_selector, comparator) {

    var roots = options([], model, error_selector, comparator);
    var index = -1;
    var count = pathvalues.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json, hasValue, hasValues;

    roots[_cache] = roots.root;

    while (++index < count) {

        json = values && values[index];
        if (is_object(json)) {
            roots.json = roots[_json] = parents[_json] = nodes[_json] = json.json || (json.json = {})
        } else {
            roots.json = roots[_json] = parents[_json] = nodes[_json] = undefined;
        }

        var pv = pathvalues[index];
        var pathset = pv.path;
        roots.value = pv.value;
        roots.index = index;

        walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);

        hasValue = roots.hasValue;
        if (Boolean(hasValue)) {
            hasValues = true;
            if (is_object(json)) {
                json.json = roots.json;
            }
            delete roots.json;
            delete roots.hasValue;
        } else if (is_object(json)) {
            delete json.json;
        }
    }

    return {
        values: values,
        errors: roots.errors,
        hasValue: hasValues,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[_json];
        parent = parents[_cache];
    } else {
        json = is_keyset && nodes[_json] || parents[_json];
        parent = nodes[_cache];
    }

    var node = parent[key],
        type;

    if (is_reference) {
        type = is_object(node) && node.$type || undefined;
        type = type && is_branch && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    parents[_json] = json;

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        if (is_keyset && Boolean(json)) {
            nodes[_json] = json[keyset] || (json[keyset] = {});
        }
        return;
    }

    var selector = roots.error_selector;
    var comparator = roots.comparator;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var message = roots.value;

    if (message === undefined && roots.no_data_source) {
        invalidate_node(parent, node, key, roots.lru);
        update_graph(parent, size, roots.version, roots.lru);
        node = undefined;
    } else {
        type = is_object(message) && message.$type || undefined;
        message = wrap_node(message, type, Boolean(type) ? message.value : message);
        type || (type = $atom);

        if (type == $error && Boolean(selector)) {
            message = selector(requested, message);
        }

        var is_distinct = roots.is_distinct = true;

        if(Boolean(comparator)) {
            is_distinct = roots.is_distinct = !comparator(requested, node, message);
        }

        if (is_distinct) {
            node = replace_node(parent, node, message, key, roots.lru);
            node = graph_node(root, parent, node, key, inc_generation());
            update_graph(parent, size - node.$size, roots.version, roots.lru);
        }
    }

    nodes[_cache] = node;
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);
    var isMissingPath = set_node_if_missing_path(roots, node, type, pathset, depth, requested, optimized);

    if(isMissingPath) {
        return;
    }

    var isError = set_node_if_error(roots, node, type, requested);

    if(isError) {
        return;
    }

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        if (keyset == null) {
            roots.json = clone(roots, node, type, node && node.value);
        } else if (Boolean(json = parents[_json])) {
            json[keyset] = clone(roots, node, type, node && node.value);
        }
        roots.hasValue = true;
    }
}
},{"103":103,"105":105,"111":111,"113":113,"114":114,"115":115,"117":117,"119":119,"124":124,"126":126,"128":128,"129":129,"131":131,"132":132,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"145":145}],99:[function(require,module,exports){
module.exports = set_json_values_as_json_graph;

var $path = require(139);
var $error = require(138);
var $atom = require(137);

var clone = require(106);
var array_clone = require(103);

var options = require(124);
var walk_path_set = require(144);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var invalidate_node = require(117);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var set_node_if_missing_path = require(132);
var set_node_if_error = require(131);
var set_successful_paths = require(129);

var promote = require(86);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_values_as_json_graph(model, pathvalues, values, error_selector, comparator) {

    var roots = options([], model, error_selector, comparator);
    var index = -1;
    var count = pathvalues.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];
    var hasValue;

    roots[_cache] = roots.root;
    roots[_jsong] = parents[_jsong] = nodes[_jsong] = json.jsong || (json.jsong = {});
    roots.requestedPaths = json.paths || (json.paths = roots.requestedPaths);

    while (++index < count) {

        var pv = pathvalues[index];
        var pathset = pv.path;
        roots.value = pv.value;

        walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);
    }

    hasValue = roots.hasValue;
    if (hasValue) {
        json.jsong = roots[_jsong];
    } else {
        delete json.jsong;
        delete json.paths;
    }

    return {
        values: values,
        errors: roots.errors,
        hasValue: hasValue,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[_jsong];
        parent = parents[_cache];
    } else {
        json = nodes[_jsong];
        parent = nodes[_cache];
    }

    var jsonkey = key;
    var node = parent[key],
        type;

    if (is_reference) {
        type = is_object(node) && node.$type || undefined;
        type = type && is_branch && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        parents[_jsong] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
            roots.hasValue = true;
        } else {
            nodes[_jsong] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        type = node.$type;
        parents[_cache] = parent;
        nodes[_cache] = node;
        parents[_jsong] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
            roots.hasValue = true;
        } else {
            nodes[_jsong] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    var selector = roots.error_selector;
    var comparator = roots.comparator;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var message = roots.value;

    if (message === undefined && roots.no_data_source) {
        invalidate_node(parent, node, key, roots.lru);
        update_graph(parent, size, roots.version, roots.lru);
        node = undefined;
    } else {
        type = is_object(message) && message.$type || undefined;
        message = wrap_node(message, type, Boolean(type) ? message.value : message);
        type || (type = $atom);

        if (type == $error && Boolean(selector)) {
            message = selector(requested, message);
        }

        var is_distinct = roots.is_distinct = true;

        if(Boolean(comparator)) {
            is_distinct = roots.is_distinct = !comparator(requested, node, message);
        }

        if (is_distinct) {
            node = replace_node(parent, node, message, key, roots.lru);
            node = graph_node(root, parent, node, key, inc_generation());
            update_graph(parent, size - node.$size, roots.version, roots.lru);

            json[jsonkey] = clone(roots, node, type, node && node.value);
            roots.hasValue = true;
        }
    }
    nodes[_cache] = node;
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);
    var isMissingPath = set_node_if_missing_path(roots, node, type, pathset, depth, requested, optimized)

    if(isMissingPath) {
        return;
    }

    promote(roots.lru, node);

    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
            node = clone(roots, node, type, node && node.value);
            json = roots[_jsong];
            json.$type = node.$type;
            json.value = node.value;
        }
        roots.hasValue = true;
    }
}
},{"103":103,"106":106,"111":111,"113":113,"114":114,"115":115,"117":117,"119":119,"124":124,"126":126,"128":128,"129":129,"131":131,"132":132,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"144":144,"86":86}],100:[function(require,module,exports){
module.exports = set_json_values_as_json_sparse;

var $path = require(139);
var $error = require(138);
var $atom = require(137);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_set = require(145);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var invalidate_node = require(117);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var set_node_if_missing_path = require(132);
var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function set_json_values_as_json_sparse(model, pathvalues, values, error_selector, comparator) {

    var roots = options([], model, error_selector, comparator);
    var index = -1;
    var count = pathvalues.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];
    var hasValue;

    roots[_cache] = roots.root;
    roots[_json] = parents[_json] = nodes[_json] = json.json || (json.json = {});

    while (++index < count) {

        var pv = pathvalues[index];
        var pathset = pv.path;
        roots.value = pv.value;

        walk_path_set(onNode, onEdge, pathset, 0, roots, parents, nodes, requested, optimized);
    }

    hasValue = roots.hasValue;
    if (hasValue) {
        json.json = roots[_json];
    } else {
        delete json.json;
    }

    return {
        values: values,
        errors: roots.errors,
        hasValue: hasValue,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        jsonkey = get_valid_key(requested);
        json = parents[_json];
        parent = parents[_cache];
    } else {
        jsonkey = key;
        json = nodes[_json];
        parent = nodes[_cache];
    }

    var node = parent[key],
        type;

    if (is_reference) {
        type = is_object(node) && node.$type || undefined;
        type = type && is_branch && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    parents[_json] = json;

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        nodes[_json] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    var selector = roots.error_selector;
    var comparator = roots.comparator;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var message = roots.value;

    if (message === undefined && roots.no_data_source) {
        invalidate_node(parent, node, key, roots.lru);
        update_graph(parent, size, roots.version, roots.lru);
        node = undefined;
    } else {
        type = is_object(message) && message.$type || undefined;
        message = wrap_node(message, type, Boolean(type) ? message.value : message);
        type || (type = $atom);

        if (type == $error && Boolean(selector)) {
            message = selector(requested, message);
        }

        var is_distinct = roots.is_distinct = true;

        if(Boolean(comparator)) {
            is_distinct = roots.is_distinct = !comparator(requested, node, message);
        }

        if (is_distinct) {
            node = replace_node(parent, node, message, key, roots.lru);
            node = graph_node(root, parent, node, key, inc_generation());
            update_graph(parent, size - node.$size, roots.version, roots.lru);
        }
    }
    nodes[_cache] = node;
}

function onEdge(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);
    var isMissingPath = set_node_if_missing_path(roots, node, type, pathset, depth, requested, optimized);
    
    if(isMissingPath) {
        return;
    }
    
    var isError = set_node_if_error(roots, node, type, requested);
    
    if(isError) {
        return;
    }
    
    if (roots.is_distinct === true) {
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
            node = clone(roots, node, type, node && node.value);
            json = roots[_json];
            json.$type = node.$type;
            json.value = node.value;
        } else {
            json = parents[_json];
            json[key] = clone(roots, node, type, node && node.value);
        }
        roots.hasValue = true;
    }
}
},{"103":103,"105":105,"111":111,"113":113,"114":114,"115":115,"117":117,"119":119,"124":124,"126":126,"128":128,"129":129,"131":131,"132":132,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"145":145}],101:[function(require,module,exports){
module.exports = set_json_values_as_json_values;

var $error = require(138);
var $atom = require(137);

var clone = require(105);
var array_clone = require(103);

var options = require(124);
var walk_path_set = require(145);

var is_object = require(119);

var get_valid_key = require(113);
var create_branch = require(111);
var wrap_node = require(136);
var invalidate_node = require(117);
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var update_graph = require(135);
var inc_generation = require(115);

var set_node_if_missing_path = require(132);
var set_node_if_error = require(131);
var set_successful_paths = require(129);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

/**
 * TODO: CR More comments.
 * Sets a list of PathValues into the cache and calls the onNext for each value.
 */
function set_json_values_as_json_values(model, pathvalues, onNext, error_selector, comparator) {

    // TODO: CR Rename options to setup set state
    var roots = options([], model, error_selector, comparator);
    var pathsIndex = -1;
    var pathsCount = pathvalues.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requestedPath = [];
    var optimizedPath = [];

    // TODO: CR Rename node array indicies
    roots[_cache] = roots.root;
    roots.onNext = onNext;

    while (++pathsIndex < pathsCount) {
        var pv = pathvalues[pathsIndex];
        var pathset = pv.path;
        roots.value = pv.value;
        walk_path_set(onNode, onValueType, pathset, 0, roots, parents, nodes, requestedPath, optimizedPath);
    }

    return {
        values: null,
        errors: roots.errors,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

// TODO: CR
// - comment parents and nodes initial state
// - comment parents and nodes mutation

function onNode(pathset, roots, parents, nodes, requested, optimized, is_reference, is_branch, key, keyset, is_keyset) {

    var parent;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        parent = parents[_cache];
    } else {
        parent = nodes[_cache];
    }

    var node = parent[key],
        type;

    if (is_reference) {
        type = is_object(node) && node.$type || undefined;
        type = type && is_branch && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    if (is_branch) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[_cache] = parent;
        nodes[_cache] = node;
        return;
    }

    var selector = roots.error_selector;
    var comparator = roots.comparator;
    var root = roots[_cache];
    var size = is_object(node) && node.$size || 0;
    var message = roots.value;

    if (message === undefined && roots.no_data_source) {
        invalidate_node(parent, node, key, roots.lru);
        update_graph(parent, size, roots.version, roots.lru);
        node = undefined;
    } else {
        type = is_object(message) && message.$type || undefined;
        message = wrap_node(message, type, Boolean(type) ? message.value : message);
        type || (type = $atom);

        if (type == $error && Boolean(selector)) {
            message = selector(requested, message);
        }

        var is_distinct = roots.is_distinct = true;

        if(Boolean(comparator)) {
            is_distinct = roots.is_distinct = !comparator(requested, node, message);
        }

        if (is_distinct) {
            node = replace_node(parent, node, message, key, roots.lru);
            node = graph_node(root, parent, node, key, inc_generation());
            update_graph(parent, size - node.$size, roots.version, roots.lru);
        }
    }
    nodes[_cache] = node;
}

// TODO: CR describe onValueType's job
function onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset) {

    var node = nodes[_cache];
    var type = is_object(node) && node.$type || (node = undefined);
    var isMissingPath = set_node_if_missing_path(roots, node, type, pathset, depth, requested, optimized);

    if (isMissingPath) {
        return;
    }

    var isError = set_node_if_error(roots, node, type, requested);

    if (isError) {
        return;
    }

    if (roots.is_distinct === true) {
        // TODO: CR Explain what's happening here.
        roots.is_distinct = false;
        set_successful_paths(roots, requested, optimized);
        roots.onNext({
            path: array_clone(requested),
            value: clone(roots, node, type, node && node.value)
        });
    }
}
},{"103":103,"105":105,"111":111,"113":113,"114":114,"115":115,"117":117,"119":119,"124":124,"126":126,"128":128,"129":129,"131":131,"132":132,"134":134,"135":135,"136":136,"137":137,"138":138,"145":145}],102:[function(require,module,exports){
module.exports = function(array, value) {
    var i = -1;
    var n = array.length;
    var array2 = new Array(n + 1);
    while(++i < n) { array2[i] = array[i]; }
    array2[i] = value;
    return array2;
};
},{}],103:[function(require,module,exports){
module.exports = function(array) {
    var i = -1;
    var n = array.length;
    var array2 = new Array(n);
    while(++i < n) { array2[i] = array[i]; }
    return array2;
};
},{}],104:[function(require,module,exports){
module.exports = function(array, index) {
    var i = -1;
    var n = Math.max(array.length - index, 0);
    var array2 = new Array(n);
    while(++i < n) { array2[i] = array[i + index]; }
    return array2;
};
},{}],105:[function(require,module,exports){
var $atom = require(137);
var clone = require(110);
module.exports = function(roots, node, type, value) {

    if(node == null || value === undefined) {
        return { $type: $atom };
    }

    if(roots.boxed == true) {
        return Boolean(type) && clone(node) || node;
    }

    return value;
}

},{"110":110,"137":137}],106:[function(require,module,exports){
var $atom = require(137);
var clone = require(110);
var is_primitive = require(120);
module.exports = function(roots, node, type, value) {

    if(node == null || value === undefined) {
        return { $type: $atom };
    }

    if(roots.boxed == true) {
        return Boolean(type) && clone(node) || node;
    }

    if(!type || (type === $atom && is_primitive(value))) {
        return value;
    }

    return clone(node);
}

},{"110":110,"120":120,"137":137}],107:[function(require,module,exports){
var clone_requested_path = require(109);
var clone_optimized_path = require(108);
module.exports = function clone_missing_path_sets(roots, pathset, depth, requested, optimized) {
    roots.requestedMissingPaths.push(clone_requested_path(roots.bound, requested, pathset, depth, roots.index));
    roots.optimizedMissingPaths.push(clone_optimized_path(optimized, pathset, depth));
}
},{"108":108,"109":109}],108:[function(require,module,exports){
module.exports = function(optimized, pathset, depth) {
    var x;
    var i = -1;
    var j = depth - 1;
    var n = optimized.length;
    var m = pathset.length;
    var array2 = [];
    while(++i < n) {
        array2[i] = optimized[i];
    }
    while(++j < m) {
        if((x = pathset[j]) != null) {
            array2[i++] = x;
        }
    }
    return array2;
}
},{}],109:[function(require,module,exports){
var is_object = require(119);
module.exports = function(bound, requested, pathset, depth, index) {
    var x;
    var i = -1;
    var j = -1;
    var l = 0;
    var m = requested.length;
    var n = bound.length;
    var array2 = [];
    while(++i < n) {
        array2[i] = bound[i];
    }
    while(++j < m) {
        if((x = requested[j]) != null) {
            if(is_object(pathset[l++])) {
                array2[i++] = [x];
            } else {
                array2[i++] = x;
            }
        }
    }
    m = n + l + pathset.length - depth;
    while(i < m) {
        array2[i++] = pathset[l++];
    }
    if(index != null) {
        array2.pathSetIndex = index;
    }
    return array2;
}
},{"119":119}],110:[function(require,module,exports){
var is_object = require(119);
var prefix = require(73);

module.exports = function(value) {
    var dest = value, src = dest, i = -1, n, keys, key;
    if(is_object(dest)) {
        dest = {};
        keys = Object.keys(src);
        n = keys.length;
        while(++i < n) {
            key = keys[i];
            if(key[0] !== prefix) {
                dest[key] = src[key];
            }
        }
    }
    return dest;
}
},{"119":119,"73":73}],111:[function(require,module,exports){
// TODO: rename path to ref
var $ref = require(139);
var $expired = "expired";
var replace_node = require(128);
var graph_node = require(114);
var update_back_refs = require(134);
var is_primitive = require(120);
var is_expired = require(118);

// TODO: comment about what happens if node is a branch vs leaf.
module.exports = function create_branch(roots, parent, node, type, key) {

    if(Boolean(type) && is_expired(roots, node)) {
        type = $expired;
    }

    if((Boolean(type) && type != $ref) || is_primitive(node)) {
        node = replace_node(parent, node, {}, key, roots.lru);
        node = graph_node(roots[0], parent, node, key, 0);
        node = update_back_refs(node, roots.version);
    }
    return node;
}
},{"114":114,"118":118,"120":120,"128":128,"134":134,"139":139}],112:[function(require,module,exports){
var __ref = require(76);
var __context = require(65);
var __ref_index = require(75);
var __refs_length = require(77);

module.exports = function(node) {
    var ref, i = -1, n = node[__refs_length] || 0;
    while(++i < n) {
        if((ref = node[__ref + i]) !== undefined) {
            ref[__context] = ref[__ref_index] = node[__ref + i] = undefined;
        }
    }
    node[__refs_length] = undefined
}
},{"65":65,"75":75,"76":76,"77":77}],113:[function(require,module,exports){
module.exports = function(path) {
    var key, index = path.length - 1;
    do {
        if((key = path[index]) != null) {
            return key;
        }
    } while(--index > -1);
    return null;
}
},{}],114:[function(require,module,exports){
var __parent = require(72);
var __key = require(69);
var __generation = require(66);

module.exports = function(root, parent, node, key, generation) {
    node[__parent] = parent;
    node[__key] = key;
    node[__generation] = generation;
    return node;
}
},{"66":66,"69":69,"72":72}],115:[function(require,module,exports){
var generation = 0;
module.exports = function() { return generation++; }
},{}],116:[function(require,module,exports){
var version = 0;
module.exports = function() { return version++; }
},{}],117:[function(require,module,exports){
module.exports = invalidate;

var is_object = require(119);
var remove_node = require(127);
var prefix = require(73);

function invalidate(parent, node, key, lru) {
    if(remove_node(parent, node, key, lru)) {
        var type = is_object(node) && node.$type || undefined;
        if(type == null) {
            var keys = Object.keys(node);
            for(var i = -1, n = keys.length; ++i < n;) {
                var key = keys[i];
                if(key[0] !== prefix && key[0] !== "$") {
                    invalidate(node, node[key], key, lru);
                }
            }
        }
        return true;
    }
    return false;
}
},{"119":119,"127":127,"73":73}],118:[function(require,module,exports){
var $expires_now = require(141);
var $expires_never = require(140);
var __invalidated = require(68);
var now = require(123);
var splice = require(87);

module.exports = function isExpired(roots, node) {
    var expires = node.$expires;
    if((expires != null                            ) && (
        expires != $expires_never                  ) && (
        expires == $expires_now || expires < now()))    {
        if(!node[__invalidated]) {
            node[__invalidated] = true;
            roots.expired.push(node);
            splice(roots.lru, node);
        }
        return true;
    }
    return false;
}

},{"123":123,"140":140,"141":141,"68":68,"87":87}],119:[function(require,module,exports){
var obj_typeof = "object";
module.exports = function(value) {
    return value != null && typeof value == obj_typeof;
}
},{}],120:[function(require,module,exports){
var obj_typeof = "object";
module.exports = function(value) {
    return value == null || typeof value != obj_typeof;
}
},{}],121:[function(require,module,exports){
module.exports = key_to_keyset;

var __offset = require(71);
var is_array = Array.isArray;
var is_object = require(119);

function key_to_keyset(key, iskeyset) {
    if(iskeyset) {
        if(is_array(key)) {
            key = key[key[__offset]];
            return key_to_keyset(key, is_object(key));
        } else {
            return key[__offset];
        }
    }
    return key;
}


},{"119":119,"71":71}],122:[function(require,module,exports){

var $self = "./";
var $path = require(139);
var $atom = require(137);
var $expires_now = require(141);

var is_object = require(119);
var is_primitive = require(120);
var is_expired = require(118);
var promote = require(86);
var wrap_node = require(136);
var graph_node = require(114);
var replace_node = require(128);
var update_graph  = require(135);
var inc_generation = require(115);
var invalidate_node = require(117);

module.exports = function(roots, parent, node, messageParent, message, key, requested) {

    var type, messageType, node_is_object, message_is_object;

    // If the cache and message are the same, we can probably return early:
    // - If they're both null, return null.
    // - If they're both branches, return the branch.
    // - If they're both edges, continue below.
    if(node == message) {
        if(node == null) {
            return null;
        } else if((node_is_object = is_object(node))) {
            type = node.$type;
            if(type == null) {
                if(node[$self] == null) {
                    return graph_node(roots[0], parent, node, key, 0);
                }
                return node;
            }
        }
    } else if((node_is_object = is_object(node))) {
        type = node.$type;
    }

    var value, messageValue;

    if(type == $path) {
        if(message == null) {
            // If the cache is an expired reference, but the message
            // is empty, remove the cache value and return undefined
            // so we build a missing path.
            if(is_expired(roots, node)) {
                invalidate_node(parent, node, key, roots.lru);
                return undefined;
            }
            // If the cache has a reference and the message is empty,
            // leave the cache alone and follow the reference.
            return node;
        } else if((message_is_object = is_object(message))) {
            messageType = message.$type;
            // If the cache and the message are both references,
            // check if we need to replace the cache reference.
            if(messageType == $path) {
                if(node === message) {
                    // If the cache and message are the same reference,
                    // we performed a whole-branch merge of one of the
                    // grandparents. If we've previously graphed this
                    // reference, break early.
                    if(node[$self] != null) {
                        return node;
                    }
                }
                // If the message doesn't expire immediately and is newer than the
                // cache (or either cache or message don't have timestamps), attempt
                // to use the message value.
                // Note: Number and `undefined` compared LT/GT to `undefined` is `false`.
                else if((
                    is_expired(roots, message) === false) && ((
                    message.$timestamp < node.$timestamp) === false)) {

                    // Compare the cache and message references.
                    // - If they're the same, break early so we don't insert.
                    // - If they're different, replace the cache reference.

                    value = node.value;
                    messageValue = message.value;

                    var count = value.length;

                    // If the reference lengths are equal, check their keys for equality.
                    if(count === messageValue.length) {
                        while(--count > -1) {
                            // If any of their keys are different, replace the reference
                            // in the cache with the reference in the message.
                            if(value[count] !== messageValue[count]) {
                                break;
                            }
                        }
                        // If all their keys are equal, leave the cache value alone.
                        if(count === -1) {
                            return node;
                        }
                    }
                }
            }
        }
    } else {
        if((message_is_object = is_object(message))) {
            messageType = message.$type;
        }
        if(node_is_object && !type) {
            // Otherwise if the cache is a branch and the message is either
            // null or also a branch, continue with the cache branch.
            if(message == null || (message_is_object && !messageType)) {
                return node;
            }
        }
    }

    // If the message is an expired edge, report it back out so we don't build a missing path, but
    // don't insert it into the cache. If a value exists in the cache that didn't come from a
    // whole-branch grandparent merge, remove the cache value.
    if(Boolean(messageType) && Boolean(message[$self]) && is_expired(roots, message)) {
        if(node_is_object && node != message) {
            invalidate_node(parent, node, key, roots.lru);
        }
        return message;
    }
    // If the cache is a value, but the message is a branch, merge the branch over the value.
    else if(Boolean(type) && message_is_object && !messageType) {
        node = replace_node(parent, node, message, key, roots.lru);
        return graph_node(roots[0], parent, node, key, 0);
    }
    // If the message is a value, insert it into the cache.
    else if(!message_is_object || Boolean(messageType)) {
        var offset = 0;
        // If we've arrived at this message value, but didn't perform a whole-branch merge
        // on one of its ancestors, replace the cache node with the message value.
        if(node != message) {
            messageValue || (messageValue = Boolean(messageType) ? message.value : message);
            message = wrap_node(message, messageType, messageValue);
            var comparator = roots.comparator;
            var is_distinct = roots.is_distinct = true;
            if(Boolean(comparator)) {
                is_distinct = roots.is_distinct = !comparator(requested, node, message);
            }
            if(is_distinct) {
                var size = node_is_object && node.$size || 0;
                var messageSize = message.$size;
                offset = size - messageSize;

                node = replace_node(parent, node, message, key, roots.lru);
                update_graph(parent, offset, roots.version, roots.lru);
                node = graph_node(roots[0], parent, node, key, inc_generation());
            }
        }
        // If the cache and the message are the same value, we branch-merged one of its
        // ancestors. Give the message a $size and $type, attach its graph pointers, and
        // update the cache sizes and generations.
        else if(node_is_object && node[$self] == null) {
            roots.is_distinct = true;
            node = parent[key] = wrap_node(node, type, node.value);
            offset = -node.$size;
            update_graph(parent, offset, roots.version, roots.lru);
            node = graph_node(roots[0], parent, node, key, inc_generation());
        }
        // Otherwise, cache and message are the same primitive value. Wrap in a atom and insert.
        else {
            roots.is_distinct = true;
            node = parent[key] = wrap_node(node, type, node);
            offset = -node.$size;
            update_graph(parent, offset, roots.version, roots.lru);
            node = graph_node(roots[0], parent, node, key, inc_generation());
        }
        // If the node is already expired, return undefined to build a missing path.
        // if(is_expired(roots, node)) {
        //     return undefined;
        // }

        // Promote the message edge in the LRU.
        promote(roots.lru, node);
    }
    // If we get here, the cache is empty and the message is a branch.
    // Merge the whole branch over.
    else if(node == null) {
        node = parent[key] = graph_node(roots[0], parent, message, key, 0);
    }

    return node;
}

},{"114":114,"115":115,"117":117,"118":118,"119":119,"120":120,"128":128,"135":135,"136":136,"137":137,"139":139,"141":141,"86":86}],123:[function(require,module,exports){
module.exports = Date.now;
},{}],124:[function(require,module,exports){
var inc_version = require(116);
var getBoundValue = require(48);

/**
 * TODO: more options state tracking comments.
 */
module.exports = function(options, model, error_selector, comparator) {
    
    var bound = options.bound     || (options.bound                 = model._path || []);
    var root  = options.root      || (options.root                  = model._cache);
    var nodes = options.nodes     || (options.nodes                 = []);
    var lru   = options.lru       || (options.lru                   = model._root);
    options.expired               || (options.expired               = lru.expired);
    options.errors                || (options.errors                = []);
    options.requestedPaths        || (options.requestedPaths        = []);
    options.optimizedPaths        || (options.optimizedPaths        = []);
    options.requestedMissingPaths || (options.requestedMissingPaths = []);
    options.optimizedMissingPaths || (options.optimizedMissingPaths = []);
    options.boxed  = model._boxed || false;
    options.materialized = model._materialized;
    options.errorsAsValues = model._treatErrorsAsValues || false;
    options.no_data_source = model._dataSource == null;
    options.version = model._version = inc_version();
    
    options.offset || (options.offset = 0);
    options.error_selector = error_selector || model._errorSelector;
    options.comparator = comparator;
    
    if(bound.length) {
        nodes[0] = getBoundValue(model, bound).value;
    } else {
        nodes[0] = root;
    }
    
    return options;
};
},{"116":116,"48":48}],125:[function(require,module,exports){
module.exports = permute_keyset;

var __offset = require(71);
var is_array = Array.isArray;
var is_object = require(119);

function permute_keyset(key) {
    if(is_array(key)) {
        if(key.length == 0) {
            return false;
        }
        if(key[__offset] === undefined) {
            return permute_keyset(key[key[__offset] = 0]) || true;
        } else if(permute_keyset(key[key[__offset]])) {
            return true;
        } else if(++key[__offset] >= key.length) {
            key[__offset] = undefined;
            return false;
        } else {
            return true;
        }
    } else if(is_object(key)) {
        if(key[__offset] === undefined) {
            key[__offset] = (key.from || (key.from = 0)) - 1;
            if(key.to === undefined) {
                if(key.length === undefined) {
                    throw new Error("Range keysets must specify at least one index to retrieve.");
                } else if(key.length === 0) {
                    return false;
                }
                key.to = key.from + (key.length || 1) - 1;
            }
        }
        
        if(++key[__offset] > key.to) {
            key[__offset] = key.from - 1;
            return false;
        }
        
        return true;
    }
    
    return false;
}


},{"119":119,"71":71}],126:[function(require,module,exports){
module.exports = {
    cache: 0,
    message: 1,
    jsong: 2,
    json: 3
};
},{}],127:[function(require,module,exports){
var $path = require(139);
var __parent = require(72);
var unlink = require(133);
var delete_back_refs = require(112);
var splice = require(87);
var is_object = require(119);

module.exports = function(parent, node, key, lru) {
    if(is_object(node)) {
        var type  = node.$type;
        if(Boolean(type)) {
            if(type == $path) { unlink(node); }
            splice(lru, node);
        }
        delete_back_refs(node);
        parent[key] = node[__parent] = undefined;
        return true;
    }
    return false;
}

},{"112":112,"119":119,"133":133,"139":139,"72":72,"87":87}],128:[function(require,module,exports){
var transfer_back_refs = require(130);
var invalidate_node = require(117);

module.exports = function(parent, node, replacement, key, lru) {
    if(node != null && node !== replacement && typeof node == "object") {
        transfer_back_refs(node, replacement);
        invalidate_node(parent, node, key, lru);
    }
    return parent[key] = replacement;
}
},{"117":117,"130":130}],129:[function(require,module,exports){
var array_slice = require(104);
var array_clone = require(103);
module.exports = function cloneSuccessPaths(roots, requested, optimized) {
    roots.requestedPaths.push(array_slice(requested, roots.offset));
    roots.optimizedPaths.push(array_clone(optimized));
}
},{"103":103,"104":104}],130:[function(require,module,exports){
var __ref = require(76);
var __context = require(65);
var __refs_length = require(77);

module.exports = function(node, dest) {
    var nodeRefsLength = node[__refs_length] || 0,
        destRefsLength = dest[__refs_length] || 0,
        i = -1, ref;
    while(++i < nodeRefsLength) {
        ref = node[__ref + i];
        if(ref !== undefined) {
            ref[__context] = dest;
            dest[__ref + (destRefsLength + i)] = ref;
            node[__ref + i] = undefined;
        }
    }
    dest[__refs_length] = nodeRefsLength + destRefsLength;
    node[__refs_length] = ref = undefined;
}
},{"65":65,"76":76,"77":77}],131:[function(require,module,exports){
var $error = require(138);
var promote = require(86);
var array_clone = require(103);
module.exports = function treatNodeAsError(roots, node, type, path) {
    if(node == null) {
        return false;
    }
    promote(roots.lru, node);
    if(type != $error || roots.errorsAsValues) {
        return false;
    }
    roots.errors.push({ path: array_clone(path), value: node.value });
    return true;
};

},{"103":103,"138":138,"86":86}],132:[function(require,module,exports){
var $atom = require(137);
var clone_misses = require(107);
var is_expired = require(118);

module.exports = function treatNodeAsMissingPathSet(roots, node, type, pathset, depth, requested, optimized) {
    var dematerialized = !roots.materialized;
    if(node == null && dematerialized) {
        clone_misses(roots, pathset, depth, requested, optimized);
        return true;
    } else if(Boolean(type)) {
        if(type == $atom && node.value === undefined && dematerialized && !roots.boxed) {
            // Don't clone the missing paths because we found a value, but don't want to report it.
            // TODO: CR Explain weirdness further.
            return true;
        } else if(is_expired(roots, node)) {
            clone_misses(roots, pathset, depth, requested, optimized);
            return true;
        }
    }
    return false;
};

},{"107":107,"118":118,"137":137}],133:[function(require,module,exports){
var __ref = require(76);
var __context = require(65);
var __ref_index = require(75);
var __refs_length = require(77);

module.exports = function(ref) {
    var destination = ref[__context];
    if(destination) {
        var i = (ref[__ref_index] || 0) - 1,
            n = (destination[__refs_length] || 0) - 1;
        while(++i <= n) {
            destination[__ref + i] = destination[__ref + (i + 1)];
        }
        destination[__refs_length] = n;
        ref[__ref_index] = ref[__context] = destination = undefined;
    }
}
},{"65":65,"75":75,"76":76,"77":77}],134:[function(require,module,exports){
module.exports = update_back_refs;

var __ref = require(76);
var __parent = require(72);
var __version = require(79);
var __generation = require(66);
var __refs_length = require(77);

var generation = require(115);

function update_back_refs(node, version) {
    if(node && node[__version] !== version) {
        node[__version] = version;
        node[__generation] = generation();
        update_back_refs(node[__parent], version);
        var i = -1, n = node[__refs_length] || 0;
        while(++i < n) {
            update_back_refs(node[__ref + i], version);
        }
    }
    return node;
}

},{"115":115,"66":66,"72":72,"76":76,"77":77,"79":79}],135:[function(require,module,exports){
var __key = require(69);
var __version = require(79);
var __parent = require(72);
var remove_node = require(127);
var update_back_refs = require(134);

module.exports = function(node, offset, version, lru) {
    var child;
    while((child = node)) {
        node = child[__parent];
        if((child.$size = (child.$size || 0) - offset) <= 0 && node != null) {
            remove_node(node, child, child[__key], lru);
        } else if(child[__version] !== version) {
            update_back_refs(child, version);
        }
    }
}
},{"127":127,"134":134,"69":69,"72":72,"79":79}],136:[function(require,module,exports){
var $path = require(139);
var $error = require(138);
var $atom = require(137);

var now = require(123);
var clone = require(110);
var is_array = Array.isArray;
var is_object = require(119);

// TODO: CR Wraps a node for insertion.
// TODO: CR Define default atom size values.
module.exports = function wrap_node(node, type, value) {

    var dest = node, size = 0;

    if(Boolean(type)) {
        dest = clone(node);
        size = dest.$size;
    // }
    // if(type == $path) {
    //     dest = clone(node);
    //     size = 50 + (value.length || 1);
    // } else if(is_object(node) && (type || (type = node.$type))) {
    //     dest = clone(node);
    //     size = dest.$size;
    } else {
        dest = { value: value };
        type = $atom;
    }

    if(size <= 0 || size == null) {
        switch(typeof value) {
            case "number":
            case "boolean":
            case "function":
            case "undefined":
                size = 51;
                break;
            case "object":
                size = is_array(value) && (50 + value.length) || 51;
                break;
            case "string":
                size = 50 + value.length;
                break;
        }
    }

    // TODO: Is it intended that null or 0 will effectively be treated as undefined? Other places see 0 treated specially as EXPIRE_NOW, but not possible to get into that state through this. Maybe occurs elsewhere?
    var expires = is_object(node) && node.$expires || undefined;
    if(typeof expires === "number" && expires < 0) {
        dest.$expires = now() + (expires * -1);
    }

    dest.$type = type;
    dest.$size = size;

    return dest;
}

},{"110":110,"119":119,"123":123,"137":137,"138":138,"139":139}],137:[function(require,module,exports){
module.exports = "atom";

},{}],138:[function(require,module,exports){
module.exports = "error";
},{}],139:[function(require,module,exports){
module.exports = "ref";
},{}],140:[function(require,module,exports){
module.exports = 1;
},{}],141:[function(require,module,exports){
module.exports = 0;
},{}],142:[function(require,module,exports){
module.exports = walk_path_map;

var prefix = require(73);
var $path = require(139);

var walk_reference = require(146);

var array_slice = require(104);
var array_clone    = require(103);
var array_append   = require(102);

var is_expired = require(118);
var is_primitive = require(120);
var is_object = require(119);
var is_array = Array.isArray;

var promote = require(86);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function walk_path_map(onNode, onValueType, pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset, is_keyset) {

    var node = nodes[_cache];

    if(is_primitive(pathmap) || is_primitive(node)) {
        return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var type = node.$type;

    while(type === $path) {

        if(is_expired(roots, node)) {
            nodes[_cache] = undefined;
            return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
        }

        promote(roots.lru, node);

        var container = node;
        var reference = node.value;

        nodes[_cache] = parents[_cache] = roots[_cache];
        nodes[_jsong] = parents[_jsong] = roots[_jsong];
        nodes[_message] = parents[_message] = roots[_message];

        walk_reference(onNode, container, reference, roots, parents, nodes, requested, optimized);

        node = nodes[_cache];

        if(node == null) {
            optimized = array_clone(reference);
            return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
        } else if(is_primitive(node) || ((type = node.$type) && type != $path)) {
            onNode(pathmap, roots, parents, nodes, requested, optimized, false, null, keyset, false);
            return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, array_append(requested, null), optimized, key, keyset);
        }
    }

    if(type != null) {
        return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var keys = keys_stack[depth] = Object.keys(pathmap);

    if(keys.length == 0) {
        return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var is_outer_keyset = keys.length > 1;

    for(var i = -1, n = keys.length; ++i < n;) {

        var inner_key = keys[i];

        if((inner_key[0] === prefix) || (inner_key[0] === "$")) {
            continue;
        }

        var inner_keyset = is_outer_keyset ? inner_key : keyset;
        var nodes2 = array_clone(nodes);
        var parents2 = array_clone(parents);
        var pathmap2 = pathmap[inner_key];
        var requested2, optimized2, is_branch;
        var has_child_key = false;

        var is_branch = is_object(pathmap2) && !pathmap2.$type;// && !is_array(pathmap2);
        if(is_branch) {
            for(child_key in pathmap2) {
                if((child_key[0] === prefix) || (child_key[0] === "$")) {
                    continue;
                }
                child_key = pathmap2.hasOwnProperty(child_key);
                break;
            }
            is_branch = child_key === true;
        }

        requested2 = array_append(requested, inner_key);
        optimized2 = array_append(optimized, inner_key);
        onNode(pathmap2, roots, parents2, nodes2, requested2, optimized2, false, is_branch, inner_key, inner_keyset, is_outer_keyset);

        if(is_branch) {
            walk_path_map(onNode, onValueType,
                pathmap2, keys_stack, depth + 1,
                roots, parents2, nodes2,
                requested2, optimized2,
                inner_key, inner_keyset, is_outer_keyset
            );
        } else {
            onValueType(pathmap2, keys_stack, depth + 1, roots, parents2, nodes2, requested2, optimized2, inner_key, inner_keyset);
        }
    }
}

},{"102":102,"103":103,"104":104,"118":118,"119":119,"120":120,"126":126,"139":139,"146":146,"73":73,"86":86}],143:[function(require,module,exports){
module.exports = walk_path_map;

var prefix = require(73);
var __context = require(65);
var $path = require(139);

var walk_reference = require(146);

var array_slice = require(104);
var array_clone    = require(103);
var array_append   = require(102);

var is_expired = require(118);
var is_primitive = require(120);
var is_object = require(119);
var is_array = Array.isArray;

var promote = require(86);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function walk_path_map(onNode, onValueType, pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset, is_keyset) {

    var node = nodes[_cache];

    if(is_primitive(pathmap) || is_primitive(node)) {
        return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var type = node.$type;

    while(type === $path) {

        if(is_expired(roots, node)) {
            nodes[_cache] = undefined;
            return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
        }

        promote(roots.lru, node);

        var container = node;
        var reference = node.value;
        node = node[__context];

        if(node != null) {
            type = node.$type;
            optimized = array_clone(reference);
            nodes[_cache] = node;
        } else {

            nodes[_cache] = parents[_cache] = roots[_cache];

            walk_reference(onNode, container, reference, roots, parents, nodes, requested, optimized);

            node = nodes[_cache];

            if(node == null) {
                optimized = array_clone(reference);
                return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
            } else if(is_primitive(node) || ((type = node.$type) && type != $path)) {
                onNode(pathmap, roots, parents, nodes, requested, optimized, false, null, keyset, false);
                return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, array_append(requested, null), optimized, key, keyset);
            }
        }
    }

    if(type != null) {
        return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var keys = keys_stack[depth] = Object.keys(pathmap);

    if(keys.length == 0) {
        return onValueType(pathmap, keys_stack, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var is_outer_keyset = keys.length > 1;

    for(var i = -1, n = keys.length; ++i < n;) {

        var inner_key = keys[i];

        if((inner_key[0] === prefix) || (inner_key[0] === "$")) {
            continue;
        }

        var inner_keyset = is_outer_keyset ? inner_key : keyset;
        var nodes2 = array_clone(nodes);
        var parents2 = array_clone(parents);
        var pathmap2 = pathmap[inner_key];
        var requested2, optimized2, is_branch;
        var child_key = false;

        var is_branch = is_object(pathmap2) && !pathmap2.$type;// && !is_array(pathmap2);
        if(is_branch) {
            for(child_key in pathmap2) {
                if((child_key[0] === prefix) || (child_key[0] === "$")) {
                    continue;
                }
                child_key = pathmap2.hasOwnProperty(child_key);
                break;
            }
            is_branch = child_key === true;
        }

        if(inner_key == "null") {
            requested2 = array_append(requested, null);
            optimized2 = array_clone(optimized);
            inner_key  = key;
            inner_keyset = keyset;
            pathmap2 = pathmap;
            onNode(pathmap2, roots, parents2, nodes2, requested2, optimized2, false, is_branch, null, inner_keyset, false);
        } else {
            requested2 = array_append(requested, inner_key);
            optimized2 = array_append(optimized, inner_key);
            onNode(pathmap2, roots, parents2, nodes2, requested2, optimized2, false, is_branch, inner_key, inner_keyset, is_outer_keyset);
        }

        if(is_branch) {
            walk_path_map(onNode, onValueType,
                pathmap2, keys_stack, depth + 1,
                roots, parents2, nodes2,
                requested2, optimized2,
                inner_key, inner_keyset, is_outer_keyset
            );
        } else {
            onValueType(pathmap2, keys_stack, depth + 1, roots, parents2, nodes2, requested2, optimized2, inner_key, inner_keyset);
        }
    }
}

},{"102":102,"103":103,"104":104,"118":118,"119":119,"120":120,"126":126,"139":139,"146":146,"65":65,"73":73,"86":86}],144:[function(require,module,exports){
module.exports = walk_path_set;

var $path = require(139);
var empty_array = new Array(0);

var walk_reference = require(146);

var array_slice    = require(104);
var array_clone    = require(103);
var array_append   = require(102);

var is_expired = require(118);
var is_primitive = require(120);
var is_object = require(119);

var keyset_to_key  = require(121);
var permute_keyset = require(125);

var promote = require(86);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function walk_path_set(onNode, onValueType, pathset, depth, roots, parents, nodes, requested, optimized, key, keyset, is_keyset) {

    var node = nodes[_cache];

    if(depth >= pathset.length || is_primitive(node)) {
        return onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var type = node.$type;

    while(type === $path) {

        if(is_expired(roots, node)) {
            nodes[_cache] = undefined;
            return onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset);
        }

        promote(roots.lru, node);

        var container = node;
        var reference = node.value;

        nodes[_cache] = parents[_cache] = roots[_cache];
        nodes[_jsong] = parents[_jsong] = roots[_jsong];
        nodes[_message] = parents[_message] = roots[_message];

        walk_reference(onNode, container, reference, roots, parents, nodes, requested, optimized);

        node = nodes[_cache];

        if(node == null) {
            optimized = array_clone(reference);
            return onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset);
        } else if(is_primitive(node) || ((type = node.$type) && type != $path)) {
            onNode(pathset, roots, parents, nodes, requested, optimized, false, false, null, keyset, false);
            return onValueType(pathset, depth, roots, parents, nodes, array_append(requested, null), optimized, key, keyset);
        }
    }

    if(type != null) {
        return onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var outer_key = pathset[depth];
    var is_outer_keyset = is_object(outer_key);
    var is_branch = depth < pathset.length - 1;
    var run_once = false;

    while(is_outer_keyset && permute_keyset(outer_key) && (run_once = true) || (run_once = !run_once)) {
        var inner_key, inner_keyset;

        if(is_outer_keyset === true) {
            inner_key = keyset_to_key(outer_key, true);
            inner_keyset = inner_key;
        } else {
            inner_key = outer_key;
            inner_keyset = keyset;
        }

        var nodes2 = array_clone(nodes);
        var parents2 = array_clone(parents);
        var requested2, optimized2;

        if(inner_key == null) {
            requested2 = array_append(requested, null);
            optimized2 = array_clone(optimized);
            // optimized2 = optimized;
            inner_key = key;
            inner_keyset = keyset;
            onNode(pathset, roots, parents2, nodes2, requested2, optimized2, false, is_branch, null, inner_keyset, false);
        } else {
            requested2 = array_append(requested, inner_key);
            optimized2 = array_append(optimized, inner_key);
            onNode(pathset, roots, parents2, nodes2, requested2, optimized2, false, is_branch, inner_key, inner_keyset, is_outer_keyset);
        }

        walk_path_set(onNode, onValueType,
            pathset, depth + 1,
            roots, parents2, nodes2,
            requested2, optimized2,
            inner_key, inner_keyset, is_outer_keyset
        );
    }
}

},{"102":102,"103":103,"104":104,"118":118,"119":119,"120":120,"121":121,"125":125,"126":126,"139":139,"146":146,"86":86}],145:[function(require,module,exports){
module.exports = walk_path_set;

var __context = require(65);
var $path = require(139);

var walk_reference = require(146);

var array_slice    = require(104);
var array_clone    = require(103);
var array_append   = require(102);

var is_expired = require(118);
var is_primitive = require(120);
var is_object = require(119);

var keyset_to_key  = require(121);
var permute_keyset = require(125);

var promote = require(86);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function walk_path_set(onNode, onValueType, pathset, depth, roots, parents, nodes, requested, optimized, key, keyset, is_keyset) {

    var node = nodes[_cache];

    if(depth >= pathset.length || is_primitive(node)) {
        return onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var type = node.$type;

    while(type === $path) {

        if(is_expired(roots, node)) {
            nodes[_cache] = undefined;
            return onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset);
        }

        promote(roots.lru, node);

        var container = node;
        var reference = node.value;
        node = node[__context];

        if(node != null) {
            type = node.$type;
            optimized = array_clone(reference);
            nodes[_cache]  = node;
        } else {

            nodes[_cache] = parents[_cache] = roots[_cache];

            walk_reference(onNode, container, reference, roots, parents, nodes, requested, optimized);

            node = nodes[_cache];

            if(node == null) {
                optimized = array_clone(reference);
                return onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset);
            } else if(is_primitive(node) || ((type = node.$type) && type != $path)) {
                onNode(pathset, roots, parents, nodes, requested, optimized, false, false, null, keyset, false);
                return onValueType(pathset, depth, roots, parents, nodes, array_append(requested, null), optimized, key, keyset);
            }
        }
    }

    if(type != null) {
        return onValueType(pathset, depth, roots, parents, nodes, requested, optimized, key, keyset);
    }

    var outer_key = pathset[depth];
    var is_outer_keyset = is_object(outer_key);
    var is_branch = depth < pathset.length - 1;
    var run_once = false;

    while(is_outer_keyset && permute_keyset(outer_key) && (run_once = true) || (run_once = !run_once)) {

        var inner_key, inner_keyset;

        if(is_outer_keyset === true) {
            inner_key = keyset_to_key(outer_key, true);
            inner_keyset = inner_key;
        } else {
            inner_key = outer_key;
            inner_keyset = keyset;
        }

        var nodes2 = array_clone(nodes);
        var parents2 = array_clone(parents);
        var requested2, optimized2;

        if(inner_key == null) {
            requested2 = array_append(requested, null);
            optimized2 = array_clone(optimized);
            // optimized2 = optimized;
            inner_key = key;
            inner_keyset = keyset;
            onNode(pathset, roots, parents2, nodes2, requested2, optimized2, false, is_branch, null, inner_keyset, false);
        } else {
            requested2 = array_append(requested, inner_key);
            optimized2 = array_append(optimized, inner_key);
            onNode(pathset, roots, parents2, nodes2, requested2, optimized2, false, is_branch, inner_key, inner_keyset, is_outer_keyset);
        }

        walk_path_set(onNode, onValueType,
            pathset, depth + 1,
            roots, parents2, nodes2,
            requested2, optimized2,
            inner_key, inner_keyset, is_outer_keyset
        );
    }
}

},{"102":102,"103":103,"104":104,"118":118,"119":119,"120":120,"121":121,"125":125,"126":126,"139":139,"146":146,"65":65,"86":86}],146:[function(require,module,exports){
module.exports = walk_reference;

var prefix = require(73);
var __ref = require(76);
var __context = require(65);
var __ref_index = require(75);
var __refs_length = require(77);

var is_object      = require(119);
var is_primitive   = require(120);
var array_slice    = require(104);
var array_append   = require(102);

var positions = require(126);
var _cache = positions.cache;
var _message = positions.message;
var _jsong = positions.jsong;
var _json = positions.json;

function walk_reference(onNode, container, reference, roots, parents, nodes, requested, optimized) {

    optimized.length = 0;

    var index = -1;
    var count = reference.length;
    var node, key, keyset;

    while(++index < count) {

        node = nodes[_cache];

        if(node == null) {
            return nodes;
        } else if(is_primitive(node) || node.$type) {
            onNode(reference, roots, parents, nodes, requested, optimized, true, false, keyset, null, false);
            return nodes;
        }

        do {
            key = reference[index];
            if(key != null) {
                keyset = key;
                optimized.push(key);
                onNode(reference, roots, parents, nodes, requested, optimized, true, index < count - 1, key, null, false);
                break;
            }
        } while(++index < count);
    }

    node = nodes[_cache];

    if(is_object(node) && container[__context] !== node) {
        var backrefs = node[__refs_length] || 0;
        node[__refs_length] = backrefs + 1;
        node[__ref + backrefs] = container;
        container[__context]    = node;
        container[__ref_index]  = backrefs;
    }

    return nodes;
}

},{"102":102,"104":104,"119":119,"120":120,"126":126,"65":65,"73":73,"75":75,"76":76,"77":77}],147:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require(148);
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"148":148}],148:[function(require,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],149:[function(require,module,exports){
(function (process){
"use strict";

var domain; // The domain module is executed on demand
var hasSetImmediate = typeof setImmediate === "function";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including network IO events in Node.js.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Avoids a function call
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory excaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

rawAsap.requestFlush = requestFlush;
function requestFlush() {
    // Ensure flushing is not bound to any domain.
    // It is not sufficient to exit the domain, because domains exist on a stack.
    // To execute code outside of any domain, the following dance is necessary.
    var parentDomain = process.domain;
    if (parentDomain) {
        if (!domain) {
            // Lazy execute the domain module.
            // Only employed if the user elects to use domains.
            domain = require(150);
        }
        domain.active = process.domain = null;
    }

    // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
    // cannot handle recursion.
    // `requestFlush` will only be called recursively from `asap.js`, to resume
    // flushing after an error is thrown into a domain.
    // Conveniently, `setImmediate` was introduced in the same version
    // `process.nextTick` started throwing recursion errors.
    if (flushing && hasSetImmediate) {
        setImmediate(flush);
    } else {
        process.nextTick(flush);
    }

    if (parentDomain) {
        domain.active = process.domain = parentDomain;
    }
}

}).call(this,require(152))
},{"150":150,"152":152}],150:[function(require,module,exports){
/*global define:false require:false */
module.exports = (function(){
	// Import Events
	var events = require(151)

	// Export Domain
	var domain = {}
	domain.createDomain = domain.create = function(){
		var d = new events.EventEmitter()

		function emitError(e) {
			d.emit('error', e)
		}

		d.add = function(emitter){
			emitter.on('error', emitError)
		}
		d.remove = function(emitter){
			emitter.removeListener('error', emitError)
		}
		d.bind = function(fn){
			return function(){
				var args = Array.prototype.slice.call(arguments)
				try {
					fn.apply(null, args)
				}
				catch (err){
					emitError(err)
				}
			}
		}
		d.intercept = function(fn){
			return function(err){
				if ( err ) {
					emitError(err)
				}
				else {
					var args = Array.prototype.slice.call(arguments, 1)
					try {
						fn.apply(null, args)
					}
					catch (err){
						emitError(err)
					}
				}
			}
		}
		d.run = function(fn){
			try {
				fn()
			}
			catch (err) {
				emitError(err)
			}
			return this
		};
		d.dispose = function(){
			this.removeAllListeners()
			return this
		};
		d.enter = d.exit = function(){
			return this
		}
		return d
	};
	return domain
}).call(this)
},{"151":151}],151:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],152:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],153:[function(require,module,exports){
module.exports = function(x) {
    return x;
};

},{}],154:[function(require,module,exports){
var Observer = require(155);
var Disposable = require(158);

function Observable(s) {
    this._subscribe = s;
};

Observable.create = Observable.createWithDisposable = function create(s) {
    return new Observable(s);
};

Observable.fastCreateWithDisposable = Observable.create;

Observable["return"] = function returnValue(value) {
    return Observable.create(function(observer) {
        observer.onNext(value);
        observer.onCompleted();
    });
};

Observable.returnValue = Observable["return"];
Observable.fastReturnValue = Observable["return"];

Observable["throw"] = function throwError(e) {
    return Observable.create(function(observer) {
        observer.onError(e);
    });
};

Observable.throwError = Observable["throw"];

Observable.empty = function empty() {
    return Observable.create(function(observer) {
        observer.onCompleted();
    });
};

Observable.defer = function defer(observableFactory) {
    return Observable.create(function(observer) {
        return observableFactory().subscribe(observer);
    });
};

Observable.of = function of() {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    return Observable.create(function(observer) {
        var errorOcurred = false;
        try {
            for(var i = 0; i < len; ++i) {
                observer.onNext(args[i]);
            }
        } catch(e) {
            errorOcurred = true;
            observer.onError(e);
        }
        if (errorOcurred !== true) {
            observer.onCompleted();
        }
    });
};

Observable.from = function from(x) {
    if (Array.isArray(x)) {
        return Observable.create(function(observer) {
            var err = false;
            x.forEach(function(el) {
                try {
                    observer.onNext(el);
                } catch (e) {
                    err = true;
                    observer.onError(e);
                }
            });

            if (!err) {
                observer.onCompleted();
            }
        });
    }
};
Observable.fromArray = Observable.from;

Observable.prototype.subscribe = function subscribe(n, e, c) {
    return fixDisposable(this._subscribe(
        (n && typeof n === 'object') ?
        n :
        Observer.create(n, e, c)
    ));
};

function fixDisposable(disposable) {
    switch(typeof disposable) {
        case "function":
            return new Disposable(disposable);
        case "object":
            return disposable || Disposable.empty;
        default:
            return Disposable.empty;
    }
}

module.exports = Observable;
},{"155":155,"158":158}],155:[function(require,module,exports){
var I = require(153);
var Observer = module.exports = function Observer(n, e, c) {
    this.onNext =       n || I;
    this.onError =      e || I;
    this.onCompleted =  c || I;
};

Observer.create = function(n, e, c) {
    return new Observer(n, e, c);
};


},{"153":153}],156:[function(require,module,exports){
var Subject = module.exports = function Subject() {
    this.observers = [];
};
Subject.prototype.subscribe = function(subscriber) {
    var a = this.observers,
        n = a.length;
    a[n] = subscriber;
    return {
        dispose: function() {
            a.splice(n, 1);
        }
    };
};
Subject.prototype.onNext = function(x) {
    var listeners = this.observers.concat(),
        i = -1, n = listeners.length;
    while(++i < n) {
        listeners[i].onNext(x);
    }
};
Subject.prototype.onError = function(e) {
    var listeners = this.observers.concat(),
        i  = -1, n = listeners.length;
    this.observers.length = 0;
    while(++i < n) {
        listeners[i].onError(e);
    }
};
Subject.prototype.onCompleted = function() {
    var listeners = this.observers.concat(),
        i  = -1, n = listeners.length;
    this.observers.length = 0;
    while(++i < n) {
        listeners[i].onCompleted();
    }
};

},{}],157:[function(require,module,exports){
var Disposable = require(158);

function CompositeDisposable() {
    this.length = 0;
    this.disposables = [];
    if(arguments.length) {
        this.add.apply(this, arguments);
    }
}

CompositeDisposable.prototype = Object.create(Disposable.prototype);

CompositeDisposable.prototype.add = function() {
    var disposables = this.disposables;
    var args = [];
    var argsLen = arguments.length;
    var argsIdx = -1;
    while(++argsIdx < argsLen) {
        args[argsIdx] = arguments[argsIdx];
    }
    if(argsLen > 0) {
        argsIdx = -1;
        argsLen = args.length;
        while(++argsIdx < argsLen) {
            var disposable = args[argsIdx];
            if(Array.isArray(disposable)) {
                argsLen = args.push.apply(args, disposable);
            } else if(!!disposable) {
                switch(typeof disposable) {
                    case "function":
                        disposables.push(new Disposable(disposable));
                        break;
                    case "object":
                        if(typeof disposable.dispose === "function") {
                            disposables.push(disposable);
                        }
                        break;
                }
            }
        }
    }
    if(this.disposed) {
        this.action();
    }
    this.length = disposables.length;
    return this;
};

CompositeDisposable.prototype.remove = function() {
    var disposables = this.disposables;
    var args = [];
    var argsLen = arguments.length;
    var argsIdx = -1;
    while(++argsIdx < argsLen) {
        args[argsIdx] = arguments[argsIdx];
    }
    if(argsLen > 0) {
        argsIdx = -1;
        argsLen = args.length;
        while(++argsIdx < argsLen) {
            var disposable = args[argsIdx];
            if(Array.isArray(disposable)) {
                argsLen = args.push.apply(args, disposable);
            } else if(!!disposable) {
                var disposableIndex = disposables.indexOf(disposable);
                if(~disposableIndex) {
                    disposables.splice(disposableIndex, 1);
                }
            }
        }
    }
    this.length = disposables.length;
    return this;
}

CompositeDisposable.prototype.action = function() {
    this.disposed = true;
    var disposables = this.disposables;
    var disposablesCount = disposables.length;
    while(--disposablesCount > -1) {
        var disposable = disposables[disposablesCount];
        disposables.length = disposablesCount;
        disposable.dispose();
    }
};

module.exports = CompositeDisposable;
},{"158":158}],158:[function(require,module,exports){
function Disposable(a) {
    this.action = a;
};

Disposable.create = function(a) {
    return new Disposable(a);
};

Disposable.empty = new Disposable(function(){});

Disposable.prototype.dispose = function() {
    if(typeof this.action === 'function') {
        this.action();
    }
};

module.exports = Disposable;
},{}],159:[function(require,module,exports){
var Disposable = require(158);

function SerialDisposable() {
    if(arguments.length > 0) {
        this.setDisposable(arguments[0]);
    }
}

SerialDisposable.prototype = Object.create(Disposable.prototype);

SerialDisposable.prototype.action = function() {
    if(this.disposable) {
        this.disposable.dispose();
        this.disposable = undefined;
    }
    this.disposed = true;
};

SerialDisposable.prototype.setDisposable = function(d) {
    if(this.disposed) {
        d.dispose();
    } else {
        if(this.disposable) {
            this.disposable.dispose();
        }
        this.disposable = d;
    }
};

module.exports = SerialDisposable;
},{"158":158}],160:[function(require,module,exports){
(function (global){
var Rx;

if (typeof window !== "undefined" && typeof window["Rx"] !== "undefined") {
    // Browser environment
    Rx = window["Rx"];
} else if (typeof global !== "undefined" && typeof global["Rx"] !== "undefined") {
    // Node.js environment
    Rx = global["Rx"];
} else if (typeof require !== 'undefined' || typeof window !== 'undefined' && window.require) {
    var r = typeof require !== 'undefined' && require || window.require;
    try {
        // CommonJS environment with rx module
        Rx = r("rx");
    } catch(e) {
        Rx = undefined;
    }
}

if (Rx === undefined) {
    
    var Observable = require(154);
    
    Observable.prototype.catchException = require(161);
    Observable.prototype.concat = require(163);
    Observable.prototype.concatAll = require(162);
    Observable.prototype.defaultIfEmpty = require(164);
    Observable.prototype.doAction = require(165);
    Observable.prototype.flatMap = require(166);
    Observable.prototype.last = require(167);
    Observable.prototype.map = require(168);
    Observable.prototype.materialize = require(169);
    Observable.prototype.mergeAll = require(170);
    Observable.prototype.reduce = require(171);
    Observable.prototype.retry = require(172);
    Observable.prototype.toArray = require(173);
    
    Observable.prototype["catch"] = Observable.prototype.catchException;
    Observable.prototype["do"] = Observable.prototype.doAction;
    Observable.prototype.forEach = Observable.prototype.subscribe;
    Observable.prototype.select = Observable.prototype.map;
    Observable.prototype.selectMany = Observable.prototype.flatMap;
    
    Rx = {
        Disposable: require(158),
        CompositeDisposable: require(157),
        SerialDisposable: require(159),
        Observable: Observable,
        Observer: require(155),
        Subject: require(156),
    };
}

module.exports = Rx;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"154":154,"155":155,"156":156,"157":157,"158":158,"159":159,"161":161,"162":162,"163":163,"164":164,"165":165,"166":166,"167":167,"168":168,"169":169,"170":170,"171":171,"172":172,"173":173}],161:[function(require,module,exports){
var Observable = require(154);
var CompositeDisposable = require(157);
var SerialDisposable = require(159);

module.exports = function catchException(next) {
    var source = this;
    return Observable.create(function(o) {
        var m = new SerialDisposable();
        m.setDisposable(source.subscribe(
            function(x) { o.onNext(x); },
            function(e) {
                m.setDisposable(((typeof next === 'function') ? next(e) : next).subscribe(o));
            },
            function() { o.onCompleted(); }
        ))
        return m;
    });
}
},{"154":154,"157":157,"159":159}],162:[function(require,module,exports){
var Observable = require(154);
var Disposable = require(158);
var CompositeDisposable = require(157);
var SerialDisposable = require(159);

module.exports = function concatAll() {
    var source = this;
    return Observable.create(function(observer) {
        
        var m = new SerialDisposable();
        var group = new CompositeDisposable(m);
        var isStopped = false;
        var buffer = [];
        
        m.setDisposable(source.subscribe(function(innerObs) {
            if(group.length > 1) {
                buffer.push(innerObs);
                return;
            }
            subscribe(innerObs);
        },
        function(e) { observer.onError(e); },
        function( ) {
            isStopped = true;
            if(group.length === 1 && buffer.length === 0) {
                observer.onCompleted();
            }
        }));
        
        function subscribe(innerObs) {
            var innerDisposable = new SerialDisposable();
            group.add(innerDisposable);
            innerDisposable.setDisposable(innerObs.subscribe(
                function(x) { observer.onNext(x); },
                function(e) { observer.onError(e); },
                function( ) {
                    group.remove(innerDisposable);
                    if(buffer.length > 0) {
                        subscribe(buffer.shift());
                    } else if(isStopped && group.length === 1) {
                        observer.onCompleted();
                    }
                }));
        }
        
        return group;
    });
};
},{"154":154,"157":157,"158":158,"159":159}],163:[function(require,module,exports){
var Observable = require(154);

module.exports = function concat() {
    var len = arguments.length;
    var observables = new Array(len + 1);
    observables[0] = this;
    for(var i = 0; i < len; i++) { observables[i + 1] = arguments[i]; }
    return Observable.from(observables).concatAll();
};
},{"154":154}],164:[function(require,module,exports){
var Observable = require(154);

module.exports = function defaultIfEmpty(value) {
    var source = this;
    return Observable.create(function(observer) {
        var hasValue = false;
        return source.subscribe(function(x) {
            hasValue = true;
            observer.onNext(x);
        },
        function(e) { observer.onError(e); },
        function( ) {
            if(!hasValue) {
                observer.onNext(value);
            }
            observer.onCompleted();
        })
    });
};
},{"154":154}],165:[function(require,module,exports){
var Observable = require(154);
var Observer = require(155);

module.exports = function doAction() {
    var actions = arguments[0];
    if (typeof arguments[0] === "function" ||
        typeof arguments[1] === "function" ||
        typeof arguments[2] === "function" ){
        actions = Observer.create.apply(Observer, arguments);
    }
    var source = this;
    return Observable.create(function(observer) {
        return source.subscribe(
            function(x) {
                actions.onNext(x);
                observer.onNext(x);
            },
            function(e) {
                actions.onError(e);
                observer.onError(e);
            },
            function( ) {
                actions.onCompleted();
                observer.onCompleted();
            });
    });
};

},{"154":154,"155":155}],166:[function(require,module,exports){
var Observable = require(154);
module.exports = function flatMap(selector) {
    if(Boolean(selector) && typeof selector === "object") {
        var obs = selector;
        selector = function() { return obs; };
    }
    return this.map(selector).mergeAll();
}
},{"154":154}],167:[function(require,module,exports){
var Observable = require(154);

module.exports = function last() {
    var source = this;
    return Observable.create(function (observer) {
        var value;
        var hasValue = false;
        return source.subscribe(
            function onNext(x) {
                value = x;
                hasValue = true;
            },
            function onError(e) { observer.onError(e); },
            function onCompleted() {
                if (hasValue) {
                    observer.onNext(value);
                    observer.onCompleted();
                } else {
                    observer.onError(new Error("Sequence contains no elements."));
                }
            });
    });
};
},{"154":154}],168:[function(require,module,exports){
var Observable = require(154);

module.exports = function map(selector) {
    var source = this;
    return Observable.create(function(observer) {
        return source.subscribe(
            function(x) {
                try {
                    var errored = false;
                    var value = selector(x);
                } catch(e) {
                    errored = true;
                    observer.onError(e);
                } finally {
                    if(errored === false) {
                        observer.onNext(value);
                    }
                }
            },
            function(e) { observer.onError(e); },
            function( ) { observer.onCompleted(); }
        )
    });
};
},{"154":154}],169:[function(require,module,exports){
var Observable = require(154);

module.exports = function materialize() {
    var source = this;
    return Observable.create(function(observer) {
        source.subscribe(function(x) {
            try {
                observer.onNext({kind: 'N', value: x});
            } catch(e) {
                observer.onError(e);
            }
        }, function(err) {
            observer.onNext({kind: 'E', value: err});
            observer.onCompleted();
        }, function() {
            observer.onNext({kind: 'C'});
            observer.onCompleted();
        });
    });
}
},{"154":154}],170:[function(require,module,exports){
var Observable = require(154);
var Disposable = require(158);
var CompositeDisposable = require(157);
var SerialDisposable = require(159);

module.exports = function mergeAll() {
    var source = this;
    return Observable.create(function(observer) {
        var m = new SerialDisposable();
        var group = new CompositeDisposable(m);
        var isStopped = false;
        m.setDisposable(source.subscribe(function(innerObs) {
            var innerDisposable = new SerialDisposable();
            group.add(innerDisposable);
            innerDisposable.setDisposable(innerObs.subscribe(
                function(x) { observer.onNext(x); },
                function(e) { observer.onError(e); },
                function( ) {
                    group.remove(innerDisposable);
                    if(isStopped && group.length === 1) {
                        observer.onCompleted();
                    }
                }));
        },
        function(e) { observer.onError(e); },
        function( ) {
            isStopped = true;
            if(group.length === 1) {
                observer.onCompleted();
            }
        }));
        return group;
    });
};
},{"154":154,"157":157,"158":158,"159":159}],171:[function(require,module,exports){
var Observable = require(154);

module.exports = function reduce(selector, seedValue) {
    var source = this;
    var hasSeed = arguments.length > 1;
    return Observable.create(function(observer) {
        var accValue = seedValue;
        var hasValue = false;
        return source.subscribe(
            function(x) {
                try {
                    if(hasValue || (hasValue = hasSeed)) {
                        accValue = selector(accValue, x);
                        return;
                    }
                    accValue = x;
                    hasValue = true;
                } catch (e) {
                    observer.onError(e);
                }
            },
            function(e) { observer.onError(e); },
            function( ) {
                if(hasValue || hasSeed) {
                    observer.onNext(accValue);
                }
                observer.onCompleted();
            });
    });
}
},{"154":154}],172:[function(require,module,exports){
var Observable = require(154);
var SerialDisposable = require(159);

module.exports = function retry(retryTotal) {
    retryTotal || (retryTotal = 1);
    var source = this;
    return Observable.create(function(observer) {
        
        var retryCount = 0;
        var disposable = new SerialDisposable();
        
        disposable.setDisposable(subscribe(observer));
        
        return disposable;
        
        function subscribe(observer) {
            return source.subscribe(
                function(x) { observer.onNext(x); },
                function(e) {
                    if(++retryCount > retryTotal) {
                        observer.onError(e);
                        return;
                    }
                    disposable.setDisposable(subscribe(observer));
                },
                function( ) { observer.onCompleted(); }
            );
        };
    });
};
},{"154":154,"159":159}],173:[function(require,module,exports){
var Observable = require(154);

module.exports = function toArray() {
    var source = this;
    return Observable.create(function(observer) {
        var list = [];
        return source.subscribe(
            function(x) { list.push(x); },
            function(e) { observer.onError(e); },
            function( ) {
                observer.onNext(list);
                observer.onCompleted();
            });
    });
};
},{"154":154}],174:[function(require,module,exports){
module.exports = {
    integers: 'integers',
    ranges: 'ranges',
    keys: 'keys'
};

},{}],175:[function(require,module,exports){
var TokenTypes = {
    token: 'token',
    dotSeparator: '.',
    commaSeparator: ',',
    openingBracket: '[',
    closingBracket: ']',
    openingBrace: '{',
    closingBrace: '}',
    escape: '\\',
    space: ' ',
    colon: ':',
    quote: 'quote',
    unknown: 'unknown'
};

module.exports = TokenTypes;

},{}],176:[function(require,module,exports){
module.exports = {
    indexer: {
        nested: 'Indexers cannot be nested.',
        needQuotes: 'unquoted indexers must be numeric.',
        empty: 'cannot have empty indexers.',
        leadingDot: 'Indexers cannot have leading dots.',
        leadingComma: 'Indexers cannot have leading comma.',
        requiresComma: 'Indexers require commas between indexer args.',
        routedTokens: 'Only one token can be used per indexer when specifying routed tokens.'
    },
    range: {
        precedingNaN: 'ranges must be preceded by numbers.',
        suceedingNaN: 'ranges must be suceeded by numbers.'
    },
    routed: {
        invalid: 'Invalid routed token.  only integers|ranges|keys are supported.'
    },
    quote: {
        empty: 'cannot have empty quoted keys.',
        illegalEscape: 'Invalid escape character.  Only quotes are escapable.'
    },
    unexpectedToken: 'Unexpected token.',
    invalidIdentifier: 'Invalid Identifier.',
    invalidPath: 'Please provide a valid path.',
    throwError: function(err, tokenizer, token) {
        if (token) {
            throw err + ' -- ' + tokenizer.parseString + ' with next token: ' + token;
        }
        throw err + ' -- ' + tokenizer.parseString;
    }
};


},{}],177:[function(require,module,exports){
var Tokenizer = require(183);
var head = require(178);
var RoutedTokens = require(174);

var parser = function parser(string, extendedRules) {
    return head(new Tokenizer(string, extendedRules));
};

module.exports = parser;

// Constructs the paths from paths / pathValues that have strings.
// If it does not have a string, just moves the value into the return
// results.
parser.fromPathsOrPathValues = function(paths, ext) {
    var out = [];
    for (i = 0, len = paths.length; i < len; i++) {

        // Is the path a string
        if (typeof paths[i] === 'string') {
            out[i] = parser(paths[i], ext);
        }

        // is the path a path value with a string value.
        else if (typeof paths[i].path === 'string') {
            out[i] = {
                path: parser(paths[i].path, ext), value: paths[i].value
            };
        }

        // just copy it over.
        else {
            out[i] = paths[i];
        }
    }

    return out;
};

// If the argument is a string, this with convert, else just return
// the path provided.
parser.fromPath = function(path, ext) {
    if (typeof path === 'string') {
        return parser(path, ext);
    }
    return path;
};

// Potential routed tokens.
parser.RoutedTokens = RoutedTokens;

},{"174":174,"178":178,"183":183}],178:[function(require,module,exports){
var TokenTypes = require(175);
var E = require(176);
var indexer = require(179);

/**
 * The top level of the parse tree.  This returns the generated path
 * from the tokenizer.
 */
module.exports = function head(tokenizer) {
    var token = tokenizer.next();
    var state = {};
    var out = [];

    while (!token.done) {

        switch (token.type) {
            case TokenTypes.token:
                var first = +token.token[0];
                if (!isNaN(first)) {
                    E.throwError(E.invalidIdentifier, tokenizer);
                }
                out[out.length] = token.token;
                break;

            // dotSeparators at the top level have no meaning
            case TokenTypes.dotSeparator:
                if (out.length === 0) {
                    E.throwError(E.unexpectedToken, tokenizer);
                }
                break;

            // Spaces do nothing.
            case TokenTypes.space:
                // NOTE: Spaces at the top level are allowed.
                // titlesById  .summary is a valid path.
                break;


            // Its time to decend the parse tree.
            case TokenTypes.openingBracket:
                indexer(tokenizer, token, state, out);
                break;

            default:
                E.throwError(E.unexpectedToken, tokenizer);
                break;
        }

        // Keep cycling through the tokenizer.
        token = tokenizer.next();
    }

    if (out.length === 0) {
        E.throwError(E.invalidPath, tokenizer);
    }

    return out;
};


},{"175":175,"176":176,"179":179}],179:[function(require,module,exports){
var TokenTypes = require(175);
var E = require(176);
var idxE = E.indexer;
var range = require(181);
var quote = require(180);
var routed = require(182);

/**
 * The indexer is all the logic that happens in between
 * the '[', opening bracket, and ']' closing bracket.
 */
module.exports = function indexer(tokenizer, openingToken, state, out) {
    var token = tokenizer.next();
    var done = false;
    var allowedMaxLength = 1;
    var routedIndexer = false;

    // State variables
    state.indexer = [];

    while (!token.done) {

        switch (token.type) {
            case TokenTypes.token:
            case TokenTypes.quote:

                // ensures that token adders are properly delimited.
                if (state.indexer.length === allowedMaxLength) {
                    E.throwError(idxE.requiresComma, tokenizer);
                }
                break;
        }

        switch (token.type) {
            // Extended syntax case
            case TokenTypes.openingBrace:
                routedIndexer = true;
                routed(tokenizer, token, state, out);
                break;


            case TokenTypes.token:
                var t = +token.token;
                if (isNaN(t)) {
                    E.throwError(idxE.needQuotes, tokenizer);
                }
                state.indexer[state.indexer.length] = t;
                break;

            // dotSeparators at the top level have no meaning
            case TokenTypes.dotSeparator:
                if (!state.indexer.length) {
                    E.throwError(idxE.leadingDot, tokenizer);
                }
                range(tokenizer, token, state, out);
                break;

            // Spaces do nothing.
            case TokenTypes.space:
                break;

            case TokenTypes.closingBracket:
                done = true;
                break;


            // The quotes require their own tree due to what can be in it.
            case TokenTypes.quote:
                quote(tokenizer, token, state, out);
                break;


            // Its time to decend the parse tree.
            case TokenTypes.openingBracket:
                E.throwError(idxE.nested, tokenizer);
                break;

            case TokenTypes.commaSeparator:
                ++allowedMaxLength;
                break;

            default:
                E.throwError(idxE.unexpectedToken, tokenizer);
        }

        // If done, leave loop
        if (done) {
            break;
        }

        // Keep cycling through the tokenizer.
        token = tokenizer.next();
    }

    if (state.indexer.length === 0) {
        E.throwError(idxE.empty, tokenizer);
    }

    if (state.indexer.length > 1 && routedIndexer) {
        E.throwError(idxE.routedTokens, tokenizer);
    }

    // Remember, if an array of 1, keySets will be generated.
    if (state.indexer.length === 1) {
        state.indexer = state.indexer[0];
    }

    out[out.length] = state.indexer;

    // Clean state.
    state.indexer = undefined;
};


},{"175":175,"176":176,"180":180,"181":181,"182":182}],180:[function(require,module,exports){
var TokenTypes = require(175);
var E = require(176);
var quoteE = E.quote;

/**
 * quote is all the parse tree in between quotes.  This includes the only
 * escaping logic.
 *
 * parse-tree:
 * <opening-quote>(.|(<escape><opening-quote>))*<opening-quote>
 */
module.exports = function quote(tokenizer, openingToken, state, out) {
    var token = tokenizer.next();
    var innerToken = '';
    var openingQuote = openingToken.token;
    var escaping = false;
    var done = false;

    while (!token.done) {

        switch (token.type) {
            case TokenTypes.token:
            case TokenTypes.space:

            case TokenTypes.dotSeparator:
            case TokenTypes.commaSeparator:

            case TokenTypes.openingBracket:
            case TokenTypes.closingBracket:
            case TokenTypes.openingBrace:
            case TokenTypes.closingBrace:
                if (escaping) {
                    E.throwError(quoteE.illegalEscape, tokenizer);
                }

                innerToken += token.token;
                break;


            case TokenTypes.quote:
                // the simple case.  We are escaping
                if (escaping) {
                    innerToken += token.token;
                    escaping = false;
                }

                // its not a quote that is the opening quote
                else if (token.token !== openingQuote) {
                    innerToken += token.token;
                }

                // last thing left.  Its a quote that is the opening quote
                // therefore we must produce the inner token of the indexer.
                else {
                    done = true;
                }

                break;
            case TokenTypes.escape:
                escaping = true;
                break;

            default:
                E.throwError(E.unexpectedToken, tokenizer);
        }

        // If done, leave loop
        if (done) {
            break;
        }

        // Keep cycling through the tokenizer.
        token = tokenizer.next();
    }

    if (innerToken.length === 0) {
        E.throwError(quoteE.empty, tokenizer);
    }

    state.indexer[state.indexer.length] = innerToken;
};


},{"175":175,"176":176}],181:[function(require,module,exports){
var Tokenizer = require(183);
var TokenTypes = require(175);
var E = require(176);

/**
 * The indexer is all the logic that happens in between
 * the '[', opening bracket, and ']' closing bracket.
 */
module.exports = function range(tokenizer, openingToken, state, out) {
    var token = tokenizer.peek();
    var dotCount = 1;
    var done = false;
    var inclusive = true;

    // Grab the last token off the stack.  Must be an integer.
    var idx = state.indexer.length - 1;
    var from = Tokenizer.toNumber(state.indexer[idx]);
    var to;

    if (isNaN(from)) {
        E.throwError(E.range.precedingNaN, tokenizer);
    }

    // Why is number checking so difficult in javascript.

    while (!done && !token.done) {

        switch (token.type) {

            // dotSeparators at the top level have no meaning
            case TokenTypes.dotSeparator:
                if (dotCount === 3) {
                    E.throwError(E.unexpectedToken, tokenizer);
                }
                ++dotCount;

                if (dotCount === 3) {
                    inclusive = false;
                }
                break;

            case TokenTypes.token:
                // move the tokenizer forward and save to.
                to = Tokenizer.toNumber(tokenizer.next().token);

                // throw potential error.
                if (isNaN(to)) {
                    E.throwError(E.range.suceedingNaN, tokenizer);
                }

                done = true;
                break;

            default:
                done = true;
                break;
        }

        // Keep cycling through the tokenizer.  But ranges have to peek
        // before they go to the next token since there is no 'terminating'
        // character.
        if (!done) {
            tokenizer.next();

            // go to the next token without consuming.
            token = tokenizer.peek();
        }

        // break and remove state information.
        else {
            break;
        }
    }

    state.indexer[idx] = {from: from, to: inclusive ? to : to - 1};
};


},{"175":175,"176":176,"183":183}],182:[function(require,module,exports){
var TokenTypes = require(175);
var RoutedTokens = require(174);
var E = require(176);
var routedE = E.routed;

/**
 * The routing logic.
 *
 * parse-tree:
 * <opening-brace><routed-token>(:<token>)<closing-brace>
 */
module.exports = function routed(tokenizer, openingToken, state, out) {
    var routeToken = tokenizer.next();
    var named = false;
    var name = '';

    // ensure the routed token is a valid ident.
    switch (routeToken.token) {
        case RoutedTokens.integers:
        case RoutedTokens.ranges:
        case RoutedTokens.keys:
            //valid
            break;
        default:
            E.throwError(routedE.invalid, tokenizer);
            break;
    }

    // Now its time for colon or ending brace.
    var next = tokenizer.next();

    // we are parsing a named identifier.
    if (next.type === TokenTypes.colon) {
        named = true;

        // Get the token name.
        next = tokenizer.next();
        if (next.type !== TokenTypes.token) {
            E.throwError(routedE.invalid, tokenizer);
        }
        name = next.token;

        // move to the closing brace.
        next = tokenizer.next();
    }

    // must close with a brace.

    if (next.type === TokenTypes.closingBrace) {
        var outputToken = {
            type: routeToken.token,
            named: named,
            name: name
        };
        state.indexer[state.indexer.length] = outputToken;
    }

    // closing brace expected
    else {
        E.throwError(routedE.invalid, tokenizer);
    }

};


},{"174":174,"175":175,"176":176}],183:[function(require,module,exports){
var TokenTypes = require(175);
var DOT_SEPARATOR = '.';
var COMMA_SEPARATOR = ',';
var OPENING_BRACKET = '[';
var CLOSING_BRACKET = ']';
var OPENING_BRACE = '{';
var CLOSING_BRACE = '}';
var COLON = ':';
var ESCAPE = '\\';
var DOUBLE_OUOTES = '"';
var SINGE_OUOTES = "'";
var SPACE = " ";
var SPECIAL_CHARACTERS = '\\\'"[]., ';
var EXT_SPECIAL_CHARACTERS = '\\{}\'"[]., :';

var Tokenizer = module.exports = function(string, ext) {
    this._string = string;
    this._idx = -1;
    this._extended = ext;
    this.parseString = '';
};

Tokenizer.prototype = {
    /**
     * grabs the next token either from the peek operation or generates the
     * next token.
     */
    next: function() {
        var nextToken = this._nextToken ?
            this._nextToken : getNext(this._string, this._idx, this._extended);

        this._idx = nextToken.idx;
        this._nextToken = false;
        this.parseString += nextToken.token.token;

        return nextToken.token;
    },

    /**
     * will peak but not increment the tokenizer
     */
    peek: function() {
        var nextToken = this._nextToken ?
            this._nextToken : getNext(this._string, this._idx, this._extended);
        this._nextToken = nextToken;

        return nextToken.token;
    }
};

Tokenizer.toNumber = function toNumber(x) {
    if (!isNaN(+x)) {
        return +x;
    }
    return NaN;
};

function toOutput(token, type, done) {
    return {
        token: token,
        done: done,
        type: type
    };
}

function getNext(string, idx, ext) {
    var output = false;
    var token = '';
    var specialChars = ext ?
        EXT_SPECIAL_CHARACTERS : SPECIAL_CHARACTERS;
    do {

        done = idx + 1 >= string.length;
        if (done) {
            break;
        }

        // we have to peek at the next token
        var character = string[idx + 1];

        if (character !== undefined &&
            specialChars.indexOf(character) === -1) {

            token += character;
            ++idx;
            continue;
        }

        // The token to delimiting character transition.
        else if (token.length) {
            break;
        }

        ++idx;
        var type;
        switch (character) {
            case DOT_SEPARATOR:
                type = TokenTypes.dotSeparator;
                break;
            case COMMA_SEPARATOR:
                type = TokenTypes.commaSeparator;
                break;
            case OPENING_BRACKET:
                type = TokenTypes.openingBracket;
                break;
            case CLOSING_BRACKET:
                type = TokenTypes.closingBracket;
                break;
            case OPENING_BRACE:
                type = TokenTypes.openingBrace;
                break;
            case CLOSING_BRACE:
                type = TokenTypes.closingBrace;
                break;
            case SPACE:
                type = TokenTypes.space;
                break;
            case DOUBLE_OUOTES:
            case SINGE_OUOTES:
                type = TokenTypes.quote;
                break;
            case ESCAPE:
                type = TokenTypes.escape;
                break;
            case COLON:
                type = TokenTypes.colon;
                break;
            default:
                type = TokenTypes.unknown;
                break;
        }
        output = toOutput(character, type, false);
        break;
    } while (!done);

    if (!output && token.length) {
        output = toOutput(token, TokenTypes.token, false);
    }

    if (!output) {
        output = {done: true};
    }

    return {
        token: output,
        idx: idx
    };
}



},{"175":175}],184:[function(require,module,exports){
'use strict';

module.exports = require(189)

},{"189":189}],185:[function(require,module,exports){
'use strict';

var asap = require(149)

function noop() {};

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;
function Promise(fn) {
  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new')
  if (typeof fn !== 'function') throw new TypeError('not a function')
  this._71 = 0;
  this._18 = null;
  this._61 = [];
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise.prototype._10 = function (onFulfilled, onRejected) {
  var self = this;
  return new this.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    self._24(new Handler(onFulfilled, onRejected, res));
  });
};
Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) return this._10(onFulfilled, onRejected);
  var res = new Promise(noop);
  this._24(new Handler(onFulfilled, onRejected, res));
  return res;
};
Promise.prototype._24 = function(deferred) {
  if (this._71 === 3) {
    this._18._24(deferred);
    return;
  }
  if (this._71 === 0) {
    this._61.push(deferred);
    return;
  }
  var state = this._71;
  var value = this._18;
  asap(function() {
    var cb = state === 1 ? deferred.onFulfilled : deferred.onRejected
    if (cb === null) {
      (state === 1 ? deferred.promise._82(value) : deferred.promise._67(value))
      return
    }
    var ret = tryCallOne(cb, value);
    if (ret === IS_ERROR) {
      deferred.promise._67(LAST_ERROR)
    } else {
      deferred.promise._82(ret)
    }
  });
};
Promise.prototype._82 = function(newValue) {
  //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === this) {
    return this._67(new TypeError('A promise cannot be resolved with itself.'))
  }
  if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return this._67(LAST_ERROR);
    }
    if (
      then === this.then &&
      newValue instanceof Promise &&
      newValue._24 === this._24
    ) {
      this._71 = 3;
      this._18 = newValue;
      for (var i = 0; i < this._61.length; i++) {
        newValue._24(this._61[i]);
      }
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), this)
      return
    }
  }
  this._71 = 1
  this._18 = newValue
  this._94()
}

Promise.prototype._67 = function (newValue) {
  this._71 = 2
  this._18 = newValue
  this._94()
}
Promise.prototype._94 = function () {
  for (var i = 0; i < this._61.length; i++)
    this._24(this._61[i])
  this._61 = null
}


function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return
    done = true
    promise._82(value)
  }, function (reason) {
    if (done) return
    done = true
    promise._67(reason)
  })
  if (!done && res === IS_ERROR) {
    done = true
    promise._67(LAST_ERROR)
  }
}
},{"149":149}],186:[function(require,module,exports){
'use strict';

var Promise = require(185)

module.exports = Promise
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this
  self.then(null, function (err) {
    setTimeout(function () {
      throw err
    }, 0)
  })
}
},{"185":185}],187:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require(185)
var asap = require(149)

module.exports = Promise

/* Static Functions */

function ValuePromise(value) {
  this.then = function (onFulfilled) {
    if (typeof onFulfilled !== 'function') return this
    return new Promise(function (resolve, reject) {
      asap(function () {
        try {
          resolve(onFulfilled(value))
        } catch (ex) {
          reject(ex);
        }
      })
    })
  }
}
ValuePromise.prototype = Promise.prototype

var TRUE = new ValuePromise(true)
var FALSE = new ValuePromise(false)
var NULL = new ValuePromise(null)
var UNDEFINED = new ValuePromise(undefined)
var ZERO = new ValuePromise(0)
var EMPTYSTRING = new ValuePromise('')

Promise.resolve = function (value) {
  if (value instanceof Promise) return value

  if (value === null) return NULL
  if (value === undefined) return UNDEFINED
  if (value === true) return TRUE
  if (value === false) return FALSE
  if (value === 0) return ZERO
  if (value === '') return EMPTYSTRING

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then
      if (typeof then === 'function') {
        return new Promise(then.bind(value))
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex)
      })
    }
  }

  return new ValuePromise(value)
}

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr)

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    var remaining = args.length
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        var then = val.then
        if (typeof then === 'function') {
          then.call(val, function (val) { res(i, val) }, reject)
          return
        }
      }
      args[i] = val
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) { 
    reject(value);
  });
}

Promise.race = function (values) {
  return new Promise(function (resolve, reject) { 
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    })
  });
}

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
}

},{"149":149,"185":185}],188:[function(require,module,exports){
'use strict';

var Promise = require(185)

module.exports = Promise
Promise.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise.resolve(f()).then(function () {
      return value
    })
  }, function (err) {
    return Promise.resolve(f()).then(function () {
      throw err
    })
  })
}

},{"185":185}],189:[function(require,module,exports){
'use strict';

module.exports = require(185)
require(186)
require(188)
require(187)
require(190)

},{"185":185,"186":186,"187":187,"188":188,"190":190}],190:[function(require,module,exports){
'use strict';

//This file contains then/promise specific extensions that are only useful for node.js interop

var Promise = require(185)
var asap = require(147)

module.exports = Promise

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity
  return function () {
    var self = this
    var args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      while (args.length && args.length > argumentCount) {
        args.pop()
      }
      args.push(function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
      var res = fn.apply(self, args)
      if (res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === 'function') {
        resolve(res)
      }
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
    var ctx = this
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx)
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) { reject(ex) })
      } else {
        asap(function () {
          callback.call(ctx, ex)
        })
      }
    }
  }
}

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value)
    })
  }, function (err) {
    asap(function () {
      callback.call(ctx, err)
    })
  })
}

},{"147":147,"185":185}]},{},[1]);
