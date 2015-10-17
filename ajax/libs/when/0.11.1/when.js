/** @license MIT License, Copyright (c) 2011-2012 Brian Cavalier */

/**
 * when.js
 * A lightweight CommonJS Promises/A and when() implementation
 *
 * LICENSE: see the LICENSE.txt file. If file is missing, this file is subject
 * to the MIT License at: http://www.opensource.org/licenses/mit-license.php.
 *
 * @version 0.11.1
 * @author brian@hovercraftstudios.com
 */

(function(define) {
define(function() {
    var freeze, reduceArray, undef;

    /**
     * No-Op function used in method replacement
     * @private
     */
    function noop() {}

    /**
     * Allocate a new Array of size n
     * @private
     * @param n {number} size of new Array
     * @returns {Array}
     */
    function allocateArray(n) {
        return new Array(n);
    }
    
    /**
     * Use freeze if it exists
     * @function
     * @private
     */
    freeze = Object.freeze || function(o) { return o; };

    // ES5 reduce implementation if native not available
    // See: http://es5.github.com/#x15.4.4.21 as there are many
    // specifics and edge cases.
    reduceArray = [].reduce ||
        function(reduceFunc /*, initialValue */) {
            // ES5 dictates that reduce.length === 1

            // This implementation deviates from ES5 spec in the following ways:
            // 1. It does not check if reduceFunc is a Callable

            var arr, args, reduced, len, i;

            i = 0;
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
                if(i in arr)
                    reduced = reduceFunc(reduced, arr[i], i, arr);
            }

            return reduced;
        };

    /**
     * Trusted Promise constructor.  A Promise created from this constructor is
     * a trusted when.js promise.  Any other duck-typed promise is considered
     * untrusted.
     */
    function Promise() {}

    /**
     * Creates a new, CommonJS compliant, Deferred with fully isolated
     * resolver and promise parts, either or both of which may be given out
     * safely to consumers.
     * The Deferred itself has the full API: resolve, reject, progress, and
     * then. The resolver has resolve, reject, and progress.  The promise
     * only has then.
     *
     * @memberOf when
     * @function
     *
     * @returns {Deferred}
     */
    function defer() {
        var deferred, promise, resolver, result, listeners, progressHandlers, _then, _progress, complete;

        listeners = [];
        progressHandlers = [];

        /**
         * Pre-resolution then() that adds the supplied callback, errback, and progback
         * functions to the registered listeners
         *
         * @private
         *
         * @param [callback] {Function} resolution handler
         * @param [errback] {Function} rejection handler
         * @param [progback] {Function} progress handler
         *
         * @throws {Error} if any argument is not null, undefined, or a Function
         */
        _then = function unresolvedThen(callback, errback, progback) {
            // Check parameters and fail immediately if any supplied parameter
            // is not null/undefined and is also not a function.
            // That is, any non-null/undefined parameter must be a function.
            var arg, deferred, i = arguments.length;
            while(i) {
                arg = arguments[--i];
                if (arg != null && typeof arg != 'function') throw new Error('callback is not a function');
            }

            deferred = defer();

            listeners.push({
                deferred: deferred,
                resolve: callback,
                reject: errback
            });

            progback && progressHandlers.push(progback);

            return deferred.promise;
        };

        /**
         * Registers a handler for this {@link Deferred}'s {@link Promise}.  Even though all arguments
         * are optional, each argument that *is* supplied must be null, undefined, or a Function.
         * Any other value will cause an Error to be thrown.
         *
         * @memberOf Promise
         *
         * @param [callback] {Function} resolution handler
         * @param [errback] {Function} rejection handler
         * @param [progback] {Function} progress handler
         *
         * @throws {Error} if any argument is not null, undefined, or a Function
         */
        function then(callback, errback, progback) {
            return _then(callback, errback, progback);
        }

        /**
         * Resolves this {@link Deferred}'s {@link Promise} with val as the
         * resolution value.
         *
         * @memberOf Resolver
         *
         * @param val anything
         */
        function resolve(val) {
            complete('resolve', val);
        }

        /**
         * Rejects this {@link Deferred}'s {@link Promise} with err as the
         * reason.
         *
         * @memberOf Resolver
         *
         * @param err anything
         */
        function reject(err) {
            complete('reject', err);
        }

        /**
         * @private
         * @param update
         */
        _progress = function(update) {
            var progress, i = 0;
            while (progress = progressHandlers[i++]) progress(update);
        };

        /**
         * Emits a progress update to all progress observers registered with
         * this {@link Deferred}'s {@link Promise}
         *
         * @memberOf Resolver
         *
         * @param update anything
         */
        function progress(update) {
            _progress(update);
        }

        /**
         * Transition from pre-resolution state to post-resolution state, notifying
         * all listeners of the resolution or rejection
         *
         * @private
         *
         * @param which {String} either "resolve" or "reject"
         * @param val anything resolution value or rejection reason
         */
        complete = function(which, val) {
            // Save original _then
            var origThen = _then;

            // Replace _then with one that immediately notifies
            // with the result.
            _then = function newThen(callback, errback) {
                var promise = origThen(callback, errback);
                notify(which);
                return promise;
            };

            // Replace complete so that this Deferred
            // can only be completed once.  Note that this leaves
            // notify() intact so that it can be used in the
            // rewritten _then above.
            // Replace _progress, so that subsequent attempts
            // to issue progress throw.
            complete = _progress = function alreadyCompleted() {
                // TODO: Consider silently returning here so that parties who
                // have a reference to the resolver cannot tell that the promise
                // has been resolved using try/catch
                throw new Error("already completed");
            };

            // Free progressHandlers array since we'll never issue progress events
            // for this promise again now that it's completed
            progressHandlers = undef;

            // Final result of this Deferred.  This is immutable
            result = val;

            // Notify listeners
            notify(which);
        };

        /**
         * Notify all listeners of resolution or rejection
         *
         * @param which {String} either "resolve" or "reject"
         */
        function notify(which) {
            // Traverse all listeners registered directly with this Deferred,
            // also making sure to handle chained thens

            var listener, ldeferred, newResult, handler, localListeners, i = 0;

            // Reset the listeners array asap.  Some of the promise chains in the loop
            // below could run async, so need to ensure that no callers can corrupt
            // the array we're iterating over, but also need to allow callers to register
            // new listeners.
            localListeners = listeners;
            listeners = [];

            while (listener = localListeners[i++]) {

                ldeferred = listener.deferred;
                handler = listener[which];

                try {

                    newResult = handler ? handler(result) : result;

                    // NOTE: isPromise is also called by promise(), which is called by when(),
                    // resulting in 2 calls to isPromise here.  It's harmless, but need to
                    // refactor to avoid that.
                    if (isPromise(newResult)) {
                        // If the handler returned a promise, chained deferreds
                        // should complete only after that promise does.
                        when(newResult, ldeferred.resolve, ldeferred.reject, ldeferred.progress);

                    } else {
                        // Complete deferred from chained then()
                        // FIXME: Which is correct?
                        // The first always mutates the chained value, even if it is undefined
                        // The second will only mutate if newResult !== undefined
                        // ldeferred[which](newResult);
                        ldeferred[which](newResult === undef ? result : newResult);

                    }
                } catch (e) {
                    // Exceptions cause chained deferreds to reject
                    ldeferred.reject(e);
                }
            }
        }

        /**
         * The full Deferred object, with both {@link Promise} and {@link Resolver}
         * parts
         * @class Deferred
         * @name Deferred
         * @augments Resolver
         * @augments Promise
         */
        deferred = {};

        // Promise and Resolver parts
        // Freeze Promise and Resolver APIs

        /**
         * The Promise API
         * @namespace Promise
         * @name Promise
         */
        promise = new Promise();
        promise.then = deferred.then = then;
        
        /**
         * The {@link Promise} for this {@link Deferred}
         * @memberOf Deferred
         * @name promise
         * @type {Promise}
         */
        deferred.promise = freeze(promise);

        /**
         * The Resolver API
         * @namespace Resolver
         * @name Resolver
         */
        resolver =
        /**
         * The {@link Resolver} for this {@link Deferred}
         * @memberOf Deferred
         * @name resolver
         * @type {Resolver}
         */
            deferred.resolver = freeze({
                resolve:  (deferred.resolve  = resolve),
                reject:   (deferred.reject   = reject),
                progress: (deferred.progress = progress)
            });

        return deferred;
    }

    /**
     * Determines if promiseOrValue is a promise or not.  Uses the feature
     * test from http://wiki.commonjs.org/wiki/Promises/A to determine if
     * promiseOrValue is a promise.
     *
     * @param promiseOrValue anything
     *
     * @returns {Boolean} true if promiseOrValue is a {@link Promise}
     */
    function isPromise(promiseOrValue) {
        return promiseOrValue && typeof promiseOrValue.then === 'function';
    }

    /**
     * Register an observer for a promise or immediate value.
     *
     * @function
     * @name when
     * @namespace
     *
     * @param promiseOrValue anything
     * @param {Function} [callback] callback to be called when promiseOrValue is
     *   successfully resolved.  If promiseOrValue is an immediate value, callback
     *   will be invoked immediately.
     * @param {Function} [errback] callback to be called when promiseOrValue is
     *   rejected.
     * @param {Function} [progressHandler] callback to be called when progress updates
     *   are issued for promiseOrValue.
     *
     * @returns {Promise} a new {@link Promise} that will complete with the return
     *   value of callback or errback or the completion value of promiseOrValue if
     *   callback and/or errback is not supplied.
     */
    function when(promiseOrValue, callback, errback, progressHandler) {
        // Get a promise for the input promiseOrValue
        // See promise()
        var trustedPromise = promise(promiseOrValue);

        // Register promise handlers
        return trustedPromise.then(callback, errback, progressHandler);
    }

    /**
     * Returns promiseOrValue if promiseOrValue is a {@link Promise}, a new Promise if
     * promiseOrValue is a foreign promise, or a new, already-resolved {@link Promise}
     * whose resolution value is promiseOrValue if promiseOrValue is an immediate value.
     *
     * Note that this function is not safe to export since it will return its
     * input when promiseOrValue is a {@link Promise}
     *
     * @private
     *
     * @param promiseOrValue anything
     *
     * @returns Guaranteed to return a trusted Promise.  If promiseOrValue is a when.js {@link Promise}
     *   returns promiseOrValue, otherwise, returns a new, already-resolved, when.js {@link Promise}
     *   whose resolution value is:
     *   * the resolution value of promiseOrValue if it's a foreign promise, or
     *   * promiseOrValue if it's a value
     */
    function promise(promiseOrValue) {
        var promise, deferred;

        if(promiseOrValue instanceof Promise) {
            // It's a when.js promise, so we trust it
            promise = promiseOrValue;

        } else {
            // It's not a when.js promise.  Check to see if it's a foreign promise
            // or a value.
            deferred = defer();

            if(isPromise(promiseOrValue)) {
                // It's a compliant promise, but we don't know where it came from,
                // so we don't trust its implementation entirely.  Introduce a trusted
                // middleman when.js promise

                // IMPORTANT: This is the only place when.js should ever call .then() on
                // an untrusted promise.
                promiseOrValue.then(deferred.resolve, deferred.reject, deferred.progress);

            } else {
                // It's a value, not a promise.  Create an already-resolved promise
                // for it.
                deferred.resolve(promiseOrValue);

            }

            promise = deferred.promise;
        }

        return promise;
    }

    /**
     * Return a promise that will resolve when howMany of the supplied promisesOrValues
     * have resolved. The resolution value of the returned promise will be an array of
     * length howMany containing the resolutions values of the triggering promisesOrValues.
     *
     * @memberOf when
     *
     * @param promisesOrValues {Array} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param howMany
     * @param [callback]
     * @param [errback]
     * @param [progressHandler]
     *
     * @returns {Promise}
     */
    function some(promisesOrValues, howMany, callback, errback, progressHandler) {
        var toResolve, results, ret, deferred, resolver, rejecter, handleProgress, len, i;

        len = promisesOrValues.length >>> 0;

        toResolve = Math.max(0, Math.min(howMany, len));
        results = [];
        deferred = defer();
        ret = when(deferred, callback, errback, progressHandler);

        // Wrapper so that resolver can be replaced
        function resolve(val) {
            resolver(val);
        }

        // Wrapper so that rejecter can be replaced
        function reject(err) {
            rejecter(err);
        }

        // Wrapper so that progress can be replaced
        function progress(update) {
            handleProgress(update);
        }

        function complete() {
            resolver = rejecter = handleProgress = noop;
        }

        // No items in the input, resolve immediately
        if (!toResolve) {
            deferred.resolve(results);

        } else {
            // Resolver for promises.  Captures the value and resolves
            // the returned promise when toResolve reaches zero.
            // Overwrites resolver var with a noop once promise has
            // be resolved to cover case where n < promises.length
            resolver = function(val) {
                // This orders the values based on promise resolution order
                // Another strategy would be to use the original position of
                // the corresponding promise.
                results.push(val);

                if (!--toResolve) {
                    complete();
                    deferred.resolve(results);
                }
            };

            // Rejecter for promises.  Rejects returned promise
            // immediately, and overwrites rejecter var with a noop
            // once promise to cover case where n < promises.length.
            // TODO: Consider rejecting only when N (or promises.length - N?)
            // promises have been rejected instead of only one?
            rejecter = function(err) {
                complete();
                deferred.reject(err);
            };

            handleProgress = deferred.progress;

            // TODO: Replace while with forEach
            for(i = 0; i < len; ++i) {
                if(i in promisesOrValues) {
                    when(promisesOrValues[i], resolve, reject, progress);
                }
            }
        }

        return ret;
    }

    /**
     * Return a promise that will resolve only once all the supplied promisesOrValues
     * have resolved. The resolution value of the returned promise will be an array
     * containing the resolution values of each of the promisesOrValues.
     *
     * @memberOf when
     *
     * @param promisesOrValues {Array} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param [callback] {Function}
     * @param [errback] {Function}
     * @param [progressHandler] {Function}
     *
     * @returns {Promise}
     */
    function all(promisesOrValues, callback, errback, progressHandler) {
        var results, promise;

        results = allocateArray(promisesOrValues.length);
        promise = reduce(promisesOrValues, reduceIntoArray, results);

        return when(promise, callback, errback, progressHandler);
    }

    function reduceIntoArray(current, val, i) {
        current[i] = val;
        return current;
    }

    /**
     * Return a promise that will resolve when any one of the supplied promisesOrValues
     * has resolved. The resolution value of the returned promise will be the resolution
     * value of the triggering promiseOrValue.
     *
     * @memberOf when
     *
     * @param promisesOrValues {Array} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param [callback] {Function}
     * @param [errback] {Function}
     * @param [progressHandler] {Function}
     *
     * @returns {Promise}
     */
    function any(promisesOrValues, callback, errback, progressHandler) {

        function unwrapSingleResult(val) {
            return callback(val[0]);
        }

        return some(promisesOrValues, 1, unwrapSingleResult, errback, progressHandler);
    }

    /**
     * Traditional map function, similar to `Array.prototype.map()`, but allows
     * input to contain {@link Promise}s and/or values, and mapFunc may return
     * either a value or a {@link Promise}
     *
     * @memberOf when
     *
     * @param promisesOrValues {Array} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param mapFunc {Function} mapping function mapFunc(value) which may return
     *      either a {@link Promise} or value
     *
     * @returns {Promise} a {@link Promise} that will resolve to an array containing
     *      the mapped output values.
     */
    function map(promisesOrValues, mapFunc) {

        var results, i;

        // Since we know the resulting length, we can preallocate the results
        // array to avoid array expansions.
        i = promisesOrValues.length;
        results = allocateArray(i);

        // Since mapFunc may be async, get all invocations of it into flight
        // asap, and then use reduce() to collect all the results
        for(;i >= 0; --i) {
            if(i in promisesOrValues)
                results[i] = when(promisesOrValues[i], mapFunc);
        }

        // Could use all() here, but that would result in another array
        // being allocated, i.e. map() would end up allocating 2 arrays
        // of size len instead of just 1.  Since all() uses reduce()
        // anyway, avoid the additional allocation by calling reduce
        // directly.
        return reduce(results, reduceIntoArray, results);
    }

    /**
     * Traditional reduce function, similar to `Array.prototype.reduce()`, but
     * input may contain {@link Promise}s and/or values, but reduceFunc
     * may return either a value or a {@link Promise}, *and* initialValue may
     * be a {@link Promise} for the starting value.
     *
     * @memberOf when
     *
     * @param promisesOrValues {Array} array of anything, may contain a mix
     *      of {@link Promise}s and values
     * @param reduceFunc {Function} reduce function reduce(currentValue, nextValue, index, total),
     *      where total is the total number of items being reduced, and will be the same
     *      in each call to reduceFunc.
     * @param initialValue starting value, or a {@link Promise} for the starting value
     *
     * @returns {Promise} that will resolve to the final reduced value
     */
    function reduce(promisesOrValues, reduceFunc, initialValue) {

        var total, args;

        total = promisesOrValues.length;

        // Skip promisesOrValues, since it will be used as 'this' in the call
        // to the actual reduce engine below.

        // Wrap the supplied reduceFunc with one that handles promises and then
        // delegates to the supplied.

        args = [
            function (current, val, i) {
                return when(current, function (c) {
                    return when(val, function (value) {
                        return reduceFunc(c, value, i, total);
                    });
                });
            }
        ];

        if (arguments.length >= 3) args.push(initialValue);

        return promise(reduceArray.apply(promisesOrValues, args));
    }

    /**
     * Ensure that resolution of promiseOrValue will complete resolver with the completion
     * value of promiseOrValue, or instead with resolveValue if it is provided.
     *
     * @memberOf when
     *
     * @param promiseOrValue
     * @param resolver {Resolver}
     * @param [resolveValue] anything
     *
     * @returns {Promise}
     */
    function chain(promiseOrValue, resolver, resolveValue) {
        var useResolveValue = arguments.length > 2;

        return when(promiseOrValue,
            function(val) {
                resolver.resolve(useResolveValue ? resolveValue : val);
            },
            resolver.reject,
            resolver.progress
        );
    }

    //
    // Public API
    //

    when.defer     = defer;

    when.isPromise = isPromise;
    when.some      = some;
    when.all       = all;
    when.any       = any;

    when.reduce    = reduce;
    when.map       = map;

    when.chain     = chain;

    return when;
});
})(typeof define == 'function'
    ? define
    : function (factory) { typeof module != 'undefined'
        ? (module.exports = factory())
        : (this.when      = factory());
    }
    // Boilerplate for AMD, Node, and browser global
);
