YUI.add('loader-base', function(Y) {

/**
 * The YUI loader core
 * @module loader
 * @submodule loader-base
 */
(function() {
var VERSION         = Y.version,
    CONFIG          = Y.config,
    BUILD           = '/build/',
    ROOT            = VERSION + BUILD,
    CDN_BASE        = Y.Env.base,
    GALLERY_VERSION = CONFIG.gallery || 'gallery-2010.04.21-21-51',
    GALLERY_ROOT    = GALLERY_VERSION + BUILD,
    TNT             = '2in3',
    TNT_VERSION     = CONFIG[TNT] || '1',
    YUI2_VERSION    = CONFIG.yui2 || '2.8.0',
    YUI2_ROOT       = TNT + '.' + TNT_VERSION + '/' + YUI2_VERSION + BUILD,
    COMBO_BASE      = CDN_BASE + 'combo?',
    META =          { version:   VERSION,
                      root:      ROOT,
                      base:      Y.Env.base,
                      comboBase: COMBO_BASE,
                      skin:      { defaultSkin: 'sam',
                                   base:        'assets/skins/',
                                   path:        'skin.css',
                                   after:       [ 'cssreset', 
                                                  'cssfonts', 
                                                  'cssreset-context', 
                                                  'cssfonts-context' ] },
                      groups:    {},
                      modules:   { /* METAGEN */ },
                      patterns:  {}                                     },
    groups =          META.groups;

groups[VERSION] = {};

groups.gallery = {
    base:      CDN_BASE + GALLERY_ROOT,
    ext:       false,
    combine:   true,
    root:      GALLERY_ROOT,
    comboBase: COMBO_BASE,
    patterns:  { 'gallery-': {} }
};

groups.yui2 = {
    base:      CDN_BASE + YUI2_ROOT,
    combine:   true,
    ext:       false,
    root:      YUI2_ROOT,
    comboBase: COMBO_BASE,
    patterns:  { 
        'yui2-': {
            configFn: function(me) {
                if(/-skin|reset|fonts|grids|base/.test(me.name)) {
                    me.type = 'css';
                    me.path = me.path.replace(/\.js/, '.css');
                    // this makes skins in builds earlier than 2.6.0 work as long as combine is false
                    me.path = me.path.replace(/\/yui2-skin/, '/assets/skins/sam/yui2-skin');
                }
            }
        } 
    }
};

YUI.Env[VERSION] = META;
}());
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
 * @module loader
 * @submodule loader-base
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
 *
 * While the loader can be instantiated by the end user, it normally is not.
 * @see YUI.use for the normal use case.  The use function automatically will
 * pull in missing dependencies.
 *
 * @class Loader
 * @constructor
 * @param o an optional set of configuration options.  Valid options:
 * <ul>
 *  <li>base:
 *  The base dir</li>
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

var NOT_FOUND       = {},
    NO_REQUIREMENTS = [],
    MAX_URL_LENGTH  = (Y.UA.ie) ? 2048 : 8192,
    GLOBAL_ENV      = YUI.Env,
    GLOBAL_LOADED   = GLOBAL_ENV._loaded,
    CSS             = 'css',
    JS              = 'js',
    VERSION         = Y.version,
    ROOT_LANG       = "",
    YObject         = Y.Object,
    YArray          = Y.Array,
    _queue          = YUI.Env._loaderQueue,
    META            = GLOBAL_ENV[VERSION],
    L               = Y.Lang,
    _path           = Y.cached(function(dir, file, type, nomin) {
                        var path = dir + '/' + file;
                        if (!nomin) {
                            path += '-min';
                        }
                        path += '.' + (type || CSS);

                        return path;
                    });

Y.Env.meta = META;

Y.Loader = function(o) {

    var defaults = Y.Env.meta.modules, i, onPage = GLOBAL_ENV.mods,
        self = this;

    /**
     * Internal callback to handle multiple internal insert() calls
     * so that css is inserted prior to js
     * @property _internalCallback
     * @private
     */
    // self._internalCallback = null;

    /**
     * Callback that will be executed when the loader is finished
     * with an insert
     * @method onSuccess
     * @type function
     */
    // self.onSuccess = null;

    /**
     * Callback that will be executed if there is a failure
     * @method onFailure
     * @type function
     */
    // self.onFailure = null;

    /**
     * Callback for the 'CSSComplete' event.  When loading YUI components with CSS
     * the CSS is loaded first, then the script.  This provides a moment you can tie into to improve
     * the presentation of the page while the script is loading.
     * @method onCSS
     * @type function
     */
    // self.onCSS = null;

    /**
     * Callback executed each time a script or css file is loaded
     * @method onProgress
     * @type function
     */
    // self.onProgress = null;

    /**
     * Callback that will be executed if a timeout occurs
     * @method onTimeout
     * @type function
     */
    // self.onTimeout = null;

    /**
     * The execution context for all callbacks
     * @property context
     * @default {YUI} the YUI instance
     */
    self.context = Y;

    /**
     * Data that is passed to all callbacks
     * @property data
     */
    // self.data = null;

    /**
     * Node reference or id where new nodes should be inserted before
     * @property insertBefore
     * @type string|HTMLElement
     */
    // self.insertBefore = null;

    /**
     * The charset attribute for inserted nodes
     * @property charset
     * @type string
     * @deprecated, use cssAttributes or jsAttributes
     */
    // self.charset = null;

    /**
     * An object literal containing attributes to add to link nodes
     * @property cssAttributes
     * @type object
     */
    // self.cssAttributes = null;

    /**
     * An object literal containing attributes to add to script nodes
     * @property jsAttributes
     * @type object
     */
    // self.jsAttributes = null;

    /**
     * The base directory.
     * @property base
     * @type string
     * @default http://yui.yahooapis.com/[YUI VERSION]/build/
     */
    self.base = Y.Env.meta.base;

    /**
     * Base path for the combo service
     * @property comboBase
     * @type string
     * @default http://yui.yahooapis.com/combo?
     */
    self.comboBase = Y.Env.meta.comboBase;

    /*
     * Base path for language packs.
     */
    // self.langBase = Y.Env.meta.langBase;
    // self.lang = "";

    /**
     * If configured, the loader will attempt to use the combo
     * service for YUI resources and configured external resources.
     * @property combine
     * @type boolean
     * @default true if a base dir isn't in the config
     */
    self.combine = o.base && (o.base.indexOf( self.comboBase.substr(0, 20)) > -1);

    /**
     * Max url length for combo urls.  The default is 2048 for
     * internet explorer, and 8192 otherwise.  This is the URL
     * limit for the Yahoo! hosted combo servers.  If consuming
     * a different combo service that has a different URL limit
     * it is possible to override this default by supplying 
     * the maxURLLength config option.  The config option will
     * only take effect if lower than the default.
     *
     * Browsers:
     *    IE: 2048
     *    Other A-Grade Browsers: Higher that what is typically supported 
     *    'capable' mobile browsers: @TODO
     *
     * Servers:
     *    Apache: 8192
     *
     * @property maxURLLength
     * @type int
     */
    self.maxURLLength = MAX_URL_LENGTH;

    /**
     * Ignore modules registered on the YUI global
     * @property ignoreRegistered
     * @default false
     */
    // self.ignoreRegistered = false;

    /**
     * Root path to prepend to module path for the combo
     * service
     * @property root
     * @type string
     * @default [YUI VERSION]/build/
     */
    self.root = Y.Env.meta.root;

    /**
     * Timeout value in milliseconds.  If set, self value will be used by
     * the get utility.  the timeout event will fire if
     * a timeout occurs.
     * @property timeout
     * @type int
     */
    self.timeout = 0;

    /**
     * A list of modules that should not be loaded, even if
     * they turn up in the dependency tree
     * @property ignore
     * @type string[]
     */
    // self.ignore = null;

    /**
     * A list of modules that should always be loaded, even
     * if they have already been inserted into the page.
     * @property force
     * @type string[]
     */
    // self.force = null;

    self.forceMap = {};

    /**
     * Should we allow rollups
     * @property allowRollup
     * @type boolean
     * @default true
     */
    self.allowRollup = true;

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
    // self.filter = null;

    /**
     * per-component filter specification.  If specified for a given component, this 
     * overrides the filter config.
     * @property filters
     * @type object
     */
    self.filters = {};

    /**
     * The list of requested modules
     * @property required
     * @type {string: boolean}
     */
    self.required = {};

    /**
     * If a module name is predefined when requested, it is checked againsts
     * the patterns provided in this property.  If there is a match, the
     * module is added with the default configuration.
     *
     * At the moment only supporting module prefixes, but anticipate supporting
     * at least regular expressions.
     * @property patterns
     * @type Object
     */
    // self.patterns = Y.merge(Y.Env.meta.patterns);
    self.patterns = {};

    /**
     * The library metadata
     * @property moduleInfo
     */
    // self.moduleInfo = Y.merge(Y.Env.meta.moduleInfo);
    self.moduleInfo = {};

    self.groups = Y.merge(Y.Env.meta.groups);

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
    self.skin = Y.merge(Y.Env.meta.skin);

    self.config = o;
    self._config(o);
    
    self._internal = true;

    // YObject.each(defaults, function(k, v) {
    //     self.addModule(v, k);
    // });

    for (i in defaults) {
        if (defaults.hasOwnProperty(i)) {
            self.addModule(defaults[i], i);
        }
    }

    for (i in onPage) {
        if ((!(i in self.moduleInfo)) && onPage[i].details) {
            self.addModule(onPage[i].details, i);
        }
    }

    self._internal = false;

    /**
     * List of rollup files found in the library metadata
     * @property rollups
     */
    // self.rollups = null;

    /**
     * Whether or not to load optional dependencies for 
     * the requested modules
     * @property loadOptional
     * @type boolean
     * @default false
     */
    // self.loadOptional = false;

    /**
     * All of the derived dependencies in sorted order, which
     * will be populated when either calculate() or insert()
     * is called
     * @property sorted
     * @type string[]
     */
    self.sorted = [];

    /**
     * Set when beginning to compute the dependency tree. 
     * Composed of what YUI reports to be loaded combined
     * with what has been loaded by any instance on the page
     * with the version number specified in the metadata.
     * @propery loaded
     * @type {string: boolean}
     */
    self.loaded = GLOBAL_LOADED[VERSION];

    /**
     * A list of modules to attach to the YUI instance when complete.
     * If not supplied, the sorted list of dependencies are applied.
     * @property attaching
     */
    // self.attaching = null;

    /**
     * Flag to indicate the dependency tree needs to be recomputed
     * if insert is called again.
     * @property dirty
     * @type boolean
     * @default true
     */
    self.dirty = true;

    /**
     * List of modules inserted by the utility
     * @property inserted
     * @type {string: boolean}
     */
    self.inserted = {};

    /**
     * List of skipped modules during insert() because the module
     * was not defined
     * @property skipped
     */
    self.skipped = {};

    // Y.on('yui:load', self.loadNext, self);

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
        var i, j, val, f, group, groupName, self = this;
        // apply config values
        if (o) {
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    val = o[i];
                    if (i == 'require') {
                        self.require(val);
                    } else if (i == 'skin') {
                        Y.mix(self.skin, o[i], true);
                    } else if (i == 'groups') {
                        for (j in val) {
                            if (val.hasOwnProperty(j)) {
                                // Y.log('group: ' + j);
                                groupName = j;
                                group = val[j];
                                self.addGroup(group, groupName);
                            }
                        }

                    } else if (i == 'modules') {
                        // add a hash of module definitions
                        YObject.each(val, self.addModule, self);
                    } else if (i == 'maxURLLength') {
                        self[i] = Math.min(MAX_URL_LENGTH, val);
                    } else {
                        self[i] = val;
                    }
                }
            }
        }

        // fix filter
        f = self.filter;

        if (L.isString(f)) {
            f = f.toUpperCase();
            self.filterName = f;
            self.filter = self.FILTER_DEFS[f];
            if (f == 'DEBUG') {
                self.require('yui-log', 'dump');
            }
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
        var mdef, pkg,
            name = this.formatSkin(skin), 
            info = this.moduleInfo,
            sinf = this.skin, 
            ext  = info[mod] && info[mod].ext;

        // Add a module definition for the module-specific skin css
        if (mod) {
            name = this.formatSkin(skin, mod);
            if (!info[name]) {
                mdef = info[mod];
                pkg = mdef.pkg || mod;
                // Y.log('adding skin ' + name);
                this.addModule({
                    name:  name,
                    group: mdef.group,
                    type:  'css',
                    after: sinf.after,
                    path:  (parent || pkg) + '/' + sinf.base + skin + '/' + mod + '.css',
                    ext:   ext
                });
            }
        }

        return name;
    },

    /** Add a new module group
     * <dl>
     *   <dt>name:</dt>      <dd>required, the group name</dd>
     *   <dt>base:</dt>      <dd>The base dir for this module group</dd>
     *   <dt>root:</dt>      <dd>The root path to add to each combo resource path</dd>
     *   <dt>combine:</dt>   <dd>combo handle</dd>
     *   <dt>comboBase:</dt> <dd>combo service base path</dd>
     *   <dt>modules:</dt>   <dd>the group of modules</dd>
     * </dl>
     * @method addGroup
     * @param o An object containing the module data
     * @param name the module name (optional), required if not in the module data
     * @return {boolean} true if the module was added, false if 
     * the object passed in did not provide all required attributes
     */
    addGroup: function(o, name) {
        var mods = o.modules, 
            self = this;
        name   = name || o.name;
        o.name = name;
        self.groups[name] = o;

        if (o.patterns) {
            YObject.each(o.patterns, function(v, k) {
                v.group = name;
                self.patterns[k] = v;
            });
        }

        if (mods) {
            YObject.each(mods, function(v, k) {
                v.group = name;
                self.addModule(v, k);
            }, self);
        }
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
     *     <dt>submodules:</dt> <dd>a hash of submodules</dd>
     *     <dt>lang:</dt>       <dd>array of BCP 47 language tags of
     *                              languages for which this module has localized resource bundles,
     *                              e.g., ["en-GB","zh-Hans-CN"]</dd>
     * </dl>
     * @method addModule
     * @param o An object containing the module data
     * @param name the module name (optional), required if not in the module data
     * @return the module definition or null if 
     * the object passed in did not provide all required attributes
     */
    addModule: function(o, name) {


        name = name || o.name;
        o.name = name;

        if (!o || !o.name) {
            return null;
        }

        if (!o.type) {
            o.type = JS;
        }

        if (!o.path && !o.fullpath) {
            o.path = _path(name, name, o.type);
        }

        o.ext = ('ext' in o) ? o.ext : (this._internal) ? false : true;
        o.requires = o.requires || [];

        // Handle submodule logic
        var subs = o.submodules, i, l, sup, s, smod, plugins, plug,
            j, langs, packName, supName, flatSup, flatLang, lang, ret,
            overrides, skinname;
            // , existing = this.moduleInfo[name], newr;

        // Adding a module again merges requirements to pick up new
        // requirements when the module arrives.  We allow this only
        // once to prevent redundant checks when an application calls
        // use() many times.
        // if (existing && !existing.reparsed) {
        //     for (i=0; i<o.requires.length; i++) {
        //         newr = o.requires[i];
        //         if (YArray.indexOf(existing.requires, newr) == -1) {
        //             existing.requires.push(newr);
        //             delete existing.expanded;
        //         }
        //     }
        //     existing.reparsed = true;
        //     return existing;
        // }

        this.moduleInfo[name] = o;

        if (!o.langPack && o.lang) {
            langs = YArray(o.lang);
            for (j=0; j < langs.length; j++) {
                lang = langs[j];
                packName = this.getLangPackName(lang, name);
                smod = this.moduleInfo[packName];
                if (!smod) {
                    smod = this._addLangPack(lang, o, packName);
                }
            }
        }


        if (subs) {
            sup = o.supersedes || []; 
            l   = 0;

            for (i in subs) {
                if (subs.hasOwnProperty(i)) {
                    s = subs[i];

                    // console.log('submodule: ' + i);

                    s.path = s.path || _path(name, i, o.type);
                    s.pkg = name;
                    s.group = o.group;

                    if (s.supersedes) {
                        sup = sup.concat(s.supersedes);
                    }

                    smod = this.addModule(s, i);
                    sup.push(i);

                    if (smod.skinnable) {
                        o.skinnable = true;
                        overrides = this.skin.overrides;
                        if (overrides && overrides[i]) {
                            for (j=0; j<overrides[i].length; j++) {
                                skinname = this._addSkin(overrides[i][j], i, name);
                                sup.push(skinname);
                            }
                        }
                        skinname = this._addSkin(this.skin.defaultSkin, i, name);
                        sup.push(skinname);
                    }

                    // looks like we are expected to work out the metadata
                    // for the parent module language packs from what is
                    // specified in the child modules.
                    if (s.lang && s.lang.length) {

                        langs = YArray(s.lang);
                        for (j=0; j < langs.length; j++) {
                            lang = langs[j];
                            packName = this.getLangPackName(lang, name);
                            supName = this.getLangPackName(lang, i);
                            smod = this.moduleInfo[packName];

                            if (!smod) {
                                smod = this._addLangPack(lang, o, packName);
                            }

                            flatSup = flatSup || YArray.hash(smod.supersedes);

                            if (!(supName in flatSup)) {
                                smod.supersedes.push(supName);
                            }

                            o.lang = o.lang || [];

                            flatLang = flatLang || YArray.hash(o.lang);

                            if (!(lang in flatLang)) {
                                o.lang.push(lang);
                            }

                            // Y.log('pack ' + packName + ' should supersede ' + supName);
                            // Add rollup file, need to add to supersedes list too 
                        }
                    }

                    l++;
                }
            }
            o.supersedes = YObject.keys(YArray.hash(sup));
            o.rollup = (l<4) ? l : Math.min(l-1, 4);
        }

        plugins = o.plugins;
        if (plugins) {
            for (i in plugins) {
                if (plugins.hasOwnProperty(i)) {
                    plug = plugins[i];
                    plug.path = plug.path || _path(name, i, o.type);
                    plug.requires = plug.requires || [];
                    plug.group = o.group;
                    // plug.requires.push(name);
                    this.addModule(plug, i);
                    if (o.skinnable) {
                        this._addSkin(this.skin.defaultSkin, i, name);
                    }
                }
            }
        }

        this.dirty = true;

        if (o.configFn) {
            ret = o.configFn(o);
            if (ret === false) {
                delete this.moduleInfo[name];
                o = null;
            }
        }

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
        Y.mix(this.required, YArray.hash(a));
    },

    /**
     * Returns an object containing properties for all modules required
     * in order to load the requested module
     * @method getRequires
     * @param mod The module definition from moduleInfo
     */
    getRequires: function(mod) {
        if (!mod || mod._parsed) {
            return NO_REQUIREMENTS;
        }

        if (!this.dirty && mod.expanded && (!mod.langCache || mod.langCache == this.lang)) {
            // Y.log('already expanded ' + mod.name);
            return mod.expanded;
        }

        // Y.log("getRequires: " + mod.name + " (dirty:" + this.dirty + ", expanded:" + mod.expanded + ")");

        mod._parsed = true;

        var i, m, j, add, packName, lang,
            d    = [], 
            r    = mod.requires, 
            o    = mod.optional, 
            intl = mod.lang || mod.intl,
            info = this.moduleInfo,
            hash = {};

        for (i=0; i<r.length; i++) {
            // Y.log(mod.name + ' requiring ' + r[i]);
            if (!hash[r[i]]) {
                d.push(r[i]);
                hash[r[i]] = true;
                m = this.getModule(r[i]);
                add = this.getRequires(m);
                intl = intl || YArray.indexOf(add, 'intl') > -1;
                for (j=0; j<add.length; j++) {
                    d.push(add[j]);
                }
            }
        }

        // get the requirements from superseded modules, if any
        r=mod.supersedes;
        if (r) {
            for (i=0; i<r.length; i++) {
                if (!hash[r[i]]) {
                    d.push(r[i]);
                    hash[r[i]] = true;
                    m = this.getModule(r[i]);
                    add = this.getRequires(m);
                    intl = intl || YArray.indexOf(add, 'intl') > -1;
                    for (j=0; j<add.length; j++) {
                        d.push(add[j]);
                    }
                }
            }
        }

        if (o && this.loadOptional) {
            for (i=0; i<o.length; i++) {
                if (!hash[o[i]]) {
                    d.push(o[i]);
                    hash[o[i]] = true;
                    add = this.getRequires(info[o[i]]);
                    intl = intl || YArray.indexOf(add, 'intl') > -1;
                    for (j=0; j<add.length; j++) {
                        d.push(add[j]);
                    }
                }
            }
        }

        mod._parsed = false;

        if (intl) {

            if (mod.lang && !mod.langPack && Y.Intl) {
                lang = Y.Intl.lookupBestLang(this.lang || ROOT_LANG, mod.lang);
// Y.log('Best lang: ' + lang + ', this.lang: ' + this.lang + ', mod.lang: ' + mod.lang);
                mod.langCache = this.lang;
                packName = this.getLangPackName(lang, mod.name);
                if (packName) {
                    d.unshift(packName);
                }
            }

            d.unshift('intl');
        }

        mod.expanded = YObject.keys(YArray.hash(d));
        return mod.expanded;
    },


    /**
     * Returns a hash of module names the supplied module satisfies.
     * @method getProvides
     * @param name {string} The name of the module
     * @return what this module provides
     */
    getProvides: function(name) {
        var m = this.getModule(name), o, s;

        if (!m) {
            return NOT_FOUND;
        }

        if (m && !m.provides) {
            o = {};
            s = m.supersedes;

            if (s) {
                YArray.each(s, function(v) {
                    Y.mix(o, this.getProvides(v));
                }, this);
            }

            o[name] = true;
            m.provides = o;
        }

        return m.provides;
    },


    /**
     * Calculates the dependency tree, the result is stored in the sorted 
     * property
     * @method calculate
     * @param o optional options object
     * @param type optional argument to prune modules 
     */
    calculate: function(o, type) {
        if (o || type || this.dirty) {
            this._config(o);
            this._setup();
            this._explode();
            if (this.allowRollup) {
                this._rollup();
            }
            this._reduce();
            this._sort();
            // this.dirty = false;
        }
    },

    _addLangPack: function(lang, m, packName) {
        var name = m.name, 
            packPath = _path((m.pkg || name), packName, JS, true),
            existing = this.moduleInfo[packName];

        if (existing) {
            return existing;
        }

        this.addModule({
            path: packPath,
            intl: true,
            langPack: true,
            ext: m.ext,
            group: m.group,
            supersedes: []
        }, packName, true);

        if (lang) {
            Y.Env.lang = Y.Env.lang || {};
            Y.Env.lang[lang] = Y.Env.lang[lang] || {};
            Y.Env.lang[lang][name] = true;
        }

        return this.moduleInfo[packName];
    },

    /**
     * Investigates the current YUI configuration on the page.  By default,
     * modules already detected will not be loaded again unless a force
     * option is encountered.  Called by calculate()
     * @method _setup
     * @private
     */
    _setup: function() {
        var info = this.moduleInfo, name, i, j, m, o, l, smod,
            packName;
        for (name in info) {
            if (info.hasOwnProperty(name)) {
                m = info[name];

                // Create skin modules
                if (m && m.skinnable) {
                    o = this.skin.overrides;
                    if (o && o[name]) {
                        for (i=0; i<o[name].length; i=i+1) {
                            smod = this._addSkin(o[name][i], name);
                            if (YArray.indexOf(m.requires, smod) == -1) {
                                m.requires.push(smod);
                            }
                        }
                    } else {

                        smod = this._addSkin(this.skin.defaultSkin, name);
                        if (YArray.indexOf(m.requires, smod) == -1) {
                            m.requires.push(smod);
                        }
                    }

                }

                // Create lang pack modules
                if (m && m.lang && m.lang.length) {
                    // langs = YArray(m.lang);
                    // for (i=0; i<langs.length; i=i+1) {
                    //     lang = langs[i];
                    //     packName = this.getLangPackName(lang, name);
                    //     this._addLangPack(lang, m, packName);
                    // }

                    // Setup root package if the module has lang defined, 
                    // it needs to provide a root language pack
                    packName = this.getLangPackName(ROOT_LANG, name);
                    this._addLangPack(null, m, packName);
                }
            }
        }

        l = Y.merge(this.inserted);

        // available modules
        if (!this.ignoreRegistered) {
            Y.mix(l, GLOBAL_ENV.mods);
        }
        
        // add the ignore list to the list of loaded packages
        if (this.ignore) {
            Y.mix(l, YArray.hash(this.ignore));
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
    },
    
    /**
     * Builds a module name for a language pack
     * @function getLangPackName
     * @param lang {string} the language code
     * @param mname {string} the module to build it for
     * @return {string} the language pack module name
     */
    getLangPackName: Y.cached(function(lang, mname) {
        return ('lang/' + mname + ((lang) ? '_' + lang : ''));
    }),

    /**
     * Inspects the required modules list looking for additional 
     * dependencies.  Expands the required list to include all 
     * required modules.  Called by calculate()
     * @method _explode
     * @private
     */
    _explode: function() {
        var r = this.required, m, reqs;
        // the setup phase is over, all modules have been created
        this.dirty = false;

        YObject.each(r, function(v, name) {
            m = this.getModule(name);
            if (m) {
                var expound = m.expound;

                if (expound) {
                    r[expound] = this.getModule(expound);
                    reqs = this.getRequires(r[expound]);
                    Y.mix(r, YArray.hash(reqs));
                }

                reqs = this.getRequires(m);
                Y.mix(r, YArray.hash(reqs));
            }
        }, this);

        // Y.log('After explode: ' + YObject.keys(r));
    },

    getModule: function(mname) {
        //TODO: Remove name check - it's a quick hack to fix pattern WIP
        if (!mname) {
            return null;
        }

        var p, type, found, pname, 
            m = this.moduleInfo[mname], 
            patterns = this.patterns;

        // check the patterns library to see if we should automatically add
        // the module with defaults
        if (!m) {
           // Y.log('testing patterns ' + YObject.keys(patterns));
            for (pname in patterns) {
                if (patterns.hasOwnProperty(pname)) {
                    // Y.log('testing pattern ' + i);
                    p = patterns[pname];
                    type = p.type;

                    // use the metadata supplied for the pattern
                    // as the module definition.
                    if (mname.indexOf(pname) > -1) {
                        found = p;
                        break;
                    }
                }
            }

            if (found) {
                if (p.action) {
                    // Y.log('executing pattern action: ' + pname);
                    p.action.call(this, mname, pname);
                } else {
Y.log('Undefined module: ' + mname + ', matched a pattern: ' + pname, 'info', 'loader');
                    // ext true or false?
                    m = this.addModule(Y.merge(found), mname);
                }
            }
        }

        return m;
    },

    // impl in rollup submodule
    _rollup: function() { },

    /**
     * Remove superceded modules and loaded modules.  Called by
     * calculate() after we have the mega list of all dependencies
     * @method _reduce
     * @private
     */
    _reduce: function() {
        var i, j, s, m, r=this.required, type = this.loadType;
        for (i in r) {
            if (r.hasOwnProperty(i)) {
                m = this.getModule(i);
                // remove if already loaded
                if ((this.loaded[i] && (!this.forceMap[i]) && !this.ignoreRegistered) || (type && m && m.type != type)) { 
                    delete r[i];
                // remove anything this module supersedes
                } else {
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
        // Y.log('required now: ' + YObject.keys(r));
    },

    _finish: function(msg, success) {
        Y.log('loader finishing: ' + msg + ', ' + Y.id + ', ' + this.data, "info", "loader");

        _queue.running = false;

        var onEnd = this.onEnd;
        if (onEnd) {
            onEnd.call(this.context, {
                msg: msg,
                data: this.data,
                // data: this.sorted,
                success: success
            });
        }
        this._continue();
    },

    _onSuccess: function() {
        // Y.log('loader _onSuccess, skipping: ' + Y.Object.keys(this.skipped), "info", "loader");
        var skipped = Y.merge(this.skipped), fn;
        YObject.each(skipped, function(k) {
            delete this.inserted[k];
        }, this);
        this.skipped = {};
        // Y.mix(this.loaded, this.inserted);
        fn = this.onSuccess;
        if (fn) {
            fn.call(this.context, {
                msg: 'success',
                data: this.data,
                success: true,
                skipped: skipped
            });
        }
        this._finish('success', true);
    },

    _onFailure: function(o) {
        Y.log('load error: ' + o.msg + ', ' + Y.id, "error", "loader");
        var f = this.onFailure, msg = 'failure: ' + o.msg;
        if (f) {
            f.call(this.context, {
                msg: msg,
                data: this.data,
                success: false
            });
        }
        this._finish(msg, false);
    },

    _onTimeout: function() {
        Y.log('loader timeout: ' + Y.id, "error", "loader");
        var f = this.onTimeout;
        if (f) {
            f.call(this.context, {
                msg: 'timeout',
                data: this.data,
                success: false
            });
        }
        this._finish('timeout', false);
    },
    
    /**
     * Sorts the dependency tree.  The last step of calculate()
     * @method _sort
     * @private
     */
    _sort: function() {

        // create an indexed list
        var s = YObject.keys(this.required), 
            info = this.moduleInfo, 
            // loaded = this.loaded,
            done = {},
            p=0, l, a, b, j, k, moved, doneKey,

        // returns true if b is not loaded, and is required
        // directly or by means of modules it supersedes.
            requires = Y.cached(function(mod1, mod2) {

                var m = info[mod1], i, r, after, other = info[mod2], s;

                // if (loaded[mod2] || !m || !other) {
                if (!m || !other) {
                    return false;
                }

                r     = m.expanded;
                after = m.after; 

                // check if this module requires the other directly
                if (r && YArray.indexOf(r, mod2) > -1) {
                    return true;
                }

                // check if this module should be sorted after the other
                if (after && YArray.indexOf(after, mod2) > -1) {
                    return true;
                }

                // check if this module requires one the other supersedes
                s = info[mod2] && info[mod2].supersedes;
                if (s) {
                    for (i=0; i<s.length; i=i+1) {
                        if (requires(mod1, s[i])) {
                            return true;
                        }
                    }
                }

                // external css files should be sorted below yui css
                if (m.ext && m.type == CSS && !other.ext && other.type == CSS) {
                    return true;
                }

                return false;
            });

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
                    doneKey = a + s[k];

                    if (!done[doneKey] && requires(a, s[k])) {

                        // extract the dependency so we can move it up
                        b = s.splice(k, 1);

                        // insert the dependency above the item that 
                        // requires it
                        s.splice(j, 0, b[0]);

                        // only swap two dependencies once to short circut
                        // circular dependencies
                        done[doneKey] = true;

                        // keep working 
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
        this.calculate(o); // don't include type so we can process CSS and script in
                           // one pass when the type is not specified.
        this.loadType = type;

        if (!type) {

            var self = this;

            // Y.log("trying to load css first");
            this._internalCallback = function() {

                var f = self.onCSS, n, p, sib;

                // IE hack for style overrides that are not being applied
                if (this.insertBefore && Y.UA.ie) {
                    n = Y.config.doc.getElementById(this.insertBefore);
                    p = n.parentNode;
                    sib = n.nextSibling;
                    p.removeChild(n);
                    if (sib) {
                        p.insertBefore(n, sib);
                    } else {
                        p.appendChild(n);
                    }
                }

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

        // start the load
        this.loadNext();

    },

    // Once a loader operation is completely finished, process
    // any additional queued items.
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
        // Y.log('public insert() ' + (type || '') + ', ' + Y.Object.keys(this.required), "info", "loader");
        var self = this, copy = Y.merge(this, true);
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

        var s, len, i, m, url, fn, msg, attr, group, groupName, j, frag, 
            comboSource, comboSources, mods, combining, urls, comboBase,
            type          = this.loadType, 
            self          = this,
            handleSuccess = function(o) {
                                self.loadNext(o.data);
                            },
            handleCombo   = function(o) {
                                self._combineComplete[type] = true;
                                var i, len = combining.length;

                                for (i=0; i<len; i++) {
                                    self.loaded[combining[i]]   = true;
                                    self.inserted[combining[i]] = true;
                                }

                                handleSuccess(o);
                            };

        if (this.combine && (!this._combineComplete[type])) {

            combining = [];

            this._combining = combining; 
            s = this.sorted;
            len = s.length;

            // the default combo base
            comboBase = this.comboBase;

            url = comboBase;
            urls = [];

            comboSources = {};

            for (i=0; i<len; i++) {
                comboSource = comboBase;
                m = this.getModule(s[i]);
                groupName = m && m.group;
                if (groupName) {

                    group = this.groups[groupName];

                    if (!group.combine) {
                        m.combine = false;
                        continue;
                    }
                    m.combine = true;
                    if (group.comboBase) {
                        comboSource = group.comboBase;
                    }

                    if (group.root) {
                        m.root = group.root;
                    }

                }

                comboSources[comboSource] = comboSources[comboSource] || [];
                comboSources[comboSource].push(m);
            }

            for (j in comboSources) {
                if (comboSources.hasOwnProperty(j)) {
                    url = j;
                    mods = comboSources[j];
                    len = mods.length;

                    for (i=0; i<len; i++) {
                        // m = this.getModule(s[i]);
                        m = mods[i];

                        // Do not try to combine non-yui JS unless combo def is found
                        if (m && (m.type === type) && (m.combine || !m.ext)) {

                            frag = (m.root || this.root) + m.path;

                            if ((url !== j) && (i < (len - 1)) && ((frag.length + url.length) > this.maxURLLength)) {
                                urls.push(this._filter(url));
                                url = j;
                            }

                            url += frag;
                            if (i < (len - 1)) {
                                url += '&';
                            }

                            combining.push(m.name);
                        }

                    }

                    if (combining.length && (url != j)) {
                        urls.push(this._filter(url));
                    }
                }
            }

            if (combining.length) {

Y.log('Attempting to use combo: ' + combining, "info", "loader");

                // if (m.type === CSS) {
                if (type === CSS) {
                    fn = Y.Get.css;
                    attr = this.cssAttributes;
                } else {
                    fn = Y.Get.script;
                    attr = this.jsAttributes;
                }

                fn(urls, {
                    data:         this._loading,
                    onSuccess:    handleCombo,
                    onFailure:    this._onFailure,
                    onTimeout:    this._onTimeout,
                    insertBefore: this.insertBefore,
                    charset:      this.charset,
                    attributes:   attr,
                    timeout:      this.timeout,
                    autopurge:    false,
                    context:      this
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

// Y.log("loadNext executing, just loaded " + mname + ", " + Y.id, "info", "loader");

            // The global handler that is called when each module is loaded
            // will pass that module name to this function.  Storing this
            // data to avoid loading the same module multiple times
            // centralize this in the callback
            this.inserted[mname] = true;
            this.loaded[mname] = true;

            if (this.onProgress) {
                this.onProgress.call(this.context, {
                        name: mname,
                        data: this.data
                    });
            }
        }

        s   = this.sorted;
        len = s.length;

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
                Y.log("still loading " + s[i] + ", waiting", "info", "loader");
                return;
            }

            // log("inserting " + s[i]);
            m = this.getModule(s[i]);

            if (!m) {
                msg = "Undefined module " + s[i] + " skipped";
                Y.log(msg, 'warn', 'loader');
                this.inserted[s[i]] = true;
                this.skipped[s[i]]  = true;
                continue;

            }

            group = (m.group && this.groups[m.group]) || NOT_FOUND;

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

                url = (m.fullpath) ? this._filter(m.fullpath, s[i]) : this._url(m.path, s[i], group.base || m.base);

                fn(url, {
                    data:         s[i],
                    onSuccess:    handleSuccess,
                    insertBefore: this.insertBefore,
                    charset:      this.charset,
                    attributes:   attr,
                    onFailure:    this._onFailure,
                    onTimeout:    this._onTimeout,
                    timeout:      this.timeout,
                    autopurge:    false,
                    context:      self 
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
        } else {
            // Y.log('loader complete');
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
    _url: function(path, name, base) {
        return this._filter((base || this.base || "") + path, name);
    }
};

})();



}, '@VERSION@' ,{requires:['get']});
