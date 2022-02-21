define([
	"../_base/lang"
], function(lang){
	"use strict";

	// module:
	//		dojo/promise/Promise

	function throwAbstract(){
		throw new TypeError("abstract");
	}

	return lang.extend(function Promise(){
		// summary:
		//		The public interface to a deferred.
		// description:
		//		The public interface to a deferred. All promises in Dojo are
		//		instances of this class.
	}, {
		then: function(callback, errback, progback){
			// summary:
			//		Add new callbacks to the promise.
			// description:
			//		Add new callbacks to the deferred. Callbacks can be added
			//		before or after the deferred is fulfilled.
			// callback: Function?
			//		Callback to be invoked when the promise is resolved.
			//		Receives the resolution value.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			//		Receives the rejection error.
			// progback: Function?
			//		Callback to be invoked when the promise emits a progress
			//		update. Receives the progress update.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the callback(s).
			//		This can be used for chaining many asynchronous operations.

			throwAbstract();
		},

		cancel: function(reason, strict){
			// summary:
			//		Inform the deferred it may cancel its asynchronous operation.
			// description:
			//		Inform the deferred it may cancel its asynchronous operation.
			//		The deferred's (optional) canceler is invoked and the
			//		deferred will be left in a rejected state. Can affect other
			//		promises that originate with the same deferred.
			// reason: any
			//		A message that may be sent to the deferred's canceler,
			//		explaining why it's being canceled.
			// strict: Boolean?
			//		If strict, will throw an error if the deferred has already
			//		been fulfilled and consequently cannot be canceled.
			// returns: any
			//		Returns the rejection reason if the deferred was canceled
			//		normally.

			throwAbstract();
		},

		isResolved: function(){
			// summary:
			//		Checks whether the promise has been resolved.
			// returns: Boolean

			throwAbstract();
		},

		isRejected: function(){
			// summary:
			//		Checks whether the promise has been rejected.
			// returns: Boolean

			throwAbstract();
		},

		isFulfilled: function(){
			// summary:
			//		Checks whether the promise has been resolved or rejected.
			// returns: Boolean

			throwAbstract();
		},

		isCanceled: function(){
			// summary:
			//		Checks whether the promise has been canceled.
			// returns: Boolean

			throwAbstract();
		},

		"finally": function(callback) {
			// summary:
			//		Add a callback to the promise that will fire whether it
			//		resolves or rejects.
			// description:
			//		Conforms to ES2018's `Promise.prototype.finally`.
			//		Add a callback to the promise that will fire whether it
			//		resolves or rejects. No value is passed to the callback.
			//		Returns a promise that reflects the state of the original promise,
			//		with two exceptions:
			//		- If the callback return a promise, the outer promise will wait
			//		until the returned promise is resolved, then it will resolve
			//		with the original value.
			//		- If the callback throws an exception or returns a promise that
			//		is rejected (or rejects later), the outer promise will reject
			//		with the inner promise's rejection reason.
			// callback: Function?
			//		Callback to be invoked when the promise is resolved
			//		or rejected. Doesn't receive any value.
			// returns: dojo/promise/Promise
			//		Returns a new promise that reflects the state of the original promise,
			//		with two small exceptions (see description).
			//

			return this.then(function (value){
				var valueOrPromise = callback();
				if (valueOrPromise && typeof valueOrPromise.then === "function"){
					return valueOrPromise.then(function (){
						return value;
					});
				}
				return value;
			}, function(reason) {
				var valueOrPromise = callback();
				if (valueOrPromise && typeof valueOrPromise.then === "function"){
					return valueOrPromise.then(function (){
						throw reason;
					});
				}
				throw reason;
			});
		},

		always: function(callbackOrErrback){
			// summary:
			//		Add a callback to be invoked when the promise is resolved
			//		or rejected.
			// callbackOrErrback: Function?
			//		A function that is used both as a callback and errback.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the callback/errback.

			return this.then(callbackOrErrback, callbackOrErrback);
		},

		"catch": function(errback){
		    // summary:
		    //		Add new errbacks to the promise. Follows ECMA specification naming.
		    // errback: Function?
		    //		Callback to be invoked when the promise is rejected.
		    // returns: dojo/promise/Promise
		    //		Returns a new promise for the result of the errback.

		    return this.then(null, errback);
		},

		otherwise: function(errback){
			// summary:
			//		Add new errbacks to the promise.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			// returns: dojo/promise/Promise
			//		Returns a new promise for the result of the errback.

			return this.then(null, errback);
		},

		trace: function(){
			return this;
		},

		traceRejected: function(){
			return this;
		},

		toString: function(){
			// returns: string
			//		Returns `[object Promise]`.

			return "[object Promise]";
		}
	});
});
