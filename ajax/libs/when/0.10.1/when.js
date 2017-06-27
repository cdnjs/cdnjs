/**
 * @license Copyright (c) 2011 Brian Cavalier
 * LICENSE: see the LICENSE.txt file. If file is missing, this file is subject
 * to the MIT License at: http://www.opensource.org/licenses/mit-license.php.
 */

/**
 * when.js
 * A lightweight CommonJS Promises/A and when() implementation
 *
 * @version 0.10.1
 * @author brian@hovercraftstudios.com
 */
(function(define) {
define([], function() {

    var freeze, apReduce, reduceArray, undef;

    /**
     * Use freeze if it exists
     * @function
     * @private
     */
    freeze = Object.freeze || noop;

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

    apReduce = Array.prototype.reduce;
    reduceArray = apReduce
        ? function(arr, reduceFunc, initialValue) { return apReduce.call(arr, reduceFunc, initialValue); }
        : function(arr, reduceFunc, initialValue) {
            var reduced = initialValue;

            for(var i=0, len=arr.length; i<len; i++) {
                reduced = reduceFunc(reduced, arr[i], i, arr);
            }

            return reduced;
        };

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
         */
        _then = function unresolvedThen(callback, errback, progback) {
            var d = defer();

            listeners.push({
                deferred: d,
                resolve: callback,
                reject: errback
            });

            progback && progressHandlers.push(progback);

            return d.promise;
        };

        /**
         * Registers a handler for this {@link Deferred}'s {@link Promise}
         *
         * @memberOf Promise
         *
         * @param callback {Function}
         * @param [errback] {Function}
         * @param [progback] {Function}
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

            // Free progressHandlers array
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

                    if (isPromise(newResult)) {
                        // If the handler returned a promise, chained deferreds
                        // should complete only after that promise does.
                        _chain(newResult, ldeferred);

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

        /**
         * The Promise API
         * @namespace Promise
         * @name Promise
         */
        promise =
        /**
         * The {@link Promise} for this {@link Deferred}
         * @memberOf Deferred
         * @name promise
         * @type {Promise}
         */
            deferred.promise = {
                then:(deferred.then = then)
            };

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
            deferred.resolver = {
                resolve:  (deferred.resolve  = resolve),
                reject:   (deferred.reject   = reject),
                progress: (deferred.progress = progress)
            };

        // Freeze Promise and Resolver APIs
        freeze(promise);
        freeze(resolver);

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
        var inputPromise = promise(promiseOrValue);

        // Register promise handlers
        return inputPromise.then(callback, errback, progressHandler);
    }

    /**
     * Returns promiseOrValue if promiseOrValue is a {@link Promise}, or a new,
     * already-resolved {@link Promise} whose resolution value is promiseOrValue if
     * promiseOrValue is an immediate value.
     *
     * Note that this function is not safe to export since it will return its
     * input when promiseOrValue is a {@link Promise}
     *
     * @private
     *
     * @param promiseOrValue anything
     *
     * @returns if promiseOrValue is a {@link Promise} returns promiseOrValue,
     *   otherwise, returns a new, already-resolved, {@link Promise} whose resolution
     *   value is promiseOrValue.
     */
    function promise(promiseOrValue) {
        return isPromise(promiseOrValue) ? promiseOrValue : resolved(promiseOrValue);
    }

    /**
     * Creates a promise that is immediately resolved to the supplied value.
     *
     * @private
     *
     * @param value anything
     *
     * @return {Promise} a new, already resolved {@link Promise} whose resolution
     * value is the supplied value.
     */
    function resolved(value) {
        // TODO: Consider making this public, along with a corresponding rejected()
        var deferred = defer();
        deferred.resolve(value);
        return deferred.promise;
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
        var toResolve, results, ret, deferred, resolver, rejecter, handleProgress;

        toResolve = Math.max(0, Math.min(howMany, promisesOrValues.length));
        results = [];
        deferred = defer();
        ret = (callback || errback || progressHandler)
            ? deferred.then(callback, errback, progressHandler)
            : deferred.promise;

        // Resolver for promises.  Captures the value and resolves
        // the returned promise when toResolve reaches zero.
        // Overwrites resolver var with a noop once promise has
        // be resolved to cover case where n < promises.length
        resolver = function(val) {
            // This orders the values based on promise resolution order
            // Another strategy would be to use the original position of
            // the corresponding promise.
            results.push(val);

            if (--toResolve === 0) {
                resolver = handleProgress = noop;
                deferred.resolve(results);
            }
        };

        // Wrapper so that resolver can be replaced
        function resolve(val) {
            resolver(val);
        }

        // Rejecter for promises.  Rejects returned promise
        // immediately, and overwrites rejecter var with a noop
        // once promise to cover case where n < promises.length.
        // TODO: Consider rejecting only when N (or promises.length - N?)
        // promises have been rejected instead of only one?
        rejecter = function(err) {
            rejecter = handleProgress = noop;
            deferred.reject(err);
        };

        // Wrapper so that rejecer can be replaced
        function reject(err) {
            rejecter(err);
        }

        handleProgress = function(update) {
            deferred.progress(update);
        };

        function progress(update) {
            handleProgress(update);
        }

        if (toResolve === 0) {
            deferred.resolve(results);
        } else {
            // TODO: Replace while with forEach
            var promiseOrValue, i = 0;
            while ((promiseOrValue = promisesOrValues[i++])) {
                when(promiseOrValue, resolve, reject, progress);
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

        function mapIntoArray(array, value, i) {
            return when(mapFunc(value), function(resolved) {
                array[i] = resolved;
                return array;
            });
        }

        var results = allocateArray(promisesOrValues.length);

        return reduce(promisesOrValues, mapIntoArray, results);
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

        var total = promisesOrValues.length;

        return promise(reduceArray(promisesOrValues, function(current, val, i) {
            return when(current, function(c) {
                return when(val, function(value) {
                    return reduceFunc(c, value, i, total);
                });
            });
        }, initialValue));
    }

    /**
     * Ensure that resolution of promiseOrValue will complete resolver with the completion
     * value of promiseOrValue, or instead with optionalValue if it is provided.
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
        var inputPromise, initChain;

        inputPromise = promise(promiseOrValue);

        // Check against args length instead of resolvedValue === undefined, since
        // undefined may be a valid resolution value.
        initChain = arguments.length > 2
            ? function(resolver) { return _chain(inputPromise, resolver, resolveValue); }
            : function(resolver) { return _chain(inputPromise, resolver); };

        // Setup chain to supplied resolver
        initChain(resolver);

        // Setup chain to new promise
        return initChain(when.defer()).promise;
    }

    /**
     * @private
     * Internal chain helper that does not create a new deferred/promise
     * Always returns it's 2nd arg.
     * NOTE: deferred must be a when.js deferred, or a resolver whose functions
     * can be called without their original context.
     *
     * @param promise
     * @param deferred
     * @param resolveValue
     *
     * @returns deferred
     */
    function _chain(promise, deferred, resolveValue) {
        promise.then(
            // If resolveValue was supplied, need to wrap up a new function
            // If not, can use deferred.resolve directly
            arguments.length > 2
                ? function() { deferred.resolve(resolveValue); }
                : deferred.resolve,
            deferred.reject,
            deferred.progress
        );

        return deferred;
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

}); // define
})(typeof define != 'undefined'
    // use define for AMD if available
    ? define
    // If no define, look for module to export as a CommonJS module.
    // If no define or module, attach to current context.
    : typeof module != 'undefined'
    ? function(deps, factory) { module.exports = factory(); }
    : function(deps, factory) { this.when = factory(); }
);
