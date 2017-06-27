/**
 * @license Copyright (c) 2011 Brian Cavalier
 * LICENSE: see the LICENSE.txt file. If file is missing, this file is subject
 * to the MIT License at: http://www.opensource.org/licenses/mit-license.php.
 */

/*
	File: when.js
	Version: 0.9.0
*/

(function(define, undef) {
define([], function() {

	// No-op function used in function replacement in various
	// places below.
	function noop() {}

	var freeze = Object.freeze || noop;

	/*
		Function: Deferred
		Creates a new, CommonJS compliant, Deferred with fully isolated
		resolver and promise parts, either or both of which may be given out
		safely to consumers.
		The Deferred itself has the full API: resolve, reject, progress, and
		then. The resolver has resolve, reject, and progress.  The promise
		only has then.
	*/
	function defer() {
		var deferred, promise, resolver, result, listeners, tail,
			_then, _progress, complete;

		_then = function(callback, errback, progback) {
			var d, listener;

			listener = {
				deferred: (d = defer()),
				resolve: callback,
				reject: errback,
				progress: progback
			};

			if(listeners) {
				// Append new listener if linked list already initialized
				tail = tail.next = listener;
			} else {
				// Init linked list
				listeners = tail = listener;
			}

			return d.promise;
		};

		function then(callback, errback, progback) {
			return _then(callback, errback, progback);
		}

		function resolve(val) { 
			complete('resolve', val);
		}

		function reject(err) {
			complete('reject', err);
		}
		
		_progress = function(update) {
			var listener, progress;
			
			listener = listeners;

			while(listener) {
				progress = listener.progress;
				if(progress) progress(update);
				listener = listener.next;
			}
		};

		function progress(update) {
			_progress(update);
		}

		complete = function(which, val) {
			// Save original thenImpl
			var origThen = _then;

			// Replace thenImpl with one that immediately notifies
			// with the result.
			_then = function newThen(callback, errback) {
				var promise = origThen(callback, errback);
				notify(which);
				return promise;
			};

			// Replace complete so that this Deferred
			// can only be completed once.  Note that this leaves
			// notify() intact so that it can be used in the
			// rewritten thenImpl above.
			// Replace progressImpl, so that subsequent attempts
			// to issue progress throw.
			complete = _progress = function alreadyCompleted() {
				throw new Error("already completed");
			};

			// Final result of this Deferred.  This is immutable
			result = val;

			// Notify listeners
			notify(which);
		};

        function notify(which) {
            // Traverse all listeners registered directly with this Deferred,
			// also making sure to handle chained thens
			while(listeners) {
				var listener, ldeferred, newResult, handler;

				listener  = listeners;
				ldeferred = listener.deferred;
				listeners = listeners.next;

				handler = listener[which];
				if(handler) {
					try {
						newResult = handler(result);

						if(isPromise(newResult)) {
							// If the handler returned a promise, chained deferreds
							// should complete only after that promise does.
							newResult.then(ldeferred.resolve, ldeferred.reject, ldeferred.progress);
						
						} else {
							// Complete deferred from chained then()
							// FIXME: Which is correct?
							// The first always mutates the chained value, even if it is undefined
							// The second will only mutate if newResult !== undefined
							// ldeferred[which](newResult);
							
							ldeferred[which](newResult === undef ? result : newResult);							

						}
					} catch(e) {
						// Exceptions cause chained deferreds to complete
						// TODO: Should it *also* switch this promise's handlers to failed??
						// I think no.
						// which = 'reject';

						ldeferred.reject(e);
					}
				}
			}			
		}

		// The full Deferred object, with both Promise and Resolver parts
		deferred = {};

		// Promise and Resolver parts

		// Expose Promise API
		promise = deferred.promise  = {
			then: (deferred.then = then)
		};

		// Expose Resolver API
		resolver = deferred.resolver = {
			resolve:  (deferred.resolve  = resolve),
			reject:   (deferred.reject   = reject),
			progress: (deferred.progress = progress)
		};

		// Freeze Promise and Resolver APIs
		freeze(promise);
		freeze(resolver);

		return deferred;
	}

	/*
		Function: isPromise
		Determines if promiseOrValue is a promise or not.  Uses the feature
		test from http://wiki.commonjs.org/wiki/Promises/A to determine if
		promiseOrValue is a promise.

		Parameters:
			promiseOrValue - anything

		Return:
		true if and only if promiseOrValue is a promise.
	*/
	function isPromise(promiseOrValue) {
		return promiseOrValue && typeof promiseOrValue.then === 'function';
	}

	/*
		Function: when
	*/
	function when(promiseOrValue, callback, errback, progressHandler) {
		var deferred = defer();

		function resolve(value) {
			return callback ? callback(value) : value;
		}

		function reject(err) {
			return errback ? errback(err) : err;
		}

		function progress(update) {
			progressHandler(update);
		}
		
		if(isPromise(promiseOrValue)) {
			// If it's a promise, ensure that deferred will complete when promiseOrValue
			// completes.
			deferred = _chain(promiseOrValue.then(resolve, reject, progress), deferred);

		} else {
			// If it's a value, resolve immediately
			deferred.resolve(resolve(promiseOrValue));

		}

		return deferred.promise;
	}

	/*
		Function: some
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
			results.push(val);
			if(--toResolve === 0) {
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

		if(toResolve === 0) {
			deferred.resolve(results);
		} else {
			var promiseOrValue, i = 0;
			while((promiseOrValue = promisesOrValues[i++])) {
				when(promiseOrValue, resolve, reject, progress);
			}			
		}

		return ret;
	}

	/*
		Function: all
	*/
	function all(promisesOrValues, callback, errback, progressHandler) {
		return some(promisesOrValues, promisesOrValues.length, callback, errback, progressHandler);
	}

	/*
		Function: any
	*/
	function any(promisesOrValues, callback, errback, progressHandler) {
		return some(promisesOrValues, 1, callback, errback, progressHandler);
	}

	/*
		Function: chain
		Chain a promise to a resolver such that when the first completes, the second
		is completed with either the completion value of the first, or
		in the case of resolve, completed with the optional resolveValue.

		Parameters:
			promise - Promise, that when completed, will trigger completion of resolver
			second - Resolver to complete when promise completes
			resolveValue - optional value to use as the resolution value
				used to resolve second, rather than the resolution
				value of first.
		
		Returns:
			a new Promise that will be resolved when resolver is completed, with
			its completion value.
	*/
	function chain(promiseOrValue, resolver, resolveValue) {
		return _chain(_chain(when(promiseOrValue), resolver, resolveValue), defer()).promise;
	}

	function _chain(first, second, resolveValue) {
		var args = arguments;
		first.then(
			function(val)    { second.resolve(args.length > 2 ? resolveValue : val); },
			function(err)    { second.reject(err); },
			function(update) { second.progress(update); }
		);

		return second;
	}

	/*
		Section: Public API
	*/

	when.defer     = defer;

	when.isPromise = isPromise;
	when.some      = some;
	when.all       = all;
	when.any       = any;
	when.chain     = chain;

	return when;

});
})(typeof define != 'undefined' ? define : function(deps, factory){
    // global when, if not loaded via require
    this.when = factory();
});