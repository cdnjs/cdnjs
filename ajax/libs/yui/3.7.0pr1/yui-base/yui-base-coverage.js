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
_yuitest_coverage["/build/yui-base/yui-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/yui-base/yui-base.js",
    code: []
};
_yuitest_coverage["/build/yui-base/yui-base.js"].code=["/**"," * The YUI module contains the components required for building the YUI seed"," * file.  This includes the script loading mechanism, a simple queue, and"," * the core utilities for the library."," * @module yui"," * @main yui"," * @submodule yui-base"," */","","if (typeof YUI != 'undefined') {","    YUI._YUI = YUI;","}","","/**","The YUI global namespace object.  If YUI is already defined, the","existing YUI object will not be overwritten so that defined","namespaces are preserved.  It is the constructor for the object","the end user interacts with.  As indicated below, each instance","has full custom event support, but only if the event system","is available.  This is a self-instantiable factory function.  You","can invoke it directly like this:","","     YUI().use('*', function(Y) {","         // ready","     });","","But it also works like this:","","     var Y = YUI();","","Configuring the YUI object:","","    YUI({","        debug: true,","        combine: false","    }).use('node', function(Y) {","        //Node is ready to use","    });","","See the API docs for the <a href=\"config.html\">Config</a> class","for the complete list of supported configuration properties accepted","by the YUI constuctor.","","@class YUI","@constructor","@global","@uses EventTarget","@param [o]* {Object} 0..n optional configuration objects.  these values","are store in Y.config.  See <a href=\"config.html\">Config</a> for the list of supported","properties.","*/","    /*global YUI*/","    /*global YUI_config*/","    var YUI = function() {","        var i = 0,","            Y = this,","            args = arguments,","            l = args.length,","            instanceOf = function(o, type) {","                return (o && o.hasOwnProperty && (o instanceof type));","            },","            gconf = (typeof YUI_config !== 'undefined') && YUI_config;","","        if (!(instanceOf(Y, YUI))) {","            Y = new YUI();","        } else {","            // set up the core environment","            Y._init();","","            /**","                YUI.GlobalConfig is a master configuration that might span","                multiple contexts in a non-browser environment.  It is applied","                first to all instances in all contexts.","                @property GlobalConfig","                @type {Object}","                @global","                @static","                @example","","","                    YUI.GlobalConfig = {","                        filter: 'debug'","                    };","","                    YUI().use('node', function(Y) {","                        //debug files used here","                    });","","                    YUI({","                        filter: 'min'","                    }).use('node', function(Y) {","                        //min files used here","                    });","","            */","            if (YUI.GlobalConfig) {","                Y.applyConfig(YUI.GlobalConfig);","            }","","            /**","                YUI_config is a page-level config.  It is applied to all","                instances created on the page.  This is applied after","                YUI.GlobalConfig, and before the instance level configuration","                objects.","                @global","                @property YUI_config","                @type {Object}","                @example","","","                    //Single global var to include before YUI seed file","                    YUI_config = {","                        filter: 'debug'","                    };","","                    YUI().use('node', function(Y) {","                        //debug files used here","                    });","","                    YUI({","                        filter: 'min'","                    }).use('node', function(Y) {","                        //min files used here","                    });","            */","            if (gconf) {","                Y.applyConfig(gconf);","            }","","            // bind the specified additional modules for this instance","            if (!l) {","                Y._setup();","            }","        }","","        if (l) {","            // Each instance can accept one or more configuration objects.","            // These are applied after YUI.GlobalConfig and YUI_Config,","            // overriding values set in those config files if there is a '","            // matching property.","            for (; i < l; i++) {","                Y.applyConfig(args[i]);","            }","","            Y._setup();","        }","","        Y.instanceOf = instanceOf;","","        return Y;","    };","","(function() {","","    var proto, prop,","        VERSION = '@VERSION@',","        PERIOD = '.',","        BASE = 'http://yui.yahooapis.com/',","        /*","            These CSS class names can't be generated by","            getClassName since it is not available at the","            time they are being used.","        */","        DOC_LABEL = 'yui3-js-enabled',","        CSS_STAMP_EL = 'yui3-css-stamp',","        NOOP = function() {},","        SLICE = Array.prototype.slice,","        APPLY_TO_AUTH = { 'io.xdrReady': 1,   // the functions applyTo","                          'io.xdrResponse': 1,   // can call. this should","                          'SWF.eventHandler': 1 }, // be done at build time","        hasWin = (typeof window != 'undefined'),","        win = (hasWin) ? window : null,","        doc = (hasWin) ? win.document : null,","        docEl = doc && doc.documentElement,","        docClass = docEl && docEl.className,","        instances = {},","        time = new Date().getTime(),","        add = function(el, type, fn, capture) {","            if (el && el.addEventListener) {","                el.addEventListener(type, fn, capture);","            } else if (el && el.attachEvent) {","                el.attachEvent('on' + type, fn);","            }","        },","        remove = function(el, type, fn, capture) {","            if (el && el.removeEventListener) {","                // this can throw an uncaught exception in FF","                try {","                    el.removeEventListener(type, fn, capture);","                } catch (ex) {}","            } else if (el && el.detachEvent) {","                el.detachEvent('on' + type, fn);","            }","        },","        handleLoad = function() {","            YUI.Env.windowLoaded = true;","            YUI.Env.DOMReady = true;","            if (hasWin) {","                remove(window, 'load', handleLoad);","            }","        },","        getLoader = function(Y, o) {","            var loader = Y.Env._loader,","                lCore = [ 'loader-base' ],","                G_ENV = YUI.Env,","                mods = G_ENV.mods;","","            if (loader) {","                //loader._config(Y.config);","                loader.ignoreRegistered = false;","                loader.onEnd = null;","                loader.data = null;","                loader.required = [];","                loader.loadType = null;","            } else {","                loader = new Y.Loader(Y.config);","                Y.Env._loader = loader;","            }","            if (mods && mods.loader) {","                lCore = [].concat(lCore, YUI.Env.loaderExtras);","            }","            YUI.Env.core = Y.Array.dedupe([].concat(YUI.Env.core, lCore));","","            return loader;","        },","","        clobber = function(r, s) {","            for (var i in s) {","                if (s.hasOwnProperty(i)) {","                    r[i] = s[i];","                }","            }","        },","","        ALREADY_DONE = { success: true };","","//  Stamp the documentElement (HTML) with a class of \"yui-loaded\" to","//  enable styles that need to key off of JS being enabled.","if (docEl && docClass.indexOf(DOC_LABEL) == -1) {","    if (docClass) {","        docClass += ' ';","    }","    docClass += DOC_LABEL;","    docEl.className = docClass;","}","","if (VERSION.indexOf('@') > -1) {","    VERSION = '3.5.0'; // dev time hack for cdn test","}","","proto = {","    /**","     * Applies a new configuration object to the YUI instance config.","     * This will merge new group/module definitions, and will also","     * update the loader cache if necessary.  Updating Y.config directly","     * will not update the cache.","     * @method applyConfig","     * @param {Object} o the configuration object.","     * @since 3.2.0","     */","    applyConfig: function(o) {","","        o = o || NOOP;","","        var attr,","            name,","            // detail,","            config = this.config,","            mods = config.modules,","            groups = config.groups,","            aliases = config.aliases,","            loader = this.Env._loader;","","        for (name in o) {","            if (o.hasOwnProperty(name)) {","                attr = o[name];","                if (mods && name == 'modules') {","                    clobber(mods, attr);","                } else if (aliases && name == 'aliases') {","                    clobber(aliases, attr);","                } else if (groups && name == 'groups') {","                    clobber(groups, attr);","                } else if (name == 'win') {","                    config[name] = (attr && attr.contentWindow) || attr;","                    config.doc = config[name] ? config[name].document : null;","                } else if (name == '_yuid') {","                    // preserve the guid","                } else {","                    config[name] = attr;","                }","            }","        }","","        if (loader) {","            loader._config(o);","        }","","    },","    /**","    * Old way to apply a config to the instance (calls `applyConfig` under the hood)","    * @private","    * @method _config","    * @param {Object} o The config to apply","    */","    _config: function(o) {","        this.applyConfig(o);","    },","","    /**","     * Initialize this YUI instance","     * @private","     * @method _init","     */","    _init: function() {","        var filter, el,","            Y = this,","            G_ENV = YUI.Env,","            Env = Y.Env,","            prop;","","        /**","         * The version number of the YUI instance.","         * @property version","         * @type string","         */","        Y.version = VERSION;","","        if (!Env) {","            Y.Env = {","                core: ['get','features','intl-base','yui-log','yui-later'],","                loaderExtras: ['loader-rollup', 'loader-yui3'],","                mods: {}, // flat module map","                versions: {}, // version module map","                base: BASE,","                cdn: BASE + VERSION + '/build/',","                // bootstrapped: false,","                _idx: 0,","                _used: {},","                _attached: {},","                _missed: [],","                _yidx: 0,","                _uidx: 0,","                _guidp: 'y',","                _loaded: {},","                // serviced: {},","                // Regex in English:","                // I'll start at the \\b(simpleyui).","                // 1. Look in the test string for \"simpleyui\" or \"yui\" or","                //    \"yui-base\" or \"yui-davglass\" or \"yui-foobar\" that comes after a word break.  That is, it","                //    can't match \"foyui\" or \"i_heart_simpleyui\". This can be anywhere in the string.","                // 2. After #1 must come a forward slash followed by the string matched in #1, so","                //    \"yui-base/yui-base\" or \"simpleyui/simpleyui\" or \"yui-pants/yui-pants\".","                // 3. The second occurence of the #1 token can optionally be followed by \"-debug\" or \"-min\",","                //    so \"yui/yui-min\", \"yui/yui-debug\", \"yui-base/yui-base-debug\". NOT \"yui/yui-tshirt\".","                // 4. This is followed by \".js\", so \"yui/yui.js\", \"simpleyui/simpleyui-min.js\"","                // 0. Going back to the beginning, now. If all that stuff in 1-4 comes after a \"?\" in the string,","                //    then capture the junk between the LAST \"&\" and the string in 1-4.  So","                //    \"blah?foo/yui/yui.js\" will capture \"foo/\" and \"blah?some/thing.js&3.3.0/build/yui-davglass/yui-davglass.js\"","                //    will capture \"3.3.0/build/\"","                //","                // Regex Exploded:","                // (?:\\?             Find a ?","                //   (?:[^&]*&)      followed by 0..n characters followed by an &","                //   *               in fact, find as many sets of characters followed by a & as you can","                //   ([^&]*)         capture the stuff after the last & in \\1","                // )?                but it's ok if all this ?junk&more_junk stuff isn't even there","                // \\b(simpleyui|     after a word break find either the string \"simpleyui\" or","                //    yui(?:-\\w+)?   the string \"yui\" optionally followed by a -, then more characters","                // )                 and store the simpleyui or yui-* string in \\2","                // \\/\\2              then comes a / followed by the simpleyui or yui-* string in \\2","                // (?:-(min|debug))? optionally followed by \"-min\" or \"-debug\"","                // .js               and ending in \".js\"","                _BASE_RE: /(?:\\?(?:[^&]*&)*([^&]*))?\\b(simpleyui|yui(?:-\\w+)?)\\/\\2(?:-(min|debug))?\\.js/,","                parseBasePath: function(src, pattern) {","                    var match = src.match(pattern),","                        path, filter;","","                    if (match) {","                        path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));","","                        // this is to set up the path to the loader.  The file","                        // filter for loader should match the yui include.","                        filter = match[3];","","                        // extract correct path for mixed combo urls","                        // http://yuilibrary.com/projects/yui3/ticket/2528423","                        if (match[1]) {","                            path += '?' + match[1];","                        }","                        path = {","                            filter: filter,","                            path: path","                        }","                    }","                    return path;","                },","                getBase: G_ENV && G_ENV.getBase ||","                        function(pattern) {","                            var nodes = (doc && doc.getElementsByTagName('script')) || [],","                                path = Env.cdn, parsed,","                                i, len, src;","","                            for (i = 0, len = nodes.length; i < len; ++i) {","                                src = nodes[i].src;","                                if (src) {","                                    parsed = Y.Env.parseBasePath(src, pattern);","                                    if (parsed) {","                                        filter = parsed.filter;","                                        path = parsed.path;","                                        break;","                                    }","                                }","                            }","","                            // use CDN default","                            return path;","                        }","","            };","","            Env = Y.Env;","","            Env._loaded[VERSION] = {};","","            if (G_ENV && Y !== YUI) {","                Env._yidx = ++G_ENV._yidx;","                Env._guidp = ('yui_' + VERSION + '_' +","                             Env._yidx + '_' + time).replace(/\\./g, '_').replace(/-/g, '_');","            } else if (YUI._YUI) {","","                G_ENV = YUI._YUI.Env;","                Env._yidx += G_ENV._yidx;","                Env._uidx += G_ENV._uidx;","","                for (prop in G_ENV) {","                    if (!(prop in Env)) {","                        Env[prop] = G_ENV[prop];","                    }","                }","","                delete YUI._YUI;","            }","","            Y.id = Y.stamp(Y);","            instances[Y.id] = Y;","","        }","","        Y.constructor = YUI;","","        // configuration defaults","        Y.config = Y.config || {","            bootstrap: true,","            cacheUse: true,","            debug: true,","            doc: doc,","            fetchCSS: true,","            throwFail: true,","            useBrowserConsole: true,","            useNativeES5: true,","            win: win","        };","","        //Register the CSS stamp element","        if (doc && !doc.getElementById(CSS_STAMP_EL)) {","            el = doc.createElement('div');","            el.innerHTML = '<div id=\"' + CSS_STAMP_EL + '\" style=\"position: absolute !important; visibility: hidden !important\"></div>';","            YUI.Env.cssStampEl = el.firstChild;","            if (doc.body) {","                doc.body.appendChild(YUI.Env.cssStampEl);","            } else {","                docEl.insertBefore(YUI.Env.cssStampEl, docEl.firstChild);","            }","        }","","        Y.config.lang = Y.config.lang || 'en-US';","","        Y.config.base = YUI.config.base || Y.Env.getBase(Y.Env._BASE_RE);","","        if (!filter || (!('mindebug').indexOf(filter))) {","            filter = 'min';","        }","        filter = (filter) ? '-' + filter : filter;","        Y.config.loaderPath = YUI.config.loaderPath || 'loader/loader' + filter + '.js';","","    },","","    /**","     * Finishes the instance setup. Attaches whatever modules were defined","     * when the yui modules was registered.","     * @method _setup","     * @private","     */","    _setup: function(o) {","        var i, Y = this,","            core = [],","            mods = YUI.Env.mods,","            extras = Y.config.core || [].concat(YUI.Env.core); //Clone it..","","        for (i = 0; i < extras.length; i++) {","            if (mods[extras[i]]) {","                core.push(extras[i]);","            }","        }","","        Y._attach(['yui-base']);","        Y._attach(core);","","        if (Y.Loader) {","            getLoader(Y);","        }","","    },","","    /**","     * Executes a method on a YUI instance with","     * the specified id if the specified method is whitelisted.","     * @method applyTo","     * @param id {String} the YUI instance id.","     * @param method {String} the name of the method to exectute.","     * Ex: 'Object.keys'.","     * @param args {Array} the arguments to apply to the method.","     * @return {Object} the return value from the applied method or null.","     */","    applyTo: function(id, method, args) {","        if (!(method in APPLY_TO_AUTH)) {","            this.log(method + ': applyTo not allowed', 'warn', 'yui');","            return null;","        }","","        var instance = instances[id], nest, m, i;","        if (instance) {","            nest = method.split('.');","            m = instance;","            for (i = 0; i < nest.length; i = i + 1) {","                m = m[nest[i]];","                if (!m) {","                    this.log('applyTo not found: ' + method, 'warn', 'yui');","                }","            }","            return m && m.apply(instance, args);","        }","","        return null;","    },","","/**","Registers a module with the YUI global.  The easiest way to create a","first-class YUI module is to use the YUI component build tool.","","http://yuilibrary.com/projects/builder","","The build system will produce the `YUI.add` wrapper for you module, along","with any configuration info required for the module.","@method add","@param name {String} module name.","@param fn {Function} entry point into the module that is used to bind module to the YUI instance.","@param {YUI} fn.Y The YUI instance this module is executed in.","@param {String} fn.name The name of the module","@param version {String} version string.","@param details {Object} optional config data:","@param details.requires {Array} features that must be present before this module can be attached.","@param details.optional {Array} optional features that should be present if loadOptional"," is defined.  Note: modules are not often loaded this way in YUI 3,"," but this field is still useful to inform the user that certain"," features in the component will require additional dependencies.","@param details.use {Array} features that are included within this module which need to"," be attached automatically when this module is attached.  This"," supports the YUI 3 rollup system -- a module with submodules"," defined will need to have the submodules listed in the 'use'"," config.  The YUI component build tool does this for you.","@return {YUI} the YUI instance.","@example","","    YUI.add('davglass', function(Y, name) {","        Y.davglass = function() {","            alert('Dav was here!');","        };","    }, '3.4.0', { requires: ['yui-base', 'harley-davidson', 'mt-dew'] });","","*/","    add: function(name, fn, version, details) {","        details = details || {};","        var env = YUI.Env,","            mod = {","                name: name,","                fn: fn,","                version: version,","                details: details","            },","            //Instance hash so we don't apply it to the same instance twice","            applied = {},","            loader, inst,","            i, versions = env.versions;","","        env.mods[name] = mod;","        versions[version] = versions[version] || {};","        versions[version][name] = mod;","","        for (i in instances) {","            if (instances.hasOwnProperty(i)) {","                inst = instances[i];","                if (!applied[inst.id]) {","                    applied[inst.id] = true;","                    loader = inst.Env._loader;","                    if (loader) {","                        if (!loader.moduleInfo[name] || loader.moduleInfo[name].temp) {","                            loader.addModule(details, name);","                        }","                    }","                }","            }","        }","","        return this;","    },","","    /**","     * Executes the function associated with each required","     * module, binding the module to the YUI instance.","     * @param {Array} r The array of modules to attach","     * @param {Boolean} [moot=false] Don't throw a warning if the module is not attached","     * @method _attach","     * @private","     */","    _attach: function(r, moot) {","        var i, name, mod, details, req, use, after,","            mods = YUI.Env.mods,","            aliases = YUI.Env.aliases,","            Y = this, j,","            cache = YUI.Env._renderedMods,","            loader = Y.Env._loader,","            done = Y.Env._attached,","            len = r.length, loader, def, go,","            c = [];","","        //Check for conditional modules (in a second+ instance) and add their requirements","        //TODO I hate this entire method, it needs to be fixed ASAP (3.5.0) ^davglass","        for (i = 0; i < len; i++) {","            name = r[i];","            mod = mods[name];","            c.push(name);","            if (loader && loader.conditions[name]) {","                for (j in loader.conditions[name]) {","                    if (loader.conditions[name].hasOwnProperty(j)) {","                        def = loader.conditions[name][j];","                        go = def && ((def.ua && Y.UA[def.ua]) || (def.test && def.test(Y)));","                        if (go) {","                            c.push(def.name);","                        }","                    }","                }","            }","        }","        r = c;","        len = r.length;","","        for (i = 0; i < len; i++) {","            if (!done[r[i]]) {","                name = r[i];","                mod = mods[name];","","                if (aliases && aliases[name] && !mod) {","                    Y._attach(aliases[name]);","                    continue;","                }","                if (!mod) {","                    if (loader && loader.moduleInfo[name]) {","                        mod = loader.moduleInfo[name];","                        moot = true;","                    }","","","                    //if (!loader || !loader.moduleInfo[name]) {","                    //if ((!loader || !loader.moduleInfo[name]) && !moot) {","                    if (!moot && name) {","                        if ((name.indexOf('skin-') === -1) && (name.indexOf('css') === -1)) {","                            Y.Env._missed.push(name);","                            Y.Env._missed = Y.Array.dedupe(Y.Env._missed);","                            Y.message('NOT loaded: ' + name, 'warn', 'yui');","                        }","                    }","                } else {","                    done[name] = true;","                    //Don't like this, but in case a mod was asked for once, then we fetch it","                    //We need to remove it from the missed list ^davglass","                    for (j = 0; j < Y.Env._missed.length; j++) {","                        if (Y.Env._missed[j] === name) {","                            Y.message('Found: ' + name + ' (was reported as missing earlier)', 'warn', 'yui');","                            Y.Env._missed.splice(j, 1);","                        }","                    }","                    /*","                        If it's a temp module, we need to redo it's requirements if it's already loaded","                        since it may have been loaded by another instance and it's dependencies might","                        have been redefined inside the fetched file.","                    */","                    if (loader && cache && cache[name] && cache[name].temp) {","                        loader.getRequires(cache[name]);","                        req = [];","                        for (j in loader.moduleInfo[name].expanded_map) {","                            if (loader.moduleInfo[name].expanded_map.hasOwnProperty(j)) {","                                req.push(j);","                            }","                        }","                        Y._attach(req);","                    }","                    ","                    details = mod.details;","                    req = details.requires;","                    use = details.use;","                    after = details.after;","                    //Force Intl load if there is a language (Loader logic) @todo fix this shit","                    if (details.lang) {","                        req = req || [];","                        req.unshift('intl');","                    }","","                    if (req) {","                        for (j = 0; j < req.length; j++) {","                            if (!done[req[j]]) {","                                if (!Y._attach(req)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","                    if (after) {","                        for (j = 0; j < after.length; j++) {","                            if (!done[after[j]]) {","                                if (!Y._attach(after, true)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","                    if (mod.fn) {","                            if (Y.config.throwFail) {","                                mod.fn(Y, name);","                            } else {","                                try {","                                    mod.fn(Y, name);","                                } catch (e) {","                                    Y.error('Attach error: ' + name, e, name);","                                return false;","                            }","                        }","                    }","","                    if (use) {","                        for (j = 0; j < use.length; j++) {","                            if (!done[use[j]]) {","                                if (!Y._attach(use)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","","","                }","            }","        }","","        return true;","    },","    /**","    * Delays the `use` callback until another event has taken place. Like: window.onload, domready, contentready, available.","    * @private","    * @method _delayCallback","    * @param {Callback} cb The original `use` callback","    * @param {String|Object} until Either an event (load, domready) or an Object containing event/args keys for contentready/available","    */","    _delayCallback: function(cb, until) {","","        var Y = this,","            mod = ['event-base'];","","        until = (Y.Lang.isObject(until) ? until : { event: until });","","        if (until.event === 'load') {","            mod.push('event-synthetic');","        }","","        return function() {","            var args = arguments;","            Y._use(mod, function() {","                Y.on(until.event, function() {","                    args[1].delayUntil = until.event;","                    cb.apply(Y, args);","                }, until.args);","            });","        };","    },","","    /**","     * Attaches one or more modules to the YUI instance.  When this","     * is executed, the requirements are analyzed, and one of","     * several things can happen:","     *","     *  * All requirements are available on the page --  The modules","     *   are attached to the instance.  If supplied, the use callback","     *   is executed synchronously.","     *","     *  * Modules are missing, the Get utility is not available OR","     *   the 'bootstrap' config is false -- A warning is issued about","     *   the missing modules and all available modules are attached.","     *","     *  * Modules are missing, the Loader is not available but the Get","     *   utility is and boostrap is not false -- The loader is bootstrapped","     *   before doing the following....","     *","     *  * Modules are missing and the Loader is available -- The loader","     *   expands the dependency tree and fetches missing modules.  When","     *   the loader is finshed the callback supplied to use is executed","     *   asynchronously.","     *","     * @method use","     * @param modules* {String|Array} 1-n modules to bind (uses arguments array).","     * @param [callback] {Function} callback function executed when","     * the instance has the required functionality.  If included, it","     * must be the last parameter.","     * @param callback.Y {YUI} The `YUI` instance created for this sandbox","     * @param callback.status {Object} Object containing `success`, `msg` and `data` properties","     *","     * @example","     *      // loads and attaches dd and its dependencies","     *      YUI().use('dd', function(Y) {});","     *","     *      // loads and attaches dd and node as well as all of their dependencies (since 3.4.0)","     *      YUI().use(['dd', 'node'], function(Y) {});","     *","     *      // attaches all modules that are available on the page","     *      YUI().use('*', function(Y) {});","     *","     *      // intrinsic YUI gallery support (since 3.1.0)","     *      YUI().use('gallery-yql', function(Y) {});","     *","     *      // intrinsic YUI 2in3 support (since 3.1.0)","     *      YUI().use('yui2-datatable', function(Y) {});","     *","     * @return {YUI} the YUI instance.","     */","    use: function() {","        var args = SLICE.call(arguments, 0),","            callback = args[args.length - 1],","            Y = this,","            i = 0,","            a = [],","            name,","            Env = Y.Env,","            provisioned = true;","","        // The last argument supplied to use can be a load complete callback","        if (Y.Lang.isFunction(callback)) {","            args.pop();","            if (Y.config.delayUntil) {","                callback = Y._delayCallback(callback, Y.config.delayUntil);","            }","        } else {","            callback = null;","        }","        if (Y.Lang.isArray(args[0])) {","            args = args[0];","        }","","        if (Y.config.cacheUse) {","            while ((name = args[i++])) {","                if (!Env._attached[name]) {","                    provisioned = false;","                    break;","                }","            }","","            if (provisioned) {","                if (args.length) {","                }","                Y._notify(callback, ALREADY_DONE, args);","                return Y;","            }","        }","","        if (Y._loading) {","            Y._useQueue = Y._useQueue || new Y.Queue();","            Y._useQueue.add([args, callback]);","        } else {","            Y._use(args, function(Y, response) {","                Y._notify(callback, response, args);","            });","        }","","        return Y;","    },","    /**","    * Notify handler from Loader for attachment/load errors","    * @method _notify","    * @param callback {Function} The callback to pass to the `Y.config.loadErrorFn`","    * @param response {Object} The response returned from Loader","    * @param args {Array} The aruments passed from Loader","    * @private","    */","    _notify: function(callback, response, args) {","        if (!response.success && this.config.loadErrorFn) {","            this.config.loadErrorFn.call(this, this, callback, response, args);","        } else if (callback) {","            if (this.Env._missed && this.Env._missed.length) {","                response.msg = 'Missing modules: ' + this.Env._missed.join();","                response.success = false;","            }","            if (this.config.throwFail) {","                callback(this, response);","            } else {","                try {","                    callback(this, response);","                } catch (e) {","                    this.error('use callback error', e, args);","                }","            }","        }","    },","","    /**","    * This private method is called from the `use` method queue. To ensure that only one set of loading","    * logic is performed at a time.","    * @method _use","    * @private","    * @param args* {String} 1-n modules to bind (uses arguments array).","    * @param *callback {Function} callback function executed when","    * the instance has the required functionality.  If included, it","    * must be the last parameter.","    */","    _use: function(args, callback) {","","        if (!this.Array) {","            this._attach(['yui-base']);","        }","","        var len, loader, handleBoot, handleRLS,","            Y = this,","            G_ENV = YUI.Env,","            mods = G_ENV.mods,","            Env = Y.Env,","            used = Env._used,","            aliases = G_ENV.aliases,","            queue = G_ENV._loaderQueue,","            firstArg = args[0],","            YArray = Y.Array,","            config = Y.config,","            boot = config.bootstrap,","            missing = [],","            i,","            r = [],","            ret = true,","            fetchCSS = config.fetchCSS,","            process = function(names, skip) {","","                var i = 0, a = [], name, len, m, req, use;","","                if (!names.length) {","                    return;","                }","","                if (aliases) {","                    len = names.length;","                    for (i = 0; i < len; i++) {","                        if (aliases[names[i]] && !mods[names[i]]) {","                            a = [].concat(a, aliases[names[i]]);","                        } else {","                            a.push(names[i]);","                        }","                    }","                    names = a;","                }","                ","                len = names.length;","                ","                for (i = 0; i < len; i++) {","                    name = names[i];","                    if (!skip) {","                        r.push(name);","                    }","","                    // only attach a module once","                    if (used[name]) {","                        continue;","                    }","                    ","                    m = mods[name];","                    req = null;","                    use = null;","","                    if (m) {","                        used[name] = true;","                        req = m.details.requires;","                        use = m.details.use;","                    } else {","                        // CSS files don't register themselves, see if it has","                        // been loaded","                        if (!G_ENV._loaded[VERSION][name]) {","                            missing.push(name);","                        } else {","                            used[name] = true; // probably css","                        }","                    }","","                    // make sure requirements are attached","                    if (req && req.length) {","                        process(req);","                    }","","                    // make sure we grab the submodule dependencies too","                    if (use && use.length) {","                        process(use, 1);","                    }","                }","","            },","","            handleLoader = function(fromLoader) {","                var response = fromLoader || {","                        success: true,","                        msg: 'not dynamic'","                    },","                    redo, origMissing,","                    ret = true,","                    data = response.data;","","                Y._loading = false;","","                if (data) {","                    origMissing = missing;","                    missing = [];","                    r = [];","                    process(data);","                    redo = missing.length;","                    if (redo) {","                        if ([].concat(missing).sort().join() ==","                                origMissing.sort().join()) {","                            redo = false;","                        }","                    }","                }","","                if (redo && data) {","                    Y._loading = true;","                    Y._use(missing, function() {","                        if (Y._attach(data)) {","                            Y._notify(callback, response, data);","                        }","                    });","                } else {","                    if (data) {","                        ret = Y._attach(data);","                    }","                    if (ret) {","                        Y._notify(callback, response, args);","                    }","                }","","                if (Y._useQueue && Y._useQueue.size() && !Y._loading) {","                    Y._use.apply(Y, Y._useQueue.next());","                }","","            };","","","        // YUI().use('*'); // bind everything available","        if (firstArg === '*') {","            args = [];","            for (i in mods) {","                if (mods.hasOwnProperty(i)) {","                    args.push(i);","                }","            }","            ret = Y._attach(args);","            if (ret) {","                handleLoader();","            }","            return Y;","        }","","        if ((mods.loader || mods['loader-base']) && !Y.Loader) {","            Y._attach(['loader' + ((!mods.loader) ? '-base' : '')]);","        }","","","        // use loader to expand dependencies and sort the","        // requirements if it is available.","        if (boot && Y.Loader && args.length) {","            loader = getLoader(Y);","            loader.require(args);","            loader.ignoreRegistered = true;","            loader._boot = true;","            loader.calculate(null, (fetchCSS) ? null : 'js');","            args = loader.sorted;","            loader._boot = false;","        }","        ","        process(args);","","        len = missing.length;","","","        if (len) {","            missing = YArray.dedupe(missing);","            len = missing.length;","        }","","","        // dynamic load","        if (boot && len && Y.Loader) {","            Y._loading = true;","            loader = getLoader(Y);","            loader.onEnd = handleLoader;","            loader.context = Y;","            loader.data = args;","            loader.ignoreRegistered = false;","            loader.require(args);","            loader.insert(null, (fetchCSS) ? null : 'js');","","        } else if (boot && len && Y.Get && !Env.bootstrapped) {","","            Y._loading = true;","","            handleBoot = function() {","                Y._loading = false;","                queue.running = false;","                Env.bootstrapped = true;","                G_ENV._bootstrapping = false;","                if (Y._attach(['loader'])) {","                    Y._use(args, callback);","                }","            };","","            if (G_ENV._bootstrapping) {","                queue.add(handleBoot);","            } else {","                G_ENV._bootstrapping = true;","                Y.Get.script(config.base + config.loaderPath, {","                    onEnd: handleBoot","                });","            }","","        } else {","            ret = Y._attach(args);","            if (ret) {","                handleLoader();","            }","        }","","        return Y;","    },","","","    /**","    Adds a namespace object onto the YUI global if called statically.","","        // creates YUI.your.namespace.here as nested objects","        YUI.namespace(\"your.namespace.here\");","","    If called as a method on a YUI <em>instance</em>, it creates the","    namespace on the instance.","","         // creates Y.property.package","         Y.namespace(\"property.package\");","","    Dots in the input string cause `namespace` to create nested objects for","    each token. If any part of the requested namespace already exists, the","    current object will be left in place.  This allows multiple calls to","    `namespace` to preserve existing namespaced properties.","","    If the first token in the namespace string is \"YAHOO\", the token is","    discarded.","","    Be careful with namespace tokens. Reserved words may work in some browsers","    and not others. For instance, the following will fail in some browsers","    because the supported version of JavaScript reserves the word \"long\":","","         Y.namespace(\"really.long.nested.namespace\");","","    <em>Note: If you pass multiple arguments to create multiple namespaces, only","    the last one created is returned from this function.</em>","","    @method namespace","    @param  {String} namespace* namespaces to create.","    @return {Object}  A reference to the last namespace object created.","    **/","    namespace: function() {","        var a = arguments, o, i = 0, j, d, arg;","","        for (; i < a.length; i++) {","            o = this; //Reset base object per argument or it will get reused from the last","            arg = a[i];","            if (arg.indexOf(PERIOD) > -1) { //Skip this if no \".\" is present","                d = arg.split(PERIOD);","                for (j = (d[0] == 'YAHOO') ? 1 : 0; j < d.length; j++) {","                    o[d[j]] = o[d[j]] || {};","                    o = o[d[j]];","                }","            } else {","                o[arg] = o[arg] || {};","                o = o[arg]; //Reset base object to the new object so it's returned","            }","        }","        return o;","    },","","    // this is replaced if the log module is included","    log: NOOP,","    message: NOOP,","    // this is replaced if the dump module is included","    dump: function (o) { return ''+o; },","","    /**","     * Report an error.  The reporting mechanism is controlled by","     * the `throwFail` configuration attribute.  If throwFail is","     * not specified, the message is written to the Logger, otherwise","     * a JS error is thrown. If an `errorFn` is specified in the config","     * it must return `true` to keep the error from being thrown.","     * @method error","     * @param msg {String} the error message.","     * @param e {Error|String} Optional JS error that was caught, or an error string.","     * @param src Optional additional info (passed to `Y.config.errorFn` and `Y.message`)","     * and `throwFail` is specified, this error will be re-thrown.","     * @return {YUI} this YUI instance.","     */","    error: function(msg, e, src) {","        //TODO Add check for window.onerror here","","        var Y = this, ret;","","        if (Y.config.errorFn) {","            ret = Y.config.errorFn.apply(Y, arguments);","        }","","        if (!ret) {","            throw (e || new Error(msg));","        } else {","            Y.message(msg, 'error', ''+src); // don't scrub this one","        }","","        return Y;","    },","","    /**","     * Generate an id that is unique among all YUI instances","     * @method guid","     * @param pre {String} optional guid prefix.","     * @return {String} the guid.","     */","    guid: function(pre) {","        var id = this.Env._guidp + '_' + (++this.Env._uidx);","        return (pre) ? (pre + id) : id;","    },","","    /**","     * Returns a `guid` associated with an object.  If the object","     * does not have one, a new one is created unless `readOnly`","     * is specified.","     * @method stamp","     * @param o {Object} The object to stamp.","     * @param readOnly {Boolean} if `true`, a valid guid will only","     * be returned if the object has one assigned to it.","     * @return {String} The object's guid or null.","     */","    stamp: function(o, readOnly) {","        var uid;","        if (!o) {","            return o;","        }","","        // IE generates its own unique ID for dom nodes","        // The uniqueID property of a document node returns a new ID","        if (o.uniqueID && o.nodeType && o.nodeType !== 9) {","            uid = o.uniqueID;","        } else {","            uid = (typeof o === 'string') ? o : o._yuid;","        }","","        if (!uid) {","            uid = this.guid();","            if (!readOnly) {","                try {","                    o._yuid = uid;","                } catch (e) {","                    uid = null;","                }","            }","        }","        return uid;","    },","","    /**","     * Destroys the YUI instance","     * @method destroy","     * @since 3.3.0","     */","    destroy: function() {","        var Y = this;","        if (Y.Event) {","            Y.Event._unload();","        }","        delete instances[Y.id];","        delete Y.Env;","        delete Y.config;","    }","","    /**","     * instanceof check for objects that works around","     * memory leak in IE when the item tested is","     * window/document","     * @method instanceOf","     * @param o {Object} The object to check.","     * @param type {Object} The class to check against.","     * @since 3.3.0","     */","};","","    YUI.prototype = proto;","","    // inheritance utilities are not available yet","    for (prop in proto) {","        if (proto.hasOwnProperty(prop)) {","            YUI[prop] = proto[prop];","        }","    }","","    /**","Static method on the Global YUI object to apply a config to all YUI instances.","It's main use case is \"mashups\" where several third party scripts are trying to write to","a global YUI config at the same time. This way they can all call `YUI.applyConfig({})` instead of","overwriting other scripts configs.","@static","@since 3.5.0","@method applyConfig","@param {Object} o the configuration object.","@example","","    YUI.applyConfig({","        modules: {","            davglass: {","                fullpath: './davglass.js'","            }","        }","    });","","    YUI.applyConfig({","        modules: {","            foo: {","                fullpath: './foo.js'","            }","        }","    });","","    YUI().use('davglass', function(Y) {","        //Module davglass will be available here..","    });","","    */","    YUI.applyConfig = function(o) {","        if (!o) {","            return;","        }","        //If there is a GlobalConfig, apply it first to set the defaults","        if (YUI.GlobalConfig) {","            this.prototype.applyConfig.call(this, YUI.GlobalConfig);","        }","        //Apply this config to it","        this.prototype.applyConfig.call(this, o);","        //Reset GlobalConfig to the combined config","        YUI.GlobalConfig = this.config;","    };","","    // set up the environment","    YUI._init();","","    if (hasWin) {","        // add a window load event at load time so we can capture","        // the case where it fires before dynamic loading is","        // complete.","        add(window, 'load', handleLoad);","    } else {","        handleLoad();","    }","","    YUI.Env.add = add;","    YUI.Env.remove = remove;","","    /*global exports*/","    // Support the CommonJS method for exporting our single global","    if (typeof exports == 'object') {","        exports.YUI = YUI;","    }","","}());","","","/**"," * The config object contains all of the configuration options for"," * the `YUI` instance.  This object is supplied by the implementer"," * when instantiating a `YUI` instance.  Some properties have default"," * values if they are not supplied by the implementer.  This should"," * not be updated directly because some values are cached.  Use"," * `applyConfig()` to update the config object on a YUI instance that"," * has already been configured."," *"," * @class config"," * @static"," */","","/**"," * Allows the YUI seed file to fetch the loader component and library"," * metadata to dynamically load additional dependencies."," *"," * @property bootstrap"," * @type boolean"," * @default true"," */","","/**"," * Turns on writing Ylog messages to the browser console."," *"," * @property debug"," * @type boolean"," * @default true"," */","","/**"," * Log to the browser console if debug is on and the browser has a"," * supported console."," *"," * @property useBrowserConsole"," * @type boolean"," * @default true"," */","","/**"," * A hash of log sources that should be logged.  If specified, only"," * log messages from these sources will be logged."," *"," * @property logInclude"," * @type object"," */","","/**"," * A hash of log sources that should be not be logged.  If specified,"," * all sources are logged if not on this list."," *"," * @property logExclude"," * @type object"," */","","/**"," * Set to true if the yui seed file was dynamically loaded in"," * order to bootstrap components relying on the window load event"," * and the `domready` custom event."," *"," * @property injected"," * @type boolean"," * @default false"," */","","/**"," * If `throwFail` is set, `Y.error` will generate or re-throw a JS Error."," * Otherwise the failure is logged."," *"," * @property throwFail"," * @type boolean"," * @default true"," */","","/**"," * The window/frame that this instance should operate in."," *"," * @property win"," * @type Window"," * @default the window hosting YUI"," */","","/**"," * The document associated with the 'win' configuration."," *"," * @property doc"," * @type Document"," * @default the document hosting YUI"," */","","/**"," * A list of modules that defines the YUI core (overrides the default list)."," *"," * @property core"," * @type Array"," * @default [ get,features,intl-base,yui-log,yui-later,loader-base, loader-rollup, loader-yui3 ]"," */","","/**"," * A list of languages in order of preference. This list is matched against"," * the list of available languages in modules that the YUI instance uses to"," * determine the best possible localization of language sensitive modules."," * Languages are represented using BCP 47 language tags, such as \"en-GB\" for"," * English as used in the United Kingdom, or \"zh-Hans-CN\" for simplified"," * Chinese as used in China. The list can be provided as a comma-separated"," * list or as an array."," *"," * @property lang"," * @type string|string[]"," */","","/**"," * The default date format"," * @property dateFormat"," * @type string"," * @deprecated use configuration in `DataType.Date.format()` instead."," */","","/**"," * The default locale"," * @property locale"," * @type string"," * @deprecated use `config.lang` instead."," */","","/**"," * The default interval when polling in milliseconds."," * @property pollInterval"," * @type int"," * @default 20"," */","","/**"," * The number of dynamic nodes to insert by default before"," * automatically removing them.  This applies to script nodes"," * because removing the node will not make the evaluated script"," * unavailable.  Dynamic CSS is not auto purged, because removing"," * a linked style sheet will also remove the style definitions."," * @property purgethreshold"," * @type int"," * @default 20"," */","","/**"," * The default interval when polling in milliseconds."," * @property windowResizeDelay"," * @type int"," * @default 40"," */","","/**"," * Base directory for dynamic loading"," * @property base"," * @type string"," */","","/*"," * The secure base dir (not implemented)"," * For dynamic loading."," * @property secureBase"," * @type string"," */","","/**"," * The YUI combo service base dir. Ex: `http://yui.yahooapis.com/combo?`"," * For dynamic loading."," * @property comboBase"," * @type string"," */","","/**"," * The root path to prepend to module path for the combo service."," * Ex: 3.0.0b1/build/"," * For dynamic loading."," * @property root"," * @type string"," */","","/**"," * A filter to apply to result urls.  This filter will modify the default"," * path for all modules.  The default path for the YUI library is the"," * minified version of the files (e.g., event-min.js).  The filter property"," * can be a predefined filter or a custom filter.  The valid predefined"," * filters are:"," * <dl>"," *  <dt>DEBUG</dt>"," *  <dd>Selects the debug versions of the library (e.g., event-debug.js)."," *      This option will automatically include the Logger widget</dd>"," *  <dt>RAW</dt>"," *  <dd>Selects the non-minified version of the library (e.g., event.js).</dd>"," * </dl>"," * You can also define a custom filter, which must be an object literal"," * containing a search expression and a replace string:"," *"," *      myFilter: {"," *          'searchExp': \"-min\\\\.js\","," *          'replaceStr': \"-debug.js\""," *      }"," *"," * For dynamic loading."," *"," * @property filter"," * @type string|object"," */","","/**"," * The `skin` config let's you configure application level skin"," * customizations.  It contains the following attributes which"," * can be specified to override the defaults:"," *"," *      // The default skin, which is automatically applied if not"," *      // overriden by a component-specific skin definition."," *      // Change this in to apply a different skin globally"," *      defaultSkin: 'sam',"," *"," *      // This is combined with the loader base property to get"," *      // the default root directory for a skin."," *      base: 'assets/skins/',"," *"," *      // Any component-specific overrides can be specified here,"," *      // making it possible to load different skins for different"," *      // components.  It is possible to load more than one skin"," *      // for a given component as well."," *      overrides: {"," *          slider: ['capsule', 'round']"," *      }"," *"," * For dynamic loading."," *"," *  @property skin"," */","","/**"," * Hash of per-component filter specification.  If specified for a given"," * component, this overrides the filter config."," *"," * For dynamic loading."," *"," * @property filters"," */","","/**"," * Use the YUI combo service to reduce the number of http connections"," * required to load your dependencies.  Turning this off will"," * disable combo handling for YUI and all module groups configured"," * with a combo service."," *"," * For dynamic loading."," *"," * @property combine"," * @type boolean"," * @default true if 'base' is not supplied, false if it is."," */","","/**"," * A list of modules that should never be dynamically loaded"," *"," * @property ignore"," * @type string[]"," */","","/**"," * A list of modules that should always be loaded when required, even if already"," * present on the page."," *"," * @property force"," * @type string[]"," */","","/**"," * Node or id for a node that should be used as the insertion point for new"," * nodes.  For dynamic loading."," *"," * @property insertBefore"," * @type string"," */","","/**"," * Object literal containing attributes to add to dynamically loaded script"," * nodes."," * @property jsAttributes"," * @type string"," */","","/**"," * Object literal containing attributes to add to dynamically loaded link"," * nodes."," * @property cssAttributes"," * @type string"," */","","/**"," * Number of milliseconds before a timeout occurs when dynamically"," * loading nodes. If not set, there is no timeout."," * @property timeout"," * @type int"," */","","/**"," * Callback for the 'CSSComplete' event.  When dynamically loading YUI"," * components with CSS, this property fires when the CSS is finished"," * loading but script loading is still ongoing.  This provides an"," * opportunity to enhance the presentation of a loading page a little"," * bit before the entire loading process is done."," *"," * @property onCSS"," * @type function"," */","","/**"," * A hash of module definitions to add to the list of YUI components."," * These components can then be dynamically loaded side by side with"," * YUI via the `use()` method. This is a hash, the key is the module"," * name, and the value is an object literal specifying the metdata"," * for the module.  See `Loader.addModule` for the supported module"," * metadata fields.  Also see groups, which provides a way to"," * configure the base and combo spec for a set of modules."," *"," *      modules: {"," *          mymod1: {"," *              requires: ['node'],"," *              fullpath: '/mymod1/mymod1.js'"," *          },"," *          mymod2: {"," *              requires: ['mymod1'],"," *              fullpath: '/mymod2/mymod2.js'"," *          },"," *          mymod3: '/js/mymod3.js',"," *          mycssmod: '/css/mycssmod.css'"," *      }"," *"," *"," * @property modules"," * @type object"," */","","/**"," * Aliases are dynamic groups of modules that can be used as"," * shortcuts."," *"," *      YUI({"," *          aliases: {"," *              davglass: [ 'node', 'yql', 'dd' ],"," *              mine: [ 'davglass', 'autocomplete']"," *          }"," *      }).use('mine', function(Y) {"," *          //Node, YQL, DD &amp; AutoComplete available here.."," *      });"," *"," * @property aliases"," * @type object"," */","","/**"," * A hash of module group definitions.  It for each group you"," * can specify a list of modules and the base path and"," * combo spec to use when dynamically loading the modules."," *"," *      groups: {"," *          yui2: {"," *              // specify whether or not this group has a combo service"," *              combine: true,"," *"," *              // The comboSeperator to use with this group's combo handler"," *              comboSep: ';',"," *"," *              // The maxURLLength for this server"," *              maxURLLength: 500,"," *"," *              // the base path for non-combo paths"," *              base: 'http://yui.yahooapis.com/2.8.0r4/build/',"," *"," *              // the path to the combo service"," *              comboBase: 'http://yui.yahooapis.com/combo?',"," *"," *              // a fragment to prepend to the path attribute when"," *              // when building combo urls"," *              root: '2.8.0r4/build/',"," *"," *              // the module definitions"," *              modules:  {"," *                  yui2_yde: {"," *                      path: \"yahoo-dom-event/yahoo-dom-event.js\""," *                  },"," *                  yui2_anim: {"," *                      path: \"animation/animation.js\","," *                      requires: ['yui2_yde']"," *                  }"," *              }"," *          }"," *      }"," *"," * @property groups"," * @type object"," */","","/**"," * The loader 'path' attribute to the loader itself.  This is combined"," * with the 'base' attribute to dynamically load the loader component"," * when boostrapping with the get utility alone."," *"," * @property loaderPath"," * @type string"," * @default loader/loader-min.js"," */","","/**"," * Specifies whether or not YUI().use(...) will attempt to load CSS"," * resources at all.  Any truthy value will cause CSS dependencies"," * to load when fetching script.  The special value 'force' will"," * cause CSS dependencies to be loaded even if no script is needed."," *"," * @property fetchCSS"," * @type boolean|string"," * @default true"," */","","/**"," * The default gallery version to build gallery module urls"," * @property gallery"," * @type string"," * @since 3.1.0"," */","","/**"," * The default YUI 2 version to build yui2 module urls.  This is for"," * intrinsic YUI 2 support via the 2in3 project.  Also see the '2in3'"," * config for pulling different revisions of the wrapped YUI 2"," * modules."," * @since 3.1.0"," * @property yui2"," * @type string"," * @default 2.9.0"," */","","/**"," * The 2in3 project is a deployment of the various versions of YUI 2"," * deployed as first-class YUI 3 modules.  Eventually, the wrapper"," * for the modules will change (but the underlying YUI 2 code will"," * be the same), and you can select a particular version of"," * the wrapper modules via this config."," * @since 3.1.0"," * @property 2in3"," * @type string"," * @default 4"," */","","/**"," * Alternative console log function for use in environments without"," * a supported native console.  The function is executed in the"," * YUI instance context."," * @since 3.1.0"," * @property logFn"," * @type Function"," */","","/**"," * A callback to execute when Y.error is called.  It receives the"," * error message and an javascript error object if Y.error was"," * executed because a javascript error was caught.  The function"," * is executed in the YUI instance context. Returning `true` from this"," * function will stop the Error from being thrown."," *"," * @since 3.2.0"," * @property errorFn"," * @type Function"," */","","/**"," * A callback to execute when the loader fails to load one or"," * more resource.  This could be because of a script load"," * failure.  It can also fail if a javascript module fails"," * to register itself, but only when the 'requireRegistration'"," * is true.  If this function is defined, the use() callback will"," * only be called when the loader succeeds, otherwise it always"," * executes unless there was a javascript error when attaching"," * a module."," *"," * @since 3.3.0"," * @property loadErrorFn"," * @type Function"," */","","/**"," * When set to true, the YUI loader will expect that all modules"," * it is responsible for loading will be first-class YUI modules"," * that register themselves with the YUI global.  If this is"," * set to true, loader will fail if the module registration fails"," * to happen after the script is loaded."," *"," * @since 3.3.0"," * @property requireRegistration"," * @type boolean"," * @default false"," */","","/**"," * Cache serviced use() requests."," * @since 3.3.0"," * @property cacheUse"," * @type boolean"," * @default true"," * @deprecated no longer used"," */","","/**"," * Whether or not YUI should use native ES5 functionality when available for"," * features like `Y.Array.each()`, `Y.Object()`, etc. When `false`, YUI will"," * always use its own fallback implementations instead of relying on ES5"," * functionality, even when it's available."," *"," * @property useNativeES5"," * @type Boolean"," * @default true"," * @since 3.5.0"," */","","/**","Delay the `use` callback until a specific event has passed (`load`, `domready`, `contentready` or `available`)","@property delayUntil","@type String|Object","@since 3.6.0","@example","","You can use `load` or `domready` strings by default:","","    YUI({","        delayUntil: 'domready'","    }, function(Y) {","        //This will not fire until 'domeready'","    });","","Or you can delay until a node is available (with `available` or `contentready`):","","    YUI({","        delayUntil: {","            event: 'available',","            args: '#foo'","        }","    }, function(Y) {","        //This will not fire until '#foo' is ","        // available in the DOM","    });","    ","","*/","YUI.add('yui-base', function(Y) {","","/*"," * YUI stub"," * @module yui"," * @submodule yui-base"," */","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * Provides core language utilites and extensions used throughout YUI."," *"," * @class Lang"," * @static"," */","","var L = Y.Lang || (Y.Lang = {}),","","STRING_PROTO = String.prototype,","TOSTRING     = Object.prototype.toString,","","TYPES = {","    'undefined'        : 'undefined',","    'number'           : 'number',","    'boolean'          : 'boolean',","    'string'           : 'string',","    '[object Function]': 'function',","    '[object RegExp]'  : 'regexp',","    '[object Array]'   : 'array',","    '[object Date]'    : 'date',","    '[object Error]'   : 'error'","},","","SUBREGEX        = /\\{\\s*([^|}]+?)\\s*(?:\\|([^}]*))?\\s*\\}/g,","TRIMREGEX       = /^\\s+|\\s+$/g,","NATIVE_FN_REGEX = /\\{\\s*\\[(?:native code|function)\\]\\s*\\}/i;","","// -- Protected Methods --------------------------------------------------------","","/**","Returns `true` if the given function appears to be implemented in native code,","`false` otherwise. Will always return `false` -- even in ES5-capable browsers --","if the `useNativeES5` YUI config option is set to `false`.","","This isn't guaranteed to be 100% accurate and won't work for anything other than","functions, but it can be useful for determining whether a function like","`Array.prototype.forEach` is native or a JS shim provided by another library.","","There's a great article by @kangax discussing certain flaws with this technique:","<http://perfectionkills.com/detecting-built-in-host-methods/>","","While his points are valid, it's still possible to benefit from this function","as long as it's used carefully and sparingly, and in such a way that false","negatives have minimal consequences. It's used internally to avoid using","potentially broken non-native ES5 shims that have been added to the page by","other libraries.","","@method _isNative","@param {Function} fn Function to test.","@return {Boolean} `true` if _fn_ appears to be native, `false` otherwise.","@static","@protected","@since 3.5.0","**/","L._isNative = function (fn) {","    return !!(Y.config.useNativeES5 && fn && NATIVE_FN_REGEX.test(fn));","};","","// -- Public Methods -----------------------------------------------------------","","/**"," * Determines whether or not the provided item is an array."," *"," * Returns `false` for array-like collections such as the function `arguments`"," * collection or `HTMLElement` collections. Use `Y.Array.test()` if you want to"," * test for an array-like collection."," *"," * @method isArray"," * @param o The object to test."," * @return {boolean} true if o is an array."," * @static"," */","L.isArray = L._isNative(Array.isArray) ? Array.isArray : function (o) {","    return L.type(o) === 'array';","};","","/**"," * Determines whether or not the provided item is a boolean."," * @method isBoolean"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a boolean."," */","L.isBoolean = function(o) {","    return typeof o === 'boolean';","};","","/**"," * Determines whether or not the supplied item is a date instance."," * @method isDate"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a date."," */","L.isDate = function(o) {","    return L.type(o) === 'date' && o.toString() !== 'Invalid Date' && !isNaN(o);","};","","/**"," * <p>"," * Determines whether or not the provided item is a function."," * Note: Internet Explorer thinks certain functions are objects:"," * </p>"," *"," * <pre>"," * var obj = document.createElement(\"object\");"," * Y.Lang.isFunction(obj.getAttribute) // reports false in IE"," * &nbsp;"," * var input = document.createElement(\"input\"); // append to body"," * Y.Lang.isFunction(input.focus) // reports false in IE"," * </pre>"," *"," * <p>"," * You will have to implement additional tests if these functions"," * matter to you."," * </p>"," *"," * @method isFunction"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a function."," */","L.isFunction = function(o) {","    return L.type(o) === 'function';","};","","/**"," * Determines whether or not the provided item is null."," * @method isNull"," * @static"," * @param o The object to test."," * @return {boolean} true if o is null."," */","L.isNull = function(o) {","    return o === null;","};","","/**"," * Determines whether or not the provided item is a legal number."," * @method isNumber"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a number."," */","L.isNumber = function(o) {","    return typeof o === 'number' && isFinite(o);","};","","/**"," * Determines whether or not the provided item is of type object"," * or function. Note that arrays are also objects, so"," * <code>Y.Lang.isObject([]) === true</code>."," * @method isObject"," * @static"," * @param o The object to test."," * @param failfn {boolean} fail if the input is a function."," * @return {boolean} true if o is an object."," * @see isPlainObject"," */","L.isObject = function(o, failfn) {","    var t = typeof o;","    return (o && (t === 'object' ||","        (!failfn && (t === 'function' || L.isFunction(o))))) || false;","};","","/**"," * Determines whether or not the provided item is a string."," * @method isString"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a string."," */","L.isString = function(o) {","    return typeof o === 'string';","};","","/**"," * Determines whether or not the provided item is undefined."," * @method isUndefined"," * @static"," * @param o The object to test."," * @return {boolean} true if o is undefined."," */","L.isUndefined = function(o) {","    return typeof o === 'undefined';","};","","/**"," * A convenience method for detecting a legitimate non-null value."," * Returns false for null/undefined/NaN, true for other values,"," * including 0/false/''"," * @method isValue"," * @static"," * @param o The item to test."," * @return {boolean} true if it is not null/undefined/NaN || false."," */","L.isValue = function(o) {","    var t = L.type(o);","","    switch (t) {","        case 'number':","            return isFinite(o);","","        case 'null': // fallthru","        case 'undefined':","            return false;","","        default:","            return !!t;","    }","};","","/**"," * Returns the current time in milliseconds."," *"," * @method now"," * @return {Number} Current time in milliseconds."," * @static"," * @since 3.3.0"," */","L.now = Date.now || function () {","    return new Date().getTime();","};","","/**"," * Lightweight version of <code>Y.substitute</code>. Uses the same template"," * structure as <code>Y.substitute</code>, but doesn't support recursion,"," * auto-object coersion, or formats."," * @method sub"," * @param {string} s String to be modified."," * @param {object} o Object containing replacement values."," * @return {string} the substitute result."," * @static"," * @since 3.2.0"," */","L.sub = function(s, o) {","    return s.replace ? s.replace(SUBREGEX, function (match, key) {","        return L.isUndefined(o[key]) ? match : o[key];","    }) : s;","};","","/**"," * Returns a string without any leading or trailing whitespace.  If"," * the input is not a string, the input will be returned untouched."," * @method trim"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trim = STRING_PROTO.trim ? function(s) {","    return s && s.trim ? s.trim() : s;","} : function (s) {","    try {","        return s.replace(TRIMREGEX, '');","    } catch (e) {","        return s;","    }","};","","/**"," * Returns a string without any leading whitespace."," * @method trimLeft"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trimLeft = STRING_PROTO.trimLeft ? function (s) {","    return s.trimLeft();","} : function (s) {","    return s.replace(/^\\s+/, '');","};","","/**"," * Returns a string without any trailing whitespace."," * @method trimRight"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trimRight = STRING_PROTO.trimRight ? function (s) {","    return s.trimRight();","} : function (s) {","    return s.replace(/\\s+$/, '');","};","","/**","Returns one of the following strings, representing the type of the item passed","in:",""," * \"array\""," * \"boolean\""," * \"date\""," * \"error\""," * \"function\""," * \"null\""," * \"number\""," * \"object\""," * \"regexp\""," * \"string\""," * \"undefined\"","","Known issues:",""," * `typeof HTMLElementCollection` returns function in Safari, but","    `Y.Lang.type()` reports \"object\", which could be a good thing --","    but it actually caused the logic in <code>Y.Lang.isObject</code> to fail.","","@method type","@param o the item to test.","@return {string} the detected type.","@static","**/","L.type = function(o) {","    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');","};","/**","@module yui","@submodule yui-base","*/","","var Lang   = Y.Lang,","    Native = Array.prototype,","","    hasOwn = Object.prototype.hasOwnProperty;","","/**","Provides utility methods for working with arrays. Additional array helpers can","be found in the `collection` and `array-extras` modules.","","`Y.Array(thing)` returns a native array created from _thing_. Depending on","_thing_'s type, one of the following will happen:","","  * Arrays are returned unmodified unless a non-zero _startIndex_ is","    specified.","  * Array-like collections (see `Array.test()`) are converted to arrays.","  * For everything else, a new array is created with _thing_ as the sole","    item.","","Note: elements that are also collections, such as `<form>` and `<select>`","elements, are not automatically converted to arrays. To force a conversion,","pass `true` as the value of the _force_ parameter.","","@class Array","@constructor","@param {Any} thing The thing to arrayify.","@param {Number} [startIndex=0] If non-zero and _thing_ is an array or array-like","  collection, a subset of items starting at the specified index will be","  returned.","@param {Boolean} [force=false] If `true`, _thing_ will be treated as an","  array-like collection no matter what.","@return {Array} A native array created from _thing_, according to the rules","  described above.","**/","function YArray(thing, startIndex, force) {","    var len, result;","","    startIndex || (startIndex = 0);","","    if (force || YArray.test(thing)) {","        // IE throws when trying to slice HTMLElement collections.","        try {","            return Native.slice.call(thing, startIndex);","        } catch (ex) {","            result = [];","","            for (len = thing.length; startIndex < len; ++startIndex) {","                result.push(thing[startIndex]);","            }","","            return result;","        }","    }","","    return [thing];","}","","Y.Array = YArray;","","/**","Dedupes an array of strings, returning an array that's guaranteed to contain","only one copy of a given string.","","This method differs from `Array.unique()` in that it's optimized for use only","with strings, whereas `unique` may be used with other types (but is slower).","Using `dedupe()` with non-string values may result in unexpected behavior.","","@method dedupe","@param {String[]} array Array of strings to dedupe.","@return {Array} Deduped copy of _array_.","@static","@since 3.4.0","**/","YArray.dedupe = function (array) {","    var hash    = {},","        results = [],","        i, item, len;","","    for (i = 0, len = array.length; i < len; ++i) {","        item = array[i];","","        if (!hasOwn.call(hash, item)) {","            hash[item] = 1;","            results.push(item);","        }","    }","","    return results;","};","","/**","Executes the supplied function on each item in the array. This method wraps","the native ES5 `Array.forEach()` method if available.","","@method each","@param {Array} array Array to iterate.","@param {Function} fn Function to execute on each item in the array. The function","  will receive the following arguments:","    @param {Any} fn.item Current array item.","    @param {Number} fn.index Current array index.","    @param {Array} fn.array Array being iterated.","@param {Object} [thisObj] `this` object to use when calling _fn_.","@return {YUI} The YUI instance.","@static","**/","YArray.each = YArray.forEach = Lang._isNative(Native.forEach) ? function (array, fn, thisObj) {","    Native.forEach.call(array || [], fn, thisObj || Y);","    return Y;","} : function (array, fn, thisObj) {","    for (var i = 0, len = (array && array.length) || 0; i < len; ++i) {","        if (i in array) {","            fn.call(thisObj || Y, array[i], i, array);","        }","    }","","    return Y;","};","","/**","Alias for `each()`.","","@method forEach","@static","**/","","/**","Returns an object using the first array as keys and the second as values. If","the second array is not provided, or if it doesn't contain the same number of","values as the first array, then `true` will be used in place of the missing","values.","","@example","","    Y.Array.hash(['a', 'b', 'c'], ['foo', 'bar']);","    // => {a: 'foo', b: 'bar', c: true}","","@method hash","@param {String[]} keys Array of strings to use as keys.","@param {Array} [values] Array to use as values.","@return {Object} Hash using the first array as keys and the second as values.","@static","**/","YArray.hash = function (keys, values) {","    var hash = {},","        vlen = (values && values.length) || 0,","        i, len;","","    for (i = 0, len = keys.length; i < len; ++i) {","        if (i in keys) {","            hash[keys[i]] = vlen > i && i in values ? values[i] : true;","        }","    }","","    return hash;","};","","/**","Returns the index of the first item in the array that's equal (using a strict","equality check) to the specified _value_, or `-1` if the value isn't found.","","This method wraps the native ES5 `Array.indexOf()` method if available.","","@method indexOf","@param {Array} array Array to search.","@param {Any} value Value to search for.","@param {Number} [from=0] The index at which to begin the search.","@return {Number} Index of the item strictly equal to _value_, or `-1` if not","    found.","@static","**/","YArray.indexOf = Lang._isNative(Native.indexOf) ? function (array, value, from) {","    return Native.indexOf.call(array, value, from);","} : function (array, value, from) {","    // http://es5.github.com/#x15.4.4.14","    var len = array.length;","","    from = +from || 0;","    from = (from > 0 || -1) * Math.floor(Math.abs(from));","","    if (from < 0) {","        from += len;","","        if (from < 0) {","            from = 0;","        }","    }","","    for (; from < len; ++from) {","        if (from in array && array[from] === value) {","            return from;","        }","    }","","    return -1;","};","","/**","Numeric sort convenience function.","","The native `Array.prototype.sort()` function converts values to strings and","sorts them in lexicographic order, which is unsuitable for sorting numeric","values. Provide `Array.numericSort` as a custom sort function when you want","to sort values in numeric order.","","@example","","    [42, 23, 8, 16, 4, 15].sort(Y.Array.numericSort);","    // => [4, 8, 15, 16, 23, 42]","","@method numericSort","@param {Number} a First value to compare.","@param {Number} b Second value to compare.","@return {Number} Difference between _a_ and _b_.","@static","**/","YArray.numericSort = function (a, b) {","    return a - b;","};","","/**","Executes the supplied function on each item in the array. Returning a truthy","value from the function will stop the processing of remaining items.","","@method some","@param {Array} array Array to iterate over.","@param {Function} fn Function to execute on each item. The function will receive","  the following arguments:","    @param {Any} fn.value Current array item.","    @param {Number} fn.index Current array index.","    @param {Array} fn.array Array being iterated over.","@param {Object} [thisObj] `this` object to use when calling _fn_.","@return {Boolean} `true` if the function returns a truthy value on any of the","  items in the array; `false` otherwise.","@static","**/","YArray.some = Lang._isNative(Native.some) ? function (array, fn, thisObj) {","    return Native.some.call(array, fn, thisObj);","} : function (array, fn, thisObj) {","    for (var i = 0, len = array.length; i < len; ++i) {","        if (i in array && fn.call(thisObj, array[i], i, array)) {","            return true;","        }","    }","","    return false;","};","","/**","Evaluates _obj_ to determine if it's an array, an array-like collection, or","something else. This is useful when working with the function `arguments`","collection and `HTMLElement` collections.","","Note: This implementation doesn't consider elements that are also","collections, such as `<form>` and `<select>`, to be array-like.","","@method test","@param {Object} obj Object to test.","@return {Number} A number indicating the results of the test:","","  * 0: Neither an array nor an array-like collection.","  * 1: Real array.","  * 2: Array-like collection.","","@static","**/","YArray.test = function (obj) {","    var result = 0;","","    if (Lang.isArray(obj)) {","        result = 1;","    } else if (Lang.isObject(obj)) {","        try {","            // indexed, but no tagName (element) or alert (window),","            // or functions without apply/call (Safari","            // HTMLElementCollection bug).","            if ('length' in obj && !obj.tagName && !obj.alert && !obj.apply) {","                result = 2;","            }","        } catch (ex) {}","    }","","    return result;","};","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * A simple FIFO queue.  Items are added to the Queue with add(1..n items) and"," * removed using next()."," *"," * @class Queue"," * @constructor"," * @param {MIXED} item* 0..n items to seed the queue."," */","function Queue() {","    this._init();","    this.add.apply(this, arguments);","}","","Queue.prototype = {","    /**","     * Initialize the queue","     *","     * @method _init","     * @protected","     */","    _init: function() {","        /**","         * The collection of enqueued items","         *","         * @property _q","         * @type Array","         * @protected","         */","        this._q = [];","    },","","    /**","     * Get the next item in the queue. FIFO support","     *","     * @method next","     * @return {MIXED} the next item in the queue.","     */","    next: function() {","        return this._q.shift();","    },","","    /**","     * Get the last in the queue. LIFO support.","     *","     * @method last","     * @return {MIXED} the last item in the queue.","     */","    last: function() {","        return this._q.pop();","    },","","    /**","     * Add 0..n items to the end of the queue.","     *","     * @method add","     * @param {MIXED} item* 0..n items.","     * @return {object} this queue.","     */","    add: function() {","        this._q.push.apply(this._q, arguments);","","        return this;","    },","","    /**","     * Returns the current number of queued items.","     *","     * @method size","     * @return {Number} The size.","     */","    size: function() {","        return this._q.length;","    }","};","","Y.Queue = Queue;","","YUI.Env._loaderQueue = YUI.Env._loaderQueue || new Queue();","","/**","The YUI module contains the components required for building the YUI seed file.","This includes the script loading mechanism, a simple queue, and the core","utilities for the library.","","@module yui","@submodule yui-base","**/","","var CACHED_DELIMITER = '__',","","    hasOwn   = Object.prototype.hasOwnProperty,","    isObject = Y.Lang.isObject;","","/**","Returns a wrapper for a function which caches the return value of that function,","keyed off of the combined string representation of the argument values provided","when the wrapper is called.","","Calling this function again with the same arguments will return the cached value","rather than executing the wrapped function.","","Note that since the cache is keyed off of the string representation of arguments","passed to the wrapper function, arguments that aren't strings and don't provide","a meaningful `toString()` method may result in unexpected caching behavior. For","example, the objects `{}` and `{foo: 'bar'}` would both be converted to the","string `[object Object]` when used as a cache key.","","@method cached","@param {Function} source The function to memoize.","@param {Object} [cache={}] Object in which to store cached values. You may seed","  this object with pre-existing cached values if desired.","@param {any} [refetch] If supplied, this value is compared with the cached value","  using a `==` comparison. If the values are equal, the wrapped function is","  executed again even though a cached value exists.","@return {Function} Wrapped function.","@for YUI","**/","Y.cached = function (source, cache, refetch) {","    cache || (cache = {});","","    return function (arg) {","        var key = arguments.length > 1 ?","                Array.prototype.join.call(arguments, CACHED_DELIMITER) :","                String(arg);","","        if (!(key in cache) || (refetch && cache[key] == refetch)) {","            cache[key] = source.apply(source, arguments);","        }","","        return cache[key];","    };","};","","/**","Returns the `location` object from the window/frame in which this YUI instance","operates, or `undefined` when executing in a non-browser environment","(e.g. Node.js).","","It is _not_ recommended to hold references to the `window.location` object","outside of the scope of a function in which its properties are being accessed or","its methods are being called. This is because of a nasty bug/issue that exists","in both Safari and MobileSafari browsers:","[WebKit Bug 34679](https://bugs.webkit.org/show_bug.cgi?id=34679).","","@method getLocation","@return {location} The `location` object from the window/frame in which this YUI","    instance operates.","@since 3.5.0","**/","Y.getLocation = function () {","    // It is safer to look this up every time because yui-base is attached to a","    // YUI instance before a user's config is applied; i.e. `Y.config.win` does","    // not point the correct window object when this file is loaded.","    var win = Y.config.win;","","    // It is not safe to hold a reference to the `location` object outside the","    // scope in which it is being used. The WebKit engine used in Safari and","    // MobileSafari will \"disconnect\" the `location` object from the `window`","    // when a page is restored from back/forward history cache.","    return win && win.location;","};","","/**","Returns a new object containing all of the properties of all the supplied","objects. The properties from later objects will overwrite those in earlier","objects.","","Passing in a single object will create a shallow copy of it. For a deep copy,","use `clone()`.","","@method merge","@param {Object} objects* One or more objects to merge.","@return {Object} A new merged object.","**/","Y.merge = function () {","    var args   = arguments,","        i      = 0,","        len    = args.length,","        result = {};","","    for (; i < len; ++i) {","        Y.mix(result, args[i], true);","    }","","    return result;","};","","/**","Mixes _supplier_'s properties into _receiver_.","","Properties on _receiver_ or _receiver_'s prototype will not be overwritten or","shadowed unless the _overwrite_ parameter is `true`, and will not be merged","unless the _merge_ parameter is `true`.","","In the default mode (0), only properties the supplier owns are copied (prototype","properties are not copied). The following copying modes are available:","","  * `0`: _Default_. Object to object.","  * `1`: Prototype to prototype.","  * `2`: Prototype to prototype and object to object.","  * `3`: Prototype to object.","  * `4`: Object to prototype.","","@method mix","@param {Function|Object} receiver The object or function to receive the mixed","  properties.","@param {Function|Object} supplier The object or function supplying the","  properties to be mixed.","@param {Boolean} [overwrite=false] If `true`, properties that already exist","  on the receiver will be overwritten with properties from the supplier.","@param {String[]} [whitelist] An array of property names to copy. If","  specified, only the whitelisted properties will be copied, and all others","  will be ignored.","@param {Number} [mode=0] Mix mode to use. See above for available modes.","@param {Boolean} [merge=false] If `true`, objects and arrays that already","  exist on the receiver will have the corresponding object/array from the","  supplier merged into them, rather than being skipped or overwritten. When","  both _overwrite_ and _merge_ are `true`, _merge_ takes precedence.","@return {Function|Object|YUI} The receiver, or the YUI instance if the","  specified receiver is falsy.","**/","Y.mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {","    var alwaysOverwrite, exists, from, i, key, len, to;","","    // If no supplier is given, we return the receiver. If no receiver is given,","    // we return Y. Returning Y doesn't make much sense to me, but it's","    // grandfathered in for backcompat reasons.","    if (!receiver || !supplier) {","        return receiver || Y;","    }","","    if (mode) {","        // In mode 2 (prototype to prototype and object to object), we recurse","        // once to do the proto to proto mix. The object to object mix will be","        // handled later on.","        if (mode === 2) {","            Y.mix(receiver.prototype, supplier.prototype, overwrite,","                    whitelist, 0, merge);","        }","","        // Depending on which mode is specified, we may be copying from or to","        // the prototypes of the supplier and receiver.","        from = mode === 1 || mode === 3 ? supplier.prototype : supplier;","        to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;","","        // If either the supplier or receiver doesn't actually have a","        // prototype property, then we could end up with an undefined `from`","        // or `to`. If that happens, we abort and return the receiver.","        if (!from || !to) {","            return receiver;","        }","    } else {","        from = supplier;","        to   = receiver;","    }","","    // If `overwrite` is truthy and `merge` is falsy, then we can skip a","    // property existence check on each iteration and save some time.","    alwaysOverwrite = overwrite && !merge;","","    if (whitelist) {","        for (i = 0, len = whitelist.length; i < len; ++i) {","            key = whitelist[i];","","            // We call `Object.prototype.hasOwnProperty` instead of calling","            // `hasOwnProperty` on the object itself, since the object's","            // `hasOwnProperty` method may have been overridden or removed.","            // Also, some native objects don't implement a `hasOwnProperty`","            // method.","            if (!hasOwn.call(from, key)) {","                continue;","            }","","            // The `key in to` check here is (sadly) intentional for backwards","            // compatibility reasons. It prevents undesired shadowing of","            // prototype members on `to`.","            exists = alwaysOverwrite ? false : key in to;","","            if (merge && exists && isObject(to[key], true)","                    && isObject(from[key], true)) {","                // If we're in merge mode, and the key is present on both","                // objects, and the value on both objects is either an object or","                // an array (but not a function), then we recurse to merge the","                // `from` value into the `to` value instead of overwriting it.","                //","                // Note: It's intentional that the whitelist isn't passed to the","                // recursive call here. This is legacy behavior that lots of","                // code still depends on.","                Y.mix(to[key], from[key], overwrite, null, 0, merge);","            } else if (overwrite || !exists) {","                // We're not in merge mode, so we'll only copy the `from` value","                // to the `to` value if we're in overwrite mode or if the","                // current key doesn't exist on the `to` object.","                to[key] = from[key];","            }","        }","    } else {","        for (key in from) {","            // The code duplication here is for runtime performance reasons.","            // Combining whitelist and non-whitelist operations into a single","            // loop or breaking the shared logic out into a function both result","            // in worse performance, and Y.mix is critical enough that the byte","            // tradeoff is worth it.","            if (!hasOwn.call(from, key)) {","                continue;","            }","","            // The `key in to` check here is (sadly) intentional for backwards","            // compatibility reasons. It prevents undesired shadowing of","            // prototype members on `to`.","            exists = alwaysOverwrite ? false : key in to;","","            if (merge && exists && isObject(to[key], true)","                    && isObject(from[key], true)) {","                Y.mix(to[key], from[key], overwrite, null, 0, merge);","            } else if (overwrite || !exists) {","                to[key] = from[key];","            }","        }","","        // If this is an IE browser with the JScript enumeration bug, force","        // enumeration of the buggy properties by making a recursive call with","        // the buggy properties as the whitelist.","        if (Y.Object._hasEnumBug) {","            Y.mix(to, from, overwrite, Y.Object._forceEnum, mode, merge);","        }","    }","","    return receiver;","};","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * Adds utilities to the YUI instance for working with objects."," *"," * @class Object"," */","","var Lang   = Y.Lang,","    hasOwn = Object.prototype.hasOwnProperty,","","    UNDEFINED, // <-- Note the comma. We're still declaring vars.","","/**"," * Returns a new object that uses _obj_ as its prototype. This method wraps the"," * native ES5 `Object.create()` method if available, but doesn't currently"," * pass through `Object.create()`'s second argument (properties) in order to"," * ensure compatibility with older browsers."," *"," * @method ()"," * @param {Object} obj Prototype object."," * @return {Object} New object using _obj_ as its prototype."," * @static"," */","O = Y.Object = Lang._isNative(Object.create) ? function (obj) {","    // We currently wrap the native Object.create instead of simply aliasing it","    // to ensure consistency with our fallback shim, which currently doesn't","    // support Object.create()'s second argument (properties). Once we have a","    // safe fallback for the properties arg, we can stop wrapping","    // Object.create().","    return Object.create(obj);","} : (function () {","    // Reusable constructor function for the Object.create() shim.","    function F() {}","","    // The actual shim.","    return function (obj) {","        F.prototype = obj;","        return new F();","    };","}()),","","/**"," * Property names that IE doesn't enumerate in for..in loops, even when they"," * should be enumerable. When `_hasEnumBug` is `true`, it's necessary to"," * manually enumerate these properties."," *"," * @property _forceEnum"," * @type String[]"," * @protected"," * @static"," */","forceEnum = O._forceEnum = [","    'hasOwnProperty',","    'isPrototypeOf',","    'propertyIsEnumerable',","    'toString',","    'toLocaleString',","    'valueOf'","],","","/**"," * `true` if this browser has the JScript enumeration bug that prevents"," * enumeration of the properties named in the `_forceEnum` array, `false`"," * otherwise."," *"," * See:"," *   - <https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug>"," *   - <http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation>"," *"," * @property _hasEnumBug"," * @type Boolean"," * @protected"," * @static"," */","hasEnumBug = O._hasEnumBug = !{valueOf: 0}.propertyIsEnumerable('valueOf'),","","/**"," * `true` if this browser incorrectly considers the `prototype` property of"," * functions to be enumerable. Currently known to affect Opera 11.50."," *"," * @property _hasProtoEnumBug"," * @type Boolean"," * @protected"," * @static"," */","hasProtoEnumBug = O._hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype'),","","/**"," * Returns `true` if _key_ exists on _obj_, `false` if _key_ doesn't exist or"," * exists only on _obj_'s prototype. This is essentially a safer version of"," * `obj.hasOwnProperty()`."," *"," * @method owns"," * @param {Object} obj Object to test."," * @param {String} key Property name to look for."," * @return {Boolean} `true` if _key_ exists on _obj_, `false` otherwise."," * @static"," */","owns = O.owns = function (obj, key) {","    return !!obj && hasOwn.call(obj, key);","}; // <-- End of var declarations.","","/**"," * Alias for `owns()`."," *"," * @method hasKey"," * @param {Object} obj Object to test."," * @param {String} key Property name to look for."," * @return {Boolean} `true` if _key_ exists on _obj_, `false` otherwise."," * @static"," */","O.hasKey = owns;","","/**"," * Returns an array containing the object's enumerable keys. Does not include"," * prototype keys or non-enumerable keys."," *"," * Note that keys are returned in enumeration order (that is, in the same order"," * that they would be enumerated by a `for-in` loop), which may not be the same"," * as the order in which they were defined."," *"," * This method is an alias for the native ES5 `Object.keys()` method if"," * available."," *"," * @example"," *"," *     Y.Object.keys({a: 'foo', b: 'bar', c: 'baz'});"," *     // => ['a', 'b', 'c']"," *"," * @method keys"," * @param {Object} obj An object."," * @return {String[]} Array of keys."," * @static"," */","O.keys = Lang._isNative(Object.keys) ? Object.keys : function (obj) {","    if (!Lang.isObject(obj)) {","        throw new TypeError('Object.keys called on a non-object');","    }","","    var keys = [],","        i, key, len;","","    if (hasProtoEnumBug && typeof obj === 'function') {","        for (key in obj) {","            if (owns(obj, key) && key !== 'prototype') {","                keys.push(key);","            }","        }","    } else {","        for (key in obj) {","            if (owns(obj, key)) {","                keys.push(key);","            }","        }","    }","","    if (hasEnumBug) {","        for (i = 0, len = forceEnum.length; i < len; ++i) {","            key = forceEnum[i];","","            if (owns(obj, key)) {","                keys.push(key);","            }","        }","    }","","    return keys;","};","","/**"," * Returns an array containing the values of the object's enumerable keys."," *"," * Note that values are returned in enumeration order (that is, in the same"," * order that they would be enumerated by a `for-in` loop), which may not be the"," * same as the order in which they were defined."," *"," * @example"," *"," *     Y.Object.values({a: 'foo', b: 'bar', c: 'baz'});"," *     // => ['foo', 'bar', 'baz']"," *"," * @method values"," * @param {Object} obj An object."," * @return {Array} Array of values."," * @static"," */","O.values = function (obj) {","    var keys   = O.keys(obj),","        i      = 0,","        len    = keys.length,","        values = [];","","    for (; i < len; ++i) {","        values.push(obj[keys[i]]);","    }","","    return values;","};","","/**"," * Returns the number of enumerable keys owned by an object."," *"," * @method size"," * @param {Object} obj An object."," * @return {Number} The object's size."," * @static"," */","O.size = function (obj) {","    try {","        return O.keys(obj).length;","    } catch (ex) {","        return 0; // Legacy behavior for non-objects.","    }","};","","/**"," * Returns `true` if the object owns an enumerable property with the specified"," * value."," *"," * @method hasValue"," * @param {Object} obj An object."," * @param {any} value The value to search for."," * @return {Boolean} `true` if _obj_ contains _value_, `false` otherwise."," * @static"," */","O.hasValue = function (obj, value) {","    return Y.Array.indexOf(O.values(obj), value) > -1;","};","","/**"," * Executes a function on each enumerable property in _obj_. The function"," * receives the value, the key, and the object itself as parameters (in that"," * order)."," *"," * By default, only properties owned by _obj_ are enumerated. To include"," * prototype properties, set the _proto_ parameter to `true`."," *"," * @method each"," * @param {Object} obj Object to enumerate."," * @param {Function} fn Function to execute on each enumerable property."," *   @param {mixed} fn.value Value of the current property."," *   @param {String} fn.key Key of the current property."," *   @param {Object} fn.obj Object being enumerated."," * @param {Object} [thisObj] `this` object to use when calling _fn_."," * @param {Boolean} [proto=false] Include prototype properties."," * @return {YUI} the YUI instance."," * @chainable"," * @static"," */","O.each = function (obj, fn, thisObj, proto) {","    var key;","","    for (key in obj) {","        if (proto || owns(obj, key)) {","            fn.call(thisObj || Y, obj[key], key, obj);","        }","    }","","    return Y;","};","","/**"," * Executes a function on each enumerable property in _obj_, but halts if the"," * function returns a truthy value. The function receives the value, the key,"," * and the object itself as paramters (in that order)."," *"," * By default, only properties owned by _obj_ are enumerated. To include"," * prototype properties, set the _proto_ parameter to `true`."," *"," * @method some"," * @param {Object} obj Object to enumerate."," * @param {Function} fn Function to execute on each enumerable property."," *   @param {mixed} fn.value Value of the current property."," *   @param {String} fn.key Key of the current property."," *   @param {Object} fn.obj Object being enumerated."," * @param {Object} [thisObj] `this` object to use when calling _fn_."," * @param {Boolean} [proto=false] Include prototype properties."," * @return {Boolean} `true` if any execution of _fn_ returns a truthy value,"," *   `false` otherwise."," * @static"," */","O.some = function (obj, fn, thisObj, proto) {","    var key;","","    for (key in obj) {","        if (proto || owns(obj, key)) {","            if (fn.call(thisObj || Y, obj[key], key, obj)) {","                return true;","            }","        }","    }","","    return false;","};","","/**"," * Retrieves the sub value at the provided path,"," * from the value object provided."," *"," * @method getValue"," * @static"," * @param o The object from which to extract the property value."," * @param path {Array} A path array, specifying the object traversal path"," * from which to obtain the sub value."," * @return {Any} The value stored in the path, undefined if not found,"," * undefined if the source is not an object.  Returns the source object"," * if an empty path is provided."," */","O.getValue = function(o, path) {","    if (!Lang.isObject(o)) {","        return UNDEFINED;","    }","","    var i,","        p = Y.Array(path),","        l = p.length;","","    for (i = 0; o !== UNDEFINED && i < l; i++) {","        o = o[p[i]];","    }","","    return o;","};","","/**"," * Sets the sub-attribute value at the provided path on the"," * value object.  Returns the modified value object, or"," * undefined if the path is invalid."," *"," * @method setValue"," * @static"," * @param o             The object on which to set the sub value."," * @param path {Array}  A path array, specifying the object traversal path"," *                      at which to set the sub value."," * @param val {Any}     The new value for the sub-attribute."," * @return {Object}     The modified object, with the new sub value set, or"," *                      undefined, if the path was invalid."," */","O.setValue = function(o, path, val) {","    var i,","        p = Y.Array(path),","        leafIdx = p.length - 1,","        ref = o;","","    if (leafIdx >= 0) {","        for (i = 0; ref !== UNDEFINED && i < leafIdx; i++) {","            ref = ref[p[i]];","        }","","        if (ref !== UNDEFINED) {","            ref[p[i]] = val;","        } else {","            return UNDEFINED;","        }","    }","","    return o;","};","","/**"," * Returns `true` if the object has no enumerable properties of its own."," *"," * @method isEmpty"," * @param {Object} obj An object."," * @return {Boolean} `true` if the object is empty."," * @static"," * @since 3.2.0"," */","O.isEmpty = function (obj) {","    return !O.keys(Object(obj)).length;","};","/**"," * The YUI module contains the components required for building the YUI seed"," * file.  This includes the script loading mechanism, a simple queue, and the"," * core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * YUI user agent detection."," * Do not fork for a browser if it can be avoided.  Use feature detection when"," * you can.  Use the user agent as a last resort.  For all fields listed"," * as @type float, UA stores a version number for the browser engine,"," * 0 otherwise.  This value may or may not map to the version number of"," * the browser using the engine.  The value is presented as a float so"," * that it can easily be used for boolean evaluation as well as for"," * looking for a particular range of versions.  Because of this,"," * some of the granularity of the version info may be lost.  The fields that"," * are @type string default to null.  The API docs list the values that"," * these fields can have."," * @class UA"," * @static"," */","","/**","* Static method on `YUI.Env` for parsing a UA string.  Called at instantiation","* to populate `Y.UA`.","*","* @static","* @method parseUA","* @param {String} [subUA=navigator.userAgent] UA string to parse","* @return {Object} The Y.UA object","*/","YUI.Env.parseUA = function(subUA) {","","    var numberify = function(s) {","            var c = 0;","            return parseFloat(s.replace(/\\./g, function() {","                return (c++ == 1) ? '' : '.';","            }));","        },","","        win = Y.config.win,","","        nav = win && win.navigator,","","        o = {","","        /**","         * Internet Explorer version number or 0.  Example: 6","         * @property ie","         * @type float","         * @static","         */","        ie: 0,","","        /**","         * Opera version number or 0.  Example: 9.2","         * @property opera","         * @type float","         * @static","         */","        opera: 0,","","        /**","         * Gecko engine revision number.  Will evaluate to 1 if Gecko","         * is detected but the revision could not be found. Other browsers","         * will be 0.  Example: 1.8","         * <pre>","         * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7","         * Firefox 1.5.0.9: 1.8.0.9 <-- 1.8","         * Firefox 2.0.0.3: 1.8.1.3 <-- 1.81","         * Firefox 3.0   <-- 1.9","         * Firefox 3.5   <-- 1.91","         * </pre>","         * @property gecko","         * @type float","         * @static","         */","        gecko: 0,","","        /**","         * AppleWebKit version.  KHTML browsers that are not WebKit browsers","         * will evaluate to 1, other browsers 0.  Example: 418.9","         * <pre>","         * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the","         *                                   latest available for Mac OSX 10.3.","         * Safari 2.0.2:         416     <-- hasOwnProperty introduced","         * Safari 2.0.4:         418     <-- preventDefault fixed","         * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run","         *                                   different versions of webkit","         * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been","         *                                   updated, but not updated","         *                                   to the latest patch.","         * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native","         * SVG and many major issues fixed).","         * Safari 3.0.4 (523.12) 523.12  <-- First Tiger release - automatic","         * update from 2.x via the 10.4.11 OS patch.","         * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.","         *                                   yahoo.com user agent hack removed.","         * </pre>","         * http://en.wikipedia.org/wiki/Safari_version_history","         * @property webkit","         * @type float","         * @static","         */","        webkit: 0,","","        /**","         * Safari will be detected as webkit, but this property will also","         * be populated with the Safari version number","         * @property safari","         * @type float","         * @static","         */","        safari: 0,","","        /**","         * Chrome will be detected as webkit, but this property will also","         * be populated with the Chrome version number","         * @property chrome","         * @type float","         * @static","         */","        chrome: 0,","","        /**","         * The mobile property will be set to a string containing any relevant","         * user agent information when a modern mobile browser is detected.","         * Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series","         * devices with the WebKit-based browser, and Opera Mini.","         * @property mobile","         * @type string","         * @default null","         * @static","         */","        mobile: null,","","        /**","         * Adobe AIR version number or 0.  Only populated if webkit is detected.","         * Example: 1.0","         * @property air","         * @type float","         */","        air: 0,","        /**","         * PhantomJS version number or 0.  Only populated if webkit is detected.","         * Example: 1.0","         * @property phantomjs","         * @type float","         */","        phantomjs: 0,","        /**","         * Adobe AIR version number or 0.  Only populated if webkit is detected.","         * Example: 1.0","         * @property air","         * @type float","         */","        air: 0,","        /**","         * Detects Apple iPad's OS version","         * @property ipad","         * @type float","         * @static","         */","        ipad: 0,","        /**","         * Detects Apple iPhone's OS version","         * @property iphone","         * @type float","         * @static","         */","        iphone: 0,","        /**","         * Detects Apples iPod's OS version","         * @property ipod","         * @type float","         * @static","         */","        ipod: 0,","        /**","         * General truthy check for iPad, iPhone or iPod","         * @property ios","         * @type Boolean","         * @default null","         * @static","         */","        ios: null,","        /**","         * Detects Googles Android OS version","         * @property android","         * @type float","         * @static","         */","        android: 0,","        /**","         * Detects Kindle Silk","         * @property silk","         * @type float","         * @static","         */","        silk: 0,","        /**","         * Detects Kindle Silk Acceleration","         * @property accel","         * @type Boolean","         * @static","         */","        accel: false,","        /**","         * Detects Palms WebOS version","         * @property webos","         * @type float","         * @static","         */","        webos: 0,","","        /**","         * Google Caja version number or 0.","         * @property caja","         * @type float","         */","        caja: nav && nav.cajaVersion,","","        /**","         * Set to true if the page appears to be in SSL","         * @property secure","         * @type boolean","         * @static","         */","        secure: false,","","        /**","         * The operating system.  Currently only detecting windows or macintosh","         * @property os","         * @type string","         * @default null","         * @static","         */","        os: null,","","        /**","         * The Nodejs Version","         * @property nodejs","         * @type float","         * @default 0","         * @static","         */","        nodejs: 0","    },","","    ua = subUA || nav && nav.userAgent,","","    loc = win && win.location,","","    href = loc && loc.href,","","    m;","","    /**","    * The User Agent string that was parsed","    * @property userAgent","    * @type String","    * @static","    */","    o.userAgent = ua;","","","    o.secure = href && (href.toLowerCase().indexOf('https') === 0);","","    if (ua) {","","        if ((/windows|win32/i).test(ua)) {","            o.os = 'windows';","        } else if ((/macintosh|mac_powerpc/i).test(ua)) {","            o.os = 'macintosh';","        } else if ((/android/i).test(ua)) {","            o.os = 'android';","        } else if ((/symbos/i).test(ua)) {","            o.os = 'symbos';","        } else if ((/linux/i).test(ua)) {","            o.os = 'linux';","        } else if ((/rhino/i).test(ua)) {","            o.os = 'rhino';","        }","","        // Modern KHTML browsers should qualify as Safari X-Grade","        if ((/KHTML/).test(ua)) {","            o.webkit = 1;","        }","        if ((/IEMobile|XBLWP7/).test(ua)) {","            o.mobile = 'windows';","        }","        if ((/Fennec/).test(ua)) {","            o.mobile = 'gecko';","        }","        // Modern WebKit browsers are at least X-Grade","        m = ua.match(/AppleWebKit\\/([^\\s]*)/);","        if (m && m[1]) {","            o.webkit = numberify(m[1]);","            o.safari = o.webkit;","            ","            if (/PhantomJS/.test(ua)) {","                m = ua.match(/PhantomJS\\/([^\\s]*)/);","                if (m && m[1]) {","                    o.phantomjs = numberify(m[1]);","                }","            }","","            // Mobile browser check","            if (/ Mobile\\//.test(ua) || (/iPad|iPod|iPhone/).test(ua)) {","                o.mobile = 'Apple'; // iPhone or iPod Touch","","                m = ua.match(/OS ([^\\s]*)/);","                if (m && m[1]) {","                    m = numberify(m[1].replace('_', '.'));","                }","                o.ios = m;","                o.os = 'ios';","                o.ipad = o.ipod = o.iphone = 0;","","                m = ua.match(/iPad|iPod|iPhone/);","                if (m && m[0]) {","                    o[m[0].toLowerCase()] = o.ios;","                }","            } else {","                m = ua.match(/NokiaN[^\\/]*|webOS\\/\\d\\.\\d/);","                if (m) {","                    // Nokia N-series, webOS, ex: NokiaN95","                    o.mobile = m[0];","                }","                if (/webOS/.test(ua)) {","                    o.mobile = 'WebOS';","                    m = ua.match(/webOS\\/([^\\s]*);/);","                    if (m && m[1]) {","                        o.webos = numberify(m[1]);","                    }","                }","                if (/ Android/.test(ua)) {","                    if (/Mobile/.test(ua)) {","                        o.mobile = 'Android';","                    }","                    m = ua.match(/Android ([^\\s]*);/);","                    if (m && m[1]) {","                        o.android = numberify(m[1]);","                    }","","                }","                if (/Silk/.test(ua)) {","                    m = ua.match(/Silk\\/([^\\s]*)\\)/);","                    if (m && m[1]) {","                        o.silk = numberify(m[1]);","                    }","                    if (!o.android) {","                        o.android = 2.34; //Hack for desktop mode in Kindle","                        o.os = 'Android';","                    }","                    if (/Accelerated=true/.test(ua)) {","                        o.accel = true;","                    }","                }","            }","","            m = ua.match(/(Chrome|CrMo|CriOS)\\/([^\\s]*)/);","            if (m && m[1] && m[2]) {","                o.chrome = numberify(m[2]); // Chrome","                o.safari = 0; //Reset safari back to 0","                if (m[1] === 'CrMo') {","                    o.mobile = 'chrome';","                }","            } else {","                m = ua.match(/AdobeAIR\\/([^\\s]*)/);","                if (m) {","                    o.air = m[0]; // Adobe AIR 1.0 or better","                }","            }","        }","","        if (!o.webkit) { // not webkit","// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)","            if (/Opera/.test(ua)) {","                m = ua.match(/Opera[\\s\\/]([^\\s]*)/);","                if (m && m[1]) {","                    o.opera = numberify(m[1]);","                }","                m = ua.match(/Version\\/([^\\s]*)/);","                if (m && m[1]) {","                    o.opera = numberify(m[1]); // opera 10+","                }","","                if (/Opera Mobi/.test(ua)) {","                    o.mobile = 'opera';","                    m = ua.replace('Opera Mobi', '').match(/Opera ([^\\s]*)/);","                    if (m && m[1]) {","                        o.opera = numberify(m[1]);","                    }","                }","                m = ua.match(/Opera Mini[^;]*/);","","                if (m) {","                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316","                }","            } else { // not opera or webkit","                m = ua.match(/MSIE\\s([^;]*)/);","                if (m && m[1]) {","                    o.ie = numberify(m[1]);","                } else { // not opera, webkit, or ie","                    m = ua.match(/Gecko\\/([^\\s]*)/);","                    if (m) {","                        o.gecko = 1; // Gecko detected, look for revision","                        m = ua.match(/rv:([^\\s\\)]*)/);","                        if (m && m[1]) {","                            o.gecko = numberify(m[1]);","                        }","                    }","                }","            }","        }","    }","","    //It was a parsed UA, do not assign the global value.","    if (!subUA) {","","        if (typeof process == 'object') {","","            if (process.versions && process.versions.node) {","                //NodeJS","                o.os = process.platform;","                o.nodejs = numberify(process.versions.node);","            }","        }","","        YUI.Env.UA = o;","","    }","","    return o;","};","","","Y.UA = YUI.Env.UA || YUI.Env.parseUA();","","/**","Performs a simple comparison between two version numbers, accounting for","standard versioning logic such as the fact that \"535.8\" is a lower version than","\"535.24\", even though a simple numerical comparison would indicate that it's","greater. Also accounts for cases such as \"1.1\" vs. \"1.1.0\", which are","considered equivalent.","","Returns -1 if version _a_ is lower than version _b_, 0 if they're equivalent,","1 if _a_ is higher than _b_.","","Versions may be numbers or strings containing numbers and dots. For example,","both `535` and `\"535.8.10\"` are acceptable. A version string containing","non-numeric characters, like `\"535.8.beta\"`, may produce unexpected results.","","@method compareVersions","@param {Number|String} a First version number to compare.","@param {Number|String} b Second version number to compare.","@return -1 if _a_ is lower than _b_, 0 if they're equivalent, 1 if _a_ is","    higher than _b_.","**/","Y.UA.compareVersions = function (a, b) {","    var aPart, aParts, bPart, bParts, i, len;","","    if (a === b) {","        return 0;","    }","","    aParts = (a + '').split('.');","    bParts = (b + '').split('.');","","    for (i = 0, len = Math.max(aParts.length, bParts.length); i < len; ++i) {","        aPart = parseInt(aParts[i], 10);","        bPart = parseInt(bParts[i], 10);","","        isNaN(aPart) && (aPart = 0);","        isNaN(bPart) && (bPart = 0);","","        if (aPart < bPart) {","            return -1;","        }","","        if (aPart > bPart) {","            return 1;","        }","    }","","    return 0;","};","YUI.Env.aliases = {","    \"anim\": [\"anim-base\",\"anim-color\",\"anim-curve\",\"anim-easing\",\"anim-node-plugin\",\"anim-scroll\",\"anim-xy\"],","    \"app\": [\"app-base\",\"app-content\",\"app-transitions\",\"lazy-model-list\",\"model\",\"model-list\",\"model-sync-rest\",\"router\",\"view\",\"view-node-map\"],","    \"attribute\": [\"attribute-base\",\"attribute-complex\"],","    \"autocomplete\": [\"autocomplete-base\",\"autocomplete-sources\",\"autocomplete-list\",\"autocomplete-plugin\"],","    \"base\": [\"base-base\",\"base-pluginhost\",\"base-build\"],","    \"cache\": [\"cache-base\",\"cache-offline\",\"cache-plugin\"],","    \"collection\": [\"array-extras\",\"arraylist\",\"arraylist-add\",\"arraylist-filter\",\"array-invoke\"],","    \"controller\": [\"router\"],","    \"dataschema\": [\"dataschema-base\",\"dataschema-json\",\"dataschema-xml\",\"dataschema-array\",\"dataschema-text\"],","    \"datasource\": [\"datasource-local\",\"datasource-io\",\"datasource-get\",\"datasource-function\",\"datasource-cache\",\"datasource-jsonschema\",\"datasource-xmlschema\",\"datasource-arrayschema\",\"datasource-textschema\",\"datasource-polling\"],","    \"datatable\": [\"datatable-core\",\"datatable-table\",\"datatable-head\",\"datatable-body\",\"datatable-base\",\"datatable-column-widths\",\"datatable-message\",\"datatable-mutable\",\"datatable-sort\",\"datatable-datasource\"],","    \"datatable-deprecated\": [\"datatable-base-deprecated\",\"datatable-datasource-deprecated\",\"datatable-sort-deprecated\",\"datatable-scroll-deprecated\"],","    \"datatype\": [\"datatype-number\",\"datatype-date\",\"datatype-xml\"],","    \"datatype-date\": [\"datatype-date-parse\",\"datatype-date-format\"],","    \"datatype-number\": [\"datatype-number-parse\",\"datatype-number-format\"],","    \"datatype-xml\": [\"datatype-xml-parse\",\"datatype-xml-format\"],","    \"dd\": [\"dd-ddm-base\",\"dd-ddm\",\"dd-ddm-drop\",\"dd-drag\",\"dd-proxy\",\"dd-constrain\",\"dd-drop\",\"dd-scroll\",\"dd-delegate\"],","    \"dom\": [\"dom-base\",\"dom-screen\",\"dom-style\",\"selector-native\",\"selector\"],","    \"editor\": [\"frame\",\"editor-selection\",\"exec-command\",\"editor-base\",\"editor-para\",\"editor-br\",\"editor-bidi\",\"editor-tab\",\"createlink-base\"],","    \"event\": [\"event-base\",\"event-delegate\",\"event-synthetic\",\"event-mousewheel\",\"event-mouseenter\",\"event-key\",\"event-focus\",\"event-resize\",\"event-hover\",\"event-outside\",\"event-touch\",\"event-move\",\"event-flick\",\"event-valuechange\"],","    \"event-custom\": [\"event-custom-base\",\"event-custom-complex\"],","    \"event-gestures\": [\"event-flick\",\"event-move\"],","    \"handlebars\": [\"handlebars-compiler\"],","    \"highlight\": [\"highlight-base\",\"highlight-accentfold\"],","    \"history\": [\"history-base\",\"history-hash\",\"history-hash-ie\",\"history-html5\"],","    \"io\": [\"io-base\",\"io-xdr\",\"io-form\",\"io-upload-iframe\",\"io-queue\"],","    \"json\": [\"json-parse\",\"json-stringify\"],","    \"loader\": [\"loader-base\",\"loader-rollup\",\"loader-yui3\"],","    \"node\": [\"node-base\",\"node-event-delegate\",\"node-pluginhost\",\"node-screen\",\"node-style\"],","    \"pluginhost\": [\"pluginhost-base\",\"pluginhost-config\"],","    \"querystring\": [\"querystring-parse\",\"querystring-stringify\"],","    \"recordset\": [\"recordset-base\",\"recordset-sort\",\"recordset-filter\",\"recordset-indexer\"],","    \"resize\": [\"resize-base\",\"resize-proxy\",\"resize-constrain\"],","    \"slider\": [\"slider-base\",\"slider-value-range\",\"clickable-rail\",\"range-slider\"],","    \"text\": [\"text-accentfold\",\"text-wordbreak\"],","    \"widget\": [\"widget-base\",\"widget-htmlparser\",\"widget-skin\",\"widget-uievents\"]","};","","","}, '@VERSION@' );","YUI.add('get', function(Y) {","","/*jslint boss:true, expr:true, laxbreak: true */","","/**","Provides dynamic loading of remote JavaScript and CSS resources.","","@module get","@class Get","@static","**/","","var Lang = Y.Lang,","","    CUSTOM_ATTRS, // defined lazily in Y.Get.Transaction._createNode()","","    Get, Transaction;","","Y.Get = Get = {","    // -- Public Properties ----------------------------------------------------","","    /**","    Default options for CSS requests. Options specified here will override","    global defaults for CSS requests.","","    See the `options` property for all available options.","","    @property cssOptions","    @type Object","    @static","    @since 3.5.0","    **/","    cssOptions: {","        attributes: {","            rel: 'stylesheet'","        },","","        doc         : Y.config.linkDoc || Y.config.doc,","        pollInterval: 50","    },","","    /**","    Default options for JS requests. Options specified here will override global","    defaults for JS requests.","","    See the `options` property for all available options.","","    @property jsOptions","    @type Object","    @static","    @since 3.5.0","    **/","    jsOptions: {","        autopurge: true,","        doc      : Y.config.scriptDoc || Y.config.doc","    },","","    /**","    Default options to use for all requests.","","    Note that while all available options are documented here for ease of","    discovery, some options (like callback functions) only make sense at the","    transaction level.","","    Callback functions specified via the options object or the `options`","    parameter of the `css()`, `js()`, or `load()` methods will receive the","    transaction object as a parameter. See `Y.Get.Transaction` for details on","    the properties and methods available on transactions.","","    @static","    @since 3.5.0","    @property {Object} options","","    @property {Boolean} [options.async=false] Whether or not to load scripts","        asynchronously, meaning they're requested in parallel and execution","        order is not guaranteed. Has no effect on CSS, since CSS is always","        loaded asynchronously.","","    @property {Object} [options.attributes] HTML attribute name/value pairs that","        should be added to inserted nodes. By default, the `charset` attribute","        will be set to \"utf-8\" and nodes will be given an auto-generated `id`","        attribute, but you can override these with your own values if desired.","","    @property {Boolean} [options.autopurge] Whether or not to automatically","        purge inserted nodes after the purge threshold is reached. This is","        `true` by default for JavaScript, but `false` for CSS since purging a","        CSS node will also remove any styling applied by the referenced file.","","    @property {Object} [options.context] `this` object to use when calling","        callback functions. Defaults to the transaction object.","","    @property {Mixed} [options.data] Arbitrary data object to pass to \"on*\"","        callbacks.","","    @property {Document} [options.doc] Document into which nodes should be","        inserted. By default, the current document is used.","","    @property {HTMLElement|String} [options.insertBefore] HTML element or id","        string of an element before which all generated nodes should be","        inserted. If not specified, Get will automatically determine the best","        place to insert nodes for maximum compatibility.","","    @property {Function} [options.onEnd] Callback to execute after a transaction","        is complete, regardless of whether it succeeded or failed.","","    @property {Function} [options.onFailure] Callback to execute after a","        transaction fails, times out, or is aborted.","","    @property {Function} [options.onProgress] Callback to execute after each","        individual request in a transaction either succeeds or fails.","","    @property {Function} [options.onSuccess] Callback to execute after a","        transaction completes successfully with no errors. Note that in browsers","        that don't support the `error` event on CSS `<link>` nodes, a failed CSS","        request may still be reported as a success because in these browsers","        it can be difficult or impossible to distinguish between success and","        failure for CSS resources.","","    @property {Function} [options.onTimeout] Callback to execute after a","        transaction times out.","","    @property {Number} [options.pollInterval=50] Polling interval (in","        milliseconds) for detecting CSS load completion in browsers that don't","        support the `load` event on `<link>` nodes. This isn't used for","        JavaScript.","","    @property {Number} [options.purgethreshold=20] Number of nodes to insert","        before triggering an automatic purge when `autopurge` is `true`.","","    @property {Number} [options.timeout] Number of milliseconds to wait before","        aborting a transaction. When a timeout occurs, the `onTimeout` callback","        is called, followed by `onFailure` and finally `onEnd`. By default,","        there is no timeout.","","    @property {String} [options.type] Resource type (\"css\" or \"js\"). This option","        is set automatically by the `css()` and `js()` functions and will be","        ignored there, but may be useful when using the `load()` function. If","        not specified, the type will be inferred from the URL, defaulting to","        \"js\" if the URL doesn't contain a recognizable file extension.","    **/","    options: {","        attributes: {","            charset: 'utf-8'","        },","","        purgethreshold: 20","    },","","    // -- Protected Properties -------------------------------------------------","","    /**","    Regex that matches a CSS URL. Used to guess the file type when it's not","    specified.","","    @property REGEX_CSS","    @type RegExp","    @final","    @protected","    @static","    @since 3.5.0","    **/","    REGEX_CSS: /\\.css(?:[?;].*)?$/i,","","    /**","    Regex that matches a JS URL. Used to guess the file type when it's not","    specified.","","    @property REGEX_JS","    @type RegExp","    @final","    @protected","    @static","    @since 3.5.0","    **/","    REGEX_JS : /\\.js(?:[?;].*)?$/i,","","    /**","    Contains information about the current environment, such as what script and","    link injection features it supports.","","    This object is created and populated the first time the `_getEnv()` method","    is called.","","    @property _env","    @type Object","    @protected","    @static","    @since 3.5.0","    **/","","    /**","    Mapping of document _yuid strings to <head> or <base> node references so we","    don't have to look the node up each time we want to insert a request node.","","    @property _insertCache","    @type Object","    @protected","    @static","    @since 3.5.0","    **/","    _insertCache: {},","","    /**","    Information about the currently pending transaction, if any.","","    This is actually an object with two properties: `callback`, containing the","    optional callback passed to `css()`, `load()`, or `js()`; and `transaction`,","    containing the actual transaction instance.","","    @property _pending","    @type Object","    @protected","    @static","    @since 3.5.0","    **/","    _pending: null,","","    /**","    HTML nodes eligible to be purged next time autopurge is triggered.","","    @property _purgeNodes","    @type HTMLElement[]","    @protected","    @static","    @since 3.5.0","    **/","    _purgeNodes: [],","","    /**","    Queued transactions and associated callbacks.","","    @property _queue","    @type Object[]","    @protected","    @static","    @since 3.5.0","    **/","    _queue: [],","","    // -- Public Methods -------------------------------------------------------","","    /**","    Aborts the specified transaction.","","    This will cause the transaction's `onFailure` callback to be called and","    will prevent any new script and link nodes from being added to the document,","    but any resources that have already been requested will continue loading","    (there's no safe way to prevent this, unfortunately).","","    *Note:* This method is deprecated as of 3.5.0, and will be removed in a","    future version of YUI. Use the transaction-level `abort()` method instead.","","    @method abort","    @param {Get.Transaction} transaction Transaction to abort.","    @deprecated Use the `abort()` method on the transaction instead.","    @static","    **/","    abort: function (transaction) {","        var i, id, item, len, pending;","","","        if (!transaction.abort) {","            id          = transaction;","            pending     = this._pending;","            transaction = null;","","            if (pending && pending.transaction.id === id) {","                transaction   = pending.transaction;","                this._pending = null;","            } else {","                for (i = 0, len = this._queue.length; i < len; ++i) {","                    item = this._queue[i].transaction;","","                    if (item.id === id) {","                        transaction = item;","                        this._queue.splice(i, 1);","                        break;","                    }","                }","            }","        }","","        transaction && transaction.abort();","    },","","    /**","    Loads one or more CSS files.","","    The _urls_ parameter may be provided as a URL string, a request object,","    or an array of URL strings and/or request objects.","","    A request object is just an object that contains a `url` property and zero","    or more options that should apply specifically to that request.","    Request-specific options take priority over transaction-level options and","    default options.","","    URLs may be relative or absolute, and do not have to have the same origin","    as the current page.","","    The `options` parameter may be omitted completely and a callback passed in","    its place, if desired.","","    @example","","        // Load a single CSS file and log a message on completion.","        Y.Get.css('foo.css', function (err) {","            if (err) {","            } else {","            }","        });","","        // Load multiple CSS files and log a message when all have finished","        // loading.","        var urls = ['foo.css', 'http://example.com/bar.css', 'baz/quux.css'];","","        Y.Get.css(urls, function (err) {","            if (err) {","            } else {","            }","        });","","        // Specify transaction-level options, which will apply to all requests","        // within the transaction.","        Y.Get.css(urls, {","            attributes: {'class': 'my-css'},","            timeout   : 5000","        });","","        // Specify per-request options, which override transaction-level and","        // default options.","        Y.Get.css([","            {url: 'foo.css', attributes: {id: 'foo'}},","            {url: 'bar.css', attributes: {id: 'bar', charset: 'iso-8859-1'}}","        ]);","","    @method css","    @param {String|Object|Array} urls URL string, request object, or array","        of URLs and/or request objects to load.","    @param {Object} [options] Options for this transaction. See the","        `Y.Get.options` property for a complete list of available options.","    @param {Function} [callback] Callback function to be called on completion.","        This is a general callback and will be called before any more granular","        callbacks (`onSuccess`, `onFailure`, etc.) specified in the `options`","        object.","","        @param {Array|null} callback.err Array of errors that occurred during","            the transaction, or `null` on success.","        @param {Get.Transaction} callback.transaction Transaction object.","","    @return {Get.Transaction} Transaction object.","    @static","    **/","    css: function (urls, options, callback) {","        return this._load('css', urls, options, callback);","    },","","    /**","    Loads one or more JavaScript resources.","","    The _urls_ parameter may be provided as a URL string, a request object,","    or an array of URL strings and/or request objects.","","    A request object is just an object that contains a `url` property and zero","    or more options that should apply specifically to that request.","    Request-specific options take priority over transaction-level options and","    default options.","","    URLs may be relative or absolute, and do not have to have the same origin","    as the current page.","","    The `options` parameter may be omitted completely and a callback passed in","    its place, if desired.","","    Scripts will be executed in the order they're specified unless the `async`","    option is `true`, in which case they'll be loaded in parallel and executed","    in whatever order they finish loading.","","    @example","","        // Load a single JS file and log a message on completion.","        Y.Get.js('foo.js', function (err) {","            if (err) {","            } else {","            }","        });","","        // Load multiple JS files, execute them in order, and log a message when","        // all have finished loading.","        var urls = ['foo.js', 'http://example.com/bar.js', 'baz/quux.js'];","","        Y.Get.js(urls, function (err) {","            if (err) {","            } else {","            }","        });","","        // Specify transaction-level options, which will apply to all requests","        // within the transaction.","        Y.Get.js(urls, {","            attributes: {'class': 'my-js'},","            timeout   : 5000","        });","","        // Specify per-request options, which override transaction-level and","        // default options.","        Y.Get.js([","            {url: 'foo.js', attributes: {id: 'foo'}},","            {url: 'bar.js', attributes: {id: 'bar', charset: 'iso-8859-1'}}","        ]);","","    @method js","    @param {String|Object|Array} urls URL string, request object, or array","        of URLs and/or request objects to load.","    @param {Object} [options] Options for this transaction. See the","        `Y.Get.options` property for a complete list of available options.","    @param {Function} [callback] Callback function to be called on completion.","        This is a general callback and will be called before any more granular","        callbacks (`onSuccess`, `onFailure`, etc.) specified in the `options`","        object.","","        @param {Array|null} callback.err Array of errors that occurred during","            the transaction, or `null` on success.","        @param {Get.Transaction} callback.transaction Transaction object.","","    @return {Get.Transaction} Transaction object.","    @since 3.5.0","    @static","    **/","    js: function (urls, options, callback) {","        return this._load('js', urls, options, callback);","    },","","    /**","    Loads one or more CSS and/or JavaScript resources in the same transaction.","","    Use this method when you want to load both CSS and JavaScript in a single","    transaction and be notified when all requested URLs have finished loading,","    regardless of type.","","    Behavior and options are the same as for the `css()` and `js()` methods. If","    a resource type isn't specified in per-request options or transaction-level","    options, Get will guess the file type based on the URL's extension (`.css`","    or `.js`, with or without a following query string). If the file type can't","    be guessed from the URL, a warning will be logged and Get will assume the","    URL is a JavaScript resource.","","    @example","","        // Load both CSS and JS files in a single transaction, and log a message","        // when all files have finished loading.","        Y.Get.load(['foo.css', 'bar.js', 'baz.css'], function (err) {","            if (err) {","            } else {","            }","        });","","    @method load","    @param {String|Object|Array} urls URL string, request object, or array","        of URLs and/or request objects to load.","    @param {Object} [options] Options for this transaction. See the","        `Y.Get.options` property for a complete list of available options.","    @param {Function} [callback] Callback function to be called on completion.","        This is a general callback and will be called before any more granular","        callbacks (`onSuccess`, `onFailure`, etc.) specified in the `options`","        object.","","        @param {Array|null} err Array of errors that occurred during the","            transaction, or `null` on success.","        @param {Get.Transaction} Transaction object.","","    @return {Get.Transaction} Transaction object.","    @since 3.5.0","    @static","    **/","    load: function (urls, options, callback) {","        return this._load(null, urls, options, callback);","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","    Triggers an automatic purge if the purge threshold has been reached.","","    @method _autoPurge","    @param {Number} threshold Purge threshold to use, in milliseconds.","    @protected","    @since 3.5.0","    @static","    **/","    _autoPurge: function (threshold) {","        if (threshold && this._purgeNodes.length >= threshold) {","            this._purge(this._purgeNodes);","        }","    },","","    /**","    Populates the `_env` property with information about the current","    environment.","","    @method _getEnv","    @return {Object} Environment information.","    @protected","    @since 3.5.0","    @static","    **/","    _getEnv: function () {","        var doc = Y.config.doc,","            ua  = Y.UA;","","        // Note: some of these checks require browser sniffs since it's not","        // feasible to load test files on every pageview just to perform a","        // feature test. I'm sorry if this makes you sad.","        return (this._env = {","            // True if this is a browser that supports disabling async mode on","            // dynamically created script nodes. See","            // https://developer.mozilla.org/En/HTML/Element/Script#Attributes","            async: doc && doc.createElement('script').async === true,","","            // True if this browser fires an event when a dynamically injected","            // link node fails to load. This is currently true for Firefox 9+","            // and WebKit 535.24+.","            cssFail: ua.gecko >= 9 || ua.compareVersions(ua.webkit, 535.24) >= 0,","","            // True if this browser fires an event when a dynamically injected","            // link node finishes loading. This is currently true for IE, Opera,","            // Firefox 9+, and WebKit 535.24+. Note that IE versions <9 fire the","            // DOM 0 \"onload\" event, but not \"load\". All versions of IE fire","            // \"onload\".","            // davglass: Seems that Chrome on Android needs this to be false.","            cssLoad: (","                    (!ua.gecko && !ua.webkit) || ua.gecko >= 9 ||","                    ua.compareVersions(ua.webkit, 535.24) >= 0","                ) && !(ua.chrome && ua.chrome <= 18),","","            // True if this browser preserves script execution order while","            // loading scripts in parallel as long as the script node's `async`","            // attribute is set to false to explicitly disable async execution.","            preservesScriptOrder: !!(ua.gecko || ua.opera)","        });","    },","","    _getTransaction: function (urls, options) {","        var requests = [],","            i, len, req, url;","","        if (!Lang.isArray(urls)) {","            urls = [urls];","        }","","        options = Y.merge(this.options, options);","","        // Clone the attributes object so we don't end up modifying it by ref.","        options.attributes = Y.merge(this.options.attributes,","                options.attributes);","","        for (i = 0, len = urls.length; i < len; ++i) {","            url = urls[i];","            req = {attributes: {}};","","            // If `url` is a string, we create a URL object for it, then mix in","            // global options and request-specific options. If it's an object","            // with a \"url\" property, we assume it's a request object containing","            // URL-specific options.","            if (typeof url === 'string') {","                req.url = url;","            } else if (url.url) {","                // URL-specific options override both global defaults and","                // request-specific options.","                Y.mix(req, url, false, null, 0, true);","                url = url.url; // Make url a string so we can use it later.","            } else {","                continue;","            }","","            Y.mix(req, options, false, null, 0, true);","","            // If we didn't get an explicit type for this URL either in the","            // request options or the URL-specific options, try to determine","            // one from the file extension.","            if (!req.type) {","                if (this.REGEX_CSS.test(url)) {","                    req.type = 'css';","                } else {","                    if (!this.REGEX_JS.test(url)) {","                    }","","                    req.type = 'js';","                }","            }","","            // Mix in type-specific default options, but don't overwrite any","            // options that have already been set.","            Y.mix(req, req.type === 'js' ? this.jsOptions : this.cssOptions,","                false, null, 0, true);","","            // Give the node an id attribute if it doesn't already have one.","            req.attributes.id || (req.attributes.id = Y.guid());","","            // Backcompat for <3.5.0 behavior.","            if (req.win) {","                req.doc = req.win.document;","            } else {","                req.win = req.doc.defaultView || req.doc.parentWindow;","            }","","            if (req.charset) {","                req.attributes.charset = req.charset;","            }","","            requests.push(req);","        }","","        return new Transaction(requests, options);","    },","","    _load: function (type, urls, options, callback) {","        var transaction;","","        // Allow callback as third param.","        if (typeof options === 'function') {","            callback = options;","            options  = {};","        }","","        options || (options = {});","        options.type = type;","","        if (!this._env) {","            this._getEnv();","        }","","        transaction = this._getTransaction(urls, options);","","        this._queue.push({","            callback   : callback,","            transaction: transaction","        });","","        this._next();","","        return transaction;","    },","","    _next: function () {","        var item;","","        if (this._pending) {","            return;","        }","","        item = this._queue.shift();","","        if (item) {","            this._pending = item;","","            item.transaction.execute(function () {","                item.callback && item.callback.apply(this, arguments);","","                Get._pending = null;","                Get._next();","            });","        }","    },","","    _purge: function (nodes) {","        var purgeNodes    = this._purgeNodes,","            isTransaction = nodes !== purgeNodes,","            index, node;","","        while (node = nodes.pop()) { // assignment","            // Don't purge nodes that haven't finished loading (or errored out),","            // since this can hang the transaction.","            if (!node._yuiget_finished) {","                continue;","            }","","            node.parentNode && node.parentNode.removeChild(node);","","            // If this is a transaction-level purge and this node also exists in","            // the Get-level _purgeNodes array, we need to remove it from","            // _purgeNodes to avoid creating a memory leak. The indexOf lookup","            // sucks, but until we get WeakMaps, this is the least troublesome","            // way to do this (we can't just hold onto node ids because they may","            // not be in the same document).","            if (isTransaction) {","                index = Y.Array.indexOf(purgeNodes, node);","","                if (index > -1) {","                    purgeNodes.splice(index, 1);","                }","            }","        }","    }","};","","/**","Alias for `js()`.","","@method script","@static","**/","Get.script = Get.js;","","/**","Represents a Get transaction, which may contain requests for one or more JS or","CSS files.","","This class should not be instantiated manually. Instances will be created and","returned as needed by Y.Get's `css()`, `js()`, and `load()` methods.","","@class Get.Transaction","@constructor","@since 3.5.0","**/","Get.Transaction = Transaction = function (requests, options) {","    var self = this;","","    self.id       = Transaction._lastId += 1;","    self.data     = options.data;","    self.errors   = [];","    self.nodes    = [];","    self.options  = options;","    self.requests = requests;","","    self._callbacks = []; // callbacks to call after execution finishes","    self._queue     = [];","    self._waiting   = 0;","","    // Deprecated pre-3.5.0 properties.","    self.tId = self.id; // Use `id` instead.","    self.win = options.win || Y.config.win;","};","","/**","Arbitrary data object associated with this transaction.","","This object comes from the options passed to `Get.css()`, `Get.js()`, or","`Get.load()`, and will be `undefined` if no data object was specified.","","@property {Object} data","**/","","/**","Array of errors that have occurred during this transaction, if any.","","@since 3.5.0","@property {Object[]} errors","@property {String} errors.error Error message.","@property {Object} errors.request Request object related to the error.","**/","","/**","Numeric id for this transaction, unique among all transactions within the same","YUI sandbox in the current pageview.","","@property {Number} id","@since 3.5.0","**/","","/**","HTMLElement nodes (native ones, not YUI Node instances) that have been inserted","during the current transaction.","","@property {HTMLElement[]} nodes","**/","","/**","Options associated with this transaction.","","See `Get.options` for the full list of available options.","","@property {Object} options","@since 3.5.0","**/","","/**","Request objects contained in this transaction. Each request object represents","one CSS or JS URL that will be (or has been) requested and loaded into the page.","","@property {Object} requests","@since 3.5.0","**/","","/**","Id of the most recent transaction.","","@property _lastId","@type Number","@protected","@static","**/","Transaction._lastId = 0;","","Transaction.prototype = {","    // -- Public Properties ----------------------------------------------------","","    /**","    Current state of this transaction. One of \"new\", \"executing\", or \"done\".","","    @property _state","    @type String","    @protected","    **/","    _state: 'new', // \"new\", \"executing\", or \"done\"","","    // -- Public Methods -------------------------------------------------------","","    /**","    Aborts this transaction.","","    This will cause the transaction's `onFailure` callback to be called and","    will prevent any new script and link nodes from being added to the document,","    but any resources that have already been requested will continue loading","    (there's no safe way to prevent this, unfortunately).","","    @method abort","    @param {String} [msg=\"Aborted.\"] Optional message to use in the `errors`","        array describing why the transaction was aborted.","    **/","    abort: function (msg) {","        this._pending    = null;","        this._pendingCSS = null;","        this._pollTimer  = clearTimeout(this._pollTimer);","        this._queue      = [];","        this._waiting    = 0;","","        this.errors.push({error: msg || 'Aborted'});","        this._finish();","    },","","    /**","    Begins execting the transaction.","","    There's usually no reason to call this manually, since Get will call it","    automatically when other pending transactions have finished. If you really","    want to execute your transaction before Get does, you can, but be aware that","    this transaction's scripts may end up executing before the scripts in other","    pending transactions.","","    If the transaction is already executing, the specified callback (if any)","    will be queued and called after execution finishes. If the transaction has","    already finished, the callback will be called immediately (the transaction","    will not be executed again).","","    @method execute","    @param {Function} callback Callback function to execute after all requests","        in the transaction are complete, or after the transaction is aborted.","    **/","    execute: function (callback) {","        var self     = this,","            requests = self.requests,","            state    = self._state,","            i, len, queue, req;","","        if (state === 'done') {","            callback && callback(self.errors.length ? self.errors : null, self);","            return;","        } else {","            callback && self._callbacks.push(callback);","","            if (state === 'executing') {","                return;","            }","        }","","        self._state = 'executing';","        self._queue = queue = [];","","        if (self.options.timeout) {","            self._timeout = setTimeout(function () {","                self.abort('Timeout');","            }, self.options.timeout);","        }","","        for (i = 0, len = requests.length; i < len; ++i) {","            req = self.requests[i];","","            if (req.async || req.type === 'css') {","                // No need to queue CSS or fully async JS.","                self._insert(req);","            } else {","                queue.push(req);","            }","        }","","        self._next();","    },","","    /**","    Manually purges any `<script>` or `<link>` nodes this transaction has","    created.","","    Be careful when purging a transaction that contains CSS requests, since","    removing `<link>` nodes will also remove any styles they applied.","","    @method purge","    **/","    purge: function () {","        Get._purge(this.nodes);","    },","","    // -- Protected Methods ----------------------------------------------------","    _createNode: function (name, attrs, doc) {","        var node = doc.createElement(name),","            attr, testEl;","","        if (!CUSTOM_ATTRS) {","            // IE6 and IE7 expect property names rather than attribute names for","            // certain attributes. Rather than sniffing, we do a quick feature","            // test the first time _createNode() runs to determine whether we","            // need to provide a workaround.","            testEl = doc.createElement('div');","            testEl.setAttribute('class', 'a');","","            CUSTOM_ATTRS = testEl.className === 'a' ? {} : {","                'for'  : 'htmlFor',","                'class': 'className'","            };","        }","","        for (attr in attrs) {","            if (attrs.hasOwnProperty(attr)) {","                node.setAttribute(CUSTOM_ATTRS[attr] || attr, attrs[attr]);","            }","        }","","        return node;","    },","","    _finish: function () {","        var errors  = this.errors.length ? this.errors : null,","            options = this.options,","            thisObj = options.context || this,","            data, i, len;","","        if (this._state === 'done') {","            return;","        }","","        this._state = 'done';","","        for (i = 0, len = this._callbacks.length; i < len; ++i) {","            this._callbacks[i].call(thisObj, errors, this);","        }","","        data = this._getEventData();","","        if (errors) {","            if (options.onTimeout && errors[errors.length - 1].error === 'Timeout') {","                options.onTimeout.call(thisObj, data);","            }","","            if (options.onFailure) {","                options.onFailure.call(thisObj, data);","            }","        } else if (options.onSuccess) {","            options.onSuccess.call(thisObj, data);","        }","","        if (options.onEnd) {","            options.onEnd.call(thisObj, data);","        }","    },","","    _getEventData: function (req) {","        if (req) {","            // This merge is necessary for backcompat. I hate it.","            return Y.merge(this, {","                abort  : this.abort, // have to copy these because the prototype isn't preserved","                purge  : this.purge,","                request: req,","                url    : req.url,","                win    : req.win","            });","        } else {","            return this;","        }","    },","","    _getInsertBefore: function (req) {","        var doc = req.doc,","            el  = req.insertBefore,","            cache, cachedNode, docStamp;","","        if (el) {","            return typeof el === 'string' ? doc.getElementById(el) : el;","        }","","        cache    = Get._insertCache;","        docStamp = Y.stamp(doc);","","        if ((el = cache[docStamp])) { // assignment","            return el;","        }","","        // Inserting before a <base> tag apparently works around an IE bug","        // (according to a comment from pre-3.5.0 Y.Get), but I'm not sure what","        // bug that is, exactly. Better safe than sorry?","        if ((el = doc.getElementsByTagName('base')[0])) { // assignment","            return (cache[docStamp] = el);","        }","","        // Look for a <head> element.","        el = doc.head || doc.getElementsByTagName('head')[0];","","        if (el) {","            // Create a marker node at the end of <head> to use as an insertion","            // point. Inserting before this node will ensure that all our CSS","            // gets inserted in the correct order, to maintain style precedence.","            el.appendChild(doc.createTextNode(''));","            return (cache[docStamp] = el.lastChild);","        }","","        // If all else fails, just insert before the first script node on the","        // page, which is virtually guaranteed to exist.","        return (cache[docStamp] = doc.getElementsByTagName('script')[0]);","    },","","    _insert: function (req) {","        var env          = Get._env,","            insertBefore = this._getInsertBefore(req),","            isScript     = req.type === 'js',","            node         = req.node,","            self         = this,","            ua           = Y.UA,","            cssTimeout, nodeType;","","        if (!node) {","            if (isScript) {","                nodeType = 'script';","            } else if (!env.cssLoad && ua.gecko) {","                nodeType = 'style';","            } else {","                nodeType = 'link';","            }","","            node = req.node = this._createNode(nodeType, req.attributes,","                req.doc);","        }","","        function onError() {","            self._progress('Failed to load ' + req.url, req);","        }","","        function onLoad() {","            if (cssTimeout) {","                clearTimeout(cssTimeout);","            }","","            self._progress(null, req);","        }","","","        // Deal with script asynchronicity.","        if (isScript) {","            node.setAttribute('src', req.url);","","            if (req.async) {","                // Explicitly indicate that we want the browser to execute this","                // script asynchronously. This is necessary for older browsers","                // like Firefox <4.","                node.async = true;","            } else {","                if (env.async) {","                    // This browser treats injected scripts as async by default","                    // (standard HTML5 behavior) but asynchronous loading isn't","                    // desired, so tell the browser not to mark this script as","                    // async.","                    node.async = false;","                }","","                // If this browser doesn't preserve script execution order based","                // on insertion order, we'll need to avoid inserting other","                // scripts until this one finishes loading.","                if (!env.preservesScriptOrder) {","                    this._pending = req;","                }","            }","        } else {","            if (!env.cssLoad && ua.gecko) {","                // In Firefox <9, we can import the requested URL into a <style>","                // node and poll for the existence of node.sheet.cssRules. This","                // gives us a reliable way to determine CSS load completion that","                // also works for cross-domain stylesheets.","                //","                // Props to Zach Leatherman for calling my attention to this","                // technique.","                node.innerHTML = (req.attributes.charset ?","                    '@charset \"' + req.attributes.charset + '\";' : '') +","                    '@import \"' + req.url + '\";';","            } else {","                node.setAttribute('href', req.url);","            }","        }","","        // Inject the node.","        if (isScript && ua.ie && (ua.ie < 9 || (document.documentMode && document.documentMode < 9))) {","            // Script on IE < 9, and IE 9+ when in IE 8 or older modes, including quirks mode.","            node.onreadystatechange = function () {","                if (/loaded|complete/.test(node.readyState)) {","                    node.onreadystatechange = null;","                    onLoad();","                }","            };","        } else if (!isScript && !env.cssLoad) {","            // CSS on Firefox <9 or WebKit.","            this._poll(req);","        } else {","            // Script or CSS on everything else. Using DOM 0 events because that","            // evens the playing field with older IEs.","            node.onerror = onError;","            node.onload  = onLoad;","","            // If this browser doesn't fire an event when CSS fails to load,","            // fail after a timeout to avoid blocking the transaction queue.","            if (!env.cssFail && !isScript) {","                cssTimeout = setTimeout(onError, req.timeout || 3000);","            }","        }","","        this._waiting += 1;","","        this.nodes.push(node);","        insertBefore.parentNode.insertBefore(node, insertBefore);","    },","","    _next: function () {","        if (this._pending) {","            return;","        }","","        // If there are requests in the queue, insert the next queued request.","        // Otherwise, if we're waiting on already-inserted requests to finish,","        // wait longer. If there are no queued requests and we're not waiting","        // for anything to load, then we're done!","        if (this._queue.length) {","            this._insert(this._queue.shift());","        } else if (!this._waiting) {","            this._finish();","        }","    },","","    _poll: function (newReq) {","        var self       = this,","            pendingCSS = self._pendingCSS,","            isWebKit   = Y.UA.webkit,","            i, hasRules, j, nodeHref, req, sheets;","","        if (newReq) {","            pendingCSS || (pendingCSS = self._pendingCSS = []);","            pendingCSS.push(newReq);","","            if (self._pollTimer) {","                // A poll timeout is already pending, so no need to create a","                // new one.","                return;","            }","        }","","        self._pollTimer = null;","","        // Note: in both the WebKit and Gecko hacks below, a CSS URL that 404s","        // will still be treated as a success. There's no good workaround for","        // this.","","        for (i = 0; i < pendingCSS.length; ++i) {","            req = pendingCSS[i];","","            if (isWebKit) {","                // Look for a stylesheet matching the pending URL.","                sheets   = req.doc.styleSheets;","                j        = sheets.length;","                nodeHref = req.node.href;","","                while (--j >= 0) {","                    if (sheets[j].href === nodeHref) {","                        pendingCSS.splice(i, 1);","                        i -= 1;","                        self._progress(null, req);","                        break;","                    }","                }","            } else {","                // Many thanks to Zach Leatherman for calling my attention to","                // the @import-based cross-domain technique used here, and to","                // Oleg Slobodskoi for an earlier same-domain implementation.","                //","                // See Zach's blog for more details:","                // http://www.zachleat.com/web/2010/07/29/load-css-dynamically/","                try {","                    // We don't really need to store this value since we never","                    // use it again, but if we don't store it, Closure Compiler","                    // assumes the code is useless and removes it.","                    hasRules = !!req.node.sheet.cssRules;","","                    // If we get here, the stylesheet has loaded.","                    pendingCSS.splice(i, 1);","                    i -= 1;","                    self._progress(null, req);","                } catch (ex) {","                    // An exception means the stylesheet is still loading.","                }","            }","        }","","        if (pendingCSS.length) {","            self._pollTimer = setTimeout(function () {","                self._poll.call(self);","            }, self.options.pollInterval);","        }","    },","","    _progress: function (err, req) {","        var options = this.options;","","        if (err) {","            req.error = err;","","            this.errors.push({","                error  : err,","                request: req","            });","","        }","","        req.node._yuiget_finished = req.finished = true;","","        if (options.onProgress) {","            options.onProgress.call(options.context || this,","                this._getEventData(req));","        }","","        if (req.autopurge) {","            // Pre-3.5.0 Get always excludes the most recent node from an","            // autopurge. I find this odd, but I'm keeping that behavior for","            // the sake of backcompat.","            Get._autoPurge(this.options.purgethreshold);","            Get._purgeNodes.push(req.node);","        }","","        if (this._pending === req) {","            this._pending = null;","        }","","        this._waiting -= 1;","        this._next();","    }","};","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('features', function(Y) {","","var feature_tests = {};","","/**","Contains the core of YUI's feature test architecture.","@module features","*/","","/**","* Feature detection","* @class Features","* @static","*/","","Y.mix(Y.namespace('Features'), {","    ","    /**","    * Object hash of all registered feature tests","    * @property tests","    * @type Object","    */","    tests: feature_tests,","    ","    /**","    * Add a test to the system","    * ","    *   ```","    *   Y.Features.add(\"load\", \"1\", {});","    *   ```","    * ","    * @method add","    * @param {String} cat The category, right now only 'load' is supported","    * @param {String} name The number sequence of the test, how it's reported in the URL or config: 1, 2, 3","    * @param {Object} o Object containing test properties","    * @param {String} o.name The name of the test","    * @param {Function} o.test The test function to execute, the only argument to the function is the `Y` instance","    * @param {String} o.trigger The module that triggers this test.","    */","    add: function(cat, name, o) {","        feature_tests[cat] = feature_tests[cat] || {};","        feature_tests[cat][name] = o;","    },","    /**","    * Execute all tests of a given category and return the serialized results","    *","    *   ```","    *   caps=1:1;2:1;3:0","    *   ```","    * @method all","    * @param {String} cat The category to execute","    * @param {Array} args The arguments to pass to the test function","    * @return {String} A semi-colon separated string of tests and their success/failure: 1:1;2:1;3:0","    */","    all: function(cat, args) {","        var cat_o = feature_tests[cat],","            // results = {};","            result = [];","        if (cat_o) {","            Y.Object.each(cat_o, function(v, k) {","                result.push(k + ':' + (Y.Features.test(cat, k, args) ? 1 : 0));","            });","        }","","        return (result.length) ? result.join(';') : '';","    },","    /**","    * Run a sepecific test and return a Boolean response.","    *","    *   ```","    *   Y.Features.test(\"load\", \"1\");","    *   ```","    *","    * @method test","    * @param {String} cat The category of the test to run","    * @param {String} name The name of the test to run","    * @param {Array} args The arguments to pass to the test function","    * @return {Boolean} True or false if the test passed/failed.","    */","    test: function(cat, name, args) {","        args = args || [];","        var result, ua, test,","            cat_o = feature_tests[cat],","            feature = cat_o && cat_o[name];","","        if (!feature) {","        } else {","","            result = feature.result;","","            if (Y.Lang.isUndefined(result)) {","","                ua = feature.ua;","                if (ua) {","                    result = (Y.UA[ua]);","                }","","                test = feature.test;","                if (test && ((!ua) || result)) {","                    result = test.apply(Y, args);","                }","","                feature.result = result;","            }","        }","","        return result;","    }","});","","// Y.Features.add(\"load\", \"1\", {});","// Y.Features.test(\"load\", \"1\");","// caps=1:1;2:0;3:1;","","/* This file is auto-generated by src/loader/scripts/meta_join.js */","var add = Y.Features.add;","// app-transitions-native","add('load', '0', {","    \"name\": \"app-transitions-native\",","    \"test\": function (Y) {","    var doc  = Y.config.doc,","        node = doc ? doc.documentElement : null;","","    if (node && node.style) {","        return ('MozTransition' in node.style || 'WebkitTransition' in node.style);","    }","","    return false;","},","    \"trigger\": \"app-transitions\"","});","// autocomplete-list-keys","add('load', '1', {","    \"name\": \"autocomplete-list-keys\",","    \"test\": function (Y) {","    // Only add keyboard support to autocomplete-list if this doesn't appear to","    // be an iOS or Android-based mobile device.","    //","    // There's currently no feasible way to actually detect whether a device has","    // a hardware keyboard, so this sniff will have to do. It can easily be","    // overridden by manually loading the autocomplete-list-keys module.","    //","    // Worth noting: even though iOS supports bluetooth keyboards, Mobile Safari","    // doesn't fire the keyboard events used by AutoCompleteList, so there's","    // no point loading the -keys module even when a bluetooth keyboard may be","    // available.","    return !(Y.UA.ios || Y.UA.android);","},","    \"trigger\": \"autocomplete-list\"","});","// dd-gestures","add('load', '2', {","    \"name\": \"dd-gestures\",","    \"test\": function(Y) {","    return ((Y.config.win && (\"ontouchstart\" in Y.config.win)) && !(Y.UA.chrome && Y.UA.chrome < 6));","},","    \"trigger\": \"dd-drag\"","});","// dom-style-ie","add('load', '3', {","    \"name\": \"dom-style-ie\",","    \"test\": function (Y) {","","    var testFeature = Y.Features.test,","        addFeature = Y.Features.add,","        WINDOW = Y.config.win,","        DOCUMENT = Y.config.doc,","        DOCUMENT_ELEMENT = 'documentElement',","        ret = false;","","    addFeature('style', 'computedStyle', {","        test: function() {","            return WINDOW && 'getComputedStyle' in WINDOW;","        }","    });","","    addFeature('style', 'opacity', {","        test: function() {","            return DOCUMENT && 'opacity' in DOCUMENT[DOCUMENT_ELEMENT].style;","        }","    });","","    ret =  (!testFeature('style', 'opacity') &&","            !testFeature('style', 'computedStyle'));","","    return ret;","},","    \"trigger\": \"dom-style\"","});","// editor-para-ie","add('load', '4', {","    \"name\": \"editor-para-ie\",","    \"trigger\": \"editor-para\",","    \"ua\": \"ie\",","    \"when\": \"instead\"","});","// event-base-ie","add('load', '5', {","    \"name\": \"event-base-ie\",","    \"test\": function(Y) {","    var imp = Y.config.doc && Y.config.doc.implementation;","    return (imp && (!imp.hasFeature('Events', '2.0')));","},","    \"trigger\": \"node-base\"","});","// graphics-canvas","add('load', '6', {","    \"name\": \"graphics-canvas\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext(\"2d\"));","},","    \"trigger\": \"graphics\"","});","// graphics-canvas-default","add('load', '7', {","    \"name\": \"graphics-canvas-default\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext(\"2d\"));","},","    \"trigger\": \"graphics\"","});","// graphics-svg","add('load', '8', {","    \"name\": \"graphics-svg\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    ","    return svg && (useSVG || !canvas);","},","    \"trigger\": \"graphics\"","});","// graphics-svg-default","add('load', '9', {","    \"name\": \"graphics-svg-default\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    ","    return svg && (useSVG || !canvas);","},","    \"trigger\": \"graphics\"","});","// graphics-vml","add('load', '10', {","    \"name\": \"graphics-vml\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\");","    return (DOCUMENT && !DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\") && (!canvas || !canvas.getContext || !canvas.getContext(\"2d\")));","},","    \"trigger\": \"graphics\"","});","// graphics-vml-default","add('load', '11', {","    \"name\": \"graphics-vml-default\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\");","    return (DOCUMENT && !DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\") && (!canvas || !canvas.getContext || !canvas.getContext(\"2d\")));","},","    \"trigger\": \"graphics\"","});","// history-hash-ie","add('load', '12', {","    \"name\": \"history-hash-ie\",","    \"test\": function (Y) {","    var docMode = Y.config.doc && Y.config.doc.documentMode;","","    return Y.UA.ie && (!('onhashchange' in Y.config.win) ||","            !docMode || docMode < 8);","},","    \"trigger\": \"history-hash\"","});","// io-nodejs","add('load', '13', {","    \"name\": \"io-nodejs\",","    \"trigger\": \"io-base\",","    \"ua\": \"nodejs\"","});","// scrollview-base-ie","add('load', '14', {","    \"name\": \"scrollview-base-ie\",","    \"trigger\": \"scrollview-base\",","    \"ua\": \"ie\"","});","// selector-css2","add('load', '15', {","    \"name\": \"selector-css2\",","    \"test\": function (Y) {","    var DOCUMENT = Y.config.doc,","        ret = DOCUMENT && !('querySelectorAll' in DOCUMENT);","","    return ret;","},","    \"trigger\": \"selector\"","});","// transition-timer","add('load', '16', {","    \"name\": \"transition-timer\",","    \"test\": function (Y) {","    var DOCUMENT = Y.config.doc,","        node = (DOCUMENT) ? DOCUMENT.documentElement: null,","        ret = true;","","    if (node && node.style) {","        ret = !('MozTransition' in node.style || 'WebkitTransition' in node.style);","    } ","","    return ret;","},","    \"trigger\": \"transition\"","});","// widget-base-ie","add('load', '17', {","    \"name\": \"widget-base-ie\",","    \"trigger\": \"widget-base\",","    \"ua\": \"ie\"","});","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('intl-base', function(Y) {","","/**"," * The Intl utility provides a central location for managing sets of"," * localized resources (strings and formatting patterns)."," *"," * @class Intl"," * @uses EventTarget"," * @static"," */","","var SPLIT_REGEX = /[, ]/;","","Y.mix(Y.namespace('Intl'), {",""," /**","    * Returns the language among those available that","    * best matches the preferred language list, using the Lookup","    * algorithm of BCP 47.","    * If none of the available languages meets the user's preferences,","    * then \"\" is returned.","    * Extended language ranges are not supported.","    *","    * @method lookupBestLang","    * @param {String[] | String} preferredLanguages The list of preferred","    * languages in descending preference order, represented as BCP 47","    * language tags. A string array or a comma-separated list.","    * @param {String[]} availableLanguages The list of languages","    * that the application supports, represented as BCP 47 language","    * tags.","    *","    * @return {String} The available language that best matches the","    * preferred language list, or \"\".","    * @since 3.1.0","    */","    lookupBestLang: function(preferredLanguages, availableLanguages) {","","        var i, language, result, index;","","        // check whether the list of available languages contains language;","        // if so return it","        function scan(language) {","            var i;","            for (i = 0; i < availableLanguages.length; i += 1) {","                if (language.toLowerCase() ===","                            availableLanguages[i].toLowerCase()) {","                    return availableLanguages[i];","                }","            }","        }","","        if (Y.Lang.isString(preferredLanguages)) {","            preferredLanguages = preferredLanguages.split(SPLIT_REGEX);","        }","","        for (i = 0; i < preferredLanguages.length; i += 1) {","            language = preferredLanguages[i];","            if (!language || language === '*') {","                continue;","            }","            // check the fallback sequence for one language","            while (language.length > 0) {","                result = scan(language);","                if (result) {","                    return result;","                } else {","                    index = language.lastIndexOf('-');","                    if (index >= 0) {","                        language = language.substring(0, index);","                        // one-character subtags get cut along with the","                        // following subtag","                        if (index >= 2 && language.charAt(index - 2) === '-') {","                            language = language.substring(0, index - 2);","                        }","                    } else {","                        // nothing available for this language","                        break;","                    }","                }","            }","        }","","        return '';","    }","});","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('yui-log', function(Y) {","","/**"," * Provides console log capability and exposes a custom event for"," * console implementations. This module is a `core` YUI module, <a href=\"../classes/YUI.html#method_log\">it's documentation is located under the YUI class</a>."," *"," * @module yui"," * @submodule yui-log"," */","","var INSTANCE = Y,","    LOGEVENT = 'yui:log',","    UNDEFINED = 'undefined',","    LEVELS = { debug: 1,","               info: 1,","               warn: 1,","               error: 1 };","","/**"," * If the 'debug' config is true, a 'yui:log' event will be"," * dispatched, which the Console widget and anything else"," * can consume.  If the 'useBrowserConsole' config is true, it will"," * write to the browser console if available.  YUI-specific log"," * messages will only be present in the -debug versions of the"," * JS files.  The build system is supposed to remove log statements"," * from the raw and minified versions of the files."," *"," * @method log"," * @for YUI"," * @param  {String}  msg  The message to log."," * @param  {String}  cat  The log category for the message.  Default"," *                        categories are \"info\", \"warn\", \"error\", time\"."," *                        Custom categories can be used as well. (opt)."," * @param  {String}  src  The source of the the message (opt)."," * @param  {boolean} silent If true, the log event won't fire."," * @return {YUI}      YUI instance."," */","INSTANCE.log = function(msg, cat, src, silent) {","    var bail, excl, incl, m, f,","        Y = INSTANCE,","        c = Y.config,","        publisher = (Y.fire) ? Y : YUI.Env.globalEvents;","    // suppress log message if the config is off or the event stack","    // or the event call stack contains a consumer of the yui:log event","    if (c.debug) {","        // apply source filters","        src = src || \"\";","        if (typeof src !== \"undefined\") {","            excl = c.logExclude;","            incl = c.logInclude;","            if (incl && !(src in incl)) {","                bail = 1;","            } else if (incl && (src in incl)) {","                bail = !incl[src];","            } else if (excl && (src in excl)) {","                bail = excl[src];","            }","        }","        if (!bail) {","            if (c.useBrowserConsole) {","                m = (src) ? src + ': ' + msg : msg;","                if (Y.Lang.isFunction(c.logFn)) {","                    c.logFn.call(Y, msg, cat, src);","                } else if (typeof console != UNDEFINED && console.log) {","                    f = (cat && console[cat] && (cat in LEVELS)) ? cat : 'log';","                    console[f](m);","                } else if (typeof opera != UNDEFINED) {","                    opera.postError(m);","                }","            }","","            if (publisher && !silent) {","","                if (publisher == Y && (!publisher.getEvent(LOGEVENT))) {","                    publisher.publish(LOGEVENT, {","                        broadcast: 2","                    });","                }","","                publisher.fire(LOGEVENT, {","                    msg: msg,","                    cat: cat,","                    src: src","                });","            }","        }","    }","","    return Y;","};","","/**"," * Write a system message.  This message will be preserved in the"," * minified and raw versions of the YUI files, unlike log statements."," * @method message"," * @for YUI"," * @param  {String}  msg  The message to log."," * @param  {String}  cat  The log category for the message.  Default"," *                        categories are \"info\", \"warn\", \"error\", time\"."," *                        Custom categories can be used as well. (opt)."," * @param  {String}  src  The source of the the message (opt)."," * @param  {boolean} silent If true, the log event won't fire."," * @return {YUI}      YUI instance."," */","INSTANCE.message = function() {","    return INSTANCE.log.apply(INSTANCE, arguments);","};","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('yui-later', function(Y) {","","/**"," * Provides a setTimeout/setInterval wrapper. This module is a `core` YUI module, <a href=\"../classes/YUI.html#method_later\">it's documentation is located under the YUI class</a>."," *"," * @module yui"," * @submodule yui-later"," */","","var NO_ARGS = [];","","/**"," * Executes the supplied function in the context of the supplied"," * object 'when' milliseconds later.  Executes the function a"," * single time unless periodic is set to true."," * @for YUI"," * @method later"," * @param when {int} the number of milliseconds to wait until the fn"," * is executed."," * @param o the context object."," * @param fn {Function|String} the function to execute or the name of"," * the method in the 'o' object to execute."," * @param data [Array] data that is provided to the function.  This"," * accepts either a single item or an array.  If an array is provided,"," * the function is executed with one parameter for each array item."," * If you need to pass a single array parameter, it needs to be wrapped"," * in an array [myarray]."," *"," * Note: native methods in IE may not have the call and apply methods."," * In this case, it will work, but you are limited to four arguments."," *"," * @param periodic {boolean} if true, executes continuously at supplied"," * interval until canceled."," * @return {object} a timer object. Call the cancel() method on this"," * object to stop the timer."," */","Y.later = function(when, o, fn, data, periodic) {","    when = when || 0;","    data = (!Y.Lang.isUndefined(data)) ? Y.Array(data) : NO_ARGS;","    o = o || Y.config.win || Y;","","    var cancelled = false,","        method = (o && Y.Lang.isString(fn)) ? o[fn] : fn,","        wrapper = function() {","            // IE 8- may execute a setInterval callback one last time","            // after clearInterval was called, so in order to preserve","            // the cancel() === no more runny-run, we have to jump through","            // an extra hoop.","            if (!cancelled) {","                if (!method.apply) {","                    method(data[0], data[1], data[2], data[3]);","                } else {","                    method.apply(o, data || NO_ARGS);","                }","            }","        },","        id = (periodic) ? setInterval(wrapper, when) : setTimeout(wrapper, when);","","    return {","        id: id,","        interval: periodic,","        cancel: function() {","            cancelled = true;","            if (this.interval) {","                clearInterval(id);","            } else {","                clearTimeout(id);","            }","        }","    };","};","","Y.Lang.later = Y.later;","","","","}, '@VERSION@' ,{requires:['yui-base']});","","","YUI.add('yui', function(Y){}, '@VERSION@' ,{use:['yui-base','get','features','intl-base','yui-log','yui-later']});",""];
/**
 * The YUI module contains the components required for building the YUI seed
 * file.  This includes the script loading mechanism, a simple queue, and
 * the core utilities for the library.
 * @module yui
 * @main yui
 * @submodule yui-base
 */

_yuitest_coverage["/build/yui-base/yui-base.js"].lines = {"10":0,"11":0,"54":0,"55":0,"60":0,"64":0,"65":0,"68":0,"96":0,"97":0,"126":0,"127":0,"131":0,"132":0,"136":0,"141":0,"142":0,"145":0,"148":0,"150":0,"153":0,"155":0,"179":0,"180":0,"181":0,"182":0,"186":0,"188":0,"189":0,"191":0,"192":0,"196":0,"197":0,"198":0,"199":0,"203":0,"208":0,"210":0,"211":0,"212":0,"213":0,"214":0,"216":0,"217":0,"219":0,"220":0,"222":0,"224":0,"228":0,"229":0,"230":0,"239":0,"240":0,"241":0,"243":0,"244":0,"247":0,"248":0,"251":0,"263":0,"265":0,"274":0,"275":0,"276":0,"277":0,"278":0,"279":0,"280":0,"281":0,"282":0,"283":0,"284":0,"285":0,"286":0,"289":0,"294":0,"295":0,"306":0,"315":0,"326":0,"328":0,"329":0,"375":0,"378":0,"379":0,"383":0,"387":0,"388":0,"390":0,"395":0,"399":0,"403":0,"404":0,"405":0,"406":0,"407":0,"408":0,"409":0,"410":0,"416":0,"421":0,"423":0,"425":0,"426":0,"427":0,"429":0,"431":0,"432":0,"433":0,"435":0,"436":0,"437":0,"441":0,"444":0,"445":0,"449":0,"452":0,"465":0,"466":0,"467":0,"468":0,"469":0,"470":0,"472":0,"476":0,"478":0,"480":0,"481":0,"483":0,"484":0,"495":0,"500":0,"501":0,"502":0,"506":0,"507":0,"509":0,"510":0,"526":0,"527":0,"528":0,"531":0,"532":0,"533":0,"534":0,"535":0,"536":0,"537":0,"538":0,"541":0,"544":0,"583":0,"584":0,"596":0,"597":0,"598":0,"600":0,"601":0,"602":0,"603":0,"604":0,"605":0,"606":0,"607":0,"608":0,"615":0,"627":0,"639":0,"640":0,"641":0,"642":0,"643":0,"644":0,"645":0,"646":0,"647":0,"648":0,"649":0,"655":0,"656":0,"658":0,"659":0,"660":0,"661":0,"663":0,"664":0,"665":0,"667":0,"668":0,"669":0,"670":0,"676":0,"677":0,"678":0,"679":0,"680":0,"684":0,"687":0,"688":0,"689":0,"690":0,"698":0,"699":0,"700":0,"701":0,"702":0,"703":0,"706":0,"709":0,"710":0,"711":0,"712":0,"714":0,"715":0,"716":0,"719":0,"720":0,"721":0,"722":0,"723":0,"725":0,"730":0,"731":0,"732":0,"733":0,"734":0,"736":0,"741":0,"742":0,"743":0,"745":0,"746":0,"748":0,"749":0,"754":0,"755":0,"756":0,"757":0,"758":0,"760":0,"771":0,"782":0,"785":0,"787":0,"788":0,"791":0,"792":0,"793":0,"794":0,"795":0,"796":0,"851":0,"861":0,"862":0,"863":0,"864":0,"867":0,"869":0,"870":0,"873":0,"874":0,"875":0,"876":0,"877":0,"881":0,"882":0,"884":0,"885":0,"889":0,"890":0,"891":0,"893":0,"894":0,"898":0,"909":0,"910":0,"911":0,"912":0,"913":0,"914":0,"916":0,"917":0,"919":0,"920":0,"922":0,"940":0,"941":0,"944":0,"963":0,"965":0,"966":0,"969":0,"970":0,"971":0,"972":0,"973":0,"975":0,"978":0,"981":0,"983":0,"984":0,"985":0,"986":0,"990":0,"991":0,"994":0,"995":0,"996":0,"998":0,"999":0,"1000":0,"1001":0,"1005":0,"1006":0,"1008":0,"1013":0,"1014":0,"1018":0,"1019":0,"1026":0,"1034":0,"1036":0,"1037":0,"1038":0,"1039":0,"1040":0,"1041":0,"1042":0,"1043":0,"1045":0,"1050":0,"1051":0,"1052":0,"1053":0,"1054":0,"1058":0,"1059":0,"1061":0,"1062":0,"1066":0,"1067":0,"1074":0,"1075":0,"1076":0,"1077":0,"1078":0,"1081":0,"1082":0,"1083":0,"1085":0,"1088":0,"1089":0,"1095":0,"1096":0,"1097":0,"1098":0,"1099":0,"1100":0,"1101":0,"1102":0,"1105":0,"1107":0,"1110":0,"1111":0,"1112":0,"1117":0,"1118":0,"1119":0,"1120":0,"1121":0,"1122":0,"1123":0,"1124":0,"1125":0,"1127":0,"1129":0,"1131":0,"1132":0,"1133":0,"1134":0,"1135":0,"1136":0,"1137":0,"1141":0,"1142":0,"1144":0,"1145":0,"1151":0,"1152":0,"1153":0,"1157":0,"1195":0,"1197":0,"1198":0,"1199":0,"1200":0,"1201":0,"1202":0,"1203":0,"1204":0,"1207":0,"1208":0,"1211":0,"1218":0,"1236":0,"1238":0,"1239":0,"1242":0,"1243":0,"1245":0,"1248":0,"1258":0,"1259":0,"1273":0,"1274":0,"1275":0,"1280":0,"1281":0,"1283":0,"1286":0,"1287":0,"1288":0,"1289":0,"1290":0,"1292":0,"1296":0,"1305":0,"1306":0,"1307":0,"1309":0,"1310":0,"1311":0,"1325":0,"1328":0,"1329":0,"1330":0,"1366":0,"1367":0,"1368":0,"1371":0,"1372":0,"1375":0,"1377":0,"1381":0,"1383":0,"1387":0,"1389":0,"1392":0,"1393":0,"1397":0,"1398":0,"1950":0,"1972":0,"2020":0,"2021":0,"2038":0,"2039":0,"2049":0,"2050":0,"2060":0,"2061":0,"2088":0,"2089":0,"2099":0,"2100":0,"2110":0,"2111":0,"2125":0,"2126":0,"2127":0,"2138":0,"2139":0,"2149":0,"2150":0,"2162":0,"2163":0,"2165":0,"2167":0,"2171":0,"2174":0,"2186":0,"2187":0,"2201":0,"2202":0,"2203":0,"2215":0,"2216":0,"2218":0,"2219":0,"2221":0,"2232":0,"2233":0,"2235":0,"2245":0,"2246":0,"2248":0,"2278":0,"2279":0,"2286":0,"2319":0,"2320":0,"2322":0,"2324":0,"2326":0,"2327":0,"2329":0,"2331":0,"2332":0,"2335":0,"2339":0,"2342":0,"2358":0,"2359":0,"2363":0,"2364":0,"2366":0,"2367":0,"2368":0,"2372":0,"2390":0,"2391":0,"2392":0,"2394":0,"2395":0,"2396":0,"2400":0,"2427":0,"2428":0,"2432":0,"2433":0,"2434":0,"2438":0,"2455":0,"2456":0,"2459":0,"2461":0,"2462":0,"2464":0,"2465":0,"2467":0,"2468":0,"2472":0,"2473":0,"2474":0,"2478":0,"2500":0,"2501":0,"2520":0,"2521":0,"2523":0,"2524":0,"2525":0,"2529":0,"2550":0,"2551":0,"2553":0,"2554":0,"2555":0,"2556":0,"2560":0,"2561":0,"2566":0,"2584":0,"2585":0,"2586":0,"2589":0,"2604":0,"2614":0,"2624":0,"2635":0,"2637":0,"2647":0,"2651":0,"2653":0,"2664":0,"2693":0,"2694":0,"2696":0,"2697":0,"2701":0,"2702":0,"2705":0,"2725":0,"2729":0,"2735":0,"2750":0,"2751":0,"2756":0,"2757":0,"2760":0,"2797":0,"2798":0,"2803":0,"2804":0,"2807":0,"2811":0,"2812":0,"2818":0,"2819":0,"2824":0,"2825":0,"2828":0,"2829":0,"2834":0,"2836":0,"2837":0,"2838":0,"2845":0,"2846":0,"2852":0,"2854":0,"2864":0,"2865":0,"2869":0,"2873":0,"2879":0,"2880":0,"2886":0,"2888":0,"2890":0,"2891":0,"2892":0,"2899":0,"2900":0,"2904":0,"2920":0,"2942":0,"2945":0,"2948":0,"2949":0,"2950":0,"3012":0,"3024":0,"3047":0,"3048":0,"3049":0,"3052":0,"3055":0,"3056":0,"3057":0,"3058":0,"3062":0,"3063":0,"3064":0,"3069":0,"3070":0,"3071":0,"3073":0,"3074":0,"3079":0,"3099":0,"3100":0,"3105":0,"3106":0,"3109":0,"3120":0,"3121":0,"3122":0,"3124":0,"3138":0,"3139":0,"3162":0,"3163":0,"3165":0,"3166":0,"3167":0,"3171":0,"3194":0,"3195":0,"3197":0,"3198":0,"3199":0,"3200":0,"3205":0,"3221":0,"3222":0,"3223":0,"3226":0,"3230":0,"3231":0,"3234":0,"3251":0,"3252":0,"3257":0,"3258":0,"3259":0,"3262":0,"3263":0,"3265":0,"3269":0,"3281":0,"3282":0,"3317":0,"3319":0,"3320":0,"3321":0,"3322":0,"3549":0,"3552":0,"3554":0,"3556":0,"3557":0,"3558":0,"3559":0,"3560":0,"3561":0,"3562":0,"3563":0,"3564":0,"3565":0,"3566":0,"3567":0,"3571":0,"3572":0,"3574":0,"3575":0,"3577":0,"3578":0,"3581":0,"3582":0,"3583":0,"3584":0,"3586":0,"3587":0,"3588":0,"3589":0,"3594":0,"3595":0,"3597":0,"3598":0,"3599":0,"3601":0,"3602":0,"3603":0,"3605":0,"3606":0,"3607":0,"3610":0,"3611":0,"3613":0,"3615":0,"3616":0,"3617":0,"3618":0,"3619":0,"3622":0,"3623":0,"3624":0,"3626":0,"3627":0,"3628":0,"3632":0,"3633":0,"3634":0,"3635":0,"3637":0,"3638":0,"3639":0,"3641":0,"3642":0,"3647":0,"3648":0,"3649":0,"3650":0,"3651":0,"3652":0,"3655":0,"3656":0,"3657":0,"3662":0,"3664":0,"3665":0,"3666":0,"3667":0,"3669":0,"3670":0,"3671":0,"3674":0,"3675":0,"3676":0,"3677":0,"3678":0,"3681":0,"3683":0,"3684":0,"3687":0,"3688":0,"3689":0,"3691":0,"3692":0,"3693":0,"3694":0,"3695":0,"3696":0,"3705":0,"3707":0,"3709":0,"3711":0,"3712":0,"3716":0,"3720":0,"3724":0,"3746":0,"3747":0,"3749":0,"3750":0,"3753":0,"3754":0,"3756":0,"3757":0,"3758":0,"3760":0,"3761":0,"3763":0,"3764":0,"3767":0,"3768":0,"3772":0,"3774":0,"3815":0,"3827":0,"3833":0,"4073":0,"4076":0,"4077":0,"4078":0,"4079":0,"4081":0,"4082":0,"4083":0,"4085":0,"4086":0,"4088":0,"4089":0,"4090":0,"4091":0,"4097":0,"4168":0,"4244":0,"4290":0,"4305":0,"4306":0,"4321":0,"4327":0,"4357":0,"4360":0,"4361":0,"4364":0,"4367":0,"4370":0,"4371":0,"4372":0,"4378":0,"4379":0,"4380":0,"4383":0,"4384":0,"4386":0,"4389":0,"4394":0,"4395":0,"4396":0,"4398":0,"4401":0,"4407":0,"4411":0,"4414":0,"4415":0,"4417":0,"4420":0,"4421":0,"4424":0,"4427":0,"4431":0,"4434":0,"4435":0,"4436":0,"4439":0,"4440":0,"4442":0,"4443":0,"4446":0,"4448":0,"4453":0,"4455":0,"4459":0,"4461":0,"4462":0,"4465":0,"4467":0,"4468":0,"4470":0,"4471":0,"4473":0,"4474":0,"4480":0,"4484":0,"4487":0,"4488":0,"4491":0,"4499":0,"4500":0,"4502":0,"4503":0,"4516":0,"4529":0,"4530":0,"4532":0,"4533":0,"4534":0,"4535":0,"4536":0,"4537":0,"4539":0,"4540":0,"4541":0,"4544":0,"4545":0,"4606":0,"4608":0,"4635":0,"4636":0,"4637":0,"4638":0,"4639":0,"4641":0,"4642":0,"4664":0,"4669":0,"4670":0,"4671":0,"4673":0,"4675":0,"4676":0,"4680":0,"4681":0,"4683":0,"4684":0,"4685":0,"4689":0,"4690":0,"4692":0,"4694":0,"4696":0,"4700":0,"4713":0,"4718":0,"4721":0,"4726":0,"4727":0,"4729":0,"4735":0,"4736":0,"4737":0,"4741":0,"4745":0,"4750":0,"4751":0,"4754":0,"4756":0,"4757":0,"4760":0,"4762":0,"4763":0,"4764":0,"4767":0,"4768":0,"4770":0,"4771":0,"4774":0,"4775":0,"4780":0,"4782":0,"4790":0,"4795":0,"4799":0,"4800":0,"4803":0,"4804":0,"4806":0,"4807":0,"4813":0,"4814":0,"4818":0,"4820":0,"4824":0,"4825":0,"4830":0,"4834":0,"4842":0,"4843":0,"4844":0,"4845":0,"4846":0,"4848":0,"4851":0,"4855":0,"4856":0,"4859":0,"4860":0,"4861":0,"4864":0,"4869":0,"4870":0,"4872":0,"4876":0,"4878":0,"4883":0,"4889":0,"4890":0,"4894":0,"4902":0,"4906":0,"4911":0,"4913":0,"4914":0,"4915":0,"4916":0,"4919":0,"4921":0,"4925":0,"4926":0,"4930":0,"4931":0,"4935":0,"4937":0,"4938":0,"4942":0,"4943":0,"4950":0,"4951":0,"4952":0,"4953":0,"4958":0,"4963":0,"4964":0,"4965":0,"4967":0,"4970":0,"4974":0,"4980":0,"4981":0,"4983":0,"4985":0,"4986":0,"4987":0,"4989":0,"4990":0,"4991":0,"4992":0,"4993":0,"4994":0,"5004":0,"5008":0,"5011":0,"5012":0,"5013":0,"5020":0,"5021":0,"5022":0,"5028":0,"5030":0,"5031":0,"5033":0,"5040":0,"5042":0,"5043":0,"5047":0,"5051":0,"5052":0,"5055":0,"5056":0,"5059":0,"5060":0,"5066":0,"5068":0,"5081":0,"5106":0,"5107":0,"5121":0,"5124":0,"5125":0,"5126":0,"5130":0,"5146":0,"5147":0,"5151":0,"5154":0,"5156":0,"5158":0,"5159":0,"5160":0,"5163":0,"5164":0,"5165":0,"5168":0,"5172":0,"5181":0,"5183":0,"5186":0,"5189":0,"5190":0,"5193":0,"5198":0,"5212":0,"5217":0,"5220":0,"5225":0,"5229":0,"5236":0,"5238":0,"5242":0,"5244":0,"5248":0,"5251":0,"5256":0,"5263":0,"5266":0,"5267":0,"5272":0,"5275":0,"5279":0,"5284":0,"5287":0,"5291":0,"5296":0,"5299":0,"5304":0,"5309":0,"5312":0,"5317":0,"5322":0,"5325":0,"5327":0,"5332":0,"5335":0,"5337":0,"5342":0,"5345":0,"5347":0,"5353":0,"5359":0,"5365":0,"5368":0,"5371":0,"5376":0,"5379":0,"5383":0,"5384":0,"5387":0,"5392":0,"5400":0,"5411":0,"5413":0,"5437":0,"5441":0,"5442":0,"5443":0,"5444":0,"5446":0,"5451":0,"5452":0,"5455":0,"5456":0,"5457":0,"5458":0,"5461":0,"5462":0,"5463":0,"5464":0,"5466":0,"5467":0,"5468":0,"5471":0,"5472":0,"5476":0,"5482":0,"5488":0,"5498":0,"5525":0,"5526":0,"5532":0,"5534":0,"5535":0,"5536":0,"5537":0,"5538":0,"5539":0,"5540":0,"5541":0,"5542":0,"5543":0,"5546":0,"5547":0,"5548":0,"5549":0,"5550":0,"5551":0,"5552":0,"5553":0,"5554":0,"5555":0,"5559":0,"5561":0,"5562":0,"5567":0,"5576":0,"5592":0,"5593":0,"5598":0,"5607":0,"5634":0,"5635":0,"5636":0,"5637":0,"5639":0,"5646":0,"5647":0,"5648":0,"5650":0,"5656":0,"5660":0,"5661":0,"5662":0,"5664":0,"5670":0,"5677":0};
_yuitest_coverage["/build/yui-base/yui-base.js"].functions = {"instanceOf:59":0,"YUI:54":0,"add:178":0,"remove:185":0,"handleLoad:195":0,"getLoader:202":0,"clobber:227":0,"applyConfig:261":0,"_config:305":0,"parseBasePath:374":0,"(anonymous 2):398":0,"_init:314":0,"_setup:494":0,"applyTo:525":0,"add:582":0,"_attach:626":0,"(anonymous 5):794":0,"(anonymous 4):793":0,"(anonymous 3):791":0,"_delayCallback:780":0,"(anonymous 6):893":0,"use:850":0,"_notify:908":0,"process:961":0,"(anonymous 7):1052":0,"handleLoader:1025":0,"handleBoot:1131":0,"_use:938":0,"namespace:1194":0,"dump:1218":0,"error:1233":0,"guid:1257":0,"stamp:1272":0,"destroy:1304":0,"applyConfig:1366":0,"(anonymous 1):153":0,"_isNative:2020":0,"isArray:2038":0,"isBoolean:2049":0,"isDate:2060":0,"isFunction:2088":0,"isNull:2099":0,"isNumber:2110":0,"isObject:2125":0,"isString:2138":0,"isUndefined:2149":0,"isValue:2162":0,"(anonymous 9):2186":0,"(anonymous 10):2202":0,"sub:2201":0,"(anonymous 11):2215":0,"}:2217":0,"(anonymous 12):2232":0,"}:2234":0,"(anonymous 13):2245":0,"}:2247":0,"type:2278":0,"YArray:2319":0,"dedupe:2358":0,"(anonymous 14):2390":0,"}:2393":0,"hash:2427":0,"(anonymous 15):2455":0,"}:2457":0,"numericSort:2500":0,"(anonymous 16):2520":0,"}:2522":0,"test:2550":0,"Queue:2584":0,"_init:2596":0,"next:2613":0,"last:2623":0,"add:2634":0,"size:2646":0,"(anonymous 17):2696":0,"cached:2693":0,"getLocation:2725":0,"merge:2750":0,"mix:2797":0,"(anonymous 18):2936":0,"F:2945":0,"(anonymous 20):2948":0,"(anonymous 19):2943":0,"owns:3011":0,"keys:3047":0,"values:3099":0,"size:3120":0,"hasValue:3138":0,"each:3162":0,"some:3194":0,"getValue:3221":0,"setValue:3251":0,"isEmpty:3281":0,"(anonymous 22):3321":0,"numberify:3319":0,"parseUA:3317":0,"compareVersions:3746":0,"(anonymous 8):1950":0,"abort:4072":0,"css:4167":0,"js:4243":0,"load:4289":0,"_autoPurge:4304":0,"_getEnv:4320":0,"_getTransaction:4356":0,"_load:4430":0,"(anonymous 24):4470":0,"_next:4458":0,"_purge:4479":0,"Transaction:4529":0,"abort:4634":0,"(anonymous 25):4684":0,"execute:4663":0,"purge:4712":0,"_createNode:4717":0,"_finish:4744":0,"_getEventData:4779":0,"_getInsertBefore:4794":0,"onError:4855":0,"onLoad:4859":0,"onreadystatechange:4913":0,"_insert:4833":0,"_next:4941":0,"(anonymous 26):5021":0,"_poll:4957":0,"_progress:5027":0,"(anonymous 23):3815":0,"add:5105":0,"(anonymous 28):5125":0,"all:5120":0,"test:5145":0,"\"test\":5185":0,"\"test\":5200":0,"\"test\":5219":0,"test:5237":0,"test:5243":0,"\"test\":5227":0,"\"test\":5265":0,"\"test\":5274":0,"\"test\":5286":0,"\"test\":5298":0,"\"test\":5311":0,"\"test\":5324":0,"\"test\":5334":0,"\"test\":5344":0,"\"test\":5367":0,"\"test\":5378":0,"(anonymous 27):5066":0,"scan:5441":0,"lookupBestLang:5435":0,"(anonymous 29):5400":0,"log:5525":0,"message:5592":0,"(anonymous 30):5488":0,"wrapper:5641":0,"cancel:5659":0,"later:5634":0,"(anonymous 31):5598":0};
_yuitest_coverage["/build/yui-base/yui-base.js"].coveredLines = 1227;
_yuitest_coverage["/build/yui-base/yui-base.js"].coveredFunctions = 158;
_yuitest_coverline("/build/yui-base/yui-base.js", 10);
if (typeof YUI != 'undefined') {
    _yuitest_coverline("/build/yui-base/yui-base.js", 11);
YUI._YUI = YUI;
}

/**
The YUI global namespace object.  If YUI is already defined, the
existing YUI object will not be overwritten so that defined
namespaces are preserved.  It is the constructor for the object
the end user interacts with.  As indicated below, each instance
has full custom event support, but only if the event system
is available.  This is a self-instantiable factory function.  You
can invoke it directly like this:

     YUI().use('*', function(Y) {
         // ready
     });

But it also works like this:

     var Y = YUI();

Configuring the YUI object:

    YUI({
        debug: true,
        combine: false
    }).use('node', function(Y) {
        //Node is ready to use
    });

See the API docs for the <a href="config.html">Config</a> class
for the complete list of supported configuration properties accepted
by the YUI constuctor.

@class YUI
@constructor
@global
@uses EventTarget
@param [o]* {Object} 0..n optional configuration objects.  these values
are store in Y.config.  See <a href="config.html">Config</a> for the list of supported
properties.
*/
    /*global YUI*/
    /*global YUI_config*/
    _yuitest_coverline("/build/yui-base/yui-base.js", 54);
var YUI = function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "YUI", 54);
_yuitest_coverline("/build/yui-base/yui-base.js", 55);
var i = 0,
            Y = this,
            args = arguments,
            l = args.length,
            instanceOf = function(o, type) {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "instanceOf", 59);
_yuitest_coverline("/build/yui-base/yui-base.js", 60);
return (o && o.hasOwnProperty && (o instanceof type));
            },
            gconf = (typeof YUI_config !== 'undefined') && YUI_config;

        _yuitest_coverline("/build/yui-base/yui-base.js", 64);
if (!(instanceOf(Y, YUI))) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 65);
Y = new YUI();
        } else {
            // set up the core environment
            _yuitest_coverline("/build/yui-base/yui-base.js", 68);
Y._init();

            /**
                YUI.GlobalConfig is a master configuration that might span
                multiple contexts in a non-browser environment.  It is applied
                first to all instances in all contexts.
                @property GlobalConfig
                @type {Object}
                @global
                @static
                @example


                    YUI.GlobalConfig = {
                        filter: 'debug'
                    };

                    YUI().use('node', function(Y) {
                        //debug files used here
                    });

                    YUI({
                        filter: 'min'
                    }).use('node', function(Y) {
                        //min files used here
                    });

            */
            _yuitest_coverline("/build/yui-base/yui-base.js", 96);
if (YUI.GlobalConfig) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 97);
Y.applyConfig(YUI.GlobalConfig);
            }

            /**
                YUI_config is a page-level config.  It is applied to all
                instances created on the page.  This is applied after
                YUI.GlobalConfig, and before the instance level configuration
                objects.
                @global
                @property YUI_config
                @type {Object}
                @example


                    //Single global var to include before YUI seed file
                    YUI_config = {
                        filter: 'debug'
                    };

                    YUI().use('node', function(Y) {
                        //debug files used here
                    });

                    YUI({
                        filter: 'min'
                    }).use('node', function(Y) {
                        //min files used here
                    });
            */
            _yuitest_coverline("/build/yui-base/yui-base.js", 126);
if (gconf) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 127);
Y.applyConfig(gconf);
            }

            // bind the specified additional modules for this instance
            _yuitest_coverline("/build/yui-base/yui-base.js", 131);
if (!l) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 132);
Y._setup();
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 136);
if (l) {
            // Each instance can accept one or more configuration objects.
            // These are applied after YUI.GlobalConfig and YUI_Config,
            // overriding values set in those config files if there is a '
            // matching property.
            _yuitest_coverline("/build/yui-base/yui-base.js", 141);
for (; i < l; i++) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 142);
Y.applyConfig(args[i]);
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 145);
Y._setup();
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 148);
Y.instanceOf = instanceOf;

        _yuitest_coverline("/build/yui-base/yui-base.js", 150);
return Y;
    };

_yuitest_coverline("/build/yui-base/yui-base.js", 153);
(function() {

    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 1)", 153);
_yuitest_coverline("/build/yui-base/yui-base.js", 155);
var proto, prop,
        VERSION = '@VERSION@',
        PERIOD = '.',
        BASE = 'http://yui.yahooapis.com/',
        /*
            These CSS class names can't be generated by
            getClassName since it is not available at the
            time they are being used.
        */
        DOC_LABEL = 'yui3-js-enabled',
        CSS_STAMP_EL = 'yui3-css-stamp',
        NOOP = function() {},
        SLICE = Array.prototype.slice,
        APPLY_TO_AUTH = { 'io.xdrReady': 1,   // the functions applyTo
                          'io.xdrResponse': 1,   // can call. this should
                          'SWF.eventHandler': 1 }, // be done at build time
        hasWin = (typeof window != 'undefined'),
        win = (hasWin) ? window : null,
        doc = (hasWin) ? win.document : null,
        docEl = doc && doc.documentElement,
        docClass = docEl && docEl.className,
        instances = {},
        time = new Date().getTime(),
        add = function(el, type, fn, capture) {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "add", 178);
_yuitest_coverline("/build/yui-base/yui-base.js", 179);
if (el && el.addEventListener) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 180);
el.addEventListener(type, fn, capture);
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 181);
if (el && el.attachEvent) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 182);
el.attachEvent('on' + type, fn);
            }}
        },
        remove = function(el, type, fn, capture) {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "remove", 185);
_yuitest_coverline("/build/yui-base/yui-base.js", 186);
if (el && el.removeEventListener) {
                // this can throw an uncaught exception in FF
                _yuitest_coverline("/build/yui-base/yui-base.js", 188);
try {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 189);
el.removeEventListener(type, fn, capture);
                } catch (ex) {}
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 191);
if (el && el.detachEvent) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 192);
el.detachEvent('on' + type, fn);
            }}
        },
        handleLoad = function() {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "handleLoad", 195);
_yuitest_coverline("/build/yui-base/yui-base.js", 196);
YUI.Env.windowLoaded = true;
            _yuitest_coverline("/build/yui-base/yui-base.js", 197);
YUI.Env.DOMReady = true;
            _yuitest_coverline("/build/yui-base/yui-base.js", 198);
if (hasWin) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 199);
remove(window, 'load', handleLoad);
            }
        },
        getLoader = function(Y, o) {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "getLoader", 202);
_yuitest_coverline("/build/yui-base/yui-base.js", 203);
var loader = Y.Env._loader,
                lCore = [ 'loader-base' ],
                G_ENV = YUI.Env,
                mods = G_ENV.mods;

            _yuitest_coverline("/build/yui-base/yui-base.js", 208);
if (loader) {
                //loader._config(Y.config);
                _yuitest_coverline("/build/yui-base/yui-base.js", 210);
loader.ignoreRegistered = false;
                _yuitest_coverline("/build/yui-base/yui-base.js", 211);
loader.onEnd = null;
                _yuitest_coverline("/build/yui-base/yui-base.js", 212);
loader.data = null;
                _yuitest_coverline("/build/yui-base/yui-base.js", 213);
loader.required = [];
                _yuitest_coverline("/build/yui-base/yui-base.js", 214);
loader.loadType = null;
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 216);
loader = new Y.Loader(Y.config);
                _yuitest_coverline("/build/yui-base/yui-base.js", 217);
Y.Env._loader = loader;
            }
            _yuitest_coverline("/build/yui-base/yui-base.js", 219);
if (mods && mods.loader) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 220);
lCore = [].concat(lCore, YUI.Env.loaderExtras);
            }
            _yuitest_coverline("/build/yui-base/yui-base.js", 222);
YUI.Env.core = Y.Array.dedupe([].concat(YUI.Env.core, lCore));

            _yuitest_coverline("/build/yui-base/yui-base.js", 224);
return loader;
        },

        clobber = function(r, s) {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "clobber", 227);
_yuitest_coverline("/build/yui-base/yui-base.js", 228);
for (var i in s) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 229);
if (s.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 230);
r[i] = s[i];
                }
            }
        },

        ALREADY_DONE = { success: true };

//  Stamp the documentElement (HTML) with a class of "yui-loaded" to
//  enable styles that need to key off of JS being enabled.
_yuitest_coverline("/build/yui-base/yui-base.js", 239);
if (docEl && docClass.indexOf(DOC_LABEL) == -1) {
    _yuitest_coverline("/build/yui-base/yui-base.js", 240);
if (docClass) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 241);
docClass += ' ';
    }
    _yuitest_coverline("/build/yui-base/yui-base.js", 243);
docClass += DOC_LABEL;
    _yuitest_coverline("/build/yui-base/yui-base.js", 244);
docEl.className = docClass;
}

_yuitest_coverline("/build/yui-base/yui-base.js", 247);
if (VERSION.indexOf('@') > -1) {
    _yuitest_coverline("/build/yui-base/yui-base.js", 248);
VERSION = '3.5.0'; // dev time hack for cdn test
}

_yuitest_coverline("/build/yui-base/yui-base.js", 251);
proto = {
    /**
     * Applies a new configuration object to the YUI instance config.
     * This will merge new group/module definitions, and will also
     * update the loader cache if necessary.  Updating Y.config directly
     * will not update the cache.
     * @method applyConfig
     * @param {Object} o the configuration object.
     * @since 3.2.0
     */
    applyConfig: function(o) {

        _yuitest_coverfunc("/build/yui-base/yui-base.js", "applyConfig", 261);
_yuitest_coverline("/build/yui-base/yui-base.js", 263);
o = o || NOOP;

        _yuitest_coverline("/build/yui-base/yui-base.js", 265);
var attr,
            name,
            // detail,
            config = this.config,
            mods = config.modules,
            groups = config.groups,
            aliases = config.aliases,
            loader = this.Env._loader;

        _yuitest_coverline("/build/yui-base/yui-base.js", 274);
for (name in o) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 275);
if (o.hasOwnProperty(name)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 276);
attr = o[name];
                _yuitest_coverline("/build/yui-base/yui-base.js", 277);
if (mods && name == 'modules') {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 278);
clobber(mods, attr);
                } else {_yuitest_coverline("/build/yui-base/yui-base.js", 279);
if (aliases && name == 'aliases') {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 280);
clobber(aliases, attr);
                } else {_yuitest_coverline("/build/yui-base/yui-base.js", 281);
if (groups && name == 'groups') {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 282);
clobber(groups, attr);
                } else {_yuitest_coverline("/build/yui-base/yui-base.js", 283);
if (name == 'win') {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 284);
config[name] = (attr && attr.contentWindow) || attr;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 285);
config.doc = config[name] ? config[name].document : null;
                } else {_yuitest_coverline("/build/yui-base/yui-base.js", 286);
if (name == '_yuid') {
                    // preserve the guid
                } else {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 289);
config[name] = attr;
                }}}}}
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 294);
if (loader) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 295);
loader._config(o);
        }

    },
    /**
    * Old way to apply a config to the instance (calls `applyConfig` under the hood)
    * @private
    * @method _config
    * @param {Object} o The config to apply
    */
    _config: function(o) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_config", 305);
_yuitest_coverline("/build/yui-base/yui-base.js", 306);
this.applyConfig(o);
    },

    /**
     * Initialize this YUI instance
     * @private
     * @method _init
     */
    _init: function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_init", 314);
_yuitest_coverline("/build/yui-base/yui-base.js", 315);
var filter, el,
            Y = this,
            G_ENV = YUI.Env,
            Env = Y.Env,
            prop;

        /**
         * The version number of the YUI instance.
         * @property version
         * @type string
         */
        _yuitest_coverline("/build/yui-base/yui-base.js", 326);
Y.version = VERSION;

        _yuitest_coverline("/build/yui-base/yui-base.js", 328);
if (!Env) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 329);
Y.Env = {
                core: ['get','features','intl-base','yui-log','yui-later'],
                loaderExtras: ['loader-rollup', 'loader-yui3'],
                mods: {}, // flat module map
                versions: {}, // version module map
                base: BASE,
                cdn: BASE + VERSION + '/build/',
                // bootstrapped: false,
                _idx: 0,
                _used: {},
                _attached: {},
                _missed: [],
                _yidx: 0,
                _uidx: 0,
                _guidp: 'y',
                _loaded: {},
                // serviced: {},
                // Regex in English:
                // I'll start at the \b(simpleyui).
                // 1. Look in the test string for "simpleyui" or "yui" or
                //    "yui-base" or "yui-davglass" or "yui-foobar" that comes after a word break.  That is, it
                //    can't match "foyui" or "i_heart_simpleyui". This can be anywhere in the string.
                // 2. After #1 must come a forward slash followed by the string matched in #1, so
                //    "yui-base/yui-base" or "simpleyui/simpleyui" or "yui-pants/yui-pants".
                // 3. The second occurence of the #1 token can optionally be followed by "-debug" or "-min",
                //    so "yui/yui-min", "yui/yui-debug", "yui-base/yui-base-debug". NOT "yui/yui-tshirt".
                // 4. This is followed by ".js", so "yui/yui.js", "simpleyui/simpleyui-min.js"
                // 0. Going back to the beginning, now. If all that stuff in 1-4 comes after a "?" in the string,
                //    then capture the junk between the LAST "&" and the string in 1-4.  So
                //    "blah?foo/yui/yui.js" will capture "foo/" and "blah?some/thing.js&3.3.0/build/yui-davglass/yui-davglass.js"
                //    will capture "3.3.0/build/"
                //
                // Regex Exploded:
                // (?:\?             Find a ?
                //   (?:[^&]*&)      followed by 0..n characters followed by an &
                //   *               in fact, find as many sets of characters followed by a & as you can
                //   ([^&]*)         capture the stuff after the last & in \1
                // )?                but it's ok if all this ?junk&more_junk stuff isn't even there
                // \b(simpleyui|     after a word break find either the string "simpleyui" or
                //    yui(?:-\w+)?   the string "yui" optionally followed by a -, then more characters
                // )                 and store the simpleyui or yui-* string in \2
                // \/\2              then comes a / followed by the simpleyui or yui-* string in \2
                // (?:-(min|debug))? optionally followed by "-min" or "-debug"
                // .js               and ending in ".js"
                _BASE_RE: /(?:\?(?:[^&]*&)*([^&]*))?\b(simpleyui|yui(?:-\w+)?)\/\2(?:-(min|debug))?\.js/,
                parseBasePath: function(src, pattern) {
                    _yuitest_coverfunc("/build/yui-base/yui-base.js", "parseBasePath", 374);
_yuitest_coverline("/build/yui-base/yui-base.js", 375);
var match = src.match(pattern),
                        path, filter;

                    _yuitest_coverline("/build/yui-base/yui-base.js", 378);
if (match) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 379);
path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));

                        // this is to set up the path to the loader.  The file
                        // filter for loader should match the yui include.
                        _yuitest_coverline("/build/yui-base/yui-base.js", 383);
filter = match[3];

                        // extract correct path for mixed combo urls
                        // http://yuilibrary.com/projects/yui3/ticket/2528423
                        _yuitest_coverline("/build/yui-base/yui-base.js", 387);
if (match[1]) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 388);
path += '?' + match[1];
                        }
                        _yuitest_coverline("/build/yui-base/yui-base.js", 390);
path = {
                            filter: filter,
                            path: path
                        }
                    }
                    _yuitest_coverline("/build/yui-base/yui-base.js", 395);
return path;
                },
                getBase: G_ENV && G_ENV.getBase ||
                        function(pattern) {
                            _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 2)", 398);
_yuitest_coverline("/build/yui-base/yui-base.js", 399);
var nodes = (doc && doc.getElementsByTagName('script')) || [],
                                path = Env.cdn, parsed,
                                i, len, src;

                            _yuitest_coverline("/build/yui-base/yui-base.js", 403);
for (i = 0, len = nodes.length; i < len; ++i) {
                                _yuitest_coverline("/build/yui-base/yui-base.js", 404);
src = nodes[i].src;
                                _yuitest_coverline("/build/yui-base/yui-base.js", 405);
if (src) {
                                    _yuitest_coverline("/build/yui-base/yui-base.js", 406);
parsed = Y.Env.parseBasePath(src, pattern);
                                    _yuitest_coverline("/build/yui-base/yui-base.js", 407);
if (parsed) {
                                        _yuitest_coverline("/build/yui-base/yui-base.js", 408);
filter = parsed.filter;
                                        _yuitest_coverline("/build/yui-base/yui-base.js", 409);
path = parsed.path;
                                        _yuitest_coverline("/build/yui-base/yui-base.js", 410);
break;
                                    }
                                }
                            }

                            // use CDN default
                            _yuitest_coverline("/build/yui-base/yui-base.js", 416);
return path;
                        }

            };

            _yuitest_coverline("/build/yui-base/yui-base.js", 421);
Env = Y.Env;

            _yuitest_coverline("/build/yui-base/yui-base.js", 423);
Env._loaded[VERSION] = {};

            _yuitest_coverline("/build/yui-base/yui-base.js", 425);
if (G_ENV && Y !== YUI) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 426);
Env._yidx = ++G_ENV._yidx;
                _yuitest_coverline("/build/yui-base/yui-base.js", 427);
Env._guidp = ('yui_' + VERSION + '_' +
                             Env._yidx + '_' + time).replace(/\./g, '_').replace(/-/g, '_');
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 429);
if (YUI._YUI) {

                _yuitest_coverline("/build/yui-base/yui-base.js", 431);
G_ENV = YUI._YUI.Env;
                _yuitest_coverline("/build/yui-base/yui-base.js", 432);
Env._yidx += G_ENV._yidx;
                _yuitest_coverline("/build/yui-base/yui-base.js", 433);
Env._uidx += G_ENV._uidx;

                _yuitest_coverline("/build/yui-base/yui-base.js", 435);
for (prop in G_ENV) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 436);
if (!(prop in Env)) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 437);
Env[prop] = G_ENV[prop];
                    }
                }

                _yuitest_coverline("/build/yui-base/yui-base.js", 441);
delete YUI._YUI;
            }}

            _yuitest_coverline("/build/yui-base/yui-base.js", 444);
Y.id = Y.stamp(Y);
            _yuitest_coverline("/build/yui-base/yui-base.js", 445);
instances[Y.id] = Y;

        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 449);
Y.constructor = YUI;

        // configuration defaults
        _yuitest_coverline("/build/yui-base/yui-base.js", 452);
Y.config = Y.config || {
            bootstrap: true,
            cacheUse: true,
            debug: true,
            doc: doc,
            fetchCSS: true,
            throwFail: true,
            useBrowserConsole: true,
            useNativeES5: true,
            win: win
        };

        //Register the CSS stamp element
        _yuitest_coverline("/build/yui-base/yui-base.js", 465);
if (doc && !doc.getElementById(CSS_STAMP_EL)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 466);
el = doc.createElement('div');
            _yuitest_coverline("/build/yui-base/yui-base.js", 467);
el.innerHTML = '<div id="' + CSS_STAMP_EL + '" style="position: absolute !important; visibility: hidden !important"></div>';
            _yuitest_coverline("/build/yui-base/yui-base.js", 468);
YUI.Env.cssStampEl = el.firstChild;
            _yuitest_coverline("/build/yui-base/yui-base.js", 469);
if (doc.body) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 470);
doc.body.appendChild(YUI.Env.cssStampEl);
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 472);
docEl.insertBefore(YUI.Env.cssStampEl, docEl.firstChild);
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 476);
Y.config.lang = Y.config.lang || 'en-US';

        _yuitest_coverline("/build/yui-base/yui-base.js", 478);
Y.config.base = YUI.config.base || Y.Env.getBase(Y.Env._BASE_RE);

        _yuitest_coverline("/build/yui-base/yui-base.js", 480);
if (!filter || (!('mindebug').indexOf(filter))) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 481);
filter = 'min';
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 483);
filter = (filter) ? '-' + filter : filter;
        _yuitest_coverline("/build/yui-base/yui-base.js", 484);
Y.config.loaderPath = YUI.config.loaderPath || 'loader/loader' + filter + '.js';

    },

    /**
     * Finishes the instance setup. Attaches whatever modules were defined
     * when the yui modules was registered.
     * @method _setup
     * @private
     */
    _setup: function(o) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_setup", 494);
_yuitest_coverline("/build/yui-base/yui-base.js", 495);
var i, Y = this,
            core = [],
            mods = YUI.Env.mods,
            extras = Y.config.core || [].concat(YUI.Env.core); //Clone it..

        _yuitest_coverline("/build/yui-base/yui-base.js", 500);
for (i = 0; i < extras.length; i++) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 501);
if (mods[extras[i]]) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 502);
core.push(extras[i]);
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 506);
Y._attach(['yui-base']);
        _yuitest_coverline("/build/yui-base/yui-base.js", 507);
Y._attach(core);

        _yuitest_coverline("/build/yui-base/yui-base.js", 509);
if (Y.Loader) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 510);
getLoader(Y);
        }

    },

    /**
     * Executes a method on a YUI instance with
     * the specified id if the specified method is whitelisted.
     * @method applyTo
     * @param id {String} the YUI instance id.
     * @param method {String} the name of the method to exectute.
     * Ex: 'Object.keys'.
     * @param args {Array} the arguments to apply to the method.
     * @return {Object} the return value from the applied method or null.
     */
    applyTo: function(id, method, args) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "applyTo", 525);
_yuitest_coverline("/build/yui-base/yui-base.js", 526);
if (!(method in APPLY_TO_AUTH)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 527);
this.log(method + ': applyTo not allowed', 'warn', 'yui');
            _yuitest_coverline("/build/yui-base/yui-base.js", 528);
return null;
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 531);
var instance = instances[id], nest, m, i;
        _yuitest_coverline("/build/yui-base/yui-base.js", 532);
if (instance) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 533);
nest = method.split('.');
            _yuitest_coverline("/build/yui-base/yui-base.js", 534);
m = instance;
            _yuitest_coverline("/build/yui-base/yui-base.js", 535);
for (i = 0; i < nest.length; i = i + 1) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 536);
m = m[nest[i]];
                _yuitest_coverline("/build/yui-base/yui-base.js", 537);
if (!m) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 538);
this.log('applyTo not found: ' + method, 'warn', 'yui');
                }
            }
            _yuitest_coverline("/build/yui-base/yui-base.js", 541);
return m && m.apply(instance, args);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 544);
return null;
    },

/**
Registers a module with the YUI global.  The easiest way to create a
first-class YUI module is to use the YUI component build tool.

http://yuilibrary.com/projects/builder

The build system will produce the `YUI.add` wrapper for you module, along
with any configuration info required for the module.
@method add
@param name {String} module name.
@param fn {Function} entry point into the module that is used to bind module to the YUI instance.
@param {YUI} fn.Y The YUI instance this module is executed in.
@param {String} fn.name The name of the module
@param version {String} version string.
@param details {Object} optional config data:
@param details.requires {Array} features that must be present before this module can be attached.
@param details.optional {Array} optional features that should be present if loadOptional
 is defined.  Note: modules are not often loaded this way in YUI 3,
 but this field is still useful to inform the user that certain
 features in the component will require additional dependencies.
@param details.use {Array} features that are included within this module which need to
 be attached automatically when this module is attached.  This
 supports the YUI 3 rollup system -- a module with submodules
 defined will need to have the submodules listed in the 'use'
 config.  The YUI component build tool does this for you.
@return {YUI} the YUI instance.
@example

    YUI.add('davglass', function(Y, name) {
        Y.davglass = function() {
            alert('Dav was here!');
        };
    }, '3.4.0', { requires: ['yui-base', 'harley-davidson', 'mt-dew'] });

*/
    add: function(name, fn, version, details) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "add", 582);
_yuitest_coverline("/build/yui-base/yui-base.js", 583);
details = details || {};
        _yuitest_coverline("/build/yui-base/yui-base.js", 584);
var env = YUI.Env,
            mod = {
                name: name,
                fn: fn,
                version: version,
                details: details
            },
            //Instance hash so we don't apply it to the same instance twice
            applied = {},
            loader, inst,
            i, versions = env.versions;

        _yuitest_coverline("/build/yui-base/yui-base.js", 596);
env.mods[name] = mod;
        _yuitest_coverline("/build/yui-base/yui-base.js", 597);
versions[version] = versions[version] || {};
        _yuitest_coverline("/build/yui-base/yui-base.js", 598);
versions[version][name] = mod;

        _yuitest_coverline("/build/yui-base/yui-base.js", 600);
for (i in instances) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 601);
if (instances.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 602);
inst = instances[i];
                _yuitest_coverline("/build/yui-base/yui-base.js", 603);
if (!applied[inst.id]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 604);
applied[inst.id] = true;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 605);
loader = inst.Env._loader;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 606);
if (loader) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 607);
if (!loader.moduleInfo[name] || loader.moduleInfo[name].temp) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 608);
loader.addModule(details, name);
                        }
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 615);
return this;
    },

    /**
     * Executes the function associated with each required
     * module, binding the module to the YUI instance.
     * @param {Array} r The array of modules to attach
     * @param {Boolean} [moot=false] Don't throw a warning if the module is not attached
     * @method _attach
     * @private
     */
    _attach: function(r, moot) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_attach", 626);
_yuitest_coverline("/build/yui-base/yui-base.js", 627);
var i, name, mod, details, req, use, after,
            mods = YUI.Env.mods,
            aliases = YUI.Env.aliases,
            Y = this, j,
            cache = YUI.Env._renderedMods,
            loader = Y.Env._loader,
            done = Y.Env._attached,
            len = r.length, loader, def, go,
            c = [];

        //Check for conditional modules (in a second+ instance) and add their requirements
        //TODO I hate this entire method, it needs to be fixed ASAP (3.5.0) ^davglass
        _yuitest_coverline("/build/yui-base/yui-base.js", 639);
for (i = 0; i < len; i++) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 640);
name = r[i];
            _yuitest_coverline("/build/yui-base/yui-base.js", 641);
mod = mods[name];
            _yuitest_coverline("/build/yui-base/yui-base.js", 642);
c.push(name);
            _yuitest_coverline("/build/yui-base/yui-base.js", 643);
if (loader && loader.conditions[name]) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 644);
for (j in loader.conditions[name]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 645);
if (loader.conditions[name].hasOwnProperty(j)) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 646);
def = loader.conditions[name][j];
                        _yuitest_coverline("/build/yui-base/yui-base.js", 647);
go = def && ((def.ua && Y.UA[def.ua]) || (def.test && def.test(Y)));
                        _yuitest_coverline("/build/yui-base/yui-base.js", 648);
if (go) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 649);
c.push(def.name);
                        }
                    }
                }
            }
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 655);
r = c;
        _yuitest_coverline("/build/yui-base/yui-base.js", 656);
len = r.length;

        _yuitest_coverline("/build/yui-base/yui-base.js", 658);
for (i = 0; i < len; i++) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 659);
if (!done[r[i]]) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 660);
name = r[i];
                _yuitest_coverline("/build/yui-base/yui-base.js", 661);
mod = mods[name];

                _yuitest_coverline("/build/yui-base/yui-base.js", 663);
if (aliases && aliases[name] && !mod) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 664);
Y._attach(aliases[name]);
                    _yuitest_coverline("/build/yui-base/yui-base.js", 665);
continue;
                }
                _yuitest_coverline("/build/yui-base/yui-base.js", 667);
if (!mod) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 668);
if (loader && loader.moduleInfo[name]) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 669);
mod = loader.moduleInfo[name];
                        _yuitest_coverline("/build/yui-base/yui-base.js", 670);
moot = true;
                    }


                    //if (!loader || !loader.moduleInfo[name]) {
                    //if ((!loader || !loader.moduleInfo[name]) && !moot) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 676);
if (!moot && name) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 677);
if ((name.indexOf('skin-') === -1) && (name.indexOf('css') === -1)) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 678);
Y.Env._missed.push(name);
                            _yuitest_coverline("/build/yui-base/yui-base.js", 679);
Y.Env._missed = Y.Array.dedupe(Y.Env._missed);
                            _yuitest_coverline("/build/yui-base/yui-base.js", 680);
Y.message('NOT loaded: ' + name, 'warn', 'yui');
                        }
                    }
                } else {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 684);
done[name] = true;
                    //Don't like this, but in case a mod was asked for once, then we fetch it
                    //We need to remove it from the missed list ^davglass
                    _yuitest_coverline("/build/yui-base/yui-base.js", 687);
for (j = 0; j < Y.Env._missed.length; j++) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 688);
if (Y.Env._missed[j] === name) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 689);
Y.message('Found: ' + name + ' (was reported as missing earlier)', 'warn', 'yui');
                            _yuitest_coverline("/build/yui-base/yui-base.js", 690);
Y.Env._missed.splice(j, 1);
                        }
                    }
                    /*
                        If it's a temp module, we need to redo it's requirements if it's already loaded
                        since it may have been loaded by another instance and it's dependencies might
                        have been redefined inside the fetched file.
                    */
                    _yuitest_coverline("/build/yui-base/yui-base.js", 698);
if (loader && cache && cache[name] && cache[name].temp) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 699);
loader.getRequires(cache[name]);
                        _yuitest_coverline("/build/yui-base/yui-base.js", 700);
req = [];
                        _yuitest_coverline("/build/yui-base/yui-base.js", 701);
for (j in loader.moduleInfo[name].expanded_map) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 702);
if (loader.moduleInfo[name].expanded_map.hasOwnProperty(j)) {
                                _yuitest_coverline("/build/yui-base/yui-base.js", 703);
req.push(j);
                            }
                        }
                        _yuitest_coverline("/build/yui-base/yui-base.js", 706);
Y._attach(req);
                    }
                    
                    _yuitest_coverline("/build/yui-base/yui-base.js", 709);
details = mod.details;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 710);
req = details.requires;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 711);
use = details.use;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 712);
after = details.after;
                    //Force Intl load if there is a language (Loader logic) @todo fix this shit
                    _yuitest_coverline("/build/yui-base/yui-base.js", 714);
if (details.lang) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 715);
req = req || [];
                        _yuitest_coverline("/build/yui-base/yui-base.js", 716);
req.unshift('intl');
                    }

                    _yuitest_coverline("/build/yui-base/yui-base.js", 719);
if (req) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 720);
for (j = 0; j < req.length; j++) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 721);
if (!done[req[j]]) {
                                _yuitest_coverline("/build/yui-base/yui-base.js", 722);
if (!Y._attach(req)) {
                                    _yuitest_coverline("/build/yui-base/yui-base.js", 723);
return false;
                                }
                                _yuitest_coverline("/build/yui-base/yui-base.js", 725);
break;
                            }
                        }
                    }

                    _yuitest_coverline("/build/yui-base/yui-base.js", 730);
if (after) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 731);
for (j = 0; j < after.length; j++) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 732);
if (!done[after[j]]) {
                                _yuitest_coverline("/build/yui-base/yui-base.js", 733);
if (!Y._attach(after, true)) {
                                    _yuitest_coverline("/build/yui-base/yui-base.js", 734);
return false;
                                }
                                _yuitest_coverline("/build/yui-base/yui-base.js", 736);
break;
                            }
                        }
                    }

                    _yuitest_coverline("/build/yui-base/yui-base.js", 741);
if (mod.fn) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 742);
if (Y.config.throwFail) {
                                _yuitest_coverline("/build/yui-base/yui-base.js", 743);
mod.fn(Y, name);
                            } else {
                                _yuitest_coverline("/build/yui-base/yui-base.js", 745);
try {
                                    _yuitest_coverline("/build/yui-base/yui-base.js", 746);
mod.fn(Y, name);
                                } catch (e) {
                                    _yuitest_coverline("/build/yui-base/yui-base.js", 748);
Y.error('Attach error: ' + name, e, name);
                                _yuitest_coverline("/build/yui-base/yui-base.js", 749);
return false;
                            }
                        }
                    }

                    _yuitest_coverline("/build/yui-base/yui-base.js", 754);
if (use) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 755);
for (j = 0; j < use.length; j++) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 756);
if (!done[use[j]]) {
                                _yuitest_coverline("/build/yui-base/yui-base.js", 757);
if (!Y._attach(use)) {
                                    _yuitest_coverline("/build/yui-base/yui-base.js", 758);
return false;
                                }
                                _yuitest_coverline("/build/yui-base/yui-base.js", 760);
break;
                            }
                        }
                    }



                }
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 771);
return true;
    },
    /**
    * Delays the `use` callback until another event has taken place. Like: window.onload, domready, contentready, available.
    * @private
    * @method _delayCallback
    * @param {Callback} cb The original `use` callback
    * @param {String|Object} until Either an event (load, domready) or an Object containing event/args keys for contentready/available
    */
    _delayCallback: function(cb, until) {

        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_delayCallback", 780);
_yuitest_coverline("/build/yui-base/yui-base.js", 782);
var Y = this,
            mod = ['event-base'];

        _yuitest_coverline("/build/yui-base/yui-base.js", 785);
until = (Y.Lang.isObject(until) ? until : { event: until });

        _yuitest_coverline("/build/yui-base/yui-base.js", 787);
if (until.event === 'load') {
            _yuitest_coverline("/build/yui-base/yui-base.js", 788);
mod.push('event-synthetic');
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 791);
return function() {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 3)", 791);
_yuitest_coverline("/build/yui-base/yui-base.js", 792);
var args = arguments;
            _yuitest_coverline("/build/yui-base/yui-base.js", 793);
Y._use(mod, function() {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 4)", 793);
_yuitest_coverline("/build/yui-base/yui-base.js", 794);
Y.on(until.event, function() {
                    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 5)", 794);
_yuitest_coverline("/build/yui-base/yui-base.js", 795);
args[1].delayUntil = until.event;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 796);
cb.apply(Y, args);
                }, until.args);
            });
        };
    },

    /**
     * Attaches one or more modules to the YUI instance.  When this
     * is executed, the requirements are analyzed, and one of
     * several things can happen:
     *
     *  * All requirements are available on the page --  The modules
     *   are attached to the instance.  If supplied, the use callback
     *   is executed synchronously.
     *
     *  * Modules are missing, the Get utility is not available OR
     *   the 'bootstrap' config is false -- A warning is issued about
     *   the missing modules and all available modules are attached.
     *
     *  * Modules are missing, the Loader is not available but the Get
     *   utility is and boostrap is not false -- The loader is bootstrapped
     *   before doing the following....
     *
     *  * Modules are missing and the Loader is available -- The loader
     *   expands the dependency tree and fetches missing modules.  When
     *   the loader is finshed the callback supplied to use is executed
     *   asynchronously.
     *
     * @method use
     * @param modules* {String|Array} 1-n modules to bind (uses arguments array).
     * @param [callback] {Function} callback function executed when
     * the instance has the required functionality.  If included, it
     * must be the last parameter.
     * @param callback.Y {YUI} The `YUI` instance created for this sandbox
     * @param callback.status {Object} Object containing `success`, `msg` and `data` properties
     *
     * @example
     *      // loads and attaches dd and its dependencies
     *      YUI().use('dd', function(Y) {});
     *
     *      // loads and attaches dd and node as well as all of their dependencies (since 3.4.0)
     *      YUI().use(['dd', 'node'], function(Y) {});
     *
     *      // attaches all modules that are available on the page
     *      YUI().use('*', function(Y) {});
     *
     *      // intrinsic YUI gallery support (since 3.1.0)
     *      YUI().use('gallery-yql', function(Y) {});
     *
     *      // intrinsic YUI 2in3 support (since 3.1.0)
     *      YUI().use('yui2-datatable', function(Y) {});
     *
     * @return {YUI} the YUI instance.
     */
    use: function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "use", 850);
_yuitest_coverline("/build/yui-base/yui-base.js", 851);
var args = SLICE.call(arguments, 0),
            callback = args[args.length - 1],
            Y = this,
            i = 0,
            a = [],
            name,
            Env = Y.Env,
            provisioned = true;

        // The last argument supplied to use can be a load complete callback
        _yuitest_coverline("/build/yui-base/yui-base.js", 861);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 862);
args.pop();
            _yuitest_coverline("/build/yui-base/yui-base.js", 863);
if (Y.config.delayUntil) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 864);
callback = Y._delayCallback(callback, Y.config.delayUntil);
            }
        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 867);
callback = null;
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 869);
if (Y.Lang.isArray(args[0])) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 870);
args = args[0];
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 873);
if (Y.config.cacheUse) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 874);
while ((name = args[i++])) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 875);
if (!Env._attached[name]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 876);
provisioned = false;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 877);
break;
                }
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 881);
if (provisioned) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 882);
if (args.length) {
                }
                _yuitest_coverline("/build/yui-base/yui-base.js", 884);
Y._notify(callback, ALREADY_DONE, args);
                _yuitest_coverline("/build/yui-base/yui-base.js", 885);
return Y;
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 889);
if (Y._loading) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 890);
Y._useQueue = Y._useQueue || new Y.Queue();
            _yuitest_coverline("/build/yui-base/yui-base.js", 891);
Y._useQueue.add([args, callback]);
        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 893);
Y._use(args, function(Y, response) {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 6)", 893);
_yuitest_coverline("/build/yui-base/yui-base.js", 894);
Y._notify(callback, response, args);
            });
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 898);
return Y;
    },
    /**
    * Notify handler from Loader for attachment/load errors
    * @method _notify
    * @param callback {Function} The callback to pass to the `Y.config.loadErrorFn`
    * @param response {Object} The response returned from Loader
    * @param args {Array} The aruments passed from Loader
    * @private
    */
    _notify: function(callback, response, args) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_notify", 908);
_yuitest_coverline("/build/yui-base/yui-base.js", 909);
if (!response.success && this.config.loadErrorFn) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 910);
this.config.loadErrorFn.call(this, this, callback, response, args);
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 911);
if (callback) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 912);
if (this.Env._missed && this.Env._missed.length) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 913);
response.msg = 'Missing modules: ' + this.Env._missed.join();
                _yuitest_coverline("/build/yui-base/yui-base.js", 914);
response.success = false;
            }
            _yuitest_coverline("/build/yui-base/yui-base.js", 916);
if (this.config.throwFail) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 917);
callback(this, response);
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 919);
try {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 920);
callback(this, response);
                } catch (e) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 922);
this.error('use callback error', e, args);
                }
            }
        }}
    },

    /**
    * This private method is called from the `use` method queue. To ensure that only one set of loading
    * logic is performed at a time.
    * @method _use
    * @private
    * @param args* {String} 1-n modules to bind (uses arguments array).
    * @param *callback {Function} callback function executed when
    * the instance has the required functionality.  If included, it
    * must be the last parameter.
    */
    _use: function(args, callback) {

        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_use", 938);
_yuitest_coverline("/build/yui-base/yui-base.js", 940);
if (!this.Array) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 941);
this._attach(['yui-base']);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 944);
var len, loader, handleBoot, handleRLS,
            Y = this,
            G_ENV = YUI.Env,
            mods = G_ENV.mods,
            Env = Y.Env,
            used = Env._used,
            aliases = G_ENV.aliases,
            queue = G_ENV._loaderQueue,
            firstArg = args[0],
            YArray = Y.Array,
            config = Y.config,
            boot = config.bootstrap,
            missing = [],
            i,
            r = [],
            ret = true,
            fetchCSS = config.fetchCSS,
            process = function(names, skip) {

                _yuitest_coverfunc("/build/yui-base/yui-base.js", "process", 961);
_yuitest_coverline("/build/yui-base/yui-base.js", 963);
var i = 0, a = [], name, len, m, req, use;

                _yuitest_coverline("/build/yui-base/yui-base.js", 965);
if (!names.length) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 966);
return;
                }

                _yuitest_coverline("/build/yui-base/yui-base.js", 969);
if (aliases) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 970);
len = names.length;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 971);
for (i = 0; i < len; i++) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 972);
if (aliases[names[i]] && !mods[names[i]]) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 973);
a = [].concat(a, aliases[names[i]]);
                        } else {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 975);
a.push(names[i]);
                        }
                    }
                    _yuitest_coverline("/build/yui-base/yui-base.js", 978);
names = a;
                }
                
                _yuitest_coverline("/build/yui-base/yui-base.js", 981);
len = names.length;
                
                _yuitest_coverline("/build/yui-base/yui-base.js", 983);
for (i = 0; i < len; i++) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 984);
name = names[i];
                    _yuitest_coverline("/build/yui-base/yui-base.js", 985);
if (!skip) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 986);
r.push(name);
                    }

                    // only attach a module once
                    _yuitest_coverline("/build/yui-base/yui-base.js", 990);
if (used[name]) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 991);
continue;
                    }
                    
                    _yuitest_coverline("/build/yui-base/yui-base.js", 994);
m = mods[name];
                    _yuitest_coverline("/build/yui-base/yui-base.js", 995);
req = null;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 996);
use = null;

                    _yuitest_coverline("/build/yui-base/yui-base.js", 998);
if (m) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 999);
used[name] = true;
                        _yuitest_coverline("/build/yui-base/yui-base.js", 1000);
req = m.details.requires;
                        _yuitest_coverline("/build/yui-base/yui-base.js", 1001);
use = m.details.use;
                    } else {
                        // CSS files don't register themselves, see if it has
                        // been loaded
                        _yuitest_coverline("/build/yui-base/yui-base.js", 1005);
if (!G_ENV._loaded[VERSION][name]) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 1006);
missing.push(name);
                        } else {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 1008);
used[name] = true; // probably css
                        }
                    }

                    // make sure requirements are attached
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1013);
if (req && req.length) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 1014);
process(req);
                    }

                    // make sure we grab the submodule dependencies too
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1018);
if (use && use.length) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 1019);
process(use, 1);
                    }
                }

            },

            handleLoader = function(fromLoader) {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "handleLoader", 1025);
_yuitest_coverline("/build/yui-base/yui-base.js", 1026);
var response = fromLoader || {
                        success: true,
                        msg: 'not dynamic'
                    },
                    redo, origMissing,
                    ret = true,
                    data = response.data;

                _yuitest_coverline("/build/yui-base/yui-base.js", 1034);
Y._loading = false;

                _yuitest_coverline("/build/yui-base/yui-base.js", 1036);
if (data) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1037);
origMissing = missing;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1038);
missing = [];
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1039);
r = [];
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1040);
process(data);
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1041);
redo = missing.length;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1042);
if (redo) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 1043);
if ([].concat(missing).sort().join() ==
                                origMissing.sort().join()) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 1045);
redo = false;
                        }
                    }
                }

                _yuitest_coverline("/build/yui-base/yui-base.js", 1050);
if (redo && data) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1051);
Y._loading = true;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1052);
Y._use(missing, function() {
                        _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 7)", 1052);
_yuitest_coverline("/build/yui-base/yui-base.js", 1053);
if (Y._attach(data)) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 1054);
Y._notify(callback, response, data);
                        }
                    });
                } else {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1058);
if (data) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 1059);
ret = Y._attach(data);
                    }
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1061);
if (ret) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 1062);
Y._notify(callback, response, args);
                    }
                }

                _yuitest_coverline("/build/yui-base/yui-base.js", 1066);
if (Y._useQueue && Y._useQueue.size() && !Y._loading) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1067);
Y._use.apply(Y, Y._useQueue.next());
                }

            };


        // YUI().use('*'); // bind everything available
        _yuitest_coverline("/build/yui-base/yui-base.js", 1074);
if (firstArg === '*') {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1075);
args = [];
            _yuitest_coverline("/build/yui-base/yui-base.js", 1076);
for (i in mods) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 1077);
if (mods.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1078);
args.push(i);
                }
            }
            _yuitest_coverline("/build/yui-base/yui-base.js", 1081);
ret = Y._attach(args);
            _yuitest_coverline("/build/yui-base/yui-base.js", 1082);
if (ret) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 1083);
handleLoader();
            }
            _yuitest_coverline("/build/yui-base/yui-base.js", 1085);
return Y;
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 1088);
if ((mods.loader || mods['loader-base']) && !Y.Loader) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1089);
Y._attach(['loader' + ((!mods.loader) ? '-base' : '')]);
        }


        // use loader to expand dependencies and sort the
        // requirements if it is available.
        _yuitest_coverline("/build/yui-base/yui-base.js", 1095);
if (boot && Y.Loader && args.length) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1096);
loader = getLoader(Y);
            _yuitest_coverline("/build/yui-base/yui-base.js", 1097);
loader.require(args);
            _yuitest_coverline("/build/yui-base/yui-base.js", 1098);
loader.ignoreRegistered = true;
            _yuitest_coverline("/build/yui-base/yui-base.js", 1099);
loader._boot = true;
            _yuitest_coverline("/build/yui-base/yui-base.js", 1100);
loader.calculate(null, (fetchCSS) ? null : 'js');
            _yuitest_coverline("/build/yui-base/yui-base.js", 1101);
args = loader.sorted;
            _yuitest_coverline("/build/yui-base/yui-base.js", 1102);
loader._boot = false;
        }
        
        _yuitest_coverline("/build/yui-base/yui-base.js", 1105);
process(args);

        _yuitest_coverline("/build/yui-base/yui-base.js", 1107);
len = missing.length;


        _yuitest_coverline("/build/yui-base/yui-base.js", 1110);
if (len) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1111);
missing = YArray.dedupe(missing);
            _yuitest_coverline("/build/yui-base/yui-base.js", 1112);
len = missing.length;
        }


        // dynamic load
        _yuitest_coverline("/build/yui-base/yui-base.js", 1117);
if (boot && len && Y.Loader) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1118);
Y._loading = true;
            _yuitest_coverline("/build/yui-base/yui-base.js", 1119);
loader = getLoader(Y);
            _yuitest_coverline("/build/yui-base/yui-base.js", 1120);
loader.onEnd = handleLoader;
            _yuitest_coverline("/build/yui-base/yui-base.js", 1121);
loader.context = Y;
            _yuitest_coverline("/build/yui-base/yui-base.js", 1122);
loader.data = args;
            _yuitest_coverline("/build/yui-base/yui-base.js", 1123);
loader.ignoreRegistered = false;
            _yuitest_coverline("/build/yui-base/yui-base.js", 1124);
loader.require(args);
            _yuitest_coverline("/build/yui-base/yui-base.js", 1125);
loader.insert(null, (fetchCSS) ? null : 'js');

        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 1127);
if (boot && len && Y.Get && !Env.bootstrapped) {

            _yuitest_coverline("/build/yui-base/yui-base.js", 1129);
Y._loading = true;

            _yuitest_coverline("/build/yui-base/yui-base.js", 1131);
handleBoot = function() {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "handleBoot", 1131);
_yuitest_coverline("/build/yui-base/yui-base.js", 1132);
Y._loading = false;
                _yuitest_coverline("/build/yui-base/yui-base.js", 1133);
queue.running = false;
                _yuitest_coverline("/build/yui-base/yui-base.js", 1134);
Env.bootstrapped = true;
                _yuitest_coverline("/build/yui-base/yui-base.js", 1135);
G_ENV._bootstrapping = false;
                _yuitest_coverline("/build/yui-base/yui-base.js", 1136);
if (Y._attach(['loader'])) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1137);
Y._use(args, callback);
                }
            };

            _yuitest_coverline("/build/yui-base/yui-base.js", 1141);
if (G_ENV._bootstrapping) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 1142);
queue.add(handleBoot);
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 1144);
G_ENV._bootstrapping = true;
                _yuitest_coverline("/build/yui-base/yui-base.js", 1145);
Y.Get.script(config.base + config.loaderPath, {
                    onEnd: handleBoot
                });
            }

        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1151);
ret = Y._attach(args);
            _yuitest_coverline("/build/yui-base/yui-base.js", 1152);
if (ret) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 1153);
handleLoader();
            }
        }}

        _yuitest_coverline("/build/yui-base/yui-base.js", 1157);
return Y;
    },


    /**
    Adds a namespace object onto the YUI global if called statically.

        // creates YUI.your.namespace.here as nested objects
        YUI.namespace("your.namespace.here");

    If called as a method on a YUI <em>instance</em>, it creates the
    namespace on the instance.

         // creates Y.property.package
         Y.namespace("property.package");

    Dots in the input string cause `namespace` to create nested objects for
    each token. If any part of the requested namespace already exists, the
    current object will be left in place.  This allows multiple calls to
    `namespace` to preserve existing namespaced properties.

    If the first token in the namespace string is "YAHOO", the token is
    discarded.

    Be careful with namespace tokens. Reserved words may work in some browsers
    and not others. For instance, the following will fail in some browsers
    because the supported version of JavaScript reserves the word "long":

         Y.namespace("really.long.nested.namespace");

    <em>Note: If you pass multiple arguments to create multiple namespaces, only
    the last one created is returned from this function.</em>

    @method namespace
    @param  {String} namespace* namespaces to create.
    @return {Object}  A reference to the last namespace object created.
    **/
    namespace: function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "namespace", 1194);
_yuitest_coverline("/build/yui-base/yui-base.js", 1195);
var a = arguments, o, i = 0, j, d, arg;

        _yuitest_coverline("/build/yui-base/yui-base.js", 1197);
for (; i < a.length; i++) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1198);
o = this; //Reset base object per argument or it will get reused from the last
            _yuitest_coverline("/build/yui-base/yui-base.js", 1199);
arg = a[i];
            _yuitest_coverline("/build/yui-base/yui-base.js", 1200);
if (arg.indexOf(PERIOD) > -1) { //Skip this if no "." is present
                _yuitest_coverline("/build/yui-base/yui-base.js", 1201);
d = arg.split(PERIOD);
                _yuitest_coverline("/build/yui-base/yui-base.js", 1202);
for (j = (d[0] == 'YAHOO') ? 1 : 0; j < d.length; j++) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1203);
o[d[j]] = o[d[j]] || {};
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1204);
o = o[d[j]];
                }
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 1207);
o[arg] = o[arg] || {};
                _yuitest_coverline("/build/yui-base/yui-base.js", 1208);
o = o[arg]; //Reset base object to the new object so it's returned
            }
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 1211);
return o;
    },

    // this is replaced if the log module is included
    log: NOOP,
    message: NOOP,
    // this is replaced if the dump module is included
    dump: function (o) { _yuitest_coverfunc("/build/yui-base/yui-base.js", "dump", 1218);
_yuitest_coverline("/build/yui-base/yui-base.js", 1218);
return ''+o; },

    /**
     * Report an error.  The reporting mechanism is controlled by
     * the `throwFail` configuration attribute.  If throwFail is
     * not specified, the message is written to the Logger, otherwise
     * a JS error is thrown. If an `errorFn` is specified in the config
     * it must return `true` to keep the error from being thrown.
     * @method error
     * @param msg {String} the error message.
     * @param e {Error|String} Optional JS error that was caught, or an error string.
     * @param src Optional additional info (passed to `Y.config.errorFn` and `Y.message`)
     * and `throwFail` is specified, this error will be re-thrown.
     * @return {YUI} this YUI instance.
     */
    error: function(msg, e, src) {
        //TODO Add check for window.onerror here

        _yuitest_coverfunc("/build/yui-base/yui-base.js", "error", 1233);
_yuitest_coverline("/build/yui-base/yui-base.js", 1236);
var Y = this, ret;

        _yuitest_coverline("/build/yui-base/yui-base.js", 1238);
if (Y.config.errorFn) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1239);
ret = Y.config.errorFn.apply(Y, arguments);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 1242);
if (!ret) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1243);
throw (e || new Error(msg));
        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1245);
Y.message(msg, 'error', ''+src); // don't scrub this one
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 1248);
return Y;
    },

    /**
     * Generate an id that is unique among all YUI instances
     * @method guid
     * @param pre {String} optional guid prefix.
     * @return {String} the guid.
     */
    guid: function(pre) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "guid", 1257);
_yuitest_coverline("/build/yui-base/yui-base.js", 1258);
var id = this.Env._guidp + '_' + (++this.Env._uidx);
        _yuitest_coverline("/build/yui-base/yui-base.js", 1259);
return (pre) ? (pre + id) : id;
    },

    /**
     * Returns a `guid` associated with an object.  If the object
     * does not have one, a new one is created unless `readOnly`
     * is specified.
     * @method stamp
     * @param o {Object} The object to stamp.
     * @param readOnly {Boolean} if `true`, a valid guid will only
     * be returned if the object has one assigned to it.
     * @return {String} The object's guid or null.
     */
    stamp: function(o, readOnly) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "stamp", 1272);
_yuitest_coverline("/build/yui-base/yui-base.js", 1273);
var uid;
        _yuitest_coverline("/build/yui-base/yui-base.js", 1274);
if (!o) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1275);
return o;
        }

        // IE generates its own unique ID for dom nodes
        // The uniqueID property of a document node returns a new ID
        _yuitest_coverline("/build/yui-base/yui-base.js", 1280);
if (o.uniqueID && o.nodeType && o.nodeType !== 9) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1281);
uid = o.uniqueID;
        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1283);
uid = (typeof o === 'string') ? o : o._yuid;
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 1286);
if (!uid) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1287);
uid = this.guid();
            _yuitest_coverline("/build/yui-base/yui-base.js", 1288);
if (!readOnly) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 1289);
try {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1290);
o._yuid = uid;
                } catch (e) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 1292);
uid = null;
                }
            }
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 1296);
return uid;
    },

    /**
     * Destroys the YUI instance
     * @method destroy
     * @since 3.3.0
     */
    destroy: function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "destroy", 1304);
_yuitest_coverline("/build/yui-base/yui-base.js", 1305);
var Y = this;
        _yuitest_coverline("/build/yui-base/yui-base.js", 1306);
if (Y.Event) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1307);
Y.Event._unload();
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 1309);
delete instances[Y.id];
        _yuitest_coverline("/build/yui-base/yui-base.js", 1310);
delete Y.Env;
        _yuitest_coverline("/build/yui-base/yui-base.js", 1311);
delete Y.config;
    }

    /**
     * instanceof check for objects that works around
     * memory leak in IE when the item tested is
     * window/document
     * @method instanceOf
     * @param o {Object} The object to check.
     * @param type {Object} The class to check against.
     * @since 3.3.0
     */
};

    _yuitest_coverline("/build/yui-base/yui-base.js", 1325);
YUI.prototype = proto;

    // inheritance utilities are not available yet
    _yuitest_coverline("/build/yui-base/yui-base.js", 1328);
for (prop in proto) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 1329);
if (proto.hasOwnProperty(prop)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1330);
YUI[prop] = proto[prop];
        }
    }

    /**
Static method on the Global YUI object to apply a config to all YUI instances.
It's main use case is "mashups" where several third party scripts are trying to write to
a global YUI config at the same time. This way they can all call `YUI.applyConfig({})` instead of
overwriting other scripts configs.
@static
@since 3.5.0
@method applyConfig
@param {Object} o the configuration object.
@example

    YUI.applyConfig({
        modules: {
            davglass: {
                fullpath: './davglass.js'
            }
        }
    });

    YUI.applyConfig({
        modules: {
            foo: {
                fullpath: './foo.js'
            }
        }
    });

    YUI().use('davglass', function(Y) {
        //Module davglass will be available here..
    });

    */
    _yuitest_coverline("/build/yui-base/yui-base.js", 1366);
YUI.applyConfig = function(o) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "applyConfig", 1366);
_yuitest_coverline("/build/yui-base/yui-base.js", 1367);
if (!o) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1368);
return;
        }
        //If there is a GlobalConfig, apply it first to set the defaults
        _yuitest_coverline("/build/yui-base/yui-base.js", 1371);
if (YUI.GlobalConfig) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 1372);
this.prototype.applyConfig.call(this, YUI.GlobalConfig);
        }
        //Apply this config to it
        _yuitest_coverline("/build/yui-base/yui-base.js", 1375);
this.prototype.applyConfig.call(this, o);
        //Reset GlobalConfig to the combined config
        _yuitest_coverline("/build/yui-base/yui-base.js", 1377);
YUI.GlobalConfig = this.config;
    };

    // set up the environment
    _yuitest_coverline("/build/yui-base/yui-base.js", 1381);
YUI._init();

    _yuitest_coverline("/build/yui-base/yui-base.js", 1383);
if (hasWin) {
        // add a window load event at load time so we can capture
        // the case where it fires before dynamic loading is
        // complete.
        _yuitest_coverline("/build/yui-base/yui-base.js", 1387);
add(window, 'load', handleLoad);
    } else {
        _yuitest_coverline("/build/yui-base/yui-base.js", 1389);
handleLoad();
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 1392);
YUI.Env.add = add;
    _yuitest_coverline("/build/yui-base/yui-base.js", 1393);
YUI.Env.remove = remove;

    /*global exports*/
    // Support the CommonJS method for exporting our single global
    _yuitest_coverline("/build/yui-base/yui-base.js", 1397);
if (typeof exports == 'object') {
        _yuitest_coverline("/build/yui-base/yui-base.js", 1398);
exports.YUI = YUI;
    }

}());


/**
 * The config object contains all of the configuration options for
 * the `YUI` instance.  This object is supplied by the implementer
 * when instantiating a `YUI` instance.  Some properties have default
 * values if they are not supplied by the implementer.  This should
 * not be updated directly because some values are cached.  Use
 * `applyConfig()` to update the config object on a YUI instance that
 * has already been configured.
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
 * Turns on writing Ylog messages to the browser console.
 *
 * @property debug
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
 * A hash of log sources that should be logged.  If specified, only
 * log messages from these sources will be logged.
 *
 * @property logInclude
 * @type object
 */

/**
 * A hash of log sources that should be not be logged.  If specified,
 * all sources are logged if not on this list.
 *
 * @property logExclude
 * @type object
 */

/**
 * Set to true if the yui seed file was dynamically loaded in
 * order to bootstrap components relying on the window load event
 * and the `domready` custom event.
 *
 * @property injected
 * @type boolean
 * @default false
 */

/**
 * If `throwFail` is set, `Y.error` will generate or re-throw a JS Error.
 * Otherwise the failure is logged.
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
 * A list of modules that defines the YUI core (overrides the default list).
 *
 * @property core
 * @type Array
 * @default [ get,features,intl-base,yui-log,yui-later,loader-base, loader-rollup, loader-yui3 ]
 */

/**
 * A list of languages in order of preference. This list is matched against
 * the list of available languages in modules that the YUI instance uses to
 * determine the best possible localization of language sensitive modules.
 * Languages are represented using BCP 47 language tags, such as "en-GB" for
 * English as used in the United Kingdom, or "zh-Hans-CN" for simplified
 * Chinese as used in China. The list can be provided as a comma-separated
 * list or as an array.
 *
 * @property lang
 * @type string|string[]
 */

/**
 * The default date format
 * @property dateFormat
 * @type string
 * @deprecated use configuration in `DataType.Date.format()` instead.
 */

/**
 * The default locale
 * @property locale
 * @type string
 * @deprecated use `config.lang` instead.
 */

/**
 * The default interval when polling in milliseconds.
 * @property pollInterval
 * @type int
 * @default 20
 */

/**
 * The number of dynamic nodes to insert by default before
 * automatically removing them.  This applies to script nodes
 * because removing the node will not make the evaluated script
 * unavailable.  Dynamic CSS is not auto purged, because removing
 * a linked style sheet will also remove the style definitions.
 * @property purgethreshold
 * @type int
 * @default 20
 */

/**
 * The default interval when polling in milliseconds.
 * @property windowResizeDelay
 * @type int
 * @default 40
 */

/**
 * Base directory for dynamic loading
 * @property base
 * @type string
 */

/*
 * The secure base dir (not implemented)
 * For dynamic loading.
 * @property secureBase
 * @type string
 */

/**
 * The YUI combo service base dir. Ex: `http://yui.yahooapis.com/combo?`
 * For dynamic loading.
 * @property comboBase
 * @type string
 */

/**
 * The root path to prepend to module path for the combo service.
 * Ex: 3.0.0b1/build/
 * For dynamic loading.
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
 *
 *      myFilter: {
 *          'searchExp': "-min\\.js",
 *          'replaceStr': "-debug.js"
 *      }
 *
 * For dynamic loading.
 *
 * @property filter
 * @type string|object
 */

/**
 * The `skin` config let's you configure application level skin
 * customizations.  It contains the following attributes which
 * can be specified to override the defaults:
 *
 *      // The default skin, which is automatically applied if not
 *      // overriden by a component-specific skin definition.
 *      // Change this in to apply a different skin globally
 *      defaultSkin: 'sam',
 *
 *      // This is combined with the loader base property to get
 *      // the default root directory for a skin.
 *      base: 'assets/skins/',
 *
 *      // Any component-specific overrides can be specified here,
 *      // making it possible to load different skins for different
 *      // components.  It is possible to load more than one skin
 *      // for a given component as well.
 *      overrides: {
 *          slider: ['capsule', 'round']
 *      }
 *
 * For dynamic loading.
 *
 *  @property skin
 */

/**
 * Hash of per-component filter specification.  If specified for a given
 * component, this overrides the filter config.
 *
 * For dynamic loading.
 *
 * @property filters
 */

/**
 * Use the YUI combo service to reduce the number of http connections
 * required to load your dependencies.  Turning this off will
 * disable combo handling for YUI and all module groups configured
 * with a combo service.
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
 * Node or id for a node that should be used as the insertion point for new
 * nodes.  For dynamic loading.
 *
 * @property insertBefore
 * @type string
 */

/**
 * Object literal containing attributes to add to dynamically loaded script
 * nodes.
 * @property jsAttributes
 * @type string
 */

/**
 * Object literal containing attributes to add to dynamically loaded link
 * nodes.
 * @property cssAttributes
 * @type string
 */

/**
 * Number of milliseconds before a timeout occurs when dynamically
 * loading nodes. If not set, there is no timeout.
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
 * A hash of module definitions to add to the list of YUI components.
 * These components can then be dynamically loaded side by side with
 * YUI via the `use()` method. This is a hash, the key is the module
 * name, and the value is an object literal specifying the metdata
 * for the module.  See `Loader.addModule` for the supported module
 * metadata fields.  Also see groups, which provides a way to
 * configure the base and combo spec for a set of modules.
 *
 *      modules: {
 *          mymod1: {
 *              requires: ['node'],
 *              fullpath: '/mymod1/mymod1.js'
 *          },
 *          mymod2: {
 *              requires: ['mymod1'],
 *              fullpath: '/mymod2/mymod2.js'
 *          },
 *          mymod3: '/js/mymod3.js',
 *          mycssmod: '/css/mycssmod.css'
 *      }
 *
 *
 * @property modules
 * @type object
 */

/**
 * Aliases are dynamic groups of modules that can be used as
 * shortcuts.
 *
 *      YUI({
 *          aliases: {
 *              davglass: [ 'node', 'yql', 'dd' ],
 *              mine: [ 'davglass', 'autocomplete']
 *          }
 *      }).use('mine', function(Y) {
 *          //Node, YQL, DD &amp; AutoComplete available here..
 *      });
 *
 * @property aliases
 * @type object
 */

/**
 * A hash of module group definitions.  It for each group you
 * can specify a list of modules and the base path and
 * combo spec to use when dynamically loading the modules.
 *
 *      groups: {
 *          yui2: {
 *              // specify whether or not this group has a combo service
 *              combine: true,
 *
 *              // The comboSeperator to use with this group's combo handler
 *              comboSep: ';',
 *
 *              // The maxURLLength for this server
 *              maxURLLength: 500,
 *
 *              // the base path for non-combo paths
 *              base: 'http://yui.yahooapis.com/2.8.0r4/build/',
 *
 *              // the path to the combo service
 *              comboBase: 'http://yui.yahooapis.com/combo?',
 *
 *              // a fragment to prepend to the path attribute when
 *              // when building combo urls
 *              root: '2.8.0r4/build/',
 *
 *              // the module definitions
 *              modules:  {
 *                  yui2_yde: {
 *                      path: "yahoo-dom-event/yahoo-dom-event.js"
 *                  },
 *                  yui2_anim: {
 *                      path: "animation/animation.js",
 *                      requires: ['yui2_yde']
 *                  }
 *              }
 *          }
 *      }
 *
 * @property groups
 * @type object
 */

/**
 * The loader 'path' attribute to the loader itself.  This is combined
 * with the 'base' attribute to dynamically load the loader component
 * when boostrapping with the get utility alone.
 *
 * @property loaderPath
 * @type string
 * @default loader/loader-min.js
 */

/**
 * Specifies whether or not YUI().use(...) will attempt to load CSS
 * resources at all.  Any truthy value will cause CSS dependencies
 * to load when fetching script.  The special value 'force' will
 * cause CSS dependencies to be loaded even if no script is needed.
 *
 * @property fetchCSS
 * @type boolean|string
 * @default true
 */

/**
 * The default gallery version to build gallery module urls
 * @property gallery
 * @type string
 * @since 3.1.0
 */

/**
 * The default YUI 2 version to build yui2 module urls.  This is for
 * intrinsic YUI 2 support via the 2in3 project.  Also see the '2in3'
 * config for pulling different revisions of the wrapped YUI 2
 * modules.
 * @since 3.1.0
 * @property yui2
 * @type string
 * @default 2.9.0
 */

/**
 * The 2in3 project is a deployment of the various versions of YUI 2
 * deployed as first-class YUI 3 modules.  Eventually, the wrapper
 * for the modules will change (but the underlying YUI 2 code will
 * be the same), and you can select a particular version of
 * the wrapper modules via this config.
 * @since 3.1.0
 * @property 2in3
 * @type string
 * @default 4
 */

/**
 * Alternative console log function for use in environments without
 * a supported native console.  The function is executed in the
 * YUI instance context.
 * @since 3.1.0
 * @property logFn
 * @type Function
 */

/**
 * A callback to execute when Y.error is called.  It receives the
 * error message and an javascript error object if Y.error was
 * executed because a javascript error was caught.  The function
 * is executed in the YUI instance context. Returning `true` from this
 * function will stop the Error from being thrown.
 *
 * @since 3.2.0
 * @property errorFn
 * @type Function
 */

/**
 * A callback to execute when the loader fails to load one or
 * more resource.  This could be because of a script load
 * failure.  It can also fail if a javascript module fails
 * to register itself, but only when the 'requireRegistration'
 * is true.  If this function is defined, the use() callback will
 * only be called when the loader succeeds, otherwise it always
 * executes unless there was a javascript error when attaching
 * a module.
 *
 * @since 3.3.0
 * @property loadErrorFn
 * @type Function
 */

/**
 * When set to true, the YUI loader will expect that all modules
 * it is responsible for loading will be first-class YUI modules
 * that register themselves with the YUI global.  If this is
 * set to true, loader will fail if the module registration fails
 * to happen after the script is loaded.
 *
 * @since 3.3.0
 * @property requireRegistration
 * @type boolean
 * @default false
 */

/**
 * Cache serviced use() requests.
 * @since 3.3.0
 * @property cacheUse
 * @type boolean
 * @default true
 * @deprecated no longer used
 */

/**
 * Whether or not YUI should use native ES5 functionality when available for
 * features like `Y.Array.each()`, `Y.Object()`, etc. When `false`, YUI will
 * always use its own fallback implementations instead of relying on ES5
 * functionality, even when it's available.
 *
 * @property useNativeES5
 * @type Boolean
 * @default true
 * @since 3.5.0
 */

/**
Delay the `use` callback until a specific event has passed (`load`, `domready`, `contentready` or `available`)
@property delayUntil
@type String|Object
@since 3.6.0
@example

You can use `load` or `domready` strings by default:

    YUI({
        delayUntil: 'domready'
    }, function(Y) {
        //This will not fire until 'domeready'
    });

Or you can delay until a node is available (with `available` or `contentready`):

    YUI({
        delayUntil: {
            event: 'available',
            args: '#foo'
        }
    }, function(Y) {
        //This will not fire until '#foo' is 
        // available in the DOM
    });
    

*/
_yuitest_coverline("/build/yui-base/yui-base.js", 1950);
YUI.add('yui-base', function(Y) {

/*
 * YUI stub
 * @module yui
 * @submodule yui-base
 */
/**
 * The YUI module contains the components required for building the YUI
 * seed file.  This includes the script loading mechanism, a simple queue,
 * and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

/**
 * Provides core language utilites and extensions used throughout YUI.
 *
 * @class Lang
 * @static
 */

_yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 8)", 1950);
_yuitest_coverline("/build/yui-base/yui-base.js", 1972);
var L = Y.Lang || (Y.Lang = {}),

STRING_PROTO = String.prototype,
TOSTRING     = Object.prototype.toString,

TYPES = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
},

SUBREGEX        = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,
TRIMREGEX       = /^\s+|\s+$/g,
NATIVE_FN_REGEX = /\{\s*\[(?:native code|function)\]\s*\}/i;

// -- Protected Methods --------------------------------------------------------

/**
Returns `true` if the given function appears to be implemented in native code,
`false` otherwise. Will always return `false` -- even in ES5-capable browsers --
if the `useNativeES5` YUI config option is set to `false`.

This isn't guaranteed to be 100% accurate and won't work for anything other than
functions, but it can be useful for determining whether a function like
`Array.prototype.forEach` is native or a JS shim provided by another library.

There's a great article by @kangax discussing certain flaws with this technique:
<http://perfectionkills.com/detecting-built-in-host-methods/>

While his points are valid, it's still possible to benefit from this function
as long as it's used carefully and sparingly, and in such a way that false
negatives have minimal consequences. It's used internally to avoid using
potentially broken non-native ES5 shims that have been added to the page by
other libraries.

@method _isNative
@param {Function} fn Function to test.
@return {Boolean} `true` if _fn_ appears to be native, `false` otherwise.
@static
@protected
@since 3.5.0
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2020);
L._isNative = function (fn) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "_isNative", 2020);
_yuitest_coverline("/build/yui-base/yui-base.js", 2021);
return !!(Y.config.useNativeES5 && fn && NATIVE_FN_REGEX.test(fn));
};

// -- Public Methods -----------------------------------------------------------

/**
 * Determines whether or not the provided item is an array.
 *
 * Returns `false` for array-like collections such as the function `arguments`
 * collection or `HTMLElement` collections. Use `Y.Array.test()` if you want to
 * test for an array-like collection.
 *
 * @method isArray
 * @param o The object to test.
 * @return {boolean} true if o is an array.
 * @static
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2038);
L.isArray = L._isNative(Array.isArray) ? Array.isArray : function (o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isArray", 2038);
_yuitest_coverline("/build/yui-base/yui-base.js", 2039);
return L.type(o) === 'array';
};

/**
 * Determines whether or not the provided item is a boolean.
 * @method isBoolean
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a boolean.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2049);
L.isBoolean = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isBoolean", 2049);
_yuitest_coverline("/build/yui-base/yui-base.js", 2050);
return typeof o === 'boolean';
};

/**
 * Determines whether or not the supplied item is a date instance.
 * @method isDate
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a date.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2060);
L.isDate = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isDate", 2060);
_yuitest_coverline("/build/yui-base/yui-base.js", 2061);
return L.type(o) === 'date' && o.toString() !== 'Invalid Date' && !isNaN(o);
};

/**
 * <p>
 * Determines whether or not the provided item is a function.
 * Note: Internet Explorer thinks certain functions are objects:
 * </p>
 *
 * <pre>
 * var obj = document.createElement("object");
 * Y.Lang.isFunction(obj.getAttribute) // reports false in IE
 * &nbsp;
 * var input = document.createElement("input"); // append to body
 * Y.Lang.isFunction(input.focus) // reports false in IE
 * </pre>
 *
 * <p>
 * You will have to implement additional tests if these functions
 * matter to you.
 * </p>
 *
 * @method isFunction
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a function.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2088);
L.isFunction = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isFunction", 2088);
_yuitest_coverline("/build/yui-base/yui-base.js", 2089);
return L.type(o) === 'function';
};

/**
 * Determines whether or not the provided item is null.
 * @method isNull
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is null.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2099);
L.isNull = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isNull", 2099);
_yuitest_coverline("/build/yui-base/yui-base.js", 2100);
return o === null;
};

/**
 * Determines whether or not the provided item is a legal number.
 * @method isNumber
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a number.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2110);
L.isNumber = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isNumber", 2110);
_yuitest_coverline("/build/yui-base/yui-base.js", 2111);
return typeof o === 'number' && isFinite(o);
};

/**
 * Determines whether or not the provided item is of type object
 * or function. Note that arrays are also objects, so
 * <code>Y.Lang.isObject([]) === true</code>.
 * @method isObject
 * @static
 * @param o The object to test.
 * @param failfn {boolean} fail if the input is a function.
 * @return {boolean} true if o is an object.
 * @see isPlainObject
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2125);
L.isObject = function(o, failfn) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isObject", 2125);
_yuitest_coverline("/build/yui-base/yui-base.js", 2126);
var t = typeof o;
    _yuitest_coverline("/build/yui-base/yui-base.js", 2127);
return (o && (t === 'object' ||
        (!failfn && (t === 'function' || L.isFunction(o))))) || false;
};

/**
 * Determines whether or not the provided item is a string.
 * @method isString
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a string.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2138);
L.isString = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isString", 2138);
_yuitest_coverline("/build/yui-base/yui-base.js", 2139);
return typeof o === 'string';
};

/**
 * Determines whether or not the provided item is undefined.
 * @method isUndefined
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is undefined.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2149);
L.isUndefined = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isUndefined", 2149);
_yuitest_coverline("/build/yui-base/yui-base.js", 2150);
return typeof o === 'undefined';
};

/**
 * A convenience method for detecting a legitimate non-null value.
 * Returns false for null/undefined/NaN, true for other values,
 * including 0/false/''
 * @method isValue
 * @static
 * @param o The item to test.
 * @return {boolean} true if it is not null/undefined/NaN || false.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2162);
L.isValue = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isValue", 2162);
_yuitest_coverline("/build/yui-base/yui-base.js", 2163);
var t = L.type(o);

    _yuitest_coverline("/build/yui-base/yui-base.js", 2165);
switch (t) {
        case 'number':
            _yuitest_coverline("/build/yui-base/yui-base.js", 2167);
return isFinite(o);

        case 'null': // fallthru
        case 'undefined':
            _yuitest_coverline("/build/yui-base/yui-base.js", 2171);
return false;

        default:
            _yuitest_coverline("/build/yui-base/yui-base.js", 2174);
return !!t;
    }
};

/**
 * Returns the current time in milliseconds.
 *
 * @method now
 * @return {Number} Current time in milliseconds.
 * @static
 * @since 3.3.0
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2186);
L.now = Date.now || function () {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 9)", 2186);
_yuitest_coverline("/build/yui-base/yui-base.js", 2187);
return new Date().getTime();
};

/**
 * Lightweight version of <code>Y.substitute</code>. Uses the same template
 * structure as <code>Y.substitute</code>, but doesn't support recursion,
 * auto-object coersion, or formats.
 * @method sub
 * @param {string} s String to be modified.
 * @param {object} o Object containing replacement values.
 * @return {string} the substitute result.
 * @static
 * @since 3.2.0
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2201);
L.sub = function(s, o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "sub", 2201);
_yuitest_coverline("/build/yui-base/yui-base.js", 2202);
return s.replace ? s.replace(SUBREGEX, function (match, key) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 10)", 2202);
_yuitest_coverline("/build/yui-base/yui-base.js", 2203);
return L.isUndefined(o[key]) ? match : o[key];
    }) : s;
};

/**
 * Returns a string without any leading or trailing whitespace.  If
 * the input is not a string, the input will be returned untouched.
 * @method trim
 * @static
 * @param s {string} the string to trim.
 * @return {string} the trimmed string.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2215);
L.trim = STRING_PROTO.trim ? function(s) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 11)", 2215);
_yuitest_coverline("/build/yui-base/yui-base.js", 2216);
return s && s.trim ? s.trim() : s;
} : function (s) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "}", 2217);
_yuitest_coverline("/build/yui-base/yui-base.js", 2218);
try {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2219);
return s.replace(TRIMREGEX, '');
    } catch (e) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2221);
return s;
    }
};

/**
 * Returns a string without any leading whitespace.
 * @method trimLeft
 * @static
 * @param s {string} the string to trim.
 * @return {string} the trimmed string.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2232);
L.trimLeft = STRING_PROTO.trimLeft ? function (s) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 12)", 2232);
_yuitest_coverline("/build/yui-base/yui-base.js", 2233);
return s.trimLeft();
} : function (s) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "}", 2234);
_yuitest_coverline("/build/yui-base/yui-base.js", 2235);
return s.replace(/^\s+/, '');
};

/**
 * Returns a string without any trailing whitespace.
 * @method trimRight
 * @static
 * @param s {string} the string to trim.
 * @return {string} the trimmed string.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2245);
L.trimRight = STRING_PROTO.trimRight ? function (s) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 13)", 2245);
_yuitest_coverline("/build/yui-base/yui-base.js", 2246);
return s.trimRight();
} : function (s) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "}", 2247);
_yuitest_coverline("/build/yui-base/yui-base.js", 2248);
return s.replace(/\s+$/, '');
};

/**
Returns one of the following strings, representing the type of the item passed
in:

 * "array"
 * "boolean"
 * "date"
 * "error"
 * "function"
 * "null"
 * "number"
 * "object"
 * "regexp"
 * "string"
 * "undefined"

Known issues:

 * `typeof HTMLElementCollection` returns function in Safari, but
    `Y.Lang.type()` reports "object", which could be a good thing --
    but it actually caused the logic in <code>Y.Lang.isObject</code> to fail.

@method type
@param o the item to test.
@return {string} the detected type.
@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2278);
L.type = function(o) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "type", 2278);
_yuitest_coverline("/build/yui-base/yui-base.js", 2279);
return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
/**
@module yui
@submodule yui-base
*/

_yuitest_coverline("/build/yui-base/yui-base.js", 2286);
var Lang   = Y.Lang,
    Native = Array.prototype,

    hasOwn = Object.prototype.hasOwnProperty;

/**
Provides utility methods for working with arrays. Additional array helpers can
be found in the `collection` and `array-extras` modules.

`Y.Array(thing)` returns a native array created from _thing_. Depending on
_thing_'s type, one of the following will happen:

  * Arrays are returned unmodified unless a non-zero _startIndex_ is
    specified.
  * Array-like collections (see `Array.test()`) are converted to arrays.
  * For everything else, a new array is created with _thing_ as the sole
    item.

Note: elements that are also collections, such as `<form>` and `<select>`
elements, are not automatically converted to arrays. To force a conversion,
pass `true` as the value of the _force_ parameter.

@class Array
@constructor
@param {Any} thing The thing to arrayify.
@param {Number} [startIndex=0] If non-zero and _thing_ is an array or array-like
  collection, a subset of items starting at the specified index will be
  returned.
@param {Boolean} [force=false] If `true`, _thing_ will be treated as an
  array-like collection no matter what.
@return {Array} A native array created from _thing_, according to the rules
  described above.
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2319);
function YArray(thing, startIndex, force) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "YArray", 2319);
_yuitest_coverline("/build/yui-base/yui-base.js", 2320);
var len, result;

    _yuitest_coverline("/build/yui-base/yui-base.js", 2322);
startIndex || (startIndex = 0);

    _yuitest_coverline("/build/yui-base/yui-base.js", 2324);
if (force || YArray.test(thing)) {
        // IE throws when trying to slice HTMLElement collections.
        _yuitest_coverline("/build/yui-base/yui-base.js", 2326);
try {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2327);
return Native.slice.call(thing, startIndex);
        } catch (ex) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2329);
result = [];

            _yuitest_coverline("/build/yui-base/yui-base.js", 2331);
for (len = thing.length; startIndex < len; ++startIndex) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 2332);
result.push(thing[startIndex]);
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 2335);
return result;
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2339);
return [thing];
}

_yuitest_coverline("/build/yui-base/yui-base.js", 2342);
Y.Array = YArray;

/**
Dedupes an array of strings, returning an array that's guaranteed to contain
only one copy of a given string.

This method differs from `Array.unique()` in that it's optimized for use only
with strings, whereas `unique` may be used with other types (but is slower).
Using `dedupe()` with non-string values may result in unexpected behavior.

@method dedupe
@param {String[]} array Array of strings to dedupe.
@return {Array} Deduped copy of _array_.
@static
@since 3.4.0
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2358);
YArray.dedupe = function (array) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "dedupe", 2358);
_yuitest_coverline("/build/yui-base/yui-base.js", 2359);
var hash    = {},
        results = [],
        i, item, len;

    _yuitest_coverline("/build/yui-base/yui-base.js", 2363);
for (i = 0, len = array.length; i < len; ++i) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2364);
item = array[i];

        _yuitest_coverline("/build/yui-base/yui-base.js", 2366);
if (!hasOwn.call(hash, item)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2367);
hash[item] = 1;
            _yuitest_coverline("/build/yui-base/yui-base.js", 2368);
results.push(item);
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2372);
return results;
};

/**
Executes the supplied function on each item in the array. This method wraps
the native ES5 `Array.forEach()` method if available.

@method each
@param {Array} array Array to iterate.
@param {Function} fn Function to execute on each item in the array. The function
  will receive the following arguments:
    @param {Any} fn.item Current array item.
    @param {Number} fn.index Current array index.
    @param {Array} fn.array Array being iterated.
@param {Object} [thisObj] `this` object to use when calling _fn_.
@return {YUI} The YUI instance.
@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2390);
YArray.each = YArray.forEach = Lang._isNative(Native.forEach) ? function (array, fn, thisObj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 14)", 2390);
_yuitest_coverline("/build/yui-base/yui-base.js", 2391);
Native.forEach.call(array || [], fn, thisObj || Y);
    _yuitest_coverline("/build/yui-base/yui-base.js", 2392);
return Y;
} : function (array, fn, thisObj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "}", 2393);
_yuitest_coverline("/build/yui-base/yui-base.js", 2394);
for (var i = 0, len = (array && array.length) || 0; i < len; ++i) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2395);
if (i in array) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2396);
fn.call(thisObj || Y, array[i], i, array);
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2400);
return Y;
};

/**
Alias for `each()`.

@method forEach
@static
**/

/**
Returns an object using the first array as keys and the second as values. If
the second array is not provided, or if it doesn't contain the same number of
values as the first array, then `true` will be used in place of the missing
values.

@example

    Y.Array.hash(['a', 'b', 'c'], ['foo', 'bar']);
    // => {a: 'foo', b: 'bar', c: true}

@method hash
@param {String[]} keys Array of strings to use as keys.
@param {Array} [values] Array to use as values.
@return {Object} Hash using the first array as keys and the second as values.
@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2427);
YArray.hash = function (keys, values) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "hash", 2427);
_yuitest_coverline("/build/yui-base/yui-base.js", 2428);
var hash = {},
        vlen = (values && values.length) || 0,
        i, len;

    _yuitest_coverline("/build/yui-base/yui-base.js", 2432);
for (i = 0, len = keys.length; i < len; ++i) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2433);
if (i in keys) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2434);
hash[keys[i]] = vlen > i && i in values ? values[i] : true;
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2438);
return hash;
};

/**
Returns the index of the first item in the array that's equal (using a strict
equality check) to the specified _value_, or `-1` if the value isn't found.

This method wraps the native ES5 `Array.indexOf()` method if available.

@method indexOf
@param {Array} array Array to search.
@param {Any} value Value to search for.
@param {Number} [from=0] The index at which to begin the search.
@return {Number} Index of the item strictly equal to _value_, or `-1` if not
    found.
@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2455);
YArray.indexOf = Lang._isNative(Native.indexOf) ? function (array, value, from) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 15)", 2455);
_yuitest_coverline("/build/yui-base/yui-base.js", 2456);
return Native.indexOf.call(array, value, from);
} : function (array, value, from) {
    // http://es5.github.com/#x15.4.4.14
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "}", 2457);
_yuitest_coverline("/build/yui-base/yui-base.js", 2459);
var len = array.length;

    _yuitest_coverline("/build/yui-base/yui-base.js", 2461);
from = +from || 0;
    _yuitest_coverline("/build/yui-base/yui-base.js", 2462);
from = (from > 0 || -1) * Math.floor(Math.abs(from));

    _yuitest_coverline("/build/yui-base/yui-base.js", 2464);
if (from < 0) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2465);
from += len;

        _yuitest_coverline("/build/yui-base/yui-base.js", 2467);
if (from < 0) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2468);
from = 0;
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2472);
for (; from < len; ++from) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2473);
if (from in array && array[from] === value) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2474);
return from;
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2478);
return -1;
};

/**
Numeric sort convenience function.

The native `Array.prototype.sort()` function converts values to strings and
sorts them in lexicographic order, which is unsuitable for sorting numeric
values. Provide `Array.numericSort` as a custom sort function when you want
to sort values in numeric order.

@example

    [42, 23, 8, 16, 4, 15].sort(Y.Array.numericSort);
    // => [4, 8, 15, 16, 23, 42]

@method numericSort
@param {Number} a First value to compare.
@param {Number} b Second value to compare.
@return {Number} Difference between _a_ and _b_.
@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2500);
YArray.numericSort = function (a, b) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "numericSort", 2500);
_yuitest_coverline("/build/yui-base/yui-base.js", 2501);
return a - b;
};

/**
Executes the supplied function on each item in the array. Returning a truthy
value from the function will stop the processing of remaining items.

@method some
@param {Array} array Array to iterate over.
@param {Function} fn Function to execute on each item. The function will receive
  the following arguments:
    @param {Any} fn.value Current array item.
    @param {Number} fn.index Current array index.
    @param {Array} fn.array Array being iterated over.
@param {Object} [thisObj] `this` object to use when calling _fn_.
@return {Boolean} `true` if the function returns a truthy value on any of the
  items in the array; `false` otherwise.
@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2520);
YArray.some = Lang._isNative(Native.some) ? function (array, fn, thisObj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 16)", 2520);
_yuitest_coverline("/build/yui-base/yui-base.js", 2521);
return Native.some.call(array, fn, thisObj);
} : function (array, fn, thisObj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "}", 2522);
_yuitest_coverline("/build/yui-base/yui-base.js", 2523);
for (var i = 0, len = array.length; i < len; ++i) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2524);
if (i in array && fn.call(thisObj, array[i], i, array)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2525);
return true;
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2529);
return false;
};

/**
Evaluates _obj_ to determine if it's an array, an array-like collection, or
something else. This is useful when working with the function `arguments`
collection and `HTMLElement` collections.

Note: This implementation doesn't consider elements that are also
collections, such as `<form>` and `<select>`, to be array-like.

@method test
@param {Object} obj Object to test.
@return {Number} A number indicating the results of the test:

  * 0: Neither an array nor an array-like collection.
  * 1: Real array.
  * 2: Array-like collection.

@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2550);
YArray.test = function (obj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "test", 2550);
_yuitest_coverline("/build/yui-base/yui-base.js", 2551);
var result = 0;

    _yuitest_coverline("/build/yui-base/yui-base.js", 2553);
if (Lang.isArray(obj)) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2554);
result = 1;
    } else {_yuitest_coverline("/build/yui-base/yui-base.js", 2555);
if (Lang.isObject(obj)) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2556);
try {
            // indexed, but no tagName (element) or alert (window),
            // or functions without apply/call (Safari
            // HTMLElementCollection bug).
            _yuitest_coverline("/build/yui-base/yui-base.js", 2560);
if ('length' in obj && !obj.tagName && !obj.alert && !obj.apply) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 2561);
result = 2;
            }
        } catch (ex) {}
    }}

    _yuitest_coverline("/build/yui-base/yui-base.js", 2566);
return result;
};
/**
 * The YUI module contains the components required for building the YUI
 * seed file.  This includes the script loading mechanism, a simple queue,
 * and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

/**
 * A simple FIFO queue.  Items are added to the Queue with add(1..n items) and
 * removed using next().
 *
 * @class Queue
 * @constructor
 * @param {MIXED} item* 0..n items to seed the queue.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 2584);
function Queue() {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "Queue", 2584);
_yuitest_coverline("/build/yui-base/yui-base.js", 2585);
this._init();
    _yuitest_coverline("/build/yui-base/yui-base.js", 2586);
this.add.apply(this, arguments);
}

_yuitest_coverline("/build/yui-base/yui-base.js", 2589);
Queue.prototype = {
    /**
     * Initialize the queue
     *
     * @method _init
     * @protected
     */
    _init: function() {
        /**
         * The collection of enqueued items
         *
         * @property _q
         * @type Array
         * @protected
         */
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_init", 2596);
_yuitest_coverline("/build/yui-base/yui-base.js", 2604);
this._q = [];
    },

    /**
     * Get the next item in the queue. FIFO support
     *
     * @method next
     * @return {MIXED} the next item in the queue.
     */
    next: function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "next", 2613);
_yuitest_coverline("/build/yui-base/yui-base.js", 2614);
return this._q.shift();
    },

    /**
     * Get the last in the queue. LIFO support.
     *
     * @method last
     * @return {MIXED} the last item in the queue.
     */
    last: function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "last", 2623);
_yuitest_coverline("/build/yui-base/yui-base.js", 2624);
return this._q.pop();
    },

    /**
     * Add 0..n items to the end of the queue.
     *
     * @method add
     * @param {MIXED} item* 0..n items.
     * @return {object} this queue.
     */
    add: function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "add", 2634);
_yuitest_coverline("/build/yui-base/yui-base.js", 2635);
this._q.push.apply(this._q, arguments);

        _yuitest_coverline("/build/yui-base/yui-base.js", 2637);
return this;
    },

    /**
     * Returns the current number of queued items.
     *
     * @method size
     * @return {Number} The size.
     */
    size: function() {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "size", 2646);
_yuitest_coverline("/build/yui-base/yui-base.js", 2647);
return this._q.length;
    }
};

_yuitest_coverline("/build/yui-base/yui-base.js", 2651);
Y.Queue = Queue;

_yuitest_coverline("/build/yui-base/yui-base.js", 2653);
YUI.Env._loaderQueue = YUI.Env._loaderQueue || new Queue();

/**
The YUI module contains the components required for building the YUI seed file.
This includes the script loading mechanism, a simple queue, and the core
utilities for the library.

@module yui
@submodule yui-base
**/

_yuitest_coverline("/build/yui-base/yui-base.js", 2664);
var CACHED_DELIMITER = '__',

    hasOwn   = Object.prototype.hasOwnProperty,
    isObject = Y.Lang.isObject;

/**
Returns a wrapper for a function which caches the return value of that function,
keyed off of the combined string representation of the argument values provided
when the wrapper is called.

Calling this function again with the same arguments will return the cached value
rather than executing the wrapped function.

Note that since the cache is keyed off of the string representation of arguments
passed to the wrapper function, arguments that aren't strings and don't provide
a meaningful `toString()` method may result in unexpected caching behavior. For
example, the objects `{}` and `{foo: 'bar'}` would both be converted to the
string `[object Object]` when used as a cache key.

@method cached
@param {Function} source The function to memoize.
@param {Object} [cache={}] Object in which to store cached values. You may seed
  this object with pre-existing cached values if desired.
@param {any} [refetch] If supplied, this value is compared with the cached value
  using a `==` comparison. If the values are equal, the wrapped function is
  executed again even though a cached value exists.
@return {Function} Wrapped function.
@for YUI
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2693);
Y.cached = function (source, cache, refetch) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "cached", 2693);
_yuitest_coverline("/build/yui-base/yui-base.js", 2694);
cache || (cache = {});

    _yuitest_coverline("/build/yui-base/yui-base.js", 2696);
return function (arg) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 17)", 2696);
_yuitest_coverline("/build/yui-base/yui-base.js", 2697);
var key = arguments.length > 1 ?
                Array.prototype.join.call(arguments, CACHED_DELIMITER) :
                String(arg);

        _yuitest_coverline("/build/yui-base/yui-base.js", 2701);
if (!(key in cache) || (refetch && cache[key] == refetch)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2702);
cache[key] = source.apply(source, arguments);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 2705);
return cache[key];
    };
};

/**
Returns the `location` object from the window/frame in which this YUI instance
operates, or `undefined` when executing in a non-browser environment
(e.g. Node.js).

It is _not_ recommended to hold references to the `window.location` object
outside of the scope of a function in which its properties are being accessed or
its methods are being called. This is because of a nasty bug/issue that exists
in both Safari and MobileSafari browsers:
[WebKit Bug 34679](https://bugs.webkit.org/show_bug.cgi?id=34679).

@method getLocation
@return {location} The `location` object from the window/frame in which this YUI
    instance operates.
@since 3.5.0
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2725);
Y.getLocation = function () {
    // It is safer to look this up every time because yui-base is attached to a
    // YUI instance before a user's config is applied; i.e. `Y.config.win` does
    // not point the correct window object when this file is loaded.
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "getLocation", 2725);
_yuitest_coverline("/build/yui-base/yui-base.js", 2729);
var win = Y.config.win;

    // It is not safe to hold a reference to the `location` object outside the
    // scope in which it is being used. The WebKit engine used in Safari and
    // MobileSafari will "disconnect" the `location` object from the `window`
    // when a page is restored from back/forward history cache.
    _yuitest_coverline("/build/yui-base/yui-base.js", 2735);
return win && win.location;
};

/**
Returns a new object containing all of the properties of all the supplied
objects. The properties from later objects will overwrite those in earlier
objects.

Passing in a single object will create a shallow copy of it. For a deep copy,
use `clone()`.

@method merge
@param {Object} objects* One or more objects to merge.
@return {Object} A new merged object.
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2750);
Y.merge = function () {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "merge", 2750);
_yuitest_coverline("/build/yui-base/yui-base.js", 2751);
var args   = arguments,
        i      = 0,
        len    = args.length,
        result = {};

    _yuitest_coverline("/build/yui-base/yui-base.js", 2756);
for (; i < len; ++i) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2757);
Y.mix(result, args[i], true);
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2760);
return result;
};

/**
Mixes _supplier_'s properties into _receiver_.

Properties on _receiver_ or _receiver_'s prototype will not be overwritten or
shadowed unless the _overwrite_ parameter is `true`, and will not be merged
unless the _merge_ parameter is `true`.

In the default mode (0), only properties the supplier owns are copied (prototype
properties are not copied). The following copying modes are available:

  * `0`: _Default_. Object to object.
  * `1`: Prototype to prototype.
  * `2`: Prototype to prototype and object to object.
  * `3`: Prototype to object.
  * `4`: Object to prototype.

@method mix
@param {Function|Object} receiver The object or function to receive the mixed
  properties.
@param {Function|Object} supplier The object or function supplying the
  properties to be mixed.
@param {Boolean} [overwrite=false] If `true`, properties that already exist
  on the receiver will be overwritten with properties from the supplier.
@param {String[]} [whitelist] An array of property names to copy. If
  specified, only the whitelisted properties will be copied, and all others
  will be ignored.
@param {Number} [mode=0] Mix mode to use. See above for available modes.
@param {Boolean} [merge=false] If `true`, objects and arrays that already
  exist on the receiver will have the corresponding object/array from the
  supplier merged into them, rather than being skipped or overwritten. When
  both _overwrite_ and _merge_ are `true`, _merge_ takes precedence.
@return {Function|Object|YUI} The receiver, or the YUI instance if the
  specified receiver is falsy.
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 2797);
Y.mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "mix", 2797);
_yuitest_coverline("/build/yui-base/yui-base.js", 2798);
var alwaysOverwrite, exists, from, i, key, len, to;

    // If no supplier is given, we return the receiver. If no receiver is given,
    // we return Y. Returning Y doesn't make much sense to me, but it's
    // grandfathered in for backcompat reasons.
    _yuitest_coverline("/build/yui-base/yui-base.js", 2803);
if (!receiver || !supplier) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2804);
return receiver || Y;
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2807);
if (mode) {
        // In mode 2 (prototype to prototype and object to object), we recurse
        // once to do the proto to proto mix. The object to object mix will be
        // handled later on.
        _yuitest_coverline("/build/yui-base/yui-base.js", 2811);
if (mode === 2) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2812);
Y.mix(receiver.prototype, supplier.prototype, overwrite,
                    whitelist, 0, merge);
        }

        // Depending on which mode is specified, we may be copying from or to
        // the prototypes of the supplier and receiver.
        _yuitest_coverline("/build/yui-base/yui-base.js", 2818);
from = mode === 1 || mode === 3 ? supplier.prototype : supplier;
        _yuitest_coverline("/build/yui-base/yui-base.js", 2819);
to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;

        // If either the supplier or receiver doesn't actually have a
        // prototype property, then we could end up with an undefined `from`
        // or `to`. If that happens, we abort and return the receiver.
        _yuitest_coverline("/build/yui-base/yui-base.js", 2824);
if (!from || !to) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2825);
return receiver;
        }
    } else {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2828);
from = supplier;
        _yuitest_coverline("/build/yui-base/yui-base.js", 2829);
to   = receiver;
    }

    // If `overwrite` is truthy and `merge` is falsy, then we can skip a
    // property existence check on each iteration and save some time.
    _yuitest_coverline("/build/yui-base/yui-base.js", 2834);
alwaysOverwrite = overwrite && !merge;

    _yuitest_coverline("/build/yui-base/yui-base.js", 2836);
if (whitelist) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2837);
for (i = 0, len = whitelist.length; i < len; ++i) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2838);
key = whitelist[i];

            // We call `Object.prototype.hasOwnProperty` instead of calling
            // `hasOwnProperty` on the object itself, since the object's
            // `hasOwnProperty` method may have been overridden or removed.
            // Also, some native objects don't implement a `hasOwnProperty`
            // method.
            _yuitest_coverline("/build/yui-base/yui-base.js", 2845);
if (!hasOwn.call(from, key)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 2846);
continue;
            }

            // The `key in to` check here is (sadly) intentional for backwards
            // compatibility reasons. It prevents undesired shadowing of
            // prototype members on `to`.
            _yuitest_coverline("/build/yui-base/yui-base.js", 2852);
exists = alwaysOverwrite ? false : key in to;

            _yuitest_coverline("/build/yui-base/yui-base.js", 2854);
if (merge && exists && isObject(to[key], true)
                    && isObject(from[key], true)) {
                // If we're in merge mode, and the key is present on both
                // objects, and the value on both objects is either an object or
                // an array (but not a function), then we recurse to merge the
                // `from` value into the `to` value instead of overwriting it.
                //
                // Note: It's intentional that the whitelist isn't passed to the
                // recursive call here. This is legacy behavior that lots of
                // code still depends on.
                _yuitest_coverline("/build/yui-base/yui-base.js", 2864);
Y.mix(to[key], from[key], overwrite, null, 0, merge);
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 2865);
if (overwrite || !exists) {
                // We're not in merge mode, so we'll only copy the `from` value
                // to the `to` value if we're in overwrite mode or if the
                // current key doesn't exist on the `to` object.
                _yuitest_coverline("/build/yui-base/yui-base.js", 2869);
to[key] = from[key];
            }}
        }
    } else {
        _yuitest_coverline("/build/yui-base/yui-base.js", 2873);
for (key in from) {
            // The code duplication here is for runtime performance reasons.
            // Combining whitelist and non-whitelist operations into a single
            // loop or breaking the shared logic out into a function both result
            // in worse performance, and Y.mix is critical enough that the byte
            // tradeoff is worth it.
            _yuitest_coverline("/build/yui-base/yui-base.js", 2879);
if (!hasOwn.call(from, key)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 2880);
continue;
            }

            // The `key in to` check here is (sadly) intentional for backwards
            // compatibility reasons. It prevents undesired shadowing of
            // prototype members on `to`.
            _yuitest_coverline("/build/yui-base/yui-base.js", 2886);
exists = alwaysOverwrite ? false : key in to;

            _yuitest_coverline("/build/yui-base/yui-base.js", 2888);
if (merge && exists && isObject(to[key], true)
                    && isObject(from[key], true)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 2890);
Y.mix(to[key], from[key], overwrite, null, 0, merge);
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 2891);
if (overwrite || !exists) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 2892);
to[key] = from[key];
            }}
        }

        // If this is an IE browser with the JScript enumeration bug, force
        // enumeration of the buggy properties by making a recursive call with
        // the buggy properties as the whitelist.
        _yuitest_coverline("/build/yui-base/yui-base.js", 2899);
if (Y.Object._hasEnumBug) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 2900);
Y.mix(to, from, overwrite, Y.Object._forceEnum, mode, merge);
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 2904);
return receiver;
};
/**
 * The YUI module contains the components required for building the YUI
 * seed file.  This includes the script loading mechanism, a simple queue,
 * and the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

/**
 * Adds utilities to the YUI instance for working with objects.
 *
 * @class Object
 */

_yuitest_coverline("/build/yui-base/yui-base.js", 2920);
var Lang   = Y.Lang,
    hasOwn = Object.prototype.hasOwnProperty,

    UNDEFINED, // <-- Note the comma. We're still declaring vars.

/**
 * Returns a new object that uses _obj_ as its prototype. This method wraps the
 * native ES5 `Object.create()` method if available, but doesn't currently
 * pass through `Object.create()`'s second argument (properties) in order to
 * ensure compatibility with older browsers.
 *
 * @method ()
 * @param {Object} obj Prototype object.
 * @return {Object} New object using _obj_ as its prototype.
 * @static
 */
O = Y.Object = Lang._isNative(Object.create) ? function (obj) {
    // We currently wrap the native Object.create instead of simply aliasing it
    // to ensure consistency with our fallback shim, which currently doesn't
    // support Object.create()'s second argument (properties). Once we have a
    // safe fallback for the properties arg, we can stop wrapping
    // Object.create().
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 18)", 2936);
_yuitest_coverline("/build/yui-base/yui-base.js", 2942);
return Object.create(obj);
} : (function () {
    // Reusable constructor function for the Object.create() shim.
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 19)", 2943);
_yuitest_coverline("/build/yui-base/yui-base.js", 2945);
function F() {}

    // The actual shim.
    _yuitest_coverline("/build/yui-base/yui-base.js", 2948);
return function (obj) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 20)", 2948);
_yuitest_coverline("/build/yui-base/yui-base.js", 2949);
F.prototype = obj;
        _yuitest_coverline("/build/yui-base/yui-base.js", 2950);
return new F();
    };
}()),

/**
 * Property names that IE doesn't enumerate in for..in loops, even when they
 * should be enumerable. When `_hasEnumBug` is `true`, it's necessary to
 * manually enumerate these properties.
 *
 * @property _forceEnum
 * @type String[]
 * @protected
 * @static
 */
forceEnum = O._forceEnum = [
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'toLocaleString',
    'valueOf'
],

/**
 * `true` if this browser has the JScript enumeration bug that prevents
 * enumeration of the properties named in the `_forceEnum` array, `false`
 * otherwise.
 *
 * See:
 *   - <https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug>
 *   - <http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation>
 *
 * @property _hasEnumBug
 * @type Boolean
 * @protected
 * @static
 */
hasEnumBug = O._hasEnumBug = !{valueOf: 0}.propertyIsEnumerable('valueOf'),

/**
 * `true` if this browser incorrectly considers the `prototype` property of
 * functions to be enumerable. Currently known to affect Opera 11.50.
 *
 * @property _hasProtoEnumBug
 * @type Boolean
 * @protected
 * @static
 */
hasProtoEnumBug = O._hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype'),

/**
 * Returns `true` if _key_ exists on _obj_, `false` if _key_ doesn't exist or
 * exists only on _obj_'s prototype. This is essentially a safer version of
 * `obj.hasOwnProperty()`.
 *
 * @method owns
 * @param {Object} obj Object to test.
 * @param {String} key Property name to look for.
 * @return {Boolean} `true` if _key_ exists on _obj_, `false` otherwise.
 * @static
 */
owns = O.owns = function (obj, key) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "owns", 3011);
_yuitest_coverline("/build/yui-base/yui-base.js", 3012);
return !!obj && hasOwn.call(obj, key);
}; // <-- End of var declarations.

/**
 * Alias for `owns()`.
 *
 * @method hasKey
 * @param {Object} obj Object to test.
 * @param {String} key Property name to look for.
 * @return {Boolean} `true` if _key_ exists on _obj_, `false` otherwise.
 * @static
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3024);
O.hasKey = owns;

/**
 * Returns an array containing the object's enumerable keys. Does not include
 * prototype keys or non-enumerable keys.
 *
 * Note that keys are returned in enumeration order (that is, in the same order
 * that they would be enumerated by a `for-in` loop), which may not be the same
 * as the order in which they were defined.
 *
 * This method is an alias for the native ES5 `Object.keys()` method if
 * available.
 *
 * @example
 *
 *     Y.Object.keys({a: 'foo', b: 'bar', c: 'baz'});
 *     // => ['a', 'b', 'c']
 *
 * @method keys
 * @param {Object} obj An object.
 * @return {String[]} Array of keys.
 * @static
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3047);
O.keys = Lang._isNative(Object.keys) ? Object.keys : function (obj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "keys", 3047);
_yuitest_coverline("/build/yui-base/yui-base.js", 3048);
if (!Lang.isObject(obj)) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3049);
throw new TypeError('Object.keys called on a non-object');
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3052);
var keys = [],
        i, key, len;

    _yuitest_coverline("/build/yui-base/yui-base.js", 3055);
if (hasProtoEnumBug && typeof obj === 'function') {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3056);
for (key in obj) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3057);
if (owns(obj, key) && key !== 'prototype') {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3058);
keys.push(key);
            }
        }
    } else {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3062);
for (key in obj) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3063);
if (owns(obj, key)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3064);
keys.push(key);
            }
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3069);
if (hasEnumBug) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3070);
for (i = 0, len = forceEnum.length; i < len; ++i) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3071);
key = forceEnum[i];

            _yuitest_coverline("/build/yui-base/yui-base.js", 3073);
if (owns(obj, key)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3074);
keys.push(key);
            }
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3079);
return keys;
};

/**
 * Returns an array containing the values of the object's enumerable keys.
 *
 * Note that values are returned in enumeration order (that is, in the same
 * order that they would be enumerated by a `for-in` loop), which may not be the
 * same as the order in which they were defined.
 *
 * @example
 *
 *     Y.Object.values({a: 'foo', b: 'bar', c: 'baz'});
 *     // => ['foo', 'bar', 'baz']
 *
 * @method values
 * @param {Object} obj An object.
 * @return {Array} Array of values.
 * @static
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3099);
O.values = function (obj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "values", 3099);
_yuitest_coverline("/build/yui-base/yui-base.js", 3100);
var keys   = O.keys(obj),
        i      = 0,
        len    = keys.length,
        values = [];

    _yuitest_coverline("/build/yui-base/yui-base.js", 3105);
for (; i < len; ++i) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3106);
values.push(obj[keys[i]]);
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3109);
return values;
};

/**
 * Returns the number of enumerable keys owned by an object.
 *
 * @method size
 * @param {Object} obj An object.
 * @return {Number} The object's size.
 * @static
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3120);
O.size = function (obj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "size", 3120);
_yuitest_coverline("/build/yui-base/yui-base.js", 3121);
try {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3122);
return O.keys(obj).length;
    } catch (ex) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3124);
return 0; // Legacy behavior for non-objects.
    }
};

/**
 * Returns `true` if the object owns an enumerable property with the specified
 * value.
 *
 * @method hasValue
 * @param {Object} obj An object.
 * @param {any} value The value to search for.
 * @return {Boolean} `true` if _obj_ contains _value_, `false` otherwise.
 * @static
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3138);
O.hasValue = function (obj, value) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "hasValue", 3138);
_yuitest_coverline("/build/yui-base/yui-base.js", 3139);
return Y.Array.indexOf(O.values(obj), value) > -1;
};

/**
 * Executes a function on each enumerable property in _obj_. The function
 * receives the value, the key, and the object itself as parameters (in that
 * order).
 *
 * By default, only properties owned by _obj_ are enumerated. To include
 * prototype properties, set the _proto_ parameter to `true`.
 *
 * @method each
 * @param {Object} obj Object to enumerate.
 * @param {Function} fn Function to execute on each enumerable property.
 *   @param {mixed} fn.value Value of the current property.
 *   @param {String} fn.key Key of the current property.
 *   @param {Object} fn.obj Object being enumerated.
 * @param {Object} [thisObj] `this` object to use when calling _fn_.
 * @param {Boolean} [proto=false] Include prototype properties.
 * @return {YUI} the YUI instance.
 * @chainable
 * @static
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3162);
O.each = function (obj, fn, thisObj, proto) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "each", 3162);
_yuitest_coverline("/build/yui-base/yui-base.js", 3163);
var key;

    _yuitest_coverline("/build/yui-base/yui-base.js", 3165);
for (key in obj) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3166);
if (proto || owns(obj, key)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3167);
fn.call(thisObj || Y, obj[key], key, obj);
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3171);
return Y;
};

/**
 * Executes a function on each enumerable property in _obj_, but halts if the
 * function returns a truthy value. The function receives the value, the key,
 * and the object itself as paramters (in that order).
 *
 * By default, only properties owned by _obj_ are enumerated. To include
 * prototype properties, set the _proto_ parameter to `true`.
 *
 * @method some
 * @param {Object} obj Object to enumerate.
 * @param {Function} fn Function to execute on each enumerable property.
 *   @param {mixed} fn.value Value of the current property.
 *   @param {String} fn.key Key of the current property.
 *   @param {Object} fn.obj Object being enumerated.
 * @param {Object} [thisObj] `this` object to use when calling _fn_.
 * @param {Boolean} [proto=false] Include prototype properties.
 * @return {Boolean} `true` if any execution of _fn_ returns a truthy value,
 *   `false` otherwise.
 * @static
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3194);
O.some = function (obj, fn, thisObj, proto) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "some", 3194);
_yuitest_coverline("/build/yui-base/yui-base.js", 3195);
var key;

    _yuitest_coverline("/build/yui-base/yui-base.js", 3197);
for (key in obj) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3198);
if (proto || owns(obj, key)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3199);
if (fn.call(thisObj || Y, obj[key], key, obj)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3200);
return true;
            }
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3205);
return false;
};

/**
 * Retrieves the sub value at the provided path,
 * from the value object provided.
 *
 * @method getValue
 * @static
 * @param o The object from which to extract the property value.
 * @param path {Array} A path array, specifying the object traversal path
 * from which to obtain the sub value.
 * @return {Any} The value stored in the path, undefined if not found,
 * undefined if the source is not an object.  Returns the source object
 * if an empty path is provided.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3221);
O.getValue = function(o, path) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "getValue", 3221);
_yuitest_coverline("/build/yui-base/yui-base.js", 3222);
if (!Lang.isObject(o)) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3223);
return UNDEFINED;
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3226);
var i,
        p = Y.Array(path),
        l = p.length;

    _yuitest_coverline("/build/yui-base/yui-base.js", 3230);
for (i = 0; o !== UNDEFINED && i < l; i++) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3231);
o = o[p[i]];
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3234);
return o;
};

/**
 * Sets the sub-attribute value at the provided path on the
 * value object.  Returns the modified value object, or
 * undefined if the path is invalid.
 *
 * @method setValue
 * @static
 * @param o             The object on which to set the sub value.
 * @param path {Array}  A path array, specifying the object traversal path
 *                      at which to set the sub value.
 * @param val {Any}     The new value for the sub-attribute.
 * @return {Object}     The modified object, with the new sub value set, or
 *                      undefined, if the path was invalid.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3251);
O.setValue = function(o, path, val) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "setValue", 3251);
_yuitest_coverline("/build/yui-base/yui-base.js", 3252);
var i,
        p = Y.Array(path),
        leafIdx = p.length - 1,
        ref = o;

    _yuitest_coverline("/build/yui-base/yui-base.js", 3257);
if (leafIdx >= 0) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3258);
for (i = 0; ref !== UNDEFINED && i < leafIdx; i++) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3259);
ref = ref[p[i]];
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 3262);
if (ref !== UNDEFINED) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3263);
ref[p[i]] = val;
        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3265);
return UNDEFINED;
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3269);
return o;
};

/**
 * Returns `true` if the object has no enumerable properties of its own.
 *
 * @method isEmpty
 * @param {Object} obj An object.
 * @return {Boolean} `true` if the object is empty.
 * @static
 * @since 3.2.0
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 3281);
O.isEmpty = function (obj) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "isEmpty", 3281);
_yuitest_coverline("/build/yui-base/yui-base.js", 3282);
return !O.keys(Object(obj)).length;
};
/**
 * The YUI module contains the components required for building the YUI seed
 * file.  This includes the script loading mechanism, a simple queue, and the
 * core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

/**
 * YUI user agent detection.
 * Do not fork for a browser if it can be avoided.  Use feature detection when
 * you can.  Use the user agent as a last resort.  For all fields listed
 * as @type float, UA stores a version number for the browser engine,
 * 0 otherwise.  This value may or may not map to the version number of
 * the browser using the engine.  The value is presented as a float so
 * that it can easily be used for boolean evaluation as well as for
 * looking for a particular range of versions.  Because of this,
 * some of the granularity of the version info may be lost.  The fields that
 * are @type string default to null.  The API docs list the values that
 * these fields can have.
 * @class UA
 * @static
 */

/**
* Static method on `YUI.Env` for parsing a UA string.  Called at instantiation
* to populate `Y.UA`.
*
* @static
* @method parseUA
* @param {String} [subUA=navigator.userAgent] UA string to parse
* @return {Object} The Y.UA object
*/
_yuitest_coverline("/build/yui-base/yui-base.js", 3317);
YUI.Env.parseUA = function(subUA) {

    _yuitest_coverfunc("/build/yui-base/yui-base.js", "parseUA", 3317);
_yuitest_coverline("/build/yui-base/yui-base.js", 3319);
var numberify = function(s) {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "numberify", 3319);
_yuitest_coverline("/build/yui-base/yui-base.js", 3320);
var c = 0;
            _yuitest_coverline("/build/yui-base/yui-base.js", 3321);
return parseFloat(s.replace(/\./g, function() {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 22)", 3321);
_yuitest_coverline("/build/yui-base/yui-base.js", 3322);
return (c++ == 1) ? '' : '.';
            }));
        },

        win = Y.config.win,

        nav = win && win.navigator,

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
         * Firefox 1.5.0.9: 1.8.0.9 <-- 1.8
         * Firefox 2.0.0.3: 1.8.1.3 <-- 1.81
         * Firefox 3.0   <-- 1.9
         * Firefox 3.5   <-- 1.91
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
         * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native
         * SVG and many major issues fixed).
         * Safari 3.0.4 (523.12) 523.12  <-- First Tiger release - automatic
         * update from 2.x via the 10.4.11 OS patch.
         * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.
         *                                   yahoo.com user agent hack removed.
         * </pre>
         * http://en.wikipedia.org/wiki/Safari_version_history
         * @property webkit
         * @type float
         * @static
         */
        webkit: 0,

        /**
         * Safari will be detected as webkit, but this property will also
         * be populated with the Safari version number
         * @property safari
         * @type float
         * @static
         */
        safari: 0,

        /**
         * Chrome will be detected as webkit, but this property will also
         * be populated with the Chrome version number
         * @property chrome
         * @type float
         * @static
         */
        chrome: 0,

        /**
         * The mobile property will be set to a string containing any relevant
         * user agent information when a modern mobile browser is detected.
         * Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series
         * devices with the WebKit-based browser, and Opera Mini.
         * @property mobile
         * @type string
         * @default null
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
         * PhantomJS version number or 0.  Only populated if webkit is detected.
         * Example: 1.0
         * @property phantomjs
         * @type float
         */
        phantomjs: 0,
        /**
         * Adobe AIR version number or 0.  Only populated if webkit is detected.
         * Example: 1.0
         * @property air
         * @type float
         */
        air: 0,
        /**
         * Detects Apple iPad's OS version
         * @property ipad
         * @type float
         * @static
         */
        ipad: 0,
        /**
         * Detects Apple iPhone's OS version
         * @property iphone
         * @type float
         * @static
         */
        iphone: 0,
        /**
         * Detects Apples iPod's OS version
         * @property ipod
         * @type float
         * @static
         */
        ipod: 0,
        /**
         * General truthy check for iPad, iPhone or iPod
         * @property ios
         * @type Boolean
         * @default null
         * @static
         */
        ios: null,
        /**
         * Detects Googles Android OS version
         * @property android
         * @type float
         * @static
         */
        android: 0,
        /**
         * Detects Kindle Silk
         * @property silk
         * @type float
         * @static
         */
        silk: 0,
        /**
         * Detects Kindle Silk Acceleration
         * @property accel
         * @type Boolean
         * @static
         */
        accel: false,
        /**
         * Detects Palms WebOS version
         * @property webos
         * @type float
         * @static
         */
        webos: 0,

        /**
         * Google Caja version number or 0.
         * @property caja
         * @type float
         */
        caja: nav && nav.cajaVersion,

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
         * @default null
         * @static
         */
        os: null,

        /**
         * The Nodejs Version
         * @property nodejs
         * @type float
         * @default 0
         * @static
         */
        nodejs: 0
    },

    ua = subUA || nav && nav.userAgent,

    loc = win && win.location,

    href = loc && loc.href,

    m;

    /**
    * The User Agent string that was parsed
    * @property userAgent
    * @type String
    * @static
    */
    _yuitest_coverline("/build/yui-base/yui-base.js", 3549);
o.userAgent = ua;


    _yuitest_coverline("/build/yui-base/yui-base.js", 3552);
o.secure = href && (href.toLowerCase().indexOf('https') === 0);

    _yuitest_coverline("/build/yui-base/yui-base.js", 3554);
if (ua) {

        _yuitest_coverline("/build/yui-base/yui-base.js", 3556);
if ((/windows|win32/i).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3557);
o.os = 'windows';
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 3558);
if ((/macintosh|mac_powerpc/i).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3559);
o.os = 'macintosh';
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 3560);
if ((/android/i).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3561);
o.os = 'android';
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 3562);
if ((/symbos/i).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3563);
o.os = 'symbos';
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 3564);
if ((/linux/i).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3565);
o.os = 'linux';
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 3566);
if ((/rhino/i).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3567);
o.os = 'rhino';
        }}}}}}

        // Modern KHTML browsers should qualify as Safari X-Grade
        _yuitest_coverline("/build/yui-base/yui-base.js", 3571);
if ((/KHTML/).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3572);
o.webkit = 1;
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 3574);
if ((/IEMobile|XBLWP7/).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3575);
o.mobile = 'windows';
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 3577);
if ((/Fennec/).test(ua)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3578);
o.mobile = 'gecko';
        }
        // Modern WebKit browsers are at least X-Grade
        _yuitest_coverline("/build/yui-base/yui-base.js", 3581);
m = ua.match(/AppleWebKit\/([^\s]*)/);
        _yuitest_coverline("/build/yui-base/yui-base.js", 3582);
if (m && m[1]) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3583);
o.webkit = numberify(m[1]);
            _yuitest_coverline("/build/yui-base/yui-base.js", 3584);
o.safari = o.webkit;
            
            _yuitest_coverline("/build/yui-base/yui-base.js", 3586);
if (/PhantomJS/.test(ua)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3587);
m = ua.match(/PhantomJS\/([^\s]*)/);
                _yuitest_coverline("/build/yui-base/yui-base.js", 3588);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3589);
o.phantomjs = numberify(m[1]);
                }
            }

            // Mobile browser check
            _yuitest_coverline("/build/yui-base/yui-base.js", 3594);
if (/ Mobile\//.test(ua) || (/iPad|iPod|iPhone/).test(ua)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3595);
o.mobile = 'Apple'; // iPhone or iPod Touch

                _yuitest_coverline("/build/yui-base/yui-base.js", 3597);
m = ua.match(/OS ([^\s]*)/);
                _yuitest_coverline("/build/yui-base/yui-base.js", 3598);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3599);
m = numberify(m[1].replace('_', '.'));
                }
                _yuitest_coverline("/build/yui-base/yui-base.js", 3601);
o.ios = m;
                _yuitest_coverline("/build/yui-base/yui-base.js", 3602);
o.os = 'ios';
                _yuitest_coverline("/build/yui-base/yui-base.js", 3603);
o.ipad = o.ipod = o.iphone = 0;

                _yuitest_coverline("/build/yui-base/yui-base.js", 3605);
m = ua.match(/iPad|iPod|iPhone/);
                _yuitest_coverline("/build/yui-base/yui-base.js", 3606);
if (m && m[0]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3607);
o[m[0].toLowerCase()] = o.ios;
                }
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3610);
m = ua.match(/NokiaN[^\/]*|webOS\/\d\.\d/);
                _yuitest_coverline("/build/yui-base/yui-base.js", 3611);
if (m) {
                    // Nokia N-series, webOS, ex: NokiaN95
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3613);
o.mobile = m[0];
                }
                _yuitest_coverline("/build/yui-base/yui-base.js", 3615);
if (/webOS/.test(ua)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3616);
o.mobile = 'WebOS';
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3617);
m = ua.match(/webOS\/([^\s]*);/);
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3618);
if (m && m[1]) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3619);
o.webos = numberify(m[1]);
                    }
                }
                _yuitest_coverline("/build/yui-base/yui-base.js", 3622);
if (/ Android/.test(ua)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3623);
if (/Mobile/.test(ua)) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3624);
o.mobile = 'Android';
                    }
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3626);
m = ua.match(/Android ([^\s]*);/);
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3627);
if (m && m[1]) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3628);
o.android = numberify(m[1]);
                    }

                }
                _yuitest_coverline("/build/yui-base/yui-base.js", 3632);
if (/Silk/.test(ua)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3633);
m = ua.match(/Silk\/([^\s]*)\)/);
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3634);
if (m && m[1]) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3635);
o.silk = numberify(m[1]);
                    }
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3637);
if (!o.android) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3638);
o.android = 2.34; //Hack for desktop mode in Kindle
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3639);
o.os = 'Android';
                    }
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3641);
if (/Accelerated=true/.test(ua)) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3642);
o.accel = true;
                    }
                }
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 3647);
m = ua.match(/(Chrome|CrMo|CriOS)\/([^\s]*)/);
            _yuitest_coverline("/build/yui-base/yui-base.js", 3648);
if (m && m[1] && m[2]) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3649);
o.chrome = numberify(m[2]); // Chrome
                _yuitest_coverline("/build/yui-base/yui-base.js", 3650);
o.safari = 0; //Reset safari back to 0
                _yuitest_coverline("/build/yui-base/yui-base.js", 3651);
if (m[1] === 'CrMo') {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3652);
o.mobile = 'chrome';
                }
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3655);
m = ua.match(/AdobeAIR\/([^\s]*)/);
                _yuitest_coverline("/build/yui-base/yui-base.js", 3656);
if (m) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3657);
o.air = m[0]; // Adobe AIR 1.0 or better
                }
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 3662);
if (!o.webkit) { // not webkit
// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
            _yuitest_coverline("/build/yui-base/yui-base.js", 3664);
if (/Opera/.test(ua)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 3665);
m = ua.match(/Opera[\s\/]([^\s]*)/);
                _yuitest_coverline("/build/yui-base/yui-base.js", 3666);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3667);
o.opera = numberify(m[1]);
                }
                _yuitest_coverline("/build/yui-base/yui-base.js", 3669);
m = ua.match(/Version\/([^\s]*)/);
                _yuitest_coverline("/build/yui-base/yui-base.js", 3670);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3671);
o.opera = numberify(m[1]); // opera 10+
                }

                _yuitest_coverline("/build/yui-base/yui-base.js", 3674);
if (/Opera Mobi/.test(ua)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3675);
o.mobile = 'opera';
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3676);
m = ua.replace('Opera Mobi', '').match(/Opera ([^\s]*)/);
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3677);
if (m && m[1]) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3678);
o.opera = numberify(m[1]);
                    }
                }
                _yuitest_coverline("/build/yui-base/yui-base.js", 3681);
m = ua.match(/Opera Mini[^;]*/);

                _yuitest_coverline("/build/yui-base/yui-base.js", 3683);
if (m) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3684);
o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                _yuitest_coverline("/build/yui-base/yui-base.js", 3687);
m = ua.match(/MSIE\s([^;]*)/);
                _yuitest_coverline("/build/yui-base/yui-base.js", 3688);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3689);
o.ie = numberify(m[1]);
                } else { // not opera, webkit, or ie
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3691);
m = ua.match(/Gecko\/([^\s]*)/);
                    _yuitest_coverline("/build/yui-base/yui-base.js", 3692);
if (m) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3693);
o.gecko = 1; // Gecko detected, look for revision
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3694);
m = ua.match(/rv:([^\s\)]*)/);
                        _yuitest_coverline("/build/yui-base/yui-base.js", 3695);
if (m && m[1]) {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 3696);
o.gecko = numberify(m[1]);
                        }
                    }
                }
            }
        }
    }

    //It was a parsed UA, do not assign the global value.
    _yuitest_coverline("/build/yui-base/yui-base.js", 3705);
if (!subUA) {

        _yuitest_coverline("/build/yui-base/yui-base.js", 3707);
if (typeof process == 'object') {

            _yuitest_coverline("/build/yui-base/yui-base.js", 3709);
if (process.versions && process.versions.node) {
                //NodeJS
                _yuitest_coverline("/build/yui-base/yui-base.js", 3711);
o.os = process.platform;
                _yuitest_coverline("/build/yui-base/yui-base.js", 3712);
o.nodejs = numberify(process.versions.node);
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 3716);
YUI.Env.UA = o;

    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3720);
return o;
};


_yuitest_coverline("/build/yui-base/yui-base.js", 3724);
Y.UA = YUI.Env.UA || YUI.Env.parseUA();

/**
Performs a simple comparison between two version numbers, accounting for
standard versioning logic such as the fact that "535.8" is a lower version than
"535.24", even though a simple numerical comparison would indicate that it's
greater. Also accounts for cases such as "1.1" vs. "1.1.0", which are
considered equivalent.

Returns -1 if version _a_ is lower than version _b_, 0 if they're equivalent,
1 if _a_ is higher than _b_.

Versions may be numbers or strings containing numbers and dots. For example,
both `535` and `"535.8.10"` are acceptable. A version string containing
non-numeric characters, like `"535.8.beta"`, may produce unexpected results.

@method compareVersions
@param {Number|String} a First version number to compare.
@param {Number|String} b Second version number to compare.
@return -1 if _a_ is lower than _b_, 0 if they're equivalent, 1 if _a_ is
    higher than _b_.
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 3746);
Y.UA.compareVersions = function (a, b) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "compareVersions", 3746);
_yuitest_coverline("/build/yui-base/yui-base.js", 3747);
var aPart, aParts, bPart, bParts, i, len;

    _yuitest_coverline("/build/yui-base/yui-base.js", 3749);
if (a === b) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3750);
return 0;
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3753);
aParts = (a + '').split('.');
    _yuitest_coverline("/build/yui-base/yui-base.js", 3754);
bParts = (b + '').split('.');

    _yuitest_coverline("/build/yui-base/yui-base.js", 3756);
for (i = 0, len = Math.max(aParts.length, bParts.length); i < len; ++i) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 3757);
aPart = parseInt(aParts[i], 10);
        _yuitest_coverline("/build/yui-base/yui-base.js", 3758);
bPart = parseInt(bParts[i], 10);

        _yuitest_coverline("/build/yui-base/yui-base.js", 3760);
isNaN(aPart) && (aPart = 0);
        _yuitest_coverline("/build/yui-base/yui-base.js", 3761);
isNaN(bPart) && (bPart = 0);

        _yuitest_coverline("/build/yui-base/yui-base.js", 3763);
if (aPart < bPart) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3764);
return -1;
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 3767);
if (aPart > bPart) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 3768);
return 1;
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 3772);
return 0;
};
_yuitest_coverline("/build/yui-base/yui-base.js", 3774);
YUI.Env.aliases = {
    "anim": ["anim-base","anim-color","anim-curve","anim-easing","anim-node-plugin","anim-scroll","anim-xy"],
    "app": ["app-base","app-content","app-transitions","lazy-model-list","model","model-list","model-sync-rest","router","view","view-node-map"],
    "attribute": ["attribute-base","attribute-complex"],
    "autocomplete": ["autocomplete-base","autocomplete-sources","autocomplete-list","autocomplete-plugin"],
    "base": ["base-base","base-pluginhost","base-build"],
    "cache": ["cache-base","cache-offline","cache-plugin"],
    "collection": ["array-extras","arraylist","arraylist-add","arraylist-filter","array-invoke"],
    "controller": ["router"],
    "dataschema": ["dataschema-base","dataschema-json","dataschema-xml","dataschema-array","dataschema-text"],
    "datasource": ["datasource-local","datasource-io","datasource-get","datasource-function","datasource-cache","datasource-jsonschema","datasource-xmlschema","datasource-arrayschema","datasource-textschema","datasource-polling"],
    "datatable": ["datatable-core","datatable-table","datatable-head","datatable-body","datatable-base","datatable-column-widths","datatable-message","datatable-mutable","datatable-sort","datatable-datasource"],
    "datatable-deprecated": ["datatable-base-deprecated","datatable-datasource-deprecated","datatable-sort-deprecated","datatable-scroll-deprecated"],
    "datatype": ["datatype-number","datatype-date","datatype-xml"],
    "datatype-date": ["datatype-date-parse","datatype-date-format"],
    "datatype-number": ["datatype-number-parse","datatype-number-format"],
    "datatype-xml": ["datatype-xml-parse","datatype-xml-format"],
    "dd": ["dd-ddm-base","dd-ddm","dd-ddm-drop","dd-drag","dd-proxy","dd-constrain","dd-drop","dd-scroll","dd-delegate"],
    "dom": ["dom-base","dom-screen","dom-style","selector-native","selector"],
    "editor": ["frame","editor-selection","exec-command","editor-base","editor-para","editor-br","editor-bidi","editor-tab","createlink-base"],
    "event": ["event-base","event-delegate","event-synthetic","event-mousewheel","event-mouseenter","event-key","event-focus","event-resize","event-hover","event-outside","event-touch","event-move","event-flick","event-valuechange"],
    "event-custom": ["event-custom-base","event-custom-complex"],
    "event-gestures": ["event-flick","event-move"],
    "handlebars": ["handlebars-compiler"],
    "highlight": ["highlight-base","highlight-accentfold"],
    "history": ["history-base","history-hash","history-hash-ie","history-html5"],
    "io": ["io-base","io-xdr","io-form","io-upload-iframe","io-queue"],
    "json": ["json-parse","json-stringify"],
    "loader": ["loader-base","loader-rollup","loader-yui3"],
    "node": ["node-base","node-event-delegate","node-pluginhost","node-screen","node-style"],
    "pluginhost": ["pluginhost-base","pluginhost-config"],
    "querystring": ["querystring-parse","querystring-stringify"],
    "recordset": ["recordset-base","recordset-sort","recordset-filter","recordset-indexer"],
    "resize": ["resize-base","resize-proxy","resize-constrain"],
    "slider": ["slider-base","slider-value-range","clickable-rail","range-slider"],
    "text": ["text-accentfold","text-wordbreak"],
    "widget": ["widget-base","widget-htmlparser","widget-skin","widget-uievents"]
};


}, '@VERSION@' );
_yuitest_coverline("/build/yui-base/yui-base.js", 3815);
YUI.add('get', function(Y) {

/*jslint boss:true, expr:true, laxbreak: true */

/**
Provides dynamic loading of remote JavaScript and CSS resources.

@module get
@class Get
@static
**/

_yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 23)", 3815);
_yuitest_coverline("/build/yui-base/yui-base.js", 3827);
var Lang = Y.Lang,

    CUSTOM_ATTRS, // defined lazily in Y.Get.Transaction._createNode()

    Get, Transaction;

_yuitest_coverline("/build/yui-base/yui-base.js", 3833);
Y.Get = Get = {
    // -- Public Properties ----------------------------------------------------

    /**
    Default options for CSS requests. Options specified here will override
    global defaults for CSS requests.

    See the `options` property for all available options.

    @property cssOptions
    @type Object
    @static
    @since 3.5.0
    **/
    cssOptions: {
        attributes: {
            rel: 'stylesheet'
        },

        doc         : Y.config.linkDoc || Y.config.doc,
        pollInterval: 50
    },

    /**
    Default options for JS requests. Options specified here will override global
    defaults for JS requests.

    See the `options` property for all available options.

    @property jsOptions
    @type Object
    @static
    @since 3.5.0
    **/
    jsOptions: {
        autopurge: true,
        doc      : Y.config.scriptDoc || Y.config.doc
    },

    /**
    Default options to use for all requests.

    Note that while all available options are documented here for ease of
    discovery, some options (like callback functions) only make sense at the
    transaction level.

    Callback functions specified via the options object or the `options`
    parameter of the `css()`, `js()`, or `load()` methods will receive the
    transaction object as a parameter. See `Y.Get.Transaction` for details on
    the properties and methods available on transactions.

    @static
    @since 3.5.0
    @property {Object} options

    @property {Boolean} [options.async=false] Whether or not to load scripts
        asynchronously, meaning they're requested in parallel and execution
        order is not guaranteed. Has no effect on CSS, since CSS is always
        loaded asynchronously.

    @property {Object} [options.attributes] HTML attribute name/value pairs that
        should be added to inserted nodes. By default, the `charset` attribute
        will be set to "utf-8" and nodes will be given an auto-generated `id`
        attribute, but you can override these with your own values if desired.

    @property {Boolean} [options.autopurge] Whether or not to automatically
        purge inserted nodes after the purge threshold is reached. This is
        `true` by default for JavaScript, but `false` for CSS since purging a
        CSS node will also remove any styling applied by the referenced file.

    @property {Object} [options.context] `this` object to use when calling
        callback functions. Defaults to the transaction object.

    @property {Mixed} [options.data] Arbitrary data object to pass to "on*"
        callbacks.

    @property {Document} [options.doc] Document into which nodes should be
        inserted. By default, the current document is used.

    @property {HTMLElement|String} [options.insertBefore] HTML element or id
        string of an element before which all generated nodes should be
        inserted. If not specified, Get will automatically determine the best
        place to insert nodes for maximum compatibility.

    @property {Function} [options.onEnd] Callback to execute after a transaction
        is complete, regardless of whether it succeeded or failed.

    @property {Function} [options.onFailure] Callback to execute after a
        transaction fails, times out, or is aborted.

    @property {Function} [options.onProgress] Callback to execute after each
        individual request in a transaction either succeeds or fails.

    @property {Function} [options.onSuccess] Callback to execute after a
        transaction completes successfully with no errors. Note that in browsers
        that don't support the `error` event on CSS `<link>` nodes, a failed CSS
        request may still be reported as a success because in these browsers
        it can be difficult or impossible to distinguish between success and
        failure for CSS resources.

    @property {Function} [options.onTimeout] Callback to execute after a
        transaction times out.

    @property {Number} [options.pollInterval=50] Polling interval (in
        milliseconds) for detecting CSS load completion in browsers that don't
        support the `load` event on `<link>` nodes. This isn't used for
        JavaScript.

    @property {Number} [options.purgethreshold=20] Number of nodes to insert
        before triggering an automatic purge when `autopurge` is `true`.

    @property {Number} [options.timeout] Number of milliseconds to wait before
        aborting a transaction. When a timeout occurs, the `onTimeout` callback
        is called, followed by `onFailure` and finally `onEnd`. By default,
        there is no timeout.

    @property {String} [options.type] Resource type ("css" or "js"). This option
        is set automatically by the `css()` and `js()` functions and will be
        ignored there, but may be useful when using the `load()` function. If
        not specified, the type will be inferred from the URL, defaulting to
        "js" if the URL doesn't contain a recognizable file extension.
    **/
    options: {
        attributes: {
            charset: 'utf-8'
        },

        purgethreshold: 20
    },

    // -- Protected Properties -------------------------------------------------

    /**
    Regex that matches a CSS URL. Used to guess the file type when it's not
    specified.

    @property REGEX_CSS
    @type RegExp
    @final
    @protected
    @static
    @since 3.5.0
    **/
    REGEX_CSS: /\.css(?:[?;].*)?$/i,

    /**
    Regex that matches a JS URL. Used to guess the file type when it's not
    specified.

    @property REGEX_JS
    @type RegExp
    @final
    @protected
    @static
    @since 3.5.0
    **/
    REGEX_JS : /\.js(?:[?;].*)?$/i,

    /**
    Contains information about the current environment, such as what script and
    link injection features it supports.

    This object is created and populated the first time the `_getEnv()` method
    is called.

    @property _env
    @type Object
    @protected
    @static
    @since 3.5.0
    **/

    /**
    Mapping of document _yuid strings to <head> or <base> node references so we
    don't have to look the node up each time we want to insert a request node.

    @property _insertCache
    @type Object
    @protected
    @static
    @since 3.5.0
    **/
    _insertCache: {},

    /**
    Information about the currently pending transaction, if any.

    This is actually an object with two properties: `callback`, containing the
    optional callback passed to `css()`, `load()`, or `js()`; and `transaction`,
    containing the actual transaction instance.

    @property _pending
    @type Object
    @protected
    @static
    @since 3.5.0
    **/
    _pending: null,

    /**
    HTML nodes eligible to be purged next time autopurge is triggered.

    @property _purgeNodes
    @type HTMLElement[]
    @protected
    @static
    @since 3.5.0
    **/
    _purgeNodes: [],

    /**
    Queued transactions and associated callbacks.

    @property _queue
    @type Object[]
    @protected
    @static
    @since 3.5.0
    **/
    _queue: [],

    // -- Public Methods -------------------------------------------------------

    /**
    Aborts the specified transaction.

    This will cause the transaction's `onFailure` callback to be called and
    will prevent any new script and link nodes from being added to the document,
    but any resources that have already been requested will continue loading
    (there's no safe way to prevent this, unfortunately).

    *Note:* This method is deprecated as of 3.5.0, and will be removed in a
    future version of YUI. Use the transaction-level `abort()` method instead.

    @method abort
    @param {Get.Transaction} transaction Transaction to abort.
    @deprecated Use the `abort()` method on the transaction instead.
    @static
    **/
    abort: function (transaction) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "abort", 4072);
_yuitest_coverline("/build/yui-base/yui-base.js", 4073);
var i, id, item, len, pending;


        _yuitest_coverline("/build/yui-base/yui-base.js", 4076);
if (!transaction.abort) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4077);
id          = transaction;
            _yuitest_coverline("/build/yui-base/yui-base.js", 4078);
pending     = this._pending;
            _yuitest_coverline("/build/yui-base/yui-base.js", 4079);
transaction = null;

            _yuitest_coverline("/build/yui-base/yui-base.js", 4081);
if (pending && pending.transaction.id === id) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4082);
transaction   = pending.transaction;
                _yuitest_coverline("/build/yui-base/yui-base.js", 4083);
this._pending = null;
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4085);
for (i = 0, len = this._queue.length; i < len; ++i) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4086);
item = this._queue[i].transaction;

                    _yuitest_coverline("/build/yui-base/yui-base.js", 4088);
if (item.id === id) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 4089);
transaction = item;
                        _yuitest_coverline("/build/yui-base/yui-base.js", 4090);
this._queue.splice(i, 1);
                        _yuitest_coverline("/build/yui-base/yui-base.js", 4091);
break;
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4097);
transaction && transaction.abort();
    },

    /**
    Loads one or more CSS files.

    The _urls_ parameter may be provided as a URL string, a request object,
    or an array of URL strings and/or request objects.

    A request object is just an object that contains a `url` property and zero
    or more options that should apply specifically to that request.
    Request-specific options take priority over transaction-level options and
    default options.

    URLs may be relative or absolute, and do not have to have the same origin
    as the current page.

    The `options` parameter may be omitted completely and a callback passed in
    its place, if desired.

    @example

        // Load a single CSS file and log a message on completion.
        Y.Get.css('foo.css', function (err) {
            if (err) {
            } else {
            }
        });

        // Load multiple CSS files and log a message when all have finished
        // loading.
        var urls = ['foo.css', 'http://example.com/bar.css', 'baz/quux.css'];

        Y.Get.css(urls, function (err) {
            if (err) {
            } else {
            }
        });

        // Specify transaction-level options, which will apply to all requests
        // within the transaction.
        Y.Get.css(urls, {
            attributes: {'class': 'my-css'},
            timeout   : 5000
        });

        // Specify per-request options, which override transaction-level and
        // default options.
        Y.Get.css([
            {url: 'foo.css', attributes: {id: 'foo'}},
            {url: 'bar.css', attributes: {id: 'bar', charset: 'iso-8859-1'}}
        ]);

    @method css
    @param {String|Object|Array} urls URL string, request object, or array
        of URLs and/or request objects to load.
    @param {Object} [options] Options for this transaction. See the
        `Y.Get.options` property for a complete list of available options.
    @param {Function} [callback] Callback function to be called on completion.
        This is a general callback and will be called before any more granular
        callbacks (`onSuccess`, `onFailure`, etc.) specified in the `options`
        object.

        @param {Array|null} callback.err Array of errors that occurred during
            the transaction, or `null` on success.
        @param {Get.Transaction} callback.transaction Transaction object.

    @return {Get.Transaction} Transaction object.
    @static
    **/
    css: function (urls, options, callback) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "css", 4167);
_yuitest_coverline("/build/yui-base/yui-base.js", 4168);
return this._load('css', urls, options, callback);
    },

    /**
    Loads one or more JavaScript resources.

    The _urls_ parameter may be provided as a URL string, a request object,
    or an array of URL strings and/or request objects.

    A request object is just an object that contains a `url` property and zero
    or more options that should apply specifically to that request.
    Request-specific options take priority over transaction-level options and
    default options.

    URLs may be relative or absolute, and do not have to have the same origin
    as the current page.

    The `options` parameter may be omitted completely and a callback passed in
    its place, if desired.

    Scripts will be executed in the order they're specified unless the `async`
    option is `true`, in which case they'll be loaded in parallel and executed
    in whatever order they finish loading.

    @example

        // Load a single JS file and log a message on completion.
        Y.Get.js('foo.js', function (err) {
            if (err) {
            } else {
            }
        });

        // Load multiple JS files, execute them in order, and log a message when
        // all have finished loading.
        var urls = ['foo.js', 'http://example.com/bar.js', 'baz/quux.js'];

        Y.Get.js(urls, function (err) {
            if (err) {
            } else {
            }
        });

        // Specify transaction-level options, which will apply to all requests
        // within the transaction.
        Y.Get.js(urls, {
            attributes: {'class': 'my-js'},
            timeout   : 5000
        });

        // Specify per-request options, which override transaction-level and
        // default options.
        Y.Get.js([
            {url: 'foo.js', attributes: {id: 'foo'}},
            {url: 'bar.js', attributes: {id: 'bar', charset: 'iso-8859-1'}}
        ]);

    @method js
    @param {String|Object|Array} urls URL string, request object, or array
        of URLs and/or request objects to load.
    @param {Object} [options] Options for this transaction. See the
        `Y.Get.options` property for a complete list of available options.
    @param {Function} [callback] Callback function to be called on completion.
        This is a general callback and will be called before any more granular
        callbacks (`onSuccess`, `onFailure`, etc.) specified in the `options`
        object.

        @param {Array|null} callback.err Array of errors that occurred during
            the transaction, or `null` on success.
        @param {Get.Transaction} callback.transaction Transaction object.

    @return {Get.Transaction} Transaction object.
    @since 3.5.0
    @static
    **/
    js: function (urls, options, callback) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "js", 4243);
_yuitest_coverline("/build/yui-base/yui-base.js", 4244);
return this._load('js', urls, options, callback);
    },

    /**
    Loads one or more CSS and/or JavaScript resources in the same transaction.

    Use this method when you want to load both CSS and JavaScript in a single
    transaction and be notified when all requested URLs have finished loading,
    regardless of type.

    Behavior and options are the same as for the `css()` and `js()` methods. If
    a resource type isn't specified in per-request options or transaction-level
    options, Get will guess the file type based on the URL's extension (`.css`
    or `.js`, with or without a following query string). If the file type can't
    be guessed from the URL, a warning will be logged and Get will assume the
    URL is a JavaScript resource.

    @example

        // Load both CSS and JS files in a single transaction, and log a message
        // when all files have finished loading.
        Y.Get.load(['foo.css', 'bar.js', 'baz.css'], function (err) {
            if (err) {
            } else {
            }
        });

    @method load
    @param {String|Object|Array} urls URL string, request object, or array
        of URLs and/or request objects to load.
    @param {Object} [options] Options for this transaction. See the
        `Y.Get.options` property for a complete list of available options.
    @param {Function} [callback] Callback function to be called on completion.
        This is a general callback and will be called before any more granular
        callbacks (`onSuccess`, `onFailure`, etc.) specified in the `options`
        object.

        @param {Array|null} err Array of errors that occurred during the
            transaction, or `null` on success.
        @param {Get.Transaction} Transaction object.

    @return {Get.Transaction} Transaction object.
    @since 3.5.0
    @static
    **/
    load: function (urls, options, callback) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "load", 4289);
_yuitest_coverline("/build/yui-base/yui-base.js", 4290);
return this._load(null, urls, options, callback);
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Triggers an automatic purge if the purge threshold has been reached.

    @method _autoPurge
    @param {Number} threshold Purge threshold to use, in milliseconds.
    @protected
    @since 3.5.0
    @static
    **/
    _autoPurge: function (threshold) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_autoPurge", 4304);
_yuitest_coverline("/build/yui-base/yui-base.js", 4305);
if (threshold && this._purgeNodes.length >= threshold) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4306);
this._purge(this._purgeNodes);
        }
    },

    /**
    Populates the `_env` property with information about the current
    environment.

    @method _getEnv
    @return {Object} Environment information.
    @protected
    @since 3.5.0
    @static
    **/
    _getEnv: function () {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_getEnv", 4320);
_yuitest_coverline("/build/yui-base/yui-base.js", 4321);
var doc = Y.config.doc,
            ua  = Y.UA;

        // Note: some of these checks require browser sniffs since it's not
        // feasible to load test files on every pageview just to perform a
        // feature test. I'm sorry if this makes you sad.
        _yuitest_coverline("/build/yui-base/yui-base.js", 4327);
return (this._env = {
            // True if this is a browser that supports disabling async mode on
            // dynamically created script nodes. See
            // https://developer.mozilla.org/En/HTML/Element/Script#Attributes
            async: doc && doc.createElement('script').async === true,

            // True if this browser fires an event when a dynamically injected
            // link node fails to load. This is currently true for Firefox 9+
            // and WebKit 535.24+.
            cssFail: ua.gecko >= 9 || ua.compareVersions(ua.webkit, 535.24) >= 0,

            // True if this browser fires an event when a dynamically injected
            // link node finishes loading. This is currently true for IE, Opera,
            // Firefox 9+, and WebKit 535.24+. Note that IE versions <9 fire the
            // DOM 0 "onload" event, but not "load". All versions of IE fire
            // "onload".
            // davglass: Seems that Chrome on Android needs this to be false.
            cssLoad: (
                    (!ua.gecko && !ua.webkit) || ua.gecko >= 9 ||
                    ua.compareVersions(ua.webkit, 535.24) >= 0
                ) && !(ua.chrome && ua.chrome <= 18),

            // True if this browser preserves script execution order while
            // loading scripts in parallel as long as the script node's `async`
            // attribute is set to false to explicitly disable async execution.
            preservesScriptOrder: !!(ua.gecko || ua.opera)
        });
    },

    _getTransaction: function (urls, options) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_getTransaction", 4356);
_yuitest_coverline("/build/yui-base/yui-base.js", 4357);
var requests = [],
            i, len, req, url;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4360);
if (!Lang.isArray(urls)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4361);
urls = [urls];
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4364);
options = Y.merge(this.options, options);

        // Clone the attributes object so we don't end up modifying it by ref.
        _yuitest_coverline("/build/yui-base/yui-base.js", 4367);
options.attributes = Y.merge(this.options.attributes,
                options.attributes);

        _yuitest_coverline("/build/yui-base/yui-base.js", 4370);
for (i = 0, len = urls.length; i < len; ++i) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4371);
url = urls[i];
            _yuitest_coverline("/build/yui-base/yui-base.js", 4372);
req = {attributes: {}};

            // If `url` is a string, we create a URL object for it, then mix in
            // global options and request-specific options. If it's an object
            // with a "url" property, we assume it's a request object containing
            // URL-specific options.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4378);
if (typeof url === 'string') {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4379);
req.url = url;
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 4380);
if (url.url) {
                // URL-specific options override both global defaults and
                // request-specific options.
                _yuitest_coverline("/build/yui-base/yui-base.js", 4383);
Y.mix(req, url, false, null, 0, true);
                _yuitest_coverline("/build/yui-base/yui-base.js", 4384);
url = url.url; // Make url a string so we can use it later.
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4386);
continue;
            }}

            _yuitest_coverline("/build/yui-base/yui-base.js", 4389);
Y.mix(req, options, false, null, 0, true);

            // If we didn't get an explicit type for this URL either in the
            // request options or the URL-specific options, try to determine
            // one from the file extension.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4394);
if (!req.type) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4395);
if (this.REGEX_CSS.test(url)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4396);
req.type = 'css';
                } else {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4398);
if (!this.REGEX_JS.test(url)) {
                    }

                    _yuitest_coverline("/build/yui-base/yui-base.js", 4401);
req.type = 'js';
                }
            }

            // Mix in type-specific default options, but don't overwrite any
            // options that have already been set.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4407);
Y.mix(req, req.type === 'js' ? this.jsOptions : this.cssOptions,
                false, null, 0, true);

            // Give the node an id attribute if it doesn't already have one.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4411);
req.attributes.id || (req.attributes.id = Y.guid());

            // Backcompat for <3.5.0 behavior.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4414);
if (req.win) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4415);
req.doc = req.win.document;
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4417);
req.win = req.doc.defaultView || req.doc.parentWindow;
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 4420);
if (req.charset) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4421);
req.attributes.charset = req.charset;
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 4424);
requests.push(req);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4427);
return new Transaction(requests, options);
    },

    _load: function (type, urls, options, callback) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_load", 4430);
_yuitest_coverline("/build/yui-base/yui-base.js", 4431);
var transaction;

        // Allow callback as third param.
        _yuitest_coverline("/build/yui-base/yui-base.js", 4434);
if (typeof options === 'function') {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4435);
callback = options;
            _yuitest_coverline("/build/yui-base/yui-base.js", 4436);
options  = {};
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4439);
options || (options = {});
        _yuitest_coverline("/build/yui-base/yui-base.js", 4440);
options.type = type;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4442);
if (!this._env) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4443);
this._getEnv();
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4446);
transaction = this._getTransaction(urls, options);

        _yuitest_coverline("/build/yui-base/yui-base.js", 4448);
this._queue.push({
            callback   : callback,
            transaction: transaction
        });

        _yuitest_coverline("/build/yui-base/yui-base.js", 4453);
this._next();

        _yuitest_coverline("/build/yui-base/yui-base.js", 4455);
return transaction;
    },

    _next: function () {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_next", 4458);
_yuitest_coverline("/build/yui-base/yui-base.js", 4459);
var item;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4461);
if (this._pending) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4462);
return;
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4465);
item = this._queue.shift();

        _yuitest_coverline("/build/yui-base/yui-base.js", 4467);
if (item) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4468);
this._pending = item;

            _yuitest_coverline("/build/yui-base/yui-base.js", 4470);
item.transaction.execute(function () {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 24)", 4470);
_yuitest_coverline("/build/yui-base/yui-base.js", 4471);
item.callback && item.callback.apply(this, arguments);

                _yuitest_coverline("/build/yui-base/yui-base.js", 4473);
Get._pending = null;
                _yuitest_coverline("/build/yui-base/yui-base.js", 4474);
Get._next();
            });
        }
    },

    _purge: function (nodes) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_purge", 4479);
_yuitest_coverline("/build/yui-base/yui-base.js", 4480);
var purgeNodes    = this._purgeNodes,
            isTransaction = nodes !== purgeNodes,
            index, node;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4484);
while (node = nodes.pop()) { // assignment
            // Don't purge nodes that haven't finished loading (or errored out),
            // since this can hang the transaction.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4487);
if (!node._yuiget_finished) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4488);
continue;
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 4491);
node.parentNode && node.parentNode.removeChild(node);

            // If this is a transaction-level purge and this node also exists in
            // the Get-level _purgeNodes array, we need to remove it from
            // _purgeNodes to avoid creating a memory leak. The indexOf lookup
            // sucks, but until we get WeakMaps, this is the least troublesome
            // way to do this (we can't just hold onto node ids because they may
            // not be in the same document).
            _yuitest_coverline("/build/yui-base/yui-base.js", 4499);
if (isTransaction) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4500);
index = Y.Array.indexOf(purgeNodes, node);

                _yuitest_coverline("/build/yui-base/yui-base.js", 4502);
if (index > -1) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4503);
purgeNodes.splice(index, 1);
                }
            }
        }
    }
};

/**
Alias for `js()`.

@method script
@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 4516);
Get.script = Get.js;

/**
Represents a Get transaction, which may contain requests for one or more JS or
CSS files.

This class should not be instantiated manually. Instances will be created and
returned as needed by Y.Get's `css()`, `js()`, and `load()` methods.

@class Get.Transaction
@constructor
@since 3.5.0
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 4529);
Get.Transaction = Transaction = function (requests, options) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "Transaction", 4529);
_yuitest_coverline("/build/yui-base/yui-base.js", 4530);
var self = this;

    _yuitest_coverline("/build/yui-base/yui-base.js", 4532);
self.id       = Transaction._lastId += 1;
    _yuitest_coverline("/build/yui-base/yui-base.js", 4533);
self.data     = options.data;
    _yuitest_coverline("/build/yui-base/yui-base.js", 4534);
self.errors   = [];
    _yuitest_coverline("/build/yui-base/yui-base.js", 4535);
self.nodes    = [];
    _yuitest_coverline("/build/yui-base/yui-base.js", 4536);
self.options  = options;
    _yuitest_coverline("/build/yui-base/yui-base.js", 4537);
self.requests = requests;

    _yuitest_coverline("/build/yui-base/yui-base.js", 4539);
self._callbacks = []; // callbacks to call after execution finishes
    _yuitest_coverline("/build/yui-base/yui-base.js", 4540);
self._queue     = [];
    _yuitest_coverline("/build/yui-base/yui-base.js", 4541);
self._waiting   = 0;

    // Deprecated pre-3.5.0 properties.
    _yuitest_coverline("/build/yui-base/yui-base.js", 4544);
self.tId = self.id; // Use `id` instead.
    _yuitest_coverline("/build/yui-base/yui-base.js", 4545);
self.win = options.win || Y.config.win;
};

/**
Arbitrary data object associated with this transaction.

This object comes from the options passed to `Get.css()`, `Get.js()`, or
`Get.load()`, and will be `undefined` if no data object was specified.

@property {Object} data
**/

/**
Array of errors that have occurred during this transaction, if any.

@since 3.5.0
@property {Object[]} errors
@property {String} errors.error Error message.
@property {Object} errors.request Request object related to the error.
**/

/**
Numeric id for this transaction, unique among all transactions within the same
YUI sandbox in the current pageview.

@property {Number} id
@since 3.5.0
**/

/**
HTMLElement nodes (native ones, not YUI Node instances) that have been inserted
during the current transaction.

@property {HTMLElement[]} nodes
**/

/**
Options associated with this transaction.

See `Get.options` for the full list of available options.

@property {Object} options
@since 3.5.0
**/

/**
Request objects contained in this transaction. Each request object represents
one CSS or JS URL that will be (or has been) requested and loaded into the page.

@property {Object} requests
@since 3.5.0
**/

/**
Id of the most recent transaction.

@property _lastId
@type Number
@protected
@static
**/
_yuitest_coverline("/build/yui-base/yui-base.js", 4606);
Transaction._lastId = 0;

_yuitest_coverline("/build/yui-base/yui-base.js", 4608);
Transaction.prototype = {
    // -- Public Properties ----------------------------------------------------

    /**
    Current state of this transaction. One of "new", "executing", or "done".

    @property _state
    @type String
    @protected
    **/
    _state: 'new', // "new", "executing", or "done"

    // -- Public Methods -------------------------------------------------------

    /**
    Aborts this transaction.

    This will cause the transaction's `onFailure` callback to be called and
    will prevent any new script and link nodes from being added to the document,
    but any resources that have already been requested will continue loading
    (there's no safe way to prevent this, unfortunately).

    @method abort
    @param {String} [msg="Aborted."] Optional message to use in the `errors`
        array describing why the transaction was aborted.
    **/
    abort: function (msg) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "abort", 4634);
_yuitest_coverline("/build/yui-base/yui-base.js", 4635);
this._pending    = null;
        _yuitest_coverline("/build/yui-base/yui-base.js", 4636);
this._pendingCSS = null;
        _yuitest_coverline("/build/yui-base/yui-base.js", 4637);
this._pollTimer  = clearTimeout(this._pollTimer);
        _yuitest_coverline("/build/yui-base/yui-base.js", 4638);
this._queue      = [];
        _yuitest_coverline("/build/yui-base/yui-base.js", 4639);
this._waiting    = 0;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4641);
this.errors.push({error: msg || 'Aborted'});
        _yuitest_coverline("/build/yui-base/yui-base.js", 4642);
this._finish();
    },

    /**
    Begins execting the transaction.

    There's usually no reason to call this manually, since Get will call it
    automatically when other pending transactions have finished. If you really
    want to execute your transaction before Get does, you can, but be aware that
    this transaction's scripts may end up executing before the scripts in other
    pending transactions.

    If the transaction is already executing, the specified callback (if any)
    will be queued and called after execution finishes. If the transaction has
    already finished, the callback will be called immediately (the transaction
    will not be executed again).

    @method execute
    @param {Function} callback Callback function to execute after all requests
        in the transaction are complete, or after the transaction is aborted.
    **/
    execute: function (callback) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "execute", 4663);
_yuitest_coverline("/build/yui-base/yui-base.js", 4664);
var self     = this,
            requests = self.requests,
            state    = self._state,
            i, len, queue, req;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4669);
if (state === 'done') {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4670);
callback && callback(self.errors.length ? self.errors : null, self);
            _yuitest_coverline("/build/yui-base/yui-base.js", 4671);
return;
        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4673);
callback && self._callbacks.push(callback);

            _yuitest_coverline("/build/yui-base/yui-base.js", 4675);
if (state === 'executing') {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4676);
return;
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4680);
self._state = 'executing';
        _yuitest_coverline("/build/yui-base/yui-base.js", 4681);
self._queue = queue = [];

        _yuitest_coverline("/build/yui-base/yui-base.js", 4683);
if (self.options.timeout) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4684);
self._timeout = setTimeout(function () {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 25)", 4684);
_yuitest_coverline("/build/yui-base/yui-base.js", 4685);
self.abort('Timeout');
            }, self.options.timeout);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4689);
for (i = 0, len = requests.length; i < len; ++i) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4690);
req = self.requests[i];

            _yuitest_coverline("/build/yui-base/yui-base.js", 4692);
if (req.async || req.type === 'css') {
                // No need to queue CSS or fully async JS.
                _yuitest_coverline("/build/yui-base/yui-base.js", 4694);
self._insert(req);
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4696);
queue.push(req);
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4700);
self._next();
    },

    /**
    Manually purges any `<script>` or `<link>` nodes this transaction has
    created.

    Be careful when purging a transaction that contains CSS requests, since
    removing `<link>` nodes will also remove any styles they applied.

    @method purge
    **/
    purge: function () {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "purge", 4712);
_yuitest_coverline("/build/yui-base/yui-base.js", 4713);
Get._purge(this.nodes);
    },

    // -- Protected Methods ----------------------------------------------------
    _createNode: function (name, attrs, doc) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_createNode", 4717);
_yuitest_coverline("/build/yui-base/yui-base.js", 4718);
var node = doc.createElement(name),
            attr, testEl;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4721);
if (!CUSTOM_ATTRS) {
            // IE6 and IE7 expect property names rather than attribute names for
            // certain attributes. Rather than sniffing, we do a quick feature
            // test the first time _createNode() runs to determine whether we
            // need to provide a workaround.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4726);
testEl = doc.createElement('div');
            _yuitest_coverline("/build/yui-base/yui-base.js", 4727);
testEl.setAttribute('class', 'a');

            _yuitest_coverline("/build/yui-base/yui-base.js", 4729);
CUSTOM_ATTRS = testEl.className === 'a' ? {} : {
                'for'  : 'htmlFor',
                'class': 'className'
            };
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4735);
for (attr in attrs) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4736);
if (attrs.hasOwnProperty(attr)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4737);
node.setAttribute(CUSTOM_ATTRS[attr] || attr, attrs[attr]);
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4741);
return node;
    },

    _finish: function () {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_finish", 4744);
_yuitest_coverline("/build/yui-base/yui-base.js", 4745);
var errors  = this.errors.length ? this.errors : null,
            options = this.options,
            thisObj = options.context || this,
            data, i, len;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4750);
if (this._state === 'done') {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4751);
return;
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4754);
this._state = 'done';

        _yuitest_coverline("/build/yui-base/yui-base.js", 4756);
for (i = 0, len = this._callbacks.length; i < len; ++i) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4757);
this._callbacks[i].call(thisObj, errors, this);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4760);
data = this._getEventData();

        _yuitest_coverline("/build/yui-base/yui-base.js", 4762);
if (errors) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4763);
if (options.onTimeout && errors[errors.length - 1].error === 'Timeout') {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4764);
options.onTimeout.call(thisObj, data);
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 4767);
if (options.onFailure) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4768);
options.onFailure.call(thisObj, data);
            }
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 4770);
if (options.onSuccess) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4771);
options.onSuccess.call(thisObj, data);
        }}

        _yuitest_coverline("/build/yui-base/yui-base.js", 4774);
if (options.onEnd) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4775);
options.onEnd.call(thisObj, data);
        }
    },

    _getEventData: function (req) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_getEventData", 4779);
_yuitest_coverline("/build/yui-base/yui-base.js", 4780);
if (req) {
            // This merge is necessary for backcompat. I hate it.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4782);
return Y.merge(this, {
                abort  : this.abort, // have to copy these because the prototype isn't preserved
                purge  : this.purge,
                request: req,
                url    : req.url,
                win    : req.win
            });
        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4790);
return this;
        }
    },

    _getInsertBefore: function (req) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_getInsertBefore", 4794);
_yuitest_coverline("/build/yui-base/yui-base.js", 4795);
var doc = req.doc,
            el  = req.insertBefore,
            cache, cachedNode, docStamp;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4799);
if (el) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4800);
return typeof el === 'string' ? doc.getElementById(el) : el;
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4803);
cache    = Get._insertCache;
        _yuitest_coverline("/build/yui-base/yui-base.js", 4804);
docStamp = Y.stamp(doc);

        _yuitest_coverline("/build/yui-base/yui-base.js", 4806);
if ((el = cache[docStamp])) { // assignment
            _yuitest_coverline("/build/yui-base/yui-base.js", 4807);
return el;
        }

        // Inserting before a <base> tag apparently works around an IE bug
        // (according to a comment from pre-3.5.0 Y.Get), but I'm not sure what
        // bug that is, exactly. Better safe than sorry?
        _yuitest_coverline("/build/yui-base/yui-base.js", 4813);
if ((el = doc.getElementsByTagName('base')[0])) { // assignment
            _yuitest_coverline("/build/yui-base/yui-base.js", 4814);
return (cache[docStamp] = el);
        }

        // Look for a <head> element.
        _yuitest_coverline("/build/yui-base/yui-base.js", 4818);
el = doc.head || doc.getElementsByTagName('head')[0];

        _yuitest_coverline("/build/yui-base/yui-base.js", 4820);
if (el) {
            // Create a marker node at the end of <head> to use as an insertion
            // point. Inserting before this node will ensure that all our CSS
            // gets inserted in the correct order, to maintain style precedence.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4824);
el.appendChild(doc.createTextNode(''));
            _yuitest_coverline("/build/yui-base/yui-base.js", 4825);
return (cache[docStamp] = el.lastChild);
        }

        // If all else fails, just insert before the first script node on the
        // page, which is virtually guaranteed to exist.
        _yuitest_coverline("/build/yui-base/yui-base.js", 4830);
return (cache[docStamp] = doc.getElementsByTagName('script')[0]);
    },

    _insert: function (req) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_insert", 4833);
_yuitest_coverline("/build/yui-base/yui-base.js", 4834);
var env          = Get._env,
            insertBefore = this._getInsertBefore(req),
            isScript     = req.type === 'js',
            node         = req.node,
            self         = this,
            ua           = Y.UA,
            cssTimeout, nodeType;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4842);
if (!node) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4843);
if (isScript) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4844);
nodeType = 'script';
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 4845);
if (!env.cssLoad && ua.gecko) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4846);
nodeType = 'style';
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4848);
nodeType = 'link';
            }}

            _yuitest_coverline("/build/yui-base/yui-base.js", 4851);
node = req.node = this._createNode(nodeType, req.attributes,
                req.doc);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4855);
function onError() {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "onError", 4855);
_yuitest_coverline("/build/yui-base/yui-base.js", 4856);
self._progress('Failed to load ' + req.url, req);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4859);
function onLoad() {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "onLoad", 4859);
_yuitest_coverline("/build/yui-base/yui-base.js", 4860);
if (cssTimeout) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4861);
clearTimeout(cssTimeout);
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 4864);
self._progress(null, req);
        }


        // Deal with script asynchronicity.
        _yuitest_coverline("/build/yui-base/yui-base.js", 4869);
if (isScript) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4870);
node.setAttribute('src', req.url);

            _yuitest_coverline("/build/yui-base/yui-base.js", 4872);
if (req.async) {
                // Explicitly indicate that we want the browser to execute this
                // script asynchronously. This is necessary for older browsers
                // like Firefox <4.
                _yuitest_coverline("/build/yui-base/yui-base.js", 4876);
node.async = true;
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4878);
if (env.async) {
                    // This browser treats injected scripts as async by default
                    // (standard HTML5 behavior) but asynchronous loading isn't
                    // desired, so tell the browser not to mark this script as
                    // async.
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4883);
node.async = false;
                }

                // If this browser doesn't preserve script execution order based
                // on insertion order, we'll need to avoid inserting other
                // scripts until this one finishes loading.
                _yuitest_coverline("/build/yui-base/yui-base.js", 4889);
if (!env.preservesScriptOrder) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4890);
this._pending = req;
                }
            }
        } else {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4894);
if (!env.cssLoad && ua.gecko) {
                // In Firefox <9, we can import the requested URL into a <style>
                // node and poll for the existence of node.sheet.cssRules. This
                // gives us a reliable way to determine CSS load completion that
                // also works for cross-domain stylesheets.
                //
                // Props to Zach Leatherman for calling my attention to this
                // technique.
                _yuitest_coverline("/build/yui-base/yui-base.js", 4902);
node.innerHTML = (req.attributes.charset ?
                    '@charset "' + req.attributes.charset + '";' : '') +
                    '@import "' + req.url + '";';
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4906);
node.setAttribute('href', req.url);
            }
        }

        // Inject the node.
        _yuitest_coverline("/build/yui-base/yui-base.js", 4911);
if (isScript && ua.ie && (ua.ie < 9 || (document.documentMode && document.documentMode < 9))) {
            // Script on IE < 9, and IE 9+ when in IE 8 or older modes, including quirks mode.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4913);
node.onreadystatechange = function () {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "onreadystatechange", 4913);
_yuitest_coverline("/build/yui-base/yui-base.js", 4914);
if (/loaded|complete/.test(node.readyState)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4915);
node.onreadystatechange = null;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4916);
onLoad();
                }
            };
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 4919);
if (!isScript && !env.cssLoad) {
            // CSS on Firefox <9 or WebKit.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4921);
this._poll(req);
        } else {
            // Script or CSS on everything else. Using DOM 0 events because that
            // evens the playing field with older IEs.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4925);
node.onerror = onError;
            _yuitest_coverline("/build/yui-base/yui-base.js", 4926);
node.onload  = onLoad;

            // If this browser doesn't fire an event when CSS fails to load,
            // fail after a timeout to avoid blocking the transaction queue.
            _yuitest_coverline("/build/yui-base/yui-base.js", 4930);
if (!env.cssFail && !isScript) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 4931);
cssTimeout = setTimeout(onError, req.timeout || 3000);
            }
        }}

        _yuitest_coverline("/build/yui-base/yui-base.js", 4935);
this._waiting += 1;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4937);
this.nodes.push(node);
        _yuitest_coverline("/build/yui-base/yui-base.js", 4938);
insertBefore.parentNode.insertBefore(node, insertBefore);
    },

    _next: function () {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_next", 4941);
_yuitest_coverline("/build/yui-base/yui-base.js", 4942);
if (this._pending) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4943);
return;
        }

        // If there are requests in the queue, insert the next queued request.
        // Otherwise, if we're waiting on already-inserted requests to finish,
        // wait longer. If there are no queued requests and we're not waiting
        // for anything to load, then we're done!
        _yuitest_coverline("/build/yui-base/yui-base.js", 4950);
if (this._queue.length) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4951);
this._insert(this._queue.shift());
        } else {_yuitest_coverline("/build/yui-base/yui-base.js", 4952);
if (!this._waiting) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4953);
this._finish();
        }}
    },

    _poll: function (newReq) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_poll", 4957);
_yuitest_coverline("/build/yui-base/yui-base.js", 4958);
var self       = this,
            pendingCSS = self._pendingCSS,
            isWebKit   = Y.UA.webkit,
            i, hasRules, j, nodeHref, req, sheets;

        _yuitest_coverline("/build/yui-base/yui-base.js", 4963);
if (newReq) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4964);
pendingCSS || (pendingCSS = self._pendingCSS = []);
            _yuitest_coverline("/build/yui-base/yui-base.js", 4965);
pendingCSS.push(newReq);

            _yuitest_coverline("/build/yui-base/yui-base.js", 4967);
if (self._pollTimer) {
                // A poll timeout is already pending, so no need to create a
                // new one.
                _yuitest_coverline("/build/yui-base/yui-base.js", 4970);
return;
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 4974);
self._pollTimer = null;

        // Note: in both the WebKit and Gecko hacks below, a CSS URL that 404s
        // will still be treated as a success. There's no good workaround for
        // this.

        _yuitest_coverline("/build/yui-base/yui-base.js", 4980);
for (i = 0; i < pendingCSS.length; ++i) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 4981);
req = pendingCSS[i];

            _yuitest_coverline("/build/yui-base/yui-base.js", 4983);
if (isWebKit) {
                // Look for a stylesheet matching the pending URL.
                _yuitest_coverline("/build/yui-base/yui-base.js", 4985);
sheets   = req.doc.styleSheets;
                _yuitest_coverline("/build/yui-base/yui-base.js", 4986);
j        = sheets.length;
                _yuitest_coverline("/build/yui-base/yui-base.js", 4987);
nodeHref = req.node.href;

                _yuitest_coverline("/build/yui-base/yui-base.js", 4989);
while (--j >= 0) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 4990);
if (sheets[j].href === nodeHref) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 4991);
pendingCSS.splice(i, 1);
                        _yuitest_coverline("/build/yui-base/yui-base.js", 4992);
i -= 1;
                        _yuitest_coverline("/build/yui-base/yui-base.js", 4993);
self._progress(null, req);
                        _yuitest_coverline("/build/yui-base/yui-base.js", 4994);
break;
                    }
                }
            } else {
                // Many thanks to Zach Leatherman for calling my attention to
                // the @import-based cross-domain technique used here, and to
                // Oleg Slobodskoi for an earlier same-domain implementation.
                //
                // See Zach's blog for more details:
                // http://www.zachleat.com/web/2010/07/29/load-css-dynamically/
                _yuitest_coverline("/build/yui-base/yui-base.js", 5004);
try {
                    // We don't really need to store this value since we never
                    // use it again, but if we don't store it, Closure Compiler
                    // assumes the code is useless and removes it.
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5008);
hasRules = !!req.node.sheet.cssRules;

                    // If we get here, the stylesheet has loaded.
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5011);
pendingCSS.splice(i, 1);
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5012);
i -= 1;
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5013);
self._progress(null, req);
                } catch (ex) {
                    // An exception means the stylesheet is still loading.
                }
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5020);
if (pendingCSS.length) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5021);
self._pollTimer = setTimeout(function () {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 26)", 5021);
_yuitest_coverline("/build/yui-base/yui-base.js", 5022);
self._poll.call(self);
            }, self.options.pollInterval);
        }
    },

    _progress: function (err, req) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "_progress", 5027);
_yuitest_coverline("/build/yui-base/yui-base.js", 5028);
var options = this.options;

        _yuitest_coverline("/build/yui-base/yui-base.js", 5030);
if (err) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5031);
req.error = err;

            _yuitest_coverline("/build/yui-base/yui-base.js", 5033);
this.errors.push({
                error  : err,
                request: req
            });

        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5040);
req.node._yuiget_finished = req.finished = true;

        _yuitest_coverline("/build/yui-base/yui-base.js", 5042);
if (options.onProgress) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5043);
options.onProgress.call(options.context || this,
                this._getEventData(req));
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5047);
if (req.autopurge) {
            // Pre-3.5.0 Get always excludes the most recent node from an
            // autopurge. I find this odd, but I'm keeping that behavior for
            // the sake of backcompat.
            _yuitest_coverline("/build/yui-base/yui-base.js", 5051);
Get._autoPurge(this.options.purgethreshold);
            _yuitest_coverline("/build/yui-base/yui-base.js", 5052);
Get._purgeNodes.push(req.node);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5055);
if (this._pending === req) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5056);
this._pending = null;
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5059);
this._waiting -= 1;
        _yuitest_coverline("/build/yui-base/yui-base.js", 5060);
this._next();
    }
};


}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-base/yui-base.js", 5066);
YUI.add('features', function(Y) {

_yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 27)", 5066);
_yuitest_coverline("/build/yui-base/yui-base.js", 5068);
var feature_tests = {};

/**
Contains the core of YUI's feature test architecture.
@module features
*/

/**
* Feature detection
* @class Features
* @static
*/

_yuitest_coverline("/build/yui-base/yui-base.js", 5081);
Y.mix(Y.namespace('Features'), {
    
    /**
    * Object hash of all registered feature tests
    * @property tests
    * @type Object
    */
    tests: feature_tests,
    
    /**
    * Add a test to the system
    * 
    *   ```
    *   Y.Features.add("load", "1", {});
    *   ```
    * 
    * @method add
    * @param {String} cat The category, right now only 'load' is supported
    * @param {String} name The number sequence of the test, how it's reported in the URL or config: 1, 2, 3
    * @param {Object} o Object containing test properties
    * @param {String} o.name The name of the test
    * @param {Function} o.test The test function to execute, the only argument to the function is the `Y` instance
    * @param {String} o.trigger The module that triggers this test.
    */
    add: function(cat, name, o) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "add", 5105);
_yuitest_coverline("/build/yui-base/yui-base.js", 5106);
feature_tests[cat] = feature_tests[cat] || {};
        _yuitest_coverline("/build/yui-base/yui-base.js", 5107);
feature_tests[cat][name] = o;
    },
    /**
    * Execute all tests of a given category and return the serialized results
    *
    *   ```
    *   caps=1:1;2:1;3:0
    *   ```
    * @method all
    * @param {String} cat The category to execute
    * @param {Array} args The arguments to pass to the test function
    * @return {String} A semi-colon separated string of tests and their success/failure: 1:1;2:1;3:0
    */
    all: function(cat, args) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "all", 5120);
_yuitest_coverline("/build/yui-base/yui-base.js", 5121);
var cat_o = feature_tests[cat],
            // results = {};
            result = [];
        _yuitest_coverline("/build/yui-base/yui-base.js", 5124);
if (cat_o) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5125);
Y.Object.each(cat_o, function(v, k) {
                _yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 28)", 5125);
_yuitest_coverline("/build/yui-base/yui-base.js", 5126);
result.push(k + ':' + (Y.Features.test(cat, k, args) ? 1 : 0));
            });
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5130);
return (result.length) ? result.join(';') : '';
    },
    /**
    * Run a sepecific test and return a Boolean response.
    *
    *   ```
    *   Y.Features.test("load", "1");
    *   ```
    *
    * @method test
    * @param {String} cat The category of the test to run
    * @param {String} name The name of the test to run
    * @param {Array} args The arguments to pass to the test function
    * @return {Boolean} True or false if the test passed/failed.
    */
    test: function(cat, name, args) {
        _yuitest_coverfunc("/build/yui-base/yui-base.js", "test", 5145);
_yuitest_coverline("/build/yui-base/yui-base.js", 5146);
args = args || [];
        _yuitest_coverline("/build/yui-base/yui-base.js", 5147);
var result, ua, test,
            cat_o = feature_tests[cat],
            feature = cat_o && cat_o[name];

        _yuitest_coverline("/build/yui-base/yui-base.js", 5151);
if (!feature) {
        } else {

            _yuitest_coverline("/build/yui-base/yui-base.js", 5154);
result = feature.result;

            _yuitest_coverline("/build/yui-base/yui-base.js", 5156);
if (Y.Lang.isUndefined(result)) {

                _yuitest_coverline("/build/yui-base/yui-base.js", 5158);
ua = feature.ua;
                _yuitest_coverline("/build/yui-base/yui-base.js", 5159);
if (ua) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5160);
result = (Y.UA[ua]);
                }

                _yuitest_coverline("/build/yui-base/yui-base.js", 5163);
test = feature.test;
                _yuitest_coverline("/build/yui-base/yui-base.js", 5164);
if (test && ((!ua) || result)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5165);
result = test.apply(Y, args);
                }

                _yuitest_coverline("/build/yui-base/yui-base.js", 5168);
feature.result = result;
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5172);
return result;
    }
});

// Y.Features.add("load", "1", {});
// Y.Features.test("load", "1");
// caps=1:1;2:0;3:1;

/* This file is auto-generated by src/loader/scripts/meta_join.js */
_yuitest_coverline("/build/yui-base/yui-base.js", 5181);
var add = Y.Features.add;
// app-transitions-native
_yuitest_coverline("/build/yui-base/yui-base.js", 5183);
add('load', '0', {
    "name": "app-transitions-native",
    "test": function (Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5185);
_yuitest_coverline("/build/yui-base/yui-base.js", 5186);
var doc  = Y.config.doc,
        node = doc ? doc.documentElement : null;

    _yuitest_coverline("/build/yui-base/yui-base.js", 5189);
if (node && node.style) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 5190);
return ('MozTransition' in node.style || 'WebkitTransition' in node.style);
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 5193);
return false;
},
    "trigger": "app-transitions"
});
// autocomplete-list-keys
_yuitest_coverline("/build/yui-base/yui-base.js", 5198);
add('load', '1', {
    "name": "autocomplete-list-keys",
    "test": function (Y) {
    // Only add keyboard support to autocomplete-list if this doesn't appear to
    // be an iOS or Android-based mobile device.
    //
    // There's currently no feasible way to actually detect whether a device has
    // a hardware keyboard, so this sniff will have to do. It can easily be
    // overridden by manually loading the autocomplete-list-keys module.
    //
    // Worth noting: even though iOS supports bluetooth keyboards, Mobile Safari
    // doesn't fire the keyboard events used by AutoCompleteList, so there's
    // no point loading the -keys module even when a bluetooth keyboard may be
    // available.
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5200);
_yuitest_coverline("/build/yui-base/yui-base.js", 5212);
return !(Y.UA.ios || Y.UA.android);
},
    "trigger": "autocomplete-list"
});
// dd-gestures
_yuitest_coverline("/build/yui-base/yui-base.js", 5217);
add('load', '2', {
    "name": "dd-gestures",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5219);
_yuitest_coverline("/build/yui-base/yui-base.js", 5220);
return ((Y.config.win && ("ontouchstart" in Y.config.win)) && !(Y.UA.chrome && Y.UA.chrome < 6));
},
    "trigger": "dd-drag"
});
// dom-style-ie
_yuitest_coverline("/build/yui-base/yui-base.js", 5225);
add('load', '3', {
    "name": "dom-style-ie",
    "test": function (Y) {

    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5227);
_yuitest_coverline("/build/yui-base/yui-base.js", 5229);
var testFeature = Y.Features.test,
        addFeature = Y.Features.add,
        WINDOW = Y.config.win,
        DOCUMENT = Y.config.doc,
        DOCUMENT_ELEMENT = 'documentElement',
        ret = false;

    _yuitest_coverline("/build/yui-base/yui-base.js", 5236);
addFeature('style', 'computedStyle', {
        test: function() {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "test", 5237);
_yuitest_coverline("/build/yui-base/yui-base.js", 5238);
return WINDOW && 'getComputedStyle' in WINDOW;
        }
    });

    _yuitest_coverline("/build/yui-base/yui-base.js", 5242);
addFeature('style', 'opacity', {
        test: function() {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "test", 5243);
_yuitest_coverline("/build/yui-base/yui-base.js", 5244);
return DOCUMENT && 'opacity' in DOCUMENT[DOCUMENT_ELEMENT].style;
        }
    });

    _yuitest_coverline("/build/yui-base/yui-base.js", 5248);
ret =  (!testFeature('style', 'opacity') &&
            !testFeature('style', 'computedStyle'));

    _yuitest_coverline("/build/yui-base/yui-base.js", 5251);
return ret;
},
    "trigger": "dom-style"
});
// editor-para-ie
_yuitest_coverline("/build/yui-base/yui-base.js", 5256);
add('load', '4', {
    "name": "editor-para-ie",
    "trigger": "editor-para",
    "ua": "ie",
    "when": "instead"
});
// event-base-ie
_yuitest_coverline("/build/yui-base/yui-base.js", 5263);
add('load', '5', {
    "name": "event-base-ie",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5265);
_yuitest_coverline("/build/yui-base/yui-base.js", 5266);
var imp = Y.config.doc && Y.config.doc.implementation;
    _yuitest_coverline("/build/yui-base/yui-base.js", 5267);
return (imp && (!imp.hasFeature('Events', '2.0')));
},
    "trigger": "node-base"
});
// graphics-canvas
_yuitest_coverline("/build/yui-base/yui-base.js", 5272);
add('load', '6', {
    "name": "graphics-canvas",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5274);
_yuitest_coverline("/build/yui-base/yui-base.js", 5275);
var DOCUMENT = Y.config.doc,
        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    _yuitest_coverline("/build/yui-base/yui-base.js", 5279);
return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext("2d"));
},
    "trigger": "graphics"
});
// graphics-canvas-default
_yuitest_coverline("/build/yui-base/yui-base.js", 5284);
add('load', '7', {
    "name": "graphics-canvas-default",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5286);
_yuitest_coverline("/build/yui-base/yui-base.js", 5287);
var DOCUMENT = Y.config.doc,
        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    _yuitest_coverline("/build/yui-base/yui-base.js", 5291);
return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext("2d"));
},
    "trigger": "graphics"
});
// graphics-svg
_yuitest_coverline("/build/yui-base/yui-base.js", 5296);
add('load', '8', {
    "name": "graphics-svg",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5298);
_yuitest_coverline("/build/yui-base/yui-base.js", 5299);
var DOCUMENT = Y.config.doc,
        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    
    _yuitest_coverline("/build/yui-base/yui-base.js", 5304);
return svg && (useSVG || !canvas);
},
    "trigger": "graphics"
});
// graphics-svg-default
_yuitest_coverline("/build/yui-base/yui-base.js", 5309);
add('load', '9', {
    "name": "graphics-svg-default",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5311);
_yuitest_coverline("/build/yui-base/yui-base.js", 5312);
var DOCUMENT = Y.config.doc,
        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    
    _yuitest_coverline("/build/yui-base/yui-base.js", 5317);
return svg && (useSVG || !canvas);
},
    "trigger": "graphics"
});
// graphics-vml
_yuitest_coverline("/build/yui-base/yui-base.js", 5322);
add('load', '10', {
    "name": "graphics-vml",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5324);
_yuitest_coverline("/build/yui-base/yui-base.js", 5325);
var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    _yuitest_coverline("/build/yui-base/yui-base.js", 5327);
return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
},
    "trigger": "graphics"
});
// graphics-vml-default
_yuitest_coverline("/build/yui-base/yui-base.js", 5332);
add('load', '11', {
    "name": "graphics-vml-default",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5334);
_yuitest_coverline("/build/yui-base/yui-base.js", 5335);
var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    _yuitest_coverline("/build/yui-base/yui-base.js", 5337);
return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
},
    "trigger": "graphics"
});
// history-hash-ie
_yuitest_coverline("/build/yui-base/yui-base.js", 5342);
add('load', '12', {
    "name": "history-hash-ie",
    "test": function (Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5344);
_yuitest_coverline("/build/yui-base/yui-base.js", 5345);
var docMode = Y.config.doc && Y.config.doc.documentMode;

    _yuitest_coverline("/build/yui-base/yui-base.js", 5347);
return Y.UA.ie && (!('onhashchange' in Y.config.win) ||
            !docMode || docMode < 8);
},
    "trigger": "history-hash"
});
// io-nodejs
_yuitest_coverline("/build/yui-base/yui-base.js", 5353);
add('load', '13', {
    "name": "io-nodejs",
    "trigger": "io-base",
    "ua": "nodejs"
});
// scrollview-base-ie
_yuitest_coverline("/build/yui-base/yui-base.js", 5359);
add('load', '14', {
    "name": "scrollview-base-ie",
    "trigger": "scrollview-base",
    "ua": "ie"
});
// selector-css2
_yuitest_coverline("/build/yui-base/yui-base.js", 5365);
add('load', '15', {
    "name": "selector-css2",
    "test": function (Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5367);
_yuitest_coverline("/build/yui-base/yui-base.js", 5368);
var DOCUMENT = Y.config.doc,
        ret = DOCUMENT && !('querySelectorAll' in DOCUMENT);

    _yuitest_coverline("/build/yui-base/yui-base.js", 5371);
return ret;
},
    "trigger": "selector"
});
// transition-timer
_yuitest_coverline("/build/yui-base/yui-base.js", 5376);
add('load', '16', {
    "name": "transition-timer",
    "test": function (Y) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "\"test\"", 5378);
_yuitest_coverline("/build/yui-base/yui-base.js", 5379);
var DOCUMENT = Y.config.doc,
        node = (DOCUMENT) ? DOCUMENT.documentElement: null,
        ret = true;

    _yuitest_coverline("/build/yui-base/yui-base.js", 5383);
if (node && node.style) {
        _yuitest_coverline("/build/yui-base/yui-base.js", 5384);
ret = !('MozTransition' in node.style || 'WebkitTransition' in node.style);
    } 

    _yuitest_coverline("/build/yui-base/yui-base.js", 5387);
return ret;
},
    "trigger": "transition"
});
// widget-base-ie
_yuitest_coverline("/build/yui-base/yui-base.js", 5392);
add('load', '17', {
    "name": "widget-base-ie",
    "trigger": "widget-base",
    "ua": "ie"
});


}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-base/yui-base.js", 5400);
YUI.add('intl-base', function(Y) {

/**
 * The Intl utility provides a central location for managing sets of
 * localized resources (strings and formatting patterns).
 *
 * @class Intl
 * @uses EventTarget
 * @static
 */

_yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 29)", 5400);
_yuitest_coverline("/build/yui-base/yui-base.js", 5411);
var SPLIT_REGEX = /[, ]/;

_yuitest_coverline("/build/yui-base/yui-base.js", 5413);
Y.mix(Y.namespace('Intl'), {

 /**
    * Returns the language among those available that
    * best matches the preferred language list, using the Lookup
    * algorithm of BCP 47.
    * If none of the available languages meets the user's preferences,
    * then "" is returned.
    * Extended language ranges are not supported.
    *
    * @method lookupBestLang
    * @param {String[] | String} preferredLanguages The list of preferred
    * languages in descending preference order, represented as BCP 47
    * language tags. A string array or a comma-separated list.
    * @param {String[]} availableLanguages The list of languages
    * that the application supports, represented as BCP 47 language
    * tags.
    *
    * @return {String} The available language that best matches the
    * preferred language list, or "".
    * @since 3.1.0
    */
    lookupBestLang: function(preferredLanguages, availableLanguages) {

        _yuitest_coverfunc("/build/yui-base/yui-base.js", "lookupBestLang", 5435);
_yuitest_coverline("/build/yui-base/yui-base.js", 5437);
var i, language, result, index;

        // check whether the list of available languages contains language;
        // if so return it
        _yuitest_coverline("/build/yui-base/yui-base.js", 5441);
function scan(language) {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "scan", 5441);
_yuitest_coverline("/build/yui-base/yui-base.js", 5442);
var i;
            _yuitest_coverline("/build/yui-base/yui-base.js", 5443);
for (i = 0; i < availableLanguages.length; i += 1) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5444);
if (language.toLowerCase() ===
                            availableLanguages[i].toLowerCase()) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5446);
return availableLanguages[i];
                }
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5451);
if (Y.Lang.isString(preferredLanguages)) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5452);
preferredLanguages = preferredLanguages.split(SPLIT_REGEX);
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5455);
for (i = 0; i < preferredLanguages.length; i += 1) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5456);
language = preferredLanguages[i];
            _yuitest_coverline("/build/yui-base/yui-base.js", 5457);
if (!language || language === '*') {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5458);
continue;
            }
            // check the fallback sequence for one language
            _yuitest_coverline("/build/yui-base/yui-base.js", 5461);
while (language.length > 0) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5462);
result = scan(language);
                _yuitest_coverline("/build/yui-base/yui-base.js", 5463);
if (result) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5464);
return result;
                } else {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5466);
index = language.lastIndexOf('-');
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5467);
if (index >= 0) {
                        _yuitest_coverline("/build/yui-base/yui-base.js", 5468);
language = language.substring(0, index);
                        // one-character subtags get cut along with the
                        // following subtag
                        _yuitest_coverline("/build/yui-base/yui-base.js", 5471);
if (index >= 2 && language.charAt(index - 2) === '-') {
                            _yuitest_coverline("/build/yui-base/yui-base.js", 5472);
language = language.substring(0, index - 2);
                        }
                    } else {
                        // nothing available for this language
                        _yuitest_coverline("/build/yui-base/yui-base.js", 5476);
break;
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-base/yui-base.js", 5482);
return '';
    }
});


}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-base/yui-base.js", 5488);
YUI.add('yui-log', function(Y) {

/**
 * Provides console log capability and exposes a custom event for
 * console implementations. This module is a `core` YUI module, <a href="../classes/YUI.html#method_log">it's documentation is located under the YUI class</a>.
 *
 * @module yui
 * @submodule yui-log
 */

_yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 30)", 5488);
_yuitest_coverline("/build/yui-base/yui-base.js", 5498);
var INSTANCE = Y,
    LOGEVENT = 'yui:log',
    UNDEFINED = 'undefined',
    LEVELS = { debug: 1,
               info: 1,
               warn: 1,
               error: 1 };

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
 *                        Custom categories can be used as well. (opt).
 * @param  {String}  src  The source of the the message (opt).
 * @param  {boolean} silent If true, the log event won't fire.
 * @return {YUI}      YUI instance.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 5525);
INSTANCE.log = function(msg, cat, src, silent) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "log", 5525);
_yuitest_coverline("/build/yui-base/yui-base.js", 5526);
var bail, excl, incl, m, f,
        Y = INSTANCE,
        c = Y.config,
        publisher = (Y.fire) ? Y : YUI.Env.globalEvents;
    // suppress log message if the config is off or the event stack
    // or the event call stack contains a consumer of the yui:log event
    _yuitest_coverline("/build/yui-base/yui-base.js", 5532);
if (c.debug) {
        // apply source filters
        _yuitest_coverline("/build/yui-base/yui-base.js", 5534);
src = src || "";
        _yuitest_coverline("/build/yui-base/yui-base.js", 5535);
if (typeof src !== "undefined") {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5536);
excl = c.logExclude;
            _yuitest_coverline("/build/yui-base/yui-base.js", 5537);
incl = c.logInclude;
            _yuitest_coverline("/build/yui-base/yui-base.js", 5538);
if (incl && !(src in incl)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5539);
bail = 1;
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 5540);
if (incl && (src in incl)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5541);
bail = !incl[src];
            } else {_yuitest_coverline("/build/yui-base/yui-base.js", 5542);
if (excl && (src in excl)) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5543);
bail = excl[src];
            }}}
        }
        _yuitest_coverline("/build/yui-base/yui-base.js", 5546);
if (!bail) {
            _yuitest_coverline("/build/yui-base/yui-base.js", 5547);
if (c.useBrowserConsole) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5548);
m = (src) ? src + ': ' + msg : msg;
                _yuitest_coverline("/build/yui-base/yui-base.js", 5549);
if (Y.Lang.isFunction(c.logFn)) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5550);
c.logFn.call(Y, msg, cat, src);
                } else {_yuitest_coverline("/build/yui-base/yui-base.js", 5551);
if (typeof console != UNDEFINED && console.log) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5552);
f = (cat && console[cat] && (cat in LEVELS)) ? cat : 'log';
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5553);
console[f](m);
                } else {_yuitest_coverline("/build/yui-base/yui-base.js", 5554);
if (typeof opera != UNDEFINED) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5555);
opera.postError(m);
                }}}
            }

            _yuitest_coverline("/build/yui-base/yui-base.js", 5559);
if (publisher && !silent) {

                _yuitest_coverline("/build/yui-base/yui-base.js", 5561);
if (publisher == Y && (!publisher.getEvent(LOGEVENT))) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5562);
publisher.publish(LOGEVENT, {
                        broadcast: 2
                    });
                }

                _yuitest_coverline("/build/yui-base/yui-base.js", 5567);
publisher.fire(LOGEVENT, {
                    msg: msg,
                    cat: cat,
                    src: src
                });
            }
        }
    }

    _yuitest_coverline("/build/yui-base/yui-base.js", 5576);
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
 *                        Custom categories can be used as well. (opt).
 * @param  {String}  src  The source of the the message (opt).
 * @param  {boolean} silent If true, the log event won't fire.
 * @return {YUI}      YUI instance.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 5592);
INSTANCE.message = function() {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "message", 5592);
_yuitest_coverline("/build/yui-base/yui-base.js", 5593);
return INSTANCE.log.apply(INSTANCE, arguments);
};


}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-base/yui-base.js", 5598);
YUI.add('yui-later', function(Y) {

/**
 * Provides a setTimeout/setInterval wrapper. This module is a `core` YUI module, <a href="../classes/YUI.html#method_later">it's documentation is located under the YUI class</a>.
 *
 * @module yui
 * @submodule yui-later
 */

_yuitest_coverfunc("/build/yui-base/yui-base.js", "(anonymous 31)", 5598);
_yuitest_coverline("/build/yui-base/yui-base.js", 5607);
var NO_ARGS = [];

/**
 * Executes the supplied function in the context of the supplied
 * object 'when' milliseconds later.  Executes the function a
 * single time unless periodic is set to true.
 * @for YUI
 * @method later
 * @param when {int} the number of milliseconds to wait until the fn
 * is executed.
 * @param o the context object.
 * @param fn {Function|String} the function to execute or the name of
 * the method in the 'o' object to execute.
 * @param data [Array] data that is provided to the function.  This
 * accepts either a single item or an array.  If an array is provided,
 * the function is executed with one parameter for each array item.
 * If you need to pass a single array parameter, it needs to be wrapped
 * in an array [myarray].
 *
 * Note: native methods in IE may not have the call and apply methods.
 * In this case, it will work, but you are limited to four arguments.
 *
 * @param periodic {boolean} if true, executes continuously at supplied
 * interval until canceled.
 * @return {object} a timer object. Call the cancel() method on this
 * object to stop the timer.
 */
_yuitest_coverline("/build/yui-base/yui-base.js", 5634);
Y.later = function(when, o, fn, data, periodic) {
    _yuitest_coverfunc("/build/yui-base/yui-base.js", "later", 5634);
_yuitest_coverline("/build/yui-base/yui-base.js", 5635);
when = when || 0;
    _yuitest_coverline("/build/yui-base/yui-base.js", 5636);
data = (!Y.Lang.isUndefined(data)) ? Y.Array(data) : NO_ARGS;
    _yuitest_coverline("/build/yui-base/yui-base.js", 5637);
o = o || Y.config.win || Y;

    _yuitest_coverline("/build/yui-base/yui-base.js", 5639);
var cancelled = false,
        method = (o && Y.Lang.isString(fn)) ? o[fn] : fn,
        wrapper = function() {
            // IE 8- may execute a setInterval callback one last time
            // after clearInterval was called, so in order to preserve
            // the cancel() === no more runny-run, we have to jump through
            // an extra hoop.
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "wrapper", 5641);
_yuitest_coverline("/build/yui-base/yui-base.js", 5646);
if (!cancelled) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5647);
if (!method.apply) {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5648);
method(data[0], data[1], data[2], data[3]);
                } else {
                    _yuitest_coverline("/build/yui-base/yui-base.js", 5650);
method.apply(o, data || NO_ARGS);
                }
            }
        },
        id = (periodic) ? setInterval(wrapper, when) : setTimeout(wrapper, when);

    _yuitest_coverline("/build/yui-base/yui-base.js", 5656);
return {
        id: id,
        interval: periodic,
        cancel: function() {
            _yuitest_coverfunc("/build/yui-base/yui-base.js", "cancel", 5659);
_yuitest_coverline("/build/yui-base/yui-base.js", 5660);
cancelled = true;
            _yuitest_coverline("/build/yui-base/yui-base.js", 5661);
if (this.interval) {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5662);
clearInterval(id);
            } else {
                _yuitest_coverline("/build/yui-base/yui-base.js", 5664);
clearTimeout(id);
            }
        }
    };
};

_yuitest_coverline("/build/yui-base/yui-base.js", 5670);
Y.Lang.later = Y.later;



}, '@VERSION@' ,{requires:['yui-base']});


_yuitest_coverline("/build/yui-base/yui-base.js", 5677);
YUI.add('yui', function(Y){}, '@VERSION@' ,{use:['yui-base','get','features','intl-base','yui-log','yui-later']});

