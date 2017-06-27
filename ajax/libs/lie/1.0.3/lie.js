/*! lie 1.0.3 2013-08-31*/
/*! (c)2013 Ruben Verborgh & Calvin Metcalf @license MIT https://github.com/calvinmetcalf/lie*/
(function(){
	var create = function(tick,exports) {
		var func = 'function';
		// Creates a deferred: an object with a promise and corresponding resolve/reject methods
		function Deferred() {
			// The `handler` variable points to the function that will
			// 1) handle a .then(onFulfilled, onRejected) call
			// 2) handle a .resolve or .reject call (if not fulfilled)
			// Before 2), `handler` holds a queue of callbacks.
			// After 2), `handler` is a simple .then handler.
			// We use only one function to save memory and complexity.
			var handler = function(onFulfilled, onRejected, value) {
				// Case 1) handle a .then(onFulfilled, onRejected) call
				var createdDeffered;
				if (onFulfilled !== handler) {
					createdDeffered = createDeferred();
					handler.queue.push({
						deferred: createdDeffered,
						resolve: onFulfilled,
						reject: onRejected
					});
					return createdDeffered.promise;
				}
	
				// Case 2) handle a .resolve or .reject call
				// (`onFulfilled` acts as a sentinel)
				// The actual function signature is
				// .re[ject|solve](sentinel, success, value)
				var action = onRejected ? 'resolve' : 'reject',
					queue, deferred, callback;
				for (var i = 0, l = handler.queue.length; i < l; i++) {
					queue = handler.queue[i];
					deferred = queue.deferred;
					callback = queue[action];
					if (typeof callback !== func) {
						deferred[action](value);
					}
					else {
						execute(callback, value, deferred);
					}
				}
				// Replace this handler with a simple resolved or rejected handler
				handler = createHandler(promise, value, onRejected);
			};
	
			function Promise() {
				this.then = function(onFulfilled, onRejected) {
					return handler(onFulfilled, onRejected);
				};
			}
			var promise = new Promise();
			this.promise = promise;
			// The queue of deferreds
			handler.queue = [];
	
			this.resolve = function(value) {
				if(handler.queue){
					handler(handler, true, value);
				}
			};
			
			this.fulfill = this.resolve;
			
			this.reject = function(reason) {
				if(handler.queue){
					handler(handler, false, reason);
				}
			};
		}
	
		function createDeferred() {
			return new Deferred();
		}
	
		// Creates a fulfilled or rejected .then function
		function createHandler(promise, value, success) {
			return function(onFulfilled, onRejected) {
				var callback = success ? onFulfilled : onRejected,
					result;
				if (typeof callback !== func) {
					return promise;
				}
				execute(callback, value, result = createDeferred());
				return result.promise;
			};
		}
	
		// Executes the callback with the specified value,
		// resolving or rejecting the deferred
		function execute(callback, value, deferred) {
			tick(function() {
				var result;
				try {
					result = callback(value);
					if (result && typeof result.then === func) {
						result.then(deferred.resolve, deferred.reject);
					}
					else {
						deferred.resolve(result);
					}
				}
				catch (error) {
					deferred.reject(error);
				}
			});
		}
		exports = createDeferred;
		// Returns a resolved promise
		exports.resolve = function(value) {
			var promise = {};
			promise.then = createHandler(promise, value, true);
			return promise;
		};
		// Returns a rejected promise
		exports.reject = function(reason) {
			var promise = {};
			promise.then = createHandler(promise, reason, false);
			return promise;
		};
		// Returns a deferred
		

		return exports;
	};

	if(typeof define === 'function'){
		define(function(){
			return create(typeof setImmediate === 'function'?setImmediate:setTimeout,{});
		});
	}else if(typeof module === 'undefined' || !('exports' in module)){
		create(typeof setImmediate === 'function'?setImmediate:setTimeout,typeof global === 'object' && global ? global : this);
	}else{
		module.exports = create(process.nextTick,{});
	}
})();
