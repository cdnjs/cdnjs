/**
 * @license MelonJS Game Engine
 * @copyright (C) 2011 - 2014 Olivier Biot, Jason Oster, Aaron McLeod
 * http://www.melonjs.org
 *
 * melonJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

/**
 * (<b>m</b>)elonJS (<b>e</b>)ngine : All melonJS functions are defined inside
 * of this namespace.
 * <p>You generally should not add new properties to this namespace as it may be
 * overwritten in future versions.</p>
 * @namespace
 */
window.me = window.me || {};

(function () {
    /**
     * me global references
     * @ignore
     */
    me.mod = "melonJS";
    me.version = "1.0.0";

    /**
     * Add support for AMD (Asynchronous Module Definition) libraries such as
     * require.js.
     * @ignore
     */
    if (typeof define === "function" && define.amd) {
        define("me", [], function () {
            return me;
        });
    }

    /**
     * global system settings and browser capabilities
     * @namespace
     */
    me.sys = {

        /*
         * Global settings
         */

        /**
         * Game FPS (default 60)
         * @type {number}
         * @memberOf me.sys
         */
        fps : 60,

        /**
         * enable/disable frame interpolation (default disable)<br>
         * @type {boolean}
         * @memberOf me.sys
         */
        interpolation : false,

        /**
         * Global scaling factor(default 1.0)
         * @type {me.Vector2d}
         * @memberOf me.sys
         */
        scale : null, //initialized by me.video.init

        /**
         * enable/disable video scaling interpolation (default disable)<br>
         * @type {boolean}
         * @memberOf me.sys
         */
        scalingInterpolation : false,

        /**
         * Global gravity settings <br>
         * will override entities init value if defined<br>
         * default value : undefined
         * @type {(number|undefined)}
         * @memberOf me.sys
         */
        gravity : undefined,

        /**
         * Specify either to stop on audio loading error or not<br>
         * if true, melonJS will throw an exception and stop loading<br>
         * if false, melonJS will disable sounds and output a warning message
         * in the console<br>
         * default value : true<br>
         * @type {boolean}
         * @memberOf me.sys
         */
        stopOnAudioError : true,

        /**
         * Specify whether to pause the game when losing focus.<br>
         * default value : true<br>
         * @type {boolean}
         * @memberOf me.sys
         */
        pauseOnBlur : true,

        /**
         * Specify whether to unpause the game when gaining focus.<br>
         * default value : true<br>
         * @type {boolean}
         * @memberOf me.sys
         */
        resumeOnFocus : true,

        /**
         * Specify whether to stop the game when losing focus or not<br>
         * The engine restarts on focus if this is enabled.
         * default value : false<br>
         * @type {boolean}
         * @memberOf me.sys
         */
        stopOnBlur : false,

        /**
         * Specify the rendering method for layers <br>
         * if false, visible part of the layers are rendered dynamically
         * (default)<br>
         * if true, the entire layers are first rendered into an offscreen
         * canvas<br>
         * the "best" rendering method depends of your game<br>
         * (amount of layer, layer size, amount of tiles per layer, etc…)<br>
         * note : rendering method is also configurable per layer by adding this
         * property to your layer (in Tiled)<br>
         * @type {boolean}
         * @memberOf me.sys
         */
        preRender : false,

        /*
         * System methods
         */

        /**
         * Compare two version strings
         * @public
         * @function
         * @param {string} first First version string to compare
         * @param {string} [second="1.0.0"] Second version string to compare
         * @return {number} comparison result <br>&lt; 0 : first &lt; second<br>
         * 0 : first == second<br>
         * &gt; 0 : first &gt; second
         * @example
         * if (me.sys.checkVersion("0.9.5") > 0) {
         *     console.error(
         *         "melonJS is too old. Expected: 0.9.5, Got: " + me.version
         *     );
         * }
         */
        checkVersion : function (first, second) {
            second = second || me.version;

            var a = first.split(".");
            var b = second.split(".");
            var len = Math.min(a.length, b.length);
            var result = 0;

            for (var i = 0; i < len; i++) {
                if ((result = +a[i] - +b[i])) {
                    break;
                }
            }

            return result ? result : a.length - b.length;
        }
    };

    // a flag to know if melonJS
    // is initialized
    var me_initialized = false;

    /*
     * DOM loading stuff
     */

    var readyBound = false, isReady = false, readyList = [];

    // Handle when the DOM is ready
    function domReady() {
        // Make sure that the DOM is not already loaded
        if (!isReady) {
            // be sure document.body is there
            if (!document.body) {
                return setTimeout(domReady, 13);
            }

            // clean up loading event
            if (document.removeEventListener) {
                document.removeEventListener(
                    "DOMContentLoaded",
                    domReady,
                    false
                );
            }
            else {
                window.removeEventListener("load", domReady, false);
            }

            // Remember that the DOM is ready
            isReady = true;

            // execute the defined callback
            for (var fn = 0; fn < readyList.length; fn++) {
                readyList[fn].call(window, []);
            }
            readyList.length = 0;
        }
    }

    // bind ready
    function bindReady() {
        if (readyBound) {
            return;
        }
        readyBound = true;

        // directly call domReady if document is already "ready"
        if (document.readyState === "complete") {
            return domReady();
        }
        else {
            if (document.addEventListener) {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", domReady, false);
            }
            // A fallback to window.onload, that will always work
            window.addEventListener("load", domReady, false);
        }
    }

    /**
     * The built in window Object
     * @external window
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window.window|window}
     */

    /**
     * Specify a function to execute when the DOM is fully loaded
     * @memberOf external:window#
     * @alias onReady
     * @param {Function} handler A function to execute after the DOM is ready.
     * @example
     * // small main skeleton
     * var game = {
     *    // Initialize the game
     *    // called by the window.onReady function
     *    onload : function () {
     *       // init video
     *       if (!me.video.init('screen', 640, 480, true)) {
     *          alert("Sorry but your browser does not support html 5 canvas.");
     *          return;
     *       }
     *
     *       // initialize the "audio"
     *       me.audio.init("mp3,ogg");
     *
     *       // set callback for ressources loaded event
     *       me.loader.onload = this.loaded.bind(this);
     *
     *       // set all ressources to be loaded
     *       me.loader.preload(game.resources);
     *
     *       // load everything & display a loading screen
     *       me.state.change(me.state.LOADING);
     *    },
     *
     *    // callback when everything is loaded
     *    loaded : function () {
     *       // define stuff
     *       // ....
     *
     *       // change to the menu screen
     *       me.state.change(me.state.MENU);
     *    }
     * }; // game
     *
     * // "bootstrap"
     * window.onReady(function () {
     *    game.onload();
     * });
     */
    window.onReady = function (fn) {
        // Attach the listeners
        bindReady();

        // If the DOM is already ready
        if (isReady) {
            // Execute the function immediately
            fn.call(window, []);
        }
        else {
            // Add the function to the wait list
            readyList.push(function () {
                return fn.call(window, []);
            });
        }
        return this;
    };

    // call the library init function when ready
    if (me.skipAutoInit !== true) {
        window.onReady(function () {
            _init_ME();
        });
    }
    else {
        me.init = function () {
            _init_ME();
            domReady();
        };
    }

    /*
     * some "Javascript API" patch & enhancement
     */

    var initializing = false, fnTest = /var xyz/.test(function () {
        /** @nosideeffects */
        /* jshint ignore:start */
        var xyz;
        /* jshint ignore:end */
    }) ? /\bparent\b/ : /[\D|\d]*/;

    /**
     * The built in Object Object.
     * @external Object
     * @see {@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object|Object}
     */

    if (!Object.defineProperty) {
        /**
         * simple defineProperty function definition (if not supported by the
         * browser)<br>
         * if defineProperty is redefined, internally use __defineGetter__/
         * __defineSetter__ as fallback
         * @param {Object} obj The object on which to define the property.
         * @param {string} prop The name of the property to be defined or
         * modified.
         * @param {Object} desc The descriptor for the property being defined or
         * modified.
         */
        Object.defineProperty = function (obj, prop, desc) {
            // check if Object support __defineGetter function
            if (obj.__defineGetter__) {
                if (desc.get) {
                    obj.__defineGetter__(prop, desc.get);
                }
                if (desc.set) {
                    obj.__defineSetter__(prop, desc.set);
                }
            }
            else {
                // we should never reach this point....
                throw "melonJS: Object.defineProperty not supported";
            }
        };
    }

    /**
     * Can be used to mix modules, to combine abilities
     * @name mixin
     * @memberOf external:Object#
     * @function
     * @param {Object} obj the object you want to throw in the mix
     */
    Object.defineProperty(Object.prototype, "mixin", {
        value: function (obj) {
            var i,
            self = this;

            // iterate over the mixin properties
            for (i in obj) {
                // if the current property belongs to the mixin
                if (obj.hasOwnProperty(i)) {
                    // add the property to the mix
                    self[i] = obj[i];
                }
            }
            // return the mixed object
            return self;
        },
        enumerable : false,
        configurable : false
    });

    /**
     * a deep copy function
     * @ignore
     */
    var deepcopy = function (obj) {

        if (null == obj || "object" !== typeof obj) {
            return obj;
        }

        // hold the copied object
        var copy;

        // Array copy
        if (obj instanceof Array) {
            copy = [];
            Object.setPrototypeOf(copy, Object.getPrototypeOf(obj));
            for (var i = 0, l = obj.length; i < l; i++) {
                copy[i] = deepcopy(obj[i]);
            }
            return copy;
        }

        // Date copy
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // else instanceof Object
        copy = {};
        Object.setPrototypeOf(copy, Object.getPrototypeOf(obj));
        for (var prop in obj ) {
            if (obj.hasOwnProperty(prop)) {
                copy[prop] = deepcopy(obj[prop]);
            }
        }
        return copy;
    };

    /**
     * JavaScript Inheritance Helper <br>
     * Based on <a href="http://ejohn.org/">John Resig</a> Simple Inheritance<br>
     * MIT Licensed.<br>
     * Inspired by <a href="http://code.google.com/p/base2/">base2</a> and
     * <a href="http://www.prototypejs.org/">Prototype</a><br>
     * @name extend
     * @memberOf external:Object#
     * @function
     * @param {Object} object Object (or Properties) to inherit from
     * @example
     * var Person = Object.extend(
     * {
     *    init : function (isDancing)
     *    {
     *       this.dancing = isDancing;
     *    },
     *    dance : function ()
     *    {
     *       return this.dancing;
     *    }
     * });
     *
     * var Ninja = Person.extend(
     * {
     *    init : function ()
     *    {
     *       this.parent(false );
     *    },
     *
     *    dance : function ()
     *    {
     *       // Call the inherited version of dance()
     *       return this.parent();
     *    },
     *
     *    swingSword : function ()
     *    {
     *       return true;
     *    }
     * });
     *
     * var p = new Person(true);
     * p.dance(); // => true
     *
     * var n = new Ninja();
     * n.dance(); // => false
     * n.swingSword(); // => true
     *
     * // Should all be true
     * p instanceof Person && p instanceof Class &&
     * n instanceof Ninja && n instanceof Person && n instanceof Class
     */
    Object.extend = function (prop) {
        // _super rename to parent to ease code reading
        var parent = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var proto = new this();
        initializing = false;

        function addSuper(name, fn) {
            return function () {
                var tmp = this.parent;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this.parent = parent[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this.parent = tmp;

                return ret;
            };
        }

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            if (prop.hasOwnProperty(name)) {
                // Check if we're overwriting an existing function
                proto[name] = (
                    typeof prop[name] === "function" &&
                    typeof parent[name] === "function" &&
                    fnTest.test(prop[name])
                ) ? addSuper(name, prop[name]) : prop[name];
            }
        }

        // The dummy class constructor
        function Class() {
            if (!initializing) {
                /* jshint ignore:start */
                for (var prop in this) {
                    // deepcopy properties if required
                    if (typeof(this[prop]) === "object") {
                        this[prop] = deepcopy(this[prop]);
                    }
                }
                /* jshint ignore:end */
                if (this.init) {
                    this.init.apply(this, arguments);
                }
            }
            return this;
        }
        // Populate our constructed prototype object
        Class.prototype = proto;
        // Enforce the constructor to be what we expect
        Class.constructor = Class;
        // And make this class extendable
        Class.extend = Object.extend;//arguments.callee;

        return Class;
    };

    if (typeof Object.create !== "function") {
        /**
         * Prototypal Inheritance Create Helper
         * @name create
         * @memberOf external:Object#
         * @function
         * @param {Object} Object
         * @example
         * // declare oldObject
         * oldObject = new Object();
         * // make some crazy stuff with oldObject (adding functions, etc...)
         * ...
         * ...
         *
         * // make newObject inherits from oldObject
         * newObject = Object.create(oldObject);
         */
        Object.create = function (o) {
            var Fn = function () {};
            Fn.prototype = o;
            return new Fn();
        };
    }

    /**
     * The built in Function Object
     * @external Function
     * @see {@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function|Function}
     */
    if (!Function.prototype.bind) {
        /** @ignore */
        var Empty = function () {};

        /**
         * Binds this function to the given context by wrapping it in another
         * function and returning the wrapper.<br>
         * Whenever the resulting "bound" function is called, it will call the
         * original ensuring that this is set to context.<br>
         * Also optionally curries arguments for the function.
         * @memberof! external:Function#
         * @alias bind
         * @param {Object} context the object to bind to.
         * @param {} [arguments...] Optional additional arguments to curry for
         * the function.
         * @example
         * // Ensure the callback is triggered with the right object context:
         * myObject.onComplete(this.callback.bind(this));
         */
        Function.prototype.bind = function bind(that) {
            // ECMAScript 5 compliant implementation
            // http://es5.github.com/#x15.3.4.5
            // from https://github.com/kriskowal/es5-shim
            var target = this;
            if (typeof target !== "function") {
                throw new TypeError(
                    "Function.prototype.bind called on incompatible " + target
                );
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var bound = function () {
                if (this instanceof bound) {
                    var result = target.apply(this, args.concat(
                        Array.prototype.slice.call(arguments)
                    ));
                    if (Object(result) === result) {
                        return result;
                    }
                    return this;
                }
                else {
                    return target.apply(that, args.concat(
                        Array.prototype.slice.call(arguments)
                    ));
                }
            };
            if (target.prototype) {
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                Empty.prototype = null;
            }
            return bound;
        };
    }

    if (!window.throttle) {
        /**
         * a simple throttle function
         * use same fct signature as the one in prototype
         * in case it's already defined before
         * @ignore
         */
        window.throttle = function (delay, no_trailing, callback) {
            var last = window.performance.now(), deferTimer;
            // `no_trailing` defaults to false.
            if (typeof no_trailing !== "boolean") {
                no_trailing = false;
            }
            return function () {
                var now = window.performance.now();
                var elasped = now - last;
                var args = arguments;
                if (elasped < delay) {
                    if (no_trailing === false) {
                        // hold on to it
                        clearTimeout(deferTimer);
                        deferTimer = setTimeout(function () {
                            last = now;
                            return callback.apply(null, args);
                        }, elasped);
                    }
                }
                else {
                    last = now;
                    return callback.apply(null, args);
                }
            };
        };
    }

    if (typeof Date.now === "undefined") {
        /**
         * provide a replacement for browser not
         * supporting Date.now (JS 1.5)
         * @ignore
         */
        Date.now = function () {
            return new Date().getTime();
        };
    }

    // define window.performance if undefined
    if (typeof window.performance === "undefined") {
        window.performance = {};
    }

    if (!window.performance.now) {
        var timeOffset = Date.now();

        if (window.performance.timing &&
            window.performance.timing.navigationStart) {
            timeOffset = window.performance.timing.navigationStart;
        }
        /**
         * provide a polyfill for window.performance now
         * to provide consistent time information across browser
         * (always return the elapsed time since the browser started)
         * @ignore
         */
        window.performance.now = function () {
            return Date.now() - timeOffset;
        };
    }

    if (typeof console === "undefined") {
        /**
         * Dummy console.log to avoid crash
         * in case the browser does not support it
         * @ignore
         */
        console = { // jshint ignore:line
            log : function () {},
            info : function () {},
            error : function () {
                alert(Array.prototype.slice.call(arguments).join(", "));
            }
        };
    }

    /**
     * Executes a function as soon as the interpreter is idle (stack empty).
     * @memberof! external:Function#
     * @alias defer
     * @param {Object} context The execution context of the deferred function.
     * @param {} [arguments...] Optional additional arguments to carry for the
     * function.
     * @return {Number} id that can be used to clear the deferred function using
     * clearTimeout
     * @example
     * // execute myFunc() when the stack is empty,
     * // with the current context and 'myArgument' as parameter
     * myFunc.defer(this, 'myArgument');
     */
    Function.prototype.defer = function () {
        return setTimeout(this.bind.apply(this, arguments), 0.01);
    };

    /* jshint ignore:start */
    /**
     * Get the prototype of an Object.
     * @memberOf external:Object#
     * @alias getPrototypeOf
     * @param {Object} obj Target object to inspect.
     * @return {Prototype} Prototype of the target object.
     */
    Object.getPrototypeOf = Object.getPrototypeOf || function (obj) {
        return obj.__proto__;
    };

    /**
     * Set the prototype of an Object.
     * @memberOf external:Object#
     * @alias setPrototypeOf
     * @param {Object} obj Target object to modify.
     * @param {Prototype} prototype New prototype for the target object.
     * @return {Object} Modified target object.
     */
    Object.setPrototypeOf = Object.setPrototypeOf || function (obj, prototype) {
        obj.__proto__ = prototype;
        return obj;
    };
    /* jshint ignore:end */

    /**
     * The built in String Object
     * @external String
     * @see {@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String|String}
     */
    if (!String.prototype.trim) {
        /**
         * returns the string stripped of whitespace from both ends
         * @memberof! external:String#
         * @alias trim
         * @return {string} trimmed string
         */
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/gm, "");

        };
    }

    if (!String.prototype.trimLeft) {
        /**
         * returns the string stripped of whitespace from the left.
         * @memberof! external:String#
         * @alias trimLeft
         * @return {string} trimmed string
         */
        String.prototype.trimLeft = function () {
            return this.replace(/^\s+/, "");
        };
    }

    if (!String.prototype.trimRight) {
        /**
         * returns the string stripped of whitespace from the right.
         * @memberof! external:String#
         * @alias trimRight
         * @return {string} trimmed string
         */
        String.prototype.trimRight = function () {
            return this.replace(/\s+$/, "");
        };
    }

    /**
     * add isNumeric fn to the string object
     * @memberof! external:String#
     * @alias isNumeric
     * @return {boolean} true if string contains only digits
     */
    String.prototype.isNumeric = function () {
        return (this !== null && !isNaN(this) && this.trim() !== "");
    };

    /**
     * add a isBoolean fn to the string object
     * @memberof! external:String#
     * @alias isBoolean
     * @return {boolean} true if the string is either true or false
     */
    String.prototype.isBoolean = function () {
        return (
            this !== null &&
            ("true" === this.trim() || "false" === this.trim())
        );
    };

    if (!String.prototype.contains) {
        /**
         * determines whether or not a string contains another string.
         * @memberof! external:String#
         * @alias contains
         * @param {string} str A string to be searched for within this string.
         * @param {number} [startIndex=0] The position in this string at which
         * to begin searching for given string.
         * @return {boolean} true if contains the specified string
         */
        String.prototype.contains = function (str, startIndex) {
            return -1 !== String.prototype.indexOf.call(this, str, startIndex);
        };
    }

    /**
     * convert the string to hex value
     * @memberof! external:String#
     * @alias toHex
     * @return {string}
     */
    String.prototype.toHex = function () {
        var res = "", c = 0;
        while (c < this.length) {
            res += this.charCodeAt(c++).toString(16);
        }
        return res;
    };

    /**
     * The built in Number Object
     * @external Number
     * @see {@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number|Number}
     */

    /**
     * add a clamp fn to the Number object
     * @memberof! external:Number#
     * @alias clamp
     * @param {number} low lower limit
     * @param {number} high higher limit
     * @return {number} clamped value
     */
    Number.prototype.clamp = function (low, high) {
        return this < low ? low : this > high ? high : +this;
    };

    /**
     * return a random between min, max
     * @memberof! external:Number#
     * @alias random
     * @param {number} min minimum value.
     * @param {number} max maximum value.
     * @return {number} random value
     */
    Number.prototype.random = function (min, max) {
        return (~~(Math.random() * (max - min + 1)) + min);
    };

    /**
     * round a value to the specified number of digit
     * @memberof! external:Number#
     * @alias round
     * @param {number} [num="Object value"] value to be rounded.
     * @param {number} dec number of decimal digit to be rounded to.
     * @return {number} rounded value
     * @example
     * // round a specific value to 2 digits
     * Number.prototype.round (10.33333, 2); // return 10.33
     * // round a float value to 4 digits
     * num = 10.3333333
     * num.round(4); // return 10.3333
     */
    Number.prototype.round = function () {
        // if only one argument use the object value
        var num = (arguments.length < 2) ? this : arguments[0];
        var powres = Math.pow(10, arguments[1] || arguments[0] || 0);
        return (Math.round(num * powres) / powres);
    };

    /**
     * a quick toHex function<br>
     * given number <b>must</b> be an int, with a value between 0 and 255
     * @memberof! external:Number#
     * @alias toHex
     * @return {string} converted hexadecimal value
     */
    Number.prototype.toHex = function () {
        return "0123456789ABCDEF".charAt((this - (this % 16)) >> 4) +
            "0123456789ABCDEF".charAt(this % 16);
    };

    /**
     * Returns a value indicating the sign of a number<br>
     * @memberof! external:Number#
     * @alias sign
     * @return {number} sign of a the number
     */
    Number.prototype.sign = function () {
        return this < 0 ? -1 : (this > 0 ? 1 : 0);
    };

    /**
     * Converts an angle in degrees to an angle in radians
     * @memberof! external:Number#
     * @alias degToRad
     * @param {number} [angle="angle"] angle in degrees
     * @return {number} corresponding angle in radians
     * @example
     * // convert a specific angle
     * Number.prototype.degToRad (60); // return 1.0471...
     * // convert object value
     * var num = 60
     * num.degToRad(); // return 1.0471...
     */
    Number.prototype.degToRad = function (angle) {
        return (angle || this) / 180.0 * Math.PI;
    };

    /**
     * Converts an angle in radians to an angle in degrees.
     * @memberof! external:Number#
     * @alias radToDeg
     * @param {number} [angle="angle"] angle in radians
     * @return {number} corresponding angle in degrees
     * @example
     * // convert a specific angle
     * Number.prototype.radToDeg (1.0471975511965976); // return 59.9999...
     * // convert object value
     * num = 1.0471975511965976
     * Math.ceil(num.radToDeg()); // return 60
     */
    Number.prototype.radToDeg = function (angle) {
        return (angle || this) * (180.0 / Math.PI);
    };

    /**
     * The built in Array Object
     * @external Array
     * @see {@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array|Array}
     */

    /**
     * Remove the specified object from the Array<br>
     * @memberof! external:Array#
     * @alias remove
     * @param {Object} object to be removed
     */
    Array.prototype.remove = function (obj) {
        var i = Array.prototype.indexOf.call(this, obj);
        if (i !== -1) {
            Array.prototype.splice.call(this, i, 1);
        }
        return this;
    };

    if (!Array.prototype.forEach) {
        /**
         * provide a replacement for browsers that don't
         * support Array.prototype.forEach (JS 1.6)
         * @ignore
         */
        Array.prototype.forEach = function (callback, scope) {
            for (var i = 0, j = this.length; j--; i++) {
                callback.call(scope || this, this[i], i, this);
            }
        };
    }

    if (!Array.isArray) {
        /**
         * provide a replacement for browsers that don't
         * natively support Array.isArray
         * @ignore
         */
        Array.isArray = function (vArg) {
            var isArray;
            isArray = vArg instanceof Array;
            return isArray;
        };
    }

    Object.defineProperty(me, "initialized", {
        get : function get() {
            return me_initialized;
        }
    });

    /*
     * me init stuff
     */

    function _init_ME() {
        // don't do anything if already initialized (should not happen anyway)
        if (me_initialized) {
            return;
        }

        // check the device capabilites
        me.device._check();

        // initialize me.save
        me.save._init();

        // enable/disable the cache
        me.loader.setNocache(
            document.location.href.match(/\?nocache/) || false
        );

        // init the FPS counter if needed
        me.timer.init();

        // create a new map reader instance
        me.mapReader = new me.TMXMapReader();

        // init the App Manager
        me.state.init();

        // init the Entity Pool
        me.pool.init();

        // automatically enable keyboard events if on desktop
        if (me.device.isMobile === false) {
            me.input._enableKeyboardEvent();
        }

        // init the level Director
        me.levelDirector.reset();

        me_initialized = true;
    }

    /**
     * me.game represents your current game, it contains all the objects,
     * tilemap layers, current viewport, collision map, etc...<br>
     * me.game is also responsible for updating (each frame) the object status
     * and draw them<br>
     * @namespace me.game
     * @memberOf me
     */
    me.game = (function () {
        // hold public stuff in our singleton
        var api = {};

        /*
         * PRIVATE STUFF
         */

        // ref to the "system" context
        var frameBuffer = null;

        // flag to redraw the sprites
        var initialized = false;

        // to know when we have to refresh the display
        var isDirty = true;

        // frame counter for frameSkipping
        // reset the frame counter
        var frameCounter = 0;
        var frameRate = 1;

        /*
         * PUBLIC STUFF
         */

        /**
         * a reference to the game viewport.
         * @public
         * @type {me.Viewport}
         * @name viewport
         * @memberOf me.game
         */
        api.viewport = null;

        /**
         * a reference to the game collision Map
         * @public
         * @type {me.TMXLayer}
         * @name collisionMap
         * @memberOf me.game
         */
        api.collisionMap = null;

        /**
         * a reference to the game current level
         * @public
         * @type {me.TMXTileMap}
         * @name currentLevel
         * @memberOf me.game
         */
        api.currentLevel = null;

        /**
         * a reference to the game world <br>
         * a world is a virtual environment containing all the game objects
         * @public
         * @type {me.ObjectContainer}
         * @name world
         * @memberOf me.game
         */
        api.world = null;

        /**
         * when true, all objects will be added under the root world container<br>
         * when false, a `me.ObjectContainer` object will be created for each
         * corresponding `TMXObjectGroup`
         * default value : true
         * @public
         * @type {boolean}
         * @name mergeGroup
         * @memberOf me.game
         */
        api.mergeGroup = true;

        /**
         * The property of should be used when sorting entities <br>
         * value : "x", "y", "z" (default: "z")
         * @public
         * @type {string}
         * @name sortOn
         * @memberOf me.game
         */
        api.sortOn = "z";

        /**
         * default layer renderer
         * @private
         * @ignore
         * @type {me.TMXRenderer}
         * @name renderer
         * @memberOf me.game
         */
        api.renderer = null;

        // FIX ME : put this somewhere else
        api.NO_OBJECT = 0;

        /**
         * Default object type constant.<br>
         * See type property of the returned collision vector.
         * @const
         * @name ENEMY_OBJECT
         * @memberOf me.game
         */
        api.ENEMY_OBJECT = 1;

        /**
         * Default object type constant.<br>
         * See type property of the returned collision vector.
         * @const
         * @name COLLECTABLE_OBJECT
         * @memberOf me.game
         */
        api.COLLECTABLE_OBJECT = 2;

        /**
         * Default object type constant.<br>
         * See type property of the returned collision vector.
         * @const
         * @name ACTION_OBJECT
         * @memberOf me.game
         */
        api.ACTION_OBJECT = 3; // door, etc...

        /**
         * Fired when a level is fully loaded and <br>
         * and all entities instantiated. <br>
         * Additionnaly the level id will also be passed
         * to the called function.
         * @public
         * @callback
         * @name onLevelLoaded
         * @memberOf me.game
         * @example
         * // call myFunction () everytime a level is loaded
         * me.game.onLevelLoaded = this.myFunction.bind(this);
         */
        api.onLevelLoaded = null;

        /**
         * Initialize the game manager
         * @name init
         * @memberOf me.game
         * @private
         * @ignore
         * @function
         * @param {Number} [width] width of the canvas
         * @param {Number} [height] width of the canvas
         * init function.
         */
        api.init = function (width, height) {
            if (!initialized) {
                // if no parameter specified use the system size
                width  = width  || me.video.getWidth();
                height = height || me.video.getHeight();

                // create a defaut viewport of the same size
                api.viewport = new me.Viewport(0, 0, width, height);

                //the root object of our world is an entity container
                api.world = new me.ObjectContainer(0, 0, width, height);
                // give it a name
                api.world.name = "rootContainer";

                // get a ref to the screen buffer
                frameBuffer = me.video.getSystemContext();

                // publish init notification
                me.event.publish(me.event.GAME_INIT);

                // translate global pointer events
                me.input._translatePointerEvents();

                // make display dirty by default
                isDirty = true;

                // dummy current level
                api.currentLevel = {
                    pos : {
                        x : 0,
                        y : 0
                    }
                };

                // set as initialized
                initialized = true;
            }
        };

        /**
         * reset the game Object manager<p>
         * destroy all current objects
         * @name reset
         * @memberOf me.game
         * @public
         * @function
         */
        api.reset = function () {
            // remove all objects
            api.world.destroy();

            // reset the viewport to zero ?
            if (api.viewport) {
                api.viewport.reset();
            }
            // dummy current level
            api.currentLevel = {
                pos : {
                    x : 0,
                    y : 0
                }
            };

            // reset the transform matrix to the normal one
            frameBuffer.setTransform(1, 0, 0, 1, 0, 0);

            // reset the frame counter
            frameCounter = 0;
            frameRate = Math.round(60 / me.sys.fps);
        };

        /**
         * Returns the parent container of the specified Child in the game world
         * @name getParentContainer
         * @memberOf me.game
         * @function
         * @param {me.Renderable} child
         * @return {me.ObjectContainer}
         */
        api.getParentContainer = function (child) {
            return child.ancestor;
        };

        /**
         * force the redraw (not update) of all objects
         * @name repaint
         * @memberOf me.game
         * @public
         * @function
         */

        api.repaint = function () {
            isDirty = true;
        };


        /**
         * update all objects of the game manager
         * @name update
         * @memberOf me.game
         * @private
         * @ignore
         * @function
         * @param {Number} time current timestamp as provided by the RAF callback
         */
        api.update = function (time) {
            // handle frame skipping if required
            if ((++frameCounter % frameRate) === 0) {
                // reset the frame counter
                frameCounter = 0;

                // update the timer
                me.timer.update(time);

                // update all objects (andd pass the elapsed time since last frame)
                isDirty = api.world.update(me.timer.getDelta()) || isDirty;

                // update the camera/viewport
                isDirty = api.viewport.update(me.timer.getDelta()) || isDirty;
            }
        };

        /**
         * draw all existing objects
         * @name draw
         * @memberOf me.game
         * @private
         * @ignore
         * @function
         */
        api.draw = function () {
            if (isDirty) {
                // cache the viewport rendering position, so that other object
                // can access it later (e,g. entityContainer when drawing floating objects)
                var translateX = api.viewport.pos.x + ~~api.viewport.offset.x;
                var translateY = api.viewport.pos.y + ~~api.viewport.offset.y;

                // translate the world coordinates by default to screen coordinates
                api.world.transform.translate(-translateX, -translateY);

                // substract the map offset to current the current pos
                api.viewport.screenX = translateX - api.currentLevel.pos.x;
                api.viewport.screenY = translateY - api.currentLevel.pos.y;

                // update all objects,
                // specifying the viewport as the rectangle area to redraw
                api.world.draw(frameBuffer, api.viewport);

                // translate back
                api.world.transform.translate(translateX, translateY);

                // draw our camera/viewport
                api.viewport.draw(frameBuffer);
            }

            isDirty = false;

            // blit our frame
            me.video.blitSurface();
        };

        // return our object
        return api;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014, Olivier Biot, Jason Oster
 * http://www.melonjs.org/
 *
 */
(function () {
    /**
     * Convert first character of a string to uppercase, if it's a letter.
     * @ignore
     * @function
     * @name wordUpperCase
     * @param  {String} str Input string.
     * @return {String} String with first letter made uppercase.
     */
    var capitalize = function (str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
    };

    /**
     * A collection of utilities to ease porting between different user agents.
     * @namespace me.agent
     * @memberOf me
     */
    me.agent = (function () {
        var api = {};

        /**
         * Known agent vendors
         * @ignore
         */
        var vendors = [ "ms", "MS", "moz", "webkit", "o" ];

        /**
         * Get a vendor-prefixed property
         * @public
         * @name prefixed
         * @function
         * @param {String} name Property name
         * @param {Object} [obj=window] Object or element reference to access
         * @return {Mixed} Value of property
         * @memberOf me.agent
         */
        api.prefixed = function (name, obj) {
            obj = obj || window;
            if (name in obj) {
                return obj[name];
            }

            var uc_name = capitalize(name);

            var result;
            vendors.some(function (vendor) {
                var name = vendor + uc_name;
                return (result = (name in obj) ? obj[name] : undefined);
            });
            return result;
        };

        /**
         * Set a vendor-prefixed property
         * @public
         * @name setPrefixed
         * @function
         * @param {String} name Property name
         * @param {Mixed} value Property value
         * @param {Object} [obj=window] Object or element reference to access
         * @memberOf me.agent
         */
        api.setPrefixed = function (name, value, obj) {
            obj = obj || window;
            if (name in obj) {
                obj[name] = value;
                return;
            }

            var uc_name = capitalize(name);

            vendors.some(function (vendor) {
                var name = vendor + uc_name;
                if (name in obj) {
                    obj[name] = value;
                    return true;
                }
                return false;
            });
        };

        return api;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013 melonJS
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * A singleton object representing the device capabilities and specific events
     * @namespace me.device
     * @memberOf me
     */
    me.device = (function () {
        // defines object for holding public information/functionality.
        var obj = {};
        // private properties
        var accelInitialized = false;
        var deviceOrientationInitialized = false;
        var devicePixelRatio = null;

        /**
         * check the device capapbilities
         * @ignore
         */
        obj._check = function () {

            // detect device type/platform
            me.device._detectDevice();

            // future proofing (MS) feature detection
            me.device.pointerEnabled = me.agent.prefixed("pointerEnabled", navigator);
            navigator.maxTouchPoints = me.agent.prefixed("maxTouchPoints", navigator) || 0;
            window.gesture = me.agent.prefixed("gesture");

            // detect touch capabilities
            me.device.touch = ("createTouch" in document) || ("ontouchstart" in window) ||
                              (navigator.isCocoonJS) || (navigator.maxTouchPoints > 0);

            // accelerometer detection
            me.device.hasAccelerometer = (
                (typeof (window.DeviceMotionEvent) !== "undefined") || (
                    (typeof (window.Windows) !== "undefined") &&
                    (typeof (Windows.Devices.Sensors.Accelerometer) === "function")
                )
            );

            // pointerlock detection
            this.hasPointerLockSupport = me.agent.prefixed("pointerLockElement", document);

            if (this.hasPointerLockSupport) {
                document.exitPointerLock = me.agent.prefixed("exitPointerLock", document);
            }

            // device motion detection
            if (window.DeviceOrientationEvent) {
                me.device.hasDeviceOrientation = true;
            }

            // fullscreen api detection & polyfill when possible
            this.hasFullscreenSupport = me.agent.prefixed("fullscreenEnabled", document) ||
                                        document.mozFullScreenEnabled;

            document.exitFullscreen = me.agent.prefixed("cancelFullScreen", document) ||
                                      me.agent.prefixed("exitFullscreen", document);

            // vibration API poyfill
            navigator.vibrate = me.agent.prefixed("vibrate", navigator);

            try {
                obj.localStorage = !!window.localStorage;
            } catch (e) {
                // the above generates an exception when cookies are blocked
                obj.localStorage = false;
            }

            // set pause/stop action on losing focus
            window.addEventListener("blur", function () {
                if (me.sys.stopOnBlur) {
                    me.state.stop(true);
                }
                if (me.sys.pauseOnBlur) {
                    me.state.pause(true);
                }
            }, false);
            // set restart/resume action on gaining focus
            window.addEventListener("focus", function () {
                if (me.sys.stopOnBlur) {
                    me.state.restart(true);
                }
                if (me.sys.resumeOnFocus) {
                    me.state.resume(true);
                }
            }, false);


            // Set the name of the hidden property and the change event for visibility
            var hidden, visibilityChange;
            if (typeof document.hidden !== "undefined") {
                // Opera 12.10 and Firefox 18 and later support
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            } else if (typeof document.mozHidden !== "undefined") {
                hidden = "mozHidden";
                visibilityChange = "mozvisibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            }
                 
            // register on the event if supported
            if (typeof (visibilityChange) === "string") {
                // add the corresponding event listener
                document.addEventListener(visibilityChange,
                    function () {
                        if (document[hidden]) {
                            if (me.sys.stopOnBlur) {
                                me.state.stop(true);
                            }
                            if (me.sys.pauseOnBlur) {
                                me.state.pause(true);
                            }
                        } else {
                            if (me.sys.stopOnBlur) {
                                me.state.restart(true);
                            }
                            if (me.sys.resumeOnFocus) {
                                me.state.resume(true);
                            }
                        }
                    }, false
                );
            }
        };

        /**
         * detect the device type
         * @ignore
         */
        obj._detectDevice = function () {
            // detect platform
            me.device.isMobile = me.device.ua.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone|Mobi/i) || false;
            // iOS Device ?
            me.device.iOS = me.device.ua.match(/iPhone|iPad|iPod/i) || false;
            // Android Device ?
            me.device.android = me.device.ua.match(/android/i) || false;
            me.device.android2 = me.device.ua.match(/android 2/i) || false;
            // Windows Device ?
            me.device.wp = me.device.ua.match(/Windows Phone/i) || false;
        };
        
        /*
         * PUBLIC Properties & Functions
         */

        // Browser capabilities

        /**
         * Browser User Agent
         * @type Boolean
         * @readonly
         * @name ua
         * @memberOf me.device
         */
        obj.ua = navigator.userAgent;

        /**
         * Browser Local Storage capabilities <br>
         * (this flag will be set to false if cookies are blocked)
         * @type Boolean
         * @readonly
         * @name localStorage
         * @memberOf me.device
         */
        obj.localStorage = false;

        /**
         * Browser accelerometer capabilities
         * @type Boolean
         * @readonly
         * @name hasAccelerometer
         * @memberOf me.device
         */
        obj.hasAccelerometer = false;

        /**
         * Browser device orientation
         * @type Boolean
         * @readonly
         * @name hasDeviceOrientation
         * @memberOf me.device
         */
        obj.hasDeviceOrientation = false;

        /**
         * Browser full screen support
         * @type Boolean
         * @readonly
         * @name hasFullscreenSupport
         * @memberOf me.device
         */
        obj.hasFullscreenSupport = false;

         /**
         * Browser pointerlock api support
         * @type Boolean
         * @readonly
         * @name hasPointerLockSupport
         * @memberOf me.device
         */
        obj.hasPointerLockSupport = false;

        /**
         * Browser Base64 decoding capability
         * @type Boolean
         * @readonly
         * @name nativeBase64
         * @memberOf me.device
         */
        obj.nativeBase64 = (typeof(window.atob) === "function");

        /**
         * Touch capabilities
         * @type Boolean
         * @readonly
         * @name touch
         * @memberOf me.device
         */
        obj.touch = false;

        /**
         * equals to true if a mobile device <br>
         * (Android | iPhone | iPad | iPod | BlackBerry | Windows Phone)
         * @type Boolean
         * @readonly
         * @name isMobile
         * @memberOf me.device
         */
        obj.isMobile = false;

        /**
         * equals to true if the device is an iOS platform <br>
         * @type Boolean
         * @readonly
         * @name iOS
         * @memberOf me.device
         */
        obj.iOS = false;

        /**
         * equals to true if the device is an Android platform <br>
         * @type Boolean
         * @readonly
         * @name android
         * @memberOf me.device
         */
        obj.android = false;

        /**
         * equals to true if the device is an Android 2.x platform <br>
         * @type Boolean
         * @readonly
         * @name android2
         * @memberOf me.device
         */
        obj.android2 = false;

         /**
         * equals to true if the device is an Windows Phone platform <br>
         * @type Boolean
         * @readonly
         * @name wp
         * @memberOf me.device
         */
        obj.wp = false;

        /**
         * The device current orientation status. <br>
         *   0 : default orientation<br>
         *  90 : 90 degrees clockwise from default<br>
         * -90 : 90 degrees anti-clockwise from default<br>
         * 180 : 180 degrees from default
         * @type Number
         * @readonly
         * @name orientation
         * @memberOf me.device
         */
        obj.orientation = 0;

        /**
         * contains the g-force acceleration along the x-axis.
         * @public
         * @type Number
         * @readonly
         * @name accelerationX
         * @memberOf me.device
         */
        obj.accelerationX = 0;

        /**
         * contains the g-force acceleration along the y-axis.
         * @public
         * @type Number
         * @readonly
         * @name accelerationY
         * @memberOf me.device
         */
        obj.accelerationY = 0;

        /**
         * contains the g-force acceleration along the z-axis.
         * @public
         * @type Number
         * @readonly
         * @name accelerationZ
         * @memberOf me.device
         */
        obj.accelerationZ = 0;

        /**
         * Device orientation Gamma property. Gives angle on tilting a portrait held phone left or right
         * @public
         * @type Number
         * @readonly
         * @name gamma
         * @memberOf me.device
         */
        obj.gamma = 0;

        /**
         * Device orientation Beta property. Gives angle on tilting a portrait held phone forward or backward
         * @public
         * @type Number
         * @readonly
         * @name beta
         * @memberOf me.device
         */
        obj.beta = 0;

        /**
         * Device orientation Alpha property. Gives angle based on the rotation of the phone around its z axis.
         * The z-axis is perpendicular to the phone, facing out from the center of the screen.
         * @public
         * @type Number
         * @readonly
         * @name alpha
         * @memberOf me.device
         */
        obj.alpha = 0;

        /**
         * Triggers a fullscreen request. Requires fullscreen support from the browser/device.
         * @name requestFullscreen
         * @memberOf me.device
         * @function
         * @param {Object} [element=default canvas object] the element to be set in full-screen mode.
         * @example
         * // add a keyboard shortcut to toggle Fullscreen mode on/off
         * me.input.bindKey(me.input.KEY.F, "toggleFullscreen");
         * me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
         *    // toggle fullscreen on/off
         *    if (action === "toggleFullscreen") {
         *       if (!me.device.isFullscreen) {
         *          me.device.requestFullscreen();
         *       } else {
         *          me.device.exitFullscreen();
         *       }
         *    }
         * });
         */
        obj.requestFullscreen = function (element) {
            if (this.hasFullscreenSupport) {
                element = element || me.video.getWrapper();
                element.requestFullscreen = me.agent.prefixed("requestFullscreen", element) ||
                                            element.mozRequestFullScreen;

                element.requestFullscreen();
            }
        };

        /**
         * Exit fullscreen mode. Requires fullscreen support from the browser/device.
         * @name exitFullscreen
         * @memberOf me.device
         * @function
         */
        obj.exitFullscreen = function () {
            if (this.hasFullscreenSupport) {
                document.exitFullscreen();
            }
        };

        /**
         * return the device pixel ratio
         * @name getPixelRatio
         * @memberOf me.device
         * @function
         */
        obj.getPixelRatio = function () {

            if (devicePixelRatio === null) {
                var _context = me.video.getScreenContext();
                var _devicePixelRatio = window.devicePixelRatio || 1,
                    _backingStoreRatio = me.agent.prefixed("backingStorePixelRatio", _context) || 1;
                devicePixelRatio = _devicePixelRatio / _backingStoreRatio;
            }
            return devicePixelRatio;
        };

        /**
         * return the device storage
         * @name getStorage
         * @memberOf me.device
         * @function
         * @param {String} [type="local"]
         * @return me.save object
         */
        obj.getStorage = function (type) {

            type = type || "local";

            switch (type) {
                case "local" :
                    return me.save;

                default :
                    break;
            }
            throw "melonJS : storage type " + type + " not supported";
        };

        /**
         * event management (Accelerometer)
         * http://www.mobilexweb.com/samples/ball.html
         * http://www.mobilexweb.com/blog/safari-ios-accelerometer-websockets-html5
         * @ignore
         */
        function onDeviceMotion(e) {
            if (e.reading) {
                // For Windows 8 devices
                obj.accelerationX = e.reading.accelerationX;
                obj.accelerationY = e.reading.accelerationY;
                obj.accelerationZ = e.reading.accelerationZ;
            }
            else {
                // Accelerometer information
                obj.accelerationX = e.accelerationIncludingGravity.x;
                obj.accelerationY = e.accelerationIncludingGravity.y;
                obj.accelerationZ = e.accelerationIncludingGravity.z;
            }
        }

        function onDeviceRotate(e) {
            obj.gamma = e.gamma;
            obj.beta = e.beta;
            obj.alpha = e.alpha;
        }

        /**
         * Enters pointer lock, requesting it from the user first. Works on supported devices & browsers
         * Must be called in a click event or an event that requires user interaction.
         * If you need to run handle events for errors or change of the pointer lock, see below.
         * @name turnOnPointerLock
         * @memberOf me.device
         * @function
         * @example
         * document.addEventListener("pointerlockchange", pointerlockchange, false);
         * document.addEventListener("mozpointerlockchange", pointerlockchange, false);
         * document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
         *
         * document.addEventListener("pointerlockerror", pointerlockerror, false);
         * document.addEventListener("mozpointerlockerror", pointerlockerror, false);
         * document.addEventListener("webkitpointerlockerror", pointerlockerror, false);
         */
        obj.turnOnPointerLock = function () {
            if (this.hasPointerLockSupport) {
                var element = me.video.getWrapper();
                if (me.device.ua.match(/Firefox/i)) {
                    var fullscreenchange = function () {
                        if ((me.agent.prefixed("fullscreenElement", document) ||
                            document.mozFullScreenElement) === element) {

                            document.removeEventListener("fullscreenchange", fullscreenchange);
                            document.removeEventListener("mozfullscreenchange", fullscreenchange);
                            element.requestPointerLock = me.agent.prefixed("requestPointerLock", element);
                            element.requestPointerLock();
                        }
                    };

                    document.addEventListener("fullscreenchange", fullscreenchange, false);
                    document.addEventListener("mozfullscreenchange", fullscreenchange, false);

                    me.device.requestFullscreen();

                }
                else {
                    element.requestPointerLock();
                }
            }
        };

        /**
         * Exits pointer lock. Works on supported devices & browsers
         * @name turnOffPointerLock
         * @memberOf me.device
         * @function
         */
        obj.turnOffPointerLock = function () {
            if (this.hasPointerLockSupport) {
                document.exitPointerLock();
            }
        };

        /**
         * watch Accelerator event
         * @name watchAccelerometer
         * @memberOf me.device
         * @public
         * @function
         * @return {Boolean} false if not supported by the device
         */
        obj.watchAccelerometer = function () {
            if (me.device.hasAccelerometer) {
                if (!accelInitialized) {
                    if (typeof Windows === "undefined") {
                        // add a listener for the devicemotion event
                        window.addEventListener("devicemotion", onDeviceMotion, false);
                    }
                    else {
                        // On Windows 8 Device
                        var accelerometer = Windows.Devices.Sensors.Accelerometer.getDefault();
                        if (accelerometer) {
                            // Capture event at regular intervals
                            var minInterval = accelerometer.minimumReportInterval;
                            var Interval = minInterval >= 16 ? minInterval : 25;
                            accelerometer.reportInterval = Interval;

                            accelerometer.addEventListener("readingchanged", onDeviceMotion, false);
                        }
                    }
                    accelInitialized = true;
                }
                return true;
            }
            return false;
        };

        /**
         * unwatch Accelerometor event
         * @name unwatchAccelerometer
         * @memberOf me.device
         * @public
         * @function
         */
        obj.unwatchAccelerometer = function () {
            if (accelInitialized) {
                if (typeof Windows === "undefined") {
                    // add a listener for the mouse
                    window.removeEventListener("devicemotion", onDeviceMotion, false);
                } else {
                    // On Windows 8 Devices
                    var accelerometer = Windows.Device.Sensors.Accelerometer.getDefault();

                    accelerometer.removeEventListener("readingchanged", onDeviceMotion, false);
                }
                accelInitialized = false;
            }
        };

        /**
         * watch the device orientation event
         * @name watchDeviceOrientation
         * @memberOf me.device
         * @public
         * @function
         * @return {Boolean} false if not supported by the device
         */
        obj.watchDeviceOrientation = function () {
            if (me.device.hasDeviceOrientation && !deviceOrientationInitialized) {
                window.addEventListener("deviceorientation", onDeviceRotate, false);
                deviceOrientationInitialized = true;
            }
            return false;
        };

        /**
         * unwatch Device orientation event
         * @name unwatchDeviceOrientation
         * @memberOf me.device
         * @public
         * @function
         */
        obj.unwatchDeviceOrientation = function () {
            if (deviceOrientationInitialized) {
                window.removeEventListener("deviceorientation", onDeviceRotate, false);
                deviceOrientationInitialized = false;
            }
        };

        /**
         * the vibrate method pulses the vibration hardware on the device, <br>
         * If the device doesn't support vibration, this method has no effect. <br>
         * If a vibration pattern is already in progress when this method is called,
         * the previous pattern is halted and the new one begins instead.
         * @name vibrate
         * @memberOf me.device
         * @public
         * @function
         * @param {Number|Number[]} pattern pattern of vibration and pause intervals
         * @example
         * // vibrate for 1000 ms
         * navigator.vibrate(1000);
         * // or alternatively
         * navigator.vibrate([1000]);
         * vibrate for 50 ms, be still for 100 ms, and then vibrate for 150 ms:
         * navigator.vibrate([50, 100, 150]);
         * // cancel any existing vibrations
         * navigator.vibrate(0);
         */
        obj.vibrate = function (pattern) {
            if (navigator.vibrate) {
                navigator.vibrate(pattern);
            }
        };


        return obj;
    })();

    /**
     * Returns true if the browser/device is in full screen mode.
     * @name isFullscreen
     * @memberOf me.device
     * @public
     * @type Boolean
     * @readonly
     * @return {boolean}
     */
    Object.defineProperty(me.device, "isFullscreen", {
        get: function () {
            if (me.device.hasFullscreenSupport) {
                var el = me.agent.prefixed("fullscreenElement", document) ||
                         document.mozFullScreenElement;
                return (el === me.video.getWrapper());
            } else {
                return false;
            }
        }
    });
    
    /**
     * Returns true if the browser/device has audio capabilities.
     * @name sound
     * @memberOf me.device
     * @public
     * @type Boolean
     * @readonly
     * @return {boolean}
     */
    Object.defineProperty(me.device, "sound", {
        get: function () {
                return !Howler.noAudio;
            }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013 melonJS
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a Timer object to manage time function (FPS, Game Tick, Time...)<p>
     * There is no constructor function for me.timer
     * @namespace me.timer
     * @memberOf me
     */
    me.timer = (function () {
        // hold public stuff in our api
        var api = {};

        /*
         * PRIVATE STUFF
         */

        //hold element to display fps
        var framecount = 0;
        var framedelta = 0;

        /* fps count stuff */
        var last = 0;
        var now = 0;
        var delta = 0;
        var step = Math.ceil(1000 / me.sys.fps); // ROUND IT ?
        // define some step with some margin
        var minstep = (1000 / me.sys.fps) * 1.25; // IS IT NECESSARY?\

        // list of defined timer function
        var timers = [];
        var timerId = 0;

        /**
         * @ignore
         */
        var clearTimer = function (timerId) {
            for (var i = 0, len = timers.length; i < len; i++) {
                if (timers[i].timerId === timerId) {
                    timers.splice(i, 1);
                    break;
                }
            }
        };

        /**
         * update timers
         * @ignore
         */
        var updateTimers = function (dt) {
            for (var i = 0, len = timers.length; i < len; i++) {
                var _timer = timers[i];
                if (!(_timer.pauseable && me.state.isPaused())) {
                    _timer.elapsed += dt;
                }
                if (_timer.elapsed >= _timer.delay) {
                    _timer.func.apply(this);
                    if (_timer.repeat === true) {
                        _timer.elapsed -= _timer.delay;
                    } else {
                        me.timer.clearTimeout(_timer.timerId);
                    }
                }
            }
        };

        /*
         * PUBLIC STUFF
         */

        /**
         * last game tick value
         * @public
         * @type Int
         * @name tick
         * @memberOf me.timer
         */
        api.tick = 1.0;

        /**
         * last measured fps rate
         * @public
         * @type Int
         * @name fps
         * @memberOf me.timer
         */
        api.fps = 0;

        /**
         * init the timer
         * @ignore
         */
        api.init = function () {
            // reset variables to initial state
            api.reset();
            now = last = 0;
        };

        /**
         * reset time (e.g. usefull in case of pause)
         * @name reset
         * @memberOf me.timer
         * @ignore
         * @function
         */
        api.reset = function () {
            // set to "now"
            last = now = window.performance.now();
            delta = 0;
            // reset delta counting variables
            framedelta = 0;
            framecount = 0;
        };

        /**
         * Calls a function once after a specified delay.
         * @name setTimeout
         * @memberOf me.timer
         * @param {Function} func the function you want to execute after delay milliseconds.
         * @param {Function} delay the number of milliseconds (thousandths of a second) that the function call should be delayed by.
         * @param {Boolean} [pauseable = true] respects the pause state of the engine.
         * @return {Number}  timeoutID the numerical ID of the timeout, which can be used later with me.timer.clearTimeout().
         * @function
         */
        api.setTimeout = function (func, delay, pauseable) {
            timers.push({
                func: func,
                delay : delay,
                elapsed : 0,
                repeat : false,
                timerId : ++timerId,
                pauseable : pauseable === true || true
            });
            return timerId;
        };

        /**
         * Calls a function at specified interval.
         * @name setInterval
         * @memberOf me.timer
         * @param {Function} func the function to execute
         * @param {Function} delay the number of milliseconds (thousandths of a second) on how often to execute the function
         * @param {Boolean} [pauseable = true] respects the pause state of the engine.
         * @return {Number} intervalID the numerical ID of the timeout, which can be used later with me.timer.clearInterval().
         * @function
         */
        api.setInterval = function (func, delay, pauseable) {
            timers.push({
                func: func,
                delay : delay,
                elapsed : 0,
                repeat : true,
                timerId : ++timerId,
                pauseable : pauseable === true || true
            });
            return timerId;
        };

        /**
         * Clears the delay set by me.timer.setTimeout().
         * @name clearTimeout
         * @memberOf me.timer
         * @function
         * @param {Number}  timeoutID ID of the timeout to be cleared
         */
        api.clearTimeout = function (timeoutID) {
            clearTimer.defer(this, timeoutID);
        };

        /**
         * Clears the Interval set by me.timer.setInterval().
         * @name clearInterval
         * @memberOf me.timer
         * @function
         * @param {Number} intervalID ID of the interval to be cleared
         */
        api.clearInterval = function (intervalID) {
            clearTimer.defer(this, intervalID);
        };

        /**
         * Return the current timestamp in milliseconds <br>
         * since the game has started or since linux epoch (based on browser support for High Resolution Timer)
         * @name getTime
         * @memberOf me.timer
         * @return {Number}
         * @function
         */
        api.getTime = function () {
            return now;
        };

        /**
         * Return elapsed time in milliseconds since the last update<br>
         * @name getDelta
         * @memberOf me.timer
         * @return {Number}
         * @function
         */
        api.getDelta = function () {

            return delta;
        };

        /**
         * compute the actual frame time and fps rate
         * @name computeFPS
         * @ignore
         * @memberOf me.timer
         * @function
         */
        api.countFPS = function () {
            framecount++;
            framedelta += delta;
            if (framecount % 10 === 0) {
                this.fps = (~~((1000 * framecount) / framedelta)).clamp(0, me.sys.fps);
                framedelta = 0;
                framecount = 0;
            }
        };

        /**
         * update game tick
         * should be called once a frame
         * @param {Number} time current timestamp as provided by the RAF callback
         * @return {Number} time elapsed since the last update
         * @ignore
         */
        api.update = function (time) {

            last = now;

            now = time;

            delta = (now - last);

            // get the game tick
            api.tick = (delta > minstep && me.sys.interpolation) ? delta / step : 1;

            // update defined timers
            updateTimers(delta);

            return delta;
        };

        // return our apiect
        return api;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier Biot
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * A pool of Object entity <br>
     * This object is used for object pooling - a technique that might speed up your game
     * if used properly. <br>
     * If some of your classes will be instantiated and removed a lot at a time, it is a
     * good idea to add the class to this entity pool. A separate pool for that class
     * will be created, which will reuse objects of the class. That way they won't be instantiated
     * each time you need a new one (slowing your game), but stored into that pool and taking one
     * already instantiated when you need it.<br><br>
     * This object is also used by the engine to instantiate objects defined in the map,
     * which means, that on level loading the engine will try to instantiate every object
     * found in the map, based on the user defined name in each Object Properties<br>
     * <img src="images/object_properties.png"/><br>
     * @namespace me.pool
     * @memberOf me
     */
    me.pool = (function () {
        // hold public stuff in our singleton
        var api = {};

        var entityClass = {};

        /*
         * PUBLIC STUFF
         */

        /**
         * Constructor
         * @ignore
         */
        api.init = function () {
            // add default entity object
            api.register("me.ObjectEntity", me.ObjectEntity);
            api.register("me.CollectableEntity", me.CollectableEntity);
            api.register("me.LevelEntity", me.LevelEntity);
            api.register("TileObject", me.SpriteObject);
            api.register("me.Tween", me.Tween, true);
            api.register("me.Color", me.Color, true);
            api.register("me.Particle", me.Particle, true);
        };

        /**
         * register an object to the pool. <br>
         * Pooling must be set to true if more than one such objects will be created. <br>
         * (note) If pooling is enabled, you shouldn't instantiate objects with `new`.
         * See examples in {@link me.pool#pull}
         * @name register
         * @memberOf me.pool
         * @public
         * @function
         * @param {String} className as defined in the Name field of the Object Properties (in Tiled)
         * @param {Object} class corresponding Class to be instantiated
         * @param {Boolean} [objectPooling=false] enables object pooling for the specified class
         * - speeds up the game by reusing existing objects
         * @example
         * // add our users defined entities in the entity pool
         * me.pool.register("playerspawnpoint", PlayerEntity);
         * me.pool.register("cherryentity", CherryEntity, true);
         * me.pool.register("heartentity", HeartEntity, true);
         * me.pool.register("starentity", StarEntity, true);
         */
        api.register = function (className, entityObj, pooling) {
            if (!pooling) {
                entityClass[className.toLowerCase()] = {
                    "class" : entityObj,
                    "pool" : undefined
                };
                return;
            }

            entityClass[className.toLowerCase()] = {
                "class" : entityObj,
                "pool" : []
            };
        };

        /**
         * Pull a new instance of the requested object (if added into the object pool)
         * @name pull
         * @memberOf me.pool
         * @public
         * @function
         * @param {String} className as used in {@link me.pool#register}
         * @param {} [arguments...] arguments to be passed when instantiating/reinitializing the object
         * @example
         * me.pool.register("player", PlayerEntity);
         * var player = me.pool.pull("player");
         * @example
         * me.pool.register("bullet", BulletEntity, true);
         * me.pool.register("enemy", EnemyEntity, true);
         * // ...
         * // when we need to manually create a new bullet:
         * var bullet = me.pool.pull("bullet", x, y, direction);
         * // ...
         * // params aren't a fixed number
         * // when we need new enemy we can add more params, that the object construct requires:
         * var enemy = me.pool.pull("enemy", x, y, direction, speed, power, life);
         * // ...
         * // when we want to destroy existing object, the remove
         * // function will ensure the object can then be reallocated later
         * me.game.world.removeChild(enemy);
         * me.game.world.removeChild(bullet);
         */
        api.pull = function (data) {
            var name = typeof data === "string" ? data.toLowerCase() : undefined;
            var args = Array.prototype.slice.call(arguments);
            if (name && entityClass[name]) {
                var proto;
                if (!entityClass[name].pool) {
                    proto = entityClass[name]["class"];
                    args[0] = proto;
                    return new (proto.bind.apply(proto, args))();
                }

                var obj, entity = entityClass[name];
                proto = entity["class"];
                if (entity.pool.length > 0) {
                    obj = entity.pool.pop();
                    // call the object init function if defined (JR's Inheritance)
                    if (typeof obj.init === "function") {
                        obj.init.apply(obj, args.slice(1));
                    }
                    // call the object onResetEvent function if defined
                    if (typeof obj.onResetEvent === "function") {
                        obj.onResetEvent.apply(obj, args.slice(1));
                    }
                }
                else {
                    args[0] = proto;
                    obj = new (proto.bind.apply(proto, args))();
                    obj.className = name;
                }
                return obj;
            }

            if (name) {
                console.error("Cannot instantiate entity of type '" + data + "': Class not found!");
            }
            return null;
        };

        /**
         * purge the entity pool from any inactive object <br>
         * Object pooling must be enabled for this function to work<br>
         * note: this will trigger the garbage collector
         * @name purge
         * @memberOf me.pool
         * @public
         * @function
         */
        api.purge = function () {
            for (var className in entityClass) {
                if (entityClass.hasOwnProperty(className)) {
                    entityClass[className].pool = [];
                }
            }
        };

        /**
         * Push back an object instance into the entity pool <br>
         * Object pooling for the object class must be enabled,
         * and object must have been instantiated using {@link me.pool#pull},
         * otherwise this function won't work
         * @name push
         * @memberOf me.pool
         * @public
         * @function
         * @param {Object} instance to be recycled
         */
        api.push = function (obj) {
            var name = obj.className;
            if (typeof(name) === "undefined" || !entityClass[name]) {
                // object is not registered, don't do anything
                return;
            }
            // store back the object instance for later recycling
            entityClass[name].pool.push(obj);
        };

        // return our object
        return api;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a generic 2D Vector Object
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @param {Number} [x=0] x value of the vector
     * @param {Number} [y=0] y value of the vector
     */
    me.Vector2d = Object.extend(
    /** @scope me.Vector2d.prototype */
    {
        /**
         * x value of the vector
         * @public
         * @type Number
         * @name x
         * @memberOf me.Vector2d
         */
        x : 0,

        /**
         * y value of the vector
         * @public
         * @type Number
         * @name y
         * @memberOf me.Vector2d
         */
        y : 0,

        /** @ignore */
        init : function (x, y) {
            this.x = x || 0;
            this.y = y || 0;
        },

        /**
         * set the Vector x and y properties to the given values<br>
         * @name set
         * @memberOf me.Vector2d
         * @function
         * @param {Number} x
         * @param {Number} y
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        set : function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        },

        /**
         * set the Vector x and y properties to 0
         * @name setZero
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        setZero : function () {
            return this.set(0, 0);
        },

        /**
         * set the Vector x and y properties using the passed vector
         * @name setV
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        setV : function (v) {
            this.x = v.x;
            this.y = v.y;
            return this;
        },

        /**
         * Add the passed vector to this vector
         * @name add
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        add : function (v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        },

        /**
         * Substract the passed vector to this vector
         * @name sub
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        sub : function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        },

        /**
         * Multiply this vector values by the given scalar
         * @name scale
         * @memberOf me.Vector2d
         * @function
         * @param {Number} x
         * @param {Number} [y=x]
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        scale : function (x, y) {
            this.x *= x;
            this.y *= typeof (y) !== "undefined" ? y : x;
            return this;
        },

        /**
         * Multiply this vector values by the passed vector
         * @name scale
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        scaleV : function (v) {
            this.x *= v.x;
            this.y *= v.y;
            return this;
        },

        /**
         * Divide this vector values by the passed value
         * @name div
         * @memberOf me.Vector2d
         * @function
         * @param {Number} value
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        div : function (n) {
            this.x /= n;
            this.y /= n;
            return this;
        },

        /**
         * Update this vector values to absolute values
         * @name abs
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        abs : function () {
            if (this.x < 0) {
                this.x = -this.x;
            }
            if (this.y < 0) {
                this.y = -this.y;
            }
            return this;
        },

        /**
         * Clamp the vector value within the specified value range
         * @name clamp
         * @memberOf me.Vector2d
         * @function
         * @param {Number} low
         * @param {Number} high
         * @return {me.Vector2d} new me.Vector2d
         */
        clamp : function (low, high) {
            return new me.Vector2d(this.x.clamp(low, high), this.y.clamp(low, high));
        },

        /**
         * Clamp this vector value within the specified value range
         * @name clampSelf
         * @memberOf me.Vector2d
         * @function
         * @param {Number} low
         * @param {Number} high
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        clampSelf : function (low, high) {
            this.x = this.x.clamp(low, high);
            this.y = this.y.clamp(low, high);
            return this;
        },

        /**
         * Update this vector with the minimum value between this and the passed vector
         * @name minV
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        minV : function (v) {
            this.x = this.x < v.x ? this.x : v.x;
            this.y = this.y < v.y ? this.y : v.y;
            return this;
        },

        /**
         * Update this vector with the maximum value between this and the passed vector
         * @name maxV
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        maxV : function (v) {
            this.x = this.x > v.x ? this.x : v.x;
            this.y = this.y > v.y ? this.y : v.y;
            return this;
        },

        /**
         * Floor the vector values
         * @name floor
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} new me.Vector2d
         */
        floor : function () {
            return new me.Vector2d(~~this.x, ~~this.y);
        },

        /**
         * Floor this vector values
         * @name floorSelf
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        floorSelf : function () {
            this.x = ~~this.x;
            this.y = ~~this.y;
            return this;
        },

        /**
         * Ceil the vector values
         * @name ceil
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} new me.Vector2d
         */
        ceil : function () {
            return new me.Vector2d(Math.ceil(this.x), Math.ceil(this.y));
        },

        /**
         * Ceil this vector values
         * @name ceilSelf
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        ceilSelf : function () {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
        },

        /**
         * Negate the vector values
         * @name negate
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} new me.Vector2d
         */
        negate : function () {
            return new me.Vector2d(-this.x, -this.y);
        },

        /**
         * Negate this vector values
         * @name negateSelf
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        negateSelf : function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        },

        /**
         * Copy the x,y values of the passed vector to this one
         * @name copy
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {me.Vector2d} Reference to this object for method chaining
         */
        copy : function (v) {
            this.x = v.x;
            this.y = v.y;
            return this;
        },

        /**
         * return true if the two vectors are the same
         * @name equals
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {Boolean}
         */
        equals : function (v) {
            return ((this.x === v.x) && (this.y === v.y));
        },

        /**
         * return the length (magnitude) of this vector
         * @name length
         * @memberOf me.Vector2d
         * @function
         * @return {Number}
         */
        length : function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },

        /**
         * normalize this vector (scale the vector so that its magnitude is 1)
         * @name normalize
         * @memberOf me.Vector2d
         * @function
         * @return {Number}
         */
        normalize : function () {
            var len = this.length();
            // some limit test
            if (len < Number.MIN_VALUE) {
                return 0.0;
            }
            var invL = 1.0 / len;
            this.x *= invL;
            this.y *= invL;
            return len;
        },

        /**
         * return the dot product of this vector and the passed one
         * @name dotProduct
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {Number}
         */
        dotProduct : function (/**me.Vector2d*/ v) {
            return this.x * v.x + this.y * v.y;
        },

        /**
         * return the distance between this vector and the passed one
         * @name distance
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {Number}
         */
        distance : function (v) {
            return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
        },

        /**
         * return the angle between this vector and the passed one
         * @name angle
         * @memberOf me.Vector2d
         * @function
         * @param {me.Vector2d} v
         * @return {Number} angle in radians
         */
        angle : function (v) {
            return Math.atan2((v.y - this.y), (v.x - this.x));
        },

        /**
         * return a clone copy of this vector
         * @name clone
         * @memberOf me.Vector2d
         * @function
         * @return {me.Vector2d} new me.Vector2d
         */
        clone : function () {
            return new me.Vector2d(this.x, this.y);
        },

        /**
         * convert the object to a string representation
         * @name toString
         * @memberOf me.Vector2d
         * @function
         * @return {String}
         */
        toString : function () {
            return "x:" + this.x + ",y:" + this.y;
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a rectangle Object
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @param {me.Vector2d} v x,y position of the rectange
     * @param {Number} w width of the rectangle
     * @param {Number} h height of the rectangle
     */
    me.Rect = Object.extend(
    /** @scope me.Rect.prototype */
    {
        /**
         * position of the Rectange
         * @public
         * @type {me.Vector2d}
         * @name pos
         * @memberOf me.Rect
         */
        pos : new me.Vector2d(),

        /**
         * allow expanding and contracting the rect with a vector<br>
         * while keeping its original size and shape<br>
         * @ignore
         * @type {me.Vector2d}
         * @name rangeV
         * @memberOf me.Rect
         * @see me.Rect#addV
         */
        rangeV : new me.Vector2d(),

        /**
         * left coordinate of the Rectange<br>
         * takes in account the adjusted size of the rectangle (if set)
         * @public
         * @type {Number}
         * @name left
         * @memberOf me.Rect
         */
        // define later in the constructor

        /**
         * right coordinate of the Rectange<br>
         * takes in account the adjusted size of the rectangle (if set)
         * @public
         * @type {Number}
         * @name right
         * @memberOf me.Rect
         */
        // define later in the constructor

        /**
         * bottom coordinate of the Rectange<br>
         * takes in account the adjusted size of the rectangle (if set)
         * @public
         * @type {Number}
         * @name bottom
         * @memberOf me.Rect
         */
        // define later in the constructor

        /**
         * top coordinate of the Rectange<br>
         * takes in account the adjusted size of the rectangle (if set)
         * @public
         * @type {Number}
         * @name top
         * @memberOf me.Rect
         */
        // define later in the constructor

        /**
         * width of the Rectange
         * @public
         * @type {Number}
         * @name width
         * @memberOf me.Rect
         */
        width : 0,

        /**
         * height of the Rectange
         * @public
         * @type {Number}
         * @name height
         * @memberOf me.Rect
         */
        height : 0,

        // half width/height
        hWidth : 0,
        hHeight : 0,

        // the shape type
        shapeType : "Rectangle",

        /** @ignore */
        init : function (v, w, h) {

            this.pos.setV(v);

            // Allow expanding and contracting the rect with a vector
            // while keeping its original size and shape
            this.rangeV.set(0, 0);

            this.width = w;
            this.height = h;

            // half width/height
            this.hWidth = ~~(w / 2);
            this.hHeight = ~~(h / 2);

            // redefine some properties to ease our life when getting the rectangle coordinates
            // redefine some properties to ease our life when getting the rectangle coordinates
            Object.defineProperty(this, "left", {
                get : function () {
                    var x = this.pos.x;
                    var xv = x + this.rangeV.x;
                    return x < xv ? x : xv;
                },
                configurable : true
            });

            Object.defineProperty(this, "right", {
                get : function () {
                    var x = this.pos.x + this.width;
                    var xv = x + this.rangeV.x;
                    return x > xv ? x : xv;
                },
                configurable : true
            });

            Object.defineProperty(this, "top", {
                get : function () {
                    var y = this.pos.y;
                    var yv = y + this.rangeV.y;
                    return y < yv ? y : yv;
                },
                configurable : true
            });

            Object.defineProperty(this, "bottom", {
                get : function () {
                    var y = this.pos.y + this.height;
                    var yv = y + this.rangeV.y;
                    return y > yv ? y : yv;
                },
                configurable : true
            });
        },

        /**
         * set new value to the rectangle shape
         * @name setShape
         * @memberOf me.Rect
         * @function
         * @param {me.Vector2d} v x,y position for the rectangle
         * @param {Number} w width of the rectangle
         * @param {Number} h height of the rectangle
         * @return {me.Rect} this rectangle
         */
        setShape : function (v, w, h) {
            // set the new position vector
            this.pos.setV(v);

            // resize
            this.resize(w, h);

            return this;
        },

        /**
         * resize the rectangle
         * @name resize
         * @memberOf me.Rect
         * @function
         * @param {Number} w new width of the rectangle
         * @param {Number} h new height of the rectangle
         * @return {me.Rect} this rectangle
         */
        resize : function (w, h) {
            this.width = w;
            this.height = h;

            this.hWidth = ~~(w / 2);
            this.hHeight = ~~(h / 2);

            return this;
        },

        /**
         * returns the bounding box for this shape, the smallest rectangle object completely containing this shape.
         * @name getBounds
         * @memberOf me.Rect
         * @function
         * @param {me.Rect} [rect] an optional rectangle object to use when returning the bounding rect(else returns a new object)
         * @return {me.Rect} new rectangle
         */
        getBounds : function (rect) {
            if (typeof(rect) !== "undefined") {
                return rect.setShape(this.pos, this.width, this.height);
            }
            else {
                return this.clone();
            }
        },

        /**
         * clone this rectangle
         * @name clone
         * @memberOf me.Rect
         * @function
         * @return {me.Rect} new rectangle
         */
        clone : function () {
            return new me.Rect(this.pos, this.width, this.height);
        },

        /**
         * translate the rect by the specified offset
         * @name translate
         * @memberOf me.Rect
         * @function
         * @param {Number} x x offset
         * @param {Number} y y offset
         * @return {me.Rect} this rectangle
         */
        translate : function (x, y) {
            this.pos.x += x;
            this.pos.y += y;
            return this;
        },

        /**
         * translate the rect by the specified vector
         * @name translateV
         * @memberOf me.Rect
         * @function
         * @param {me.Vector2d} v vector offset
         * @return {me.Rect} this rectangle
         */
        translateV : function (v) {
            return this.translate(v.x, v.y);
        },

        /**
         * add a vector to this rect
         * @name addV
         * @memberOf me.Rect
         * @function
         * @param {me.Vector2d} v vector offset
         * @return {me.Rect} this rectangle
         */
        addV : function (v) {
            this.rangeV.setV(v);
            return this;
        },

        /**
         * merge this rectangle with another one
         * @name union
         * @memberOf me.Rect
         * @function
         * @param {me.Rect} rect other rectangle to union with
         * @return {me.Rect} the union(ed) rectangle
         */
        union : function (/** {me.Rect} */ r) {
            var x1 = Math.min(this.left, r.left);
            var y1 = Math.min(this.top, r.top);

            this.resize(
                Math.max(this.right, r.right) - x1,
                Math.max(this.bottom, r.bottom) - y1
            );

            this.pos.set(x1, y1);

            return this;
        },

        /**
         *
         * flip on X axis
         * usefull when used as collision box, in a non symetric way
         * @ignore
         * @param sw the sprite width
         */
        flipX : function (sw) {
            this.pos.x = sw - this.width - this.pos.x;
            return this;
        },

        /**
         *
         * flip on Y axis
         * usefull when used as collision box, in a non symetric way
         * @ignore
         * @param sh the height width
         */
        flipY : function (sh) {
            this.pos.y = sh - this.height - this.pos.y;
            return this;
        },

        /**
         * return true if this rectangle is equal to the specified one
         * @name equals
         * @memberOf me.Rect
         * @function
         * @param {me.Rect} rect
         * @return {Boolean}
         */
        equals : function (r) {
            return (
                this.left   === r.left  &&
                this.right  === r.right &&
                this.top    === r.top   &&
                this.bottom === r.bottom
            );
        },

        /**
         * check if this rectangle is intersecting with the specified one
         * @name overlaps
         * @memberOf me.Rect
         * @function
         * @param  {me.Rect} rect
         * @return {boolean} true if overlaps
         */
        overlaps : function (r)    {
            return (
                this.left < r.right &&
                r.left < this.right &&
                this.top < r.bottom &&
                r.top < this.bottom
            );
        },

        /**
         * check if this rectangle is within the specified one
         * @name within
         * @memberOf me.Rect
         * @function
         * @param  {me.Rect} rect
         * @return {boolean} true if within
         */
        within: function (r) {
            return r.contains(this);
        },

        /**
         * check if this rectangle contains the specified one
         * @name contains
         * @memberOf me.Rect
         * @function
         * @param  {me.Rect} rect
         * @return {boolean} true if contains
         */
        contains: function (r) {
            return (
                r.left >= this.left &&
                r.right <= this.right &&
                r.top >= this.top &&
                r.bottom <= this.bottom
            );
        },

        /**
         * check if this rectangle contains the specified point
         * @name containsPointV
         * @memberOf me.Rect
         * @function
         * @param  {me.Vector2d} point
         * @return {boolean} true if contains
         */
        containsPointV: function (v) {
            return this.containsPoint(v.x, v.y);
        },

        /**
         * check if this rectangle contains the specified point
         * @name containsPoint
         * @memberOf me.Rect
         * @function
         * @param  {Number} x x coordinate
         * @param  {Number} y y coordinate
         * @return {boolean} true if contains
         */
        containsPoint: function (x, y) {
            return (
                x >= this.left &&
                x <= this.right &&
                y >= this.top &&
                y <= this.bottom
            );
        },

        /**
         * AABB vs AABB collission dectection<p>
         * If there was a collision, the return vector will contains the following values:
         * @example
         * if (v.x != 0 || v.y != 0) {
         *     if (v.x != 0) {
         *         // x axis
         *         if (v.x < 0) {
         *             console.log("x axis : left side !");
         *         }
         *         else {
         *             console.log("x axis : right side !");
         *         }
         *     }
         *     else {
         *         // y axis
         *         if (v.y < 0) {
         *             console.log("y axis : top side !");
         *         }
         *         else {
         *             console.log("y axis : bottom side !");
         *         }
         *     }
         * }
         * @ignore
         * @param {me.Rect} rect
         * @return {me.Vector2d}
         */
        collideWithRectangle : function (/** {me.Rect} */ rect) {
            // response vector
            var p = new me.Vector2d(0, 0);

            // check if both box are overlaping
            if (this.overlaps(rect)) {
                // compute delta between this & rect
                var dx = this.left + this.hWidth  - rect.left - rect.hWidth;
                var dy = this.top  + this.hHeight - rect.top  - rect.hHeight;

                // compute penetration depth for both axis
                p.x = (rect.hWidth  + this.hWidth)  - (dx < 0 ? -dx : dx); // - Math.abs(dx);
                p.y = (rect.hHeight + this.hHeight) - (dy < 0 ? -dy : dy); // - Math.abs(dy);

                // check and "normalize" axis
                if (p.x < p.y) {
                    p.y = 0;
                    p.x = dx < 0 ? -p.x : p.x;
                } else {
                    p.x = 0;
                    p.y = dy < 0 ? -p.y : p.y;
                }
            }
            return p;
        },

        /**
         * debug purpose
         * @ignore
         */
        draw : function (context, color) {
            // draw the rectangle
            context.strokeStyle = color || "red";
            context.strokeRect(this.left, this.top, this.width, this.height);
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * an ellipse Object
     * (Tiled specifies top-left coordinates, and width and height of the ellipse)
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @param {me.Vector2d} v top-left origin position of the Ellipse
     * @param {Number} w width of the elipse
     * @param {Number} h height of the elipse
     */
    me.Ellipse = Object.extend(
    /** @scope me.Ellipse.prototype */
    {
        /**
         * center point of the Ellipse
         * @public
         * @type {me.Vector2d}
         * @name pos
         * @memberOf me.Ellipse
         */
        pos : new me.Vector2d(),

        /**
         * radius (x/y) of the ellipse
         * @public
         * @type {me.Vector2d}
         * @name radius
         * @memberOf me.Ellipse
         */
        radius : new me.Vector2d(),

        // the shape type
        shapeType : "Ellipse",

        /** @ignore */
        init : function (v, w, h) {
            this.setShape(v, w, h);
        },

        /**
         * set new value to the Ellipse shape
         * @name setShape
         * @memberOf me.Ellipse
         * @function
         * @param {me.Vector2d} v top-left origin position of the Ellipse
         * @param {Number} w width of the Ellipse
         * @param {Number} h height of the Ellipse
         */
        setShape : function (v, w, h) {
            this.radius.set(w / 2, h / 2);
            this.pos.setV(v).add(this.radius);
            return this;
        },

        /**
         * translate the circle/ellipse by the specified offset
         * @name translate
         * @memberOf me.Ellipse
         * @function
         * @param {Number} x x offset
         * @param {Number} y y offset
         * @return {me.Ellipse} this Ellipse
         */
        translate : function (x, y) {
            this.pos.x += x;
            this.pos.y += y;
            return this;
        },

        /**
         * translate the circle/ellipse by the specified vector
         * @name translateV
         * @memberOf me.Ellipse
         * @function
         * @param {me.Vector2d} v vector offset
         * @return {me.Rect} this Ellipse
         */
        translateV : function (v) {
            this.pos.add(v);
            return this;
        },

        /**
         * check if this circle/ellipse contains the specified point
         * @name containsPointV
         * @memberOf me.Ellipse
         * @function
         * @param  {me.Vector2d} point
         * @return {boolean} true if contains
         */
        containsPointV: function (v) {
            return this.containsPoint(v.x, v.y);
        },

        /**
         * check if this circle/ellipse contains the specified point
         * @name containsPoint
         * @memberOf me.Ellipse
         * @function
         * @param  {Number} x x coordinate
         * @param  {Number} y y coordinate
         * @return {boolean} true if contains
         */
        containsPoint: function (x, y) {
            // Make position relative to object center point.
            x -= this.pos.x;
            y -= this.pos.y;
            // Pythagorean theorem.
            return (
                ((x * x) / (this.radius.x * this.radius.x)) +
                ((y * y) / (this.radius.y * this.radius.y))
            ) <= 1.0;
        },

        /**
         * returns the bounding box for this shape, the smallest Rectangle object completely containing this shape.
         * @name getBounds
         * @memberOf me.Ellipse
         * @function
         * @param {me.Rect} [rect] an optional rectangle object to use when returning the bounding rect(else returns a new object)
         * @return {me.Rect} the bounding box Rectangle object
         */
        getBounds : function (rect) {
            if (typeof(rect) !== "undefined") {
                return rect.setShape(
                    this.pos.clone().sub(this.radius),
                    this.radius.x * 2,
                    this.radius.y * 2
                );
            }
            else {
                //will return a rect, with pos being the top-left coordinates
                return new me.Rect(
                    this.pos.clone().sub(this.radius),
                    this.radius.x * 2,
                    this.radius.y * 2
                );
            }
        },

        /**
         * clone this Ellipse
         * @name clone
         * @memberOf me.Ellipse
         * @function
         * @return {me.Ellipse} new Ellipse
         */
        clone : function () {
            return new me.Ellipse(this.pos, this.radius.x * 2, this.radius.y * 2);
        },

        /**
         * debug purpose
         * @ignore
         */
        draw : function (context, color) {
            // http://tinyurl.com/opnro2r
            context.save();
            context.beginPath();

            context.translate(
                this.pos.x - this.radius.x,
                this.pos.y - this.radius.y
            );
            context.scale(this.radius.x, this.radius.y);
            context.arc(1, 1, 1, 0, 2 * Math.PI, false);

            context.restore();
            context.strokeStyle = color || "red";
            context.stroke();
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a polyshape (polygone/polyline) Object
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @param {me.Vector2d} v origin point of the PolyShape
     * @param {me.Vector2d[]} points array of vector defining the polyshape
     * @param {boolean} closed true if a polygone, false if a polyline
     */
    me.PolyShape = Object.extend(
    /** @scope me.PolyShape.prototype */
    {
        /**
         * origin point of the PolyShape
         * @public
         * @type {me.Vector2d}
         * @name pos
         * @memberOf me.PolyShape
         */
        pos :  new me.Vector2d(),

        /**
         * Array of points defining the polyshape
         * @public
         * @type {me.Vector2d[]}
         * @name points
         * @memberOf me.PolyShape
         */
        points : null,

        /**
         * Specified if the shape is closed (i.e. polygon)
         * @public
         * @type {boolean}
         * @name closed
         * @memberOf me.PolyShape
         */
        closed : false,

        // the shape type
        shapeType : "PolyShape",

        /** @ignore */
        init : function (v, points, closed) {
            this.setShape(v, points, closed);
        },

        /**
         * set new value to the PolyShape
         * @name setShape
         * @memberOf me.PolyShape
         * @function
         * @param {me.Vector2d} v origin point of the PolyShape
         * @param {me.Vector2d[]} points array of vector defining the polyshape
         * @param {boolean} closed true if a polygone, false if a polyline
         */
        setShape : function (v, points, closed) {
            this.pos.setV(v);
            this.points = points;
            this.closed = (closed === true);
            this.getBounds();

            return this;
        },

        /**
         * translate the polyShape by the specified offset
         * @name translate
         * @memberOf me.PolyShape
         * @function
         * @param {Number} x x offset
         * @param {Number} y y offset
         * @return {me.PolyShape} this polyShape
         */
        translate : function (x, y) {
            this.pos.x += x;
            this.pos.y += y;
            return this;
        },

        /**
         * translate the polyShape by the specified vector
         * @name translateV
         * @memberOf me.PolyShape
         * @function
         * @param {me.Vector2d} v vector offset
         * @return {me.PolyShape} this polyShape
         */
        translateV : function (v) {
            this.pos.add(v);
            return this;
        },

        /**
         * check if this polyShape contains the specified point
         * @name containsPointV
         * @memberOf me.polyShape
         * @function
         * @param  {me.Vector2d} point
         * @return {boolean} true if contains
         */
        containsPointV: function (v) {
            return this.containsPoint(v.x, v.y);
        },

        /**
         * check if this polyShape contains the specified point <br>
         * (Note: it is highly recommended to first do a hit test on the corresponding <br>
         *  bounding rect, as the function can be highly consuming with complex shapes)
         * @name containsPoint
         * @memberOf me.polyShape
         * @function
         * @param  {Number} x x coordinate
         * @param  {Number} y y coordinate
         * @return {boolean} true if contains
         */
        containsPoint: function (x, y) {
            var intersects = false;
            var posx = this.pos.x, posy = this.pos.y;
            var points = this.points;
            var len = points.length;

            //http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
            for (var i = 0, j = len - 1; i < len; j = i++) {
                var iy = points[i].y + posy, ix = points[i].x + posx,
                    jy = points[j].y + posy, jx = points[j].x + posx;
                if (((iy > y) !== (jy > y)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix)) {
                    intersects = !intersects;
                }
            }
            return intersects;
        },

        /**
         * returns the bounding box for this shape, the smallest Rectangle object completely containing this shape.
         * @name getBounds
         * @memberOf me.PolyShape
         * @function
         * @param {me.Rect} [rect] an optional rectangle object to use when returning the bounding rect(else returns a new object)
         * @return {me.Rect} the bounding box Rectangle object
         */
        getBounds : function (rect) {
            var pos = this.pos.clone(), right = 0, bottom = 0;
            this.points.forEach(function (point) {
                pos.x = Math.min(pos.x, point.x);
                pos.y = Math.min(pos.y, point.y);
                right = Math.max(right, point.x);
                bottom = Math.max(bottom, point.y);
            });
            if (typeof(rect) !== "undefined") {
                return rect.setShape(pos, right - pos.x, bottom - pos.y);
            }
            else {
                return new me.Rect(pos, right - pos.x, bottom - pos.y);
            }
        },

        /**
         * clone this PolyShape
         * @name clone
         * @memberOf me.PolyShape
         * @function
         * @return {me.PolyShape} new PolyShape
         */
        clone : function () {
            var copy = [];
            this.points.forEach(function (point) {
                copy.push(new me.Vector2d(point.x, point.y));
            });
            return new me.PolyShape(this.pos.clone(), copy, this.closed);
        },

        /**
         * debug purpose
         * @ignore
         */
        draw : function (context, color) {
            context.save();
            context.translate(-this.pos.x, -this.pos.y);
            context.strokeStyle = color || "red";
            context.beginPath();
            context.moveTo(this.points[0].x, this.points[0].y);
            this.points.forEach(function (point) {
                context.lineTo(point.x, point.y);
                context.moveTo(point.x, point.y);

            });
            if (this.closed === true) {
                context.lineTo(this.points[0].x, this.points[0].y);
            }
            context.stroke();
            context.restore();
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014, melonJS Team
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a Matrix2d Object.<br>
     * the identity matrix and parameters position : <br>
     * <img src="images/identity-matrix_2x.png"/>
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @param {Number} a the m1,1 (m11) value in the matrix
     * @param {Number} b the m1,2 (m12) value in the matrix
     * @param {Number} c the m2,1 (m21) value in the matrix
     * @param {Number} d the m2,2 (m12) value in the matrix
     * @param {Number} e The delta x (dx) value in the matrix
     * @param {Number} f The delta x (dy) value in the matrix
     */
    me.Matrix2d = Object.extend(
    /** @scope me.Matrix2d.prototype */
    {
        /**
         * the m1,1 value in the matrix (a)
         * @public
         * @type Number
         * @name a
         * @memberOf me.Matrix2d
         */
        a : 1,

        /**
         * the m1,2 value in the matrix (b)
         * @public
         * @type Number
         * @name b
         * @memberOf me.Matrix2d
         */
        b : 0,

        /**
         * the m2,1 value in the matrix (c)
         * @public
         * @type Number
         * @name c
         * @memberOf me.Matrix2d
         */
        c : 0,

        /**
         * the m2,2 value in the matrix (d)
         * @public
         * @type Number
         * @name d
         * @memberOf me.Matrix2d
         */
        d : 1,

        /**
         * The delta x value in the matrix (e)
         * @public
         * @type Number
         * @name e
         * @memberOf me.Matrix2d
         */
        e : 0,

        /**
         * The delta y value in the matrix (f)
         * @public
         * @type Number
         * @name f
         * @memberOf me.Matrix2d
         */
        f : 0,


        /** @ignore */
        init : function (a, b, c, d, e, f) {
            this.set(a || 1, b || 0, c || 0, d || 1, e || 0, f || 0);
        },

        /**
         * reset the transformation matrix to the identity matrix (no transformation).<br>
         * the identity matrix and parameters position : <br>
         * <img src="images/identity-matrix_2x.png"/>
         * @name identity
         * @memberOf me.Matrix2d
         * @function
         * @return {me.Matrix2d} this matrix
         */
        identity : function () {
            this.set(1, 0, 0, 1, 0, 0);
            return this;
        },

        /**
         * set the matrix to the specified value
         * @name set
         * @memberOf me.Matrix2d
         * @function
         * @param {Number} a the m1,1 (m11) value in the matrix
         * @param {Number} b the m1,2 (m12) value in the matrix
         * @param {Number} c the m2,1 (m21) value in the matrix
         * @param {Number} d the m2,2 (m22) value in the matrix
         * @param {Number} [e] The delta x (dx) value in the matrix
         * @param {Number} [f] The delta y (dy) value in the matrix
         * @return {me.Matrix2d} this matrix
         */
        set : function (a, b, c, d, e, f) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = typeof(e) !== "undefined" ? e : this.e;
            this.f = typeof(f) !== "undefined" ? f : this.f;
            return this;
        },

        /**
         * multiply both matrix
         * @name multiply
         * @memberOf me.Matrix2d
         * @function
         * @param {Number} a the m1,1 (m11) value in the matrix
         * @param {Number} b the m1,2 (m12) value in the matrix
         * @param {Number} c the m2,1 (m21) value in the matrix
         * @param {Number} d the m2,2 (m22) value in the matrix
         * @param {Number} [e] The delta x (dx) value in the matrix
         * @param {Number} [f] The delta y (dy) value in the matrix
         * @return {me.Matrix2d} this matrix
         */
        multiply : function (a, b, c, d, e, f) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;

            this.a = a * a1 + b * c1;
            this.b = a * b1 + b * d1;
            this.c = c * a1 + d * c1;
            this.d = c * b1 + d * d1;
            this.e = e * a1 + f * c1 + this.e;
            this.f = e * b1 + f * d1 + this.f;
            return this;
        },

        /**
         * scale the matrix
         * @name scale
         * @memberOf me.Matrix2d
         * @function
         * @param {Number} sx a number representing the abscissa of the scaling vector.
         * @param {Number} sy a number representing the abscissa of the scaling vector.
         * @return {me.Matrix2d} this matrix
         */
        scale : function (sx, sy) {
            this.a *= sx;
            this.d *= sy;

            this.e *= sx;
            this.f *= sy;

            return this;
        },

        /**
         * rotate the matrix
         * @name rotate
         * @memberOf me.Matrix2d
         * @function
         * @param {Number} angle an angle in radians representing the angle of the rotation. A positive angle denotes a clockwise rotation, a negative angle a counter-clockwise one.
         * @return {me.Matrix2d} this matrix
         */
        rotate : function (angle) {
            if (angle !== 0) {
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var a = this.a;
                var b = this.b;
                var c = this.c;
                var d = this.d;
                var e = this.e;
                var f = this.f;
                this.a = a * cos - b * sin;
                this.b = a * sin + b * cos;
                this.c = c * cos - d * sin;
                this.d = c * sin + d * cos;
                this.e = e * cos - f * sin;
                this.f = e * sin + f * cos;
            }
            return this;
        },

        /**
         * translate the matrix
         * @name translate
         * @memberOf me.Matrix2d
         * @function
         * @param {me.Vector2d} x the x coordindates to translate the matrix by
         * @param {me.Vector2d} y the y coordindates to translate the matrix by
         * @return {me.Matrix2d} this matrix
         */
        translate : function (x, y) {
            this.e += x;
            this.f += y;

            return this;
        },

        /**
         * translate the matrix the matrix
         * @name translateV
         * @memberOf me.Matrix2d
         * @function
         * @param {me.Vector2d} v the vector to translate the matrix by
         * @return {me.Matrix2d} this matrix
         */
        translateV : function (v) {
            return this.translate(v.x, v.y);
        },

        /**
         * returns true if the matrix is an identity matrix.
         * @name isIdentity
         * @memberOf me.Matrix2d
         * @function
         * @return {Boolean}
         **/
        isIdentity : function () {
            return (this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.e === 0 && this.f === 0);
        },

        /**
         * Clone the Matrix
         * @name clone
         * @memberOf me.Matrix2d
         * @function
         * @return {me.Matrix2d}
         */
        clone : function () {
            return new me.Matrix2d(this.a, this.b, this.c, this.d, this.e, this.f);
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * A base class for renderable objects.
     * @class
     * @extends me.Rect
     * @memberOf me
     * @constructor
     * @param {me.Vector2d} pos position of the renderable object
     * @param {Number} width object width
     * @param {Number} height object height
     */
    me.Renderable = me.Rect.extend(
    /** @scope me.Renderable.prototype */
    {
        /**
         * to identify the object as a renderable object
         * @ignore
         */
        isRenderable : true,

        /**
         * (G)ame (U)nique (Id)entifier" <br>
         * a GUID will be allocated for any renderable object added <br>
         * to an object container (including the `me.game.world` container)
         * @public
         * @type String
         * @name GUID
         * @memberOf me.Renderable
         */
        GUID : undefined,

        /**
         * Whether the renderable object is visible and within the viewport<br>
         * default value : false
         * @public
         * @readonly
         * @type Boolean
         * @name inViewport
         * @memberOf me.Renderable
         */
        inViewport : false,

        /**
         * Whether the renderable object will always update, even when outside of the viewport<br>
         * default value : false
         * @public
         * @type Boolean
         * @name alwaysUpdate
         * @memberOf me.Renderable
         */
        alwaysUpdate : false,

        /**
         * Whether to update this object when the game is paused.
         * default value : false
         * @public
         * @type Boolean
         * @name updateWhenPaused
         * @memberOf me.Renderable
         */
        updateWhenPaused: false,

        /**
         * make the renderable object persistent over level changes<br>
         * default value : false
         * @public
         * @type Boolean
         * @name isPersistent
         * @memberOf me.Renderable
         */
        isPersistent : false,

        /**
         * Define if a renderable follows screen coordinates (floating)<br>
         * or the world coordinates (not floating)<br>
         * default value : false
         * @public
         * @type Boolean
         * @name floating
         * @memberOf me.Renderable
         */
        floating : false,

        /**
         * Z-order for object sorting<br>
         * default value : 0
         * @private
         * @type Number
         * @name z
         * @memberOf me.Renderable
         */
        z : 0,

        /**
         * Define the object anchoring point<br>
         * This is used when positioning, or scaling the object<br>
         * The anchor point is a value between 0.0 and 1.0 (1.0 being the maximum size of the object) <br>
         * (0, 0) means the top-left corner, <br>
         * (1, 1) means the bottom-right corner, <br>
         * default anchoring point is the center (0.5, 0.5) of the object.
         * @public
         * @type me.Vector2d
         * @name anchorPoint
         * @memberOf me.Renderable
         */
        anchorPoint: new me.Vector2d(),

        /**
         * Define the renderable opacity<br>
         * Set to zero if you do not wish an object to be drawn
         * @see me.Renderable#setOpacity
         * @see me.Renderable#getOpacity
         * @public
         * @type Number
         * @name me.Renderable#alpha
         */
        alpha: 1.0,

        /**
         * @ignore
         */
        init : function (pos, width, height) {
            // call the parent constructor
            this.parent(pos, width, height);

            // set the default anchor point (middle of the renderable)
            this.anchorPoint.set(0.5, 0.5);

            // ensure it's fully opaque by default
            this.setOpacity(1.0);
        },

        /**
         * get the renderable alpha channel value<br>
         * @name getOpacity
         * @memberOf me.Renderable
         * @function
         * @return {Number} current opacity value between 0 and 1
         */
        getOpacity : function () {
            return this.alpha;
        },

        /**
         * set the renderable alpha channel value<br>
         * @name setOpacity
         * @memberOf me.Renderable
         * @function
         * @param {Number} alpha opacity value between 0 and 1
         */
        setOpacity : function (alpha) {
            if (typeof (alpha) === "number") {
                this.alpha = alpha.clamp(0.0, 1.0);
                // Set to 1 if alpha is NaN
                if (this.alpha !== this.alpha) {
                    this.alpha = 1.0;
                }
            }
        },

        /**
         * update function
         * called by the game manager on each game loop
         * @name update
         * @memberOf me.Renderable
         * @function
         * @protected
         * @param {Number} dt time since the last update in milliseconds.
         * @return false
         **/
        update : function () {
            return false;
        },

        /**
         * object draw
         * called by the game manager on each game loop
         * @name draw
         * @memberOf me.Renderable
         * @function
         * @protected
         * @param {Context2d} context 2d Context on which draw our object
         **/
        draw : function (context, color) {
            // draw the parent rectangle
            this.parent(context, color);
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * A Simple object to display a sprite on screen.
     * @class
     * @extends me.Renderable
     * @memberOf me
     * @constructor
     * @param {Number} x the x coordinates of the sprite object
     * @param {Number} y the y coordinates of the sprite object
     * @param {Image} image reference to the Sprite Image. See {@link me.loader#getImage}
     * @param {Number} [spritewidth] sprite width
     * @param {Number} [spriteheigth] sprite height
     * @example
     * // create a static Sprite Object
     * mySprite = new me.SpriteObject (100, 100, me.loader.getImage("mySpriteImage"));
     */
    me.SpriteObject = me.Renderable.extend(
    /** @scope me.SpriteObject.prototype */
    {
        // default scale ratio of the object
        /** @ignore */
        scale : new me.Vector2d(),

        // if true, image flipping/scaling is needed
        scaleFlag : false,

        // just to keep track of when we flip
        lastflipX : false,
        lastflipY : false,

        // z position (for ordering display)
        z : 0,

        // image offset
        offset : new me.Vector2d(),

        /**
         * Set the angle (in Radians) of a sprite to rotate it <br>
         * WARNING: rotating sprites decreases performances
         * @public
         * @type Number
         * @name me.SpriteObject#angle
         */
        angle: 0,

        /**
         * Source rotation angle for pre-rotating the source image<br>
         * Commonly used for TexturePacker
         * @ignore
         */
        _sourceAngle: 0,

        // image reference
        image : null,

        // to manage the flickering effect
        flickering : false,
        flickerDuration : 0,
        flickercb : null,
        flickerState : false,

        /**
         * @ignore
         */
        init : function (x, y, image, spritewidth, spriteheight) {

            // Used by the game engine to adjust visibility as the
            // sprite moves in and out of the viewport
            this.isSprite = true;

            // call the parent constructor
            this.parent(new me.Vector2d(x, y),
                        spritewidth  || image.width,
                        spriteheight || image.height);

            // cache image reference
            this.image = image;

            // scale factor of the object
            this.scale.set(1.0, 1.0);
            this.lastflipX = this.lastflipY = false;
            this.scaleFlag = false;

            // set the default sprite index & offset
            this.offset.set(0, 0);

            // non persistent per default
            this.isPersistent = false;

            // and not flickering
            this.flickering = false;
        },

        /**
         * specify a transparent color
         * @name setTransparency
         * @memberOf me.SpriteObject
         * @function
         * @deprecated Use PNG or GIF with transparency instead
         * @param {String} color color key in "#RRGGBB" format
         */
        setTransparency : function (col) {
            // remove the # if present
            col = (col.charAt(0) === "#") ? col.substring(1, 7) : col;
            // applyRGB Filter (return a context object)
            this.image = me.video.applyRGBFilter(
                this.image,
                "transparent",
                col.toUpperCase()
            ).canvas;
        },

        /**
         * return the flickering state of the object
         * @name isFlickering
         * @memberOf me.SpriteObject
         * @function
         * @return {Boolean}
         */
        isFlickering : function () {
            return this.flickering;
        },

        /**
         * make the object flicker
         * @name flicker
         * @memberOf me.SpriteObject
         * @function
         * @param {Number} duration expressed in milliseconds
         * @param {Function} callback Function to call when flickering ends
         * @example
         * // make the object flicker for 1 second
         * // and then remove it
         * this.flicker(1000, function ()
         * {
         *    me.game.world.removeChild(this);
         * });
         */
        flicker : function (duration, callback) {
            this.flickerDuration = duration;
            if (this.flickerDuration <= 0) {
                this.flickering = false;
                this.flickercb = null;
            } else if (!this.flickering) {
                this.flickercb = callback;
                this.flickering = true;
            }
        },

        /**
         * Flip object on horizontal axis
         * @name flipX
         * @memberOf me.SpriteObject
         * @function
         * @param {Boolean} flip enable/disable flip
         */
        flipX : function (flip) {
            if (flip !== this.lastflipX) {
                this.lastflipX = flip;

                // invert the scale.x value
                this.scale.x = -this.scale.x;

                // set the scaleFlag
                this.scaleFlag = this.scale.x !== 1.0 || this.scale.y !== 1.0;
            }
        },

        /**
         * Flip object on vertical axis
         * @name flipY
         * @memberOf me.SpriteObject
         * @function
         * @param {Boolean} flip enable/disable flip
         */
        flipY : function (flip) {
            if (flip !== this.lastflipY) {
                this.lastflipY = flip;

                // invert the scale.x value
                this.scale.y = -this.scale.y;

                // set the scaleFlag
                this.scaleFlag = this.scale.x !== 1.0 || this.scale.y !== 1.0;
            }
        },

        /**
         * Resize the sprite around his center<br>
         * @name resize
         * @memberOf me.SpriteObject
         * @function
         * @param {Number} ratioX x scaling ratio
         * @param {Number} ratioY y scaling ratio
         */
        resize : function (ratioX, ratioY) {
            var x = ratioX;
            var y = typeof (ratioY) === "undefined" ? ratioX : ratioY;
            if (x > 0) {
                this.scale.x = this.scale.x < 0.0 ? -x : x;
            }
            if (y > 0) {
                this.scale.y = this.scale.y < 0.0 ? -y : y;
            }
            // set the scaleFlag
            this.scaleFlag = this.scale.x !== 1.0 || this.scale.y !== 1.0;

        },

        /**
         * Resize the sprite around his center<br>
         * @name resizeV
         * @memberOf me.SpriteObject
         * @function
         * @param {me.Vector2d} vector ratio
         */
        resizeV : function (ratio) {
            this.resize(ratio.x, ratio.y);
        },

        /**
         * sprite update<br>
         * not to be called by the end user<br>
         * called by the game manager on each game loop
         * @name update
         * @memberOf me.SpriteObject
         * @function
         * @protected
         * @return false
         **/
        update : function (dt) {
            //update the "flickering" state if necessary
            if (this.flickering) {
                this.flickerDuration -= dt;
                if (this.flickerDuration < 0) {
                    if (this.flickercb) {
                        this.flickercb();
                    }
                    this.flicker(-1);
                }
                return true;
            }
            return false;
        },

        /**
         * object draw<br>
         * not to be called by the end user<br>
         * called by the game manager on each game loop
         * @name draw
         * @memberOf me.SpriteObject
         * @function
         * @protected
         * @param {Context2d} context 2d Context on which draw our object
         **/
        draw : function (context) {
            // do nothing if we are flickering
            if (this.flickering) {
                this.flickerState = !this.flickerState;
                if (!this.flickerState) {
                    return;
                }
            }
            // save context
            context.save();
            // sprite alpha value
            context.globalAlpha *= this.getOpacity();

            // clamp position vector to pixel grid
            var xpos = ~~this.pos.x, ypos = ~~this.pos.y;

            var w = this.width, h = this.height;
            var angle = this.angle + this._sourceAngle;

            if ((this.scaleFlag) || (angle !== 0)) {
                // calculate pixel pos of the anchor point
                var ax = w * this.anchorPoint.x, ay = h * this.anchorPoint.y;
                // translate to the defined anchor point
                context.translate(xpos + ax, ypos + ay);
                // scale
                if (this.scaleFlag) {
                    context.scale(this.scale.x, this.scale.y);
                }
                if (angle !== 0) {
                    context.rotate(angle);
                }

                if (this._sourceAngle !== 0) {
                    // swap w and h for rotated source images
                    w = this.height;
                    h = this.width;

                    xpos = -ay;
                    ypos = -ax;
                }
                else {
                    // reset coordinates back to upper left coordinates
                    xpos = -ax;
                    ypos = -ay;
                }
            }

            context.drawImage(
                this.image,
                this.offset.x, this.offset.y,   // sx,sy
                w, h,                           // sw,sh
                xpos, ypos,                     // dx,dy
                w, h                            // dw,dh
            );

            // restore context
            context.restore();
        },

        /**
         * Destroy function<br>
         * @ignore
         */
        destroy : function () {
            this.onDestroyEvent.apply(this, arguments);
        },

        /**
         * OnDestroy Notification function<br>
         * Called by engine before deleting the object
         * @name onDestroyEvent
         * @memberOf me.SpriteObject
         * @function
         */
        onDestroyEvent : function () {
            // to be extended !
        }
    });

    /**
     * an object to manage animation
     * @class
     * @extends me.SpriteObject
     * @memberOf me
     * @constructor
     * @param {Number} x the x coordinates of the sprite object
     * @param {Number} y the y coordinates of the sprite object
     * @param {Image} image reference of the animation sheet
     * @param {Number} spritewidth width of a single sprite within the spritesheet
     * @param {Number} [spriteheight=image.height] height of a single sprite within the spritesheet
     */
    me.AnimationSheet = me.SpriteObject.extend(
    /** @scope me.AnimationSheet.prototype */
    {
        // Spacing and margin
        /** @ignore */
        spacing: 0,
        /** @ignore */
        margin: 0,

        /**
         * pause and resume animation<br>
         * default value : false;
         * @public
         * @type Boolean
         * @name me.AnimationSheet#animationpause
         */
        animationpause : false,

        /**
         * animation cycling speed (delay between frame in ms)<br>
         * default value : 100ms;
         * @public
         * @type Number
         * @name me.AnimationSheet#animationspeed
         */
        animationspeed : 100,

        /** @ignore */
        init : function (x, y, image, spritewidth, spriteheight, spacing, margin, atlas, atlasIndices) {
            // hold all defined animation
            this.anim = {};

            // a flag to reset animation
            this.resetAnim = null;

            // default animation sequence
            this.current = null;

            // default animation speed (ms)
            this.animationspeed = 100;

            // Spacing and margin
            this.spacing = spacing || 0;
            this.margin = margin || 0;

            // call the constructor
            this.parent(x, y, image, spritewidth, spriteheight, spacing, margin);

            // store the current atlas information
            this.textureAtlas = null;
            this.atlasIndices = null;

            // build the local textureAtlas
            this.buildLocalAtlas(atlas, atlasIndices);

            // create a default animation sequence with all sprites
            this.addAnimation("default", null);

            // set as default
            this.setCurrentAnimation("default");
        },

        /**
         * build the local (private) atlas
         * @ignore
         */
        buildLocalAtlas : function (atlas, indices) {
            // reinitialze the atlas
            if (typeof(atlas) !== "undefined") {
                this.textureAtlas = atlas;
                this.atlasIndices = indices;
            }
            else {
                // regular spritesheet
                this.textureAtlas = [];
                // calculate the sprite count (line, col)
                var spritecount = new me.Vector2d(
                    ~~((this.image.width - this.margin) / (this.width + this.spacing)),
                    ~~((this.image.height - this.margin) / (this.height + this.spacing))
                );

                // build the local atlas
                for (var frame = 0, count = spritecount.x * spritecount.y; frame < count ; frame++) {
                    this.textureAtlas[frame] = {
                        name : "" + frame,
                        offset : new me.Vector2d(
                            this.margin + (this.spacing + this.width) * (frame % spritecount.x),
                            this.margin + (this.spacing + this.height) * ~~(frame / spritecount.x)
                        ),
                        width : this.width,
                        height : this.height,
                        hWidth : this.width / 2,
                        hHeight : this.height / 2,
                        angle : 0
                    };
                }
            }
        },

        /**
         * add an animation <br>
         * For fixed-sized cell sprite sheet, the index list must follow the
         * logic as per the following example :<br>
         * <img src="images/spritesheet_grid.png"/>
         * @name addAnimation
         * @memberOf me.AnimationSheet
         * @function
         * @param {String} name animation id
         * @param {Number[]|String[]} index list of sprite index or name
         * defining the animation
         * @param {Number} [animationspeed] cycling speed for animation in ms
         * (delay between each frame).
         * @see me.AnimationSheet#animationspeed
         * @example
         * // walking animation
         * this.addAnimation("walk", [ 0, 1, 2, 3, 4, 5 ]);
         * // eating animation
         * this.addAnimation("eat", [ 6, 6 ]);
         * // rolling animation
         * this.addAnimation("roll", [ 7, 8, 9, 10 ]);
         * // slower animation
         * this.addAnimation("roll", [ 7, 8, 9, 10 ], 200);
         */
        addAnimation : function (name, index, animationspeed) {
            this.anim[name] = {
                name : name,
                frame : [],
                idx : 0,
                length : 0,
                animationspeed: animationspeed || this.animationspeed,
                nextFrame : 0
            };

            if (index == null) {
                index = [];
                var j = 0;
                // create a default animation with all frame
                this.textureAtlas.forEach(function () {
                    index[j] = j++;
                });
            }

            // set each frame configuration (offset, size, etc..)
            for (var i = 0, len = index.length; i < len; i++) {
                if (typeof(index[i]) === "number") {
                    this.anim[name].frame[i] = this.textureAtlas[index[i]];
                }
                else { // string
                    if (this.atlasIndices === null) {
                        throw "melonjs: string parameters for addAnimation " +
                            " are only allowed for TextureAtlas ";
                    }
                    else {
                        this.anim[name].frame[i] = this.textureAtlas[
                            this.atlasIndices[index[i]]
                        ];
                    }
                }
            }
            this.anim[name].length = this.anim[name].frame.length;
        },

        /**
         * set the current animation
         * @name setCurrentAnimation
         * @memberOf me.AnimationSheet
         * @function
         * @param {String} name animation id
         * @param {String|Function} [onComplete] animation id to switch to when
         * complete, or callback
         * @example
         * // set "walk" animation
         * this.setCurrentAnimation("walk");
         *
         * // set "eat" animation, and switch to "walk" when complete
         * this.setCurrentAnimation("eat", "walk");
         *
         * // set "die" animation, and remove the object when finished
         * this.setCurrentAnimation("die", (function () {
         *    me.game.world.removeChild(this);
         *    return false; // do not reset to first frame
         * }).bind(this));
         *
         * // set "attack" animation, and pause for a short duration
         * this.setCurrentAnimation("die", (function () {
         *    this.animationpause = true;
         *
         *    // back to "standing" animation after 1 second
         *    setTimeout(function () {
         *        this.setCurrentAnimation("standing");
         *    }, 1000);
         *
         *    return false; // do not reset to first frame
         * }).bind(this));
         **/
        setCurrentAnimation : function (name, resetAnim) {
            if (this.anim[name]) {
                this.current = this.anim[name];
                this.resetAnim = resetAnim || null;
                this.setAnimationFrame(this.current.idx); // or 0 ?
                this.current.nextFrame = this.current.animationspeed;
            } else {
                throw "melonJS: animation id '" + name + "' not defined";
            }
        },

        /**
         * return true if the specified animation is the current one.
         * @name isCurrentAnimation
         * @memberOf me.AnimationSheet
         * @function
         * @param {String} name animation id
         * @return {Boolean}
         * @example
         * if (!this.isCurrentAnimation("walk")) {
         *    // do something funny...
         * }
         */
        isCurrentAnimation : function (name) {
            return this.current.name === name;
        },

        /**
         * force the current animation frame index.
         * @name setAnimationFrame
         * @memberOf me.AnimationSheet
         * @function
         * @param {Number} [index=0] animation frame index
         * @example
         * //reset the current animation to the first frame
         * this.setAnimationFrame();
         */
        setAnimationFrame : function (idx) {
            this.current.idx = (idx || 0) % this.current.length;
            var frame = this.current.frame[this.current.idx];
            this.offset = frame.offset;
            this.width = frame.width;
            this.height = frame.height;
            this.hWidth = frame.hWidth;
            this.hHeight = frame.hHeight;
            this._sourceAngle = frame.angle;
        },

        /**
         * return the current animation frame index.
         * @name getCurrentAnimationFrame
         * @memberOf me.AnimationSheet
         * @function
         * @return {Number} current animation frame index
         */
        getCurrentAnimationFrame : function () {
            return this.current.idx;
        },

        /**
         * update the animation<br>
         * this is automatically called by the game manager {@link me.game}
         * @name update
         * @memberOf me.AnimationSheet
         * @function
         * @protected
         * @param {Number} dt time since the last update in milliseconds.
         */
        update : function (dt) {
            // update animation if necessary
            if (!this.animationpause) {
                this.current.nextFrame -= dt;
                if (this.current.nextFrame <= 0) {
                    this.setAnimationFrame(++this.current.idx);

                    // switch animation if we reach the end of the strip
                    // and a callback is defined
                    if (this.current.idx === 0 && this.resetAnim)  {
                        // if string, change to the corresponding animation
                        if (typeof this.resetAnim === "string") {
                            this.setCurrentAnimation(this.resetAnim);
                        }
                        // if function (callback) call it
                        else if (typeof this.resetAnim === "function" &&
                                 this.resetAnim() === false) {
                            this.current.idx = this.current.length - 1;
                            this.setAnimationFrame(this.current.idx);
                            this.parent(dt);
                            return false;
                        }
                    }

                    // set next frame timestamp
                    this.current.nextFrame = this.current.animationspeed;

                    return this.parent(dt) || true;
                }
            }
            return this.parent(dt);
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a local constant for the -(Math.PI / 2) value
     * @ignore
     */
    var nhPI = -(Math.PI / 2);

    /**
     * A Texture atlas object<br>
     * Currently support : <br>
     * - [TexturePacker]{@link http://www.codeandweb.com/texturepacker/} : through JSON export <br>
     * - [ShoeBox]{@link http://renderhjs.net/shoebox/} : through JSON export using the melonJS setting [file]{@link https://github.com/melonjs/melonJS/raw/master/media/shoebox_JSON_export.sbx}
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @param {Object} atlas atlas information. See {@link me.loader#getJSON}
     * @param {Image} [texture=atlas.meta.image] texture name
     * @example
     * // create a texture atlas
     * texture = new me.TextureAtlas (
     *    me.loader.getJSON("texture"),
     *    me.loader.getImage("texture")
     * );
     */
    me.TextureAtlas = Object.extend(
    /** @scope me.TextureAtlas.prototype */
    {
        /**
         * to identify the atlas format (e.g. texture packer)
         * @ignore
         */
        format: null,

        /**
         * the image texture itself
         * @ignore
         */
        texture : null,

        /**
         * the atlas dictionnary
         * @ignore
         */
        atlas: null,

        /**
         * @ignore
         */
        init : function (atlas, texture) {
            if (atlas && atlas.meta) {
                // Texture Packer
                if (atlas.meta.app.contains("texturepacker")) {
                    this.format = "texturepacker";
                    // set the texture
                    if (typeof(texture) === "undefined") {
                        var name = me.utils.getBasename(atlas.meta.image);
                        this.texture = me.loader.getImage(name);
                        if (this.texture === null) {
                            throw "melonjs: Atlas texture '" + name + "' not found";
                        }
                    } else {
                        this.texture = texture;
                    }
                }
                // ShoeBox
                if (atlas.meta.app.contains("ShoeBox")) {
                    if (!atlas.meta.exporter || !atlas.meta.exporter.contains("melonJS")) {
                        throw "melonjs: ShoeBox requires the JSON exporter : https://github.com/melonjs/melonJS/tree/master/media/shoebox_JSON_export.sbx";
                    }
                    this.format = "ShoeBox";
                    // set the texture
                    this.texture = texture;
                }
                // initialize the atlas
                this.atlas = this.initFromTexturePacker(atlas);
            }

            // if format not recognized
            if (this.atlas === null) {
                throw "melonjs: texture atlas format not supported";
            }
        },

        /**
         * @ignore
         */
        initFromTexturePacker : function (data) {
            var atlas = {};
            data.frames.forEach(function (frame) {
                // fix wrongly formatted JSON (e.g. last dummy object in ShoeBox)
                if (frame.hasOwnProperty("filename")) {
                    atlas[frame.filename] = {
                        frame: new me.Rect(
                            new me.Vector2d(frame.frame.x, frame.frame.y),
                            frame.frame.w, frame.frame.h
                        ),
                        source: new me.Rect(
                            new me.Vector2d(frame.spriteSourceSize.x, frame.spriteSourceSize.y),
                            frame.spriteSourceSize.w, frame.spriteSourceSize.h
                        ),
                        // non trimmed size, but since we don't support trimming both value are the same
                        //sourceSize: new me.Vector2d(frame.sourceSize.w,frame.sourceSize.h),
                        rotated : frame.rotated === true,
                        trimmed : frame.trimmed === true
                    };
                }
            });
            return atlas;
        },

        /**
         * return the Atlas texture
         * @name getTexture
         * @memberOf me.TextureAtlas
         * @function
         * @return {Image}
         */
        getTexture : function () {
            return this.texture;
        },

        /**
         * return a normalized region/frame information for the specified sprite name
         * @name getRegion
         * @memberOf me.TextureAtlas
         * @function
         * @param {String} name name of the sprite
         * @return {Object}
         */
        getRegion : function (name) {
            var region = this.atlas[name];
            if (region) {
                return {
                    name: name, // frame name
                    pos: region.source.pos.clone(), // unused for now
                    offset: region.frame.pos.clone(),
                    width: region.frame.width,
                    height: region.frame.height,
                    hWidth: region.frame.width / 2,
                    hHeight: region.frame.height / 2,
                    angle : (region.rotated === true) ? nhPI : 0
                };
            }
            return null;
        },

        /**
         * Create a sprite object using the first region found using the specified name
         * @name createSpriteFromName
         * @memberOf me.TextureAtlas
         * @function
         * @param {String} name name of the sprite
         * @return {me.SpriteObject}
         * @example
         * // create a new texture atlas object under the `game` namespace
         * game.texture = new me.TextureAtlas(
         *    me.loader.getJSON("texture"),
         *    me.loader.getImage("texture")
         * );
         * ...
         * ...
         * // add the coin sprite as renderable for the entity
         * this.renderable = game.texture.createSpriteFromName("coin.png");
         * // set the renderable position to bottom center
         * this.anchorPoint.set(0.5, 1.0);
         */
        createSpriteFromName : function (name) {
            var region = this.getRegion(name);
            if (region) {
                // instantiate a new sprite object
                var sprite = new me.SpriteObject(
                    0, 0,
                    this.getTexture(),
                    region.width, region.height
                );
                // set the sprite offset within the texture
                sprite.offset.setV(region.offset);
                // set angle if defined
                sprite._sourceAngle = region.angle;

                /* -> when using anchor positioning, this is not required
                   -> and makes final position wrong...
                if (tex.trimmed===true) {
                    // adjust default position
                    sprite.pos.add(tex.source.pos);
                }
                */
                // return our object
                return sprite;
            }
            // throw an error
            throw "melonjs: TextureAtlas - region for " + name + " not found";
        },

        /**
         * Create an animation object using the first region found using all specified names
         * @name createAnimationFromName
         * @memberOf me.TextureAtlas
         * @function
         * @param {String[]} names list of names for each sprite
         * @return {me.AnimationSheet}
         * @example
         * // create a new texture atlas object under the `game` namespace
         * game.texture = new me.TextureAtlas(
         *    me.loader.getJSON("texture"),
         *    me.loader.getImage("texture")
         * );
         * ...
         * ...
         * // create a new animationSheet as renderable for the entity
         * this.renderable = game.texture.createAnimationFromName([
         *   "walk0001.png", "walk0002.png", "walk0003.png",
         *   "walk0004.png", "walk0005.png", "walk0006.png",
         *   "walk0007.png", "walk0008.png", "walk0009.png",
         *   "walk0010.png", "walk0011.png"
         * ]);
         *
         * // define an additional basic walking animatin
         * this.renderable.addAnimation ("simple_walk", [0,2,1]);
         * // you can also use frame name to define your animation
         * this.renderable.addAnimation ("speed_walk", ["walk0007.png", "walk0008.png", "walk0009.png", "walk0010.png"]);
         * // set the default animation
         * this.renderable.setCurrentAnimation("simple_walk");
         * // set the renderable position to bottom center
         * this.anchorPoint.set(0.5, 1.0);
         */
        createAnimationFromName : function (names) {
            var tpAtlas = [], indices = {};
            // iterate through the given names
            // and create a "normalized" atlas
            for (var i = 0; i < names.length;++i) {
                tpAtlas[i] = this.getRegion(names[i]);
                indices[names[i]] = i;
                if (tpAtlas[i] == null) {
                    // throw an error
                    throw "melonjs: TextureAtlas - region for " + names[i] + " not found";
                }
            }
            // instantiate a new animation sheet object
            return new me.AnimationSheet(
                0, 0,
                this.texture,
                0, 0, 0, 0,
                tpAtlas, indices
            );
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function () {
    // some ref shortcut
    var MIN = Math.min, MAX = Math.max;

    /**
     * a camera/viewport Object
     * @class
     * @extends me.Renderable
     * @memberOf me
     * @constructor
     * @param {Number} minX start x offset
     * @param {Number} minY start y offset
     * @param {Number} maxX end x offset
     * @param {Number} maxY end y offset
     */
    me.Viewport = me.Renderable.extend(
    /** @scope me.Viewport.prototype */ {

        /**
         * Axis definition :<br>
         * <p>
         * AXIS.NONE<br>
         * AXIS.HORIZONTAL<br>
         * AXIS.VERTICAL<br>
         * AXIS.BOTH
         * </p>
         * @public
         * @constant
         * @type enum
         * @name AXIS
         * @memberOf me.Viewport
         */
        AXIS : {
            NONE : 0,
            HORIZONTAL : 1,
            VERTICAL : 2,
            BOTH : 3
        },

        /**
         * Camera bounds
         * @public
         * @constant
         * @type me.Rect
         * @name bounds
         * @memberOf me.Viewport
         */
        bounds : null,

        // camera deadzone
        deadzone : null,

        // target to follow
        target : null,

        // axis to follow
        follow_axis : 0,

        // shake parameters
        _shake : null,

        // fade parameters
        _fadeIn : null,
        _fadeOut : null,

        // cache the screen rendering position
        screenX : 0,
        screenY : 0,

        /** @ignore */
        init : function (minX, minY, maxX, maxY) {
            // viewport coordinates
            this.parent(new me.Vector2d(minX, minY), maxX - minX, maxY - minY);

            // real worl limits
            this.bounds = new me.Rect(
                new me.Vector2d(-Infinity, -Infinity),
                Infinity,
                Infinity
            );

            // offset for shake effect
            this.offset = new me.Vector2d();

            // target to follow
            this.target = null;

            // default value follow
            this.follow_axis = this.AXIS.NONE;

            // shake variables
            this._shake = {
                intensity : 0,
                duration : 0,
                axis : this.AXIS.BOTH,
                onComplete : null
            };

            // flash variables
            this._fadeOut = {
                color : null,
                duration : 0,
                tween : null
            };
            // fade variables
            this._fadeIn = {
                color : null,
                duration : 0,
                tween : null
            };

            // set a default deadzone
            this.setDeadzone(this.width / 6, this.height / 6);
        },

        /*
         * Private functions
         */

        /** @ignore */
        _followH : function (target) {
            var _x = this.pos.x;
            if ((target.x - this.pos.x) > (this.deadzone.right)) {
                this.pos.x = ~~MIN(
                    (target.x) - (this.deadzone.right),
                    this.bounds.width - this.width
                );
            }
            else if ((target.x - this.pos.x) < (this.deadzone.pos.x)) {
                this.pos.x = ~~MAX(
                    (target.x) - this.deadzone.pos.x,
                    this.bounds.pos.x
                );
            }
            return (_x !== this.pos.x);
        },

        /** @ignore */
        _followV : function (target) {
            var _y = this.pos.y;
            if ((target.y - this.pos.y) > (this.deadzone.bottom)) {
                this.pos.y = ~~MIN(
                    (target.y) - (this.deadzone.bottom),
                    this.bounds.height - this.height
                );
            }
            else if ((target.y - this.pos.y) < (this.deadzone.pos.y)) {
                this.pos.y = ~~MAX(
                    (target.y) - this.deadzone.pos.y,
                    this.bounds.pos.y
                );
            }
            return (_y !== this.pos.y);
        },

        /*
         * Public functions
         */

        /**
         * reset the viewport to specified coordinates
         * @name reset
         * @memberOf me.Viewport
         * @function
         * @param {Number} [x=0]
         * @param {Number} [y=0]
         */
        reset : function (x, y) {
            // reset the initial viewport position to 0,0
            this.pos.x = x || 0;
            this.pos.y = y || 0;

            // reset the target
            this.target = null;

            // reset default axis value for follow
            this.follow_axis = null;
        },

        /**
         * Change the deadzone settings
         * @name setDeadzone
         * @memberOf me.Viewport
         * @function
         * @param {Number} w deadzone width
         * @param {Number} h deadzone height
         */
        setDeadzone : function (w, h) {

            if (this.deadzone === null) {
                this.deadzone = new me.Rect(new me.Vector2d(), 0, 0);
            }

            // reusing the old code for now...
            this.deadzone.pos.set(
                ~~((this.width - w) / 2),
                ~~((this.height - h) / 2 - h * 0.25)
            );
            this.deadzone.resize(w, h);

            // force a camera update
            this.updateTarget();
        },

        /**
         * set the viewport boundaries (world limit)
         * @name setBounds
         * @memberOf me.Viewport
         * @function
         * @param {Number} x world left limit
         * @param {Number} y world top limit
         * @param {Number} w world width limit
         * @param {Number} h world height limit
         */
        setBounds : function (x, y, w, h) {
            this.bounds.pos.set(x, y);
            this.bounds.resize(w, h);
        },

        /**
         * set the viewport to follow the specified entity
         * @name follow
         * @memberOf me.Viewport
         * @function
         * @param {me.ObjectEntity|me.Vector2d} target ObjectEntity or Position
         * Vector to follow
         * @param {me.Viewport#AXIS} [axis=AXIS.BOTH] Which axis to follow
         */
        follow : function (target, axis) {
            if (target instanceof me.ObjectEntity) {
                this.target = target.pos;
            }
            else if (target instanceof me.Vector2d) {
                this.target = target;
            }
            else {
                throw "melonJS: invalid target for viewport.follow";
            }
            // if axis is null, camera is moved on target center
            this.follow_axis = (
                typeof(axis) === "undefined" ? this.AXIS.BOTH : axis
            );

            // force a camera update
            this.updateTarget();
        },

        /**
         * move the viewport position by the specified offset
         * @name move
         * @memberOf me.Viewport
         * @function
         * @param {Number} x
         * @param {Number} y
         * @example
         * // Move the viewport up by four pixels
         * me.game.viewport.move(0, -4);
         */
        move : function (x, y) {
            this.moveTo(~~(this.pos.x + x), ~~(this.pos.y + y));
        },

        /**
         * move the viewport to the specified coordinates
         * @name moveTo
         * @memberOf me.Viewport
         * @function
         * @param {Number} x
         * @param {Number} y
         */
        moveTo : function (x, y) {
            this.pos.x = (~~x).clamp(
                this.bounds.pos.x,
                this.bounds.width - this.width
            );
            this.pos.y = (~~y).clamp(
                this.bounds.pos.y,
                this.bounds.height - this.height
            );

            //publish the corresponding message
            me.event.publish(me.event.VIEWPORT_ONCHANGE, [this.pos]);
        },

        /** @ignore */
        updateTarget : function () {
            var updated = false;

            if (this.target) {
                switch (this.follow_axis) {
                    case this.AXIS.NONE:
                        //this.focusOn(this.target);
                        break;

                    case this.AXIS.HORIZONTAL:
                        updated = this._followH(this.target);
                        break;

                    case this.AXIS.VERTICAL:
                        updated = this._followV(this.target);
                        break;

                    case this.AXIS.BOTH:
                        updated = this._followH(this.target);
                        updated = this._followV(this.target) || updated;
                        break;

                    default:
                        break;
                }
            }

            return updated;
        },

        /** @ignore */
        update : function (dt) {
            var updated = this.updateTarget();

            if (this._shake.duration > 0) {
                this._shake.duration -= dt;
                if (this._shake.duration <= 0) {
                    this._shake.duration = 0;
                    this.offset.setZero();
                    if (typeof(this._shake.onComplete) === "function") {
                        this._shake.onComplete();
                    }
                }
                else {
                    if (this._shake.axis === this.AXIS.BOTH ||
                        this._shake.axis === this.AXIS.HORIZONTAL) {
                        this.offset.x = (Math.random() - 0.5) * this._shake.intensity;
                    }
                    if (this._shake.axis === this.AXIS.BOTH ||
                        this._shake.axis === this.AXIS.VERTICAL) {
                        this.offset.y = (Math.random() - 0.5) * this._shake.intensity;
                    }
                }
                // updated!
                updated = true;
            }

            if (updated === true) {
                //publish the corresponding message
                me.event.publish(me.event.VIEWPORT_ONCHANGE, [this.pos]);
            }

            // check for fade/flash effect
            if ((this._fadeIn.tween != null) || (this._fadeOut.tween != null)) {
                updated = true;
            }

            return updated;
        },

        /**
         * shake the camera
         * @name shake
         * @memberOf me.Viewport
         * @function
         * @param {Number} intensity maximum offset that the screen can be moved
         * while shaking
         * @param {Number} duration expressed in milliseconds
         * @param {me.Viewport#AXIS} [axis=AXIS.BOTH] specify on which axis you
         * want the shake effect (AXIS.HORIZONTAL, AXIS.VERTICAL, AXIS.BOTH)
         * @param {Function} [onComplete] callback once shaking effect is over
         * @example
         * // shake it baby !
         * me.game.viewport.shake(10, 500, me.game.viewport.AXIS.BOTH);
         */
        shake : function (intensity, duration, axis, onComplete) {
            if (this._shake.duration > 0) {
                return;
            }

            this._shake = {
                intensity : intensity,
                duration : duration,
                axis : axis || this.AXIS.BOTH,
                onComplete : onComplete
            };
        },

        /**
         * fadeOut(flash) effect<p>
         * screen is filled with the specified color and slowly goes back to normal
         * @name fadeOut
         * @memberOf me.Viewport
         * @function
         * @param {String} color a CSS color value
         * @param {Number} [duration=1000] expressed in milliseconds
         * @param {Function} [onComplete] callback once effect is over
         */
        fadeOut : function (color, duration, onComplete) {
            this._fadeOut.color = me.pool.pull("me.Color").parseHex(color);
            this._fadeOut.color.alpha = 1.0;
            this._fadeOut.duration = duration || 1000; // convert to ms
            this._fadeOut.tween = me.pool.pull("me.Tween", this._fadeOut.color)
                .to({ alpha: 0.0 }, this._fadeOut.duration)
                .onComplete(onComplete || null);
            this._fadeOut.tween.start();
        },

        /**
         * fadeIn effect <p>
         * fade to the specified color
         * @name fadeIn
         * @memberOf me.Viewport
         * @function
         * @param {String} color a CSS color value
         * @param {Number} [duration=1000] expressed in milliseconds
         * @param {Function} [onComplete] callback once effect is over
         */
        fadeIn : function (color, duration, onComplete) {
            this._fadeIn.color = me.pool.pull("me.Color").parseHex(color);
            this._fadeIn.color.alpha = 0.0;
            this._fadeIn.duration = duration || 1000; //convert to ms
            this._fadeIn.tween = me.pool.pull("me.Tween", this._fadeIn.color)
                .to({ alpha: 1.0 }, this._fadeIn.duration)
                .onComplete(onComplete || null);
            this._fadeIn.tween.start();
        },

        /**
         * return the viewport width
         * @name getWidth
         * @memberOf me.Viewport
         * @function
         * @return {Number}
         */
        getWidth : function () {
            return this.width;
        },

        /**
         * return the viewport height
         * @name getHeight
         * @memberOf me.Viewport
         * @function
         * @return {Number}
         */
        getHeight : function () {
            return this.height;
        },

        /**
         * set the viewport position around the specified object
         * @name focusOn
         * @memberOf me.Viewport
         * @function
         * @param {me.Renderable}
         */
        focusOn : function (target) {
            var bounds = target.getBounds();
            this.moveTo(
                target.pos.x + bounds.pos.x + bounds.hWidth,
                target.pos.y + bounds.pos.y + bounds.hHeight
            );
        },

        /**
         * check if the specified rectangle is in the viewport
         * @name isVisible
         * @memberOf me.Viewport
         * @function
         * @param {me.Rect} rect
         * @return {Boolean}
         */
        isVisible : function (rect) {
            return rect.overlaps(this);
        },

        /**
         * convert the given "local" (screen) coordinates into world coordinates
         * @name localToWorld
         * @memberOf me.Viewport
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} [v] an optional vector object where to set the
         * converted value
         * @return {me.Vector2d}
         */
        localToWorld : function (x, y, v) {
            v = v || new me.Vector2d();
            return (v.set(x, y)).add(this.pos).sub(me.game.currentLevel.pos);
        },

        /**
         * convert the given world coordinates into "local" (screen) coordinates
         * @name worldToLocal
         * @memberOf me.Viewport
         * @function
         * @param {Number} x
         * @param {Number} y
         * @param {Number} [v] an optional vector object where to set the
         * converted value
         * @return {me.Vector2d}
         */
        worldToLocal : function (x, y, v) {
            v = v || new me.Vector2d();
            return (v.set(x, y)).sub(this.pos).add(me.game.currentLevel.pos);
        },

        /**
         * render the camera effects
         * @ignore
         */
        draw : function (context) {
            // fading effect
            if (this._fadeIn.tween) {
                me.video.clearSurface(context, this._fadeIn.color.toRGBA());
                // remove the tween if over
                if (this._fadeIn.color.alpha === 1.0) {
                    this._fadeIn.tween = null;
                    me.pool.push(this._fadeIn.color);
                    this._fadeIn.color = null;
                }
            }

            // flashing effect
            if (this._fadeOut.tween) {
                me.video.clearSurface(context, this._fadeOut.color.toRGBA());
                // remove the tween if over
                if (this._fadeOut.color.alpha === 0.0) {
                    this._fadeOut.tween = null;
                    me.pool.push(this._fadeOut.color);
                    this._fadeOut.color = null;
                }
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * GUI Object<br>
     * A very basic object to manage GUI elements <br>
     * The object simply register on the "pointerdown" <br>
     * or "touchstart" event and call the onClick function"
     * @class
     * @extends me.SpriteObject
     * @memberOf me
     * @constructor
     * @param {Number} x the x coordinate of the GUI Object
     * @param {Number} y the y coordinate of the GUI Object
     * @param {me.ObjectSettings} settings Object settings
     * @example
     *
     * // create a basic GUI Object
     * var myButton = me.GUI_Object.extend({
     *     init : function (x, y) {
     *         var settings = {}
     *         settings.image = "button";
     *         settings.spritewidth = 100;
     *         settings.spriteheight = 50;
     *         // parent constructor
     *         this.parent(x, y, settings);
     *         // define the object z order
     *         this.z = 4;
     *     },
     *
     *     // output something in the console
     *     // when the object is clicked
     *     onClick : function (event) {
     *         console.log("clicked!");
     *         // don't propagate the event
     *         return false;
     *     }
     * });
     *
     * // add the object at pos (10,10)
     * me.game.world.addChild(new myButton(10,10));
     */
    me.GUI_Object = me.SpriteObject.extend(
    /** @scope me.GUI_Object.prototype */
    {
        /**
         * object can be clicked or not
         * @public
         * @type boolean
         * @name me.GUI_Object#isClickable
         */
        isClickable : true,

        // object has been updated (clicked,etc..)
        updated : false,

        /**
         * @ignore
         */
        init : function (x, y, settings) {
            this.parent(
                x, y,
                ((typeof settings.image === "string") ? me.loader.getImage(settings.image) : settings.image),
                settings.spritewidth,
                settings.spriteheight
            );

            // GUI items use screen coordinates
            this.floating = true;

            // register on mouse event
            me.input.registerPointerEvent("pointerdown", this, this.clicked.bind(this));
        },

        /**
         * return true if the object has been clicked
         * @ignore
         */
        update : function () {
            if (this.updated) {
                // clear the flag
                this.updated = false;
                return true;
            }
            return false;
        },

        /**
         * function callback for the pointerdown event
         * @ignore
         */
        clicked : function (event) {
            if (this.isClickable) {
                this.updated = true;
                return this.onClick(event);
            }
        },

        /**
         * function called when the object is clicked <br>
         * to be extended <br>
         * return false if we need to stop propagating the event
         * @name onClick
         * @memberOf me.GUI_Object
         * @public
         * @function
         * @param {Event} event the event object
         */
        onClick : function () {
            return false;
        },

        /**
         * OnDestroy notification function<br>
         * Called by engine before deleting the object<br>
         * be sure to call the parent function if overwritten
         * @name onDestroyEvent
         * @memberOf me.GUI_Object
         * @public
         * @function
         */
        onDestroyEvent : function () {
            me.input.releasePointerEvent("pointerdown", this);
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier Biot, Jason Oster
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * Private function to re-use for object removal in a defer
     * @ignore
     */
    var deferredRemove = function (child, keepalive) {
        if (child.ancestor) {
            child.ancestor.removeChildNow(child, keepalive);
        }
    };

    /**
     * A global "translation context" for nested ObjectContainers
     * @ignore
     */
    var globalTranslation = new me.Rect(new me.Vector2d(), 0, 0);

    /**
     * A global "floating children" reference counter for nested ObjectContainers
     * @ignore
     */
    var globalFloatingCounter = 0;

    /**
     * ObjectContainer represents a collection of child objects
     * @class
     * @extends me.Renderable
     * @memberOf me
     * @constructor
     * @param {Number} [x=0] position of the container
     * @param {Number} [y=0] position of the container
     * @param {Number} [w=me.game.viewport.width] width of the container
     * @param {number} [h=me.game.viewport.height] height of the container
     */
    me.ObjectContainer = me.Renderable.extend(
    /** @scope me.ObjectContainer.prototype */
    {
        /**
         * The property of the child object that should be used to sort on <br>
         * value : "x", "y", "z" (default: me.game.sortOn)
         * @public
         * @type String
         * @name sortOn
         * @memberOf me.ObjectContainer
         */
        sortOn : "z",

        /**
         * Specify if the children list should be automatically sorted when adding a new child
         * @public
         * @type Boolean
         * @name autoSort
         * @memberOf me.ObjectContainer
         */
        autoSort : true,

        /**
         * keep track of pending sort
         * @ignore
         */
        pendingSort : null,

        /**
         * The array of children of this container.
         * @ignore
         */
        children : null,

        /**
         * Container bounds
         * @ignore
         */
        bounds : null,

        /**
         * Enable collision detection for this container (default true)<br>
         * @public
         * @type Boolean
         * @name collidable
         * @memberOf me.ObjectContainer
         */
        collidable : true,

        /**
         * the container default transformation matrix
         * @public
         * @type me.Matrix2d
         * @name transform
         * @memberOf me.ObjectContainer
         */
        transform : new me.Matrix2d(),

        /**
         * constructor
         * @ignore
         */
        init : function (x, y, width, height) {
            // call the parent constructor
            this.parent(
                new me.Vector2d(x || 0, y || 0),
                width || Infinity,
                height || Infinity
            );
            // init the bounds to an empty rect
            this.bounds = new me.Rect(new me.Vector2d(0, 0), 0, 0);
            this.children = [];
            // by default reuse the global me.game.setting
            this.sortOn = me.game.sortOn;
            this.autoSort = true;
            this.transform.identity();
        },


        /**
         * Add a child to the container <br>
         * if auto-sort is disable, the object will be appended at the bottom of the list
         * @name addChild
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         * @param {number} [zIndex] forces the z index of the child to the specified value.
         */
        addChild : function (child, zIndex) {
            if (typeof(child.ancestor) !== "undefined") {
                child.ancestor.removeChildNow(child);
            } else {
                // only allocate a GUID if the object has no previous ancestor
                // (e.g. move one child from one container to another)
                if (child.isRenderable) {
                    // allocated a GUID value
                    child.GUID = me.utils.createGUID();
                }
            }

            // change the child z-index if one is specified
            if (typeof(zIndex) === "number") {
                child.z = zIndex;
            }

            // specify a z property to infinity if not defined
            if (typeof child.z === "undefined") {
                child.z = Infinity;
            }

            child.ancestor = this;

            this.children.push(child);

            if (this.autoSort === true) {
                this.sort();
            }
        },

        /**
         * Add a child to the container at the specified index<br>
         * (the list won't be sorted after insertion)
         * @name addChildAt
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         * @param {Number} index
         */
        addChildAt : function (child, index) {
            if ((index >= 0) && (index < this.children.length)) {
                if (typeof(child.ancestor) !== "undefined") {
                    child.ancestor.removeChildNow(child);
                }
                else {
                    // only allocate a GUID if the object has no previous ancestor
                    // (e.g. move one child from one container to another)
                    if (child.isRenderable) {
                        // allocated a GUID value
                        child.GUID = me.utils.createGUID();
                    }
                }

                child.ancestor = this;

                this.children.splice(index, 0, child);
            }
            else {
                throw "melonJS (me.ObjectContainer): Index (" + index + ") Out Of Bounds for addChildAt()";
            }
        },

        /**
         * Swaps the position (z depth) of 2 childs
         * @name swapChildren
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         * @param {me.Renderable} child
         */
        swapChildren : function (child, child2) {
            var index = this.getChildIndex(child);
            var index2 = this.getChildIndex(child2);

            if ((index !== -1) && (index2 !== -1)) {
                // swap z index
                var _z = child.z;
                child.z = child2.z;
                child2.z = _z;
                // swap the positions..
                this.children[index] = child2;
                this.children[index2] = child;

            }
            else {
                throw "melonJS (me.ObjectContainer): " + child + " Both the supplied childs must be a child of the caller " + this;
            }
        },

        /**
         * Returns the Child at the specified index
         * @name getChildAt
         * @memberOf me.ObjectContainer
         * @function
         * @param {Number} index
         */
        getChildAt : function (index) {
            if ((index >= 0) && (index < this.children.length)) {
                return this.children[index];
            }
            else {
                throw "melonJS (me.ObjectContainer): Index (" + index + ") Out Of Bounds for getChildAt()";
            }
        },

        /**
         * Returns the index of the Child
         * @name getChildAt
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         */
        getChildIndex : function (child) {
            return this.children.indexOf(child);
        },

        /**
         * Returns true if contains the specified Child
         * @name hasChild
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         * @return {Boolean}
         */
        hasChild : function (child) {
            return this === child.ancestor;
        },

        /**
         * return the child corresponding to the given property and value.<br>
         * note : avoid calling this function every frame since
         * it parses the whole object tree each time
         * @name getChildByProp
         * @memberOf me.ObjectContainer
         * @public
         * @function
         * @param {String} prop Property name
         * @param {String} value Value of the property
         * @return {me.Renderable[]} Array of childs
         * @example
         * // get the first child object called "mainPlayer" in a specific container :
         * ent = myContainer.getChildByProp("name", "mainPlayer");
         * // or query the whole world :
         * ent = me.game.world.getChildByProp("name", "mainPlayer");
         */
        getChildByProp : function (prop, value)  {
            var objList = [];
            // for string comparaisons
            var _regExp = new RegExp(value, "i");

            function compare(obj, prop) {
                if (typeof (obj[prop]) === "string") {
                    if (obj[prop].match(_regExp)) {
                        objList.push(obj);
                    }
                } else if (obj[prop] === value) {
                    objList.push(obj);
                }
            }

            for (var i = this.children.length, obj; i--, (obj = this.children[i]);) {
                if (obj instanceof me.ObjectContainer) {
                    compare(obj, prop);
                    objList = objList.concat(obj.getChildByProp(prop, value));
                }
                else {
                    compare(obj, prop);
                }
            }
            return objList;
        },


        /**
         * returns the list of childs with the specified name<br>
         * as defined in Tiled (Name field of the Object Properties)<br>
         * note : avoid calling this function every frame since
         * it parses the whole object list each time
         * @name getChildByName
         * @memberOf me.ObjectContainer
         * @public
         * @function
         * @param {String} name entity name
         * @return {me.Renderable[]} Array of childs
         */
        getChildByName : function (name) {
            return this.getChildByProp("name", name);
        },

        /**
         * return the child corresponding to the specified GUID<br>
         * note : avoid calling this function every frame since
         * it parses the whole object list each time
         * @name getChildByGUID
         * @memberOf me.ObjectContainer
         * @public
         * @function
         * @param {String} GUID entity GUID
         * @return {me.Renderable} corresponding child or null
         */
        getChildByGUID : function (guid) {
            var obj = this.getChildByProp("GUID", guid);
            return (obj.length > 0 ? obj[0] : null);
        },


        /**
         * returns the bounding box for this container, the smallest rectangle object completely containing all childrens
         * @name getBounds
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Rect} [rect] an optional rectangle object to use when returning the bounding rect(else returns a new object)
         * @return {me.Rect} new rectangle
         */
        getBounds : function (rect) {
            var _bounds = (typeof(rect) !== "undefined") ? rect : this.bounds;

            // reset the rect with default values
            _bounds.pos.set(Infinity, Infinity);
            _bounds.resize(-Infinity, -Infinity);

            var childBounds;
            for (var i = this.children.length, child; i--, (child = this.children[i]);) {
                if (child.isRenderable) {
                    childBounds = child.getBounds();
                    // TODO : returns an "empty" rect instead of null (e.g. EntityObject)
                    // TODO : getBounds should always return something anyway
                    if (childBounds !== null) {
                        _bounds.union(childBounds);
                    }
                }
            }
            // TODO : cache the value until any childs are modified? (next frame?)
            return _bounds;
        },

        /**
         * Invokes the removeChildNow in a defer, to ensure the child is removed safely after the update & draw stack has completed
         * @name removeChild
         * @memberOf me.ObjectContainer
         * @public
         * @function
         * @param {me.Renderable} child
         * @param {Boolean} [keepalive=False] True to prevent calling child.destroy()
         */
        removeChild : function (child, keepalive) {
            if (child.ancestor) {
                deferredRemove.defer(this, child, keepalive);
            }
        },


        /**
         * Removes (and optionally destroys) a child from the container.<br>
         * (removal is immediate and unconditional)<br>
         * Never use keepalive=true with objects from {@link me.pool}. Doing so will create a memory leak.
         * @name removeChildNow
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         * @param {Boolean} [keepalive=False] True to prevent calling child.destroy()
         */
        removeChildNow : function (child, keepalive) {
            if  (this.hasChild(child)) {
                child.ancestor = undefined;

                if (!keepalive) {
                    if (typeof (child.destroy) === "function") {
                        child.destroy();
                    }

                    me.pool.push(child);
                }

                this.children.splice(this.getChildIndex(child), 1);

            }
            else {
                throw "melonJS (me.ObjectContainer): " + child + " The supplied child must be a child of the caller " + this;
            }
        },

        /**
         * Automatically set the specified property of all childs to the given value
         * @name setChildsProperty
         * @memberOf me.ObjectContainer
         * @function
         * @param {String} property property name
         * @param {Object} value property value
         * @param {Boolean} [recursive=false] recursively apply the value to child containers if true
         */
        setChildsProperty : function (prop, val, recursive) {
            for (var i = this.children.length, obj; i--, (obj = this.children[i]);) {
                if ((recursive === true) && (obj instanceof me.ObjectContainer)) {
                    obj.setChildsProperty(prop, val, recursive);
                }
                obj[prop] = val;
            }
        },

        /**
         * Move the child in the group one step forward (z depth).
         * @name moveUp
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         */
        moveUp : function (child) {
            var childIndex = this.getChildIndex(child);
            if (childIndex - 1 >= 0) {
                // note : we use an inverted loop
                this.swapChildren(child, this.getChildAt(childIndex - 1));
            }
        },

        /**
         * Move the child in the group one step backward (z depth).
         * @name moveDown
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         */
        moveDown : function (child) {
            var childIndex = this.getChildIndex(child);
            if (childIndex + 1 < this.children.length) {
                // note : we use an inverted loop
                this.swapChildren(child, this.getChildAt(childIndex + 1));
            }
        },

        /**
         * Move the specified child to the top(z depth).
         * @name moveToTop
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         */
        moveToTop : function (child) {
            var childIndex = this.getChildIndex(child);
            if (childIndex > 0) {
                // note : we use an inverted loop
                this.children.splice(0, 0, this.children.splice(childIndex, 1)[0]);
                // increment our child z value based on the previous child depth
                child.z = this.children[1].z + 1;
            }
        },

        /**
         * Move the specified child the bottom (z depth).
         * @name moveToBottom
         * @memberOf me.ObjectContainer
         * @function
         * @param {me.Renderable} child
         */
        moveToBottom : function (child) {
            var childIndex = this.getChildIndex(child);
            if (childIndex < (this.children.length - 1)) {
                // note : we use an inverted loop
                this.children.splice((this.children.length - 1), 0, this.children.splice(childIndex, 1)[0]);
                // increment our child z value based on the next child depth
                child.z = this.children[(this.children.length - 2)].z - 1;
            }
        },

        /**
         * Checks if the specified child collides with others childs in this container
         * @name collide
         * @memberOf me.ObjectContainer
         * @public
         * @function
         * @param {me.Renderable} obj Object to be tested for collision
         * @param {Boolean} [multiple=false] check for multiple collision
         * @return {me.Vector2d} collision vector or an array of collision vector (multiple collision){@link me.Rect#collideVsAABB}
         * @example
         * // check for collision between this object and others
         * res = me.game.world.collide(this);
         *
         * // check if we collide with an enemy :
         * if (res && (res.obj.type == game.constants.ENEMY_OBJECT)) {
         *     if (res.x != 0) {
         *         // x axis
         *         if (res.x < 0) {
         *             console.log("x axis : left side !");
         *         }
         *         else {
         *             console.log("x axis : right side !");
         *         }
         *     }
         *     else {
         *         // y axis
         *         if (res.y < 0) {
         *             console.log("y axis : top side !");
         *         }
         *         else {
         *             console.log("y axis : bottom side !");
         *         }
         *     }
         * }
         */
        collide : function (objA, multiple) {
            return this.collideType(objA, null, multiple);
        },

        /**
         * Checks if the specified child collides with others childs in this container
         * @name collideType
         * @memberOf me.ObjectContainer
         * @public
         * @function
         * @param {me.Renderable} obj Object to be tested for collision
         * @param {String} [type=undefined] child type to be tested for collision
         * @param {Boolean} [multiple=false] check for multiple collision
         * @return {me.Vector2d} collision vector or an array of collision vector (multiple collision){@link me.Rect#collideVsAABB}
         */
        collideType : function (objA, type, multiple) {
            var res, mres;
            // make sure we have a boolean
            multiple = (multiple === true ? true : false);
            if (multiple === true) {
                mres = [];
            }

            // this should be replace by a list of the 4 adjacent cell around the object requesting collision
            for (var i = this.children.length, obj; i--, (obj = this.children[i]);) {
                if ((obj.inViewport || obj.alwaysUpdate) && obj.collidable) {
                    // recursivly check through
                    if (obj instanceof me.ObjectContainer) {
                        res = obj.collideType(objA, type, multiple);
                        if (multiple) {
                            mres.concat(res);
                        }
                        else if (res) {
                            // the child container returned collision information
                            return res;
                        }

                    }
                    else if ((obj !== objA) && (!type || (obj.type === type))) {
                        this._boundsA = obj.getBounds(this._boundsA).translateV(obj.pos);
                        this._boundsB = objA.getBounds(this._boundsB).translateV(objA.pos);

                        res = this._boundsA["collideWith" + this._boundsB.shapeType].call(
                            this._boundsA,
                            this._boundsB
                        );

                        if (res.x !== 0 || res.y !== 0) {
                            // notify the object
                            obj.onCollision.call(obj, res, objA);
                            // return the type (deprecated)
                            res.type = obj.type;
                            // return a reference of the colliding object
                            res.obj = obj;
                            // stop here if we don't look for multiple collision detection
                            if (!multiple) {
                                return res;
                            }
                            mres.push(res);
                        }
                    }
                }
            }
            return (multiple ? mres : null);
        },

        /**
         * Manually trigger the sort of all the childs in the container</p>
         * @name sort
         * @memberOf me.ObjectContainer
         * @public
         * @function
         * @param {Boolean} [recursive=false] recursively sort all containers if true
         */
        sort : function (recursive) {
            // do nothing if there is already a pending sort
            if (this.pendingSort === null) {
                if (recursive === true) {
                    // trigger other child container sort function (if any)
                    for (var i = this.children.length, obj; i--, (obj = this.children[i]);) {
                        if (obj instanceof me.ObjectContainer) {
                            // note : this will generate one defered sorting function
                            // for each existing containe
                            obj.sort(recursive);
                        }
                    }
                }
                /** @ignore */
                this.pendingSort = function (self) {
                    // sort everything in this container
                    self.children.sort(self["_sort" + self.sortOn.toUpperCase()]);
                    // clear the defer id
                    self.pendingSort = null;
                    // make sure we redraw everything
                    me.game.repaint();
                }.defer(this, this);
            }
        },

        /**
         * Z Sorting function
         * @ignore
         */
        _sortZ : function (a, b) {
            return (b.z) - (a.z);
        },

        /**
         * X Sorting function
         * @ignore
         */
        _sortX : function (a, b) {
            /* ? */
            var result = (b.z - a.z);
            return (result ? result : ((b.pos && b.pos.x) - (a.pos && a.pos.x)) || 0);
        },

        /**
         * Y Sorting function
         * @ignore
         */
        _sortY : function (a, b) {
            var result = (b.z - a.z);
            return (result ? result : ((b.pos && b.pos.y) - (a.pos && a.pos.y)) || 0);
        },

        /**
         * Destroy function<br>
         * @ignore
         */
        destroy : function () {
            // cancel any sort operation
            if (this.pendingSort) {
                clearTimeout(this.pendingSort);
                this.pendingSort = null;
            }

            // delete all children
            for (var i = this.children.length, obj; i--, (obj = this.children[i]);) {
                // don't remove it if a persistent object
                if (!obj.isPersistent) {
                    this.removeChildNow(obj);
                }
            }

            // reset the transformation matrix
            this.transform.identity();
        },

        /**
         * @ignore
         */
        update : function (dt) {
            var isDirty = false;
            var isFloating = false;
            var isPaused = me.state.isPaused();
            var isTranslated;
            var x;
            var y;
            var viewport = me.game.viewport;

            for (var i = this.children.length, obj; i--, (obj = this.children[i]);) {
                if (isPaused && (!obj.updateWhenPaused)) {
                    // skip this object
                    continue;
                }

                if (obj.isRenderable) {
                    isFloating = (globalFloatingCounter > 0 || obj.floating);
                    if (isFloating) {
                        globalFloatingCounter++;
                    }

                    // Translate global context
                    isTranslated = !isFloating;
                    if (isTranslated) {
                        x = obj.pos.x;
                        y = obj.pos.y;
                        globalTranslation.translateV(obj.pos);
                        globalTranslation.resize(obj.width, obj.height);
                    }

                    // check if object is visible
                    obj.inViewport = isFloating || viewport.isVisible(globalTranslation);

                    // update our object
                    isDirty |= (obj.inViewport || obj.alwaysUpdate) && obj.update(dt);

                    // Undo global context translation
                    if (isTranslated) {
                        globalTranslation.translate(-x, -y);
                    }

                    if (globalFloatingCounter > 0) {
                        globalFloatingCounter--;
                    }
                }
                else {
                    // just directly call update() for non renderable object
                    isDirty |= obj.update(dt);
                }
            }

            return isDirty;
        },

        /**
         * @ignore
         */
        draw : function (context, rect) {
            var viewport = me.game.viewport;
            var isFloating = false;

            this.drawCount = 0;

            context.save();

            // apply the container current transform
            context.transform(
                this.transform.a, this.transform.b,
                this.transform.c, this.transform.d,
                this.transform.e, this.transform.f
            );

            // apply the group opacity
            context.globalAlpha *= this.getOpacity();

            // translate to the container position
            context.translate(this.pos.x, this.pos.y);

            for (var i = this.children.length, obj; i--, (obj = this.children[i]);) {
                isFloating = obj.floating;
                if ((obj.inViewport || isFloating) && obj.isRenderable) {
                    if (isFloating === true) {
                        context.save();
                        // translate back object
                        context.translate(
                            viewport.screenX - this.pos.x,
                            viewport.screenY - this.pos.y
                        );
                    }

                    // draw the object
                    obj.draw(context, rect);

                    if (isFloating === true) {
                        context.restore();
                    }

                    this.drawCount++;
                }
            }

            context.restore();
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function () {

    /**
     * me.ObjectSettings contains the object attributes defined in Tiled<br>
     * and is created by the engine and passed as parameter to the corresponding
     * object when loading a level<br>
     * the field marked Mandatory are to be defined either in Tiled, or in the
     * before calling the parent constructor<br>
     * <img src="images/object_properties.png"/><br>
     * @class
     * @protected
     * @memberOf me
     */
    me.ObjectSettings = {
        /**
         * object entity name<br>
         * as defined in the Tiled Object Properties
         * @public
         * @type String
         * @name name
         * @memberOf me.ObjectSettings
         */
        name : null,

        /**
         * image ressource name to be loaded<br>
         * MANDATORY<br>
         * (in case of TiledObject, this field is automatically set)
         * @public
         * @type String
         * @name image
         * @memberOf me.ObjectSettings
         */
        image : null,

        /**
         * specify a transparent color for the image in rgb format (#rrggbb)<br>
         * OPTIONAL<br>
         * (using this option will imply processing time on the image)
         * @public
         * @deprecated Use PNG or GIF with transparency instead
         * @type String
         * @name transparent_color
         * @memberOf me.ObjectSettings
         */
        transparent_color : null,

        /**
         * width of a single sprite in the spritesheet<br>
         * MANDATORY<br>
         * (in case of TiledObject, this field is automatically set)
         * @public
         * @type Int
         * @name spritewidth
         * @memberOf me.ObjectSettings
         */
        spritewidth : null,

        /**
         * height of a single sprite in the spritesheet<br>
         * OPTIONAL<br>
         * if not specified the value will be set to the corresponding image height<br>
         * (in case of TiledObject, this field is automatically set)
         * @public
         * @type Int
         * @name spriteheight
         * @memberOf me.ObjectSettings
         */
        spriteheight : null,

        /**
         * custom type for collision detection<br>
         * OPTIONAL
         * @public
         * @type String
         * @name type
         * @memberOf me.ObjectSettings
         */
        type : 0,

        /**
         * Enable collision detection for this object<br>
         * OPTIONAL
         * @public
         * @type Boolean
         * @name collidable
         * @memberOf me.ObjectSettings
         */
        collidable : true
    };

    /*
     * A generic object entity
     */

    /**
     * a Generic Object Entity<br>
     * Object Properties (settings) are to be defined in Tiled, <br>
     * or when calling the parent constructor
     *
     * @class
     * @extends me.Renderable
     * @memberOf me
     * @constructor
     * @param {Number} x the x coordinates of the sprite object
     * @param {Number} y the y coordinates of the sprite object
     * @param {me.ObjectSettings} settings Object Properties as defined in Tiled<br>
     * <img src="images/object_properties.png"/>
     */
    me.ObjectEntity = me.Renderable.extend(
    /** @scope me.ObjectEntity.prototype */ {

        /**
         * define the type of the object<br>
         * default value : none<br>
         * @public
         * @type String
         * @name type
         * @memberOf me.ObjectEntity
         */
        type : 0,

        /**
         * flag to enable collision detection for this object<br>
         * default value : true<br>
         * @public
         * @type Boolean
         * @name collidable
         * @memberOf me.ObjectEntity
         */
        collidable : true,

        /**
         * The collision shapes of the entity <br>
         * (note: only shape at index 0 is used in melonJS 1.0.x)
         * @type {me.Rect[]|me.PolyShape[]|me.Ellipse[]}
         * @name shapes
         * @memberOf me.ObjectEntity
         */
        shapes : [],

        /**
         * The current shape index
         * @ignore
         * @type Number
         * @name shapeIndex
         * @memberOf me.ObjectEntity
         */
        shapeIndex : 0,

        /**
         * The entity renderable object (if defined)
         * @public
         * @type me.Renderable
         * @name renderable
         * @memberOf me.ObjectEntity
         */
        renderable : null,

        // just to keep track of when we flip
        lastflipX : false,
        lastflipY : false,

        /** @ignore */
        init : function (x, y, settings) {
            // call the parent constructor
            this.parent(
                this.pos.set(x, y),
                settings.width,
                settings.height
            );

            if (settings.image) {
                var image = (
                    typeof settings.image === "string" ?
                    me.loader.getImage(settings.image) : settings.image
                );
                this.renderable = new me.AnimationSheet(
                    0, 0, image,
                    ~~settings.spritewidth,
                    ~~settings.spriteheight,
                    ~~settings.spacing,
                    ~~settings.margin
                );

                // check for user defined transparent color
                if (settings.transparent_color) {
                    this.renderable.setTransparency(settings.transparent_color);
                }
            }

            // set the object entity name
            this.name = settings.name ? settings.name.toLowerCase() : "";

            /**
             * entity current velocity<br>
             * @public
             * @type me.Vector2d
             * @name vel
             * @memberOf me.ObjectEntity
             */
            if (typeof(this.vel) === "undefined") {
                this.vel = new me.Vector2d();
            }
            this.vel.set(0, 0);

            /**
             * entity current acceleration<br>
             * @public
             * @type me.Vector2d
             * @name accel
             * @memberOf me.ObjectEntity
             */
            if (typeof(this.accel) === "undefined") {
                this.accel = new me.Vector2d();
            }
            this.accel.set(0, 0);

            /**
             * entity current friction<br>
             * @public
             * @name friction
             * @memberOf me.ObjectEntity
             */
            if (typeof(this.friction) === "undefined") {
                this.friction = new me.Vector2d();
            }
            this.friction.set(0, 0);

            /**
             * max velocity (to limit entity velocity)<br>
             * @public
             * @type me.Vector2d
             * @name maxVel
             * @memberOf me.ObjectEntity
             */
            if (typeof(this.maxVel) === "undefined") {
                this.maxVel = new me.Vector2d();
            }
            this.maxVel.set(1000, 1000);

            // some default contants
            /**
             * Default gravity value of the entity<br>
             * default value : 0.98 (earth gravity)<br>
             * to be set to 0 for RPG, shooter, etc...<br>
             * Note: Gravity can also globally be defined through me.sys.gravity
             * @public
             * @see me.sys.gravity
             * @type Number
             * @name gravity
             * @memberOf me.ObjectEntity
             */
            this.gravity = typeof(me.sys.gravity) !== "undefined" ? me.sys.gravity : 0.98;

            /**
             * dead/living state of the entity<br>
             * default value : true
             * @public
             * @type Boolean
             * @name alive
             * @memberOf me.ObjectEntity
             */
            this.alive = true;

            /**
             * falling state of the object<br>
             * true if the object is falling<br>
             * false if the object is standing on something<br>
             * @readonly
             * @public
             * @type Boolean
             * @name falling
             * @memberOf me.ObjectEntity
             */
            this.falling = false;

            /**
             * jumping state of the object<br>
             * equal true if the entity is jumping<br>
             * @readonly
             * @public
             * @type Boolean
             * @name jumping
             * @memberOf me.ObjectEntity
             */
            this.jumping = true;

            // some usefull slope variable
            this.slopeY = 0;

            /**
             * equal true if the entity is standing on a slope<br>
             * @readonly
             * @public
             * @type Boolean
             * @name onslope
             * @memberOf me.ObjectEntity
             */
            this.onslope = false;

            /**
             * equal true if the entity is on a ladder<br>
             * @readonly
             * @public
             * @type Boolean
             * @name onladder
             * @memberOf me.ObjectEntity
             */
            this.onladder = false;
            /**
             * equal true if the entity can go down on a ladder<br>
             * @readonly
             * @public
             * @type Boolean
             * @name disableTopLadderCollision
             * @memberOf me.ObjectEntity
             */
            this.disableTopLadderCollision = false;

            // to enable collision detection
            this.collidable = (
                typeof(settings.collidable) !== "undefined" ?
                settings.collidable : true
            );

            // default objec type
            this.type = settings.type || 0;

            // default flip value
            this.lastflipX = this.lastflipY = false;

            // ref to the collision map
            this.collisionMap = me.game.collisionMap;

            /**
             * Define if an entity can go through breakable tiles<br>
             * default value : false<br>
             * @public
             * @type Boolean
             * @name canBreakTile
             * @memberOf me.ObjectEntity
             */
            this.canBreakTile = false;

            /**
             * a callback when an entity break a tile<br>
             * @public
             * @callback
             * @name onTileBreak
             * @memberOf me.ObjectEntity
             */
            this.onTileBreak = null;

            if (typeof (settings.getShape) === "function") {
                // add the given collision shape to the object
                this.addShape(settings.getShape());

                // ---- TODO : fix this bug, as it should not matter!
                if (this.getShape().shapeType === "PolyShape") {
                    this._bounds = this.getBounds();
                    this.resize(this._bounds.width, this._bounds.height);
                }
                // ----
            }
        },

        /**
         * add a collision shape to this entity
         * @name addShape
         * @memberOf me.ObjectEntity
         * @public
         * @function
         * @param {me.Rect|me.PolyShape|me.Ellipse} shape a shape object
         */
        addShape : function (shape) {
            this.shapes.push(shape);
        },

        /**
         * return the current collision shape for this entity
         * @name getShape
         * @memberOf me.ObjectEntity
         * @public
         * @function
         * @return {me.Rect|me.PolyShape|me.Ellipse} shape a shape object
         */
        getShape : function () {
            return this.shapes[this.shapeIndex];
        },

        /**
         * change the current collision shape for this entity
         * @name setShape
         * @memberOf me.ObjectEntity
         * @public
         * @function
         * @param {Number} index shape index
         */
        setShape : function (index) {
            if (typeof(this.shapes[index]) !== "undefined") {
                this.shapeIndex = index;
                return;
            }
            throw "melonJS (me.Entity): Shape (" + index + ") not defined";
        },

        /**
         * onCollision Event function<br>
         * called by the game manager when the object collide with shtg<br>
         * by default, if the object type is Collectable, the destroy function
         * is called
         * @name onCollision
         * @memberOf me.ObjectEntity
         * @function
         * @param {me.Vector2d} res collision vector
         * @param {me.ObjectEntity} obj the other object that hit this object
         * @protected
         */
        onCollision : function () {
            // destroy the object if collectable
            if (this.collidable && (this.type === me.game.COLLECTABLE_OBJECT)) {
                me.game.world.removeChild(this);
            }
        },

        /**
         * set the entity default velocity<br>
         * note : velocity is by default limited to the same value, see
         * setMaxVelocity if needed<br>
         * @name setVelocity
         * @memberOf me.ObjectEntity
         * @function
         * @param {Number} x velocity on x axis
         * @param {Number} y velocity on y axis
         * @protected
         */

        setVelocity : function (x, y) {
            this.accel.x = x !== 0 ? x : this.accel.x;
            this.accel.y = y !== 0 ? y : this.accel.y;

            // limit by default to the same max value
            this.setMaxVelocity(x, y);
        },

        /**
         * cap the entity velocity to the specified value<br>
         * @name setMaxVelocity
         * @memberOf me.ObjectEntity
         * @function
         * @param {Number} x max velocity on x axis
         * @param {Number} y max velocity on y axis
         * @protected
         */
        setMaxVelocity : function (x, y) {
            this.maxVel.x = x;
            this.maxVel.y = y;
        },

        /**
         * set the entity default friction<br>
         * @name setFriction
         * @memberOf me.ObjectEntity
         * @function
         * @param {Number} x horizontal friction
         * @param {Number} y vertical friction
         * @protected
         */
        setFriction : function (x, y) {
            this.friction.x = x || 0;
            this.friction.y = y || 0;
        },

        /**
         * Flip object on horizontal axis
         * @name flipX
         * @memberOf me.ObjectEntity
         * @function
         * @param {Boolean} flip enable/disable flip
         */
        flipX : function (flip) {
            if (flip !== this.lastflipX) {
                this.lastflipX = flip;
                if (this.renderable && this.renderable.flipX) {
                    // flip the animation
                    this.renderable.flipX(flip);
                }
                // flip the collision box
                if (this.getShape().flipX) {
                    this.getShape().flipX(this.width);
                }
            }
        },

        /**
         * Flip object on vertical axis
         * @name flipY
         * @memberOf me.ObjectEntity
         * @function
         * @param {Boolean} flip enable/disable flip
         */
        flipY : function (flip) {
            if (flip !== this.lastflipY) {
                this.lastflipY = flip;
                if (this.renderable  && this.renderable.flipY) {
                    // flip the animation
                    this.renderable.flipY(flip);
                }
                // flip the collision box
                if (this.getShape().flipY) {
                    this.getShape().flipY(this.height);
                }
            }
        },

        /**
         * return the distance to the specified entity
         * @name distanceTo
         * @memberOf me.ObjectEntity
         * @function
         * @param {me.ObjectEntity} entity Entity
         * @return {Number} distance
         */
        distanceTo: function (e)
        {
            // the me.Vector2d object also implements the same function, but
            // we have to use here the center of both entities
            var dx = (this.pos.x + this.hWidth)  - (e.pos.x + e.hWidth);
            var dy = (this.pos.y + this.hHeight) - (e.pos.y + e.hHeight);
            return Math.sqrt(dx * dx + dy * dy);
        },

        /**
         * return the distance to the specified point
         * @name distanceToPoint
         * @memberOf me.ObjectEntity
         * @function
         * @param {me.Vector2d} vector vector
         * @return {Number} distance
         */
        distanceToPoint: function (v)
        {
            // the me.Vector2d object also implements the same function, but
            // we have to use here the center of both entities
            var dx = (this.pos.x + this.hWidth)  - (v.x);
            var dy = (this.pos.y + this.hHeight) - (v.y);
            return Math.sqrt(dx * dx + dy * dy);
        },

        /**
         * return the angle to the specified entity
         * @name angleTo
         * @memberOf me.ObjectEntity
         * @function
         * @param {me.ObjectEntity} entity Entity
         * @return {Number} angle in radians
         */
        angleTo: function (e)
        {
            // the me.Vector2d object also implements the same function, but
            // we have to use here the center of both entities
            var ax = (e.pos.x + e.hWidth) - (this.pos.x + this.hWidth);
            var ay = (e.pos.y + e.hHeight) - (this.pos.y + this.hHeight);
            return Math.atan2(ay, ax);
        },


        /**
         * return the angle to the specified point
         * @name angleToPoint
         * @memberOf me.ObjectEntity
         * @function
         * @param {me.Vector2d} vector vector
         * @return {Number} angle in radians
         */
        angleToPoint: function (v)
        {
            // the me.Vector2d object also implements the same function, but
            // we have to use here the center of both entities
            var ax = (v.x) - (this.pos.x + this.hWidth);
            var ay = (v.y) - (this.pos.y + this.hHeight);
            return Math.atan2(ay, ax);
        },


        /**
         * adjust the given rect to the given slope tile
         * @ignore
         */
        checkSlope : function (rect, tile, left) {

            // first make the object stick to the tile
            rect.pos.y = tile.pos.y - rect.height;

            // normally the check should be on the object center point,
            // but since the collision check is done on corner, we must do the
            // same thing here
            if (left) {
                this.slopeY = tile.height - (
                    rect.right + this.vel.x - tile.pos.x
                );
            }
            else {
                this.slopeY = (rect.left + this.vel.x - tile.pos.x);
            }

            // cancel y vel
            this.vel.y = 0;
            // set player position (+ workaround when entering/exiting slopes tile)
            rect.pos.y += this.slopeY.clamp(0, tile.height);

        },

        /**
         * compute the new velocity value
         * @ignore
         */
        computeVelocity : function (vel) {

            // apply gravity (if any)
            if (this.gravity) {
                // apply a constant gravity (if not on a ladder)
                vel.y += !this.onladder ? (this.gravity * me.timer.tick) : 0;

                // check if falling / jumping
                this.falling = (vel.y > 0);
                this.jumping = (this.falling ? false : this.jumping);
            }

            // apply friction
            if (this.friction.x) {
                vel.x = me.utils.applyFriction(vel.x, this.friction.x);
            }
            if (this.friction.y) {
                vel.y = me.utils.applyFriction(vel.y, this.friction.y);
            }

            // cap velocity
            if (vel.y !== 0) {
                vel.y = vel.y.clamp(-this.maxVel.y, this.maxVel.y);
            }
            if (vel.x !== 0) {
                vel.x = vel.x.clamp(-this.maxVel.x, this.maxVel.x);
            }
        },

        /**
         * handle the player movement, "trying" to update his position<br>
         * @name updateMovement
         * @memberOf me.ObjectEntity
         * @function
         * @return {me.Vector2d} a collision vector
         * @example
         * // make the player move
         * if (me.input.isKeyPressed('left'))
         * {
         *     this.vel.x -= this.accel.x * me.timer.tick;
         * }
         * else if (me.input.isKeyPressed('right'))
         * {
         *     this.vel.x += this.accel.x * me.timer.tick;
         * }
         * // update player position
         * var res = this.updateMovement();
         *
         * // check for collision result with the environment
         * if (res.x != 0)
         * {
         *   // x axis
         *   if (res.x<0)
         *      console.log("x axis : left side !");
         *   else
         *      console.log("x axis : right side !");
         * }
         * else if (res.y != 0)
         * {
         *    // y axis
         *    if (res.y<0)
         *       console.log("y axis : top side !");
         *    else
         *       console.log("y axis : bottom side !");
         *
         *    // display the tile type
         *    console.log(res.yprop.type)
         * }
         *
         * // check player status after collision check
         * var updated = (this.vel.x!=0 || this.vel.y!=0);
         */
        updateMovement : function () {

            this.computeVelocity(this.vel);

            // Adjust position only on collidable object
            var collision;
            if (this.collidable) {
                // temporary stuff until ticket #103 is done
                // (this function will disappear anyway)
                // save the collision box offset
                this._bounds = this.getBounds(this._bounds);
                this.__offsetX = this._bounds.pos.x;
                this.__offsetY = this._bounds.pos.y;
                this._bounds.translateV(this.pos);

                // check for collision
                collision = this.collisionMap.checkCollision(this._bounds, this.vel);

                // update some flags
                this.onslope  = collision.yprop.isSlope || collision.xprop.isSlope;
                // clear the ladder flag
                this.onladder = false;

                var prop = collision.yprop;
                var tile = collision.ytile;

                // y collision
                if (collision.y) {
                    // going down, collision with the floor
                    this.onladder = prop.isLadder || prop.isTopLadder;

                    if (collision.y > 0) {
                        if (prop.isSolid ||
                            (prop.isPlatform && (this._bounds.bottom - 1 <= tile.pos.y)) ||
                            (prop.isTopLadder && !this.disableTopLadderCollision)) {

                            // adjust position to the corresponding tile
                            this._bounds.pos.y = ~~this._bounds.pos.y;
                            this.vel.y = (
                                this.falling ?
                                tile.pos.y - this._bounds.bottom : 0
                            );
                            this.falling = false;
                        }
                        else if (prop.isSlope && !this.jumping) {
                            // we stop falling
                            this.checkSlope(
                                this._bounds,
                                tile,
                                prop.isLeftSlope
                            );
                            this.falling = false;
                        }
                        else if (prop.isBreakable) {
                            if  (this.canBreakTile) {
                                // remove the tile
                                me.game.currentLevel.clearTile(
                                    tile.col,
                                    tile.row
                                );
                                if (this.onTileBreak) {
                                    this.onTileBreak();
                                }
                            }
                            else {
                                // adjust position to the corresponding tile
                                this.collision.pos.y = ~~this.collision.pos.y;
                                this.vel.y = (
                                    this.falling ?
                                    tile.pos.y - this._bounds.bottom : 0
                                );
                                this.falling = false;
                            }
                        }
                    }
                    // going up, collision with ceiling
                    else if (collision.y < 0) {
                        if (!prop.isPlatform && !prop.isLadder && !prop.isTopLadder) {
                            this.falling = true;
                            // cancel the y velocity
                            this.vel.y = 0;
                        }
                    }
                }

                prop = collision.xprop;
                tile = collision.xtile;

                // x collision
                if (collision.x) {
                    this.onladder = prop.isLadder || prop.isTopLadder;

                    if (prop.isSlope && !this.jumping) {
                        this.checkSlope(this._bounds, tile, prop.isLeftSlope);
                        this.falling = false;
                    }
                    else {
                        // can walk through the platform & ladder
                        if (!prop.isPlatform && !prop.isLadder && !prop.isTopLadder) {
                            if (prop.isBreakable && this.canBreakTile) {
                                // remove the tile
                                me.game.currentLevel.clearTile(tile.col, tile.row);
                                if (this.onTileBreak) {
                                    this.onTileBreak();
                                }
                            } else {
                                this.vel.x = 0;
                            }
                        }
                    }
                }

                // temporary stuff until ticket #103 is done (this function will disappear anyway)
                this.pos.set(
                    this._bounds.pos.x - this.__offsetX,
                    this._bounds.pos.y - this.__offsetY
                );
            }

            // update player position
            this.pos.add(this.vel);

            // returns the collision "vector"
            return collision;

        },

        /** @ignore */
        update : function (dt) {
            if (this.renderable) {
                return this.renderable.update(dt);
            }
            return false;
        },

        /**
         * returns the bounding box for this entity, the smallest rectangle
         * object completely containing the entity current shape.
         * @name getBounds
         * @memberOf me.ObjectEntity
         * @function
         * @param {me.Rect} [rect] an optional rectangle object to use when
         * returning the bounding rect(else returns a new object)
         * @return {me.Rect} new rectangle
         */
        getBounds : function (rect) {
            if (this.shapes.length) {
                return this.getShape().getBounds(rect);
            } else {
                // call the parent me.Rect.getBounds()
                // translate back for the position to be relative to the entity
                return this.parent(rect).translate(-this.pos.x, -this.pos.y);
            }
        },

        /**
         * object draw<br>
         * not to be called by the end user<br>
         * called by the game manager on each game loop
         * @name draw
         * @memberOf me.ObjectEntity
         * @function
         * @protected
         * @param {Context2d} context 2d Context on which draw our object
         **/
        draw : function (context) {
            // draw the sprite if defined
            if (this.renderable) {
                // translate the renderable position (relative to the entity)
                // and keeps it in the entity defined bounds
                var bounds = this;
                if (this.shapes.length && this.getShape().shapeType === "PolyShape") {
                    // use the corresponding bounding box
                    bounds = this.getBounds(this._bounds).translateV(this.pos);
                }
                var x = ~~(bounds.pos.x + (
                    this.anchorPoint.x * (bounds.width - this.renderable.width)
                ));
                var y = ~~(bounds.pos.y + (
                    this.anchorPoint.y * (bounds.height - this.renderable.height)
                ));
                context.translate(x, y);
                this.renderable.draw(context);
                context.translate(-x, -y);
            }
        },

        /**
         * Destroy function<br>
         * @ignore
         */
        destroy : function () {
            // free some property objects
            if (this.renderable) {
                this.renderable.destroy.apply(this.renderable, arguments);
                this.renderable = null;
            }
            this.onDestroyEvent.apply(this, arguments);
            this.shapes = [];
            this.shapeIndex = 0;
        },

        /**
         * OnDestroy Notification function<br>
         * Called by engine before deleting the object
         * @name onDestroyEvent
         * @memberOf me.ObjectEntity
         * @function
         */
        onDestroyEvent : function () {
            // to be extended !
        }


    });

    /*
     * A Collectable entity
     */

    /**
     * @class
     * @extends me.ObjectEntity
     * @memberOf me
     * @constructor
     * @param {Number} x the x coordinates of the sprite object
     * @param {Number} y the y coordinates of the sprite object
     * @param {me.ObjectSettings} settings object settings
     */
    me.CollectableEntity = me.ObjectEntity.extend(
    /** @scope me.CollectableEntity.prototype */
    {
        /** @ignore */
        init : function (x, y, settings) {
            // call the parent constructor
            this.parent(x, y, settings);

            this.type = me.game.COLLECTABLE_OBJECT;

        }
    });

    /*
     * A level entity
     */

    /**
     * @class
     * @extends me.ObjectEntity
     * @memberOf me
     * @constructor
     * @param {Number} x the x coordinates of the object
     * @param {Number} y the y coordinates of the object
     * @param {me.ObjectSettings} settings object settings
     */
    me.LevelEntity = me.ObjectEntity.extend(
    /** @scope me.LevelEntity.prototype */
    {
        /** @ignore */
        init : function (x, y, settings) {
            this.parent(x, y, settings);

            this.nextlevel = settings.to;

            this.fade = settings.fade;
            this.duration = settings.duration;
            this.fading = false;

            // a temp variable
            this.gotolevel = settings.to;
        },

        /**
         * @ignore
         */
        onFadeComplete : function () {
            me.levelDirector.loadLevel(this.gotolevel);
            me.game.viewport.fadeOut(this.fade, this.duration);
        },

        /**
         * go to the specified level
         * @name goTo
         * @memberOf me.LevelEntity
         * @function
         * @param {String} [level=this.nextlevel] name of the level to load
         * @protected
         */
        goTo : function (level) {
            this.gotolevel = level || this.nextlevel;
            // load a level
            //console.log("going to : ", to);
            if (this.fade && this.duration) {
                if (!this.fading) {
                    this.fading = true;
                    me.game.viewport.fadeIn(this.fade, this.duration,
                            this.onFadeComplete.bind(this));
                }
            } else {
                me.levelDirector.loadLevel(this.gotolevel);
            }
        },

        /** @ignore */
        onCollision : function () {
            this.goTo();
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Screens objects & State machine
 *
 */

(function () {
    /**
     * A class skeleton for "Screen" Object <br>
     * every "screen" object (title screen, credits, ingame, etc...) to be managed <br>
     * through the state manager must inherit from this base class.
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @see me.state
     */
    me.ScreenObject = Object.extend(
    /** @scope me.ScreenObject.prototype */
    {
        /** @ignore */
        init: function () {},

        /**
         * Object reset function
         * @ignore
         */
        reset : function () {
            // reset the game manager
            me.game.reset();
            // call the onReset Function
            this.onResetEvent.apply(this, arguments);
        },

        /**
         * destroy function
         * @ignore
         */
        destroy : function () {
            // notify the object
            this.onDestroyEvent.apply(this, arguments);
        },

        /**
         * onResetEvent function<br>
         * called by the state manager when reseting the object<br>
         * this is typically where you will load a level, etc...
         * to be extended
         * @name onResetEvent
         * @memberOf me.ScreenObject
         * @function
         * @param {} [arguments...] optional arguments passed when switching state
         * @see me.state#change
         */
        onResetEvent : function () {
            // to be extended
        },

        /**
         * onDestroyEvent function<br>
         * called by the state manager before switching to another state<br>
         * @name onDestroyEvent
         * @memberOf me.ScreenObject
         * @function
         */
        onDestroyEvent : function () {
            // to be extended
        }
    });

    // based on the requestAnimationFrame polyfill by Erik Möller
    (function () {
        var lastTime = 0;
        // get unprefixed rAF and cAF, if present
        var requestAnimationFrame = me.agent.prefixed("requestAnimationFrame");
        var cancelAnimationFrame = me.agent.prefixed("cancelAnimationFrame") ||
                                   me.agent.prefixed("cancelRequestAnimationFrame");

        if (!requestAnimationFrame || !cancelAnimationFrame) {
            requestAnimationFrame = function (callback) {
                var currTime = window.performance.now();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

            cancelAnimationFrame = function (id) {
                window.clearTimeout(id);
            };
        }

         // put back in global namespace
        window.requestAnimationFrame = requestAnimationFrame;
        window.cancelAnimationFrame = cancelAnimationFrame;
    }());


    /**
     * a State Manager (state machine)<p>
     * There is no constructor function for me.state.
     * @namespace me.state
     * @memberOf me
     */

    me.state = (function () {
        // hold public stuff in our singleton
        var obj = {};

        /*-------------------------------------------
            PRIVATE STUFF
         --------------------------------------------*/

        // current state
        var _state = -1;

        // requestAnimeFrame Id
        var _animFrameId = -1;

        // whether the game state is "paused"
        var _isPaused = false;

        // list of screenObject
        var _screenObject = {};

        // fading transition parameters between screen
        var _fade = {
            color : "",
            duration : 0
        };

        // callback when state switch is done
        /** @ignore */
        var _onSwitchComplete = null;

        // just to keep track of possible extra arguments
        var _extraArgs = null;

        // store the elapsed time during pause/stop period
        var _pauseTime = 0;

        /**
         * @ignore
         */
        function _startRunLoop() {
            // ensure nothing is running first and in valid state
            if ((_animFrameId === -1) && (_state !== -1)) {
                // reset the timer
                me.timer.reset();

                // start the main loop
                _animFrameId = window.requestAnimationFrame(_renderFrame);
            }
        }

        /**
         * Resume the game loop after a pause.
         * @ignore
         */
        function _resumeRunLoop() {
            // ensure game is actually paused and in valid state
            if (_isPaused && (_state !== -1)) {
                // reset the timer
                me.timer.reset();

                _isPaused = false;
            }
        }

        /**
         * Pause the loop for most screen objects.
         * @ignore
         */
        function _pauseRunLoop() {
            // Set the paused boolean to stop updates on (most) entities
            _isPaused = true;
        }

        /**
         * this is only called when using requestAnimFrame stuff
         * @param {Number} time current timestamp in milliseconds
         * @ignore
         */
        function _renderFrame(time) {
            // update all game objects
            me.game.update(time);
            // render all game objects
            me.game.draw();
            // schedule the next frame update
            if (_animFrameId !== -1) {
                _animFrameId = window.requestAnimationFrame(_renderFrame);
            }
        }

        /**
         * stop the SO main loop
         * @ignore
         */
        function _stopRunLoop() {
            // cancel any previous animationRequestFrame
            window.cancelAnimationFrame(_animFrameId);
            _animFrameId = -1;
        }

        /**
         * start the SO main loop
         * @ignore
         */
        function _switchState(state) {
            // clear previous interval if any
            _stopRunLoop();

            // call the screen object destroy method
            if (_screenObject[_state]) {
                // just notify the object
                _screenObject[_state].screen.destroy();
            }

            if (_screenObject[state]) {
                // set the global variable
                _state = state;

                // call the reset function with _extraArgs as arguments
                _screenObject[_state].screen.reset.apply(_screenObject[_state].screen, _extraArgs);

                // and start the main loop of the
                // new requested state
                _startRunLoop();

                // execute callback if defined
                if (_onSwitchComplete) {
                    _onSwitchComplete();
                }

                // force repaint
                me.game.repaint();
            }
        }

        /*
         * PUBLIC STUFF
         */

        /**
         * default state ID for Loading Screen
         * @constant
         * @name LOADING
         * @memberOf me.state
         */
        obj.LOADING = 0;

        /**
         * default state ID for Menu Screen
         * @constant
         * @name MENU
         * @memberOf me.state
         */

        obj.MENU = 1;
        /**
         * default state ID for "Ready" Screen
         * @constant
         * @name READY
         * @memberOf me.state
         */

        obj.READY = 2;
        /**
         * default state ID for Play Screen
         * @constant
         * @name PLAY
         * @memberOf me.state
         */

        obj.PLAY = 3;
        /**
         * default state ID for Game Over Screen
         * @constant
         * @name GAMEOVER
         * @memberOf me.state
         */

        obj.GAMEOVER = 4;
        /**
         * default state ID for Game End Screen
         * @constant
         * @name GAME_END
         * @memberOf me.state
         */

        obj.GAME_END = 5;
        /**
         * default state ID for High Score Screen
         * @constant
         * @name SCORE
         * @memberOf me.state
         */

        obj.SCORE = 6;
        /**
         * default state ID for Credits Screen
         * @constant
         * @name CREDITS
         * @memberOf me.state
         */

        obj.CREDITS = 7;
        /**
         * default state ID for Settings Screen
         * @constant
         * @name SETTINGS
         * @memberOf me.state
         */
        obj.SETTINGS = 8;

        /**
         * default state ID for user defined constants<br>
         * @constant
         * @name USER
         * @memberOf me.state
         * @example
         * var STATE_INFO = me.state.USER + 0;
         * var STATE_WARN = me.state.USER + 1;
         * var STATE_ERROR = me.state.USER + 2;
         * var STATE_CUTSCENE = me.state.USER + 3;
         */
        obj.USER = 100;

        /**
         * onPause callback
         * @callback
         * @name onPause
         * @memberOf me.state
         */
        obj.onPause = null;

        /**
         * onResume callback
         * @callback
         * @name onResume
         * @memberOf me.state
         */
        obj.onResume = null;

        /**
         * onStop callback
         * @callback
         * @name onStop
         * @memberOf me.state
         */
        obj.onStop = null;

        /**
         * onRestart callback
         * @callback
         * @name onRestart
         * @memberOf me.state
         */
        obj.onRestart = null;

        /**
         * @ignore
         */
        obj.init = function () {
            // set the embedded loading screen
            obj.set(obj.LOADING, new me.DefaultLoadingScreen());
        };

        /**
         * Stop the current screen object.
         * @name stop
         * @memberOf me.state
         * @public
         * @function
         * @param {Boolean} pauseTrack pause current track on screen stop.
         */
        obj.stop = function (music) {
            // only stop when we are not loading stuff
            if ((_state !== obj.LOADING) && obj.isRunning()) {
                // stop the main loop
                _stopRunLoop();
                // current music stop
                if (music === true) {
                    me.audio.pauseTrack();
                }

                // store time when stopped
                _pauseTime = window.performance.now();

                // publish the stop notification
                me.event.publish(me.event.STATE_STOP);
                // any callback defined ?
                if (typeof(obj.onStop) === "function") {
                    obj.onStop();
                }
            }
        };

        /**
         * pause the current screen object
         * @name pause
         * @memberOf me.state
         * @public
         * @function
         * @param {Boolean} pauseTrack pause current track on screen pause
         */
        obj.pause = function (music) {
            // only pause when we are not loading stuff
            if ((_state !== obj.LOADING) && !obj.isPaused()) {
                // stop the main loop
                _pauseRunLoop();
                // current music stop
                if (music === true) {
                    me.audio.pauseTrack();
                }

                // store time when paused
                _pauseTime = window.performance.now();

                // publish the pause event
                me.event.publish(me.event.STATE_PAUSE);
                // any callback defined ?
                if (typeof(obj.onPause) === "function") {
                    obj.onPause();
                }
            }
        };

        /**
         * Restart the screen object from a full stop.
         * @name restart
         * @memberOf me.state
         * @public
         * @function
         * @param {Boolean} resumeTrack resume current track on screen resume
         */
        obj.restart = function (music) {
            if (!obj.isRunning()) {
                // restart the main loop
                _startRunLoop();
                // current music stop
                if (music === true) {
                    me.audio.resumeTrack();
                }

                // calculate the elpased time
                _pauseTime = window.performance.now() - _pauseTime;

                // force repaint
                me.game.repaint();

                // publish the restart notification
                me.event.publish(me.event.STATE_RESTART, [ _pauseTime ]);
                // any callback defined ?
                if (typeof(obj.onRestart) === "function") {
                    obj.onRestart();
                }
            }
        };

        /**
         * resume the screen object
         * @name resume
         * @memberOf me.state
         * @public
         * @function
         * @param {Boolean} resumeTrack resume current track on screen resume
         */
        obj.resume = function (music) {
            if (obj.isPaused()) {
                // resume the main loop
                _resumeRunLoop();
                // current music stop
                if (music === true) {
                    me.audio.resumeTrack();
                }

                // calculate the elpased time
                _pauseTime = window.performance.now() - _pauseTime;

                // publish the resume event
                me.event.publish(me.event.STATE_RESUME, [ _pauseTime ]);
                // any callback defined ?
                if (typeof(obj.onResume) === "function") {
                    obj.onResume();
                }
            }
        };

        /**
         * return the running state of the state manager
         * @name isRunning
         * @memberOf me.state
         * @public
         * @function
         * @return {Boolean} true if a "process is running"
         */
        obj.isRunning = function () {
            return _animFrameId !== -1;
        };

        /**
         * Return the pause state of the state manager
         * @name isPaused
         * @memberOf me.state
         * @public
         * @function
         * @return {Boolean} true if the game is paused
         */
        obj.isPaused = function () {
            return _isPaused;
        };

        /**
         * associate the specified state with a screen object
         * @name set
         * @memberOf me.state
         * @public
         * @function
         * @param {Number} state State ID (see constants)
         * @param {me.ScreenObject} so Instantiated ScreenObject to associate
         * with state ID
         * @example
         * var MenuButton = me.GUI_Object.extend({
         *     "onClick" : function () {
         *         // Change to the PLAY state when the button is clicked
         *         me.state.change(me.state.PLAY);
         *         return true;
         *     }
         * });
         *
         * var MenuScreen = me.ScreenObject.extend({
         *     onResetEvent: function() {
         *         // Load background image
         *         me.game.world.addChild(
         *             new me.ImageLayer("bg", 0, 0, "bg"),
         *             0 // z-index
         *         );
         *
         *         // Add a button
         *         me.game.world.addChild(
         *             new MenuButton(350, 200, { "image" : "start" }),
         *             1 // z-index
         *         );
         *
         *         // Play music
         *         me.audio.playTrack("menu");
         *     },
         *
         *     "onDestroyEvent" : function () {
         *         // Stop music
         *         me.audio.stopTrack();
         *     }
         * });
         *
         * me.state.set(me.state.MENU, new MenuScreen());
         */
        obj.set = function (state, so) {
            _screenObject[state] = {};
            _screenObject[state].screen = so;
            _screenObject[state].transition = true;
        };

        /**
         * return a reference to the current screen object<br>
         * useful to call a object specific method
         * @name current
         * @memberOf me.state
         * @public
         * @function
         * @return {me.ScreenObject}
         */
        obj.current = function () {
            return _screenObject[_state].screen;
        };

        /**
         * specify a global transition effect
         * @name transition
         * @memberOf me.state
         * @public
         * @function
         * @param {String} effect (only "fade" is supported for now)
         * @param {String} color a CSS color value
         * @param {Number} [duration=1000] expressed in milliseconds
         */
        obj.transition = function (effect, color, duration) {
            if (effect === "fade") {
                _fade.color = color;
                _fade.duration = duration;
            }
        };

        /**
         * enable/disable transition for a specific state (by default enabled for all)
         * @name setTransition
         * @memberOf me.state
         * @public
         * @function
         * @param {Number} state State ID (see constants)
         * @param {Boolean} enable
         */
        obj.setTransition = function (state, enable) {
            _screenObject[state].transition = enable;
        };

        /**
         * change the game/app state
         * @name change
         * @memberOf me.state
         * @public
         * @function
         * @param {Number} state State ID (see constants)
         * @param {} [arguments...] extra arguments to be passed to the reset functions
         * @example
         * // The onResetEvent method on the play screen will receive two args:
         * // "level_1" and the number 3
         * me.state.change(me.state.PLAY, "level_1", 3);
         */
        obj.change = function (state) {
            // Protect against undefined ScreenObject
            if (typeof(_screenObject[state]) === "undefined") {
                throw "melonJS : Undefined ScreenObject for state '" + state + "'";
            }

            _extraArgs = null;
            if (arguments.length > 1) {
                // store extra arguments if any
                _extraArgs = Array.prototype.slice.call(arguments, 1);
            }
            // if fading effect
            if (_fade.duration && _screenObject[state].transition) {
                /** @ignore */
                _onSwitchComplete = function () {
                    me.game.viewport.fadeOut(_fade.color, _fade.duration);
                };
                me.game.viewport.fadeIn(
                    _fade.color,
                    _fade.duration,
                    function () {
                        _switchState.defer(this, state);
                    }
                );

            }
            // else just switch without any effects
            else {
                // wait for the last frame to be
                // "finished" before switching
                _switchState.defer(this, state);
            }
        };

        /**
         * return true if the specified state is the current one
         * @name isCurrent
         * @memberOf me.state
         * @public
         * @function
         * @param {Number} state State ID (see constants)
         */
        obj.isCurrent = function (state) {
            return _state === state;
        };

        // return our object
        return obj;
    })();
})();

/*
 * MelonJS Game Engine
 * @copyright (C) 2011 - 2014 Olivier Biot, Jason Oster, Aaron McLeod
 * http://www.melonjs.org
 */
(function () {
    // a basic progress bar object
    var ProgressBar = me.Renderable.extend({
        // flag to know if we need to refresh the display
        invalidate : false,

        // default progress bar height
        barHeight : 4,

        // current progress
        progress : 0,

        // make sure the screen is refreshed every frame
        onProgressUpdate : function (progress) {
            this.progress = Math.floor(progress * this.width);
            this.invalidate = true;
        },

        // make sure the screen is refreshed every frame
        update : function () {
            if (this.invalidate === true) {
                // clear the flag
                this.invalidate = false;
                // and return true
                return true;
            }
            // else return false
            return false;
        },

         // draw function
        draw : function (context) {
            // draw the progress bar
            context.fillStyle = "black";
            context.fillRect(0, (this.height / 2) - (this.barHeight / 2), this.width, this.barHeight);
            context.fillStyle = "#55aa00";
            context.fillRect(2, (this.height / 2) - (this.barHeight / 2), this.progress, this.barHeight);
        }
    });

    // the melonJS Logo
    var IconLogo = me.Renderable.extend({
        // constructor
        init : function (x, y) {
            this.parent(new me.Vector2d(x, y), 100, 85);
        },

        // 100x85 Logo
        // generated using Illustrator and the Ai2Canvas plugin
        draw : function (context) {
            context.save();

            // translate to destination point
            context.translate(this.pos.x, this.pos.y);

            context.beginPath();
            context.moveTo(0.7, 48.9);
            context.bezierCurveTo(10.8, 68.9, 38.4, 75.8, 62.2, 64.5);
            context.bezierCurveTo(86.1, 53.1, 97.2, 27.7, 87.0, 7.7);
            context.lineTo(87.0, 7.7);
            context.bezierCurveTo(89.9, 15.4, 73.9, 30.2, 50.5, 41.4);
            context.bezierCurveTo(27.1, 52.5, 5.2, 55.8, 0.7, 48.9);
            context.lineTo(0.7, 48.9);
            context.lineTo(0.7, 48.9);
            context.closePath();
            context.fillStyle = "rgb(255, 255, 255)";
            context.fill();

            context.beginPath();
            context.moveTo(84.0, 7.0);
            context.bezierCurveTo(87.6, 14.7, 72.5, 30.2, 50.2, 41.6);
            context.bezierCurveTo(27.9, 53.0, 6.9, 55.9, 3.2, 48.2);
            context.bezierCurveTo(-0.5, 40.4, 14.6, 24.9, 36.9, 13.5);
            context.bezierCurveTo(59.2, 2.2, 80.3, -0.8, 84.0, 7.0);
            context.lineTo(84.0, 7.0);
            context.closePath();
            context.lineWidth = 5.3;
            context.strokeStyle = "rgb(255, 255, 255)";
            context.lineJoin = "miter";
            context.miterLimit = 4.0;
            context.stroke();

            context.restore();
        }
    });

    // the melonJS Text Logo
    var TextLogo = me.Renderable.extend({
        // constructor
        init : function (w, h) {
            this.parent(new me.Vector2d(), w, h);
            this.logo1 = new me.Font("century gothic", 32, "white", "middle");
            this.logo2 = new me.Font("century gothic", 32, "#55aa00", "middle");
            this.logo2.bold();
            this.logo1.textBaseline = this.logo2.textBaseline = "alphabetic";
        },

        draw : function (context) {
            // measure the logo size
            var logo1_width = this.logo1.measureText(context, "melon").width;
            var xpos = (this.width - logo1_width - this.logo2.measureText(context, "JS").width) / 2;
            var ypos = (this.height / 2) + (this.logo2.measureText(context, "melon").height);

            // draw the melonJS string
            this.logo1.draw(context, "melon", xpos, ypos);
            xpos += logo1_width;
            this.logo2.draw(context, "JS", xpos, ypos);
        }

    });

    /**
     * a default loading screen
     * @memberOf me
     * @ignore
     * @constructor
     */
    me.DefaultLoadingScreen = me.ScreenObject.extend({
        // call when the loader is resetted
        onResetEvent : function () {
            me.game.reset();

            // background color
            me.game.world.addChild(new me.ColorLayer("background", "#202020", 0));

            // progress bar
            var progressBar = new ProgressBar(
                new me.Vector2d(),
                me.video.getWidth(),
                me.video.getHeight()
            );
            this.handle = me.event.subscribe(
                me.event.LOADER_PROGRESS,
                progressBar.onProgressUpdate.bind(progressBar)
            );
            me.game.world.addChild(progressBar, 1);

            // melonJS text & logo
            var icon = new IconLogo(
                (me.video.getWidth() - 100) / 2,
                (me.video.getHeight() / 2) - (progressBar.barHeight / 2) - 90
            );
            me.game.world.addChild(icon, 1);
            me.game.world.addChild(new TextLogo(me.video.getWidth(), me.video.getHeight()), 1);
        },

        // destroy object at end of loading
        onDestroyEvent : function () {
            // cancel the callback
            if (this.handle)  {
                me.event.unsubscribe(this.handle);
                this.handle = null;
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a small class to manage loading of stuff and manage resources
     * There is no constructor function for me.input.
     * @namespace me.loader
     * @memberOf me
     */
    me.loader = (function () {
        // hold public stuff in our singleton
        var obj = {};

        // contains all the images loaded
        var imgList = {};
        // contains all the TMX loaded
        var tmxList = {};
        // contains all the binary files loaded
        var binList = {};
        // contains all the JSON files
        var jsonList = {};
        // flag to check loading status
        var resourceCount = 0;
        var loadCount = 0;
        var timerId = 0;

        /**
         * check the loading status
         * @ignore
         */
        function checkLoadStatus() {
            if (loadCount === resourceCount) {
                // wait 1/2s and execute callback (cheap workaround to ensure everything is loaded)
                if (obj.onload) {
                    // make sure we clear the timer
                    clearTimeout(timerId);
                    // trigger the onload callback
                    setTimeout(function () {
                        obj.onload();
                        me.event.publish(me.event.LOADER_COMPLETE);
                    }, 300);
                }
                else {
                    console.error("no load callback defined");
                }
            }
            else {
                timerId = setTimeout(checkLoadStatus, 100);
            }
        }

        /**
         * load Images
         * @example
         * preloadImages([
         *     { name : 'image1', src : 'images/image1.png'},
         *     { name : 'image2', src : 'images/image2.png'},
         *     { name : 'image3', src : 'images/image3.png'},
         *     { name : 'image4', src : 'images/image4.png'}
         * ]);
         * @ignore
         */
        function preloadImage(img, onload, onerror) {
            // create new Image object and add to list
            imgList[img.name] = new Image();
            imgList[img.name].onload = onload;
            imgList[img.name].onerror = onerror;
            imgList[img.name].src = img.src + obj.nocache;
        }

        /**
         * preload TMX files
         * @ignore
         */
        function preloadTMX(tmxData, onload, onerror) {
            function addToTMXList(data, format) {
                // set the TMX content
                tmxList[tmxData.name] = {
                    data: data,
                    isTMX: (tmxData.type === "tmx"),
                    format : format
                };
            }

            // add the tmx to the levelDirector
            if (tmxData.type === "tmx") {
                me.levelDirector.addTMXLevel(tmxData.name);
            }

            //if the data is in the tmxData object, don't get it via a XMLHTTPRequest
            if (tmxData.data) {
                addToTMXList(tmxData.data, tmxData.format);
                onload();
                return;
            }

            var xmlhttp = new XMLHttpRequest();
            // check the data format ('tmx', 'json')
            var format = me.utils.getFileExtension(tmxData.src).toLowerCase();

            if (xmlhttp.overrideMimeType) {
                if (format === "json") {
                    xmlhttp.overrideMimeType("application/json");
                }
                else {
                    xmlhttp.overrideMimeType("text/xml");
                }
            }

            xmlhttp.open("GET", tmxData.src + obj.nocache, true);


            // set the callbacks
            xmlhttp.ontimeout = onerror;
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    // status = 0 when file protocol is used, or cross-domain origin,
                    // (With Chrome use "--allow-file-access-from-files --disable-web-security")
                    if ((xmlhttp.status === 200) || ((xmlhttp.status === 0) && xmlhttp.responseText)) {
                        var result = null;

                        // parse response
                        switch (format) {
                            case "xml":
                            case "tmx":
                                // ie9 does not fully implement the responseXML
                                if (me.device.ua.match(/msie/i) || !xmlhttp.responseXML) {
                                    // manually create the XML DOM
                                    result = (new DOMParser()).parseFromString(xmlhttp.responseText, "text/xml");
                                }
                                else {
                                    result = xmlhttp.responseXML;
                                }
                                // converts to a JS object
                                // (returns with map as a the root object, to match native json format)
                                result = me.TMXUtils.parse(result).map;
                                // force format to json
                                format = "json";
                                break;

                            case "json":
                                result = JSON.parse(xmlhttp.responseText);
                                break;

                            default:
                                throw "melonJS: TMX file format " + format + "not supported !";
                        }

                        //set the TMX content
                        addToTMXList(result, format);

                        // fire the callback
                        onload();
                    }
                    else {
                        onerror();
                    }
                }
            };
            // send the request
            xmlhttp.send(null);
        }

        /**
         * preload TMX files
         * @ignore
         */
        function preloadJSON(data, onload, onerror) {
            var xmlhttp = new XMLHttpRequest();

            if (xmlhttp.overrideMimeType) {
                xmlhttp.overrideMimeType("application/json");
            }

            xmlhttp.open("GET", data.src + obj.nocache, true);

            // set the callbacks
            xmlhttp.ontimeout = onerror;
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    // status = 0 when file protocol is used, or cross-domain origin,
                    // (With Chrome use "--allow-file-access-from-files --disable-web-security")
                    if ((xmlhttp.status === 200) || ((xmlhttp.status === 0) && xmlhttp.responseText)) {
                        // get the Texture Packer Atlas content
                        jsonList[data.name] = JSON.parse(xmlhttp.responseText);
                        // fire the callback
                        onload();
                    }
                    else {
                        onerror();
                    }
                }
            };
            // send the request
            xmlhttp.send(null);
        }

        /**
         * preload Binary files
         * @ignore
         */
        function preloadBinary(data, onload, onerror) {
            var httpReq = new XMLHttpRequest();

            // load our file
            httpReq.open("GET", data.src + obj.nocache, true);
            httpReq.responseType = "arraybuffer";
            httpReq.onerror = onerror;
            httpReq.onload = function () {
                var arrayBuffer = httpReq.response;
                if (arrayBuffer) {
                    var byteArray = new Uint8Array(arrayBuffer);
                    var buffer = [];
                    for (var i = 0; i < byteArray.byteLength; i++) {
                        buffer[i] = String.fromCharCode(byteArray[i]);
                    }
                    binList[data.name] = buffer.join("");
                    // callback
                    onload();
                }
            };
            httpReq.send();
        }

        /**
         * to enable/disable caching
         * @ignore
         */
        obj.nocache = "";

        /*
         * PUBLIC STUFF
         */

        /**
         * onload callback
         * @public
         * @callback
         * @name onload
         * @memberOf me.loader
         * @example
         *
         * // set a callback when everything is loaded
         * me.loader.onload = this.loaded.bind(this);
         */
        obj.onload = undefined;

        /**
         * onProgress callback<br>
         * each time a resource is loaded, the loader will fire the specified function,
         * giving the actual progress [0 ... 1], as argument, and an object describing the resource loaded
         * @public
         * @callback
         * @name onProgress
         * @memberOf me.loader
         * @example
         *
         * // set a callback for progress notification
         * me.loader.onProgress = this.updateProgress.bind(this);
         */
        obj.onProgress = undefined;

        /**
         *  just increment the number of already loaded resources
         * @ignore
         */
        obj.onResourceLoaded = function (res) {
            // increment the loading counter
            loadCount++;

            // callback ?
            var progress = obj.getLoadProgress();
            if (obj.onProgress) {
                // pass the load progress in percent, as parameter
                obj.onProgress(progress, res);
            }
            me.event.publish(me.event.LOADER_PROGRESS, [progress, res]);
        };

        /**
         * on error callback for image loading
         * @ignore
         */
        obj.onLoadingError = function (res) {
            throw "melonJS: Failed loading resource " + res.src;
        };

        /**
         * enable the nocache mechanism
         * @ignore
         */
        obj.setNocache = function (enable) {
            obj.nocache = enable ? "?" + parseInt(Math.random() * 10000000, 10) : "";
        };


        /**
         * set all the specified game resources to be preloaded.<br>
         * each resource item must contain the following fields :<br>
         * - name    : internal name of the resource<br>
         * - type    : "binary", "image", "tmx", "tsx", "audio"<br>
         * each resource except type "tmx" must contain the following field :<br>
         * - src     : path and file name of the resource<br>
         * (!) for tmx :<br>
         * - src     : path and file name of the resource<br>
         * or<br>
         * - data    : the json or xml object representation of the tmx file<br>
         * - format  : "xml" or "json"<br>
         * (!) for audio :<br>
         * - src     : path (only) where resources are located<br>
         * <br>
         * @name preload
         * @memberOf me.loader
         * @public
         * @function
         * @param {Object[]} resources
         * @example
         * var g_resources = [
         *   // PNG tileset
         *   {name: "tileset-platformer", type: "image",  src: "data/map/tileset.png"},
         *   // PNG packed texture
         *   {name: "texture", type:"image", src: "data/gfx/texture.png"}
         *   // TSX file
         *   {name: "meta_tiles", type: "tsx", src: "data/map/meta_tiles.tsx"},
         *   // TMX level (XML & JSON)
         *   {name: "map1", type: "tmx", src: "data/map/map1.json"},
         *   {name: "map2", type: "tmx", src: "data/map/map2.tmx"},
         *   {name: "map3", type: "tmx", format: "json", data: {"height":15,"layers":[...],"tilewidth":32,"version":1,"width":20}},
         *   {name: "map4", type: "tmx", format: "xml", data: {xml representation of tmx}},
         *   // audio resources
         *   {name: "bgmusic", type: "audio",  src: "data/audio/"},
         *   {name: "cling",   type: "audio",  src: "data/audio/"},
         *   // binary file
         *   {name: "ymTrack", type: "binary", src: "data/audio/main.ym"},
         *   // JSON file (used for texturePacker)
         *   {name: "texture", type: "json", src: "data/gfx/texture.json"}
         * ];
         * ...
         *
         * // set all resources to be loaded
         * me.loader.preload(g_resources);
         */
        obj.preload = function (res) {
            // parse the resources
            for (var i = 0; i < res.length; i++) {
                resourceCount += obj.load(
                    res[i],
                    obj.onResourceLoaded.bind(obj, res[i]),
                    obj.onLoadingError.bind(obj, res[i])
                );
            }
            // check load status
            checkLoadStatus();
        };

        /**
         * Load a single resource (to be used if you need to load additional resource during the game)<br>
         * Given parameter must contain the following fields :<br>
         * - name    : internal name of the resource<br>
         * - type    : "audio", binary", "image", "json", "tmx", "tsx"<br>
         * each resource except type "tmx" must contain the following field :<br>
         * - src     : path and file name of the resource<br>
         * (!) for tmx :<br>
         * - src     : path and file name of the resource<br>
         * or<br>
         * - data    : the json or xml object representation of the tmx file<br>
         * - format  : "xml" or "json"<br>
         * (!) for audio :<br>
         * - src     : path (only) where resources are located<br>
         * @name load
         * @memberOf me.loader
         * @public
         * @function
         * @param {Object} resource
         * @param {Function} onload function to be called when the resource is loaded
         * @param {Function} onerror function to be called in case of error
         * @example
         * // load an image asset
         * me.loader.load({name: "avatar",  type:"image",  src: "data/avatar.png"}, this.onload.bind(this), this.onerror.bind(this));
         *
         * // start loading music
         * me.loader.load({
         *     name   : "bgmusic",
         *     type   : "audio",
         *     src    : "data/audio/"
         * }, function () {
         *     me.audio.play("bgmusic");
         * });
         */
        obj.load = function (res, onload, onerror) {
            // fore lowercase for the resource name
            res.name = res.name.toLowerCase();
            // check ressource type
            switch (res.type) {
                case "binary":
                    // reuse the preloadImage fn
                    preloadBinary.call(this, res, onload, onerror);
                    return 1;

                case "image":
                    // reuse the preloadImage fn
                    preloadImage.call(this, res, onload, onerror);
                    return 1;

                case "json":
                    preloadJSON.call(this, res, onload, onerror);
                    return 1;

                case "tmx":
                case "tsx":
                    preloadTMX.call(this, res, onload, onerror);
                    return 1;

                case "audio":
                    me.audio.load(res, onload, onerror);
                    return 1;

                default:
                    throw "melonJS: me.loader.load : unknown or invalid resource type : " + res.type;
            }
            return 0;
        };

        /**
         * unload specified resource to free memory
         * @name unload
         * @memberOf me.loader
         * @public
         * @function
         * @param {Object} resource
         * @return {Boolean} true if unloaded
         * @example me.loader.unload({name: "avatar",  type:"image",  src: "data/avatar.png"});
         */
        obj.unload = function (res) {
            res.name = res.name.toLowerCase();
            switch (res.type) {
                case "binary":
                    if (!(res.name in binList)) {
                        return false;
                    }

                    delete binList[res.name];
                    return true;

                case "image":
                    if (!(res.name in imgList)) {
                        return false;
                    }
                    if (typeof(imgList[res.name].dispose) === "function") {
                        // cocoonJS implements a dispose function to free
                        // corresponding allocated texture in memory
                        imgList[res.name].dispose();
                    }
                    delete imgList[res.name];
                    return true;

                case "json":
                    if (!(res.name in jsonList)) {
                        return false;
                    }

                    delete jsonList[res.name];
                    return true;

                case "tmx":
                case "tsx":
                    if (!(res.name in tmxList)) {
                        return false;
                    }

                    delete tmxList[res.name];
                    return true;

                case "audio":
                    return me.audio.unload(res.name);

                default:
                    throw "melonJS: me.loader.unload : unknown or invalid resource type : " + res.type;
            }
        };

        /**
         * unload all resources to free memory
         * @name unloadAll
         * @memberOf me.loader
         * @public
         * @function
         * @example me.loader.unloadAll();
         */
        obj.unloadAll = function () {
            var name;

            // unload all binary resources
            for (name in binList) {
                if (binList.hasOwnProperty(name)) {
                    obj.unload({
                        "name" : name,
                        "type" : "binary"
                    });
                }
            }

            // unload all image resources
            for (name in imgList) {
                if (imgList.hasOwnProperty(name)) {
                    obj.unload({
                        "name" : name,
                        "type" : "image"
                    });
                }
            }

            // unload all tmx resources
            for (name in tmxList) {
                if (tmxList.hasOwnProperty(name)) {
                    obj.unload({
                        "name" : name,
                        "type" : "tmx"
                    });
                }
            }

            // unload all in json resources
            for (name in jsonList) {
                if (jsonList.hasOwnProperty(name)) {
                    obj.unload({
                        "name" : name,
                        "type" : "json"
                    });
                }
            }

            // unload all audio resources
            me.audio.unloadAll();
        };

        /**
         * return the specified TMX/TSX object
         * @name getTMX
         * @memberOf me.loader
         * @public
         * @function
         * @param {String} tmx name of the tmx/tsx element ("map1");
         * @return {TMx}
         */
        obj.getTMX = function (elt) {
            // avoid case issue
            elt = elt.toLowerCase();
            if (elt in tmxList) {
                return tmxList[elt].data;
            }
            else {
                //console.log ("warning %s resource not yet loaded!",name);
                return null;
            }
        };

        /**
         * return the specified Binary object
         * @name getBinary
         * @memberOf me.loader
         * @public
         * @function
         * @param {String} name of the binary object ("ymTrack");
         * @return {Object}
         */
        obj.getBinary = function (elt) {
            // avoid case issue
            elt = elt.toLowerCase();
            if (elt in binList) {
                return binList[elt];
            }
            else {
                //console.log ("warning %s resource not yet loaded!",name);
                return null;
            }

        };

        /**
         * return the specified Image Object
         * @name getImage
         * @memberOf me.loader
         * @public
         * @function
         * @param {String} Image name of the Image element ("tileset-platformer");
         * @return {Image}
         */
        obj.getImage = function (elt) {
            // avoid case issue
            elt = elt.toLowerCase();
            if (elt in imgList) {
                // return the corresponding Image object
                return imgList[elt];
            }
            else {
                //console.log ("warning %s resource not yet loaded!",name);
                return null;
            }

        };

        /**
         * return the specified JSON Object
         * @name getJSON
         * @memberOf me.loader
         * @public
         * @function
         * @param {String} Name for the json file to load
         * @return {Object}
         */
        obj.getJSON = function (elt) {
            elt = elt.toLowerCase();
            if (elt in jsonList) {
                return jsonList[elt];
            }
            else {
                return null;
            }
        };

        /**
         * Return the loading progress in percent
         * @name getLoadProgress
         * @memberOf me.loader
         * @public
         * @function
         * @deprecated use callback instead
         * @return {Number}
         */
        obj.getLoadProgress = function () {
            return loadCount / resourceCount;
        };

        // return our object
        return obj;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Font / Bitmap font
 *
 * ASCII Table
 * http://www.asciitable.com/
 * [ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz]
 *
 * -> first char " " 32d (0x20);
 */
(function () {
    /**
     * a generic system font object.
     * @class
     * @extends me.Renderable
     * @memberOf me
     * @constructor
     * @param {String} font a CSS font name
     * @param {Number|String} size size, or size + suffix (px, em, pt)
     * @param {String} fillStyle a CSS color value
     * @param {String} [textAlign="left"] horizontal alignment
     */
    me.Font = me.Renderable.extend(
    /** @scope me.Font.prototype */
    {
        /*
         * Private font properties
         */

        /** @ignore */
        font : "Arial",
        fontSize : new me.Vector2d(),

        /**
         * defines the color used to draw the font.<br>
         * Default value : "#000000"
         * @public
         * @type String
         * @name me.Font#fillStyle
         */
        fillStyle : "#000000",

        /**
         * defines the color used to draw the font stroke.<br>
         * Default value : "#000000"
         * @public
         * @type String
         * @name me.Font#strokeStyle
         */
        strokeStyle : "#000000",

        /**
         * sets the current line width, in pixels, when drawing stroke
         * Default value : 1
         * @public
         * @type Number
         * @name me.Font#lineWidth
         */
        lineWidth  : 1,

        /**
         * Set the default text alignment (or justification),<br>
         * possible values are "left", "right", and "center".<br>
         * Default value : "left"
         * @public
         * @type String
         * @name me.Font#textAlign
         */
        textAlign : "left",

        /**
         * Set the text baseline (e.g. the Y-coordinate for the draw operation), <br>
         * possible values are "top", "hanging, "middle, "alphabetic, "ideographic, "bottom"<br>
         * Default value : "top"
         * @public
         * @type String
         * @name me.Font#textBaseline
         */
        textBaseline : "top",

        /**
         * Set the line spacing height (when displaying multi-line strings). <br>
         * Current font height will be multiplied with this value to set the line height.
         * Default value : 1.0
         * @public
         * @type Number
         * @name me.Font#lineHeight
         */
        lineHeight : 1.0,

        /** @ignore */
        init : function (font, size, fillStyle, textAlign) {
            // font name and type
            this.setFont(font, size, fillStyle, textAlign);

            // parent constructor
            this.parent(this.pos, 0, this.fontSize.y);
        },

        /**
         * make the font bold
         * @name bold
         * @memberOf me.Font
         * @function
         */
        bold : function () {
            this.font = "bold " + this.font;
        },

        /**
         * make the font italic
         * @name italic
         * @memberOf me.Font
         * @function
         */
        italic : function () {
            this.font = "italic " + this.font;
        },

        /**
         * Change the font settings
         * @name setFont
         * @memberOf me.Font
         * @function
         * @param {String} font a CSS font name
         * @param {Number|String} size size, or size + suffix (px, em, pt)
         * @param {String} fillStyle a CSS color value
         * @param {String} [textAlign="left"] horizontal alignment
         * @example
         * font.setFont("Arial", 20, "white");
         * font.setFont("Arial", "1.5em", "white");
         */
        setFont : function (font, size, fillStyle, textAlign) {
            // font name and type
            var font_names = font.split(",").map(function (value) {
                value = value.trim();
                return (
                    !/(^".*"$)|(^'.*'$)/.test(value)
                ) ? "\"" + value + "\"" : value;
            });

            this.fontSize.y = parseInt(size, 10);
            this.height = this.fontSize.y;

            if (typeof size === "number") {
                size += "px";
            }
            this.font = size + " " + font_names.join(",");
            this.fillStyle = fillStyle;
            if (textAlign) {
                this.textAlign = textAlign;
            }
        },

        /**
         * measure the given text size in pixels
         * @name measureText
         * @memberOf me.Font
         * @function
         * @param {Context} context 2D Context
         * @param {String} text
         * @return {Object} returns an object, with two attributes: width (the width of the text) and height (the height of the text).
         */
        measureText : function (context, text) {
            // draw the text
            context.font = this.font;
            context.fillStyle = this.fillStyle;
            context.textAlign = this.textAlign;
            context.textBaseline = this.textBaseline;

            this.height = this.width = 0;

            var strings = ("" + text).split("\n");
            for (var i = 0; i < strings.length; i++) {
                this.width = Math.max(context.measureText(strings[i].trimRight()).width, this.width);
                this.height += this.fontSize.y * this.lineHeight;
            }
            return {
                width : this.width,
                height : this.height
            };
        },

        /**
         * draw a text at the specified coord
         * @name draw
         * @memberOf me.Font
         * @function
         * @param {Context} context 2D Context
         * @param {String} text
         * @param {Number} x
         * @param {Number} y
         */
        draw : function (context, text, x, y) {
            // update initial position
            this.pos.set(x, y);

            // draw the text
            context.font = this.font;
            context.fillStyle = this.fillStyle;
            context.textAlign = this.textAlign;
            context.textBaseline = this.textBaseline;

            var strings = ("" + text).split("\n");
            for (var i = 0; i < strings.length; i++) {
                // draw the string
                context.fillText(strings[i].trimRight(), ~~x, ~~y);
                // add leading space
                y += this.fontSize.y * this.lineHeight;
            }

        },

        /**
         * draw a stroke text at the specified coord, as defined <br>
         * by the `lineWidth` and `fillStroke` properties. <br>
         * Note : using drawStroke is not recommended for performance reasons
         * @name drawStroke
         * @memberOf me.Font
         * @function
         * @param {Context} context 2D Context
         * @param {String} text
         * @param {Number} x
         * @param {Number} y
         */
        drawStroke : function (context, text, x, y) {
            // update initial position
            this.pos.set(x, y);

            // draw the text
            context.font = this.font;
            context.fillStyle = this.fillStyle;
            context.strokeStyle = this.strokeStyle;
            context.lineWidth = this.lineWidth;
            context.textAlign = this.textAlign;
            context.textBaseline = this.textBaseline;

            var strings = ("" + text).split("\n");
            for (var i = 0; i < strings.length; i++) {
                var _string = strings[i].trimRight();
                // draw the border
                context.strokeText(_string, ~~x, ~~y);
                // draw the string
                context.fillText(_string, ~~x, ~~y);
                // add leading space
                y += this.fontSize.y * this.lineHeight;
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Font / Bitmap font
 *
 * ASCII Table
 * http://www.asciitable.com/
 * [ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz]
 *
 * -> first char " " 32d (0x20);
 */
(function () {
    /**
     * a bitpmap font object
     * @class
     * @extends me.Font
     * @memberOf me
     * @constructor
     * @param {String} font
     * @param {Number|Object} size either an int value, or an object like {x:16,y:16}
     * @param {Number} [scale="1.0"]
     * @param {String} [firstChar="0x20"]
     */
    me.BitmapFont = me.Font.extend(
    /** @scope me.BitmapFont.prototype */ {
        /** @ignore */
        // scaled font size;
        sSize : new me.Vector2d(),
        // first char in the ascii table
        firstChar : 0x20,

        // #char per row
        charCount : 0,

        /** @ignore */
        init : function (font, size, scale, firstChar) {
            // font name and type
            this.parent(font, null, null);

            // first char in the ascii table
            this.firstChar = firstChar || 0x20;

            // load the font metrics
            this.loadFontMetrics(font, size);

            // set a default alignement
            this.textAlign = "left";
            this.textBaseline = "top";

            // resize if necessary
            if (scale) {
                this.resize(scale);
            }
        },

        /**
         * Load the font metrics
         * @ignore
         */
        loadFontMetrics : function (font, size) {
            this.font = me.loader.getImage(font);

            // some cheap metrics
            this.fontSize.x = size.x || size;
            this.fontSize.y = size.y || this.font.height;
            this.sSize.copy(this.fontSize);
            this.height = this.sSize.y;

            // #char per row
            this.charCount = ~~(this.font.width / this.fontSize.x);
        },

        /**
         * change the font settings
         * @name set
         * @memberOf me.BitmapFont
         * @function
         * @param {String} textAlign ("left", "center", "right")
         * @param {Number} [scale]
         */
        set : function (textAlign, scale) {
            this.textAlign = textAlign;
            // updated scaled Size
            if (scale) {
                this.resize(scale);
            }
        },

        /**
         * change the font display size
         * @name resize
         * @memberOf me.BitmapFont
         * @function
         * @param {Number} scale ratio
         */
        resize : function (scale) {
            // updated scaled Size
            this.sSize.setV(this.fontSize);
            this.sSize.x *= scale;
            this.sSize.y *= scale;
            this.height = this.sSize.y;
        },

        /**
         * measure the given text size in pixels
         * @name measureText
         * @memberOf me.BitmapFont
         * @function
         * @param {Context} context 2D Context
         * @param {String} text
         * @return {Object} returns an object, with two attributes: width (the width of the text) and height (the height of the text).
         */
        measureText : function (context, text) {
            var strings = ("" + text).split("\n");

            this.height = this.width = 0;

            for (var i = 0; i < strings.length; i++) {
                this.width = Math.max((strings[i].trimRight().length * this.sSize.x), this.width);
                this.height += this.sSize.y * this.lineHeight;
            }
            return {width: this.width, height: this.height};
        },

        /**
         * draw a text at the specified coord
         * @name draw
         * @memberOf me.BitmapFont
         * @function
         * @param {Context} context 2D Context
         * @param {String} text
         * @param {Number} x
         * @param {Number} y
         */
        draw : function (context, text, x, y) {
            var strings = ("" + text).split("\n");
            var lX = x;
            var height = this.sSize.y * this.lineHeight;
            // update initial position
            this.pos.set(x, y);
            for (var i = 0; i < strings.length; i++) {
                x = lX;
                var string = strings[i].trimRight();
                // adjust x pos based on alignment value
                var width = string.length * this.sSize.x;
                switch (this.textAlign) {
                    case "right":
                        x -= width;
                        break;

                    case "center":
                        x -= width * 0.5;
                        break;

                    default :
                        break;
                }

                // adjust y pos based on alignment value
                switch (this.textBaseline) {
                    case "middle":
                        y -= height * 0.5;
                        break;

                    case "ideographic":
                    case "alphabetic":
                    case "bottom":
                        y -= height;
                        break;

                    default :
                        break;
                }

                // draw the string
                for (var c = 0, len = string.length; c < len; c++) {
                    // calculate the char index
                    var idx = string.charCodeAt(c) - this.firstChar;
                    if (idx >= 0) {
                        // draw it
                        context.drawImage(this.font,
                            this.fontSize.x * (idx % this.charCount),
                            this.fontSize.y * ~~(idx / this.charCount),
                            this.fontSize.x, this.fontSize.y,
                            ~~x, ~~y,
                            this.sSize.x, this.sSize.y);
                    }
                    x += this.sSize.x;
                }
                // increment line
                y += height;
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Audio Mngt Objects
 *
 *
 */
(function () {
    /**
     * There is no constructor function for me.audio.
     * @namespace me.audio
     * @memberOf me
     */
    me.audio = (function () {
        /*
         * PRIVATE STUFF
         */

        // hold public stuff in our singleton
        var obj = {};

        // audio channel list
        var audioTracks = {};

        // unique store for callbacks
        var callbacks = {};

        // current music
        var current_track_id = null;
        var current_track_instance = null;

        // a retry counter
        var retry_counter = 0;

        /**
         * event listener callback on load error
         * @ignore
         */
        function soundLoadError(sound_id, onerror_cb) {
            // check the retry counter
            if (retry_counter++ > 3) {
                // something went wrong
                var errmsg = "melonJS: failed loading " + sound_id;
                if (me.sys.stopOnAudioError === false) {
                    // disable audio
                    me.audio.disable();
                    // call error callback if defined
                    if (onerror_cb) {
                        onerror_cb();
                    }
                    // warning
                    console.log(errmsg + ", disabling audio");
                }
                else {
                    // throw an exception and stop everything !
                    throw errmsg;
                }
            // else try loading again !
            }
            else {
                audioTracks[sound_id].load();
            }
        }

        function setTrackInstance(id) {
            current_track_instance = id;
        }


        /*
         * PUBLIC STUFF
         */

        /**
         * initialize the audio engine<br>
         * the melonJS loader will try to load audio files corresponding to the
         * browser supported audio format<br>
         * if no compatible audio codecs are found, audio will be disabled
         * @name init
         * @memberOf me.audio
         * @public
         * @function
         * @param {String}
         *          audioFormat audio format provided ("mp3, ogg, m4a, wav")
         * @example
         * // initialize the "sound engine", giving "mp3" and "ogg" as desired audio format
         * // i.e. on Safari, the loader will load all audio.mp3 files,
         * // on Opera the loader will however load audio.ogg files
         * me.audio.init("mp3,ogg");
         */
        obj.init = function (audioFormat) {
            if (!me.initialized) {
                throw "melonJS: me.audio.init() called before engine initialization.";
            }
            // if no param is given to init we use mp3 by default
            audioFormat = typeof audioFormat === "string" ? audioFormat : "mp3";
            // convert it into an array
            this.audioFormats = audioFormat.split(",");
        };

        /**
         * enable audio output <br>
         * only useful if audio supported and previously disabled through
         *
         * @see me.audio#disable
         * @name enable
         * @memberOf me.audio
         * @public
         * @function
         */
        obj.enable = function () {
            this.unmuteAll();
        };

        /**
         * disable audio output
         *
         * @name disable
         * @memberOf me.audio
         * @public
         * @function
         */
        obj.disable = function () {
            this.muteAll();
        };

        /**
         * Load an audio file.<br>
         * <br>
         * sound item must contain the following fields :<br>
         * - name    : id of the sound<br>
         * - src     : source path<br>
         * @ignore
         */
        obj.load = function (sound, onload_cb, onerror_cb) {
            var urls = [];
            for (var i = 0; i < this.audioFormats.length; i++) {
                urls.push(sound.src + sound.name + "." + this.audioFormats[i] + me.loader.nocache);
            }
            var soundclip = new Howl({
                urls : urls,
                volume : Howler.volume(),
                onend : function (soundId) {
                    if (callbacks[soundId]) {
                        // fire call back if it exists, then delete it
                        callbacks[soundId]();
                        callbacks[soundId] = null;
                    }
                },
                onloaderror : function () {
                    soundLoadError.call(me.audio, sound.name, onerror_cb);
                },
                onload : function () {
                    retry_counter = 0;
                    if (onload_cb) {
                        onload_cb();
                    }
                }
            });

            audioTracks[sound.name] = soundclip;

            return 1;
        };

        /**
         * play the specified sound
         * @name play
         * @memberOf me.audio
         * @public
         * @function
         * @param {String}
         *            sound_id audio clip id
         * @param {Boolean}
         *            [loop=false] loop audio
         * @param {Function}
         *            [callback] returns the unique playback id for this sound instance.
         * @param {Number}
         *            [volume=default] Float specifying volume (0.0 - 1.0 values accepted).
         * @example
         * // play the "cling" audio clip
         * me.audio.play("cling");
         * // play & repeat the "engine" audio clip
         * me.audio.play("engine", true);
         * // play the "gameover_sfx" audio clip and call myFunc when finished
         * me.audio.play("gameover_sfx", false, myFunc);
         * // play the "gameover_sfx" audio clip with a lower volume level
         * me.audio.play("gameover_sfx", false, null, 0.5);
         */
        obj.play = function (sound_id, loop, callback, volume) {
            var sound = audioTracks[sound_id.toLowerCase()];
            if (sound && typeof sound !== "undefined") {
                sound.loop(loop || false);
                sound.volume(typeof(volume) === "number" ? volume.clamp(0.0, 1.0) : Howler.volume());
                sound.play(null, callback);
                return sound;
            }
        };

        /**
         * stop the specified sound on all channels
         * @name stop
         * @memberOf me.audio
         * @public
         * @function
         * @param {String} sound_id audio clip id
         * @param {String} [id] the play instance ID.
         * @example
         * me.audio.stop("cling");
         */
        obj.stop = function (sound_id, instance_id) {
            var sound = audioTracks[sound_id.toLowerCase()];
            if (sound && typeof sound !== "undefined") {
                sound.stop(instance_id);
            }
        };

        /**
         * pause the specified sound on all channels<br>
         * this function does not reset the currentTime property
         * @name pause
         * @memberOf me.audio
         * @public
         * @function
         * @param {String} sound_id audio clip id
         * @param {String} [id] the play instance ID.
         * @example
         * me.audio.pause("cling");
         */
        obj.pause = function (sound_id, instance_id) {
            var sound = audioTracks[sound_id.toLowerCase()];
            if (sound && typeof sound !== "undefined") {
                sound.pause(instance_id);
            }
        };

        /**
         * play the specified audio track<br>
         * this function automatically set the loop property to true<br>
         * and keep track of the current sound being played.
         * @name playTrack
         * @memberOf me.audio
         * @public
         * @function
         * @param {String} sound_id audio track id
         * @param {Number} [volume=default] Float specifying volume (0.0 - 1.0 values accepted).
         * @example
         * me.audio.playTrack("awesome_music");
         */
        obj.playTrack = function (sound_id, volume) {
            current_track_id = sound_id.toLowerCase();
            return me.audio.play(
                current_track_id,
                true,
                navigator.isCocoonJS && (!Howler.usingWebAudio) ? setTrackInstance : undefined,
                volume
            );
        };

        /**
         * stop the current audio track
         *
         * @see me.audio#playTrack
         * @name stopTrack
         * @memberOf me.audio
         * @public
         * @function
         * @example
         * // play a awesome music
         * me.audio.playTrack("awesome_music");
         * // stop the current music
         * me.audio.stopTrack();
         */
        obj.stopTrack = function () {
            if (current_track_id !== null) {
                audioTracks[current_track_id].stop(
                    navigator.isCocoonJS && (!Howler.usingWebAudio) ? current_track_instance : undefined
                );
                current_track_id = null;
            }
        };

        /**
         * pause the current audio track
         *
         * @name pauseTrack
         * @memberOf me.audio
         * @public
         * @function
         * @example
         * me.audio.pauseTrack();
         */
        obj.pauseTrack = function () {
            if (current_track_id !== null) {
                audioTracks[current_track_id].pause(
                    navigator.isCocoonJS && (!Howler.usingWebAudio) ? current_track_instance : undefined
                );
            }
        };

        /**
         * resume the previously paused audio track
         *
         * @name resumeTrack
         * @memberOf me.audio
         * @public
         * @function
         * @param {String} sound_id audio track id
         * @example
         * // play an awesome music
         * me.audio.playTrack("awesome_music");
         * // pause the audio track
         * me.audio.pauseTrack();
         * // resume the music
         * me.audio.resumeTrack();
         */
        obj.resumeTrack = function () {
            if (current_track_id !== null) {
                audioTracks[current_track_id].play(
                    null,
                    navigator.isCocoonJS && (!Howler.usingWebAudio) ? setTrackInstance : undefined
                );
            }
        };

        /**
         * returns the current track Id
         * @name getCurrentTrack
         * @memberOf me.audio
         * @public
         * @function
         * @return {String} audio track id
         */
        obj.getCurrentTrack = function () {
            return current_track_id;
        };

        /**
         * set the default global volume
         * @name setVolume
         * @memberOf me.audio
         * @public
         * @function
         * @param {Number} volume Float specifying volume (0.0 - 1.0 values accepted).
         */
        obj.setVolume = function (volume) {
            Howler.volume(volume);
        };

        /**
         * get the default global volume
         * @name getVolume
         * @memberOf me.audio
         * @public
         * @function
         * @returns {Number} current volume value in Float [0.0 - 1.0] .
         */
        obj.getVolume = function () {
            return Howler.volume();
        };

        /**
         * mute the specified sound
         * @name mute
         * @memberOf me.audio
         * @public
         * @function
         * @param {String} sound_id audio clip id
         */
        obj.mute = function (sound_id, mute) {
            // if not defined : true
            mute = (typeof(mute) === "undefined" ? true : !!mute);
            var sound = audioTracks[sound_id.toLowerCase()];
            if (sound && typeof(sound) !== "undefined") {
                sound.mute(true);
            }
        };

        /**
         * unmute the specified sound
         * @name unmute
         * @memberOf me.audio
         * @public
         * @function
         * @param {String} sound_id audio clip id
         */
        obj.unmute = function (sound_id) {
            obj.mute(sound_id, false);
        };

        /**
         * mute all audio
         * @name muteAll
         * @memberOf me.audio
         * @public
         * @function
         */
        obj.muteAll = function () {
            Howler.mute();
        };

        /**
         * unmute all audio
         * @name unmuteAll
         * @memberOf me.audio
         * @public
         * @function
         */
        obj.unmuteAll = function () {
            Howler.unmute();
        };

        /**
         * unload specified audio track to free memory
         *
         * @name unload
         * @memberOf me.audio
         * @public
         * @function
         * @param {String} sound_id audio track id
         * @return {Boolean} true if unloaded
         * @example
         * me.audio.unload("awesome_music");
         */
        obj.unload = function (sound_id) {
            sound_id = sound_id.toLowerCase();
            if (!(sound_id in audioTracks)) {
                return false;
            }

            // destroy the Howl object
            audioTracks[sound_id].unload();
            delete audioTracks[sound_id];

            return true;
        };

        /**
         * unload all audio to free memory
         *
         * @name unloadAll
         * @memberOf me.audio
         * @public
         * @function
         * @example
         * me.audio.unloadAll();
         */
        obj.unloadAll = function () {
            for (var sound_id in audioTracks) {
                if (audioTracks.hasOwnProperty(sound_id)) {
                    obj.unload(sound_id);
                }
            }
        };

        // return our object
        return obj;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * video functions
     * There is no constructor function for me.video
     * @namespace me.video
     * @memberOf me
     */
    me.video = (function () {
        // hold public stuff in our apig
        var api = {};

        // internal variables
        var canvas = null;
        var context2D = null;
        var backBufferCanvas = null;
        var backBufferContext2D = null;
        var wrapper = null;

        var deferResizeId = -1;

        var double_buffering = false;
        var game_width_zoom = 0;
        var game_height_zoom = 0;
        var auto_scale = false;
        var maintainAspectRatio = true;

        // max display size
        var maxWidth = Infinity;
        var maxHeight = Infinity;

        /*
         * PUBLIC STUFF
         */

        /**
         * init the "video" part<p>
         * return false if initialization failed (canvas not supported)
         * @name init
         * @memberOf me.video
         * @function
         * @param {String} wrapper the "div" element id to hold the canvas in the HTML file  (if null document.body will be used)
         * @param {Number} width game width
         * @param {Number} height game height
         * @param {Boolean} [double_buffering] enable/disable double buffering
         * @param {Number} [scale] enable scaling of the canvas ('auto' for automatic scaling)
         * @param {Boolean} [maintainAspectRatio] maintainAspectRatio when scaling the display
         * @return {Boolean}
         * @example
         * // init the video with a 480x320 canvas
         * if (!me.video.init('jsapp', 480, 320)) {
         *    alert("Sorry but your browser does not support html 5 canvas !");
         *    return;
         * }
         */
        api.init = function (wrapperid, game_width, game_height, doublebuffering, scale, aspectRatio) {
            // ensure melonjs has been properly initialized
            if (!me.initialized) {
                throw "melonJS: me.video.init() called before engine initialization.";
            }
            // check given parameters
            double_buffering = doublebuffering || false;
            auto_scale  = (scale === "auto") || false;
            maintainAspectRatio = (typeof(aspectRatio) !== "undefined") ? aspectRatio : true;

            // normalize scale
            scale = (scale !== "auto") ? parseFloat(scale || 1.0) : 1.0;
            me.sys.scale = new me.Vector2d(scale, scale);

            // force double buffering if scaling is required
            if (auto_scale || (scale !== 1.0)) {
                double_buffering = true;
            }

            // default scaled size value
            game_width_zoom = game_width * me.sys.scale.x;
            game_height_zoom = game_height * me.sys.scale.y;

            //add a channel for the onresize/onorientationchange event
            window.addEventListener(
                "resize",
                throttle(
                    100,
                    false,
                    function (event) {
                        me.event.publish(me.event.WINDOW_ONRESIZE, [ event ]);
                    }
                ),
                false
            );
            window.addEventListener(
                "orientationchange",
                function (event) {
                    me.event.publish(me.event.WINDOW_ONORIENTATION_CHANGE, [ event ]);
                },
                false
            );

            // register to the channel
            me.event.subscribe(
                me.event.WINDOW_ONRESIZE,
                me.video.onresize.bind(me.video)
            );
            me.event.subscribe(
                me.event.WINDOW_ONORIENTATION_CHANGE,
                me.video.onresize.bind(me.video)
            );

            // create the main screen canvas
            canvas = api.createCanvas(game_width_zoom, game_height_zoom, true);

            // add our canvas
            if (wrapperid) {
                wrapper = document.getElementById(wrapperid);
            }
            // if wrapperid is not defined (null)
            if (!wrapper) {
                // add the canvas to document.body
                wrapper = document.body;
            }
            wrapper.appendChild(canvas);

            // stop here if not supported
            if (!canvas.getContext) {
                return false;
            }

            // get the 2D context
            context2D = api.getContext2d(canvas);

            // adjust CSS style for High-DPI devices
            if (me.device.getPixelRatio() > 1) {
                canvas.style.width = (canvas.width / me.device.getPixelRatio()) + "px";
                canvas.style.height = (canvas.height / me.device.getPixelRatio()) + "px";
            }

            // create the back buffer if we use double buffering
            if (double_buffering) {
                backBufferCanvas = api.createCanvas(game_width, game_height, false);
                backBufferContext2D = api.getContext2d(backBufferCanvas);
            }
            else {
                backBufferCanvas = canvas;
                backBufferContext2D = context2D;
            }

            // set max the canvas max size if CSS values are defined
            if (window.getComputedStyle) {
                var style = window.getComputedStyle(canvas, null);
                me.video.setMaxSize(parseInt(style.maxWidth, 10), parseInt(style.maxHeight, 10));
            }

            // trigger an initial resize();
            me.video.onresize(null);

            me.game.init();

            return true;
        };

        /**
         * return a reference to the wrapper
         * @name getWrapper
         * @memberOf me.video
         * @function
         * @return {Document}
         */
        api.getWrapper = function () {
            return wrapper;
        };

        /**
         * return the width of the display canvas (before scaling)
         * @name getWidth
         * @memberOf me.video
         * @function
         * @return {Number}
         */
        api.getWidth = function () {
            return backBufferCanvas.width;

        };

        /**
         * return the relative (to the page) position of the specified Canvas
         * @name getPos
         * @memberOf me.video
         * @function
         * @param {Canvas} [canvas] system one if none specified
         * @return {me.Vector2d}
         */
        api.getPos = function (c) {
            c = c || canvas;
            return (
                c.getBoundingClientRect ?
                c.getBoundingClientRect() : { left : 0, top : 0 }
            );
        };

        /**
         * return the height of the display canvas (before scaling)
         * @name getHeight
         * @memberOf me.video
         * @function
         * @return {Number}
         */
        api.getHeight = function () {
            return backBufferCanvas.height;
        };

        /**
         * set the max canvas display size (when scaling)
         * @name setMaxSize
         * @memberOf me.video
         * @function
         * @param {Number} width width
         * @param {Number} height height
         */
        api.setMaxSize = function (w, h) {
            // max display size
            maxWidth = w || Infinity;
            maxHeight = h || Infinity;
        };


        /**
         * Create and return a new Canvas
         * @name createCanvas
         * @memberOf me.video
         * @function
         * @param {Number} width width
         * @param {Number} height height
         * @param {Boolean} [screencanvas=false] set to true if this canvas renders directly to the screen
         * @return {Canvas}
         */
        api.createCanvas = function (width, height, screencanvas) {
            if (width === 0 || height === 0)  {
                throw new Error("melonJS: width or height was zero, Canvas could not be initialized !");
            }

            var _canvas = document.createElement("canvas");

            if ((screencanvas === true) && (navigator.isCocoonJS) && (me.device.android2 !== true)) {
                // enable ScreenCanvas on cocoonJS
                _canvas.screencanvas = true;
            }

            _canvas.width = width || backBufferCanvas.width;
            _canvas.height = height || backBufferCanvas.height;

            return _canvas;
        };

        /**
         * Returns the 2D Context object of the given Canvas
         * `getContext2d` will also enable/disable antialiasing features based on global settings.
         * @name getContext2D
         * @memberOf me.video
         * @function
         * @param {Canvas}
         * @return {Context2d}
         */
        api.getContext2d = function (canvas) {
            var _context;
            if (navigator.isCocoonJS) {
                // cocoonJS specific extension
                _context = canvas.getContext("2d", {
                    "antialias" : me.sys.scalingInterpolation
                });
            }
            else {
                _context = canvas.getContext("2d");
            }
            if (!_context.canvas) {
                _context.canvas = canvas;
            }
            me.video.setImageSmoothing(_context, me.sys.scalingInterpolation);
            return _context;
        };

        /**
         * return a reference to the screen canvas <br>
         * (will return buffered canvas if double buffering is enabled, or a reference to Screen Canvas) <br>
         * use this when checking for display size, event <br>
         * or if you need to apply any special "effect" to <br>
         * the corresponding context (ie. imageSmoothingEnabled)
         * @name getScreenCanvas
         * @memberOf me.video
         * @function
         * @return {Canvas}
         */
        api.getScreenCanvas = function () {
            return canvas;
        };

        /**
         * return a reference to the screen canvas corresponding 2d Context<br>
         * (will return buffered context if double buffering is enabled, or a reference to the Screen Context)
         * @name getScreenContext
         * @memberOf me.video
         * @function
         * @return {Context2d}
         */
        api.getScreenContext = function () {
            return context2D;
        };

        /**
         * return a reference to the system canvas
         * @name getSystemCanvas
         * @memberOf me.video
         * @function
         * @return {Canvas}
         */
        api.getSystemCanvas = function () {
            return backBufferCanvas;
        };

        /**
         * return a reference to the system 2d Context
         * @name getSystemContext
         * @memberOf me.video
         * @function
         * @return {Context2d}
         */
        api.getSystemContext = function () {
            return backBufferContext2D;
        };

        /**
         * callback for window resize event
         * @ignore
         */
        api.onresize = function () {
            // default (no scaling)
            var scaleX = 1, scaleY = 1;

            // check for orientation information
            if (typeof window.orientation !== "undefined") {
                me.device.orientation = window.orientation;
            }
            else {
                // is this actually not the best option since default "portrait"
                // orientation might vary between for example an ipad and and android tab
                me.device.orientation = (
                    window.outerWidth > window.outerHeight ?
                    90 : 0
                );
            }

            if (auto_scale) {
                // get the parent container max size
                var parent = me.video.getScreenCanvas().parentNode;
                var _max_width = Math.min(maxWidth, parent.width || window.innerWidth);
                var _max_height = Math.min(maxHeight, parent.height || window.innerHeight);

                if (maintainAspectRatio) {
                    // make sure we maintain the original aspect ratio
                    var designRatio = me.video.getWidth() / me.video.getHeight();
                    var screenRatio = _max_width / _max_height;
                    if (screenRatio < designRatio) {
                        scaleX = scaleY = _max_width / me.video.getWidth();
                    }
                    else {
                        scaleX = scaleY = _max_height / me.video.getHeight();
                    }
                }
                else {
                    // scale the display canvas to fit with the parent container
                    scaleX = _max_width / me.video.getWidth();
                    scaleY = _max_height / me.video.getHeight();
                }

                // adjust scaling ratio based on the device pixel ratio
                scaleX *= me.device.getPixelRatio();
                scaleY *= me.device.getPixelRatio();

                // scale if required
                if (scaleX !== 1 || scaleY !== 1) {
                    if (deferResizeId >= 0) {
                        // cancel any previous pending resize
                        clearTimeout(deferResizeId);
                    }
                    deferResizeId = me.video.updateDisplaySize.defer(this, scaleX, scaleY);
                    return;
                }
            }
            // make sure we have the correct relative canvas position cached
            me.input._offset = me.video.getPos();
        };

        /**
         * Modify the "displayed" canvas size
         * @name updateDisplaySize
         * @memberOf me.video
         * @function
         * @param {Number} scaleX X scaling multiplier
         * @param {Number} scaleY Y scaling multiplier
         */
        api.updateDisplaySize = function (scaleX, scaleY) {
            // update the global scale variable
            me.sys.scale.set(scaleX, scaleY);

            // apply the new value
            canvas.width = game_width_zoom = backBufferCanvas.width * scaleX;
            canvas.height = game_height_zoom = backBufferCanvas.height * scaleY;
            // adjust CSS style for High-DPI devices
            if (me.device.getPixelRatio() > 1) {
                canvas.style.width = (canvas.width / me.device.getPixelRatio()) + "px";
                canvas.style.height = (canvas.height / me.device.getPixelRatio()) + "px";
            }
            me.video.setImageSmoothing(context2D, me.sys.scalingInterpolation);

            // make sure we have the correct relative canvas position cached
            me.input._offset = me.video.getPos();

            // force a canvas repaint
            api.blitSurface();

            // clear the timeout id
            deferResizeId = -1;
        };

        /**
         * Clear the specified context with the given color
         * @name clearSurface
         * @memberOf me.video
         * @function
         * @param {Context2d} context Canvas context
         * @param {String} color a CSS color string
         */
        api.clearSurface = function (context, col) {
            var _canvas = context.canvas;
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.fillStyle = col;
            context.fillRect(0, 0, _canvas.width, _canvas.height);
            context.restore();
        };

        /**
         * enable/disable image smoothing (scaling interpolation) for the specified 2d Context<br>
         * (!) this might not be supported by all browsers <br>
         * @name setImageSmoothing
         * @memberOf me.video
         * @function
         * @param {Context2d} context
         * @param {Boolean} [enable=false]
         */
        api.setImageSmoothing = function (context, enable) {
            me.agent.setPrefixed("imageSmoothingEnabled", enable === true, context);
        };

        /**
         * enable/disable Alpha for the specified context
         * @name setAlpha
         * @memberOf me.video
         * @function
         * @param {Context2d} context
         * @param {Boolean} enable
         */
        api.setAlpha = function (context, enable) {
            context.globalCompositeOperation = enable ? "source-over" : "copy";
        };

        /**
         * render the main framebuffer on screen
         * @name blitSurface
         * @memberOf me.video
         * @function
         */
        api.blitSurface = function () {
            if (double_buffering) {
                /** @ignore */
                api.blitSurface = function () {
                    //FPS.update();
                    context2D.drawImage(
                        backBufferCanvas, 0, 0,
                        backBufferCanvas.width, backBufferCanvas.height, 0,
                        0, game_width_zoom, game_height_zoom
                    );

                };
            }
            else {
                // "empty" function, as we directly render stuff on "context2D"
                /** @ignore */
                api.blitSurface = function () {
                };
            }
            api.blitSurface();
        };

        /**
         * apply the specified filter to the main canvas
         * and return a new canvas object with the modified output<br>
         * (!) Due to the internal usage of getImageData to manipulate pixels,
         * this function will throw a Security Exception with FF if used locally
         * @name applyRGBFilter
         * @memberOf me.video
         * @function
         * @param {Object} object Canvas or Image Object on which to apply the filter
         * @param {String} effect "b&w", "brightness", "transparent"
         * @param {String} option For "brightness" effect : level [0...1] <br> For "transparent" effect : color to be replaced in "#RRGGBB" format
         * @return {Context2d} context object
         */
        api.applyRGBFilter = function (object, effect, option) {
            //create a output canvas using the given canvas or image size
            var _context = api.getContext2d(api.createCanvas(object.width, object.height, false));
            // get the pixels array of the give parameter
            var imgpix = me.utils.getPixels(object);
            // pointer to the pixels data
            var pix = imgpix.data;

            // apply selected effect
            var i, n;
            switch (effect) {
                case "b&w":
                    for (i = 0, n = pix.length; i < n; i += 4) {
                        var grayscale = (3 * pix[i] + 4 * pix[i + 1] + pix[i + 2]) >>> 3;
                        pix[i] = grayscale; // red
                        pix[i + 1] = grayscale; // green
                        pix[i + 2] = grayscale; // blue
                    }
                    break;

                case "brightness":
                    // make sure it's between 0.0 and 1.0
                    var brightness = Math.abs(option).clamp(0.0, 1.0);
                    for (i = 0, n = pix.length; i < n; i += 4) {

                        pix[i] *= brightness; // red
                        pix[i + 1] *= brightness; // green
                        pix[i + 2] *= brightness; // blue
                    }
                    break;

                case "transparent":
                    var refColor = me.pool.pull("me.Color").parseHex(option);
                    var pixel = me.pool.pull("me.Color");
                    for (i = 0, n = pix.length; i < n; i += 4) {
                        pixel.setColor(pix[i], pix[i + 1], pix[i + 2]);
                        if (pixel.equals(refColor)) {
                            pix[i + 3] = 0;
                        }
                    }
                    me.pool.push(refColor);
                    me.pool.push(pixel);

                    break;


                default:
                    return null;
            }

            // put our modified image back in the new filtered canvas
            _context.putImageData(imgpix, 0, 0);

            // return it
            return _context;
        };

        // return our api
        return api;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014, Olivier Biot, Jason Oster
 * http://www.melonjs.org/
 *
 */
(function () {
    /**
     * @namespace me.input
     * @memberOf me
     */
    me.input = (function () {
        // hold public stuff in our singleton
        var obj = {};

        /*
         * PRIVATE STUFF
         */

        /**
         * prevent event propagation
         * @ignore
         */
        obj._preventDefault = function (e) {
            // stop event propagation
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            else {
                e.cancelBubble = true;
            }
            // stop event default processing
            if (e.preventDefault)  {
                e.preventDefault();
            }
            else  {
                e.returnValue = false;
            }

            return false;
        };

        /*
         * PUBLIC STUFF
         */

        /**
         * Global flag to specify if melonJS should prevent default browser action on registered key events <br>
         * This is also configurable per key through the bindKey function
         * default : true
         * @public
         * @type Boolean
         * @name preventDefault
         * @memberOf me.input
         */
        obj.preventDefault = true;

        // return our object
        return obj;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014, Olivier Biot, Jason Oster
 * http://www.melonjs.org/
 *
 */
(function () {
    /*
     * PRIVATE STUFF
     */

    // Reference to base class
    var obj = me.input;

    // list of binded keys
    obj._KeyBinding = {};

    // corresponding actions
    var keyStatus = {};

    // lock enable flag for keys
    var keyLock = {};
    // actual lock status of each key
    var keyLocked = {};

    // List of binded keys being held
    var keyRefs = {};

    // whether default event should be prevented for a given keypress
    var preventDefaultForKeys = {};

    // some useful flags
    var keyboardInitialized = false;

    /**
     * enable keyboard event
     * @ignore
     */
    obj._enableKeyboardEvent = function () {
        if (!keyboardInitialized) {
            window.addEventListener("keydown", obj._keydown, false);
            window.addEventListener("keyup", obj._keyup, false);
            keyboardInitialized = true;
        }
    };

    /**
     * key down event
     * @ignore
     */
    obj._keydown = function (e, keyCode, mouseButton) {

        keyCode = keyCode || e.keyCode || e.which;
        var action = obj._KeyBinding[keyCode];

        // publish a message for keydown event
        me.event.publish(me.event.KEYDOWN, [
            action,
            keyCode,
            action ? !keyLocked[action] : true
        ]);

        if (action) {
            if (!keyLocked[action]) {
                var trigger = mouseButton ? mouseButton : keyCode;
                if (!keyRefs[action][trigger]) {
                    keyStatus[action]++;
                    keyRefs[action][trigger] = true;
                }
            }
            // prevent event propagation
            if (preventDefaultForKeys[keyCode]) {
                return obj._preventDefault(e);
            }
            else {
                return true;
            }
        }

        return true;
    };


    /**
     * key up event
     * @ignore
     */
    obj._keyup = function (e, keyCode, mouseButton) {
        keyCode = keyCode || e.keyCode || e.which;
        var action = obj._KeyBinding[keyCode];

        // publish a message for keydown event
        me.event.publish(me.event.KEYUP, [ action, keyCode ]);

        if (action) {
            var trigger = mouseButton ? mouseButton : keyCode;
            keyRefs[action][trigger] = undefined;

            if (keyStatus[action] > 0) {
                keyStatus[action]--;
            }

            keyLocked[action] = false;

            // prevent event propagation
            if (preventDefaultForKeys[keyCode]) {
                return obj._preventDefault(e);
            }
            else {
                return true;
            }
        }

        return true;
    };

    /*
     * PUBLIC STUFF
     */

    /**
     * list of mappable keys :
     * LEFT, UP, RIGHT, DOWN, ENTER, SHIFT, CTRL, ALT, PAUSE, ESC, ESCAPE, [0..9], [A..Z]
     * @public
     * @enum {number}
     * @name KEY
     * @memberOf me.input
     */
    obj.KEY = {
        "TAB" : 9,
        "ENTER": 13,
        "SHIFT" : 16,
        "CTRL": 17,
        "ALT": 18,
        "PAUSE": 19,
        "ESC" : 27,
        "SPACE" : 32,
        "LEFT": 37,
        "UP": 38,
        "RIGHT" : 39,
        "DOWN" : 40,
        "NUM0" : 48,
        "NUM1" : 49,
        "NUM2" : 50,
        "NUM3" : 51,
        "NUM4" : 52,
        "NUM5" : 53,
        "NUM6" : 54,
        "NUM7" : 55,
        "NUM8" : 56,
        "NUM9" : 57,
        "A" : 65,
        "B" : 66,
        "C" : 67,
        "D" : 68,
        "E" : 69,
        "F" : 70,
        "G" : 71,
        "H" : 72,
        "I" : 73,
        "J" : 74,
        "K" : 75,
        "L" : 76,
        "M" : 77,
        "N" : 78,
        "O" : 79,
        "P" : 80,
        "Q" : 81,
        "R" : 82,
        "S" : 83,
        "T" : 84,
        "U" : 85,
        "V" : 86,
        "W" : 87,
        "X" : 88,
        "Y" : 89,
        "Z" : 90,
        "MULTIPLY": 106,
        "ADD": 107,
        "SUBSTRACT": 109,
        "DECIMAL": 110,
        "DIVIDE": 111,
        "PLUS": 187,
        "COMMA": 188,
        "MINUS": 189,
        "PERIOD": 190
    };

    /**
     * return the key press status of the specified action
     * @name isKeyPressed
     * @memberOf me.input
     * @public
     * @function
     * @param {String} action user defined corresponding action
     * @return {Boolean} true if pressed
     * @example
     * if (me.input.isKeyPressed('left'))
     * {
     *    //do something
     * }
     * else if (me.input.isKeyPressed('right'))
     * {
     *    //do something else...
     * }
     *
     */
    obj.isKeyPressed = function (action) {
        if (keyStatus[action] && !keyLocked[action]) {
            if (keyLock[action]) {
                keyLocked[action] = true;
            }
            return true;
        }
        return false;
    };

    /**
     * return the key status of the specified action
     * @name keyStatus
     * @memberOf me.input
     * @public
     * @function
     * @param {String} action user defined corresponding action
     * @return {Boolean} down (true) or up(false)
     */
    obj.keyStatus = function (action) {
        return (keyStatus[action] > 0);
    };


    /**
     * trigger the specified key (simulated) event <br>
     * @name triggerKeyEvent
     * @memberOf me.input
     * @public
     * @function
     * @param {me.input#KEY} keycode
     * @param {Boolean} true to trigger a key press, or false for key release
     * @example
     * // trigger a key press
     * me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
     */

    obj.triggerKeyEvent = function (keycode, status) {
        if (status) {
            obj._keydown({}, keycode);
        }
        else {
            obj._keyup({}, keycode);
        }
    };


    /**
     * associate a user defined action to a keycode
     * @name bindKey
     * @memberOf me.input
     * @public
     * @function
     * @param {me.input#KEY} keycode
     * @param {String} action user defined corresponding action
     * @param {Boolean} [lock=false] cancel the keypress event once read
     * @param {Boolean} [preventDefault=me.input.preventDefault] prevent default browser action
     * @example
     * // enable the keyboard
     * me.input.bindKey(me.input.KEY.LEFT,  "left");
     * me.input.bindKey(me.input.KEY.RIGHT, "right");
     * me.input.bindKey(me.input.KEY.X,     "jump", true);
     */
    obj.bindKey = function (keycode, action, lock, preventDefault) {
        // make sure the keyboard is enable
        obj._enableKeyboardEvent();

        if (typeof preventDefault !== "boolean") {
            preventDefault = obj.preventDefault;
        }

        obj._KeyBinding[keycode] = action;
        preventDefaultForKeys[keycode] = preventDefault;

        keyStatus[action] = 0;
        keyLock[action] = lock ? lock : false;
        keyLocked[action] = false;
        keyRefs[action] = {};
    };

    /**
     * unlock a key manually
     * @name unlockKey
     * @memberOf me.input
     * @public
     * @function
     * @param {String} action user defined corresponding action
     * @example
     * // Unlock jump when touching the ground
     * if (!this.falling && !this.jumping) {
     * me.input.unlockKey("jump");
     * }
     */
    obj.unlockKey = function (action) {
        keyLocked[action] = false;
    };

    /**
     * unbind the defined keycode
     * @name unbindKey
     * @memberOf me.input
     * @public
     * @function
     * @param {me.input#KEY} keycode
     * @example
     * me.input.unbindKey(me.input.KEY.LEFT);
     */
    obj.unbindKey = function (keycode) {
        // clear the event status
        var keybinding = obj._KeyBinding[keycode];
        keyStatus[keybinding] = 0;
        keyLock[keybinding] = false;
        keyRefs[keybinding] = {};
        // remove the key binding
        obj._KeyBinding[keycode] = null;
        preventDefaultForKeys[keycode] = null;
    };
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014, Olivier Biot, Jason Oster
 * http://www.melonjs.org/
 *
 */
(function () {
    /**
     * The built in Event Object
     * @external Event
     * @see {@link https://developer.mozilla.org/en/docs/Web/API/Event|Event}
     */

    /**
     * Event normalized X coordinate within the game canvas itself<br>
     * <img src="images/event_coord.png"/>
     * @memberof! external:Event#
     * @name external:Event#gameX
     * @type {Number}
     */

    /**
     * Event normalized Y coordinate within the game canvas itself<br>
     * <img src="images/event_coord.png"/>
     * @memberof! external:Event#
     * @name external:Event#gameY
     * @type {Number}
     */

    /**
     * Event X coordinate relative to the viewport<br>
     * @memberof! external:Event#
     * @name external:Event#gameScreenX
     * @type {Number}
     */

    /**
     * Event Y coordinate relative to the viewport<br>
     * @memberof! external:Event#
     * @name external:Event#gameScreenY
     * @type {Number}
     */

    /**
     * Event X coordinate relative to the map<br>
     * @memberof! external:Event#
     * @name external:Event#gameWorldX
     * @type {Number}
     */

    /**
     * Event Y coordinate relative to the map<br>
     * @memberof! external:Event#
     * @name external:Event#gameWorldY
     * @type {Number}
     */

    /**
     * The unique identifier of the contact for a touch, mouse or pen <br>
     * (This id is also defined on non Pointer Event Compatible platform like pure mouse or iOS-like touch event)
     * @memberof! external:Event#
     * @name external:Event#pointerId
     * @type {Number}
     * @see http://msdn.microsoft.com/en-us/library/windows/apps/hh466123.aspx
     */

    /*
     * PRIVATE STUFF
     */

    // Reference to base class
    var obj = me.input;

    // list of registered Event handlers
    var evtHandlers = {};

    // some useful flags
    var pointerInitialized = false;

    // to keep track of the supported wheel event
    var wheeltype = "mousewheel";

    // Track last event timestamp to prevent firing events out of order
    var lastTimeStamp = 0;

    // "active" list of supported events
    var activeEventList = null;

    // list of standard pointer event type
    var pointerEventList = [
        "mousewheel",
        "pointermove",
        "pointerdown",
        "pointerup",
        "pointercancel",
        undefined,
        undefined
    ];

    // previous MS prefixed pointer event type
    var MSPointerEventList = [
        "mousewheel",
        "MSPointerMove",
        "MSPointerDown",
        "MSPointerUp",
        "MSPointerCancel",
        undefined,
        undefined
    ];

    // legacy mouse event type
    var mouseEventList = [
        "mousewheel",
        "mousemove",
        "mousedown",
        "mouseup",
        undefined,
        undefined,
        undefined
    ];

    // iOS style touch event type
    var touchEventList = [
        undefined,
        "touchmove",
        "touchstart",
        "touchend",
        "touchcancel",
        undefined,
        undefined
    ];

    // internal constants
    //var MOUSE_WHEEL   = 0;
    var POINTER_MOVE    = 1;
    var POINTER_DOWN    = 2;
    var POINTER_UP      = 3;
    var POINTER_CANCEL  = 4;

    /**
     * cache value for the offset of the canvas position within the page
     * @ignore
     */
    var viewportOffset = new me.Vector2d();

    /**
     * Array of object containing changed touch information (iOS event model)
     * @ignore
     */
    var changedTouches = [];

    /**
     * cache value for the offset of the canvas position within the page
     * @ignore
     */
    obj._offset = null;

    /**
     * addEventListerner for the specified event list and callback
     * @ignore
     */
    function registerEventListener(eventList, callback) {
        for (var x = 2; x < eventList.length; ++x) {
            if (typeof(eventList[x]) !== "undefined") {
                me.video.getScreenCanvas().addEventListener(eventList[x], callback, false);
            }
        }
    }

    /**
     * enable pointer event (MSPointer/Mouse/Touch)
     * @ignore
     */
    function enablePointerEvent() {
        if (!pointerInitialized) {
            // initialize mouse pos (0,0)
            changedTouches.push({ x: 0, y: 0 });
            obj.mouse.pos = new me.Vector2d(0, 0);
            // get relative canvas position in the page
            obj._offset = me.video.getPos();
            // Automatically update relative canvas position on scroll
            window.addEventListener("scroll", throttle(100, false,
                function (e) {
                    obj._offset = me.video.getPos();
                    me.event.publish(me.event.WINDOW_ONSCROLL, [ e ]);
                }
            ), false);

            // check standard
            if (navigator.pointerEnabled) {
                activeEventList = pointerEventList;
            }
            else if (navigator.msPointerEnabled) { // check for backward compatibility with the 'MS' prefix
                activeEventList = MSPointerEventList;
            }
            else if (me.device.touch) { //  `touch****` events for iOS/Android devices
                activeEventList = touchEventList;
            }
            else { // Regular Mouse events
                activeEventList = mouseEventList;
            }

            registerEventListener(activeEventList, onPointerEvent);

            // detect wheel event support
            // Modern browsers support "wheel", Webkit and IE support at least "mousewheel
            wheeltype = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
            window.addEventListener(wheeltype, onMouseWheel, false);

            // set the PointerMove/touchMove/MouseMove event
            if (typeof(obj.throttlingInterval) === "undefined") {
                // set the default value
                obj.throttlingInterval = Math.floor(1000 / me.sys.fps);
            }
            // if time interval <= 16, disable the feature
            if (obj.throttlingInterval < 17) {
                me.video.getScreenCanvas().addEventListener(
                    activeEventList[POINTER_MOVE],
                    onMoveEvent,
                    false
                );
            }
            else {
                me.video.getScreenCanvas().addEventListener(
                    activeEventList[POINTER_MOVE],
                    throttle(
                        obj.throttlingInterval,
                        false,
                        function (e) {
                            onMoveEvent(e);
                        }
                    ),
                    false
                );
            }
            pointerInitialized = true;
        }
    }

    /**
     * propagate events to registered objects
     * @ignore
     */
    function dispatchEvent(e) {
        var handled = false;
        var handlers = evtHandlers[e.type];

        // Convert touchcancel -> touchend, and pointercancel -> pointerup
        if (!handlers) {
            if (activeEventList.indexOf(e.type) === POINTER_CANCEL) {
                handlers = evtHandlers[activeEventList[POINTER_UP]];
            } else {
                handlers = evtHandlers[e.type];
            }
        }

        if (handlers) {
            // get the current screen to world offset
            me.game.viewport.localToWorld(0, 0, viewportOffset);
            for (var t = 0, l = changedTouches.length; t < l; t++) {
                // Do not fire older events
                if (typeof(e.timeStamp) !== "undefined") {
                    if (e.timeStamp < lastTimeStamp) {
                        continue;
                    }
                    lastTimeStamp = e.timeStamp;
                }

                // if PointerEvent is not supported
                if (!me.device.pointerEnabled) {
                    // -> define pointerId to simulate the PointerEvent standard
                    e.pointerId = changedTouches[t].id;
                }

                /* Initialize the two coordinate space properties. */
                e.gameScreenX = changedTouches[t].x;
                e.gameScreenY = changedTouches[t].y;
                e.gameWorldX = e.gameScreenX + viewportOffset.x;
                e.gameWorldY = e.gameScreenY + viewportOffset.y;
                // parse all handlers
                for (var i = handlers.length, handler; i--, (handler = handlers[i]);) {
                    /* Set gameX and gameY depending on floating. */
                    if (handler.floating === true) {
                        e.gameX = e.gameScreenX;
                        e.gameY = e.gameScreenY;
                    }
                    else {
                        e.gameX = e.gameWorldX;
                        e.gameY = e.gameWorldY;
                    }
                    // call the defined handler
                    if (handler.bounds.containsPoint(
                            e.gameX - handler.rect.pos.x,
                            e.gameY - handler.rect.pos.y
                        )) {
                        // trigger the corresponding callback
                        if (handler.cb(e) === false) {
                            // stop propagating the event if return false
                            handled = true;
                            break;
                        }
                    }
                }
            }
        }
        return handled;
    }

    /**
     * translate event coordinates
     * @ignore
     */
    function updateCoordFromEvent(event) {
        var local;

        // reset the touch array cache
        changedTouches.length = 0;

        // PointerEvent or standard Mouse event
        if (!event.touches) {
            local = obj.globalToLocal(event.clientX, event.clientY);
            local.id =  event.pointerId || 1;
            changedTouches.push(local);
        }
        // iOS/Android like touch event
        else {
            for (var i = 0, l = event.changedTouches.length; i < l; i++) {
                var t = event.changedTouches[i];
                local = obj.globalToLocal(t.clientX, t.clientY);
                local.id = t.identifier;
                changedTouches.push(local);
            }
        }
        // if event.isPrimary is defined and false, return
        if (event.isPrimary === false) {
            return;
        }
        // Else use the first entry to simulate mouse event
        obj.mouse.pos.set(
            changedTouches[0].x,
            changedTouches[0].y
        );
    }


    /**
     * mouse event management (mousewheel)
     * @ignore
     */
    function onMouseWheel(e) {
        /* jshint expr:true */
        if (e.target === me.video.getScreenCanvas()) {
            // create a (fake) normalized event object
            var _event = {
                deltaMode : 1,
                type : "mousewheel",
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                deltaZ: e.deltaZ
            };
            if (wheeltype === "mousewheel") {
                _event.deltaY = - 1 / 40 * e.wheelDelta;
                // Webkit also support wheelDeltaX
                e.wheelDeltaX && (_event.deltaX = - 1 / 40 * e.wheelDeltaX);
            }
            // dispatch mouse event to registered object
            if (dispatchEvent(_event)) {
                // prevent default action
                return obj._preventDefault(e);
            }
        }
        return true;
    }


    /**
     * mouse/touch/pointer event management (move)
     * @ignore
     */
    function onMoveEvent(e) {
        // update position
        updateCoordFromEvent(e);
        // dispatch mouse event to registered object
        if (dispatchEvent(e)) {
            // prevent default action
            return obj._preventDefault(e);
        }
        return true;
    }

    /**
     * mouse/touch/pointer event management (start/down, end/up)
     * @ignore
     */
    function onPointerEvent(e) {
        // update the pointer position
        updateCoordFromEvent(e);

        // dispatch event to registered objects
        if (dispatchEvent(e)) {
            // prevent default action
            return obj._preventDefault(e);
        }

        // in case of touch event button is undefined
        var button = e.button || 0;
        var keycode = obj.mouse.bind[button];

        // check if mapped to a key
        if (keycode) {
            if (e.type === activeEventList[POINTER_DOWN]) {
                return obj._keydown(e, keycode, button + 1);
            }
            else { // 'mouseup' or 'touchend'
                return obj._keyup(e, keycode, button + 1);
            }
        }

        return true;
    }

    /*
     * PUBLIC STUFF
     */

    /**
     * Mouse information<br>
     * properties : <br>
     * pos (me.Vector2d) : pointer position (in screen coordinates) <br>
     * LEFT : constant for left button <br>
     * MIDDLE : constant for middle button <br>
     * RIGHT : constant for right button <br>
     * @public
     * @enum {Object}
     * @name mouse
     * @memberOf me.input
     */
    obj.mouse = {
        // mouse position
        pos : null,
        // button constants (W3C)
        LEFT:   0,
        MIDDLE: 1,
        RIGHT:  2,
        // bind list for mouse buttons
        bind: [ 0, 0, 0 ]
    };

    /**
     * time interval for event throttling in milliseconds<br>
     * default value : "1000/me.sys.fps" ms<br>
     * set to 0 ms to disable the feature
     * @public
     * @type Number
     * @name throttlingInterval
     * @memberOf me.input
     */
    obj.throttlingInterval = undefined;

    /**
     * Translate the specified x and y values from the global (absolute)
     * coordinate to local (viewport) relative coordinate.
     * @name globalToLocal
     * @memberOf me.input
     * @public
     * @function
     * @param {Number} x the global x coordinate to be translated.
     * @param {Number} y the global y coordinate to be translated.
     * @return {me.Vector2d} A vector object with the corresponding translated coordinates.
     * @example
     * onMouseEvent : function (e) {
     *    // convert the given into local (viewport) relative coordinates
     *    var pos = me.input.globalToLocal(e.clientX, e,clientY);
     *    // do something with pos !
     * };
     */
    obj.globalToLocal = function (x, y) {
        var offset = obj._offset;
        var pixelRatio = me.device.getPixelRatio();
        x -= offset.left;
        y -= offset.top;
        var scale = me.sys.scale;
        if (scale.x !== 1.0 || scale.y !== 1.0) {
            x /= scale.x;
            y /= scale.y;
        }
        return new me.Vector2d(x * pixelRatio, y * pixelRatio);
    };

    /**
     * Associate a pointer event to a keycode<br>
     * Left button – 0
     * Middle button – 1
     * Right button – 2
     * @name bindPointer
     * @memberOf me.input
     * @public
     * @function
     * @param {Number} [button=me.input.mouse.LEFT] (accordingly to W3C values : 0,1,2 for left, middle and right buttons)
     * @param {me.input#KEY} keyCode
     * @example
     * // enable the keyboard
     * me.input.bindKey(me.input.KEY.X, "shoot");
     * // map the left button click on the X key (default if the button is not specified)
     * me.input.bindPointer(me.input.KEY.X);
     * // map the right button click on the X key
     * me.input.bindPointer(me.input.mouse.RIGHT, me.input.KEY.X);
     */
    obj.bindPointer = function () {
        var button = (arguments.length < 2) ? obj.mouse.LEFT : arguments[0];
        var keyCode = (arguments.length < 2) ? arguments[0] : arguments[1];

        // make sure the mouse is initialized
        enablePointerEvent();

        // throw an exception if no action is defined for the specified keycode
        if (!obj._KeyBinding[keyCode]) {
            throw "melonJS : no action defined for keycode " + keyCode;
        }
        // map the mouse button to the keycode
        obj.mouse.bind[button] = keyCode;
    };
    /**
     * unbind the defined keycode
     * @name unbindPointer
     * @memberOf me.input
     * @public
     * @function
     * @param {Number} [button=me.input.mouse.LEFT] (accordingly to W3C values : 0,1,2 for left, middle and right buttons)
     * @example
     * me.input.unbindPointer(me.input.mouse.LEFT);
     */
    obj.unbindPointer = function (button) {
        // clear the event status
        obj.mouse.bind[
            typeof(button) === "undefined" ?
            me.input.mouse.LEFT : button
        ] = null;
    };


    /**
     * allows registration of event listeners on the object target. <br>
     * melonJS defines the additional `gameX` and `gameY` properties when passing the Event object to the defined callback (see below)<br>
     * @see external:Event
     * @see {@link http://www.w3.org/TR/pointerevents/#list-of-pointer-events|W3C Pointer Event list}
     * @name registerPointerEvent
     * @memberOf me.input
     * @public
     * @function
     * @param {String} eventType  The event type for which the object is registering <br>
     * melonJS currently support <b>['pointermove','pointerdown','pointerup','mousewheel']</b>
     * @param {me.Rect} rect object target (or corresponding region defined through me.Rect)
     * @param {Function} callback methods to be called when the event occurs.
     * @param {Boolean} [floating] specify if the object is a floating object
     * (if yes, screen coordinates are used, if not mouse/touch coordinates will
     * be converted to world coordinates)
     * @example
     * // register on the 'pointerdown' event
     * me.input.registerPointerEvent('pointerdown', this, this.pointerDown.bind(this));
     */
    obj.registerPointerEvent = function (eventType, rect, callback, floating) {
        // make sure the mouse/touch events are initialized
        enablePointerEvent();

        if (pointerEventList.indexOf(eventType) === -1) {
            throw "melonJS : invalid event type : " + eventType;
        }

        // convert to supported event type if pointerEvent not natively supported
        if (pointerEventList !== activeEventList) {
            eventType = activeEventList[pointerEventList.indexOf(eventType)];
        }

        // register the event
        if (!evtHandlers[eventType]) {
            evtHandlers[eventType] = [];
        }
        // check if this is a floating object or not
        var _float = rect.floating === true ? true : false;
        // check if there is a given parameter
        if (floating) {
            // ovveride the previous value
            _float = floating === true ? true : false;
        }

        // calculate the given elemments bounding rect
        var bounds = rect.getBounds();
        if (typeof (rect.getShape) === "undefined") {
            bounds.translate(-rect.pos.x, -rect.pos.y);
        }
        // initialize the handler
        evtHandlers[eventType].push({
            rect : rect,
            bounds : bounds,
            cb : callback,
            floating : _float
        });
        return;
    };

    /**
     * allows the removal of event listeners from the object target.
     * @see {@link http://www.w3.org/TR/pointerevents/#list-of-pointer-events|W3C Pointer Event list}
     * @name releasePointerEvent
     * @memberOf me.input
     * @public
     * @function
     * @param {String} eventType  The event type for which the object was registered <br>
     * melonJS currently support <b>['pointermove','pointerdown','pointerup','mousewheel']</b>
     * @param {me.Rect} region object target (or corresponding region defined through me.Rect)
     * @example
     * // release the registered object/region on the 'pointerdown' event
     * me.input.releasePointerEvent('pointerdown', this);
     */
    obj.releasePointerEvent = function (eventType, rect) {
        if (pointerEventList.indexOf(eventType) === -1) {
            throw "melonJS : invalid event type : " + eventType;
        }

        // convert to supported event type if pointerEvent not natively supported
        if (pointerEventList !== activeEventList) {
            eventType = activeEventList[pointerEventList.indexOf(eventType)];
        }

        // unregister the event
        if (!evtHandlers[eventType]) {
            evtHandlers[eventType] = [];
        }
        var handlers = evtHandlers[eventType];
        if (handlers) {
            for (var i = handlers.length, handler; i--, (handler = handlers[i]);) {
                if (handler.rect === rect) {
                    // make sure all references are null
                    handler.rect = handler.bounds = handler.cb = handler.floating = null;
                    evtHandlers[eventType].splice(i, 1);
                }
            }
        }
    };

    /**
     * Will translate global (frequently used) pointer events
     * which should be catched at root level, into minipubsub system events
     * @name _translatePointerEvents
     * @memberOf me.input
     * @private
     * @function
     */
    obj._translatePointerEvents = function () {
        // listen to mouse move (and touch move) events on the viewport
        // and convert them to a system event by default
        obj.registerPointerEvent("pointermove", me.game.viewport, function (e) {
            me.event.publish(me.event.MOUSEMOVE, [e]);
            return false;
        });
    };
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * Base64 decoding
     * @see <a href="http://www.webtoolkit.info/">http://www.webtoolkit.info/</A>
     * @ignore
     */
    var Base64 = (function () {
        // hold public stuff in our singleton
        var singleton = {};

        // private property
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for decoding
        singleton.decode = function (input) {

            // make sure our input string has the right format
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            if (me.device.nativeBase64) {
                // use native decoder
                return window.atob(input);
            }
            else {
                // use cross-browser decoding
                var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

                while (i < input.length) {
                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output.push(String.fromCharCode(chr1));

                    if (enc3 !== 64) {
                        output.push(String.fromCharCode(chr2));
                    }
                    if (enc4 !== 64) {
                        output.push(String.fromCharCode(chr3));
                    }
                }

                output = output.join("");
                return output;
            }
        };

        return singleton;

    })();

    /**
     * a collection of utility functions<br>
     * there is no constructor function for me.utils
     * @namespace me.utils
     * @memberOf me
     */
    me.utils = (function () {
        // hold public stuff in our singleton
        var api = {};

        /*
         * PRIVATE STUFF
         */

        // guid default value
        var GUID_base  = "";
        var GUID_index = 0;

        // regexp to deal with file name & path
        var removepath = /^.*(\\|\/|\:)/;
        var removeext = /\.[^\.]*$/;

        /*
         * PUBLIC STUFF
         */

        /**
         * Decode a base64 encoded string into a binary string
         * @public
         * @function
         * @memberOf me.utils
         * @name decodeBase64
         * @param {String} input Base64 encoded data
         * @return {String} Binary string
         */
        api.decodeBase64 = function (input) {
            return Base64.decode(input);
        };

        /**
         * Decode a base64 encoded string into a byte array
         * @public
         * @function
         * @memberOf me.utils
         * @name decodeBase64AsArray
         * @param {String} input Base64 encoded data
         * @param {Number} [bytes] number of bytes per array entry
         * @return {Number[]} Array of bytes
         */
        api.decodeBase64AsArray = function (input, bytes) {
            bytes = bytes || 1;

            var dec = Base64.decode(input), i, j, len;

            // use a typed array if supported
            var ar;
            if (typeof window.Uint32Array === "function") {
                ar = new Uint32Array(dec.length / bytes);
            }
            else {
                ar = [];
            }

            for (i = 0, len = dec.length / bytes; i < len; i++) {
                ar[i] = 0;
                for (j = bytes - 1; j >= 0; --j) {
                    ar[i] += dec.charCodeAt((i * bytes) + j) << (j << 3);
                }
            }
            return ar;
        };

        /**
         * decompress zlib/gzip data (NOT IMPLEMENTED)
         * @public
         * @function
         * @memberOf me.utils
         * @name decompress
         * @param  {Number[]} data Array of bytes
         * @param  {String} format compressed data format ("gzip","zlib")
         * @return {Number[]} Array of bytes
         */
        api.decompress = function () {
            throw "melonJS: GZIP/ZLIB compressed TMX Tile Map not supported!";
        };

        /**
         * Decode a CSV encoded array into a binary array
         * @public
         * @function
         * @memberOf me.utils
         * @name decodeCSV
         * @param  {String} input CSV formatted data
         * @param  {Number} limit row split limit
         * @return {Number[]} Int Array
         */
        api.decodeCSV = function (input, limit) {
            input = input.trim().split("\n");

            var result = [];
            for (var i = 0; i < input.length; i++) {
                var entries = input[i].split(",", limit);
                for (var e = 0; e < entries.length; e++) {
                    result.push(+entries[e]);
                }
            }
            return result;
        };

        /**
         * return the base name of the file without path info.<br>
         * @public
         * @function
         * @memberOf me.utils
         * @name getBasename
         * @param  {String} path path containing the filename
         * @return {String} the base name without path information.
         */
        api.getBasename = function (path) {
            return path.replace(removepath, "").replace(removeext, "");
        };

        /**
         * return the extension of the file in the given path <br>
         * @public
         * @function
         * @memberOf me.utils
         * @name getFileExtension
         * @param  {String} path path containing the filename
         * @return {String} filename extension.
         */
        api.getFileExtension = function (path) {
            return path.substring(path.lastIndexOf(".") + 1, path.length);
        };

        /**
         * Get image pixels
         * @public
         * @function
         * @memberOf me.utils
         * @name getPixels
         * @param {Image|Canvas} image Image to read
         * @return {ImageData} Canvas ImageData object
         */
        api.getPixels = function (arg) {
            if (arg instanceof HTMLImageElement) {
                var _context = me.video.getContext2d(
                    me.video.createCanvas(arg.width, arg.height)
                );
                _context.drawImage(arg, 0, 0);
                return _context.getImageData(0, 0, arg.width, arg.height);
            }
            else {
                // canvas !
                return arg.getContext("2d").getImageData(0, 0, arg.width, arg.height);
            }
        };

        /**
         * reset the GUID Base Name
         * the idea here being to have a unique ID
         * per level / object
         * @ignore
         */
        api.resetGUID = function (base) {
            // also ensure it's only 8bit ASCII characters
            GUID_base  = base.toString().toUpperCase().toHex();
            GUID_index = 0;
        };

        /**
         * create and return a very simple GUID
         * Game Unique ID
         * @ignore
         */
        api.createGUID = function () {
            return GUID_base + "-" + (GUID_index++);
        };

        /**
         * apply friction to a force
         * @ignore
         * @TODO Move this somewhere else
         */
        api.applyFriction = function (v, f) {
            return (
                (v + f < 0) ? v + (f * me.timer.tick) :
                (v - f > 0) ? v - (f * me.timer.tick) : 0
            );
        };

        // return our object
        return api;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier Biot, Jason Oster
 * http://www.melonjs.org
 */
(function () {
    var cssToRGB = {
        // CSS1
        "black"                 : [   0,   0,   0 ],
        "silver"                : [ 192, 192, 129 ],
        "gray"                  : [ 128, 128, 128 ],
        "white"                 : [ 255, 255, 255 ],
        "maroon"                : [ 128,   0,   0 ],
        "red"                   : [ 255,   0,   0 ],
        "purple"                : [ 128,   0, 128 ],
        "fuchsia"               : [ 255,   0, 255 ],
        "green"                 : [   0, 128,   0 ],
        "lime"                  : [   0, 255,   0 ],
        "olive"                 : [ 128, 128,   0 ],
        "yellow"                : [ 255, 255,   0 ],
        "navy"                  : [   0,   0, 128 ],
        "blue"                  : [   0,   0, 255 ],
        "teal"                  : [   0, 128, 128 ],
        "aqua"                  : [   0, 255, 255 ],

        // CSS2
        "orange"                : [ 255, 165,   0 ],

        // CSS3
        "aliceblue"             : [ 240, 248, 245 ],
        "antiquewhite"          : [ 250, 235, 215 ],
        "aquamarine"            : [ 127, 255, 212 ],
        "azure"                 : [ 240, 255, 255 ],
        "beige"                 : [ 245, 245, 220 ],
        "bisque"                : [ 255, 228, 196 ],
        "blanchedalmond"        : [ 255, 235, 205 ],
        "blueviolet"            : [ 138,  43, 226 ],
        "brown"                 : [ 165,  42,  42 ],
        "burlywood"             : [ 222, 184,  35 ],
        "cadetblue"             : [  95, 158, 160 ],
        "chartreuse"            : [ 127, 255,   0 ],
        "chocolate"             : [ 210, 105,  30 ],
        "coral"                 : [ 255, 127,  80 ],
        "cornflowerblue"        : [ 100, 149, 237 ],
        "cornsilk"              : [ 255, 248, 220 ],
        "crimson"               : [ 220,  20,  60 ],
        "darkblue"              : [   0,   0, 139 ],
        "darkcyan"              : [   0, 139, 139 ],
        "darkgoldenrod"         : [ 184, 134,  11 ],
        "darkgray[*]"           : [ 169, 169, 169 ],
        "darkgreen"             : [   0, 100,   0 ],
        "darkgrey[*]"           : [ 169, 169, 169 ],
        "darkkhaki"             : [ 189, 183, 107 ],
        "darkmagenta"           : [ 139,   0, 139 ],
        "darkolivegreen"        : [  85, 107,  47 ],
        "darkorange"            : [ 255, 140,   0 ],
        "darkorchid"            : [ 153,  50, 204 ],
        "darkred"               : [ 139,   0,   0 ],
        "darksalmon"            : [ 233, 150, 122 ],
        "darkseagreen"          : [ 143, 188, 143 ],
        "darkslateblue"         : [  72,  61, 139 ],
        "darkslategray"         : [  47,  79,  79 ],
        "darkslategrey"         : [  47,  79,  79 ],
        "darkturquoise"         : [   0, 206, 209 ],
        "darkviolet"            : [ 148,   0, 211 ],
        "deeppink"              : [ 255,  20, 147 ],
        "deepskyblue"           : [   0, 191, 255 ],
        "dimgray"               : [ 105, 105, 105 ],
        "dimgrey"               : [ 105, 105, 105 ],
        "dodgerblue"            : [  30, 144, 255 ],
        "firebrick"             : [ 178,  34,  34 ],
        "floralwhite"           : [ 255, 250, 240 ],
        "forestgreen"           : [  34, 139,  34 ],
        "gainsboro"             : [ 220, 220, 220 ],
        "ghostwhite"            : [ 248, 248, 255 ],
        "gold"                  : [ 255, 215,   0 ],
        "goldenrod"             : [ 218, 165,  32 ],
        "greenyellow"           : [ 173, 255,  47 ],
        "grey"                  : [ 128, 128, 128 ],
        "honeydew"              : [ 240, 255, 240 ],
        "hotpink"               : [ 255, 105, 180 ],
        "indianred"             : [ 205,  92,  92 ],
        "indigo"                : [  75,   0, 130 ],
        "ivory"                 : [ 255, 255, 240 ],
        "khaki"                 : [ 240, 230, 140 ],
        "lavender"              : [ 230, 230, 250 ],
        "lavenderblush"         : [ 255, 240, 245 ],
        "lawngreen"             : [ 124, 252,   0 ],
        "lemonchiffon"          : [ 255, 250, 205 ],
        "lightblue"             : [ 173, 216, 230 ],
        "lightcoral"            : [ 240, 128, 128 ],
        "lightcyan"             : [ 224, 255, 255 ],
        "lightgoldenrodyellow"  : [ 250, 250, 210 ],
        "lightgray"             : [ 211, 211, 211 ],
        "lightgreen"            : [ 144, 238, 144 ],
        "lightgrey"             : [ 211, 211, 211 ],
        "lightpink"             : [ 255, 182, 193 ],
        "lightsalmon"           : [ 255, 160, 122 ],
        "lightseagreen"         : [  32, 178, 170 ],
        "lightskyblue"          : [ 135, 206, 250 ],
        "lightslategray"        : [ 119, 136, 153 ],
        "lightslategrey"        : [ 119, 136, 153 ],
        "lightsteelblue"        : [ 176, 196, 222 ],
        "lightyellow"           : [ 255, 255, 224 ],
        "limegreen"             : [  50, 205,  50 ],
        "linen"                 : [ 250, 240, 230 ],
        "mediumaquamarine"      : [ 102, 205, 170 ],
        "mediumblue"            : [   0,   0, 205 ],
        "mediumorchid"          : [ 186,  85, 211 ],
        "mediumpurple"          : [ 147, 112, 219 ],
        "mediumseagreen"        : [  60, 179, 113 ],
        "mediumslateblue"       : [ 123, 104, 238 ],
        "mediumspringgreen"     : [   0, 250, 154 ],
        "mediumturquoise"       : [  72, 209, 204 ],
        "mediumvioletred"       : [ 199,  21, 133 ],
        "midnightblue"          : [  25,  25, 112 ],
        "mintcream"             : [ 245, 255, 250 ],
        "mistyrose"             : [ 255, 228, 225 ],
        "moccasin"              : [ 255, 228, 181 ],
        "navajowhite"           : [ 255, 222, 173 ],
        "oldlace"               : [ 253, 245, 230 ],
        "olivedrab"             : [ 107, 142,  35 ],
        "orangered"             : [ 255,  69,   0 ],
        "orchid"                : [ 218, 112, 214 ],
        "palegoldenrod"         : [ 238, 232, 170 ],
        "palegreen"             : [ 152, 251, 152 ],
        "paleturquoise"         : [ 175, 238, 238 ],
        "palevioletred"         : [ 219, 112, 147 ],
        "papayawhip"            : [ 255, 239, 213 ],
        "peachpuff"             : [ 255, 218, 185 ],
        "peru"                  : [ 205, 133,  63 ],
        "pink"                  : [ 255, 192, 203 ],
        "plum"                  : [ 221, 160, 221 ],
        "powderblue"            : [ 176, 224, 230 ],
        "rosybrown"             : [ 188, 143, 143 ],
        "royalblue"             : [  65, 105, 225 ],
        "saddlebrown"           : [ 139,  69,  19 ],
        "salmon"                : [ 250, 128, 114 ],
        "sandybrown"            : [ 244, 164,  96 ],
        "seagreen"              : [  46, 139,  87 ],
        "seashell"              : [ 255, 245, 238 ],
        "sienna"                : [ 160,  82,  45 ],
        "skyblue"               : [ 135, 206, 235 ],
        "slateblue"             : [ 106,  90, 205 ],
        "slategray"             : [ 112, 128, 144 ],
        "slategrey"             : [ 112, 128, 144 ],
        "snow"                  : [ 255, 250, 250 ],
        "springgreen"           : [   0, 255, 127 ],
        "steelblue"             : [  70, 130, 180 ],
        "tan"                   : [ 210, 180, 140 ],
        "thistle"               : [ 216, 191, 216 ],
        "tomato"                : [ 255,  99,  71 ],
        "turquoise"             : [  64, 224, 208 ],
        "violet"                : [ 238, 130, 238 ],
        "wheat"                 : [ 245, 222, 179 ],
        "whitesmoke"            : [ 245, 245, 245 ],
        "yellowgreen"           : [ 154, 205,  50 ]
    };

    /**
     * A color manipulation object.
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     * @param {Number} [r=0] red component
     * @param {Number} [g=0] green component
     * @param {Number} [b=0] blue component
     * @param {Number} [a=1.0] alpha value
     */
    me.Color = Object.extend(
    /** @scope me.Color.prototype */
    {

        /**
         * Color Red Component
         * @name r
         * @memberOf me.Color
         * @type {Number}
         * @readonly
         */
        r : 0,

        /**
         * Color Green Component
         * @name g
         * @memberOf me.Color
         * @type {Number}
         * @readonly
         */
        g : 0,

        /**
         * Color Blue Component
         * @name b
         * @memberOf me.Color
         * @type {Number}
         * @readonly
         */
        b : 0,

        /**
         * Color alpha Component
         * @name alpha
         * @memberOf me.Color
         * @type {Number}
         * @readonly
         */
        alpha : 1.0,

        /** @ignore */
        init : function (r, g, b, a) {
            return this.onResetEvent(r, g, b, a);
        },

        /**
         * @ignore
         */
        onResetEvent : function (r, g, b, a) {
            return this.setColor(r, g, b, a);
        },

        /**
         * Set this color to the specified value.
         * @name setColor
         * @memberOf me.Color
         * @function
         * @param {Number} r red component
         * @param {Number} g green component
         * @param {Number} b blue component
         * @param {Number} [a=1.0] alpha value
         * @return {me.Color} Reference to this object for method chaining
         */
        setColor : function (r, g, b, a) {
            this.r = Math.floor(r || 0).clamp(0, 255);
            this.g = Math.floor(g || 0).clamp(0, 255);
            this.b = Math.floor(b || 0).clamp(0, 255);
            this.alpha = typeof(a) === "undefined" ? 1.0 : a.clamp(0, 1);

            return this;
        },

        /**
         * Create a new copy of this color object.
         * @name clone
         * @memberOf me.Color
         * @function
         * @return {me.Color} Reference to the newly cloned object
         */
        clone : function () {
            return me.pool.pull("me.Color", this.r, this.g, this.b, this.alpha);
        },

        /**
         * Blend this color with the given one using addition.
         * @name add
         * @memberOf me.Color
         * @function
         * @param {me.Color} color
         * @return {me.Color} Reference to this object for method chaining
         */
        add : function (color) {
            return this.setColor(
                this.r + color.r,
                this.g + color.g,
                this.b + color.b,
                (this.alpha + color.alpha) / 2
            );
        },

        /**
         * Darken this color value by 0..1
         * @name darken
         * @memberOf me.Color
         * @function
         * @param {Number} scale
         * @return {me.Color} Reference to this object for method chaining
         */
        darken : function (scale) {
            scale = scale.clamp(0, 1);
            return this.setColor(
                this.r * scale,
                this.g * scale,
                this.b * scale,
                this.alpha
            );
        },

        /**
         * Lighten this color value by 0..1
         * @name lighten
         * @memberOf me.Color
         * @function
         * @param {Number} scale
         * @return {me.Color} Reference to this object for method chaining
         */
        lighten : function (scale) {
            scale = scale.clamp(0, 1);
            return this.setColor(
                this.r + (255 - this.r) * scale,
                this.g + (255 - this.g) * scale,
                this.b + (255 - this.b) * scale,
                this.alpha
            );
        },

        /**
         * Generate random r,g,b values for this color object
         * @name random
         * @memberOf me.Color
         * @function
         * @return {me.Color} Reference to this object for method chaining
         */
        random : function () {
            return this.setColor(
                Math.random() * 256,
                Math.random() * 256,
                Math.random() * 256,
                this.alpha
            );
        },

        /**
         * Return true if the r,g,b,a values of this color are equal with the
         * given one.
         * @name equals
         * @memberOf me.Color
         * @function
         * @param {me.Color} color
         * @return {Boolean}
         */
        equals : function (color) {
            return (
                (this.r === color.r) &&
                (this.g === color.g) &&
                (this.b === color.b) &&
                (this.alpha === color.alpha)
            );
        },

        /**
         * Parse a CSS color string and set this color to the corresponding
         * r,g,b values
         * @name parseCSS
         * @memberOf me.Color
         * @function
         * @param {String} color
         * @return {me.Color} Reference to this object for method chaining
         */
        parseCSS : function (cssColor) {
            // TODO : Memoize this function by caching its input

            if (!(cssColor in cssToRGB)) {
                return this.parseRGB(cssColor);
            }

            return this.setColor.apply(this, cssToRGB[cssColor]);
        },

        /**
         * Parse an RGB or RGBA CSS color string
         * @name parseRGB
         * @memberOf me.Color
         * @function
         * @param {String} color
         * @return {me.Color} Reference to this object for method chaining
         */
        parseRGB : function (rgbColor) {
            // TODO : Memoize this function by caching its input

            var start;
            if (rgbColor.substring(0, 4) === "rgba") {
                start = 5;
            }
            else if (rgbColor.substring(0, 3) === "rgb") {
                start = 4;
            }
            else {
                return this.parseHex(rgbColor);
            }

            var color = rgbColor.slice(start, -1).split(/\s*,\s*/);
            return this.setColor.apply(this, color);
        },

        /**
         * Parse a Hex color ("#RGB" or "#RRGGBB" format) and set this color to
         * the corresponding r,g,b values
         * @name parseHex
         * @memberOf me.Color
         * @function
         * @param {String} color
         * @return {me.Color} Reference to this object for method chaining
         */
        parseHex : function (hexColor) {
            // TODO : Memoize this function by caching its input

            // Remove the # if present
            if (hexColor.charAt(0) === "#") {
                hexColor = hexColor.substring(1, hexColor.length);
            }

            var r, g, b;

            if (hexColor.length < 6)  {
                // 3 char shortcut is used, double each char
                r = parseInt(hexColor.charAt(0) + hexColor.charAt(0), 16);
                g = parseInt(hexColor.charAt(1) + hexColor.charAt(1), 16);
                b = parseInt(hexColor.charAt(2) + hexColor.charAt(2), 16);
            }
            else {
                r = parseInt(hexColor.substring(0, 2), 16);
                g = parseInt(hexColor.substring(2, 4), 16);
                b = parseInt(hexColor.substring(4, 6), 16);
            }

            return this.setColor(r, g, b);
        },

        /**
         * Get the color in "#RRGGBB" format
         * @name toHex
         * @memberOf me.Color
         * @function
         * @return {String}
         */
        toHex : function () {
            // TODO : Memoize this function by caching its result until any of
            // the r,g,b,a values are changed

            return "#" + this.r.toHex() + this.g.toHex() + this.b.toHex();
        },

        /**
         * Get the color in "rgb(R,G,B)" format
         * @name toRGB
         * @memberOf me.Color
         * @function
         * @return {String}
         */
        toRGB : function () {
            // TODO : Memoize this function by caching its result until any of
            // the r,g,b,a values are changed

            return "rgb(" +
                this.r + "," +
                this.g + "," +
                this.b +
            ")";
        },

        /**
         * Get the color in "rgba(R,G,B,A)" format
         * @name toRGBA
         * @memberOf me.Color
         * @function
         * @return {String}
         */
        toRGBA : function () {
            // TODO : Memoize this function by caching its result until any of
            // the r,g,b,a values are changed

            return "rgba(" +
                this.r + "," +
                this.g + "," +
                this.b + "," +
                this.alpha +
            ")";
        }

    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013 melonJS
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * A singleton object to access the device localStorage area
     * @example
     * // Initialize "score" and "lives" with default values
     * me.save.add({ score : 0, lives : 3 });
     *
     * // Save score
     * me.save.score = 31337;
     *
     * // Load lives
     * console.log(me.save.lives);
     *
     * // Also supports complex objects thanks to JSON backend
     * me.save.complexObject = { a : "b", c : [ 1, 2, 3, "d" ], e : { f : [{}] } };
     * // DO NOT set any child properties of me.save.complexObject directly!
     * // Changes made that way will not save. Always set the entire object value at once.
     *
     * // Print all
     * console.log(JSON.stringify(me.save));
     *
     * // Remove "score" from localStorage
     * me.save.remove('score');
     * @namespace me.save
     * @memberOf me
     */
    me.save = (function () {
        // Variable to hold the object data
        var data = {};

        // a function to check if the given key is a reserved word
        function isReserved(key) {
            return (key === "add" || key === "remove");
        }

        // Public API
        var api = {
            /**
             * @ignore
             */
            _init: function () {
                // Load previous data if local Storage is supported
                if (me.device.localStorage === true) {
                    var keys = JSON.parse(localStorage.getItem("me.save")) || [];
                    keys.forEach(function (key) {
                        data[key] = JSON.parse(localStorage.getItem("me.save." + key));
                    });
                }
            },

            /**
             * Add new keys to localStorage and set them to the given default values if they do not exist
             * @name add
             * @memberOf me.save
             * @function
             * @param {Object} props key and corresponding values
             * @example
             * // Initialize "score" and "lives" with default values
             * me.save.add({ score : 0, lives : 3 });
             */
            add : function (props) {
                Object.keys(props).forEach(function (key) {
                    if (isReserved(key)) {
                        return;
                    }

                    (function (prop) {
                        Object.defineProperty(api, prop, {
                            configurable : true,
                            enumerable : true,
                            get : function () {
                                return data[prop];
                            },
                            set : function (value) {
                                data[prop] = value;
                                if (me.device.localStorage === true) {
                                    localStorage.setItem("me.save." + prop, JSON.stringify(value));
                                }
                            }
                        });
                    })(key);

                    // Set default value for key
                    if (!(key in data)) {
                        api[key] = props[key];
                    }
                });

                // Save keys
                if (me.device.localStorage === true) {
                    localStorage.setItem("me.save", JSON.stringify(Object.keys(data)));
                }
            },

            /**
             * Remove a key from localStorage
             * @name remove
             * @memberOf me.save
             * @function
             * @param {String} key key to be removed
             * @example
             * // Remove the "score" key from localStorage
             * me.save.remove("score");
             */
            remove : function (key) {
                if (!isReserved(key)) {
                    if (typeof data[key] !== "undefined") {
                        delete data[key];
                        if (me.device.localStorage === true) {
                            localStorage.removeItem("me.save." + key);
                            localStorage.setItem("me.save", JSON.stringify(Object.keys(data)));
                        }
                    }
                }
            }
        };

        return api;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/
 *
 */
(function () {
    // some custom constants
    me.COLLISION_LAYER             = "collision";
    // some TMX constants
    me.TMX_TAG_MAP                 = "map";
    me.TMX_TAG_NAME                = "name";
    me.TMX_TAG_VALUE               = "value";
    me.TMX_TAG_VERSION             = "version";
    me.TMX_TAG_ORIENTATION         = "orientation";
    me.TMX_TAG_WIDTH               = "width";
    me.TMX_TAG_HEIGHT              = "height";
    me.TMX_TAG_TYPE                = "type";
    me.TMX_TAG_OPACITY             = "opacity";
    me.TMX_TAG_TRANS               = "trans";
    me.TMX_TAG_TILEWIDTH           = "tilewidth";
    me.TMX_TAG_TILEHEIGHT          = "tileheight";
    me.TMX_TAG_TILEOFFSET          = "tileoffset";
    me.TMX_TAG_FIRSTGID            = "firstgid";
    me.TMX_TAG_GID                 = "gid";
    me.TMX_TAG_TILE                = "tile";
    me.TMX_TAG_ID                  = "id";
    me.TMX_TAG_DATA                = "data";
    me.TMX_TAG_COMPRESSION         = "compression";
    me.TMX_TAG_GZIP                = "gzip";
    me.TMX_TAG_ZLIB                = "zlib";
    me.TMX_TAG_ENCODING            = "encoding";
    me.TMX_TAG_ATTR_BASE64         = "base64";
    me.TMX_TAG_CSV                 = "csv";
    me.TMX_TAG_SPACING             = "spacing";
    me.TMX_TAG_MARGIN              = "margin";
    me.TMX_TAG_PROPERTIES          = "properties";
    me.TMX_TAG_PROPERTY            = "property";
    me.TMX_TAG_IMAGE               = "image";
    me.TMX_TAG_SOURCE              = "source";
    me.TMX_TAG_VISIBLE             = "visible";
    me.TMX_TAG_TILESET             = "tileset";
    me.TMX_TAG_LAYER               = "layer";
    me.TMX_TAG_TILE_LAYER          = "tilelayer";
    me.TMX_TAG_IMAGE_LAYER         = "imagelayer";
    me.TMX_TAG_OBJECTGROUP         = "objectgroup";
    me.TMX_TAG_OBJECT              = "object";
    me.TMX_TAG_X                   = "x";
    me.TMX_TAG_Y                   = "y";
    me.TMX_TAG_WIDTH               = "width";
    me.TMX_TAG_HEIGHT              = "height";
    me.TMX_TAG_POLYGON             = "polygon";
    me.TMX_TAG_POLYLINE            = "polyline";
    me.TMX_TAG_ELLIPSE             = "ellipse";
    me.TMX_TAG_POINTS              = "points";
    me.TMX_BACKGROUND_COLOR        = "backgroundcolor";
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/
 *
 */
(function () {
    /**
     * a collection of TMX utility Function
     * @final
     * @memberOf me
     * @ignore
     */
    me.TMXUtils = (function () {
        /*
         * PUBLIC
         */

        // hold public stuff in our singleton
        var api = {};

        /**
         * set and interpret a TMX property value
         * @ignore
         */
        function setTMXValue(value) {
            //console.log(value);
            if (!value || value.isBoolean()) {
                // if value not defined or boolean
                value = value ? (value === "true") : true;
            }
            else if (value.isNumeric()) {
                // check if numeric
                value = Number(value);
            }
            else if (value.match(/^json:/i)) {
                // try to parse it
                var match = value.split(/^json:/i)[1];
                try {
                    value = JSON.parse(match);
                }
                catch (e) {
                    throw "Unable to parse JSON: " + match;
                }
            }
            // return the interpreted value
            return value;
        }

        var parseAttributes = function (obj, elt) {
            // do attributes
            if (elt.attributes && elt.attributes.length > 0) {
                for (var j = 0; j < elt.attributes.length; j++) {
                    var attribute = elt.attributes.item(j);
                    if (typeof(attribute.name) !== "undefined") {
                        // DOM4 (Attr no longer inherit from Node)
                        obj[attribute.name] = setTMXValue(attribute.value);
                    } else {
                        // else use the deprecated ones
                        obj[attribute.nodeName] = setTMXValue(attribute.nodeValue);
                    }
                }
            }
        };

        /**
         * Parse a XML TMX object and returns the corresponding javascript object
         * @ignore
         */
        api.parse = function (xml, draworder) {
            // Create the return object
            var obj = {};

            // temporary cache value for concatenated #text element
            var cacheValue = "";

            // make sure draworder is defined
            // note: `draworder` is a new object property in next coming version of Tiled
            draworder = draworder || 1;

            if (xml.nodeType === 1) {
                // do attributes
                parseAttributes(obj, xml);
            }

            // do children
            if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;

                    if (typeof(obj[nodeName]) === "undefined") {
                        if (item.nodeType === 3) {
                            /* nodeType is "Text"  */
                            var value = item.nodeValue.trim();
                            if (value && value.length > 0) {
                                cacheValue += value;
                            }
                        }
                        else if (item.nodeType === 1) {
                            /* nodeType is "Element" */
                            obj[nodeName] =  me.TMXUtils.parse(item, draworder);
                            obj[nodeName]._draworder = draworder++;
                        }
                    }
                    else {
                        if (Array.isArray(obj[nodeName]) === false) {
                            obj[nodeName] = [obj[nodeName]];
                        }
                        obj[nodeName].push(me.TMXUtils.parse(item, draworder));
                        obj[nodeName][obj[nodeName].length - 1]._draworder = draworder++;
                    }
                }
                // set concatenated string value
                // cheap hack that will only probably work with the TMX format
                if (cacheValue.length > 0) {
                    obj.value = cacheValue;
                    cacheValue = "";
                }
            }
            return obj;
        };

        /**
         * Apply TMX Properties to the given object
         * @ignore
         */
        api.applyTMXProperties = function (obj, data) {
            var properties = data[me.TMX_TAG_PROPERTIES];
            if (typeof(properties) !== "undefined") {
                if (typeof(properties.property) !== "undefined") {
                    // XML converted format
                    var property = properties.property;
                    if (Array.isArray(property) === true) {
                        property.forEach(function (prop) {
                            // value are already converted in this case
                            obj[prop.name] = prop.value;
                        });
                    }
                    else {
                        // value are already converted in this case
                        obj[property.name] = property.value;
                    }
                }
                else {
                    // native json format
                    for (var name in properties) {
                        if (properties.hasOwnProperty(name)) {
                            // set the value
                            obj[name] = setTMXValue(properties[name]);
                        }
                    }
                }
            }
        };

        // return our object
        return api;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/
 *
 */
(function () {
    /**
     * TMX Object Group <br>
     * contains the object group definition as defined in Tiled. <br>
     * note : object group definition is translated into the virtual `me.game.world` using `me.ObjectContainer`.
     * @see me.ObjectContainer
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     */
    me.TMXObjectGroup = Object.extend({
        /**
         * group name
         * @public
         * @type String
         * @name name
         * @memberOf me.TMXObjectGroup
         */
        name : null,

        /**
         * group width
         * @public
         * @type Number
         * @name name
         * @memberOf me.TMXObjectGroup
         */
        width : 0,

        /**
         * group height
         * @public
         * @type Number
         * @name name
         * @memberOf me.TMXObjectGroup
         */
        height : 0,

        /**
         * group z order
         * @public
         * @type Number
         * @name name
         * @memberOf me.TMXObjectGroup
         */
        z : 0,

        /**
         * group objects list definition
         * @see me.TMXObject
         * @public
         * @type Array
         * @name name
         * @memberOf me.TMXObjectGroup
         */
        objects : [],

        /**
         * constructor
         * @ignore
         * @function
         */
        init : function (name, tmxObjGroup, tilesets, z) {
            var self = this;

            this.name    = name;
            this.width   = tmxObjGroup[me.TMX_TAG_WIDTH];
            this.height  = tmxObjGroup[me.TMX_TAG_HEIGHT];
            this.z       = z;
            this.objects = [];

            var visible = typeof(tmxObjGroup[me.TMX_TAG_VISIBLE]) !== "undefined" ? tmxObjGroup[me.TMX_TAG_VISIBLE] : true;

            this.opacity = (visible === true) ? parseFloat(tmxObjGroup[me.TMX_TAG_OPACITY] || 1.0).clamp(0.0, 1.0) : 0;

            // check if we have any user-defined properties
            me.TMXUtils.applyTMXProperties(this, tmxObjGroup);

            // parse all objects
            // (under `objects` for XML converted map, under `object` for native json map)
            var _objects = tmxObjGroup.objects || tmxObjGroup.object;
            if (Array.isArray(_objects) === true) {
                // JSON native format
                _objects.forEach(function (tmxObj) {
                    self.objects.push(new me.TMXObject(tmxObj, tilesets, z));
                });
            } else {
                self.objects.push(new me.TMXObject(_objects, tilesets, z));
            }
        },

        /**
         * reset function
         * @ignore
         * @function
         */
        destroy : function () {
            // clear all allocated objects
            this.objects = null;
        },

        /**
         * return the object count
         * @ignore
         * @function
         */
        getObjectCount : function () {
            return this.objects.length;
        },

        /**
         * returns the object at the specified index
         * @ignore
         * @function
         */
        getObjectByIndex : function (idx) {
            return this.objects[idx];
        }
    });

    /**
     * a TMX Object defintion, as defined in Tiled. <br>
     * note : object definition are translated into the virtual `me.game.world` using `me.ObjectEntity`.
     * @see me.ObjectEntity
     * @class
     * @extends Object
     * @memberOf me
     * @constructor
     */
    me.TMXObject = Object.extend({
        /**
         * object name
         * @public
         * @type String
         * @name name
         * @memberOf me.TMXObject
         */
        name : null,

        /**
         * object x position
         * @public
         * @type Number
         * @name x
         * @memberOf me.TMXObject
         */
        x : 0,

        /**
         * object y position
         * @public
         * @type Number
         * @name y
         * @memberOf me.TMXObject
         */
        y : 0,

        /**
         * object width
         * @public
         * @type Number
         * @name width
         * @memberOf me.TMXObject
         */
        width : 0,

        /**
         * object height
         * @public
         * @type Number
         * @name height
         * @memberOf me.TMXObject
         */
        height : 0,

        /**
         * object z order
         * @public
         * @type Number
         * @name z
         * @memberOf me.TMXObject
         */
        z : 0,

        /**
         * object gid value
         * when defined the object is a tiled object
         * @public
         * @type Number
         * @name gid
         * @memberOf me.TMXObject
         */
        gid : undefined,

        /**
         * object type
         * @public
         * @type String
         * @name type
         * @memberOf me.TMXObject
         */
        type : undefined,

        /**
         * if true, the object is a polygone
         * @public
         * @type Boolean
         * @name isPolygon
         * @memberOf me.TMXObject
         */
        isPolygon : false,

        /**
         * f true, the object is a polygone
         * @public
         * @type Boolean
         * @name isPolyline
         * @memberOf me.TMXObject
         */
        isPolyline : false,

        /**
         * object point list (for polygone and polyline)
         * @public
         * @type Vector2d[]
         * @name points
         * @memberOf me.TMXObject
         */
        points : undefined,

        /**
         * constructor
         * @ignore
         * @function
         */
        init : function (tmxObj, tilesets, z) {
            this.name = tmxObj[me.TMX_TAG_NAME];
            this.x = parseInt(tmxObj[me.TMX_TAG_X], 10);
            this.y = parseInt(tmxObj[me.TMX_TAG_Y], 10);
            this.z = parseInt(z, 10);

            this.width = parseInt(tmxObj[me.TMX_TAG_WIDTH] || 0, 10);
            this.height = parseInt(tmxObj[me.TMX_TAG_HEIGHT] || 0, 10);
            this.gid = parseInt(tmxObj[me.TMX_TAG_GID], 10) || null;

            this.type = tmxObj[me.TMX_TAG_TYPE];

            this.isEllipse = false;
            this.isPolygon = false;
            this.isPolyline = false;

            // check if the object has an associated gid
            if (this.gid) {
                this.setImage(this.gid, tilesets);
            }
            else {
                if (typeof(tmxObj[me.TMX_TAG_ELLIPSE]) !== "undefined") {
                    this.isEllipse = true;
                }
                else {
                    var points = tmxObj[me.TMX_TAG_POLYGON];
                    if (typeof(points) !== "undefined") {
                        this.isPolygon = true;
                    }
                    else {
                        points = tmxObj[me.TMX_TAG_POLYLINE];
                        if (typeof(points) !== "undefined") {
                            this.isPolyline = true;
                        }
                    }
                    if (typeof(points) !== "undefined") {
                        this.points = [];
                        if (typeof(points.points) !== "undefined") {
                            // get a point array
                            points = points.points.split(" ");
                            // and normalize them into an array of vectors
                            for (var i = 0, v; i < points.length; i++) {
                                v = points[i].split(",");
                                this.points.push(new me.Vector2d(+v[0], +v[1]));
                            }
                        }
                        else {
                            // already an object (native json format)
                            var self = this;
                            points.forEach(function (point) {
                                self.points.push(new me.Vector2d(parseInt(point.x, 10), parseInt(point.y, 10)));
                            });
                        }
                    }
                }
            }

            // Adjust the Position to match Tiled
            me.game.renderer.adjustPosition(this);

            // set the object properties
            me.TMXUtils.applyTMXProperties(this, tmxObj);
        },

        /**
         * set the object image (for Tiled Object)
         * @ignore
         * @function
         */
        setImage : function (gid, tilesets) {
            // get the corresponding tileset
            var tileset = tilesets.getTilesetByGid(this.gid);

            // set width and height equal to tile size
            this.width = tileset.tilewidth;
            this.height = tileset.tileheight;

            // force spritewidth size
            this.spritewidth = this.width;

            // the object corresponding tile
            var tmxTile = new me.Tile(this.x, this.y, tileset.tilewidth, tileset.tileheight, this.gid);

            // get the corresponding tile into our object
            this.image = tileset.getTileImage(tmxTile);

            // set a generic name if not defined
            if (typeof (this.name) === "undefined") {
                this.name = "TileObject";
            }
        },

        /**
         * return the corresponding shape object
         * @name getShape
         * @memberOf me.TMXObject
         * @public
         * @function
         * @return {me.Rect|me.PolyShape|me.Ellipse} shape a shape object
         */
        getShape : function () {
            // add an ellipse shape
            if (this.isEllipse === true) {
                return new me.Ellipse(new me.Vector2d(0, 0), this.width, this.height);
            }

            // add a polyshape
            if ((this.isPolygon === true) || (this.isPolyline === true)) {
                return new me.PolyShape(new me.Vector2d(0, 0), this.points, this.isPolygon);
            }

            // it's a rectangle
            return new me.Rect(new me.Vector2d(0, 0), this.width, this.height);
        },

        /**
         * getObjectPropertyByName
         * @ignore
         * @function
         */
        getObjectPropertyByName : function (name) {
            return this[name];
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/
 *
 */
(function () {
    /*
     * Tileset Management
     */

    // bitmask constants to check for flipped & rotated tiles
    var FlippedHorizontallyFlag    = 0x80000000;
    var FlippedVerticallyFlag      = 0x40000000;
    var FlippedAntiDiagonallyFlag  = 0x20000000;

    /**
     * a basic tile object
     * @class
     * @extends me.Rect
     * @memberOf me
     * @constructor
     * @param {Number} x x index of the Tile in the map
     * @param {Number} y y index of the Tile in the map
     * @param {Number} w Tile width
     * @param {Number} h Tile height
     * @param {Number} tileId tileId
     */
    me.Tile = me.Rect.extend({
        /**
         * tileId
         * @public
         * @type int
         * @name me.Tile#tileId
         */
        tileId : null,

        /**
         * tileset
         * @public
         * @type me.TMXTileset
         * @name me.Tile#tileset
         */
        tileset : null,

        /**
         * the tile transformation matrix (if defined)
         * @ignore
         */
        transform : null,

        /** @ignore */
        init : function (x, y, w, h, gid) {
            this.parent(new me.Vector2d(x * w, y * h), w, h);

            // Tile col / row pos
            this.col = x;
            this.row = y;

            this.tileId = gid;

            /**
             * True if the tile is flipped horizontally<br>
             * @public
             * @type Boolean
             * @name me.Tile#flipX
             */
            this.flipX  = (this.tileId & FlippedHorizontallyFlag) !== 0;

            /**
             * True if the tile is flipped vertically<br>
             * @public
             * @type Boolean
             * @name me.Tile#flipY
             */
            this.flipY  = (this.tileId & FlippedVerticallyFlag) !== 0;

            /**
             * True if the tile is flipped anti-diagonally<br>
             * @public
             * @type Boolean
             * @name me.Tile#flipAD
             */
            this.flipAD = (this.tileId & FlippedAntiDiagonallyFlag) !== 0;

            /**
             * Global flag that indicates if the tile is flipped<br>
             * @public
             * @type Boolean
             * @name me.Tile#flipped
             */
            this.flipped = this.flipX || this.flipY || this.flipAD;

            // create a transformation matrix if required
            if (this.flipped === true) {
                this.createTransform();
            }

            // clear out the flags and set the tileId
            this.tileId &= ~(FlippedHorizontallyFlag | FlippedVerticallyFlag | FlippedAntiDiagonallyFlag);
        },

        /**
         * create a transformation matrix for this tilee
         * @ignore
         */
        createTransform : function () {
            if (this.transform === null) {
                this.transform = new me.Matrix2d();
            }
            // reset the matrix (in case it was already defined)
            this.transform.identity();

            if (this.flipAD) {
                // Use shearing to swap the X/Y axis
                this.transform.set(0, 1, 1, 0);
                this.transform.translate(0, this.height - this.width);
            }
            if (this.flipX) {
                this.transform.a *= -1;
                this.transform.c *= -1;
                this.transform.translate((this.flipAD ? this.height : this.width), 0);

            }
            if (this.flipY) {
                this.transform.b *= -1;
                this.transform.d *= -1;
                this.transform.translate(0, (this.flipAD ? this.width : this.height));
            }
        },
    });

    /**
     * a TMX Tile Set Object
     * @class
     * @memberOf me
     * @constructor
     */
    me.TMXTileset = Object.extend({
        // tile types
        type : {
            SOLID : "solid",
            PLATFORM : "platform",
            L_SLOPE : "lslope",
            R_SLOPE : "rslope",
            LADDER : "ladder",
            TOPLADDER : "topladder",
            BREAKABLE : "breakable"
        },

        // tile properties (collidable, etc..)
        TileProperties : [],

        // a cache for offset value
        tileXOffset : [],
        tileYOffset : [],

        // constructor
        init: function (tileset) {
            // first gid
            this.firstgid = this.lastgid = tileset[me.TMX_TAG_FIRSTGID];
            var src = tileset[me.TMX_TAG_SOURCE];
            if (src && me.utils.getFileExtension(src).toLowerCase() === "tsx") {
                // load TSX
                src = me.utils.getBasename(src);
                // replace tiletset with a local variable
                tileset = me.loader.getTMX(src);

                if (!tileset) {
                    throw "melonJS:" + src + " TSX tileset not found";
                }
                // normally tileset shoudld directly contains the required
                //information : UNTESTED as I did not find how to generate a JSON TSX file
            }

            this.name = tileset[me.TMX_TAG_NAME];
            this.tilewidth = parseInt(tileset[me.TMX_TAG_TILEWIDTH], 10);
            this.tileheight = parseInt(tileset[me.TMX_TAG_TILEHEIGHT], 10);
            this.spacing = parseInt(tileset[me.TMX_TAG_SPACING] || 0, 10);
            this.margin = parseInt(tileset[me.TMX_TAG_MARGIN] || 0, 10);

            // set tile offset properties (if any)
            this.tileoffset = new me.Vector2d(0, 0);
            var offset = tileset[me.TMX_TAG_TILEOFFSET];
            if (offset) {
                this.tileoffset.x = parseInt(offset[me.TMX_TAG_X], 10);
                this.tileoffset.y = parseInt(offset[me.TMX_TAG_Y], 10);
            }

            // set tile properties, if any
            var tileInfo = tileset.tileproperties;
            if (tileInfo) {
                // native JSON format
                for (var i in tileInfo) {
                    if (tileInfo.hasOwnProperty(i)) {
                        this.setTileProperty(parseInt(i, 10) + this.firstgid, tileInfo[i]);
                    }
                }
            }
            else if (tileset[me.TMX_TAG_TILE]) {
                // converted XML format
                tileInfo = tileset[me.TMX_TAG_TILE];
                if (!Array.isArray(tileInfo)) {
                    tileInfo = [ tileInfo ];
                }
                // iterate it
                for (var j = 0; j < tileInfo.length; j++) {
                    var tileID = tileInfo[j][me.TMX_TAG_ID] + this.firstgid;
                    var prop = {};
                    me.TMXUtils.applyTMXProperties(prop, tileInfo[j]);
                    //apply tiled defined properties
                    this.setTileProperty(tileID, prop);
                }
            }

            // check for the texture corresponding image
            // manage inconstency between XML and JSON format
            var imagesrc = (
                typeof(tileset[me.TMX_TAG_IMAGE]) === "string" ?
                tileset[me.TMX_TAG_IMAGE] : tileset[me.TMX_TAG_IMAGE].source
            );
            // extract base name
            imagesrc = me.utils.getBasename(imagesrc);
            this.image = imagesrc ? me.loader.getImage(imagesrc) : null;

            if (!this.image) {
                console.log("melonJS: '" + imagesrc + "' file for tileset '" + this.name + "' not found!");
            }
            else {
                // number of tiles per horizontal line
                this.hTileCount = ~~((this.image.width - this.margin) / (this.tilewidth + this.spacing));
                this.vTileCount = ~~((this.image.height - this.margin) / (this.tileheight + this.spacing));
                // compute the last gid value in the tileset
                this.lastgid = this.firstgid + (((this.hTileCount * this.vTileCount) - 1) || 0);

                // check if transparency is defined for a specific color
                var transparency = tileset[me.TMX_TAG_TRANS] || tileset[me.TMX_TAG_IMAGE][me.TMX_TAG_TRANS];
                // set Color Key for transparency if needed
                if (typeof(transparency) !== "undefined") {
                    // applyRGB Filter (return a context object)
                    this.image = me.video.applyRGBFilter(this.image, "transparent", transparency.toUpperCase()).canvas;
                }
            }
        },

        /**
         * set the tile properties
         * @ignore
         * @function
         */
        setTileProperty : function (gid, prop) {
            // check what we found and adjust property
            prop.isSolid = prop.type ? prop.type.toLowerCase() === this.type.SOLID : false;
            prop.isPlatform = prop.type ? prop.type.toLowerCase() === this.type.PLATFORM : false;
            prop.isLeftSlope = prop.type ? prop.type.toLowerCase() === this.type.L_SLOPE : false;
            prop.isRightSlope = prop.type ? prop.type.toLowerCase() === this.type.R_SLOPE : false;
            prop.isBreakable = prop.type ? prop.type.toLowerCase() === this.type.BREAKABLE : false;
            prop.isLadder = prop.type ? prop.type.toLowerCase() === this.type.LADDER : false;
            prop.isTopLadder = prop.type ? prop.type.toLowerCase() === this.type.TOPLADDER : false;
            prop.isSlope = prop.isLeftSlope || prop.isRightSlope;

            // ensure the collidable flag is correct
            prop.isCollidable = !!prop.type;

            // set the given tile id
            this.TileProperties[gid] = prop;
        },

        /**
         * return true if the gid belongs to the tileset
         * @name me.TMXTileset#contains
         * @public
         * @function
         * @param {Number} gid
         * @return {Boolean}
         */
        contains : function (gid) {
            return gid >= this.firstgid && gid <= this.lastgid;
        },

        //return an Image Object with the specified tile
        getTileImage : function (tmxTile) {
            // create a new image object
            var _context = me.video.getContext2d(
                    me.video.createCanvas(this.tilewidth, this.tileheight)
            );
            this.drawTile(_context, 0, 0, tmxTile);
            return _context.canvas;
        },

        // e.g. getTileProperty (gid)
        /**
         * return the properties of the specified tile <br>
         * the function will return an object with the following boolean value :<br>
         * - isCollidable<br>
         * - isSolid<br>
         * - isPlatform<br>
         * - isSlope <br>
         * - isLeftSlope<br>
         * - isRightSlope<br>
         * - isLadder<br>
         * - isBreakable<br>
         * @name me.TMXTileset#getTileProperties
         * @public
         * @function
         * @param {Number} tileId
         * @return {Object}
         */
        getTileProperties: function (tileId) {
            return this.TileProperties[tileId];
        },

        //return collidable status of the specifiled tile
        isTileCollidable : function (tileId) {
            return this.TileProperties[tileId].isCollidable;
        },

        /*
        //return collectable status of the specifiled tile
        isTileCollectable : function (tileId) {
            return this.TileProperties[tileId].isCollectable;
        },
         */

        /**
         * return the x offset of the specified tile in the tileset image
         * @ignore
         */
        getTileOffsetX : function (tileId) {
            var offset = this.tileXOffset[tileId];
            if (typeof(offset) === "undefined") {
                offset = this.tileXOffset[tileId] = this.margin + (this.spacing + this.tilewidth)  * (tileId % this.hTileCount);
            }
            return offset;
        },

        /**
         * return the y offset of the specified tile in the tileset image
         * @ignore
         */
        getTileOffsetY : function (tileId) {
            var offset = this.tileYOffset[tileId];
            if (typeof(offset) === "undefined") {
                offset = this.tileYOffset[tileId] = this.margin + (this.spacing + this.tileheight)  * ~~(tileId / this.hTileCount);
            }
            return offset;
        },


        // draw the x,y tile
        drawTile : function (context, dx, dy, tmxTile) {
            // check if any transformation is required
            if (tmxTile.flipped) {
                context.save();
                // apply the tile current transform
                var transform = tmxTile.transform;
                context.transform(
                    transform.a, transform.b,
                    transform.c, transform.d,
                    transform.e + dx, transform.f + dy
                );
                // reset both values as managed through transform();
                dx = dy = 0;
            }

            // get the local tileset id
            var tileid = tmxTile.tileId - this.firstgid;

            // draw the tile
            context.drawImage(
                this.image,
                this.getTileOffsetX(tileid), this.getTileOffsetY(tileid),
                this.tilewidth, this.tileheight,
                dx, dy,
                this.tilewidth, this.tileheight
            );

            if (tmxTile.flipped)  {
                // restore the context to the previous state
                context.restore();
            }
        }


    });

    /**
     * an object containing all tileset
     * @class
     * @memberOf me
     * @constructor
     */
    me.TMXTilesetGroup = Object.extend({
        // constructor
        init: function () {
            this.tilesets = [];
        },

        //add a tileset to the tileset group
        add : function (tileset) {
            this.tilesets.push(tileset);
        },

        //return the tileset at the specified index
        getTilesetByIndex : function (i) {
            return this.tilesets[i];
        },

        /**
         * return the tileset corresponding to the specified id <br>
         * will throw an exception if no matching tileset is found
         * @name me.TMXTilesetGroup#getTilesetByGid
         * @public
         * @function
         * @param {Number} gid
         * @return {me.TMXTileset} corresponding tileset
         */
        getTilesetByGid : function (gid) {
            var invalidRange = -1;
            // cycle through all tilesets
            for (var i = 0, len = this.tilesets.length; i < len; i++) {
                // return the corresponding tileset if matching
                if (this.tilesets[i].contains(gid)) {
                    return this.tilesets[i];
                }
                // typically indicates a layer with no asset loaded (collision?)
                if (this.tilesets[i].firstgid === this.tilesets[i].lastgid &&
                    gid >= this.tilesets[i].firstgid) {
                    // store the id if the [firstgid .. lastgid] is invalid
                    invalidRange = i;
                }
            }
            // return the tileset with the invalid range
            if (invalidRange !== -1) {
                return this.tilesets[invalidRange];
            }
            else {
                throw "no matching tileset found for gid " + gid;
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/
 *
 */
(function () {
    /**
     * an Orthogonal Map Renderder
     * Tiled QT 0.7.x format
     * @memberOf me
     * @ignore
     * @constructor
     */
    me.TMXOrthogonalRenderer = Object.extend({
        // constructor
        init: function (cols, rows, tilewidth, tileheight) {
            this.cols = cols;
            this.rows = rows;
            this.tilewidth = tilewidth;
            this.tileheight = tileheight;
        },

        /**
         * return true if the renderer can render the specified layer
         * @ignore
         */
        canRender : function (layer) {
            return ((layer.orientation === "orthogonal") &&
                    (this.cols === layer.cols) &&
                    (this.rows === layer.rows) &&
                    (this.tilewidth === layer.tilewidth) &&
                    (this.tileheight === layer.tileheight));
        },

        /**
         * return the tile position corresponding to the specified pixel
         * @ignore
         */
        pixelToTileCoords : function (x, y) {
            return new me.Vector2d(x / this.tilewidth,
                                   y / this.tileheight);
        },

        /**
         * return the pixel position corresponding of the specified tile
         * @ignore
         */
        tileToPixelCoords : function (x, y) {
            return new me.Vector2d(x * this.tilewidth,
                                   y * this.tileheight);
        },

        /**
         * fix the position of Objects to match
         * the way Tiled places them
         * @ignore
         */
        adjustPosition: function (obj) {
            // only adjust position if obj.gid is defined
            if (typeof(obj.gid) === "number") {
                 // Tiled objects origin point is "bottom-left" in Tiled,
                 // "top-left" in melonJS)
                obj.y -= obj.height;
            }
        },

        /**
         * draw the tile map
         * @ignore
         */
        drawTile : function (context, x, y, tmxTile, tileset) {
            // draw the tile
            tileset.drawTile(context,
                             tileset.tileoffset.x + x * this.tilewidth,
                             tileset.tileoffset.y + (y + 1) * this.tileheight - tileset.tileheight,
                             tmxTile);
        },

        /**
         * draw the tile map
         * @ignore
         */
        drawTileLayer : function (context, layer, rect) {
            // get top-left and bottom-right tile position
            var start = this.pixelToTileCoords(rect.pos.x,
                                               rect.pos.y).floorSelf();

            var end = this.pixelToTileCoords(rect.pos.x + rect.width + this.tilewidth,
                                             rect.pos.y + rect.height + this.tileheight).ceilSelf();

            //ensure we are in the valid tile range
            end.x = end.x > this.cols ? this.cols : end.x;
            end.y = end.y > this.rows ? this.rows : end.y;

            // main drawing loop
            for (var y = start.y; y < end.y; y++) {
                for (var x = start.x; x < end.x; x++) {
                    var tmxTile = layer.layerData[x][y];
                    if (tmxTile) {
                        this.drawTile(context, x, y, tmxTile, tmxTile.tileset);
                    }
                }
            }
        }
    });

    /**
     * an Isometric Map Renderder
     * Tiled QT 0.7.x format
     * @memberOf me
     * @ignore
     * @constructor
     */
    me.TMXIsometricRenderer = Object.extend({
        // constructor
        init: function (cols, rows, tilewidth, tileheight) {
            this.cols = cols;
            this.rows = rows;
            this.tilewidth = tilewidth;
            this.tileheight = tileheight;
            this.hTilewidth = tilewidth / 2;
            this.hTileheight = tileheight / 2;
            this.originX = this.rows * this.hTilewidth;
        },

        /**
         * return true if the renderer can render the specified layer
         * @ignore
         */
        canRender : function (layer) {
            return (
                (layer.orientation === "isometric") &&
                (this.cols === layer.cols) &&
                (this.rows === layer.rows) &&
                (this.tilewidth === layer.tilewidth) &&
                (this.tileheight === layer.tileheight)
            );
        },

        /**
         * return the tile position corresponding to the specified pixel
         * @ignore
         */
        pixelToTileCoords : function (x, y) {
            x -=  this.originX;

            var tileY = y / this.tileheight;
            var tileX = x / this.tilewidth;

            return new me.Vector2d(tileY + tileX, tileY - tileX);
        },

        /**
         * return the pixel position corresponding of the specified tile
         * @ignore
         */
        tileToPixelCoords : function (x, y) {
            return new me.Vector2d(
                (x - y) * this.hTilewidth + this.originX,
                (x + y) * this.hTileheight
            );
        },

        /**
         * fix the position of Objects to match
         * the way Tiled places them
         * @ignore
         */
        adjustPosition: function (obj) {
            var tilex = obj.x / this.hTilewidth;
            var tiley = obj.y / this.tileheight;
            var isoPos = this.tileToPixelCoords(tilex, tiley);
            isoPos.x -= obj.width / 2;
            isoPos.y -= obj.height;

            obj.x = isoPos.x;
            obj.y = isoPos.y;

            //return isoPos;
        },

        /**
         * draw the tile map
         * @ignore
         */
        drawTile : function (context, x, y, tmxTile, tileset) {
            // draw the tile
            tileset.drawTile(
                context,
                ((this.cols - 1) * tileset.tilewidth + (x - y) * tileset.tilewidth >> 1),
                (-tileset.tilewidth + (x + y) * tileset.tileheight >> 2),
                tmxTile
            );
        },

        /**
         * draw the tile map
         * @ignore
         */
        drawTileLayer : function (context, layer, rect) {

            // cache a couple of useful references
            var tileset = layer.tileset;
            var offset  = tileset.tileoffset;

            // get top-left and bottom-right tile position
            var rowItr = this.pixelToTileCoords(
                rect.pos.x - tileset.tilewidth,
                rect.pos.y - tileset.tileheight
            ).floorSelf();
            var TileEnd = this.pixelToTileCoords(
                rect.pos.x + rect.width + tileset.tilewidth,
                rect.pos.y + rect.height + tileset.tileheight
            ).ceilSelf();

            var rectEnd = this.tileToPixelCoords(TileEnd.x, TileEnd.y);

            // Determine the tile and pixel coordinates to start at
            var startPos = this.tileToPixelCoords(rowItr.x, rowItr.y);
            startPos.x -= this.hTilewidth;
            startPos.y += this.tileheight;

            /* Determine in which half of the tile the top-left corner of the area we
             * need to draw is. If we're in the upper half, we need to start one row
             * up due to those tiles being visible as well. How we go up one row
             * depends on whether we're in the left or right half of the tile.
             */
            var inUpperHalf = startPos.y - rect.pos.y > this.hTileheight;
            var inLeftHalf  = rect.pos.x - startPos.x < this.hTilewidth;

            if (inUpperHalf) {
                if (inLeftHalf) {
                    rowItr.x--;
                    startPos.x -= this.hTilewidth;
                }
                else {
                    rowItr.y--;
                    startPos.x += this.hTilewidth;
                }
                startPos.y -= this.hTileheight;
            }


             // Determine whether the current row is shifted half a tile to the right
            var shifted = inUpperHalf ^ inLeftHalf;

            // initialize the columItr vector
            var columnItr = rowItr.clone();

            // main drawing loop
            for (var y = startPos.y; y - this.tileheight < rectEnd.y; y += this.hTileheight) {
                columnItr.setV(rowItr);
                for (var x = startPos.x; x < rectEnd.x; x += this.tilewidth) {
                    //check if it's valid tile, if so render
                    if ((columnItr.x >= 0) && (columnItr.y >= 0) && (columnItr.x < this.cols) && (columnItr.y < this.rows)) {
                        var tmxTile = layer.layerData[columnItr.x][columnItr.y];
                        if (tmxTile) {
                            tileset = tmxTile.tileset;
                            // offset could be different per tileset
                            offset  = tileset.tileoffset;
                            // draw our tile
                            tileset.drawTile(context, offset.x + x, offset.y + y - tileset.tileheight, tmxTile);
                        }
                    }
                    // Advance to the next column
                    columnItr.x++;
                    columnItr.y--;
                }

                // Advance to the next row
                if (!shifted) {
                    rowItr.x++;
                    startPos.x += this.hTilewidth;
                    shifted = true;
                }
                else {
                    rowItr.y++;
                    startPos.x -= this.hTilewidth;
                    shifted = false;
                }
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a generic Color Layer Object
     * @class
     * @extends me.Renderable
     * @memberOf me
     * @constructor
     * @param {String}  name    layer name
     * @param {String}  color   a CSS color value
     * @param {Number}  z       z position
     */
    me.ColorLayer = me.Renderable.extend({
        // constructor
        init: function (name, color, z) {
            // parent constructor
            this.parent(new me.Vector2d(0, 0), Infinity, Infinity);

            // apply given parameters
            this.name = name;
            this.color = color;
            this.z = z;
        },

        /**
         * draw the color layer
         * @ignore
         */
        draw : function (context, rect) {
            // set layer opacity
            var _alpha = context.globalAlpha;
            context.globalAlpha *= this.getOpacity();

            // set layer color
            context.fillStyle = this.color;

            // clear the specified rect
            context.fillRect(rect.left, rect.top, rect.width, rect.height);

            // restore context alpha value
            context.globalAlpha = _alpha;
        }
    });

    /**
     * a generic Image Layer Object
     * @class
     * @extends me.Renderable
     * @memberOf me
     * @constructor
     * @param {String} name        layer name
     * @param {Number} width       layer width in pixels
     * @param {Number} height      layer height in pixels
     * @param {String} image       image name (as defined in the asset list)
     * @param {Number} z           z position
     * @param {me.Vector2d}  [ratio=1.0]   scrolling ratio to be applied
     */
    me.ImageLayer = me.Renderable.extend({
        /**
         * Define if and how an Image Layer should be repeated.<br>
         * By default, an Image Layer is repeated both vertically and horizontally.<br>
         * Property values : <br>
         * * 'repeat' - The background image will be repeated both vertically and horizontally. (default) <br>
         * * 'repeat-x' - The background image will be repeated only horizontally.<br>
         * * 'repeat-y' - The background image will be repeated only vertically.<br>
         * * 'no-repeat' - The background-image will not be repeated.<br>
         * @public
         * @type String
         * @name me.ImageLayer#repeat
         */
        //repeat: 'repeat', (define through getter/setter

        /**
         * Define the image scrolling ratio<br>
         * Scrolling speed is defined by multiplying the viewport delta position (e.g. followed entity) by the specified ratio<br>
         * Default value : (1.0, 1.0) <br>
         * To specify a value through Tiled, use one of the following format : <br>
         * - a number, to change the value for both axis <br>
         * - a json expression like `json:{"x":0.5,"y":0.5}` if you wish to specify a different value for both x and y
         * @public
         * @type me.Vector2d
         * @name me.ImageLayer#ratio
         */
        //ratio: new me.Vector2d(1.0, 1.0),

        /**
         * constructor
         * @ignore
         * @function
         */
        init: function (name, width, height, imagesrc, z, ratio) {
            // layer name
            this.name = name;

            // get the corresponding image (throw an exception if not found)
            this.image = (imagesrc) ? me.loader.getImage(me.utils.getBasename(imagesrc)) : null;
            if (!this.image) {
                throw "melonJS: '" + imagesrc + "' file for Image Layer '" + this.name + "' not found!";
            }

            this.imagewidth = this.image.width;
            this.imageheight = this.image.height;

            // a cached reference to the viewport
            var viewport = me.game.viewport;

            // set layer width & height
            width  = (width  ? Math.min(viewport.width, width)   : viewport.width);
            height = (height ? Math.min(viewport.height, height) : viewport.height);
            this.parent(new me.Vector2d(0, 0), width, height);

            // displaying order
            this.z = z;

            // default ratio for parallax
            this.ratio = new me.Vector2d(1.0, 1.0);

            if (ratio) {
                // little hack for backward compatiblity
                if (typeof(ratio) === "number") {
                    this.ratio.set(ratio, ratio);
                } else /* vector */ {
                    this.ratio.setV(ratio);
                }
            }

            // last position of the viewport
            this.lastpos = viewport.pos.clone();

            // Image Layer is considered as a floating object
            this.floating = true;

            // default value for repeat
            this._repeat = "repeat";

            this.repeatX = true;
            this.repeatY = true;

            Object.defineProperty(this, "repeat", {
                get : function get() {
                    return this._repeat;
                },
                set : function set(val) {
                    this._repeat = val;
                    switch (this._repeat) {
                        case "no-repeat" :
                            this.repeatX = false;
                            this.repeatY = false;
                            break;
                        case "repeat-x" :
                            this.repeatX = true;
                            this.repeatY = false;
                            break;
                        case "repeat-y" :
                            this.repeatX = false;
                            this.repeatY = true;
                            break;
                        default : // "repeat"
                            this.repeatX = true;
                            this.repeatY = true;
                            break;
                    }
                }
            });

            // default origin position
            this.anchorPoint.set(0, 0);

            // register to the viewport change notification
            this.handle = me.event.subscribe(me.event.VIEWPORT_ONCHANGE, this.updateLayer.bind(this));
        },

        /**
         * updateLayer function
         * @ignore
         * @function
         */
        updateLayer : function (vpos) {
            if (0 === this.ratio.x && 0 === this.ratio.y) {
                // static image
                return;
            }
            else if (this.repeatX || this.repeatY) {
                // parallax / scrolling image
                this.pos.x += ((vpos.x - this.lastpos.x) * this.ratio.x) % this.imagewidth;
                this.pos.x = (this.imagewidth + this.pos.x) % this.imagewidth;

                this.pos.y += ((vpos.y - this.lastpos.y) * this.ratio.y) % this.imageheight;
                this.pos.y = (this.imageheight + this.pos.y) % this.imageheight;
            }
            else {
                this.pos.x += (vpos.x - this.lastpos.x) * this.ratio.x;
                this.pos.y += (vpos.y - this.lastpos.y) * this.ratio.y;
            }
            this.lastpos.setV(vpos);
        },

        /**
         * draw the image layer
         * @ignore
         */
        draw : function (context, rect) {
            // translate default position using the anchorPoint value
            var viewport = me.game.viewport;
            var shouldTranslate = this.anchorPoint.y !== 0 || this.anchorPoint.x !== 0;
            var translateX = ~~(this.anchorPoint.x * (viewport.width - this.imagewidth));
            var translateY = ~~(this.anchorPoint.y * (viewport.height - this.imageheight));

            if (shouldTranslate) {
                context.translate(translateX, translateY);
            }

            // set the layer alpha value
            context.globalAlpha *= this.getOpacity();

            var sw, sh;

            // if not scrolling ratio define, static image
            if (0 === this.ratio.x && 0 === this.ratio.y) {
                // static image
                sw = Math.min(rect.width, this.imagewidth);
                sh = Math.min(rect.height, this.imageheight);

                context.drawImage(
                    this.image,
                    rect.left, rect.top,    // sx, sy
                    sw, sh,                 // sw, sh
                    rect.left, rect.top,    // dx, dy
                    sw, sh                  // dw, dh
                );
            }
            // parallax / scrolling image
            // todo ; broken with dirtyRect enabled
            else {
                var sx = ~~this.pos.x;
                var sy = ~~this.pos.y;

                var dx = 0;
                var dy = 0;

                sw = Math.min(this.imagewidth  - sx, this.width);
                sh = Math.min(this.imageheight - sy, this.height);

                do {
                    do {
                        context.drawImage(
                            this.image,
                            sx, sy, // sx, sy
                            sw, sh,
                            dx, dy, // dx, dy
                            sw, sh
                        );

                        sy = 0;
                        dy += sh;
                        sh = Math.min(this.imageheight, this.height - dy);
                    } while (this.repeatY && (dy < this.height));
                    dx += sw;
                    if (!this.repeatX || (dx >= this.width)) {
                        // done ("end" of the viewport)
                        break;
                    }
                    // else update required var for next iteration
                    sx = 0;
                    sw = Math.min(this.imagewidth, this.width - dx);
                    sy = ~~this.pos.y;
                    dy = 0;
                    sh = Math.min(this.imageheight - ~~this.pos.y, this.height);
                } while (true);
            }

            if (shouldTranslate) {
                context.translate(-translateX, -translateY);
            }
        },

        // called when the layer is destroyed
        destroy : function () {
            // cancel the event subscription
            if (this.handle)  {
                me.event.unsubscribe(this.handle);
                this.handle = null;
            }
            // clear all allocated objects
            this.image = null;
            this.lastpos = null;
        }
    });

    /**
     * a generic collision tile based layer object
     * @memberOf me
     * @ignore
     * @constructor
     */
    me.CollisionTiledLayer = me.Renderable.extend({
        // constructor
        init: function (width, height) {
            this.parent(new me.Vector2d(0, 0), width, height);

            this.isCollisionMap = true;
        },

        /**
         * only test for the world limit
         * @ignore
         */
        checkCollision : function (obj, pv) {
            var x = (pv.x < 0) ? obj.left + pv.x : obj.right + pv.x;
            var y = (pv.y < 0) ? obj.top + pv.y : obj.bottom + pv.y;

            //to return tile collision detection
            var res = {
                x : 0, // !=0 if collision on x axis
                y : 0, // !=0 if collision on y axis
                xprop : {},
                yprop : {}
            };

            // test x limits
            if (x <= 0 || x >= this.width) {
                res.x = pv.x;
            }

            // test y limits
            if (y <= 0 || y >= this.height) {
                res.y = pv.y;
            }

            // return the collide object if collision
            return res;
        }
    });

    /**
     * a TMX Tile Layer Object
     * Tiled QT 0.7.x format
     * @class
     * @extends me.Renderable
     * @memberOf me
     * @constructor
     * @param {Number} tilewidth width of each tile in pixels
     * @param {Number} tileheight height of each tile in pixels
     * @param {String} orientation "isometric" or "orthogonal"
     * @param {me.TMXTilesetGroup} tilesets tileset as defined in Tiled
     * @param {Number} zOrder layer z-order
     */
    me.TMXLayer = me.Renderable.extend({
        // the layer data array
        layerData : null,

        /** @ignore */
        init: function (tilewidth, tileheight, orientation, tilesets, zOrder) {
            // parent constructor
            this.parent(new me.Vector2d(0, 0), 0, 0);

            // tile width & height
            this.tilewidth  = tilewidth;
            this.tileheight = tileheight;

            // layer orientation
            this.orientation = orientation;

            /**
             * The Layer corresponding Tilesets
             * @public
             * @type me.TMXTilesetGroup
             * @name me.TMXLayer#tilesets
             */

            this.tilesets = tilesets;
            // the default tileset
            this.tileset = (this.tilesets ? this.tilesets.getTilesetByIndex(0) : null);

            // for displaying order
            this.z = zOrder;
        },

        /** @ignore */
        initFromJSON: function (layer) {
            // additional TMX flags
            this.name = layer[me.TMX_TAG_NAME];
            this.cols = parseInt(layer[me.TMX_TAG_WIDTH], 10);
            this.rows = parseInt(layer[me.TMX_TAG_HEIGHT], 10);

            // layer opacity
            var visible = typeof(layer[me.TMX_TAG_VISIBLE]) !== "undefined" ? layer[me.TMX_TAG_VISIBLE] : true;
            this.setOpacity(visible ? parseFloat(layer[me.TMX_TAG_OPACITY]) : 0);

            // layer "real" size
            this.width = this.cols * this.tilewidth;
            this.height = this.rows * this.tileheight;

            // check if we have any user-defined properties
            me.TMXUtils.applyTMXProperties(this, layer);

            // check for the correct rendering method
            if (typeof (this.preRender) === "undefined") {
                this.preRender = me.sys.preRender;
            }

            // detect if the layer is a collision map
            this.isCollisionMap = (this.name.toLowerCase().contains(me.COLLISION_LAYER));
            if (this.isCollisionMap === true) {
                // force the layer as invisible
                this.setOpacity(0);
            }

            // if pre-rendering method is use, create the offline canvas
            if (this.preRender === true) {
                this.layerCanvas = me.video.createCanvas(this.cols * this.tilewidth, this.rows * this.tileheight);
                this.layerSurface = me.video.getContext2d(this.layerCanvas);
            }
        },

        /**
         * destroy function
         * @ignore
         * @function
         */
        destroy : function () {
            // clear all allocated objects
            if (this.preRender) {
                this.layerCanvas = null;
                this.layerSurface = null;
            }
            this.renderer = null;
            // clear all allocated objects
            this.layerData = null;
            this.tileset = null;
            this.tilesets = null;
        },

        /**
         * set the layer renderer
         * @ignore
         */
        setRenderer : function (renderer) {
            this.renderer = renderer;
        },

        /**
         * Create all required arrays
         * @ignore
         */
        initArray : function (w, h) {
            // initialize the array
            this.layerData = [];
            for (var x = 0; x < w; x++) {
                this.layerData[x] = [];
                for (var y = 0; y < h; y++) {
                    this.layerData[x][y] = null;
                }
            }
        },

        /**
         * Return the TileId of the Tile at the specified position
         * @name getTileId
         * @memberOf me.TMXLayer
         * @public
         * @function
         * @param {Number} x x coordinate in pixel
         * @param {Number} y y coordinate in pixel
         * @return {Number} TileId
         */
        getTileId : function (x, y) {
            var tile = this.getTile(x, y);
            return (tile ? tile.tileId : null);
        },

        /**
         * Return the Tile object at the specified position
         * @name getTile
         * @memberOf me.TMXLayer
         * @public
         * @function
         * @param {Number} x x coordinate in pixel
         * @param {Number} y y coordinate in pixel
         * @return {me.Tile} Tile Object
         */
        getTile : function (x, y) {
            return this.layerData[~~(x / this.tilewidth)][~~(y / this.tileheight)];
        },

        /**
         * Create a new Tile at the specified position
         * @name setTile
         * @memberOf me.TMXLayer
         * @public
         * @function
         * @param {Number} x x coordinate in tile
         * @param {Number} y y coordinate in tile
         * @param {Number} tileId tileId
         * @return {me.Tile} the corresponding newly created tile object
         */
        setTile : function (x, y, tileId) {
            var tile = new me.Tile(x, y, this.tilewidth, this.tileheight, tileId);
            if (!this.tileset.contains(tile.tileId)) {
                tile.tileset = this.tileset = this.tilesets.getTilesetByGid(tile.tileId);
            }
            else {
                tile.tileset = this.tileset;
            }
            this.layerData[x][y] = tile;
            return tile;
        },

        /**
         * clear the tile at the specified position
         * @name clearTile
         * @memberOf me.TMXLayer
         * @public
         * @function
         * @param {Number} x x position
         * @param {Number} y y position
         */
        clearTile : function (x, y) {
            // clearing tile
            this.layerData[x][y] = null;
            // erase the corresponding area in the canvas
            if (this.preRender) {
                this.layerSurface.clearRect(x * this.tilewidth, y * this.tileheight, this.tilewidth, this.tileheight);
            }
        },

        /**
         * check for collision
         * obj - obj
         * pv   - projection vector
         * res : result collision object
         * @ignore
         */
        checkCollision : function (obj, pv) {
            var x = (pv.x < 0) ? ~~(obj.left + pv.x) : Math.ceil(obj.right  - 1 + pv.x);
            var y = (pv.y < 0) ? ~~(obj.top  + pv.y) : Math.ceil(obj.bottom - 1 + pv.y);
            //to return tile collision detection
            var res = {
                x : 0, // !=0 if collision on x axis
                xtile : undefined,
                xprop : {},
                y : 0, // !=0 if collision on y axis
                ytile : undefined,
                yprop : {}
            };

            //var tile;
            if (x <= 0 || x >= this.width) {
                res.x = pv.x;
            }
            else if (pv.x !== 0) {
                // x, bottom corner
                res.xtile = this.getTile(x, Math.ceil(obj.bottom - 1));
                if (res.xtile && this.tileset.isTileCollidable(res.xtile.tileId)) {
                    res.x = pv.x; // reuse pv.x to get a
                    res.xprop = this.tileset.getTileProperties(res.xtile.tileId);
                }
                else {
                    // x, top corner
                    res.xtile = this.getTile(x, ~~obj.top);
                    if (res.xtile && this.tileset.isTileCollidable(res.xtile.tileId)) {
                        res.x = pv.x;
                        res.xprop = this.tileset.getTileProperties(res.xtile.tileId);
                    }
                }
            }

            // check for y movement
            // left, y corner
            res.ytile = this.getTile((pv.x < 0) ? ~~obj.left : Math.ceil(obj.right - 1), y);
            if (res.ytile && this.tileset.isTileCollidable(res.ytile.tileId)) {
                res.y = pv.y || 1;
                res.yprop = this.tileset.getTileProperties(res.ytile.tileId);
            }
            else { // right, y corner
                res.ytile = this.getTile((pv.x < 0) ? Math.ceil(obj.right - 1) : ~~obj.left, y);
                if (res.ytile && this.tileset.isTileCollidable(res.ytile.tileId)) {
                    res.y = pv.y || 1;
                    res.yprop = this.tileset.getTileProperties(res.ytile.tileId);
                }
            }
            // return the collide object
            return res;
        },

        /**
         * draw a tileset layer
         * @ignore
         */
        draw : function (context, rect) {
            // use the offscreen canvas
            if (this.preRender) {

                var width = Math.min(rect.width, this.width);
                var height = Math.min(rect.height, this.height);

                this.layerSurface.globalAlpha = context.globalAlpha * this.getOpacity();

                if (this.layerSurface.globalAlpha > 0) {
                    // draw using the cached canvas
                    context.drawImage(
                        this.layerCanvas,
                        rect.pos.x, rect.pos.y, // sx,sy
                        width, height,          // sw,sh
                        rect.pos.x, rect.pos.y, // dx,dy
                        width, height           // dw,dh
                    );
                }
            }
            // dynamically render the layer
            else {
                // set the layer alpha value
                var _alpha = context.globalAlpha;
                context.globalAlpha *= this.getOpacity();

                if (context.globalAlpha > 0) {
                    // draw the layer
                    this.renderer.drawTileLayer(context, this, rect);
                }

                // restore context to initial state
                context.globalAlpha = _alpha;
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/
 *
 */
(function () {
    /**
     * a TMX Tile Map Object
     * Tiled QT 0.7.x format
     * @class
     * @memberOf me
     * @constructor
     * @param {String} levelId name of TMX map
     */
    me.TMXTileMap = me.Renderable.extend({
        // constructor
        init: function (levelId) {
            // map id
            this.levelId = levelId;

            // map default z order
            this.z = 0;

            /**
             * name of the tilemap
             * @public
             * @type String
             * @name me.TMXTileMap#name
             */
            this.name = null;

            /**
             * width of the tilemap in tiles
             * @public
             * @type Int
             * @name me.TMXTileMap#cols
             */
            this.cols = 0;

            /**
             * height of the tilemap in tiles
             * @public
             * @type Int
             * @name me.TMXTileMap#rows
             */
            this.rows = 0;

            /**
             * Tile width
             * @public
             * @type Int
             * @name me.TMXTileMap#tilewidth
             */
            this.tilewidth = 0;

            /**
             * Tile height
             * @public
             * @type Int
             * @name me.TMXTileMap#tileheight
             */
            this.tileheight = 0;

            // corresponding tileset for this map
            this.tilesets = null;

            // map layers
            this.mapLayers = [];

            // map Object
            this.objectGroups = [];

            // tilemap version
            this.version = "";

            // map type (only orthogonal format supported)
            this.orientation = "";

            // tileset(s)
            this.tilesets = null;

            // loading flag
            this.initialized = false;

            this.parent(new me.Vector2d(), 0, 0);
        },

        /**
         * return the corresponding object group definition
         * @name me.TMXTileMap#getObjectGroupByName
         * @public
         * @function
         * @return {me.TMXObjectGroup} group
         */
        getObjectGroupByName : function (name) {
            var objectGroup = null;
            // normalize name
            name = name.trim().toLowerCase();
            for (var i = this.objectGroups.length; i--;) {
                if (this.objectGroups[i].name.toLowerCase().contains(name)) {
                    objectGroup = this.objectGroups[i];
                    break;
                }
            }
            return objectGroup;
        },

        /**
         * return all the existing object group definition
         * @name me.TMXTileMap#getObjectGroups
         * @public
         * @function
         * @return {me.TMXObjectGroup[]} Array of Groups
         */
        getObjectGroups : function () {
            return this.objectGroups;
        },

        /**
         * return all the existing layers
         * @name me.TMXTileMap#getLayers
         * @public
         * @function
         * @return {me.TMXLayer[]} Array of Layers
         */
        getLayers : function () {
            return this.mapLayers;
        },

        /**
         * return the specified layer object
         * @name me.TMXTileMap#getLayerByName
         * @public
         * @function
         * @param {String} name Layer Name
         * @return {me.TMXLayer} Layer Object
         */
        getLayerByName : function (name) {
            var layer = null;

            // normalize name
            name = name.trim().toLowerCase();
            for (var i = this.mapLayers.length; i--;) {
                if (this.mapLayers[i].name.toLowerCase().contains(name)) {
                    layer = this.mapLayers[i];
                    break;
                }
            }

            // return a fake collision layer if not found
            if ((name.toLowerCase().contains(me.COLLISION_LAYER)) && (layer == null)) {
                layer = new me.CollisionTiledLayer(
                    me.game.currentLevel.width,
                    me.game.currentLevel.height
                );
            }

            return layer;
        },

        /**
         * clear the tile at the specified position from all layers
         * @name me.TMXTileMap#clearTile
         * @public
         * @function
         * @param {Number} x x position
         * @param {Number} y y position
         */
        clearTile : function (x, y) {
            // add all layers
            for (var i = this.mapLayers.length; i--;) {
                // that are visible
                if (this.mapLayers[i] instanceof me.TMXLayer) {
                    this.mapLayers[i].clearTile(x, y);
                }
            }
        },

        /**
         * destroy function, clean all allocated objects
         * @ignore
         */
        destroy : function () {
            var i;

            if (this.initialized === true) {
                // reset/clear all layers
                for (i = this.mapLayers.length; i--;) {
                    this.mapLayers[i] = null;
                }
                // reset object groups
                for (i = this.objectGroups.length; i--;) {
                    // objectGroups is not added to the game world
                    // so we call the destroy function manually
                    this.objectGroups[i].destroy();
                    this.objectGroups[i] = null;
                }
                // call parent reset function
                this.tilesets = null;
                this.mapLayers.length = 0;
                this.objectGroups.length = 0;
                this.pos.set(0, 0);
                this.initialized = false;
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/
 *
 */
(function () {
    /**
     * a TMX Map Reader
     * Tiled QT 0.7.x format
     * @class
     * @memberOf me
     * @constructor
     * @ignore
     */
    me.TMXMapReader = Object.extend({
        JSONReader : null,

        readMap: function (map) {
            // if already loaded, do nothing
            if (map.initialized) {
                return;
            }
            if  (this.JSONReader === null) {
                this.JSONReader = new JSONMapReader();
            }
            this.JSONReader.readJSONMap(map, me.loader.getTMX(map.levelId));


            // center the map if smaller than the current viewport
            if ((map.width < me.game.viewport.width) ||
                (map.height < me.game.viewport.height)) {
                var shiftX =  ~~((me.game.viewport.width - map.width) / 2);
                var shiftY =  ~~((me.game.viewport.height - map.height) / 2);
                // update the map default screen position
                map.pos.add({
                    x : (shiftX > 0 ? shiftX : 0),
                    y : (shiftY > 0 ? shiftY : 0)
                });
            }

            // flag as loaded
            map.initialized = true;

        },

        /**
         * set a compatible renderer object
         * for the specified map
         * TODO : put this somewhere else
         * @ignore
         */
        getNewDefaultRenderer: function (obj) {
            switch (obj.orientation) {
                case "orthogonal":
                    return new me.TMXOrthogonalRenderer(
                        obj.cols,
                        obj.rows,
                        obj.tilewidth,
                        obj.tileheight
                    );

                case "isometric":
                    return new me.TMXIsometricRenderer(
                        obj.cols,
                        obj.rows,
                        obj.tilewidth,
                        obj.tileheight
                    );

                // if none found, throw an exception
                default:
                    throw "melonJS: " + obj.orientation + " type TMX Tile Map not supported!";
            }
        },

        /**
         * Set tiled layer Data
         * @ignore
         */
        setLayerData : function (layer, rawdata, encoding, compression) {
            // initialize the layer data array
            layer.initArray(layer.cols, layer.rows);

            // data
            var data = Array.isArray(rawdata) === true ? rawdata : rawdata.value;

            // decode data based on encoding type
            switch (encoding) {
                case "json":
                    // do nothing as data can be directly reused
                    data = rawdata;
                    break;
                // CSV encoding
                case me.TMX_TAG_CSV:
                // Base 64 encoding
                case me.TMX_TAG_ATTR_BASE64:
                    // and then decode them
                    if (encoding === me.TMX_TAG_CSV) {
                        // CSV decode
                        data = me.utils.decodeCSV(data, layer.cols);
                    } else {
                        // Base 64 decode
                        data = me.utils.decodeBase64AsArray(data, 4);
                        // check if data is compressed
                        if (compression !== null) {
                            data = me.utils.decompress(data, compression);
                        }
                    }
                    break;


                default:
                    throw "melonJS: TMX Tile Map " + encoding + " encoding not supported!";
            }

            var idx = 0;
            // set everything
            for (var y = 0 ; y < layer.rows; y++) {
                for (var x = 0; x < layer.cols; x++) {
                    // get the value of the gid
                    var gid = (encoding == null) ? this.TMXParser.getIntAttribute(data[idx++], me.TMX_TAG_GID) : data[idx++];
                    // fill the array
                    if (gid !== 0) {
                        // add a new tile to the layer
                        var tile = layer.setTile(x, y, gid);
                        // draw the corresponding tile
                        if (layer.preRender) {
                            layer.renderer.drawTile(layer.layerSurface, x, y, tile, tile.tileset);
                        }
                    }
                }
            }
        }
    });

    /**
     * a JSON Map Reader
     * Tiled QT 0.7.x format
     * @class
     * @memberOf me
     * @constructor
     * @ignore
     */
    var JSONMapReader = me.TMXMapReader.extend({
        readJSONMap: function (map, data) {
            if (!data) {
                throw "melonJS:" + map.levelId + " TMX map not found";
            }

            // to automatically increment z index
            var zOrder = 0;

            // keep a reference to our scope
            var self = this;

            // map information
            map.version = data[me.TMX_TAG_VERSION];
            map.orientation = data[me.TMX_TAG_ORIENTATION];
            map.cols = parseInt(data[me.TMX_TAG_WIDTH], 10);
            map.rows = parseInt(data[me.TMX_TAG_HEIGHT], 10);
            map.tilewidth = parseInt(data[me.TMX_TAG_TILEWIDTH], 10);
            map.tileheight = parseInt(data[me.TMX_TAG_TILEHEIGHT], 10);
            map.width = map.cols * map.tilewidth;
            map.height = map.rows * map.tileheight;
            map.backgroundcolor = data[me.TMX_BACKGROUND_COLOR];
            map.z = zOrder++;

            // set the map properties (if any)
            me.TMXUtils.applyTMXProperties(map, data);

            // check if a user-defined background color is defined
            if (map.backgroundcolor) {
                map.mapLayers.push(
                    new me.ColorLayer(
                        "background_color",
                        map.backgroundcolor,
                        zOrder++
                    )
                );
            }

            // check if a background image is defined
            if (map.background_image) {
                // add a new image layer
                map.mapLayers.push(new me.ImageLayer(
                    "background_image",
                    map.width, map.height,
                    map.background_image,
                    zOrder++
                ));
            }

            // initialize a default renderer
            if ((me.game.renderer === null) || !me.game.renderer.canRender(map)) {
                me.game.renderer = this.getNewDefaultRenderer(map);
            }

            // Tileset information
            if (!map.tilesets) {
                // make sure we have a TilesetGroup Object
                map.tilesets = new me.TMXTilesetGroup();
            }

            // parse all tileset objects
            var tilesets = data.tilesets || data.tileset;
            if (Array.isArray(tilesets) === true) {
                tilesets.forEach(function (tileset) {
                    // add the new tileset
                    map.tilesets.add(self.readTileset(tileset));
                });
            } else {
                map.tilesets.add(self.readTileset(tilesets));
            }

            // parse layer information

            // native JSON format
            if (typeof (data.layers) !== "undefined") {
                data.layers.forEach(function (layer) {
                    switch (layer.type) {
                        case me.TMX_TAG_IMAGE_LAYER :
                            map.mapLayers.push(self.readImageLayer(map, layer, zOrder++));
                            break;

                        case me.TMX_TAG_TILE_LAYER :
                            map.mapLayers.push(self.readLayer(map, layer, zOrder++));
                            break;

                        // get the object groups information
                        case me.TMX_TAG_OBJECTGROUP:
                            map.objectGroups.push(self.readObjectGroup(map, layer, zOrder++));
                            break;

                        default:
                            break;
                    }
                });
            }
            else if (typeof (data.layer) !== "undefined") {
                // converted XML format
                // in converted format, these are not under the generic layers structure
                // and each element can be either an array of object of just one object

                var layers = data.layer;
                if (Array.isArray(layers) === true) {
                    layers.forEach(function (layer) {
                        // get the object information
                        map.mapLayers.push(self.readLayer(map, layer, layer._draworder));
                    });
                }
                else {
                    // get the object information
                    map.mapLayers.push(self.readLayer(map, layers, layers._draworder));
                }

                // in converted format, these are not under the generic layers structure
                if (typeof(data[me.TMX_TAG_OBJECTGROUP]) !== "undefined") {
                    var groups = data[me.TMX_TAG_OBJECTGROUP];
                    if (Array.isArray(groups) === true) {
                        groups.forEach(function (group) {
                            map.objectGroups.push(self.readObjectGroup(map, group, group._draworder));
                        });
                    }
                    else {
                        // get the object information
                        map.objectGroups.push(self.readObjectGroup(map, groups, groups._draworder));
                    }
                }

                // in converted format, these are not under the generic layers structure
                if (typeof(data[me.TMX_TAG_IMAGE_LAYER]) !== "undefined") {
                    var imageLayers = data[me.TMX_TAG_IMAGE_LAYER];
                    if (Array.isArray(imageLayers) === true) {
                        imageLayers.forEach(function (imageLayer) {
                            map.mapLayers.push(self.readImageLayer(map, imageLayer, imageLayer._draworder));
                        });
                    }
                    else {
                        map.mapLayers.push(self.readImageLayer(map, imageLayers, imageLayers._draworder));
                    }
                }
            }
        },

        readLayer: function (map, data, z) {
            var layer = new me.TMXLayer(map.tilewidth, map.tileheight, map.orientation, map.tilesets, z);
            // init the layer properly
            layer.initFromJSON(data);
            // set a renderer
            if (!me.game.renderer.canRender(layer)) {
                layer.setRenderer(me.mapReader.getNewDefaultRenderer(layer));
            }
            else {
                // use the default one
                layer.setRenderer(me.game.renderer);
            }
            var encoding = Array.isArray(data[me.TMX_TAG_DATA]) ? data[me.TMX_TAG_ENCODING] : data[me.TMX_TAG_DATA][me.TMX_TAG_ENCODING];
            // parse the layer data
            this.setLayerData(layer, data[me.TMX_TAG_DATA], encoding || "json", null);
            return layer;
        },

        readImageLayer: function (map, data, z) {
            // extract layer information
            var iln = data[me.TMX_TAG_NAME];
            var ilw = parseInt(data[me.TMX_TAG_WIDTH], 10);
            var ilh = parseInt(data[me.TMX_TAG_HEIGHT], 10);
            var ilsrc = typeof (data[me.TMX_TAG_IMAGE]) !== "string" ? data[me.TMX_TAG_IMAGE].source : data[me.TMX_TAG_IMAGE];

            // create the layer
            var imageLayer = new me.ImageLayer(iln, ilw * map.tilewidth, ilh * map.tileheight, ilsrc, z);

            // set some additional flags
            var visible = typeof(data[me.TMX_TAG_VISIBLE]) !== "undefined" ? data[me.TMX_TAG_VISIBLE] : true;
            imageLayer.setOpacity((visible === true) ? parseFloat(data[me.TMX_TAG_OPACITY] || 1.0).clamp(0.0, 1.0) : 0);

            // check if we have any additional properties
            me.TMXUtils.applyTMXProperties(imageLayer, data);

            // make sure ratio is a vector (backward compatibility)
            if (typeof(imageLayer.ratio) === "number") {
                imageLayer.ratio = new me.Vector2d(parseFloat(imageLayer.ratio), parseFloat(imageLayer.ratio));
            }

            return imageLayer;
        },

        readTileset : function (data) {
            return (new me.TMXTileset(data));
        },

        readObjectGroup: function (map, data, z) {
            return (new me.TMXObjectGroup(data[me.TMX_TAG_NAME], data, map.tilesets, z));
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * a level manager object <br>
     * once ressources loaded, the level director contains all references of defined levels<br>
     * There is no constructor function for me.levelDirector, this is a static object
     * @namespace me.levelDirector
     * @memberOf me
     */
    me.levelDirector = (function () {
        // hold public stuff in our singletong
        var obj = {};

        /*
         * PRIVATE STUFF
         */

        // our levels
        var levels = {};
        // level index table
        var levelIdx = [];
        // current level index
        var currentLevelIdx = 0;

        /**
         * Load a TMX level
         * @name loadTMXLevel
         * @memberOf me.game
         * @private
         * @param {String} level to be loaded
         * @param {me.ObjectContainer} target container
         * @ignore
         * @function
         */
        var loadTMXLevel = function (level, container) {
            // disable auto-sort for the given container
            container.autoSort = false;

            // load our map
            me.game.currentLevel = level;

            // get the collision map
            me.game.collisionMap = me.game.currentLevel.getLayerByName("collision");
            if (!me.game.collisionMap || !me.game.collisionMap.isCollisionMap) {
                console.error("WARNING : no collision map detected");
            }

            // add all defined layers
            var layers = level.getLayers();
            for (var i = layers.length; i--;) {
                container.addChild(layers[i]);
            }

            // change the viewport bounds
            me.game.viewport.setBounds(
                0, 0,
                Math.max(level.width, me.game.viewport.width),
                Math.max(level.height, me.game.viewport.height)
            );

            // game world as default container
            var targetContainer = container;

            // load all ObjectGroup and Object definition
            var objectGroups = level.getObjectGroups();

            for (var g = 0; g < objectGroups.length; g++) {
                var group = objectGroups[g];

                if (me.game.mergeGroup === false) {
                    // create a new container with Infinite size (?)
                    // note: initial position and size seems to be meaningless in Tiled
                    // https://github.com/bjorn/tiled/wiki/TMX-Map-Format :
                    // x: Defaults to 0 and can no longer be changed in Tiled Qt.
                    // y: Defaults to 0 and can no longer be changed in Tiled Qt.
                    // width: The width of the object group in tiles. Meaningless.
                    // height: The height of the object group in tiles. Meaningless.
                    targetContainer = new me.ObjectContainer();

                    // set additional properties
                    targetContainer.name = group.name;
                    targetContainer.z = group.z;
                    targetContainer.setOpacity(group.opacity);

                    // disable auto-sort
                    targetContainer.autoSort = false;
                }

                // iterate through the group and add all object into their
                // corresponding target Container
                for (var o = 0; o < group.objects.length; o++) {
                    // TMX object settings
                    var settings = group.objects[o];

                    var obj = me.pool.pull(
                        settings.name,
                        settings.x, settings.y,
                        // 'TileObject' will instantiate a Sprite Object
                        settings.name === "TileObject" ? settings.image : settings
                    );

                    // ignore if the pull function does not return a corresponding object
                    if (obj) {
                        // set the obj z order correspondingly to its parent container/group
                        obj.z = group.z;

                        //apply group opacity value to the child objects if group are merged
                        if (me.game.mergeGroup === true && obj.isRenderable === true) {
                            obj.setOpacity(obj.getOpacity() * group.opacity);
                            // and to child renderables if any
                            if (obj.renderable instanceof me.Renderable) {
                                obj.renderable.setOpacity(obj.renderable.getOpacity() * group.opacity);
                            }
                        }
                        // add the obj into the target container
                        targetContainer.addChild(obj);
                    }
                }

                // if we created a new container
                if (me.game.mergeGroup === false) {
                    // add our container to the world
                    container.addChild(targetContainer);

                    // re-enable auto-sort
                    targetContainer.autoSort = true;
                }
            }

            // sort everything (recursively)
            container.sort(true);

            // re-enable auto-sort
            container.autoSort = true;

            // translate the display if required
            me.game.world.transform.translateV(me.game.currentLevel.pos);

            // fire the callback if defined
            if (me.game.onLevelLoaded) {
                me.game.onLevelLoaded.call(me.game.onLevelLoaded, level.name);
            }
            //publish the corresponding message
            me.event.publish(me.event.LEVEL_LOADED, [level.name]);
        };

        /*
         * PUBLIC STUFF
         */

        /**
         * reset the level director
         * @ignore
         */
        obj.reset = function () {};

        /**
         * add a level
         * @ignore
         */
        obj.addLevel = function () {
            throw "melonJS: no level loader defined";
        };

        /**
         *
         * add a TMX level
         * @ignore
         */
        obj.addTMXLevel = function (levelId, callback) {
            // just load the level with the XML stuff
            if (levels[levelId] == null) {
                //console.log("loading "+ levelId);
                levels[levelId] = new me.TMXTileMap(levelId);
                // set the name of the level
                levels[levelId].name = levelId;
                // level index
                levelIdx.push(levelId);
            }
            else  {
                //console.log("level %s already loaded", levelId);
                return false;
            }

            // call the callback if defined
            if (callback) {
                callback();
            }
            // true if level loaded
            return true;
        };

        /**
         * load a level into the game manager<br>
         * (will also create all level defined entities, etc..)
         * @name loadLevel
         * @memberOf me.levelDirector
         * @public
         * @function
         * @param {String} level level id
         * @example
         * // the game defined ressources
         * // to be preloaded by the loader
         * // TMX maps
         * ...
         * {name: "a4_level1",   type: "tmx",   src: "data/level/a4_level1.tmx"},
         * {name: "a4_level2",   type: "tmx",   src: "data/level/a4_level2.tmx"},
         * {name: "a4_level3",   type: "tmx",   src: "data/level/a4_level3.tmx"},
         * ...
         * ...
         * // load a level
         * me.levelDirector.loadLevel("a4_level1");
         */
        obj.loadLevel = function (levelId) {
            // make sure it's a string
            levelId = levelId.toString().toLowerCase();
            // throw an exception if not existing
            if (typeof(levels[levelId]) === "undefined") {
                throw ("melonJS: level " + levelId + " not found");
            }

            if (levels[levelId] instanceof me.TMXTileMap) {

                // check the status of the state mngr
                var wasRunning = me.state.isRunning();

                if (wasRunning) {
                    // stop the game loop to avoid
                    // some silly side effects
                    me.state.stop();
                }

                // reset the gameObject Manager (just in case!)
                me.game.reset();

                // reset the GUID generator
                // and pass the level id as parameter
                me.utils.resetGUID(levelId);

                // clean the current (previous) level
                if (levels[obj.getCurrentLevelId()]) {
                    levels[obj.getCurrentLevelId()].destroy();
                }

                // read the map data
                me.mapReader.readMap(levels[levelId]);

                // update current level index
                currentLevelIdx = levelIdx.indexOf(levelId);

                // add the specified level to the game world
                loadTMXLevel(levels[levelId], me.game.world);

                if (wasRunning) {
                    // resume the game loop if it was
                    // previously running
                    me.state.restart.defer(this);
                }
            }
            else {
                throw "melonJS: no level loader defined";
            }
            return true;
        };

        /**
         * return the current level id<br>
         * @name getCurrentLevelId
         * @memberOf me.levelDirector
         * @public
         * @function
         * @return {String}
         */
        obj.getCurrentLevelId = function () {
            return levelIdx[currentLevelIdx];
        };

        /**
         * reload the current level<br>
         * @name reloadLevel
         * @memberOf me.levelDirector
         * @public
         * @function
         */
        obj.reloadLevel = function () {
            // reset the level to initial state
            //levels[currentLevel].reset();
            return obj.loadLevel(obj.getCurrentLevelId());
        };

        /**
         * load the next level<br>
         * @name nextLevel
         * @memberOf me.levelDirector
         * @public
         * @function
         */
        obj.nextLevel = function () {
            //go to the next level
            if (currentLevelIdx + 1 < levelIdx.length) {
                return obj.loadLevel(levelIdx[currentLevelIdx + 1]);
            }
            else {
                return false;
            }
        };

        /**
         * load the previous level<br>
         * @name previousLevel
         * @memberOf me.levelDirector
         * @public
         * @function
         */
        obj.previousLevel = function () {
            // go to previous level
            if (currentLevelIdx - 1 >= 0) {
                return obj.loadLevel(levelIdx[currentLevelIdx - 1]);
            }
            else {
                return false;
            }
        };

        /**
         * return the amount of level preloaded<br>
         * @name levelCount
         * @memberOf me.levelDirector
         * @public
         * @function
         */
        obj.levelCount = function () {
            return levelIdx.length;
        };

        // return our object
        return obj;
    })();
})();

/**
 * @preserve Tween JS
 * https://github.com/sole/Tween.js
 */

/* jshint -W011 */
/* jshint -W013 */
/* jshint -W089 */
/* jshint -W093 */
/* jshint -W098 */
/* jshint -W108 */
/* jshint -W116 */

(function() {

	/**
	 * Javascript Tweening Engine<p>
	 * Super simple, fast and easy to use tweening engine which incorporates optimised Robert Penner's equation<p>
	 * <a href="https://github.com/sole/Tween.js">https://github.com/sole/Tween.js</a><p>
	 * author sole / http://soledadpenades.com<br>
	 * author mr.doob / http://mrdoob.com<br>
	 * author Robert Eisele / http://www.xarg.org<br>
	 * author Philippe / http://philippe.elsass.me<br>
	 * author Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html<br>
	 * author Paul Lewis / http://www.aerotwist.com/<br>
	 * author lechecacharro<br>
	 * author Josh Faul / http://jocafa.com/
	 * @class
	 * @memberOf me
	 * @constructor
	 * @param {Object} object object on which to apply the tween
	 * @example
	 * // add a tween to change the object pos.y variable to 200 in 3 seconds
	 * tween = new me.Tween(myObject.pos).to({y: 200}, 3000).onComplete(myFunc);
	 * tween.easing(me.Tween.Easing.Bounce.Out);
	 * tween.start();
	 */
	me.Tween = function ( object ) {

		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _yoyo = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = me.Tween.Easing.Linear.None;
		var _interpolationFunction = me.Tween.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;


		// Set all starting values present on the target object
		for ( var field in object ) {

			_valuesStart[ field ] = parseFloat(object[field], 10);

		}

		/**
		 * reset the tween object to default value
		 * @ignore
		 */
		this.onResetEvent = function ( object ) {
			_object = object;
			_valuesStart = {};
			_valuesEnd = {};
			_valuesStartRepeat = {};
			_easingFunction = me.Tween.Easing.Linear.None;
			_interpolationFunction = me.Tween.Interpolation.Linear;
			_yoyo = false;
			_reversed = false;
			_duration = 1000;
			_delayTime = 0;
			_onStartCallback = null;
			_onStartCallbackFired = false;
			_onUpdateCallback = null;
			_onCompleteCallback = null;
		};

		/**
		 * object properties to be updated and duration
		 * @name me.Tween#to
		 * @public
		 * @function
		 * @param {Object} properties hash of properties
		 * @param {Number} [duration=1000] tween duration
		 */
		this.to = function ( properties, duration ) {

			if ( duration !== undefined ) {

				_duration = duration;

			}

			_valuesEnd = properties;

			return this;

		};

		/**
		 * start the tween
		 * @name me.Tween#start
		 * @public
		 * @function
		 */
		this.start = function ( time ) {

			_onStartCallbackFired = false;

			// add the tween to the object pool on start
			me.game.world.addChild(this);

			_startTime = (typeof(time) === 'undefined' ? me.timer.getTime() : time) + _delayTime;

			for ( var property in _valuesEnd ) {

				// check if an Array was provided as property value
				if ( _valuesEnd[ property ] instanceof Array ) {

					if ( _valuesEnd[ property ].length === 0 ) {

						continue;

					}

					// create a local copy of the Array with the start value at the front
					_valuesEnd[ property ] = [ _object[ property ] ].concat( _valuesEnd[ property ] );

				}

				_valuesStart[ property ] = _object[ property ];

				if( ( _valuesStart[ property ] instanceof Array ) === false ) {
					_valuesStart[ property ] *= 1.0; // Ensures we're using numbers, not strings
				}

				_valuesStartRepeat[ property ] = _valuesStart[ property ] || 0;

			}

			return this;

		};

		/**
		 * stop the tween
		 * @name me.Tween#stop
		 * @public
		 * @function
		 */
		this.stop = function () {
			// ensure the tween has not been removed previously
			if (me.game.world.hasChild(this)) {
				me.game.world.removeChildNow(this);
			}
			return this;
		};

		/**
		 * delay the tween
		 * @name me.Tween#delay
		 * @public
		 * @function
		 * @param {Number} amount delay amount expressed in milliseconds
		 */
		this.delay = function ( amount ) {

			_delayTime = amount;
			return this;

		};

		/**
		 * Calculate delta to resume the tween
		 * @ignore
		 */
		me.event.subscribe(me.event.STATE_RESUME, function onResume(elapsed) {
			if (_startTime) {
				_startTime += elapsed;
			}
		});

		/**
		 * Repeat the tween
		 * @name me.Tween#repeat
		 * @public
		 * @function
		 * @param {Number} times amount of times the tween should be repeated
		 */
		this.repeat = function ( times ) {

			_repeat = times;
			return this;

		};

		/**
		 * allows the tween to bounce back to their original value when finished
		 * @name me.Tween#yoyo
		 * @public
		 * @function
		 * @param {Boolean} yoyo
		 */
		this.yoyo = function( yoyo ) {

			_yoyo = yoyo;
			return this;

		};

		/**
		 * set the easing function
		 * @name me.Tween#easing
		 * @public
		 * @function
		 * @param {me.Tween#Easing} easing easing function
		 */
		this.easing = function ( easing ) {
			if (typeof easing !== 'function') {
				throw "melonJS: invalid easing function for me.Tween.easing()";
			}
			_easingFunction = easing;
			return this;

		};

		/**
		 * set the interpolation function
		 * @name me.Tween#interpolation
		 * @public
		 * @function
		 * @param {me.Tween#Interpolation} easing easing function
		 */
		this.interpolation = function ( interpolation ) {

			_interpolationFunction = interpolation;
			return this;

		};

		/**
		 * chain the tween
		 * @name me.Tween#chain
		 * @public
		 * @function
		 * @param {me.Tween} chainedTween Tween to be chained
		 */
		this.chain = function () {

			_chainedTweens = arguments;
			return this;

		};

		/**
		 * onStart callback
		 * @name me.Tween#onStart
		 * @public
		 * @function
		 * @param {Function} onStartCallback callback
		 */
		this.onStart = function ( callback ) {

			_onStartCallback = callback;
			return this;

		};

		/**
		 * onUpdate callback
		 * @name me.Tween#onUpdate
		 * @public
		 * @function
		 * @param {Function} onUpdateCallback callback
		 */
		this.onUpdate = function ( callback ) {

			_onUpdateCallback = callback;
			return this;

		};

		/**
		 * onComplete callback
		 * @name me.Tween#onComplete
		 * @public
		 * @function
		 * @param {Function} onCompleteCallback callback
		 */
		this.onComplete = function ( callback ) {

			_onCompleteCallback = callback;
			return this;

		};

		/** @ignore*/
		this.update = function ( dt ) {

			// the original Tween implementation expect
			// a timestamp and not a time delta
			var time = me.timer.getTime();

			var property;

			if ( time < _startTime ) {

				return true;

			}

			if ( _onStartCallbackFired === false ) {

				if ( _onStartCallback !== null ) {

					_onStartCallback.call( _object );

				}

				_onStartCallbackFired = true;

			}

			var elapsed = ( time - _startTime ) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;

			var value = _easingFunction( elapsed );

			for ( property in _valuesEnd ) {

				var start = _valuesStart[ property ] || 0;
				var end = _valuesEnd[ property ];

				if ( end instanceof Array ) {

					_object[ property ] = _interpolationFunction( end, value );

				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if ( typeof(end) === "string" ) {
						end = start + parseFloat(end, 10);
					}

					// protect against non numeric properties.
					if ( typeof(end) === "number" ) {
						_object[ property ] = start + ( end - start ) * value;
					}

				}

			}

			if ( _onUpdateCallback !== null ) {

				_onUpdateCallback.call( _object, value );

			}

			if ( elapsed === 1 ) {

				if ( _repeat > 0 ) {

					if( isFinite( _repeat ) ) {
						_repeat--;
					}

					// reassign starting values, restart by making startTime = now
					for( property in _valuesStartRepeat ) {

						if ( typeof( _valuesEnd[ property ] ) === "string" ) {
							_valuesStartRepeat[ property ] = _valuesStartRepeat[ property ] + parseFloat(_valuesEnd[ property ], 10);
						}

						if (_yoyo) {
							var tmp = _valuesStartRepeat[ property ];
							_valuesStartRepeat[ property ] = _valuesEnd[ property ];
							_valuesEnd[ property ] = tmp;
							_reversed = !_reversed;
						}
						_valuesStart[ property ] = _valuesStartRepeat[ property ];

					}

					_startTime = time + _delayTime;

					return true;

				} else {
					// remove the tween from the object pool
					me.game.world.removeChildNow(this);

					if ( _onCompleteCallback !== null ) {

						_onCompleteCallback.call( _object );

					}

					for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i ++ ) {

						_chainedTweens[ i ].start( time );

					}

					return false;

				}

			}

			return true;

		};

	};

	/**
	 * Easing Function :<br>
	 * <p>
	 * me.Tween.Easing.Linear.None<br>
	 * me.Tween.Easing.Quadratic.In<br>
	 * me.Tween.Easing.Quadratic.Out<br>
	 * me.Tween.Easing.Quadratic.InOut<br>
	 * me.Tween.Easing.Cubic.In<br>
	 * me.Tween.Easing.Cubic.Out<br>
	 * me.Tween.Easing.Cubic.InOut<br>
	 * me.Tween.Easing.Quartic.In<br>
	 * me.Tween.Easing.Quartic.Out<br>
	 * me.Tween.Easing.Quartic.InOut<br>
	 * me.Tween.Easing.Quintic.In<br>
	 * me.Tween.Easing.Quintic.Out<br>
	 * me.Tween.Easing.Quintic.InOut<br>
	 * me.Tween.Easing.Sinusoidal.In<br>
	 * me.Tween.Easing.Sinusoidal.Out<br>
	 * me.Tween.Easing.Sinusoidal.InOut<br>
	 * me.Tween.Easing.Exponential.In<br>
	 * me.Tween.Easing.Exponential.Out<br>
	 * me.Tween.Easing.Exponential.InOut<br>
	 * me.Tween.Easing.Circular.In<br>
	 * me.Tween.Easing.Circular.Out<br>
	 * me.Tween.Easing.Circular.InOut<br>
	 * me.Tween.Easing.Elastic.In<br>
	 * me.Tween.Easing.Elastic.Out<br>
	 * me.Tween.Easing.Elastic.InOut<br>
	 * me.Tween.Easing.Back.In<br>
	 * me.Tween.Easing.Back.Out<br>
	 * me.Tween.Easing.Back.InOut<br>
	 * me.Tween.Easing.Bounce.In<br>
	 * me.Tween.Easing.Bounce.Out<br>
	 * me.Tween.Easing.Bounce.InOut
	 * </p>
	 * @public
	 * @constant
	 * @type enum
	 * @name me.Tween#Easing
	 */
	me.Tween.Easing = {

		Linear: {
			/** @ignore */
			None: function ( k ) {

				return k;

			}

		},

		Quadratic: {
			/** @ignore */
			In: function ( k ) {

				return k * k;

			},
			/** @ignore */
			Out: function ( k ) {

				return k * ( 2 - k );

			},
			/** @ignore */
			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
				return - 0.5 * ( --k * ( k - 2 ) - 1 );

			}

		},

		Cubic: {
			/** @ignore */
			In: function ( k ) {

				return k * k * k;

			},
			/** @ignore */
			Out: function ( k ) {

				return --k * k * k + 1;

			},
			/** @ignore */
			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
				return 0.5 * ( ( k -= 2 ) * k * k + 2 );

			}

		},

		Quartic: {
			/** @ignore */
			In: function ( k ) {

				return k * k * k * k;

			},
			/** @ignore */
			Out: function ( k ) {

				return 1 - ( --k * k * k * k );

			},
			/** @ignore */
			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
				return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

			}

		},

		Quintic: {
			/** @ignore */
			In: function ( k ) {

				return k * k * k * k * k;

			},
			/** @ignore */
			Out: function ( k ) {

				return --k * k * k * k * k + 1;

			},
			/** @ignore */
			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
				return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

			}

		},

		Sinusoidal: {
			/** @ignore */
			In: function ( k ) {

				return 1 - Math.cos( k * Math.PI / 2 );

			},
			/** @ignore */
			Out: function ( k ) {

				return Math.sin( k * Math.PI / 2 );

			},
			/** @ignore */
			InOut: function ( k ) {

				return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

			}

		},

		Exponential: {
			/** @ignore */
			In: function ( k ) {

				return k === 0 ? 0 : Math.pow( 1024, k - 1 );

			},
			/** @ignore */
			Out: function ( k ) {

				return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

			},
			/** @ignore */
			InOut: function ( k ) {

				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
				return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

			}

		},

		Circular: {
			/** @ignore */
			In: function ( k ) {

				return 1 - Math.sqrt( 1 - k * k );

			},
			/** @ignore */
			Out: function ( k ) {

				return Math.sqrt( 1 - ( --k * k ) );

			},
			/** @ignore */
			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
				return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

			}

		},

		Elastic: {
			/** @ignore */
			In: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

			},
			/** @ignore */
			Out: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

			},
			/** @ignore */
			InOut: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
				return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

			}

		},

		Back: {
			/** @ignore */
			In: function ( k ) {

				var s = 1.70158;
				return k * k * ( ( s + 1 ) * k - s );

			},
			/** @ignore */
			Out: function ( k ) {

				var s = 1.70158;
				return --k * k * ( ( s + 1 ) * k + s ) + 1;

			},
			/** @ignore */
			InOut: function ( k ) {

				var s = 1.70158 * 1.525;
				if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
				return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

			}

		},

		Bounce: {
			/** @ignore */
			In: function ( k ) {

				return 1 - me.Tween.Easing.Bounce.Out( 1 - k );

			},
			/** @ignore */
			Out: function ( k ) {

				if ( k < ( 1 / 2.75 ) ) {

					return 7.5625 * k * k;

				} else if ( k < ( 2 / 2.75 ) ) {

					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

				} else if ( k < ( 2.5 / 2.75 ) ) {

					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

				} else {

					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

				}

			},
			/** @ignore */
			InOut: function ( k ) {

				if ( k < 0.5 ) return me.Tween.Easing.Bounce.In( k * 2 ) * 0.5;
				return me.Tween.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

			}

		}

	};

	/* Interpolation Function :<br>
	 * <p>
	 * me.Tween.Interpolation.Linear<br>
	 * me.Tween.Interpolation.Bezier<br>
	 * me.Tween.Interpolation.CatmullRom<br>
	 * </p>
	 * @public
	 * @constant
	 * @type enum
	 * @name me.Tween#Interpolation
	 */
	me.Tween.Interpolation = {
		/** @ignore */
		Linear: function ( v, k ) {

			var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = me.Tween.Interpolation.Utils.Linear;

			if ( k < 0 ) return fn( v[ 0 ], v[ 1 ], f );
			if ( k > 1 ) return fn( v[ m ], v[ m - 1 ], m - f );

			return fn( v[ i ], v[ i + 1 > m ? m : i + 1 ], f - i );

		},
		/** @ignore */
		Bezier: function ( v, k ) {

			var b = 0, n = v.length - 1, pw = Math.pow, bn = me.Tween.Interpolation.Utils.Bernstein, i;

			for ( i = 0; i <= n; i++ ) {
				b += pw( 1 - k, n - i ) * pw( k, i ) * v[ i ] * bn( n, i );
			}

			return b;

		},
		/** @ignore */
		CatmullRom: function ( v, k ) {

			var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = me.Tween.Interpolation.Utils.CatmullRom;

			if ( v[ 0 ] === v[ m ] ) {

				if ( k < 0 ) i = Math.floor( f = m * ( 1 + k ) );

				return fn( v[ ( i - 1 + m ) % m ], v[ i ], v[ ( i + 1 ) % m ], v[ ( i + 2 ) % m ], f - i );

			} else {

				if ( k < 0 ) return v[ 0 ] - ( fn( v[ 0 ], v[ 0 ], v[ 1 ], v[ 1 ], -f ) - v[ 0 ] );
				if ( k > 1 ) return v[ m ] - ( fn( v[ m ], v[ m ], v[ m - 1 ], v[ m - 1 ], f - m ) - v[ m ] );

				return fn( v[ i ? i - 1 : 0 ], v[ i ], v[ m < i + 1 ? m : i + 1 ], v[ m < i + 2 ? m : i + 2 ], f - i );

			}

		},

		Utils: {
			/** @ignore */
			Linear: function ( p0, p1, t ) {

				return ( p1 - p0 ) * t + p0;

			},
			/** @ignore */
			Bernstein: function ( n , i ) {

				var fc = me.Tween.Interpolation.Utils.Factorial;
				return fc( n ) / fc( i ) / fc( n - i );

			},
			/** @ignore */
			Factorial: ( function () {

				var a = [ 1 ];

				return function ( n ) {

					var s = 1, i;
					if ( a[ n ] ) return a[ n ];
					for ( i = n; i > 1; i-- ) s *= i;
					return a[ n ] = s;

				};

			} )(),
			/** @ignore */
			CatmullRom: function ( p0, p1, p2, p3, t ) {

				var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
				return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

			}

		}

	};

})();

/**
 * @preserve MinPubSub
 * a micro publish/subscribe messaging framework
 * @see https://github.com/daniellmb/MinPubSub
 * @author Daniel Lamb <daniellmb.com>
 *
 * Released under the MIT License
 */
(function () {
    /**
     * There is no constructor function for me.event
     * @namespace me.event
     * @memberOf me
     */
    me.event = (function () {
        // hold public stuff inside the singleton
        var obj = {};

        /**
         * the channel/subscription hash
         * @ignore
         */
        var cache = {};

        /*
         * PUBLIC
         */

        /**
         * Channel Constant when the game is paused <br>
         * Data passed : none <br>
         * @public
         * @constant
         * @type String
         * @name me.event#STATE_PAUSE
         */
        obj.STATE_PAUSE = "me.state.onPause";

        /**
         * Channel Constant for when the game is resumed <br>
         * Data passed : {Number} time in ms the game was paused
         * @public
         * @constant
         * @type String
         * @name me.event#STATE_RESUME
         */
        obj.STATE_RESUME = "me.state.onResume";

        /**
         * Channel Constant when the game is stopped <br>
         * Data passed : none <br>
         * @public
         * @constant
         * @type String
         * @name me.event#STATE_STOP
         */
        obj.STATE_STOP = "me.state.onStop";

        /**
         * Channel Constant for when the game is restarted <br>
         * Data passed : {Number} time in ms the game was stopped
         * @public
         * @constant
         * @type String
         * @name me.event#STATE_RESTART
         */
        obj.STATE_RESTART = "me.state.onRestart";

        /**
         * Channel Constant for when the game manager is initialized <br>
         * Data passed : none <br>
         * @public
         * @constant
         * @type String
         * @name me.event#GAME_INIT
         */
        obj.GAME_INIT = "me.game.onInit";

        /**
         * Channel Constant for when a level is loaded <br>
         * Data passed : {String} Level Name
         * @public
         * @constant
         * @type String
         * @name me.event#LEVEL_LOADED
         */
        obj.LEVEL_LOADED = "me.game.onLevelLoaded";

        /**
         * Channel Constant for when everything has loaded <br>
         * Data passed : none <br>
         * @public
         * @constant
         * @type String
         * @name me.event#LOADER_COMPLETE
         */
        obj.LOADER_COMPLETE = "me.loader.onload";

        /**
         * Channel Constant for displaying a load progress indicator <br>
         * Data passed : {Number} [0 .. 1], {Resource} resource object<br>
         * @public
         * @constant
         * @type String
         * @name me.event#LOADER_PROGRESS
         */
        obj.LOADER_PROGRESS = "me.loader.onProgress";

        /**
         * Channel Constant for pressing a binded key <br>
         * Data passed : {String} user-defined action, {Number} keyCode,
         * {Boolean} edge state <br>
         * Edge-state is for detecting "locked" key bindings. When a locked key
         * is pressed and held, the first event will have have the third
         * argument set true. subsequent events will continue firing with the
         * third argument set false.
         * @public
         * @constant
         * @type String
         * @name me.event#KEYDOWN
         * @example
         * me.input.bindKey(me.input.KEY.X, "jump", true); // Edge-triggered
         * me.input.bindKey(me.input.KEY.Z, "shoot"); // Level-triggered
         * me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
         *   // Checking bound keys
         *   if (action === "jump") {
         *       if (edge) {
         *           this.doJump();
         *       }
         *
         *       // Make character fall slower when holding the jump key
         *       this.vel.y = this.gravity;
         *   }
         * });
         */
        obj.KEYDOWN = "me.input.keydown";

        /**
         * Channel Constant for releasing a binded key <br>
         * Data passed : {String} user-defined action, {Number} keyCode <br>
         * @public
         * @constant
         * @type String
         * @name me.event#KEYUP
         * @example
         * me.event.subscribe(me.event.KEYUP, function (action, keyCode) {
         *   // Checking unbound keys
         *   if (keyCode == me.input.KEY.ESC) {
         *       if (me.state.isPaused()) {
         *           me.state.resume();
         *       }
         *       else {
         *           me.state.pause();
         *       }
         *   }
         * });
         */
        obj.KEYUP = "me.input.keyup";

        /**
         * Channel Constant for mousemove or dragmove events on the game viewport <br>
         * Data passed : {Object} the mousemove or dragmove event <br>
         * @public
         * @constant
         * @type String
         * @name me.event#MOUSEMOVE
         */
        obj.MOUSEMOVE = "me.game.pointermove";

        /**
         * Channel Constant for dragstart events on a Draggable entity <br>
         * Data passed:
         * {Object} the drag event <br>
         * {Object} the Draggable entity <br>
         * @public
         * @constant
         * @type String
         * @name me.event#DRAGSTART
         */
        obj.DRAGSTART = "me.game.dragstart";

        /**
         * Channel Constant for dragend events on a Draggable entity <br>
         * Data passed:
         * {Object} the drag event <br>
         * {Object} the Draggable entity <br>
         * @public
         * @constant
         * @type String
         * @name me.event#DRAGEND
         */
        obj.DRAGEND = "me.game.dragend";

        /**
         * Channel Constant for when the (browser) window is resized <br>
         * Data passed : {Event} Event object <br>
         * @public
         * @constant
         * @type String
         * @name me.event#WINDOW_ONRESIZE
         */
        obj.WINDOW_ONRESIZE = "window.onresize";

        /**
         * Channel Constant for when the device is rotated <br>
         * Data passed : {Event} Event object <br>
         * @public
         * @constant
         * @type String
         * @name me.event#WINDOW_ONORIENTATION_CHANGE
         */
        obj.WINDOW_ONORIENTATION_CHANGE = "window.orientationchange";

        /**
         * Channel Constant for when the (browser) window is scrolled <br>
         * Data passed : {Event} Event object <br>
         * @public
         * @constant
         * @type String
         * @name me.event#WINDOW_ONSCROLL
         */
        obj.WINDOW_ONSCROLL = "window.onscroll";

        /**
         * Channel Constant for when the viewport position is updated <br>
         * Data passed : {me.Vector2d} viewport position vector <br>
         * @public
         * @constant
         * @type String
         * @name me.event#VIEWPORT_ONCHANGE
         */
        obj.VIEWPORT_ONCHANGE = "viewport.onchange";

        /**
         * Publish some data on a channel
         * @name me.event#publish
         * @public
         * @function
         * @param {String} channel The channel to publish on
         * @param {Array} arguments The data to publish
         *
         * @example Publish stuff on '/some/channel'.
         * Anything subscribed will be called with a function
         * signature like: function (a,b,c){ ... }
         *
         * me.event.publish("/some/channel", ["a","b","c"]);
         *
         */
        obj.publish = function (channel, args) {
            var subs = cache[channel],
                len = subs ? subs.length : 0;

            //can change loop or reverse array if the order matters
            while (len--) {
                subs[len].apply(window, args || []); // is window correct here?
            }
        };

        /**
         * Register a callback on a named channel.
         * @name me.event#subscribe
         * @public
         * @function
         * @param {String} channel The channel to subscribe to
         * @param {Function} callback The event handler, any time something is
         * published on a subscribed channel, the callback will be called
         * with the published array as ordered arguments
         * @return {handle} A handle which can be used to unsubscribe this
         * particular subscription
         * @example
         * me.event.subscribe("/some/channel", function (a, b, c){ doSomething(); });
         */

        obj.subscribe = function (channel, callback) {
            if (!cache[channel]) {
                cache[channel] = [];
            }
            cache[channel].push(callback);
            return [ channel, callback ]; // Array
        };

        /**
         * Disconnect a subscribed function for a channel.
         * @name me.event#unsubscribe
         * @public
         * @function
         * @param {Array|String} handle The return value from a subscribe call or the
         * name of a channel as a String
         * @param {Function} [callback] The callback to be unsubscribed.
         * @example
         * var handle = me.event.subscribe("/some/channel", function (){});
         * me.event.unsubscribe(handle);
         *
         * // Or alternatively ...
         *
         * var callback = function (){};
         * me.event.subscribe("/some/channel", callback);
         * me.event.unsubscribe("/some/channel", callback);
         */
        obj.unsubscribe = function (handle, callback) {
            var subs = cache[callback ? handle : handle[0]],
                len = subs ? subs.length : 0;

            callback = callback || handle[1];

            while (len--) {
                if (subs[len] === callback) {
                    subs.splice(len, 1);
                }
            }
        };

        // return our object
        return obj;
    })();
})();

/*!
 *  howler.js v1.1.18.1 (custom melonJS version)
 *  howlerjs.com
 *
 *  (c) 2013-2014, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

/* jshint -W013 */
/* jshint -W015 */
/* jshint -W031 */
/* jshint -W083 */
/* jshint -W098 */
/* jshint -W108 */
/* jshint -W116 */

(function() {
  // setup
  var cache = {};

  // setup the audio context
  var ctx = null,
    usingWebAudio = true,
    noAudio = false;
  try {
    if (typeof AudioContext !== 'undefined') {
      ctx = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
      ctx = new webkitAudioContext();
    } else {
      usingWebAudio = false;
    }
  } catch(e) {
    usingWebAudio = false;
  }

  if (!usingWebAudio) {
    if (typeof Audio !== 'undefined') {
      try {
        new Audio();
      } catch(e) {
        noAudio = true;
      }
    } else {
      noAudio = true;
    }
  }

  // create a master gain node
  if (usingWebAudio) {
    var masterGain = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
  }

  // create global controller
  var HowlerGlobal = function() {
    this._volume = 1;
    this._muted = false;
    this.usingWebAudio = usingWebAudio;
    this.noAudio = noAudio;
    this._howls = [];
  };
  HowlerGlobal.prototype = {
    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function(vol) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        if (usingWebAudio) {
          masterGain.gain.value = vol;
        }

        // loop through cache and change volume of all nodes that are using HTML5 Audio
        for (var key in self._howls) {
          if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
            // loop through the audio nodes
            for (var i=0; i<self._howls[key]._audioNode.length; i++) {
              self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
            }
          }
        }

        return self;
      }

      // return the current global volume
      return (usingWebAudio) ? masterGain.gain.value : self._volume;
    },

    /**
     * Mute all sounds.
     * @return {Howler}
     */
    mute: function() {
      this._setMuted(true);

      return this;
    },

    /**
     * Unmute all sounds.
     * @return {Howler}
     */
    unmute: function() {
      this._setMuted(false);

      return this;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    _setMuted: function(muted) {
      var self = this;

      self._muted = muted;

      if (usingWebAudio) {
        masterGain.gain.value = muted ? 0 : self._volume;
      }

      for (var key in self._howls) {
        if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
          // loop through the audio nodes
          for (var i=0; i<self._howls[key]._audioNode.length; i++) {
            self._howls[key]._audioNode[i].muted = muted;
          }
        }
      }
    }
  };

  // allow access to the global audio controls
  var Howler = new HowlerGlobal();

  // check for browser codec support
  var audioTest = null;
  if (!noAudio) {
    audioTest = new Audio();
    var codecs = {
      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
    };
  }

  // setup the audio object
  var Howl = function(o) {
    var self = this;

    // setup the defaults
    self._autoplay = o.autoplay || false;
    self._buffer = o.buffer || false;
    self._duration = o.duration || 0;
    self._format = o.format || null;
    self._loop = o.loop || false;
    self._loaded = false;
    self._sprite = o.sprite || {};
    self._src = o.src || '';
    self._pos3d = o.pos3d || [0, 0, -0.5];
    self._volume = o.volume !== undefined ? o.volume : 1;
    self._urls = o.urls || [];
    self._rate = o.rate || 1;

    // setup event functions
    self._onload = [o.onload || function() {}];
    self._onloaderror = [o.onloaderror || function() {}];
    self._onend = [o.onend || function() {}];
    self._onpause = [o.onpause || function() {}];
    self._onplay = [o.onplay || function() {}];

    self._onendTimer = [];

    // Web Audio or HTML5 Audio?
    self._webAudio = usingWebAudio && !self._buffer;

    // check if we need to fall back to HTML5 Audio
    self._audioNode = [];
    if (self._webAudio) {
      self._setupAudioNode();
    }

    // add this to an array of Howl's to allow global control
    Howler._howls.push(self);

    // load the track
    self.load();
  };

  // setup all of the methods
  Howl.prototype = {
    /**
     * Load an audio file.
     * @return {Howl}
     */
    load: function() {
      var self = this,
        url = null;

      // if no audio is available, quit immediately
      if (noAudio) {
        self.on('loaderror');
        return;
      }

      // loop through source URLs and pick the first one that is compatible
      for (var i=0; i<self._urls.length; i++) {
        var ext, urlItem;

        if (self._format) {
          // use specified audio format if available
          ext = self._format;
        } else {
          // figure out the filetype (whether an extension or base64 data)
          urlItem = self._urls[i].toLowerCase().split('?')[0];
          ext = urlItem.match(/.+\.([^?]+)(\?|$)/);
          ext = (ext && ext.length >= 2) ? ext : urlItem.match(/data\:audio\/([^?]+);/);

          if (ext) {
            ext = ext[1];
          } else {
            self.on('loaderror');
            return;
          }
        }

        if (codecs[ext]) {
          url = self._urls[i];
          break;
        }
      }

      if (!url) {
        self.on('loaderror');
        return;
      }

      self._src = url;

      if (self._webAudio) {
        loadBuffer(self, url);
      } else {
        var newNode = new Audio();

        // listen for errors with HTML5 audio (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror)
        newNode.addEventListener('error', function () {
          if (newNode.error && newNode.error.code === 4) {
            HowlerGlobal.noAudio = true;
          }

          self.on('loaderror', {type: newNode.error ? newNode.error.code : 0});
        }, false);

        self._audioNode.push(newNode);

        // setup the new audio node
        newNode.src = url;
        newNode._pos = 0;
        newNode.preload = 'auto';
        newNode.volume = (Howler._muted) ? 0 : self._volume * Howler.volume();

        // add this sound to the cache
        cache[url] = self;

        // setup the event listener to start playing the sound
        // as soon as it has buffered enough
        var listener = function() {
          // round up the duration when using HTML5 Audio to account for the lower precision
          self._duration = Math.ceil(newNode.duration * 10) / 10;

          // setup a sprite if none is defined
          if (Object.getOwnPropertyNames(self._sprite).length === 0) {
            self._sprite = {_default: [0, self._duration * 1000]};
          }

          if (!self._loaded) {
            self._loaded = true;
            self.on('load');
          }

          if (self._autoplay) {
            self.play();
          }

          // clear the event listener
          newNode.removeEventListener('canplaythrough', listener, false);
        };
        newNode.addEventListener('canplaythrough', listener, false);
        newNode.load();
      }

      return self;
    },

    /**
     * Get/set the URLs to be pulled from to play in this source.
     * @param  {Array} urls  Arry of URLs to load from
     * @return {Howl}        Returns self or the current URLs
     */
    urls: function(urls) {
      var self = this;

      if (urls) {
        self.stop();
        self._urls = (typeof urls === 'string') ? [urls] : urls;
        self._loaded = false;
        self.load();

        return self;
      } else {
        return self._urls;
      }
    },

    /**
     * Play a sound from the current time (0 by default).
     * @param  {String}   sprite   (optional) Plays from the specified position in the sound sprite definition.
     * @param  {Function} callback (optional) Returns the unique playback id for this sound instance.
     * @return {Howl}
     */
    play: function(sprite, callback) {
      var self = this;

      // if no sprite was passed but a callback was, update the variables
      if (typeof sprite === 'function') {
        callback = sprite;
      }

      // use the default sprite if none is passed
      if (!sprite || typeof sprite === 'function') {
        sprite = '_default';
      }

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.play(sprite, callback);
        });

        return self;
      }

      // if the sprite doesn't exist, play nothing
      if (!self._sprite[sprite]) {
        if (typeof callback === 'function') callback();
        return self;
      }

      // get the node to playback
      self._inactiveNode(function(node) {
        // persist the sprite being played
        node._sprite = sprite;

        // determine where to start playing from
        var pos = (node._pos > 0) ? node._pos : self._sprite[sprite][0] / 1000,
          duration = self._sprite[sprite][1] / 1000 - node._pos;

        // determine if this sound should be looped
        var loop = !!(self._loop || self._sprite[sprite][2]);

        // set timer to fire the 'onend' event
        var soundId = (typeof callback === 'string') ? callback : Math.round(Date.now() * Math.random()) + '',
          timerId;
        (function() {
          var data = {
            id: soundId,
            sprite: sprite,
            loop: loop
          };
          timerId = setTimeout(function() {
            // if looping, restart the track
            if (!self._webAudio && loop) {
              self.stop(data.id, data.timer).play(sprite, data.id);
            }

            // set web audio node to paused at end
            if (self._webAudio && !loop) {
              self._nodeById(data.id).paused = true;
              self._nodeById(data.id)._pos = 0;
            }

            // end the track if it is HTML audio and a sprite
            if (!self._webAudio && !loop) {
              self.stop(data.id, data.timer);
            }

            // fire ended event
            self.on('end', soundId);
          }, duration * 1000);

          // store the reference to the timer
          self._onendTimer.push(timerId);

          // remember which timer to cancel
          data.timer = self._onendTimer[self._onendTimer.length - 1];
        })();

        if (self._webAudio) {
          var loopStart = self._sprite[sprite][0] / 1000,
            loopEnd = self._sprite[sprite][1] / 1000;

          // set the play id to this node and load into context
          node.id = soundId;
          node.paused = false;
          refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
          self._playStart = ctx.currentTime;
          node.gain.value = self._volume;

          if (typeof node.bufferSource.start === 'undefined') {
            node.bufferSource.noteGrainOn(0, pos, duration);
          } else {
            node.bufferSource.start(0, pos, duration);
          }
        } else {
          if (node.readyState === 4 || navigator.isCocoonJS) {
            node.readyState = 4;
            node.id = soundId;
            node.currentTime = pos;
            node.muted = Howler._muted || node.muted;
            node.volume = self._volume * Howler.volume();
            setTimeout(function() { node.play(); }, 0);
          } else {
            self._clearEndTimer(timerId);

            (function(){
              var sound = self,
                playSprite = sprite,
                fn = callback,
                newNode = node;
              var listener = function() {
                sound.play(playSprite, fn);

                // clear the event listener
                newNode.removeEventListener('canplaythrough', listener, false);
              };
              newNode.addEventListener('canplaythrough', listener, false);
            })();

            return self;
          }
        }

        // fire the play event and send the soundId back in the callback
        self.on('play');
        if (typeof callback === 'function') callback(soundId);

        return self;
      });

      return self;
    },

    /**
     * Pause playback and save the current position.
     * @param {String} id (optional) The play instance ID.
     * @param {String} timerId (optional) Clear the correct timeout ID.
     * @return {Howl}
     */
    pause: function(id, timerId) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pause(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(timerId || 0);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = self.pos(null, id);

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;
          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else {
          activeNode.pause();
        }
      }

      self.on('pause');

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {String} id  (optional) The play instance ID.
     * @param  {String} timerId  (optional) Clear the correct timeout ID.
     * @return {Howl}
     */
    stop: function(id, timerId) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.stop(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(timerId || 0);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = 0;

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;

          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else {
          activeNode.pause();
          activeNode.currentTime = 0;
        }
      }

      return self;
    },

    /**
     * Mute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    mute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.mute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = 0;
        } else {
          activeNode.muted = true;
        }
      }

      return self;
    },

    /**
     * Unmute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    unmute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.unmute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = self._volume;
        } else {
          activeNode.muted = false;
        }
      }

      return self;
    },

    /**
     * Get/set volume of this sound.
     * @param  {Float}  vol Volume from 0.0 to 1.0.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}     Returns self or current volume.
     */
    volume: function(vol, id) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        // if the sound hasn't been loaded, add it to the event queue
        if (!self._loaded) {
          self.on('play', function() {
            self.volume(vol, id);
          });

          return self;
        }

        var activeNode = (id) ? self._nodeById(id) : self._activeNode();
        if (activeNode) {
          if (self._webAudio) {
            activeNode.gain.value = vol;
          } else {
            activeNode.volume = vol * Howler.volume();
          }
        }

        return self;
      } else {
        return self._volume;
      }
    },

    /**
     * Get/set whether to loop the sound.
     * @param  {Boolean} loop To loop or not to loop, that is the question.
     * @return {Howl/Boolean}      Returns self or current looping value.
     */
    loop: function(loop) {
      var self = this;

      if (typeof loop === 'boolean') {
        self._loop = loop;

        return self;
      } else {
        return self._loop;
      }
    },

    /**
     * Get/set sound sprite definition.
     * @param  {Object} sprite Example: {spriteName: [offset, duration, loop]}
     *                @param {Integer} offset   Where to begin playback in milliseconds
     *                @param {Integer} duration How long to play in milliseconds
     *                @param {Boolean} loop     (optional) Set true to loop this sprite
     * @return {Howl}        Returns current sprite sheet or self.
     */
    sprite: function(sprite) {
      var self = this;

      if (typeof sprite === 'object') {
        self._sprite = sprite;

        return self;
      } else {
        return self._sprite;
      }
    },

    /**
     * Get/set the position of playback.
     * @param  {Float}  pos The position to move current playback to.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}      Returns self or current playback position.
     */
    pos: function(pos, id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.pos(pos);
        });

        return typeof pos === 'number' ? self : self._pos || 0;
      }

      // make sure we are dealing with a number for pos
      pos = parseFloat(pos);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (pos >= 0) {
          self.pause(id);
          activeNode._pos = pos;
          self.play(activeNode._sprite, id);

          return self;
        } else {
          return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
        }
      } else if (pos >= 0) {
        return self;
      } else {
        // find the first inactive node to return the pos for
        for (var i=0; i<self._audioNode.length; i++) {
          if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
            return (self._webAudio) ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
          }
        }
      }
    },

    /**
     * Get/set the 3D position of the audio source.
     * The most common usage is to set the 'x' position
     * to affect the left/right ear panning. Setting any value higher than
     * 1.0 will begin to decrease the volume of the sound as it moves further away.
     * NOTE: This only works with Web Audio API, HTML5 Audio playback
     * will not be affected.
     * @param  {Float}  x  The x-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  y  The y-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  z  The z-position of the playback from -1000.0 to 1000.0
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl/Array}   Returns self or the current 3D position: [x, y, z]
     */
    pos3d: function(x, y, z, id) {
      var self = this;

      // set a default for the optional 'y' & 'z'
      y = (typeof y === 'undefined' || !y) ? 0 : y;
      z = (typeof z === 'undefined' || !z) ? -0.5 : z;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pos3d(x, y, z, id);
        });

        return self;
      }

      if (x >= 0 || x < 0) {
        if (self._webAudio) {
          var activeNode = (id) ? self._nodeById(id) : self._activeNode();
          if (activeNode) {
            self._pos3d = [x, y, z];
            activeNode.panner.setPosition(x, y, z);
          }
        }
      } else {
        return self._pos3d;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes.
     * @param  {Number}   from     The volume to fade from (0.0 to 1.0).
     * @param  {Number}   to       The volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback (optional) Fired when the fade is complete.
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fade: function(from, to, len, callback, id) {
      var self = this,
        diff = Math.abs(from - to),
        dir = from > to ? 'down' : 'up',
        steps = diff / 0.01,
        stepTime = len / steps;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.fade(from, to, len, callback, id);
        });

        return self;
      }

      // set the volume to the start position
      self.volume(from, id);

      for (var i=1; i<=steps; i++) {
        (function() {
          var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
            vol = Math.round(1000 * change) / 1000,
            toVol = to;

          setTimeout(function() {
            self.volume(vol, id);

            if (vol === toVol) {
              if (callback) callback();
            }
          }, stepTime * i);
        })();
      }
    },

    /**
     * [DEPRECATED] Fade in the current sound.
     * @param  {Float}    to      Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len     Time in milliseconds to fade.
     * @param  {Function} callback
     * @return {Howl}
     */
    fadeIn: function(to, len, callback) {
      return this.volume(0).play().fade(0, to, len, callback);
    },

    /**
     * [DEPRECATED] Fade out the current sound and pause when finished.
     * @param  {Float}    to       Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fadeOut: function(to, len, callback, id) {
      var self = this;

      return self.fade(self._volume, to, len, function() {
        if (callback) callback();
        self.pause(id);

        // fire ended event
        self.on('end');
      }, id);
    },

    /**
     * Get an audio node by ID.
     * @return {Howl} Audio node.
     */
    _nodeById: function(id) {
      var self = this,
        node = self._audioNode[0];

      // find the node with this ID
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].id === id) {
          node = self._audioNode[i];
          break;
        }
      }

      return node;
    },

    /**
     * Get the first active audio node.
     * @return {Howl} Audio node.
     */
    _activeNode: function() {
      var self = this,
        node = null;

      // find the first playing node
      for (var i=0; i<self._audioNode.length; i++) {
        if (!self._audioNode[i].paused) {
          node = self._audioNode[i];
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      return node;
    },

    /**
     * Get the first inactive audio node.
     * If there is none, create a new one and add it to the pool.
     * @param  {Function} callback Function to call when the audio node is ready.
     */
    _inactiveNode: function(callback) {
      var self = this,
        node = null;

      // find first inactive node to recycle
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
          callback(self._audioNode[i]);
          node = true;
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      if (node) {
        return;
      }

      // create new node if there are no inactives
      var newNode;
      if (self._webAudio) {
        newNode = self._setupAudioNode();
        callback(newNode);
      } else {
        self.load();
        newNode = self._audioNode[self._audioNode.length - 1];
        newNode.addEventListener(navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata', function() {
          callback(newNode);
        });
      }
    },

    /**
     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
     */
    _drainPool: function() {
      var self = this,
        inactive = 0,
        i;

      // count the number of inactive nodes
      for (i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused) {
          inactive++;
        }
      }

      // remove excess inactive nodes
      for (i=self._audioNode.length-1; i>=0; i--) {
        if (inactive <= 5) {
          break;
        }

        if (self._audioNode[i].paused) {
          // disconnect the audio source if using Web Audio
          if (self._webAudio) {
            self._audioNode[i].disconnect(0);
          }

          inactive--;
          self._audioNode.splice(i, 1);
        }
      }
    },

    /**
     * Clear 'onend' timeout before it ends.
     * @param  {Number} timerId The ID of the sound to be cancelled.
     */
    _clearEndTimer: function(timerId) {
      var self = this,
        timer = self._onendTimer.indexOf(timerId);

      // make sure the timer gets cleared
      timer = timer >= 0 ? timer : 0;

      if (self._onendTimer[timer]) {
        clearTimeout(self._onendTimer[timer]);
        self._onendTimer.splice(timer, 1);
      }
    },

    /**
     * Setup the gain node and panner for a Web Audio instance.
     * @return {Object} The new audio node.
     */
    _setupAudioNode: function() {
      var self = this,
        node = self._audioNode,
        index = self._audioNode.length;

      // create gain node
      node[index] = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
      node[index].gain.value = self._volume;
      node[index].paused = true;
      node[index]._pos = 0;
      node[index].readyState = 4;
      node[index].connect(masterGain);

      // create the panner
      node[index].panner = ctx.createPanner();
      node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
      node[index].panner.connect(node[index]);

      return node[index];
    },

    /**
     * Call/set custom events.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Function to call.
     * @return {Howl}
     */
    on: function(event, fn) {
      var self = this,
        events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(fn);
      } else {
        for (var i=0; i<events.length; i++) {
          if (fn) {
            events[i].call(self, fn);
          } else {
            events[i].call(self);
          }
        }
      }

      return self;
    },

    /**
     * Remove a custom event.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Listener to remove.
     * @return {Howl}
     */
    off: function(event, fn) {
      var self = this,
        events = self['_on' + event],
        fnString = fn.toString();

      // loop through functions in the event for comparison
      for (var i=0; i<events.length; i++) {
        if (fnString === events[i].toString()) {
          events.splice(i, 1);
          break;
        }
      }

      return self;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all play instances attached to this sound.
     */
    unload: function() {
      var self = this;

      // stop playing any active nodes
      var nodes = self._audioNode;
      for (var i=0; i<self._audioNode.length; i++) {
        // stop the sound if it is currently playing
        if (!nodes[i].paused) {
          self.stop(nodes[i].id);
        }

        if (!self._webAudio) {
           // remove the source if using HTML5 Audio
          nodes[i].src = '';
        } else {
          // disconnect the output from the master gain
          nodes[i].disconnect(0);
        }
      }

      // remove the reference in the global Howler object
      var index = Howler._howls.indexOf(self);
      if (index !== null && index >= 0) {
        Howler._howls.splice(index, 1);
      }

      // delete this sound from the cache
      delete cache[self._src];
      self = null;
    }

  };

  // only define these functions when using WebAudio
  if (usingWebAudio) {

    /**
     * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
     * @param  {Object} obj The Howl object for the sound to load.
     * @param  {String} url The path to the sound file.
     */
    var loadBuffer = function(obj, url) {
      // check if the buffer has already been cached
      if (url in cache) {
        // set the duration from the cache
        obj._duration = cache[url].duration;

        // load the sound into this object
        loadSound(obj);
      } else {
        // load the buffer from the URL
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          // decode the buffer into an audio source
          ctx.decodeAudioData(
            xhr.response,
            function(buffer) {
              if (buffer) {
                cache[url] = buffer;
                loadSound(obj, buffer);
              }
            },
            function(err) {
              obj.on('loaderror');
            }
          );
        };
        xhr.onerror = function() {
          // if there is an error, switch the sound to HTML Audio
          if (obj._webAudio) {
            obj._buffer = true;
            obj._webAudio = false;
            obj._audioNode = [];
            delete obj._gainNode;
            obj.load();
          }
        };
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      }
    };

    /**
     * Finishes loading the Web Audio API sound and fires the loaded event
     * @param  {Object}  obj    The Howl object for the sound to load.
     * @param  {Objecct} buffer The decoded buffer sound source.
     */
    var loadSound = function(obj, buffer) {
      // set the duration
      obj._duration = (buffer) ? buffer.duration : obj._duration;

      // setup a sprite if none is defined
      if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
        obj._sprite = {_default: [0, obj._duration * 1000]};
      }

      // fire the loaded event
      if (!obj._loaded) {
        obj._loaded = true;
        obj.on('load');
      }

      if (obj._autoplay) {
        obj.play();
      }
    };

    /**
     * Load the sound back into the buffer source.
     * @param  {Object} obj   The sound to load.
     * @param  {Array}  loop  Loop boolean, pos, and duration.
     * @param  {String} id    (optional) The play instance ID.
     */
    var refreshBuffer = function(obj, loop, id) {
      // determine which node to connect to
      var node = obj._nodeById(id);

      // setup the buffer source for playback
      node.bufferSource = ctx.createBufferSource();
      node.bufferSource.buffer = cache[obj._src];
      node.bufferSource.connect(node.panner);
      node.bufferSource.loop = loop[0];
      if (loop[0]) {
        node.bufferSource.loopStart = loop[1];
        node.bufferSource.loopEnd = loop[1] + loop[2];
      }
      node.bufferSource.playbackRate.value = obj._rate;
    };

  }

  /**
   * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
   */
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  }

  /**
   * Add support for CommonJS libraries such as browserify.
   */
  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }

  // define globally in case AMD is not available or available but not used
  window.Howler = Howler;
  window.Howl = Howl;

})();
/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 */
(function () {
    /**
     * There is no constructor function for me.plugin
     * @namespace me.plugin
     * @memberOf me
     */
    me.plugin = (function () {
        // hold public stuff inside the singleton
        var singleton = {};

        /*
         * PUBLIC
         */

        /**
        * a base Object for plugin <br>
        * plugin must be installed using the register function
        * @see me.plugin
        * @class
        * @extends Object
        * @name plugin.Base
        * @memberOf me
        * @constructor
        */
        singleton.Base = Object.extend(
        /** @scope me.plugin.Base.prototype */
        {
            /**
             * define the minimum required <br>
             * version of melonJS  <br>
             * this need to be defined by the plugin
             * @public
             * @type String
             * @name me.plugin.Base#version
             */
            version : undefined,

            /** @ignore */
            init : function () {
                //empty for now !
            }
        });

        /**
         * patch a melonJS function
         * @name patch
         * @memberOf me.plugin
         * @public
         * @function
         * @param {Object} proto target object
         * @param {String} name target function
         * @param {Function} fn replacement function
         * @example
         * // redefine the me.game.update function with a new one
         * me.plugin.patch(me.game, "update", function () {
         *   // display something in the console
         *   console.log("duh");
         *   // call the original me.game.update function
         *   this.parent();
         * });
         */
        singleton.patch = function (proto, name, fn) {
            // use the object prototype if possible
            if (typeof(proto.prototype) !== "undefined") {
                proto = proto.prototype;
            }
            // reuse the logic behind Object.extend
            if (typeof(proto[name]) === "function") {
                // save the original function
                var _parent = proto[name];
                // override the function with the new one
                proto[name] = (function (name, fn) {
                    return function () {
                        var tmp = this.parent;
                        this.parent = _parent;
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                })(name, fn);
            }
            else {
                console.error(name + " is not an existing function");
            }
        };

        /**
         * Register a plugin.
         * @name register
         * @memberOf me.plugin
         * @see me.plugin.Base
         * @public
         * @function
         * @param {me.plugin.Base} plugin Plugin to instiantiate and register
         * @param {String} name
         * @param {} [arguments...] all extra parameters will be passed to the plugin constructor
         * @example
         * // register a new plugin
         * me.plugin.register(TestPlugin, "testPlugin");
         * // the plugin then also become available
         * // under then me.plugin namespace
         * me.plugin.testPlugin.myFunction ();
         */
        singleton.register = function (plugin, name) {
            // ensure me.plugin[name] is not already "used"
            if (me.plugin[name]) {
                console.error("plugin " + name + " already registered");
            }

            // compatibility testing
            if (typeof(plugin.prototype.version) === "undefined") {
                throw "melonJS: Plugin version not defined!";
            }
            else if (me.sys.checkVersion(plugin.prototype.version) > 0) {
                throw ("melonJS: Plugin version mismatch, expected: " + plugin.prototype.version + ", got: " + me.version);
            }

            // get extra arguments
            var _args = [];
            if (arguments.length > 2) {
                // store extra arguments if any
                _args = Array.prototype.slice.call(arguments, 1);
            }

            // try to instantiate the plugin
            _args[0] = plugin;
            me.plugin[name] = new (plugin.bind.apply(plugin, _args))();

            // inheritance check
            if (!(me.plugin[name] instanceof me.plugin.Base)) {
                throw "melonJS: Plugin should extend the me.plugin.Base Class !";
            }
        };
        // return our singleton
        return singleton;
    })();
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 * @desc Used to make a game entity draggable
 */
me.DraggableEntity = (function (Entity, Input, Event, Vector) {
    "use strict";

    return Entity.extend({
        /**
         * Constructor
         * @name init
         * @memberOf me.DraggableEntity
         * @function
         * @param {Number} x the x postion of the entity
         * @param {Number} y the y postion of the entity
         * @param {Object} settings the additional entity settings
         */
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.dragging = false;
            this.dragId = null;
            this.grabOffset = new Vector(0, 0);
            this.onPointerEvent = Input.registerPointerEvent;
            this.removePointerEvent = Input.releasePointerEvent;
            this.initEvents();
        },

        /**
         * Initializes the events the modules needs to listen to
         * It translates the pointer events to me.events
         * in order to make them pass through the system and to make
         * this module testable. Then we subscribe this module to the
         * transformed events.
         * @name init
         * @memberOf me.DraggableEntity
         * @function
         */
        initEvents: function () {
            var self = this;
            this.mouseDown = function (e) {
                this.translatePointerEvent(e, Event.DRAGSTART);
            };
            this.mouseUp = function (e) {
                this.translatePointerEvent(e, Event.DRAGEND);
            };
            this.onPointerEvent("pointerdown", this, this.mouseDown.bind(this));
            this.onPointerEvent("pointerup", this, this.mouseUp.bind(this));
            Event.subscribe(Event.MOUSEMOVE, this.dragMove.bind(this));
            Event.subscribe(Event.DRAGSTART, function (e, draggable) {
                if (draggable === self) {
                    self.dragStart(e);
                }
            });
            Event.subscribe(Event.DRAGEND, function (e, draggable) {
                if (draggable === self) {
                    self.dragEnd(e);
                }
            });
        },

        /**
         * Translates a pointer event to a me.event
         * @name init
         * @memberOf me.DraggableEntity
         * @function
         * @param {Object} e the pointer event you want to translate
         * @param {String} translation the me.event you want to translate
         * the event to
         */
        translatePointerEvent: function (e, translation) {
            Event.publish(translation, [e, this]);
        },

        /**
         * Gets called when the user starts dragging the entity
         * @name dragStart
         * @memberOf me.DraggableEntity
         * @function
         * @param {Object} x the pointer event
         */
        dragStart: function (e) {
            if (this.dragging === false) {
                this.dragging = true;
                this.dragId = e.pointerId;
                this.grabOffset.set(e.gameX, e.gameY);
                this.grabOffset.sub(this.pos);
                return false;
            }
        },

        /**
         * Gets called when the user drags this entity around
         * @name dragMove
         * @memberOf me.DraggableEntity
         * @function
         * @param {Object} x the pointer event
         */
        dragMove: function (e) {
            if (this.dragging === true) {
                if (this.dragId === e.pointerId) {
                    this.pos.set(e.gameX, e.gameY);
                    this.pos.sub(this.grabOffset);
                }
            }
        },

        /**
         * Gets called when the user stops dragging the entity
         * @name dragEnd
         * @memberOf me.DraggableEntity
         * @function
         * @param {Object} x the pointer event
         */
        dragEnd: function () {
            if (this.dragging === true) {
                this.pointerId = undefined;
                this.dragging = false;
                return false;
            }
        },

        /**
         * Destructor
         * @name destroy
         * @memberOf me.DraggableEntity
         * @function
         */
        destroy: function () {
            Event.unsubscribe(Event.MOUSEMOVE, this.dragMove);
            Event.unsubscribe(Event.DRAGSTART, this.dragStart);
            Event.unsubscribe(Event.DRAGEND, this.dragEnd);
            this.removePointerEvent("pointerdown", this);
            this.removePointerEvent("pointerup", this);
        }
    });
}(me.ObjectEntity, me.input, me.event, me.Vector2d));

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier BIOT
 * http://www.melonjs.org
 * @desc Used to make a game entity a droptarget
 */
me.DroptargetEntity = (function (Entity, Event) {
    "use strict";

    return Entity.extend({
        /**
         * constant for the overlaps method
         * @public
         * @constant
         * @type String
         * @name CHECKMETHOD_OVERLAP
         * @memberOf me.DroptargetEntity
         */
        CHECKMETHOD_OVERLAP: "overlaps",

        /**
         * constant for the contains method
         * @public
         * @constant
         * @type String
         * @name CHECKMETHOD_CONTAINS
         * @memberOf me.DroptargetEntity
         */
        CHECKMETHOD_CONTAINS: "contains",

        /**
         * the checkmethod we want to use
         * @public
         * @constant
         * @type String
         * @name checkMethod
         * @memberOf me.DroptargetEntity
         */
        checkMethod: null,

        /**
         * Constructor
         * @name init
         * @memberOf me.DroptargetEntity
         * @function
         * @param {Number} x the x postion of the entity
         * @param {Number} y the y postion of the entity
         * @param {Object} settings the additional entity settings
         */
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            Event.subscribe(Event.DRAGEND, this.checkOnMe.bind(this));
            this.checkMethod = this[this.CHECKMETHOD_OVERLAP];
        },

        /**
         * Sets the collision method which is going to be used to check a valid drop
         * @name setCheckMethod
         * @memberOf me.DroptargetEntity
         * @function
         * @param {Constant} checkMethod the checkmethod (defaults to CHECKMETHOD_OVERLAP)
         */
        setCheckMethod: function (checkMethod) {
            //  We can improve this check,
            //  because now you can use every method in theory
            if (typeof(this[checkMethod]) !== "undefined") {
                this.checkMethod = this[checkMethod];
            }
        },

        /**
         * Checks if a dropped entity is dropped on the current entity
         * @name checkOnMe
         * @memberOf me.DroptargetEntity
         * @function
         * @param {Object} draggableEntity the draggable entity that is dropped
         */
        checkOnMe: function (e, draggableEntity) {
            if (draggableEntity && this.checkMethod(draggableEntity.getBounds().translateV(draggableEntity.pos))) {
                // call the drop method on the current entity
                this.drop(draggableEntity);
            }
        },

        /**
         * Gets called when a draggable entity is dropped on the current entity
         * @name drop
         * @memberOf me.DroptargetEntity
         * @function
         * @param {Object} draggableEntity the draggable entity that is dropped
         */
        drop: function () {},

        /**
         * Destructor
         * @name destroy
         * @memberOf me.DroptargetEntity
         * @function
         */
        destroy: function () {
            Event.unsubscribe(Event.DRAGEND, this.checkOnMe);
        }
    });
}(me.ObjectEntity, me.event));

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    // generate a default image for the particles
    var pixel = (function () {
        var canvas = me.video.createCanvas(1, 1);
        var context = me.video.getContext2d(canvas);
        context.fillStyle = "#fff";
        context.fillRect(0, 0, 1, 1);
        return canvas;
    })();

    /**
     * me.ParticleEmitterSettings contains the default settings for me.ParticleEmitter.<br>
     *
     * @protected
     * @class
     * @memberOf me
     * @see me.ParticleEmitter
     */
    me.ParticleEmitterSettings = {
        /**
         * Width of the particle spawn area.<br>
         * @public
         * @type Number
         * @name width
         * @memberOf me.ParticleEmitterSettings
         * @default 0
         */
        width : 0,

        /**
         * Height of the particle spawn area.<br>
         * @public
         * @type Number
         * @name height
         * @memberOf me.ParticleEmitterSettings
         * @default 0
         */
        height : 0,

        /**
         * Image used for particles.<br>
         * @public
         * @type CanvasImageSource
         * @name image
         * @memberOf me.ParticleEmitterSettings
         * @default 1x1 white pixel
         * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#canvasimagesource
         */
        image : pixel,

        /**
         * Total number of particles in the emitter.<br>
         * @public
         * @type Number
         * @name totalParticles
         * @default 50
         * @memberOf me.ParticleEmitterSettings
         */
        totalParticles : 50,

        /**
         * Start angle for particle launch in Radians.<br>
         * @public
         * @type Number
         * @name angle
         * @default Math.PI / 2
         * @memberOf me.ParticleEmitterSettings
         */
        angle : Math.PI / 2,

        /**
         * Variation in the start angle for particle launch in Radians.<br>
         * @public
         * @type Number
         * @name angleVariation
         * @default 0
         * @memberOf me.ParticleEmitterSettings
         */
        angleVariation : 0,

        /**
         * Minimum time each particle lives once it is emitted in ms.<br>
         * @public
         * @type Number
         * @name minLife
         * @default 1000
         * @memberOf me.ParticleEmitterSettings
         */
        minLife : 1000,

        /**
         * Maximum time each particle lives once it is emitted in ms.<br>
         * @public
         * @type Number
         * @name maxLife
         * @default 3000
         * @memberOf me.ParticleEmitterSettings
         */
        maxLife : 3000,

        /**
         * Start speed of particles.<br>
         * @public
         * @type Number
         * @name speed
         * @default 2
         * @memberOf me.ParticleEmitterSettings
         */
        speed : 2,

        /**
         * Variation in the start speed of particles.<br>
         * @public
         * @type Number
         * @name speedVariation
         * @default 1
         * @memberOf me.ParticleEmitterSettings
         */
        speedVariation : 1,

        /**
         * Minimum start rotation for particles sprites in Radians.<br>
         * @public
         * @type Number
         * @name minRotation
         * @default 0
         * @memberOf me.ParticleEmitterSettings
         */
        minRotation : 0,

        /**
         * Maximum start rotation for particles sprites in Radians.<br>
         * @public
         * @type Number
         * @name maxRotation
         * @default 0
         * @memberOf me.ParticleEmitterSettings
         */
        maxRotation : 0,

        /**
         * Minimum start scale ratio for particles (1 = no scaling).<br>
         * @public
         * @type Number
         * @name minStartScale
         * @default 1
         * @memberOf me.ParticleEmitterSettings
         */
        minStartScale : 1,

        /**
         * Maximum start scale ratio for particles (1 = no scaling).<br>
         * @public
         * @type Number
         * @name maxStartScale
         * @default 1
         * @memberOf me.ParticleEmitterSettings
         */
        maxStartScale : 1,

        /**
         * Minimum end scale ratio for particles.<br>
         * @public
         * @type Number
         * @name minEndScale
         * @default 0
         * @memberOf me.ParticleEmitterSettings
         */
        minEndScale : 0,

        /**
         * Maximum end scale ratio for particles.<br>
         * @public
         * @type Number
         * @name maxEndScale
         * @default 0
         * @memberOf me.ParticleEmitterSettings
         */
        maxEndScale : 0,

        /**
         * Vertical force (Gravity) for each particle.<br>
         * @public
         * @type Number
         * @name gravity
         * @default 0
         * @memberOf me.ParticleEmitterSettings
         * @see me.sys.gravity
         */
        gravity : 0,

        /**
         * Horizontal force (like a Wind) for each particle.<br>
         * @public
         * @type Number
         * @name wind
         * @default 0
         * @memberOf me.ParticleEmitterSettings
         */
        wind : 0,

        /**
         * Update the rotation of particle in accordance the particle trajectory.<br>
         * The particle sprite should aim at zero angle (draw from left to right).<br>
         * Override the particle minRotation and maxRotation.<br>
         * @public
         * @type Boolean
         * @name followTrajectory
         * @default false
         * @memberOf me.ParticleEmitterSettings
         */
        followTrajectory : false,

        /**
         * Enable the Texture Additive by canvas composite operation (lighter).<br>
         * WARNING: Composite Operation may decreases performance!.<br>
         * @public
         * @type Boolean
         * @name textureAdditive
         * @default false
         * @memberOf me.ParticleEmitterSettings
         */
        textureAdditive : false,

        /**
         * Update particles only in the viewport, remove it when out of viewport.<br>
         * @public
         * @type Boolean
         * @name onlyInViewport
         * @default true
         * @memberOf me.ParticleEmitterSettings
         */
        onlyInViewport : true,

        /**
         * Render particles in screen space. <br>
         * @public
         * @type Boolean
         * @name floating
         * @default false
         * @memberOf me.ParticleEmitterSettings
         */
        floating : false,

        /**
         * Maximum number of particles launched each time in this emitter (used only if emitter is Stream).<br>
         * @public
         * @type Number
         * @name maxParticles
         * @default 10
         * @memberOf me.ParticleEmitterSettings
         */
        maxParticles : 10,

        /**
         * How often a particle is emitted in ms (used only if emitter is Stream).<br>
         * Necessary that value is greater than zero.<br>
         * @public
         * @type Number
         * @name frequency
         * @default 100
         * @memberOf me.ParticleEmitterSettings
         */
        frequency : 100,

        /**
         * Duration that the emitter releases particles in ms (used only if emitter is Stream).<br>
         * After this period, the emitter stop the launch of particles.<br>
         * @public
         * @type Number
         * @name duration
         * @default Infinity
         * @memberOf me.ParticleEmitterSettings
         */
        duration : Infinity,

        /**
         * Skip n frames after updating the particle system once. <br>
         * This can be used to reduce the performance impact of emitters with many particles.<br>
         * @public
         * @type Number
         * @name framesToSkip
         * @default 0
         * @memberOf me.ParticleEmitterSettings
         */
        framesToSkip : 0
    };

    /**
     * Particle Emitter Object.
     * @class
     * @extends Rect
     * @memberOf me
     * @constructor
     * @param {Number} x x-position of the particle emitter
     * @param {Number} y y-position of the particle emitter
     * @param {object} settings An object containing the settings for the particle emitter. See {@link me.ParticleEmitterSettings}
     * @example
     *
     * // Create a basic emitter at position 100, 100
     * var emitter = new me.ParticleEmitter(100, 100);
     *
     * // Adjust the emitter properties
     * emitter.totalParticles = 200;
     * emitter.minLife = 1000;
     * emitter.maxLife = 3000;
     * emitter.z = 10;
     *
     * // Add the emitter to the game world
     * me.game.world.addChild(emitter);
     * me.game.world.addChild(emitter.container);
     *
     * // Launch all particles one time and stop, like a explosion
     * emitter.burstParticles();
     *
     * // Launch constantly the particles, like a fountain
     * emitter.streamParticles();
     *
     * // At the end, remove emitter from the game world
     * // call this in onDestroyEvent function
     * me.game.world.removeChild(emitter);
     * me.game.world.removeChild(emitter.container);
     *
     */
    me.ParticleEmitter = me.Rect.extend(
    /** @scope me.ParticleEmitter.prototype */
    {
        // Emitter is Stream, launch particles constantly
            /** @ignore */
        _stream: false,

        // Frequency timer (in ms) for emitter launch new particles
        // used only in stream emitter
            /** @ignore */
        _frequencyTimer: 0,

        // Time of live (in ms) for emitter launch new particles
        // used only in stream emitter
            /** @ignore */
        _durationTimer: 0,

        // Emitter is emitting particles
            /** @ignore */
        _enabled: false,

        // Emitter will always update
        isRenderable : false,

        /**
         * @ignore
         */
        init: function (x, y, settings) {
            // call the parent constructor
            this.parent(
                new me.Vector2d(x, y),
                Infinity,
                Infinity
            );

            // don't sort the particles by z-index
            this.autoSort = false;

            this.container = new me.ParticleContainer(this);

            /**
             * Z-order for particles, value is forwarded to the particle container <br>
             * @type Number
             * @name z
             * @memberOf me.ParticleEmitter
             */
            Object.defineProperty(this, "z", {
                get : function () { return this.container.z; },
                set : function (value) { this.container.z = value; },
                enumerable : true,
                configurable : true
            });

            /**
             * Floating property for particles, value is forwarded to the particle container <br>
             * @type Boolean
             * @name floating
             * @memberOf me.ParticleEmitter
             */
            Object.defineProperty(this, "floating", {
                get : function () { return this.container.floating; },
                set : function (value) { this.container.floating = value; },
                enumerable : true,
                configurable : true
            });

            // Reset the emitter to defaults
            this.reset(settings);
        },

        destroy: function () {
            this.reset();
        },

        /**
         * returns a random point inside the bounds for this emitter
         * @name getRandomPoint
         * @memberOf me.ParticleEmitter
         * @function
         * @return {me.Vector2d} new vector
         */
        getRandomPoint: function () {
            var vector = this.pos.clone();
            vector.x += Number.prototype.random(-this.hWidth, this.hWidth);
            vector.y += Number.prototype.random(-this.hHeight, this.hHeight);
            return vector;
        },

        /**
         * Reset the emitter with default values.<br>
         * @function
         * @param {Object} settings [optional] object with emitter settings. See {@link me.ParticleEmitterSettings}
         * @name reset
         * @memberOf me.ParticleEmitter
         */
        reset: function (settings) {
            // check if settings exists and create a dummy object if necessary
            settings = settings || {};
            var defaults = me.ParticleEmitterSettings;

            var width = (typeof settings.width === "number") ? settings.width : defaults.width;
            var height = (typeof settings.height === "number") ? settings.height : defaults.height;
            this.resize(width, height);

            this.image = settings.image || defaults.image;
            this.totalParticles = (typeof settings.totalParticles === "number") ? settings.totalParticles : defaults.totalParticles;
            this.angle = (typeof settings.angle === "number") ? settings.angle : defaults.angle;
            this.angleVariation = (typeof settings.angleVariation === "number") ? settings.angleVariation : defaults.angleVariation;
            this.minLife = (typeof settings.minLife === "number") ? settings.minLife : defaults.minLife;
            this.maxLife = (typeof settings.maxLife === "number") ? settings.maxLife : defaults.maxLife;
            this.speed = (typeof settings.speed === "number") ? settings.speed : defaults.speed;
            this.speedVariation = (typeof settings.speedVariation === "number") ? settings.speedVariation : defaults.speedVariation;
            this.minRotation = (typeof settings.minRotation === "number") ? settings.minRotation : defaults.minRotation;
            this.maxRotation = (typeof settings.maxRotation === "number") ? settings.maxRotation : defaults.maxRotation;
            this.minStartScale = (typeof settings.minStartScale === "number") ? settings.minStartScale : defaults.minStartScale;
            this.maxStartScale = (typeof settings.maxStartScale === "number") ? settings.maxStartScale : defaults.maxStartScale;
            this.minEndScale = (typeof settings.minEndScale === "number") ? settings.minEndScale : defaults.minEndScale;
            this.maxEndScale = (typeof settings.maxEndScale === "number") ? settings.maxEndScale : defaults.maxEndScale;
            this.gravity = (typeof settings.gravity === "number") ? settings.gravity : defaults.gravity;
            this.wind = (typeof settings.wind === "number") ? settings.wind : defaults.wind;
            this.followTrajectory = (typeof settings.followTrajectory === "boolean") ? settings.followTrajectory : defaults.followTrajectory;
            this.textureAdditive = (typeof settings.textureAdditive === "boolean") ? settings.textureAdditive : defaults.textureAdditive;
            this.onlyInViewport = (typeof settings.onlyInViewport === "boolean") ? settings.onlyInViewport : defaults.onlyInViewport;
            this.floating = (typeof settings.floating === "boolean") ? settings.floating : defaults.floating;
            this.maxParticles = (typeof settings.maxParticles === "number") ? settings.maxParticles : defaults.maxParticles;
            this.frequency = (typeof settings.frequency === "number") ? settings.frequency : defaults.frequency;
            this.duration = (typeof settings.duration === "number") ? settings.duration : defaults.duration;
            this.framesToSkip = (typeof settings.framesToSkip === "number") ? settings.framesToSkip : defaults.framesToSkip;

            // reset particle container values
            this.container.destroy();
        },


        // Add count particles in the game world
        /** @ignore */
        addParticles: function (count) {
            for (var i = 0; i < ~~count; i++) {
                // Add particle to the container
                var particle = me.pool.pull("me.Particle", this);
                particle.isRenderable = false;
                this.container.addChild(particle);
            }
        },


        /**
         * Emitter is of type stream and is launching particles <br>
         * @function
         * @returns {Boolean} Emitter is Stream and is launching particles
         * @name isRunning
         * @memberOf me.ParticleEmitter
         */
        isRunning: function () {
            return this._enabled && this._stream;
        },


        /**
         * Launch particles from emitter constantly <br>
         * Particles example: Fountains
         * @param {Number} duration [optional] time that the emitter releases particles in ms
         * @function
         * @name streamParticles
         * @memberOf me.ParticleEmitter
         */
        streamParticles: function (duration) {
            this._enabled = true;
            this._stream = true;
            this.frequency = Math.max(this.frequency, 1);
            this._durationTimer = (typeof duration === "number") ? duration : this.duration;
        },


        /**
         * Stop the emitter from generating new particles (used only if emitter is Stream) <br>
         * @function
         * @name stopStream
         * @memberOf me.ParticleEmitter
         */
        stopStream: function () {
            this._enabled = false;
        },


        /**
         * Launch all particles from emitter and stop <br>
         * Particles example: Explosions <br>
         * @param {Number} total [optional] number of particles to launch
         * @function
         * @name burstParticles
         * @memberOf me.ParticleEmitter
         */
        burstParticles: function (total) {
            this._enabled = true;
            this._stream = false;
            this.addParticles((typeof total === "number") ? total : this.totalParticles);
            this._enabled = false;
        },



        /**
         * @ignore
         */
        update: function (dt) {
            // Launch new particles, if emitter is Stream
            if ((this._enabled) && (this._stream)) {
                // Check if the emitter has duration set
                if (this._durationTimer !== Infinity) {
                    this._durationTimer -= dt;

                    if (this._durationTimer <= 0) {
                        this.stopStream();
                        return false;
                    }
                }

                // Increase the emitter launcher timer
                this._frequencyTimer += dt;

                // Check for new particles launch
                var particlesCount = this.container.children.length;
                if ((particlesCount < this.totalParticles) && (this._frequencyTimer >= this.frequency)) {
                    if ((particlesCount + this.maxParticles) <= this.totalParticles) {
                        this.addParticles(this.maxParticles);
                    }
                    else {
                        this.addParticles(this.totalParticles - particlesCount);
                    }

                    this._frequencyTimer = 0;
                }
            }
            return true;
        },
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * Particle Container Object.
     * @class
     * @extends me.ObjectContainer
     * @memberOf me
     * @constructor
     * @param {me.ParticleEmitter} emitter the emitter which owns this container
     */
    me.ParticleContainer = me.ObjectContainer.extend(
    /** @scope ParticleContainer */
    {
        /**
         * @ignore
         */
        init: function (emitter) {
            // call the parent constructor
            this.parent();

            // don't sort the particles by z-index
            this.autoSort = false;

            // count the updates
            this._updateCount = 0;

            // internally store how much time was skipped when frames are skipped
            this._dt = 0;

            // cache the emitter for later use
            this._emitter = emitter;
        },

        /**
         * @ignore
         */
        update: function (dt) {
            // skip frames if necessary
            if (++this._updateCount > this._emitter.framesToSkip) {
                this._updateCount = 0;
            }
            if (this._updateCount > 0) {
                this._dt += dt;
                return false;
            }

            // apply skipped delta time
            dt += this._dt;
            this._dt = 0;

            // Update particles and remove them if they are dead
            var viewport = me.game.viewport;
            for (var i = this.children.length - 1; i >= 0; --i) {
                var particle = this.children[i];
                particle.isRenderable = true;
                // particle.inViewport = viewport.isVisible(particle);
                particle.inViewport = this.floating || (
                    particle.pos.x < viewport.pos.x + viewport.width &&
                    viewport.pos.x < particle.pos.x + particle.width &&
                    particle.pos.y < viewport.pos.y + viewport.height &&
                    viewport.pos.y < particle.pos.y + particle.height
                );
                if (!particle.update(dt)) {
                    this.removeChildNow(particle);
                }
            }
            return true;
        },

        /**
         * @ignore
         */
        draw : function (context, rect) {
            if (this.children.length > 0) {
                var gco;
                // Check for additive draw
                if (this._emitter.textureAdditive) {
                    gco = context.globalCompositeOperation;
                    context.globalCompositeOperation = "lighter";
                }

                this.parent(context, rect);

                // Restore globalCompositeOperation
                if (this._emitter.textureAdditive) {
                    context.globalCompositeOperation = gco;
                }
            }
        }
    });
})();

/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2014, Olivier BIOT
 * http://www.melonjs.org
 *
 */
(function () {
    /**
     * Single Particle Object.
     * @class
     * @extends me.SpriteObject
     * @memberOf me
     * @constructor
     * @param {me.ParticleEmitter} particle emitter
     */
    me.Particle = me.Renderable.extend(
    /** @scope me.Particle.prototype */
    {
        /**
         * @ignore
         */
        init : function (emitter) {
            // Call the parent constructor
            this.parent(emitter.getRandomPoint(), emitter.image.width, emitter.image.height);

            // Particle will always update
            this.alwaysUpdate = true;

            // Cache the image reference
            this.image = emitter.image;

            // Set the start particle Angle and Speed as defined in emitter
            var angle = emitter.angle + ((emitter.angleVariation > 0) ? (Math.random() * 2 - 1) * emitter.angleVariation : 0);
            var speed = emitter.speed + ((emitter.speedVariation > 0) ? (Math.random() * 2 - 1) * emitter.speedVariation : 0);

            // Set the start particle Velocity
            this.vel = new me.Vector2d(speed * Math.cos(angle), -speed * Math.sin(angle));

            // Set the start particle Time of Life as defined in emitter
            this.life = Number.prototype.random(emitter.minLife, emitter.maxLife);
            this.startLife = this.life;

            // Set the start and end particle Scale as defined in emitter
            // clamp the values as minimum and maximum scales range
            this.startScale = Number.prototype.random(
                emitter.minStartScale,
                emitter.maxStartScale
            ).clamp(emitter.minStartScale, emitter.maxStartScale);
            this.endScale = Number.prototype.random(
                emitter.minEndScale,
                emitter.maxEndScale
            ).clamp(emitter.minEndScale, emitter.maxEndScale);

            // Set the particle Gravity and Wind (horizontal gravity) as defined in emitter
            this.gravity = emitter.gravity;
            this.wind = emitter.wind;

            // Set if the particle update the rotation in accordance the trajectory
            this.followTrajectory = emitter.followTrajectory;

            // Set if the particle update only in Viewport
            this.onlyInViewport = emitter.onlyInViewport;

            // Set the particle Z Order
            this.z = emitter.z;

            // cache inverse of the expected delta time
            this._deltaInv = me.sys.fps / 1000;

            this.transform = new me.Matrix2d();

            // Set the start particle rotation as defined in emitter
            // if the particle not follow trajectory
            if (!emitter.followTrajectory) {
                this.angle = Number.prototype.random(emitter.minRotation, emitter.maxRotation);
            }
        },

        /**
         * Update the Particle <br>
         * This is automatically called by the game manager {@link me.game}
         * @name update
         * @memberOf me.Particle
         * @function
         * @ignore
         * @param {Number} dt time since the last update in milliseconds
         */
        update : function (dt) {
            // move things forward independent of the current frame rate
            var skew = dt * this._deltaInv;

            // Decrease particle life
            this.life = this.life > dt ? this.life - dt : 0;

            // Calculate the particle Age Ratio
            var ageRatio = this.life / this.startLife;

            // Resize the particle as particle Age Ratio
            var scale = this.startScale;
            if (this.startScale > this.endScale) {
                scale *= ageRatio;
                scale = (scale < this.endScale) ? this.endScale : scale;
            }
            else if (this.startScale < this.endScale) {
                scale /= ageRatio;
                scale = (scale > this.endScale) ? this.endScale : scale;
            }

            // Set the particle opacity as Age Ratio
            this.alpha = ageRatio;

            // Adjust the particle velocity
            this.vel.x += this.wind * skew;
            this.vel.y += this.gravity * skew;

            // If necessary update the rotation of particle in accordance the particle trajectory
            var angle = this.followTrajectory ? Math.atan2(this.vel.y, this.vel.x) : this.angle;

            // Update particle transform
            this.transform.set(scale, 0, 0, scale, 0, 0).rotate(angle);
            this.pos.x += this.vel.x * skew;
            this.pos.y += this.vel.y * skew;

            // Return true if the particle is not dead yet
            return (this.inViewport || !this.onlyInViewport) && (this.life > 0);
        },

        draw : function (context) {
            context.save();

            // particle alpha value
            context.globalAlpha *= this.alpha;

            // translate to the defined anchor point and scale it
            var transform = this.transform;
            context.transform(
                transform.a, transform.b,
                transform.c, transform.d,
                ~~this.pos.x, ~~this.pos.y
            );

            var w = this.width, h = this.height;
            context.drawImage(
                this.image,
                0, 0,
                w, h,
                -w / 2, -h / 2,
                w, h
            );

            context.restore();
        }
    });


    /*---------------------------------------------------------*/
    // END END END
    /*---------------------------------------------------------*/
})(window);
