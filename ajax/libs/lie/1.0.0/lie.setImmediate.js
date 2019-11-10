(function (global, undefined) {
    "use strict";

    var tasks = (function () {
        function Task(handler, args) {
            this.handler = handler;
            this.args = args;
        }
        Task.prototype.run = function () {
            // See steps in section 5 of the spec.
            if (typeof this.handler === "function") {
                // Choice of `thisArg` is not in the setImmediate spec; `undefined` is in the setTimeout spec though:
                // http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html
                this.handler.apply(undefined, this.args);
            } else {
                var scriptSource = "" + this.handler;
                /*jshint evil: true */
                eval(scriptSource);
            }
        };

        var nextHandle = 1; // Spec says greater than zero
        var tasksByHandle = {};
        var currentlyRunningATask = false;

        return {
            addFromSetImmediateArguments: function (args) {
                var handler = args[0];
                var argsToHandle = Array.prototype.slice.call(args, 1);
                var task = new Task(handler, argsToHandle);

                var thisHandle = nextHandle++;
                tasksByHandle[thisHandle] = task;
                return thisHandle;
            },
            runIfPresent: function (handle) {
                // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
                // So if we're currently running a task, we'll need to delay this invocation.
                if (!currentlyRunningATask) {
                    var task = tasksByHandle[handle];
                    if (task) {
                        currentlyRunningATask = true;
                        try {
                            task.run();
                        } finally {
                            delete tasksByHandle[handle];
                            currentlyRunningATask = false;
                        }
                    }
                } else {
                    // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                    // "too much recursion" error.
                    global.setTimeout(function () {
                        tasks.runIfPresent(handle);
                    }, 0);
                }
            },
            remove: function (handle) {
                delete tasksByHandle[handle];
            }
        };
    }());

    function canUseNextTick() {
        // Don't get fooled by e.g. browserify environments.
        return typeof process === "object" &&
               Object.prototype.toString.call(process) === "[object process]";
    }

    function canUseMessageChannel() {
        return !!global.MessageChannel;
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.

        if (!global.postMessage || global.importScripts) {
            return false;
        }

        var postMessageIsAsynchronous = true;
        var oldOnMessage = global.onmessage;
        global.onmessage = function () {
            postMessageIsAsynchronous = false;
        };
        global.postMessage("", "*");
        global.onmessage = oldOnMessage;

        return postMessageIsAsynchronous;
    }

    function canUseReadyStateChange() {
        return "document" in global && "onreadystatechange" in global.document.createElement("script");
    }

    function installNextTickImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            process.nextTick(function () {
                tasks.runIfPresent(handle);
            });

            return handle;
        };
    }

    function installMessageChannelImplementation(attachTo) {
        var channel = new global.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            tasks.runIfPresent(handle);
        };
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            channel.port2.postMessage(handle);

            return handle;
        };
    }

    function installPostMessageImplementation(attachTo) {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var MESSAGE_PREFIX = "com.bn.NobleJS.setImmediate" + Math.random();

        function isStringAndStartsWith(string, putativeStart) {
            return typeof string === "string" && string.substring(0, putativeStart.length) === putativeStart;
        }

        function onGlobalMessage(event) {
            // This will catch all incoming messages (even from other windows!), so we need to try reasonably hard to
            // avoid letting anyone else trick us into firing off. We test the origin is still this window, and that a
            // (randomly generated) unpredictable identifying prefix is present.
            if (event.source === global && isStringAndStartsWith(event.data, MESSAGE_PREFIX)) {
                var handle = event.data.substring(MESSAGE_PREFIX.length);
                tasks.runIfPresent(handle);
            }
        }
        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            // Make `global` post a message to itself with the handle and identifying prefix, thus asynchronously
            // invoking our onGlobalMessage listener above.
            global.postMessage(MESSAGE_PREFIX + handle, "*");

            return handle;
        };
    }

    function installReadyStateChangeImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var scriptEl = global.document.createElement("script");
            scriptEl.onreadystatechange = function () {
                tasks.runIfPresent(handle);

                scriptEl.onreadystatechange = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
            };
            global.document.documentElement.appendChild(scriptEl);

            return handle;
        };
    }

    function installSetTimeoutImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            global.setTimeout(function () {
                tasks.runIfPresent(handle);
            }, 0);

            return handle;
        };
    }

    if (!global.setImmediate) {
        // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
        var attachTo = typeof Object.getPrototypeOf === "function" && "setTimeout" in Object.getPrototypeOf(global) ?
                          Object.getPrototypeOf(global)
                        : global;

        if (canUseNextTick()) {
            // For Node.js before 0.9
            installNextTickImplementation(attachTo);
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            installPostMessageImplementation(attachTo);
        } else if (canUseMessageChannel()) {
            // For web workers, where supported
            installMessageChannelImplementation(attachTo);
        } else if (canUseReadyStateChange()) {
            // For IE 6–8
            installReadyStateChangeImplementation(attachTo);
        } else {
            // For older browsers
            installSetTimeoutImplementation(attachTo);
        }

        attachTo.clearImmediate = tasks.remove;
    }
}(typeof global === "object" && global ? global : this));

/*! lie 1.0.0 2013-08-30*/
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
		define(['setImmediate'],function(setImmediate){
			return create(setImmediate,{});
		});
	}else if(typeof module === 'undefined' || !('exports' in module)){
		create(typeof setImmediate === 'function'?setImmediate:setTimeout,typeof global === 'object' && global ? global : this);
	}else{
		module.exports = create(process.nextTick,{});
	}
})();
