if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/loader-base/loader-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/loader-base/loader-base.js",
    code: []
};
_yuitest_coverage["build/loader-base/loader-base.js"].code=["YUI.add('loader-base', function (Y, NAME) {","","/**"," * The YUI loader core"," * @module loader"," * @submodule loader-base"," */","","if (!YUI.Env[Y.version]) {","","    (function() {","        var VERSION = Y.version,","            BUILD = '/build/',","            ROOT = VERSION + BUILD,","            CDN_BASE = Y.Env.base,","            GALLERY_VERSION = 'gallery-2013.02.27-21-03',","            TNT = '2in3',","            TNT_VERSION = '4',","            YUI2_VERSION = '2.9.0',","            COMBO_BASE = CDN_BASE + 'combo?',","            META = { version: VERSION,","                              root: ROOT,","                              base: Y.Env.base,","                              comboBase: COMBO_BASE,","                              skin: { defaultSkin: 'sam',","                                           base: 'assets/skins/',","                                           path: 'skin.css',","                                           after: ['cssreset',","                                                          'cssfonts',","                                                          'cssgrids',","                                                          'cssbase',","                                                          'cssreset-context',","                                                          'cssfonts-context']},","                              groups: {},","                              patterns: {} },","            groups = META.groups,","            yui2Update = function(tnt, yui2, config) {","","                var root = TNT + '.' +","                        (tnt || TNT_VERSION) + '/' +","                        (yui2 || YUI2_VERSION) + BUILD,","                    base = (config && config.base) ? config.base : CDN_BASE,","                    combo = (config && config.comboBase) ? config.comboBase : COMBO_BASE;","","                groups.yui2.base = base + root;","                groups.yui2.root = root;","                groups.yui2.comboBase = combo;","            },","            galleryUpdate = function(tag, config) {","                var root = (tag || GALLERY_VERSION) + BUILD,","                    base = (config && config.base) ? config.base : CDN_BASE,","                    combo = (config && config.comboBase) ? config.comboBase : COMBO_BASE;","","                groups.gallery.base = base + root;","                groups.gallery.root = root;","                groups.gallery.comboBase = combo;","            };","","","        groups[VERSION] = {};","","        groups.gallery = {","            ext: false,","            combine: true,","            comboBase: COMBO_BASE,","            update: galleryUpdate,","            patterns: { 'gallery-': { },","                        'lang/gallery-': {},","                        'gallerycss-': { type: 'css' } }","        };","","        groups.yui2 = {","            combine: true,","            ext: false,","            comboBase: COMBO_BASE,","            update: yui2Update,","            patterns: {","                'yui2-': {","                    configFn: function(me) {","                        if (/-skin|reset|fonts|grids|base/.test(me.name)) {","                            me.type = 'css';","                            me.path = me.path.replace(/\\.js/, '.css');","                            // this makes skins in builds earlier than","                            // 2.6.0 work as long as combine is false","                            me.path = me.path.replace(/\\/yui2-skin/,","                                             '/assets/skins/sam/yui2-skin');","                        }","                    }","                }","            }","        };","","        galleryUpdate();","        yui2Update();","","        YUI.Env[VERSION] = META;","    }());","}","","","/*jslint forin: true, maxlen: 350 */","","/**"," * Loader dynamically loads script and css files.  It includes the dependency"," * information for the version of the library in use, and will automatically pull in"," * dependencies for the modules requested. It can also load the"," * files from the Yahoo! CDN, and it can utilize the combo service provided on"," * this network to reduce the number of http connections required to download"," * YUI files."," *"," * @module loader"," * @main loader"," * @submodule loader-base"," */","","var NOT_FOUND = {},","    NO_REQUIREMENTS = [],","    MAX_URL_LENGTH = 1024,","    GLOBAL_ENV = YUI.Env,","    GLOBAL_LOADED = GLOBAL_ENV._loaded,","    CSS = 'css',","    JS = 'js',","    INTL = 'intl',","    DEFAULT_SKIN = 'sam',","    VERSION = Y.version,","    ROOT_LANG = '',","    YObject = Y.Object,","    oeach = YObject.each,","    yArray = Y.Array,","    _queue = GLOBAL_ENV._loaderQueue,","    META = GLOBAL_ENV[VERSION],","    SKIN_PREFIX = 'skin-',","    L = Y.Lang,","    ON_PAGE = GLOBAL_ENV.mods,","    modulekey,","    _path = function(dir, file, type, nomin) {","        var path = dir + '/' + file;","        if (!nomin) {","            path += '-min';","        }","        path += '.' + (type || CSS);","","        return path;","    };","","","    if (!YUI.Env._cssLoaded) {","        YUI.Env._cssLoaded = {};","    }","","","/**"," * The component metadata is stored in Y.Env.meta."," * Part of the loader module."," * @property meta"," * @for YUI"," */","Y.Env.meta = META;","","/**"," * Loader dynamically loads script and css files.  It includes the dependency"," * info for the version of the library in use, and will automatically pull in"," * dependencies for the modules requested. It can load the"," * files from the Yahoo! CDN, and it can utilize the combo service provided on"," * this network to reduce the number of http connections required to download"," * YUI files. You can also specify an external, custom combo service to host"," * your modules as well.","","        var Y = YUI();","        var loader = new Y.Loader({","            filter: 'debug',","            base: '../../',","            root: 'build/',","            combine: true,","            require: ['node', 'dd', 'console']","        });","        var out = loader.resolve(true);",""," * @constructor"," * @class Loader"," * @param {Object} config an optional set of configuration options."," * @param {String} config.base The base dir which to fetch this module from"," * @param {String} config.comboBase The Combo service base path. Ex: `http://yui.yahooapis.com/combo?`"," * @param {String} config.root The root path to prepend to module names for the combo service. Ex: `2.5.2/build/`"," * @param {String|Object} config.filter A filter to apply to result urls. <a href=\"#property_filter\">See filter property</a>"," * @param {Object} config.filters Per-component filter specification.  If specified for a given component, this overrides the filter config."," * @param {Boolean} config.combine Use a combo service to reduce the number of http connections required to load your dependencies"," * @param {Boolean} [config.async=true] Fetch files in async"," * @param {Array} config.ignore: A list of modules that should never be dynamically loaded"," * @param {Array} config.force A list of modules that should always be loaded when required, even if already present on the page"," * @param {HTMLElement|String} config.insertBefore Node or id for a node that should be used as the insertion point for new nodes"," * @param {Object} config.jsAttributes Object literal containing attributes to add to script nodes"," * @param {Object} config.cssAttributes Object literal containing attributes to add to link nodes"," * @param {Number} config.timeout The number of milliseconds before a timeout occurs when dynamically loading nodes.  If not set, there is no timeout"," * @param {Object} config.context Execution context for all callbacks"," * @param {Function} config.onSuccess Callback for the 'success' event"," * @param {Function} config.onFailure Callback for the 'failure' event"," * @param {Function} config.onCSS Callback for the 'CSSComplete' event.  When loading YUI components with CSS the CSS is loaded first, then the script.  This provides a moment you can tie into to improve the presentation of the page while the script is loading."," * @param {Function} config.onTimeout Callback for the 'timeout' event"," * @param {Function} config.onProgress Callback executed each time a script or css file is loaded"," * @param {Object} config.modules A list of module definitions.  See <a href=\"#method_addModule\">Loader.addModule</a> for the supported module metadata"," * @param {Object} config.groups A list of group definitions.  Each group can contain specific definitions for `base`, `comboBase`, `combine`, and accepts a list of `modules`."," * @param {String} config.2in3 The version of the YUI 2 in 3 wrapper to use.  The intrinsic support for YUI 2 modules in YUI 3 relies on versions of the YUI 2 components inside YUI 3 module wrappers.  These wrappers change over time to accomodate the issues that arise from running YUI 2 in a YUI 3 sandbox."," * @param {String} config.yui2 When using the 2in3 project, you can select the version of YUI 2 to use.  Valid values are `2.2.2`, `2.3.1`, `2.4.1`, `2.5.2`, `2.6.0`, `2.7.0`, `2.8.0`, `2.8.1` and `2.9.0` [default] -- plus all versions of YUI 2 going forward."," */","Y.Loader = function(o) {","","    var self = this;","","    //Catch no config passed.","    o = o || {};","","    modulekey = META.md5;","","    /**","     * Internal callback to handle multiple internal insert() calls","     * so that css is inserted prior to js","     * @property _internalCallback","     * @private","     */","    // self._internalCallback = null;","","    /**","     * Callback that will be executed when the loader is finished","     * with an insert","     * @method onSuccess","     * @type function","     */","    // self.onSuccess = null;","","    /**","     * Callback that will be executed if there is a failure","     * @method onFailure","     * @type function","     */","    // self.onFailure = null;","","    /**","     * Callback for the 'CSSComplete' event.  When loading YUI components","     * with CSS the CSS is loaded first, then the script.  This provides","     * a moment you can tie into to improve the presentation of the page","     * while the script is loading.","     * @method onCSS","     * @type function","     */","    // self.onCSS = null;","","    /**","     * Callback executed each time a script or css file is loaded","     * @method onProgress","     * @type function","     */","    // self.onProgress = null;","","    /**","     * Callback that will be executed if a timeout occurs","     * @method onTimeout","     * @type function","     */","    // self.onTimeout = null;","","    /**","     * The execution context for all callbacks","     * @property context","     * @default {YUI} the YUI instance","     */","    self.context = Y;","","    /**","     * Data that is passed to all callbacks","     * @property data","     */","    // self.data = null;","","    /**","     * Node reference or id where new nodes should be inserted before","     * @property insertBefore","     * @type string|HTMLElement","     */","    // self.insertBefore = null;","","    /**","     * The charset attribute for inserted nodes","     * @property charset","     * @type string","     * @deprecated , use cssAttributes or jsAttributes.","     */","    // self.charset = null;","","    /**","     * An object literal containing attributes to add to link nodes","     * @property cssAttributes","     * @type object","     */","    // self.cssAttributes = null;","","    /**","     * An object literal containing attributes to add to script nodes","     * @property jsAttributes","     * @type object","     */","    // self.jsAttributes = null;","","    /**","     * The base directory.","     * @property base","     * @type string","     * @default http://yui.yahooapis.com/[YUI VERSION]/build/","     */","    self.base = Y.Env.meta.base + Y.Env.meta.root;","","    /**","     * Base path for the combo service","     * @property comboBase","     * @type string","     * @default http://yui.yahooapis.com/combo?","     */","    self.comboBase = Y.Env.meta.comboBase;","","    /*","     * Base path for language packs.","     */","    // self.langBase = Y.Env.meta.langBase;","    // self.lang = \"\";","","    /**","     * If configured, the loader will attempt to use the combo","     * service for YUI resources and configured external resources.","     * @property combine","     * @type boolean","     * @default true if a base dir isn't in the config","     */","    self.combine = o.base &&","        (o.base.indexOf(self.comboBase.substr(0, 20)) > -1);","","    /**","    * The default seperator to use between files in a combo URL","    * @property comboSep","    * @type {String}","    * @default Ampersand","    */","    self.comboSep = '&';","    /**","     * Max url length for combo urls.  The default is 1024. This is the URL","     * limit for the Yahoo! hosted combo servers.  If consuming","     * a different combo service that has a different URL limit","     * it is possible to override this default by supplying","     * the maxURLLength config option.  The config option will","     * only take effect if lower than the default.","     *","     * @property maxURLLength","     * @type int","     */","    self.maxURLLength = MAX_URL_LENGTH;","","    /**","     * Ignore modules registered on the YUI global","     * @property ignoreRegistered","     * @default false","     */","    self.ignoreRegistered = o.ignoreRegistered;","","    /**","     * Root path to prepend to module path for the combo","     * service","     * @property root","     * @type string","     * @default [YUI VERSION]/build/","     */","    self.root = Y.Env.meta.root;","","    /**","     * Timeout value in milliseconds.  If set, self value will be used by","     * the get utility.  the timeout event will fire if","     * a timeout occurs.","     * @property timeout","     * @type int","     */","    self.timeout = 0;","","    /**","     * A list of modules that should not be loaded, even if","     * they turn up in the dependency tree","     * @property ignore","     * @type string[]","     */","    // self.ignore = null;","","    /**","     * A list of modules that should always be loaded, even","     * if they have already been inserted into the page.","     * @property force","     * @type string[]","     */","    // self.force = null;","","    self.forceMap = {};","","    /**","     * Should we allow rollups","     * @property allowRollup","     * @type boolean","     * @default false","     */","    self.allowRollup = false;","","    /**","     * A filter to apply to result urls.  This filter will modify the default","     * path for all modules.  The default path for the YUI library is the","     * minified version of the files (e.g., event-min.js).  The filter property","     * can be a predefined filter or a custom filter.  The valid predefined","     * filters are:","     * <dl>","     *  <dt>DEBUG</dt>","     *  <dd>Selects the debug versions of the library (e.g., event-debug.js).","     *      This option will automatically include the Logger widget</dd>","     *  <dt>RAW</dt>","     *  <dd>Selects the non-minified version of the library (e.g., event.js).","     *  </dd>","     * </dl>","     * You can also define a custom filter, which must be an object literal","     * containing a search expression and a replace string:","     *","     *      myFilter: {","     *          'searchExp': \"-min\\\\.js\",","     *          'replaceStr': \"-debug.js\"","     *      }","     *","     * @property filter","     * @type string| {searchExp: string, replaceStr: string}","     */","    // self.filter = null;","","    /**","     * per-component filter specification.  If specified for a given","     * component, this overrides the filter config.","     * @property filters","     * @type object","     */","    self.filters = {};","","    /**","     * The list of requested modules","     * @property required","     * @type {string: boolean}","     */","    self.required = {};","","    /**","     * If a module name is predefined when requested, it is checked againsts","     * the patterns provided in this property.  If there is a match, the","     * module is added with the default configuration.","     *","     * At the moment only supporting module prefixes, but anticipate","     * supporting at least regular expressions.","     * @property patterns","     * @type Object","     */","    // self.patterns = Y.merge(Y.Env.meta.patterns);","    self.patterns = {};","","    /**","     * The library metadata","     * @property moduleInfo","     */","    // self.moduleInfo = Y.merge(Y.Env.meta.moduleInfo);","    self.moduleInfo = {};","","    self.groups = Y.merge(Y.Env.meta.groups);","","    /**","     * Provides the information used to skin the skinnable components.","     * The following skin definition would result in 'skin1' and 'skin2'","     * being loaded for calendar (if calendar was requested), and","     * 'sam' for all other skinnable components:","     *","     *      skin: {","     *          // The default skin, which is automatically applied if not","     *          // overriden by a component-specific skin definition.","     *          // Change this in to apply a different skin globally","     *          defaultSkin: 'sam',","     *","     *          // This is combined with the loader base property to get","     *          // the default root directory for a skin. ex:","     *          // http://yui.yahooapis.com/2.3.0/build/assets/skins/sam/","     *          base: 'assets/skins/',","     *","     *          // Any component-specific overrides can be specified here,","     *          // making it possible to load different skins for different","     *          // components.  It is possible to load more than one skin","     *          // for a given component as well.","     *          overrides: {","     *              calendar: ['skin1', 'skin2']","     *          }","     *      }","     * @property skin","     * @type {Object}","     */","    self.skin = Y.merge(Y.Env.meta.skin);","","    /*","     * Map of conditional modules","     * @since 3.2.0","     */","    self.conditions = {};","","    // map of modules with a hash of modules that meet the requirement","    // self.provides = {};","","    self.config = o;","    self._internal = true;","","    self._populateCache();","","    /**","     * Set when beginning to compute the dependency tree.","     * Composed of what YUI reports to be loaded combined","     * with what has been loaded by any instance on the page","     * with the version number specified in the metadata.","     * @property loaded","     * @type {string: boolean}","     */","    self.loaded = GLOBAL_LOADED[VERSION];","","","    /**","    * Should Loader fetch scripts in `async`, defaults to `true`","    * @property async","    */","","    self.async = true;","","    self._inspectPage();","","    self._internal = false;","","    self._config(o);","","    self.forceMap = (self.force) ? Y.Array.hash(self.force) : {};","","    self.testresults = null;","","    if (Y.config.tests) {","        self.testresults = Y.config.tests;","    }","","    /**","     * List of rollup files found in the library metadata","     * @property rollups","     */","    // self.rollups = null;","","    /**","     * Whether or not to load optional dependencies for","     * the requested modules","     * @property loadOptional","     * @type boolean","     * @default false","     */","    // self.loadOptional = false;","","    /**","     * All of the derived dependencies in sorted order, which","     * will be populated when either calculate() or insert()","     * is called","     * @property sorted","     * @type string[]","     */","    self.sorted = [];","","    /*","     * A list of modules to attach to the YUI instance when complete.","     * If not supplied, the sorted list of dependencies are applied.","     * @property attaching","     */","    // self.attaching = null;","","    /**","     * Flag to indicate the dependency tree needs to be recomputed","     * if insert is called again.","     * @property dirty","     * @type boolean","     * @default true","     */","    self.dirty = true;","","    /**","     * List of modules inserted by the utility","     * @property inserted","     * @type {string: boolean}","     */","    self.inserted = {};","","    /**","     * List of skipped modules during insert() because the module","     * was not defined","     * @property skipped","     */","    self.skipped = {};","","    // Y.on('yui:load', self.loadNext, self);","","    self.tested = {};","","    /*","     * Cached sorted calculate results","     * @property results","     * @since 3.2.0","     */","    //self.results = {};","","    if (self.ignoreRegistered) {","        //Clear inpage already processed modules.","        self._resetModules();","    }","","};","","Y.Loader.prototype = {","    /**","    * Checks the cache for modules and conditions, if they do not exist","    * process the default metadata and populate the local moduleInfo hash.","    * @method _populateCache","    * @private","    */","    _populateCache: function() {","        var self = this,","            defaults = META.modules,","            cache = GLOBAL_ENV._renderedMods,","            i;","","        if (cache && !self.ignoreRegistered) {","            for (i in cache) {","                if (cache.hasOwnProperty(i)) {","                    self.moduleInfo[i] = Y.merge(cache[i]);","                }","            }","","            cache = GLOBAL_ENV._conditions;","            for (i in cache) {","                if (cache.hasOwnProperty(i)) {","                    self.conditions[i] = Y.merge(cache[i]);","                }","            }","","        } else {","            for (i in defaults) {","                if (defaults.hasOwnProperty(i)) {","                    self.addModule(defaults[i], i);","                }","            }","        }","","    },","    /**","    * Reset modules in the module cache to a pre-processed state so additional","    * computations with a different skin or language will work as expected.","    * @method _resetModules","    * @private","    */","    _resetModules: function() {","        var self = this, i, o,","            mod, name, details;","        for (i in self.moduleInfo) {","            if (self.moduleInfo.hasOwnProperty(i)) {","                mod = self.moduleInfo[i];","                name = mod.name;","                details  = (YUI.Env.mods[name] ? YUI.Env.mods[name].details : null);","","                if (details) {","                    self.moduleInfo[name]._reset = true;","                    self.moduleInfo[name].requires = details.requires || [];","                    self.moduleInfo[name].optional = details.optional || [];","                    self.moduleInfo[name].supersedes = details.supercedes || [];","                }","","                if (mod.defaults) {","                    for (o in mod.defaults) {","                        if (mod.defaults.hasOwnProperty(o)) {","                            if (mod[o]) {","                                mod[o] = mod.defaults[o];","                            }","                        }","                    }","                }","                delete mod.langCache;","                delete mod.skinCache;","                if (mod.skinnable) {","                    self._addSkin(self.skin.defaultSkin, mod.name);","                }","            }","        }","    },","    /**","    Regex that matches a CSS URL. Used to guess the file type when it's not","    specified.","","    @property REGEX_CSS","    @type RegExp","    @final","    @protected","    @since 3.5.0","    **/","    REGEX_CSS: /\\.css(?:[?;].*)?$/i,","","    /**","    * Default filters for raw and debug","    * @property FILTER_DEFS","    * @type Object","    * @final","    * @protected","    */","    FILTER_DEFS: {","        RAW: {","            'searchExp': '-min\\\\.js',","            'replaceStr': '.js'","        },","        DEBUG: {","            'searchExp': '-min\\\\.js',","            'replaceStr': '-debug.js'","        },","        COVERAGE: {","            'searchExp': '-min\\\\.js',","            'replaceStr': '-coverage.js'","        }","    },","    /*","    * Check the pages meta-data and cache the result.","    * @method _inspectPage","    * @private","    */","    _inspectPage: function() {","        var self = this, v, m, req, mr, i;","","        //Inspect the page for CSS only modules and mark them as loaded.","        for (i in self.moduleInfo) {","            if (self.moduleInfo.hasOwnProperty(i)) {","                v = self.moduleInfo[i];","                if (v.type && v.type === CSS) {","                    if (self.isCSSLoaded(v.name)) {","                        self.loaded[i] = true;","                    }","                }","            }","        }","        for (i in ON_PAGE) {","            if (ON_PAGE.hasOwnProperty(i)) {","                v = ON_PAGE[i];","                if (v.details) {","                    m = self.moduleInfo[v.name];","                    req = v.details.requires;","                    mr = m && m.requires;","","                   if (m) {","                       if (!m._inspected && req && mr.length !== req.length) {","                           // console.log('deleting ' + m.name);","                           delete m.expanded;","                       }","                   } else {","                       m = self.addModule(v.details, i);","                   }","                   m._inspected = true;","               }","            }","        }","    },","    /*","    * returns true if b is not loaded, and is required directly or by means of modules it supersedes.","    * @private","    * @method _requires","    * @param {String} mod1 The first module to compare","    * @param {String} mod2 The second module to compare","    */","   _requires: function(mod1, mod2) {","","        var i, rm, after_map, s,","            info = this.moduleInfo,","            m = info[mod1],","            other = info[mod2];","","        if (!m || !other) {","            return false;","        }","","        rm = m.expanded_map;","        after_map = m.after_map;","","        // check if this module should be sorted after the other","        // do this first to short circut circular deps","        if (after_map && (mod2 in after_map)) {","            return true;","        }","","        after_map = other.after_map;","","        // and vis-versa","        if (after_map && (mod1 in after_map)) {","            return false;","        }","","        // check if this module requires one the other supersedes","        s = info[mod2] && info[mod2].supersedes;","        if (s) {","            for (i = 0; i < s.length; i++) {","                if (this._requires(mod1, s[i])) {","                    return true;","                }","            }","        }","","        s = info[mod1] && info[mod1].supersedes;","        if (s) {","            for (i = 0; i < s.length; i++) {","                if (this._requires(mod2, s[i])) {","                    return false;","                }","            }","        }","","        // check if this module requires the other directly","        // if (r && yArray.indexOf(r, mod2) > -1) {","        if (rm && (mod2 in rm)) {","            return true;","        }","","        // external css files should be sorted below yui css","        if (m.ext && m.type === CSS && !other.ext && other.type === CSS) {","            return true;","        }","","        return false;","    },","    /**","    * Apply a new config to the Loader instance","    * @method _config","    * @private","    * @param {Object} o The new configuration","    */","    _config: function(o) {","        var i, j, val, a, f, group, groupName, self = this,","            mods = [], mod;","        // apply config values","        if (o) {","            for (i in o) {","                if (o.hasOwnProperty(i)) {","                    val = o[i];","                    //TODO This should be a case","                    if (i === 'require') {","                        self.require(val);","                    } else if (i === 'skin') {","                        //If the config.skin is a string, format to the expected object","                        if (typeof val === 'string') {","                            self.skin.defaultSkin = o.skin;","                            val = {","                                defaultSkin: val","                            };","                        }","","                        Y.mix(self.skin, val, true);","                    } else if (i === 'groups') {","                        for (j in val) {","                            if (val.hasOwnProperty(j)) {","                                groupName = j;","                                group = val[j];","                                self.addGroup(group, groupName);","                                if (group.aliases) {","                                    for (a in group.aliases) {","                                        if (group.aliases.hasOwnProperty(a)) {","                                            self.addAlias(group.aliases[a], a);","                                        }","                                    }","                                }","                            }","                        }","","                    } else if (i === 'modules') {","                        // add a hash of module definitions","                        for (j in val) {","                            if (val.hasOwnProperty(j)) {","                                self.addModule(val[j], j);","                            }","                        }","                    } else if (i === 'aliases') {","                        for (j in val) {","                            if (val.hasOwnProperty(j)) {","                                self.addAlias(val[j], j);","                            }","                        }","                    } else if (i === 'gallery') {","                        if (this.groups.gallery.update) {","                            this.groups.gallery.update(val, o);","                        }","                    } else if (i === 'yui2' || i === '2in3') {","                        if (this.groups.yui2.update) {","                            this.groups.yui2.update(o['2in3'], o.yui2, o);","                        }","                    } else {","                        self[i] = val;","                    }","                }","            }","        }","","        // fix filter","        f = self.filter;","","        if (L.isString(f)) {","            f = f.toUpperCase();","            self.filterName = f;","            self.filter = self.FILTER_DEFS[f];","            if (f === 'DEBUG') {","                self.require('yui-log', 'dump');","            }","        }","","        if (self.filterName && self.coverage) {","            if (self.filterName === 'COVERAGE' && L.isArray(self.coverage) && self.coverage.length) {","                for (i = 0; i < self.coverage.length; i++) {","                    mod = self.coverage[i];","                    if (self.moduleInfo[mod] && self.moduleInfo[mod].use) {","                        mods = [].concat(mods, self.moduleInfo[mod].use);","                    } else {","                        mods.push(mod);","                    }","                }","                self.filters = self.filters || {};","                Y.Array.each(mods, function(mod) {","                    self.filters[mod] = self.FILTER_DEFS.COVERAGE;","                });","                self.filterName = 'RAW';","                self.filter = self.FILTER_DEFS[self.filterName];","            }","        }","","    },","","    /**","     * Returns the skin module name for the specified skin name.  If a","     * module name is supplied, the returned skin module name is","     * specific to the module passed in.","     * @method formatSkin","     * @param {string} skin the name of the skin.","     * @param {string} mod optional: the name of a module to skin.","     * @return {string} the full skin module name.","     */","    formatSkin: function(skin, mod) {","        var s = SKIN_PREFIX + skin;","        if (mod) {","            s = s + '-' + mod;","        }","","        return s;","    },","","    /**","     * Adds the skin def to the module info","     * @method _addSkin","     * @param {string} skin the name of the skin.","     * @param {string} mod the name of the module.","     * @param {string} parent parent module if this is a skin of a","     * submodule or plugin.","     * @return {string} the module name for the skin.","     * @private","     */","    _addSkin: function(skin, mod, parent) {","        var mdef, pkg, name, nmod,","            info = this.moduleInfo,","            sinf = this.skin,","            ext = info[mod] && info[mod].ext;","","        // Add a module definition for the module-specific skin css","        if (mod) {","            name = this.formatSkin(skin, mod);","            if (!info[name]) {","                mdef = info[mod];","                pkg = mdef.pkg || mod;","                nmod = {","                    skin: true,","                    name: name,","                    group: mdef.group,","                    type: 'css',","                    after: sinf.after,","                    path: (parent || pkg) + '/' + sinf.base + skin +","                          '/' + mod + '.css',","                    ext: ext","                };","                if (mdef.base) {","                    nmod.base = mdef.base;","                }","                if (mdef.configFn) {","                    nmod.configFn = mdef.configFn;","                }","                this.addModule(nmod, name);","","            }","        }","","        return name;","    },","    /**","    * Adds an alias module to the system","    * @method addAlias","    * @param {Array} use An array of modules that makes up this alias","    * @param {String} name The name of the alias","    * @example","    *       var loader = new Y.Loader({});","    *       loader.addAlias([ 'node', 'yql' ], 'davglass');","    *       loader.require(['davglass']);","    *       var out = loader.resolve(true);","    *","    *       //out.js will contain Node and YQL modules","    */","    addAlias: function(use, name) {","        YUI.Env.aliases[name] = use;","        this.addModule({","            name: name,","            use: use","        });","    },","    /**","     * Add a new module group","     * @method addGroup","     * @param {Object} config An object containing the group configuration data","     * @param {String} config.name required, the group name","     * @param {String} config.base The base directory for this module group","     * @param {String} config.root The root path to add to each combo resource path","     * @param {Boolean} config.combine Should the request be combined","     * @param {String} config.comboBase Combo service base path","     * @param {Object} config.modules The group of modules","     * @param {String} name the group name.","     * @example","     *      var loader = new Y.Loader({});","     *      loader.addGroup({","     *          name: 'davglass',","     *          combine: true,","     *          comboBase: '/combo?',","     *          root: '',","     *          modules: {","     *              //Module List here","     *          }","     *      }, 'davglass');","     */","    addGroup: function(o, name) {","        var mods = o.modules,","            self = this, i, v;","","        name = name || o.name;","        o.name = name;","        self.groups[name] = o;","","        if (o.patterns) {","            for (i in o.patterns) {","                if (o.patterns.hasOwnProperty(i)) {","                    o.patterns[i].group = name;","                    self.patterns[i] = o.patterns[i];","                }","            }","        }","","        if (mods) {","            for (i in mods) {","                if (mods.hasOwnProperty(i)) {","                    v = mods[i];","                    if (typeof v === 'string') {","                        v = { name: i, fullpath: v };","                    }","                    v.group = name;","                    self.addModule(v, i);","                }","            }","        }","    },","","    /**","     * Add a new module to the component metadata.","     * @method addModule","     * @param {Object} config An object containing the module data.","     * @param {String} config.name Required, the component name","     * @param {String} config.type Required, the component type (js or css)","     * @param {String} config.path Required, the path to the script from `base`","     * @param {Array} config.requires Array of modules required by this component","     * @param {Array} [config.optional] Array of optional modules for this component","     * @param {Array} [config.supersedes] Array of the modules this component replaces","     * @param {Array} [config.after] Array of modules the components which, if present, should be sorted above this one","     * @param {Object} [config.after_map] Faster alternative to 'after' -- supply a hash instead of an array","     * @param {Number} [config.rollup] The number of superseded modules required for automatic rollup","     * @param {String} [config.fullpath] If `fullpath` is specified, this is used instead of the configured `base + path`","     * @param {Boolean} [config.skinnable] Flag to determine if skin assets should automatically be pulled in","     * @param {Object} [config.submodules] Hash of submodules","     * @param {String} [config.group] The group the module belongs to -- this is set automatically when it is added as part of a group configuration.","     * @param {Array} [config.lang] Array of BCP 47 language tags of languages for which this module has localized resource bundles, e.g., `[\"en-GB\", \"zh-Hans-CN\"]`","     * @param {Object} [config.condition] Specifies that the module should be loaded automatically if a condition is met.  This is an object with up to three fields:","     * @param {String} [config.condition.trigger] The name of a module that can trigger the auto-load","     * @param {Function} [config.condition.test] A function that returns true when the module is to be loaded.","     * @param {String} [config.condition.when] Specifies the load order of the conditional module","     *  with regard to the position of the trigger module.","     *  This should be one of three values: `before`, `after`, or `instead`.  The default is `after`.","     * @param {Object} [config.testresults] A hash of test results from `Y.Features.all()`","     * @param {Function} [config.configFn] A function to exectute when configuring this module","     * @param {Object} config.configFn.mod The module config, modifying this object will modify it's config. Returning false will delete the module's config.","     * @param {String} [name] The module name, required if not in the module data.","     * @return {Object} the module definition or null if the object passed in did not provide all required attributes.","     */","    addModule: function(o, name) {","        name = name || o.name;","","        if (typeof o === 'string') {","            o = { name: name, fullpath: o };","        }","","","        var subs, i, l, t, sup, s, smod, plugins, plug,","            j, langs, packName, supName, flatSup, flatLang, lang, ret,","            overrides, skinname, when, g, p,","            conditions = this.conditions, trigger;","","        //Only merge this data if the temp flag is set","        //from an earlier pass from a pattern or else","        //an override module (YUI_config) can not be used to","        //replace a default module.","        if (this.moduleInfo[name] && this.moduleInfo[name].temp) {","            //This catches temp modules loaded via a pattern","            // The module will be added twice, once from the pattern and","            // Once from the actual add call, this ensures that properties","            // that were added to the module the first time around (group: gallery)","            // are also added the second time around too.","            o = Y.merge(this.moduleInfo[name], o);","        }","","        o.name = name;","","        if (!o || !o.name) {","            return null;","        }","","        if (!o.type) {","            //Always assume it's javascript unless the CSS pattern is matched.","            o.type = JS;","            p = o.path || o.fullpath;","            if (p && this.REGEX_CSS.test(p)) {","                o.type = CSS;","            }","        }","","        if (!o.path && !o.fullpath) {","            o.path = _path(name, name, o.type);","        }","        o.supersedes = o.supersedes || o.use;","","        o.ext = ('ext' in o) ? o.ext : (this._internal) ? false : true;","","        // Handle submodule logic","        subs = o.submodules;","","        this.moduleInfo[name] = o;","","        o.requires = o.requires || [];","","        /*","        Only allowing the cascade of requires information, since","        optional and supersedes are far more fine grained than","        a blanket requires is.","        */","        if (this.requires) {","            for (i = 0; i < this.requires.length; i++) {","                o.requires.push(this.requires[i]);","            }","        }","        if (o.group && this.groups && this.groups[o.group]) {","            g = this.groups[o.group];","            if (g.requires) {","                for (i = 0; i < g.requires.length; i++) {","                    o.requires.push(g.requires[i]);","                }","            }","        }","","","        if (!o.defaults) {","            o.defaults = {","                requires: o.requires ? [].concat(o.requires) : null,","                supersedes: o.supersedes ? [].concat(o.supersedes) : null,","                optional: o.optional ? [].concat(o.optional) : null","            };","        }","","        if (o.skinnable && o.ext && o.temp) {","            skinname = this._addSkin(this.skin.defaultSkin, name);","            o.requires.unshift(skinname);","        }","","        if (o.requires.length) {","            o.requires = this.filterRequires(o.requires) || [];","        }","","        if (!o.langPack && o.lang) {","            langs = yArray(o.lang);","            for (j = 0; j < langs.length; j++) {","                lang = langs[j];","                packName = this.getLangPackName(lang, name);","                smod = this.moduleInfo[packName];","                if (!smod) {","                    smod = this._addLangPack(lang, o, packName);","                }","            }","        }","","","        if (subs) {","            sup = o.supersedes || [];","            l = 0;","","            for (i in subs) {","                if (subs.hasOwnProperty(i)) {","                    s = subs[i];","","                    s.path = s.path || _path(name, i, o.type);","                    s.pkg = name;","                    s.group = o.group;","","                    if (s.supersedes) {","                        sup = sup.concat(s.supersedes);","                    }","","                    smod = this.addModule(s, i);","                    sup.push(i);","","                    if (smod.skinnable) {","                        o.skinnable = true;","                        overrides = this.skin.overrides;","                        if (overrides && overrides[i]) {","                            for (j = 0; j < overrides[i].length; j++) {","                                skinname = this._addSkin(overrides[i][j],","                                         i, name);","                                sup.push(skinname);","                            }","                        }","                        skinname = this._addSkin(this.skin.defaultSkin,","                                        i, name);","                        sup.push(skinname);","                    }","","                    // looks like we are expected to work out the metadata","                    // for the parent module language packs from what is","                    // specified in the child modules.","                    if (s.lang && s.lang.length) {","","                        langs = yArray(s.lang);","                        for (j = 0; j < langs.length; j++) {","                            lang = langs[j];","                            packName = this.getLangPackName(lang, name);","                            supName = this.getLangPackName(lang, i);","                            smod = this.moduleInfo[packName];","","                            if (!smod) {","                                smod = this._addLangPack(lang, o, packName);","                            }","","                            flatSup = flatSup || yArray.hash(smod.supersedes);","","                            if (!(supName in flatSup)) {","                                smod.supersedes.push(supName);","                            }","","                            o.lang = o.lang || [];","","                            flatLang = flatLang || yArray.hash(o.lang);","","                            if (!(lang in flatLang)) {","                                o.lang.push(lang);","                            }","","// Add rollup file, need to add to supersedes list too","","                            // default packages","                            packName = this.getLangPackName(ROOT_LANG, name);","                            supName = this.getLangPackName(ROOT_LANG, i);","","                            smod = this.moduleInfo[packName];","","                            if (!smod) {","                                smod = this._addLangPack(lang, o, packName);","                            }","","                            if (!(supName in flatSup)) {","                                smod.supersedes.push(supName);","                            }","","// Add rollup file, need to add to supersedes list too","","                        }","                    }","","                    l++;","                }","            }","            //o.supersedes = YObject.keys(yArray.hash(sup));","            o.supersedes = yArray.dedupe(sup);","            if (this.allowRollup) {","                o.rollup = (l < 4) ? l : Math.min(l - 1, 4);","            }","        }","","        plugins = o.plugins;","        if (plugins) {","            for (i in plugins) {","                if (plugins.hasOwnProperty(i)) {","                    plug = plugins[i];","                    plug.pkg = name;","                    plug.path = plug.path || _path(name, i, o.type);","                    plug.requires = plug.requires || [];","                    plug.group = o.group;","                    this.addModule(plug, i);","                    if (o.skinnable) {","                        this._addSkin(this.skin.defaultSkin, i, name);","                    }","","                }","            }","        }","","        if (o.condition) {","            t = o.condition.trigger;","            if (YUI.Env.aliases[t]) {","                t = YUI.Env.aliases[t];","            }","            if (!Y.Lang.isArray(t)) {","                t = [t];","            }","","            for (i = 0; i < t.length; i++) {","                trigger = t[i];","                when = o.condition.when;","                conditions[trigger] = conditions[trigger] || {};","                conditions[trigger][name] = o.condition;","                // the 'when' attribute can be 'before', 'after', or 'instead'","                // the default is after.","                if (when && when !== 'after') {","                    if (when === 'instead') { // replace the trigger","                        o.supersedes = o.supersedes || [];","                        o.supersedes.push(trigger);","                    }","                    // before the trigger","                        // the trigger requires the conditional mod,","                        // so it should appear before the conditional","                        // mod if we do not intersede.","                } else { // after the trigger","                    o.after = o.after || [];","                    o.after.push(trigger);","                }","            }","        }","","        if (o.supersedes) {","            o.supersedes = this.filterRequires(o.supersedes);","        }","","        if (o.after) {","            o.after = this.filterRequires(o.after);","            o.after_map = yArray.hash(o.after);","        }","","        // this.dirty = true;","","        if (o.configFn) {","            ret = o.configFn(o);","            if (ret === false) {","                delete this.moduleInfo[name];","                delete GLOBAL_ENV._renderedMods[name];","                o = null;","            }","        }","        //Add to global cache","        if (o) {","            if (!GLOBAL_ENV._renderedMods) {","                GLOBAL_ENV._renderedMods = {};","            }","            GLOBAL_ENV._renderedMods[name] = Y.mix(GLOBAL_ENV._renderedMods[name] || {}, o);","            GLOBAL_ENV._conditions = conditions;","        }","","        return o;","    },","","    /**","     * Add a requirement for one or more module","     * @method require","     * @param {string[] | string*} what the modules to load.","     */","    require: function(what) {","        var a = (typeof what === 'string') ? yArray(arguments) : what;","        this.dirty = true;","        this.required = Y.merge(this.required, yArray.hash(this.filterRequires(a)));","","        this._explodeRollups();","    },","    /**","    * Grab all the items that were asked for, check to see if the Loader","    * meta-data contains a \"use\" array. If it doesm remove the asked item and replace it with","    * the content of the \"use\".","    * This will make asking for: \"dd\"","    * Actually ask for: \"dd-ddm-base,dd-ddm,dd-ddm-drop,dd-drag,dd-proxy,dd-constrain,dd-drop,dd-scroll,dd-drop-plugin\"","    * @private","    * @method _explodeRollups","    */","    _explodeRollups: function() {","        var self = this, m, m2, i, a, v, len, len2,","        r = self.required;","","        if (!self.allowRollup) {","            for (i in r) {","                if (r.hasOwnProperty(i)) {","                    m = self.getModule(i);","                    if (m && m.use) {","                        len = m.use.length;","                        for (a = 0; a < len; a++) {","                            m2 = self.getModule(m.use[a]);","                            if (m2 && m2.use) {","                                len2 = m2.use.length;","                                for (v = 0; v < len2; v++) {","                                    r[m2.use[v]] = true;","                                }","                            } else {","                                r[m.use[a]] = true;","                            }","                        }","                    }","                }","            }","            self.required = r;","        }","","    },","    /**","    * Explodes the required array to remove aliases and replace them with real modules","    * @method filterRequires","    * @param {Array} r The original requires array","    * @return {Array} The new array of exploded requirements","    */","    filterRequires: function(r) {","        if (r) {","            if (!Y.Lang.isArray(r)) {","                r = [r];","            }","            r = Y.Array(r);","            var c = [], i, mod, o, m;","","            for (i = 0; i < r.length; i++) {","                mod = this.getModule(r[i]);","                if (mod && mod.use) {","                    for (o = 0; o < mod.use.length; o++) {","                        //Must walk the other modules in case a module is a rollup of rollups (datatype)","                        m = this.getModule(mod.use[o]);","                        if (m && m.use && (m.name !== mod.name)) {","                            c = Y.Array.dedupe([].concat(c, this.filterRequires(m.use)));","                        } else {","                            c.push(mod.use[o]);","                        }","                    }","                } else {","                    c.push(r[i]);","                }","            }","            r = c;","        }","        return r;","    },","    /**","     * Returns an object containing properties for all modules required","     * in order to load the requested module","     * @method getRequires","     * @param {object}  mod The module definition from moduleInfo.","     * @return {array} the expanded requirement list.","     */","    getRequires: function(mod) {","","        if (!mod) {","            //console.log('returning no reqs for ' + mod.name);","            return NO_REQUIREMENTS;","        }","","        if (mod._parsed) {","            //console.log('returning requires for ' + mod.name, mod.requires);","            return mod.expanded || NO_REQUIREMENTS;","        }","","        //TODO add modue cache here out of scope..","","        var i, m, j, add, packName, lang, testresults = this.testresults,","            name = mod.name, cond,","            adddef = ON_PAGE[name] && ON_PAGE[name].details,","            d, go, def,","            r, old_mod,","            o, skinmod, skindef, skinpar, skinname,","            intl = mod.lang || mod.intl,","            info = this.moduleInfo,","            ftests = Y.Features && Y.Features.tests.load,","            hash, reparse;","","        // console.log(name);","","        // pattern match leaves module stub that needs to be filled out","        if (mod.temp && adddef) {","            old_mod = mod;","            mod = this.addModule(adddef, name);","            mod.group = old_mod.group;","            mod.pkg = old_mod.pkg;","            delete mod.expanded;","        }","","        // console.log('cache: ' + mod.langCache + ' == ' + this.lang);","","        //If a skin or a lang is different, reparse..","        reparse = !((!this.lang || mod.langCache === this.lang) && (mod.skinCache === this.skin.defaultSkin));","","        if (mod.expanded && !reparse) {","            return mod.expanded;","        }","","","        d = [];","        hash = {};","        r = this.filterRequires(mod.requires);","        if (mod.lang) {","            //If a module has a lang attribute, auto add the intl requirement.","            d.unshift('intl');","            r.unshift('intl');","            intl = true;","        }","        o = this.filterRequires(mod.optional);","","","        mod._parsed = true;","        mod.langCache = this.lang;","        mod.skinCache = this.skin.defaultSkin;","","        for (i = 0; i < r.length; i++) {","            if (!hash[r[i]]) {","                d.push(r[i]);","                hash[r[i]] = true;","                m = this.getModule(r[i]);","                if (m) {","                    add = this.getRequires(m);","                    intl = intl || (m.expanded_map &&","                        (INTL in m.expanded_map));","                    for (j = 0; j < add.length; j++) {","                        d.push(add[j]);","                    }","                }","            }","        }","","        // get the requirements from superseded modules, if any","        r = this.filterRequires(mod.supersedes);","        if (r) {","            for (i = 0; i < r.length; i++) {","                if (!hash[r[i]]) {","                    // if this module has submodules, the requirements list is","                    // expanded to include the submodules.  This is so we can","                    // prevent dups when a submodule is already loaded and the","                    // parent is requested.","                    if (mod.submodules) {","                        d.push(r[i]);","                    }","","                    hash[r[i]] = true;","                    m = this.getModule(r[i]);","","                    if (m) {","                        add = this.getRequires(m);","                        intl = intl || (m.expanded_map &&","                            (INTL in m.expanded_map));","                        for (j = 0; j < add.length; j++) {","                            d.push(add[j]);","                        }","                    }","                }","            }","        }","","        if (o && this.loadOptional) {","            for (i = 0; i < o.length; i++) {","                if (!hash[o[i]]) {","                    d.push(o[i]);","                    hash[o[i]] = true;","                    m = info[o[i]];","                    if (m) {","                        add = this.getRequires(m);","                        intl = intl || (m.expanded_map &&","                            (INTL in m.expanded_map));","                        for (j = 0; j < add.length; j++) {","                            d.push(add[j]);","                        }","                    }","                }","            }","        }","","        cond = this.conditions[name];","","        if (cond) {","            //Set the module to not parsed since we have conditionals and this could change the dependency tree.","            mod._parsed = false;","            if (testresults && ftests) {","                oeach(testresults, function(result, id) {","                    var condmod = ftests[id].name;","                    if (!hash[condmod] && ftests[id].trigger === name) {","                        if (result && ftests[id]) {","                            hash[condmod] = true;","                            d.push(condmod);","                        }","                    }","                });","            } else {","                for (i in cond) {","                    if (cond.hasOwnProperty(i)) {","                        if (!hash[i]) {","                            def = cond[i];","                            //first see if they've specfied a ua check","                            //then see if they've got a test fn & if it returns true","                            //otherwise just having a condition block is enough","                            go = def && ((!def.ua && !def.test) || (def.ua && Y.UA[def.ua]) ||","                                        (def.test && def.test(Y, r)));","","                            if (go) {","                                hash[i] = true;","                                d.push(i);","                                m = this.getModule(i);","                                if (m) {","                                    add = this.getRequires(m);","                                    for (j = 0; j < add.length; j++) {","                                        d.push(add[j]);","                                    }","","                                }","                            }","                        }","                    }","                }","            }","        }","","        // Create skin modules","        if (mod.skinnable) {","            skindef = this.skin.overrides;","            for (i in YUI.Env.aliases) {","                if (YUI.Env.aliases.hasOwnProperty(i)) {","                    if (Y.Array.indexOf(YUI.Env.aliases[i], name) > -1) {","                        skinpar = i;","                    }","                }","            }","            if (skindef && (skindef[name] || (skinpar && skindef[skinpar]))) {","                skinname = name;","                if (skindef[skinpar]) {","                    skinname = skinpar;","                }","                for (i = 0; i < skindef[skinname].length; i++) {","                    skinmod = this._addSkin(skindef[skinname][i], name);","                    if (!this.isCSSLoaded(skinmod, this._boot)) {","                        d.push(skinmod);","                    }","                }","            } else {","                skinmod = this._addSkin(this.skin.defaultSkin, name);","                if (!this.isCSSLoaded(skinmod, this._boot)) {","                    d.push(skinmod);","                }","            }","        }","","        mod._parsed = false;","","        if (intl) {","","            if (mod.lang && !mod.langPack && Y.Intl) {","                lang = Y.Intl.lookupBestLang(this.lang || ROOT_LANG, mod.lang);","                packName = this.getLangPackName(lang, name);","                if (packName) {","                    d.unshift(packName);","                }","            }","            d.unshift(INTL);","        }","","        mod.expanded_map = yArray.hash(d);","","        mod.expanded = YObject.keys(mod.expanded_map);","","        return mod.expanded;","    },","    /**","    * Check to see if named css module is already loaded on the page","    * @method isCSSLoaded","    * @param {String} name The name of the css file","    * @return Boolean","    */","    isCSSLoaded: function(name, skip) {","        //TODO - Make this call a batching call with name being an array","        if (!name || !YUI.Env.cssStampEl || (!skip && this.ignoreRegistered)) {","            return false;","        }","        var el = YUI.Env.cssStampEl,","            ret = false,","            mod = YUI.Env._cssLoaded[name],","            style = el.currentStyle; //IE","","","        if (mod !== undefined) {","            return mod;","        }","","        //Add the classname to the element","        el.className = name;","","        if (!style) {","            style = Y.config.doc.defaultView.getComputedStyle(el, null);","        }","","        if (style && style.display === 'none') {","            ret = true;","        }","","","        el.className = ''; //Reset the classname to ''","","        YUI.Env._cssLoaded[name] = ret;","","        return ret;","    },","","    /**","     * Returns a hash of module names the supplied module satisfies.","     * @method getProvides","     * @param {string} name The name of the module.","     * @return {object} what this module provides.","     */","    getProvides: function(name) {","        var m = this.getModule(name), o, s;","            // supmap = this.provides;","","        if (!m) {","            return NOT_FOUND;","        }","","        if (m && !m.provides) {","            o = {};","            s = m.supersedes;","","            if (s) {","                yArray.each(s, function(v) {","                    Y.mix(o, this.getProvides(v));","                }, this);","            }","","            o[name] = true;","            m.provides = o;","","        }","","        return m.provides;","    },","","    /**","     * Calculates the dependency tree, the result is stored in the sorted","     * property.","     * @method calculate","     * @param {object} o optional options object.","     * @param {string} type optional argument to prune modules.","     */","    calculate: function(o, type) {","        if (o || type || this.dirty) {","","            if (o) {","                this._config(o);","            }","","            if (!this._init) {","                this._setup();","            }","","            this._explode();","","            if (this.allowRollup) {","                this._rollup();","            } else {","                this._explodeRollups();","            }","            this._reduce();","            this._sort();","        }","    },","    /**","    * Creates a \"psuedo\" package for languages provided in the lang array","    * @method _addLangPack","    * @private","    * @param {String} lang The language to create","    * @param {Object} m The module definition to create the language pack around","    * @param {String} packName The name of the package (e.g: lang/datatype-date-en-US)","    * @return {Object} The module definition","    */","    _addLangPack: function(lang, m, packName) {","        var name = m.name,","            packPath, conf,","            existing = this.moduleInfo[packName];","","        if (!existing) {","","            packPath = _path((m.pkg || name), packName, JS, true);","","            conf = {","                path: packPath,","                intl: true,","                langPack: true,","                ext: m.ext,","                group: m.group,","                supersedes: []","            };","            if (m.root) {","                conf.root = m.root;","            }","            if (m.base) {","                conf.base = m.base;","            }","","            if (m.configFn) {","                conf.configFn = m.configFn;","            }","","            this.addModule(conf, packName);","","            if (lang) {","                Y.Env.lang = Y.Env.lang || {};","                Y.Env.lang[lang] = Y.Env.lang[lang] || {};","                Y.Env.lang[lang][name] = true;","            }","        }","","        return this.moduleInfo[packName];","    },","","    /**","     * Investigates the current YUI configuration on the page.  By default,","     * modules already detected will not be loaded again unless a force","     * option is encountered.  Called by calculate()","     * @method _setup","     * @private","     */","    _setup: function() {","        var info = this.moduleInfo, name, i, j, m, l,","            packName;","","        for (name in info) {","            if (info.hasOwnProperty(name)) {","                m = info[name];","                if (m) {","","                    // remove dups","                    //m.requires = YObject.keys(yArray.hash(m.requires));","                    m.requires = yArray.dedupe(m.requires);","","                    // Create lang pack modules","                    //if (m.lang && m.lang.length) {","                    if (m.lang) {","                        // Setup root package if the module has lang defined,","                        // it needs to provide a root language pack","                        packName = this.getLangPackName(ROOT_LANG, name);","                        this._addLangPack(null, m, packName);","                    }","","                }","            }","        }","","","        //l = Y.merge(this.inserted);","        l = {};","","        // available modules","        if (!this.ignoreRegistered) {","            Y.mix(l, GLOBAL_ENV.mods);","        }","","        // add the ignore list to the list of loaded packages","        if (this.ignore) {","            Y.mix(l, yArray.hash(this.ignore));","        }","","        // expand the list to include superseded modules","        for (j in l) {","            if (l.hasOwnProperty(j)) {","                Y.mix(l, this.getProvides(j));","            }","        }","","        // remove modules on the force list from the loaded list","        if (this.force) {","            for (i = 0; i < this.force.length; i++) {","                if (this.force[i] in l) {","                    delete l[this.force[i]];","                }","            }","        }","","        Y.mix(this.loaded, l);","","        this._init = true;","    },","","    /**","     * Builds a module name for a language pack","     * @method getLangPackName","     * @param {string} lang the language code.","     * @param {string} mname the module to build it for.","     * @return {string} the language pack module name.","     */","    getLangPackName: function(lang, mname) {","        return ('lang/' + mname + ((lang) ? '_' + lang : ''));","    },","    /**","     * Inspects the required modules list looking for additional","     * dependencies.  Expands the required list to include all","     * required modules.  Called by calculate()","     * @method _explode","     * @private","     */","    _explode: function() {","        //TODO Move done out of scope","        var r = this.required, m, reqs, done = {},","            self = this, name, expound;","","        // the setup phase is over, all modules have been created","        self.dirty = false;","","        self._explodeRollups();","        r = self.required;","","        for (name in r) {","            if (r.hasOwnProperty(name)) {","                if (!done[name]) {","                    done[name] = true;","                    m = self.getModule(name);","                    if (m) {","                        expound = m.expound;","","                        if (expound) {","                            r[expound] = self.getModule(expound);","                            reqs = self.getRequires(r[expound]);","                            Y.mix(r, yArray.hash(reqs));","                        }","","                        reqs = self.getRequires(m);","                        Y.mix(r, yArray.hash(reqs));","                    }","                }","            }","        }","","    },","    /**","    * The default method used to test a module against a pattern","    * @method _patternTest","    * @private","    * @param {String} mname The module being tested","    * @param {String} pname The pattern to match","    */","    _patternTest: function(mname, pname) {","        return (mname.indexOf(pname) > -1);","    },","    /**","    * Get's the loader meta data for the requested module","    * @method getModule","    * @param {String} mname The module name to get","    * @return {Object} The module metadata","    */","    getModule: function(mname) {","        //TODO: Remove name check - it's a quick hack to fix pattern WIP","        if (!mname) {","            return null;","        }","","        var p, found, pname,","            m = this.moduleInfo[mname],","            patterns = this.patterns;","","        // check the patterns library to see if we should automatically add","        // the module with defaults","        if (!m || (m && m.ext)) {","            for (pname in patterns) {","                if (patterns.hasOwnProperty(pname)) {","                    p = patterns[pname];","","                    //There is no test method, create a default one that tests","                    // the pattern against the mod name","                    if (!p.test) {","                        p.test = this._patternTest;","                    }","","                    if (p.test(mname, pname)) {","                        // use the metadata supplied for the pattern","                        // as the module definition.","                        found = p;","                        break;","                    }","                }","            }","        }","","        if (!m) {","            if (found) {","                if (p.action) {","                    p.action.call(this, mname, pname);","                } else {","                    // ext true or false?","                    m = this.addModule(Y.merge(found), mname);","                    if (found.configFn) {","                        m.configFn = found.configFn;","                    }","                    m.temp = true;","                }","            }","        } else {","            if (found && m && found.configFn && !m.configFn) {","                m.configFn = found.configFn;","                m.configFn(m);","            }","        }","","        return m;","    },","","    // impl in rollup submodule","    _rollup: function() { },","","    /**","     * Remove superceded modules and loaded modules.  Called by","     * calculate() after we have the mega list of all dependencies","     * @method _reduce","     * @return {object} the reduced dependency hash.","     * @private","     */","    _reduce: function(r) {","","        r = r || this.required;","","        var i, j, s, m, type = this.loadType,","        ignore = this.ignore ? yArray.hash(this.ignore) : false;","","        for (i in r) {","            if (r.hasOwnProperty(i)) {","                m = this.getModule(i);","                // remove if already loaded","                if (((this.loaded[i] || ON_PAGE[i]) &&","                        !this.forceMap[i] && !this.ignoreRegistered) ||","                        (type && m && m.type !== type)) {","                    delete r[i];","                }","                if (ignore && ignore[i]) {","                    delete r[i];","                }","                // remove anything this module supersedes","                s = m && m.supersedes;","                if (s) {","                    for (j = 0; j < s.length; j++) {","                        if (s[j] in r) {","                            delete r[s[j]];","                        }","                    }","                }","            }","        }","","        return r;","    },","    /**","    * Handles the queue when a module has been loaded for all cases","    * @method _finish","    * @private","    * @param {String} msg The message from Loader","    * @param {Boolean} success A boolean denoting success or failure","    */","    _finish: function(msg, success) {","","        _queue.running = false;","","        var onEnd = this.onEnd;","        if (onEnd) {","            onEnd.call(this.context, {","                msg: msg,","                data: this.data,","                success: success","            });","        }","        this._continue();","    },","    /**","    * The default Loader onSuccess handler, calls this.onSuccess with a payload","    * @method _onSuccess","    * @private","    */","    _onSuccess: function() {","        var self = this, skipped = Y.merge(self.skipped), fn,","            failed = [], rreg = self.requireRegistration,","            success, msg, i, mod;","","        for (i in skipped) {","            if (skipped.hasOwnProperty(i)) {","                delete self.inserted[i];","            }","        }","","        self.skipped = {};","","        for (i in self.inserted) {","            if (self.inserted.hasOwnProperty(i)) {","                mod = self.getModule(i);","                if (mod && rreg && mod.type === JS && !(i in YUI.Env.mods)) {","                    failed.push(i);","                } else {","                    Y.mix(self.loaded, self.getProvides(i));","                }","            }","        }","","        fn = self.onSuccess;","        msg = (failed.length) ? 'notregistered' : 'success';","        success = !(failed.length);","        if (fn) {","            fn.call(self.context, {","                msg: msg,","                data: self.data,","                success: success,","                failed: failed,","                skipped: skipped","            });","        }","        self._finish(msg, success);","    },","    /**","    * The default Loader onProgress handler, calls this.onProgress with a payload","    * @method _onProgress","    * @private","    */","    _onProgress: function(e) {","        var self = this, i;","        //set the internal cache to what just came in.","        if (e.data && e.data.length) {","            for (i = 0; i < e.data.length; i++) {","                e.data[i] = self.getModule(e.data[i].name);","            }","        }","        if (self.onProgress) {","            self.onProgress.call(self.context, {","                name: e.url,","                data: e.data","            });","        }","    },","    /**","    * The default Loader onFailure handler, calls this.onFailure with a payload","    * @method _onFailure","    * @private","    */","    _onFailure: function(o) {","        var f = this.onFailure, msg = [], i = 0, len = o.errors.length;","","        for (i; i < len; i++) {","            msg.push(o.errors[i].error);","        }","","        msg = msg.join(',');","","","        if (f) {","            f.call(this.context, {","                msg: msg,","                data: this.data,","                success: false","            });","        }","","        this._finish(msg, false);","","    },","","    /**","    * The default Loader onTimeout handler, calls this.onTimeout with a payload","    * @method _onTimeout","    * @param {Get.Transaction} transaction The Transaction object from `Y.Get`","    * @private","    */","    _onTimeout: function(transaction) {","        var f = this.onTimeout;","        if (f) {","            f.call(this.context, {","                msg: 'timeout',","                data: this.data,","                success: false,","                transaction: transaction","            });","        }","    },","","    /**","     * Sorts the dependency tree.  The last step of calculate()","     * @method _sort","     * @private","     */","    _sort: function() {","","        // create an indexed list","        var s = YObject.keys(this.required),","            // loaded = this.loaded,","            //TODO Move this out of scope","            done = {},","            p = 0, l, a, b, j, k, moved, doneKey;","","        // keep going until we make a pass without moving anything","        for (;;) {","","            l = s.length;","            moved = false;","","            // start the loop after items that are already sorted","            for (j = p; j < l; j++) {","","                // check the next module on the list to see if its","                // dependencies have been met","                a = s[j];","","                // check everything below current item and move if we","                // find a requirement for the current item","                for (k = j + 1; k < l; k++) {","                    doneKey = a + s[k];","","                    if (!done[doneKey] && this._requires(a, s[k])) {","","                        // extract the dependency so we can move it up","                        b = s.splice(k, 1);","","                        // insert the dependency above the item that","                        // requires it","                        s.splice(j, 0, b[0]);","","                        // only swap two dependencies once to short circut","                        // circular dependencies","                        done[doneKey] = true;","","                        // keep working","                        moved = true;","","                        break;","                    }","                }","","                // jump out of loop if we moved something","                if (moved) {","                    break;","                // this item is sorted, move our pointer and keep going","                } else {","                    p++;","                }","            }","","            // when we make it here and moved is false, we are","            // finished sorting","            if (!moved) {","                break;","            }","","        }","","        this.sorted = s;","    },","","    /**","    * Handles the actual insertion of script/link tags","    * @method _insert","    * @private","    * @param {Object} source The YUI instance the request came from","    * @param {Object} o The metadata to include","    * @param {String} type JS or CSS","    * @param {Boolean} [skipcalc=false] Do a Loader.calculate on the meta","    */","    _insert: function(source, o, type, skipcalc) {","","","        // restore the state at the time of the request","        if (source) {","            this._config(source);","        }","","        // build the dependency list","        // don't include type so we can process CSS and script in","        // one pass when the type is not specified.","","        var modules = this.resolve(!skipcalc),","            self = this, comp = 0, actions = 0,","            mods = {}, deps, complete;","","        self._refetch = [];","","        if (type) {","            //Filter out the opposite type and reset the array so the checks later work","            modules[((type === JS) ? CSS : JS)] = [];","        }","        if (!self.fetchCSS) {","            modules.css = [];","        }","        if (modules.js.length) {","            comp++;","        }","        if (modules.css.length) {","            comp++;","        }","","        //console.log('Resolved Modules: ', modules);","","        complete = function(d) {","            actions++;","            var errs = {}, i = 0, o = 0, u = '', fn,","                modName, resMods;","","            if (d && d.errors) {","                for (i = 0; i < d.errors.length; i++) {","                    if (d.errors[i].request) {","                        u = d.errors[i].request.url;","                    } else {","                        u = d.errors[i];","                    }","                    errs[u] = u;","                }","            }","","            if (d && d.data && d.data.length && (d.type === 'success')) {","                for (i = 0; i < d.data.length; i++) {","                    self.inserted[d.data[i].name] = true;","                    //If the external module has a skin or a lang, reprocess it","                    if (d.data[i].lang || d.data[i].skinnable) {","                        delete self.inserted[d.data[i].name];","                        self._refetch.push(d.data[i].name);","                    }","                }","            }","","            if (actions === comp) {","                self._loading = null;","                if (self._refetch.length) {","                    //Get the deps for the new meta-data and reprocess","                    for (i = 0; i < self._refetch.length; i++) {","                        deps = self.getRequires(self.getModule(self._refetch[i]));","                        for (o = 0; o < deps.length; o++) {","                            if (!self.inserted[deps[o]]) {","                                //We wouldn't be to this point without the module being here","                                mods[deps[o]] = deps[o];","                            }","                        }","                    }","                    mods = Y.Object.keys(mods);","                    if (mods.length) {","                        self.require(mods);","                        resMods = self.resolve(true);","                        if (resMods.cssMods.length) {","                            for (i=0; i <  resMods.cssMods.length; i++) {","                                modName = resMods.cssMods[i].name;","                                delete YUI.Env._cssLoaded[modName];","                                if (self.isCSSLoaded(modName)) {","                                    self.inserted[modName] = true;","                                    delete self.required[modName];","                                }","                            }","                            self.sorted = [];","                            self._sort();","                        }","                        d = null; //bail","                        self._insert(); //insert the new deps","                    }","                }","                if (d && d.fn) {","                    fn = d.fn;","                    delete d.fn;","                    fn.call(self, d);","                }","            }","        };","","        this._loading = true;","","        if (!modules.js.length && !modules.css.length) {","            actions = -1;","            complete({","                fn: self._onSuccess","            });","            return;","        }","","","        if (modules.css.length) { //Load CSS first","            Y.Get.css(modules.css, {","                data: modules.cssMods,","                attributes: self.cssAttributes,","                insertBefore: self.insertBefore,","                charset: self.charset,","                timeout: self.timeout,","                context: self,","                onProgress: function(e) {","                    self._onProgress.call(self, e);","                },","                onTimeout: function(d) {","                    self._onTimeout.call(self, d);","                },","                onSuccess: function(d) {","                    d.type = 'success';","                    d.fn = self._onSuccess;","                    complete.call(self, d);","                },","                onFailure: function(d) {","                    d.type = 'failure';","                    d.fn = self._onFailure;","                    complete.call(self, d);","                }","            });","        }","","        if (modules.js.length) {","            Y.Get.js(modules.js, {","                data: modules.jsMods,","                insertBefore: self.insertBefore,","                attributes: self.jsAttributes,","                charset: self.charset,","                timeout: self.timeout,","                autopurge: false,","                context: self,","                async: self.async,","                onProgress: function(e) {","                    self._onProgress.call(self, e);","                },","                onTimeout: function(d) {","                    self._onTimeout.call(self, d);","                },","                onSuccess: function(d) {","                    d.type = 'success';","                    d.fn = self._onSuccess;","                    complete.call(self, d);","                },","                onFailure: function(d) {","                    d.type = 'failure';","                    d.fn = self._onFailure;","                    complete.call(self, d);","                }","            });","        }","    },","    /**","    * Once a loader operation is completely finished, process any additional queued items.","    * @method _continue","    * @private","    */","    _continue: function() {","        if (!(_queue.running) && _queue.size() > 0) {","            _queue.running = true;","            _queue.next()();","        }","    },","","    /**","     * inserts the requested modules and their dependencies.","     * <code>type</code> can be \"js\" or \"css\".  Both script and","     * css are inserted if type is not provided.","     * @method insert","     * @param {object} o optional options object.","     * @param {string} type the type of dependency to insert.","     */","    insert: function(o, type, skipsort) {","        var self = this, copy = Y.merge(this);","        delete copy.require;","        delete copy.dirty;","        _queue.add(function() {","            self._insert(copy, o, type, skipsort);","        });","        this._continue();","    },","","    /**","     * Executed every time a module is loaded, and if we are in a load","     * cycle, we attempt to load the next script.  Public so that it","     * is possible to call this if using a method other than","     * Y.register to determine when scripts are fully loaded","     * @method loadNext","     * @deprecated","     * @param {string} mname optional the name of the module that has","     * been loaded (which is usually why it is time to load the next","     * one).","     */","    loadNext: function() {","        return;","    },","","    /**","     * Apply filter defined for this instance to a url/path","     * @method _filter","     * @param {string} u the string to filter.","     * @param {string} name the name of the module, if we are processing","     * a single module as opposed to a combined url.","     * @return {string} the filtered string.","     * @private","     */","    _filter: function(u, name, group) {","        var f = this.filter,","            hasFilter = name && (name in this.filters),","            modFilter = hasFilter && this.filters[name],","            groupName = group || (this.moduleInfo[name] ? this.moduleInfo[name].group : null);","","        if (groupName && this.groups[groupName] && this.groups[groupName].filter) {","            modFilter = this.groups[groupName].filter;","            hasFilter = true;","        }","","        if (u) {","            if (hasFilter) {","                f = (L.isString(modFilter)) ? this.FILTER_DEFS[modFilter.toUpperCase()] || null : modFilter;","            }","            if (f) {","                u = u.replace(new RegExp(f.searchExp, 'g'), f.replaceStr);","            }","        }","        return u;","    },","","    /**","     * Generates the full url for a module","     * @method _url","     * @param {string} path the path fragment.","     * @param {String} name The name of the module","     * @param {String} [base=self.base] The base url to use","     * @return {string} the full url.","     * @private","     */","    _url: function(path, name, base) {","        return this._filter((base || this.base || '') + path, name);","    },","    /**","    * Returns an Object hash of file arrays built from `loader.sorted` or from an arbitrary list of sorted modules.","    * @method resolve","    * @param {Boolean} [calc=false] Perform a loader.calculate() before anything else","    * @param {Array} [s=loader.sorted] An override for the loader.sorted array","    * @return {Object} Object hash (js and css) of two arrays of file lists","    * @example This method can be used as an off-line dep calculator","    *","    *        var Y = YUI();","    *        var loader = new Y.Loader({","    *            filter: 'debug',","    *            base: '../../',","    *            root: 'build/',","    *            combine: true,","    *            require: ['node', 'dd', 'console']","    *        });","    *        var out = loader.resolve(true);","    *","    */","    resolve: function(calc, s) {","","        var len, i, m, url, group, groupName, j, frag,","            comboSource, comboSources, mods, comboBase,","            base, urls, u = [], tmpBase, baseLen, resCombos = {},","            self = this, comboSep, maxURLLength,","            inserted = (self.ignoreRegistered) ? {} : self.inserted,","            resolved = { js: [], jsMods: [], css: [], cssMods: [] },","            type = self.loadType || 'js', addSingle;","","        if (self.skin.overrides || self.skin.defaultSkin !== DEFAULT_SKIN || self.ignoreRegistered) {","            self._resetModules();","        }","","        if (calc) {","            self.calculate();","        }","        s = s || self.sorted;","","        addSingle = function(m) {","","            if (m) {","                group = (m.group && self.groups[m.group]) || NOT_FOUND;","","                //Always assume it's async","                if (group.async === false) {","                    m.async = group.async;","                }","","                url = (m.fullpath) ? self._filter(m.fullpath, s[i]) :","                      self._url(m.path, s[i], group.base || m.base);","","                if (m.attributes || m.async === false) {","                    url = {","                        url: url,","                        async: m.async","                    };","                    if (m.attributes) {","                        url.attributes = m.attributes;","                    }","                }","                resolved[m.type].push(url);","                resolved[m.type + 'Mods'].push(m);","            } else {","            }","","        };","","        len = s.length;","","        // the default combo base","        comboBase = self.comboBase;","","        url = comboBase;","","        comboSources = {};","","        for (i = 0; i < len; i++) {","            comboSource = comboBase;","            m = self.getModule(s[i]);","            groupName = m && m.group;","            group = self.groups[groupName];","            if (groupName && group) {","","                if (!group.combine || m.fullpath) {","                    //This is not a combo module, skip it and load it singly later.","                    addSingle(m);","                    continue;","                }","                m.combine = true;","                if (group.comboBase) {","                    comboSource = group.comboBase;","                }","","                if (\"root\" in group && L.isValue(group.root)) {","                    m.root = group.root;","                }","                m.comboSep = group.comboSep || self.comboSep;","                m.maxURLLength = group.maxURLLength || self.maxURLLength;","            } else {","                if (!self.combine) {","                    //This is not a combo module, skip it and load it singly later.","                    addSingle(m);","                    continue;","                }","            }","","            comboSources[comboSource] = comboSources[comboSource] || [];","            comboSources[comboSource].push(m);","        }","","        for (j in comboSources) {","            if (comboSources.hasOwnProperty(j)) {","                resCombos[j] = resCombos[j] || { js: [], jsMods: [], css: [], cssMods: [] };","                url = j;","                mods = comboSources[j];","                len = mods.length;","","                if (len) {","                    for (i = 0; i < len; i++) {","                        if (inserted[mods[i]]) {","                            continue;","                        }","                        m = mods[i];","                        // Do not try to combine non-yui JS unless combo def","                        // is found","                        if (m && (m.combine || !m.ext)) {","                            resCombos[j].comboSep = m.comboSep;","                            resCombos[j].group = m.group;","                            resCombos[j].maxURLLength = m.maxURLLength;","                            frag = ((L.isValue(m.root)) ? m.root : self.root) + (m.path || m.fullpath);","                            frag = self._filter(frag, m.name);","                            resCombos[j][m.type].push(frag);","                            resCombos[j][m.type + 'Mods'].push(m);","                        } else {","                            //Add them to the next process..","                            if (mods[i]) {","                                addSingle(mods[i]);","                            }","                        }","","                    }","                }","            }","        }","","","        for (j in resCombos) {","            if (resCombos.hasOwnProperty(j)) {","                base = j;","                comboSep = resCombos[base].comboSep || self.comboSep;","                maxURLLength = resCombos[base].maxURLLength || self.maxURLLength;","                for (type in resCombos[base]) {","                    if (type === JS || type === CSS) {","                        urls = resCombos[base][type];","                        mods = resCombos[base][type + 'Mods'];","                        len = urls.length;","                        tmpBase = base + urls.join(comboSep);","                        baseLen = tmpBase.length;","                        if (maxURLLength <= base.length) {","                            maxURLLength = MAX_URL_LENGTH;","                        }","","                        if (len) {","                            if (baseLen > maxURLLength) {","                                u = [];","                                for (s = 0; s < len; s++) {","                                    u.push(urls[s]);","                                    tmpBase = base + u.join(comboSep);","","                                    if (tmpBase.length > maxURLLength) {","                                        m = u.pop();","                                        tmpBase = base + u.join(comboSep);","                                        resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));","                                        u = [];","                                        if (m) {","                                            u.push(m);","                                        }","                                    }","                                }","                                if (u.length) {","                                    tmpBase = base + u.join(comboSep);","                                    resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));","                                }","                            } else {","                                resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));","                            }","                        }","                        resolved[type + 'Mods'] = resolved[type + 'Mods'].concat(mods);","                    }","                }","            }","        }","","        resCombos = null;","","        return resolved;","    },","    /**","    Shortcut to calculate, resolve and load all modules.","","        var loader = new Y.Loader({","            ignoreRegistered: true,","            modules: {","                mod: {","                    path: 'mod.js'","                }","            },","            requires: [ 'mod' ]","        });","        loader.load(function() {","            console.log('All modules have loaded..');","        });","","","    @method load","    @param {Callback} cb Executed after all load operations are complete","    */","    load: function(cb) {","        if (!cb) {","            return;","        }","        var self = this,","            out = self.resolve(true);","","        self.data = out;","","        self.onEnd = function() {","            cb.apply(self.context || self, arguments);","        };","","        self.insert();","    }","};","","","","}, '@VERSION@', {\"requires\": [\"get\", \"features\"]});"];
_yuitest_coverage["build/loader-base/loader-base.js"].lines = {"1":0,"9":0,"11":0,"12":0,"39":0,"45":0,"46":0,"47":0,"50":0,"54":0,"55":0,"56":0,"60":0,"62":0,"72":0,"80":0,"81":0,"82":0,"85":0,"93":0,"94":0,"96":0,"116":0,"137":0,"138":0,"139":0,"141":0,"143":0,"147":0,"148":0,"158":0,"206":0,"208":0,"211":0,"213":0,"267":0,"310":0,"318":0,"333":0,"342":0,"354":0,"361":0,"370":0,"379":0,"397":0,"405":0,"440":0,"447":0,"460":0,"467":0,"469":0,"499":0,"505":0,"510":0,"511":0,"513":0,"523":0,"531":0,"533":0,"535":0,"537":0,"539":0,"541":0,"543":0,"544":0,"569":0,"585":0,"592":0,"599":0,"603":0,"612":0,"614":0,"619":0,"627":0,"632":0,"633":0,"634":0,"635":0,"639":0,"640":0,"641":0,"642":0,"647":0,"648":0,"649":0,"662":0,"664":0,"665":0,"666":0,"667":0,"668":0,"670":0,"671":0,"672":0,"673":0,"674":0,"677":0,"678":0,"679":0,"680":0,"681":0,"686":0,"687":0,"688":0,"689":0,"733":0,"736":0,"737":0,"738":0,"739":0,"740":0,"741":0,"746":0,"747":0,"748":0,"749":0,"750":0,"751":0,"752":0,"754":0,"755":0,"757":0,"760":0,"762":0,"776":0,"781":0,"782":0,"785":0,"786":0,"790":0,"791":0,"794":0,"797":0,"798":0,"802":0,"803":0,"804":0,"805":0,"806":0,"811":0,"812":0,"813":0,"814":0,"815":0,"822":0,"823":0,"827":0,"828":0,"831":0,"840":0,"843":0,"844":0,"845":0,"846":0,"848":0,"849":0,"850":0,"852":0,"853":0,"854":0,"859":0,"860":0,"861":0,"862":0,"863":0,"864":0,"865":0,"866":0,"867":0,"868":0,"869":0,"876":0,"878":0,"879":0,"880":0,"883":0,"884":0,"885":0,"886":0,"889":0,"890":0,"891":0,"893":0,"894":0,"895":0,"898":0,"905":0,"907":0,"908":0,"909":0,"910":0,"911":0,"912":0,"916":0,"917":0,"918":0,"919":0,"920":0,"921":0,"923":0,"926":0,"927":0,"928":0,"930":0,"931":0,"947":0,"948":0,"949":0,"952":0,"966":0,"972":0,"973":0,"974":0,"975":0,"976":0,"977":0,"987":0,"988":0,"990":0,"991":0,"993":0,"998":0,"1014":0,"1015":0,"1044":0,"1047":0,"1048":0,"1049":0,"1051":0,"1052":0,"1053":0,"1054":0,"1055":0,"1060":0,"1061":0,"1062":0,"1063":0,"1064":0,"1065":0,"1067":0,"1068":0,"1105":0,"1107":0,"1108":0,"1112":0,"1121":0,"1127":0,"1130":0,"1132":0,"1133":0,"1136":0,"1138":0,"1139":0,"1140":0,"1141":0,"1145":0,"1146":0,"1148":0,"1150":0,"1153":0,"1155":0,"1157":0,"1164":0,"1165":0,"1166":0,"1169":0,"1170":0,"1171":0,"1172":0,"1173":0,"1179":0,"1180":0,"1187":0,"1188":0,"1189":0,"1192":0,"1193":0,"1196":0,"1197":0,"1198":0,"1199":0,"1200":0,"1201":0,"1202":0,"1203":0,"1209":0,"1210":0,"1211":0,"1213":0,"1214":0,"1215":0,"1217":0,"1218":0,"1219":0,"1221":0,"1222":0,"1225":0,"1226":0,"1228":0,"1229":0,"1230":0,"1231":0,"1232":0,"1233":0,"1235":0,"1238":0,"1240":0,"1246":0,"1248":0,"1249":0,"1250":0,"1251":0,"1252":0,"1253":0,"1255":0,"1256":0,"1259":0,"1261":0,"1262":0,"1265":0,"1267":0,"1269":0,"1270":0,"1276":0,"1277":0,"1279":0,"1281":0,"1282":0,"1285":0,"1286":0,"1294":0,"1298":0,"1299":0,"1300":0,"1304":0,"1305":0,"1306":0,"1307":0,"1308":0,"1309":0,"1310":0,"1311":0,"1312":0,"1313":0,"1314":0,"1315":0,"1322":0,"1323":0,"1324":0,"1325":0,"1327":0,"1328":0,"1331":0,"1332":0,"1333":0,"1334":0,"1335":0,"1338":0,"1339":0,"1340":0,"1341":0,"1348":0,"1349":0,"1354":0,"1355":0,"1358":0,"1359":0,"1360":0,"1365":0,"1366":0,"1367":0,"1368":0,"1369":0,"1370":0,"1374":0,"1375":0,"1376":0,"1378":0,"1379":0,"1382":0,"1391":0,"1392":0,"1393":0,"1395":0,"1407":0,"1410":0,"1411":0,"1412":0,"1413":0,"1414":0,"1415":0,"1416":0,"1417":0,"1418":0,"1419":0,"1420":0,"1421":0,"1424":0,"1430":0,"1441":0,"1442":0,"1443":0,"1445":0,"1446":0,"1448":0,"1449":0,"1450":0,"1451":0,"1453":0,"1454":0,"1455":0,"1457":0,"1461":0,"1464":0,"1466":0,"1477":0,"1479":0,"1482":0,"1484":0,"1489":0,"1503":0,"1504":0,"1505":0,"1506":0,"1507":0,"1508":0,"1514":0,"1516":0,"1517":0,"1521":0,"1522":0,"1523":0,"1524":0,"1526":0,"1527":0,"1528":0,"1530":0,"1533":0,"1534":0,"1535":0,"1537":0,"1538":0,"1539":0,"1540":0,"1541":0,"1542":0,"1543":0,"1544":0,"1546":0,"1547":0,"1554":0,"1555":0,"1556":0,"1557":0,"1562":0,"1563":0,"1566":0,"1567":0,"1569":0,"1570":0,"1571":0,"1573":0,"1574":0,"1581":0,"1582":0,"1583":0,"1584":0,"1585":0,"1586":0,"1587":0,"1588":0,"1589":0,"1591":0,"1592":0,"1599":0,"1601":0,"1603":0,"1604":0,"1605":0,"1606":0,"1607":0,"1608":0,"1609":0,"1610":0,"1615":0,"1616":0,"1617":0,"1618":0,"1622":0,"1625":0,"1626":0,"1627":0,"1628":0,"1629":0,"1630":0,"1631":0,"1632":0,"1644":0,"1645":0,"1646":0,"1647":0,"1648":0,"1649":0,"1653":0,"1654":0,"1655":0,"1656":0,"1658":0,"1659":0,"1660":0,"1661":0,"1665":0,"1666":0,"1667":0,"1672":0,"1674":0,"1676":0,"1677":0,"1678":0,"1679":0,"1680":0,"1683":0,"1686":0,"1688":0,"1690":0,"1700":0,"1701":0,"1703":0,"1709":0,"1710":0,"1714":0,"1716":0,"1717":0,"1720":0,"1721":0,"1725":0,"1727":0,"1729":0,"1739":0,"1742":0,"1743":0,"1746":0,"1747":0,"1748":0,"1750":0,"1751":0,"1752":0,"1756":0,"1757":0,"1761":0,"1772":0,"1774":0,"1775":0,"1778":0,"1779":0,"1782":0,"1784":0,"1785":0,"1787":0,"1789":0,"1790":0,"1803":0,"1807":0,"1809":0,"1811":0,"1819":0,"1820":0,"1822":0,"1823":0,"1826":0,"1827":0,"1830":0,"1832":0,"1833":0,"1834":0,"1835":0,"1839":0,"1850":0,"1853":0,"1854":0,"1855":0,"1856":0,"1860":0,"1864":0,"1867":0,"1868":0,"1877":0,"1880":0,"1881":0,"1885":0,"1886":0,"1890":0,"1891":0,"1892":0,"1897":0,"1898":0,"1899":0,"1900":0,"1905":0,"1907":0,"1918":0,"1929":0,"1933":0,"1935":0,"1936":0,"1938":0,"1939":0,"1940":0,"1941":0,"1942":0,"1943":0,"1944":0,"1946":0,"1947":0,"1948":0,"1949":0,"1952":0,"1953":0,"1968":0,"1978":0,"1979":0,"1982":0,"1988":0,"1989":0,"1990":0,"1991":0,"1995":0,"1996":0,"1999":0,"2002":0,"2003":0,"2009":0,"2010":0,"2011":0,"2012":0,"2015":0,"2016":0,"2017":0,"2019":0,"2023":0,"2024":0,"2025":0,"2029":0,"2044":0,"2046":0,"2049":0,"2050":0,"2051":0,"2053":0,"2056":0,"2058":0,"2059":0,"2062":0,"2063":0,"2064":0,"2065":0,"2066":0,"2073":0,"2084":0,"2086":0,"2087":0,"2088":0,"2094":0,"2102":0,"2106":0,"2107":0,"2108":0,"2112":0,"2114":0,"2115":0,"2116":0,"2117":0,"2118":0,"2120":0,"2125":0,"2126":0,"2127":0,"2128":0,"2129":0,"2137":0,"2145":0,"2147":0,"2148":0,"2149":0,"2152":0,"2153":0,"2165":0,"2167":0,"2168":0,"2171":0,"2174":0,"2175":0,"2182":0,"2193":0,"2194":0,"2195":0,"2212":0,"2219":0,"2221":0,"2222":0,"2225":0,"2229":0,"2233":0,"2234":0,"2236":0,"2239":0,"2243":0,"2247":0,"2250":0,"2252":0,"2257":0,"2258":0,"2261":0,"2267":0,"2268":0,"2273":0,"2289":0,"2290":0,"2297":0,"2301":0,"2303":0,"2305":0,"2307":0,"2308":0,"2310":0,"2311":0,"2313":0,"2314":0,"2319":0,"2320":0,"2321":0,"2324":0,"2325":0,"2326":0,"2327":0,"2329":0,"2331":0,"2335":0,"2336":0,"2337":0,"2339":0,"2340":0,"2341":0,"2346":0,"2347":0,"2348":0,"2350":0,"2351":0,"2352":0,"2353":0,"2355":0,"2359":0,"2360":0,"2361":0,"2362":0,"2363":0,"2364":0,"2365":0,"2366":0,"2367":0,"2368":0,"2369":0,"2372":0,"2373":0,"2375":0,"2376":0,"2379":0,"2380":0,"2381":0,"2382":0,"2387":0,"2389":0,"2390":0,"2391":0,"2394":0,"2398":0,"2399":0,"2407":0,"2410":0,"2413":0,"2414":0,"2415":0,"2418":0,"2419":0,"2420":0,"2425":0,"2426":0,"2436":0,"2439":0,"2442":0,"2443":0,"2444":0,"2447":0,"2448":0,"2449":0,"2460":0,"2461":0,"2462":0,"2475":0,"2476":0,"2477":0,"2478":0,"2479":0,"2481":0,"2496":0,"2509":0,"2514":0,"2515":0,"2516":0,"2519":0,"2520":0,"2521":0,"2523":0,"2524":0,"2527":0,"2540":0,"2563":0,"2571":0,"2572":0,"2575":0,"2576":0,"2578":0,"2580":0,"2582":0,"2583":0,"2586":0,"2587":0,"2590":0,"2593":0,"2594":0,"2598":0,"2599":0,"2602":0,"2603":0,"2609":0,"2612":0,"2614":0,"2616":0,"2618":0,"2619":0,"2620":0,"2621":0,"2622":0,"2623":0,"2625":0,"2627":0,"2628":0,"2630":0,"2631":0,"2632":0,"2635":0,"2636":0,"2638":0,"2639":0,"2641":0,"2643":0,"2644":0,"2648":0,"2649":0,"2652":0,"2653":0,"2654":0,"2655":0,"2656":0,"2657":0,"2659":0,"2660":0,"2661":0,"2662":0,"2664":0,"2667":0,"2668":0,"2669":0,"2670":0,"2671":0,"2672":0,"2673":0,"2674":0,"2677":0,"2678":0,"2688":0,"2689":0,"2690":0,"2691":0,"2692":0,"2693":0,"2694":0,"2695":0,"2696":0,"2697":0,"2698":0,"2699":0,"2700":0,"2701":0,"2704":0,"2705":0,"2706":0,"2707":0,"2708":0,"2709":0,"2711":0,"2712":0,"2713":0,"2714":0,"2715":0,"2716":0,"2717":0,"2721":0,"2722":0,"2723":0,"2726":0,"2729":0,"2735":0,"2737":0,"2760":0,"2761":0,"2763":0,"2766":0,"2768":0,"2769":0,"2772":0};
_yuitest_coverage["build/loader-base/loader-base.js"].functions = {"yui2Update:37":0,"galleryUpdate:49":0,"configFn:79":0,"(anonymous 2):11":0,"_path:136":0,"Loader:206":0,"_populateCache:626":0,"_resetModules:661":0,"_inspectPage:732":0,"_requires:774":0,"(anonymous 3):927":0,"_config:839":0,"formatSkin:946":0,"_addSkin:965":0,"addAlias:1013":0,"addGroup:1043":0,"addModule:1104":0,"require:1390":0,"_explodeRollups:1406":0,"filterRequires:1440":0,"(anonymous 4):1605":0,"getRequires:1475":0,"isCSSLoaded:1698":0,"(anonymous 5):1751":0,"getProvides:1738":0,"calculate:1771":0,"_addLangPack:1802":0,"_setup:1849":0,"getLangPackName:1917":0,"_explode:1927":0,"_patternTest:1967":0,"getModule:1976":0,"_reduce:2042":0,"_finish:2082":0,"_onSuccess:2101":0,"_onProgress:2144":0,"_onFailure:2164":0,"_onTimeout:2192":0,"_sort:2209":0,"complete:2319":0,"onProgress:2406":0,"onTimeout:2409":0,"onSuccess:2412":0,"onFailure:2417":0,"onProgress:2435":0,"onTimeout:2438":0,"onSuccess:2441":0,"onFailure:2446":0,"_insert:2285":0,"_continue:2459":0,"(anonymous 6):2478":0,"insert:2474":0,"loadNext:2495":0,"_filter:2508":0,"_url:2539":0,"addSingle:2580":0,"resolve:2561":0,"onEnd:2768":0,"load:2759":0,"(anonymous 1):1":0};
_yuitest_coverage["build/loader-base/loader-base.js"].coveredLines = 921;
_yuitest_coverage["build/loader-base/loader-base.js"].coveredFunctions = 60;
_yuitest_coverline("build/loader-base/loader-base.js", 1);
YUI.add('loader-base', function (Y, NAME) {

/**
 * The YUI loader core
 * @module loader
 * @submodule loader-base
 */

_yuitest_coverfunc("build/loader-base/loader-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/loader-base/loader-base.js", 9);
if (!YUI.Env[Y.version]) {

    _yuitest_coverline("build/loader-base/loader-base.js", 11);
(function() {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "(anonymous 2)", 11);
_yuitest_coverline("build/loader-base/loader-base.js", 12);
var VERSION = Y.version,
            BUILD = '/build/',
            ROOT = VERSION + BUILD,
            CDN_BASE = Y.Env.base,
            GALLERY_VERSION = 'gallery-2013.02.27-21-03',
            TNT = '2in3',
            TNT_VERSION = '4',
            YUI2_VERSION = '2.9.0',
            COMBO_BASE = CDN_BASE + 'combo?',
            META = { version: VERSION,
                              root: ROOT,
                              base: Y.Env.base,
                              comboBase: COMBO_BASE,
                              skin: { defaultSkin: 'sam',
                                           base: 'assets/skins/',
                                           path: 'skin.css',
                                           after: ['cssreset',
                                                          'cssfonts',
                                                          'cssgrids',
                                                          'cssbase',
                                                          'cssreset-context',
                                                          'cssfonts-context']},
                              groups: {},
                              patterns: {} },
            groups = META.groups,
            yui2Update = function(tnt, yui2, config) {

                _yuitest_coverfunc("build/loader-base/loader-base.js", "yui2Update", 37);
_yuitest_coverline("build/loader-base/loader-base.js", 39);
var root = TNT + '.' +
                        (tnt || TNT_VERSION) + '/' +
                        (yui2 || YUI2_VERSION) + BUILD,
                    base = (config && config.base) ? config.base : CDN_BASE,
                    combo = (config && config.comboBase) ? config.comboBase : COMBO_BASE;

                _yuitest_coverline("build/loader-base/loader-base.js", 45);
groups.yui2.base = base + root;
                _yuitest_coverline("build/loader-base/loader-base.js", 46);
groups.yui2.root = root;
                _yuitest_coverline("build/loader-base/loader-base.js", 47);
groups.yui2.comboBase = combo;
            },
            galleryUpdate = function(tag, config) {
                _yuitest_coverfunc("build/loader-base/loader-base.js", "galleryUpdate", 49);
_yuitest_coverline("build/loader-base/loader-base.js", 50);
var root = (tag || GALLERY_VERSION) + BUILD,
                    base = (config && config.base) ? config.base : CDN_BASE,
                    combo = (config && config.comboBase) ? config.comboBase : COMBO_BASE;

                _yuitest_coverline("build/loader-base/loader-base.js", 54);
groups.gallery.base = base + root;
                _yuitest_coverline("build/loader-base/loader-base.js", 55);
groups.gallery.root = root;
                _yuitest_coverline("build/loader-base/loader-base.js", 56);
groups.gallery.comboBase = combo;
            };


        _yuitest_coverline("build/loader-base/loader-base.js", 60);
groups[VERSION] = {};

        _yuitest_coverline("build/loader-base/loader-base.js", 62);
groups.gallery = {
            ext: false,
            combine: true,
            comboBase: COMBO_BASE,
            update: galleryUpdate,
            patterns: { 'gallery-': { },
                        'lang/gallery-': {},
                        'gallerycss-': { type: 'css' } }
        };

        _yuitest_coverline("build/loader-base/loader-base.js", 72);
groups.yui2 = {
            combine: true,
            ext: false,
            comboBase: COMBO_BASE,
            update: yui2Update,
            patterns: {
                'yui2-': {
                    configFn: function(me) {
                        _yuitest_coverfunc("build/loader-base/loader-base.js", "configFn", 79);
_yuitest_coverline("build/loader-base/loader-base.js", 80);
if (/-skin|reset|fonts|grids|base/.test(me.name)) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 81);
me.type = 'css';
                            _yuitest_coverline("build/loader-base/loader-base.js", 82);
me.path = me.path.replace(/\.js/, '.css');
                            // this makes skins in builds earlier than
                            // 2.6.0 work as long as combine is false
                            _yuitest_coverline("build/loader-base/loader-base.js", 85);
me.path = me.path.replace(/\/yui2-skin/,
                                             '/assets/skins/sam/yui2-skin');
                        }
                    }
                }
            }
        };

        _yuitest_coverline("build/loader-base/loader-base.js", 93);
galleryUpdate();
        _yuitest_coverline("build/loader-base/loader-base.js", 94);
yui2Update();

        _yuitest_coverline("build/loader-base/loader-base.js", 96);
YUI.Env[VERSION] = META;
    }());
}


/*jslint forin: true, maxlen: 350 */

/**
 * Loader dynamically loads script and css files.  It includes the dependency
 * information for the version of the library in use, and will automatically pull in
 * dependencies for the modules requested. It can also load the
 * files from the Yahoo! CDN, and it can utilize the combo service provided on
 * this network to reduce the number of http connections required to download
 * YUI files.
 *
 * @module loader
 * @main loader
 * @submodule loader-base
 */

_yuitest_coverline("build/loader-base/loader-base.js", 116);
var NOT_FOUND = {},
    NO_REQUIREMENTS = [],
    MAX_URL_LENGTH = 1024,
    GLOBAL_ENV = YUI.Env,
    GLOBAL_LOADED = GLOBAL_ENV._loaded,
    CSS = 'css',
    JS = 'js',
    INTL = 'intl',
    DEFAULT_SKIN = 'sam',
    VERSION = Y.version,
    ROOT_LANG = '',
    YObject = Y.Object,
    oeach = YObject.each,
    yArray = Y.Array,
    _queue = GLOBAL_ENV._loaderQueue,
    META = GLOBAL_ENV[VERSION],
    SKIN_PREFIX = 'skin-',
    L = Y.Lang,
    ON_PAGE = GLOBAL_ENV.mods,
    modulekey,
    _path = function(dir, file, type, nomin) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_path", 136);
_yuitest_coverline("build/loader-base/loader-base.js", 137);
var path = dir + '/' + file;
        _yuitest_coverline("build/loader-base/loader-base.js", 138);
if (!nomin) {
            _yuitest_coverline("build/loader-base/loader-base.js", 139);
path += '-min';
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 141);
path += '.' + (type || CSS);

        _yuitest_coverline("build/loader-base/loader-base.js", 143);
return path;
    };


    _yuitest_coverline("build/loader-base/loader-base.js", 147);
if (!YUI.Env._cssLoaded) {
        _yuitest_coverline("build/loader-base/loader-base.js", 148);
YUI.Env._cssLoaded = {};
    }


/**
 * The component metadata is stored in Y.Env.meta.
 * Part of the loader module.
 * @property meta
 * @for YUI
 */
_yuitest_coverline("build/loader-base/loader-base.js", 158);
Y.Env.meta = META;

/**
 * Loader dynamically loads script and css files.  It includes the dependency
 * info for the version of the library in use, and will automatically pull in
 * dependencies for the modules requested. It can load the
 * files from the Yahoo! CDN, and it can utilize the combo service provided on
 * this network to reduce the number of http connections required to download
 * YUI files. You can also specify an external, custom combo service to host
 * your modules as well.

        var Y = YUI();
        var loader = new Y.Loader({
            filter: 'debug',
            base: '../../',
            root: 'build/',
            combine: true,
            require: ['node', 'dd', 'console']
        });
        var out = loader.resolve(true);

 * @constructor
 * @class Loader
 * @param {Object} config an optional set of configuration options.
 * @param {String} config.base The base dir which to fetch this module from
 * @param {String} config.comboBase The Combo service base path. Ex: `http://yui.yahooapis.com/combo?`
 * @param {String} config.root The root path to prepend to module names for the combo service. Ex: `2.5.2/build/`
 * @param {String|Object} config.filter A filter to apply to result urls. <a href="#property_filter">See filter property</a>
 * @param {Object} config.filters Per-component filter specification.  If specified for a given component, this overrides the filter config.
 * @param {Boolean} config.combine Use a combo service to reduce the number of http connections required to load your dependencies
 * @param {Boolean} [config.async=true] Fetch files in async
 * @param {Array} config.ignore: A list of modules that should never be dynamically loaded
 * @param {Array} config.force A list of modules that should always be loaded when required, even if already present on the page
 * @param {HTMLElement|String} config.insertBefore Node or id for a node that should be used as the insertion point for new nodes
 * @param {Object} config.jsAttributes Object literal containing attributes to add to script nodes
 * @param {Object} config.cssAttributes Object literal containing attributes to add to link nodes
 * @param {Number} config.timeout The number of milliseconds before a timeout occurs when dynamically loading nodes.  If not set, there is no timeout
 * @param {Object} config.context Execution context for all callbacks
 * @param {Function} config.onSuccess Callback for the 'success' event
 * @param {Function} config.onFailure Callback for the 'failure' event
 * @param {Function} config.onCSS Callback for the 'CSSComplete' event.  When loading YUI components with CSS the CSS is loaded first, then the script.  This provides a moment you can tie into to improve the presentation of the page while the script is loading.
 * @param {Function} config.onTimeout Callback for the 'timeout' event
 * @param {Function} config.onProgress Callback executed each time a script or css file is loaded
 * @param {Object} config.modules A list of module definitions.  See <a href="#method_addModule">Loader.addModule</a> for the supported module metadata
 * @param {Object} config.groups A list of group definitions.  Each group can contain specific definitions for `base`, `comboBase`, `combine`, and accepts a list of `modules`.
 * @param {String} config.2in3 The version of the YUI 2 in 3 wrapper to use.  The intrinsic support for YUI 2 modules in YUI 3 relies on versions of the YUI 2 components inside YUI 3 module wrappers.  These wrappers change over time to accomodate the issues that arise from running YUI 2 in a YUI 3 sandbox.
 * @param {String} config.yui2 When using the 2in3 project, you can select the version of YUI 2 to use.  Valid values are `2.2.2`, `2.3.1`, `2.4.1`, `2.5.2`, `2.6.0`, `2.7.0`, `2.8.0`, `2.8.1` and `2.9.0` [default] -- plus all versions of YUI 2 going forward.
 */
_yuitest_coverline("build/loader-base/loader-base.js", 206);
Y.Loader = function(o) {

    _yuitest_coverfunc("build/loader-base/loader-base.js", "Loader", 206);
_yuitest_coverline("build/loader-base/loader-base.js", 208);
var self = this;

    //Catch no config passed.
    _yuitest_coverline("build/loader-base/loader-base.js", 211);
o = o || {};

    _yuitest_coverline("build/loader-base/loader-base.js", 213);
modulekey = META.md5;

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
     * Callback for the 'CSSComplete' event.  When loading YUI components
     * with CSS the CSS is loaded first, then the script.  This provides
     * a moment you can tie into to improve the presentation of the page
     * while the script is loading.
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
    _yuitest_coverline("build/loader-base/loader-base.js", 267);
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
     * @deprecated , use cssAttributes or jsAttributes.
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
    _yuitest_coverline("build/loader-base/loader-base.js", 310);
self.base = Y.Env.meta.base + Y.Env.meta.root;

    /**
     * Base path for the combo service
     * @property comboBase
     * @type string
     * @default http://yui.yahooapis.com/combo?
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 318);
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
    _yuitest_coverline("build/loader-base/loader-base.js", 333);
self.combine = o.base &&
        (o.base.indexOf(self.comboBase.substr(0, 20)) > -1);

    /**
    * The default seperator to use between files in a combo URL
    * @property comboSep
    * @type {String}
    * @default Ampersand
    */
    _yuitest_coverline("build/loader-base/loader-base.js", 342);
self.comboSep = '&';
    /**
     * Max url length for combo urls.  The default is 1024. This is the URL
     * limit for the Yahoo! hosted combo servers.  If consuming
     * a different combo service that has a different URL limit
     * it is possible to override this default by supplying
     * the maxURLLength config option.  The config option will
     * only take effect if lower than the default.
     *
     * @property maxURLLength
     * @type int
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 354);
self.maxURLLength = MAX_URL_LENGTH;

    /**
     * Ignore modules registered on the YUI global
     * @property ignoreRegistered
     * @default false
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 361);
self.ignoreRegistered = o.ignoreRegistered;

    /**
     * Root path to prepend to module path for the combo
     * service
     * @property root
     * @type string
     * @default [YUI VERSION]/build/
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 370);
self.root = Y.Env.meta.root;

    /**
     * Timeout value in milliseconds.  If set, self value will be used by
     * the get utility.  the timeout event will fire if
     * a timeout occurs.
     * @property timeout
     * @type int
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 379);
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

    _yuitest_coverline("build/loader-base/loader-base.js", 397);
self.forceMap = {};

    /**
     * Should we allow rollups
     * @property allowRollup
     * @type boolean
     * @default false
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 405);
self.allowRollup = false;

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
     *  <dd>Selects the non-minified version of the library (e.g., event.js).
     *  </dd>
     * </dl>
     * You can also define a custom filter, which must be an object literal
     * containing a search expression and a replace string:
     *
     *      myFilter: {
     *          'searchExp': "-min\\.js",
     *          'replaceStr': "-debug.js"
     *      }
     *
     * @property filter
     * @type string| {searchExp: string, replaceStr: string}
     */
    // self.filter = null;

    /**
     * per-component filter specification.  If specified for a given
     * component, this overrides the filter config.
     * @property filters
     * @type object
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 440);
self.filters = {};

    /**
     * The list of requested modules
     * @property required
     * @type {string: boolean}
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 447);
self.required = {};

    /**
     * If a module name is predefined when requested, it is checked againsts
     * the patterns provided in this property.  If there is a match, the
     * module is added with the default configuration.
     *
     * At the moment only supporting module prefixes, but anticipate
     * supporting at least regular expressions.
     * @property patterns
     * @type Object
     */
    // self.patterns = Y.merge(Y.Env.meta.patterns);
    _yuitest_coverline("build/loader-base/loader-base.js", 460);
self.patterns = {};

    /**
     * The library metadata
     * @property moduleInfo
     */
    // self.moduleInfo = Y.merge(Y.Env.meta.moduleInfo);
    _yuitest_coverline("build/loader-base/loader-base.js", 467);
self.moduleInfo = {};

    _yuitest_coverline("build/loader-base/loader-base.js", 469);
self.groups = Y.merge(Y.Env.meta.groups);

    /**
     * Provides the information used to skin the skinnable components.
     * The following skin definition would result in 'skin1' and 'skin2'
     * being loaded for calendar (if calendar was requested), and
     * 'sam' for all other skinnable components:
     *
     *      skin: {
     *          // The default skin, which is automatically applied if not
     *          // overriden by a component-specific skin definition.
     *          // Change this in to apply a different skin globally
     *          defaultSkin: 'sam',
     *
     *          // This is combined with the loader base property to get
     *          // the default root directory for a skin. ex:
     *          // http://yui.yahooapis.com/2.3.0/build/assets/skins/sam/
     *          base: 'assets/skins/',
     *
     *          // Any component-specific overrides can be specified here,
     *          // making it possible to load different skins for different
     *          // components.  It is possible to load more than one skin
     *          // for a given component as well.
     *          overrides: {
     *              calendar: ['skin1', 'skin2']
     *          }
     *      }
     * @property skin
     * @type {Object}
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 499);
self.skin = Y.merge(Y.Env.meta.skin);

    /*
     * Map of conditional modules
     * @since 3.2.0
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 505);
self.conditions = {};

    // map of modules with a hash of modules that meet the requirement
    // self.provides = {};

    _yuitest_coverline("build/loader-base/loader-base.js", 510);
self.config = o;
    _yuitest_coverline("build/loader-base/loader-base.js", 511);
self._internal = true;

    _yuitest_coverline("build/loader-base/loader-base.js", 513);
self._populateCache();

    /**
     * Set when beginning to compute the dependency tree.
     * Composed of what YUI reports to be loaded combined
     * with what has been loaded by any instance on the page
     * with the version number specified in the metadata.
     * @property loaded
     * @type {string: boolean}
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 523);
self.loaded = GLOBAL_LOADED[VERSION];


    /**
    * Should Loader fetch scripts in `async`, defaults to `true`
    * @property async
    */

    _yuitest_coverline("build/loader-base/loader-base.js", 531);
self.async = true;

    _yuitest_coverline("build/loader-base/loader-base.js", 533);
self._inspectPage();

    _yuitest_coverline("build/loader-base/loader-base.js", 535);
self._internal = false;

    _yuitest_coverline("build/loader-base/loader-base.js", 537);
self._config(o);

    _yuitest_coverline("build/loader-base/loader-base.js", 539);
self.forceMap = (self.force) ? Y.Array.hash(self.force) : {};

    _yuitest_coverline("build/loader-base/loader-base.js", 541);
self.testresults = null;

    _yuitest_coverline("build/loader-base/loader-base.js", 543);
if (Y.config.tests) {
        _yuitest_coverline("build/loader-base/loader-base.js", 544);
self.testresults = Y.config.tests;
    }

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
    _yuitest_coverline("build/loader-base/loader-base.js", 569);
self.sorted = [];

    /*
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
    _yuitest_coverline("build/loader-base/loader-base.js", 585);
self.dirty = true;

    /**
     * List of modules inserted by the utility
     * @property inserted
     * @type {string: boolean}
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 592);
self.inserted = {};

    /**
     * List of skipped modules during insert() because the module
     * was not defined
     * @property skipped
     */
    _yuitest_coverline("build/loader-base/loader-base.js", 599);
self.skipped = {};

    // Y.on('yui:load', self.loadNext, self);

    _yuitest_coverline("build/loader-base/loader-base.js", 603);
self.tested = {};

    /*
     * Cached sorted calculate results
     * @property results
     * @since 3.2.0
     */
    //self.results = {};

    _yuitest_coverline("build/loader-base/loader-base.js", 612);
if (self.ignoreRegistered) {
        //Clear inpage already processed modules.
        _yuitest_coverline("build/loader-base/loader-base.js", 614);
self._resetModules();
    }

};

_yuitest_coverline("build/loader-base/loader-base.js", 619);
Y.Loader.prototype = {
    /**
    * Checks the cache for modules and conditions, if they do not exist
    * process the default metadata and populate the local moduleInfo hash.
    * @method _populateCache
    * @private
    */
    _populateCache: function() {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_populateCache", 626);
_yuitest_coverline("build/loader-base/loader-base.js", 627);
var self = this,
            defaults = META.modules,
            cache = GLOBAL_ENV._renderedMods,
            i;

        _yuitest_coverline("build/loader-base/loader-base.js", 632);
if (cache && !self.ignoreRegistered) {
            _yuitest_coverline("build/loader-base/loader-base.js", 633);
for (i in cache) {
                _yuitest_coverline("build/loader-base/loader-base.js", 634);
if (cache.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 635);
self.moduleInfo[i] = Y.merge(cache[i]);
                }
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 639);
cache = GLOBAL_ENV._conditions;
            _yuitest_coverline("build/loader-base/loader-base.js", 640);
for (i in cache) {
                _yuitest_coverline("build/loader-base/loader-base.js", 641);
if (cache.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 642);
self.conditions[i] = Y.merge(cache[i]);
                }
            }

        } else {
            _yuitest_coverline("build/loader-base/loader-base.js", 647);
for (i in defaults) {
                _yuitest_coverline("build/loader-base/loader-base.js", 648);
if (defaults.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 649);
self.addModule(defaults[i], i);
                }
            }
        }

    },
    /**
    * Reset modules in the module cache to a pre-processed state so additional
    * computations with a different skin or language will work as expected.
    * @method _resetModules
    * @private
    */
    _resetModules: function() {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_resetModules", 661);
_yuitest_coverline("build/loader-base/loader-base.js", 662);
var self = this, i, o,
            mod, name, details;
        _yuitest_coverline("build/loader-base/loader-base.js", 664);
for (i in self.moduleInfo) {
            _yuitest_coverline("build/loader-base/loader-base.js", 665);
if (self.moduleInfo.hasOwnProperty(i)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 666);
mod = self.moduleInfo[i];
                _yuitest_coverline("build/loader-base/loader-base.js", 667);
name = mod.name;
                _yuitest_coverline("build/loader-base/loader-base.js", 668);
details  = (YUI.Env.mods[name] ? YUI.Env.mods[name].details : null);

                _yuitest_coverline("build/loader-base/loader-base.js", 670);
if (details) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 671);
self.moduleInfo[name]._reset = true;
                    _yuitest_coverline("build/loader-base/loader-base.js", 672);
self.moduleInfo[name].requires = details.requires || [];
                    _yuitest_coverline("build/loader-base/loader-base.js", 673);
self.moduleInfo[name].optional = details.optional || [];
                    _yuitest_coverline("build/loader-base/loader-base.js", 674);
self.moduleInfo[name].supersedes = details.supercedes || [];
                }

                _yuitest_coverline("build/loader-base/loader-base.js", 677);
if (mod.defaults) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 678);
for (o in mod.defaults) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 679);
if (mod.defaults.hasOwnProperty(o)) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 680);
if (mod[o]) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 681);
mod[o] = mod.defaults[o];
                            }
                        }
                    }
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 686);
delete mod.langCache;
                _yuitest_coverline("build/loader-base/loader-base.js", 687);
delete mod.skinCache;
                _yuitest_coverline("build/loader-base/loader-base.js", 688);
if (mod.skinnable) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 689);
self._addSkin(self.skin.defaultSkin, mod.name);
                }
            }
        }
    },
    /**
    Regex that matches a CSS URL. Used to guess the file type when it's not
    specified.

    @property REGEX_CSS
    @type RegExp
    @final
    @protected
    @since 3.5.0
    **/
    REGEX_CSS: /\.css(?:[?;].*)?$/i,

    /**
    * Default filters for raw and debug
    * @property FILTER_DEFS
    * @type Object
    * @final
    * @protected
    */
    FILTER_DEFS: {
        RAW: {
            'searchExp': '-min\\.js',
            'replaceStr': '.js'
        },
        DEBUG: {
            'searchExp': '-min\\.js',
            'replaceStr': '-debug.js'
        },
        COVERAGE: {
            'searchExp': '-min\\.js',
            'replaceStr': '-coverage.js'
        }
    },
    /*
    * Check the pages meta-data and cache the result.
    * @method _inspectPage
    * @private
    */
    _inspectPage: function() {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_inspectPage", 732);
_yuitest_coverline("build/loader-base/loader-base.js", 733);
var self = this, v, m, req, mr, i;

        //Inspect the page for CSS only modules and mark them as loaded.
        _yuitest_coverline("build/loader-base/loader-base.js", 736);
for (i in self.moduleInfo) {
            _yuitest_coverline("build/loader-base/loader-base.js", 737);
if (self.moduleInfo.hasOwnProperty(i)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 738);
v = self.moduleInfo[i];
                _yuitest_coverline("build/loader-base/loader-base.js", 739);
if (v.type && v.type === CSS) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 740);
if (self.isCSSLoaded(v.name)) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 741);
self.loaded[i] = true;
                    }
                }
            }
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 746);
for (i in ON_PAGE) {
            _yuitest_coverline("build/loader-base/loader-base.js", 747);
if (ON_PAGE.hasOwnProperty(i)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 748);
v = ON_PAGE[i];
                _yuitest_coverline("build/loader-base/loader-base.js", 749);
if (v.details) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 750);
m = self.moduleInfo[v.name];
                    _yuitest_coverline("build/loader-base/loader-base.js", 751);
req = v.details.requires;
                    _yuitest_coverline("build/loader-base/loader-base.js", 752);
mr = m && m.requires;

                   _yuitest_coverline("build/loader-base/loader-base.js", 754);
if (m) {
                       _yuitest_coverline("build/loader-base/loader-base.js", 755);
if (!m._inspected && req && mr.length !== req.length) {
                           // console.log('deleting ' + m.name);
                           _yuitest_coverline("build/loader-base/loader-base.js", 757);
delete m.expanded;
                       }
                   } else {
                       _yuitest_coverline("build/loader-base/loader-base.js", 760);
m = self.addModule(v.details, i);
                   }
                   _yuitest_coverline("build/loader-base/loader-base.js", 762);
m._inspected = true;
               }
            }
        }
    },
    /*
    * returns true if b is not loaded, and is required directly or by means of modules it supersedes.
    * @private
    * @method _requires
    * @param {String} mod1 The first module to compare
    * @param {String} mod2 The second module to compare
    */
   _requires: function(mod1, mod2) {

        _yuitest_coverfunc("build/loader-base/loader-base.js", "_requires", 774);
_yuitest_coverline("build/loader-base/loader-base.js", 776);
var i, rm, after_map, s,
            info = this.moduleInfo,
            m = info[mod1],
            other = info[mod2];

        _yuitest_coverline("build/loader-base/loader-base.js", 781);
if (!m || !other) {
            _yuitest_coverline("build/loader-base/loader-base.js", 782);
return false;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 785);
rm = m.expanded_map;
        _yuitest_coverline("build/loader-base/loader-base.js", 786);
after_map = m.after_map;

        // check if this module should be sorted after the other
        // do this first to short circut circular deps
        _yuitest_coverline("build/loader-base/loader-base.js", 790);
if (after_map && (mod2 in after_map)) {
            _yuitest_coverline("build/loader-base/loader-base.js", 791);
return true;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 794);
after_map = other.after_map;

        // and vis-versa
        _yuitest_coverline("build/loader-base/loader-base.js", 797);
if (after_map && (mod1 in after_map)) {
            _yuitest_coverline("build/loader-base/loader-base.js", 798);
return false;
        }

        // check if this module requires one the other supersedes
        _yuitest_coverline("build/loader-base/loader-base.js", 802);
s = info[mod2] && info[mod2].supersedes;
        _yuitest_coverline("build/loader-base/loader-base.js", 803);
if (s) {
            _yuitest_coverline("build/loader-base/loader-base.js", 804);
for (i = 0; i < s.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 805);
if (this._requires(mod1, s[i])) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 806);
return true;
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 811);
s = info[mod1] && info[mod1].supersedes;
        _yuitest_coverline("build/loader-base/loader-base.js", 812);
if (s) {
            _yuitest_coverline("build/loader-base/loader-base.js", 813);
for (i = 0; i < s.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 814);
if (this._requires(mod2, s[i])) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 815);
return false;
                }
            }
        }

        // check if this module requires the other directly
        // if (r && yArray.indexOf(r, mod2) > -1) {
        _yuitest_coverline("build/loader-base/loader-base.js", 822);
if (rm && (mod2 in rm)) {
            _yuitest_coverline("build/loader-base/loader-base.js", 823);
return true;
        }

        // external css files should be sorted below yui css
        _yuitest_coverline("build/loader-base/loader-base.js", 827);
if (m.ext && m.type === CSS && !other.ext && other.type === CSS) {
            _yuitest_coverline("build/loader-base/loader-base.js", 828);
return true;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 831);
return false;
    },
    /**
    * Apply a new config to the Loader instance
    * @method _config
    * @private
    * @param {Object} o The new configuration
    */
    _config: function(o) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_config", 839);
_yuitest_coverline("build/loader-base/loader-base.js", 840);
var i, j, val, a, f, group, groupName, self = this,
            mods = [], mod;
        // apply config values
        _yuitest_coverline("build/loader-base/loader-base.js", 843);
if (o) {
            _yuitest_coverline("build/loader-base/loader-base.js", 844);
for (i in o) {
                _yuitest_coverline("build/loader-base/loader-base.js", 845);
if (o.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 846);
val = o[i];
                    //TODO This should be a case
                    _yuitest_coverline("build/loader-base/loader-base.js", 848);
if (i === 'require') {
                        _yuitest_coverline("build/loader-base/loader-base.js", 849);
self.require(val);
                    } else {_yuitest_coverline("build/loader-base/loader-base.js", 850);
if (i === 'skin') {
                        //If the config.skin is a string, format to the expected object
                        _yuitest_coverline("build/loader-base/loader-base.js", 852);
if (typeof val === 'string') {
                            _yuitest_coverline("build/loader-base/loader-base.js", 853);
self.skin.defaultSkin = o.skin;
                            _yuitest_coverline("build/loader-base/loader-base.js", 854);
val = {
                                defaultSkin: val
                            };
                        }

                        _yuitest_coverline("build/loader-base/loader-base.js", 859);
Y.mix(self.skin, val, true);
                    } else {_yuitest_coverline("build/loader-base/loader-base.js", 860);
if (i === 'groups') {
                        _yuitest_coverline("build/loader-base/loader-base.js", 861);
for (j in val) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 862);
if (val.hasOwnProperty(j)) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 863);
groupName = j;
                                _yuitest_coverline("build/loader-base/loader-base.js", 864);
group = val[j];
                                _yuitest_coverline("build/loader-base/loader-base.js", 865);
self.addGroup(group, groupName);
                                _yuitest_coverline("build/loader-base/loader-base.js", 866);
if (group.aliases) {
                                    _yuitest_coverline("build/loader-base/loader-base.js", 867);
for (a in group.aliases) {
                                        _yuitest_coverline("build/loader-base/loader-base.js", 868);
if (group.aliases.hasOwnProperty(a)) {
                                            _yuitest_coverline("build/loader-base/loader-base.js", 869);
self.addAlias(group.aliases[a], a);
                                        }
                                    }
                                }
                            }
                        }

                    } else {_yuitest_coverline("build/loader-base/loader-base.js", 876);
if (i === 'modules') {
                        // add a hash of module definitions
                        _yuitest_coverline("build/loader-base/loader-base.js", 878);
for (j in val) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 879);
if (val.hasOwnProperty(j)) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 880);
self.addModule(val[j], j);
                            }
                        }
                    } else {_yuitest_coverline("build/loader-base/loader-base.js", 883);
if (i === 'aliases') {
                        _yuitest_coverline("build/loader-base/loader-base.js", 884);
for (j in val) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 885);
if (val.hasOwnProperty(j)) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 886);
self.addAlias(val[j], j);
                            }
                        }
                    } else {_yuitest_coverline("build/loader-base/loader-base.js", 889);
if (i === 'gallery') {
                        _yuitest_coverline("build/loader-base/loader-base.js", 890);
if (this.groups.gallery.update) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 891);
this.groups.gallery.update(val, o);
                        }
                    } else {_yuitest_coverline("build/loader-base/loader-base.js", 893);
if (i === 'yui2' || i === '2in3') {
                        _yuitest_coverline("build/loader-base/loader-base.js", 894);
if (this.groups.yui2.update) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 895);
this.groups.yui2.update(o['2in3'], o.yui2, o);
                        }
                    } else {
                        _yuitest_coverline("build/loader-base/loader-base.js", 898);
self[i] = val;
                    }}}}}}}
                }
            }
        }

        // fix filter
        _yuitest_coverline("build/loader-base/loader-base.js", 905);
f = self.filter;

        _yuitest_coverline("build/loader-base/loader-base.js", 907);
if (L.isString(f)) {
            _yuitest_coverline("build/loader-base/loader-base.js", 908);
f = f.toUpperCase();
            _yuitest_coverline("build/loader-base/loader-base.js", 909);
self.filterName = f;
            _yuitest_coverline("build/loader-base/loader-base.js", 910);
self.filter = self.FILTER_DEFS[f];
            _yuitest_coverline("build/loader-base/loader-base.js", 911);
if (f === 'DEBUG') {
                _yuitest_coverline("build/loader-base/loader-base.js", 912);
self.require('yui-log', 'dump');
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 916);
if (self.filterName && self.coverage) {
            _yuitest_coverline("build/loader-base/loader-base.js", 917);
if (self.filterName === 'COVERAGE' && L.isArray(self.coverage) && self.coverage.length) {
                _yuitest_coverline("build/loader-base/loader-base.js", 918);
for (i = 0; i < self.coverage.length; i++) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 919);
mod = self.coverage[i];
                    _yuitest_coverline("build/loader-base/loader-base.js", 920);
if (self.moduleInfo[mod] && self.moduleInfo[mod].use) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 921);
mods = [].concat(mods, self.moduleInfo[mod].use);
                    } else {
                        _yuitest_coverline("build/loader-base/loader-base.js", 923);
mods.push(mod);
                    }
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 926);
self.filters = self.filters || {};
                _yuitest_coverline("build/loader-base/loader-base.js", 927);
Y.Array.each(mods, function(mod) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "(anonymous 3)", 927);
_yuitest_coverline("build/loader-base/loader-base.js", 928);
self.filters[mod] = self.FILTER_DEFS.COVERAGE;
                });
                _yuitest_coverline("build/loader-base/loader-base.js", 930);
self.filterName = 'RAW';
                _yuitest_coverline("build/loader-base/loader-base.js", 931);
self.filter = self.FILTER_DEFS[self.filterName];
            }
        }

    },

    /**
     * Returns the skin module name for the specified skin name.  If a
     * module name is supplied, the returned skin module name is
     * specific to the module passed in.
     * @method formatSkin
     * @param {string} skin the name of the skin.
     * @param {string} mod optional: the name of a module to skin.
     * @return {string} the full skin module name.
     */
    formatSkin: function(skin, mod) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "formatSkin", 946);
_yuitest_coverline("build/loader-base/loader-base.js", 947);
var s = SKIN_PREFIX + skin;
        _yuitest_coverline("build/loader-base/loader-base.js", 948);
if (mod) {
            _yuitest_coverline("build/loader-base/loader-base.js", 949);
s = s + '-' + mod;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 952);
return s;
    },

    /**
     * Adds the skin def to the module info
     * @method _addSkin
     * @param {string} skin the name of the skin.
     * @param {string} mod the name of the module.
     * @param {string} parent parent module if this is a skin of a
     * submodule or plugin.
     * @return {string} the module name for the skin.
     * @private
     */
    _addSkin: function(skin, mod, parent) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_addSkin", 965);
_yuitest_coverline("build/loader-base/loader-base.js", 966);
var mdef, pkg, name, nmod,
            info = this.moduleInfo,
            sinf = this.skin,
            ext = info[mod] && info[mod].ext;

        // Add a module definition for the module-specific skin css
        _yuitest_coverline("build/loader-base/loader-base.js", 972);
if (mod) {
            _yuitest_coverline("build/loader-base/loader-base.js", 973);
name = this.formatSkin(skin, mod);
            _yuitest_coverline("build/loader-base/loader-base.js", 974);
if (!info[name]) {
                _yuitest_coverline("build/loader-base/loader-base.js", 975);
mdef = info[mod];
                _yuitest_coverline("build/loader-base/loader-base.js", 976);
pkg = mdef.pkg || mod;
                _yuitest_coverline("build/loader-base/loader-base.js", 977);
nmod = {
                    skin: true,
                    name: name,
                    group: mdef.group,
                    type: 'css',
                    after: sinf.after,
                    path: (parent || pkg) + '/' + sinf.base + skin +
                          '/' + mod + '.css',
                    ext: ext
                };
                _yuitest_coverline("build/loader-base/loader-base.js", 987);
if (mdef.base) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 988);
nmod.base = mdef.base;
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 990);
if (mdef.configFn) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 991);
nmod.configFn = mdef.configFn;
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 993);
this.addModule(nmod, name);

            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 998);
return name;
    },
    /**
    * Adds an alias module to the system
    * @method addAlias
    * @param {Array} use An array of modules that makes up this alias
    * @param {String} name The name of the alias
    * @example
    *       var loader = new Y.Loader({});
    *       loader.addAlias([ 'node', 'yql' ], 'davglass');
    *       loader.require(['davglass']);
    *       var out = loader.resolve(true);
    *
    *       //out.js will contain Node and YQL modules
    */
    addAlias: function(use, name) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "addAlias", 1013);
_yuitest_coverline("build/loader-base/loader-base.js", 1014);
YUI.Env.aliases[name] = use;
        _yuitest_coverline("build/loader-base/loader-base.js", 1015);
this.addModule({
            name: name,
            use: use
        });
    },
    /**
     * Add a new module group
     * @method addGroup
     * @param {Object} config An object containing the group configuration data
     * @param {String} config.name required, the group name
     * @param {String} config.base The base directory for this module group
     * @param {String} config.root The root path to add to each combo resource path
     * @param {Boolean} config.combine Should the request be combined
     * @param {String} config.comboBase Combo service base path
     * @param {Object} config.modules The group of modules
     * @param {String} name the group name.
     * @example
     *      var loader = new Y.Loader({});
     *      loader.addGroup({
     *          name: 'davglass',
     *          combine: true,
     *          comboBase: '/combo?',
     *          root: '',
     *          modules: {
     *              //Module List here
     *          }
     *      }, 'davglass');
     */
    addGroup: function(o, name) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "addGroup", 1043);
_yuitest_coverline("build/loader-base/loader-base.js", 1044);
var mods = o.modules,
            self = this, i, v;

        _yuitest_coverline("build/loader-base/loader-base.js", 1047);
name = name || o.name;
        _yuitest_coverline("build/loader-base/loader-base.js", 1048);
o.name = name;
        _yuitest_coverline("build/loader-base/loader-base.js", 1049);
self.groups[name] = o;

        _yuitest_coverline("build/loader-base/loader-base.js", 1051);
if (o.patterns) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1052);
for (i in o.patterns) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1053);
if (o.patterns.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1054);
o.patterns[i].group = name;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1055);
self.patterns[i] = o.patterns[i];
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1060);
if (mods) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1061);
for (i in mods) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1062);
if (mods.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1063);
v = mods[i];
                    _yuitest_coverline("build/loader-base/loader-base.js", 1064);
if (typeof v === 'string') {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1065);
v = { name: i, fullpath: v };
                    }
                    _yuitest_coverline("build/loader-base/loader-base.js", 1067);
v.group = name;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1068);
self.addModule(v, i);
                }
            }
        }
    },

    /**
     * Add a new module to the component metadata.
     * @method addModule
     * @param {Object} config An object containing the module data.
     * @param {String} config.name Required, the component name
     * @param {String} config.type Required, the component type (js or css)
     * @param {String} config.path Required, the path to the script from `base`
     * @param {Array} config.requires Array of modules required by this component
     * @param {Array} [config.optional] Array of optional modules for this component
     * @param {Array} [config.supersedes] Array of the modules this component replaces
     * @param {Array} [config.after] Array of modules the components which, if present, should be sorted above this one
     * @param {Object} [config.after_map] Faster alternative to 'after' -- supply a hash instead of an array
     * @param {Number} [config.rollup] The number of superseded modules required for automatic rollup
     * @param {String} [config.fullpath] If `fullpath` is specified, this is used instead of the configured `base + path`
     * @param {Boolean} [config.skinnable] Flag to determine if skin assets should automatically be pulled in
     * @param {Object} [config.submodules] Hash of submodules
     * @param {String} [config.group] The group the module belongs to -- this is set automatically when it is added as part of a group configuration.
     * @param {Array} [config.lang] Array of BCP 47 language tags of languages for which this module has localized resource bundles, e.g., `["en-GB", "zh-Hans-CN"]`
     * @param {Object} [config.condition] Specifies that the module should be loaded automatically if a condition is met.  This is an object with up to three fields:
     * @param {String} [config.condition.trigger] The name of a module that can trigger the auto-load
     * @param {Function} [config.condition.test] A function that returns true when the module is to be loaded.
     * @param {String} [config.condition.when] Specifies the load order of the conditional module
     *  with regard to the position of the trigger module.
     *  This should be one of three values: `before`, `after`, or `instead`.  The default is `after`.
     * @param {Object} [config.testresults] A hash of test results from `Y.Features.all()`
     * @param {Function} [config.configFn] A function to exectute when configuring this module
     * @param {Object} config.configFn.mod The module config, modifying this object will modify it's config. Returning false will delete the module's config.
     * @param {String} [name] The module name, required if not in the module data.
     * @return {Object} the module definition or null if the object passed in did not provide all required attributes.
     */
    addModule: function(o, name) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "addModule", 1104);
_yuitest_coverline("build/loader-base/loader-base.js", 1105);
name = name || o.name;

        _yuitest_coverline("build/loader-base/loader-base.js", 1107);
if (typeof o === 'string') {
            _yuitest_coverline("build/loader-base/loader-base.js", 1108);
o = { name: name, fullpath: o };
        }


        _yuitest_coverline("build/loader-base/loader-base.js", 1112);
var subs, i, l, t, sup, s, smod, plugins, plug,
            j, langs, packName, supName, flatSup, flatLang, lang, ret,
            overrides, skinname, when, g, p,
            conditions = this.conditions, trigger;

        //Only merge this data if the temp flag is set
        //from an earlier pass from a pattern or else
        //an override module (YUI_config) can not be used to
        //replace a default module.
        _yuitest_coverline("build/loader-base/loader-base.js", 1121);
if (this.moduleInfo[name] && this.moduleInfo[name].temp) {
            //This catches temp modules loaded via a pattern
            // The module will be added twice, once from the pattern and
            // Once from the actual add call, this ensures that properties
            // that were added to the module the first time around (group: gallery)
            // are also added the second time around too.
            _yuitest_coverline("build/loader-base/loader-base.js", 1127);
o = Y.merge(this.moduleInfo[name], o);
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1130);
o.name = name;

        _yuitest_coverline("build/loader-base/loader-base.js", 1132);
if (!o || !o.name) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1133);
return null;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1136);
if (!o.type) {
            //Always assume it's javascript unless the CSS pattern is matched.
            _yuitest_coverline("build/loader-base/loader-base.js", 1138);
o.type = JS;
            _yuitest_coverline("build/loader-base/loader-base.js", 1139);
p = o.path || o.fullpath;
            _yuitest_coverline("build/loader-base/loader-base.js", 1140);
if (p && this.REGEX_CSS.test(p)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1141);
o.type = CSS;
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1145);
if (!o.path && !o.fullpath) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1146);
o.path = _path(name, name, o.type);
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 1148);
o.supersedes = o.supersedes || o.use;

        _yuitest_coverline("build/loader-base/loader-base.js", 1150);
o.ext = ('ext' in o) ? o.ext : (this._internal) ? false : true;

        // Handle submodule logic
        _yuitest_coverline("build/loader-base/loader-base.js", 1153);
subs = o.submodules;

        _yuitest_coverline("build/loader-base/loader-base.js", 1155);
this.moduleInfo[name] = o;

        _yuitest_coverline("build/loader-base/loader-base.js", 1157);
o.requires = o.requires || [];

        /*
        Only allowing the cascade of requires information, since
        optional and supersedes are far more fine grained than
        a blanket requires is.
        */
        _yuitest_coverline("build/loader-base/loader-base.js", 1164);
if (this.requires) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1165);
for (i = 0; i < this.requires.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1166);
o.requires.push(this.requires[i]);
            }
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 1169);
if (o.group && this.groups && this.groups[o.group]) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1170);
g = this.groups[o.group];
            _yuitest_coverline("build/loader-base/loader-base.js", 1171);
if (g.requires) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1172);
for (i = 0; i < g.requires.length; i++) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1173);
o.requires.push(g.requires[i]);
                }
            }
        }


        _yuitest_coverline("build/loader-base/loader-base.js", 1179);
if (!o.defaults) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1180);
o.defaults = {
                requires: o.requires ? [].concat(o.requires) : null,
                supersedes: o.supersedes ? [].concat(o.supersedes) : null,
                optional: o.optional ? [].concat(o.optional) : null
            };
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1187);
if (o.skinnable && o.ext && o.temp) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1188);
skinname = this._addSkin(this.skin.defaultSkin, name);
            _yuitest_coverline("build/loader-base/loader-base.js", 1189);
o.requires.unshift(skinname);
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1192);
if (o.requires.length) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1193);
o.requires = this.filterRequires(o.requires) || [];
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1196);
if (!o.langPack && o.lang) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1197);
langs = yArray(o.lang);
            _yuitest_coverline("build/loader-base/loader-base.js", 1198);
for (j = 0; j < langs.length; j++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1199);
lang = langs[j];
                _yuitest_coverline("build/loader-base/loader-base.js", 1200);
packName = this.getLangPackName(lang, name);
                _yuitest_coverline("build/loader-base/loader-base.js", 1201);
smod = this.moduleInfo[packName];
                _yuitest_coverline("build/loader-base/loader-base.js", 1202);
if (!smod) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1203);
smod = this._addLangPack(lang, o, packName);
                }
            }
        }


        _yuitest_coverline("build/loader-base/loader-base.js", 1209);
if (subs) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1210);
sup = o.supersedes || [];
            _yuitest_coverline("build/loader-base/loader-base.js", 1211);
l = 0;

            _yuitest_coverline("build/loader-base/loader-base.js", 1213);
for (i in subs) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1214);
if (subs.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1215);
s = subs[i];

                    _yuitest_coverline("build/loader-base/loader-base.js", 1217);
s.path = s.path || _path(name, i, o.type);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1218);
s.pkg = name;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1219);
s.group = o.group;

                    _yuitest_coverline("build/loader-base/loader-base.js", 1221);
if (s.supersedes) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1222);
sup = sup.concat(s.supersedes);
                    }

                    _yuitest_coverline("build/loader-base/loader-base.js", 1225);
smod = this.addModule(s, i);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1226);
sup.push(i);

                    _yuitest_coverline("build/loader-base/loader-base.js", 1228);
if (smod.skinnable) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1229);
o.skinnable = true;
                        _yuitest_coverline("build/loader-base/loader-base.js", 1230);
overrides = this.skin.overrides;
                        _yuitest_coverline("build/loader-base/loader-base.js", 1231);
if (overrides && overrides[i]) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1232);
for (j = 0; j < overrides[i].length; j++) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1233);
skinname = this._addSkin(overrides[i][j],
                                         i, name);
                                _yuitest_coverline("build/loader-base/loader-base.js", 1235);
sup.push(skinname);
                            }
                        }
                        _yuitest_coverline("build/loader-base/loader-base.js", 1238);
skinname = this._addSkin(this.skin.defaultSkin,
                                        i, name);
                        _yuitest_coverline("build/loader-base/loader-base.js", 1240);
sup.push(skinname);
                    }

                    // looks like we are expected to work out the metadata
                    // for the parent module language packs from what is
                    // specified in the child modules.
                    _yuitest_coverline("build/loader-base/loader-base.js", 1246);
if (s.lang && s.lang.length) {

                        _yuitest_coverline("build/loader-base/loader-base.js", 1248);
langs = yArray(s.lang);
                        _yuitest_coverline("build/loader-base/loader-base.js", 1249);
for (j = 0; j < langs.length; j++) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1250);
lang = langs[j];
                            _yuitest_coverline("build/loader-base/loader-base.js", 1251);
packName = this.getLangPackName(lang, name);
                            _yuitest_coverline("build/loader-base/loader-base.js", 1252);
supName = this.getLangPackName(lang, i);
                            _yuitest_coverline("build/loader-base/loader-base.js", 1253);
smod = this.moduleInfo[packName];

                            _yuitest_coverline("build/loader-base/loader-base.js", 1255);
if (!smod) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1256);
smod = this._addLangPack(lang, o, packName);
                            }

                            _yuitest_coverline("build/loader-base/loader-base.js", 1259);
flatSup = flatSup || yArray.hash(smod.supersedes);

                            _yuitest_coverline("build/loader-base/loader-base.js", 1261);
if (!(supName in flatSup)) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1262);
smod.supersedes.push(supName);
                            }

                            _yuitest_coverline("build/loader-base/loader-base.js", 1265);
o.lang = o.lang || [];

                            _yuitest_coverline("build/loader-base/loader-base.js", 1267);
flatLang = flatLang || yArray.hash(o.lang);

                            _yuitest_coverline("build/loader-base/loader-base.js", 1269);
if (!(lang in flatLang)) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1270);
o.lang.push(lang);
                            }

// Add rollup file, need to add to supersedes list too

                            // default packages
                            _yuitest_coverline("build/loader-base/loader-base.js", 1276);
packName = this.getLangPackName(ROOT_LANG, name);
                            _yuitest_coverline("build/loader-base/loader-base.js", 1277);
supName = this.getLangPackName(ROOT_LANG, i);

                            _yuitest_coverline("build/loader-base/loader-base.js", 1279);
smod = this.moduleInfo[packName];

                            _yuitest_coverline("build/loader-base/loader-base.js", 1281);
if (!smod) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1282);
smod = this._addLangPack(lang, o, packName);
                            }

                            _yuitest_coverline("build/loader-base/loader-base.js", 1285);
if (!(supName in flatSup)) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1286);
smod.supersedes.push(supName);
                            }

// Add rollup file, need to add to supersedes list too

                        }
                    }

                    _yuitest_coverline("build/loader-base/loader-base.js", 1294);
l++;
                }
            }
            //o.supersedes = YObject.keys(yArray.hash(sup));
            _yuitest_coverline("build/loader-base/loader-base.js", 1298);
o.supersedes = yArray.dedupe(sup);
            _yuitest_coverline("build/loader-base/loader-base.js", 1299);
if (this.allowRollup) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1300);
o.rollup = (l < 4) ? l : Math.min(l - 1, 4);
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1304);
plugins = o.plugins;
        _yuitest_coverline("build/loader-base/loader-base.js", 1305);
if (plugins) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1306);
for (i in plugins) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1307);
if (plugins.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1308);
plug = plugins[i];
                    _yuitest_coverline("build/loader-base/loader-base.js", 1309);
plug.pkg = name;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1310);
plug.path = plug.path || _path(name, i, o.type);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1311);
plug.requires = plug.requires || [];
                    _yuitest_coverline("build/loader-base/loader-base.js", 1312);
plug.group = o.group;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1313);
this.addModule(plug, i);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1314);
if (o.skinnable) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1315);
this._addSkin(this.skin.defaultSkin, i, name);
                    }

                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1322);
if (o.condition) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1323);
t = o.condition.trigger;
            _yuitest_coverline("build/loader-base/loader-base.js", 1324);
if (YUI.Env.aliases[t]) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1325);
t = YUI.Env.aliases[t];
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1327);
if (!Y.Lang.isArray(t)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1328);
t = [t];
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 1331);
for (i = 0; i < t.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1332);
trigger = t[i];
                _yuitest_coverline("build/loader-base/loader-base.js", 1333);
when = o.condition.when;
                _yuitest_coverline("build/loader-base/loader-base.js", 1334);
conditions[trigger] = conditions[trigger] || {};
                _yuitest_coverline("build/loader-base/loader-base.js", 1335);
conditions[trigger][name] = o.condition;
                // the 'when' attribute can be 'before', 'after', or 'instead'
                // the default is after.
                _yuitest_coverline("build/loader-base/loader-base.js", 1338);
if (when && when !== 'after') {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1339);
if (when === 'instead') { // replace the trigger
                        _yuitest_coverline("build/loader-base/loader-base.js", 1340);
o.supersedes = o.supersedes || [];
                        _yuitest_coverline("build/loader-base/loader-base.js", 1341);
o.supersedes.push(trigger);
                    }
                    // before the trigger
                        // the trigger requires the conditional mod,
                        // so it should appear before the conditional
                        // mod if we do not intersede.
                } else { // after the trigger
                    _yuitest_coverline("build/loader-base/loader-base.js", 1348);
o.after = o.after || [];
                    _yuitest_coverline("build/loader-base/loader-base.js", 1349);
o.after.push(trigger);
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1354);
if (o.supersedes) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1355);
o.supersedes = this.filterRequires(o.supersedes);
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1358);
if (o.after) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1359);
o.after = this.filterRequires(o.after);
            _yuitest_coverline("build/loader-base/loader-base.js", 1360);
o.after_map = yArray.hash(o.after);
        }

        // this.dirty = true;

        _yuitest_coverline("build/loader-base/loader-base.js", 1365);
if (o.configFn) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1366);
ret = o.configFn(o);
            _yuitest_coverline("build/loader-base/loader-base.js", 1367);
if (ret === false) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1368);
delete this.moduleInfo[name];
                _yuitest_coverline("build/loader-base/loader-base.js", 1369);
delete GLOBAL_ENV._renderedMods[name];
                _yuitest_coverline("build/loader-base/loader-base.js", 1370);
o = null;
            }
        }
        //Add to global cache
        _yuitest_coverline("build/loader-base/loader-base.js", 1374);
if (o) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1375);
if (!GLOBAL_ENV._renderedMods) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1376);
GLOBAL_ENV._renderedMods = {};
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1378);
GLOBAL_ENV._renderedMods[name] = Y.mix(GLOBAL_ENV._renderedMods[name] || {}, o);
            _yuitest_coverline("build/loader-base/loader-base.js", 1379);
GLOBAL_ENV._conditions = conditions;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1382);
return o;
    },

    /**
     * Add a requirement for one or more module
     * @method require
     * @param {string[] | string*} what the modules to load.
     */
    require: function(what) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "require", 1390);
_yuitest_coverline("build/loader-base/loader-base.js", 1391);
var a = (typeof what === 'string') ? yArray(arguments) : what;
        _yuitest_coverline("build/loader-base/loader-base.js", 1392);
this.dirty = true;
        _yuitest_coverline("build/loader-base/loader-base.js", 1393);
this.required = Y.merge(this.required, yArray.hash(this.filterRequires(a)));

        _yuitest_coverline("build/loader-base/loader-base.js", 1395);
this._explodeRollups();
    },
    /**
    * Grab all the items that were asked for, check to see if the Loader
    * meta-data contains a "use" array. If it doesm remove the asked item and replace it with
    * the content of the "use".
    * This will make asking for: "dd"
    * Actually ask for: "dd-ddm-base,dd-ddm,dd-ddm-drop,dd-drag,dd-proxy,dd-constrain,dd-drop,dd-scroll,dd-drop-plugin"
    * @private
    * @method _explodeRollups
    */
    _explodeRollups: function() {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_explodeRollups", 1406);
_yuitest_coverline("build/loader-base/loader-base.js", 1407);
var self = this, m, m2, i, a, v, len, len2,
        r = self.required;

        _yuitest_coverline("build/loader-base/loader-base.js", 1410);
if (!self.allowRollup) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1411);
for (i in r) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1412);
if (r.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1413);
m = self.getModule(i);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1414);
if (m && m.use) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1415);
len = m.use.length;
                        _yuitest_coverline("build/loader-base/loader-base.js", 1416);
for (a = 0; a < len; a++) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1417);
m2 = self.getModule(m.use[a]);
                            _yuitest_coverline("build/loader-base/loader-base.js", 1418);
if (m2 && m2.use) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1419);
len2 = m2.use.length;
                                _yuitest_coverline("build/loader-base/loader-base.js", 1420);
for (v = 0; v < len2; v++) {
                                    _yuitest_coverline("build/loader-base/loader-base.js", 1421);
r[m2.use[v]] = true;
                                }
                            } else {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1424);
r[m.use[a]] = true;
                            }
                        }
                    }
                }
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1430);
self.required = r;
        }

    },
    /**
    * Explodes the required array to remove aliases and replace them with real modules
    * @method filterRequires
    * @param {Array} r The original requires array
    * @return {Array} The new array of exploded requirements
    */
    filterRequires: function(r) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "filterRequires", 1440);
_yuitest_coverline("build/loader-base/loader-base.js", 1441);
if (r) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1442);
if (!Y.Lang.isArray(r)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1443);
r = [r];
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1445);
r = Y.Array(r);
            _yuitest_coverline("build/loader-base/loader-base.js", 1446);
var c = [], i, mod, o, m;

            _yuitest_coverline("build/loader-base/loader-base.js", 1448);
for (i = 0; i < r.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1449);
mod = this.getModule(r[i]);
                _yuitest_coverline("build/loader-base/loader-base.js", 1450);
if (mod && mod.use) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1451);
for (o = 0; o < mod.use.length; o++) {
                        //Must walk the other modules in case a module is a rollup of rollups (datatype)
                        _yuitest_coverline("build/loader-base/loader-base.js", 1453);
m = this.getModule(mod.use[o]);
                        _yuitest_coverline("build/loader-base/loader-base.js", 1454);
if (m && m.use && (m.name !== mod.name)) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1455);
c = Y.Array.dedupe([].concat(c, this.filterRequires(m.use)));
                        } else {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1457);
c.push(mod.use[o]);
                        }
                    }
                } else {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1461);
c.push(r[i]);
                }
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1464);
r = c;
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 1466);
return r;
    },
    /**
     * Returns an object containing properties for all modules required
     * in order to load the requested module
     * @method getRequires
     * @param {object}  mod The module definition from moduleInfo.
     * @return {array} the expanded requirement list.
     */
    getRequires: function(mod) {

        _yuitest_coverfunc("build/loader-base/loader-base.js", "getRequires", 1475);
_yuitest_coverline("build/loader-base/loader-base.js", 1477);
if (!mod) {
            //console.log('returning no reqs for ' + mod.name);
            _yuitest_coverline("build/loader-base/loader-base.js", 1479);
return NO_REQUIREMENTS;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1482);
if (mod._parsed) {
            //console.log('returning requires for ' + mod.name, mod.requires);
            _yuitest_coverline("build/loader-base/loader-base.js", 1484);
return mod.expanded || NO_REQUIREMENTS;
        }

        //TODO add modue cache here out of scope..

        _yuitest_coverline("build/loader-base/loader-base.js", 1489);
var i, m, j, add, packName, lang, testresults = this.testresults,
            name = mod.name, cond,
            adddef = ON_PAGE[name] && ON_PAGE[name].details,
            d, go, def,
            r, old_mod,
            o, skinmod, skindef, skinpar, skinname,
            intl = mod.lang || mod.intl,
            info = this.moduleInfo,
            ftests = Y.Features && Y.Features.tests.load,
            hash, reparse;

        // console.log(name);

        // pattern match leaves module stub that needs to be filled out
        _yuitest_coverline("build/loader-base/loader-base.js", 1503);
if (mod.temp && adddef) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1504);
old_mod = mod;
            _yuitest_coverline("build/loader-base/loader-base.js", 1505);
mod = this.addModule(adddef, name);
            _yuitest_coverline("build/loader-base/loader-base.js", 1506);
mod.group = old_mod.group;
            _yuitest_coverline("build/loader-base/loader-base.js", 1507);
mod.pkg = old_mod.pkg;
            _yuitest_coverline("build/loader-base/loader-base.js", 1508);
delete mod.expanded;
        }

        // console.log('cache: ' + mod.langCache + ' == ' + this.lang);

        //If a skin or a lang is different, reparse..
        _yuitest_coverline("build/loader-base/loader-base.js", 1514);
reparse = !((!this.lang || mod.langCache === this.lang) && (mod.skinCache === this.skin.defaultSkin));

        _yuitest_coverline("build/loader-base/loader-base.js", 1516);
if (mod.expanded && !reparse) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1517);
return mod.expanded;
        }


        _yuitest_coverline("build/loader-base/loader-base.js", 1521);
d = [];
        _yuitest_coverline("build/loader-base/loader-base.js", 1522);
hash = {};
        _yuitest_coverline("build/loader-base/loader-base.js", 1523);
r = this.filterRequires(mod.requires);
        _yuitest_coverline("build/loader-base/loader-base.js", 1524);
if (mod.lang) {
            //If a module has a lang attribute, auto add the intl requirement.
            _yuitest_coverline("build/loader-base/loader-base.js", 1526);
d.unshift('intl');
            _yuitest_coverline("build/loader-base/loader-base.js", 1527);
r.unshift('intl');
            _yuitest_coverline("build/loader-base/loader-base.js", 1528);
intl = true;
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 1530);
o = this.filterRequires(mod.optional);


        _yuitest_coverline("build/loader-base/loader-base.js", 1533);
mod._parsed = true;
        _yuitest_coverline("build/loader-base/loader-base.js", 1534);
mod.langCache = this.lang;
        _yuitest_coverline("build/loader-base/loader-base.js", 1535);
mod.skinCache = this.skin.defaultSkin;

        _yuitest_coverline("build/loader-base/loader-base.js", 1537);
for (i = 0; i < r.length; i++) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1538);
if (!hash[r[i]]) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1539);
d.push(r[i]);
                _yuitest_coverline("build/loader-base/loader-base.js", 1540);
hash[r[i]] = true;
                _yuitest_coverline("build/loader-base/loader-base.js", 1541);
m = this.getModule(r[i]);
                _yuitest_coverline("build/loader-base/loader-base.js", 1542);
if (m) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1543);
add = this.getRequires(m);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1544);
intl = intl || (m.expanded_map &&
                        (INTL in m.expanded_map));
                    _yuitest_coverline("build/loader-base/loader-base.js", 1546);
for (j = 0; j < add.length; j++) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1547);
d.push(add[j]);
                    }
                }
            }
        }

        // get the requirements from superseded modules, if any
        _yuitest_coverline("build/loader-base/loader-base.js", 1554);
r = this.filterRequires(mod.supersedes);
        _yuitest_coverline("build/loader-base/loader-base.js", 1555);
if (r) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1556);
for (i = 0; i < r.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1557);
if (!hash[r[i]]) {
                    // if this module has submodules, the requirements list is
                    // expanded to include the submodules.  This is so we can
                    // prevent dups when a submodule is already loaded and the
                    // parent is requested.
                    _yuitest_coverline("build/loader-base/loader-base.js", 1562);
if (mod.submodules) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1563);
d.push(r[i]);
                    }

                    _yuitest_coverline("build/loader-base/loader-base.js", 1566);
hash[r[i]] = true;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1567);
m = this.getModule(r[i]);

                    _yuitest_coverline("build/loader-base/loader-base.js", 1569);
if (m) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1570);
add = this.getRequires(m);
                        _yuitest_coverline("build/loader-base/loader-base.js", 1571);
intl = intl || (m.expanded_map &&
                            (INTL in m.expanded_map));
                        _yuitest_coverline("build/loader-base/loader-base.js", 1573);
for (j = 0; j < add.length; j++) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1574);
d.push(add[j]);
                        }
                    }
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1581);
if (o && this.loadOptional) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1582);
for (i = 0; i < o.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1583);
if (!hash[o[i]]) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1584);
d.push(o[i]);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1585);
hash[o[i]] = true;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1586);
m = info[o[i]];
                    _yuitest_coverline("build/loader-base/loader-base.js", 1587);
if (m) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1588);
add = this.getRequires(m);
                        _yuitest_coverline("build/loader-base/loader-base.js", 1589);
intl = intl || (m.expanded_map &&
                            (INTL in m.expanded_map));
                        _yuitest_coverline("build/loader-base/loader-base.js", 1591);
for (j = 0; j < add.length; j++) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1592);
d.push(add[j]);
                        }
                    }
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1599);
cond = this.conditions[name];

        _yuitest_coverline("build/loader-base/loader-base.js", 1601);
if (cond) {
            //Set the module to not parsed since we have conditionals and this could change the dependency tree.
            _yuitest_coverline("build/loader-base/loader-base.js", 1603);
mod._parsed = false;
            _yuitest_coverline("build/loader-base/loader-base.js", 1604);
if (testresults && ftests) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1605);
oeach(testresults, function(result, id) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "(anonymous 4)", 1605);
_yuitest_coverline("build/loader-base/loader-base.js", 1606);
var condmod = ftests[id].name;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1607);
if (!hash[condmod] && ftests[id].trigger === name) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1608);
if (result && ftests[id]) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1609);
hash[condmod] = true;
                            _yuitest_coverline("build/loader-base/loader-base.js", 1610);
d.push(condmod);
                        }
                    }
                });
            } else {
                _yuitest_coverline("build/loader-base/loader-base.js", 1615);
for (i in cond) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1616);
if (cond.hasOwnProperty(i)) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1617);
if (!hash[i]) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1618);
def = cond[i];
                            //first see if they've specfied a ua check
                            //then see if they've got a test fn & if it returns true
                            //otherwise just having a condition block is enough
                            _yuitest_coverline("build/loader-base/loader-base.js", 1622);
go = def && ((!def.ua && !def.test) || (def.ua && Y.UA[def.ua]) ||
                                        (def.test && def.test(Y, r)));

                            _yuitest_coverline("build/loader-base/loader-base.js", 1625);
if (go) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 1626);
hash[i] = true;
                                _yuitest_coverline("build/loader-base/loader-base.js", 1627);
d.push(i);
                                _yuitest_coverline("build/loader-base/loader-base.js", 1628);
m = this.getModule(i);
                                _yuitest_coverline("build/loader-base/loader-base.js", 1629);
if (m) {
                                    _yuitest_coverline("build/loader-base/loader-base.js", 1630);
add = this.getRequires(m);
                                    _yuitest_coverline("build/loader-base/loader-base.js", 1631);
for (j = 0; j < add.length; j++) {
                                        _yuitest_coverline("build/loader-base/loader-base.js", 1632);
d.push(add[j]);
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }

        // Create skin modules
        _yuitest_coverline("build/loader-base/loader-base.js", 1644);
if (mod.skinnable) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1645);
skindef = this.skin.overrides;
            _yuitest_coverline("build/loader-base/loader-base.js", 1646);
for (i in YUI.Env.aliases) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1647);
if (YUI.Env.aliases.hasOwnProperty(i)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1648);
if (Y.Array.indexOf(YUI.Env.aliases[i], name) > -1) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1649);
skinpar = i;
                    }
                }
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1653);
if (skindef && (skindef[name] || (skinpar && skindef[skinpar]))) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1654);
skinname = name;
                _yuitest_coverline("build/loader-base/loader-base.js", 1655);
if (skindef[skinpar]) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1656);
skinname = skinpar;
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 1658);
for (i = 0; i < skindef[skinname].length; i++) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1659);
skinmod = this._addSkin(skindef[skinname][i], name);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1660);
if (!this.isCSSLoaded(skinmod, this._boot)) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1661);
d.push(skinmod);
                    }
                }
            } else {
                _yuitest_coverline("build/loader-base/loader-base.js", 1665);
skinmod = this._addSkin(this.skin.defaultSkin, name);
                _yuitest_coverline("build/loader-base/loader-base.js", 1666);
if (!this.isCSSLoaded(skinmod, this._boot)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1667);
d.push(skinmod);
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1672);
mod._parsed = false;

        _yuitest_coverline("build/loader-base/loader-base.js", 1674);
if (intl) {

            _yuitest_coverline("build/loader-base/loader-base.js", 1676);
if (mod.lang && !mod.langPack && Y.Intl) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1677);
lang = Y.Intl.lookupBestLang(this.lang || ROOT_LANG, mod.lang);
                _yuitest_coverline("build/loader-base/loader-base.js", 1678);
packName = this.getLangPackName(lang, name);
                _yuitest_coverline("build/loader-base/loader-base.js", 1679);
if (packName) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1680);
d.unshift(packName);
                }
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1683);
d.unshift(INTL);
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1686);
mod.expanded_map = yArray.hash(d);

        _yuitest_coverline("build/loader-base/loader-base.js", 1688);
mod.expanded = YObject.keys(mod.expanded_map);

        _yuitest_coverline("build/loader-base/loader-base.js", 1690);
return mod.expanded;
    },
    /**
    * Check to see if named css module is already loaded on the page
    * @method isCSSLoaded
    * @param {String} name The name of the css file
    * @return Boolean
    */
    isCSSLoaded: function(name, skip) {
        //TODO - Make this call a batching call with name being an array
        _yuitest_coverfunc("build/loader-base/loader-base.js", "isCSSLoaded", 1698);
_yuitest_coverline("build/loader-base/loader-base.js", 1700);
if (!name || !YUI.Env.cssStampEl || (!skip && this.ignoreRegistered)) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1701);
return false;
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 1703);
var el = YUI.Env.cssStampEl,
            ret = false,
            mod = YUI.Env._cssLoaded[name],
            style = el.currentStyle; //IE


        _yuitest_coverline("build/loader-base/loader-base.js", 1709);
if (mod !== undefined) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1710);
return mod;
        }

        //Add the classname to the element
        _yuitest_coverline("build/loader-base/loader-base.js", 1714);
el.className = name;

        _yuitest_coverline("build/loader-base/loader-base.js", 1716);
if (!style) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1717);
style = Y.config.doc.defaultView.getComputedStyle(el, null);
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1720);
if (style && style.display === 'none') {
            _yuitest_coverline("build/loader-base/loader-base.js", 1721);
ret = true;
        }


        _yuitest_coverline("build/loader-base/loader-base.js", 1725);
el.className = ''; //Reset the classname to ''

        _yuitest_coverline("build/loader-base/loader-base.js", 1727);
YUI.Env._cssLoaded[name] = ret;

        _yuitest_coverline("build/loader-base/loader-base.js", 1729);
return ret;
    },

    /**
     * Returns a hash of module names the supplied module satisfies.
     * @method getProvides
     * @param {string} name The name of the module.
     * @return {object} what this module provides.
     */
    getProvides: function(name) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "getProvides", 1738);
_yuitest_coverline("build/loader-base/loader-base.js", 1739);
var m = this.getModule(name), o, s;
            // supmap = this.provides;

        _yuitest_coverline("build/loader-base/loader-base.js", 1742);
if (!m) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1743);
return NOT_FOUND;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1746);
if (m && !m.provides) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1747);
o = {};
            _yuitest_coverline("build/loader-base/loader-base.js", 1748);
s = m.supersedes;

            _yuitest_coverline("build/loader-base/loader-base.js", 1750);
if (s) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1751);
yArray.each(s, function(v) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "(anonymous 5)", 1751);
_yuitest_coverline("build/loader-base/loader-base.js", 1752);
Y.mix(o, this.getProvides(v));
                }, this);
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 1756);
o[name] = true;
            _yuitest_coverline("build/loader-base/loader-base.js", 1757);
m.provides = o;

        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1761);
return m.provides;
    },

    /**
     * Calculates the dependency tree, the result is stored in the sorted
     * property.
     * @method calculate
     * @param {object} o optional options object.
     * @param {string} type optional argument to prune modules.
     */
    calculate: function(o, type) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "calculate", 1771);
_yuitest_coverline("build/loader-base/loader-base.js", 1772);
if (o || type || this.dirty) {

            _yuitest_coverline("build/loader-base/loader-base.js", 1774);
if (o) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1775);
this._config(o);
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 1778);
if (!this._init) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1779);
this._setup();
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 1782);
this._explode();

            _yuitest_coverline("build/loader-base/loader-base.js", 1784);
if (this.allowRollup) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1785);
this._rollup();
            } else {
                _yuitest_coverline("build/loader-base/loader-base.js", 1787);
this._explodeRollups();
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1789);
this._reduce();
            _yuitest_coverline("build/loader-base/loader-base.js", 1790);
this._sort();
        }
    },
    /**
    * Creates a "psuedo" package for languages provided in the lang array
    * @method _addLangPack
    * @private
    * @param {String} lang The language to create
    * @param {Object} m The module definition to create the language pack around
    * @param {String} packName The name of the package (e.g: lang/datatype-date-en-US)
    * @return {Object} The module definition
    */
    _addLangPack: function(lang, m, packName) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_addLangPack", 1802);
_yuitest_coverline("build/loader-base/loader-base.js", 1803);
var name = m.name,
            packPath, conf,
            existing = this.moduleInfo[packName];

        _yuitest_coverline("build/loader-base/loader-base.js", 1807);
if (!existing) {

            _yuitest_coverline("build/loader-base/loader-base.js", 1809);
packPath = _path((m.pkg || name), packName, JS, true);

            _yuitest_coverline("build/loader-base/loader-base.js", 1811);
conf = {
                path: packPath,
                intl: true,
                langPack: true,
                ext: m.ext,
                group: m.group,
                supersedes: []
            };
            _yuitest_coverline("build/loader-base/loader-base.js", 1819);
if (m.root) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1820);
conf.root = m.root;
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 1822);
if (m.base) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1823);
conf.base = m.base;
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 1826);
if (m.configFn) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1827);
conf.configFn = m.configFn;
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 1830);
this.addModule(conf, packName);

            _yuitest_coverline("build/loader-base/loader-base.js", 1832);
if (lang) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1833);
Y.Env.lang = Y.Env.lang || {};
                _yuitest_coverline("build/loader-base/loader-base.js", 1834);
Y.Env.lang[lang] = Y.Env.lang[lang] || {};
                _yuitest_coverline("build/loader-base/loader-base.js", 1835);
Y.Env.lang[lang][name] = true;
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1839);
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
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_setup", 1849);
_yuitest_coverline("build/loader-base/loader-base.js", 1850);
var info = this.moduleInfo, name, i, j, m, l,
            packName;

        _yuitest_coverline("build/loader-base/loader-base.js", 1853);
for (name in info) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1854);
if (info.hasOwnProperty(name)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1855);
m = info[name];
                _yuitest_coverline("build/loader-base/loader-base.js", 1856);
if (m) {

                    // remove dups
                    //m.requires = YObject.keys(yArray.hash(m.requires));
                    _yuitest_coverline("build/loader-base/loader-base.js", 1860);
m.requires = yArray.dedupe(m.requires);

                    // Create lang pack modules
                    //if (m.lang && m.lang.length) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1864);
if (m.lang) {
                        // Setup root package if the module has lang defined,
                        // it needs to provide a root language pack
                        _yuitest_coverline("build/loader-base/loader-base.js", 1867);
packName = this.getLangPackName(ROOT_LANG, name);
                        _yuitest_coverline("build/loader-base/loader-base.js", 1868);
this._addLangPack(null, m, packName);
                    }

                }
            }
        }


        //l = Y.merge(this.inserted);
        _yuitest_coverline("build/loader-base/loader-base.js", 1877);
l = {};

        // available modules
        _yuitest_coverline("build/loader-base/loader-base.js", 1880);
if (!this.ignoreRegistered) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1881);
Y.mix(l, GLOBAL_ENV.mods);
        }

        // add the ignore list to the list of loaded packages
        _yuitest_coverline("build/loader-base/loader-base.js", 1885);
if (this.ignore) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1886);
Y.mix(l, yArray.hash(this.ignore));
        }

        // expand the list to include superseded modules
        _yuitest_coverline("build/loader-base/loader-base.js", 1890);
for (j in l) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1891);
if (l.hasOwnProperty(j)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1892);
Y.mix(l, this.getProvides(j));
            }
        }

        // remove modules on the force list from the loaded list
        _yuitest_coverline("build/loader-base/loader-base.js", 1897);
if (this.force) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1898);
for (i = 0; i < this.force.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1899);
if (this.force[i] in l) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1900);
delete l[this.force[i]];
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1905);
Y.mix(this.loaded, l);

        _yuitest_coverline("build/loader-base/loader-base.js", 1907);
this._init = true;
    },

    /**
     * Builds a module name for a language pack
     * @method getLangPackName
     * @param {string} lang the language code.
     * @param {string} mname the module to build it for.
     * @return {string} the language pack module name.
     */
    getLangPackName: function(lang, mname) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "getLangPackName", 1917);
_yuitest_coverline("build/loader-base/loader-base.js", 1918);
return ('lang/' + mname + ((lang) ? '_' + lang : ''));
    },
    /**
     * Inspects the required modules list looking for additional
     * dependencies.  Expands the required list to include all
     * required modules.  Called by calculate()
     * @method _explode
     * @private
     */
    _explode: function() {
        //TODO Move done out of scope
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_explode", 1927);
_yuitest_coverline("build/loader-base/loader-base.js", 1929);
var r = this.required, m, reqs, done = {},
            self = this, name, expound;

        // the setup phase is over, all modules have been created
        _yuitest_coverline("build/loader-base/loader-base.js", 1933);
self.dirty = false;

        _yuitest_coverline("build/loader-base/loader-base.js", 1935);
self._explodeRollups();
        _yuitest_coverline("build/loader-base/loader-base.js", 1936);
r = self.required;

        _yuitest_coverline("build/loader-base/loader-base.js", 1938);
for (name in r) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1939);
if (r.hasOwnProperty(name)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1940);
if (!done[name]) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1941);
done[name] = true;
                    _yuitest_coverline("build/loader-base/loader-base.js", 1942);
m = self.getModule(name);
                    _yuitest_coverline("build/loader-base/loader-base.js", 1943);
if (m) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1944);
expound = m.expound;

                        _yuitest_coverline("build/loader-base/loader-base.js", 1946);
if (expound) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 1947);
r[expound] = self.getModule(expound);
                            _yuitest_coverline("build/loader-base/loader-base.js", 1948);
reqs = self.getRequires(r[expound]);
                            _yuitest_coverline("build/loader-base/loader-base.js", 1949);
Y.mix(r, yArray.hash(reqs));
                        }

                        _yuitest_coverline("build/loader-base/loader-base.js", 1952);
reqs = self.getRequires(m);
                        _yuitest_coverline("build/loader-base/loader-base.js", 1953);
Y.mix(r, yArray.hash(reqs));
                    }
                }
            }
        }

    },
    /**
    * The default method used to test a module against a pattern
    * @method _patternTest
    * @private
    * @param {String} mname The module being tested
    * @param {String} pname The pattern to match
    */
    _patternTest: function(mname, pname) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_patternTest", 1967);
_yuitest_coverline("build/loader-base/loader-base.js", 1968);
return (mname.indexOf(pname) > -1);
    },
    /**
    * Get's the loader meta data for the requested module
    * @method getModule
    * @param {String} mname The module name to get
    * @return {Object} The module metadata
    */
    getModule: function(mname) {
        //TODO: Remove name check - it's a quick hack to fix pattern WIP
        _yuitest_coverfunc("build/loader-base/loader-base.js", "getModule", 1976);
_yuitest_coverline("build/loader-base/loader-base.js", 1978);
if (!mname) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1979);
return null;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 1982);
var p, found, pname,
            m = this.moduleInfo[mname],
            patterns = this.patterns;

        // check the patterns library to see if we should automatically add
        // the module with defaults
        _yuitest_coverline("build/loader-base/loader-base.js", 1988);
if (!m || (m && m.ext)) {
            _yuitest_coverline("build/loader-base/loader-base.js", 1989);
for (pname in patterns) {
                _yuitest_coverline("build/loader-base/loader-base.js", 1990);
if (patterns.hasOwnProperty(pname)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 1991);
p = patterns[pname];

                    //There is no test method, create a default one that tests
                    // the pattern against the mod name
                    _yuitest_coverline("build/loader-base/loader-base.js", 1995);
if (!p.test) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 1996);
p.test = this._patternTest;
                    }

                    _yuitest_coverline("build/loader-base/loader-base.js", 1999);
if (p.test(mname, pname)) {
                        // use the metadata supplied for the pattern
                        // as the module definition.
                        _yuitest_coverline("build/loader-base/loader-base.js", 2002);
found = p;
                        _yuitest_coverline("build/loader-base/loader-base.js", 2003);
break;
                    }
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2009);
if (!m) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2010);
if (found) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2011);
if (p.action) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2012);
p.action.call(this, mname, pname);
                } else {
                    // ext true or false?
                    _yuitest_coverline("build/loader-base/loader-base.js", 2015);
m = this.addModule(Y.merge(found), mname);
                    _yuitest_coverline("build/loader-base/loader-base.js", 2016);
if (found.configFn) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2017);
m.configFn = found.configFn;
                    }
                    _yuitest_coverline("build/loader-base/loader-base.js", 2019);
m.temp = true;
                }
            }
        } else {
            _yuitest_coverline("build/loader-base/loader-base.js", 2023);
if (found && m && found.configFn && !m.configFn) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2024);
m.configFn = found.configFn;
                _yuitest_coverline("build/loader-base/loader-base.js", 2025);
m.configFn(m);
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2029);
return m;
    },

    // impl in rollup submodule
    _rollup: function() { },

    /**
     * Remove superceded modules and loaded modules.  Called by
     * calculate() after we have the mega list of all dependencies
     * @method _reduce
     * @return {object} the reduced dependency hash.
     * @private
     */
    _reduce: function(r) {

        _yuitest_coverfunc("build/loader-base/loader-base.js", "_reduce", 2042);
_yuitest_coverline("build/loader-base/loader-base.js", 2044);
r = r || this.required;

        _yuitest_coverline("build/loader-base/loader-base.js", 2046);
var i, j, s, m, type = this.loadType,
        ignore = this.ignore ? yArray.hash(this.ignore) : false;

        _yuitest_coverline("build/loader-base/loader-base.js", 2049);
for (i in r) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2050);
if (r.hasOwnProperty(i)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2051);
m = this.getModule(i);
                // remove if already loaded
                _yuitest_coverline("build/loader-base/loader-base.js", 2053);
if (((this.loaded[i] || ON_PAGE[i]) &&
                        !this.forceMap[i] && !this.ignoreRegistered) ||
                        (type && m && m.type !== type)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2056);
delete r[i];
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 2058);
if (ignore && ignore[i]) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2059);
delete r[i];
                }
                // remove anything this module supersedes
                _yuitest_coverline("build/loader-base/loader-base.js", 2062);
s = m && m.supersedes;
                _yuitest_coverline("build/loader-base/loader-base.js", 2063);
if (s) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2064);
for (j = 0; j < s.length; j++) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2065);
if (s[j] in r) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 2066);
delete r[s[j]];
                        }
                    }
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2073);
return r;
    },
    /**
    * Handles the queue when a module has been loaded for all cases
    * @method _finish
    * @private
    * @param {String} msg The message from Loader
    * @param {Boolean} success A boolean denoting success or failure
    */
    _finish: function(msg, success) {

        _yuitest_coverfunc("build/loader-base/loader-base.js", "_finish", 2082);
_yuitest_coverline("build/loader-base/loader-base.js", 2084);
_queue.running = false;

        _yuitest_coverline("build/loader-base/loader-base.js", 2086);
var onEnd = this.onEnd;
        _yuitest_coverline("build/loader-base/loader-base.js", 2087);
if (onEnd) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2088);
onEnd.call(this.context, {
                msg: msg,
                data: this.data,
                success: success
            });
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2094);
this._continue();
    },
    /**
    * The default Loader onSuccess handler, calls this.onSuccess with a payload
    * @method _onSuccess
    * @private
    */
    _onSuccess: function() {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_onSuccess", 2101);
_yuitest_coverline("build/loader-base/loader-base.js", 2102);
var self = this, skipped = Y.merge(self.skipped), fn,
            failed = [], rreg = self.requireRegistration,
            success, msg, i, mod;

        _yuitest_coverline("build/loader-base/loader-base.js", 2106);
for (i in skipped) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2107);
if (skipped.hasOwnProperty(i)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2108);
delete self.inserted[i];
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2112);
self.skipped = {};

        _yuitest_coverline("build/loader-base/loader-base.js", 2114);
for (i in self.inserted) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2115);
if (self.inserted.hasOwnProperty(i)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2116);
mod = self.getModule(i);
                _yuitest_coverline("build/loader-base/loader-base.js", 2117);
if (mod && rreg && mod.type === JS && !(i in YUI.Env.mods)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2118);
failed.push(i);
                } else {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2120);
Y.mix(self.loaded, self.getProvides(i));
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2125);
fn = self.onSuccess;
        _yuitest_coverline("build/loader-base/loader-base.js", 2126);
msg = (failed.length) ? 'notregistered' : 'success';
        _yuitest_coverline("build/loader-base/loader-base.js", 2127);
success = !(failed.length);
        _yuitest_coverline("build/loader-base/loader-base.js", 2128);
if (fn) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2129);
fn.call(self.context, {
                msg: msg,
                data: self.data,
                success: success,
                failed: failed,
                skipped: skipped
            });
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2137);
self._finish(msg, success);
    },
    /**
    * The default Loader onProgress handler, calls this.onProgress with a payload
    * @method _onProgress
    * @private
    */
    _onProgress: function(e) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_onProgress", 2144);
_yuitest_coverline("build/loader-base/loader-base.js", 2145);
var self = this, i;
        //set the internal cache to what just came in.
        _yuitest_coverline("build/loader-base/loader-base.js", 2147);
if (e.data && e.data.length) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2148);
for (i = 0; i < e.data.length; i++) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2149);
e.data[i] = self.getModule(e.data[i].name);
            }
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2152);
if (self.onProgress) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2153);
self.onProgress.call(self.context, {
                name: e.url,
                data: e.data
            });
        }
    },
    /**
    * The default Loader onFailure handler, calls this.onFailure with a payload
    * @method _onFailure
    * @private
    */
    _onFailure: function(o) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_onFailure", 2164);
_yuitest_coverline("build/loader-base/loader-base.js", 2165);
var f = this.onFailure, msg = [], i = 0, len = o.errors.length;

        _yuitest_coverline("build/loader-base/loader-base.js", 2167);
for (i; i < len; i++) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2168);
msg.push(o.errors[i].error);
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2171);
msg = msg.join(',');


        _yuitest_coverline("build/loader-base/loader-base.js", 2174);
if (f) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2175);
f.call(this.context, {
                msg: msg,
                data: this.data,
                success: false
            });
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2182);
this._finish(msg, false);

    },

    /**
    * The default Loader onTimeout handler, calls this.onTimeout with a payload
    * @method _onTimeout
    * @param {Get.Transaction} transaction The Transaction object from `Y.Get`
    * @private
    */
    _onTimeout: function(transaction) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_onTimeout", 2192);
_yuitest_coverline("build/loader-base/loader-base.js", 2193);
var f = this.onTimeout;
        _yuitest_coverline("build/loader-base/loader-base.js", 2194);
if (f) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2195);
f.call(this.context, {
                msg: 'timeout',
                data: this.data,
                success: false,
                transaction: transaction
            });
        }
    },

    /**
     * Sorts the dependency tree.  The last step of calculate()
     * @method _sort
     * @private
     */
    _sort: function() {

        // create an indexed list
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_sort", 2209);
_yuitest_coverline("build/loader-base/loader-base.js", 2212);
var s = YObject.keys(this.required),
            // loaded = this.loaded,
            //TODO Move this out of scope
            done = {},
            p = 0, l, a, b, j, k, moved, doneKey;

        // keep going until we make a pass without moving anything
        _yuitest_coverline("build/loader-base/loader-base.js", 2219);
for (;;) {

            _yuitest_coverline("build/loader-base/loader-base.js", 2221);
l = s.length;
            _yuitest_coverline("build/loader-base/loader-base.js", 2222);
moved = false;

            // start the loop after items that are already sorted
            _yuitest_coverline("build/loader-base/loader-base.js", 2225);
for (j = p; j < l; j++) {

                // check the next module on the list to see if its
                // dependencies have been met
                _yuitest_coverline("build/loader-base/loader-base.js", 2229);
a = s[j];

                // check everything below current item and move if we
                // find a requirement for the current item
                _yuitest_coverline("build/loader-base/loader-base.js", 2233);
for (k = j + 1; k < l; k++) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2234);
doneKey = a + s[k];

                    _yuitest_coverline("build/loader-base/loader-base.js", 2236);
if (!done[doneKey] && this._requires(a, s[k])) {

                        // extract the dependency so we can move it up
                        _yuitest_coverline("build/loader-base/loader-base.js", 2239);
b = s.splice(k, 1);

                        // insert the dependency above the item that
                        // requires it
                        _yuitest_coverline("build/loader-base/loader-base.js", 2243);
s.splice(j, 0, b[0]);

                        // only swap two dependencies once to short circut
                        // circular dependencies
                        _yuitest_coverline("build/loader-base/loader-base.js", 2247);
done[doneKey] = true;

                        // keep working
                        _yuitest_coverline("build/loader-base/loader-base.js", 2250);
moved = true;

                        _yuitest_coverline("build/loader-base/loader-base.js", 2252);
break;
                    }
                }

                // jump out of loop if we moved something
                _yuitest_coverline("build/loader-base/loader-base.js", 2257);
if (moved) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2258);
break;
                // this item is sorted, move our pointer and keep going
                } else {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2261);
p++;
                }
            }

            // when we make it here and moved is false, we are
            // finished sorting
            _yuitest_coverline("build/loader-base/loader-base.js", 2267);
if (!moved) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2268);
break;
            }

        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2273);
this.sorted = s;
    },

    /**
    * Handles the actual insertion of script/link tags
    * @method _insert
    * @private
    * @param {Object} source The YUI instance the request came from
    * @param {Object} o The metadata to include
    * @param {String} type JS or CSS
    * @param {Boolean} [skipcalc=false] Do a Loader.calculate on the meta
    */
    _insert: function(source, o, type, skipcalc) {


        // restore the state at the time of the request
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_insert", 2285);
_yuitest_coverline("build/loader-base/loader-base.js", 2289);
if (source) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2290);
this._config(source);
        }

        // build the dependency list
        // don't include type so we can process CSS and script in
        // one pass when the type is not specified.

        _yuitest_coverline("build/loader-base/loader-base.js", 2297);
var modules = this.resolve(!skipcalc),
            self = this, comp = 0, actions = 0,
            mods = {}, deps, complete;

        _yuitest_coverline("build/loader-base/loader-base.js", 2301);
self._refetch = [];

        _yuitest_coverline("build/loader-base/loader-base.js", 2303);
if (type) {
            //Filter out the opposite type and reset the array so the checks later work
            _yuitest_coverline("build/loader-base/loader-base.js", 2305);
modules[((type === JS) ? CSS : JS)] = [];
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2307);
if (!self.fetchCSS) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2308);
modules.css = [];
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2310);
if (modules.js.length) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2311);
comp++;
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2313);
if (modules.css.length) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2314);
comp++;
        }

        //console.log('Resolved Modules: ', modules);

        _yuitest_coverline("build/loader-base/loader-base.js", 2319);
complete = function(d) {
            _yuitest_coverfunc("build/loader-base/loader-base.js", "complete", 2319);
_yuitest_coverline("build/loader-base/loader-base.js", 2320);
actions++;
            _yuitest_coverline("build/loader-base/loader-base.js", 2321);
var errs = {}, i = 0, o = 0, u = '', fn,
                modName, resMods;

            _yuitest_coverline("build/loader-base/loader-base.js", 2324);
if (d && d.errors) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2325);
for (i = 0; i < d.errors.length; i++) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2326);
if (d.errors[i].request) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2327);
u = d.errors[i].request.url;
                    } else {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2329);
u = d.errors[i];
                    }
                    _yuitest_coverline("build/loader-base/loader-base.js", 2331);
errs[u] = u;
                }
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 2335);
if (d && d.data && d.data.length && (d.type === 'success')) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2336);
for (i = 0; i < d.data.length; i++) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2337);
self.inserted[d.data[i].name] = true;
                    //If the external module has a skin or a lang, reprocess it
                    _yuitest_coverline("build/loader-base/loader-base.js", 2339);
if (d.data[i].lang || d.data[i].skinnable) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2340);
delete self.inserted[d.data[i].name];
                        _yuitest_coverline("build/loader-base/loader-base.js", 2341);
self._refetch.push(d.data[i].name);
                    }
                }
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 2346);
if (actions === comp) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2347);
self._loading = null;
                _yuitest_coverline("build/loader-base/loader-base.js", 2348);
if (self._refetch.length) {
                    //Get the deps for the new meta-data and reprocess
                    _yuitest_coverline("build/loader-base/loader-base.js", 2350);
for (i = 0; i < self._refetch.length; i++) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2351);
deps = self.getRequires(self.getModule(self._refetch[i]));
                        _yuitest_coverline("build/loader-base/loader-base.js", 2352);
for (o = 0; o < deps.length; o++) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 2353);
if (!self.inserted[deps[o]]) {
                                //We wouldn't be to this point without the module being here
                                _yuitest_coverline("build/loader-base/loader-base.js", 2355);
mods[deps[o]] = deps[o];
                            }
                        }
                    }
                    _yuitest_coverline("build/loader-base/loader-base.js", 2359);
mods = Y.Object.keys(mods);
                    _yuitest_coverline("build/loader-base/loader-base.js", 2360);
if (mods.length) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2361);
self.require(mods);
                        _yuitest_coverline("build/loader-base/loader-base.js", 2362);
resMods = self.resolve(true);
                        _yuitest_coverline("build/loader-base/loader-base.js", 2363);
if (resMods.cssMods.length) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 2364);
for (i=0; i <  resMods.cssMods.length; i++) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 2365);
modName = resMods.cssMods[i].name;
                                _yuitest_coverline("build/loader-base/loader-base.js", 2366);
delete YUI.Env._cssLoaded[modName];
                                _yuitest_coverline("build/loader-base/loader-base.js", 2367);
if (self.isCSSLoaded(modName)) {
                                    _yuitest_coverline("build/loader-base/loader-base.js", 2368);
self.inserted[modName] = true;
                                    _yuitest_coverline("build/loader-base/loader-base.js", 2369);
delete self.required[modName];
                                }
                            }
                            _yuitest_coverline("build/loader-base/loader-base.js", 2372);
self.sorted = [];
                            _yuitest_coverline("build/loader-base/loader-base.js", 2373);
self._sort();
                        }
                        _yuitest_coverline("build/loader-base/loader-base.js", 2375);
d = null; //bail
                        _yuitest_coverline("build/loader-base/loader-base.js", 2376);
self._insert(); //insert the new deps
                    }
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 2379);
if (d && d.fn) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2380);
fn = d.fn;
                    _yuitest_coverline("build/loader-base/loader-base.js", 2381);
delete d.fn;
                    _yuitest_coverline("build/loader-base/loader-base.js", 2382);
fn.call(self, d);
                }
            }
        };

        _yuitest_coverline("build/loader-base/loader-base.js", 2387);
this._loading = true;

        _yuitest_coverline("build/loader-base/loader-base.js", 2389);
if (!modules.js.length && !modules.css.length) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2390);
actions = -1;
            _yuitest_coverline("build/loader-base/loader-base.js", 2391);
complete({
                fn: self._onSuccess
            });
            _yuitest_coverline("build/loader-base/loader-base.js", 2394);
return;
        }


        _yuitest_coverline("build/loader-base/loader-base.js", 2398);
if (modules.css.length) { //Load CSS first
            _yuitest_coverline("build/loader-base/loader-base.js", 2399);
Y.Get.css(modules.css, {
                data: modules.cssMods,
                attributes: self.cssAttributes,
                insertBefore: self.insertBefore,
                charset: self.charset,
                timeout: self.timeout,
                context: self,
                onProgress: function(e) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "onProgress", 2406);
_yuitest_coverline("build/loader-base/loader-base.js", 2407);
self._onProgress.call(self, e);
                },
                onTimeout: function(d) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "onTimeout", 2409);
_yuitest_coverline("build/loader-base/loader-base.js", 2410);
self._onTimeout.call(self, d);
                },
                onSuccess: function(d) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "onSuccess", 2412);
_yuitest_coverline("build/loader-base/loader-base.js", 2413);
d.type = 'success';
                    _yuitest_coverline("build/loader-base/loader-base.js", 2414);
d.fn = self._onSuccess;
                    _yuitest_coverline("build/loader-base/loader-base.js", 2415);
complete.call(self, d);
                },
                onFailure: function(d) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "onFailure", 2417);
_yuitest_coverline("build/loader-base/loader-base.js", 2418);
d.type = 'failure';
                    _yuitest_coverline("build/loader-base/loader-base.js", 2419);
d.fn = self._onFailure;
                    _yuitest_coverline("build/loader-base/loader-base.js", 2420);
complete.call(self, d);
                }
            });
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2425);
if (modules.js.length) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2426);
Y.Get.js(modules.js, {
                data: modules.jsMods,
                insertBefore: self.insertBefore,
                attributes: self.jsAttributes,
                charset: self.charset,
                timeout: self.timeout,
                autopurge: false,
                context: self,
                async: self.async,
                onProgress: function(e) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "onProgress", 2435);
_yuitest_coverline("build/loader-base/loader-base.js", 2436);
self._onProgress.call(self, e);
                },
                onTimeout: function(d) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "onTimeout", 2438);
_yuitest_coverline("build/loader-base/loader-base.js", 2439);
self._onTimeout.call(self, d);
                },
                onSuccess: function(d) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "onSuccess", 2441);
_yuitest_coverline("build/loader-base/loader-base.js", 2442);
d.type = 'success';
                    _yuitest_coverline("build/loader-base/loader-base.js", 2443);
d.fn = self._onSuccess;
                    _yuitest_coverline("build/loader-base/loader-base.js", 2444);
complete.call(self, d);
                },
                onFailure: function(d) {
                    _yuitest_coverfunc("build/loader-base/loader-base.js", "onFailure", 2446);
_yuitest_coverline("build/loader-base/loader-base.js", 2447);
d.type = 'failure';
                    _yuitest_coverline("build/loader-base/loader-base.js", 2448);
d.fn = self._onFailure;
                    _yuitest_coverline("build/loader-base/loader-base.js", 2449);
complete.call(self, d);
                }
            });
        }
    },
    /**
    * Once a loader operation is completely finished, process any additional queued items.
    * @method _continue
    * @private
    */
    _continue: function() {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_continue", 2459);
_yuitest_coverline("build/loader-base/loader-base.js", 2460);
if (!(_queue.running) && _queue.size() > 0) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2461);
_queue.running = true;
            _yuitest_coverline("build/loader-base/loader-base.js", 2462);
_queue.next()();
        }
    },

    /**
     * inserts the requested modules and their dependencies.
     * <code>type</code> can be "js" or "css".  Both script and
     * css are inserted if type is not provided.
     * @method insert
     * @param {object} o optional options object.
     * @param {string} type the type of dependency to insert.
     */
    insert: function(o, type, skipsort) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "insert", 2474);
_yuitest_coverline("build/loader-base/loader-base.js", 2475);
var self = this, copy = Y.merge(this);
        _yuitest_coverline("build/loader-base/loader-base.js", 2476);
delete copy.require;
        _yuitest_coverline("build/loader-base/loader-base.js", 2477);
delete copy.dirty;
        _yuitest_coverline("build/loader-base/loader-base.js", 2478);
_queue.add(function() {
            _yuitest_coverfunc("build/loader-base/loader-base.js", "(anonymous 6)", 2478);
_yuitest_coverline("build/loader-base/loader-base.js", 2479);
self._insert(copy, o, type, skipsort);
        });
        _yuitest_coverline("build/loader-base/loader-base.js", 2481);
this._continue();
    },

    /**
     * Executed every time a module is loaded, and if we are in a load
     * cycle, we attempt to load the next script.  Public so that it
     * is possible to call this if using a method other than
     * Y.register to determine when scripts are fully loaded
     * @method loadNext
     * @deprecated
     * @param {string} mname optional the name of the module that has
     * been loaded (which is usually why it is time to load the next
     * one).
     */
    loadNext: function() {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "loadNext", 2495);
_yuitest_coverline("build/loader-base/loader-base.js", 2496);
return;
    },

    /**
     * Apply filter defined for this instance to a url/path
     * @method _filter
     * @param {string} u the string to filter.
     * @param {string} name the name of the module, if we are processing
     * a single module as opposed to a combined url.
     * @return {string} the filtered string.
     * @private
     */
    _filter: function(u, name, group) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_filter", 2508);
_yuitest_coverline("build/loader-base/loader-base.js", 2509);
var f = this.filter,
            hasFilter = name && (name in this.filters),
            modFilter = hasFilter && this.filters[name],
            groupName = group || (this.moduleInfo[name] ? this.moduleInfo[name].group : null);

        _yuitest_coverline("build/loader-base/loader-base.js", 2514);
if (groupName && this.groups[groupName] && this.groups[groupName].filter) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2515);
modFilter = this.groups[groupName].filter;
            _yuitest_coverline("build/loader-base/loader-base.js", 2516);
hasFilter = true;
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2519);
if (u) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2520);
if (hasFilter) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2521);
f = (L.isString(modFilter)) ? this.FILTER_DEFS[modFilter.toUpperCase()] || null : modFilter;
            }
            _yuitest_coverline("build/loader-base/loader-base.js", 2523);
if (f) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2524);
u = u.replace(new RegExp(f.searchExp, 'g'), f.replaceStr);
            }
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2527);
return u;
    },

    /**
     * Generates the full url for a module
     * @method _url
     * @param {string} path the path fragment.
     * @param {String} name The name of the module
     * @param {String} [base=self.base] The base url to use
     * @return {string} the full url.
     * @private
     */
    _url: function(path, name, base) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "_url", 2539);
_yuitest_coverline("build/loader-base/loader-base.js", 2540);
return this._filter((base || this.base || '') + path, name);
    },
    /**
    * Returns an Object hash of file arrays built from `loader.sorted` or from an arbitrary list of sorted modules.
    * @method resolve
    * @param {Boolean} [calc=false] Perform a loader.calculate() before anything else
    * @param {Array} [s=loader.sorted] An override for the loader.sorted array
    * @return {Object} Object hash (js and css) of two arrays of file lists
    * @example This method can be used as an off-line dep calculator
    *
    *        var Y = YUI();
    *        var loader = new Y.Loader({
    *            filter: 'debug',
    *            base: '../../',
    *            root: 'build/',
    *            combine: true,
    *            require: ['node', 'dd', 'console']
    *        });
    *        var out = loader.resolve(true);
    *
    */
    resolve: function(calc, s) {

        _yuitest_coverfunc("build/loader-base/loader-base.js", "resolve", 2561);
_yuitest_coverline("build/loader-base/loader-base.js", 2563);
var len, i, m, url, group, groupName, j, frag,
            comboSource, comboSources, mods, comboBase,
            base, urls, u = [], tmpBase, baseLen, resCombos = {},
            self = this, comboSep, maxURLLength,
            inserted = (self.ignoreRegistered) ? {} : self.inserted,
            resolved = { js: [], jsMods: [], css: [], cssMods: [] },
            type = self.loadType || 'js', addSingle;

        _yuitest_coverline("build/loader-base/loader-base.js", 2571);
if (self.skin.overrides || self.skin.defaultSkin !== DEFAULT_SKIN || self.ignoreRegistered) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2572);
self._resetModules();
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2575);
if (calc) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2576);
self.calculate();
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2578);
s = s || self.sorted;

        _yuitest_coverline("build/loader-base/loader-base.js", 2580);
addSingle = function(m) {

            _yuitest_coverfunc("build/loader-base/loader-base.js", "addSingle", 2580);
_yuitest_coverline("build/loader-base/loader-base.js", 2582);
if (m) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2583);
group = (m.group && self.groups[m.group]) || NOT_FOUND;

                //Always assume it's async
                _yuitest_coverline("build/loader-base/loader-base.js", 2586);
if (group.async === false) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2587);
m.async = group.async;
                }

                _yuitest_coverline("build/loader-base/loader-base.js", 2590);
url = (m.fullpath) ? self._filter(m.fullpath, s[i]) :
                      self._url(m.path, s[i], group.base || m.base);

                _yuitest_coverline("build/loader-base/loader-base.js", 2593);
if (m.attributes || m.async === false) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2594);
url = {
                        url: url,
                        async: m.async
                    };
                    _yuitest_coverline("build/loader-base/loader-base.js", 2598);
if (m.attributes) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2599);
url.attributes = m.attributes;
                    }
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 2602);
resolved[m.type].push(url);
                _yuitest_coverline("build/loader-base/loader-base.js", 2603);
resolved[m.type + 'Mods'].push(m);
            } else {
            }

        };

        _yuitest_coverline("build/loader-base/loader-base.js", 2609);
len = s.length;

        // the default combo base
        _yuitest_coverline("build/loader-base/loader-base.js", 2612);
comboBase = self.comboBase;

        _yuitest_coverline("build/loader-base/loader-base.js", 2614);
url = comboBase;

        _yuitest_coverline("build/loader-base/loader-base.js", 2616);
comboSources = {};

        _yuitest_coverline("build/loader-base/loader-base.js", 2618);
for (i = 0; i < len; i++) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2619);
comboSource = comboBase;
            _yuitest_coverline("build/loader-base/loader-base.js", 2620);
m = self.getModule(s[i]);
            _yuitest_coverline("build/loader-base/loader-base.js", 2621);
groupName = m && m.group;
            _yuitest_coverline("build/loader-base/loader-base.js", 2622);
group = self.groups[groupName];
            _yuitest_coverline("build/loader-base/loader-base.js", 2623);
if (groupName && group) {

                _yuitest_coverline("build/loader-base/loader-base.js", 2625);
if (!group.combine || m.fullpath) {
                    //This is not a combo module, skip it and load it singly later.
                    _yuitest_coverline("build/loader-base/loader-base.js", 2627);
addSingle(m);
                    _yuitest_coverline("build/loader-base/loader-base.js", 2628);
continue;
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 2630);
m.combine = true;
                _yuitest_coverline("build/loader-base/loader-base.js", 2631);
if (group.comboBase) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2632);
comboSource = group.comboBase;
                }

                _yuitest_coverline("build/loader-base/loader-base.js", 2635);
if ("root" in group && L.isValue(group.root)) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2636);
m.root = group.root;
                }
                _yuitest_coverline("build/loader-base/loader-base.js", 2638);
m.comboSep = group.comboSep || self.comboSep;
                _yuitest_coverline("build/loader-base/loader-base.js", 2639);
m.maxURLLength = group.maxURLLength || self.maxURLLength;
            } else {
                _yuitest_coverline("build/loader-base/loader-base.js", 2641);
if (!self.combine) {
                    //This is not a combo module, skip it and load it singly later.
                    _yuitest_coverline("build/loader-base/loader-base.js", 2643);
addSingle(m);
                    _yuitest_coverline("build/loader-base/loader-base.js", 2644);
continue;
                }
            }

            _yuitest_coverline("build/loader-base/loader-base.js", 2648);
comboSources[comboSource] = comboSources[comboSource] || [];
            _yuitest_coverline("build/loader-base/loader-base.js", 2649);
comboSources[comboSource].push(m);
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2652);
for (j in comboSources) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2653);
if (comboSources.hasOwnProperty(j)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2654);
resCombos[j] = resCombos[j] || { js: [], jsMods: [], css: [], cssMods: [] };
                _yuitest_coverline("build/loader-base/loader-base.js", 2655);
url = j;
                _yuitest_coverline("build/loader-base/loader-base.js", 2656);
mods = comboSources[j];
                _yuitest_coverline("build/loader-base/loader-base.js", 2657);
len = mods.length;

                _yuitest_coverline("build/loader-base/loader-base.js", 2659);
if (len) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2660);
for (i = 0; i < len; i++) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2661);
if (inserted[mods[i]]) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 2662);
continue;
                        }
                        _yuitest_coverline("build/loader-base/loader-base.js", 2664);
m = mods[i];
                        // Do not try to combine non-yui JS unless combo def
                        // is found
                        _yuitest_coverline("build/loader-base/loader-base.js", 2667);
if (m && (m.combine || !m.ext)) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 2668);
resCombos[j].comboSep = m.comboSep;
                            _yuitest_coverline("build/loader-base/loader-base.js", 2669);
resCombos[j].group = m.group;
                            _yuitest_coverline("build/loader-base/loader-base.js", 2670);
resCombos[j].maxURLLength = m.maxURLLength;
                            _yuitest_coverline("build/loader-base/loader-base.js", 2671);
frag = ((L.isValue(m.root)) ? m.root : self.root) + (m.path || m.fullpath);
                            _yuitest_coverline("build/loader-base/loader-base.js", 2672);
frag = self._filter(frag, m.name);
                            _yuitest_coverline("build/loader-base/loader-base.js", 2673);
resCombos[j][m.type].push(frag);
                            _yuitest_coverline("build/loader-base/loader-base.js", 2674);
resCombos[j][m.type + 'Mods'].push(m);
                        } else {
                            //Add them to the next process..
                            _yuitest_coverline("build/loader-base/loader-base.js", 2677);
if (mods[i]) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 2678);
addSingle(mods[i]);
                            }
                        }

                    }
                }
            }
        }


        _yuitest_coverline("build/loader-base/loader-base.js", 2688);
for (j in resCombos) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2689);
if (resCombos.hasOwnProperty(j)) {
                _yuitest_coverline("build/loader-base/loader-base.js", 2690);
base = j;
                _yuitest_coverline("build/loader-base/loader-base.js", 2691);
comboSep = resCombos[base].comboSep || self.comboSep;
                _yuitest_coverline("build/loader-base/loader-base.js", 2692);
maxURLLength = resCombos[base].maxURLLength || self.maxURLLength;
                _yuitest_coverline("build/loader-base/loader-base.js", 2693);
for (type in resCombos[base]) {
                    _yuitest_coverline("build/loader-base/loader-base.js", 2694);
if (type === JS || type === CSS) {
                        _yuitest_coverline("build/loader-base/loader-base.js", 2695);
urls = resCombos[base][type];
                        _yuitest_coverline("build/loader-base/loader-base.js", 2696);
mods = resCombos[base][type + 'Mods'];
                        _yuitest_coverline("build/loader-base/loader-base.js", 2697);
len = urls.length;
                        _yuitest_coverline("build/loader-base/loader-base.js", 2698);
tmpBase = base + urls.join(comboSep);
                        _yuitest_coverline("build/loader-base/loader-base.js", 2699);
baseLen = tmpBase.length;
                        _yuitest_coverline("build/loader-base/loader-base.js", 2700);
if (maxURLLength <= base.length) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 2701);
maxURLLength = MAX_URL_LENGTH;
                        }

                        _yuitest_coverline("build/loader-base/loader-base.js", 2704);
if (len) {
                            _yuitest_coverline("build/loader-base/loader-base.js", 2705);
if (baseLen > maxURLLength) {
                                _yuitest_coverline("build/loader-base/loader-base.js", 2706);
u = [];
                                _yuitest_coverline("build/loader-base/loader-base.js", 2707);
for (s = 0; s < len; s++) {
                                    _yuitest_coverline("build/loader-base/loader-base.js", 2708);
u.push(urls[s]);
                                    _yuitest_coverline("build/loader-base/loader-base.js", 2709);
tmpBase = base + u.join(comboSep);

                                    _yuitest_coverline("build/loader-base/loader-base.js", 2711);
if (tmpBase.length > maxURLLength) {
                                        _yuitest_coverline("build/loader-base/loader-base.js", 2712);
m = u.pop();
                                        _yuitest_coverline("build/loader-base/loader-base.js", 2713);
tmpBase = base + u.join(comboSep);
                                        _yuitest_coverline("build/loader-base/loader-base.js", 2714);
resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));
                                        _yuitest_coverline("build/loader-base/loader-base.js", 2715);
u = [];
                                        _yuitest_coverline("build/loader-base/loader-base.js", 2716);
if (m) {
                                            _yuitest_coverline("build/loader-base/loader-base.js", 2717);
u.push(m);
                                        }
                                    }
                                }
                                _yuitest_coverline("build/loader-base/loader-base.js", 2721);
if (u.length) {
                                    _yuitest_coverline("build/loader-base/loader-base.js", 2722);
tmpBase = base + u.join(comboSep);
                                    _yuitest_coverline("build/loader-base/loader-base.js", 2723);
resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));
                                }
                            } else {
                                _yuitest_coverline("build/loader-base/loader-base.js", 2726);
resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));
                            }
                        }
                        _yuitest_coverline("build/loader-base/loader-base.js", 2729);
resolved[type + 'Mods'] = resolved[type + 'Mods'].concat(mods);
                    }
                }
            }
        }

        _yuitest_coverline("build/loader-base/loader-base.js", 2735);
resCombos = null;

        _yuitest_coverline("build/loader-base/loader-base.js", 2737);
return resolved;
    },
    /**
    Shortcut to calculate, resolve and load all modules.

        var loader = new Y.Loader({
            ignoreRegistered: true,
            modules: {
                mod: {
                    path: 'mod.js'
                }
            },
            requires: [ 'mod' ]
        });
        loader.load(function() {
            console.log('All modules have loaded..');
        });


    @method load
    @param {Callback} cb Executed after all load operations are complete
    */
    load: function(cb) {
        _yuitest_coverfunc("build/loader-base/loader-base.js", "load", 2759);
_yuitest_coverline("build/loader-base/loader-base.js", 2760);
if (!cb) {
            _yuitest_coverline("build/loader-base/loader-base.js", 2761);
return;
        }
        _yuitest_coverline("build/loader-base/loader-base.js", 2763);
var self = this,
            out = self.resolve(true);

        _yuitest_coverline("build/loader-base/loader-base.js", 2766);
self.data = out;

        _yuitest_coverline("build/loader-base/loader-base.js", 2768);
self.onEnd = function() {
            _yuitest_coverfunc("build/loader-base/loader-base.js", "onEnd", 2768);
_yuitest_coverline("build/loader-base/loader-base.js", 2769);
cb.apply(self.context || self, arguments);
        };

        _yuitest_coverline("build/loader-base/loader-base.js", 2772);
self.insert();
    }
};



}, '@VERSION@', {"requires": ["get", "features"]});
