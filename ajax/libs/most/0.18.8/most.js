(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
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

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var base = __webpack_require__(2);
	var core = __webpack_require__(3);
	var from = __webpack_require__(11).from;
	var periodic = __webpack_require__(15).periodic;

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

	var create = __webpack_require__(18);

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

	var events = __webpack_require__(22);

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
	// Observing

	var observe = __webpack_require__(25);

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

	var loop = __webpack_require__(33).loop;

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

	var accumulate = __webpack_require__(35);

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

	var unfold = __webpack_require__(38);
	var iterate = __webpack_require__(39);
	var generate = __webpack_require__(40);
	var build = __webpack_require__(36);

	exports.unfold    = unfold.unfold;
	exports.iterate   = iterate.iterate;
	exports.generate  = generate.generate;
	exports.cycle     = build.cycle;
	exports.concat    = build.concat;
	exports.startWith = build.cons;

	/**
	 * @deprecated
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

	var transform = __webpack_require__(41);
	var applicative = __webpack_require__(45);

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

	var transduce = __webpack_require__(49);

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

	var flatMap = __webpack_require__(50);

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

	var continueWith = __webpack_require__(37).continueWith;

	exports.continueWith = continueWith;
	exports.flatMapEnd = continueWith;

	/**
	 * Map the end event to a new stream, and begin emitting its values.
	 * @param {function(x:*):Stream} f function that receives the end event value,
	 * and *must* return a new Stream to continue with.
	 * @returns {Stream} new stream that emits all events from the original stream,
	 * followed by all events from the stream returned by f.
	 */
	Stream.prototype.continueWith = Stream.prototype.flatMapEnd = function(f) {
		return continueWith(f, this);
	};

	var concatMap = __webpack_require__(53).concatMap;

	exports.concatMap = concatMap;

	Stream.prototype.concatMap = function(f) {
		return concatMap(f, this);
	};

	//-----------------------------------------------------------------------
	// Concurrent merging

	var mergeConcurrently = __webpack_require__(51);

	exports.mergeConcurrently = mergeConcurrently.mergeConcurrently;

	/**
	 * Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer, limiting the number of inner streams that may
	 * be active concurrently.
	 * @param {number} concurrency at most this many inner streams will be
	 *  allowed to be active concurrently.
	 * @return {Stream<X>} new stream containing all events of all inner
	 *  streams, with limited concurrency.
	 */
	Stream.prototype.mergeConcurrently = function(concurrency) {
		return mergeConcurrently.mergeConcurrently(concurrency, this);
	};

	//-----------------------------------------------------------------------
	// Merging

	var merge = __webpack_require__(54);

	exports.merge = merge.merge;
	exports.mergeArray = merge.mergeArray;

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

	var combine = __webpack_require__(46);

	exports.combine = combine.combine;
	exports.combineArray = combine.combineArray;

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

	var sample = __webpack_require__(55);

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

	var zip = __webpack_require__(56);

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

	var switchLatest = __webpack_require__(58).switch;

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

	var filter = __webpack_require__(60);

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

	var slice = __webpack_require__(61);

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

	var timeslice = __webpack_require__(59);

	exports.until  = exports.takeUntil = timeslice.takeUntil;
	exports.since  = exports.skipUntil = timeslice.skipUntil;
	exports.during = timeslice.during;

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

	var delay = __webpack_require__(62).delay;

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

	var timestamp = __webpack_require__(63).timestamp;

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

	var limit = __webpack_require__(64);

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

	var promises = __webpack_require__(65);

	exports.fromPromise = promises.fromPromise;
	exports.await       = promises.awaitPromises;

	/**
	 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
	 * event order, but timeshifts events based on promise resolution time.
	 * @returns {Stream<X>} stream containing non-promise values
	 */
	Stream.prototype.await = function() {
		return promises.awaitPromises(this);
	};

	//-----------------------------------------------------------------------
	// Error handling

	var errors = __webpack_require__(66);

	exports.recoverWith  = errors.flatMapError;
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
	Stream.prototype.recoverWith = Stream.prototype.flatMapError = function(f) {
		return errors.flatMapError(f, this);
	};

	//-----------------------------------------------------------------------
	// Multicasting

	var multicast = __webpack_require__(16).default;

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

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = Stream;

	function Stream(source) {
		this.source = source;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.noop = noop;
	exports.identity = identity;
	exports.compose = compose;
	exports.apply = apply;

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
	exports.isArrayLike = isArrayLike;

	function noop() {}

	function identity(x) {
		return x;
	}

	function compose(f, g) {
		return function(x) {
			return f(g(x));
		};
	}

	function apply(f, x) {
		return f(x);
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
		if(l === 0 || index >= array) { // exit early if index beyond end of array
			return array;
		}

		if(l === 1) { // exit early if index in bounds and length === 1
			return [];
		}

		return unsafeRemove(index, array, l-1);
	}

	function unsafeRemove(index, a, l) {
		var b = new Array(l);
		var i;
		for(i=0; i<index; ++i) {
			b[i] = a[i];
		}
		for(i=index; i<l; ++i) {
			b[i] = a[i+1];
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

	function isArrayLike(x){
	   return x != null && typeof x.length === 'number' && typeof x !== 'function';
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var ValueSource = __webpack_require__(4);
	var dispose = __webpack_require__(7);
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

		return dispose.create(disposeEmpty, task);
	};

	function disposeEmpty(task) {
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
		return dispose.empty();
	};

	var NEVER = new Stream(new NeverSource());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
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
		this.task = scheduler.asap(new PropagateTask(emit, x, sink));
	}

	ValueProducer.prototype.dispose = function() {
		return this.task.cancel();
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
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

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
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
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Disposable = __webpack_require__(8);
	var SettableDisposable = __webpack_require__(9);
	var isPromise = __webpack_require__(10).isPromise;
	var base = __webpack_require__(2);

	var map = base.map;
	var identity = base.identity;

	exports.tryDispose = tryDispose;
	exports.create = create;
	exports.once = once;
	exports.empty = empty;
	exports.all = all;
	exports.settable = settable;
	exports.promised = promised;

	/**
	 * Call disposable.dispose.  If it returns a promise, catch promise
	 * error and forward it through the provided sink.
	 * @param {number} t time
	 * @param {{dispose: function}} disposable
	 * @param {{error: function}} sink
	 * @return {*} result of disposable.dispose
	 */
	function tryDispose(t, disposable, sink) {
		var result = disposeSafely(disposable);
		return isPromise(result)
			? result.catch(function (e) {
				sink.error(t, e);
			})
			: result;
	}

	/**
	 * Create a new Disposable which will dispose its underlying resource
	 * at most once.
	 * @param {function} dispose function
	 * @param {*?} data any data to be passed to disposer function
	 * @return {Disposable}
	 */
	function create(dispose, data) {
		return once(new Disposable(dispose, data));
	}

	/**
	 * Create a noop disposable. Can be used to satisfy a Disposable
	 * requirement when no actual resource needs to be disposed.
	 * @return {Disposable|exports|module.exports}
	 */
	function empty() {
		return new Disposable(identity, void 0);
	}

	/**
	 * Create a disposable that will dispose all input disposables in parallel.
	 * @param {Array<Disposable>} disposables
	 * @return {Disposable}
	 */
	function all(disposables) {
		return create(disposeAll, disposables);
	}

	function disposeAll(disposables) {
		return Promise.all(map(disposeSafely, disposables));
	}

	function disposeSafely(disposable) {
		try {
			return disposable.dispose();
		} catch(e) {
			return Promise.reject(e);
		}
	}

	/**
	 * Create a disposable from a promise for another disposable
	 * @param {Promise<Disposable>} disposablePromise
	 * @return {Disposable}
	 */
	function promised(disposablePromise) {
		return create(disposePromise, disposablePromise);
	}

	function disposePromise(disposablePromise) {
		return disposablePromise.then(disposeOne);
	}

	function disposeOne(disposable) {
		return disposable.dispose();
	}

	/**
	 * Create a disposable proxy that allows its underlying disposable to
	 * be set later.
	 * @return {SettableDisposable}
	 */
	function settable() {
		return new SettableDisposable();
	}

	/**
	 * Wrap an existing disposable (which may not already have been once()d)
	 * so that it will only dispose its underlying resource at most once.
	 * @param {{ dispose: function() }} disposable
	 * @return {Disposable} wrapped disposable
	 */
	function once(disposable) {
		return new Disposable(disposeMemoized, memoized(disposable));
	}

	function disposeMemoized(memoized) {
		if(!memoized.disposed) {
			memoized.disposed = true;
			memoized.value = disposeSafely(memoized.disposable);
			memoized.disposable = void 0;
		}

		return memoized.value;
	}

	function memoized(disposable) {
		return { disposed: false, disposable: disposable, value: void 0 };
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = Disposable;

	/**
	 * Create a new Disposable which will dispose its underlying resource.
	 * @param {function} dispose function
	 * @param {*?} data any data to be passed to disposer function
	 * @constructor
	 */
	function Disposable(dispose, data) {
		this._dispose = dispose;
		this._data = data;
	}

	Disposable.prototype.dispose = function() {
		return this._dispose(this._data);
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = SettableDisposable;

	function SettableDisposable() {
		this.disposable = void 0;
		this.disposed = false;
		this._resolve = void 0;

		var self = this;
		this.result = new Promise(function(resolve) {
			self._resolve = resolve;
		});
	}

	SettableDisposable.prototype.setDisposable = function(disposable) {
		if(this.disposable !== void 0) {
			throw new Error('setDisposable called more than once');
		}

		this.disposable = disposable;

		if(this.disposed) {
			this._resolve(disposable.dispose());
		}
	};

	SettableDisposable.prototype.dispose = function() {
		if(this.disposed) {
			return this.result;
		}

		this.disposed = true;

		if(this.disposable !== void 0) {
			this.result = this.disposable.dispose();
		}

		return this.result;
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.isPromise = isPromise;

	function isPromise(p) {
		return p !== null && typeof p === 'object' && typeof p.then === 'function';
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var fromArray = __webpack_require__(12).fromArray;
	var isIterable = __webpack_require__(13).isIterable;
	var fromIterable = __webpack_require__(14).fromIterable;
	var isArrayLike = __webpack_require__(2).isArrayLike;

	exports.from = from;

	function from(a) {
		if(Array.isArray(a) || isArrayLike(a)) {
			return fromArray(a);
		}

		if(isIterable(a)) {
			return fromIterable(a);
		}

		throw new TypeError('not iterable: ' + a);
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
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
		produce(this, array, sink);
	}

	function produce(task, array, sink) {
		for(var i=0, l=array.length; i<l && task.active; ++i) {
			sink.event(0, array[i]);
		}

		task.active && end();

		function end() {
			sink.end(0);
		}
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var getIterator = __webpack_require__(13).getIterator;
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var dispose = __webpack_require__(7);
	var MulticastSource = __webpack_require__(16).MulticastSource;
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
		return dispose.create(cancelTask, task);
	};

	function cancelTask(task) {
		task.cancel();
	}

	function emit(t, x, sink) {
		sink.event(t, x);
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('@most/prelude'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.prelude);
	    global.mostMulticast = mod.exports;
	  }
	})(this, function (exports, _prelude) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.MulticastSource = undefined;

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();

	  var MulticastDisposable = function () {
	    function MulticastDisposable(source, sink) {
	      _classCallCheck(this, MulticastDisposable);

	      this.source = source;
	      this.sink = sink;
	    }

	    _createClass(MulticastDisposable, [{
	      key: 'dispose',
	      value: function dispose() {
	        var s = this.source;
	        var remaining = s.remove(this.sink);
	        return remaining === 0 && s._dispose();
	      }
	    }]);

	    return MulticastDisposable;
	  }();

	  function tryEvent(t, x, sink) {
	    try {
	      sink.event(t, x);
	    } catch (e) {
	      sink.error(t, e);
	    }
	  }

	  function tryEnd(t, x, sink) {
	    try {
	      sink.end(t, x);
	    } catch (e) {
	      sink.error(t, e);
	    }
	  }

	  var dispose = function dispose(disposable) {
	    return disposable.dispose();
	  };

	  var emptyDisposable = {
	    dispose: function dispose() {}
	  };

	  var MulticastSource = function () {
	    function MulticastSource(source) {
	      _classCallCheck(this, MulticastSource);

	      this.source = source;
	      this.sinks = [];
	      this._disposable = emptyDisposable;
	    }

	    _createClass(MulticastSource, [{
	      key: 'run',
	      value: function run(sink, scheduler) {
	        var n = this.add(sink);

	        if (n === 1) {
	          this._disposable = this.source.run(this, scheduler);
	        }

	        return new MulticastDisposable(this, sink);
	      }
	    }, {
	      key: '_dispose',
	      value: function _dispose() {
	        var disposable = this._disposable;
	        this._disposable = void 0;
	        return Promise.resolve(disposable).then(dispose);
	      }
	    }, {
	      key: 'add',
	      value: function add(sink) {
	        this.sinks = (0, _prelude.append)(sink, this.sinks);
	        return this.sinks.length;
	      }
	    }, {
	      key: 'remove',
	      value: function remove(sink) {
	        this.sinks = (0, _prelude.remove)((0, _prelude.findIndex)(sink, this.sinks), this.sinks);
	        return this.sinks.length;
	      }
	    }, {
	      key: 'event',
	      value: function event(time, value) {
	        var s = this.sinks;

	        if (s.length === 1) {
	          tryEvent(time, value, s[0]);
	          return;
	        }

	        for (var i = 0; i < s.length; ++i) {
	          tryEvent(time, value, s[i]);
	        }
	      }
	    }, {
	      key: 'end',
	      value: function end(time, value) {
	        var s = this.sinks;

	        if (s.length === 1) {
	          tryEnd(time, value, s[0]);
	          return;
	        }

	        for (var i = 0; i < s.length; ++i) {
	          tryEnd(time, value, s[i]);
	        }
	      }
	    }, {
	      key: 'error',
	      value: function error(time, err) {
	        var s = this.sinks;

	        if (s.length === 1) {
	          s[0].error(time, err);
	          return;
	        }

	        for (var i = 0; i < s.length; ++i) {
	          s[i].error(time, err);
	        }
	      }
	    }]);

	    return MulticastSource;
	  }();

	  function multicast(stream) {
	    var source = stream.source;
	    return source instanceof MulticastSource ? stream : new stream.constructor(new MulticastSource(source));
	  }

	  exports.MulticastSource = MulticastSource;
	  exports.default = multicast;
	});


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports);
	        global.mostPrelude = mod.exports;
	    }
	})(this, function (exports) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	    /** @license MIT License (c) copyright 2010-2016 original author or authors */

	    // Non-mutating array operations

	    // cons :: a -> [a] -> [a]
	    // a with x prepended
	    function cons(x, a) {
	        var l = a.length;
	        var b = new Array(l + 1);
	        b[0] = x;
	        for (var i = 0; i < l; ++i) {
	            b[i + 1] = a[i];
	        }
	        return b;
	    }

	    // append :: a -> [a] -> [a]
	    // a with x appended
	    function append(x, a) {
	        var l = a.length;
	        var b = new Array(l + 1);
	        for (var i = 0; i < l; ++i) {
	            b[i] = a[i];
	        }

	        b[l] = x;
	        return b;
	    }

	    // drop :: Int -> [a] -> [a]
	    // drop first n elements
	    function drop(n, a) {
	        if (n < 0) {
	            throw new TypeError('n must be >= 0');
	        }

	        var l = a.length;
	        if (n === 0 || l === 0) {
	            return a;
	        }

	        if (n >= l) {
	            return [];
	        }

	        return unsafeDrop(n, a, l - n);
	    }

	    // unsafeDrop :: Int -> [a] -> Int -> [a]
	    // Internal helper for drop
	    function unsafeDrop(n, a, l) {
	        var b = new Array(l);
	        for (var i = 0; i < l; ++i) {
	            b[i] = a[n + i];
	        }
	        return b;
	    }

	    // tail :: [a] -> [a]
	    // drop head element
	    function tail(a) {
	        return drop(1, a);
	    }

	    // copy :: [a] -> [a]
	    // duplicate a (shallow duplication)
	    function copy(a) {
	        var l = a.length;
	        var b = new Array(l);
	        for (var i = 0; i < l; ++i) {
	            b[i] = a[i];
	        }
	        return b;
	    }

	    // map :: (a -> b) -> [a] -> [b]
	    // transform each element with f
	    function map(f, a) {
	        var l = a.length;
	        var b = new Array(l);
	        for (var i = 0; i < l; ++i) {
	            b[i] = f(a[i]);
	        }
	        return b;
	    }

	    // reduce :: (a -> b -> a) -> a -> [b] -> a
	    // accumulate via left-fold
	    function reduce(f, z, a) {
	        var r = z;
	        for (var i = 0, l = a.length; i < l; ++i) {
	            r = f(r, a[i], i);
	        }
	        return r;
	    }

	    // replace :: a -> Int -> [a]
	    // replace element at index
	    function replace(x, i, a) {
	        if (i < 0) {
	            throw new TypeError('i must be >= 0');
	        }

	        var l = a.length;
	        var b = new Array(l);
	        for (var j = 0; j < l; ++j) {
	            b[j] = i === j ? x : a[j];
	        }
	        return b;
	    }

	    // remove :: Int -> [a] -> [a]
	    // remove element at index
	    function remove(i, a) {
	        if (i < 0) {
	            throw new TypeError('i must be >= 0');
	        }

	        var l = a.length;
	        if (l === 0 || i >= l) {
	            // exit early if index beyond end of array
	            return a;
	        }

	        if (l === 1) {
	            // exit early if index in bounds and length === 1
	            return [];
	        }

	        return unsafeRemove(i, a, l - 1);
	    }

	    // unsafeRemove :: Int -> [a] -> Int -> [a]
	    // Internal helper to remove element at index
	    function unsafeRemove(i, a, l) {
	        var b = new Array(l);
	        var j = undefined;
	        for (j = 0; j < i; ++j) {
	            b[j] = a[j];
	        }
	        for (j = i; j < l; ++j) {
	            b[j] = a[j + 1];
	        }

	        return b;
	    }

	    // removeAll :: (a -> boolean) -> [a] -> [a]
	    // remove all elements matching a predicate
	    function removeAll(f, a) {
	        var l = a.length;
	        var b = new Array(l);
	        var j = 0;
	        for (var x, i = 0; i < l; ++i) {
	            x = a[i];
	            if (!f(x)) {
	                b[j] = x;
	                ++j;
	            }
	        }

	        b.length = j;
	        return b;
	    }

	    // findIndex :: a -> [a] -> Int
	    // find index of x in a, from the left
	    function findIndex(x, a) {
	        for (var i = 0, l = a.length; i < l; ++i) {
	            if (x === a[i]) {
	                return i;
	            }
	        }
	        return -1;
	    }

	    // isArrayLike :: * -> boolean
	    // Return true iff x is array-like
	    function isArrayLike(x) {
	        return x != null && typeof x.length === 'number' && typeof x !== 'function';
	    }

	    /** @license MIT License (c) copyright 2010-2016 original author or authors */

	    // id :: a -> a
	    var id = function id(x) {
	        return x;
	    };

	    // compose :: (b -> c) -> (a -> b) -> (a -> c)
	    var compose = function compose(f, g) {
	        return function (x) {
	            return f(g(x));
	        };
	    };

	    // apply :: (a -> b) -> a -> b
	    var apply = function apply(f, x) {
	        return f(x);
	    };

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
	    exports.isArrayLike = isArrayLike;
	    exports.id = id;
	    exports.compose = compose;
	    exports.apply = apply;
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var MulticastSource = __webpack_require__(16).MulticastSource;
	var DeferredSink = __webpack_require__(19);
	var tryEvent = __webpack_require__(21);

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
		this._unsubscribe = this._init(subscribe);
	}

	Subscription.prototype._init = function(subscribe) {
		var s = this;

		try {
			return subscribe(add, end, error);
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
	};

	Subscription.prototype._add = function(x) {
		if(!this.active) {
			return;
		}
		tryEvent.tryEvent(this.scheduler.now(), x, this.sink);
	};

	Subscription.prototype._end = function(x) {
		if(!this.active) {
			return;
		}
		this.active = false;
		tryEvent.tryEnd(this.scheduler.now(), x, this.sink);
	};

	Subscription.prototype._error = function(x) {
		this.active = false;
		this.sink.error(this.scheduler.now(), x);
	};

	Subscription.prototype.dispose = function() {
		this.active = false;
		if(typeof this._unsubscribe === 'function') {
			return this._unsubscribe.call(void 0);
		}
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defer = __webpack_require__(20);

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
/* 20 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

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
/* 21 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	exports.tryEvent = tryEvent;
	exports.tryEnd = tryEnd;

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var MulticastSource = __webpack_require__(16).MulticastSource;
	var EventTargetSource = __webpack_require__(23);
	var EventEmitterSource = __webpack_require__(24);

	exports.fromEvent = fromEvent;

	/**
	 * Create a stream from an EventTarget, such as a DOM Node, or EventEmitter.
	 * @param {String} event event type name, e.g. 'click'
	 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter
	 * @param {boolean?} useCapture for DOM events, whether to use
	 *  capturing--passed as 3rd parameter to addEventListener.
	 * @returns {Stream} stream containing all events of the specified type
	 * from the source.
	 */
	function fromEvent(event, source /*, useCapture = false */) {
		var s;

		if(typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
			var capture = arguments.length > 2 && !!arguments[2];
			s = new MulticastSource(new EventTargetSource(event, source, capture));
		} else if(typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
			s = new EventEmitterSource(event, source);
		} else {
			throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener');
		}

		return new Stream(s);
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var dispose = __webpack_require__(7);
	var tryEvent = __webpack_require__(21);

	module.exports = EventTargetSource;

	function EventTargetSource(event, source, capture) {
		this.event = event;
		this.source = source;
		this.capture = capture;
	}

	EventTargetSource.prototype.run = function(sink, scheduler) {
		function addEvent(e) {
			tryEvent.tryEvent(scheduler.now(), e, sink);
		}

		this.source.addEventListener(this.event, addEvent, this.capture);

		return dispose.create(disposeEventTarget,
			{ target: this, addEvent: addEvent });
	};

	function disposeEventTarget(info) {
		var target = info.target;
		target.source.removeEventListener(target.event, info.addEvent, target.capture);
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var DeferredSink = __webpack_require__(19);
	var dispose = __webpack_require__(7);
	var tryEvent = __webpack_require__(21);

	module.exports = EventEmitterSource;

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
		var dsink = new DeferredSink(sink);

		function addEventVariadic(a) {
			var l = arguments.length;
			if(l > 1) {
				var arr = new Array(l);
				for(var i=0; i<l; ++i) {
					arr[i] = arguments[i];
				}
				tryEvent.tryEvent(scheduler.now(), arr, dsink);
			} else {
				tryEvent.tryEvent(scheduler.now(), a, dsink);
			}
		}

		this.source.addListener(this.event, addEventVariadic);

		return dispose.create(disposeEventEmitter, { target: this, addEvent: addEventVariadic });
	};

	function disposeEventEmitter(info) {
		var target = info.target;
		target.source.removeListener(target.event, info.addEvent);
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var runSource = __webpack_require__(26);
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Observer = __webpack_require__(27);
	var dispose = __webpack_require__(7);
	var defaultScheduler = __webpack_require__(28);

	exports.withDefaultScheduler = withDefaultScheduler;
	exports.withScheduler = withScheduler;

	function withDefaultScheduler(f, source) {
		return withScheduler(f, source, defaultScheduler);
	}

	function withScheduler(f, source, scheduler) {
		return new Promise(function (resolve, reject) {
			runSource(f, source, scheduler, resolve, reject);
		});
	}

	function runSource(f, source, scheduler, resolve, reject) {
		var disposable = dispose.settable();
		var observer = new Observer(f, resolve, reject, disposable);

		disposable.setDisposable(source.run(observer, scheduler));
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = Observer;

	/**
	 * Sink that accepts functions to apply to each event, and to end, and error
	 * signals.
	 * @constructor
	 */
	function Observer(event, end, error, disposable) {
		this._event = event;
		this._end = end;
		this._error = error;
		this._disposable = disposable;
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
		disposeThen(this._end, this._error, this._disposable, x);
	};

	Observer.prototype.error = function(t, e) {
		this.active = false;
		disposeThen(this._error, this._error, this._disposable, e);
	};

	function disposeThen(end, error, disposable, x) {
		Promise.resolve(disposable.dispose()).then(function () {
			end(x);
		}, error);
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Scheduler = __webpack_require__(30);
	var setTimeoutTimer = __webpack_require__(31);
	var nodeTimer = __webpack_require__(32);

	var isNode = typeof process === 'object'
			&& typeof process.nextTick === 'function';

	module.exports = new Scheduler(isNode ? nodeTimer : setTimeoutTimer);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var base = __webpack_require__(2);

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

	function Scheduler(timer) {
		this.timer = timer;

		this._timer = null;
		this._nextArrival = 0;
		this._tasks = [];

		var self = this;
		this._runReadyTasksBound = function() {
			self._runReadyTasks(self.now());
		};
	}

	Scheduler.prototype.now = function() {
		return this.timer.now();
	};

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
		var i = binarySearch(task.time, this._tasks);

		if(i >= 0 && i < this._tasks.length) {
			var at = base.findIndex(task, this._tasks[i].events);
			if(at >= 0) {
				this._tasks[i].events.splice(at, 1);
				this._reschedule();
			}
		}
	};

	Scheduler.prototype.cancelAll = function(f) {
		for(var i=0; i<this._tasks.length; ++i) {
			removeAllFrom(f, this._tasks[i]);
		}
		this._reschedule();
	};

	function removeAllFrom(f, timeslot) {
		timeslot.events = base.removeAll(f, timeslot.events);
	}

	Scheduler.prototype._reschedule = function() {
		if(this._tasks.length === 0) {
			this._unschedule();
		} else {
			this._scheduleNextRun(this.now());
		}
	};

	Scheduler.prototype._unschedule = function() {
		this.timer.clearTimer(this._timer);
		this._timer = null;
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
		this._timer = this.timer.setTimer(this._runReadyTasksBound, delay);
	};


	Scheduler.prototype._runReadyTasks = function(now) {
		this._timer = null;

		this._tasks = this._findAndRunTasks(now);

		this._scheduleNextRun(this.now());
	};

	Scheduler.prototype._findAndRunTasks = function(now) {
		var tasks = this._tasks;
		var l = tasks.length;
		var i = 0;

		while(i < l && tasks[i].time <= now) {
			++i;
		}

		this._tasks = tasks.slice(i);

		// Run all ready tasks
		for (var j = 0; j < i; ++j) {
			this._tasks = runTasks(tasks[j], this._tasks);
		}
		return this._tasks;
	};

	function runTasks(timeslot, tasks) {
		var events = timeslot.events;
		for(var i=0; i<events.length; ++i) {
			var task = events[i];

			if(task.active) {
				runTask(task);

				// Reschedule periodic repeating tasks
				// Check active again, since a task may have canceled itself
				if(task.period >= 0) {
					task.time = task.time + task.period;
					insertByTime(task, tasks);
				}
			}
		}

		return tasks;
	}

	function insertByTime(task, timeslots) {
		var l = timeslots.length;

		if(l === 0) {
			timeslots.push(newTimeslot(task.time, [task]));
			return;
		}

		var i = binarySearch(task.time, timeslots);

		if(i >= l) {
			timeslots.push(newTimeslot(task.time, [task]));
		} else if(task.time === timeslots[i].time) {
			timeslots[i].events.push(task);
		} else {
			timeslots.splice(i, 0, newTimeslot(task.time, [task]));
		}
	}

	function binarySearch(t, sortedArray) {
		var lo = 0;
		var hi = sortedArray.length;
		var mid, y;

		while (lo < hi) {
			mid = Math.floor((lo + hi) / 2);
			y = sortedArray[mid];

			if (t === y.time) {
				return mid;
			} else if (t < y.time) {
				hi = mid;
			} else {
				lo = mid + 1;
			}
		}
		return hi;
	}

	function newTimeslot(t, events) {
		return { time: t, events: events };
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/*global setTimeout, clearTimeout*/

	module.exports = {
		now: Date.now,
		setTimer: function(f, dt) {
			return setTimeout(f, dt);
		},
		clearTimer: function(t) {
			return clearTimeout(t);
		}
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var defer = __webpack_require__(20);

	/*global setTimeout, clearTimeout*/

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

	module.exports = {
		now: Date.now,
		setTimer: function(f, dt) {
			return dt <= 0 ? runAsTask(f) : setTimeout(f, dt);
		},
		clearTimer: function(t) {
			return t instanceof Task ? t.cancel() : clearTimeout(t);
		}
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(34);

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
/* 34 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(34);
	var runSource = __webpack_require__(26);
	var cons = __webpack_require__(36).cons;
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
		return cons(initial, new Stream(new Accumulate(ScanSink, f, initial, stream.source)));
	}

	function ScanSink(f, z, sink) {
		this.f = f;
		this.value = z;
		this.sink = sink;
	}

	ScanSink.prototype.event = function(t, x) {
		var f = this.f;
		this.value = f(this.value, x);
		this.sink.event(t, this.value);
	};

	ScanSink.prototype.error = Pipe.prototype.error;
	ScanSink.prototype.end = Pipe.prototype.end;

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
		return runSource.withDefaultScheduler(noop, new Accumulate(AccumulateSink, f, initial, stream.source));
	}

	function Accumulate(SinkType, f, z, source) {
		this.SinkType = SinkType;
		this.f = f;
		this.value = z;
		this.source = source;
	}

	Accumulate.prototype.run = function(sink, scheduler) {
		return this.source.run(new this.SinkType(this.f, this.value, sink), scheduler);
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var streamOf = __webpack_require__(3).of;
	var continueWith = __webpack_require__(37).continueWith;

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
		return continueWith(function() {
			return right;
		}, left);
	}

	/**
	 * @deprecated
	 * Tie stream into a circle, creating an infinite stream
	 * @param {Stream} stream
	 * @returns {Stream} new infinite stream
	 */
	function cycle(stream) {
		return continueWith(function cycleNext() {
			return cycle(stream);
		}, stream);
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(34);
	var dispose = __webpack_require__(7);
	var isPromise = __webpack_require__(10).isPromise;

	exports.continueWith = continueWith;

	function continueWith(f, stream) {
		return new Stream(new ContinueWith(f, stream.source));
	}

	function ContinueWith(f, source) {
		this.f = f;
		this.source = source;
	}

	ContinueWith.prototype.run = function(sink, scheduler) {
		return new ContinueWithSink(this.f, this.source, sink, scheduler);
	};

	function ContinueWithSink(f, source, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
		this.disposable = dispose.once(source.run(this, scheduler));
	}

	ContinueWithSink.prototype.error = Sink.prototype.error;

	ContinueWithSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}
		this.sink.event(t, x);
	};

	ContinueWithSink.prototype.end = function(t, x) {
		if(!this.active) {
			return;
		}

		var result = dispose.tryDispose(t, this.disposable, this.sink);
		this.disposable = isPromise(result)
			? dispose.promised(this._thenContinue(result, x))
			: this._continue(this.f, x);
	};

	ContinueWithSink.prototype._thenContinue = function(p, x) {
		var self = this;
		return p.then(function () {
			return self._continue(self.f, x);
		});
	};

	ContinueWithSink.prototype._continue = function(f, x) {
		return f(x).source.run(this.sink, this.scheduler);
	};

	ContinueWithSink.prototype.dispose = function() {
		this.active = false;
		return this.disposable.dispose();
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);

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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);

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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Map = __webpack_require__(42);

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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(34);
	var Filter = __webpack_require__(43);
	var FilterMap = __webpack_require__(44);
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(34);

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Pipe = __webpack_require__(34);

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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var combine = __webpack_require__(46).combine;
	var apply = __webpack_require__(2).apply;

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


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var transform = __webpack_require__(41);
	var core = __webpack_require__(3);
	var Pipe = __webpack_require__(34);
	var IndexSink = __webpack_require__(47);
	var dispose = __webpack_require__(7);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(48);

	var hasValue = IndexSink.hasValue;

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
		return combineArray(f, tail(arguments));
	}

	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @param {[Stream]} streams most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	function combineArray(f, streams) {
		var l = streams.length;
		return l === 0 ? core.empty()
			 : l === 1 ? transform.map(f, streams[0])
			 : new Stream(combineSources(f, streams));
	}

	function combineSources(f, streams) {
		return new Combine(f, map(getSource, streams))
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

		var mergeSink = new CombineSink(disposables, sinks, sink, this.f);

		for(var indexSink, i=0; i<l; ++i) {
			indexSink = sinks[i] = new IndexSink(i, mergeSink);
			disposables[i] = this.sources[i].run(indexSink, scheduler);
		}

		return dispose.all(disposables);
	};

	function CombineSink(disposables, sinks, sink, f) {
		this.sink = sink;
		this.disposables = disposables;
		this.sinks = sinks;
		this.f = f;
		this.values = new Array(sinks.length);
		this.ready = false;
		this.activeCount = sinks.length;
	}

	CombineSink.prototype.error = Pipe.prototype.error;

	CombineSink.prototype.event = function(t, indexedValue) {
		if(!this.ready) {
			this.ready = this.sinks.every(hasValue);
		}

		this.values[indexedValue.index] = indexedValue.value;
		if(this.ready) {
			this.sink.event(t, invoke(this.f, this.values));
		}
	};

	CombineSink.prototype.end = function(t, indexedValue) {
		dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
		if(--this.activeCount === 0) {
			this.sink.end(t, indexedValue.value);
		}
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Sink = __webpack_require__(34);

	module.exports = IndexSink;

	IndexSink.hasValue = hasValue;

	function hasValue(indexSink) {
		return indexSink.hasValue;
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
/* 48 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	module.exports = invoke;

	function invoke(f, args) {
		/*eslint complexity: [2,7]*/
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var mergeConcurrently = __webpack_require__(51).mergeConcurrently;
	var map = __webpack_require__(41).map;

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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var dispose = __webpack_require__(7);
	var LinkedList = __webpack_require__(52);

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
		this.disposable = dispose.once(source.run(this, scheduler));
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
		dispose.tryDispose(t, this.disposable, this.sink);
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
		dispose.tryDispose(t, inner, this);

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

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var mergeConcurrently = __webpack_require__(51).mergeConcurrently;
	var map = __webpack_require__(41).map;

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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(34);
	var IndexSink = __webpack_require__(47);
	var empty = __webpack_require__(3).empty;
	var dispose = __webpack_require__(7);
	var base = __webpack_require__(2);

	var copy = base.copy;
	var reduce = base.reduce;

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
			 : new Stream(mergeSources(streams));
	}

	/**
	 * This implements fusion/flattening for merge.  It will
	 * fuse adjacent merge operations.  For example:
	 * - a.merge(b).merge(c) effectively becomes merge(a, b, c)
	 * - merge(a, merge(b, c)) effectively becomes merge(a, b, c)
	 * It does this by concatenating the sources arrays of
	 * any nested Merge sources, in effect "flattening" nested
	 * merge operations into a single merge.
	 */
	function mergeSources(streams) {
		return new Merge(reduce(appendSources, [], streams))
	}

	function appendSources(sources, stream) {
		var source = stream.source;
		return source instanceof Merge
			? sources.concat(source.sources)
			: sources.concat(source)
	}

	function Merge(sources) {
		this.sources = sources;
	}

	Merge.prototype.run = function(sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);

		var mergeSink = new MergeSink(disposables, sinks, sink);

		for(var indexSink, i=0; i<l; ++i) {
			indexSink = sinks[i] = new IndexSink(i, mergeSink);
			disposables[i] = this.sources[i].run(indexSink, scheduler);
		}

		return dispose.all(disposables);
	};

	function MergeSink(disposables, sinks, sink) {
		this.sink = sink;
		this.disposables = disposables;
		this.activeCount = sinks.length;
	}

	MergeSink.prototype.error = Pipe.prototype.error;

	MergeSink.prototype.event = function(t, indexValue) {
		this.sink.event(t, indexValue.value);
	};

	MergeSink.prototype.end = function(t, indexedValue) {
		dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
		if(--this.activeCount === 0) {
			this.sink.end(t, indexedValue.value);
		}
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(34);
	var dispose = __webpack_require__(7);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(48);

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

		return dispose.all(disposables);
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var transform = __webpack_require__(41);
	var core = __webpack_require__(3);
	var Sink = __webpack_require__(34);
	var IndexSink = __webpack_require__(47);
	var dispose = __webpack_require__(7);
	var base = __webpack_require__(2);
	var invoke = __webpack_require__(48);
	var Queue = __webpack_require__(57);

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

		return dispose.all(disposables);
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
/* 57 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var MulticastSource = __webpack_require__(16).MulticastSource;
	var until = __webpack_require__(59).takeUntil;
	var mergeConcurrently = __webpack_require__(51).mergeConcurrently;
	var map = __webpack_require__(41).map;

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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Pipe = __webpack_require__(34);
	var dispose = __webpack_require__(7);
	var join = __webpack_require__(50).join;
	var noop = __webpack_require__(2).noop;

	exports.during    = during;
	exports.takeUntil = takeUntil;
	exports.skipUntil = skipUntil;

	function takeUntil(signal, stream) {
		return new Stream(new Until(signal.source, stream.source));
	}

	function skipUntil(signal, stream) {
		return new Stream(new Since(signal.source, stream.source));
	}

	function during(timeWindow, stream) {
		return takeUntil(join(timeWindow), skipUntil(timeWindow, stream));
	}

	function Until(maxSignal, source) {
		this.maxSignal = maxSignal;
		this.source = source;
	}

	Until.prototype.run = function(sink, scheduler) {
		var min = new Bound(-Infinity, sink);
		var max = new UpperBound(this.maxSignal, sink, scheduler);
		var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

		return dispose.all([min, max, disposable]);
	};

	function Since(minSignal, source) {
		this.minSignal = minSignal;
		this.source = source;
	}

	Since.prototype.run = function(sink, scheduler) {
		var min = new LowerBound(this.minSignal, sink, scheduler);
		var max = new Bound(Infinity, sink);
		var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);

		return dispose.all([min, max, disposable]);
	};

	function Bound(value, sink) {
		this.value = value;
		this.sink = sink;
	}

	Bound.prototype.error = Pipe.prototype.error;
	Bound.prototype.event = noop;
	Bound.prototype.end = noop;
	Bound.prototype.dispose = noop;

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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(34);
	var Filter = __webpack_require__(43);

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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(34);
	var core = __webpack_require__(3);
	var dispose = __webpack_require__(7);

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
		this.disposable = dispose.once(source.run(this, scheduler));
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
		this.disposable = dispose.once(source.run(this, scheduler));
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(34);
	var dispose = __webpack_require__(7);
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
		return dispose.all([delaySink, this.source.run(delaySink, scheduler)]);
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(34);

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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var Sink = __webpack_require__(34);
	var dispose = __webpack_require__(7);
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

	ThrottleSink.prototype.end   = Sink.prototype.end;

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
		this.disposable = dispose.all([this, sourceDisposable]);
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var fatal = __webpack_require__(6);
	var just = __webpack_require__(3).of;

	exports.fromPromise = fromPromise;
	exports.awaitPromises = awaitPromises;

	/**
	 * Create a stream containing only the promise's fulfillment
	 * value at the time it fulfills.
	 * @param {Promise<T>} p promise
	 * @return {Stream<T>} stream containing promise's fulfillment value.
	 *  If the promise rejects, the stream will error
	 */
	function fromPromise(p) {
		return awaitPromises(just(p));
	}

	/**
	 * Turn a Stream<Promise<T>> into Stream<T> by awaiting each promise.
	 * Event order is preserved.
	 * @param {Stream<Promise<T>>} stream
	 * @return {Stream<T>} stream of fulfillment values.  The stream will
	 * error if any promise rejects.
	 */
	function awaitPromises(stream) {
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
		this.queue = Promise.resolve();
		var self = this;

		// Pre-create closures, to avoid creating them per event
		this._eventBound = function(x) {
			self.sink.event(self.scheduler.now(), x);
		};

		this._endBound = function(x) {
			self.sink.end(self.scheduler.now(), x);
		};

		this._errorBound = function(e) {
			self.sink.error(self.scheduler.now(), e);
		};
	}

	AwaitSink.prototype.event = function(t, promise) {
		var self = this;
		this.queue = this.queue.then(function() {
			return self._event(promise);
		}).catch(this._errorBound);
	};

	AwaitSink.prototype.end = function(t, x) {
		var self = this;
		this.queue = this.queue.then(function() {
			return self._end(x);
		}).catch(this._errorBound);
	};

	AwaitSink.prototype.error = function(t, e) {
		var self = this;
		// Don't resolve error values, propagate directly
		this.queue = this.queue.then(function() {
			return self._errorBound(e);
		}).catch(fatal);
	};

	AwaitSink.prototype._event = function(promise) {
		return promise.then(this._eventBound);
	};

	AwaitSink.prototype._end = function(x) {
		return Promise.resolve(x).then(this._endBound);
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	var Stream = __webpack_require__(1);
	var ValueSource = __webpack_require__(4);
	var tryDispose = __webpack_require__(7).tryDispose;
	var tryEvent = __webpack_require__(21);
	var apply = __webpack_require__(2).apply;

	exports.flatMapError = recoverWith;
	exports.recoverWith  = recoverWith;
	exports.throwError   = throwError;

	/**
	 * If stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	function recoverWith(f, stream) {
		return new Stream(new RecoverWith(f, stream.source));
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

	function RecoverWith(f, source) {
		this.f = f;
		this.source = source;
	}

	RecoverWith.prototype.run = function(sink, scheduler) {
		return new RecoverWithSink(this.f, this.source, sink, scheduler);
	};

	function RecoverWithSink(f, source, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
		this.disposable = source.run(this, scheduler);
	}

	RecoverWithSink.prototype.error = function(t, e) {
		if(!this.active) {
			return;
		}

		// TODO: forward dispose errors
		tryDispose(t, this.disposable, this);

		var stream = apply(this.f, e);
		this.disposable = stream.source.run(this.sink, this.scheduler);
	};

	RecoverWithSink.prototype.event = function(t, x) {
		if(!this.active) {
			return;
		}
		tryEvent.tryEvent(t, x, this.sink);
	};

	RecoverWithSink.prototype.end = function(t, x) {
		if(!this.active) {
			return;
		}
		tryEvent.tryEnd(t, x, this.sink);
	};

	RecoverWithSink.prototype.dispose = function() {
		this.active = false;
		return this.disposable.dispose();
	};


/***/ }
/******/ ])
});
;