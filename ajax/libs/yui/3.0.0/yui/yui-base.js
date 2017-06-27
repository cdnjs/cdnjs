/**
 * The YUI module contains the components required for building the YUI seed file.
 * This includes the script loading mechanism, a simple queue, and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

(function() {

    var _instances = {}, 
        _startTime = new Date().getTime(), 
        p, 
        i,

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
          'io.xdrResponse':1
        },

        SLICE = Array.prototype.slice;
        
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
     * @uses EventTarget
     * @param o* Up to five optional configuration objects.  This object is stored
     * in YUI.config.  See config for the list of supported properties.
     */

    /*global YUI*/
    // Make a function, disallow direct instantiation
    YUI = function(o1, o2, o3, o4, o5) {

        var Y = this, a = arguments, i, l = a.length;

        // Allow instantiation without the new operator
        if (!(Y instanceof YUI)) {
            return new YUI(o1, o2, o3, o4, o5);
        } else {
            // set up the core environment
            Y._init();

            for (i=0; i<l; i++) {
                Y._config(a[i]);
            }

            // bind the specified additional modules for this instance
            Y._setup();

            return Y;
        }
    };
}

// The prototype contains the functions that are required to allow the external
// modules to be registered and for the instance to be initialized.
YUI.prototype = {

    _config: function(o) {

        o = o || {};

        var c = this.config, i, j, m, mods;

        mods = c.modules;
        for (i in o) {
            if (mods && i == 'modules') {
                m = o[i];
                for (j in m) {
                    if (m.hasOwnProperty(j)) {
                        mods[j] = m[j];
                    }
                }
            } else if (i == 'win') {
                c[i] = o[i].contentWindow || o[i];
                c.doc = c[i].document;
            } else {
                c[i] = o[i];
            }
        }
    },

    /**
     * Initialize this YUI instance
     * @private
     */
    _init: function() {

        // find targeted window/frame
        // @TODO create facades
        var v = '@VERSION@', Y = this;

        if (v.indexOf('@') > -1) {
            v = 'test';
        }

        Y.version = v;

        Y.Env = {
            // @todo expand the new module metadata
            mods: {},
            cdn: 'http://yui.yahooapis.com/' + v + '/build/',
            bootstrapped: false,
            _idx: 0,
            _used: {},
            _attached: {},
            _yidx: 0,
            _uidx: 0,
            _loaded: {}
        };

        Y.Env._loaded[v] = {};

        if (YUI.Env) {
            Y.Env._yidx = (++YUI.Env._yidx);
            Y.Env._guidp = ('yui_' + v + '-' + Y.Env._yidx + '-' + _startTime).replace(/\./g, '_');
            Y.id = Y.stamp(Y);
            _instances[Y.id] = Y;
        }

        Y.constructor = YUI;

        // configuration defaults
        Y.config = {

            win: window || {},
            doc: document,
            debug: true,
            useBrowserConsole: true,
            throwFail: true,
            bootstrap: true,
            fetchCSS: true,
        
            base: function() {
                var b, nodes, i, match;

                // get from querystring
                nodes = document.getElementsByTagName('script');

                for (i=0; i<nodes.length; i=i+1) {
                    match = nodes[i].src.match(/^(.*)yui\/yui[\.\-].*js(\?.*)?$/);
                    b = match && match[1];
                    if (b) {
                        break;
                    }
                }

                // use CDN default
                return b || Y.Env.cdn;

            }(),

            loaderPath: 'loader/loader-min.js'
        };

    },
    
    /**
     * Finishes the instance setup. Attaches whatever modules were defined
     * when the yui modules was registered.
     * @method _setup
     * @private
     */
    _setup: function(o) {
        this.use("yui-base");
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
            this.log(method + ': applyTo not allowed', 'warn', 'yui');
            return null;
        }

        var instance = _instances[id], nest, m, i;

        if (instance) {

            nest = method.split('.'); 
            m = instance;

            for (i=0; i<nest.length; i=i+1) {

                m = m[nest[i]];

                if (!m) {
                    this.log('applyTo not found: ' + method, 'warn', 'yui');
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
        // @todo may want to restore the build property
        // @todo fire moduleAvailable event
        
        YUI.Env.mods[name] = {
            name: name, 
            fn: fn,
            version: version,
            details: details || {}
        };

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
            this._useQueue = this._useQueue || new this.Queue();
            this._useQueue.add(SLICE.call(arguments, 0));
            return this;
        }

        var Y = this, 
            a=SLICE.call(arguments, 0), 
            mods = YUI.Env.mods, 
            used = Y.Env._used,
            loader, 
            firstArg = a[0], 
            dynamic = false,
            callback = a[a.length-1],
            boot = Y.config.bootstrap,
            k, i, l, missing = [], 
            r = [], 
            css = Y.config.fetchCSS,
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

            onComplete;


        // The last argument supplied to use can be a load complete callback
        if (typeof callback === 'function') {
            a.pop();
        } else {
            callback = null;
        }

        onComplete = function(fromLoader) {


            fromLoader = fromLoader || {
                success: true,
                msg: 'not dynamic'
            };

            if (callback) {
                callback(Y, fromLoader);
            }

            if (Y.fire) {
                Y.fire('yui:load', Y, fromLoader);
            }

            // process queued use requests as long until done 
            // or dynamic load happens again.
            Y._loading = false;

            if (Y._useQueue && Y._useQueue.size() && !Y._loading) {
                Y.use.apply(Y, Y._useQueue.next());
            }
        };
 

        // YUI().use('*'); // bind everything available
        if (firstArg === "*") {
            a = [];
            for (k in mods) {
                if (mods.hasOwnProperty(k)) {
                    a.push(k);
                }
            }
            
            if (callback) {
                a.push(callback);
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
            // loader.calculate(null, (css && css == 'force') ? null : 'js');
            // loader.calculate();
            loader.calculate(null, (css) ? null : 'js');
            a = loader.sorted;
        }


        l = a.length;

        // process each requirement and any additional requirements 
        // the module metadata specifies
        for (i=0; i<l; i=i+1) {
            f(a[i]);
        }

        l = missing.length;


        if (l) {
            missing = Y.Object.keys(Y.Array.hash(missing));
        }

        // dynamic load
        if (boot && l && Y.Loader) {
            Y._loading = true;
            loader = new Y.Loader(Y.config);
            loader.onSuccess = onComplete;
            loader.onFailure = onComplete;
            loader.onTimeout = onComplete;
            loader.context = Y;
            loader.attaching = a;
            // loader.require(missing);
            loader.require((css) ? missing : a);
            loader.insert(null, (css) ? null : 'js');
        } else if (boot && l && Y.Get && !Y.Env.bootstrapped) {
            Y._loading = true;

            a = Y.Array(arguments, 0, true);
            // a.unshift('loader');

            Y.Get.script(Y.config.base + Y.config.loaderPath, {
                onEnd: function() {
                    Y._loading = false;
                    Y.Env.bootstrapped = true;
                    Y._attach(['loader']);
                    Y.use.apply(Y, a);
                }
            });

            return Y;

        } else {
            if (l) {
            }
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
        var id =  this.Env._guidp + (++this.Env._uidx);
        return (pre) ? (pre + id) : id;
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
        // if (1) { // intenionally ignoring hasOwnProperty check
        YUI[i] = p[i];
        // }
    }

    // set up the environment
    YUI._init();

    // add a window load event at load time so we can capture
    // the case where it fires before dynamic loading is
    // complete.
    add(window, 'load', globalListener);

    YUI.Env.add = add;
    YUI.Env.remove = remove;

    /*
     * Subscribe to an event.  The signature differs depending on the
     * type of event you are attaching to.
     * @method on 
     * @param type {string|function|object} The type of the event.  If
     * this is a function, this is dispatched to the aop system.  If an
     * object, it is parsed for multiple subsription definitions
     * @param fn {Function} The callback
     * @param elspec {any} DOM element(s), selector string(s), and or
     * Node ref(s) to attach DOM related events to (only applies to
     * DOM events).
     * @param
     * @return the event target or a detach handle per 'chain' config
     */

})();

/**
 * The config object contains all of the configuration options for
 * the YUI instance.  This object is supplied by the implementer 
 * when instantiating a YUI instance.  Some properties have default
 * values if they are not supplied by the implementer.
 *
 * @class config
 * @static
 */

/**
 * Allows the YUI seed file to fetch the loader component and library
 * metadata to dynamically load additional dependencies.
 *
 * @property bootstrap
 * @type boolean
 * @default true
 */

/**
 * Log to the browser console if debug is on and the browser has a
 * supported console.
 *
 * @property useBrowserConsole
 * @type boolean
 * @default true
 */

/**
 * A hash of log sources that should be logged.  If specified, only log messages from these sources will be logged.
 *
 * @property logInclude
 * @type object
 */

/**
 * A hash of log sources that should be not be logged.  If specified, all sources are logged if not on this list.
 *
 * @property logExclude
 * @type object
 */

/**
 * Set to true if the yui seed file was dynamically loaded in 
 * order to bootstrap components relying on the window load event 
 * and the 'domready' custom event.
 *
 * @property injected
 * @type object
 */

/**
 * If throwFail is set, Y.fail will generate or re-throw a JS Error.  Otherwise the failure is logged.
 *
 * @property throwFail
 * @type boolean
 * @default true
 */

/**
 * The window/frame that this instance should operate in.
 *
 * @property win
 * @type Window
 * @default the window hosting YUI
 */

/**
 * The document associated with the 'win' configuration.
 *
 * @property doc
 * @type Document
 * @default the document hosting YUI
 */

/**
 * A list of modules that defines the YUI core (overrides the default).
 *
 * @property core
 * @type string[]
 */

/**
 * The default date format
 *
 * @property dateFormat
 * @type string
 */

/**
 * The default locale
 *
 * @property locale
 * @type string
 */

/**
 * The default interval when polling in milliseconds.
 *
 * @property pollInterval
 * @type int
 * @default 20
 */

/**
 * The number of dynamic nodes to insert by default before
 * automatically removing them.  This applies to script nodes
 * because remove the node will not make the evaluated script
 * unavailable.  Dynamic CSS is not auto purged, because removing
 * a linked style sheet will also remove the style definitions.
 *
 * @property purgethreshold
 * @type int
 * @default 20
 */

/**
 * The default interval when polling in milliseconds.
 *
 * @property windowResizeDelay
 * @type int
 * @default 40
 */

/**
 * Base directory for dynamic loading
 *
 * @property base
 * @type string
 */

/**
 * The secure base dir (not implemented)
 *
 * For dynamic loading.
 *
 * @property secureBase
 * @type string
 */

/**
 * The YUI combo service base dir. Ex: http://yui.yahooapis.com/combo?
 *
 * For dynamic loading.
 *
 * @property comboBase
 * @type string
 */

/**
 * The root path to prepend to module names for the combo service. Ex: 3.0.0b1/build/
 *
 * For dynamic loading.
 *
 * @property root
 * @type string
 */

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
 *
 * For dynamic loading.
 *
 * @property filter
 * @type string|object
 */

/**
 * Hash of per-component filter specification.  If specified for a given component, 
 * this overrides the filter config
 *
 * For dynamic loading.
 *
 * @property filters
 * @type object
 */

/**
 * Use the YUI combo service to reduce the number of http connections 
 * required to load your dependencies.
 *
 * For dynamic loading.
 *
 * @property combine
 * @type boolean
 * @default true if 'base' is not supplied, false if it is.
 */

/**
 * A list of modules that should never be dynamically loaded
 *
 * @property ignore
 * @type string[]
 */

/**
 * A list of modules that should always be loaded when required, even if already 
 * present on the page.
 *
 * @property force
 * @type string[]
 */

/**
 * Node or id for a node that should be used as the insertion point for new nodes
 * For dynamic loading.
 *
 * @property insertBefore
 * @type string
 */

/**
 * charset for dynamic nodes
 *
 * @property charset
 * @type string
 * @deprecated use jsAttributes cssAttributes
 */

/**
 * Object literal containing attributes to add to dynamically loaded script nodes.
 *
 * @property jsAttributes
 * @type string
 */

/**
 * Object literal containing attributes to add to dynamically loaded link nodes.
 *
 * @property cssAttributes
 * @type string
 */

/**
 * Number of milliseconds before a timeout occurs when dynamically 
 * loading nodes. If not set, there is no timeout.
 *
 * @property timeout
 * @type int
 */

/**
 * Callback for the 'CSSComplete' event.  When dynamically loading YUI 
 * components with CSS, this property fires when the CSS is finished
 * loading but script loading is still ongoing.  This provides an
 * opportunity to enhance the presentation of a loading page a little
 * bit before the entire loading process is done.
 *
 * @property onCSS
 * @type function
 */

/**
 * A list of module definitions to add to the list of YUI components.  
 * These components can then be dynamically loaded side by side with
 * YUI via the use() method.See Loader.addModule for the supported
 * module metadata.
 *
 * @property modules
 * @type function
 */
 
/**
 * The loader 'path' attribute to the loader itself.  This is combined
 * with the 'base' attribute to dynamically load the loader component
 * when boostrapping with the get utility alone.
 *
 * @property loaderPath
 * @default loader/loader-min.js
 */

/**
 * 
 * Specifies whether or not YUI().use(...) will attempt to load CSS
 * resources at all.  Any truthy value will cause CSS dependencies
 * to load when fetching script.  The special value 'force' will 
 * cause CSS dependencies to be loaded even if no script is needed.
 *
 * @property fetchCSS
 * @default true
 */
YUI.add('yui-base', function(Y) {

/*
 * YUI stub
 * @module yui
 * @submodule yui-base
 */
/**
 * The YUI module contains the components required for building the YUI seed file.
 * This includes the script loading mechanism, a simple queue, and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

/**
 * A simple FIFO queue.  Items are added to the Queue with add(1..n items) and
 * removed using next().
 *
 * @class Queue
 * @param item* {MIXED} 0..n items to seed the queue
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
         * The collection of enqueued items
         *
         * @property _q
         * @type {Array}
         * @protected
         */
        this._q = [];
    },

    /**
     * Get the next item in the queue.
     *
     * @method next
     * @return {MIXED} the next item in the queue
     */
    next : function () {
        return this._q.shift();
    },

    /**
     * Add 0..n items to the end of the queue
     *
     * @method add
     * @param item* {MIXED} 0..n items
     */
    add : function () {
        Y.Array.each(Y.Array(arguments,0,true),function (fn) {
            this._q.push(fn);
        },this);

        return this;
    },

    /**
     * Returns the current number of queued items
     *
     * @method size
     * @return {Number}
     */
    size : function () {
        return this._q.length;
    }
};

Y.Queue = Queue;
/**
 * The YUI module contains the components required for building the YUI seed file.
 * This includes the script loading mechanism, a simple queue, and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */
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

/**
 * The YUI module contains the components required for building the YUI seed file.
 * This includes the script loading mechanism, a simple queue, and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

(function() {

var L = Y.Lang, Native = Array.prototype,

/**
 * Adds the following array utilities to the YUI instance.  Additional
 * array helpers can be found in the collection component.
 * @class Array
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
 * @method ()
 * @static
 *   @param o the item to arrayify
 *   @param i {int} if an array or array-like, this is the start index
 *   @param al {boolean} if true, it forces the array-like fork.  This
 *   can be used to avoid multiple array.test calls.
 *   @return {Array} the resulting array
 */
YArray = function(o, startIdx, al) {
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

Y.Array = YArray;

/** 
 * Evaluates the input to determine if it is an array, array-like, or 
 * something else.  This is used to handle the arguments collection 
 * available within functions, and HTMLElement collections
 *
 * @method test
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
YArray.test = function(o) {
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
 * @method each
 * @param a {Array} the array to iterate
 * @param f {Function} the function to execute on each item.  The 
 * function receives three arguments: the value, the index, the full array.
 * @param o Optional context object
 * @static
 * @return {YUI} the YUI instance
 */
YArray.each = (Native.forEach) ?
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
 * @method hash
 * @static
 * @param k {Array} keyset
 * @param v {Array} optional valueset
 * @return {object} the hash
 */
YArray.hash = function(k, v) {
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
 * @method indexOf
 * @static
 * @param a {Array} the array to search
 * @param val the value to search for
 * @return {int} the index of the item that contains the value or -1
 */
YArray.indexOf = (Native.indexOf) ?
    function(a, val) {
        return Native.indexOf.call(a, val);
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
YArray.numericSort = function(a, b) { 
    return (a - b); 
};

/**
 * Executes the supplied function on each item in the array.
 * Returning true from the processing function will stop the 
 * processing of the remaining
 * items.
 * @method some
 * @param a {Array} the array to iterate
 * @param f {Function} the function to execute on each item. The function 
 * receives three arguments: the value, the index, the full array.
 * @param o Optional context object
 * @static
 * @return {boolean} true if the function returns true on
 * any of the items in the array
 */
 YArray.some = (Native.some) ?
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


/**
 * The YUI module contains the components required for building the YUI seed file.
 * This includes the script loading mechanism, a simple queue, and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

(function() {

var L = Y.Lang, 
DELIMITER = '__',
// FROZEN = {
//     'prototype': 1,
//     '_yuid': 1
// },

/*
 * IE will not enumerate native functions in a derived object even if the
 * function was overridden.  This is a workaround for specific functions 
 * we care about on the Object prototype. 
 * @property _iefix
 * @for YUI
 * @param {Function} r  the object to receive the augmentation
 * @param {Function} s  the object that supplies the properties to augment
 * @private
 */
_iefix = function(r, s) {
    var fn = s.toString;
    if (L.isFunction(fn) && fn != Object.prototype.toString) {
        r.toString = fn;
    }
};


/**
 * Returns a new object containing all of the properties of
 * all the supplied objects.  The properties from later objects
 * will overwrite those in earlier objects.  Passing in a
 * single object will create a shallow copy of it.  For a deep
 * copy, use clone.
 * @method merge
 * @for YUI
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
 */
Y.mix = function(r, s, ov, wl, mode, merge) {

    if (!s||!r) {
        return r || Y;
    }

    if (mode) {
        switch (mode) {
            case 1: // proto to proto
                return Y.mix(r.prototype, s.prototype, ov, wl, 0, merge);
            case 2: // object to object and proto to proto
                Y.mix(r.prototype, s.prototype, ov, wl, 0, merge);
                break; // pass through 
            case 3: // proto to static
                return Y.mix(r, s.prototype, ov, wl, 0, merge);
            case 4: // static to proto
                return Y.mix(r.prototype, s, ov, wl, 0, merge);
            default:  // object to object is what happens below
        }
    }

    // Maybe don't even need this wl && wl.length check anymore??
    var arr = merge && L.isArray(r), i, l, p;

    if (wl && wl.length) {
        for (i = 0, l = wl.length; i < l; ++i) {
            p = wl[i];
            if (p in s) {
                if (merge && L.isObject(r[p], true)) {
                    Y.mix(r[p], s[p]);
                } else if (!arr && (ov || !(p in r))) {
                    r[p] = s[p];
                } else if (arr) {
                    r.push(s[p]);
                }
            }
        }
    } else {
        for (i in s) { 
            // if (s.hasOwnProperty(i) && !(i in FROZEN)) {
                // check white list if it was supplied
                // if the receiver has this property, it is an object,
                // and merge is specified, merge the two objects.
                if (merge && L.isObject(r[i], true)) {
                    Y.mix(r[i], s[i]); // recursive
                // otherwise apply the property only if overwrite
                // is specified or the receiver doesn't have one.
                } else if (!arr && (ov || !(i in r))) {
                    r[i] = s[i];
                // if merge is specified and the receiver is an array,
                // append the array item
                } else if (arr) {
                    r.push(s[i]);
                }
            // }
        }
    
        if (Y.UA.ie) {
            _iefix(r, s);
        }
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
 * @param refetch if supplied, this value is tested against the cached
 * value.  If the values are equal, the wrapped function is executed again.
 * @return {Function} the wrapped function
 */
Y.cached = function(source, cache, refetch){
    cache = cache || {};

    return function(arg1, arg2) {

        var k = (arg2) ? Array.prototype.join.call(arguments, DELIMITER) : arg1,
            v = cache[k];

        if (!(k in cache) || (refetch && cache[k] == refetch)) {
            cache[k] = source.apply(source, arguments);
        }

        return cache[k];
    };

};

})();

/**
 * The YUI module contains the components required for building the YUI seed file.
 * This includes the script loading mechanism, a simple queue, and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */
(function() {

/**
 * Adds the following Object utilities to the YUI instance
 * @class Object
 */

/**
 * Y.Object(o) returns a new object based upon the supplied object.  
 * @TODO Use native Object.create() when available
 * @method ()
 * @static
 * @param o the supplier object
 * @return {Object} the new object
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
 * @static
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
 * @method keys
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
 * @method values
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
 * @method size
 * @static
 * @param o an object
 * @return {int} the size
 */
O.size = function(o) {
    return _extract(o, 2);
};

/**
 * Returns true if the object contains a given key
 * @method hasKey
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
 * @method hasValue
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
 * @method owns
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
 * @method each
 * @static
 * @param o the object to iterate
 * @param f {Function} the function to execute on each item. The function 
 * receives three arguments: the value, the the key, the full object.
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

/*
 * Executes a function on each item, but halts if the
 * function returns true.  The function
 * receives the value, the key, and the object
 * as paramters (in that order).
 * @method some
 * @static
 * @param o the object to iterate
 * @param f {Function} the function to execute on each item. The function 
 * receives three arguments: the value, the the key, the full object.
 * @param c the execution context
 * @param proto {boolean} include proto
 * @return {boolean} true if any execution of the function returns true, false otherwise
 */
// O.some = function (o, f, c, proto) {
//     var s = c || Y, i;
// 
//     for (i in o) {
//         if (proto || o.hasOwnProperty(i)) {
//             if (f.call(s, o[i], i, o)) {
//                 return true;
//             }
//         }
//     }
//     return false;
// };

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
 * The YUI module contains the components required for building the YUI seed file.
 * This includes the script loading mechanism, a simple queue, and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

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

    var numberfy = function(s) {
            var c = 0;
            return parseFloat(s.replace(/\./g, function() {
                return (c++ == 1) ? '' : '.';
            }));
        },
    
        nav = navigator,

        o = {

        /**
         * Internet Explorer version number or 0.  Example: 6
         * @property ie
         * @type float
         * @static
         */
        ie: 0,

        /**
         * Opera version number or 0.  Example: 9.2
         * @property opera
         * @type float
         * @static
         */
        opera: 0,

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
        gecko: 0,

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
        webkit: 0,

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
        caja: nav.cajaVersion,

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

    ua = nav && nav.userAgent, 

    loc = Y.config.win.location,

    href = loc && loc.href,
    
    m;

    o.secure = href && (href.toLowerCase().indexOf("https") === 0);

    if (ua) {

        if ((/windows|win32/i).test(ua)) {
            o.os = 'windows';
        } else if ((/macintosh/i).test(ua)) {
            o.os = 'macintosh';
        }

        // Modern KHTML browsers should qualify as Safari X-Grade
        if ((/KHTML/).test(ua)) {
            o.webkit=1;
        }
        // Modern WebKit browsers are at least X-Grade
        m=ua.match(/AppleWebKit\/([^\s]*)/);
        if (m&&m[1]) {
            o.webkit=numberfy(m[1]);

            // Mobile browser check
            if (/ Mobile\//.test(ua)) {
                o.mobile = "Apple"; // iPhone or iPod Touch
            } else {
                m=ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                if (m) {
                    o.mobile = m[0]; // Nokia N-series, Android, webOS, ex: NokiaN95
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
                o.opera=numberfy(m[1]);
                m=ua.match(/Opera Mini[^;]*/);
                if (m) {
                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                m=ua.match(/MSIE\s([^;]*)/);
                if (m&&m[1]) {
                    o.ie=numberfy(m[1]);
                } else { // not opera, webkit, or ie
                    m=ua.match(/Gecko\/([^\s]*)/);
                    if (m) {
                        o.gecko=1; // Gecko detected, look for revision
                        m=ua.match(/rv:([^\s\)]*)/);
                        if (m&&m[1]) {
                            o.gecko=numberfy(m[1]);
                        }
                    }
                }
            }
        }
    }
    
    return o;
}();
/**
 * The YUI module contains the components required for building the YUI seed file.
 * This includes the script loading mechanism, a simple queue, and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

(function() {

    var min = ['yui-base'], core, C = Y.config, mods = YUI.Env.mods,
        extras, i;

    // apply the minimal required functionality
    Y.use.apply(Y, min);


    if (C.core) {
        core = C.core;
    } else {
        core = [];
        extras = ['get', 'loader', 'yui-log', 'yui-later'];

        for (i=0; i<extras.length; i++) {
            if (mods[extras[i]]) {
                core.push(extras[i]);
            }
        }
    }

    Y.use.apply(Y, core);
     
})();



}, '@VERSION@' );
