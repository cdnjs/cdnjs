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
        // Y.log('ext? ' + mod + ": " + ext);
        if (!info[name]) {
            // Y.log('adding skin ' + name);
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
                // Y.log('adding skin ' + name);
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

        // Y.log('New module ' + name);

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
            // Y.log('getRequires, no module');
            return [];
        }

        if (!this.dirty && mod.expanded) {
            // Y.log('already expanded');
            return mod.expanded;
        }

        var i, d=[], r=mod.requires, o=mod.optional, 
            info=this.moduleInfo, m, j, add;

        for (i=0; i<r.length; i=i+1) {
            // Y.log(mod.name + ' requiring ' + r[i]);
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
                // Y.log(mod.name + ' requiring ' + r[i]);
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

        // Y.log(mod.expanded);

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
                    // Y.log(name + ' provides worker trying: ' + mm);
                    done[mm] = true;
                    // we always want the return value normal behavior 
                    // (provides) for superseded modules.
                    Y.mix(o, me.getProvides(mm));
                } 
                
                // else {
                // Y.log(name + ' provides worker skipping done: ' + mm);
                // }
            };

        if (!m) {
            return o;
        }

        if (m[ckey]) {
// Y.log('cached: ' + name + ' ' + ckey + ' ' + L.dump(this.moduleInfo[name][ckey], 0));
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

// Y.log(name + " supersedes " + L.dump(m[SUPER], 0));
// Y.log(name + " provides " + L.dump(m[PROV], 0));

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

            // Y.log("after calculate: " + this.sorted);

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
                    // Y.log("skinning: " + name);
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
        
        // Y.log("Already loaded stuff: " + L.dump(l, 0));

        // add the ignore list to the list of loaded packages
        if (this.ignore) {
            // OU.appendArray(l, this.ignore);
            Y.mix(l, Y.Array.hash(this.ignore));
        }

        // expand the list to include superseded modules
        for (j in l) {
            // Y.log("expanding: " + j);
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

        // Y.log("loaded expanded: " + L.dump(l, 0));

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
                // Y.log('exploding ' + i);

                if (mod) {

                    if (expound) {
                        r[expound] = me.getModule(expound);
                        req = me.getRequires(r[expound]);
                        Y.mix(r, Y.Array.hash(req));
                    }

                    req = me.getRequires(mod);

                    // Y.log('via explode: ' + req);
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
            // Y.log('Module does not exist: ' + name + ', creating with defaults');
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
                                    // Y.log("over thresh " + c + ", " + L.dump(r));
                                    break;
                                }
                            }
                        }

                        if (roll) {
                            // Y.log("rollup: " +  i + ", " + L.dump(this, 1));
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
            Y.log('attaching Y supplied deps: ' + this.attaching, "info", "loader");
            Y._attach(this.attaching);
        } else {
            Y.log('attaching sorted list: ' + this.sorted, "info", "loader");
            Y._attach(this.sorted);
        }

        // this._pushEvents();

    },

    _finish: function() {
        _queue.running = false;
        this._continue();
    },

    _onSuccess: function() {

        Y.log('loader successful: ' + Y.id, "info", "loader");

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

        Y.log('load error: ' + o.msg + ', ' + Y.id, "error", "loader");

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

        Y.log('loader timeout: ' + Y.id, "error", "loader");

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

        // Y.log('private _insert() ' + (type || '') + ', ' + Y.id, "info", "loader");

        // restore the state at the time of the request
        if (source) {
            this._config(source);
        }

        // build the dependency list
        this.calculate(o);

        if (!type) {

            var self = this;

            // Y.log("trying to load css first");
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

        Y.log('public insert() ' + (type || '') + ', ' + Y.id, "info", "loader");


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
                Y.log('Combo complete: ' + o.data, "info", "loader");
                this._combineComplete[type] = true;


                var c=this._combining, len=c.length, i;

                for (i=0; i<len; i=i+1) {
                    this.inserted[c[i]] = true;
                }

                this.loadNext(o.data);
            },
            onsuccess=function(o) {
                // Y.log('loading next, just loaded' + o.data);
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

Y.log('Attempting to use combo: ' + this._combining, "info", "loader");

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

Y.log("loadNext executing, just loaded " + mname + ", " + Y.id, "info", "loader");

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
                // Y.log(s[i] + " alread loaded ");
                continue;
            }

            // Because rollups will cause multiple load notifications
            // from Y, loadNext may be called multiple times for
            // the same module when loading a rollup.  We can safely
            // skip the subsequent requests
            if (s[i] === this._loading) {
                Y.log("still loading " + s[i] + ", waiting", "info", "loader");
                return;
            }

            // log("inserting " + s[i]);
            m = this.getModule(s[i]);

            if (!m) {

                msg = "Undefined module " + s[i] + " skipped";
                Y.log(msg, 'warn', 'loader');
                this.inserted[s[i]] = true;
                this.skipped[s[i]] = true;
                continue;

            }


            // The load type is stored to offer the possibility to load
            // the css separately from the script.
            if (!type || type === m.type) {
                this._loading = s[i];
                Y.log("attempting to load " + s[i] + ", " + this.base, "info", "loader");

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
            // Y.log('loader internal');
            this._internalCallback = null;
            fn.call(this);

        // } else if (this.onSuccess) {
        } else {
            // Y.log('loader complete');
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
