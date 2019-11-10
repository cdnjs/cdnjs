(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["RxPlayer"] = factory();
	else
		root["RxPlayer"] = factory();
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

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	module.exports = __webpack_require__(33);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var objectProto = Object.prototype;
	var toString = objectProto.toString;
	var ownProperty = objectProto.hasOwnProperty;
	var isArray = Array.isArray;
	var push = Array.prototype.push;

	var keys = Object.keys || function (obj) {
	  var k = [];
	  for (var attr in obj) {
	    if (obj.hasOwnProperty(attr)) {
	      k.push(obj[attr]);
	    }
	  }
	  return k;
	};

	function indexOf(arr, value) {
	  var i = -1;
	  var l = arr ? arr.length : 0;
	  while (++i < l) {
	    if (arr[i] === value) return i;
	  }
	  return -1;
	}

	function groupBy(arr, prop) {
	  var fn;
	  if (isFunction(prop)) fn = prop;else fn = function (v) {
	    return v[prop];
	  };

	  return reduce(arr, function (result, val) {
	    var key = fn(val);
	    (isArray(result[key]) ? result[key] : result[key] = []).push(val);
	    return result;
	  }, {});
	}

	function sortedIndex(arr, value, fn) {
	  var low = 0;
	  var high = arr ? arr.length : low;

	  value = fn(value);

	  while (low < high) {
	    var mid = low + high >>> 1;
	    if (fn(arr[mid]) < value) {
	      low = mid + 1;
	    } else {
	      high = mid;
	    }
	  }
	  return low;
	}

	function find(arr, fn) {
	  var i = -1;
	  var l = arr ? arr.length : 0;
	  while (++i < l) {
	    if (fn(arr[i], i)) return arr[i];
	  }
	}

	function between(arr, f, v) {
	  var i = -1;
	  var l = arr ? arr.length : 0;
	  while (++i < l) {
	    if (arr[i][f] <= v && arr[i + 1] && v < arr[i + 1][f]) return arr[i];
	  }
	}

	function findLast(arr, fn) {
	  var i = arr ? arr.length : 0;
	  while (--i >= 0) {
	    if (fn(arr[i], i)) return arr[i];
	  }
	}

	function baseFlatten(arr, fromIndex) {
	  var i = (fromIndex || 0) - 1;
	  var l = arr ? arr.length : 0;
	  var n = [];
	  while (++i < l) {
	    var value = arr[i];
	    if (value && typeof value == "object" && typeof value.length == "number") {
	      var valIndex = -1,
	          valLength = value.length,
	          resIndex = n.length;

	      n.length += valLength;
	      while (++valIndex < valLength) {
	        n[resIndex++] = value[valIndex];
	      }
	    } else {
	      n.push(value);
	    }
	  }
	  return n;
	}

	function flatten(arr, fn) {
	  return baseFlatten(fn ? map(arr, fn) : arr, 0);
	}

	function isDate(value) {
	  return !!value && typeof value == "object" && toString.call(value) == "[object Date]" || false;
	}

	function isFunction(value) {
	  return !!value && typeof value == "function" || false;
	}

	function isNumber(value) {
	  return typeof value == "number";
	}

	function isObject(value) {
	  return !!value && typeof value == "object" || false;
	}

	function isString(value) {
	  return typeof value == "string";
	}

	function isPromise(value) {
	  return !!value && typeof value.then == "function";
	}

	function isObservable(value) {
	  return !!value && typeof value.subscribe == "function";
	}

	function identity(x) {
	  return x;
	}

	function noop() {
	  return;
	}

	function last(arr) {
	  return arr[arr.length - 1];
	}

	var uniqueId = (function () {
	  var __id = 0;
	  return function (prefix) {
	    if (!prefix) prefix = "";
	    return "" + prefix + __id++;
	  };
	})();

	function contains(arr, value) {
	  return indexOf(arr, value) > -1;
	}

	function extend(dst) {
	  var args = arguments;
	  for (var i = 1; i < args.length; i++) {
	    var src = args[i];
	    if (!isObject(src)) continue;

	    var ks = keys(src);
	    for (var j = 0, l = ks.length; j < l; j++) {
	      dst[ks[j]] = src[ks[j]];
	    }
	  }
	  return dst;
	}

	function defaults(obj, def) {
	  for (var attr in def) {
	    if (typeof obj[attr] == "undefined") {
	      obj[attr] = def[attr];
	    }
	  }
	  return obj;
	}

	function cloneObject(obj) {
	  return extend({}, obj);
	}

	function cloneArray(arr) {
	  var l = arr ? arr.length : 0;
	  var i = -1;
	  var n = Array(l);
	  while (++i < l) n[i] = arr[i];
	  return n;
	}

	function map(arr, fn) {
	  var l = arr ? arr.length : 0;
	  var i = -1;
	  var n = Array(l);
	  while (++i < l) n[i] = fn(arr[i], i);
	  return n;
	}

	function reduce(arr, fn, init) {
	  var l = arr ? arr.length : 0;
	  var i = -1;
	  var n = init;
	  while (++i < l) n = fn(n, arr[i], i);
	  return n;
	}

	function each(arr, fn) {
	  var l = arr ? arr.length : 0;
	  var i = -1;
	  while (++i < l) fn(arr[i], i);
	}

	function values(object) {
	  var props = keys(object);
	  var i = -1;
	  var l = props.length;
	  var n = Array(l);
	  while (++i < l) n[i] = object[props[i]];
	  return n;
	}

	function filter(arr, fn) {
	  var l = arr ? arr.length : 0;
	  var i = -1;
	  var n = [];
	  while (++i < l) {
	    if (fn(arr[i], i)) n.push(arr[i]);
	  }
	  return n;
	}

	function compact(arr) {
	  return filter(arr, function (i) {
	    return i != null;
	  });
	}

	function memoize(fn, resolver) {
	  var memoized = function memoized() {
	    var cache = memoized.cache;
	    var key = resolver ? resolver.apply(this, arguments) : arguments[0];
	    return ownProperty.call(cache, key) ? cache[key] : cache[key] = fn.apply(this, arguments);
	  };
	  memoized.cache = {};
	  return memoized;
	}

	function pick(object, vals) {
	  return reduce(vals, function (result, key) {
	    if (key in object) result[key] = object[key];
	    return result;
	  }, {});
	}

	function pluck(arr, key) {
	  return map(arr, function (o) {
	    return o[key];
	  });
	}

	function tryCatch(fn) {
	  try {
	    return fn();
	  } catch (e) {
	    return e;
	  }
	}

	function simpleMerge(source, dist) {
	  for (var attr in source) {
	    if (!dist.hasOwnProperty(attr)) continue;
	    var src = source[attr];
	    var dst = dist[attr];
	    if (isString(src) || isNumber(src) || isDate(src)) {
	      source[attr] = dst;
	    } else if (isArray(src)) {
	      src.length = 0;
	      push.apply(src, dst);
	    } else {
	      source[attr] = simpleMerge(src, dst);
	    }
	  }
	  return source;
	}

	function chunk(arr, size) {
	  var r = [];
	  var c = 0;
	  var i = -1;
	  var l = arr ? arr.length : 0;
	  while (++i < l) {
	    if (!r[c]) {
	      r[c] = [arr[i]];
	    } else {
	      if (r[c].length === size) {
	        r[++c] = [arr[i]];
	      } else {
	        r[c].push(arr[i]);
	      }
	    }
	  }
	  return r;
	}

	function pad(n, l) {
	  n = n.toString();
	  if (n.length >= l) {
	    return n;
	  }
	  var arr = new Array(l + 1).join("0") + n;
	  return arr.slice(-l);
	}

	module.exports = {
	  chunk: chunk,
	  compact: compact,
	  contains: contains,
	  cloneArray: cloneArray,
	  cloneObject: cloneObject,
	  defaults: defaults,
	  each: each,
	  extend: extend,
	  values: values,
	  filter: filter,
	  find: find,
	  between: between,
	  findLast: findLast,
	  flatten: flatten,
	  groupBy: groupBy,
	  identity: identity,
	  indexOf: indexOf,
	  isArray: isArray,
	  isDate: isDate,
	  isFunction: isFunction,
	  isNumber: isNumber,
	  isObject: isObject,
	  isString: isString,
	  isPromise: isPromise,
	  isObservable: isObservable,
	  keys: keys,
	  last: last,
	  map: map,
	  memoize: memoize,
	  noop: noop,
	  pad: pad,
	  pick: pick,
	  pluck: pluck,
	  reduce: reduce,
	  simpleMerge: simpleMerge,
	  sortedIndex: sortedIndex,
	  tryCatch: tryCatch,
	  uniqueId: uniqueId
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function AssertionError(message) {
	  this.name = "AssertionError";
	  this.message = message;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, AssertionError);
	  }
	}
	AssertionError.prototype = new Error();

	function assert(value, message) {
	  if (!value) throw new AssertionError(message);
	}

	assert.equal = function (a, b, message) {
	  return assert(a === b, message);
	};

	assert.iface = function (o, name, iface) {
	  assert(o, "" + name + " should be an object");
	  for (var k in iface) assert.equal(typeof o[k], iface[k], "" + name + " should have property " + k + " as a " + iface[k]);
	};

	module.exports = assert;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(5);
	module.exports = __webpack_require__(20);

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var Levels = {
	  NONE: 0,
	  ERROR: 1,
	  WARNING: 2,
	  INFO: 3,
	  DEBUG: 4
	};
	var noop = function noop() {};

	function log() {}
	log.error = noop;
	log.warn = noop;
	log.info = noop;
	log.debug = noop;
	log.setLevel = function (level) {
	  if (typeof level == "string") {
	    level = Levels[level];
	  }

	  log.error = level >= Levels.ERROR ? console.error.bind(console) : noop;
	  log.warn = level >= Levels.WARNING ? console.warn.bind(console) : noop;
	  log.info = level >= Levels.INFO ? console.info.bind(console) : noop;
	  log.debug = level >= Levels.DEBUG ? console.log.bind(console) : noop;
	};

	module.exports = log;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Promise_ = __webpack_require__(19).Promise;

	var _require = __webpack_require__(20);

	var Observable = _require.Observable;
	var SingleAssignmentDisposable = _require.SingleAssignmentDisposable;
	var config = _require.config;
	var fromEvent = Observable.fromEvent;
	var merge = Observable.merge;
	var timer = Observable.timer;

	var _require2 = __webpack_require__(21);

	var getBackedoffDelay = _require2.getBackedoffDelay;

	var _require3 = __webpack_require__(1);

	var identity = _require3.identity;
	var isArray = _require3.isArray;
	var map = _require3.map;
	var noop = _require3.noop;

	var debounce = __webpack_require__(22);

	config.useNativeEvents = true;
	config.Promise = Promise_;

	var observableProto = Observable.prototype;

	if (true) {
	  observableProto.log = function (ns, fn) {
	    if (!ns) ns = "";
	    return this["do"](function (x) {
	      return console.log(ns, "next", (fn || identity)(x));
	    }, function (e) {
	      return console.log(ns, "error", e);
	    }, function () {
	      return console.log(ns, "completed");
	    });
	  };
	} else {
	  observableProto.log = function () {
	    return this;
	  };
	}

	observableProto.each = function (onNext) {
	  return this.subscribe(onNext, noop);
	};

	var simpleEquals = function simpleEquals(a, b) {
	  return a === b;
	};
	observableProto.changes = function (keySelector) {
	  return this.distinctUntilChanged(keySelector, simpleEquals);
	};

	observableProto.customDebounce = function (time, debounceOptions) {
	  var source = this;
	  return Observable.create(function (observer) {
	    var debounced = debounce(function (val) {
	      return observer.onNext(val);
	    }, time, debounceOptions);
	    var subscribe = source.subscribe(debounced, function (e) {
	      return observer.onError(e);
	    }, function () {
	      return observer.onCompleted();
	    });
	    return function () {
	      debounced.dispose();
	      subscribe.dispose();
	    };
	  });
	};

	observableProto.simpleTimeout = function (time) {
	  var errMessage = arguments[1] === undefined ? "timeout" : arguments[1];

	  var source = this;
	  return Observable.create(function (observer) {
	    var sad = new SingleAssignmentDisposable();
	    var timer = setTimeout(function () {
	      return observer.onError(new Error(errMessage));
	    }, time);

	    sad.setDisposable(source.subscribe(function (x) {
	      clearTimeout(timer);
	      observer.onNext(x);
	    }, function (e) {
	      return observer.onError(e);
	    }, function (_) {
	      return observer.onCompleted();
	    }));

	    return function () {
	      clearTimeout(timer);
	      sad.dispose();
	    };
	  });
	};

	function retryWithBackoff(fn, _ref) {
	  var retryDelay = _ref.retryDelay;
	  var totalRetry = _ref.totalRetry;
	  var shouldRetry = _ref.shouldRetry;
	  var resetDelay = _ref.resetDelay;

	  var retryCount = 0;
	  var debounceRetryCount;
	  if (resetDelay > 0) {
	    debounceRetryCount = debounce(function () {
	      return retryCount = 0;
	    }, resetDelay);
	  } else {
	    debounceRetryCount = noop;
	  }

	  return function doRetry() {
	    // do not leak arguments
	    for (var i = 0, l = arguments.length, args = Array(l); i < l; i++) args[i] = arguments[i];

	    return fn.apply(null, args)["catch"](function (err) {
	      var wantRetry = !shouldRetry || shouldRetry(err, retryCount);
	      if (!wantRetry || retryCount++ >= totalRetry) {
	        throw err;
	      }

	      var fuzzedDelay = getBackedoffDelay(retryDelay, retryCount);
	      return timer(fuzzedDelay).flatMap(function () {
	        debounceRetryCount();
	        return doRetry.apply(null, args);
	      });
	    });
	  };
	}

	observableProto.flatMapMaxConcurrent = function (selector, maxConcurrent) {
	  var source = this;
	  return Observable.create(function (observer) {
	    var max = 0;
	    var active = [];
	    var queue = [];

	    function launchQueuedSources(m) {
	      var activeCount = active.length;
	      if (activeCount < m) {
	        var newSources = queue.splice(0, m - activeCount);
	        for (var i = 0; i < newSources.length; i++) handleNewSource(newSources[i]);
	      }
	    }

	    function onNewMax(oldMax, newMax) {
	      if (newMax > oldMax) launchQueuedSources(newMax);
	    }

	    function handleNewSource(src) {
	      var sad = new SingleAssignmentDisposable();
	      active.push(sad);
	      sad.setDisposable(src.subscribe(function (val) {
	        return observer.onNext(val);
	      }, function (err) {
	        return observer.onError(err);
	      }, function () {
	        return handleCompletion(sad);
	      }));
	    }

	    function handleCompletion(subscription) {
	      var index = active.indexOf(subscription);
	      if (index >= 0) active.splice(index, 1);

	      launchQueuedSources(max);
	    }

	    var maxSub = maxConcurrent.subscribe(function (newMax) {
	      var oldMax = max;
	      max = newMax;
	      onNewMax(oldMax, newMax);
	    }, function (err) {
	      return observer.onError(err);
	    });

	    var srcSub = source.subscribe(function (src) {
	      try {
	        src = selector(src);
	      } catch (e) {
	        return observer.onError(e);
	      }
	      queue.push(src);
	      launchQueuedSources(max);
	    }, function (err) {
	      return observer.onError(err);
	    }, function () {
	      return observer.onCompleted();
	    });

	    return function () {
	      maxSub.dispose();
	      srcSub.dispose();
	      queue.length = 0;
	      for (var i = 0; i < active.length; i++) active[i].dispose();
	      active.length = 0;
	    };
	  });
	};

	module.exports = {
	  on: function on(elt, evts) {
	    if (isArray(evts)) {
	      return merge(map(evts, function (evt) {
	        return fromEvent(elt, evt);
	      }));
	    } else {
	      return fromEvent(elt, evts);
	    }
	  },
	  first: function first(obs) {
	    return obs.take(1);
	  },
	  only: function only(x) {
	    return Observable.never().startWith(x);
	  },
	  retryWithBackoff: retryWithBackoff
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var assert = __webpack_require__(2);

	var EPSILON = 0.00001;

	function nearlyEqual(a, b) {
	  return Math.abs(a - b) < EPSILON;
	}

	function nearlyLt(a, b) {
	  return a - b <= EPSILON;
	}

	/**
	 * Returns the { start, end } buffered range
	 * associated to the given timestamp.
	 */
	function getRange(ts, ranges) {
	  var start,
	      end,
	      i = ranges.length;
	  start = Infinity;end = -Infinity;
	  while (--i >= 0 && ts < start) {
	    start = ranges.start(i);
	    end = ranges.end(i);
	  }
	  return ts >= start ? { start: start, end: end } : null;
	}

	function getNextRangeGap(ts, ranges) {
	  var i = -1,
	      nextRangeStart;
	  while (++i < ranges.length) {
	    var start = ranges.start(i);
	    if (start > ts) {
	      nextRangeStart = start;
	      break;
	    }
	  }

	  if (nextRangeStart != null) return nextRangeStart - ts;else return Infinity;
	}

	function isRanges(ranges) {
	  return !!ranges && typeof ranges.length === "number";
	}

	/**
	 * Returns the time-gap between the buffered
	 * end limit and the given timestamp
	 */
	function getGap(ts, ranges) {
	  var range = isRanges(ranges) ? getRange(ts, ranges) : ranges;
	  return range ? range.end - ts : Infinity;
	}

	/**
	 * Return the time gap between the current time
	 * and the start of current range.
	 */
	function getLoaded(ts, ranges) {
	  var range = isRanges(ranges) ? getRange(ts, ranges) : ranges;
	  return range ? ts - range.start : 0;
	}

	/**
	 * Returns the total size of the current range.
	 */
	function getSize(ts, ranges) {
	  var range = isRanges(ranges) ? getRange(ts, ranges) : ranges;
	  return range ? range.end - range.start : 0;
	}

	function bufferedToArray(ranges) {
	  if (ranges instanceof BufferedRanges) return _.cloneArray(ranges.ranges);

	  var i = -1,
	      l = ranges.length;
	  var a = Array(l);
	  while (++i < l) {
	    a[i] = { start: ranges.start(i), end: ranges.end(i) };
	  }
	  return a;
	}

	function isPointInRange(r, point) {
	  return r.start <= point && point < r.end;
	}

	function findOverlappingRange(range, others) {
	  for (var i = 0; i < others.length; i++) {
	    if (areOverlappingRanges(range, others[i])) return others[i];
	  }
	  return null;
	}

	function areOverlappingRanges(r1, r2) {
	  return isPointInRange(r1, r2.start) || isPointInRange(r1, r2.end) || isPointInRange(r2, r1.start);
	}

	function isContainedInto(r1, r2) {
	  return isPointInRange(r1, r2.start) && isPointInRange(r1, r2.end);
	}

	function areContiguousWithRanges(r1, r2) {
	  return nearlyEqual(r2.start, r1.end) || nearlyEqual(r2.end, r1.start);
	}

	function unionWithOverlappingOrContiguousRange(r1, r2, bitrate) {
	  var start = Math.min(r1.start, r2.start);
	  var end = Math.max(r1.end, r2.end);
	  return { start: start, end: end, bitrate: bitrate };
	}

	function isOrdered(r1, r2) {
	  return r1.end <= r2.start;
	}

	function sameBitrate(r1, r2) {
	  return r1.bitrate === r2.bitrate;
	}

	function removeEmptyRanges(ranges) {
	  for (var index = 0; index < ranges.length; index++) {
	    var range = ranges[index];
	    if (range.start === range.end) ranges.splice(index++, 1);
	  }
	  return ranges;
	}

	function mergeContiguousRanges(ranges) {
	  for (var index = 1; index < ranges.length; index++) {
	    var prevRange = ranges[index - 1];
	    var currRange = ranges[index];
	    if (sameBitrate(prevRange, currRange) && areContiguousWithRanges(prevRange, currRange)) {
	      var unionRange = unionWithOverlappingOrContiguousRange(prevRange, currRange, currRange.bitrate);
	      ranges.splice(--index, 2, unionRange);
	    }
	  }
	  return ranges;
	}

	function insertInto(ranges, bitrate, start, end) {
	  assert(start <= end);
	  if (start == end) return;

	  var addedRange = { start: start, end: end, bitrate: bitrate };

	  // For each present range check if we need to:
	  // - In case we are overlapping or contiguous:
	  //   - if added range has the same bitrate as the overlapped or
	  //     contiguous one, we can merge them
	  //   - if added range has a different bitrate we need to insert it
	  //     in place
	  // - Need to insert in place, we we are completely, not overlapping
	  //   and not contiguous in between two ranges.

	  for (var index = 0; index < ranges.length; index++) {
	    var currentRange = ranges[index];

	    var overlapping = areOverlappingRanges(addedRange, currentRange);
	    var contiguous = areContiguousWithRanges(addedRange, currentRange);

	    // We assume ranges are ordered and two ranges can not be
	    // completely overlapping.
	    if (overlapping || contiguous) {
	      // We need to merge the addedRange and that range.
	      if (sameBitrate(addedRange, currentRange)) {
	        addedRange = unionWithOverlappingOrContiguousRange(addedRange, currentRange, currentRange.bitrate);
	        ranges.splice(index--, 1);
	      }
	      // Overlapping ranges with different bitrates.
	      else if (overlapping) {
	        // Added range is contained in on existing range
	        if (isContainedInto(currentRange, addedRange)) {
	          ranges.splice(++index, 0, addedRange);
	          var memCurrentEnd = currentRange.end;
	          currentRange.end = addedRange.start;
	          addedRange = {
	            start: addedRange.end,
	            end: memCurrentEnd,
	            bitrate: currentRange.bitrate
	          };
	        }
	        // Added range contains one existing range
	        else if (isContainedInto(addedRange, currentRange)) {
	          ranges.splice(index--, 1);
	        } else if (currentRange.start < addedRange.start) {
	          currentRange.end = addedRange.start;
	        } else {
	          currentRange.start = addedRange.end;
	          break;
	        }
	      }
	      // Contiguous ranges with different bitrates.
	      else {
	        // do nothing
	        break;
	      }
	    } else {
	      // Check the case for which there is no more to do
	      if (index === 0) {
	        if (isOrdered(addedRange, ranges[0])) {
	          // First index, and we are completely before that range (and
	          // not contiguous, nor overlapping). We just need to be
	          // inserted here.
	          break;
	        }
	      } else {
	        if (isOrdered(ranges[index - 1], addedRange) && isOrdered(addedRange, currentRange)) {
	          // We are exactly after the current previous range, and
	          // before the current range, while not overlapping with none
	          // of them. Insert here.
	          break;
	        }
	      }
	    }
	  }

	  // Now that we are sure we don't overlap with any range, just add it.
	  ranges.splice(index, 0, addedRange);

	  return mergeContiguousRanges(removeEmptyRanges(ranges));
	}

	function _intersect(ranges, others) {
	  for (var i = 0; i < ranges.length; i++) {
	    var range = ranges[i];
	    var overlappingRange = findOverlappingRange(range, others);
	    if (!overlappingRange) {
	      ranges.splice(i--, 1);
	      continue;
	    }
	    if (overlappingRange.start > range.start) {
	      range.start = overlappingRange.start;
	    }
	    if (overlappingRange.end < range.end) {
	      range.end = overlappingRange.end;
	    }
	  }
	  return ranges;
	}

	function BufferedRanges() {
	  this.ranges = [];
	  this.length = 0;
	}

	BufferedRanges.prototype = {
	  start: function start(i) {
	    return this.ranges[i].start;
	  },

	  end: function end(i) {
	    return this.ranges[i].end;
	  },

	  hasRange: function hasRange(startTime, duration) {
	    var endTime = startTime + duration;

	    for (var i = 0; i < this.ranges.length; i++) {
	      var _ranges$i = this.ranges[i];
	      var start = _ranges$i.start;
	      var end = _ranges$i.end;

	      if (nearlyLt(start, startTime) && nearlyLt(startTime, end) && (nearlyLt(start, endTime) && nearlyLt(endTime, end))) return this.ranges[i];
	    }

	    return null;
	  },

	  getRange: function getRange(time) {
	    for (var i = 0; i < this.ranges.length; i++) {
	      if (isPointInRange(this.ranges[i], time)) return this.ranges[i];
	    }
	    return null;
	  },

	  insert: function insert(bitrate, start, end) {
	    if (true) {
	      assert(start >= 0);
	      assert(end - start > 0);
	    }
	    insertInto(this.ranges, bitrate, start, end);
	    this.length = this.ranges.length;
	    return this.ranges;
	  },

	  intersect: function intersect(others) {
	    _intersect(this.ranges, others);
	    this.length = this.ranges.length;
	    return this.ranges;
	  }
	};

	module.exports = {
	  getRange: getRange,
	  getGap: getGap,
	  getNextRangeGap: getNextRangeGap,
	  getLoaded: getLoaded,
	  getSize: getSize,
	  bufferedToArray: bufferedToArray,
	  BufferedRanges: BufferedRanges
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var log = __webpack_require__(4);
	var Promise_ = __webpack_require__(8);
	var EventEmitter = __webpack_require__(10);

	var _require = __webpack_require__(9);

	var bytesToStr = _require.bytesToStr;
	var strToBytes = _require.strToBytes;

	var assert = __webpack_require__(2);

	var _require2 = __webpack_require__(3);

	var Observable = _require2.Observable;
	var merge = Observable.merge;
	var never = Observable.never;
	var fromEvent = Observable.fromEvent;
	var just = Observable.just;

	var _require3 = __webpack_require__(5);

	var on = _require3.on;

	var doc = document;
	var win = window;

	var PREFIXES = ["", "webkit", "moz", "ms"];

	var HTMLElement_ = win.HTMLElement;
	var HTMLVideoElement_ = win.HTMLVideoElement;

	var MediaSource_ = win.MediaSource || win.MozMediaSource || win.WebKitMediaSource || win.MSMediaSource;

	var MediaKeys_ = win.MediaKeys || win.MozMediaKeys || win.WebKitMediaKeys || win.MSMediaKeys;

	var isIE = navigator.appName == "Microsoft Internet Explorer" || navigator.appName == "Netscape" && /Trident\//.test(navigator.userAgent);

	var MockMediaKeys = _.noop;

	var requestMediaKeySystemAccess;
	if (navigator.requestMediaKeySystemAccess) requestMediaKeySystemAccess = function (a, b) {
	  return navigator.requestMediaKeySystemAccess(a, b);
	};

	function castToPromise(prom) {
	  if (prom && typeof prom.then == "function") {
	    return prom;
	  } else {
	    return Promise_.resolve(prom);
	  }
	}

	function wrap(fn) {
	  return function () {
	    var retValue;
	    try {
	      retValue = fn.apply(this, arguments);
	    } catch (error) {
	      return Promise_.reject(error);
	    }
	    return castToPromise(retValue);
	  };
	}

	// Wrap "MediaKeys.prototype.update" form an event based system to a
	// Promise based function.
	function wrapUpdateWithPromise(memUpdate, sessionObj) {

	  function KeySessionError() {
	    var err = arguments[0] === undefined ? {} : arguments[0];

	    if (err.errorCode) {
	      err = {
	        systemCode: err.systemCode,
	        code: err.errorCode.code
	      };
	    }
	    this.name = "KeySessionError";
	    this.mediaKeyError = err;
	    this.message = "MediaKeyError code:" + err.code + " and systemCode:" + err.systemCode;
	  }
	  KeySessionError.prototype = new Error();

	  return function (license, sessionId) {
	    var session = _.isFunction(sessionObj) ? sessionObj.call(this) : this;

	    var keys = onKeyAdded(session);
	    var errs = onKeyError(session).map(function (evt) {
	      throw new KeySessionError(session.error || evt);
	    });
	    try {
	      memUpdate.call(this, license, sessionId);
	      return merge(keys, errs).take(1).toPromise();
	    } catch (e) {
	      return Promise_.reject(e);
	    }
	  };
	}

	function isEventSupported(element, eventNameSuffix) {
	  var clone = document.createElement(element.tagName);
	  var eventName = "on" + eventNameSuffix;
	  if (eventName in clone) {
	    return true;
	  } else {
	    clone.setAttribute(eventName, "return;");
	    return _.isFunction(clone[eventName]);
	  }
	}

	function eventPrefixed(eventNames, prefixes) {
	  return _.flatten(eventNames, function (name) {
	    return _.map(prefixes || PREFIXES, function (p) {
	      return p + name;
	    });
	  });
	}

	function findSupportedEvent(element, eventNames) {
	  return _.find(eventNames, function (name) {
	    return isEventSupported(element, name);
	  });
	}

	function compatibleListener(eventNames, prefixes) {
	  var mem;
	  eventNames = eventPrefixed(eventNames, prefixes);
	  return function (element) {
	    // if the element is a HTMLElement we can detect
	    // the supported event, and memoize it in `mem`
	    if (element instanceof HTMLElement_) {
	      if (!mem) {
	        mem = findSupportedEvent(element, eventNames);
	      }

	      if (mem) {
	        return fromEvent(element, mem);
	      } else {
	        if (true) {
	          log.warn("compat: element <" + element.tagName + "> does not support any of these events: " + eventNames.join(", "));
	        }
	        return never();
	      }
	    }

	    // otherwise, we need to listen to all the events
	    // and merge them into one observable sequence
	    return on(element, eventNames);
	  };
	}

	function isCodecSupported(codec) {
	  return !!MediaSource_ && MediaSource_.isTypeSupported(codec);
	}

	// On IE11, we use the "progress" instead of "loadedmetadata" to set
	// the "currentTime.
	//
	// Internet Explorer emits an error when setting the "currentTime"
	// before a "progress" event sent just after the "loadedmetadata"
	// after receiving the first init-segments. Other browsers do not
	// even send this "progress" before receiving the first data-segment.
	//
	// TODO(pierre): try to find a solution without "browser sniffing"...
	var loadedMetadataEvent = compatibleListener(isIE ? ["progress"] : ["loadedmetadata"]);
	var sourceOpenEvent = compatibleListener(["sourceopen", "webkitsourceopen"]);
	var onEncrypted = compatibleListener(["encrypted", "needkey"]);
	var onKeyMessage = compatibleListener(["keymessage", "message"]);
	var onKeyAdded = compatibleListener(["keyadded", "ready"]);
	var onKeyError = compatibleListener(["keyerror", "error"]);
	var onKeyStatusesChange = compatibleListener(["keystatuseschange"]);
	var emeEvents = {
	  onEncrypted: onEncrypted,
	  onKeyMessage: onKeyMessage,
	  onKeyStatusesChange: onKeyStatusesChange,
	  onKeyError: onKeyError
	};

	function sourceOpen(mediaSource) {
	  if (mediaSource.readyState == "open") return just();else return sourceOpenEvent(mediaSource).take(1);
	}

	// Browser without any MediaKeys object: A mock for MediaKey and
	// MediaKeySession are created, and the <video>.addKey api is used to
	// pass the license.
	// This is for Chrome with unprefixed EME api
	if (!requestMediaKeySystemAccess && HTMLVideoElement_.prototype.webkitGenerateKeyRequest) {

	  // Mock MediaKeySession interface for old chrome implementation
	  // of the EME specifications
	  var MockMediaKeySession = function MockMediaKeySession(video, keySystem) {
	    var _this = this;

	    EventEmitter.call(this);

	    this._vid = video;
	    this._key = keySystem;
	    this._con = merge(onKeyMessage(video), onKeyAdded(video), onKeyError(video)).subscribe(function (evt) {
	      return _this.trigger(evt.type, evt);
	    });
	  };
	  MockMediaKeySession.prototype = _.extend({}, EventEmitter.prototype, {
	    generateRequest: wrap(function (initDataType, initData) {
	      this._vid.webkitGenerateKeyRequest(this._key, initData);
	    }),
	    update: wrapUpdateWithPromise(function (license, sessionId) {
	      if (this._key.indexOf("clearkey") >= 0) {
	        var json = JSON.parse(bytesToStr(license));
	        var key = strToBytes(atob(json.keys[0].k));
	        var kid = strToBytes(atob(json.keys[0].kid));
	        this._vid.webkitAddKey(this._key, key, kid, sessionId);
	      } else {
	        this._vid.webkitAddKey(this._key, license, null, sessionId);
	      }
	    }),
	    close: wrap(function () {
	      if (this._con) this._con.dispose();
	      this._con = null;
	      this._vid = null;
	    })
	  });

	  MockMediaKeys = function (keySystem) {
	    this.ks_ = keySystem;
	  };
	  MockMediaKeys.prototype = {
	    _setVideo: function _setVideo(vid) {
	      this._vid = vid;
	    },
	    createSession: function createSession(sessionType) {
	      return new MockMediaKeySession(this._vid, this.ks_);
	    }
	  };

	  var isTypeSupported = function isTypeSupported(keyType) {
	    // get any <video> element from the DOM or create one
	    // and try the `canPlayType` method
	    var video = doc.querySelector("video") || doc.createElement("video");
	    if (video && video.canPlayType) {
	      return !!video.canPlayType("video/mp4", keyType);
	    } else {
	      return false;
	    }
	  };

	  requestMediaKeySystemAccess = function (keyType) {
	    if (!isTypeSupported(keyType)) return Promise_.reject();

	    return Promise_.resolve({
	      createMediaKeys: function createMediaKeys() {
	        return Promise_.resolve(new MockMediaKeys(keyType));
	      }
	    });
	  };
	}

	// A MediaKeys object exist (or a mock) but no create function is
	// available. We need to add recent apis using Promises to mock the
	// most recent MediaKeys apis.
	// This is for IE11
	else if (MediaKeys_ && !requestMediaKeySystemAccess) {

	  var SessionProxy = function SessionProxy(mk) {
	    EventEmitter.call(this);
	    this._mk = mk;
	  };

	  SessionProxy.prototype = _.extend(EventEmitter.prototype, {
	    generateRequest: wrap(function (initDataType, initData) {
	      var _this2 = this;

	      this._ss = this._mk.memCreateSession("video/mp4", initData);
	      this._con = merge(onKeyMessage(this._ss), onKeyAdded(this._ss), onKeyError(this._ss)).subscribe(function (evt) {
	        return _this2.trigger(evt.type, evt);
	      });
	    }),
	    update: wrapUpdateWithPromise(function (license, sessionId) {
	      assert(this._ss);
	      this._ss.update(license, sessionId);
	    }, function () {
	      return this._ss;
	    }),
	    close: wrap(function () {
	      if (this._ss) {
	        this._ss.close();
	        this._ss = null;
	        this._con.dispose();
	        this._con = null;
	      }
	    })
	  });

	  // on IE11, each created session needs to be created on a new
	  // MediaKeys object
	  MediaKeys_.prototype.alwaysRenew = true;
	  MediaKeys_.prototype.memCreateSession = MediaKeys_.prototype.createSession;
	  MediaKeys_.prototype.createSession = function () {
	    return new SessionProxy(this);
	  };

	  requestMediaKeySystemAccess = function (keyType) {
	    if (!MediaKeys_.isTypeSupported(keyType)) return Promise_.reject();

	    return Promise_.resolve({
	      createMediaKeys: function createMediaKeys() {
	        return Promise_.resolve(new MediaKeys_(keyType));
	      }
	    });
	  };
	}

	if (!MediaKeys_) {
	  var noMediaKeys = function noMediaKeys() {
	    throw new Error("eme: MediaKeys is not available");
	  };

	  MediaKeys_ = {
	    create: noMediaKeys,
	    isTypeSupported: noMediaKeys
	  };
	}

	function _setMediaKeys(elt, mk) {
	  if (mk instanceof MockMediaKeys) return mk._setVideo(elt);
	  if (elt.setMediaKeys) return elt.setMediaKeys(mk);
	  if (elt.WebkitSetMediaKeys) return elt.WebkitSetMediaKeys(mk);
	  if (elt.mozSetMediaKeys) return elt.mozSetMediaKeys(mk);
	  if (elt.msSetMediaKeys) return elt.msSetMediaKeys(mk);
	  throw new Error("compat: cannot find setMediaKeys method");
	}

	var setMediaKeys = function setMediaKeys(elt, mk) {
	  return castToPromise(_setMediaKeys(elt, mk));
	};

	if (win.WebKitSourceBuffer && !win.WebKitSourceBuffer.prototype.addEventListener) {

	  var SourceBuffer = win.WebKitSourceBuffer;
	  var SBProto = SourceBuffer.prototype;

	  _.extend(SBProto, EventEmitter.prototype);
	  SBProto.__listeners = [];

	  SBProto.appendBuffer = function (data) {
	    if (this.updating) throw new Error("SourceBuffer updating");
	    this.trigger("updatestart");
	    this.updating = true;
	    try {
	      this.append(data);
	    } catch (err) {
	      this.__emitUpdate("error", err);
	      return;
	    }
	    this.__emitUpdate("update");
	  };

	  SBProto.__emitUpdate = function (eventName, val) {
	    var _this3 = this;

	    setTimeout(function () {
	      _this3.trigger(eventName, val);
	      _this3.updating = false;
	      _this3.trigger("updateend");
	    }, 0);
	  };
	}

	function requestFullscreen(elt) {
	  if (isFullscreen()) return;
	  if (elt.requestFullscreen) return elt.requestFullscreen();
	  if (elt.msRequestFullscreen) return elt.msRequestFullscreen();
	  if (elt.mozRequestFullScreen) return elt.mozRequestFullScreen();
	  if (elt.webkitRequestFullscreen) return elt.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	}

	function exitFullscreen() {
	  if (!isFullscreen()) return;
	  if (doc.exitFullscreen) return doc.exitFullscreen();
	  if (doc.msExitFullscreen) return doc.msExitFullscreen();
	  if (doc.mozCancelFullScreen) return doc.mozCancelFullScreen();
	  if (doc.webkitExitFullscreen) return doc.webkitExitFullscreen();
	}

	function isFullscreen() {
	  return !!(doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
	}

	function visibilityEvents() {
	  var prefix;
	  if (doc.hidden != null) prefix = "";else if (doc.mozHidden != null) prefix = "moz";else if (doc.msHidden != null) prefix = "ms";else if (doc.webkitHidden != null) prefix = "webkit";
	  return {
	    hidden: prefix ? prefix + "Hidden" : "hidden",
	    visibilityChange: prefix + "visibilitychange"
	  };
	}

	// On IE11, fullscreen change events is called MSFullscreenChange
	var onFullscreenChange = compatibleListener(["fullscreenchange", "FullscreenChange"], PREFIXES.concat("MS"));

	module.exports = {
	  isEventSupported: isEventSupported,

	  HTMLVideoElement_: HTMLVideoElement_,

	  MediaSource_: MediaSource_,
	  requestMediaKeySystemAccess: requestMediaKeySystemAccess,
	  sourceOpen: sourceOpen,
	  loadedMetadataEvent: loadedMetadataEvent,
	  isCodecSupported: isCodecSupported,
	  setMediaKeys: setMediaKeys,
	  emeEvents: emeEvents,

	  isFullscreen: isFullscreen,
	  onFullscreenChange: onFullscreenChange,
	  requestFullscreen: requestFullscreen,
	  exitFullscreen: exitFullscreen,
	  visibilityEvents: visibilityEvents
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(19).Promise;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var assert = __webpack_require__(2);

	function totalBytes(arr) {
	  var tot = 0;
	  for (var i = 0; i < arr.length; i++) {
	    tot += arr[i].byteLength;
	  }
	  return tot;
	}

	function strToBytes(str) {
	  var len = str.length;
	  var arr = new Uint8Array(len);
	  for (var i = 0; i < len; i++) {
	    arr[i] = str.charCodeAt(i) & 255;
	  }
	  return arr;
	}

	function bytesToStr(bytes) {
	  return String.fromCharCode.apply(null, bytes);
	}

	function bytesToUTF16Str(bytes) {
	  var str = "";
	  var len = bytes.length;
	  for (var i = 0; i < len; i += 2) str += String.fromCharCode(bytes[i]);
	  return str;
	}

	function hexToBytes(str) {
	  var len = str.length;
	  var arr = new Uint8Array(len / 2);
	  for (var i = 0, j = 0; i < len; i += 2, j++) {
	    arr[j] = parseInt(str.substr(i, 2), 16) & 255;
	  }
	  return arr;
	}

	function bytesToHex(bytes, sep) {
	  if (!sep) sep = "";
	  var hex = "";
	  for (var i = 0; i < bytes.byteLength; i++) {
	    hex += (bytes[i] >>> 4).toString(16);
	    hex += (bytes[i] & 15).toString(16);
	    if (sep.length) hex += sep;
	  }
	  return hex;
	}

	function concat() {
	  var l = arguments.length,
	      i = -1;
	  var len = 0,
	      arg;
	  while (++i < l) {
	    arg = arguments[i];
	    len += typeof arg === "number" ? arg : arg.length;
	  }
	  var arr = new Uint8Array(len);
	  var off = 0;
	  i = -1;
	  while (++i < l) {
	    arg = arguments[i];
	    if (typeof arg === "number") {
	      off += arg;
	    } else if (arg.length > 0) {
	      arr.set(arg, off);
	      off += arg.length;
	    }
	  }
	  return arr;
	}

	function be2toi(bytes, off) {
	  return (bytes[0 + off] << 8) + (bytes[1 + off] << 0);
	}

	function be4toi(bytes, off) {
	  return bytes[0 + off] * 16777216 + bytes[1 + off] * 65536 + bytes[2 + off] * 256 + bytes[3 + off];
	}

	function be8toi(bytes, off) {
	  return (bytes[0 + off] * 16777216 + bytes[1 + off] * 65536 + bytes[2 + off] * 256 + bytes[3 + off]) * 4294967296 + bytes[4 + off] * 16777216 + bytes[5 + off] * 65536 + bytes[6 + off] * 256 + bytes[7 + off];
	}

	function itobe2(num) {
	  return new Uint8Array([num >>> 8 & 255, num & 255]);
	}

	function itobe4(num) {
	  return new Uint8Array([num >>> 24 & 255, num >>> 16 & 255, num >>> 8 & 255, num & 255]);
	}

	function itobe8(num) {
	  var l = num % 4294967296;
	  var h = (num - l) / 4294967296;
	  return new Uint8Array([h >>> 24 & 255, h >>> 16 & 255, h >>> 8 & 255, h & 255, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, l & 255]);
	}

	function le2toi(bytes, off) {
	  return (bytes[0 + off] << 0) + (bytes[1 + off] << 8);
	}

	function le4toi(bytes, off) {
	  return bytes[0 + off] + bytes[1 + off] * 256 + bytes[2 + off] * 65536 + bytes[3 + off] * 16777216;
	}

	function le8toi(bytes, off) {
	  return bytes[0 + off] + bytes[1 + off] * 256 + bytes[2 + off] * 65536 + bytes[3 + off] * 16777216 + (bytes[4 + off] + bytes[5 + off] * 256 + bytes[6 + off] * 65536 + bytes[7 + off] * 16777216 * 4294967296);
	}

	function itole2(num) {
	  return new Uint8Array([num & 255, num >>> 8 & 255]);
	}

	function itole4(num) {
	  return new Uint8Array([num & 255, num >>> 8 & 255, num >>> 16 & 255, num >>> 24 & 255]);
	}

	function itole8(num) {
	  var l = num % 4294967296;
	  var h = (num - l) / 4294967296;
	  return new Uint8Array([h & 255, h >>> 8 & 255, h >>> 16 & 255, h >>> 24 & 255, l & 255, l >>> 8 & 255, l >>> 16 & 255, l >>> 24 & 255]);
	}

	function guidToUuid(uuid) {
	  assert.equal(uuid.length, 16, "UUID length should be 16");
	  var buf = strToBytes(uuid);

	  var p1A = buf[0];
	  var p1B = buf[1];
	  var p1C = buf[2];
	  var p1D = buf[3];
	  var p2A = buf[4];
	  var p2B = buf[5];
	  var p3A = buf[6];
	  var p3B = buf[7];
	  var p4 = buf.subarray(8, 10);
	  var p5 = buf.subarray(10, 16);

	  var ord = new Uint8Array(16);
	  ord[0] = p1D;ord[1] = p1C;ord[2] = p1B;ord[3] = p1A; // swap32 BE -> LE
	  ord[4] = p2B;ord[5] = p2A; // swap16 BE -> LE
	  ord[6] = p3B;ord[7] = p3A; // swap16 BE -> LE
	  ord.set(p4, 8);
	  ord.set(p5, 10);

	  return bytesToHex(ord);
	}

	function toBase64URL(str) {
	  return btoa(str).replace(/\=+$/, "");
	}

	module.exports = {
	  totalBytes: totalBytes,
	  strToBytes: strToBytes,
	  bytesToStr: bytesToStr, bytesToUTF16Str: bytesToUTF16Str,
	  hexToBytes: hexToBytes,
	  bytesToHex: bytesToHex,
	  concat: concat,
	  be2toi: be2toi, be4toi: be4toi, be8toi: be8toi,
	  le2toi: le2toi, le4toi: le4toi, le8toi: le8toi,
	  itobe2: itobe2, itobe4: itobe4, itobe8: itobe8,
	  itole2: itole2, itole4: itole4, itole8: itole8,
	  guidToUuid: guidToUuid,
	  toBase64URL: toBase64URL
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(1);
	var assert = __webpack_require__(2);

	function EventEmitter() {
	  this.__listeners = {};
	}

	EventEmitter.prototype.addEventListener = function (evt, fn) {
	  assert(typeof fn == "function", "eventemitter: second argument should be a function");
	  if (!this.__listeners[evt]) this.__listeners[evt] = [];
	  this.__listeners[evt].push(fn);
	};

	EventEmitter.prototype.removeEventListener = function (evt, fn) {
	  if (arguments.length === 0) {
	    this.__listeners = {};
	    return;
	  }
	  if (!this.__listeners.hasOwnProperty(evt)) return;
	  if (arguments.length === 1) {
	    delete this.__listeners[evt];
	    return;
	  }
	  var listeners = this.__listeners[evt];
	  var index = listeners.indexOf(fn);
	  if (~index) listeners.splice(index, 1);
	  if (!listeners.length) delete this.__listeners[evt];
	};

	EventEmitter.prototype.trigger = function (evt, arg) {
	  if (!this.__listeners.hasOwnProperty(evt)) return;
	  var listeners = this.__listeners[evt].slice();
	  _.each(listeners, function (listener) {
	    try {
	      listener(arg);
	    } catch (e) {
	      console.error(e, e.stack);
	    }
	  });
	};

	// aliases
	EventEmitter.prototype.on = EventEmitter.prototype.addEventListener;
	EventEmitter.prototype.off = EventEmitter.prototype.removeEventListener;

	module.exports = EventEmitter;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(1);

	var schemeRe = /:\/\//;
	var uniqSchemeRe = /:\//;
	var selfDirRe = /\/\.\//g;
	var prevDirRe = /\/\.\.\//;
	var rmPrevDirRe = /[^\/]*\/+\.\.\//;
	var slashesRe = /\/+/g;

	function _joinUrl(base, part) {
	  if (part.length === 0) return base;
	  if (schemeRe.test(part)) {
	    return part;
	  } else {
	    return base + "/" + part;
	  }
	}

	function _normalizeUrl(str) {
	  // remove ./ parts
	  if (selfDirRe.test(str)) str = str.replace(selfDirRe, "/");

	  // remove foo/../ parts
	  while (prevDirRe.test(str)) str = str.replace(rmPrevDirRe, "/");

	  // join multiple / except the scheme one
	  return str.replace(slashesRe, "/").replace(uniqSchemeRe, "://");
	}

	function resolveURL() {
	  var args = _.compact(arguments);
	  var len = args.length;
	  if (len === 0) return "";else return _normalizeUrl(_.reduce(args, _joinUrl, ""));
	}

	function parseBaseURL(url) {
	  var slash = url.lastIndexOf("/");
	  if (slash >= 0) {
	    return url.substring(0, slash + 1);
	  } else {
	    return url;
	  }
	}

	module.exports = { resolveURL: resolveURL, parseBaseURL: parseBaseURL };

/***/ },
/* 12 */
/***/ function(module, exports) {

	// shim for using process in browser

	'use strict';

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
	    while (len) {
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
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var log = __webpack_require__(4);
	var Promise_ = __webpack_require__(8);
	var assert = __webpack_require__(2);

	var _require = __webpack_require__(9);

	var bytesToHex = _require.bytesToHex;

	var _require2 = __webpack_require__(3);

	var Observable = _require2.Observable;
	var empty = Observable.empty;
	var fromEvent = Observable.fromEvent;
	var fromPromise = Observable.fromPromise;
	var merge = Observable.merge;
	var just = Observable.just;
	var throwError = Observable.throwError;

	var _require3 = __webpack_require__(7);

	var requestMediaKeySystemAccess = _require3.requestMediaKeySystemAccess;
	var setMediaKeys = _require3.setMediaKeys;
	var emeEvents = _require3.emeEvents;
	var onEncrypted = emeEvents.onEncrypted;
	var onKeyMessage = emeEvents.onKeyMessage;
	var onKeyError = emeEvents.onKeyError;
	var onKeyStatusesChange = emeEvents.onKeyStatusesChange;

	var SYSTEMS = {
	  "clearkey": ["webkit-org.w3.clearkey", "org.w3.clearkey"],
	  "widevine": ["com.widevine.alpha"],
	  "playready": ["com.youtube.playready", "com.microsoft.playready"]
	};

	// Key statuses to error mapping. Taken from shaka-player.
	var KEY_STATUS_ERRORS = {
	  "output-not-allowed": "eme: the required output protection is not available.",
	  "expired": "eme: a required key has expired and the content cannot be decrypted.",
	  "internal-error": "eme: an unknown error has occurred in the CDM."
	};

	var NotSupportedKeySystemError = function NotSupportedKeySystemError() {
	  return new Error("eme: could not find a compatible key system");
	};

	// Persisted singleton instance of MediaKeys.
	// We do not allow multiple CDM instances.
	var $mediaKeys;
	var $keySystem;

	var $sessionsStore = (function () {
	  var sessions = {};
	  return {
	    get: function get(initData) {
	      return sessions[bytesToHex(initData)];
	    },
	    set: function set(initData, session) {
	      sessions[bytesToHex(initData)] = session;
	    },
	    remove: function remove(initData) {
	      return delete sessions[bytesToHex(initData)];
	    },
	    dispose: function dispose() {
	      sessions = {};
	    }
	  };
	})();

	var cachedKeySystemAccess = {
	  createMediaKeys: function createMediaKeys() {
	    return Promise_.resolve($mediaKeys);
	  }
	};

	function findCompatibleKeySystem(keySystems) {
	  // in case we already have mounted a CDM with MediaKeys the
	  //
	  // NOTE(pierre): alwaysRenew flag is used for IE11 which require the
	  // creation of a new MediaKeys instance for each session creation
	  if ($keySystem && $mediaKeys && !$mediaKeys.alwaysRenew) {
	    var foundKeySystem = _.find(keySystems, function (_ref) {
	      var type = _ref.type;
	      return type == $keySystem;
	    });
	    if (foundKeySystem) {
	      return Promise_.resolve({
	        keySystem: foundKeySystem,
	        keySystemAccess: cachedKeySystemAccess
	      });
	    } else {
	      throw NotSupportedKeySystemError();
	    }
	  }

	  var keySystemConfigurations = [{ initDataTypes: ["cenc"] }];

	  var keySystemsType = _.flatten(keySystems, function (keySystem) {
	    return _.map(SYSTEMS[keySystem.type], function (keyType) {
	      return { keyType: keyType, keySystem: keySystem };
	    });
	  });

	  function testKeySystem(index, res, rej) {
	    if (index >= keySystemsType.length) return rej(NotSupportedKeySystemError());

	    var _keySystemsType$index = keySystemsType[index];
	    var keyType = _keySystemsType$index.keyType;
	    var keySystem = _keySystemsType$index.keySystem;

	    requestMediaKeySystemAccess(keyType, keySystemConfigurations).then(function (keySystemAccess) {
	      return res({ keySystem: keySystem, keySystemAccess: keySystemAccess });
	    }, function () {
	      return testKeySystem(index + 1, res, rej);
	    });
	  }

	  return new Promise_(function (res, rej) {
	    return testKeySystem(0, res, rej);
	  });
	}

	function createAndSetMediaKeys(video, keySystem, keySystemAccess) {
	  return keySystemAccess.createMediaKeys().then(function (mk) {
	    $mediaKeys = mk;
	    $keySystem = keySystem.type;
	    log.debug("eme: set mediakeys");
	    return setMediaKeys(video, mk).then(function () {
	      return mk;
	    });
	  });
	}

	function makeNewKeyRequest(session, initDataType, initData) {
	  var persistedSessions = arguments[3] === undefined ? false : arguments[3];

	  log.debug("eme: generate request", initDataType, initData, persistedSessions);
	  return session.generateRequest(initDataType, initData).then(function () {
	    // compat: store sessions only if they have a keyStatuses
	    // property
	    if (persistedSessions && session.keyStatuses) {
	      log.info("eme: store session", session);
	      $sessionsStore.set(initData, session);
	    }
	    return session;
	  });
	}

	function toObservable(value) {
	  if (_.isPromise(value)) return fromPromise(value);

	  if (!_.isObservable(value)) return just(value);

	  return value;
	}

	/**
	 * EME abstraction and event handler used to communicate with the Content-
	 * Description-Module (CDM).
	 *
	 * The communication with backend key-servers is not handled directly by this
	 * module but through the given "KeySystems".
	 *
	 * A system has to expose the given interface:
	 * interface KeySystem {
	 *   readonly attribute string type;
	 *
	 *   Promise<AB> getLicense((AB) challenge);
	 *   AB extractInitData(AB);
	 * }
	 * with AB = ArrayBuffer or ArrayBufferView
	 *
	 * The `extraInitData` method is not mandatory and used to pre-process the
	 * initData vector injected into the CDM. The `getLicense` method is used to
	 * serve the license encapsulated in a promise to support asynchronous license
	 * fetching. The challenge buffer sent by the CDM is directly passed as first
	 * argument of this method.
	 *
	 * The EME handler can be given one or multiple systems and will choose the
	 * appropriate one supported by the user's browser.
	 */
	function EME(video, keySystems) {
	  var options = arguments[2] === undefined ? {} : arguments[2];

	  if (true) _.each(keySystems, function (ks) {
	    return assert.iface(ks, "keySystem", { getLicense: "function", type: "string" });
	  });

	  var persistedSessions = options.persistedSessions;

	  function handleEncryptedEvents(encryptedEvent) {
	    var initData = new Uint8Array(encryptedEvent.initData);
	    var initDataType = encryptedEvent.initDataType;

	    log.info("eme: encrypted event", encryptedEvent);

	    var compatibleKeySystem = fromPromise(findCompatibleKeySystem(keySystems));
	    return compatibleKeySystem.flatMap(function (_ref2) {
	      var keySystem = _ref2.keySystem;
	      var keySystemAccess = _ref2.keySystemAccess;

	      log.info("eme: compatible keysystem", keySystem.type);

	      var mediaKeysCreation = createAndSetMediaKeys(video, keySystem, keySystemAccess);

	      return fromPromise(mediaKeysCreation).flatMap(function (mediaKeys) {
	        // reuse previously created sessions without making a new
	        // license request
	        var session = $sessionsStore.get(initData);
	        if (session) {
	          var keyStatuses = session.keyStatuses;
	          if (keyStatuses.length > 0) {
	            log.debug("eme: reuse session");
	            return just(session);
	          } else {
	            $sessionsStore.remove(initData);
	          }
	        }

	        log.debug("eme: create session");
	        session = mediaKeys.createSession("temporary");
	        return makeNewKeyRequest(session, initDataType, initData, persistedSessions);
	      }).flatMap(function (session) {
	        return handleMessageEvents(session, keySystem, initData);
	      });
	    });
	  }

	  // listen to "message" events from session containing a challenge
	  // blob and map them to licenses using the getLicense method from
	  // selected keySystem
	  function handleMessageEvents(session, keySystem, initData) {
	    var sessionId;

	    var keyErrors = onKeyError(session).map(function (err) {
	      var errMessage = "eme: keyerror event " + err.errorCode + " / " + err.systemCode;
	      log.error(errMessage);
	      throw new Error(errMessage);
	    });

	    var keyStatusesChanges = onKeyStatusesChange(session).flatMap(function (keyStatusesEvent) {
	      sessionId = keyStatusesEvent.sessionId;

	      // find out possible errors associated with this event
	      var keyStatuses = session.keyStatuses.values();
	      for (var v = keyStatuses.next(); !v.done; v = keyStatuses.next()) {
	        var errMessage = KEY_STATUS_ERRORS[v.value];
	        if (errMessage) {
	          log.error(errMessage);
	          throw new Error(errMessage);
	        }
	      }

	      // otherwise use the keysystem handler if disponible
	      if (!keySystem.onKeyStatusesChange) {
	        log.warn("eme: keystatuseschange event not handled");
	        return empty();
	      }

	      var license;
	      try {
	        license = keySystem.onKeyStatusesChange(keyStatusesEvent, session);
	      } catch (e) {
	        license = throwError(e);
	      }

	      return toObservable(license)["catch"](function (err) {
	        var errMessage = "eme: onKeyStatusesChange has failed (reason: " + (err && err.message || "unknown") + ")";
	        var error = new Error(errMessage);
	        error.reason = err;
	        log.error(errMessage);
	        throw error;
	      });
	    });

	    var keyMessages = onKeyMessage(session).flatMap(function (messageEvent) {
	      sessionId = messageEvent.sessionId;

	      var message = messageEvent.message;
	      var messageType = messageEvent.messageType;

	      var license;
	      try {
	        license = keySystem.getLicense(new Uint8Array(message), messageType || "licenserequest");
	      } catch (e) {
	        license = throwError(e);
	      }

	      return toObservable(license)["catch"](function (err) {
	        var errMessage = "eme: getLicense has failed (reason: " + (err && err.message || "unknown") + ")";
	        var error = new Error(errMessage);
	        error.reason = err;
	        log.error(errMessage);
	        throw error;
	      });
	    });

	    var sessionUpdates = merge(keyMessages, keyStatusesChanges).concatMap(function (res) {
	      return session.update(res, sessionId)["catch"](function (err) {
	        log.error("eme: error on session update", sessionId, err);
	        throw err;
	      });
	    }).map(function (res) {
	      return { type: "eme", value: { session: session, name: "session-updated" } };
	    });

	    return merge(sessionUpdates, keyErrors).tapOnError(function (err) {
	      log.debug("eme: remove session from store", sessionId);
	      $sessionsStore.remove(initData);
	    });
	  }

	  return onEncrypted(video).take(1).flatMap(handleEncryptedEvents);
	}

	EME.onEncrypted = function (video) {
	  return onEncrypted(video);
	};
	EME.getCurrentKeySystem = function () {
	  return $keySystem;
	};
	EME.dispose = function () {
	  $mediaKeys = null;
	  $keySystem = null;
	  $sessionsStore.dispose();
	};

	module.exports = EME;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var assert = __webpack_require__(2);

	var Template = __webpack_require__(31);
	var Timeline = __webpack_require__(16);
	var List = __webpack_require__(30);
	var Base = __webpack_require__(29);

	function OutOfIndexError(type) {
	  this.name = "OutOfIndexError";
	  this.type = type;
	  this.message = "out of range in index " + type;
	}
	OutOfIndexError.prototype = new Error();

	function selectIndexHandler(index) {
	  switch (index.indexType) {
	    case "template":
	      return Template;
	    case "timeline":
	      return Timeline;
	    case "list":
	      return List;
	    case "base":
	      return Base;
	    default:
	      throw new Error("index-handler: unrecognized indexType " + index.indexType);
	  }
	}

	function getLiveEdge(manifest) {
	  // TODO(pierre): improve index access ?
	  var videoIndex = manifest.adaptations.video[0].representations[0].index;
	  return selectIndexHandler(videoIndex).getLiveEdge(videoIndex, manifest);
	}

	function IndexHandler(representation) {
	  this.representation = representation;
	  this.index = representation.index;
	  this.handler = new (selectIndexHandler(this.index))(this.index);
	}

	IndexHandler.prototype.getInitSegment = function () {
	  var initialization = this.index.initialization || {};
	  return {
	    id: "init_" + this.representation.uid,
	    init: true,
	    media: initialization.media,
	    range: initialization.range
	  };
	};

	IndexHandler.prototype.normalizeRange = function (ts, offset, bufSize) {
	  var presentationOffset = this.index.presentationTimeOffset || 0;
	  var timescale = this.index.timescale || 1;

	  if (!offset) offset = 0;
	  if (!bufSize) bufSize = 0;

	  offset = Math.min(offset, bufSize);

	  return {
	    time: ts * timescale - presentationOffset,
	    up: (ts + offset) * timescale - presentationOffset,
	    to: (ts + bufSize) * timescale - presentationOffset
	  };
	};

	IndexHandler.prototype.getSegments = function (ts, offset, bufSize) {
	  var _normalizeRange = this.normalizeRange(ts, offset, bufSize);

	  var time = _normalizeRange.time;
	  var up = _normalizeRange.up;
	  var to = _normalizeRange.to;

	  if (!this.handler.checkRange(time)) {
	    throw new OutOfIndexError(this.index.indexType);
	  }

	  return this.handler.getSegments(up, to);
	};

	IndexHandler.prototype.insertNewSegments = function (nextSegments, currentSegment) {
	  var addedSegments = [];
	  for (var i = 0; i < nextSegments.length; i++) {
	    if (this.handler.addSegment(nextSegments[i], currentSegment)) {
	      addedSegments.push(nextSegments[i]);
	    }
	  }
	  return addedSegments;
	};

	IndexHandler.prototype.setTimescale = function (timescale) {
	  var index = this.index;

	  if (true) {
	    assert(typeof timescale == "number");
	    assert(timescale > 0);
	  }

	  if (index.timescale !== timescale) {
	    index.timescale = timescale;
	    return true;
	  }

	  return false;
	};

	IndexHandler.prototype.scale = function (time) {
	  if (true) {
	    assert(this.index.timescale > 0);
	  }

	  return time / this.index.timescale;
	};

	module.exports = {
	  OutOfIndexError: OutOfIndexError,
	  IndexHandler: IndexHandler,
	  getLiveEdge: getLiveEdge
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);

	function getTimelineBound(_ref) {
	  var ts = _ref.ts;
	  var d = _ref.d;
	  var r = _ref.r;

	  if (d === -1) return ts;else return ts + (r + 1) * d;
	}

	function Timeline(index) {
	  this.index = index;
	  this.timeline = index.timeline;
	}

	Timeline.getLiveEdge = function (videoIndex, manifest) {
	  var calculatedLiveEdge = getTimelineBound(_.last(videoIndex.timeline)) / videoIndex.timescale - manifest.suggestedPresentationDelay;
	  var minimumLiveEdge = videoIndex.timeline[0].ts / videoIndex.timescale + 1;

	  return Math.max(minimumLiveEdge, calculatedLiveEdge);
	};

	Timeline.prototype.createSegment = function (time, range, duration) {
	  return {
	    id: time,
	    media: this.index.media,
	    time: time,
	    number: undefined,
	    range: range,
	    duration: duration
	  };
	};

	Timeline.prototype.calculateRepeat = function (seg, nextSeg) {
	  var rep = seg.r || 0;

	  // A negative value of the @r attribute of the S element indicates
	  // that the duration indicated in @d attribute repeats until the
	  // start of the next S element, the end of the Period or until the
	  // next MPD update.
	  if (rep < 0) {
	    var repEnd = nextSeg ? nextSeg.t : Infinity;
	    rep = Math.ceil((repEnd - seg.ts) / seg.d) - 1;
	  }

	  return rep;
	};

	Timeline.prototype.checkRange = function (up) {
	  var last = _.last(this.timeline);
	  if (!last) return true;

	  if (last.d < 0) last = { ts: last.ts, d: 0, r: last.r };

	  return up <= getTimelineBound(last);
	};

	Timeline.prototype.getSegmentIndex = function (ts) {
	  var timeline = this.timeline;
	  var low = 0;
	  var high = timeline.length;

	  while (low < high) {
	    var mid = low + high >>> 1;
	    if (timeline[mid].ts < ts) {
	      low = mid + 1;
	    } else {
	      high = mid;
	    }
	  }

	  return low > 0 ? low - 1 : low;
	};

	Timeline.prototype.getSegmentNumber = function (ts, up, duration) {
	  var diff = up - ts;
	  if (diff > 0) return Math.floor(diff / duration);else return 0;
	};

	Timeline.prototype.getSegments = function (up, to) {
	  var timeline = this.index.timeline;
	  var segments = [];

	  var timelineLength = timeline.length;
	  var timelineIndex = this.getSegmentIndex(up) - 1;
	  // TODO(pierre): use @maxSegmentDuration if possible
	  var maxDuration = timeline.length && timeline[0].d || 0;

	  loop: for (;;) {
	    if (++timelineIndex >= timelineLength) break;

	    var segmentRange = timeline[timelineIndex];
	    var d = segmentRange.d;
	    var ts = segmentRange.ts;
	    var range = segmentRange.range;

	    maxDuration = Math.max(maxDuration, d);

	    // live-added segments have @d attribute equals to -1
	    if (d < 0) {
	      if (ts + maxDuration < to) {
	        segments.push(this.createSegment(ts, range, undefined));
	      }
	      break;
	    }

	    var repeat = this.calculateRepeat(segmentRange, timeline[timelineIndex + 1]);
	    var segmentNumber = this.getSegmentNumber(ts, up, d);
	    var segmentTime;
	    while ((segmentTime = ts + segmentNumber * d) < to) {
	      if (segmentNumber++ <= repeat) {
	        segments.push(this.createSegment(segmentTime, range, d));
	      } else {
	        continue loop;
	      }
	    }

	    break;
	  }

	  return segments;
	};

	Timeline.prototype.addSegment = function (newSegment, currentSegment) {
	  var timeline = this.timeline;
	  var timelineLength = timeline.length;
	  var last = timeline[timelineLength - 1];

	  // in some circumstances, the new segment informations are only
	  // duration informations that we can use de deduct the ts of the
	  // next segment. this is the case where the new segment are
	  // associated to a current segment and have the same ts
	  var shouldDeductNextSegment = !!currentSegment && newSegment.ts === currentSegment.ts;
	  if (shouldDeductNextSegment) {
	    var newSegmentTs = newSegment.ts + newSegment.d;
	    var lastSegmentTs = last.ts + last.d * last.r;
	    var tsDiff = newSegmentTs - lastSegmentTs;

	    if (tsDiff <= 0) return false;

	    // try to use the compact notation with @r attribute on the last
	    // to elements of the timeline if we find out they have the same
	    // duration
	    if (last.d === -1) {
	      var prev = timeline[timelineLength - 2];
	      if (prev && prev.d === tsDiff) {
	        prev.r++;
	        timeline.pop();
	      } else {
	        last.d = tsDiff;
	      }
	    }

	    timeline.push({ d: -1, ts: newSegmentTs, r: 0 });
	    return true;
	  }

	  // if the given timing has a timestamp after le timeline bound we
	  // just need to push a new element in the timeline, or increase
	  // the @r attribute of the last element.
	  else if (newSegment.ts >= getTimelineBound(last)) {
	    if (last.d === newSegment.d) {
	      last.r++;
	    } else {
	      timeline.push({ d: newSegment.d, ts: newSegment.ts, r: 0 });
	    }
	    return true;
	  }

	  return false;
	};

	module.exports = Timeline;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var log = __webpack_require__(4);
	var assert = __webpack_require__(2);

	var _require = __webpack_require__(11);

	var parseBaseURL = _require.parseBaseURL;

	var _require2 = __webpack_require__(7);

	var isCodecSupported = _require2.isCodecSupported;

	var representationBaseType = ["profiles", "width", "height", "frameRate", "audioSamplingRate", "mimeType", "segmentProfiles", "codecs", "maximumSAPPeriod", "maxPlayoutRate", "codingDependency", "index"];

	var SUPPORTED_ADAPTATIONS_TYPE = ["audio", "video", "text"];
	var DEFAULT_PRESENTATION_DELAY = 15;

	function parseType(mimeType) {
	  return mimeType.split("/")[0];
	}

	function normalizeManifest(location, manifest, subtitles) {
	  assert(manifest.transportType);

	  manifest.id = manifest.id || _.uniqueId();
	  manifest.type = manifest.type || "static";

	  var locations = manifest.locations;
	  if (!locations || !locations.length) {
	    manifest.locations = [location];
	  }

	  manifest.isLive = manifest.type == "dynamic";

	  // TODO(pierre): support multi-locations/cdns
	  var urlBase = {
	    rootURL: parseBaseURL(manifest.locations[0]),
	    baseURL: manifest.baseURL,
	    isLive: manifest.isLive
	  };

	  if (subtitles) {
	    subtitles = normalizeSubtitles(subtitles);
	  }

	  var periods = _.map(manifest.periods, function (period) {
	    return normalizePeriod(period, urlBase, subtitles);
	  });

	  // TODO(pierre): support multiple periods
	  _.extend(manifest, periods[0]);
	  manifest.periods = null;

	  if (!manifest.duration) manifest.duration = Infinity;

	  if (manifest.isLive) {
	    manifest.suggestedPresentationDelay = manifest.suggestedPresentationDelay || DEFAULT_PRESENTATION_DELAY;
	    manifest.availabilityStartTime = manifest.availabilityStartTime || 0;
	  }

	  return manifest;
	}

	function normalizePeriod(period, inherit, subtitles) {
	  period.id = period.id || _.uniqueId();

	  var adaptations = period.adaptations;
	  adaptations = adaptations.concat(subtitles || []);
	  adaptations = _.map(adaptations, function (ada) {
	    return normalizeAdaptation(ada, inherit);
	  });
	  adaptations = _.filter(adaptations, function (adaptation) {
	    if (SUPPORTED_ADAPTATIONS_TYPE.indexOf(adaptation.type) < 0) {
	      log.warn("not supported adaptation type", adaptation.type);
	      return false;
	    } else {
	      return true;
	    }
	  });

	  assert(adaptations.length > 0);

	  period.adaptations = _.groupBy(adaptations, "type");
	  return period;
	}

	function normalizeAdaptation(adaptation, inherit) {
	  adaptation.id = adaptation.id || _.uniqueId();
	  _.defaults(adaptation, inherit);

	  var inheritedFromAdaptation = _.pick(adaptation, representationBaseType);
	  var representations = _.map(adaptation.representations, function (rep) {
	    return normalizeRepresentation(rep, inheritedFromAdaptation);
	  }).sort(function (a, b) {
	    return a.bitrate - b.bitrate;
	  });

	  var type = adaptation.type;
	  var mimeType = adaptation.mimeType;

	  if (!mimeType) mimeType = representations[0].mimeType;

	  assert(mimeType);

	  adaptation.mimeType = mimeType;

	  if (!type) type = adaptation.type = parseType(mimeType);

	  if (type == "video" || type == "audio") {
	    representations = _.filter(representations, function (rep) {
	      return isCodecSupported(getCodec(rep));
	    });
	  }

	  assert(representations.length > 0, "manifest: no compatible representation for this adaptation");
	  adaptation.representations = representations;
	  adaptation.bitrates = _.pluck(representations, "bitrate");
	  return adaptation;
	}

	function normalizeRepresentation(representation, inherit) {
	  representation.id = representation.id || _.uniqueId();
	  representation.uid = _.uniqueId();
	  _.defaults(representation, inherit);

	  var index = representation.index;
	  assert(index);

	  if (!index.timescale) {
	    index.timescale = 1;
	  }

	  if (!representation.bitrate) {
	    representation.bitrate = 1;
	  }

	  // Fix issue in some packagers, like GPAC, generating a non
	  // compliant mimetype with RFC 6381. Other closed-source packagers
	  // maybe impacted.
	  if (representation.codecs == "mp4a.40.02") {
	    representation.codecs = "mp4a.40.2";
	  }

	  return representation;
	}

	function normalizeSubtitles(subtitles) {
	  if (!_.isArray(subtitles)) subtitles = [subtitles];

	  return _.flatten(subtitles, function (_ref) {
	    var mimeType = _ref.mimeType;
	    var url = _ref.url;
	    var language = _ref.language;
	    var languages = _ref.languages;

	    if (language) {
	      languages = [language];
	    }

	    return _.map(languages, function (lang) {
	      return {
	        id: _.uniqueId(),
	        type: "text",
	        lang: lang,
	        mimeType: mimeType,
	        rootURL: url,
	        baseURL: "",
	        representations: [{
	          id: _.uniqueId(),
	          mimeType: mimeType,
	          index: {
	            indexType: "template",
	            duration: Number.MAX_VALUE,
	            timescale: 1,
	            startNumber: 0
	          }
	        }]
	      };
	    });
	  });
	}

	function mergeManifestsIndex(oldManifest, newManifest) {
	  var oldAdaptations = oldManifest.adaptations;
	  var newAdaptations = newManifest.adaptations;
	  for (var type in oldAdaptations) {
	    var oldAdas = oldAdaptations[type];
	    var newAdas = newAdaptations[type];
	    _.each(oldAdas, function (a, i) {
	      _.simpleMerge(a.index, newAdas[i].index);
	    });
	  }
	  return oldManifest;
	}

	function mutateManifestLiveGap(manifest) {
	  var addedTime = arguments[1] === undefined ? 1 : arguments[1];

	  if (manifest.isLive) {
	    manifest.presentationLiveGap += addedTime;
	  }
	}

	function getCodec(representation) {
	  var codecs = representation.codecs;
	  var mimeType = representation.mimeType;

	  return "" + mimeType + ";codecs=\"" + codecs + "\"";
	}

	function getAdaptations(manifest) {
	  var adaptationsByType = manifest.adaptations;

	  var adaptationsList = [];
	  _.each(Object.keys(adaptationsByType), function (type) {
	    var adaptations = adaptationsByType[type];
	    adaptationsList.push({
	      type: type,
	      adaptations: adaptations,
	      codec: getCodec(adaptations[0].representations[0])
	    });
	  });

	  return adaptationsList;
	}

	function getAvailableLanguages(manifest) {
	  return _.pluck(manifest.adaptations.audio, "lang");
	}

	function getAvailableSubtitles(manifest) {
	  return _.pluck(manifest.adaptations.text, "lang");
	}

	module.exports = {
	  normalizeManifest: normalizeManifest,
	  mergeManifestsIndex: mergeManifestsIndex,
	  mutateManifestLiveGap: mutateManifestLiveGap,
	  getCodec: getCodec,
	  getAdaptations: getAdaptations,
	  getAvailableSubtitles: getAvailableSubtitles,
	  getAvailableLanguages: getAvailableLanguages
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _require = __webpack_require__(3);

	var Observable = _require.Observable;

	var _require2 = __webpack_require__(6);

	var getGap = _require2.getGap;
	var getRange = _require2.getRange;

	// time changes interval in milliseconds
	var TIMINGS_SAMPLING_INTERVAL = 1000;

	// time in seconds protecting live buffer to prevent ahead of time
	// buffering
	var LIVE_PROTECTION = 10;

	// stall gap in seconds
	var STALL_GAP = 0.5;
	var RESUME_GAP = 5;

	// seek gap in seconds
	var SEEK_GAP = 2;

	// waiting time differs between a "seeking" stall and
	// a buffering stall
	function resumeGap(stalled) {
	  return stalled.name == "seeking" ? STALL_GAP : RESUME_GAP;
	}

	function isEnding(gap, range, duration) {
	  if (range) {
	    return duration - (gap + range.end) <= STALL_GAP;
	  } else {
	    return false;
	  }
	}

	function getTimings(video, name) {
	  var playback = video.playbackRate;
	  var duration = video.duration;
	  var ts = video.currentTime;
	  var readyState = video.readyState;
	  var buffered = video.buffered;
	  var range = getRange(ts, buffered);
	  var gap = getGap(ts, range);
	  var stalled = null;
	  return {
	    name: name,
	    ts: ts,
	    range: range,
	    gap: gap,
	    duration: duration,
	    playback: playback,
	    readyState: readyState,
	    stalled: stalled,
	    buffered: buffered
	  };
	}

	/**
	 * Timings observable.
	 *
	 * This streams samples snapshots of player's current state:
	 *   * time position
	 *   * playback rate
	 *   * current buffered range
	 *   * gap with current buffered range ending
	 *   * video duration
	 *
	 * In addition to sampling, this stream also reacts to "seeking" and "play"
	 * events.
	 *
	 * Observable is shared for performance reason: reduces the number of event
	 * listeners and intervals/timeouts but also limit access to <video>
	 * properties and gap calculations.
	 *
	 * The sampling is manual instead of based on "timeupdate" to reduce the
	 * number of events.
	 */
	function timingsSampler(video) {

	  function scanTimingsSamples(prevTimings, timingEventType) {
	    var currentTimings = getTimings(video, timingEventType);

	    var stalled = prevTimings.stalled;
	    var gap = currentTimings.gap;

	    var hasStalled = !stalled && (gap <= STALL_GAP || gap === Infinity) && !isEnding(gap, currentTimings.range, currentTimings.duration);

	    if (hasStalled) {
	      stalled = {
	        name: currentTimings.name,
	        playback: currentTimings.playback
	      };
	    } else if (stalled && gap < Infinity && gap > resumeGap(stalled)) {
	      stalled = null;
	    }

	    currentTimings.stalled = stalled;
	    return currentTimings;
	  }

	  return Observable.create(function (obs) {
	    var prevTimings = { name: "init", stalled: null };

	    function emitSample(type) {
	      prevTimings = scanTimingsSamples(prevTimings, type);
	      obs.onNext(prevTimings);
	    }

	    function onPlay() {
	      emitSample("play");
	    }
	    function onSeeking() {
	      emitSample("seeking");
	    }
	    function onSeeked() {
	      emitSample("seeked");
	    }

	    var samplerInterval = setInterval(function () {
	      return emitSample("timeupdate");
	    }, TIMINGS_SAMPLING_INTERVAL);

	    video.addEventListener("play", onPlay);
	    video.addEventListener("seeking", onSeeking);
	    video.addEventListener("seeked", onSeeked);

	    obs.onNext(prevTimings);

	    return function () {
	      video.removeEventListener("play", onPlay);
	      video.removeEventListener("seeking", onSeeking);
	      video.removeEventListener("seeked", onSeeked);
	      clearInterval(samplerInterval);
	    };
	  }).shareValue({ name: "init", stalled: null });
	}

	function seekingsSampler(timingsSampling) {
	  return timingsSampling.filter(function (t) {
	    return t.name == "seeking" && (t.gap === Infinity || t.gap < -SEEK_GAP);
	  })
	  // skip the first seeking event generated by the set of the
	  // initial seeking time in the video
	  .skip(1).startWith(true);
	}

	function toWallClockTime(ts, manifest) {
	  return new Date((ts + manifest.availabilityStartTime) * 1000);
	}

	function fromWallClockTime(timeInMs, manifest) {
	  return normalizeWallClockTime(timeInMs, manifest) / 1000 - manifest.availabilityStartTime;
	}

	function normalizeWallClockTime(timeInMs, manifest) {
	  var suggestedPresentationDelay = manifest.suggestedPresentationDelay;
	  var presentationLiveGap = manifest.presentationLiveGap;
	  var timeShiftBufferDepth = manifest.timeShiftBufferDepth;

	  if (typeof timeInMs != "number") timeInMs = timeInMs.getTime();

	  var now = Date.now();
	  var max = now - (presentationLiveGap + suggestedPresentationDelay) * 1000;
	  var min = now - timeShiftBufferDepth * 1000;
	  return Math.max(Math.min(timeInMs, max), min);
	}

	function getLiveGap(ts, manifest) {
	  if (!manifest.isLive) return Infinity;

	  var availabilityStartTime = manifest.availabilityStartTime;
	  var presentationLiveGap = manifest.presentationLiveGap;

	  var liveGap = Date.now() / 1000 - ts;
	  return liveGap - (availabilityStartTime + presentationLiveGap + LIVE_PROTECTION);
	}

	module.exports = {
	  timingsSampler: timingsSampler,
	  seekingsSampler: seekingsSampler,
	  getLiveGap: getLiveGap,
	  toWallClockTime: toWallClockTime,
	  fromWallClockTime: fromWallClockTime
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.1
	 */

	(function() {
	    "use strict";

	    function $$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function $$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function $$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var $$utils$$_isArray;

	    if (!Array.isArray) {
	      $$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      $$utils$$_isArray = Array.isArray;
	    }

	    var $$utils$$isArray = $$utils$$_isArray;
	    var $$utils$$now = Date.now || function() { return new Date().getTime(); };
	    function $$utils$$F() { }

	    var $$utils$$o_create = (Object.create || function (o) {
	      if (arguments.length > 1) {
	        throw new Error('Second argument not supported');
	      }
	      if (typeof o !== 'object') {
	        throw new TypeError('Argument must be an object');
	      }
	      $$utils$$F.prototype = o;
	      return new $$utils$$F();
	    });

	    var $$asap$$len = 0;

	    var $$asap$$default = function asap(callback, arg) {
	      $$asap$$queue[$$asap$$len] = callback;
	      $$asap$$queue[$$asap$$len + 1] = arg;
	      $$asap$$len += 2;
	      if ($$asap$$len === 2) {
	        // If len is 1, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        $$asap$$scheduleFlush();
	      }
	    };

	    var $$asap$$browserGlobal = (typeof window !== 'undefined') ? window : {};
	    var $$asap$$BrowserMutationObserver = $$asap$$browserGlobal.MutationObserver || $$asap$$browserGlobal.WebKitMutationObserver;

	    // test for web worker but not in IE10
	    var $$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function $$asap$$useNextTick() {
	      return function() {
	        process.nextTick($$asap$$flush);
	      };
	    }

	    function $$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new $$asap$$BrowserMutationObserver($$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function $$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = $$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function $$asap$$useSetTimeout() {
	      return function() {
	        setTimeout($$asap$$flush, 1);
	      };
	    }

	    var $$asap$$queue = new Array(1000);

	    function $$asap$$flush() {
	      for (var i = 0; i < $$asap$$len; i+=2) {
	        var callback = $$asap$$queue[i];
	        var arg = $$asap$$queue[i+1];

	        callback(arg);

	        $$asap$$queue[i] = undefined;
	        $$asap$$queue[i+1] = undefined;
	      }

	      $$asap$$len = 0;
	    }

	    var $$asap$$scheduleFlush;

	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	      $$asap$$scheduleFlush = $$asap$$useNextTick();
	    } else if ($$asap$$BrowserMutationObserver) {
	      $$asap$$scheduleFlush = $$asap$$useMutationObserver();
	    } else if ($$asap$$isWorker) {
	      $$asap$$scheduleFlush = $$asap$$useMessageChannel();
	    } else {
	      $$asap$$scheduleFlush = $$asap$$useSetTimeout();
	    }

	    function $$$internal$$noop() {}
	    var $$$internal$$PENDING   = void 0;
	    var $$$internal$$FULFILLED = 1;
	    var $$$internal$$REJECTED  = 2;
	    var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();

	    function $$$internal$$selfFullfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function $$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.')
	    }

	    function $$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        $$$internal$$GET_THEN_ERROR.error = error;
	        return $$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function $$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function $$$internal$$handleForeignThenable(promise, thenable, then) {
	       $$asap$$default(function(promise) {
	        var sealed = false;
	        var error = $$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            $$$internal$$resolve(promise, value);
	          } else {
	            $$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          $$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          $$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function $$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === $$$internal$$FULFILLED) {
	        $$$internal$$fulfill(promise, thenable._result);
	      } else if (promise._state === $$$internal$$REJECTED) {
	        $$$internal$$reject(promise, thenable._result);
	      } else {
	        $$$internal$$subscribe(thenable, undefined, function(value) {
	          $$$internal$$resolve(promise, value);
	        }, function(reason) {
	          $$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function $$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        $$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = $$$internal$$getThen(maybeThenable);

	        if (then === $$$internal$$GET_THEN_ERROR) {
	          $$$internal$$reject(promise, $$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          $$$internal$$fulfill(promise, maybeThenable);
	        } else if ($$utils$$isFunction(then)) {
	          $$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          $$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function $$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        $$$internal$$reject(promise, $$$internal$$selfFullfillment());
	      } else if ($$utils$$objectOrFunction(value)) {
	        $$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        $$$internal$$fulfill(promise, value);
	      }
	    }

	    function $$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      $$$internal$$publish(promise);
	    }

	    function $$$internal$$fulfill(promise, value) {
	      if (promise._state !== $$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = $$$internal$$FULFILLED;

	      if (promise._subscribers.length === 0) {
	      } else {
	        $$asap$$default($$$internal$$publish, promise);
	      }
	    }

	    function $$$internal$$reject(promise, reason) {
	      if (promise._state !== $$$internal$$PENDING) { return; }
	      promise._state = $$$internal$$REJECTED;
	      promise._result = reason;

	      $$asap$$default($$$internal$$publishRejection, promise);
	    }

	    function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + $$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        $$asap$$default($$$internal$$publish, parent);
	      }
	    }

	    function $$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          $$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function $$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var $$$internal$$TRY_CATCH_ERROR = new $$$internal$$ErrorObject();

	    function $$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        $$$internal$$TRY_CATCH_ERROR.error = e;
	        return $$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function $$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = $$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = $$$internal$$tryCatch(callback, detail);

	        if (value === $$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          $$$internal$$reject(promise, $$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== $$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        $$$internal$$resolve(promise, value);
	      } else if (failed) {
	        $$$internal$$reject(promise, error);
	      } else if (settled === $$$internal$$FULFILLED) {
	        $$$internal$$fulfill(promise, value);
	      } else if (settled === $$$internal$$REJECTED) {
	        $$$internal$$reject(promise, value);
	      }
	    }

	    function $$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          $$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          $$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        $$$internal$$reject(promise, e);
	      }
	    }

	    function $$$enumerator$$makeSettledResult(state, position, value) {
	      if (state === $$$internal$$FULFILLED) {
	        return {
	          state: 'fulfilled',
	          value: value
	        };
	      } else {
	        return {
	          state: 'rejected',
	          reason: value
	        };
	      }
	    }

	    function $$$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor($$$internal$$noop, label);
	      this._abortOnReject = abortOnReject;

	      if (this._validateInput(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._init();

	        if (this.length === 0) {
	          $$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            $$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        $$$internal$$reject(this.promise, this._validationError());
	      }
	    }

	    $$$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return $$utils$$isArray(input);
	    };

	    $$$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    $$$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var $$$enumerator$$default = $$$enumerator$$Enumerator;

	    $$$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var promise = this.promise;
	      var input   = this._input;

	      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      if ($$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
	          entry._onerror = null;
	          this._settledAt(entry._state, i, entry._result);
	        } else {
	          this._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        this._remaining--;
	        this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === $$$internal$$PENDING) {
	        this._remaining--;

	        if (this._abortOnReject && state === $$$internal$$REJECTED) {
	          $$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = this._makeResult(state, i, value);
	        }
	      }

	      if (this._remaining === 0) {
	        $$$internal$$fulfill(promise, this._result);
	      }
	    };

	    $$$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
	      return value;
	    };

	    $$$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      $$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt($$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt($$$internal$$REJECTED, i, reason);
	      });
	    };

	    var $$promise$all$$default = function all(entries, label) {
	      return new $$$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
	    };

	    var $$promise$race$$default = function race(entries, label) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor($$$internal$$noop, label);

	      if (!$$utils$$isArray(entries)) {
	        $$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        $$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        $$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
	        $$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    };

	    var $$promise$resolve$$default = function resolve(object, label) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor($$$internal$$noop, label);
	      $$$internal$$resolve(promise, object);
	      return promise;
	    };

	    var $$promise$reject$$default = function reject(reason, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor($$$internal$$noop, label);
	      $$$internal$$reject(promise, reason);
	      return promise;
	    };

	    var $$es6$promise$promise$$counter = 0;

	    function $$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function $$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var $$es6$promise$promise$$default = $$es6$promise$promise$$Promise;

	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise’s eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function $$es6$promise$promise$$Promise(resolver) {
	      this._id = $$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if ($$$internal$$noop !== resolver) {
	        if (!$$utils$$isFunction(resolver)) {
	          $$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof $$es6$promise$promise$$Promise)) {
	          $$es6$promise$promise$$needsNew();
	        }

	        $$$internal$$initializePromise(this, resolver);
	      }
	    }

	    $$es6$promise$promise$$Promise.all = $$promise$all$$default;
	    $$es6$promise$promise$$Promise.race = $$promise$race$$default;
	    $$es6$promise$promise$$Promise.resolve = $$promise$resolve$$default;
	    $$es6$promise$promise$$Promise.reject = $$promise$reject$$default;

	    $$es6$promise$promise$$Promise.prototype = {
	      constructor: $$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === $$$internal$$FULFILLED && !onFulfillment || state === $$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor($$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          $$asap$$default(function(){
	            $$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          $$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };

	    var $$es6$promise$polyfill$$default = function polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	        local = global;
	      } else if (typeof window !== 'undefined' && window.document) {
	        local = window;
	      } else {
	        local = self;
	      }

	      var es6PromiseSupport =
	        "Promise" in local &&
	        // Some of these methods are missing from
	        // Firefox/Chrome experimental implementations
	        "resolve" in local.Promise &&
	        "reject" in local.Promise &&
	        "all" in local.Promise &&
	        "race" in local.Promise &&
	        // Older version of the spec had a resolver object
	        // as the arg rather than a function
	        (function() {
	          var resolve;
	          new local.Promise(function(r) { resolve = r; });
	          return $$utils$$isFunction(resolve);
	        }());

	      if (!es6PromiseSupport) {
	        local.Promise = $$es6$promise$promise$$default;
	      }
	    };

	    var es6$promise$umd$$ES6Promise = {
	      'Promise': $$es6$promise$promise$$default,
	      'polyfill': $$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(43)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = es6$promise$umd$$ES6Promise;
	    }
	}).call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), (function() { return this; }()), __webpack_require__(13)(module)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global, process) {// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

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
	    isPromise = Rx.helpers.isPromise = function (p) { return !!p && typeof p.then === 'function'; },
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

	    function cloneArray(arr) {
	      var len = arr.length, a = new Array(len);
	      for(var i = 0; i < len; i++) { a[i] = arr[i]; }
	      return a;
	    }

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
	      return this.scheduleRecursiveWithState(action, function (_action, self) {
	        _action(function () { self(_action); }); });
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

	  var Enumerator = Rx.internals.Enumerator = function (next) {
	    this._next = next;
	  };

	  Enumerator.prototype.next = function () {
	    return this._next();
	  };

	  Enumerator.prototype[$iterator$] = function () { return this; }

	  var Enumerable = Rx.internals.Enumerable = function (iterator) {
	    this._iterator = iterator;
	  };

	  Enumerable.prototype[$iterator$] = function () {
	    return this._iterator();
	  };

	  Enumerable.prototype.concat = function () {
	    var sources = this;
	    return new AnonymousObservable(function (o) {
	      var e = sources[$iterator$]();

	      var isDisposed, subscription = new SerialDisposable();
	      var cancelable = immediateScheduler.scheduleRecursive(function (self) {
	        if (isDisposed) { return; }
	        try {
	          var currentItem = e.next();
	        } catch (ex) {
	          return o.onError(ex);
	        }

	        if (currentItem.done) {
	          return o.onCompleted();
	        }

	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(currentValue.subscribe(
	          function(x) { o.onNext(x); },
	          function(err) { o.onError(err); },
	          self)
	        );
	      });

	      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    });
	  };

	  Enumerable.prototype.catchError = function () {
	    var sources = this;
	    return new AnonymousObservable(function (o) {
	      var e = sources[$iterator$]();

	      var isDisposed, subscription = new SerialDisposable();
	      var cancelable = immediateScheduler.scheduleRecursiveWithState(null, function (lastException, self) {
	        if (isDisposed) { return; }

	        try {
	          var currentItem = e.next();
	        } catch (ex) {
	          return observer.onError(ex);
	        }

	        if (currentItem.done) {
	          if (lastException !== null) {
	            o.onError(lastException);
	          } else {
	            o.onCompleted();
	          }
	          return;
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
	    });
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

	        try {
	          var currentItem = e.next();
	        } catch (ex) {
	          return o.onError(ex);
	        }

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

	  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
	    if (repeatCount == null) { repeatCount = -1; }
	    return new Enumerable(function () {
	      var left = repeatCount;
	      return new Enumerator(function () {
	        if (left === 0) { return doneEnumerator; }
	        if (left > 0) { left--; }
	        return { done: false, value: value };
	      });
	    });
	  };

	  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
	    if (selector) {
	      var selectorFn = bindCallback(selector, thisArg, 3);
	    }
	    return new Enumerable(function () {
	      var index = -1;
	      return new Enumerator(
	        function () {
	          return ++index < source.length ?
	            { done: false, value: !selector ? source[index] : selectorFn(source[index], index, source) } :
	            doneEnumerator;
	        });
	    });
	  };

	  /**
	   * Supports push-style iteration over an observable sequence.
	   */
	  var Observer = Rx.Observer = function () { };

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

	  var ToArrayObservable = (function(__super__) {
	    inherits(ToArrayObservable, __super__);
	    function ToArrayObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    ToArrayObservable.prototype.subscribeCore = function(observer) {
	      return this.source.subscribe(new ToArrayObserver(observer));
	    };

	    return ToArrayObservable;
	  }(ObservableBase));

	  function ToArrayObserver(observer) {
	    this.observer = observer;
	    this.a = [];
	    this.isStopped = false;
	  }
	  ToArrayObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.a.push(x); } };
	  ToArrayObserver.prototype.onError = function (e) {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onError(e);
	    }
	  };
	  ToArrayObserver.prototype.onCompleted = function () {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onNext(this.a);
	      this.observer.onCompleted();
	    }
	  };
	  ToArrayObserver.prototype.dispose = function () { this.isStopped = true; }
	  ToArrayObserver.prototype.fail = function (e) {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onError(e);
	      return true;
	    }

	    return false;
	  };

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
	      this.count = count;
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
	      var start = this.parent.start, count = this.parent.count, observer = this.observer;
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

	    ThrowObservable.prototype.subscribeCore = function (observer) {
	      var sink = new ThrowSink(observer, this);
	      return sink.run();
	    };

	    function ThrowSink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }

	    function scheduleItem(s, state) {
	      var error = state[0], observer = state[1];
	      observer.onError(error);
	    }

	    ThrowSink.prototype.run = function () {
	      return this.parent.scheduler.scheduleWithState([this.parent.error, this.observer], scheduleItem);
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
	    return enumerableOf(args).concat();
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

	    return MergeAllObservable;
	  }(ObservableBase));

	  var MergeAllObserver = (function() {

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

	    return MergeAllObserver;

	  }());

	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.mergeAll = observableProto.mergeObservable = function () {
	    return new MergeAllObservable(this);
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

	  /**
	   * Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
	   * @returns {Observable} The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
	   */
	  observableProto['switch'] = observableProto.switchLatest = function () {
	    var sources = this;
	    return new AnonymousObservable(function (observer) {
	      var hasLatest = false,
	        innerSubscription = new SerialDisposable(),
	        isStopped = false,
	        latest = 0,
	        subscription = sources.subscribe(
	          function (innerSource) {
	            var d = new SingleAssignmentDisposable(), id = ++latest;
	            hasLatest = true;
	            innerSubscription.setDisposable(d);

	            // Check if Promise or Observable
	            isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

	            d.setDisposable(innerSource.subscribe(
	              function (x) { latest === id && observer.onNext(x); },
	              function (e) { latest === id && observer.onError(e); },
	              function () {
	                if (latest === id) {
	                  hasLatest = false;
	                  isStopped && observer.onCompleted();
	                }
	              }));
	          },
	          function (e) { observer.onError(e); },
	          function () {
	            isStopped = true;
	            !hasLatest && observer.onCompleted();
	          });
	      return new CompositeDisposable(subscription, innerSubscription);
	    }, sources);
	  };

	  /**
	   * Returns the values from the source observable sequence until the other observable sequence produces a value.
	   * @param {Observable | Promise} other Observable sequence or Promise that terminates propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
	   */
	  observableProto.takeUntil = function (other) {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      isPromise(other) && (other = observableFromPromise(other));
	      return new CompositeDisposable(
	        source.subscribe(o),
	        other.subscribe(function () { o.onCompleted(); }, function (e) { o.onError(e); }, noop)
	      );
	    }, source);
	  };

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function only when the (first) source observable sequence produces an element.
	   *
	   * @example
	   * 1 - obs = obs1.withLatestFrom(obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	   * 2 - obs = obs1.withLatestFrom([obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.withLatestFrom = function () {
	    var len = arguments.length, args = new Array(len)
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = args.pop(), source = this;

	    if (typeof source === 'undefined') {
	      throw new Error('Source observable not found for withLatestFrom().');
	    }
	    if (typeof resultSelector !== 'function') {
	      throw new Error('withLatestFrom() expects a resultSelector function.');
	    }
	    if (Array.isArray(args[0])) {
	      args = args[0];
	    }

	    return new AnonymousObservable(function (observer) {
	      var falseFactory = function () { return false; },
	        n = args.length,
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
	          }, observer.onError.bind(observer), function () {}));
	          subscriptions[i] = sad;
	        }(idx));
	      }

	      var sad = new SingleAssignmentDisposable();
	      sad.setDisposable(source.subscribe(function (x) {
	        var res;
	        var allValues = [x].concat(values);
	        if (!hasValueAll) return;
	        try {
	          res = resultSelector.apply(null, allValues);
	        } catch (ex) {
	          observer.onError(ex);
	          return;
	        }
	        observer.onNext(res);
	      }, observer.onError.bind(observer), function () {
	        observer.onCompleted();
	      }));
	      subscriptions[n] = sad;

	      return new CompositeDisposable(subscriptions);
	    }, this);
	  };

	  function zipArray(second, resultSelector) {
	    var first = this;
	    return new AnonymousObservable(function (observer) {
	      var index = 0, len = second.length;
	      return first.subscribe(function (left) {
	        if (index < len) {
	          var right = second[index++], result;
	          try {
	            result = resultSelector(left, right);
	          } catch (e) {
	            return observer.onError(e);
	          }
	          observer.onNext(result);
	        } else {
	          observer.onCompleted();
	        }
	      }, function (e) { observer.onError(e); }, function () { observer.onCompleted(); });
	    }, first);
	  }

	  function falseFactory() { return false; }
	  function emptyArrayFactory() { return []; }

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
	   * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
	   *
	   * @example
	   * 1 - res = obs1.zip(obs2, fn);
	   * 1 - res = x1.zip([1,2,3], fn);
	   * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
	   */
	  observableProto.zip = function () {
	    if (Array.isArray(arguments[0])) { return zipArray.apply(this, arguments); }
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

	    var parent = this, resultSelector = args.pop();
	    args.unshift(parent);
	    return new AnonymousObservable(function (observer) {
	      var n = args.length,
	        queues = arrayInitialize(n, emptyArrayFactory),
	        isDone = arrayInitialize(n, falseFactory);

	      function next(i) {
	        var res, queuedValues;
	        if (queues.every(function (x) { return x.length > 0; })) {
	          try {
	            queuedValues = queues.map(function (x) { return x.shift(); });
	            res = resultSelector.apply(parent, queuedValues);
	          } catch (ex) {
	            observer.onError(ex);
	            return;
	          }
	          observer.onNext(res);
	        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
	          observer.onCompleted();
	        }
	      };

	      function done(i) {
	        isDone[i] = true;
	        if (isDone.every(function (x) { return x; })) {
	          observer.onCompleted();
	        }
	      }

	      var subscriptions = new Array(n);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          var source = args[i], sad = new SingleAssignmentDisposable();
	          isPromise(source) && (source = observableFromPromise(source));
	          sad.setDisposable(source.subscribe(function (x) {
	            queues[i].push(x);
	            next(i);
	          }, function (e) { observer.onError(e); }, function () {
	            done(i);
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
	    return new AnonymousObservable(function (observer) {
	      var n = sources.length,
	        queues = arrayInitialize(n, function () { return []; }),
	        isDone = arrayInitialize(n, function () { return false; });

	      function next(i) {
	        if (queues.every(function (x) { return x.length > 0; })) {
	          var res = queues.map(function (x) { return x.shift(); });
	          observer.onNext(res);
	        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
	          observer.onCompleted();
	          return;
	        }
	      };

	      function done(i) {
	        isDone[i] = true;
	        if (isDone.every(identity)) {
	          observer.onCompleted();
	          return;
	        }
	      }

	      var subscriptions = new Array(n);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          subscriptions[i] = new SingleAssignmentDisposable();
	          subscriptions[i].setDisposable(sources[i].subscribe(function (x) {
	            queues[i].push(x);
	            next(i);
	          }, function (e) { observer.onError(e); }, function () {
	            done(i);
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
	    return new AnonymousObservable(function (o) { return source.subscribe(o); }, this);
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
	          try {
	            key = keySelector(value);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	        }
	        if (hasCurrentKey) {
	          try {
	            var comparerEquals = comparer(currentKey, key);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	        }
	        if (!hasCurrentKey || !comparerEquals) {
	          hasCurrentKey = true;
	          currentKey = key;
	          o.onNext(value);
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, this);
	  };

	  /**
	   *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
	   *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	   * @param {Function | Observer} observerOrOnNext Action to invoke for each element in the observable sequence or an observer.
	   * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	   * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	   * @returns {Observable} The source sequence with the side-effecting behavior applied.
	   */
	  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var tapObserver = !observerOrOnNext || isFunction(observerOrOnNext) ?
	        observerCreate(observerOrOnNext || noop, onError || noop, onCompleted || noop) :
	        observerOrOnNext;

	      return source.subscribe(function (x) {
	        try {
	          tapObserver.onNext(x);
	        } catch (e) {
	          observer.onError(e);
	        }
	        observer.onNext(x);
	      }, function (err) {
	          try {
	            tapObserver.onError(err);
	          } catch (e) {
	            observer.onError(e);
	          }
	        observer.onError(err);
	      }, function () {
	        try {
	          tapObserver.onCompleted();
	        } catch (e) {
	          observer.onError(e);
	        }
	        observer.onCompleted();
	      });
	    }, this);
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

	  /**
	   *  Ignores all elements in an observable sequence leaving only the termination messages.
	   * @returns {Observable} An empty observable sequence that signals termination, successful or exceptional, of the source sequence.
	   */
	  observableProto.ignoreElements = function () {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(noop, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
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
	  /**
	   *  Applies an accumulator function over an observable sequence and returns each intermediate result. The optional seed value is used as the initial accumulator value.
	   *  For aggregation behavior with no intermediate results, see Observable.aggregate.
	   * @example
	   *  var res = source.scan(function (acc, x) { return acc + x; });
	   *  var res = source.scan(0, function (acc, x) { return acc + x; });
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
	            o.onError(e);
	            return;
	          }

	          o.onNext(accumulation);
	        },
	        function (e) { o.onError(e); },
	        function () {
	          !hasValue && hasSeed && o.onNext(seed);
	          o.onCompleted();
	        }
	      );
	    }, source);
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

	  var MapObservable = (function (__super__) {
	    inherits(MapObservable, __super__);

	    function MapObservable(source, selector, thisArg) {
	      this.source = source;
	      this.selector = bindCallback(selector, thisArg, 3);
	      __super__.call(this);
	    }

	    MapObservable.prototype.internalMap = function (selector, thisArg) {
	      var self = this;
	      return new MapObservable(this.source, function (x, i, o) { return selector.call(this, self.selector(x, i, o), i, o); }, thisArg)
	    };

	    MapObservable.prototype.subscribeCore = function (observer) {
	      return this.source.subscribe(new MapObserver(observer, this.selector, this));
	    };

	    return MapObservable;

	  }(ObservableBase));

	  function MapObserver(observer, selector, source) {
	    this.observer = observer;
	    this.selector = selector;
	    this.source = source;
	    this.i = 0;
	    this.isStopped = false;
	  }

	  MapObserver.prototype.onNext = function(x) {
	    if (this.isStopped) { return; }
	    var result = tryCatch(this.selector).call(this, x, this.i++, this.source);
	    if (result === errorObj) {
	      return this.observer.onError(result.e);
	    }
	    this.observer.onNext(result);
	  };
	  MapObserver.prototype.onError = function (e) {
	    if(!this.isStopped) { this.isStopped = true; this.observer.onError(e); }
	  };
	  MapObserver.prototype.onCompleted = function () {
	    if(!this.isStopped) { this.isStopped = true; this.observer.onCompleted(); }
	  };
	  MapObserver.prototype.dispose = function() { this.isStopped = true; };
	  MapObserver.prototype.fail = function (e) {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onError(e);
	      return true;
	    }

	    return false;
	  };

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

	  /**
	   * Bypasses a specified number of elements in an observable sequence and then returns the remaining elements.
	   * @param {Number} count The number of elements to skip before returning the remaining elements.
	   * @returns {Observable} An observable sequence that contains the elements that occur after the specified index in the input sequence.
	   */
	  observableProto.skip = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var remaining = count;
	      return source.subscribe(function (x) {
	        if (remaining <= 0) {
	          o.onNext(x);
	        } else {
	          remaining--;
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
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
	          remaining === 0 && o.onCompleted();
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

	    FilterObservable.prototype.subscribeCore = function (observer) {
	      return this.source.subscribe(new FilterObserver(observer, this.predicate, this));
	    };

	    FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
	      var self = this;
	      return new FilterObservable(this.source, function(x, i, o) { return self.predicate(x, i, o) && predicate.call(this, x, i, o); }, thisArg);
	    };

	    return FilterObservable;

	  }(ObservableBase));

	  function FilterObserver(observer, predicate, source) {
	    this.observer = observer;
	    this.predicate = predicate;
	    this.source = source;
	    this.i = 0;
	    this.isStopped = false;
	  }

	  FilterObserver.prototype.onNext = function(x) {
	    if (this.isStopped) { return; }
	    var shouldYield = tryCatch(this.predicate).call(this, x, this.i++, this.source);
	    if (shouldYield === errorObj) {
	      return this.observer.onError(shouldYield.e);
	    }
	    shouldYield && this.observer.onNext(x);
	  };
	  FilterObserver.prototype.onError = function (e) {
	    if(!this.isStopped) { this.isStopped = true; this.observer.onError(e); }
	  };
	  FilterObserver.prototype.onCompleted = function () {
	    if(!this.isStopped) { this.isStopped = true; this.observer.onCompleted(); }
	  };
	  FilterObserver.prototype.dispose = function() { this.isStopped = true; };
	  FilterObserver.prototype.fail = function (e) {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onError(e);
	      return true;
	    }
	    return false;
	  };

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

	    // Asume NodeList
	    if (Object.prototype.toString.call(el) === '[object NodeList]') {
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
	   * Converts a Promise to an Observable sequence
	   * @param {Promise} An ES6 Compliant promise.
	   * @returns {Observable} An Observable sequence which wraps the existing promise success and failure.
	   */
	  var observableFromPromise = Observable.fromPromise = function (promise) {
	    return observableDefer(function () {
	      var subject = new Rx.AsyncSubject();

	      promise.then(
	        function (value) {
	          subject.onNext(value);
	          subject.onCompleted();
	        },
	        subject.onError.bind(subject));

	      return subject;
	    });
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
	    return new AnonymousObservable(function (observer) {
	      var atEnd, value, hasValue;

	      function sampleSubscribe() {
	        if (hasValue) {
	          hasValue = false;
	          observer.onNext(value);
	        }
	        atEnd && observer.onCompleted();
	      }

	      return new CompositeDisposable(
	        source.subscribe(function (newValue) {
	          hasValue = true;
	          value = newValue;
	        }, observer.onError.bind(observer), function () {
	          atEnd = true;
	        }),
	        sampler.subscribe(sampleSubscribe, observer.onError.bind(observer), sampleSubscribe)
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
	        var res;
	        hasValue[i] = true;
	        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
	          if (err) {
	            o.onError(err);
	            return;
	          }

	          try {
	            res = resultSelector.apply(null, values);
	          } catch (ex) {
	            o.onError(ex);
	            return;
	          }
	          o.onNext(res);
	        }
	        if (isDone && values[1]) {
	          o.onCompleted();
	        }
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
	                if (results.shouldFire) {
	                  while (q.length > 0) {
	                    o.onNext(q.shift());
	                  }
	                }
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
	              // Empty buffer before sending error
	              while (q.length > 0) {
	                o.onNext(q.shift());
	              }
	              o.onError(err);
	            },
	            function () {
	              // Empty buffer before sending completion
	              while (q.length > 0) {
	                o.onNext(q.shift());
	              }
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
	   * @returns {Observable} The observable sequence which is paused based upon the pauser.
	   */
	  observableProto.controlled = function (enableQueue, scheduler) {

	    if (enableQueue && isScheduler(enableQueue)) {
	        scheduler = enableQueue;
	        enableQueue = true;
	    }

	    if (enableQueue == null) {  enableQueue = true; }
	    return new ControlledObservable(this, enableQueue, scheduler);
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

	  if (true) {
	    root.Rx = Rx;

	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Rx;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module), (function() { return this; }()), __webpack_require__(12)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(3);

	var Observable = _require.Observable;

	var FUZZ_FACTOR = 0.3;

	function getFuzzedDelay(retryDelay) {
	  var fuzzingFactor = (Math.random() * 2 - 1) * FUZZ_FACTOR;
	  return retryDelay * (1 + fuzzingFactor);
	}

	function getBackedoffDelay(retryDelay) {
	  var retryCount = arguments[1] === undefined ? 1 : arguments[1];

	  return getFuzzedDelay(retryDelay * Math.pow(2, retryCount - 1));
	}

	module.exports = {
	  getFuzzedDelay: getFuzzedDelay,
	  getBackedoffDelay: getBackedoffDelay
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(1);

	var cloneArray = _require.cloneArray;

	module.exports = function (fn, wait, debounceOptions) {
	  var timer = null;
	  var stamp = 0;
	  var args = [];

	  var leading = !!(debounceOptions && debounceOptions.leading);
	  var calledOnce = false;

	  function onCall() {
	    var dt = stamp - Date.now();
	    if (dt > 0) {
	      timer = setTimeout(onCall, dt);
	    } else {
	      timer = null;
	      switch (args.length) {
	        case 0:
	          return fn();
	        case 1:
	          return fn(args[0]);
	        case 2:
	          return fn(args[0], args[1]);
	        case 3:
	          return fn(args[0], args[1], args[2]);
	        default:
	          return fn.apply(null, args);
	      }
	    }
	  }

	  function debounced() {
	    // do not leak arguments object to prevent de-optimizations
	    var l = arguments.length,
	        i = 0;
	    args = Array(l);
	    for (; i < l; i++) args[i] = arguments[i];

	    if (leading && !calledOnce) {
	      calledOnce = true;
	      stamp = Date.now();
	      return onCall();
	    }

	    var t = stamp;
	    stamp = Date.now() + wait;

	    if (!timer || stamp < t) {
	      if (timer) clearTimeout(timer);
	      timer = setTimeout(onCall, wait);
	    }

	    return debounced;
	  }

	  debounced.isWaiting = function () {
	    return !!timer;
	  };

	  debounced.dispose = function () {
	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }
	  };

	  return debounced;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(3);

	var Observable = _require.Observable;

	function RequestError(url, xhr, message) {
	  var reason = arguments[3] === undefined ? null : arguments[3];

	  this.name = "RequestError";
	  this.url = url;
	  this.xhr = xhr;
	  this.code = xhr.status;
	  this.reason = reason;
	  this.message = "request: " + message + " (" + url + ")";
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, RequestError);
	  }
	}
	RequestError.prototype = new Error();

	function RestCallMethodError(url, _ref) {
	  var code = _ref.code;
	  var method = _ref.method;
	  var message = _ref.message;

	  this.name = "RestCallMethodError";
	  this.url = url;
	  this.code = code;
	  this.message = "restmethodcall: webservice error status " + code + " (" + url + ")" + (method ? " (" + method + ")" : "") + "" + (message ? "\n" + message : "");
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, RestCallMethodError);
	  }
	}
	RestCallMethodError.prototype = new Error();

	function RestCallResult(response, url, scriptInfo) {
	  var restCallResult = response.querySelector("RestCallResult");
	  var status = +restCallResult.querySelector("Status").textContent;
	  if (status < 0) throw new RestCallMethodError(url, { code: status, method: scriptInfo });else return {
	    output: restCallResult.querySelector("Output"),
	    status: status
	  };
	}

	function toJSONForIE(blob) {
	  try {
	    return JSON.parse(blob);
	  } catch (e) {
	    return null;
	  }
	}

	function getResponseHeadersList(xhr, headersList) {
	  var headers = {},
	      header;
	  for (var i = 0; i < headersList.length; i++) {
	    header = headersList[i];
	    headers[header] = xhr.getResponseHeader(header);
	  }
	  return headers;
	}

	/**
	 * Creates an observable HTTP request.
	 * The options that can be passed are:
	 *
	 *    - url        Request's url
	 *    - [method]   HTTP method (defaults is "GET")
	 *    - [data]     Sent data for "POST", "UPDATE" or "PATCH" requests
	 *    - [headers]  Object containing headers key/value
	 *    - [format]   Format of the response, according to the XMLHttpRequest Level 2
	 *                 response type: "arraybuffer", "blob", "document", "json" or "text" (defaults)
	 */
	function request(options) {
	  if (options.format == "rest-call-method") {
	    return restCallMethod(options);
	  }

	  return Observable.create(function (observer) {
	    var url = options.url;
	    var method = options.method;
	    var data = options.data;
	    var headers = options.headers;
	    var format = options.format;
	    var withMetadata = options.withMetadata;
	    var responseHeaders = options.responseHeaders;

	    var xhr = new XMLHttpRequest();
	    xhr.open(method || "GET", url, true);

	    // Special case for document format: some manifests may have a
	    // null response because of wrongly namespaced XML file. Also the
	    // document format rely on specific Content-Type headers which may
	    // erroneous. Therefore we use a text responseType and parse the
	    // document with DOMParser.
	    if (format == "document") {
	      xhr.responseType = "text";
	    } else {
	      xhr.responseType = format || "text";
	    }

	    if (headers) {
	      for (var name in headers) xhr.setRequestHeader(name, headers[name]);
	    }

	    xhr.addEventListener("load", onLoad, false);
	    xhr.addEventListener("error", onError, false);

	    var sent = Date.now();

	    xhr.send(data);

	    function onLoad(evt) {
	      var x = evt.target;
	      var s = x.status;
	      if (s < 200 || s >= 300) {
	        return observer.onError(new RequestError(url, x, x.statusText));
	      }

	      var duration = Date.now() - sent;
	      var blob;
	      if (format == "document") {
	        blob = new DOMParser().parseFromString(x.responseText, "text/xml");
	      } else {
	        blob = x.response;
	      }

	      if (format == "json" && typeof blob == "string") {
	        blob = toJSONForIE(blob);
	      }

	      if (blob == null) {
	        return observer.onError(new RequestError(url, x, "null response with format \"" + format + "\" (error while parsing or wrong content-type)"));
	      }

	      // TODO(pierre): find a better API than this "withMetadata" flag
	      // (it is weird and collisions with responseHeaders)
	      if (withMetadata) {
	        var headers;
	        if (responseHeaders) {
	          headers = getResponseHeadersList(x, responseHeaders);
	        }

	        var size = evt.total;

	        observer.onNext({
	          blob: blob,
	          size: size,
	          duration: duration,
	          headers: headers,
	          url: x.responseURL || url,
	          xhr: x
	        });
	      } else {
	        observer.onNext(blob);
	      }

	      observer.onCompleted();
	    }

	    function onError(e) {
	      observer.onError(new RequestError(url, e, "error event"));
	    }

	    return function () {
	      var readyState = xhr.readyState;

	      if (0 < readyState && readyState < 4) {
	        xhr.removeEventListener("load", onLoad);
	        xhr.removeEventListener("error", onError);
	        xhr.abort();
	      }
	      xhr = null;
	    };
	  });
	}

	var ENTITIES_REG = /[&<>]/g;
	var ENTITIES = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;"
	};

	function escapeXml(xml) {
	  return (xml || "").toString().replace(ENTITIES_REG, function (tag) {
	    return ENTITIES[tag];
	  });
	}

	function objToXML(obj) {
	  var xml = "";
	  for (var attrName in obj) {
	    var attr = obj[attrName];
	    var inner = typeof attr == "object" ? objToXML(attr) : escapeXml(attr);
	    xml += "<" + attrName + ">" + inner + "</" + attrName + ">";
	  }
	  return xml;
	}

	function getNodeTextContent(root, name) {
	  var item = root.querySelector(name);
	  return item && item.textContent;
	}

	var METHOD_CALL_XML = "<RestCallMethod xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">{payload}</RestCallMethod>";

	function restCallMethod(options) {
	  options.method = "POST";
	  options.headers = { "Content-Type": "application/xml" };
	  options.data = METHOD_CALL_XML.replace("{payload}", objToXML(options.data));
	  options.format = "document";
	  // options.url = options.url.replace("RestPortalProvider", "JsonPortalProvider");
	  // options.headers = { "Content-Type": "application/json" };
	  // options.data = JSON.stringify(options.data);
	  // options.format = "json";
	  return request(options).map(function (data) {
	    return RestCallResult(data, options.url, options.ScriptInfo);
	  });
	}

	request.escapeXml = escapeXml;
	request.RequestError = RequestError;
	request.RestCallMethodError = RestCallMethodError;
	request.RestCallResult = RestCallResult;
	request.getNodeTextContent = getNodeTextContent;

	module.exports = request;

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * Average bandwidth rule
	 */

	// Exponential moving-average
	// http://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
	"use strict";

	function ema(a) {
	  return function (s, x) {
	    return s == null ? x : a * x + (1 - a) * s;
	  };
	}

	module.exports = function (metrics, timings) {
	  var options = arguments[2] === undefined ? {} : arguments[2];

	  return metrics.map(function (metric) {
	    return metric.value.response;
	  })
	  // do not take into account small chunks < 2KB. filters out init
	  // segments and small manifests in particular.
	  .filter(function (response) {
	    return response.size > 2000;
	  })
	  // converts response metadata in bits-per-seconds
	  .map(function (response) {
	    return response.size / response.duration * 8000;
	  }).scan(ema(options.alpha));
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var log = __webpack_require__(4);

	var _require = __webpack_require__(3);

	var Observable = _require.Observable;
	var BehaviorSubject = _require.BehaviorSubject;
	var CompositeDisposable = _require.CompositeDisposable;
	var combineLatest = Observable.combineLatest;

	var _require2 = __webpack_require__(5);

	var only = _require2.only;

	var AverageBitrate = __webpack_require__(24);

	var DEFAULTS = {
	  defLanguage: "fra",
	  defSubtitle: "",
	  // default buffer size in seconds
	  defBufSize: 30,
	  // buffer threshold ratio used as a lower bound
	  // margin to find the suitable representation
	  defBufThreshold: 0.3
	};

	function def(x, val) {
	  return x > 0 ? x : val;
	}

	function getClosestBitrate(bitrates, btr) {
	  var threshold = arguments[2] === undefined ? 0 : arguments[2];

	  return _.findLast(bitrates, function (b) {
	    return b / btr <= 1 - threshold;
	  }) || bitrates[0];
	}

	function getClosestDisplayBitrate(reps, width) {
	  var rep = _.find(reps, function (r) {
	    return r.width >= width;
	  });
	  if (rep) return rep.bitrate;else return Infinity;
	}

	function findByLang(adaptations, lang) {
	  if (lang) {
	    return _.find(adaptations, function (a) {
	      return a.lang === lang;
	    });
	  } else {
	    return null;
	  }
	}

	module.exports = function (metrics, timings, deviceEvents) {
	  var options = arguments[3] === undefined ? {} : arguments[3];

	  var _$defaults = _.defaults(options, DEFAULTS);

	  var defLanguage = _$defaults.defLanguage;
	  var defSubtitle = _$defaults.defSubtitle;
	  var defBufSize = _$defaults.defBufSize;
	  var defBufThreshold = _$defaults.defBufThreshold;
	  var videoWidth = deviceEvents.videoWidth;
	  var inBackground = deviceEvents.inBackground;

	  var $languages = new BehaviorSubject(defLanguage);
	  var $subtitles = new BehaviorSubject(defSubtitle);

	  var $averageBitrates = {
	    audio: AverageBitrate(metrics.filter(function (_ref) {
	      var type = _ref.type;
	      return type === "audio";
	    }), timings, { alpha: 0.6 }).publishValue(0),
	    video: AverageBitrate(metrics.filter(function (_ref2) {
	      var type = _ref2.type;
	      return type === "video";
	    }), timings, { alpha: 0.6 }).publishValue(0)
	  };

	  var conns = new CompositeDisposable(_.map(_.values($averageBitrates), function (a) {
	    return a.connect();
	  }));

	  var $usrBitrates = {
	    audio: new BehaviorSubject(Infinity),
	    video: new BehaviorSubject(Infinity)
	  };

	  var $maxBitrates = {
	    audio: new BehaviorSubject(Infinity),
	    video: new BehaviorSubject(Infinity)
	  };

	  var $bufSizes = {
	    audio: new BehaviorSubject(defBufSize),
	    video: new BehaviorSubject(defBufSize),
	    text: new BehaviorSubject(defBufSize)
	  };

	  function audioAdaptationChoice(adaptations) {
	    return $languages.changes().map(function (lang) {
	      return findByLang(adaptations, lang) || adaptations[0];
	    });
	  }

	  function textAdaptationChoice(adaptations) {
	    return $subtitles.changes().map(function (lang) {
	      return findByLang(adaptations, lang);
	    });
	  }

	  function getAdaptationsChoice(type, adaptations) {
	    if (type == "audio") return audioAdaptationChoice(adaptations);

	    if (type == "text") return textAdaptationChoice(adaptations);

	    if (adaptations.length == 1) return only(adaptations[0]);

	    throw new Error("adaptive: unknown type " + type + " for adaptation chooser");
	  }

	  function getBufferAdapters(adaptation) {
	    var type = adaptation.type;
	    var bitrates = adaptation.bitrates;
	    var representations = adaptation.representations;

	    // TODO(pierre): specific algorithm for first representation
	    // selection
	    var firstRep = representations[0];

	    var representationsObservable;
	    if (representations.length > 1) {
	      var usrBitrates = $usrBitrates[type];
	      var maxBitrates = $maxBitrates[type];
	      var avrBitrates = $averageBitrates[type].map(function (b) {
	        return getClosestBitrate(bitrates, b, defBufThreshold);
	      }).changes().customDebounce(2000, { leading: true });

	      if (type == "video") {
	        // To compute the bitrate upper-bound for video
	        // representations we need to combine multiple stream:
	        //   - user-based maximum bitrate (subject)
	        //   - maximum based on the video element width
	        //   - maximum based on the application visibility (background tab)
	        maxBitrates = combineLatest(maxBitrates, videoWidth.map(function (width) {
	          return getClosestDisplayBitrate(representations, width);
	        }), inBackground.map(function (isHidden) {
	          return isHidden ? bitrates[0] : Infinity;
	        }), Math.min);
	      }

	      representationsObservable = combineLatest(usrBitrates, maxBitrates, avrBitrates, function (usr, max, avr) {
	        if (usr < Infinity) return usr;

	        if (max < Infinity) return Math.min(max, avr);

	        return avr;
	      }).map(function (b) {
	        return _.find(representations, function (rep) {
	          return rep.bitrate === getClosestBitrate(bitrates, b);
	        });
	      }).changes(function (r) {
	        return r.id;
	      }).tap(function (r) {
	        return log.info("bitrate", type, r.bitrate);
	      });
	    } else {
	      representationsObservable = only(firstRep);
	    }

	    return {
	      representations: representationsObservable,
	      bufferSizes: $bufSizes[type] || new BehaviorSubject(defBufSize)
	    };
	  }

	  return {
	    setLanguage: function setLanguage(lng) {
	      $languages.onNext(lng);
	    },
	    setSubtitle: function setSubtitle(sub) {
	      $subtitles.onNext(sub);
	    },
	    getLanguage: function getLanguage() {
	      return $languages.value;
	    },
	    getSubtitle: function getSubtitle() {
	      return $subtitles.value;
	    },

	    getAverageBitrates: function getAverageBitrates() {
	      return $averageBitrates;
	    },

	    getAudioMaxBitrate: function getAudioMaxBitrate() {
	      return $maxBitrates.audio.value;
	    },
	    getVideoMaxBitrate: function getVideoMaxBitrate() {
	      return $maxBitrates.video.value;
	    },
	    getAudioBufferSize: function getAudioBufferSize() {
	      return $bufSizes.audio.value;
	    },
	    getVideoBufferSize: function getVideoBufferSize() {
	      return $bufSizes.video.value;
	    },

	    setAudioBitrate: function setAudioBitrate(x) {
	      $usrBitrates.audio.onNext(def(x, Infinity));
	    },
	    setVideoBitrate: function setVideoBitrate(x) {
	      $usrBitrates.video.onNext(def(x, Infinity));
	    },
	    setAudioMaxBitrate: function setAudioMaxBitrate(x) {
	      $maxBitrates.audio.onNext(def(x, Infinity));
	    },
	    setVideoMaxBitrate: function setVideoMaxBitrate(x) {
	      $maxBitrates.video.onNext(def(x, Infinity));
	    },
	    setAudioBufferSize: function setAudioBufferSize(x) {
	      $bufSizes.audio.onNext(def(x, defBufSize));
	    },
	    setVideoBufferSize: function setVideoBufferSize(x) {
	      $bufSizes.video.onNext(def(x, defBufSize));
	    },

	    getBufferAdapters: getBufferAdapters,
	    getAdaptationsChoice: getAdaptationsChoice,

	    dispose: function dispose() {
	      if (conns) {
	        conns.dispose();
	        conns = null;
	      }
	    }
	  };
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var log = __webpack_require__(4);
	var assert = __webpack_require__(2);

	var _require = __webpack_require__(6);

	var BufferedRanges = _require.BufferedRanges;
	var bufferedToArray = _require.bufferedToArray;
	var getGap = _require.getGap;

	var _require2 = __webpack_require__(3);

	var Observable = _require2.Observable;
	var Subject = _require2.Subject;
	var combineLatest = Observable.combineLatest;
	var defer = Observable.defer;
	var empty = Observable.empty;
	var from = Observable.from;
	var just = Observable.just;
	var merge = Observable.merge;
	var timer = Observable.timer;

	var _require3 = __webpack_require__(5);

	var first = _require3.first;
	var on = _require3.on;

	var _require4 = __webpack_require__(41);

	var ArraySet = _require4.ArraySet;

	var _require5 = __webpack_require__(15);

	var IndexHandler = _require5.IndexHandler;
	var OutOfIndexError = _require5.OutOfIndexError;

	var BITRATE_REBUFFERING_RATIO = 1.5;

	function Buffer(_ref) {
	  var sourceBuffer = _ref.sourceBuffer;
	  var adaptation = _ref.adaptation;
	  var pipeline = _ref.pipeline;
	  var adapters = _ref.adapters;
	  var timings = _ref.timings;
	  var seekings // Seekings observable
	  = _ref.seekings;

	  var bufferType = adaptation.type;
	  var isAVBuffer = bufferType == "audio" || bufferType == "video";

	  var outOfIndexStream = new Subject();

	  // safety level (low and high water mark) size of buffer that won't
	  // be flushed when switching representation for smooth transitions
	  // and avoiding buffer underflows
	  var LOW_WATER_MARK_PAD = bufferType == "video" ? 4 : 1;
	  var HIGH_WATER_MARK_PAD = bufferType == "video" ? 6 : 1;

	  function getTsPadding(gap) {
	    if (gap > LOW_WATER_MARK_PAD && gap < Infinity) {
	      return Math.min(gap, HIGH_WATER_MARK_PAD);
	    } else {
	      return 0;
	    }
	  }

	  var representations = adapters.representations;
	  var bufferSizes = adapters.bufferSizes;

	  var ranges = new BufferedRanges();

	  var updateEnd = merge(on(sourceBuffer, "update"), on(sourceBuffer, "error").map(function (evt) {
	    var errMessage = "buffer: error event";
	    log.error(errMessage, evt);
	    throw new Error(errMessage);
	  })).share();

	  // prevents unceasing add/remove event listeners by sharing an
	  // open updateEnd stream (hackish)
	  var mutedUpdateEnd = updateEnd.ignoreElements().startWith(true);

	  function appendBuffer(blob) {
	    sourceBuffer.appendBuffer(blob);
	    return first(updateEnd);
	  }

	  function lockedAppendBuffer(infos) {
	    return defer(function () {
	      var blob = infos.parsed.blob;
	      if (sourceBuffer.updating) {
	        return first(updateEnd).flatMap(function () {
	          return appendBuffer(blob);
	        });
	      } else {
	        return appendBuffer(blob);
	      }
	    }).map(infos);
	  }

	  function createRepresentationBuffer(representation) {
	    var segmentIndex = new IndexHandler(representation);
	    var currentBitrate = representation.bitrate;

	    var queuedSegments = new ArraySet();

	    function filterAlreadyLoaded(segment) {
	      // if this segment is already in the pipeline
	      var isInQueue = queuedSegments.test(segment.id);
	      if (isInQueue) return false;

	      // segment without time info are usually init segments or some
	      // kind of metadata segment that we never filter out
	      if (segment.init || segment.time == null) return true;

	      var time = segmentIndex.scale(segment.time);
	      var duration = segmentIndex.scale(segment.duration);

	      var range = ranges.hasRange(time, duration);
	      if (range) {
	        return range.bitrate * BITRATE_REBUFFERING_RATIO < currentBitrate;
	      } else {
	        return true;
	      }
	    }

	    function getInjectedSegments(timing, bufferSize, withInitSegment) {
	      var segments = [];

	      if (withInitSegment) {
	        log.debug("add init segment", bufferType);
	        segments.push(segmentIndex.getInitSegment());
	      }

	      if (timing.readyState > 0) {
	        // wanted buffer size calculates the actual size of the
	        // buffer we want to ensure, taking into account the
	        // duration and the potential live gap.
	        var endDiff = (timing.duration || Infinity) - timing.ts;
	        var liveGap = timing.liveGap;
	        var wantedBufferSize = Math.max(0, Math.min(bufferSize, liveGap, endDiff));

	        // the ts padding is the actual time gap that we want to
	        // apply to our current timestamp in order to calculate the
	        // list of segments to inject.
	        var sourceBufferGap = getGap(timing.ts, sourceBuffer.buffered);
	        var tsPadding = getTsPadding(sourceBufferGap);

	        var currentRange = ranges.getRange(timing.ts);
	        if (currentRange) {
	          var rangeEndGap = Math.floor(currentRange.end - timing.ts);
	          if (rangeEndGap > tsPadding) tsPadding = rangeEndGap;
	        }

	        // given the current timestamp and the previously calculated
	        // time gap and wanted buffer size, we can retrieve the list
	        // of segments to inject in our pipelines.
	        var mediaSegments = segmentIndex.getSegments(timing.ts, tsPadding, wantedBufferSize);

	        segments = segments.concat(mediaSegments);
	      }

	      // filter out already loaded and already queued segments
	      return _.filter(segments, filterAlreadyLoaded);
	    }

	    var segmentsPipeline = combineLatest(timings, bufferSizes, mutedUpdateEnd, function (timing, bufferSize) {
	      return { timing: timing, bufferSize: bufferSize };
	    }).flatMap(function (_ref2, count) {
	      var timing = _ref2.timing;
	      var bufferSize = _ref2.bufferSize;

	      var firstCall = count === 0;

	      if (isAVBuffer && (firstCall || timing.stalled)) {
	        // side effect to cleanup & synchronize the buffered ranges
	        // object with de native sourceBuffer.buffered ranges in
	        // case some part of the stream have been auto-deleted by
	        // the browser.
	        log.debug("intersect new buffer", bufferType);
	        ranges.intersect(bufferedToArray(sourceBuffer.buffered));
	      }

	      var injectedSegments;
	      try {
	        injectedSegments = getInjectedSegments(timing, bufferSize, firstCall);
	      } catch (err) {
	        // catch OutOfIndexError errors thrown by when we try to
	        // access to non available segments. Reinject this error
	        // into the main buffer observable so that it can be treated
	        // upstream
	        if (err instanceof OutOfIndexError) {
	          outOfIndexStream.onNext({ type: "out-of-index", value: err });
	          return empty();
	        } else {
	          throw err;
	        }

	        // unreachable
	        assert(false);
	      }

	      return from(_.map(injectedSegments, function (segment) {
	        // queue all segments injected in the observable
	        queuedSegments.add(segment.id);

	        return { adaptation: adaptation, representation: representation, segment: segment };
	      }));
	    }).concatMap(pipeline).concatMap(lockedAppendBuffer).map(function (infos) {
	      var segment = infos.segment;
	      var parsed = infos.parsed;

	      queuedSegments.remove(segment.id);

	      // change the timescale if one has been extracted from the
	      // parsed segment (SegmentBase)
	      var timescale = parsed.timescale;
	      if (timescale) {
	        segmentIndex.setTimescale(timescale);
	      }

	      var nextSegments = parsed.nextSegments;
	      var currentSegment = parsed.currentSegment;

	      // added segments are values parsed from the segment metadata
	      // that should be added to the segmentIndex.
	      var addedSegments;
	      if (nextSegments) {
	        addedSegments = segmentIndex.insertNewSegments(nextSegments, currentSegment);
	      } else {
	        addedSegments = [];
	      }

	      // current segment timings informations are used to update
	      // ranges informations
	      if (currentSegment) {
	        ranges.insert(currentBitrate, segmentIndex.scale(currentSegment.ts), segmentIndex.scale(currentSegment.ts + currentSegment.d));
	      }

	      return {
	        type: "segment",
	        value: _.extend({ addedSegments: addedSegments }, infos)
	      };
	    });

	    return merge(segmentsPipeline, outOfIndexStream)["catch"](function (err) {
	      if (err.code !== 412) throw err;

	      // 412 Precondition Failed request errors do not cause the
	      // buffer to stop but are re-emitted in the stream as
	      // "precondition-failed" type. They should be handled re-
	      // adapting the live-gap that the player is holding
	      return just({ type: "precondition-failed", value: err }).concat(timer(2000)).concat(createRepresentationBuffer(representation));
	    });
	  }

	  return combineLatest(representations, seekings, _.identity).flatMapLatest(createRepresentationBuffer);
	}

	module.exports = Buffer;
	// SourceBuffer object
	// Adaptation buffered
	// Segment pipeline
	// { representations, bufferSizes } observables
	// Timings observable

/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	/**
	 * Caching object used to cache initialization segments.
	 * This allow to have a faster representation switch and seeking.
	 */
	"use strict";

	function InitializationSegmentCache() {
	  var cache = {};
	  return {
	    add: function add(_ref, loaded) {
	      var segment = _ref.segment;

	      if (segment.init) {
	        cache[segment.id] = loaded;
	      }
	    },
	    get: function get(_ref2) {
	      var segment = _ref2.segment;

	      if (segment.init) {
	        var value = cache[segment.id];
	        if (value != null) return value;
	      }
	      return null;
	    }
	  };
	}

	module.exports = {
	  InitializationSegmentCache: InitializationSegmentCache
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var log = __webpack_require__(4);

	var _require = __webpack_require__(3);

	var Observable = _require.Observable;
	var merge = Observable.merge;
	var interval = Observable.interval;

	var _require2 = __webpack_require__(5);

	var on = _require2.on;

	var _require$visibilityEvents = __webpack_require__(7).visibilityEvents();

	var hidden = _require$visibilityEvents.hidden;
	var visibilityChange = _require$visibilityEvents.visibilityChange;

	var INACTIVITY_DELAY = 60 * 1000;

	var doc = document;
	var win = window;
	var pixelRatio = win.devicePixelRatio || 1;

	function DeviceEvents(videoElement) {
	  var visibility = on(doc, visibilityChange).map(function () {
	    return doc[hidden];
	  });

	  var isVisible = visibility.filter(function (x) {
	    return x === false;
	  });

	  var isHidden = visibility.customDebounce(INACTIVITY_DELAY).filter(function (x) {
	    return x === true;
	  });

	  var inBackground = merge(isVisible, isHidden).startWith(false);

	  var videoWidth = merge(interval(20000), on(win, "resize").customDebounce(500)).startWith("init").map(function () {
	    return videoElement.clientWidth * pixelRatio;
	  }).changes();

	  return {
	    videoWidth: videoWidth,
	    inBackground: inBackground
	  };
	}

	module.exports = DeviceEvents;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var Timeline = __webpack_require__(16);

	function Base(index) {
	  Timeline.call(this, index);
	}

	Base.getLiveEdge = function () {
	  throw new Error("not implemented");
	};

	_.extend(Base.prototype, Timeline.prototype);

	Base.prototype.addSegment = function (newSegment) {
	  this.index.timeline.push(newSegment);
	  return true;
	};

	module.exports = Base;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);

	function List(index) {
	  this.index = index;
	}

	List.getLiveEdge = function () {
	  throw new Error("not implemented");
	};

	List.prototype.checkRange = function (up) {
	  var _index = this.index;
	  var duration = _index.duration;
	  var list = _index.list;

	  var i = Math.floor(up / duration);
	  return i >= 0 && i < list.length;
	};

	List.prototype.createSegment = function (segmentIndex, time) {
	  var segment = this.index.list[segmentIndex];
	  return {
	    id: segmentIndex,
	    media: segment.media,
	    time: time,
	    number: undefined,
	    range: segment.range,
	    duration: this.index.duration
	  };
	};

	List.prototype.getSegments = function (up, to) {
	  // TODO(pierre): use startNumber
	  var _index2 = this.index;
	  var duration = _index2.duration;
	  var list = _index2.list;

	  var i = Math.floor(up / duration);
	  var l = Math.floor(to / duration);
	  var segments = [];
	  while (i < l) {
	    segments.push(this.createSegment(i, i * duration));
	    i++;
	  }
	  return segments;
	};

	List.prototype.addSegment = function () {
	  return false;
	};

	module.exports = List;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);

	function Template(index) {
	  this.index = index;
	}

	Template.getLiveEdge = function (videoIndex, manifest) {
	  return Date.now() / 1000 - manifest.availabilityStartTime - manifest.suggestedPresentationDelay;
	};

	Template.prototype.checkRange = function () {
	  return true;
	};

	Template.prototype.createSegment = function (ts) {
	  var _index = this.index;
	  var startNumber = _index.startNumber;
	  var duration = _index.duration;

	  if (startNumber == null) startNumber = 1;

	  var number = Math.floor(ts / duration) + startNumber;
	  var time = number * duration;

	  return {
	    id: number,
	    media: this.index.media,
	    time: time,
	    number: number,
	    range: undefined,
	    duration: this.index.duration
	  };
	};

	Template.prototype.getSegments = function (up, to) {
	  var duration = this.index.duration;

	  var segments = [];
	  for (var time = up; time <= to; time += duration) {
	    segments.push(this.createSegment(time));
	  }

	  return segments;
	};

	Template.prototype.addSegment = function () {
	  return false;
	};

	module.exports = Template;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var log = __webpack_require__(4);

	var _require = __webpack_require__(3);

	var Subject = _require.Subject;
	var Observable = _require.Observable;

	var _require2 = __webpack_require__(5);

	var retryWithBackoff = _require2.retryWithBackoff;
	var fromPromise = Observable.fromPromise;
	var just = Observable.just;

	var noCache = {
	  add: function add() {},
	  get: function get() {
	    return null;
	  }
	};

	/**
	 * Creates the following pipeline:
	 *   Infos
	 *      => [resolver] Infos -> ResolvedInfos
	 *      => [loader]   ResolvedInfos -> Response
	 *      => [parser]   (Response, ResolvedInfos) -> ParsedInfos
	 *      => { ...ResolvedInfos, ...ParsedInfos }
	 *
	 * TODO(pierre): create a pipeline patcher to work over a WebWorker
	 */
	function createPipeline(type, _ref, metrics) {
	  var resolver = _ref.resolver;
	  var loader = _ref.loader;
	  var parser = _ref.parser;
	  var opts = arguments[3] === undefined ? {} : arguments[3];

	  if (!parser) parser = just;
	  if (!loader) loader = just;
	  if (!resolver) resolver = just;

	  var _$defaults = _.defaults(opts, {
	    totalRetry: 3,
	    timeout: 10 * 1000,
	    cache: noCache
	  });

	  var totalRetry = _$defaults.totalRetry;
	  var timeout = _$defaults.timeout;
	  var cache = _$defaults.cache;

	  var backoffOptions = {
	    retryDelay: 500,
	    totalRetry: totalRetry,
	    shouldRetry: function shouldRetry(err) {
	      return err.code == 500 || /timeout/.test(err.message) || /request: error event/.test(err.message);
	    }
	  };

	  function callLoader(resolvedInfos) {
	    return loader(resolvedInfos).simpleTimeout(timeout, "timeout").map(function (response) {
	      var loadedInfos = _.extend({ response: response }, resolvedInfos);

	      // add loadedInfos to the pipeline cache
	      cache.add(resolvedInfos, loadedInfos);

	      // emit loadedInfos in the metrics observer
	      metrics.onNext({ type: type, value: loadedInfos });

	      return loadedInfos;
	    });
	  }

	  return function (infos) {
	    return resolver(infos).flatMap(function (resolvedInfos) {
	      var backedOffLoader = retryWithBackoff(function () {
	        return callLoader(resolvedInfos);
	      }, backoffOptions);

	      var fromCache = cache.get(resolvedInfos);
	      if (_.isPromise(fromCache)) return fromPromise(fromCache)["catch"](backedOffLoader);

	      if (fromCache === null) return backedOffLoader();else return just(fromCache);
	    }).flatMap(function (loadedInfos) {
	      return parser(loadedInfos).map(function (parsed) {
	        return _.extend({ parsed: parsed }, loadedInfos);
	      });
	    });
	  };
	}

	function PipeLines() {
	  // the metrics observer/observable is used to calculate informations
	  // about loaded responsed in the loader part of pipelines
	  var metrics = new Subject();

	  var createPipelines = function createPipelines(transport, options) {
	    options = options || {};

	    var ps = [];
	    for (var pipelineType in transport) {
	      ps[pipelineType] = createPipeline(pipelineType, transport[pipelineType], metrics, options[pipelineType]);
	    }

	    return ps;
	  };

	  return { createPipelines: createPipelines, metrics: metrics };
	}

	module.exports = PipeLines;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var Promise_ = __webpack_require__(8);

	var _ = __webpack_require__(1);
	var log = __webpack_require__(4);

	var _require = __webpack_require__(3);

	var CompositeDisposable = _require.CompositeDisposable;
	var BehaviorSubject = _require.BehaviorSubject;
	var Observable = _require.Observable;
	var Subject = _require.Subject;
	var combineLatest = Observable.combineLatest;
	var defer = Observable.defer;
	var zip = Observable.zip;

	var _require2 = __webpack_require__(5);

	var on = _require2.on;

	var EventEmitter = __webpack_require__(10);
	var debugPane = __webpack_require__(42);
	var assert = __webpack_require__(2);

	var _require3 = __webpack_require__(7);

	var HTMLVideoElement_ = _require3.HTMLVideoElement_;
	var exitFullscreen = _require3.exitFullscreen;
	var requestFullscreen = _require3.requestFullscreen;
	var _isFullscreen = _require3.isFullscreen;
	var onFullscreenChange = _require3.onFullscreenChange;

	var _require4 = __webpack_require__(18);

	var timingsSampler = _require4.timingsSampler;
	var toWallClockTime = _require4.toWallClockTime;
	var fromWallClockTime = _require4.fromWallClockTime;
	var getLiveGap = _require4.getLiveGap;

	var _require5 = __webpack_require__(27);

	var InitializationSegmentCache = _require5.InitializationSegmentCache;

	var _require6 = __webpack_require__(6);

	var getSize = _require6.getSize;
	var getLoaded = _require6.getLoaded;

	var _require7 = __webpack_require__(36);

	var parseTimeFragment = _require7.parseTimeFragment;

	var DeviceEvents = __webpack_require__(28);
	var manifestHelpers = __webpack_require__(17);
	// TODO(pierre): separate transports from main build
	var Transports = __webpack_require__(40);
	var PipeLines = __webpack_require__(32);
	var Adaptive = __webpack_require__(25);
	var Stream = __webpack_require__(34);
	var EME = __webpack_require__(14);

	var PLAYER_STOPPED = "STOPPED";
	var PLAYER_LOADED = "LOADED";
	var PLAYER_LOADING = "LOADING";
	var PLAYER_PLAYING = "PLAYING";
	var PLAYER_PAUSED = "PAUSED";
	var PLAYER_ENDED = "ENDED";
	var PLAYER_BUFFERING = "BUFFERING";
	var PLAYER_SEEKING = "SEEKING";

	var CHEAT = "&&((%'%'"; // Konami Code

	function createDirectFileManifest() {
	  return {
	    isLive: false,
	    duration: Infinity
	  };
	}

	function assertMan(player) {
	  assert(player.man, "player: no manifest loaded");
	}

	function filterStreamByType(stream, type) {
	  return stream.filter(function (o) {
	    return o.type == type;
	  }).pluck("value");
	}

	function Player() {
	  var _this = this;

	  var options = arguments[0] === undefined ? {} : arguments[0];

	  EventEmitter.call(this);

	  var videoElement = options.videoElement;
	  var transport = options.transport;
	  var transportOptions = options.transportOptions;
	  var proxy = options.proxy;

	  this.defaultTransport = transport;
	  this.defaultTransportOptions = _.extend({ proxy: proxy }, transportOptions || {});

	  if (!videoElement) videoElement = document.createElement("video");

	  assert(videoElement instanceof HTMLVideoElement_, "requires an actual HTMLVideoElement");

	  this.version = ("0.8.1");
	  this.video = videoElement;

	  // fullscreen change
	  this.fullscreen = onFullscreenChange(videoElement).subscribe(function () {
	    return _this.trigger("fullscreenChange", _this.isFullscreen());
	  });

	  // playing state change
	  this.playing = new BehaviorSubject();

	  // multicaster forwarding all streams events
	  this.stream = new Subject();

	  var _PipeLines = PipeLines();

	  var createPipelines = _PipeLines.createPipelines;
	  var metrics = _PipeLines.metrics;

	  var timings = timingsSampler(videoElement);
	  var deviceEvents = DeviceEvents(videoElement);
	  var adaptive = Adaptive(metrics, timings, deviceEvents);
	  _.extend(this, {
	    createPipelines: createPipelines,
	    metrics: metrics,
	    timings: timings,
	    adaptive: adaptive
	  });

	  // volume muted memory
	  this.muted = 0.1;

	  // states
	  this._setState(PLAYER_STOPPED);
	  this.resetStates();

	  this.log = log;

	  on(document, "keydown").map(function (e) {
	    return String.fromCharCode(e.which).toLowerCase();
	  }).scan("", function (w, l) {
	    return (w + l).slice(-CHEAT.length);
	  }).filter(function (w) {
	    return w == CHEAT;
	  }).subscribe(function () {
	    return _this.showDebug();
	  });
	}

	Player.prototype = _.extend({}, EventEmitter.prototype, {
	  resetStates: function resetStates() {
	    this.man = null;
	    this.reps = { video: null, audio: null, text: null };
	    this.adas = { video: null, audio: null, text: null };
	    this.evts = {};
	    this.frag = { start: null, end: null };
	  },

	  _clear: function _clear() {
	    if (this.subscriptions) {
	      this.subscriptions.dispose();
	      this.subscriptions = null;
	    }
	  },

	  stop: function stop() {
	    if (this.state !== PLAYER_STOPPED) {
	      this.resetStates();
	      this._clear();
	      this._setState(PLAYER_STOPPED);
	    }
	  },

	  dispose: function dispose() {
	    this.stop();
	    this.metrics.dispose();
	    this.adaptive.dispose();
	    this.fullscreen.dispose();
	    this.stream.dispose();

	    this.metrics = null;
	    this.adaptive = null;
	    this.fullscreen = null;
	    this.stream = null;

	    this.timings = null;
	    this.createPipelines = null;
	    this.video = null;
	  },

	  __recordState: function __recordState(type, value) {
	    var prev = this.evts[type];
	    if (prev !== value) {
	      this.evts[type] = value;
	      this.trigger("" + type + "Change", value);
	    }
	  },

	  _parseOptions: function _parseOptions(opts) {
	    var _$defaults = _.defaults(_.cloneObject(opts), {
	      transport: this.defaultTransport,
	      transportOptions: this.defaultTransportOptions,
	      keySystems: [],
	      timeFragment: {},
	      subtitles: [],
	      autoPlay: false,
	      directFile: false
	    });

	    var transport = _$defaults.transport;
	    var transportOptions = _$defaults.transportOptions;
	    var proxy = _$defaults.proxy;
	    var url = _$defaults.url;
	    var manifests = _$defaults.manifests;
	    var keySystems = _$defaults.keySystems;
	    var timeFragment = _$defaults.timeFragment;
	    var subtitles = _$defaults.subtitles;
	    var autoPlay = _$defaults.autoPlay;
	    var directFile = _$defaults.directFile;

	    assert(!!manifests ^ !!url, "player: you have to pass either a url or a list of manifests");

	    timeFragment = parseTimeFragment(timeFragment);

	    if (manifests) {
	      var firstManifest = manifests[0];
	      url = firstManifest.url;
	      subtitles = firstManifest.subtitles || [];
	      keySystems = _.compact(_.pluck(manifests, "keySystem"));
	    }

	    if (_.isString(transport)) transport = Transports[transport];

	    if (_.isFunction(transport))
	      // retro-compat for proxy options now included in a more generic
	      // transportOptions field
	      transport = transport(_.defaults({ proxy: proxy }, transportOptions));

	    if (directFile) directFile = createDirectFileManifest();

	    return { url: url, keySystems: keySystems, subtitles: subtitles, timeFragment: timeFragment, autoPlay: autoPlay, transport: transport, directFile: directFile };
	  },

	  loadVideo: function loadVideo() {
	    var _this2 = this;

	    var options = arguments[0] === undefined ? {} : arguments[0];

	    options = this._parseOptions(options);
	    log.info("loadvideo", options);

	    var url = options.url;
	    var keySystems = options.keySystems;
	    var subtitles = options.subtitles;
	    var timeFragment = options.timeFragment;
	    var autoPlay = options.autoPlay;
	    var transport = options.transport;
	    var directFile = options.directFile;

	    this.stop();
	    this.frag = timeFragment;
	    this.playing.onNext(autoPlay);

	    var pipelines = this.createPipelines(transport, {
	      segment: {
	        cache: InitializationSegmentCache()
	      }
	    });

	    var adaptive = this.adaptive;
	    var timings = this.timings;
	    var video = this.video;

	    var stream;
	    try {
	      stream = Stream({
	        url: url,
	        keySystems: keySystems,
	        subtitles: subtitles,
	        timings: timings,
	        timeFragment: timeFragment,
	        adaptive: adaptive,
	        pipelines: pipelines,
	        videoElement: video,
	        autoPlay: autoPlay,
	        directFile: directFile
	      });
	    } catch (err) {
	      stream = defer(function () {
	        throw err;
	      });
	    }

	    stream = stream.publish();

	    var segments = filterStreamByType(stream, "segment");
	    var manifest = filterStreamByType(stream, "manifest").take(1);

	    var stalled = filterStreamByType(stream, "stalled").startWith(null);
	    var canPlay = filterStreamByType(stream, "loaded").filter(function (v) {
	      return v === true;
	    });

	    var loaded = directFile ? canPlay.take(1) : zip(canPlay, segments.filter(function (_ref) {
	      var adaptation = _ref.adaptation;
	      return adaptation.type == "audio";
	    }), segments.filter(function (_ref2) {
	      var adaptation = _ref2.adaptation;
	      return adaptation.type == "video";
	    }), _.noop).take(1);

	    var stateChanges = loaded.map(PLAYER_LOADED).concat(combineLatest(this.playing, stalled, function (isPlaying, isStalled) {
	      if (isStalled) return isStalled.name == "seeking" ? PLAYER_SEEKING : PLAYER_BUFFERING;

	      if (isPlaying) return PLAYER_PLAYING;

	      return PLAYER_PAUSED;
	    })).changes().startWith(PLAYER_LOADING);

	    this.subscriptions = new CompositeDisposable();
	    var subs = [on(video, ["play", "pause"]).each(function (evt) {
	      return _this2.playing.onNext(evt.type == "play");
	    }), segments.each(function (segment) {
	      var type = segment.adaptation.type;

	      var rep = segment.representation;
	      var ada = segment.adaptation;
	      _this2.reps[type] = rep;
	      _this2.adas[type] = ada;

	      if (type == "text") {
	        _this2.__recordState("subtitle", ada.lang);
	      }
	      if (type == "video") {
	        _this2.__recordState("videoBitrate", rep.bitrate);
	      }
	      if (type == "audio") {
	        _this2.__recordState("language", ada.lang);
	        _this2.__recordState("audioBitrate", rep.bitrate);
	      }

	      _this2.trigger("progress", segment);
	    }), manifest.each(function (m) {
	      _this2.man = m;
	      _this2.trigger("manifestChange", m);
	    }), stateChanges.each(function (s) {
	      return _this2._setState(s);
	    }), timings.each(function (t) {
	      if (!_this2.man) return;

	      if (_this2.man.isLive && t.ts > 0) {
	        t.wallClockTime = toWallClockTime(t.ts, _this2.man);
	        t.liveGap = getLiveGap(t.ts, _this2.man);
	      }

	      _this2.trigger("currentTimeChange", t);
	    }), stream.subscribe(function () {}, function (e) {
	      _this2.resetStates();
	      _this2.trigger("error", e);
	      _this2._setState(PLAYER_STOPPED);
	      _this2._clear();
	    }, function () {
	      _this2.resetStates();
	      _this2._setState(PLAYER_ENDED);
	      _this2._clear();
	    }), stream.subscribe(function (n) {
	      return _this2.stream.onNext(n);
	    }, function (e) {
	      return _this2.stream.onNext({ type: "error", value: e });
	    }), stream.connect()];

	    _.each(subs, function (s) {
	      return _this2.subscriptions.add(s);
	    });

	    return loaded.toPromise();
	  },

	  _setState: function _setState(s) {
	    if (this.state !== s) {
	      this.state = s;
	      this.trigger("playerStateChange", s);
	    }
	  },

	  getManifest: function getManifest() {
	    return this.man;
	  },

	  getVideoElement: function getVideoElement() {
	    return this.video;
	  },

	  getNativeTextTrack: function getNativeTextTrack() {
	    return this.video.textTracks[0];
	  },

	  getPlayerState: function getPlayerState() {
	    return this.state;
	  },

	  isLive: function isLive() {
	    assertMan(this);
	    return this.man.isLive;
	  },

	  getUrl: function getUrl() {
	    assertMan(this);
	    return this.man.baseURL;
	  },

	  getVideoDuration: function getVideoDuration() {
	    return this.video.duration;
	  },

	  getVideoLoadedTime: function getVideoLoadedTime() {
	    return getSize(this.video.currentTime, this.video.buffered);
	  },

	  getVideoPlayedTime: function getVideoPlayedTime() {
	    return getLoaded(this.video.currentTime, this.video.buffered);
	  },

	  getCurrentTime: function getCurrentTime() {
	    if (!this.man) return NaN;
	    var ct = this.video.currentTime;
	    if (this.man.isLive) {
	      return toWallClockTime(ct, this.man);
	    } else {
	      return ct;
	    }
	  },

	  getStartTime: function getStartTime() {
	    return this.frag.start;
	  },

	  getEndTime: function getEndTime() {
	    return this.frag.end;
	  },

	  getPlaybackRate: function getPlaybackRate() {
	    return this.video.playbackRate;
	  },

	  getVolume: function getVolume() {
	    return this.video.volume;
	  },

	  isFullscreen: function isFullscreen() {
	    return _isFullscreen();
	  },

	  getAvailableLanguages: function getAvailableLanguages() {
	    return this.man && manifestHelpers.getAvailableLanguages(this.man) || [];
	  },

	  getAvailableSubtitles: function getAvailableSubtitles() {
	    return this.man && manifestHelpers.getAvailableSubtitles(this.man) || [];
	  },

	  getLanguage: function getLanguage() {
	    return this.adaptive.getLanguage();
	  },

	  getSubtitle: function getSubtitle() {
	    return this.adaptive.getSubtitle();
	  },

	  getAvailableVideoBitrates: function getAvailableVideoBitrates() {
	    var video = this.adas.video;
	    return video && video.bitrates || [];
	  },

	  getAvailableAudioBitrates: function getAvailableAudioBitrates() {
	    var audio = this.adas.audio;
	    return audio && audio.bitrates || [];
	  },

	  getVideoBitrate: function getVideoBitrate() {
	    return this.evts.videoBitrate;
	  },

	  getAudioBitrate: function getAudioBitrate() {
	    return this.evts.audioBitrate;
	  },

	  getVideoMaxBitrate: function getVideoMaxBitrate() {
	    return this.adaptive.getVideoMaxBitrate();
	  },

	  getAudioMaxBitrate: function getAudioMaxBitrate() {
	    return this.adaptive.getAudioMaxBitrate();
	  },

	  getVideoBufferSize: function getVideoBufferSize() {
	    return this.adaptive.getVideoBufferSize();
	  },

	  getAudioBufferSize: function getAudioBufferSize() {
	    return this.adaptive.getAudioBufferSize();
	  },

	  getAverageBitrates: function getAverageBitrates() {
	    return this.adaptive.getAverageBitrates();
	  },

	  getMetrics: function getMetrics() {
	    return this.metrics;
	  },

	  getTimings: function getTimings() {
	    return this.timings;
	  },

	  play: function play() {
	    this.video.play();
	  },

	  pause: function pause() {
	    this.video.pause();
	  },

	  setPlaybackRate: function setPlaybackRate(rate) {
	    var _this3 = this;

	    return new Promise_(function (res) {
	      return res(_this3.video.playbackRate = rate);
	    });
	  },

	  goToStart: function goToStart() {
	    return this.seekTo(this.getStartTime());
	  },

	  seekTo: function seekTo(time) {
	    var _this4 = this;

	    return new Promise_(function (res) {
	      assert(_this4.man);
	      var currentTs = _this4.video.currentTime;
	      if (_this4.man.isLive) time = fromWallClockTime(time, _this4.man);
	      if (time !== currentTs) {
	        log.info("seek to", time);
	        res(_this4.video.currentTime = time);
	      } else {
	        res(currentTs);
	      }
	    });
	  },

	  setFullscreen: function setFullscreen() {
	    var toggle = arguments[0] === undefined ? true : arguments[0];

	    if (toggle === false) exitFullscreen();else requestFullscreen(this.video);
	  },

	  setVolume: function setVolume(volume) {
	    if (volume !== this.video.volume) {
	      this.video.volume = volume;
	      this.trigger("volumeChange", volume);
	    }
	  },

	  mute: function mute() {
	    this.muted = this.getVolume() || 0.1;
	    this.setVolume(0);
	  },

	  unMute: function unMute() {
	    var vol = this.getVolume();
	    if (vol === 0) this.setVolume(this.muted);
	  },

	  setLanguage: function setLanguage(lng) {
	    var _this5 = this;

	    // TODO(pierre): proper promise
	    return new Promise_(function (res) {
	      assert(_.contains(_this5.getAvailableLanguages(), lng), "player: unknown language");
	      res(_this5.adaptive.setLanguage(lng));
	    });
	  },

	  setSubtitle: function setSubtitle(sub) {
	    var _this6 = this;

	    // TODO(pierre): proper promise
	    return new Promise_(function (res) {
	      assert(!sub || _.contains(_this6.getAvailableSubtitles(), sub), "player: unknown subtitle");
	      res(_this6.adaptive.setSubtitle(sub || ""));
	    }).then(function () {
	      if (!sub) _this6.__recordState("subtitle", null);
	    });
	  },

	  setVideoBitrate: function setVideoBitrate(btr) {
	    var _this7 = this;

	    // TODO(pierre): proper promise
	    return new Promise_(function (res) {
	      assert(btr === 0 || _.contains(_this7.getAvailableVideoBitrates(), btr), "player: video bitrate unavailable");
	      res(_this7.adaptive.setVideoBitrate(btr));
	    });
	  },

	  setAudioBitrate: function setAudioBitrate(btr) {
	    var _this8 = this;

	    // TODO(pierre): proper promise
	    return new Promise_(function (res) {
	      assert(btr === 0 || _.contains(_this8.getAvailableAudioBitrates(), btr), "player: audio bitrate unavailable");
	      res(_this8.adaptive.setAudioBitrate(btr));
	    });
	  },

	  setVideoMaxBitrate: function setVideoMaxBitrate(btr) {
	    var _this9 = this;

	    // TODO(pierre): proper promise
	    return new Promise_(function (res) {
	      res(_this9.adaptive.setVideoMaxBitrate(btr));
	    });
	  },

	  setAudioMaxBitrate: function setAudioMaxBitrate(btr) {
	    var _this10 = this;

	    // TODO(pierre): proper promise
	    return new Promise_(function (res) {
	      res(_this10.adaptive.setAudioMaxBitrate(btr));
	    });
	  },

	  setVideoBufferSize: function setVideoBufferSize(size) {
	    var _this11 = this;

	    // TODO(pierre): proper promise
	    return new Promise_(function (res) {
	      return res(_this11.adaptive.setVideoBufferSize(size));
	    });
	  },

	  setAudioBufferSize: function setAudioBufferSize(size) {
	    var _this12 = this;

	    // TODO(pierre): proper promise
	    return new Promise_(function (res) {
	      return res(_this12.adaptive.setAudioBufferSize(size));
	    });
	  },

	  getStreamObservable: function getStreamObservable() {
	    return this.stream;
	  },

	  getDebug: function getDebug() {
	    return debugPane.getDebug(this);
	  },

	  showDebug: function showDebug() {
	    debugPane.showDebug(this, this.video);
	  },

	  hideDebug: function hideDebug() {
	    debugPane.hideDebug();
	  },

	  toggleDebug: function toggleDebug() {
	    debugPane.toggleDebug(this, this.video);
	  },
	  getCurrentKeySystem: function getCurrentKeySystem() {
	    return EME.getCurrentKeySystem();
	  }
	});

	module.exports = Player;
	// retro-compat

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var log = __webpack_require__(4);
	var assert = __webpack_require__(2);

	var _require = __webpack_require__(3);

	var Observable = _require.Observable;

	var _require2 = __webpack_require__(5);

	var first = _require2.first;
	var on = _require2.on;

	var _require3 = __webpack_require__(18);

	var getLiveGap = _require3.getLiveGap;
	var seekingsSampler = _require3.seekingsSampler;
	var fromWallClockTime = _require3.fromWallClockTime;

	var _require4 = __webpack_require__(5);

	var retryWithBackoff = _require4.retryWithBackoff;
	var empty = Observable.empty;
	var never = Observable.never;
	var just = Observable.just;
	var merge = Observable.merge;
	var zip = Observable.zip;

	var min = Math.min;

	var _require5 = __webpack_require__(7);

	var MediaSource_ = _require5.MediaSource_;
	var sourceOpen = _require5.sourceOpen;
	var loadedMetadataEvent = _require5.loadedMetadataEvent;

	var TextSourceBuffer = __webpack_require__(35);

	var _require6 = __webpack_require__(6);

	var getNextRangeGap = _require6.getNextRangeGap;

	var _require7 = __webpack_require__(15);

	var getLiveEdge = _require7.getLiveEdge;

	var Buffer = __webpack_require__(26);
	var EME = __webpack_require__(14);

	var _require8 = __webpack_require__(17);

	var normalizeManifest = _require8.normalizeManifest;
	var mergeManifestsIndex = _require8.mergeManifestsIndex;
	var mutateManifestLiveGap = _require8.mutateManifestLiveGap;
	var getAdaptations = _require8.getAdaptations;

	var END_OF_PLAY = 0.2;
	var TOTAL_RETRY_COUNT = 3;

	// discontinuity threshold in seconds
	var DISCONTINUITY_THRESHOLD = 1;

	function plugDirectFile(url, video) {
	  return Observable.create(function (observer) {
	    video.src = url;
	    observer.onNext({ url: url });
	    return function () {
	      video.src = "";
	    };
	  });
	}

	function Stream(_ref) {
	  var url = _ref.url;
	  var keySystems = _ref.keySystems;
	  var subtitles = _ref.subtitles;
	  var timings = _ref.timings;
	  var timeFragment = _ref.timeFragment;
	  var adaptive = _ref.adaptive;
	  var pipelines = _ref.pipelines;
	  var videoElement = _ref.videoElement;
	  var autoPlay = _ref.autoPlay;
	  var directFile = _ref.directFile;

	  assert(MediaSource_, "player: browser is required to support MediaSource");

	  var fragStartTime = timeFragment.start;
	  var fragEndTime = timeFragment.end;
	  var fragEndTimeIsFinite = fragEndTime < Infinity;

	  var manifestPipeline = pipelines.manifest;

	  var nativeBuffers = {};
	  var customBuffers = {};

	  function isNativeBuffer(bufferType) {
	    return bufferType == "audio" || bufferType == "video";
	  }

	  function createSourceBuffer(video, mediaSource, bufferInfos) {
	    var type = bufferInfos.type;
	    var codec = bufferInfos.codec;

	    var sourceBuffer;

	    if (isNativeBuffer(type)) {

	      if (nativeBuffers[type]) {
	        sourceBuffer = nativeBuffers[type];
	      } else {
	        log.info("add sourcebuffer", codec);
	        sourceBuffer = mediaSource.addSourceBuffer(codec);
	        nativeBuffers[type] = sourceBuffer;
	      }
	    } else {

	      var oldSourceBuffer = customBuffers[type];
	      if (oldSourceBuffer) {
	        try {
	          oldSourceBuffer.abort();
	        } catch (e) {
	          log.warn(e);
	        } finally {
	          delete customBuffers[type];
	        }
	      }

	      if (type == "text") {
	        log.info("add text sourcebuffer", codec);
	        sourceBuffer = new TextSourceBuffer(video, codec);
	      }
	      // else if (type == "image") {
	      //    ...
	      // }
	      else {
	        var errMessage = "stream: unknown buffer type " + type;
	        log.error(errMessage);
	        throw new Error(errMessage);
	      }

	      customBuffers[type] = sourceBuffer;
	    }

	    return sourceBuffer;
	  }

	  function disposeSourceBuffer(video, mediaSource, bufferInfos) {
	    var type = bufferInfos.type;

	    var oldSourceBuffer;

	    var isNative = isNativeBuffer(type);
	    if (isNative) {
	      oldSourceBuffer = nativeBuffers[type];
	      delete nativeBuffers[type];
	    } else {
	      oldSourceBuffer = customBuffers[type];
	      delete customBuffers[type];
	    }

	    if (oldSourceBuffer) {
	      try {
	        oldSourceBuffer.abort();

	        if (isNative) mediaSource.removeSourceBuffer(oldSourceBuffer);
	      } catch (e) {
	        log.warn(e);
	      }
	    }
	  }

	  function createAndPlugMediaSource(url, video) {
	    return Observable.create(function (observer) {
	      var mediaSource = new MediaSource_();
	      var objectURL = video.src = URL.createObjectURL(mediaSource);

	      observer.onNext({ url: url, mediaSource: mediaSource });
	      log.info("create mediasource object", objectURL);

	      return function () {
	        video.src = "";

	        if (mediaSource && mediaSource.readyState !== "closed") {
	          var state = mediaSource.readyState;
	          _.each(_.cloneArray(mediaSource.sourceBuffers), function (sourceBuffer) {
	            try {
	              if (state == "open") sourceBuffer.abort();

	              if (state != "closed") mediaSource.removeSourceBuffer(sourceBuffer);
	            } catch (e) {
	              log.warn("error while disposing souceBuffer", e);
	            }
	          });
	        }

	        _.each(_.keys(customBuffers), function (sourceBufferType) {
	          var sourceBuffer = customBuffers[sourceBufferType];
	          try {
	            sourceBuffer.abort();
	          } catch (e) {
	            log.warn("error while disposing souceBuffer", e);
	          }
	        });

	        if (objectURL) {
	          URL.revokeObjectURL(objectURL);
	        }

	        nativeBuffers = null;
	        customBuffers = null;

	        mediaSource = null;
	        objectURL = null;
	      };
	    });
	  }

	  function createTimings(manifest) {
	    var augmentedTimings = timings.map(function (timing) {
	      var clonedTiming;
	      if (fragEndTimeIsFinite) {
	        clonedTiming = _.cloneObject(timing);
	        clonedTiming.ts = min(timing.ts, fragEndTime);
	        clonedTiming.duration = min(timing.duration, fragEndTime);
	      } else {
	        clonedTiming = timing;
	      }
	      clonedTiming.liveGap = getLiveGap(timing.ts, manifest);
	      return clonedTiming;
	    });

	    var seekings = seekingsSampler(augmentedTimings);

	    return {
	      timings: augmentedTimings,
	      seekings: seekings
	    };
	  }

	  /**
	   * End-Of-Play stream popping a value when timings reaches the end of the
	   * video
	   */
	  var endOfPlay = timings.filter(function (_ref2) {
	    var ts = _ref2.ts;
	    var duration = _ref2.duration;
	    return duration > 0 && min(duration, fragEndTime) - ts < END_OF_PLAY;
	  }).take(1).share();

	  if (directFile) {
	    return plugDirectFile(url, videoElement).flatMap(createDirectFileStream).takeUntil(endOfPlay);
	  }

	  /**
	   * Wait for manifest and media-source to open before initializing source
	   * duration and creating buffers
	   */
	  var createAllStream = retryWithBackoff(function (_ref3) {
	    var url = _ref3.url;
	    var mediaSource = _ref3.mediaSource;

	    var sourceOpening = sourceOpen(mediaSource);

	    return manifestPipeline({ url: url }).zip(sourceOpening, _.identity).flatMap(function (_ref4) {
	      var parsed = _ref4.parsed;

	      var manifest = normalizeManifest(parsed.url, parsed.manifest, subtitles);

	      setDuration(mediaSource, manifest);

	      return createStream(mediaSource, manifest);
	    });
	  }, {
	    retryDelay: 500,
	    totalRetry: TOTAL_RETRY_COUNT,
	    resetDelay: 60 * 1000,
	    shouldRetry: function shouldRetry(err, tryCount) {
	      if (/MEDIA_ERR/.test(err.message)) {
	        return false;
	      } else {
	        log.warn("stream retry", err, tryCount);
	        return true;
	      }
	    }
	  });

	  return createAndPlugMediaSource(url, videoElement).flatMap(createAllStream).takeUntil(endOfPlay);

	  /**
	   * Creates a stream of audio/video/text buffers given a set of
	   * adaptations and a codec information.
	   *
	   * For each buffer stream, a unique "sourceBuffer" observable is
	   * created that will be reused for each created buffer.
	   *
	   * An "adaptations choice" observable is also created and
	   * responsible for changing the video or audio adaptation choice in
	   * reaction to user choices (ie. changing the language).
	   */
	  function createBuffer(mediaSource, bufferInfos, timings, seekings) {
	    var type = bufferInfos.type;

	    var adaptations = adaptive.getAdaptationsChoice(type, bufferInfos.adaptations);

	    if (true) assert(pipelines[type], "stream: no pipeline found for type " + type);

	    return adaptations.flatMapLatest(function (adaptation) {
	      if (!adaptation) {
	        disposeSourceBuffer(videoElement, mediaSource, bufferInfos);
	        return never();
	      }

	      var adapters = adaptive.getBufferAdapters(adaptation);
	      var buffer = Buffer({
	        sourceBuffer: createSourceBuffer(videoElement, mediaSource, bufferInfos),
	        pipeline: pipelines[type],
	        adaptation: adaptation,
	        timings: timings,
	        seekings: seekings,
	        adapters: adapters
	      });

	      // non native buffer should not impact on the stability of the
	      // player. ie: if a text buffer sends an error, we want to
	      // continue streaming without any subtitles
	      if (!isNativeBuffer(type)) {
	        return buffer["catch"](function (err) {
	          log.error("buffer", type, "has crashed", err);
	          return empty();
	        });
	      }

	      return buffer;
	    });
	  }

	  /**
	   * Creates a stream waiting for the "loadedmetadata" and "canplay"
	   * events.
	   *
	   * This stream also the side effect of setting the initial time as soon as
	   * the loadedmetadata event pops up.
	   */
	  function createLoadedMetadata(manifest) {
	    var loadedMetadata = loadedMetadataEvent(videoElement).tap(function () {
	      return setInitialTime(manifest);
	    });

	    var canPlay = on(videoElement, "canplay").tap(function () {
	      log.info("canplay event");
	      if (autoPlay) videoElement.play();
	      autoPlay = true;
	    });

	    return first(zip(loadedMetadata, canPlay, _.noop)).map({ type: "loaded", value: true }).startWith({ type: "loaded", value: false });
	  }

	  function createEME(manifest) {
	    if (keySystems && keySystems.length) {
	      // TODO(pierre): leave ability to chose session persistency
	      return EME(videoElement, keySystems, { persistedSessions: manifest.isLive });
	    } else {
	      return EME.onEncrypted(videoElement).map(function () {
	        var errMessage = "eme: ciphered media and no keySystem passed";
	        log.error(errMessage);
	        throw new Error(errMessage);
	      });
	    }
	  }

	  /**
	   * Extracted stalled info changing over-time from timings. This
	   * stream has a side-effect of the <video> playbackRate property.
	   *
	   * It mutates its value to stop the video when buffer is too low, or
	   * resume the video when the buffer has regained a decent size.
	   */
	  function createStalled(timings) {
	    var changePlaybackRate = arguments[1] === undefined ? true : arguments[1];

	    return timings.distinctUntilChanged(null, function (prevTiming, timing) {
	      var isStalled = timing.stalled;
	      var wasStalled = prevTiming.stalled;

	      var isEqual;
	      if (!wasStalled && !isStalled) isEqual = true;else if (!wasStalled || !isStalled) isEqual = false;else isEqual = wasStalled.name == isStalled.name;

	      if (!isEqual && changePlaybackRate) {
	        if (wasStalled) videoElement.playbackRate = wasStalled.playback;else videoElement.playbackRate = 0;
	      }

	      return isEqual;
	    }).map(function (timing) {
	      var stalled = timing.stalled;

	      // Discontinuity check in case we are close a buffer but still
	      // calculate a stalled state. This is useful for some
	      // implementation that might drop an injected segment, or in
	      // case of small discontinuity in the stream.
	      if (stalled) {
	        var nextRangeGap = getNextRangeGap(timing.ts, timing.buffered);
	        if (nextRangeGap < DISCONTINUITY_THRESHOLD) {
	          var seekTo = timing.ts + nextRangeGap + 0.01;
	          videoElement.currentTime = seekTo;
	          log.warn("discontinuity seek", timing.ts, nextRangeGap, seekTo);
	        }
	      }

	      return { type: "stalled", value: timing.stalled };
	    });
	  }

	  function isOutOfIndexError(err) {
	    return err && err.type == "out-of-index";
	  }

	  function isPreconditionFailedError(err) {
	    return err && err.type == "precondition-failed";
	  }

	  function manifestAdapter(manifest, message) {
	    // out-of-index messages require a complete reloading of the
	    // manifest to refresh the current index
	    if (isOutOfIndexError(message)) {
	      log.warn("out of index");
	      return manifestPipeline({ url: manifest.locations[0] }).map(function (_ref5) {
	        var parsed = _ref5.parsed;

	        var newManifest = mergeManifestsIndex(manifest, normalizeManifest(parsed.url, parsed.manifest, subtitles));
	        return { type: "manifest", value: newManifest };
	      });
	    }

	    // precondition-failed messages require a change of live-gap to
	    // calibrate the live representation of the player
	    // TODO(pierre): smarter converging algorithm
	    if (isPreconditionFailedError(message)) {
	      mutateManifestLiveGap(manifest, 1);
	      log.warn("precondition failed", manifest.presentationLiveGap);
	    }

	    return just(message);
	  }

	  function createAdaptationsBuffers(mediaSource, manifest, timings, seekings) {
	    var adaptationsBuffers = _.map(getAdaptations(manifest), function (adaptation) {
	      return createBuffer(mediaSource, adaptation, timings, seekings);
	    });

	    var buffers = merge(adaptationsBuffers);

	    if (!manifest.isLive) return buffers;

	    // handle manifest reloading for live streamings using outofindex
	    // errors thrown when a buffer asks for a segment out of its
	    // current index
	    return buffers
	    // do not throw multiple times OutOfIndexErrors in order to have
	    // only one manifest reload for each error.
	    .distinctUntilChanged(null, function (a, b) {
	      return isOutOfIndexError(b) && isOutOfIndexError(a);
	    }).concatMap(function (message) {
	      return manifestAdapter(manifest, message);
	    });
	  }

	  /**
	   * Creates a stream merging all observable that are required to make
	   * the system cooperate.
	   */
	  function createStream(mediaSource, manifest) {
	    var _createTimings = createTimings(manifest);

	    var timings = _createTimings.timings;
	    var seekings = _createTimings.seekings;

	    var justManifest = just({ type: "manifest", value: manifest });
	    var canPlay = createLoadedMetadata(manifest);
	    var buffers = createAdaptationsBuffers(mediaSource, manifest, timings, seekings);
	    var emeHandler = createEME(manifest);
	    var stalled = createStalled(timings, true);

	    var mediaError = on(videoElement, "error").flatMap(function () {
	      var errMessage = "stream: video element MEDIA_ERR code " + videoElement.error.code;
	      log.error(errMessage);
	      throw new Error(errMessage);
	    });

	    return merge(justManifest, canPlay, emeHandler, buffers, stalled, mediaError).takeUntil(endOfPlay);
	  }

	  function createDirectFileStream() {
	    var _createTimings2 = createTimings(directFile, { timeInterval: 1000 });

	    var timings = _createTimings2.timings;

	    var justManifest = just({ type: "manifest", value: directFile });
	    var canPlay = createLoadedMetadata(directFile);
	    var stalled = createStalled(timings, false);
	    return merge(justManifest, canPlay, stalled).takeUntil(endOfPlay);
	  }

	  /**
	   * Side effect the set the media duration in mediaSource. This side
	   * effect occurs when we receive the "sourceopen" from the
	   * mediaSource.
	   */
	  function setDuration(mediaSource, manifest) {
	    if (manifest.duration === Infinity) {
	      // TODO(pierre): hack for Chrome 42
	      mediaSource.duration = Number.MAX_VALUE;
	    } else {
	      mediaSource.duration = manifest.duration;
	    }
	    log.info("set duration", mediaSource.duration);
	  }

	  /**
	   * Side effect to set the initial time of the video:
	   *   - if a start time is defined by user, set it as start time
	   *   - if video is live, use the live edge
	   *   - else set the start time to 0
	   *
	   * This side effect occurs when we receive the "loadedmetadata" event from
	   * the <video>.
	   *
	   * see: createLoadedMetadata(manifest)
	   */
	  function setInitialTime(manifest) {
	    var duration = manifest.duration;
	    var startTime = fragStartTime;
	    var endTime = fragEndTime;

	    if (endTime === Infinity) endTime = duration;

	    if (!manifest.isLive) {
	      assert(startTime < duration && endTime <= duration, "stream: bad startTime and endTime");
	    } else if (startTime) {
	      startTime = fromWallClockTime(startTime, manifest);
	    } else {
	      startTime = getLiveEdge(manifest);
	    }

	    log.info("set initial time", startTime);
	    videoElement.currentTime = startTime;
	  }
	}

	module.exports = Stream;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var Promise_ = __webpack_require__(8);
	var _ = __webpack_require__(1);
	var assert = __webpack_require__(2);
	var EventEmitter = __webpack_require__(10);

	var _require = __webpack_require__(6);

	var BufferedRanges = _require.BufferedRanges;

	function AbstractSourceBuffer() {
	  EventEmitter.call(this);
	  this.updating = false;
	  this.readyState = "opened";
	  this.buffered = new BufferedRanges();
	}

	AbstractSourceBuffer.prototype = _.extend({}, EventEmitter.prototype, {
	  appendBuffer: function appendBuffer(data) {
	    var _this = this;

	    return this._lock(function () {
	      return _this._append(data);
	    });
	  },
	  remove: function remove(from, to) {
	    var _this2 = this;

	    return this._lock(function () {
	      return _this2._remove(from, to);
	    });
	  },
	  abort: function abort() {
	    this.remove(0, Infinity);
	    this.updating = false;
	    this.readyState = "closed";
	    this._abort();
	  },
	  _append: function _append(data) {},
	  _remove: function _remove(from, to) {},
	  _lock: function _lock(func) {
	    var _this3 = this;

	    assert(!this.updating, "text-buffer: cannot remove while updating");
	    this.updating = true;
	    this.trigger("updatestart");
	    return new Promise_(function (res) {
	      return res(func());
	    }).then(function () {
	      return _this3._unlock("update");
	    }, function (e) {
	      return _this3._unlock("error", e);
	    });
	  },
	  _unlock: function _unlock(eventName, value) {
	    this.trigger(eventName, value);
	    this.updating = false;
	    this.trigger("updateend");
	  }
	});

	function emptyTextTrack(track) {
	  var from = arguments[1] === undefined ? 0 : arguments[1];
	  var to = arguments[2] === undefined ? Infinity : arguments[2];

	  _.each(_.cloneArray(track.cues), function (cue) {
	    var startTime = cue.startTime;
	    var endTime = cue.endTime;

	    if (startTime >= from && startTime <= to && endTime <= to) {
	      track.removeCue(cue);
	    }
	  });
	}

	var Cue = window.VTTCue || window.TextTrackCue;

	function TextSourceBuffer(video, codec) {
	  AbstractSourceBuffer.call(this);
	  this.video = video;
	  this.codec = codec;
	  this.isVTT = /^text\/vtt/.test(codec);
	  // there is no removeTextTrack method... so we need to reuse old
	  // text-tracks objects and clean all its pending cues
	  var track;
	  if (video.textTracks.length) {
	    track = video.textTracks[0];
	    emptyTextTrack(track);
	  } else {
	    track = video.addTextTrack("captions");
	  }
	  track.mode = "showing";
	  this.track = track;
	}

	TextSourceBuffer.prototype = _.extend({}, AbstractSourceBuffer.prototype, {
	  // Creates a new <track> element in which we inject the VTT text from
	  // a Blob and copy all the cues from this track to the main textTrack
	  // object. This <track> is then removed.
	  createCuesFromVTT: function createCuesFromVTT(vtt) {
	    var trackElement;
	    var videoElement = this.video;

	    var removeTrackElement = function removeTrackElement() {
	      if (videoElement.hasChildNodes(trackElement)) {
	        videoElement.removeChild(trackElement);
	        trackElement = null;
	      }
	    };

	    return new Promise_(function (resolve) {
	      var blob = new Blob([vtt], { type: "text/vtt" });
	      var url = URL.createObjectURL(blob);
	      trackElement = document.createElement("track");
	      trackElement.style.display = "none";
	      trackElement.mode = "hidden";
	      trackElement.addEventListener("load", function () {
	        resolve(_.cloneArray(trackElement.track.cues));
	      });
	      videoElement.appendChild(trackElement);
	      trackElement.src = url;
	    }).then(function (o) {
	      removeTrackElement();
	      return o;
	    }, function (e) {
	      removeTrackElement();
	      throw e;
	    });
	  },

	  createCuesFromArray: function createCuesFromArray(cues) {
	    if (!cues.length) return [];

	    var start = cues[0].start;
	    var end = _.last(cues).end;
	    return _.compact(_.map(cues, function (_ref) {
	      var start = _ref.start;
	      var end = _ref.end;
	      var text = _ref.text;

	      if (text) return new Cue(start, end, text);
	    }));
	  },

	  _append: function _append(cues) {
	    var _this4 = this;

	    return Promise_.resolve(this.isVTT ? this.createCuesFromVTT(cues) : this.createCuesFromArray(cues)).then(function (trackCues) {
	      if (!trackCues.length) return;
	      _.each(trackCues, function (cue) {
	        return _this4.track.addCue(cue);
	      });
	      var firstCue = trackCues[0];
	      var lastCue = _.last(trackCues);
	      _this4.buffered.insert(0, firstCue.startTime, lastCue.endTime);
	    });
	  },

	  _remove: function _remove(from, to) {
	    emptyTextTrack(this.track, from, to);
	  },

	  _abort: function _abort() {
	    this.track.mode = "disabled";
	    this.size = 0;
	    this.video = null;
	  }
	});

	module.exports = TextSourceBuffer;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var _ = __webpack_require__(1);
	var assert = __webpack_require__(2);

	function parseTimeFragment(timeFragment) {
	  if (_.isString(timeFragment)) {
	    timeFragment = temporalMediaFragmentParser(timeFragment);
	  } else {
	    timeFragment = _.pick(timeFragment, ["start", "end"]);
	  }

	  if (!timeFragment.start) timeFragment.start = 0;
	  if (!timeFragment.end) timeFragment.end = Infinity;

	  assert((_.isNumber(timeFragment.start) || _.isDate(timeFragment.start)) && (_.isNumber(timeFragment.end) || _.isDate(timeFragment.end)), "player: timeFragment should have interface { start, end } where start and end are numbers or dates");
	  assert(timeFragment.start < timeFragment.end, "player: startTime should be lower than endTime");
	  assert(timeFragment.start >= 0, "player: startTime should be greater than 0");

	  return timeFragment;
	}

	var errMessage = "Invalid MediaFragment";

	function normalizeNTPTime(time) {
	  if (!time) return false;

	  // replace a sole trailing dot, which is legal:
	  // npt-sec = 1*DIGIT [ "." *DIGIT ]
	  time = time.replace(/^npt\:/, "").replace(/\.$/, "");

	  // possible cases:
	  // 12:34:56.789
	  //    34:56.789
	  //       56.789
	  //       56
	  var hours;
	  var minutes;
	  var seconds;
	  time = time.split(":");
	  var length = time.length;
	  switch (length) {
	    case 3:
	      hours = parseInt(time[0], 10);
	      minutes = parseInt(time[1], 10);
	      seconds = parseFloat(time[2]);
	      break;
	    case 2:
	      hours = 0;
	      minutes = parseInt(time[0], 10);
	      seconds = parseFloat(time[1]);
	      break;
	    case 1:
	      hours = 0;
	      minutes = 0;
	      seconds = parseFloat(time[0]);
	      break;
	    default:
	      return false;
	  }
	  assert(hours <= 23, errMessage);
	  assert(minutes <= 59, errMessage);
	  assert(length <= 1 || seconds < 60, errMessage);
	  return hours * 3600 + minutes * 60 + seconds;
	}

	// we interpret frames as milliseconds, and further-subdivison-of-frames
	// as microseconds. this allows for relatively easy comparison.
	function normalizeSMPTETime(time) {
	  if (!time) return false;

	  // possible cases:
	  // 12:34:56
	  // 12:34:56:78
	  // 12:34:56:78.90
	  var hours;
	  var minutes;
	  var seconds;
	  var frames;
	  var subframes;
	  time = time.split(":");
	  var length = time.length;
	  switch (length) {
	    case 3:
	      hours = parseInt(time[0], 10);
	      minutes = parseInt(time[1], 10);
	      seconds = parseInt(time[2], 10);
	      frames = 0;
	      subframes = 0;
	      break;
	    case 4:
	      hours = parseInt(time[0], 10);
	      minutes = parseInt(time[1], 10);
	      seconds = parseInt(time[2], 10);
	      if (time[3].indexOf(".") === -1) {
	        frames = parseInt(time[3], 10);
	        subframes = 0;
	      } else {
	        var frameSubFrame = time[3].split(".");
	        frames = parseInt(frameSubFrame[0], 10);
	        subframes = parseInt(frameSubFrame[1], 10);
	      }
	      break;
	    default:
	      return false;
	  }
	  assert(hours <= 23, errMessage);
	  assert(minutes <= 59, errMessage);
	  assert(seconds <= 59, errMessage);
	  return hours * 3600 + minutes * 60 + seconds + frames * 0.001 + subframes * 0.000001;
	}

	function normalizeWallClockTime(time) {
	  return new Date(Date.parse(time));
	}

	var errMessage = "Invalid MediaFragment";

	// MediaFragment temporal parser.
	// adapted from: https://github.com/tomayac/Media-Fragments-URI
	// specification: http://www.w3.org/TR/media-frags/#naming-time
	function temporalMediaFragmentParser(value) {
	  var components = value.split(",");
	  assert(components.length <= 2, errMessage);

	  var start = components[0] ? components[0] : "";
	  var end = components[1] ? components[1] : "";
	  assert((start || end) && (!start || end || value.indexOf(",") === -1), errMessage);

	  start = start.replace(/^smpte(-25|-30|-30-drop)?\:/, "").replace("clock:", "");

	  // hours:minutes:seconds.milliseconds
	  var npt = /^((npt\:)?((\d+\:(\d\d)\:(\d\d))|((\d\d)\:(\d\d))|(\d+))(\.\d*)?)?$/;
	  // hours:minutes:seconds:frames.further-subdivison-of-frames
	  var smpte = /^(\d+\:\d\d\:\d\d(\:\d\d(\.\d\d)?)?)?$/;
	  // regexp adapted from http://delete.me.uk/2005/03/iso8601.html
	  var wallClock = /^((\d{4})(-(\d{2})(-(\d{2})(T(\d{2})\:(\d{2})(\:(\d{2})(\.(\d+))?)?(Z|(([-\+])(\d{2})\:(\d{2})))?)?)?)?)?$/;

	  var timeNormalizer;
	  if (npt.test(start) && npt.test(end)) {
	    timeNormalizer = normalizeNTPTime;
	  } else if (smpte.test(start) && smpte.test(end)) {
	    timeNormalizer = normalizeSMPTETime;
	  } else if (wallClock.test(start) && wallClock.test(end)) {
	    timeNormalizer = normalizeWallClockTime;
	  } else {
	    throw new Error(errMessage);
	  }

	  start = timeNormalizer(start);
	  end = timeNormalizer(end);
	  assert(start !== false || end !== false, errMessage);
	  return {
	    start: start === false ? "" : start,
	    end: end === false ? "" : end
	  };
	}

	module.exports = { parseTimeFragment: parseTimeFragment };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

	var _ = __webpack_require__(1);

	var _require = __webpack_require__(3);

	var Observable = _require.Observable;
	var empty = Observable.empty;
	var merge = Observable.merge;
	var just = Observable.just;

	var assert = __webpack_require__(2);
	var request = __webpack_require__(23);

	var _require2 = __webpack_require__(11);

	var resolveURL = _require2.resolveURL;

	var _require3 = __webpack_require__(38);

	var parseSidx = _require3.parseSidx;
	var patchPssh = _require3.patchPssh;

	var dashManifestParser = __webpack_require__(39);

	function byteRange(_ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var start = _ref2[0];
	  var end = _ref2[1];

	  if (!end || end === Infinity) {
	    return "bytes=" + +start + "-";
	  } else {
	    return "bytes=" + +start + "-" + +end;
	  }
	}

	function replaceTokens(path, representation, time, number) {
	  if (path.indexOf("$") === -1) {
	    return path;
	  } else {
	    return path.replace(/\$\$/g, "$").replace(/\$RepresentationID\$/g, representation.id).replace(/\$Bandwidth\$/g, representation.bitrate).replace(/\$Number\$/g, number).replace(/\$Time\$/g, time);
	  }
	}

	function createURL(adaptation, representation, path) {
	  return resolveURL(adaptation.rootURL, adaptation.baseURL, representation.baseURL, path);
	}

	module.exports = function () {
	  var opts = arguments[0] === undefined ? {} : arguments[0];
	  var proxy = opts.proxy;
	  var contentProtectionParser = opts.contentProtectionParser;

	  if (!proxy) proxy = _.identity;
	  if (!contentProtectionParser) contentProtectionParser = _.noop;

	  var req = function req(reqOptions) {
	    reqOptions.withMetadata = true;
	    return request(proxy(reqOptions));
	  };

	  var manifestPipeline = {
	    loader: function loader(_ref3) {
	      var url = _ref3.url;

	      return req({ url: url, format: "document" });
	    },
	    parser: function parser(_ref4) {
	      var response = _ref4.response;

	      return just({
	        manifest: dashManifestParser(response.blob, contentProtectionParser),
	        url: response.url
	      });
	    }
	  };

	  var segmentPipeline = {
	    loader: function loader(_ref5) {
	      var adaptation = _ref5.adaptation;
	      var representation = _ref5.representation;
	      var segment = _ref5.segment;
	      var init = segment.init;
	      var media = segment.media;
	      var range = segment.range;
	      var indexRange = segment.indexRange;

	      // init segment without initialization media/range/indexRange:
	      // we do nothing on the network
	      if (init && !(media || range || indexRange)) {
	        return empty();
	      }

	      var mediaHeaders;
	      if (_.isArray(range)) {
	        mediaHeaders = { "Range": byteRange(range) };
	      } else {
	        mediaHeaders = null;
	      }

	      var path;
	      if (media) {
	        path = replaceTokens(media, representation, segment.time, segment.number);
	      } else {
	        path = "";
	      }

	      var mediaUrl = createURL(adaptation, representation, path);
	      var mediaOrInitRequest = req({
	        url: mediaUrl,
	        format: "arraybuffer",
	        headers: mediaHeaders
	      });

	      // If init segment has indexRange metadata, we need to fetch
	      // both the initialization data and the index metadata. We do
	      // this in parallel and send the both blobs into the pipeline.
	      // TODO(pierre): we could fire both these requests as one if the
	      // init and index ranges are contiguous, which should be the
	      // case most of the time.
	      if (_.isArray(indexRange)) {
	        var indexRequest = req({
	          url: mediaUrl,
	          format: "arraybuffer",
	          headers: { "Range": byteRange(indexRange) }
	        });
	        return merge(mediaOrInitRequest, indexRequest);
	      } else {
	        return mediaOrInitRequest;
	      }
	    },
	    parser: function parser(_ref6) {
	      var adaptation = _ref6.adaptation;
	      var segment = _ref6.segment;
	      var response = _ref6.response;

	      var blob = new Uint8Array(response.blob);
	      var init = segment.init;
	      var indexRange = segment.indexRange;

	      // added segments and timescale informations are extracted from
	      // sidx atom
	      var nextSegments, timescale, currentSegment;

	      // added index (segments and timescale) informations are
	      // extracted from sidx atom
	      var index = parseSidx(blob, indexRange ? indexRange[0] : 0);
	      if (index) {
	        nextSegments = index.segments;
	        timescale = index.timescale;
	      }

	      if (!init) {
	        // current segment information may originate from the index
	        // itself in which case we don't have to use the index
	        // segments.
	        if (segment.time >= 0 && segment.duration >= 0) {
	          currentSegment = {
	            ts: segment.time,
	            d: segment.duration
	          };
	        } else if (index && index.segments.length === 1) {
	          currentSegment = {
	            ts: index.segments[0].ts,
	            d: index.segments[0].d
	          };
	        }

	        if (true) assert(currentSegment);
	      }

	      if (init && adaptation.contentProtection) {
	        blob = patchPssh(blob, adaptation.contentProtection);
	      }

	      return just({
	        blob: blob,
	        currentSegment: currentSegment,
	        nextSegments: nextSegments,
	        timescale: timescale
	      });
	    }
	  };

	  var textTrackPipeline = {
	    loader: function loader(_ref7) {
	      var adaptation = _ref7.adaptation;
	      var representation = _ref7.representation;
	      var segment = _ref7.segment;
	    }
	  };

	  return {
	    manifest: manifestPipeline,
	    audio: segmentPipeline,
	    video: segmentPipeline,
	    text: textTrackPipeline
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	var assert = __webpack_require__(2);

	var _require = __webpack_require__(9);

	var itobe4 = _require.itobe4;
	var be8toi = _require.be8toi;
	var be4toi = _require.be4toi;
	var be2toi = _require.be2toi;
	var hexToBytes = _require.hexToBytes;
	var strToBytes = _require.strToBytes;
	var concat = _require.concat;

	function findAtom(buf, atomName) {
	  var i = 0,
	      l = buf.length;

	  var name, size;
	  while (i + 8 < l) {
	    size = be4toi(buf, i);
	    name = be4toi(buf, i + 4);
	    assert(size > 0, "dash: out of range size");
	    if (name === atomName) {
	      break;
	    } else {
	      i += size;
	    }
	  }

	  if (i >= l) return -1;

	  assert(i + size <= l, "dash: atom out of range");
	  return i;
	}

	function parseSidx(buf, offset) {
	  var index = findAtom(buf, 1936286840 /* "sidx" */);
	  if (index == -1) return null;

	  var size = be4toi(buf, index);
	  var pos = index + /* size */4 + /* name */4;

	  /* version(8) */
	  /* flags(24) */
	  /* reference_ID(32); */
	  /* timescale(32); */
	  var version = buf[pos];pos += 4 + 4;
	  var timescale = be4toi(buf, pos);pos += 4;

	  /* earliest_presentation_time(32 / 64) */
	  /* first_offset(32 / 64) */
	  var time;
	  if (version === 0) {
	    time = be4toi(buf, pos);pos += 4;
	    offset += be4toi(buf, pos) + size;pos += 4;
	  } else if (version === 1) {
	    time = be8toi(buf, pos);pos += 8;
	    offset += be8toi(buf, pos) + size;pos += 8;
	  } else {
	    return null;
	  }

	  var segments = [];

	  /* reserved(16) */
	  /* reference_count(16) */
	  pos += 2;
	  var count = be2toi(buf, pos);
	  pos += 2;
	  while (--count >= 0) {
	    /* reference_type(1) */
	    /* reference_size(31) */
	    /* segment_duration(32) */
	    /* sap..(32) */
	    var refChunk = be4toi(buf, pos);
	    pos += 4;
	    var refType = (refChunk & 2147483648) >>> 31;
	    var refSize = refChunk & 2147483647;
	    if (refType == 1) throw new Error("not implemented");

	    var d = be4toi(buf, pos);
	    pos += 4;

	    // var sapChunk = be4toi(buf, pos + 8);
	    pos += 4;

	    // TODO(pierre): handle sap
	    // var startsWithSap = (sapChunk & 0x80000000) >>> 31;
	    // var sapType = (sapChunk & 0x70000000) >>> 28;
	    // var sapDelta = sapChunk & 0x0FFFFFFF;

	    var ts = time;
	    segments.push({
	      ts: ts, d: d, r: 0,
	      range: [offset, offset + refSize - 1]
	    });

	    time += d;
	    offset += refSize;
	  }

	  return { segments: segments, timescale: timescale };
	}

	function Atom(name, buff) {
	  var len = buff.length + 8;
	  return concat(itobe4(len), strToBytes(name), buff);
	}

	function createPssh(_ref) {
	  var systemId = _ref.systemId;
	  var privateData = _ref.privateData;

	  systemId = systemId.replace(/-/g, "");

	  assert(systemId.length === 32);
	  return Atom("pssh", concat(4, hexToBytes(systemId), itobe4(privateData.length), privateData));
	}

	function patchPssh(buf, pssList) {
	  if (!pssList || !pssList.length) return buf;

	  var pos = findAtom(buf, 1836019574 /* = "moov" */);
	  if (pos == -1) return buf;

	  var size = be4toi(buf, pos);
	  var moov = buf.subarray(pos, pos + size);

	  var newmoov = [moov];
	  for (var i = 0; i < pssList.length; i++) {
	    newmoov.push(createPssh(pssList[i]));
	  }

	  newmoov = concat.apply(null, newmoov);
	  newmoov.set(itobe4(newmoov.length), 0);

	  return concat(buf.subarray(0, pos), newmoov, buf.subarray(pos + size));
	}

	module.exports = { parseSidx: parseSidx, patchPssh: patchPssh };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	// XML-Schema
	// <http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd>

	"use strict";

	var _ = __webpack_require__(1);
	var assert = __webpack_require__(2);

	var iso8601Duration = /^P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/;
	var rangeRe = /([0-9]+)-([0-9]+)/;
	var frameRateRe = /([0-9]+)(\/([0-9]+))?/;

	// TODO(pierre): support more than juste timeline index type
	function calcLastRef(index) {
	  var _$last = _.last(index.timeline);

	  var ts = _$last.ts;
	  var r = _$last.r;
	  var d = _$last.d;

	  return (ts + (r + 1) * d) / index.timescale;
	}

	function feedAttributes(node, base) {
	  var attrs = attributes[node.nodeName];

	  assert(attrs, "parser: no attributes for " + node.nodeName);

	  return _.reduce(attrs, function (obj, _ref) {
	    var k = _ref.k;
	    var fn = _ref.fn;
	    var n = _ref.n;
	    var def = _ref.def;

	    if (node.hasAttribute(k)) {
	      obj[n || k] = fn(node.getAttribute(k));
	    } else if (def != null) {
	      obj[n || k] = def;
	    }
	    return obj;
	  }, base || {});
	}

	function parseString(str) {
	  return str;
	}

	function parseBoolean(str) {
	  return str == "true";
	}

	function parseIntOrBoolean(str) {
	  if (str == "true") return true;
	  if (str == "false") return false;
	  return parseInt(str);
	}

	function parseDateTime(str) {
	  return new Date(Date.parse(str));
	}

	function parseDuration(date) {
	  if (!date) return 0;

	  var match = iso8601Duration.exec(date);
	  assert(match, "parser: " + date + " is not a valid ISO8601 duration");

	  return parseFloat(match[2] || 0) * 365 * 24 * 60 * 60 + parseFloat(match[4] || 0) * 30 * 24 * 60 * 60 + // not precise +
	  parseFloat(match[6] || 0) * 24 * 60 * 60 + parseFloat(match[8] || 0) * 60 * 60 + parseFloat(match[10] || 0) * 60 + parseFloat(match[12] || 0);
	}

	function parseFrameRate(str) {
	  var match = frameRateRe.exec(str);
	  if (!match) return -1;

	  var nom = parseInt(match[1]) || 0;
	  var den = parseInt(match[2]) || 0;
	  return den > 0 ? nom / den : nom;
	}

	function parseRatio(str) {
	  return str;
	}

	function parseByteRange(str) {
	  var match = rangeRe.exec(str);
	  if (!match) return null;else return [+match[1], +match[2]];
	}

	var RepresentationBaseType = [{ k: "profiles", fn: parseString }, { k: "width", fn: parseInt }, { k: "height", fn: parseInt }, { k: "frameRate", fn: parseFrameRate }, { k: "audioSamplingRate", fn: parseString }, { k: "mimeType", fn: parseString }, { k: "segmentProfiles", fn: parseString }, { k: "codecs", fn: parseString }, { k: "maximumSAPPeriod", fn: parseFloat }, { k: "maxPlayoutRate", fn: parseFloat }, { k: "codingDependency", fn: parseBoolean }];

	var SegmentBaseType = [{ k: "timescale", fn: parseInt }, { k: "presentationTimeOffset", fn: parseFloat, def: 0 }, { k: "indexRange", fn: parseByteRange }, { k: "indexRangeExact", fn: parseBoolean }, { k: "availabilityTimeOffset", fn: parseFloat }, { k: "availabilityTimeComplete", fn: parseBoolean }];

	var MultipleSegmentBaseType = SegmentBaseType.concat([{ k: "duration", fn: parseInt }, { k: "startNumber", fn: parseInt }]);

	var attributes = {
	  "ContentProtection": [{ k: "schemeIdUri", fn: parseString }, { k: "value", fn: parseString }],

	  "SegmentURL": [{ k: "media", fn: parseString }, { k: "mediaRange", fn: parseByteRange }, { k: "index", fn: parseString }, { k: "indexRange", fn: parseByteRange }],

	  "S": [{ k: "t", fn: parseInt, n: "ts" }, { k: "d", fn: parseInt }, { k: "r", fn: parseInt }],

	  "SegmentTimeline": [],
	  "SegmentBase": SegmentBaseType,
	  "SegmentTemplate": MultipleSegmentBaseType.concat([{ k: "initialization", fn: parseInitializationAttribute }, { k: "index", fn: parseString }, { k: "media", fn: parseString }, { k: "bitstreamSwitching", fn: parseString }]),
	  "SegmentList": MultipleSegmentBaseType,

	  "ContentComponent": [{ k: "id", fn: parseString }, { k: "lang", fn: parseString }, { k: "contentType", fn: parseString }, { k: "par", fn: parseRatio }],

	  "Representation": RepresentationBaseType.concat([{ k: "id", fn: parseString }, { k: "bandwidth", fn: parseInt, n: "bitrate" }, { k: "qualityRanking", fn: parseInt }]),

	  "AdaptationSet": RepresentationBaseType.concat([{ k: "id", fn: parseString }, { k: "group", fn: parseInt }, { k: "lang", fn: parseString }, { k: "contentType", fn: parseString }, { k: "par", fn: parseRatio }, { k: "minBandwidth", fn: parseInt, n: "minBitrate" }, { k: "maxBandwidth", fn: parseInt, n: "maxBitrate" }, { k: "minWidth", fn: parseInt }, { k: "maxWidth", fn: parseInt }, { k: "minHeight", fn: parseInt }, { k: "maxHeight", fn: parseInt }, { k: "minFrameRate", fn: parseFrameRate }, { k: "maxFrameRate", fn: parseFrameRate }, { k: "segmentAlignment", fn: parseIntOrBoolean }, { k: "subsegmentAlignment", fn: parseIntOrBoolean }, { k: "bitstreamSwitching", fn: parseBoolean }]),

	  "Period": [{ k: "id", fn: parseString }, { k: "start", fn: parseDuration }, { k: "duration", fn: parseDuration }, { k: "bitstreamSwitching", fn: parseBoolean }],

	  "MPD": [{ k: "id", fn: parseString }, { k: "profiles", fn: parseString }, { k: "type", fn: parseString }, { k: "availabilityStartTime", fn: parseDateTime }, { k: "availabilityEndTime", fn: parseDateTime }, { k: "publishTime", fn: parseDateTime }, { k: "mediaPresentationDuration", fn: parseDuration, n: "duration" }, { k: "minimumUpdatePeriod", fn: parseDuration }, { k: "minBufferTime", fn: parseDuration }, { k: "timeShiftBufferDepth", fn: parseDuration }, { k: "suggestedPresentationDelay", fn: parseDuration }, { k: "maxSegmentDuration", fn: parseDuration }, { k: "maxSubsegmentDuration", fn: parseDuration }]
	};

	function reduceChildren(root, fn, init) {
	  var node = root.firstElementChild,
	      r = init;
	  while (node) {
	    r = fn(r, node.nodeName, node);
	    node = node.nextElementSibling;
	  }
	  return r;
	}

	function parseContentProtection(root, contentProtectionParser) {
	  return contentProtectionParser(feedAttributes(root), root);
	}

	function parseSegmentBase(root) {
	  var index = reduceChildren(root, function (res, name, node) {
	    if (name == "Initialization") {
	      res.initialization = parseInitialization(node);
	    }
	    return res;
	  }, feedAttributes(root));
	  if (root.nodeName == "SegmentBase") {
	    index.indexType = "base";
	    index.timeline = [];
	  }
	  return index;
	}

	function parseMultipleSegmentBase(root) {
	  return reduceChildren(root, function (res, name, node) {
	    if (name == "SegmentTimeline") {
	      res.indexType = "timeline";
	      res.timeline = parseSegmentTimeline(node);
	    }
	    return res;
	  }, parseSegmentBase(root));
	}

	function parseSegmentTimeline(root) {
	  return reduceChildren(root, function (arr, name, node) {
	    var len = arr.length;
	    var seg = feedAttributes(node);
	    if (seg.ts == null) {
	      var prev = len > 0 && arr[len - 1];
	      seg.ts = prev ? prev.ts + prev.d * (prev.r + 1) : 0;
	    }
	    if (seg.r == null) {
	      seg.r = 0;
	    }
	    arr.push(seg);
	    return arr;
	  }, []);
	}

	function parseInitializationAttribute(attrValue) {
	  return { media: attrValue, range: undefined };
	}

	function parseInitialization(root) {
	  var range, media;

	  if (root.hasAttribute("range")) range = parseByteRange(root.getAttribute("range"));

	  if (root.hasAttribute("sourceURL")) media = root.getAttribute("sourceURL");

	  return { range: range, media: media };
	}

	function parseSegmentTemplate(root) {
	  var base = parseMultipleSegmentBase(root);
	  if (!base.indexType) {
	    base.indexType = "template";
	  }
	  return base;
	}

	function parseSegmentList(root) {
	  var base = parseMultipleSegmentBase(root);
	  base.list = [];
	  base.indexType = "list";
	  return reduceChildren(root, function (res, name, node) {
	    if (name == "SegmentURL") {
	      res.list.push(feedAttributes(node));
	    }
	    return res;
	  }, base);
	}

	function parseRepresentation(root) {
	  var rep = reduceChildren(root, function (res, name, node) {
	    switch (name) {
	      // case "FramePacking": break;
	      // case "AudioChannelConfiguration": break;
	      // case "ContentProtection": res.contentProtection = parseContentProtection(node); break;
	      // case "EssentialProperty": break;
	      // case "SupplementalProperty": break;
	      // case "InbandEventStream": break;
	      case "BaseURL":
	        res.baseURL = node.textContent;break;
	      // case "SubRepresentation": break;
	      case "SegmentBase":
	        res.index = parseSegmentBase(node);break;
	      case "SegmentList":
	        res.index = parseSegmentList(node);break;
	      case "SegmentTemplate":
	        res.index = parseSegmentTemplate(node);break;
	    }
	    return res;
	  }, {});

	  return feedAttributes(root, rep);
	}

	function parseContentComponent(root) {
	  return feedAttributes(root);
	}

	function parseAdaptationSet(root, contentProtectionParser) {
	  var res = reduceChildren(root, function (res, name, node) {
	    switch (name) {
	      // case "Accessibility": break;
	      // case "Role": break;
	      // case "Rating": break;
	      // case "Viewpoint": break;
	      case "ContentProtection":
	        res.contentProtection = parseContentProtection(node, contentProtectionParser);break;
	      case "ContentComponent":
	        res.contentComponent = parseContentComponent(node);break;
	      case "BaseURL":
	        res.baseURL = node.textContent;break;
	      case "SegmentBase":
	        res.index = parseSegmentBase(node);break;
	      case "SegmentList":
	        res.index = parseSegmentList(node);break;
	      case "SegmentTemplate":
	        res.index = parseSegmentTemplate(node);break;
	      case "Representation":
	        res.representations.push(parseRepresentation(node));break;
	    }
	    return res;
	  }, { representations: [] });

	  return feedAttributes(root, res);
	}

	function parsePeriod(root, contentProtectionParser) {
	  var attrs = feedAttributes(root, reduceChildren(root, function (res, name, node) {
	    switch (name) {
	      case "BaseURL":
	        res.baseURL = node.textContent;break;
	      case "AdaptationSet":
	        res.adaptations.push(parseAdaptationSet(node, contentProtectionParser));break;
	    }
	    return res;
	  }, { adaptations: [] }));

	  if (attrs.baseURL) {
	    _.each(attrs.adaptations, function (adaptation) {
	      return _.defaults(adaptation, { baseURL: attrs.baseURL });
	    });
	  }

	  return attrs;
	}

	function parseFromDocument(document, contentProtectionParser) {
	  var root = document.documentElement;
	  assert.equal(root.nodeName, "MPD", "parser: document root should be MPD");

	  var manifest = reduceChildren(root, function (res, name, node) {
	    switch (name) {
	      case "BaseURL":
	        res.baseURL = node.textContent;break;
	      case "Location":
	        res.locations.push(node.textContent);break;
	      case "Period":
	        res.periods.push(parsePeriod(node, contentProtectionParser));break;
	    }
	    return res;
	  }, {
	    transportType: "dash",
	    periods: [],
	    locations: []
	  });

	  manifest = feedAttributes(root, manifest);

	  if (/isoff-live/.test(manifest.profiles)) {
	    var adaptations = manifest.periods[0].adaptations;
	    var videoAdaptation = _.find(adaptations, function (a) {
	      return a.mimeType == "video/mp4";
	    });

	    var videoIndex = videoAdaptation && videoAdaptation.index;

	    if (true) {
	      assert(videoIndex && (videoIndex.indexType == "timeline" || videoIndex.indexType == "template"));
	      assert(manifest.availabilityStartTime);
	    }

	    var lastRef;
	    if (videoIndex.timeline) {
	      lastRef = calcLastRef(videoIndex);
	    } else {
	      lastRef = Date.now() / 1000 - 60;
	    }

	    manifest.availabilityStartTime = manifest.availabilityStartTime.getTime() / 1000;
	    manifest.presentationLiveGap = Date.now() / 1000 - (lastRef + manifest.availabilityStartTime);
	  }

	  return manifest;
	}

	function parseFromString(manifest, contentProtectionParser) {
	  return parseFromDocument(new DOMParser().parseFromString(manifest, "application/xml"), contentProtectionParser);
	}

	function parser(manifest, contentProtectionParser) {
	  if (_.isString(manifest)) return parseFromString(manifest, contentProtectionParser);
	  if (manifest instanceof window.Document) return parseFromDocument(manifest, contentProtectionParser);
	  throw new Error("parser: unsupported type to parse");
	}

	parser.parseFromString = parseFromString;
	parser.parseFromDocument = parseFromDocument;

	module.exports = parser;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	module.exports = {
	  dash: __webpack_require__(37)
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";

	function ArraySet() {
	  this.arr = [];
	}

	ArraySet.prototype.add = function (x) {
	  this.arr.push(x);
	};

	ArraySet.prototype.remove = function (x) {
	  var i = this.arr.indexOf(x);
	  if (i >= 0) this.arr.splice(i, 1);
	};

	ArraySet.prototype.test = function (x) {
	  return this.arr.indexOf(x) >= 0;
	};

	ArraySet.prototype.size = function () {
	  return this.arr.length;
	};

	module.exports = { ArraySet: ArraySet };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 CANAL+ Group
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	'use strict';

	var _require = __webpack_require__(6);

	var bufferedToArray = _require.bufferedToArray;

	var interval;
	var closeBtn;

	var reUnescapedHtml = /[&<>"']/g;
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#39;'
	};

	function escape(string) {
	  return string == null ? '' : String(string).replace(reUnescapedHtml, function (match) {
	    return htmlEscapes[match];
	  });
	}

	function bpsToKbps(b) {
	  return (b / 1000).toFixed(3);
	}

	function getDebug(player) {
	  var avr = player.getAverageBitrates();

	  var avrAudio, avrVideo;
	  avr.video.subscribe(function (a) {
	    return avrVideo = a | 0;
	  }).dispose();
	  avr.audio.subscribe(function (a) {
	    return avrAudio = a | 0;
	  }).dispose();

	  return {
	    manifest: player.man,
	    version: player.version,
	    timeFragment: player.frag,
	    currentTime: player.getCurrentTime(),
	    state: player.getPlayerState(),
	    buffer: bufferedToArray(player.video.buffered),
	    volume: player.getVolume(),
	    video: {
	      adaptation: player.adas.video,
	      representation: player.reps.video,
	      maxBitrate: player.getVideoMaxBitrate(),
	      bufferSize: player.getVideoBufferSize(),
	      avrBitrate: avrVideo
	    },
	    audio: {
	      adaptation: player.adas.audio,
	      representation: player.reps.audio,
	      maxBitrate: player.getAudioMaxBitrate(),
	      bufferSize: player.getAudioBufferSize(),
	      avrBitrate: avrAudio
	    }
	  };
	}

	function update(player, videoElement) {
	  var infoElement = videoElement.parentNode.querySelector('#cp--debug-infos-content');
	  if (infoElement) {
	    var infos;
	    try {
	      infos = getDebug(player);
	    } catch (e) {
	      return;
	    }

	    var video = infos.video;
	    var audio = infos.audio;
	    var manifest = infos.manifest;

	    var secureHTML = '<b>Player v' + infos.version + '</b> (' + infos.state + ')<br>';

	    if (manifest && video && audio) {
	      secureHTML += ['Container: ' + escape(manifest.transportType), 'Live: ' + escape('' + manifest.isLive),
	      // `Playing bitrate: ${video.representation.bitrate}/${audio.representation.bitrate}`,
	      'Downloading bitrate (Kbit/s): ' + bpsToKbps(video.representation.bitrate) + '/' + bpsToKbps(audio.representation.bitrate), 'Estimated bandwidth (Kbit/s): ' + bpsToKbps(video.avrBitrate) + '/' + bpsToKbps(audio.avrBitrate), 'Location: ' + manifest.locations[0]].join('<br>');
	    }

	    // Representation: ${escape(video.adaptation.id + "/" + video.representation.id)}<br>${getCodec(video.representation)}<br>
	    // Buffered: ${escape(JSON.stringify(infos.buffer))}<br>
	    // <br><b>Audio</b><br>
	    // Representation: ${escape(audio.adaptation.id + "/" + audio.representation.id)}<br>${getCodec(audio.representation)}<br>`;
	    infoElement.innerHTML = secureHTML;
	  }
	}

	function showDebug(player, videoElement) {
	  var secureHTML = '<style>\n#cp--debug-infos {\n  position: absolute;\n  top: ' + escape(videoElement.offsetTop + 10) + 'px;\n  left: ' + escape(videoElement.offsetLeft + 10) + 'px;\n  width: 500px;\n  height: 300px;\n  background-color: rgba(10, 10, 10, 0.83);\n  overflow: hidden;\n  color: white;\n  text-align: left;\n  padding: 2em;\n  box-sizing: border-box;\n}\n#cp--debug-hide-infos {\n  float: right;\n  cursor: pointer;\n}\n</style>\n<div id="cp--debug-infos">\n  <a id="cp--debug-hide-infos">[x]</a>\n  <p id="cp--debug-infos-content"></p>\n</div>';

	  var videoParent = videoElement.parentNode;

	  var container = videoParent.querySelector('#cp--debug-infos-container');
	  if (!container) {
	    container = document.createElement('div');
	    container.setAttribute('id', 'cp--debug-infos-container');
	    videoParent.appendChild(container);
	  }
	  container.innerHTML = secureHTML;

	  if (!closeBtn) {
	    closeBtn = videoParent.querySelector('#cp--debug-hide-infos');
	    closeBtn.addEventListener('click', function () {
	      return hideDebug(videoElement);
	    });
	  }

	  if (interval) clearInterval(interval);
	  interval = setInterval(function () {
	    return update(player, videoElement);
	  }, 1000);

	  update(player, videoElement);
	}

	function hideDebug(videoElement) {
	  var container = videoElement.parentNode.querySelector('#cp--debug-infos-container');
	  if (container) {
	    container.parentNode.removeChild(container);
	  }
	  if (interval) {
	    clearInterval(interval);
	    interval = null;
	  }
	  if (closeBtn) {
	    closeBtn.removeEventListener('click', hideDebug);
	    closeBtn = null;
	  }
	}

	function toggleDebug(player, videoElement) {
	  var container = videoElement.parentNode.querySelector('#cp--debug-infos-container');
	  if (container) {
	    hideDebug(videoElement);
	  } else {
	    showDebug(player, videoElement);
	  }
	}

	module.exports = {
	  getDebug: getDebug,
	  showDebug: showDebug,
	  hideDebug: hideDebug,
	  toggleDebug: toggleDebug
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ])
});
;