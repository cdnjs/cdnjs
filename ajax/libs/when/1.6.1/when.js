/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * A lightweight CommonJS Promises/A and when() implementation
 * when is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 1.6.1
 */

(function(define) { 'use strict';
define(['module'], function () {
	var reduceArray, slice, undef;

	//
	// Public API
	//

	when.defer     = defer;     // Create a deferred
	when.resolve   = resolve;   // Create a resolved promise
	when.reject    = reject;    // Create a rejected promise

	when.join      = join;      // Join 2 or more promises

	when.all       = all;       // Resolve a list of promises
	when.some      = some;      // Resolve a sub-set of promises
	when.any       = any;       // Resolve one promise in a list

	when.map       = map;       // Array.map() for promises
	when.reduce    = reduce;    // Array.reduce() for promises

	when.chain     = chain;     // Make a promise trigger another resolver

	when.isPromise = isPromise; // Determine if a thing is a promise

	/**
	 * Register an observer for a promise or immediate value.
	 * @function
	 * @name when
	 * @namespace
	 *
	 * @param promiseOrValue {*}
	 * @param {Function} [callback] callback to be called when promiseOrValue is
	 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	 *   will be invoked immediately.
	 * @param {Function} [errback] callback to be called when promiseOrValue is
	 *   rejected.
	 * @param {Function} [progressHandler] callback to be called when progress updates
	 *   are issued for promiseOrValue.
	 * @returns {Promise} a new {@link Promise} that will complete with the return
	 *   value of callback or errback or the completion value of promiseOrValue if
	 *   callback and/or errback is not supplied.
	 */
	function when(promiseOrValue, callback, errback, progressHandler) {
		// Get a trusted promise for the input promiseOrValue, and then
		// register promise handlers
		return resolve(promiseOrValue).then(callback, errback, progressHandler);
	}

	/**
	 * Returns promiseOrValue if promiseOrValue is a {@link Promise}, a new Promise if
	 * promiseOrValue is a foreign promise, or a new, already-fulfilled {@link Promise}
	 * whose value is promiseOrValue if promiseOrValue is an immediate value.
	 * @memberOf when
	 *
	 * @param promiseOrValue {*}
	 * @returns Guaranteed to return a trusted Promise.  If promiseOrValue is a when.js {@link Promise}
	 *   returns promiseOrValue, otherwise, returns a new, already-resolved, when.js {@link Promise}
	 *   whose resolution value is:
	 *   * the resolution value of promiseOrValue if it's a foreign promise, or
	 *   * promiseOrValue if it's a value
	 */
	function resolve(promiseOrValue) {
		var promise, deferred;

		if(promiseOrValue instanceof Promise) {
			// It's a when.js promise, so we trust it
			promise = promiseOrValue;

		} else {
			// It's not a when.js promise. See if it's a foreign promise or a value.

			// Some promises, particularly Q promises, provide a valueOf method that
			// attempts to synchronously return the fulfilled value of the promise, or
			// returns the unresolved promise itself.  Attempting to break a fulfillment
			// value out of a promise appears to be necessary to break cycles between
			// Q and When attempting to coerce each-other's promises in an infinite loop.
			// For promises that do not implement "valueOf", the Object#valueOf is harmless.
			// See: https://github.com/kriskowal/q/issues/106
			// IMPORTANT: Must check for a promise here, since valueOf breaks other things
			// like Date.
			if (isPromise(promiseOrValue) && typeof promiseOrValue.valueOf === 'function') {
				promiseOrValue = promiseOrValue.valueOf();
			}

			if(isPromise(promiseOrValue)) {
				// It looks like a thenable, but we don't know where it came from,
				// so we don't trust its implementation entirely.  Introduce a trusted
				// middleman when.js promise
				deferred = defer();

				// IMPORTANT: This is the only place when.js should ever call .then() on
				// an untrusted promise.
				promiseOrValue.then(deferred.resolve, deferred.reject, deferred.progress);
				promise = deferred.promise;

			} else {
				// It's a value, not a promise.  Create a resolved promise for it.
				promise = fulfilled(promiseOrValue);
			}
		}

		return promise;
	}

	/**
	 * Returns a rejected promise for the supplied promiseOrValue. If
	 * promiseOrValue is a value, it will be the rejection value of the
	 * returned promise.  If promiseOrValue is a promise, its
	 * completion value will be the rejected value of the returned promise
	 * @memberOf when
	 *
	 * @param promiseOrValue {*} the rejected value of the returned {@link Promise}
	 * @return {Promise} rejected {@link Promise}
	 */
	function reject(promiseOrValue) {
		return when(promiseOrValue, function(value) {
			return rejected(value);
		});
	}

	/**
	 * Trusted Promise constructor.  A Promise created from this constructor is
	 * a trusted when.js promise.  Any other duck-typed promise is considered
	 * untrusted.
	 * @constructor
	 * @name Promise
	 */
	function Promise(then) {
		this.then = then;
	}

	Promise.prototype = {
		/**
		 * Register a callback that will be called when a promise is
		 * resolved or rejected.  Optionally also register a progress handler.
		 * Shortcut for .then(alwaysback, alwaysback, progback)
		 * @memberOf Promise
		 * @param alwaysback {Function}
		 * @param progback {Function}
		 * @return {Promise}
		 */
		always: function(alwaysback, progback) {
			return this.then(alwaysback, alwaysback, progback);
		},

		/**
		 * Register a rejection handler.  Shortcut for .then(null, errback)
		 * @memberOf Promise
		 * @param errback {Function}
		 * @return {Promise}
		 */
		otherwise: function(errback) {
			return this.then(undef, errback);
		}
	};

	/**
	 * Create an already-resolved promise for the supplied value
	 * @private
	 *
	 * @param value anything
	 * @return {Promise}
	 */
	function fulfilled(value) {
		var p = new Promise(function(callback) {
			try {
				return resolve(callback ? callback(value) : value);
			} catch(e) {
				return rejected(e);
			}
		});

		return p;
	}

	/**
	 * Create an already-rejected {@link Promise} with the supplied
	 * rejection reason.
	 * @private
	 *
	 * @param reason rejection reason
	 * @return {Promise}
	 */
	function rejected(reason) {
		var p = new Promise(function(callback, errback) {
			try {
				return errback ? resolve(errback(reason)) : rejected(reason);
			} catch(e) {
				return rejected(e);
			}
		});

		return p;
	}

	/**
	 * Creates a new, Deferred with fully isolated resolver and promise parts,
	 * either or both of which may be given out safely to consumers.
	 * The Deferred itself has the full API: resolve, reject, progress, and
	 * then. The resolver has resolve, reject, and progress.  The promise
	 * only has then.
	 * @memberOf when
	 * @function
	 *
	 * @return {Deferred}
	 */
	function defer() {
		var deferred, promise, handlers, progressHandlers,
			_then, _progress, _resolve;

		/**
		 * The promise for the new deferred
		 * @type {Promise}
		 */
		promise = new Promise(then);

		/**
		 * The full Deferred object, with {@link Promise} and {@link Resolver} parts
		 * @class Deferred
		 * @name Deferred
		 */
		deferred = {
			then:     then,
			resolve:  promiseResolve,
			reject:   promiseReject,
			// TODO: Consider renaming progress() to notify()
			progress: promiseProgress,

			promise:  promise,

			resolver: {
				resolve:  promiseResolve,
				reject:   promiseReject,
				progress: promiseProgress
			}
		};

		handlers = [];
		progressHandlers = [];

		/**
		 * Pre-resolution then() that adds the supplied callback, errback, and progback
		 * functions to the registered listeners
		 * @private
		 *
		 * @param [callback] {Function} resolution handler
		 * @param [errback] {Function} rejection handler
		 * @param [progback] {Function} progress handler
		 * @throws {Error} if any argument is not null, undefined, or a Function
		 */
		_then = function(callback, errback, progback) {
			var deferred, progressHandler;

			deferred = defer();
			progressHandler = progback
				? function(update) {
					try {
						// Allow progress handler to transform progress event
						deferred.progress(progback(update));
					} catch(e) {
						// Use caught value as progress
						deferred.progress(e);
					}
				}
				: deferred.progress;

			handlers.push(function(promise) {
				promise.then(callback, errback)
					.then(deferred.resolve, deferred.reject, progressHandler);
			});

			progressHandlers.push(progressHandler);

			return deferred.promise;
		};

		/**
		 * Issue a progress event, notifying all progress listeners
		 * @private
		 * @param update {*} progress event payload to pass to all listeners
		 */
		_progress = function(update) {
			processQueue(progressHandlers, update);
			return update;
		};

		/**
		 * Transition from pre-resolution state to post-resolution state, notifying
		 * all listeners of the resolution or rejection
		 * @private
		 * @param completed {Promise} the completed value of this deferred
		 */
		_resolve = function(completed) {
			completed = resolve(completed);

			// Replace _then with one that directly notifies with the result.
			_then = completed.then;
			// Replace _resolve so that this Deferred can only be completed once
			_resolve = resolve;
			// Make _progress a noop, to disallow progress for the resolved promise.
			_progress = noop;

			// Notify handlers
			processQueue(handlers, completed);

			// Free progressHandlers array since we'll never issue progress events
			progressHandlers = handlers = undef;

			return completed;
		};

		return deferred;

		/**
		 * Wrapper to allow _then to be replaced safely
		 * @param [callback] {Function} resolution handler
		 * @param [errback] {Function} rejection handler
		 * @param [progback] {Function} progress handler
		 * @return {Promise} new Promise
		 * @throws {Error} if any argument is not null, undefined, or a Function
		 */
		function then(callback, errback, progback) {
			return _then(callback, errback, progback);
		}

		/**
		 * Wrapper to allow _resolve to be replaced
		 */
		function promiseResolve(val) {
			return _resolve(val);
		}

		/**
		 * Wrapper to allow _resolve to be replaced
		 */
		function promiseReject(err) {
			return _resolve(rejected(err));
		}

		/**
		 * Wrapper to allow _progress to be replaced
		 * @param {*} update progress update
		 */
		function promiseProgress(update) {
			return _progress(update);
		}
	}

	/**
	 * Determines if promiseOrValue is a promise or not.  Uses the feature
	 * test from http://wiki.commonjs.org/wiki/Promises/A to determine if
	 * promiseOrValue is a promise.
	 *
	 * @param {*} promiseOrValue anything
	 * @returns {Boolean} true if promiseOrValue is a {@link Promise}
	 */
	function isPromise(promiseOrValue) {
		return promiseOrValue && typeof promiseOrValue.then === 'function';
	}

	/**
	 * Initiates a competitive race, returning a promise that will resolve when
	 * howMany of the supplied promisesOrValues have resolved, or will reject when
	 * it becomes impossible for howMany to resolve, for example, when
	 * (promisesOrValues.length - howMany) + 1 input promises reject.
	 * @memberOf when
	 *
	 * @param promisesOrValues {Array} array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param howMany {Number} number of promisesOrValues to resolve
	 * @param [callback] {Function} resolution handler
	 * @param [errback] {Function} rejection handler
	 * @param [progback] {Function} progress handler
	 * @returns {Promise} promise that will resolve to an array of howMany values that
	 * resolved first, or will reject with an array of (promisesOrValues.length - howMany) + 1
	 * rejection reasons.
	 */
	function some(promisesOrValues, howMany, callback, errback, progback) {

		checkCallbacks(2, arguments);

		return when(promisesOrValues, function(promisesOrValues) {

			var toResolve, toReject, values, reasons, deferred, fulfillOne, rejectOne, progress, len, i;

			len = promisesOrValues.length >>> 0;

			toResolve = Math.max(0, Math.min(howMany, len));
			values = [];

			toReject = (len - toResolve) + 1;
			reasons = [];

			deferred = defer();

			// No items in the input, resolve immediately
			if (!toResolve) {
				deferred.resolve(values);

			} else {
				progress = deferred.progress;

				rejectOne = function(reason) {
					reasons.push(reason);
					if(!--toReject) {
						fulfillOne = rejectOne = noop;
						deferred.reject(reasons);
					}
				};

				fulfillOne = function(val) {
					// This orders the values based on promise resolution order
					// Another strategy would be to use the original position of
					// the corresponding promise.
					values.push(val);

					if (!--toResolve) {
						fulfillOne = rejectOne = noop;
						deferred.resolve(values);
					}
				};

				for(i = 0; i < len; ++i) {
					if(i in promisesOrValues) {
						when(promisesOrValues[i], fulfiller, rejecter, progress);
					}
				}
			}

			return deferred.then(callback, errback, progback);

			function rejecter(reason) {
				rejectOne(reason);
			}

			function fulfiller(val) {
				fulfillOne(val);
			}

		});
	}

	/**
	 * Initiates a competitive race, returning a promise that will resolve when
	 * any one of the supplied promisesOrValues has resolved or will reject when
	 * *all* promisesOrValues have rejected.
	 * @memberOf when
	 *
	 * @param promisesOrValues {Array|Promise} array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param [callback] {Function} resolution handler
	 * @param [errback] {Function} rejection handler
	 * @param [progback] {Function} progress handler
	 * @returns {Promise} promise that will resolve to the value that resolved first, or
	 * will reject with an array of all rejected inputs.
	 */
	function any(promisesOrValues, callback, errback, progback) {

		function unwrapSingleResult(val) {
			return callback ? callback(val[0]) : val[0];
		}

		return some(promisesOrValues, 1, unwrapSingleResult, errback, progback);
	}

	/**
	 * Return a promise that will resolve only once all the supplied promisesOrValues
	 * have resolved. The resolution value of the returned promise will be an array
	 * containing the resolution values of each of the promisesOrValues.
	 * @memberOf when
	 *
	 * @param promisesOrValues {Array|Promise} array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param [callback] {Function}
	 * @param [errback] {Function}
	 * @param [progressHandler] {Function}
	 * @returns {Promise}
	 */
	function all(promisesOrValues, callback, errback, progressHandler) {
		checkCallbacks(1, arguments);
		return map(promisesOrValues, identity).then(callback, errback, progressHandler);
	}

	/**
	 * Joins multiple promises into a single returned promise.
	 * @memberOf when
	 * @param  {Promise|*} [...promises] two or more promises to join
	 * @return {Promise} a promise that will fulfill when *all* the input promises
	 * have fulfilled, or will reject when *any one* of the input promises rejects.
	 */
	function join(/* ...promises */) {
		return map(arguments, identity);
	}

	/**
	 * Traditional map function, similar to `Array.prototype.map()`, but allows
	 * input to contain {@link Promise}s and/or values, and mapFunc may return
	 * either a value or a {@link Promise}
	 *
	 * @memberOf when
	 *
	 * @param promise {Array|Promise} array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param mapFunc {Function} mapping function mapFunc(value) which may return
	 *      either a {@link Promise} or value
	 * @returns {Promise} a {@link Promise} that will resolve to an array containing
	 *      the mapped output values.
	 */
	function map(promise, mapFunc) {
		return when(promise, function(array) {
			var results, len, toResolve, resolve, reject, i, d;

			// Since we know the resulting length, we can preallocate the results
			// array to avoid array expansions.
			toResolve = len = array.length >>> 0;
			results = [];
			d = defer();

			if(!toResolve) {
				d.resolve(results);
			} else {

				reject = d.reject;
				resolve = function resolveOne(item, i) {
					when(item, mapFunc).then(function(mapped) {
						results[i] = mapped;

						if(!--toResolve) {
							d.resolve(results);
						}
					}, reject);
				};

				// Since mapFunc may be async, get all invocations of it into flight
				for(i = 0; i < len; i++) {
					if(i in array) {
						resolve(array[i], i);
					} else {
						--toResolve;
					}
				}

			}

			return d.promise;

		});
	}

	/**
	 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
	 * input may contain {@link Promise}s and/or values, and reduceFunc
	 * may return either a value or a {@link Promise}, *and* initialValue may
	 * be a {@link Promise} for the starting value.
	 * @memberOf when
	 *
	 * @param promise {Array|Promise} array of anything, may contain a mix
	 *      of {@link Promise}s and values.  May also be a {@link Promise} for
	 *      an array.
	 * @param reduceFunc {Function} reduce function reduce(currentValue, nextValue, index, total),
	 *      where total is the total number of items being reduced, and will be the same
	 *      in each call to reduceFunc.
	 * @param [initialValue] {*} starting value, or a {@link Promise} for the starting value
	 * @returns {Promise} that will resolve to the final reduced value
	 */
	function reduce(promise, reduceFunc /*, initialValue */) {
		var args = slice.call(arguments, 1);

		return when(promise, function(array) {
			var total;

			total = array.length;

			// Wrap the supplied reduceFunc with one that handles promises and then
			// delegates to the supplied.
			args[0] = function (current, val, i) {
				return when(current, function (c) {
					return when(val, function (value) {
						return reduceFunc(c, value, i, total);
					});
				});
			};

			return reduceArray.apply(array, args);
		});
	}

	/**
	 * Ensure that resolution of promiseOrValue will complete resolver with the completion
	 * value of promiseOrValue, or instead with resolveValue if it is provided.
	 * @memberOf when
	 *
	 * @param promiseOrValue
	 * @param resolver {Resolver}
	 * @param [resolveValue] anything
	 * @returns {Promise}
	 */
	function chain(promiseOrValue, resolver, resolveValue) {
		var useResolveValue = arguments.length > 2;

		return when(promiseOrValue,
			function(val) {
				return resolver.resolve(useResolveValue ? resolveValue : val);
			},
			resolver.reject,
			resolver.progress
		);
	}

	//
	// Utility functions
	//

	function processQueue(queue, value) {
		var handler, i = 0;

		while (handler = queue[i++]) {
			handler(value);
		}
	}

	/**
	 * Helper that checks arrayOfCallbacks to ensure that each element is either
	 * a function, or null or undefined.
	 * @private
	 *
	 * @param arrayOfCallbacks {Array} array to check
	 * @throws {Error} if any element of arrayOfCallbacks is something other than
	 * a Functions, null, or undefined.
	 */
	function checkCallbacks(start, arrayOfCallbacks) {
		var arg, i = arrayOfCallbacks.length;

		while(i > start) {
			arg = arrayOfCallbacks[--i];

			if (arg != null && typeof arg != 'function') {
				throw new Error('arg '+i+' must be a function');
			}
		}
	}

	/**
	 * No-Op function used in method replacement
	 * @private
	 */
	function noop() {}

	slice = [].slice;

	// ES5 reduce implementation if native not available
	// See: http://es5.github.com/#x15.4.4.21 as there are many
	// specifics and edge cases.
	reduceArray = [].reduce ||
		function(reduceFunc /*, initialValue */) {
			/*jshint maxcomplexity: 7*/

			// ES5 dictates that reduce.length === 1

			// This implementation deviates from ES5 spec in the following ways:
			// 1. It does not check if reduceFunc is a Callable

			var arr, args, reduced, len, i;

			i = 0;
			// This generates a jshint warning, despite being valid
			// "Missing 'new' prefix when invoking a constructor."
			// See https://github.com/jshint/jshint/issues/392
			arr = Object(this);
			len = arr.length >>> 0;
			args = arguments;

			// If no initialValue, use first item of array (we know length !== 0 here)
			// and adjust i to start at second item
			if(args.length <= 1) {
				// Skip to the first real element in the array
				for(;;) {
					if(i in arr) {
						reduced = arr[i++];
						break;
					}

					// If we reached the end of the array without finding any real
					// elements, it's a TypeError
					if(++i >= len) {
						throw new TypeError();
					}
				}
			} else {
				// If initialValue provided, use it
				reduced = args[1];
			}

			// Do the actual reduce
			for(;i < len; ++i) {
				// Skip holes
				if(i in arr) {
					reduced = reduceFunc(reduced, arr[i], i, arr);
				}
			}

			return reduced;
		};

	function identity(x) {
		return x;
	}

	return when;
});
})(typeof define == 'function' && define.amd
	? define
	: function (deps, factory) { typeof exports === 'object'
		? (module.exports = factory())
		: (this.when      = factory());
	}
	// Boilerplate for AMD, Node, and browser global
);
