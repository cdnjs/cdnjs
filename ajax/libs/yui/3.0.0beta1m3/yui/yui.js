/**
 * YUI core
 * @module yui
 */
(function() {

    var _instances = {}, _startTime = new Date().getTime(), p, i,

        add = function () {
            if (window.addEventListener) {
                return function(el, type, fn, capture) {
                    el.addEventListener(type, fn, (!!capture));
                };
            } else if (window.attachEvent) {
                return function(el, type, fn) {
                    el.attachEvent("on" + type, fn);
                };
            } else {
                return function(){};
            }
        }(),

        remove = function() {
            if (window.removeEventListener) {
                return function (el, type, fn, capture) {
                    el.removeEventListener(type, fn, !!capture);
                };
            } else if (window.detachEvent) {
                return function (el, type, fn) {
                    el.detachEvent("on" + type, fn);
                };
            } else {
                return function(){};
            }
        }(),

        globalListener = function() {
            YUI.Env.windowLoaded = true;
            YUI.Env.DOMReady = true;
            remove(window, 'load', globalListener);
        },

// @TODO: this needs to be created at build time from module metadata

        _APPLY_TO_WHITE_LIST = {
            'io.xdrReady': 1,
            'io.start': 1,
            'io.success': 1,
            'io.failure': 1
        };
        
// reduce to one or the other
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
     *  <li>debug: Turn debug statements on or off</li>
     *  <li>useBrowserConsole:
     *  Log to the browser console if debug is on and the console is available</li>
     *  <li>logInclude:
     *  A hash of log sources that should be logged.  If specified, only log messages from these sources will be logged.
     *  
     *  </li>
     *  <li>logExclude:
     *  A hash of log sources that should be not be logged.  If specified, all sources are logged if not on this list.</li>
     *  <li>injected: set to true if the yui seed file was dynamically loaded in
     *  order to bootstrap components relying on the window load event and onDOMReady.</li>
     *  <li>throwFail:
     *  If throwFail is set, Y.fail will generate or re-throw a JS error.  Otherwise the failure is logged.
     *  <li>win:
     *  The target window/frame</li>
     *  <li>core:
     *  A list of modules that defines the YUI core (overrides the default)</li>
     *  <li>dateFormat: default date format</li>
     *  <li>locale: default locale</li>
     *  <li>------------------------------------------------------------------------</li>
     *  <li>For event and get:</li>
     *  <li>------------------------------------------------------------------------</li>
     *  <li>pollInterval: The default poll interval</li>
     *  <li>windowResizeDelay: The time between browser events to wait before firing.</li>
     *  <li>-------------------------------------------------------------------------</li>
     *  <li>For loader:</li>
     *  <li>-------------------------------------------------------------------------</li>
     *  <li>base: The base dir</li>
     *  <li>secureBase: The secure base dir (not implemented)</li>
     *  <li>comboBase: The YUI combo service base dir. Ex: http://yui.yahooapis.com/combo?</li>
     *  <li>root: The root path to prepend to module names for the combo service. Ex: 2.5.2/build/</li>
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
     *      This option will automatically include the Logger widget</dd>
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
     *  <li>filters: per-component filter specification.  If specified for a given component, this overrides the filter config</li>
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
     *  <li>onCSS: callback for the 'CSSComplete' event.  When loading YUI components with CSS
     *  the CSS is loaded first, then the script.  This provides a moment you can tie into to improve
     *  the presentation of the page while the script is loading.</li>
     *  <li>onTimeout:
     *  callback for the 'timeout' event</li>
     *  <li>onProgress:
     *  callback executed each time a script or css file is loaded</li>
     *  <li>modules:
     *  A list of module definitions.  See Loader.addModule for the supported module metadata</li>
     * </ul>
     */

    /*global YUI*/
    // Make a function, disallow direct instantiation
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

        // find targeted window/frame
        // @TODO create facades
        var v = '@VERSION@', Y = this;
        o.win = o.win || window || {};
        o.win = o.win.contentWindow || o.win;
        o.doc = o.win.document;
        o.debug = ('debug' in o) ? o.debug : true;
        o.useBrowserConsole = ('useBrowserConsole' in o) ? o.useBrowserConsole : true;
        o.throwFail = ('throwFail' in o) ? o.throwFail : true;
    
        // add a reference to o for anything that needs it
        // before _setup is called.
        Y.config = o;

        Y.Env = {
            // @todo expand the new module metadata
            mods: {},
            _idx: 0,
            _pre: 'yuid',
            _used: {},
            _attached: {},
            _yidx: 0,
            _uidx: 0,
            _loaded: {}
        };


        if (v.indexOf('@') > -1) {
            v = 'test';
        }

        Y.version = v;

        Y.Env._loaded[v] = {};

        if (YUI.Env) {
            Y.Env._yidx = ++YUI.Env._idx;
            Y.id = Y.stamp(Y);
            _instances[Y.id] = Y;
        }

        Y.constructor = YUI;


        // this.log(this.id + ') init ');
    },
    
    /**
     * Finishes the instance setup. Attaches whatever modules were defined
     * when the yui modules was registered.
     * @method _setup
     * @private
     */
    _setup: function(o) {
        this.use("yui-base");
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
            this.error(method + ': applyTo not allowed');
            return null;
        }

        var instance = _instances[id], nest, m, i;

        if (instance) {

            nest = method.split('.'); 
            m = instance;

            for (i=0; i<nest.length; i=i+1) {

                m = m[nest[i]];

                if (!m) {
                    this.error('applyTo not found: ' + method);
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
     * @param details optional config data: 
     * requires   - features that should be present before loading
     * optional   - optional features that should be present if load optional defined
     * use  - features that should be attached automatically
     * skinnable  -
     * rollup
     * omit - features that should not be loaded if this module is present
     * @return {YUI} the YUI instance
     *
     */
    add: function(name, fn, version, details) {

        // this.log('Adding a new component ' + name);

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
            attached = this.Env._attached,
            i, l = r.length, name, m, d, req, use;

        for (i=0; i<l; i=i+1) {

            name = r[i]; 
            m    = mods[name];

            if (!attached[name] && m) {

                attached[name] = true;

                d   = m.details; 
                req = d.requires; 
                use = d.use;

                if (req) {
                    this._attach(this.Array(req));
                }

                // this.log('attaching ' + name, 'info', 'yui');

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

        if (this._loading) {
            this._useQueue.add(Array.prototype.slice.call(arguments));
            return this;
        }

        var Y = this, 
            a=Array.prototype.slice.call(arguments, 0), 
            mods = YUI.Env.mods, 
            used = Y.Env._used,
            loader, 
            firstArg = a[0], 
            dynamic = false,
            callback = a[a.length-1],
            k, i, l, missing = [], 
            r = [], 
            f = function(name) {

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

                    // CSS files don't register themselves, see if it has been loaded
                    if (!YUI.Env._loaded[Y.version][name]) {
                        missing.push(name);
                    } else {
                        // probably css
                        used[name] = true;
                    }
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

            },

            onComplete = function(fromLoader) {


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

                // process queued use requests as long until done 
                // or dynamic load happens again.
                this._loading = false;
                while (this._useQueue && this._useQueue.size() && !this._loading) {
                    Y.use.apply(Y, this._useQueue.next());
                }
            };


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
            for (k in mods) {
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
            this._useQueue = this._useQueue || new Y.Queue();
            loader = new Y.Loader(Y.config);
            loader.require(a);
            loader.ignoreRegistered = true;
            loader.allowRollup = false;
            loader.calculate();
            a = loader.sorted;
        }


        l = a.length;

        // process each requirement and any additional requirements 
        // the module metadata specifies
        for (i=0; i<l; i=i+1) {
            f(a[i]);
        }


        // dynamic load
        if (Y.Loader && missing.length) {
            this._loading = true;
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
     * Either of the above would create YUI.property, then
     * YUI.property.package (YAHOO is scrubbed out, this is
     * to remain compatible with YUI2)
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
            d = ("" + a[i]).split(".");
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
     * not specified, the message is written to the Logger, otherwise
     * a JS error is thrown
     * @method error
     * @param msg {string} the error message
     * @param e {Error} Optional JS error that was caught.  If supplied
     * and throwFail is specified, this error will be re-thrown.
     * @return {YUI} this YUI instance
     */
    error: function(msg, e) {
        if (this.config.throwFail) {
            throw (e || new Error(msg)); 
        } else {
            this.message(msg, "error"); // don't scrub this one
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
        var e = this.Env, p = (pre) || e._pre,
            id = p + '-' + 
                   this.version + '-' + 
                   e._yidx      + '-' + 
                   (e._uidx++)  + '-' + 
                   _startTime;

            return id.replace(/\./g, '_');
    },

    /**
     * Returns a guid associated with an object.  If the object
     * does not have one, a new one is created unless readOnly
     * is specified.
     * @method stamp
     * @param o The object to stamp
     * @param readOnly {boolean} if true, a valid guid will only
     * be returned if the object has one assigned to it.
     * @return {string} The object's guid or null
     */
    stamp: function(o, readOnly) {

        if (!o) {
            return o;
        }

        var uid = (typeof o === 'string') ? o : o._yuid;

        if (!uid) {
            uid = this.guid();
            if (!readOnly) {
                try {
                    o._yuid = uid;
                } catch(e) {
                    uid = null;
                }
            }
        }

        return uid;
    }
};

// Give the YUI global the same properties as an instance.
// This makes it so that the YUI global can be used like the YAHOO
// global was used prior to 3.x.  More importantly, the YUI global
// provides global metadata, so env needs to be configured.
// @TODO review

    p = YUI.prototype;

    // inheritance utilities are not available yet
    for (i in p) {
        if (true) {
            YUI[i] = p[i];
        }
    }

    // set up the environment
    YUI._init();

    // add a window load event at load time so we can capture
    // the case where it fires before dynamic loading is
    // complete.
    add(window, 'load', globalListener);

    YUI.Env.add = add;
    YUI.Env.remove = remove;

})();
YUI.add('yui-base', function(Y) {

/**
 * YUI stub
 * @module yui
 * @submodule yui-base
 */
(function() {

var instance = Y,
    LOGEVENT = 'yui:log',
    _published;

/**
 * If the 'debug' config is true, a 'yui:log' event will be
 * dispatched, which the Console widget and anything else
 * can consume.  If the 'useBrowserConsole' config is true, it will
 * write to the browser console if available.  YUI-specific log
 * messages will only be present in the -debug versions of the
 * JS files.  The build system is supposed to remove log statements
 * from the raw and minified versions of the files.
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

    var Y = instance, c = Y.config, bail = false, exc, inc, m, f;

    // suppress log message if the config is off or the event stack
    // or the event call stack contains a consumer of the yui:log event
    if (c.debug) {

        // apply source filters
        if (src) {

            exc = c.logExclude; 
            inc = c.logInclude;

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
                m = (src) ? src + ': ' + msg : msg;
                if (typeof console != 'undefined') {
                    f = (cat && console[cat]) ? cat : 'log';
                    console[f](m);
                } else if (typeof opera != 'undefined') {
                    opera.postError(m);
                }
            }

            if (Y.fire && !bail && !silent) {
                if (!_published) {
                    Y.publish(LOGEVENT, {
                        broadcast: 2,
                        emitFacade: true
                    });

                    _published = true;

                }
                Y.fire(LOGEVENT, {
                    msg: msg, 
                    cat: cat, 
                    src: src
                });
                

                // Y.fire('yui:log', msg, cat, src);
            }
        }
    }

    return Y;
};

/**
 * Write a system message.  This message will be preserved in the
 * minified and raw versions of the YUI files, unlike log statements.
 * @method message
 * @for YUI
 * @param  {String}  msg  The message to log.
 * @param  {String}  cat  The log category for the message.  Default
 *                        categories are "info", "warn", "error", time".
 *                        Custom categories can be used as well. (opt)
 * @param  {String}  src  The source of the the message (opt)
 * @param  {boolean} silent If true, the log event won't fire
 * @return {YUI}      YUI instance
 */
instance.message = function() {
    return instance.log.apply(instance, arguments);
};

/*
 * @TODO I'm not convinced the current log statement scrubbing routine can
 * be made safe with all the variations that could be supplied for
 * the condition.
 *
 * logIf statements are stripped from the raw and min files.
 * @method logIf
 * @for YUI
 * @param  {boolean} condition Logging only occurs if a truthy value is provided
 * @param  {String}  msg  The message to log.
 * @param  {String}  cat  The log category for the message.  Default
 *                        categories are "info", "warn", "error", time".
 *                        Custom categories can be used as well. (opt)
 * @param  {String}  src  The source of the the message (opt)
 * @param  {boolean} silent If true, the log event won't fire
 * @return {YUI}      YUI instance
 */
// instance.logIf = function(condition, msg, cat, src, silent) {
//     if (condition) {
//     }
// };

})();
(function() {
/**
 * Provides the language utilites and extensions used by the library
 * @class Lang
 * @static
 */
Y.Lang    = Y.Lang || {};

var L     = Y.Lang, 

ARRAY     = 'array',
BOOLEAN   = 'boolean',
DATE      = 'date',
ERROR     = 'error',
FUNCTION  = 'function',
NUMBER    = 'number',
NULL      = 'null',
OBJECT    = 'object',
REGEX     = 'regexp',
STRING    = 'string',
TOSTRING  = Object.prototype.toString,
UNDEFINED = 'undefined',

TYPES     = {
    'undefined'         : UNDEFINED,
    'number'            : NUMBER,
    'boolean'           : BOOLEAN,
    'string'            : STRING,
    '[object Function]' : FUNCTION,
    '[object RegExp]'   : REGEX,
    '[object Array]'    : ARRAY,
    '[object Date]'     : DATE,
    '[object Error]'    : ERROR 
},

TRIMREGEX = /^\s+|\s+$/g,
EMPTYSTRING = '';

/**
 * Determines whether or not the provided item is an array.
 * Returns false for array-like collections such as the
 * function arguments collection or HTMLElement collection
 * will return false.  You can use @see Array.test if you 
 * want to
 * @method isArray
 * @static
 * @param o The object to test
 * @return {boolean} true if o is an array
 */
L.isArray = function(o) { 
    return L.type(o) === ARRAY;
};

/**
 * Determines whether or not the provided item is a boolean
 * @method isBoolean
 * @static
 * @param o The object to test
 * @return {boolean} true if o is a boolean
 */
L.isBoolean = function(o) {
    return typeof o === BOOLEAN;
};

/**
 * Determines whether or not the provided item is a function
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
    return L.type(o) === FUNCTION;
};
    
/**
 * Determines whether or not the supplied item is a date instance
 * @method isDate
 * @static
 * @param o The object to test
 * @return {boolean} true if o is a date
 */
L.isDate = function(o) {
    // return o instanceof Date;
    return L.type(o) === DATE;
};

/**
 * Determines whether or not the provided item is null
 * @method isNull
 * @static
 * @param o The object to test
 * @return {boolean} true if o is null
 */
L.isNull = function(o) {
    return o === null;
};
    
/**
 * Determines whether or not the provided item is a legal number
 * @method isNumber
 * @static
 * @param o The object to test
 * @return {boolean} true if o is a number
 */
L.isNumber = function(o) {
    return typeof o === NUMBER && isFinite(o);
};
  
/**
 * Determines whether or not the provided item is of type object
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
 * Determines whether or not the provided item is a string
 * @method isString
 * @static
 * @param o The object to test
 * @return {boolean} true if o is a string
 */
L.isString = function(o) {
    return typeof o === STRING;
};
    
/**
 * Determines whether or not the provided item is undefined
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
        return s.replace(TRIMREGEX, EMPTYSTRING);
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
    var t = L.type(o);
    switch (t) {
        case NUMBER:
            return isFinite(o);
        case NULL:
        case UNDEFINED:
            return false;
        default:
            return !!(t);
    }
};

/**
 * Returns a string representing the type of the item passed in.
 * @method type
 * @param o the item to test
 * @return {string} the detected type
 */
L.type = function (o) {
    return  TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? OBJECT : NULL);
};

})();
(function() {
/**
 * YUI core
 * @module yui
 */


var L = Y.Lang, Native = Array.prototype,

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
A = function(o, startIdx, al) {
    var t = (al) ? 2 : Y.Array.test(o), i, l, a;

    // switch (t) {
    //     case 1:
    //         // return (startIdx) ? o.slice(startIdx) : o;
    //     case 2:
    //         return Native.slice.call(o, startIdx || 0);
    //     default:
    //         return [o];
    // }

    if (t) {
        try {
            return Native.slice.call(o, startIdx || 0);
        // IE errors when trying to slice element collections
        } catch(e) {
            a=[];
            for (i=0, l=o.length; i<l; i=i+1) {
                a.push(o[i]);
            }
            return a;
        }
    } else {
        return [o];
    }

};

Y.Array = A;

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
    if (L.isObject(o)) {
        if (L.isArray(o)) {
            r = 1; 
        } else {
            try {
                // indexed, but no tagName (element) or alert (window)
                if ("length" in o && !("tagName" in o) && !("alert" in o) && 
                    (!Y.Lang.isFunction(o.size) || o.size() > 1)) {
                    r = 2;
                }
                    
            } catch(e) {}
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
        Native.forEach.call(a || [], f, o || Y);
        return Y;
    } :
    function (a, f, o) { 
        var l = (a && a.length) || 0, i;
        for (i = 0; i < l; i=i+1) {
            f.call(o || Y, a[i], i, a);
        }
        return Y;
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
 * @method Array.indexOf
 * @static
 * @param a {Array} the array to search
 * @param val the value to search for
 * @return {int} the index of the item that contains the value or -1
 */
A.indexOf = (Native.indexOf) ?
    function(a, val) {
        return a.indexOf(val);
    } :
    function(a, val) {
        for (var i=0; i<a.length; i=i+1) {
            if (a[i] === val) {
                return i;
            }
        }

        return -1;
    };

/**
 * Numeric sort convenience function.
 * Y.ArrayAssert.itemsAreEqual([1, 2, 3], [3, 1, 2].sort(Y.Array.numericSort));
 * @method numericSort
 */
A.numericSort = function(a, b) { 
    return (a - b); 
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
 * @return {boolean} true if the function returns true on
 * any of the items in the array
 */
 A.some = (Native.some) ?
    function (a, f, o) { 
        return Native.some.call(a, f, o);
    } :
    function (a, f, o) {
        var l = a.length, i;
        for (i=0; i<l; i=i+1) {
            if (f.call(o, a[i], i, a)) {
                return true;
            }
        }
        return false;
    };

})();
(function() {

var L = Y.Lang, 
A = Y.Array,
OP = Object.prototype, 
IEF = ["toString", "valueOf"], 
PROTO = 'prototype',
DELIMITER = '`~',

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
        var i, a = IEF, n, f;
        for (i=0; i<a.length; i=i+1) {
            n = a[i]; 
            f = s[n];
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
    var a = arguments, o = {}, i, l = a.length;
    for (i=0; i<l; i=i+1) {
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

            var arr = m && L.isArray(fr), i;

            for (i in fs) { 

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
        },

        rp = r.prototype, 

        sp = s.prototype;

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

/**
 * Returns a wrapper for a function which caches the
 * return value of that function, keyed off of the combined 
 * argument values.
 * @function cached
 * @param source {function} the function to memoize
 * @param cache an optional cache seed
 * @return {Function} the wrapped function
 */
Y.cached = function(source, cache){
    cache = cache || {};

    return function(arg1, arg2) {
        var a = arguments, 
            key = arg2 ? Y.Array(a, 0, true).join(DELIMITER) : arg1;

        if (!(key in cache)) {
            cache[key] = source.apply(source, a);
        }

        return cache[key];
    };

};

})();
(function() {

/**
 * Adds the following Object utilities to the YUI instance
 * @class YUI~object
 */

/**
 * Y.Object(o) returns a new object based upon the supplied object.  
 * @TODO Use native Object.create() when available
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

var O = Y.Object,

UNDEFINED = undefined,

/**
 * Extracts the keys, values, or size from an object
 * 
 * @method _extract
 * @param o the object
 * @param what what to extract (0: keys, 1: values, 2: size)
 * @return {boolean|Array} the extracted info
 * @private
 */
_extract = function(o, what) {
    var count = (what === 2), out = (count) ? 0 : [], i;

    for (i in o) {
        if (count) {
            out++;
        } else {
            if (o.hasOwnProperty(i)) {
                out.push((what) ? o[i] : i);
            }
        }
    }

    return out;
};

/**
 * Returns an array containing the object's keys
 * @TODO use native Object.keys() if available
 * @method Object.keys
 * @static
 * @param o an object
 * @return {string[]} the keys
 */
O.keys = function(o) {
    return _extract(o);
};

/**
 * Returns an array containing the object's values
 * @TODO use native Object.values() if available
 * @method Object.values
 * @static
 * @param o an object
 * @return {Array} the values
 */
O.values = function(o) {
    return _extract(o, 1);
};

/**
 * Returns the size of an object
 * @TODO use native Object.size() if available
 * @method Object.size
 * @static
 * @param o an object
 * @return {int} the size
 */
O.size = function(o) {
    return _extract(o, 2);
};

/**
 * Returns true if the object contains a given key
 * @method Object.hasKey
 * @static
 * @param o an object
 * @param k the key to query
 * @return {boolean} true if the object contains the key
 */
O.hasKey = function(o, k) {
    // return (o.hasOwnProperty(k));
    return (k in o);
};

/**
 * Returns true if the object contains a given value
 * @method Object.hasValue
 * @static
 * @param o an object
 * @param v the value to query
 * @return {boolean} true if the object contains the value
 */
O.hasValue = function(o, v) {
    return (Y.Array.indexOf(O.values(o), v) > -1);
};

/**
 * Determines whether or not the property was added
 * to the object instance.  Returns false if the property is not present
 * in the object, or was inherited from the prototype.
 *
 * @deprecated Safari 1.x support has been removed, so this is simply a 
 * wrapper for the native implementation.  Use the native implementation
 * directly instead.
 *
 * @TODO Remove in B1
 *
 * @method Object.owns
 * @static
 * @param o {any} The object being testing
 * @param p {string} the property to look for
 * @return {boolean} true if the object has the property on the instance
 */
O.owns = function(o, k) {
    return (o.hasOwnProperty(k));
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
    var s = c || Y, i;

    for (i in o) {
        if (proto || o.hasOwnProperty(i)) {
            f.call(s, o[i], i, o);
        }
    }
    return Y;
};

/**
 * Retrieves the sub value at the provided path,
 * from the value object provided.
 *
 * @method getValue
 * @param o The object from which to extract the property value
 * @param path {Array} A path array, specifying the object traversal path
 * from which to obtain the sub value.
 * @return {Any} The value stored in the path, undefined if not found.
 * Returns the source object if an empty path is provided.
 */
O.getValue = function (o, path) {
    var p=Y.Array(path), l=p.length, i;

    for (i=0; o !== UNDEFINED && i < l; i=i+1) {
        o = o[p[i]];
    }

    return o;
};

/**
 * Sets the sub-attribute value at the provided path on the 
 * value object.  Returns the modified value object, or 
 * undefined if the path is invalid.
 *
 * @method setValue
 * @param o             The object on which to set the sub value.
 * @param path {Array}  A path array, specifying the object traversal path
 *                      at which to set the sub value.
 * @param val {Any}     The new value for the sub-attribute.
 * @return {Object}     The modified object, with the new sub value set, or 
 *                      undefined, if the path was invalid.
 */
O.setValue = function(o, path, val) {

    var p=Y.Array(path), leafIdx=p.length-1, i, ref=o;

    if (leafIdx >= 0) {
        for (i=0; ref !== UNDEFINED && i < leafIdx; i=i+1) {
            ref = ref[p[i]];
        }

        if (ref !== UNDEFINED) {
            ref[p[i]] = val;
        } else {
            return UNDEFINED;
        }
    }

    return o;
};


})();
/**
 * YUI user agent detection.
 * Do not fork for a browser if it can be avoided.  Use feature detection when
 * you can.  Use the user agent as a last resort.  UA stores a version
 * number for the browser engine, 0 otherwise.  This value may or may not map
 * to the version number of the browser using the engine.  The value is 
 * presented as a float so that it can easily be used for boolean evaluation 
 * as well as for looking for a particular range of versions.  Because of this, 
 * some of the granularity of the version info may be lost (e.g., Gecko 1.8.0.9 
 * reports 1.8).
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
         * will evaluate to 1, other browsers 0.  Example: 418.9
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
         * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.
         *                                   yahoo.com user agent hack removed.
         * </pre>
         * http://en.wikipedia.org/wiki/Safari_(web_browser)#Version_history
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
        mobile: null,

        /**
         * Adobe AIR version number or 0.  Only populated if webkit is detected.
         * Example: 1.0
         * @property air
         * @type float
         */
        air: 0,

        /**
         * Google Caja version number or 0.
         * @property caja
         * @type float
         */
        caja: 0,

        /**
         * Set to true if the page appears to be in SSL
         * @property secure
         * @type boolean
         * @static
         */
        secure: false,

        /**
         * The operating system.  Currently only detecting windows or macintosh
         * @property os
         * @type string
         * @static
         */
        os: null
        
    },

    ua = navigator && navigator.userAgent, 

    loc = Y.config.win.location,

    href = loc && loc.href,
    
    m;

    o.secure = href && (href.toLowerCase().indexOf("https") === 0);

    if (ua) {

        if ((/windows|win32/).test(ua)) {
            o.os = 'windows';
        } else if ((/macintosh/).test(ua)) {
            o.os = 'macintosh';
        }

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

            m=ua.match(/AdobeAIR\/([^\s]*)/);
            if (m) {
                o.air = m[0]; // Adobe AIR 1.0 or better
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

        m=ua.match(/Caja\/([^\s]*)/);
        if (m&&m[1]) {
            o.caja=parseFloat(m[1]);
        }
    }
    
    return o;
}();
(function() {
    var L = Y.Lang,

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
    later = function(when, o, fn, data, periodic) {
        when = when || 0; 
        o = o || {};
        var m=fn, d=data, f, r;

        if (L.isString(fn)) {
            m = o[fn];
        }

        if (!m) {
            Y.error("method undefined");
        }

        if (!L.isArray(d)) {
            d = [data];
        }

        f = function() {
            m.apply(o, d);
        };

        r = (periodic) ? setInterval(f, when) : setTimeout(f, when);

        return {
            id: r,
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

})();
(function() {

    // var min = ['yui-base', 'log', 'lang', 'array', 'core'], core, C = Y.config;
    var min = ['yui-base'], core, C = Y.config;

    // apply the minimal required functionality
    Y.use.apply(Y, min);


    if (C.core) {

        core = C.core;

    } else {

        core = ['queue-base', 'get', 'loader'];
    }

    Y.use.apply(Y, core);

     
})();


}, '@VERSION@' );
YUI.add('queue-base', function(Y) {

/**
 * A simple FIFO queue of function references.
 *
 * @module queue
 * @submodule queue-base
 * @class Queue
 * @param callback* {Function} 0..n callback functions to seed the queue
 */
function Queue() {
    this._init();
    this.add.apply(this, arguments);
}

Queue.prototype = {
    /**
     * Initialize the queue
     *
     * @method _init
     * @protected
     */
    _init : function () {
        /**
         * The collection of enqueued functions
         *
         * @property _q
         * @type {Array}
         * @protected
         */
        this._q = [];
    },

    /**
     * Get the next callback in the queue.
     *
     * @method next
     * @return {Function} the next callback in the queue
     */
    next : function () {
        return this._q.shift();
    },

    /**
     * Add 0..n callbacks to the end of the queue
     *
     * @method add
     * @param callback* {Function} 0..n callback functions
     */
    add : function () {
        Y.Array.each(Y.Array(arguments,0,true),function (fn) {
            this._q.push(fn);
        },this);

        return this;
    },

    /**
     * Returns the current number of queued callbacks
     *
     * @method size
     * @return {Number}
     */
    size : function () {
        return this._q.length;
    }
};

Y.Queue = Queue;


}, '@VERSION@' );
YUI.add('get', function(Y) {

(function() {

/**
 * Provides a mechanism to fetch remote resources and
 * insert them into a document.
 * @module yui
 * @submodule get
 */

var ua         = Y.UA, 
    L          = Y.Lang,
    PREFIX     = Y.guid('yui_'),
    TYPE_JS    = "text/javascript",
    TYPE_CSS   = "text/css",
    STYLESHEET = "stylesheet";

/**
 * Fetches and inserts one or more script or link nodes into the document 
 * @class Get
 * @static
 */
Y.Get = function() {

    /**
     * hash of queues to manage multiple requests
     * @property queues
     * @private
     */
    var queues={}, 
        
    /**
     * queue index used to generate transaction ids
     * @property qidx
     * @type int
     * @private
     */
        qidx=0, 
        
    /**
     * node index used to generate unique node ids
     * @property nidx
     * @type int
     * @private
     */
        nidx=0, 

    /**
     * interal property used to prevent multiple simultaneous purge 
     * processes
     * @property purging
     * @type boolean
     * @private
     */
        purging=false,

    
    /** 
     * Generates an HTML element, this is not appended to a document
     * @method _node
     * @param type {string} the type of element
     * @param attr {string} the attributes
     * @param win {Window} optional window to create the element in
     * @return {HTMLElement} the generated node
     * @private
     */
    _node = function(type, attr, win) {
        var w = win || Y.config.win, d=w.document, n=d.createElement(type),
            i;

        for (i in attr) {
            if (attr[i] && attr.hasOwnProperty(i)) {
                n.setAttribute(i, attr[i]);
            }
        }

        return n;
    },

    /**
     * Generates a link node
     * @method _linkNode
     * @param url {string} the url for the css file
     * @param win {Window} optional window to create the node in
     * @param attributes optional attributes collection to apply to the new node
     * @return {HTMLElement} the generated node
     * @private
     */
    _linkNode = function(url, win, attributes) {
        var o = {
            id:   PREFIX + (nidx++),
            type: TYPE_CSS,
            rel:  STYLESHEET,
            href: url
        };
        if (attributes) {
            Y.mix(o, attributes);
        }
        return _node("link", o, win);
    },

    /**
     * Generates a script node
     * @method _scriptNode
     * @param url {string} the url for the script file
     * @param win {Window} optional window to create the node in
     * @param attributes optional attributes collection to apply to the new node
     * @return {HTMLElement} the generated node
     * @private
     */
    _scriptNode = function(url, win, attributes) {
        var o = {
            id:   PREFIX + (nidx++),
            type: TYPE_JS,
            src:  url
        };

        if (attributes) {
            Y.mix(o, attributes);
        }

        return _node("script", o, win);
    },

    /**
     * Removes the nodes for the specified queue
     * @method _purge
     * @private
     */
    _purge = function(tId) {
        var q=queues[tId], n, l, d, h, s, i;
        if (q) {
            n = q.nodes; 
            l = n.length;
            d = q.win.document;
            h = d.getElementsByTagName("head")[0];

            if (q.insertBefore) {
                s = _get(q.insertBefore, tId);
                if (s) {
                    h = s.parentNode;
                }
            }

            for (i=0; i<l; i=i+1) {
                h.removeChild(n[i]);
            }
        }
        q.nodes = [];
    },

    /**
     * Returns the data payload for callback functions
     * @method _returnData
     * @private
     */
    _returnData = function(q, msg, result) {
        return {
                tId: q.tId,
                win: q.win,
                data: q.data,
                nodes: q.nodes,
                msg: msg,
                statusText: result,
                purge: function() {
                    _purge(this.tId);
                }
            };
    },

    /**
     * The transaction is finished
     * @method _end
     * @param id {string} the id of the request
     * @private
     */
    _end = function(id, msg, result) {
        var q = queues[id], sc;
        if (q && q.onEnd) {
            sc = q.context || q;
            q.onEnd.call(sc, _returnData(q, msg, result));
        }
    },

    /*
     * The request failed, execute fail handler with whatever
     * was accomplished.  There isn't a failure case at the
     * moment unless you count aborted transactions
     * @method _fail
     * @param id {string} the id of the request
     * @private
     */
    _fail = function(id, msg) {


        var q = queues[id], sc;
        if (q.timer) {
            q.timer.cancel();
        }

        // execute failure callback
        if (q.onFailure) {
            sc = q.context || q;
            q.onFailure.call(sc, _returnData(q, msg));
        }

        _end(id, msg, 'failure');
    },

    _get = function(nId, tId) {
        var q = queues[tId],
            n = (L.isString(nId)) ? q.win.document.getElementById(nId) : nId;
        if (!n) {
            _fail(tId, "target node not found: " + nId);
        }

        return n;
    },

    /**
     * The request is complete, so executing the requester's callback
     * @method _finish
     * @param id {string} the id of the request
     * @private
     */
    _finish = function(id) {
        var q = queues[id], msg, sc;
        if (q.timer) {
            q.timer.cancel();
        }
        q.finished = true;

        if (q.aborted) {
            msg = "transaction " + id + " was aborted";
            _fail(id, msg);
            return;
        }

        // execute success callback
        if (q.onSuccess) {
            sc = q.context || q;
            q.onSuccess.call(sc, _returnData(q));
        }

        _end(id, msg, 'OK');
    },

    /**
     * Timeout detected
     * @method _timeout
     * @param id {string} the id of the request
     * @private
     */
    _timeout = function(id) {
        var q = queues[id], sc;
        if (q.onTimeout) {
            sc = q.context || q;
            q.onTimeout.call(sc, _returnData(q));
        }

        _end(id, 'timeout', 'timeout');
    },
    

    /**
     * Loads the next item for a given request
     * @method _next
     * @param id {string} the id of the request
     * @param loaded {string} the url that was just loaded, if any
     * @private
     */
    _next = function(id, loaded) {


        var q = queues[id], msg, w, d, h, n, url, s;

        if (q.timer) {
            q.timer.cancel();
        }

        if (q.aborted) {
            msg = "transaction " + id + " was aborted";
            _fail(id, msg);
            return;
        }

        if (loaded) {
            q.url.shift(); 
            if (q.varName) {
                q.varName.shift(); 
            }
        } else {
            // This is the first pass: make sure the url is an array
            q.url = (L.isString(q.url)) ? [q.url] : q.url;
            if (q.varName) {
                q.varName = (L.isString(q.varName)) ? [q.varName] : q.varName;
            }
        }

        w = q.win; 
        d = w.document; 
        h = d.getElementsByTagName("head")[0];

        if (q.url.length === 0) {
            _finish(id);
            return;
        } 

        url = q.url[0];

        // if the url is undefined, this is probably a trailing comma problem in IE
        if (!url) {
            q.url.shift(); 
            return _next(id);
        }


        if (q.timeout) {
            q.timer = L.later(q.timeout, q, _timeout, id);
        }

        if (q.type === "script") {
            n = _scriptNode(url, w, q.attributes);
        } else {
            n = _linkNode(url, w, q.attributes);
        }

        // track this node's load progress
        _track(q.type, n, id, url, w, q.url.length);

        // add the node to the queue so we can return it to the user supplied callback
        q.nodes.push(n);

        // add it to the head or insert it before 'insertBefore'
        if (q.insertBefore) {
            s = _get(q.insertBefore, id);
            if (s) {
                s.parentNode.insertBefore(n, s);
            }
        } else {
            h.appendChild(n);
        }
        

        // FireFox does not support the onload event for link nodes, so there is
        // no way to make the css requests synchronous. This means that the css 
        // rules in multiple files could be applied out of order in this browser
        // if a later request returns before an earlier one.  Safari too.
        if ((ua.webkit || ua.gecko) && q.type === "css") {
            _next(id, url);
        }
    },

    /**
     * Removes processed queues and corresponding nodes
     * @method _autoPurge
     * @private
     */
    _autoPurge = function() {

        if (purging) {
            return;
        }

        purging = true;

        var i, q;

        for (i in queues) {
            if (queues.hasOwnProperty(i)) {
                q = queues[i];
                if (q.autopurge && q.finished) {
                    _purge(q.tId);
                    delete queues[i];
                }
            }
        }

        purging = false;
    },

    /**
     * Saves the state for the request and begins loading
     * the requested urls
     * @method queue
     * @param type {string} the type of node to insert
     * @param url {string} the url to load
     * @param opts the hash of options for this request
     * @private
     */
    _queue = function(type, url, opts) {

        opts = opts || {};

        var id = "q" + (qidx++), q,
            thresh = opts.purgethreshold || Y.Get.PURGE_THRESH;

        if (qidx % thresh === 0) {
            _autoPurge();
        }

        queues[id] = Y.merge(opts, {
            tId: id,
            type: type,
            url: url,
            finished: false,
            nodes: []
        });

        q           = queues[id];
        q.win       = q.win || Y.config.win;
        q.context   = q.context || q;
        q.autopurge = ("autopurge" in q) ? q.autopurge : 
                      (type === "script") ? true : false;

        if (opts.charset) {
            q.attributes = q.attributes || {};
            q.attributes.charset = opts.charset;
        }

        L.later(0, q, _next, id);

        return {
            tId: id
        };
    },

    /**
     * Detects when a node has been loaded.  In the case of
     * script nodes, this does not guarantee that contained
     * script is ready to use.
     * @method _track
     * @param type {string} the type of node to track
     * @param n {HTMLElement} the node to track
     * @param id {string} the id of the request
     * @param url {string} the url that is being loaded
     * @param win {Window} the targeted window
     * @param qlength the number of remaining items in the queue,
     * including this one
     * @param trackfn {Function} function to execute when finished
     * the default is _next
     * @private
     */
    _track = function(type, n, id, url, win, qlength, trackfn) {
        var f = trackfn || _next;

        // IE supports the readystatechange event for script and css nodes
        // Opera only for script nodes.  Opera support onload for script
        // nodes, but this doesn't fire when there is a load failure.
        // The onreadystatechange appears to be a better way to respond
        // to both success and failure.
        if (ua.ie) {
            n.onreadystatechange = function() {
                var rs = this.readyState;
                if ("loaded" === rs || "complete" === rs) {
                    n.onreadystatechange = null;
                    f(id, url);
                }
            };

        // webkit prior to 3.x is no longer supported
        } else if (ua.webkit) {

            if (type === "script") {
                // Safari 3.x supports the load event for script nodes (DOM2)
                n.addEventListener("load", function() {
                    f(id, url);
                });
            } 

        // FireFox and Opera support onload (but not DOM2 in FF) handlers for
        // script nodes.  Opera, but not FF, supports the onload event for link
        // nodes.
        } else { 

            n.onload = function() {
                f(id, url);
            };

            n.onerror = function(e) {
                _fail(id, e + ": " + url);
            };
        }
    };

    return {

        /**
         * The number of request required before an automatic purge.
         * property PURGE_THRESH
         * @static
         * @type int
         * @default 20
         */
        PURGE_THRESH: 20,

        /**
         * Called by the the helper for detecting script load in Safari
         * @method _finalize
         * @static
         * @param id {string} the transaction id
         * @private
         */
        _finalize: function(id) {
            L.later(0, null, _finish, id);
        },

        /**
         * Abort a transaction
         * @method abort
         * @static
         * @param o {string|object} Either the tId or the object returned from
         * script() or css()
         */
        abort: function(o) {
            var id = (L.isString(o)) ? o : o.tId,
                q = queues[id];
            if (q) {
                q.aborted = true;
            }
        }, 

        /**
         * Fetches and inserts one or more script nodes into the head
         * of the current document or the document in a specified window.
         *
         * @method script
         * @static
         * @param url {string|string[]} the url or urls to the script(s)
         * @param opts {object} Options: 
         * <dl>
         * <dt>onSuccess</dt>
         * <dd>
         * callback to execute when the script(s) are finished loading
         * The callback receives an object back with the following
         * data:
         * <dl>
         * <dt>win</dt>
         * <dd>the window the script(s) were inserted into</dd>
         * <dt>data</dt>
         * <dd>the data object passed in when the request was made</dd>
         * <dt>nodes</dt>
         * <dd>An array containing references to the nodes that were
         * inserted</dd>
         * <dt>purge</dt>
         * <dd>A function that, when executed, will remove the nodes
         * that were inserted</dd>
         * <dt>
         * </dl>
         * </dd>
         * <dt>onTimeout</dt>
         * <dd>
         * callback to execute when a timeout occurs.
         * The callback receives an object back with the following
         * data:
         * <dl>
         * <dt>win</dt>
         * <dd>the window the script(s) were inserted into</dd>
         * <dt>data</dt>
         * <dd>the data object passed in when the request was made</dd>
         * <dt>nodes</dt>
         * <dd>An array containing references to the nodes that were
         * inserted</dd>
         * <dt>purge</dt>
         * <dd>A function that, when executed, will remove the nodes
         * that were inserted</dd>
         * <dt>
         * </dl>
         * </dd>
         * <dt>onEnd</dt>
         * <dd>a function that executes when the transaction finishes, regardless of the exit path</dd>
         * <dt>onFailure</dt>
         * <dd>
         * callback to execute when the script load operation fails
         * The callback receives an object back with the following
         * data:
         * <dl>
         * <dt>win</dt>
         * <dd>the window the script(s) were inserted into</dd>
         * <dt>data</dt>
         * <dd>the data object passed in when the request was made</dd>
         * <dt>nodes</dt>
         * <dd>An array containing references to the nodes that were
         * inserted successfully</dd>
         * <dt>purge</dt>
         * <dd>A function that, when executed, will remove any nodes
         * that were inserted</dd>
         * <dt>
         * </dl>
         * </dd>
         * <dt>context</dt>
         * <dd>the execution context for the callbacks</dd>
         * <dt>win</dt>
         * <dd>a window other than the one the utility occupies</dd>
         * <dt>autopurge</dt>
         * <dd>
         * setting to true will let the utilities cleanup routine purge 
         * the script once loaded
         * </dd>
         * <dt>purgethreshold</dt>
         * <dd>
         * The number of transaction before autopurge should be initiated
         * </dd>
         * <dt>data</dt>
         * <dd>
         * data that is supplied to the callback when the script(s) are
         * loaded.
         * </dd>
         * <dt>insertBefore</dt>
         * <dd>node or node id that will become the new node's nextSibling</dd>
         * </dl>
         * <dt>charset</dt>
         * <dd>Node charset, default utf-8 (deprecated, use the attributes config)</dd>
         * <dt>attributes</dt>
         * <dd>An object literal containing additional attributes to add to the link tags</dd>
         * <dt>timeout</dt>
         * <dd>Number of milliseconds to wait before aborting and firing the timeout event</dd>
         * <pre>
         * &nbsp;&nbsp;Y.Get.script(
         * &nbsp;&nbsp;["http://yui.yahooapis.com/2.5.2/build/yahoo/yahoo-min.js",
         * &nbsp;&nbsp;&nbsp;"http://yui.yahooapis.com/2.5.2/build/event/event-min.js"], &#123;
         * &nbsp;&nbsp;&nbsp;&nbsp;onSuccess: function(o) &#123;
         * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.log("won't cause error because Y is the context");
         * &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
         * &nbsp;&nbsp;&nbsp;&nbsp;onFailure: function(o) &#123;
         * &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
         * &nbsp;&nbsp;&nbsp;&nbsp;onTimeout: function(o) &#123;
         * &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
         * &nbsp;&nbsp;&nbsp;&nbsp;data: "foo",
         * &nbsp;&nbsp;&nbsp;&nbsp;timeout: 10000, // 10 second timeout
         * &nbsp;&nbsp;&nbsp;&nbsp;context: Y, // make the YUI instance
         * &nbsp;&nbsp;&nbsp;&nbsp;// win: otherframe // target another window/frame
         * &nbsp;&nbsp;&nbsp;&nbsp;autopurge: true // allow the utility to choose when to remove the nodes
         * &nbsp;&nbsp;&nbsp;&nbsp;purgetheshold: 1 // purge previous transaction before next transaction
         * &nbsp;&nbsp;&#125;);
         * </pre>
         * @return {tId: string} an object containing info about the transaction
         */
        script: function(url, opts) { 
            return _queue("script", url, opts); 
        },

        /**
         * Fetches and inserts one or more css link nodes into the 
         * head of the current document or the document in a specified
         * window.
         * @method css
         * @static
         * @param url {string} the url or urls to the css file(s)
         * @param opts Options: 
         * <dl>
         * <dt>onSuccess</dt>
         * <dd>
         * callback to execute when the css file(s) are finished loading
         * The callback receives an object back with the following
         * data:
         * <dl>win</dl>
         * <dd>the window the link nodes(s) were inserted into</dd>
         * <dt>data</dt>
         * <dd>the data object passed in when the request was made</dd>
         * <dt>nodes</dt>
         * <dd>An array containing references to the nodes that were
         * inserted</dd>
         * <dt>purge</dt>
         * <dd>A function that, when executed, will remove the nodes
         * that were inserted</dd>
         * <dt>
         * </dl>
         * </dd>
         * <dt>context</dt>
         * <dd>the execution context for the callbacks</dd>
         * <dt>win</dt>
         * <dd>a window other than the one the utility occupies</dd>
         * <dt>data</dt>
         * <dd>
         * data that is supplied to the callbacks when the nodes(s) are
         * loaded.
         * </dd>
         * <dt>insertBefore</dt>
         * <dd>node or node id that will become the new node's nextSibling</dd>
         * <dt>charset</dt>
         * <dd>Node charset, default utf-8 (deprecated, use the attributes config)</dd>
         * <dt>attributes</dt>
         * <dd>An object literal containing additional attributes to add to the link tags</dd>
         * </dl>
         * <pre>
         *      Y.Get.css("http://yui.yahooapis.com/2.3.1/build/menu/assets/skins/sam/menu.css");
         * </pre>
         * <pre>
         * &nbsp;&nbsp;Y.Get.css(
         * &nbsp;&nbsp;["http://yui.yahooapis.com/2.3.1/build/menu/assets/skins/sam/menu.css",
         * &nbsp;&nbsp;&nbsp;&nbsp;insertBefore: 'custom-styles' // nodes will be inserted before the specified node
         * &nbsp;&nbsp;&#125;);
         * </pre>
         * @return {tId: string} an object containing info about the transaction
         */
        css: function(url, opts) {
            return _queue("css", url, opts); 
        }
    };
}();

})();


}, '@VERSION@' );
YUI.add('loader', function(Y) {

(function() {
/**
 * Loader dynamically loads script and css files.  It includes the dependency
 * info for the version of the library in use, and will automatically pull in
 * dependencies for the modules requested.  It supports rollup files and will
 * automatically use these when appropriate in order to minimize the number of
 * http connections required to load all of the dependencies.  It can load the
 * files from the Yahoo! CDN, and it can utilize the combo service provided on
 * this network to reduce the number of http connections required to download 
 * YUI files.
 *
 * @module yui
 * @submodule loader
 */

/**
 * Loader dynamically loads script and css files.  It includes the dependency
 * info for the version of the library in use, and will automatically pull in
 * dependencies for the modules requested.  It supports rollup files and will
 * automatically use these when appropriate in order to minimize the number of
 * http connections required to load all of the dependencies.  It can load the
 * files from the Yahoo! CDN, and it can utilize the combo service provided on
 * this network to reduce the number of http connections required to download 
 * YUI files.
 * @class Loader
 * @constructor
 * @param o an optional set of configuration options.  Valid options:
 * <ul>
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
 *      This option will automatically include the Logger widget</dd>
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
 *  <li>filters: per-component filter specification.  If specified for a given component, this overrides the filter config</li>
 *  <li>combine:
 *  Use the YUI combo service to reduce the number of http connections required to load your dependencies</li>
 *  <li>ignore:
 *  A list of modules that should never be dynamically loaded</li>
 *  <li>force:
 *  A list of modules that should always be loaded when required, even if already present on the page</li>
 *  <li>insertBefore:
 *  Node or id for a node that should be used as the insertion point for new nodes</li>
 *  <li>charset:
 *  charset for dynamic nodes (deprecated, use jsAttributes or cssAttributes)</li>
 *  <li>jsAttributes: object literal containing attributes to add to script nodes</li>
 *  <li>cssAttributes: object literal containing attributes to add to link nodes</li>
 *  <li>timeout:
 *  number of milliseconds before a timeout occurs when dynamically loading nodes.  in not set, there is no timeout</li>
 *  <li>context:
 *  execution context for all callbacks</li>
 *  <li>onSuccess:
 *  callback for the 'success' event</li>
 *  <li>onFailure: callback for the 'failure' event</li>
 *  <li>onCSS: callback for the 'CSSComplete' event.  When loading YUI components with CSS
 *  the CSS is loaded first, then the script.  This provides a moment you can tie into to improve
 *  the presentation of the page while the script is loading.</li>
 *  <li>onTimeout:
 *  callback for the 'timeout' event</li>
 *  <li>onProgress:
 *  callback executed each time a script or css file is loaded</li>
 *  <li>modules:
 *  A list of module definitions.  See Loader.addModule for the supported module metadata</li>
 * </ul>
 */

// @TODO backed out the custom event changes so that the event system
// isn't required in the seed build.  If needed, we may want to 
// add them back if the event system is detected.

/*
 * Executed when the loader successfully completes an insert operation
 * This can be subscribed to normally, or a listener can be passed
 * as an onSuccess config option.
 * @event success
 */

/*
 * Executed when the loader fails to complete an insert operation.
 * This can be subscribed to normally, or a listener can be passed
 * as an onFailure config option.
 *
 * @event failure
 */

/*
 * Executed when a Get operation times out.
 * This can be subscribed to normally, or a listener can be passed
 * as an onTimeout config option.
 *
 * @event timeout
 */

// http://yui.yahooapis.com/combo?2.5.2/build/yahoo/yahoo-min.js&2.5.2/build/dom/dom-min.js&2.5.2/build/event/event-min.js&2.5.2/build/autocomplete/autocomplete-min.js"


/**
 * Global loader queue
 * @property _loaderQueue
 * @type Queue
 * @private
 * @for YUI.Env
 */
YUI.Env._loaderQueue = YUI.Env._loaderQueue || new Y.Queue();

var GLOBAL_ENV = YUI.Env,
    GLOBAL_LOADED,
    BASE = 'base', 
    CSS = 'css',
    JS = 'js',
    CSSRESET = 'cssreset',
    CSSFONTS = 'cssfonts',
    CSSGRIDS = 'cssgrids',
    CSSBASE  = 'cssbase',
    CSS_AFTER = [CSSRESET, CSSFONTS, CSSGRIDS, 
                 'cssreset-context', 'cssfonts-context', 'cssgrids-context'],
    YUI_CSS = ['reset', 'fonts', 'grids', BASE],
    VERSION = Y.version,
    ROOT = VERSION + '/build/',
    CONTEXT = '-context',


    ANIMBASE = 'anim-base',
    DDDRAG = 'dd-drag',
    DOM = 'dom',
    DATASCHEMABASE = 'dataschema-base',
    DATASOURCELOCAL = 'datasource-local',
    DOMBASE = 'dom-base',
    DOMSTYLE = 'dom-style',
    DUMP = 'dump',
    GET = 'get',
    EVENT = 'event',
    EVENTCUSTOM = 'event-custom',
    IOBASE = 'io-base',
    NODE = 'node',
    NODEBASE = 'node-base',
    OOP = 'oop',
    SELECTOR = 'selector',
    SUBSTITUTE = 'substitute',
    WIDGET = 'widget',
    WIDGETPOSITION = 'widget-position',
    YUIBASE = 'yui-base',

	PLUGIN = 'plugin',

    META = {

    version: VERSION,

    root: ROOT,

    base: 'http://yui.yahooapis.com/' + ROOT,

    comboBase: 'http://yui.yahooapis.com/combo?',

    skin: {
        defaultSkin: 'sam',
        base: 'assets/skins/',
        path: 'skin.css',
        after: CSS_AFTER
        //rollup: 3
    },

    modules: {

       dom: {
            requires: [OOP],
            submodules: {

                'dom-base': {
                    requires: [OOP]
                },

                'dom-style': {
                    requires: [DOMBASE]
                },

                'dom-screen': {
                    requires: [DOMBASE, DOMSTYLE]
                },

                selector: {
                    requires: [DOMBASE]
                },

                'selector-native': {
                    requires: [DOMBASE]
                }
            },

            plugins: {
                'selector-css3': {
                    requires: [SELECTOR]
                }
            }
        },

        node: {
            requires: [DOM, BASE],
            expound: EVENT,

            submodules: {
                'node-base': {
                    requires: [DOMBASE, BASE, SELECTOR]
                },

                'node-style': {
                    requires: [DOMSTYLE, NODEBASE]
                },

                'node-screen': {
                    requires: ['dom-screen', NODEBASE]
                }
            },

            plugins: {
                'node-event-simulate': {
                    requires: [NODEBASE, 'event-simulate']
                }
            }
        },

        anim: {
            requires: [BASE, NODE],
            submodules: {

                'anim-base': {
                    requires: [BASE, 'node-style']
                },

                'anim-color': {
                    requires: [ANIMBASE]
                },

                'anim-curve': {
                    requires: ['anim-xy']
                },

                'anim-easing': {
                    requires: [ANIMBASE]
                },

                'anim-scroll': {
                    requires: [ANIMBASE]
                },

                'anim-xy': {
                    requires: [ANIMBASE, 'node-screen']
                },

                'anim-node-plugin': {
                     requires: [NODE, ANIMBASE]
                }
            }
        },

        attribute: { 
            requires: [EVENTCUSTOM]
        },

        base: {
            submodules: {

                'base-base': {
                    requires: ['attribute']
                },

                'base-build': {
                    requires: ['base-base']
                }
            }
        },

        cache: { 
            requires: [PLUGIN]
        },
        
        compat: { 
            requires: [NODE, DUMP, SUBSTITUTE]
        },

        classnamemanager: { 
            requires: [YUIBASE]
        },

        collection: { 
            requires: [OOP]
        },

        console: {
            requires: [WIDGET, SUBSTITUTE],
            skinnable: true
        },
        
        cookie: { 
            requires: [YUIBASE]
        },

        dataschema:{
            submodules: {
                'dataschema-base': {
                    requires: [BASE]
                },
                'dataschema-array': {
                    requires: [DATASCHEMABASE]
                },
                'dataschema-json': {
                    requires: [DATASCHEMABASE]
                },
                'dataschema-text': {
                    requires: [DATASCHEMABASE]
                },
                'dataschema-xml': {
                    requires: [DATASCHEMABASE]
                }
            }
        },

        datasource:{
            submodules: {
                'datasource-local': {
                    requires: [BASE]
                },
                'datasource-arrayschema': {
                    requires: [DATASOURCELOCAL, PLUGIN, 'dataschema-array']
                },
                'datasource-cache': {
                    requires: [DATASOURCELOCAL, 'cache']
                },
                'datasource-function': {
                    requires: [DATASOURCELOCAL]
                },
                'datasource-jsonschema': {
                    requires: [DATASOURCELOCAL, PLUGIN, 'dataschema-json']
                },
                'datasource-polling': {
                    requires: [DATASOURCELOCAL]
                },
                'datasource-scriptnode': {
                    requires: [DATASOURCELOCAL, GET]
                },
                'datasource-textschema': {
                    requires: [DATASOURCELOCAL, PLUGIN, 'dataschema-text']
                },
                'datasource-xhr': {
                    requires: [DATASOURCELOCAL, IOBASE]
                },
                'datasource-xmlschema': {
                    requires: [DATASOURCELOCAL, PLUGIN, 'dataschema-xml']
                }
            }
        },

        datatype:{
            submodules: {
                'datatype-date': {
                    requires: [YUIBASE]
                },
                'datatype-number': {
                    requires: [YUIBASE]
                },
                'datatype-xml': {
                    requires: [YUIBASE]
                }
            }
        },

        dd:{
            submodules: {
                'dd-ddm-base': {
                    requires: [NODE, BASE]
                }, 
                'dd-ddm':{
                    requires: ['dd-ddm-base']
                }, 
                'dd-ddm-drop':{
                    requires: ['dd-ddm']
                }, 
                'dd-drag':{
                    requires: ['dd-ddm-base']
                }, 
                'dd-drop':{
                    requires: ['dd-ddm-drop']
                }, 
                'dd-proxy':{
                    requires: [DDDRAG]
                }, 
                'dd-constrain':{
                    requires: [DDDRAG]
                }, 
                'dd-scroll':{
                    requires: [DDDRAG]
                }, 
                'dd-plugin':{
                    requires: [DDDRAG],
                    optional: ['dd-constrain', 'dd-proxy']
                },
                'dd-drop-plugin':{
                    requires: ['dd-drop']
                }
            }
        },

        dump: { 
            requires: [YUIBASE]
        },

        event: { 
            requires: [EVENTCUSTOM, NODE]
        },

        'event-custom': { 
            requires: [OOP]
        },

        'event-simulate': { 
            requires: [EVENT]
        },

        'node-focusmanager': { 
            requires: [NODE, PLUGIN]
        },

        get: { 
            requires: [YUIBASE]
        },

        history: { 
            requires: [NODE]
        },

        imageloader: { 
            requires: [NODE]
        },
        
        io:{
            submodules: {

                'io-base': {
                    requires: [EVENTCUSTOM]
                }, 

                'io-xdr': {
                    requires: [IOBASE]
                }, 

                'io-form': {
                    requires: [IOBASE, NODE]
                }, 

                'io-upload-iframe': {
                    requires: [IOBASE, NODE]
                },

                'io-queue': {
                    requires: [IOBASE, 'queue-promote']
                }
            }
        },

        json: {
            submodules: {
                'json-parse': {
                    requires: [YUIBASE]
                },

                'json-stringify': {
                    requires: [YUIBASE]
                }
            }
        },

        loader: { 
            requires: [GET]
        },

        'node-menunav': {
            requires: [NODE, 'classnamemanager', PLUGIN, 'node-focusmanager'],
            skinnable: true
        },
        
        oop: { 
            requires: [YUIBASE]
        },

        overlay: {
            requires: [WIDGET, WIDGETPOSITION, 'widget-position-ext', 'widget-stack', 'widget-stdmod'],
            skinnable: true
        },

        plugin: { 
            requires: [BASE]
        },

        profiler: { 
            requires: [YUIBASE]
        },

        queue: {
            submodules: {
                'queue-base': {
                    requires: [YUIBASE]
                },
                'queue-run': {
                    requires: ['queue-base', EVENTCUSTOM]
                }
            },
            plugins: {
                'queue-promote': { }
            }
        },

        slider: {
            requires: [WIDGET, 'dd-constrain'],
            skinnable: true
        },

        stylesheet: { 
            requires: [YUIBASE]
        },

        substitute: {
            optional: [DUMP]
        },

        widget: {
            requires: [BASE, NODE, 'classnamemanager'],
            plugins: {
                'widget-position': { },
                'widget-position-ext': {
                    requires: [WIDGETPOSITION]
                },
                'widget-stack': {
                    skinnable: true
                },
                'widget-stdmod': { }
            },
            skinnable: true
        },

        yui: {
            supersedes: [YUIBASE, GET, 'loader', 'queue-base']
        },

        'yui-base': { },

        test: {                                                                                                                                                        
            requires: [SUBSTITUTE, NODE, 'json', 'event-simulate']                                                                                                                     
        }  

    }
},

_path = function(dir, file, type) {
    return dir + '/' + file + '-min.' + (type || CSS);
},

_queue = YUI.Env._loaderQueue,

mods  = META.modules, i, bname, mname, contextname,
L     = Y.Lang, 
PROV  = "_provides", 
SUPER = "_supersedes";

// Create the metadata for both the regular and context-aware
// versions of the YUI CSS foundation.
for (i=0; i<YUI_CSS.length; i=i+1) {
    bname = YUI_CSS[i];
    mname = CSS + bname;

    mods[mname] = {
        type: CSS,
        path: _path(mname, bname)
    };

    // define -context module
    contextname = mname + CONTEXT;
    bname = bname + CONTEXT;

    mods[contextname] = {
        type: CSS,
        path: _path(mname, bname)
    };

    if (mname == CSSGRIDS) {
        mods[mname].requires = [CSSFONTS];
        mods[mname].optional = [CSSRESET];
        mods[contextname].requires = [CSSFONTS + CONTEXT];
        mods[contextname].optional = [CSSRESET + CONTEXT];
    } else if (mname == CSSBASE) {
        mods[mname].after = CSS_AFTER;
        mods[contextname].after = CSS_AFTER;
    }
}

Y.Env.meta = META;

GLOBAL_LOADED = GLOBAL_ENV._loaded;

Y.Loader = function(o) {

    /**
     * Internal callback to handle multiple internal insert() calls
     * so that css is inserted prior to js
     * @property _internalCallback
     * @private
     */
    this._internalCallback = null;

    /**
     * Use the YUI environment listener to detect script load.  This
     * is only switched on for Safari 2.x and below.
     * @property _useYahooListener
     * @private
     */
    this._useYahooListener = false;

    /**
     * Callback that will be executed when the loader is finished
     * with an insert
     * @method onSuccess
     * @type function
     */
    this.onSuccess = null;

    /**
     * Callback that will be executed if there is a failure
     * @method onFailure
     * @type function
     */
    this.onFailure = null;

    /**
     * Callback for the 'CSSComplete' event.  When loading YUI components with CSS
     * the CSS is loaded first, then the script.  This provides a moment you can tie into to improve
     * the presentation of the page while the script is loading.
     * @method onCSS
     * @type function
     */
    this.onCSS = null;

    /**
     * Callback executed each time a script or css file is loaded
     * @method onProgress
     * @type function
     */
    this.onProgress = null;

    /**
     * Callback that will be executed if a timeout occurs
     * @method onTimeout
     * @type function
     */
    this.onTimeout = null;

    /**
     * The execution context for all callbacks
     * @property context
     * @default {YUI} the YUI instance
     */
    this.context = Y;

    /**
     * Data that is passed to all callbacks
     * @property data
     */
    this.data = null;

    /**
     * Node reference or id where new nodes should be inserted before
     * @property insertBefore
     * @type string|HTMLElement
     */
    this.insertBefore = null;

    /**
     * The charset attribute for inserted nodes
     * @property charset
     * @type string
     * @deprecated, use cssAttributes or jsAttributes
     */
    this.charset = null;

    /**
     * An object literal containing attributes to add to link nodes
     * @property cssAttributes
     * @type object
     */
    this.cssAttributes = null;

    /**
     * An object literal containing attributes to add to script nodes
     * @property jsAttributes
     * @type object
     */
    this.jsAttributes = null;

    /**
     * The base directory.
     * @property base
     * @type string
     * @default http://yui.yahooapis.com/[YUI VERSION]/build/
     */
    this.base = Y.Env.meta.base;

    /**
     * Base path for the combo service
     * @property comboBase
     * @type string
     * @default http://yui.yahooapis.com/combo?
     */
    this.comboBase = Y.Env.meta.comboBase;

    /**
     * If configured, YUI JS resources will use the combo
     * handler
     * @property combine
     * @type boolean
     * @default true if a base dir isn't in the config
     */
    this.combine = (!(BASE in o));

    /**
     * Ignore modules registered on the YUI global
     * @property ignoreRegistered
     * @default false
     */
    this.ignoreRegistered = false;

    /**
     * Root path to prepend to module path for the combo
     * service
     * @property root
     * @type string
     * @default [YUI VERSION]/build/
     */
    this.root = Y.Env.meta.root;

    /**
     * Timeout value in milliseconds.  If set, this value will be used by
     * the get utility.  the timeout event will fire if
     * a timeout occurs.
     * @property timeout
     * @type int
     */
    this.timeout = 0;

    /**
     * A list of modules that should not be loaded, even if
     * they turn up in the dependency tree
     * @property ignore
     * @type string[]
     */
    this.ignore = null;

    /**
     * A list of modules that should always be loaded, even
     * if they have already been inserted into the page.
     * @property force
     * @type string[]
     */
    this.force = null;

    /**
     * Should we allow rollups
     * @property allowRollup
     * @type boolean
     * @default true
     */
    this.allowRollup = true;

    /**
     * A filter to apply to result urls.  This filter will modify the default
     * path for all modules.  The default path for the YUI library is the
     * minified version of the files (e.g., event-min.js).  The filter property
     * can be a predefined filter or a custom filter.  The valid predefined 
     * filters are:
     * <dl>
     *  <dt>DEBUG</dt>
     *  <dd>Selects the debug versions of the library (e.g., event-debug.js).
     *      This option will automatically include the Logger widget</dd>
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
     * @property filter
     * @type string|{searchExp: string, replaceStr: string}
     */
    this.filter = null;

    /**
     * per-component filter specification.  If specified for a given component, this 
     * overrides the filter config.
     * @property filters
     * @type object
     */
    this.filters = {};

    /**
     * The list of requested modules
     * @property required
     * @type {string: boolean}
     */
    this.required = {};

    /**
     * The library metadata
     * @property moduleInfo
     */
    // this.moduleInfo = Y.merge(Y.Env.meta.moduleInfo);
    this.moduleInfo = {};

    /**
     * Provides the information used to skin the skinnable components.
     * The following skin definition would result in 'skin1' and 'skin2'
     * being loaded for calendar (if calendar was requested), and
     * 'sam' for all other skinnable components:
     *
     *   <code>
     *   skin: {
     *
     *      // The default skin, which is automatically applied if not
     *      // overriden by a component-specific skin definition.
     *      // Change this in to apply a different skin globally
     *      defaultSkin: 'sam', 
     *
     *      // This is combined with the loader base property to get
     *      // the default root directory for a skin. ex:
     *      // http://yui.yahooapis.com/2.3.0/build/assets/skins/sam/
     *      base: 'assets/skins/',
     *
     *      // The name of the rollup css file for the skin
     *      path: 'skin.css',
     *
     *      // The number of skinnable components requested that are
     *      // required before using the rollup file rather than the
     *      // individual component css files
     *      rollup: 3,
     *
     *      // Any component-specific overrides can be specified here,
     *      // making it possible to load different skins for different
     *      // components.  It is possible to load more than one skin
     *      // for a given component as well.
     *      overrides: {
     *          calendar: ['skin1', 'skin2']
     *      }
     *   }
     *   </code>
     *   @property skin
     */
     this.skin = Y.merge(Y.Env.meta.skin);
    
    var defaults = Y.Env.meta.modules, i;

    for (i in defaults) {
        if (defaults.hasOwnProperty(i)) {
            this._internal = true;
            this.addModule(defaults[i], i);
            this._internal = false;
        }
    }

    /**
     * List of rollup files found in the library metadata
     * @property rollups
     */
    this.rollups = null;

    /**
     * Whether or not to load optional dependencies for 
     * the requested modules
     * @property loadOptional
     * @type boolean
     * @default false
     */
    this.loadOptional = false;

    /**
     * All of the derived dependencies in sorted order, which
     * will be populated when either calculate() or insert()
     * is called
     * @property sorted
     * @type string[]
     */
    this.sorted = [];

    /**
     * Set when beginning to compute the dependency tree. 
     * Composed of what YUI reports to be loaded combined
     * with what has been loaded by any instance on the page
     * with the version number specified in the metadata.
     * @propery loaded
     * @type {string: boolean}
     */
    this.loaded = GLOBAL_LOADED[VERSION];

    /**
     * A list of modules to attach to the YUI instance when complete.
     * If not supplied, the sorted list of dependencies are applied.
     * @property attaching
     */
    this.attaching = null;

    /**
     * Flag to indicate the dependency tree needs to be recomputed
     * if insert is called again.
     * @property dirty
     * @type boolean
     * @default true
     */
    this.dirty = true;

    /**
     * List of modules inserted by the utility
     * @property inserted
     * @type {string: boolean}
     */
    this.inserted = {};

    /**
     * List of skipped modules during insert() because the module
     * was not defined
     * @property skipped
     */
    this.skipped = {};


    // Y.on('yui:load', this.loadNext, this);

    this._config(o);

};

Y.Loader.prototype = {

    FILTER_DEFS: {
        RAW: { 
            'searchExp': "-min\\.js", 
            'replaceStr': ".js"
        },
        DEBUG: { 
            'searchExp': "-min\\.js", 
            'replaceStr': "-debug.js"
        }
    },

    SKIN_PREFIX: "skin-",

    _config: function(o) {

        var i, j, val, f;

        // apply config values
        if (o) {
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    val = o[i];
                    if (i == 'require') {
                        this.require(val);
                    } else if (i == 'modules') {

                        // add a hash of module definitions
                        for (j in val) {
                            if (val.hasOwnProperty(j)) {
                                this.addModule(val[j], j);
                            }
                        }

                    } else {
                        this[i] = val;
                    }
                }
            }
        }

        // fix filter
        f = this.filter;

        if (L.isString(f)) {
            f = f.toUpperCase();
            this.filterName = f;
            this.filter = this.FILTER_DEFS[f];
        }

    },

    /**
     * Returns the skin module name for the specified skin name.  If a
     * module name is supplied, the returned skin module name is 
     * specific to the module passed in.
     * @method formatSkin
     * @param skin {string} the name of the skin
     * @param mod {string} optional: the name of a module to skin
     * @return {string} the full skin module name
     */
    formatSkin: function(skin, mod) {
        var s = this.SKIN_PREFIX + skin;
        if (mod) {
            s = s + "-" + mod;
        }

        return s;
    },

    /**
     * Reverses <code>formatSkin</code>, providing the skin name and
     * module name if the string matches the pattern for skins.
     * @method parseSkin
     * @param mod {string} the module name to parse
     * @return {skin: string, module: string} the parsed skin name 
     * and module name, or null if the supplied string does not match
     * the skin pattern
     */
    parseSkin: function(mod) {
        
        if (mod.indexOf(this.SKIN_PREFIX) === 0) {
            var a = mod.split("-");
            return {skin: a[1], module: a[2]};
        } 

        return null;
    },

    /**
     * Adds the skin def to the module info
     * @method _addSkin
     * @param skin {string} the name of the skin
     * @param mod {string} the name of the module
     * @param parent {string} parent module if this is a skin of a
     * submodule or plugin
     * @return {string} the module name for the skin
     * @private
     */
    _addSkin: function(skin, mod, parent) {

        var name = this.formatSkin(skin), 
            info = this.moduleInfo,
            sinf = this.skin, 
            ext  = info[mod] && info[mod].ext,
            mdef, pkg;

        /*
        // Add a module definition for the skin rollup css
        if (!info[name]) {
            this.addModule({
                'name': name,
                'type': 'css',
                'path': sinf.base + skin + '/' + sinf.path,
                //'supersedes': '*',
                'after': sinf.after,
                'rollup': sinf.rollup,
                'ext': ext
            });
        }
        */

        // Add a module definition for the module-specific skin css
        if (mod) {
            name = this.formatSkin(skin, mod);
            if (!info[name]) {
                mdef = info[mod];
                pkg = mdef.pkg || mod;
                this.addModule({
                    'name': name,
                    'type': 'css',
                    'after': sinf.after,
                    'path': (parent || pkg) + '/' + sinf.base + skin + '/' + mod + '.css',
                    'ext': ext
                });
            }
        }

        return name;
    },

    /** Add a new module to the component metadata.         
     * <dl>
     *     <dt>name:</dt>       <dd>required, the component name</dd>
     *     <dt>type:</dt>       <dd>required, the component type (js or css)</dd>
     *     <dt>path:</dt>       <dd>required, the path to the script from "base"</dd>
     *     <dt>requires:</dt>   <dd>array of modules required by this component</dd>
     *     <dt>optional:</dt>   <dd>array of optional modules for this component</dd>
     *     <dt>supersedes:</dt> <dd>array of the modules this component replaces</dd>
     *     <dt>after:</dt>      <dd>array of modules the components which, if present, should be sorted above this one</dd>
     *     <dt>rollup:</dt>     <dd>the number of superseded modules required for automatic rollup</dd>
     *     <dt>fullpath:</dt>   <dd>If fullpath is specified, this is used instead of the configured base + path</dd>
     *     <dt>skinnable:</dt>  <dd>flag to determine if skin assets should automatically be pulled in</dd>
     *     <dt>submodules:</dt> <dd>a has of submodules</dd>
     * </dl>
     * @method addModule
     * @param o An object containing the module data
     * @param name the module name (optional), required if not in the module data
     * @return {boolean} true if the module was added, false if 
     * the object passed in did not provide all required attributes
     */
    addModule: function(o, name) {

        name = name || o.name;
        o.name = name;

        if (!o || !o.name) {
            return false;
        }

        if (!o.type) {
            o.type = JS;
        }

        if (!o.path && !o.fullpath) {
            // o.path = name + "/" + name + "-min." + o.type;
            o.path = _path(name, name, o.type);
        }

        o.ext = ('ext' in o) ? o.ext : (this._internal) ? false : true;
        o.requires = o.requires || [];


        this.moduleInfo[name] = o;

        // Handle submodule logic
        var subs = o.submodules, i, l, sup, s, smod, plugins, plug;
        if (subs) {
            sup = []; 
            l   = 0;

            for (i in subs) {
                if (subs.hasOwnProperty(i)) {
                    s = subs[i];
                    s.path = _path(name, i, o.type);
                    this.addModule(s, i);
                    sup.push(i);

                    if (o.skinnable) {
                        smod = this._addSkin(this.skin.defaultSkin, i, name);
                        sup.push(smod.name);
                    }

                    l++;
                }
            }

            o.supersedes = sup;
            o.rollup = Math.min(l-1, 4);
        }

        plugins = o.plugins;
        if (plugins) {
            for (i in plugins) {
                if (plugins.hasOwnProperty(i)) {
                    plug = plugins[i];
                    plug.path = _path(name, i, o.type);
                    plug.requires = plug.requires || [];
                    plug.requires.push(name);
                    this.addModule(plug, i);
                    if (o.skinnable) {
                        this._addSkin(this.skin.defaultSkin, i, name);
                    }
                }
            }
        }

        this.dirty = true;

        return o;
    },

    /**
     * Add a requirement for one or more module
     * @method require
     * @param what {string[] | string*} the modules to load
     */
    require: function(what) {
        var a = (typeof what === "string") ? arguments : what;
        this.dirty = true;
        Y.mix(this.required, Y.Array.hash(a));
    },

    /**
     * Returns an object containing properties for all modules required
     * in order to load the requested module
     * @method getRequires
     * @param mod The module definition from moduleInfo
     */
    getRequires: function(mod) {

        if (!mod) {
            return [];
        }

        if (!this.dirty && mod.expanded) {
            return mod.expanded;
        }

        var i, d=[], r=mod.requires, o=mod.optional, 
            info=this.moduleInfo, m, j, add;

        for (i=0; i<r.length; i=i+1) {
            d.push(r[i]);
            m = this.getModule(r[i]);
            add = this.getRequires(m);
            for (j=0;j<add.length;j=j+1) {
                d.push(add[j]);
            }
        }

        // get the requirements from superseded modules, if any
        r=mod.supersedes;
        if (r) {
            for (i=0; i<r.length; i=i+1) {
                d.push(r[i]);
                m = this.getModule(r[i]);
                add = this.getRequires(m);
                for (j=0;j<add.length;j=j+1) {
                    d.push(add[j]);
                }
            }
        }

        if (o && this.loadOptional) {
            for (i=0; i<o.length; i=i+1) {
                d.push(o[i]);
                add = this.getRequires(info[o[i]]);
                for (j=0;j<add.length;j=j+1) {
                    d.push(add[j]);
                }
            }
        }

        mod.expanded = Y.Object.keys(Y.Array.hash(d));


        return mod.expanded;
    },


    /**
     * Returns an object literal of the modules the supplied module satisfies
     * @method getProvides
     * @param name{string} The name of the module
     * @param notMe {string} don't add this module name, only include superseded modules
     * @return what this module provides
     */
    getProvides: function(name, notMe) {
        var addMe = !(notMe), ckey = (addMe) ? PROV : SUPER,
            m = this.getModule(name), o = {},
            s, done, me, i,

            // use worker to break cycles
            add = function(mm) {
                if (!done[mm]) {
                    done[mm] = true;
                    // we always want the return value normal behavior 
                    // (provides) for superseded modules.
                    Y.mix(o, me.getProvides(mm));
                } 
                
                // else {
                // }
            };

        if (!m) {
            return o;
        }

        if (m[ckey]) {
            return m[ckey];
        }

        s    = m.supersedes;
        done = {};
        me   = this;


        // calculate superseded modules
        if (s) {
            for (i=0; i<s.length; i=i+1) {
                add(s[i]);
            }
        }

        // supersedes cache
        m[SUPER] = o;
        // provides cache
        m[PROV] = Y.merge(o);
        m[PROV][name] = true;


        return m[ckey];
    },


    /**
     * Calculates the dependency tree, the result is stored in the sorted 
     * property
     * @method calculate
     * @param o optional options object
     */
    calculate: function(o) {
        if (o || this.dirty) {
            this._config(o);
            this._setup();
            this._explode();
            if (this.allowRollup && !this.combine) {
                this._rollup();
            }
            this._reduce();
            this._sort();


            this.dirty = false;
        }
    },

    /**
     * Investigates the current YUI configuration on the page.  By default,
     * modules already detected will not be loaded again unless a force
     * option is encountered.  Called by calculate()
     * @method _setup
     * @private
     */
    _setup: function() {

        var info = this.moduleInfo, name, i, j, m, o, l, smod;

        // Create skin modules
        for (name in info) {
            if (info.hasOwnProperty(name)) {
                m = info[name];
                if (m && m.skinnable) {
                    o = this.skin.overrides;
                    if (o && o[name]) {
                        for (i=0; i<o[name].length; i=i+1) {
                            smod = this._addSkin(o[name][i], name);
                        }
                    } else {
                        smod = this._addSkin(this.skin.defaultSkin, name);
                    }

                    m.requires.push(smod);
                }
            }
        }

        l = Y.merge(this.inserted); // shallow clone

        // available modules
        if (!this.ignoreRegistered) {
            Y.mix(l, GLOBAL_ENV.mods);
        }
        

        // add the ignore list to the list of loaded packages
        if (this.ignore) {
            // OU.appendArray(l, this.ignore);
            Y.mix(l, Y.Array.hash(this.ignore));
        }

        // expand the list to include superseded modules
        for (j in l) {
            if (l.hasOwnProperty(j)) {
                Y.mix(l, this.getProvides(j));
            }
        }

        // remove modules on the force list from the loaded list
        if (this.force) {
            for (i=0; i<this.force.length; i=i+1) {
                if (this.force[i] in l) {
                    delete l[this.force[i]];
                }
            }
        }


        Y.mix(this.loaded, l);

        // this.loaded = l;

    },
    

    /**
     * Inspects the required modules list looking for additional 
     * dependencies.  Expands the required list to include all 
     * required modules.  Called by calculate()
     * @method _explode
     * @private
     */
    _explode: function() {

        var r=this.required, i, mod, req, me = this, f = function(name) {

                mod = me.getModule(name);

                var expound = mod && mod.expound;

                if (mod) {

                    if (expound) {
                        r[expound] = me.getModule(expound);
                        req = me.getRequires(r[expound]);
                        Y.mix(r, Y.Array.hash(req));
                    }

                    req = me.getRequires(mod);

                    Y.mix(r, Y.Array.hash(req));
                }
            };


        for (i in r) {
            if (r.hasOwnProperty(i)) {
                f(i);
            }
        }
    },

    getModule: function(name) {

        var m = this.moduleInfo[name];

        // create the default module
        // if (!m) {
            // m = this.addModule({ext: false}, name);
        // }

        return m;
    },

    /**
     * Look for rollup packages to determine if all of the modules a
     * rollup supersedes are required.  If so, include the rollup to
     * help reduce the total number of connections required.  Called
     * by calculate()
     * @method _rollup
     * @private
     */
    _rollup: function() {
        var i, j, m, s, rollups={}, r=this.required, roll,
            info = this.moduleInfo, rolled, c;

        // find and cache rollup modules
        if (this.dirty || !this.rollups) {
            for (i in info) {
                if (info.hasOwnProperty(i)) {
                    m = this.getModule(i);
                    // if (m && m.rollup && m.supersedes) {
                    if (m && m.rollup) {
                        rollups[i] = m;
                    }
                }
            }

            this.rollups = rollups;
        }

        // make as many passes as needed to pick up rollup rollups
        for (;;) {
            rolled = false;

            // go through the rollup candidates
            for (i in rollups) { 

                if (rollups.hasOwnProperty(i)) {

                    // there can be only one
                    if (!r[i] && !this.loaded[i]) {
                        m = this.getModule(i); 
                        s = m.supersedes || []; 
                        roll = false;

                        // @TODO remove continue
                        if (!m.rollup) {
                            continue;
                        }

                        c = 0;

                        // check the threshold
                        for (j=0;j<s.length;j=j+1) {

                            // if the superseded module is loaded, we can't load the rollup
                            // if (this.loaded[s[j]] && (!_Y.dupsAllowed[s[j]])) {
                            if (this.loaded[s[j]]) {
                                roll = false;
                                break;
                            // increment the counter if this module is required.  if we are
                            // beyond the rollup threshold, we will use the rollup module
                            } else if (r[s[j]]) {
                                c++;
                                roll = (c >= m.rollup);
                                if (roll) {
                                    break;
                                }
                            }
                        }

                        if (roll) {
                            // add the rollup
                            r[i] = true;
                            rolled = true;

                            // expand the rollup's dependencies
                            this.getRequires(m);
                        }
                    }
                }
            }

            // if we made it here w/o rolling up something, we are done
            if (!rolled) {
                break;
            }
        }
    },

    /**
     * Remove superceded modules and loaded modules.  Called by
     * calculate() after we have the mega list of all dependencies
     * @method _reduce
     * @private
     */
    _reduce: function() {

        var i, j, s, m, r=this.required;
        for (i in r) {

            if (r.hasOwnProperty(i)) {

                // remove if already loaded
                if (i in this.loaded && !this.ignoreRegistered) { 
                    delete r[i];

                // remove anything this module supersedes
                } else {

                     m = this.getModule(i);
                     s = m && m.supersedes;
                     if (s) {
                         for (j=0; j<s.length; j=j+1) {
                             if (s[j] in r) {
                                 delete r[s[j]];
                             }
                         }
                     }
                }
            }
        }
    },

    _attach: function() {

        // this is the full list of items the YUI needs attached,
        // which is needed if some dependencies are already on
        // the page without their dependencies.
        if (this.attaching) {
            Y._attach(this.attaching);
        } else {
            Y._attach(this.sorted);
        }

        // this._pushEvents();

    },

    _finish: function() {
        _queue.running = false;
        this._continue();
    },

    _onSuccess: function() {


        this._attach();

        var skipped = this.skipped, i, f;

        for (i in skipped) {
            if (skipped.hasOwnProperty(i)) {
                delete this.inserted[i];
            }
        }

        this.skipped = {};

        f = this.onSuccess;

        if (f) {
            f.call(this.context, {
                msg: 'success',
                data: this.data,
                success: true
            });
        }

        this._finish();

    },

    _onFailure: function(o) {


        this._attach();

        var f = this.onFailure;
        if (f) {
            f.call(this.context, {
                msg: 'failure: ' + o.msg,
                data: this.data,
                success: false
            });
        }

        this._finish();
    },

    _onTimeout: function() {


        this._attach();

        var f = this.onTimeout;
        if (f) {
            f.call(this.context, {
                msg: 'timeout',
                data: this.data,
                success: false
            });
        }

        this._finish();
    },
    
    /**
     * Sorts the dependency tree.  The last step of calculate()
     * @method _sort
     * @private
     */
    _sort: function() {
        // create an indexed list
        var s=Y.Object.keys(this.required), info=this.moduleInfo, loaded=this.loaded,
            p, l, a, b, j, k, moved,

        // returns true if b is not loaded, and is required
        // directly or by means of modules it supersedes.
            requires = function(aa, bb) {

                var mm = info[aa], ii, rr, after, other, ss;

                if (loaded[bb] || !mm) {
                    return false;
                }

                rr    = mm.expanded;
                after = mm.after; 
                other = info[bb];

                // check if this module requires the other directly
                if (rr && Y.Array.indexOf(rr, bb) > -1) {
                    return true;
                }

                // check if this module should be sorted after the other
                if (after && Y.Array.indexOf(after, bb) > -1) {
                    return true;
                }

                // check if this module requires one the other supersedes
                ss = info[bb] && info[bb].supersedes;
                if (ss) {
                    for (ii=0; ii<ss.length; ii=ii+1) {
                        if (requires(aa, ss[ii])) {
                            return true;
                        }
                    }
                }

                // external css files should be sorted below yui css
                if (mm.ext && mm.type == CSS && !other.ext && other.type == CSS) {
                    return true;
                }

                return false;
            };

        // pointer to the first unsorted item
        p = 0; 

        // keep going until we make a pass without moving anything
        for (;;) {
           
            l     = s.length; 
            moved = false;

            // start the loop after items that are already sorted
            for (j=p; j<l; j=j+1) {

                // check the next module on the list to see if its
                // dependencies have been met
                a = s[j];

                // check everything below current item and move if we
                // find a requirement for the current item
                for (k=j+1; k<l; k=k+1) {
                    if (requires(a, s[k])) {

                        // extract the dependency so we can move it up
                        b = s.splice(k, 1);

                        // insert the dependency above the item that 
                        // requires it
                        s.splice(j, 0, b[0]);

                        moved = true;
                        break;
                    }
                }

                // jump out of loop if we moved something
                if (moved) {
                    break;
                // this item is sorted, move our pointer and keep going
                } else {
                    p = p + 1;
                }
            }

            // when we make it here and moved is false, we are 
            // finished sorting
            if (!moved) {
                break;
            }

        }

        this.sorted = s;
    },

    _insert: function(source, o, type) {


        // restore the state at the time of the request
        if (source) {
            this._config(source);
        }

        // build the dependency list
        this.calculate(o);

        if (!type) {

            var self = this;

            this._internalCallback = function() {
                        var f = self.onCSS;
                        if (f) {
                            f.call(self.context, Y);
                        }
                        self._internalCallback = null;
                        self._insert(null, null, JS);
                    };

            // _queue.running = false;
            this._insert(null, null, CSS);

            return;
        }


        // set a flag to indicate the load has started
        this._loading = true;

        // flag to indicate we are done with the combo service
        // and any additional files will need to be loaded
        // individually
        this._combineComplete = {};

        // keep the loadType (js, css or undefined) cached
        this.loadType = type;

        // start the load
        this.loadNext();

    },

    _continue: function() {
        if (!(_queue.running) && _queue.size() > 0) {
            _queue.running = true;
            _queue.next()();
        }
    },

    /**
     * inserts the requested modules and their dependencies.  
     * <code>type</code> can be "js" or "css".  Both script and 
     * css are inserted if type is not provided.
     * @method insert
     * @param o optional options object
     * @param type {string} the type of dependency to insert
     */
    insert: function(o, type) {

        var self = this, copy;



        copy = Y.merge(this, true);
        delete copy.require;
        delete copy.dirty;

        _queue.add(function() {
            self._insert(copy, o, type);
        });

        this._continue();

    },

    /**
     * Executed every time a module is loaded, and if we are in a load
     * cycle, we attempt to load the next script.  Public so that it
     * is possible to call this if using a method other than
     * Y.register to determine when scripts are fully loaded
     * @method loadNext
     * @param mname {string} optional the name of the module that has
     * been loaded (which is usually why it is time to load the next
     * one)
     */
    loadNext: function(mname) {

        // It is possible that this function is executed due to something
        // else one the page loading a YUI module.  Only react when we
        // are actively loading something
        if (!this._loading) {
            return;
        }

        var s, len, i, m, url, self=this, type=this.loadType, fn, msg, attr,
            callback=function(o) {
                this._combineComplete[type] = true;


                var c=this._combining, len=c.length, i;

                for (i=0; i<len; i=i+1) {
                    this.inserted[c[i]] = true;
                }

                this.loadNext(o.data);
            },
            onsuccess=function(o) {
                self.loadNext(o.data);
            };

        // @TODO this will need to handle the two phase insert when
        // CSS support is added
        if (this.combine && (!this._combineComplete[type])) {

            this._combining = []; 
            s=this.sorted;
            len=s.length;
            url=this.comboBase;

            for (i=0; i<len; i=i+1) {
                m = this.getModule(s[i]);
// @TODO we can't combine CSS yet until we deliver files with absolute paths to the assets
                // Do not try to combine non-yui JS
                if (m && m.type === this.loadType && !m.ext) {
                    url += this.root + m.path;
                    if (i < len-1) {
                        url += '&';
                    }

                    this._combining.push(s[i]);
                }
            }

            if (this._combining.length) {


                if (m.type === CSS) {
                    fn = Y.Get.css;
                    attr = this.cssAttributes;
                } else {
                    fn = Y.Get.script;
                    attr = this.jsAttributes;
                }

                // @TODO get rid of the redundant Get code
                fn(this._filter(url), {
                    data: this._loading,
                    onSuccess: callback,
                    onFailure: this._onFailure,
                    onTimeout: this._onTimeout,
                    insertBefore: this.insertBefore,
                    charset: this.charset,
                    attributes: attr,
                    timeout: this.timeout,
                    context: self 
                });

                return;

            } else {
                this._combineComplete[type] = true;
            }
        }

        if (mname) {

            // if the module that was just loaded isn't what we were expecting,
            // continue to wait
            if (mname !== this._loading) {
                return;
            }


            // The global handler that is called when each module is loaded
            // will pass that module name to this function.  Storing this
            // data to avoid loading the same module multiple times
            this.inserted[mname] = true;
            this.loaded[mname] = true;

            if (this.onProgress) {
                this.onProgress.call(this.context, {
                        name: mname,
                        data: this.data
                    });
            }


        }

        s=this.sorted;
        len=s.length;

        for (i=0; i<len; i=i+1) {

            // this.inserted keeps track of what the loader has loaded.
            // move on if this item is done.
            if (s[i] in this.inserted) {
                continue;
            }

            // Because rollups will cause multiple load notifications
            // from Y, loadNext may be called multiple times for
            // the same module when loading a rollup.  We can safely
            // skip the subsequent requests
            if (s[i] === this._loading) {
                return;
            }

            // log("inserting " + s[i]);
            m = this.getModule(s[i]);

            if (!m) {

                msg = "Undefined module " + s[i] + " skipped";
                this.inserted[s[i]] = true;
                this.skipped[s[i]] = true;
                continue;

            }


            // The load type is stored to offer the possibility to load
            // the css separately from the script.
            if (!type || type === m.type) {
                this._loading = s[i];

                if (m.type === CSS) {
                    fn = Y.Get.css;
                    attr = this.cssAttributes;
                } else {
                    fn = Y.Get.script;
                    attr = this.jsAttributes;
                }

                url = (m.fullpath) ? this._filter(m.fullpath, s[i]) : this._url(m.path, s[i]);

                fn(url, {
                    data: s[i],
                    onSuccess: onsuccess,
                    insertBefore: this.insertBefore,
                    charset: this.charset,
                    attributes: attr,
                    onFailure: this._onFailure,
                    onTimeout: this._onTimeout,
                    timeout: this.timeout,
                    context: self 
                });

                return;
            }
        }

        // we are finished
        this._loading = null;

        fn = this._internalCallback;

        // internal callback for loading css first
        if (fn) {
            this._internalCallback = null;
            fn.call(this);

        // } else if (this.onSuccess) {
        } else {
            // call Y.use passing this instance. Y will use the sorted
            // dependency list.
            this._onSuccess();
        }

    },

    /**
     * Apply filter defined for this instance to a url/path
     * method _filter
     * @param u {string} the string to filter
     * @param name {string} the name of the module, if we are processing
     * a single module as opposed to a combined url
     * @return {string} the filtered string
     * @private
     */
    _filter: function(u, name) {

        var f = this.filter, 
            hasFilter = name && (name in this.filters),
            modFilter = hasFilter && this.filters[name];

        if (u) {

            if (hasFilter) {
                f = (L.isString(modFilter)) ? this.FILTER_DEFS[modFilter.toUpperCase()] || null : modFilter;
            }

            if (f) {
                u = u.replace(new RegExp(f.searchExp, 'g'), f.replaceStr);
            }
        }

        return u;

    },

    /**
     * Generates the full url for a module
     * method _url
     * @param path {string} the path fragment
     * @return {string} the full url
     * @private
     */
    _url: function(path, name) {
        return this._filter((this.base || "") + path, name);
    }

};

})();



}, '@VERSION@' ,{requires:['queue-base']});


YUI.add('yui', function(Y){}, '@VERSION@' ,{use:['yui-base','queue-base','get','loader']});

