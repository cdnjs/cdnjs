/*!
 * Copyright 2015 Netflix, Inc
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
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.falcor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var falcor = require(2);
var Router = require(160);

falcor.Router = Router;

module.exports = falcor;

},{"160":160,"2":2}],2:[function(require,module,exports){
var falcor = require(33);
var jsong = require(131);

falcor.atom = jsong.atom;
falcor.ref = jsong.ref;
falcor.error = jsong.error;
falcor.pathValue = jsong.pathValue;

falcor.HttpDataSource = require(126);

module.exports = falcor;

},{"126":126,"131":131,"33":33}],3:[function(require,module,exports){
var ModelRoot = require(5);
var ModelDataSourceAdapter = require(4);

var RequestQueue = require(56);
var ModelResponse = require(65);
var SetResponse = require(66);
var CallResponse = require(62);
var InvalidateResponse = require(64);

var ASAPScheduler = require(74);
var TimeoutScheduler = require(76);
var ImmediateScheduler = require(75);

var arrayClone = require(82);
var arraySlice = require(85);

var collectLru = require(50);
var pathSyntax = require(135);

var getSize = require(89);
var isObject = require(101);
var isFunction = require(97);
var isPrimitive = require(103);
var isJSONEnvelope = require(99);
var isJSONGraphEnvelope = require(100);

var setCache = require(78);
var setJSONGraphs = require(77);
var jsong = require(131);
var ID = 0;
var validateInput = require(117);
var noOp = function() {};
var getCache = require(15);
var get = require(20);
var SET_VALID_INPUT = {
    pathValue: true,
    pathSyntax: true,
    json: true,
    jsonGraph: true
};
var GET_VALID_INPUT = require(73);

module.exports = Model;

Model.ref = jsong.ref;
Model.atom = jsong.atom;
Model.error = jsong.error;
Model.pathValue = jsong.pathValue;
/**
 * This callback is invoked when the Model's cache is changed.
 * @callback Model~onChange
 */

 /**
 * This function is invoked on every JSONGraph Error retrieved from the DataSource. This function allows Error objects to be transformed before being stored in the Model's cache.
 * @callback Model~errorSelector
 * @param {Object} jsonGraphError - the JSONGraph Error object to transform before it is stored in the Model's cache.
 * @returns {Object} the JSONGraph Error object to store in the Model cache.
 */

 /**
 * This function is invoked every time a value in the Model cache is about to be replaced with a new value. If the function returns true, the existing value is replaced with a new value and the version flag on all of the value's ancestors in the tree are incremented.
 * @callback Model~comparator
 * @param {Object} existingValue - the current value in the Model cache.
 * @param {Object} newValue - the value about to be set into the Model cache.
 * @returns {Boolean} the Boolean value indicating whether the new value and the existing value are equal.
 */

/**
 * A Model object is used to execute commands against a {@link JSONGraph} object. {@link Model}s can work with a local JSONGraph cache, or it can work with a remote {@link JSONGraph} object through a {@link DataSource}.
 * @constructor
 * @param {?Object} options - a set of options to customize behavior
 * @param {?DataSource} options.source - a data source to retrieve and manage the {@link JSONGraph}
 * @param {?JSONGraph} options.cache - initial state of the {@link JSONGraph}
 * @param {?number} options.maxSize - the maximum size of the cache
 * @param {?number} options.collectRatio - the ratio of the maximum size to collect when the maxSize is exceeded
 * @param {?Model~errorSelector} options.errorSelector - a function used to translate errors before they are returned
 * @param {?Model~onChange} options.onChange - a function called whenever the Model's cache is changed
 * @param {?Model~comparator} options.comparator - a function called whenever a value in the Model's cache is about to be replaced with a new value.
 */
function Model(o) {

    var options = o || {};
    this._root = options._root || new ModelRoot(options);
    this._path = options.path || options._path || [];
    this._scheduler = options.scheduler || options._scheduler || new ImmediateScheduler();
    this._source = options.source || options._source;
    this._request = options.request || options._request || new RequestQueue(this, this._scheduler);
    this._ID = ID++;

    if (typeof options.maxSize === "number") {
        this._maxSize = options.maxSize;
    } else {
        this._maxSize = options._maxSize || Model.prototype._maxSize;
    }

    if (typeof options.collectRatio === "number") {
        this._collectRatio = options.collectRatio;
    } else {
        this._collectRatio = options._collectRatio || Model.prototype._collectRatio;
    }

    if (options.boxed || options.hasOwnProperty("_boxed")) {
        this._boxed = options.boxed || options._boxed;
    }

    if (options.materialized || options.hasOwnProperty("_materialized")) {
        this._materialized = options.materialized || options._materialized;
    }

    if (typeof options.treatErrorsAsValues === "boolean") {
        this._treatErrorsAsValues = options.treatErrorsAsValues;
    } else if (options.hasOwnProperty("_treatErrorsAsValues")) {
        this._treatErrorsAsValues = options._treatErrorsAsValues;
    }

    if (options.cache) {
        this.setCache(options.cache);
    }
}

Model.prototype.constructor = Model;

Model.prototype._materialized = false;
Model.prototype._boxed = false;
Model.prototype._progressive = false;
Model.prototype._treatErrorsAsValues = false;
Model.prototype._maxSize = Math.pow(2, 53) - 1;
Model.prototype._collectRatio = 0.75;

/**
 * The get method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model}. The get method loads each value into a JSON object and returns in a ModelResponse.
 * @function
 * @param {...PathSet} path - the path(s) to retrieve
 * @return {ModelResponse.<JSONEnvelope>} - the requested data as JSON
 */
Model.prototype.get = require(72);

/**
 * The get method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model}. The get method loads each value into a JSON object and returns in a ModelResponse.
 * @function
 * @private
 * @param {Array.<PathSet>} paths - the path(s) to retrieve
 * @return {ModelResponse.<JSONEnvelope>} - the requested data as JSON
 */
Model.prototype._getWithPaths = require(71);

/**
 * Sets the value at one or more places in the JSONGraph model. The set method accepts one or more {@link PathValue}s, each of which is a combination of a location in the document and the value to place there.  In addition to accepting  {@link PathValue}s, the set method also returns the values after the set operation is complete.
 * @function
 * @return {ModelResponse.<JSON>} - an {@link Observable} stream containing the values in the JSONGraph model after the set was attempted
 */
Model.prototype.set = function set() {
    var out = validateInput(arguments, SET_VALID_INPUT, "set");
    if (out !== true) {
        return new ModelResponse(function(o) {
            o.onError(out);
        });
    }
    return this._set.apply(this, arguments);
};

/**
 * The preload method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model} and loads them into the Model cache.
 * @function
 * @param {...PathSet} path - the path(s) to retrieve
 * @return {ModelResponse.<Object>} - a ModelResponse that completes when the data has been loaded into the cache.
 */
Model.prototype.preload = function preload() {
    var out = validateInput(arguments, GET_VALID_INPUT, "preload");
    if (out !== true) {
        return new ModelResponse(function(o) {
            o.onError(out);
        });
    }
    var args = Array.prototype.slice.call(arguments);
    var self = this;
    return new ModelResponse(function(obs) {
        return self.get.apply(self, args).subscribe(function() {
        }, function(err) {
            obs.onError(err);
        }, function() {
            obs.onCompleted();
        });
    });
};

Model.prototype._set = function _set() {
    var args;
    var argsIdx = -1;
    var argsLen = arguments.length;
    var selector = arguments[argsLen - 1];
    if (isFunction(selector)) {
        argsLen = argsLen - 1;
    } else {
        selector = void 0;
    }
    args = new Array(argsLen);
    while (++argsIdx < argsLen) {
        args[argsIdx] = arguments[argsIdx];
    }
    return SetResponse.create(this, args, selector);
};

/**
 * Invokes a function in the JSON Graph.
 * @function
 * @param {Path} functionPath - the path to the function to invoke
 * @param {Array.<Object>} args - the arguments to pass to the function
 * @param {Array.<PathSet>} refPaths - the paths to retrieve from the JSON Graph References in the message returned from the function
 * @param {Array.<PathSet>} thisPaths - the paths to retrieve from function's this object after successful function execution
 * @returns {ModelResponse.<JSONEnvelope> - a JSONEnvelope contains the values returned from the function
 */
Model.prototype.call = function call() {
    var args;
    var argsIdx = -1;
    var argsLen = arguments.length;
    args = new Array(argsLen);
    while (++argsIdx < argsLen) {
        var arg = arguments[argsIdx];
        args[argsIdx] = arg;
        var argType = typeof arg;
        if (argsIdx > 1 && !Array.isArray(arg) ||
            argsIdx === 0 && !Array.isArray(arg) && argType !== "string" ||
            argsIdx === 1 && !Array.isArray(arg) && !isPrimitive(arg)) {
            /* eslint-disable no-loop-func */
            return new ModelResponse(function(o) {
                o.onError(new Error("Invalid argument"));
            });
            /* eslint-enable no-loop-func */
        }
    }

    return CallResponse.create(this, args);
};

/**
 * The invalidate method synchronously removes several {@link Path}s or {@link PathSet}s from a {@link Model} cache.
 * @function
 * @param {...PathSet} path - the  paths to remove from the {@link Model}'s cache.
 */
Model.prototype.invalidate = function invalidate() {
    var args;
    var argsIdx = -1;
    var argsLen = arguments.length;
    var selector = arguments[argsLen - 1];
    args = new Array(argsLen);
    while (++argsIdx < argsLen) {
        args[argsIdx] = pathSyntax.fromPath(arguments[argsIdx]);
        if (typeof args[argsIdx] !== "object") {
            throw new Error("Invalid argument");
        }
    }

    // creates the obs, subscribes and will throw the errors if encountered.
    InvalidateResponse.
        create(this, args, selector).
        subscribe(noOp, function(e) {
            throw e;
        });
};

/**
 * Returns a new {@link Model} bound to a location within the {@link JSONGraph}. The bound location is never a {@link Reference}: any {@link Reference}s encountered while resolving the bound {@link Path} are always replaced with the {@link Reference}s target value. For subsequent operations on the {@link Model}, all paths will be evaluated relative to the bound path. Deref allows you to:
 * - Expose only a fragment of the {@link JSONGraph} to components, rather than the entire graph
 * - Hide the location of a {@link JSONGraph} fragment from components
 * - Optimize for executing multiple operations and path looksup at/below the same location in the {@link JSONGraph}
 * @method
 * @param {Path} derefPath - the path to the object that the new Model should refer to
 * @param {...PathSet} relativePathsToPreload - paths (relative to the dereference path) to preload before Model is created
 * @return {Observable.<Model>} - an Observable stream with a single value, the dereferenced {@link Model}, or an empty stream if nothing is found at the path
 * @example
var model = new falcor.Model({
  cache: {
    users: [
      { $type: "ref", value: ["usersById", 32] }
    ],
    usersById: {
      32: {
	name: "Steve",
        surname: "McGuire"
      }
    }
  }
});
model.deref(["users", 0], "name").subscribe(function(userModel){
  console.log(userModel.getPath());
});

// prints ["usersById", 32] because userModel refers to target of reference at ["users", 0]
 */
Model.prototype.deref = require(6);

/**
 * Get data for a single {@link Path}.
 * @param {Path} path - the path to retrieve
 * @return {Observable.<*>} - the value for the path
 * @example
 var model = new falcor.Model({source: new falcor.HttpDataSource("/model.json") });

 model.
     getValue('user.name').
     subscribe(function(name) {
         console.log(name);
     });

 // The code above prints "Jim" to the console.
 */
Model.prototype.getValue = require(17);

/**
 * Set value for a single {@link Path}.
 * @param {Path} path - the path to set
 * @param {Object} value - the value to set
 * @return {Observable.<*>} - the value for the path
 * @example
 var model = new falcor.Model({source: new falcor.HttpDataSource("/model.json") });

 model.
     setValue('user.name', 'Jim').
     subscribe(function(name) {
         console.log(name);
     });

 // The code above prints "Jim" to the console.
 */
Model.prototype.setValue = require(80);

// TODO: Does not throw if given a PathSet rather than a Path, not sure if it should or not.
// TODO: Doc not accurate? I was able to invoke directly against the Model, perhaps because I don't have a data source?
// TODO: Not clear on what it means to "retrieve objects in addition to JSONGraph values"
/**
 * Synchronously retrieves a single path from the local {@link Model} only and will not retrieve missing paths from the {@link DataSource}. This method can only be invoked when the {@link Model} does not have a {@link DataSource} or from within a selector function. See {@link Model.prototype.get}. The getValueSync method differs from the asynchronous get methods (ex. get, getValues) in that it can be used to retrieve objects in addition to JSONGraph values.
 * @method
 * @private
 * @arg {Path} path - the path to retrieve
 * @return {*} - the value for the specified path
 */
Model.prototype._getValueSync = require(25);

Model.prototype._setValueSync = require(81);

Model.prototype._derefSync = require(7);

/**
 * Set the local cache to a {@link JSONGraph} fragment. This method can be a useful way of mocking a remote document, or restoring the local cache from a previously stored state.
 * @param {JSONGraph} jsonGraph - the {@link JSONGraph} fragment to use as the local cache
 */
Model.prototype.setCache = function modelSetCache(cacheOrJSONGraphEnvelope) {
    var cache = this._root.cache;
    if (cacheOrJSONGraphEnvelope !== cache) {
        var modelRoot = this._root;
        var boundPath = this._path;
        this._path = [];
        this._root.cache = {};
        if (typeof cache !== "undefined") {
            collectLru(modelRoot, modelRoot.expired, getSize(cache), 0);
        }
        if (isJSONGraphEnvelope(cacheOrJSONGraphEnvelope)) {
            setJSONGraphs(this, [cacheOrJSONGraphEnvelope]);
        } else if (isJSONEnvelope(cacheOrJSONGraphEnvelope)) {
            setCache(this, [cacheOrJSONGraphEnvelope]);
        } else if (isObject(cacheOrJSONGraphEnvelope)) {
            setCache(this, [{ json: cacheOrJSONGraphEnvelope }]);
        }
        this._path = boundPath;
    } else if (typeof cache === "undefined") {
        this._root.cache = {};
    }
    return this;
};

/**
 * Get the local {@link JSONGraph} cache. This method can be a useful to store the state of the cache.
 * @param {...Array.<PathSet>} [pathSets] - The path(s) to retrieve. If no paths are specified, the entire {@link JSONGraph} is returned.
 * @return {JSONGraph} all of the {@link JSONGraph} data in the {@link Model} cache.
 * @example
 // Storing the boxshot of the first 10 titles in the first 10 genreLists to local storage.
 localStorage.setItem('cache', JSON.stringify(model.getCache("genreLists[0...10][0...10].boxshot")));
 */
Model.prototype.getCache = function _getCache() {
    var paths = arraySlice(arguments);
    if (paths.length === 0) {
        return getCache(this._root.cache);
    }

    var result = [{}];
    var path = this._path;
    get.getWithPathsAsJSONGraph(this, paths, result);
    this._path = path;
    return result[0].jsonGraph;
};

/**
 * Retrieves a number which is incremented every single time a value is changed underneath the Model or the object at an optionally-provided Path beneath the Model.
 * @param {Path?} path - a path at which to retrieve the version number
 * @return {Number} a version number which changes whenever a value is changed underneath the Model or provided Path
 */
Model.prototype.getVersion = function getVersion(pathArg) {
    var path = pathArg && pathSyntax.fromPath(pathArg) || [];
    if (Array.isArray(path) === false) {
        throw new Error("Model#getVersion must be called with an Array path.");
    }
    if (this._path.length) {
        path = this._path.concat(path);
    }
    return this._getVersion(this, path);
};

Model.prototype._syncCheck = function syncCheck(name) {
    if (Boolean(this._source) && this._root.syncRefCount <= 0 && this._root.unsafeMode === false) {
        throw new Error("Model#" + name + " may only be called within the context of a request selector.");
    }
    return true;
};

/* eslint-disable guard-for-in */
Model.prototype._clone = function cloneModel(opts) {
    var clone = new Model(this);
    for (var key in opts) {
        var value = opts[key];
        if (value === "delete") {
            delete clone[key];
        } else {
            clone[key] = value;
        }
    }
    clone.setCache = void 0;
    return clone;
};
/* eslint-enable */

/**
 * Returns a clone of the {@link Model} that enables batching. Within the configured time period, paths for get operations are collected and sent to the {@link DataSource} in a batch. Batching can be more efficient if the {@link DataSource} access the network, potentially reducing the number of HTTP requests to the server.
 * @param {?Scheduler|number} schedulerOrDelay - Either a {@link Scheduler} that determines when to send a batch to the {@link DataSource}, or the number in milliseconds to collect a batch before sending to the {@link DataSource}. If this parameter is omitted, then batch collection ends at the end of the next tick.
 * @return {Model} a Model which schedules a batch of get requests to the DataSource.
 */
Model.prototype.batch = function batch(schedulerOrDelayArg) {
    var schedulerOrDelay = schedulerOrDelayArg;
    if (typeof schedulerOrDelay === "number") {
        schedulerOrDelay = new TimeoutScheduler(Math.round(Math.abs(schedulerOrDelay)));
    } else if (!schedulerOrDelay || !schedulerOrDelay.schedule) {
        schedulerOrDelay = new ASAPScheduler();
    }
    var clone = this._clone();
    clone._request = new RequestQueue(clone, schedulerOrDelay);

    return clone;
};

/**
 * Returns a clone of the {@link Model} that disables batching. This is the default mode. Each get operation will be executed on the {@link DataSource} separately.
 * @name unbatch
 * @memberof Model.prototype
 * @function
 * @return {Model} a {@link Model} that batches requests of the same type and sends them to the data source together
 */
Model.prototype.unbatch = function unbatch() {
    var clone = this._clone();
    clone._request = new RequestQueue(clone, new ImmediateScheduler());
    return clone;
};

/**
 * Returns a clone of the {@link Model} that treats errors as values. Errors will be reported in the same callback used to report data. Errors will appear as objects in responses, rather than being sent to the {@link Observable~onErrorCallback} callback of the {@link ModelResponse}.
 * @return {Model}
 */
Model.prototype.treatErrorsAsValues = function treatErrorsAsValues() {
    return this._clone({
        _treatErrorsAsValues: true
    });
};

/**
 * Adapts a Model to the {@link DataSource} interface.
 * @return {DataSource}
 * @example
var model =
    new falcor.Model({
        cache: {
            user: {
                name: "Steve",
                surname: "McGuire"
            }
        }
    }),
    proxyModel = new falcor.Model({ source: model.asDataSource() });

// Prints "Steve"
proxyModel.getValue("user.name").
    then(function(name) {
        console.log(name);
    });
 */
Model.prototype.asDataSource = function asDataSource() {
    return new ModelDataSourceAdapter(this);
};

Model.prototype._materialize = function materialize() {
    return this._clone({
        _materialized: true
    });
};

Model.prototype._dematerialize = function dematerialize() {
    return this._clone({
        _materialized: "delete"
    });
};

/**
 * Returns a clone of the {@link Model} that boxes values returning the wrapper ({@link Atom}, {@link Reference}, or {@link Error}), rather than the value inside it. This allows any metadata attached to the wrapper to be inspected.
 * @return {Model}
 */
Model.prototype.boxValues = function boxValues() {
    return this._clone({
        _boxed: true
    });
};

/**
 * Returns a clone of the {@link Model} that unboxes values, returning the value inside of the wrapper ({@link Atom}, {@link Reference}, or {@link Error}), rather than the wrapper itself. This is the default mode.
 * @return {Model}
 */
Model.prototype.unboxValues = function unboxValues() {
    return this._clone({
        _boxed: "delete"
    });
};

/**
 * Returns a clone of the {@link Model} that only uses the local {@link JSONGraph} and never uses a {@link DataSource} to retrieve missing paths.
 * @return {Model}
 */
Model.prototype.withoutDataSource = function withoutDataSource() {
    return this._clone({
        _source: "delete"
    });
};

Model.prototype.toJSON = function toJSON() {
    return {
        $type: "ref",
        value: this._path
    };
};

/**
 * Returns the {@link Path} to the object within the JSON Graph that this Model references.
 * @return {Path}
 * @example
var model = new falcor.Model({
  cache: {
    users: [
      { $type: "ref", value: ["usersById", 32] }
    ],
    usersById: {
      32: {
	name: "Steve",
        surname: "McGuire"
      }
    }
  }
});
model.deref(["users", 0], "name").subscribe(function(userModel){
  console.log(userModel.getPath());
});

// prints ["usersById", 32] because userModel refers to target of reference at ["users", 0]
 */
Model.prototype.getPath = function getPath() {
    return arrayClone(this._path);
};

Model.prototype._getBoundValue = require(14);
Model.prototype._getVersion = require(19);
Model.prototype._getValueSync = require(18);

Model.prototype._getPathValuesAsPathMap = get.getWithPathsAsPathMap;
Model.prototype._getPathValuesAsJSONG = get.getWithPathsAsJSONGraph;

Model.prototype._setPathValuesAsJSON = require(79);
Model.prototype._setPathValuesAsJSONG = require(79);
Model.prototype._setPathValuesAsPathMap = require(79);
Model.prototype._setPathValuesAsValues = require(79);

Model.prototype._setPathMapsAsJSON = require(78);
Model.prototype._setPathMapsAsJSONG = require(78);
Model.prototype._setPathMapsAsPathMap = require(78);
Model.prototype._setPathMapsAsValues = require(78);

Model.prototype._setJSONGsAsJSON = require(77);
Model.prototype._setJSONGsAsJSONG = require(77);
Model.prototype._setJSONGsAsPathMap = require(77);
Model.prototype._setJSONGsAsValues = require(77);

Model.prototype._setCache = require(78);

Model.prototype._invalidatePathValuesAsJSON = require(49);
Model.prototype._invalidatePathMapsAsJSON = require(48);

},{"100":100,"101":101,"103":103,"117":117,"131":131,"135":135,"14":14,"15":15,"17":17,"18":18,"19":19,"20":20,"25":25,"4":4,"48":48,"49":49,"5":5,"50":50,"56":56,"6":6,"62":62,"64":64,"65":65,"66":66,"7":7,"71":71,"72":72,"73":73,"74":74,"75":75,"76":76,"77":77,"78":78,"79":79,"80":80,"81":81,"82":82,"85":85,"89":89,"97":97,"99":99}],4:[function(require,module,exports){
function ModelDataSourceAdapter(model) {
    this._model = model._materialize().treatErrorsAsValues();
}

ModelDataSourceAdapter.prototype.get = function get(pathSets) {
    return this._model.get.apply(this._model, pathSets)._toJSONG();
};

ModelDataSourceAdapter.prototype.set = function set(jsongResponse) {
    return this._model.set(jsongResponse)._toJSONG();
};

ModelDataSourceAdapter.prototype.call = function call(path, args, suffixes, paths) {
    var params = [path, args, suffixes].concat(paths);
    return this._model.call.apply(this._model, params)._toJSONG();
};

module.exports = ModelDataSourceAdapter;

},{}],5:[function(require,module,exports){
var isFunction = require(97);
var hasOwn = require(92);
var ImmediateScheduler = require(75);

function ModelRoot(o) {

    var options = o || {};

    this.syncRefCount = 0;
    this.expired = options.expired || [];
    this.unsafeMode = options.unsafeMode || false;
    this.collectionScheduler = options.collectionScheduler || new ImmediateScheduler();
    this.cache = {};

    if (isFunction(options.comparator)) {
        this.comparator = options.comparator;
    }

    if (isFunction(options.errorSelector)) {
        this.errorSelector = options.errorSelector;
    }

    if (isFunction(options.onChange)) {
        this.onChange = options.onChange;
    }
}

ModelRoot.prototype.errorSelector = function errorSelector(x, y) {
    return y;
};
ModelRoot.prototype.comparator = function comparator(cacheNode, messageNode) {
    if (hasOwn(cacheNode, "value") && hasOwn(messageNode, "value")) {
        // They are the same only if the following fields are the same.
        return cacheNode.value === messageNode.value &&
            cacheNode.$type === messageNode.$type &&
            cacheNode.$expires === messageNode.$expires;
    }
    return cacheNode === messageNode;
};

module.exports = ModelRoot;

},{"75":75,"92":92,"97":97}],6:[function(require,module,exports){
var Rx = require(220);
var pathSyntax = require(135);

module.exports = function deref(boundPathArg) {

    var model = this;
    var pathsIndex = -1;
    var pathsCount = arguments.length - 1;
    var paths = new Array(pathsCount);

    var boundPath = pathSyntax.fromPath(boundPathArg);

    while (++pathsIndex < pathsCount) {
        paths[pathsIndex] = pathSyntax.fromPath(arguments[pathsIndex + 1]);
    }

    if (pathsCount === 0) {
        throw new Error("Model#deref requires at least one value path.");
    }

    return Rx.Observable.defer(function() {
        return derefSync(model, boundPath);
    }).
    flatMap(function(boundModel) {
        if (Boolean(boundModel)) {
            if (pathsCount > 0) {
                var ofBoundModel = Rx.Observable.of(boundModel);

                // Ensures that all the leaves are in the cache.
                return boundModel.get.
                    apply(boundModel, paths).

                    // Ensures that if only errors occur, then the concat
                    // will still run.
                    catch(Rx.Observable.empty()).

                    // Ensures that the last thing returned by this operation is
                    // the bound model.
                    concat(ofBoundModel).

                    // Plucks the last value from this stream, which should be
                    // the bound model.
                    last().

                    // Chooses the new deref or passes on the invalid model
                    // error.
                    flatMap(function getNextBoundModel() {

                        // TODO: Should we onError the error from derefSync?
                        return derefSync(model, boundPath);
                    }).

                    // The previous operation can undefine the cache, so we need
                    // to ensure that we don't return and undefined model.
                    filter(function(x) { return x; });
            }
            return Rx.Observable.return(boundModel);
        } else if (pathsCount > 0) {
            var modifiedPaths = paths.map(function(path) {
                return boundPath.concat(path);
            });

            // Fill the cache with the request.
            return model.
                get.apply(model, modifiedPaths).

                // We concat the deref sync operation afterwords.
                // Any errors will be forwarded onto the caller.
                concat(Rx.Observable.defer(function() {
                    return derefSync(model, boundPath);
                })).
                last().

                // 'x' has to exist.  Cannot be falsy.  Must be model.
                filter(function(x) { return x; });
        }
        return Rx.Observable.empty();
    });
};

function derefSync(model, boundPath) {
    var value;
    var errorHappened = false;
    try {
        ++model._root.syncRefCount;
        value = model._derefSync(boundPath);
    } catch (e) {
        value = e;
        errorHappened = true;
    } finally {
        --model._root.syncRefCount;
    }
    return errorHappened ?
        Rx.Observable.throw(value) :
        Rx.Observable.return(value);
}

},{"135":135,"220":220}],7:[function(require,module,exports){
var pathSyntax = require(135);
var getBoundValue = require(14);
var InvalidModelError = require(9);
var $atom = require(119);

module.exports = function derefSync(boundPathArg) {

    var boundPath = pathSyntax.fromPath(boundPathArg);

    if (!Array.isArray(boundPath)) {
        throw new Error("Model#derefSync must be called with an Array path.");
    }

    var boundValue = getBoundValue(this, this._path.concat(boundPath), false);

    var path = boundValue.path;
    var node = boundValue.value;
    var found = boundValue.found;

    // If the node is not found or the node is found but undefined is returned,
    // this happens when a reference is expired.
    if (!found || node === undefined ||
        node.$type === $atom && node.value === undefined) {
        return undefined;
    }

    if (node.$type) {
        throw new InvalidModelError();
    }

    return this._clone({ _path: path });
};

},{"119":119,"135":135,"14":14,"9":9}],8:[function(require,module,exports){
/**
 * When a bound model attempts to retrieve JSONGraph it should throw an
 * error.
 *
 * @private
 */
function BoundJSONGraphModelError() {
    this.message = BoundJSONGraphModelError.message;
    this.stack = (new Error()).stack;
}

// instanceof will be an error, but stack will be correct because its defined in the constructor.
BoundJSONGraphModelError.prototype = new Error();
BoundJSONGraphModelError.prototype.name = "BoundJSONGraphModelError";
BoundJSONGraphModelError.message =
    "It is not legal to use the JSON Graph " +
    "format from a bound Model. JSON Graph format" +
    " can only be used from a root model.";

module.exports = BoundJSONGraphModelError;

},{}],9:[function(require,module,exports){
var NAME = "InvalidModelError";
var MESSAGE = "The boundPath of the model is not valid since a value or error was found before the path end.";
/**
 * An InvalidModelError can only happen when a user binds, whether sync
 * or async to shorted value.  See the unit tests for examples.
 *
 * @param {String} message
 * @private
 */
function InvalidModelError(boundPath, shortedPath) {
    this.message = MESSAGE;
    this.stack = (new Error()).stack;
    this.boundPath = boundPath;
    this.shortedPath = shortedPath;
}

// instanceof will be an error, but stack will be correct because its defined in the constructor.
InvalidModelError.prototype = new Error();
InvalidModelError.prototype.name = NAME;
InvalidModelError.message = MESSAGE;

module.exports = InvalidModelError;

},{}],10:[function(require,module,exports){
var NAME = "InvalidSourceError";
/**
 * InvalidSourceError happens when a dataSource syncronously throws
 * an exception during a get/set/call operation.
 *
 * @param {Error} error - The error that was thrown.
 * @private
 */
function InvalidSourceError(error) {
    this.message = "An exception was thrown when making a request.";
    this.stack = (new Error()).stack;
    this.innerError = error;
}

// instanceof will be an error, but stack will be correct because its defined
// in the constructor.
InvalidSourceError.prototype = new Error();
InvalidSourceError.prototype.name = NAME;
InvalidSourceError.is = function(e) {
    return e && e.name === NAME;
};

module.exports = InvalidSourceError;

},{}],11:[function(require,module,exports){
var NAME = "MaxRetryExceededError";
/**
 * A request can only be retried up to a specified limit.  Once that
 * limit is exceeded, then an error will be thrown.
 *
 * @private
 */
function MaxRetryExceededError() {
    this.message = "The allowed number of retries have been exceeded.";
    this.stack = (new Error()).stack;
}

// instanceof will be an error, but stack will be correct because its defined
// in the constructor.
MaxRetryExceededError.prototype = new Error();
MaxRetryExceededError.prototype.name = NAME;
MaxRetryExceededError.is = function(e) {
    return e && e.name === NAME;
};

module.exports = MaxRetryExceededError;

},{}],12:[function(require,module,exports){
var hardLink = require(27);
var createHardlink = hardLink.create;
var onValue = require(23);
var isExpired = require(28);
var $ref = require(121);
var __context = require(34);
var promote = require(30).promote;

/* eslint-disable no-constant-condition */
function followReference(model, root, nodeArg, referenceContainerArg,
                         referenceArg, seed, isJSONG) {

    var node = nodeArg;
    var reference = referenceArg;
    var referenceContainer = referenceContainerArg;
    var depth = 0;
    var k, next;

    while (true) {
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
                if (type === $ref) {
                    if (isJSONG) {
                        onValue(model, next, seed, null, null, null,
                                reference, reference.length, isJSONG);
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
            node = void 0;
        }
        break;
    }


    if (depth < reference.length && node !== void 0) {
        var ref = [];
        for (var i = 0; i < depth; i++) {
            ref[i] = reference[i];
        }
        reference = ref;
    }

    return [node, reference];
}
/* eslint-enable */

module.exports = followReference;

},{"121":121,"23":23,"27":27,"28":28,"30":30,"34":34}],13:[function(require,module,exports){
var getCachePosition = require(16);
var InvalidModelError = require(9);
var BoundJSONGraphModelError = require(8);

module.exports = function get(walk, isJSONG) {
    return function innerGet(model, paths, seed) {
        var valueNode = seed[0];
        var results = {
            values: seed,
            optimizedPaths: []
        };
        var cache = model._root.cache;
        var boundPath = model._path;
        var currentCachePosition = cache;
        var optimizedPath, optimizedLength = boundPath.length;
        var i, len;
        var requestedPath = [];

        // If the model is bound, then get that cache position.
        if (optimizedLength) {

            // JSONGraph output cannot ever be bound or else it will
            // throw an error.
            if (isJSONG) {
                return {
                    criticalError: new BoundJSONGraphModelError()
                };
            }
            currentCachePosition = getCachePosition(model, boundPath);

            // If there was a short, then we 'throw an error' to the outside
            // calling function which will onError the observer.
            if (currentCachePosition.$type) {
                return {
                    criticalError: new InvalidModelError(boundPath, boundPath)
                };
            }

            // We need to get the new cache position and copy the bound
            // path.
            optimizedPath = [];
            for (i = 0; i < optimizedLength; ++i) {
                optimizedPath[i] = boundPath[i];
            }
        }

        // Update the optimized path if we
        else {
            optimizedPath = [];
            optimizedLength = 0;
        }

        for (i = 0, len = paths.length; i < len; i++) {
            walk(model, cache, currentCachePosition, paths[i], 0,
                 valueNode, results, requestedPath, optimizedPath,
                 optimizedLength, isJSONG);
        }
        return results;
    };
};

},{"16":16,"8":8,"9":9}],14:[function(require,module,exports){
var getValueSync = require(18);
var InvalidModelError = require(9);

module.exports = function getBoundValue(model, pathArg, materialized) {

    var path = pathArg;
    var boundPath = pathArg;
    var boxed, treatErrorsAsValues,
        value, shorted, found;

    boxed = model._boxed;
    materialized = model._materialized;
    treatErrorsAsValues = model._treatErrorsAsValues;

    model._boxed = true;
    model._materialized = materialized === undefined || materialized;
    model._treatErrorsAsValues = true;

    value = getValueSync(model, path.concat(null), true);

    model._boxed = boxed;
    model._materialized = materialized;
    model._treatErrorsAsValues = treatErrorsAsValues;

    path = value.optimizedPath;
    shorted = value.shorted;
    found = value.found;
    value = value.value;

    while (path.length && path[path.length - 1] === null) {
        path.pop();
    }

    if (found && shorted) {
        throw new InvalidModelError(boundPath, path);
    }

    return {
        path: path,
        value: value,
        shorted: shorted,
        found: found
    };
};

},{"18":18,"9":9}],15:[function(require,module,exports){
var $modelCreated = require(38);
var isInternalKey = require(98);

/**
 * decends and copies the cache.
 */
module.exports = function getCache(cache) {
    var out = {};
    _copyCache(cache, out);

    return out;
};

function cloneBoxedValue(boxedValue) {
    var clonedValue = {};

    var keys = Object.keys(boxedValue);
    var key;
    var i;
    var l;

    for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];

        if (!isInternalKey(key)) {
            clonedValue[key] = boxedValue[key];
        }
    }

    return clonedValue;
}

function _copyCache(node, out, fromKey) {
    // copy and return

    Object.
        keys(node).
        filter(function(k) {
            // Its not an internal key and the node has a value.  In the cache
            // there are 3 possibilities for values.
            // 1: A branch node.
            // 2: A $type-value node.
            // 3: undefined
            // We will strip out 3
            return !isInternalKey(k) && node[k];
        }).
        forEach(function(key) {
            var cacheNext = node[key];
            var outNext = out[key];

            if (!outNext) {
                outNext = out[key] = {};
            }

            // Paste the node into the out cache.
            if (cacheNext.$type) {
                var isObject = cacheNext.value && typeof cacheNext.value === "object";
                var isUserCreatedcacheNext = !node[$modelCreated];
                var value;
                if (isObject || isUserCreatedcacheNext) {
                    value = cloneBoxedValue(cacheNext);
                } else {
                    value = cacheNext.value;
                }

                out[key] = value;
                return;
            }

            _copyCache(cacheNext, outNext, key);
        });
}

},{"38":38,"98":98}],16:[function(require,module,exports){
/**
 * getCachePosition makes a fast walk to the bound value since all bound
 * paths are the most possible optimized path.
 *
 * @param {Model} model -
 * @param {Array} path -
 * @returns {Mixed} - undefined if there is nothing in this position.
 * @private
 */
module.exports = function getCachePosition(model, path) {
    var currentCachePosition = model._root.cache;
    var depth = -1;
    var maxDepth = path.length;

    // The loop is simple now, we follow the current cache position until
    //
    while (++depth < maxDepth &&
           currentCachePosition && !currentCachePosition.$type) {

        currentCachePosition = currentCachePosition[path[depth]];
    }

    return currentCachePosition;
};

},{}],17:[function(require,module,exports){
var ModelResponse = require(65);
var pathSyntax = require(135);

module.exports = function getValue(path) {
    var parsedPath = pathSyntax.fromPath(path);
    var pathIdx = 0;
    var pathLen = parsedPath.length;
    while (++pathIdx < pathLen) {
        if (typeof parsedPath[pathIdx] === "object") {
            /* eslint-disable no-loop-func */
            return new ModelResponse(function(o) {
                o.onError(new Error("Paths must be simple paths"));
            });
            /* eslint-enable no-loop-func */
        }
    }

    var self = this;
    return new ModelResponse(function(obs) {
        return self.get(parsedPath).subscribe(function(data) {
            var curr = data.json;
            var depth = -1;
            var length = parsedPath.length;

            while (curr && ++depth < length) {
                curr = curr[parsedPath[depth]];
            }
            obs.onNext(curr);
        }, function(err) {
            obs.onError(err);
        }, function() {
            obs.onCompleted();
        });
    });
};

},{"135":135,"65":65}],18:[function(require,module,exports){
var followReference = require(12);
var clone = require(26);
var isExpired = require(28);
var promote = require(30).promote;
var $ref = require(121);
var $atom = require(119);
var $error = require(120);

module.exports = function getValueSync(model, simplePath, noClone) {
    var root = model._root.cache;
    var len = simplePath.length;
    var optimizedPath = [];
    var shorted = false, shouldShort = false;
    var depth = 0;
    var key, i, next = root, curr = root, out = root, type, ref, refNode;
    var found = true;
    var expired = false;

    while (next && depth < len) {
        key = simplePath[depth++];
        if (key !== null) {
            next = curr[key];
            optimizedPath[optimizedPath.length] = key;
        }

        if (!next) {
            out = undefined;
            shorted = true;
            found = false;
            break;
        }

        type = next.$type;

        // A materialized item.  There is nothing to deref to.
        if (type === $atom && next.value === undefined) {
            out = undefined;
            found = false;
            shorted = depth < len;
            break;
        }

        // Up to the last key we follow references, ensure that they are not
        // expired either.
        if (depth < len) {
            if (type === $ref) {

                // If the reference is expired then we need to set expired to
                // true.
                if (isExpired(next)) {
                    expired = true;
                    out = undefined;
                    found = false;
                    break;
                }

                ref = followReference(model, root, root, next, next.value);
                refNode = ref[0];

                // The next node is also set to undefined because nothing
                // could be found, this reference points to nothing, so
                // nothing must be returned.
                if (!refNode) {
                    out = void 0;
                    next = void 0;
                    found = false;
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
    }

    if (depth < len && !expired) {
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
            out = void 0;
        } else {
            out = next;
        }

        for (i = depth; i < len; ++i) {
            if (simplePath[i] !== null) {
                optimizedPath[optimizedPath.length] = simplePath[i];
            }
        }
    }

    // promotes if not expired
    if (out && type) {
        if (isExpired(out)) {
            out = void 0;
        } else {
            promote(model, out);
        }
    }

    // if (out && out.$type === $error && !model._treatErrorsAsValues) {
    if (out && type === $error && !model._treatErrorsAsValues) {
        throw {
            path: depth === len ? simplePath : simplePath.slice(0, depth),
            value: out.value
        };
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
        optimizedPath: optimizedPath,
        found: found
    };
};

},{"119":119,"12":12,"120":120,"121":121,"26":26,"28":28,"30":30}],19:[function(require,module,exports){
var __version = require(47);

module.exports = function _getVersion(model, path) {
    // ultra fast clone for boxed values.
    var gen = model._getValueSync({
        _boxed: true,
        _root: model._root,
        _treatErrorsAsValues: model._treatErrorsAsValues
    }, path, true).value;
    var version = gen && gen[__version];
    return (version == null) ? -1 : version;
};

},{"47":47}],20:[function(require,module,exports){
var get = require(13);
var walkPath = require(32);

var getWithPathsAsPathMap = get(walkPath, false);
var getWithPathsAsJSONGraph = get(walkPath, true);

module.exports = {
    getValueSync: require(18),
    getBoundValue: require(14),
    getWithPathsAsPathMap: getWithPathsAsPathMap,
    getWithPathsAsJSONGraph: getWithPathsAsJSONGraph
};

},{"13":13,"14":14,"18":18,"32":32}],21:[function(require,module,exports){
var lru = require(30);
var clone = require(26);
var promote = lru.promote;

module.exports = function onError(model, node, depth,
                                  requestedPath, outerResults) {
    var value = node.value;
    if (!outerResults.errors) {
        outerResults.errors = [];
    }

    if (model._boxed) {
        value = clone(node);
    }
    outerResults.errors.push({
        path: requestedPath.slice(0, depth + 1),
        value: value
    });
    promote(model, node);
};

},{"26":26,"30":30}],22:[function(require,module,exports){
var support = require(31);
var fastCopy = support.fastCopy;

module.exports = function onMissing(model, path, depth,
                                    outerResults, requestedPath,
                                    optimizedPath, optimizedLength) {
    var pathSlice;
    if (!outerResults.requestedMissingPaths) {
        outerResults.requestedMissingPaths = [];
        outerResults.optimizedMissingPaths = [];
    }

    if (depth < path.length) {
        pathSlice = fastCopy(path, depth);
    } else {
        pathSlice = [];
    }

    concatAndInsertMissing(model, pathSlice, depth, requestedPath,
                           optimizedPath, optimizedLength, outerResults);
};

function concatAndInsertMissing(model, remainingPath, depth, requestedPath,
                                optimizedPath, optimizedLength, results) {

    // TODO: Performance.
    results.requestedMissingPaths.push(
        requestedPath.
            slice(0, depth).
            concat(remainingPath));

    results.optimizedMissingPaths.push(
        optimizedPath.slice(0, optimizedLength).concat(remainingPath));
}

},{"31":31}],23:[function(require,module,exports){
var lru = require(30);
var clone = require(26);
var promote = lru.promote;
var $ref = require(121);
var $atom = require(119);
var $error = require(120);
var $modelCreated = require(38);

module.exports = function onValue(model, node, seed, depth, outerResults,
                                  requestedPath, optimizedPath, optimizedLength,
                                  isJSONG, fromReference) {
    // Preload
    if (!seed) {
        return;
    }

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
    else if (node.$type === $ref || node.$type === $error) {
        if (isJSONG) {
            valueNode = clone(node);
        } else {
            valueNode = node.value;
        }
    }

    else if (isJSONG) {
        var isObject = node.value && typeof node.value === "object";
        var isUserCreatedNode = !node[$modelCreated];
        if (isObject || isUserCreatedNode) {
            valueNode = clone(node);
        } else {
            valueNode = node.value;
        }
    }

    else {
        valueNode = node.value;
    }

    if (outerResults) {
        outerResults.hasValue = true;
    }

    if (isJSONG) {
        curr = seed.jsonGraph;
        if (!curr) {
            curr = seed.jsonGraph = {};
            seed.paths = [];
        }
        for (i = 0, len = optimizedLength - 1; i < len; i++) {
            key = optimizedPath[i];

            if (!curr[key]) {
                curr[key] = {};
            }
            curr = curr[key];
        }

        // assign the last
        key = optimizedPath[i];

        // TODO: Special case? do string comparisons make big difference?
        curr[key] = materialized ? {$type: $atom} : valueNode;
        if (requestedPath) {
            seed.paths.push(requestedPath.slice(0, depth));
        }
    }

    // The output is pathMap and the depth is 0.  It is just a
    // value report it as the found JSON
    else if (depth === 0) {
        seed.json = valueNode;
    }

    // The output is pathMap but we need to build the pathMap before
    // reporting the value.
    else {
        curr = seed.json;
        if (!curr) {
            curr = seed.json = {};
        }
        for (i = 0; i < depth - 1; i++) {
            k = requestedPath[i];
            if (!curr[k]) {
                curr[k] = {};
            }
            prev = curr;
            prevK = k;
            curr = curr[k];
        }
        k = requestedPath[i];
        if (k !== null) {
            curr[k] = valueNode;
        } else {
            prev[prevK] = valueNode;
        }
    }
};

},{"119":119,"120":120,"121":121,"26":26,"30":30,"38":38}],24:[function(require,module,exports){
var isExpired = require(28);
var hardLink = require(27);
var lru = require(30);
var removeHardlink = hardLink.remove;
var splice = lru.splice;
var $error = require(120);
var onError = require(21);
var onValue = require(23);
var onMissing = require(22);
var isMaterialized = require(29);
var __invalidated = require(36);

/**
 * When we land on a valueType (or nothing) then we need to report it out to
 * the outerResults through errors, missing, or values.
 *
 * @private
 */
module.exports = function onValueType(
    model, node, path, depth, seed, outerResults,
    requestedPath, optimizedPath, optimizedLength, isJSONG, fromReference) {

    var currType = node && node.$type;
    var requiresMaterializedToReport = node && node.value === undefined;

    // There are is nothing here, ether report value, or report the value
    // that is missing.  If there is no type then report the missing value.
    if (!node || !currType) {
        if (isMaterialized(model)) {
            onValue(model, node, seed, depth, outerResults,
                    requestedPath, optimizedPath, optimizedLength,
                    isJSONG, fromReference);
        } else {
            onMissing(model, path, depth,
                      outerResults, requestedPath,
                      optimizedPath, optimizedLength);
        }
        return;
    }

    // If there are expired value, then report it as missing
    else if (isExpired(node)) {
        if (!node[__invalidated]) {
            splice(model, node);
            removeHardlink(node);
        }
        onMissing(model, path, depth,
                  outerResults, requestedPath,
                  optimizedPath, optimizedLength);
    }

    // If there is an error, then report it as a value if
    else if (currType === $error) {
        if (fromReference) {
            requestedPath[depth] = null;
        }
        if (isJSONG || model._treatErrorsAsValues) {
            onValue(model, node, seed, depth, outerResults, requestedPath,
                    optimizedPath, optimizedLength, isJSONG, fromReference);
        } else {
            onError(model, node, depth, requestedPath, outerResults);
        }
    }

    // Report the value
    else {
        if (fromReference) {
            requestedPath[depth] = null;
        }

        if (!requiresMaterializedToReport ||
            requiresMaterializedToReport && model._materialized) {

            onValue(model, node, seed, depth, outerResults, requestedPath,
                    optimizedPath, optimizedLength, isJSONG, fromReference);
        }
    }
};


},{"120":120,"21":21,"22":22,"23":23,"27":27,"28":28,"29":29,"30":30,"36":36}],25:[function(require,module,exports){
var pathSyntax = require(135);

module.exports = function getValueSync(pathArg) {
    var path = pathSyntax.fromPath(pathArg);
    if (Array.isArray(path) === false) {
        throw new Error("Model#getValueSync must be called with an Array path.");
    }
    if (this._path.length) {
        path = this._path.concat(path);
    }
    return this._syncCheck("getValueSync") && this._getValueSync(this, path).value;
};

},{"135":135}],26:[function(require,module,exports){
// Copies the node
var prefix = require(41);

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


},{"41":41}],27:[function(require,module,exports){
var __ref = require(44);
var __context = require(34);
var __refIndex = require(43);
var __refsLength = require(45);

function createHardlink(from, to) {

    // create a back reference
    var backRefs = to[__refsLength] || 0;
    to[__ref + backRefs] = from;
    to[__refsLength] = backRefs + 1;

    // create a hard reference
    from[__refIndex] = backRefs;
    from[__context] = to;
}

function removeHardlink(cacheObject) {
    var context = cacheObject[__context];
    if (context) {
        var idx = cacheObject[__refIndex];
        var len = context[__refsLength];

        while (idx < len) {
            context[__ref + idx] = context[__ref + idx + 1];
            ++idx;
        }

        context[__refsLength] = len - 1;
        cacheObject[__context] = void 0;
        cacheObject[__refIndex] = void 0;
    }
}

module.exports = {
    create: createHardlink,
    remove: removeHardlink
};

},{"34":34,"43":43,"44":44,"45":45}],28:[function(require,module,exports){
var now = require(107);
module.exports = function isExpired(node) {
    var $expires = node.$expires === void 0 && -1 || node.$expires;
    return $expires !== -1 && $expires !== 1 && ($expires === 0 || $expires < now());
};

},{"107":107}],29:[function(require,module,exports){
module.exports = function isMaterialized(model) {
    return model._materialized && !model._source;
};

},{}],30:[function(require,module,exports){
var __head = require(35);
var __tail = require(46);
var __next = require(39);
var __prev = require(42);
var __invalidated = require(36);

// [H] -> Next -> ... -> [T]
// [T] -> Prev -> ... -> [H]
function lruPromote(model, object) {
    var root = model._root;
    var head = root[__head];
    if (head === object) {
        return;
    }

    // The item always exist in the cache since to get anything in the
    // cache it first must go through set.
    var prev = object[__prev];
    var next = object[__next];
    if (next) {
        next[__prev] = prev;
    }
    if (prev) {
        prev[__next] = next;
    }
    object[__prev] = void 0;

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
    object[__prev] = void 0;

    if (object === root[__head]) {
        root[__head] = void 0;
    }
    if (object === root[__tail]) {
        root[__tail] = void 0;
    }
    object[__invalidated] = true;
    root.expired.push(object);
}

module.exports = {
    promote: lruPromote,
    splice: lruSplice
};

},{"35":35,"36":36,"39":39,"42":42,"46":46}],31:[function(require,module,exports){
function fastCopy(arr, iArg) {
    var a = [], len, j, i;
    for (j = 0, i = iArg || 0, len = arr.length; i < len; j++, i++) {
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

},{}],32:[function(require,module,exports){
var followReference = require(12);
var onValueType = require(24);
var isExpired = require(28);
var iterateKeySet = require(144).iterateKeySet;
var $ref = require(121);
var promote = require(30).promote;

module.exports = function walkPath(model, root, curr, path, depth, seed,
                                   outerResults, requestedPath,
                                   optimizedPathArg, optimizedLength, isJSONG,
                                   fromReferenceArg) {

    var fromReference = fromReferenceArg;
    var optimizedPath = optimizedPathArg;

    // If there is not a value in the current cache position or its a
    // value type, then we are at the end of the getWalk.
    if ((!curr || curr && curr.$type) || depth === path.length) {
        onValueType(model, curr, path, depth, seed, outerResults,
                requestedPath, optimizedPath, optimizedLength,
                isJSONG, fromReference);
        return;
    }

    var keySet, i;
    keySet = path[depth];

    var isKeySet = typeof keySet === "object";
    var nextDepth = depth + 1;
    var iteratorNote = false;
    var key = keySet;
    if (isKeySet) {
        iteratorNote = {};
        key = iterateKeySet(keySet, iteratorNote);
    }

    // The key can be undefined if there is an empty path.  An example of an
    // empty path is: [lolomo, [], summary]
    if (key === undefined && iteratorNote.done) {
        return;
    }

    // loop over every key over the keySet
    var optimizedLengthPlus1 = optimizedLength + 1;
    do {
        fromReference = false;

        var next;

        if (key === null) {
            next = curr;
        }
        else {
            next = curr[key];
            optimizedPath[optimizedLength] = key;
            requestedPath[depth] = key;
        }

        var nextOptimizedPath = optimizedPath;
        var nextOptimizedLength = optimizedLengthPlus1;

        // If there is the next position we need to consider references.
        if (next) {
            var nType = next.$type;
            var value = nType && next.value || next;

            // If next is a reference follow it.  If we are in JSONG mode,
            // report that value into the seed without passing the requested
            // path.  If a requested path is passed to onValueType then it
            // will add that path to the JSONGraph envelope under `paths`
            if (nextDepth < path.length && nType &&
                nType === $ref && !isExpired(next)) {
                if (isJSONG) {
                    onValueType(model, next, path, nextDepth, seed,
                                outerResults, null, optimizedPath,
                                nextOptimizedLength, isJSONG, fromReference);
                }

                // promote the reference so that it will not be cleaned out of
                // the cache when its heavily used.
                promote(model, next);
                var ref = followReference(model, root, root, next,
                                          value, seed, isJSONG);
                fromReference = true;
                next = ref[0];
                var refPath = ref[1];
                nextOptimizedPath = [];
                nextOptimizedLength = refPath.length;
                for (i = 0; i < nextOptimizedLength; ++i) {
                    nextOptimizedPath[i] = refPath[i];
                }
            }
        }

        // Recurse to the next level.
        walkPath(model, root, next, path, nextDepth, seed, outerResults,
                requestedPath, nextOptimizedPath, nextOptimizedLength,
                isJSONG, fromReference);

        // If the iteratorNote is not done, get the next key.
        if (iteratorNote && !iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }

    } while (iteratorNote && !iteratorNote.done);
};

},{"12":12,"121":121,"144":144,"24":24,"28":28,"30":30}],33:[function(require,module,exports){
"use strict";

function falcor(opts) {
    return new falcor.Model(opts);
}

if (typeof Promise === "function") {
    falcor.Promise = Promise;
} else {
    falcor.Promise = require(211);
}

module.exports = falcor;

falcor.Model = require(3);

},{"211":211,"3":3}],34:[function(require,module,exports){
module.exports = require(41) + "context";

},{"41":41}],35:[function(require,module,exports){
module.exports = require(41) + "head";

},{"41":41}],36:[function(require,module,exports){
module.exports = require(41) + "invalidated";

},{"41":41}],37:[function(require,module,exports){
module.exports = require(41) + "key";

},{"41":41}],38:[function(require,module,exports){
module.exports = "$modelCreated";

},{}],39:[function(require,module,exports){
module.exports = require(41) + "next";

},{"41":41}],40:[function(require,module,exports){
module.exports = require(41) + "parent";

},{"41":41}],41:[function(require,module,exports){
/**
 * http://en.wikipedia.org/wiki/Delimiter#ASCIIDelimitedText
 * record separator character.
 */
module.exports = String.fromCharCode(30);

},{}],42:[function(require,module,exports){
module.exports = require(41) + "prev";

},{"41":41}],43:[function(require,module,exports){
module.exports = require(41) + "ref-index";

},{"41":41}],44:[function(require,module,exports){
module.exports = require(41) + "ref";

},{"41":41}],45:[function(require,module,exports){
module.exports = require(41) + "refs-length";

},{"41":41}],46:[function(require,module,exports){
module.exports = require(41) + "tail";

},{"41":41}],47:[function(require,module,exports){
module.exports = require(41) + "version";

},{"41":41}],48:[function(require,module,exports){
var __key = require(37);
var __ref = require(44);
var __prefix = require(41);
var __parent = require(40);
var __context = require(34);
var __version = require(47);
var __refIndex = require(43);
var __refsLength = require(45);

var $ref = require(121);

var getBoundValue = require(14);

var promote = require(51);
var getSize = require(89);
var hasOwn = require(92);
var isObject = require(101);
var isExpired = require(96);
var isFunction = require(97);
var isPrimitive = require(103);
var expireNode = require(87);
var incrementVersion = require(93);
var updateNodeAncestors = require(116);
var removeNodeAndDescendants = require(110);

/**
 * Sets a list of PathMaps into a JSON Graph.
 * @function
 * @param {Object} model - the Model for which to insert the PathMaps.
 * @param {Array.<PathMapEnvelope>} pathMapEnvelopes - the a list of @PathMapEnvelopes to set.
 */

module.exports = function invalidatePathMaps(model, pathMapEnvelopes) {

    var modelRoot = model._root;
    var lru = modelRoot;
    var expired = modelRoot.expired;
    var version = incrementVersion();
    var comparator = modelRoot._comparator;
    var errorSelector = modelRoot._errorSelector;
    var bound = model._path;
    var cache = modelRoot.cache;
    var node = bound.length ? getBoundValue(model, bound).value : cache;
    var parent = node[__parent] || cache;
    var initialVersion = cache[__version];

    var pathMapIndex = -1;
    var pathMapCount = pathMapEnvelopes.length;

    while (++pathMapIndex < pathMapCount) {

        var pathMapEnvelope = pathMapEnvelopes[pathMapIndex];

        invalidatePathMap(
            pathMapEnvelope.json, 0, cache, parent, node,
            version, expired, lru, comparator, errorSelector
        );
    }

    var newVersion = cache[__version];
    var rootChangeHandler = modelRoot.onChange;

    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
        rootChangeHandler();
    }
};

function invalidatePathMap(pathMap, depth, root, parent, node, version, expired, lru, comparator, errorSelector) {

    if (isPrimitive(pathMap) || pathMap.$type) {
        return;
    }

    for (var key in pathMap) {
        if (key[0] !== __prefix && key[0] !== "$" && hasOwn(pathMap, key)) {
            var child = pathMap[key];
            var branch = isObject(child) && !child.$type;
            var results = invalidateNode(
                root, parent, node,
                key, child, branch, false,
                version, expired, lru, comparator, errorSelector
            );
            var nextNode = results[0];
            var nextParent = results[1];
            if (nextNode) {
                if (branch) {
                    invalidatePathMap(
                        child, depth + 1,
                        root, nextParent, nextNode,
                        version, expired, lru, comparator, errorSelector
                    );
                } else if (removeNodeAndDescendants(nextNode, nextParent, key, lru)) {
                    updateNodeAncestors(nextParent, getSize(nextNode), lru, version);
                }
            }
        }
    }
}

function invalidateReference(value, root, node, version, expired, lru, comparator, errorSelector) {

    if (isExpired(node)) {
        expireNode(node, expired, lru);
        return [undefined, root];
    }

    promote(lru, node);

    var container = node;
    var reference = node.value;
    var parent = root;

    node = node[__context];

    if (node != null) {
        parent = node[__parent] || root;
    } else {

        var index = 0;
        var count = reference.length - 1;

        parent = node = root;

        do {
            var key = reference[index];
            var branch = index < count;
            var results = invalidateNode(
                root, parent, node,
                key, value, branch, true,
                version, expired, lru, comparator, errorSelector
            );
            node = results[0];
            if (isPrimitive(node)) {
                return results;
            }
            parent = results[1];
        } while (index++ < count);

        if (container[__context] !== node) {
            var backRefs = node[__refsLength] || 0;
            node[__refsLength] = backRefs + 1;
            node[__ref + backRefs] = container;
            container[__context] = node;
            container[__refIndex] = backRefs;
        }
    }

    return [node, parent];
}

function invalidateNode(
    root, parent, node,
    key, value, branch, reference,
    version, expired, lru, comparator, errorSelector) {

    var type = node.$type;

    while (type === $ref) {

        var results = invalidateReference(value, root, node, version, expired, lru, comparator, errorSelector);

        node = results[0];

        if (isPrimitive(node)) {
            return results;
        }

        parent = results[1];
        type = node && node.$type;
    }

    if (type !== void 0) {
        return [node, parent];
    }

    if (key == null) {
        if (branch) {
            throw new Error("`null` is not allowed in branch key positions.");
        } else if (node) {
            key = node[__key];
        }
    } else {
        parent = node;
        node = parent[key];
    }

    return [node, parent];
}

},{"101":101,"103":103,"110":110,"116":116,"121":121,"14":14,"34":34,"37":37,"40":40,"41":41,"43":43,"44":44,"45":45,"47":47,"51":51,"87":87,"89":89,"92":92,"93":93,"96":96,"97":97}],49:[function(require,module,exports){
var __key = require(37);
var __ref = require(44);
var __parent = require(40);
var __context = require(34);
var __version = require(47);
var __refIndex = require(43);
var __refsLength = require(45);

var $ref = require(121);

var getBoundValue = require(14);

var promote = require(51);
var getSize = require(89);
var isExpired = require(96);
var isFunction = require(97);
var isPrimitive = require(103);
var expireNode = require(87);
var iterateKeySet = require(144).iterateKeySet;
var incrementVersion = require(93);
var updateNodeAncestors = require(116);
var removeNodeAndDescendants = require(110);

/**
 * Invalidates a list of Paths in a JSON Graph.
 * @function
 * @param {Object} model - the Model for which to insert the PathValues.
 * @param {Array.<PathValue>} paths - the PathValues to set.
 */

module.exports = function invalidatePathSets(model, paths) {

    var modelRoot = model._root;
    var lru = modelRoot;
    var expired = modelRoot.expired;
    var version = incrementVersion();
    var bound = model._path;
    var cache = modelRoot.cache;
    var node = bound.length ? getBoundValue(model, bound).value : cache;
    var parent = node[__parent] || cache;
    var initialVersion = cache[__version];

    var pathIndex = -1;
    var pathCount = paths.length;

    while (++pathIndex < pathCount) {

        var path = paths[pathIndex];

        invalidatePathSet(
            path, 0, cache, parent, node,
            version, expired, lru
        );
    }

    var newVersion = cache[__version];
    var rootChangeHandler = modelRoot.onChange;

    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
        rootChangeHandler();
    }
};

function invalidatePathSet(
    path, depth, root, parent, node,
    version, expired, lru) {

    var note = {};
    var branch = depth < path.length - 1;
    var keySet = path[depth];
    var key = iterateKeySet(keySet, note);

    do {
        var results = invalidateNode(
            root, parent, node,
            key, branch, false,
            version, expired, lru
        );
        var nextNode = results[0];
        var nextParent = results[1];
        if (nextNode) {
            if (branch) {
                invalidatePathSet(
                    path, depth + 1,
                    root, nextParent, nextNode,
                    version, expired, lru
                );
            } else if (removeNodeAndDescendants(nextNode, nextParent, key, lru)) {
                updateNodeAncestors(nextParent, getSize(nextNode), lru, version);
            }
        }
        key = iterateKeySet(keySet, note);
    } while (!note.done);
}

function invalidateReference(root, node, version, expired, lru) {

    if (isExpired(node)) {
        expireNode(node, expired, lru);
        return [undefined, root];
    }

    promote(lru, node);

    var container = node;
    var reference = node.value;
    var parent = root;

    node = node[__context];

    if (node != null) {
        parent = node[__parent] || root;
    } else {

        var index = 0;
        var count = reference.length - 1;

        parent = node = root;

        do {
            var key = reference[index];
            var branch = index < count;
            var results = invalidateNode(
                root, parent, node,
                key, branch, true,
                version, expired, lru
            );
            node = results[0];
            if (isPrimitive(node)) {
                return results;
            }
            parent = results[1];
        } while (index++ < count);

        if (container[__context] !== node) {
            var backRefs = node[__refsLength] || 0;
            node[__refsLength] = backRefs + 1;
            node[__ref + backRefs] = container;
            container[__context] = node;
            container[__refIndex] = backRefs;
        }
    }

    return [node, parent];
}

function invalidateNode(
    root, parent, node,
    key, branch, reference,
    version, expired, lru) {

    var type = node.$type;

    while (type === $ref) {

        var results = invalidateReference(root, node, version, expired, lru);

        node = results[0];

        if (isPrimitive(node)) {
            return results;
        }

        parent = results[1];
        type = node.$type;
    }

    if (type !== void 0) {
        return [node, parent];
    }

    if (key == null) {
        if (branch) {
            throw new Error("`null` is not allowed in branch key positions.");
        } else if (node) {
            key = node[__key];
        }
    } else {
        parent = node;
        node = parent[key];
    }

    return [node, parent];
}

},{"103":103,"110":110,"116":116,"121":121,"14":14,"144":144,"34":34,"37":37,"40":40,"43":43,"44":44,"45":45,"47":47,"51":51,"87":87,"89":89,"93":93,"96":96,"97":97}],50:[function(require,module,exports){
var __key = require(37);
var __parent = require(40);

var __head = require(35);
var __tail = require(46);
var __next = require(39);
var __prev = require(42);

var removeNode = require(109);
var updateNodeAncestors = require(116);

module.exports = function collect(lru, expired, totalArg, max, ratioArg, version) {

    var total = totalArg;
    var ratio = ratioArg;

    if (typeof ratio !== "number") {
        ratio = 0.75;
    }

    var shouldUpdate = typeof version === "number";
    var targetSize = max * ratio;
    var parent, node, size;

    node = expired.pop();

    while (node) {
        size = node.$size || 0;
        total -= size;
        if (shouldUpdate === true) {
            updateNodeAncestors(node, size, lru, version);
        } else if (parent = node[__parent]) {
            removeNode(node, parent, node[__key], lru);
        }
        node = expired.pop();
    }

    if (total >= max) {
        var prev = lru[__tail];
        node = prev;
        while ((total >= targetSize) && node) {
            prev = prev[__prev];
            size = node.$size || 0;
            total -= size;
            if (shouldUpdate === true) {
                updateNodeAncestors(node, size, lru, version);
            }
            node = prev;
        }

        lru[__tail] = lru[__prev] = node;
        if (node == null) {
            lru[__head] = lru[__next] = void 0;
        } else {
            node[__next] = void 0;
        }
    }
};

},{"109":109,"116":116,"35":35,"37":37,"39":39,"40":40,"42":42,"46":46}],51:[function(require,module,exports){
var $expiresNever = require(122);
var __head = require(35);
var __tail = require(46);
var __next = require(39);
var __prev = require(42);

var isObject = require(101);

module.exports = function lruPromote(root, node) {

    if (isObject(node) && (node.$expires !== $expiresNever)) {

        var head = root[__head],
            tail = root[__tail],
            next = node[__next],
            prev = node[__prev];

        if (node !== head) {

            if (next != null && typeof next === "object") {
                next[__prev] = prev;
            }

            if (prev != null && typeof prev === "object") {
                prev[__next] = next;
            }

            next = head;

            if (head != null && typeof head === "object") {
                head[__prev] = node;
            }

            root[__head] = root[__next] = head = node;
            head[__next] = next;
            head[__prev] = void 0;
        }

        if (tail == null || node === tail) {
            root[__tail] = root[__prev] = tail = prev || node;
        }
    }
    return node;
};

},{"101":101,"122":122,"35":35,"39":39,"42":42,"46":46}],52:[function(require,module,exports){
var __head = require(35);
var __tail = require(46);
var __next = require(39);
var __prev = require(42);

module.exports = function lruSplice(root, node) {

    var head = root[__head],
        tail = root[__tail],
        next = node[__next],
        prev = node[__prev];

    if (next != null && typeof next === "object") {
        next[__prev] = prev;
    }

    if (prev != null && typeof prev === "object") {
        prev[__next] = next;
    }

    if (node === head) {
        root[__head] = root[__next] = next;
    }

    if (node === tail) {
        root[__tail] = root[__prev] = prev;
    }

    node[__next] = node[__prev] = void 0;
    head = tail = next = prev = void 0;
};

},{"35":35,"39":39,"42":42,"46":46}],53:[function(require,module,exports){
var complement = require(60);
var flushGetRequest = require(61);
var REQUEST_ID = 0;
var GetRequestType = require(58).GetRequest;
var setJSONGraphs = require(77);
var setPathValues = require(79);
var $error = require(120);
var emptyArray = [];

/**
 * Creates a new GetRequest.  This GetRequest takes a scheduler and
 * the request queue.  Once the scheduler fires, all batched requests
 * will be sent to the server.  Upon request completion, the data is
 * merged back into the cache and all callbacks are notified.
 *
 * @param {Scheduler} scheduler -
 * @param {RequestQueueV2} requestQueue -
 */
var GetRequestV2 = function(scheduler, requestQueue) {
    this.sent = false;
    this.scheduled = false;
    this.requestQueue = requestQueue;
    this.id = ++REQUEST_ID;
    this.type = GetRequestType;

    this._scheduler = scheduler;
    this._pathMap = {};
    this._optimizedPaths = [];
    this._requestedPaths = [];
    this._callbacks = [];
    this._count = 0;
    this._disposable = null;
    this._collapsed = null;
    this._disposed = false;
};

GetRequestV2.prototype = {
    /**
     * batches the paths that are passed in.  Once the request is complete,
     * all callbacks will be called and the request will be removed from
     * parent queue.
     * @param {Array} requestedPaths -
     * @param {Array} optimizedPaths -
     * @param {Function} callback -
     */
    batch: function(requestedPaths, optimizedPaths, callback) {
        var self = this;
        var oPaths = self._optimizedPaths;
        var rPaths = self._requestedPaths;
        var callbacks = self._callbacks;
        var idx = oPaths.length;

        // If its not sent, simply add it to the requested paths
        // and callbacks.
        oPaths[idx] = optimizedPaths;
        rPaths[idx] = requestedPaths;
        callbacks[idx] = callback;
        ++self._count;

        // If it has not been scheduled, then schedule the action
        if (!self.scheduled) {
            self.scheduled = true;

            self._disposable = self._scheduler.schedule(function() {
                flushGetRequest(self, oPaths, function(err, data) {
                    self.requestQueue.removeRequest(self);
                    self._disposed = true;

                    // If there is at least one callback remaining, then
                    // callback the callbacks.
                    if (self._count) {
                        self._merge(rPaths, err, data);

                        // Call the callbacks.  The first one inserts all the
                        // data so that the rest do not have consider if their
                        // data is present or not.
                        for (var i = 0, len = callbacks.length; i < len; ++i) {
                            var fn = callbacks[i];
                            if (fn) {
                                fn(err, data);
                            }
                        }
                    }
                });
            });
        }

        // Disposes this batched request.  This does not mean that the
        // entire request has been disposed, but just the local one, if all
        // requests are disposed, then the outer disposable will be removed.
        return createDisposable(self, idx);
    },

    /**
     * Attempts to add paths to the outgoing request.  If there are added
     * paths then the request callback will be added to the callback list.
     *
     * @returns {Array} - the remaining paths in the request.
     */
    add: function(requested, optimized, callback) {
        // uses the length tree complement calculator.
        var self = this;
        var complementTuple = complement(requested, optimized, self._pathMap);
        var optimizedComplement;
        var requestedComplement;

        if (complementTuple) {
            requestedComplement = complementTuple[2];
            optimizedComplement = complementTuple[1];
        } else {
            requestedComplement = requested;
            optimizedComplement = optimized;
        }

        var inserted = false;
        var disposable = false;

        // If the out paths is less than the passed in paths, then there
        // has been an intersection and the complement has been returned.
        // Therefore, this can be deduped across requests.
        if (optimizedComplement.length < optimized.length) {
            inserted = true;
            var idx = self._callbacks.length;
            self._callbacks[idx] = callback;
            self._requestedPaths[idx] = complementTuple[0];
            self._optimizedPaths[idx] = [];
            ++self._count;

            disposable = createDisposable(self, idx);
        }

        return [inserted, requestedComplement, optimizedComplement, disposable];
    },

    /**
     * merges the response into the model"s cache.
     */
    _merge: function(requested, err, data) {
        var self = this;
        var model = self.requestQueue.model;
        var modelRoot = model._root;
        var errorSelector = modelRoot.errorSelector;
        var comparator = modelRoot.comparator;
        var boundPath = model._path;

        model._path = emptyArray;

        // flatten all the requested paths, adds them to the
        var nextPaths = flattenRequestedPaths(requested);

        // Insert errors in every requested position.
        if (err) {
            var error = err;

            // Converts errors to objects, a more friendly storage
            // of errors.
            if (error instanceof Error) {
                error = {
                    message: error.message
                };
            }

            // Not all errors are value $types.
            if (!error.$type) {
                error = {
                    $type: $error,
                    value: error
                };
            }

            var pathValues = nextPaths.map(function(x) {
                return {
                    path: x,
                    value: error
                };
            });
            setPathValues(model, pathValues, null, errorSelector, comparator);
        }

        // Insert the jsonGraph from the dataSource.
        else {
            setJSONGraphs(model, [{
                paths: nextPaths,
                jsonGraph: data.jsonGraph
            }], null, errorSelector, comparator);
        }

        // return the model"s boundPath
        model._path = boundPath;
    }
};

// Creates a more efficient closure of the things that are
// needed.  So the request and the idx.  Also prevents code
// duplication.
function createDisposable(request, idx) {
    var disposed = false;
    return function() {
        if (disposed || request._disposed) {
            return;
        }

        disposed = true;
        request._callbacks[idx] = null;
        request._optimizedPaths[idx] = [];
        request._requestedPaths[idx] = [];

        // If there are no more requests, then dispose all of the request.
        var count = --request._count;
        if (count === 0 && !request.sent) {
            request._disposable.dispose();
            request.requestQueue.removeRequest(request);
        }
    };
}

function flattenRequestedPaths(requested) {
    var out = [];
    var outLen = -1;
    for (var i = 0, len = requested.length; i < len; ++i) {
        var paths = requested[i];
        for (var j = 0, innerLen = paths.length; j < innerLen; ++j) {
            out[++outLen] = paths[j];
        }
    }
    return out;
}

module.exports = GetRequestV2;

},{"120":120,"58":58,"60":60,"61":61,"77":77,"79":79}],54:[function(require,module,exports){
var Rx = require(220);
var Observer = Rx.Observer;
var Observable = Rx.Observable;
var Disposable = Rx.Disposable;
var SerialDisposable = Rx.SerialDisposable;
var CompositeDisposable = Rx.CompositeDisposable;
var InvalidSourceError = require(10);

var falcorPathUtils = require(144);
var iterateKeySet = falcorPathUtils.iterateKeySet;

function Request() {
    this.length = 0;
    this.pending = false;
    this.pathmaps = [];
    Observable.call(this, this._subscribe);
}

Request.create = function create(queue, model, index) {
    var request = new this();
    request.queue = queue;
    request.model = model;
    request.index = index;
    return request;
};

Request.prototype = Object.create(Observable.prototype);

Request.prototype.constructor = Request;

Request.prototype.insertPath = function insertPathIntoRequest(path, union, parentArg, indexArg, countArg) {

    var index = indexArg || 0;
    var count = countArg || path.length - 1;
    var parent = parentArg || this.pathmaps[count + 1] || (this.pathmaps[count + 1] = Object.create(null));

    if (parent === void 0 || parent === null) {
        return false;
    }

    var key, node;
    var keySet = path[index];
    var iteratorNote = {};
    key = iterateKeySet(keySet, iteratorNote);

    // Determines if the key needs to go through permutation or not.
    // All object based keys require this.

    do {
        node = parent[key];
        if (index < count) {
            if (node == null) {
                if (union) {
                    return false;
                }
                node = parent[key] = Object.create(null);
            }
            if (this.insertPath(path, union, node, index + 1, count) === false) {
                return false;
            }
        } else {
            parent[key] = (node || 0) + 1;
            this.length += 1;
        }

        if (!iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }
    } while (!iteratorNote.done);

    return true;
};

/* eslint-disable guard-for-in */
Request.prototype.removePath = function removePathFromRequest(path, parentArg, indexArg, countArg) {

    var index = indexArg || 0;
    var count = countArg || path.length - 1;
    var parent = parentArg || this.pathmaps[count + 1];

    if (parent === void 0 || parent === null) {
        return true;
    }

    var key, node, deleted = 0;
    var keySet = path[index];
    var iteratorNote = {};

    key = iterateKeySet(keySet, iteratorNote);
    do {
        node = parent[key];
        if (node === void 0 || node === null) {
            continue;
        } else if (index < count) {
            deleted += this.removePath(path, node, index + 1, count);
            var emptyNodeKey = void 0;
            for (emptyNodeKey in node) {
                break;
            }
            if (emptyNodeKey === void 0) {
                delete parent[key];
            }
        } else {
            node = parent[key] = (node || 1) - 1;
            if (node === 0) {
                delete parent[key];
            }
            deleted += 1;
            this.length -= 1;
        }

        if (!iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }
    } while (!iteratorNote.done);

    return deleted;
};
/* eslint-enable */

Request.prototype.getSourceObserver = function getSourceObserver(observer) {
    var request = this;
    return Observer.create(
        function onNext(envelope) {
            envelope.jsonGraph = envelope.jsonGraph ||
                envelope.jsong ||
                envelope.values ||
                envelope.value;
            envelope.index = request.index;
            observer.onNext(envelope);
        },
        function onError(e) {
            observer.onError(e);
        },
        function onCompleted() {
            observer.onCompleted();
        });
};

Request.prototype._subscribe = function _subscribe(observer) {

    var request = this;
    var queue = this.queue;

    request.pending = true;

    var isDisposed = false;
    var sourceSubscription = new SerialDisposable();
    var queueDisposable = Disposable.create(function() {
        if (!isDisposed) {
            isDisposed = true;
            if (queue) {
                queue._remove(request);
            }
        }
    });

    var disposables = new CompositeDisposable(sourceSubscription, queueDisposable);

    try {
        sourceSubscription.setDisposable(
            this.model._source[this.method](this.getSourceArgs())
            .subscribe(this.getSourceObserver(observer)));
    } catch (e) {

        // We need a way to communicate out to the rest of the world that
        // this error needs to continue its propagation.
        throw new InvalidSourceError(e);
    }

    return disposables;
};

module.exports = Request;

},{"10":10,"144":144,"220":220}],55:[function(require,module,exports){

var SetRequest = require(59);

var prefix = require(41);
var getType = require(91);
var isObject = require(101);
var falcorPathUtils = require(144);

/* eslint-disable no-labels block-scoped-var */
function RequestQueue(model, scheduler) {
    this.total = 0;
    this.model = model;
    this.requests = [];
    this.scheduler = scheduler;
}

RequestQueue.prototype.set = function setRequest(jsonGraphEnvelope) {
    jsonGraphEnvelope.paths = falcorPathUtils.collapse(jsonGraphEnvelope.paths);
    return SetRequest.create(this.model, jsonGraphEnvelope);
};

RequestQueue.prototype._remove = function removeRequest(request) {
    var requests = this.requests;
    var index = requests.indexOf(request);
    if (index !== -1) {
        requests.splice(index, 1);
    }
};

RequestQueue.prototype.distributePaths = function distributePathsAcrossRequests(paths, requests, RequestType) {

    var model = this.model;
    var pathsIndex = -1;
    var pathsCount = paths.length;

    var requestIndex = -1;
    var requestCount = requests.length;
    var participatingRequests = [];
    var pendingRequest;
    var request;

    insertPath: while (++pathsIndex < pathsCount) {

        var path = paths[pathsIndex];

        requestIndex = -1;

        while (++requestIndex < requestCount) {
            request = requests[requestIndex];
            if (request.insertPath(path, request.pending)) {
                participatingRequests[requestIndex] = request;
                continue insertPath;
            }
        }

        if (!pendingRequest) {
            pendingRequest = RequestType.create(this, model, this.total++);
            requests[requestIndex] = pendingRequest;
            participatingRequests[requestCount++] = pendingRequest;
        }

        pendingRequest.insertPath(path, false);
    }

    var pathRequests = [];
    var pathRequestsIndex = -1;

    requestIndex = -1;

    while (++requestIndex < requestCount) {
        request = participatingRequests[requestIndex];
        if (request != null) {
            pathRequests[++pathRequestsIndex] = request;
        }
    }

    return pathRequests;
};

RequestQueue.prototype.mergeJSONGraphs = function mergeJSONGraphs(aggregate, response) {

    var depth = 0;
    var contexts = [];
    var messages = [];
    var keystack = [];
    var latestIndex = aggregate.index;
    var responseIndex = response.index;

    aggregate.index = Math.max(latestIndex, responseIndex);

    contexts[-1] = aggregate.jsonGraph || {};
    messages[-1] = response.jsonGraph || {};

    recursing: while (depth > -1) {

        var context = contexts[depth - 1];
        var message = messages[depth - 1];
        var keys = keystack[depth - 1] || (keystack[depth - 1] = Object.keys(message));

        while (keys.length > 0) {

            var key = keys.pop();

            if (key[0] === prefix) {
                continue;
            }

            if (context.hasOwnProperty(key)) {
                var node = context[key];
                var nodeType = getType(node);
                var messageNode = message[key];
                var messageType = getType(messageNode);
                if (isObject(node) && isObject(messageNode) && !nodeType && !messageType) {
                    contexts[depth] = node;
                    messages[depth] = messageNode;
                    depth += 1;
                    continue recursing;
                } else if (responseIndex > latestIndex) {
                    context[key] = messageNode;
                }
            } else {
                context[key] = message[key];
            }
        }

        depth -= 1;
    }

    return aggregate;
};
/* eslint-enable */

module.exports = RequestQueue;

},{"101":101,"144":144,"41":41,"59":59,"91":91}],56:[function(require,module,exports){
var RequestQueue = require(55);
var RequestQueueV2 = require(57);

function RequestQueueRx(model, scheduler) {
    this.model = model;
    this.scheduler = scheduler;
    this.requests = this._requests = [];
}

// RX MONKEY PATCH
RequestQueueRx.prototype.get = RequestQueueV2.prototype.get;
RequestQueueRx.prototype.removeRequest = RequestQueueV2.prototype.removeRequest;

RequestQueueRx.prototype.set = RequestQueue.prototype.set;
RequestQueueRx.prototype.call = RequestQueue.prototype.call;

module.exports = RequestQueueRx;

},{"55":55,"57":57}],57:[function(require,module,exports){
var RequestTypes = require(58);
var GetRequest = require(53);

/**
 * The request queue is responsible for queuing the operations to
 * the model"s dataSource.
 *
 * @param {Model} model -
 * @param {Scheduler} scheduler -
 */
function RequestQueueV2(model, scheduler) {
    this.model = model;
    this.scheduler = scheduler;
    this.requests = this._requests = [];
}

RequestQueueV2.prototype = {
    /**
     * Sets the scheduler, but will not affect any current requests.
     */
    setScheduler: function(scheduler) {
        this.scheduler = scheduler;
    },

    /**
     * Creates a get request to the dataSource.  Depending on the current
     * scheduler is how the getRequest will be flushed.
     * @param {Array} requestedPaths -
     * @param {Array} optimizedPaths -
     * @param {Function} cb -
     */
    get: function(requestedPaths, optimizedPaths, cb) {
        var self = this;
        var disposables = [];
        var count = 0;
        var requests = self._requests;
        var i, len;
        var oRemainingPaths = optimizedPaths;
        var rRemainingPaths = requestedPaths;
        var disposed = false;
        var request;

        for (i = 0, len = requests.length; i < len; ++i) {
            request = requests[i];
            if (request.type !== RequestTypes.GetRequest) {
                continue;
            }

            // The request has been sent, attempt to jump on the request
            // if possible.
            if (request.sent) {
                var results = request.add(
                    rRemainingPaths, oRemainingPaths, refCountCallback);

                // Checks to see if the results were successfully inserted
                // into the outgoing results.  Then our paths will be reduced
                // to the complement.
                if (results[0]) {
                    rRemainingPaths = results[1];
                    oRemainingPaths = results[2];
                    disposables[disposables.length] = results[3];
                    ++count;
                }
            }

            // If there is a non sent request, then we can batch and leave.
            else {
                request.batch(
                    rRemainingPaths, oRemainingPaths, refCountCallback);
                oRemainingPaths = [];
                rRemainingPaths = [];
                ++count;
            }

            // If there are no more remaining paths then exit the loop.
            if (!oRemainingPaths.length) {
                break;
            }
        }

        // After going through all the available requests if there are more
        // paths to process then a new request must be made.
        if (oRemainingPaths.length) {
            request = new GetRequest(self.scheduler, self);
            requests[requests.length] = request;
            ++count;
            var disposable = request.batch(
                rRemainingPaths, oRemainingPaths, refCountCallback);
            disposables[disposables.length] = disposable;
        }

        // This is a simple refCount callback.
        function refCountCallback() {
            if (disposed) {
                return;
            }

            --count;

            // If the count becomes 0, then its time to notify the
            // listener that the request is done.
            if (count === 0) {
                cb();
            }
        }

        // When disposing the request all of the outbound requests will be
        // disposed of.
        return function() {
            if (disposed || count === 0) {
                return;
            }

            disposed = true;
            var length = disposables.length;
            for (var idx = 0; idx < length; ++idx) {
                disposables[idx]();
            }
        };
    },

    /**
     * Removes the request from the request
     */
    removeRequest: function(request) {
        var requests = this._requests;
        var i = requests.length;
        while (--i >= 0) {
            if (requests[i].id === request.id) {
                requests.splice(i, 1);
                break;
            }
        }
    }
};

module.exports = RequestQueueV2;

},{"53":53,"58":58}],58:[function(require,module,exports){
module.exports = {
    GetRequest: "GET"
};

},{}],59:[function(require,module,exports){
var Rx = require(220);
var Observer = Rx.Observer;

var Request = require(54);

var arrayMap = require(84);

var setJSONGraphs = require(77);
var setPathValues = require(79);

var emptyArray = new Array(0);

function SetRequest() {
    Request.call(this);
}

SetRequest.create = function create(model, jsonGraphEnvelope) {
    var request = new SetRequest();
    request.model = model;
    request.jsonGraphEnvelope = jsonGraphEnvelope;
    return request;
};

SetRequest.prototype = Object.create(Request.prototype);
SetRequest.prototype.constructor = SetRequest;

SetRequest.prototype.method = "set";
SetRequest.prototype.insertPath = function() {
    return false;
};
SetRequest.prototype.removePath = function() {
    return 0;
};

SetRequest.prototype.getSourceArgs = function getSourceArgs() {
    return this.jsonGraphEnvelope;
};

SetRequest.prototype.getSourceObserver = function getSourceObserver(observer) {

    var model = this.model;
    var bound = model._path;
    var paths = this.jsonGraphEnvelope.paths;
    var modelRoot = model._root;
    var errorSelector = modelRoot.errorSelector;
    var comparator = modelRoot.comparator;

    return Request.prototype.getSourceObserver.call(this, Observer.create(
        function onNext(jsonGraphEnvelope) {

            model._path = emptyArray;

            var successfulPaths = setJSONGraphs(model, [{
                paths: paths,
                jsonGraph: jsonGraphEnvelope.jsonGraph
            }], null, errorSelector, comparator);

            jsonGraphEnvelope.paths = successfulPaths[1];

            model._path = bound;

            observer.onNext(jsonGraphEnvelope);
        },
        function onError(error) {

            model._path = emptyArray;

            setPathValues(model, arrayMap(paths, function(path) {
                return {
                    path: path,
                    value: error
                };
            }), null, errorSelector, comparator);

            model._path = bound;

            observer.onError(error);
        },
        function onCompleted() {
            observer.onCompleted();
        }
    ));
};

module.exports = SetRequest;

},{"220":220,"54":54,"77":77,"79":79,"84":84}],60:[function(require,module,exports){
var hasIntersection = require(144).hasIntersection;
var arraySlice = require(85);

/**
 * creates the complement of the requested and optimized paths
 * based on the provided tree.
 *
 * If there is no complement then this is just a glorified
 * array copy.
 */
module.exports = function complement(requested, optimized, tree) {
    var optimizedComplement = [];
    var requestedComplement = [];
    var requestedIntersection = [];
    var intersectionLength = -1, complementLength = -1;
    var intersectionFound = false;

    for (var i = 0, len = optimized.length; i < len; ++i) {
        // If this does not intersect then add it to the output.
        var path = optimized[i];
        var subTree = tree[path.length];

        // If there is no subtree to look into or there is no intersection.
        if (!subTree || !hasIntersection(subTree, path, 0)) {

            if (intersectionFound) {
                optimizedComplement[++complementLength] = path;
                requestedComplement[complementLength] = requested[i];
            }
        } else {
            // If there has been no intersection yet and
            // i is bigger than 0 (meaning we have had only complements)
            // then we need to update our complements to match the current
            // reality.
            if (!intersectionFound && i > 0) {
                requestedComplement = arraySlice(requested, 0, i);
                optimizedComplement = arraySlice(optimized, 0, i);
            }

            requestedIntersection[++intersectionLength] = requested[i];
            intersectionFound = true;
        }
    }

    if (!intersectionFound) {
        return null;
    }

    return [requestedIntersection, optimizedComplement, requestedComplement ];
};

},{"144":144,"85":85}],61:[function(require,module,exports){
var pathUtils = require(144);
var toTree = pathUtils.toTree;
var toPaths = pathUtils.toPaths;

/**
 * Flushes the current set of requests.  This will send the paths to the
 * dataSource.  * The results of the dataSource will be sent to callback which
 * should perform the zip of all callbacks.
 * @param {GetRequest} request -
 * @param {Array} listOfPaths -
 * @param {Function} callback -
 * @private
 */
module.exports = function flushGetRequest(request, listOfPaths, callback) {
    if (request._count === 0) {
        request.requestQueue.removeRequest(request);
        return;
    }

    request.sent = true;
    request.scheduled = false;

    // TODO: Move this to the collapse algorithm,
    // TODO: we should have a collapse that returns the paths and
    // TODO: the trees.

    // Take all the paths and add them to the pathMap by length.
    // Since its a list of paths
    var pathMap = request._pathMap;
    var listKeys = Object.keys(listOfPaths);
    var listIdx = 0, listLen = listKeys.length;
    for (; listIdx < listLen; ++listIdx) {
        var paths = listOfPaths[listIdx];
        for (var j = 0, pathLen = paths.length; j < pathLen; ++j) {
            var pathSet = paths[j];
            var len = pathSet.length;

            if (!pathMap[len]) {
                pathMap[len] = [pathSet];
            } else {
                var pathSetsByLength = pathMap[len];
                pathSetsByLength[pathSetsByLength.length] = pathSet;
            }
        }
    }

    // now that we have them all by length, convert each to a tree.
    var pathMapKeys = Object.keys(pathMap);
    var pathMapIdx = 0, pathMapLen = pathMapKeys.length;
    for (; pathMapIdx < pathMapLen; ++pathMapIdx) {
        var pathMapKey = pathMapKeys[pathMapIdx];
        pathMap[pathMapKey] = toTree(pathMap[pathMapKey]);
    }

    // Take the pathMapTree and create the collapsed paths and send those
    // off to the server.
    var collapsedPaths = request._collasped = toPaths(pathMap);
    var jsonGraphData;

    // Make the request.
    // You are probably wondering why this is not cancellable.  If a request
    // goes out, and all the requests are removed, the request should not be
    // cancelled.  The reasoning is that another request could come in, after
    // all callbacks have been removed and be deduped.  Might as well keep this
    // around until it comes back.  If at that point there are no requests then
    // we cancel at the callback above.
    request.
        requestQueue.
        model._source.
        get(collapsedPaths).
        subscribe(function(data) {
            jsonGraphData = data;
        }, function(err) {
            callback(err, jsonGraphData);
        }, function() {
            callback(null, jsonGraphData);
        });
};


},{"144":144}],62:[function(require,module,exports){
var Rx = require(220) && require(218);
var Observable = Rx.Observable;
var CompositeDisposable = Rx.CompositeDisposable;

var ModelResponse = require(65);
var InvalidSourceError = require(10);

var pathSyntax = require(135);

var $ref = require(121);

function CallResponse(subscribe) {
    Observable.call(this, subscribe || subscribeToResponse);
}

CallResponse.create = ModelResponse.create;

CallResponse.prototype = Object.create(Observable.prototype);
CallResponse.prototype.constructor = CallResponse;

CallResponse.prototype.invokeSourceRequest = function invokeSourceRequest(model) {
    return this;
};

CallResponse.prototype.ensureCollect = function ensureCollect(model) {
    return this;
};

CallResponse.prototype.initialize = function initializeResponse() {
    return this;
};

function toObservable(x) {
    return Rx.Observable.defer(function() {
        return x;
    });
}

function subscribeToResponse(observer) {

    var args = this.args;
    var model = this.model;

    var callPath = pathSyntax.fromPath(args[0]);
    var callArgs = args[1] || [];
    var suffixes = (args[2] || []).map(pathSyntax.fromPath);
    var extraPaths = (args[3] || []).map(pathSyntax.fromPath);

    var rootModel = model._clone({
        _path: []
    });
    var localRoot = rootModel.withoutDataSource();
    var boundPath = model._path;
    var boundCallPath = boundPath.concat(callPath);
    var boundThisPath = boundCallPath.slice(0, -1);

    var setCallValuesObs = toObservable(
            model.withoutDataSource().get(callPath)
        )
        .map(function(data) {
            var curr = data.json;
            var depth = -1;
            var length = callPath.length;

            while (curr && ++depth < length) {
                curr = curr[callPath[depth]];
            }
            var boundModel = rootModel._derefSync(boundThisPath).boxValues();
            return {
                model: boundModel,
                localFn: curr
            };
        })
        .flatMap(getLocalCallObs)
        .defaultIfEmpty(getRemoteCallObs(model._source))
        .mergeAll()
        .flatMap(setCallEnvelope);

    var disposables = new CompositeDisposable();

    disposables.add(setCallValuesObs.subscribe(function(envelope) {
            var paths = envelope.paths;
            var invalidated = envelope.invalidated;
            var innerObs = model.get.apply(model, paths);
            if (observer.outputFormat === "AsJSONG") {
                innerObs = toObservable(innerObs._toJSONG()).doAction(function(envelope2) {
                    envelope2.invalidated = invalidated;
                });
            }
            disposables.add(innerObs.subscribe(observer));
        },
        function(e) {
            observer.onError(e);
        }
    ));

    return disposables;

    function getLocalCallObs(tuple) {

        var localFn = tuple && tuple.localFn;

        if (typeof localFn === "function") {

            var localFnModel = tuple.model;
            var localThisPath = localFnModel._path;

            var remoteGetValues = localFn
                .apply(localFnModel, callArgs)
                .reduce(aggregateFnResults, {
                    values: [],
                    references: [],
                    invalidations: [],
                    localThisPath: localThisPath
                })
                .flatMap(setLocalValues)
                .flatMap(getRemoteValues);

            return Observable.return(remoteGetValues);
        }

        return Observable.empty();

        function aggregateFnResults(results, pathValue) {
            if (Boolean(pathValue.invalidated)) {
                results.invalidations.push(results.localThisPath.concat(pathValue.path));
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
            if (values.length > 0) {
                return toObservable(localRoot.set.
                        apply(localRoot, values).
                        _toJSONG())
                    .map(function(envelope) {
                        return {
                            results: results,
                            envelope: envelope
                        };
                    });
            } else {
                return Observable.return({
                    results: results,
                    envelope: {
                        jsonGraph: {},
                        paths: []
                    }
                });
            }
        }

        function getRemoteValues(tuple2) {

            var envelope = tuple2.envelope;
            var results = tuple2.results;
            var values = results.values;
            var references = results.references;
            var invalidations = results.invalidations;

            var rootValues = values.map(pluckPath).map(prependThisPath);
            var rootSuffixes = references.reduce(prependRefToSuffixes, []);
            var rootExtraPaths = extraPaths.map(prependThisPath);
            var rootPaths = rootSuffixes.concat(rootExtraPaths);
            var envelopeObs;

            if (rootPaths.length > 0) {
                envelopeObs = toObservable(rootModel.get.apply(rootModel, rootValues.concat(rootPaths))._toJSONG());
            } else {
                envelopeObs = Observable.return(envelope);
            }

            return envelopeObs.doAction(function(envelope2) {
                envelope2.invalidated = invalidations;
            });
        }

        function prependRefToSuffixes(refPaths, refPathValue) {
            var refPath = refPathValue.path;
            refPaths.push.apply(refPaths, suffixes.map(function(pathSuffix) {
                return refPath.concat(pathSuffix);
            }));
            return refPaths;
        }

        function pluckPath(pathValue) {
            return pathValue.path;
        }
    }

    function getRemoteCallObs(dataSource) {

        if (dataSource && typeof dataSource === "object") {
            return Rx.Observable.defer(function() {
                var obs;
                try {
                    obs = dataSource.call(boundCallPath, callArgs, suffixes, extraPaths);
                } catch (e) {
                    obs = Observable.throw(new InvalidSourceError(e));
                }
                return obs;
            }).map(invalidateLocalValues);
        }

        return Observable.empty();

        function invalidateLocalValues(envelope) {
            var invalidations = envelope.invalidated;
            if (invalidations && invalidations.length) {
                rootModel.invalidate.apply(rootModel, invalidations);
            }
            return envelope;
        }
    }

    function setCallEnvelope(envelope) {
        return toObservable(localRoot.set(envelope)).
            reduce(function(acc) { return acc; }, null).
            map(function() {
                return {
                    invalidated: envelope.invalidated,
                    paths: envelope.paths.map(function(path) {
                        return path.slice(boundPath.length);
                    })
                };
            });
    }

    function prependThisPath(path) {
        return boundThisPath.concat(path);
    }
}

module.exports = CallResponse;

},{"10":10,"121":121,"135":135,"218":218,"220":220,"65":65}],63:[function(require,module,exports){
var Rx = require(220);
var Observable = Rx.Observable;

var ModelResponse = require(65);

var pathSyntax = require(135);

var getSize = require(89);
var collectLru = require(50);

var arrayClone = require(82);
var __version = require(47);

var isArray = Array.isArray;
var isPathValue = require(102);
var isJSONEnvelope = require(99);
var isJSONGraphEnvelope = require(100);

function IdempotentResponse(subscribe) {
    Observable.call(this, subscribe);
}

IdempotentResponse.create = ModelResponse.create;

IdempotentResponse.prototype = Object.create(Observable.prototype);
IdempotentResponse.prototype.constructor = IdempotentResponse;

IdempotentResponse.prototype.subscribeCount = 0;
IdempotentResponse.prototype.subscribeLimit = 10;

IdempotentResponse.prototype.initialize = function initializeResponse() {

    var model = this.model;
    var outputFormat = this.outputFormat || "AsPathMap";
    var isProgressive = this.isProgressive;
    var values = [{}];

    var groups = [];
    var args = this.args;

    var group, groupType;

    var argIndex = -1;
    var argCount = args.length;

    // Validation of arguments have been moved out of this function.
    while (++argIndex < argCount) {
        var arg = args[argIndex];
        var argType;
        if (isArray(arg) || typeof arg === "string") {
            arg = pathSyntax.fromPath(arg);
            argType = "PathValues";
        } else if (isPathValue(arg)) {
            arg.path = pathSyntax.fromPath(arg.path);
            argType = "PathValues";
        } else if (isJSONGraphEnvelope(arg)) {
            argType = "JSONGs";
        } else if (isJSONEnvelope(arg)) {
            argType = "PathMaps";
        }
        if (groupType !== argType) {
            groupType = argType;
            group = {
                inputType: argType,
                arguments: []
            };
            groups.push(group);
            group.values = values;
        }

        group.arguments.push(arg);
    }

    this.boundPath = arrayClone(model._path);
    this.groups = groups;
    this.outputFormat = outputFormat;
    this.isProgressive = isProgressive;
    this.isCompleted = false;
    this.isMaster = model._source == null;
    this.values = values;

    return this;
};

IdempotentResponse.prototype.invokeSourceRequest = function invokeSourceRequest(model) {
    return this;
};

IdempotentResponse.prototype.ensureCollect = function ensureCollect(model) {
    var ensured = this.finally(function ensureCollect() {

        var modelRoot = model._root;
        var modelCache = modelRoot.cache;

        modelRoot.collectionScheduler.schedule(function collectThisPass() {
            collectLru(modelRoot, modelRoot.expired, getSize(modelCache),
                model._maxSize, model._collectRatio, modelCache[__version]);
        });
    });

    return new this.constructor(function(observer) {
        return ensured.subscribe(observer);
    });
};

module.exports = IdempotentResponse;

},{"100":100,"102":102,"135":135,"220":220,"47":47,"50":50,"65":65,"82":82,"89":89,"99":99}],64:[function(require,module,exports){
var Rx = require(220);
var Disposable = Rx.Disposable;

var IdempotentResponse = require(63);

function InvalidateResponse(subscribe) {
    IdempotentResponse.call(this, subscribe || subscribeToInvalidateResponse);
}

InvalidateResponse.create = IdempotentResponse.create;

InvalidateResponse.prototype = Object.create(IdempotentResponse.prototype);
InvalidateResponse.prototype.method = "invalidate";
InvalidateResponse.prototype.constructor = InvalidateResponse;

function subscribeToInvalidateResponse(observer) {

    var model = this.model;
    var method = this.method;

    var groups = this.groups;
    var groupIndex = -1;
    var groupCount = groups.length;

    while (++groupIndex < groupCount) {

        var group = groups[groupIndex];
        var inputType = group.inputType;
        var methodArgs = group.arguments;

        if (methodArgs.length > 0) {
            var operationName = "_" + method + inputType + "AsJSON";
            var operationFunc = model[operationName];
            operationFunc(model, methodArgs);
        }
    }

    observer.onCompleted();

    return Disposable.empty;
}

module.exports = InvalidateResponse;

},{"220":220,"63":63}],65:[function(require,module,exports){
var falcor = require(33);

var Rx = require(220) && require(218);
var Observable = Rx.Observable;

var arraySlice = require(85);

var noop = require(106);

var jsongMixin = { outputFormat: { value: "AsJSONG" } };
var progressiveMixin = { isProgressive: { value: true } };

/**
 * A ModelResponse is a container for the results of a get, set, or call operation performed on a Model. The ModelResponse provides methods which can be used to specify the output format of the data retrieved from a Model, as well as how that data is delivered.
 * @constructor ModelResponse
 * @augments Observable
*/
function ModelResponse(subscribe) {
    this._subscribe = subscribe;
}

ModelResponse.create = function create(model, args) {
    var response = new ModelResponse(subscribeToResponse);
    // TODO: make these private
    response.args = args;
    response.type = this;
    response.model = model;
    return response;
};

ModelResponse.prototype = Object.create(Observable.prototype);

ModelResponse.prototype.constructor = ModelResponse;

ModelResponse.prototype._mixin = function mixin() {
    var self = this;
    var mixins = arraySlice(arguments);
    return new self.constructor(function(observer) {
        return self.subscribe(mixins.reduce(function(proto, mixin2) {
            return Object.create(proto, mixin2);
        }, observer));
    });
};

/**
 * Converts the data format of the data in a JSONGraph Model response to a stream of path values.
 * @name toPathValues
 * @memberof ModelResponse.prototype
 * @function
 * @return ModelResponse.<PathValue>
 * @example
var model = new falcor.Model({
  cache: {
    user: {
      name: "Steve",
      surname: "McGuire"
    }
  }
});

model.
  get(["user",["name", "surname"]]).
  toPathValues().
  // this method will be called twice, once with the result of ["user", "name"]
  // and once with the result of ["user", "surname"]
  subscribe(function(pathValue){
    console.log(JSON.stringify(pathValue));
  });
// prints...
"{\"path\":[\"user\",\"name\"],\"value\":\"Steve\"}"
"{\"path\":[\"user\",\"surname\"],\"value\":\"McGuire\"}"
 */

ModelResponse.prototype._toJSONG = function toJSONG() {
    return this._mixin(jsongMixin);
};

/**
 * The progressively method breaks the response up into two parts: the data immediately available in the Model cache, and the data in the Model cache after the missing data has been retrieved from the DataSource.
 * The progressively method creates a ModelResponse that immediately returns the requested data that is available in the Model cache. If any requested paths are not available in the cache, the ModelResponse will send another JSON message with all of the requested data after it has been retrieved from the DataSource.
 * @name progressively
 * @memberof ModelResponse.prototype
 * @function
 * @return {ModelResponse.<JSONEnvelope>} the values found at the requested paths.
 * @example
var dataSource = (new falcor.Model({
  cache: {
    user: {
      name: "Steve",
      surname: "McGuire",
      age: 31
    }
  }
})).asDataSource();

var model = new falcor.Model({
  source: dataSource,
  cache: {
    user: {
      name: "Steve",
      surname: "McGuire"
    }
  }
});

model.
  get(["user",["name", "surname", "age"]]).
  progressively().
  // this callback will be invoked twice, once with the data in the
  // Model cache, and again with the additional data retrieved from the DataSource.
  subscribe(function(json){
    console.log(JSON.stringify(json,null,4));
  });

// prints...
// {
//     "json": {
//         "user": {
//             "name": "Steve",
//             "surname": "McGuire"
//         }
//     }
// }
// ...and then prints...
// {
//     "json": {
//         "user": {
//             "name": "Steve",
//             "surname": "McGuire",
//             "age": 31
//         }
//     }
// }
*/
ModelResponse.prototype.progressively = function progressively() {
    return this._mixin(progressiveMixin);
};

ModelResponse.prototype.subscribe = function subscribe(a, b, c) {
    var observer = a;
    if (!observer || typeof observer !== "object") {
        observer = { onNext: a || noop, onError: b || noop, onCompleted: c || noop };
    }
    var subscription = this._subscribe(observer);
    switch (typeof subscription) {
        case "function":
            return { dispose: subscription };
        case "object":
            return subscription || { dispose: noop };
        default:
            return { dispose: noop };
    }
};

ModelResponse.prototype.then = function then(onNext, onError) {
    var self = this;
    return new falcor.Promise(function(resolve, reject) {
        var value, rejected = false;
        self.toArray().subscribe(
            function(values) {
                if (values.length <= 1) {
                    value = values[0];
                } else {
                    value = values;
                }
            },
            function(errors) {
                rejected = true;
                reject(errors);
            },
            function() {
                if (rejected === false) {
                    resolve(value);
                }
            }
        );
    }).then(onNext, onError);
};

function subscribeToResponse(observer) {

    var model = this.model;
    var response = new this.type();

    response.model = model;
    response.args = this.args;
    response.outputFormat = observer.outputFormat || "AsPathMap";
    response.isProgressive = observer.isProgressive || false;
    response.subscribeCount = 0;
    response.subscribeLimit = observer.retryLimit || 10;

    return (response
        .initialize()
        .invokeSourceRequest(model)
        .ensureCollect(model)
        .subscribe(observer));
}

module.exports = ModelResponse;

},{"106":106,"218":218,"220":220,"33":33,"85":85}],66:[function(require,module,exports){
var Rx = require(220);
var Observable = Rx.Observable;
var Disposable = Rx.Disposable;
var GetResponse = require(68);
var IdempotentResponse = require(63);
var InvalidSourceError = require(10);

var arrayFlatMap = require(83);
var emptyArray = new Array(0);

function SetResponse(subscribe) {
    IdempotentResponse.call(this, subscribe || subscribeToSetResponse);
}

SetResponse.create = IdempotentResponse.create;

SetResponse.prototype = Object.create(IdempotentResponse.prototype);
SetResponse.prototype.method = "set";
SetResponse.prototype.constructor = SetResponse;

SetResponse.prototype.invokeSourceRequest = function invokeSourceRequest(model) {

    var source = this;
    var caught = this.catch(function setJSONGraph(results) {

        var requestObs;
        if (results && results.invokeSourceRequest === true) {

            var envelope = {};
            var boundPath = model._path;
            var optimizedPaths = results.optimizedPaths;

            model._path = emptyArray;
            model._getPathValuesAsJSONG(model._materialize().withoutDataSource(), optimizedPaths, [envelope]);
            model._path = boundPath;
            requestObs = model.
                _request.set(envelope).
                do(
                    function setResponseEnvelope(envelope2) {
                        source.isCompleted = optimizedPaths.length === envelope2.paths.length;
                    },
                    function setResponseError() {
                        source.isCompleted = true;
                    }
                ).
                materialize().
                flatMap(function(notification) {
                    if (notification.kind === "C") {
                        return Observable.empty();
                    }
                    if (notification.kind === "E") {
                        var ex = notification.exception;
                        if (InvalidSourceError.is(ex)) {
                            return Observable.throw(notification.exception);
                        }
                    }
                    return caught;
                });
        }
        else {
            requestObs = Observable.throw(results);
        }

        return requestObs;
    });

    return new this.constructor(function(observer) {
        return caught.subscribe(observer);
    });
};

function subscribeToSetResponse(observer) {

    if (this.isCompleted) {
        return subscribeToFollowupGet.call(this, observer);
    }

    return subscribeToLocalSet.call(this, observer);
}

function subscribeToLocalSet(observer) {

    if (this.subscribeCount++ > this.subscribeLimit) {
        observer.onError("Loop kill switch thrown.");
        return Disposable.empty;
    }

    var requestedPaths = [];
    var optimizedPaths = [];
    var model = this.model;
    var isMaster = this.isMaster;
    var modelRoot = model._root;
    var outputFormat = this.outputFormat;
    var errorSelector = modelRoot.errorSelector;

    var method = this.method;
    var groups = this.groups;
    var groupIndex = -1;
    var groupCount = groups.length;

    while (++groupIndex < groupCount) {

        var group = groups[groupIndex];
        var inputType = group.inputType;
        var methodArgs = group.arguments;

        if (methodArgs.length > 0) {

            var operationName = "_" + method + inputType + outputFormat;
            var operationFunc = model[operationName];
            var successfulPaths = operationFunc(model, methodArgs, null, errorSelector);

            optimizedPaths.push.apply(optimizedPaths, successfulPaths[1]);

            if (inputType === "PathValues") {
                requestedPaths.push.apply(requestedPaths, methodArgs.map(pluckPath));
            } else if (inputType === "JSONGs") {
                requestedPaths.push.apply(requestedPaths, arrayFlatMap(methodArgs, pluckEnvelopePaths));
            } else {
                requestedPaths.push.apply(requestedPaths, successfulPaths[0]);
            }
        }
    }

    this.requestedPaths = requestedPaths;

    if (isMaster) {
        this.isCompleted = true;
        return subscribeToFollowupGet.call(this, observer);
    } else {
        observer.onError({
            method: method,
            optimizedPaths: optimizedPaths,
            invokeSourceRequest: true
        });
    }
}

function subscribeToFollowupGet(observer) {
    var response = new GetResponse(this.model, this.requestedPaths);
    if (this.outputFormat === "AsJSONG") {
        response = response._toJSONG();
    }
    if (this.isProgressive) {
        response = response.progressively();
    }
    return response.subscribe(observer);
}

function pluckPath(pathValue) {
    return pathValue.path;
}

function pluckEnvelopePaths(jsonGraphEnvelope) {
    return jsonGraphEnvelope.paths;
}

module.exports = SetResponse;

},{"10":10,"220":220,"63":63,"68":68,"83":83}],67:[function(require,module,exports){
/**
 * Will allow for state tracking of the current disposable.  Also fulfills the
 * disposable interface.
 * @private
 */
var AssignableDisposable = function AssignableDisposable(disosableCallback) {
    this.disposed = false;
    this.currentDisposable = disosableCallback;
};


AssignableDisposable.prototype = {

    /**
     * Disposes of the current disposable.  This would be the getRequestCycle
     * disposable.
     */
    dispose: function dispose() {
        if (this.disposed || !this.currentDisposable) {
            return;
        }
        this.disposed = true;

        // If the current disposable fulfills the disposable interface or just
        // a disposable function.
        var currentDisposable = this.currentDisposable;
        if (currentDisposable.dispose) {
            currentDisposable.dispose();
        }

        else {
            currentDisposable();
        }
    }
};


module.exports = AssignableDisposable;

},{}],68:[function(require,module,exports){
var ModelResponse = require(65);
var checkCacheAndReport = require(69);
var getRequestCycle = require(70);
var empty = {dispose: function() {}};
var Observable = require(220).Observable;

/**
 * The get response.  It takes in a model and paths and starts
 * the request cycle.  It has been optimized for cache first requests
 * and closures.
 * @param {Model} model -
 * @param {Array} paths -
 * @private
 */
var GetResponse = module.exports = function GetResponse(model, paths,
                                                        isJSONGraph,
                                                        isProgressive) {
    this.model = model;
    this.currentRemainingPaths = paths;
    this.isJSONGraph = isJSONGraph || false;
    this.isProgressive = isProgressive || false;
};

GetResponse.prototype = Object.create(Observable.prototype);

// becomes a subscribable/thenable from ModelResponse.
GetResponse.prototype.subscribe = ModelResponse.prototype.subscribe;
GetResponse.prototype.then = ModelResponse.prototype.then;

/**
 * Makes the output of a get response JSONGraph instead of json.
 * @private
 */
GetResponse.prototype._toJSONG = function _toJSONGraph() {
    return new GetResponse(this.model, this.currentRemainingPaths,
                           true, this.isProgressive);
};

/**
 * Progressively responding to data in the cache instead of once the whole
 * operation is complete.
 * @public
 */
GetResponse.prototype.progressively = function progressively() {
    return new GetResponse(this.model, this.currentRemainingPaths,
                           this.isJSONGraph, true);
};

/**
 * purely for the purposes of closure creation other than the initial
 * prototype created closure.
 *
 * @private
 */
GetResponse.prototype._subscribe = function _subscribe(observer) {
    var seed = [{}];
    var errors = [];
    var isJSONG = observer.isJSONG = this.isJSONGraph;
    var isProgressive = this.isProgressive;
    var results = checkCacheAndReport(this.model, this.currentRemainingPaths,
                                      observer, isProgressive, isJSONG, seed,
                                      errors);

    // If there are no results, finish.
    if (!results) {
        return empty;
    }

    // Starts the async request cycle.
    return getRequestCycle(this, this.model, results,
                           observer, seed, errors, 1);
};

},{"220":220,"65":65,"69":69,"70":70}],69:[function(require,module,exports){
var gets = require(20);
var getWithPathsAsJSONGraph = gets.getWithPathsAsJSONGraph;
var getWithPathsAsPathMap = gets.getWithPathsAsPathMap;

/**
 * Checks cache for the paths and reports if in progressive mode.  If
 * there are missing paths then return the cache hit results.
 *
 * @param {Model} model - The model that the request was made with.
 * @param {Array} requestedMissingPaths -
 * @param {Boolean} progressive -
 * @param {Boolean} isJSONG -
 * @param {Function} onNext -
 * @param {Function} onError -
 * @param {Function} onCompleted -
 * @param {Object} seed - The state of the output
 * @private
 */
module.exports = function checkCacheAndReport(model, requestedPaths, observer,
                                              progressive, isJSONG, seed,
                                              errors) {

    // checks the cache for the data.
    var results;
    if (isJSONG) {
        results = getWithPathsAsJSONGraph(model, requestedPaths, seed);
    } else {
        results = getWithPathsAsPathMap(model, requestedPaths, seed);
    }

    // We must communicate critical errors from get that are critical
    // errors such as bound path is broken or this is a JSONGraph request
    // with a bound path.
    if (results.criticalError) {
        observer.onError(results.criticalError);
        return null;
    }

    // We are done when there are no missing paths or the model does not
    // have a dataSource to continue on fetching from.
    var hasValues = results.hasValue;
    var completed = !results.requestedMissingPaths || !model._source;
    var hasValueOverall = seed[0].json || seed[0].jsonGraph;

    // Copy the errors into the total errors array.
    if (results.errors) {
        var errs = results.errors;
        var errorsLength = errors.length;
        for (var i = 0, len = errs.length; i < len; ++i, ++errorsLength) {
            errors[errorsLength] = errs[i];
        }
    }

    // If there are values to report, then report.

    if (hasValues && progressive || hasValueOverall && completed) {
        // TODO: Remove the sync counter
        try {
            ++model._root.syncRefCount;
            observer.onNext(seed[0]);
        } catch(e) {
            throw e;
        } finally {
            --model._root.syncRefCount;
        }
    }

    // if there are missing paths, then lets return them.
    if (completed) {
        if (errors.length) {
            observer.onError(errors);
        } else {
            observer.onCompleted();
        }

        return null;
    }

    // Return the results object.
    return results;
};

},{"20":20}],70:[function(require,module,exports){
var checkCacheAndReport = require(69);
var MaxRetryExceededError = require(11);
var fastCat = require(31).fastCat;
var collectLru = require(50);
var getSize = require(89);
var AssignableDisposable = require(67);
var __version = require(47);

/**
 * The get request cycle for checking the cache and reporting
 * values.  If there are missing paths then the async request cycle to
 * the data source is performed until all paths are resolved or max
 * requests are made.
 * @param {GetResponse} getResponse -
 * @param {Model} model - The model that the request was made with.
 * @param {Object} results -
 * @param {Function} onNext -
 * @param {Function} onError -
 * @param {Function} onCompleted -
 * @param {Object} seedArg - The state of the output
 * @private
 */
module.exports = function getRequestCycle(getResponse, model, results, observer,
                                          seed, errors, count) {
    // we have exceeded the maximum retry limit.
    if (count === 10) {
        throw new MaxRetryExceededError();
    }

    var requestQueue = model._request;
    var requestedMissingPaths = results.requestedMissingPaths;
    var optimizedMissingPaths = results.optimizedMissingPaths;
    var disposable = new AssignableDisposable();

    // We need to prepend the bound path to all requested missing paths and
    // pass those into the requestQueue.
    var boundRequestedMissingPaths = [];
    var boundPath = model._path;
    if (boundPath.length) {
        for (var i = 0, len = requestedMissingPaths.length; i < len; ++i) {
            boundRequestedMissingPaths[i] =
                fastCat(boundPath, requestedMissingPaths[i]);
        }
    }

    // No bound path, no array copy and concat.
    else {
        boundRequestedMissingPaths = requestedMissingPaths;
    }

    var currentRequestDisposable = requestQueue.
        get(boundRequestedMissingPaths, optimizedMissingPaths, function() {


            // Once the request queue finishes, check the cache and bail if
            // we can.
            var nextResults = checkCacheAndReport(model, requestedMissingPaths,
                                                  observer,
                                                  getResponse.isProgressive,
                                                  getResponse.isJSONGraph,
                                                  seed, errors);

            // If there are missing paths coming back form checkCacheAndReport
            // the its reported from the core cache check method.
            if (nextResults) {

                // update the which disposable to use.
                disposable.currentDisposable =
                    getRequestCycle(getResponse, model, nextResults, observer,
                                    seed, errors, count + 1);
            }

            // We have finished.  Since we went to the dataSource, we must
            // collect on the cache.
            else {

                var modelRoot = model._root;
                var modelCache = modelRoot.cache;
                var currentVersion = modelCache[__version];

                collectLru(modelRoot, modelRoot.expired, getSize(modelCache),
                        model._maxSize, model._collectRatio, currentVersion);
            }

        });
    disposable.currentDisposable = currentRequestDisposable;
    return disposable;
};

},{"11":11,"31":31,"47":47,"50":50,"67":67,"69":69,"89":89}],71:[function(require,module,exports){
var GetResponse = require(68);

/**
 * Performs a get on the cache and if there are missing paths
 * then the request will be forwarded to the get request cycle.
 * @private
 */
module.exports = function getWithPaths(paths) {
    return new GetResponse(this, paths);
};

},{"68":68}],72:[function(require,module,exports){
var pathSyntax = require(135);
var ModelResponse = require(65);
var GET_VALID_INPUT = require(73);
var validateInput = require(117);
var GetResponse = require(68);

/**
 * Performs a get on the cache and if there are missing paths
 * then the request will be forwarded to the get request cycle.
 * @private
 */
module.exports = function get() {
    // Validates the input.  If the input is not pathSets or strings then we
    // will onError.
    var out = validateInput(arguments, GET_VALID_INPUT, "get");
    if (out !== true) {
        return new ModelResponse(function(o) {
            o.onError(out);
        });
    }

    var paths = pathSyntax.fromPathsOrPathValues(arguments);
    return new GetResponse(this, paths);
};

},{"117":117,"135":135,"65":65,"68":68,"73":73}],73:[function(require,module,exports){
module.exports = {
    path: true,
    pathSyntax: true
};

},{}],74:[function(require,module,exports){
var asap = require(124);
var Rx = require(220);
var Disposable = Rx.Disposable;

function ASAPScheduler() {}

ASAPScheduler.prototype.schedule = function schedule(action) {
    asap(action);
    return Disposable.empty;
};

ASAPScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
    var self = this;
    asap(function() {
        action(self, state);
    });
    return Disposable.empty;
};

module.exports = ASAPScheduler;

},{"124":124,"220":220}],75:[function(require,module,exports){
var Rx = require(220);
var Disposable = Rx.Disposable;

function ImmediateScheduler() {}

ImmediateScheduler.prototype.schedule = function schedule(action) {
    action();
    return Disposable.empty;
};

ImmediateScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
    action(this, state);
    return Disposable.empty;
};

module.exports = ImmediateScheduler;

},{"220":220}],76:[function(require,module,exports){
var Rx = require(220);
var Disposable = Rx.Disposable;

function TimeoutScheduler(delay) {
    this.delay = delay;
}

TimeoutScheduler.prototype.schedule = function schedule(action) {
    var id = setTimeout(action, this.delay);
    return Disposable.create(function() {
        if (id !== void 0) {
            clearTimeout(id);
            id = void 0;
        }
    });
};

TimeoutScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
    var self = this;
    var id = setTimeout(function() {
        action(self, state);
    }, this.delay);
    return Disposable.create(function() {
        if (id !== void 0) {
            clearTimeout(id);
            id = void 0;
        }
    });
};

module.exports = TimeoutScheduler;

},{"220":220}],77:[function(require,module,exports){
var __key = require(37);
var __ref = require(44);
var __context = require(34);
var __version = require(47);
var __refIndex = require(43);
var __refsLength = require(45);

var $ref = require(121);

var promote = require(51);
var isExpired = require(95);
var isFunction = require(97);
var isPrimitive = require(103);
var expireNode = require(87);
var iterateKeySet = require(144).iterateKeySet;
var incrementVersion = require(93);
var mergeJSONGraphNode = require(104);

/**
 * Merges a list of JSON Graph Envelopes into a cache JSON Graph.
 * @function
 * @param {Object} model - the Model for which to insert the PathValues.
 * @param {Array.<PathValue>} jsonGraphEnvelopes - the PathValues to set.
 * @return {Array.<Path>} - a list of optimized paths for the successfully set values.
 */

module.exports = function setJSONGraphs(model, jsonGraphEnvelopes, x, errorSelector, comparator) {

    var modelRoot = model._root;
    var lru = modelRoot;
    var expired = modelRoot.expired;
    var version = incrementVersion();
    var cache = modelRoot.cache;
    var initialVersion = cache[__version];

    var requestedPath = [];
    var optimizedPath = [];
    var requestedPaths = [];
    var optimizedPaths = [];
    var jsonGraphEnvelopeIndex = -1;
    var jsonGraphEnvelopeCount = jsonGraphEnvelopes.length;

    while (++jsonGraphEnvelopeIndex < jsonGraphEnvelopeCount) {

        var jsonGraphEnvelope = jsonGraphEnvelopes[jsonGraphEnvelopeIndex];
        var paths = jsonGraphEnvelope.paths;
        var jsonGraph = jsonGraphEnvelope.jsonGraph;

        var pathIndex = -1;
        var pathCount = paths.length;

        while (++pathIndex < pathCount) {

            var path = paths[pathIndex];
            optimizedPath.index = 0;

            setJSONGraphPathSet(
                path, 0,
                cache, cache, cache,
                jsonGraph, jsonGraph, jsonGraph,
                requestedPaths, optimizedPaths, requestedPath, optimizedPath,
                version, expired, lru, comparator, errorSelector
            );
        }
    }

    var newVersion = cache[__version];
    var rootChangeHandler = modelRoot.onChange;

    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
        rootChangeHandler();
    }

    return [requestedPaths, optimizedPaths];
};

/* eslint-disable no-constant-condition */
function setJSONGraphPathSet(
    path, depth, root, parent, node,
    messageRoot, messageParent, message,
    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var note = {};
    var branch = depth < path.length - 1;
    var keySet = path[depth];
    var key = iterateKeySet(keySet, note);
    var optimizedIndex = optimizedPath.index;

    do {

        requestedPath.depth = depth;

        var results = setNode(
            root, parent, node, messageRoot, messageParent, message,
            key, branch, false, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector
        );

        requestedPath[depth] = key;
        requestedPath.index = depth;
        optimizedPath[optimizedPath.index++] = key;
        var nextNode = results[0];
        var nextParent = results[1];
        if (nextNode) {
            if (branch) {
                setJSONGraphPathSet(
                    path, depth + 1, root, nextParent, nextNode,
                    messageRoot, results[3], results[2],
                    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
                    version, expired, lru, comparator, errorSelector
                );
            } else {
                promote(lru, nextNode);
                requestedPaths.push(requestedPath.slice(0, requestedPath.index + 1));
                optimizedPaths.push(optimizedPath.slice(0, optimizedPath.index));
            }
        }
        key = iterateKeySet(keySet, note);
        if (note.done) {
            break;
        }
        optimizedPath.index = optimizedIndex;
    } while (true);
}
/* eslint-enable */

function setReference(
    root, node, messageRoot, message, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var reference = node.value;
    optimizedPath.splice(0, optimizedPath.length);
    optimizedPath.push.apply(optimizedPath, reference);

    if (isExpired(node)) {
        optimizedPath.index = reference.length;
        expireNode(node, expired, lru);
        return [undefined, root, message, messageRoot];
    }

    promote(lru, node);

    var index = 0;
    var container = node;
    var count = reference.length - 1;
    var parent = node = root;
    var messageParent = message = messageRoot;

    do {
        var key = reference[index];
        var branch = index < count;
        var results = setNode(
            root, parent, node, messageRoot, messageParent, message,
            key, branch, true, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector
        );
        node = results[0];
        if (isPrimitive(node)) {
            optimizedPath.index = index;
            return results;
        }
        parent = results[1];
        message = results[2];
        messageParent = results[3];
    } while (index++ < count);

    optimizedPath.index = index;

    if (container[__context] !== node) {
        var backRefs = node[__refsLength] || 0;
        node[__refsLength] = backRefs + 1;
        node[__ref + backRefs] = container;
        container[__context] = node;
        container[__refIndex] = backRefs;
    }

    return [node, parent, message, messageParent];
}

function setNode(
    root, parent, node, messageRoot, messageParent, message,
    key, branch, reference, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var type = node.$type;

    while (type === $ref) {

        var results = setReference(
            root, node, messageRoot, message, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector
        );

        node = results[0];

        if (isPrimitive(node)) {
            return results;
        }

        parent = results[1];
        message = results[2];
        messageParent = results[3];
        type = node.$type;
    }

    if (type !== void 0) {
        return [node, parent, message, messageParent];
    }

    if (key == null) {
        if (branch) {
            throw new Error("`null` is not allowed in branch key positions.");
        } else if (node) {
            key = node[__key];
        }
    } else {
        parent = node;
        messageParent = message;
        node = parent[key];
        message = messageParent && messageParent[key];
    }

    node = mergeJSONGraphNode(
        parent, node, message, key, requestedPath, optimizedPath,
        version, expired, lru, comparator, errorSelector
    );

    return [node, parent, message, messageParent];
}

},{"103":103,"104":104,"121":121,"144":144,"34":34,"37":37,"43":43,"44":44,"45":45,"47":47,"51":51,"87":87,"93":93,"95":95,"97":97}],78:[function(require,module,exports){
var __key = require(37);
var __ref = require(44);
var __prefix = require(41);
var __parent = require(40);
var __context = require(34);
var __version = require(47);
var __refIndex = require(43);
var __refsLength = require(45);

var $ref = require(121);

var getBoundValue = require(14);

var isArray = Array.isArray;
var promote = require(51);
var hasOwn = require(92);
var isObject = require(101);
var isExpired = require(96);
var isFunction = require(97);
var isPrimitive = require(103);
var expireNode = require(87);
var incrementVersion = require(93);
var mergeValueOrInsertBranch = require(105);

/**
 * Sets a list of PathMaps into a JSON Graph.
 * @function
 * @param {Object} model - the Model for which to insert the PathMaps.
 * @param {Array.<PathMapEnvelope>} pathMapEnvelopes - the a list of @PathMapEnvelopes to set.
 * @return {Array.<Path>} - a list of optimized paths for the successfully set values.
 */

module.exports = function setPathMaps(model, pathMapEnvelopes, x, errorSelector, comparator) {

    var modelRoot = model._root;
    var lru = modelRoot;
    var expired = modelRoot.expired;
    var version = incrementVersion();
    var bound = model._path;
    var cache = modelRoot.cache;
    var node = bound.length ? getBoundValue(model, bound).value : cache;
    var parent = node[__parent] || cache;
    var initialVersion = cache[__version];

    var requestedPath = [];
    var requestedPaths = [];
    var optimizedPaths = [];
    var optimizedIndex = bound.length;
    var pathMapIndex = -1;
    var pathMapCount = pathMapEnvelopes.length;

    while (++pathMapIndex < pathMapCount) {

        var pathMapEnvelope = pathMapEnvelopes[pathMapIndex];
        var optimizedPath = bound.slice(0);
        optimizedPath.index = optimizedIndex;

        setPathMap(
            pathMapEnvelope.json, 0, cache, parent, node,
            requestedPaths, optimizedPaths, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector
        );
    }

    var newVersion = cache[__version];
    var rootChangeHandler = modelRoot.onChange;

    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
        rootChangeHandler();
    }

    return [requestedPaths, optimizedPaths];
};

/* eslint-disable no-constant-condition */
function setPathMap(
    pathMap, depth, root, parent, node,
    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var keys = getKeys(pathMap);

    if (keys && keys.length) {

        var keyIndex = 0;
        var keyCount = keys.length;
        var optimizedIndex = optimizedPath.index;

        do {
            var key = keys[keyIndex];
            var child = pathMap[key];
            var branch = isObject(child) && !child.$type;

            requestedPath.depth = depth;

            var results = setNode(
                root, parent, node, key, child,
                branch, false, requestedPath, optimizedPath,
                version, expired, lru, comparator, errorSelector
            );

            requestedPath[depth] = key;
            requestedPath.index = depth;

            optimizedPath[optimizedPath.index++] = key;
            var nextNode = results[0];
            var nextParent = results[1];
            if (nextNode) {
                if (branch) {
                    setPathMap(
                        child, depth + 1,
                        root, nextParent, nextNode,
                        requestedPaths, optimizedPaths, requestedPath, optimizedPath,
                        version, expired, lru, comparator, errorSelector
                    );
                } else {
                    promote(lru, nextNode);
                    requestedPaths.push(requestedPath.slice(0, requestedPath.index + 1));
                    optimizedPaths.push(optimizedPath.slice(0, optimizedPath.index));
                }
            }
            if (++keyIndex >= keyCount) {
                break;
            }
            optimizedPath.index = optimizedIndex;
        } while (true);
    }
}
/* eslint-enable */

function setReference(
    value, root, node, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var reference = node.value;
    optimizedPath.splice(0, optimizedPath.length);
    optimizedPath.push.apply(optimizedPath, reference);

    if (isExpired(node)) {
        optimizedPath.index = reference.length;
        expireNode(node, expired, lru);
        return [undefined, root];
    }

    promote(lru, node);

    var container = node;
    var parent = root;

    node = node[__context];

    if (node != null) {
        parent = node[__parent] || root;
        optimizedPath.index = reference.length;
    } else {

        var index = 0;
        var count = reference.length - 1;

        parent = node = root;

        do {
            var key = reference[index];
            var branch = index < count;
            var results = setNode(
                root, parent, node, key, value,
                branch, true, requestedPath, optimizedPath,
                version, expired, lru, comparator, errorSelector
            );
            node = results[0];
            if (isPrimitive(node)) {
                optimizedPath.index = index;
                return results;
            }
            parent = results[1];
        } while (index++ < count);

        optimizedPath.index = index;

        if (container[__context] !== node) {
            var backRefs = node[__refsLength] || 0;
            node[__refsLength] = backRefs + 1;
            node[__ref + backRefs] = container;
            container[__context] = node;
            container[__refIndex] = backRefs;
        }
    }

    return [node, parent];
}

function setNode(
    root, parent, node, key, value,
    branch, reference, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var type = node.$type;

    while (type === $ref) {

        var results = setReference(
            value, root, node, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector);

        node = results[0];

        if (isPrimitive(node)) {
            return results;
        }

        parent = results[1];
        type = node && node.$type;
    }

    if (type !== void 0) {
        return [node, parent];
    }

    if (key == null) {
        if (branch) {
            throw new Error("`null` is not allowed in branch key positions.");
        } else if (node) {
            key = node[__key];
        }
    } else {
        parent = node;
        node = parent[key];
    }

    node = mergeValueOrInsertBranch(
        parent, node, key, value,
        branch, reference, requestedPath, optimizedPath,
        version, expired, lru, comparator, errorSelector
    );

    return [node, parent];
}

function getKeys(pathMap) {

    if (isObject(pathMap) && !pathMap.$type) {
        var keys = [];
        var itr = 0;
        if (isArray(pathMap)) {
            keys[itr++] = "length";
        }
        for (var key in pathMap) {
            if (key[0] === __prefix || key[0] === "$" || !hasOwn(pathMap, key)) {
                continue;
            }
            keys[itr++] = key;
        }
        return keys;
    }

    return void 0;
}

},{"101":101,"103":103,"105":105,"121":121,"14":14,"34":34,"37":37,"40":40,"41":41,"43":43,"44":44,"45":45,"47":47,"51":51,"87":87,"92":92,"93":93,"96":96,"97":97}],79:[function(require,module,exports){
var __key = require(37);
var __ref = require(44);
var __parent = require(40);
var __context = require(34);
var __version = require(47);
var __refIndex = require(43);
var __refsLength = require(45);

var $ref = require(121);

var getBoundValue = require(14);

var promote = require(51);
var isExpired = require(96);
var isFunction = require(97);
var isPrimitive = require(103);
var expireNode = require(87);
var iterateKeySet = require(144).iterateKeySet;
var incrementVersion = require(93);
var mergeValueOrInsertBranch = require(105);

/**
 * Sets a list of PathValues into a JSON Graph.
 * @function
 * @param {Object} model - the Model for which to insert the PathValues.
 * @param {Array.<PathValue>} pathValues - the PathValues to set.
 * @return {Array.<Path>} - a list of optimized paths for the successfully set values.
 */

module.exports = function setPathValues(model, pathValues, x, errorSelector, comparator) {

    var modelRoot = model._root;
    var lru = modelRoot;
    var expired = modelRoot.expired;
    var version = incrementVersion();
    var bound = model._path;
    var cache = modelRoot.cache;
    var node = bound.length ? getBoundValue(model, bound).value : cache;
    var parent = node[__parent] || cache;
    var initialVersion = cache[__version];

    var requestedPath = [];
    var requestedPaths = [];
    var optimizedPaths = [];
    var optimizedIndex = bound.length;
    var pathValueIndex = -1;
    var pathValueCount = pathValues.length;

    while (++pathValueIndex < pathValueCount) {

        var pathValue = pathValues[pathValueIndex];
        var path = pathValue.path;
        var value = pathValue.value;
        var optimizedPath = bound.slice(0);
        optimizedPath.index = optimizedIndex;

        setPathSet(
            value, path, 0, cache, parent, node,
            requestedPaths, optimizedPaths, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector
        );
    }

    var newVersion = cache[__version];
    var rootChangeHandler = modelRoot.onChange;

    if (isFunction(rootChangeHandler) && initialVersion !== newVersion) {
        rootChangeHandler();
    }

    return [requestedPaths, optimizedPaths];
};

/* eslint-disable no-constant-condition */
function setPathSet(
    value, path, depth, root, parent, node,
    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var note = {};
    var branch = depth < path.length - 1;
    var keySet = path[depth];
    var key = iterateKeySet(keySet, note);
    var optimizedIndex = optimizedPath.index;

    do {

        requestedPath.depth = depth;

        var results = setNode(
            root, parent, node, key, value,
            branch, false, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector
        );
        requestedPath[depth] = key;
        requestedPath.index = depth;
        optimizedPath[optimizedPath.index++] = key;
        var nextNode = results[0];
        var nextParent = results[1];
        if (nextNode) {
            if (branch) {
                setPathSet(
                    value, path, depth + 1,
                    root, nextParent, nextNode,
                    requestedPaths, optimizedPaths, requestedPath, optimizedPath,
                    version, expired, lru, comparator, errorSelector
                );
            } else {
                promote(lru, nextNode);
                requestedPaths.push(requestedPath.slice(0, requestedPath.index + 1));
                optimizedPaths.push(optimizedPath.slice(0, optimizedPath.index));
            }
        }
        key = iterateKeySet(keySet, note);
        if (note.done) {
            break;
        }
        optimizedPath.index = optimizedIndex;
    } while (true);
}
/* eslint-enable */

function setReference(
    value, root, node, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var reference = node.value;
    optimizedPath.splice(0, optimizedPath.length);
    optimizedPath.push.apply(optimizedPath, reference);

    if (isExpired(node)) {
        optimizedPath.index = reference.length;
        expireNode(node, expired, lru);
        return [undefined, root];
    }

    promote(lru, node);

    var container = node;
    var parent = root;

    node = node[__context];

    if (node != null) {
        parent = node[__parent] || root;
        optimizedPath.index = reference.length;
    } else {

        var index = 0;
        var count = reference.length - 1;

        parent = node = root;

        do {
            var key = reference[index];
            var branch = index < count;
            var results = setNode(
                root, parent, node, key, value,
                branch, true, requestedPath, optimizedPath,
                version, expired, lru, comparator, errorSelector
            );
            node = results[0];
            if (isPrimitive(node)) {
                optimizedPath.index = index;
                return results;
            }
            parent = results[1];
        } while (index++ < count);

        optimizedPath.index = index;

        if (container[__context] !== node) {
            var backRefs = node[__refsLength] || 0;
            node[__refsLength] = backRefs + 1;
            node[__ref + backRefs] = container;
            container[__context] = node;
            container[__refIndex] = backRefs;
        }
    }

    return [node, parent];
}

function setNode(
    root, parent, node, key, value,
    branch, reference, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var type = node.$type;

    while (type === $ref) {

        var results = setReference(
            value, root, node, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector
        );

        node = results[0];

        if (isPrimitive(node)) {
            return results;
        }

        parent = results[1];
        type = node.$type;
    }

    if (type !== void 0) {
        return [node, parent];
    }

    if (key == null) {
        if (branch) {
            throw new Error("`null` is not allowed in branch key positions.");
        } else if (node) {
            key = node[__key];
        }
    } else {
        parent = node;
        node = parent[key];
    }

    node = mergeValueOrInsertBranch(
        parent, node, key, value,
        branch, reference, requestedPath, optimizedPath,
        version, expired, lru, comparator, errorSelector
    );

    return [node, parent];
}

},{"103":103,"105":105,"121":121,"14":14,"144":144,"34":34,"37":37,"40":40,"43":43,"44":44,"45":45,"47":47,"51":51,"87":87,"93":93,"96":96,"97":97}],80:[function(require,module,exports){
var jsong = require(131);
var ModelResponse = require(65);
var isPathValue = require(102);

module.exports = function setValue(pathArg, valueArg) {
    var value = isPathValue(pathArg) ? pathArg : jsong.pathValue(pathArg, valueArg);
    var pathIdx = 0;
    var path = value.path;
    var pathLen = path.length;
    while (++pathIdx < pathLen) {
        if (typeof path[pathIdx] === "object") {
            /* eslint-disable no-loop-func */
            return new ModelResponse(function(o) {
                o.onError(new Error("Paths must be simple paths"));
            });
            /* eslint-enable no-loop-func */
        }
    }
    var self = this;
    return new ModelResponse(function(obs) {
        return self._set(value).subscribe(function(data) {
            var curr = data.json;
            var depth = -1;
            var length = path.length;

            while (curr && ++depth < length) {
                curr = curr[path[depth]];
            }
            obs.onNext(curr);
        }, function(err) {
            obs.onError(err);
        }, function() {
            obs.onCompleted();
        });
    });
};

},{"102":102,"131":131,"65":65}],81:[function(require,module,exports){
var pathSyntax = require(135);
var isPathValue = require(102);
var setPathValues = require(79);

module.exports = function setValueSync(pathArg, valueArg, errorSelectorArg, comparatorArg) {

    var path = pathSyntax.fromPath(pathArg);
    var value = valueArg;
    var errorSelector = errorSelectorArg;
    var comparator = comparatorArg;

    if (isPathValue(path)) {
        comparator = errorSelector;
        errorSelector = value;
        value = path;
    } else {
        value = {
            path: path,
            value: value
        };
    }

    if (isPathValue(value) === false) {
        throw new Error("Model#setValueSync must be called with an Array path.");
    }

    if (typeof errorSelector !== "function") {
        errorSelector = this._root._errorSelector;
    }

    if (typeof comparator !== "function") {
        comparator = this._root._comparator;
    }

    if (this._syncCheck("setValueSync")) {
        setPathValues(this, [value]);
        return this._getValueSync(this, value.path).value;
    }
};

},{"102":102,"135":135,"79":79}],82:[function(require,module,exports){
module.exports = function arrayClone(array) {
    if (!array) {
        return array;
    }
    var i = -1;
    var n = array.length;
    var array2 = [];
    while (++i < n) {
        array2[i] = array[i];
    }
    return array2;
};

},{}],83:[function(require,module,exports){
module.exports = function arrayFlatMap(array, selector) {
    var index = -1;
    var i = -1;
    var n = array.length;
    var array2 = [];
    while (++i < n) {
        var array3 = selector(array[i], i, array);
        var j = -1;
        var k = array3.length;
        while (++j < k) {
            array2[++index] = array3[j];
        }
    }
    return array2;
};

},{}],84:[function(require,module,exports){
module.exports = function arrayMap(array, selector) {
    var i = -1;
    var n = array.length;
    var array2 = new Array(n);
    while (++i < n) {
        array2[i] = selector(array[i], i, array);
    }
    return array2;
};

},{}],85:[function(require,module,exports){
module.exports = function arraySlice(array, indexArg, endArg) {
    var index = indexArg || 0;
    var i = -1;
    var n = array.length - index;

    if (n < 0) {
        n = 0;
    }

    if (endArg > 0 && n > endArg) {
        n = endArg;
    }

    var array2 = new Array(n);
    while (++i < n) {
        array2[i] = array[i + index];
    }
    return array2;
};

},{}],86:[function(require,module,exports){
var prefix = require(41);
var hasOwn = require(92);
var isArray = Array.isArray;
var isObject = require(101);

module.exports = function clone(value) {
    var dest = value;
    if (isObject(dest)) {
        dest = isArray(value) ? [] : {};
        var src = value;
        for (var key in src) {
            if (key[0] === prefix || !hasOwn(src, key)) {
                continue;
            }
            dest[key] = src[key];
        }
    }
    return dest;
};

},{"101":101,"41":41,"92":92}],87:[function(require,module,exports){
var splice = require(52);
var __invalidated = require(36);

module.exports = function expireNode(node, expired, lru) {
    if (!node[__invalidated]) {
        node[__invalidated] = true;
        expired.push(node);
        splice(lru, node);
    }
    return node;
};

},{"36":36,"52":52}],88:[function(require,module,exports){
var isObject = require(101);
module.exports = function getSize(node) {
    return isObject(node) && node.$expires || undefined;
};

},{"101":101}],89:[function(require,module,exports){
var isObject = require(101);
module.exports = function getSize(node) {
    return isObject(node) && node.$size || 0;
};

},{"101":101}],90:[function(require,module,exports){
var isObject = require(101);
module.exports = function getTimestamp(node) {
    return isObject(node) && node.$timestamp || undefined;
};

},{"101":101}],91:[function(require,module,exports){
var isObject = require(101);

module.exports = function getType(node, anyType) {
    var type = isObject(node) && node.$type || void 0;
    if (anyType && type) {
        return "branch";
    }
    return type;
};

},{"101":101}],92:[function(require,module,exports){
var isObject = require(101);
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function(obj, prop) {
  return isObject(obj) && hasOwn.call(obj, prop);
};

},{"101":101}],93:[function(require,module,exports){
var version = 1;
module.exports = function incrementVersion() {
    return version++;
};

},{}],94:[function(require,module,exports){
var __key = require(37);
var __parent = require(40);
var __version = require(47);

module.exports = function insertNode(node, parent, key, version) {
    node[__key] = key;
    node[__parent] = parent;
    node[__version] = version;
    parent[key] = node;
    return node;
};

},{"37":37,"40":40,"47":47}],95:[function(require,module,exports){
var now = require(107);
var $now = require(123);
var $never = require(122);

module.exports = function isAlreadyExpired(node) {
    var exp = node.$expires;
    return (exp != null) && (
        exp !== $never) && (
        exp !== $now) && (
        exp < now());
};

},{"107":107,"122":122,"123":123}],96:[function(require,module,exports){
var now = require(107);
var $now = require(123);
var $never = require(122);

module.exports = function isExpired(node) {
    var exp = node.$expires;
    return (exp != null) && (
        exp !== $never ) && (
        exp === $now || exp < now());
};

},{"107":107,"122":122,"123":123}],97:[function(require,module,exports){
var functionTypeof = "function";

module.exports = function isFunction(func) {
    return Boolean(func) && typeof func === functionTypeof;
};

},{}],98:[function(require,module,exports){
var prefix = require(41);

/**
 * Determined if the key passed in is an internal key.
 *
 * @param {String} x The key
 * @private
 * @returns {Boolean}
 */
module.exports = function isInternalKey(x) {
    return (x === "$size") || (x && (x.charAt(0) === prefix));
};

},{"41":41}],99:[function(require,module,exports){
var isObject = require(101);

module.exports = function isJSONEnvelope(envelope) {
    return isObject(envelope) && ("json" in envelope);
};

},{"101":101}],100:[function(require,module,exports){
var isArray = Array.isArray;
var isObject = require(101);

module.exports = function isJSONGraphEnvelope(envelope) {
    return isObject(envelope) && isArray(envelope.paths) && (
        isObject(envelope.jsonGraph) ||
        isObject(envelope.jsong) ||
        isObject(envelope.json) ||
        isObject(envelope.values) ||
        isObject(envelope.value)
    );
};

},{"101":101}],101:[function(require,module,exports){
var objTypeof = "object";
module.exports = function isObject(value) {
    return value !== null && typeof value === objTypeof;
};

},{}],102:[function(require,module,exports){
var isArray = Array.isArray;
var isObject = require(101);

module.exports = function isPathValue(pathValue) {
    return isObject(pathValue) && (
        isArray(pathValue.path) || (
            typeof pathValue.path === "string"
        ));
};

},{"101":101}],103:[function(require,module,exports){
var objTypeof = "object";
module.exports = function isPrimitive(value) {
    return value == null || typeof value !== objTypeof;
};

},{}],104:[function(require,module,exports){
var __key = require(37);
var __parent = require(40);

var $ref = require(121);
var $error = require(120);
var getSize = require(89);
var getTimestamp = require(90);
var isObject = require(101);
var isExpired = require(96);
var isFunction = require(97);

var promote = require(51);
var wrapNode = require(118);
var insertNode = require(94);
var expireNode = require(87);
var replaceNode = require(111);
var updateNodeAncestors = require(116);
var reconstructPath = require(108);

module.exports = function mergeJSONGraphNode(
    parent, node, message, key, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var sizeOffset;

    var cType, mType,
        cIsObject, mIsObject,
        cTimestamp, mTimestamp;

    // If the cache and message are the same, we can probably return early:
    // - If they're both nullsy,
    //   - If null then the node needs to be wrapped in an atom and inserted.
    //     This happens from whole branch merging when a leaf is just a null value
    //     instead of being wrapped in an atom.
    //   - If undefined then return null (previous behavior).
    // - If they're both branches, return the branch.
    // - If they're both edges, continue below.
    if (node === message) {

        // There should not be undefined values.  Those should always be
        // wrapped in an $atom
        if (message === null) {
            node = wrapNode(message, undefined, message);
            parent = updateNodeAncestors(parent, -node.$size, lru, version);
            node = insertNode(node, parent, key);
            promote(lru, node);
            return node;
        }

        // The messange and cache are both undefined, therefore return null.
        else if (message === undefined) {
            return message;
        }

        else {
            cIsObject = isObject(node);
            if (cIsObject) {
                // Is the cache node a branch? If so, return the cache branch.
                cType = node.$type;
                if (cType == null) {
                    // Has the branch been introduced to the cache yet? If not,
                    // give it a parent and key.
                    if (node[__parent] == null) {
                        node[__key] = key;
                        node[__parent] = parent;
                    }
                    return node;
                }
            }
        }
    } else {
        cIsObject = isObject(node);
        if (cIsObject) {
            cType = node.$type;
        }
    }

    // If the cache isn't a reference, we might be able to return early.
    if (cType !== $ref) {
        mIsObject = isObject(message);
        if (mIsObject) {
            mType = message.$type;
        }
        if (cIsObject && !cType) {
            // If the cache is a branch and the message is empty or
            // also a branch, continue with the cache branch.
            if (message == null || (mIsObject && !mType)) {
                return node;
            }
        }
    }
    // If the cache is a reference, we might not need to replace it.
    else {
        // If the cache is a reference, but the message is empty, leave the cache alone...
        if (message == null) {
            // ...unless the cache is an expired reference. In that case, expire
            // the cache node and return undefined.
            if (isExpired(node)) {
                expireNode(node, expired, lru);
                return void 0;
            }
            return node;
        }
        mIsObject = isObject(message);
        if (mIsObject) {
            mType = message.$type;
            // If the cache and the message are both references,
            // check if we need to replace the cache reference.
            if (mType === $ref) {
                if (node === message) {
                    // If the cache and message are the same reference,
                    // we performed a whole-branch merge of one of the
                    // grandparents. If we've previously graphed this
                    // reference, break early. Otherwise, continue to
                    // leaf insertion below.
                    if (node[__parent] != null) {
                        return node;
                    }
                } else {

                    cTimestamp = node.$timestamp;
                    mTimestamp = message.$timestamp;

                    // - If either the cache or message reference is expired,
                    //   replace the cache reference with the message.
                    // - If neither of the references are expired, compare their
                    //   timestamps. If either of them don't have a timestamp,
                    //   or the message's timestamp is newer, replace the cache
                    //   reference with the message reference.
                    // - If the message reference is older than the cache
                    //   reference, short-circuit.
                    if (!isExpired(node) && !isExpired(message) && mTimestamp < cTimestamp) {
                        return void 0;
                    }
                }
            }
        }
    }

    // If the cache is a leaf but the message is a branch, merge the branch over the leaf.
    if (cType && mIsObject && !mType) {
        return insertNode(replaceNode(node, message, parent, key, lru), parent, key);
    }
    // If the message is a sentinel or primitive, insert it into the cache.
    else if (mType || !mIsObject) {
        // If the cache and the message are the same value, we branch-merged one
        // of the message's ancestors. If this is the first time we've seen this
        // leaf, give the message a $size and $type, attach its graph pointers,
        // and update the cache sizes and versions.

        if (mType === $error && isFunction(errorSelector)) {
            message = errorSelector(reconstructPath(requestedPath, key), message);
        }

        if (mType && node === message) {
            if (node[__parent] == null) {
                node = wrapNode(node, cType, node.value);
                parent = updateNodeAncestors(parent, -node.$size, lru, version);
                node = insertNode(node, parent, key, version);
            }
        }
        // If the cache and message are different, or the message is a
        // primitive, replace the cache with the message value. If the message
        // is a sentinel, clone and maintain its type. If the message is a
        // primitive value, wrap it in an atom.
        else {
            var isDistinct = true;
            // If the cache is a branch, but the message is a leaf, replace the
            // cache branch with the message leaf.
            if (cType || !cIsObject) {
                // Compare the current cache value with the new value. If either of
                // them don't have a timestamp, or the message's timestamp is newer,
                // replace the cache value with the message value. If a comparator
                // is specified, the comparator takes precedence over timestamps.
                //
                // Comparing either Number or undefined to undefined always results in false.
                isDistinct = (getTimestamp(message) < getTimestamp(node)) === false;
                // If at least one of the cache/message are sentinels, compare them.
                if ((cType || mType) && isFunction(comparator)) {
                    isDistinct = !comparator(node, message, optimizedPath.slice(0, optimizedPath.index));
                }
            }
            if (isDistinct) {
                message = wrapNode(message, mType, mType ? message.value : message);
                sizeOffset = getSize(node) - getSize(message);
                node = replaceNode(node, message, parent, key, lru);
                parent = updateNodeAncestors(parent, sizeOffset, lru, version);
                node = insertNode(node, parent, key, version);
            }
        }

        // Promote the message edge in the LRU.
        if (isExpired(node)) {
            expireNode(node, expired, lru);
        } else {
            promote(lru, node);
        }
    }
    else if (node == null) {
        node = insertNode(message, parent, key);
    }

    return node;
};

},{"101":101,"108":108,"111":111,"116":116,"118":118,"120":120,"121":121,"37":37,"40":40,"51":51,"87":87,"89":89,"90":90,"94":94,"96":96,"97":97}],105:[function(require,module,exports){
var $ref = require(121);
var $error = require(120);
var getType = require(91);
var getSize = require(89);
var getTimestamp = require(90);

var isExpired = require(96);
var isPrimitive = require(103);
var isFunction = require(97);

var wrapNode = require(118);
var expireNode = require(87);
var insertNode = require(94);
var replaceNode = require(111);
var updateNodeAncestors = require(116);
var updateBackReferenceVersions = require(115);
var reconstructPath = require(108);

module.exports = function mergeValueOrInsertBranch(
    parent, node, key, value,
    branch, reference, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector) {

    var type = getType(node, reference);

    if (branch || reference) {
        if (type && isExpired(node)) {
            type = "expired";
            expireNode(node, expired, lru);
        }
        if ((type && type !== $ref) || isPrimitive(node)) {
            node = replaceNode(node, {}, parent, key, lru);
            node = insertNode(node, parent, key, version);
            node = updateBackReferenceVersions(node, version);
        }
    } else {
        var message = value;
        var mType = getType(message);
        // Compare the current cache value with the new value. If either of
        // them don't have a timestamp, or the message's timestamp is newer,
        // replace the cache value with the message value. If a comparator
        // is specified, the comparator takes precedence over timestamps.
        //
        // Comparing either Number or undefined to undefined always results in false.
        var isDistinct = (getTimestamp(message) < getTimestamp(node)) === false;
        // If at least one of the cache/message are sentinels, compare them.
        if ((type || mType) && isFunction(comparator)) {
            isDistinct = !comparator(node, message, optimizedPath.slice(0, optimizedPath.index));
        }
        if (isDistinct) {

            if (mType === $error && isFunction(errorSelector)) {
                message = errorSelector(reconstructPath(requestedPath, key), message);
            }

            message = wrapNode(message, mType, mType ? message.value : message);

            var sizeOffset = getSize(node) - getSize(message);

            node = replaceNode(node, message, parent, key, lru);
            parent = updateNodeAncestors(parent, sizeOffset, lru, version);
            node = insertNode(node, parent, key, version);
        }
    }

    return node;
};

},{"103":103,"108":108,"111":111,"115":115,"116":116,"118":118,"120":120,"121":121,"87":87,"89":89,"90":90,"91":91,"94":94,"96":96,"97":97}],106:[function(require,module,exports){
module.exports = function noop() {};

},{}],107:[function(require,module,exports){
module.exports = Date.now;

},{}],108:[function(require,module,exports){
/**
 * Reconstructs the path for the current key, from currentPath (requestedPath)
 * state maintained during set/merge walk operations.
 *
 * During the walk, since the requestedPath array is updated after we attempt to
 * merge/insert nodes during a walk (it reflects the inserted node's parent branch)
 * we need to reconstitute a path from it.
 *
 * @param  {Array} currentPath The current requestedPath state, during the walk
 * @param  {String} key        The current key value, during the walk
 * @return {Array} A new array, with the path which represents the node we're about
 * to insert
 */
module.exports = function reconstructPath(currentPath, key) {

    var path = currentPath.slice(0, currentPath.depth);
    path[path.length] = key;

    return path;
};

},{}],109:[function(require,module,exports){
var $ref = require(121);
var __parent = require(40);
var splice = require(52);
var isObject = require(101);
var unlinkBackReferences = require(113);
var unlinkForwardReference = require(114);

module.exports = function removeNode(node, parent, key, lru) {
    if (isObject(node)) {
        var type = node.$type;
        if (Boolean(type)) {
            if (type === $ref) {
                unlinkForwardReference(node);
            }
            splice(lru, node);
        }
        unlinkBackReferences(node);
        parent[key] = node[__parent] = void 0;
        return true;
    }
    return false;
};

},{"101":101,"113":113,"114":114,"121":121,"40":40,"52":52}],110:[function(require,module,exports){
var hasOwn = require(92);
var prefix = require(41);
var removeNode = require(109);

module.exports = function removeNodeAndDescendants(node, parent, key, lru) {
    if (removeNode(node, parent, key, lru)) {
        if (node.$type == null) {
            for (var key2 in node) {
                if (key2[0] !== prefix && key2[0] !== "$" && hasOwn(node, key2)) {
                    removeNodeAndDescendants(node[key2], node, key2, lru);
                }
            }
        }
        return true;
    }
    return false;
};

},{"109":109,"41":41,"92":92}],111:[function(require,module,exports){
var isObject = require(101);
var transferBackReferences = require(112);
var removeNodeAndDescendants = require(110);

module.exports = function replaceNode(node, replacement, parent, key, lru) {
    if (node === replacement) {
        return node;
    } else if (isObject(node)) {
        transferBackReferences(node, replacement);
        removeNodeAndDescendants(node, parent, key, lru);
    }
    parent[key] = replacement;
    return replacement;
};

},{"101":101,"110":110,"112":112}],112:[function(require,module,exports){
var __ref = require(44);
var __context = require(34);
var __refsLength = require(45);

module.exports = function transferBackReferences(fromNode, destNode) {
    var fromNodeRefsLength = fromNode[__refsLength] || 0,
        destNodeRefsLength = destNode[__refsLength] || 0,
        i = -1;
    while (++i < fromNodeRefsLength) {
        var ref = fromNode[__ref + i];
        if (ref !== void 0) {
            ref[__context] = destNode;
            destNode[__ref + (destNodeRefsLength + i)] = ref;
            fromNode[__ref + i] = void 0;
        }
    }
    destNode[__refsLength] = fromNodeRefsLength + destNodeRefsLength;
    fromNode[__refsLength] = void 0;
    return destNode;
};

},{"34":34,"44":44,"45":45}],113:[function(require,module,exports){
var __ref = require(44);
var __context = require(34);
var __refIndex = require(43);
var __refsLength = require(45);

module.exports = function unlinkBackReferences(node) {
    var i = -1, n = node[__refsLength] || 0;
    while (++i < n) {
        var ref = node[__ref + i];
        if (ref != null) {
            ref[__context] = ref[__refIndex] = node[__ref + i] = void 0;
        }
    }
    node[__refsLength] = void 0;
    return node;
};

},{"34":34,"43":43,"44":44,"45":45}],114:[function(require,module,exports){
var __ref = require(44);
var __context = require(34);
var __refIndex = require(43);
var __refsLength = require(45);

module.exports = function unlinkForwardReference(reference) {
    var destination = reference[__context];
    if (destination) {
        var i = (reference[__refIndex] || 0) - 1,
            n = (destination[__refsLength] || 0) - 1;
        while (++i <= n) {
            destination[__ref + i] = destination[__ref + (i + 1)];
        }
        destination[__refsLength] = n;
        reference[__refIndex] = reference[__context] = destination = void 0;
    }
    return reference;
};

},{"34":34,"43":43,"44":44,"45":45}],115:[function(require,module,exports){
var __ref = require(44);
var __parent = require(40);
var __version = require(47);
var __refsLength = require(45);

module.exports = function updateBackReferenceVersions(nodeArg, version) {
    var stack = [nodeArg];
    var count = 0;
    do {
        var node = stack[count--];
        if (node && node[__version] !== version) {
            node[__version] = version;
            stack[count++] = node[__parent];
            var i = -1;
            var n = node[__refsLength] || 0;
            while (++i < n) {
                stack[count++] = node[__ref + i];
            }
        }
    } while (count > -1);
    return nodeArg;
};

},{"40":40,"44":44,"45":45,"47":47}],116:[function(require,module,exports){
var __key = require(37);
var __version = require(47);
var __parent = require(40);
var removeNode = require(109);
var updateBackReferenceVersions = require(115);

module.exports = function updateNodeAncestors(nodeArg, offset, lru, version) {
    var child = nodeArg;
    do {
        var node = child[__parent];
        var size = child.$size = (child.$size || 0) - offset;
        if (size <= 0 && node != null) {
            removeNode(child, node, child[__key], lru);
        } else if (child[__version] !== version) {
            updateBackReferenceVersions(child, version);
        }
        child = node;
    } while (child);
    return nodeArg;
};

},{"109":109,"115":115,"37":37,"40":40,"47":47}],117:[function(require,module,exports){
var isArray = Array.isArray;
var isPathValue = require(102);
var isJSONGraphEnvelope = require(100);
var isJSONEnvelope = require(99);
var pathSyntax = require(135);

/**
 *
 * @param {Object} allowedInput - allowedInput is a map of input styles
 * that are allowed
 * @private
 */
module.exports = function validateInput(args, allowedInput, method) {
    for (var i = 0, len = args.length; i < len; ++i) {
        var arg = args[i];
        var valid = false;

        // Path
        if (isArray(arg) && allowedInput.path) {
            valid = true;
        }

        // Path Syntax
        else if (typeof arg === "string" && allowedInput.pathSyntax) {
            valid = true;
        }

        // Path Value
        else if (isPathValue(arg) && allowedInput.pathValue) {
            arg.path = pathSyntax.fromPath(arg.path);
            valid = true;
        }

        // jsonGraph {jsonGraph: { ... }, paths: [ ... ]}
        else if (isJSONGraphEnvelope(arg) && allowedInput.jsonGraph) {
            valid = true;
        }

        // json env {json: {...}}
        else if (isJSONEnvelope(arg) && allowedInput.json) {
            valid = true;
        }

        // selector functions
        else if (typeof arg === "function" &&
                 i + 1 === len &&
                 allowedInput.selector) {
            valid = true;
        }

        if (!valid) {
            return new Error("Unrecognized argument " + (typeof arg) + " [" + String(arg) + "] " + "to Model#" + method + "");
        }
    }
    return true;
};

},{"100":100,"102":102,"135":135,"99":99}],118:[function(require,module,exports){
var jsong = require(131);
var $atom = jsong.atom;

var now = require(107);
var expiresNow = require(123);

var __modelCreated = require(38);

var atomSize = 50;

var clone = require(86);
var isArray = Array.isArray;
var getSize = require(89);
var getExpires = require(88);

module.exports = function wrapNode(nodeArg, typeArg, value) {

    var size = 0;
    var node = nodeArg;
    var type = typeArg;

    if (type) {
        node = clone(node);
        size = getSize(node);
        node.$type = type;
    } else {
        node = $atom(value);
        type = node.$type;
        node[__modelCreated] = true;
    }

    if (value == null) {
        size = atomSize + 1;
    } else if (size == null || size <= 0) {
        switch (typeof value) {
            case "object":
                if (isArray(value)) {
                    size = atomSize + value.length;
                } else {
                    size = atomSize + 1;
                }
                break;
            case "string":
                size = atomSize + value.length;
                break;
            default:
                size = atomSize + 1;
                break;
        }
    }

    var expires = getExpires(node);

    if (typeof expires === "number" && expires < expiresNow) {
        node.$expires = now() + (expires * -1);
    }

    node.$size = size;

    return node;
};

},{"107":107,"123":123,"131":131,"38":38,"86":86,"88":88,"89":89}],119:[function(require,module,exports){
module.exports = "atom";

},{}],120:[function(require,module,exports){
module.exports = "error";

},{}],121:[function(require,module,exports){
module.exports = "ref";

},{}],122:[function(require,module,exports){
module.exports = 1;

},{}],123:[function(require,module,exports){
module.exports = 0;

},{}],124:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require(125);
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

},{"125":125}],125:[function(require,module,exports){
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
},{}],126:[function(require,module,exports){
'use strict';
var request = require(130);
var buildQueryObject = require(127);
var isArray = Array.isArray;

function simpleExtend(obj, obj2) {
  var prop;
  for (prop in obj2) {
    obj[prop] = obj2[prop];
  }
  return obj;
}

function XMLHttpSource(jsongUrl, config) {
  this._jsongUrl = jsongUrl;
  if (typeof config === 'number') {
    var newConfig = {
      timeout: config
    };
    config = newConfig;
  }
  this._config = simpleExtend({
    timeout: 15000,
    headers: {}
  }, config || {});
}

XMLHttpSource.prototype = {
  // because javascript
  constructor: XMLHttpSource,
  /**
   * buildQueryObject helper
   */
  buildQueryObject: buildQueryObject,

  /**
   * @inheritDoc DataSource#get
   */
  get: function httpSourceGet(pathSet) {
    var method = 'GET';
    var queryObject = this.buildQueryObject(this._jsongUrl, method, {
      paths: pathSet,
      method: 'get'
    });
    var config = simpleExtend(queryObject, this._config);
    // pass context for onBeforeRequest callback
    var context = this;
    return request(method, config, context);
  },

  /**
   * @inheritDoc DataSource#set
   */
  set: function httpSourceSet(jsongEnv) {
    var method = 'POST';
    var queryObject = this.buildQueryObject(this._jsongUrl, method, {
      jsonGraph: jsongEnv,
      method: 'set'
    });
    var config = simpleExtend(queryObject, this._config);
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    
    // pass context for onBeforeRequest callback
    var context = this;
    return request(method, config, context);

  },

  /**
   * @inheritDoc DataSource#call
   */
  call: function httpSourceCall(callPath, args, pathSuffix, paths) {
    // arguments defaults
    args = args || [];
    pathSuffix = pathSuffix || [];
    paths = paths || [];

    var method = 'POST';
    var queryData = [];
    queryData.push('method=call');
    queryData.push('callPath=' + encodeURIComponent(JSON.stringify(callPath)));
    queryData.push('arguments=' + encodeURIComponent(JSON.stringify(args)));
    queryData.push('pathSuffixes=' + encodeURIComponent(JSON.stringify(pathSuffix)));
    queryData.push('paths=' + encodeURIComponent(JSON.stringify(paths)));

    var queryObject = this.buildQueryObject(this._jsongUrl, method, queryData.join('&'));
    var config = simpleExtend(queryObject, this._config);
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    
    // pass context for onBeforeRequest callback
    var context = this;
    return request(method, config, context);
  }
};
// ES6 modules
XMLHttpSource.XMLHttpSource = XMLHttpSource;
XMLHttpSource['default'] = XMLHttpSource;
// commonjs
module.exports = XMLHttpSource;

},{"127":127,"130":130}],127:[function(require,module,exports){
'use strict';
module.exports = function buildQueryObject(url, method, queryData) {
  var qData = [];
  var keys;
  var data = {url: url};
  var isQueryParamUrl = url.indexOf('?') !== -1;
  var startUrl = (isQueryParamUrl) ? '&' : '?';

  if (typeof queryData === 'string') {
    qData.push(queryData);
  } else {

    keys = Object.keys(queryData);
    keys.forEach(function (k) {
      var value = (typeof queryData[k] === 'object') ? JSON.stringify(queryData[k]) : queryData[k];
      qData.push(k + '=' + encodeURIComponent(value));
    });
  }

  if (method === 'GET') {
    data.url += startUrl + qData.join('&');
  } else {
    data.data = qData.join('&');
  }

  return data;
};

},{}],128:[function(require,module,exports){
(function (global){
'use strict';
// Get CORS support even for older IE
module.exports = function getCORSRequest() {
    var xhr = new global.XMLHttpRequest();
    if ('withCredentials' in xhr) {
        return xhr;
    } else if (!!global.XDomainRequest) {
        return new XDomainRequest();
    } else {
        throw new Error('CORS is not supported by your browser');
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],129:[function(require,module,exports){
(function (global){
'use strict';
module.exports = function getXMLHttpRequest() {
  var progId,
    progIds,
    i;
  if (global.XMLHttpRequest) {
    return new global.XMLHttpRequest();
  } else {
    try {
    progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
    for (i = 0; i < 3; i++) {
      try {
        progId = progIds[i];
        if (new global.ActiveXObject(progId)) {
          break;
        }
      } catch(e) { }
    }
    return new global.ActiveXObject(progId);
    } catch (e) {
    throw new Error('XMLHttpRequest is not supported by your browser');
    }
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],130:[function(require,module,exports){
'use strict';
var getXMLHttpRequest = require(129);
var getCORSRequest = require(128);
var hasOwnProp = Object.prototype.hasOwnProperty;

var noop = function() {};

function Observable() {}

Observable.create = function(subscribe) {
  var o = new Observable();

  o.subscribe = function(onNext, onError, onCompleted) {

    var observer;
    var disposable;

    if (typeof onNext === 'function') {
        observer = {
            onNext: onNext,
            onError: (onError || noop),
            onCompleted: (onCompleted || noop)
        };
    } else {
        observer = onNext;
    }

    disposable = subscribe(observer);

    if (typeof disposable === 'function') {
      return {
        dispose: disposable
      };
    } else {
      return disposable;
    }
  };

  return o;
};

function request(method, options, context) {
  return Observable.create(function requestObserver(observer) {

    var config = {
      method: method || 'GET',
      crossDomain: false,
      async: true,
      headers: {},
      responseType: 'json'
    };

    var xhr,
      isDone,
      headers,
      header,
      prop;

    for (prop in options) {
      if (hasOwnProp.call(options, prop)) {
        config[prop] = options[prop];
      }
    }

    // Add request with Headers
    if (!config.crossDomain && !config.headers['X-Requested-With']) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    // allow the user to mutate the config open
    if (context.onBeforeRequest != null) {
      context.onBeforeRequest(config);
    }

    // create xhr
    try {
      xhr = config.crossDomain ? getCORSRequest() : getXMLHttpRequest();
    } catch (err) {
      observer.onError(err);
    }
    try {
      // Takes the url and opens the connection
      if (config.user) {
        xhr.open(config.method, config.url, config.async, config.user, config.password);
      } else {
        xhr.open(config.method, config.url, config.async);
      }

      // Sets timeout information
      xhr.timeout = config.timeout;

      // Anything but explicit false results in true.
      xhr.withCredentials = config.withCredentials !== false;

      // Fills the request headers
      headers = config.headers;
      for (header in headers) {
        if (hasOwnProp.call(headers, header)) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }

      if (config.responseType) {
        try {
          xhr.responseType = config.responseType;
        } catch (e) {
          // WebKit added support for the json responseType value on 09/03/2013
          // https://bugs.webkit.org/show_bug.cgi?id=73648. Versions of Safari prior to 7 are
          // known to throw when setting the value "json" as the response type. Other older
          // browsers implementing the responseType
          //
          // The json response type can be ignored if not supported, because JSON payloads are
          // parsed on the client-side regardless.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }

      xhr.onreadystatechange = function onreadystatechange(e) {
        // Complete
        if (xhr.readyState === 4) {
          if (!isDone) {
            isDone = true;
            onXhrLoad(observer, xhr, e);
          }
        }
      };

      // Timeout
      xhr.ontimeout = function ontimeout(e) {
        if (!isDone) {
          isDone = true;
          onXhrError(observer, xhr, 'timeout error', e);
        }
      };

      // Send Request
      xhr.send(config.data);

    } catch (e) {
      observer.onError(e);
    }
    // Dispose
    return function dispose() {
      // Doesn't work in IE9
      if (!isDone && xhr.readyState !== 4) {
        isDone = true;
        xhr.abort();
      }
    };//Dispose
  });
}

/*
 * General handling of ultimate failure (after appropriate retries)
 */
function _handleXhrError(observer, textStatus, errorThrown) {
  // IE9: cross-domain request may be considered errors
  if (!errorThrown) {
    errorThrown = new Error(textStatus);
  }

  observer.onError(errorThrown);
}

function onXhrLoad(observer, xhr, e) {
  var responseData,
    responseObject,
    responseType;

  // If there's no observer, the request has been (or is being) cancelled.
  if (xhr && observer) {
    responseType = xhr.responseType;
    // responseText is the old-school way of retrieving response (supported by IE8 & 9)
    // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)
    responseData = ('response' in xhr) ? xhr.response : xhr.responseText;

    // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
    var status = (xhr.status === 1223) ? 204 : xhr.status;

    if (status >= 200 && status <= 399) {
      try {
        if (responseType !== 'json') {
          responseData = JSON.parse(responseData || '');
        }
        if (typeof responseData === 'string') {
          responseData = JSON.parse(responseData || '');
        }
      } catch (e) {
        _handleXhrError(observer, 'invalid json', e);
      }
      observer.onNext(responseData);
      observer.onCompleted();
      return;

    } else if (status === 401 || status === 403 || status === 407) {

      return _handleXhrError(observer, responseData);

    } else if (status === 410) {
      // TODO: Retry ?
      return _handleXhrError(observer, responseData);

    } else if (status === 408 || status === 504) {
      // TODO: Retry ?
      return _handleXhrError(observer, responseData);

    } else {

      return _handleXhrError(observer, responseData || ('Response code ' + status));

    }//if
  }//if
}//onXhrLoad

function onXhrError(observer, xhr, status, e) {
  _handleXhrError(observer, status || xhr.statusText || 'request error', e);
}

module.exports = request;

},{"128":128,"129":129}],131:[function(require,module,exports){
var pathSyntax = require(135);

function sentinel(type, value, props) {
    var copy = Object.create(null);
    if (props != null) {
        for(var key in props) {
            copy[key] = props[key];
        }
        
        copy["$type"] = type;
        copy.value = value;
        return copy;
    }
    else {
        return { $type: type, value: value };
    }    
}

module.exports = {
    ref: function ref(path, props) {
        return sentinel("ref", pathSyntax.fromPath(path), props);
    },
    atom: function atom(value, props) {
        return sentinel("atom", value, props);        
    },
    undefined: function() {
        return sentinel("atom");
    },    
    error: function error(errorValue, props) {
        return sentinel("error", errorValue, props);        
    },
    pathValue: function pathValue(path, value) {
        return { path: pathSyntax.fromPath(path), value: value };
    },
    pathInvalidation: function pathInvalidation(path) {
        return { path: pathSyntax.fromPath(path), invalidated: true };
    }    
};

},{"135":135}],132:[function(require,module,exports){
module.exports = {
    integers: 'integers',
    ranges: 'ranges',
    keys: 'keys'
};

},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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


},{}],135:[function(require,module,exports){
var Tokenizer = require(141);
var head = require(136);
var RoutedTokens = require(132);

var parser = function parser(string, extendedRules) {
    return head(new Tokenizer(string, extendedRules));
};

module.exports = parser;

// Constructs the paths from paths / pathValues that have strings.
// If it does not have a string, just moves the value into the return
// results.
parser.fromPathsOrPathValues = function(paths, ext) {
    if (!paths) {
        return [];
    }

    var out = [];
    for (var i = 0, len = paths.length; i < len; i++) {

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
    if (!path) {
        return [];
    }

    if (typeof path === 'string') {
        return parser(path, ext);
    }

    return path;
};

// Potential routed tokens.
parser.RoutedTokens = RoutedTokens;

},{"132":132,"136":136,"141":141}],136:[function(require,module,exports){
var TokenTypes = require(133);
var E = require(134);
var indexer = require(137);

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


},{"133":133,"134":134,"137":137}],137:[function(require,module,exports){
var TokenTypes = require(133);
var E = require(134);
var idxE = E.indexer;
var range = require(139);
var quote = require(138);
var routed = require(140);

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
                E.throwError(E.unexpectedToken, tokenizer);
                break;
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


},{"133":133,"134":134,"138":138,"139":139,"140":140}],138:[function(require,module,exports){
var TokenTypes = require(133);
var E = require(134);
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


},{"133":133,"134":134}],139:[function(require,module,exports){
var Tokenizer = require(141);
var TokenTypes = require(133);
var E = require(134);

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


},{"133":133,"134":134,"141":141}],140:[function(require,module,exports){
var TokenTypes = require(133);
var RoutedTokens = require(132);
var E = require(134);
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


},{"132":132,"133":133,"134":134}],141:[function(require,module,exports){
var TokenTypes = require(133);
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
    var done;

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



},{"133":133}],142:[function(require,module,exports){
var toPaths = require(148);
var toTree = require(149);

module.exports = function collapse(paths) {
    var collapseMap = paths.
        reduce(function(acc, path) {
            var len = path.length;
            if (!acc[len]) {
                acc[len] = [];
            }
            acc[len].push(path);
            return acc;
        }, {});

    Object.
        keys(collapseMap).
        forEach(function(collapseKey) {
            collapseMap[collapseKey] = toTree(collapseMap[collapseKey]);
        });

    return toPaths(collapseMap);
};

},{"148":148,"149":149}],143:[function(require,module,exports){
var iterateKeySet = require(145);

/**
 * Tests to see if the intersection should be stripped from the
 * total paths.  The only way this happens currently is if the entirety
 * of the path is contained in the tree.
 * @private
 */
module.exports = function hasIntersection(tree, path, depth) {
    var current = tree;
    var intersects = true;

    // Continue iteratively going down a path until a complex key is
    // encountered, then recurse.
    for (;intersects && depth < path.length; ++depth) {
        var key = path[depth];
        var keyType = typeof key;

        // We have to iterate key set
        if (key && keyType === 'object') {
            var note = {};
            var innerKey = iterateKeySet(key, note);
            var nextDepth = depth + 1;

            // Loop through the innerKeys setting the intersects flag
            // to each result.  Break out on false.
            do {
                var next = current[innerKey];
                intersects = next !== undefined;

                if (intersects) {
                    intersects = hasIntersection(next, path, nextDepth);
                }
                innerKey = iterateKeySet(key, note);
            } while (intersects && !note.done);

            // Since we recursed, we shall not pass any further!
            break;
        }

        // Its a simple key, just move forward with the testing.
        current = current[key];
        intersects = current !== undefined;
    }

    return intersects;
};

},{"145":145}],144:[function(require,module,exports){
module.exports = {
    iterateKeySet: require(145),
    toTree: require(149),
    toTreeWithUnion: require(150),
    pathsComplementFromTree: require(147),
    pathsComplementFromLengthTree: require(146),
    hasIntersection: require(143),
    toPaths: require(148),
    collapse: require(142)
};

},{"142":142,"143":143,"145":145,"146":146,"147":147,"148":148,"149":149,"150":150}],145:[function(require,module,exports){
var isArray = Array.isArray;

/**
 * Takes in a keySet and a note attempts to iterate over it.
 * If the value is a primitive, the key will be returned and the note will
 * be marked done
 * If the value is an object, then each value of the range will be returned
 * and when finished the note will be marked done.
 * If the value is an array, each value will be iterated over, if any of the
 * inner values are ranges, those will be iterated over.  When fully done,
 * the note will be marked done.
 *
 * @param {Object|Array|String|Number} keySet -
 * @param {Object} note - The non filled note
 * @returns {String|Number|undefined} - The current iteration value.
 * If undefined, then the keySet is empty
 * @public
 */
module.exports = function iterateKeySet(keySet, note) {
    if (note.isArray === undefined) {
        initializeNote(keySet, note);
    }

    // Array iteration
    if (note.isArray) {
        var nextValue;

        // Cycle through the array and pluck out the next value.
        do {
            if (note.loaded && note.rangeOffset > note.to) {
                ++note.arrayOffset;
                note.loaded = false;
            }

            var idx = note.arrayOffset, length = keySet.length;
            if (idx >= length) {
                note.done = true;
                break;
            }

            var el = keySet[note.arrayOffset];
            var type = typeof el;

            // Inner range iteration.
            if (type === 'object') {
                if (!note.loaded) {
                    initializeRange(el, note);
                }

                // Empty to/from
                if (note.empty) {
                    continue;
                }

                nextValue = note.rangeOffset++;
            }

            // Primitive iteration in array.
            else {
                ++note.arrayOffset;
                nextValue = el;
            }
        } while (nextValue === undefined);

        return nextValue;
    }

    // Range iteration
    else if (note.isObject) {
        if (!note.loaded) {
            initializeRange(keySet, note);
        }
        if (note.rangeOffset > note.to) {
            note.done = true;
            return undefined;
        }

        return note.rangeOffset++;
    }

    // Primitive value
    else {
        note.done = true;
        return keySet;
    }
};

function initializeRange(key, memo) {
    var from = memo.from = key.from || 0;
    var to = memo.to = key.to ||
        (typeof key.length === 'number' &&
        memo.from + key.length - 1 || 0);
    memo.rangeOffset = memo.from;
    memo.loaded = true;
    if (from > to) {
        memo.empty = true;
    }
}

function initializeNote(key, note) {
    note.done = false;
    var isObject = note.isObject = !!(key && typeof key === 'object');
    note.isArray = isObject && isArray(key);
    note.arrayOffset = 0;
}

},{}],146:[function(require,module,exports){
var hasIntersection = require(143);

/**
 * Compares the paths passed in with the tree.  Any of the paths that are in
 * the tree will be stripped from the paths.
 *
 * **Does not mutate** the incoming paths object.
 * **Proper subset** only matching.
 *
 * @param {Array} paths - A list of paths (complex or simple) to strip the
 * intersection
 * @param {Object} tree -
 * @public
 */
module.exports = function pathsComplementFromLengthTree(paths, tree) {
    var out = [];
    var outLength = -1;

    for (var i = 0, len = paths.length; i < len; ++i) {
        // If this does not intersect then add it to the output.
        var path = paths[i];
        if (!hasIntersection(tree[path.length], path, 0)) {
            out[++outLength] = path;
        }
    }
    return out;
};


},{"143":143}],147:[function(require,module,exports){
var hasIntersection = require(143);

/**
 * Compares the paths passed in with the tree.  Any of the paths that are in
 * the tree will be stripped from the paths.
 *
 * **Does not mutate** the incoming paths object.
 * **Proper subset** only matching.
 *
 * @param {Array} paths - A list of paths (complex or simple) to strip the
 * intersection
 * @param {Object} tree -
 * @public
 */
module.exports = function pathsComplementFromTree(paths, tree) {
    var out = [];
    var outLength = -1;

    for (var i = 0, len = paths.length; i < len; ++i) {
        // If this does not intersect then add it to the output.
        if (!hasIntersection(tree, paths[i], 0)) {
            out[++outLength] = paths[i];
        }
    }
    return out;
};


},{"143":143}],148:[function(require,module,exports){
var isArray = Array.isArray;
var typeOfObject = "object";

/* jshint forin: false */
module.exports = function toPaths(lengths) {
    var pathmap;
    var allPaths = [];
    var allPathsLength = 0;
    for (var length in lengths) {
        if (isNumber(length) && isObject(pathmap = lengths[length])) {
            var paths = collapsePathMap(pathmap, 0, parseInt(length, 10)).sets;
            var pathsIndex = -1;
            var pathsCount = paths.length;
            while (++pathsIndex < pathsCount) {
                allPaths[allPathsLength++] = collapsePathSetIndexes(paths[pathsIndex]);
            }
        }
    }
    return allPaths;
};

function isObject(value) {
    return value !== null && typeof value === typeOfObject;
}

function collapsePathMap(pathmap, depth, length) {

    var key;
    var code = getHashCode(String(depth));
    var subs = Object.create(null);

    var codes = [];
    var codesIndex = -1;
    var codesCount = 0;

    var pathsets = [];
    var pathsetsCount = 0;

    var subPath, subCode,
        subKeys, subKeysIndex, subKeysCount,
        subSets, subSetsIndex, subSetsCount,
        pathset, pathsetIndex, pathsetCount,
        firstSubKey, pathsetClone;

    subKeys = [];
    subKeysIndex = -1;

    if (depth < length - 1) {

        subKeysCount = getSortedKeys(pathmap, subKeys);

        while (++subKeysIndex < subKeysCount) {
            key = subKeys[subKeysIndex];
            subPath = collapsePathMap(pathmap[key], depth + 1, length);
            subCode = subPath.code;
            if(subs[subCode]) {
                subPath = subs[subCode];
            } else {
                codes[codesCount++] = subCode;
                subPath = subs[subCode] = {
                    keys: [],
                    sets: subPath.sets
                };
            }
            code = getHashCode(code + key + subCode);

            isNumber(key) &&
                subPath.keys.push(parseInt(key, 10)) ||
                subPath.keys.push(key);
        }

        while(++codesIndex < codesCount) {

            key = codes[codesIndex];
            subPath = subs[key];
            subKeys = subPath.keys;
            subKeysCount = subKeys.length;

            if (subKeysCount > 0) {

                subSets = subPath.sets;
                subSetsIndex = -1;
                subSetsCount = subSets.length;
                firstSubKey = subKeys[0];

                while (++subSetsIndex < subSetsCount) {

                    pathset = subSets[subSetsIndex];
                    pathsetIndex = -1;
                    pathsetCount = pathset.length;
                    pathsetClone = new Array(pathsetCount + 1);
                    pathsetClone[0] = subKeysCount > 1 && subKeys || firstSubKey;

                    while (++pathsetIndex < pathsetCount) {
                        pathsetClone[pathsetIndex + 1] = pathset[pathsetIndex];
                    }

                    pathsets[pathsetsCount++] = pathsetClone;
                }
            }
        }
    } else {
        subKeysCount = getSortedKeys(pathmap, subKeys);
        if (subKeysCount > 1) {
            pathsets[pathsetsCount++] = [subKeys];
        } else {
            pathsets[pathsetsCount++] = subKeys;
        }
        while (++subKeysIndex < subKeysCount) {
            code = getHashCode(code + subKeys[subKeysIndex]);
        }
    }

    return {
        code: code,
        sets: pathsets
    };
}

function collapsePathSetIndexes(pathset) {

    var keysetIndex = -1;
    var keysetCount = pathset.length;

    while (++keysetIndex < keysetCount) {
        var keyset = pathset[keysetIndex];
        if (isArray(keyset)) {
            pathset[keysetIndex] = collapseIndex(keyset);
        }
    }

    return pathset;
}

/**
 * Collapse range indexers, e.g. when there is a continuous
 * range in an array, turn it into an object instead:
 *
 * [1,2,3,4,5,6] => {"from":1, "to":6}
 *
 * @private
 */
function collapseIndex(keyset) {

    // Do we need to dedupe an indexer keyset if they're duplicate consecutive integers?
    // var hash = {};
    var keyIndex = -1;
    var keyCount = keyset.length - 1;
    var isSparseRange = keyCount > 0;

    while (++keyIndex <= keyCount) {

        var key = keyset[keyIndex];

        if (!isNumber(key) /* || hash[key] === true*/ ) {
            isSparseRange = false;
            break;
        }
        // hash[key] = true;
        // Cast number indexes to integers.
        keyset[keyIndex] = parseInt(key, 10);
    }

    if (isSparseRange === true) {

        keyset.sort(sortListAscending);

        var from = keyset[0];
        var to = keyset[keyCount];

        // If we re-introduce deduped integer indexers, change this comparson to "===".
        if (to - from <= keyCount) {
            return {
                from: from,
                to: to
            };
        }
    }

    return keyset;
}

function sortListAscending(a, b) {
    return a - b;
}

/* jshint forin: false */
function getSortedKeys(map, keys, sort) {
    var len = 0;
    for (var key in map) {
        keys[len++] = key;
    }
    if (len > 1) {
        keys.sort(sort);
    }
    return len;
}

function getHashCode(key) {
    var code = 5381;
    var index = -1;
    var count = key.length;
    while (++index < count) {
        code = (code << 5) + code + key.charCodeAt(index);
    }
    return String(code);
}

/**
 * Return true if argument is a number or can be cast to a number
 * @private
 */
function isNumber(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !isArray(val) && (val - parseFloat(val) + 1) >= 0;
}


},{}],149:[function(require,module,exports){
var iterateKeySet = require(145);
var isArray = Array.isArray;

/**
 * @param {Array} paths -
 * @returns {Object} -
 */
module.exports = function toTree(paths) {
    return paths.reduce(function(acc, path) {
        innerToTree(acc, path, 0);
        return acc;
    }, {});
};

function innerToTree(seed, path, depth) {

    var keySet = path[depth];
    var iteratorNote = {};
    var key;
    var nextDepth = depth + 1;

    key = iterateKeySet(keySet, iteratorNote);

    do {

        var next = seed[key];
        if (!next) {
            if (nextDepth === path.length) {
                seed[key] = null;
            } else {
                next = seed[key] = {};
            }
        }

        if (nextDepth < path.length) {
            innerToTree(next, path, nextDepth);
        }

        if (!iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }
    } while (!iteratorNote.done);
}


},{"145":145}],150:[function(require,module,exports){

},{}],151:[function(require,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"142":142,"154":154,"155":155}],152:[function(require,module,exports){
module.exports = {
    iterateKeySet: require(153),
    toTree: require(155),
    toTreeWithUnion: require(156),
    toPaths: require(154),
    collapse: require(151)
};

},{"151":151,"153":153,"154":154,"155":155,"156":156}],153:[function(require,module,exports){
arguments[4][145][0].apply(exports,arguments)
},{"145":145}],154:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"148":148}],155:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"149":149,"153":153}],156:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"150":150}],157:[function(require,module,exports){
var JSONGraphError = module.exports = function JSONGraphError(typeValue) {
    this.typeValue = typeValue;
};
JSONGraphError.prototype = new Error();


},{}],158:[function(require,module,exports){
var prefix = require(205);
var Keys = {
    ranges: prefix + 'ranges',
    integers: prefix + 'integers',
    keys: prefix + 'keys',
    named: prefix + 'named',
    name: prefix + 'name',
    match: prefix + 'match'
};

module.exports = Keys;

},{"205":205}],159:[function(require,module,exports){
var Precedence = {
    specific: 4,
    ranges: 2,
    integers: 2,
    keys: 1
};
module.exports = Precedence;


},{}],160:[function(require,module,exports){
var Keys = require(158);
var parseTree = require(186);
var matcher = require(170);
var normalizePathSets = require(177);
var recurseMatchAndExecute = require(194);
var optimizePathSets = require(164);
var pathValueMerge = require(165);
var runGetAction = require(190);
var runSetAction = require(195);
var runCallAction = require(187);
var $atom = require(209).$atom;
var get = 'get';
var set = 'set';
var call = 'call';
var pathUtils = require(152);
var collapse = pathUtils.collapse;
var JSONGraphError = require(157);
var MAX_REF_FOLLOW = 50;

var Router = function(routes, options) {
    var opts = options || {};

    this._routes = routes;
    this._rst = parseTree(routes);
    this._matcher = matcher(this._rst);
    this._debug = opts.debug;
    this.maxRefFollow = opts.maxRefFollow || MAX_REF_FOLLOW;
};

Router.createClass = function(routes) {
  function C(options) {
    var opts = options || {};
    this._debug = opts.debug;
  }

  C.prototype = new Router(routes);
  C.prototype.constructor = C;

  return C;
};

Router.prototype = {
    get: function(paths) {
        var jsongCache = {};
        var action = runGetAction(this, jsongCache);
        var router = this;
        var normPS = normalizePathSets(paths);
        return run(this._matcher, action, normPS, get, this, jsongCache).
            map(function(jsongEnv) {
                return materializeMissing(router, paths, jsongEnv);
            });
    },

    set: function(jsong) {
        // TODO: Remove the modelContext and replace with just jsongEnv
        // when http://github.com/Netflix/falcor-router/issues/24 is addressed
        var jsongCache = {};
        var action = runSetAction(this, jsong, jsongCache);
        var router = this;
        return run(this._matcher, action, jsong.paths, set, this, jsongCache).
            map(function(jsongEnv) {
                return materializeMissing(router, jsong.paths, jsongEnv);
            });
    },

    call: function(callPath, args, suffixes, paths) {
        var jsongCache = {};
        var action = runCallAction(this, callPath, args,
                                   suffixes, paths, jsongCache);
        var callPaths = [callPath];
        var router = this;
        return run(this._matcher, action, callPaths, call, this, jsongCache).
            map(function(jsongResult) {
                var reportedPaths = jsongResult.reportedPaths;
                var jsongEnv = materializeMissing(
                    router,
                    reportedPaths,
                    jsongResult);


                if (reportedPaths.length) {
                    jsongEnv.paths = reportedPaths;
                }
                else {
                    jsongEnv.paths = [];
                    jsongEnv.jsonGraph = {};
                }

                var invalidated = jsongResult.invalidated;
                if (invalidated && invalidated.length) {
                    jsongEnv.invalidated = invalidated;
                }
                jsongEnv.paths = collapse(jsongEnv.paths);
                return jsongEnv;
            });
    }
};

function run(matcherFn, actionRunner, paths, method,
             routerInstance, jsongCache) {
    return recurseMatchAndExecute(
            matcherFn, actionRunner, paths, method, routerInstance, jsongCache);
}

function materializeMissing(router, paths, jsongEnv, missingAtom) {
    var jsonGraph = jsongEnv.jsonGraph;
    var materializedAtom = missingAtom || {$type: $atom};

    // Optimizes the pathSets from the jsong then
    // inserts atoms of undefined.
    optimizePathSets(jsonGraph, paths, router.maxRefFollow).
        forEach(function(optMissingPath) {
            pathValueMerge(jsonGraph, {
                path: optMissingPath,
                value: materializedAtom
            });
        });

    return {jsonGraph: jsonGraph};
}

Router.ranges = Keys.ranges;
Router.integers = Keys.integers;
Router.keys = Keys.keys;
Router.JSONGraphError = JSONGraphError;
module.exports = Router;



},{"152":152,"157":157,"158":158,"164":164,"165":165,"170":170,"177":177,"186":186,"187":187,"190":190,"194":194,"195":195,"209":209}],161:[function(require,module,exports){
var cloneArray = require(198);
var $ref = require(209).$ref;
var errors = require(166);

/**
 * performs the simplified cache reference follow.  This
 * differs from get as there is just following and reporting,
 * not much else.
 *
 * @param {Object} cacheRoot
 * @param {Array} ref
 */
module.exports = function followReference(cacheRoot, ref, maxRefFollow) {
    var current = cacheRoot;
    var refPath = ref;
    var depth = -1;
    var length = refPath.length;
    var key, next, type;
    var referenceCount = 0;

    while (++depth < length) {
        key = refPath[depth];
        next = current[key];
        type = next && next.$type;

        if (!next || type && type !== $ref) {
            current = next;
            break;
        }

        // Show stopper exception.  This route is malformed.
        if (type && type === $ref && depth + 1 < length) {
            var err = new Error(errors.innerReferences);
            err.throwToNext = true;
            throw err;
        }

        // potentially follow reference
        if (depth + 1 === length) {
            if (type === $ref) {
                depth = -1;
                refPath = next.value;
                length = refPath.length;
                next = cacheRoot;
                referenceCount++;
            }

            if (referenceCount > maxRefFollow) {
                throw new Error(errors.circularReference);
            }
        }
        current = next;
    }

    return [current, cloneArray(refPath)];
};

},{"166":166,"198":198,"209":209}],162:[function(require,module,exports){
/**
 * To simplify this algorithm, the path must be a simple
 * path with no complex keys.
 *
 * Note: The path coming in must contain no references, as
 * all set data caches have no references.
 * @param {Object} cache
 * @param {PathSet} path
 */
module.exports = function getValue(cache, path) {
    return path.reduce(function(acc, key) {
        return acc[key];
    }, cache);
};

},{}],163:[function(require,module,exports){
var iterateKeySet = require(152).iterateKeySet;
var types = require(209);
var $ref = types.$ref;
var $atom = types.$atom;
var clone = require(197);
var cloneArray = require(198);
var catAndSlice = require(196);

/**
 * merges jsong into a seed
 */
module.exports = function jsongMerge(cache, jsongEnv) {
    var paths = jsongEnv.paths;
    var j = jsongEnv.jsonGraph;
    var references = [];
    var values = [];
    paths.forEach(function(p) {
        merge({
            cacheRoot: cache,
            messageRoot: j,
            references: references,
            values: values,
            requestedPath: [],
            requestIdx: -1,
            ignoreCount: 0
        },  cache, j, 0, p);
    });
    return {
        references: references,
        values: values
    };
};

function merge(config, cache, message, depth, path, fromParent, fromKey) {
    var cacheRoot = config.cacheRoot;
    var messageRoot = config.messageRoot;
    var requestedPath = config.requestedPath;
    var ignoreCount = config.ignoreCount;
    var typeOfMessage = typeof message;
    var requestIdx = config.requestIdx;
    var updateRequestedPath = ignoreCount <= depth;
    if (updateRequestedPath) {
        requestIdx = ++config.requestIdx;
    }

    // The message at this point should always be defined.
    // Reached the end of the JSONG message path
    if (message === null || typeOfMessage !== 'object' || message.$type) {
        fromParent[fromKey] = clone(message);

        // NOTE: If we have found a reference at our cloning position
        // and we have resolved our path then add the reference to
        // the unfulfilledRefernces.
        if (message && message.$type === $ref) {
            var references = config.references;
            references.push({
                path: cloneArray(requestedPath),
                value: message.value
            });
        }

        // We are dealing with a value.  We need this for call
        // Call needs to report all of its values into the jsongCache
        // and paths.
        else {
            var values = config.values;
            values.push({
                path: cloneArray(requestedPath),
                value: (message && message.type) ? message.value : message
            });
        }

        return;
    }

    var outerKey = path[depth];
    var iteratorNote = {};
    var key;
    key = iterateKeySet(outerKey, iteratorNote);

    // We always attempt this as a loop.  If the memo exists then
    // we assume that the permutation is needed.
    do {

        // If the cache exists and we are not at our height, then
        // just follow cache, else attempt to follow message.
        var cacheRes = cache[key];
        var messageRes = message[key];

        var nextPath = path;
        var nextDepth = depth + 1;
        if (updateRequestedPath) {
            requestedPath[requestIdx] = key;
        }

        // Cache does not exist but message does.
        if (cacheRes === undefined) {
            cacheRes = cache[key] = {};
        }

        // TODO: Can we hit a leaf node in the cache when traversing?

        if (messageRes !== undefined) {
            var nextIgnoreCount = ignoreCount;

            // TODO: Potential performance gain since we know that
            // references are always pathSets of 1, they can be evaluated
            // iteratively.

            // There is only a need to consider message references since the
            // merge is only for the path that is provided.
            if (messageRes && messageRes.$type === $ref && depth < path.length - 1) {
                nextDepth = 0;
                nextPath = catAndSlice(messageRes.value, path, depth + 1);
                cache[key] = clone(messageRes);

                // Reset position in message and cache.
                nextIgnoreCount = messageRes.value.length;
                messageRes = messageRoot;
                cacheRes = cacheRoot;
            }

            // move forward down the path progression.
            config.ignoreCount = nextIgnoreCount;
            merge(config, cacheRes, messageRes,
                  nextDepth, nextPath, cache, key);
            config.ignoreCount = ignoreCount;
        }

        // The second the incoming jsong must be fully qualified,
        // anything that is not will be materialized into the provided cache
        else {

            // do not materialize, continue down the cache.
            if (depth < path.length - 1) {
                merge(config, cacheRes, {}, nextDepth, nextPath, cache, key);
            }

            // materialize the node
            else {
                cache[key] = {$type: $atom};
            }
        }

        if (updateRequestedPath) {
            requestedPath.length = requestIdx;
        }

        // Are we done with the loop?
        key = iterateKeySet(outerKey, iteratorNote);
    } while (!iteratorNote.done);
}

},{"152":152,"196":196,"197":197,"198":198,"209":209}],164:[function(require,module,exports){
var iterateKeySet = require(152).iterateKeySet;
var cloneArray = require(198);
var catAndSlice = require(196);
var $types = require(209);
var $ref = $types.$ref;
var followReference = require(161);

/**
 * The fastest possible optimize of paths.
 *
 * What it does:
 * - Any atom short-circuit / found value will be removed from the path.
 * - All paths will be exploded which means that collapse will need to be
 *   ran afterwords.
 * - Any missing path will be optimized as much as possible.
 */
module.exports = function optimizePathSets(cache, paths, maxRefFollow) {
    var optimized = [];
    paths.forEach(function(p) {
        optimizePathSet(cache, cache, p, 0, optimized, [], maxRefFollow);
    });

    return optimized;
};


/**
 * optimizes one pathSet at a time.
 */
function optimizePathSet(cache, cacheRoot, pathSet,
                         depth, out, optimizedPath, maxRefFollow) {

    // at missing, report optimized path.
    if (cache === undefined) {
        out[out.length] = catAndSlice(optimizedPath, pathSet, depth);
        return;
    }

    // all other sentinels are short circuited.
    // Or we found a primitive (which includes null)
    if (cache === null || (cache.$type && cache.$type !== $ref) ||
            (typeof cache !== 'object')) {
        return;
    }

    // If the reference is the last item in the path then do not
    // continue to search it.
    if (cache.$type === $ref && depth === pathSet.length) {
        return;
    }

    var keySet = pathSet[depth];
    var nextDepth = depth + 1;
    var iteratorNote = {};
    var key, next, nextOptimized;

    key = iterateKeySet(keySet, iteratorNote);
    do {
        next = cache[key];
        var optimizedPathLength = optimizedPath.length;
        if (key !== null) {
            optimizedPath[optimizedPathLength] = key;
        }

        if (next && next.$type === $ref && nextDepth < pathSet.length) {
            var refResults =
                followReference(cacheRoot, next.value, maxRefFollow);
            next = refResults[0];

            // must clone to avoid the mutation from above destroying the cache.
            nextOptimized = cloneArray(refResults[1]);
        } else {
            nextOptimized = optimizedPath;
        }

        optimizePathSet(next, cacheRoot, pathSet, nextDepth,
                        out, nextOptimized, maxRefFollow);
        optimizedPath.length = optimizedPathLength;

        if (!iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }
    } while (!iteratorNote.done);
}


},{"152":152,"161":161,"196":196,"198":198,"209":209}],165:[function(require,module,exports){
var clone = require(197);
var types = require(209);
var $ref = types.$ref;
var iterateKeySet = require(152).iterateKeySet;

/**
 * merges pathValue into a cache
 */
module.exports = function pathValueMerge(cache, pathValue) {
    var refs = [];
    var values = [];
    var invalidations = [];

    // The invalidation case.  Needed for reporting
    // of call.
    if (pathValue.value === undefined) {
        invalidations.push({path: pathValue.path});
    }

    // References.  Needed for evaluationg suffixes in
    // both call and get/set.
    else if ((pathValue.value !== null) && (pathValue.value.$type === $ref)) {
        refs.push({
            path: pathValue.path,
            value: pathValue.value.value
        });
    }


    // Values.  Needed for reporting for call.
    else {
        values.push(pathValue);
    }

    if (invalidations.length === 0) {
        // Merges the values/refs/invs into the cache.
        innerPathValueMerge(cache, pathValue);
    }

    return {
        references: refs,
        values: values,
        invalidations: invalidations
    };
};

function innerPathValueMerge(cache, pathValue) {
    var path = pathValue.path;
    var curr = cache;
    var next, key, cloned, outerKey, iteratorNote;
    var i, len;

    for (i = 0, len = path.length - 1; i < len; ++i) {
        outerKey = path[i];

        // Setup the memo and the key.
        if (outerKey && typeof outerKey === 'object') {
            iteratorNote = {};
            key = iterateKeySet(outerKey, iteratorNote);
        } else {
            key = outerKey;
            iteratorNote = false;
        }

        do {
            next = curr[key];

            if (!next) {
                next = curr[key] = {};
            }

            if (iteratorNote) {
                innerPathValueMerge(
                    next, {
                        path: path.slice(i + 1),
                        value: pathValue.value
                    });

                if (!iteratorNote.done) {
                    key = iterateKeySet(outerKey, iteratorNote);
                }
            }

            else {
                curr = next;
            }
        } while (iteratorNote && !iteratorNote.done);

        // All memoized paths need to be stopped to avoid
        // extra key insertions.
        if (iteratorNote) {
            return;
        }
    }


    // TODO: This clearly needs a re-write.  I am just unsure of how i want
    // this to look.  Plus i want to measure performance.
    outerKey = path[i];

    iteratorNote = {};
    key = iterateKeySet(outerKey, iteratorNote);

    do {

        cloned = clone(pathValue.value);
        curr[key] = cloned;

        if (!iteratorNote.done) {
            key = iterateKeySet(outerKey, iteratorNote);
        }
    } while (!iteratorNote.done);
}

},{"152":152,"197":197,"209":209}],166:[function(require,module,exports){
/*eslint-disable*/
module.exports = {
    callJSONGraphWithouPaths: 'Any JSONG-Graph returned from call must have paths.',
    innerReferences: 'References with inner references are not allowed.',
    unknown: 'Unknown Error',
    routeWithSamePrecedence: 'Two routes cannot have the same precedence or path.',
    circularReference: 'There appears to be a circular reference, maximum reference following exceeded.'
};

},{}],167:[function(require,module,exports){
var isArray = Array.isArray;
module.exports = function convertPathKeyTo(onRange, onKey) {
    return function converter(keySet) {
        var isKeySet = typeof keySet === 'object';
        var out = [];

        // The keySet we determine what type is this keyset.
        if (isKeySet) {
            if (isArray(keySet)) {
                var reducer = null;
                keySet.forEach(function(key) {
                    if (typeof key === 'object') {
                        reducer = onRange(out, key, reducer);
                    }
                    else {
                        reducer = onKey(out, key, reducer);
                    }
                });
            }

            // What passed in is a range.
            else {
                onRange(out, keySet);
            }
        }

        // simple value for keyset.
        else {
            onKey(out, keySet);
        }

        return out;
    };
};

},{}],168:[function(require,module,exports){
var convertPathKeyTo = require(167);
var isNumber = require(201);
var rangeToArray = require(178);

function onRange(out, range) {
    var len = out.length - 1;
    rangeToArray(range).forEach(function(el) {
        out[++len] = el;
    });
}

function onKey(out, key) {
    if (isNumber(key)) {
        out[out.length] = key;
    }
}

/**
 * will attempt to get integers from the key
 * or keySet provided. assumes everything passed in is an integer
 * or range of integers.
 */
module.exports = convertPathKeyTo(onRange, onKey);

},{"167":167,"178":178,"201":201}],169:[function(require,module,exports){
var convertPathKeyTo = require(167);
var rangeToArray = require(178);

function onKey(out, key) {
    out[out.length] = key;
}

function onRange(out, range) {
    var len = out.length - 1;
    rangeToArray(range).forEach(function(el) {
        out[++len] = el;
    });
}

/**
 * will attempt to get integers from the key
 * or keySet provided. assumes everything passed in is an integer
 * or range of integers.
 */
module.exports = convertPathKeyTo(onRange, onKey);


},{"167":167,"178":178}],170:[function(require,module,exports){
var Keys = require(158);
var Precedence = require(159);
var cloneArray = require(198);
var specificMatcher = require(174);
var pluckIntegers = require(173);
var pathUtils = require(152);
var collapse = pathUtils.collapse;
var isRoutedToken = require(204);

var intTypes = [{
        type: Keys.ranges,
        precedence: Precedence.ranges
    }, {
        type: Keys.integers,
        precedence: Precedence.integers
    }];
var keyTypes = [{
        type: Keys.keys,
        precedence: Precedence.keys
    }];
var allTypes = intTypes.concat(keyTypes);
var get = 'get';
var set = 'set';
var call = 'call';

/**
 * Creates a custom matching function for the match tree.
 * @param Object rst The routed syntax tree
 * @param String method the method to call at the end of the path.
 * @return {matched: Array.<Match>, missingPaths: Array.<Array>}
 */
module.exports = function matcher(rst) {

    /**
     * This is where the matching is done.  Will recursively
     * match the paths until it has found all the matchable
     * functions.
     * @param {[]} paths
     */
    return function innerMatcher(method, paths) {
        var matched = [];
        var missing = [];
        match(rst, paths, method, matched, missing);

        // We are at the end of the path but there is no match and its a
        // call.  Therefore we are going to throw an informative error.
        if (method === call && matched.length === 0) {
            var err = new Error('function does not exist');
            err.throwToNext = true;

            throw err;
        }

        // Reduce into groups multiple matched routes into route sets where
        // each match matches the same route endpoint.  From here we can reduce
        // the matched paths into the most optimal pathSet with collapse.
        var reducedMatched = matched.reduce(function(acc, matchedRoute) {
            if (!acc[matchedRoute.id]) {
                acc[matchedRoute.id] = [];
            }
            acc[matchedRoute.id].push(matchedRoute);

            return acc;
        }, {});

        var collapsedMatched = [];

        // For every set of matched routes, collapse and reduce its matched set
        // down to the minimal amount of collapsed sets.
        Object.
            keys(reducedMatched).
            forEach(function(k) {
                var reducedMatch = reducedMatched[k];

                // If the reduced match is of length one then there is no
                // need to perform collapsing, as there is nothing to collapse
                // over.
                if (reducedMatch.length === 1) {
                    collapsedMatched.push(reducedMatch[0]);
                    return;
                }

                // Since there are more than 1 routes, we need to see if
                // they can collapse and alter the amount of arrays.
                var collapsedResults =
                        collapse(
                            reducedMatch.
                                map(function(x) {
                                    return x.requested;
                                }));

                // For every collapsed result we use the previously match result
                // and update its requested and virtual path.  Then add that
                // match to the collapsedMatched set.
                collapsedResults.forEach(function(path, i) {
                    var collapsedMatch = reducedMatch[i];
                    var reducedVirtualPath = collapsedMatch.virtual;
                    path.forEach(function(atom, index) {

                        // If its not a routed atom then wholesale replace
                        if (!isRoutedToken(reducedVirtualPath[index])) {
                            reducedVirtualPath[index] = atom;
                        }
                    });
                    collapsedMatch.requested = path;
                    collapsedMatched.push(reducedMatch[i]);
                });
            });
        return collapsedMatched;
    };
};

function match(
        curr, path, method, matchedFunctions,
        missingPaths, depth, requested, virtual, precedence) {

    // Nothing left to match
    if (!curr) {
        return;
    }

    /* eslint-disable no-param-reassign */
    depth = depth || 0;
    requested = requested || [];
    virtual = virtual || [];
    precedence = precedence || [];
    matchedFunctions = matchedFunctions || [];
    /* eslint-disable no-param-reassign */

    // At this point in the traversal we have hit a matching function.
    // Its time to terminate.
    // Get: simple method matching
    // Set/Call: The method is unique.  If the path is not complete,
    // meaning the depth is equivalent to the length,
    // then we match a 'get' method, else we match a 'set' or 'call' method.
    var atEndOfPath = path.length === depth;
    var isSet = method === set;
    var isCall = method === call;
    var methodToUse = method;
    if ((isCall || isSet) && !atEndOfPath) {
        methodToUse = get;
    }

    // Stores the matched result if found along or at the end of
    // the path.  If we are doing a set and there is no set handler
    // but there is a get handler, then we need to use the get
    // handler.  This is so that the current value that is in the
    // clients cache does not get materialized away.
    var currentMatch = curr[Keys.match];

    // From https://github.com/Netflix/falcor-router/issues/76
    // Set: When there is no set hander then we should default to running
    // the get handler so that we do not destroy the client local values.
    if (currentMatch && isSet && !currentMatch[set]) {
        methodToUse = get;
    }

    // Check to see if we have
    if (currentMatch && currentMatch[methodToUse]) {
        matchedFunctions[matchedFunctions.length] = {

            // Used for collapsing paths that use routes with multiple
            // string indexers.
            id: currentMatch[methodToUse + 'Id'],
            requested: cloneArray(requested),

            action: currentMatch[methodToUse],
            authorize: currentMatch.authorize,
            virtual: cloneArray(virtual),
            precedence: +(precedence.join('')),
            suffix: path.slice(depth),
            isSet: atEndOfPath && isSet,
            isCall: atEndOfPath && isCall
        };
    }

    var keySet = path[depth];
    var i, len, key, next;

    // -------------------------------------------
    // Specific key matcher.
    // -------------------------------------------
    var specificKeys = specificMatcher(keySet, curr);
    for (i = 0, len = specificKeys.length; i < len; ++i) {
        key = specificKeys[i];
        virtual[depth] = key;
        requested[depth] = key;
        precedence[depth] = Precedence.specific;

        // Its time to recurse
        match(
            curr[specificKeys[i]],
            path, method, matchedFunctions,
            missingPaths, depth + 1,
            requested, virtual, precedence);

        // Removes the virtual, requested, and precedence info
        virtual.length = depth;
        requested.length = depth;
        precedence.length = depth;
    }

    var ints = pluckIntegers(keySet);
    var keys = keySet;
    var intsLength = ints.length;

    // -------------------------------------------
    // ints, ranges, and keys matcher.
    // -------------------------------------------
    allTypes.
        filter(function(typeAndPrecedence) {
            var type = typeAndPrecedence.type;
            // one extra move required for int types
            if (type === Keys.integers || type === Keys.ranges) {
                return curr[type] && intsLength;
            }
            return curr[type];
        }).
        forEach(function(typeAndPrecedence) {
            var type = typeAndPrecedence.type;
            var prec = typeAndPrecedence.precedence;
            next = curr[type];

            virtual[depth] = {
                type: type,
                named: next[Keys.named],
                name: next[Keys.name]
            };

            // The requested set of info needs to be set either
            // as ints, if int matchers or keys
            if (type === Keys.integers || type === Keys.ranges) {
                requested[depth] = ints;
            } else {
                requested[depth] = keys;
            }

            precedence[depth] = prec;

            // Continue the matching algo.
            match(
                next,
                path, method, matchedFunctions,
                missingPaths, depth + 1,
                requested, virtual, precedence);

            // removes the added keys
            virtual.length = depth;
            requested.length = depth;
            precedence.length = depth;
        });
}

},{"152":152,"158":158,"159":159,"173":173,"174":174,"198":198,"204":204}],171:[function(require,module,exports){
var Keys = require(158);
var isArray = Array.isArray;
var isRoutedToken = require(204);
var isRange = require(203);

/**
 * Takes a matched and virtual atom and validates that they have an
 * intersection.
 */
module.exports = function hasAtomIntersection(matchedAtom, virtualAtom) {
    var virtualIsRoutedToken = isRoutedToken(virtualAtom);
    var isKeys = virtualIsRoutedToken && virtualAtom.type === Keys.keys;
    var matched = false;
    var i, len;

    // To simplify the algorithm we do not allow matched atom to be an
    // array.  This makes the intersection test very simple.
    if (isArray(matchedAtom)) {
        for (i = 0, len = matchedAtom.length; i < len && !matched; ++i) {
            matched = hasAtomIntersection(matchedAtom[i], virtualAtom);
        }
    }

    // the == is very intentional here with all the use cases review.
    else if (doubleEquals(matchedAtom, virtualAtom)) {
        matched = true;
    }

    // Keys match everything.
    else if (isKeys) {
        matched = true;
    }

    // The routed token is for integers at this point.
    else if (virtualIsRoutedToken) {
        matched = isNumber(matchedAtom) || isRange(matchedAtom);
    }

    // is virtual an array (last option)
    // Go through each of the array elements and compare against matched item.
    else if (isArray(virtualAtom)) {
        for (i = 0, len = virtualAtom.length; i < len && !matched; ++i) {
            matched = hasAtomIntersection(matchedAtom, virtualAtom[i]);
        }
    }

    return matched;
};

//
function isNumber(x) {
    return String(Number(x)) === String(x);
}

/**
 * This was very intentional ==.  The reason is that '1' must equal 1.
 * {} of anysort are always false and array ['one'] == 'one' but that is
 * fine because i would have to go through the array anyways at the
 * last elseif check.
 */
function doubleEquals(a, b) {
    return a == b; // eslint-disable-line eqeqeq
}

},{"158":158,"203":203,"204":204}],172:[function(require,module,exports){
var hasAtomIntersection = require(171);

/**
 * Checks to see if there is an intersection between the matched and
 * virtual paths.
 */
module.exports = function hasIntersection(matchedPath, virtualPath) {
    var intersection = true;

    // cycles through the atoms and ensure each one has an intersection.
    // only use the virtual path because it can be shorter than the full
    // matched path (since it includes suffix).
    for (var i = 0, len = virtualPath.length; i < len && intersection; ++i) {
        intersection = hasAtomIntersection(matchedPath[i], virtualPath[i]);
    }

    return intersection;
};

},{"171":171}],173:[function(require,module,exports){
var isArray = Array.isArray;
/**
 * plucks any integers from the path key.  Makes no effort
 * to convert the key into any specific format.
 */
module.exports = function pluckIntegers(keySet) {
    var ints = [];

    if (typeof keySet === 'object') {
        if (isArray(keySet)) {
            keySet.forEach(function(key) {
                // Range case
                if (typeof key === 'object') {
                    ints[ints.length] = key;
                }

                else if (!isNaN(+key)) {
                    ints[ints.length] = +key;
                }
            });
        }
        // Range case
        else {
            ints[ints.length] = keySet;
        }
    }

    else if (!isNaN(+keySet)) {
        ints[ints.length] = +keySet;
    }

    return ints;
};

},{}],174:[function(require,module,exports){
var iterateKeySet = require(152).iterateKeySet;

module.exports = function specificMatcher(keySet, currentNode) {
    // --------------------------------------
    // Specific key
    // --------------------------------------
    var iteratorNote = {};
    var nexts = [];

    var key = iterateKeySet(keySet, iteratorNote);
    do {

        if (currentNode[key]) {
            nexts[nexts.length] = key;
        }

        if (!iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }
    } while (!iteratorNote.done);

    return nexts;
};

},{"152":152}],175:[function(require,module,exports){
var convertPathKeyTo = require(167);
var isNumber = require(201);

function onRange(out, range) {
    out[out.length] = range;
}

/**
 * @param {Number|String} key must be a number
 */
function keyReduce(out, key, range) {
    if (!isNumber(key)) {
        return range;
    }

    /* eslint-disable no-param-reassign */
    key = +key;
    if (range) {
        if (key - 1 === range.to) {
            range.to = key;
        }

        else if (key + 1 === range.from) {
            range.from = key;
        }

        else {
            range = null;
        }
    }

    if (!range) {
        range = {to: key, from: key};
        out[out.length] = range;
    }
    /* eslint-enable no-param-reassign */

    return range;
}

module.exports = convertPathKeyTo(onRange, keyReduce);

},{"167":167,"201":201}],176:[function(require,module,exports){
/**
 * takes in a range and normalizes it to have a to / from
 */
module.exports = function normalize(range) {
    var from = range.from || 0;
    var to;
    if (typeof range.to === 'number') {
        to = range.to;
    } else {
        to = from + range.length - 1;
    }

    return {to: to, from: from};
};

},{}],177:[function(require,module,exports){
var normalize = require(176);

/**
 * warning:  This mutates the array of arrays.
 * It only converts the ranges to properly normalized ranges
 * so the rest of the algos do not have to consider it.
 */
module.exports = function normalizePathSets(path) {
    path.forEach(function(key, i) {
        // the algo becomes very simple if done recursively.  If
        // speed is needed, this is an easy optimization to make.
        if (Array.isArray(key)) {
            normalizePathSets(key);
        }

        else if (typeof key === 'object') {
            path[i] = normalize(path[i]);
        }
    });
    return path;
};

},{"176":176}],178:[function(require,module,exports){
module.exports = function onRange(range) {
    var out = [];
    var i = range.from;
    var to = range.to;
    var outIdx = out.length;
    for (; i <= to; ++i, ++outIdx) {
        out[outIdx] = i;
    }

    return out;
};

},{}],179:[function(require,module,exports){
var isArray = Array.isArray;
var stripFromArray = require(180);
var stripFromRange = require(181);

/**
 *  Takes a virtual atom and the matched atom and returns an
 * array of results that is relative complement with matchedAtom
 * as the rhs.  I believe the proper set syntax is virutalAtom \ matchedAtom.
 *
 * 1) An assumption made is that the matched atom and virtual atom have
 * an intersection.  This makes the algorithm easier since if the matched
 * atom is a primitive and the virtual atom is an object
 * then there is no relative complement to create.  This also means if
 * the direct equality test fails and matchedAtom is not an object
 * then virtualAtom is an object.  The inverse applies.
 *
 *
 * @param {String|Number|Array|Object} matchedAtom
 * @param {String|Number|Array|Object} virtualAtom
 * @return {Array} the tuple of what was matched and the relative complenment.
 */
module.exports = function strip(matchedAtom, virtualAtom) {
    var relativeComplement = [];
    var matchedResults;
    var typeOfMatched = typeof matchedAtom;
    var isArrayMatched = isArray(matchedAtom);
    var isObjectMatched = typeOfMatched === 'object';

    // Lets assume they are not objects  This covers the
    // string / number cases.
    if (matchedAtom === virtualAtom ||
       String(matchedAtom) === String(virtualAtom)) {

        matchedResults = [matchedAtom];
    }

    // See function comment 1)
    else if (!isObjectMatched) {
        matchedResults = [matchedAtom];
    }

    // Its a complex object set potentially.  Let the
    // subroutines handle the cases.
    else {
        var results;

        // The matchedAtom needs to reduced to everything that is not in
        // the virtualAtom.
        if (isArrayMatched) {
            results = stripFromArray(virtualAtom, matchedAtom);
            matchedResults = results[0];
            relativeComplement = results[1];
        } else {
            results = stripFromRange(virtualAtom, matchedAtom);
            matchedResults = results[0];
            relativeComplement = results[1];
        }
    }

    if (matchedResults.length === 1) {
        matchedResults = matchedResults[0];
    }

    return [matchedResults, relativeComplement];
};

},{"180":180,"181":181}],180:[function(require,module,exports){
var stripFromRange = require(181);
var Keys = require(158);
var isArray = Array.isArray;

/**
 * Takes a string, number, or RoutedToken and removes it from
 * the array.  The results are the relative complement of what
 * remains in the array.
 *
 * Don't forget: There was an intersection test performed but
 * since we recurse over arrays, we will get elements that do
 * not intersect.
 *
 * Another one is if its a routed token and a ranged array then
 * no work needs to be done as integers, ranges, and keys match
 * that token set.
 *
 * One more note.  When toStrip is an array, we simply recurse
 * over each key.  Else it requires a lot more logic.
 *
 * @param {Array|String|Number|RoutedToken} toStrip
 * @param {Array} array
 * @return {Array} the relative complement.
 */
module.exports = function stripFromArray(toStrip, array) {
    var complement;
    var matches = [];
    var typeToStrip = typeof toStrip;
    var isRangedArray = typeof array[0] === 'object';
    var isNumber = typeToStrip === 'number';
    var isString = typeToStrip === 'string';
    var isRoutedToken = !isNumber && !isString;
    var routeType = isRoutedToken && toStrip.type || false;
    var isKeys = routeType === Keys.keys;
    var toStripIsArray = isArray(toStrip);

    // The early break case.  If its a key, then there is never a
    // relative complement.
    if (isKeys) {
        complement = [];
        matches = array;
    }

    // Recurse over all the keys of the array.
    else if (toStripIsArray) {
        var currentArray = array;
        toStrip.forEach(function(atom) {
            var results = stripFromArray(atom, currentArray);
            if (results[0] !== undefined) { // eslint-disable-line no-undefined
                matches = matches.concat(results[0]);
            }
            currentArray = results[1];
        });
        complement = currentArray;
    }

    // The simple case, remove only the matching element from array.
    else if (!isRangedArray && !isRoutedToken) {
        matches = [toStrip];
        complement = array.filter(function(x) {
            return toStrip !== x;
        });
    }

    // 1: from comments above
    else if (isRangedArray && !isRoutedToken) {
        complement = array.reduce(function(comp, range) {
            var results = stripFromRange(toStrip, range);
            if (results[0] !== undefined) { // eslint-disable-line no-undefined
                matches = matches.concat(results[0]);
            }
            return comp.concat(results[1]);
        }, []);
    }

    // Strips elements based on routed token type.
    // We already matched keys above, so we only need to strip numbers.
    else if (!isRangedArray && isRoutedToken) {
        complement = array.filter(function(el) {
            var type = typeof el;
            if (type === 'number') {
                matches[matches.length] = el;
                return false;
            }
            return true;
        });
    }

    // The final complement is rangedArray with a routedToken,
    // relative complement is always empty.
    else {
        complement = [];
        matches = array;
    }

    return [matches, complement];
};

},{"158":158,"181":181}],181:[function(require,module,exports){
var isArray = Array.isArray;
var rangeToArray = require(178);
var isNumber = require(201);
/**
 *  Takes the first argument, toStrip, and strips it from
 * the range.  The output is an array of ranges that represents
 * the remaining ranges (relative complement)
 *
 * One note.  When toStrip is an array, we simply recurse
 * over each key.  Else it requires a lot more logic.
 *
 * Since we recurse array keys we are not guaranteed that each strip
 * item coming in is a string integer.  That is why we are doing an isNaN
 * check. consider: {from: 0, to: 1} and [0, 'one'] intersect at 0, but will
 * get 'one' fed into stripFromRange.
 *
 * @param {Array|String|Number|Object} argToStrip can be a string, number,
 * or a routed token.  Cannot be a range itself.
 * @param {Range} range
 * @return {Array.<Range>} The relative complement.
 */
module.exports = function stripFromRange(argToStrip, range) {
    var ranges = [];
    var matches = [];
    var toStrip = argToStrip;
    // TODO: More than likely a bug around numbers and stripping
    var toStripIsNumber = isNumber(toStrip);
    if (toStripIsNumber) {
        toStrip = +toStrip;
    }

    // Strip out NaNs
    if (!toStripIsNumber && typeof toStrip === 'string') {
        ranges = [range];
    }

    else if (isArray(toStrip)) {
        var currenRanges = [range];
        toStrip.forEach(function(atom) {
            var nextRanges = [];
            currenRanges.forEach(function(currentRename) {
                var matchAndComplement = stripFromRange(atom, currentRename);
                if (matchAndComplement[0] !== undefined) {
                    matches = matches.concat(matchAndComplement[0]);
                }

                nextRanges = nextRanges.concat(matchAndComplement[1]);
            });
            currenRanges = nextRanges;
        });

        ranges = currenRanges;
    }

    // The simple case, its just a number.
    else if (toStripIsNumber) {

        if (range.from < toStrip && toStrip < range.to) {
            ranges[0] = {
                from: range.from,
                to: toStrip - 1
            };
            ranges[1] = {
                from: toStrip + 1,
                to: range.to
            };
            matches = [toStrip];
        }

        // In case its a 0 length array.
        // Even though this assignment is redundant, its point is
        // to capture the intention.
        else if (range.from === toStrip && range.to === toStrip) {
            ranges = [];
            matches = [toStrip];
        }

        else if (range.from === toStrip) {
            ranges[0] = {
                from: toStrip + 1,
                to: range.to
            };
            matches = [toStrip];
        }

        else if (range.to === toStrip) {
            ranges[0] = {
                from: range.from,
                to: toStrip - 1
            };
            matches = [toStrip];
        }

        // return the range if no intersection.
        else {
            ranges = [range];
        }
    }

    // Its a routed token.  Everything is matched.
    else {
        matches = rangeToArray(range);
    }

    // If this is a routedToken (Object) then it will match the entire
    // range since its integers, keys, and ranges.
    return [matches, ranges];
};

},{"178":178,"201":201}],182:[function(require,module,exports){
var strip = require(179);
var catAndSlice = require(196);

/**
 * Takes in the matched path and virtual path and creates the
 * set of paths that represent the virtualPath being stripped
 * from the matchedPath.
 *
 * @example
 * Terms:
 * * Relative Complement: Of sets A and B the relative complement of A in B is
 * the parts of B that A do not contain.  In our example its virtualPath (A) in
 * matchedPath (B).
 *
 * Example:
 * matchedInput = [[A, D], [B, E], [C, F]]
 * virtualIntput = [A, Keys, C]
 *
 * This will produce 2 arrays from the matched operation.
 * [
 *   [D, [B, E], [C, F]],
 *   [A, [B, E], [F]]
 * ]
 *
 *
 * All the complexity of this function is hidden away in strip and its inner
 * stripping functions.
 * @param {PathSet} matchedPath
 * @param {PathSet} virtualPath
 */
module.exports = function stripPath(matchedPath, virtualPath) {
    var relativeComplement = [];
    var exactMatch = [];
    var current = [];

    // Always use virtual path because it can be shorter.
    for (var i = 0, len = virtualPath.length; i < len; ++i) {
        var matchedAtom = matchedPath[i];
        var virtualAtom = virtualPath[i];
        var stripResults = strip(matchedAtom, virtualAtom);
        var innerMatch = stripResults[0];
        var innerComplement = stripResults[1];
        var hasComplement = innerComplement.length > 0;

        // using the algorithm partially described above we need to split and
        // combine output depending on what comes out of the split function.
        // 1.  If there is no relative complement do no copying / slicing.
        // 2.  If there is both the catAndslice.

        if (hasComplement) {
            var flattendIC = innerComplement.length === 1 ?
                innerComplement[0] : innerComplement;
            current[i] = flattendIC;
            relativeComplement[relativeComplement.length] =
                catAndSlice(current, matchedPath, i + 1);
        }

        // The exact match needs to be produced for calling function.
        exactMatch[i] = innerMatch;
        current[i] = innerMatch;
    }

    return [exactMatch, relativeComplement];
};

},{"179":179,"196":196}],183:[function(require,module,exports){
var convertPathToRoute = require(184);
var isPathValue = require(202);
var slice = require(207);
var isArray = Array.isArray;

/**
 *   Creates the named variables and coerces it into its
 * virtual type.
 *
 * @param {Array} route - The route that produced this action wrapper
 * @private
 */
function createNamedVariables(route, action) {
    return function innerCreateNamedVariables(matchedPath) {
        var convertedArguments;
        var len = -1;
        var restOfArgs = slice(arguments, 1);
        var isJSONObject = !isArray(matchedPath);

        // A set uses a json object
        if (isJSONObject) {
            restOfArgs = [];
            convertedArguments = matchedPath;
        }

        // Could be an array of pathValues for a set operation.
        else if (isPathValue(matchedPath[0])) {
            convertedArguments = [];

            matchedPath.forEach(function(pV) {
                pV.path = convertPathToRoute(pV.path, route);
                convertedArguments[++len] = pV;
            });
        }

        // else just convert and assign
        else {
            convertedArguments =
                convertPathToRoute(matchedPath, route);
        }
        return action.apply(this, [convertedArguments].concat(restOfArgs));
    };
}
module.exports = createNamedVariables;

},{"184":184,"202":202,"207":207}],184:[function(require,module,exports){
// Disable eslint for import statements
/* eslint-disable max-len */
var Keys = require(158);
var convertPathKeyToRange = require(175);
var convertPathKeyToIntegers = require(168);
var convertPathKeyToKeys = require(169);
var isArray = Array.isArray;
/* eslint-enable max-len */

/**
 * takes the path that was matched and converts it to the
 * virtual path.
 */
module.exports = function convertPathToRoute(path, route) {
    var matched = [];
    // Always use virtual path since path can be longer since
    // it contains suffixes.
    for (var i = 0, len = route.length; i < len; ++i) {

        if (route[i].type) {
            var virt = route[i];
            switch (virt.type) {
                case Keys.ranges:
                    matched[i] =
                        convertPathKeyToRange(path[i]);
                    break;
                case Keys.integers:
                    matched[i] =
                        convertPathKeyToIntegers(path[i]);
                    break;
                case Keys.keys:
                    matched[i] =
                        convertPathKeyToKeys(path[i]);
                    break;
                default:
                    var err = new Error('Unknown route type.');
                    err.throwToNext = true;
                    break;
            }
            if (virt.named) {
                matched[virt.name] = matched[matched.length - 1];
            }
        }

        // Dealing with specific keys or array of specific keys.
        // If route has an array at this position, arrayify the
        // path[i] element.
        else {
            if (isArray(route[i]) && !isArray(path[i])) {
                matched[matched.length] = [path[i]];
            }

            else {
                matched[matched.length] = path[i];
            }
        }
    }

    return matched;
};



},{"158":158,"168":168,"169":169,"175":175}],185:[function(require,module,exports){
var Keys = require(158);
module.exports = function convertTypes(virtualPath) {
    virtualPath.route = virtualPath.route.map(function(key) {
        if (typeof key === 'object') {
            switch (key.type) {
                case 'keys':
                    key.type = Keys.keys;
                    break;
                case 'integers':
                    key.type = Keys.integers;
                    break;
                case 'ranges':
                    key.type = Keys.ranges;
                    break;
                default:
                    var err = new Error('Unknown route type.');
                    err.throwToNext = true;
                    break;
            }
        }
        return key;
    });
};

},{"158":158}],186:[function(require,module,exports){
var Keys = require(158);
var actionWrapper = require(183);
var pathSyntax = require(135);
var convertTypes = require(185);
var prettifyRoute = require(206);
var errors = require(166);
var cloneArray = require(198);
var ROUTE_ID = -3;

module.exports = function parseTree(routes) {
    var pTree = {};
    var parseMap = {};
    routes.forEach(function forEachRoute(route) {
        // converts the virtual string path to a real path with
        // extended syntax on.
        if (typeof route.route === 'string') {
            route.route = pathSyntax(route.route, true);
            convertTypes(route);
        }
        if (route.get) {
            route.getId = ++ROUTE_ID;
        }
        if (route.set) {
            route.setId = ++ROUTE_ID;
        }
        if (route.call) {
            route.callId = ++ROUTE_ID;
        }

        setHashOrThrowError(parseMap, route);
        buildParseTree(pTree, route, 0, []);
    });
    return pTree;
};

function buildParseTree(node, routeObject, depth) {

    var route = routeObject.route;
    var get = routeObject.get;
    var set = routeObject.set;
    var call = routeObject.call;
    var el = route[depth];

    el = !isNaN(+el) && +el || el;
    var isArray = Array.isArray(el);
    var i = 0;

    do {
        var value = el;
        var next;
        if (isArray) {
            value = value[i];
        }

        // There is a ranged token in this location with / without name.
        // only happens from parsed path-syntax paths.
        if (typeof value === 'object') {
            var routeType = value.type;
            next = decendTreeByRoutedToken(node, routeType, value);
        }

        // This is just a simple key.  Could be a ranged key.
        else {
            next = decendTreeByRoutedToken(node, value);

            // we have to create a falcor-router virtual object
            // so that the rest of the algorithm can match and coerse
            // when needed.
            if (next) {
                route[depth] = {type: value, named: false};
            }
            else {
                if (!node[value]) {
                    node[value] = {};
                }
                next = node[value];
            }
        }

        // Continue to recurse or put get/set.
        if (depth + 1 === route.length) {

            // Insert match into routeSyntaxTree
            var matchObject = next[Keys.match] || {};
            if (!next[Keys.match]) {
                next[Keys.match] = matchObject;
            }

            if (get) {
                matchObject.get = actionWrapper(route, get);
                matchObject.getId = routeObject.getId;
            }
            if (set) {
                matchObject.set = actionWrapper(route, set);
                matchObject.setId = routeObject.setId;
            }
            if (call) {
                matchObject.call = actionWrapper(route, call);
                matchObject.callId = routeObject.callId;
            }
        } else {
            buildParseTree(next, routeObject, depth + 1);
        }

    } while (isArray && ++i < el.length);
}

/**
 * ensure that two routes of the same precedence do not get
 * set in.
 */
function setHashOrThrowError(parseMap, routeObject) {
    var route = routeObject.route;
    var get = routeObject.get;
    var set = routeObject.set;
    var call = routeObject.call;

    getHashesFromRoute(route).
        map(function mapHashToString(hash) { return hash.join(','); }).
        forEach(function forEachRouteHash(hash) {
            if (get && parseMap[hash + 'get'] ||
                set && parseMap[hash + 'set'] ||
                    call && parseMap[hash + 'call']) {
                throw new Error(errors.routeWithSamePrecedence + ' ' +
                               prettifyRoute(route));
            }
            if (get) {
                parseMap[hash + 'get'] = true;
            }
            if (set) {
                parseMap[hash + 'set'] = true;
            }
            if (call) {
                parseMap[hash + 'call'] = true;
            }
        });
}

/**
 * decends the rst and fills in any naming information at the node.
 * if what is passed in is not a routed token identifier, then the return
 * value will be null
 */
function decendTreeByRoutedToken(node, value, routeToken) {
    var next = null;
    switch (value) {
        case Keys.keys:
        case Keys.integers:
        case Keys.ranges:
            next = node[value];
            if (!next) {
                next = node[value] = {};
            }
            break;
        default:
            break;
    }
    if (next && routeToken) {
        // matches the naming information on the node.
        next[Keys.named] = routeToken.named;
        next[Keys.name] = routeToken.name;
    }

    return next;
}

/**
 * creates a hash of the virtual path where integers and ranges
 * will collide but everything else is unique.
 */
function getHashesFromRoute(route, depth, hashes, hash) {
    /*eslint-disable no-func-assign, no-param-reassign*/
    depth = depth || 0;
    hashes = hashes || [];
    hash = hash || [];
    /*eslint-enable no-func-assign, no-param-reassign*/

    var routeValue = route[depth];
    var isArray = Array.isArray(routeValue);
    var length = isArray && routeValue.length || 0;
    var idx = 0;
    var value;

    if (typeof routeValue === 'object' && !isArray) {
        value = routeValue.type;
    }

    else if (!isArray) {
        value = routeValue;
    }

    do {
        if (isArray) {
            value = routeValue[idx];
        }

        if (value === Keys.integers || value === Keys.ranges) {
            hash[depth] = '__I__';
        }

        else if (value === Keys.keys) {
            hash[depth] ='__K__';
        }

        else {
            hash[depth] = value;
        }

        // recurse down the routed token
        if (depth + 1 !== route.length) {
            getHashesFromRoute(route, depth + 1, hashes, hash);
        }

        // Or just add it to hashes
        else {
            hashes.push(cloneArray(hash));
        }
    } while (isArray && ++idx < length);

    return hashes;
}


},{"135":135,"158":158,"166":166,"183":183,"185":185,"198":198,"206":206}],187:[function(require,module,exports){
var isJSONG = require(199);
var outputToObservable = require(189);
var noteToJsongOrPV = require(188);
var errors = require(166);
var mCGRI = require(191);
var Observable = require(219).Observable;

module.exports =  outerRunCallAction;

function outerRunCallAction(routerInstance, callPath, args,
                            suffixes, paths, jsongCache) {
    return function innerRunCallAction(matchAndPath) {
        return runCallAction(matchAndPath, routerInstance, callPath,
                             args, suffixes, paths, jsongCache);
    };
}

function runCallAction(matchAndPath, routerInstance, callPath, args,
                       suffixes, paths, jsongCache) {

    var match = matchAndPath.match;
    var matchedPath = matchAndPath.path;
    var out;

    // We are at out destination.  Its time to get out
    // the pathValues from the
    if (match.isCall) {

        // This is where things get interesting
        out = Observable.
            defer(function() {
            var next;
                try {
                    next = match.
                        action.call(
                            routerInstance, matchedPath, args, suffixes, paths);
                } catch (e) {
                    e.throwToNext = true;
                    throw e;
                }
                return outputToObservable(next).
                    toArray();
            }).

            // Required to get the references from the outputting jsong
            // and pathValues.
            map(function(res) {
                // checks call for isJSONG and if there is jsong without paths
                // throw errors.
                var refs = [];
                var values = [];

                // Will flatten any arrays of jsong/pathValues.
                var callOutput = res.reduce(function(flattenedRes, next) {
                    return flattenedRes.concat(next);
                }, []);

                var refLen = -1;
                callOutput.forEach(function(r) {

                    // its json graph.
                    if (isJSONG(r)) {

                        // This is a hard error and must fully stop the server
                        if (!r.paths) {
                            var err =
                                new Error(errors.callJSONGraphWithouPaths);
                            err.throwToNext = true;
                            throw err;
                        }
                    }

                });

                var invsRefsAndValues = mCGRI(jsongCache, callOutput);
                invsRefsAndValues.references.forEach(function(ref) {
                    refs[++refLen] = ref;
                });

                values = invsRefsAndValues.values.map(function(pv) {
                    return pv.path;
                });

                var callLength = callOutput.length;
                var callPathSave1 = callPath.slice(0, callPath.length - 1);
                var hasSuffixes = suffixes && suffixes.length;
                var hasPaths = paths && paths.length;

                // We are going to use recurseMatchAndExecute to run
                // the paths and suffixes for call.  For that to happen
                // we must send a message to the outside to switch from
                // call to get.
                callOutput[++callLength] = {isMessage: true, method: 'get'};

                // If there are paths to add then push them into the next
                // paths through 'additionalPaths' message.
                if (hasPaths && (callLength + 1)) {
                    paths.forEach(function(path) {
                        callOutput[++callLength] = {
                            isMessage: true,
                            additionalPath: callPathSave1.concat(path)
                        };
                    });
                }

                // Suffix is the same as paths except for how to calculate
                // a path per reference found from the callPath.
                if (hasSuffixes) {

                    // matchedPath is the optimized path to call.
                    // e.g:
                    // callPath: [genreLists, 0, add] ->
                    // matchedPath: [lists, 'abc', add]
                    var optimizedPathLength = matchedPath.length - 1;

                    // For every reference build the complete path
                    // from the callPath - 1 and concat remaining
                    // path from the PathReference (path is where the
                    // reference was found, not the value of the reference).
                    // e.g: from the above example the output is:
                    // output = {path: [lists, abc, 0], value: [titles, 123]}
                    //
                    // This means the refs object = [output];
                    // callPathSave1: [genreLists, 0],
                    // optimizedPathLength: 3 - 1 = 2
                    // ref.path.slice(2): [lists, abc, 0].slice(2) = [0]
                    // deoptimizedPath: [genreLists, 0, 0]
                    //
                    // Add the deoptimizedPath to the callOutput messages.
                    // This will make the outer expand run those as a 'get'
                    refs.forEach(function(ref) {
                        var deoptimizedPath = callPathSave1.concat(
                                ref.path.slice(optimizedPathLength));
                        suffixes.forEach(function(suffix) {
                            var additionalPath =
                                deoptimizedPath.concat(suffix);
                            callOutput[++callLength] = {
                                isMessage: true,
                                additionalPath: additionalPath
                            };
                        });
                    });
                }

                // If there are no suffixes but there are references, report
                // the paths to the references.  There may be values as well,
                // add those to the output.
                if (refs.length && !hasSuffixes || values.length) {
                    var additionalPaths = [];
                    if (refs.length && !hasSuffixes) {
                        additionalPaths = refs.
                            map(function(x) { return x.path; });
                    }
                    additionalPaths.
                        concat(values).
                        forEach(function(path) {
                            callOutput[++callLength] = {
                                isMessage: true,
                                additionalPath: path
                            };
                        });
                }

                return callOutput;
            }).

            // When call has an error it needs to be propagated to the next
            // level instead of onCompleted'ing
            do(null, function(e) {
                e.throwToNext = true;
                throw e;
            });
    } else {
        out = match.action.call(routerInstance, matchAndPath.path);
        out = outputToObservable(out);
    }

    return out.
        materialize().
        filter(function(note) {
            return note.kind !== 'C';
        }).
        map(noteToJsongOrPV(matchAndPath));
}

},{"166":166,"188":188,"189":189,"191":191,"199":199,"219":219}],188:[function(require,module,exports){
var isJSONG = require(199);
var JSONGraphError = require(157);
var onNext = 'N';

module.exports = function noteToJsongOrPV(match) {
    return function(note) {
        return convertNoteToJsongOrPV(match, note);
    };
};

function convertNoteToJsongOrPV(matchAndPath, note) {
    var incomingJSONGOrPathValues;
    var kind = note.kind;

    if (kind === onNext) {
        incomingJSONGOrPathValues = note.value;
    }

    else {
        var typeValue = {
            $type: 'error',
            value: {}
        };
        var exception = {};

        // Rx3, what will this be called?
        if (note.exception) {
            exception = note.exception;
        }

        if (exception.throwToNext) {
            throw exception;
        }

        // If it is a special JSONGraph error then pull all the data
        if (exception instanceof JSONGraphError) {
            typeValue = exception.typeValue;
        }

        else if (exception instanceof Error) {
            typeValue.value.message = exception.message;
        }

        incomingJSONGOrPathValues = {
            path: matchAndPath.path,
            value: typeValue
        };
    }

    // If its jsong we may need to optionally attach the
    // paths if the paths do not exist
    if (isJSONG(incomingJSONGOrPathValues) &&
        !incomingJSONGOrPathValues.paths) {

        incomingJSONGOrPathValues = {
            jsonGraph: incomingJSONGOrPathValues.jsonGraph,
            paths: [matchAndPath.path]
        };
    }

    return [matchAndPath.match, incomingJSONGOrPathValues];
}


},{"157":157,"199":199}],189:[function(require,module,exports){
var Observable = require(219).Observable;
var isArray = Array.isArray;

/**
 * For the router there are several return types from user
 * functions.  The standard set are: synchronous type (boolean or
 * json graph) or an async type (observable or a thenable).
 */
module.exports = function outputToObservable(valueOrObservable) {
    var value = valueOrObservable,
        oldObservable;

    // place holder.  Observables have highest precedence.
    if (value.subscribe) {
        if (!(value instanceof Observable)) {
            oldObservable = value;
            value = Observable.create(function(observer) {
                var sub = oldObservable.subscribe(observer);
                return function() {
                    sub.dispose();
                }
            });
        }
    }

    // promise
    else if (value.then) {
        value = Observable.fromPromise(value);
    }

    // from array of pathValues.
    else if (isArray(value)) {
        value = Observable.of(value);
    }

    // this will be jsong or pathValue at this point.
    // NOTE: For the case of authorize this will be a boolean
    else {
        value = Observable.of(value);
    }

    return value;
};

},{"219":219}],190:[function(require,module,exports){
var outputToObservable = require(189);
var noteToJsongOrPV = require(188);
var Observable = require(219).Observable;

module.exports = function runGetAction(routerInstance, jsongCache) {
    return function innerGetAction(matchAndPath) {
        return getAction(routerInstance, matchAndPath, jsongCache);
    };
};

function getAction(routerInstance, matchAndPath, jsongCache) {
    var match = matchAndPath.match;
    var out;
    try {
        out = match.action.call(routerInstance, matchAndPath.path);
        out = outputToObservable(out);
    } catch (e) {
        out = Observable.throw(e);
    }

    return out.
        materialize().
        filter(function(note) {
            return note.kind !== 'C';
        }).
        map(noteToJsongOrPV(matchAndPath));
}


},{"188":188,"189":189,"219":219}],191:[function(require,module,exports){
var jsongMerge = require(163);
var pathValueMerge = require(165);
var isJSONG = require(199);
var isMessage = require(200);
module.exports = mergeCacheAndGatherRefsAndInvalidations;

/**
 * takes the response from an action and merges it into the
 * cache.  Anything that is an invalidation will be added to
 * the first index of the return value, and the inserted refs
 * are the second index of the return value.  The third index
 * of the return value is messages from the action handlers
 *
 * @param {Object} cache
 * @param {Array} jsongOrPVs
 */
function mergeCacheAndGatherRefsAndInvalidations(cache, jsongOrPVs) {
    var references = [];
    var len = -1;
    var invalidations = [];
    var messages = [];
    var values = [];

    jsongOrPVs.forEach(function(jsongOrPV) {
        var refsAndValues = [];

        if (isMessage(jsongOrPV)) {
            messages[messages.length] = jsongOrPV;
        }

        else if (isJSONG(jsongOrPV)) {
            refsAndValues = jsongMerge(cache, jsongOrPV);
        }

        // Last option are path values.
        else {
            refsAndValues = pathValueMerge(cache, jsongOrPV);
        }

        var refs = refsAndValues.references;
        var vals = refsAndValues.values;
        var invs = refsAndValues.invalidations;

        if (vals && vals.length) {
            values = values.concat(vals);
        }

        if (invs && invs.length) {
            invalidations = invalidations.concat(invs);
        }

        if (refs && refs.length) {
            refs.forEach(function(ref) {
                references[++len] = ref;
            });
        }
    });

    return {
        invalidations: invalidations,
        references: references,
        messages: messages,
        values: values
    };
}

},{"163":163,"165":165,"199":199,"200":200}],192:[function(require,module,exports){
/* eslint-disable max-len */
var pathUtils = require(152);
var collapse = pathUtils.collapse;
var stripPath = require(182);
var hasIntersection = require(172);
/* eslint-enable max-len */

/**
 * takes in the set of ordered matches and pathSet that got those matches.
 * From there it will give back a list of matches to execute.
 */
module.exports = function getExecutableMatches(matches, pathSet) {
    var remainingPaths = pathSet;
    var matchAndPaths = [];
    for (var i = 0; i < matches.length && remainingPaths.length > 0; ++i) {
        var availablePaths = remainingPaths;
        var match = matches[i];

        remainingPaths = [];

        if (i > 0) {
            availablePaths = collapse(availablePaths);
        }

        // For every available path attempt to intersect.  If there
        // is an intersection then strip and replace.
        // any relative complements, add to remainingPaths
        for (var j = 0; j < availablePaths.length; ++j) {
            var path = availablePaths[j];
            if (hasIntersection(path, match.virtual)) {
                var stripResults = stripPath(path, match.virtual);
                matchAndPaths[matchAndPaths.length] = {
                    path: stripResults[0],
                    match: match
                };
                remainingPaths = remainingPaths.concat(stripResults[1]);
            }
        }
    }

    return matchAndPaths;
};


},{"152":152,"172":172,"182":182}],193:[function(require,module,exports){
var Observable = require(219).Observable;
var getExecutableMatches = require(192);

/**
 * Sorts and strips the set of available matches given the pathSet.
 */
module.exports = function runByPrecedence(pathSet, matches, actionRunner) {

    // Precendence matching
    var sortedMatches = matches.
        sort(function(a, b) {
            if (a.precedence < b.precedence) {
                return 1;
            } else if (a.precedence > b.precedence) {
                return -1;
            }

            return 0;
        });

    var matchesWithPaths = getExecutableMatches(sortedMatches, [pathSet]);
    return Observable.
        from(matchesWithPaths).
        flatMap(actionRunner).

        // Note: We do not wait for each observable to finish,
        // but repeat the cycle per onNext.
        map(function(actionTuple) {

            return {
                match: actionTuple[0],
                value: actionTuple[1]
            };
        });
};

},{"192":192,"219":219}],194:[function(require,module,exports){
var Rx = require(219);
var Observable = Rx.Observable;
var runByPrecedence = require(193);
var pathUtils = require(152);
var collapse = pathUtils.collapse;
var optimizePathSets = require(164);
var mCGRI = require(191);
var isArray = Array.isArray;

/**
 * The recurse and match function will async recurse as long as
 * there are still more paths to be executed.  The match function
 * will return a set of objects that have how much of the path that
 * is matched.  If there still is more, denoted by suffixes,
 * paths to be matched then the recurser will keep running.
 */
module.exports = function recurseMatchAndExecute(
        match, actionRunner, paths,
        method, routerInstance, jsongCache) {

    return _recurseMatchAndExecute(
        match, actionRunner, paths,
        method, routerInstance, jsongCache);
};

/**
 * performs the actual recursing
 */
function _recurseMatchAndExecute(
        match, actionRunner, paths,
        method, routerInstance, jsongCache) {
    var missing = [];
    var invalidated = [];
    var reportedPaths = [];
    var currentMethod = method;

    return Observable.

        // Each pathSet (some form of collapsed path) need to be sent
        // independently.  for each collapsed pathSet will, if producing
        // refs, be the highest likelihood of collapsibility.
        from(paths).
        expand(function(nextPaths) {
            if (!nextPaths.length) {
                return Observable.empty();
            }

            // We have to return an Observable of error instead of just
            // throwing.
            var matchedResults;
            try {
                matchedResults = match(currentMethod, nextPaths);
            } catch (e) {
                return Observable.throw(e);
            }

            if (!matchedResults.length) {
                return Observable.empty();
            }

            return runByPrecedence(nextPaths, matchedResults, actionRunner).

                // Generate from the combined results the next requestable paths
                // and insert errors / values into the cache.
                flatMap(function(results) {
                    var value = results.value;
                    var suffix = results.match.suffix;

                    if (!isArray(value)) {
                        value = [value];
                    }
                    var invsRefsAndValues = mCGRI(jsongCache, value);
                    var invalidations = invsRefsAndValues.invalidations;
                    var messages = invsRefsAndValues.messages;
                    var pathsToExpand = [];

                    if (suffix.length > 0) {
                        pathsToExpand = invsRefsAndValues.references;
                    }

                    invalidations.forEach(function(invalidation) {
                        invalidated[invalidated.length] = invalidation.path;
                    });

                    // Merges the remaining suffix with remaining nextPaths
                    pathsToExpand = pathsToExpand.map(function(next) {
                        return next.value.concat(suffix);
                    });

                    // Alters the behavior of the expand
                    messages.forEach(function(message) {
                        // mutates the method type for the matcher
                        if (message.method) {
                            currentMethod = message.method;
                        }

                        // Mutates the nextPaths and adds any additionalPaths
                        else if (message.additionalPath) {
                            var path = message.additionalPath;
                            pathsToExpand[pathsToExpand.length] = path;
                            reportedPaths[reportedPaths.length] = path;
                        }

                        // Any invalidations that come down from a call
                        else if (message.invalidations) {
                            message.
                                invalidations.
                                forEach(function(invalidation) {
                                    invalidated.push(invalidation);
                                });
                        }
                    });

                    // Explodes and collapse the tree to remove
                    // redundants and get optimized next set of
                    // paths to evaluate.
                    pathsToExpand = optimizePathSets(
                        jsongCache, pathsToExpand, routerInstance.maxRefFollow);

                    if (pathsToExpand.length) {
                        pathsToExpand = collapse(pathsToExpand);
                    }

                    return Observable.
                        from(pathsToExpand);
                }).
                defaultIfEmpty([]);

        }).
        reduce(function(acc, x) {
            return acc;
        }, null).
        map(function() {
            return {
                missing: missing,
                invalidated: invalidated,
                jsonGraph: jsongCache,
                reportedPaths: reportedPaths
            };
        });
}


},{"152":152,"164":164,"191":191,"193":193,"219":219}],195:[function(require,module,exports){
/* eslint-disable max-len */
var outputToObservable = require(189);
var noteToJsongOrPV = require(188);
var spreadPaths = require(208);
var getValue = require(162);
var jsongMerge = require(163);
var optimizePathSets = require(164);
var hasIntersection = require(172);
var pathValueMerge = require(165);
var Observable = require(219).Observable;
/* eslint-enable max-len */

module.exports = function outerRunSetAction(routerInstance, modelContext,
                                            jsongCache) {
    return function innerRunSetAction(matchAndPath) {
        return runSetAction(routerInstance, modelContext,
                            matchAndPath, jsongCache);
    };
};

function runSetAction(routerInstance, jsongMessage, matchAndPath, jsongCache) {
    var match = matchAndPath.match;
    var out;
    var arg = matchAndPath.path;

    // We are at out destination.  Its time to get out
    // the pathValues from the
    if (match.isSet) {
        var paths = spreadPaths(jsongMessage.paths);

        // We have to ensure that the paths maps in order
        // to the optimized paths array.
        var optimizedPathsAndPaths =
            paths.
                // Optimizes each path.
                map(function(path) {
                    return [optimizePathSets(
                        jsongCache, [path], routerInstance.maxRefFollow)[0],
                        path];
                }).
                // only includes the paths from the set that intersect
                // the virtual path
                filter(function(optimizedAndPath) {
                    return optimizedAndPath[0] &&
                        hasIntersection(optimizedAndPath[0], match.virtual);
                });
        var optimizedPaths = optimizedPathsAndPaths.map(function(opp) {
            return opp[0];
        });
        var subSetPaths = optimizedPathsAndPaths.map(function(opp) {
            return opp[1];
        });
        var tmpJsonGraph = subSetPaths.
            reduce(function(json, path, i) {
                pathValueMerge(json, {
                    path: optimizedPaths[i],
                    value: getValue(jsongMessage.jsonGraph, path)
                });
                return json;
            }, {});

        // Takes the temporary JSONGraph, attaches only the matched paths
        // then creates the subset json and assigns it to the argument to
        // the set function.
        var subJsonGraphEnv = {
            jsonGraph: tmpJsonGraph,
            paths: [match.requested]
        };
        arg = {};
        jsongMerge(arg, subJsonGraphEnv);
    }
    try {
        out = match.action.call(routerInstance, arg);
        out = outputToObservable(out);
    } catch (e) {
        out = Observable.throw(e);
    }

    return out.
        materialize().
        filter(function(note) {
            return note.kind !== 'C';
        }).
        map(noteToJsongOrPV(matchAndPath));
}

},{"162":162,"163":163,"164":164,"165":165,"172":172,"188":188,"189":189,"208":208,"219":219}],196:[function(require,module,exports){
module.exports = function catAndSlice(a, b, slice) {
    var next = [], i, j, len;
    for (i = 0, len = a.length; i < len; ++i) {
        next[i] = a[i];
    }

    for (j = slice || 0, len = b.length; j < len; ++j, ++i) {
        next[i] = b[j];
    }

    return next;
};

},{}],197:[function(require,module,exports){
module.exports = function copy(valueType) {
    if ((typeof valueType !== 'object') || (valueType === null)) {
        return valueType;
    }

    return Object.
        keys(valueType).
        reduce(function(acc, k) {
            acc[k] = valueType[k];
            return acc;
        }, {});
};


},{}],198:[function(require,module,exports){
function cloneArray(arr, index) {
    var a = [];
    var len = arr.length;
    for (var i = index || 0; i < len; i++) {
        a[i] = arr[i];
    }
    return a;
}

module.exports = cloneArray;

},{}],199:[function(require,module,exports){
module.exports = function isJSONG(x) {
    return x.jsonGraph;
};

},{}],200:[function(require,module,exports){
module.exports = function isMessage(output) {
    return output.hasOwnProperty('isMessage');
};

},{}],201:[function(require,module,exports){
/**
 * Will determine of the argument is a number.
 *
 * '1' returns true
 * 1 returns true
 * [1] returns false
 * null returns false
 * @param {*} x
 */
module.exports = function(x) {
    return String(Number(x)) === String(x) && typeof x !== 'object';
};

},{}],202:[function(require,module,exports){
module.exports = function(x) {
    return x.hasOwnProperty('path') && x.hasOwnProperty('value');
};

},{}],203:[function(require,module,exports){
module.exports = function isRange(range) {
    return range.hasOwnProperty('to') && range.hasOwnProperty('from');
};

},{}],204:[function(require,module,exports){
/**
 * Determines if the object is a routed token by hasOwnProperty
 * of type and named
 */
module.exports = function isRoutedToken(obj) {
    return obj.hasOwnProperty('type') && obj.hasOwnProperty('named');
};

},{}],205:[function(require,module,exports){
module.exports = String.fromCharCode(30);


},{}],206:[function(require,module,exports){
var Keys = require(158);

/**
 * beautify the virtual path, meaning paths with virtual keys will
 * not be displayed as a stringified object but instead as a string.
 *
 * @param {Array} route -
 */
module.exports = function prettifyRoute(route) {
    var length = 0;
    var str = [];
    for (var i = 0, len = route.length; i < len; ++i, ++length) {
        var value = route[i];
        if (typeof value === 'object') {
            value = value.type;
        }

        if (value === Keys.integers) {
            str[length] = 'integers';
        }

        else if (value === Keys.ranges) {
            str[length] = 'ranges';
        }

        else if (value === Keys.keys) {
            str[length] = 'keys';
        }

        else {
            if (Array.isArray(value)) {
                str[length] = JSON.stringify(value);
            }

            else {
                str[length] = value;
            }
        }
    }

    return str;
}

},{"158":158}],207:[function(require,module,exports){
module.exports = function slice(args, index) {
    var len = args.length;
    var out = [];
    var j = 0;
    var i = index;
    while (i < len) {
        out[j] = args[i];
        ++i;
        ++j;
    }
    return out;
};

},{}],208:[function(require,module,exports){
var iterateKeySet = require(152).iterateKeySet;
var cloneArray = require(198);

/**
 * Takes in a ptahSet and will create a set of simple paths.
 * @param {Array} paths
 */
module.exports = function spreadPaths(paths) {
    var allPaths = [];
    paths.forEach(function(x) {
        _spread(x, 0, allPaths);
    });

    return allPaths;
};

function _spread(pathSet, depth, out, currentPath) {

    /* eslint-disable no-param-reassign */
    currentPath = currentPath || [];
    /* eslint-enable no-param-reassign */

    if (depth === pathSet.length) {
        out[out.length] = cloneArray(currentPath);
        return;
    }

    // Simple case
    var key = pathSet[depth];
    if (typeof key !== 'object') {
        currentPath[depth] = key;
        _spread(pathSet, depth + 1, out, currentPath);
        return;
    }

    // complex key.
    var iteratorNote = {};
    var innerKey = iterateKeySet(key, iteratorNote);
    do {
        // spreads the paths
        currentPath[depth] = innerKey;
        _spread(pathSet, depth + 1, out, currentPath);
        currentPath.length = depth;

        innerKey = iterateKeySet(key, iteratorNote);
    } while (!iteratorNote.done);
}

},{"152":152,"198":198}],209:[function(require,module,exports){
module.exports = {
    $ref: 'ref',
    $atom: 'atom',
    $error: 'error'
};

},{}],210:[function(require,module,exports){
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
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
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

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],211:[function(require,module,exports){
'use strict';

module.exports = require(216)

},{"216":216}],212:[function(require,module,exports){
'use strict';

var asap = require(125);

function noop() {}

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
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('not a function');
  }
  this._37 = 0;
  this._12 = null;
  this._59 = [];
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._99 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
};
function handle(self, deferred) {
  while (self._37 === 3) {
    self = self._12;
  }
  if (self._37 === 0) {
    self._59.push(deferred);
    return;
  }
  asap(function() {
    var cb = self._37 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._37 === 1) {
        resolve(deferred.promise, self._12);
      } else {
        reject(deferred.promise, self._12);
      }
      return;
    }
    var ret = tryCallOne(cb, self._12);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._37 = 3;
      self._12 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._37 = 1;
  self._12 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._37 = 2;
  self._12 = newValue;
  finale(self);
}
function finale(self) {
  for (var i = 0; i < self._59.length; i++) {
    handle(self, self._59[i]);
  }
  self._59 = null;
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
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
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  })
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}

},{"125":125}],213:[function(require,module,exports){
'use strict';

var Promise = require(212);

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};

},{"212":212}],214:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require(212);

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._99);
  p._37 = 1;
  p._12 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._37 === 3) {
            val = val._12;
          }
          if (val._37 === 1) return res(i, val._12);
          if (val._37 === 2) reject(val._12);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

},{"212":212}],215:[function(require,module,exports){
'use strict';

var Promise = require(212);

module.exports = Promise;
Promise.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};

},{"212":212}],216:[function(require,module,exports){
'use strict';

module.exports = require(212);
require(213);
require(215);
require(214);
require(217);

},{"212":212,"213":213,"214":214,"215":215,"217":217}],217:[function(require,module,exports){
'use strict';

// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise = require(212);
var asap = require(124);

module.exports = Promise;

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity;
  return function () {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 0,
        argumentCount > 0 ? argumentCount : 0);
    return new Promise(function (resolve, reject) {
      args.push(function (err, res) {
        if (err) reject(err);
        else resolve(res);
      })
      var res = fn.apply(self, args);
      if (res &&
        (
          typeof res === 'object' ||
          typeof res === 'function'
        ) &&
        typeof res.then === 'function'
      ) {
        resolve(res);
      }
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap(function () {
          callback.call(ctx, ex);
        })
      }
    }
  }
}

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this;

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
}

},{"124":124,"212":212}],218:[function(require,module,exports){
(function (global){
// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

;(function (factory) {
    var objectTypes = {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
    };

    var root = (objectTypes[typeof window] && window) || this,
        freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
        freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
        moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
        freeGlobal = objectTypes[typeof global] && global;

    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
        root = freeGlobal;
    }

    // Because of build optimizers
    if (typeof define === 'function' && define.amd) {
        define(['rx'], function (Rx, exports) {
            return factory(root, exports, Rx);
        });
    } else if (typeof module === 'object' && module && module.exports === freeExports) {
        module.exports = factory(root, module.exports, require(220));
    } else {
        root.Rx = factory(root, {}, root.Rx);
    }
}.call(this, function (root, exp, Rx, undefined) {

  // References
  var Observable = Rx.Observable,
    observableProto = Observable.prototype,
    CompositeDisposable = Rx.CompositeDisposable,
    AnonymousObservable = Rx.AnonymousObservable,
    disposableEmpty = Rx.Disposable.empty,
    isEqual = Rx.internals.isEqual,
    helpers = Rx.helpers,
    not = helpers.not,
    defaultComparer = helpers.defaultComparer,
    identity = helpers.identity,
    defaultSubComparer = helpers.defaultSubComparer,
    isFunction = helpers.isFunction,
    isPromise = helpers.isPromise,
    isArrayLike = helpers.isArrayLike,
    isIterable = helpers.isIterable,
    inherits = Rx.internals.inherits,
    observableFromPromise = Observable.fromPromise,
    observableFrom = Observable.from,
    bindCallback = Rx.internals.bindCallback,
    EmptyError = Rx.EmptyError,
    ObservableBase = Rx.ObservableBase,
    ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError;

  var errorObj = {e: {}};
  var tryCatchTarget;
  function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObj.e = e;
      return errorObj;
    }
  }
  function tryCatch(fn) {
    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
    tryCatchTarget = fn;
    return tryCatcher;
  }
  function thrower(e) {
    throw e;
  }

  function extremaBy(source, keySelector, comparer) {
    return new AnonymousObservable(function (o) {
      var hasValue = false, lastKey = null, list = [];
      return source.subscribe(function (x) {
        var comparison, key;
        try {
          key = keySelector(x);
        } catch (ex) {
          o.onError(ex);
          return;
        }
        comparison = 0;
        if (!hasValue) {
          hasValue = true;
          lastKey = key;
        } else {
          try {
            comparison = comparer(key, lastKey);
          } catch (ex1) {
            o.onError(ex1);
            return;
          }
        }
        if (comparison > 0) {
          lastKey = key;
          list = [];
        }
        if (comparison >= 0) { list.push(x); }
      }, function (e) { o.onError(e); }, function () {
        o.onNext(list);
        o.onCompleted();
      });
    }, source);
  }

  function firstOnly(x) {
    if (x.length === 0) { throw new EmptyError(); }
    return x[0];
  }

  /**
   * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
   * For aggregation behavior with incremental intermediate results, see Observable.scan.
   * @deprecated Use #reduce instead
   * @param {Mixed} [seed] The initial accumulator value.
   * @param {Function} accumulator An accumulator function to be invoked on each element.
   * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
   */
  observableProto.aggregate = function () {
    var hasSeed = false, accumulator, seed, source = this;
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[0];
      accumulator = arguments[1];
    } else {
      accumulator = arguments[0];
    }
    return new AnonymousObservable(function (o) {
      var hasAccumulation, accumulation, hasValue;
      return source.subscribe (
        function (x) {
          !hasValue && (hasValue = true);
          try {
            if (hasAccumulation) {
              accumulation = accumulator(accumulation, x);
            } else {
              accumulation = hasSeed ? accumulator(seed, x) : x;
              hasAccumulation = true;
            }
          } catch (e) {
            return o.onError(e);
          }
        },
        function (e) { o.onError(e); },
        function () {
          hasValue && o.onNext(accumulation);
          !hasValue && hasSeed && o.onNext(seed);
          !hasValue && !hasSeed && o.onError(new EmptyError());
          o.onCompleted();
        }
      );
    }, source);
  };

  var ReduceObservable = (function(__super__) {
    inherits(ReduceObservable, __super__);
    function ReduceObservable(source, acc, hasSeed, seed) {
      this.source = source;
      this.acc = acc;
      this.hasSeed = hasSeed;
      this.seed = seed;
      __super__.call(this);
    }

    ReduceObservable.prototype.subscribeCore = function(observer) {
      return this.source.subscribe(new InnerObserver(observer,this));
    };

    function InnerObserver(o, parent) {
      this.o = o;
      this.acc = parent.acc;
      this.hasSeed = parent.hasSeed;
      this.seed = parent.seed;
      this.hasAccumulation = false;
      this.result = null;
      this.hasValue = false;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) {
      if (this.isStopped) { return; }
      !this.hasValue && (this.hasValue = true);
      if (this.hasAccumulation) {
        this.result = tryCatch(this.acc)(this.result, x);
      } else {
        this.result = this.hasSeed ? tryCatch(this.acc)(this.seed, x) : x;
        this.hasAccumulation = true;
      }
      if (this.result === errorObj) { this.o.onError(this.result.e); }
    };
    InnerObserver.prototype.onError = function (e) { 
      if (!this.isStopped) { this.isStopped = true; this.o.onError(e); } 
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.hasValue && this.o.onNext(this.result);
        !this.hasValue && this.hasSeed && this.o.onNext(this.seed);
        !this.hasValue && !this.hasSeed && this.o.onError(new EmptyError());
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function () { this.isStopped = true; };
    InnerObserver.prototype.fail = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    return ReduceObservable;
  }(ObservableBase));

  /**
  * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
  * For aggregation behavior with incremental intermediate results, see Observable.scan.
  * @param {Function} accumulator An accumulator function to be invoked on each element.
  * @param {Any} [seed] The initial accumulator value.
  * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
  */
  observableProto.reduce = function (accumulator) {
    var hasSeed = false;
    if (arguments.length === 2) {
      hasSeed = true;
      var seed = arguments[1];
    }
    return new ReduceObservable(this, accumulator, hasSeed, seed);
  };

  /**
   * Determines whether any element of an observable sequence satisfies a condition if present, else if any items are in the sequence.
   * @param {Function} [predicate] A function to test each element for a condition.
   * @returns {Observable} An observable sequence containing a single element determining whether any elements in the source sequence pass the test in the specified predicate if given, else if any items are in the sequence.
   */
  observableProto.some = function (predicate, thisArg) {
    var source = this;
    return predicate ?
      source.filter(predicate, thisArg).some() :
      new AnonymousObservable(function (observer) {
        return source.subscribe(function () {
          observer.onNext(true);
          observer.onCompleted();
        }, function (e) { observer.onError(e); }, function () {
          observer.onNext(false);
          observer.onCompleted();
        });
      }, source);
  };

  /** @deprecated use #some instead */
  observableProto.any = function () {
    //deprecate('any', 'some');
    return this.some.apply(this, arguments);
  };

  /**
   * Determines whether an observable sequence is empty.
   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence is empty.
   */
  observableProto.isEmpty = function () {
    return this.any().map(not);
  };

  /**
   * Determines whether all elements of an observable sequence satisfy a condition.
   * @param {Function} [predicate] A function to test each element for a condition.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element determining whether all elements in the source sequence pass the test in the specified predicate.
   */
  observableProto.every = function (predicate, thisArg) {
    return this.filter(function (v) { return !predicate(v); }, thisArg).some().map(not);
  };

  /** @deprecated use #every instead */
  observableProto.all = function () {
    //deprecate('all', 'every');
    return this.every.apply(this, arguments);
  };

  /**
   * Determines whether an observable sequence includes a specified element with an optional equality comparer.
   * @param searchElement The value to locate in the source sequence.
   * @param {Number} [fromIndex] An equality comparer to compare elements.
   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence includes an element that has the specified value from the given index.
   */
  observableProto.includes = function (searchElement, fromIndex) {
    var source = this;
    function comparer(a, b) {
      return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
    }
    return new AnonymousObservable(function (o) {
      var i = 0, n = +fromIndex || 0;
      Math.abs(n) === Infinity && (n = 0);
      if (n < 0) {
        o.onNext(false);
        o.onCompleted();
        return disposableEmpty;
      }
      return source.subscribe(
        function (x) {
          if (i++ >= n && comparer(x, searchElement)) {
            o.onNext(true);
            o.onCompleted();
          }
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(false);
          o.onCompleted();
        });
    }, this);
  };

  /**
   * @deprecated use #includes instead.
   */
  observableProto.contains = function (searchElement, fromIndex) {
    //deprecate('contains', 'includes');
    observableProto.includes(searchElement, fromIndex);
  };

  /**
   * Returns an observable sequence containing a value that represents how many elements in the specified observable sequence satisfy a condition if provided, else the count of items.
   * @example
   * res = source.count();
   * res = source.count(function (x) { return x > 3; });
   * @param {Function} [predicate]A function to test each element for a condition.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with a number that represents how many elements in the input sequence satisfy the condition in the predicate function if provided, else the count of items in the sequence.
   */
  observableProto.count = function (predicate, thisArg) {
    return predicate ?
      this.filter(predicate, thisArg).count() :
      this.reduce(function (count) { return count + 1; }, 0);
  };

  /**
   * Returns the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
   * @param {Any} searchElement Element to locate in the array.
   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
   * @returns {Observable} And observable sequence containing the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
   */
  observableProto.indexOf = function(searchElement, fromIndex) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var i = 0, n = +fromIndex || 0;
      Math.abs(n) === Infinity && (n = 0);
      if (n < 0) {
        o.onNext(-1);
        o.onCompleted();
        return disposableEmpty;
      }
      return source.subscribe(
        function (x) {
          if (i >= n && x === searchElement) {
            o.onNext(i);
            o.onCompleted();
          }
          i++;
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(-1);
          o.onCompleted();
        });
    }, source);
  };

  /**
   * Computes the sum of a sequence of values that are obtained by invoking an optional transform function on each element of the input sequence, else if not specified computes the sum on each item in the sequence.
   * @param {Function} [selector] A transform function to apply to each element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with the sum of the values in the source sequence.
   */
  observableProto.sum = function (keySelector, thisArg) {
    return keySelector && isFunction(keySelector) ?
      this.map(keySelector, thisArg).sum() :
      this.reduce(function (prev, curr) { return prev + curr; }, 0);
  };

  /**
   * Returns the elements in an observable sequence with the minimum key value according to the specified comparer.
   * @example
   * var res = source.minBy(function (x) { return x.value; });
   * var res = source.minBy(function (x) { return x.value; }, function (x, y) { return x - y; });
   * @param {Function} keySelector Key selector function.
   * @param {Function} [comparer] Comparer used to compare key values.
   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a minimum key value.
   */
  observableProto.minBy = function (keySelector, comparer) {
    comparer || (comparer = defaultSubComparer);
    return extremaBy(this, keySelector, function (x, y) { return comparer(x, y) * -1; });
  };

  /**
   * Returns the minimum element in an observable sequence according to the optional comparer else a default greater than less than check.
   * @example
   * var res = source.min();
   * var res = source.min(function (x, y) { return x.value - y.value; });
   * @param {Function} [comparer] Comparer used to compare elements.
   * @returns {Observable} An observable sequence containing a single element with the minimum element in the source sequence.
   */
  observableProto.min = function (comparer) {
    return this.minBy(identity, comparer).map(function (x) { return firstOnly(x); });
  };

  /**
   * Returns the elements in an observable sequence with the maximum  key value according to the specified comparer.
   * @example
   * var res = source.maxBy(function (x) { return x.value; });
   * var res = source.maxBy(function (x) { return x.value; }, function (x, y) { return x - y;; });
   * @param {Function} keySelector Key selector function.
   * @param {Function} [comparer]  Comparer used to compare key values.
   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a maximum key value.
   */
  observableProto.maxBy = function (keySelector, comparer) {
    comparer || (comparer = defaultSubComparer);
    return extremaBy(this, keySelector, comparer);
  };

  /**
   * Returns the maximum value in an observable sequence according to the specified comparer.
   * @example
   * var res = source.max();
   * var res = source.max(function (x, y) { return x.value - y.value; });
   * @param {Function} [comparer] Comparer used to compare elements.
   * @returns {Observable} An observable sequence containing a single element with the maximum element in the source sequence.
   */
  observableProto.max = function (comparer) {
    return this.maxBy(identity, comparer).map(function (x) { return firstOnly(x); });
  };

  /**
   * Computes the average of an observable sequence of values that are in the sequence or obtained by invoking a transform function on each element of the input sequence if present.
   * @param {Function} [selector] A transform function to apply to each element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with the average of the sequence of values.
   */
  observableProto.average = function (keySelector, thisArg) {
    return keySelector && isFunction(keySelector) ?
      this.map(keySelector, thisArg).average() :
      this.reduce(function (prev, cur) {
        return {
          sum: prev.sum + cur,
          count: prev.count + 1
        };
      }, {sum: 0, count: 0 }).map(function (s) {
        if (s.count === 0) { throw new EmptyError(); }
        return s.sum / s.count;
      });
  };

  /**
   *  Determines whether two sequences are equal by comparing the elements pairwise using a specified equality comparer.
   *
   * @example
   * var res = res = source.sequenceEqual([1,2,3]);
   * var res = res = source.sequenceEqual([{ value: 42 }], function (x, y) { return x.value === y.value; });
   * 3 - res = source.sequenceEqual(Rx.Observable.returnValue(42));
   * 4 - res = source.sequenceEqual(Rx.Observable.returnValue({ value: 42 }), function (x, y) { return x.value === y.value; });
   * @param {Observable} second Second observable sequence or array to compare.
   * @param {Function} [comparer] Comparer used to compare elements of both sequences.
   * @returns {Observable} An observable sequence that contains a single element which indicates whether both sequences are of equal length and their corresponding elements are equal according to the specified equality comparer.
   */
  observableProto.sequenceEqual = function (second, comparer) {
    var first = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var donel = false, doner = false, ql = [], qr = [];
      var subscription1 = first.subscribe(function (x) {
        var equal, v;
        if (qr.length > 0) {
          v = qr.shift();
          try {
            equal = comparer(v, x);
          } catch (e) {
            o.onError(e);
            return;
          }
          if (!equal) {
            o.onNext(false);
            o.onCompleted();
          }
        } else if (doner) {
          o.onNext(false);
          o.onCompleted();
        } else {
          ql.push(x);
        }
      }, function(e) { o.onError(e); }, function () {
        donel = true;
        if (ql.length === 0) {
          if (qr.length > 0) {
            o.onNext(false);
            o.onCompleted();
          } else if (doner) {
            o.onNext(true);
            o.onCompleted();
          }
        }
      });

      (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
      isPromise(second) && (second = observableFromPromise(second));
      var subscription2 = second.subscribe(function (x) {
        var equal;
        if (ql.length > 0) {
          var v = ql.shift();
          try {
            equal = comparer(v, x);
          } catch (exception) {
            o.onError(exception);
            return;
          }
          if (!equal) {
            o.onNext(false);
            o.onCompleted();
          }
        } else if (donel) {
          o.onNext(false);
          o.onCompleted();
        } else {
          qr.push(x);
        }
      }, function(e) { o.onError(e); }, function () {
        doner = true;
        if (qr.length === 0) {
          if (ql.length > 0) {
            o.onNext(false);
            o.onCompleted();
          } else if (donel) {
            o.onNext(true);
            o.onCompleted();
          }
        }
      });
      return new CompositeDisposable(subscription1, subscription2);
    }, first);
  };

  function elementAtOrDefault(source, index, hasDefault, defaultValue) {
    if (index < 0) { throw new ArgumentOutOfRangeError(); }
    return new AnonymousObservable(function (o) {
      var i = index;
      return source.subscribe(function (x) {
        if (i-- === 0) {
          o.onNext(x);
          o.onCompleted();
        }
      }, function (e) { o.onError(e); }, function () {
        if (!hasDefault) {
          o.onError(new ArgumentOutOfRangeError());
        } else {
          o.onNext(defaultValue);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the element at a specified index in a sequence.
   * @example
   * var res = source.elementAt(5);
   * @param {Number} index The zero-based index of the element to retrieve.
   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence.
   */
  observableProto.elementAt =  function (index) {
    return elementAtOrDefault(this, index, false);
  };

  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   * @example
   * var res = source.elementAtOrDefault(5);
   * var res = source.elementAtOrDefault(5, 0);
   * @param {Number} index The zero-based index of the element to retrieve.
   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence, or a default value if the index is outside the bounds of the source sequence.
   */
  observableProto.elementAtOrDefault = function (index, defaultValue) {
    return elementAtOrDefault(this, index, true, defaultValue);
  };

  function singleOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      var value = defaultValue, seenValue = false;
      return source.subscribe(function (x) {
        if (seenValue) {
          o.onError(new Error('Sequence contains more than one element'));
        } else {
          value = x;
          seenValue = true;
        }
      }, function (e) { o.onError(e); }, function () {
        if (!seenValue && !hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(value);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the only element of an observable sequence that satisfies the condition in the optional predicate, and reports an exception if there is not exactly one element in the observable sequence.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate.
   */
  observableProto.single = function (predicate, thisArg) {
    return predicate && isFunction(predicate) ?
      this.where(predicate, thisArg).single() :
      singleOrDefaultAsync(this, false);
  };

  /**
   * Returns the only element of an observable sequence that matches the predicate, or a default value if no such element exists; this method reports an exception if there is more than one element in the observable sequence.
   * @example
   * var res = res = source.singleOrDefault();
   * var res = res = source.singleOrDefault(function (x) { return x === 42; });
   * res = source.singleOrDefault(function (x) { return x === 42; }, 0);
   * res = source.singleOrDefault(null, 0);
   * @memberOf Observable#
   * @param {Function} predicate A predicate function to evaluate for elements in the source sequence.
   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.singleOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate && isFunction(predicate) ?
      this.filter(predicate, thisArg).singleOrDefault(null, defaultValue) :
      singleOrDefaultAsync(this, true, defaultValue);
  };

  function firstOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      return source.subscribe(function (x) {
        o.onNext(x);
        o.onCompleted();
      }, function (e) { o.onError(e); }, function () {
        if (!hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(defaultValue);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the first element of an observable sequence that satisfies the condition in the predicate if present else the first item in the sequence.
   * @example
   * var res = res = source.first();
   * var res = res = source.first(function (x) { return x > 3; });
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate if provided, else the first item in the sequence.
   */
  observableProto.first = function (predicate, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).first() :
      firstOrDefaultAsync(this, false);
  };

  /**
   * Returns the first element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.firstOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate ?
      this.where(predicate).firstOrDefault(null, defaultValue) :
      firstOrDefaultAsync(this, true, defaultValue);
  };

  function lastOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      var value = defaultValue, seenValue = false;
      return source.subscribe(function (x) {
        value = x;
        seenValue = true;
      }, function (e) { o.onError(e); }, function () {
        if (!seenValue && !hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(value);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the last element of an observable sequence that satisfies the condition in the predicate if specified, else the last element.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate.
   */
  observableProto.last = function (predicate, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).last() :
      lastOrDefaultAsync(this, false);
  };

  /**
   * Returns the last element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.lastOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).lastOrDefault(null, defaultValue) :
      lastOrDefaultAsync(this, true, defaultValue);
  };

  function findValue (source, predicate, thisArg, yieldIndex) {
    var callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0;
      return source.subscribe(function (x) {
        var shouldRun;
        try {
          shouldRun = callback(x, i, source);
        } catch (e) {
          o.onError(e);
          return;
        }
        if (shouldRun) {
          o.onNext(yieldIndex ? i : x);
          o.onCompleted();
        } else {
          i++;
        }
      }, function (e) { o.onError(e); }, function () {
        o.onNext(yieldIndex ? -1 : undefined);
        o.onCompleted();
      });
    }, source);
  }

  /**
   * Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire Observable sequence.
   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} An Observable sequence with the first element that matches the conditions defined by the specified predicate, if found; otherwise, undefined.
   */
  observableProto.find = function (predicate, thisArg) {
    return findValue(this, predicate, thisArg, false);
  };

  /**
   * Searches for an element that matches the conditions defined by the specified predicate, and returns
   * an Observable sequence with the zero-based index of the first occurrence within the entire Observable sequence.
   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} An Observable sequence with the zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, –1.
  */
  observableProto.findIndex = function (predicate, thisArg) {
    return findValue(this, predicate, thisArg, true);
  };

  /**
   * Converts the observable sequence to a Set if it exists.
   * @returns {Observable} An observable sequence with a single value of a Set containing the values from the observable sequence.
   */
  observableProto.toSet = function () {
    if (typeof root.Set === 'undefined') { throw new TypeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var s = new root.Set();
      return source.subscribe(
        function (x) { s.add(x); },
        function (e) { o.onError(e); },
        function () {
          o.onNext(s);
          o.onCompleted();
        });
    }, source);
  };

  /**
  * Converts the observable sequence to a Map if it exists.
  * @param {Function} keySelector A function which produces the key for the Map.
  * @param {Function} [elementSelector] An optional function which produces the element for the Map. If not present, defaults to the value from the observable sequence.
  * @returns {Observable} An observable sequence with a single value of a Map containing the values from the observable sequence.
  */
  observableProto.toMap = function (keySelector, elementSelector) {
    if (typeof root.Map === 'undefined') { throw new TypeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var m = new root.Map();
      return source.subscribe(
        function (x) {
          var key;
          try {
            key = keySelector(x);
          } catch (e) {
            o.onError(e);
            return;
          }

          var element = x;
          if (elementSelector) {
            try {
              element = elementSelector(x);
            } catch (e) {
              o.onError(e);
              return;
            }
          }

          m.set(key, element);
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(m);
          o.onCompleted();
        });
    }, source);
  };

    return Rx;
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"220":220}],219:[function(require,module,exports){
(function (process,global){
// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

;(function (undefined) {

  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  var root = (objectTypes[typeof window] && window) || this,
    freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
    freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
    moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
    freeGlobal = objectTypes[typeof global] && global;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  var Rx = {
      internals: {},
      config: {
        Promise: root.Promise
      },
      helpers: { }
  };

  // Defaults
  var noop = Rx.helpers.noop = function () { },
    notDefined = Rx.helpers.notDefined = function (x) { return typeof x === 'undefined'; },
    identity = Rx.helpers.identity = function (x) { return x; },
    pluck = Rx.helpers.pluck = function (property) { return function (x) { return x[property]; }; },
    just = Rx.helpers.just = function (value) { return function () { return value; }; },
    defaultNow = Rx.helpers.defaultNow = Date.now,
    defaultComparer = Rx.helpers.defaultComparer = function (x, y) { return isEqual(x, y); },
    defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) { return x > y ? 1 : (x < y ? -1 : 0); },
    defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) { return x.toString(); },
    defaultError = Rx.helpers.defaultError = function (err) { throw err; },
    isPromise = Rx.helpers.isPromise = function (p) { return !!p && typeof p.subscribe !== 'function' && typeof p.then === 'function'; },
    asArray = Rx.helpers.asArray = function () { return Array.prototype.slice.call(arguments); },
    not = Rx.helpers.not = function (a) { return !a; },
    isFunction = Rx.helpers.isFunction = (function () {

      var isFn = function (value) {
        return typeof value == 'function' || false;
      }

      // fallback for older versions of Chrome and Safari
      if (isFn(/x/)) {
        isFn = function(value) {
          return typeof value == 'function' && toString.call(value) == '[object Function]';
        };
      }

      return isFn;
    }());

  function cloneArray(arr) { for(var a = [], i = 0, len = arr.length; i < len; i++) { a.push(arr[i]); } return a;}

  Rx.config.longStackSupport = false;
  var hasStacks = false;
  try {
    throw new Error();
  } catch (e) {
    hasStacks = !!e.stack;
  }

  // All code after this point will be filtered from stack traces reported by RxJS
  var rStartingLine = captureLine(), rFileName;

  var STACK_JUMP_SEPARATOR = "From previous event:";

  function makeStackTraceLong(error, observable) {
      // If possible, transform the error stack trace by removing Node and RxJS
      // cruft, then concatenating with the stack trace of `observable`.
      if (hasStacks &&
          observable.stack &&
          typeof error === "object" &&
          error !== null &&
          error.stack &&
          error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
      ) {
        var stacks = [];
        for (var o = observable; !!o; o = o.source) {
          if (o.stack) {
            stacks.unshift(o.stack);
          }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
  }

  function filterStackString(stackString) {
    var lines = stackString.split("\n"),
        desiredLines = [];
    for (var i = 0, len = lines.length; i < len; i++) {
      var line = lines[i];

      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
        desiredLines.push(line);
      }
    }
    return desiredLines.join("\n");
  }

  function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
    if (!fileNameAndLineNumber) {
      return false;
    }
    var fileName = fileNameAndLineNumber[0], lineNumber = fileNameAndLineNumber[1];

    return fileName === rFileName &&
      lineNumber >= rStartingLine &&
      lineNumber <= rEndingLine;
  }

  function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
      stackLine.indexOf("(node.js:") !== -1;
  }

  function captureLine() {
    if (!hasStacks) { return; }

    try {
      throw new Error();
    } catch (e) {
      var lines = e.stack.split("\n");
      var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
      if (!fileNameAndLineNumber) { return; }

      rFileName = fileNameAndLineNumber[0];
      return fileNameAndLineNumber[1];
    }
  }

  function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) { return [attempt1[1], Number(attempt1[2])]; }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) { return [attempt2[1], Number(attempt2[2])]; }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) { return [attempt3[1], Number(attempt3[2])]; }
  }

  var EmptyError = Rx.EmptyError = function() {
    this.message = 'Sequence contains no elements.';
    Error.call(this);
  };
  EmptyError.prototype = Error.prototype;

  var ObjectDisposedError = Rx.ObjectDisposedError = function() {
    this.message = 'Object has been disposed';
    Error.call(this);
  };
  ObjectDisposedError.prototype = Error.prototype;

  var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function () {
    this.message = 'Argument out of range';
    Error.call(this);
  };
  ArgumentOutOfRangeError.prototype = Error.prototype;

  var NotSupportedError = Rx.NotSupportedError = function (message) {
    this.message = message || 'This operation is not supported';
    Error.call(this);
  };
  NotSupportedError.prototype = Error.prototype;

  var NotImplementedError = Rx.NotImplementedError = function (message) {
    this.message = message || 'This operation is not implemented';
    Error.call(this);
  };
  NotImplementedError.prototype = Error.prototype;

  var notImplemented = Rx.helpers.notImplemented = function () {
    throw new NotImplementedError();
  };

  var notSupported = Rx.helpers.notSupported = function () {
    throw new NotSupportedError();
  };

  // Shim in iterator support
  var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) ||
    '_es6shim_iterator_';
  // Bug for mozilla version
  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
    $iterator$ = '@@iterator';
  }

  var doneEnumerator = Rx.doneEnumerator = { done: true, value: undefined };

  var isIterable = Rx.helpers.isIterable = function (o) {
    return o[$iterator$] !== undefined;
  }

  var isArrayLike = Rx.helpers.isArrayLike = function (o) {
    return o && o.length !== undefined;
  }

  Rx.helpers.iterator = $iterator$;

  var bindCallback = Rx.internals.bindCallback = function (func, thisArg, argCount) {
    if (typeof thisArg === 'undefined') { return func; }
    switch(argCount) {
      case 0:
        return function() {
          return func.call(thisArg)
        };
      case 1:
        return function(arg) {
          return func.call(thisArg, arg);
        }
      case 2:
        return function(value, index) {
          return func.call(thisArg, value, index);
        };
      case 3:
        return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
    }

    return function() {
      return func.apply(thisArg, arguments);
    };
  };

  /** Used to determine if values are of the language type Object */
  var dontEnums = ['toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'],
  dontEnumsLength = dontEnums.length;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

  var toString = Object.prototype.toString,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    supportsArgsClass = toString.call(arguments) == argsClass, // For less <IE9 && FF<4
    supportNodeClass,
    errorProto = Error.prototype,
    objectProto = Object.prototype,
    stringProto = String.prototype,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

  try {
    supportNodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
  } catch (e) {
    supportNodeClass = true;
  }

  var nonEnumProps = {};
  nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
  nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
  nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
  nonEnumProps[objectClass] = { 'constructor': true };

  var support = {};
  (function () {
    var ctor = function() { this.x = 1; },
      props = [];

    ctor.prototype = { 'valueOf': 1, 'y': 1 };
    for (var key in new ctor) { props.push(key); }
    for (key in arguments) { }

    // Detect if `name` or `message` properties of `Error.prototype` are enumerable by default.
    support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

    // Detect if `prototype` properties are enumerable by default.
    support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');

    // Detect if `arguments` object indexes are non-enumerable
    support.nonEnumArgs = key != 0;

    // Detect if properties shadowing those on `Object.prototype` are non-enumerable.
    support.nonEnumShadows = !/valueOf/.test(props);
  }(1));

  var isObject = Rx.internals.isObject = function(value) {
    var type = typeof value;
    return value && (type == 'function' || type == 'object') || false;
  };

  function keysIn(object) {
    var result = [];
    if (!isObject(object)) {
      return result;
    }
    if (support.nonEnumArgs && object.length && isArguments(object)) {
      object = slice.call(object);
    }
    var skipProto = support.enumPrototypes && typeof object == 'function',
        skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error);

    for (var key in object) {
      if (!(skipProto && key == 'prototype') &&
          !(skipErrorProps && (key == 'message' || key == 'name'))) {
        result.push(key);
      }
    }

    if (support.nonEnumShadows && object !== objectProto) {
      var ctor = object.constructor,
          index = -1,
          length = dontEnumsLength;

      if (object === (ctor && ctor.prototype)) {
        var className = object === stringProto ? stringClass : object === errorProto ? errorClass : toString.call(object),
            nonEnum = nonEnumProps[className];
      }
      while (++index < length) {
        key = dontEnums[index];
        if (!(nonEnum && nonEnum[key]) && hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
    }
    return result;
  }

  function internalFor(object, callback, keysFunc) {
    var index = -1,
      props = keysFunc(object),
      length = props.length;

    while (++index < length) {
      var key = props[index];
      if (callback(object[key], key, object) === false) {
        break;
      }
    }
    return object;
  }

  function internalForIn(object, callback) {
    return internalFor(object, callback, keysIn);
  }

  function isNode(value) {
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
    // methods that are `typeof` "string" and still can coerce nodes to strings
    return typeof value.toString != 'function' && typeof (value + '') == 'string';
  }

  var isArguments = function(value) {
    return (value && typeof value == 'object') ? toString.call(value) == argsClass : false;
  }

  // fallback for browsers that can't detect `arguments` objects by [[Class]]
  if (!supportsArgsClass) {
    isArguments = function(value) {
      return (value && typeof value == 'object') ? hasOwnProperty.call(value, 'callee') : false;
    };
  }

  var isEqual = Rx.internals.isEqual = function (x, y) {
    return deepEquals(x, y, [], []);
  };

  /** @private
   * Used for deep comparison
   **/
  function deepEquals(a, b, stackA, stackB) {
    // exit early for identical values
    if (a === b) {
      // treat `+0` vs. `-0` as not equal
      return a !== 0 || (1 / a == 1 / b);
    }

    var type = typeof a,
        otherType = typeof b;

    // exit early for unlike primitive values
    if (a === a && (a == null || b == null ||
        (type != 'function' && type != 'object' && otherType != 'function' && otherType != 'object'))) {
      return false;
    }

    // compare [[Class]] names
    var className = toString.call(a),
        otherClass = toString.call(b);

    if (className == argsClass) {
      className = objectClass;
    }
    if (otherClass == argsClass) {
      otherClass = objectClass;
    }
    if (className != otherClass) {
      return false;
    }
    switch (className) {
      case boolClass:
      case dateClass:
        // coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
        return +a == +b;

      case numberClass:
        // treat `NaN` vs. `NaN` as equal
        return (a != +a) ?
          b != +b :
          // but treat `-0` vs. `+0` as not equal
          (a == 0 ? (1 / a == 1 / b) : a == +b);

      case regexpClass:
      case stringClass:
        // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
        // treat string primitives and their corresponding object instances as equal
        return a == String(b);
    }
    var isArr = className == arrayClass;
    if (!isArr) {

      // exit for functions and DOM nodes
      if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
        return false;
      }
      // in older versions of Opera, `arguments` objects have `Array` constructors
      var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
          ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;

      // non `Object` object instances with different constructors are not equal
      if (ctorA != ctorB &&
            !(hasOwnProperty.call(a, 'constructor') && hasOwnProperty.call(b, 'constructor')) &&
            !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
            ('constructor' in a && 'constructor' in b)
          ) {
        return false;
      }
    }
    // assume cyclic structures are equal
    // the algorithm for detecting cyclic structures is adapted from ES 5.1
    // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
    var initedStack = !stackA;
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == a) {
        return stackB[length] == b;
      }
    }
    var size = 0;
    var result = true;

    // add `a` and `b` to the stack of traversed objects
    stackA.push(a);
    stackB.push(b);

    // recursively compare objects and arrays (susceptible to call stack limits)
    if (isArr) {
      // compare lengths to determine if a deep comparison is necessary
      length = a.length;
      size = b.length;
      result = size == length;

      if (result) {
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          var index = length,
              value = b[size];

          if (!(result = deepEquals(a[size], value, stackA, stackB))) {
            break;
          }
        }
      }
    }
    else {
      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
      // which, in this case, is more costly
      internalForIn(b, function(value, key, b) {
        if (hasOwnProperty.call(b, key)) {
          // count the number of properties.
          size++;
          // deep compare each property value.
          return (result = hasOwnProperty.call(a, key) && deepEquals(a[key], value, stackA, stackB));
        }
      });

      if (result) {
        // ensure both objects have the same number of properties
        internalForIn(a, function(value, key, a) {
          if (hasOwnProperty.call(a, key)) {
            // `size` will be `-1` if `a` has more properties than `b`
            return (result = --size > -1);
          }
        });
      }
    }
    stackA.pop();
    stackB.pop();

    return result;
  }

  var hasProp = {}.hasOwnProperty,
      slice = Array.prototype.slice;

  var inherits = this.inherits = Rx.internals.inherits = function (child, parent) {
    function __() { this.constructor = child; }
    __.prototype = parent.prototype;
    child.prototype = new __();
  };

  var addProperties = Rx.internals.addProperties = function (obj) {
    for(var sources = [], i = 1, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
    for (var idx = 0, ln = sources.length; idx < ln; idx++) {
      var source = sources[idx];
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  };

  // Rx Utils
  var addRef = Rx.internals.addRef = function (xs, r) {
    return new AnonymousObservable(function (observer) {
      return new CompositeDisposable(r.getDisposable(), xs.subscribe(observer));
    });
  };

  function arrayInitialize(count, factory) {
    var a = new Array(count);
    for (var i = 0; i < count; i++) {
      a[i] = factory();
    }
    return a;
  }

  var errorObj = {e: {}};
  var tryCatchTarget;
  function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObj.e = e;
      return errorObj;
    }
  }
  function tryCatch(fn) {
    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
    tryCatchTarget = fn;
    return tryCatcher;
  }
  function thrower(e) {
    throw e;
  }

  // Collections
  function IndexedItem(id, value) {
    this.id = id;
    this.value = value;
  }

  IndexedItem.prototype.compareTo = function (other) {
    var c = this.value.compareTo(other.value);
    c === 0 && (c = this.id - other.id);
    return c;
  };

  // Priority Queue for Scheduling
  var PriorityQueue = Rx.internals.PriorityQueue = function (capacity) {
    this.items = new Array(capacity);
    this.length = 0;
  };

  var priorityProto = PriorityQueue.prototype;
  priorityProto.isHigherPriority = function (left, right) {
    return this.items[left].compareTo(this.items[right]) < 0;
  };

  priorityProto.percolate = function (index) {
    if (index >= this.length || index < 0) { return; }
    var parent = index - 1 >> 1;
    if (parent < 0 || parent === index) { return; }
    if (this.isHigherPriority(index, parent)) {
      var temp = this.items[index];
      this.items[index] = this.items[parent];
      this.items[parent] = temp;
      this.percolate(parent);
    }
  };

  priorityProto.heapify = function (index) {
    +index || (index = 0);
    if (index >= this.length || index < 0) { return; }
    var left = 2 * index + 1,
        right = 2 * index + 2,
        first = index;
    if (left < this.length && this.isHigherPriority(left, first)) {
      first = left;
    }
    if (right < this.length && this.isHigherPriority(right, first)) {
      first = right;
    }
    if (first !== index) {
      var temp = this.items[index];
      this.items[index] = this.items[first];
      this.items[first] = temp;
      this.heapify(first);
    }
  };

  priorityProto.peek = function () { return this.items[0].value; };

  priorityProto.removeAt = function (index) {
    this.items[index] = this.items[--this.length];
    this.items[this.length] = undefined;
    this.heapify();
  };

  priorityProto.dequeue = function () {
    var result = this.peek();
    this.removeAt(0);
    return result;
  };

  priorityProto.enqueue = function (item) {
    var index = this.length++;
    this.items[index] = new IndexedItem(PriorityQueue.count++, item);
    this.percolate(index);
  };

  priorityProto.remove = function (item) {
    for (var i = 0; i < this.length; i++) {
      if (this.items[i].value === item) {
        this.removeAt(i);
        return true;
      }
    }
    return false;
  };
  PriorityQueue.count = 0;

  /**
   * Represents a group of disposable resources that are disposed together.
   * @constructor
   */
  var CompositeDisposable = Rx.CompositeDisposable = function () {
    var args = [], i, len;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
      len = args.length;
    } else {
      len = arguments.length;
      args = new Array(len);
      for(i = 0; i < len; i++) { args[i] = arguments[i]; }
    }
    for(i = 0; i < len; i++) {
      if (!isDisposable(args[i])) { throw new TypeError('Not a disposable'); }
    }
    this.disposables = args;
    this.isDisposed = false;
    this.length = args.length;
  };

  var CompositeDisposablePrototype = CompositeDisposable.prototype;

  /**
   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
   * @param {Mixed} item Disposable to add.
   */
  CompositeDisposablePrototype.add = function (item) {
    if (this.isDisposed) {
      item.dispose();
    } else {
      this.disposables.push(item);
      this.length++;
    }
  };

  /**
   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
   * @param {Mixed} item Disposable to remove.
   * @returns {Boolean} true if found; false otherwise.
   */
  CompositeDisposablePrototype.remove = function (item) {
    var shouldDispose = false;
    if (!this.isDisposed) {
      var idx = this.disposables.indexOf(item);
      if (idx !== -1) {
        shouldDispose = true;
        this.disposables.splice(idx, 1);
        this.length--;
        item.dispose();
      }
    }
    return shouldDispose;
  };

  /**
   *  Disposes all disposables in the group and removes them from the group.
   */
  CompositeDisposablePrototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var len = this.disposables.length, currentDisposables = new Array(len);
      for(var i = 0; i < len; i++) { currentDisposables[i] = this.disposables[i]; }
      this.disposables = [];
      this.length = 0;

      for (i = 0; i < len; i++) {
        currentDisposables[i].dispose();
      }
    }
  };

  /**
   * Provides a set of static methods for creating Disposables.
   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
   */
  var Disposable = Rx.Disposable = function (action) {
    this.isDisposed = false;
    this.action = action || noop;
  };

  /** Performs the task of cleaning up resources. */
  Disposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.action();
      this.isDisposed = true;
    }
  };

  /**
   * Creates a disposable object that invokes the specified action when disposed.
   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
   * @return {Disposable} The disposable object that runs the given action upon disposal.
   */
  var disposableCreate = Disposable.create = function (action) { return new Disposable(action); };

  /**
   * Gets the disposable that does nothing when disposed.
   */
  var disposableEmpty = Disposable.empty = { dispose: noop };

  /**
   * Validates whether the given object is a disposable
   * @param {Object} Object to test whether it has a dispose method
   * @returns {Boolean} true if a disposable object, else false.
   */
  var isDisposable = Disposable.isDisposable = function (d) {
    return d && isFunction(d.dispose);
  };

  var checkDisposed = Disposable.checkDisposed = function (disposable) {
    if (disposable.isDisposed) { throw new ObjectDisposedError(); }
  };

  // Single assignment
  var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function () {
    this.isDisposed = false;
    this.current = null;
  };
  SingleAssignmentDisposable.prototype.getDisposable = function () {
    return this.current;
  };
  SingleAssignmentDisposable.prototype.setDisposable = function (value) {
    if (this.current) { throw new Error('Disposable has already been assigned'); }
    var shouldDispose = this.isDisposed;
    !shouldDispose && (this.current = value);
    shouldDispose && value && value.dispose();
  };
  SingleAssignmentDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old = this.current;
      this.current = null;
    }
    old && old.dispose();
  };

  // Multiple assignment disposable
  var SerialDisposable = Rx.SerialDisposable = function () {
    this.isDisposed = false;
    this.current = null;
  };
  SerialDisposable.prototype.getDisposable = function () {
    return this.current;
  };
  SerialDisposable.prototype.setDisposable = function (value) {
    var shouldDispose = this.isDisposed;
    if (!shouldDispose) {
      var old = this.current;
      this.current = value;
    }
    old && old.dispose();
    shouldDispose && value && value.dispose();
  };
  SerialDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old = this.current;
      this.current = null;
    }
    old && old.dispose();
  };

  /**
   * Represents a disposable resource that only disposes its underlying disposable resource when all dependent disposable objects have been disposed.
   */
  var RefCountDisposable = Rx.RefCountDisposable = (function () {

    function InnerDisposable(disposable) {
      this.disposable = disposable;
      this.disposable.count++;
      this.isInnerDisposed = false;
    }

    InnerDisposable.prototype.dispose = function () {
      if (!this.disposable.isDisposed && !this.isInnerDisposed) {
        this.isInnerDisposed = true;
        this.disposable.count--;
        if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
          this.disposable.isDisposed = true;
          this.disposable.underlyingDisposable.dispose();
        }
      }
    };

    /**
     * Initializes a new instance of the RefCountDisposable with the specified disposable.
     * @constructor
     * @param {Disposable} disposable Underlying disposable.
      */
    function RefCountDisposable(disposable) {
      this.underlyingDisposable = disposable;
      this.isDisposed = false;
      this.isPrimaryDisposed = false;
      this.count = 0;
    }

    /**
     * Disposes the underlying disposable only when all dependent disposables have been disposed
     */
    RefCountDisposable.prototype.dispose = function () {
      if (!this.isDisposed && !this.isPrimaryDisposed) {
        this.isPrimaryDisposed = true;
        if (this.count === 0) {
          this.isDisposed = true;
          this.underlyingDisposable.dispose();
        }
      }
    };

    /**
     * Returns a dependent disposable that when disposed decreases the refcount on the underlying disposable.
     * @returns {Disposable} A dependent disposable contributing to the reference count that manages the underlying disposable's lifetime.
     */
    RefCountDisposable.prototype.getDisposable = function () {
      return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
    };

    return RefCountDisposable;
  })();

  function ScheduledDisposable(scheduler, disposable) {
    this.scheduler = scheduler;
    this.disposable = disposable;
    this.isDisposed = false;
  }

  function scheduleItem(s, self) {
    if (!self.isDisposed) {
      self.isDisposed = true;
      self.disposable.dispose();
    }
  }

  ScheduledDisposable.prototype.dispose = function () {
    this.scheduler.scheduleWithState(this, scheduleItem);
  };

  var ScheduledItem = Rx.internals.ScheduledItem = function (scheduler, state, action, dueTime, comparer) {
    this.scheduler = scheduler;
    this.state = state;
    this.action = action;
    this.dueTime = dueTime;
    this.comparer = comparer || defaultSubComparer;
    this.disposable = new SingleAssignmentDisposable();
  }

  ScheduledItem.prototype.invoke = function () {
    this.disposable.setDisposable(this.invokeCore());
  };

  ScheduledItem.prototype.compareTo = function (other) {
    return this.comparer(this.dueTime, other.dueTime);
  };

  ScheduledItem.prototype.isCancelled = function () {
    return this.disposable.isDisposed;
  };

  ScheduledItem.prototype.invokeCore = function () {
    return this.action(this.scheduler, this.state);
  };

  /** Provides a set of static properties to access commonly used schedulers. */
  var Scheduler = Rx.Scheduler = (function () {

    function Scheduler(now, schedule, scheduleRelative, scheduleAbsolute) {
      this.now = now;
      this._schedule = schedule;
      this._scheduleRelative = scheduleRelative;
      this._scheduleAbsolute = scheduleAbsolute;
    }

    /** Determines whether the given object is a scheduler */
    Scheduler.isScheduler = function (s) {
      return s instanceof Scheduler;
    }

    function invokeAction(scheduler, action) {
      action();
      return disposableEmpty;
    }

    var schedulerProto = Scheduler.prototype;

    /**
     * Schedules an action to be executed.
     * @param {Function} action Action to execute.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.schedule = function (action) {
      return this._schedule(action, invokeAction);
    };

    /**
     * Schedules an action to be executed.
     * @param state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithState = function (state, action) {
      return this._schedule(state, action);
    };

    /**
     * Schedules an action to be executed after the specified relative due time.
     * @param {Function} action Action to execute.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithRelative = function (dueTime, action) {
      return this._scheduleRelative(action, dueTime, invokeAction);
    };

    /**
     * Schedules an action to be executed after dueTime.
     * @param state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithRelativeAndState = function (state, dueTime, action) {
      return this._scheduleRelative(state, dueTime, action);
    };

    /**
     * Schedules an action to be executed at the specified absolute due time.
     * @param {Function} action Action to execute.
     * @param {Number} dueTime Absolute time at which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
      */
    schedulerProto.scheduleWithAbsolute = function (dueTime, action) {
      return this._scheduleAbsolute(action, dueTime, invokeAction);
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @param {Number}dueTime Absolute time at which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithAbsoluteAndState = function (state, dueTime, action) {
      return this._scheduleAbsolute(state, dueTime, action);
    };

    /** Gets the current time according to the local machine's system clock. */
    Scheduler.now = defaultNow;

    /**
     * Normalizes the specified TimeSpan value to a positive value.
     * @param {Number} timeSpan The time span value to normalize.
     * @returns {Number} The specified TimeSpan value if it is zero or positive; otherwise, 0
     */
    Scheduler.normalize = function (timeSpan) {
      timeSpan < 0 && (timeSpan = 0);
      return timeSpan;
    };

    return Scheduler;
  }());

  var normalizeTime = Scheduler.normalize, isScheduler = Scheduler.isScheduler;

  (function (schedulerProto) {

    function invokeRecImmediate(scheduler, pair) {
      var state = pair[0], action = pair[1], group = new CompositeDisposable();

      function recursiveAction(state1) {
        action(state1, function (state2) {
          var isAdded = false, isDone = false,
          d = scheduler.scheduleWithState(state2, function (scheduler1, state3) {
            if (isAdded) {
              group.remove(d);
            } else {
              isDone = true;
            }
            recursiveAction(state3);
            return disposableEmpty;
          });
          if (!isDone) {
            group.add(d);
            isAdded = true;
          }
        });
      }
      recursiveAction(state);
      return group;
    }

    function invokeRecDate(scheduler, pair, method) {
      var state = pair[0], action = pair[1], group = new CompositeDisposable();
      function recursiveAction(state1) {
        action(state1, function (state2, dueTime1) {
          var isAdded = false, isDone = false,
          d = scheduler[method](state2, dueTime1, function (scheduler1, state3) {
            if (isAdded) {
              group.remove(d);
            } else {
              isDone = true;
            }
            recursiveAction(state3);
            return disposableEmpty;
          });
          if (!isDone) {
            group.add(d);
            isAdded = true;
          }
        });
      };
      recursiveAction(state);
      return group;
    }

    function scheduleInnerRecursive(action, self) {
      action(function(dt) { self(action, dt); });
    }

    /**
     * Schedules an action to be executed recursively.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursive = function (action) {
      return this.scheduleRecursiveWithState(action, scheduleInnerRecursive);
    };

    /**
     * Schedules an action to be executed recursively.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in recursive invocation state.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithState = function (state, action) {
      return this.scheduleWithState([state, action], invokeRecImmediate);
    };

    /**
     * Schedules an action to be executed recursively after a specified relative due time.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified relative time.
     * @param {Number}dueTime Relative time after which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithRelative = function (dueTime, action) {
      return this.scheduleRecursiveWithRelativeAndState(action, dueTime, scheduleInnerRecursive);
    };

    /**
     * Schedules an action to be executed recursively after a specified relative due time.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
     * @param {Number}dueTime Relative time after which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithRelativeAndState = function (state, dueTime, action) {
      return this._scheduleRelative([state, action], dueTime, function (s, p) {
        return invokeRecDate(s, p, 'scheduleWithRelativeAndState');
      });
    };

    /**
     * Schedules an action to be executed recursively at a specified absolute due time.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified absolute time.
     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithAbsolute = function (dueTime, action) {
      return this.scheduleRecursiveWithAbsoluteAndState(action, dueTime, scheduleInnerRecursive);
    };

    /**
     * Schedules an action to be executed recursively at a specified absolute due time.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithAbsoluteAndState = function (state, dueTime, action) {
      return this._scheduleAbsolute([state, action], dueTime, function (s, p) {
        return invokeRecDate(s, p, 'scheduleWithAbsoluteAndState');
      });
    };
  }(Scheduler.prototype));

  (function (schedulerProto) {

    /**
     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
     * @param {Number} period Period for running the work periodically.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
     */
    Scheduler.prototype.schedulePeriodic = function (period, action) {
      return this.schedulePeriodicWithState(null, period, action);
    };

    /**
     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
     * @param {Mixed} state Initial state passed to the action upon the first iteration.
     * @param {Number} period Period for running the work periodically.
     * @param {Function} action Action to be executed, potentially updating the state.
     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
     */
    Scheduler.prototype.schedulePeriodicWithState = function(state, period, action) {
      if (typeof root.setInterval === 'undefined') { throw new NotSupportedError(); }
      period = normalizeTime(period);
      var s = state, id = root.setInterval(function () { s = action(s); }, period);
      return disposableCreate(function () { root.clearInterval(id); });
    };

  }(Scheduler.prototype));

  (function (schedulerProto) {
    /**
     * Returns a scheduler that wraps the original scheduler, adding exception handling for scheduled actions.
     * @param {Function} handler Handler that's run if an exception is caught. The exception will be rethrown if the handler returns false.
     * @returns {Scheduler} Wrapper around the original scheduler, enforcing exception handling.
     */
    schedulerProto.catchError = schedulerProto['catch'] = function (handler) {
      return new CatchScheduler(this, handler);
    };
  }(Scheduler.prototype));

  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function () {
    function tick(command, recurse) {
      recurse(0, this._period);
      try {
        this._state = this._action(this._state);
      } catch (e) {
        this._cancel.dispose();
        throw e;
      }
    }

    function SchedulePeriodicRecursive(scheduler, state, period, action) {
      this._scheduler = scheduler;
      this._state = state;
      this._period = period;
      this._action = action;
    }

    SchedulePeriodicRecursive.prototype.start = function () {
      var d = new SingleAssignmentDisposable();
      this._cancel = d;
      d.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0, this._period, tick.bind(this)));

      return d;
    };

    return SchedulePeriodicRecursive;
  }());

  /** Gets a scheduler that schedules work immediately on the current thread. */
  var immediateScheduler = Scheduler.immediate = (function () {
    function scheduleNow(state, action) { return action(this, state); }
    return new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
  }());

  /**
   * Gets a scheduler that schedules work as soon as possible on the current thread.
   */
  var currentThreadScheduler = Scheduler.currentThread = (function () {
    var queue;

    function runTrampoline () {
      while (queue.length > 0) {
        var item = queue.dequeue();
        !item.isCancelled() && item.invoke();
      }
    }

    function scheduleNow(state, action) {
      var si = new ScheduledItem(this, state, action, this.now());

      if (!queue) {
        queue = new PriorityQueue(4);
        queue.enqueue(si);

        var result = tryCatch(runTrampoline)();
        queue = null;
        if (result === errorObj) { return thrower(result.e); }
      } else {
        queue.enqueue(si);
      }
      return si.disposable;
    }

    var currentScheduler = new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
    currentScheduler.scheduleRequired = function () { return !queue; };

    return currentScheduler;
  }());

  var scheduleMethod, clearMethod;

  var localTimer = (function () {
    var localSetTimeout, localClearTimeout = noop;
    if (!!root.setTimeout) {
      localSetTimeout = root.setTimeout;
      localClearTimeout = root.clearTimeout;
    } else if (!!root.WScript) {
      localSetTimeout = function (fn, time) {
        root.WScript.Sleep(time);
        fn();
      };
    } else {
      throw new NotSupportedError();
    }

    return {
      setTimeout: localSetTimeout,
      clearTimeout: localClearTimeout
    };
  }());
  var localSetTimeout = localTimer.setTimeout,
    localClearTimeout = localTimer.clearTimeout;

  (function () {

    var nextHandle = 1, tasksByHandle = {}, currentlyRunning = false;

    clearMethod = function (handle) {
      delete tasksByHandle[handle];
    };

    function runTask(handle) {
      if (currentlyRunning) {
        localSetTimeout(function () { runTask(handle) }, 0);
      } else {
        var task = tasksByHandle[handle];
        if (task) {
          currentlyRunning = true;
          var result = tryCatch(task)();
          clearMethod(handle);
          currentlyRunning = false;
          if (result === errorObj) { return thrower(result.e); }
        }
      }
    }

    var reNative = RegExp('^' +
      String(toString)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/toString| for [^\]]+/g, '.*?') + '$'
    );

    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' &&
      !reNative.test(setImmediate) && setImmediate;

    function postMessageSupported () {
      // Ensure not in a worker
      if (!root.postMessage || root.importScripts) { return false; }
      var isAsync = false, oldHandler = root.onmessage;
      // Test for async
      root.onmessage = function () { isAsync = true; };
      root.postMessage('', '*');
      root.onmessage = oldHandler;

      return isAsync;
    }

    // Use in order, setImmediate, nextTick, postMessage, MessageChannel, script readystatechanged, setTimeout
    if (isFunction(setImmediate)) {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        setImmediate(function () { runTask(id); });

        return id;
      };
    } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        process.nextTick(function () { runTask(id); });

        return id;
      };
    } else if (postMessageSupported()) {
      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();

      function onGlobalPostMessage(event) {
        // Only if we're a match to avoid any other global events
        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
          runTask(event.data.substring(MSG_PREFIX.length));
        }
      }

      if (root.addEventListener) {
        root.addEventListener('message', onGlobalPostMessage, false);
      } else if (root.attachEvent) {
        root.attachEvent('onmessage', onGlobalPostMessage);
      } else {
        root.onmessage = onGlobalPostMessage;
      }

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        root.postMessage(MSG_PREFIX + currentId, '*');
        return id;
      };
    } else if (!!root.MessageChannel) {
      var channel = new root.MessageChannel();

      channel.port1.onmessage = function (e) { runTask(e.data); };

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        channel.port2.postMessage(id);
        return id;
      };
    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {

      scheduleMethod = function (action) {
        var scriptElement = root.document.createElement('script');
        var id = nextHandle++;
        tasksByHandle[id] = action;

        scriptElement.onreadystatechange = function () {
          runTask(id);
          scriptElement.onreadystatechange = null;
          scriptElement.parentNode.removeChild(scriptElement);
          scriptElement = null;
        };
        root.document.documentElement.appendChild(scriptElement);
        return id;
      };

    } else {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        localSetTimeout(function () {
          runTask(id);
        }, 0);

        return id;
      };
    }
  }());

  /**
   * Gets a scheduler that schedules work via a timed callback based upon platform.
   */
  var timeoutScheduler = Scheduler.timeout = Scheduler['default'] = (function () {

    function scheduleNow(state, action) {
      var scheduler = this, disposable = new SingleAssignmentDisposable();
      var id = scheduleMethod(function () {
        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
      });
      return new CompositeDisposable(disposable, disposableCreate(function () {
        clearMethod(id);
      }));
    }

    function scheduleRelative(state, dueTime, action) {
      var scheduler = this, dt = Scheduler.normalize(dueTime), disposable = new SingleAssignmentDisposable();
      if (dt === 0) { return scheduler.scheduleWithState(state, action); }
      var id = localSetTimeout(function () {
        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
      }, dt);
      return new CompositeDisposable(disposable, disposableCreate(function () {
        localClearTimeout(id);
      }));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
    }

    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);
  })();

  var CatchScheduler = (function (__super__) {

    function scheduleNow(state, action) {
      return this._scheduler.scheduleWithState(state, this._wrap(action));
    }

    function scheduleRelative(state, dueTime, action) {
      return this._scheduler.scheduleWithRelativeAndState(state, dueTime, this._wrap(action));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this._scheduler.scheduleWithAbsoluteAndState(state, dueTime, this._wrap(action));
    }

    inherits(CatchScheduler, __super__);

    function CatchScheduler(scheduler, handler) {
      this._scheduler = scheduler;
      this._handler = handler;
      this._recursiveOriginal = null;
      this._recursiveWrapper = null;
      __super__.call(this, this._scheduler.now.bind(this._scheduler), scheduleNow, scheduleRelative, scheduleAbsolute);
    }

    CatchScheduler.prototype._clone = function (scheduler) {
        return new CatchScheduler(scheduler, this._handler);
    };

    CatchScheduler.prototype._wrap = function (action) {
      var parent = this;
      return function (self, state) {
        try {
          return action(parent._getRecursiveWrapper(self), state);
        } catch (e) {
          if (!parent._handler(e)) { throw e; }
          return disposableEmpty;
        }
      };
    };

    CatchScheduler.prototype._getRecursiveWrapper = function (scheduler) {
      if (this._recursiveOriginal !== scheduler) {
        this._recursiveOriginal = scheduler;
        var wrapper = this._clone(scheduler);
        wrapper._recursiveOriginal = scheduler;
        wrapper._recursiveWrapper = wrapper;
        this._recursiveWrapper = wrapper;
      }
      return this._recursiveWrapper;
    };

    CatchScheduler.prototype.schedulePeriodicWithState = function (state, period, action) {
      var self = this, failed = false, d = new SingleAssignmentDisposable();

      d.setDisposable(this._scheduler.schedulePeriodicWithState(state, period, function (state1) {
        if (failed) { return null; }
        try {
          return action(state1);
        } catch (e) {
          failed = true;
          if (!self._handler(e)) { throw e; }
          d.dispose();
          return null;
        }
      }));

      return d;
    };

    return CatchScheduler;
  }(Scheduler));

  /**
   *  Represents a notification to an observer.
   */
  var Notification = Rx.Notification = (function () {
    function Notification(kind, value, exception, accept, acceptObservable, toString) {
      this.kind = kind;
      this.value = value;
      this.exception = exception;
      this._accept = accept;
      this._acceptObservable = acceptObservable;
      this.toString = toString;
    }

    /**
     * Invokes the delegate corresponding to the notification or the observer's method corresponding to the notification and returns the produced result.
     *
     * @memberOf Notification
     * @param {Any} observerOrOnNext Delegate to invoke for an OnNext notification or Observer to invoke the notification on..
     * @param {Function} onError Delegate to invoke for an OnError notification.
     * @param {Function} onCompleted Delegate to invoke for an OnCompleted notification.
     * @returns {Any} Result produced by the observation.
     */
    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
      return observerOrOnNext && typeof observerOrOnNext === 'object' ?
        this._acceptObservable(observerOrOnNext) :
        this._accept(observerOrOnNext, onError, onCompleted);
    };

    /**
     * Returns an observable sequence with a single notification.
     *
     * @memberOf Notifications
     * @param {Scheduler} [scheduler] Scheduler to send out the notification calls on.
     * @returns {Observable} The observable sequence that surfaces the behavior of the notification upon subscription.
     */
    Notification.prototype.toObservable = function (scheduler) {
      var self = this;
      isScheduler(scheduler) || (scheduler = immediateScheduler);
      return new AnonymousObservable(function (observer) {
        return scheduler.scheduleWithState(self, function (_, notification) {
          notification._acceptObservable(observer);
          notification.kind === 'N' && observer.onCompleted();
        });
      });
    };

    return Notification;
  })();

  /**
   * Creates an object that represents an OnNext notification to an observer.
   * @param {Any} value The value contained in the notification.
   * @returns {Notification} The OnNext notification containing the value.
   */
  var notificationCreateOnNext = Notification.createOnNext = (function () {
      function _accept(onNext) { return onNext(this.value); }
      function _acceptObservable(observer) { return observer.onNext(this.value); }
      function toString() { return 'OnNext(' + this.value + ')'; }

      return function (value) {
        return new Notification('N', value, null, _accept, _acceptObservable, toString);
      };
  }());

  /**
   * Creates an object that represents an OnError notification to an observer.
   * @param {Any} error The exception contained in the notification.
   * @returns {Notification} The OnError notification containing the exception.
   */
  var notificationCreateOnError = Notification.createOnError = (function () {
    function _accept (onNext, onError) { return onError(this.exception); }
    function _acceptObservable(observer) { return observer.onError(this.exception); }
    function toString () { return 'OnError(' + this.exception + ')'; }

    return function (e) {
      return new Notification('E', null, e, _accept, _acceptObservable, toString);
    };
  }());

  /**
   * Creates an object that represents an OnCompleted notification to an observer.
   * @returns {Notification} The OnCompleted notification.
   */
  var notificationCreateOnCompleted = Notification.createOnCompleted = (function () {
    function _accept (onNext, onError, onCompleted) { return onCompleted(); }
    function _acceptObservable(observer) { return observer.onCompleted(); }
    function toString () { return 'OnCompleted()'; }

    return function () {
      return new Notification('C', null, null, _accept, _acceptObservable, toString);
    };
  }());

  /**
   * Supports push-style iteration over an observable sequence.
   */
  var Observer = Rx.Observer = function () { };

  /**
   *  Creates a notification callback from an observer.
   * @returns The action that forwards its input notification to the underlying observer.
   */
  Observer.prototype.toNotifier = function () {
    var observer = this;
    return function (n) { return n.accept(observer); };
  };

  /**
   *  Hides the identity of an observer.
   * @returns An observer that hides the identity of the specified observer.
   */
  Observer.prototype.asObserver = function () {
    return new AnonymousObserver(this.onNext.bind(this), this.onError.bind(this), this.onCompleted.bind(this));
  };

  /**
   *  Checks access to the observer for grammar violations. This includes checking for multiple OnError or OnCompleted calls, as well as reentrancy in any of the observer methods.
   *  If a violation is detected, an Error is thrown from the offending observer method call.
   * @returns An observer that checks callbacks invocations against the observer grammar and, if the checks pass, forwards those to the specified observer.
   */
  Observer.prototype.checked = function () { return new CheckedObserver(this); };

  /**
   *  Creates an observer from the specified OnNext, along with optional OnError, and OnCompleted actions.
   * @param {Function} [onNext] Observer's OnNext action implementation.
   * @param {Function} [onError] Observer's OnError action implementation.
   * @param {Function} [onCompleted] Observer's OnCompleted action implementation.
   * @returns {Observer} The observer object implemented using the given actions.
   */
  var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
    onNext || (onNext = noop);
    onError || (onError = defaultError);
    onCompleted || (onCompleted = noop);
    return new AnonymousObserver(onNext, onError, onCompleted);
  };

  /**
   *  Creates an observer from a notification callback.
   *
   * @static
   * @memberOf Observer
   * @param {Function} handler Action that handles a notification.
   * @returns The observer object that invokes the specified handler using a notification corresponding to each message it receives.
   */
  Observer.fromNotifier = function (handler, thisArg) {
    return new AnonymousObserver(function (x) {
      return handler.call(thisArg, notificationCreateOnNext(x));
    }, function (e) {
      return handler.call(thisArg, notificationCreateOnError(e));
    }, function () {
      return handler.call(thisArg, notificationCreateOnCompleted());
    });
  };

  /**
   * Schedules the invocation of observer methods on the given scheduler.
   * @param {Scheduler} scheduler Scheduler to schedule observer messages on.
   * @returns {Observer} Observer whose messages are scheduled on the given scheduler.
   */
  Observer.prototype.notifyOn = function (scheduler) {
    return new ObserveOnObserver(scheduler, this);
  };

  Observer.prototype.makeSafe = function(disposable) {
    return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
  };

  /**
   * Abstract base class for implementations of the Observer class.
   * This base class enforces the grammar of observers where OnError and OnCompleted are terminal messages.
   */
  var AbstractObserver = Rx.internals.AbstractObserver = (function (__super__) {
    inherits(AbstractObserver, __super__);

    /**
     * Creates a new observer in a non-stopped state.
     */
    function AbstractObserver() {
      this.isStopped = false;
      __super__.call(this);
    }

    // Must be implemented by other observers
    AbstractObserver.prototype.next = notImplemented;
    AbstractObserver.prototype.error = notImplemented;
    AbstractObserver.prototype.completed = notImplemented;

    /**
     * Notifies the observer of a new element in the sequence.
     * @param {Any} value Next element in the sequence.
     */
    AbstractObserver.prototype.onNext = function (value) {
      if (!this.isStopped) { this.next(value); }
    };

    /**
     * Notifies the observer that an exception has occurred.
     * @param {Any} error The error that has occurred.
     */
    AbstractObserver.prototype.onError = function (error) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.error(error);
      }
    };

    /**
     * Notifies the observer of the end of the sequence.
     */
    AbstractObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.completed();
      }
    };

    /**
     * Disposes the observer, causing it to transition to the stopped state.
     */
    AbstractObserver.prototype.dispose = function () {
      this.isStopped = true;
    };

    AbstractObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.error(e);
        return true;
      }

      return false;
    };

    return AbstractObserver;
  }(Observer));

  /**
   * Class to create an Observer instance from delegate-based implementations of the on* methods.
   */
  var AnonymousObserver = Rx.AnonymousObserver = (function (__super__) {
    inherits(AnonymousObserver, __super__);

    /**
     * Creates an observer from the specified OnNext, OnError, and OnCompleted actions.
     * @param {Any} onNext Observer's OnNext action implementation.
     * @param {Any} onError Observer's OnError action implementation.
     * @param {Any} onCompleted Observer's OnCompleted action implementation.
     */
    function AnonymousObserver(onNext, onError, onCompleted) {
      __super__.call(this);
      this._onNext = onNext;
      this._onError = onError;
      this._onCompleted = onCompleted;
    }

    /**
     * Calls the onNext action.
     * @param {Any} value Next element in the sequence.
     */
    AnonymousObserver.prototype.next = function (value) {
      this._onNext(value);
    };

    /**
     * Calls the onError action.
     * @param {Any} error The error that has occurred.
     */
    AnonymousObserver.prototype.error = function (error) {
      this._onError(error);
    };

    /**
     *  Calls the onCompleted action.
     */
    AnonymousObserver.prototype.completed = function () {
      this._onCompleted();
    };

    return AnonymousObserver;
  }(AbstractObserver));

  var CheckedObserver = (function (__super__) {
    inherits(CheckedObserver, __super__);

    function CheckedObserver(observer) {
      __super__.call(this);
      this._observer = observer;
      this._state = 0; // 0 - idle, 1 - busy, 2 - done
    }

    var CheckedObserverPrototype = CheckedObserver.prototype;

    CheckedObserverPrototype.onNext = function (value) {
      this.checkAccess();
      var res = tryCatch(this._observer.onNext).call(this._observer, value);
      this._state = 0;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.onError = function (err) {
      this.checkAccess();
      var res = tryCatch(this._observer.onError).call(this._observer, err);
      this._state = 2;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.onCompleted = function () {
      this.checkAccess();
      var res = tryCatch(this._observer.onCompleted).call(this._observer);
      this._state = 2;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.checkAccess = function () {
      if (this._state === 1) { throw new Error('Re-entrancy detected'); }
      if (this._state === 2) { throw new Error('Observer completed'); }
      if (this._state === 0) { this._state = 1; }
    };

    return CheckedObserver;
  }(Observer));

  var ScheduledObserver = Rx.internals.ScheduledObserver = (function (__super__) {
    inherits(ScheduledObserver, __super__);

    function ScheduledObserver(scheduler, observer) {
      __super__.call(this);
      this.scheduler = scheduler;
      this.observer = observer;
      this.isAcquired = false;
      this.hasFaulted = false;
      this.queue = [];
      this.disposable = new SerialDisposable();
    }

    ScheduledObserver.prototype.next = function (value) {
      var self = this;
      this.queue.push(function () { self.observer.onNext(value); });
    };

    ScheduledObserver.prototype.error = function (e) {
      var self = this;
      this.queue.push(function () { self.observer.onError(e); });
    };

    ScheduledObserver.prototype.completed = function () {
      var self = this;
      this.queue.push(function () { self.observer.onCompleted(); });
    };

    ScheduledObserver.prototype.ensureActive = function () {
      var isOwner = false, parent = this;
      if (!this.hasFaulted && this.queue.length > 0) {
        isOwner = !this.isAcquired;
        this.isAcquired = true;
      }
      if (isOwner) {
        this.disposable.setDisposable(this.scheduler.scheduleRecursive(function (self) {
          var work;
          if (parent.queue.length > 0) {
            work = parent.queue.shift();
          } else {
            parent.isAcquired = false;
            return;
          }
          try {
            work();
          } catch (ex) {
            parent.queue = [];
            parent.hasFaulted = true;
            throw ex;
          }
          self();
        }));
      }
    };

    ScheduledObserver.prototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this.disposable.dispose();
    };

    return ScheduledObserver;
  }(AbstractObserver));

  var ObserveOnObserver = (function (__super__) {
    inherits(ObserveOnObserver, __super__);

    function ObserveOnObserver(scheduler, observer, cancel) {
      __super__.call(this, scheduler, observer);
      this._cancel = cancel;
    }

    ObserveOnObserver.prototype.next = function (value) {
      __super__.prototype.next.call(this, value);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.error = function (e) {
      __super__.prototype.error.call(this, e);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.completed = function () {
      __super__.prototype.completed.call(this);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this._cancel && this._cancel.dispose();
      this._cancel = null;
    };

    return ObserveOnObserver;
  })(ScheduledObserver);

  var observableProto;

  /**
   * Represents a push-style collection.
   */
  var Observable = Rx.Observable = (function () {

    function Observable(subscribe) {
      if (Rx.config.longStackSupport && hasStacks) {
        try {
          throw new Error();
        } catch (e) {
          this.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }

        var self = this;
        this._subscribe = function (observer) {
          var oldOnError = observer.onError.bind(observer);

          observer.onError = function (err) {
            makeStackTraceLong(err, self);
            oldOnError(err);
          };

          return subscribe.call(self, observer);
        };
      } else {
        this._subscribe = subscribe;
      }
    }

    observableProto = Observable.prototype;

    /**
     *  Subscribes an observer to the observable sequence.
     *  @param {Mixed} [observerOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.
     *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.
     *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.
     *  @returns {Diposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribe = observableProto.forEach = function (observerOrOnNext, onError, onCompleted) {
      return this._subscribe(typeof observerOrOnNext === 'object' ?
        observerOrOnNext :
        observerCreate(observerOrOnNext, onError, onCompleted));
    };

    /**
     * Subscribes to the next value in the sequence with an optional "this" argument.
     * @param {Function} onNext The function to invoke on each element in the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnNext = function (onNext, thisArg) {
      return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) { onNext.call(thisArg, x); } : onNext));
    };

    /**
     * Subscribes to an exceptional condition in the sequence with an optional "this" argument.
     * @param {Function} onError The function to invoke upon exceptional termination of the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnError = function (onError, thisArg) {
      return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) { onError.call(thisArg, e); } : onError));
    };

    /**
     * Subscribes to the next value in the sequence with an optional "this" argument.
     * @param {Function} onCompleted The function to invoke upon graceful termination of the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {
      return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() { onCompleted.call(thisArg); } : onCompleted));
    };

    return Observable;
  })();

  var ObservableBase = Rx.ObservableBase = (function (__super__) {
    inherits(ObservableBase, __super__);

    function fixSubscriber(subscriber) {
      return subscriber && isFunction(subscriber.dispose) ? subscriber :
        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
    }

    function setDisposable(s, state) {
      var ado = state[0], self = state[1];
      var sub = tryCatch(self.subscribeCore).call(self, ado);

      if (sub === errorObj) {
        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
      }
      ado.setDisposable(fixSubscriber(sub));
    }

    function subscribe(observer) {
      var ado = new AutoDetachObserver(observer), state = [ado, this];

      if (currentThreadScheduler.scheduleRequired()) {
        currentThreadScheduler.scheduleWithState(state, setDisposable);
      } else {
        setDisposable(null, state);
      }
      return ado;
    }

    function ObservableBase() {
      __super__.call(this, subscribe);
    }

    ObservableBase.prototype.subscribeCore = notImplemented;

    return ObservableBase;
  }(Observable));

  var Enumerable = Rx.internals.Enumerable = function () { };

  var ConcatEnumerableObservable = (function(__super__) {
    inherits(ConcatEnumerableObservable, __super__);
    function ConcatEnumerableObservable(sources) {
      this.sources = sources;
      __super__.call(this);
    }
    
    ConcatEnumerableObservable.prototype.subscribeCore = function (o) {
      var isDisposed, subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursiveWithState(this.sources[$iterator$](), function (e, self) {
        if (isDisposed) { return; }
        var currentItem = tryCatch(e.next).call(e);
        if (currentItem === errorObj) { return o.onError(currentItem.e); }

        if (currentItem.done) {
          return o.onCompleted();
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(currentValue.subscribe(new InnerObserver(o, self, e)));
      });

      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    };
    
    function InnerObserver(o, s, e) {
      this.o = o;
      this.s = s;
      this.e = e;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.o.onNext(x); } };
    InnerObserver.prototype.onError = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.s(this.e);
      }
    };
    InnerObserver.prototype.dispose = function () { this.isStopped = true; };
    InnerObserver.prototype.fail = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
        return true;
      }
      return false;
    };
    
    return ConcatEnumerableObservable;
  }(ObservableBase));

  Enumerable.prototype.concat = function () {
    return new ConcatEnumerableObservable(this);
  };
  
  var CatchErrorObservable = (function(__super__) {
    inherits(CatchErrorObservable, __super__);
    function CatchErrorObservable(sources) {
      this.sources = sources;
      __super__.call(this);
    }
    
    CatchErrorObservable.prototype.subscribeCore = function (o) {
      var e = this.sources[$iterator$]();

      var isDisposed, subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursiveWithState(null, function (lastException, self) {
        if (isDisposed) { return; }
        var currentItem = tryCatch(e.next).call(e);
        if (currentItem === errorObj) { return o.onError(currentItem.e); }

        if (currentItem.done) {
          return lastException !== null ? o.onError(lastException) : o.onCompleted();
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(currentValue.subscribe(
          function(x) { o.onNext(x); },
          self,
          function() { o.onCompleted(); }));
      });
      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    };
    
    return CatchErrorObservable;
  }(ObservableBase));

  Enumerable.prototype.catchError = function () {
    return new CatchErrorObservable(this);
  };

  Enumerable.prototype.catchErrorWhen = function (notificationHandler) {
    var sources = this;
    return new AnonymousObservable(function (o) {
      var exceptions = new Subject(),
        notifier = new Subject(),
        handled = notificationHandler(exceptions),
        notificationDisposable = handled.subscribe(notifier);

      var e = sources[$iterator$]();

      var isDisposed,
        lastException,
        subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursive(function (self) {
        if (isDisposed) { return; }
        var currentItem = tryCatch(e.next).call(e);
        if (currentItem === errorObj) { return o.onError(currentItem.e); }

        if (currentItem.done) {
          if (lastException) {
            o.onError(lastException);
          } else {
            o.onCompleted();
          }
          return;
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var outer = new SingleAssignmentDisposable();
        var inner = new SingleAssignmentDisposable();
        subscription.setDisposable(new CompositeDisposable(inner, outer));
        outer.setDisposable(currentValue.subscribe(
          function(x) { o.onNext(x); },
          function (exn) {
            inner.setDisposable(notifier.subscribe(self, function(ex) {
              o.onError(ex);
            }, function() {
              o.onCompleted();
            }));

            exceptions.onNext(exn);
          },
          function() { o.onCompleted(); }));
      });

      return new CompositeDisposable(notificationDisposable, subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    });
  };
  
  var RepeatEnumerable = (function (__super__) {
    inherits(RepeatEnumerable, __super__);
    
    function RepeatEnumerable(v, c) {
      this.v = v;
      this.c = c == null ? -1 : c;
    }
    RepeatEnumerable.prototype[$iterator$] = function () {
      return new RepeatEnumerator(this); 
    };
    
    function RepeatEnumerator(p) {
      this.v = p.v;
      this.l = p.c;
    }
    RepeatEnumerator.prototype.next = function () {
      if (this.l === 0) { return doneEnumerator; }
      if (this.l > 0) { this.l--; }
      return { done: false, value: this.v }; 
    };
    
    return RepeatEnumerable;
  }(Enumerable));

  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
    return new RepeatEnumerable(value, repeatCount);
  };
  
  var OfEnumerable = (function(__super__) {
    inherits(OfEnumerable, __super__);
    function OfEnumerable(s, fn, thisArg) {
      this.s = s;
      this.fn = fn ? bindCallback(fn, thisArg, 3) : null;
    }
    OfEnumerable.prototype[$iterator$] = function () {
      return new OfEnumerator(this);
    };
    
    function OfEnumerator(p) {
      this.i = -1;
      this.s = p.s;
      this.l = this.s.length;
      this.fn = p.fn;
    }
    OfEnumerator.prototype.next = function () {
     return ++this.i < this.l ?
       { done: false, value: !this.fn ? this.s[this.i] : this.fn(this.s[this.i], this.i, this.s) } :
       doneEnumerator; 
    };
    
    return OfEnumerable;
  }(Enumerable));

  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
    return new OfEnumerable(source, selector, thisArg);
  };

   /**
   *  Wraps the source sequence in order to run its observer callbacks on the specified scheduler.
   *
   *  This only invokes observer callbacks on a scheduler. In case the subscription and/or unsubscription actions have side-effects
   *  that require to be run on a scheduler, use subscribeOn.
   *
   *  @param {Scheduler} scheduler Scheduler to notify observers on.
   *  @returns {Observable} The source sequence whose observations happen on the specified scheduler.
   */
  observableProto.observeOn = function (scheduler) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      return source.subscribe(new ObserveOnObserver(scheduler, observer));
    }, source);
  };

   /**
   *  Wraps the source sequence in order to run its subscription and unsubscription logic on the specified scheduler. This operation is not commonly used;
   *  see the remarks section for more information on the distinction between subscribeOn and observeOn.

   *  This only performs the side-effects of subscription and unsubscription on the specified scheduler. In order to invoke observer
   *  callbacks on a scheduler, use observeOn.

   *  @param {Scheduler} scheduler Scheduler to perform subscription and unsubscription actions on.
   *  @returns {Observable} The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.
   */
  observableProto.subscribeOn = function (scheduler) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var m = new SingleAssignmentDisposable(), d = new SerialDisposable();
      d.setDisposable(m);
      m.setDisposable(scheduler.schedule(function () {
        d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(observer)));
      }));
      return d;
    }, source);
  };

	var FromPromiseObservable = (function(__super__) {
		inherits(FromPromiseObservable, __super__);
		function FromPromiseObservable(p) {
			this.p = p;
			__super__.call(this);
		}
		
		FromPromiseObservable.prototype.subscribeCore = function(o) {
			this.p.then(function (data) {
				o.onNext(data);
				o.onCompleted();
			}, function (err) { o.onError(err); });
			return disposableEmpty;	
		};
		
		return FromPromiseObservable;
	}(ObservableBase));	 
	 
	 /**
	 * Converts a Promise to an Observable sequence
	 * @param {Promise} An ES6 Compliant promise.
	 * @returns {Observable} An Observable sequence which wraps the existing promise success and failure.
	 */
	var observableFromPromise = Observable.fromPromise = function (promise) {
		return new FromPromiseObservable(promise);
	};
  /*
   * Converts an existing observable sequence to an ES6 Compatible Promise
   * @example
   * var promise = Rx.Observable.return(42).toPromise(RSVP.Promise);
   *
   * // With config
   * Rx.config.Promise = RSVP.Promise;
   * var promise = Rx.Observable.return(42).toPromise();
   * @param {Function} [promiseCtor] The constructor of the promise. If not provided, it looks for it in Rx.config.Promise.
   * @returns {Promise} An ES6 compatible promise with the last value from the observable sequence.
   */
  observableProto.toPromise = function (promiseCtor) {
    promiseCtor || (promiseCtor = Rx.config.Promise);
    if (!promiseCtor) { throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise'); }
    var source = this;
    return new promiseCtor(function (resolve, reject) {
      // No cancellation can be done
      var value, hasValue = false;
      source.subscribe(function (v) {
        value = v;
        hasValue = true;
      }, reject, function () {
        hasValue && resolve(value);
      });
    });
  };

  var ToArrayObservable = (function(__super__) {
    inherits(ToArrayObservable, __super__);
    function ToArrayObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    ToArrayObservable.prototype.subscribeCore = function(o) {
      return this.source.subscribe(new InnerObserver(o));
    };

    function InnerObserver(o) {
      this.o = o;
      this.a = [];
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.a.push(x); } };
    InnerObserver.prototype.onError = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onNext(this.a);
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function () { this.isStopped = true; }
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
 
      return false;
    };

    return ToArrayObservable;
  }(ObservableBase));

  /**
  * Creates an array from an observable sequence.
  * @returns {Observable} An observable sequence containing a single element with a list containing all the elements of the source sequence.
  */
  observableProto.toArray = function () {
    return new ToArrayObservable(this);
  };

  /**
   *  Creates an observable sequence from a specified subscribe method implementation.
   * @example
   *  var res = Rx.Observable.create(function (observer) { return function () { } );
   *  var res = Rx.Observable.create(function (observer) { return Rx.Disposable.empty; } );
   *  var res = Rx.Observable.create(function (observer) { } );
   * @param {Function} subscribe Implementation of the resulting observable sequence's subscribe method, returning a function that will be wrapped in a Disposable.
   * @returns {Observable} The observable sequence with the specified implementation for the Subscribe method.
   */
  Observable.create = Observable.createWithDisposable = function (subscribe, parent) {
    return new AnonymousObservable(subscribe, parent);
  };

  /**
   *  Returns an observable sequence that invokes the specified factory function whenever a new observer subscribes.
   *
   * @example
   *  var res = Rx.Observable.defer(function () { return Rx.Observable.fromArray([1,2,3]); });
   * @param {Function} observableFactory Observable factory function to invoke for each observer that subscribes to the resulting sequence or Promise.
   * @returns {Observable} An observable sequence whose observers trigger an invocation of the given observable factory function.
   */
  var observableDefer = Observable.defer = function (observableFactory) {
    return new AnonymousObservable(function (observer) {
      var result;
      try {
        result = observableFactory();
      } catch (e) {
        return observableThrow(e).subscribe(observer);
      }
      isPromise(result) && (result = observableFromPromise(result));
      return result.subscribe(observer);
    });
  };

  var EmptyObservable = (function(__super__) {
    inherits(EmptyObservable, __super__);
    function EmptyObservable(scheduler) {
      this.scheduler = scheduler;
      __super__.call(this);
    }

    EmptyObservable.prototype.subscribeCore = function (observer) {
      var sink = new EmptySink(observer, this);
      return sink.run();
    };

    function EmptySink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    function scheduleItem(s, state) {
      state.onCompleted();
    }

    EmptySink.prototype.run = function () {
      return this.parent.scheduler.scheduleWithState(this.observer, scheduleItem);
    };

    return EmptyObservable;
  }(ObservableBase));

  /**
   *  Returns an empty observable sequence, using the specified scheduler to send out the single OnCompleted message.
   *
   * @example
   *  var res = Rx.Observable.empty();
   *  var res = Rx.Observable.empty(Rx.Scheduler.timeout);
   * @param {Scheduler} [scheduler] Scheduler to send the termination call on.
   * @returns {Observable} An observable sequence with no elements.
   */
  var observableEmpty = Observable.empty = function (scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new EmptyObservable(scheduler);
  };

  var FromObservable = (function(__super__) {
    inherits(FromObservable, __super__);
    function FromObservable(iterable, mapper, scheduler) {
      this.iterable = iterable;
      this.mapper = mapper;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    FromObservable.prototype.subscribeCore = function (observer) {
      var sink = new FromSink(observer, this);
      return sink.run();
    };

    return FromObservable;
  }(ObservableBase));

  var FromSink = (function () {
    function FromSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    FromSink.prototype.run = function () {
      var list = Object(this.parent.iterable),
          it = getIterable(list),
          observer = this.observer,
          mapper = this.parent.mapper;

      function loopRecursive(i, recurse) {
        try {
          var next = it.next();
        } catch (e) {
          return observer.onError(e);
        }
        if (next.done) {
          return observer.onCompleted();
        }

        var result = next.value;

        if (mapper) {
          try {
            result = mapper(result, i);
          } catch (e) {
            return observer.onError(e);
          }
        }

        observer.onNext(result);
        recurse(i + 1);
      }

      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
    };

    return FromSink;
  }());

  var maxSafeInteger = Math.pow(2, 53) - 1;

  function StringIterable(str) {
    this._s = s;
  }

  StringIterable.prototype[$iterator$] = function () {
    return new StringIterator(this._s);
  };

  function StringIterator(str) {
    this._s = s;
    this._l = s.length;
    this._i = 0;
  }

  StringIterator.prototype[$iterator$] = function () {
    return this;
  };

  StringIterator.prototype.next = function () {
    return this._i < this._l ? { done: false, value: this._s.charAt(this._i++) } : doneEnumerator;
  };

  function ArrayIterable(a) {
    this._a = a;
  }

  ArrayIterable.prototype[$iterator$] = function () {
    return new ArrayIterator(this._a);
  };

  function ArrayIterator(a) {
    this._a = a;
    this._l = toLength(a);
    this._i = 0;
  }

  ArrayIterator.prototype[$iterator$] = function () {
    return this;
  };

  ArrayIterator.prototype.next = function () {
    return this._i < this._l ? { done: false, value: this._a[this._i++] } : doneEnumerator;
  };

  function numberIsFinite(value) {
    return typeof value === 'number' && root.isFinite(value);
  }

  function isNan(n) {
    return n !== n;
  }

  function getIterable(o) {
    var i = o[$iterator$], it;
    if (!i && typeof o === 'string') {
      it = new StringIterable(o);
      return it[$iterator$]();
    }
    if (!i && o.length !== undefined) {
      it = new ArrayIterable(o);
      return it[$iterator$]();
    }
    if (!i) { throw new TypeError('Object is not iterable'); }
    return o[$iterator$]();
  }

  function sign(value) {
    var number = +value;
    if (number === 0) { return number; }
    if (isNaN(number)) { return number; }
    return number < 0 ? -1 : 1;
  }

  function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) { return 0; }
    if (len === 0 || !numberIsFinite(len)) { return len; }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) { return 0; }
    if (len > maxSafeInteger) { return maxSafeInteger; }
    return len;
  }

  /**
  * This method creates a new Observable sequence from an array-like or iterable object.
  * @param {Any} arrayLike An array-like or iterable object to convert to an Observable sequence.
  * @param {Function} [mapFn] Map function to call on every element of the array.
  * @param {Any} [thisArg] The context to use calling the mapFn if provided.
  * @param {Scheduler} [scheduler] Optional scheduler to use for scheduling.  If not provided, defaults to Scheduler.currentThread.
  */
  var observableFrom = Observable.from = function (iterable, mapFn, thisArg, scheduler) {
    if (iterable == null) {
      throw new Error('iterable cannot be null.')
    }
    if (mapFn && !isFunction(mapFn)) {
      throw new Error('mapFn when provided must be a function');
    }
    if (mapFn) {
      var mapper = bindCallback(mapFn, thisArg, 2);
    }
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromObservable(iterable, mapper, scheduler);
  }

  var FromArrayObservable = (function(__super__) {
    inherits(FromArrayObservable, __super__);
    function FromArrayObservable(args, scheduler) {
      this.args = args;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    FromArrayObservable.prototype.subscribeCore = function (observer) {
      var sink = new FromArraySink(observer, this);
      return sink.run();
    };

    return FromArrayObservable;
  }(ObservableBase));

  function FromArraySink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  FromArraySink.prototype.run = function () {
    var observer = this.observer, args = this.parent.args, len = args.length;
    function loopRecursive(i, recurse) {
      if (i < len) {
        observer.onNext(args[i]);
        recurse(i + 1);
      } else {
        observer.onCompleted();
      }
    }

    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
  };

  /**
  *  Converts an array to an observable sequence, using an optional scheduler to enumerate the array.
  * @deprecated use Observable.from or Observable.of
  * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
  * @returns {Observable} The observable sequence whose elements are pulled from the given enumerable sequence.
  */
  var observableFromArray = Observable.fromArray = function (array, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromArrayObservable(array, scheduler)
  };

  /**
   *  Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
   *
   * @example
   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; });
   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; }, Rx.Scheduler.timeout);
   * @param {Mixed} initialState Initial state.
   * @param {Function} condition Condition to terminate generation (upon returning false).
   * @param {Function} iterate Iteration step function.
   * @param {Function} resultSelector Selector function for results produced in the sequence.
   * @param {Scheduler} [scheduler] Scheduler on which to run the generator loop. If not provided, defaults to Scheduler.currentThread.
   * @returns {Observable} The generated sequence.
   */
  Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new AnonymousObservable(function (o) {
      var first = true;
      return scheduler.scheduleRecursiveWithState(initialState, function (state, self) {
        var hasResult, result;
        try {
          if (first) {
            first = false;
          } else {
            state = iterate(state);
          }
          hasResult = condition(state);
          hasResult && (result = resultSelector(state));
        } catch (e) {
          return o.onError(e);
        }
        if (hasResult) {
          o.onNext(result);
          self(state);
        } else {
          o.onCompleted();
        }
      });
    });
  };

  function observableOf (scheduler, array) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromArrayObservable(array, scheduler);
  }

  /**
  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
  */
  Observable.of = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    return new FromArrayObservable(args, currentThreadScheduler);
  };

  /**
  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
  * @param {Scheduler} scheduler A scheduler to use for scheduling the arguments.
  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
  */
  Observable.ofWithScheduler = function (scheduler) {
    var len = arguments.length, args = new Array(len - 1);
    for(var i = 1; i < len; i++) { args[i - 1] = arguments[i]; }
    return new FromArrayObservable(args, scheduler);
  };

  /**
   * Creates an Observable sequence from changes to an array using Array.observe.
   * @param {Array} array An array to observe changes.
   * @returns {Observable} An observable sequence containing changes to an array from Array.observe.
   */
  Observable.ofArrayChanges = function(array) {
    if (!Array.isArray(array)) { throw new TypeError('Array.observe only accepts arrays.'); }
    if (typeof Array.observe !== 'function' && typeof Array.unobserve !== 'function') { throw new TypeError('Array.observe is not supported on your platform') }
    return new AnonymousObservable(function(observer) {
      function observerFn(changes) {
        for(var i = 0, len = changes.length; i < len; i++) {
          observer.onNext(changes[i]);
        }
      }
      
      Array.observe(array, observerFn);

      return function () {
        Array.unobserve(array, observerFn);
      };
    });
  };

  /**
   * Creates an Observable sequence from changes to an object using Object.observe.
   * @param {Object} obj An object to observe changes.
   * @returns {Observable} An observable sequence containing changes to an object from Object.observe.
   */
  Observable.ofObjectChanges = function(obj) {
    if (obj == null) { throw new TypeError('object must not be null or undefined.'); }
    if (typeof Object.observe !== 'function' && typeof Object.unobserve !== 'function') { throw new TypeError('Object.observe is not supported on your platform') }
    return new AnonymousObservable(function(observer) {
      function observerFn(changes) {
        for(var i = 0, len = changes.length; i < len; i++) {
          observer.onNext(changes[i]);
        }
      }

      Object.observe(obj, observerFn);

      return function () {
        Object.unobserve(obj, observerFn);
      };
    });
  };

  var NeverObservable = (function(__super__) {
    inherits(NeverObservable, __super__);
    function NeverObservable() {
      __super__.call(this);
    }

    NeverObservable.prototype.subscribeCore = function (observer) {
      return disposableEmpty;
    };

    return NeverObservable;
  }(ObservableBase));

  /**
   * Returns a non-terminating observable sequence, which can be used to denote an infinite duration (e.g. when using reactive joins).
   * @returns {Observable} An observable sequence whose observers will never get called.
   */
  var observableNever = Observable.never = function () {
    return new NeverObservable();
  };

  var PairsObservable = (function(__super__) {
    inherits(PairsObservable, __super__);
    function PairsObservable(obj, scheduler) {
      this.obj = obj;
      this.keys = Object.keys(obj);
      this.scheduler = scheduler;
      __super__.call(this);
    }

    PairsObservable.prototype.subscribeCore = function (observer) {
      var sink = new PairsSink(observer, this);
      return sink.run();
    };

    return PairsObservable;
  }(ObservableBase));

  function PairsSink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  PairsSink.prototype.run = function () {
    var observer = this.observer, obj = this.parent.obj, keys = this.parent.keys, len = keys.length;
    function loopRecursive(i, recurse) {
      if (i < len) {
        var key = keys[i];
        observer.onNext([key, obj[key]]);
        recurse(i + 1);
      } else {
        observer.onCompleted();
      }
    }

    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
  };

  /**
   * Convert an object into an observable sequence of [key, value] pairs.
   * @param {Object} obj The object to inspect.
   * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
   * @returns {Observable} An observable sequence of [key, value] pairs from the object.
   */
  Observable.pairs = function (obj, scheduler) {
    scheduler || (scheduler = currentThreadScheduler);
    return new PairsObservable(obj, scheduler);
  };

    var RangeObservable = (function(__super__) {
    inherits(RangeObservable, __super__);
    function RangeObservable(start, count, scheduler) {
      this.start = start;
      this.rangeCount = count;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    RangeObservable.prototype.subscribeCore = function (observer) {
      var sink = new RangeSink(observer, this);
      return sink.run();
    };

    return RangeObservable;
  }(ObservableBase));

  var RangeSink = (function () {
    function RangeSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    RangeSink.prototype.run = function () {
      var start = this.parent.start, count = this.parent.rangeCount, observer = this.observer;
      function loopRecursive(i, recurse) {
        if (i < count) {
          observer.onNext(start + i);
          recurse(i + 1);
        } else {
          observer.onCompleted();
        }
      }

      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
    };

    return RangeSink;
  }());

  /**
  *  Generates an observable sequence of integral numbers within a specified range, using the specified scheduler to send out observer messages.
  * @param {Number} start The value of the first integer in the sequence.
  * @param {Number} count The number of sequential integers to generate.
  * @param {Scheduler} [scheduler] Scheduler to run the generator loop on. If not specified, defaults to Scheduler.currentThread.
  * @returns {Observable} An observable sequence that contains a range of sequential integral numbers.
  */
  Observable.range = function (start, count, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new RangeObservable(start, count, scheduler);
  };

  var RepeatObservable = (function(__super__) {
    inherits(RepeatObservable, __super__);
    function RepeatObservable(value, repeatCount, scheduler) {
      this.value = value;
      this.repeatCount = repeatCount == null ? -1 : repeatCount;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    RepeatObservable.prototype.subscribeCore = function (observer) {
      var sink = new RepeatSink(observer, this);
      return sink.run();
    };

    return RepeatObservable;
  }(ObservableBase));

  function RepeatSink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  RepeatSink.prototype.run = function () {
    var observer = this.observer, value = this.parent.value;
    function loopRecursive(i, recurse) {
      if (i === -1 || i > 0) {
        observer.onNext(value);
        i > 0 && i--;
      }
      if (i === 0) { return observer.onCompleted(); }
      recurse(i);
    }

    return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount, loopRecursive);
  };

  /**
   *  Generates an observable sequence that repeats the given element the specified number of times, using the specified scheduler to send out observer messages.
   * @param {Mixed} value Element to repeat.
   * @param {Number} repeatCount [Optiona] Number of times to repeat the element. If not specified, repeats indefinitely.
   * @param {Scheduler} scheduler Scheduler to run the producer loop on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} An observable sequence that repeats the given element the specified number of times.
   */
  Observable.repeat = function (value, repeatCount, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new RepeatObservable(value, repeatCount, scheduler);
  };

  var JustObservable = (function(__super__) {
    inherits(JustObservable, __super__);
    function JustObservable(value, scheduler) {
      this.value = value;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    JustObservable.prototype.subscribeCore = function (observer) {
      var sink = new JustSink(observer, this);
      return sink.run();
    };

    function JustSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    function scheduleItem(s, state) {
      var value = state[0], observer = state[1];
      observer.onNext(value);
      observer.onCompleted();
    }

    JustSink.prototype.run = function () {
      return this.parent.scheduler.scheduleWithState([this.parent.value, this.observer], scheduleItem);
    };

    return JustObservable;
  }(ObservableBase));

  /**
   *  Returns an observable sequence that contains a single element, using the specified scheduler to send out observer messages.
   *  There is an alias called 'just' or browsers <IE9.
   * @param {Mixed} value Single element in the resulting observable sequence.
   * @param {Scheduler} scheduler Scheduler to send the single element on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} An observable sequence containing the single specified element.
   */
  var observableReturn = Observable['return'] = Observable.just = Observable.returnValue = function (value, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new JustObservable(value, scheduler);
  };

  var ThrowObservable = (function(__super__) {
    inherits(ThrowObservable, __super__);
    function ThrowObservable(error, scheduler) {
      this.error = error;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    ThrowObservable.prototype.subscribeCore = function (o) {
      var sink = new ThrowSink(o, this);
      return sink.run();
    };

    function ThrowSink(o, p) {
      this.o = o;
      this.p = p;
    }

    function scheduleItem(s, state) {
      var e = state[0], o = state[1];
      o.onError(e);
    }

    ThrowSink.prototype.run = function () {
      return this.p.scheduler.scheduleWithState([this.p.error, this.o], scheduleItem);
    };

    return ThrowObservable;
  }(ObservableBase));

  /**
   *  Returns an observable sequence that terminates with an exception, using the specified scheduler to send out the single onError message.
   *  There is an alias to this method called 'throwError' for browsers <IE9.
   * @param {Mixed} error An object used for the sequence's termination.
   * @param {Scheduler} scheduler Scheduler to send the exceptional termination call on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} The observable sequence that terminates exceptionally with the specified exception object.
   */
  var observableThrow = Observable['throw'] = Observable.throwError = Observable.throwException = function (error, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new ThrowObservable(error, scheduler);
  };

  /**
   * Constructs an observable sequence that depends on a resource object, whose lifetime is tied to the resulting observable sequence's lifetime.
   * @param {Function} resourceFactory Factory function to obtain a resource object.
   * @param {Function} observableFactory Factory function to obtain an observable sequence that depends on the obtained resource.
   * @returns {Observable} An observable sequence whose lifetime controls the lifetime of the dependent resource object.
   */
  Observable.using = function (resourceFactory, observableFactory) {
    return new AnonymousObservable(function (observer) {
      var disposable = disposableEmpty, resource, source;
      try {
        resource = resourceFactory();
        resource && (disposable = resource);
        source = observableFactory(resource);
      } catch (exception) {
        return new CompositeDisposable(observableThrow(exception).subscribe(observer), disposable);
      }
      return new CompositeDisposable(source.subscribe(observer), disposable);
    });
  };

  /**
   * Propagates the observable sequence or Promise that reacts first.
   * @param {Observable} rightSource Second observable sequence or Promise.
   * @returns {Observable} {Observable} An observable sequence that surfaces either of the given sequences, whichever reacted first.
   */
  observableProto.amb = function (rightSource) {
    var leftSource = this;
    return new AnonymousObservable(function (observer) {
      var choice,
        leftChoice = 'L', rightChoice = 'R',
        leftSubscription = new SingleAssignmentDisposable(),
        rightSubscription = new SingleAssignmentDisposable();

      isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));

      function choiceL() {
        if (!choice) {
          choice = leftChoice;
          rightSubscription.dispose();
        }
      }

      function choiceR() {
        if (!choice) {
          choice = rightChoice;
          leftSubscription.dispose();
        }
      }

      leftSubscription.setDisposable(leftSource.subscribe(function (left) {
        choiceL();
        choice === leftChoice && observer.onNext(left);
      }, function (err) {
        choiceL();
        choice === leftChoice && observer.onError(err);
      }, function () {
        choiceL();
        choice === leftChoice && observer.onCompleted();
      }));

      rightSubscription.setDisposable(rightSource.subscribe(function (right) {
        choiceR();
        choice === rightChoice && observer.onNext(right);
      }, function (err) {
        choiceR();
        choice === rightChoice && observer.onError(err);
      }, function () {
        choiceR();
        choice === rightChoice && observer.onCompleted();
      }));

      return new CompositeDisposable(leftSubscription, rightSubscription);
    });
  };

  /**
   * Propagates the observable sequence or Promise that reacts first.
   *
   * @example
   * var = Rx.Observable.amb(xs, ys, zs);
   * @returns {Observable} An observable sequence that surfaces any of the given sequences, whichever reacted first.
   */
  Observable.amb = function () {
    var acc = observableNever(), items = [];
    if (Array.isArray(arguments[0])) {
      items = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
    }

    function func(previous, current) {
      return previous.amb(current);
    }
    for (var i = 0, len = items.length; i < len; i++) {
      acc = func(acc, items[i]);
    }
    return acc;
  };

  function observableCatchHandler(source, handler) {
    return new AnonymousObservable(function (o) {
      var d1 = new SingleAssignmentDisposable(), subscription = new SerialDisposable();
      subscription.setDisposable(d1);
      d1.setDisposable(source.subscribe(function (x) { o.onNext(x); }, function (e) {
        try {
          var result = handler(e);
        } catch (ex) {
          return o.onError(ex);
        }
        isPromise(result) && (result = observableFromPromise(result));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(result.subscribe(o));
      }, function (x) { o.onCompleted(x); }));

      return subscription;
    }, source);
  }

  /**
   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
   * @example
   * 1 - xs.catchException(ys)
   * 2 - xs.catchException(function (ex) { return ys(ex); })
   * @param {Mixed} handlerOrSecond Exception handler function that returns an observable sequence given the error that occurred in the first sequence, or a second observable sequence used to produce results when an error occurred in the first sequence.
   * @returns {Observable} An observable sequence containing the first sequence's elements, followed by the elements of the handler sequence in case an exception occurred.
   */
  observableProto['catch'] = observableProto.catchError = observableProto.catchException = function (handlerOrSecond) {
    return typeof handlerOrSecond === 'function' ?
      observableCatchHandler(this, handlerOrSecond) :
      observableCatch([this, handlerOrSecond]);
  };

  /**
   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
   * @param {Array | Arguments} args Arguments or an array to use as the next sequence if an error occurs.
   * @returns {Observable} An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.
   */
  var observableCatch = Observable.catchError = Observable['catch'] = Observable.catchException = function () {
    var items = [];
    if (Array.isArray(arguments[0])) {
      items = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
    }
    return enumerableOf(items).catchError();
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
   * This can be in the form of an argument list of observables or an array.
   *
   * @example
   * 1 - obs = observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
   * 2 - obs = observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  observableProto.combineLatest = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    if (Array.isArray(args[0])) {
      args[0].unshift(this);
    } else {
      args.unshift(this);
    }
    return combineLatest.apply(this, args);
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
   *
   * @example
   * 1 - obs = Rx.Observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
   * 2 - obs = Rx.Observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  var combineLatest = Observable.combineLatest = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var resultSelector = args.pop();
    Array.isArray(args[0]) && (args = args[0]);

    return new AnonymousObservable(function (o) {
      var n = args.length,
        falseFactory = function () { return false; },
        hasValue = arrayInitialize(n, falseFactory),
        hasValueAll = false,
        isDone = arrayInitialize(n, falseFactory),
        values = new Array(n);

      function next(i) {
        hasValue[i] = true;
        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
          try {
            var res = resultSelector.apply(null, values);
          } catch (e) {
            return o.onError(e);
          }
          o.onNext(res);
        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
          o.onCompleted();
        }
      }

      function done (i) {
        isDone[i] = true;
        isDone.every(identity) && o.onCompleted();
      }

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var source = args[i], sad = new SingleAssignmentDisposable();
          isPromise(source) && (source = observableFromPromise(source));
          sad.setDisposable(source.subscribe(function (x) {
              values[i] = x;
              next(i);
            },
            function(e) { o.onError(e); },
            function () { done(i); }
          ));
          subscriptions[i] = sad;
        }(idx));
      }

      return new CompositeDisposable(subscriptions);
    }, this);
  };

  /**
   * Concatenates all the observable sequences.  This takes in either an array or variable arguments to concatenate.
   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
   */
  observableProto.concat = function () {
    for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
    args.unshift(this);
    return observableConcat.apply(null, args);
  };

	var ConcatObservable = (function(__super__) {
		inherits(ConcatObservable, __super__);
		function ConcatObservable(sources) {
			this.sources = sources;
			__super__.call(this);
		}
		
		ConcatObservable.prototype.subscribeCore = function(o) {
      var sink = new ConcatSink(this.sources, o);
      return sink.run();
		};
    
    function ConcatSink(sources, o) {
      this.sources = sources;
      this.o = o;
    }
    ConcatSink.prototype.run = function () {
      var isDisposed, subscription = new SerialDisposable(), sources = this.sources, length = sources.length, o = this.o;
      var cancelable = immediateScheduler.scheduleRecursiveWithState(0, function (i, self) {
        if (isDisposed) { return; }
        if (i === length) {
					return o.onCompleted();
				}
	
        // Check if promise
        var currentValue = sources[i];
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(currentValue.subscribe(
          function (x) { o.onNext(x); },
          function (e) { o.onError(e); },
          function () { self(i + 1); }
        ));
      });

      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    };
    
		
		return ConcatObservable;
	}(ObservableBase));
  
  /**
   * Concatenates all the observable sequences.
   * @param {Array | Arguments} args Arguments or an array to concat to the observable sequence.
   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
   */
  var observableConcat = Observable.concat = function () {
    var args;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      args = new Array(arguments.length);
      for(var i = 0, len = arguments.length; i < len; i++) { args[i] = arguments[i]; }
    }
    return new ConcatObservable(args);
  };

  /**
   * Concatenates an observable sequence of observable sequences.
   * @returns {Observable} An observable sequence that contains the elements of each observed inner sequence, in sequential order.
   */
  observableProto.concatAll = observableProto.concatObservable = function () {
    return this.merge(1);
  };

  var MergeObservable = (function (__super__) {
    inherits(MergeObservable, __super__);

    function MergeObservable(source, maxConcurrent) {
      this.source = source;
      this.maxConcurrent = maxConcurrent;
      __super__.call(this);
    }

    MergeObservable.prototype.subscribeCore = function(observer) {
      var g = new CompositeDisposable();
      g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
      return g;
    };

    return MergeObservable;

  }(ObservableBase));

  var MergeObserver = (function () {
    function MergeObserver(o, max, g) {
      this.o = o;
      this.max = max;
      this.g = g;
      this.done = false;
      this.q = [];
      this.activeCount = 0;
      this.isStopped = false;
    }
    MergeObserver.prototype.handleSubscribe = function (xs) {
      var sad = new SingleAssignmentDisposable();
      this.g.add(sad);
      isPromise(xs) && (xs = observableFromPromise(xs));
      sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
    };
    MergeObserver.prototype.onNext = function (innerSource) {
      if (this.isStopped) { return; }
        if(this.activeCount < this.max) {
          this.activeCount++;
          this.handleSubscribe(innerSource);
        } else {
          this.q.push(innerSource);
        }
      };
      MergeObserver.prototype.onError = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
        }
      };
      MergeObserver.prototype.onCompleted = function () {
        if (!this.isStopped) {
          this.isStopped = true;
          this.done = true;
          this.activeCount === 0 && this.o.onCompleted();
        }
      };
      MergeObserver.prototype.dispose = function() { this.isStopped = true; };
      MergeObserver.prototype.fail = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
          return true;
        }

        return false;
      };

      function InnerObserver(parent, sad) {
        this.parent = parent;
        this.sad = sad;
        this.isStopped = false;
      }
      InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.parent.o.onNext(x); } };
      InnerObserver.prototype.onError = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
        }
      };
      InnerObserver.prototype.onCompleted = function () {
        if(!this.isStopped) {
          this.isStopped = true;
          var parent = this.parent;
          parent.g.remove(this.sad);
          if (parent.q.length > 0) {
            parent.handleSubscribe(parent.q.shift());
          } else {
            parent.activeCount--;
            parent.done && parent.activeCount === 0 && parent.o.onCompleted();
          }
        }
      };
      InnerObserver.prototype.dispose = function() { this.isStopped = true; };
      InnerObserver.prototype.fail = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
          return true;
        }

        return false;
      };

      return MergeObserver;
  }());





  /**
  * Merges an observable sequence of observable sequences into an observable sequence, limiting the number of concurrent subscriptions to inner sequences.
  * Or merges two observable sequences into a single observable sequence.
  *
  * @example
  * 1 - merged = sources.merge(1);
  * 2 - merged = source.merge(otherSource);
  * @param {Mixed} [maxConcurrentOrOther] Maximum number of inner observable sequences being subscribed to concurrently or the second observable sequence.
  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
  */
  observableProto.merge = function (maxConcurrentOrOther) {
    return typeof maxConcurrentOrOther !== 'number' ?
      observableMerge(this, maxConcurrentOrOther) :
      new MergeObservable(this, maxConcurrentOrOther);
  };

  /**
   * Merges all the observable sequences into a single observable sequence.
   * The scheduler is optional and if not specified, the immediate scheduler is used.
   * @returns {Observable} The observable sequence that merges the elements of the observable sequences.
   */
  var observableMerge = Observable.merge = function () {
    var scheduler, sources = [], i, len = arguments.length;
    if (!arguments[0]) {
      scheduler = immediateScheduler;
      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
    } else if (isScheduler(arguments[0])) {
      scheduler = arguments[0];
      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
    } else {
      scheduler = immediateScheduler;
      for(i = 0; i < len; i++) { sources.push(arguments[i]); }
    }
    if (Array.isArray(sources[0])) {
      sources = sources[0];
    }
    return observableOf(scheduler, sources).mergeAll();
  };

  var MergeAllObservable = (function (__super__) {
    inherits(MergeAllObservable, __super__);

    function MergeAllObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    MergeAllObservable.prototype.subscribeCore = function (observer) {
      var g = new CompositeDisposable(), m = new SingleAssignmentDisposable();
      g.add(m);
      m.setDisposable(this.source.subscribe(new MergeAllObserver(observer, g)));
      return g;
    };
    
    function MergeAllObserver(o, g) {
      this.o = o;
      this.g = g;
      this.isStopped = false;
      this.done = false;
    }
    MergeAllObserver.prototype.onNext = function(innerSource) {
      if(this.isStopped) { return; }
      var sad = new SingleAssignmentDisposable();
      this.g.add(sad);

      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

      sad.setDisposable(innerSource.subscribe(new InnerObserver(this, this.g, sad)));
    };
    MergeAllObserver.prototype.onError = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
      }
    };
    MergeAllObserver.prototype.onCompleted = function () {
      if(!this.isStopped) {
        this.isStopped = true;
        this.done = true;
        this.g.length === 1 && this.o.onCompleted();
      }
    };
    MergeAllObserver.prototype.dispose = function() { this.isStopped = true; };
    MergeAllObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }

      return false;
    };

    function InnerObserver(parent, g, sad) {
      this.parent = parent;
      this.g = g;
      this.sad = sad;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) { if (!this.isStopped) { this.parent.o.onNext(x); } };
    InnerObserver.prototype.onError = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.parent.o.onError(e);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) {
        var parent = this.parent;
        this.isStopped = true;
        parent.g.remove(this.sad);
        parent.done && parent.g.length === 1 && parent.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.parent.o.onError(e);
        return true;
      }

      return false;
    };

    return MergeAllObservable;
  }(ObservableBase));

  /**
  * Merges an observable sequence of observable sequences into an observable sequence.
  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
  */
  observableProto.mergeAll = observableProto.mergeObservable = function () {
    return new MergeAllObservable(this);
  };

  var CompositeError = Rx.CompositeError = function(errors) {
    this.name = "NotImplementedError";
    this.innerErrors = errors;
    this.message = 'This contains multiple errors. Check the innerErrors';
    Error.call(this);
  }
  CompositeError.prototype = Error.prototype;

  /**
  * Flattens an Observable that emits Observables into one Observable, in a way that allows an Observer to
  * receive all successfully emitted items from all of the source Observables without being interrupted by
  * an error notification from one of them.
  *
  * This behaves like Observable.prototype.mergeAll except that if any of the merged Observables notify of an
  * error via the Observer's onError, mergeDelayError will refrain from propagating that
  * error notification until all of the merged Observables have finished emitting items.
  * @param {Array | Arguments} args Arguments or an array to merge.
  * @returns {Observable} an Observable that emits all of the items emitted by the Observables emitted by the Observable
  */
  Observable.mergeDelayError = function() {
    var args;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      var len = arguments.length;
      args = new Array(len);
      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    }
    var source = observableOf(null, args);

    return new AnonymousObservable(function (o) {
      var group = new CompositeDisposable(),
        m = new SingleAssignmentDisposable(),
        isStopped = false,
        errors = [];

      function setCompletion() {
        if (errors.length === 0) {
          o.onCompleted();
        } else if (errors.length === 1) {
          o.onError(errors[0]);
        } else {
          o.onError(new CompositeError(errors));
        }
      }

      group.add(m);

      m.setDisposable(source.subscribe(
        function (innerSource) {
          var innerSubscription = new SingleAssignmentDisposable();
          group.add(innerSubscription);

          // Check for promises support
          isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

          innerSubscription.setDisposable(innerSource.subscribe(
            function (x) { o.onNext(x); },
            function (e) {
              errors.push(e);
              group.remove(innerSubscription);
              isStopped && group.length === 1 && setCompletion();
            },
            function () {
              group.remove(innerSubscription);
              isStopped && group.length === 1 && setCompletion();
          }));
        },
        function (e) {
          errors.push(e);
          isStopped = true;
          group.length === 1 && setCompletion();
        },
        function () {
          isStopped = true;
          group.length === 1 && setCompletion();
        }));
      return group;
    });
  };

  /**
   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
   * @param {Observable} second Second observable sequence used to produce results after the first sequence terminates.
   * @returns {Observable} An observable sequence that concatenates the first and second sequence, even if the first sequence terminates exceptionally.
   */
  observableProto.onErrorResumeNext = function (second) {
    if (!second) { throw new Error('Second observable is required'); }
    return onErrorResumeNext([this, second]);
  };

  /**
   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
   *
   * @example
   * 1 - res = Rx.Observable.onErrorResumeNext(xs, ys, zs);
   * 1 - res = Rx.Observable.onErrorResumeNext([xs, ys, zs]);
   * @returns {Observable} An observable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
   */
  var onErrorResumeNext = Observable.onErrorResumeNext = function () {
    var sources = [];
    if (Array.isArray(arguments[0])) {
      sources = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
    }
    return new AnonymousObservable(function (observer) {
      var pos = 0, subscription = new SerialDisposable(),
      cancelable = immediateScheduler.scheduleRecursive(function (self) {
        var current, d;
        if (pos < sources.length) {
          current = sources[pos++];
          isPromise(current) && (current = observableFromPromise(current));
          d = new SingleAssignmentDisposable();
          subscription.setDisposable(d);
          d.setDisposable(current.subscribe(observer.onNext.bind(observer), self, self));
        } else {
          observer.onCompleted();
        }
      });
      return new CompositeDisposable(subscription, cancelable);
    });
  };

  /**
   * Returns the values from the source observable sequence only after the other observable sequence produces a value.
   * @param {Observable | Promise} other The observable sequence or Promise that triggers propagation of elements of the source sequence.
   * @returns {Observable} An observable sequence containing the elements of the source sequence starting from the point the other sequence triggered propagation.
   */
  observableProto.skipUntil = function (other) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var isOpen = false;
      var disposables = new CompositeDisposable(source.subscribe(function (left) {
        isOpen && o.onNext(left);
      }, function (e) { o.onError(e); }, function () {
        isOpen && o.onCompleted();
      }));

      isPromise(other) && (other = observableFromPromise(other));

      var rightSubscription = new SingleAssignmentDisposable();
      disposables.add(rightSubscription);
      rightSubscription.setDisposable(other.subscribe(function () {
        isOpen = true;
        rightSubscription.dispose();
      }, function (e) { o.onError(e); }, function () {
        rightSubscription.dispose();
      }));

      return disposables;
    }, source);
  };

  var SwitchObservable = (function(__super__) {
    inherits(SwitchObservable, __super__);
    function SwitchObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    SwitchObservable.prototype.subscribeCore = function (o) {
      var inner = new SerialDisposable(), s = this.source.subscribe(new SwitchObserver(o, inner));
      return new CompositeDisposable(s, inner);
    };

    function SwitchObserver(o, inner) {
      this.o = o;
      this.inner = inner;
      this.stopped = false;
      this.latest = 0;
      this.hasLatest = false;
      this.isStopped = false;
    }
    SwitchObserver.prototype.onNext = function (innerSource) {
      if (this.isStopped) { return; }
      var d = new SingleAssignmentDisposable(), id = ++this.latest;
      this.hasLatest = true;
      this.inner.setDisposable(d);
      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
      d.setDisposable(innerSource.subscribe(new InnerObserver(this, id)));
    };
    SwitchObserver.prototype.onError = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
      }
    };
    SwitchObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.stopped = true;
        !this.hasLatest && this.o.onCompleted();
      }
    };
    SwitchObserver.prototype.dispose = function () { this.isStopped = true; };
    SwitchObserver.prototype.fail = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    function InnerObserver(parent, id) {
      this.parent = parent;
      this.id = id;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) {
      if (this.isStopped) { return; }
      this.parent.latest === this.id && this.parent.o.onNext(x);
    };
    InnerObserver.prototype.onError = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.parent.latest === this.id && this.parent.o.onError(e);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        if (this.parent.latest === this.id) {
          this.parent.hasLatest = false;
          this.parent.isStopped && this.parent.o.onCompleted();
        }
      }
    };
    InnerObserver.prototype.dispose = function () { this.isStopped = true; }
    InnerObserver.prototype.fail = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.parent.o.onError(e);
        return true;
      }
      return false;
    };

    return SwitchObservable;
  }(ObservableBase));

  /**
  * Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
  * @returns {Observable} The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
  */
  observableProto['switch'] = observableProto.switchLatest = function () {
    return new SwitchObservable(this);
  };

  var TakeUntilObservable = (function(__super__) {
    inherits(TakeUntilObservable, __super__);

    function TakeUntilObservable(source, other) {
      this.source = source;
      this.other = isPromise(other) ? observableFromPromise(other) : other;
      __super__.call(this);
    }

    TakeUntilObservable.prototype.subscribeCore = function(o) {
      return new CompositeDisposable(
        this.source.subscribe(o),
        this.other.subscribe(new InnerObserver(o))
      );
    };

    function InnerObserver(o) {
      this.o = o;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) {
      if (this.isStopped) { return; }
      this.o.onCompleted();
    };
    InnerObserver.prototype.onError = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      !this.isStopped && (this.isStopped = true);
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    return TakeUntilObservable;
  }(ObservableBase));

  /**
   * Returns the values from the source observable sequence until the other observable sequence produces a value.
   * @param {Observable | Promise} other Observable sequence or Promise that terminates propagation of elements of the source sequence.
   * @returns {Observable} An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
   */
  observableProto.takeUntil = function (other) {
    return new TakeUntilObservable(this, other);
  };

  function falseFactory() { return false; }

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function only when the (first) source observable sequence produces an element.
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  observableProto.withLatestFrom = function () {
    var len = arguments.length, args = new Array(len)
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var resultSelector = args.pop(), source = this;
    Array.isArray(args[0]) && (args = args[0]);

    return new AnonymousObservable(function (observer) {
      var n = args.length,
        hasValue = arrayInitialize(n, falseFactory),
        hasValueAll = false,
        values = new Array(n);

      var subscriptions = new Array(n + 1);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var other = args[i], sad = new SingleAssignmentDisposable();
          isPromise(other) && (other = observableFromPromise(other));
          sad.setDisposable(other.subscribe(function (x) {
            values[i] = x;
            hasValue[i] = true;
            hasValueAll = hasValue.every(identity);
          }, function (e) { observer.onError(e); }, noop));
          subscriptions[i] = sad;
        }(idx));
      }

      var sad = new SingleAssignmentDisposable();
      sad.setDisposable(source.subscribe(function (x) {
        var allValues = [x].concat(values);
        if (!hasValueAll) { return; }
        var res = tryCatch(resultSelector).apply(null, allValues);
        if (res === errorObj) { return observer.onError(res.e); }
        observer.onNext(res);
      }, function (e) { observer.onError(e); }, function () {
        observer.onCompleted();
      }));
      subscriptions[n] = sad;

      return new CompositeDisposable(subscriptions);
    }, this);
  };

  function zipArray(second, resultSelector) {
    var first = this;
    return new AnonymousObservable(function (o) {
      var index = 0, len = second.length;
      return first.subscribe(function (left) {
        if (index < len) {
          var right = second[index++], res = tryCatch(resultSelector)(left, right);
          if (res === errorObj) { return o.onError(res.e); }
          o.onNext(res);
        } else {
          o.onCompleted();
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, first);
  }

  function falseFactory() { return false; }
  function emptyArrayFactory() { return []; }

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
   * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
   * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
   */
  observableProto.zip = function () {
    if (Array.isArray(arguments[0])) { return zipArray.apply(this, arguments); }
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

    var parent = this, resultSelector = args.pop();
    args.unshift(parent);
    return new AnonymousObservable(function (o) {
      var n = args.length,
        queues = arrayInitialize(n, emptyArrayFactory),
        isDone = arrayInitialize(n, falseFactory);

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var source = args[i], sad = new SingleAssignmentDisposable();
          isPromise(source) && (source = observableFromPromise(source));
          sad.setDisposable(source.subscribe(function (x) {
            queues[i].push(x);
            if (queues.every(function (x) { return x.length > 0; })) {
              var queuedValues = queues.map(function (x) { return x.shift(); }),
                  res = tryCatch(resultSelector).apply(parent, queuedValues);
              if (res === errorObj) { return o.onError(res.e); }
              o.onNext(res);
            } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
              o.onCompleted();
            }
          }, function (e) { o.onError(e); }, function () {
            isDone[i] = true;
            isDone.every(identity) && o.onCompleted();
          }));
          subscriptions[i] = sad;
        })(idx);
      }

      return new CompositeDisposable(subscriptions);
    }, parent);
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.
   * @param arguments Observable sources.
   * @param {Function} resultSelector Function to invoke for each series of elements at corresponding indexes in the sources.
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  Observable.zip = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var first = args.shift();
    return first.zip.apply(first, args);
  };

  function falseFactory() { return false; }
  function arrayFactory() { return []; }

  /**
   * Merges the specified observable sequences into one observable sequence by emitting a list with the elements of the observable sequences at corresponding indexes.
   * @param arguments Observable sources.
   * @returns {Observable} An observable sequence containing lists of elements at corresponding indexes.
   */
  Observable.zipArray = function () {
    var sources;
    if (Array.isArray(arguments[0])) {
      sources = arguments[0];
    } else {
      var len = arguments.length;
      sources = new Array(len);
      for(var i = 0; i < len; i++) { sources[i] = arguments[i]; }
    }
    return new AnonymousObservable(function (o) {
      var n = sources.length,
        queues = arrayInitialize(n, arrayFactory),
        isDone = arrayInitialize(n, falseFactory);

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          subscriptions[i] = new SingleAssignmentDisposable();
          subscriptions[i].setDisposable(sources[i].subscribe(function (x) {
            queues[i].push(x);
            if (queues.every(function (x) { return x.length > 0; })) {
              var res = queues.map(function (x) { return x.shift(); });
              o.onNext(res);
            } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
              return o.onCompleted();
            }
          }, function (e) { o.onError(e); }, function () {
            isDone[i] = true;
            isDone.every(identity) && o.onCompleted();
          }));
        })(idx);
      }

      return new CompositeDisposable(subscriptions);
    });
  };

  /**
   *  Hides the identity of an observable sequence.
   * @returns {Observable} An observable sequence that hides the identity of the source sequence.
   */
  observableProto.asObservable = function () {
    var source = this;
    return new AnonymousObservable(function (o) { return source.subscribe(o); }, source);
  };

  /**
   *  Projects each element of an observable sequence into zero or more buffers which are produced based on element count information.
   *
   * @example
   *  var res = xs.bufferWithCount(10);
   *  var res = xs.bufferWithCount(10, 1);
   * @param {Number} count Length of each buffer.
   * @param {Number} [skip] Number of elements to skip between creation of consecutive buffers. If not provided, defaults to the count.
   * @returns {Observable} An observable sequence of buffers.
   */
  observableProto.bufferWithCount = function (count, skip) {
    if (typeof skip !== 'number') {
      skip = count;
    }
    return this.windowWithCount(count, skip).selectMany(function (x) {
      return x.toArray();
    }).where(function (x) {
      return x.length > 0;
    });
  };

  /**
   * Dematerializes the explicit notification values of an observable sequence as implicit notifications.
   * @returns {Observable} An observable sequence exhibiting the behavior corresponding to the source sequence's notification values.
   */
  observableProto.dematerialize = function () {
    var source = this;
    return new AnonymousObservable(function (o) {
      return source.subscribe(function (x) { return x.accept(o); }, function(e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  /**
   *  Returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.
   *
   *  var obs = observable.distinctUntilChanged();
   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; });
   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; }, function (x, y) { return x === y; });
   *
   * @param {Function} [keySelector] A function to compute the comparison key for each element. If not provided, it projects the value.
   * @param {Function} [comparer] Equality comparer for computed key values. If not provided, defaults to an equality comparer function.
   * @returns {Observable} An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
   */
  observableProto.distinctUntilChanged = function (keySelector, comparer) {
    var source = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var hasCurrentKey = false, currentKey;
      return source.subscribe(function (value) {
        var key = value;
        if (keySelector) {
          key = tryCatch(keySelector)(value);
          if (key === errorObj) { return o.onError(key.e); }
        }
        if (hasCurrentKey) {
          var comparerEquals = tryCatch(comparer)(currentKey, key);
          if (comparerEquals === errorObj) { return o.onError(comparerEquals.e); }
        }
        if (!hasCurrentKey || !comparerEquals) {
          hasCurrentKey = true;
          currentKey = key;
          o.onNext(value);
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  var TapObservable = (function(__super__) {
    inherits(TapObservable,__super__);
    function TapObservable(source, observerOrOnNext, onError, onCompleted) {
      this.source = source;
      this.t = !observerOrOnNext || isFunction(observerOrOnNext) ?
        observerCreate(observerOrOnNext || noop, onError || noop, onCompleted || noop) :
        observerOrOnNext;
      __super__.call(this);
    }

    TapObservable.prototype.subscribeCore = function(o) {
      return this.source.subscribe(new InnerObserver(o, this.t));
    };

    function InnerObserver(o, t) {
      this.o = o;
      this.t = t;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function(x) {
      if (this.isStopped) { return; }
      var res = tryCatch(this.t.onNext).call(this.t, x);
      if (res === errorObj) { this.o.onError(res.e); }
      this.o.onNext(x);
    };
    InnerObserver.prototype.onError = function(err) {
      if (!this.isStopped) {
        this.isStopped = true;
        var res = tryCatch(this.t.onError).call(this.t, err);
        if (res === errorObj) { return this.o.onError(res.e); }
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        var res = tryCatch(this.t.onCompleted).call(this.t);
        if (res === errorObj) { return this.o.onError(res.e); }
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    return TapObservable;
  }(ObservableBase));

  /**
  *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
  * @param {Function | Observer} observerOrOnNext Action to invoke for each element in the observable sequence or an o.
  * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
  * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
  * @returns {Observable} The source sequence with the side-effecting behavior applied.
  */
  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
    return new TapObservable(this, observerOrOnNext, onError, onCompleted);
  };

  /**
  *  Invokes an action for each element in the observable sequence.
  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
  * @param {Function} onNext Action to invoke for each element in the observable sequence.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} The source sequence with the side-effecting behavior applied.
  */
  observableProto.doOnNext = observableProto.tapOnNext = function (onNext, thisArg) {
    return this.tap(typeof thisArg !== 'undefined' ? function (x) { onNext.call(thisArg, x); } : onNext);
  };

  /**
  *  Invokes an action upon exceptional termination of the observable sequence.
  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
  * @param {Function} onError Action to invoke upon exceptional termination of the observable sequence.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} The source sequence with the side-effecting behavior applied.
  */
  observableProto.doOnError = observableProto.tapOnError = function (onError, thisArg) {
    return this.tap(noop, typeof thisArg !== 'undefined' ? function (e) { onError.call(thisArg, e); } : onError);
  };

  /**
  *  Invokes an action upon graceful termination of the observable sequence.
  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
  * @param {Function} onCompleted Action to invoke upon graceful termination of the observable sequence.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} The source sequence with the side-effecting behavior applied.
  */
  observableProto.doOnCompleted = observableProto.tapOnCompleted = function (onCompleted, thisArg) {
    return this.tap(noop, null, typeof thisArg !== 'undefined' ? function () { onCompleted.call(thisArg); } : onCompleted);
  };

  /**
   *  Invokes a specified action after the source observable sequence terminates gracefully or exceptionally.
   * @param {Function} finallyAction Action to invoke after the source observable sequence terminates.
   * @returns {Observable} Source sequence with the action-invoking termination behavior applied.
   */
  observableProto['finally'] = observableProto.ensure = function (action) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var subscription;
      try {
        subscription = source.subscribe(observer);
      } catch (e) {
        action();
        throw e;
      }
      return disposableCreate(function () {
        try {
          subscription.dispose();
        } catch (e) {
          throw e;
        } finally {
          action();
        }
      });
    }, this);
  };

  /**
   * @deprecated use #finally or #ensure instead.
   */
  observableProto.finallyAction = function (action) {
    //deprecate('finallyAction', 'finally or ensure');
    return this.ensure(action);
  };

  var IgnoreElementsObservable = (function(__super__) {
    inherits(IgnoreElementsObservable, __super__);

    function IgnoreElementsObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    IgnoreElementsObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o));
    };

    function InnerObserver(o) {
      this.o = o;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = noop;
    InnerObserver.prototype.onError = function (err) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
        return true;
      }

      return false;
    };

    return IgnoreElementsObservable;
  }(ObservableBase));

  /**
   *  Ignores all elements in an observable sequence leaving only the termination messages.
   * @returns {Observable} An empty observable sequence that signals termination, successful or exceptional, of the source sequence.
   */
  observableProto.ignoreElements = function () {
    return new IgnoreElementsObservable(this);
  };

  /**
   *  Materializes the implicit notifications of an observable sequence as explicit notification values.
   * @returns {Observable} An observable sequence containing the materialized notification values from the source sequence.
   */
  observableProto.materialize = function () {
    var source = this;
    return new AnonymousObservable(function (observer) {
      return source.subscribe(function (value) {
        observer.onNext(notificationCreateOnNext(value));
      }, function (e) {
        observer.onNext(notificationCreateOnError(e));
        observer.onCompleted();
      }, function () {
        observer.onNext(notificationCreateOnCompleted());
        observer.onCompleted();
      });
    }, source);
  };

  /**
   *  Repeats the observable sequence a specified number of times. If the repeat count is not specified, the sequence repeats indefinitely.
   * @param {Number} [repeatCount]  Number of times to repeat the sequence. If not provided, repeats the sequence indefinitely.
   * @returns {Observable} The observable sequence producing the elements of the given sequence repeatedly.
   */
  observableProto.repeat = function (repeatCount) {
    return enumerableRepeat(this, repeatCount).concat();
  };

  /**
   *  Repeats the source observable sequence the specified number of times or until it successfully terminates. If the retry count is not specified, it retries indefinitely.
   *  Note if you encounter an error and want it to retry once, then you must use .retry(2);
   *
   * @example
   *  var res = retried = retry.repeat();
   *  var res = retried = retry.repeat(2);
   * @param {Number} [retryCount]  Number of times to retry the sequence. If not provided, retry the sequence indefinitely.
   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
   */
  observableProto.retry = function (retryCount) {
    return enumerableRepeat(this, retryCount).catchError();
  };

  /**
   *  Repeats the source observable sequence upon error each time the notifier emits or until it successfully terminates. 
   *  if the notifier completes, the observable sequence completes.
   *
   * @example
   *  var timer = Observable.timer(500);
   *  var source = observable.retryWhen(timer);
   * @param {Observable} [notifier] An observable that triggers the retries or completes the observable with onNext or onCompleted respectively.
   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
   */
  observableProto.retryWhen = function (notifier) {
    return enumerableRepeat(this).catchErrorWhen(notifier);
  };
  var ScanObservable = (function(__super__) {
    inherits(ScanObservable, __super__);
    function ScanObservable(source, accumulator, hasSeed, seed) {
      this.source = source;
      this.accumulator = accumulator;
      this.hasSeed = hasSeed;
      this.seed = seed;
      __super__.call(this);
    }

    ScanObservable.prototype.subscribeCore = function(observer) {
      return this.source.subscribe(new ScanObserver(observer,this));
    };

    return ScanObservable;
  }(ObservableBase));

  function ScanObserver(observer, parent) {
    this.observer = observer;
    this.accumulator = parent.accumulator;
    this.hasSeed = parent.hasSeed;
    this.seed = parent.seed;
    this.hasAccumulation = false;
    this.accumulation = null;
    this.hasValue = false;
    this.isStopped = false;
  }
  ScanObserver.prototype.onNext = function (x) {
    if (this.isStopped) { return; }
    !this.hasValue && (this.hasValue = true);
    try {
      if (this.hasAccumulation) {
        this.accumulation = this.accumulator(this.accumulation, x);
      } else {
        this.accumulation = this.hasSeed ? this.accumulator(this.seed, x) : x;
        this.hasAccumulation = true;
      }
    } catch (e) {
      return this.observer.onError(e);
    }
    this.observer.onNext(this.accumulation);
  };
  ScanObserver.prototype.onError = function (e) { 
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onError(e);
    }
  };
  ScanObserver.prototype.onCompleted = function () {
    if (!this.isStopped) {
      this.isStopped = true;
      !this.hasValue && this.hasSeed && this.observer.onNext(this.seed);
      this.observer.onCompleted();
    }
  };
  ScanObserver.prototype.dispose = function() { this.isStopped = true; };
  ScanObserver.prototype.fail = function (e) {
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onError(e);
      return true;
    }
    return false;
  };

  /**
  *  Applies an accumulator function over an observable sequence and returns each intermediate result. The optional seed value is used as the initial accumulator value.
  *  For aggregation behavior with no intermediate results, see Observable.aggregate.
  * @param {Mixed} [seed] The initial accumulator value.
  * @param {Function} accumulator An accumulator function to be invoked on each element.
  * @returns {Observable} An observable sequence containing the accumulated values.
  */
  observableProto.scan = function () {
    var hasSeed = false, seed, accumulator, source = this;
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[0];
      accumulator = arguments[1];
    } else {
      accumulator = arguments[0];
    }
    return new ScanObservable(this, accumulator, hasSeed, seed);
  };

  /**
   *  Bypasses a specified number of elements at the end of an observable sequence.
   * @description
   *  This operator accumulates a queue with a length enough to store the first `count` elements. As more elements are
   *  received, elements are taken from the front of the queue and produced on the result sequence. This causes elements to be delayed.
   * @param count Number of elements to bypass at the end of the source sequence.
   * @returns {Observable} An observable sequence containing the source sequence elements except for the bypassed ones at the end.
   */
  observableProto.skipLast = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && o.onNext(q.shift());
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Prepends a sequence of values to an observable sequence with an optional scheduler and an argument list of values to prepend.
   *  @example
   *  var res = source.startWith(1, 2, 3);
   *  var res = source.startWith(Rx.Scheduler.timeout, 1, 2, 3);
   * @param {Arguments} args The specified values to prepend to the observable sequence
   * @returns {Observable} The source sequence prepended with the specified values.
   */
  observableProto.startWith = function () {
    var values, scheduler, start = 0;
    if (!!arguments.length && isScheduler(arguments[0])) {
      scheduler = arguments[0];
      start = 1;
    } else {
      scheduler = immediateScheduler;
    }
    for(var args = [], i = start, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
    return enumerableOf([observableFromArray(args, scheduler), this]).concat();
  };

  /**
   *  Returns a specified number of contiguous elements from the end of an observable sequence.
   * @description
   *  This operator accumulates a buffer with a length enough to store elements count elements. Upon completion of
   *  the source sequence, this buffer is drained on the result sequence. This causes the elements to be delayed.
   * @param {Number} count Number of elements to take from the end of the source sequence.
   * @returns {Observable} An observable sequence containing the specified number of elements from the end of the source sequence.
   */
  observableProto.takeLast = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && q.shift();
      }, function (e) { o.onError(e); }, function () {
        while (q.length > 0) { o.onNext(q.shift()); }
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Returns an array with the specified number of contiguous elements from the end of an observable sequence.
   *
   * @description
   *  This operator accumulates a buffer with a length enough to store count elements. Upon completion of the
   *  source sequence, this buffer is produced on the result sequence.
   * @param {Number} count Number of elements to take from the end of the source sequence.
   * @returns {Observable} An observable sequence containing a single array with the specified number of elements from the end of the source sequence.
   */
  observableProto.takeLastBuffer = function (count) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && q.shift();
      }, function (e) { o.onError(e); }, function () {
        o.onNext(q);
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Projects each element of an observable sequence into zero or more windows which are produced based on element count information.
   *
   *  var res = xs.windowWithCount(10);
   *  var res = xs.windowWithCount(10, 1);
   * @param {Number} count Length of each window.
   * @param {Number} [skip] Number of elements to skip between creation of consecutive windows. If not specified, defaults to the count.
   * @returns {Observable} An observable sequence of windows.
   */
  observableProto.windowWithCount = function (count, skip) {
    var source = this;
    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count <= 0) { throw new ArgumentOutOfRangeError(); }
    skip == null && (skip = count);
    +skip || (skip = 0);
    Math.abs(skip) === Infinity && (skip = 0);

    if (skip <= 0) { throw new ArgumentOutOfRangeError(); }
    return new AnonymousObservable(function (observer) {
      var m = new SingleAssignmentDisposable(),
        refCountDisposable = new RefCountDisposable(m),
        n = 0,
        q = [];

      function createWindow () {
        var s = new Subject();
        q.push(s);
        observer.onNext(addRef(s, refCountDisposable));
      }

      createWindow();

      m.setDisposable(source.subscribe(
        function (x) {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
          var c = n - count + 1;
          c >= 0 && c % skip === 0 && q.shift().onCompleted();
          ++n % skip === 0 && createWindow();
        },
        function (e) {
          while (q.length > 0) { q.shift().onError(e); }
          observer.onError(e);
        },
        function () {
          while (q.length > 0) { q.shift().onCompleted(); }
          observer.onCompleted();
        }
      ));
      return refCountDisposable;
    }, source);
  };

  function concatMap(source, selector, thisArg) {
    var selectorFunc = bindCallback(selector, thisArg, 3);
    return source.map(function (x, i) {
      var result = selectorFunc(x, i, source);
      isPromise(result) && (result = observableFromPromise(result));
      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
      return result;
    }).concatAll();
  }

  /**
   *  One of the Following:
   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   * @example
   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); });
   *  Or:
   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
   *
   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
   *  Or:
   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   *  var res = source.concatMap(Rx.Observable.fromArray([1,2,3]));
   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the
   * source sequence onto which could be either an observable or Promise.
   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
   */
  observableProto.selectConcat = observableProto.concatMap = function (selector, resultSelector, thisArg) {
    if (isFunction(selector) && isFunction(resultSelector)) {
      return this.concatMap(function (x, i) {
        var selectorResult = selector(x, i);
        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

        return selectorResult.map(function (y, i2) {
          return resultSelector(x, y, i, i2);
        });
      });
    }
    return isFunction(selector) ?
      concatMap(this, selector, thisArg) :
      concatMap(this, function () { return selector; });
  };

  /**
   * Projects each notification of an observable sequence to an observable sequence and concats the resulting observable sequences into one observable sequence.
   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
   */
  observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
    var source = this,
        onNextFunc = bindCallback(onNext, thisArg, 2),
        onErrorFunc = bindCallback(onError, thisArg, 1),
        onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
    return new AnonymousObservable(function (observer) {
      var index = 0;
      return source.subscribe(
        function (x) {
          var result;
          try {
            result = onNextFunc(x, index++);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
        },
        function (err) {
          var result;
          try {
            result = onErrorFunc(err);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        },
        function () {
          var result;
          try {
            result = onCompletedFunc();
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        });
    }, this).concatAll();
  };

    /**
     *  Returns the elements of the specified sequence or the specified value in a singleton sequence if the sequence is empty.
     *
     *  var res = obs = xs.defaultIfEmpty();
     *  2 - obs = xs.defaultIfEmpty(false);
     *
     * @memberOf Observable#
     * @param defaultValue The value to return if the sequence is empty. If not provided, this defaults to null.
     * @returns {Observable} An observable sequence that contains the specified default value if the source is empty; otherwise, the elements of the source itself.
     */
    observableProto.defaultIfEmpty = function (defaultValue) {
      var source = this;
      defaultValue === undefined && (defaultValue = null);
      return new AnonymousObservable(function (observer) {
        var found = false;
        return source.subscribe(function (x) {
          found = true;
          observer.onNext(x);
        },
        function (e) { observer.onError(e); }, 
        function () {
          !found && observer.onNext(defaultValue);
          observer.onCompleted();
        });
      }, source);
    };

  // Swap out for Array.findIndex
  function arrayIndexOfComparer(array, item, comparer) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (comparer(array[i], item)) { return i; }
    }
    return -1;
  }

  function HashSet(comparer) {
    this.comparer = comparer;
    this.set = [];
  }
  HashSet.prototype.push = function(value) {
    var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
    retValue && this.set.push(value);
    return retValue;
  };

  /**
   *  Returns an observable sequence that contains only distinct elements according to the keySelector and the comparer.
   *  Usage of this operator should be considered carefully due to the maintenance of an internal lookup structure which can grow large.
   *
   * @example
   *  var res = obs = xs.distinct();
   *  2 - obs = xs.distinct(function (x) { return x.id; });
   *  2 - obs = xs.distinct(function (x) { return x.id; }, function (a,b) { return a === b; });
   * @param {Function} [keySelector]  A function to compute the comparison key for each element.
   * @param {Function} [comparer]  Used to compare items in the collection.
   * @returns {Observable} An observable sequence only containing the distinct elements, based on a computed key value, from the source sequence.
   */
  observableProto.distinct = function (keySelector, comparer) {
    var source = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var hashSet = new HashSet(comparer);
      return source.subscribe(function (x) {
        var key = x;

        if (keySelector) {
          try {
            key = keySelector(x);
          } catch (e) {
            o.onError(e);
            return;
          }
        }
        hashSet.push(key) && o.onNext(x);
      },
      function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  /**
   *  Groups the elements of an observable sequence according to a specified key selector function and comparer and selects the resulting elements by using a specified function.
   *
   * @example
   *  var res = observable.groupBy(function (x) { return x.id; });
   *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; });
   *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; }, function (x) { return x.toString(); });
   * @param {Function} keySelector A function to extract the key for each element.
   * @param {Function} [elementSelector]  A function to map each source element to an element in an observable group.
   * @param {Function} [comparer] Used to determine whether the objects are equal.
   * @returns {Observable} A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
   */
  observableProto.groupBy = function (keySelector, elementSelector, comparer) {
    return this.groupByUntil(keySelector, elementSelector, observableNever, comparer);
  };

    /**
     *  Groups the elements of an observable sequence according to a specified key selector function.
     *  A duration selector function is used to control the lifetime of groups. When a group expires, it receives an OnCompleted notification. When a new element with the same
     *  key value as a reclaimed group occurs, the group will be reborn with a new lifetime request.
     *
     * @example
     *  var res = observable.groupByUntil(function (x) { return x.id; }, null,  function () { return Rx.Observable.never(); });
     *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); });
     *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); }, function (x) { return x.toString(); });
     * @param {Function} keySelector A function to extract the key for each element.
     * @param {Function} durationSelector A function to signal the expiration of a group.
     * @param {Function} [comparer] Used to compare objects. When not specified, the default comparer is used.
     * @returns {Observable}
     *  A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
     *  If a group's lifetime expires, a new group with the same key value can be created once an element with such a key value is encoutered.
     *
     */
    observableProto.groupByUntil = function (keySelector, elementSelector, durationSelector, comparer) {
      var source = this;
      elementSelector || (elementSelector = identity);
      comparer || (comparer = defaultComparer);
      return new AnonymousObservable(function (observer) {
        function handleError(e) { return function (item) { item.onError(e); }; }
        var map = new Dictionary(0, comparer),
          groupDisposable = new CompositeDisposable(),
          refCountDisposable = new RefCountDisposable(groupDisposable);

        groupDisposable.add(source.subscribe(function (x) {
          var key;
          try {
            key = keySelector(x);
          } catch (e) {
            map.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }

          var fireNewMapEntry = false,
            writer = map.tryGetValue(key);
          if (!writer) {
            writer = new Subject();
            map.set(key, writer);
            fireNewMapEntry = true;
          }

          if (fireNewMapEntry) {
            var group = new GroupedObservable(key, writer, refCountDisposable),
              durationGroup = new GroupedObservable(key, writer);
            try {
              duration = durationSelector(durationGroup);
            } catch (e) {
              map.getValues().forEach(handleError(e));
              observer.onError(e);
              return;
            }

            observer.onNext(group);

            var md = new SingleAssignmentDisposable();
            groupDisposable.add(md);

            var expire = function () {
              map.remove(key) && writer.onCompleted();
              groupDisposable.remove(md);
            };

            md.setDisposable(duration.take(1).subscribe(
              noop,
              function (exn) {
                map.getValues().forEach(handleError(exn));
                observer.onError(exn);
              },
              expire)
            );
          }

          var element;
          try {
            element = elementSelector(x);
          } catch (e) {
            map.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }

          writer.onNext(element);
      }, function (ex) {
        map.getValues().forEach(handleError(ex));
        observer.onError(ex);
      }, function () {
        map.getValues().forEach(function (item) { item.onCompleted(); });
        observer.onCompleted();
      }));

      return refCountDisposable;
    }, source);
  };

  var MapObservable = (function (__super__) {
    inherits(MapObservable, __super__);

    function MapObservable(source, selector, thisArg) {
      this.source = source;
      this.selector = bindCallback(selector, thisArg, 3);
      __super__.call(this);
    }
    
    function innerMap(selector, self) {
      return function (x, i, o) { return selector.call(this, self.selector(x, i, o), i, o); }
    }

    MapObservable.prototype.internalMap = function (selector, thisArg) {
      return new MapObservable(this.source, innerMap(selector, this), thisArg);
    };

    MapObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.selector, this));
    };
    
    function InnerObserver(o, selector, source) {
      this.o = o;
      this.selector = selector;
      this.source = source;
      this.i = 0;
      this.isStopped = false;
    }
  
    InnerObserver.prototype.onNext = function(x) {
      if (this.isStopped) { return; }
      var result = tryCatch(this.selector)(x, this.i++, this.source);
      if (result === errorObj) {
        return this.o.onError(result.e);
      }
      this.o.onNext(result);
    };
    InnerObserver.prototype.onError = function (e) {
      if(!this.isStopped) { this.isStopped = true; this.o.onError(e); }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
  
      return false;
    };

    return MapObservable;

  }(ObservableBase));

  /**
  * Projects each element of an observable sequence into a new form by incorporating the element's index.
  * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source.
  */
  observableProto.map = observableProto.select = function (selector, thisArg) {
    var selectorFn = typeof selector === 'function' ? selector : function () { return selector; };
    return this instanceof MapObservable ?
      this.internalMap(selectorFn, thisArg) :
      new MapObservable(this, selectorFn, thisArg);
  };

  /**
   * Retrieves the value of a specified nested property from all elements in
   * the Observable sequence.
   * @param {Arguments} arguments The nested properties to pluck.
   * @returns {Observable} Returns a new Observable sequence of property values.
   */
  observableProto.pluck = function () {
    var args = arguments, len = arguments.length;
    if (len === 0) { throw new Error('List of properties cannot be empty.'); }
    return this.map(function (x) {
      var currentProp = x;
      for (var i = 0; i < len; i++) {
        var p = currentProp[args[i]];
        if (typeof p !== 'undefined') {
          currentProp = p;
        } else {
          return undefined;
        }
      }
      return currentProp;
    });
  };

  function flatMap(source, selector, thisArg) {
    var selectorFunc = bindCallback(selector, thisArg, 3);
    return source.map(function (x, i) {
      var result = selectorFunc(x, i, source);
      isPromise(result) && (result = observableFromPromise(result));
      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
      return result;
    }).mergeAll();
  }

  /**
   *  One of the Following:
   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   * @example
   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); });
   *  Or:
   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
   *
   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
   *  Or:
   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   *  var res = source.selectMany(Rx.Observable.fromArray([1,2,3]));
   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the source sequence onto which could be either an observable or Promise.
   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
   */
  observableProto.selectMany = observableProto.flatMap = function (selector, resultSelector, thisArg) {
    if (isFunction(selector) && isFunction(resultSelector)) {
      return this.flatMap(function (x, i) {
        var selectorResult = selector(x, i);
        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

        return selectorResult.map(function (y, i2) {
          return resultSelector(x, y, i, i2);
        });
      }, thisArg);
    }
    return isFunction(selector) ?
      flatMap(this, selector, thisArg) :
      flatMap(this, function () { return selector; });
  };

  /**
   * Projects each notification of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
   */
  observableProto.flatMapObserver = observableProto.selectManyObserver = function (onNext, onError, onCompleted, thisArg) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var index = 0;

      return source.subscribe(
        function (x) {
          var result;
          try {
            result = onNext.call(thisArg, x, index++);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
        },
        function (err) {
          var result;
          try {
            result = onError.call(thisArg, err);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        },
        function () {
          var result;
          try {
            result = onCompleted.call(thisArg);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        });
    }, source).mergeAll();
  };

  /**
   *  Projects each element of an observable sequence into a new sequence of observable sequences by incorporating the element's index and then
   *  transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
   * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source producing an Observable of Observable sequences
   *  and that at any point in time produces the elements of the most recent inner observable sequence that has been received.
   */
  observableProto.selectSwitch = observableProto.flatMapLatest = observableProto.switchMap = function (selector, thisArg) {
    return this.select(selector, thisArg).switchLatest();
  };

  var SkipObservable = (function(__super__) {
    inherits(SkipObservable, __super__);
    function SkipObservable(source, count) {
      this.source = source;
      this.skipCount = count;
      __super__.call(this);
    }
    
    SkipObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.skipCount));
    };
    
    function InnerObserver(o, c) {
      this.c = c;
      this.r = c;
      this.o = o;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) {
      if (this.isStopped) { return; }
      if (this.r <= 0) { 
        this.o.onNext(x);
      } else {
        this.r--;
      }
    };
    InnerObserver.prototype.onError = function(e) {
      if (!this.isStopped) { this.isStopped = true; this.o.onError(e); }
    };
    InnerObserver.prototype.onCompleted = function() {
      if (!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };
    
    return SkipObservable;
  }(ObservableBase));  
  
  /**
   * Bypasses a specified number of elements in an observable sequence and then returns the remaining elements.
   * @param {Number} count The number of elements to skip before returning the remaining elements.
   * @returns {Observable} An observable sequence that contains the elements that occur after the specified index in the input sequence.
   */
  observableProto.skip = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    return new SkipObservable(this, count);
  };
  /**
   *  Bypasses elements in an observable sequence as long as a specified condition is true and then returns the remaining elements.
   *  The element's index is used in the logic of the predicate function.
   *
   *  var res = source.skipWhile(function (value) { return value < 10; });
   *  var res = source.skipWhile(function (value, index) { return value < 10 || index < 10; });
   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
   */
  observableProto.skipWhile = function (predicate, thisArg) {
    var source = this,
        callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0, running = false;
      return source.subscribe(function (x) {
        if (!running) {
          try {
            running = !callback(x, i++, source);
          } catch (e) {
            o.onError(e);
            return;
          }
        }
        running && o.onNext(x);
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Returns a specified number of contiguous elements from the start of an observable sequence, using the specified scheduler for the edge case of take(0).
   *
   *  var res = source.take(5);
   *  var res = source.take(0, Rx.Scheduler.timeout);
   * @param {Number} count The number of elements to return.
   * @param {Scheduler} [scheduler] Scheduler used to produce an OnCompleted message in case <paramref name="count count</paramref> is set to 0.
   * @returns {Observable} An observable sequence that contains the specified number of elements from the start of the input sequence.
   */
  observableProto.take = function (count, scheduler) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    if (count === 0) { return observableEmpty(scheduler); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var remaining = count;
      return source.subscribe(function (x) {
        if (remaining-- > 0) {
          o.onNext(x);
          remaining <= 0 && o.onCompleted();
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Returns elements from an observable sequence as long as a specified condition is true.
   *  The element's index is used in the logic of the predicate function.
   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.
   */
  observableProto.takeWhile = function (predicate, thisArg) {
    var source = this,
        callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0, running = true;
      return source.subscribe(function (x) {
        if (running) {
          try {
            running = callback(x, i++, source);
          } catch (e) {
            o.onError(e);
            return;
          }
          if (running) {
            o.onNext(x);
          } else {
            o.onCompleted();
          }
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  var FilterObservable = (function (__super__) {
    inherits(FilterObservable, __super__);

    function FilterObservable(source, predicate, thisArg) {
      this.source = source;
      this.predicate = bindCallback(predicate, thisArg, 3);
      __super__.call(this);
    }

    FilterObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.predicate, this));
    };
    
    function innerPredicate(predicate, self) {
      return function(x, i, o) { return self.predicate(x, i, o) && predicate.call(this, x, i, o); }
    }

    FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
      return new FilterObservable(this.source, innerPredicate(predicate, this), thisArg);
    };
    
    function InnerObserver(o, predicate, source) {
      this.o = o;
      this.predicate = predicate;
      this.source = source;
      this.i = 0;
      this.isStopped = false;
    }
  
    InnerObserver.prototype.onNext = function(x) {
      if (this.isStopped) { return; }
      var shouldYield = tryCatch(this.predicate)(x, this.i++, this.source);
      if (shouldYield === errorObj) {
        return this.o.onError(shouldYield.e);
      }
      shouldYield && this.o.onNext(x);
    };
    InnerObserver.prototype.onError = function (e) {
      if(!this.isStopped) { this.isStopped = true; this.o.onError(e); }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    return FilterObservable;

  }(ObservableBase));

  /**
  *  Filters the elements of an observable sequence based on a predicate by incorporating the element's index.
  * @param {Function} predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} An observable sequence that contains elements from the input sequence that satisfy the condition.
  */
  observableProto.filter = observableProto.where = function (predicate, thisArg) {
    return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) :
      new FilterObservable(this, predicate, thisArg);
  };

  function extremaBy(source, keySelector, comparer) {
    return new AnonymousObservable(function (o) {
      var hasValue = false, lastKey = null, list = [];
      return source.subscribe(function (x) {
        var comparison, key;
        try {
          key = keySelector(x);
        } catch (ex) {
          o.onError(ex);
          return;
        }
        comparison = 0;
        if (!hasValue) {
          hasValue = true;
          lastKey = key;
        } else {
          try {
            comparison = comparer(key, lastKey);
          } catch (ex1) {
            o.onError(ex1);
            return;
          }
        }
        if (comparison > 0) {
          lastKey = key;
          list = [];
        }
        if (comparison >= 0) { list.push(x); }
      }, function (e) { o.onError(e); }, function () {
        o.onNext(list);
        o.onCompleted();
      });
    }, source);
  }

  function firstOnly(x) {
    if (x.length === 0) { throw new EmptyError(); }
    return x[0];
  }

  /**
   * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
   * For aggregation behavior with incremental intermediate results, see Observable.scan.
   * @deprecated Use #reduce instead
   * @param {Mixed} [seed] The initial accumulator value.
   * @param {Function} accumulator An accumulator function to be invoked on each element.
   * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
   */
  observableProto.aggregate = function () {
    var hasSeed = false, accumulator, seed, source = this;
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[0];
      accumulator = arguments[1];
    } else {
      accumulator = arguments[0];
    }
    return new AnonymousObservable(function (o) {
      var hasAccumulation, accumulation, hasValue;
      return source.subscribe (
        function (x) {
          !hasValue && (hasValue = true);
          try {
            if (hasAccumulation) {
              accumulation = accumulator(accumulation, x);
            } else {
              accumulation = hasSeed ? accumulator(seed, x) : x;
              hasAccumulation = true;
            }
          } catch (e) {
            return o.onError(e);
          }
        },
        function (e) { o.onError(e); },
        function () {
          hasValue && o.onNext(accumulation);
          !hasValue && hasSeed && o.onNext(seed);
          !hasValue && !hasSeed && o.onError(new EmptyError());
          o.onCompleted();
        }
      );
    }, source);
  };

  var ReduceObservable = (function(__super__) {
    inherits(ReduceObservable, __super__);
    function ReduceObservable(source, acc, hasSeed, seed) {
      this.source = source;
      this.acc = acc;
      this.hasSeed = hasSeed;
      this.seed = seed;
      __super__.call(this);
    }

    ReduceObservable.prototype.subscribeCore = function(observer) {
      return this.source.subscribe(new InnerObserver(observer,this));
    };

    function InnerObserver(o, parent) {
      this.o = o;
      this.acc = parent.acc;
      this.hasSeed = parent.hasSeed;
      this.seed = parent.seed;
      this.hasAccumulation = false;
      this.result = null;
      this.hasValue = false;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) {
      if (this.isStopped) { return; }
      !this.hasValue && (this.hasValue = true);
      if (this.hasAccumulation) {
        this.result = tryCatch(this.acc)(this.result, x);
      } else {
        this.result = this.hasSeed ? tryCatch(this.acc)(this.seed, x) : x;
        this.hasAccumulation = true;
      }
      if (this.result === errorObj) { this.o.onError(this.result.e); }
    };
    InnerObserver.prototype.onError = function (e) { 
      if (!this.isStopped) { this.isStopped = true; this.o.onError(e); } 
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.hasValue && this.o.onNext(this.result);
        !this.hasValue && this.hasSeed && this.o.onNext(this.seed);
        !this.hasValue && !this.hasSeed && this.o.onError(new EmptyError());
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function () { this.isStopped = true; };
    InnerObserver.prototype.fail = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    return ReduceObservable;
  }(ObservableBase));

  /**
  * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
  * For aggregation behavior with incremental intermediate results, see Observable.scan.
  * @param {Function} accumulator An accumulator function to be invoked on each element.
  * @param {Any} [seed] The initial accumulator value.
  * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
  */
  observableProto.reduce = function (accumulator) {
    var hasSeed = false;
    if (arguments.length === 2) {
      hasSeed = true;
      var seed = arguments[1];
    }
    return new ReduceObservable(this, accumulator, hasSeed, seed);
  };

  /**
   * Determines whether any element of an observable sequence satisfies a condition if present, else if any items are in the sequence.
   * @param {Function} [predicate] A function to test each element for a condition.
   * @returns {Observable} An observable sequence containing a single element determining whether any elements in the source sequence pass the test in the specified predicate if given, else if any items are in the sequence.
   */
  observableProto.some = function (predicate, thisArg) {
    var source = this;
    return predicate ?
      source.filter(predicate, thisArg).some() :
      new AnonymousObservable(function (observer) {
        return source.subscribe(function () {
          observer.onNext(true);
          observer.onCompleted();
        }, function (e) { observer.onError(e); }, function () {
          observer.onNext(false);
          observer.onCompleted();
        });
      }, source);
  };

  /** @deprecated use #some instead */
  observableProto.any = function () {
    //deprecate('any', 'some');
    return this.some.apply(this, arguments);
  };

  /**
   * Determines whether an observable sequence is empty.
   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence is empty.
   */
  observableProto.isEmpty = function () {
    return this.any().map(not);
  };

  /**
   * Determines whether all elements of an observable sequence satisfy a condition.
   * @param {Function} [predicate] A function to test each element for a condition.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element determining whether all elements in the source sequence pass the test in the specified predicate.
   */
  observableProto.every = function (predicate, thisArg) {
    return this.filter(function (v) { return !predicate(v); }, thisArg).some().map(not);
  };

  /** @deprecated use #every instead */
  observableProto.all = function () {
    //deprecate('all', 'every');
    return this.every.apply(this, arguments);
  };

  /**
   * Determines whether an observable sequence includes a specified element with an optional equality comparer.
   * @param searchElement The value to locate in the source sequence.
   * @param {Number} [fromIndex] An equality comparer to compare elements.
   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence includes an element that has the specified value from the given index.
   */
  observableProto.includes = function (searchElement, fromIndex) {
    var source = this;
    function comparer(a, b) {
      return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
    }
    return new AnonymousObservable(function (o) {
      var i = 0, n = +fromIndex || 0;
      Math.abs(n) === Infinity && (n = 0);
      if (n < 0) {
        o.onNext(false);
        o.onCompleted();
        return disposableEmpty;
      }
      return source.subscribe(
        function (x) {
          if (i++ >= n && comparer(x, searchElement)) {
            o.onNext(true);
            o.onCompleted();
          }
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(false);
          o.onCompleted();
        });
    }, this);
  };

  /**
   * @deprecated use #includes instead.
   */
  observableProto.contains = function (searchElement, fromIndex) {
    //deprecate('contains', 'includes');
    observableProto.includes(searchElement, fromIndex);
  };

  /**
   * Returns an observable sequence containing a value that represents how many elements in the specified observable sequence satisfy a condition if provided, else the count of items.
   * @example
   * res = source.count();
   * res = source.count(function (x) { return x > 3; });
   * @param {Function} [predicate]A function to test each element for a condition.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with a number that represents how many elements in the input sequence satisfy the condition in the predicate function if provided, else the count of items in the sequence.
   */
  observableProto.count = function (predicate, thisArg) {
    return predicate ?
      this.filter(predicate, thisArg).count() :
      this.reduce(function (count) { return count + 1; }, 0);
  };

  /**
   * Returns the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
   * @param {Any} searchElement Element to locate in the array.
   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
   * @returns {Observable} And observable sequence containing the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
   */
  observableProto.indexOf = function(searchElement, fromIndex) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var i = 0, n = +fromIndex || 0;
      Math.abs(n) === Infinity && (n = 0);
      if (n < 0) {
        o.onNext(-1);
        o.onCompleted();
        return disposableEmpty;
      }
      return source.subscribe(
        function (x) {
          if (i >= n && x === searchElement) {
            o.onNext(i);
            o.onCompleted();
          }
          i++;
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(-1);
          o.onCompleted();
        });
    }, source);
  };

  /**
   * Computes the sum of a sequence of values that are obtained by invoking an optional transform function on each element of the input sequence, else if not specified computes the sum on each item in the sequence.
   * @param {Function} [selector] A transform function to apply to each element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with the sum of the values in the source sequence.
   */
  observableProto.sum = function (keySelector, thisArg) {
    return keySelector && isFunction(keySelector) ?
      this.map(keySelector, thisArg).sum() :
      this.reduce(function (prev, curr) { return prev + curr; }, 0);
  };

  /**
   * Returns the elements in an observable sequence with the minimum key value according to the specified comparer.
   * @example
   * var res = source.minBy(function (x) { return x.value; });
   * var res = source.minBy(function (x) { return x.value; }, function (x, y) { return x - y; });
   * @param {Function} keySelector Key selector function.
   * @param {Function} [comparer] Comparer used to compare key values.
   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a minimum key value.
   */
  observableProto.minBy = function (keySelector, comparer) {
    comparer || (comparer = defaultSubComparer);
    return extremaBy(this, keySelector, function (x, y) { return comparer(x, y) * -1; });
  };

  /**
   * Returns the minimum element in an observable sequence according to the optional comparer else a default greater than less than check.
   * @example
   * var res = source.min();
   * var res = source.min(function (x, y) { return x.value - y.value; });
   * @param {Function} [comparer] Comparer used to compare elements.
   * @returns {Observable} An observable sequence containing a single element with the minimum element in the source sequence.
   */
  observableProto.min = function (comparer) {
    return this.minBy(identity, comparer).map(function (x) { return firstOnly(x); });
  };

  /**
   * Returns the elements in an observable sequence with the maximum  key value according to the specified comparer.
   * @example
   * var res = source.maxBy(function (x) { return x.value; });
   * var res = source.maxBy(function (x) { return x.value; }, function (x, y) { return x - y;; });
   * @param {Function} keySelector Key selector function.
   * @param {Function} [comparer]  Comparer used to compare key values.
   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a maximum key value.
   */
  observableProto.maxBy = function (keySelector, comparer) {
    comparer || (comparer = defaultSubComparer);
    return extremaBy(this, keySelector, comparer);
  };

  /**
   * Returns the maximum value in an observable sequence according to the specified comparer.
   * @example
   * var res = source.max();
   * var res = source.max(function (x, y) { return x.value - y.value; });
   * @param {Function} [comparer] Comparer used to compare elements.
   * @returns {Observable} An observable sequence containing a single element with the maximum element in the source sequence.
   */
  observableProto.max = function (comparer) {
    return this.maxBy(identity, comparer).map(function (x) { return firstOnly(x); });
  };

  /**
   * Computes the average of an observable sequence of values that are in the sequence or obtained by invoking a transform function on each element of the input sequence if present.
   * @param {Function} [selector] A transform function to apply to each element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with the average of the sequence of values.
   */
  observableProto.average = function (keySelector, thisArg) {
    return keySelector && isFunction(keySelector) ?
      this.map(keySelector, thisArg).average() :
      this.reduce(function (prev, cur) {
        return {
          sum: prev.sum + cur,
          count: prev.count + 1
        };
      }, {sum: 0, count: 0 }).map(function (s) {
        if (s.count === 0) { throw new EmptyError(); }
        return s.sum / s.count;
      });
  };

  /**
   *  Determines whether two sequences are equal by comparing the elements pairwise using a specified equality comparer.
   *
   * @example
   * var res = res = source.sequenceEqual([1,2,3]);
   * var res = res = source.sequenceEqual([{ value: 42 }], function (x, y) { return x.value === y.value; });
   * 3 - res = source.sequenceEqual(Rx.Observable.returnValue(42));
   * 4 - res = source.sequenceEqual(Rx.Observable.returnValue({ value: 42 }), function (x, y) { return x.value === y.value; });
   * @param {Observable} second Second observable sequence or array to compare.
   * @param {Function} [comparer] Comparer used to compare elements of both sequences.
   * @returns {Observable} An observable sequence that contains a single element which indicates whether both sequences are of equal length and their corresponding elements are equal according to the specified equality comparer.
   */
  observableProto.sequenceEqual = function (second, comparer) {
    var first = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var donel = false, doner = false, ql = [], qr = [];
      var subscription1 = first.subscribe(function (x) {
        var equal, v;
        if (qr.length > 0) {
          v = qr.shift();
          try {
            equal = comparer(v, x);
          } catch (e) {
            o.onError(e);
            return;
          }
          if (!equal) {
            o.onNext(false);
            o.onCompleted();
          }
        } else if (doner) {
          o.onNext(false);
          o.onCompleted();
        } else {
          ql.push(x);
        }
      }, function(e) { o.onError(e); }, function () {
        donel = true;
        if (ql.length === 0) {
          if (qr.length > 0) {
            o.onNext(false);
            o.onCompleted();
          } else if (doner) {
            o.onNext(true);
            o.onCompleted();
          }
        }
      });

      (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
      isPromise(second) && (second = observableFromPromise(second));
      var subscription2 = second.subscribe(function (x) {
        var equal;
        if (ql.length > 0) {
          var v = ql.shift();
          try {
            equal = comparer(v, x);
          } catch (exception) {
            o.onError(exception);
            return;
          }
          if (!equal) {
            o.onNext(false);
            o.onCompleted();
          }
        } else if (donel) {
          o.onNext(false);
          o.onCompleted();
        } else {
          qr.push(x);
        }
      }, function(e) { o.onError(e); }, function () {
        doner = true;
        if (qr.length === 0) {
          if (ql.length > 0) {
            o.onNext(false);
            o.onCompleted();
          } else if (donel) {
            o.onNext(true);
            o.onCompleted();
          }
        }
      });
      return new CompositeDisposable(subscription1, subscription2);
    }, first);
  };

  function elementAtOrDefault(source, index, hasDefault, defaultValue) {
    if (index < 0) { throw new ArgumentOutOfRangeError(); }
    return new AnonymousObservable(function (o) {
      var i = index;
      return source.subscribe(function (x) {
        if (i-- === 0) {
          o.onNext(x);
          o.onCompleted();
        }
      }, function (e) { o.onError(e); }, function () {
        if (!hasDefault) {
          o.onError(new ArgumentOutOfRangeError());
        } else {
          o.onNext(defaultValue);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the element at a specified index in a sequence.
   * @example
   * var res = source.elementAt(5);
   * @param {Number} index The zero-based index of the element to retrieve.
   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence.
   */
  observableProto.elementAt =  function (index) {
    return elementAtOrDefault(this, index, false);
  };

  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   * @example
   * var res = source.elementAtOrDefault(5);
   * var res = source.elementAtOrDefault(5, 0);
   * @param {Number} index The zero-based index of the element to retrieve.
   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence, or a default value if the index is outside the bounds of the source sequence.
   */
  observableProto.elementAtOrDefault = function (index, defaultValue) {
    return elementAtOrDefault(this, index, true, defaultValue);
  };

  function singleOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      var value = defaultValue, seenValue = false;
      return source.subscribe(function (x) {
        if (seenValue) {
          o.onError(new Error('Sequence contains more than one element'));
        } else {
          value = x;
          seenValue = true;
        }
      }, function (e) { o.onError(e); }, function () {
        if (!seenValue && !hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(value);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the only element of an observable sequence that satisfies the condition in the optional predicate, and reports an exception if there is not exactly one element in the observable sequence.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate.
   */
  observableProto.single = function (predicate, thisArg) {
    return predicate && isFunction(predicate) ?
      this.where(predicate, thisArg).single() :
      singleOrDefaultAsync(this, false);
  };

  /**
   * Returns the only element of an observable sequence that matches the predicate, or a default value if no such element exists; this method reports an exception if there is more than one element in the observable sequence.
   * @example
   * var res = res = source.singleOrDefault();
   * var res = res = source.singleOrDefault(function (x) { return x === 42; });
   * res = source.singleOrDefault(function (x) { return x === 42; }, 0);
   * res = source.singleOrDefault(null, 0);
   * @memberOf Observable#
   * @param {Function} predicate A predicate function to evaluate for elements in the source sequence.
   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.singleOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate && isFunction(predicate) ?
      this.filter(predicate, thisArg).singleOrDefault(null, defaultValue) :
      singleOrDefaultAsync(this, true, defaultValue);
  };

  function firstOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      return source.subscribe(function (x) {
        o.onNext(x);
        o.onCompleted();
      }, function (e) { o.onError(e); }, function () {
        if (!hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(defaultValue);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the first element of an observable sequence that satisfies the condition in the predicate if present else the first item in the sequence.
   * @example
   * var res = res = source.first();
   * var res = res = source.first(function (x) { return x > 3; });
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate if provided, else the first item in the sequence.
   */
  observableProto.first = function (predicate, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).first() :
      firstOrDefaultAsync(this, false);
  };

  /**
   * Returns the first element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.firstOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate ?
      this.where(predicate).firstOrDefault(null, defaultValue) :
      firstOrDefaultAsync(this, true, defaultValue);
  };

  function lastOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      var value = defaultValue, seenValue = false;
      return source.subscribe(function (x) {
        value = x;
        seenValue = true;
      }, function (e) { o.onError(e); }, function () {
        if (!seenValue && !hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(value);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the last element of an observable sequence that satisfies the condition in the predicate if specified, else the last element.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate.
   */
  observableProto.last = function (predicate, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).last() :
      lastOrDefaultAsync(this, false);
  };

  /**
   * Returns the last element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.lastOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).lastOrDefault(null, defaultValue) :
      lastOrDefaultAsync(this, true, defaultValue);
  };

  function findValue (source, predicate, thisArg, yieldIndex) {
    var callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0;
      return source.subscribe(function (x) {
        var shouldRun;
        try {
          shouldRun = callback(x, i, source);
        } catch (e) {
          o.onError(e);
          return;
        }
        if (shouldRun) {
          o.onNext(yieldIndex ? i : x);
          o.onCompleted();
        } else {
          i++;
        }
      }, function (e) { o.onError(e); }, function () {
        o.onNext(yieldIndex ? -1 : undefined);
        o.onCompleted();
      });
    }, source);
  }

  /**
   * Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire Observable sequence.
   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} An Observable sequence with the first element that matches the conditions defined by the specified predicate, if found; otherwise, undefined.
   */
  observableProto.find = function (predicate, thisArg) {
    return findValue(this, predicate, thisArg, false);
  };

  /**
   * Searches for an element that matches the conditions defined by the specified predicate, and returns
   * an Observable sequence with the zero-based index of the first occurrence within the entire Observable sequence.
   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} An Observable sequence with the zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, –1.
  */
  observableProto.findIndex = function (predicate, thisArg) {
    return findValue(this, predicate, thisArg, true);
  };

  /**
   * Converts the observable sequence to a Set if it exists.
   * @returns {Observable} An observable sequence with a single value of a Set containing the values from the observable sequence.
   */
  observableProto.toSet = function () {
    if (typeof root.Set === 'undefined') { throw new TypeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var s = new root.Set();
      return source.subscribe(
        function (x) { s.add(x); },
        function (e) { o.onError(e); },
        function () {
          o.onNext(s);
          o.onCompleted();
        });
    }, source);
  };

  /**
  * Converts the observable sequence to a Map if it exists.
  * @param {Function} keySelector A function which produces the key for the Map.
  * @param {Function} [elementSelector] An optional function which produces the element for the Map. If not present, defaults to the value from the observable sequence.
  * @returns {Observable} An observable sequence with a single value of a Map containing the values from the observable sequence.
  */
  observableProto.toMap = function (keySelector, elementSelector) {
    if (typeof root.Map === 'undefined') { throw new TypeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var m = new root.Map();
      return source.subscribe(
        function (x) {
          var key;
          try {
            key = keySelector(x);
          } catch (e) {
            o.onError(e);
            return;
          }

          var element = x;
          if (elementSelector) {
            try {
              element = elementSelector(x);
            } catch (e) {
              o.onError(e);
              return;
            }
          }

          m.set(key, element);
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(m);
          o.onCompleted();
        });
    }, source);
  };

  var fnString = 'function',
      throwString = 'throw',
      isObject = Rx.internals.isObject;

  function toThunk(obj, ctx) {
    if (Array.isArray(obj)) {  return objectToThunk.call(ctx, obj); }
    if (isGeneratorFunction(obj)) { return observableSpawn(obj.call(ctx)); }
    if (isGenerator(obj)) {  return observableSpawn(obj); }
    if (isObservable(obj)) { return observableToThunk(obj); }
    if (isPromise(obj)) { return promiseToThunk(obj); }
    if (typeof obj === fnString) { return obj; }
    if (isObject(obj) || Array.isArray(obj)) { return objectToThunk.call(ctx, obj); }

    return obj;
  }

  function objectToThunk(obj) {
    var ctx = this;

    return function (done) {
      var keys = Object.keys(obj),
          pending = keys.length,
          results = new obj.constructor(),
          finished;

      if (!pending) {
        timeoutScheduler.schedule(function () { done(null, results); });
        return;
      }

      for (var i = 0, len = keys.length; i < len; i++) {
        run(obj[keys[i]], keys[i]);
      }

      function run(fn, key) {
        if (finished) { return; }
        try {
          fn = toThunk(fn, ctx);

          if (typeof fn !== fnString) {
            results[key] = fn;
            return --pending || done(null, results);
          }

          fn.call(ctx, function(err, res) {
            if (finished) { return; }

            if (err) {
              finished = true;
              return done(err);
            }

            results[key] = res;
            --pending || done(null, results);
          });
        } catch (e) {
          finished = true;
          done(e);
        }
      }
    }
  }

  function observableToThunk(observable) {
    return function (fn) {
      var value, hasValue = false;
      observable.subscribe(
        function (v) {
          value = v;
          hasValue = true;
        },
        fn,
        function () {
          hasValue && fn(null, value);
        });
    }
  }

  function promiseToThunk(promise) {
    return function(fn) {
      promise.then(function(res) {
        fn(null, res);
      }, fn);
    }
  }

  function isObservable(obj) {
    return obj && typeof obj.subscribe === fnString;
  }

  function isGeneratorFunction(obj) {
    return obj && obj.constructor && obj.constructor.name === 'GeneratorFunction';
  }

  function isGenerator(obj) {
    return obj && typeof obj.next === fnString && typeof obj[throwString] === fnString;
  }

  /*
   * Spawns a generator function which allows for Promises, Observable sequences, Arrays, Objects, Generators and functions.
   * @param {Function} The spawning function.
   * @returns {Function} a function which has a done continuation.
   */
  var observableSpawn = Rx.spawn = function (fn) {
    var isGenFun = isGeneratorFunction(fn);

    return function (done) {
      var ctx = this,
        gen = fn;

      if (isGenFun) {
        for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
        var len = args.length,
          hasCallback = len && typeof args[len - 1] === fnString;

        done = hasCallback ? args.pop() : handleError;
        gen = fn.apply(this, args);
      } else {
        done = done || handleError;
      }

      next();

      function exit(err, res) {
        timeoutScheduler.schedule(done.bind(ctx, err, res));
      }

      function next(err, res) {
        var ret;

        // multiple args
        if (arguments.length > 2) {
          for(var res = [], i = 1, len = arguments.length; i < len; i++) { res.push(arguments[i]); }
        }

        if (err) {
          try {
            ret = gen[throwString](err);
          } catch (e) {
            return exit(e);
          }
        }

        if (!err) {
          try {
            ret = gen.next(res);
          } catch (e) {
            return exit(e);
          }
        }

        if (ret.done)  {
          return exit(null, ret.value);
        }

        ret.value = toThunk(ret.value, ctx);

        if (typeof ret.value === fnString) {
          var called = false;
          try {
            ret.value.call(ctx, function() {
              if (called) {
                return;
              }

              called = true;
              next.apply(ctx, arguments);
            });
          } catch (e) {
            timeoutScheduler.schedule(function () {
              if (called) {
                return;
              }

              called = true;
              next.call(ctx, e);
            });
          }
          return;
        }

        // Not supported
        next(new TypeError('Rx.spawn only supports a function, Promise, Observable, Object or Array.'));
      }
    }
  };

  function handleError(err) {
    if (!err) { return; }
    timeoutScheduler.schedule(function() {
      throw err;
    });
  }

  /**
   * Invokes the specified function asynchronously on the specified scheduler, surfacing the result through an observable sequence.
   *
   * @example
   * var res = Rx.Observable.start(function () { console.log('hello'); });
   * var res = Rx.Observable.start(function () { console.log('hello'); }, Rx.Scheduler.timeout);
   * var res = Rx.Observable.start(function () { this.log('hello'); }, Rx.Scheduler.timeout, console);
   *
   * @param {Function} func Function to run asynchronously.
   * @param {Scheduler} [scheduler]  Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
   * @param [context]  The context for the func parameter to be executed.  If not specified, defaults to undefined.
   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
   *
   * Remarks
   * * The function is called immediately, not during the subscription of the resulting sequence.
   * * Multiple subscriptions to the resulting sequence can observe the function's result.
   */
  Observable.start = function (func, context, scheduler) {
    return observableToAsync(func, context, scheduler)();
  };

  /**
   * Converts the function into an asynchronous function. Each invocation of the resulting asynchronous function causes an invocation of the original synchronous function on the specified scheduler.
   * @param {Function} function Function to convert to an asynchronous function.
   * @param {Scheduler} [scheduler] Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
   * @returns {Function} Asynchronous function.
   */
  var observableToAsync = Observable.toAsync = function (func, context, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return function () {
      var args = arguments,
        subject = new AsyncSubject();

      scheduler.schedule(function () {
        var result;
        try {
          result = func.apply(context, args);
        } catch (e) {
          subject.onError(e);
          return;
        }
        subject.onNext(result);
        subject.onCompleted();
      });
      return subject.asObservable();
    };
  };

  /**
   * Converts a callback function to an observable sequence.
   *
   * @param {Function} function Function with a callback as the last parameter to convert to an Observable sequence.
   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
   * @param {Function} [selector] A selector which takes the arguments from the callback to produce a single item to yield on next.
   * @returns {Function} A function, when executed with the required parameters minus the callback, produces an Observable sequence with a single value of the arguments to the callback as an array.
   */
  Observable.fromCallback = function (func, context, selector) {
    return function () {
      var len = arguments.length, args = new Array(len)
      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

      return new AnonymousObservable(function (observer) {
        function handler() {
          var len = arguments.length, results = new Array(len);
          for(var i = 0; i < len; i++) { results[i] = arguments[i]; }

          if (selector) {
            try {
              results = selector.apply(context, results);
            } catch (e) {
              return observer.onError(e);
            }

            observer.onNext(results);
          } else {
            if (results.length <= 1) {
              observer.onNext.apply(observer, results);
            } else {
              observer.onNext(results);
            }
          }

          observer.onCompleted();
        }

        args.push(handler);
        func.apply(context, args);
      }).publishLast().refCount();
    };
  };

  /**
   * Converts a Node.js callback style function to an observable sequence.  This must be in function (err, ...) format.
   * @param {Function} func The function to call
   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
   * @param {Function} [selector] A selector which takes the arguments from the callback minus the error to produce a single item to yield on next.
   * @returns {Function} An async function which when applied, returns an observable sequence with the callback arguments as an array.
   */
  Observable.fromNodeCallback = function (func, context, selector) {
    return function () {
      var len = arguments.length, args = new Array(len);
      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

      return new AnonymousObservable(function (observer) {
        function handler(err) {
          if (err) {
            observer.onError(err);
            return;
          }

          var len = arguments.length, results = [];
          for(var i = 1; i < len; i++) { results[i - 1] = arguments[i]; }

          if (selector) {
            try {
              results = selector.apply(context, results);
            } catch (e) {
              return observer.onError(e);
            }
            observer.onNext(results);
          } else {
            if (results.length <= 1) {
              observer.onNext.apply(observer, results);
            } else {
              observer.onNext(results);
            }
          }

          observer.onCompleted();
        }

        args.push(handler);
        func.apply(context, args);
      }).publishLast().refCount();
    };
  };

  function createListener (element, name, handler) {
    if (element.addEventListener) {
      element.addEventListener(name, handler, false);
      return disposableCreate(function () {
        element.removeEventListener(name, handler, false);
      });
    }
    throw new Error('No listener found');
  }

  function createEventListener (el, eventName, handler) {
    var disposables = new CompositeDisposable();

    // Asume NodeList or HTMLCollection
    var toStr = Object.prototype.toString;
    if (toStr.call(el) === '[object NodeList]' || toStr.call(el) === '[object HTMLCollection]') {
      for (var i = 0, len = el.length; i < len; i++) {
        disposables.add(createEventListener(el.item(i), eventName, handler));
      }
    } else if (el) {
      disposables.add(createListener(el, eventName, handler));
    }

    return disposables;
  }

  /**
   * Configuration option to determine whether to use native events only
   */
  Rx.config.useNativeEvents = false;

  /**
   * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
   *
   * @example
   *   var source = Rx.Observable.fromEvent(element, 'mouseup');
   *
   * @param {Object} element The DOMElement or NodeList to attach a listener.
   * @param {String} eventName The event name to attach the observable sequence.
   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
   * @returns {Observable} An observable sequence of events from the specified element and the specified event.
   */
  Observable.fromEvent = function (element, eventName, selector) {
    // Node.js specific
    if (element.addListener) {
      return fromEventPattern(
        function (h) { element.addListener(eventName, h); },
        function (h) { element.removeListener(eventName, h); },
        selector);
    }

    // Use only if non-native events are allowed
    if (!Rx.config.useNativeEvents) {
      // Handles jq, Angular.js, Zepto, Marionette, Ember.js
      if (typeof element.on === 'function' && typeof element.off === 'function') {
        return fromEventPattern(
          function (h) { element.on(eventName, h); },
          function (h) { element.off(eventName, h); },
          selector);
      }
    }
    return new AnonymousObservable(function (observer) {
      return createEventListener(
        element,
        eventName,
        function handler (e) {
          var results = e;

          if (selector) {
            try {
              results = selector(arguments);
            } catch (err) {
              return observer.onError(err);
            }
          }

          observer.onNext(results);
        });
    }).publish().refCount();
  };

  /**
   * Creates an observable sequence from an event emitter via an addHandler/removeHandler pair.
   * @param {Function} addHandler The function to add a handler to the emitter.
   * @param {Function} [removeHandler] The optional function to remove a handler from an emitter.
   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
   * @returns {Observable} An observable sequence which wraps an event from an event emitter
   */
  var fromEventPattern = Observable.fromEventPattern = function (addHandler, removeHandler, selector) {
    return new AnonymousObservable(function (observer) {
      function innerHandler (e) {
        var result = e;
        if (selector) {
          try {
            result = selector(arguments);
          } catch (err) {
            return observer.onError(err);
          }
        }
        observer.onNext(result);
      }

      var returnValue = addHandler(innerHandler);
      return disposableCreate(function () {
        if (removeHandler) {
          removeHandler(innerHandler, returnValue);
        }
      });
    }).publish().refCount();
  };

  /**
   * Invokes the asynchronous function, surfacing the result through an observable sequence.
   * @param {Function} functionAsync Asynchronous function which returns a Promise to run.
   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
   */
  Observable.startAsync = function (functionAsync) {
    var promise;
    try {
      promise = functionAsync();
    } catch (e) {
      return observableThrow(e);
    }
    return observableFromPromise(promise);
  }

  var PausableObservable = (function (__super__) {

    inherits(PausableObservable, __super__);

    function subscribe(observer) {
      var conn = this.source.publish(),
        subscription = conn.subscribe(observer),
        connection = disposableEmpty;

      var pausable = this.pauser.distinctUntilChanged().subscribe(function (b) {
        if (b) {
          connection = conn.connect();
        } else {
          connection.dispose();
          connection = disposableEmpty;
        }
      });

      return new CompositeDisposable(subscription, connection, pausable);
    }

    function PausableObservable(source, pauser) {
      this.source = source;
      this.controller = new Subject();

      if (pauser && pauser.subscribe) {
        this.pauser = this.controller.merge(pauser);
      } else {
        this.pauser = this.controller;
      }

      __super__.call(this, subscribe, source);
    }

    PausableObservable.prototype.pause = function () {
      this.controller.onNext(false);
    };

    PausableObservable.prototype.resume = function () {
      this.controller.onNext(true);
    };

    return PausableObservable;

  }(Observable));

  /**
   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false.
   * @example
   * var pauser = new Rx.Subject();
   * var source = Rx.Observable.interval(100).pausable(pauser);
   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
   * @returns {Observable} The observable sequence which is paused based upon the pauser.
   */
  observableProto.pausable = function (pauser) {
    return new PausableObservable(this, pauser);
  };

  function combineLatestSource(source, subject, resultSelector) {
    return new AnonymousObservable(function (o) {
      var hasValue = [false, false],
        hasValueAll = false,
        isDone = false,
        values = new Array(2),
        err;

      function next(x, i) {
        values[i] = x
        hasValue[i] = true;
        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
          if (err) { return o.onError(err); }
          var res = tryCatch(resultSelector).apply(null, values);
          if (res === errorObj) { return o.onError(res.e); }
          o.onNext(res);
        }
        isDone && values[1] && o.onCompleted();
      }

      return new CompositeDisposable(
        source.subscribe(
          function (x) {
            next(x, 0);
          },
          function (e) {
            if (values[1]) {
              o.onError(e);
            } else {
              err = e;
            }
          },
          function () {
            isDone = true;
            values[1] && o.onCompleted();
          }),
        subject.subscribe(
          function (x) {
            next(x, 1);
          },
          function (e) { o.onError(e); },
          function () {
            isDone = true;
            next(true, 1);
          })
        );
    }, source);
  }

  var PausableBufferedObservable = (function (__super__) {

    inherits(PausableBufferedObservable, __super__);

    function subscribe(o) {
      var q = [], previousShouldFire;

      function drainQueue() { while (q.length > 0) { o.onNext(q.shift()); } }

      var subscription =
        combineLatestSource(
          this.source,
          this.pauser.distinctUntilChanged().startWith(false),
          function (data, shouldFire) {
            return { data: data, shouldFire: shouldFire };
          })
          .subscribe(
            function (results) {
              if (previousShouldFire !== undefined && results.shouldFire != previousShouldFire) {
                previousShouldFire = results.shouldFire;
                // change in shouldFire
                if (results.shouldFire) { drainQueue(); }
              } else {
                previousShouldFire = results.shouldFire;
                // new data
                if (results.shouldFire) {
                  o.onNext(results.data);
                } else {
                  q.push(results.data);
                }
              }
            },
            function (err) {
              drainQueue();
              o.onError(err);
            },
            function () {
              drainQueue();
              o.onCompleted();
            }
          );
      return subscription;
    }

    function PausableBufferedObservable(source, pauser) {
      this.source = source;
      this.controller = new Subject();

      if (pauser && pauser.subscribe) {
        this.pauser = this.controller.merge(pauser);
      } else {
        this.pauser = this.controller;
      }

      __super__.call(this, subscribe, source);
    }

    PausableBufferedObservable.prototype.pause = function () {
      this.controller.onNext(false);
    };

    PausableBufferedObservable.prototype.resume = function () {
      this.controller.onNext(true);
    };

    return PausableBufferedObservable;

  }(Observable));

  /**
   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false,
   * and yields the values that were buffered while paused.
   * @example
   * var pauser = new Rx.Subject();
   * var source = Rx.Observable.interval(100).pausableBuffered(pauser);
   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
   * @returns {Observable} The observable sequence which is paused based upon the pauser.
   */
  observableProto.pausableBuffered = function (subject) {
    return new PausableBufferedObservable(this, subject);
  };

  var ControlledObservable = (function (__super__) {

    inherits(ControlledObservable, __super__);

    function subscribe (observer) {
      return this.source.subscribe(observer);
    }

    function ControlledObservable (source, enableQueue, scheduler) {
      __super__.call(this, subscribe, source);
      this.subject = new ControlledSubject(enableQueue, scheduler);
      this.source = source.multicast(this.subject).refCount();
    }

    ControlledObservable.prototype.request = function (numberOfItems) {
      return this.subject.request(numberOfItems == null ? -1 : numberOfItems);
    };

    return ControlledObservable;

  }(Observable));

  var ControlledSubject = (function (__super__) {

    function subscribe (observer) {
      return this.subject.subscribe(observer);
    }

    inherits(ControlledSubject, __super__);

    function ControlledSubject(enableQueue, scheduler) {
      enableQueue == null && (enableQueue = true);

      __super__.call(this, subscribe);
      this.subject = new Subject();
      this.enableQueue = enableQueue;
      this.queue = enableQueue ? [] : null;
      this.requestedCount = 0;
      this.requestedDisposable = disposableEmpty;
      this.error = null;
      this.hasFailed = false;
      this.hasCompleted = false;
      this.scheduler = scheduler || currentThreadScheduler;
    }

    addProperties(ControlledSubject.prototype, Observer, {
      onCompleted: function () {
        this.hasCompleted = true;
        if (!this.enableQueue || this.queue.length === 0) {
          this.subject.onCompleted();
        } else {
          this.queue.push(Notification.createOnCompleted());
        }
      },
      onError: function (error) {
        this.hasFailed = true;
        this.error = error;
        if (!this.enableQueue || this.queue.length === 0) {
          this.subject.onError(error);
        } else {
          this.queue.push(Notification.createOnError(error));
        }
      },
      onNext: function (value) {
        var hasRequested = false;

        if (this.requestedCount === 0) {
          this.enableQueue && this.queue.push(Notification.createOnNext(value));
        } else {
          (this.requestedCount !== -1 && this.requestedCount-- === 0) && this.disposeCurrentRequest();
          hasRequested = true;
        }
        hasRequested && this.subject.onNext(value);
      },
      _processRequest: function (numberOfItems) {
        if (this.enableQueue) {
          while ((this.queue.length >= numberOfItems && numberOfItems > 0) ||
          (this.queue.length > 0 && this.queue[0].kind !== 'N')) {
            var first = this.queue.shift();
            first.accept(this.subject);
            if (first.kind === 'N') {
              numberOfItems--;
            } else {
              this.disposeCurrentRequest();
              this.queue = [];
            }
          }

          return { numberOfItems : numberOfItems, returnValue: this.queue.length !== 0};
        }

        return { numberOfItems: numberOfItems, returnValue: false };
      },
      request: function (number) {
        this.disposeCurrentRequest();
        var self = this;

        this.requestedDisposable = this.scheduler.scheduleWithState(number,
        function(s, i) {
          var r = self._processRequest(i), remaining = r.numberOfItems;
          if (!r.returnValue) {
            self.requestedCount = remaining;
            self.requestedDisposable = disposableCreate(function () {
              self.requestedCount = 0;
            });
          }
        });

        return this.requestedDisposable;
      },
      disposeCurrentRequest: function () {
        this.requestedDisposable.dispose();
        this.requestedDisposable = disposableEmpty;
      }
    });

    return ControlledSubject;
  }(Observable));

  /**
   * Attaches a controller to the observable sequence with the ability to queue.
   * @example
   * var source = Rx.Observable.interval(100).controlled();
   * source.request(3); // Reads 3 values
   * @param {bool} enableQueue truthy value to determine if values should be queued pending the next request
   * @param {Scheduler} scheduler determines how the requests will be scheduled
   * @returns {Observable} The observable sequence which only propagates values on request.
   */
  observableProto.controlled = function (enableQueue, scheduler) {

    if (enableQueue && isScheduler(enableQueue)) {
        scheduler = enableQueue;
        enableQueue = true;
    }

    if (enableQueue == null) {  enableQueue = true; }
    return new ControlledObservable(this, enableQueue, scheduler);
  };

  var StopAndWaitObservable = (function (__super__) {

    function subscribe (observer) {
      this.subscription = this.source.subscribe(new StopAndWaitObserver(observer, this, this.subscription));

      var self = this;
      timeoutScheduler.schedule(function () { self.source.request(1); });

      return this.subscription;
    }

    inherits(StopAndWaitObservable, __super__);

    function StopAndWaitObservable (source) {
      __super__.call(this, subscribe, source);
      this.source = source;
    }

    var StopAndWaitObserver = (function (__sub__) {

      inherits(StopAndWaitObserver, __sub__);

      function StopAndWaitObserver (observer, observable, cancel) {
        __sub__.call(this);
        this.observer = observer;
        this.observable = observable;
        this.cancel = cancel;
      }

      var stopAndWaitObserverProto = StopAndWaitObserver.prototype;

      stopAndWaitObserverProto.completed = function () {
        this.observer.onCompleted();
        this.dispose();
      };

      stopAndWaitObserverProto.error = function (error) {
        this.observer.onError(error);
        this.dispose();
      }

      stopAndWaitObserverProto.next = function (value) {
        this.observer.onNext(value);

        var self = this;
        timeoutScheduler.schedule(function () {
          self.observable.source.request(1);
        });
      };

      stopAndWaitObserverProto.dispose = function () {
        this.observer = null;
        if (this.cancel) {
          this.cancel.dispose();
          this.cancel = null;
        }
        __sub__.prototype.dispose.call(this);
      };

      return StopAndWaitObserver;
    }(AbstractObserver));

    return StopAndWaitObservable;
  }(Observable));


  /**
   * Attaches a stop and wait observable to the current observable.
   * @returns {Observable} A stop and wait observable.
   */
  ControlledObservable.prototype.stopAndWait = function () {
    return new StopAndWaitObservable(this);
  };

  var WindowedObservable = (function (__super__) {

    function subscribe (observer) {
      this.subscription = this.source.subscribe(new WindowedObserver(observer, this, this.subscription));

      var self = this;
      timeoutScheduler.schedule(function () {
        self.source.request(self.windowSize);
      });

      return this.subscription;
    }

    inherits(WindowedObservable, __super__);

    function WindowedObservable(source, windowSize) {
      __super__.call(this, subscribe, source);
      this.source = source;
      this.windowSize = windowSize;
    }

    var WindowedObserver = (function (__sub__) {

      inherits(WindowedObserver, __sub__);

      function WindowedObserver(observer, observable, cancel) {
        this.observer = observer;
        this.observable = observable;
        this.cancel = cancel;
        this.received = 0;
      }

      var windowedObserverPrototype = WindowedObserver.prototype;

      windowedObserverPrototype.completed = function () {
        this.observer.onCompleted();
        this.dispose();
      };

      windowedObserverPrototype.error = function (error) {
        this.observer.onError(error);
        this.dispose();
      };

      windowedObserverPrototype.next = function (value) {
        this.observer.onNext(value);

        this.received = ++this.received % this.observable.windowSize;
        if (this.received === 0) {
          var self = this;
          timeoutScheduler.schedule(function () {
            self.observable.source.request(self.observable.windowSize);
          });
        }
      };

      windowedObserverPrototype.dispose = function () {
        this.observer = null;
        if (this.cancel) {
          this.cancel.dispose();
          this.cancel = null;
        }
        __sub__.prototype.dispose.call(this);
      };

      return WindowedObserver;
    }(AbstractObserver));

    return WindowedObservable;
  }(Observable));

  /**
   * Creates a sliding windowed observable based upon the window size.
   * @param {Number} windowSize The number of items in the window
   * @returns {Observable} A windowed observable based upon the window size.
   */
  ControlledObservable.prototype.windowed = function (windowSize) {
    return new WindowedObservable(this, windowSize);
  };

  /**
   * Pipes the existing Observable sequence into a Node.js Stream.
   * @param {Stream} dest The destination Node.js stream.
   * @returns {Stream} The destination stream.
   */
  observableProto.pipe = function (dest) {
    var source = this.pausableBuffered();

    function onDrain() {
      source.resume();
    }

    dest.addListener('drain', onDrain);

    source.subscribe(
      function (x) {
        !dest.write(String(x)) && source.pause();
      },
      function (err) {
        dest.emit('error', err);
      },
      function () {
        // Hack check because STDIO is not closable
        !dest._isStdio && dest.end();
        dest.removeListener('drain', onDrain);
      });

    source.resume();

    return dest;
  };

  /**
   * Multicasts the source sequence notifications through an instantiated subject into all uses of the sequence within a selector function. Each
   * subscription to the resulting sequence causes a separate multicast invocation, exposing the sequence resulting from the selector function's
   * invocation. For specializations with fixed subject types, see Publish, PublishLast, and Replay.
   *
   * @example
   * 1 - res = source.multicast(observable);
   * 2 - res = source.multicast(function () { return new Subject(); }, function (x) { return x; });
   *
   * @param {Function|Subject} subjectOrSubjectSelector
   * Factory function to create an intermediate subject through which the source sequence's elements will be multicast to the selector function.
   * Or:
   * Subject to push source elements into.
   *
   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence subject to the policies enforced by the created subject. Specified only if <paramref name="subjectOrSubjectSelector" is a factory function.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.multicast = function (subjectOrSubjectSelector, selector) {
    var source = this;
    return typeof subjectOrSubjectSelector === 'function' ?
      new AnonymousObservable(function (observer) {
        var connectable = source.multicast(subjectOrSubjectSelector());
        return new CompositeDisposable(selector(connectable).subscribe(observer), connectable.connect());
      }, source) :
      new ConnectableObservable(source, subjectOrSubjectSelector);
  };

  /**
   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence.
   * This operator is a specialization of Multicast using a regular Subject.
   *
   * @example
   * var resres = source.publish();
   * var res = source.publish(function (x) { return x; });
   *
   * @param {Function} [selector] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.publish = function (selector) {
    return selector && isFunction(selector) ?
      this.multicast(function () { return new Subject(); }, selector) :
      this.multicast(new Subject());
  };

  /**
   * Returns an observable sequence that shares a single subscription to the underlying sequence.
   * This operator is a specialization of publish which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
   */
  observableProto.share = function () {
    return this.publish().refCount();
  };

  /**
   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence containing only the last notification.
   * This operator is a specialization of Multicast using a AsyncSubject.
   *
   * @example
   * var res = source.publishLast();
   * var res = source.publishLast(function (x) { return x; });
   *
   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will only receive the last notification of the source.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.publishLast = function (selector) {
    return selector && isFunction(selector) ?
      this.multicast(function () { return new AsyncSubject(); }, selector) :
      this.multicast(new AsyncSubject());
  };

  /**
   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence and starts with initialValue.
   * This operator is a specialization of Multicast using a BehaviorSubject.
   *
   * @example
   * var res = source.publishValue(42);
   * var res = source.publishValue(function (x) { return x.select(function (y) { return y * y; }) }, 42);
   *
   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive immediately receive the initial value, followed by all notifications of the source from the time of the subscription on.
   * @param {Mixed} initialValue Initial value received by observers upon subscription.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.publishValue = function (initialValueOrSelector, initialValue) {
    return arguments.length === 2 ?
      this.multicast(function () {
        return new BehaviorSubject(initialValue);
      }, initialValueOrSelector) :
      this.multicast(new BehaviorSubject(initialValueOrSelector));
  };

  /**
   * Returns an observable sequence that shares a single subscription to the underlying sequence and starts with an initialValue.
   * This operator is a specialization of publishValue which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
   * @param {Mixed} initialValue Initial value received by observers upon subscription.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
   */
  observableProto.shareValue = function (initialValue) {
    return this.publishValue(initialValue).refCount();
  };

  /**
   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
   * This operator is a specialization of Multicast using a ReplaySubject.
   *
   * @example
   * var res = source.replay(null, 3);
   * var res = source.replay(null, 3, 500);
   * var res = source.replay(null, 3, 500, scheduler);
   * var res = source.replay(function (x) { return x.take(6).repeat(); }, 3, 500, scheduler);
   *
   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all the notifications of the source subject to the specified replay buffer trimming policy.
   * @param bufferSize [Optional] Maximum element count of the replay buffer.
   * @param windowSize [Optional] Maximum time length of the replay buffer.
   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.replay = function (selector, bufferSize, windowSize, scheduler) {
    return selector && isFunction(selector) ?
      this.multicast(function () { return new ReplaySubject(bufferSize, windowSize, scheduler); }, selector) :
      this.multicast(new ReplaySubject(bufferSize, windowSize, scheduler));
  };

  /**
   * Returns an observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
   * This operator is a specialization of replay which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
   *
   * @example
   * var res = source.shareReplay(3);
   * var res = source.shareReplay(3, 500);
   * var res = source.shareReplay(3, 500, scheduler);
   *

   * @param bufferSize [Optional] Maximum element count of the replay buffer.
   * @param window [Optional] Maximum time length of the replay buffer.
   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
   */
  observableProto.shareReplay = function (bufferSize, windowSize, scheduler) {
    return this.replay(null, bufferSize, windowSize, scheduler).refCount();
  };

  var InnerSubscription = function (subject, observer) {
    this.subject = subject;
    this.observer = observer;
  };

  InnerSubscription.prototype.dispose = function () {
    if (!this.subject.isDisposed && this.observer !== null) {
      var idx = this.subject.observers.indexOf(this.observer);
      this.subject.observers.splice(idx, 1);
      this.observer = null;
    }
  };

  /**
   *  Represents a value that changes over time.
   *  Observers can subscribe to the subject to receive the last (or initial) value and all subsequent notifications.
   */
  var BehaviorSubject = Rx.BehaviorSubject = (function (__super__) {
    function subscribe(observer) {
      checkDisposed(this);
      if (!this.isStopped) {
        this.observers.push(observer);
        observer.onNext(this.value);
        return new InnerSubscription(this, observer);
      }
      if (this.hasError) {
        observer.onError(this.error);
      } else {
        observer.onCompleted();
      }
      return disposableEmpty;
    }

    inherits(BehaviorSubject, __super__);

    /**
     *  Initializes a new instance of the BehaviorSubject class which creates a subject that caches its last value and starts with the specified value.
     *  @param {Mixed} value Initial value sent to observers when no other value has been received by the subject yet.
     */
    function BehaviorSubject(value) {
      __super__.call(this, subscribe);
      this.value = value,
      this.observers = [],
      this.isDisposed = false,
      this.isStopped = false,
      this.hasError = false;
    }

    addProperties(BehaviorSubject.prototype, Observer, {
      /**
       * Gets the current value or throws an exception.
       * Value is frozen after onCompleted is called.
       * After onError is called always throws the specified exception.
       * An exception is always thrown after dispose is called.
       * @returns {Mixed} The initial value passed to the constructor until onNext is called; after which, the last value passed to onNext.
       */
      getValue: function () {
          checkDisposed(this);
          if (this.hasError) {
              throw this.error;
          }
          return this.value;
      },
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () { return this.observers.length > 0; },
      /**
       * Notifies all subscribed observers about the end of the sequence.
       */
      onCompleted: function () {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.isStopped = true;
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onCompleted();
        }

        this.observers.length = 0;
      },
      /**
       * Notifies all subscribed observers about the exception.
       * @param {Mixed} error The exception to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.isStopped = true;
        this.hasError = true;
        this.error = error;

        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onError(error);
        }

        this.observers.length = 0;
      },
      /**
       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
       * @param {Mixed} value The value to send to all observers.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.value = value;
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onNext(value);
        }
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
        this.value = null;
        this.exception = null;
      }
    });

    return BehaviorSubject;
  }(Observable));

  /**
   * Represents an object that is both an observable sequence as well as an observer.
   * Each notification is broadcasted to all subscribed and future observers, subject to buffer trimming policies.
   */
  var ReplaySubject = Rx.ReplaySubject = (function (__super__) {

    var maxSafeInteger = Math.pow(2, 53) - 1;

    function createRemovableDisposable(subject, observer) {
      return disposableCreate(function () {
        observer.dispose();
        !subject.isDisposed && subject.observers.splice(subject.observers.indexOf(observer), 1);
      });
    }

    function subscribe(observer) {
      var so = new ScheduledObserver(this.scheduler, observer),
        subscription = createRemovableDisposable(this, so);
      checkDisposed(this);
      this._trim(this.scheduler.now());
      this.observers.push(so);

      for (var i = 0, len = this.q.length; i < len; i++) {
        so.onNext(this.q[i].value);
      }

      if (this.hasError) {
        so.onError(this.error);
      } else if (this.isStopped) {
        so.onCompleted();
      }

      so.ensureActive();
      return subscription;
    }

    inherits(ReplaySubject, __super__);

    /**
     *  Initializes a new instance of the ReplaySubject class with the specified buffer size, window size and scheduler.
     *  @param {Number} [bufferSize] Maximum element count of the replay buffer.
     *  @param {Number} [windowSize] Maximum time length of the replay buffer.
     *  @param {Scheduler} [scheduler] Scheduler the observers are invoked on.
     */
    function ReplaySubject(bufferSize, windowSize, scheduler) {
      this.bufferSize = bufferSize == null ? maxSafeInteger : bufferSize;
      this.windowSize = windowSize == null ? maxSafeInteger : windowSize;
      this.scheduler = scheduler || currentThreadScheduler;
      this.q = [];
      this.observers = [];
      this.isStopped = false;
      this.isDisposed = false;
      this.hasError = false;
      this.error = null;
      __super__.call(this, subscribe);
    }

    addProperties(ReplaySubject.prototype, Observer.prototype, {
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () {
        return this.observers.length > 0;
      },
      _trim: function (now) {
        while (this.q.length > this.bufferSize) {
          this.q.shift();
        }
        while (this.q.length > 0 && (now - this.q[0].interval) > this.windowSize) {
          this.q.shift();
        }
      },
      /**
       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
       * @param {Mixed} value The value to send to all observers.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        var now = this.scheduler.now();
        this.q.push({ interval: now, value: value });
        this._trim(now);

        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onNext(value);
          observer.ensureActive();
        }
      },
      /**
       * Notifies all subscribed observers about the exception.
       * @param {Mixed} error The exception to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.isStopped = true;
        this.error = error;
        this.hasError = true;
        var now = this.scheduler.now();
        this._trim(now);
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onError(error);
          observer.ensureActive();
        }
        this.observers.length = 0;
      },
      /**
       * Notifies all subscribed observers about the end of the sequence.
       */
      onCompleted: function () {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.isStopped = true;
        var now = this.scheduler.now();
        this._trim(now);
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onCompleted();
          observer.ensureActive();
        }
        this.observers.length = 0;
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
      }
    });

    return ReplaySubject;
  }(Observable));

  var ConnectableObservable = Rx.ConnectableObservable = (function (__super__) {
    inherits(ConnectableObservable, __super__);

    function ConnectableObservable(source, subject) {
      var hasSubscription = false,
        subscription,
        sourceObservable = source.asObservable();

      this.connect = function () {
        if (!hasSubscription) {
          hasSubscription = true;
          subscription = new CompositeDisposable(sourceObservable.subscribe(subject), disposableCreate(function () {
            hasSubscription = false;
          }));
        }
        return subscription;
      };

      __super__.call(this, function (o) { return subject.subscribe(o); });
    }

    ConnectableObservable.prototype.refCount = function () {
      var connectableSubscription, count = 0, source = this;
      return new AnonymousObservable(function (observer) {
          var shouldConnect = ++count === 1,
            subscription = source.subscribe(observer);
          shouldConnect && (connectableSubscription = source.connect());
          return function () {
            subscription.dispose();
            --count === 0 && connectableSubscription.dispose();
          };
      });
    };

    return ConnectableObservable;
  }(Observable));

  /**
   * Returns an observable sequence that shares a single subscription to the underlying sequence. This observable sequence
   * can be resubscribed to, even if all prior subscriptions have ended. (unlike `.publish().refCount()`)
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source.
   */
  observableProto.singleInstance = function() {
    var source = this, hasObservable = false, observable;

    function getObservable() {
      if (!hasObservable) {
        hasObservable = true;
        observable = source.finally(function() { hasObservable = false; }).publish().refCount();
      }
      return observable;
    };

    return new AnonymousObservable(function(o) {
      return getObservable().subscribe(o);
    });
  };

  var Dictionary = (function () {

    var primes = [1, 3, 7, 13, 31, 61, 127, 251, 509, 1021, 2039, 4093, 8191, 16381, 32749, 65521, 131071, 262139, 524287, 1048573, 2097143, 4194301, 8388593, 16777213, 33554393, 67108859, 134217689, 268435399, 536870909, 1073741789, 2147483647],
      noSuchkey = "no such key",
      duplicatekey = "duplicate key";

    function isPrime(candidate) {
      if ((candidate & 1) === 0) { return candidate === 2; }
      var num1 = Math.sqrt(candidate),
        num2 = 3;
      while (num2 <= num1) {
        if (candidate % num2 === 0) { return false; }
        num2 += 2;
      }
      return true;
    }

    function getPrime(min) {
      var index, num, candidate;
      for (index = 0; index < primes.length; ++index) {
        num = primes[index];
        if (num >= min) { return num; }
      }
      candidate = min | 1;
      while (candidate < primes[primes.length - 1]) {
        if (isPrime(candidate)) { return candidate; }
        candidate += 2;
      }
      return min;
    }

    function stringHashFn(str) {
      var hash = 757602046;
      if (!str.length) { return hash; }
      for (var i = 0, len = str.length; i < len; i++) {
        var character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
      }
      return hash;
    }

    function numberHashFn(key) {
      var c2 = 0x27d4eb2d;
      key = (key ^ 61) ^ (key >>> 16);
      key = key + (key << 3);
      key = key ^ (key >>> 4);
      key = key * c2;
      key = key ^ (key >>> 15);
      return key;
    }

    var getHashCode = (function () {
      var uniqueIdCounter = 0;

      return function (obj) {
        if (obj == null) { throw new Error(noSuchkey); }

        // Check for built-ins before tacking on our own for any object
        if (typeof obj === 'string') { return stringHashFn(obj); }
        if (typeof obj === 'number') { return numberHashFn(obj); }
        if (typeof obj === 'boolean') { return obj === true ? 1 : 0; }
        if (obj instanceof Date) { return numberHashFn(obj.valueOf()); }
        if (obj instanceof RegExp) { return stringHashFn(obj.toString()); }
        if (typeof obj.valueOf === 'function') {
          // Hack check for valueOf
          var valueOf = obj.valueOf();
          if (typeof valueOf === 'number') { return numberHashFn(valueOf); }
          if (typeof valueOf === 'string') { return stringHashFn(valueOf); }
        }
        if (obj.hashCode) { return obj.hashCode(); }

        var id = 17 * uniqueIdCounter++;
        obj.hashCode = function () { return id; };
        return id;
      };
    }());

    function newEntry() {
      return { key: null, value: null, next: 0, hashCode: 0 };
    }

    function Dictionary(capacity, comparer) {
      if (capacity < 0) { throw new ArgumentOutOfRangeError(); }
      if (capacity > 0) { this._initialize(capacity); }

      this.comparer = comparer || defaultComparer;
      this.freeCount = 0;
      this.size = 0;
      this.freeList = -1;
    }

    var dictionaryProto = Dictionary.prototype;

    dictionaryProto._initialize = function (capacity) {
      var prime = getPrime(capacity), i;
      this.buckets = new Array(prime);
      this.entries = new Array(prime);
      for (i = 0; i < prime; i++) {
        this.buckets[i] = -1;
        this.entries[i] = newEntry();
      }
      this.freeList = -1;
    };

    dictionaryProto.add = function (key, value) {
      this._insert(key, value, true);
    };

    dictionaryProto._insert = function (key, value, add) {
      if (!this.buckets) { this._initialize(0); }
      var index3,
        num = getHashCode(key) & 2147483647,
        index1 = num % this.buckets.length;
      for (var index2 = this.buckets[index1]; index2 >= 0; index2 = this.entries[index2].next) {
        if (this.entries[index2].hashCode === num && this.comparer(this.entries[index2].key, key)) {
          if (add) { throw new Error(duplicatekey); }
          this.entries[index2].value = value;
          return;
        }
      }
      if (this.freeCount > 0) {
        index3 = this.freeList;
        this.freeList = this.entries[index3].next;
        --this.freeCount;
      } else {
        if (this.size === this.entries.length) {
          this._resize();
          index1 = num % this.buckets.length;
        }
        index3 = this.size;
        ++this.size;
      }
      this.entries[index3].hashCode = num;
      this.entries[index3].next = this.buckets[index1];
      this.entries[index3].key = key;
      this.entries[index3].value = value;
      this.buckets[index1] = index3;
    };

    dictionaryProto._resize = function () {
      var prime = getPrime(this.size * 2),
        numArray = new Array(prime);
      for (index = 0; index < numArray.length; ++index) {  numArray[index] = -1; }
      var entryArray = new Array(prime);
      for (index = 0; index < this.size; ++index) { entryArray[index] = this.entries[index]; }
      for (var index = this.size; index < prime; ++index) { entryArray[index] = newEntry(); }
      for (var index1 = 0; index1 < this.size; ++index1) {
        var index2 = entryArray[index1].hashCode % prime;
        entryArray[index1].next = numArray[index2];
        numArray[index2] = index1;
      }
      this.buckets = numArray;
      this.entries = entryArray;
    };

    dictionaryProto.remove = function (key) {
      if (this.buckets) {
        var num = getHashCode(key) & 2147483647,
          index1 = num % this.buckets.length,
          index2 = -1;
        for (var index3 = this.buckets[index1]; index3 >= 0; index3 = this.entries[index3].next) {
          if (this.entries[index3].hashCode === num && this.comparer(this.entries[index3].key, key)) {
            if (index2 < 0) {
              this.buckets[index1] = this.entries[index3].next;
            } else {
              this.entries[index2].next = this.entries[index3].next;
            }
            this.entries[index3].hashCode = -1;
            this.entries[index3].next = this.freeList;
            this.entries[index3].key = null;
            this.entries[index3].value = null;
            this.freeList = index3;
            ++this.freeCount;
            return true;
          } else {
            index2 = index3;
          }
        }
      }
      return false;
    };

    dictionaryProto.clear = function () {
      var index, len;
      if (this.size <= 0) { return; }
      for (index = 0, len = this.buckets.length; index < len; ++index) {
        this.buckets[index] = -1;
      }
      for (index = 0; index < this.size; ++index) {
        this.entries[index] = newEntry();
      }
      this.freeList = -1;
      this.size = 0;
    };

    dictionaryProto._findEntry = function (key) {
      if (this.buckets) {
        var num = getHashCode(key) & 2147483647;
        for (var index = this.buckets[num % this.buckets.length]; index >= 0; index = this.entries[index].next) {
          if (this.entries[index].hashCode === num && this.comparer(this.entries[index].key, key)) {
            return index;
          }
        }
      }
      return -1;
    };

    dictionaryProto.count = function () {
      return this.size - this.freeCount;
    };

    dictionaryProto.tryGetValue = function (key) {
      var entry = this._findEntry(key);
      return entry >= 0 ?
        this.entries[entry].value :
        undefined;
    };

    dictionaryProto.getValues = function () {
      var index = 0, results = [];
      if (this.entries) {
        for (var index1 = 0; index1 < this.size; index1++) {
          if (this.entries[index1].hashCode >= 0) {
            results[index++] = this.entries[index1].value;
          }
        }
      }
      return results;
    };

    dictionaryProto.get = function (key) {
      var entry = this._findEntry(key);
      if (entry >= 0) { return this.entries[entry].value; }
      throw new Error(noSuchkey);
    };

    dictionaryProto.set = function (key, value) {
      this._insert(key, value, false);
    };

    dictionaryProto.containskey = function (key) {
      return this._findEntry(key) >= 0;
    };

    return Dictionary;
  }());

  /**
   *  Correlates the elements of two sequences based on overlapping durations.
   *
   *  @param {Observable} right The right observable sequence to join elements for.
   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
   *  @param {Function} resultSelector A function invoked to compute a result element for any two overlapping elements of the left and right observable sequences. The parameters passed to the function correspond with the elements from the left and right source sequences for which overlap occurs.
   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
   */
  observableProto.join = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
    var left = this;
    return new AnonymousObservable(function (observer) {
      var group = new CompositeDisposable();
      var leftDone = false, rightDone = false;
      var leftId = 0, rightId = 0;
      var leftMap = new Dictionary(), rightMap = new Dictionary();

      group.add(left.subscribe(
        function (value) {
          var id = leftId++;
          var md = new SingleAssignmentDisposable();

          leftMap.add(id, value);
          group.add(md);

          var expire = function () {
            leftMap.remove(id) && leftMap.count() === 0 && leftDone && observer.onCompleted();
            group.remove(md);
          };

          var duration;
          try {
            duration = leftDurationSelector(value);
          } catch (e) {
            observer.onError(e);
            return;
          }

          md.setDisposable(duration.take(1).subscribe(noop, observer.onError.bind(observer), expire));

          rightMap.getValues().forEach(function (v) {
            var result;
            try {
              result = resultSelector(value, v);
            } catch (exn) {
              observer.onError(exn);
              return;
            }

            observer.onNext(result);
          });
        },
        observer.onError.bind(observer),
        function () {
          leftDone = true;
          (rightDone || leftMap.count() === 0) && observer.onCompleted();
        })
      );

      group.add(right.subscribe(
        function (value) {
          var id = rightId++;
          var md = new SingleAssignmentDisposable();

          rightMap.add(id, value);
          group.add(md);

          var expire = function () {
            rightMap.remove(id) && rightMap.count() === 0 && rightDone && observer.onCompleted();
            group.remove(md);
          };

          var duration;
          try {
            duration = rightDurationSelector(value);
          } catch (e) {
            observer.onError(e);
            return;
          }

          md.setDisposable(duration.take(1).subscribe(noop, observer.onError.bind(observer), expire));

          leftMap.getValues().forEach(function (v) {
            var result;
            try {
              result = resultSelector(v, value);
            } catch (exn) {
              observer.onError(exn);
              return;
            }

            observer.onNext(result);
          });
        },
        observer.onError.bind(observer),
        function () {
          rightDone = true;
          (leftDone || rightMap.count() === 0) && observer.onCompleted();
        })
      );
      return group;
    }, left);
  };

  /**
   *  Correlates the elements of two sequences based on overlapping durations, and groups the results.
   *
   *  @param {Observable} right The right observable sequence to join elements for.
   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
   *  @param {Function} resultSelector A function invoked to compute a result element for any element of the left sequence with overlapping elements from the right observable sequence. The first parameter passed to the function is an element of the left sequence. The second parameter passed to the function is an observable sequence with elements from the right sequence that overlap with the left sequence's element.
   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
   */
  observableProto.groupJoin = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
    var left = this;
    return new AnonymousObservable(function (observer) {
      var group = new CompositeDisposable();
      var r = new RefCountDisposable(group);
      var leftMap = new Dictionary(), rightMap = new Dictionary();
      var leftId = 0, rightId = 0;

      function handleError(e) { return function (v) { v.onError(e); }; };

      group.add(left.subscribe(
        function (value) {
          var s = new Subject();
          var id = leftId++;
          leftMap.add(id, s);

          var result;
          try {
            result = resultSelector(value, addRef(s, r));
          } catch (e) {
            leftMap.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }
          observer.onNext(result);

          rightMap.getValues().forEach(function (v) { s.onNext(v); });

          var md = new SingleAssignmentDisposable();
          group.add(md);

          var expire = function () {
            leftMap.remove(id) && s.onCompleted();
            group.remove(md);
          };

          var duration;
          try {
            duration = leftDurationSelector(value);
          } catch (e) {
            leftMap.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }

          md.setDisposable(duration.take(1).subscribe(
            noop,
            function (e) {
              leftMap.getValues().forEach(handleError(e));
              observer.onError(e);
            },
            expire)
          );
        },
        function (e) {
          leftMap.getValues().forEach(handleError(e));
          observer.onError(e);
        },
        observer.onCompleted.bind(observer))
      );

      group.add(right.subscribe(
        function (value) {
          var id = rightId++;
          rightMap.add(id, value);

          var md = new SingleAssignmentDisposable();
          group.add(md);

          var expire = function () {
            rightMap.remove(id);
            group.remove(md);
          };

          var duration;
          try {
            duration = rightDurationSelector(value);
          } catch (e) {
            leftMap.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }
          md.setDisposable(duration.take(1).subscribe(
            noop,
            function (e) {
              leftMap.getValues().forEach(handleError(e));
              observer.onError(e);
            },
            expire)
          );

          leftMap.getValues().forEach(function (v) { v.onNext(value); });
        },
        function (e) {
          leftMap.getValues().forEach(handleError(e));
          observer.onError(e);
        })
      );

      return r;
    }, left);
  };

    /**
     *  Projects each element of an observable sequence into zero or more buffers.
     *
     *  @param {Mixed} bufferOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
     *  @param {Function} [bufferClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
     *  @returns {Observable} An observable sequence of windows.
     */
    observableProto.buffer = function (bufferOpeningsOrClosingSelector, bufferClosingSelector) {
        return this.window.apply(this, arguments).selectMany(function (x) { return x.toArray(); });
    };

  /**
   *  Projects each element of an observable sequence into zero or more windows.
   *
   *  @param {Mixed} windowOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
   *  @param {Function} [windowClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
   *  @returns {Observable} An observable sequence of windows.
   */
  observableProto.window = function (windowOpeningsOrClosingSelector, windowClosingSelector) {
    if (arguments.length === 1 && typeof arguments[0] !== 'function') {
      return observableWindowWithBoundaries.call(this, windowOpeningsOrClosingSelector);
    }
    return typeof windowOpeningsOrClosingSelector === 'function' ?
      observableWindowWithClosingSelector.call(this, windowOpeningsOrClosingSelector) :
      observableWindowWithOpenings.call(this, windowOpeningsOrClosingSelector, windowClosingSelector);
  };

  function observableWindowWithOpenings(windowOpenings, windowClosingSelector) {
    return windowOpenings.groupJoin(this, windowClosingSelector, observableEmpty, function (_, win) {
      return win;
    });
  }

  function observableWindowWithBoundaries(windowBoundaries) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var win = new Subject(),
        d = new CompositeDisposable(),
        r = new RefCountDisposable(d);

      observer.onNext(addRef(win, r));

      d.add(source.subscribe(function (x) {
        win.onNext(x);
      }, function (err) {
        win.onError(err);
        observer.onError(err);
      }, function () {
        win.onCompleted();
        observer.onCompleted();
      }));

      isPromise(windowBoundaries) && (windowBoundaries = observableFromPromise(windowBoundaries));

      d.add(windowBoundaries.subscribe(function (w) {
        win.onCompleted();
        win = new Subject();
        observer.onNext(addRef(win, r));
      }, function (err) {
        win.onError(err);
        observer.onError(err);
      }, function () {
        win.onCompleted();
        observer.onCompleted();
      }));

      return r;
    }, source);
  }

  function observableWindowWithClosingSelector(windowClosingSelector) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var m = new SerialDisposable(),
        d = new CompositeDisposable(m),
        r = new RefCountDisposable(d),
        win = new Subject();
      observer.onNext(addRef(win, r));
      d.add(source.subscribe(function (x) {
          win.onNext(x);
      }, function (err) {
          win.onError(err);
          observer.onError(err);
      }, function () {
          win.onCompleted();
          observer.onCompleted();
      }));

      function createWindowClose () {
        var windowClose;
        try {
          windowClose = windowClosingSelector();
        } catch (e) {
          observer.onError(e);
          return;
        }

        isPromise(windowClose) && (windowClose = observableFromPromise(windowClose));

        var m1 = new SingleAssignmentDisposable();
        m.setDisposable(m1);
        m1.setDisposable(windowClose.take(1).subscribe(noop, function (err) {
          win.onError(err);
          observer.onError(err);
        }, function () {
          win.onCompleted();
          win = new Subject();
          observer.onNext(addRef(win, r));
          createWindowClose();
        }));
      }

      createWindowClose();
      return r;
    }, source);
  }

  /**
   * Returns a new observable that triggers on the second and subsequent triggerings of the input observable.
   * The Nth triggering of the input observable passes the arguments from the N-1th and Nth triggering as a pair.
   * The argument passed to the N-1th triggering is held in hidden internal state until the Nth triggering occurs.
   * @returns {Observable} An observable that triggers on successive pairs of observations from the input observable as an array.
   */
  observableProto.pairwise = function () {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var previous, hasPrevious = false;
      return source.subscribe(
        function (x) {
          if (hasPrevious) {
            observer.onNext([previous, x]);
          } else {
            hasPrevious = true;
          }
          previous = x;
        },
        observer.onError.bind(observer),
        observer.onCompleted.bind(observer));
    }, source);
  };

  /**
   * Returns two observables which partition the observations of the source by the given function.
   * The first will trigger observations for those values for which the predicate returns true.
   * The second will trigger observations for those values where the predicate returns false.
   * The predicate is executed once for each subscribed observer.
   * Both also propagate all error observations arising from the source and each completes
   * when the source completes.
   * @param {Function} predicate
   *    The function to determine which output Observable will trigger a particular observation.
   * @returns {Array}
   *    An array of observables. The first triggers when the predicate returns true,
   *    and the second triggers when the predicate returns false.
  */
  observableProto.partition = function(predicate, thisArg) {
    return [
      this.filter(predicate, thisArg),
      this.filter(function (x, i, o) { return !predicate.call(thisArg, x, i, o); })
    ];
  };

  var WhileEnumerable = (function(__super__) {
    inherits(WhileEnumerable, __super__);
    function WhileEnumerable(c, s) {
      this.c = c;
      this.s = s;
    }
    WhileEnumerable.prototype[$iterator$] = function () {
      var self = this;
      return {
        next: function () {
          return self.c() ?
           { done: false, value: self.s } :
           { done: true, value: void 0 };
        }
      };
    };
    return WhileEnumerable;
  }(Enumerable));
  
  function enumerableWhile(condition, source) {
    return new WhileEnumerable(condition, source);
  }  

   /**
   *  Returns an observable sequence that is the result of invoking the selector on the source sequence, without sharing subscriptions.
   *  This operator allows for a fluent style of writing queries that use the same sequence multiple times.
   *
   * @param {Function} selector Selector function which can use the source sequence as many times as needed, without sharing subscriptions to the source sequence.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.letBind = observableProto['let'] = function (func) {
    return func(this);
  };

   /**
   *  Determines whether an observable collection contains values. There is an alias for this method called 'ifThen' for browsers <IE9
   *
   * @example
   *  1 - res = Rx.Observable.if(condition, obs1);
   *  2 - res = Rx.Observable.if(condition, obs1, obs2);
   *  3 - res = Rx.Observable.if(condition, obs1, scheduler);
   * @param {Function} condition The condition which determines if the thenSource or elseSource will be run.
   * @param {Observable} thenSource The observable sequence or Promise that will be run if the condition function returns true.
   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the condition function returns false. If this is not provided, it defaults to Rx.Observabe.Empty with the specified scheduler.
   * @returns {Observable} An observable sequence which is either the thenSource or elseSource.
   */
  Observable['if'] = Observable.ifThen = function (condition, thenSource, elseSourceOrScheduler) {
    return observableDefer(function () {
      elseSourceOrScheduler || (elseSourceOrScheduler = observableEmpty());

      isPromise(thenSource) && (thenSource = observableFromPromise(thenSource));
      isPromise(elseSourceOrScheduler) && (elseSourceOrScheduler = observableFromPromise(elseSourceOrScheduler));

      // Assume a scheduler for empty only
      typeof elseSourceOrScheduler.now === 'function' && (elseSourceOrScheduler = observableEmpty(elseSourceOrScheduler));
      return condition() ? thenSource : elseSourceOrScheduler;
    });
  };

   /**
   *  Concatenates the observable sequences obtained by running the specified result selector for each element in source.
   * There is an alias for this method called 'forIn' for browsers <IE9
   * @param {Array} sources An array of values to turn into an observable sequence.
   * @param {Function} resultSelector A function to apply to each item in the sources array to turn it into an observable sequence.
   * @returns {Observable} An observable sequence from the concatenated observable sequences.
   */
  Observable['for'] = Observable.forIn = function (sources, resultSelector, thisArg) {
    return enumerableOf(sources, resultSelector, thisArg).concat();
  };

   /**
   *  Repeats source as long as condition holds emulating a while loop.
   * There is an alias for this method called 'whileDo' for browsers <IE9
   *
   * @param {Function} condition The condition which determines if the source will be repeated.
   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
   */
  var observableWhileDo = Observable['while'] = Observable.whileDo = function (condition, source) {
    isPromise(source) && (source = observableFromPromise(source));
    return enumerableWhile(condition, source).concat();
  };

   /**
   *  Repeats source as long as condition holds emulating a do while loop.
   *
   * @param {Function} condition The condition which determines if the source will be repeated.
   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
   */
  observableProto.doWhile = function (condition) {
    return observableConcat([this, observableWhileDo(condition, this)]);
  };

   /**
   *  Uses selector to determine which source in sources to use.
   *  There is an alias 'switchCase' for browsers <IE9.
   *
   * @example
   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 });
   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 }, obs0);
   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 }, scheduler);
   *
   * @param {Function} selector The function which extracts the value for to test in a case statement.
   * @param {Array} sources A object which has keys which correspond to the case statement labels.
   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the sources are not matched. If this is not provided, it defaults to Rx.Observabe.empty with the specified scheduler.
   *
   * @returns {Observable} An observable sequence which is determined by a case statement.
   */
  Observable['case'] = Observable.switchCase = function (selector, sources, defaultSourceOrScheduler) {
    return observableDefer(function () {
      isPromise(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableFromPromise(defaultSourceOrScheduler));
      defaultSourceOrScheduler || (defaultSourceOrScheduler = observableEmpty());

      typeof defaultSourceOrScheduler.now === 'function' && (defaultSourceOrScheduler = observableEmpty(defaultSourceOrScheduler));

      var result = sources[selector()];
      isPromise(result) && (result = observableFromPromise(result));

      return result || defaultSourceOrScheduler;
    });
  };

   /**
   *  Expands an observable sequence by recursively invoking selector.
   *
   * @param {Function} selector Selector function to invoke for each produced element, resulting in another sequence to which the selector will be invoked recursively again.
   * @param {Scheduler} [scheduler] Scheduler on which to perform the expansion. If not provided, this defaults to the current thread scheduler.
   * @returns {Observable} An observable sequence containing all the elements produced by the recursive expansion.
   */
  observableProto.expand = function (selector, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    var source = this;
    return new AnonymousObservable(function (observer) {
      var q = [],
        m = new SerialDisposable(),
        d = new CompositeDisposable(m),
        activeCount = 0,
        isAcquired = false;

      var ensureActive = function () {
        var isOwner = false;
        if (q.length > 0) {
          isOwner = !isAcquired;
          isAcquired = true;
        }
        if (isOwner) {
          m.setDisposable(scheduler.scheduleRecursive(function (self) {
            var work;
            if (q.length > 0) {
              work = q.shift();
            } else {
              isAcquired = false;
              return;
            }
            var m1 = new SingleAssignmentDisposable();
            d.add(m1);
            m1.setDisposable(work.subscribe(function (x) {
              observer.onNext(x);
              var result = null;
              try {
                result = selector(x);
              } catch (e) {
                observer.onError(e);
              }
              q.push(result);
              activeCount++;
              ensureActive();
            }, observer.onError.bind(observer), function () {
              d.remove(m1);
              activeCount--;
              if (activeCount === 0) {
                observer.onCompleted();
              }
            }));
            self();
          }));
        }
      };

      q.push(source);
      activeCount++;
      ensureActive();
      return d;
    }, this);
  };

   /**
   *  Runs all observable sequences in parallel and collect their last elements.
   *
   * @example
   *  1 - res = Rx.Observable.forkJoin([obs1, obs2]);
   *  1 - res = Rx.Observable.forkJoin(obs1, obs2, ...);
   * @returns {Observable} An observable sequence with an array collecting the last elements of all the input sequences.
   */
  Observable.forkJoin = function () {
    var allSources = [];
    if (Array.isArray(arguments[0])) {
      allSources = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { allSources.push(arguments[i]); }
    }
    return new AnonymousObservable(function (subscriber) {
      var count = allSources.length;
      if (count === 0) {
        subscriber.onCompleted();
        return disposableEmpty;
      }
      var group = new CompositeDisposable(),
        finished = false,
        hasResults = new Array(count),
        hasCompleted = new Array(count),
        results = new Array(count);

      for (var idx = 0; idx < count; idx++) {
        (function (i) {
          var source = allSources[i];
          isPromise(source) && (source = observableFromPromise(source));
          group.add(
            source.subscribe(
              function (value) {
              if (!finished) {
                hasResults[i] = true;
                results[i] = value;
              }
            },
            function (e) {
              finished = true;
              subscriber.onError(e);
              group.dispose();
            },
            function () {
              if (!finished) {
                if (!hasResults[i]) {
                    subscriber.onCompleted();
                    return;
                }
                hasCompleted[i] = true;
                for (var ix = 0; ix < count; ix++) {
                  if (!hasCompleted[ix]) { return; }
                }
                finished = true;
                subscriber.onNext(results);
                subscriber.onCompleted();
              }
            }));
        })(idx);
      }

      return group;
    });
  };

   /**
   *  Runs two observable sequences in parallel and combines their last elemenets.
   *
   * @param {Observable} second Second observable sequence.
   * @param {Function} resultSelector Result selector function to invoke with the last elements of both sequences.
   * @returns {Observable} An observable sequence with the result of calling the selector function with the last elements of both input sequences.
   */
  observableProto.forkJoin = function (second, resultSelector) {
    var first = this;
    return new AnonymousObservable(function (observer) {
      var leftStopped = false, rightStopped = false,
        hasLeft = false, hasRight = false,
        lastLeft, lastRight,
        leftSubscription = new SingleAssignmentDisposable(), rightSubscription = new SingleAssignmentDisposable();

      isPromise(second) && (second = observableFromPromise(second));

      leftSubscription.setDisposable(
          first.subscribe(function (left) {
            hasLeft = true;
            lastLeft = left;
          }, function (err) {
            rightSubscription.dispose();
            observer.onError(err);
          }, function () {
            leftStopped = true;
            if (rightStopped) {
              if (!hasLeft) {
                  observer.onCompleted();
              } else if (!hasRight) {
                  observer.onCompleted();
              } else {
                var result;
                try {
                  result = resultSelector(lastLeft, lastRight);
                } catch (e) {
                  observer.onError(e);
                  return;
                }
                observer.onNext(result);
                observer.onCompleted();
              }
            }
          })
      );

      rightSubscription.setDisposable(
        second.subscribe(function (right) {
          hasRight = true;
          lastRight = right;
        }, function (err) {
          leftSubscription.dispose();
          observer.onError(err);
        }, function () {
          rightStopped = true;
          if (leftStopped) {
            if (!hasLeft) {
              observer.onCompleted();
            } else if (!hasRight) {
              observer.onCompleted();
            } else {
              var result;
              try {
                result = resultSelector(lastLeft, lastRight);
              } catch (e) {
                observer.onError(e);
                return;
              }
              observer.onNext(result);
              observer.onCompleted();
            }
          }
        })
      );

      return new CompositeDisposable(leftSubscription, rightSubscription);
    }, first);
  };

  /**
   * Comonadic bind operator.
   * @param {Function} selector A transform function to apply to each element.
   * @param {Object} scheduler Scheduler used to execute the operation. If not specified, defaults to the ImmediateScheduler.
   * @returns {Observable} An observable sequence which results from the comonadic bind operation.
   */
  observableProto.manySelect = observableProto.extend = function (selector, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    var source = this;
    return observableDefer(function () {
      var chain;

      return source
        .map(function (x) {
          var curr = new ChainObservable(x);

          chain && chain.onNext(x);
          chain = curr;

          return curr;
        })
        .tap(
          noop,
          function (e) { chain && chain.onError(e); },
          function () { chain && chain.onCompleted(); }
        )
        .observeOn(scheduler)
        .map(selector);
    }, source);
  };

  var ChainObservable = (function (__super__) {

    function subscribe (observer) {
      var self = this, g = new CompositeDisposable();
      g.add(currentThreadScheduler.schedule(function () {
        observer.onNext(self.head);
        g.add(self.tail.mergeAll().subscribe(observer));
      }));

      return g;
    }

    inherits(ChainObservable, __super__);

    function ChainObservable(head) {
      __super__.call(this, subscribe);
      this.head = head;
      this.tail = new AsyncSubject();
    }

    addProperties(ChainObservable.prototype, Observer, {
      onCompleted: function () {
        this.onNext(Observable.empty());
      },
      onError: function (e) {
        this.onNext(Observable.throwError(e));
      },
      onNext: function (v) {
        this.tail.onNext(v);
        this.tail.onCompleted();
      }
    });

    return ChainObservable;

  }(Observable));

  /** @private */
  var Map = root.Map || (function () {

    function Map() {
      this._keys = [];
      this._values = [];
    }

    Map.prototype.get = function (key) {
      var i = this._keys.indexOf(key);
      return i !== -1 ? this._values[i] : undefined;
    };

    Map.prototype.set = function (key, value) {
      var i = this._keys.indexOf(key);
      i !== -1 && (this._values[i] = value);
      this._values[this._keys.push(key) - 1] = value;
    };

    Map.prototype.forEach = function (callback, thisArg) {
      for (var i = 0, len = this._keys.length; i < len; i++) {
        callback.call(thisArg, this._values[i], this._keys[i]);
      }
    };

    return Map;
  }());

  /**
   * @constructor
   * Represents a join pattern over observable sequences.
   */
  function Pattern(patterns) {
    this.patterns = patterns;
  }

  /**
   *  Creates a pattern that matches the current plan matches and when the specified observable sequences has an available value.
   *  @param other Observable sequence to match in addition to the current pattern.
   *  @return {Pattern} Pattern object that matches when all observable sequences in the pattern have an available value.
   */
  Pattern.prototype.and = function (other) {
    return new Pattern(this.patterns.concat(other));
  };

  /**
   *  Matches when all observable sequences in the pattern (specified using a chain of and operators) have an available value and projects the values.
   *  @param {Function} selector Selector that will be invoked with available values from the source sequences, in the same order of the sequences in the pattern.
   *  @return {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
   */
  Pattern.prototype.thenDo = function (selector) {
    return new Plan(this, selector);
  };

  function Plan(expression, selector) {
      this.expression = expression;
      this.selector = selector;
  }

  Plan.prototype.activate = function (externalSubscriptions, observer, deactivate) {
    var self = this;
    var joinObservers = [];
    for (var i = 0, len = this.expression.patterns.length; i < len; i++) {
      joinObservers.push(planCreateObserver(externalSubscriptions, this.expression.patterns[i], observer.onError.bind(observer)));
    }
    var activePlan = new ActivePlan(joinObservers, function () {
      var result;
      try {
        result = self.selector.apply(self, arguments);
      } catch (e) {
        observer.onError(e);
        return;
      }
      observer.onNext(result);
    }, function () {
      for (var j = 0, jlen = joinObservers.length; j < jlen; j++) {
        joinObservers[j].removeActivePlan(activePlan);
      }
      deactivate(activePlan);
    });
    for (i = 0, len = joinObservers.length; i < len; i++) {
      joinObservers[i].addActivePlan(activePlan);
    }
    return activePlan;
  };

  function planCreateObserver(externalSubscriptions, observable, onError) {
    var entry = externalSubscriptions.get(observable);
    if (!entry) {
      var observer = new JoinObserver(observable, onError);
      externalSubscriptions.set(observable, observer);
      return observer;
    }
    return entry;
  }

  function ActivePlan(joinObserverArray, onNext, onCompleted) {
    this.joinObserverArray = joinObserverArray;
    this.onNext = onNext;
    this.onCompleted = onCompleted;
    this.joinObservers = new Map();
    for (var i = 0, len = this.joinObserverArray.length; i < len; i++) {
      var joinObserver = this.joinObserverArray[i];
      this.joinObservers.set(joinObserver, joinObserver);
    }
  }

  ActivePlan.prototype.dequeue = function () {
    this.joinObservers.forEach(function (v) { v.queue.shift(); });
  };

  ActivePlan.prototype.match = function () {
    var i, len, hasValues = true;
    for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
      if (this.joinObserverArray[i].queue.length === 0) {
        hasValues = false;
        break;
      }
    }
    if (hasValues) {
      var firstValues = [],
          isCompleted = false;
      for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
        firstValues.push(this.joinObserverArray[i].queue[0]);
        this.joinObserverArray[i].queue[0].kind === 'C' && (isCompleted = true);
      }
      if (isCompleted) {
        this.onCompleted();
      } else {
        this.dequeue();
        var values = [];
        for (i = 0, len = firstValues.length; i < firstValues.length; i++) {
          values.push(firstValues[i].value);
        }
        this.onNext.apply(this, values);
      }
    }
  };

  var JoinObserver = (function (__super__) {
    inherits(JoinObserver, __super__);

    function JoinObserver(source, onError) {
      __super__.call(this);
      this.source = source;
      this.onError = onError;
      this.queue = [];
      this.activePlans = [];
      this.subscription = new SingleAssignmentDisposable();
      this.isDisposed = false;
    }

    var JoinObserverPrototype = JoinObserver.prototype;

    JoinObserverPrototype.next = function (notification) {
      if (!this.isDisposed) {
        if (notification.kind === 'E') {
          return this.onError(notification.exception);
        }
        this.queue.push(notification);
        var activePlans = this.activePlans.slice(0);
        for (var i = 0, len = activePlans.length; i < len; i++) {
          activePlans[i].match();
        }
      }
    };

    JoinObserverPrototype.error = noop;
    JoinObserverPrototype.completed = noop;

    JoinObserverPrototype.addActivePlan = function (activePlan) {
      this.activePlans.push(activePlan);
    };

    JoinObserverPrototype.subscribe = function () {
      this.subscription.setDisposable(this.source.materialize().subscribe(this));
    };

    JoinObserverPrototype.removeActivePlan = function (activePlan) {
      this.activePlans.splice(this.activePlans.indexOf(activePlan), 1);
      this.activePlans.length === 0 && this.dispose();
    };

    JoinObserverPrototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      if (!this.isDisposed) {
        this.isDisposed = true;
        this.subscription.dispose();
      }
    };

    return JoinObserver;
  } (AbstractObserver));

  /**
   *  Creates a pattern that matches when both observable sequences have an available value.
   *
   *  @param right Observable sequence to match with the current sequence.
   *  @return {Pattern} Pattern object that matches when both observable sequences have an available value.
   */
  observableProto.and = function (right) {
    return new Pattern([this, right]);
  };

  /**
   *  Matches when the observable sequence has an available value and projects the value.
   *
   *  @param {Function} selector Selector that will be invoked for values in the source sequence.
   *  @returns {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
   */
  observableProto.thenDo = function (selector) {
    return new Pattern([this]).thenDo(selector);
  };

  /**
   *  Joins together the results from several patterns.
   *
   *  @param plans A series of plans (specified as an Array of as a series of arguments) created by use of the Then operator on patterns.
   *  @returns {Observable} Observable sequence with the results form matching several patterns.
   */
  Observable.when = function () {
    var len = arguments.length, plans;
    if (Array.isArray(arguments[0])) {
      plans = arguments[0];
    } else {
      plans = new Array(len);
      for(var i = 0; i < len; i++) { plans[i] = arguments[i]; }
    }
    return new AnonymousObservable(function (o) {
      var activePlans = [],
          externalSubscriptions = new Map();
      var outObserver = observerCreate(
        function (x) { o.onNext(x); },
        function (err) {
          externalSubscriptions.forEach(function (v) { v.onError(err); });
          o.onError(err);
        },
        function (x) { o.onCompleted(); }
      );
      try {
        for (var i = 0, len = plans.length; i < len; i++) {
          activePlans.push(plans[i].activate(externalSubscriptions, outObserver, function (activePlan) {
            var idx = activePlans.indexOf(activePlan);
            activePlans.splice(idx, 1);
            activePlans.length === 0 && o.onCompleted();
          }));
        }
      } catch (e) {
        observableThrow(e).subscribe(o);
      }
      var group = new CompositeDisposable();
      externalSubscriptions.forEach(function (joinObserver) {
        joinObserver.subscribe();
        group.add(joinObserver);
      });

      return group;
    });
  };

  function observableTimerDate(dueTime, scheduler) {
    return new AnonymousObservable(function (observer) {
      return scheduler.scheduleWithAbsolute(dueTime, function () {
        observer.onNext(0);
        observer.onCompleted();
      });
    });
  }

  function observableTimerDateAndPeriod(dueTime, period, scheduler) {
    return new AnonymousObservable(function (observer) {
      var d = dueTime, p = normalizeTime(period);
      return scheduler.scheduleRecursiveWithAbsoluteAndState(0, d, function (count, self) {
        if (p > 0) {
          var now = scheduler.now();
          d = d + p;
          d <= now && (d = now + p);
        }
        observer.onNext(count);
        self(count + 1, d);
      });
    });
  }

  function observableTimerTimeSpan(dueTime, scheduler) {
    return new AnonymousObservable(function (observer) {
      return scheduler.scheduleWithRelative(normalizeTime(dueTime), function () {
        observer.onNext(0);
        observer.onCompleted();
      });
    });
  }

  function observableTimerTimeSpanAndPeriod(dueTime, period, scheduler) {
    return dueTime === period ?
      new AnonymousObservable(function (observer) {
        return scheduler.schedulePeriodicWithState(0, period, function (count) {
          observer.onNext(count);
          return count + 1;
        });
      }) :
      observableDefer(function () {
        return observableTimerDateAndPeriod(scheduler.now() + dueTime, period, scheduler);
      });
  }

  /**
   *  Returns an observable sequence that produces a value after each period.
   *
   * @example
   *  1 - res = Rx.Observable.interval(1000);
   *  2 - res = Rx.Observable.interval(1000, Rx.Scheduler.timeout);
   *
   * @param {Number} period Period for producing the values in the resulting sequence (specified as an integer denoting milliseconds).
   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, Rx.Scheduler.timeout is used.
   * @returns {Observable} An observable sequence that produces a value after each period.
   */
  var observableinterval = Observable.interval = function (period, scheduler) {
    return observableTimerTimeSpanAndPeriod(period, period, isScheduler(scheduler) ? scheduler : timeoutScheduler);
  };

  /**
   *  Returns an observable sequence that produces a value after dueTime has elapsed and then after each period.
   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) at which to produce the first value.
   * @param {Mixed} [periodOrScheduler]  Period to produce subsequent values (specified as an integer denoting milliseconds), or the scheduler to run the timer on. If not specified, the resulting timer is not recurring.
   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, the timeout scheduler is used.
   * @returns {Observable} An observable sequence that produces a value after due time has elapsed and then each period.
   */
  var observableTimer = Observable.timer = function (dueTime, periodOrScheduler, scheduler) {
    var period;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    if (periodOrScheduler !== undefined && typeof periodOrScheduler === 'number') {
      period = periodOrScheduler;
    } else if (isScheduler(periodOrScheduler)) {
      scheduler = periodOrScheduler;
    }
    if (dueTime instanceof Date && period === undefined) {
      return observableTimerDate(dueTime.getTime(), scheduler);
    }
    if (dueTime instanceof Date && period !== undefined) {
      period = periodOrScheduler;
      return observableTimerDateAndPeriod(dueTime.getTime(), period, scheduler);
    }
    return period === undefined ?
      observableTimerTimeSpan(dueTime, scheduler) :
      observableTimerTimeSpanAndPeriod(dueTime, period, scheduler);
  };

  function observableDelayTimeSpan(source, dueTime, scheduler) {
    return new AnonymousObservable(function (observer) {
      var active = false,
        cancelable = new SerialDisposable(),
        exception = null,
        q = [],
        running = false,
        subscription;
      subscription = source.materialize().timestamp(scheduler).subscribe(function (notification) {
        var d, shouldRun;
        if (notification.value.kind === 'E') {
          q = [];
          q.push(notification);
          exception = notification.value.exception;
          shouldRun = !running;
        } else {
          q.push({ value: notification.value, timestamp: notification.timestamp + dueTime });
          shouldRun = !active;
          active = true;
        }
        if (shouldRun) {
          if (exception !== null) {
            observer.onError(exception);
          } else {
            d = new SingleAssignmentDisposable();
            cancelable.setDisposable(d);
            d.setDisposable(scheduler.scheduleRecursiveWithRelative(dueTime, function (self) {
              var e, recurseDueTime, result, shouldRecurse;
              if (exception !== null) {
                return;
              }
              running = true;
              do {
                result = null;
                if (q.length > 0 && q[0].timestamp - scheduler.now() <= 0) {
                  result = q.shift().value;
                }
                if (result !== null) {
                  result.accept(observer);
                }
              } while (result !== null);
              shouldRecurse = false;
              recurseDueTime = 0;
              if (q.length > 0) {
                shouldRecurse = true;
                recurseDueTime = Math.max(0, q[0].timestamp - scheduler.now());
              } else {
                active = false;
              }
              e = exception;
              running = false;
              if (e !== null) {
                observer.onError(e);
              } else if (shouldRecurse) {
                self(recurseDueTime);
              }
            }));
          }
        }
      });
      return new CompositeDisposable(subscription, cancelable);
    }, source);
  }

  function observableDelayDate(source, dueTime, scheduler) {
    return observableDefer(function () {
      return observableDelayTimeSpan(source, dueTime - scheduler.now(), scheduler);
    });
  }

  /**
   *  Time shifts the observable sequence by dueTime. The relative time intervals between the values are preserved.
   *
   * @example
   *  1 - res = Rx.Observable.delay(new Date());
   *  2 - res = Rx.Observable.delay(new Date(), Rx.Scheduler.timeout);
   *
   *  3 - res = Rx.Observable.delay(5000);
   *  4 - res = Rx.Observable.delay(5000, 1000, Rx.Scheduler.timeout);
   * @memberOf Observable#
   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) by which to shift the observable sequence.
   * @param {Scheduler} [scheduler] Scheduler to run the delay timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} Time-shifted sequence.
   */
  observableProto.delay = function (dueTime, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return dueTime instanceof Date ?
      observableDelayDate(this, dueTime.getTime(), scheduler) :
      observableDelayTimeSpan(this, dueTime, scheduler);
  };

  /**
   *  Ignores values from an observable sequence which are followed by another value before dueTime.
   * @param {Number} dueTime Duration of the debounce period for each value (specified as an integer denoting milliseconds).
   * @param {Scheduler} [scheduler]  Scheduler to run the debounce timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} The debounced sequence.
   */
  observableProto.debounce = observableProto.throttleWithTimeout = function (dueTime, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var source = this;
    return new AnonymousObservable(function (observer) {
      var cancelable = new SerialDisposable(), hasvalue = false, value, id = 0;
      var subscription = source.subscribe(
        function (x) {
          hasvalue = true;
          value = x;
          id++;
          var currentId = id,
            d = new SingleAssignmentDisposable();
          cancelable.setDisposable(d);
          d.setDisposable(scheduler.scheduleWithRelative(dueTime, function () {
            hasvalue && id === currentId && observer.onNext(value);
            hasvalue = false;
          }));
        },
        function (e) {
          cancelable.dispose();
          observer.onError(e);
          hasvalue = false;
          id++;
        },
        function () {
          cancelable.dispose();
          hasvalue && observer.onNext(value);
          observer.onCompleted();
          hasvalue = false;
          id++;
        });
      return new CompositeDisposable(subscription, cancelable);
    }, this);
  };

  /**
   * @deprecated use #debounce or #throttleWithTimeout instead.
   */
  observableProto.throttle = function(dueTime, scheduler) {
    //deprecate('throttle', 'debounce or throttleWithTimeout');
    return this.debounce(dueTime, scheduler);
  };

  /**
   *  Projects each element of an observable sequence into zero or more windows which are produced based on timing information.
   * @param {Number} timeSpan Length of each window (specified as an integer denoting milliseconds).
   * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive windows (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent windows.
   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} An observable sequence of windows.
   */
  observableProto.windowWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
    var source = this, timeShift;
    timeShiftOrScheduler == null && (timeShift = timeSpan);
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    if (typeof timeShiftOrScheduler === 'number') {
      timeShift = timeShiftOrScheduler;
    } else if (isScheduler(timeShiftOrScheduler)) {
      timeShift = timeSpan;
      scheduler = timeShiftOrScheduler;
    }
    return new AnonymousObservable(function (observer) {
      var groupDisposable,
        nextShift = timeShift,
        nextSpan = timeSpan,
        q = [],
        refCountDisposable,
        timerD = new SerialDisposable(),
        totalTime = 0;
        groupDisposable = new CompositeDisposable(timerD),
        refCountDisposable = new RefCountDisposable(groupDisposable);

       function createTimer () {
        var m = new SingleAssignmentDisposable(),
          isSpan = false,
          isShift = false;
        timerD.setDisposable(m);
        if (nextSpan === nextShift) {
          isSpan = true;
          isShift = true;
        } else if (nextSpan < nextShift) {
            isSpan = true;
        } else {
          isShift = true;
        }
        var newTotalTime = isSpan ? nextSpan : nextShift,
          ts = newTotalTime - totalTime;
        totalTime = newTotalTime;
        if (isSpan) {
          nextSpan += timeShift;
        }
        if (isShift) {
          nextShift += timeShift;
        }
        m.setDisposable(scheduler.scheduleWithRelative(ts, function () {
          if (isShift) {
            var s = new Subject();
            q.push(s);
            observer.onNext(addRef(s, refCountDisposable));
          }
          isSpan && q.shift().onCompleted();
          createTimer();
        }));
      };
      q.push(new Subject());
      observer.onNext(addRef(q[0], refCountDisposable));
      createTimer();
      groupDisposable.add(source.subscribe(
        function (x) {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
        },
        function (e) {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onError(e); }
          observer.onError(e);
        },
        function () {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onCompleted(); }
          observer.onCompleted();
        }
      ));
      return refCountDisposable;
    }, source);
  };

  /**
   *  Projects each element of an observable sequence into a window that is completed when either it's full or a given amount of time has elapsed.
   * @param {Number} timeSpan Maximum time length of a window.
   * @param {Number} count Maximum element count of a window.
   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} An observable sequence of windows.
   */
  observableProto.windowWithTimeOrCount = function (timeSpan, count, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (observer) {
      var timerD = new SerialDisposable(),
          groupDisposable = new CompositeDisposable(timerD),
          refCountDisposable = new RefCountDisposable(groupDisposable),
          n = 0,
          windowId = 0,
          s = new Subject();

      function createTimer(id) {
        var m = new SingleAssignmentDisposable();
        timerD.setDisposable(m);
        m.setDisposable(scheduler.scheduleWithRelative(timeSpan, function () {
          if (id !== windowId) { return; }
          n = 0;
          var newId = ++windowId;
          s.onCompleted();
          s = new Subject();
          observer.onNext(addRef(s, refCountDisposable));
          createTimer(newId);
        }));
      }

      observer.onNext(addRef(s, refCountDisposable));
      createTimer(0);

      groupDisposable.add(source.subscribe(
        function (x) {
          var newId = 0, newWindow = false;
          s.onNext(x);
          if (++n === count) {
            newWindow = true;
            n = 0;
            newId = ++windowId;
            s.onCompleted();
            s = new Subject();
            observer.onNext(addRef(s, refCountDisposable));
          }
          newWindow && createTimer(newId);
        },
        function (e) {
          s.onError(e);
          observer.onError(e);
        }, function () {
          s.onCompleted();
          observer.onCompleted();
        }
      ));
      return refCountDisposable;
    }, source);
  };

    /**
     *  Projects each element of an observable sequence into zero or more buffers which are produced based on timing information.
     *
     * @example
     *  1 - res = xs.bufferWithTime(1000, scheduler); // non-overlapping segments of 1 second
     *  2 - res = xs.bufferWithTime(1000, 500, scheduler; // segments of 1 second with time shift 0.5 seconds
     *
     * @param {Number} timeSpan Length of each buffer (specified as an integer denoting milliseconds).
     * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive buffers (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent buffers.
     * @param {Scheduler} [scheduler]  Scheduler to run buffer timers on. If not specified, the timeout scheduler is used.
     * @returns {Observable} An observable sequence of buffers.
     */
    observableProto.bufferWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
        return this.windowWithTime.apply(this, arguments).selectMany(function (x) { return x.toArray(); });
    };

    /**
     *  Projects each element of an observable sequence into a buffer that is completed when either it's full or a given amount of time has elapsed.
     *
     * @example
     *  1 - res = source.bufferWithTimeOrCount(5000, 50); // 5s or 50 items in an array
     *  2 - res = source.bufferWithTimeOrCount(5000, 50, scheduler); // 5s or 50 items in an array
     *
     * @param {Number} timeSpan Maximum time length of a buffer.
     * @param {Number} count Maximum element count of a buffer.
     * @param {Scheduler} [scheduler]  Scheduler to run bufferin timers on. If not specified, the timeout scheduler is used.
     * @returns {Observable} An observable sequence of buffers.
     */
    observableProto.bufferWithTimeOrCount = function (timeSpan, count, scheduler) {
        return this.windowWithTimeOrCount(timeSpan, count, scheduler).selectMany(function (x) {
            return x.toArray();
        });
    };

  /**
   *  Records the time interval between consecutive values in an observable sequence.
   *
   * @example
   *  1 - res = source.timeInterval();
   *  2 - res = source.timeInterval(Rx.Scheduler.timeout);
   *
   * @param [scheduler]  Scheduler used to compute time intervals. If not specified, the timeout scheduler is used.
   * @returns {Observable} An observable sequence with time interval information on values.
   */
  observableProto.timeInterval = function (scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return observableDefer(function () {
      var last = scheduler.now();
      return source.map(function (x) {
        var now = scheduler.now(), span = now - last;
        last = now;
        return { value: x, interval: span };
      });
    });
  };

  /**
   *  Records the timestamp for each value in an observable sequence.
   *
   * @example
   *  1 - res = source.timestamp(); // produces { value: x, timestamp: ts }
   *  2 - res = source.timestamp(Rx.Scheduler.default);
   *
   * @param {Scheduler} [scheduler]  Scheduler used to compute timestamps. If not specified, the default scheduler is used.
   * @returns {Observable} An observable sequence with timestamp information on values.
   */
  observableProto.timestamp = function (scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return this.map(function (x) {
      return { value: x, timestamp: scheduler.now() };
    });
  };

  function sampleObservable(source, sampler) {
    return new AnonymousObservable(function (o) {
      var atEnd = false, value, hasValue = false;

      function sampleSubscribe() {
        if (hasValue) {
          hasValue = false;
          o.onNext(value);
        }
        atEnd && o.onCompleted();
      }

      var sourceSubscription = new SingleAssignmentDisposable();
      sourceSubscription.setDisposable(source.subscribe(
        function (newValue) {
          hasValue = true;
          value = newValue;
        },
        function (e) { o.onError(e); },
        function () {
          atEnd = true;
          sourceSubscription.dispose(); 
        }
      ));

      return new CompositeDisposable(
        sourceSubscription,
        sampler.subscribe(sampleSubscribe, function (e) { o.onError(e); }, sampleSubscribe)
      );
    }, source);
  }

  /**
   *  Samples the observable sequence at each interval.
   *
   * @example
   *  1 - res = source.sample(sampleObservable); // Sampler tick sequence
   *  2 - res = source.sample(5000); // 5 seconds
   *  2 - res = source.sample(5000, Rx.Scheduler.timeout); // 5 seconds
   *
   * @param {Mixed} intervalOrSampler Interval at which to sample (specified as an integer denoting milliseconds) or Sampler Observable.
   * @param {Scheduler} [scheduler]  Scheduler to run the sampling timer on. If not specified, the timeout scheduler is used.
   * @returns {Observable} Sampled observable sequence.
   */
  observableProto.sample = observableProto.throttleLatest = function (intervalOrSampler, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return typeof intervalOrSampler === 'number' ?
      sampleObservable(this, observableinterval(intervalOrSampler, scheduler)) :
      sampleObservable(this, intervalOrSampler);
  };

  /**
   *  Returns the source observable sequence or the other observable sequence if dueTime elapses.
   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) when a timeout occurs.
   * @param {Observable} [other]  Sequence to return in case of a timeout. If not specified, a timeout error throwing sequence will be used.
   * @param {Scheduler} [scheduler]  Scheduler to run the timeout timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} The source sequence switching to the other sequence in case of a timeout.
   */
  observableProto.timeout = function (dueTime, other, scheduler) {
    (other == null || typeof other === 'string') && (other = observableThrow(new Error(other || 'Timeout')));
    isScheduler(scheduler) || (scheduler = timeoutScheduler);

    var source = this, schedulerMethod = dueTime instanceof Date ?
      'scheduleWithAbsolute' :
      'scheduleWithRelative';

    return new AnonymousObservable(function (observer) {
      var id = 0,
        original = new SingleAssignmentDisposable(),
        subscription = new SerialDisposable(),
        switched = false,
        timer = new SerialDisposable();

      subscription.setDisposable(original);

      function createTimer() {
        var myId = id;
        timer.setDisposable(scheduler[schedulerMethod](dueTime, function () {
          if (id === myId) {
            isPromise(other) && (other = observableFromPromise(other));
            subscription.setDisposable(other.subscribe(observer));
          }
        }));
      }

      createTimer();

      original.setDisposable(source.subscribe(function (x) {
        if (!switched) {
          id++;
          observer.onNext(x);
          createTimer();
        }
      }, function (e) {
        if (!switched) {
          id++;
          observer.onError(e);
        }
      }, function () {
        if (!switched) {
          id++;
          observer.onCompleted();
        }
      }));
      return new CompositeDisposable(subscription, timer);
    }, source);
  };

  /**
   *  Generates an observable sequence by iterating a state from an initial state until the condition fails.
   *
   * @example
   *  res = source.generateWithAbsoluteTime(0,
   *      function (x) { return return true; },
   *      function (x) { return x + 1; },
   *      function (x) { return x; },
   *      function (x) { return new Date(); }
   *  });
   *
   * @param {Mixed} initialState Initial state.
   * @param {Function} condition Condition to terminate generation (upon returning false).
   * @param {Function} iterate Iteration step function.
   * @param {Function} resultSelector Selector function for results produced in the sequence.
   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning Date values.
   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
   * @returns {Observable} The generated sequence.
   */
  Observable.generateWithAbsoluteTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (observer) {
      var first = true,
        hasResult = false;
      return scheduler.scheduleRecursiveWithAbsoluteAndState(initialState, scheduler.now(), function (state, self) {
        hasResult && observer.onNext(state);

        try {
          if (first) {
            first = false;
          } else {
            state = iterate(state);
          }
          hasResult = condition(state);
          if (hasResult) {
            var result = resultSelector(state);
            var time = timeSelector(state);
          }
        } catch (e) {
          observer.onError(e);
          return;
        }
        if (hasResult) {
          self(result, time);
        } else {
          observer.onCompleted();
        }
      });
    });
  };

  /**
   *  Generates an observable sequence by iterating a state from an initial state until the condition fails.
   *
   * @example
   *  res = source.generateWithRelativeTime(0,
   *      function (x) { return return true; },
   *      function (x) { return x + 1; },
   *      function (x) { return x; },
   *      function (x) { return 500; }
   *  );
   *
   * @param {Mixed} initialState Initial state.
   * @param {Function} condition Condition to terminate generation (upon returning false).
   * @param {Function} iterate Iteration step function.
   * @param {Function} resultSelector Selector function for results produced in the sequence.
   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning integer values denoting milliseconds.
   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
   * @returns {Observable} The generated sequence.
   */
  Observable.generateWithRelativeTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (observer) {
      var first = true,
        hasResult = false;
      return scheduler.scheduleRecursiveWithRelativeAndState(initialState, 0, function (state, self) {
        hasResult && observer.onNext(state);

        try {
          if (first) {
            first = false;
          } else {
            state = iterate(state);
          }
          hasResult = condition(state);
          if (hasResult) {
            var result = resultSelector(state);
            var time = timeSelector(state);
          }
        } catch (e) {
          observer.onError(e);
          return;
        }
        if (hasResult) {
          self(result, time);
        } else {
          observer.onCompleted();
        }
      });
    });
  };

  /**
   *  Time shifts the observable sequence by delaying the subscription with the specified relative time duration, using the specified scheduler to run timers.
   *
   * @example
   *  1 - res = source.delaySubscription(5000); // 5s
   *  2 - res = source.delaySubscription(5000, Rx.Scheduler.default); // 5 seconds
   *
   * @param {Number} dueTime Relative or absolute time shift of the subscription.
   * @param {Scheduler} [scheduler]  Scheduler to run the subscription delay timer on. If not specified, the timeout scheduler is used.
   * @returns {Observable} Time-shifted sequence.
   */
  observableProto.delaySubscription = function (dueTime, scheduler) {
    var scheduleMethod = dueTime instanceof Date ? 'scheduleWithAbsolute' : 'scheduleWithRelative';
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (o) {
      var d = new SerialDisposable();

      d.setDisposable(scheduler[scheduleMethod](dueTime, function() {
        d.setDisposable(source.subscribe(o));
      }));

      return d;
    }, this);
  };

  /**
   *  Time shifts the observable sequence based on a subscription delay and a delay selector function for each element.
   *
   * @example
   *  1 - res = source.delayWithSelector(function (x) { return Rx.Scheduler.timer(5000); }); // with selector only
   *  1 - res = source.delayWithSelector(Rx.Observable.timer(2000), function (x) { return Rx.Observable.timer(x); }); // with delay and selector
   *
   * @param {Observable} [subscriptionDelay]  Sequence indicating the delay for the subscription to the source.
   * @param {Function} delayDurationSelector Selector function to retrieve a sequence indicating the delay for each given element.
   * @returns {Observable} Time-shifted sequence.
   */
  observableProto.delayWithSelector = function (subscriptionDelay, delayDurationSelector) {
    var source = this, subDelay, selector;
    if (isFunction(subscriptionDelay)) {
      selector = subscriptionDelay;
    } else {
      subDelay = subscriptionDelay;
      selector = delayDurationSelector;
    }
    return new AnonymousObservable(function (observer) {
      var delays = new CompositeDisposable(), atEnd = false, subscription = new SerialDisposable();

      function start() {
        subscription.setDisposable(source.subscribe(
          function (x) {
            var delay = tryCatch(selector)(x);
            if (delay === errorObj) { return observer.onError(delay.e); }
            var d = new SingleAssignmentDisposable();
            delays.add(d);
            d.setDisposable(delay.subscribe(
              function () {
                observer.onNext(x);
                delays.remove(d);
                done();
              },
              function (e) { observer.onError(e); },
              function () {
                observer.onNext(x);
                delays.remove(d);
                done();
              }
            ))
          },
          function (e) { observer.onError(e); },
          function () {
            atEnd = true;
            subscription.dispose();
            done();
          }
        ))
      }

      function done () {
        atEnd && delays.length === 0 && observer.onCompleted();
      }

      if (!subDelay) {
        start();
      } else {
        subscription.setDisposable(subDelay.subscribe(start, function (e) { observer.onError(e); }, start));
      }

      return new CompositeDisposable(subscription, delays);
    }, this);
  };

    /**
     *  Returns the source observable sequence, switching to the other observable sequence if a timeout is signaled.
     * @param {Observable} [firstTimeout]  Observable sequence that represents the timeout for the first element. If not provided, this defaults to Observable.never().
     * @param {Function} timeoutDurationSelector Selector to retrieve an observable sequence that represents the timeout between the current element and the next element.
     * @param {Observable} [other]  Sequence to return in case of a timeout. If not provided, this is set to Observable.throwException().
     * @returns {Observable} The source sequence switching to the other sequence in case of a timeout.
     */
    observableProto.timeoutWithSelector = function (firstTimeout, timeoutdurationSelector, other) {
      if (arguments.length === 1) {
          timeoutdurationSelector = firstTimeout;
          firstTimeout = observableNever();
      }
      other || (other = observableThrow(new Error('Timeout')));
      var source = this;
      return new AnonymousObservable(function (observer) {
        var subscription = new SerialDisposable(), timer = new SerialDisposable(), original = new SingleAssignmentDisposable();

        subscription.setDisposable(original);

        var id = 0, switched = false;

        function setTimer(timeout) {
          var myId = id;

          function timerWins () {
            return id === myId;
          }

          var d = new SingleAssignmentDisposable();
          timer.setDisposable(d);
          d.setDisposable(timeout.subscribe(function () {
            timerWins() && subscription.setDisposable(other.subscribe(observer));
            d.dispose();
          }, function (e) {
            timerWins() && observer.onError(e);
          }, function () {
            timerWins() && subscription.setDisposable(other.subscribe(observer));
          }));
        };

        setTimer(firstTimeout);

        function observerWins() {
          var res = !switched;
          if (res) { id++; }
          return res;
        }

        original.setDisposable(source.subscribe(function (x) {
          if (observerWins()) {
            observer.onNext(x);
            var timeout;
            try {
              timeout = timeoutdurationSelector(x);
            } catch (e) {
              observer.onError(e);
              return;
            }
            setTimer(isPromise(timeout) ? observableFromPromise(timeout) : timeout);
          }
        }, function (e) {
          observerWins() && observer.onError(e);
        }, function () {
          observerWins() && observer.onCompleted();
        }));
        return new CompositeDisposable(subscription, timer);
      }, source);
    };

  /**
   * Ignores values from an observable sequence which are followed by another value within a computed throttle duration.
   * @param {Function} durationSelector Selector function to retrieve a sequence indicating the throttle duration for each given element.
   * @returns {Observable} The debounced sequence.
   */
  observableProto.debounceWithSelector = function (durationSelector) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var value, hasValue = false, cancelable = new SerialDisposable(), id = 0;
      var subscription = source.subscribe(function (x) {
        var throttle;
        try {
          throttle = durationSelector(x);
        } catch (e) {
          observer.onError(e);
          return;
        }

        isPromise(throttle) && (throttle = observableFromPromise(throttle));

        hasValue = true;
        value = x;
        id++;
        var currentid = id, d = new SingleAssignmentDisposable();
        cancelable.setDisposable(d);
        d.setDisposable(throttle.subscribe(function () {
          hasValue && id === currentid && observer.onNext(value);
          hasValue = false;
          d.dispose();
        }, observer.onError.bind(observer), function () {
          hasValue && id === currentid && observer.onNext(value);
          hasValue = false;
          d.dispose();
        }));
      }, function (e) {
        cancelable.dispose();
        observer.onError(e);
        hasValue = false;
        id++;
      }, function () {
        cancelable.dispose();
        hasValue && observer.onNext(value);
        observer.onCompleted();
        hasValue = false;
        id++;
      });
      return new CompositeDisposable(subscription, cancelable);
    }, source);
  };

  /**
   * @deprecated use #debounceWithSelector instead.
   */
  observableProto.throttleWithSelector = function (durationSelector) {
    //deprecate('throttleWithSelector', 'debounceWithSelector');
    return this.debounceWithSelector(durationSelector);
  };

  /**
   *  Skips elements for the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
   *
   *  1 - res = source.skipLastWithTime(5000);
   *  2 - res = source.skipLastWithTime(5000, scheduler);
   *
   * @description
   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
   *  result sequence. This causes elements to be delayed with duration.
   * @param {Number} duration Duration for skipping elements from the end of the sequence.
   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout
   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the end of the source sequence.
   */
  observableProto.skipLastWithTime = function (duration, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        var now = scheduler.now();
        q.push({ interval: now, value: x });
        while (q.length > 0 && now - q[0].interval >= duration) {
          o.onNext(q.shift().value);
        }
      }, function (e) { o.onError(e); }, function () {
        var now = scheduler.now();
        while (q.length > 0 && now - q[0].interval >= duration) {
          o.onNext(q.shift().value);
        }
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Returns elements within the specified duration from the end of the observable source sequence, using the specified schedulers to run timers and to drain the collected elements.
   * @description
   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
   *  result sequence. This causes elements to be delayed with duration.
   * @param {Number} duration Duration for taking elements from the end of the sequence.
   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the end of the source sequence.
   */
  observableProto.takeLastWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        var now = scheduler.now();
        q.push({ interval: now, value: x });
        while (q.length > 0 && now - q[0].interval >= duration) {
          q.shift();
        }
      }, function (e) { o.onError(e); }, function () {
        var now = scheduler.now();
        while (q.length > 0) {
          var next = q.shift();
          if (now - next.interval <= duration) { o.onNext(next.value); }
        }
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Returns an array with the elements within the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
   * @description
   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
   *  result sequence. This causes elements to be delayed with duration.
   * @param {Number} duration Duration for taking elements from the end of the sequence.
   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence containing a single array with the elements taken during the specified duration from the end of the source sequence.
   */
  observableProto.takeLastBufferWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        var now = scheduler.now();
        q.push({ interval: now, value: x });
        while (q.length > 0 && now - q[0].interval >= duration) {
          q.shift();
        }
      }, function (e) { o.onError(e); }, function () {
        var now = scheduler.now(), res = [];
        while (q.length > 0) {
          var next = q.shift();
          now - next.interval <= duration && res.push(next.value);
        }
        o.onNext(res);
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Takes elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
   *
   * @example
   *  1 - res = source.takeWithTime(5000,  [optional scheduler]);
   * @description
   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
   *  result sequence. This causes elements to be delayed with duration.
   * @param {Number} duration Duration for taking elements from the start of the sequence.
   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the start of the source sequence.
   */
  observableProto.takeWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (o) {
      return new CompositeDisposable(scheduler.scheduleWithRelative(duration, function () { o.onCompleted(); }), source.subscribe(o));
    }, source);
  };

  /**
   *  Skips elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
   *
   * @example
   *  1 - res = source.skipWithTime(5000, [optional scheduler]);
   *
   * @description
   *  Specifying a zero value for duration doesn't guarantee no elements will be dropped from the start of the source sequence.
   *  This is a side-effect of the asynchrony introduced by the scheduler, where the action that causes callbacks from the source sequence to be forwarded
   *  may not execute immediately, despite the zero due time.
   *
   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the duration.
   * @param {Number} duration Duration for skipping elements from the start of the sequence.
   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the start of the source sequence.
   */
  observableProto.skipWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (observer) {
      var open = false;
      return new CompositeDisposable(
        scheduler.scheduleWithRelative(duration, function () { open = true; }),
        source.subscribe(function (x) { open && observer.onNext(x); }, observer.onError.bind(observer), observer.onCompleted.bind(observer)));
    }, source);
  };

  /**
   *  Skips elements from the observable source sequence until the specified start time, using the specified scheduler to run timers.
   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the start time.
   *
   * @examples
   *  1 - res = source.skipUntilWithTime(new Date(), [scheduler]);
   *  2 - res = source.skipUntilWithTime(5000, [scheduler]);
   * @param {Date|Number} startTime Time to start taking elements from the source sequence. If this value is less than or equal to Date(), no elements will be skipped.
   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence with the elements skipped until the specified start time.
   */
  observableProto.skipUntilWithTime = function (startTime, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var source = this, schedulerMethod = startTime instanceof Date ?
      'scheduleWithAbsolute' :
      'scheduleWithRelative';
    return new AnonymousObservable(function (o) {
      var open = false;

      return new CompositeDisposable(
        scheduler[schedulerMethod](startTime, function () { open = true; }),
        source.subscribe(
          function (x) { open && o.onNext(x); },
          function (e) { o.onError(e); }, function () { o.onCompleted(); }));
    }, source);
  };

  /**
   *  Takes elements for the specified duration until the specified end time, using the specified scheduler to run timers.
   * @param {Number | Date} endTime Time to stop taking elements from the source sequence. If this value is less than or equal to new Date(), the result stream will complete immediately.
   * @param {Scheduler} [scheduler] Scheduler to run the timer on.
   * @returns {Observable} An observable sequence with the elements taken until the specified end time.
   */
  observableProto.takeUntilWithTime = function (endTime, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var source = this, schedulerMethod = endTime instanceof Date ?
      'scheduleWithAbsolute' :
      'scheduleWithRelative';
    return new AnonymousObservable(function (o) {
      return new CompositeDisposable(
        scheduler[schedulerMethod](endTime, function () { o.onCompleted(); }),
        source.subscribe(o));
    }, source);
  };

  /**
   * Returns an Observable that emits only the first item emitted by the source Observable during sequential time windows of a specified duration.
   * @param {Number} windowDuration time to wait before emitting another item after emitting the last item
   * @param {Scheduler} [scheduler] the Scheduler to use internally to manage the timers that handle timeout for each item. If not provided, defaults to Scheduler.timeout.
   * @returns {Observable} An Observable that performs the throttle operation.
   */
  observableProto.throttleFirst = function (windowDuration, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var duration = +windowDuration || 0;
    if (duration <= 0) { throw new RangeError('windowDuration cannot be less or equal zero.'); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var lastOnNext = 0;
      return source.subscribe(
        function (x) {
          var now = scheduler.now();
          if (lastOnNext === 0 || now - lastOnNext >= duration) {
            lastOnNext = now;
            o.onNext(x);
          }
        },function (e) { o.onError(e); }, function () { o.onCompleted(); }
      );
    }, source);
  };

  /**
   * Executes a transducer to transform the observable sequence
   * @param {Transducer} transducer A transducer to execute
   * @returns {Observable} An Observable sequence containing the results from the transducer.
   */
  observableProto.transduce = function(transducer) {
    var source = this;

    function transformForObserver(o) {
      return {
        '@@transducer/init': function() {
          return o;
        },
        '@@transducer/step': function(obs, input) {
          return obs.onNext(input);
        },
        '@@transducer/result': function(obs) {
          return obs.onCompleted();
        }
      };
    }

    return new AnonymousObservable(function(o) {
      var xform = transducer(transformForObserver(o));
      return source.subscribe(
        function(v) {
          try {
            xform['@@transducer/step'](o, v);
          } catch (e) {
            o.onError(e);
          }
        },
        function (e) { o.onError(e); },
        function() { xform['@@transducer/result'](o); }
      );
    }, source);
  };

  /*
   * Performs a exclusive waiting for the first to finish before subscribing to another observable.
   * Observables that come in between subscriptions will be dropped on the floor.
   * @returns {Observable} A exclusive observable with only the results that happen when subscribed.
   */
  observableProto.exclusive = function () {
    var sources = this;
    return new AnonymousObservable(function (observer) {
      var hasCurrent = false,
        isStopped = false,
        m = new SingleAssignmentDisposable(),
        g = new CompositeDisposable();

      g.add(m);

      m.setDisposable(sources.subscribe(
        function (innerSource) {
          if (!hasCurrent) {
            hasCurrent = true;

            isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

            var innerSubscription = new SingleAssignmentDisposable();
            g.add(innerSubscription);

            innerSubscription.setDisposable(innerSource.subscribe(
              observer.onNext.bind(observer),
              observer.onError.bind(observer),
              function () {
                g.remove(innerSubscription);
                hasCurrent = false;
                if (isStopped && g.length === 1) {
                  observer.onCompleted();
                }
            }));
          }
        },
        observer.onError.bind(observer),
        function () {
          isStopped = true;
          if (!hasCurrent && g.length === 1) {
            observer.onCompleted();
          }
        }));

      return g;
    }, this);
  };

  /*
   * Performs a exclusive map waiting for the first to finish before subscribing to another observable.
   * Observables that come in between subscriptions will be dropped on the floor.
   * @param {Function} selector Selector to invoke for every item in the current subscription.
   * @param {Any} [thisArg] An optional context to invoke with the selector parameter.
   * @returns {Observable} An exclusive observable with only the results that happen when subscribed.
   */
  observableProto.exclusiveMap = function (selector, thisArg) {
    var sources = this,
        selectorFunc = bindCallback(selector, thisArg, 3);
    return new AnonymousObservable(function (observer) {
      var index = 0,
        hasCurrent = false,
        isStopped = true,
        m = new SingleAssignmentDisposable(),
        g = new CompositeDisposable();

      g.add(m);

      m.setDisposable(sources.subscribe(
        function (innerSource) {

          if (!hasCurrent) {
            hasCurrent = true;

            innerSubscription = new SingleAssignmentDisposable();
            g.add(innerSubscription);

            isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

            innerSubscription.setDisposable(innerSource.subscribe(
              function (x) {
                var result;
                try {
                  result = selectorFunc(x, index++, innerSource);
                } catch (e) {
                  observer.onError(e);
                  return;
                }

                observer.onNext(result);
              },
              function (e) { observer.onError(e); },
              function () {
                g.remove(innerSubscription);
                hasCurrent = false;

                if (isStopped && g.length === 1) {
                  observer.onCompleted();
                }
              }));
          }
        },
        function (e) { observer.onError(e); },
        function () {
          isStopped = true;
          if (g.length === 1 && !hasCurrent) {
            observer.onCompleted();
          }
        }));
      return g;
    }, this);
  };

  /** Provides a set of extension methods for virtual time scheduling. */
  Rx.VirtualTimeScheduler = (function (__super__) {

    function localNow() {
      return this.toDateTimeOffset(this.clock);
    }

    function scheduleNow(state, action) {
      return this.scheduleAbsoluteWithState(state, this.clock, action);
    }

    function scheduleRelative(state, dueTime, action) {
      return this.scheduleRelativeWithState(state, this.toRelative(dueTime), action);
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleRelativeWithState(state, this.toRelative(dueTime - this.now()), action);
    }

    function invokeAction(scheduler, action) {
      action();
      return disposableEmpty;
    }

    inherits(VirtualTimeScheduler, __super__);

    /**
     * Creates a new virtual time scheduler with the specified initial clock value and absolute time comparer.
     *
     * @constructor
     * @param {Number} initialClock Initial value for the clock.
     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
     */
    function VirtualTimeScheduler(initialClock, comparer) {
      this.clock = initialClock;
      this.comparer = comparer;
      this.isEnabled = false;
      this.queue = new PriorityQueue(1024);
      __super__.call(this, localNow, scheduleNow, scheduleRelative, scheduleAbsolute);
    }

    var VirtualTimeSchedulerPrototype = VirtualTimeScheduler.prototype;

    /**
     * Adds a relative time value to an absolute time value.
     * @param {Number} absolute Absolute virtual time value.
     * @param {Number} relative Relative virtual time value to add.
     * @return {Number} Resulting absolute virtual time sum value.
     */
    VirtualTimeSchedulerPrototype.add = notImplemented;

    /**
     * Converts an absolute time to a number
     * @param {Any} The absolute time.
     * @returns {Number} The absolute time in ms
     */
    VirtualTimeSchedulerPrototype.toDateTimeOffset = notImplemented;

    /**
     * Converts the TimeSpan value to a relative virtual time value.
     * @param {Number} timeSpan TimeSpan value to convert.
     * @return {Number} Corresponding relative virtual time value.
     */
    VirtualTimeSchedulerPrototype.toRelative = notImplemented;

    /**
     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be emulated using recursive scheduling.
     * @param {Mixed} state Initial state passed to the action upon the first iteration.
     * @param {Number} period Period for running the work periodically.
     * @param {Function} action Action to be executed, potentially updating the state.
     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
     */
    VirtualTimeSchedulerPrototype.schedulePeriodicWithState = function (state, period, action) {
      var s = new SchedulePeriodicRecursive(this, state, period, action);
      return s.start();
    };

    /**
     * Schedules an action to be executed after dueTime.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    VirtualTimeSchedulerPrototype.scheduleRelativeWithState = function (state, dueTime, action) {
      var runAt = this.add(this.clock, dueTime);
      return this.scheduleAbsoluteWithState(state, runAt, action);
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    VirtualTimeSchedulerPrototype.scheduleRelative = function (dueTime, action) {
      return this.scheduleRelativeWithState(action, dueTime, invokeAction);
    };

    /**
     * Starts the virtual time scheduler.
     */
    VirtualTimeSchedulerPrototype.start = function () {
      if (!this.isEnabled) {
        this.isEnabled = true;
        do {
          var next = this.getNext();
          if (next !== null) {
            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
            next.invoke();
          } else {
            this.isEnabled = false;
          }
        } while (this.isEnabled);
      }
    };

    /**
     * Stops the virtual time scheduler.
     */
    VirtualTimeSchedulerPrototype.stop = function () {
      this.isEnabled = false;
    };

    /**
     * Advances the scheduler's clock to the specified time, running all work till that point.
     * @param {Number} time Absolute time to advance the scheduler's clock to.
     */
    VirtualTimeSchedulerPrototype.advanceTo = function (time) {
      var dueToClock = this.comparer(this.clock, time);
      if (this.comparer(this.clock, time) > 0) { throw new ArgumentOutOfRangeError(); }
      if (dueToClock === 0) { return; }
      if (!this.isEnabled) {
        this.isEnabled = true;
        do {
          var next = this.getNext();
          if (next !== null && this.comparer(next.dueTime, time) <= 0) {
            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
            next.invoke();
          } else {
            this.isEnabled = false;
          }
        } while (this.isEnabled);
        this.clock = time;
      }
    };

    /**
     * Advances the scheduler's clock by the specified relative time, running all work scheduled for that timespan.
     * @param {Number} time Relative time to advance the scheduler's clock by.
     */
    VirtualTimeSchedulerPrototype.advanceBy = function (time) {
      var dt = this.add(this.clock, time),
          dueToClock = this.comparer(this.clock, dt);
      if (dueToClock > 0) { throw new ArgumentOutOfRangeError(); }
      if (dueToClock === 0) {  return; }

      this.advanceTo(dt);
    };

    /**
     * Advances the scheduler's clock by the specified relative time.
     * @param {Number} time Relative time to advance the scheduler's clock by.
     */
    VirtualTimeSchedulerPrototype.sleep = function (time) {
      var dt = this.add(this.clock, time);
      if (this.comparer(this.clock, dt) >= 0) { throw new ArgumentOutOfRangeError(); }

      this.clock = dt;
    };

    /**
     * Gets the next scheduled item to be executed.
     * @returns {ScheduledItem} The next scheduled item.
     */
    VirtualTimeSchedulerPrototype.getNext = function () {
      while (this.queue.length > 0) {
        var next = this.queue.peek();
        if (next.isCancelled()) {
          this.queue.dequeue();
        } else {
          return next;
        }
      }
      return null;
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Scheduler} scheduler Scheduler to execute the action on.
     * @param {Number} dueTime Absolute time at which to execute the action.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    VirtualTimeSchedulerPrototype.scheduleAbsolute = function (dueTime, action) {
      return this.scheduleAbsoluteWithState(action, dueTime, invokeAction);
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Number} dueTime Absolute time at which to execute the action.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    VirtualTimeSchedulerPrototype.scheduleAbsoluteWithState = function (state, dueTime, action) {
      var self = this;

      function run(scheduler, state1) {
        self.queue.remove(si);
        return action(scheduler, state1);
      }

      var si = new ScheduledItem(this, state, run, dueTime, this.comparer);
      this.queue.enqueue(si);

      return si.disposable;
    };

    return VirtualTimeScheduler;
  }(Scheduler));

  /** Provides a virtual time scheduler that uses Date for absolute time and number for relative time. */
  Rx.HistoricalScheduler = (function (__super__) {
    inherits(HistoricalScheduler, __super__);

    /**
     * Creates a new historical scheduler with the specified initial clock value.
     * @constructor
     * @param {Number} initialClock Initial value for the clock.
     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
     */
    function HistoricalScheduler(initialClock, comparer) {
      var clock = initialClock == null ? 0 : initialClock;
      var cmp = comparer || defaultSubComparer;
      __super__.call(this, clock, cmp);
    }

    var HistoricalSchedulerProto = HistoricalScheduler.prototype;

    /**
     * Adds a relative time value to an absolute time value.
     * @param {Number} absolute Absolute virtual time value.
     * @param {Number} relative Relative virtual time value to add.
     * @return {Number} Resulting absolute virtual time sum value.
     */
    HistoricalSchedulerProto.add = function (absolute, relative) {
      return absolute + relative;
    };

    HistoricalSchedulerProto.toDateTimeOffset = function (absolute) {
      return new Date(absolute).getTime();
    };

    /**
     * Converts the TimeSpan value to a relative virtual time value.
     * @memberOf HistoricalScheduler
     * @param {Number} timeSpan TimeSpan value to convert.
     * @return {Number} Corresponding relative virtual time value.
     */
    HistoricalSchedulerProto.toRelative = function (timeSpan) {
      return timeSpan;
    };

    return HistoricalScheduler;
  }(Rx.VirtualTimeScheduler));

  var AnonymousObservable = Rx.AnonymousObservable = (function (__super__) {
    inherits(AnonymousObservable, __super__);

    // Fix subscriber to check for undefined or function returned to decorate as Disposable
    function fixSubscriber(subscriber) {
      return subscriber && isFunction(subscriber.dispose) ? subscriber :
        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
    }

    function setDisposable(s, state) {
      var ado = state[0], subscribe = state[1];
      var sub = tryCatch(subscribe)(ado);

      if (sub === errorObj) {
        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
      }
      ado.setDisposable(fixSubscriber(sub));
    }

    function AnonymousObservable(subscribe, parent) {
      this.source = parent;

      function s(observer) {
        var ado = new AutoDetachObserver(observer), state = [ado, subscribe];

        if (currentThreadScheduler.scheduleRequired()) {
          currentThreadScheduler.scheduleWithState(state, setDisposable);
        } else {
          setDisposable(null, state);
        }
        return ado;
      }

      __super__.call(this, s);
    }

    return AnonymousObservable;

  }(Observable));

  var AutoDetachObserver = (function (__super__) {
    inherits(AutoDetachObserver, __super__);

    function AutoDetachObserver(observer) {
      __super__.call(this);
      this.observer = observer;
      this.m = new SingleAssignmentDisposable();
    }

    var AutoDetachObserverPrototype = AutoDetachObserver.prototype;

    AutoDetachObserverPrototype.next = function (value) {
      var result = tryCatch(this.observer.onNext).call(this.observer, value);
      if (result === errorObj) {
        this.dispose();
        thrower(result.e);
      }
    };

    AutoDetachObserverPrototype.error = function (err) {
      var result = tryCatch(this.observer.onError).call(this.observer, err);
      this.dispose();
      result === errorObj && thrower(result.e);
    };

    AutoDetachObserverPrototype.completed = function () {
      var result = tryCatch(this.observer.onCompleted).call(this.observer);
      this.dispose();
      result === errorObj && thrower(result.e);
    };

    AutoDetachObserverPrototype.setDisposable = function (value) { this.m.setDisposable(value); };
    AutoDetachObserverPrototype.getDisposable = function () { return this.m.getDisposable(); };

    AutoDetachObserverPrototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this.m.dispose();
    };

    return AutoDetachObserver;
  }(AbstractObserver));

  var GroupedObservable = (function (__super__) {
    inherits(GroupedObservable, __super__);

    function subscribe(observer) {
      return this.underlyingObservable.subscribe(observer);
    }

    function GroupedObservable(key, underlyingObservable, mergedDisposable) {
      __super__.call(this, subscribe);
      this.key = key;
      this.underlyingObservable = !mergedDisposable ?
        underlyingObservable :
        new AnonymousObservable(function (observer) {
          return new CompositeDisposable(mergedDisposable.getDisposable(), underlyingObservable.subscribe(observer));
        });
    }

    return GroupedObservable;
  }(Observable));

  /**
   *  Represents an object that is both an observable sequence as well as an observer.
   *  Each notification is broadcasted to all subscribed observers.
   */
  var Subject = Rx.Subject = (function (__super__) {
    function subscribe(observer) {
      checkDisposed(this);
      if (!this.isStopped) {
        this.observers.push(observer);
        return new InnerSubscription(this, observer);
      }
      if (this.hasError) {
        observer.onError(this.error);
        return disposableEmpty;
      }
      observer.onCompleted();
      return disposableEmpty;
    }

    inherits(Subject, __super__);

    /**
     * Creates a subject.
     */
    function Subject() {
      __super__.call(this, subscribe);
      this.isDisposed = false,
      this.isStopped = false,
      this.observers = [];
      this.hasError = false;
    }

    addProperties(Subject.prototype, Observer.prototype, {
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () { return this.observers.length > 0; },
      /**
       * Notifies all subscribed observers about the end of the sequence.
       */
      onCompleted: function () {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onCompleted();
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the exception.
       * @param {Mixed} error The exception to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          this.error = error;
          this.hasError = true;
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onError(error);
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
       * @param {Mixed} value The value to send to all observers.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (!this.isStopped) {
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onNext(value);
          }
        }
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
      }
    });

    /**
     * Creates a subject from the specified observer and observable.
     * @param {Observer} observer The observer used to send messages to the subject.
     * @param {Observable} observable The observable used to subscribe to messages sent from the subject.
     * @returns {Subject} Subject implemented using the given observer and observable.
     */
    Subject.create = function (observer, observable) {
      return new AnonymousSubject(observer, observable);
    };

    return Subject;
  }(Observable));

  /**
   *  Represents the result of an asynchronous operation.
   *  The last value before the OnCompleted notification, or the error received through OnError, is sent to all subscribed observers.
   */
  var AsyncSubject = Rx.AsyncSubject = (function (__super__) {

    function subscribe(observer) {
      checkDisposed(this);

      if (!this.isStopped) {
        this.observers.push(observer);
        return new InnerSubscription(this, observer);
      }

      if (this.hasError) {
        observer.onError(this.error);
      } else if (this.hasValue) {
        observer.onNext(this.value);
        observer.onCompleted();
      } else {
        observer.onCompleted();
      }

      return disposableEmpty;
    }

    inherits(AsyncSubject, __super__);

    /**
     * Creates a subject that can only receive one value and that value is cached for all future observations.
     * @constructor
     */
    function AsyncSubject() {
      __super__.call(this, subscribe);

      this.isDisposed = false;
      this.isStopped = false;
      this.hasValue = false;
      this.observers = [];
      this.hasError = false;
    }

    addProperties(AsyncSubject.prototype, Observer, {
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () {
        checkDisposed(this);
        return this.observers.length > 0;
      },
      /**
       * Notifies all subscribed observers about the end of the sequence, also causing the last received value to be sent out (if any).
       */
      onCompleted: function () {
        var i, len;
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          var os = cloneArray(this.observers), len = os.length;

          if (this.hasValue) {
            for (i = 0; i < len; i++) {
              var o = os[i];
              o.onNext(this.value);
              o.onCompleted();
            }
          } else {
            for (i = 0; i < len; i++) {
              os[i].onCompleted();
            }
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the error.
       * @param {Mixed} error The Error to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          this.hasError = true;
          this.error = error;

          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onError(error);
          }

          this.observers.length = 0;
        }
      },
      /**
       * Sends a value to the subject. The last value received before successful termination will be sent to all subscribed and future observers.
       * @param {Mixed} value The value to store in the subject.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.value = value;
        this.hasValue = true;
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
        this.exception = null;
        this.value = null;
      }
    });

    return AsyncSubject;
  }(Observable));

  var AnonymousSubject = Rx.AnonymousSubject = (function (__super__) {
    inherits(AnonymousSubject, __super__);

    function subscribe(observer) {
      return this.observable.subscribe(observer);
    }

    function AnonymousSubject(observer, observable) {
      this.observer = observer;
      this.observable = observable;
      __super__.call(this, subscribe);
    }

    addProperties(AnonymousSubject.prototype, Observer.prototype, {
      onCompleted: function () {
        this.observer.onCompleted();
      },
      onError: function (error) {
        this.observer.onError(error);
      },
      onNext: function (value) {
        this.observer.onNext(value);
      }
    });

    return AnonymousSubject;
  }(Observable));

  /**
  * Used to pause and resume streams.
  */
  Rx.Pauser = (function (__super__) {
    inherits(Pauser, __super__);

    function Pauser() {
      __super__.call(this);
    }

    /**
     * Pauses the underlying sequence.
     */
    Pauser.prototype.pause = function () { this.onNext(false); };

    /**
    * Resumes the underlying sequence.
    */
    Pauser.prototype.resume = function () { this.onNext(true); };

    return Pauser;
  }(Subject));

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    root.Rx = Rx;

    define(function() {
      return Rx;
    });
  } else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = Rx).Rx = Rx;
    } else {
      freeExports.Rx = Rx;
    }
  } else {
    // in a browser or Rhino
    root.Rx = Rx;
  }

  // All code before this point will be filtered from stack traces.
  var rEndingLine = captureLine();

}.call(this));

}).call(this,require(210),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"210":210}],220:[function(require,module,exports){
(function (process,global){
// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

;(function (undefined) {

  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  var root = (objectTypes[typeof window] && window) || this,
    freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
    freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
    moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
    freeGlobal = objectTypes[typeof global] && global;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  var Rx = {
      internals: {},
      config: {
        Promise: root.Promise
      },
      helpers: { }
  };

  // Defaults
  var noop = Rx.helpers.noop = function () { },
    notDefined = Rx.helpers.notDefined = function (x) { return typeof x === 'undefined'; },
    identity = Rx.helpers.identity = function (x) { return x; },
    pluck = Rx.helpers.pluck = function (property) { return function (x) { return x[property]; }; },
    just = Rx.helpers.just = function (value) { return function () { return value; }; },
    defaultNow = Rx.helpers.defaultNow = Date.now,
    defaultComparer = Rx.helpers.defaultComparer = function (x, y) { return isEqual(x, y); },
    defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) { return x > y ? 1 : (x < y ? -1 : 0); },
    defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) { return x.toString(); },
    defaultError = Rx.helpers.defaultError = function (err) { throw err; },
    isPromise = Rx.helpers.isPromise = function (p) { return !!p && typeof p.subscribe !== 'function' && typeof p.then === 'function'; },
    asArray = Rx.helpers.asArray = function () { return Array.prototype.slice.call(arguments); },
    not = Rx.helpers.not = function (a) { return !a; },
    isFunction = Rx.helpers.isFunction = (function () {

      var isFn = function (value) {
        return typeof value == 'function' || false;
      }

      // fallback for older versions of Chrome and Safari
      if (isFn(/x/)) {
        isFn = function(value) {
          return typeof value == 'function' && toString.call(value) == '[object Function]';
        };
      }

      return isFn;
    }());

  function cloneArray(arr) { for(var a = [], i = 0, len = arr.length; i < len; i++) { a.push(arr[i]); } return a;}

  Rx.config.longStackSupport = false;
  var hasStacks = false;
  try {
    throw new Error();
  } catch (e) {
    hasStacks = !!e.stack;
  }

  // All code after this point will be filtered from stack traces reported by RxJS
  var rStartingLine = captureLine(), rFileName;

  var STACK_JUMP_SEPARATOR = "From previous event:";

  function makeStackTraceLong(error, observable) {
      // If possible, transform the error stack trace by removing Node and RxJS
      // cruft, then concatenating with the stack trace of `observable`.
      if (hasStacks &&
          observable.stack &&
          typeof error === "object" &&
          error !== null &&
          error.stack &&
          error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
      ) {
        var stacks = [];
        for (var o = observable; !!o; o = o.source) {
          if (o.stack) {
            stacks.unshift(o.stack);
          }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
  }

  function filterStackString(stackString) {
    var lines = stackString.split("\n"),
        desiredLines = [];
    for (var i = 0, len = lines.length; i < len; i++) {
      var line = lines[i];

      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
        desiredLines.push(line);
      }
    }
    return desiredLines.join("\n");
  }

  function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
    if (!fileNameAndLineNumber) {
      return false;
    }
    var fileName = fileNameAndLineNumber[0], lineNumber = fileNameAndLineNumber[1];

    return fileName === rFileName &&
      lineNumber >= rStartingLine &&
      lineNumber <= rEndingLine;
  }

  function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
      stackLine.indexOf("(node.js:") !== -1;
  }

  function captureLine() {
    if (!hasStacks) { return; }

    try {
      throw new Error();
    } catch (e) {
      var lines = e.stack.split("\n");
      var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
      if (!fileNameAndLineNumber) { return; }

      rFileName = fileNameAndLineNumber[0];
      return fileNameAndLineNumber[1];
    }
  }

  function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) { return [attempt1[1], Number(attempt1[2])]; }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) { return [attempt2[1], Number(attempt2[2])]; }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) { return [attempt3[1], Number(attempt3[2])]; }
  }

  var EmptyError = Rx.EmptyError = function() {
    this.message = 'Sequence contains no elements.';
    Error.call(this);
  };
  EmptyError.prototype = Error.prototype;

  var ObjectDisposedError = Rx.ObjectDisposedError = function() {
    this.message = 'Object has been disposed';
    Error.call(this);
  };
  ObjectDisposedError.prototype = Error.prototype;

  var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function () {
    this.message = 'Argument out of range';
    Error.call(this);
  };
  ArgumentOutOfRangeError.prototype = Error.prototype;

  var NotSupportedError = Rx.NotSupportedError = function (message) {
    this.message = message || 'This operation is not supported';
    Error.call(this);
  };
  NotSupportedError.prototype = Error.prototype;

  var NotImplementedError = Rx.NotImplementedError = function (message) {
    this.message = message || 'This operation is not implemented';
    Error.call(this);
  };
  NotImplementedError.prototype = Error.prototype;

  var notImplemented = Rx.helpers.notImplemented = function () {
    throw new NotImplementedError();
  };

  var notSupported = Rx.helpers.notSupported = function () {
    throw new NotSupportedError();
  };

  // Shim in iterator support
  var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) ||
    '_es6shim_iterator_';
  // Bug for mozilla version
  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
    $iterator$ = '@@iterator';
  }

  var doneEnumerator = Rx.doneEnumerator = { done: true, value: undefined };

  var isIterable = Rx.helpers.isIterable = function (o) {
    return o[$iterator$] !== undefined;
  }

  var isArrayLike = Rx.helpers.isArrayLike = function (o) {
    return o && o.length !== undefined;
  }

  Rx.helpers.iterator = $iterator$;

  var bindCallback = Rx.internals.bindCallback = function (func, thisArg, argCount) {
    if (typeof thisArg === 'undefined') { return func; }
    switch(argCount) {
      case 0:
        return function() {
          return func.call(thisArg)
        };
      case 1:
        return function(arg) {
          return func.call(thisArg, arg);
        }
      case 2:
        return function(value, index) {
          return func.call(thisArg, value, index);
        };
      case 3:
        return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
    }

    return function() {
      return func.apply(thisArg, arguments);
    };
  };

  /** Used to determine if values are of the language type Object */
  var dontEnums = ['toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'],
  dontEnumsLength = dontEnums.length;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

  var toString = Object.prototype.toString,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    supportsArgsClass = toString.call(arguments) == argsClass, // For less <IE9 && FF<4
    supportNodeClass,
    errorProto = Error.prototype,
    objectProto = Object.prototype,
    stringProto = String.prototype,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

  try {
    supportNodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
  } catch (e) {
    supportNodeClass = true;
  }

  var nonEnumProps = {};
  nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
  nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
  nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
  nonEnumProps[objectClass] = { 'constructor': true };

  var support = {};
  (function () {
    var ctor = function() { this.x = 1; },
      props = [];

    ctor.prototype = { 'valueOf': 1, 'y': 1 };
    for (var key in new ctor) { props.push(key); }
    for (key in arguments) { }

    // Detect if `name` or `message` properties of `Error.prototype` are enumerable by default.
    support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

    // Detect if `prototype` properties are enumerable by default.
    support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');

    // Detect if `arguments` object indexes are non-enumerable
    support.nonEnumArgs = key != 0;

    // Detect if properties shadowing those on `Object.prototype` are non-enumerable.
    support.nonEnumShadows = !/valueOf/.test(props);
  }(1));

  var isObject = Rx.internals.isObject = function(value) {
    var type = typeof value;
    return value && (type == 'function' || type == 'object') || false;
  };

  function keysIn(object) {
    var result = [];
    if (!isObject(object)) {
      return result;
    }
    if (support.nonEnumArgs && object.length && isArguments(object)) {
      object = slice.call(object);
    }
    var skipProto = support.enumPrototypes && typeof object == 'function',
        skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error);

    for (var key in object) {
      if (!(skipProto && key == 'prototype') &&
          !(skipErrorProps && (key == 'message' || key == 'name'))) {
        result.push(key);
      }
    }

    if (support.nonEnumShadows && object !== objectProto) {
      var ctor = object.constructor,
          index = -1,
          length = dontEnumsLength;

      if (object === (ctor && ctor.prototype)) {
        var className = object === stringProto ? stringClass : object === errorProto ? errorClass : toString.call(object),
            nonEnum = nonEnumProps[className];
      }
      while (++index < length) {
        key = dontEnums[index];
        if (!(nonEnum && nonEnum[key]) && hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
    }
    return result;
  }

  function internalFor(object, callback, keysFunc) {
    var index = -1,
      props = keysFunc(object),
      length = props.length;

    while (++index < length) {
      var key = props[index];
      if (callback(object[key], key, object) === false) {
        break;
      }
    }
    return object;
  }

  function internalForIn(object, callback) {
    return internalFor(object, callback, keysIn);
  }

  function isNode(value) {
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
    // methods that are `typeof` "string" and still can coerce nodes to strings
    return typeof value.toString != 'function' && typeof (value + '') == 'string';
  }

  var isArguments = function(value) {
    return (value && typeof value == 'object') ? toString.call(value) == argsClass : false;
  }

  // fallback for browsers that can't detect `arguments` objects by [[Class]]
  if (!supportsArgsClass) {
    isArguments = function(value) {
      return (value && typeof value == 'object') ? hasOwnProperty.call(value, 'callee') : false;
    };
  }

  var isEqual = Rx.internals.isEqual = function (x, y) {
    return deepEquals(x, y, [], []);
  };

  /** @private
   * Used for deep comparison
   **/
  function deepEquals(a, b, stackA, stackB) {
    // exit early for identical values
    if (a === b) {
      // treat `+0` vs. `-0` as not equal
      return a !== 0 || (1 / a == 1 / b);
    }

    var type = typeof a,
        otherType = typeof b;

    // exit early for unlike primitive values
    if (a === a && (a == null || b == null ||
        (type != 'function' && type != 'object' && otherType != 'function' && otherType != 'object'))) {
      return false;
    }

    // compare [[Class]] names
    var className = toString.call(a),
        otherClass = toString.call(b);

    if (className == argsClass) {
      className = objectClass;
    }
    if (otherClass == argsClass) {
      otherClass = objectClass;
    }
    if (className != otherClass) {
      return false;
    }
    switch (className) {
      case boolClass:
      case dateClass:
        // coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
        return +a == +b;

      case numberClass:
        // treat `NaN` vs. `NaN` as equal
        return (a != +a) ?
          b != +b :
          // but treat `-0` vs. `+0` as not equal
          (a == 0 ? (1 / a == 1 / b) : a == +b);

      case regexpClass:
      case stringClass:
        // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
        // treat string primitives and their corresponding object instances as equal
        return a == String(b);
    }
    var isArr = className == arrayClass;
    if (!isArr) {

      // exit for functions and DOM nodes
      if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
        return false;
      }
      // in older versions of Opera, `arguments` objects have `Array` constructors
      var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
          ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;

      // non `Object` object instances with different constructors are not equal
      if (ctorA != ctorB &&
            !(hasOwnProperty.call(a, 'constructor') && hasOwnProperty.call(b, 'constructor')) &&
            !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
            ('constructor' in a && 'constructor' in b)
          ) {
        return false;
      }
    }
    // assume cyclic structures are equal
    // the algorithm for detecting cyclic structures is adapted from ES 5.1
    // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
    var initedStack = !stackA;
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == a) {
        return stackB[length] == b;
      }
    }
    var size = 0;
    var result = true;

    // add `a` and `b` to the stack of traversed objects
    stackA.push(a);
    stackB.push(b);

    // recursively compare objects and arrays (susceptible to call stack limits)
    if (isArr) {
      // compare lengths to determine if a deep comparison is necessary
      length = a.length;
      size = b.length;
      result = size == length;

      if (result) {
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          var index = length,
              value = b[size];

          if (!(result = deepEquals(a[size], value, stackA, stackB))) {
            break;
          }
        }
      }
    }
    else {
      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
      // which, in this case, is more costly
      internalForIn(b, function(value, key, b) {
        if (hasOwnProperty.call(b, key)) {
          // count the number of properties.
          size++;
          // deep compare each property value.
          return (result = hasOwnProperty.call(a, key) && deepEquals(a[key], value, stackA, stackB));
        }
      });

      if (result) {
        // ensure both objects have the same number of properties
        internalForIn(a, function(value, key, a) {
          if (hasOwnProperty.call(a, key)) {
            // `size` will be `-1` if `a` has more properties than `b`
            return (result = --size > -1);
          }
        });
      }
    }
    stackA.pop();
    stackB.pop();

    return result;
  }

  var hasProp = {}.hasOwnProperty,
      slice = Array.prototype.slice;

  var inherits = this.inherits = Rx.internals.inherits = function (child, parent) {
    function __() { this.constructor = child; }
    __.prototype = parent.prototype;
    child.prototype = new __();
  };

  var addProperties = Rx.internals.addProperties = function (obj) {
    for(var sources = [], i = 1, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
    for (var idx = 0, ln = sources.length; idx < ln; idx++) {
      var source = sources[idx];
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  };

  // Rx Utils
  var addRef = Rx.internals.addRef = function (xs, r) {
    return new AnonymousObservable(function (observer) {
      return new CompositeDisposable(r.getDisposable(), xs.subscribe(observer));
    });
  };

  function arrayInitialize(count, factory) {
    var a = new Array(count);
    for (var i = 0; i < count; i++) {
      a[i] = factory();
    }
    return a;
  }

  var errorObj = {e: {}};
  var tryCatchTarget;
  function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObj.e = e;
      return errorObj;
    }
  }
  function tryCatch(fn) {
    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
    tryCatchTarget = fn;
    return tryCatcher;
  }
  function thrower(e) {
    throw e;
  }

  // Collections
  function IndexedItem(id, value) {
    this.id = id;
    this.value = value;
  }

  IndexedItem.prototype.compareTo = function (other) {
    var c = this.value.compareTo(other.value);
    c === 0 && (c = this.id - other.id);
    return c;
  };

  // Priority Queue for Scheduling
  var PriorityQueue = Rx.internals.PriorityQueue = function (capacity) {
    this.items = new Array(capacity);
    this.length = 0;
  };

  var priorityProto = PriorityQueue.prototype;
  priorityProto.isHigherPriority = function (left, right) {
    return this.items[left].compareTo(this.items[right]) < 0;
  };

  priorityProto.percolate = function (index) {
    if (index >= this.length || index < 0) { return; }
    var parent = index - 1 >> 1;
    if (parent < 0 || parent === index) { return; }
    if (this.isHigherPriority(index, parent)) {
      var temp = this.items[index];
      this.items[index] = this.items[parent];
      this.items[parent] = temp;
      this.percolate(parent);
    }
  };

  priorityProto.heapify = function (index) {
    +index || (index = 0);
    if (index >= this.length || index < 0) { return; }
    var left = 2 * index + 1,
        right = 2 * index + 2,
        first = index;
    if (left < this.length && this.isHigherPriority(left, first)) {
      first = left;
    }
    if (right < this.length && this.isHigherPriority(right, first)) {
      first = right;
    }
    if (first !== index) {
      var temp = this.items[index];
      this.items[index] = this.items[first];
      this.items[first] = temp;
      this.heapify(first);
    }
  };

  priorityProto.peek = function () { return this.items[0].value; };

  priorityProto.removeAt = function (index) {
    this.items[index] = this.items[--this.length];
    this.items[this.length] = undefined;
    this.heapify();
  };

  priorityProto.dequeue = function () {
    var result = this.peek();
    this.removeAt(0);
    return result;
  };

  priorityProto.enqueue = function (item) {
    var index = this.length++;
    this.items[index] = new IndexedItem(PriorityQueue.count++, item);
    this.percolate(index);
  };

  priorityProto.remove = function (item) {
    for (var i = 0; i < this.length; i++) {
      if (this.items[i].value === item) {
        this.removeAt(i);
        return true;
      }
    }
    return false;
  };
  PriorityQueue.count = 0;

  /**
   * Represents a group of disposable resources that are disposed together.
   * @constructor
   */
  var CompositeDisposable = Rx.CompositeDisposable = function () {
    var args = [], i, len;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
      len = args.length;
    } else {
      len = arguments.length;
      args = new Array(len);
      for(i = 0; i < len; i++) { args[i] = arguments[i]; }
    }
    for(i = 0; i < len; i++) {
      if (!isDisposable(args[i])) { throw new TypeError('Not a disposable'); }
    }
    this.disposables = args;
    this.isDisposed = false;
    this.length = args.length;
  };

  var CompositeDisposablePrototype = CompositeDisposable.prototype;

  /**
   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
   * @param {Mixed} item Disposable to add.
   */
  CompositeDisposablePrototype.add = function (item) {
    if (this.isDisposed) {
      item.dispose();
    } else {
      this.disposables.push(item);
      this.length++;
    }
  };

  /**
   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
   * @param {Mixed} item Disposable to remove.
   * @returns {Boolean} true if found; false otherwise.
   */
  CompositeDisposablePrototype.remove = function (item) {
    var shouldDispose = false;
    if (!this.isDisposed) {
      var idx = this.disposables.indexOf(item);
      if (idx !== -1) {
        shouldDispose = true;
        this.disposables.splice(idx, 1);
        this.length--;
        item.dispose();
      }
    }
    return shouldDispose;
  };

  /**
   *  Disposes all disposables in the group and removes them from the group.
   */
  CompositeDisposablePrototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var len = this.disposables.length, currentDisposables = new Array(len);
      for(var i = 0; i < len; i++) { currentDisposables[i] = this.disposables[i]; }
      this.disposables = [];
      this.length = 0;

      for (i = 0; i < len; i++) {
        currentDisposables[i].dispose();
      }
    }
  };

  /**
   * Provides a set of static methods for creating Disposables.
   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
   */
  var Disposable = Rx.Disposable = function (action) {
    this.isDisposed = false;
    this.action = action || noop;
  };

  /** Performs the task of cleaning up resources. */
  Disposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.action();
      this.isDisposed = true;
    }
  };

  /**
   * Creates a disposable object that invokes the specified action when disposed.
   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
   * @return {Disposable} The disposable object that runs the given action upon disposal.
   */
  var disposableCreate = Disposable.create = function (action) { return new Disposable(action); };

  /**
   * Gets the disposable that does nothing when disposed.
   */
  var disposableEmpty = Disposable.empty = { dispose: noop };

  /**
   * Validates whether the given object is a disposable
   * @param {Object} Object to test whether it has a dispose method
   * @returns {Boolean} true if a disposable object, else false.
   */
  var isDisposable = Disposable.isDisposable = function (d) {
    return d && isFunction(d.dispose);
  };

  var checkDisposed = Disposable.checkDisposed = function (disposable) {
    if (disposable.isDisposed) { throw new ObjectDisposedError(); }
  };

  // Single assignment
  var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function () {
    this.isDisposed = false;
    this.current = null;
  };
  SingleAssignmentDisposable.prototype.getDisposable = function () {
    return this.current;
  };
  SingleAssignmentDisposable.prototype.setDisposable = function (value) {
    if (this.current) { throw new Error('Disposable has already been assigned'); }
    var shouldDispose = this.isDisposed;
    !shouldDispose && (this.current = value);
    shouldDispose && value && value.dispose();
  };
  SingleAssignmentDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old = this.current;
      this.current = null;
    }
    old && old.dispose();
  };

  // Multiple assignment disposable
  var SerialDisposable = Rx.SerialDisposable = function () {
    this.isDisposed = false;
    this.current = null;
  };
  SerialDisposable.prototype.getDisposable = function () {
    return this.current;
  };
  SerialDisposable.prototype.setDisposable = function (value) {
    var shouldDispose = this.isDisposed;
    if (!shouldDispose) {
      var old = this.current;
      this.current = value;
    }
    old && old.dispose();
    shouldDispose && value && value.dispose();
  };
  SerialDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old = this.current;
      this.current = null;
    }
    old && old.dispose();
  };

  /**
   * Represents a disposable resource that only disposes its underlying disposable resource when all dependent disposable objects have been disposed.
   */
  var RefCountDisposable = Rx.RefCountDisposable = (function () {

    function InnerDisposable(disposable) {
      this.disposable = disposable;
      this.disposable.count++;
      this.isInnerDisposed = false;
    }

    InnerDisposable.prototype.dispose = function () {
      if (!this.disposable.isDisposed && !this.isInnerDisposed) {
        this.isInnerDisposed = true;
        this.disposable.count--;
        if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
          this.disposable.isDisposed = true;
          this.disposable.underlyingDisposable.dispose();
        }
      }
    };

    /**
     * Initializes a new instance of the RefCountDisposable with the specified disposable.
     * @constructor
     * @param {Disposable} disposable Underlying disposable.
      */
    function RefCountDisposable(disposable) {
      this.underlyingDisposable = disposable;
      this.isDisposed = false;
      this.isPrimaryDisposed = false;
      this.count = 0;
    }

    /**
     * Disposes the underlying disposable only when all dependent disposables have been disposed
     */
    RefCountDisposable.prototype.dispose = function () {
      if (!this.isDisposed && !this.isPrimaryDisposed) {
        this.isPrimaryDisposed = true;
        if (this.count === 0) {
          this.isDisposed = true;
          this.underlyingDisposable.dispose();
        }
      }
    };

    /**
     * Returns a dependent disposable that when disposed decreases the refcount on the underlying disposable.
     * @returns {Disposable} A dependent disposable contributing to the reference count that manages the underlying disposable's lifetime.
     */
    RefCountDisposable.prototype.getDisposable = function () {
      return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
    };

    return RefCountDisposable;
  })();

  function ScheduledDisposable(scheduler, disposable) {
    this.scheduler = scheduler;
    this.disposable = disposable;
    this.isDisposed = false;
  }

  function scheduleItem(s, self) {
    if (!self.isDisposed) {
      self.isDisposed = true;
      self.disposable.dispose();
    }
  }

  ScheduledDisposable.prototype.dispose = function () {
    this.scheduler.scheduleWithState(this, scheduleItem);
  };

  var ScheduledItem = Rx.internals.ScheduledItem = function (scheduler, state, action, dueTime, comparer) {
    this.scheduler = scheduler;
    this.state = state;
    this.action = action;
    this.dueTime = dueTime;
    this.comparer = comparer || defaultSubComparer;
    this.disposable = new SingleAssignmentDisposable();
  }

  ScheduledItem.prototype.invoke = function () {
    this.disposable.setDisposable(this.invokeCore());
  };

  ScheduledItem.prototype.compareTo = function (other) {
    return this.comparer(this.dueTime, other.dueTime);
  };

  ScheduledItem.prototype.isCancelled = function () {
    return this.disposable.isDisposed;
  };

  ScheduledItem.prototype.invokeCore = function () {
    return this.action(this.scheduler, this.state);
  };

  /** Provides a set of static properties to access commonly used schedulers. */
  var Scheduler = Rx.Scheduler = (function () {

    function Scheduler(now, schedule, scheduleRelative, scheduleAbsolute) {
      this.now = now;
      this._schedule = schedule;
      this._scheduleRelative = scheduleRelative;
      this._scheduleAbsolute = scheduleAbsolute;
    }

    /** Determines whether the given object is a scheduler */
    Scheduler.isScheduler = function (s) {
      return s instanceof Scheduler;
    }

    function invokeAction(scheduler, action) {
      action();
      return disposableEmpty;
    }

    var schedulerProto = Scheduler.prototype;

    /**
     * Schedules an action to be executed.
     * @param {Function} action Action to execute.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.schedule = function (action) {
      return this._schedule(action, invokeAction);
    };

    /**
     * Schedules an action to be executed.
     * @param state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithState = function (state, action) {
      return this._schedule(state, action);
    };

    /**
     * Schedules an action to be executed after the specified relative due time.
     * @param {Function} action Action to execute.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithRelative = function (dueTime, action) {
      return this._scheduleRelative(action, dueTime, invokeAction);
    };

    /**
     * Schedules an action to be executed after dueTime.
     * @param state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithRelativeAndState = function (state, dueTime, action) {
      return this._scheduleRelative(state, dueTime, action);
    };

    /**
     * Schedules an action to be executed at the specified absolute due time.
     * @param {Function} action Action to execute.
     * @param {Number} dueTime Absolute time at which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
      */
    schedulerProto.scheduleWithAbsolute = function (dueTime, action) {
      return this._scheduleAbsolute(action, dueTime, invokeAction);
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @param {Number}dueTime Absolute time at which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithAbsoluteAndState = function (state, dueTime, action) {
      return this._scheduleAbsolute(state, dueTime, action);
    };

    /** Gets the current time according to the local machine's system clock. */
    Scheduler.now = defaultNow;

    /**
     * Normalizes the specified TimeSpan value to a positive value.
     * @param {Number} timeSpan The time span value to normalize.
     * @returns {Number} The specified TimeSpan value if it is zero or positive; otherwise, 0
     */
    Scheduler.normalize = function (timeSpan) {
      timeSpan < 0 && (timeSpan = 0);
      return timeSpan;
    };

    return Scheduler;
  }());

  var normalizeTime = Scheduler.normalize, isScheduler = Scheduler.isScheduler;

  (function (schedulerProto) {

    function invokeRecImmediate(scheduler, pair) {
      var state = pair[0], action = pair[1], group = new CompositeDisposable();

      function recursiveAction(state1) {
        action(state1, function (state2) {
          var isAdded = false, isDone = false,
          d = scheduler.scheduleWithState(state2, function (scheduler1, state3) {
            if (isAdded) {
              group.remove(d);
            } else {
              isDone = true;
            }
            recursiveAction(state3);
            return disposableEmpty;
          });
          if (!isDone) {
            group.add(d);
            isAdded = true;
          }
        });
      }
      recursiveAction(state);
      return group;
    }

    function invokeRecDate(scheduler, pair, method) {
      var state = pair[0], action = pair[1], group = new CompositeDisposable();
      function recursiveAction(state1) {
        action(state1, function (state2, dueTime1) {
          var isAdded = false, isDone = false,
          d = scheduler[method](state2, dueTime1, function (scheduler1, state3) {
            if (isAdded) {
              group.remove(d);
            } else {
              isDone = true;
            }
            recursiveAction(state3);
            return disposableEmpty;
          });
          if (!isDone) {
            group.add(d);
            isAdded = true;
          }
        });
      };
      recursiveAction(state);
      return group;
    }

    function scheduleInnerRecursive(action, self) {
      action(function(dt) { self(action, dt); });
    }

    /**
     * Schedules an action to be executed recursively.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursive = function (action) {
      return this.scheduleRecursiveWithState(action, scheduleInnerRecursive);
    };

    /**
     * Schedules an action to be executed recursively.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in recursive invocation state.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithState = function (state, action) {
      return this.scheduleWithState([state, action], invokeRecImmediate);
    };

    /**
     * Schedules an action to be executed recursively after a specified relative due time.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified relative time.
     * @param {Number}dueTime Relative time after which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithRelative = function (dueTime, action) {
      return this.scheduleRecursiveWithRelativeAndState(action, dueTime, scheduleInnerRecursive);
    };

    /**
     * Schedules an action to be executed recursively after a specified relative due time.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
     * @param {Number}dueTime Relative time after which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithRelativeAndState = function (state, dueTime, action) {
      return this._scheduleRelative([state, action], dueTime, function (s, p) {
        return invokeRecDate(s, p, 'scheduleWithRelativeAndState');
      });
    };

    /**
     * Schedules an action to be executed recursively at a specified absolute due time.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified absolute time.
     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithAbsolute = function (dueTime, action) {
      return this.scheduleRecursiveWithAbsoluteAndState(action, dueTime, scheduleInnerRecursive);
    };

    /**
     * Schedules an action to be executed recursively at a specified absolute due time.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithAbsoluteAndState = function (state, dueTime, action) {
      return this._scheduleAbsolute([state, action], dueTime, function (s, p) {
        return invokeRecDate(s, p, 'scheduleWithAbsoluteAndState');
      });
    };
  }(Scheduler.prototype));

  (function (schedulerProto) {

    /**
     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
     * @param {Number} period Period for running the work periodically.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
     */
    Scheduler.prototype.schedulePeriodic = function (period, action) {
      return this.schedulePeriodicWithState(null, period, action);
    };

    /**
     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
     * @param {Mixed} state Initial state passed to the action upon the first iteration.
     * @param {Number} period Period for running the work periodically.
     * @param {Function} action Action to be executed, potentially updating the state.
     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
     */
    Scheduler.prototype.schedulePeriodicWithState = function(state, period, action) {
      if (typeof root.setInterval === 'undefined') { throw new NotSupportedError(); }
      period = normalizeTime(period);
      var s = state, id = root.setInterval(function () { s = action(s); }, period);
      return disposableCreate(function () { root.clearInterval(id); });
    };

  }(Scheduler.prototype));

  (function (schedulerProto) {
    /**
     * Returns a scheduler that wraps the original scheduler, adding exception handling for scheduled actions.
     * @param {Function} handler Handler that's run if an exception is caught. The exception will be rethrown if the handler returns false.
     * @returns {Scheduler} Wrapper around the original scheduler, enforcing exception handling.
     */
    schedulerProto.catchError = schedulerProto['catch'] = function (handler) {
      return new CatchScheduler(this, handler);
    };
  }(Scheduler.prototype));

  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function () {
    function tick(command, recurse) {
      recurse(0, this._period);
      try {
        this._state = this._action(this._state);
      } catch (e) {
        this._cancel.dispose();
        throw e;
      }
    }

    function SchedulePeriodicRecursive(scheduler, state, period, action) {
      this._scheduler = scheduler;
      this._state = state;
      this._period = period;
      this._action = action;
    }

    SchedulePeriodicRecursive.prototype.start = function () {
      var d = new SingleAssignmentDisposable();
      this._cancel = d;
      d.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0, this._period, tick.bind(this)));

      return d;
    };

    return SchedulePeriodicRecursive;
  }());

  /** Gets a scheduler that schedules work immediately on the current thread. */
  var immediateScheduler = Scheduler.immediate = (function () {
    function scheduleNow(state, action) { return action(this, state); }
    return new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
  }());

  /**
   * Gets a scheduler that schedules work as soon as possible on the current thread.
   */
  var currentThreadScheduler = Scheduler.currentThread = (function () {
    var queue;

    function runTrampoline () {
      while (queue.length > 0) {
        var item = queue.dequeue();
        !item.isCancelled() && item.invoke();
      }
    }

    function scheduleNow(state, action) {
      var si = new ScheduledItem(this, state, action, this.now());

      if (!queue) {
        queue = new PriorityQueue(4);
        queue.enqueue(si);

        var result = tryCatch(runTrampoline)();
        queue = null;
        if (result === errorObj) { return thrower(result.e); }
      } else {
        queue.enqueue(si);
      }
      return si.disposable;
    }

    var currentScheduler = new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
    currentScheduler.scheduleRequired = function () { return !queue; };

    return currentScheduler;
  }());

  var scheduleMethod, clearMethod;

  var localTimer = (function () {
    var localSetTimeout, localClearTimeout = noop;
    if (!!root.setTimeout) {
      localSetTimeout = root.setTimeout;
      localClearTimeout = root.clearTimeout;
    } else if (!!root.WScript) {
      localSetTimeout = function (fn, time) {
        root.WScript.Sleep(time);
        fn();
      };
    } else {
      throw new NotSupportedError();
    }

    return {
      setTimeout: localSetTimeout,
      clearTimeout: localClearTimeout
    };
  }());
  var localSetTimeout = localTimer.setTimeout,
    localClearTimeout = localTimer.clearTimeout;

  (function () {

    var nextHandle = 1, tasksByHandle = {}, currentlyRunning = false;

    clearMethod = function (handle) {
      delete tasksByHandle[handle];
    };

    function runTask(handle) {
      if (currentlyRunning) {
        localSetTimeout(function () { runTask(handle) }, 0);
      } else {
        var task = tasksByHandle[handle];
        if (task) {
          currentlyRunning = true;
          var result = tryCatch(task)();
          clearMethod(handle);
          currentlyRunning = false;
          if (result === errorObj) { return thrower(result.e); }
        }
      }
    }

    var reNative = RegExp('^' +
      String(toString)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/toString| for [^\]]+/g, '.*?') + '$'
    );

    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' &&
      !reNative.test(setImmediate) && setImmediate;

    function postMessageSupported () {
      // Ensure not in a worker
      if (!root.postMessage || root.importScripts) { return false; }
      var isAsync = false, oldHandler = root.onmessage;
      // Test for async
      root.onmessage = function () { isAsync = true; };
      root.postMessage('', '*');
      root.onmessage = oldHandler;

      return isAsync;
    }

    // Use in order, setImmediate, nextTick, postMessage, MessageChannel, script readystatechanged, setTimeout
    if (isFunction(setImmediate)) {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        setImmediate(function () { runTask(id); });

        return id;
      };
    } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        process.nextTick(function () { runTask(id); });

        return id;
      };
    } else if (postMessageSupported()) {
      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();

      function onGlobalPostMessage(event) {
        // Only if we're a match to avoid any other global events
        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
          runTask(event.data.substring(MSG_PREFIX.length));
        }
      }

      if (root.addEventListener) {
        root.addEventListener('message', onGlobalPostMessage, false);
      } else if (root.attachEvent) {
        root.attachEvent('onmessage', onGlobalPostMessage);
      } else {
        root.onmessage = onGlobalPostMessage;
      }

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        root.postMessage(MSG_PREFIX + currentId, '*');
        return id;
      };
    } else if (!!root.MessageChannel) {
      var channel = new root.MessageChannel();

      channel.port1.onmessage = function (e) { runTask(e.data); };

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        channel.port2.postMessage(id);
        return id;
      };
    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {

      scheduleMethod = function (action) {
        var scriptElement = root.document.createElement('script');
        var id = nextHandle++;
        tasksByHandle[id] = action;

        scriptElement.onreadystatechange = function () {
          runTask(id);
          scriptElement.onreadystatechange = null;
          scriptElement.parentNode.removeChild(scriptElement);
          scriptElement = null;
        };
        root.document.documentElement.appendChild(scriptElement);
        return id;
      };

    } else {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        localSetTimeout(function () {
          runTask(id);
        }, 0);

        return id;
      };
    }
  }());

  /**
   * Gets a scheduler that schedules work via a timed callback based upon platform.
   */
  var timeoutScheduler = Scheduler.timeout = Scheduler['default'] = (function () {

    function scheduleNow(state, action) {
      var scheduler = this, disposable = new SingleAssignmentDisposable();
      var id = scheduleMethod(function () {
        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
      });
      return new CompositeDisposable(disposable, disposableCreate(function () {
        clearMethod(id);
      }));
    }

    function scheduleRelative(state, dueTime, action) {
      var scheduler = this, dt = Scheduler.normalize(dueTime), disposable = new SingleAssignmentDisposable();
      if (dt === 0) { return scheduler.scheduleWithState(state, action); }
      var id = localSetTimeout(function () {
        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
      }, dt);
      return new CompositeDisposable(disposable, disposableCreate(function () {
        localClearTimeout(id);
      }));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
    }

    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);
  })();

  var CatchScheduler = (function (__super__) {

    function scheduleNow(state, action) {
      return this._scheduler.scheduleWithState(state, this._wrap(action));
    }

    function scheduleRelative(state, dueTime, action) {
      return this._scheduler.scheduleWithRelativeAndState(state, dueTime, this._wrap(action));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this._scheduler.scheduleWithAbsoluteAndState(state, dueTime, this._wrap(action));
    }

    inherits(CatchScheduler, __super__);

    function CatchScheduler(scheduler, handler) {
      this._scheduler = scheduler;
      this._handler = handler;
      this._recursiveOriginal = null;
      this._recursiveWrapper = null;
      __super__.call(this, this._scheduler.now.bind(this._scheduler), scheduleNow, scheduleRelative, scheduleAbsolute);
    }

    CatchScheduler.prototype._clone = function (scheduler) {
        return new CatchScheduler(scheduler, this._handler);
    };

    CatchScheduler.prototype._wrap = function (action) {
      var parent = this;
      return function (self, state) {
        try {
          return action(parent._getRecursiveWrapper(self), state);
        } catch (e) {
          if (!parent._handler(e)) { throw e; }
          return disposableEmpty;
        }
      };
    };

    CatchScheduler.prototype._getRecursiveWrapper = function (scheduler) {
      if (this._recursiveOriginal !== scheduler) {
        this._recursiveOriginal = scheduler;
        var wrapper = this._clone(scheduler);
        wrapper._recursiveOriginal = scheduler;
        wrapper._recursiveWrapper = wrapper;
        this._recursiveWrapper = wrapper;
      }
      return this._recursiveWrapper;
    };

    CatchScheduler.prototype.schedulePeriodicWithState = function (state, period, action) {
      var self = this, failed = false, d = new SingleAssignmentDisposable();

      d.setDisposable(this._scheduler.schedulePeriodicWithState(state, period, function (state1) {
        if (failed) { return null; }
        try {
          return action(state1);
        } catch (e) {
          failed = true;
          if (!self._handler(e)) { throw e; }
          d.dispose();
          return null;
        }
      }));

      return d;
    };

    return CatchScheduler;
  }(Scheduler));

  /**
   *  Represents a notification to an observer.
   */
  var Notification = Rx.Notification = (function () {
    function Notification(kind, value, exception, accept, acceptObservable, toString) {
      this.kind = kind;
      this.value = value;
      this.exception = exception;
      this._accept = accept;
      this._acceptObservable = acceptObservable;
      this.toString = toString;
    }

    /**
     * Invokes the delegate corresponding to the notification or the observer's method corresponding to the notification and returns the produced result.
     *
     * @memberOf Notification
     * @param {Any} observerOrOnNext Delegate to invoke for an OnNext notification or Observer to invoke the notification on..
     * @param {Function} onError Delegate to invoke for an OnError notification.
     * @param {Function} onCompleted Delegate to invoke for an OnCompleted notification.
     * @returns {Any} Result produced by the observation.
     */
    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
      return observerOrOnNext && typeof observerOrOnNext === 'object' ?
        this._acceptObservable(observerOrOnNext) :
        this._accept(observerOrOnNext, onError, onCompleted);
    };

    /**
     * Returns an observable sequence with a single notification.
     *
     * @memberOf Notifications
     * @param {Scheduler} [scheduler] Scheduler to send out the notification calls on.
     * @returns {Observable} The observable sequence that surfaces the behavior of the notification upon subscription.
     */
    Notification.prototype.toObservable = function (scheduler) {
      var self = this;
      isScheduler(scheduler) || (scheduler = immediateScheduler);
      return new AnonymousObservable(function (observer) {
        return scheduler.scheduleWithState(self, function (_, notification) {
          notification._acceptObservable(observer);
          notification.kind === 'N' && observer.onCompleted();
        });
      });
    };

    return Notification;
  })();

  /**
   * Creates an object that represents an OnNext notification to an observer.
   * @param {Any} value The value contained in the notification.
   * @returns {Notification} The OnNext notification containing the value.
   */
  var notificationCreateOnNext = Notification.createOnNext = (function () {
      function _accept(onNext) { return onNext(this.value); }
      function _acceptObservable(observer) { return observer.onNext(this.value); }
      function toString() { return 'OnNext(' + this.value + ')'; }

      return function (value) {
        return new Notification('N', value, null, _accept, _acceptObservable, toString);
      };
  }());

  /**
   * Creates an object that represents an OnError notification to an observer.
   * @param {Any} error The exception contained in the notification.
   * @returns {Notification} The OnError notification containing the exception.
   */
  var notificationCreateOnError = Notification.createOnError = (function () {
    function _accept (onNext, onError) { return onError(this.exception); }
    function _acceptObservable(observer) { return observer.onError(this.exception); }
    function toString () { return 'OnError(' + this.exception + ')'; }

    return function (e) {
      return new Notification('E', null, e, _accept, _acceptObservable, toString);
    };
  }());

  /**
   * Creates an object that represents an OnCompleted notification to an observer.
   * @returns {Notification} The OnCompleted notification.
   */
  var notificationCreateOnCompleted = Notification.createOnCompleted = (function () {
    function _accept (onNext, onError, onCompleted) { return onCompleted(); }
    function _acceptObservable(observer) { return observer.onCompleted(); }
    function toString () { return 'OnCompleted()'; }

    return function () {
      return new Notification('C', null, null, _accept, _acceptObservable, toString);
    };
  }());

  /**
   * Supports push-style iteration over an observable sequence.
   */
  var Observer = Rx.Observer = function () { };

  /**
   *  Creates a notification callback from an observer.
   * @returns The action that forwards its input notification to the underlying observer.
   */
  Observer.prototype.toNotifier = function () {
    var observer = this;
    return function (n) { return n.accept(observer); };
  };

  /**
   *  Hides the identity of an observer.
   * @returns An observer that hides the identity of the specified observer.
   */
  Observer.prototype.asObserver = function () {
    return new AnonymousObserver(this.onNext.bind(this), this.onError.bind(this), this.onCompleted.bind(this));
  };

  /**
   *  Checks access to the observer for grammar violations. This includes checking for multiple OnError or OnCompleted calls, as well as reentrancy in any of the observer methods.
   *  If a violation is detected, an Error is thrown from the offending observer method call.
   * @returns An observer that checks callbacks invocations against the observer grammar and, if the checks pass, forwards those to the specified observer.
   */
  Observer.prototype.checked = function () { return new CheckedObserver(this); };

  /**
   *  Creates an observer from the specified OnNext, along with optional OnError, and OnCompleted actions.
   * @param {Function} [onNext] Observer's OnNext action implementation.
   * @param {Function} [onError] Observer's OnError action implementation.
   * @param {Function} [onCompleted] Observer's OnCompleted action implementation.
   * @returns {Observer} The observer object implemented using the given actions.
   */
  var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
    onNext || (onNext = noop);
    onError || (onError = defaultError);
    onCompleted || (onCompleted = noop);
    return new AnonymousObserver(onNext, onError, onCompleted);
  };

  /**
   *  Creates an observer from a notification callback.
   *
   * @static
   * @memberOf Observer
   * @param {Function} handler Action that handles a notification.
   * @returns The observer object that invokes the specified handler using a notification corresponding to each message it receives.
   */
  Observer.fromNotifier = function (handler, thisArg) {
    return new AnonymousObserver(function (x) {
      return handler.call(thisArg, notificationCreateOnNext(x));
    }, function (e) {
      return handler.call(thisArg, notificationCreateOnError(e));
    }, function () {
      return handler.call(thisArg, notificationCreateOnCompleted());
    });
  };

  /**
   * Schedules the invocation of observer methods on the given scheduler.
   * @param {Scheduler} scheduler Scheduler to schedule observer messages on.
   * @returns {Observer} Observer whose messages are scheduled on the given scheduler.
   */
  Observer.prototype.notifyOn = function (scheduler) {
    return new ObserveOnObserver(scheduler, this);
  };

  Observer.prototype.makeSafe = function(disposable) {
    return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
  };

  /**
   * Abstract base class for implementations of the Observer class.
   * This base class enforces the grammar of observers where OnError and OnCompleted are terminal messages.
   */
  var AbstractObserver = Rx.internals.AbstractObserver = (function (__super__) {
    inherits(AbstractObserver, __super__);

    /**
     * Creates a new observer in a non-stopped state.
     */
    function AbstractObserver() {
      this.isStopped = false;
      __super__.call(this);
    }

    // Must be implemented by other observers
    AbstractObserver.prototype.next = notImplemented;
    AbstractObserver.prototype.error = notImplemented;
    AbstractObserver.prototype.completed = notImplemented;

    /**
     * Notifies the observer of a new element in the sequence.
     * @param {Any} value Next element in the sequence.
     */
    AbstractObserver.prototype.onNext = function (value) {
      if (!this.isStopped) { this.next(value); }
    };

    /**
     * Notifies the observer that an exception has occurred.
     * @param {Any} error The error that has occurred.
     */
    AbstractObserver.prototype.onError = function (error) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.error(error);
      }
    };

    /**
     * Notifies the observer of the end of the sequence.
     */
    AbstractObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.completed();
      }
    };

    /**
     * Disposes the observer, causing it to transition to the stopped state.
     */
    AbstractObserver.prototype.dispose = function () {
      this.isStopped = true;
    };

    AbstractObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.error(e);
        return true;
      }

      return false;
    };

    return AbstractObserver;
  }(Observer));

  /**
   * Class to create an Observer instance from delegate-based implementations of the on* methods.
   */
  var AnonymousObserver = Rx.AnonymousObserver = (function (__super__) {
    inherits(AnonymousObserver, __super__);

    /**
     * Creates an observer from the specified OnNext, OnError, and OnCompleted actions.
     * @param {Any} onNext Observer's OnNext action implementation.
     * @param {Any} onError Observer's OnError action implementation.
     * @param {Any} onCompleted Observer's OnCompleted action implementation.
     */
    function AnonymousObserver(onNext, onError, onCompleted) {
      __super__.call(this);
      this._onNext = onNext;
      this._onError = onError;
      this._onCompleted = onCompleted;
    }

    /**
     * Calls the onNext action.
     * @param {Any} value Next element in the sequence.
     */
    AnonymousObserver.prototype.next = function (value) {
      this._onNext(value);
    };

    /**
     * Calls the onError action.
     * @param {Any} error The error that has occurred.
     */
    AnonymousObserver.prototype.error = function (error) {
      this._onError(error);
    };

    /**
     *  Calls the onCompleted action.
     */
    AnonymousObserver.prototype.completed = function () {
      this._onCompleted();
    };

    return AnonymousObserver;
  }(AbstractObserver));

  var CheckedObserver = (function (__super__) {
    inherits(CheckedObserver, __super__);

    function CheckedObserver(observer) {
      __super__.call(this);
      this._observer = observer;
      this._state = 0; // 0 - idle, 1 - busy, 2 - done
    }

    var CheckedObserverPrototype = CheckedObserver.prototype;

    CheckedObserverPrototype.onNext = function (value) {
      this.checkAccess();
      var res = tryCatch(this._observer.onNext).call(this._observer, value);
      this._state = 0;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.onError = function (err) {
      this.checkAccess();
      var res = tryCatch(this._observer.onError).call(this._observer, err);
      this._state = 2;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.onCompleted = function () {
      this.checkAccess();
      var res = tryCatch(this._observer.onCompleted).call(this._observer);
      this._state = 2;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.checkAccess = function () {
      if (this._state === 1) { throw new Error('Re-entrancy detected'); }
      if (this._state === 2) { throw new Error('Observer completed'); }
      if (this._state === 0) { this._state = 1; }
    };

    return CheckedObserver;
  }(Observer));

  var ScheduledObserver = Rx.internals.ScheduledObserver = (function (__super__) {
    inherits(ScheduledObserver, __super__);

    function ScheduledObserver(scheduler, observer) {
      __super__.call(this);
      this.scheduler = scheduler;
      this.observer = observer;
      this.isAcquired = false;
      this.hasFaulted = false;
      this.queue = [];
      this.disposable = new SerialDisposable();
    }

    ScheduledObserver.prototype.next = function (value) {
      var self = this;
      this.queue.push(function () { self.observer.onNext(value); });
    };

    ScheduledObserver.prototype.error = function (e) {
      var self = this;
      this.queue.push(function () { self.observer.onError(e); });
    };

    ScheduledObserver.prototype.completed = function () {
      var self = this;
      this.queue.push(function () { self.observer.onCompleted(); });
    };

    ScheduledObserver.prototype.ensureActive = function () {
      var isOwner = false, parent = this;
      if (!this.hasFaulted && this.queue.length > 0) {
        isOwner = !this.isAcquired;
        this.isAcquired = true;
      }
      if (isOwner) {
        this.disposable.setDisposable(this.scheduler.scheduleRecursive(function (self) {
          var work;
          if (parent.queue.length > 0) {
            work = parent.queue.shift();
          } else {
            parent.isAcquired = false;
            return;
          }
          try {
            work();
          } catch (ex) {
            parent.queue = [];
            parent.hasFaulted = true;
            throw ex;
          }
          self();
        }));
      }
    };

    ScheduledObserver.prototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this.disposable.dispose();
    };

    return ScheduledObserver;
  }(AbstractObserver));

  var ObserveOnObserver = (function (__super__) {
    inherits(ObserveOnObserver, __super__);

    function ObserveOnObserver(scheduler, observer, cancel) {
      __super__.call(this, scheduler, observer);
      this._cancel = cancel;
    }

    ObserveOnObserver.prototype.next = function (value) {
      __super__.prototype.next.call(this, value);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.error = function (e) {
      __super__.prototype.error.call(this, e);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.completed = function () {
      __super__.prototype.completed.call(this);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this._cancel && this._cancel.dispose();
      this._cancel = null;
    };

    return ObserveOnObserver;
  })(ScheduledObserver);

  var observableProto;

  /**
   * Represents a push-style collection.
   */
  var Observable = Rx.Observable = (function () {

    function Observable(subscribe) {
      if (Rx.config.longStackSupport && hasStacks) {
        try {
          throw new Error();
        } catch (e) {
          this.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }

        var self = this;
        this._subscribe = function (observer) {
          var oldOnError = observer.onError.bind(observer);

          observer.onError = function (err) {
            makeStackTraceLong(err, self);
            oldOnError(err);
          };

          return subscribe.call(self, observer);
        };
      } else {
        this._subscribe = subscribe;
      }
    }

    observableProto = Observable.prototype;

    /**
     *  Subscribes an observer to the observable sequence.
     *  @param {Mixed} [observerOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.
     *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.
     *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.
     *  @returns {Diposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribe = observableProto.forEach = function (observerOrOnNext, onError, onCompleted) {
      return this._subscribe(typeof observerOrOnNext === 'object' ?
        observerOrOnNext :
        observerCreate(observerOrOnNext, onError, onCompleted));
    };

    /**
     * Subscribes to the next value in the sequence with an optional "this" argument.
     * @param {Function} onNext The function to invoke on each element in the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnNext = function (onNext, thisArg) {
      return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) { onNext.call(thisArg, x); } : onNext));
    };

    /**
     * Subscribes to an exceptional condition in the sequence with an optional "this" argument.
     * @param {Function} onError The function to invoke upon exceptional termination of the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnError = function (onError, thisArg) {
      return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) { onError.call(thisArg, e); } : onError));
    };

    /**
     * Subscribes to the next value in the sequence with an optional "this" argument.
     * @param {Function} onCompleted The function to invoke upon graceful termination of the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {
      return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() { onCompleted.call(thisArg); } : onCompleted));
    };

    return Observable;
  })();

  var ObservableBase = Rx.ObservableBase = (function (__super__) {
    inherits(ObservableBase, __super__);

    function fixSubscriber(subscriber) {
      return subscriber && isFunction(subscriber.dispose) ? subscriber :
        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
    }

    function setDisposable(s, state) {
      var ado = state[0], self = state[1];
      var sub = tryCatch(self.subscribeCore).call(self, ado);

      if (sub === errorObj) {
        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
      }
      ado.setDisposable(fixSubscriber(sub));
    }

    function subscribe(observer) {
      var ado = new AutoDetachObserver(observer), state = [ado, this];

      if (currentThreadScheduler.scheduleRequired()) {
        currentThreadScheduler.scheduleWithState(state, setDisposable);
      } else {
        setDisposable(null, state);
      }
      return ado;
    }

    function ObservableBase() {
      __super__.call(this, subscribe);
    }

    ObservableBase.prototype.subscribeCore = notImplemented;

    return ObservableBase;
  }(Observable));

  var Enumerable = Rx.internals.Enumerable = function () { };

  var ConcatEnumerableObservable = (function(__super__) {
    inherits(ConcatEnumerableObservable, __super__);
    function ConcatEnumerableObservable(sources) {
      this.sources = sources;
      __super__.call(this);
    }
    
    ConcatEnumerableObservable.prototype.subscribeCore = function (o) {
      var isDisposed, subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursiveWithState(this.sources[$iterator$](), function (e, self) {
        if (isDisposed) { return; }
        var currentItem = tryCatch(e.next).call(e);
        if (currentItem === errorObj) { return o.onError(currentItem.e); }

        if (currentItem.done) {
          return o.onCompleted();
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(currentValue.subscribe(new InnerObserver(o, self, e)));
      });

      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    };
    
    function InnerObserver(o, s, e) {
      this.o = o;
      this.s = s;
      this.e = e;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.o.onNext(x); } };
    InnerObserver.prototype.onError = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.s(this.e);
      }
    };
    InnerObserver.prototype.dispose = function () { this.isStopped = true; };
    InnerObserver.prototype.fail = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
        return true;
      }
      return false;
    };
    
    return ConcatEnumerableObservable;
  }(ObservableBase));

  Enumerable.prototype.concat = function () {
    return new ConcatEnumerableObservable(this);
  };
  
  var CatchErrorObservable = (function(__super__) {
    inherits(CatchErrorObservable, __super__);
    function CatchErrorObservable(sources) {
      this.sources = sources;
      __super__.call(this);
    }
    
    CatchErrorObservable.prototype.subscribeCore = function (o) {
      var e = this.sources[$iterator$]();

      var isDisposed, subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursiveWithState(null, function (lastException, self) {
        if (isDisposed) { return; }
        var currentItem = tryCatch(e.next).call(e);
        if (currentItem === errorObj) { return o.onError(currentItem.e); }

        if (currentItem.done) {
          return lastException !== null ? o.onError(lastException) : o.onCompleted();
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(currentValue.subscribe(
          function(x) { o.onNext(x); },
          self,
          function() { o.onCompleted(); }));
      });
      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    };
    
    return CatchErrorObservable;
  }(ObservableBase));

  Enumerable.prototype.catchError = function () {
    return new CatchErrorObservable(this);
  };

  Enumerable.prototype.catchErrorWhen = function (notificationHandler) {
    var sources = this;
    return new AnonymousObservable(function (o) {
      var exceptions = new Subject(),
        notifier = new Subject(),
        handled = notificationHandler(exceptions),
        notificationDisposable = handled.subscribe(notifier);

      var e = sources[$iterator$]();

      var isDisposed,
        lastException,
        subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursive(function (self) {
        if (isDisposed) { return; }
        var currentItem = tryCatch(e.next).call(e);
        if (currentItem === errorObj) { return o.onError(currentItem.e); }

        if (currentItem.done) {
          if (lastException) {
            o.onError(lastException);
          } else {
            o.onCompleted();
          }
          return;
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var outer = new SingleAssignmentDisposable();
        var inner = new SingleAssignmentDisposable();
        subscription.setDisposable(new CompositeDisposable(inner, outer));
        outer.setDisposable(currentValue.subscribe(
          function(x) { o.onNext(x); },
          function (exn) {
            inner.setDisposable(notifier.subscribe(self, function(ex) {
              o.onError(ex);
            }, function() {
              o.onCompleted();
            }));

            exceptions.onNext(exn);
          },
          function() { o.onCompleted(); }));
      });

      return new CompositeDisposable(notificationDisposable, subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    });
  };
  
  var RepeatEnumerable = (function (__super__) {
    inherits(RepeatEnumerable, __super__);
    
    function RepeatEnumerable(v, c) {
      this.v = v;
      this.c = c == null ? -1 : c;
    }
    RepeatEnumerable.prototype[$iterator$] = function () {
      return new RepeatEnumerator(this); 
    };
    
    function RepeatEnumerator(p) {
      this.v = p.v;
      this.l = p.c;
    }
    RepeatEnumerator.prototype.next = function () {
      if (this.l === 0) { return doneEnumerator; }
      if (this.l > 0) { this.l--; }
      return { done: false, value: this.v }; 
    };
    
    return RepeatEnumerable;
  }(Enumerable));

  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
    return new RepeatEnumerable(value, repeatCount);
  };
  
  var OfEnumerable = (function(__super__) {
    inherits(OfEnumerable, __super__);
    function OfEnumerable(s, fn, thisArg) {
      this.s = s;
      this.fn = fn ? bindCallback(fn, thisArg, 3) : null;
    }
    OfEnumerable.prototype[$iterator$] = function () {
      return new OfEnumerator(this);
    };
    
    function OfEnumerator(p) {
      this.i = -1;
      this.s = p.s;
      this.l = this.s.length;
      this.fn = p.fn;
    }
    OfEnumerator.prototype.next = function () {
     return ++this.i < this.l ?
       { done: false, value: !this.fn ? this.s[this.i] : this.fn(this.s[this.i], this.i, this.s) } :
       doneEnumerator; 
    };
    
    return OfEnumerable;
  }(Enumerable));

  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
    return new OfEnumerable(source, selector, thisArg);
  };

   /**
   *  Wraps the source sequence in order to run its observer callbacks on the specified scheduler.
   *
   *  This only invokes observer callbacks on a scheduler. In case the subscription and/or unsubscription actions have side-effects
   *  that require to be run on a scheduler, use subscribeOn.
   *
   *  @param {Scheduler} scheduler Scheduler to notify observers on.
   *  @returns {Observable} The source sequence whose observations happen on the specified scheduler.
   */
  observableProto.observeOn = function (scheduler) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      return source.subscribe(new ObserveOnObserver(scheduler, observer));
    }, source);
  };

   /**
   *  Wraps the source sequence in order to run its subscription and unsubscription logic on the specified scheduler. This operation is not commonly used;
   *  see the remarks section for more information on the distinction between subscribeOn and observeOn.

   *  This only performs the side-effects of subscription and unsubscription on the specified scheduler. In order to invoke observer
   *  callbacks on a scheduler, use observeOn.

   *  @param {Scheduler} scheduler Scheduler to perform subscription and unsubscription actions on.
   *  @returns {Observable} The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.
   */
  observableProto.subscribeOn = function (scheduler) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var m = new SingleAssignmentDisposable(), d = new SerialDisposable();
      d.setDisposable(m);
      m.setDisposable(scheduler.schedule(function () {
        d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(observer)));
      }));
      return d;
    }, source);
  };

	var FromPromiseObservable = (function(__super__) {
		inherits(FromPromiseObservable, __super__);
		function FromPromiseObservable(p) {
			this.p = p;
			__super__.call(this);
		}
		
		FromPromiseObservable.prototype.subscribeCore = function(o) {
			this.p.then(function (data) {
				o.onNext(data);
				o.onCompleted();
			}, function (err) { o.onError(err); });
			return disposableEmpty;	
		};
		
		return FromPromiseObservable;
	}(ObservableBase));	 
	 
	 /**
	 * Converts a Promise to an Observable sequence
	 * @param {Promise} An ES6 Compliant promise.
	 * @returns {Observable} An Observable sequence which wraps the existing promise success and failure.
	 */
	var observableFromPromise = Observable.fromPromise = function (promise) {
		return new FromPromiseObservable(promise);
	};
  /*
   * Converts an existing observable sequence to an ES6 Compatible Promise
   * @example
   * var promise = Rx.Observable.return(42).toPromise(RSVP.Promise);
   *
   * // With config
   * Rx.config.Promise = RSVP.Promise;
   * var promise = Rx.Observable.return(42).toPromise();
   * @param {Function} [promiseCtor] The constructor of the promise. If not provided, it looks for it in Rx.config.Promise.
   * @returns {Promise} An ES6 compatible promise with the last value from the observable sequence.
   */
  observableProto.toPromise = function (promiseCtor) {
    promiseCtor || (promiseCtor = Rx.config.Promise);
    if (!promiseCtor) { throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise'); }
    var source = this;
    return new promiseCtor(function (resolve, reject) {
      // No cancellation can be done
      var value, hasValue = false;
      source.subscribe(function (v) {
        value = v;
        hasValue = true;
      }, reject, function () {
        hasValue && resolve(value);
      });
    });
  };

  var ToArrayObservable = (function(__super__) {
    inherits(ToArrayObservable, __super__);
    function ToArrayObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    ToArrayObservable.prototype.subscribeCore = function(o) {
      return this.source.subscribe(new InnerObserver(o));
    };

    function InnerObserver(o) {
      this.o = o;
      this.a = [];
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.a.push(x); } };
    InnerObserver.prototype.onError = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onNext(this.a);
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function () { this.isStopped = true; }
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
 
      return false;
    };

    return ToArrayObservable;
  }(ObservableBase));

  /**
  * Creates an array from an observable sequence.
  * @returns {Observable} An observable sequence containing a single element with a list containing all the elements of the source sequence.
  */
  observableProto.toArray = function () {
    return new ToArrayObservable(this);
  };

  /**
   *  Creates an observable sequence from a specified subscribe method implementation.
   * @example
   *  var res = Rx.Observable.create(function (observer) { return function () { } );
   *  var res = Rx.Observable.create(function (observer) { return Rx.Disposable.empty; } );
   *  var res = Rx.Observable.create(function (observer) { } );
   * @param {Function} subscribe Implementation of the resulting observable sequence's subscribe method, returning a function that will be wrapped in a Disposable.
   * @returns {Observable} The observable sequence with the specified implementation for the Subscribe method.
   */
  Observable.create = Observable.createWithDisposable = function (subscribe, parent) {
    return new AnonymousObservable(subscribe, parent);
  };

  /**
   *  Returns an observable sequence that invokes the specified factory function whenever a new observer subscribes.
   *
   * @example
   *  var res = Rx.Observable.defer(function () { return Rx.Observable.fromArray([1,2,3]); });
   * @param {Function} observableFactory Observable factory function to invoke for each observer that subscribes to the resulting sequence or Promise.
   * @returns {Observable} An observable sequence whose observers trigger an invocation of the given observable factory function.
   */
  var observableDefer = Observable.defer = function (observableFactory) {
    return new AnonymousObservable(function (observer) {
      var result;
      try {
        result = observableFactory();
      } catch (e) {
        return observableThrow(e).subscribe(observer);
      }
      isPromise(result) && (result = observableFromPromise(result));
      return result.subscribe(observer);
    });
  };

  var EmptyObservable = (function(__super__) {
    inherits(EmptyObservable, __super__);
    function EmptyObservable(scheduler) {
      this.scheduler = scheduler;
      __super__.call(this);
    }

    EmptyObservable.prototype.subscribeCore = function (observer) {
      var sink = new EmptySink(observer, this);
      return sink.run();
    };

    function EmptySink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    function scheduleItem(s, state) {
      state.onCompleted();
    }

    EmptySink.prototype.run = function () {
      return this.parent.scheduler.scheduleWithState(this.observer, scheduleItem);
    };

    return EmptyObservable;
  }(ObservableBase));

  /**
   *  Returns an empty observable sequence, using the specified scheduler to send out the single OnCompleted message.
   *
   * @example
   *  var res = Rx.Observable.empty();
   *  var res = Rx.Observable.empty(Rx.Scheduler.timeout);
   * @param {Scheduler} [scheduler] Scheduler to send the termination call on.
   * @returns {Observable} An observable sequence with no elements.
   */
  var observableEmpty = Observable.empty = function (scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new EmptyObservable(scheduler);
  };

  var FromObservable = (function(__super__) {
    inherits(FromObservable, __super__);
    function FromObservable(iterable, mapper, scheduler) {
      this.iterable = iterable;
      this.mapper = mapper;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    FromObservable.prototype.subscribeCore = function (observer) {
      var sink = new FromSink(observer, this);
      return sink.run();
    };

    return FromObservable;
  }(ObservableBase));

  var FromSink = (function () {
    function FromSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    FromSink.prototype.run = function () {
      var list = Object(this.parent.iterable),
          it = getIterable(list),
          observer = this.observer,
          mapper = this.parent.mapper;

      function loopRecursive(i, recurse) {
        try {
          var next = it.next();
        } catch (e) {
          return observer.onError(e);
        }
        if (next.done) {
          return observer.onCompleted();
        }

        var result = next.value;

        if (mapper) {
          try {
            result = mapper(result, i);
          } catch (e) {
            return observer.onError(e);
          }
        }

        observer.onNext(result);
        recurse(i + 1);
      }

      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
    };

    return FromSink;
  }());

  var maxSafeInteger = Math.pow(2, 53) - 1;

  function StringIterable(str) {
    this._s = s;
  }

  StringIterable.prototype[$iterator$] = function () {
    return new StringIterator(this._s);
  };

  function StringIterator(str) {
    this._s = s;
    this._l = s.length;
    this._i = 0;
  }

  StringIterator.prototype[$iterator$] = function () {
    return this;
  };

  StringIterator.prototype.next = function () {
    return this._i < this._l ? { done: false, value: this._s.charAt(this._i++) } : doneEnumerator;
  };

  function ArrayIterable(a) {
    this._a = a;
  }

  ArrayIterable.prototype[$iterator$] = function () {
    return new ArrayIterator(this._a);
  };

  function ArrayIterator(a) {
    this._a = a;
    this._l = toLength(a);
    this._i = 0;
  }

  ArrayIterator.prototype[$iterator$] = function () {
    return this;
  };

  ArrayIterator.prototype.next = function () {
    return this._i < this._l ? { done: false, value: this._a[this._i++] } : doneEnumerator;
  };

  function numberIsFinite(value) {
    return typeof value === 'number' && root.isFinite(value);
  }

  function isNan(n) {
    return n !== n;
  }

  function getIterable(o) {
    var i = o[$iterator$], it;
    if (!i && typeof o === 'string') {
      it = new StringIterable(o);
      return it[$iterator$]();
    }
    if (!i && o.length !== undefined) {
      it = new ArrayIterable(o);
      return it[$iterator$]();
    }
    if (!i) { throw new TypeError('Object is not iterable'); }
    return o[$iterator$]();
  }

  function sign(value) {
    var number = +value;
    if (number === 0) { return number; }
    if (isNaN(number)) { return number; }
    return number < 0 ? -1 : 1;
  }

  function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) { return 0; }
    if (len === 0 || !numberIsFinite(len)) { return len; }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) { return 0; }
    if (len > maxSafeInteger) { return maxSafeInteger; }
    return len;
  }

  /**
  * This method creates a new Observable sequence from an array-like or iterable object.
  * @param {Any} arrayLike An array-like or iterable object to convert to an Observable sequence.
  * @param {Function} [mapFn] Map function to call on every element of the array.
  * @param {Any} [thisArg] The context to use calling the mapFn if provided.
  * @param {Scheduler} [scheduler] Optional scheduler to use for scheduling.  If not provided, defaults to Scheduler.currentThread.
  */
  var observableFrom = Observable.from = function (iterable, mapFn, thisArg, scheduler) {
    if (iterable == null) {
      throw new Error('iterable cannot be null.')
    }
    if (mapFn && !isFunction(mapFn)) {
      throw new Error('mapFn when provided must be a function');
    }
    if (mapFn) {
      var mapper = bindCallback(mapFn, thisArg, 2);
    }
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromObservable(iterable, mapper, scheduler);
  }

  var FromArrayObservable = (function(__super__) {
    inherits(FromArrayObservable, __super__);
    function FromArrayObservable(args, scheduler) {
      this.args = args;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    FromArrayObservable.prototype.subscribeCore = function (observer) {
      var sink = new FromArraySink(observer, this);
      return sink.run();
    };

    return FromArrayObservable;
  }(ObservableBase));

  function FromArraySink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  FromArraySink.prototype.run = function () {
    var observer = this.observer, args = this.parent.args, len = args.length;
    function loopRecursive(i, recurse) {
      if (i < len) {
        observer.onNext(args[i]);
        recurse(i + 1);
      } else {
        observer.onCompleted();
      }
    }

    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
  };

  /**
  *  Converts an array to an observable sequence, using an optional scheduler to enumerate the array.
  * @deprecated use Observable.from or Observable.of
  * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
  * @returns {Observable} The observable sequence whose elements are pulled from the given enumerable sequence.
  */
  var observableFromArray = Observable.fromArray = function (array, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromArrayObservable(array, scheduler)
  };

  /**
   *  Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
   *
   * @example
   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; });
   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; }, Rx.Scheduler.timeout);
   * @param {Mixed} initialState Initial state.
   * @param {Function} condition Condition to terminate generation (upon returning false).
   * @param {Function} iterate Iteration step function.
   * @param {Function} resultSelector Selector function for results produced in the sequence.
   * @param {Scheduler} [scheduler] Scheduler on which to run the generator loop. If not provided, defaults to Scheduler.currentThread.
   * @returns {Observable} The generated sequence.
   */
  Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new AnonymousObservable(function (o) {
      var first = true;
      return scheduler.scheduleRecursiveWithState(initialState, function (state, self) {
        var hasResult, result;
        try {
          if (first) {
            first = false;
          } else {
            state = iterate(state);
          }
          hasResult = condition(state);
          hasResult && (result = resultSelector(state));
        } catch (e) {
          return o.onError(e);
        }
        if (hasResult) {
          o.onNext(result);
          self(state);
        } else {
          o.onCompleted();
        }
      });
    });
  };

  var NeverObservable = (function(__super__) {
    inherits(NeverObservable, __super__);
    function NeverObservable() {
      __super__.call(this);
    }

    NeverObservable.prototype.subscribeCore = function (observer) {
      return disposableEmpty;
    };

    return NeverObservable;
  }(ObservableBase));

  /**
   * Returns a non-terminating observable sequence, which can be used to denote an infinite duration (e.g. when using reactive joins).
   * @returns {Observable} An observable sequence whose observers will never get called.
   */
  var observableNever = Observable.never = function () {
    return new NeverObservable();
  };

  function observableOf (scheduler, array) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromArrayObservable(array, scheduler);
  }

  /**
  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
  */
  Observable.of = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    return new FromArrayObservable(args, currentThreadScheduler);
  };

  /**
  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
  * @param {Scheduler} scheduler A scheduler to use for scheduling the arguments.
  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
  */
  Observable.ofWithScheduler = function (scheduler) {
    var len = arguments.length, args = new Array(len - 1);
    for(var i = 1; i < len; i++) { args[i - 1] = arguments[i]; }
    return new FromArrayObservable(args, scheduler);
  };

  var PairsObservable = (function(__super__) {
    inherits(PairsObservable, __super__);
    function PairsObservable(obj, scheduler) {
      this.obj = obj;
      this.keys = Object.keys(obj);
      this.scheduler = scheduler;
      __super__.call(this);
    }

    PairsObservable.prototype.subscribeCore = function (observer) {
      var sink = new PairsSink(observer, this);
      return sink.run();
    };

    return PairsObservable;
  }(ObservableBase));

  function PairsSink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  PairsSink.prototype.run = function () {
    var observer = this.observer, obj = this.parent.obj, keys = this.parent.keys, len = keys.length;
    function loopRecursive(i, recurse) {
      if (i < len) {
        var key = keys[i];
        observer.onNext([key, obj[key]]);
        recurse(i + 1);
      } else {
        observer.onCompleted();
      }
    }

    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
  };

  /**
   * Convert an object into an observable sequence of [key, value] pairs.
   * @param {Object} obj The object to inspect.
   * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
   * @returns {Observable} An observable sequence of [key, value] pairs from the object.
   */
  Observable.pairs = function (obj, scheduler) {
    scheduler || (scheduler = currentThreadScheduler);
    return new PairsObservable(obj, scheduler);
  };

    var RangeObservable = (function(__super__) {
    inherits(RangeObservable, __super__);
    function RangeObservable(start, count, scheduler) {
      this.start = start;
      this.rangeCount = count;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    RangeObservable.prototype.subscribeCore = function (observer) {
      var sink = new RangeSink(observer, this);
      return sink.run();
    };

    return RangeObservable;
  }(ObservableBase));

  var RangeSink = (function () {
    function RangeSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    RangeSink.prototype.run = function () {
      var start = this.parent.start, count = this.parent.rangeCount, observer = this.observer;
      function loopRecursive(i, recurse) {
        if (i < count) {
          observer.onNext(start + i);
          recurse(i + 1);
        } else {
          observer.onCompleted();
        }
      }

      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
    };

    return RangeSink;
  }());

  /**
  *  Generates an observable sequence of integral numbers within a specified range, using the specified scheduler to send out observer messages.
  * @param {Number} start The value of the first integer in the sequence.
  * @param {Number} count The number of sequential integers to generate.
  * @param {Scheduler} [scheduler] Scheduler to run the generator loop on. If not specified, defaults to Scheduler.currentThread.
  * @returns {Observable} An observable sequence that contains a range of sequential integral numbers.
  */
  Observable.range = function (start, count, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new RangeObservable(start, count, scheduler);
  };

  var RepeatObservable = (function(__super__) {
    inherits(RepeatObservable, __super__);
    function RepeatObservable(value, repeatCount, scheduler) {
      this.value = value;
      this.repeatCount = repeatCount == null ? -1 : repeatCount;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    RepeatObservable.prototype.subscribeCore = function (observer) {
      var sink = new RepeatSink(observer, this);
      return sink.run();
    };

    return RepeatObservable;
  }(ObservableBase));

  function RepeatSink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  RepeatSink.prototype.run = function () {
    var observer = this.observer, value = this.parent.value;
    function loopRecursive(i, recurse) {
      if (i === -1 || i > 0) {
        observer.onNext(value);
        i > 0 && i--;
      }
      if (i === 0) { return observer.onCompleted(); }
      recurse(i);
    }

    return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount, loopRecursive);
  };

  /**
   *  Generates an observable sequence that repeats the given element the specified number of times, using the specified scheduler to send out observer messages.
   * @param {Mixed} value Element to repeat.
   * @param {Number} repeatCount [Optiona] Number of times to repeat the element. If not specified, repeats indefinitely.
   * @param {Scheduler} scheduler Scheduler to run the producer loop on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} An observable sequence that repeats the given element the specified number of times.
   */
  Observable.repeat = function (value, repeatCount, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new RepeatObservable(value, repeatCount, scheduler);
  };

  var JustObservable = (function(__super__) {
    inherits(JustObservable, __super__);
    function JustObservable(value, scheduler) {
      this.value = value;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    JustObservable.prototype.subscribeCore = function (observer) {
      var sink = new JustSink(observer, this);
      return sink.run();
    };

    function JustSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    function scheduleItem(s, state) {
      var value = state[0], observer = state[1];
      observer.onNext(value);
      observer.onCompleted();
    }

    JustSink.prototype.run = function () {
      return this.parent.scheduler.scheduleWithState([this.parent.value, this.observer], scheduleItem);
    };

    return JustObservable;
  }(ObservableBase));

  /**
   *  Returns an observable sequence that contains a single element, using the specified scheduler to send out observer messages.
   *  There is an alias called 'just' or browsers <IE9.
   * @param {Mixed} value Single element in the resulting observable sequence.
   * @param {Scheduler} scheduler Scheduler to send the single element on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} An observable sequence containing the single specified element.
   */
  var observableReturn = Observable['return'] = Observable.just = Observable.returnValue = function (value, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new JustObservable(value, scheduler);
  };

  var ThrowObservable = (function(__super__) {
    inherits(ThrowObservable, __super__);
    function ThrowObservable(error, scheduler) {
      this.error = error;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    ThrowObservable.prototype.subscribeCore = function (o) {
      var sink = new ThrowSink(o, this);
      return sink.run();
    };

    function ThrowSink(o, p) {
      this.o = o;
      this.p = p;
    }

    function scheduleItem(s, state) {
      var e = state[0], o = state[1];
      o.onError(e);
    }

    ThrowSink.prototype.run = function () {
      return this.p.scheduler.scheduleWithState([this.p.error, this.o], scheduleItem);
    };

    return ThrowObservable;
  }(ObservableBase));

  /**
   *  Returns an observable sequence that terminates with an exception, using the specified scheduler to send out the single onError message.
   *  There is an alias to this method called 'throwError' for browsers <IE9.
   * @param {Mixed} error An object used for the sequence's termination.
   * @param {Scheduler} scheduler Scheduler to send the exceptional termination call on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} The observable sequence that terminates exceptionally with the specified exception object.
   */
  var observableThrow = Observable['throw'] = Observable.throwError = Observable.throwException = function (error, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new ThrowObservable(error, scheduler);
  };

  /**
   * Constructs an observable sequence that depends on a resource object, whose lifetime is tied to the resulting observable sequence's lifetime.
   * @param {Function} resourceFactory Factory function to obtain a resource object.
   * @param {Function} observableFactory Factory function to obtain an observable sequence that depends on the obtained resource.
   * @returns {Observable} An observable sequence whose lifetime controls the lifetime of the dependent resource object.
   */
  Observable.using = function (resourceFactory, observableFactory) {
    return new AnonymousObservable(function (observer) {
      var disposable = disposableEmpty, resource, source;
      try {
        resource = resourceFactory();
        resource && (disposable = resource);
        source = observableFactory(resource);
      } catch (exception) {
        return new CompositeDisposable(observableThrow(exception).subscribe(observer), disposable);
      }
      return new CompositeDisposable(source.subscribe(observer), disposable);
    });
  };

  /**
   * Propagates the observable sequence or Promise that reacts first.
   * @param {Observable} rightSource Second observable sequence or Promise.
   * @returns {Observable} {Observable} An observable sequence that surfaces either of the given sequences, whichever reacted first.
   */
  observableProto.amb = function (rightSource) {
    var leftSource = this;
    return new AnonymousObservable(function (observer) {
      var choice,
        leftChoice = 'L', rightChoice = 'R',
        leftSubscription = new SingleAssignmentDisposable(),
        rightSubscription = new SingleAssignmentDisposable();

      isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));

      function choiceL() {
        if (!choice) {
          choice = leftChoice;
          rightSubscription.dispose();
        }
      }

      function choiceR() {
        if (!choice) {
          choice = rightChoice;
          leftSubscription.dispose();
        }
      }

      leftSubscription.setDisposable(leftSource.subscribe(function (left) {
        choiceL();
        choice === leftChoice && observer.onNext(left);
      }, function (err) {
        choiceL();
        choice === leftChoice && observer.onError(err);
      }, function () {
        choiceL();
        choice === leftChoice && observer.onCompleted();
      }));

      rightSubscription.setDisposable(rightSource.subscribe(function (right) {
        choiceR();
        choice === rightChoice && observer.onNext(right);
      }, function (err) {
        choiceR();
        choice === rightChoice && observer.onError(err);
      }, function () {
        choiceR();
        choice === rightChoice && observer.onCompleted();
      }));

      return new CompositeDisposable(leftSubscription, rightSubscription);
    });
  };

  /**
   * Propagates the observable sequence or Promise that reacts first.
   *
   * @example
   * var = Rx.Observable.amb(xs, ys, zs);
   * @returns {Observable} An observable sequence that surfaces any of the given sequences, whichever reacted first.
   */
  Observable.amb = function () {
    var acc = observableNever(), items = [];
    if (Array.isArray(arguments[0])) {
      items = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
    }

    function func(previous, current) {
      return previous.amb(current);
    }
    for (var i = 0, len = items.length; i < len; i++) {
      acc = func(acc, items[i]);
    }
    return acc;
  };

  function observableCatchHandler(source, handler) {
    return new AnonymousObservable(function (o) {
      var d1 = new SingleAssignmentDisposable(), subscription = new SerialDisposable();
      subscription.setDisposable(d1);
      d1.setDisposable(source.subscribe(function (x) { o.onNext(x); }, function (e) {
        try {
          var result = handler(e);
        } catch (ex) {
          return o.onError(ex);
        }
        isPromise(result) && (result = observableFromPromise(result));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(result.subscribe(o));
      }, function (x) { o.onCompleted(x); }));

      return subscription;
    }, source);
  }

  /**
   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
   * @example
   * 1 - xs.catchException(ys)
   * 2 - xs.catchException(function (ex) { return ys(ex); })
   * @param {Mixed} handlerOrSecond Exception handler function that returns an observable sequence given the error that occurred in the first sequence, or a second observable sequence used to produce results when an error occurred in the first sequence.
   * @returns {Observable} An observable sequence containing the first sequence's elements, followed by the elements of the handler sequence in case an exception occurred.
   */
  observableProto['catch'] = observableProto.catchError = observableProto.catchException = function (handlerOrSecond) {
    return typeof handlerOrSecond === 'function' ?
      observableCatchHandler(this, handlerOrSecond) :
      observableCatch([this, handlerOrSecond]);
  };

  /**
   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
   * @param {Array | Arguments} args Arguments or an array to use as the next sequence if an error occurs.
   * @returns {Observable} An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.
   */
  var observableCatch = Observable.catchError = Observable['catch'] = Observable.catchException = function () {
    var items = [];
    if (Array.isArray(arguments[0])) {
      items = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
    }
    return enumerableOf(items).catchError();
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
   * This can be in the form of an argument list of observables or an array.
   *
   * @example
   * 1 - obs = observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
   * 2 - obs = observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  observableProto.combineLatest = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    if (Array.isArray(args[0])) {
      args[0].unshift(this);
    } else {
      args.unshift(this);
    }
    return combineLatest.apply(this, args);
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
   *
   * @example
   * 1 - obs = Rx.Observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
   * 2 - obs = Rx.Observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  var combineLatest = Observable.combineLatest = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var resultSelector = args.pop();
    Array.isArray(args[0]) && (args = args[0]);

    return new AnonymousObservable(function (o) {
      var n = args.length,
        falseFactory = function () { return false; },
        hasValue = arrayInitialize(n, falseFactory),
        hasValueAll = false,
        isDone = arrayInitialize(n, falseFactory),
        values = new Array(n);

      function next(i) {
        hasValue[i] = true;
        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
          try {
            var res = resultSelector.apply(null, values);
          } catch (e) {
            return o.onError(e);
          }
          o.onNext(res);
        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
          o.onCompleted();
        }
      }

      function done (i) {
        isDone[i] = true;
        isDone.every(identity) && o.onCompleted();
      }

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var source = args[i], sad = new SingleAssignmentDisposable();
          isPromise(source) && (source = observableFromPromise(source));
          sad.setDisposable(source.subscribe(function (x) {
              values[i] = x;
              next(i);
            },
            function(e) { o.onError(e); },
            function () { done(i); }
          ));
          subscriptions[i] = sad;
        }(idx));
      }

      return new CompositeDisposable(subscriptions);
    }, this);
  };

  /**
   * Concatenates all the observable sequences.  This takes in either an array or variable arguments to concatenate.
   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
   */
  observableProto.concat = function () {
    for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
    args.unshift(this);
    return observableConcat.apply(null, args);
  };

	var ConcatObservable = (function(__super__) {
		inherits(ConcatObservable, __super__);
		function ConcatObservable(sources) {
			this.sources = sources;
			__super__.call(this);
		}
		
		ConcatObservable.prototype.subscribeCore = function(o) {
      var sink = new ConcatSink(this.sources, o);
      return sink.run();
		};
    
    function ConcatSink(sources, o) {
      this.sources = sources;
      this.o = o;
    }
    ConcatSink.prototype.run = function () {
      var isDisposed, subscription = new SerialDisposable(), sources = this.sources, length = sources.length, o = this.o;
      var cancelable = immediateScheduler.scheduleRecursiveWithState(0, function (i, self) {
        if (isDisposed) { return; }
        if (i === length) {
					return o.onCompleted();
				}
	
        // Check if promise
        var currentValue = sources[i];
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(currentValue.subscribe(
          function (x) { o.onNext(x); },
          function (e) { o.onError(e); },
          function () { self(i + 1); }
        ));
      });

      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    };
    
		
		return ConcatObservable;
	}(ObservableBase));
  
  /**
   * Concatenates all the observable sequences.
   * @param {Array | Arguments} args Arguments or an array to concat to the observable sequence.
   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
   */
  var observableConcat = Observable.concat = function () {
    var args;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      args = new Array(arguments.length);
      for(var i = 0, len = arguments.length; i < len; i++) { args[i] = arguments[i]; }
    }
    return new ConcatObservable(args);
  };

  /**
   * Concatenates an observable sequence of observable sequences.
   * @returns {Observable} An observable sequence that contains the elements of each observed inner sequence, in sequential order.
   */
  observableProto.concatAll = observableProto.concatObservable = function () {
    return this.merge(1);
  };

  var MergeObservable = (function (__super__) {
    inherits(MergeObservable, __super__);

    function MergeObservable(source, maxConcurrent) {
      this.source = source;
      this.maxConcurrent = maxConcurrent;
      __super__.call(this);
    }

    MergeObservable.prototype.subscribeCore = function(observer) {
      var g = new CompositeDisposable();
      g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
      return g;
    };

    return MergeObservable;

  }(ObservableBase));

  var MergeObserver = (function () {
    function MergeObserver(o, max, g) {
      this.o = o;
      this.max = max;
      this.g = g;
      this.done = false;
      this.q = [];
      this.activeCount = 0;
      this.isStopped = false;
    }
    MergeObserver.prototype.handleSubscribe = function (xs) {
      var sad = new SingleAssignmentDisposable();
      this.g.add(sad);
      isPromise(xs) && (xs = observableFromPromise(xs));
      sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
    };
    MergeObserver.prototype.onNext = function (innerSource) {
      if (this.isStopped) { return; }
        if(this.activeCount < this.max) {
          this.activeCount++;
          this.handleSubscribe(innerSource);
        } else {
          this.q.push(innerSource);
        }
      };
      MergeObserver.prototype.onError = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
        }
      };
      MergeObserver.prototype.onCompleted = function () {
        if (!this.isStopped) {
          this.isStopped = true;
          this.done = true;
          this.activeCount === 0 && this.o.onCompleted();
        }
      };
      MergeObserver.prototype.dispose = function() { this.isStopped = true; };
      MergeObserver.prototype.fail = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
          return true;
        }

        return false;
      };

      function InnerObserver(parent, sad) {
        this.parent = parent;
        this.sad = sad;
        this.isStopped = false;
      }
      InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.parent.o.onNext(x); } };
      InnerObserver.prototype.onError = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
        }
      };
      InnerObserver.prototype.onCompleted = function () {
        if(!this.isStopped) {
          this.isStopped = true;
          var parent = this.parent;
          parent.g.remove(this.sad);
          if (parent.q.length > 0) {
            parent.handleSubscribe(parent.q.shift());
          } else {
            parent.activeCount--;
            parent.done && parent.activeCount === 0 && parent.o.onCompleted();
          }
        }
      };
      InnerObserver.prototype.dispose = function() { this.isStopped = true; };
      InnerObserver.prototype.fail = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
          return true;
        }

        return false;
      };

      return MergeObserver;
  }());





  /**
  * Merges an observable sequence of observable sequences into an observable sequence, limiting the number of concurrent subscriptions to inner sequences.
  * Or merges two observable sequences into a single observable sequence.
  *
  * @example
  * 1 - merged = sources.merge(1);
  * 2 - merged = source.merge(otherSource);
  * @param {Mixed} [maxConcurrentOrOther] Maximum number of inner observable sequences being subscribed to concurrently or the second observable sequence.
  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
  */
  observableProto.merge = function (maxConcurrentOrOther) {
    return typeof maxConcurrentOrOther !== 'number' ?
      observableMerge(this, maxConcurrentOrOther) :
      new MergeObservable(this, maxConcurrentOrOther);
  };

  /**
   * Merges all the observable sequences into a single observable sequence.
   * The scheduler is optional and if not specified, the immediate scheduler is used.
   * @returns {Observable} The observable sequence that merges the elements of the observable sequences.
   */
  var observableMerge = Observable.merge = function () {
    var scheduler, sources = [], i, len = arguments.length;
    if (!arguments[0]) {
      scheduler = immediateScheduler;
      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
    } else if (isScheduler(arguments[0])) {
      scheduler = arguments[0];
      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
    } else {
      scheduler = immediateScheduler;
      for(i = 0; i < len; i++) { sources.push(arguments[i]); }
    }
    if (Array.isArray(sources[0])) {
      sources = sources[0];
    }
    return observableOf(scheduler, sources).mergeAll();
  };

  var CompositeError = Rx.CompositeError = function(errors) {
    this.name = "NotImplementedError";
    this.innerErrors = errors;
    this.message = 'This contains multiple errors. Check the innerErrors';
    Error.call(this);
  }
  CompositeError.prototype = Error.prototype;

  /**
  * Flattens an Observable that emits Observables into one Observable, in a way that allows an Observer to
  * receive all successfully emitted items from all of the source Observables without being interrupted by
  * an error notification from one of them.
  *
  * This behaves like Observable.prototype.mergeAll except that if any of the merged Observables notify of an
  * error via the Observer's onError, mergeDelayError will refrain from propagating that
  * error notification until all of the merged Observables have finished emitting items.
  * @param {Array | Arguments} args Arguments or an array to merge.
  * @returns {Observable} an Observable that emits all of the items emitted by the Observables emitted by the Observable
  */
  Observable.mergeDelayError = function() {
    var args;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      var len = arguments.length;
      args = new Array(len);
      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    }
    var source = observableOf(null, args);

    return new AnonymousObservable(function (o) {
      var group = new CompositeDisposable(),
        m = new SingleAssignmentDisposable(),
        isStopped = false,
        errors = [];

      function setCompletion() {
        if (errors.length === 0) {
          o.onCompleted();
        } else if (errors.length === 1) {
          o.onError(errors[0]);
        } else {
          o.onError(new CompositeError(errors));
        }
      }

      group.add(m);

      m.setDisposable(source.subscribe(
        function (innerSource) {
          var innerSubscription = new SingleAssignmentDisposable();
          group.add(innerSubscription);

          // Check for promises support
          isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

          innerSubscription.setDisposable(innerSource.subscribe(
            function (x) { o.onNext(x); },
            function (e) {
              errors.push(e);
              group.remove(innerSubscription);
              isStopped && group.length === 1 && setCompletion();
            },
            function () {
              group.remove(innerSubscription);
              isStopped && group.length === 1 && setCompletion();
          }));
        },
        function (e) {
          errors.push(e);
          isStopped = true;
          group.length === 1 && setCompletion();
        },
        function () {
          isStopped = true;
          group.length === 1 && setCompletion();
        }));
      return group;
    });
  };

  var MergeAllObservable = (function (__super__) {
    inherits(MergeAllObservable, __super__);

    function MergeAllObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    MergeAllObservable.prototype.subscribeCore = function (observer) {
      var g = new CompositeDisposable(), m = new SingleAssignmentDisposable();
      g.add(m);
      m.setDisposable(this.source.subscribe(new MergeAllObserver(observer, g)));
      return g;
    };
    
    function MergeAllObserver(o, g) {
      this.o = o;
      this.g = g;
      this.isStopped = false;
      this.done = false;
    }
    MergeAllObserver.prototype.onNext = function(innerSource) {
      if(this.isStopped) { return; }
      var sad = new SingleAssignmentDisposable();
      this.g.add(sad);

      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

      sad.setDisposable(innerSource.subscribe(new InnerObserver(this, this.g, sad)));
    };
    MergeAllObserver.prototype.onError = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
      }
    };
    MergeAllObserver.prototype.onCompleted = function () {
      if(!this.isStopped) {
        this.isStopped = true;
        this.done = true;
        this.g.length === 1 && this.o.onCompleted();
      }
    };
    MergeAllObserver.prototype.dispose = function() { this.isStopped = true; };
    MergeAllObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }

      return false;
    };

    function InnerObserver(parent, g, sad) {
      this.parent = parent;
      this.g = g;
      this.sad = sad;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) { if (!this.isStopped) { this.parent.o.onNext(x); } };
    InnerObserver.prototype.onError = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.parent.o.onError(e);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) {
        var parent = this.parent;
        this.isStopped = true;
        parent.g.remove(this.sad);
        parent.done && parent.g.length === 1 && parent.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.parent.o.onError(e);
        return true;
      }

      return false;
    };

    return MergeAllObservable;
  }(ObservableBase));

  /**
  * Merges an observable sequence of observable sequences into an observable sequence.
  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
  */
  observableProto.mergeAll = observableProto.mergeObservable = function () {
    return new MergeAllObservable(this);
  };

  /**
   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
   * @param {Observable} second Second observable sequence used to produce results after the first sequence terminates.
   * @returns {Observable} An observable sequence that concatenates the first and second sequence, even if the first sequence terminates exceptionally.
   */
  observableProto.onErrorResumeNext = function (second) {
    if (!second) { throw new Error('Second observable is required'); }
    return onErrorResumeNext([this, second]);
  };

  /**
   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
   *
   * @example
   * 1 - res = Rx.Observable.onErrorResumeNext(xs, ys, zs);
   * 1 - res = Rx.Observable.onErrorResumeNext([xs, ys, zs]);
   * @returns {Observable} An observable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
   */
  var onErrorResumeNext = Observable.onErrorResumeNext = function () {
    var sources = [];
    if (Array.isArray(arguments[0])) {
      sources = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
    }
    return new AnonymousObservable(function (observer) {
      var pos = 0, subscription = new SerialDisposable(),
      cancelable = immediateScheduler.scheduleRecursive(function (self) {
        var current, d;
        if (pos < sources.length) {
          current = sources[pos++];
          isPromise(current) && (current = observableFromPromise(current));
          d = new SingleAssignmentDisposable();
          subscription.setDisposable(d);
          d.setDisposable(current.subscribe(observer.onNext.bind(observer), self, self));
        } else {
          observer.onCompleted();
        }
      });
      return new CompositeDisposable(subscription, cancelable);
    });
  };

  /**
   * Returns the values from the source observable sequence only after the other observable sequence produces a value.
   * @param {Observable | Promise} other The observable sequence or Promise that triggers propagation of elements of the source sequence.
   * @returns {Observable} An observable sequence containing the elements of the source sequence starting from the point the other sequence triggered propagation.
   */
  observableProto.skipUntil = function (other) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var isOpen = false;
      var disposables = new CompositeDisposable(source.subscribe(function (left) {
        isOpen && o.onNext(left);
      }, function (e) { o.onError(e); }, function () {
        isOpen && o.onCompleted();
      }));

      isPromise(other) && (other = observableFromPromise(other));

      var rightSubscription = new SingleAssignmentDisposable();
      disposables.add(rightSubscription);
      rightSubscription.setDisposable(other.subscribe(function () {
        isOpen = true;
        rightSubscription.dispose();
      }, function (e) { o.onError(e); }, function () {
        rightSubscription.dispose();
      }));

      return disposables;
    }, source);
  };

  var SwitchObservable = (function(__super__) {
    inherits(SwitchObservable, __super__);
    function SwitchObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    SwitchObservable.prototype.subscribeCore = function (o) {
      var inner = new SerialDisposable(), s = this.source.subscribe(new SwitchObserver(o, inner));
      return new CompositeDisposable(s, inner);
    };

    function SwitchObserver(o, inner) {
      this.o = o;
      this.inner = inner;
      this.stopped = false;
      this.latest = 0;
      this.hasLatest = false;
      this.isStopped = false;
    }
    SwitchObserver.prototype.onNext = function (innerSource) {
      if (this.isStopped) { return; }
      var d = new SingleAssignmentDisposable(), id = ++this.latest;
      this.hasLatest = true;
      this.inner.setDisposable(d);
      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
      d.setDisposable(innerSource.subscribe(new InnerObserver(this, id)));
    };
    SwitchObserver.prototype.onError = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
      }
    };
    SwitchObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.stopped = true;
        !this.hasLatest && this.o.onCompleted();
      }
    };
    SwitchObserver.prototype.dispose = function () { this.isStopped = true; };
    SwitchObserver.prototype.fail = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    function InnerObserver(parent, id) {
      this.parent = parent;
      this.id = id;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) {
      if (this.isStopped) { return; }
      this.parent.latest === this.id && this.parent.o.onNext(x);
    };
    InnerObserver.prototype.onError = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.parent.latest === this.id && this.parent.o.onError(e);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        if (this.parent.latest === this.id) {
          this.parent.hasLatest = false;
          this.parent.isStopped && this.parent.o.onCompleted();
        }
      }
    };
    InnerObserver.prototype.dispose = function () { this.isStopped = true; }
    InnerObserver.prototype.fail = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.parent.o.onError(e);
        return true;
      }
      return false;
    };

    return SwitchObservable;
  }(ObservableBase));

  /**
  * Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
  * @returns {Observable} The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
  */
  observableProto['switch'] = observableProto.switchLatest = function () {
    return new SwitchObservable(this);
  };

  var TakeUntilObservable = (function(__super__) {
    inherits(TakeUntilObservable, __super__);

    function TakeUntilObservable(source, other) {
      this.source = source;
      this.other = isPromise(other) ? observableFromPromise(other) : other;
      __super__.call(this);
    }

    TakeUntilObservable.prototype.subscribeCore = function(o) {
      return new CompositeDisposable(
        this.source.subscribe(o),
        this.other.subscribe(new InnerObserver(o))
      );
    };

    function InnerObserver(o) {
      this.o = o;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) {
      if (this.isStopped) { return; }
      this.o.onCompleted();
    };
    InnerObserver.prototype.onError = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      !this.isStopped && (this.isStopped = true);
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    return TakeUntilObservable;
  }(ObservableBase));

  /**
   * Returns the values from the source observable sequence until the other observable sequence produces a value.
   * @param {Observable | Promise} other Observable sequence or Promise that terminates propagation of elements of the source sequence.
   * @returns {Observable} An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
   */
  observableProto.takeUntil = function (other) {
    return new TakeUntilObservable(this, other);
  };

  function falseFactory() { return false; }

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function only when the (first) source observable sequence produces an element.
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  observableProto.withLatestFrom = function () {
    var len = arguments.length, args = new Array(len)
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var resultSelector = args.pop(), source = this;
    Array.isArray(args[0]) && (args = args[0]);

    return new AnonymousObservable(function (observer) {
      var n = args.length,
        hasValue = arrayInitialize(n, falseFactory),
        hasValueAll = false,
        values = new Array(n);

      var subscriptions = new Array(n + 1);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var other = args[i], sad = new SingleAssignmentDisposable();
          isPromise(other) && (other = observableFromPromise(other));
          sad.setDisposable(other.subscribe(function (x) {
            values[i] = x;
            hasValue[i] = true;
            hasValueAll = hasValue.every(identity);
          }, function (e) { observer.onError(e); }, noop));
          subscriptions[i] = sad;
        }(idx));
      }

      var sad = new SingleAssignmentDisposable();
      sad.setDisposable(source.subscribe(function (x) {
        var allValues = [x].concat(values);
        if (!hasValueAll) { return; }
        var res = tryCatch(resultSelector).apply(null, allValues);
        if (res === errorObj) { return observer.onError(res.e); }
        observer.onNext(res);
      }, function (e) { observer.onError(e); }, function () {
        observer.onCompleted();
      }));
      subscriptions[n] = sad;

      return new CompositeDisposable(subscriptions);
    }, this);
  };

  function zipArray(second, resultSelector) {
    var first = this;
    return new AnonymousObservable(function (o) {
      var index = 0, len = second.length;
      return first.subscribe(function (left) {
        if (index < len) {
          var right = second[index++], res = tryCatch(resultSelector)(left, right);
          if (res === errorObj) { return o.onError(res.e); }
          o.onNext(res);
        } else {
          o.onCompleted();
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, first);
  }

  function falseFactory() { return false; }
  function emptyArrayFactory() { return []; }

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
   * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
   * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
   */
  observableProto.zip = function () {
    if (Array.isArray(arguments[0])) { return zipArray.apply(this, arguments); }
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

    var parent = this, resultSelector = args.pop();
    args.unshift(parent);
    return new AnonymousObservable(function (o) {
      var n = args.length,
        queues = arrayInitialize(n, emptyArrayFactory),
        isDone = arrayInitialize(n, falseFactory);

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var source = args[i], sad = new SingleAssignmentDisposable();
          isPromise(source) && (source = observableFromPromise(source));
          sad.setDisposable(source.subscribe(function (x) {
            queues[i].push(x);
            if (queues.every(function (x) { return x.length > 0; })) {
              var queuedValues = queues.map(function (x) { return x.shift(); }),
                  res = tryCatch(resultSelector).apply(parent, queuedValues);
              if (res === errorObj) { return o.onError(res.e); }
              o.onNext(res);
            } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
              o.onCompleted();
            }
          }, function (e) { o.onError(e); }, function () {
            isDone[i] = true;
            isDone.every(identity) && o.onCompleted();
          }));
          subscriptions[i] = sad;
        })(idx);
      }

      return new CompositeDisposable(subscriptions);
    }, parent);
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.
   * @param arguments Observable sources.
   * @param {Function} resultSelector Function to invoke for each series of elements at corresponding indexes in the sources.
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  Observable.zip = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var first = args.shift();
    return first.zip.apply(first, args);
  };

  function falseFactory() { return false; }
  function arrayFactory() { return []; }

  /**
   * Merges the specified observable sequences into one observable sequence by emitting a list with the elements of the observable sequences at corresponding indexes.
   * @param arguments Observable sources.
   * @returns {Observable} An observable sequence containing lists of elements at corresponding indexes.
   */
  Observable.zipArray = function () {
    var sources;
    if (Array.isArray(arguments[0])) {
      sources = arguments[0];
    } else {
      var len = arguments.length;
      sources = new Array(len);
      for(var i = 0; i < len; i++) { sources[i] = arguments[i]; }
    }
    return new AnonymousObservable(function (o) {
      var n = sources.length,
        queues = arrayInitialize(n, arrayFactory),
        isDone = arrayInitialize(n, falseFactory);

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          subscriptions[i] = new SingleAssignmentDisposable();
          subscriptions[i].setDisposable(sources[i].subscribe(function (x) {
            queues[i].push(x);
            if (queues.every(function (x) { return x.length > 0; })) {
              var res = queues.map(function (x) { return x.shift(); });
              o.onNext(res);
            } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
              return o.onCompleted();
            }
          }, function (e) { o.onError(e); }, function () {
            isDone[i] = true;
            isDone.every(identity) && o.onCompleted();
          }));
        })(idx);
      }

      return new CompositeDisposable(subscriptions);
    });
  };

  /**
   *  Hides the identity of an observable sequence.
   * @returns {Observable} An observable sequence that hides the identity of the source sequence.
   */
  observableProto.asObservable = function () {
    var source = this;
    return new AnonymousObservable(function (o) { return source.subscribe(o); }, source);
  };

  /**
   *  Projects each element of an observable sequence into zero or more buffers which are produced based on element count information.
   *
   * @example
   *  var res = xs.bufferWithCount(10);
   *  var res = xs.bufferWithCount(10, 1);
   * @param {Number} count Length of each buffer.
   * @param {Number} [skip] Number of elements to skip between creation of consecutive buffers. If not provided, defaults to the count.
   * @returns {Observable} An observable sequence of buffers.
   */
  observableProto.bufferWithCount = function (count, skip) {
    if (typeof skip !== 'number') {
      skip = count;
    }
    return this.windowWithCount(count, skip).selectMany(function (x) {
      return x.toArray();
    }).where(function (x) {
      return x.length > 0;
    });
  };

  /**
   * Dematerializes the explicit notification values of an observable sequence as implicit notifications.
   * @returns {Observable} An observable sequence exhibiting the behavior corresponding to the source sequence's notification values.
   */
  observableProto.dematerialize = function () {
    var source = this;
    return new AnonymousObservable(function (o) {
      return source.subscribe(function (x) { return x.accept(o); }, function(e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  /**
   *  Returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.
   *
   *  var obs = observable.distinctUntilChanged();
   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; });
   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; }, function (x, y) { return x === y; });
   *
   * @param {Function} [keySelector] A function to compute the comparison key for each element. If not provided, it projects the value.
   * @param {Function} [comparer] Equality comparer for computed key values. If not provided, defaults to an equality comparer function.
   * @returns {Observable} An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
   */
  observableProto.distinctUntilChanged = function (keySelector, comparer) {
    var source = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var hasCurrentKey = false, currentKey;
      return source.subscribe(function (value) {
        var key = value;
        if (keySelector) {
          key = tryCatch(keySelector)(value);
          if (key === errorObj) { return o.onError(key.e); }
        }
        if (hasCurrentKey) {
          var comparerEquals = tryCatch(comparer)(currentKey, key);
          if (comparerEquals === errorObj) { return o.onError(comparerEquals.e); }
        }
        if (!hasCurrentKey || !comparerEquals) {
          hasCurrentKey = true;
          currentKey = key;
          o.onNext(value);
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  var TapObservable = (function(__super__) {
    inherits(TapObservable,__super__);
    function TapObservable(source, observerOrOnNext, onError, onCompleted) {
      this.source = source;
      this.t = !observerOrOnNext || isFunction(observerOrOnNext) ?
        observerCreate(observerOrOnNext || noop, onError || noop, onCompleted || noop) :
        observerOrOnNext;
      __super__.call(this);
    }

    TapObservable.prototype.subscribeCore = function(o) {
      return this.source.subscribe(new InnerObserver(o, this.t));
    };

    function InnerObserver(o, t) {
      this.o = o;
      this.t = t;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function(x) {
      if (this.isStopped) { return; }
      var res = tryCatch(this.t.onNext).call(this.t, x);
      if (res === errorObj) { this.o.onError(res.e); }
      this.o.onNext(x);
    };
    InnerObserver.prototype.onError = function(err) {
      if (!this.isStopped) {
        this.isStopped = true;
        var res = tryCatch(this.t.onError).call(this.t, err);
        if (res === errorObj) { return this.o.onError(res.e); }
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        var res = tryCatch(this.t.onCompleted).call(this.t);
        if (res === errorObj) { return this.o.onError(res.e); }
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    return TapObservable;
  }(ObservableBase));

  /**
  *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
  * @param {Function | Observer} observerOrOnNext Action to invoke for each element in the observable sequence or an o.
  * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
  * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
  * @returns {Observable} The source sequence with the side-effecting behavior applied.
  */
  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
    return new TapObservable(this, observerOrOnNext, onError, onCompleted);
  };

  /**
  *  Invokes an action for each element in the observable sequence.
  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
  * @param {Function} onNext Action to invoke for each element in the observable sequence.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} The source sequence with the side-effecting behavior applied.
  */
  observableProto.doOnNext = observableProto.tapOnNext = function (onNext, thisArg) {
    return this.tap(typeof thisArg !== 'undefined' ? function (x) { onNext.call(thisArg, x); } : onNext);
  };

  /**
  *  Invokes an action upon exceptional termination of the observable sequence.
  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
  * @param {Function} onError Action to invoke upon exceptional termination of the observable sequence.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} The source sequence with the side-effecting behavior applied.
  */
  observableProto.doOnError = observableProto.tapOnError = function (onError, thisArg) {
    return this.tap(noop, typeof thisArg !== 'undefined' ? function (e) { onError.call(thisArg, e); } : onError);
  };

  /**
  *  Invokes an action upon graceful termination of the observable sequence.
  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
  * @param {Function} onCompleted Action to invoke upon graceful termination of the observable sequence.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} The source sequence with the side-effecting behavior applied.
  */
  observableProto.doOnCompleted = observableProto.tapOnCompleted = function (onCompleted, thisArg) {
    return this.tap(noop, null, typeof thisArg !== 'undefined' ? function () { onCompleted.call(thisArg); } : onCompleted);
  };

  /**
   *  Invokes a specified action after the source observable sequence terminates gracefully or exceptionally.
   * @param {Function} finallyAction Action to invoke after the source observable sequence terminates.
   * @returns {Observable} Source sequence with the action-invoking termination behavior applied.
   */
  observableProto['finally'] = observableProto.ensure = function (action) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var subscription;
      try {
        subscription = source.subscribe(observer);
      } catch (e) {
        action();
        throw e;
      }
      return disposableCreate(function () {
        try {
          subscription.dispose();
        } catch (e) {
          throw e;
        } finally {
          action();
        }
      });
    }, this);
  };

  /**
   * @deprecated use #finally or #ensure instead.
   */
  observableProto.finallyAction = function (action) {
    //deprecate('finallyAction', 'finally or ensure');
    return this.ensure(action);
  };

  var IgnoreElementsObservable = (function(__super__) {
    inherits(IgnoreElementsObservable, __super__);

    function IgnoreElementsObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    IgnoreElementsObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o));
    };

    function InnerObserver(o) {
      this.o = o;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = noop;
    InnerObserver.prototype.onError = function (err) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onError(err);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
        return true;
      }

      return false;
    };

    return IgnoreElementsObservable;
  }(ObservableBase));

  /**
   *  Ignores all elements in an observable sequence leaving only the termination messages.
   * @returns {Observable} An empty observable sequence that signals termination, successful or exceptional, of the source sequence.
   */
  observableProto.ignoreElements = function () {
    return new IgnoreElementsObservable(this);
  };

  /**
   *  Materializes the implicit notifications of an observable sequence as explicit notification values.
   * @returns {Observable} An observable sequence containing the materialized notification values from the source sequence.
   */
  observableProto.materialize = function () {
    var source = this;
    return new AnonymousObservable(function (observer) {
      return source.subscribe(function (value) {
        observer.onNext(notificationCreateOnNext(value));
      }, function (e) {
        observer.onNext(notificationCreateOnError(e));
        observer.onCompleted();
      }, function () {
        observer.onNext(notificationCreateOnCompleted());
        observer.onCompleted();
      });
    }, source);
  };

  /**
   *  Repeats the observable sequence a specified number of times. If the repeat count is not specified, the sequence repeats indefinitely.
   * @param {Number} [repeatCount]  Number of times to repeat the sequence. If not provided, repeats the sequence indefinitely.
   * @returns {Observable} The observable sequence producing the elements of the given sequence repeatedly.
   */
  observableProto.repeat = function (repeatCount) {
    return enumerableRepeat(this, repeatCount).concat();
  };

  /**
   *  Repeats the source observable sequence the specified number of times or until it successfully terminates. If the retry count is not specified, it retries indefinitely.
   *  Note if you encounter an error and want it to retry once, then you must use .retry(2);
   *
   * @example
   *  var res = retried = retry.repeat();
   *  var res = retried = retry.repeat(2);
   * @param {Number} [retryCount]  Number of times to retry the sequence. If not provided, retry the sequence indefinitely.
   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
   */
  observableProto.retry = function (retryCount) {
    return enumerableRepeat(this, retryCount).catchError();
  };

  /**
   *  Repeats the source observable sequence upon error each time the notifier emits or until it successfully terminates. 
   *  if the notifier completes, the observable sequence completes.
   *
   * @example
   *  var timer = Observable.timer(500);
   *  var source = observable.retryWhen(timer);
   * @param {Observable} [notifier] An observable that triggers the retries or completes the observable with onNext or onCompleted respectively.
   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
   */
  observableProto.retryWhen = function (notifier) {
    return enumerableRepeat(this).catchErrorWhen(notifier);
  };
  var ScanObservable = (function(__super__) {
    inherits(ScanObservable, __super__);
    function ScanObservable(source, accumulator, hasSeed, seed) {
      this.source = source;
      this.accumulator = accumulator;
      this.hasSeed = hasSeed;
      this.seed = seed;
      __super__.call(this);
    }

    ScanObservable.prototype.subscribeCore = function(observer) {
      return this.source.subscribe(new ScanObserver(observer,this));
    };

    return ScanObservable;
  }(ObservableBase));

  function ScanObserver(observer, parent) {
    this.observer = observer;
    this.accumulator = parent.accumulator;
    this.hasSeed = parent.hasSeed;
    this.seed = parent.seed;
    this.hasAccumulation = false;
    this.accumulation = null;
    this.hasValue = false;
    this.isStopped = false;
  }
  ScanObserver.prototype.onNext = function (x) {
    if (this.isStopped) { return; }
    !this.hasValue && (this.hasValue = true);
    try {
      if (this.hasAccumulation) {
        this.accumulation = this.accumulator(this.accumulation, x);
      } else {
        this.accumulation = this.hasSeed ? this.accumulator(this.seed, x) : x;
        this.hasAccumulation = true;
      }
    } catch (e) {
      return this.observer.onError(e);
    }
    this.observer.onNext(this.accumulation);
  };
  ScanObserver.prototype.onError = function (e) { 
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onError(e);
    }
  };
  ScanObserver.prototype.onCompleted = function () {
    if (!this.isStopped) {
      this.isStopped = true;
      !this.hasValue && this.hasSeed && this.observer.onNext(this.seed);
      this.observer.onCompleted();
    }
  };
  ScanObserver.prototype.dispose = function() { this.isStopped = true; };
  ScanObserver.prototype.fail = function (e) {
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onError(e);
      return true;
    }
    return false;
  };

  /**
  *  Applies an accumulator function over an observable sequence and returns each intermediate result. The optional seed value is used as the initial accumulator value.
  *  For aggregation behavior with no intermediate results, see Observable.aggregate.
  * @param {Mixed} [seed] The initial accumulator value.
  * @param {Function} accumulator An accumulator function to be invoked on each element.
  * @returns {Observable} An observable sequence containing the accumulated values.
  */
  observableProto.scan = function () {
    var hasSeed = false, seed, accumulator, source = this;
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[0];
      accumulator = arguments[1];
    } else {
      accumulator = arguments[0];
    }
    return new ScanObservable(this, accumulator, hasSeed, seed);
  };

  /**
   *  Bypasses a specified number of elements at the end of an observable sequence.
   * @description
   *  This operator accumulates a queue with a length enough to store the first `count` elements. As more elements are
   *  received, elements are taken from the front of the queue and produced on the result sequence. This causes elements to be delayed.
   * @param count Number of elements to bypass at the end of the source sequence.
   * @returns {Observable} An observable sequence containing the source sequence elements except for the bypassed ones at the end.
   */
  observableProto.skipLast = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && o.onNext(q.shift());
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Prepends a sequence of values to an observable sequence with an optional scheduler and an argument list of values to prepend.
   *  @example
   *  var res = source.startWith(1, 2, 3);
   *  var res = source.startWith(Rx.Scheduler.timeout, 1, 2, 3);
   * @param {Arguments} args The specified values to prepend to the observable sequence
   * @returns {Observable} The source sequence prepended with the specified values.
   */
  observableProto.startWith = function () {
    var values, scheduler, start = 0;
    if (!!arguments.length && isScheduler(arguments[0])) {
      scheduler = arguments[0];
      start = 1;
    } else {
      scheduler = immediateScheduler;
    }
    for(var args = [], i = start, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
    return enumerableOf([observableFromArray(args, scheduler), this]).concat();
  };

  /**
   *  Returns a specified number of contiguous elements from the end of an observable sequence.
   * @description
   *  This operator accumulates a buffer with a length enough to store elements count elements. Upon completion of
   *  the source sequence, this buffer is drained on the result sequence. This causes the elements to be delayed.
   * @param {Number} count Number of elements to take from the end of the source sequence.
   * @returns {Observable} An observable sequence containing the specified number of elements from the end of the source sequence.
   */
  observableProto.takeLast = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && q.shift();
      }, function (e) { o.onError(e); }, function () {
        while (q.length > 0) { o.onNext(q.shift()); }
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Returns an array with the specified number of contiguous elements from the end of an observable sequence.
   *
   * @description
   *  This operator accumulates a buffer with a length enough to store count elements. Upon completion of the
   *  source sequence, this buffer is produced on the result sequence.
   * @param {Number} count Number of elements to take from the end of the source sequence.
   * @returns {Observable} An observable sequence containing a single array with the specified number of elements from the end of the source sequence.
   */
  observableProto.takeLastBuffer = function (count) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && q.shift();
      }, function (e) { o.onError(e); }, function () {
        o.onNext(q);
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Projects each element of an observable sequence into zero or more windows which are produced based on element count information.
   *
   *  var res = xs.windowWithCount(10);
   *  var res = xs.windowWithCount(10, 1);
   * @param {Number} count Length of each window.
   * @param {Number} [skip] Number of elements to skip between creation of consecutive windows. If not specified, defaults to the count.
   * @returns {Observable} An observable sequence of windows.
   */
  observableProto.windowWithCount = function (count, skip) {
    var source = this;
    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count <= 0) { throw new ArgumentOutOfRangeError(); }
    skip == null && (skip = count);
    +skip || (skip = 0);
    Math.abs(skip) === Infinity && (skip = 0);

    if (skip <= 0) { throw new ArgumentOutOfRangeError(); }
    return new AnonymousObservable(function (observer) {
      var m = new SingleAssignmentDisposable(),
        refCountDisposable = new RefCountDisposable(m),
        n = 0,
        q = [];

      function createWindow () {
        var s = new Subject();
        q.push(s);
        observer.onNext(addRef(s, refCountDisposable));
      }

      createWindow();

      m.setDisposable(source.subscribe(
        function (x) {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
          var c = n - count + 1;
          c >= 0 && c % skip === 0 && q.shift().onCompleted();
          ++n % skip === 0 && createWindow();
        },
        function (e) {
          while (q.length > 0) { q.shift().onError(e); }
          observer.onError(e);
        },
        function () {
          while (q.length > 0) { q.shift().onCompleted(); }
          observer.onCompleted();
        }
      ));
      return refCountDisposable;
    }, source);
  };

  function concatMap(source, selector, thisArg) {
    var selectorFunc = bindCallback(selector, thisArg, 3);
    return source.map(function (x, i) {
      var result = selectorFunc(x, i, source);
      isPromise(result) && (result = observableFromPromise(result));
      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
      return result;
    }).concatAll();
  }

  /**
   *  One of the Following:
   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   * @example
   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); });
   *  Or:
   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
   *
   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
   *  Or:
   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   *  var res = source.concatMap(Rx.Observable.fromArray([1,2,3]));
   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the
   * source sequence onto which could be either an observable or Promise.
   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
   */
  observableProto.selectConcat = observableProto.concatMap = function (selector, resultSelector, thisArg) {
    if (isFunction(selector) && isFunction(resultSelector)) {
      return this.concatMap(function (x, i) {
        var selectorResult = selector(x, i);
        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

        return selectorResult.map(function (y, i2) {
          return resultSelector(x, y, i, i2);
        });
      });
    }
    return isFunction(selector) ?
      concatMap(this, selector, thisArg) :
      concatMap(this, function () { return selector; });
  };

  /**
   * Projects each notification of an observable sequence to an observable sequence and concats the resulting observable sequences into one observable sequence.
   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
   */
  observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
    var source = this,
        onNextFunc = bindCallback(onNext, thisArg, 2),
        onErrorFunc = bindCallback(onError, thisArg, 1),
        onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
    return new AnonymousObservable(function (observer) {
      var index = 0;
      return source.subscribe(
        function (x) {
          var result;
          try {
            result = onNextFunc(x, index++);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
        },
        function (err) {
          var result;
          try {
            result = onErrorFunc(err);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        },
        function () {
          var result;
          try {
            result = onCompletedFunc();
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        });
    }, this).concatAll();
  };

    /**
     *  Returns the elements of the specified sequence or the specified value in a singleton sequence if the sequence is empty.
     *
     *  var res = obs = xs.defaultIfEmpty();
     *  2 - obs = xs.defaultIfEmpty(false);
     *
     * @memberOf Observable#
     * @param defaultValue The value to return if the sequence is empty. If not provided, this defaults to null.
     * @returns {Observable} An observable sequence that contains the specified default value if the source is empty; otherwise, the elements of the source itself.
     */
    observableProto.defaultIfEmpty = function (defaultValue) {
      var source = this;
      defaultValue === undefined && (defaultValue = null);
      return new AnonymousObservable(function (observer) {
        var found = false;
        return source.subscribe(function (x) {
          found = true;
          observer.onNext(x);
        },
        function (e) { observer.onError(e); }, 
        function () {
          !found && observer.onNext(defaultValue);
          observer.onCompleted();
        });
      }, source);
    };

  // Swap out for Array.findIndex
  function arrayIndexOfComparer(array, item, comparer) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (comparer(array[i], item)) { return i; }
    }
    return -1;
  }

  function HashSet(comparer) {
    this.comparer = comparer;
    this.set = [];
  }
  HashSet.prototype.push = function(value) {
    var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
    retValue && this.set.push(value);
    return retValue;
  };

  /**
   *  Returns an observable sequence that contains only distinct elements according to the keySelector and the comparer.
   *  Usage of this operator should be considered carefully due to the maintenance of an internal lookup structure which can grow large.
   *
   * @example
   *  var res = obs = xs.distinct();
   *  2 - obs = xs.distinct(function (x) { return x.id; });
   *  2 - obs = xs.distinct(function (x) { return x.id; }, function (a,b) { return a === b; });
   * @param {Function} [keySelector]  A function to compute the comparison key for each element.
   * @param {Function} [comparer]  Used to compare items in the collection.
   * @returns {Observable} An observable sequence only containing the distinct elements, based on a computed key value, from the source sequence.
   */
  observableProto.distinct = function (keySelector, comparer) {
    var source = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var hashSet = new HashSet(comparer);
      return source.subscribe(function (x) {
        var key = x;

        if (keySelector) {
          try {
            key = keySelector(x);
          } catch (e) {
            o.onError(e);
            return;
          }
        }
        hashSet.push(key) && o.onNext(x);
      },
      function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  var MapObservable = (function (__super__) {
    inherits(MapObservable, __super__);

    function MapObservable(source, selector, thisArg) {
      this.source = source;
      this.selector = bindCallback(selector, thisArg, 3);
      __super__.call(this);
    }
    
    function innerMap(selector, self) {
      return function (x, i, o) { return selector.call(this, self.selector(x, i, o), i, o); }
    }

    MapObservable.prototype.internalMap = function (selector, thisArg) {
      return new MapObservable(this.source, innerMap(selector, this), thisArg);
    };

    MapObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.selector, this));
    };
    
    function InnerObserver(o, selector, source) {
      this.o = o;
      this.selector = selector;
      this.source = source;
      this.i = 0;
      this.isStopped = false;
    }
  
    InnerObserver.prototype.onNext = function(x) {
      if (this.isStopped) { return; }
      var result = tryCatch(this.selector)(x, this.i++, this.source);
      if (result === errorObj) {
        return this.o.onError(result.e);
      }
      this.o.onNext(result);
    };
    InnerObserver.prototype.onError = function (e) {
      if(!this.isStopped) { this.isStopped = true; this.o.onError(e); }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
  
      return false;
    };

    return MapObservable;

  }(ObservableBase));

  /**
  * Projects each element of an observable sequence into a new form by incorporating the element's index.
  * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source.
  */
  observableProto.map = observableProto.select = function (selector, thisArg) {
    var selectorFn = typeof selector === 'function' ? selector : function () { return selector; };
    return this instanceof MapObservable ?
      this.internalMap(selectorFn, thisArg) :
      new MapObservable(this, selectorFn, thisArg);
  };

  /**
   * Retrieves the value of a specified nested property from all elements in
   * the Observable sequence.
   * @param {Arguments} arguments The nested properties to pluck.
   * @returns {Observable} Returns a new Observable sequence of property values.
   */
  observableProto.pluck = function () {
    var args = arguments, len = arguments.length;
    if (len === 0) { throw new Error('List of properties cannot be empty.'); }
    return this.map(function (x) {
      var currentProp = x;
      for (var i = 0; i < len; i++) {
        var p = currentProp[args[i]];
        if (typeof p !== 'undefined') {
          currentProp = p;
        } else {
          return undefined;
        }
      }
      return currentProp;
    });
  };

  /**
   * Projects each notification of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
   */
  observableProto.flatMapObserver = observableProto.selectManyObserver = function (onNext, onError, onCompleted, thisArg) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var index = 0;

      return source.subscribe(
        function (x) {
          var result;
          try {
            result = onNext.call(thisArg, x, index++);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
        },
        function (err) {
          var result;
          try {
            result = onError.call(thisArg, err);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        },
        function () {
          var result;
          try {
            result = onCompleted.call(thisArg);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        });
    }, source).mergeAll();
  };

  function flatMap(source, selector, thisArg) {
    var selectorFunc = bindCallback(selector, thisArg, 3);
    return source.map(function (x, i) {
      var result = selectorFunc(x, i, source);
      isPromise(result) && (result = observableFromPromise(result));
      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
      return result;
    }).mergeAll();
  }

  /**
   *  One of the Following:
   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   * @example
   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); });
   *  Or:
   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
   *
   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
   *  Or:
   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   *  var res = source.selectMany(Rx.Observable.fromArray([1,2,3]));
   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the source sequence onto which could be either an observable or Promise.
   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
   */
  observableProto.selectMany = observableProto.flatMap = function (selector, resultSelector, thisArg) {
    if (isFunction(selector) && isFunction(resultSelector)) {
      return this.flatMap(function (x, i) {
        var selectorResult = selector(x, i);
        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

        return selectorResult.map(function (y, i2) {
          return resultSelector(x, y, i, i2);
        });
      }, thisArg);
    }
    return isFunction(selector) ?
      flatMap(this, selector, thisArg) :
      flatMap(this, function () { return selector; });
  };

  /**
   *  Projects each element of an observable sequence into a new sequence of observable sequences by incorporating the element's index and then
   *  transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
   * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source producing an Observable of Observable sequences
   *  and that at any point in time produces the elements of the most recent inner observable sequence that has been received.
   */
  observableProto.selectSwitch = observableProto.flatMapLatest = observableProto.switchMap = function (selector, thisArg) {
    return this.select(selector, thisArg).switchLatest();
  };

  var SkipObservable = (function(__super__) {
    inherits(SkipObservable, __super__);
    function SkipObservable(source, count) {
      this.source = source;
      this.skipCount = count;
      __super__.call(this);
    }
    
    SkipObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.skipCount));
    };
    
    function InnerObserver(o, c) {
      this.c = c;
      this.r = c;
      this.o = o;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) {
      if (this.isStopped) { return; }
      if (this.r <= 0) { 
        this.o.onNext(x);
      } else {
        this.r--;
      }
    };
    InnerObserver.prototype.onError = function(e) {
      if (!this.isStopped) { this.isStopped = true; this.o.onError(e); }
    };
    InnerObserver.prototype.onCompleted = function() {
      if (!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };
    
    return SkipObservable;
  }(ObservableBase));  
  
  /**
   * Bypasses a specified number of elements in an observable sequence and then returns the remaining elements.
   * @param {Number} count The number of elements to skip before returning the remaining elements.
   * @returns {Observable} An observable sequence that contains the elements that occur after the specified index in the input sequence.
   */
  observableProto.skip = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    return new SkipObservable(this, count);
  };
  /**
   *  Bypasses elements in an observable sequence as long as a specified condition is true and then returns the remaining elements.
   *  The element's index is used in the logic of the predicate function.
   *
   *  var res = source.skipWhile(function (value) { return value < 10; });
   *  var res = source.skipWhile(function (value, index) { return value < 10 || index < 10; });
   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
   */
  observableProto.skipWhile = function (predicate, thisArg) {
    var source = this,
        callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0, running = false;
      return source.subscribe(function (x) {
        if (!running) {
          try {
            running = !callback(x, i++, source);
          } catch (e) {
            o.onError(e);
            return;
          }
        }
        running && o.onNext(x);
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Returns a specified number of contiguous elements from the start of an observable sequence, using the specified scheduler for the edge case of take(0).
   *
   *  var res = source.take(5);
   *  var res = source.take(0, Rx.Scheduler.timeout);
   * @param {Number} count The number of elements to return.
   * @param {Scheduler} [scheduler] Scheduler used to produce an OnCompleted message in case <paramref name="count count</paramref> is set to 0.
   * @returns {Observable} An observable sequence that contains the specified number of elements from the start of the input sequence.
   */
  observableProto.take = function (count, scheduler) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    if (count === 0) { return observableEmpty(scheduler); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var remaining = count;
      return source.subscribe(function (x) {
        if (remaining-- > 0) {
          o.onNext(x);
          remaining <= 0 && o.onCompleted();
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Returns elements from an observable sequence as long as a specified condition is true.
   *  The element's index is used in the logic of the predicate function.
   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.
   */
  observableProto.takeWhile = function (predicate, thisArg) {
    var source = this,
        callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0, running = true;
      return source.subscribe(function (x) {
        if (running) {
          try {
            running = callback(x, i++, source);
          } catch (e) {
            o.onError(e);
            return;
          }
          if (running) {
            o.onNext(x);
          } else {
            o.onCompleted();
          }
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  var FilterObservable = (function (__super__) {
    inherits(FilterObservable, __super__);

    function FilterObservable(source, predicate, thisArg) {
      this.source = source;
      this.predicate = bindCallback(predicate, thisArg, 3);
      __super__.call(this);
    }

    FilterObservable.prototype.subscribeCore = function (o) {
      return this.source.subscribe(new InnerObserver(o, this.predicate, this));
    };
    
    function innerPredicate(predicate, self) {
      return function(x, i, o) { return self.predicate(x, i, o) && predicate.call(this, x, i, o); }
    }

    FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
      return new FilterObservable(this.source, innerPredicate(predicate, this), thisArg);
    };
    
    function InnerObserver(o, predicate, source) {
      this.o = o;
      this.predicate = predicate;
      this.source = source;
      this.i = 0;
      this.isStopped = false;
    }
  
    InnerObserver.prototype.onNext = function(x) {
      if (this.isStopped) { return; }
      var shouldYield = tryCatch(this.predicate)(x, this.i++, this.source);
      if (shouldYield === errorObj) {
        return this.o.onError(shouldYield.e);
      }
      shouldYield && this.o.onNext(x);
    };
    InnerObserver.prototype.onError = function (e) {
      if(!this.isStopped) { this.isStopped = true; this.o.onError(e); }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }
      return false;
    };

    return FilterObservable;

  }(ObservableBase));

  /**
  *  Filters the elements of an observable sequence based on a predicate by incorporating the element's index.
  * @param {Function} predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} An observable sequence that contains elements from the input sequence that satisfy the condition.
  */
  observableProto.filter = observableProto.where = function (predicate, thisArg) {
    return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) :
      new FilterObservable(this, predicate, thisArg);
  };

  /**
   * Executes a transducer to transform the observable sequence
   * @param {Transducer} transducer A transducer to execute
   * @returns {Observable} An Observable sequence containing the results from the transducer.
   */
  observableProto.transduce = function(transducer) {
    var source = this;

    function transformForObserver(o) {
      return {
        '@@transducer/init': function() {
          return o;
        },
        '@@transducer/step': function(obs, input) {
          return obs.onNext(input);
        },
        '@@transducer/result': function(obs) {
          return obs.onCompleted();
        }
      };
    }

    return new AnonymousObservable(function(o) {
      var xform = transducer(transformForObserver(o));
      return source.subscribe(
        function(v) {
          try {
            xform['@@transducer/step'](o, v);
          } catch (e) {
            o.onError(e);
          }
        },
        function (e) { o.onError(e); },
        function() { xform['@@transducer/result'](o); }
      );
    }, source);
  };

  var AnonymousObservable = Rx.AnonymousObservable = (function (__super__) {
    inherits(AnonymousObservable, __super__);

    // Fix subscriber to check for undefined or function returned to decorate as Disposable
    function fixSubscriber(subscriber) {
      return subscriber && isFunction(subscriber.dispose) ? subscriber :
        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
    }

    function setDisposable(s, state) {
      var ado = state[0], subscribe = state[1];
      var sub = tryCatch(subscribe)(ado);

      if (sub === errorObj) {
        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
      }
      ado.setDisposable(fixSubscriber(sub));
    }

    function AnonymousObservable(subscribe, parent) {
      this.source = parent;

      function s(observer) {
        var ado = new AutoDetachObserver(observer), state = [ado, subscribe];

        if (currentThreadScheduler.scheduleRequired()) {
          currentThreadScheduler.scheduleWithState(state, setDisposable);
        } else {
          setDisposable(null, state);
        }
        return ado;
      }

      __super__.call(this, s);
    }

    return AnonymousObservable;

  }(Observable));

  var AutoDetachObserver = (function (__super__) {
    inherits(AutoDetachObserver, __super__);

    function AutoDetachObserver(observer) {
      __super__.call(this);
      this.observer = observer;
      this.m = new SingleAssignmentDisposable();
    }

    var AutoDetachObserverPrototype = AutoDetachObserver.prototype;

    AutoDetachObserverPrototype.next = function (value) {
      var result = tryCatch(this.observer.onNext).call(this.observer, value);
      if (result === errorObj) {
        this.dispose();
        thrower(result.e);
      }
    };

    AutoDetachObserverPrototype.error = function (err) {
      var result = tryCatch(this.observer.onError).call(this.observer, err);
      this.dispose();
      result === errorObj && thrower(result.e);
    };

    AutoDetachObserverPrototype.completed = function () {
      var result = tryCatch(this.observer.onCompleted).call(this.observer);
      this.dispose();
      result === errorObj && thrower(result.e);
    };

    AutoDetachObserverPrototype.setDisposable = function (value) { this.m.setDisposable(value); };
    AutoDetachObserverPrototype.getDisposable = function () { return this.m.getDisposable(); };

    AutoDetachObserverPrototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this.m.dispose();
    };

    return AutoDetachObserver;
  }(AbstractObserver));

  var InnerSubscription = function (subject, observer) {
    this.subject = subject;
    this.observer = observer;
  };

  InnerSubscription.prototype.dispose = function () {
    if (!this.subject.isDisposed && this.observer !== null) {
      var idx = this.subject.observers.indexOf(this.observer);
      this.subject.observers.splice(idx, 1);
      this.observer = null;
    }
  };

  /**
   *  Represents an object that is both an observable sequence as well as an observer.
   *  Each notification is broadcasted to all subscribed observers.
   */
  var Subject = Rx.Subject = (function (__super__) {
    function subscribe(observer) {
      checkDisposed(this);
      if (!this.isStopped) {
        this.observers.push(observer);
        return new InnerSubscription(this, observer);
      }
      if (this.hasError) {
        observer.onError(this.error);
        return disposableEmpty;
      }
      observer.onCompleted();
      return disposableEmpty;
    }

    inherits(Subject, __super__);

    /**
     * Creates a subject.
     */
    function Subject() {
      __super__.call(this, subscribe);
      this.isDisposed = false,
      this.isStopped = false,
      this.observers = [];
      this.hasError = false;
    }

    addProperties(Subject.prototype, Observer.prototype, {
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () { return this.observers.length > 0; },
      /**
       * Notifies all subscribed observers about the end of the sequence.
       */
      onCompleted: function () {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onCompleted();
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the exception.
       * @param {Mixed} error The exception to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          this.error = error;
          this.hasError = true;
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onError(error);
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
       * @param {Mixed} value The value to send to all observers.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (!this.isStopped) {
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onNext(value);
          }
        }
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
      }
    });

    /**
     * Creates a subject from the specified observer and observable.
     * @param {Observer} observer The observer used to send messages to the subject.
     * @param {Observable} observable The observable used to subscribe to messages sent from the subject.
     * @returns {Subject} Subject implemented using the given observer and observable.
     */
    Subject.create = function (observer, observable) {
      return new AnonymousSubject(observer, observable);
    };

    return Subject;
  }(Observable));

  /**
   *  Represents the result of an asynchronous operation.
   *  The last value before the OnCompleted notification, or the error received through OnError, is sent to all subscribed observers.
   */
  var AsyncSubject = Rx.AsyncSubject = (function (__super__) {

    function subscribe(observer) {
      checkDisposed(this);

      if (!this.isStopped) {
        this.observers.push(observer);
        return new InnerSubscription(this, observer);
      }

      if (this.hasError) {
        observer.onError(this.error);
      } else if (this.hasValue) {
        observer.onNext(this.value);
        observer.onCompleted();
      } else {
        observer.onCompleted();
      }

      return disposableEmpty;
    }

    inherits(AsyncSubject, __super__);

    /**
     * Creates a subject that can only receive one value and that value is cached for all future observations.
     * @constructor
     */
    function AsyncSubject() {
      __super__.call(this, subscribe);

      this.isDisposed = false;
      this.isStopped = false;
      this.hasValue = false;
      this.observers = [];
      this.hasError = false;
    }

    addProperties(AsyncSubject.prototype, Observer, {
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () {
        checkDisposed(this);
        return this.observers.length > 0;
      },
      /**
       * Notifies all subscribed observers about the end of the sequence, also causing the last received value to be sent out (if any).
       */
      onCompleted: function () {
        var i, len;
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          var os = cloneArray(this.observers), len = os.length;

          if (this.hasValue) {
            for (i = 0; i < len; i++) {
              var o = os[i];
              o.onNext(this.value);
              o.onCompleted();
            }
          } else {
            for (i = 0; i < len; i++) {
              os[i].onCompleted();
            }
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the error.
       * @param {Mixed} error The Error to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          this.hasError = true;
          this.error = error;

          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onError(error);
          }

          this.observers.length = 0;
        }
      },
      /**
       * Sends a value to the subject. The last value received before successful termination will be sent to all subscribed and future observers.
       * @param {Mixed} value The value to store in the subject.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.value = value;
        this.hasValue = true;
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
        this.exception = null;
        this.value = null;
      }
    });

    return AsyncSubject;
  }(Observable));

  var AnonymousSubject = Rx.AnonymousSubject = (function (__super__) {
    inherits(AnonymousSubject, __super__);

    function subscribe(observer) {
      return this.observable.subscribe(observer);
    }

    function AnonymousSubject(observer, observable) {
      this.observer = observer;
      this.observable = observable;
      __super__.call(this, subscribe);
    }

    addProperties(AnonymousSubject.prototype, Observer.prototype, {
      onCompleted: function () {
        this.observer.onCompleted();
      },
      onError: function (error) {
        this.observer.onError(error);
      },
      onNext: function (value) {
        this.observer.onNext(value);
      }
    });

    return AnonymousSubject;
  }(Observable));

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    root.Rx = Rx;

    define(function() {
      return Rx;
    });
  } else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = Rx).Rx = Rx;
    } else {
      freeExports.Rx = Rx;
    }
  } else {
    // in a browser or Rhino
    root.Rx = Rx;
  }

  // All code before this point will be filtered from stack traces.
  var rEndingLine = captureLine();

}.call(this));

}).call(this,require(210),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"210":210}]},{},[1])(1)
});