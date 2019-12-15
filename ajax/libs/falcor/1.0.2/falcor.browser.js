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
var falcor = require(33);
var jsong = require(123);

falcor.atom = jsong.atom;
falcor.ref = jsong.ref;
falcor.error = jsong.error;
falcor.pathValue = jsong.pathValue;

falcor.HttpDataSource = require(118);

module.exports = falcor;

},{"118":118,"123":123,"33":33}],2:[function(require,module,exports){
var ModelRoot = require(4);
var ModelDataSourceAdapter = require(3);

var RequestQueue = require(43);
var ModelResponse = require(51);
var CallResponse = require(49);
var InvalidateResponse = require(50);

var ASAPScheduler = require(64);
var TimeoutScheduler = require(66);
var ImmediateScheduler = require(65);

var arrayClone = require(72);
var arraySlice = require(75);

var collectLru = require(39);
var pathSyntax = require(127);

var getSize = require(80);
var isObject = require(92);
var isPrimitive = require(94);
var isJSONEnvelope = require(90);
var isJSONGraphEnvelope = require(91);

var setCache = require(68);
var setJSONGraphs = require(67);
var jsong = require(123);
var ID = 0;
var validateInput = require(108);
var noOp = function() {};
var getCache = require(17);
var get = require(22);
var GET_VALID_INPUT = require(58);

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
 * @param {?number} options.maxSize - the maximum size of the cache. This value roughly correlates to item count (where itemCount = maxSize / 50). Each item by default is given a metadata `$size` of 50 (or its length when it's an array or string). You can get better control of falcor's memory usage by tweaking `$size`
 * @param {?number} options.maxRetries - the maximum number of times that the Model will attempt to retrieve the value from the server.
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

    if (typeof options.maxRetries === "number") {
        this._maxRetries = options.maxRetries;
    } else {
        this._maxRetries = options.maxRetries || Model.prototype._maxRetries;
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

    this._allowFromWhenceYouCame = options.allowFromWhenceYouCame ||
        options._allowFromWhenceYouCame || false;

    this._treatDataSourceErrorsAsJSONGraphErrors = options._treatDataSourceErrorsAsJSONGraphErrors || false;
    this._emitReferencesInOutput = options._emitReferencesInOutput || false;

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
Model.prototype._maxRetries = 3;
Model.prototype._collectRatio = 0.75;

/**
 * The get method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model}. The get method loads each value into a JSON object and returns in a ModelResponse.
 * @function
 * @param {...PathSet} path - the path(s) to retrieve
 * @return {ModelResponse.<JSONEnvelope>} - the requested data as JSON
 */
Model.prototype.get = require(57);

/**
 * The get method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model}. The get method loads each value into a JSON object and returns in a ModelResponse.
 * @function
 * @private
 * @param {Array.<PathSet>} paths - the path(s) to retrieve
 * @return {ModelResponse.<JSONEnvelope>} - the requested data as JSON
 */
Model.prototype._getWithPaths = require(56);

/**
 * Sets the value at one or more places in the JSONGraph model. The set method accepts one or more {@link PathValue}s, each of which is a combination of a location in the document and the value to place there.  In addition to accepting  {@link PathValue}s, the set method also returns the values after the set operation is complete.
 * @function
 * @return {ModelResponse.<JSONEnvelope>} - an {@link Observable} stream containing the values in the JSONGraph model after the set was attempted
 */
Model.prototype.set = require(60);

/**
 * The preload method retrieves several {@link Path}s or {@link PathSet}s from a {@link Model} and loads them into the Model cache.
 * @function
 * @param {...PathSet} path - the path(s) to retrieve
 * @return {ModelResponse.<JSONEnvelope>} - a ModelResponse that completes when the data has been loaded into the cache.
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

/**
 * Invokes a function in the JSON Graph.
 * @function
 * @param {Path} functionPath - the path to the function to invoke
 * @param {Array.<Object>} args - the arguments to pass to the function
 * @param {Array.<PathSet>} refPaths - the paths to retrieve from the JSON Graph References in the message returned from the function
 * @param {Array.<PathSet>} thisPaths - the paths to retrieve from function's this object after successful function execution
 * @return {ModelResponse.<JSONEnvelope> - a JSONEnvelope contains the values returned from the function
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

    return new CallResponse(this, args[0], args[1], args[2], args[3]);
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
    args = [];
    while (++argsIdx < argsLen) {
        args[argsIdx] = pathSyntax.fromPath(arguments[argsIdx]);
        if (!Array.isArray(args[argsIdx])) {
            throw new Error("Invalid argument");
        }
    }

    // creates the obs, subscribes and will throw the errors if encountered.
    (new InvalidateResponse(this, args)).
        subscribe(noOp, function(e) {
            throw e;
        });
};

/**
 * Returns a new {@link Model} bound to a location within the {@link
 * JSONGraph}. The bound location is never a {@link Reference}: any {@link
 * Reference}s encountered while resolving the bound {@link Path} are always
 * replaced with the {@link Reference}s target value. For subsequent operations
 * on the {@link Model}, all paths will be evaluated relative to the bound
 * path. Deref allows you to:
 * - Expose only a fragment of the {@link JSONGraph} to components, rather than
 *   the entire graph
 * - Hide the location of a {@link JSONGraph} fragment from components
 * - Optimize for executing multiple operations and path looksup at/below the
 *   same location in the {@link JSONGraph}
 * @method
 * @param {Object} responseObject - an object previously retrieved from the
 * Model
 * @return {Model} - the dereferenced {@link Model}
 * @example
var Model = falcor.Model;
var model = new Model({
  cache: {
    users: [
      Model.ref(["usersById", 32])
    ],
    usersById: {
      32: {
        name: "Steve",
        surname: "McGuire"
      }
    }
  }
});

model.
    get(['users', 0, 'name']).
    subscribe(function(jsonEnv) {
        var userModel = model.deref(jsonEnv.json.users[0]);
        console.log(model.getPath());
        console.log(userModel.getPath());
   });
});

// prints the following:
// []
// ["usersById", 32] - because userModel refers to target of reference at ["users", 0]
 */
Model.prototype.deref = require(6);

/**
 * A dereferenced model can become invalid when the reference from which it was
 * built has been removed/collected/expired/etc etc.  To fix the issue, a from
 * the parent request should be made (no parent, then from the root) for a valid
 * path and re-dereference performed to update what the model is bound too.
 *
 * @method
 * @private
 * @return {Boolean} - If the currently deref'd model is still considered a
 * valid deref.
 */
Model.prototype._hasValidParentReference = require(5);

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
Model.prototype.getValue = require(19);

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
Model.prototype.setValue = require(70);

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
Model.prototype._getValueSync = require(27);

/**
 * @private
 */
Model.prototype._setValueSync = require(71);

/**
 * @private
 */
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
        var out;
        if (isJSONGraphEnvelope(cacheOrJSONGraphEnvelope)) {
            out = setJSONGraphs(this, [cacheOrJSONGraphEnvelope])[0];
        } else if (isJSONEnvelope(cacheOrJSONGraphEnvelope)) {
            out = setCache(this, [cacheOrJSONGraphEnvelope])[0];
        } else if (isObject(cacheOrJSONGraphEnvelope)) {
            out = setCache(this, [{ json: cacheOrJSONGraphEnvelope }])[0];
        }

        // performs promotion without producing output.
        if (out) {
            get.getWithPathsAsPathMap(this, out, []);
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
 * Reset cache maxSize. When the new maxSize is smaller than the old force a collect.
 * @param {Number} maxSize - the new maximum cache size
 */
Model.prototype._setMaxSize = function setMaxSize(maxSize) {
    var oldMaxSize = this._maxSize;
    this._maxSize = maxSize;
    if (maxSize < oldMaxSize) {
        var modelRoot = this._root;
        var modelCache = modelRoot.cache;
        // eslint-disable-next-line no-cond-assign
        var currentVersion = modelCache.$_version;
        collectLru(modelRoot, modelRoot.expired, getSize(modelCache),
                this._maxSize, this._collectRatio, currentVersion);
    }
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
var Model = falcor.Model;
var model = new Model({
  cache: {
    users: [
      Model.ref(["usersById", 32])
    ],
    usersById: {
      32: {
        name: "Steve",
        surname: "McGuire"
      }
    }
  }
});

model.
    get(['users', 0, 'name']).
    subscribe(function(jsonEnv) {
        var userModel = model.deref(jsonEnv.json.users[0]);
        console.log(model.getPath());
        console.log(userModel.getPath());
   });
});

// prints the following:
// []
// ["usersById", 32] - because userModel refers to target of reference at ["users", 0]
 */
Model.prototype.getPath = function getPath() {
    return arrayClone(this._path);
};

/**
 * This one is actually private.  I would not use this without talking to
 * jhusain, sdesai, or michaelbpaulson (github).
 * @private
 */
Model.prototype._fromWhenceYouCame = function fromWhenceYouCame(allow) {
    return this._clone({
        _allowFromWhenceYouCame: allow === undefined ? true : allow
    });
};

Model.prototype._getBoundValue = require(16);
Model.prototype._getVersion = require(21);
Model.prototype._getValueSync = require(20);

Model.prototype._getPathValuesAsPathMap = get.getWithPathsAsPathMap;
Model.prototype._getPathValuesAsJSONG = get.getWithPathsAsJSONGraph;

Model.prototype._setPathValues = require(69);
Model.prototype._setPathMaps = require(68);
Model.prototype._setJSONGs = require(67);
Model.prototype._setCache = require(68);

Model.prototype._invalidatePathValues = require(38);
Model.prototype._invalidatePathMaps = require(37);

},{"108":108,"123":123,"127":127,"16":16,"17":17,"19":19,"20":20,"21":21,"22":22,"27":27,"3":3,"37":37,"38":38,"39":39,"4":4,"43":43,"49":49,"5":5,"50":50,"51":51,"56":56,"57":57,"58":58,"6":6,"60":60,"64":64,"65":65,"66":66,"67":67,"68":68,"69":69,"7":7,"70":70,"71":71,"72":72,"75":75,"80":80,"90":90,"91":91,"92":92,"94":94}],3:[function(require,module,exports){
function ModelDataSourceAdapter(model) {
    this._model = model._materialize().boxValues().treatErrorsAsValues();
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

},{}],4:[function(require,module,exports){
var isFunction = require(88);
var hasOwn = require(83);
var ImmediateScheduler = require(65);

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

},{"65":65,"83":83,"88":88}],5:[function(require,module,exports){
module.exports = function fromWhenceYeCame() {
    var reference = this._referenceContainer;

    // Always true when this mode is false.
    if (!this._allowFromWhenceYouCame) {
        return true;
    }

    // If fromWhenceYouCame is true and the first set of keys did not have
    // a reference, this case can happen.  They are always valid.
    if (reference === true) {
        return true;
    }

    // was invalid before even derefing.
    if (reference === false) {
        return false;
    }

    // Its been disconnected (set over or collected) from the graph.
    // eslint-disable-next-line camelcase
    if (reference && reference.$_parent === undefined) {
        return false;
    }

    // The reference has expired but has not been collected from the graph.
    // eslint-disable-next-line camelcase
    if (reference && reference.$_invalidated) {
        return false;
    }

    return true;
};

},{}],6:[function(require,module,exports){
var InvalidDerefInputError = require(9);
var getCachePosition = require(18);
var CONTAINER_DOES_NOT_EXIST = "e";
var $ref = require(113);

module.exports = function deref(boundJSONArg) {

    var absolutePath = boundJSONArg && boundJSONArg.$__path;
    var refPath = boundJSONArg && boundJSONArg.$__refPath;
    var toReference = boundJSONArg && boundJSONArg.$__toReference;
    var referenceContainer;

    // We deref and then ensure that the reference container is attached to
    // the model.
    if (absolutePath) {
        var validContainer = CONTAINER_DOES_NOT_EXIST;

        if (toReference) {
            validContainer = false;
            referenceContainer = getCachePosition(this, toReference);

            // If the reference container is still a sentinel value then compare
            // the reference value with refPath.  If they are the same, then the
            // model is still valid.
            if (refPath && referenceContainer &&
                referenceContainer.$type === $ref) {

                var containerPath = referenceContainer.value;
                var i = 0;
                var len = refPath.length;

                validContainer = true;
                for (; validContainer && i < len; ++i) {
                    if (containerPath[i] !== refPath[i]) {
                        validContainer = false;
                    }
                }
            }
        }

        // Signal to the deref'd model that it has been disconnected from the
        // graph or there is no _fromWhenceYouCame
        if (!validContainer) {
            referenceContainer = false;
        }

        // The container did not exist, therefore there is no reference
        // container and fromWhenceYouCame should always return true.
        else if (validContainer === CONTAINER_DOES_NOT_EXIST) {
            referenceContainer = true;
        }

        return this._clone({
            _path: absolutePath,
            _referenceContainer: referenceContainer
        });
    }

    throw new InvalidDerefInputError();
};

},{"113":113,"18":18,"9":9}],7:[function(require,module,exports){
var pathSyntax = require(127);
var getBoundValue = require(16);
var InvalidModelError = require(10);

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
    if (!found || node === undefined) {
        return undefined;
    }

    if (node.$type) {
        throw new InvalidModelError(path, path);
    }

    return this._clone({ _path: path });
};

},{"10":10,"127":127,"16":16}],8:[function(require,module,exports){
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
var NAME = "InvalidDerefInputError";
var MESSAGE = "Deref can only be used with a non-primitive object from get, set, or call.";
/**
 * An invalid deref input is when deref is used with input that is not generated
 * from a get, set, or a call.
 *
 * @param {String} message
 * @private
 */
function InvalidDerefInputError() {
    this.message = MESSAGE;
    this.stack = (new Error()).stack;
}

// instanceof will be an error, but stack will be correct because its defined in the constructor.
InvalidDerefInputError.prototype = new Error();
InvalidDerefInputError.prototype.name = NAME;
InvalidDerefInputError.name = NAME;
InvalidDerefInputError.message = MESSAGE;

module.exports = InvalidDerefInputError;

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
var NAME = "NullInPathError";
var MESSAGE = "`null` is not allowed in branch key positions.";

/**
 * Does not allow null in path
 */
function NullInPathError() {
    this.message = MESSAGE;
    this.stack = (new Error()).stack;
}

// instanceof will be an error, but stack will be correct because its defined in the constructor.
NullInPathError.prototype = new Error();
NullInPathError.prototype.name = NAME;
NullInPathError.message = MESSAGE;

module.exports = NullInPathError;

},{}],14:[function(require,module,exports){
var createHardlink = require(77);
var onValue = require(25);
var isExpired = require(29);
var $ref = require(113);
var promote = require(40);

/* eslint-disable no-constant-condition */
function followReference(model, root, nodeArg, referenceContainerArg,
                         referenceArg, seed, isJSONG) {

    var node = nodeArg;
    var reference = referenceArg;
    var referenceContainer = referenceContainerArg;
    var depth = 0;
    var k, next;

    while (true) {
        if (depth === 0 && referenceContainer.$_context) {
            depth = reference.length;
            next = referenceContainer.$_context;
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

                if (!referenceContainer.$_context) {
                    createHardlink(referenceContainer, next);
                }

                // Restart the reference follower.
                if (type === $ref) {

                    // Nulls out the depth, outerResults,
                    if (isJSONG) {
                        onValue(model, next, seed, null, null, null, null,
                                reference, reference.length, isJSONG);
                    } else {
                        promote(model._root, next);
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

    return [node, reference, referenceContainer];
}
/* eslint-enable */

module.exports = followReference;

},{"113":113,"25":25,"29":29,"40":40,"77":77}],15:[function(require,module,exports){
var getCachePosition = require(18);
var InvalidModelError = require(10);
var BoundJSONGraphModelError = require(8);

function mergeInto(target, obj) {
    /* eslint guard-for-in: 0 */
    if (target === obj) {
        return;
    }
    if (target === null || typeof target !== "object" || target.$type) {
        return;
    }
    if (obj === null || typeof obj !== "object" || obj.$type) {
        return;
    }

    for (var key in obj) {
        // When merging over a temporary branch structure (for example, as produced by an error selector)
        // with references, we don't want to mutate the path, particularly because it's also $_absolutePath
        // on cache nodes
        if (key === "$__path") {
            continue;
        }

        var targetValue = target[key];
        if (targetValue === undefined) {
            target[key] = obj[key];
        } else {
            mergeInto(targetValue, obj[key]);
        }
    }
}

module.exports = function get(walk, isJSONG) {
    return function innerGet(model, paths, seed) {
        // Result valueNode not immutable for isJSONG.
        var nextSeed = isJSONG ? seed : [{}];
        var valueNode = nextSeed[0];
        var results = {
            values: nextSeed,
            optimizedPaths: []
        };
        var cache = model._root.cache;
        var boundPath = model._path;
        var currentCachePosition = cache;
        var optimizedPath, optimizedLength = boundPath.length;
        var i, len;
        var requestedPath = [];
        var derefInfo = [];
        var referenceContainer;

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
            if (currentCachePosition && currentCachePosition.$type) {
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
            referenceContainer = model._referenceContainer;
        }

        // Update the optimized path if we
        else {
            optimizedPath = [];
            optimizedLength = 0;
        }

        for (i = 0, len = paths.length; i < len; i++) {
            walk(model, cache, currentCachePosition, paths[i], 0,
                 valueNode, results, derefInfo, requestedPath, optimizedPath,
                 optimizedLength, isJSONG, false, referenceContainer);
        }

        // Merge in existing results.
        mergeInto(valueNode, seed[0]);

        return results;
    };
};

},{"10":10,"18":18,"8":8}],16:[function(require,module,exports){
var getValueSync = require(20);
var InvalidModelError = require(10);

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

},{"10":10,"20":20}],17:[function(require,module,exports){
var isInternalKey = require(89);

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
            return !isInternalKey(k) && node[k] !== undefined;
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
                var isUserCreatedcacheNext = !cacheNext.$_modelCreated;
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

},{"89":89}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
var ModelResponse = require(51);
var pathSyntax = require(127);

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

},{"127":127,"51":51}],20:[function(require,module,exports){
var followReference = require(14);
var clone = require(28);
var isExpired = require(29);
var promote = require(40);
var $ref = require(113);
var $atom = require(111);
var $error = require(112);

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
            promote(model._root, out);
        }
    }

    // if (out && out.$type === $error && !model._treatErrorsAsValues) {
    if (out && type === $error && !model._treatErrorsAsValues) {
        /* eslint-disable no-throw-literal */
        throw {
            path: depth === len ? simplePath : simplePath.slice(0, depth),
            value: out.value
        };
        /* eslint-enable no-throw-literal */
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

},{"111":111,"112":112,"113":113,"14":14,"28":28,"29":29,"40":40}],21:[function(require,module,exports){
module.exports = function _getVersion(model, path) {
    // ultra fast clone for boxed values.
    var gen = model._getValueSync({
        _boxed: true,
        _root: model._root,
        _treatErrorsAsValues: model._treatErrorsAsValues
    }, path, true).value;
    var version = gen && gen.$_version;
    return (version == null) ? -1 : version;
};

},{}],22:[function(require,module,exports){
var get = require(15);
var walkPath = require(32);

var getWithPathsAsPathMap = get(walkPath, false);
var getWithPathsAsJSONGraph = get(walkPath, true);

module.exports = {
    getValueSync: require(20),
    getBoundValue: require(16),
    getWithPathsAsPathMap: getWithPathsAsPathMap,
    getWithPathsAsJSONGraph: getWithPathsAsJSONGraph
};

},{"15":15,"16":16,"20":20,"32":32}],23:[function(require,module,exports){
var promote = require(40);
var clone = require(28);

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
        path: requestedPath.slice(0, depth),
        value: value
    });
    promote(model._root, node);
};

},{"28":28,"40":40}],24:[function(require,module,exports){
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
        // If part of path has not been traversed, we need to ensure that there
        // are no empty paths (range(1, 0) or empyt array)
        var isEmpty = false;
        for (var i = depth; i < path.length && !isEmpty; ++i) {
            if (isEmptyAtom(path[i])) {
                return;
            }
        }

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

function isEmptyAtom(atom) {
    if (atom === null || typeof atom !== "object") {
        return false;
    }

    var isArray = Array.isArray(atom);
    if (isArray && atom.length) {
        return false;
    }

    // Empty array
    else if (isArray) {
        return true;
    }

    var from = atom.from;
    var to = atom.to;
    if (from === undefined || from <= to) {
        return false;
    }

    return true;
}

},{"31":31}],25:[function(require,module,exports){
var promote = require(40);
var clone = require(28);
var $ref = require(113);
var $atom = require(111);
var $error = require(112);

module.exports = function onValue(model, node, seed, depth, outerResults,
                                  branchInfo, requestedPath, optimizedPath,
                                  optimizedLength, isJSONG) {
    // Promote first.  Even if no output is produced we should still promote.
    if (node) {
        promote(model._root, node);
    }

    // Preload
    if (!seed) {
        return;
    }

    var i, len, k, key, curr, prev = null, prevK;
    var materialized = false, valueNode;

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

    // We don't want to emit references in json output
    else if (!model._emitReferencesInOutput && !isJSONG && node.$type === $ref) {
        valueNode = undefined;
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
        var isUserCreatedNode = !node.$_modelCreated;
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

            // The branch info is already generated output from the walk algo
            // with the required __path information on it.
            if (!curr[k]) {
                curr[k] = branchInfo[i];
            }

            prev = curr;
            prevK = k;
            curr = curr[k];
        }
        k = requestedPath[i];
        if (k !== null) {
            curr[k] = valueNode !== undefined ? valueNode : curr[k];
        } else {
            // We are protected from reaching here when depth is 1 and prev is
            // undefined by the InvalidModelError and NullInPathError checks.
            prev[prevK] = valueNode;
        }
    }
};

},{"111":111,"112":112,"113":113,"28":28,"40":40}],26:[function(require,module,exports){
var isExpired = require(29);
var $error = require(112);
var onError = require(23);
var onValue = require(25);
var onMissing = require(24);
var isMaterialized = require(30);
var expireNode = require(78);

/**
 * When we land on a valueType (or nothing) then we need to report it out to
 * the outerResults through errors, missing, or values.
 *
 * @private
 */
module.exports = function onValueType(
    model, node, path, depth, seed, outerResults, branchInfo,
    requestedPath, optimizedPath, optimizedLength, isJSONG, fromReference) {

    var currType = node && node.$type;
    var requiresMaterializedToReport = node && node.value === undefined;

    // There are is nothing here, ether report value, or report the value
    // that is missing.  If there is no type then report the missing value.
    if (!node || !currType) {
        if (isMaterialized(model)) {
            onValue(model, node, seed, depth, outerResults, branchInfo,
                    requestedPath, optimizedPath, optimizedLength,
                    isJSONG);
        } else {
            onMissing(model, path, depth,
                      outerResults, requestedPath,
                      optimizedPath, optimizedLength);
        }
        return;
    }

    // If there are expired value, then report it as missing
    else if (isExpired(node)) {
        if (!node.$_invalidated) {
            expireNode(node, model._root.expired, model._root);
        }
        onMissing(model, path, depth,
                  outerResults, requestedPath,
                  optimizedPath, optimizedLength);
    }

    // If there is an error, then report it as a value if
    else if (currType === $error) {
        if (fromReference) {
            requestedPath[depth] = null;
            depth += 1;
        }
        if (isJSONG || model._treatErrorsAsValues) {
            onValue(model, node, seed, depth, outerResults, branchInfo,
                    requestedPath, optimizedPath, optimizedLength,
                    isJSONG);
        } else {
            onError(model, node, depth, requestedPath, outerResults);
        }
    }

    // Report the value
    else {
        if (fromReference) {
            requestedPath[depth] = null;
            depth += 1;
        }

        if (!requiresMaterializedToReport ||
            requiresMaterializedToReport && model._materialized) {

            onValue(model, node, seed, depth, outerResults, branchInfo,
                    requestedPath, optimizedPath, optimizedLength, isJSONG);
        }
    }
};


},{"112":112,"23":23,"24":24,"25":25,"29":29,"30":30,"78":78}],27:[function(require,module,exports){
var pathSyntax = require(127);

module.exports = function getValueSync(pathArg) {
    var path = pathSyntax.fromPath(pathArg);
    if (Array.isArray(path) === false) {
        throw new Error("Model#getValueSync must be called with an Array path.");
    }
    if (this._path.length) {
        path = this._path.concat(path);
    }
    this._syncCheck("getValueSync");
    return this._getValueSync(this, path).value;
};

},{"127":127}],28:[function(require,module,exports){
// Copies the node
var privatePrefix = require(34);

module.exports = function clone(node) {
    var outValue, i, len;
    var keys = Object.keys(node);
    outValue = {};
    for (i = 0, len = keys.length; i < len; i++) {
        var k = keys[i];
        var k0 = k.substr(0, 2);
        if (k0 === privatePrefix) {
            continue;
        }
        outValue[k] = node[k];
    }
    return outValue;
};

},{"34":34}],29:[function(require,module,exports){
var now = require(98);
module.exports = function isExpired(node) {
    var $expires = node.$expires === void 0 && -1 || node.$expires;
    return $expires !== -1 && $expires !== 1 && ($expires === 0 || $expires < now());
};

},{"98":98}],30:[function(require,module,exports){
module.exports = function isMaterialized(model) {
    return model._materialized && !model._source;
};

},{}],31:[function(require,module,exports){
function fastCopy(arr, iArg) {
    var a = [], len, j, i;
    for (j = 0, i = iArg || 0, len = arr.length; i < len; j++, i++) {
        a[j] = arr[i];
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
    fastCopy: fastCopy
};

},{}],32:[function(require,module,exports){
var followReference = require(14);
var onValueType = require(26);
var onValue = require(25);
var isExpired = require(29);
var iterateKeySet = require(138).iterateKeySet;
var $ref = require(113);
var NullInPathError = require(13);
var promote = require(40);

module.exports = function walkPath(model, root, curr, path, depth, seed,
                                   outerResults, branchInfo, requestedPath,
                                   optimizedPathArg, optimizedLength, isJSONG,
                                   fromReferenceArg, referenceContainerArg) {

    var fromReference = fromReferenceArg;
    var optimizedPath = optimizedPathArg;
    var referenceContainer = referenceContainerArg;

    // If there is not a value in the current cache position or its a
    // value type, then we are at the end of the getWalk.
    if ((!curr || curr && curr.$type) || depth === path.length) {
        onValueType(model, curr, path, depth, seed, outerResults, branchInfo,
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
    var allowFromWhenceYouCame = model._allowFromWhenceYouCame;

    if (isKeySet) {
        iteratorNote = {};
        key = iterateKeySet(keySet, iteratorNote);
    }

    // The key can be undefined if there is an empty path.  An example of an
    // empty path is: [lolomo, [], summary].
    if (key === undefined && iteratorNote.done) {
        return;
    }

    // loop over every key over the keySet
    var optimizedLengthPlus1 = optimizedLength + 1;
    var refPath;
    do {
        fromReference = false;

        var next;

        // There are two cases when it comes to a null key.  In path vs at the
        // end of a path.
        if (key === null) {
            // If the key is null and we are not at the end of a path, then
            // throw an error.
            if (depth < path.length) {
                throw new NullInPathError();
            }

            // Else, we are at the end of a path, then just say next is current.
            else {
                next = curr;
            }
        }

        // The standard case, do the depth search into the cache.
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

                // promote the node so that the references don't get cleaned up.
                promote(model._root, next);

                if (isJSONG) {
                    onValue(model, next, seed, nextDepth, outerResults, null,
                            null, optimizedPath, nextOptimizedLength, isJSONG);
                }

                var ref = followReference(model, root, root, next,
                                          value, seed, isJSONG);
                fromReference = true;
                next = ref[0];
                refPath = ref[1];
                referenceContainer = ref[2];
                nextOptimizedPath = [];
                nextOptimizedLength = refPath.length;
                for (i = 0; i < nextOptimizedLength; ++i) {
                    nextOptimizedPath[i] = refPath[i];
                }
            }

            // The next can be set to undefined by following a reference that
            // does not exist.
            if (next) {
                var obj;

                // There was a reference container.
                if (referenceContainer && allowFromWhenceYouCame) {
                    obj = {
                        // eslint-disable-next-line camelcase
                        $__path: next.$_absolutePath,
                        // eslint-disable-next-line camelcase
                        $__refPath: referenceContainer.value,
                        // eslint-disable-next-line camelcase
                        $__toReference: referenceContainer.$_absolutePath
                    };
                }

                // There is no reference container meaning this request was
                // neither from a model and/or the first n (depth) keys do not
                // contain references.
                else {
                    obj = {
                        // eslint-disable-next-line camelcase
                        $__path: next.$_absolutePath
                    };
                }

                branchInfo[depth] = obj;
            }
        }

        // Recurse to the next level.
        walkPath(model, root, next, path, nextDepth, seed, outerResults,
                 branchInfo, requestedPath, nextOptimizedPath,
                 nextOptimizedLength, isJSONG,
                 fromReference, referenceContainer);

        // If the iteratorNote is not done, get the next key.
        if (iteratorNote && !iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }

    } while (iteratorNote && !iteratorNote.done);
};

},{"113":113,"13":13,"138":138,"14":14,"25":25,"26":26,"29":29,"40":40}],33:[function(require,module,exports){
"use strict";

function falcor(opts) {
    return new falcor.Model(opts);
}

/**
 * A filtering method for keys from a falcor json response.  The only gotcha
 * to this method is when the incoming json is undefined, then undefined will
 * be returned.
 *
 * @public
 * @param {Object} json - The json response from a falcor model.
 * @returns {Array} - the keys that are in the model response minus the deref
 * _private_ meta data.
 */
falcor.keys = function getJSONKeys(json) {
    if (!json) {
        return undefined;
    }

    return Object.
        keys(json).
        filter(function(key) {
            return key !== "$__path";
        });
};

module.exports = falcor;

falcor.Model = require(2);

},{"2":2}],34:[function(require,module,exports){
var reservedPrefix = require(36);

module.exports = reservedPrefix + "_";

},{"36":36}],35:[function(require,module,exports){
module.exports = require(34) + "ref";

},{"34":34}],36:[function(require,module,exports){
module.exports = "$";

},{}],37:[function(require,module,exports){
var createHardlink = require(77);
var __prefix = require(36);

var $ref = require(113);

var getBoundValue = require(16);

var promote = require(40);
var getSize = require(80);
var hasOwn = require(83);
var isObject = require(92);
var isExpired = require(87);
var isFunction = require(88);
var isPrimitive = require(94);
var expireNode = require(78);
var incrementVersion = require(84);
var updateNodeAncestors = require(107);
var removeNodeAndDescendants = require(101);

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
    var parent = node.$_parent || cache;
    var initialVersion = cache.$_version;

    var pathMapIndex = -1;
    var pathMapCount = pathMapEnvelopes.length;

    while (++pathMapIndex < pathMapCount) {

        var pathMapEnvelope = pathMapEnvelopes[pathMapIndex];

        invalidatePathMap(
            pathMapEnvelope.json, 0, cache, parent, node,
            version, expired, lru, comparator, errorSelector
        );
    }

    var newVersion = cache.$_version;
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
        if (key[0] !== __prefix && hasOwn(pathMap, key)) {
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

    node = node.$_context;

    if (node != null) {
        parent = node.$_parent || root;
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

        if (container.$_context !== node) {
            createHardlink(container, node);
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
            key = node.$_key;
        }
    } else {
        parent = node;
        node = parent[key];
    }

    return [node, parent];
}

},{"101":101,"107":107,"113":113,"16":16,"36":36,"40":40,"77":77,"78":78,"80":80,"83":83,"84":84,"87":87,"88":88,"92":92,"94":94}],38:[function(require,module,exports){
var __ref = require(35);

var $ref = require(113);

var getBoundValue = require(16);

var promote = require(40);
var getSize = require(80);
var isExpired = require(87);
var isFunction = require(88);
var isPrimitive = require(94);
var expireNode = require(78);
var iterateKeySet = require(138).iterateKeySet;
var incrementVersion = require(84);
var updateNodeAncestors = require(107);
var removeNodeAndDescendants = require(101);

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
    // eslint-disable-next-line camelcase
    var parent = node.$_parent || cache;
    // eslint-disable-next-line camelcase
    var initialVersion = cache.$_version;

    var pathIndex = -1;
    var pathCount = paths.length;

    while (++pathIndex < pathCount) {

        var path = paths[pathIndex];

        invalidatePathSet(
            path, 0, cache, parent, node,
            version, expired, lru
        );
    }

    // eslint-disable-next-line camelcase
    var newVersion = cache.$_version;
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
            } else if (removeNodeAndDescendants(nextNode, nextParent, key, lru, undefined)) {
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

    // eslint-disable-next-line camelcase
    node = node.$_context;

    if (node != null) {
        // eslint-disable-next-line camelcase
        parent = node.$_parent || root;
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

        // eslint-disable-next-line camelcase
        if (container.$_context !== node) {
            // eslint-disable-next-line camelcase
            var backRefs = node.$_refsLength || 0;
            // eslint-disable-next-line camelcase
            node.$_refsLength = backRefs + 1;
            node[__ref + backRefs] = container;
            // eslint-disable-next-line camelcase
            container.$_context = node;
            // eslint-disable-next-line camelcase
            container.$_refIndex = backRefs;
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
            key = node.$_key;
        }
    } else {
        parent = node;
        node = parent[key];
    }

    return [node, parent];
}

},{"101":101,"107":107,"113":113,"138":138,"16":16,"35":35,"40":40,"78":78,"80":80,"84":84,"87":87,"88":88,"94":94}],39:[function(require,module,exports){
var removeNode = require(100);
var updateNodeAncestors = require(107);

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
            // eslint-disable-next-line camelcase
        } else if (parent = node.$_parent) { // eslint-disable-line no-cond-assign
            // eslint-disable-next-line camelcase
            removeNode(node, parent, node.$_key, lru);
        }
        node = expired.pop();
    }

    if (total >= max) {
        // eslint-disable-next-line camelcase
        var prev = lru.$_tail;
        node = prev;
        while ((total >= targetSize) && node) {
            // eslint-disable-next-line camelcase
            prev = prev.$_prev;
            size = node.$size || 0;
            total -= size;
            if (shouldUpdate === true) {
                updateNodeAncestors(node, size, lru, version);
            }
            node = prev;
        }

        // eslint-disable-next-line camelcase
        lru.$_tail = lru.$_prev = node;
        if (node == null) {
            // eslint-disable-next-line camelcase
            lru.$_head = lru.$_next = undefined;
        } else {
            // eslint-disable-next-line camelcase
            node.$_next = undefined;
        }
    }
};

},{"100":100,"107":107}],40:[function(require,module,exports){
var EXPIRES_NEVER = require(114);

// [H] -> Next -> ... -> [T]
// [T] -> Prev -> ... -> [H]
module.exports = function lruPromote(root, object) {
    // Never promote node.$expires === 1.  They cannot expire.
    if (object.$expires === EXPIRES_NEVER) {
        return;
    }

    // eslint-disable-next-line camelcase
    var head = root.$_head;

    // Nothing is in the cache.
    if (!head) {
        // eslint-disable-next-line camelcase
        root.$_head = root.$_tail = object;
        return;
    }

    if (head === object) {
        return;
    }

    // The item always exist in the cache since to get anything in the
    // cache it first must go through set.
    // eslint-disable-next-line camelcase
    var prev = object.$_prev;
    // eslint-disable-next-line camelcase
    var next = object.$_next;
    if (next) {
        // eslint-disable-next-line camelcase
        next.$_prev = prev;
    }
    if (prev) {
        // eslint-disable-next-line camelcase
        prev.$_next = next;
    }
    // eslint-disable-next-line camelcase
    object.$_prev = undefined;

    // Insert into head position
    // eslint-disable-next-line camelcase
    root.$_head = object;
    // eslint-disable-next-line camelcase
    object.$_next = head;
    // eslint-disable-next-line camelcase
    head.$_prev = object;

    // If the item we promoted was the tail, then set prev to tail.
    // eslint-disable-next-line camelcase
    if (object === root.$_tail) {
        // eslint-disable-next-line camelcase
        root.$_tail = prev;
    }
};

},{"114":114}],41:[function(require,module,exports){
module.exports = function lruSplice(root, object) {

    // Its in the cache.  Splice out.
    // eslint-disable-next-line camelcase
    var prev = object.$_prev;
    // eslint-disable-next-line camelcase
    var next = object.$_next;
    if (next) {
        // eslint-disable-next-line camelcase
        next.$_prev = prev;
    }
    if (prev) {
        // eslint-disable-next-line camelcase
        prev.$_next = next;
    }
    // eslint-disable-next-line camelcase
    object.$_prev = object.$_next = undefined;

    // eslint-disable-next-line camelcase
    if (object === root.$_head) {
        // eslint-disable-next-line camelcase
        root.$_head = next;
    }
    // eslint-disable-next-line camelcase
    if (object === root.$_tail) {
        // eslint-disable-next-line camelcase
        root.$_tail = prev;
    }
};

},{}],42:[function(require,module,exports){
var complement = require(45);
var flushGetRequest = require(46);
var REQUEST_ID = 0;
var GetRequestType = require(44).GetRequest;
var setJSONGraphs = require(67);
var setPathValues = require(69);
var $error = require(112);
var emptyArray = [];
var InvalidSourceError = require(11);

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

            var flushedDisposable;
            var scheduleDisposable = self._scheduler.schedule(function() {
                flushedDisposable =
                    flushGetRequest(self, oPaths, function(err, data) {
                        var i, fn, len;
                        var model = self.requestQueue.model;
                        self.requestQueue.removeRequest(self);
                        self._disposed = true;

                        if (model._treatDataSourceErrorsAsJSONGraphErrors ? err instanceof InvalidSourceError : !!err) {
                            for (i = 0, len = callbacks.length; i < len; ++i) {
                                fn = callbacks[i];
                                if (fn) {
                                    fn(err);
                                }
                            }
                            return;
                        }

                        // If there is at least one callback remaining, then
                        // callback the callbacks.
                        if (self._count) {
                            var mergeContext = {hasInvalidatedResult : false};
                            self._merge(rPaths, err, data, mergeContext);
                            // Call the callbacks.  The first one inserts all
                            // the data so that the rest do not have consider
                            // if their data is present or not.
                            for (i = 0, len = callbacks.length; i < len; ++i) {
                                fn = callbacks[i];
                                if (fn) {
                                    fn(err, data, mergeContext.hasInvalidatedResult);
                                }
                            }
                        }
                    });
            });

            // There is a race condition here. If the scheduler is sync then it
            // exposes a condition where the flush request cannot be disposed.
            // To correct this issue, if there is no flushedDisposable, then the
            // scheduler is async and should use scheduler disposable, else use
            // the flushedDisposable.
            self._disposable = flushedDisposable || scheduleDisposable;
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
    _merge: function(requested, err, data, mergeContext) {
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
        if (err && model._treatDataSourceErrorsAsJSONGraphErrors) {
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
            setPathValues(model, pathValues, null, errorSelector, comparator, mergeContext);
        }

        // Insert the jsonGraph from the dataSource.
        else {
            setJSONGraphs(model, [{
                paths: nextPaths,
                jsonGraph: data.jsonGraph
            }], null, errorSelector, comparator, mergeContext);
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
        if (count === 0) {
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

},{"11":11,"112":112,"44":44,"45":45,"46":46,"67":67,"69":69}],43:[function(require,module,exports){
var RequestTypes = require(44);
var sendSetRequest = require(47);
var GetRequest = require(42);
var falcorPathUtils = require(138);

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
     * performs a set against the dataSource.  Sets, though are not batched
     * currently could be batched potentially in the future.  Since no batching
     * is required the setRequest action is simplified significantly.
     *
     * @param {JSONGraphEnvelope) jsonGraph -
     */
    set: function(jsonGraph, cb) {
        jsonGraph.paths = falcorPathUtils.collapse(jsonGraph.paths);
        return sendSetRequest(jsonGraph, this.model, cb);
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
        function refCountCallback(err, data, hasInvalidatedResult) {
            if (disposed) {
                return;
            }

            --count;

            // If the count becomes 0, then its time to notify the
            // listener that the request is done.
            if (count === 0) {
                cb(err, data, hasInvalidatedResult);
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

},{"138":138,"42":42,"44":44,"47":47}],44:[function(require,module,exports){
module.exports = {
    GetRequest: "GET"
};

},{}],45:[function(require,module,exports){
var hasIntersection = require(138).hasIntersection;
var arraySlice = require(75);

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

},{"138":138,"75":75}],46:[function(require,module,exports){
var pathUtils = require(138);
var toTree = pathUtils.toTree;
var toPaths = pathUtils.toPaths;
var InvalidSourceError = require(11);

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
        return null;
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
    var getRequest;
    try {
        getRequest = request.
            requestQueue.
            model._source.
            get(collapsedPaths);
    } catch (e) {
        callback(new InvalidSourceError());
        return null;
    }

    // Ensures that the disposable is available for the outside to cancel.
    var disposable = getRequest.
        subscribe(function(data) {
            jsonGraphData = data;
        }, function(err) {
            callback(err, jsonGraphData);
        }, function() {
            callback(null, jsonGraphData);
        });

    return disposable;
};


},{"11":11,"138":138}],47:[function(require,module,exports){
var arrayMap = require(74);
var setJSONGraphs = require(67);
var setPathValues = require(69);
var InvalidSourceError = require(11);

var emptyArray = [];
var emptyDisposable = {dispose: function() {}};

/**
 * A set request is not an object like GetRequest.  It simply only needs to
 * close over a couple values and its never batched together (at least not now).
 *
 * @private
 * @param {JSONGraphEnvelope} jsonGraph -
 * @param {Model} model -
 * @param {Function} callback -
 */
var sendSetRequest = function(originalJsonGraph, model, callback) {
    var paths = originalJsonGraph.paths;
    var modelRoot = model._root;
    var errorSelector = modelRoot.errorSelector;
    var comparator = modelRoot.comparator;
    var boundPath = model._path;
    var resultingJsonGraphEnvelope;

    // This is analogous to GetRequest _merge / flushGetRequest
    // SetRequests are just considerably simplier.
    var setObservable;
    try {
        setObservable = model._source.
            set(originalJsonGraph);
    } catch (e) {
        callback(new InvalidSourceError());
        return emptyDisposable;
    }

    var disposable = setObservable.
        subscribe(function onNext(jsonGraphEnvelope) {
            // When disposed, no data is inserted into.  This can sync resolve
            // and if thats the case then its undefined.
            if (disposable && disposable.disposed) {
                return;
            }

            // onNext will insert all data into the model then save the json
            // envelope from the incoming result.
            model._path = emptyArray;

            var successfulPaths = setJSONGraphs(model, [{
                paths: paths,
                jsonGraph: jsonGraphEnvelope.jsonGraph
            }], null, errorSelector, comparator);

            jsonGraphEnvelope.paths = successfulPaths[1];

            model._path = boundPath;
            resultingJsonGraphEnvelope = jsonGraphEnvelope;
        }, function onError(dataSourceError) {
            if (disposable && disposable.disposed) {
                return;
            }
            model._path = emptyArray;

            setPathValues(model, arrayMap(paths, function(path) {
                return {
                    path: path,
                    value: dataSourceError
                };
            }), null, errorSelector, comparator);

            model._path = boundPath;

            callback(dataSourceError);
        }, function onCompleted() {
            callback(null, resultingJsonGraphEnvelope);
        });

    return disposable;
};

module.exports = sendSetRequest;

},{"11":11,"67":67,"69":69,"74":74}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
var ModelResponse = require(51);
var InvalidSourceError = require(11);

var pathSyntax = require(127);

/**
 * @private
 * @augments ModelResponse
 */
function CallResponse(model, callPath, args, suffix, paths) {
    this.callPath = pathSyntax.fromPath(callPath);
    this.args = args;

    if (paths) {
        this.paths = paths.map(pathSyntax.fromPath);
    }
    if (suffix) {
        this.suffix = suffix.map(pathSyntax.fromPath);
    }
    this.model = model;
}

CallResponse.prototype = Object.create(ModelResponse.prototype);
CallResponse.prototype._subscribe = function _subscribe(observer) {
    var callPath = this.callPath;
    var callArgs = this.args;
    var suffixes = this.suffix;
    var extraPaths = this.paths;
    var model = this.model;
    var rootModel = model._clone({
        _path: []
    });
    var boundPath = model._path;
    var boundCallPath = boundPath.concat(callPath);

    /* eslint-disable consistent-return */
    // Precisely the same error as the router when a call function does not
    // exist.
    if (!model._source) {
        observer.onError(new Error("function does not exist"));
        return;
    }


    var response, obs;
    try {
        obs = model._source.
            call(boundCallPath, callArgs, suffixes, extraPaths);
    } catch (e) {
        observer.onError(new InvalidSourceError(e));
        return;
    }

    return obs.
        subscribe(function(res) {
            response = res;
        }, function(err) {
            observer.onError(err);
        }, function() {

            // Run the invalidations first then the follow up JSONGraph set.
            var invalidations = response.invalidated;
            if (invalidations && invalidations.length) {
                rootModel.invalidate.apply(rootModel, invalidations);
            }

            // The set
            rootModel.
                withoutDataSource().
                set(response).subscribe(function(x) {
                    observer.onNext(x);
                }, function(err) {
                    observer.onError(err);
                }, function() {
                    observer.onCompleted();
                });
        });
    /* eslint-enable consistent-return */
};

module.exports = CallResponse;

},{"11":11,"127":127,"51":51}],50:[function(require,module,exports){
var isArray = Array.isArray;
var ModelResponse = require(51);
var isPathValue = require(93);
var isJSONEnvelope = require(90);
var empty = {dispose: function() {}};

function InvalidateResponse(model, args) {
    // TODO: This should be removed.  There should only be 1 type of arguments
    // coming in, but we have strayed from documentation.
    this._model = model;

    var groups = [];
    var group, groupType;
    var argIndex = -1;
    var argCount = args.length;

    // Validation of arguments have been moved out of this function.
    while (++argIndex < argCount) {
        var arg = args[argIndex];
        var argType;
        if (isArray(arg)) {
            argType = "PathValues";
        } else if (isPathValue(arg)) {
            argType = "PathValues";
        } else if (isJSONEnvelope(arg)) {
            argType = "PathMaps";
        } else {
            throw new Error("Invalid Input");
        }

        if (groupType !== argType) {
            groupType = argType;
            group = {
                inputType: argType,
                arguments: []
            };
            groups.push(group);
        }

        group.arguments.push(arg);
    }

    this._groups = groups;
}

InvalidateResponse.prototype = Object.create(ModelResponse.prototype);
InvalidateResponse.prototype.progressively = function progressively() {
    return this;
};
InvalidateResponse.prototype._toJSONG = function _toJSONG() {
    return this;
};

InvalidateResponse.prototype._subscribe = function _subscribe(observer) {

    var model = this._model;
    this._groups.forEach(function(group) {
        var inputType = group.inputType;
        var methodArgs = group.arguments;
        var operationName = "_invalidate" + inputType;
        var operationFunc = model[operationName];
        operationFunc(model, methodArgs);
    });
    observer.onCompleted();

    return empty;
};

module.exports = InvalidateResponse;

},{"51":51,"90":90,"93":93}],51:[function(require,module,exports){
(function (Promise){
var ModelResponseObserver = require(52);
var $$observable = require(156).default;
var toEsObservable = require(110);

/**
 * A ModelResponse is a container for the results of a get, set, or call operation performed on a Model. The ModelResponse provides methods which can be used to specify the output format of the data retrieved from a Model, as well as how that data is delivered.
 * @constructor ModelResponse
 * @augments Observable
*/
function ModelResponse(subscribe) {
    this._subscribe = subscribe;
}

ModelResponse.prototype[$$observable] = function SymbolObservable() {
    return toEsObservable(this);
};

ModelResponse.prototype._toJSONG = function toJSONG() {
    return this;
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
    return this;
};

ModelResponse.prototype.subscribe =
ModelResponse.prototype.forEach = function subscribe(a, b, c) {
    var observer = new ModelResponseObserver(a,b,c);
    var subscription = this._subscribe(observer);
    switch (typeof subscription) {
        case "function":
            return {
                dispose: function() {
                    if (observer._closed) {
                        return;
                    }
                    observer._closed = true;
                    subscription();
                }
             };
        case "object":
            return {
                dispose: function() {
                    if (observer._closed) {
                        return;
                    }
                    observer._closed = true;
                    if (subscription !== null) {
                        subscription.dispose();
                    }
                }
             };
        default:
            return {
                dispose: function() {
                    observer._closed = true;
                }
             };
    }
};

ModelResponse.prototype.then = function then(onNext, onError) {
    /* global Promise */
    var self = this;
    if (!self._promise) {
        self._promise = new Promise(function(resolve, reject) {
            var rejected = false;
            var values = [];
            self.subscribe(
                function(value) {
                    values[values.length] = value;
                },
                function(errors) {
                    rejected = true;
                    reject(errors);
                },
                function() {
                    var value = values;
                    if (values.length <= 1) {
                        value = values[0];
                    }

                    if (rejected === false) {
                        resolve(value);
                    }
                }
            );
        });
    }
    return self._promise.then(onNext, onError);
};

module.exports = ModelResponse;

}).call(this,typeof Promise === "function" ? Promise : require(149))
},{"110":110,"149":149,"156":156,"52":52}],52:[function(require,module,exports){
var noop = require(97);

/**
 * A ModelResponseObserver conform to the Observable's Observer contract. It accepts either an Observer or three optional callbacks which correspond to the Observer methods onNext, onError, and onCompleted.
 * The ModelResponseObserver wraps an Observer to enforce a variety of different invariants including:
 * 1. onError callback is only called once.
 * 2. onCompleted callback is only called once.
 * @constructor ModelResponseObserver
*/
function ModelResponseObserver(
    onNextOrObserver,
    onErrorFn,
    onCompletedFn
) {
    // if callbacks are passed, construct an Observer from them. Create a NOOP function for any missing callbacks.
    if (!onNextOrObserver || typeof onNextOrObserver !== "object") {
        this._observer = {
            onNext: (
                typeof onNextOrObserver === "function"
                    ? onNextOrObserver
                    : noop
            ),
            onError: (
                typeof onErrorFn === "function"
                    ? onErrorFn
                    : noop
            ),
            onCompleted: (
                typeof onCompletedFn === "function"
                    ? onCompletedFn
                    : noop
            )
        };
    }
    // if an Observer is passed
    else {
        this._observer = {
            onNext: typeof onNextOrObserver.onNext === "function" ? function(value) { onNextOrObserver.onNext(value); } : noop,
            onError: typeof onNextOrObserver.onError === "function" ? function(error) { onNextOrObserver.onError(error); } : noop,
            onCompleted: (
                typeof onNextOrObserver.onCompleted === "function"
                    ? function() { onNextOrObserver.onCompleted(); }
                    : noop
            )
        };
    }
}

ModelResponseObserver.prototype = {
    onNext: function(v) {
        if (!this._closed) {
            this._observer.onNext(v);
        }
    },
    onError: function(e) {
        if (!this._closed) {
            this._closed = true;
            this._observer.onError(e);
        }
    },
    onCompleted: function() {
        if (!this._closed) {
            this._closed = true;
            this._observer.onCompleted();
        }
    }
};

module.exports = ModelResponseObserver;

},{"97":97}],53:[function(require,module,exports){
var ModelResponse = require(51);
var checkCacheAndReport = require(54);
var getRequestCycle = require(55);
var empty = {dispose: function() {}};
var collectLru = require(39);
var getSize = require(80);

/**
 * The get response.  It takes in a model and paths and starts
 * the request cycle.  It has been optimized for cache first requests
 * and closures.
 * @param {Model} model -
 * @param {Array} paths -
 * @augments ModelResponse
 * @private
 */
var GetResponse = module.exports = function GetResponse(model, paths,
                                                        isJSONGraph,
                                                        isProgressive,
                                                        forceCollect) {
    this.model = model;
    this.currentRemainingPaths = paths;
    this.isJSONGraph = isJSONGraph || false;
    this.isProgressive = isProgressive || false;
    this.forceCollect = forceCollect || false;
};

GetResponse.prototype = Object.create(ModelResponse.prototype);

/**
 * Makes the output of a get response JSONGraph instead of json.
 * @private
 */
GetResponse.prototype._toJSONG = function _toJSONGraph() {
    return new GetResponse(this.model, this.currentRemainingPaths,
                           true, this.isProgressive, this.forceCollect);
};

/**
 * Progressively responding to data in the cache instead of once the whole
 * operation is complete.
 * @public
 */
GetResponse.prototype.progressively = function progressively() {
    return new GetResponse(this.model, this.currentRemainingPaths,
                           this.isJSONGraph, true, this.forceCollect);
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
    var model = this.model;
    var isJSONG = observer.isJSONG = this.isJSONGraph;
    var isProgressive = this.isProgressive;
    var results = checkCacheAndReport(model, this.currentRemainingPaths,
                                      observer, isProgressive, isJSONG, seed,
                                      errors);

    // If there are no results, finish.
    if (!results) {
        if (this.forceCollect) {
            var modelRoot = model._root;
            var modelCache = modelRoot.cache;
            var currentVersion = modelCache.$_version;

            collectLru(modelRoot, modelRoot.expired, getSize(modelCache),
                    model._maxSize, model._collectRatio, currentVersion);
        }
        return empty;
    }

    // Starts the async request cycle.
    return getRequestCycle(this, model, results,
                           observer, errors, 1);
};

},{"39":39,"51":51,"54":54,"55":55,"80":80}],54:[function(require,module,exports){
var gets = require(22);
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
    var valueNode = results.values[0];
    var hasValues = results.hasValue;
    var completed = !results.requestedMissingPaths ||
                    !results.requestedMissingPaths.length ||
                    !model._source;
    var hasValueOverall = Boolean(valueNode.json || valueNode.jsonGraph);

    // Copy the errors into the total errors array.
    if (results.errors) {
        var errs = results.errors;
        var errorsLength = errors.length;
        for (var i = 0, len = errs.length; i < len; ++i, ++errorsLength) {
            errors[errorsLength] = errs[i];
        }
    }

    // If there are values to report, then report.
    // Which are under two conditions:
    // 1.  This request for data yielded at least one value (hasValue) and  the
    // request is progressive
    //
    // 2.  The request if finished and the json key off
    // the valueNode has a value.
    if (hasValues && progressive || hasValueOverall && completed) {
        try {
            observer.onNext(valueNode);
        } catch (e) {
            throw e;
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

},{"22":22}],55:[function(require,module,exports){
var checkCacheAndReport = require(54);
var MaxRetryExceededError = require(12);
var fastCat = require(31).fastCat;
var collectLru = require(39);
var getSize = require(80);
var AssignableDisposable = require(48);
var InvalidSourceError = require(11);

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
 * @private
 */
module.exports = function getRequestCycle(getResponse, model, results, observer,
                                          errors, count) {
    // we have exceeded the maximum retry limit.
    if (count === model._maxRetries) {
        observer.onError(new MaxRetryExceededError());
        return {
            dispose: function() {}
        };
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
        get(boundRequestedMissingPaths, optimizedMissingPaths, function(err, data, hasInvalidatedResult) {
            if (model._treatDataSourceErrorsAsJSONGraphErrors ? err instanceof InvalidSourceError : !!err) {
                observer.onError(err);
                return;
            }

            var nextRequestedMissingPaths;
            var nextSeed;

            // If merging over an existing branch structure with refs has invalidated our intermediate json,
            // we want to start over and re-get all requested paths with a fresh seed
            if (hasInvalidatedResult) {
                nextRequestedMissingPaths = getResponse.currentRemainingPaths;
                nextSeed = [{}];
            } else {
                nextRequestedMissingPaths = requestedMissingPaths;
                nextSeed = results.values;
            }

             // Once the request queue finishes, check the cache and bail if
             // we can.
            var nextResults = checkCacheAndReport(model, nextRequestedMissingPaths,
                                                  observer,
                                                  getResponse.isProgressive,
                                                  getResponse.isJSONGraph,
                                                  nextSeed, errors);

            // If there are missing paths coming back form checkCacheAndReport
            // the its reported from the core cache check method.
            if (nextResults) {

                // update the which disposable to use.
                disposable.currentDisposable =
                    getRequestCycle(getResponse, model, nextResults, observer,
                                    errors, count + 1);
            }

            // We have finished.  Since we went to the dataSource, we must
            // collect on the cache.
            else {

                var modelRoot = model._root;
                var modelCache = modelRoot.cache;
                var currentVersion = modelCache.$_version;

                collectLru(modelRoot, modelRoot.expired, getSize(modelCache),
                        model._maxSize, model._collectRatio, currentVersion);
            }

        });
    disposable.currentDisposable = currentRequestDisposable;
    return disposable;
};

},{"11":11,"12":12,"31":31,"39":39,"48":48,"54":54,"80":80}],56:[function(require,module,exports){
var GetResponse = require(53);

/**
 * Performs a get on the cache and if there are missing paths
 * then the request will be forwarded to the get request cycle.
 * @private
 */
module.exports = function getWithPaths(paths) {
    return new GetResponse(this, paths);
};

},{"53":53}],57:[function(require,module,exports){
var pathSyntax = require(127);
var ModelResponse = require(51);
var GET_VALID_INPUT = require(58);
var validateInput = require(108);
var GetResponse = require(53);

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

},{"108":108,"127":127,"51":51,"53":53,"58":58}],58:[function(require,module,exports){
module.exports = {
    path: true,
    pathSyntax: true
};

},{}],59:[function(require,module,exports){
var ModelResponse = require(51);
var pathSyntax = require(127);
var isArray = Array.isArray;
var isPathValue = require(93);
var isJSONGraphEnvelope = require(91);
var isJSONEnvelope = require(90);
var setRequestCycle = require(62);

/**
 *  The set response is responsible for doing the request loop for the set
 * operation and subscribing to the follow up get.
 *
 * The constructors job is to parse out the arguments and put them in their
 * groups.  The following subscribe will do the actual cache set and dataSource
 * operation remoting.
 *
 * @param {Model} model -
 * @param {Array} args - The array of arguments that can be JSONGraph, JSON, or
 * pathValues.
 * @param {Boolean} isJSONGraph - if the request is a jsonGraph output format.
 * @param {Boolean} isProgressive - progressive output.
 * @augments ModelResponse
 * @private
 */
var SetResponse = module.exports = function SetResponse(model, args,
                                                        isJSONGraph,
                                                        isProgressive) {

    // The response properties.
    this._model = model;
    this._isJSONGraph = isJSONGraph || false;
    this._isProgressive = isProgressive || false;
    this._initialArgs = args;
    this._value = [{}];

    var groups = [];
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
        }

        group.arguments.push(arg);
    }

    this._groups = groups;
};

SetResponse.prototype = Object.create(ModelResponse.prototype);

/**
 * The subscribe function will setup the remoting of the operation and cache
 * setting.
 *
 * @private
 */
SetResponse.prototype._subscribe = function _subscribe(observer) {
    var groups = this._groups;
    var model = this._model;
    var isJSONGraph = this._isJSONGraph;
    var isProgressive = this._isProgressive;

    // Starts the async request cycle.
    return setRequestCycle(
        model, observer, groups, isJSONGraph, isProgressive, 0);
};

/**
 * Makes the output of a get response JSONGraph instead of json.
 * @private
 */
SetResponse.prototype._toJSONG = function _toJSONGraph() {
    return new SetResponse(this._model, this._initialArgs,
                           true, this._isProgressive);
};

/**
 * Progressively responding to data in the cache instead of once the whole
 * operation is complete.
 * @public
 */
SetResponse.prototype.progressively = function progressively() {
    return new SetResponse(this._model, this._initialArgs,
                           this._isJSONGraph, true);
};

},{"127":127,"51":51,"62":62,"90":90,"91":91,"93":93}],60:[function(require,module,exports){
var setValidInput = require(63);
var validateInput = require(108);
var SetResponse = require(59);
var ModelResponse = require(51);

module.exports = function set() {
    var out = validateInput(arguments, setValidInput, "set");
    if (out !== true) {
        return new ModelResponse(function(o) {
            o.onError(out);
        });
    }

    var argsIdx = -1;
    var argsLen = arguments.length;
    var args = [];
    while (++argsIdx < argsLen) {
        args[argsIdx] = arguments[argsIdx];
    }
    return new SetResponse(this, args);
};

},{"108":108,"51":51,"59":59,"63":63}],61:[function(require,module,exports){
var arrayFlatMap = require(73);

/**
 * Takes the groups that are created in the SetResponse constructor and sets
 * them into the cache.
 */
module.exports = function setGroupsIntoCache(model, groups) {
    var modelRoot = model._root;
    var errorSelector = modelRoot.errorSelector;
    var groupIndex = -1;
    var groupCount = groups.length;
    var requestedPaths = [];
    var optimizedPaths = [];
    var returnValue = {
        requestedPaths: requestedPaths,
        optimizedPaths: optimizedPaths
    };

    // Takes each of the groups and normalizes their input into
    // requested paths and optimized paths.
    while (++groupIndex < groupCount) {

        var group = groups[groupIndex];
        var inputType = group.inputType;
        var methodArgs = group.arguments;

        if (methodArgs.length > 0) {
            var operationName = "_set" + inputType;
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

    return returnValue;
};

function pluckPath(pathValue) {
    return pathValue.path;
}

function pluckEnvelopePaths(jsonGraphEnvelope) {
    return jsonGraphEnvelope.paths;
}

},{"73":73}],62:[function(require,module,exports){
var emptyArray = [];
var AssignableDisposable = require(48);
var GetResponse = require(53);
var setGroupsIntoCache = require(61);
var getWithPathsAsPathMap = require(22).getWithPathsAsPathMap;
var InvalidSourceError = require(11);
var MaxRetryExceededError = require(12);

/**
 * The request cycle for set.  This is responsible for requesting to dataSource
 * and allowing disposing inflight requests.
 */
module.exports = function setRequestCycle(model, observer, groups,
                                          isJSONGraph, isProgressive, count) {
    // we have exceeded the maximum retry limit.
    if (count === model._maxRetries) {
        observer.onError(new MaxRetryExceededError());
        return {
            dispose: function() {}
        };
    }

    var requestedAndOptimizedPaths = setGroupsIntoCache(model, groups);
    var optimizedPaths = requestedAndOptimizedPaths.optimizedPaths;
    var requestedPaths = requestedAndOptimizedPaths.requestedPaths;
    var isMaster = model._source === undefined;

    // Local set only.  We perform a follow up get.  If performance is ever
    // a requirement simply requiring in checkCacheAndReport and use get request
    // internals.  Figured this is more "pure".
    if (isMaster) {
        return subscribeToFollowupGet(model, observer, requestedPaths,
                              isJSONGraph, isProgressive);
    }


    // Progressively output the data from the first set.
    if (isProgressive) {
        var results = getWithPathsAsPathMap(model, requestedPaths, [{}]);
        if (results.criticalError) {
            observer.onError(results.criticalError);
            return null;
        }
        observer.onNext(results.values[0]);
    }

    var currentJSONGraph = getJSONGraph(model, optimizedPaths);
    var disposable = new AssignableDisposable();

    // Sends out the setRequest.  The Queue will call the callback with the
    // JSONGraph envelope / error.
    var requestDisposable = model._request.
        // TODO: There is error handling that has not been addressed yet.

        // If disposed before this point then the sendSetRequest will not
        // further any callbacks.  Therefore, if we are at this spot, we are
        // not disposed yet.
        set(currentJSONGraph, function(error, jsonGraphEnv) {
            if (typeof error === InvalidSourceError) {
                observer.onError(error);
                return;
            }

            // TODO: This seems like there are errors with this approach, but
            // for sanity sake I am going to keep this logic in here until a
            // rethink can be done.
            var isCompleted = false;
            if (error || optimizedPaths.length === jsonGraphEnv.paths.length) {
                isCompleted = true;
            }

            // Happy case.  One request to the dataSource will fulfill the
            // required paths.
            if (isCompleted) {
                disposable.currentDisposable =
                    subscribeToFollowupGet(model, observer, requestedPaths,
                                          isJSONGraph, isProgressive);
            }

            // TODO: The unhappy case.  I am unsure how this can even be
            // achieved.
            else {
                // We need to restart the setRequestCycle.
                setRequestCycle(model, observer, groups, isJSONGraph,
                                isProgressive, count + 1);
            }
        });

    // Sets the current disposable as the requestDisposable.
    disposable.currentDisposable = requestDisposable;

    return disposable;
};

function getJSONGraph(model, optimizedPaths) {
    var boundPath = model._path;
    var envelope = {};
    model._path = emptyArray;
    model._getPathValuesAsJSONG(model._materialize().withoutDataSource(), optimizedPaths, [envelope]);
    model._path = boundPath;

    return envelope;
}

function subscribeToFollowupGet(model, observer, requestedPaths, isJSONGraph,
                               isProgressive) {

    // Creates a new response and subscribes to it with the original observer.
    // Also sets forceCollect to true, incase the operation is synchronous and
    // exceeds the cache limit size
    var response = new GetResponse(model, requestedPaths, isJSONGraph,
                                   isProgressive, true);
    return response.subscribe(observer);
}

},{"11":11,"12":12,"22":22,"48":48,"53":53,"61":61}],63:[function(require,module,exports){
module.exports = {
    pathValue: true,
    pathSyntax: true,
    json: true,
    jsonGraph: true
};


},{}],64:[function(require,module,exports){
var asap = require(116);
var empty = {dispose: function() {}};

function ASAPScheduler() {}

ASAPScheduler.prototype.schedule = function schedule(action) {
    asap(action);
    return empty;
};

ASAPScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
    var self = this;
    asap(function() {
        action(self, state);
    });
    return empty;
};

module.exports = ASAPScheduler;

},{"116":116}],65:[function(require,module,exports){
var empty = {dispose: function() {}};

function ImmediateScheduler() {}

ImmediateScheduler.prototype.schedule = function schedule(action) {
    action();
    return empty;
};

ImmediateScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
    action(this, state);
    return empty;
};

module.exports = ImmediateScheduler;

},{}],66:[function(require,module,exports){
function TimeoutScheduler(delay) {
    this.delay = delay;
}

var TimerDisposable = function TimerDisposable(id) {
    this.id = id;
    this.disposed = false;
};

TimeoutScheduler.prototype.schedule = function schedule(action) {
    var id = setTimeout(action, this.delay);
    return new TimerDisposable(id);
};

TimeoutScheduler.prototype.scheduleWithState = function scheduleWithState(state, action) {
    var self = this;
    var id = setTimeout(function() {
        action(self, state);
    }, this.delay);
    return new TimerDisposable(id);
};

TimerDisposable.prototype.dispose = function() {
    if (this.disposed) {
        return;
    }

    clearTimeout(this.id);
    this.disposed = true;
};

module.exports = TimeoutScheduler;

},{}],67:[function(require,module,exports){
var createHardlink = require(77);
var $ref = require(113);

var isExpired = require(86);
var isFunction = require(88);
var isPrimitive = require(94);
var expireNode = require(78);
var iterateKeySet = require(138).iterateKeySet;
var incrementVersion = require(84);
var mergeJSONGraphNode = require(95);
var NullInPathError = require(13);

/**
 * Merges a list of {@link JSONGraphEnvelope}s into a {@link JSONGraph}.
 * @function
 * @param {Object} model - the Model for which to merge the {@link JSONGraphEnvelope}s.
 * @param {Array.<PathValue>} jsonGraphEnvelopes - the {@link JSONGraphEnvelope}s to merge.
 * @return {Array.<Array.<Path>>} - an Array of Arrays where each inner Array is a list of requested and optimized paths (respectively) for the successfully set values.
 */

module.exports = function setJSONGraphs(model, jsonGraphEnvelopes, x, errorSelector, comparator, replacedPaths) {

    var modelRoot = model._root;
    var lru = modelRoot;
    var expired = modelRoot.expired;
    var version = incrementVersion();
    var cache = modelRoot.cache;
    var initialVersion = cache.$_version;

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
                version, expired, lru, comparator, errorSelector, replacedPaths
            );
        }
    }

    var newVersion = cache.$_version;
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
    version, expired, lru, comparator, errorSelector, replacedPaths) {

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
            version, expired, lru, comparator, errorSelector, replacedPaths
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
                    version, expired, lru, comparator, errorSelector, replacedPaths
                );
            } else {
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
    version, expired, lru, comparator, errorSelector, replacedPaths) {

    var reference = node.value;
    optimizedPath.splice(0, optimizedPath.length);
    optimizedPath.push.apply(optimizedPath, reference);

    if (isExpired(node)) {
        optimizedPath.index = reference.length;
        expireNode(node, expired, lru);
        return [undefined, root, message, messageRoot];
    }

    var index = 0;
    var container = node;
    var count = reference.length - 1;
    var parent = node = root;
    var messageParent = message = messageRoot;

    do {
        var key = reference[index];
        var branch = index < count;
        optimizedPath.index = index;

        var results = setNode(
            root, parent, node, messageRoot, messageParent, message,
            key, branch, true, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector, replacedPaths
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

    if (container.$_context !== node) {
        createHardlink(container, node);
    }

    return [node, parent, message, messageParent];
}

function setNode(
    root, parent, node, messageRoot, messageParent, message,
    key, branch, reference, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector, replacedPaths) {

    var type = node.$type;

    while (type === $ref) {

        var results = setReference(
            root, node, messageRoot, message, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector, replacedPaths
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
            throw new NullInPathError();
        } else if (node) {
            key = node.$_key;
        }
    } else {
        parent = node;
        messageParent = message;
        node = parent[key];
        message = messageParent && messageParent[key];
    }

    node = mergeJSONGraphNode(
        parent, node, message, key, requestedPath, optimizedPath,
        version, expired, lru, comparator, errorSelector, replacedPaths
    );

    return [node, parent, message, messageParent];
}

},{"113":113,"13":13,"138":138,"77":77,"78":78,"84":84,"86":86,"88":88,"94":94,"95":95}],68:[function(require,module,exports){
var createHardlink = require(77);
var __prefix = require(36);
var $ref = require(113);

var getBoundValue = require(16);

var isArray = Array.isArray;
var hasOwn = require(83);
var isObject = require(92);
var isExpired = require(87);
var isFunction = require(88);
var isPrimitive = require(94);
var expireNode = require(78);
var incrementVersion = require(84);
var mergeValueOrInsertBranch = require(96);
var NullInPathError = require(13);

/**
 * Sets a list of {@link PathMapEnvelope}s into a {@link JSONGraph}.
 * @function
 * @param {Object} model - the Model for which to insert the PathMaps.
 * @param {Array.<PathMapEnvelope>} pathMapEnvelopes - the a list of {@link PathMapEnvelope}s to set.
 * @return {Array.<Array.<Path>>} - an Array of Arrays where each inner Array is a list of requested and optimized paths (respectively) for the successfully set values.
 */

module.exports = function setPathMaps(model, pathMapEnvelopes, x, errorSelector, comparator) {

    var modelRoot = model._root;
    var lru = modelRoot;
    var expired = modelRoot.expired;
    var version = incrementVersion();
    var bound = model._path;
    var cache = modelRoot.cache;
    var node = bound.length ? getBoundValue(model, bound).value : cache;
    var parent = node.$_parent || cache;
    var initialVersion = cache.$_version;

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

    var newVersion = cache.$_version;
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

    var container = node;
    var parent = root;

    node = node.$_context;

    if (node != null) {
        parent = node.$_parent || root;
        optimizedPath.index = reference.length;
    } else {

        var index = 0;
        var count = reference.length - 1;
        optimizedPath.index = index;

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

        if (container.$_context !== node) {
            createHardlink(container, node);
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
            throw new NullInPathError();
        } else if (node) {
            key = node.$_key;
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
            if (key[0] === __prefix || !hasOwn(pathMap, key)) {
                continue;
            }
            keys[itr++] = key;
        }
        return keys;
    }

    return void 0;
}

},{"113":113,"13":13,"16":16,"36":36,"77":77,"78":78,"83":83,"84":84,"87":87,"88":88,"92":92,"94":94,"96":96}],69:[function(require,module,exports){
var createHardlink = require(77);
var $ref = require(113);

var getBoundValue = require(16);

var isExpired = require(87);
var isFunction = require(88);
var isPrimitive = require(94);
var expireNode = require(78);
var iterateKeySet = require(138).iterateKeySet;
var incrementVersion = require(84);
var mergeValueOrInsertBranch = require(96);
var NullInPathError = require(13);

/**
 * Sets a list of {@link PathValue}s into a {@link JSONGraph}.
 * @function
 * @param {Object} model - the Model for which to insert the {@link PathValue}s.
 * @param {Array.<PathValue>} pathValues - the list of {@link PathValue}s to set.
 * @return {Array.<Array.<Path>>} - an Array of Arrays where each inner Array is a list of requested and optimized paths (respectively) for the successfully set values.
 */

module.exports = function setPathValues(model, pathValues, x, errorSelector, comparator) {

    var modelRoot = model._root;
    var lru = modelRoot;
    var expired = modelRoot.expired;
    var version = incrementVersion();
    var bound = model._path;
    var cache = modelRoot.cache;
    var node = bound.length ? getBoundValue(model, bound).value : cache;
    var parent = node.$_parent || cache;
    var initialVersion = cache.$_version;

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

    var newVersion = cache.$_version;
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
    version, expired, lru, comparator, errorSelector, replacedPaths) {

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
            version, expired, lru, comparator, errorSelector, replacedPaths
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
    version, expired, lru, comparator, errorSelector, replacedPaths) {

    var reference = node.value;
    optimizedPath.splice(0, optimizedPath.length);
    optimizedPath.push.apply(optimizedPath, reference);

    if (isExpired(node)) {
        optimizedPath.index = reference.length;
        expireNode(node, expired, lru);
        return [undefined, root];
    }

    var container = node;
    var parent = root;

    node = node.$_context;

    if (node != null) {
        parent = node.$_parent || root;
        optimizedPath.index = reference.length;
    } else {

        var index = 0;
        var count = reference.length - 1;

        parent = node = root;

        do {
            var key = reference[index];
            var branch = index < count;
            optimizedPath.index = index;

            var results = setNode(
                root, parent, node, key, value,
                branch, true, requestedPath, optimizedPath,
                version, expired, lru, comparator, errorSelector, replacedPaths
            );
            node = results[0];
            if (isPrimitive(node)) {
                optimizedPath.index = index;
                return results;
            }
            parent = results[1];
        } while (index++ < count);

        optimizedPath.index = index;

        if (container.$_context !== node) {
            createHardlink(container, node);
        }
    }

    return [node, parent];
}

function setNode(
    root, parent, node, key, value,
    branch, reference, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector, replacedPaths) {

    var type = node.$type;

    while (type === $ref) {

        var results = setReference(
            value, root, node, requestedPath, optimizedPath,
            version, expired, lru, comparator, errorSelector, replacedPaths
        );

        node = results[0];

        if (isPrimitive(node)) {
            return results;
        }

        parent = results[1];
        type = node.$type;
    }

    if (branch && type !== void 0) {
        return [node, parent];
    }

    if (key == null) {
        if (branch) {
            throw new NullInPathError();
        } else if (node) {
            key = node.$_key;
        }
    } else {
        parent = node;
        node = parent[key];
    }

    node = mergeValueOrInsertBranch(
        parent, node, key, value,
        branch, reference, requestedPath, optimizedPath,
        version, expired, lru, comparator, errorSelector, replacedPaths
    );

    return [node, parent];
}

},{"113":113,"13":13,"138":138,"16":16,"77":77,"78":78,"84":84,"87":87,"88":88,"94":94,"96":96}],70:[function(require,module,exports){
var jsong = require(123);
var ModelResponse = require(51);
var isPathValue = require(93);

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
        return self.set(value).subscribe(function(data) {
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

},{"123":123,"51":51,"93":93}],71:[function(require,module,exports){
var pathSyntax = require(127);
var isPathValue = require(93);
var setPathValues = require(69);

module.exports = function setValueSync(pathArg, valueArg, errorSelectorArg, comparatorArg) {

    var path = pathSyntax.fromPath(pathArg);
    var value = valueArg;
    var errorSelector = errorSelectorArg;
    // XXX comparator is never used.
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

    this._syncCheck("setValueSync");
    setPathValues(this, [value]);
    return this._getValueSync(this, value.path).value;
};

},{"127":127,"69":69,"93":93}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
module.exports = function arrayMap(array, selector) {
    var i = -1;
    var n = array.length;
    var array2 = new Array(n);
    while (++i < n) {
        array2[i] = selector(array[i], i, array);
    }
    return array2;
};

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
var privatePrefix = require(34);
var hasOwn = require(83);
var isArray = Array.isArray;
var isObject = require(92);

module.exports = function clone(value) {
    var dest = value;
    if (isObject(dest)) {
        dest = isArray(value) ? [] : {};
        var src = value;
        for (var key in src) {
            if (key.substr(0,2) === privatePrefix || !hasOwn(src, key)) {
                continue;
            }
            dest[key] = src[key];
        }
    }
    return dest;
};

},{"34":34,"83":83,"92":92}],77:[function(require,module,exports){
var __ref = require(35);

module.exports = function createHardlink(from, to) {

    // create a back reference
    // eslint-disable-next-line camelcase
    var backRefs = to.$_refsLength || 0;
    to[__ref + backRefs] = from;
    // eslint-disable-next-line camelcase
    to.$_refsLength = backRefs + 1;

    // create a hard reference
    // eslint-disable-next-line camelcase
    from.$_refIndex = backRefs;
    // eslint-disable-next-line camelcase
    from.$_context = to;
};

},{"35":35}],78:[function(require,module,exports){
var splice = require(41);

module.exports = function expireNode(node, expired, lru) {
    // eslint-disable-next-line camelcase
    if (!node.$_invalidated) {
        // eslint-disable-next-line camelcase
        node.$_invalidated = true;
        expired.push(node);
        splice(lru, node);
    }
    return node;
};

},{"41":41}],79:[function(require,module,exports){
var isObject = require(92);
module.exports = function getSize(node) {
    return isObject(node) && node.$expires || undefined;
};

},{"92":92}],80:[function(require,module,exports){
var isObject = require(92);
module.exports = function getSize(node) {
    return isObject(node) && node.$size || 0;
};

},{"92":92}],81:[function(require,module,exports){
var isObject = require(92);
module.exports = function getTimestamp(node) {
    return isObject(node) && node.$timestamp || undefined;
};

},{"92":92}],82:[function(require,module,exports){
var isObject = require(92);

module.exports = function getType(node, anyType) {
    var type = isObject(node) && node.$type || void 0;
    if (anyType && type) {
        return "branch";
    }
    return type;
};

},{"92":92}],83:[function(require,module,exports){
var isObject = require(92);
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function(obj, prop) {
  return isObject(obj) && hasOwn.call(obj, prop);
};

},{"92":92}],84:[function(require,module,exports){
var version = 1;
module.exports = function incrementVersion() {
    return version++;
};

},{}],85:[function(require,module,exports){
module.exports = function insertNode(node, parent, key, version, optimizedPath) {
    // eslint-disable-next-line camelcase
    node.$_key = key;
    // eslint-disable-next-line camelcase
    node.$_parent = parent;

    if (version !== undefined) {
        // eslint-disable-next-line camelcase
        node.$_version = version;
    }
    // eslint-disable-next-line camelcase
    if (!node.$_absolutePath) {
        // eslint-disable-next-line camelcase
        node.$_absolutePath = optimizedPath.slice(0, optimizedPath.index).concat(key);
    }

    parent[key] = node;

    return node;
};

},{}],86:[function(require,module,exports){
var now = require(98);
var $now = require(115);
var $never = require(114);

module.exports = function isAlreadyExpired(node) {
    var exp = node.$expires;
    return (exp != null) && (
        exp !== $never) && (
        exp !== $now) && (
        exp < now());
};

},{"114":114,"115":115,"98":98}],87:[function(require,module,exports){
var now = require(98);
var $now = require(115);
var $never = require(114);

module.exports = function isExpired(node) {
    var exp = node.$expires;
    return (exp != null) && (
        exp !== $never ) && (
        exp === $now || exp < now());
};

},{"114":114,"115":115,"98":98}],88:[function(require,module,exports){
var functionTypeof = "function";

module.exports = function isFunction(func) {
    return Boolean(func) && typeof func === functionTypeof;
};

},{}],89:[function(require,module,exports){
var privatePrefix = require(34);

/**
 * Determined if the key passed in is an internal key.
 *
 * @param {String} x The key
 * @private
 * @returns {Boolean}
 */
module.exports = function isInternalKey(x) {
    return x === "$size" ||
        x.substr(0, 2) === privatePrefix;
};

},{"34":34}],90:[function(require,module,exports){
var isObject = require(92);

module.exports = function isJSONEnvelope(envelope) {
    return isObject(envelope) && ("json" in envelope);
};

},{"92":92}],91:[function(require,module,exports){
var isArray = Array.isArray;
var isObject = require(92);

module.exports = function isJSONGraphEnvelope(envelope) {
    return isObject(envelope) && isArray(envelope.paths) && (
        isObject(envelope.jsonGraph) ||
        isObject(envelope.jsong) ||
        isObject(envelope.json) ||
        isObject(envelope.values) ||
        isObject(envelope.value)
    );
};

},{"92":92}],92:[function(require,module,exports){
var objTypeof = "object";
module.exports = function isObject(value) {
    return value !== null && typeof value === objTypeof;
};

},{}],93:[function(require,module,exports){
var isArray = Array.isArray;
var isObject = require(92);

module.exports = function isPathValue(pathValue) {
    return isObject(pathValue) && (
        isArray(pathValue.path) || (
            typeof pathValue.path === "string"
        ));
};

},{"92":92}],94:[function(require,module,exports){
var objTypeof = "object";
module.exports = function isPrimitive(value) {
    return value == null || typeof value !== objTypeof;
};

},{}],95:[function(require,module,exports){
var $ref = require(113);
var $error = require(112);
var getSize = require(80);
var getTimestamp = require(81);
var isObject = require(92);
var isExpired = require(87);
var isFunction = require(88);

var wrapNode = require(109);
var insertNode = require(85);
var expireNode = require(78);
var replaceNode = require(102);
var updateNodeAncestors = require(107);
var reconstructPath = require(99);

module.exports = function mergeJSONGraphNode(
    parent, node, message, key, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector, replacedPaths) {

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
            node = insertNode(node, parent, key, undefined, optimizedPath);
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
                    // give it a parent, key, and absolute path.
                    if (node.$_parent == null) {
                        insertNode(node, parent, key, version, optimizedPath);
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
                    if (node.$_parent != null) {
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
        return insertNode(replaceNode(node, message, parent, key, lru, replacedPaths), parent, key, undefined, optimizedPath);
    }
    // If the message is a sentinel or primitive, insert it into the cache.
    else if (mType || !mIsObject) {
        // If the cache and the message are the same value, we branch-merged one
        // of the message's ancestors. If this is the first time we've seen this
        // leaf, give the message a $size and $type, attach its graph pointers,
        // and update the cache sizes and versions.

        if (mType === $error && isFunction(errorSelector)) {
            message = errorSelector(reconstructPath(requestedPath, key), message);
            mType = message.$type || mType;
        }

        if (mType && node === message) {
            if (node.$_parent == null) {
                node = wrapNode(node, mType, node.value);
                parent = updateNodeAncestors(parent, -node.$size, lru, version);
                node = insertNode(node, parent, key, version, optimizedPath);
            }
        }
        // If the cache and message are different, the cache value is expired,
        // or the message is a primitive, replace the cache with the message value.
        // If the message is a sentinel, clone and maintain its type.
        // If the message is a primitive value, wrap it in an atom.
        else {
            var isDistinct = true;
            // If the cache is a branch, but the message is a leaf, replace the
            // cache branch with the message leaf.
            if ((cType && !isExpired(node)) || !cIsObject) {
                // Compare the current cache value with the new value. If either of
                // them don't have a timestamp, or the message's timestamp is newer,
                // replace the cache value with the message value. If a comparator
                // is specified, the comparator takes precedence over timestamps.
                //
                // Comparing either Number or undefined to undefined always results in false.
                isDistinct = (getTimestamp(message) < getTimestamp(node)) === false;
                // If at least one of the cache/message are sentinels, compare them.
                if (isDistinct && (cType || mType) && isFunction(comparator)) {
                    isDistinct = !comparator(node, message, optimizedPath.slice(0, optimizedPath.index));
                }
            }
            if (isDistinct) {
                message = wrapNode(message, mType, mType ? message.value : message);
                sizeOffset = getSize(node) - getSize(message);
                node = replaceNode(node, message, parent, key, lru, replacedPaths);
                parent = updateNodeAncestors(parent, sizeOffset, lru, version);
                node = insertNode(node, parent, key, version, optimizedPath);
            }
        }

        // Promote the message edge in the LRU.
        if (isExpired(node)) {
            expireNode(node, expired, lru);
        }
    }
    else if (node == null) {
        node = insertNode(message, parent, key, undefined, optimizedPath);
    }

    return node;
};

},{"102":102,"107":107,"109":109,"112":112,"113":113,"78":78,"80":80,"81":81,"85":85,"87":87,"88":88,"92":92,"99":99}],96:[function(require,module,exports){
var $ref = require(113);
var $error = require(112);
var getType = require(82);
var getSize = require(80);
var getTimestamp = require(81);

var isExpired = require(87);
var isPrimitive = require(94);
var isFunction = require(88);

var wrapNode = require(109);
var expireNode = require(78);
var insertNode = require(85);
var replaceNode = require(102);
var updateNodeAncestors = require(107);
var updateBackReferenceVersions = require(106);
var reconstructPath = require(99);

module.exports = function mergeValueOrInsertBranch(
    parent, node, key, value,
    branch, reference, requestedPath, optimizedPath,
    version, expired, lru, comparator, errorSelector, replacedPaths) {

    var type = getType(node, reference);

    if (branch || reference) {
        if (type && isExpired(node)) {
            type = "expired";
            expireNode(node, expired, lru);
        }
        if ((type && type !== $ref) || isPrimitive(node)) {
            node = replaceNode(node, {}, parent, key, lru, replacedPaths);
            node = insertNode(node, parent, key, version, optimizedPath);
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
                mType = message.$type || mType;
            }

            message = wrapNode(message, mType, mType ? message.value : message);

            var sizeOffset = getSize(node) - getSize(message);

            node = replaceNode(node, message, parent, key, lru, replacedPaths);
            parent = updateNodeAncestors(parent, sizeOffset, lru, version);
            node = insertNode(node, parent, key, version, optimizedPath);
        }
    }

    return node;
};

},{"102":102,"106":106,"107":107,"109":109,"112":112,"113":113,"78":78,"80":80,"81":81,"82":82,"85":85,"87":87,"88":88,"94":94,"99":99}],97:[function(require,module,exports){
module.exports = function noop() {};

},{}],98:[function(require,module,exports){
module.exports = Date.now;

},{}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
var $ref = require(113);
var splice = require(41);
var isObject = require(92);
var unlinkBackReferences = require(104);
var unlinkForwardReference = require(105);

module.exports = function removeNode(node, parent, key, lru) {
    if (isObject(node)) {
        var type = node.$type;
        if (type) {
            if (type === $ref) {
                unlinkForwardReference(node);
            }
            splice(lru, node);
        }
        unlinkBackReferences(node);
        // eslint-disable-next-line camelcase
        parent[key] = node.$_parent = void 0;
        return true;
    }
    return false;
};

},{"104":104,"105":105,"113":113,"41":41,"92":92}],101:[function(require,module,exports){
var hasOwn = require(83);
var prefix = require(36);
var removeNode = require(100);

module.exports = function removeNodeAndDescendants(node, parent, key, lru, mergeContext) {
    if (removeNode(node, parent, key, lru)) {
        if (node.$type !== undefined && mergeContext && node.$_absolutePath) {
            mergeContext.hasInvalidatedResult = true;
        }

        if (node.$type == null) {
            for (var key2 in node) {
                if (key2[0] !== prefix && hasOwn(node, key2)) {
                    removeNodeAndDescendants(node[key2], node, key2, lru, mergeContext);
                }
            }
        }
        return true;
    }
    return false;
};

},{"100":100,"36":36,"83":83}],102:[function(require,module,exports){
var isObject = require(92);
var transferBackReferences = require(103);
var removeNodeAndDescendants = require(101);

module.exports = function replaceNode(node, replacement, parent, key, lru, mergeContext) {
    if (node === replacement) {
        return node;
    } else if (isObject(node)) {
        transferBackReferences(node, replacement);
        removeNodeAndDescendants(node, parent, key, lru, mergeContext);
    }

    parent[key] = replacement;
    return replacement;
};

},{"101":101,"103":103,"92":92}],103:[function(require,module,exports){
var __ref = require(35);

module.exports = function transferBackReferences(fromNode, destNode) {
    // eslint-disable-next-line camelcase
    var fromNodeRefsLength = fromNode.$_refsLength || 0,
        // eslint-disable-next-line camelcase
        destNodeRefsLength = destNode.$_refsLength || 0,
        i = -1;
    while (++i < fromNodeRefsLength) {
        var ref = fromNode[__ref + i];
        if (ref !== void 0) {
            // eslint-disable-next-line camelcase
            ref.$_context = destNode;
            destNode[__ref + (destNodeRefsLength + i)] = ref;
            fromNode[__ref + i] = void 0;
        }
    }
    // eslint-disable-next-line camelcase
    destNode.$_refsLength = fromNodeRefsLength + destNodeRefsLength;
    // eslint-disable-next-line camelcase
    fromNode.$_refsLength = void 0;
    return destNode;
};

},{"35":35}],104:[function(require,module,exports){
var __ref = require(35);

module.exports = function unlinkBackReferences(node) {
    // eslint-disable-next-line camelcase
    var i = -1, n = node.$_refsLength || 0;
    while (++i < n) {
        var ref = node[__ref + i];
        if (ref != null) {
            // eslint-disable-next-line camelcase
            ref.$_context = ref.$_refIndex = node[__ref + i] = void 0;
        }
    }
    // eslint-disable-next-line camelcase
    node.$_refsLength = void 0;
    return node;
};

},{"35":35}],105:[function(require,module,exports){
var __ref = require(35);

module.exports = function unlinkForwardReference(reference) {
    // eslint-disable-next-line camelcase
    var destination = reference.$_context;
    if (destination) {
        // eslint-disable-next-line camelcase
        var i = (reference.$_refIndex || 0) - 1,
            // eslint-disable-next-line camelcase
            n = (destination.$_refsLength || 0) - 1;
        while (++i <= n) {
            destination[__ref + i] = destination[__ref + (i + 1)];
        }
        // eslint-disable-next-line camelcase
        destination.$_refsLength = n;
        // eslint-disable-next-line camelcase
        reference.$_refIndex = reference.$_context = destination = void 0;
    }
    return reference;
};

},{"35":35}],106:[function(require,module,exports){
var __ref = require(35);

module.exports = function updateBackReferenceVersions(nodeArg, version) {
    var stack = [nodeArg];
    var count = 0;
    do {
        var node = stack[count];
        // eslint-disable-next-line camelcase
        if (node && node.$_version !== version) {
            // eslint-disable-next-line camelcase
            node.$_version = version;
            // eslint-disable-next-line camelcase
            stack[count++] = node.$_parent;
            var i = -1;
            // eslint-disable-next-line camelcase
            var n = node.$_refsLength || 0;
            while (++i < n) {
                stack[count++] = node[__ref + i];
            }
        }
    } while (--count > -1);
    return nodeArg;
};

},{"35":35}],107:[function(require,module,exports){
var removeNode = require(100);
var updateBackReferenceVersions = require(106);

module.exports = function updateNodeAncestors(nodeArg, offset, lru, version) {
    var child = nodeArg;
    do {
        var node = child.$_parent;
        var size = child.$size = (child.$size || 0) - offset;
        if (size <= 0 && node != null) {
            removeNode(child, node, child.$_key, lru);
        } else if (child.$_version !== version) {
            updateBackReferenceVersions(child, version);
        }
        child = node;
    } while (child);
    return nodeArg;
};

},{"100":100,"106":106}],108:[function(require,module,exports){
var isArray = Array.isArray;
var isPathValue = require(93);
var isJSONGraphEnvelope = require(91);
var isJSONEnvelope = require(90);
var pathSyntax = require(127);

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

},{"127":127,"90":90,"91":91,"93":93}],109:[function(require,module,exports){
var now = require(98);
var expiresNow = require(115);

var atomSize = 50;

var clone = require(76);
var isArray = Array.isArray;
var getSize = require(80);
var getExpires = require(79);
var atomType = require(111);

module.exports = function wrapNode(nodeArg, typeArg, value) {

    var size = 0;
    var node = nodeArg;
    var type = typeArg;

    if (type) {
        var modelCreated = node.$_modelCreated;
        node = clone(node);
        size = getSize(node);
        node.$type = type;
        // eslint-disable-next-line camelcase
        node.$_prev = undefined;
        // eslint-disable-next-line camelcase
        node.$_next = undefined;
        // eslint-disable-next-line camelcase
        node.$_modelCreated = modelCreated || false;
    } else {
        node = {
            $type: atomType,
            value: value,
            // eslint-disable-next-line camelcase
            $_prev: undefined,
            // eslint-disable-next-line camelcase
            $_next: undefined,
            // eslint-disable-next-line camelcase
            $_modelCreated: true
        };
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

},{"111":111,"115":115,"76":76,"79":79,"80":80,"98":98}],110:[function(require,module,exports){
/**
 * FromEsObserverAdapter is an adpater from an ES Observer to an Rx 2 Observer
 * @constructor FromEsObserverAdapter
*/
function FromEsObserverAdapter(esObserver) {
    this.esObserver = esObserver;
}

FromEsObserverAdapter.prototype = {
    onNext: function onNext(value) {
        if (typeof this.esObserver.next === "function") {
            this.esObserver.next(value);
        }
    },
    onError: function onError(error) {
        if (typeof this.esObserver.error === "function") {
            this.esObserver.error(error);
        }
    },
    onCompleted: function onCompleted() {
        if (typeof this.esObserver.complete === "function") {
            this.esObserver.complete();
        }
    }
};

/**
 * ToEsSubscriptionAdapter is an adpater from the Rx 2 subscription to the ES subscription
 * @constructor ToEsSubscriptionAdapter
*/
function ToEsSubscriptionAdapter(subscription) {
    this.subscription = subscription;
}

ToEsSubscriptionAdapter.prototype.unsubscribe = function unsubscribe() {
    this.subscription.dispose();
};


function toEsObservable(_self) {
    return {
        subscribe: function subscribe(observer) {
            return new ToEsSubscriptionAdapter(_self.subscribe(new FromEsObserverAdapter(observer)));
        }
    };
}

module.exports = toEsObservable;

},{}],111:[function(require,module,exports){
module.exports = "atom";

},{}],112:[function(require,module,exports){
module.exports = "error";

},{}],113:[function(require,module,exports){
module.exports = "ref";

},{}],114:[function(require,module,exports){
module.exports = 1;

},{}],115:[function(require,module,exports){
module.exports = 0;

},{}],116:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require(117);
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

},{"117":117}],117:[function(require,module,exports){
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
},{}],118:[function(require,module,exports){
'use strict';
var request = require(122);
var buildQueryObject = require(119);
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

},{"119":119,"122":122}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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
},{}],121:[function(require,module,exports){
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
},{}],122:[function(require,module,exports){
'use strict';
var getXMLHttpRequest = require(121);
var getCORSRequest = require(120);
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

},{"120":120,"121":121}],123:[function(require,module,exports){
var pathSyntax = require(127);

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

},{"127":127}],124:[function(require,module,exports){
module.exports = {
    integers: 'integers',
    ranges: 'ranges',
    keys: 'keys'
};

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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


},{}],127:[function(require,module,exports){
var Tokenizer = require(133);
var head = require(128);
var RoutedTokens = require(124);

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

},{"124":124,"128":128,"133":133}],128:[function(require,module,exports){
var TokenTypes = require(125);
var E = require(126);
var indexer = require(129);

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


},{"125":125,"126":126,"129":129}],129:[function(require,module,exports){
var TokenTypes = require(125);
var E = require(126);
var idxE = E.indexer;
var range = require(131);
var quote = require(130);
var routed = require(132);

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


},{"125":125,"126":126,"130":130,"131":131,"132":132}],130:[function(require,module,exports){
var TokenTypes = require(125);
var E = require(126);
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


},{"125":125,"126":126}],131:[function(require,module,exports){
var Tokenizer = require(133);
var TokenTypes = require(125);
var E = require(126);

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


},{"125":125,"126":126,"133":133}],132:[function(require,module,exports){
var TokenTypes = require(125);
var RoutedTokens = require(124);
var E = require(126);
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


},{"124":124,"125":125,"126":126}],133:[function(require,module,exports){
var TokenTypes = require(125);
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



},{"125":125}],134:[function(require,module,exports){
var toPaths = require(147);
var toTree = require(148);

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

},{"147":147,"148":148}],135:[function(require,module,exports){
/*eslint-disable*/
module.exports = {
    innerReferences: 'References with inner references are not allowed.',
    circularReference: 'There appears to be a circular reference, maximum reference following exceeded.'
};


},{}],136:[function(require,module,exports){
var cloneArray = require(145);
var $ref = require(146).$ref;
var errors = require(135);

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


},{"135":135,"145":145,"146":146}],137:[function(require,module,exports){
var iterateKeySet = require(139);

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

},{"139":139}],138:[function(require,module,exports){
module.exports = {
    iterateKeySet: require(139),
    toTree: require(148),
    pathsComplementFromTree: require(143),
    pathsComplementFromLengthTree: require(142),
    hasIntersection: require(137),
    toPaths: require(147),
    collapse: require(134),
    optimizePathSets: require(140),
    pathCount: require(141)
};

},{"134":134,"137":137,"139":139,"140":140,"141":141,"142":142,"143":143,"147":147,"148":148}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
var iterateKeySet = require(139);
var cloneArray = require(145);
var catAndSlice = require(144);
var $types = require(146);
var $ref = $types.$ref;
var followReference = require(136);

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
    var isKeySet = typeof keySet === 'object';
    var nextDepth = depth + 1;
    var iteratorNote = false;
    var key = keySet;
    if (isKeySet) {
        iteratorNote = {};
        key = iterateKeySet(keySet, iteratorNote);
    }
    var next, nextOptimized;
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

        if (iteratorNote && !iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }
    } while (iteratorNote && !iteratorNote.done);
}



},{"136":136,"139":139,"144":144,"145":145,"146":146}],141:[function(require,module,exports){
"use strict";

/**
 * Helper for getPathCount. Used to determine the size of a key or range.
 * @function
 * @param {Object} rangeOrKey
 * @return The size of the key or range passed in.
 */
function getRangeOrKeySize(rangeOrKey) {
    if (rangeOrKey == null) {
        return 1;
    } else if (Array.isArray(rangeOrKey)) {
        throw new Error("Unexpected Array found in keySet: " + JSON.stringify(rangeOrKey));
    } else if (typeof rangeOrKey === "object") {
        return getRangeSize(rangeOrKey);
    } else {
        return 1;
    }
}

/**
 * Returns the size (number of items) in a Range,
 * @function
 * @param {Object} range The Range with both "from" and "to", or just "to"
 * @return The number of items in the range.
 */
function getRangeSize(range) {

    var to = range.to;
    var length = range.length;

    if (to != null) {
        if (isNaN(to) || parseInt(to, 10) !== to) {
            throw new Error("Invalid range, 'to' is not an integer: " + JSON.stringify(range));
        }
        var from = range.from || 0;
        if (isNaN(from) || parseInt(from, 10) !== from) {
            throw new Error("Invalid range, 'from' is not an integer: " + JSON.stringify(range));
        }
        if (from <= to) {
            return (to - from) + 1;
        } else {
            return 0;
        }
    } else if (length != null) {
        if (isNaN(length) || parseInt(length, 10) !== length) {
            throw new Error("Invalid range, 'length' is not an integer: " + JSON.stringify(range));
        } else {
            return length;
        }
    } else {
        throw new Error("Invalid range, expected 'to' or 'length': " + JSON.stringify(range));
    }
}

/**
 * Returns a count of the number of paths this pathset
 * represents.
 *
 * For example, ["foo", {"from":0, "to":10}, "bar"],
 * would represent 11 paths (0 to 10, inclusive), and
 * ["foo, ["baz", "boo"], "bar"] would represent 2 paths.
 *
 * @function
 * @param {Object[]} pathSet the path set.
 *
 * @return The number of paths this represents
 */
function getPathCount(pathSet) {
    if (pathSet.length === 0) {
        throw new Error("All paths must have length larger than zero.");
    }

    var numPaths = 1;

    for (var i = 0; i < pathSet.length; i++) {
        var segment = pathSet[i];

        if (Array.isArray(segment)) {

            var numKeys = 0;

            for (var j = 0; j < segment.length; j++) {
                var keySet = segment[j];

                numKeys += getRangeOrKeySize(keySet);
            }

            numPaths *= numKeys;

        } else {
            numPaths *= getRangeOrKeySize(segment);
        }
    }

    return numPaths;
}


module.exports = getPathCount;

},{}],142:[function(require,module,exports){
var hasIntersection = require(137);

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


},{"137":137}],143:[function(require,module,exports){
var hasIntersection = require(137);

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


},{"137":137}],144:[function(require,module,exports){
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


},{}],145:[function(require,module,exports){
function cloneArray(arr, index) {
    var a = [];
    var len = arr.length;
    for (var i = index || 0; i < len; i++) {
        a[i] = arr[i];
    }
    return a;
}

module.exports = cloneArray;


},{}],146:[function(require,module,exports){
module.exports = {
    $ref: 'ref',
    $atom: 'atom',
    $error: 'error'
};


},{}],147:[function(require,module,exports){
var isArray = Array.isArray;
var typeOfObject = "object";
var typeOfString = "string";
var typeOfNumber = "number";
var MAX_SAFE_INTEGER = 9007199254740991; // Number.MAX_SAFE_INTEGER in es6
var MAX_SAFE_INTEGER_DIGITS = 16; // String(Number.MAX_SAFE_INTEGER).length
var MIN_SAFE_INTEGER_DIGITS = 17; // String(Number.MIN_SAFE_INTEGER).length (including sign)
var abs = Math.abs;
var safeNumberRegEx = /^(0|(\-?[1-9][0-9]*))$/;

/* jshint forin: false */
module.exports = function toPaths(lengths) {
    var pathmap;
    var allPaths = [];
    var allPathsLength = 0;
    for (var length in lengths) {
        if (isSafeNumber(length) && isObject(pathmap = lengths[length])) {
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

            isSafeNumber(key) &&
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

        if (!isSafeNumber(key) /* || hash[key] === true*/ ) {
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
 * Return true if argument is a number or can be cast to a number which
 * roundtrips to the same string.
 * @private
 */
function isSafeNumber(val) {
    var num = val;
    var type = typeof val;
    if (type === typeOfString) {
        var length = val.length;
        // Number.MIN_SAFE_INTEGER is 17 digits including the sign.
        // Anything longer cannot be safe.
        if (length === 0 || length > MIN_SAFE_INTEGER_DIGITS) {
            return false;
        }
        if (!safeNumberRegEx.test(val)) {
            return false;
        }
        // Number.MAX_SAFE_INTEGER is 16 digits.
        // Anything shorter must be safe.
        if (length < MAX_SAFE_INTEGER_DIGITS) {
            return true;
        }
        num = +val;
    } else if (type !== typeOfNumber) {
        return false;
    }
    // Number.isSafeInteger(num) in es6.
    return num % 1 === 0 && abs(num) <= MAX_SAFE_INTEGER;
}

// export for testing
module.exports._isSafeNumber = isSafeNumber;

},{}],148:[function(require,module,exports){
var iterateKeySet = require(139);
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


},{"139":139}],149:[function(require,module,exports){
'use strict';

module.exports = require(154)

},{"154":154}],150:[function(require,module,exports){
'use strict';

var asap = require(117);

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

},{"117":117}],151:[function(require,module,exports){
'use strict';

var Promise = require(150);

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};

},{"150":150}],152:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require(150);

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

},{"150":150}],153:[function(require,module,exports){
'use strict';

var Promise = require(150);

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

},{"150":150}],154:[function(require,module,exports){
'use strict';

module.exports = require(150);
require(151);
require(153);
require(152);
require(155);

},{"150":150,"151":151,"152":152,"153":153,"155":155}],155:[function(require,module,exports){
'use strict';

// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise = require(150);
var asap = require(116);

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

},{"116":116,"150":150}],156:[function(require,module,exports){
module.exports = require(157);

},{"157":157}],157:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require(158);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"158":158}],158:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}]},{},[1])(1)
});