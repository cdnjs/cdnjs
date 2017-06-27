/**
 * YUI core
 * @module yui
 */
(function() {

    var _instances = {},

// @TODO: this needs to be created at build time from module metadata

        _APPLY_TO_WHITE_LIST = {
            'io.xdrReady': 1,
            'io.start': 1,
            'io.success': 1,
            'io.failure': 1,
            'io.abort': 1
        };
        

if (typeof YUI === 'undefined' || !YUI) {

    /**
     * The YUI global namespace object.  If YUI is already defined, the
     * existing YUI object will not be overwritten so that defined
     * namespaces are preserved.  
     *
     * @class YUI
     * @constructor
     * @global
     * @uses Event.Target
     * @param o Optional configuration object.  Options:
     * <ul>
     *  <li>------------------------------------------------------------------------</li>
     *  <li>Global:</li>
     *  <li>------------------------------------------------------------------------</li>
     *  <li>debug:
     *  Turn debug statements on or off</li>
     *  <li>useBrowserConsole:
     *  Log to the browser console if debug is on and the console is available</li>
     *  <li>logInclude:
     *  A hash of log sources that should be logged.  If specified, only log messages from these sources will be logged.
     *  
     *  </li>
     *  <li>logExclude:
     *  A hash of log sources that should be not be logged.  If specified, all sources are logged if not on this list.</li>
     *  <li>throwFail:
     *  If throwFail is set, Y.fail will generate or re-throw a JS error.  Otherwise the failure is logged.
     *  <li>win:
     *  The target window/frame</li>
     *  <li>core:
     *  A list of modules that defines the YUI core (overrides the default)</li>
     *  <li>------------------------------------------------------------------------</li>
     *  <li>For event and get:</li>
     *  <li>------------------------------------------------------------------------</li>
     *  <li>pollInterval:
     *  The default poll interval</li>
     *  <li>-------------------------------------------------------------------------</li>
     *  <li>For loader:</li>
     *  <li>-------------------------------------------------------------------------</li>
     *  <li>base:
     *  The base dir</li>
     *  <li>secureBase:
     *  The secure base dir (not implemented)</li>
     *  <li>comboBase:
     *  The YUI combo service base dir. Ex: http://yui.yahooapis.com/combo?</li>
     *  <li>root:
     *  The root path to prepend to module names for the combo service. Ex: 2.5.2/build/</li>
     *  <li>filter:
     *  
     * A filter to apply to result urls.  This filter will modify the default
     * path for all modules.  The default path for the YUI library is the
     * minified version of the files (e.g., event-min.js).  The filter property
     * can be a predefined filter or a custom filter.  The valid predefined 
     * filters are:
     * <dl>
     *  <dt>DEBUG</dt>
     *  <dd>Selects the debug versions of the library (e.g., event-debug.js).
     *      This option will automatically include the logger widget</dd>
     *  <dt>RAW</dt>
     *  <dd>Selects the non-minified version of the library (e.g., event.js).</dd>
     * </dl>
     * You can also define a custom filter, which must be an object literal 
     * containing a search expression and a replace string:
     * <pre>
     *  myFilter: &#123; 
     *      'searchExp': "-min\\.js", 
     *      'replaceStr': "-debug.js"
     *  &#125;
     * </pre>
     *
     *  </li>
     *  <li>combine:
     *  Use the YUI combo service to reduce the number of http connections required to load your dependencies</li>
     *  <li>ignore:
     *  A list of modules that should never be dynamically loaded</li>
     *  <li>force:
     *  A list of modules that should always be loaded when required, even if already present on the page</li>
     *  <li>insertBefore:
     *  Node or id for a node that should be used as the insertion point for new nodes</li>
     *  <li>charset:
     *  charset for dynamic nodes</li>
     *  <li>timeout:
     *  number of milliseconds before a timeout occurs when dynamically loading nodes.  in not set, there is no timeout</li>
     *  <li>context:
     *  execution context for all callbacks</li>
     *  <li>onSuccess:
     *  callback for the 'success' event</li>
     *  <li>onFailure:
     *  callback for the 'failure' event</li>
     *  <li>onTimeout:
     *  callback for the 'timeout' event</li>
     *  <li>onProgress:
     *  callback executed each time a script or css file is loaded</li>
     *  <li>modules:
     *  A list of module definitions.  See Loader.addModule for the supported module metadata</li>
     * </ul>
     */

    /*global YUI*/
    YUI = function(o) {
        var Y = this;

        // Allow instantiation without the new operator
        if (!(Y instanceof YUI)) {
            return new YUI(o);
        } else {
            // set up the core environment
            Y._init(o);

            // bind the specified additional modules for this instance
            Y._setup();

            return Y;
        }
    };
}

// The prototype contains the functions that are required to allow the external
// modules to be registered and for the instance to be initialized.
YUI.prototype = {

    /**
     * Initialize this YUI instance
     * @param o config options
     * @private
     */
    _init: function(o) {
        

        o = o || {};

        // find targeted window and @TODO create facades
        var w = (o.win) ? (o.win.contentWindow) : o.win  || window;
        o.win = w;
        o.doc = w.document;
        o.debug = ('debug' in o) ? o.debug : true;
        o.useBrowserConsole = ('useBrowserConsole' in o) ? o.useBrowserConsole : true;
        o.throwFail = ('throwFail' in o) ? o.throwFail : true;
    
        // add a reference to o for anything that needs it
        // before _setup is called.
        this.config = o;

        this.Env = {
            // @todo expand the new module metadata
            mods: {},
            _idx: 0,
            _pre: 'yuid',
            _used: {},
            _attached: {},
            _yidx: 0,
            _uidx: 0
        };

        if (YUI.Env) {
            this.Env._yidx = ++YUI.Env._idx;
            this.id = this.stamp(this);
            _instances[this.id] = this;
        }

        this.constructor = YUI;

    },
    
    /**
     * Finishes the instance setup. Attaches whatever modules were defined
     * when the yui modules was registered.
     * @method _setup
     * @private
     */
    _setup: function(o) {
        this.use("yui");
        // @TODO eval the need to copy the config
        this.config = this.merge(this.config);
    },

    /**
     * Executes a method on a YUI instance with
     * the specified id if the specified method is whitelisted.
     * @method applyTo
     * @param id {string} the YUI instance id
     * @param method {string} the name of the method to exectute.
     * Ex: 'Object.keys'
     * @param args {Array} the arguments to apply to the method
     * @return {object} the return value from the applied method or null
     */
    applyTo: function(id, method, args) {

        if (!(method in _APPLY_TO_WHITE_LIST)) {
            this.fail(method + ': applyTo not allowed');
            return null;
        }

        var instance = _instances[id];

        if (instance) {

            var nest = method.split('.'), m = instance;

            for (var i=0; i<nest.length; i=i+1) {

                m = m[nest[i]];

                if (!m) {
                    this.fail('applyTo not found: ' + method);
                }
            }

            return m.apply(instance, args);
        }

        return null;
    }, 

    /**
     * Register a module
     * @method add
     * @param name {string} module name
     * @param fn {Function} entry point into the module that
     * is used to bind module to the YUI instance
     * @param version {string} version string
     * @return {YUI} the YUI instance
     *
     * requires   - features that should be present before loading
     * optional   - optional features that should be present if load optional defined
     * use  - features that should be attached automatically
     * skinnable  -
     * rollup
     * omit - features that should not be loaded if this module is present
     */
    add: function(name, fn, version, details) {


        // @todo expand this to include version mapping
        
        // @todo allow requires/supersedes

        // @todo may want to restore the build property
        
        // @todo fire moduleAvailable event
        
        var m = {
            name: name, 
            fn: fn,
            version: version,
            details: details || {}
        };

        YUI.Env.mods[name] = m;

        return this; // chain support
    },

    _attach: function(r, fromLoader) {

        var mods = YUI.Env.mods,
            attached = this.Env._attached;

        for (var i=0, l=r.length; i<l; i=i+1) {
            var name = r[i], m = mods[name], mm;
            if (!attached[name] && m) {

                attached[name] = true;

                var d = m.details, req = d.requires, use = d.use;

                if (req) {
                    this._attach(this.Array(req));
                }


                if (m.fn) {
                    m.fn(this);
                }

                if (use) {
                    this._attach(this.Array(use));
                }
            }
        }

    },

    /**
     * Bind a module to a YUI instance
     * @param modules* {string} 1-n modules to bind (uses arguments array)
     * @param *callback {function} callback function executed when 
     * the instance has the required functionality.  If included, it
     * must be the last parameter.
     *
     * @TODO 
     * Implement versioning?  loader can load different versions?
     * Should sub-modules/plugins be normal modules, or do
     * we add syntax for specifying these?
     *
     * YUI().use('dragdrop')
     * YUI().use('dragdrop:2.4.0'); // specific version
     * YUI().use('dragdrop:2.4.0-'); // at least this version
     * YUI().use('dragdrop:2.4.0-2.9999.9999'); // version range
     * YUI().use('*'); // use all available modules
     * YUI().use('lang+dump+substitute'); // use lang and some plugins
     * YUI().use('lang+*'); // use lang and all known plugins
     *
     *
     * @return {YUI} the YUI instance
     */
    use: function() {

        var Y = this, 
            a=Array.prototype.slice.call(arguments, 0), 
            mods = YUI.Env.mods, 
            used = Y.Env._used,
            loader, 
            firstArg = a[0], 
            dynamic = false,
            callback = a[a.length-1];


        // The last argument supplied to use can be a load complete callback
        if (typeof callback === 'function') {
            a.pop();
            Y.Env._callback = callback;
        } else {
            callback = null;
        }

        // YUI().use('*'); // bind everything available
        if (firstArg === "*") {
            a = [];
            for (var k in mods) {
                if (mods.hasOwnProperty(k)) {
                    a.push(k);
                }
            }

            return Y.use.apply(Y, a);

        }
       

        // use loader to expand dependencies and sort the 
        // requirements if it is available.
        if (Y.Loader) {
            dynamic = true;
            loader = new Y.Loader(Y.config);
            loader.require(a);
            loader.ignoreRegistered = true;
            loader.allowRollup = false;
            loader.calculate();
            a = loader.sorted;
        }


        var missing = [], r = [], f = function(name) {

            // only attach a module once
            if (used[name]) {
                return;
            }

            var m = mods[name], j, req, use;

            if (m) {
                used[name] = true;

                req = m.details.requires;
                use = m.details.use;
            } else {
                missing.push(name);
            }

            // make sure requirements are attached
            if (req) {
                if (Y.Lang.isString(req)) {
                    f(req);
                } else {
                    for (j = 0; j < req.length; j = j + 1) {
                        f(req[j]);
                    }
                }
            }

            // add this module to full list of things to attach
            r.push(name);

        };

        // process each requirement and any additional requirements 
        // the module metadata specifies
        for (var i=0, l=a.length; i<l; i=i+1) {
            f(a[i]);
        }


        var onComplete = function(fromLoader) {


            fromLoader = fromLoader || {
                success: true,
                msg: 'not dynamic'
            };

            if (Y.Env._callback) {

                var cb = Y.Env._callback;
                Y.Env._callback = null;
                cb(Y, fromLoader);
            }

            if (Y.fire) {
                Y.fire('yui:load', Y, fromLoader);
            }
        };


        // dynamic load
        if (Y.Loader && missing.length) {
            loader = new Y.Loader(Y.config);
            loader.onSuccess = onComplete;
            loader.onFailure = onComplete;
            loader.onTimeout = onComplete;
            loader.attaching = a;
            loader.require(missing);
            loader.insert();
        } else {
            Y._attach(r);
            onComplete();
        }

        return Y; // chain support var yui = YUI().use('dragdrop');
    },


    /**
     * Returns the namespace specified and creates it if it doesn't exist
     * <pre>
     * YUI.namespace("property.package");
     * YUI.namespace("YAHOO.property.package");
     * </pre>
     * Either of the above would create YAHOO.property, then
     * YUI.property.package
     *
     * Be careful when naming packages. Reserved words may work in some browsers
     * and not others. For instance, the following will fail in Safari:
     * <pre>
     * YUI.namespace("really.long.nested.namespace");
     * </pre>
     * This fails because "long" is a future reserved word in ECMAScript
     *
     * @method namespace
     * @param  {string*} arguments 1-n namespaces to create 
     * @return {object}  A reference to the last namespace object created
     */
    namespace: function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d = a[i].split(".");
            o = this;
            for (j=(d[0] == "YAHOO") ? 1 : 0; j<d.length; j=j+1) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
        return o;
    },

    // this is replaced if the log module is included
    log: function() {

    },

    /**
     * Report an error.  The reporting mechanism is controled by
     * the 'throwFail' configuration attribute.  If throwFail is
     * not specified, the message is written to the logger, otherwise
     * a JS error is thrown
     * @method fail
     * @param msg {string} the failure message
     * @param e {Error} Optional JS error that was caught.  If supplied
     * and throwFail is specified, this error will be re-thrown.
     * @return {YUI} this YUI instance
     */
    fail: function(msg, e) {
        if (this.config.throwFail) {
            throw (e || new Error(msg)); 
        } else {
            var instance = this;
            instance.log(msg, "error"); // don't scrub this one
        }

        return this;
    },

    /**
     * Generate an id that is unique among all YUI instances
     * @method guid
     * @param pre {string} optional guid prefix
     * @return {string} the guid
     */
    guid: function(pre) {
        var e = this.Env, p = (pre) || e._pre;
        return p +'-' + e._yidx + '-' + e._uidx++;
    },

    /**
     * Stamps an object with a guid.  If the object already
     * has one, a new one is not created
     * @method stamp
     * @param o The object to stamp
     * @return {string} The object's guid
     */
    stamp: function(o) {

        if (!o) {
            return o;
        }

        var uid = (typeof o === 'string') ? o : o._yuid;

        if (!uid) {
            uid = this.guid();
            o._yuid = uid;
        }

        return uid;
    }
};

// Give the YUI global the same properties as an instance.
// This makes it so that the YUI global can be used like the YAHOO
// global was used prior to 3.x.  More importantly, the YUI global
// provides global metadata, so env needs to be configured.
// @TODO review

    var Y = YUI, p = Y.prototype, i;

    // inheritance utilities are not available yet
    for (i in p) {
        if (true) {
            Y[i] = p[i];
        }
    }

    // set up the environment
    Y._init();


})();
/**
 * YUI stub
 * @module yui
 * @submodule yui-base
 */
// This is just a stub to for dependency processing
YUI.add("yui-base", null, "@VERSION@");
/*
 * YUI console logger
 * @module yui
 * @submodule log
 */
YUI.add("log", function(instance) {

    /**
     * If the 'debug' config is true, a 'yui:log' event will be
     * dispatched, which the logger widget and anything else
     * can consume.  If the 'useBrowserConsole' config is true, it will
     * write to the browser console if available.
     *
     * @method log
     * @for YUI
     * @param  {String}  msg  The message to log.
     * @param  {String}  cat  The log category for the message.  Default
     *                        categories are "info", "warn", "error", time".
     *                        Custom categories can be used as well. (opt)
     * @param  {String}  src  The source of the the message (opt)
     * @param  {boolean} silent If true, the log event won't fire
     * @return {YUI}      YUI instance
     */
    instance.log = function(msg, cat, src, silent) {

        var Y = instance, c = Y.config, es = Y.Env._eventstack,
            // bail = (es && es.logging);
            bail = false; 

        // suppress log message if the config is off or the event stack
        // or the event call stack contains a consumer of the yui:log event
        if (c.debug && !bail) {

            // apply source filters
            if (src) {

                var exc = c.logExclude, inc = c.logInclude;

                // console.log('checking src filter: ' + src + ', inc: ' + inc + ', exc: ' + exc);

                if (inc && !(src in inc)) {
                    // console.log('bail: inc list found, but src is not in list: ' + src);
                    bail = true;
                } else if (exc && (src in exc)) {
                    // console.log('bail: exc list found, and src is in it: ' + src);
                    bail = true;
                }
            }

            if (!bail) {

                if (c.useBrowserConsole) {
                    var m = (src) ? src + ': ' + msg : msg;
                    if (typeof console != 'undefined') {
                        var f = (cat && console[cat]) ? cat : 'log';
                        console[f](m);
                    } else if (typeof opera != 'undefined') {
                        opera.postError(m);
                    }
                }

                if (Y.fire && !bail && !silent) {
                    Y.fire('yui:log', msg, cat, src);
                }
            }
        }

        return Y;
    };

}, "@VERSION@");
/*
 * YUI lang utils
 * @module yui
 * @submodule lang
 */
YUI.add("lang", function(Y) {

    /**
     * Provides the language utilites and extensions used by the library
     * @class Lang
     * @static
     */
    Y.Lang = Y.Lang || {};

    var L = Y.Lang, 

    ARRAY_TOSTRING = '[object Array]',
    FUNCTION_TOSTRING = '[object Function]',
    STRING = 'string',
    OBJECT = 'object',
    BOOLEAN = 'boolean',
    UNDEFINED = 'undefined',
    OP = Object.prototype;

    /**
     * Determines whether or not the provided object is an array.
     * Testing typeof/instanceof/constructor of arrays across frame 
     * boundaries isn't possible in Safari unless you have a reference
     * to the other frame to test against its Array prototype.  To
     * handle this case, we test well-known array properties instead.
     * properties.
     * @TODO can we kill this cross frame hack?
     * @method isArray
     * @static
     * @param o The object to test
     * @return {boolean} true if o is an array
     */
    L.isArray = function(o) { 
        return OP.toString.apply(o) === ARRAY_TOSTRING;
    };

    /**
     * Determines whether or not the provided object is a boolean
     * @method isBoolean
     * @static
     * @param o The object to test
     * @return {boolean} true if o is a boolean
     */
    L.isBoolean = function(o) {
        return typeof o === BOOLEAN;
    };
    
    /**
     * Determines whether or not the provided object is a function
     * Note: Internet Explorer thinks certain functions are objects:
     *
     * var obj = document.createElement("object");
     * Y.Lang.isFunction(obj.getAttribute) // reports false in IE
     *
     * var input = document.createElement("input"); // append to body
     * Y.Lang.isFunction(input.focus) // reports false in IE
     *
     * You will have to implement additional tests if these functions
     * matter to you.
     *
     * @method isFunction
     * @static
     * @param o The object to test
     * @return {boolean} true if o is a function
     */
    L.isFunction = function(o) {
        return OP.toString.apply(o) === FUNCTION_TOSTRING;
    };
        
    /**
     * Determines whether or not the supplied object is a date instance
     * @method isDate
     * @static
     * @param o The object to test
     * @return {boolean} true if o is a date
     */
    L.isDate = function(o) {
        return o instanceof Date;
    };

    /**
     * Determines whether or not the provided object is null
     * @method isNull
     * @static
     * @param o The object to test
     * @return {boolean} true if o is null
     */
    L.isNull = function(o) {
        return o === null;
    };
        
    /**
     * Determines whether or not the provided object is a legal number
     * @method isNumber
     * @static
     * @param o The object to test
     * @return {boolean} true if o is a number
     */
    L.isNumber = function(o) {
        return typeof o === 'number' && isFinite(o);
    };
      
    /**
     * Determines whether or not the provided object is of type object
     * or function
     * @method isObject
     * @static
     * @param o The object to test
     * @param failfn {boolean} fail if the input is a function
     * @return {boolean} true if o is an object
     */  
    L.isObject = function(o, failfn) {
return (o && (typeof o === OBJECT || (!failfn && L.isFunction(o)))) || false;
    };
        
    /**
     * Determines whether or not the provided object is a string
     * @method isString
     * @static
     * @param o The object to test
     * @return {boolean} true if o is a string
     */
    L.isString = function(o) {
        return typeof o === STRING;
    };
        
    /**
     * Determines whether or not the provided object is undefined
     * @method isUndefined
     * @static
     * @param o The object to test
     * @return {boolean} true if o is undefined
     */
    L.isUndefined = function(o) {
        return typeof o === UNDEFINED;
    };
    
    /**
     * Returns a string without any leading or trailing whitespace.  If 
     * the input is not a string, the input will be returned untouched.
     * @method trim
     * @static
     * @param s {string} the string to trim
     * @return {string} the trimmed string
     */
    L.trim = function(s){
        try {
            return s.replace(/^\s+|\s+$/g, "");
        } catch(e) {
            return s;
        }
    };

    /**
     * A convenience method for detecting a legitimate non-null value.
     * Returns false for null/undefined/NaN, true for other values, 
     * including 0/false/''
     * @method isValue
     * @static
     * @param o The item to test
     * @return {boolean} true if it is not null/undefined/NaN || false
     */
    L.isValue = function(o) {
// return (o || o === false || o === 0 || o === ''); // Infinity fails
return (L.isObject(o) || L.isString(o) || L.isNumber(o) || L.isBoolean(o));
    };

}, "@VERSION@");


/*
 * Array utilities
 * @module yui
 * @submodule array
 */

/**
 * YUI core
 * @module yui
 */

YUI.add("array", function(Y) {

    var L = Y.Lang, Native = Array.prototype;

    /**
     * Adds the following array utilities to the YUI instance
     * @class YUI~array
     */

    /** 
     * Y.Array(o) returns an array:
     * - Arrays are return unmodified unless the start position is specified.
     * - "Array-like" collections (@see Array.test) are converted to arrays
     * - For everything else, a new array is created with the input as the sole item
     * - The start position is used if the input is or is like an array to return
     *   a subset of the collection.
     *
     *   @TODO this will not automatically convert elements that are also collections
     *   such as forms and selects.  Passing true as the third param will
     *   force a conversion.
     *
     * @method Array
     * @static
     *   @param o the item to arrayify
     *   @param i {int} if an array or array-like, this is the start index
     *   @param al {boolean} if true, it forces the array-like fork.  This
     *   can be used to avoid multiple array.test calls.
     *   @return {Array} the resulting array
     */
    Y.Array = function(o, i, al) {
        var t = (al) ? 2 : Y.Array.test(o);

        // switch (t) {
        //     case 1:
        //         // return (i) ? o.slice(i) : o;
        //     case 2:
        //         return Native.slice.call(o, i || 0);
        //     default:
        //         return [o];
        // }

        if (t) {
            return Native.slice.call(o, i || 0);
        } else {
            return [o];
        }

    };

    var A = Y.Array;
    
    /** 
     * Evaluates the input to determine if it is an array, array-like, or 
     * something else.  This is used to handle the arguments collection 
     * available within functions, and HTMLElement collections
     *
     * @method Array.test
     * @static
     *
     * @todo current implementation (intenionally) will not implicitly 
     * handle html elements that are array-like (forms, selects, etc).  
     *
     * @return {int} a number indicating the results:
     * 0: Not an array or an array-like collection
     * 1: A real array. 
     * 2: array-like collection.
     */
    A.test = function(o) {
        var r = 0;
        if (L.isObject(o, true)) {
            if (L.isArray(o)) {
                r = 1; 
            } else {
                try {
                    // indexed, but no tagName (element) or alert (window)
                    if ("length" in o && 
                        !("tagName" in o) && 
                        !("alert" in o) && 
                        (!Y.Lang.isFunction(o.size) || o.size() > 1)) {
                            r = 2;
                    }
                        
                } catch(ex) {}
            }
        }
        return r;
    };

    /**
     * Executes the supplied function on each item in the array.
     * @method Array.each
     * @param a {Array} the array to iterate
     * @param f {Function} the function to execute on each item
     * @param o Optional context object
     * @static
     * @return {YUI} the YUI instance
     */
    A.each = (Native.forEach) ?
        function (a, f, o) { 
            Native.forEach.call(a, f, o || Y);
            return Y;
        } :
        function (a, f, o) { 
            var l = a.length, i;
            for (i = 0; i < l; i=i+1) {
                f.call(o || Y, a[i], i, a);
            }
            return Y;
        };

    /**
     * Executes the supplied function on each item in the array.
     * Returning true from the processing function will stop the 
     * processing of the remaining
     * items.
     * @method Array.some
     * @param a {Array} the array to iterate
     * @param f {Function} the function to execute on each item
     * @param o Optional context object
     * @static
     * @return {boolean} true if the 
     */
     A.some = (Native.forEach) ?
        function (a, f, o) { 
            Native.some.call(a, f, o || Y);
            return Y;
        } :
        function (a, f, o) {
            var l = a.length;
            for (var i = 0; i < l; i=i+1) {
                if (f.call(o, a[i], i, a)) {
                    return true;
                }
            }
            return false;
        };

    /**
     * Returns an object using the first array as keys, and
     * the second as values.  If the second array is not
     * provided the value is set to true for each.
     * @method Array.hash
     * @static
     * @param k {Array} keyset
     * @param v {Array} optional valueset
     * @return {object} the hash
     */
    A.hash = function(k, v) {
        var o = {}, l = k.length, vl = v && v.length, i;
        for (i=0; i<l; i=i+1) {
            o[k[i]] = (vl && vl > i) ? v[i] : true;
        }

        return o;
    };


    /**
     * Returns the index of the first item in the array
     * that contains the specified value, -1 if the
     * value isn't found.
     * @TODO use native method if avail
     * @method Array.indexOf
     * @static
     * @param a {Array} the array to search
     * @param val the value to search for
     * @return {int} the index of the item that contains the value or -1
     */
    A.indexOf = function(a, val) {
        for (var i=0; i<a.length; i=i+1) {
            if (a[i] === val) {
                return i;
            }
        }

        return -1;
    };

}, "@VERSION@");
/*
 * YUI core utilities
 * @module yui
 * @submodule core
 */
// requires lang
YUI.add("core", function(Y) {

    var L = Y.Lang, 
    A = Y.Array,
    OP = Object.prototype, 
    IEF = ["toString", "valueOf"], 
    PROTO = 'prototype',

    /**
     * IE will not enumerate native functions in a derived object even if the
     * function was overridden.  This is a workaround for specific functions 
     * we care about on the Object prototype. 
     * @property _iefix
     * @param {Function} r  the object to receive the augmentation
     * @param {Function} s  the object that supplies the properties to augment
     * @param w a whitelist object (the keys are the valid items to reference)
     * @private
     * @for YUI
     */
    _iefix = (Y.UA && Y.UA.ie) ?
        function(r, s, w) {
            for (var i=0, a=IEF; i<a.length; i=i+1) {
                var n = a[i], f = s[n];
                if (L.isFunction(f) && f != OP[n]) {
                    if (!w || (n in w)) {
                        r[n]=f;
                    }
                }
            }
        } : function() {};
   

    /**
     * Returns a new object containing all of the properties of
     * all the supplied objects.  The properties from later objects
     * will overwrite those in earlier objects.  Passing in a
     * single object will create a shallow copy of it.  For a deep
     * copy, use clone.
     * @method merge
     * @param arguments {Object*} the objects to merge
     * @return {object} the new merged object
     */
    Y.merge = function() {
        // var o={}, a=arguments;
        // for (var i=0, l=a.length; i<l; i=i+1) {
        //var a=arguments, o=Y.Object(a[0]);
        var a=arguments, o={};
        for (var i=0, l=a.length; i<l; i=i+1) {
            Y.mix(o, a[i], true);
        }
        return o;
    };
       
    /**
     * Applies the supplier's properties to the receiver.  By default
     * all prototype and static propertes on the supplier are applied
     * to the corresponding spot on the receiver.  By default all
     * properties are applied, and a property that is already on the
     * reciever will not be overwritten.  The default behavior can
     * be modified by supplying the appropriate parameters.
     *
     * @TODO add constants for the modes
     *
     * @method mix
     * @param {Function} r  the object to receive the augmentation
     * @param {Function} s  the object that supplies the properties to augment
     * @param ov {boolean} if true, properties already on the receiver
     * will be overwritten if found on the supplier.
     * @param wl {string[]} a whitelist.  If supplied, only properties in 
     * this list will be applied to the receiver.
     * @param {int} mode what should be copies, and to where
     *        default(0): object to object
     *        1: prototype to prototype (old augment)
     *        2: prototype to prototype and object props (new augment)
     *        3: prototype to object
     *        4: object to prototype
     * @param merge {boolean} merge objects instead of overwriting/ignoring
     * Used by Y.aggregate
     * @return {object} the augmented object
     * @TODO review for PR2
     */
    Y.mix = function(r, s, ov, wl, mode, merge) {

        if (!s||!r) {
            return Y;
        }

        var w = (wl && wl.length) ? A.hash(wl) : null, m = merge,

            f = function(fr, fs, proto, iwl) {

                var arr = m && L.isArray(fr);

                for (var i in fs) { 

                    if (fs.hasOwnProperty(i)) {

                        // We never want to overwrite the prototype
                        // if (PROTO === i) {
                        if (PROTO === i || '_yuid' === i) {
                            continue;
                        }

                        // @TODO deal with the hasownprop issue

                        // check white list if it was supplied
                        if (!w || iwl || (i in w)) {
                            // if the receiver has this property, it is an object,
                            // and merge is specified, merge the two objects.
                            if (m && L.isObject(fr[i], true)) {
                                // console.log('aggregate RECURSE: ' + i);
                                // @TODO recursive or no?
                                // Y.mix(fr[i], fs[i]); // not recursive
                                f(fr[i], fs[i], proto, true); // recursive
                            // otherwise apply the property only if overwrite
                            // is specified or the receiver doesn't have one.
                            // @TODO make sure the 'arr' check isn't desructive
                            } else if (!arr && (ov || !(i in fr))) {
                                // console.log('hash: ' + i);
                                fr[i] = fs[i];
                            // if merge is specified and the receiver is an array,
                            // append the array item
                            } else if (arr) {
                                // console.log('array: ' + i);
                                // @TODO probably will need to remove dups
                                fr.push(fs[i]);
                            }
                        }
                    }
                }

                _iefix(fr, fs, w);
            };

        var rp = r.prototype, sp = s.prototype;

        switch (mode) {
            case 1: // proto to proto
                f(rp, sp, true);
                break;
            case 2: // object to object and proto to proto
                f(r, s);
                f(rp, sp, true);
                break;
            case 3: // proto to static
                f(r, sp, true);
                break;
            case 4: // static to proto
                f(rp, s);
                break;
            default:  // object to object
                f(r, s);
        }

        return r;
    };

    

}, "@VERSION@");
/*
 * YUI object utilities
 * @module yui
 * @submodule object
 */
YUI.add("object", function(Y) {

    /**
     * Adds the following Object utilities to the YUI instance
     * @class YUI~object
     */

    /**
     * Y.Object(o) returns a new object based upon the supplied object.  
     * @method Object
     * @static
     * @param o the supplier object
     * @return {object} the new object
     */
    Y.Object = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    }; 

    var O = Y.Object, L = Y.Lang;

    /**
     * Determines whether or not the property was added
     * to the object instance.  Returns false if the property is not present
     * in the object, or was inherited from the prototype.
     *
     * @deprecated Safari 1.x support has been removed, so this is simply a 
     * wrapper for the native implementation.  Use the native implementation
     * directly instead.
     *
     * @TODO Remove in PR2
     *
     * @method Object.owns
     * @static
     * @param o {any} The object being testing
     * @param p {string} the property to look for
     * @return {boolean} true if the object has the property on the instance
     */
    O.owns = function(o, p) {
        return (o && o.hasOwnProperty) ? o.hasOwnProperty(p) : false;
    };

    /**
     * Returns an array containing the object's keys
     * @method Object.keys
     * @static
     * @param o an object
     * @return {string[]} the keys
     */
    O.keys = function(o) {
        var a=[], i;
        for (i in o) {
            if (o.hasOwnProperty(i)) {
                a.push(i);
            }
        }

        return a;
    };

    /**
     * Executes a function on each item. The function
     * receives the value, the key, and the object
     * as paramters (in that order).
     * @method Object.each
     * @static
     * @param o the object to iterate
     * @param f {function} the function to execute
     * @param c the execution context
     * @param proto {boolean} include proto
     * @return {YUI} the YUI instance
     */
    O.each = function (o, f, c, proto) {
        var s = c || Y;

        for (var i in o) {
            if (proto || o.hasOwnProperty(i)) {
                f.call(s, o[i], i, o);
            }
        }
        return Y;
    };
}, "@VERSION@");
/*
 * YUI user agent detection
 * @module yui
 * @submodule ua
 */
YUI.add("ua", function(Y) {

    /**
     * Browser/platform detection
     * @class UA
     * @static
     */
    Y.UA = function() {

        var o={

            /**
             * Internet Explorer version number or 0.  Example: 6
             * @property ie
             * @type float
             * @static
             */
            ie:0,

            /**
             * Opera version number or 0.  Example: 9.2
             * @property opera
             * @type float
             * @static
             */
            opera:0,

            /**
             * Gecko engine revision number.  Will evaluate to 1 if Gecko 
             * is detected but the revision could not be found. Other browsers
             * will be 0.  Example: 1.8
             * <pre>
             * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7
             * Firefox 1.5.0.9: 1.8.0.9 <-- Reports 1.8
             * Firefox 2.0.0.3: 1.8.1.3 <-- Reports 1.8
             * Firefox 3 alpha: 1.9a4   <-- Reports 1.9
             * </pre>
             * @property gecko
             * @type float
             * @static
             */
            gecko:0,

            /**
             * AppleWebKit version.  KHTML browsers that are not WebKit browsers 
             * will evaluate to 1, other browsers 0.  Example: 418.9.1
             * <pre>
             * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the 
             *                                   latest available for Mac OSX 10.3.
             * Safari 2.0.2:         416     <-- hasOwnProperty introduced
             * Safari 2.0.4:         418     <-- preventDefault fixed
             * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run
             *                                   different versions of webkit
             * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been
             *                                   updated, but not updated
             *                                   to the latest patch.
             * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native SVG
             *                                   and many major issues fixed).
             * Safari 3.0.4 (523.12) 523.12  <-- First Tiger release - automatic update
             *                                   from 2.x via the 10.4.11 OS patch
             *                                   
             * </pre>
             * http://developer.apple.com/internet/safari/uamatrix.html
             * @property webkit
             * @type float
             * @static
             */
            webkit:0,

            /**
             * The mobile property will be set to a string containing any relevant
             * user agent information when a modern mobile browser is detected.
             * Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series
             * devices with the WebKit-based browser, and Opera Mini.  
             * @property mobile 
             * @type string
             * @static
             */
            mobile: null 
        };

        var ua=navigator.userAgent, m;

        // Modern KHTML browsers should qualify as Safari X-Grade
        if ((/KHTML/).test(ua)) {
            o.webkit=1;
        }
        // Modern WebKit browsers are at least X-Grade
        m=ua.match(/AppleWebKit\/([^\s]*)/);
        if (m&&m[1]) {
            o.webkit=parseFloat(m[1]);

            // Mobile browser check
            if (/ Mobile\//.test(ua)) {
                o.mobile = "Apple"; // iPhone or iPod Touch
            } else {
                m=ua.match(/NokiaN[^\/]*/);
                if (m) {
                    o.mobile = m[0]; // Nokia N-series, ex: NokiaN95
                }
            }

        }

        if (!o.webkit) { // not webkit
            // @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
            m=ua.match(/Opera[\s\/]([^\s]*)/);
            if (m&&m[1]) {
                o.opera=parseFloat(m[1]);
                m=ua.match(/Opera Mini[^;]*/);
                if (m) {
                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                m=ua.match(/MSIE\s([^;]*)/);
                if (m&&m[1]) {
                    o.ie=parseFloat(m[1]);
                } else { // not opera, webkit, or ie
                    m=ua.match(/Gecko\/([^\s]*)/);
                    if (m) {
                        o.gecko=1; // Gecko detected, look for revision
                        m=ua.match(/rv:([^\s\)]*)/);
                        if (m&&m[1]) {
                            o.gecko=parseFloat(m[1]);
                        }
                    }
                }
            }
        }
        
        return o;
    }();
}, "@VERSION@");
/*
 * YUI setTimeout/setInterval abstraction
 * @module yui
 * @submodule later
 */
YUI.add("later", function(Y) {

    var L = Y.Lang;

    /**
     * Executes the supplied function in the context of the supplied 
     * object 'when' milliseconds later.  Executes the function a 
     * single time unless periodic is set to true.
     * @method later
     * @for YUI
     * @param when {int} the number of milliseconds to wait until the fn 
     * is executed.
     * @param o the context object.
     * @param fn {Function|String} the function to execute or the name of 
     * the method in the 'o' object to execute.
     * @param data [Array] data that is provided to the function.  This accepts
     * either a single item or an array.  If an array is provided, the
     * function is executed with one parameter for each array item.  If
     * you need to pass a single array parameter, it needs to be wrapped in
     * an array [myarray].
     * @param periodic {boolean} if true, executes continuously at supplied 
     * interval until canceled.
     * @return {object} a timer object. Call the cancel() method on this object to 
     * stop the timer.
     */
    var later = function(when, o, fn, data, periodic) {
        when = when || 0; 
        o = o || {};
        var m=fn, d=data, f, r;

        if (L.isString(fn)) {
            m = o[fn];
        }

        if (!m) {
            Y.fail("method undefined");
        }

        if (!L.isArray(d)) {
            d = [data];
        }

        f = function() {
            m.apply(o, d);
        };

        r = (periodic) ? setInterval(f, when) : setTimeout(f, when);

        return {
            interval: periodic,
            cancel: function() {
                if (this.interval) {
                    clearInterval(r);
                } else {
                    clearTimeout(r);
                }
            }
        };
    };

    Y.later = later;
    L.later = later;

}, "@VERSION@");
/*
 * YUI initializer
 * @module yui
 * @submodule init
 */
(function() {

    var min = ['yui-base', 'log', 'lang', 'array', 'core'], core,

    M = function(Y) {

        var C = Y.config;

        // apply the minimal required functionality
        Y.use.apply(Y, min);


        if (C.core) {

            core = C.core;

        } else {

            core = ["object", "ua", "later"];

            core.push(
              "get", 
              "loader");
        }

        Y.use.apply(Y, core);

    };
     
    YUI.add("yui", M, "@VERSION@");
    
    // {
        // the following will be bound automatically when this code is loaded
      //   use: core
    // });

})();
