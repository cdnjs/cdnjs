/**
 * @class Ext.Function
 *
 * A collection of useful static methods to deal with function callbacks.
 * @singleton
 */
Ext.Function = {
// @define Ext.lang.Function
// @define Ext.Function
// @require Ext
// @require Ext.lang.Array
    /**
     * A very commonly used method throughout the framework. It acts as a wrapper around another method
     * which originally accepts 2 arguments for `name` and `value`.
     * The wrapped function then allows "flexible" value setting of either:
     *
     * - `name` and `value` as 2 arguments
     * - one single object argument with multiple key - value pairs
     *
     * For example:
     *
     *     var setValue = Ext.Function.flexSetter(function(name, value) {
     *         this[name] = value;
     *     });
     *
     *     // Afterwards
     *     // Setting a single name - value
     *     setValue('name1', 'value1');
     *
     *     // Settings multiple name - value pairs
     *     setValue({
     *         name1: 'value1',
     *         name2: 'value2',
     *         name3: 'value3'
     *     });
     *
     * @param {Function} setter The single value setter method.
     * @param {String} setter.name The name of the value being set.
     * @param {Object} setter.value The value being set.
     * @return {Function}
     */
    flexSetter: function(setter) {
        return function(name, value) {
            var k, i;

            if (name !== null) {
                if (typeof name !== 'string') {
                    for (k in name) {
                        if (name.hasOwnProperty(k)) {
                            setter.call(this, k, name[k]);
                        }
                    }

                    if (Ext.enumerables) {
                        for (i = Ext.enumerables.length; i--;) {
                            k = Ext.enumerables[i];
                            if (name.hasOwnProperty(k)) {
                                setter.call(this, k, name[k]);
                            }
                        }
                    }
                } else {
                    setter.call(this, name, value);
                }
            }

            return this;
        };
    },

    /**
     * Create a new function from the provided `fn`, change `this` to the provided scope,
     * optionally overrides arguments for the call. Defaults to the arguments passed by
     * the caller.
     *
     * {@link Ext#bind Ext.bind} is alias for {@link Ext.Function#bind Ext.Function.bind}
     * 
     * **NOTE:** This method is deprecated. Use the standard `bind` method of JavaScript
     * `Function` instead:
     * 
     *      function foo () {
     *          ...
     *      }
     *      
     *      var fn = foo.bind(this);
     *
     * This method is unavailable natively on IE8 and IE/Quirks but Ext JS provides a
     * "polyfill" to emulate the important features of the standard `bind` method. In
     * particular, the polyfill only provides binding of "this" and optional arguments.
     * 
     * @param {Function} fn The function to delegate.
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * **If omitted, defaults to the default global environment object (usually the browser window).**
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position.
     * @return {Function} The new function.
     */
    bind: function(fn, scope, args, appendArgs) {
        if (arguments.length === 2) {
            return function() {
                return fn.apply(scope, arguments);
            };
        }

        var method = fn,
            slice = Array.prototype.slice;

        return function() {
            var callArgs = args || arguments;

            if (appendArgs === true) {
                callArgs = slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }
            else if (typeof appendArgs == 'number') {
                callArgs = slice.call(arguments, 0); // copy arguments first
                Ext.Array.insert(callArgs, appendArgs, args);
            }

            return method.apply(scope || Ext.global, callArgs);
        };
    },

    /**
     * Captures the given parameters for a later call to `Ext.callback`. This binding is
     * most useful for resolving scopes for example to an `Ext.app.ViewController`.
     *
     * The arguments match that of `Ext.callback` except for the `args` which, if provided
     * to this method, are prepended to any arguments supplied by the eventual caller of
     * the returned function.
     *
     * @return {Function} A function that, when called, uses `Ext.callback` to call the
     * captured `callback`.
     * @since 5.0.0
     */
    bindCallback: function (callback, scope, args, delay, caller) {
        return function () {
            var a = Ext.Array.slice(arguments);
            return Ext.callback(callback, scope, args ? args.concat(a) : a, delay, caller);
        };
    },

    /**
     * Create a new function from the provided `fn`, the arguments of which are pre-set to `args`.
     * New arguments passed to the newly created callback when it's invoked are appended after the pre-set ones.
     * This is especially useful when creating callbacks.
     *
     * For example:
     *
     *     var originalFunction = function(){
     *         alert(Ext.Array.from(arguments).join(' '));
     *     };
     *
     *     var callback = Ext.Function.pass(originalFunction, ['Hello', 'World']);
     *
     *     callback(); // alerts 'Hello World'
     *     callback('by Me'); // alerts 'Hello World by Me'
     *
     * {@link Ext#pass Ext.pass} is alias for {@link Ext.Function#pass Ext.Function.pass}
     *
     * @param {Function} fn The original function.
     * @param {Array} args The arguments to pass to new callback.
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * @return {Function} The new callback function.
     */
    pass: function(fn, args, scope) {
        if (!Ext.isArray(args)) {
            if (Ext.isIterable(args)) {
                args = Ext.Array.clone(args);
            } else {
                args = args !== undefined ? [args] : [];
            }
        }

        return function() {
            var fnArgs = args.slice();
            fnArgs.push.apply(fnArgs, arguments);
            return fn.apply(scope || this, fnArgs);
        };
    },

    /**
     * Create an alias to the provided method property with name `methodName` of `object`.
     * Note that the execution scope will still be bound to the provided `object` itself.
     *
     * @param {Object/Function} object
     * @param {String} methodName
     * @return {Function} aliasFn
     */
    alias: function(object, methodName) {
        return function() {
            return object[methodName].apply(object, arguments);
        };
    },

    /**
     * Create a "clone" of the provided method. The returned method will call the given
     * method passing along all arguments and the "this" pointer and return its result.
     *
     * @param {Function} method
     * @return {Function} cloneFn
     */
    clone: function(method) {
        return function() {
            return method.apply(this, arguments);
        };
    },

    /**
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     };
     *
     *     sayHi('Fred'); // alerts "Hi, Fred"
     *
     *     // create a new function that validates input without
     *     // directly modifying the original function:
     *     var sayHiToFriend = Ext.Function.createInterceptor(sayHi, function(name){
     *         return name === 'Brian';
     *     });
     *
     *     sayHiToFriend('Fred');  // no alert
     *     sayHiToFriend('Brian'); // alerts "Hi, Brian"
     *
     * @param {Function} origFn The original function.
     * @param {Function} newFn The function to call before the original.
     * @param {Object} [scope] The scope (`this` reference) in which the passed function is executed.
     * **If omitted, defaults to the scope in which the original function is called or the browser window.**
     * @param {Object} [returnValue=null] The value to return if the passed function return `false`.
     * @return {Function} The new function.
     */
    createInterceptor: function(origFn, newFn, scope, returnValue) {
        if (!Ext.isFunction(newFn)) {
            return origFn;
        } else {
            returnValue = Ext.isDefined(returnValue) ? returnValue : null;
            return function() {
                var me = this,
                    args = arguments;
                    
                newFn.target = me;
                newFn.method = origFn;
                return (newFn.apply(scope || me || Ext.global, args) !== false) ? 
                            origFn.apply(me || Ext.global, args) : returnValue;
            };
        }
    },

    /**
     * Creates a delegate (callback) which, when called, executes after a specific delay.
     *
     * @param {Function} fn The function which will be called on a delay when the returned function is called.
     * Optionally, a replacement (or additional) argument list may be specified.
     * @param {Number} delay The number of milliseconds to defer execution by whenever called.
     * @param {Object} scope (optional) The scope (`this` reference) used by the function at execution time.
     * @param {Array} args (optional) Override arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position.
     * @return {Function} A function which, when called, executes the original function after the specified delay.
     */
    createDelayed: function(fn, delay, scope, args, appendArgs) {
        if (scope || args) {
            fn = Ext.Function.bind(fn, scope, args, appendArgs);
        }

        return function() {
            var me = this,
                args = Array.prototype.slice.call(arguments);

            setTimeout(function() {
                fn.apply(me, args);
            }, delay);
        };
    },

    /**
     * Calls this function after the number of milliseconds specified, optionally in a specific scope. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     }
     *
     *     // executes immediately:
     *     sayHi('Fred');
     *
     *     // executes after 2 seconds:
     *     Ext.Function.defer(sayHi, 2000, this, ['Fred']);
     *
     *     // this syntax is sometimes useful for deferring
     *     // execution of an anonymous function:
     *     Ext.Function.defer(function(){
     *         alert('Anonymous');
     *     }, 100);
     *
     * {@link Ext#defer Ext.defer} is alias for {@link Ext.Function#defer Ext.Function.defer}
     *
     * @param {Function} fn The function to defer.
     * @param {Number} millis The number of milliseconds for the `setTimeout` call
     * (if less than or equal to 0 the function is executed immediately).
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * **If omitted, defaults to the browser window.**
     * @param {Array} [args] Overrides arguments for the call. Defaults to the arguments passed by the caller.
     * @param {Boolean/Number} [appendArgs=false] If `true` args are appended to call args instead of overriding,
     * or, if a number, then the args are inserted at the specified position.
     * @return {Number} The timeout id that can be used with `clearTimeout`.
     */
    defer: function(fn, millis, scope, args, appendArgs) {
        fn = Ext.Function.bind(fn, scope, args, appendArgs);
        if (millis > 0) {
            return setTimeout(Ext.supports.TimeoutActualLateness ? function () {
                fn();
            } : fn, millis);
        }
        fn();
        return 0;
    },

    /**
     * Create a combined function call sequence of the original function + the passed function.
     * The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     };
     *
     *     sayHi('Fred'); // alerts "Hi, Fred"
     *
     *     var sayGoodbye = Ext.Function.createSequence(sayHi, function(name){
     *         alert('Bye, ' + name);
     *     });
     *
     *     sayGoodbye('Fred'); // both alerts show
     *
     * @param {Function} originalFn The original function.
     * @param {Function} newFn The function to sequence.
     * @param {Object} [scope] The scope (`this` reference) in which the passed function is executed.
     * If omitted, defaults to the scope in which the original function is called or the
     * default global environment object (usually the browser window).
     * @return {Function} The new function.
     */
    createSequence: function(originalFn, newFn, scope) {
        if (!newFn) {
            return originalFn;
        }
        else {
            return function() {
                var result = originalFn.apply(this, arguments);
                newFn.apply(scope || this, arguments);
                return result;
            };
        }
    },

    /**
     * Creates a delegate function, optionally with a bound scope which, when called, buffers
     * the execution of the passed function for the configured number of milliseconds.
     * If called again within that period, the impending invocation will be canceled, and the
     * timeout period will begin again.
     *
     * @param {Function} fn The function to invoke on a buffered timer.
     * @param {Number} buffer The number of milliseconds by which to buffer the invocation of the
     * function.
     * @param {Object} [scope] The scope (`this` reference) in which.
     * the passed function is executed. If omitted, defaults to the scope specified by the caller.
     * @param {Array} [args] Override arguments for the call. Defaults to the arguments
     * passed by the caller.
     * @return {Function} A function which invokes the passed function after buffering for the specified time.
     */
    createBuffered: function(fn, buffer, scope, args) {
        var timerId;

        return function() {
            var callArgs = args || Array.prototype.slice.call(arguments, 0),
                me = scope || this;

            if (timerId) {
                clearTimeout(timerId);
            }

            timerId = setTimeout(function(){
                fn.apply(me, callArgs);
            }, buffer);
        };
    },

    /**
     * Creates a wrapped function that, when invoked, defers execution until the next
     * animation frame
     * @private
     * @param {Function} fn
     * @param {Object} scope
     * @param {Array} args
     * @param {Number} [queueStrategy=3] A bit flag that indicates how multiple calls to
     * the returned function within the same animation frame should be handled.
     *
     * - 1: All calls will be queued - FIFO order
     * - 2: Only the first call will be queued
     * - 3: The last call will replace all previous calls
     *
     * @return {Function}
     */
    createAnimationFrame: function(fn, scope, args, queueStrategy) {
        var Function = Ext.Function,
            timerId;

        queueStrategy = queueStrategy || 3;

        return function() {
            var callArgs = args || Array.prototype.slice.call(arguments, 0);

            scope = scope || this;

            if (queueStrategy === 3) {
                Function.cancelAnimationFrame(timerId);
            }

            if ((queueStrategy & 1) || !timerId) {
                timerId = Function.requestAnimationFrame(function() {
                    timerId = null;
                    fn.apply(scope, callArgs);
                });
            }
        };
    },

    requestAnimationFrame: (function() {
        var lastTime = 0,
            win = window,
            requestAnimFrame = win.requestAnimationFrame || win.webkitRequestAnimationFrame ||
                win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
                function(callback) {
                    var currTime = Ext.now(),
                        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                        id = window.setTimeout(function() {
                            callback(currTime + timeToCall);
                        }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

        return function(fn) {
            return requestAnimFrame(fn);
        };
    })(),

    cancelAnimationFrame: (function() {
        var win = window,
            cancelAnimFrame = win.cancelAnimationFrame || win.webkitCancelAnimationFrame ||
                win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
                function(id) {
                    clearTimeout(id);
                };

        return function(id) {
            cancelAnimFrame(id);
        }
    })(),

    /**
     * Creates a throttled version of the passed function which, when called repeatedly and
     * rapidly, invokes the passed function only after a certain interval has elapsed since the
     * previous invocation.
     *
     * This is useful for wrapping functions which may be called repeatedly, such as
     * a handler of a mouse move event when the processing is expensive.
     *
     * @param {Function} fn The function to execute at a regular time interval.
     * @param {Number} interval The interval in milliseconds on which the passed function is executed.
     * @param {Object} [scope] The scope (`this` reference) in which
     * the passed function is executed. If omitted, defaults to the scope specified by the caller.
     * @returns {Function} A function which invokes the passed function at the specified interval.
     */
    createThrottled: function(fn, interval, scope) {
        var lastCallTime = 0,
            elapsed,
            lastArgs,
            timer,
            execute = function() {
                fn.apply(scope, lastArgs);
                lastCallTime = Ext.now();
                timer = null;
            };

        return function() {
            // Use scope of last call unless the creator specified a scope
            if (!scope) {
                scope = this;
            }
            elapsed = Ext.now() - lastCallTime;
            lastArgs = arguments;

            // If this is the first invocation, or the throttle interval has been reached, clear any
            // pending invocation, and call the target function now.
            if (elapsed >= interval) {
                clearTimeout(timer);
                execute();
            }
            // Throttle interval has not yet been reached. Only set the timer to fire if not already set.
            else if (!timer) {
                timer = setTimeout(execute, interval - elapsed);
            }
        };
    },

    /**
     * Wraps the passed function in a barrier function which will call the passed function after the passed number of invocations.
     * @param {Number} count The number of invocations which will result in the calling of the passed function.
     * @param {Function} fn The function to call after the required number of invocations.
     * @param {Object} scope The scope (`this` reference) in which the function will be called.
     */    
    createBarrier: function(count, fn, scope) {
        return function() {
            if (!--count) {
                fn.apply(scope, arguments);
            }
        };
    },

    /**
     * Adds behavior to an existing method that is executed before the
     * original behavior of the function.  For example:
     * 
     *     var soup = {
     *         contents: [],
     *         add: function(ingredient) {
     *             this.contents.push(ingredient);
     *         }
     *     };
     *     Ext.Function.interceptBefore(soup, "add", function(ingredient){
     *         if (!this.contents.length && ingredient !== "water") {
     *             // Always add water to start with
     *             this.contents.push("water");
     *         }
     *     });
     *     soup.add("onions");
     *     soup.add("salt");
     *     soup.contents; // will contain: water, onions, salt
     * 
     * @param {Object} object The target object
     * @param {String} methodName Name of the method to override
     * @param {Function} fn Function with the new behavior.  It will
     * be called with the same arguments as the original method.  The
     * return value of this function will be the return value of the
     * new method.
     * @param {Object} [scope] The scope to execute the interceptor function. Defaults to the object.
     * @return {Function} The new function just created.
     */
    interceptBefore: function(object, methodName, fn, scope) {
        var method = object[methodName] || Ext.emptyFn;

        return (object[methodName] = function() {
            var ret = fn.apply(scope || this, arguments);
            method.apply(this, arguments);

            return ret;
        });
    },

    /**
     * Adds behavior to an existing method that is executed after the
     * original behavior of the function.  For example:
     * 
     *     var soup = {
     *         contents: [],
     *         add: function(ingredient) {
     *             this.contents.push(ingredient);
     *         }
     *     };
     *     Ext.Function.interceptAfter(soup, "add", function(ingredient){
     *         // Always add a bit of extra salt
     *         this.contents.push("salt");
     *     });
     *     soup.add("water");
     *     soup.add("onions");
     *     soup.contents; // will contain: water, salt, onions, salt
     * 
     * @param {Object} object The target object
     * @param {String} methodName Name of the method to override
     * @param {Function} fn Function with the new behavior.  It will
     * be called with the same arguments as the original method.  The
     * return value of this function will be the return value of the
     * new method.
     * @param {Object} [scope] The scope to execute the interceptor function. Defaults to the object.
     * @return {Function} The new function just created.
     */
    interceptAfter: function(object, methodName, fn, scope) {
        var method = object[methodName] || Ext.emptyFn;

        return (object[methodName] = function() {
            method.apply(this, arguments);
            return fn.apply(scope || this, arguments);
        });
    },

    makeCallback: function (callback, scope) {
        //<debug>
        if (!scope[callback]) {
            if (scope.$className) {
                Ext.Error.raise('No method "' + callback + '" on ' + scope.$className);
            }
            Ext.Error.raise('No method "' + callback + '"');
        }
        //</debug>

        return function () {
            return scope[callback].apply(scope, arguments);
        };
    }
};

/**
 * @method
 * @member Ext
 * @inheritdoc Ext.Function#defer
 */
Ext.defer = Ext.Function.defer;

/**
 * @method
 * @member Ext
 * @inheritdoc Ext.Function#pass
 */
Ext.pass = Ext.Function.pass;

/**
 * @method
 * @member Ext
 * @inheritdoc Ext.Function#bind
 */
Ext.bind = Ext.Function.bind;
