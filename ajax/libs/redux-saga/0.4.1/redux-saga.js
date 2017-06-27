(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxSaga"] = factory();
	else
		root["ReduxSaga"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.storeIO = exports.runSaga = exports.as = exports.cancel = exports.join = exports.fork = exports.cps = exports.apply = exports.call = exports.race = exports.put = exports.take = exports.MANUAL_CANCEL = exports.PARALLEL_AUTO_CANCEL = exports.RACE_AUTO_CANCEL = exports.SagaCancellationException = undefined;

	var _proc = __webpack_require__(2);

	Object.defineProperty(exports, 'SagaCancellationException', {
	  enumerable: true,
	  get: function get() {
	    return _proc.SagaCancellationException;
	  }
	});
	Object.defineProperty(exports, 'RACE_AUTO_CANCEL', {
	  enumerable: true,
	  get: function get() {
	    return _proc.RACE_AUTO_CANCEL;
	  }
	});
	Object.defineProperty(exports, 'PARALLEL_AUTO_CANCEL', {
	  enumerable: true,
	  get: function get() {
	    return _proc.PARALLEL_AUTO_CANCEL;
	  }
	});
	Object.defineProperty(exports, 'MANUAL_CANCEL', {
	  enumerable: true,
	  get: function get() {
	    return _proc.MANUAL_CANCEL;
	  }
	});

	var _io = __webpack_require__(4);

	Object.defineProperty(exports, 'take', {
	  enumerable: true,
	  get: function get() {
	    return _io.take;
	  }
	});
	Object.defineProperty(exports, 'put', {
	  enumerable: true,
	  get: function get() {
	    return _io.put;
	  }
	});
	Object.defineProperty(exports, 'race', {
	  enumerable: true,
	  get: function get() {
	    return _io.race;
	  }
	});
	Object.defineProperty(exports, 'call', {
	  enumerable: true,
	  get: function get() {
	    return _io.call;
	  }
	});
	Object.defineProperty(exports, 'apply', {
	  enumerable: true,
	  get: function get() {
	    return _io.apply;
	  }
	});
	Object.defineProperty(exports, 'cps', {
	  enumerable: true,
	  get: function get() {
	    return _io.cps;
	  }
	});
	Object.defineProperty(exports, 'fork', {
	  enumerable: true,
	  get: function get() {
	    return _io.fork;
	  }
	});
	Object.defineProperty(exports, 'join', {
	  enumerable: true,
	  get: function get() {
	    return _io.join;
	  }
	});
	Object.defineProperty(exports, 'cancel', {
	  enumerable: true,
	  get: function get() {
	    return _io.cancel;
	  }
	});
	Object.defineProperty(exports, 'as', {
	  enumerable: true,
	  get: function get() {
	    return _io.as;
	  }
	});

	var _runSaga = __webpack_require__(7);

	Object.defineProperty(exports, 'runSaga', {
	  enumerable: true,
	  get: function get() {
	    return _runSaga.runSaga;
	  }
	});
	Object.defineProperty(exports, 'storeIO', {
	  enumerable: true,
	  get: function get() {
	    return _runSaga.storeIO;
	  }
	});

	var _middleware = __webpack_require__(5);

	var _middleware2 = _interopRequireDefault(_middleware);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _middleware2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.check = check;
	exports.remove = remove;
	exports.deferred = deferred;
	exports.arrayOfDeffered = arrayOfDeffered;
	exports.autoInc = autoInc;
	exports.asap = asap;

	var _marked = [sampleGen].map(regeneratorRuntime.mark);

	var TASK = exports.TASK = Symbol('TASK');
	var kTrue = exports.kTrue = function kTrue() {
	  return true;
	};
	var noop = exports.noop = function noop() {};

	function check(value, predicate, error) {
	  if (!predicate(value)) throw new Error(error);
	}

	function sampleGen() {
	  return regeneratorRuntime.wrap(function sampleGen$(_context) {
	    while (1) switch (_context.prev = _context.next) {
	      case 0:
	      case 'end':
	        return _context.stop();
	    }
	  }, _marked[0], this);
	}
	var genConstructor = sampleGen.constructor;

	var is = exports.is = {
	  undef: function undef(v) {
	    return v === null || v === undefined;
	  },
	  func: function func(f) {
	    return typeof f === 'function';
	  },
	  array: Array.isArray,
	  promise: function promise(p) {
	    return p && typeof p.then === 'function';
	  },
	  generator: function generator(g) {
	    return is.func(g) && g.constructor === genConstructor;
	  },
	  iterator: function iterator(it) {
	    return it && typeof it.next === 'function';
	  },
	  throw: function _throw(it) {
	    return it && typeof it.throw === 'function';
	  },
	  task: function task(it) {
	    return it && it[TASK];
	  }
	};

	function remove(array, item) {
	  var index = array.indexOf(item);
	  if (index >= 0) array.splice(index, 1);
	}

	function deferred() {
	  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var def = _extends({}, props);
	  var promise = new Promise(function (resolve, reject) {
	    def.resolve = resolve;
	    def.reject = reject;
	  });
	  def.promise = promise;
	  return def;
	}

	function arrayOfDeffered(length) {
	  var arr = [];
	  for (var i = 0; i < length; i++) {
	    arr.push(deferred());
	  }
	  return arr;
	}

	function autoInc() {
	  var seed = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	  return function () {
	    return ++seed;
	  };
	}

	function asap(action) {
	  return Promise.resolve(1).then(function () {
	    return action();
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SagaCancellationException = exports.CANCEL = exports.MANUAL_CANCEL = exports.RACE_AUTO_CANCEL = exports.PARALLEL_AUTO_CANCEL = exports.NOT_ITERATOR_ERROR = undefined;
	exports.default = proc;

	var _utils = __webpack_require__(1);

	var _io = __webpack_require__(4);

	var _monitorActions = __webpack_require__(6);

	var monitorActions = _interopRequireWildcard(_monitorActions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NOT_ITERATOR_ERROR = exports.NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';
	var PARALLEL_AUTO_CANCEL = exports.PARALLEL_AUTO_CANCEL = 'PARALLEL_AUTO_CANCEL';
	var RACE_AUTO_CANCEL = exports.RACE_AUTO_CANCEL = 'RACE_AUTO_CANCEL';
	var MANUAL_CANCEL = exports.MANUAL_CANCEL = 'MANUAL_CANCEL';

	var nextEffectId = (0, _utils.autoInc)();

	var CANCEL = exports.CANCEL = Symbol('@@redux-saga/cancelPromise');

	var SagaCancellationException = exports.SagaCancellationException = function SagaCancellationException(type, saga, origin) {
	  _classCallCheck(this, SagaCancellationException);

	  this.type = type;
	  this.saga = saga;
	  this.origin = origin;
	};

	function proc(iterator) {
	  var subscribe = arguments.length <= 1 || arguments[1] === undefined ? function () {
	    return _utils.noop;
	  } : arguments[1];
	  var dispatch = arguments.length <= 2 || arguments[2] === undefined ? _utils.noop : arguments[2];
	  var monitor = arguments.length <= 3 || arguments[3] === undefined ? _utils.noop : arguments[3];
	  var parentEffectId = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	  var name = arguments.length <= 5 || arguments[5] === undefined ? 'anonymous' : arguments[5];

	  (0, _utils.check)(iterator, _utils.is.iterator, NOT_ITERATOR_ERROR);

	  var deferredInputs = [];
	  var canThrow = _utils.is.throw(iterator);
	  var deferredEnd = (0, _utils.deferred)();

	  var unsubscribe = subscribe(function (input) {
	    deferredInputs.forEach(function (def) {
	      if (def.match(input)) def.resolve(input);
	    });
	  });

	  iterator._isRunning = true;
	  next();

	  return newTask(parentEffectId, name, iterator, deferredEnd.promise);

	  function next(arg, isError) {
	    if (!iterator._isRunning) return;
	    try {
	      if (isError && !canThrow) throw arg;
	      var result = isError ? iterator.throw(arg) : iterator.next(arg);
	      if (!result.done) {
	        var currentEffect = runEffect(result.value, parentEffectId);
	        deferredEnd.promise[CANCEL] = currentEffect[CANCEL];
	        currentEffect.then(next, function (err) {
	          return next(err, true);
	        });
	      } else {
	        end(result.value);
	      }
	    } catch (error) {
	      /*eslint-disable no-console*/
	      console.warn(name + ': uncaught', error);
	      end(error, true);
	    }
	  }

	  function end(result, isError) {
	    iterator._isRunning = false;
	    if (!isError) {
	      iterator._result = result;
	      deferredEnd.resolve(result);
	    } else {
	      iterator._error = result;
	      deferredEnd.reject(result);
	    }
	    unsubscribe();
	  }

	  function runEffect(effect, parentEffectId) {
	    var label = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	    var effectId = nextEffectId();
	    monitor(monitorActions.effectTriggered(effectId, parentEffectId, label, effect));

	    var data = undefined;
	    var promise = _utils.is.array(effect) ? runParallelEffect(effect, effectId) : _utils.is.iterator(effect) ? proc(effect, subscribe, dispatch, monitor, effectId).done : (data = _io.as.take(effect)) ? runTakeEffect(data) : (data = _io.as.put(effect)) ? runPutEffect(data) : (data = _io.as.race(effect)) ? runRaceEffect(data, effectId) : (data = _io.as.call(effect)) ? runCallEffect(data.context, data.fn, data.args, effectId) : (data = _io.as.cps(effect)) ? runCPSEffect(data.fn, data.args) : (data = _io.as.fork(effect)) ? runForkEffect(data.task, data.args, effectId) : (data = _io.as.join(effect)) ? runJoinEffect(data) : (data = _io.as.cancel(effect)) ? runCancelEffect(data) : /* resolve anything else  */Promise.resolve(effect);

	    var def = (0, _utils.deferred)();
	    var isRunning = true;
	    var completeWith = function completeWith(fn) {
	      return function (outcome) {
	        if (isRunning) {
	          isRunning = false;
	          fn(outcome);
	        }
	      };
	    };
	    promise.then(completeWith(def.resolve), completeWith(def.reject));
	    def.promise[CANCEL] = function (_ref) {
	      var type = _ref.type;
	      var origin = _ref.origin;

	      if (isRunning) {
	        isRunning = false;
	        var error = new SagaCancellationException(type, name, origin);
	        cancelPromise(promise, error);
	        def.reject(error);
	      }
	    };

	    def.promise.then(function (result) {
	      return monitor(monitorActions.effectResolved(effectId, result));
	    }, function (error) {
	      return monitor(monitorActions.effectRejected(effectId, error));
	    });
	    return def.promise;
	  }

	  function runTakeEffect(pattern) {
	    var def = (0, _utils.deferred)({ match: (0, _io.matcher)(pattern), pattern: pattern });
	    deferredInputs.push(def);
	    var done = function done() {
	      return (0, _utils.remove)(deferredInputs, def);
	    };
	    def.promise.then(done, done);
	    def.promise[CANCEL] = done;
	    return def.promise;
	  }

	  function runPutEffect(action) {
	    return (0, _utils.asap)(function () {
	      return dispatch(action);
	    });
	  }

	  function runCallEffect(context, fn, args, effectId) {
	    var result = fn.apply(context, args);
	    return !_utils.is.iterator(result) ? Promise.resolve(result) : proc(result, subscribe, dispatch, monitor, effectId, fn.name).done;
	  }

	  function runCPSEffect(fn, args) {
	    return new Promise(function (resolve, reject) {
	      fn.apply(undefined, _toConsumableArray(args.concat(function (err, res) {
	        return _utils.is.undef(err) ? resolve(res) : reject(err);
	      })));
	    });
	  }

	  function runForkEffect(task, args, effectId) {
	    var result = undefined,
	        _iterator = undefined;
	    var isFunc = _utils.is.func(task);

	    // we run the function, next we'll check if this is a generator function
	    // (generator is a function that returns an iterator)
	    if (isFunc) result = task.apply(undefined, _toConsumableArray(args));

	    // A generator function: i.e. returns an iterator
	    if (_utils.is.iterator(result)) {
	      _iterator = result;
	    }
	    // directly forking an iterator
	    else if (_utils.is.iterator(task)) {
	        _iterator = task;
	      }
	      //simple effect: wrap in a generator
	      else {
	          _iterator = regeneratorRuntime.mark(function _callee() {
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	              while (1) {
	                switch (_context.prev = _context.next) {
	                  case 0:
	                    _context.next = 2;
	                    return isFunc ? result : task;

	                  case 2:
	                    return _context.abrupt('return', _context.sent);

	                  case 3:
	                  case 'end':
	                    return _context.stop();
	                }
	              }
	            }, _callee, this);
	          })();
	        }

	    var name = isFunc ? task.name : 'anonymous';
	    return Promise.resolve(proc(_iterator, subscribe, dispatch, monitor, effectId, name, true));
	  }

	  function runJoinEffect(task) {
	    return task.done;
	  }

	  function runCancelEffect(task) {
	    task.done[CANCEL](new SagaCancellationException(MANUAL_CANCEL, '', name));
	    return Promise.resolve();
	  }

	  function runParallelEffect(effects, effectId) {
	    var promises = effects.map(function (eff) {
	      return runEffect(eff, effectId);
	    });
	    var ret = Promise.all(promises);
	    ret[CANCEL] = function (error) {
	      promises.forEach(function (p) {
	        return cancelPromise(p, error);
	      });
	    };

	    ret.catch(function () {
	      ret[CANCEL](new SagaCancellationException(PARALLEL_AUTO_CANCEL, name, name));
	    });
	    return ret;
	  }

	  function runRaceEffect(effects, effectId) {
	    var promises = [];
	    var retP = Promise.race(Object.keys(effects).map(function (key) {
	      var promise = runEffect(effects[key], effectId, key);
	      promises.push(promise);
	      return promise.then(function (result) {
	        return _defineProperty({}, key, result);
	      }, function (error) {
	        return Promise.reject(_defineProperty({}, key, error));
	      });
	    }));

	    retP[CANCEL] = function (error) {
	      promises.forEach(function (p) {
	        return cancelPromise(p, error);
	      });
	    };

	    var done = function done() {
	      return retP[CANCEL](new SagaCancellationException(RACE_AUTO_CANCEL, name, name));
	    };
	    retP.then(done, done);
	    return retP;
	  }

	  function newTask(id, name, iterator, done, forked) {
	    var _ref3;

	    return _ref3 = {}, _defineProperty(_ref3, _utils.TASK, true), _defineProperty(_ref3, 'id', id), _defineProperty(_ref3, 'name', name), _defineProperty(_ref3, 'done', done), _defineProperty(_ref3, 'forked', forked), _defineProperty(_ref3, 'isRunning', function isRunning() {
	      return iterator._isRunning;
	    }), _defineProperty(_ref3, 'getResult', function getResult() {
	      return iterator._result;
	    }), _defineProperty(_ref3, 'getError', function getError() {
	      return iterator._error;
	    }), _ref3;
	  }

	  function cancelPromise(promise, error) {
	    if (promise[CANCEL]) promise[CANCEL](error);
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = emitter;

	var _utils = __webpack_require__(1);

	function emitter() {

	  var cbs = [];

	  function subscribe(cb) {
	    cbs.push(cb);
	    return function () {
	      return (0, _utils.remove)(cbs, cb);
	    };
	  }

	  function emit(item) {
	    cbs.slice().forEach(function (cb) {
	      return cb(item);
	    });
	  }

	  return {
	    subscribe: subscribe,
	    emit: emit
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.as = exports.CANCEL_ARG_ERROR = exports.JOIN_ARG_ERROR = exports.FORK_ARG_ERROR = exports.CPS_FUNCTION_ARG_ERROR = exports.CALL_FUNCTION_ARG_ERROR = undefined;
	exports.matcher = matcher;
	exports.take = take;
	exports.put = put;
	exports.race = race;
	exports.call = call;
	exports.apply = apply;
	exports.cps = cps;
	exports.fork = fork;
	exports.join = join;
	exports.cancel = cancel;

	var _utils = __webpack_require__(1);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var CALL_FUNCTION_ARG_ERROR = exports.CALL_FUNCTION_ARG_ERROR = "call first argument must be a function";
	var CPS_FUNCTION_ARG_ERROR = exports.CPS_FUNCTION_ARG_ERROR = "cps first argument must be a function";
	var FORK_ARG_ERROR = exports.FORK_ARG_ERROR = "fork first argument must be a generator function or an iterator";
	var JOIN_ARG_ERROR = exports.JOIN_ARG_ERROR = "join argument must be a valid task (a result of a fork)";
	var CANCEL_ARG_ERROR = exports.CANCEL_ARG_ERROR = "cancel argument must be a valid task (a result of a fork)";

	var IO = Symbol('IO');
	var TAKE = 'TAKE';
	var PUT = 'PUT';
	var RACE = 'RACE';
	var CALL = 'CALL';
	var CPS = 'CPS';
	var FORK = 'FORK';
	var JOIN = 'JOIN';
	var CANCEL = 'CANCEL';

	var effect = function effect(type, payload) {
	  var _ref;

	  return _ref = {}, _defineProperty(_ref, IO, true), _defineProperty(_ref, type, payload), _ref;
	};

	var matchers = {
	  wildcard: function wildcard() {
	    return _utils.kTrue;
	  },
	  default: function _default(pattern) {
	    return function (input) {
	      return input.type === pattern;
	    };
	  },
	  array: function array(patterns) {
	    return function (input) {
	      return patterns.some(function (p) {
	        return p === input.type;
	      });
	    };
	  },
	  predicate: function predicate(_predicate) {
	    return function (input) {
	      return _predicate(input);
	    };
	  }
	};

	function matcher(pattern) {
	  return (pattern === '*' ? matchers.wildcard : _utils.is.array(pattern) ? matchers.array : _utils.is.func(pattern) ? matchers.predicate : matchers.default)(pattern);
	}

	function take(pattern) {
	  return effect(TAKE, _utils.is.undef(pattern) ? '*' : pattern);
	}

	function put(action) {
	  return effect(PUT, action);
	}

	function race(effects) {
	  return effect(RACE, effects);
	}

	function call(fn) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return apply(null, fn, args);
	}

	function apply(context, fn) {
	  var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	  (0, _utils.check)(fn, _utils.is.func, CALL_FUNCTION_ARG_ERROR);
	  return effect(CALL, { context: context, fn: fn, args: args });
	}

	function cps(fn) {
	  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }

	  (0, _utils.check)(fn, _utils.is.func, CPS_FUNCTION_ARG_ERROR);
	  return effect(CPS, { fn: fn, args: args });
	}

	function fork(task) {
	  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    args[_key3 - 1] = arguments[_key3];
	  }

	  return effect(FORK, { task: task, args: args });
	}

	var isForkedTask = function isForkedTask(task) {
	  return task[_utils.TASK];
	};

	function join(taskDesc) {
	  if (!isForkedTask(taskDesc)) throw new Error(JOIN_ARG_ERROR);

	  return effect(JOIN, taskDesc);
	}

	function cancel(taskDesc) {
	  if (!isForkedTask(taskDesc)) throw new Error(CANCEL_ARG_ERROR);

	  return effect(CANCEL, taskDesc);
	}

	var as = exports.as = {
	  take: function take(effect) {
	    return effect && effect[IO] && effect[TAKE];
	  },
	  put: function put(effect) {
	    return effect && effect[IO] && effect[PUT];
	  },
	  race: function race(effect) {
	    return effect && effect[IO] && effect[RACE];
	  },
	  call: function call(effect) {
	    return effect && effect[IO] && effect[CALL];
	  },
	  cps: function cps(effect) {
	    return effect && effect[IO] && effect[CPS];
	  },
	  fork: function fork(effect) {
	    return effect && effect[IO] && effect[FORK];
	  },
	  join: function join(effect) {
	    return effect && effect[IO] && effect[JOIN];
	  },
	  cancel: function cancel(effect) {
	    return effect && effect[IO] && effect[CANCEL];
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(1);

	var _proc = __webpack_require__(2);

	var _proc2 = _interopRequireDefault(_proc);

	var _emitter = __webpack_require__(3);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  for (var _len = arguments.length, sagas = Array(_len), _key = 0; _key < _len; _key++) {
	    sagas[_key] = arguments[_key];
	  }

	  return function (_ref) {
	    var getState = _ref.getState;
	    var dispatch = _ref.dispatch;

	    var sagaEmitter = (0, _emitter2.default)();

	    sagas.forEach(function (saga) {
	      (0, _proc2.default)(saga(getState), sagaEmitter.subscribe, dispatch, function (action) {
	        return (0, _utils.asap)(function () {
	          return dispatch(action);
	        });
	      }, 0, saga.name);
	    });

	    return function (next) {
	      return function (action) {
	        var result = next(action); // hit reducers
	        sagaEmitter.emit(action);
	        return result;
	      };
	    };
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.effectTriggered = effectTriggered;
	exports.effectResolved = effectResolved;
	exports.effectRejected = effectRejected;
	var EFFECT_TRIGGERED = exports.EFFECT_TRIGGERED = 'EFFECT_TRIGGERED';
	var EFFECT_RESOLVED = exports.EFFECT_RESOLVED = 'EFFECT_RESOLVED';
	var EFFECT_REJECTED = exports.EFFECT_REJECTED = 'EFFECT_REJECTED';

	function effectTriggered(effectId, parentEffectId, label, effect) {
	  return {
	    type: EFFECT_TRIGGERED,
	    effectId: effectId, parentEffectId: parentEffectId, label: label, effect: effect
	  };
	}

	function effectResolved(effectId, result) {
	  return {
	    type: EFFECT_RESOLVED,
	    effectId: effectId, result: result
	  };
	}

	function effectRejected(effectId, error) {
	  return {
	    type: EFFECT_REJECTED,
	    effectId: effectId, error: error
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NOT_ITERATOR_ERROR = undefined;
	exports.storeIO = storeIO;
	exports.runSaga = runSaga;

	var _utils = __webpack_require__(1);

	var _proc = __webpack_require__(2);

	var _proc2 = _interopRequireDefault(_proc);

	var _emitter = __webpack_require__(3);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NOT_ITERATOR_ERROR = exports.NOT_ITERATOR_ERROR = "runSaga must be called on an iterator";

	/**
	  memoize the result of storeChannel. It avoids monkey patching the same store
	  multiple times unnecessarly. We need only one channel per store
	**/
	var IO = Symbol('IO');
	function storeIO(store) {

	  if (store[IO]) return store[IO];

	  var storeEmitter = (0, _emitter2.default)();
	  var _dispatch = store.dispatch;
	  store.dispatch = function (action) {
	    var result = _dispatch(action);
	    storeEmitter.emit(action);
	    return result;
	  };

	  store[IO] = {
	    subscribe: storeEmitter.subscribe,
	    dispatch: store.dispatch
	  };

	  return store[IO];
	}

	function runSaga(iterator, _ref) {
	  var subscribe = _ref.subscribe;
	  var dispatch = _ref.dispatch;
	  var monitor = arguments.length <= 2 || arguments[2] === undefined ? _utils.noop : arguments[2];

	  (0, _utils.check)(iterator, _utils.is.iterator, NOT_ITERATOR_ERROR);

	  return (0, _proc2.default)(iterator, subscribe, dispatch, monitor);
	}

/***/ }
/******/ ])
});
;