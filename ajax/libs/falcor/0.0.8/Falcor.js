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
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.falcor=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = _dereq_('./operations');

},{"./operations":121}],2:[function(_dereq_,module,exports){
var Constants = {
    NOOP: function NOOP() {},
    __GENERATION_GUID: 0,
    __GENERATION_VERSION: 0,
    __CONTAINER: "__reference_container",
    __CONTEXT: "__context",
    __GENERATION: "__generation",
    __GENERATION_UPDATED: "__generation_updated",
    __INVALIDATED: "__invalidated",
    __KEY: "__key",
    __KEYS: "__keys",
    __IS_KEY_SET: "__is_key_set",
    __NULL: "__null",
    __SELF: "./",
    __PARENT: "../",
    __REF: "__ref",
    __REF_INDEX: "__ref_index",
    __REFS_LENGTH: "__refs_length",
    __ROOT: "/",
    __OFFSET: "__offset",
    __FALKOR_EMPTY_OBJECT: '__FALKOR_EMPTY_OBJECT',

    $TYPE: "$type",
    $SIZE: "$size",
    $EXPIRES: "$expires",
    $TIMESTAMP: "$timestamp",

    SENTINEL: "sentinel",
    ERROR: "error",
    VALUE: "value",
    EXPIRED: "expired",
    LEAF: "leaf"
};

Constants.__INTERNAL_KEYS = [
    Constants.__CONTAINER, Constants.__CONTEXT, Constants.__GENERATION, Constants.__GENERATION_UPDATED,
    Constants.__INVALIDATED, Constants.__KEY, Constants.__KEYS, Constants.__IS_KEY_SET, Constants.__NULL, Constants.__SELF,
    Constants.__PARENT, Constants.__REF, Constants.__REF_INDEX, Constants.__REFS_LENGTH, Constants.__OFFSET, Constants.__ROOT
];

module.exports = Constants;

},{}],3:[function(_dereq_,module,exports){
if (typeof falcor === 'undefined') {
    var falcor = {};
}
var Rx = _dereq_('./rx.ultralite');

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

},{"./rx.ultralite":37}],4:[function(_dereq_,module,exports){
var falcor = _dereq_('./Falcor');
var Constants = _dereq_('./Constants');
var RequestQueue = _dereq_('./request/RequestQueue');
var ImmediateScheduler = _dereq_('./scheduler/ImmediateScheduler');
var TimeoutScheduler = _dereq_('./scheduler/TimeoutScheduler');
var $TYPE = Constants.$TYPE;
var ERROR = Constants.$TYPE;
var ModelResponse = _dereq_('./ModelResponse');
var call = _dereq_('./operations/call');
var operations = _dereq_('./operations');
var getBoundValue = _dereq_('./../get/getBoundValue');

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

    this._root = options.root || {
        expired: [],
        allowSync: false,
        unsafeMode: true
    };
    if (options.cache && typeof options.cache === "object") {
        this.setCache(options.cache);
    } else {
        this._cache = {};
    }
    this._path = [];
};

Model.EXPIRES_NOW = falcor.EXPIRES_NOW;
Model.EXPIRES_NEVER = falcor.EXPIRES_NEVER;

Model.prototype = {
    _boxed: false,
    _progressive: false,
    _errorSelector: function(x, y) { return y; },
    get: operations('get'),
    set: operations("set"),
    invalidate: operations("invalidate"),
    call: call,
    getValue: function(path) {
        return this.get(path, function(x) { return x });
    },
    setValue: function(path, value) {
        return this.set(Array.isArray(path) ?
        {path: path, value: value} :
            path, function(x) { return x; });
    },
    bind: function(boundPath) {

        var model = this, root = model._root,
            paths = new Array(arguments.length - 1),
            i = -1, n = arguments.length - 1;

        while(++i < n) {
            paths[i] = arguments[i + 1];
        }

        if(n === 0) { throw new Error("Model#bind requires at least one value path."); }

        return falcor.Observable.create(function(observer) {

            var boundModel;
            try {
                root.allowSync = true;
                if(!(boundModel = model.bindSync(model._path.concat(boundPath)))) {
                    throw false;
                }
                root.allowSync = false;
                observer.onNext(boundModel);
                observer.onCompleted();
            } catch (e) {
                root.allowSync = false;
                return model.get.apply(model, paths.map(function(path) {
                    return boundPath.concat(path);
                }).concat(function(){})).subscribe(
                    function onNext() {},
                    function onError(err)  { observer.onError(err); },
                    function onCompleted() {
                        try {
                            if(boundModel = model.bindSync(boundPath)) {
                                observer.onNext(boundModel);
                            }
                            observer.onCompleted();
                        } catch(e) {
                            observer.onError(e);
                        }
                    });
            }
        });
    },
    setCache: function(cache) {
        return (this._cache = {}) && this._setCache(this, cache);
    },
    getValueSync: function(path) {
        if (Array.isArray(path) === false) {
            throw new Error("Model#getValueSync must be called with an Array path.");
        }
        if (this._path.length) {
            path = this._path.concat(path);
        }
        return this.syncCheck("getValueSync") && this._getValueSync(this, path).value;
    },
    setValueSync: function(path, value, errorSelector) {
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

        if(this._dataSource) {
            throw new Error("Model#setValueSync can not be invoked on a Model with a DataSource. Please use the withoutDataSource() method followed by setValueSync if you would like to modify only the local cache.");
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

            if(json && json[$TYPE] === ERROR && !this._treatErrorsAsValues) {
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
    bindSync: function(path) {
        if(Array.isArray(path) === false) {
            throw new Error("Model#bindSync must be called with an Array path.");
        }
        var boundValue = this.syncCheck("bindSync") && getBoundValue(this, this._path.concat(path));
        var node = boundValue.value;
        path = boundValue.path;
        if(boundValue.shorted) {
            if(!!node) {
                if(node[$TYPE] === ERROR) {
                    if(this._boxed) {
                        throw node;
                    }
                    throw node.value;
                    // throw new Error("Model#bindSync can\'t bind to or beyond an error: " + boundValue.toString());
                }
            }
            return undefined;
        } else if(!!node && node[$TYPE] === ERROR) {
            if(this._boxed) {
                throw node;
            }
            throw node.value;
        }
        return this.clone(["_path", boundValue.path]);
    },
    // TODO: This seems like a great place for optimizations
    clone: function() {
        var self = this;
        var clone = new Model();

        Object.keys(self).forEach(function(key) {
            clone[key] = self[key];
        });

        Array.prototype.slice.call(arguments).forEach(function(tuple) {
            clone[tuple[0]] = tuple[1];
        });

        return clone;
    },
    batch: function(schedulerOrDelay) {
        if(typeof schedulerOrDelay === "number") {
            schedulerOrDelay = new TimeoutScheduler(Math.round(Math.abs(schedulerOrDelay)));
        } else if(!schedulerOrDelay || !schedulerOrDelay.schedule) {
            schedulerOrDelay = new ImmediateScheduler();
        }
        return this.clone(["_request", new RequestQueue(this, schedulerOrDelay)]);
    },
    unbatch: function() {
        return this.clone(["_request", new RequestQueue(this, new ImmediateScheduler())]);
    },
    treatErrorsAsValues: function() {
        return this.clone(["_treatErrorsAsValues", true]);
    },
    materialize: function() {
        return this.clone(["_materialized", true]);
    },
    boxValues: function() {
        return this.clone(["_boxed", true]);
    },
    unboxValues: function() {
        return this.clone(["_boxed", false]);
    },
    withoutDataSource: function() {
        return this.clone(["_dataSource", null]);
    },
    syncCheck: function(name) {
        if (this._root.allowSync === false && this._root.unsafeMode === false) {
            throw new Error("Model#" + name + " may only be called within the context of a request selector.");
        }
        return true;
    }
};

},{"./../get/getBoundValue":45,"./Constants":2,"./Falcor":3,"./ModelResponse":5,"./operations":12,"./operations/call":7,"./request/RequestQueue":36,"./scheduler/ImmediateScheduler":38,"./scheduler/TimeoutScheduler":39}],5:[function(_dereq_,module,exports){
var falcor = _dereq_('./Falcor');

var Observable  = falcor.Observable,
    valuesMixin = { format: { value: "AsValues"  } },
    jsonMixin   = { format: { value: "AsPathMap" } },
    jsongMixin  = { format: { value: "AsJSONG"   } };

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
            operationArgs: {value: args},
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
ModelResponse.prototype.toPathValues = function() {
    return mixin(this, valuesMixin);
};
ModelResponse.prototype.toJSON = function() {
    return mixin(this, jsonMixin);
};
ModelResponse.prototype.toJSONG = function() {
    return mixin(this, jsongMixin);
};

module.exports = ModelResponse;

},{"./Falcor":3}],6:[function(_dereq_,module,exports){
var falcor = _dereq_('./Falcor');
var Model = _dereq_('./Model');
falcor.Model = Model;

module.exports = falcor;

},{"./Falcor":3,"./Model":4}],7:[function(_dereq_,module,exports){
module.exports = call;

var falcor = _dereq_("../../Falcor");
var ModelResponse = _dereq_('./../../ModelResponse');

function call(path, args, suffixes, paths, selector) {

    var model = this;
    args && Array.isArray(args) || (args = []);
    suffixes && Array.isArray(suffixes) || (suffixes = []);
    paths = Array.prototype.slice.call(arguments, 3);
    if (typeof (selector = paths[paths.length - 1]) !== "function") {
        selector = undefined;
    } else {
        paths = paths.slice(0, -1);
    }

    return ModelResponse.create(function (options) {

        var rootModel = model.clone(["_path", []]),
            localRoot = rootModel.withoutDataSource(),
            dataSource = model._dataSource,
            boundPath = model._path,
            callPath = boundPath.concat(path),
            thisPath = callPath.slice(0, -1);

        var disposable = model.
            getValue(path).
            flatMap(function (localFn) {
                if (typeof localFn === "function") {
                    return falcor.Observable.return(localFn.
                        apply(rootModel.bindSync(thisPath), args).
                        map(function (pathValue) {
                            return {
                                path: thisPath.concat(pathValue.path),
                                value: pathValue.value
                            };
                        }).
                        toArray().
                        flatMap(function (pathValues) {
                            return localRoot.set.
                                apply(localRoot, pathValues).
                                toJSONG();
                        }).
                        flatMap(function (envelope) {
                            return rootModel.get.apply(rootModel,
                                envelope.paths.reduce(function (paths, path) {
                                    return paths.concat(suffixes.map(function (suffix) {
                                        return path.concat(suffix);
                                    }));
                                }, []).
                                    concat(paths.reduce(function (paths, path) {
                                        return paths.concat(thisPath.concat(path));
                                    }, []))).
                                toJSONG();
                        }));
                }
                return falcor.Observable.empty();
            }).
            defaultIfEmpty(dataSource.call(path, args, suffixes, paths)).
            mergeAll().
            subscribe(function (envelope) {
                var invalidated = envelope.invalidated;
                if (invalidated && invalidated.length) {
                    invalidatePaths(rootModel, invalidated, undefined, model._errorSelector);
                }
                disposable = localRoot.
                    set(envelope, function () {
                        return model;
                    }).
                    subscribe(function (model) {
                        var getPaths = envelope.paths.map(function (path) {
                            return path.slice(boundPath.length);
                        });
                        if (selector) {
                            getPaths[getPaths.length] = function () {
                                return selector.call(model, getPaths);
                            };
                        }
                        disposable = model.get.apply(model, getPaths).subscribe(options);
                    });
            });

        return {
            dispose: function () {
                disposable && disposable.dispose();
                disposable = undefined;
            }
        };
    });
}

},{"../../Falcor":3,"./../../ModelResponse":5}],8:[function(_dereq_,module,exports){
var combineOperations = _dereq_('./../support/combineOperations');
var setSeedsOrOnNext = _dereq_('./../support/setSeedsOrOnNext');
module.exports = function getInitialArgs(options, seeds, onNext) {
    var seedRequired = options.format !== 'AsValues';
    var operations =
        combineOperations(options.operationArgs, options.format, 'get');
    setSeedsOrOnNext(
        operations, seedRequired, seeds, onNext, options.operationSelector);

    return [operations, seeds, !!options.operationModel._dataSource];
};

},{"./../support/combineOperations":21,"./../support/setSeedsOrOnNext":35}],9:[function(_dereq_,module,exports){
var getSourceObserver = _dereq_('./../support/getSourceObserever');
var partitionOperations = _dereq_('./../support/partitionOperations');
var mergeBoundPath = _dereq_('./../support/mergeBoundPath');

module.exports = getSourceRequest;

function getSourceRequest(
        options, onNext, seeds, relativeSeeds, combinedResults, cb) {

    var missingPaths = combinedResults.requestedMissingPaths;
    var model = options.operationModel;
    var boundPath = model._path;
    return model._request.get(
        missingPaths,
        combinedResults.optimizedMissingPaths,
        getSourceObserver(model, missingPaths, function(err, results) {
            if (err) {
                cb(err);
                return;
            }

            if (boundPath.length) {
                results = mergeBoundPath(results, model._path);
            }

            // partitions the operations by their pathSetIndex
            var partitionOperationsAndSeeds = partitionOperations(
                results,
                missingPaths,
                options.format,
                relativeSeeds,
                onNext);
            cb(null, partitionOperationsAndSeeds);
        }));
}


},{"./../support/getSourceObserever":23,"./../support/mergeBoundPath":27,"./../support/partitionOperations":30}],10:[function(_dereq_,module,exports){
var getInitialArgs = _dereq_('./getInitialArgs');
var getSourceRequest = _dereq_('./getSourceRequest');
var shouldRequest = _dereq_('./shouldRequest');
var request = _dereq_('./../request');
var processOperations = _dereq_('./../support/processOperations');
var get = request(
    getInitialArgs,
    getSourceRequest,
    processOperations,
    shouldRequest);

module.exports = get;

},{"./../request":15,"./../support/processOperations":32,"./getInitialArgs":8,"./getSourceRequest":9,"./shouldRequest":11}],11:[function(_dereq_,module,exports){
module.exports = function(model, combinedResults) {
    return model._dataSource && combinedResults.requestedMissingPaths.length > 0;
};

},{}],12:[function(_dereq_,module,exports){
var ModelResponse = _dereq_('../ModelResponse');
var get = _dereq_('./get');
var set = _dereq_('./set');
var invalidate = _dereq_('./invalidate');

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

},{"../ModelResponse":5,"./get":10,"./invalidate":13,"./set":16}],13:[function(_dereq_,module,exports){
var invalidateInitialArgs = _dereq_('./invalidateInitialArgs');
var request = _dereq_('./../request');
var processOperations = _dereq_('./../support/processOperations');
var invalidate = request(
    invalidateInitialArgs,
    null,
    processOperations);

module.exports = invalidate;

},{"./../request":15,"./../support/processOperations":32,"./invalidateInitialArgs":14}],14:[function(_dereq_,module,exports){
var combineOperations = _dereq_('./../support/combineOperations');
var setSeedsOrOnNext = _dereq_('./../support/setSeedsOrOnNext');
module.exports = function getInitialArgs(options, seeds, onNext) {
    var seedRequired = options.format !== 'AsValues';
    var operations = combineOperations(
        options.operationArgs, options.format, 'inv');
    setSeedsOrOnNext(
        operations, seedRequired, seeds,
        onNext, options.operationSelector);

    return [operations, seeds, false];
};

},{"./../support/combineOperations":21,"./../support/setSeedsOrOnNext":35}],15:[function(_dereq_,module,exports){
var setSeedsOrOnNext = _dereq_('./support/setSeedsOrOnNext');
var onNextValues = _dereq_('./support/onNextValue');
var onCompletedOrError = _dereq_('./support/onCompletedOrError');
var primeSeeds = _dereq_('./support/primeSeeds');
var autoTrue = function() { return true; };

module.exports = request;

function request(initialArgs, sourceRequest, processOperations, shouldRequestFn) {
    if (!shouldRequestFn) {
        shouldRequestFn = autoTrue;
    }
    return function innerRequest(options) {
        var selector = options.operationSelector;
        var model = options.operationModel;
        var args = options.operationArgs;
        var onNext = options.onNext.bind(options);
        var onError = options.onError.bind(options);
        var onCompleted = options.onCompleted.bind(options);
        var errorSelector = model._errorSelector;
        var isProgressive = options.isProgressive;
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
        var i;
        var foundValue = false;
        var seeds = primeSeeds(selector, selectorLength);

        function recurse(operations, relativeSeeds, shouldRequest, opts) {
            var combinedResults = processOperations(
                model,
                operations,
                errorSelector,
                opts);

            foundValue = foundValue || combinedResults.valuesReceived;
            if (combinedResults.errors.length) {
                errors = errors.concat(combinedResults.errors);
            }

            if (shouldRequest && shouldRequestFn(model, combinedResults)) {
                sourceRequest(
                    options,
                    onNext,
                    seeds,
                    relativeSeeds,
                    combinedResults,
                    function onCompleteFromSourceSet(err, results) {
                        if (err) {
                            errors = errors.concat(err);
                            recurse([], seeds);
                            return;
                        }
                        recurse.apply(null, results);
                    });
            }

            // Else we need to onNext values and complete/error.
            else {
                if (!toPathValues && foundValue) {
                    onNextValues(
                        model,
                        onNext,
                        seeds,
                        selector);
                }
                onCompletedOrError(onCompleted, onError, errors);
            }
        }

        try {
            recurse.apply(null,
                initialArgs(options, seeds, onNext));
        } catch(e) {
            errors = [e];
            onCompletedOrError(onCompleted, onError, errors);
        }
    };
}

},{"./support/onCompletedOrError":28,"./support/onNextValue":29,"./support/primeSeeds":31,"./support/setSeedsOrOnNext":35}],16:[function(_dereq_,module,exports){
var setInitialArgs = _dereq_('./setInitialArgs');
var setSourceRequest = _dereq_('./setSourceRequest');
var request = _dereq_('./../request');
var setProcessOperations = _dereq_('./setProcessOperations');
var set = request(
    setInitialArgs,
    setSourceRequest,
    setProcessOperations);

module.exports = set;

},{"./../request":15,"./setInitialArgs":17,"./setProcessOperations":18,"./setSourceRequest":19}],17:[function(_dereq_,module,exports){
var combineOperations = _dereq_('./../support/combineOperations');
var setSeedsOrOnNext = _dereq_('./../support/setSeedsOrOnNext');
module.exports = function setInitialArgs(options, seeds, onNext) {
    var seedRequired = options.format !== 'AsValues';
    var shouldRequest = !!options.operationModel._dataSource;
    var format = options.format;
    var args = options.operationArgs;
    var selector = options.operationSelector;
    var firstFormat = shouldRequest && 'AsJSONG' || format;
    var operations = combineOperations(
            args, firstFormat, 'set', shouldRequest && selector);
    var firstSeeds;

    if (shouldRequest && selector) {

        // Share the same jsong env in the jsong but not in the paths.
        // This will be required for selector functions
        var jsong = {};
        firstSeeds = [];
        operations.forEach(function(op) {
            var seed = {
                jsong: jsong,
                paths: []
            };
            op.seeds = [seed];
            firstSeeds.push(seed);
        });

    } else if (shouldRequest) {
        firstSeeds = [{}];
        setSeedsOrOnNext(operations, seedRequired, firstSeeds, false, options.selector);
    } else {
        firstSeeds = seeds;
        operations = combineOperations(args, format, 'set');
        setSeedsOrOnNext(operations, seedRequired, seeds, onNext, options.selector);
    }

    return [operations, firstSeeds, shouldRequest, {setWithBind: !shouldRequest}];
};

},{"./../support/combineOperations":21,"./../support/setSeedsOrOnNext":35}],18:[function(_dereq_,module,exports){
var processOperations = _dereq_('./../support/processOperations');
var mergeBoundPath = _dereq_('./../support/mergeBoundPath');

module.exports = setProcessOperations;

function setProcessOperations(model, operations, errorSelector, options) {

    var boundPath = model._path;
    var hasBoundPath = boundPath.length > 0;
    var setWithBind = options.setWithBind;

    if (!setWithBind && hasBoundPath) {
        model._path = [];

        // For every operations arguments, they must be adjusted.
        // Since this is always AsJSONG, mergeBoundPath works
        for (var i = 0, opLen = operations.length; i < opLen; i++) {
            var args = operations[i].args;
            for (var j = 0, argsLen = args.length; j < argsLen; j++) {
                args[i] = mergeBoundPath(args[i], boundPath);
            }
        }
    }

    var results = processOperations(model, operations, errorSelector);

    // TODO: This is where i would do setProgessively

    // Undo what we have done to the model's bound path.
    if (!setWithBind && hasBoundPath) {
        model._path = boundPath;
    }

    return results;
}

},{"./../support/mergeBoundPath":27,"./../support/processOperations":32}],19:[function(_dereq_,module,exports){
var getSourceObserver = _dereq_('./../support/getSourceObserever');
var combineOperations = _dereq_('./../support/combineOperations');
var setSeedsOrOnNext = _dereq_('./../support/setSeedsOrOnNext');

module.exports = setSourceRequest;

function setSourceRequest(
        options, onNext, seeds, relativeSeeds, combinedResults, cb) {

    // gather all the paths and jsongs into one.
    var jsong = relativeSeeds[0].jsong;
    var paths = relativeSeeds[0].paths;
    var seedRequired = seeds && seeds.length > 0;
    var model = options.operationModel;

    for (i = 1; i < relativeSeeds.length; i++) {
        paths = paths.concat(relativeSeeds[i].paths);
    }

    var jsongEnv = {jsong: jsong, paths: paths};
    return model._request.set(
        jsongEnv,
        getSourceObserver(
            model,
            jsongEnv.paths,
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
                cb(null, [operations, seeds, false, {setWithBind: true}]);
            }));
}


},{"./../support/combineOperations":21,"./../support/getSourceObserever":23,"./../support/setSeedsOrOnNext":35}],20:[function(_dereq_,module,exports){
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

},{}],21:[function(_dereq_,module,exports){
var isSeedRequired = _dereq_('./seedRequired');
var isJSONG = _dereq_('./isJSONG');
var isPathOrPathValue = _dereq_('./isPathOrPathValue');
module.exports = function combineOperations(args, format, name, spread) {
    var seedRequired = isSeedRequired(format);
    var isValues = !seedRequired;
    var hasSelector = seedRequired && format === 'AsJSON';
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
                    type: type,
                    isValues: isValues,
                    seeds: [],
                    onNext: null,
                    seedsOffset: seedsOffset,
                    args: []
                };
                groups.push(group);
                if (hasSelector) {
                    seedsOffset++;
                }
            }
            group.args.push(argument);
            return groups;
        }, []);
};

},{"./isJSONG":25,"./isPathOrPathValue":26,"./seedRequired":33}],22:[function(_dereq_,module,exports){
module.exports = function fastCollapse(paths) {
    return paths.reduce(function(acc, p) {
        var curr = acc[0];
        if (!curr) {
            acc[0] = p;
        } else {
            p.forEach(function(v, i) {
                // i think
                if (typeof v === 'object') {
                    v.forEach(function(value) {
                        curr[i][curr[i].length] = value;
                    });
                }
            });
        }
        return acc;
    }, []);
}

},{}],23:[function(_dereq_,module,exports){
var insertErrors = _dereq_('./insertErrors.js');
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

},{"./insertErrors.js":24}],24:[function(_dereq_,module,exports){
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
        [],
        model._errorSelector
    ));
    return out.errors;
};


},{}],25:[function(_dereq_,module,exports){
module.exports = function isJSONG(x) {
    return x.hasOwnProperty("jsong");
};

},{}],26:[function(_dereq_,module,exports){
module.exports = function isPathOrPathValue(x) {
    return !!(Array.isArray(x)) || (
        x.hasOwnProperty("path") && x.hasOwnProperty("value"));
};

},{}],27:[function(_dereq_,module,exports){
var isJSONG = _dereq_('./isJSONG');
var isPathValue = _dereq_('./isPathOrPathValue');

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

},{"./isJSONG":25,"./isPathOrPathValue":26}],28:[function(_dereq_,module,exports){
module.exports = function onCompletedOrError(onCompleted, onError, errors) {
    if (errors.length) {
        onError(errors);
    } else {
        onCompleted();
    }
};

},{}],29:[function(_dereq_,module,exports){
/**
 * will onNext the observer with the seeds provided.
 * @param {Model} model
 * @param {Function} onNext
 * @param {Array.<Object>} seeds
 * @param {Function} [selector]
 */
module.exports = function onNextValues(model, onNext, seeds, selector) {
    var root = model._root;

    root.allowSync = true;
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
    root.allowSync = false;
};

},{}],30:[function(_dereq_,module,exports){
var fastCollapse = _dereq_('./fastCollapse.js');
var buildJSONGOperation = _dereq_('./buildJSONGOperation');

/**
 * It performs the opposite of combine operations.  It will take a JSONG
 * response and partition them into the required amount of operations.
 * @param {{jsong: {}, paths:[]}} jsongResponse
 */
module.exports = partitionOperations;

function partitionOperations(jsongResponse, requestedMissingPaths, format, seeds, onNext) {
    var partitionedOps = [];
    var nextSeeds = [];
    if (format === 'AsJSON') {
        // fast collapse ass the requestedMissingPaths into their
        // respective groups
        var opsFromRequestedMissingPaths = [];
        var op = null;
        for (var i = 0, len = requestedMissingPaths.length; i < len; i++) {
            var missingPath = requestedMissingPaths[i];
            if (!op || op.idx !== missingPath.pathSetIndex) {
                if (op) {
                    op.paths = fastCollapse(op.paths);
                }
                op = {
                    idx: missingPath.pathSetIndex,
                    paths: []
                };
                opsFromRequestedMissingPaths.push(op);
            }
            op.paths.push(missingPath);
        }
        op.paths = fastCollapse(op.paths);
        opsFromRequestedMissingPaths.forEach(function(op, i) {
            var seed = [seeds[op.idx]];
            partitionedOps.push(buildJSONGOperation(
                format,
                seed,
                jsongResponse,
                i,
                onNext));
            nextSeeds.push(seed);
        });
    } else {
        partitionedOps[0] = buildJSONGOperation(format, seeds, jsongResponse, 0, onNext);
    }
    return [partitionedOps, nextSeeds];
}


},{"./buildJSONGOperation":20,"./fastCollapse.js":22}],31:[function(_dereq_,module,exports){
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

},{}],32:[function(_dereq_,module,exports){
module.exports = function processOperations(model, operations, errorSelector, boundPath) {
    return operations.reduce(function(memo, operation) {

        var jsonGraphOperation = model[operation.methodName];
        var seedsOrFunction = operation.isValues ?
            operation.onNext : operation.seeds;
        var results = jsonGraphOperation(
            model,
            operation.args,
            seedsOrFunction,
            operation.onNext,
            errorSelector,
            boundPath);
        var missing = results.requestedMissingPaths;
        var offset = operation.seedsOffset;

        for (var i = 0, len = missing.length; i < len; i++) {
            missing[i].boundPath = boundPath;
            missing[i].pathSetIndex += offset;
        }

        memo.requestedMissingPaths = memo.requestedMissingPaths.concat(missing);
        memo.optimizedMissingPaths = memo.optimizedMissingPaths.concat(results.optimizedMissingPaths);
        memo.errors = memo.errors.concat(results.errors);
        memo.valuesReceived = memo.valuesReceived || results.requestedPaths.length > 0;

        return memo;
    }, {
        errors: [],
        requestedMissingPaths: [],
        optimizedMissingPaths: [],
        valuesReceived: false
    });
}

},{}],33:[function(_dereq_,module,exports){
module.exports = function isSeedRequired(format) {
    return format === 'AsJSON' || format === 'AsJSONG' || format === 'AsPathMap';
};

},{}],34:[function(_dereq_,module,exports){
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

},{}],35:[function(_dereq_,module,exports){
var setSeedsOnGroups = _dereq_('./setSeedsOnGroups');
module.exports = function setSeedsOrOnNext(operations, seedRequired, seeds, onNext, selector) {
    if (seedRequired) {
        setSeedsOnGroups(operations, seeds, selector);
    } else {
        for (i = 0; i < operations.length; i++) {
            operations[i].onNext = onNext;
        }
    }
};

},{"./setSeedsOnGroups":34}],36:[function(_dereq_,module,exports){
var falcor = _dereq_('./../Falcor');
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

},{"./../Falcor":3}],37:[function(_dereq_,module,exports){
(function (global){
/**
    Rx Ultralite!
    Rx on the Roku Tyler throws this (possibly related to browserify-ing Rx):
    Error: 'TypeError: 'undefined' is not a function (evaluating 'root.document.createElement('script')')'
 */

var Rx;

if (typeof window !== "undefined" && typeof window["Rx"] !== "undefined") {
    // Browser environment
    Rx = window["Rx"];
} else if (typeof global !== "undefined" && typeof global["Rx"] !== "undefined") {
    // Node.js environment
    Rx = global["Rx"];
} else if (typeof _dereq_ !== 'undefined' || typeof window !== 'undefined' && window.require) {
    var r = typeof _dereq_ !== 'undefined' && _dereq_ || window.require;
    try {
        // CommonJS environment with rx module
        Rx = r("rx");
    } catch(e) {
        Rx = undefined;
    }
}

if(Rx === undefined) {
    Rx = {
        I: function() { return arguments[0]; },
        Disposable: (function() {
            
            function Disposable(a) {
                this.action = a;
            }
            
            Disposable.create = function(a) {
                return new Disposable(a);
            };
            
            Disposable.empty = new Disposable(function(){});
            
            Disposable.prototype.dispose = function() {
                if(typeof this.action === 'function') {
                    this.action();
                }
            };
            
            return Disposable;
        })(),
        Observable: (function() {
            
            function Observable(s) {
                this._subscribe = s;
            }
            
            Observable.create = Observable.createWithDisposable = function(s) {
                return new Observable(s);
            };
            
            Observable.fastCreateWithDisposable = Observable.create;
            
            Observable.fastReturnValue = function(value) {
                return Observable.create(function(observer) {
                    observer.onNext(value);
                    observer.onCompleted();
                });
            };
            
            // NOTE: Required for Router
            Observable.prototype.from;
            Observable.prototype.materialize;
            Observable.prototype.reduce;

            Observable.of = function() {
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
                    if(errorOcurred !== true) {
                        observer.onCompleted();
                    }
                });
            }

            Observable.prototype.subscribe = function(n, e, c) {
                return this._subscribe(
                    (n != null && typeof n === 'object') ?
                    n :
                    Rx.Observer.create(n, e, c)
                );
            };
            Observable.prototype.forEach = Observable.prototype.subscribe;
            
            Observable.prototype.catchException = function(next) {
                var self = this;
                return Observable.create(function(o) {
                    return self.subscribe(
                        function(x) { o.onNext(x); },
                        function(e) {
                            return (
                                (typeof next === 'function') ?
                                next(e) : next
                            ).subscribe(o);
                        },
                        function() { o.onCompleted(); });
                });
            };
            
            return Observable;
        })(),
        Observer: (function() {
            
            function Observer(n, e, c) {
                this.onNext =       n || Rx.I;
                this.onError =      e || Rx.I;
                this.onCompleted =  c || Rx.I;
            }
            
            Observer.create = function(n, e, c) {
                return new Observer(n, e, c);
            };
            
            return Observer;
        })(),
        Subject: (function(){
            function Subject() {
                this.observers = [];
            }
            Subject.prototype.subscribe = function(subscriber) {
                var a = this.observers,
                    n = a.length;
                a[n] = subscriber;
                return {
                    dispose: function() {
                        a.splice(n, 1);
                    }
                }
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
        })()
    };
}

module.exports = Rx;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],38:[function(_dereq_,module,exports){
function ImmediateScheduler() {
}

ImmediateScheduler.prototype = {
    schedule: function(action) {
        action();
    }
};

module.exports = ImmediateScheduler;

},{}],39:[function(_dereq_,module,exports){
function TimeoutScheduler(delay) {
    this.delay = delay;
}

TimeoutScheduler.prototype = {
    schedule: function(action) {
        setTimeout(action, this.delay);
    }
};

module.exports = TimeoutScheduler;

},{}],40:[function(_dereq_,module,exports){
var hardLink = _dereq_('./util/hardlink');
var createHardlink = hardLink.create;
var onValue = _dereq_('./onValue');
var isExpired = _dereq_('./util/isExpired');
var $path = _dereq_('./../types/$path.js');

function followReference(model, root, node, referenceContainer, reference, seed, outputFormat) {

    var depth = 0;
    var k, next;

    while (true) {
        if (depth === 0 && referenceContainer.__context) {
            depth = reference.length;
            next = referenceContainer.__context;
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

                if (!referenceContainer.__context) {
                    createHardlink(referenceContainer, next);
                }

                // Restart the reference follower.
                if (type === $path) {
                    if (outputFormat === 'JSONG') {
                        onValue(model, next, seed, null, null, reference, null, outputFormat);
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

    if (depth < reference.length) {
        var ref = [];
        for (var i = 0; i < depth; i++) {
            ref[i] = reference[i];
        }
        reference = ref;
    }

    return [node, reference];
}

module.exports = followReference;
},{"./../types/$path.js":114,"./onValue":52,"./util/hardlink":54,"./util/isExpired":55}],41:[function(_dereq_,module,exports){
var getBoundValue = _dereq_('./getBoundValue');
var isPathValue = _dereq_('./util/isPathValue');
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
                    optimizedPath[i] = boundOptimizedPath[i];
                }
            }
            if (pathSet.path) {
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


},{"./getBoundValue":45,"./util/isPathValue":57}],42:[function(_dereq_,module,exports){
var getBoundValue = _dereq_('./getBoundValue');
var isPathValue = _dereq_('./util/isPathValue');
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
            if (pathSet.path) {
                pathSet = pathSet.path;
            }
            walk(model, cache, currentCachePosition, pathSet, 0, values[0], [], results, [], [], inputFormat, 'JSONG');
        }
        return results;
    };
};


},{"./getBoundValue":45,"./util/isPathValue":57}],43:[function(_dereq_,module,exports){
var getBoundValue = _dereq_('./getBoundValue');
var isPathValue = _dereq_('./util/isPathValue');
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
                    optimizedPath[i] = boundOptimizedPath[i];
                }
            }
            var pathSet = paths[i];
            if (pathSet.path) {
                pathSet = pathSet.path;
            }
            walk(model, cache, currentCachePosition, pathSet, 0, valueNode, [], results, optimizedPath, [], inputFormat, 'PathMap');
        }
        return results;
    };
};

},{"./getBoundValue":45,"./util/isPathValue":57}],44:[function(_dereq_,module,exports){
var getBoundValue = _dereq_('./getBoundValue');
var isPathValue = _dereq_('./util/isPathValue');
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
                    optimizedPath[i] = boundOptimizedPath[i];
                }
            }
            var pathSet = paths[i];
            if (pathSet.path) {
                pathSet = pathSet.path;
            }
            walk(model, cache, currentCachePosition, pathSet, 0, onNext, null, results, optimizedPath, [], inputFormat, 'Values');
        }
        return results;
    };
};


},{"./getBoundValue":45,"./util/isPathValue":57}],45:[function(_dereq_,module,exports){
var getValueSync = _dereq_('./getValueSync');
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


},{"./getValueSync":46}],46:[function(_dereq_,module,exports){
var followReference = _dereq_('./followReference');
var clone = _dereq_('./util/clone');
var isExpired = _dereq_('./util/isExpired');
var promote = _dereq_('./util/lru').promote;
var $path = _dereq_('./../types/$path.js');
var $sentinel = _dereq_('./../types/$sentinel.js');
var $error = _dereq_('./../types/$error.js');

module.exports = function getValueSync(model, simplePath) {
    var root = model._cache;
    var len = simplePath.length;
    var optimizedPath = [];
    var shorted = false, shouldShort = false;
    var depth = 0;
    var key, next = root, type, curr = root, out, ref, refNode;
    do {
        key = simplePath[depth++];
        if (key !== null) {
            next = curr[key];
        }

        if (!next) {
            out = undefined;
            shorted = true;
            break;
        }
        type = next.$type;
        optimizedPath.push(key);

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
                optimizedPath = ref[1];
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
        for (;depth < len; ++depth) {
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
        out = !!type ? clone(out) : out;
    } else if (!out && model._materialized) {
        out = {$type: $sentinel};
    } else if (out) {
        out = out.value;
    }

    return {
        value: out,
        shorted: shorted,
        optimizedPath: optimizedPath
    };
};

},{"./../types/$error.js":113,"./../types/$path.js":114,"./../types/$sentinel.js":115,"./followReference":40,"./util/clone":53,"./util/isExpired":55,"./util/lru":58}],47:[function(_dereq_,module,exports){
var followReference = _dereq_('./followReference');
var onError = _dereq_('./onError');
var onMissing = _dereq_('./onMissing');
var onValue = _dereq_('./onValue');
var lru = _dereq_('./util/lru');
var hardLink = _dereq_('./util/hardlink');
var isMaterialized = _dereq_('./util/isMaterialzed');
var removeHardlink = hardLink.remove;
var splice = lru.splice;
var isExpired = _dereq_('./util/isExpired');
var permuteKey = _dereq_('./util/permuteKey');
var $path = _dereq_('./../types/$path.js');
var $error = _dereq_('./../types/$error.js');

// TODO: Objectify?
function walk(model, root, curr, pathOrJSON, depth, seedOrFunction, positionalInfo, outerResults, optimizedPath, requestedPath, inputFormat, outputFormat, fromReference) {
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
            if (pathOrJSON && typeof pathOrJSON === 'object') {
                if (Array.isArray(pathOrJSON)) {
                    atEndOfJSONQuery = true;
                } else {
                    k = Object.keys(pathOrJSON);
                    if (k.length === 1) {
                        k = k[0];
                    }
                }
            } else {
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
        fromReference = false;
        depth++;

        var key;
        if (k && typeof k === 'object') {
            memo.isArray = Array.isArray(k);
            memo.arrOffset = 0;

            key = permuteKey(k, memo);
            isKeySet = true;
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
                if (typeof nextPathOrPathMap === 'object' && !Array.isArray(nextPathOrPathMap)) {
                    hasChildren = Object.keys(nextPathOrPathMap).length > 0;
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
            walk(model, root, next, nextPathOrPathMap, depth, seedOrFunction, permutePosition, outerResults, permuteOptimized, permuteRequested, inputFormat, outputFormat, fromReference);

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
            if (!curr.__invalidated) {
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

module.exports = walk;

},{"./../types/$error.js":113,"./../types/$path.js":114,"./followReference":40,"./onError":50,"./onMissing":51,"./onValue":52,"./util/hardlink":54,"./util/isExpired":55,"./util/isMaterialzed":56,"./util/lru":58,"./util/permuteKey":59}],48:[function(_dereq_,module,exports){
var walk = _dereq_('./getWalk');
module.exports = {
    getAsJSON: _dereq_('./getAsJSON')(walk),
    getAsJSONG: _dereq_('./getAsJSONG')(walk),
    getAsValues: _dereq_('./getAsValues')(walk),
    getAsPathMap: _dereq_('./getAsPathMap')(walk),
    getValueSync: _dereq_('./getValueSync'),
    getBoundValue: _dereq_('./getBoundValue'),
    setCache: _dereq_('./legacy_setCache')
};


},{"./getAsJSON":41,"./getAsJSONG":42,"./getAsPathMap":43,"./getAsValues":44,"./getBoundValue":45,"./getValueSync":46,"./getWalk":47,"./legacy_setCache":49}],49:[function(_dereq_,module,exports){
/* istanbul ignore next */
var NOOP = function NOOP() {},
    __GENERATION_GUID = 0,
    __GENERATION_VERSION = 0,
    __CONTAINER = "__reference_container",
    __CONTEXT = "__context",
    __GENERATION = "__generation",
    __GENERATION_UPDATED = "__generation_updated",
    __INVALIDATED = "__invalidated",
    __KEY = "__key",
    __KEYS = "__keys",
    __IS_KEY_SET = "__is_key_set",
    __NULL = "__null",
    __SELF = "./",
    __PARENT = "../",
    __REF = "__ref",
    __REF_INDEX = "__ref_index",
    __REFS_LENGTH = "__refs_length",
    __ROOT = "/",
    __OFFSET = "__offset",
    __FALKOR_EMPTY_OBJECT = '__FALKOR_EMPTY_OBJECT',
    __INTERNAL_KEYS = [
        __CONTAINER, __CONTEXT, __GENERATION, __GENERATION_UPDATED,
        __INVALIDATED, __KEY, __KEYS, __IS_KEY_SET, __NULL, __SELF,
        __PARENT, __REF, __REF_INDEX, __REFS_LENGTH, __OFFSET, __ROOT
    ],

    $TYPE = "$type",
    $SIZE = "$size",
    $EXPIRES = "$expires",
    $TIMESTAMP = "$timestamp",

    SENTINEL = "sentinel",
    PATH = "ref",
    ERROR = "error",
    VALUE = "value",
    EXPIRED = "expired",
    LEAF = "leaf";

/* istanbul ignore next */
module.exports = function setCache(model, map) {
    var root = model._root, expired = root.expired, depth = 0, height = 0, mapStack = [], nodes = [], nodeRoot = model._cache, nodeParent = nodeRoot, node = nodeParent, nodeType, nodeValue, nodeSize, nodeTimestamp, nodeExpires;
    mapStack[0] = map;
    nodes[-1] = nodeParent;
    while (depth > -1) {
        /* Walk Path Map */
        var isTerminus = false, offset = 0, keys = void 0, index = void 0, key = void 0, isKeySet = false;
        node = nodeParent = nodes[depth - 1];
        depth = depth;
        follow_path_map_9177:
            do {
                height = depth;
                nodeType = node && node[$TYPE] || void 0;
                nodeValue = nodeType === SENTINEL ? node[VALUE] : node;
                if ((isTerminus = !((map = mapStack[offset = depth * 4]) != null && typeof map === 'object') || map[$TYPE] !== void 0 || Array.isArray(map) || !((keys = mapStack[offset + 1] || (mapStack[offset + 1] = Object.keys(map))) && ((index = mapStack[offset + 2] || (mapStack[offset + 2] = 0)) || true) && ((isKeySet = keys.length > 1) || keys.length > 0))) || (node == null || nodeType !== void 0 || typeof node !== 'object' || Array.isArray(nodeValue))) {
                    if ((nodeExpires = (node && node[$EXPIRES]) != null) && (nodeExpires !== 1 && (nodeExpires === 0 || nodeExpires < now())) || node != null && node[__INVALIDATED] === true) {
                        nodeType = void 0;
                        nodeValue = void 0;
                        node = (expired[expired.length] = node) && (node[__INVALIDATED] = true) && void 0;
                    }
                    if (!isTerminus && ((!nodeType || nodeType === SENTINEL) && Array.isArray(nodeValue))) {
                        if (node == null || nodeType !== void 0 || typeof node !== 'object' || Array.isArray(nodeValue)) {
                            key = null;
                            node = node;
                            depth = depth;
                            continue follow_path_map_9177;
                        }
                    } else {
                        if (key != null) {
                            var newNode, sizeOffset, edgeSize = node && node[$SIZE] || 0;
                            nodeType = map && map[$TYPE] || void 0;
                            nV2 = nodeType ? map[VALUE] : void 0;
                            nodeValue = nodeType === SENTINEL ? map[VALUE] : map;
                            newNode = map;
                            if ((!nodeType || nodeType === SENTINEL || nodeType === PATH) && Array.isArray(nodeValue)) {
                                delete nodeValue[$SIZE];
                                // console.log(1);
                                if (nodeType) {
                                    nodeSize = 50 + (nodeValue.length || 1);
                                } else {
                                    nodeSize = nodeValue.length || 1;
                                }
                                newNode[$SIZE] = nodeSize;
                                nodeValue[__CONTAINER] = newNode;
                            } else if (nodeType === SENTINEL || nodeType === PATH) {
                                newNode[$SIZE] = nodeSize = 50 + (nV2 && typeof nV2.length === 'number' ? nV2.length : 1);
                            } else if (nodeType === ERROR) {
                                newNode[$SIZE] = nodeSize = map && map[$SIZE] || 0 || 50 + 1;
                            } else if (!(map != null && typeof map === 'object')) {
                                nodeSize = 50 + (typeof nodeValue === 'string' && nodeValue.length || 1);
                                nodeType = 'sentinel';
                                newNode = {};
                                newNode[VALUE] = nodeValue;
                                newNode[$TYPE] = nodeType;
                                newNode[$SIZE] = nodeSize;
                            } else {
                                nodeType = newNode[$TYPE] = nodeType || GROUP;
                                newNode[$SIZE] = nodeSize = map && map[$SIZE] || 0 || 50 + 1;
                            }
                            ;
                            if (node !== newNode && (node != null && typeof node === 'object')) {
                                var nodeRefsLength = node[__REFS_LENGTH] || 0, destRefsLength = newNode[__REFS_LENGTH] || 0, i = -1, ref;
                                while (++i < nodeRefsLength) {
                                    if ((ref = node[__REF + i]) !== void 0) {
                                        ref[__CONTEXT] = newNode;
                                        newNode[__REF + (destRefsLength + i)] = ref;
                                        node[__REF + i] = void 0;
                                    }
                                }
                                newNode[__REFS_LENGTH] = nodeRefsLength + destRefsLength;
                                node[__REFS_LENGTH] = ref = void 0;
                                var invParent = nodeParent, invChild = node, invKey = key, keys$2, index$2, offset$2, childType, childValue, isBranch, stack = [
                                        nodeParent,
                                        invKey,
                                        node
                                    ], depth$2 = 0;
                                while (depth$2 > -1) {
                                    nodeParent = stack[offset$2 = depth$2 * 8];
                                    invKey = stack[offset$2 + 1];
                                    node = stack[offset$2 + 2];
                                    if ((childType = stack[offset$2 + 3]) === void 0 || (childType = void 0)) {
                                        childType = stack[offset$2 + 3] = node && node[$TYPE] || void 0 || null;
                                    }
                                    childValue = stack[offset$2 + 4] || (stack[offset$2 + 4] = childType === SENTINEL ? node[VALUE] : node);
                                    if ((isBranch = stack[offset$2 + 5]) === void 0) {
                                        isBranch = stack[offset$2 + 5] = !childType && (node != null && typeof node === 'object') && !Array.isArray(childValue);
                                    }
                                    if (isBranch === true) {
                                        if ((keys$2 = stack[offset$2 + 6]) === void 0) {
                                            keys$2 = stack[offset$2 + 6] = [];
                                            index$2 = -1;
                                            for (var childKey in node) {
                                                !(!(childKey[0] !== '_' || childKey[1] !== '_') || (childKey === __SELF || childKey === __PARENT || childKey === __ROOT) || childKey[0] === '$') && (keys$2[++index$2] = childKey);
                                            }
                                        }
                                        index$2 = stack[offset$2 + 7] || (stack[offset$2 + 7] = 0);
                                        if (index$2 < keys$2.length) {
                                            stack[offset$2 + 7] = index$2 + 1;
                                            stack[offset$2 = ++depth$2 * 8] = node;
                                            stack[offset$2 + 1] = invKey = keys$2[index$2];
                                            stack[offset$2 + 2] = node[invKey];
                                            continue;
                                        }
                                    }
                                    var ref$2 = node[$TYPE] === SENTINEL ? node[VALUE] : node, destination;
                                    if (ref$2 && Array.isArray(ref$2)) {
                                        destination = ref$2[__CONTEXT];
                                        if (destination) {
                                            var i$2 = (ref$2[__REF_INDEX] || 0) - 1, n = (destination[__REFS_LENGTH] || 0) - 1;
                                            while (++i$2 <= n) {
                                                destination[__REF + i$2] = destination[__REF + (i$2 + 1)];
                                            }
                                            destination[__REFS_LENGTH] = n;
                                            ref$2[__REF_INDEX] = ref$2[__CONTEXT] = destination = void 0;
                                        }
                                    }
                                    if (node != null && typeof node === 'object') {
                                        var ref$3, i$3 = -1, n$2 = node[__REFS_LENGTH] || 0;
                                        while (++i$3 < n$2) {
                                            if ((ref$3 = node[__REF + i$3]) !== void 0) {
                                                ref$3[__CONTEXT] = node[__REF + i$3] = void 0;
                                            }
                                        }
                                        node[__REFS_LENGTH] = void 0;
                                        var root$2 = root, head = root$2.__head, tail = root$2.__tail, next = node.__next, prev = node.__prev;
                                        next != null && typeof next === 'object' && (next.__prev = prev);
                                        prev != null && typeof prev === 'object' && (prev.__next = next);
                                        node === head && (root$2.__head = root$2.__next = next);
                                        node === tail && (root$2.__tail = root$2.__prev = prev);
                                        node.__next = node.__prev = void 0;
                                        head = tail = next = prev = void 0;
                                        ;
                                        nodeParent[invKey] = node[__SELF] = node[__PARENT] = node[__ROOT] = void 0;
                                    }
                                    ;
                                    delete stack[offset$2 + 0];
                                    delete stack[offset$2 + 1];
                                    delete stack[offset$2 + 2];
                                    delete stack[offset$2 + 3];
                                    delete stack[offset$2 + 4];
                                    delete stack[offset$2 + 5];
                                    delete stack[offset$2 + 6];
                                    delete stack[offset$2 + 7];
                                    --depth$2;
                                }
                                nodeParent = invParent;
                                node = invChild;
                            }
                            nodeParent[key] = node = newNode;
                            nodeType = node && node[$TYPE] || void 0;
                            node = !node[__SELF] && ((node[__SELF] = node) || true) && ((node[__KEY] = key) || true) && ((node[__PARENT] = nodeParent) || true) && ((node[__ROOT] = nodeRoot) || true) && (node[__GENERATION] || (node[__GENERATION] = ++__GENERATION_GUID) && node) && ((!nodeType || nodeType === SENTINEL) && Array.isArray(nodeValue) && (nodeValue[__CONTAINER] = node)) || node;
                            sizeOffset = edgeSize - nodeSize;
                            var self = nodeParent, child = node;
                            while (node = nodeParent) {
                                nodeParent = node[__PARENT];
                                if ((node[$SIZE] = (node[$SIZE] || 0) - sizeOffset) <= 0 && nodeParent) {
                                    var ref$4 = node[$TYPE] === SENTINEL ? node[VALUE] : node, destination$2;
                                    if (ref$4 && Array.isArray(ref$4)) {
                                        destination$2 = ref$4[__CONTEXT];
                                        if (destination$2) {
                                            var i$4 = (ref$4[__REF_INDEX] || 0) - 1, n$3 = (destination$2[__REFS_LENGTH] || 0) - 1;
                                            while (++i$4 <= n$3) {
                                                destination$2[__REF + i$4] = destination$2[__REF + (i$4 + 1)];
                                            }
                                            destination$2[__REFS_LENGTH] = n$3;
                                            ref$4[__REF_INDEX] = ref$4[__CONTEXT] = destination$2 = void 0;
                                        }
                                    }
                                    if (node != null && typeof node === 'object') {
                                        var ref$5, i$5 = -1, n$4 = node[__REFS_LENGTH] || 0;
                                        while (++i$5 < n$4) {
                                            if ((ref$5 = node[__REF + i$5]) !== void 0) {
                                                ref$5[__CONTEXT] = node[__REF + i$5] = void 0;
                                            }
                                        }
                                        node[__REFS_LENGTH] = void 0;
                                        var root$3 = root, head$2 = root$3.__head, tail$2 = root$3.__tail, next$2 = node.__next, prev$2 = node.__prev;
                                        next$2 != null && typeof next$2 === 'object' && (next$2.__prev = prev$2);
                                        prev$2 != null && typeof prev$2 === 'object' && (prev$2.__next = next$2);
                                        node === head$2 && (root$3.__head = root$3.__next = next$2);
                                        node === tail$2 && (root$3.__tail = root$3.__prev = prev$2);
                                        node.__next = node.__prev = void 0;
                                        head$2 = tail$2 = next$2 = prev$2 = void 0;
                                        ;
                                        nodeParent[node[__KEY]] = node[__SELF] = node[__PARENT] = node[__ROOT] = void 0;
                                    }
                                } else if (node[__GENERATION_UPDATED] !== __GENERATION_VERSION) {
                                    var self$2 = node, stack$2 = [], depth$3 = 0, linkPaths, ref$6, i$6, k, n$5;
                                    while (depth$3 > -1) {
                                        if ((linkPaths = stack$2[depth$3]) === void 0) {
                                            i$6 = k = -1;
                                            n$5 = node[__REFS_LENGTH] || 0;
                                            node[__GENERATION_UPDATED] = __GENERATION_VERSION;
                                            node[__GENERATION] = ++__GENERATION_GUID;
                                            if ((ref$6 = node[__PARENT]) !== void 0 && ref$6[__GENERATION_UPDATED] !== __GENERATION_VERSION) {
                                                stack$2[depth$3] = linkPaths = new Array(n$5 + 1);
                                                linkPaths[++k] = ref$6;
                                            } else if (n$5 > 0) {
                                                stack$2[depth$3] = linkPaths = new Array(n$5);
                                            }
                                            while (++i$6 < n$5) {
                                                if ((ref$6 = node[__REF + i$6]) !== void 0 && ref$6[__GENERATION_UPDATED] !== __GENERATION_VERSION) {
                                                    linkPaths[++k] = ref$6;
                                                }
                                            }
                                        }
                                        if ((node = linkPaths && linkPaths.pop()) !== void 0) {
                                            ++depth$3;
                                        } else {
                                            stack$2[depth$3--] = void 0;
                                        }
                                    }
                                    node = self$2;
                                }
                            }
                            nodeParent = self;
                            node = child;
                        }
                        ;
                        node = node;
                        break follow_path_map_9177;
                    }
                }
                if ((key = keys[index]) == null) {
                    node = node;
                    break follow_path_map_9177;
                } else if (key === __NULL && ((key = null) || true) || !(!(key[0] !== '_' || key[1] !== '_') || (key === __SELF || key === __PARENT || key === __ROOT) || key[0] === '$') && ((mapStack[(depth + 1) * 4] = map[key]) || true)) {
                    mapStack[(depth + 1) * 4 + 3] = key;
                } else {
                    mapStack[offset + 2] = index + 1;
                    node = node;
                    depth = depth;
                    continue follow_path_map_9177;
                }
                nodes[depth - 1] = nodeParent = node;
                if (key != null) {
                    node = nodeParent && nodeParent[key];
                    if (typeof map === 'object') {
                        for (var key$2 in map) {
                            key$2[0] === '$' && key$2 !== $SIZE && (nodeParent && (nodeParent[key$2] = map[key$2]) || true);
                        }
                        map = map[key];
                    }
                    var mapType = map && map[$TYPE] || void 0;
                    var mapValue = mapType === SENTINEL ? map[VALUE] : map;
                    if ((node == null || typeof node !== 'object' || !!nodeType && nodeType !== SENTINEL && !Array.isArray(nodeValue)) && (!mapType && (map != null && typeof map === 'object') && !Array.isArray(mapValue))) {
                        nodeType = void 0;
                        nodeValue = {};
                        nodeSize = node && node[$SIZE] || 0;
                        if (node !== nodeValue && (node != null && typeof node === 'object')) {
                            var nodeRefsLength$2 = node[__REFS_LENGTH] || 0, destRefsLength$2 = nodeValue[__REFS_LENGTH] || 0, i$7 = -1, ref$7;
                            while (++i$7 < nodeRefsLength$2) {
                                if ((ref$7 = node[__REF + i$7]) !== void 0) {
                                    ref$7[__CONTEXT] = nodeValue;
                                    nodeValue[__REF + (destRefsLength$2 + i$7)] = ref$7;
                                    node[__REF + i$7] = void 0;
                                }
                            }
                            nodeValue[__REFS_LENGTH] = nodeRefsLength$2 + destRefsLength$2;
                            node[__REFS_LENGTH] = ref$7 = void 0;
                            var invParent$2 = nodeParent, invChild$2 = node, invKey$2 = key, keys$3, index$3, offset$3, childType$2, childValue$2, isBranch$2, stack$3 = [
                                    nodeParent,
                                    invKey$2,
                                    node
                                ], depth$4 = 0;
                            while (depth$4 > -1) {
                                nodeParent = stack$3[offset$3 = depth$4 * 8];
                                invKey$2 = stack$3[offset$3 + 1];
                                node = stack$3[offset$3 + 2];
                                if ((childType$2 = stack$3[offset$3 + 3]) === void 0 || (childType$2 = void 0)) {
                                    childType$2 = stack$3[offset$3 + 3] = node && node[$TYPE] || void 0 || null;
                                }
                                childValue$2 = stack$3[offset$3 + 4] || (stack$3[offset$3 + 4] = childType$2 === SENTINEL ? node[VALUE] : node);
                                if ((isBranch$2 = stack$3[offset$3 + 5]) === void 0) {
                                    isBranch$2 = stack$3[offset$3 + 5] = !childType$2 && (node != null && typeof node === 'object') && !Array.isArray(childValue$2);
                                }
                                if (isBranch$2 === true) {
                                    if ((keys$3 = stack$3[offset$3 + 6]) === void 0) {
                                        keys$3 = stack$3[offset$3 + 6] = [];
                                        index$3 = -1;
                                        for (var childKey$2 in node) {
                                            !(!(childKey$2[0] !== '_' || childKey$2[1] !== '_') || (childKey$2 === __SELF || childKey$2 === __PARENT || childKey$2 === __ROOT) || childKey$2[0] === '$') && (keys$3[++index$3] = childKey$2);
                                        }
                                    }
                                    index$3 = stack$3[offset$3 + 7] || (stack$3[offset$3 + 7] = 0);
                                    if (index$3 < keys$3.length) {
                                        stack$3[offset$3 + 7] = index$3 + 1;
                                        stack$3[offset$3 = ++depth$4 * 8] = node;
                                        stack$3[offset$3 + 1] = invKey$2 = keys$3[index$3];
                                        stack$3[offset$3 + 2] = node[invKey$2];
                                        continue;
                                    }
                                }
                                var ref$8 = node[$TYPE] === SENTINEL ? node[VALUE] : node, destination$3;
                                if (ref$8 && Array.isArray(ref$8)) {
                                    destination$3 = ref$8[__CONTEXT];
                                    if (destination$3) {
                                        var i$8 = (ref$8[__REF_INDEX] || 0) - 1, n$6 = (destination$3[__REFS_LENGTH] || 0) - 1;
                                        while (++i$8 <= n$6) {
                                            destination$3[__REF + i$8] = destination$3[__REF + (i$8 + 1)];
                                        }
                                        destination$3[__REFS_LENGTH] = n$6;
                                        ref$8[__REF_INDEX] = ref$8[__CONTEXT] = destination$3 = void 0;
                                    }
                                }
                                if (node != null && typeof node === 'object') {
                                    var ref$9, i$9 = -1, n$7 = node[__REFS_LENGTH] || 0;
                                    while (++i$9 < n$7) {
                                        if ((ref$9 = node[__REF + i$9]) !== void 0) {
                                            ref$9[__CONTEXT] = node[__REF + i$9] = void 0;
                                        }
                                    }
                                    node[__REFS_LENGTH] = void 0;
                                    var root$4 = root, head$3 = root$4.__head, tail$3 = root$4.__tail, next$3 = node.__next, prev$3 = node.__prev;
                                    next$3 != null && typeof next$3 === 'object' && (next$3.__prev = prev$3);
                                    prev$3 != null && typeof prev$3 === 'object' && (prev$3.__next = next$3);
                                    node === head$3 && (root$4.__head = root$4.__next = next$3);
                                    node === tail$3 && (root$4.__tail = root$4.__prev = prev$3);
                                    node.__next = node.__prev = void 0;
                                    head$3 = tail$3 = next$3 = prev$3 = void 0;
                                    ;
                                    nodeParent[invKey$2] = node[__SELF] = node[__PARENT] = node[__ROOT] = void 0;
                                }
                                ;
                                delete stack$3[offset$3 + 0];
                                delete stack$3[offset$3 + 1];
                                delete stack$3[offset$3 + 2];
                                delete stack$3[offset$3 + 3];
                                delete stack$3[offset$3 + 4];
                                delete stack$3[offset$3 + 5];
                                delete stack$3[offset$3 + 6];
                                delete stack$3[offset$3 + 7];
                                --depth$4;
                            }
                            nodeParent = invParent$2;
                            node = invChild$2;
                        }
                        nodeParent[key] = node = nodeValue;
                        node = !node[__SELF] && ((node[__SELF] = node) || true) && ((node[__KEY] = key) || true) && ((node[__PARENT] = nodeParent) || true) && ((node[__ROOT] = nodeRoot) || true) && (node[__GENERATION] || (node[__GENERATION] = ++__GENERATION_GUID) && node) && ((!nodeType || nodeType === SENTINEL) && Array.isArray(nodeValue) && (nodeValue[__CONTAINER] = node)) || node;
                        var self$3 = node, node$2;
                        while (node$2 = node) {
                            if (node[__GENERATION_UPDATED] !== __GENERATION_VERSION) {
                                var self$4 = node, stack$4 = [], depth$5 = 0, linkPaths$2, ref$10, i$10, k$2, n$8;
                                while (depth$5 > -1) {
                                    if ((linkPaths$2 = stack$4[depth$5]) === void 0) {
                                        i$10 = k$2 = -1;
                                        n$8 = node[__REFS_LENGTH] || 0;
                                        node[__GENERATION_UPDATED] = __GENERATION_VERSION;
                                        node[__GENERATION] = ++__GENERATION_GUID;
                                        if ((ref$10 = node[__PARENT]) !== void 0 && ref$10[__GENERATION_UPDATED] !== __GENERATION_VERSION) {
                                            stack$4[depth$5] = linkPaths$2 = new Array(n$8 + 1);
                                            linkPaths$2[++k$2] = ref$10;
                                        } else if (n$8 > 0) {
                                            stack$4[depth$5] = linkPaths$2 = new Array(n$8);
                                        }
                                        while (++i$10 < n$8) {
                                            if ((ref$10 = node[__REF + i$10]) !== void 0 && ref$10[__GENERATION_UPDATED] !== __GENERATION_VERSION) {
                                                linkPaths$2[++k$2] = ref$10;
                                            }
                                        }
                                    }
                                    if ((node = linkPaths$2 && linkPaths$2.pop()) !== void 0) {
                                        ++depth$5;
                                    } else {
                                        stack$4[depth$5--] = void 0;
                                    }
                                }
                                node = self$4;
                            }
                            node = node$2[__PARENT];
                        }
                        node = self$3;
                    }
                }
                node = node;
                depth = depth + 1;
                continue follow_path_map_9177;
            } while (true);
        node = node;
        var offset$4 = depth * 4, keys$4, index$4;
        do {
            delete mapStack[offset$4 + 0];
            delete mapStack[offset$4 + 1];
            delete mapStack[offset$4 + 2];
            delete mapStack[offset$4 + 3];
        } while ((keys$4 = mapStack[(offset$4 = 4 * --depth) + 1]) && ((index$4 = mapStack[offset$4 + 2]) || true) && (mapStack[offset$4 + 2] = ++index$4) >= keys$4.length);
    }
    return nodeRoot;
}

},{}],50:[function(_dereq_,module,exports){
var lru = _dereq_('./util/lru');
var clone = _dereq_('./util/clone');
var promote = lru.promote;
module.exports = function onError(model, node, permuteRequested, permuteOptimized, outerResults) {
    outerResults.errors.push({path: permuteRequested, value: node.value});

    promote(model, node);
    
    if (permuteOptimized) {
        outerResults.requestedPaths.push(permuteRequested);
        outerResults.optimizedPaths.push(permuteOptimized);
    }
};


},{"./util/clone":53,"./util/lru":58}],51:[function(_dereq_,module,exports){
var support = _dereq_('./util/support');
var fastCat = support.fastCat,
    fastCatSkipNulls = support.fastCatSkipNulls,
    fastCopy = support.fastCopy;
var isExpired = _dereq_('./util/isExpired');
var spreadJSON = _dereq_('./util/spreadJSON');
var clone = _dereq_('./util/clone');

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


},{"./util/clone":53,"./util/isExpired":55,"./util/spreadJSON":60,"./util/support":61}],52:[function(_dereq_,module,exports){
var lru = _dereq_('./util/lru');
var clone = _dereq_('./util/clone');
var promote = lru.promote;
var $path = _dereq_('./../types/$path.js');
var $sentinel = _dereq_('./../types/$sentinel.js');
var $error = _dereq_('./../types/$error.js');
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
        valueNode = {$type: $sentinel};
    } 
    
    // Boxed Mode & Reference Node & Error node (only happens when model is in treat errors as values).
    else if (model._boxed) {
        valueNode = clone(node);
    }
    
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
            // in any subscription situation, onNexts are always provided, even as a noOp.
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
            curr[key] = materialized ? {$type: $sentinel} : valueNode;
            if (permuteRequested) {
                seedOrFunction.paths.push(permuteRequested);
            }
            break;
    }
};



},{"./../types/$error.js":113,"./../types/$path.js":114,"./../types/$sentinel.js":115,"./util/clone":53,"./util/lru":58}],53:[function(_dereq_,module,exports){
// Copies the node
module.exports = function clone(node) {
    var outValue, i, len;
    var keys = Object.keys(node);
    
    outValue = {};
    for (i = 0, len = keys.length; i < len; i++) {
        var k = keys[i];
        if (k.indexOf('__') === 0 || k === '/' || k === './' || k === '../') {
            continue;
        }
        outValue[k] = node[k];
    }
    return outValue;
};


},{}],54:[function(_dereq_,module,exports){
function createHardlink(from, to) {
    
    // create a back reference
    var backRefs  = to.__refs_length || 0;
    to['__ref' + backRefs] = from;
    to.__refs_length = backRefs + 1;
    
    // create a hard reference
    from.__ref_index = backRefs;
    from.__context = to;
}

function removeHardlink(cacheObject) {
    var context = cacheObject.__context;
    if (context) {
        var idx = cacheObject.__ref_index;
        var len = context.__refs_length;
        
        while (idx < len) {
            context['__ref' + idx] = context[__REF + idx + 1];
            ++idx;
        }
        
        context.__refs_length = len - 1;
        cacheObject.__context = undefined;
        cacheObject.__ref_index = undefined;
    }
}

module.exports = {
    create: createHardlink,
    remove: removeHardlink
};

},{}],55:[function(_dereq_,module,exports){
var now = _dereq_('../../support/now');
module.exports = function isExpired(node) {
    var $expires = node.$expires === undefined && -1 || node.$expires;
    return $expires !== -1 && $expires !== 1 && ($expires === 0 || $expires < now());
};

},{"../../support/now":101}],56:[function(_dereq_,module,exports){
module.exports = function isMaterialized(model) {
    return model._materialized && !(model._router || model._dataSource);
};

},{}],57:[function(_dereq_,module,exports){
module.exports = function(x) {
    return x.path && x.value;
};
},{}],58:[function(_dereq_,module,exports){
// [H] -> Next -> ... -> [T]
// [T] -> Prev -> ... -> [H]
function lruPromote(model, object) {
    var root = model._root;
    var head = root.__head;
    if (head === object) {
        return;
    }

    // First insert
    if (!head) {
        root.__head = object;
        return;
    }

    // The head and the tail need to separate
    if (!root.__tail) {
        root.__head = object;
        root.__tail = head;
        object.__next = head;
        
        // Now tail
        head.__prev = object;
        return;
    }

    // Its in the cache.  Splice out.
    var prev = object.__prev;
    var next = object.__next;
    if (next) {
        next.__prev = prev;
    }
    if (prev) {
        prev.__next = next;
    }
    object.__prev = undefined;

    // Insert into head position
    root.__head = object;
    object.__next = head;
    head.__prev = object;
}

function lruSplice(model, object) {
    var root = model._root;

    // Its in the cache.  Splice out.
    var prev = object.__prev;
    var next = object.__next;
    if (next) {
        next.__prev = prev;
    }
    if (prev) {
        prev.__next = next;
    }
    object.__prev = undefined;
    
    if (object === root.__head) {
        root.__head = undefined;
    }
    if (object === root.__tail) {
        root.__tail = undefined;
    }
    object.__invalidated = true;
    root.expired.push(object);
}

module.exports = {
    promote: lruPromote,
    splice: lruSplice
};
},{}],59:[function(_dereq_,module,exports){
module.exports = function permuteKey(key, memo) {
    if (memo.isArray) {
        if (memo.loaded && memo.rangeOffset > memo.to) {
            memo.arrOffset++;
            memo.loaded = false;
        }

        var idx = memo.arrOffset;
        if (idx === key.length) {
            memo.done = true;
            return '';
        }

        var el = key[memo.arrOffset];
        var type = typeof el;
        if (type === 'object') {
            if (!memo.loaded) {
                memo.from = el.from || 0;
                memo.to = el.to || el.length && memo.from + el.length - 1 || 0;
                memo.rangeOffset = memo.from;
                memo.loaded = true;
            }


            return memo.rangeOffset++;
        } else {
            memo.arrOffset++;
            return el;
        }
    } else {
        if (!memo.loaded) {
            memo.from = key.from || 0;
            memo.to = key.to || key.length && memo.from + key.length - 1 || 0;
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


},{}],60:[function(_dereq_,module,exports){
var fastCopy = _dereq_('./support').fastCopy;
module.exports = function spreadJSON(root, bins, bin) {
    bin = bin || [];
    if (!bins.length) {
        bins.push(bin);
    }
    if (root == null || typeof root !== 'object') {
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

},{"./support":61}],61:[function(_dereq_,module,exports){


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

},{}],62:[function(_dereq_,module,exports){
module.exports = {
    invPathSetsAsJSON: _dereq_("./invalidate-path-sets-as-json-dense"),
    invPathSetsAsJSONG: _dereq_("./invalidate-path-sets-as-json-graph"),
    invPathSetsAsPathMap: _dereq_("./invalidate-path-sets-as-json-sparse"),
    invPathSetsAsValues: _dereq_("./invalidate-path-sets-as-json-values")
};
},{"./invalidate-path-sets-as-json-dense":63,"./invalidate-path-sets-as-json-graph":64,"./invalidate-path-sets-as-json-sparse":65,"./invalidate-path-sets-as-json-values":66}],63:[function(_dereq_,module,exports){
module.exports = invalidate_path_sets_as_json_dense;

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");
var array_slice = _dereq_("../support/array-slice");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var update_graph = _dereq_("../support/update-graph");
var invalidate_node = _dereq_("../support/invalidate-node");

var collect = _dereq_("../lru/collect");

function invalidate_path_sets_as_json_dense(model, pathsets, values) {

    var roots = options([], model);
    var index = -1;
    var count = pathsets.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json, hasValue;

    roots[0] = roots.root;

    while (++index < count) {

        json = values && values[index];
        if (is_object(json)) {
            roots[3] = parents[3] = nodes[3] = json.json || (json.json = {})
        } else {
            roots[3] = parents[3] = nodes[3] = undefined;
        }

        var pathset = pathsets[index];
        roots.index = index;
        
        walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);

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

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[3];
        parent = parents[0];
    } else {
        json = is_keyset && nodes[3] || parents[3];
        parent = nodes[0];
    }

    var node = parent[key];

    if (!is_top_level) {
        parents[0] = parent;
        nodes[0] = node;
        return;
    }

    if (pathset.length > 1) {
        parents[0] = nodes[0] = node;
        if (is_keyset && !!(parents[3] = json)) {
            nodes[3] = json[keyset] || (json[keyset] = {});
        }
        return;
    }

    nodes[0] = node;

    if (!!json) {
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

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {
    roots.json = roots[3];
    roots.hasValue = true;
    roots.requestedPaths.push(array_slice(requested, roots.offset));
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/array-slice":81,"../support/clone-dense-json":82,"../support/get-valid-key":91,"../support/invalidate-node":95,"../support/is-object":97,"../support/options":102,"../support/update-graph":111,"../walk/walk-path-set":119}],64:[function(_dereq_,module,exports){
module.exports = invalidate_path_sets_as_json_graph;

var $path = _dereq_("../types/$path");

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set-soft-link");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var update_graph = _dereq_("../support/update-graph");
var invalidate_node = _dereq_("../support/invalidate-node");
var clone_success = _dereq_("../support/clone-success-paths");
var collect = _dereq_("../lru/collect");

function invalidate_path_sets_as_json_graph(model, pathsets, values) {

    var roots = options([], model);
    var index = -1;
    var count = pathsets.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];

    roots[0] = roots.root;
    roots[1] = parents[1] = nodes[1] = json.jsong || (json.jsong = {});
    roots.requestedPaths = json.paths || (json.paths = roots.requestedPaths);

    while (++index < count) {
        var pathset = pathsets[index];
        walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
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

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[1];
        parent = parents[0];
    } else {
        json = nodes[1];
        parent = nodes[0];
    }

    var jsonkey = key;
    var node = parent[key];

    if (!is_top_level) {
        parents[0] = parent;
        nodes[0] = node;
        parents[1] = json;
        nodes[1] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    var type = is_object(node) && node.$type || undefined;
    
    if (pathset.length > 1) {
        parents[0] = nodes[0] = node;
        parents[1] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
        } else {
            nodes[1] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    nodes[0] = node;

    json[jsonkey] = clone(roots, node, type, node && node.value);

    var lru = roots.lru;
    var size = node.$size || 0;
    var version = roots.version;
    invalidate_node(parent, node, key, roots.lru);
    update_graph(parent, size, version, lru);
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {
    clone_success(roots, requested, optimized);
    roots.json = roots[1];
    roots.hasValue = true;
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/clone-dense-json":82,"../support/clone-success-paths":87,"../support/get-valid-key":91,"../support/invalidate-node":95,"../support/is-object":97,"../support/options":102,"../support/update-graph":111,"../types/$path":114,"../walk/walk-path-set-soft-link":118}],65:[function(_dereq_,module,exports){
module.exports = invalidate_path_sets_as_json_sparse;

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");
var array_slice = _dereq_("../support/array-slice");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var update_graph = _dereq_("../support/update-graph");
var invalidate_node = _dereq_("../support/invalidate-node");

var collect = _dereq_("../lru/collect");

function invalidate_path_sets_as_json_sparse(model, pathsets, values) {

    var roots = options([], model);
    var index = -1;
    var count = pathsets.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];

    roots[0] = roots.root;
    roots[3] = parents[3] = nodes[3] = json.json || (json.json = {});

    while (++index < count) {
        var pathset = pathsets[index];
        walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
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

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        jsonkey = get_valid_key(requested);
        json = parents[3];
        parent = parents[0];
    } else {
        jsonkey = key;
        json = nodes[3];
        parent = nodes[0];
    }

    var node = parent[key];

    if (!is_top_level) {
        parents[0] = parent;
        nodes[0] = node;
        return;
    }

    if (pathset.length > 1) {
        parents[0] = nodes[0] = node;
        parents[3] = json;
        nodes[3] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    nodes[0] = node;

    var type = is_object(node) && node.$type || undefined;
    json[jsonkey] = clone(roots, node, type, node && node.value);

    var lru = roots.lru;
    var size = node.$size || 0;
    var version = roots.version;
    invalidate_node(parent, node, key, roots.lru);
    update_graph(parent, size, version, lru);
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {
    roots.json = roots[3];
    roots.hasValue = true;
    roots.requestedPaths.push(array_slice(requested, roots.offset));
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/array-slice":81,"../support/clone-dense-json":82,"../support/get-valid-key":91,"../support/invalidate-node":95,"../support/is-object":97,"../support/options":102,"../support/update-graph":111,"../walk/walk-path-set":119}],66:[function(_dereq_,module,exports){
module.exports = invalidate_path_sets_as_json_values;

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");
var array_slice = _dereq_("../support/array-slice");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var update_graph = _dereq_("../support/update-graph");
var invalidate_node = _dereq_("../support/invalidate-node");

var collect = _dereq_("../lru/collect");

function invalidate_path_sets_as_json_values(model, pathsets, onNext) {

    var roots = options([], model);
    var index = -1;
    var count = pathsets.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];

    roots[0] = roots.root;
    roots.onNext = onNext;

    while (++index < count) {
        var pathset = pathsets[index];
        walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
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

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        parent = parents[0];
    } else {
        parent = nodes[0];
    }

    var node = parent[key];

    if (!is_top_level) {
        parents[0] = parent;
        nodes[0] = node;
        return;
    }

    if (pathset.length > 1) {
        parents[0] = nodes[0] = node;
        return;
    }

    nodes[0] = node;

    var lru = roots.lru;
    var size = node.$size || 0;
    var version = roots.version;
    invalidate_node(parent, node, key, roots.lru);
    update_graph(parent, size, version, lru);
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {
    var node = nodes[0];
    var type = is_object(node) && node.$type || undefined;
    var onNext = roots.onNext;
    if (!!type && onNext) {
        onNext({
            path: array_clone(requested),
            value: clone(roots, node, type, node && node.value)
        });
    }
    roots.requestedPaths.push(array_slice(requested, roots.offset));
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/array-slice":81,"../support/clone-dense-json":82,"../support/get-valid-key":91,"../support/invalidate-node":95,"../support/is-object":97,"../support/options":102,"../support/update-graph":111,"../walk/walk-path-set":119}],67:[function(_dereq_,module,exports){
var update_graph = _dereq_("../support/update-graph");
module.exports = function(lru, expired, version, total, max, ratio) {
    
    var targetSize = max * ratio;
    var node, size;
    
    while(!!(node = expired.pop())) {
        size = node.$size || 0;
        total -= size;
        update_graph(node, size, version, lru);
    }
    
    if(total >= max) {
        var tail = lru.__tail;
        while((total >= targetSize) && !!(node = tail)) {
            tail = tail.__prev;
            size = node.$size || 0;
            total -= size;
            update_graph(node, size, version, lru);
        }
        
        if((lru.__tail = lru.__prev = tail) == null) {
            lru.__head = lru.__next = undefined;
        } else {
            tail.__next = undefined;
        }
    }
};
},{"../support/update-graph":111}],68:[function(_dereq_,module,exports){
var $expires_never = 1;
var is_object = _dereq_("../support/is-object");
module.exports = function(root, node) {
    if(is_object(node) && (node.$expires !== $expires_never)) {
        var head = root.__head, tail = root.__tail,
            next = node.__next, prev = node.__prev;
        if (node !== head) {
            (next != null && typeof next === "object") && (next.__prev = prev);
            (prev != null && typeof prev === "object") && (prev.__next = next);
            (next = head) && (head != null && typeof head === "object") && (head.__prev = node);
            (root.__head = root.__next = head = node);
            (head.__next = next);
            (head.__prev = undefined);
        }
        if (tail == null || node === tail) {
            root.__tail = root.__prev = tail = prev || node;
        }
    }
    return node;
};
},{"../support/is-object":97}],69:[function(_dereq_,module,exports){
module.exports = function(root, node) {
    var head = root.__head, tail = root.__tail,
        next = node.__next, prev = node.__prev;
    (next != null && typeof next === "object") && (next.__prev = prev);
    (prev != null && typeof prev === "object") && (prev.__next = next);
    (node === head) && (root.__head = root.__next = next);
    (node === tail) && (root.__tail = root.__prev = prev);
    node.__next = node.__prev = undefined;
    head = tail = next = prev = undefined;
};
},{}],70:[function(_dereq_,module,exports){
module.exports = {
    setPathSetsAsJSON: _dereq_('./set-json-values-as-json-dense'),
    setPathSetsAsJSONG: _dereq_('./set-json-values-as-json-graph'),
    setPathSetsAsPathMap: _dereq_('./set-json-values-as-json-sparse'),
    setPathSetsAsValues: _dereq_('./set-json-values-as-json-values'),
    
    setJSONGsAsJSON: _dereq_('./set-json-graph-as-json-dense'),
    setJSONGsAsJSONG: _dereq_('./set-json-graph-as-json-graph'),
    setJSONGsAsPathMap: _dereq_('./set-json-graph-as-json-sparse'),
    setJSONGsAsValues: _dereq_('./set-json-graph-as-json-values')
};

},{"./set-json-graph-as-json-dense":71,"./set-json-graph-as-json-graph":72,"./set-json-graph-as-json-sparse":73,"./set-json-graph-as-json-values":74,"./set-json-values-as-json-dense":75,"./set-json-values-as-json-graph":76,"./set-json-values-as-json-sparse":77,"./set-json-values-as-json-values":78}],71:[function(_dereq_,module,exports){
module.exports = set_json_graph_as_json_dense;

var $path = _dereq_("../types/$path");

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set-soft-link");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var merge_node = _dereq_("../support/merge-node");

var node_as_miss = _dereq_("../support/treat-node-as-miss");
var node_as_error = _dereq_("../support/treat-node-as-error");
var clone_success = _dereq_("../support/clone-success-paths");

var collect = _dereq_("../lru/collect");

function set_json_graph_as_json_dense(model, envelopes, values, error_selector) {

    var roots = [];
    roots.offset = model._path.length;
    roots.bound = [];
    roots = options(roots, model, error_selector);
    
    var index = -1;
    var index2 = -1;
    var count = envelopes.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json, hasValue, hasValues;

    roots[0] = roots.root;

    while (++index < count) {
        var envelope = envelopes[index];
        var pathsets = envelope.paths;
        var jsong = envelope.jsong || envelope.values || envelope.value;
        var index3 = -1;
        var count2 = pathsets.length;
        roots[2] = jsong;
        nodes[2] = jsong;
        while (++index3 < count2) {

            json = values && values[++index2];
            if (is_object(json)) {
                roots.json = roots[3] = parents[3] = nodes[3] = json.json || (json.json = {});
            } else {
                roots.json = roots[3] = parents[3] = nodes[3] = undefined;
            }

            var pathset = pathsets[index3];
            roots.index = index3;

            walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);

            hasValue = roots.hasValue;
            if (!!hasValue) {
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
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, messageParent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[3];
        parent = parents[0];
        messageParent = parents[2];
    } else {
        json = is_keyset && nodes[3] || parents[3];
        parent = nodes[0];
        messageParent = nodes[2];
    }

    var node = parent[key];
    var message = messageParent && messageParent[key];

    nodes[2] = message;
    nodes[0] = node = merge_node(roots, parent, node, messageParent, message, key);

    if (!is_top_level) {
        parents[0] = parent;
        parents[2] = messageParent;
        return;
    }

    var length = requested.length;
    var offset = roots.offset;
    
    if (pathset.length > 1) {
        parents[0] = node;
        parents[2] = message;
        if ((length > offset) && is_keyset && !!(parents[3] = json)) {
            nodes[3] = json[keyset] || (json[keyset] = {});
        }
        return;
    }

    if (!!json && keyset != null) {
        var type = is_object(node) && node.$type || undefined;
        json[keyset] = clone(roots, node, type, node && node.value);
    }
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {

    var node = nodes[0];
    var type = is_object(node) && node.$type || (node = undefined);

    if (node_as_miss(roots, node, type, pathset, requested, optimized) === false) {
        clone_success(roots, requested, optimized);
        if (node_as_error(roots, node, type, requested) === false) {
            if(keyset == null) {
                roots.json = clone(roots, node, type, node && node.value);
            }
            roots.hasValue = true;
        }
    }
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/clone-dense-json":82,"../support/clone-success-paths":87,"../support/get-valid-key":91,"../support/is-object":97,"../support/merge-node":100,"../support/options":102,"../support/treat-node-as-error":107,"../support/treat-node-as-miss":108,"../types/$path":114,"../walk/walk-path-set-soft-link":118}],72:[function(_dereq_,module,exports){
module.exports = set_json_graph_as_json_graph;

var $path = _dereq_("../types/$path");

var clone = _dereq_("../support/clone-graph-json");
var array_clone = _dereq_("../support/array-clone");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set-soft-link");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var merge_node = _dereq_("../support/merge-node");

var node_as_miss = _dereq_("../support/treat-node-as-miss");
var node_as_error = _dereq_("../support/treat-node-as-error");
var clone_success = _dereq_("../support/clone-success-paths");

var promote = _dereq_("../lru/promote");
var collect = _dereq_("../lru/collect");

function set_json_graph_as_json_graph(model, envelopes, values, error_selector) {

    var roots = [];
    roots.offset = 0;
    roots.bound = [];
    roots = options(roots, model, error_selector);
    
    var index = -1;
    var count = envelopes.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];
    var hasValue;

    roots[0] = roots.root;
    roots[1] = parents[1] = nodes[1] = json.jsong || (json.jsong = {});
    roots.requestedPaths = json.paths || (json.paths = roots.requestedPaths);

    while (++index < count) {
        var envelope = envelopes[index];
        var pathsets = envelope.paths;
        var jsong = envelope.jsong || envelope.values || envelope.value;
        var index2 = -1;
        var count2 = pathsets.length;
        roots[2] = jsong;
        nodes[2] = jsong;
        while (++index2 < count2) {
            var pathset = pathsets[index2];
            walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
        }
    }

    hasValue = roots.hasValue;
    if(hasValue) {
        json.jsong = roots[1];
    } else {
        delete json.jsong;
        delete json.paths;
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
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, messageParent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[1];
        parent = parents[0];
        messageParent = parents[2];
    } else {
        json = nodes[1];
        parent = nodes[0];
        messageParent = nodes[2];
    }

    var jsonkey = key;
    var node = parent[key];
    var message = messageParent && messageParent[key];

    nodes[2] = message;
    nodes[0] = node = merge_node(roots, parent, node, messageParent, message, key);

    if (!is_top_level) {
        parents[0] = parent;
        parents[2] = messageParent;
        parents[1] = json;
        nodes[1] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    var type = is_object(node) && node.$type || undefined;

    if (pathset.length > 1) {
        parents[0] = node;
        parents[2] = message;
        parents[1] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
            roots.hasValue = true;
        } else {
            nodes[1] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    json[jsonkey] = clone(roots, node, type, node && node.value);
    roots.hasValue = true;
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[0];
    var type = is_object(node) && node.$type || (node = undefined);

    if (node_as_miss(roots, node, type, pathset, requested, optimized) === false) {
        clone_success(roots, requested, optimized);
        promote(roots.lru, node);
        if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
            node = clone(roots, node, type, node && node.value);
            json = roots[1];
            json.$type = node.$type;
            json.value = node.value;
        }
        roots.hasValue = true;
    }
}
},{"../lru/collect":67,"../lru/promote":68,"../support/array-clone":80,"../support/clone-graph-json":83,"../support/clone-success-paths":87,"../support/get-valid-key":91,"../support/is-object":97,"../support/merge-node":100,"../support/options":102,"../support/treat-node-as-error":107,"../support/treat-node-as-miss":108,"../types/$path":114,"../walk/walk-path-set-soft-link":118}],73:[function(_dereq_,module,exports){
module.exports = set_json_graph_as_json_sparse;

var $path = _dereq_("../types/$path");

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set-soft-link");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var merge_node = _dereq_("../support/merge-node");

var node_as_miss = _dereq_("../support/treat-node-as-miss");
var node_as_error = _dereq_("../support/treat-node-as-error");
var clone_success = _dereq_("../support/clone-success-paths");

var collect = _dereq_("../lru/collect");

function set_json_graph_as_json_sparse(model, envelopes, values, error_selector) {

    var roots = [];
    roots.offset = model._path.length;
    roots.bound = [];
    roots = options(roots, model, error_selector);
    
    var index = -1;
    var count = envelopes.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];
    var hasValue;

    roots[0] = roots.root;
    roots[3] = parents[3] = nodes[3] = json.json || (json.json = {});

    while (++index < count) {
        var envelope = envelopes[index];
        var pathsets = envelope.paths;
        var jsong = envelope.jsong || envelope.values || envelope.value;
        var index2 = -1;
        var count2 = pathsets.length;
        roots[2] = jsong;
        nodes[2] = jsong;
        while (++index2 < count2) {
            var pathset = pathsets[index2];
            walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
        }
    }

    hasValue = roots.hasValue;
    if(hasValue) {
        json.json = roots[3];
    } else {
        delete json.json;
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
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, messageParent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        jsonkey = get_valid_key(requested);
        json = parents[3];
        parent = parents[0];
        messageParent = parents[2];
    } else {
        jsonkey = key;
        json = nodes[3];
        parent = nodes[0];
        messageParent = nodes[2];
    }

    var node = parent[key];
    var message = messageParent && messageParent[key];

    nodes[2] = message;
    nodes[0] = node = merge_node(roots, parent, node, messageParent, message, key);

    if (!is_top_level) {
        parents[0] = parent;
        parents[2] = messageParent;
        return;
    }

    var length = requested.length;
    var offset = roots.offset;
    var type = is_object(node) && node.$type || undefined;

    if (pathset.length > 1) {
        parents[0] = node;
        parents[2] = message;
        if ((length > offset) && (!type || type == $path)) {
            parents[3] = json;
            nodes[3] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    json[jsonkey] = clone(roots, node, type, node && node.value);
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[0];
    var type = is_object(node) && node.$type || (node = undefined);

    if (node_as_miss(roots, node, type, pathset, requested, optimized) === false) {
        clone_success(roots, requested, optimized);
        if (node_as_error(roots, node, type, requested) === false) {
            if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
                node = clone(roots, node, type, node && node.value);
                json = roots[3];
                json.$type = node.$type;
                json.value = node.value;
            }
            roots.hasValue = true;
        }
    }
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/clone-dense-json":82,"../support/clone-success-paths":87,"../support/get-valid-key":91,"../support/is-object":97,"../support/merge-node":100,"../support/options":102,"../support/treat-node-as-error":107,"../support/treat-node-as-miss":108,"../types/$path":114,"../walk/walk-path-set-soft-link":118}],74:[function(_dereq_,module,exports){
module.exports = set_json_graph_as_json_values;

var $path = _dereq_("../types/$path");

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");
var array_slice = _dereq_("../support/array-slice");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set-soft-link");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var merge_node = _dereq_("../support/merge-node");

var node_as_miss = _dereq_("../support/treat-node-as-miss");
var node_as_error = _dereq_("../support/treat-node-as-error");
var clone_success = _dereq_("../support/clone-success-paths");

var collect = _dereq_("../lru/collect");

function set_json_graph_as_json_values(model, envelopes, onNext, error_selector) {

    var roots = [];
    roots.offset = model._path.length;
    roots.bound = [];
    roots = options(roots, model, error_selector);
    
    var index = -1;
    var count = envelopes.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];

    roots[0] = roots.root;
    roots.onNext = onNext;

    while (++index < count) {
        var envelope = envelopes[index];
        var pathsets = envelope.paths;
        var jsong = envelope.jsong || envelope.values || envelope.value;
        var index2 = -1;
        var count2 = pathsets.length;
        roots[2] = jsong;
        nodes[2] = jsong;
        while (++index2 < count2) {
            var pathset = pathsets[index2];
            walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
        }
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

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset) {

    var parent, messageParent;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        parent = parents[0];
        messageParent = parents[2];
    } else {
        parent = nodes[0];
        messageParent = nodes[2];
    }

    var node = parent[key];
    var message = messageParent && messageParent[key];

    nodes[2] = message;
    nodes[0] = node = merge_node(roots, parent, node, messageParent, message, key);

    if (!is_top_level) {
        parents[0] = parent;
        parents[2] = messageParent;
        return;
    }

    if (pathset.length > 1) {
        parents[0] = node;
        parents[2] = message;
    }
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset, is_keyset) {

    var node = nodes[0];
    var type = is_object(node) && node.$type || (node = undefined);

    if (node_as_miss(roots, node, type, pathset, requested, optimized) === false) {
        clone_success(roots, requested, optimized);
        if (node_as_error(roots, node, type, requested) === false) {
            roots.onNext({
                path: array_slice(requested, roots.offset),
                value: clone(roots, node, type, node && node.value)
            });
        }
    }
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/array-slice":81,"../support/clone-dense-json":82,"../support/clone-success-paths":87,"../support/get-valid-key":91,"../support/is-object":97,"../support/merge-node":100,"../support/options":102,"../support/treat-node-as-error":107,"../support/treat-node-as-miss":108,"../types/$path":114,"../walk/walk-path-set-soft-link":118}],75:[function(_dereq_,module,exports){
module.exports = set_json_values_as_json_dense;

var $path = _dereq_("../types/$path");
var $error = _dereq_("../types/$error");
var $sentinel = _dereq_("../types/$sentinel");

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var create_branch = _dereq_("../support/create-branch");
var wrap_node = _dereq_("../support/wrap-node");
var replace_node = _dereq_("../support/replace-node");
var graph_node = _dereq_("../support/graph-node");
var update_back_refs = _dereq_("../support/update-back-refs");
var update_graph = _dereq_("../support/update-graph");
var inc_generation = _dereq_("../support/inc-generation");

var node_as_miss = _dereq_("../support/treat-node-as-miss");
var node_as_error = _dereq_("../support/treat-node-as-error");
var clone_success = _dereq_("../support/clone-success-paths");

var collect = _dereq_("../lru/collect");

function set_json_values_as_json_dense(model, pathvalues, values, error_selector) {

    var roots = options([], model, error_selector);
    var index = -1;
    var count = pathvalues.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json, hasValue, hasValues;

    roots[0] = roots.root;

    while (++index < count) {

        json = values && values[index];
        if (is_object(json)) {
            roots.json = roots[3] = parents[3] = nodes[3] = json.json || (json.json = {})
        } else {
            roots.json = roots[3] = parents[3] = nodes[3] = undefined;
        }

        var pv = pathvalues[index];
        var pathset = pv.path;
        roots.value = pv.value;
        roots.index = index;

        walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);

        hasValue = roots.hasValue;
        if (!!hasValue) {
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
        hasValue: hasValues,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[3];
        parent = parents[0];
    } else {
        json = is_keyset && nodes[3] || parents[3];
        parent = nodes[0];
    }

    var node = parent[key],
        type;

    if (!is_top_level) {
        type = is_object(node) && node.$type || undefined;
        type = type && pathset.length > 1 && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[0] = parent;
        nodes[0] = node;
        return;
    }

    if (pathset.length > 1) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[0] = nodes[0] = node;
        if (is_keyset && !!(parents[3] = json)) {
            nodes[3] = json[keyset] || (json[keyset] = {});
        }
        return;
    }

    var selector = roots.error_selector;
    var root = roots[0];
    var size = is_object(node) && node.$size || 0;
    var mess = roots.value;

    type = is_object(mess) && mess.$type || undefined;
    mess = wrap_node(mess, type, !!type ? mess.value : mess);
    type || (type = $sentinel);

    if (type == $error && !!selector) {
        mess = selector(requested, mess);
    }

    node = replace_node(parent, node, mess, key, roots.lru);
    node = graph_node(root, parent, node, key, inc_generation());
    update_graph(parent, size - node.$size, roots.version, roots.lru);
    nodes[0] = node;

    if (!!json && keyset != null) {
        json[keyset] = clone(roots, node, type, node && node.value);
    }
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {

    var node = nodes[0];
    var type = is_object(node) && node.$type || (node = undefined);

    if (node_as_miss(roots, node, type, pathset, requested, optimized) === false) {
        clone_success(roots, requested, optimized);
        if (node_as_error(roots, node, type, requested) === false) {
            if(keyset == null) {
                roots.json = clone(roots, node, type, node && node.value);
            }
            roots.hasValue = true;
        }
    }
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/clone-dense-json":82,"../support/clone-success-paths":87,"../support/create-branch":89,"../support/get-valid-key":91,"../support/graph-node":92,"../support/inc-generation":93,"../support/is-object":97,"../support/options":102,"../support/replace-node":105,"../support/treat-node-as-error":107,"../support/treat-node-as-miss":108,"../support/update-back-refs":110,"../support/update-graph":111,"../support/wrap-node":112,"../types/$error":113,"../types/$path":114,"../types/$sentinel":115,"../walk/walk-path-set":119}],76:[function(_dereq_,module,exports){
module.exports = set_json_values_as_json_graph;

var $path = _dereq_("../types/$path");
var $error = _dereq_("../types/$error");
var $sentinel = _dereq_("../types/$sentinel");

var clone = _dereq_("../support/clone-graph-json");
var array_clone = _dereq_("../support/array-clone");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set-soft-link");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var create_branch = _dereq_("../support/create-branch");
var wrap_node = _dereq_("../support/wrap-node");
var replace_node = _dereq_("../support/replace-node");
var graph_node = _dereq_("../support/graph-node");
var update_back_refs = _dereq_("../support/update-back-refs");
var update_graph = _dereq_("../support/update-graph");
var inc_generation = _dereq_("../support/inc-generation");

var node_as_miss = _dereq_("../support/treat-node-as-miss");
var node_as_error = _dereq_("../support/treat-node-as-error");
var clone_success = _dereq_("../support/clone-success-paths");

var promote = _dereq_("../lru/promote");
var collect = _dereq_("../lru/collect");

function set_json_values_as_json_graph(model, pathvalues, values, error_selector) {

    var roots = options([], model, error_selector);
    var index = -1;
    var count = pathvalues.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];
    var hasValue;

    roots[0] = roots.root;
    roots[1] = parents[1] = nodes[1] = json.jsong || (json.jsong = {});
    roots.requestedPaths = json.paths || (json.paths = roots.requestedPaths);

    while (++index < count) {

        var pv = pathvalues[index];
        var pathset = pv.path;
        roots.value = pv.value;

        walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
    }

    hasValue = roots.hasValue;
    if(hasValue) {
        json.jsong = roots[1];
    } else {
        delete json.jsong;
        delete json.paths;
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
        hasValue: hasValue,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, json;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        json = parents[1];
        parent = parents[0];
    } else {
        json = nodes[1];
        parent = nodes[0];
    }

    var jsonkey = key;
    var node = parent[key],
        type;

    if (!is_top_level) {
        type = is_object(node) && node.$type || undefined;
        type = type && pathset.length > 1 && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[0] = parent;
        nodes[0] = node;
        parents[1] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
            roots.hasValue = true;
        } else {
            nodes[1] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    if (pathset.length > 1) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        type = node.$type;
        parents[0] = nodes[0] = node;
        parents[1] = json;
        if (type == $path) {
            json[jsonkey] = clone(roots, node, type, node.value);
            roots.hasValue = true;
        } else {
            nodes[1] = json[jsonkey] || (json[jsonkey] = {});
        }
        return;
    }

    var selector = roots.error_selector;
    var root = roots[0];
    var size = is_object(node) && node.$size || 0;
    var mess = roots.value;

    type = is_object(mess) && mess.$type || undefined;
    mess = wrap_node(mess, type, !!type ? mess.value : mess);
    type || (type = $sentinel);

    if (type == $error && !!selector) {
        mess = selector(requested, mess);
    }

    node = replace_node(parent, node, mess, key, roots.lru);
    node = graph_node(root, parent, node, key, inc_generation());
    update_graph(parent, size - node.$size, roots.version, roots.lru);
    nodes[0] = node;

    json[jsonkey] = clone(roots, node, type, node && node.value);
    roots.hasValue = true;
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[0];
    var type = is_object(node) && node.$type || (node = undefined);

    if (node_as_miss(roots, node, type, pathset, requested, optimized) === false) {
        clone_success(roots, requested, optimized);
        promote(roots.lru, node);
        if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
            node = clone(roots, node, type, node && node.value);
            json = roots[1];
            json.$type = node.$type;
            json.value = node.value;
        }
        roots.hasValue = true;
    }
}
},{"../lru/collect":67,"../lru/promote":68,"../support/array-clone":80,"../support/clone-graph-json":83,"../support/clone-success-paths":87,"../support/create-branch":89,"../support/get-valid-key":91,"../support/graph-node":92,"../support/inc-generation":93,"../support/is-object":97,"../support/options":102,"../support/replace-node":105,"../support/treat-node-as-error":107,"../support/treat-node-as-miss":108,"../support/update-back-refs":110,"../support/update-graph":111,"../support/wrap-node":112,"../types/$error":113,"../types/$path":114,"../types/$sentinel":115,"../walk/walk-path-set-soft-link":118}],77:[function(_dereq_,module,exports){
module.exports = set_json_values_as_json_sparse;

var $path = _dereq_("../types/$path");
var $error = _dereq_("../types/$error");
var $sentinel = _dereq_("../types/$sentinel");

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var create_branch = _dereq_("../support/create-branch");
var wrap_node = _dereq_("../support/wrap-node");
var replace_node = _dereq_("../support/replace-node");
var graph_node = _dereq_("../support/graph-node");
var update_back_refs = _dereq_("../support/update-back-refs");
var update_graph = _dereq_("../support/update-graph");
var inc_generation = _dereq_("../support/inc-generation");

var node_as_miss = _dereq_("../support/treat-node-as-miss");
var node_as_error = _dereq_("../support/treat-node-as-error");
var clone_success = _dereq_("../support/clone-success-paths");

var collect = _dereq_("../lru/collect");

function set_json_values_as_json_sparse(model, pathvalues, values, error_selector) {

    var roots = options([], model, error_selector);
    var index = -1;
    var count = pathvalues.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];
    var json = values[0];
    var hasValue;

    roots[0] = roots.root;
    roots[3] = parents[3] = nodes[3] = json.json || (json.json = {});

    while (++index < count) {

        var pv = pathvalues[index];
        var pathset = pv.path;
        roots.value = pv.value;

        walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
    }

    hasValue = roots.hasValue;
    if(hasValue) {
        json.json = roots[3];
    } else {
        delete json.json;
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
        hasValue: hasValue,
        requestedPaths: roots.requestedPaths,
        optimizedPaths: roots.optimizedPaths,
        requestedMissingPaths: roots.requestedMissingPaths,
        optimizedMissingPaths: roots.optimizedMissingPaths
    };
}

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent, json, jsonkey;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        jsonkey = get_valid_key(requested);
        json = parents[3];
        parent = parents[0];
    } else {
        jsonkey = key;
        json = nodes[3];
        parent = nodes[0];
    }

    var node = parent[key],
        type;

    if (!is_top_level) {
        type = is_object(node) && node.$type || undefined;
        type = type && pathset.length > 1 && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[0] = parent;
        nodes[0] = node;
        return;
    }

    if (pathset.length > 1) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[0] = nodes[0] = node;
        parents[3] = json;
        nodes[3] = json[jsonkey] || (json[jsonkey] = {});
        return;
    }

    var selector = roots.error_selector;
    var root = roots[0];
    var size = is_object(node) && node.$size || 0;
    var mess = roots.value;

    type = is_object(mess) && mess.$type || undefined;
    mess = wrap_node(mess, type, !!type ? mess.value : mess);
    type || (type = $sentinel);

    if (type == $error && !!selector) {
        mess = selector(requested, mess);
    }

    node = replace_node(parent, node, mess, key, roots.lru);
    node = graph_node(root, parent, node, key, inc_generation());
    update_graph(parent, size - node.$size, roots.version, roots.lru);
    nodes[0] = node;

    json[jsonkey] = clone(roots, node, type, node && node.value);
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {

    var json;
    var node = nodes[0];
    var type = is_object(node) && node.$type || (node = undefined);

    if (node_as_miss(roots, node, type, pathset, requested, optimized) === false) {
        clone_success(roots, requested, optimized);
        if (node_as_error(roots, node, type, requested) === false) {
            if (keyset == null && !roots.hasValue && (keyset = get_valid_key(optimized)) == null) {
                node = clone(roots, node, type, node && node.value);
                json = roots[3];
                json.$type = node.$type;
                json.value = node.value;
            }
            roots.hasValue = true;
        }
    }
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/clone-dense-json":82,"../support/clone-success-paths":87,"../support/create-branch":89,"../support/get-valid-key":91,"../support/graph-node":92,"../support/inc-generation":93,"../support/is-object":97,"../support/options":102,"../support/replace-node":105,"../support/treat-node-as-error":107,"../support/treat-node-as-miss":108,"../support/update-back-refs":110,"../support/update-graph":111,"../support/wrap-node":112,"../types/$error":113,"../types/$path":114,"../types/$sentinel":115,"../walk/walk-path-set":119}],78:[function(_dereq_,module,exports){
module.exports = set_json_values_as_json_values;

var $error = _dereq_("../types/$error");
var $sentinel = _dereq_("../types/$sentinel");

var clone = _dereq_("../support/clone-dense-json");
var array_clone = _dereq_("../support/array-clone");

var options = _dereq_("../support/options");
var walk_path_set = _dereq_("../walk/walk-path-set");

var is_object = _dereq_("../support/is-object");

var get_valid_key = _dereq_("../support/get-valid-key");
var create_branch = _dereq_("../support/create-branch");
var wrap_node = _dereq_("../support/wrap-node");
var replace_node = _dereq_("../support/replace-node");
var graph_node = _dereq_("../support/graph-node");
var update_back_refs = _dereq_("../support/update-back-refs");
var update_graph = _dereq_("../support/update-graph");
var inc_generation = _dereq_("../support/inc-generation");

var node_as_miss = _dereq_("../support/treat-node-as-miss");
var node_as_error = _dereq_("../support/treat-node-as-error");
var clone_success = _dereq_("../support/clone-success-paths");

var collect = _dereq_("../lru/collect");

function set_json_values_as_json_values(model, pathvalues, onNext, error_selector) {

    var roots = options([], model, error_selector);
    var index = -1;
    var count = pathvalues.length;
    var nodes = roots.nodes;
    var parents = array_clone(nodes);
    var requested = [];
    var optimized = [];

    roots[0] = roots.root;
    roots.onNext = onNext;

    while (++index < count) {
        var pv = pathvalues[index];
        var pathset = pv.path;
        roots.value = pv.value;
        walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized);
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

function onNode(pathset, roots, parents, nodes, requested, optimized, is_top_level, key, keyset, is_keyset) {

    var parent;

    if (key == null) {
        if ((key = get_valid_key(optimized)) == null) {
            return;
        }
        parent = parents[0];
    } else {
        parent = nodes[0];
    }

    var node = parent[key],
        type;

    if (!is_top_level) {
        type = is_object(node) && node.$type || undefined;
        type = type && pathset.length > 1 && "." || type;
        node = create_branch(roots, parent, node, type, key);
        parents[0] = parent;
        nodes[0] = node;
        return;
    }

    if (pathset.length > 1) {
        type = is_object(node) && node.$type || undefined;
        node = create_branch(roots, parent, node, type, key);
        parents[0] = nodes[0] = node;
        return;
    }

    var selector = roots.error_selector;
    var root = roots[0];
    var size = is_object(node) && node.$size || 0;
    var mess = roots.value;

    type = is_object(mess) && mess.$type || undefined;
    mess = wrap_node(mess, type, !!type ? mess.value : mess);
    type || (type = $sentinel);

    if (type == $error && !!selector) {
        mess = selector(requested, mess);
    }

    node = replace_node(parent, node, mess, key, roots.lru);
    node = graph_node(root, parent, node, key, inc_generation());
    update_graph(parent, size - node.$size, roots.version, roots.lru);
    nodes[0] = node;
}

function onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset) {

    var node = nodes[0];
    var type = is_object(node) && node.$type || (node = undefined);

    if (node_as_miss(roots, node, type, pathset, requested, optimized) === false) {
        clone_success(roots, requested, optimized);
        if (node_as_error(roots, node, type, requested) === false) {
            roots.onNext({
                path: array_clone(requested),
                value: clone(roots, node, type, node && node.value)
            });
        }
    }
}
},{"../lru/collect":67,"../support/array-clone":80,"../support/clone-dense-json":82,"../support/clone-success-paths":87,"../support/create-branch":89,"../support/get-valid-key":91,"../support/graph-node":92,"../support/inc-generation":93,"../support/is-object":97,"../support/options":102,"../support/replace-node":105,"../support/treat-node-as-error":107,"../support/treat-node-as-miss":108,"../support/update-back-refs":110,"../support/update-graph":111,"../support/wrap-node":112,"../types/$error":113,"../types/$sentinel":115,"../walk/walk-path-set":119}],79:[function(_dereq_,module,exports){
module.exports = function(array, value) {
    var i = -1;
    var n = array.length;
    var array2 = new Array(n + 1);
    while(++i < n) { array2[i] = array[i]; }
    array2[i] = value;
    return array2;
};
},{}],80:[function(_dereq_,module,exports){
module.exports = function(array) {
    var i = -1;
    var n = array.length;
    var array2 = new Array(n);
    while(++i < n) { array2[i] = array[i]; }
    return array2;
};
},{}],81:[function(_dereq_,module,exports){
module.exports = function(array, index) {
    var i = -1;
    var n = array.length - index;
    var array2 = new Array(n);
    while(++i < n) { array2[i] = array[i + index]; }
    return array2;
};
},{}],82:[function(_dereq_,module,exports){
var $sentinel = _dereq_("../types/$sentinel");
var clone = _dereq_("./clone");
module.exports = function(roots, node, type, value) {
    
    if(node == null || value === undefined) {
        return { $type: $sentinel };
    }
    
    if(roots.boxed == true) {
        return !!type && clone(node) || node;
    }
    
    return value;
}

},{"../types/$sentinel":115,"./clone":88}],83:[function(_dereq_,module,exports){
var $sentinel = _dereq_("../types/$sentinel");
var clone = _dereq_("./clone");
var is_primitive = _dereq_("./is-primitive");
module.exports = function(roots, node, type, value) {
    
    if(node == null || value === undefined) {
        return { $type: $sentinel };
    }
    
    if(roots.boxed == true) {
        return !!type && clone(node) || node;
    }
    
    if(!type || (type === $sentinel && is_primitive(value))) {
        return value;
    }
    
    return clone(node);
}
},{"../types/$sentinel":115,"./clone":88,"./is-primitive":98}],84:[function(_dereq_,module,exports){
var clone_requested_path = _dereq_("./clone-requested-path");
var clone_optimized_path = _dereq_("./clone-optimized-path");
module.exports = function(roots, pathset, requested, optimized) {
    roots.requestedMissingPaths.push(clone_requested_path(roots.bound, requested, pathset, roots.index));
    roots.optimizedMissingPaths.push(clone_optimized_path(optimized, pathset));
}
},{"./clone-optimized-path":85,"./clone-requested-path":86}],85:[function(_dereq_,module,exports){
module.exports = function(optimized, rest) {
    var x;
    var i = -1;
    var j = -1;
    var n = optimized.length;
    var m = rest.length;
    var array2 = [];
    while(++i < n) { array2[i] = optimized[i]; }
    while(++j < m) { if((x = rest[j]) != null) { array2[i++] = x; } }
    return array2;
}
},{}],86:[function(_dereq_,module,exports){
module.exports = function(bound, requested, rest, index) {
    var x;
    var i = -1;
    var j = -1;
    var k = -1;
    var n = bound.length;
    var m = requested.length;
    var l = rest.length;
    var array2 = new Array(n + m + l);
    while(++i < n) { array2[i] = bound[i]; }
    while(++j < m) { if((x = requested[j]) != null) { array2[i++] = requested[j]; } }
    while(++k < l) { if((x = rest[k]) != null) { array2[i++] = rest[k]; } }
    if(index != null) {
        array2.pathSetIndex = index;
    }
    return array2;
}
},{}],87:[function(_dereq_,module,exports){
var array_slice = _dereq_("./array-slice");
var array_clone = _dereq_("./array-clone");
module.exports = function(roots, requested, optimized) {
    roots.requestedPaths.push(array_slice(requested, roots.offset));
    roots.optimizedPaths.push(array_clone(optimized));
}
},{"./array-clone":80,"./array-slice":81}],88:[function(_dereq_,module,exports){
var is_object = _dereq_("./is-object");
module.exports = function(value) {
    var dest = value, src = dest, i = -1, n, keys, key;
    if(is_object(dest)) {
        dest = {};
        keys = Object.keys(src);
        n = keys.length;
        while(++i < n) {
            key = keys[i];
            if((key[0] !== "_" || key[1] !== "_") && (key !== "/" && key !== "./" && key !== "../")) {
                dest[key] = src[key];
            }
        }
    }
    return dest;
}
},{"./is-object":97}],89:[function(_dereq_,module,exports){
var $path = _dereq_("../types/$path");
var $expired = "expired";
var replace_node = _dereq_("./replace-node");
var graph_node = _dereq_("./graph-node");
var update_back_refs = _dereq_("./update-back-refs");
var is_primitive = _dereq_("./is-primitive");
var is_expired = _dereq_("./is-expired");

module.exports = function(roots, parent, node, type, key) {
    
    if(!!type && is_expired(roots, node)) {
        type = $expired;
    }
    
    if((!!type && type != $path) || is_primitive(node)) {
        node = replace_node(parent, node, {}, key, roots.lru);
        node = graph_node(roots[0], parent, node, key, 0);
        node = update_back_refs(node, roots.version);
    }
    return node;
}
},{"../types/$path":114,"./graph-node":92,"./is-expired":96,"./is-primitive":98,"./replace-node":105,"./update-back-refs":110}],90:[function(_dereq_,module,exports){
var __ref = "__ref";
module.exports = function(node) {
    var ref, i = -1, n = node.__refs_length || 0;
    while(++i < n) {
        if((ref = node[__ref + i]) !== undefined) {
            ref.__context = ref.__ref_index = node[__ref + i] = undefined;
        }
    }
    node.__refs_length = undefined
}
},{}],91:[function(_dereq_,module,exports){
module.exports = function(path) {
    var key, index = path.length - 1;
    do {
        if((key = path[index]) != null) {
            return key;
        }
    } while(--index > -1);
    return null;
}
},{}],92:[function(_dereq_,module,exports){

var $root = "/";
var $self = "./";
var $parent = "../";
var $key = "__key";
var $generation = "__generation";

module.exports = function(root, parent, node, key, generation) {
    node[$root] = root;
    node[$self] = node;
    node[$parent] = parent;
    node[$key] = key;
    node[$generation] = generation;
    return node;
}
},{}],93:[function(_dereq_,module,exports){
var generation = 0;
module.exports = function() { return generation++; }
},{}],94:[function(_dereq_,module,exports){
var version = 0;
module.exports = function() { return version++; }
},{}],95:[function(_dereq_,module,exports){
module.exports = invalidate;

var is_object = _dereq_("./is-object");
var remove_node = _dereq_("./remove-node");

function invalidate(parent, node, key, lru) {
    if(remove_node(parent, node, key, lru)) {
        var type = is_object(node) && node.$type || undefined;
        if(type == null) {
            var keys = Object.keys(node);
            for(var i = -1, n = keys.length; ++i < n;) {
                var key = keys[i];
                if((key[0] !== "_" || key[1] !== "_") && (key !== "/" && key !== "./" && key !== "../")) {
                    invalidate(node, node[key], key, lru);
                }
            }
        }
        return true;
    }
    return false;
}
},{"./is-object":97,"./remove-node":104}],96:[function(_dereq_,module,exports){
var $expires_now = _dereq_("../values/$expires-now");
var $expires_never = _dereq_("../values/$expires-never");
var now = _dereq_("./now");
var splice = _dereq_("../lru/splice");

module.exports = function(roots, node) {
    var expires = node.$expires;
    if((expires != null                            ) && (
        expires != $expires_never                  ) && (
        expires == $expires_now || expires < now()))    {
        if(!node.__invalidated) {
            node.__invalidated = true;
            roots.expired.push(node);
            splice(roots.lru, node);
        }
        return true;
    }
    return false;
}
},{"../lru/splice":69,"../values/$expires-never":116,"../values/$expires-now":117,"./now":101}],97:[function(_dereq_,module,exports){
var obj_typeof = "object";
module.exports = function(value) {
    return value != null && typeof value == obj_typeof;
}
},{}],98:[function(_dereq_,module,exports){
var obj_typeof = "object";
module.exports = function(value) {
    return value == null || typeof value != obj_typeof;
}
},{}],99:[function(_dereq_,module,exports){
module.exports = key_to_keyset;

var isArray = Array.isArray;

function key_to_keyset(key, iskeyset) {
    if(iskeyset) {
        if(isArray(key)) {
            key = key[key.__offset || (key.__offset = 0)];
            return key_to_keyset(key, key != null && typeof key === "object");
        } else {
            if(key.__offset === undefined) {
                key.__offset = key.from || (key.from = 0);
            }
            return key.__offset;
        }
    }
    return key;
}


},{}],100:[function(_dereq_,module,exports){

var $self = "./";
var $path = _dereq_("../types/$path");
var $sentinel = _dereq_("../types/$sentinel");
var $expires_now = _dereq_("../values/$expires-now");

var is_object = _dereq_("./is-object");
var is_primitive = _dereq_("./is-primitive");
var is_expired = _dereq_("./is-expired");
var promote = _dereq_("../lru/promote");
var wrap_node = _dereq_("./wrap-node");
var graph_node = _dereq_("./graph-node");
var replace_node = _dereq_("../support/replace-node");
var update_graph  = _dereq_("../support/update-graph");
var inc_generation = _dereq_("./inc-generation");
var invalidate_node = _dereq_("./invalidate-node");

module.exports = function(roots, parent, node, messageParent, message, key) {
    
    var type, messageType, node_is_object, message_is_object;
    
    // If the cache and message are the same, we can probably return early:
    // - If they're both null, return null.
    // - If they're both branches, return the branch.
    // - If they're both edges, continue below.
    if(node == message) {
        if(node == null) {
            return null;
        } else if(node_is_object = is_object(node)) {
            type = node.$type;
            if(type == null) {
                if(node[$self] == null) {
                    return graph_node(roots[0], parent, node, key, 0);
                }
                return node;
            }
        }
    } else if(node_is_object = is_object(node)) {
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
        } else if(message_is_object = is_object(message)) {
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
        if(message_is_object = is_object(message)) {
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
    if(!!messageType && !!message[$self] && is_expired(roots, message)) {
        if(node_is_object && node != message) {
            invalidate_node(parent, node, key, roots.lru);
        }
        return message;
    }
    // If the cache is a value, but the message is a branch, merge the branch over the value.
    else if(!!type && message_is_object && !messageType) {
        node = replace_node(parent, node, message, key, roots.lru);
        return graph_node(roots[0], parent, node, key, 0);
    }
    // If the message is a value, insert it into the cache.
    else if(!message_is_object || !!messageType) {
        var offset = 0;
        // If we've arrived at this message value, but didn't perform a whole-branch merge
        // on one of its ancestors, replace the cache node with the message value.
        if(node != message) {
            messageValue || (messageValue = !!messageType ? message.value : message);
            message = wrap_node(message, messageType, messageValue);
            
            var size = node_is_object && node.$size || 0;
            var messageSize = message.$size;
            offset = size - messageSize;
            
            node = replace_node(parent, node, message, key, roots.lru);
            update_graph(parent, offset, roots.version, roots.lru);
            node = graph_node(roots[0], parent, node, key, inc_generation());
        }
        // If the cache and the message are the same value, we branch-merged one of its
        // ancestors. Give the message a $size and $type, attach its graph pointers, and
        // update the cache sizes and generations.
        else if(node_is_object && node[$self] == null) {
            node = parent[key] = wrap_node(node, type, node.value);
            offset = -node.$size;
            update_graph(parent, offset, roots.version, roots.lru);
            node = graph_node(roots[0], parent, node, key, inc_generation());
        }
        // Otherwise, cache and message are the same primitive value. Wrap in a sentinel and insert.
        else {
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

},{"../lru/promote":68,"../support/replace-node":105,"../support/update-graph":111,"../types/$path":114,"../types/$sentinel":115,"../values/$expires-now":117,"./graph-node":92,"./inc-generation":93,"./invalidate-node":95,"./is-expired":96,"./is-object":97,"./is-primitive":98,"./wrap-node":112}],101:[function(_dereq_,module,exports){
module.exports = Date.now;
},{}],102:[function(_dereq_,module,exports){
var inc_version = _dereq_("../support/inc-version");
var getBoundValue = _dereq_('../get/getBoundValue');

module.exports = function(options, model, error_selector) {
    
    var version        = options.version = inc_version();
    var lru            = options.lru                   || (options.lru                   = model._root);
    var root           = options.root                  || (options.root                  = model._cache);
    var expired        = options.expired               || (options.expired               = lru.expired);
    var bound          = options.bound                 || (options.bound                 = model._path || []);
    var errors         = options.errors                || (options.errors                = []);
    var requested      = options.requestedPaths        || (options.requestedPaths        = []);
    var optimized      = options.optimizedPaths        || (options.optimizedPaths        = []);
    var missing_r      = options.requestedMissingPaths || (options.requestedMissingPaths = []);
    var missing_o      = options.optimizedMissingPaths || (options.optimizedMissingPaths = []);
    var nodes          = options.nodes                 || (options.nodes = []);
    var boxed          = options.boxed  = model._boxed || false;
    var materialized   = options.materialized = model._materialized;
    var errorsAsValues = options.errorsAsValues = model._treatErrorsAsValues || false;
    
    options.offset || (options.offset = 0);
    options.error_selector = error_selector || model._errorSelector;
    
    if(bound.length) {
        nodes[0] = getBoundValue(model, bound).value;
    } else {
        nodes[0] = root;
    }
    
    return options;
};
},{"../get/getBoundValue":45,"../support/inc-version":94}],103:[function(_dereq_,module,exports){
module.exports = permute_keyset;

var isArray = Array.isArray;

function permute_keyset(key) {
    if(isArray(key)) {
        if(++key.__offset === key.length) {
            return permute_keyset(key[key.__offset = 0]);
        } else {
            return true;
        }
    } else if(key != null && typeof key === "object") {
        if(++key.__offset > (key.to || (key.to = key.from + (key.length || 1) - 1))) {
            key.__offset = key.from;
            return false;
        }
        return true;
    }
    return false;
}


},{}],104:[function(_dereq_,module,exports){
var $path = _dereq_("../types/$path");
var $root = "/";
var $self = "./";
var $parent = "../"
var unlink = _dereq_("./unlink");
var delete_back_refs = _dereq_("./delete-back-refs");
var splice = _dereq_("../lru/splice");
var is_object = _dereq_("./is-object");

module.exports = function(parent, node, key, lru) {
    if(is_object(node)) {
        var type  = node.$type;
        if(!!type) {
            if(type == $path) { unlink(node); }
            splice(lru, node);
        }
        delete_back_refs(node);
        parent[key] = node[$root] = node[$parent] = node[$self] = undefined;
        return true;
    }
    return false;
}
},{"../lru/splice":69,"../types/$path":114,"./delete-back-refs":90,"./is-object":97,"./unlink":109}],105:[function(_dereq_,module,exports){
var transfer_back_refs = _dereq_("./transfer-back-refs");
var invalidate_node = _dereq_("./invalidate-node");

module.exports = function(parent, node, replacement, key, lru) {
    if(node != null && node !== replacement && typeof node == "object") {
        transfer_back_refs(node, replacement);
        invalidate_node(parent, node, key, lru);
    }
    return parent[key] = replacement;
}
},{"./invalidate-node":95,"./transfer-back-refs":106}],106:[function(_dereq_,module,exports){
var __ref = "__ref";
var __refs_length = "__refs_length";
module.exports = function(node, dest) {
    var nodeRefsLength = node[__refs_length] || 0,
        destRefsLength = dest[__refs_length] || 0,
        i = -1, ref;
    while(++i < nodeRefsLength) {
        ref = node[__ref + i];
        if(ref !== undefined) {
            ref.__context = dest;
            dest[__ref + (destRefsLength + i)] = ref;
            node[__ref + i] = undefined;
        }
    }
    dest[__refs_length] = nodeRefsLength + destRefsLength;
    node[__refs_length] = ref = undefined;
}
},{}],107:[function(_dereq_,module,exports){
var $error = _dereq_("../types/$error");
var promote = _dereq_("../lru/promote");
var array_clone = _dereq_("./array-clone");
module.exports = function(roots, node, type, path) {
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
},{"../lru/promote":68,"../types/$error":113,"./array-clone":80}],108:[function(_dereq_,module,exports){
var $sentinel = _dereq_("../types/$sentinel");
var clone_misses = _dereq_("./clone-missing-paths");
var is_expired = _dereq_("./is-expired");

module.exports = function(roots, node, type, pathset, requested, optimized) {
    var dematerialized = !roots.materialized;
    if(node == null && dematerialized) {
        clone_misses(roots, pathset, requested, optimized);
        return true;
    } else if(!!type) {
        if(type == $sentinel && node.value === undefined && dematerialized && !roots.boxed) {
            return true;
        } else if(is_expired(roots, node)) {
            clone_misses(roots, pathset, requested, optimized);
            return true;
        }
    }
    return false;
};
},{"../types/$sentinel":115,"./clone-missing-paths":84,"./is-expired":96}],109:[function(_dereq_,module,exports){
var $ref = "__ref";
module.exports = function(ref) {
    var destination = ref.__context;
    if(destination) {
        var i = (ref.__ref_index || 0) - 1,
            n = (destination.__refs_length || 0) - 1;
        while(++i <= n) {
            destination[$ref + i] = destination[$ref + (i + 1)];
        }
        destination.__refs_length = n;
        ref.__ref_index = ref.__context = destination = undefined;
    }
}
},{}],110:[function(_dereq_,module,exports){
module.exports = update_back_refs;

var generation = _dereq_("./inc-generation");

function update_back_refs(node, version) {
    if(node && node.__version !== version) {
        node.__version = version;
        node.__generation = generation();
        update_back_refs(node["../"], version);
        var i = -1, n = node.__refs_length || 0;
        while(++i < n) {
            update_back_refs(node["__ref" + i], version);
        }
    }
    return node;
}

},{"./inc-generation":93}],111:[function(_dereq_,module,exports){
var remove_node = _dereq_("./remove-node");
var update_back_refs = _dereq_("./update-back-refs");

module.exports = function(node, offset, version, lru) {
    var child;
    while(child = node) {
        node = child["../"];
        if((child.$size = (child.$size || 0) - offset) <= 0 && node != null) {
            remove_node(node, child, child.__key, lru);
        } else if(child.__version !== version) {
            update_back_refs(child, version);
        }
    }
}
},{"./remove-node":104,"./update-back-refs":110}],112:[function(_dereq_,module,exports){
var $path = _dereq_("../types/$path");
var $error = _dereq_("../types/$error");
var $sentinel = _dereq_("../types/$sentinel");

var now = _dereq_("./now");
var clone = _dereq_("./clone");
var is_array = Array.isArray;
var is_object = _dereq_("./is-object");

module.exports = function(node, type, value) {
    
    var dest = node, size = 0;
    
    if(!!type) {
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
        type = $sentinel;
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
    
    var expires = is_object(node) && node.$expires || undefined;
    if(typeof expires === "number" && expires < 0) {
        dest.$expires = now() + (expires * -1);
    }
    
    dest.$type = type;
    dest.$size = size;
    
    return dest;
}
},{"../types/$error":113,"../types/$path":114,"../types/$sentinel":115,"./clone":88,"./is-object":97,"./now":101}],113:[function(_dereq_,module,exports){
module.exports = "error";
},{}],114:[function(_dereq_,module,exports){
module.exports = "ref";
},{}],115:[function(_dereq_,module,exports){
module.exports = "sentinel";
},{}],116:[function(_dereq_,module,exports){
module.exports = 1;
},{}],117:[function(_dereq_,module,exports){
module.exports = 0;
},{}],118:[function(_dereq_,module,exports){
module.exports = walk_path_set;

var $path = _dereq_("../types/$path");
var empty_array = new Array(0);

var walk_reference = _dereq_("./walk-reference");

var array_slice    = _dereq_("../support/array-slice");
var array_clone    = _dereq_("../support/array-clone");
var array_append   = _dereq_("../support/array-append");

var is_expired = _dereq_("../support/is-expired");
var is_primitive = _dereq_("../support/is-primitive");
var is_object = _dereq_("../support/is-object");

var keyset_to_key  = _dereq_("../support/keyset-to-key");
var permute_keyset = _dereq_("../support/permute-keyset");

function walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized, key, keyset, is_keyset) {
    
    var node = nodes[0];
    
    if(pathset.length == 0 || is_primitive(node)) {
        return onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset);
    }
    
    var type = node.$type;
    
    while(type === $path) {
        
        if(is_expired(roots, node)) {
            nodes[0] = undefined;
            return onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset);
        }
        
        var container = node;
        var reference = node.value;
        
        nodes[0] = parents[0] = roots[0];
        nodes[1] = parents[1] = roots[1];
        nodes[2] = parents[2] = roots[2];
        
        walk_reference(onNode, container, reference, roots, parents, nodes, requested, optimized);
        
        node = nodes[0];
        
        if(node == null) {
            return onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset);
        } else if(is_primitive(node) || ((type = node.$type) && type != $path)) {
            onNode(empty_array, roots, parents, nodes, requested, optimized, true, null, keyset, false);
            return onEdge(pathset, roots, parents, nodes, array_append(requested, null), optimized, key, keyset);
        }
    }
    
    if(type != null) {
        return onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset);
    }
    
    var outer_key = pathset[0];
    var is_outer_keyset = is_object(outer_key);
    
    do {
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
            onNode(pathset, roots, parents2, nodes2, requested2, optimized2, true, null, inner_keyset, false);
        } else {
            requested2 = array_append(requested, inner_key);
            optimized2 = array_append(optimized, inner_key);
            onNode(pathset, roots, parents2, nodes2, requested2, optimized2, true, inner_key, inner_keyset, is_outer_keyset);
        }
        
        walk_path_set(onNode, onEdge,
            array_slice(pathset, 1),
            roots, parents2, nodes2,
            requested2, optimized2,
            inner_key, inner_keyset, is_outer_keyset
        );
    } while(is_outer_keyset && permute_keyset(outer_key));
}
},{"../support/array-append":79,"../support/array-clone":80,"../support/array-slice":81,"../support/is-expired":96,"../support/is-object":97,"../support/is-primitive":98,"../support/keyset-to-key":99,"../support/permute-keyset":103,"../types/$path":114,"./walk-reference":120}],119:[function(_dereq_,module,exports){
module.exports = walk_path_set;

var $path = _dereq_("../types/$path");
var empty_array = new Array(0);

var walk_reference = _dereq_("./walk-reference");

var array_slice    = _dereq_("../support/array-slice");
var array_clone    = _dereq_("../support/array-clone");
var array_append   = _dereq_("../support/array-append");

var is_expired = _dereq_("../support/is-expired");
var is_primitive = _dereq_("../support/is-primitive");
var is_object = _dereq_("../support/is-object");

var keyset_to_key  = _dereq_("../support/keyset-to-key");
var permute_keyset = _dereq_("../support/permute-keyset");

function walk_path_set(onNode, onEdge, pathset, roots, parents, nodes, requested, optimized, key, keyset, is_keyset) {
    
    var node = nodes[0];
    
    if(pathset.length == 0 || is_primitive(node)) {
        return onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset);
    }
    
    var type = node.$type;
    
    while(type === $path) {
        
        if(is_expired(roots, node)) {
            nodes[0] = undefined;
            return onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset);
        }
        
        var container = node;
        var reference = node.value;
        node = node.__context;
        
        if(node != null) {
            type = node.$type;
            optimized = array_clone(reference);
            nodes[0]  = node;
        } else {
            
            nodes[0] = parents[0] = roots[0];
            // nodes[1] = parents[1] = roots[1];
            // nodes[2] = parents[2] = roots[2];
            
            walk_reference(onNode, container, reference, roots, parents, nodes, requested, optimized);
            
            node = nodes[0];
            
            if(node == null) {
                return onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset);
            } else if(is_primitive(node) || ((type = node.$type) && type != $path)) {
                onNode(empty_array, roots, parents, nodes, requested, optimized, true, null, keyset, false);
                return onEdge(pathset, roots, parents, nodes, array_append(requested, null), optimized, key, keyset);
            }
        }
    }
    
    if(type != null) {
        return onEdge(pathset, roots, parents, nodes, requested, optimized, key, keyset);
    }
    
    var outer_key = pathset[0];
    var is_outer_keyset = is_object(outer_key);
    
    do {
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
            onNode(pathset, roots, parents2, nodes2, requested2, optimized2, true, null, inner_keyset, false);
        } else {
            requested2 = array_append(requested, inner_key);
            optimized2 = array_append(optimized, inner_key);
            onNode(pathset, roots, parents2, nodes2, requested2, optimized2, true, inner_key, inner_keyset, is_outer_keyset);
        }
        
        walk_path_set(onNode, onEdge,
            array_slice(pathset, 1),
            roots, parents2, nodes2,
            requested2, optimized2,
            inner_key, inner_keyset, is_outer_keyset
        );
    } while(is_outer_keyset && permute_keyset(outer_key));
}
},{"../support/array-append":79,"../support/array-clone":80,"../support/array-slice":81,"../support/is-expired":96,"../support/is-object":97,"../support/is-primitive":98,"../support/keyset-to-key":99,"../support/permute-keyset":103,"../types/$path":114,"./walk-reference":120}],120:[function(_dereq_,module,exports){
module.exports = walk_reference;

var __ref = "__ref";
var empty_array = new Array(0);

var is_object      = _dereq_("../support/is-object");
var is_primitive   = _dereq_("../support/is-primitive");
var array_slice    = _dereq_("../support/array-slice");
var array_append   = _dereq_("../support/array-append");

function walk_reference(onNode, container, reference, roots, parents, nodes, requested, optimized) {
    
    optimized.length = 0;
    
    var index = -1;
    var count = reference.length;
    var node, key, keyset;
    
    while(++index < count) {
        
        node = nodes[0];
        
        if(node == null) {
            return nodes;
        } else if(is_primitive(node) || node.$type) {
            onNode(empty_array, roots, parents, nodes, requested, optimized, false, keyset, null, false);
            return nodes;
        }
        
        do {
            key = reference[index];
            if(key != null) {
                keyset = key;
                optimized.push(key);
                onNode(array_slice(reference, index), roots, parents, nodes, requested, optimized, false, key, null, false);
                break;
            }
        } while(++index < count);
    }
    
    node = nodes[0];
    
    if(is_object(node) && container.__context !== node) {
        var backrefs = node.__refs_length || 0;
        node.__refs_length = backrefs + 1;
        node[__ref + backrefs] = container;
        container.__context    = node;
        container.__ref_index  = backrefs;
    }
    
    return nodes;
}
},{"../support/array-append":79,"../support/array-slice":81,"../support/is-object":97,"../support/is-primitive":98}],121:[function(_dereq_,module,exports){
var falcor = _dereq_('./lib/falcor');
var get = _dereq_('./lib/get');
var set = _dereq_('./lib/set');
var inv = _dereq_('./lib/invalidate');
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

prototype._setJSONGsAsJSON = set.setJSONGsAsJSON;
prototype._setJSONGsAsJSONG = set.setJSONGsAsJSONG;
prototype._setJSONGsAsPathMap = set.setJSONGsAsPathMap;
prototype._setJSONGsAsValues = set.setJSONGsAsValues;

prototype._invPathSetsAsJSON = inv.invPathSetsAsJSON;
prototype._invPathSetsAsJSONG = inv.invPathSetsAsJSONG;
prototype._invPathSetsAsPathMap = inv.invPathSetsAsPathMap;
prototype._invPathSetsAsValues = inv.invPathSetsAsValues;

prototype._setCache = get.setCache;

module.exports = falcor;


},{"./lib/falcor":6,"./lib/get":48,"./lib/invalidate":62,"./lib/set":70}]},{},[1])
(1)
});