(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["most"] = factory();
	else
		root["most"] = factory();
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

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var base = __webpack_require__(2);
	var core = __webpack_require__(3);
	var from = __webpack_require__(9).from;
	var periodic = __webpack_require__(13).periodic;

	/**
	 * Core stream type
	 * @type {Stream}
	 */
	exports.Stream = Stream;

	// Add of and empty to constructor for fantasy-land compat
	exports.of       = Stream.of    = core.of;
	exports.just     = core.of; // easier ES6 import alias
	exports.empty    = Stream.empty = core.empty;
	exports.never    = core.never;
	exports.from     = from;
	exports.periodic = periodic;

	//-----------------------------------------------------------------------
	// Creating

	var create = __webpack_require__(25);

	/**
	 * Create a stream by imperatively pushing events.
	 * @param {function(add:function(x), end:function(e)):function} run function
	 *  that will receive 2 functions as arguments, the first to add new values to the
	 *  stream and the second to end the stream. It may *return* a function that
	 *  will be called once all consumers have stopped observing the stream.
	 * @returns {Stream} stream containing all events added by run before end
	 */
	exports.create = create.create;

	//-----------------------------------------------------------------------
	// Adapting other sources

	var events = __webpack_require__(28);

	/**
	 * Create a stream of events from the supplied EventTarget or EventEmitter
	 * @param {String} event event name
	 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter. The source
	 *  must support either addEventListener/removeEventListener (w3c EventTarget:
	 *  http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget),
	 *  or addListener/removeListener (node EventEmitter: http://nodejs.org/api/events.html)
	 * @returns {Stream} stream of events of the specified type from the source
	 */
	exports.fromEvent = events.fromEvent;

	//-----------------------------------------------------------------------
	// Lifting functions

	var lift = __webpack_require__(29).lift;

	/**
	 * Lift a function that accepts values and returns a value, and return a function
	 * that accepts streams and returns a stream.
	 * @type {function(f:function(...args):*):function(...streams):Stream<*>}
	 */
	exports.lift = lift;

	//-----------------------------------------------------------------------
	// Observing

	var observe = __webpack_require__(39);

	exports.observe = observe.observe;
	exports.forEach = observe.observe;
	exports.drain   = observe.drain;

	/**
	 * Process all the events in the stream
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */
	Stream.prototype.observe = Stream.prototype.forEach = function(f) {
		return observe.observe(f, this);
	};

	/**
	 * Consume all events in the stream, without providing a function to process each.
	 * This causes a stream to become active and begin emitting events, and is useful
	 * in cases where all processing has been setup upstream via other combinators, and
	 * there is no need to process the terminal events.
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */
	Stream.prototype.drain = function() {
		return observe.drain(this);
	};

	//-------------------------------------------------------

	var loop = __webpack_require__(44).loop;

	exports.loop = loop;

	/**
	 * Generalized feedback loop. Call a stepper function for each event. The stepper
	 * will be called with 2 params: the current seed and the an event value.  It must
	 * return a new { seed, value } pair. The `seed` will be fed back into the next
	 * invocation of stepper, and the `value` will be propagated as the event value.
	 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
	 * @param {*} seed initial seed value passed to first stepper call
	 * @returns {Stream} new stream whose values are the `value` field of the objects
	 * returned by the stepper
	 */
	Stream.prototype.loop = function(stepper, seed) {
		return loop(stepper, seed, this);
	};

	//-------------------------------------------------------

	var accumulate = __webpack_require__(45);

	exports.scan   = accumulate.scan;
	exports.reduce = accumulate.reduce;

	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @returns {Stream} new stream containing successive reduce results
	 */
	Stream.prototype.scan = function(f, initial) {
		return accumulate.scan(f, initial, this);
	};

	/**
	 * Reduce the stream to produce a single result.  Note that reducing an infinite
	 * stream will return a Promise that never fulfills, but that may reject if an error
	 * occurs.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial optional initial value
	 * @returns {Promise} promise for the file result of the reduce
	 */
	Stream.prototype.reduce = function(f, initial) {
		return accumulate.reduce(f, initial, this);
	};

	//-----------------------------------------------------------------------
	// Building and extending

	var unfold = __webpack_require__(46);
	var iterate = __webpack_require__(47);
	var generate = __webpack_require__(48);
	var build = __webpack_require__(49);

	exports.unfold    = unfold.unfold;
	exports.iterate   = iterate.iterate;
	exports.generate  = generate.generate;
	exports.concat    = build.cycle;
	exports.concat    = build.concat;
	exports.startWith = build.cons;

	/**
	 * Tie this stream into a circle, thus creating an infinite stream
	 * @returns {Stream} new infinite stream
	 */
	Stream.prototype.cycle = function() {
		return build.cycle(this);
	};

	/**
	 * @param {Stream} tail
	 * @returns {Stream} new stream containing all items in this followed by
	 *  all items in tail
	 */
	Stream.prototype.concat = function(tail) {
		return build.concat(this, tail);
	};

	/**
	 * @param {*} x value to prepend
	 * @returns {Stream} a new stream with x prepended
	 */
	Stream.prototype.startWith = function(x) {
		return build.cons(x, this);
	};

	//-----------------------------------------------------------------------
	// Transforming

	var transform = __webpack_require__(33);
	var applicative = __webpack_require__(54);

	exports.map      = transform.map;
	exports.constant = transform.constant;
	exports.tap      = transform.tap;
	exports.ap       = applicative.ap;

	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @returns {Stream} stream containing items transformed by f
	 */
	Stream.prototype.map = function(f) {
		return transform.map(f, this);
	};

	/**
	 * Assume this stream contains functions, and apply each function to each item
	 * in the provided stream.  This generates, in effect, a cross product.
	 * @param {Stream} xs stream of items to which
	 * @returns {Stream} stream containing the cross product of items
	 */
	Stream.prototype.ap = function(xs) {
		return applicative.ap(this, xs);
	};

	/**
	 * Replace each value in the stream with x
	 * @param {*} x
	 * @returns {Stream} stream containing items replaced with x
	 */
	Stream.prototype.constant = function(x) {
		return transform.constant(x, this);
	};

	/**
	 * Perform a side effect for each item in the stream
	 * @param {function(x:*):*} f side effect to execute for each item. The
	 *  return value will be discarded.
	 * @returns {Stream} new stream containing the same items as this stream
	 */
	Stream.prototype.tap = function(f) {
		return transform.tap(f, this);
	};

	//-----------------------------------------------------------------------
	// Transducer support

	var transduce = __webpack_require__(55);

	exports.transduce = transduce.transduce;

	/**
	 * Transform this stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @return {Stream} stream of events transformed by the transducer
	 */
	Stream.prototype.transduce = function(transducer) {
		return transduce.transduce(transducer, this);
	};

	//-----------------------------------------------------------------------
	// FlatMapping

	var flatMap = __webpack_require__(56);

	exports.flatMap = exports.chain = flatMap.flatMap;
	exports.join    = flatMap.join;

	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	Stream.prototype.flatMap = Stream.prototype.chain = function(f) {
		return flatMap.flatMap(f, this);
	};

	/**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	Stream.prototype.join = function() {
		return flatMap.join(this);
	};

	var flatMapEnd = __webpack_require__(57).flatMapEnd;

	exports.flatMapEnd = flatMapEnd;

	/**
	 * Map the end event to a new stream, and begin emitting its values.
	 * @param {function(x:*):Stream} f function that receives the end event value,
	 * and *must* return a new Stream to continue with.
	 * @returns {Stream} new stream that emits all events from the original stream,
	 * followed by all events from the stream returned by f.
	 */
	Stream.prototype.flatMapEnd = function(f) {
		return flatMapEnd(f, this);
	};

	var concatMap = __webpack_require__(50).concatMap;

	exports.concatMap = concatMap;

	Stream.prototype.concatMap = function(f) {
		return concatMap(f, this);
	};

	//-----------------------------------------------------------------------
	// Merging

	var merge = __webpack_require__(58);

	exports.merge = merge.merge;

	/**
	 * Merge this stream and all the provided streams
	 * @returns {Stream} stream containing items from this stream and s in time
	 * order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	Stream.prototype.merge = function(/*...streams*/) {
		return merge.mergeArray(base.cons(this, arguments));
	};

	//-----------------------------------------------------------------------
	// Combining

	var combine = __webpack_require__(30);

	exports.combine = combine.combine;

	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	Stream.prototype.combine = function(f /*, ...streams*/) {
		return combine.combineArray(f, base.replace(this, 0, arguments));
	};

	//-----------------------------------------------------------------------
	// Sampling

	var sample = __webpack_require__(59);

	exports.sample = sample.sample;
	exports.sampleWith = sample.sampleWith;

	/**
	 * When an event arrives on sampler, emit the latest event value from stream.
	 * @param {Stream} sampler stream of events at whose arrival time
	 *  signal's latest value will be propagated
	 * @returns {Stream} sampled stream of values
	 */
	Stream.prototype.sampleWith = function(sampler) {
		return sample.sampleWith(sampler, this);
	};

	/**
	 * When an event arrives on this stream, emit the result of calling f with the latest
	 * values of all streams being sampled
	 * @param {function(...values):*} f function to apply to each set of sampled values
	 * @returns {Stream} stream of sampled and transformed values
	 */
	Stream.prototype.sample = function(f /* ...streams */) {
		return sample.sampleArray(f, this, base.tail(arguments));
	};

	//-----------------------------------------------------------------------
	// Zipping

	var zip = __webpack_require__(60);

	exports.zip = zip.zip;

	/**
	 * Pair-wise combine items with those in s. Given 2 streams:
	 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
	 * Note: zip causes fast streams to buffer and wait for slow streams.
	 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
	 * @returns {Stream} new stream containing pairs
	 */
	Stream.prototype.zip = function(f /*, ...streams*/) {
		return zip.zipArray(f, base.replace(this, 0, arguments));
	};

	//-----------------------------------------------------------------------
	// Switching

	var switchLatest = __webpack_require__(62).switch;

	exports.switch       = switchLatest;
	exports.switchLatest = switchLatest;

	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @returns {Stream} switching stream
	 */
	Stream.prototype.switch = Stream.prototype.switchLatest = function() {
		return switchLatest(this);
	};

	//-----------------------------------------------------------------------
	// Filtering

	var filter = __webpack_require__(65);

	exports.filter          = filter.filter;
	exports.skipRepeats     = exports.distinct   = filter.skipRepeats;
	exports.skipRepeatsWith = exports.distinctBy = filter.skipRepeatsWith;

	/**
	 * Retain only items matching a predicate
	 * stream:                           -12345678-
	 * filter(x => x % 2 === 0, stream): --2-4-6-8-
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */
	Stream.prototype.filter = function(p) {
		return filter.filter(p, this);
	};

	/**
	 * Skip repeated events, using === to compare items
	 * stream:           -abbcd-
	 * distinct(stream): -ab-cd-
	 * @returns {Stream} stream with no repeated events
	 */
	Stream.prototype.skipRepeats = function() {
		return filter.skipRepeats(this);
	};

	/**
	 * Skip repeated events, using supplied equals function to compare items
	 * @param {function(a:*, b:*):boolean} equals function to compare items
	 * @returns {Stream} stream with no repeated events
	 */
	Stream.prototype.skipRepeatsWith = function(equals) {
		return filter.skipRepeatsWith(equals, this);
	};

	//-----------------------------------------------------------------------
	// Slicing

	var slice = __webpack_require__(64);

	exports.take      = slice.take;
	exports.skip      = slice.skip;
	exports.slice     = slice.slice;
	exports.takeWhile = slice.takeWhile;
	exports.skipWhile = slice.skipWhile;

	/**
	 * stream:          -abcd-
	 * take(2, stream): -ab|
	 * @param {Number} n take up to this many events
	 * @returns {Stream} stream containing at most the first n items from this stream
	 */
	Stream.prototype.take = function(n) {
		return slice.take(n, this);
	};

	/**
	 * stream:          -abcd->
	 * skip(2, stream): ---cd->
	 * @param {Number} n skip this many events
	 * @returns {Stream} stream not containing the first n events
	 */
	Stream.prototype.skip = function(n) {
		return slice.skip(n, this);
	};

	/**
	 * Slice a stream by event index. Equivalent to, but more efficient than
	 * stream.take(end).skip(start);
	 * NOTE: Negative start and end are not supported
	 * @param {Number} start skip all events before the start index
	 * @param {Number} end allow all events from the start index to the end index
	 * @returns {Stream} stream containing items where start <= index < end
	 */
	Stream.prototype.slice = function(start, end) {
		return slice.slice(start, end, this);
	};

	/**
	 * stream:                        -123451234->
	 * takeWhile(x => x < 5, stream): -1234|
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items up to, but not including, the
	 * first item for which p returns falsy.
	 */
	Stream.prototype.takeWhile = function(p) {
		return slice.takeWhile(p, this);
	};

	/**
	 * stream:                        -123451234->
	 * skipWhile(x => x < 5, stream): -----51234->
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items following *and including* the
	 * first item for which p returns falsy.
	 */
	Stream.prototype.skipWhile = function(p) {
		return slice.skipWhile(p, this);
	};

	//-----------------------------------------------------------------------
	// Time slicing

	var timeslice = __webpack_require__(63);

	exports.until  = exports.takeUntil = timeslice.takeUntil;
	exports.since  = exports.skipUntil = timeslice.skipUntil;
	exports.during = timeslice.during; // EXPERIMENTAL

	/**
	 * stream:                    -a-b-c-d-e-f-g->
	 * signal:                    -------x
	 * takeUntil(signal, stream): -a-b-c-|
	 * @param {Stream} signal retain only events in stream before the first
	 * event in signal
	 * @returns {Stream} new stream containing only events that occur before
	 * the first event in signal.
	 */
	Stream.prototype.until = Stream.prototype.takeUntil = function(signal) {
		return timeslice.takeUntil(signal, this);
	};

	/**
	 * stream:                    -a-b-c-d-e-f-g->
	 * signal:                    -------x
	 * takeUntil(signal, stream): -------d-e-f-g->
	 * @param {Stream} signal retain only events in stream at or after the first
	 * event in signal
	 * @returns {Stream} new stream containing only events that occur after
	 * the first event in signal.
	 */
	Stream.prototype.since = Stream.prototype.skipUntil = function(signal) {
		return timeslice.skipUntil(signal, this);
	};

	/**
	 * stream:                    -a-b-c-d-e-f-g->
	 * timeWindow:                -----s
	 * s:                               -----t
	 * stream.during(timeWindow): -----c-d-e-|
	 * @param {Stream<Stream>} timeWindow a stream whose first event (s) represents
	 *  the window start time.  That event (s) is itself a stream whose first event (t)
	 *  represents the window end time
	 * @returns {Stream} new stream containing only events within the provided timespan
	 */
	Stream.prototype.during = function(timeWindow) {
		return timeslice.during(timeWindow, this);
	};

	//-----------------------------------------------------------------------
	// Delaying

	var delay = __webpack_require__(66).delay;

	exports.delay = delay;

	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	Stream.prototype.delay = function(delayTime) {
		return delay(delayTime, this);
	};

	//-----------------------------------------------------------------------
	// Getting event timestamp

	var timestamp = __webpack_require__(67).timestamp;

	exports.timestamp = timestamp;

	/**
	 * Expose event timestamps into the stream. Turns a Stream<X> into
	 * Stream<{time:t, value:X}>
	 * @returns {Stream<{time:number, value:*}>}
	 */
	Stream.prototype.timestamp = function() {
		return timestamp(this);
	};

	//-----------------------------------------------------------------------
	// Rate limiting

	var limit = __webpack_require__(68);

	exports.throttle = limit.throttle;
	exports.debounce = limit.debounce;

	/**
	 * Limit the rate of events
	 * stream:              abcd----abcd----
	 * throttle(2, stream): a-c-----a-c-----
	 * @param {Number} period time to suppress events
	 * @returns {Stream} new stream that skips events for throttle period
	 */
	Stream.prototype.throttle = function(period) {
		return limit.throttle(period, this);
	};

	/**
	 * Wait for a burst of events to subside and emit only the last event in the burst
	 * stream:              abcd----abcd----
	 * debounce(2, stream): -----d-------d--
	 * @param {Number} period events occuring more frequently than this
	 *  on the provided scheduler will be suppressed
	 * @returns {Stream} new debounced stream
	 */
	Stream.prototype.debounce = function(period) {
		return limit.debounce(period, this);
	};

	//-----------------------------------------------------------------------
	// Awaiting Promises

	var promises = __webpack_require__(69);

	exports.fromPromise = promises.fromPromise;
	exports.await       = promises.await;

	/**
	 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
	 * event order, but timeshifts events based on promise resolution time.
	 * @returns {Stream<X>} stream containing non-promise values
	 */
	Stream.prototype.await = function() {
		return promises.await(this);
	};

	//-----------------------------------------------------------------------
	// Error handling

	var errors = __webpack_require__(70);

	exports.flatMapError = errors.flatMapError;
	exports.throwError   = errors.throwError;

	/**
	 * If this stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * stream:                  -a-b-c-X-
	 * f(X):                           d-e-f-g-
	 * flatMapError(f, stream): -a-b-c-d-e-f-g-
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	Stream.prototype.flatMapError = function(f) {
		return errors.flatMapError(f, this);
	};

	//-----------------------------------------------------------------------
	// Multicasting

	var multicast = __webpack_require__(71).multicast;

	exports.multicast = multicast;

	/**
	 * Transform the stream into multicast stream.  That means that many subscribers
	 * to the stream will not cause multiple invocations of the internal machinery.
	 * @returns {Stream} new stream which will multicast events to all observers.
	 */
	Stream.prototype.multicast = function() {
		return multicast(this);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = Stream;

	function Stream(source) {
		this.source = source;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.noop = noop;
	exports.identity = identity;
	exports.compose = compose;

	exports.cons = cons;
	exports.append = append;
	exports.drop = drop;
	exports.tail = tail;
	exports.copy = copy;
	exports.map = map;
	exports.reduce = reduce;
	exports.replace = replace;
	exports.remove = remove;
	exports.removeAll = removeAll;
	exports.findIndex = findIndex;

	function noop() {}

	function identity(x) {
		return x;
	}

	function compose(f, g) {
		return function(x) {
			return f(g(x));
		};
	}

	function cons(x, array) {
		var l = array.length;
		var a = new Array(l + 1);
		a[0] = x;
		for(var i=0; i<l; ++i) {
			a[i + 1] = array[i];
		}
		return a;
	}

	function append(x, a) {
		var l = a.length;
		var b = new Array(l+1);
		for(var i=0; i<l; ++i) {
			b[i] = a[i];
		}

		b[l] = x;
		return b;
	}

	function drop(n, array) {
		var l = array.length;
		if(n >= l) {
			return [];
		}

		l -= n;
		var a = new Array(l);
		for(var i=0; i<l; ++i) {
			a[i] = array[n+i];
		}
		return a;
	}

	function tail(array) {
		return drop(1, array);
	}

	function copy(array) {
		var l = array.length;
		var a = new Array(l);
		for(var i=0; i<l; ++i) {
			a[i] = array[i];
		}
		return a;
	}

	function map(f, array) {
		var l = array.length;
		var a = new Array(l);
		for(var i=0; i<l; ++i) {
			a[i] = f(array[i]);
		}
		return a;
	}

	function reduce(f, z, array) {
		var r = z;
		for(var i=0, l=array.length; i<l; ++i) {
			r = f(r, array[i], i);
		}
		return r;
	}

	function replace(x, i, array) {
		var l = array.length;
		var a = new Array(l);
		for(var j=0; j<l; ++j) {
			a[j] = i === j ? x : array[j];
		}
		return a;
	}

	function remove(index, array) {
		var l = array.length;
		if(index >= array) { // exit early if index beyond end of array
			return array;
		}

		if(l === 1) { // exit early if index in bounds and length === 1
			return [];
		}

		l -= 1;
		var b = new Array(l);
		var i;
		for(i=0; i<index; ++i) {
			b[i] = array[i];
		}
		for(i=index; i<l; ++i) {
			b[i] = array[i+1];
		}

		return b;
	}

	function removeAll(f, a) {
		var l = a.length;
		var b = new Array(l);
		for(var x, i=0, j=0; i<l; ++i) {
			x = a[i];
			if(!f(x)) {
				b[j] = x;
				++j;
			}
		}

		b.length = j;
		return b;
	}

	function findIndex(x, a) {
		for (var i = 0, l = a.length; i < l; ++i) {
			if (x === a[i]) {
				return i;
			}
		}
		return -1;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var ValueSource = __webpack_require__(4);
	var Disposable = __webpack_require__(7);
	var EmptyDisposable = __webpack_require__(8);
	var PropagateTask = __webpack_require__(5);

	exports.of = streamOf;
	exports.empty = empty;
	exports.never = never;

	/**
	 * Stream containing only x
	 * @param {*} x
	 * @returns {Stream}
	 */
	function streamOf(x) {
		return new Stream(new ValueSource(emit, x));
	}

	function emit(t, x, sink) {
		sink.event(0, x);
		sink.end(0, void 0);
	}

	/**
	 * Stream containing no events and ends immediately
	 * @returns {Stream}
	 */
	function empty() {
		return EMPTY;
	}

	function EmptySource() {}

	EmptySource.prototype.run = function(sink, scheduler) {
		var task = PropagateTask.end(void 0, sink);
		scheduler.asap(task);

		return new Disposable(dispose, task);
	};

	function dispose(task) {
		return task.dispose();
	}

	var EMPTY = new Stream(new EmptySource());

	/**
	 * Stream containing no events and never ends
	 * @returns {Stream}
	 */
	function never() {
		return NEVER;
	}

	function NeverSource() {}

	NeverSource.prototype.run = function() {
		return new EmptyDisposable();
	};

	var NEVER = new Stream(new NeverSource());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var PropagateTask = __webpack_require__(5);

	module.exports = ValueSource;

	function ValueSource(emit, x) {
		this.emit = emit;
		this.value = x;
	}

	ValueSource.prototype.run = function(sink, scheduler) {
		return new ValueProducer(this.emit, this.value, sink, scheduler);
	};

	function ValueProducer(emit, x, sink, scheduler) {
		this.task = new PropagateTask(emit, x, sink);
		scheduler.asap(this.task);
	}

	ValueProducer.prototype.dispose = function() {
		return this.task.dispose();
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var fatal = __webpack_require__(6);

	module.exports = PropagateTask;

	function PropagateTask(run, value, sink) {
		this._run = run;
		this.value = value;
		this.sink = sink;
		this.active = true;
	}

	PropagateTask.event = function(value, sink) {
		return new PropagateTask(emit, value, sink);
	};

	PropagateTask.end = function(value, sink) {
		return new PropagateTask(end, value, sink);
	};

	PropagateTask.error = function(value, sink) {
		return new PropagateTask(error, value, sink);
	};

	PropagateTask.prototype.dispose = function() {
		this.active = false;
	};

	PropagateTask.prototype.run = function(t) {
		if(!this.active) {
			return;
		}
		this._run(t, this.value, this.sink);
	};

	PropagateTask.prototype.error = function(t, e) {
		if(!this.active) {
			return fatal(e);
		}
		this.sink.error(t, e);
	};

	function error(t, e, sink) {
		sink.error(t, e);
	}

	function emit(t, x, sink) {
		sink.event(t, x);
	}

	function end(t, x, sink) {
		sink.end(t, x);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = fatalError;

	function fatalError (e) {
		setTimeout(function() {
			throw e;
		}, 0);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = Disposable;

	function Disposable(f, data) {
		this.disposed = false;
		this._dispose = f;
		this._data = data;
	}

	Disposable.prototype.dispose = function() {
		if(this.disposed) {
			return;
		}
		this.disposed = true;
		return this._dispose(this._data);
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var noop = __webpack_require__(2).noop;

	module.exports = EmptyDisposable;

	function EmptyDisposable() {}

	EmptyDisposable.prototype.dispose = noop;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var fromArray = __webpack_require__(10).fromArray;
	var isIterable = __webpack_require__(11).isIterable;
	var fromIterable = __webpack_require__(12).fromIterable;

	exports.from = from;

	function from(a) {
		if(Array.isArray(a)) {
			return fromArray(a);
		}

		if(isIterable(a)) {
			return fromIterable(a);
		}

		throw new TypeError('not iterable: ' + a);
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var PropagateTask = __webpack_require__(5);

	exports.fromArray = fromArray;

	function fromArray (a) {
		return new Stream(new ArraySource(a));
	}

	function ArraySource(a) {
		this.array = a;
	}

	ArraySource.prototype.run = function(sink, scheduler) {
		return new ArrayProducer(this.array, sink, scheduler);
	};

	function ArrayProducer(array, sink, scheduler) {
		this.scheduler = scheduler;
		this.task = new PropagateTask(runProducer, array, sink);
		scheduler.asap(this.task);
	}

	ArrayProducer.prototype.dispose = function() {
		return this.task.dispose();
	};

	function runProducer(t, array, sink) {
		return produce(this, array, sink, 0);
	}

	function produce(task, array, sink, k) {
		for(var i=k, l=array.length; i<l && task.active; ++i) {
			sink.event(0, array[i]);
		}

		return end();

		function end() {
			return task.active && sink.end(0);
		}
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.isIterable = isIterable;
	exports.getIterator = getIterator;
	exports.makeIterable = makeIterable;

	/*global Set, Symbol*/
	var iteratorSymbol;
	// Firefox ships a partial implementation using the name @@iterator.
	// https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
	if (typeof Set === 'function' && typeof new Set()['@@iterator'] === 'function') {
		iteratorSymbol = '@@iterator';
	} else {
		iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator ||
		'_es6shim_iterator_';
	}

	function isIterable(o) {
		return typeof o[iteratorSymbol] === 'function';
	}

	function getIterator(o) {
		return o[iteratorSymbol]();
	}

	function makeIterable(f, o) {
		o[iteratorSymbol] = f;
		return o;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var getIterator = __webpack_require__(11).getIterator;
	var PropagateTask = __webpack_require__(5);

	exports.fromIterable = fromIterable;

	function fromIterable(iterable) {
		return new Stream(new IterableSource(iterable));
	}

	function IterableSource(iterable) {
		this.iterable = iterable;
	}

	IterableSource.prototype.run = function(sink, scheduler) {
		return new IteratorProducer(getIterator(this.iterable), sink, scheduler);
	};

	function IteratorProducer(iterator, sink, scheduler) {
		this.scheduler = scheduler;
		this.iterator = iterator;
		this.task = new PropagateTask(runProducer, this, sink);
		scheduler.asap(this.task);
	}

	IteratorProducer.prototype.dispose = function() {
		return this.task.dispose();
	};

	function runProducer(t, producer, sink) {
		var x = producer.iterator.next();
		if(x.done) {
			sink.end(t, x.value);
		} else {
			sink.event(t, x.value);
		}

		producer.scheduler.asap(producer.task);
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Disposable = __webpack_require__(7);
	var MulticastSource = __webpack_require__(14);
	var PropagateTask = __webpack_require__(5);

	exports.periodic = periodic;

	/**
	 * Create a stream that emits the current time periodically
	 * @param {Number} period periodicity of events in millis
	 * @param {*) value value to emit each period
	 * @returns {Stream} new stream that emits the current time every period
	 */
	function periodic(period, value) {
		return new Stream(new MulticastSource(new Periodic(period, value)));
	}

	function Periodic(period, value) {
		this.period = period;
		this.value = value;
	}

	Periodic.prototype.run = function(sink, scheduler) {
		var task = scheduler.periodic(this.period, new PropagateTask(emit, this.value, sink));
		return new Disposable(cancelTask, task);
	};

	function cancelTask(task) {
		task.cancel();
	}

	function emit(t, x, sink) {
		sink.event(t, x);
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var base = __webpack_require__(2);
	var resolve = __webpack_require__(15).resolve;

	module.exports = MulticastSource;

	function MulticastSource(source) {
		this.source = source;
		this.sink = new MulticastSink();
		this._disposable = void 0;
	}

	MulticastSource.prototype.run = function(sink, scheduler) {
		var n = this.sink.add(sink);
		if(n === 1) {
			this._disposable = this.source.run(this.sink, scheduler);
		}

		return new MulticastDisposable(this, sink);
	};

	MulticastSource.prototype._dispose = function() {
		return resolve(this._disposable).then(dispose);
	};

	function dispose(disposable) {
		if(disposable === void 0) {
			return;
		}
		return disposable.dispose();
	}

	function MulticastDisposable(source, sink) {
		this.source = source;
		this.sink = sink;
	}

	MulticastDisposable.prototype.dispose = function() {
		var s = this.source;
		var remaining = s.sink.remove(this.sink);
		return remaining === 0 && s._dispose();
	};

	function MulticastSink() {
		this.sinks = [];
	}

	MulticastSink.prototype.add = function(sink) {
		this.sinks = base.append(sink, this.sinks);
		return this.sinks.length;
	};

	MulticastSink.prototype.remove = function(sink) {
		this.sinks = base.remove(base.findIndex(sink, this.sinks), this.sinks);
		return this.sinks.length;
	};

	MulticastSink.prototype.event = function(t, x) {
		var s = this.sinks;
		if(s.length === 1) {
			s[0].event(t, x);
			return;
		}
		for(var i=0; i<s.length; ++i) {
			s[i].event(t, x);
		}
	};

	MulticastSink.prototype.end = function(t, x) {
		var s = this.sinks;
		if(s.length === 1) {
			s[0].end(t, x);
			return;
		}
		for(var i=0; i<s.length; ++i) {
			s[i].end(t, x);
		}
	};

	MulticastSink.prototype.error = function(t, e) {
		var s = this.sinks;
		if(s.length === 1) {
			s[0].error(t, e);
			return;
		}
		for (var i=0; i<s.length; ++i) {
			s[i].error(t, e);
		}
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var unhandledRejection = __webpack_require__(16);
	module.exports = unhandledRejection(__webpack_require__(22));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

		var setTimer = __webpack_require__(18).setTimer;
		var format = __webpack_require__(21);

		return function unhandledRejection(Promise) {

			var logError = noop;
			var logInfo = noop;
			var localConsole;

			if(typeof console !== 'undefined') {
				// Alias console to prevent things like uglify's drop_console option from
				// removing console.log/error. Unhandled rejections fall into the same
				// category as uncaught exceptions, and build tools shouldn't silence them.
				localConsole = console;
				logError = typeof localConsole.error !== 'undefined'
					? function (e) { localConsole.error(e); }
					: function (e) { localConsole.log(e); };

				logInfo = typeof localConsole.info !== 'undefined'
					? function (e) { localConsole.info(e); }
					: function (e) { localConsole.log(e); };
			}

			Promise.onPotentiallyUnhandledRejection = function(rejection) {
				enqueue(report, rejection);
			};

			Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
				enqueue(unreport, rejection);
			};

			Promise.onFatalRejection = function(rejection) {
				enqueue(throwit, rejection.value);
			};

			var tasks = [];
			var reported = [];
			var running = null;

			function report(r) {
				if(!r.handled) {
					reported.push(r);
					logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
				}
			}

			function unreport(r) {
				var i = reported.indexOf(r);
				if(i >= 0) {
					reported.splice(i, 1);
					logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
				}
			}

			function enqueue(f, x) {
				tasks.push(f, x);
				if(running === null) {
					running = setTimer(flush, 0);
				}
			}

			function flush() {
				running = null;
				while(tasks.length > 0) {
					tasks.shift()(tasks.shift());
				}
			}

			return Promise;
		};

		function throwit(e) {
			throw e;
		}

		function noop() {}

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(17)));


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		/*jshint maxcomplexity:6*/

		// Sniff "best" async scheduling option
		// Prefer process.nextTick or MutationObserver, then check for
		// setTimeout, and finally vertx, since its the only env that doesn't
		// have setTimeout

		var MutationObs;
		var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

		// Default env
		var setTimer = function(f, ms) { return setTimeout(f, ms); };
		var clearTimer = function(t) { return clearTimeout(t); };
		var asap = function (f) { return capturedSetTimeout(f, 0); };

		// Detect specific env
		if (isNode()) { // Node
			asap = function (f) { return process.nextTick(f); };

		} else if (MutationObs = hasMutationObserver()) { // Modern browser
			asap = initMutationObserver(MutationObs);

		} else if (!capturedSetTimeout) { // vert.x
			var vertxRequire = require;
			var vertx = __webpack_require__(20);
			setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
			clearTimer = vertx.cancelTimer;
			asap = vertx.runOnLoop || vertx.runOnContext;
		}

		return {
			setTimer: setTimer,
			clearTimer: clearTimer,
			asap: asap
		};

		function isNode () {
			return typeof process !== 'undefined' && process !== null &&
				typeof process.nextTick === 'function';
		}

		function hasMutationObserver () {
			return (typeof MutationObserver === 'function' && MutationObserver) ||
				(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
		}

		function initMutationObserver(MutationObserver) {
			var scheduled;
			var node = document.createTextNode('');
			var o = new MutationObserver(run);
			o.observe(node, { characterData: true });

			function run() {
				var f = scheduled;
				scheduled = void 0;
				f();
			}

			var i = 0;
			return function (f) {
				scheduled = f;
				node.data = (i ^= 1);
			};
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(17)));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 19 */
/***/ function(module, exports) {

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


/***/ },
/* 20 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

		return {
			formatError: formatError,
			formatObject: formatObject,
			tryStringify: tryStringify
		};

		/**
		 * Format an error into a string.  If e is an Error and has a stack property,
		 * it's returned.  Otherwise, e is formatted using formatObject, with a
		 * warning added about e not being a proper Error.
		 * @param {*} e
		 * @returns {String} formatted string, suitable for output to developers
		 */
		function formatError(e) {
			var s = typeof e === 'object' && e !== null && e.stack ? e.stack : formatObject(e);
			return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
		}

		/**
		 * Format an object, detecting "plain" objects and running them through
		 * JSON.stringify if possible.
		 * @param {Object} o
		 * @returns {string}
		 */
		function formatObject(o) {
			var s = String(o);
			if(s === '[object Object]' && typeof JSON !== 'undefined') {
				s = tryStringify(o, s);
			}
			return s;
		}

		/**
		 * Try to return the result of JSON.stringify(x).  If that fails, return
		 * defaultValue
		 * @param {*} x
		 * @param {*} defaultValue
		 * @returns {String|*} JSON.stringify(x) or defaultValue
		 */
		function tryStringify(x, defaultValue) {
			try {
				return JSON.stringify(x);
			} catch(e) {
				return defaultValue;
			}
		}

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(17)));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

		var makePromise = __webpack_require__(23);
		var Scheduler = __webpack_require__(24);
		var async = __webpack_require__(18).asap;

		return makePromise({
			scheduler: new Scheduler(async)
		});

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(17));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

		return function makePromise(environment) {

			var tasks = environment.scheduler;
			var emitRejection = initEmitRejection();

			var objectCreate = Object.create ||
				function(proto) {
					function Child() {}
					Child.prototype = proto;
					return new Child();
				};

			/**
			 * Create a promise whose fate is determined by resolver
			 * @constructor
			 * @returns {Promise} promise
			 * @name Promise
			 */
			function Promise(resolver, handler) {
				this._handler = resolver === Handler ? handler : init(resolver);
			}

			/**
			 * Run the supplied resolver
			 * @param resolver
			 * @returns {Pending}
			 */
			function init(resolver) {
				var handler = new Pending();

				try {
					resolver(promiseResolve, promiseReject, promiseNotify);
				} catch (e) {
					promiseReject(e);
				}

				return handler;

				/**
				 * Transition from pre-resolution state to post-resolution state, notifying
				 * all listeners of the ultimate fulfillment or rejection
				 * @param {*} x resolution value
				 */
				function promiseResolve (x) {
					handler.resolve(x);
				}
				/**
				 * Reject this promise with reason, which will be used verbatim
				 * @param {Error|*} reason rejection reason, strongly suggested
				 *   to be an Error type
				 */
				function promiseReject (reason) {
					handler.reject(reason);
				}

				/**
				 * @deprecated
				 * Issue a progress event, notifying all progress listeners
				 * @param {*} x progress event payload to pass to all listeners
				 */
				function promiseNotify (x) {
					handler.notify(x);
				}
			}

			// Creation

			Promise.resolve = resolve;
			Promise.reject = reject;
			Promise.never = never;

			Promise._defer = defer;
			Promise._handler = getHandler;

			/**
			 * Returns a trusted promise. If x is already a trusted promise, it is
			 * returned, otherwise returns a new trusted Promise which follows x.
			 * @param  {*} x
			 * @return {Promise} promise
			 */
			function resolve(x) {
				return isPromise(x) ? x
					: new Promise(Handler, new Async(getHandler(x)));
			}

			/**
			 * Return a reject promise with x as its reason (x is used verbatim)
			 * @param {*} x
			 * @returns {Promise} rejected promise
			 */
			function reject(x) {
				return new Promise(Handler, new Async(new Rejected(x)));
			}

			/**
			 * Return a promise that remains pending forever
			 * @returns {Promise} forever-pending promise.
			 */
			function never() {
				return foreverPendingPromise; // Should be frozen
			}

			/**
			 * Creates an internal {promise, resolver} pair
			 * @private
			 * @returns {Promise}
			 */
			function defer() {
				return new Promise(Handler, new Pending());
			}

			// Transformation and flow control

			/**
			 * Transform this promise's fulfillment value, returning a new Promise
			 * for the transformed result.  If the promise cannot be fulfilled, onRejected
			 * is called with the reason.  onProgress *may* be called with updates toward
			 * this promise's fulfillment.
			 * @param {function=} onFulfilled fulfillment handler
			 * @param {function=} onRejected rejection handler
			 * @param {function=} onProgress @deprecated progress handler
			 * @return {Promise} new promise
			 */
			Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
				var parent = this._handler;
				var state = parent.join().state();

				if ((typeof onFulfilled !== 'function' && state > 0) ||
					(typeof onRejected !== 'function' && state < 0)) {
					// Short circuit: value will not change, simply share handler
					return new this.constructor(Handler, parent);
				}

				var p = this._beget();
				var child = p._handler;

				parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

				return p;
			};

			/**
			 * If this promise cannot be fulfilled due to an error, call onRejected to
			 * handle the error. Shortcut for .then(undefined, onRejected)
			 * @param {function?} onRejected
			 * @return {Promise}
			 */
			Promise.prototype['catch'] = function(onRejected) {
				return this.then(void 0, onRejected);
			};

			/**
			 * Creates a new, pending promise of the same type as this promise
			 * @private
			 * @returns {Promise}
			 */
			Promise.prototype._beget = function() {
				return begetFrom(this._handler, this.constructor);
			};

			function begetFrom(parent, Promise) {
				var child = new Pending(parent.receiver, parent.join().context);
				return new Promise(Handler, child);
			}

			// Array combinators

			Promise.all = all;
			Promise.race = race;
			Promise._traverse = traverse;

			/**
			 * Return a promise that will fulfill when all promises in the
			 * input array have fulfilled, or will reject when one of the
			 * promises rejects.
			 * @param {array} promises array of promises
			 * @returns {Promise} promise for array of fulfillment values
			 */
			function all(promises) {
				return traverseWith(snd, null, promises);
			}

			/**
			 * Array<Promise<X>> -> Promise<Array<f(X)>>
			 * @private
			 * @param {function} f function to apply to each promise's value
			 * @param {Array} promises array of promises
			 * @returns {Promise} promise for transformed values
			 */
			function traverse(f, promises) {
				return traverseWith(tryCatch2, f, promises);
			}

			function traverseWith(tryMap, f, promises) {
				var handler = typeof f === 'function' ? mapAt : settleAt;

				var resolver = new Pending();
				var pending = promises.length >>> 0;
				var results = new Array(pending);

				for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
					x = promises[i];

					if (x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}

					traverseAt(promises, handler, i, x, resolver);
				}

				if(pending === 0) {
					resolver.become(new Fulfilled(results));
				}

				return new Promise(Handler, resolver);

				function mapAt(i, x, resolver) {
					if(!resolver.resolved) {
						traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
					}
				}

				function settleAt(i, x, resolver) {
					results[i] = x;
					if(--pending === 0) {
						resolver.become(new Fulfilled(results));
					}
				}
			}

			function traverseAt(promises, handler, i, x, resolver) {
				if (maybeThenable(x)) {
					var h = getHandlerMaybeThenable(x);
					var s = h.state();

					if (s === 0) {
						h.fold(handler, i, void 0, resolver);
					} else if (s > 0) {
						handler(i, h.value, resolver);
					} else {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
					}
				} else {
					handler(i, x, resolver);
				}
			}

			Promise._visitRemaining = visitRemaining;
			function visitRemaining(promises, start, handler) {
				for(var i=start; i<promises.length; ++i) {
					markAsHandled(getHandler(promises[i]), handler);
				}
			}

			function markAsHandled(h, handler) {
				if(h === handler) {
					return;
				}

				var s = h.state();
				if(s === 0) {
					h.visit(h, void 0, h._unreport);
				} else if(s < 0) {
					h._unreport();
				}
			}

			/**
			 * Fulfill-reject competitive race. Return a promise that will settle
			 * to the same state as the earliest input promise to settle.
			 *
			 * WARNING: The ES6 Promise spec requires that race()ing an empty array
			 * must return a promise that is pending forever.  This implementation
			 * returns a singleton forever-pending promise, the same singleton that is
			 * returned by Promise.never(), thus can be checked with ===
			 *
			 * @param {array} promises array of promises to race
			 * @returns {Promise} if input is non-empty, a promise that will settle
			 * to the same outcome as the earliest input promise to settle. if empty
			 * is empty, returns a promise that will never settle.
			 */
			function race(promises) {
				if(typeof promises !== 'object' || promises === null) {
					return reject(new TypeError('non-iterable passed to race()'));
				}

				// Sigh, race([]) is untestable unless we return *something*
				// that is recognizable without calling .then() on it.
				return promises.length === 0 ? never()
					 : promises.length === 1 ? resolve(promises[0])
					 : runRace(promises);
			}

			function runRace(promises) {
				var resolver = new Pending();
				var i, x, h;
				for(i=0; i<promises.length; ++i) {
					x = promises[i];
					if (x === void 0 && !(i in promises)) {
						continue;
					}

					h = getHandler(x);
					if(h.state() !== 0) {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
						break;
					} else {
						h.visit(resolver, resolver.resolve, resolver.reject);
					}
				}
				return new Promise(Handler, resolver);
			}

			// Promise internals
			// Below this, everything is @private

			/**
			 * Get an appropriate handler for x, without checking for cycles
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandler(x) {
				if(isPromise(x)) {
					return x._handler.join();
				}
				return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
			}

			/**
			 * Get a handler for thenable x.
			 * NOTE: You must only call this if maybeThenable(x) == true
			 * @param {object|function|Promise} x
			 * @returns {object} handler
			 */
			function getHandlerMaybeThenable(x) {
				return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
			}

			/**
			 * Get a handler for potentially untrusted thenable x
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandlerUntrusted(x) {
				try {
					var untrustedThen = x.then;
					return typeof untrustedThen === 'function'
						? new Thenable(untrustedThen, x)
						: new Fulfilled(x);
				} catch(e) {
					return new Rejected(e);
				}
			}

			/**
			 * Handler for a promise that is pending forever
			 * @constructor
			 */
			function Handler() {}

			Handler.prototype.when
				= Handler.prototype.become
				= Handler.prototype.notify // deprecated
				= Handler.prototype.fail
				= Handler.prototype._unreport
				= Handler.prototype._report
				= noop;

			Handler.prototype._state = 0;

			Handler.prototype.state = function() {
				return this._state;
			};

			/**
			 * Recursively collapse handler chain to find the handler
			 * nearest to the fully resolved value.
			 * @returns {object} handler nearest the fully resolved value
			 */
			Handler.prototype.join = function() {
				var h = this;
				while(h.handler !== void 0) {
					h = h.handler;
				}
				return h;
			};

			Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
				this.when({
					resolver: to,
					receiver: receiver,
					fulfilled: fulfilled,
					rejected: rejected,
					progress: progress
				});
			};

			Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
				this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
			};

			Handler.prototype.fold = function(f, z, c, to) {
				this.when(new Fold(f, z, c, to));
			};

			/**
			 * Handler that invokes fail() on any handler it becomes
			 * @constructor
			 */
			function FailIfRejected() {}

			inherit(Handler, FailIfRejected);

			FailIfRejected.prototype.become = function(h) {
				h.fail();
			};

			var failIfRejected = new FailIfRejected();

			/**
			 * Handler that manages a queue of consumers waiting on a pending promise
			 * @constructor
			 */
			function Pending(receiver, inheritedContext) {
				Promise.createContext(this, inheritedContext);

				this.consumers = void 0;
				this.receiver = receiver;
				this.handler = void 0;
				this.resolved = false;
			}

			inherit(Handler, Pending);

			Pending.prototype._state = 0;

			Pending.prototype.resolve = function(x) {
				this.become(getHandler(x));
			};

			Pending.prototype.reject = function(x) {
				if(this.resolved) {
					return;
				}

				this.become(new Rejected(x));
			};

			Pending.prototype.join = function() {
				if (!this.resolved) {
					return this;
				}

				var h = this;

				while (h.handler !== void 0) {
					h = h.handler;
					if (h === this) {
						return this.handler = cycle();
					}
				}

				return h;
			};

			Pending.prototype.run = function() {
				var q = this.consumers;
				var handler = this.handler;
				this.handler = this.handler.join();
				this.consumers = void 0;

				for (var i = 0; i < q.length; ++i) {
					handler.when(q[i]);
				}
			};

			Pending.prototype.become = function(handler) {
				if(this.resolved) {
					return;
				}

				this.resolved = true;
				this.handler = handler;
				if(this.consumers !== void 0) {
					tasks.enqueue(this);
				}

				if(this.context !== void 0) {
					handler._report(this.context);
				}
			};

			Pending.prototype.when = function(continuation) {
				if(this.resolved) {
					tasks.enqueue(new ContinuationTask(continuation, this.handler));
				} else {
					if(this.consumers === void 0) {
						this.consumers = [continuation];
					} else {
						this.consumers.push(continuation);
					}
				}
			};

			/**
			 * @deprecated
			 */
			Pending.prototype.notify = function(x) {
				if(!this.resolved) {
					tasks.enqueue(new ProgressTask(x, this));
				}
			};

			Pending.prototype.fail = function(context) {
				var c = typeof context === 'undefined' ? this.context : context;
				this.resolved && this.handler.join().fail(c);
			};

			Pending.prototype._report = function(context) {
				this.resolved && this.handler.join()._report(context);
			};

			Pending.prototype._unreport = function() {
				this.resolved && this.handler.join()._unreport();
			};

			/**
			 * Wrap another handler and force it into a future stack
			 * @param {object} handler
			 * @constructor
			 */
			function Async(handler) {
				this.handler = handler;
			}

			inherit(Handler, Async);

			Async.prototype.when = function(continuation) {
				tasks.enqueue(new ContinuationTask(continuation, this));
			};

			Async.prototype._report = function(context) {
				this.join()._report(context);
			};

			Async.prototype._unreport = function() {
				this.join()._unreport();
			};

			/**
			 * Handler that wraps an untrusted thenable and assimilates it in a future stack
			 * @param {function} then
			 * @param {{then: function}} thenable
			 * @constructor
			 */
			function Thenable(then, thenable) {
				Pending.call(this);
				tasks.enqueue(new AssimilateTask(then, thenable, this));
			}

			inherit(Pending, Thenable);

			/**
			 * Handler for a fulfilled promise
			 * @param {*} x fulfillment value
			 * @constructor
			 */
			function Fulfilled(x) {
				Promise.createContext(this);
				this.value = x;
			}

			inherit(Handler, Fulfilled);

			Fulfilled.prototype._state = 1;

			Fulfilled.prototype.fold = function(f, z, c, to) {
				runContinuation3(f, z, this, c, to);
			};

			Fulfilled.prototype.when = function(cont) {
				runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
			};

			var errorId = 0;

			/**
			 * Handler for a rejected promise
			 * @param {*} x rejection reason
			 * @constructor
			 */
			function Rejected(x) {
				Promise.createContext(this);

				this.id = ++errorId;
				this.value = x;
				this.handled = false;
				this.reported = false;

				this._report();
			}

			inherit(Handler, Rejected);

			Rejected.prototype._state = -1;

			Rejected.prototype.fold = function(f, z, c, to) {
				to.become(this);
			};

			Rejected.prototype.when = function(cont) {
				if(typeof cont.rejected === 'function') {
					this._unreport();
				}
				runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
			};

			Rejected.prototype._report = function(context) {
				tasks.afterQueue(new ReportTask(this, context));
			};

			Rejected.prototype._unreport = function() {
				if(this.handled) {
					return;
				}
				this.handled = true;
				tasks.afterQueue(new UnreportTask(this));
			};

			Rejected.prototype.fail = function(context) {
				this.reported = true;
				emitRejection('unhandledRejection', this);
				Promise.onFatalRejection(this, context === void 0 ? this.context : context);
			};

			function ReportTask(rejection, context) {
				this.rejection = rejection;
				this.context = context;
			}

			ReportTask.prototype.run = function() {
				if(!this.rejection.handled && !this.rejection.reported) {
					this.rejection.reported = true;
					emitRejection('unhandledRejection', this.rejection) ||
						Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
				}
			};

			function UnreportTask(rejection) {
				this.rejection = rejection;
			}

			UnreportTask.prototype.run = function() {
				if(this.rejection.reported) {
					emitRejection('rejectionHandled', this.rejection) ||
						Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
				}
			};

			// Unhandled rejection hooks
			// By default, everything is a noop

			Promise.createContext
				= Promise.enterContext
				= Promise.exitContext
				= Promise.onPotentiallyUnhandledRejection
				= Promise.onPotentiallyUnhandledRejectionHandled
				= Promise.onFatalRejection
				= noop;

			// Errors and singletons

			var foreverPendingHandler = new Handler();
			var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

			function cycle() {
				return new Rejected(new TypeError('Promise cycle'));
			}

			// Task runners

			/**
			 * Run a single consumer
			 * @constructor
			 */
			function ContinuationTask(continuation, handler) {
				this.continuation = continuation;
				this.handler = handler;
			}

			ContinuationTask.prototype.run = function() {
				this.handler.join().when(this.continuation);
			};

			/**
			 * Run a queue of progress handlers
			 * @constructor
			 */
			function ProgressTask(value, handler) {
				this.handler = handler;
				this.value = value;
			}

			ProgressTask.prototype.run = function() {
				var q = this.handler.consumers;
				if(q === void 0) {
					return;
				}

				for (var c, i = 0; i < q.length; ++i) {
					c = q[i];
					runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
				}
			};

			/**
			 * Assimilate a thenable, sending it's value to resolver
			 * @param {function} then
			 * @param {object|function} thenable
			 * @param {object} resolver
			 * @constructor
			 */
			function AssimilateTask(then, thenable, resolver) {
				this._then = then;
				this.thenable = thenable;
				this.resolver = resolver;
			}

			AssimilateTask.prototype.run = function() {
				var h = this.resolver;
				tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

				function _resolve(x) { h.resolve(x); }
				function _reject(x)  { h.reject(x); }
				function _notify(x)  { h.notify(x); }
			};

			function tryAssimilate(then, thenable, resolve, reject, notify) {
				try {
					then.call(thenable, resolve, reject, notify);
				} catch (e) {
					reject(e);
				}
			}

			/**
			 * Fold a handler value with z
			 * @constructor
			 */
			function Fold(f, z, c, to) {
				this.f = f; this.z = z; this.c = c; this.to = to;
				this.resolver = failIfRejected;
				this.receiver = this;
			}

			Fold.prototype.fulfilled = function(x) {
				this.f.call(this.c, this.z, x, this.to);
			};

			Fold.prototype.rejected = function(x) {
				this.to.reject(x);
			};

			Fold.prototype.progress = function(x) {
				this.to.notify(x);
			};

			// Other helpers

			/**
			 * @param {*} x
			 * @returns {boolean} true iff x is a trusted Promise
			 */
			function isPromise(x) {
				return x instanceof Promise;
			}

			/**
			 * Test just enough to rule out primitives, in order to take faster
			 * paths in some code
			 * @param {*} x
			 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
			 */
			function maybeThenable(x) {
				return (typeof x === 'object' || typeof x === 'function') && x !== null;
			}

			function runContinuation1(f, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}

				Promise.enterContext(h);
				tryCatchReject(f, h.value, receiver, next);
				Promise.exitContext();
			}

			function runContinuation3(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}

				Promise.enterContext(h);
				tryCatchReject3(f, x, h.value, receiver, next);
				Promise.exitContext();
			}

			/**
			 * @deprecated
			 */
			function runNotify(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.notify(x);
				}

				Promise.enterContext(h);
				tryCatchReturn(f, x, receiver, next);
				Promise.exitContext();
			}

			function tryCatch2(f, a, b) {
				try {
					return f(a, b);
				} catch(e) {
					return reject(e);
				}
			}

			/**
			 * Return f.call(thisArg, x), or if it throws return a rejected promise for
			 * the thrown exception
			 */
			function tryCatchReject(f, x, thisArg, next) {
				try {
					next.become(getHandler(f.call(thisArg, x)));
				} catch(e) {
					next.become(new Rejected(e));
				}
			}

			/**
			 * Same as above, but includes the extra argument parameter.
			 */
			function tryCatchReject3(f, x, y, thisArg, next) {
				try {
					f.call(thisArg, x, y, next);
				} catch(e) {
					next.become(new Rejected(e));
				}
			}

			/**
			 * @deprecated
			 * Return f.call(thisArg, x), or if it throws, *return* the exception
			 */
			function tryCatchReturn(f, x, thisArg, next) {
				try {
					next.notify(f.call(thisArg, x));
				} catch(e) {
					next.notify(e);
				}
			}

			function inherit(Parent, Child) {
				Child.prototype = objectCreate(Parent.prototype);
				Child.prototype.constructor = Child;
			}

			function snd(x, y) {
				return y;
			}

			function noop() {}

			function initEmitRejection() {
				/*global process, self, CustomEvent*/
				if(typeof process !== 'undefined' && process !== null
					&& typeof process.emit === 'function') {
					// Returning falsy here means to call the default
					// onPotentiallyUnhandledRejection API.  This is safe even in
					// browserify since process.emit always returns falsy in browserify:
					// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
					return function(type, rejection) {
						return type === 'unhandledRejection'
							? process.emit(type, rejection.value, rejection)
							: process.emit(type, rejection);
					};
				} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
					return (function(noop, self, CustomEvent) {
						var hasCustomEvent = false;
						try {
							var ev = new CustomEvent('unhandledRejection');
							hasCustomEvent = ev instanceof CustomEvent;
						} catch (e) {}

						return !hasCustomEvent ? noop : function(type, rejection) {
							var ev = new CustomEvent(type, {
								detail: {
									reason: rejection.value,
									key: rejection
								},
								bubbles: false,
								cancelable: true
							});

							return !self.dispatchEvent(ev);
						};
					}(noop, self, CustomEvent));
				}

				return noop;
			}

			return Promise;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(17)));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {

		// Credit to Twisol (https://github.com/Twisol) for suggesting
		// this type of extensible queue + trampoline approach for next-tick conflation.

		/**
		 * Async task scheduler
		 * @param {function} async function to schedule a single async function
		 * @constructor
		 */
		function Scheduler(async) {
			this._async = async;
			this._running = false;

			this._queue = this;
			this._queueLen = 0;
			this._afterQueue = {};
			this._afterQueueLen = 0;

			var self = this;
			this.drain = function() {
				self._drain();
			};
		}

		/**
		 * Enqueue a task
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.enqueue = function(task) {
			this._queue[this._queueLen++] = task;
			this.run();
		};

		/**
		 * Enqueue a task to run after the main task queue
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.afterQueue = function(task) {
			this._afterQueue[this._afterQueueLen++] = task;
			this.run();
		};

		Scheduler.prototype.run = function() {
			if (!this._running) {
				this._running = true;
				this._async(this.drain);
			}
		};

		/**
		 * Drain the handler queue entirely, and then the after queue
		 */
		Scheduler.prototype._drain = function() {
			var i = 0;
			for (; i < this._queueLen; ++i) {
				this._queue[i].run();
				this._queue[i] = void 0;
			}

			this._queueLen = 0;
			this._running = false;

			for (i = 0; i < this._afterQueueLen; ++i) {
				this._afterQueue[i].run();
				this._afterQueue[i] = void 0;
			}

			this._afterQueueLen = 0;
		};

		return Scheduler;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(17)));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var MulticastSource = __webpack_require__(14);
	var DeferredSink = __webpack_require__(26);

	exports.create = create;

	function create(run) {
		return new Stream(new MulticastSource(new SubscriberSource(run)));
	}

	function SubscriberSource(subscribe) {
		this._subscribe = subscribe;
	}

	SubscriberSource.prototype.run = function(sink, scheduler) {
		return new Subscription(new DeferredSink(sink), scheduler, this._subscribe);
	};

	function Subscription(sink, scheduler, subscribe) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;

		var s = this;

		try {
			this._unsubscribe = subscribe(add, end, error);
		} catch(e) {
			error(e);
		}

		function add(x) {
			s._add(x);
		}
		function end(x) {
			s._end(x);
		}
		function error(e) {
			s._error(e);
		}
	}

	Subscription.prototype._add = function(x) {
		if(!this.active) {
			return;
		}
		tryEvent(this.scheduler.now(), x, this.sink);
	};

	Subscription.prototype._end = function(x) {
		if(!this.active) {
			return;
		}
		this.active = false;
		tryEnd(this.scheduler.now(), x, this.sink);
	};

	Subscription.prototype._error = function(x) {
		this.active = false;
		this.sink.error(this.scheduler.now(), x);
	};

	Subscription.prototype.dispose = function() {
		this.active = false;
		if(typeof this._unsubscribe === 'function') {
			return this._unsubscribe();
		}
	};

	function tryEvent(t, x, sink) {
		try {
			sink.event(t, x);
		} catch(e) {
			sink.error(t, e);
		}
	}

	function tryEnd(t, x, sink) {
		try {
			sink.end(t, x);
		} catch(e) {
			sink.error(t, e);
		}
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defer = __webpack_require__(27);

	module.exports = DeferredSink;

	function DeferredSink(sink) {
		this.sink = sink;
		this.events = [];
		this.length = 0;
		this.active = true;
	}

	DeferredSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}

		if(this.length === 0) {
			defer(new PropagateAllTask(this));
		}

		this.events[this.length++] = { time: t, value: x };
	};

	DeferredSink.prototype.error = function(t, e) {
		this.active = false;
		defer(new ErrorTask(t, e, this.sink));
	};

	DeferredSink.prototype.end = function(t, x) {
		this.active = false;
		defer(new EndTask(t, x, this.sink));
	};

	function PropagateAllTask(deferred) {
		this.deferred = deferred;
	}

	PropagateAllTask.prototype.run = function() {
		var p = this.deferred;
		var events = p.events;
		var sink = p.sink;
		var event;

		for(var i = 0, l = p.length; i<l; ++i) {
			event = events[i];
			sink.event(event.time, event.value);
			events[i] = void 0;
		}

		p.length = 0;
	};

	PropagateAllTask.prototype.error = function(e) {
		this.deferred.error(0, e);
	};

	function EndTask(t, x, sink) {
		this.time = t;
		this.value = x;
		this.sink = sink;
	}

	EndTask.prototype.run = function() {
		this.sink.end(this.time, this.value);
	};

	EndTask.prototype.error = function(e) {
		this.sink.error(this.time, e);
	};

	function ErrorTask(t, e, sink) {
		this.time = t;
		this.value = e;
		this.sink = sink;
	}

	ErrorTask.prototype.run = function() {
		this.sink.error(this.time, this.value);
	};

	ErrorTask.prototype.error = function(e) {
		throw e;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Promise = __webpack_require__(15);

	module.exports = defer;

	function defer(task) {
		return Promise.resolve(task).then(runTask);
	}

	function runTask(task) {
		try {
			return task.run();
		} catch(e) {
			return task.error(e);
		}
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var MulticastSource = __webpack_require__(14);
	var DeferredSink = __webpack_require__(26);

	exports.fromEvent = fromEvent;

	/**
	 * Create a stream from an EventTarget, such as a DOM Node, or EventEmitter.
	 * @param {String} event event type name, e.g. 'click'
	 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter
	 * @returns {Stream} stream containing all events of the specified type
	 * from the source.
	 */
	function fromEvent(event, source) {
		var s;
		if(typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
			s = new MulticastSource(new EventTargetSource(event, source));
		} else if(typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
			s = new EventEmitterSource(event, source);
		} else {
			throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener');
		}

		return new Stream(s);
	}

	function EventTargetSource(event, source) {
		this.event = event;
		this.source = source;
	}

	EventTargetSource.prototype.run = function(sink, scheduler) {
		return new EventAdapter(initEventTarget, this.event, this.source, sink, scheduler);
	};

	function initEventTarget(addEvent, event, source) {
		source.addEventListener(event, addEvent, false);
		return function(event, target) {
			target.removeEventListener(event, addEvent, false);
		};
	}

	function EventEmitterSource(event, source) {
		this.event = event;
		this.source = source;
	}

	EventEmitterSource.prototype.run = function(sink, scheduler) {
		// NOTE: Because EventEmitter allows events in the same call stack as
		// a listener is added, use a DeferredSink to buffer events
		// until the stack clears, then propagate.  This maintains most.js's
		// invariant that no event will be delivered in the same call stack
		// as an observer begins observing.
		return new EventAdapter(initEventEmitter, this.event, this.source, new DeferredSink(sink), scheduler);
	};

	function initEventEmitter(addEvent, event, source) {
		// EventEmitter supports varargs (eg: emitter.emit('event', a, b, c, ...)) so
		// have to support it here by turning into an array
		function addEventVariadic(a) {
			var l = arguments.length;
			if(l > 1) {
				var arr = new Array(l);
				for(var i=0; i<l; ++i) {
					arr[i] = arguments[i];
				}
				addEvent(arr);
			} else {
				addEvent(a);
			}
		}

		source.addListener(event, addEventVariadic);

		return function(event, target) {
			target.removeListener(event, addEventVariadic);
		};
	}

	function EventAdapter(init, event, source, sink, scheduler) {
		this.event = event;
		this.source = source;

		function addEvent(ev) {
			tryEvent(scheduler.now(), ev, sink);
		}

		this._dispose = init(addEvent, event, source);
	}

	EventAdapter.prototype.dispose = function() {
		return this._dispose(this.event, this.source);
	};

	function tryEvent (t, x, sink) {
		try {
			sink.event(t, x);
		} catch(e) {
			sink.error(t, e);
		}
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var combine = __webpack_require__(30).combineArray;

	var paramsRx = /\(([^)]*)/;
	var liftedSuffix = '_most$Stream$lifted';

	exports.lift = lift;

	/**
	 * @deprecated
	 * Lift a function to operate on streams.  For example:
	 * lift(function(x:number, y:number):number) -> function(xs:Stream, ys:Stream):Stream
	 * @param {function} f function to be lifted
	 * @returns {function} function with the same arity as f that accepts
	 *  streams as arguments and returns a stream
	 */
	function lift (f) {
		/*jshint evil:true*/
		var m = paramsRx.exec(f.toString());
		var body = 'return function ' + f.name + liftedSuffix + ' (' + m[1] + ') {\n' +
				'  return combine(f, arguments);\n' +
				'};';

		return (new Function('combine', 'f', body)(combine, f));
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var transform = __webpack_require__(33);
	var core = __webpack_require__(3);
	var Pipe = __webpack_require__(32);
	var IndexSink = __webpack_require__(31);
	var CompoundDisposable = __webpack_require__(37);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(38);

	var hasValue = IndexSink.hasValue;
	var getValue = IndexSink.getValue;

	var map = base.map;
	var tail = base.tail;

	exports.combineArray = combineArray;
	exports.combine = combine;

	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	function combine(f /*, ...streams */) {
		return new Stream(new Combine(f, map(getSource, tail(arguments))));
	}

	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @param {[Stream]} streams most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	function combineArray(f, streams) {
		return streams.length === 0 ? core.empty()
			 : streams.length === 1 ? transform.map(f, streams[0])
			 : new Stream(new Combine(f, map(getSource, streams)));
	}

	function getSource(stream) {
		return stream.source;
	}

	function Combine(f, sources) {
		this.f = f;
		this.sources = sources;
	}

	Combine.prototype.run = function(sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);

		var combineSink = new CombineSink(this.f, sinks, sink);

		for(var indexSink, i=0; i<l; ++i) {
			indexSink = sinks[i] = new IndexSink(i, combineSink);
			disposables[i] = this.sources[i].run(indexSink, scheduler);
		}

		return new CompoundDisposable(disposables);
	};

	function CombineSink(f, sinks, sink) {
		this.f = f;
		this.sinks = sinks;
		this.sink = sink;
		this.ready = false;
		this.activeCount = sinks.length;
	}

	CombineSink.prototype.event = function(t /*, indexSink */) {
		if(!this.ready) {
			this.ready = this.sinks.every(hasValue);
		}

		if(this.ready) {
			// TODO: Maybe cache values in their own array once this.ready
			this.sink.event(t, invoke(this.f, map(getValue, this.sinks)));
		}
	};

	CombineSink.prototype.end = function(t, indexedValue) {
		if(--this.activeCount === 0) {
			this.sink.end(t, indexedValue.value);
		}
	};

	CombineSink.prototype.error = Pipe.prototype.error;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Sink = __webpack_require__(32);

	module.exports = IndexSink;

	IndexSink.hasValue = hasValue;
	IndexSink.getValue = getValue;

	function hasValue(indexSink) {
		return indexSink.hasValue;
	}

	function getValue(indexSink) {
		return indexSink.value;
	}

	function IndexSink(i, sink) {
		this.index = i;
		this.sink = sink;
		this.active = true;
		this.hasValue = false;
		this.value = void 0;
	}

	IndexSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}
		this.value = x;
		this.hasValue = true;
		this.sink.event(t, this);
	};

	IndexSink.prototype.end = function(t, x) {
		if(!this.active) {
			return;
		}
		this.active = false;
		this.sink.end(t, { index: this.index, value: x });
	};

	IndexSink.prototype.error = Sink.prototype.error;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = Pipe;

	/**
	 * A sink mixin that simply forwards event, end, and error to
	 * another sink.
	 * @param sink
	 * @constructor
	 */
	function Pipe(sink) {
		this.sink = sink;
	}

	Pipe.prototype.event = function(t, x) {
		return this.sink.event(t, x);
	};

	Pipe.prototype.end = function(t, x) {
		return this.sink.end(t, x);
	};

	Pipe.prototype.error = function(t, e) {
		return this.sink.error(t, e);
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Map = __webpack_require__(34);

	exports.map = map;
	exports.constant = constant;
	exports.tap = tap;

	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @param {Stream} stream stream to map
	 * @returns {Stream} stream containing items transformed by f
	 */
	function map(f, stream) {
		return new Stream(Map.create(f, stream.source));
	}

	/**
	 * Replace each value in the stream with x
	 * @param {*} x
	 * @param {Stream} stream
	 * @returns {Stream} stream containing items replaced with x
	 */
	function constant(x, stream) {
		return map(function() {
			return x;
		}, stream);
	}

	/**
	 * Perform a side effect for each item in the stream
	 * @param {function(x:*):*} f side effect to execute for each item. The
	 *  return value will be discarded.
	 * @param {Stream} stream stream to tap
	 * @returns {Stream} new stream containing the same items as this stream
	 */
	function tap(f, stream) {
		return map(function(x) {
			f(x);
			return x;
		}, stream);
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(32);
	var Filter = __webpack_require__(35);
	var FilterMap = __webpack_require__(36);
	var base = __webpack_require__(2);

	module.exports = Map;

	function Map(f, source) {
		this.f = f;
		this.source = source;
	}

	/**
	 * Create a mapped source, fusing adjacent map.map, filter.map,
	 * and filter.map.map if possible
	 * @param {function(*):*} f mapping function
	 * @param {{run:function}} source source to map
	 * @returns {Map|FilterMap} mapped source, possibly fused
	 */
	Map.create = function createMap(f, source) {
		if(source instanceof Map) {
			return new Map(base.compose(f, source.f), source.source);
		}

		if(source instanceof Filter) {
			return new FilterMap(source.p, f, source.source);
		}

		if(source instanceof FilterMap) {
			return new FilterMap(source.p, base.compose(f, source.f), source.source);
		}

		return new Map(f, source);
	};

	Map.prototype.run = function(sink, scheduler) {
		return this.source.run(new MapSink(this.f, sink), scheduler);
	};

	function MapSink(f, sink) {
		this.f = f;
		this.sink = sink;
	}

	MapSink.prototype.end   = Pipe.prototype.end;
	MapSink.prototype.error = Pipe.prototype.error;

	MapSink.prototype.event = function(t, x) {
		var f = this.f;
		this.sink.event(t, f(x));
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(32);

	module.exports = Filter;

	function Filter(p, source) {
		this.p = p;
		this.source = source;
	}

	/**
	 * Create a filtered source, fusing adjacent filter.filter if possible
	 * @param {function(x:*):boolean} p filtering predicate
	 * @param {{run:function}} source source to filter
	 * @returns {Filter} filtered source
	 */
	Filter.create = function createFilter(p, source) {
		if (source instanceof Filter) {
			return new Filter(and(source.p, p), source.source);
		}

		return new Filter(p, source);
	};

	Filter.prototype.run = function(sink, scheduler) {
		return this.source.run(new FilterSink(this.p, sink), scheduler);
	};

	function FilterSink(p, sink) {
		this.p = p;
		this.sink = sink;
	}

	FilterSink.prototype.end   = Pipe.prototype.end;
	FilterSink.prototype.error = Pipe.prototype.error;

	FilterSink.prototype.event = function(t, x) {
		var p = this.p;
		p(x) && this.sink.event(t, x);
	};

	function and(p, q) {
		return function(x) {
			return p(x) && q(x);
		};
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(32);

	module.exports = FilterMap;

	function FilterMap(p, f, source) {
		this.p = p;
		this.f = f;
		this.source = source;
	}

	FilterMap.prototype.run = function(sink, scheduler) {
		return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler);
	};

	function FilterMapSink(p, f, sink) {
		this.p = p;
		this.f = f;
		this.sink = sink;
	}

	FilterMapSink.prototype.event = function(t, x) {
		var f = this.f;
		var p = this.p;
		p(x) && this.sink.event(t, f(x));
	};

	FilterMapSink.prototype.end = Pipe.prototype.end;
	FilterMapSink.prototype.error = Pipe.prototype.error;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var all = __webpack_require__(15).all;
	var map = __webpack_require__(2).map;

	module.exports = CompoundDisposable;

	function CompoundDisposable(disposables) {
		this.disposed = false;
		this.disposables = disposables;
	}

	CompoundDisposable.prototype.dispose = function() {
		if(this.disposed) {
			return;
		}
		this.disposed = true;
		return all(map(dispose, this.disposables));
	};

	function dispose(disposable) {
		return disposable.dispose();
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = invoke;

	function invoke(f, args) {
		/*jshint maxcomplexity:7*/
		switch(args.length) {
			case 0: return f();
			case 1: return f(args[0]);
			case 2: return f(args[0], args[1]);
			case 3: return f(args[0], args[1], args[2]);
			case 4: return f(args[0], args[1], args[2], args[3]);
			case 5: return f(args[0], args[1], args[2], args[3], args[4]);
			default:
				return f.apply(void 0, args);
		}
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var runSource = __webpack_require__(40);
	var noop = __webpack_require__(2).noop;

	exports.observe = observe;
	exports.drain = drain;

	/**
	 * Observe all the event values in the stream in time order. The
	 * provided function `f` will be called for each event value
	 * @param {function(x:T):*} f function to call with each event value
	 * @param {Stream<T>} stream stream to observe
	 * @return {Promise} promise that fulfills after the stream ends without
	 *  an error, or rejects if the stream ends with an error.
	 */
	function observe(f, stream) {
		return runSource.withDefaultScheduler(f, stream.source);
	}

	/**
	 * "Run" a stream by
	 * @param stream
	 * @return {*}
	 */
	function drain(stream) {
		return runSource.withDefaultScheduler(noop, stream.source);
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Promise = __webpack_require__(15);
	var Observer = __webpack_require__(41);
	var defaultScheduler = __webpack_require__(42);

	exports.withDefaultScheduler = withDefaultScheduler;
	exports.withScheduler = withScheduler;

	function withDefaultScheduler(f, source) {
		return withScheduler(f, source, defaultScheduler);
	}

	function withScheduler(f, source, scheduler) {
		return new Promise(function (resolve, reject) {
			var disposable;

			var observer = new Observer(f,
				function (x) {
					disposeThen(resolve, reject, disposable, x);
				}, function (e) {
					disposeThen(reject, reject, disposable, e);
				});

			disposable = source.run(observer, scheduler);
		});
	}

	function disposeThen(resolve, reject, disposable, x) {
		Promise.resolve(disposable.dispose()).then(function () {
			resolve(x);
		}, reject);
	}



/***/ },
/* 41 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = Observer;

	/**
	 * Sink that accepts functions to apply to each event, and to end, and error
	 * signals.
	 * @param {function(x:*):void} event function to be applied to each event
	 * @param {function(x:*):void} end function to apply to end signal value.
	 * @param {function(e:Error|*):void} error function to apply to error signal value.
	 * @constructor
	 */
	function Observer(event, end, error) {
		this._event = event;
		this._end = end;
		this._error = error;
		this.active = true;
	}

	Observer.prototype.event = function(t, x) {
		if (!this.active) {
			return;
		}
		this._event(x);
	};

	Observer.prototype.end = function(t, x) {
		if (!this.active) {
			return;
		}
		this.active = false;
		this._end(x);
	};

	Observer.prototype.error = function(t, e) {
		this.active = false;
		this._error(e);
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/*global setTimeout, clearTimeout*/
	var Scheduler = __webpack_require__(43);
	var defer = __webpack_require__(27);

	// Default timer functions
	var defaultSetTimer, defaultClearTimer;

	function Task(f) {
		this.f = f;
		this.active = true;
	}

	Task.prototype.run = function() {
		if(!this.active) {
			return;
		}
		var f = this.f;
		return f();
	};

	Task.prototype.error = function(e) {
		throw e;
	};

	Task.prototype.cancel = function() {
		this.active = false;
	};

	function runAsTask(f) {
		var task = new Task(f);
		defer(task);
		return task;
	}

	if(typeof process === 'object' && typeof process.nextTick === 'function') {
		defaultSetTimer = function(f, ms) {
			return ms <= 0 ? runAsTask(f) : setTimeout(f, ms);
		};

		defaultClearTimer = function(t) {
			return t instanceof Task ? t.cancel() : clearTimeout(t);
		};
	}
	else {
		defaultSetTimer = function(f, ms) {
			return setTimeout(f, ms);
		};

		defaultClearTimer = function(t) {
			return clearTimeout(t);
		};
	}

	module.exports = new Scheduler(defaultSetTimer, defaultClearTimer, Date.now);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var base = __webpack_require__(2);

	var findIndex = base.findIndex;

	module.exports = Scheduler;

	function ScheduledTask(delay, period, task, scheduler) {
		this.time = delay;
		this.period = period;
		this.task = task;
		this.scheduler = scheduler;
		this.active = true;
	}

	ScheduledTask.prototype.run = function() {
		return this.task.run(this.time);
	};

	ScheduledTask.prototype.error = function(e) {
		return this.task.error(this.time, e);
	};

	ScheduledTask.prototype.cancel = function() {
		this.scheduler.cancel(this);
		return this.task.dispose();
	};

	function runTask(task) {
		try {
			return task.run();
		} catch(e) {
			return task.error(e);
		}
	}

	function Scheduler(setTimer, clearTimer, now) {
		this.now = now;
		this._setTimer = setTimer;
		this._clearTimer = clearTimer;

		this._timer = null;
		this._nextArrival = 0;
		this._tasks = [];

		var self = this;
		this._runReadyTasksBound = function() {
			self._runReadyTasks(self.now());
		};
	}

	Scheduler.prototype.asap = function(task) {
		return this.schedule(0, -1, task);
	};

	Scheduler.prototype.delay = function(delay, task) {
		return this.schedule(delay, -1, task);
	};

	Scheduler.prototype.periodic = function(period, task) {
		return this.schedule(0, period, task);
	};

	Scheduler.prototype.schedule = function(delay, period, task) {
		var now = this.now();
	    var st = new ScheduledTask(now + Math.max(0, delay), period, task, this);

		insertByTime(st, this._tasks);
		this._scheduleNextRun(now);
		return st;
	};

	Scheduler.prototype.cancel = function(task) {
		task.active = false;
		var i = findIndex(task, this._tasks);

		if(i >= 0) {
			this._tasks.splice(i, 1);
			this._reschedule();
		}
	};

	Scheduler.prototype.cancelAll = function(f) {
		this._tasks = base.removeAll(f, this._tasks);
		this._reschedule();
	};

	Scheduler.prototype._reschedule = function() {
		if(this._tasks.length === 0) {
			this._unschedule();
		} else {
			this._scheduleNextRun(this.now());
		}
	};

	Scheduler.prototype._unschedule = function() {
		this._clearTimer(this._timer);
		this._timer = null;
	};

	Scheduler.prototype._runReadyTasks = function(now) {
		this._timer = null;

		this._runTasks(this._collectReadyTasks(now));

		this._scheduleNextRun(this.now());
	};

	Scheduler.prototype._collectReadyTasks = function(now) {
		var tasks = this._tasks;
		var l = tasks.length;
		var toRun = [];

		var task, i;

		// Collect all active tasks with time <= now
		for(i=0; i<l; ++i) {
			task = tasks[i];
			if(task.time > now) {
				break;
			}
			if(task.active) {
				toRun.push(task);
			}
		}

		this._tasks = base.drop(i, tasks);

		return toRun;
	};

	Scheduler.prototype._runTasks = function(tasks) {
		// Run all ready tasks
		var l = tasks.length;
		var task;

		for(var i=0; i<l; ++i) {
			task = tasks[i];
			runTask(task);

			// Reschedule periodic repeating tasks
			// Check active again, since a task may have canceled itself
			if(task.period >= 0 && task.active) {
				task.time = task.time + task.period;
				insertByTime(task, this._tasks);
			}
		}
	};

	Scheduler.prototype._scheduleNextRun = function(now) {
		if(this._tasks.length === 0) {
			return;
		}

		var nextArrival = this._tasks[0].time;

		if(this._timer === null) {
			this._scheduleNextArrival(nextArrival, now);
		} else if(nextArrival < this._nextArrival) {
			this._unschedule();
			this._scheduleNextArrival(nextArrival, now);
		}
	};

	Scheduler.prototype._scheduleNextArrival = function(nextArrival, now) {
		this._nextArrival = nextArrival;
		var delay = Math.max(0, nextArrival - now);
		this._timer = this._setTimer(this._runReadyTasksBound, delay);
	};

	function insertByTime(task, tasks) {
		tasks.splice(findInsertion(task, tasks), 0, task);
	}

	function findInsertion(task, tasks) {
		var i = binarySearch(task, tasks);
		var l = tasks.length;
		var t = task.time;

		while(i<l && t === tasks[i].time) {
			++i;
		}

		return i;
	}

	function binarySearch(x, sortedArray) {
		var lo = 0;
		var hi = sortedArray.length;
		var mid, y;

		while (lo < hi) {
			mid = Math.floor((lo + hi) / 2);
			y = sortedArray[mid];

			if (x.time === y.time) {
				return mid;
			} else if (x.time < y.time) {
				hi = mid;
			} else {
				lo = mid + 1;
			}
		}
		return hi;
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(32);

	exports.loop = loop;

	/**
	 * Generalized feedback loop. Call a stepper function for each event. The stepper
	 * will be called with 2 params: the current seed and the an event value.  It must
	 * return a new { seed, value } pair. The `seed` will be fed back into the next
	 * invocation of stepper, and the `value` will be propagated as the event value.
	 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
	 * @param {*} seed initial seed value passed to first stepper call
	 * @param {Stream} stream event stream
	 * @returns {Stream} new stream whose values are the `value` field of the objects
	 * returned by the stepper
	 */
	function loop(stepper, seed, stream) {
		return new Stream(new Loop(stepper, seed, stream.source));
	}

	function Loop(stepper, seed, source) {
		this.step = stepper;
		this.seed = seed;
		this.source = source;
	}

	Loop.prototype.run = function(sink, scheduler) {
		return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler);
	};

	function LoopSink(stepper, seed, sink) {
		this.step = stepper;
		this.seed = seed;
		this.sink = sink;
	}

	LoopSink.prototype.error = Pipe.prototype.error;

	LoopSink.prototype.event = function(t, x) {
		var result = this.step(this.seed, x);
		this.seed = result.seed;
		this.sink.event(t, result.value);
	};

	LoopSink.prototype.end = function(t) {
		this.sink.end(t, this.seed);
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(32);
	var runSource = __webpack_require__(40);
	var noop = __webpack_require__(2).noop;

	exports.scan = scan;
	exports.reduce = reduce;

	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @param {Stream} stream stream to scan
	 * @returns {Stream} new stream containing successive reduce results
	 */
	function scan(f, initial, stream) {
		return new Stream(new Scan(f, initial, stream.source));
	}

	function Scan(f, z, source) {
		this.f = f;
		this.value = z;
		this.source = source;
	}

	Scan.prototype.run = function(sink, scheduler) {
		return this.source.run(new ScanSink(this.f, this.value, sink), scheduler);
	};

	function ScanSink(f, z, sink) {
		this.f = f;
		this.value = z;
		this.sink = sink;
		this.init = true;
	}

	ScanSink.prototype.event = function(t, x) {
		if(this.init) {
			this.init = false;
			this.sink.event(t, this.value);
		}

		var f = this.f;
		this.value = f(this.value, x);
		this.sink.event(t, this.value);
	};

	ScanSink.prototype.error = Pipe.prototype.error;

	ScanSink.prototype.end = function(t) {
		this.sink.end(t, this.value);
	};

	/**
	 * Reduce a stream to produce a single result.  Note that reducing an infinite
	 * stream will return a Promise that never fulfills, but that may reject if an error
	 * occurs.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @param {Stream} stream to reduce
	 * @returns {Promise} promise for the file result of the reduce
	 */
	function reduce(f, initial, stream) {
		return runSource.withDefaultScheduler(noop, new Accumulate(f, initial, stream.source));
	}

	function Accumulate(f, z, source) {
		this.f = f;
		this.value = z;
		this.source = source;
	}

	Accumulate.prototype.run = function(sink, scheduler) {
		return this.source.run(new AccumulateSink(this.f, this.value, sink), scheduler);
	};

	function AccumulateSink(f, z, sink) {
		this.f = f;
		this.value = z;
		this.sink = sink;
	}

	AccumulateSink.prototype.event = function(t, x) {
		var f = this.f;
		this.value = f(this.value, x);
		this.sink.event(t, this.value);
	};

	AccumulateSink.prototype.error = Pipe.prototype.error;

	AccumulateSink.prototype.end = function(t) {
		this.sink.end(t, this.value);
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Promise = __webpack_require__(15);

	exports.unfold = unfold;

	/**
	 * Compute a stream by unfolding tuples of future values from a seed value
	 * Event times may be controlled by returning a Promise from f
	 * @param {function(seed:*):{value:*, seed:*, done:boolean}|Promise<{value:*, seed:*, done:boolean}>} f unfolding function accepts
	 *  a seed and returns a new tuple with a value, new seed, and boolean done flag.
	 *  If tuple.done is true, the stream will end.
	 * @param {*} seed seed value
	 * @returns {Stream} stream containing all value of all tuples produced by the
	 *  unfolding function.
	 */
	function unfold(f, seed) {
		return new Stream(new UnfoldSource(f, seed));
	}

	function UnfoldSource(f, seed) {
		this.f = f;
		this.value = seed;
	}

	UnfoldSource.prototype.run = function(sink, scheduler) {
		return new Unfold(this.f, this.value, sink, scheduler);
	};

	function Unfold(f, x, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;

		var self = this;
		function err(e) {
			self.sink.error(self.scheduler.now(), e);
		}

		function start(unfold) {
			return stepUnfold(unfold, x);
		}

		Promise.resolve(this).then(start).catch(err);
	}

	Unfold.prototype.dispose = function() {
		this.active = false;
	};

	function stepUnfold(unfold, x) {
		var f = unfold.f;
		return Promise.resolve(f(x)).then(function(tuple) {
			return continueUnfold(unfold, tuple);
		});
	}

	function continueUnfold(unfold, tuple) {
		if(tuple.done) {
			unfold.sink.end(unfold.scheduler.now(), tuple.value);
			return tuple.value;
		}

		unfold.sink.event(unfold.scheduler.now(), tuple.value);

		if(!unfold.active) {
			return tuple.value;
		}
		return stepUnfold(unfold, tuple.seed);
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Promise = __webpack_require__(15);

	exports.iterate = iterate;

	/**
	 * Compute a stream by iteratively calling f to produce values
	 * Event times may be controlled by returning a Promise from f
	 * @param {function(x:*):*|Promise<*>} f
	 * @param {*} x initial value
	 * @returns {Stream}
	 */
	function iterate(f, x) {
		return new Stream(new IterateSource(f, x));
	}

	function IterateSource(f, x) {
		this.f = f;
		this.value = x;
	}

	IterateSource.prototype.run = function(sink, scheduler) {
		return new Iterate(this.f, this.value, sink, scheduler);
	};

	function Iterate(f, initial, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;

		var x = initial;

		var self = this;
		function err(e) {
			self.sink.error(self.scheduler.now(), e);
		}

		function start(iterate) {
			return stepIterate(iterate, x);
		}

		Promise.resolve(this).then(start).catch(err);
	}

	Iterate.prototype.dispose = function() {
		this.active = false;
	};

	function stepIterate(iterate, x) {
		iterate.sink.event(iterate.scheduler.now(), x);

		if(!iterate.active) {
			return x;
		}

		var f = iterate.f;
		return Promise.resolve(f(x)).then(function(y) {
			return continueIterate(iterate, y);
		});
	}

	function continueIterate(iterate, x) {
		return !iterate.active ? iterate.value : stepIterate(iterate, x);
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Promise = __webpack_require__(15);
	var base = __webpack_require__(2);

	exports.generate = generate;

	/**
	 * Compute a stream using an *async* generator, which yields promises
	 * to control event times.
	 * @param f
	 * @returns {Stream}
	 */
	function generate(f /*, ...args */) {
		return new Stream(new GenerateSource(f, base.tail(arguments)));
	}

	function GenerateSource(f, args) {
		this.f = f;
		this.args = args;
	}

	GenerateSource.prototype.run = function(sink, scheduler) {
		return new Generate(this.f.apply(void 0, this.args), sink, scheduler);
	};

	function Generate(iterator, sink, scheduler) {
		this.iterator = iterator;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;

		var self = this;
		function err(e) {
			self.sink.error(self.scheduler.now(), e);
		}

		Promise.resolve(this).then(next).catch(err);
	}

	function next(generate, x) {
		return generate.active ? handle(generate, generate.iterator.next(x)) : x;
	}

	function handle(generate, result) {
		if (result.done) {
			return generate.sink.end(generate.scheduler.now(), result.value);
		}

		return Promise.resolve(result.value).then(function (x) {
			return emit(generate, x);
		}, function(e) {
			return error(generate, e);
		});
	}

	function emit(generate, x) {
		generate.sink.event(generate.scheduler.now(), x);
		return next(generate, x);
	}

	function error(generate, e) {
		return handle(generate, generate.iterator.throw(e));
	}

	Generate.prototype.dispose = function() {
		this.active = false;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var streamOf = __webpack_require__(3).of;
	var fromArray = __webpack_require__(10).fromArray;
	var concatMap = __webpack_require__(50).concatMap;
	var Sink = __webpack_require__(32);
	var Promise = __webpack_require__(15);
	var identity = __webpack_require__(2).identity;

	exports.concat = concat;
	exports.cycle = cycle;
	exports.cons = cons;

	/**
	 * @param {*} x value to prepend
	 * @param {Stream} stream
	 * @returns {Stream} new stream with x prepended
	 */
	function cons(x, stream) {
		return concat(streamOf(x), stream);
	}

	/**
	 * @param {Stream} left
	 * @param {Stream} right
	 * @returns {Stream} new stream containing all events in left followed by all
	 *  events in right.  This *timeshifts* right to the end of left.
	 */
	function concat(left, right) {
		return concatMap(identity, fromArray([left, right]));
	}

	/**
	 * Tie stream into a circle, thus creating an infinite stream
	 * @param {Stream} stream
	 * @returns {Stream} new infinite stream
	 */
	function cycle(stream) {
		return new Stream(new Cycle(stream.source));
	}

	function Cycle(source) {
		this.source = source;
	}

	Cycle.prototype.run = function(sink, scheduler) {
		return new CycleSink(this.source, sink, scheduler);
	};

	function CycleSink(source, sink, scheduler) {
		this.active = true;
		this.sink = sink;
		this.scheduler = scheduler;
		this.source = source;
		this.disposable = source.run(this, scheduler);
	}

	CycleSink.prototype.error = Sink.prototype.error;

	CycleSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}
		this.sink.event(t, x);
	};

	CycleSink.prototype.end = function(t) {
		if(!this.active) {
			return;
		}

		var self = this;
		Promise.resolve(this.disposable.dispose()).catch(function(e) {
			self.error(t, e);
		});
		this.disposable = this.source.run(this, this.scheduler);
	};

	CycleSink.prototype.dispose = function() {
		this.active = false;
		return this.disposable.dispose();
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var mergeConcurrently = __webpack_require__(51).mergeConcurrently;
	var map = __webpack_require__(33).map;

	exports.concatMap = concatMap;

	/**
	 * Map each value in stream to a new stream, and concatenate them all
	 * stream:              -a---b---cX
	 * f(a):                 1-1-1-1X
	 * f(b):                        -2-2-2-2X
	 * f(c):                                -3-3-3-3X
	 * stream.concatMap(f): -1-1-1-1-2-2-2-2-3-3-3-3X
	 * @param {function(x:*):Stream} f function to map each value to a stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	function concatMap(f, stream) {
		return mergeConcurrently(1, map(f, stream));
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var AwaitingDisposable = __webpack_require__(52);
	var LinkedList = __webpack_require__(53);
	var Promise = __webpack_require__(15);

	exports.mergeConcurrently = mergeConcurrently;

	function mergeConcurrently(concurrency, stream) {
		return new Stream(new MergeConcurrently(concurrency, stream.source));
	}

	function MergeConcurrently(concurrency, source) {
		this.concurrency = concurrency;
		this.source = source;
	}

	MergeConcurrently.prototype.run = function(sink, scheduler) {
		return new Outer(this.concurrency, this.source, sink, scheduler);
	};

	function Outer(concurrency, source, sink, scheduler) {
		this.concurrency = concurrency;
		this.sink = sink;
		this.scheduler = scheduler;
		this.pending = [];
		this.current = new LinkedList();
		this.disposable = new AwaitingDisposable(source.run(this, scheduler));
		this.active = true;
	}

	Outer.prototype.event = function(t, x) {
		this._addInner(t, x);
	};

	Outer.prototype._addInner = function(t, stream) {
		if(this.current.length < this.concurrency) {
			this._startInner(t, stream);
		} else {
			this.pending.push(stream);
		}
	};

	Outer.prototype._startInner = function(t, stream) {
		var innerSink = new Inner(t, this, this.sink);
		this.current.add(innerSink);
		innerSink.disposable = stream.source.run(innerSink, this.scheduler);
	};

	Outer.prototype.end = function(t, x) {
		this.active = false;
		this.disposable.dispose();
		this._checkEnd(t, x);
	};

	Outer.prototype.error = function(t, e) {
		this.active = false;
		this.sink.error(t, e);
	};

	Outer.prototype.dispose = function() {
		this.active = false;
		this.pending.length = 0;
		return Promise.all([this.disposable.dispose(), this.current.dispose()]);
	};

	Outer.prototype._endInner = function(t, x, inner) {
		this.current.remove(inner);
		var self = this;
		Promise.resolve(inner.dispose()).catch(function(e) {
			self.error(t, e);
		});

		if(this.pending.length === 0) {
			this._checkEnd(t, x);
		} else {
			this._startInner(t, this.pending.shift());
		}
	};

	Outer.prototype._checkEnd = function(t, x) {
		if(!this.active && this.current.isEmpty()) {
			this.sink.end(t, x);
		}
	};

	function Inner(time, outer, sink) {
		this.prev = this.next = null;
		this.time = time;
		this.outer = outer;
		this.sink = sink;
		this.disposable = void 0;
	}

	Inner.prototype.event = function(t, x) {
		this.sink.event(Math.max(t, this.time), x);
	};

	Inner.prototype.end = function(t, x) {
		this.outer._endInner(Math.max(t, this.time), x, this);
	};

	Inner.prototype.error = function(t, e) {
		this.outer.error(Math.max(t, this.time), e);
	};

	Inner.prototype.dispose = function() {
		return this.disposable.dispose();
	};


/***/ },
/* 52 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = AwaitingDisposable;

	function AwaitingDisposable(disposable) {
		this.disposed = false;
		this.disposable = disposable;
		this.value = void 0;
	}

	AwaitingDisposable.prototype.dispose = function() {
		if(!this.disposed) {
			this.disposed = true;
			this.value = this.disposable.dispose();
		}
		return this.value;
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Promise = __webpack_require__(15);

	module.exports = LinkedList;

	/**
	 * Doubly linked list
	 * @constructor
	 */
	function LinkedList() {
		this.head = null;
		this.length = 0;
	}

	/**
	 * Add a node to the end of the list
	 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to add
	 */
	LinkedList.prototype.add = function(x) {
		if(this.head !== null) {
			this.head.prev = x;
			x.next = this.head;
		}
		this.head = x;
		++this.length;
	};

	/**
	 * Remove the provided node from the list
	 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to remove
	 */
	LinkedList.prototype.remove = function(x) {
		--this.length;
		if(x === this.head) {
			this.head = this.head.next;
		}
		if(x.next !== null) {
			x.next.prev = x.prev;
			x.next = null;
		}
		if(x.prev !== null) {
			x.prev.next = x.next;
			x.prev = null;
		}
	};

	/**
	 * @returns {boolean} true iff there are no nodes in the list
	 */
	LinkedList.prototype.isEmpty = function() {
		return this.length === 0;
	};

	/**
	 * Dispose all nodes
	 * @returns {Promise} promise that fulfills when all nodes have been disposed,
	 *  or rejects if an error occurs while disposing
	 */
	LinkedList.prototype.dispose = function() {
		if(this.isEmpty()) {
			return Promise.resolve();
		}

		var promises = [];
		var x = this.head;
		this.head = null;
		this.length = 0;

		while(x !== null) {
			promises.push(x.dispose());
			x = x.next;
		}

		return Promise.all(promises);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var combine = __webpack_require__(30).combine;

	exports.ap  = ap;

	/**
	 * Assume fs is a stream containing functions, and apply the latest function
	 * in fs to the latest value in xs.
	 * fs:         --f---------g--------h------>
	 * xs:         -a-------b-------c-------d-->
	 * ap(fs, xs): --fa-----fb-gb---gc--hc--hd->
	 * @param {Stream} fs stream of functions to apply to the latest x
	 * @param {Stream} xs stream of values to which to apply all the latest f
	 * @returns {Stream} stream containing all the applications of fs to xs
	 */
	function ap(fs, xs) {
		return combine(apply, fs, xs);
	}

	function apply(f, x) {
		return f(x);
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);

	exports.transduce = transduce;

	/**
	 * Transform a stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @param  {Stream} stream stream whose events will be passed through the
	 *  transducer
	 * @return {Stream} stream of events transformed by the transducer
	 */
	function transduce(transducer, stream) {
		return new Stream(new Transduce(transducer, stream.source));
	}

	function Transduce(transducer, source) {
		this.transducer = transducer;
		this.source = source;
	}

	Transduce.prototype.run = function(sink, scheduler) {
		var xf = this.transducer(new Transformer(sink));
		return this.source.run(new TransduceSink(getTxHandler(xf), sink), scheduler);
	};

	function TransduceSink(adapter, sink) {
		this.xf = adapter;
		this.sink = sink;
	}

	TransduceSink.prototype.event = function(t, x) {
		var next = this.xf.step(t, x);

		return this.xf.isReduced(next)
			? this.sink.end(t, this.xf.getResult(next))
			: next;
	};

	TransduceSink.prototype.end = function(t, x) {
		return this.xf.result(x);
	};

	TransduceSink.prototype.error = function(t, e) {
		return this.sink.error(t, e);
	};

	function Transformer(sink) {
		this.time = -Infinity;
		this.sink = sink;
	}

	Transformer.prototype['@@transducer/init'] = Transformer.prototype.init = function() {};

	Transformer.prototype['@@transducer/step'] = Transformer.prototype.step = function(t, x) {
		if(!isNaN(t)) {
			this.time = Math.max(t, this.time);
		}
		return this.sink.event(this.time, x);
	};

	Transformer.prototype['@@transducer/result'] = Transformer.prototype.result = function(x) {
		return this.sink.end(this.time, x);
	};

	/**
	 * Given an object supporting the new or legacy transducer protocol,
	 * create an adapter for it.
	 * @param {object} tx transform
	 * @returns {TxAdapter|LegacyTxAdapter}
	 */
	function getTxHandler(tx) {
		return typeof tx['@@transducer/step'] === 'function'
			? new TxAdapter(tx)
			: new LegacyTxAdapter(tx);
	}

	/**
	 * Adapter for new official transducer protocol
	 * @param {object} tx transform
	 * @constructor
	 */
	function TxAdapter(tx) {
		this.tx = tx;
	}

	TxAdapter.prototype.step = function(t, x) {
		return this.tx['@@transducer/step'](t, x);
	};
	TxAdapter.prototype.result = function(x) {
		return this.tx['@@transducer/result'](x);
	};
	TxAdapter.prototype.isReduced = function(x) {
		return x != null && x['@@transducer/reduced'];
	};
	TxAdapter.prototype.getResult = function(x) {
		return x['@@transducer/value'];
	};

	/**
	 * Adapter for older transducer protocol
	 * @param {object} tx transform
	 * @constructor
	 */
	function LegacyTxAdapter(tx) {
		this.tx = tx;
	}

	LegacyTxAdapter.prototype.step = function(t, x) {
		return this.tx.step(t, x);
	};
	LegacyTxAdapter.prototype.result = function(x) {
		return this.tx.result(x);
	};
	LegacyTxAdapter.prototype.isReduced = function(x) {
		return x != null && x.__transducers_reduced__;
	};
	LegacyTxAdapter.prototype.getResult = function(x) {
		return x.value;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var mergeConcurrently = __webpack_require__(51).mergeConcurrently;
	var map = __webpack_require__(33).map;

	exports.flatMap = flatMap;
	exports.join = join;

	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	function flatMap(f, stream) {
		return join(map(f, stream));
	}

	/**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @param {Stream<Stream<X>>} stream stream of streams
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	function join(stream) {
		return mergeConcurrently(Infinity, stream);
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(32);
	var AwaitingDisposable = __webpack_require__(52);
	var CompoundDisposable = __webpack_require__(37);

	exports.flatMapEnd = flatMapEnd;

	function flatMapEnd(f, stream) {
		return new Stream(new FlatMapEnd(f, stream.source));
	}

	function FlatMapEnd(f, source) {
		this.f = f;
		this.source = source;
	}

	FlatMapEnd.prototype.run = function(sink, scheduler) {
		return new FlatMapEndSink(this.f, this.source, sink, scheduler);
	};

	function FlatMapEndSink(f, source, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
		this.disposable = new AwaitingDisposable(source.run(this, scheduler));
	}

	FlatMapEndSink.prototype.error = Sink.prototype.error;

	FlatMapEndSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}
		this.sink.event(t, x);
	};

	FlatMapEndSink.prototype.end = function(t, x) {
		if(!this.active) {
			return;
		}

		this.dispose();

		var f = this.f;
		var stream = f(x);
		var disposable = stream.source.run(this.sink, this.scheduler);
		this.disposable = new CompoundDisposable([this.disposable, disposable]);
	};

	FlatMapEndSink.prototype.dispose = function() {
		this.active = false;
		return this.disposable.dispose();
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var empty = __webpack_require__(1).empty;
	var fromArray = __webpack_require__(10).fromArray;
	var mergeConcurrently = __webpack_require__(51).mergeConcurrently;
	var copy = __webpack_require__(2).copy;

	exports.merge = merge;
	exports.mergeArray = mergeArray;

	/**
	 * @returns {Stream} stream containing events from all streams in the argument
	 * list in time order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	function merge(/*...streams*/) {
		return mergeArray(copy(arguments));
	}

	/**
	 * @param {Array} streams array of stream to merge
	 * @returns {Stream} stream containing events from all input observables
	 * in time order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	function mergeArray(streams) {
		var l = streams.length;
	    return l === 0 ? empty()
			 : l === 1 ? streams[0]
			 : mergeConcurrently(l, fromArray(streams));
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(32);
	var CompoundDisposable = __webpack_require__(37);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(38);

	exports.sample = sample;
	exports.sampleWith = sampleWith;
	exports.sampleArray = sampleArray;

	/**
	 * When an event arrives on sampler, emit the result of calling f with the latest
	 * values of all streams being sampled
	 * @param {function(...values):*} f function to apply to each set of sampled values
	 * @param {Stream} sampler streams will be sampled whenever an event arrives
	 *  on sampler
	 * @returns {Stream} stream of sampled and transformed values
	 */
	function sample(f, sampler /*, ...streams */) {
		return sampleArray(f, sampler, base.drop(2, arguments));
	}

	/**
	 * When an event arrives on sampler, emit the latest event value from stream.
	 * @param {Stream} sampler stream of events at whose arrival time
	 *  stream's latest value will be propagated
	 * @param {Stream} stream stream of values
	 * @returns {Stream} sampled stream of values
	 */
	function sampleWith(sampler, stream) {
		return new Stream(new Sampler(base.identity, sampler.source, [stream.source]));
	}

	function sampleArray(f, sampler, streams) {
		return new Stream(new Sampler(f, sampler.source, base.map(getSource, streams)));
	}

	function getSource(stream) {
		return stream.source;
	}

	function Sampler(f, sampler, sources) {
		this.f = f;
		this.sampler = sampler;
		this.sources = sources;
	}

	Sampler.prototype.run = function(sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l+1);
		var sinks = new Array(l);

		var sampleSink = new SampleSink(this.f, sinks, sink);

		for(var hold, i=0; i<l; ++i) {
			hold = sinks[i] = new Hold(sampleSink);
			disposables[i] = this.sources[i].run(hold, scheduler);
		}

		disposables[i] = this.sampler.run(sampleSink, scheduler);

		return new CompoundDisposable(disposables);
	};

	function Hold(sink) {
		this.sink = sink;
		this.hasValue = false;
	}

	Hold.prototype.event = function(t, x) {
		this.value = x;
		this.hasValue = true;
		this.sink._notify(this);
	};

	Hold.prototype.end = base.noop;
	Hold.prototype.error = Pipe.prototype.error;

	function SampleSink(f, sinks, sink) {
		this.f = f;
		this.sinks = sinks;
		this.sink = sink;
		this.active = false;
	}

	SampleSink.prototype._notify = function() {
		if(!this.active) {
			this.active = this.sinks.every(hasValue);
		}
	};

	SampleSink.prototype.event = function(t) {
		if(this.active) {
			this.sink.event(t, invoke(this.f, base.map(getValue, this.sinks)));
		}
	};

	SampleSink.prototype.end = Pipe.prototype.end;
	SampleSink.prototype.error = Pipe.prototype.error;

	function hasValue(hold) {
		return hold.hasValue;
	}

	function getValue(hold) {
		return hold.value;
	}


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var transform = __webpack_require__(33);
	var core = __webpack_require__(3);
	var Sink = __webpack_require__(32);
	var IndexSink = __webpack_require__(31);
	var CompoundDisposable = __webpack_require__(37);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(38);
	var Queue = __webpack_require__(61);

	var map = base.map;
	var tail = base.tail;

	exports.zip = zip;
	exports.zipArray = zipArray;

	/**
	 * Combine streams pairwise (or tuple-wise) by index by applying f to values
	 * at corresponding indices.  The returned stream ends when any of the input
	 * streams ends.
	 * @param {function} f function to combine values
	 * @returns {Stream} new stream with items at corresponding indices combined
	 *  using f
	 */
	function zip(f /*,...streams */) {
		return zipArray(f, tail(arguments));
	}

	/**
	 * Combine streams pairwise (or tuple-wise) by index by applying f to values
	 * at corresponding indices.  The returned stream ends when any of the input
	 * streams ends.
	 * @param {function} f function to combine values
	 * @param {[Stream]} streams streams to zip using f
	 * @returns {Stream} new stream with items at corresponding indices combined
	 *  using f
	 */
	function zipArray(f, streams) {
		return streams.length === 0 ? core.empty()
			 : streams.length === 1 ? transform.map(f, streams[0])
			 : new Stream(new Zip(f, map(getSource, streams)));
	}

	function getSource(stream) {
		return stream.source;
	}

	function Zip(f, sources) {
		this.f = f;
		this.sources = sources;
	}

	Zip.prototype.run = function(sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);
		var buffers = new Array(l);

		var zipSink = new ZipSink(this.f, buffers, sinks, sink);

		for(var indexSink, i=0; i<l; ++i) {
			buffers[i] = new Queue();
			indexSink = sinks[i] = new IndexSink(i, zipSink);
			disposables[i] = this.sources[i].run(indexSink, scheduler);
		}

		return new CompoundDisposable(disposables);
	};

	function ZipSink(f, buffers, sinks, sink) {
		this.f = f;
		this.sinks = sinks;
		this.sink = sink;
		this.buffers = buffers;
	}

	ZipSink.prototype.event = function(t, indexedValue) {
		var buffers = this.buffers;
		var buffer = buffers[indexedValue.index];

		buffer.push(indexedValue.value);

		if(buffer.length() === 1) {
			if(!ready(this.buffers)) {
				return;
			}

			emitZipped(this.f, t, buffers, this.sink);

			if (ended(this.buffers, this.sinks)) {
				this.sink.end(t, void 0);
			}
		}
	};

	ZipSink.prototype.end = function(t, indexedValue) {
		var buffer = this.buffers[indexedValue.index];
		if(buffer.isEmpty()) {
			this.sink.end(t, indexedValue.value);
		}
	};

	ZipSink.prototype.error = Sink.prototype.error;

	function emitZipped (f, t, buffers, sink) {
		sink.event(t, invoke(f, map(head, buffers)));
	}

	function head(buffer) {
		return buffer.shift();
	}

	function ended(buffers, sinks) {
		for(var i=0, l=buffers.length; i<l; ++i) {
			if(buffers[i].isEmpty() && !sinks[i].active) {
				return true;
			}
		}
		return false;
	}

	function ready(buffers) {
		for(var i=0, l=buffers.length; i<l; ++i) {
			if(buffers[i].isEmpty()) {
				return false;
			}
		}
		return true;
	}


/***/ },
/* 61 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	// Based on https://github.com/petkaantonov/deque

	module.exports = Queue;

	function Queue(capPow2) {
		this._capacity = capPow2||32;
		this._length = 0;
		this._head = 0;
	}

	Queue.prototype.push = function (x) {
		var len = this._length;
		this._checkCapacity(len + 1);

		var i = (this._head + len) & (this._capacity - 1);
		this[i] = x;
		this._length = len + 1;
	};

	Queue.prototype.shift = function () {
		var head = this._head;
		var x = this[head];

		this[head] = void 0;
		this._head = (head + 1) & (this._capacity - 1);
		this._length--;
		return x;
	};

	Queue.prototype.isEmpty = function() {
		return this._length === 0;
	};

	Queue.prototype.length = function () {
		return this._length;
	};

	Queue.prototype._checkCapacity = function (size) {
		if (this._capacity < size) {
			this._ensureCapacity(this._capacity << 1);
		}
	};

	Queue.prototype._ensureCapacity = function (capacity) {
		var oldCapacity = this._capacity;
		this._capacity = capacity;

		var last = this._head + this._length;

		if (last > oldCapacity) {
			copy(this, 0, this, oldCapacity, last & (oldCapacity - 1));
		}
	};

	function copy(src, srcIndex, dst, dstIndex, len) {
		for (var j = 0; j < len; ++j) {
			dst[j + dstIndex] = src[j + srcIndex];
			src[j + srcIndex] = void 0;
		}
	}



/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var MulticastSource = __webpack_require__(14);
	var until = __webpack_require__(63).takeUntil;
	var mergeConcurrently = __webpack_require__(51).mergeConcurrently;
	var map = __webpack_require__(33).map;

	exports.switch = switchLatest;

	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @param {Stream} stream of streams on which to switch
	 * @returns {Stream} switching stream
	 */
	function switchLatest(stream) {
		var upstream = new Stream(new MulticastSource(stream.source));

		return mergeConcurrently(1, map(untilNext, upstream));

		function untilNext(s) {
			return until(upstream, s);
		}
	}


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(32);
	var CompoundDisposable = __webpack_require__(37);
	var never = __webpack_require__(3).never;
	var join = __webpack_require__(56).join;
	var take = __webpack_require__(64).take;
	var noop = __webpack_require__(2).noop;

	exports.during    = during;
	exports.takeUntil = takeUntil;
	exports.skipUntil = skipUntil;

	function takeUntil(signal, stream) {
		return new Stream(new Until(signal.source, stream.source));
	}

	function skipUntil(signal, stream) {
		return between(signal, never(), stream);
	}

	function during(timeWindow, stream) {
		return between(timeWindow, join(timeWindow), stream);
	}

	function between(start, end, stream) {
		return new Stream(new During(take(1, start).source, take(1, end).source, stream.source));
	}

	function Until(maxSignal, source) {
		this.maxSignal = maxSignal;
		this.source = source;
	}

	Until.prototype.run = function(sink, scheduler) {
		var min = new MinBound(sink);
		var max = new UpperBound(this.maxSignal, sink, scheduler);
		var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

		return new CompoundDisposable([min, max, disposable]);
	};

	function MinBound(sink) {
		this.value = -Infinity;
		this.sink = sink;
	}

	MinBound.prototype.error = Pipe.prototype.error;
	MinBound.prototype.event = noop;
	MinBound.prototype.end = noop;
	MinBound.prototype.dispose = noop;

	function During(minSignal, maxSignal, source) {
		this.minSignal = minSignal;
		this.maxSignal = maxSignal;
		this.source = source;
	}

	During.prototype.run = function(sink, scheduler) {
		var min = new LowerBound(this.minSignal, sink, scheduler);
		var max = new UpperBound(this.maxSignal, sink, scheduler);
		var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

		return new CompoundDisposable([min, max, disposable]);
	};

	function TimeWindowSink(min, max, sink) {
		this.min = min;
		this.max = max;
		this.sink = sink;
	}

	TimeWindowSink.prototype.event = function(t, x) {
		if(t >= this.min.value && t < this.max.value) {
			this.sink.event(t, x);
		}
	};

	TimeWindowSink.prototype.error = Pipe.prototype.error;
	TimeWindowSink.prototype.end = Pipe.prototype.end;

	function LowerBound(signal, sink, scheduler) {
		this.value = Infinity;
		this.sink = sink;
		this.disposable = signal.run(this, scheduler);
	}

	LowerBound.prototype.event = function(t /*, x */) {
		if(t < this.value) {
			this.value = t;
		}
	};

	LowerBound.prototype.end = noop;
	LowerBound.prototype.error = Pipe.prototype.error;

	LowerBound.prototype.dispose = function() {
		return this.disposable.dispose();
	};

	function UpperBound(signal, sink, scheduler) {
		this.value = Infinity;
		this.sink = sink;
		this.disposable = signal.run(this, scheduler);
	}

	UpperBound.prototype.event = function(t, x) {
		if(t < this.value) {
			this.value = t;
			this.sink.end(t, x);
		}
	};

	UpperBound.prototype.end = noop;
	UpperBound.prototype.error = Pipe.prototype.error;

	UpperBound.prototype.dispose = function() {
		return this.disposable.dispose();
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(32);
	var core = __webpack_require__(3);
	var AwaitingDisposable = __webpack_require__(52);

	exports.take = take;
	exports.skip = skip;
	exports.slice = slice;
	exports.takeWhile = takeWhile;
	exports.skipWhile = skipWhile;

	/**
	 * @param {number} n
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing only up to the first n items from stream
	 */
	function take(n, stream) {
		return slice(0, n, stream);
	}

	/**
	 * @param {number} n
	 * @param {Stream} stream
	 * @returns {Stream} new stream with the first n items removed
	 */
	function skip(n, stream) {
		return slice(n, Infinity, stream);
	}

	/**
	 * Slice a stream by index. Negative start/end indexes are not supported
	 * @param {number} start
	 * @param {number} end
	 * @param {Stream} stream
	 * @returns {Stream} stream containing items where start <= index < end
	 */
	function slice(start, end, stream) {
		return end <= start ? core.empty()
			: new Stream(new Slice(start, end, stream.source));
	}

	function Slice(min, max, source) {
		this.skip = min;
		this.take = max - min;
		this.source = source;
	}

	Slice.prototype.run = function(sink, scheduler) {
		return new SliceSink(this.skip, this.take, this.source, sink, scheduler);
	};

	function SliceSink(skip, take, source, sink, scheduler) {
		this.skip = skip;
		this.take = take;
		this.sink = sink;
		this.disposable = new AwaitingDisposable(source.run(this, scheduler));
	}

	SliceSink.prototype.end   = Sink.prototype.end;
	SliceSink.prototype.error = Sink.prototype.error;

	SliceSink.prototype.event = function(t, x) {
		if(this.skip > 0) {
			this.skip -= 1;
			return;
		}

		if(this.take === 0) {
			return;
		}

		this.take -= 1;
		this.sink.event(t, x);
		if(this.take === 0) {
			this.dispose();
			this.sink.end(t, x);
		}
	};

	SliceSink.prototype.dispose = function() {
		return this.disposable.dispose();
	};

	function takeWhile(p, stream) {
		return new Stream(new TakeWhile(p, stream.source));
	}

	function TakeWhile(p, source) {
		this.p = p;
		this.source = source;
	}

	TakeWhile.prototype.run = function(sink, scheduler) {
		return new TakeWhileSink(this.p, this.source, sink, scheduler);
	};

	function TakeWhileSink(p, source, sink, scheduler) {
		this.p = p;
		this.sink = sink;
		this.active = true;
		this.disposable = new AwaitingDisposable(source.run(this, scheduler));
	}

	TakeWhileSink.prototype.end   = Sink.prototype.end;
	TakeWhileSink.prototype.error = Sink.prototype.error;

	TakeWhileSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}

		var p = this.p;
		this.active = p(x);
		if(this.active) {
			this.sink.event(t, x);
		} else {
			this.dispose();
			this.sink.end(t, x);
		}
	};

	TakeWhileSink.prototype.dispose = function() {
		return this.disposable.dispose();
	};

	function skipWhile(p, stream) {
		return new Stream(new SkipWhile(p, stream.source));
	}

	function SkipWhile(p, source) {
		this.p = p;
		this.source = source;
	}

	SkipWhile.prototype.run = function(sink, scheduler) {
		return this.source.run(new SkipWhileSink(this.p, sink), scheduler);
	};

	function SkipWhileSink(p, sink) {
		this.p = p;
		this.sink = sink;
		this.skipping = true;
	}

	SkipWhileSink.prototype.end   = Sink.prototype.end;
	SkipWhileSink.prototype.error = Sink.prototype.error;

	SkipWhileSink.prototype.event = function(t, x) {
		if(this.skipping) {
			var p = this.p;
			this.skipping = p(x);
			if(this.skipping) {
				return;
			}
		}

		this.sink.event(t, x);
	};


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(32);
	var Filter = __webpack_require__(35);

	exports.filter = filter;
	exports.skipRepeats = skipRepeats;
	exports.skipRepeatsWith = skipRepeatsWith;

	/**
	 * Retain only items matching a predicate
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @param {Stream} stream stream to filter
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */
	function filter(p, stream) {
		return new Stream(Filter.create(p, stream.source));
	}

	/**
	 * Skip repeated events, using === to detect duplicates
	 * @param {Stream} stream stream from which to omit repeated events
	 * @returns {Stream} stream without repeated events
	 */
	function skipRepeats(stream) {
		return skipRepeatsWith(same, stream);
	}

	/**
	 * Skip repeated events using the provided equals function to detect duplicates
	 * @param {function(a:*, b:*):boolean} equals optional function to compare items
	 * @param {Stream} stream stream from which to omit repeated events
	 * @returns {Stream} stream without repeated events
	 */
	function skipRepeatsWith(equals, stream) {
		return new Stream(new SkipRepeats(equals, stream.source));
	}

	function SkipRepeats(equals, source) {
		this.equals = equals;
		this.source = source;
	}

	SkipRepeats.prototype.run = function(sink, scheduler) {
		return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler);
	};

	function SkipRepeatsSink(equals, sink) {
		this.equals = equals;
		this.sink = sink;
		this.value = void 0;
		this.init = true;
	}

	SkipRepeatsSink.prototype.end   = Sink.prototype.end;
	SkipRepeatsSink.prototype.error = Sink.prototype.error;

	SkipRepeatsSink.prototype.event = function(t, x) {
		if(this.init) {
			this.init = false;
			this.value = x;
			this.sink.event(t, x);
		} else if(!this.equals(this.value, x)) {
			this.value = x;
			this.sink.event(t, x);
		}
	};

	function same(a, b) {
		return a === b;
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(32);
	var CompoundDisposable = __webpack_require__(37);
	var PropagateTask = __webpack_require__(5);

	exports.delay = delay;

	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	function delay(delayTime, stream) {
		return delayTime <= 0 ? stream
			 : new Stream(new Delay(delayTime, stream.source));
	}

	function Delay(dt, source) {
		this.dt = dt;
		this.source = source;
	}

	Delay.prototype.run = function(sink, scheduler) {
		var delaySink = new DelaySink(this.dt, sink, scheduler);
		return new CompoundDisposable([delaySink, this.source.run(delaySink, scheduler)]);
	};

	function DelaySink(dt, sink, scheduler) {
		this.dt = dt;
		this.sink = sink;
		this.scheduler = scheduler;
	}

	DelaySink.prototype.dispose = function() {
		var self = this;
		this.scheduler.cancelAll(function(task) {
			return task.sink === self.sink;
		});
	};

	DelaySink.prototype.event = function(t, x) {
		this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
	};

	DelaySink.prototype.end = function(t, x) {
		this.scheduler.delay(this.dt, PropagateTask.end(x, this.sink));
	};

	DelaySink.prototype.error = Sink.prototype.error;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(32);

	exports.timestamp = timestamp;

	function timestamp(stream) {
		return new Stream(new Timestamp(stream.source));
	}

	function Timestamp(source) {
		this.source = source;
	}

	Timestamp.prototype.run = function(sink, scheduler) {
		return this.source.run(new TimestampSink(sink), scheduler);
	};

	function TimestampSink(sink) {
		this.sink = sink;
	}

	TimestampSink.prototype.end   = Sink.prototype.end;
	TimestampSink.prototype.error = Sink.prototype.error;

	TimestampSink.prototype.event = function(t, x) {
		this.sink.event(t, { time: t, value: x });
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(32);
	var CompoundDisposable = __webpack_require__(37);
	var PropagateTask = __webpack_require__(5);

	exports.throttle = throttle;
	exports.debounce = debounce;

	/**
	 * Limit the rate of events by suppressing events that occur too often
	 * @param {Number} period time to suppress events
	 * @param {Stream} stream
	 * @returns {Stream}
	 */
	function throttle(period, stream) {
		return new Stream(new Throttle(period, stream.source));
	}

	function Throttle(period, source) {
		this.dt = period;
		this.source = source;
	}

	Throttle.prototype.run = function(sink, scheduler) {
		return this.source.run(new ThrottleSink(this.dt, sink), scheduler);
	};

	function ThrottleSink(dt, sink) {
		this.time = 0;
		this.dt = dt;
		this.sink = sink;
	}

	ThrottleSink.prototype.event = function(t, x) {
		if(t >= this.time) {
			this.time = t + this.dt;
			this.sink.event(t, x);
		}
	};

	ThrottleSink.prototype.end   = function(t, e) {
		return Sink.prototype.end.call(this, t, e);
	};

	ThrottleSink.prototype.error = Sink.prototype.error;

	/**
	 * Wait for a burst of events to subside and emit only the last event in the burst
	 * @param {Number} period events occuring more frequently than this
	 *  will be suppressed
	 * @param {Stream} stream stream to debounce
	 * @returns {Stream} new debounced stream
	 */
	function debounce(period, stream) {
		return new Stream(new Debounce(period, stream.source));
	}

	function Debounce(dt, source) {
		this.dt = dt;
		this.source = source;
	}

	Debounce.prototype.run = function(sink, scheduler) {
		return new DebounceSink(this.dt, this.source, sink, scheduler);
	};

	function DebounceSink(dt, source, sink, scheduler) {
		this.dt = dt;
		this.sink = sink;
		this.scheduler = scheduler;
		this.value = void 0;
		this.timer = null;

		var sourceDisposable = source.run(this, scheduler);
		this.disposable = new CompoundDisposable([this, sourceDisposable]);
	}

	DebounceSink.prototype.event = function(t, x) {
		this._clearTimer();
		this.value = x;
		this.timer = this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
	};

	DebounceSink.prototype.end = function(t, x) {
		if(this._clearTimer()) {
			this.sink.event(t, this.value);
			this.value = void 0;
		}
		this.sink.end(t, x);
	};

	DebounceSink.prototype.error = function(t, x) {
		this._clearTimer();
		this.sink.error(t, x);
	};

	DebounceSink.prototype.dispose = function() {
		this._clearTimer();
	};

	DebounceSink.prototype._clearTimer = function() {
		if(this.timer === null) {
			return false;
		}
		this.timer.cancel();
		this.timer = null;
		return true;
	};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var resolve = __webpack_require__(15).resolve;
	var fatal = __webpack_require__(6);

	exports.fromPromise = fromPromise;
	exports.await = await;

	function fromPromise(p) {
		return new Stream(new PromiseSource(p));
	}

	function PromiseSource(p) {
		this.promise = p;
	}

	PromiseSource.prototype.run = function(sink, scheduler) {
		return new PromiseProducer(this.promise, sink, scheduler);
	};

	function PromiseProducer(p, sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;

		var self = this;
		resolve(p).then(function(x) {
			self._emit(self.scheduler.now(), x);
		}).catch(function(e) {
			self._error(self.scheduler.now(), e);
		});
	}

	PromiseProducer.prototype._emit = function(t, x) {
		if(!this.active) {
			return;
		}

		this.sink.event(t, x);
		this.sink.end(t, void 0);
	};

	PromiseProducer.prototype._error = function(t, e) {
		if(!this.active) {
			return;
		}

		this.sink.error(t, e);
	};

	PromiseProducer.prototype.dispose = function() {
		this.active = false;
	};

	function await(stream) {
		return new Stream(new Await(stream.source));
	}

	function Await(source) {
		this.source = source;
	}

	Await.prototype.run = function(sink, scheduler) {
		return this.source.run(new AwaitSink(sink, scheduler), scheduler);
	};

	function AwaitSink(sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.queue = void 0;
	}

	AwaitSink.prototype.event = function(t, promise) {
		var self = this;
		this.queue = resolve(this.queue).then(function() {
			return self._event(t, promise);
		}).catch(function(e) {
			return self._error(t, e);
		});
	};

	AwaitSink.prototype.end = function(t, x) {
		var self = this;
		this.queue = resolve(this.queue).then(function() {
			return self._end(t, x);
		}).catch(function(e) {
			return self._error(t, e);
		});
	};

	AwaitSink.prototype.error = function(t, e) {
		var self = this;
		this.queue = resolve(this.queue).then(function() {
			return self._error(t, e);
		}).catch(fatal);
	};

	AwaitSink.prototype._error = function(t, e) {
		try {
			// Don't resolve error values, propagate directly
			this.sink.error(Math.max(t, this.scheduler.now()), e);
		} catch(e) {
			fatal(e);
			throw e;
		}
	};

	AwaitSink.prototype._event = function(t, promise) {
		var self = this;
		return promise.then(function(x) {
			self.sink.event(Math.max(t, self.scheduler.now()), x);
		});
	};

	AwaitSink.prototype._end = function(t, x) {
		var self = this;
		return resolve(x).then(function(x) {
			self.sink.end(Math.max(t, self.scheduler.now()), x);
		});
	};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var ValueSource = __webpack_require__(4);

	exports.flatMapError = flatMapError;
	exports.throwError   = throwError;

	/**
	 * If stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	function flatMapError(f, stream) {
		return new Stream(new FlatMapError(f, stream.source));
	}

	/**
	 * Create a stream containing only an error
	 * @param {*} e error value, preferably an Error or Error subtype
	 * @returns {Stream} new stream containing only an error
	 */
	function throwError(e) {
		return new Stream(new ValueSource(error, e));
	}

	function error(t, e, sink) {
		sink.error(t, e);
	}

	function FlatMapError(f, source) {
		this.f = f;
		this.source = source;
	}

	FlatMapError.prototype.run = function(sink, scheduler) {
		return new FlatMapErrorSink(this.f, this.source, sink, scheduler);
	};

	function FlatMapErrorSink(f, source, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
		this.disposable = source.run(this, scheduler);
	}

	FlatMapErrorSink.prototype.error = function(t, e) {
		if(!this.active) {
			return;
		}

		// TODO: forward dispose errors
		this.disposable.dispose();
		//resolve(this.disposable.dispose()).catch(function(e) { sink.error(t, e); });

		var f = this.f;
		var stream = f(e);
		this.disposable = stream.source.run(this.sink, this.scheduler);
	};

	FlatMapErrorSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}
		this.sink.event(t, x);
	};

	FlatMapErrorSink.prototype.end = function(t, x) {
		if(!this.active) {
			return;
		}
		this.sink.end(t, x);
	};

	FlatMapErrorSink.prototype.dispose = function() {
		this.active = false;
		return this.disposable.dispose();
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2015 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	/** @contributor Maciej Ligenza */

	var Stream = __webpack_require__(1);
	var MulticastSource = __webpack_require__(14);

	exports.multicast = multicast;

	/**
	 * Transform the stream into a multicast stream, allowing it to be shared
	 * more efficiently by many observers, without causing multiple invocation
	 * of internal machinery.  Multicast is idempotent:
	 * stream.multicast() === stream.multicast().multicast()
	 * @param {Stream} stream to ensure is multicast.
	 * @returns {Stream} new stream which will multicast events to all observers.
	 */
	function multicast(stream) {
		var source = stream.source;
		return source instanceof MulticastSource ? stream : new Stream(new MulticastSource(source));
	}


/***/ }
/******/ ])
});
;