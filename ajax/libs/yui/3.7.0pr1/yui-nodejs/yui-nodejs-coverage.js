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
_yuitest_coverage["/build/yui-nodejs/yui-nodejs.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/yui-nodejs/yui-nodejs.js",
    code: []
};
_yuitest_coverage["/build/yui-nodejs/yui-nodejs.js"].code=["/**"," * The YUI module contains the components required for building the YUI seed"," * file.  This includes the script loading mechanism, a simple queue, and"," * the core utilities for the library."," * @module yui"," * @main yui"," * @submodule yui-base"," */","","if (typeof YUI != 'undefined') {","    YUI._YUI = YUI;","}","","/**","The YUI global namespace object.  If YUI is already defined, the","existing YUI object will not be overwritten so that defined","namespaces are preserved.  It is the constructor for the object","the end user interacts with.  As indicated below, each instance","has full custom event support, but only if the event system","is available.  This is a self-instantiable factory function.  You","can invoke it directly like this:","","     YUI().use('*', function(Y) {","         // ready","     });","","But it also works like this:","","     var Y = YUI();","","Configuring the YUI object:","","    YUI({","        debug: true,","        combine: false","    }).use('node', function(Y) {","        //Node is ready to use","    });","","See the API docs for the <a href=\"config.html\">Config</a> class","for the complete list of supported configuration properties accepted","by the YUI constuctor.","","@class YUI","@constructor","@global","@uses EventTarget","@param [o]* {Object} 0..n optional configuration objects.  these values","are store in Y.config.  See <a href=\"config.html\">Config</a> for the list of supported","properties.","*/","    /*global YUI*/","    /*global YUI_config*/","    var YUI = function() {","        var i = 0,","            Y = this,","            args = arguments,","            l = args.length,","            instanceOf = function(o, type) {","                return (o && o.hasOwnProperty && (o instanceof type));","            },","            gconf = (typeof YUI_config !== 'undefined') && YUI_config;","","        if (!(instanceOf(Y, YUI))) {","            Y = new YUI();","        } else {","            // set up the core environment","            Y._init();","","            /**","                YUI.GlobalConfig is a master configuration that might span","                multiple contexts in a non-browser environment.  It is applied","                first to all instances in all contexts.","                @property GlobalConfig","                @type {Object}","                @global","                @static","                @example","","","                    YUI.GlobalConfig = {","                        filter: 'debug'","                    };","","                    YUI().use('node', function(Y) {","                        //debug files used here","                    });","","                    YUI({","                        filter: 'min'","                    }).use('node', function(Y) {","                        //min files used here","                    });","","            */","            if (YUI.GlobalConfig) {","                Y.applyConfig(YUI.GlobalConfig);","            }","","            /**","                YUI_config is a page-level config.  It is applied to all","                instances created on the page.  This is applied after","                YUI.GlobalConfig, and before the instance level configuration","                objects.","                @global","                @property YUI_config","                @type {Object}","                @example","","","                    //Single global var to include before YUI seed file","                    YUI_config = {","                        filter: 'debug'","                    };","","                    YUI().use('node', function(Y) {","                        //debug files used here","                    });","","                    YUI({","                        filter: 'min'","                    }).use('node', function(Y) {","                        //min files used here","                    });","            */","            if (gconf) {","                Y.applyConfig(gconf);","            }","","            // bind the specified additional modules for this instance","            if (!l) {","                Y._setup();","            }","        }","","        if (l) {","            // Each instance can accept one or more configuration objects.","            // These are applied after YUI.GlobalConfig and YUI_Config,","            // overriding values set in those config files if there is a '","            // matching property.","            for (; i < l; i++) {","                Y.applyConfig(args[i]);","            }","","            Y._setup();","        }","","        Y.instanceOf = instanceOf;","","        return Y;","    };","","(function() {","","    var proto, prop,","        VERSION = '@VERSION@',","        PERIOD = '.',","        BASE = 'http://yui.yahooapis.com/',","        /*","            These CSS class names can't be generated by","            getClassName since it is not available at the","            time they are being used.","        */","        DOC_LABEL = 'yui3-js-enabled',","        CSS_STAMP_EL = 'yui3-css-stamp',","        NOOP = function() {},","        SLICE = Array.prototype.slice,","        APPLY_TO_AUTH = { 'io.xdrReady': 1,   // the functions applyTo","                          'io.xdrResponse': 1,   // can call. this should","                          'SWF.eventHandler': 1 }, // be done at build time","        hasWin = (typeof window != 'undefined'),","        win = (hasWin) ? window : null,","        doc = (hasWin) ? win.document : null,","        docEl = doc && doc.documentElement,","        docClass = docEl && docEl.className,","        instances = {},","        time = new Date().getTime(),","        add = function(el, type, fn, capture) {","            if (el && el.addEventListener) {","                el.addEventListener(type, fn, capture);","            } else if (el && el.attachEvent) {","                el.attachEvent('on' + type, fn);","            }","        },","        remove = function(el, type, fn, capture) {","            if (el && el.removeEventListener) {","                // this can throw an uncaught exception in FF","                try {","                    el.removeEventListener(type, fn, capture);","                } catch (ex) {}","            } else if (el && el.detachEvent) {","                el.detachEvent('on' + type, fn);","            }","        },","        handleLoad = function() {","            YUI.Env.windowLoaded = true;","            YUI.Env.DOMReady = true;","            if (hasWin) {","                remove(window, 'load', handleLoad);","            }","        },","        getLoader = function(Y, o) {","            var loader = Y.Env._loader,","                lCore = [ 'loader-base' ],","                G_ENV = YUI.Env,","                mods = G_ENV.mods;","","            if (loader) {","                //loader._config(Y.config);","                loader.ignoreRegistered = false;","                loader.onEnd = null;","                loader.data = null;","                loader.required = [];","                loader.loadType = null;","            } else {","                loader = new Y.Loader(Y.config);","                Y.Env._loader = loader;","            }","            if (mods && mods.loader) {","                lCore = [].concat(lCore, YUI.Env.loaderExtras);","            }","            YUI.Env.core = Y.Array.dedupe([].concat(YUI.Env.core, lCore));","","            return loader;","        },","","        clobber = function(r, s) {","            for (var i in s) {","                if (s.hasOwnProperty(i)) {","                    r[i] = s[i];","                }","            }","        },","","        ALREADY_DONE = { success: true };","","//  Stamp the documentElement (HTML) with a class of \"yui-loaded\" to","//  enable styles that need to key off of JS being enabled.","if (docEl && docClass.indexOf(DOC_LABEL) == -1) {","    if (docClass) {","        docClass += ' ';","    }","    docClass += DOC_LABEL;","    docEl.className = docClass;","}","","if (VERSION.indexOf('@') > -1) {","    VERSION = '3.5.0'; // dev time hack for cdn test","}","","proto = {","    /**","     * Applies a new configuration object to the YUI instance config.","     * This will merge new group/module definitions, and will also","     * update the loader cache if necessary.  Updating Y.config directly","     * will not update the cache.","     * @method applyConfig","     * @param {Object} o the configuration object.","     * @since 3.2.0","     */","    applyConfig: function(o) {","","        o = o || NOOP;","","        var attr,","            name,","            // detail,","            config = this.config,","            mods = config.modules,","            groups = config.groups,","            aliases = config.aliases,","            loader = this.Env._loader;","","        for (name in o) {","            if (o.hasOwnProperty(name)) {","                attr = o[name];","                if (mods && name == 'modules') {","                    clobber(mods, attr);","                } else if (aliases && name == 'aliases') {","                    clobber(aliases, attr);","                } else if (groups && name == 'groups') {","                    clobber(groups, attr);","                } else if (name == 'win') {","                    config[name] = (attr && attr.contentWindow) || attr;","                    config.doc = config[name] ? config[name].document : null;","                } else if (name == '_yuid') {","                    // preserve the guid","                } else {","                    config[name] = attr;","                }","            }","        }","","        if (loader) {","            loader._config(o);","        }","","    },","    /**","    * Old way to apply a config to the instance (calls `applyConfig` under the hood)","    * @private","    * @method _config","    * @param {Object} o The config to apply","    */","    _config: function(o) {","        this.applyConfig(o);","    },","","    /**","     * Initialize this YUI instance","     * @private","     * @method _init","     */","    _init: function() {","        var filter, el,","            Y = this,","            G_ENV = YUI.Env,","            Env = Y.Env,","            prop;","","        /**","         * The version number of the YUI instance.","         * @property version","         * @type string","         */","        Y.version = VERSION;","","        if (!Env) {","            Y.Env = {","                core: ['get','features','intl-base','yui-log', 'yui-log-nodejs', 'yui-later','loader-base', 'loader-rollup', 'loader-yui3'],","                loaderExtras: ['loader-rollup', 'loader-yui3'],","                mods: {}, // flat module map","                versions: {}, // version module map","                base: BASE,","                cdn: BASE + VERSION + '/build/',","                // bootstrapped: false,","                _idx: 0,","                _used: {},","                _attached: {},","                _missed: [],","                _yidx: 0,","                _uidx: 0,","                _guidp: 'y',","                _loaded: {},","                // serviced: {},","                // Regex in English:","                // I'll start at the \\b(simpleyui).","                // 1. Look in the test string for \"simpleyui\" or \"yui\" or","                //    \"yui-base\" or \"yui-davglass\" or \"yui-foobar\" that comes after a word break.  That is, it","                //    can't match \"foyui\" or \"i_heart_simpleyui\". This can be anywhere in the string.","                // 2. After #1 must come a forward slash followed by the string matched in #1, so","                //    \"yui-base/yui-base\" or \"simpleyui/simpleyui\" or \"yui-pants/yui-pants\".","                // 3. The second occurence of the #1 token can optionally be followed by \"-debug\" or \"-min\",","                //    so \"yui/yui-min\", \"yui/yui-debug\", \"yui-base/yui-base-debug\". NOT \"yui/yui-tshirt\".","                // 4. This is followed by \".js\", so \"yui/yui.js\", \"simpleyui/simpleyui-min.js\"","                // 0. Going back to the beginning, now. If all that stuff in 1-4 comes after a \"?\" in the string,","                //    then capture the junk between the LAST \"&\" and the string in 1-4.  So","                //    \"blah?foo/yui/yui.js\" will capture \"foo/\" and \"blah?some/thing.js&3.3.0/build/yui-davglass/yui-davglass.js\"","                //    will capture \"3.3.0/build/\"","                //","                // Regex Exploded:","                // (?:\\?             Find a ?","                //   (?:[^&]*&)      followed by 0..n characters followed by an &","                //   *               in fact, find as many sets of characters followed by a & as you can","                //   ([^&]*)         capture the stuff after the last & in \\1","                // )?                but it's ok if all this ?junk&more_junk stuff isn't even there","                // \\b(simpleyui|     after a word break find either the string \"simpleyui\" or","                //    yui(?:-\\w+)?   the string \"yui\" optionally followed by a -, then more characters","                // )                 and store the simpleyui or yui-* string in \\2","                // \\/\\2              then comes a / followed by the simpleyui or yui-* string in \\2","                // (?:-(min|debug))? optionally followed by \"-min\" or \"-debug\"","                // .js               and ending in \".js\"","                _BASE_RE: /(?:\\?(?:[^&]*&)*([^&]*))?\\b(simpleyui|yui(?:-\\w+)?)\\/\\2(?:-(min|debug))?\\.js/,","                parseBasePath: function(src, pattern) {","                    var match = src.match(pattern),","                        path, filter;","","                    if (match) {","                        path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));","","                        // this is to set up the path to the loader.  The file","                        // filter for loader should match the yui include.","                        filter = match[3];","","                        // extract correct path for mixed combo urls","                        // http://yuilibrary.com/projects/yui3/ticket/2528423","                        if (match[1]) {","                            path += '?' + match[1];","                        }","                        path = {","                            filter: filter,","                            path: path","                        }","                    }","                    return path;","                },","                getBase: G_ENV && G_ENV.getBase ||","                        function(pattern) {","                            var nodes = (doc && doc.getElementsByTagName('script')) || [],","                                path = Env.cdn, parsed,","                                i, len, src;","","                            for (i = 0, len = nodes.length; i < len; ++i) {","                                src = nodes[i].src;","                                if (src) {","                                    parsed = Y.Env.parseBasePath(src, pattern);","                                    if (parsed) {","                                        filter = parsed.filter;","                                        path = parsed.path;","                                        break;","                                    }","                                }","                            }","","                            // use CDN default","                            return path;","                        }","","            };","","            Env = Y.Env;","","            Env._loaded[VERSION] = {};","","            if (G_ENV && Y !== YUI) {","                Env._yidx = ++G_ENV._yidx;","                Env._guidp = ('yui_' + VERSION + '_' +","                             Env._yidx + '_' + time).replace(/\\./g, '_').replace(/-/g, '_');","            } else if (YUI._YUI) {","","                G_ENV = YUI._YUI.Env;","                Env._yidx += G_ENV._yidx;","                Env._uidx += G_ENV._uidx;","","                for (prop in G_ENV) {","                    if (!(prop in Env)) {","                        Env[prop] = G_ENV[prop];","                    }","                }","","                delete YUI._YUI;","            }","","            Y.id = Y.stamp(Y);","            instances[Y.id] = Y;","","        }","","        Y.constructor = YUI;","","        // configuration defaults","        Y.config = Y.config || {","            bootstrap: true,","            cacheUse: true,","            debug: true,","            doc: doc,","            fetchCSS: true,","            throwFail: true,","            useBrowserConsole: true,","            useNativeES5: true,","            win: win","        };","","        //Register the CSS stamp element","        if (doc && !doc.getElementById(CSS_STAMP_EL)) {","            el = doc.createElement('div');","            el.innerHTML = '<div id=\"' + CSS_STAMP_EL + '\" style=\"position: absolute !important; visibility: hidden !important\"></div>';","            YUI.Env.cssStampEl = el.firstChild;","            if (doc.body) {","                doc.body.appendChild(YUI.Env.cssStampEl);","            } else {","                docEl.insertBefore(YUI.Env.cssStampEl, docEl.firstChild);","            }","        }","","        Y.config.lang = Y.config.lang || 'en-US';","","        Y.config.base = YUI.config.base || Y.Env.getBase(Y.Env._BASE_RE);","","        if (!filter || (!('mindebug').indexOf(filter))) {","            filter = 'min';","        }","        filter = (filter) ? '-' + filter : filter;","        Y.config.loaderPath = YUI.config.loaderPath || 'loader/loader' + filter + '.js';","","    },","","    /**","     * Finishes the instance setup. Attaches whatever modules were defined","     * when the yui modules was registered.","     * @method _setup","     * @private","     */","    _setup: function(o) {","        var i, Y = this,","            core = [],","            mods = YUI.Env.mods,","            extras = Y.config.core || [].concat(YUI.Env.core); //Clone it..","","        for (i = 0; i < extras.length; i++) {","            if (mods[extras[i]]) {","                core.push(extras[i]);","            }","        }","","        Y._attach(['yui-base']);","        Y._attach(core);","","        if (Y.Loader) {","            getLoader(Y);","        }","","    },","","    /**","     * Executes a method on a YUI instance with","     * the specified id if the specified method is whitelisted.","     * @method applyTo","     * @param id {String} the YUI instance id.","     * @param method {String} the name of the method to exectute.","     * Ex: 'Object.keys'.","     * @param args {Array} the arguments to apply to the method.","     * @return {Object} the return value from the applied method or null.","     */","    applyTo: function(id, method, args) {","        if (!(method in APPLY_TO_AUTH)) {","            this.log(method + ': applyTo not allowed', 'warn', 'yui');","            return null;","        }","","        var instance = instances[id], nest, m, i;","        if (instance) {","            nest = method.split('.');","            m = instance;","            for (i = 0; i < nest.length; i = i + 1) {","                m = m[nest[i]];","                if (!m) {","                    this.log('applyTo not found: ' + method, 'warn', 'yui');","                }","            }","            return m && m.apply(instance, args);","        }","","        return null;","    },","","/**","Registers a module with the YUI global.  The easiest way to create a","first-class YUI module is to use the YUI component build tool.","","http://yuilibrary.com/projects/builder","","The build system will produce the `YUI.add` wrapper for you module, along","with any configuration info required for the module.","@method add","@param name {String} module name.","@param fn {Function} entry point into the module that is used to bind module to the YUI instance.","@param {YUI} fn.Y The YUI instance this module is executed in.","@param {String} fn.name The name of the module","@param version {String} version string.","@param details {Object} optional config data:","@param details.requires {Array} features that must be present before this module can be attached.","@param details.optional {Array} optional features that should be present if loadOptional"," is defined.  Note: modules are not often loaded this way in YUI 3,"," but this field is still useful to inform the user that certain"," features in the component will require additional dependencies.","@param details.use {Array} features that are included within this module which need to"," be attached automatically when this module is attached.  This"," supports the YUI 3 rollup system -- a module with submodules"," defined will need to have the submodules listed in the 'use'"," config.  The YUI component build tool does this for you.","@return {YUI} the YUI instance.","@example","","    YUI.add('davglass', function(Y, name) {","        Y.davglass = function() {","            alert('Dav was here!');","        };","    }, '3.4.0', { requires: ['yui-base', 'harley-davidson', 'mt-dew'] });","","*/","    add: function(name, fn, version, details) {","        details = details || {};","        var env = YUI.Env,","            mod = {","                name: name,","                fn: fn,","                version: version,","                details: details","            },","            //Instance hash so we don't apply it to the same instance twice","            applied = {},","            loader, inst,","            i, versions = env.versions;","","        env.mods[name] = mod;","        versions[version] = versions[version] || {};","        versions[version][name] = mod;","","        for (i in instances) {","            if (instances.hasOwnProperty(i)) {","                inst = instances[i];","                if (!applied[inst.id]) {","                    applied[inst.id] = true;","                    loader = inst.Env._loader;","                    if (loader) {","                        if (!loader.moduleInfo[name] || loader.moduleInfo[name].temp) {","                            loader.addModule(details, name);","                        }","                    }","                }","            }","        }","","        return this;","    },","","    /**","     * Executes the function associated with each required","     * module, binding the module to the YUI instance.","     * @param {Array} r The array of modules to attach","     * @param {Boolean} [moot=false] Don't throw a warning if the module is not attached","     * @method _attach","     * @private","     */","    _attach: function(r, moot) {","        var i, name, mod, details, req, use, after,","            mods = YUI.Env.mods,","            aliases = YUI.Env.aliases,","            Y = this, j,","            cache = YUI.Env._renderedMods,","            loader = Y.Env._loader,","            done = Y.Env._attached,","            len = r.length, loader, def, go,","            c = [];","","        //Check for conditional modules (in a second+ instance) and add their requirements","        //TODO I hate this entire method, it needs to be fixed ASAP (3.5.0) ^davglass","        for (i = 0; i < len; i++) {","            name = r[i];","            mod = mods[name];","            c.push(name);","            if (loader && loader.conditions[name]) {","                for (j in loader.conditions[name]) {","                    if (loader.conditions[name].hasOwnProperty(j)) {","                        def = loader.conditions[name][j];","                        go = def && ((def.ua && Y.UA[def.ua]) || (def.test && def.test(Y)));","                        if (go) {","                            c.push(def.name);","                        }","                    }","                }","            }","        }","        r = c;","        len = r.length;","","        for (i = 0; i < len; i++) {","            if (!done[r[i]]) {","                name = r[i];","                mod = mods[name];","","                if (aliases && aliases[name] && !mod) {","                    Y._attach(aliases[name]);","                    continue;","                }","                if (!mod) {","                    if (loader && loader.moduleInfo[name]) {","                        mod = loader.moduleInfo[name];","                        moot = true;","                    }","","","                    //if (!loader || !loader.moduleInfo[name]) {","                    //if ((!loader || !loader.moduleInfo[name]) && !moot) {","                    if (!moot && name) {","                        if ((name.indexOf('skin-') === -1) && (name.indexOf('css') === -1)) {","                            Y.Env._missed.push(name);","                            Y.Env._missed = Y.Array.dedupe(Y.Env._missed);","                            Y.message('NOT loaded: ' + name, 'warn', 'yui');","                        }","                    }","                } else {","                    done[name] = true;","                    //Don't like this, but in case a mod was asked for once, then we fetch it","                    //We need to remove it from the missed list ^davglass","                    for (j = 0; j < Y.Env._missed.length; j++) {","                        if (Y.Env._missed[j] === name) {","                            Y.message('Found: ' + name + ' (was reported as missing earlier)', 'warn', 'yui');","                            Y.Env._missed.splice(j, 1);","                        }","                    }","                    /*","                        If it's a temp module, we need to redo it's requirements if it's already loaded","                        since it may have been loaded by another instance and it's dependencies might","                        have been redefined inside the fetched file.","                    */","                    if (loader && cache && cache[name] && cache[name].temp) {","                        loader.getRequires(cache[name]);","                        req = [];","                        for (j in loader.moduleInfo[name].expanded_map) {","                            if (loader.moduleInfo[name].expanded_map.hasOwnProperty(j)) {","                                req.push(j);","                            }","                        }","                        Y._attach(req);","                    }","                    ","                    details = mod.details;","                    req = details.requires;","                    use = details.use;","                    after = details.after;","                    //Force Intl load if there is a language (Loader logic) @todo fix this shit","                    if (details.lang) {","                        req = req || [];","                        req.unshift('intl');","                    }","","                    if (req) {","                        for (j = 0; j < req.length; j++) {","                            if (!done[req[j]]) {","                                if (!Y._attach(req)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","                    if (after) {","                        for (j = 0; j < after.length; j++) {","                            if (!done[after[j]]) {","                                if (!Y._attach(after, true)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","                    if (mod.fn) {","                            if (Y.config.throwFail) {","                                mod.fn(Y, name);","                            } else {","                                try {","                                    mod.fn(Y, name);","                                } catch (e) {","                                    Y.error('Attach error: ' + name, e, name);","                                return false;","                            }","                        }","                    }","","                    if (use) {","                        for (j = 0; j < use.length; j++) {","                            if (!done[use[j]]) {","                                if (!Y._attach(use)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","","","                }","            }","        }","","        return true;","    },","    /**","    * Delays the `use` callback until another event has taken place. Like: window.onload, domready, contentready, available.","    * @private","    * @method _delayCallback","    * @param {Callback} cb The original `use` callback","    * @param {String|Object} until Either an event (load, domready) or an Object containing event/args keys for contentready/available","    */","    _delayCallback: function(cb, until) {","","        var Y = this,","            mod = ['event-base'];","","        until = (Y.Lang.isObject(until) ? until : { event: until });","","        if (until.event === 'load') {","            mod.push('event-synthetic');","        }","","        return function() {","            var args = arguments;","            Y._use(mod, function() {","                Y.on(until.event, function() {","                    args[1].delayUntil = until.event;","                    cb.apply(Y, args);","                }, until.args);","            });","        };","    },","","    /**","     * Attaches one or more modules to the YUI instance.  When this","     * is executed, the requirements are analyzed, and one of","     * several things can happen:","     *","     *  * All requirements are available on the page --  The modules","     *   are attached to the instance.  If supplied, the use callback","     *   is executed synchronously.","     *","     *  * Modules are missing, the Get utility is not available OR","     *   the 'bootstrap' config is false -- A warning is issued about","     *   the missing modules and all available modules are attached.","     *","     *  * Modules are missing, the Loader is not available but the Get","     *   utility is and boostrap is not false -- The loader is bootstrapped","     *   before doing the following....","     *","     *  * Modules are missing and the Loader is available -- The loader","     *   expands the dependency tree and fetches missing modules.  When","     *   the loader is finshed the callback supplied to use is executed","     *   asynchronously.","     *","     * @method use","     * @param modules* {String|Array} 1-n modules to bind (uses arguments array).","     * @param [callback] {Function} callback function executed when","     * the instance has the required functionality.  If included, it","     * must be the last parameter.","     * @param callback.Y {YUI} The `YUI` instance created for this sandbox","     * @param callback.status {Object} Object containing `success`, `msg` and `data` properties","     *","     * @example","     *      // loads and attaches dd and its dependencies","     *      YUI().use('dd', function(Y) {});","     *","     *      // loads and attaches dd and node as well as all of their dependencies (since 3.4.0)","     *      YUI().use(['dd', 'node'], function(Y) {});","     *","     *      // attaches all modules that are available on the page","     *      YUI().use('*', function(Y) {});","     *","     *      // intrinsic YUI gallery support (since 3.1.0)","     *      YUI().use('gallery-yql', function(Y) {});","     *","     *      // intrinsic YUI 2in3 support (since 3.1.0)","     *      YUI().use('yui2-datatable', function(Y) {});","     *","     * @return {YUI} the YUI instance.","     */","    use: function() {","        var args = SLICE.call(arguments, 0),","            callback = args[args.length - 1],","            Y = this,","            i = 0,","            a = [],","            name,","            Env = Y.Env,","            provisioned = true;","","        // The last argument supplied to use can be a load complete callback","        if (Y.Lang.isFunction(callback)) {","            args.pop();","            if (Y.config.delayUntil) {","                callback = Y._delayCallback(callback, Y.config.delayUntil);","            }","        } else {","            callback = null;","        }","        if (Y.Lang.isArray(args[0])) {","            args = args[0];","        }","","        if (Y.config.cacheUse) {","            while ((name = args[i++])) {","                if (!Env._attached[name]) {","                    provisioned = false;","                    break;","                }","            }","","            if (provisioned) {","                if (args.length) {","                }","                Y._notify(callback, ALREADY_DONE, args);","                return Y;","            }","        }","","        if (Y._loading) {","            Y._useQueue = Y._useQueue || new Y.Queue();","            Y._useQueue.add([args, callback]);","        } else {","            Y._use(args, function(Y, response) {","                Y._notify(callback, response, args);","            });","        }","","        return Y;","    },","    /**","    * Notify handler from Loader for attachment/load errors","    * @method _notify","    * @param callback {Function} The callback to pass to the `Y.config.loadErrorFn`","    * @param response {Object} The response returned from Loader","    * @param args {Array} The aruments passed from Loader","    * @private","    */","    _notify: function(callback, response, args) {","        if (!response.success && this.config.loadErrorFn) {","            this.config.loadErrorFn.call(this, this, callback, response, args);","        } else if (callback) {","            if (this.Env._missed && this.Env._missed.length) {","                response.msg = 'Missing modules: ' + this.Env._missed.join();","                response.success = false;","            }","            if (this.config.throwFail) {","                callback(this, response);","            } else {","                try {","                    callback(this, response);","                } catch (e) {","                    this.error('use callback error', e, args);","                }","            }","        }","    },","","    /**","    * This private method is called from the `use` method queue. To ensure that only one set of loading","    * logic is performed at a time.","    * @method _use","    * @private","    * @param args* {String} 1-n modules to bind (uses arguments array).","    * @param *callback {Function} callback function executed when","    * the instance has the required functionality.  If included, it","    * must be the last parameter.","    */","    _use: function(args, callback) {","","        if (!this.Array) {","            this._attach(['yui-base']);","        }","","        var len, loader, handleBoot, handleRLS,","            Y = this,","            G_ENV = YUI.Env,","            mods = G_ENV.mods,","            Env = Y.Env,","            used = Env._used,","            aliases = G_ENV.aliases,","            queue = G_ENV._loaderQueue,","            firstArg = args[0],","            YArray = Y.Array,","            config = Y.config,","            boot = config.bootstrap,","            missing = [],","            i,","            r = [],","            ret = true,","            fetchCSS = config.fetchCSS,","            process = function(names, skip) {","","                var i = 0, a = [], name, len, m, req, use;","","                if (!names.length) {","                    return;","                }","","                if (aliases) {","                    len = names.length;","                    for (i = 0; i < len; i++) {","                        if (aliases[names[i]] && !mods[names[i]]) {","                            a = [].concat(a, aliases[names[i]]);","                        } else {","                            a.push(names[i]);","                        }","                    }","                    names = a;","                }","                ","                len = names.length;","                ","                for (i = 0; i < len; i++) {","                    name = names[i];","                    if (!skip) {","                        r.push(name);","                    }","","                    // only attach a module once","                    if (used[name]) {","                        continue;","                    }","                    ","                    m = mods[name];","                    req = null;","                    use = null;","","                    if (m) {","                        used[name] = true;","                        req = m.details.requires;","                        use = m.details.use;","                    } else {","                        // CSS files don't register themselves, see if it has","                        // been loaded","                        if (!G_ENV._loaded[VERSION][name]) {","                            missing.push(name);","                        } else {","                            used[name] = true; // probably css","                        }","                    }","","                    // make sure requirements are attached","                    if (req && req.length) {","                        process(req);","                    }","","                    // make sure we grab the submodule dependencies too","                    if (use && use.length) {","                        process(use, 1);","                    }","                }","","            },","","            handleLoader = function(fromLoader) {","                var response = fromLoader || {","                        success: true,","                        msg: 'not dynamic'","                    },","                    redo, origMissing,","                    ret = true,","                    data = response.data;","","                Y._loading = false;","","                if (data) {","                    origMissing = missing;","                    missing = [];","                    r = [];","                    process(data);","                    redo = missing.length;","                    if (redo) {","                        if ([].concat(missing).sort().join() ==","                                origMissing.sort().join()) {","                            redo = false;","                        }","                    }","                }","","                if (redo && data) {","                    Y._loading = true;","                    Y._use(missing, function() {","                        if (Y._attach(data)) {","                            Y._notify(callback, response, data);","                        }","                    });","                } else {","                    if (data) {","                        ret = Y._attach(data);","                    }","                    if (ret) {","                        Y._notify(callback, response, args);","                    }","                }","","                if (Y._useQueue && Y._useQueue.size() && !Y._loading) {","                    Y._use.apply(Y, Y._useQueue.next());","                }","","            };","","","        // YUI().use('*'); // bind everything available","        if (firstArg === '*') {","            args = [];","            for (i in mods) {","                if (mods.hasOwnProperty(i)) {","                    args.push(i);","                }","            }","            ret = Y._attach(args);","            if (ret) {","                handleLoader();","            }","            return Y;","        }","","        if ((mods.loader || mods['loader-base']) && !Y.Loader) {","            Y._attach(['loader' + ((!mods.loader) ? '-base' : '')]);","        }","","","        // use loader to expand dependencies and sort the","        // requirements if it is available.","        if (boot && Y.Loader && args.length) {","            loader = getLoader(Y);","            loader.require(args);","            loader.ignoreRegistered = true;","            loader._boot = true;","            loader.calculate(null, (fetchCSS) ? null : 'js');","            args = loader.sorted;","            loader._boot = false;","        }","        ","        process(args);","","        len = missing.length;","","","        if (len) {","            missing = YArray.dedupe(missing);","            len = missing.length;","        }","","","        // dynamic load","        if (boot && len && Y.Loader) {","            Y._loading = true;","            loader = getLoader(Y);","            loader.onEnd = handleLoader;","            loader.context = Y;","            loader.data = args;","            loader.ignoreRegistered = false;","            loader.require(args);","            loader.insert(null, (fetchCSS) ? null : 'js');","","        } else if (boot && len && Y.Get && !Env.bootstrapped) {","","            Y._loading = true;","","            handleBoot = function() {","                Y._loading = false;","                queue.running = false;","                Env.bootstrapped = true;","                G_ENV._bootstrapping = false;","                if (Y._attach(['loader'])) {","                    Y._use(args, callback);","                }","            };","","            if (G_ENV._bootstrapping) {","                queue.add(handleBoot);","            } else {","                G_ENV._bootstrapping = true;","                Y.Get.script(config.base + config.loaderPath, {","                    onEnd: handleBoot","                });","            }","","        } else {","            ret = Y._attach(args);","            if (ret) {","                handleLoader();","            }","        }","","        return Y;","    },","","","    /**","    Adds a namespace object onto the YUI global if called statically.","","        // creates YUI.your.namespace.here as nested objects","        YUI.namespace(\"your.namespace.here\");","","    If called as a method on a YUI <em>instance</em>, it creates the","    namespace on the instance.","","         // creates Y.property.package","         Y.namespace(\"property.package\");","","    Dots in the input string cause `namespace` to create nested objects for","    each token. If any part of the requested namespace already exists, the","    current object will be left in place.  This allows multiple calls to","    `namespace` to preserve existing namespaced properties.","","    If the first token in the namespace string is \"YAHOO\", the token is","    discarded.","","    Be careful with namespace tokens. Reserved words may work in some browsers","    and not others. For instance, the following will fail in some browsers","    because the supported version of JavaScript reserves the word \"long\":","","         Y.namespace(\"really.long.nested.namespace\");","","    <em>Note: If you pass multiple arguments to create multiple namespaces, only","    the last one created is returned from this function.</em>","","    @method namespace","    @param  {String} namespace* namespaces to create.","    @return {Object}  A reference to the last namespace object created.","    **/","    namespace: function() {","        var a = arguments, o, i = 0, j, d, arg;","","        for (; i < a.length; i++) {","            o = this; //Reset base object per argument or it will get reused from the last","            arg = a[i];","            if (arg.indexOf(PERIOD) > -1) { //Skip this if no \".\" is present","                d = arg.split(PERIOD);","                for (j = (d[0] == 'YAHOO') ? 1 : 0; j < d.length; j++) {","                    o[d[j]] = o[d[j]] || {};","                    o = o[d[j]];","                }","            } else {","                o[arg] = o[arg] || {};","                o = o[arg]; //Reset base object to the new object so it's returned","            }","        }","        return o;","    },","","    // this is replaced if the log module is included","    log: NOOP,","    message: NOOP,","    // this is replaced if the dump module is included","    dump: function (o) { return ''+o; },","","    /**","     * Report an error.  The reporting mechanism is controlled by","     * the `throwFail` configuration attribute.  If throwFail is","     * not specified, the message is written to the Logger, otherwise","     * a JS error is thrown. If an `errorFn` is specified in the config","     * it must return `true` to keep the error from being thrown.","     * @method error","     * @param msg {String} the error message.","     * @param e {Error|String} Optional JS error that was caught, or an error string.","     * @param src Optional additional info (passed to `Y.config.errorFn` and `Y.message`)","     * and `throwFail` is specified, this error will be re-thrown.","     * @return {YUI} this YUI instance.","     */","    error: function(msg, e, src) {","        //TODO Add check for window.onerror here","","        var Y = this, ret;","","        if (Y.config.errorFn) {","            ret = Y.config.errorFn.apply(Y, arguments);","        }","","        if (!ret) {","            throw (e || new Error(msg));","        } else {","            Y.message(msg, 'error', ''+src); // don't scrub this one","        }","","        return Y;","    },","","    /**","     * Generate an id that is unique among all YUI instances","     * @method guid","     * @param pre {String} optional guid prefix.","     * @return {String} the guid.","     */","    guid: function(pre) {","        var id = this.Env._guidp + '_' + (++this.Env._uidx);","        return (pre) ? (pre + id) : id;","    },","","    /**","     * Returns a `guid` associated with an object.  If the object","     * does not have one, a new one is created unless `readOnly`","     * is specified.","     * @method stamp","     * @param o {Object} The object to stamp.","     * @param readOnly {Boolean} if `true`, a valid guid will only","     * be returned if the object has one assigned to it.","     * @return {String} The object's guid or null.","     */","    stamp: function(o, readOnly) {","        var uid;","        if (!o) {","            return o;","        }","","        // IE generates its own unique ID for dom nodes","        // The uniqueID property of a document node returns a new ID","        if (o.uniqueID && o.nodeType && o.nodeType !== 9) {","            uid = o.uniqueID;","        } else {","            uid = (typeof o === 'string') ? o : o._yuid;","        }","","        if (!uid) {","            uid = this.guid();","            if (!readOnly) {","                try {","                    o._yuid = uid;","                } catch (e) {","                    uid = null;","                }","            }","        }","        return uid;","    },","","    /**","     * Destroys the YUI instance","     * @method destroy","     * @since 3.3.0","     */","    destroy: function() {","        var Y = this;","        if (Y.Event) {","            Y.Event._unload();","        }","        delete instances[Y.id];","        delete Y.Env;","        delete Y.config;","    }","","    /**","     * instanceof check for objects that works around","     * memory leak in IE when the item tested is","     * window/document","     * @method instanceOf","     * @param o {Object} The object to check.","     * @param type {Object} The class to check against.","     * @since 3.3.0","     */","};","","    YUI.prototype = proto;","","    // inheritance utilities are not available yet","    for (prop in proto) {","        if (proto.hasOwnProperty(prop)) {","            YUI[prop] = proto[prop];","        }","    }","","    /**","Static method on the Global YUI object to apply a config to all YUI instances.","It's main use case is \"mashups\" where several third party scripts are trying to write to","a global YUI config at the same time. This way they can all call `YUI.applyConfig({})` instead of","overwriting other scripts configs.","@static","@since 3.5.0","@method applyConfig","@param {Object} o the configuration object.","@example","","    YUI.applyConfig({","        modules: {","            davglass: {","                fullpath: './davglass.js'","            }","        }","    });","","    YUI.applyConfig({","        modules: {","            foo: {","                fullpath: './foo.js'","            }","        }","    });","","    YUI().use('davglass', function(Y) {","        //Module davglass will be available here..","    });","","    */","    YUI.applyConfig = function(o) {","        if (!o) {","            return;","        }","        //If there is a GlobalConfig, apply it first to set the defaults","        if (YUI.GlobalConfig) {","            this.prototype.applyConfig.call(this, YUI.GlobalConfig);","        }","        //Apply this config to it","        this.prototype.applyConfig.call(this, o);","        //Reset GlobalConfig to the combined config","        YUI.GlobalConfig = this.config;","    };","","    // set up the environment","    YUI._init();","","    if (hasWin) {","        // add a window load event at load time so we can capture","        // the case where it fires before dynamic loading is","        // complete.","        add(window, 'load', handleLoad);","    } else {","        handleLoad();","    }","","    YUI.Env.add = add;","    YUI.Env.remove = remove;","","    /*global exports*/","    // Support the CommonJS method for exporting our single global","    if (typeof exports == 'object') {","        exports.YUI = YUI;","    }","","}());","","","/**"," * The config object contains all of the configuration options for"," * the `YUI` instance.  This object is supplied by the implementer"," * when instantiating a `YUI` instance.  Some properties have default"," * values if they are not supplied by the implementer.  This should"," * not be updated directly because some values are cached.  Use"," * `applyConfig()` to update the config object on a YUI instance that"," * has already been configured."," *"," * @class config"," * @static"," */","","/**"," * Allows the YUI seed file to fetch the loader component and library"," * metadata to dynamically load additional dependencies."," *"," * @property bootstrap"," * @type boolean"," * @default true"," */","","/**"," * Turns on writing Ylog messages to the browser console."," *"," * @property debug"," * @type boolean"," * @default true"," */","","/**"," * Log to the browser console if debug is on and the browser has a"," * supported console."," *"," * @property useBrowserConsole"," * @type boolean"," * @default true"," */","","/**"," * A hash of log sources that should be logged.  If specified, only"," * log messages from these sources will be logged."," *"," * @property logInclude"," * @type object"," */","","/**"," * A hash of log sources that should be not be logged.  If specified,"," * all sources are logged if not on this list."," *"," * @property logExclude"," * @type object"," */","","/**"," * Set to true if the yui seed file was dynamically loaded in"," * order to bootstrap components relying on the window load event"," * and the `domready` custom event."," *"," * @property injected"," * @type boolean"," * @default false"," */","","/**"," * If `throwFail` is set, `Y.error` will generate or re-throw a JS Error."," * Otherwise the failure is logged."," *"," * @property throwFail"," * @type boolean"," * @default true"," */","","/**"," * The window/frame that this instance should operate in."," *"," * @property win"," * @type Window"," * @default the window hosting YUI"," */","","/**"," * The document associated with the 'win' configuration."," *"," * @property doc"," * @type Document"," * @default the document hosting YUI"," */","","/**"," * A list of modules that defines the YUI core (overrides the default list)."," *"," * @property core"," * @type Array"," * @default [ get,features,intl-base,yui-log,yui-later,loader-base, loader-rollup, loader-yui3 ]"," */","","/**"," * A list of languages in order of preference. This list is matched against"," * the list of available languages in modules that the YUI instance uses to"," * determine the best possible localization of language sensitive modules."," * Languages are represented using BCP 47 language tags, such as \"en-GB\" for"," * English as used in the United Kingdom, or \"zh-Hans-CN\" for simplified"," * Chinese as used in China. The list can be provided as a comma-separated"," * list or as an array."," *"," * @property lang"," * @type string|string[]"," */","","/**"," * The default date format"," * @property dateFormat"," * @type string"," * @deprecated use configuration in `DataType.Date.format()` instead."," */","","/**"," * The default locale"," * @property locale"," * @type string"," * @deprecated use `config.lang` instead."," */","","/**"," * The default interval when polling in milliseconds."," * @property pollInterval"," * @type int"," * @default 20"," */","","/**"," * The number of dynamic nodes to insert by default before"," * automatically removing them.  This applies to script nodes"," * because removing the node will not make the evaluated script"," * unavailable.  Dynamic CSS is not auto purged, because removing"," * a linked style sheet will also remove the style definitions."," * @property purgethreshold"," * @type int"," * @default 20"," */","","/**"," * The default interval when polling in milliseconds."," * @property windowResizeDelay"," * @type int"," * @default 40"," */","","/**"," * Base directory for dynamic loading"," * @property base"," * @type string"," */","","/*"," * The secure base dir (not implemented)"," * For dynamic loading."," * @property secureBase"," * @type string"," */","","/**"," * The YUI combo service base dir. Ex: `http://yui.yahooapis.com/combo?`"," * For dynamic loading."," * @property comboBase"," * @type string"," */","","/**"," * The root path to prepend to module path for the combo service."," * Ex: 3.0.0b1/build/"," * For dynamic loading."," * @property root"," * @type string"," */","","/**"," * A filter to apply to result urls.  This filter will modify the default"," * path for all modules.  The default path for the YUI library is the"," * minified version of the files (e.g., event-min.js).  The filter property"," * can be a predefined filter or a custom filter.  The valid predefined"," * filters are:"," * <dl>"," *  <dt>DEBUG</dt>"," *  <dd>Selects the debug versions of the library (e.g., event-debug.js)."," *      This option will automatically include the Logger widget</dd>"," *  <dt>RAW</dt>"," *  <dd>Selects the non-minified version of the library (e.g., event.js).</dd>"," * </dl>"," * You can also define a custom filter, which must be an object literal"," * containing a search expression and a replace string:"," *"," *      myFilter: {"," *          'searchExp': \"-min\\\\.js\","," *          'replaceStr': \"-debug.js\""," *      }"," *"," * For dynamic loading."," *"," * @property filter"," * @type string|object"," */","","/**"," * The `skin` config let's you configure application level skin"," * customizations.  It contains the following attributes which"," * can be specified to override the defaults:"," *"," *      // The default skin, which is automatically applied if not"," *      // overriden by a component-specific skin definition."," *      // Change this in to apply a different skin globally"," *      defaultSkin: 'sam',"," *"," *      // This is combined with the loader base property to get"," *      // the default root directory for a skin."," *      base: 'assets/skins/',"," *"," *      // Any component-specific overrides can be specified here,"," *      // making it possible to load different skins for different"," *      // components.  It is possible to load more than one skin"," *      // for a given component as well."," *      overrides: {"," *          slider: ['capsule', 'round']"," *      }"," *"," * For dynamic loading."," *"," *  @property skin"," */","","/**"," * Hash of per-component filter specification.  If specified for a given"," * component, this overrides the filter config."," *"," * For dynamic loading."," *"," * @property filters"," */","","/**"," * Use the YUI combo service to reduce the number of http connections"," * required to load your dependencies.  Turning this off will"," * disable combo handling for YUI and all module groups configured"," * with a combo service."," *"," * For dynamic loading."," *"," * @property combine"," * @type boolean"," * @default true if 'base' is not supplied, false if it is."," */","","/**"," * A list of modules that should never be dynamically loaded"," *"," * @property ignore"," * @type string[]"," */","","/**"," * A list of modules that should always be loaded when required, even if already"," * present on the page."," *"," * @property force"," * @type string[]"," */","","/**"," * Node or id for a node that should be used as the insertion point for new"," * nodes.  For dynamic loading."," *"," * @property insertBefore"," * @type string"," */","","/**"," * Object literal containing attributes to add to dynamically loaded script"," * nodes."," * @property jsAttributes"," * @type string"," */","","/**"," * Object literal containing attributes to add to dynamically loaded link"," * nodes."," * @property cssAttributes"," * @type string"," */","","/**"," * Number of milliseconds before a timeout occurs when dynamically"," * loading nodes. If not set, there is no timeout."," * @property timeout"," * @type int"," */","","/**"," * Callback for the 'CSSComplete' event.  When dynamically loading YUI"," * components with CSS, this property fires when the CSS is finished"," * loading but script loading is still ongoing.  This provides an"," * opportunity to enhance the presentation of a loading page a little"," * bit before the entire loading process is done."," *"," * @property onCSS"," * @type function"," */","","/**"," * A hash of module definitions to add to the list of YUI components."," * These components can then be dynamically loaded side by side with"," * YUI via the `use()` method. This is a hash, the key is the module"," * name, and the value is an object literal specifying the metdata"," * for the module.  See `Loader.addModule` for the supported module"," * metadata fields.  Also see groups, which provides a way to"," * configure the base and combo spec for a set of modules."," *"," *      modules: {"," *          mymod1: {"," *              requires: ['node'],"," *              fullpath: '/mymod1/mymod1.js'"," *          },"," *          mymod2: {"," *              requires: ['mymod1'],"," *              fullpath: '/mymod2/mymod2.js'"," *          },"," *          mymod3: '/js/mymod3.js',"," *          mycssmod: '/css/mycssmod.css'"," *      }"," *"," *"," * @property modules"," * @type object"," */","","/**"," * Aliases are dynamic groups of modules that can be used as"," * shortcuts."," *"," *      YUI({"," *          aliases: {"," *              davglass: [ 'node', 'yql', 'dd' ],"," *              mine: [ 'davglass', 'autocomplete']"," *          }"," *      }).use('mine', function(Y) {"," *          //Node, YQL, DD &amp; AutoComplete available here.."," *      });"," *"," * @property aliases"," * @type object"," */","","/**"," * A hash of module group definitions.  It for each group you"," * can specify a list of modules and the base path and"," * combo spec to use when dynamically loading the modules."," *"," *      groups: {"," *          yui2: {"," *              // specify whether or not this group has a combo service"," *              combine: true,"," *"," *              // The comboSeperator to use with this group's combo handler"," *              comboSep: ';',"," *"," *              // The maxURLLength for this server"," *              maxURLLength: 500,"," *"," *              // the base path for non-combo paths"," *              base: 'http://yui.yahooapis.com/2.8.0r4/build/',"," *"," *              // the path to the combo service"," *              comboBase: 'http://yui.yahooapis.com/combo?',"," *"," *              // a fragment to prepend to the path attribute when"," *              // when building combo urls"," *              root: '2.8.0r4/build/',"," *"," *              // the module definitions"," *              modules:  {"," *                  yui2_yde: {"," *                      path: \"yahoo-dom-event/yahoo-dom-event.js\""," *                  },"," *                  yui2_anim: {"," *                      path: \"animation/animation.js\","," *                      requires: ['yui2_yde']"," *                  }"," *              }"," *          }"," *      }"," *"," * @property groups"," * @type object"," */","","/**"," * The loader 'path' attribute to the loader itself.  This is combined"," * with the 'base' attribute to dynamically load the loader component"," * when boostrapping with the get utility alone."," *"," * @property loaderPath"," * @type string"," * @default loader/loader-min.js"," */","","/**"," * Specifies whether or not YUI().use(...) will attempt to load CSS"," * resources at all.  Any truthy value will cause CSS dependencies"," * to load when fetching script.  The special value 'force' will"," * cause CSS dependencies to be loaded even if no script is needed."," *"," * @property fetchCSS"," * @type boolean|string"," * @default true"," */","","/**"," * The default gallery version to build gallery module urls"," * @property gallery"," * @type string"," * @since 3.1.0"," */","","/**"," * The default YUI 2 version to build yui2 module urls.  This is for"," * intrinsic YUI 2 support via the 2in3 project.  Also see the '2in3'"," * config for pulling different revisions of the wrapped YUI 2"," * modules."," * @since 3.1.0"," * @property yui2"," * @type string"," * @default 2.9.0"," */","","/**"," * The 2in3 project is a deployment of the various versions of YUI 2"," * deployed as first-class YUI 3 modules.  Eventually, the wrapper"," * for the modules will change (but the underlying YUI 2 code will"," * be the same), and you can select a particular version of"," * the wrapper modules via this config."," * @since 3.1.0"," * @property 2in3"," * @type string"," * @default 4"," */","","/**"," * Alternative console log function for use in environments without"," * a supported native console.  The function is executed in the"," * YUI instance context."," * @since 3.1.0"," * @property logFn"," * @type Function"," */","","/**"," * A callback to execute when Y.error is called.  It receives the"," * error message and an javascript error object if Y.error was"," * executed because a javascript error was caught.  The function"," * is executed in the YUI instance context. Returning `true` from this"," * function will stop the Error from being thrown."," *"," * @since 3.2.0"," * @property errorFn"," * @type Function"," */","","/**"," * A callback to execute when the loader fails to load one or"," * more resource.  This could be because of a script load"," * failure.  It can also fail if a javascript module fails"," * to register itself, but only when the 'requireRegistration'"," * is true.  If this function is defined, the use() callback will"," * only be called when the loader succeeds, otherwise it always"," * executes unless there was a javascript error when attaching"," * a module."," *"," * @since 3.3.0"," * @property loadErrorFn"," * @type Function"," */","","/**"," * When set to true, the YUI loader will expect that all modules"," * it is responsible for loading will be first-class YUI modules"," * that register themselves with the YUI global.  If this is"," * set to true, loader will fail if the module registration fails"," * to happen after the script is loaded."," *"," * @since 3.3.0"," * @property requireRegistration"," * @type boolean"," * @default false"," */","","/**"," * Cache serviced use() requests."," * @since 3.3.0"," * @property cacheUse"," * @type boolean"," * @default true"," * @deprecated no longer used"," */","","/**"," * Whether or not YUI should use native ES5 functionality when available for"," * features like `Y.Array.each()`, `Y.Object()`, etc. When `false`, YUI will"," * always use its own fallback implementations instead of relying on ES5"," * functionality, even when it's available."," *"," * @property useNativeES5"," * @type Boolean"," * @default true"," * @since 3.5.0"," */","","/**","Delay the `use` callback until a specific event has passed (`load`, `domready`, `contentready` or `available`)","@property delayUntil","@type String|Object","@since 3.6.0","@example","","You can use `load` or `domready` strings by default:","","    YUI({","        delayUntil: 'domready'","    }, function(Y) {","        //This will not fire until 'domeready'","    });","","Or you can delay until a node is available (with `available` or `contentready`):","","    YUI({","        delayUntil: {","            event: 'available',","            args: '#foo'","        }","    }, function(Y) {","        //This will not fire until '#foo' is ","        // available in the DOM","    });","    ","","*/","YUI.add('yui-base', function(Y) {","","/*"," * YUI stub"," * @module yui"," * @submodule yui-base"," */","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * Provides core language utilites and extensions used throughout YUI."," *"," * @class Lang"," * @static"," */","","var L = Y.Lang || (Y.Lang = {}),","","STRING_PROTO = String.prototype,","TOSTRING     = Object.prototype.toString,","","TYPES = {","    'undefined'        : 'undefined',","    'number'           : 'number',","    'boolean'          : 'boolean',","    'string'           : 'string',","    '[object Function]': 'function',","    '[object RegExp]'  : 'regexp',","    '[object Array]'   : 'array',","    '[object Date]'    : 'date',","    '[object Error]'   : 'error'","},","","SUBREGEX        = /\\{\\s*([^|}]+?)\\s*(?:\\|([^}]*))?\\s*\\}/g,","TRIMREGEX       = /^\\s+|\\s+$/g,","NATIVE_FN_REGEX = /\\{\\s*\\[(?:native code|function)\\]\\s*\\}/i;","","// -- Protected Methods --------------------------------------------------------","","/**","Returns `true` if the given function appears to be implemented in native code,","`false` otherwise. Will always return `false` -- even in ES5-capable browsers --","if the `useNativeES5` YUI config option is set to `false`.","","This isn't guaranteed to be 100% accurate and won't work for anything other than","functions, but it can be useful for determining whether a function like","`Array.prototype.forEach` is native or a JS shim provided by another library.","","There's a great article by @kangax discussing certain flaws with this technique:","<http://perfectionkills.com/detecting-built-in-host-methods/>","","While his points are valid, it's still possible to benefit from this function","as long as it's used carefully and sparingly, and in such a way that false","negatives have minimal consequences. It's used internally to avoid using","potentially broken non-native ES5 shims that have been added to the page by","other libraries.","","@method _isNative","@param {Function} fn Function to test.","@return {Boolean} `true` if _fn_ appears to be native, `false` otherwise.","@static","@protected","@since 3.5.0","**/","L._isNative = function (fn) {","    return !!(Y.config.useNativeES5 && fn && NATIVE_FN_REGEX.test(fn));","};","","// -- Public Methods -----------------------------------------------------------","","/**"," * Determines whether or not the provided item is an array."," *"," * Returns `false` for array-like collections such as the function `arguments`"," * collection or `HTMLElement` collections. Use `Y.Array.test()` if you want to"," * test for an array-like collection."," *"," * @method isArray"," * @param o The object to test."," * @return {boolean} true if o is an array."," * @static"," */","L.isArray = L._isNative(Array.isArray) ? Array.isArray : function (o) {","    return L.type(o) === 'array';","};","","/**"," * Determines whether or not the provided item is a boolean."," * @method isBoolean"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a boolean."," */","L.isBoolean = function(o) {","    return typeof o === 'boolean';","};","","/**"," * Determines whether or not the supplied item is a date instance."," * @method isDate"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a date."," */","L.isDate = function(o) {","    return L.type(o) === 'date' && o.toString() !== 'Invalid Date' && !isNaN(o);","};","","/**"," * <p>"," * Determines whether or not the provided item is a function."," * Note: Internet Explorer thinks certain functions are objects:"," * </p>"," *"," * <pre>"," * var obj = document.createElement(\"object\");"," * Y.Lang.isFunction(obj.getAttribute) // reports false in IE"," * &nbsp;"," * var input = document.createElement(\"input\"); // append to body"," * Y.Lang.isFunction(input.focus) // reports false in IE"," * </pre>"," *"," * <p>"," * You will have to implement additional tests if these functions"," * matter to you."," * </p>"," *"," * @method isFunction"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a function."," */","L.isFunction = function(o) {","    return L.type(o) === 'function';","};","","/**"," * Determines whether or not the provided item is null."," * @method isNull"," * @static"," * @param o The object to test."," * @return {boolean} true if o is null."," */","L.isNull = function(o) {","    return o === null;","};","","/**"," * Determines whether or not the provided item is a legal number."," * @method isNumber"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a number."," */","L.isNumber = function(o) {","    return typeof o === 'number' && isFinite(o);","};","","/**"," * Determines whether or not the provided item is of type object"," * or function. Note that arrays are also objects, so"," * <code>Y.Lang.isObject([]) === true</code>."," * @method isObject"," * @static"," * @param o The object to test."," * @param failfn {boolean} fail if the input is a function."," * @return {boolean} true if o is an object."," * @see isPlainObject"," */","L.isObject = function(o, failfn) {","    var t = typeof o;","    return (o && (t === 'object' ||","        (!failfn && (t === 'function' || L.isFunction(o))))) || false;","};","","/**"," * Determines whether or not the provided item is a string."," * @method isString"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a string."," */","L.isString = function(o) {","    return typeof o === 'string';","};","","/**"," * Determines whether or not the provided item is undefined."," * @method isUndefined"," * @static"," * @param o The object to test."," * @return {boolean} true if o is undefined."," */","L.isUndefined = function(o) {","    return typeof o === 'undefined';","};","","/**"," * A convenience method for detecting a legitimate non-null value."," * Returns false for null/undefined/NaN, true for other values,"," * including 0/false/''"," * @method isValue"," * @static"," * @param o The item to test."," * @return {boolean} true if it is not null/undefined/NaN || false."," */","L.isValue = function(o) {","    var t = L.type(o);","","    switch (t) {","        case 'number':","            return isFinite(o);","","        case 'null': // fallthru","        case 'undefined':","            return false;","","        default:","            return !!t;","    }","};","","/**"," * Returns the current time in milliseconds."," *"," * @method now"," * @return {Number} Current time in milliseconds."," * @static"," * @since 3.3.0"," */","L.now = Date.now || function () {","    return new Date().getTime();","};","","/**"," * Lightweight version of <code>Y.substitute</code>. Uses the same template"," * structure as <code>Y.substitute</code>, but doesn't support recursion,"," * auto-object coersion, or formats."," * @method sub"," * @param {string} s String to be modified."," * @param {object} o Object containing replacement values."," * @return {string} the substitute result."," * @static"," * @since 3.2.0"," */","L.sub = function(s, o) {","    return s.replace ? s.replace(SUBREGEX, function (match, key) {","        return L.isUndefined(o[key]) ? match : o[key];","    }) : s;","};","","/**"," * Returns a string without any leading or trailing whitespace.  If"," * the input is not a string, the input will be returned untouched."," * @method trim"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trim = STRING_PROTO.trim ? function(s) {","    return s && s.trim ? s.trim() : s;","} : function (s) {","    try {","        return s.replace(TRIMREGEX, '');","    } catch (e) {","        return s;","    }","};","","/**"," * Returns a string without any leading whitespace."," * @method trimLeft"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trimLeft = STRING_PROTO.trimLeft ? function (s) {","    return s.trimLeft();","} : function (s) {","    return s.replace(/^\\s+/, '');","};","","/**"," * Returns a string without any trailing whitespace."," * @method trimRight"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trimRight = STRING_PROTO.trimRight ? function (s) {","    return s.trimRight();","} : function (s) {","    return s.replace(/\\s+$/, '');","};","","/**","Returns one of the following strings, representing the type of the item passed","in:",""," * \"array\""," * \"boolean\""," * \"date\""," * \"error\""," * \"function\""," * \"null\""," * \"number\""," * \"object\""," * \"regexp\""," * \"string\""," * \"undefined\"","","Known issues:",""," * `typeof HTMLElementCollection` returns function in Safari, but","    `Y.Lang.type()` reports \"object\", which could be a good thing --","    but it actually caused the logic in <code>Y.Lang.isObject</code> to fail.","","@method type","@param o the item to test.","@return {string} the detected type.","@static","**/","L.type = function(o) {","    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');","};","/**","@module yui","@submodule yui-base","*/","","var Lang   = Y.Lang,","    Native = Array.prototype,","","    hasOwn = Object.prototype.hasOwnProperty;","","/**","Provides utility methods for working with arrays. Additional array helpers can","be found in the `collection` and `array-extras` modules.","","`Y.Array(thing)` returns a native array created from _thing_. Depending on","_thing_'s type, one of the following will happen:","","  * Arrays are returned unmodified unless a non-zero _startIndex_ is","    specified.","  * Array-like collections (see `Array.test()`) are converted to arrays.","  * For everything else, a new array is created with _thing_ as the sole","    item.","","Note: elements that are also collections, such as `<form>` and `<select>`","elements, are not automatically converted to arrays. To force a conversion,","pass `true` as the value of the _force_ parameter.","","@class Array","@constructor","@param {Any} thing The thing to arrayify.","@param {Number} [startIndex=0] If non-zero and _thing_ is an array or array-like","  collection, a subset of items starting at the specified index will be","  returned.","@param {Boolean} [force=false] If `true`, _thing_ will be treated as an","  array-like collection no matter what.","@return {Array} A native array created from _thing_, according to the rules","  described above.","**/","function YArray(thing, startIndex, force) {","    var len, result;","","    startIndex || (startIndex = 0);","","    if (force || YArray.test(thing)) {","        // IE throws when trying to slice HTMLElement collections.","        try {","            return Native.slice.call(thing, startIndex);","        } catch (ex) {","            result = [];","","            for (len = thing.length; startIndex < len; ++startIndex) {","                result.push(thing[startIndex]);","            }","","            return result;","        }","    }","","    return [thing];","}","","Y.Array = YArray;","","/**","Dedupes an array of strings, returning an array that's guaranteed to contain","only one copy of a given string.","","This method differs from `Array.unique()` in that it's optimized for use only","with strings, whereas `unique` may be used with other types (but is slower).","Using `dedupe()` with non-string values may result in unexpected behavior.","","@method dedupe","@param {String[]} array Array of strings to dedupe.","@return {Array} Deduped copy of _array_.","@static","@since 3.4.0","**/","YArray.dedupe = function (array) {","    var hash    = {},","        results = [],","        i, item, len;","","    for (i = 0, len = array.length; i < len; ++i) {","        item = array[i];","","        if (!hasOwn.call(hash, item)) {","            hash[item] = 1;","            results.push(item);","        }","    }","","    return results;","};","","/**","Executes the supplied function on each item in the array. This method wraps","the native ES5 `Array.forEach()` method if available.","","@method each","@param {Array} array Array to iterate.","@param {Function} fn Function to execute on each item in the array. The function","  will receive the following arguments:","    @param {Any} fn.item Current array item.","    @param {Number} fn.index Current array index.","    @param {Array} fn.array Array being iterated.","@param {Object} [thisObj] `this` object to use when calling _fn_.","@return {YUI} The YUI instance.","@static","**/","YArray.each = YArray.forEach = Lang._isNative(Native.forEach) ? function (array, fn, thisObj) {","    Native.forEach.call(array || [], fn, thisObj || Y);","    return Y;","} : function (array, fn, thisObj) {","    for (var i = 0, len = (array && array.length) || 0; i < len; ++i) {","        if (i in array) {","            fn.call(thisObj || Y, array[i], i, array);","        }","    }","","    return Y;","};","","/**","Alias for `each()`.","","@method forEach","@static","**/","","/**","Returns an object using the first array as keys and the second as values. If","the second array is not provided, or if it doesn't contain the same number of","values as the first array, then `true` will be used in place of the missing","values.","","@example","","    Y.Array.hash(['a', 'b', 'c'], ['foo', 'bar']);","    // => {a: 'foo', b: 'bar', c: true}","","@method hash","@param {String[]} keys Array of strings to use as keys.","@param {Array} [values] Array to use as values.","@return {Object} Hash using the first array as keys and the second as values.","@static","**/","YArray.hash = function (keys, values) {","    var hash = {},","        vlen = (values && values.length) || 0,","        i, len;","","    for (i = 0, len = keys.length; i < len; ++i) {","        if (i in keys) {","            hash[keys[i]] = vlen > i && i in values ? values[i] : true;","        }","    }","","    return hash;","};","","/**","Returns the index of the first item in the array that's equal (using a strict","equality check) to the specified _value_, or `-1` if the value isn't found.","","This method wraps the native ES5 `Array.indexOf()` method if available.","","@method indexOf","@param {Array} array Array to search.","@param {Any} value Value to search for.","@param {Number} [from=0] The index at which to begin the search.","@return {Number} Index of the item strictly equal to _value_, or `-1` if not","    found.","@static","**/","YArray.indexOf = Lang._isNative(Native.indexOf) ? function (array, value, from) {","    return Native.indexOf.call(array, value, from);","} : function (array, value, from) {","    // http://es5.github.com/#x15.4.4.14","    var len = array.length;","","    from = +from || 0;","    from = (from > 0 || -1) * Math.floor(Math.abs(from));","","    if (from < 0) {","        from += len;","","        if (from < 0) {","            from = 0;","        }","    }","","    for (; from < len; ++from) {","        if (from in array && array[from] === value) {","            return from;","        }","    }","","    return -1;","};","","/**","Numeric sort convenience function.","","The native `Array.prototype.sort()` function converts values to strings and","sorts them in lexicographic order, which is unsuitable for sorting numeric","values. Provide `Array.numericSort` as a custom sort function when you want","to sort values in numeric order.","","@example","","    [42, 23, 8, 16, 4, 15].sort(Y.Array.numericSort);","    // => [4, 8, 15, 16, 23, 42]","","@method numericSort","@param {Number} a First value to compare.","@param {Number} b Second value to compare.","@return {Number} Difference between _a_ and _b_.","@static","**/","YArray.numericSort = function (a, b) {","    return a - b;","};","","/**","Executes the supplied function on each item in the array. Returning a truthy","value from the function will stop the processing of remaining items.","","@method some","@param {Array} array Array to iterate over.","@param {Function} fn Function to execute on each item. The function will receive","  the following arguments:","    @param {Any} fn.value Current array item.","    @param {Number} fn.index Current array index.","    @param {Array} fn.array Array being iterated over.","@param {Object} [thisObj] `this` object to use when calling _fn_.","@return {Boolean} `true` if the function returns a truthy value on any of the","  items in the array; `false` otherwise.","@static","**/","YArray.some = Lang._isNative(Native.some) ? function (array, fn, thisObj) {","    return Native.some.call(array, fn, thisObj);","} : function (array, fn, thisObj) {","    for (var i = 0, len = array.length; i < len; ++i) {","        if (i in array && fn.call(thisObj, array[i], i, array)) {","            return true;","        }","    }","","    return false;","};","","/**","Evaluates _obj_ to determine if it's an array, an array-like collection, or","something else. This is useful when working with the function `arguments`","collection and `HTMLElement` collections.","","Note: This implementation doesn't consider elements that are also","collections, such as `<form>` and `<select>`, to be array-like.","","@method test","@param {Object} obj Object to test.","@return {Number} A number indicating the results of the test:","","  * 0: Neither an array nor an array-like collection.","  * 1: Real array.","  * 2: Array-like collection.","","@static","**/","YArray.test = function (obj) {","    var result = 0;","","    if (Lang.isArray(obj)) {","        result = 1;","    } else if (Lang.isObject(obj)) {","        try {","            // indexed, but no tagName (element) or alert (window),","            // or functions without apply/call (Safari","            // HTMLElementCollection bug).","            if ('length' in obj && !obj.tagName && !obj.alert && !obj.apply) {","                result = 2;","            }","        } catch (ex) {}","    }","","    return result;","};","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * A simple FIFO queue.  Items are added to the Queue with add(1..n items) and"," * removed using next()."," *"," * @class Queue"," * @constructor"," * @param {MIXED} item* 0..n items to seed the queue."," */","function Queue() {","    this._init();","    this.add.apply(this, arguments);","}","","Queue.prototype = {","    /**","     * Initialize the queue","     *","     * @method _init","     * @protected","     */","    _init: function() {","        /**","         * The collection of enqueued items","         *","         * @property _q","         * @type Array","         * @protected","         */","        this._q = [];","    },","","    /**","     * Get the next item in the queue. FIFO support","     *","     * @method next","     * @return {MIXED} the next item in the queue.","     */","    next: function() {","        return this._q.shift();","    },","","    /**","     * Get the last in the queue. LIFO support.","     *","     * @method last","     * @return {MIXED} the last item in the queue.","     */","    last: function() {","        return this._q.pop();","    },","","    /**","     * Add 0..n items to the end of the queue.","     *","     * @method add","     * @param {MIXED} item* 0..n items.","     * @return {object} this queue.","     */","    add: function() {","        this._q.push.apply(this._q, arguments);","","        return this;","    },","","    /**","     * Returns the current number of queued items.","     *","     * @method size","     * @return {Number} The size.","     */","    size: function() {","        return this._q.length;","    }","};","","Y.Queue = Queue;","","YUI.Env._loaderQueue = YUI.Env._loaderQueue || new Queue();","","/**","The YUI module contains the components required for building the YUI seed file.","This includes the script loading mechanism, a simple queue, and the core","utilities for the library.","","@module yui","@submodule yui-base","**/","","var CACHED_DELIMITER = '__',","","    hasOwn   = Object.prototype.hasOwnProperty,","    isObject = Y.Lang.isObject;","","/**","Returns a wrapper for a function which caches the return value of that function,","keyed off of the combined string representation of the argument values provided","when the wrapper is called.","","Calling this function again with the same arguments will return the cached value","rather than executing the wrapped function.","","Note that since the cache is keyed off of the string representation of arguments","passed to the wrapper function, arguments that aren't strings and don't provide","a meaningful `toString()` method may result in unexpected caching behavior. For","example, the objects `{}` and `{foo: 'bar'}` would both be converted to the","string `[object Object]` when used as a cache key.","","@method cached","@param {Function} source The function to memoize.","@param {Object} [cache={}] Object in which to store cached values. You may seed","  this object with pre-existing cached values if desired.","@param {any} [refetch] If supplied, this value is compared with the cached value","  using a `==` comparison. If the values are equal, the wrapped function is","  executed again even though a cached value exists.","@return {Function} Wrapped function.","@for YUI","**/","Y.cached = function (source, cache, refetch) {","    cache || (cache = {});","","    return function (arg) {","        var key = arguments.length > 1 ?","                Array.prototype.join.call(arguments, CACHED_DELIMITER) :","                String(arg);","","        if (!(key in cache) || (refetch && cache[key] == refetch)) {","            cache[key] = source.apply(source, arguments);","        }","","        return cache[key];","    };","};","","/**","Returns the `location` object from the window/frame in which this YUI instance","operates, or `undefined` when executing in a non-browser environment","(e.g. Node.js).","","It is _not_ recommended to hold references to the `window.location` object","outside of the scope of a function in which its properties are being accessed or","its methods are being called. This is because of a nasty bug/issue that exists","in both Safari and MobileSafari browsers:","[WebKit Bug 34679](https://bugs.webkit.org/show_bug.cgi?id=34679).","","@method getLocation","@return {location} The `location` object from the window/frame in which this YUI","    instance operates.","@since 3.5.0","**/","Y.getLocation = function () {","    // It is safer to look this up every time because yui-base is attached to a","    // YUI instance before a user's config is applied; i.e. `Y.config.win` does","    // not point the correct window object when this file is loaded.","    var win = Y.config.win;","","    // It is not safe to hold a reference to the `location` object outside the","    // scope in which it is being used. The WebKit engine used in Safari and","    // MobileSafari will \"disconnect\" the `location` object from the `window`","    // when a page is restored from back/forward history cache.","    return win && win.location;","};","","/**","Returns a new object containing all of the properties of all the supplied","objects. The properties from later objects will overwrite those in earlier","objects.","","Passing in a single object will create a shallow copy of it. For a deep copy,","use `clone()`.","","@method merge","@param {Object} objects* One or more objects to merge.","@return {Object} A new merged object.","**/","Y.merge = function () {","    var args   = arguments,","        i      = 0,","        len    = args.length,","        result = {};","","    for (; i < len; ++i) {","        Y.mix(result, args[i], true);","    }","","    return result;","};","","/**","Mixes _supplier_'s properties into _receiver_.","","Properties on _receiver_ or _receiver_'s prototype will not be overwritten or","shadowed unless the _overwrite_ parameter is `true`, and will not be merged","unless the _merge_ parameter is `true`.","","In the default mode (0), only properties the supplier owns are copied (prototype","properties are not copied). The following copying modes are available:","","  * `0`: _Default_. Object to object.","  * `1`: Prototype to prototype.","  * `2`: Prototype to prototype and object to object.","  * `3`: Prototype to object.","  * `4`: Object to prototype.","","@method mix","@param {Function|Object} receiver The object or function to receive the mixed","  properties.","@param {Function|Object} supplier The object or function supplying the","  properties to be mixed.","@param {Boolean} [overwrite=false] If `true`, properties that already exist","  on the receiver will be overwritten with properties from the supplier.","@param {String[]} [whitelist] An array of property names to copy. If","  specified, only the whitelisted properties will be copied, and all others","  will be ignored.","@param {Number} [mode=0] Mix mode to use. See above for available modes.","@param {Boolean} [merge=false] If `true`, objects and arrays that already","  exist on the receiver will have the corresponding object/array from the","  supplier merged into them, rather than being skipped or overwritten. When","  both _overwrite_ and _merge_ are `true`, _merge_ takes precedence.","@return {Function|Object|YUI} The receiver, or the YUI instance if the","  specified receiver is falsy.","**/","Y.mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {","    var alwaysOverwrite, exists, from, i, key, len, to;","","    // If no supplier is given, we return the receiver. If no receiver is given,","    // we return Y. Returning Y doesn't make much sense to me, but it's","    // grandfathered in for backcompat reasons.","    if (!receiver || !supplier) {","        return receiver || Y;","    }","","    if (mode) {","        // In mode 2 (prototype to prototype and object to object), we recurse","        // once to do the proto to proto mix. The object to object mix will be","        // handled later on.","        if (mode === 2) {","            Y.mix(receiver.prototype, supplier.prototype, overwrite,","                    whitelist, 0, merge);","        }","","        // Depending on which mode is specified, we may be copying from or to","        // the prototypes of the supplier and receiver.","        from = mode === 1 || mode === 3 ? supplier.prototype : supplier;","        to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;","","        // If either the supplier or receiver doesn't actually have a","        // prototype property, then we could end up with an undefined `from`","        // or `to`. If that happens, we abort and return the receiver.","        if (!from || !to) {","            return receiver;","        }","    } else {","        from = supplier;","        to   = receiver;","    }","","    // If `overwrite` is truthy and `merge` is falsy, then we can skip a","    // property existence check on each iteration and save some time.","    alwaysOverwrite = overwrite && !merge;","","    if (whitelist) {","        for (i = 0, len = whitelist.length; i < len; ++i) {","            key = whitelist[i];","","            // We call `Object.prototype.hasOwnProperty` instead of calling","            // `hasOwnProperty` on the object itself, since the object's","            // `hasOwnProperty` method may have been overridden or removed.","            // Also, some native objects don't implement a `hasOwnProperty`","            // method.","            if (!hasOwn.call(from, key)) {","                continue;","            }","","            // The `key in to` check here is (sadly) intentional for backwards","            // compatibility reasons. It prevents undesired shadowing of","            // prototype members on `to`.","            exists = alwaysOverwrite ? false : key in to;","","            if (merge && exists && isObject(to[key], true)","                    && isObject(from[key], true)) {","                // If we're in merge mode, and the key is present on both","                // objects, and the value on both objects is either an object or","                // an array (but not a function), then we recurse to merge the","                // `from` value into the `to` value instead of overwriting it.","                //","                // Note: It's intentional that the whitelist isn't passed to the","                // recursive call here. This is legacy behavior that lots of","                // code still depends on.","                Y.mix(to[key], from[key], overwrite, null, 0, merge);","            } else if (overwrite || !exists) {","                // We're not in merge mode, so we'll only copy the `from` value","                // to the `to` value if we're in overwrite mode or if the","                // current key doesn't exist on the `to` object.","                to[key] = from[key];","            }","        }","    } else {","        for (key in from) {","            // The code duplication here is for runtime performance reasons.","            // Combining whitelist and non-whitelist operations into a single","            // loop or breaking the shared logic out into a function both result","            // in worse performance, and Y.mix is critical enough that the byte","            // tradeoff is worth it.","            if (!hasOwn.call(from, key)) {","                continue;","            }","","            // The `key in to` check here is (sadly) intentional for backwards","            // compatibility reasons. It prevents undesired shadowing of","            // prototype members on `to`.","            exists = alwaysOverwrite ? false : key in to;","","            if (merge && exists && isObject(to[key], true)","                    && isObject(from[key], true)) {","                Y.mix(to[key], from[key], overwrite, null, 0, merge);","            } else if (overwrite || !exists) {","                to[key] = from[key];","            }","        }","","        // If this is an IE browser with the JScript enumeration bug, force","        // enumeration of the buggy properties by making a recursive call with","        // the buggy properties as the whitelist.","        if (Y.Object._hasEnumBug) {","            Y.mix(to, from, overwrite, Y.Object._forceEnum, mode, merge);","        }","    }","","    return receiver;","};","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * Adds utilities to the YUI instance for working with objects."," *"," * @class Object"," */","","var Lang   = Y.Lang,","    hasOwn = Object.prototype.hasOwnProperty,","","    UNDEFINED, // <-- Note the comma. We're still declaring vars.","","/**"," * Returns a new object that uses _obj_ as its prototype. This method wraps the"," * native ES5 `Object.create()` method if available, but doesn't currently"," * pass through `Object.create()`'s second argument (properties) in order to"," * ensure compatibility with older browsers."," *"," * @method ()"," * @param {Object} obj Prototype object."," * @return {Object} New object using _obj_ as its prototype."," * @static"," */","O = Y.Object = Lang._isNative(Object.create) ? function (obj) {","    // We currently wrap the native Object.create instead of simply aliasing it","    // to ensure consistency with our fallback shim, which currently doesn't","    // support Object.create()'s second argument (properties). Once we have a","    // safe fallback for the properties arg, we can stop wrapping","    // Object.create().","    return Object.create(obj);","} : (function () {","    // Reusable constructor function for the Object.create() shim.","    function F() {}","","    // The actual shim.","    return function (obj) {","        F.prototype = obj;","        return new F();","    };","}()),","","/**"," * Property names that IE doesn't enumerate in for..in loops, even when they"," * should be enumerable. When `_hasEnumBug` is `true`, it's necessary to"," * manually enumerate these properties."," *"," * @property _forceEnum"," * @type String[]"," * @protected"," * @static"," */","forceEnum = O._forceEnum = [","    'hasOwnProperty',","    'isPrototypeOf',","    'propertyIsEnumerable',","    'toString',","    'toLocaleString',","    'valueOf'","],","","/**"," * `true` if this browser has the JScript enumeration bug that prevents"," * enumeration of the properties named in the `_forceEnum` array, `false`"," * otherwise."," *"," * See:"," *   - <https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug>"," *   - <http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation>"," *"," * @property _hasEnumBug"," * @type Boolean"," * @protected"," * @static"," */","hasEnumBug = O._hasEnumBug = !{valueOf: 0}.propertyIsEnumerable('valueOf'),","","/**"," * `true` if this browser incorrectly considers the `prototype` property of"," * functions to be enumerable. Currently known to affect Opera 11.50."," *"," * @property _hasProtoEnumBug"," * @type Boolean"," * @protected"," * @static"," */","hasProtoEnumBug = O._hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype'),","","/**"," * Returns `true` if _key_ exists on _obj_, `false` if _key_ doesn't exist or"," * exists only on _obj_'s prototype. This is essentially a safer version of"," * `obj.hasOwnProperty()`."," *"," * @method owns"," * @param {Object} obj Object to test."," * @param {String} key Property name to look for."," * @return {Boolean} `true` if _key_ exists on _obj_, `false` otherwise."," * @static"," */","owns = O.owns = function (obj, key) {","    return !!obj && hasOwn.call(obj, key);","}; // <-- End of var declarations.","","/**"," * Alias for `owns()`."," *"," * @method hasKey"," * @param {Object} obj Object to test."," * @param {String} key Property name to look for."," * @return {Boolean} `true` if _key_ exists on _obj_, `false` otherwise."," * @static"," */","O.hasKey = owns;","","/**"," * Returns an array containing the object's enumerable keys. Does not include"," * prototype keys or non-enumerable keys."," *"," * Note that keys are returned in enumeration order (that is, in the same order"," * that they would be enumerated by a `for-in` loop), which may not be the same"," * as the order in which they were defined."," *"," * This method is an alias for the native ES5 `Object.keys()` method if"," * available."," *"," * @example"," *"," *     Y.Object.keys({a: 'foo', b: 'bar', c: 'baz'});"," *     // => ['a', 'b', 'c']"," *"," * @method keys"," * @param {Object} obj An object."," * @return {String[]} Array of keys."," * @static"," */","O.keys = Lang._isNative(Object.keys) ? Object.keys : function (obj) {","    if (!Lang.isObject(obj)) {","        throw new TypeError('Object.keys called on a non-object');","    }","","    var keys = [],","        i, key, len;","","    if (hasProtoEnumBug && typeof obj === 'function') {","        for (key in obj) {","            if (owns(obj, key) && key !== 'prototype') {","                keys.push(key);","            }","        }","    } else {","        for (key in obj) {","            if (owns(obj, key)) {","                keys.push(key);","            }","        }","    }","","    if (hasEnumBug) {","        for (i = 0, len = forceEnum.length; i < len; ++i) {","            key = forceEnum[i];","","            if (owns(obj, key)) {","                keys.push(key);","            }","        }","    }","","    return keys;","};","","/**"," * Returns an array containing the values of the object's enumerable keys."," *"," * Note that values are returned in enumeration order (that is, in the same"," * order that they would be enumerated by a `for-in` loop), which may not be the"," * same as the order in which they were defined."," *"," * @example"," *"," *     Y.Object.values({a: 'foo', b: 'bar', c: 'baz'});"," *     // => ['foo', 'bar', 'baz']"," *"," * @method values"," * @param {Object} obj An object."," * @return {Array} Array of values."," * @static"," */","O.values = function (obj) {","    var keys   = O.keys(obj),","        i      = 0,","        len    = keys.length,","        values = [];","","    for (; i < len; ++i) {","        values.push(obj[keys[i]]);","    }","","    return values;","};","","/**"," * Returns the number of enumerable keys owned by an object."," *"," * @method size"," * @param {Object} obj An object."," * @return {Number} The object's size."," * @static"," */","O.size = function (obj) {","    try {","        return O.keys(obj).length;","    } catch (ex) {","        return 0; // Legacy behavior for non-objects.","    }","};","","/**"," * Returns `true` if the object owns an enumerable property with the specified"," * value."," *"," * @method hasValue"," * @param {Object} obj An object."," * @param {any} value The value to search for."," * @return {Boolean} `true` if _obj_ contains _value_, `false` otherwise."," * @static"," */","O.hasValue = function (obj, value) {","    return Y.Array.indexOf(O.values(obj), value) > -1;","};","","/**"," * Executes a function on each enumerable property in _obj_. The function"," * receives the value, the key, and the object itself as parameters (in that"," * order)."," *"," * By default, only properties owned by _obj_ are enumerated. To include"," * prototype properties, set the _proto_ parameter to `true`."," *"," * @method each"," * @param {Object} obj Object to enumerate."," * @param {Function} fn Function to execute on each enumerable property."," *   @param {mixed} fn.value Value of the current property."," *   @param {String} fn.key Key of the current property."," *   @param {Object} fn.obj Object being enumerated."," * @param {Object} [thisObj] `this` object to use when calling _fn_."," * @param {Boolean} [proto=false] Include prototype properties."," * @return {YUI} the YUI instance."," * @chainable"," * @static"," */","O.each = function (obj, fn, thisObj, proto) {","    var key;","","    for (key in obj) {","        if (proto || owns(obj, key)) {","            fn.call(thisObj || Y, obj[key], key, obj);","        }","    }","","    return Y;","};","","/**"," * Executes a function on each enumerable property in _obj_, but halts if the"," * function returns a truthy value. The function receives the value, the key,"," * and the object itself as paramters (in that order)."," *"," * By default, only properties owned by _obj_ are enumerated. To include"," * prototype properties, set the _proto_ parameter to `true`."," *"," * @method some"," * @param {Object} obj Object to enumerate."," * @param {Function} fn Function to execute on each enumerable property."," *   @param {mixed} fn.value Value of the current property."," *   @param {String} fn.key Key of the current property."," *   @param {Object} fn.obj Object being enumerated."," * @param {Object} [thisObj] `this` object to use when calling _fn_."," * @param {Boolean} [proto=false] Include prototype properties."," * @return {Boolean} `true` if any execution of _fn_ returns a truthy value,"," *   `false` otherwise."," * @static"," */","O.some = function (obj, fn, thisObj, proto) {","    var key;","","    for (key in obj) {","        if (proto || owns(obj, key)) {","            if (fn.call(thisObj || Y, obj[key], key, obj)) {","                return true;","            }","        }","    }","","    return false;","};","","/**"," * Retrieves the sub value at the provided path,"," * from the value object provided."," *"," * @method getValue"," * @static"," * @param o The object from which to extract the property value."," * @param path {Array} A path array, specifying the object traversal path"," * from which to obtain the sub value."," * @return {Any} The value stored in the path, undefined if not found,"," * undefined if the source is not an object.  Returns the source object"," * if an empty path is provided."," */","O.getValue = function(o, path) {","    if (!Lang.isObject(o)) {","        return UNDEFINED;","    }","","    var i,","        p = Y.Array(path),","        l = p.length;","","    for (i = 0; o !== UNDEFINED && i < l; i++) {","        o = o[p[i]];","    }","","    return o;","};","","/**"," * Sets the sub-attribute value at the provided path on the"," * value object.  Returns the modified value object, or"," * undefined if the path is invalid."," *"," * @method setValue"," * @static"," * @param o             The object on which to set the sub value."," * @param path {Array}  A path array, specifying the object traversal path"," *                      at which to set the sub value."," * @param val {Any}     The new value for the sub-attribute."," * @return {Object}     The modified object, with the new sub value set, or"," *                      undefined, if the path was invalid."," */","O.setValue = function(o, path, val) {","    var i,","        p = Y.Array(path),","        leafIdx = p.length - 1,","        ref = o;","","    if (leafIdx >= 0) {","        for (i = 0; ref !== UNDEFINED && i < leafIdx; i++) {","            ref = ref[p[i]];","        }","","        if (ref !== UNDEFINED) {","            ref[p[i]] = val;","        } else {","            return UNDEFINED;","        }","    }","","    return o;","};","","/**"," * Returns `true` if the object has no enumerable properties of its own."," *"," * @method isEmpty"," * @param {Object} obj An object."," * @return {Boolean} `true` if the object is empty."," * @static"," * @since 3.2.0"," */","O.isEmpty = function (obj) {","    return !O.keys(Object(obj)).length;","};","/**"," * The YUI module contains the components required for building the YUI seed"," * file.  This includes the script loading mechanism, a simple queue, and the"," * core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * YUI user agent detection."," * Do not fork for a browser if it can be avoided.  Use feature detection when"," * you can.  Use the user agent as a last resort.  For all fields listed"," * as @type float, UA stores a version number for the browser engine,"," * 0 otherwise.  This value may or may not map to the version number of"," * the browser using the engine.  The value is presented as a float so"," * that it can easily be used for boolean evaluation as well as for"," * looking for a particular range of versions.  Because of this,"," * some of the granularity of the version info may be lost.  The fields that"," * are @type string default to null.  The API docs list the values that"," * these fields can have."," * @class UA"," * @static"," */","","/**","* Static method on `YUI.Env` for parsing a UA string.  Called at instantiation","* to populate `Y.UA`.","*","* @static","* @method parseUA","* @param {String} [subUA=navigator.userAgent] UA string to parse","* @return {Object} The Y.UA object","*/","YUI.Env.parseUA = function(subUA) {","","    var numberify = function(s) {","            var c = 0;","            return parseFloat(s.replace(/\\./g, function() {","                return (c++ == 1) ? '' : '.';","            }));","        },","","        win = Y.config.win,","","        nav = win && win.navigator,","","        o = {","","        /**","         * Internet Explorer version number or 0.  Example: 6","         * @property ie","         * @type float","         * @static","         */","        ie: 0,","","        /**","         * Opera version number or 0.  Example: 9.2","         * @property opera","         * @type float","         * @static","         */","        opera: 0,","","        /**","         * Gecko engine revision number.  Will evaluate to 1 if Gecko","         * is detected but the revision could not be found. Other browsers","         * will be 0.  Example: 1.8","         * <pre>","         * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7","         * Firefox 1.5.0.9: 1.8.0.9 <-- 1.8","         * Firefox 2.0.0.3: 1.8.1.3 <-- 1.81","         * Firefox 3.0   <-- 1.9","         * Firefox 3.5   <-- 1.91","         * </pre>","         * @property gecko","         * @type float","         * @static","         */","        gecko: 0,","","        /**","         * AppleWebKit version.  KHTML browsers that are not WebKit browsers","         * will evaluate to 1, other browsers 0.  Example: 418.9","         * <pre>","         * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the","         *                                   latest available for Mac OSX 10.3.","         * Safari 2.0.2:         416     <-- hasOwnProperty introduced","         * Safari 2.0.4:         418     <-- preventDefault fixed","         * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run","         *                                   different versions of webkit","         * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been","         *                                   updated, but not updated","         *                                   to the latest patch.","         * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native","         * SVG and many major issues fixed).","         * Safari 3.0.4 (523.12) 523.12  <-- First Tiger release - automatic","         * update from 2.x via the 10.4.11 OS patch.","         * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.","         *                                   yahoo.com user agent hack removed.","         * </pre>","         * http://en.wikipedia.org/wiki/Safari_version_history","         * @property webkit","         * @type float","         * @static","         */","        webkit: 0,","","        /**","         * Safari will be detected as webkit, but this property will also","         * be populated with the Safari version number","         * @property safari","         * @type float","         * @static","         */","        safari: 0,","","        /**","         * Chrome will be detected as webkit, but this property will also","         * be populated with the Chrome version number","         * @property chrome","         * @type float","         * @static","         */","        chrome: 0,","","        /**","         * The mobile property will be set to a string containing any relevant","         * user agent information when a modern mobile browser is detected.","         * Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series","         * devices with the WebKit-based browser, and Opera Mini.","         * @property mobile","         * @type string","         * @default null","         * @static","         */","        mobile: null,","","        /**","         * Adobe AIR version number or 0.  Only populated if webkit is detected.","         * Example: 1.0","         * @property air","         * @type float","         */","        air: 0,","        /**","         * PhantomJS version number or 0.  Only populated if webkit is detected.","         * Example: 1.0","         * @property phantomjs","         * @type float","         */","        phantomjs: 0,","        /**","         * Adobe AIR version number or 0.  Only populated if webkit is detected.","         * Example: 1.0","         * @property air","         * @type float","         */","        air: 0,","        /**","         * Detects Apple iPad's OS version","         * @property ipad","         * @type float","         * @static","         */","        ipad: 0,","        /**","         * Detects Apple iPhone's OS version","         * @property iphone","         * @type float","         * @static","         */","        iphone: 0,","        /**","         * Detects Apples iPod's OS version","         * @property ipod","         * @type float","         * @static","         */","        ipod: 0,","        /**","         * General truthy check for iPad, iPhone or iPod","         * @property ios","         * @type Boolean","         * @default null","         * @static","         */","        ios: null,","        /**","         * Detects Googles Android OS version","         * @property android","         * @type float","         * @static","         */","        android: 0,","        /**","         * Detects Kindle Silk","         * @property silk","         * @type float","         * @static","         */","        silk: 0,","        /**","         * Detects Kindle Silk Acceleration","         * @property accel","         * @type Boolean","         * @static","         */","        accel: false,","        /**","         * Detects Palms WebOS version","         * @property webos","         * @type float","         * @static","         */","        webos: 0,","","        /**","         * Google Caja version number or 0.","         * @property caja","         * @type float","         */","        caja: nav && nav.cajaVersion,","","        /**","         * Set to true if the page appears to be in SSL","         * @property secure","         * @type boolean","         * @static","         */","        secure: false,","","        /**","         * The operating system.  Currently only detecting windows or macintosh","         * @property os","         * @type string","         * @default null","         * @static","         */","        os: null,","","        /**","         * The Nodejs Version","         * @property nodejs","         * @type float","         * @default 0","         * @static","         */","        nodejs: 0","    },","","    ua = subUA || nav && nav.userAgent,","","    loc = win && win.location,","","    href = loc && loc.href,","","    m;","","    /**","    * The User Agent string that was parsed","    * @property userAgent","    * @type String","    * @static","    */","    o.userAgent = ua;","","","    o.secure = href && (href.toLowerCase().indexOf('https') === 0);","","    if (ua) {","","        if ((/windows|win32/i).test(ua)) {","            o.os = 'windows';","        } else if ((/macintosh|mac_powerpc/i).test(ua)) {","            o.os = 'macintosh';","        } else if ((/android/i).test(ua)) {","            o.os = 'android';","        } else if ((/symbos/i).test(ua)) {","            o.os = 'symbos';","        } else if ((/linux/i).test(ua)) {","            o.os = 'linux';","        } else if ((/rhino/i).test(ua)) {","            o.os = 'rhino';","        }","","        // Modern KHTML browsers should qualify as Safari X-Grade","        if ((/KHTML/).test(ua)) {","            o.webkit = 1;","        }","        if ((/IEMobile|XBLWP7/).test(ua)) {","            o.mobile = 'windows';","        }","        if ((/Fennec/).test(ua)) {","            o.mobile = 'gecko';","        }","        // Modern WebKit browsers are at least X-Grade","        m = ua.match(/AppleWebKit\\/([^\\s]*)/);","        if (m && m[1]) {","            o.webkit = numberify(m[1]);","            o.safari = o.webkit;","            ","            if (/PhantomJS/.test(ua)) {","                m = ua.match(/PhantomJS\\/([^\\s]*)/);","                if (m && m[1]) {","                    o.phantomjs = numberify(m[1]);","                }","            }","","            // Mobile browser check","            if (/ Mobile\\//.test(ua) || (/iPad|iPod|iPhone/).test(ua)) {","                o.mobile = 'Apple'; // iPhone or iPod Touch","","                m = ua.match(/OS ([^\\s]*)/);","                if (m && m[1]) {","                    m = numberify(m[1].replace('_', '.'));","                }","                o.ios = m;","                o.os = 'ios';","                o.ipad = o.ipod = o.iphone = 0;","","                m = ua.match(/iPad|iPod|iPhone/);","                if (m && m[0]) {","                    o[m[0].toLowerCase()] = o.ios;","                }","            } else {","                m = ua.match(/NokiaN[^\\/]*|webOS\\/\\d\\.\\d/);","                if (m) {","                    // Nokia N-series, webOS, ex: NokiaN95","                    o.mobile = m[0];","                }","                if (/webOS/.test(ua)) {","                    o.mobile = 'WebOS';","                    m = ua.match(/webOS\\/([^\\s]*);/);","                    if (m && m[1]) {","                        o.webos = numberify(m[1]);","                    }","                }","                if (/ Android/.test(ua)) {","                    if (/Mobile/.test(ua)) {","                        o.mobile = 'Android';","                    }","                    m = ua.match(/Android ([^\\s]*);/);","                    if (m && m[1]) {","                        o.android = numberify(m[1]);","                    }","","                }","                if (/Silk/.test(ua)) {","                    m = ua.match(/Silk\\/([^\\s]*)\\)/);","                    if (m && m[1]) {","                        o.silk = numberify(m[1]);","                    }","                    if (!o.android) {","                        o.android = 2.34; //Hack for desktop mode in Kindle","                        o.os = 'Android';","                    }","                    if (/Accelerated=true/.test(ua)) {","                        o.accel = true;","                    }","                }","            }","","            m = ua.match(/(Chrome|CrMo|CriOS)\\/([^\\s]*)/);","            if (m && m[1] && m[2]) {","                o.chrome = numberify(m[2]); // Chrome","                o.safari = 0; //Reset safari back to 0","                if (m[1] === 'CrMo') {","                    o.mobile = 'chrome';","                }","            } else {","                m = ua.match(/AdobeAIR\\/([^\\s]*)/);","                if (m) {","                    o.air = m[0]; // Adobe AIR 1.0 or better","                }","            }","        }","","        if (!o.webkit) { // not webkit","// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)","            if (/Opera/.test(ua)) {","                m = ua.match(/Opera[\\s\\/]([^\\s]*)/);","                if (m && m[1]) {","                    o.opera = numberify(m[1]);","                }","                m = ua.match(/Version\\/([^\\s]*)/);","                if (m && m[1]) {","                    o.opera = numberify(m[1]); // opera 10+","                }","","                if (/Opera Mobi/.test(ua)) {","                    o.mobile = 'opera';","                    m = ua.replace('Opera Mobi', '').match(/Opera ([^\\s]*)/);","                    if (m && m[1]) {","                        o.opera = numberify(m[1]);","                    }","                }","                m = ua.match(/Opera Mini[^;]*/);","","                if (m) {","                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316","                }","            } else { // not opera or webkit","                m = ua.match(/MSIE\\s([^;]*)/);","                if (m && m[1]) {","                    o.ie = numberify(m[1]);","                } else { // not opera, webkit, or ie","                    m = ua.match(/Gecko\\/([^\\s]*)/);","                    if (m) {","                        o.gecko = 1; // Gecko detected, look for revision","                        m = ua.match(/rv:([^\\s\\)]*)/);","                        if (m && m[1]) {","                            o.gecko = numberify(m[1]);","                        }","                    }","                }","            }","        }","    }","","    //It was a parsed UA, do not assign the global value.","    if (!subUA) {","","        if (typeof process == 'object') {","","            if (process.versions && process.versions.node) {","                //NodeJS","                o.os = process.platform;","                o.nodejs = numberify(process.versions.node);","            }","        }","","        YUI.Env.UA = o;","","    }","","    return o;","};","","","Y.UA = YUI.Env.UA || YUI.Env.parseUA();","","/**","Performs a simple comparison between two version numbers, accounting for","standard versioning logic such as the fact that \"535.8\" is a lower version than","\"535.24\", even though a simple numerical comparison would indicate that it's","greater. Also accounts for cases such as \"1.1\" vs. \"1.1.0\", which are","considered equivalent.","","Returns -1 if version _a_ is lower than version _b_, 0 if they're equivalent,","1 if _a_ is higher than _b_.","","Versions may be numbers or strings containing numbers and dots. For example,","both `535` and `\"535.8.10\"` are acceptable. A version string containing","non-numeric characters, like `\"535.8.beta\"`, may produce unexpected results.","","@method compareVersions","@param {Number|String} a First version number to compare.","@param {Number|String} b Second version number to compare.","@return -1 if _a_ is lower than _b_, 0 if they're equivalent, 1 if _a_ is","    higher than _b_.","**/","Y.UA.compareVersions = function (a, b) {","    var aPart, aParts, bPart, bParts, i, len;","","    if (a === b) {","        return 0;","    }","","    aParts = (a + '').split('.');","    bParts = (b + '').split('.');","","    for (i = 0, len = Math.max(aParts.length, bParts.length); i < len; ++i) {","        aPart = parseInt(aParts[i], 10);","        bPart = parseInt(bParts[i], 10);","","        isNaN(aPart) && (aPart = 0);","        isNaN(bPart) && (bPart = 0);","","        if (aPart < bPart) {","            return -1;","        }","","        if (aPart > bPart) {","            return 1;","        }","    }","","    return 0;","};","YUI.Env.aliases = {","    \"anim\": [\"anim-base\",\"anim-color\",\"anim-curve\",\"anim-easing\",\"anim-node-plugin\",\"anim-scroll\",\"anim-xy\"],","    \"app\": [\"app-base\",\"app-content\",\"app-transitions\",\"lazy-model-list\",\"model\",\"model-list\",\"model-sync-rest\",\"router\",\"view\",\"view-node-map\"],","    \"attribute\": [\"attribute-base\",\"attribute-complex\"],","    \"autocomplete\": [\"autocomplete-base\",\"autocomplete-sources\",\"autocomplete-list\",\"autocomplete-plugin\"],","    \"base\": [\"base-base\",\"base-pluginhost\",\"base-build\"],","    \"cache\": [\"cache-base\",\"cache-offline\",\"cache-plugin\"],","    \"collection\": [\"array-extras\",\"arraylist\",\"arraylist-add\",\"arraylist-filter\",\"array-invoke\"],","    \"controller\": [\"router\"],","    \"dataschema\": [\"dataschema-base\",\"dataschema-json\",\"dataschema-xml\",\"dataschema-array\",\"dataschema-text\"],","    \"datasource\": [\"datasource-local\",\"datasource-io\",\"datasource-get\",\"datasource-function\",\"datasource-cache\",\"datasource-jsonschema\",\"datasource-xmlschema\",\"datasource-arrayschema\",\"datasource-textschema\",\"datasource-polling\"],","    \"datatable\": [\"datatable-core\",\"datatable-table\",\"datatable-head\",\"datatable-body\",\"datatable-base\",\"datatable-column-widths\",\"datatable-message\",\"datatable-mutable\",\"datatable-sort\",\"datatable-datasource\"],","    \"datatable-deprecated\": [\"datatable-base-deprecated\",\"datatable-datasource-deprecated\",\"datatable-sort-deprecated\",\"datatable-scroll-deprecated\"],","    \"datatype\": [\"datatype-number\",\"datatype-date\",\"datatype-xml\"],","    \"datatype-date\": [\"datatype-date-parse\",\"datatype-date-format\"],","    \"datatype-number\": [\"datatype-number-parse\",\"datatype-number-format\"],","    \"datatype-xml\": [\"datatype-xml-parse\",\"datatype-xml-format\"],","    \"dd\": [\"dd-ddm-base\",\"dd-ddm\",\"dd-ddm-drop\",\"dd-drag\",\"dd-proxy\",\"dd-constrain\",\"dd-drop\",\"dd-scroll\",\"dd-delegate\"],","    \"dom\": [\"dom-base\",\"dom-screen\",\"dom-style\",\"selector-native\",\"selector\"],","    \"editor\": [\"frame\",\"editor-selection\",\"exec-command\",\"editor-base\",\"editor-para\",\"editor-br\",\"editor-bidi\",\"editor-tab\",\"createlink-base\"],","    \"event\": [\"event-base\",\"event-delegate\",\"event-synthetic\",\"event-mousewheel\",\"event-mouseenter\",\"event-key\",\"event-focus\",\"event-resize\",\"event-hover\",\"event-outside\",\"event-touch\",\"event-move\",\"event-flick\",\"event-valuechange\"],","    \"event-custom\": [\"event-custom-base\",\"event-custom-complex\"],","    \"event-gestures\": [\"event-flick\",\"event-move\"],","    \"handlebars\": [\"handlebars-compiler\"],","    \"highlight\": [\"highlight-base\",\"highlight-accentfold\"],","    \"history\": [\"history-base\",\"history-hash\",\"history-hash-ie\",\"history-html5\"],","    \"io\": [\"io-base\",\"io-xdr\",\"io-form\",\"io-upload-iframe\",\"io-queue\"],","    \"json\": [\"json-parse\",\"json-stringify\"],","    \"loader\": [\"loader-base\",\"loader-rollup\",\"loader-yui3\"],","    \"node\": [\"node-base\",\"node-event-delegate\",\"node-pluginhost\",\"node-screen\",\"node-style\"],","    \"pluginhost\": [\"pluginhost-base\",\"pluginhost-config\"],","    \"querystring\": [\"querystring-parse\",\"querystring-stringify\"],","    \"recordset\": [\"recordset-base\",\"recordset-sort\",\"recordset-filter\",\"recordset-indexer\"],","    \"resize\": [\"resize-base\",\"resize-proxy\",\"resize-constrain\"],","    \"slider\": [\"slider-base\",\"slider-value-range\",\"clickable-rail\",\"range-slider\"],","    \"text\": [\"text-accentfold\",\"text-wordbreak\"],","    \"widget\": [\"widget-base\",\"widget-htmlparser\",\"widget-skin\",\"widget-uievents\"]","};","","","}, '@VERSION@' );","YUI.add('get', function(Y) {","","    /**","    * NodeJS specific Get module used to load remote resources. It contains the same signature as the default Get module so there is no code change needed.","    * @module get-nodejs","    * @class GetNodeJS","    */","        ","    var path = require('path'),","        vm = require('vm'),","        fs = require('fs'),","        request = require('request'),","        existsSync = fs.existsSync || path.existsSync;","","","    Y.Get = function() {","    };","","    //Setup the default config base path","    Y.config.base = path.join(__dirname, '../');","","    YUI.require = require;","    YUI.process = process;","    ","    /**","    * Escape the path for Windows, they need to be double encoded when used as `__dirname` or `__filename`","    * @method escapeWinPath","    * @protected","    * @param {String} p The path to modify","    * @return {String} The encoded path","    */","    var escapeWinPath = function(p) {","        return p.replace(/\\\\/g, '\\\\\\\\');","    };","","    /**","    * Takes the raw JS files and wraps them to be executed in the YUI context so they can be loaded","    * into the YUI object","    * @method _exec","    * @private","    * @param {String} data The JS to execute","    * @param {String} url The path to the file that was parsed","    * @param {Callback} cb The callback to execute when this is completed","    * @param {Error} cb.err=null Error object","    * @param {String} cb.url The URL that was just parsed","    */","","    Y.Get._exec = function(data, url, cb) {","        var dirName = escapeWinPath(path.dirname(url));","        var fileName = escapeWinPath(url);","","        if (dirName.match(/^https?:\\/\\//)) {","            dirName = '.';","            fileName = 'remoteResource';","        }","","        var mod = \"(function(YUI) { var __dirname = '\" + dirName + \"'; \"+","            \"var __filename = '\" + fileName + \"'; \" +","            \"var process = YUI.process;\" +","            \"var require = function(file) {\" +","            \" if (file.indexOf('./') === 0) {\" +","            \"   file = __dirname + file.replace('./', '/'); }\" +","            \" return YUI.require(file); }; \" +","            data + \" ;return YUI; })\";","    ","        //var mod = \"(function(YUI) { \" + data + \";return YUI; })\";","        var script = vm.createScript(mod, url);","        var fn = script.runInThisContext(mod);","        YUI = fn(YUI);","        cb(null, url);","    };","    ","    /**","    * Fetches the content from a remote URL or a file from disc and passes the content","    * off to `_exec` for parsing","    * @method _include","    * @private","    * @param {String} url The URL/File path to fetch the content from","    * @param {Callback} cb The callback to fire once the content has been executed via `_exec`","    */","    Y.Get._include = function(url, cb) {","        var self = this;","","        if (url.match(/^https?:\\/\\//)) {","            var cfg = {","                url: url,","                timeout: self.timeout","            };","            request(cfg, function (err, response, body) {","                if (err) {","                    cb(err, url);","                } else {","                    Y.Get._exec(body, url, cb);","                }","            });","        } else {","            if (Y.config.useSync) {","                //Needs to be in useSync","                if (existsSync(url)) {","                    var mod = fs.readFileSync(url,'utf8');","                    Y.Get._exec(mod, url, cb);","                } else {","                    cb('Path does not exist: ' + url, url);","                }","            } else {","                fs.readFile(url, 'utf8', function(err, mod) {","                    if (err) {","                        cb(err, url);","                    } else {","                        Y.Get._exec(mod, url, cb);","                    }","                });","            }","        }","        ","    };","","","    var end = function(cb, msg, result) {","        if (Y.Lang.isFunction(cb.onEnd)) {","            cb.onEnd.call(Y, msg, result);","        }","    }, pass = function(cb) {","        if (Y.Lang.isFunction(cb.onSuccess)) {","            cb.onSuccess.call(Y, cb);","        }","        end(cb, 'success', 'success');","    }, fail = function(cb, er) {","        er.errors = [er];","        if (Y.Lang.isFunction(cb.onFailure)) {","            cb.onFailure.call(Y, er, cb);","        }","        end(cb, er, 'fail');","    };","","","    /**","    * Override for Get.script for loading local or remote YUI modules.","    * @method js","    * @param {Array|String} s The URL's to load into this context","    * @param {Object} options Transaction options","    */","    Y.Get.js = function(s, options) {","        var A = Y.Array,","            self = this,","            urls = A(s), url, i, l = urls.length, c= 0,","            check = function() {","                if (c === l) {","                    pass(options);","                }","            };","","","","        for (i=0; i<l; i++) {","            url = urls[i];","            if (Y.Lang.isObject(url)) {","                url = url.url;","            }","","            url = url.replace(/'/g, '%27');","            Y.Get._include(url, function(err, url) {","                if (!Y.config) {","                    Y.config = {","                        debug: true","                    };","                }","                if (options.onProgress) {","                    options.onProgress.call(options.context || Y, url);","                }","                if (err) {","                    fail(options, err);","                } else {","                    c++;","                    check();","                }","            });","        }","    };","    ","    /**","    * Alias for `Y.Get.js`","    * @method script","    */","    Y.Get.script = Y.Get.js;","    ","    //Place holder for SS Dom access","    Y.Get.css = function(s, cb) {","        pass(cb);","    };","","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('features', function(Y) {","","var feature_tests = {};","","/**","Contains the core of YUI's feature test architecture.","@module features","*/","","/**","* Feature detection","* @class Features","* @static","*/","","Y.mix(Y.namespace('Features'), {","    ","    /**","    * Object hash of all registered feature tests","    * @property tests","    * @type Object","    */","    tests: feature_tests,","    ","    /**","    * Add a test to the system","    * ","    *   ```","    *   Y.Features.add(\"load\", \"1\", {});","    *   ```","    * ","    * @method add","    * @param {String} cat The category, right now only 'load' is supported","    * @param {String} name The number sequence of the test, how it's reported in the URL or config: 1, 2, 3","    * @param {Object} o Object containing test properties","    * @param {String} o.name The name of the test","    * @param {Function} o.test The test function to execute, the only argument to the function is the `Y` instance","    * @param {String} o.trigger The module that triggers this test.","    */","    add: function(cat, name, o) {","        feature_tests[cat] = feature_tests[cat] || {};","        feature_tests[cat][name] = o;","    },","    /**","    * Execute all tests of a given category and return the serialized results","    *","    *   ```","    *   caps=1:1;2:1;3:0","    *   ```","    * @method all","    * @param {String} cat The category to execute","    * @param {Array} args The arguments to pass to the test function","    * @return {String} A semi-colon separated string of tests and their success/failure: 1:1;2:1;3:0","    */","    all: function(cat, args) {","        var cat_o = feature_tests[cat],","            // results = {};","            result = [];","        if (cat_o) {","            Y.Object.each(cat_o, function(v, k) {","                result.push(k + ':' + (Y.Features.test(cat, k, args) ? 1 : 0));","            });","        }","","        return (result.length) ? result.join(';') : '';","    },","    /**","    * Run a sepecific test and return a Boolean response.","    *","    *   ```","    *   Y.Features.test(\"load\", \"1\");","    *   ```","    *","    * @method test","    * @param {String} cat The category of the test to run","    * @param {String} name The name of the test to run","    * @param {Array} args The arguments to pass to the test function","    * @return {Boolean} True or false if the test passed/failed.","    */","    test: function(cat, name, args) {","        args = args || [];","        var result, ua, test,","            cat_o = feature_tests[cat],","            feature = cat_o && cat_o[name];","","        if (!feature) {","        } else {","","            result = feature.result;","","            if (Y.Lang.isUndefined(result)) {","","                ua = feature.ua;","                if (ua) {","                    result = (Y.UA[ua]);","                }","","                test = feature.test;","                if (test && ((!ua) || result)) {","                    result = test.apply(Y, args);","                }","","                feature.result = result;","            }","        }","","        return result;","    }","});","","// Y.Features.add(\"load\", \"1\", {});","// Y.Features.test(\"load\", \"1\");","// caps=1:1;2:0;3:1;","","/* This file is auto-generated by src/loader/scripts/meta_join.js */","var add = Y.Features.add;","// app-transitions-native","add('load', '0', {","    \"name\": \"app-transitions-native\",","    \"test\": function (Y) {","    var doc  = Y.config.doc,","        node = doc ? doc.documentElement : null;","","    if (node && node.style) {","        return ('MozTransition' in node.style || 'WebkitTransition' in node.style);","    }","","    return false;","},","    \"trigger\": \"app-transitions\"","});","// autocomplete-list-keys","add('load', '1', {","    \"name\": \"autocomplete-list-keys\",","    \"test\": function (Y) {","    // Only add keyboard support to autocomplete-list if this doesn't appear to","    // be an iOS or Android-based mobile device.","    //","    // There's currently no feasible way to actually detect whether a device has","    // a hardware keyboard, so this sniff will have to do. It can easily be","    // overridden by manually loading the autocomplete-list-keys module.","    //","    // Worth noting: even though iOS supports bluetooth keyboards, Mobile Safari","    // doesn't fire the keyboard events used by AutoCompleteList, so there's","    // no point loading the -keys module even when a bluetooth keyboard may be","    // available.","    return !(Y.UA.ios || Y.UA.android);","},","    \"trigger\": \"autocomplete-list\"","});","// dd-gestures","add('load', '2', {","    \"name\": \"dd-gestures\",","    \"test\": function(Y) {","    return ((Y.config.win && (\"ontouchstart\" in Y.config.win)) && !(Y.UA.chrome && Y.UA.chrome < 6));","},","    \"trigger\": \"dd-drag\"","});","// dom-style-ie","add('load', '3', {","    \"name\": \"dom-style-ie\",","    \"test\": function (Y) {","","    var testFeature = Y.Features.test,","        addFeature = Y.Features.add,","        WINDOW = Y.config.win,","        DOCUMENT = Y.config.doc,","        DOCUMENT_ELEMENT = 'documentElement',","        ret = false;","","    addFeature('style', 'computedStyle', {","        test: function() {","            return WINDOW && 'getComputedStyle' in WINDOW;","        }","    });","","    addFeature('style', 'opacity', {","        test: function() {","            return DOCUMENT && 'opacity' in DOCUMENT[DOCUMENT_ELEMENT].style;","        }","    });","","    ret =  (!testFeature('style', 'opacity') &&","            !testFeature('style', 'computedStyle'));","","    return ret;","},","    \"trigger\": \"dom-style\"","});","// editor-para-ie","add('load', '4', {","    \"name\": \"editor-para-ie\",","    \"trigger\": \"editor-para\",","    \"ua\": \"ie\",","    \"when\": \"instead\"","});","// event-base-ie","add('load', '5', {","    \"name\": \"event-base-ie\",","    \"test\": function(Y) {","    var imp = Y.config.doc && Y.config.doc.implementation;","    return (imp && (!imp.hasFeature('Events', '2.0')));","},","    \"trigger\": \"node-base\"","});","// graphics-canvas","add('load', '6', {","    \"name\": \"graphics-canvas\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext(\"2d\"));","},","    \"trigger\": \"graphics\"","});","// graphics-canvas-default","add('load', '7', {","    \"name\": \"graphics-canvas-default\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext(\"2d\"));","},","    \"trigger\": \"graphics\"","});","// graphics-svg","add('load', '8', {","    \"name\": \"graphics-svg\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    ","    return svg && (useSVG || !canvas);","},","    \"trigger\": \"graphics\"","});","// graphics-svg-default","add('load', '9', {","    \"name\": \"graphics-svg-default\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    ","    return svg && (useSVG || !canvas);","},","    \"trigger\": \"graphics\"","});","// graphics-vml","add('load', '10', {","    \"name\": \"graphics-vml\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\");","    return (DOCUMENT && !DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\") && (!canvas || !canvas.getContext || !canvas.getContext(\"2d\")));","},","    \"trigger\": \"graphics\"","});","// graphics-vml-default","add('load', '11', {","    \"name\": \"graphics-vml-default\",","    \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\");","    return (DOCUMENT && !DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\") && (!canvas || !canvas.getContext || !canvas.getContext(\"2d\")));","},","    \"trigger\": \"graphics\"","});","// history-hash-ie","add('load', '12', {","    \"name\": \"history-hash-ie\",","    \"test\": function (Y) {","    var docMode = Y.config.doc && Y.config.doc.documentMode;","","    return Y.UA.ie && (!('onhashchange' in Y.config.win) ||","            !docMode || docMode < 8);","},","    \"trigger\": \"history-hash\"","});","// io-nodejs","add('load', '13', {","    \"name\": \"io-nodejs\",","    \"trigger\": \"io-base\",","    \"ua\": \"nodejs\"","});","// scrollview-base-ie","add('load', '14', {","    \"name\": \"scrollview-base-ie\",","    \"trigger\": \"scrollview-base\",","    \"ua\": \"ie\"","});","// selector-css2","add('load', '15', {","    \"name\": \"selector-css2\",","    \"test\": function (Y) {","    var DOCUMENT = Y.config.doc,","        ret = DOCUMENT && !('querySelectorAll' in DOCUMENT);","","    return ret;","},","    \"trigger\": \"selector\"","});","// transition-timer","add('load', '16', {","    \"name\": \"transition-timer\",","    \"test\": function (Y) {","    var DOCUMENT = Y.config.doc,","        node = (DOCUMENT) ? DOCUMENT.documentElement: null,","        ret = true;","","    if (node && node.style) {","        ret = !('MozTransition' in node.style || 'WebkitTransition' in node.style);","    } ","","    return ret;","},","    \"trigger\": \"transition\"","});","// widget-base-ie","add('load', '17', {","    \"name\": \"widget-base-ie\",","    \"trigger\": \"widget-base\",","    \"ua\": \"ie\"","});","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('intl-base', function(Y) {","","/**"," * The Intl utility provides a central location for managing sets of"," * localized resources (strings and formatting patterns)."," *"," * @class Intl"," * @uses EventTarget"," * @static"," */","","var SPLIT_REGEX = /[, ]/;","","Y.mix(Y.namespace('Intl'), {",""," /**","    * Returns the language among those available that","    * best matches the preferred language list, using the Lookup","    * algorithm of BCP 47.","    * If none of the available languages meets the user's preferences,","    * then \"\" is returned.","    * Extended language ranges are not supported.","    *","    * @method lookupBestLang","    * @param {String[] | String} preferredLanguages The list of preferred","    * languages in descending preference order, represented as BCP 47","    * language tags. A string array or a comma-separated list.","    * @param {String[]} availableLanguages The list of languages","    * that the application supports, represented as BCP 47 language","    * tags.","    *","    * @return {String} The available language that best matches the","    * preferred language list, or \"\".","    * @since 3.1.0","    */","    lookupBestLang: function(preferredLanguages, availableLanguages) {","","        var i, language, result, index;","","        // check whether the list of available languages contains language;","        // if so return it","        function scan(language) {","            var i;","            for (i = 0; i < availableLanguages.length; i += 1) {","                if (language.toLowerCase() ===","                            availableLanguages[i].toLowerCase()) {","                    return availableLanguages[i];","                }","            }","        }","","        if (Y.Lang.isString(preferredLanguages)) {","            preferredLanguages = preferredLanguages.split(SPLIT_REGEX);","        }","","        for (i = 0; i < preferredLanguages.length; i += 1) {","            language = preferredLanguages[i];","            if (!language || language === '*') {","                continue;","            }","            // check the fallback sequence for one language","            while (language.length > 0) {","                result = scan(language);","                if (result) {","                    return result;","                } else {","                    index = language.lastIndexOf('-');","                    if (index >= 0) {","                        language = language.substring(0, index);","                        // one-character subtags get cut along with the","                        // following subtag","                        if (index >= 2 && language.charAt(index - 2) === '-') {","                            language = language.substring(0, index - 2);","                        }","                    } else {","                        // nothing available for this language","                        break;","                    }","                }","            }","        }","","        return '';","    }","});","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('yui-log', function(Y) {","","/**"," * Provides console log capability and exposes a custom event for"," * console implementations. This module is a `core` YUI module, <a href=\"../classes/YUI.html#method_log\">it's documentation is located under the YUI class</a>."," *"," * @module yui"," * @submodule yui-log"," */","","var INSTANCE = Y,","    LOGEVENT = 'yui:log',","    UNDEFINED = 'undefined',","    LEVELS = { debug: 1,","               info: 1,","               warn: 1,","               error: 1 };","","/**"," * If the 'debug' config is true, a 'yui:log' event will be"," * dispatched, which the Console widget and anything else"," * can consume.  If the 'useBrowserConsole' config is true, it will"," * write to the browser console if available.  YUI-specific log"," * messages will only be present in the -debug versions of the"," * JS files.  The build system is supposed to remove log statements"," * from the raw and minified versions of the files."," *"," * @method log"," * @for YUI"," * @param  {String}  msg  The message to log."," * @param  {String}  cat  The log category for the message.  Default"," *                        categories are \"info\", \"warn\", \"error\", time\"."," *                        Custom categories can be used as well. (opt)."," * @param  {String}  src  The source of the the message (opt)."," * @param  {boolean} silent If true, the log event won't fire."," * @return {YUI}      YUI instance."," */","INSTANCE.log = function(msg, cat, src, silent) {","    var bail, excl, incl, m, f,","        Y = INSTANCE,","        c = Y.config,","        publisher = (Y.fire) ? Y : YUI.Env.globalEvents;","    // suppress log message if the config is off or the event stack","    // or the event call stack contains a consumer of the yui:log event","    if (c.debug) {","        // apply source filters","        src = src || \"\";","        if (typeof src !== \"undefined\") {","            excl = c.logExclude;","            incl = c.logInclude;","            if (incl && !(src in incl)) {","                bail = 1;","            } else if (incl && (src in incl)) {","                bail = !incl[src];","            } else if (excl && (src in excl)) {","                bail = excl[src];","            }","        }","        if (!bail) {","            if (c.useBrowserConsole) {","                m = (src) ? src + ': ' + msg : msg;","                if (Y.Lang.isFunction(c.logFn)) {","                    c.logFn.call(Y, msg, cat, src);","                } else if (typeof console != UNDEFINED && console.log) {","                    f = (cat && console[cat] && (cat in LEVELS)) ? cat : 'log';","                    console[f](m);","                } else if (typeof opera != UNDEFINED) {","                    opera.postError(m);","                }","            }","","            if (publisher && !silent) {","","                if (publisher == Y && (!publisher.getEvent(LOGEVENT))) {","                    publisher.publish(LOGEVENT, {","                        broadcast: 2","                    });","                }","","                publisher.fire(LOGEVENT, {","                    msg: msg,","                    cat: cat,","                    src: src","                });","            }","        }","    }","","    return Y;","};","","/**"," * Write a system message.  This message will be preserved in the"," * minified and raw versions of the YUI files, unlike log statements."," * @method message"," * @for YUI"," * @param  {String}  msg  The message to log."," * @param  {String}  cat  The log category for the message.  Default"," *                        categories are \"info\", \"warn\", \"error\", time\"."," *                        Custom categories can be used as well. (opt)."," * @param  {String}  src  The source of the the message (opt)."," * @param  {boolean} silent If true, the log event won't fire."," * @return {YUI}      YUI instance."," */","INSTANCE.message = function() {","    return INSTANCE.log.apply(INSTANCE, arguments);","};","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('yui-log-nodejs', function(Y) {","","var sys = require(process.binding('natives').util ? 'util' : 'sys'),","    hasColor = false;","","try {","    var stdio = require(\"stdio\");","    hasColor = stdio.isStderrATTY();","} catch (ex) {","    hasColor = true;","}","","Y.config.useColor = hasColor;","","Y.consoleColor = function(str, num) {","    if (!this.config.useColor) {","        return str;","    }","    if (!num) {","        num = '32';","    }","    return \"\\u001b[\" + num +\"m\" + str + \"\\u001b[0m\";","};","","","var logFn = function(str, t, m) {","    var id = '';","    if (this.id) {","        id = '[' + this.id + ']:';","    }","    t = t || 'info';","    m = (m) ? this.consoleColor(' (' +  m.toLowerCase() + '):', 35) : '';","    ","    if (str === null) {","        str = 'null';","    }","","    if ((typeof str === 'object') || str instanceof Array) {","        try {","            //Should we use this?","            if (str.tagName || str._yuid || str._query) {","                str = str.toString();","            } else {","                str = sys.inspect(str);","            }","        } catch (e) {","            //Fail catcher","        }","    }","","    var lvl = '37;40', mLvl = ((str) ? '' : 31);","    t = t+''; //Force to a string..","    switch (t.toLowerCase()) {","        case 'error':","            lvl = mLvl = 31;","            break;","        case 'warn':","            lvl = 33;","            break;","        case 'debug':","            lvl = 34;","            break;","    }","    if (typeof str === 'string') {","        if (str && str.indexOf(\"\\n\") !== -1) {","            str = \"\\n\" + str;","        }","    }","","    // output log messages to stderr","    sys.error(this.consoleColor(t.toLowerCase() + ':', lvl) + m + ' ' + this.consoleColor(str, mLvl));","};","","if (!Y.config.logFn) {","    Y.config.logFn = logFn;","}","","","","}, '@VERSION@' ,{requires:['yui-log']});","YUI.add('yui-later', function(Y) {","","/**"," * Provides a setTimeout/setInterval wrapper. This module is a `core` YUI module, <a href=\"../classes/YUI.html#method_later\">it's documentation is located under the YUI class</a>."," *"," * @module yui"," * @submodule yui-later"," */","","var NO_ARGS = [];","","/**"," * Executes the supplied function in the context of the supplied"," * object 'when' milliseconds later.  Executes the function a"," * single time unless periodic is set to true."," * @for YUI"," * @method later"," * @param when {int} the number of milliseconds to wait until the fn"," * is executed."," * @param o the context object."," * @param fn {Function|String} the function to execute or the name of"," * the method in the 'o' object to execute."," * @param data [Array] data that is provided to the function.  This"," * accepts either a single item or an array.  If an array is provided,"," * the function is executed with one parameter for each array item."," * If you need to pass a single array parameter, it needs to be wrapped"," * in an array [myarray]."," *"," * Note: native methods in IE may not have the call and apply methods."," * In this case, it will work, but you are limited to four arguments."," *"," * @param periodic {boolean} if true, executes continuously at supplied"," * interval until canceled."," * @return {object} a timer object. Call the cancel() method on this"," * object to stop the timer."," */","Y.later = function(when, o, fn, data, periodic) {","    when = when || 0;","    data = (!Y.Lang.isUndefined(data)) ? Y.Array(data) : NO_ARGS;","    o = o || Y.config.win || Y;","","    var cancelled = false,","        method = (o && Y.Lang.isString(fn)) ? o[fn] : fn,","        wrapper = function() {","            // IE 8- may execute a setInterval callback one last time","            // after clearInterval was called, so in order to preserve","            // the cancel() === no more runny-run, we have to jump through","            // an extra hoop.","            if (!cancelled) {","                if (!method.apply) {","                    method(data[0], data[1], data[2], data[3]);","                } else {","                    method.apply(o, data || NO_ARGS);","                }","            }","        },","        id = (periodic) ? setInterval(wrapper, when) : setTimeout(wrapper, when);","","    return {","        id: id,","        interval: periodic,","        cancel: function() {","            cancelled = true;","            if (this.interval) {","                clearInterval(id);","            } else {","                clearTimeout(id);","            }","        }","    };","};","","Y.Lang.later = Y.later;","","","","}, '@VERSION@' ,{requires:['yui-base']});","YUI.add('loader-base', function(Y) {","","/**"," * The YUI loader core"," * @module loader"," * @submodule loader-base"," */","","if (!YUI.Env[Y.version]) {","","    (function() {","        var VERSION = Y.version,","            BUILD = '/build/',","            ROOT = VERSION + BUILD,","            CDN_BASE = Y.Env.base,","            GALLERY_VERSION = '${loader.gallery}',","            TNT = '2in3',","            TNT_VERSION = '${loader.tnt}',","            YUI2_VERSION = '${loader.yui2}',","            COMBO_BASE = CDN_BASE + 'combo?',","            META = { version: VERSION,","                              root: ROOT,","                              base: Y.Env.base,","                              comboBase: COMBO_BASE,","                              skin: { defaultSkin: 'sam',","                                           base: 'assets/skins/',","                                           path: 'skin.css',","                                           after: ['cssreset',","                                                          'cssfonts',","                                                          'cssgrids',","                                                          'cssbase',","                                                          'cssreset-context',","                                                          'cssfonts-context']},","                              groups: {},","                              patterns: {} },","            groups = META.groups,","            yui2Update = function(tnt, yui2, config) {","                    ","                var root = TNT + '.' +","                        (tnt || TNT_VERSION) + '/' +","                        (yui2 || YUI2_VERSION) + BUILD,","                    base = (config && config.base) ? config.base : CDN_BASE,","                    combo = (config && config.comboBase) ? config.comboBase : COMBO_BASE;","","                groups.yui2.base = base + root;","                groups.yui2.root = root;","                groups.yui2.comboBase = combo;","            },","            galleryUpdate = function(tag, config) {","                var root = (tag || GALLERY_VERSION) + BUILD,","                    base = (config && config.base) ? config.base : CDN_BASE,","                    combo = (config && config.comboBase) ? config.comboBase : COMBO_BASE;","","                groups.gallery.base = base + root;","                groups.gallery.root = root;","                groups.gallery.comboBase = combo;","            };","","","        groups[VERSION] = {};","","        groups.gallery = {","            ext: false,","            combine: true,","            comboBase: COMBO_BASE,","            update: galleryUpdate,","            patterns: { 'gallery-': { },","                        'lang/gallery-': {},","                        'gallerycss-': { type: 'css' } }","        };","","        groups.yui2 = {","            combine: true,","            ext: false,","            comboBase: COMBO_BASE,","            update: yui2Update,","            patterns: {","                'yui2-': {","                    configFn: function(me) {","                        if (/-skin|reset|fonts|grids|base/.test(me.name)) {","                            me.type = 'css';","                            me.path = me.path.replace(/\\.js/, '.css');","                            // this makes skins in builds earlier than","                            // 2.6.0 work as long as combine is false","                            me.path = me.path.replace(/\\/yui2-skin/,","                                             '/assets/skins/sam/yui2-skin');","                        }","                    }","                }","            }","        };","","        galleryUpdate();","        yui2Update();","","        YUI.Env[VERSION] = META;","    }());","}","","","/*jslint forin: true */","","/**"," * Loader dynamically loads script and css files.  It includes the dependency"," * information for the version of the library in use, and will automatically pull in"," * dependencies for the modules requested. It can also load the"," * files from the Yahoo! CDN, and it can utilize the combo service provided on"," * this network to reduce the number of http connections required to download"," * YUI files."," *"," * @module loader"," * @main loader"," * @submodule loader-base"," */","","var NOT_FOUND = {},","    NO_REQUIREMENTS = [],","    MAX_URL_LENGTH = 1024,","    GLOBAL_ENV = YUI.Env,","    GLOBAL_LOADED = GLOBAL_ENV._loaded,","    CSS = 'css',","    JS = 'js',","    INTL = 'intl',","    DEFAULT_SKIN = 'sam',","    VERSION = Y.version,","    ROOT_LANG = '',","    YObject = Y.Object,","    oeach = YObject.each,","    YArray = Y.Array,","    _queue = GLOBAL_ENV._loaderQueue,","    META = GLOBAL_ENV[VERSION],","    SKIN_PREFIX = 'skin-',","    L = Y.Lang,","    ON_PAGE = GLOBAL_ENV.mods,","    modulekey,","    cache,","    _path = function(dir, file, type, nomin) {","        var path = dir + '/' + file;","        if (!nomin) {","            path += '-min';","        }","        path += '.' + (type || CSS);","","        return path;","    };","","","    if (!YUI.Env._cssLoaded) {","        YUI.Env._cssLoaded = {};","    }","","","/**"," * The component metadata is stored in Y.Env.meta."," * Part of the loader module."," * @property meta"," * @for YUI"," */","Y.Env.meta = META;","","/**"," * Loader dynamically loads script and css files.  It includes the dependency"," * info for the version of the library in use, and will automatically pull in"," * dependencies for the modules requested. It can load the"," * files from the Yahoo! CDN, and it can utilize the combo service provided on"," * this network to reduce the number of http connections required to download"," * YUI files. You can also specify an external, custom combo service to host"," * your modules as well.","","        var Y = YUI();","        var loader = new Y.Loader({","            filter: 'debug',","            base: '../../',","            root: 'build/',","            combine: true,","            require: ['node', 'dd', 'console']","        });","        var out = loader.resolve(true);"," "," * @constructor"," * @class Loader"," * @param {Object} config an optional set of configuration options."," * @param {String} config.base The base dir which to fetch this module from"," * @param {String} config.comboBase The Combo service base path. Ex: `http://yui.yahooapis.com/combo?`"," * @param {String} config.root The root path to prepend to module names for the combo service. Ex: `2.5.2/build/`"," * @param {String|Object} config.filter A filter to apply to result urls. <a href=\"#property_filter\">See filter property</a>"," * @param {Object} config.filters Per-component filter specification.  If specified for a given component, this overrides the filter config."," * @param {Boolean} config.combine Use a combo service to reduce the number of http connections required to load your dependencies"," * @param {Boolean} [config.async=true] Fetch files in async"," * @param {Array} config.ignore: A list of modules that should never be dynamically loaded"," * @param {Array} config.force A list of modules that should always be loaded when required, even if already present on the page"," * @param {HTMLElement|String} config.insertBefore Node or id for a node that should be used as the insertion point for new nodes"," * @param {Object} config.jsAttributes Object literal containing attributes to add to script nodes"," * @param {Object} config.cssAttributes Object literal containing attributes to add to link nodes"," * @param {Number} config.timeout The number of milliseconds before a timeout occurs when dynamically loading nodes.  If not set, there is no timeout"," * @param {Object} config.context Execution context for all callbacks"," * @param {Function} config.onSuccess Callback for the 'success' event"," * @param {Function} config.onFailure Callback for the 'failure' event"," * @param {Function} config.onCSS Callback for the 'CSSComplete' event.  When loading YUI components with CSS the CSS is loaded first, then the script.  This provides a moment you can tie into to improve the presentation of the page while the script is loading."," * @param {Function} config.onTimeout Callback for the 'timeout' event"," * @param {Function} config.onProgress Callback executed each time a script or css file is loaded"," * @param {Object} config.modules A list of module definitions.  See <a href=\"#method_addModule\">Loader.addModule</a> for the supported module metadata"," * @param {Object} config.groups A list of group definitions.  Each group can contain specific definitions for `base`, `comboBase`, `combine`, and accepts a list of `modules`."," * @param {String} config.2in3 The version of the YUI 2 in 3 wrapper to use.  The intrinsic support for YUI 2 modules in YUI 3 relies on versions of the YUI 2 components inside YUI 3 module wrappers.  These wrappers change over time to accomodate the issues that arise from running YUI 2 in a YUI 3 sandbox."," * @param {String} config.yui2 When using the 2in3 project, you can select the version of YUI 2 to use.  Valid values are `2.2.2`, `2.3.1`, `2.4.1`, `2.5.2`, `2.6.0`, `2.7.0`, `2.8.0`, `2.8.1` and `2.9.0` [default] -- plus all versions of YUI 2 going forward."," */","Y.Loader = function(o) {","","    var self = this;","    ","    //Catch no config passed.","    o = o || {};","","    modulekey = META.md5;","","    /**","     * Internal callback to handle multiple internal insert() calls","     * so that css is inserted prior to js","     * @property _internalCallback","     * @private","     */","    // self._internalCallback = null;","","    /**","     * Callback that will be executed when the loader is finished","     * with an insert","     * @method onSuccess","     * @type function","     */","    // self.onSuccess = null;","","    /**","     * Callback that will be executed if there is a failure","     * @method onFailure","     * @type function","     */","    // self.onFailure = null;","","    /**","     * Callback for the 'CSSComplete' event.  When loading YUI components","     * with CSS the CSS is loaded first, then the script.  This provides","     * a moment you can tie into to improve the presentation of the page","     * while the script is loading.","     * @method onCSS","     * @type function","     */","    // self.onCSS = null;","","    /**","     * Callback executed each time a script or css file is loaded","     * @method onProgress","     * @type function","     */","    // self.onProgress = null;","","    /**","     * Callback that will be executed if a timeout occurs","     * @method onTimeout","     * @type function","     */","    // self.onTimeout = null;","","    /**","     * The execution context for all callbacks","     * @property context","     * @default {YUI} the YUI instance","     */","    self.context = Y;","","    /**","     * Data that is passed to all callbacks","     * @property data","     */","    // self.data = null;","","    /**","     * Node reference or id where new nodes should be inserted before","     * @property insertBefore","     * @type string|HTMLElement","     */","    // self.insertBefore = null;","","    /**","     * The charset attribute for inserted nodes","     * @property charset","     * @type string","     * @deprecated , use cssAttributes or jsAttributes.","     */","    // self.charset = null;","","    /**","     * An object literal containing attributes to add to link nodes","     * @property cssAttributes","     * @type object","     */","    // self.cssAttributes = null;","","    /**","     * An object literal containing attributes to add to script nodes","     * @property jsAttributes","     * @type object","     */","    // self.jsAttributes = null;","","    /**","     * The base directory.","     * @property base","     * @type string","     * @default http://yui.yahooapis.com/[YUI VERSION]/build/","     */","    self.base = Y.Env.meta.base + Y.Env.meta.root;","","    /**","     * Base path for the combo service","     * @property comboBase","     * @type string","     * @default http://yui.yahooapis.com/combo?","     */","    self.comboBase = Y.Env.meta.comboBase;","","    /*","     * Base path for language packs.","     */","    // self.langBase = Y.Env.meta.langBase;","    // self.lang = \"\";","","    /**","     * If configured, the loader will attempt to use the combo","     * service for YUI resources and configured external resources.","     * @property combine","     * @type boolean","     * @default true if a base dir isn't in the config","     */","    self.combine = o.base &&","        (o.base.indexOf(self.comboBase.substr(0, 20)) > -1);","    ","    /**","    * The default seperator to use between files in a combo URL","    * @property comboSep","    * @type {String}","    * @default Ampersand","    */","    self.comboSep = '&';","    /**","     * Max url length for combo urls.  The default is 1024. This is the URL","     * limit for the Yahoo! hosted combo servers.  If consuming","     * a different combo service that has a different URL limit","     * it is possible to override this default by supplying","     * the maxURLLength config option.  The config option will","     * only take effect if lower than the default.","     *","     * @property maxURLLength","     * @type int","     */","    self.maxURLLength = MAX_URL_LENGTH;","","    /**","     * Ignore modules registered on the YUI global","     * @property ignoreRegistered","     * @default false","     */","    self.ignoreRegistered = o.ignoreRegistered;","","    /**","     * Root path to prepend to module path for the combo","     * service","     * @property root","     * @type string","     * @default [YUI VERSION]/build/","     */","    self.root = Y.Env.meta.root;","","    /**","     * Timeout value in milliseconds.  If set, self value will be used by","     * the get utility.  the timeout event will fire if","     * a timeout occurs.","     * @property timeout","     * @type int","     */","    self.timeout = 0;","","    /**","     * A list of modules that should not be loaded, even if","     * they turn up in the dependency tree","     * @property ignore","     * @type string[]","     */","    // self.ignore = null;","","    /**","     * A list of modules that should always be loaded, even","     * if they have already been inserted into the page.","     * @property force","     * @type string[]","     */","    // self.force = null;","","    self.forceMap = {};","","    /**","     * Should we allow rollups","     * @property allowRollup","     * @type boolean","     * @default false","     */","    self.allowRollup = false;","","    /**","     * A filter to apply to result urls.  This filter will modify the default","     * path for all modules.  The default path for the YUI library is the","     * minified version of the files (e.g., event-min.js).  The filter property","     * can be a predefined filter or a custom filter.  The valid predefined","     * filters are:","     * <dl>","     *  <dt>DEBUG</dt>","     *  <dd>Selects the debug versions of the library (e.g., event-debug.js).","     *      This option will automatically include the Logger widget</dd>","     *  <dt>RAW</dt>","     *  <dd>Selects the non-minified version of the library (e.g., event.js).","     *  </dd>","     * </dl>","     * You can also define a custom filter, which must be an object literal","     * containing a search expression and a replace string:","     *","     *      myFilter: {","     *          'searchExp': \"-min\\\\.js\",","     *          'replaceStr': \"-debug.js\"","     *      }","     *","     * @property filter","     * @type string| {searchExp: string, replaceStr: string}","     */","    // self.filter = null;","","    /**","     * per-component filter specification.  If specified for a given","     * component, this overrides the filter config.","     * @property filters","     * @type object","     */","    self.filters = {};","","    /**","     * The list of requested modules","     * @property required","     * @type {string: boolean}","     */","    self.required = {};","","    /**","     * If a module name is predefined when requested, it is checked againsts","     * the patterns provided in this property.  If there is a match, the","     * module is added with the default configuration.","     *","     * At the moment only supporting module prefixes, but anticipate","     * supporting at least regular expressions.","     * @property patterns","     * @type Object","     */","    // self.patterns = Y.merge(Y.Env.meta.patterns);","    self.patterns = {};","","    /**","     * The library metadata","     * @property moduleInfo","     */","    // self.moduleInfo = Y.merge(Y.Env.meta.moduleInfo);","    self.moduleInfo = {};","","    self.groups = Y.merge(Y.Env.meta.groups);","","    /**","     * Provides the information used to skin the skinnable components.","     * The following skin definition would result in 'skin1' and 'skin2'","     * being loaded for calendar (if calendar was requested), and","     * 'sam' for all other skinnable components:","     *","     *      skin: {","     *          // The default skin, which is automatically applied if not","     *          // overriden by a component-specific skin definition.","     *          // Change this in to apply a different skin globally","     *          defaultSkin: 'sam',","     *","     *          // This is combined with the loader base property to get","     *          // the default root directory for a skin. ex:","     *          // http://yui.yahooapis.com/2.3.0/build/assets/skins/sam/","     *          base: 'assets/skins/',","     *          ","     *          // Any component-specific overrides can be specified here,","     *          // making it possible to load different skins for different","     *          // components.  It is possible to load more than one skin","     *          // for a given component as well.","     *          overrides: {","     *              calendar: ['skin1', 'skin2']","     *          }","     *      }","     * @property skin","     * @type {Object}","     */","    self.skin = Y.merge(Y.Env.meta.skin);","","    /*","     * Map of conditional modules","     * @since 3.2.0","     */","    self.conditions = {};","","    // map of modules with a hash of modules that meet the requirement","    // self.provides = {};","","    self.config = o;","    self._internal = true;","","    self._populateCache();","","    /**","     * Set when beginning to compute the dependency tree.","     * Composed of what YUI reports to be loaded combined","     * with what has been loaded by any instance on the page","     * with the version number specified in the metadata.","     * @property loaded","     * @type {string: boolean}","     */","    self.loaded = GLOBAL_LOADED[VERSION];","","    ","    /**","    * Should Loader fetch scripts in `async`, defaults to `true`","    * @property async","    */","","    self.async = true;","","    self._inspectPage();","","    self._internal = false;","","    self._config(o);","","    self.forceMap = (self.force) ? Y.Array.hash(self.force) : {};	","","    self.testresults = null;","","    if (Y.config.tests) {","        self.testresults = Y.config.tests;","    }","    ","    /**","     * List of rollup files found in the library metadata","     * @property rollups","     */","    // self.rollups = null;","","    /**","     * Whether or not to load optional dependencies for","     * the requested modules","     * @property loadOptional","     * @type boolean","     * @default false","     */","    // self.loadOptional = false;","","    /**","     * All of the derived dependencies in sorted order, which","     * will be populated when either calculate() or insert()","     * is called","     * @property sorted","     * @type string[]","     */","    self.sorted = [];","","    /*","     * A list of modules to attach to the YUI instance when complete.","     * If not supplied, the sorted list of dependencies are applied.","     * @property attaching","     */","    // self.attaching = null;","","    /**","     * Flag to indicate the dependency tree needs to be recomputed","     * if insert is called again.","     * @property dirty","     * @type boolean","     * @default true","     */","    self.dirty = true;","","    /**","     * List of modules inserted by the utility","     * @property inserted","     * @type {string: boolean}","     */","    self.inserted = {};","","    /**","     * List of skipped modules during insert() because the module","     * was not defined","     * @property skipped","     */","    self.skipped = {};","","    // Y.on('yui:load', self.loadNext, self);","","    self.tested = {};","","    /*","     * Cached sorted calculate results","     * @property results","     * @since 3.2.0","     */","    //self.results = {};","","    if (self.ignoreRegistered) {","        //Clear inpage already processed modules.","        self._resetModules();","    }","","};","","Y.Loader.prototype = {","    /**","    * Checks the cache for modules and conditions, if they do not exist","    * process the default metadata and populate the local moduleInfo hash.","    * @method _populateCache","    * @private","    */","    _populateCache: function() {","        var self = this,","            defaults = META.modules,","            cache = GLOBAL_ENV._renderedMods,","            i;","","        if (cache && !self.ignoreRegistered) {","            for (i in cache) {","                if (cache.hasOwnProperty(i)) {","                    self.moduleInfo[i] = Y.merge(cache[i]);","                }","            }","","            cache = GLOBAL_ENV._conditions;","            for (i in cache) {","                if (cache.hasOwnProperty(i)) {","                    self.conditions[i] = Y.merge(cache[i]);","                }","            }","","        } else {","            for (i in defaults) {","                if (defaults.hasOwnProperty(i)) {","                    self.addModule(defaults[i], i);","                }","            }","        }","","    },","    /**","    * Reset modules in the module cache to a pre-processed state so additional","    * computations with a different skin or language will work as expected.","    * @private _resetModules","    */","    _resetModules: function() {","        var self = this, i, o;","        for (i in self.moduleInfo) {","            if (self.moduleInfo.hasOwnProperty(i)) {","                var mod = self.moduleInfo[i],","                    name = mod.name,","                    details  = (YUI.Env.mods[name] ? YUI.Env.mods[name].details : null);","","                if (details) {","                    self.moduleInfo[name]._reset = true;","                    self.moduleInfo[name].requires = details.requires || [];","                    self.moduleInfo[name].optional = details.optional || [];","                    self.moduleInfo[name].supersedes = details.supercedes || [];","                }","","                if (mod.defaults) {","                    for (o in mod.defaults) {","                        if (mod.defaults.hasOwnProperty(o)) {","                            if (mod[o]) {","                                mod[o] = mod.defaults[o];","                            }","                        }","                    }","                }","                delete mod.langCache;","                delete mod.skinCache;","                if (mod.skinnable) {","                    self._addSkin(self.skin.defaultSkin, mod.name);","                }","            }","        }","    },","    /**","    Regex that matches a CSS URL. Used to guess the file type when it's not","    specified.","","    @property REGEX_CSS","    @type RegExp","    @final","    @protected","    @since 3.5.0","    **/","    REGEX_CSS: /\\.css(?:[?;].*)?$/i,","    ","    /**","    * Default filters for raw and debug","    * @property FILTER_DEFS","    * @type Object","    * @final","    * @protected","    */","    FILTER_DEFS: {","        RAW: {","            'searchExp': '-min\\\\.js',","            'replaceStr': '.js'","        },","        DEBUG: {","            'searchExp': '-min\\\\.js',","            'replaceStr': '-debug.js'","        },","        COVERAGE: {","            'searchExp': '-min\\\\.js',","            'replaceStr': '-coverage.js'","        }","    },","    /*","    * Check the pages meta-data and cache the result.","    * @method _inspectPage","    * @private","    */","    _inspectPage: function() {","        var self = this, v, m, req, mr, i;","","        //Inspect the page for CSS only modules and mark them as loaded.","        for (i in self.moduleInfo) {","            if (self.moduleInfo.hasOwnProperty(i)) {","                v = self.moduleInfo[i];","                if (v.type && v.type === CSS) {","                    if (self.isCSSLoaded(v.name)) {","                        self.loaded[i] = true;","                    }","                }","            }","        }","        for (i in ON_PAGE) {","            if (ON_PAGE.hasOwnProperty(i)) {","                v = ON_PAGE[i];","                if (v.details) {","                    m = self.moduleInfo[v.name];","                    req = v.details.requires;","                    mr = m && m.requires;","","                   if (m) {","                       if (!m._inspected && req && mr.length != req.length) {","                           // console.log('deleting ' + m.name);","                           delete m.expanded;","                       }","                   } else {","                       m = self.addModule(v.details, i);","                   }","                   m._inspected = true;","               }","            }","        }","    },","    /*","    * returns true if b is not loaded, and is required directly or by means of modules it supersedes.","    * @private","    * @method _requires","    * @param {String} mod1 The first module to compare","    * @param {String} mod2 The second module to compare","    */","   _requires: function(mod1, mod2) {","","        var i, rm, after_map, s,","            info = this.moduleInfo,","            m = info[mod1],","            other = info[mod2];","","        if (!m || !other) {","            return false;","        }","","        rm = m.expanded_map;","        after_map = m.after_map;","","        // check if this module should be sorted after the other","        // do this first to short circut circular deps","        if (after_map && (mod2 in after_map)) {","            return true;","        }","","        after_map = other.after_map;","","        // and vis-versa","        if (after_map && (mod1 in after_map)) {","            return false;","        }","","        // check if this module requires one the other supersedes","        s = info[mod2] && info[mod2].supersedes;","        if (s) {","            for (i = 0; i < s.length; i++) {","                if (this._requires(mod1, s[i])) {","                    return true;","                }","            }","        }","","        s = info[mod1] && info[mod1].supersedes;","        if (s) {","            for (i = 0; i < s.length; i++) {","                if (this._requires(mod2, s[i])) {","                    return false;","                }","            }","        }","","        // check if this module requires the other directly","        // if (r && YArray.indexOf(r, mod2) > -1) {","        if (rm && (mod2 in rm)) {","            return true;","        }","","        // external css files should be sorted below yui css","        if (m.ext && m.type == CSS && !other.ext && other.type == CSS) {","            return true;","        }","","        return false;","    },","    /**","    * Apply a new config to the Loader instance","    * @method _config","    * @private","    * @param {Object} o The new configuration","    */","    _config: function(o) {","        var i, j, val, a, f, group, groupName, self = this;","        // apply config values","        if (o) {","            for (i in o) {","                if (o.hasOwnProperty(i)) {","                    val = o[i];","                    if (i == 'require') {","                        self.require(val);","                    } else if (i == 'skin') {","                        //If the config.skin is a string, format to the expected object","                        if (typeof val === 'string') {","                            self.skin.defaultSkin = o.skin;","                            val = {","                                defaultSkin: val","                            };","                        }","","                        Y.mix(self.skin, val, true);","                    } else if (i == 'groups') {","                        for (j in val) {","                            if (val.hasOwnProperty(j)) {","                                groupName = j;","                                group = val[j];","                                self.addGroup(group, groupName);","                                if (group.aliases) {","                                    for (a in group.aliases) {","                                        if (group.aliases.hasOwnProperty(a)) {","                                            self.addAlias(group.aliases[a], a);","                                        }","                                    }","                                }","                            }","                        }","","                    } else if (i == 'modules') {","                        // add a hash of module definitions","                        for (j in val) {","                            if (val.hasOwnProperty(j)) {","                                self.addModule(val[j], j);","                            }","                        }","                    } else if (i === 'aliases') {","                        for (j in val) {","                            if (val.hasOwnProperty(j)) {","                                self.addAlias(val[j], j);","                            }","                        }","                    } else if (i == 'gallery') {","                        this.groups.gallery.update(val, o);","                    } else if (i == 'yui2' || i == '2in3') {","                        this.groups.yui2.update(o['2in3'], o.yui2, o);","                    } else {","                        self[i] = val;","                    }","                }","            }","        }","","        // fix filter","        f = self.filter;","","        if (L.isString(f)) {","            f = f.toUpperCase();","            self.filterName = f;","            self.filter = self.FILTER_DEFS[f];","            if (f == 'DEBUG') {","                self.require('yui-log', 'dump');","            }","        }","","        if (self.filterName && self.coverage) {","            if (self.filterName == 'COVERAGE' && L.isArray(self.coverage) && self.coverage.length) {","                var mods = [];","                for (i = 0; i < self.coverage.length; i++) {","                    var mod = self.coverage[i];","                    if (self.moduleInfo[mod] && self.moduleInfo[mod].use) {","                        mods = [].concat(mods, self.moduleInfo[mod].use);","                    } else {","                        mods.push(mod);","                    }","                }","                self.filters = self.filters || {};","                Y.Array.each(mods, function(mod) {","                    self.filters[mod] = self.FILTER_DEFS.COVERAGE;","                });","                self.filterName = 'RAW';","                self.filter = self.FILTER_DEFS[self.filterName];","            }","        }","        ","","        if (self.lang) {","            //Removed this so that when Loader is invoked","            //it doesn't request what it doesn't need.","            //self.require('intl-base', 'intl');","        }","","    },","","    /**","     * Returns the skin module name for the specified skin name.  If a","     * module name is supplied, the returned skin module name is","     * specific to the module passed in.","     * @method formatSkin","     * @param {string} skin the name of the skin.","     * @param {string} mod optional: the name of a module to skin.","     * @return {string} the full skin module name.","     */","    formatSkin: function(skin, mod) {","        var s = SKIN_PREFIX + skin;","        if (mod) {","            s = s + '-' + mod;","        }","","        return s;","    },","","    /**","     * Adds the skin def to the module info","     * @method _addSkin","     * @param {string} skin the name of the skin.","     * @param {string} mod the name of the module.","     * @param {string} parent parent module if this is a skin of a","     * submodule or plugin.","     * @return {string} the module name for the skin.","     * @private","     */","    _addSkin: function(skin, mod, parent) {","        var mdef, pkg, name, nmod,","            info = this.moduleInfo,","            sinf = this.skin,","            ext = info[mod] && info[mod].ext;","","        // Add a module definition for the module-specific skin css","        if (mod) {","            name = this.formatSkin(skin, mod);","            if (!info[name]) {","                mdef = info[mod];","                pkg = mdef.pkg || mod;","                nmod = {","                    skin: true,","                    name: name,","                    group: mdef.group,","                    type: 'css',","                    after: sinf.after,","                    path: (parent || pkg) + '/' + sinf.base + skin +","                          '/' + mod + '.css',","                    ext: ext","                };","                if (mdef.base) {","                    nmod.base = mdef.base;","                }","                if (mdef.configFn) {","                    nmod.configFn = mdef.configFn;","                }","                this.addModule(nmod, name);","","            }","        }","","        return name;","    },","    /**","    * Adds an alias module to the system","    * @method addAlias","    * @param {Array} use An array of modules that makes up this alias","    * @param {String} name The name of the alias","    * @example","    *       var loader = new Y.Loader({});","    *       loader.addAlias([ 'node', 'yql' ], 'davglass');","    *       loader.require(['davglass']);","    *       var out = loader.resolve(true);","    *","    *       //out.js will contain Node and YQL modules","    */","    addAlias: function(use, name) {","        YUI.Env.aliases[name] = use;","        this.addModule({","            name: name,","            use: use","        });","    },","    /**","     * Add a new module group","     * @method addGroup","     * @param {Object} config An object containing the group configuration data","     * @param {String} config.name required, the group name","     * @param {String} config.base The base directory for this module group","     * @param {String} config.root The root path to add to each combo resource path","     * @param {Boolean} config.combine Should the request be combined","     * @param {String} config.comboBase Combo service base path","     * @param {Object} config.modules The group of modules","     * @param {String} name the group name.","     * @example","     *      var loader = new Y.Loader({});","     *      loader.addGroup({","     *          name: 'davglass',","     *          combine: true,","     *          comboBase: '/combo?',","     *          root: '',","     *          modules: {","     *              //Module List here","     *          }","     *      }, 'davglass');","     */","    addGroup: function(o, name) {","        var mods = o.modules,","            self = this, i, v;","","        name = name || o.name;","        o.name = name;","        self.groups[name] = o;","","        if (o.patterns) {","            for (i in o.patterns) {","                if (o.patterns.hasOwnProperty(i)) {","                    o.patterns[i].group = name;","                    self.patterns[i] = o.patterns[i];","                }","            }","        }","","        if (mods) {","            for (i in mods) {","                if (mods.hasOwnProperty(i)) {","                    v = mods[i];","                    if (typeof v === 'string') {","                        v = { name: i, fullpath: v };","                    }","                    v.group = name;","                    self.addModule(v, i);","                }","            }","        }","    },","","    /**","     * Add a new module to the component metadata.","     * @method addModule","     * @param {Object} config An object containing the module data.","     * @param {String} config.name Required, the component name","     * @param {String} config.type Required, the component type (js or css)","     * @param {String} config.path Required, the path to the script from `base`","     * @param {Array} config.requires Array of modules required by this component","     * @param {Array} [config.optional] Array of optional modules for this component","     * @param {Array} [config.supersedes] Array of the modules this component replaces","     * @param {Array} [config.after] Array of modules the components which, if present, should be sorted above this one","     * @param {Object} [config.after_map] Faster alternative to 'after' -- supply a hash instead of an array","     * @param {Number} [config.rollup] The number of superseded modules required for automatic rollup","     * @param {String} [config.fullpath] If `fullpath` is specified, this is used instead of the configured `base + path`","     * @param {Boolean} [config.skinnable] Flag to determine if skin assets should automatically be pulled in","     * @param {Object} [config.submodules] Hash of submodules","     * @param {String} [config.group] The group the module belongs to -- this is set automatically when it is added as part of a group configuration.","     * @param {Array} [config.lang] Array of BCP 47 language tags of languages for which this module has localized resource bundles, e.g., `[\"en-GB\", \"zh-Hans-CN\"]`","     * @param {Object} [config.condition] Specifies that the module should be loaded automatically if a condition is met.  This is an object with up to three fields:","     * @param {String} [config.condition.trigger] The name of a module that can trigger the auto-load","     * @param {Function} [config.condition.test] A function that returns true when the module is to be loaded.","     * @param {String} [config.condition.when] Specifies the load order of the conditional module","     *  with regard to the position of the trigger module.","     *  This should be one of three values: `before`, `after`, or `instead`.  The default is `after`.","     * @param {Object} [config.testresults] A hash of test results from `Y.Features.all()`","     * @param {Function} [config.configFn] A function to exectute when configuring this module","     * @param {Object} config.configFn.mod The module config, modifying this object will modify it's config. Returning false will delete the module's config.","     * @param {String} [name] The module name, required if not in the module data.","     * @return {Object} the module definition or null if the object passed in did not provide all required attributes.","     */","    addModule: function(o, name) {","        name = name || o.name;","","        if (typeof o === 'string') {","            o = { name: name, fullpath: o };","        }","        ","        //Only merge this data if the temp flag is set","        //from an earlier pass from a pattern or else","        //an override module (YUI_config) can not be used to","        //replace a default module.","        if (this.moduleInfo[name] && this.moduleInfo[name].temp) {","            //This catches temp modules loaded via a pattern","            // The module will be added twice, once from the pattern and","            // Once from the actual add call, this ensures that properties","            // that were added to the module the first time around (group: gallery)","            // are also added the second time around too.","            o = Y.merge(this.moduleInfo[name], o);","        }","","        o.name = name;","","        if (!o || !o.name) {","            return null;","        }","","        if (!o.type) {","            //Always assume it's javascript unless the CSS pattern is matched.","            o.type = JS;","            var p = o.path || o.fullpath;","            if (p && this.REGEX_CSS.test(p)) {","                o.type = CSS;","            }","        }","","        if (!o.path && !o.fullpath) {","            o.path = _path(name, name, o.type);","        }","        o.supersedes = o.supersedes || o.use;","","        o.ext = ('ext' in o) ? o.ext : (this._internal) ? false : true;","","        // Handle submodule logic","        var subs = o.submodules, i, l, t, sup, s, smod, plugins, plug,","            j, langs, packName, supName, flatSup, flatLang, lang, ret,","            overrides, skinname, when, g,","            conditions = this.conditions, trigger;","            // , existing = this.moduleInfo[name], newr;","        ","        this.moduleInfo[name] = o;","","        o.requires = o.requires || [];","        ","        /*","        Only allowing the cascade of requires information, since","        optional and supersedes are far more fine grained than","        a blanket requires is.","        */","        if (this.requires) {","            for (i = 0; i < this.requires.length; i++) {","                o.requires.push(this.requires[i]);","            }","        }","        if (o.group && this.groups && this.groups[o.group]) {","            g = this.groups[o.group];","            if (g.requires) {","                for (i = 0; i < g.requires.length; i++) {","                    o.requires.push(g.requires[i]);","                }","            }","        }","","","        if (!o.defaults) {","            o.defaults = {","                requires: o.requires ? [].concat(o.requires) : null,","                supersedes: o.supersedes ? [].concat(o.supersedes) : null,","                optional: o.optional ? [].concat(o.optional) : null","            };","        }","","        if (o.skinnable && o.ext && o.temp) {","            skinname = this._addSkin(this.skin.defaultSkin, name);","            o.requires.unshift(skinname);","        }","        ","        if (o.requires.length) {","            o.requires = this.filterRequires(o.requires) || [];","        }","","        if (!o.langPack && o.lang) {","            langs = YArray(o.lang);","            for (j = 0; j < langs.length; j++) {","                lang = langs[j];","                packName = this.getLangPackName(lang, name);","                smod = this.moduleInfo[packName];","                if (!smod) {","                    smod = this._addLangPack(lang, o, packName);","                }","            }","        }","","","        if (subs) {","            sup = o.supersedes || [];","            l = 0;","","            for (i in subs) {","                if (subs.hasOwnProperty(i)) {","                    s = subs[i];","","                    s.path = s.path || _path(name, i, o.type);","                    s.pkg = name;","                    s.group = o.group;","","                    if (s.supersedes) {","                        sup = sup.concat(s.supersedes);","                    }","","                    smod = this.addModule(s, i);","                    sup.push(i);","","                    if (smod.skinnable) {","                        o.skinnable = true;","                        overrides = this.skin.overrides;","                        if (overrides && overrides[i]) {","                            for (j = 0; j < overrides[i].length; j++) {","                                skinname = this._addSkin(overrides[i][j],","                                         i, name);","                                sup.push(skinname);","                            }","                        }","                        skinname = this._addSkin(this.skin.defaultSkin,","                                        i, name);","                        sup.push(skinname);","                    }","","                    // looks like we are expected to work out the metadata","                    // for the parent module language packs from what is","                    // specified in the child modules.","                    if (s.lang && s.lang.length) {","","                        langs = YArray(s.lang);","                        for (j = 0; j < langs.length; j++) {","                            lang = langs[j];","                            packName = this.getLangPackName(lang, name);","                            supName = this.getLangPackName(lang, i);","                            smod = this.moduleInfo[packName];","","                            if (!smod) {","                                smod = this._addLangPack(lang, o, packName);","                            }","","                            flatSup = flatSup || YArray.hash(smod.supersedes);","","                            if (!(supName in flatSup)) {","                                smod.supersedes.push(supName);","                            }","","                            o.lang = o.lang || [];","","                            flatLang = flatLang || YArray.hash(o.lang);","","                            if (!(lang in flatLang)) {","                                o.lang.push(lang);","                            }","","// Add rollup file, need to add to supersedes list too","","                            // default packages","                            packName = this.getLangPackName(ROOT_LANG, name);","                            supName = this.getLangPackName(ROOT_LANG, i);","","                            smod = this.moduleInfo[packName];","","                            if (!smod) {","                                smod = this._addLangPack(lang, o, packName);","                            }","","                            if (!(supName in flatSup)) {","                                smod.supersedes.push(supName);","                            }","","// Add rollup file, need to add to supersedes list too","","                        }","                    }","","                    l++;","                }","            }","            //o.supersedes = YObject.keys(YArray.hash(sup));","            o.supersedes = YArray.dedupe(sup);","            if (this.allowRollup) {","                o.rollup = (l < 4) ? l : Math.min(l - 1, 4);","            }","        }","","        plugins = o.plugins;","        if (plugins) {","            for (i in plugins) {","                if (plugins.hasOwnProperty(i)) {","                    plug = plugins[i];","                    plug.pkg = name;","                    plug.path = plug.path || _path(name, i, o.type);","                    plug.requires = plug.requires || [];","                    plug.group = o.group;","                    this.addModule(plug, i);","                    if (o.skinnable) {","                        this._addSkin(this.skin.defaultSkin, i, name);","                    }","","                }","            }","        }","","        if (o.condition) {","            t = o.condition.trigger;","            if (YUI.Env.aliases[t]) {","                t = YUI.Env.aliases[t];","            }","            if (!Y.Lang.isArray(t)) {","                t = [t];","            }","","            for (i = 0; i < t.length; i++) {","                trigger = t[i];","                when = o.condition.when;","                conditions[trigger] = conditions[trigger] || {};","                conditions[trigger][name] = o.condition;","                // the 'when' attribute can be 'before', 'after', or 'instead'","                // the default is after.","                if (when && when != 'after') {","                    if (when == 'instead') { // replace the trigger","                        o.supersedes = o.supersedes || [];","                        o.supersedes.push(trigger);","                    } else { // before the trigger","                        // the trigger requires the conditional mod,","                        // so it should appear before the conditional","                        // mod if we do not intersede.","                    }","                } else { // after the trigger","                    o.after = o.after || [];","                    o.after.push(trigger);","                }","            }","        }","","        if (o.supersedes) {","            o.supersedes = this.filterRequires(o.supersedes);","        }","","        if (o.after) {","            o.after = this.filterRequires(o.after);","            o.after_map = YArray.hash(o.after);","        }","","        // this.dirty = true;","","        if (o.configFn) {","            ret = o.configFn(o);","            if (ret === false) {","                delete this.moduleInfo[name];","                delete GLOBAL_ENV._renderedMods[name];","                o = null;","            }","        }","        //Add to global cache","        if (o) {","            if (!GLOBAL_ENV._renderedMods) {","                GLOBAL_ENV._renderedMods = {};","            }","            GLOBAL_ENV._renderedMods[name] = Y.mix(GLOBAL_ENV._renderedMods[name] || {}, o);","            GLOBAL_ENV._conditions = conditions;","        }","","        return o;","    },","","    /**","     * Add a requirement for one or more module","     * @method require","     * @param {string[] | string*} what the modules to load.","     */","    require: function(what) {","        var a = (typeof what === 'string') ? YArray(arguments) : what;","        this.dirty = true;","        this.required = Y.merge(this.required, YArray.hash(this.filterRequires(a)));","","        this._explodeRollups();","    },","    /**","    * Grab all the items that were asked for, check to see if the Loader","    * meta-data contains a \"use\" array. If it doesm remove the asked item and replace it with ","    * the content of the \"use\".","    * This will make asking for: \"dd\"","    * Actually ask for: \"dd-ddm-base,dd-ddm,dd-ddm-drop,dd-drag,dd-proxy,dd-constrain,dd-drop,dd-scroll,dd-drop-plugin\"","    * @private","    * @method _explodeRollups","    */","    _explodeRollups: function() {","        var self = this, m, m2, i, a, v, len, len2,","        r = self.required;","","        if (!self.allowRollup) {","            for (i in r) {","                if (r.hasOwnProperty(i)) {","                    m = self.getModule(i);","                    if (m && m.use) {","                        len = m.use.length;","                        for (a = 0; a < len; a++) {","                            m2 = self.getModule(m.use[a]);","                            if (m2 && m2.use) {","                                len2 = m2.use.length;","                                for (v = 0; v < len2; v++) {","                                    r[m2.use[v]] = true;","                                }","                            } else {","                                r[m.use[a]] = true;","                            }","                        }","                    }","                }","            }","            self.required = r;","        }","","    },","    /**","    * Explodes the required array to remove aliases and replace them with real modules","    * @method filterRequires","    * @param {Array} r The original requires array","    * @return {Array} The new array of exploded requirements","    */","    filterRequires: function(r) {","        if (r) {","            if (!Y.Lang.isArray(r)) {","                r = [r];","            }","            r = Y.Array(r);","            var c = [], i, mod, o, m;","","            for (i = 0; i < r.length; i++) {","                mod = this.getModule(r[i]);","                if (mod && mod.use) {","                    for (o = 0; o < mod.use.length; o++) {","                        //Must walk the other modules in case a module is a rollup of rollups (datatype)","                        m = this.getModule(mod.use[o]);","                        if (m && m.use) {","                            c = Y.Array.dedupe([].concat(c, this.filterRequires(m.use)));","                        } else {","                            c.push(mod.use[o]);","                        }","                    }","                } else {","                    c.push(r[i]);","                }","            }","            r = c;","        }","        return r;","    },","    /**","     * Returns an object containing properties for all modules required","     * in order to load the requested module","     * @method getRequires","     * @param {object}  mod The module definition from moduleInfo.","     * @return {array} the expanded requirement list.","     */","    getRequires: function(mod) {","","        if (!mod) {","            //console.log('returning no reqs for ' + mod.name);","            return NO_REQUIREMENTS;","        }","","        if (mod._parsed) {","            //console.log('returning requires for ' + mod.name, mod.requires);","            return mod.expanded || NO_REQUIREMENTS;","        }","","        //TODO add modue cache here out of scope..","","        var i, m, j, add, packName, lang, testresults = this.testresults,","            name = mod.name, cond,","            adddef = ON_PAGE[name] && ON_PAGE[name].details,","            d, k, m1, go, def,","            r, old_mod,","            o, skinmod, skindef, skinpar, skinname,","            intl = mod.lang || mod.intl,","            info = this.moduleInfo,","            ftests = Y.Features && Y.Features.tests.load,","            hash, reparse;","","        // console.log(name);","","        // pattern match leaves module stub that needs to be filled out","        if (mod.temp && adddef) {","            old_mod = mod;","            mod = this.addModule(adddef, name);","            mod.group = old_mod.group;","            mod.pkg = old_mod.pkg;","            delete mod.expanded;","        }","","        // console.log('cache: ' + mod.langCache + ' == ' + this.lang);","        ","        //If a skin or a lang is different, reparse..","        reparse = !((!this.lang || mod.langCache === this.lang) && (mod.skinCache === this.skin.defaultSkin));","","        if (mod.expanded && !reparse) {","            return mod.expanded;","        }","        ","","        d = [];","        hash = {};","        r = this.filterRequires(mod.requires);","        if (mod.lang) {","            //If a module has a lang attribute, auto add the intl requirement.","            d.unshift('intl');","            r.unshift('intl');","            intl = true;","        }","        o = this.filterRequires(mod.optional);","","","        mod._parsed = true;","        mod.langCache = this.lang;","        mod.skinCache = this.skin.defaultSkin;","","        for (i = 0; i < r.length; i++) {","            if (!hash[r[i]]) {","                d.push(r[i]);","                hash[r[i]] = true;","                m = this.getModule(r[i]);","                if (m) {","                    add = this.getRequires(m);","                    intl = intl || (m.expanded_map &&","                        (INTL in m.expanded_map));","                    for (j = 0; j < add.length; j++) {","                        d.push(add[j]);","                    }","                }","            }","        }","","        // get the requirements from superseded modules, if any","        r = this.filterRequires(mod.supersedes);","        if (r) {","            for (i = 0; i < r.length; i++) {","                if (!hash[r[i]]) {","                    // if this module has submodules, the requirements list is","                    // expanded to include the submodules.  This is so we can","                    // prevent dups when a submodule is already loaded and the","                    // parent is requested.","                    if (mod.submodules) {","                        d.push(r[i]);","                    }","","                    hash[r[i]] = true;","                    m = this.getModule(r[i]);","","                    if (m) {","                        add = this.getRequires(m);","                        intl = intl || (m.expanded_map &&","                            (INTL in m.expanded_map));","                        for (j = 0; j < add.length; j++) {","                            d.push(add[j]);","                        }","                    }","                }","            }","        }","","        if (o && this.loadOptional) {","            for (i = 0; i < o.length; i++) {","                if (!hash[o[i]]) {","                    d.push(o[i]);","                    hash[o[i]] = true;","                    m = info[o[i]];","                    if (m) {","                        add = this.getRequires(m);","                        intl = intl || (m.expanded_map &&","                            (INTL in m.expanded_map));","                        for (j = 0; j < add.length; j++) {","                            d.push(add[j]);","                        }","                    }","                }","            }","        }","","        cond = this.conditions[name];","","        if (cond) {","            //Set the module to not parsed since we have conditionals and this could change the dependency tree.","            mod._parsed = false;","            if (testresults && ftests) {","                oeach(testresults, function(result, id) {","                    var condmod = ftests[id].name;","                    if (!hash[condmod] && ftests[id].trigger == name) {","                        if (result && ftests[id]) {","                            hash[condmod] = true;","                            d.push(condmod);","                        }","                    }","                });","            } else {","                for (i in cond) {","                    if (cond.hasOwnProperty(i)) {","                        if (!hash[i]) {","                            def = cond[i];","                            //first see if they've specfied a ua check","                            //then see if they've got a test fn & if it returns true","                            //otherwise just having a condition block is enough","                            go = def && ((!def.ua && !def.test) || (def.ua && Y.UA[def.ua]) ||","                                        (def.test && def.test(Y, r)));","","                            if (go) {","                                hash[i] = true;","                                d.push(i);","                                m = this.getModule(i);","                                if (m) {","                                    add = this.getRequires(m);","                                    for (j = 0; j < add.length; j++) {","                                        d.push(add[j]);","                                    }","","                                }","                            }","                        }","                    }","                }","            }","        }","","        // Create skin modules","        if (mod.skinnable) {","            skindef = this.skin.overrides;","            for (i in YUI.Env.aliases) {","                if (YUI.Env.aliases.hasOwnProperty(i)) {","                    if (Y.Array.indexOf(YUI.Env.aliases[i], name) > -1) {","                        skinpar = i;","                    }","                }","            }","            if (skindef && (skindef[name] || (skinpar && skindef[skinpar]))) {","                skinname = name;","                if (skindef[skinpar]) {","                    skinname = skinpar;","                }","                for (i = 0; i < skindef[skinname].length; i++) {","                    skinmod = this._addSkin(skindef[skinname][i], name);","                    if (!this.isCSSLoaded(skinmod, this._boot)) {","                        d.push(skinmod);","                    }","                }","            } else {","                skinmod = this._addSkin(this.skin.defaultSkin, name);","                if (!this.isCSSLoaded(skinmod, this._boot)) {","                    d.push(skinmod);","                }","            }","        }","","        mod._parsed = false;","","        if (intl) {","","            if (mod.lang && !mod.langPack && Y.Intl) {","                lang = Y.Intl.lookupBestLang(this.lang || ROOT_LANG, mod.lang);","                packName = this.getLangPackName(lang, name);","                if (packName) {","                    d.unshift(packName);","                }","            }","            d.unshift(INTL);","        }","","        mod.expanded_map = YArray.hash(d);","","        mod.expanded = YObject.keys(mod.expanded_map);","","        return mod.expanded;","    },","    /**","    * Check to see if named css module is already loaded on the page","    * @method isCSSLoaded","    * @param {String} name The name of the css file","    * @return Boolean","    */","    isCSSLoaded: function(name, skip) {","        //TODO - Make this call a batching call with name being an array","        if (!name || !YUI.Env.cssStampEl || (!skip && this.ignoreRegistered)) {","            return false;","        }","        var el = YUI.Env.cssStampEl,","            ret = false,","            mod = YUI.Env._cssLoaded[name],","            style = el.currentStyle; //IE","","        ","        if (mod !== undefined) {","            return mod;","        }","","        //Add the classname to the element","        el.className = name;","","        if (!style) {","            style = Y.config.doc.defaultView.getComputedStyle(el, null);","        }","","        if (style && style.display === 'none') {","            ret = true;","        }","","","        el.className = ''; //Reset the classname to ''","","        YUI.Env._cssLoaded[name] = ret;","","        return ret;","    },","","    /**","     * Returns a hash of module names the supplied module satisfies.","     * @method getProvides","     * @param {string} name The name of the module.","     * @return {object} what this module provides.","     */","    getProvides: function(name) {","        var m = this.getModule(name), o, s;","            // supmap = this.provides;","","        if (!m) {","            return NOT_FOUND;","        }","","        if (m && !m.provides) {","            o = {};","            s = m.supersedes;","","            if (s) {","                YArray.each(s, function(v) {","                    Y.mix(o, this.getProvides(v));","                }, this);","            }","","            o[name] = true;","            m.provides = o;","","        }","","        return m.provides;","    },","","    /**","     * Calculates the dependency tree, the result is stored in the sorted","     * property.","     * @method calculate","     * @param {object} o optional options object.","     * @param {string} type optional argument to prune modules.","     */","    calculate: function(o, type) {","        if (o || type || this.dirty) {","","            if (o) {","                this._config(o);","            }","","            if (!this._init) {","                this._setup();","            }","","            this._explode();","","            if (this.allowRollup) {","                this._rollup();","            } else {","                this._explodeRollups();","            }","            this._reduce();","            this._sort();","        }","    },","    /**","    * Creates a \"psuedo\" package for languages provided in the lang array","    * @method _addLangPack","    * @private","    * @param {String} lang The language to create","    * @param {Object} m The module definition to create the language pack around","    * @param {String} packName The name of the package (e.g: lang/datatype-date-en-US)","    * @return {Object} The module definition","    */","    _addLangPack: function(lang, m, packName) {","        var name = m.name,","            packPath, conf,","            existing = this.moduleInfo[packName];","","        if (!existing) {","","            packPath = _path((m.pkg || name), packName, JS, true);","","            conf = {","                path: packPath,","                intl: true,","                langPack: true,","                ext: m.ext,","                group: m.group,","                supersedes: []","            };","            if (m.root) {","                conf.root = m.root;","            }","            if (m.base) {","                conf.base = m.base;","            }","","            if (m.configFn) {","                conf.configFn = m.configFn;","            }","","            this.addModule(conf, packName);","","            if (lang) {","                Y.Env.lang = Y.Env.lang || {};","                Y.Env.lang[lang] = Y.Env.lang[lang] || {};","                Y.Env.lang[lang][name] = true;","            }","        }","","        return this.moduleInfo[packName];","    },","","    /**","     * Investigates the current YUI configuration on the page.  By default,","     * modules already detected will not be loaded again unless a force","     * option is encountered.  Called by calculate()","     * @method _setup","     * @private","     */","    _setup: function() {","        var info = this.moduleInfo, name, i, j, m, l,","            packName;","","        for (name in info) {","            if (info.hasOwnProperty(name)) {","                m = info[name];","                if (m) {","","                    // remove dups","                    //m.requires = YObject.keys(YArray.hash(m.requires));","                    m.requires = YArray.dedupe(m.requires);","","                    // Create lang pack modules","                    //if (m.lang && m.lang.length) {","                    if (m.lang) {","                        // Setup root package if the module has lang defined,","                        // it needs to provide a root language pack","                        packName = this.getLangPackName(ROOT_LANG, name);","                        this._addLangPack(null, m, packName);","                    }","","                }","            }","        }","","","        //l = Y.merge(this.inserted);","        l = {};","","        // available modules","        if (!this.ignoreRegistered) {","            Y.mix(l, GLOBAL_ENV.mods);","        }","","        // add the ignore list to the list of loaded packages","        if (this.ignore) {","            Y.mix(l, YArray.hash(this.ignore));","        }","","        // expand the list to include superseded modules","        for (j in l) {","            if (l.hasOwnProperty(j)) {","                Y.mix(l, this.getProvides(j));","            }","        }","","        // remove modules on the force list from the loaded list","        if (this.force) {","            for (i = 0; i < this.force.length; i++) {","                if (this.force[i] in l) {","                    delete l[this.force[i]];","                }","            }","        }","","        Y.mix(this.loaded, l);","","        this._init = true;","    },","","    /**","     * Builds a module name for a language pack","     * @method getLangPackName","     * @param {string} lang the language code.","     * @param {string} mname the module to build it for.","     * @return {string} the language pack module name.","     */","    getLangPackName: function(lang, mname) {","        return ('lang/' + mname + ((lang) ? '_' + lang : ''));","    },","    /**","     * Inspects the required modules list looking for additional","     * dependencies.  Expands the required list to include all","     * required modules.  Called by calculate()","     * @method _explode","     * @private","     */","    _explode: function() {","        //TODO Move done out of scope","        var r = this.required, m, reqs, done = {},","            self = this, name;","","        // the setup phase is over, all modules have been created","        self.dirty = false;","","        self._explodeRollups();","        r = self.required;","       ","        for (name in r) {","            if (r.hasOwnProperty(name)) {","                if (!done[name]) {","                    done[name] = true;","                    m = self.getModule(name);","                    if (m) {","                        var expound = m.expound;","","                        if (expound) {","                            r[expound] = self.getModule(expound);","                            reqs = self.getRequires(r[expound]);","                            Y.mix(r, YArray.hash(reqs));","                        }","","                        reqs = self.getRequires(m);","                        Y.mix(r, YArray.hash(reqs));","                    }","                }","            }","        }","","    },","    /**","    * The default method used to test a module against a pattern","    * @method _patternTest","    * @private","    * @param {String} mname The module being tested","    * @param {String} pname The pattern to match","    */","    _patternTest: function(mname, pname) {","        return (mname.indexOf(pname) > -1);","    },","    /**","    * Get's the loader meta data for the requested module","    * @method getModule","    * @param {String} mname The module name to get","    * @return {Object} The module metadata","    */","    getModule: function(mname) {","        //TODO: Remove name check - it's a quick hack to fix pattern WIP","        if (!mname) {","            return null;","        }","","        var p, found, pname,","            m = this.moduleInfo[mname],","            patterns = this.patterns;","","        // check the patterns library to see if we should automatically add","        // the module with defaults","        if (!m || (m && m.ext)) {","            for (pname in patterns) {","                if (patterns.hasOwnProperty(pname)) {","                    p = patterns[pname];","                    ","                    //There is no test method, create a default one that tests","                    // the pattern against the mod name","                    if (!p.test) {","                        p.test = this._patternTest;","                    }","","                    if (p.test(mname, pname)) {","                        // use the metadata supplied for the pattern","                        // as the module definition.","                        found = p;","                        break;","                    }","                }","            }","        }","","        if (!m) {","            if (found) {","                if (p.action) {","                    p.action.call(this, mname, pname);","                } else {","                    // ext true or false?","                    m = this.addModule(Y.merge(found), mname);","                    if (found.configFn) {","                        m.configFn = found.configFn;","                    }","                    m.temp = true;","                }","            }","        } else {","            if (found && m && found.configFn && !m.configFn) {","                m.configFn = found.configFn;","                m.configFn(m);","            }","        }","","        return m;","    },","","    // impl in rollup submodule","    _rollup: function() { },","","    /**","     * Remove superceded modules and loaded modules.  Called by","     * calculate() after we have the mega list of all dependencies","     * @method _reduce","     * @return {object} the reduced dependency hash.","     * @private","     */","    _reduce: function(r) {","","        r = r || this.required;","","        var i, j, s, m, type = this.loadType,","        ignore = this.ignore ? YArray.hash(this.ignore) : false;","","        for (i in r) {","            if (r.hasOwnProperty(i)) {","                m = this.getModule(i);","                // remove if already loaded","                if (((this.loaded[i] || ON_PAGE[i]) &&","                        !this.forceMap[i] && !this.ignoreRegistered) ||","                        (type && m && m.type != type)) {","                    delete r[i];","                }","                if (ignore && ignore[i]) {","                    delete r[i];","                }","                // remove anything this module supersedes","                s = m && m.supersedes;","                if (s) {","                    for (j = 0; j < s.length; j++) {","                        if (s[j] in r) {","                            delete r[s[j]];","                        }","                    }","                }","            }","        }","","        return r;","    },","    /**","    * Handles the queue when a module has been loaded for all cases","    * @method _finish","    * @private","    * @param {String} msg The message from Loader","    * @param {Boolean} success A boolean denoting success or failure","    */","    _finish: function(msg, success) {","","        _queue.running = false;","","        var onEnd = this.onEnd;","        if (onEnd) {","            onEnd.call(this.context, {","                msg: msg,","                data: this.data,","                success: success","            });","        }","        this._continue();","    },","    /**","    * The default Loader onSuccess handler, calls this.onSuccess with a payload","    * @method _onSuccess","    * @private","    */","    _onSuccess: function() {","        var self = this, skipped = Y.merge(self.skipped), fn,","            failed = [], rreg = self.requireRegistration,","            success, msg, i, mod;","        ","        for (i in skipped) {","            if (skipped.hasOwnProperty(i)) {","                delete self.inserted[i];","            }","        }","","        self.skipped = {};","        ","        for (i in self.inserted) {","            if (self.inserted.hasOwnProperty(i)) {","                mod = self.getModule(i);","                if (mod && rreg && mod.type == JS && !(i in YUI.Env.mods)) {","                    failed.push(i);","                } else {","                    Y.mix(self.loaded, self.getProvides(i));","                }","            }","        }","","        fn = self.onSuccess;","        msg = (failed.length) ? 'notregistered' : 'success';","        success = !(failed.length);","        if (fn) {","            fn.call(self.context, {","                msg: msg,","                data: self.data,","                success: success,","                failed: failed,","                skipped: skipped","            });","        }","        self._finish(msg, success);","    },","    /**","    * The default Loader onProgress handler, calls this.onProgress with a payload","    * @method _onProgress","    * @private","    */","    _onProgress: function(e) {","        var self = this;","        if (self.onProgress) {","            self.onProgress.call(self.context, {","                name: e.url,","                data: e.data","            });","        }","    },","    /**","    * The default Loader onFailure handler, calls this.onFailure with a payload","    * @method _onFailure","    * @private","    */","    _onFailure: function(o) {","        var f = this.onFailure, msg = [], i = 0, len = o.errors.length;","        ","        for (i; i < len; i++) {","            msg.push(o.errors[i].error);","        }","","        msg = msg.join(',');","","        ","        if (f) {","            f.call(this.context, {","                msg: msg,","                data: this.data,","                success: false","            });","        }","        ","        this._finish(msg, false);","","    },","","    /**","    * The default Loader onTimeout handler, calls this.onTimeout with a payload","    * @method _onTimeout","    * @private","    */","    _onTimeout: function() {","        var f = this.onTimeout;","        if (f) {","            f.call(this.context, {","                msg: 'timeout',","                data: this.data,","                success: false","            });","        }","    },","","    /**","     * Sorts the dependency tree.  The last step of calculate()","     * @method _sort","     * @private","     */","    _sort: function() {","","        // create an indexed list","        var s = YObject.keys(this.required),","            // loaded = this.loaded,","            //TODO Move this out of scope","            done = {},","            p = 0, l, a, b, j, k, moved, doneKey;","","        // keep going until we make a pass without moving anything","        for (;;) {","","            l = s.length;","            moved = false;","","            // start the loop after items that are already sorted","            for (j = p; j < l; j++) {","","                // check the next module on the list to see if its","                // dependencies have been met","                a = s[j];","","                // check everything below current item and move if we","                // find a requirement for the current item","                for (k = j + 1; k < l; k++) {","                    doneKey = a + s[k];","","                    if (!done[doneKey] && this._requires(a, s[k])) {","","                        // extract the dependency so we can move it up","                        b = s.splice(k, 1);","","                        // insert the dependency above the item that","                        // requires it","                        s.splice(j, 0, b[0]);","","                        // only swap two dependencies once to short circut","                        // circular dependencies","                        done[doneKey] = true;","","                        // keep working","                        moved = true;","","                        break;","                    }","                }","","                // jump out of loop if we moved something","                if (moved) {","                    break;","                // this item is sorted, move our pointer and keep going","                } else {","                    p++;","                }","            }","","            // when we make it here and moved is false, we are","            // finished sorting","            if (!moved) {","                break;","            }","","        }","","        this.sorted = s;","    },","","    /**","    * Handles the actual insertion of script/link tags","    * @method _insert","    * @private","    * @param {Object} source The YUI instance the request came from","    * @param {Object} o The metadata to include","    * @param {String} type JS or CSS","    * @param {Boolean} [skipcalc=false] Do a Loader.calculate on the meta","    */","    _insert: function(source, o, type, skipcalc) {","","","        // restore the state at the time of the request","        if (source) {","            this._config(source);","        }","","        // build the dependency list","        // don't include type so we can process CSS and script in","        // one pass when the type is not specified.","        if (!skipcalc) {","            //this.calculate(o);","        }","","        var modules = this.resolve(!skipcalc),","            self = this, comp = 0, actions = 0;","","        if (type) {","            //Filter out the opposite type and reset the array so the checks later work","            modules[((type === JS) ? CSS : JS)] = [];","        }","        if (modules.js.length) {","            comp++;","        }","        if (modules.css.length) {","            comp++;","        }","","        //console.log('Resolved Modules: ', modules);","","        var complete = function(d) {","            actions++;","            var errs = {}, i = 0, u = '', fn;","","            if (d && d.errors) {","                for (i = 0; i < d.errors.length; i++) {","                    if (d.errors[i].request) {","                        u = d.errors[i].request.url;","                    } else {","                        u = d.errors[i];","                    }","                    errs[u] = u;","                }","            }","            ","            if (d && d.data && d.data.length && (d.type === 'success')) {","                for (i = 0; i < d.data.length; i++) {","                    self.inserted[d.data[i].name] = true;","                }","            }","","            if (actions === comp) {","                self._loading = null;","                if (d && d.fn) {","                    fn = d.fn;","                    delete d.fn;","                    fn.call(self, d);","                }","            }","        };","","        this._loading = true;","","        if (!modules.js.length && !modules.css.length) {","            actions = -1;","            complete({","                fn: self._onSuccess","            });","            return;","        }","        ","","        if (modules.css.length) { //Load CSS first","            Y.Get.css(modules.css, {","                data: modules.cssMods,","                attributes: self.cssAttributes,","                insertBefore: self.insertBefore,","                charset: self.charset,","                timeout: self.timeout,","                context: self,","                onProgress: function(e) {","                    self._onProgress.call(self, e);","                },","                onTimeout: function(d) {","                    self._onTimeout.call(self, d);","                },","                onSuccess: function(d) {","                    d.type = 'success';","                    d.fn = self._onSuccess;","                    complete.call(self, d);","                },","                onFailure: function(d) {","                    d.type = 'failure';","                    d.fn = self._onFailure;","                    complete.call(self, d);","                }","            });","        }","","        if (modules.js.length) {","            Y.Get.js(modules.js, {","                data: modules.jsMods,","                insertBefore: self.insertBefore,","                attributes: self.jsAttributes,","                charset: self.charset,","                timeout: self.timeout,","                autopurge: false,","                context: self,","                async: self.async,","                onProgress: function(e) {","                    self._onProgress.call(self, e);","                },","                onTimeout: function(d) {","                    self._onTimeout.call(self, d);","                },","                onSuccess: function(d) {","                    d.type = 'success';","                    d.fn = self._onSuccess;","                    complete.call(self, d);","                },","                onFailure: function(d) {","                    d.type = 'failure';","                    d.fn = self._onFailure;","                    complete.call(self, d);","                }","            });","        }","    },","    /**","    * Once a loader operation is completely finished, process any additional queued items.","    * @method _continue","    * @private","    */","    _continue: function() {","        if (!(_queue.running) && _queue.size() > 0) {","            _queue.running = true;","            _queue.next()();","        }","    },","","    /**","     * inserts the requested modules and their dependencies.","     * <code>type</code> can be \"js\" or \"css\".  Both script and","     * css are inserted if type is not provided.","     * @method insert","     * @param {object} o optional options object.","     * @param {string} type the type of dependency to insert.","     */","    insert: function(o, type, skipsort) {","        var self = this, copy = Y.merge(this);","        delete copy.require;","        delete copy.dirty;","        _queue.add(function() {","            self._insert(copy, o, type, skipsort);","        });","        this._continue();","    },","","    /**","     * Executed every time a module is loaded, and if we are in a load","     * cycle, we attempt to load the next script.  Public so that it","     * is possible to call this if using a method other than","     * Y.register to determine when scripts are fully loaded","     * @method loadNext","     * @deprecated","     * @param {string} mname optional the name of the module that has","     * been loaded (which is usually why it is time to load the next","     * one).","     */","    loadNext: function(mname) {","        return;","    },","","    /**","     * Apply filter defined for this instance to a url/path","     * @method _filter","     * @param {string} u the string to filter.","     * @param {string} name the name of the module, if we are processing","     * a single module as opposed to a combined url.","     * @return {string} the filtered string.","     * @private","     */","    _filter: function(u, name, group) {","        var f = this.filter,","            hasFilter = name && (name in this.filters),","            modFilter = hasFilter && this.filters[name],","            groupName = group || (this.moduleInfo[name] ? this.moduleInfo[name].group : null);","","        if (groupName && this.groups[groupName] && this.groups[groupName].filter) {","            modFilter = this.groups[groupName].filter;","            hasFilter = true;","        }","","        if (u) {","            if (hasFilter) {","                f = (L.isString(modFilter)) ? this.FILTER_DEFS[modFilter.toUpperCase()] || null : modFilter;","            }","            if (f) {","                u = u.replace(new RegExp(f.searchExp, 'g'), f.replaceStr);","            }","        }","        return u;","    },","","    /**","     * Generates the full url for a module","     * @method _url","     * @param {string} path the path fragment.","     * @param {String} name The name of the module","     * @param {String} [base=self.base] The base url to use","     * @return {string} the full url.","     * @private","     */","    _url: function(path, name, base) {","        return this._filter((base || this.base || '') + path, name);","    },","    /**","    * Returns an Object hash of file arrays built from `loader.sorted` or from an arbitrary list of sorted modules.","    * @method resolve","    * @param {Boolean} [calc=false] Perform a loader.calculate() before anything else","    * @param {Array} [s=loader.sorted] An override for the loader.sorted array","    * @return {Object} Object hash (js and css) of two arrays of file lists","    * @example This method can be used as an off-line dep calculator","    *","    *        var Y = YUI();","    *        var loader = new Y.Loader({","    *            filter: 'debug',","    *            base: '../../',","    *            root: 'build/',","    *            combine: true,","    *            require: ['node', 'dd', 'console']","    *        });","    *        var out = loader.resolve(true);","    *","    */","    resolve: function(calc, s) {","","        var len, i, m, url, fn, msg, attr, group, groupName, j, frag,","            comboSource, comboSources, mods, comboBase,","            base, urls, u = [], tmpBase, baseLen, resCombos = {},","            self = this, comboSep, maxURLLength, singles = [],","            inserted = (self.ignoreRegistered) ? {} : self.inserted,","            resolved = { js: [], jsMods: [], css: [], cssMods: [] },","            type = self.loadType || 'js';","","        if (self.skin.overrides || self.skin.defaultSkin !== DEFAULT_SKIN || self.ignoreRegistered) { ","            self._resetModules();","        }","","        if (calc) {","            self.calculate();","        }","        s = s || self.sorted;","","        var addSingle = function(m) {","            ","            if (m) {","                group = (m.group && self.groups[m.group]) || NOT_FOUND;","                ","                //Always assume it's async","                if (group.async === false) {","                    m.async = group.async;","                }","","                url = (m.fullpath) ? self._filter(m.fullpath, s[i]) :","                      self._url(m.path, s[i], group.base || m.base);","                ","                if (m.attributes || m.async === false) {","                    url = {","                        url: url,","                        async: m.async","                    };","                    if (m.attributes) {","                        url.attributes = m.attributes;","                    }","                }","                resolved[m.type].push(url);","                resolved[m.type + 'Mods'].push(m);","            } else {","            }","            ","        };","","        len = s.length;","","        // the default combo base","        comboBase = self.comboBase;","","        url = comboBase;","","        comboSources = {};","","        for (i = 0; i < len; i++) {","            comboSource = comboBase;","            m = self.getModule(s[i]);","            groupName = m && m.group;","            group = self.groups[groupName];","            if (groupName && group) {","","                if (!group.combine || m.fullpath) {","                    //This is not a combo module, skip it and load it singly later.","                    //singles.push(s[i]);","                    addSingle(m);","                    continue;","                }","                m.combine = true;","                if (group.comboBase) {","                    comboSource = group.comboBase;","                }","","                if (\"root\" in group && L.isValue(group.root)) {","                    m.root = group.root;","                }","                m.comboSep = group.comboSep || self.comboSep;","                m.maxURLLength = group.maxURLLength || self.maxURLLength;","            } else {","                if (!self.combine) {","                    //This is not a combo module, skip it and load it singly later.","                    //singles.push(s[i]);","                    addSingle(m);","                    continue;","                }","            }","","            comboSources[comboSource] = comboSources[comboSource] || [];","            comboSources[comboSource].push(m);","        }","","        for (j in comboSources) {","            if (comboSources.hasOwnProperty(j)) {","                resCombos[j] = resCombos[j] || { js: [], jsMods: [], css: [], cssMods: [] };","                url = j;","                mods = comboSources[j];","                len = mods.length;","                ","                if (len) {","                    for (i = 0; i < len; i++) {","                        if (inserted[mods[i]]) {","                            continue;","                        }","                        m = mods[i];","                        // Do not try to combine non-yui JS unless combo def","                        // is found","                        if (m && (m.combine || !m.ext)) {","                            resCombos[j].comboSep = m.comboSep;","                            resCombos[j].group = m.group;","                            resCombos[j].maxURLLength = m.maxURLLength;","                            frag = ((L.isValue(m.root)) ? m.root : self.root) + (m.path || m.fullpath);","                            frag = self._filter(frag, m.name);","                            resCombos[j][m.type].push(frag);","                            resCombos[j][m.type + 'Mods'].push(m);","                        } else {","                            //Add them to the next process..","                            if (mods[i]) {","                                //singles.push(mods[i].name);","                                addSingle(mods[i]);","                            }","                        }","","                    }","                }","            }","        }","","","        for (j in resCombos) {","            base = j;","            comboSep = resCombos[base].comboSep || self.comboSep;","            maxURLLength = resCombos[base].maxURLLength || self.maxURLLength;","            for (type in resCombos[base]) {","                if (type === JS || type === CSS) {","                    urls = resCombos[base][type];","                    mods = resCombos[base][type + 'Mods'];","                    len = urls.length;","                    tmpBase = base + urls.join(comboSep);","                    baseLen = tmpBase.length;","                    if (maxURLLength <= base.length) {","                        maxURLLength = MAX_URL_LENGTH;","                    }","                    ","                    if (len) {","                        if (baseLen > maxURLLength) {","                            u = [];","                            for (s = 0; s < len; s++) {","                                u.push(urls[s]);","                                tmpBase = base + u.join(comboSep);","","                                if (tmpBase.length > maxURLLength) {","                                    m = u.pop();","                                    tmpBase = base + u.join(comboSep);","                                    resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));","                                    u = [];","                                    if (m) {","                                        u.push(m);","                                    }","                                }","                            }","                            if (u.length) {","                                tmpBase = base + u.join(comboSep);","                                resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));","                            }","                        } else {","                            resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));","                        }","                    }","                    resolved[type + 'Mods'] = resolved[type + 'Mods'].concat(mods);","                }","            }","        }","","        resCombos = null;","","        return resolved;","    },","    /**","    Shortcut to calculate, resolve and load all modules.","","        var loader = new Y.Loader({","            ignoreRegistered: true,","            modules: {","                mod: {","                    path: 'mod.js'","                }","            },","            requires: [ 'mod' ]","        });","        loader.load(function() {","            console.log('All modules have loaded..');","        });","","","    @method load","    @param {Callback} cb Executed after all load operations are complete","    */","    load: function(cb) {","        if (!cb) {","            return;","        }","        var self = this,","            out = self.resolve(true);","        ","        self.data = out;","","        self.onEnd = function() {","            cb.apply(self.context || self, arguments);","        };","","        self.insert();","    }","};","","","","}, '@VERSION@' ,{requires:['get', 'features']});","YUI.add('loader-rollup', function(Y) {","","/**"," * Optional automatic rollup logic for reducing http connections"," * when not using a combo service."," * @module loader"," * @submodule rollup"," */","","/**"," * Look for rollup packages to determine if all of the modules a"," * rollup supersedes are required.  If so, include the rollup to"," * help reduce the total number of connections required.  Called"," * by calculate().  This is an optional feature, and requires the"," * appropriate submodule to function."," * @method _rollup"," * @for Loader"," * @private"," */","Y.Loader.prototype._rollup = function() {","    var i, j, m, s, r = this.required, roll,","        info = this.moduleInfo, rolled, c, smod;","","    // find and cache rollup modules","    if (this.dirty || !this.rollups) {","        this.rollups = {};","        for (i in info) {","            if (info.hasOwnProperty(i)) {","                m = this.getModule(i);","                // if (m && m.rollup && m.supersedes) {","                if (m && m.rollup) {","                    this.rollups[i] = m;","                }","            }","        }","    }","","    // make as many passes as needed to pick up rollup rollups","    for (;;) {","        rolled = false;","","        // go through the rollup candidates","        for (i in this.rollups) {","            if (this.rollups.hasOwnProperty(i)) {","                // there can be only one, unless forced","                if (!r[i] && ((!this.loaded[i]) || this.forceMap[i])) {","                    m = this.getModule(i);","                    s = m.supersedes || [];","                    roll = false;","","                    // @TODO remove continue","                    if (!m.rollup) {","                        continue;","                    }","","                    c = 0;","","                    // check the threshold","                    for (j = 0; j < s.length; j++) {","                        smod = info[s[j]];","","                        // if the superseded module is loaded, we can't","                        // load the rollup unless it has been forced.","                        if (this.loaded[s[j]] && !this.forceMap[s[j]]) {","                            roll = false;","                            break;","                        // increment the counter if this module is required.","                        // if we are beyond the rollup threshold, we will","                        // use the rollup module","                        } else if (r[s[j]] && m.type == smod.type) {","                            c++;","                            roll = (c >= m.rollup);","                            if (roll) {","                                break;","                            }","                        }","                    }","","                    if (roll) {","                        // add the rollup","                        r[i] = true;","                        rolled = true;","","                        // expand the rollup's dependencies","                        this.getRequires(m);","                    }","                }","            }","        }","","        // if we made it here w/o rolling up something, we are done","        if (!rolled) {","            break;","        }","    }","};","","","}, '@VERSION@' ,{requires:['loader-base']});","YUI.add('loader-yui3', function(Y) {","","/* This file is auto-generated by src/loader/scripts/meta_join.js */","","/**"," * YUI 3 module metadata"," * @module loader"," * @submodule yui3"," */","YUI.Env[Y.version].modules = YUI.Env[Y.version].modules || {","    \"align-plugin\": {","        \"requires\": [","            \"node-screen\",","            \"node-pluginhost\"","        ]","    },","    \"anim\": {","        \"use\": [","            \"anim-base\",","            \"anim-color\",","            \"anim-curve\",","            \"anim-easing\",","            \"anim-node-plugin\",","            \"anim-scroll\",","            \"anim-xy\"","        ]","    },","    \"anim-base\": {","        \"requires\": [","            \"base-base\",","            \"node-style\"","        ]","    },","    \"anim-color\": {","        \"requires\": [","            \"anim-base\"","        ]","    },","    \"anim-curve\": {","        \"requires\": [","            \"anim-xy\"","        ]","    },","    \"anim-easing\": {","        \"requires\": [","            \"anim-base\"","        ]","    },","    \"anim-node-plugin\": {","        \"requires\": [","            \"node-pluginhost\",","            \"anim-base\"","        ]","    },","    \"anim-scroll\": {","        \"requires\": [","            \"anim-base\"","        ]","    },","    \"anim-shape-transform\": {","        \"requires\": [","            \"anim-base\",","            \"anim-easing\",","            \"matrix\"","        ]","    },","    \"anim-xy\": {","        \"requires\": [","            \"anim-base\",","            \"node-screen\"","        ]","    },","    \"app\": {","        \"use\": [","            \"app-base\",","            \"app-content\",","            \"app-transitions\",","            \"lazy-model-list\",","            \"model\",","            \"model-list\",","            \"model-sync-rest\",","            \"router\",","            \"view\",","            \"view-node-map\"","        ]","    },","    \"app-base\": {","        \"requires\": [","            \"classnamemanager\",","            \"pjax-base\",","            \"router\",","            \"view\"","        ]","    },","    \"app-content\": {","        \"requires\": [","            \"app-base\",","            \"pjax-content\"","        ]","    },","    \"app-transitions\": {","        \"requires\": [","            \"app-base\"","        ]","    },","    \"app-transitions-css\": {","        \"type\": \"css\"","    },","    \"app-transitions-native\": {","        \"condition\": {","            \"name\": \"app-transitions-native\",","            \"test\": function (Y) {","    var doc  = Y.config.doc,","        node = doc ? doc.documentElement : null;","","    if (node && node.style) {","        return ('MozTransition' in node.style || 'WebkitTransition' in node.style);","    }","","    return false;","},","            \"trigger\": \"app-transitions\"","        },","        \"requires\": [","            \"app-transitions\",","            \"app-transitions-css\",","            \"parallel\",","            \"transition\"","        ]","    },","    \"array-extras\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"array-invoke\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"arraylist\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"arraylist-add\": {","        \"requires\": [","            \"arraylist\"","        ]","    },","    \"arraylist-filter\": {","        \"requires\": [","            \"arraylist\"","        ]","    },","    \"arraysort\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"async-queue\": {","        \"requires\": [","            \"event-custom\"","        ]","    },","    \"attribute\": {","        \"use\": [","            \"attribute-base\",","            \"attribute-complex\"","        ]","    },","    \"attribute-base\": {","        \"requires\": [","            \"attribute-core\",","            \"attribute-events\",","            \"attribute-extras\"","        ]","    },","    \"attribute-complex\": {","        \"requires\": [","            \"attribute-base\"","        ]","    },","    \"attribute-core\": {","        \"requires\": [","            \"oop\"","        ]","    },","    \"attribute-events\": {","        \"requires\": [","            \"event-custom\"","        ]","    },","    \"attribute-extras\": {","        \"requires\": [","            \"oop\"","        ]","    },","    \"autocomplete\": {","        \"use\": [","            \"autocomplete-base\",","            \"autocomplete-sources\",","            \"autocomplete-list\",","            \"autocomplete-plugin\"","        ]","    },","    \"autocomplete-base\": {","        \"optional\": [","            \"autocomplete-sources\"","        ],","        \"requires\": [","            \"array-extras\",","            \"base-build\",","            \"escape\",","            \"event-valuechange\",","            \"node-base\"","        ]","    },","    \"autocomplete-filters\": {","        \"requires\": [","            \"array-extras\",","            \"text-wordbreak\"","        ]","    },","    \"autocomplete-filters-accentfold\": {","        \"requires\": [","            \"array-extras\",","            \"text-accentfold\",","            \"text-wordbreak\"","        ]","    },","    \"autocomplete-highlighters\": {","        \"requires\": [","            \"array-extras\",","            \"highlight-base\"","        ]","    },","    \"autocomplete-highlighters-accentfold\": {","        \"requires\": [","            \"array-extras\",","            \"highlight-accentfold\"","        ]","    },","    \"autocomplete-list\": {","        \"after\": [","            \"autocomplete-sources\"","        ],","        \"lang\": [","            \"en\"","        ],","        \"requires\": [","            \"autocomplete-base\",","            \"event-resize\",","            \"node-screen\",","            \"selector-css3\",","            \"shim-plugin\",","            \"widget\",","            \"widget-position\",","            \"widget-position-align\"","        ],","        \"skinnable\": true","    },","    \"autocomplete-list-keys\": {","        \"condition\": {","            \"name\": \"autocomplete-list-keys\",","            \"test\": function (Y) {","    // Only add keyboard support to autocomplete-list if this doesn't appear to","    // be an iOS or Android-based mobile device.","    //","    // There's currently no feasible way to actually detect whether a device has","    // a hardware keyboard, so this sniff will have to do. It can easily be","    // overridden by manually loading the autocomplete-list-keys module.","    //","    // Worth noting: even though iOS supports bluetooth keyboards, Mobile Safari","    // doesn't fire the keyboard events used by AutoCompleteList, so there's","    // no point loading the -keys module even when a bluetooth keyboard may be","    // available.","    return !(Y.UA.ios || Y.UA.android);","},","            \"trigger\": \"autocomplete-list\"","        },","        \"requires\": [","            \"autocomplete-list\",","            \"base-build\"","        ]","    },","    \"autocomplete-plugin\": {","        \"requires\": [","            \"autocomplete-list\",","            \"node-pluginhost\"","        ]","    },","    \"autocomplete-sources\": {","        \"optional\": [","            \"io-base\",","            \"json-parse\",","            \"jsonp\",","            \"yql\"","        ],","        \"requires\": [","            \"autocomplete-base\"","        ]","    },","    \"base\": {","        \"use\": [","            \"base-base\",","            \"base-pluginhost\",","            \"base-build\"","        ]","    },","    \"base-base\": {","        \"after\": [","            \"attribute-complex\"","        ],","        \"requires\": [","            \"base-core\",","            \"attribute-base\"","        ]","    },","    \"base-build\": {","        \"requires\": [","            \"base-base\"","        ]","    },","    \"base-core\": {","        \"requires\": [","            \"attribute-core\"","        ]","    },","    \"base-pluginhost\": {","        \"requires\": [","            \"base-base\",","            \"pluginhost\"","        ]","    },","    \"button\": {","        \"requires\": [","            \"button-core\",","            \"cssbutton\",","            \"widget\"","        ]","    },","    \"button-core\": {","        \"requires\": [","            \"attribute-core\",","            \"classnamemanager\",","            \"node-base\"","        ]","    },","    \"button-group\": {","        \"requires\": [","            \"button-plugin\",","            \"cssbutton\",","            \"widget\"","        ]","    },","    \"button-plugin\": {","        \"requires\": [","            \"button-core\",","            \"cssbutton\",","            \"node-pluginhost\"","        ]","    },","    \"cache\": {","        \"use\": [","            \"cache-base\",","            \"cache-offline\",","            \"cache-plugin\"","        ]","    },","    \"cache-base\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"cache-offline\": {","        \"requires\": [","            \"cache-base\",","            \"json\"","        ]","    },","    \"cache-plugin\": {","        \"requires\": [","            \"plugin\",","            \"cache-base\"","        ]","    },","    \"calendar\": {","        \"lang\": [","            \"de\",","            \"en\",","            \"fr\",","            \"ja\",","            \"nb-NO\",","            \"pt-BR\",","            \"ru\",","            \"zh-HANT-TW\"","        ],","        \"requires\": [","            \"calendar-base\",","            \"calendarnavigator\"","        ],","        \"skinnable\": true","    },","    \"calendar-base\": {","        \"lang\": [","            \"de\",","            \"en\",","            \"fr\",","            \"ja\",","            \"nb-NO\",","            \"pt-BR\",","            \"ru\",","            \"zh-HANT-TW\"","        ],","        \"requires\": [","            \"widget\",","            \"substitute\",","            \"datatype-date\",","            \"datatype-date-math\",","            \"cssgrids\"","        ],","        \"skinnable\": true","    },","    \"calendarnavigator\": {","        \"requires\": [","            \"plugin\",","            \"classnamemanager\",","            \"datatype-date\",","            \"node\",","            \"substitute\"","        ],","        \"skinnable\": true","    },","    \"charts\": {","        \"requires\": [","            \"charts-base\"","        ]","    },","    \"charts-base\": {","        \"requires\": [","            \"dom\",","            \"datatype-number\",","            \"datatype-date\",","            \"event-custom\",","            \"event-mouseenter\",","            \"event-touch\",","            \"widget\",","            \"widget-position\",","            \"widget-stack\",","            \"graphics\"","        ]","    },","    \"charts-legend\": {","        \"requires\": [","            \"charts-base\"","        ]","    },","    \"classnamemanager\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"clickable-rail\": {","        \"requires\": [","            \"slider-base\"","        ]","    },","    \"collection\": {","        \"use\": [","            \"array-extras\",","            \"arraylist\",","            \"arraylist-add\",","            \"arraylist-filter\",","            \"array-invoke\"","        ]","    },","    \"console\": {","        \"lang\": [","            \"en\",","            \"es\",","            \"ja\"","        ],","        \"requires\": [","            \"yui-log\",","            \"widget\",","            \"substitute\"","        ],","        \"skinnable\": true","    },","    \"console-filters\": {","        \"requires\": [","            \"plugin\",","            \"console\"","        ],","        \"skinnable\": true","    },","    \"controller\": {","        \"use\": [","            \"router\"","        ]","    },","    \"cookie\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"createlink-base\": {","        \"requires\": [","            \"editor-base\"","        ]","    },","    \"cssbase\": {","        \"after\": [","            \"cssreset\",","            \"cssfonts\",","            \"cssgrids\",","            \"cssreset-context\",","            \"cssfonts-context\",","            \"cssgrids-context\"","        ],","        \"type\": \"css\"","    },","    \"cssbase-context\": {","        \"after\": [","            \"cssreset\",","            \"cssfonts\",","            \"cssgrids\",","            \"cssreset-context\",","            \"cssfonts-context\",","            \"cssgrids-context\"","        ],","        \"type\": \"css\"","    },","    \"cssbutton\": {","        \"type\": \"css\"","    },","    \"cssfonts\": {","        \"type\": \"css\"","    },","    \"cssfonts-context\": {","        \"type\": \"css\"","    },","    \"cssgrids\": {","        \"optional\": [","            \"cssreset\",","            \"cssfonts\"","        ],","        \"type\": \"css\"","    },","    \"cssgrids-base\": {","        \"optional\": [","            \"cssreset\",","            \"cssfonts\"","        ],","        \"type\": \"css\"","    },","    \"cssgrids-units\": {","        \"optional\": [","            \"cssreset\",","            \"cssfonts\"","        ],","        \"requires\": [","            \"cssgrids-base\"","        ],","        \"type\": \"css\"","    },","    \"cssreset\": {","        \"type\": \"css\"","    },","    \"cssreset-context\": {","        \"type\": \"css\"","    },","    \"dataschema\": {","        \"use\": [","            \"dataschema-base\",","            \"dataschema-json\",","            \"dataschema-xml\",","            \"dataschema-array\",","            \"dataschema-text\"","        ]","    },","    \"dataschema-array\": {","        \"requires\": [","            \"dataschema-base\"","        ]","    },","    \"dataschema-base\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"dataschema-json\": {","        \"requires\": [","            \"dataschema-base\",","            \"json\"","        ]","    },","    \"dataschema-text\": {","        \"requires\": [","            \"dataschema-base\"","        ]","    },","    \"dataschema-xml\": {","        \"requires\": [","            \"dataschema-base\"","        ]","    },","    \"datasource\": {","        \"use\": [","            \"datasource-local\",","            \"datasource-io\",","            \"datasource-get\",","            \"datasource-function\",","            \"datasource-cache\",","            \"datasource-jsonschema\",","            \"datasource-xmlschema\",","            \"datasource-arrayschema\",","            \"datasource-textschema\",","            \"datasource-polling\"","        ]","    },","    \"datasource-arrayschema\": {","        \"requires\": [","            \"datasource-local\",","            \"plugin\",","            \"dataschema-array\"","        ]","    },","    \"datasource-cache\": {","        \"requires\": [","            \"datasource-local\",","            \"plugin\",","            \"cache-base\"","        ]","    },","    \"datasource-function\": {","        \"requires\": [","            \"datasource-local\"","        ]","    },","    \"datasource-get\": {","        \"requires\": [","            \"datasource-local\",","            \"get\"","        ]","    },","    \"datasource-io\": {","        \"requires\": [","            \"datasource-local\",","            \"io-base\"","        ]","    },","    \"datasource-jsonschema\": {","        \"requires\": [","            \"datasource-local\",","            \"plugin\",","            \"dataschema-json\"","        ]","    },","    \"datasource-local\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"datasource-polling\": {","        \"requires\": [","            \"datasource-local\"","        ]","    },","    \"datasource-textschema\": {","        \"requires\": [","            \"datasource-local\",","            \"plugin\",","            \"dataschema-text\"","        ]","    },","    \"datasource-xmlschema\": {","        \"requires\": [","            \"datasource-local\",","            \"plugin\",","            \"dataschema-xml\"","        ]","    },","    \"datatable\": {","        \"use\": [","            \"datatable-core\",","            \"datatable-table\",","            \"datatable-head\",","            \"datatable-body\",","            \"datatable-base\",","            \"datatable-column-widths\",","            \"datatable-message\",","            \"datatable-mutable\",","            \"datatable-sort\",","            \"datatable-datasource\"","        ]","    },","    \"datatable-base\": {","        \"requires\": [","            \"datatable-core\",","            \"datatable-table\",","            \"base-build\",","            \"widget\"","        ],","        \"skinnable\": true","    },","    \"datatable-base-deprecated\": {","        \"requires\": [","            \"recordset-base\",","            \"widget\",","            \"substitute\",","            \"event-mouseenter\"","        ],","        \"skinnable\": true","    },","    \"datatable-body\": {","        \"requires\": [","            \"datatable-core\",","            \"view\",","            \"classnamemanager\"","        ]","    },","    \"datatable-column-widths\": {","        \"requires\": [","            \"datatable-base\"","        ]","    },","    \"datatable-core\": {","        \"requires\": [","            \"escape\",","            \"model-list\",","            \"node-event-delegate\"","        ]","    },","    \"datatable-datasource\": {","        \"requires\": [","            \"datatable-base\",","            \"plugin\",","            \"datasource-local\"","        ]","    },","    \"datatable-datasource-deprecated\": {","        \"requires\": [","            \"datatable-base-deprecated\",","            \"plugin\",","            \"datasource-local\"","        ]","    },","    \"datatable-deprecated\": {","        \"use\": [","            \"datatable-base-deprecated\",","            \"datatable-datasource-deprecated\",","            \"datatable-sort-deprecated\",","            \"datatable-scroll-deprecated\"","        ]","    },","    \"datatable-head\": {","        \"requires\": [","            \"datatable-core\",","            \"view\",","            \"classnamemanager\"","        ]","    },","    \"datatable-message\": {","        \"lang\": [","            \"en\"","        ],","        \"requires\": [","            \"datatable-base\"","        ],","        \"skinnable\": true","    },","    \"datatable-mutable\": {","        \"requires\": [","            \"datatable-base\"","        ]","    },","    \"datatable-scroll\": {","        \"requires\": [","            \"datatable-base\",","            \"datatable-column-widths\",","            \"dom-screen\"","        ],","        \"skinnable\": true","    },","    \"datatable-scroll-deprecated\": {","        \"requires\": [","            \"datatable-base-deprecated\",","            \"plugin\"","        ]","    },","    \"datatable-sort\": {","        \"lang\": [","            \"en\"","        ],","        \"requires\": [","            \"datatable-base\"","        ],","        \"skinnable\": true","    },","    \"datatable-sort-deprecated\": {","        \"lang\": [","            \"en\"","        ],","        \"requires\": [","            \"datatable-base-deprecated\",","            \"plugin\",","            \"recordset-sort\"","        ]","    },","    \"datatable-table\": {","        \"requires\": [","            \"datatable-core\",","            \"datatable-head\",","            \"datatable-body\",","            \"view\",","            \"classnamemanager\"","        ]","    },","    \"datatype\": {","        \"use\": [","            \"datatype-number\",","            \"datatype-date\",","            \"datatype-xml\"","        ]","    },","    \"datatype-date\": {","        \"supersedes\": [","            \"datatype-date-format\"","        ],","        \"use\": [","            \"datatype-date-parse\",","            \"datatype-date-format\"","        ]","    },","    \"datatype-date-format\": {","        \"lang\": [","            \"ar\",","            \"ar-JO\",","            \"ca\",","            \"ca-ES\",","            \"da\",","            \"da-DK\",","            \"de\",","            \"de-AT\",","            \"de-DE\",","            \"el\",","            \"el-GR\",","            \"en\",","            \"en-AU\",","            \"en-CA\",","            \"en-GB\",","            \"en-IE\",","            \"en-IN\",","            \"en-JO\",","            \"en-MY\",","            \"en-NZ\",","            \"en-PH\",","            \"en-SG\",","            \"en-US\",","            \"es\",","            \"es-AR\",","            \"es-BO\",","            \"es-CL\",","            \"es-CO\",","            \"es-EC\",","            \"es-ES\",","            \"es-MX\",","            \"es-PE\",","            \"es-PY\",","            \"es-US\",","            \"es-UY\",","            \"es-VE\",","            \"fi\",","            \"fi-FI\",","            \"fr\",","            \"fr-BE\",","            \"fr-CA\",","            \"fr-FR\",","            \"hi\",","            \"hi-IN\",","            \"id\",","            \"id-ID\",","            \"it\",","            \"it-IT\",","            \"ja\",","            \"ja-JP\",","            \"ko\",","            \"ko-KR\",","            \"ms\",","            \"ms-MY\",","            \"nb\",","            \"nb-NO\",","            \"nl\",","            \"nl-BE\",","            \"nl-NL\",","            \"pl\",","            \"pl-PL\",","            \"pt\",","            \"pt-BR\",","            \"ro\",","            \"ro-RO\",","            \"ru\",","            \"ru-RU\",","            \"sv\",","            \"sv-SE\",","            \"th\",","            \"th-TH\",","            \"tr\",","            \"tr-TR\",","            \"vi\",","            \"vi-VN\",","            \"zh-Hans\",","            \"zh-Hans-CN\",","            \"zh-Hant\",","            \"zh-Hant-HK\",","            \"zh-Hant-TW\"","        ]","    },","    \"datatype-date-math\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"datatype-date-parse\": {},","    \"datatype-number\": {","        \"use\": [","            \"datatype-number-parse\",","            \"datatype-number-format\"","        ]","    },","    \"datatype-number-format\": {},","    \"datatype-number-parse\": {},","    \"datatype-xml\": {","        \"use\": [","            \"datatype-xml-parse\",","            \"datatype-xml-format\"","        ]","    },","    \"datatype-xml-format\": {},","    \"datatype-xml-parse\": {},","    \"dd\": {","        \"use\": [","            \"dd-ddm-base\",","            \"dd-ddm\",","            \"dd-ddm-drop\",","            \"dd-drag\",","            \"dd-proxy\",","            \"dd-constrain\",","            \"dd-drop\",","            \"dd-scroll\",","            \"dd-delegate\"","        ]","    },","    \"dd-constrain\": {","        \"requires\": [","            \"dd-drag\"","        ]","    },","    \"dd-ddm\": {","        \"requires\": [","            \"dd-ddm-base\",","            \"event-resize\"","        ]","    },","    \"dd-ddm-base\": {","        \"requires\": [","            \"node\",","            \"base\",","            \"yui-throttle\",","            \"classnamemanager\"","        ]","    },","    \"dd-ddm-drop\": {","        \"requires\": [","            \"dd-ddm\"","        ]","    },","    \"dd-delegate\": {","        \"requires\": [","            \"dd-drag\",","            \"dd-drop-plugin\",","            \"event-mouseenter\"","        ]","    },","    \"dd-drag\": {","        \"requires\": [","            \"dd-ddm-base\"","        ]","    },","    \"dd-drop\": {","        \"requires\": [","            \"dd-drag\",","            \"dd-ddm-drop\"","        ]","    },","    \"dd-drop-plugin\": {","        \"requires\": [","            \"dd-drop\"","        ]","    },","    \"dd-gestures\": {","        \"condition\": {","            \"name\": \"dd-gestures\",","            \"test\": function(Y) {","    return ((Y.config.win && (\"ontouchstart\" in Y.config.win)) && !(Y.UA.chrome && Y.UA.chrome < 6));","},","            \"trigger\": \"dd-drag\"","        },","        \"requires\": [","            \"dd-drag\",","            \"event-synthetic\",","            \"event-gestures\"","        ]","    },","    \"dd-plugin\": {","        \"optional\": [","            \"dd-constrain\",","            \"dd-proxy\"","        ],","        \"requires\": [","            \"dd-drag\"","        ]","    },","    \"dd-proxy\": {","        \"requires\": [","            \"dd-drag\"","        ]","    },","    \"dd-scroll\": {","        \"requires\": [","            \"dd-drag\"","        ]","    },","    \"dial\": {","        \"lang\": [","            \"en\",","            \"es\"","        ],","        \"requires\": [","            \"widget\",","            \"dd-drag\",","            \"substitute\",","            \"event-mouseenter\",","            \"event-move\",","            \"event-key\",","            \"transition\",","            \"intl\"","        ],","        \"skinnable\": true","    },","    \"dom\": {","        \"use\": [","            \"dom-base\",","            \"dom-screen\",","            \"dom-style\",","            \"selector-native\",","            \"selector\"","        ]","    },","    \"dom-base\": {","        \"requires\": [","            \"dom-core\"","        ]","    },","    \"dom-core\": {","        \"requires\": [","            \"oop\",","            \"features\"","        ]","    },","    \"dom-deprecated\": {","        \"requires\": [","            \"dom-base\"","        ]","    },","    \"dom-screen\": {","        \"requires\": [","            \"dom-base\",","            \"dom-style\"","        ]","    },","    \"dom-style\": {","        \"requires\": [","            \"dom-base\"","        ]","    },","    \"dom-style-ie\": {","        \"condition\": {","            \"name\": \"dom-style-ie\",","            \"test\": function (Y) {","","    var testFeature = Y.Features.test,","        addFeature = Y.Features.add,","        WINDOW = Y.config.win,","        DOCUMENT = Y.config.doc,","        DOCUMENT_ELEMENT = 'documentElement',","        ret = false;","","    addFeature('style', 'computedStyle', {","        test: function() {","            return WINDOW && 'getComputedStyle' in WINDOW;","        }","    });","","    addFeature('style', 'opacity', {","        test: function() {","            return DOCUMENT && 'opacity' in DOCUMENT[DOCUMENT_ELEMENT].style;","        }","    });","","    ret =  (!testFeature('style', 'opacity') &&","            !testFeature('style', 'computedStyle'));","","    return ret;","},","            \"trigger\": \"dom-style\"","        },","        \"requires\": [","            \"dom-style\"","        ]","    },","    \"dump\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"editor\": {","        \"use\": [","            \"frame\",","            \"editor-selection\",","            \"exec-command\",","            \"editor-base\",","            \"editor-para\",","            \"editor-br\",","            \"editor-bidi\",","            \"editor-tab\",","            \"createlink-base\"","        ]","    },","    \"editor-base\": {","        \"requires\": [","            \"base\",","            \"frame\",","            \"node\",","            \"exec-command\",","            \"editor-selection\"","        ]","    },","    \"editor-bidi\": {","        \"requires\": [","            \"editor-base\"","        ]","    },","    \"editor-br\": {","        \"requires\": [","            \"editor-base\"","        ]","    },","    \"editor-lists\": {","        \"requires\": [","            \"editor-base\"","        ]","    },","    \"editor-para\": {","        \"requires\": [","            \"editor-para-base\"","        ]","    },","    \"editor-para-base\": {","        \"requires\": [","            \"editor-base\"","        ]","    },","    \"editor-para-ie\": {","        \"condition\": {","            \"name\": \"editor-para-ie\",","            \"trigger\": \"editor-para\",","            \"ua\": \"ie\",","            \"when\": \"instead\"","        },","        \"requires\": [","            \"editor-para-base\"","        ]","    },","    \"editor-selection\": {","        \"requires\": [","            \"node\"","        ]","    },","    \"editor-tab\": {","        \"requires\": [","            \"editor-base\"","        ]","    },","    \"escape\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"event\": {","        \"after\": [","            \"node-base\"","        ],","        \"use\": [","            \"event-base\",","            \"event-delegate\",","            \"event-synthetic\",","            \"event-mousewheel\",","            \"event-mouseenter\",","            \"event-key\",","            \"event-focus\",","            \"event-resize\",","            \"event-hover\",","            \"event-outside\",","            \"event-touch\",","            \"event-move\",","            \"event-flick\",","            \"event-valuechange\"","        ]","    },","    \"event-base\": {","        \"after\": [","            \"node-base\"","        ],","        \"requires\": [","            \"event-custom-base\"","        ]","    },","    \"event-base-ie\": {","        \"after\": [","            \"event-base\"","        ],","        \"condition\": {","            \"name\": \"event-base-ie\",","            \"test\": function(Y) {","    var imp = Y.config.doc && Y.config.doc.implementation;","    return (imp && (!imp.hasFeature('Events', '2.0')));","},","            \"trigger\": \"node-base\"","        },","        \"requires\": [","            \"node-base\"","        ]","    },","    \"event-contextmenu\": {","        \"requires\": [","            \"event-synthetic\",","            \"dom-screen\"","        ]","    },","    \"event-custom\": {","        \"use\": [","            \"event-custom-base\",","            \"event-custom-complex\"","        ]","    },","    \"event-custom-base\": {","        \"requires\": [","            \"oop\"","        ]","    },","    \"event-custom-complex\": {","        \"requires\": [","            \"event-custom-base\"","        ]","    },","    \"event-delegate\": {","        \"requires\": [","            \"node-base\"","        ]","    },","    \"event-flick\": {","        \"requires\": [","            \"node-base\",","            \"event-touch\",","            \"event-synthetic\"","        ]","    },","    \"event-focus\": {","        \"requires\": [","            \"event-synthetic\"","        ]","    },","    \"event-gestures\": {","        \"use\": [","            \"event-flick\",","            \"event-move\"","        ]","    },","    \"event-hover\": {","        \"requires\": [","            \"event-mouseenter\"","        ]","    },","    \"event-key\": {","        \"requires\": [","            \"event-synthetic\"","        ]","    },","    \"event-mouseenter\": {","        \"requires\": [","            \"event-synthetic\"","        ]","    },","    \"event-mousewheel\": {","        \"requires\": [","            \"node-base\"","        ]","    },","    \"event-move\": {","        \"requires\": [","            \"node-base\",","            \"event-touch\",","            \"event-synthetic\"","        ]","    },","    \"event-outside\": {","        \"requires\": [","            \"event-synthetic\"","        ]","    },","    \"event-resize\": {","        \"requires\": [","            \"node-base\",","            \"event-synthetic\"","        ]","    },","    \"event-simulate\": {","        \"requires\": [","            \"event-base\"","        ]","    },","    \"event-synthetic\": {","        \"requires\": [","            \"node-base\",","            \"event-custom-complex\"","        ]","    },","    \"event-touch\": {","        \"requires\": [","            \"node-base\"","        ]","    },","    \"event-valuechange\": {","        \"requires\": [","            \"event-focus\",","            \"event-synthetic\"","        ]","    },","    \"exec-command\": {","        \"requires\": [","            \"frame\"","        ]","    },","    \"features\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"file\": {","        \"requires\": [","            \"file-flash\",","            \"file-html5\"","        ]","    },","    \"file-flash\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"file-html5\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"frame\": {","        \"requires\": [","            \"base\",","            \"node\",","            \"selector-css3\",","            \"substitute\",","            \"yui-throttle\"","        ]","    },","    \"gesture-simulate\": {","        \"requires\": [","            \"async-queue\",","            \"event-simulate\",","            \"node-screen\"","        ]","    },","    \"get\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"graphics\": {","        \"requires\": [","            \"node\",","            \"event-custom\",","            \"pluginhost\",","            \"matrix\",","            \"classnamemanager\"","        ]","    },","    \"graphics-canvas\": {","        \"condition\": {","            \"name\": \"graphics-canvas\",","            \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext(\"2d\"));","},","            \"trigger\": \"graphics\"","        },","        \"requires\": [","            \"graphics\"","        ]","    },","    \"graphics-canvas-default\": {","        \"condition\": {","            \"name\": \"graphics-canvas-default\",","            \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext(\"2d\"));","},","            \"trigger\": \"graphics\"","        }","    },","    \"graphics-svg\": {","        \"condition\": {","            \"name\": \"graphics-svg\",","            \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    ","    return svg && (useSVG || !canvas);","},","            \"trigger\": \"graphics\"","        },","        \"requires\": [","            \"graphics\"","        ]","    },","    \"graphics-svg-default\": {","        \"condition\": {","            \"name\": \"graphics-svg-default\",","            \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != \"canvas\",","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\"),","        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\"));","    ","    return svg && (useSVG || !canvas);","},","            \"trigger\": \"graphics\"","        }","    },","    \"graphics-vml\": {","        \"condition\": {","            \"name\": \"graphics-vml\",","            \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\");","    return (DOCUMENT && !DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\") && (!canvas || !canvas.getContext || !canvas.getContext(\"2d\")));","},","            \"trigger\": \"graphics\"","        },","        \"requires\": [","            \"graphics\"","        ]","    },","    \"graphics-vml-default\": {","        \"condition\": {","            \"name\": \"graphics-vml-default\",","            \"test\": function(Y) {","    var DOCUMENT = Y.config.doc,","		canvas = DOCUMENT && DOCUMENT.createElement(\"canvas\");","    return (DOCUMENT && !DOCUMENT.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/feature#BasicStructure\", \"1.1\") && (!canvas || !canvas.getContext || !canvas.getContext(\"2d\")));","},","            \"trigger\": \"graphics\"","        }","    },","    \"handlebars\": {","        \"use\": [","            \"handlebars-compiler\"","        ]","    },","    \"handlebars-base\": {","        \"requires\": [","            \"escape\"","        ]","    },","    \"handlebars-compiler\": {","        \"requires\": [","            \"handlebars-base\"","        ]","    },","    \"highlight\": {","        \"use\": [","            \"highlight-base\",","            \"highlight-accentfold\"","        ]","    },","    \"highlight-accentfold\": {","        \"requires\": [","            \"highlight-base\",","            \"text-accentfold\"","        ]","    },","    \"highlight-base\": {","        \"requires\": [","            \"array-extras\",","            \"classnamemanager\",","            \"escape\",","            \"text-wordbreak\"","        ]","    },","    \"history\": {","        \"use\": [","            \"history-base\",","            \"history-hash\",","            \"history-hash-ie\",","            \"history-html5\"","        ]","    },","    \"history-base\": {","        \"requires\": [","            \"event-custom-complex\"","        ]","    },","    \"history-hash\": {","        \"after\": [","            \"history-html5\"","        ],","        \"requires\": [","            \"event-synthetic\",","            \"history-base\",","            \"yui-later\"","        ]","    },","    \"history-hash-ie\": {","        \"condition\": {","            \"name\": \"history-hash-ie\",","            \"test\": function (Y) {","    var docMode = Y.config.doc && Y.config.doc.documentMode;","","    return Y.UA.ie && (!('onhashchange' in Y.config.win) ||","            !docMode || docMode < 8);","},","            \"trigger\": \"history-hash\"","        },","        \"requires\": [","            \"history-hash\",","            \"node-base\"","        ]","    },","    \"history-html5\": {","        \"optional\": [","            \"json\"","        ],","        \"requires\": [","            \"event-base\",","            \"history-base\",","            \"node-base\"","        ]","    },","    \"imageloader\": {","        \"requires\": [","            \"base-base\",","            \"node-style\",","            \"node-screen\"","        ]","    },","    \"intl\": {","        \"requires\": [","            \"intl-base\",","            \"event-custom\"","        ]","    },","    \"intl-base\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"io\": {","        \"use\": [","            \"io-base\",","            \"io-xdr\",","            \"io-form\",","            \"io-upload-iframe\",","            \"io-queue\"","        ]","    },","    \"io-base\": {","        \"requires\": [","            \"event-custom-base\",","            \"querystring-stringify-simple\"","        ]","    },","    \"io-form\": {","        \"requires\": [","            \"io-base\",","            \"node-base\"","        ]","    },","    \"io-nodejs\": {","        \"condition\": {","            \"name\": \"io-nodejs\",","            \"trigger\": \"io-base\",","            \"ua\": \"nodejs\"","        },","        \"requires\": [","            \"io-base\"","        ]","    },","    \"io-queue\": {","        \"requires\": [","            \"io-base\",","            \"queue-promote\"","        ]","    },","    \"io-upload-iframe\": {","        \"requires\": [","            \"io-base\",","            \"node-base\"","        ]","    },","    \"io-xdr\": {","        \"requires\": [","            \"io-base\",","            \"datatype-xml-parse\"","        ]","    },","    \"json\": {","        \"use\": [","            \"json-parse\",","            \"json-stringify\"","        ]","    },","    \"json-parse\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"json-stringify\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"jsonp\": {","        \"requires\": [","            \"get\",","            \"oop\"","        ]","    },","    \"jsonp-url\": {","        \"requires\": [","            \"jsonp\"","        ]","    },","    \"lazy-model-list\": {","        \"requires\": [","            \"model-list\"","        ]","    },","    \"loader\": {","        \"use\": [","            \"loader-base\",","            \"loader-rollup\",","            \"loader-yui3\"","        ]","    },","    \"loader-base\": {","        \"requires\": [","            \"get\",","            \"features\"","        ]","    },","    \"loader-rollup\": {","        \"requires\": [","            \"loader-base\"","        ]","    },","    \"loader-yui3\": {","        \"requires\": [","            \"loader-base\"","        ]","    },","    \"matrix\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"model\": {","        \"requires\": [","            \"base-build\",","            \"escape\",","            \"json-parse\"","        ]","    },","    \"model-list\": {","        \"requires\": [","            \"array-extras\",","            \"array-invoke\",","            \"arraylist\",","            \"base-build\",","            \"escape\",","            \"json-parse\",","            \"model\"","        ]","    },","    \"model-sync-rest\": {","        \"requires\": [","            \"model\",","            \"io-base\",","            \"json-stringify\"","        ]","    },","    \"node\": {","        \"use\": [","            \"node-base\",","            \"node-event-delegate\",","            \"node-pluginhost\",","            \"node-screen\",","            \"node-style\"","        ]","    },","    \"node-base\": {","        \"requires\": [","            \"event-base\",","            \"node-core\",","            \"dom-base\"","        ]","    },","    \"node-core\": {","        \"requires\": [","            \"dom-core\",","            \"selector\"","        ]","    },","    \"node-deprecated\": {","        \"requires\": [","            \"node-base\"","        ]","    },","    \"node-event-delegate\": {","        \"requires\": [","            \"node-base\",","            \"event-delegate\"","        ]","    },","    \"node-event-html5\": {","        \"requires\": [","            \"node-base\"","        ]","    },","    \"node-event-simulate\": {","        \"requires\": [","            \"node-base\",","            \"event-simulate\",","            \"gesture-simulate\"","        ]","    },","    \"node-flick\": {","        \"requires\": [","            \"classnamemanager\",","            \"transition\",","            \"event-flick\",","            \"plugin\"","        ],","        \"skinnable\": true","    },","    \"node-focusmanager\": {","        \"requires\": [","            \"attribute\",","            \"node\",","            \"plugin\",","            \"node-event-simulate\",","            \"event-key\",","            \"event-focus\"","        ]","    },","    \"node-load\": {","        \"requires\": [","            \"node-base\",","            \"io-base\"","        ]","    },","    \"node-menunav\": {","        \"requires\": [","            \"node\",","            \"classnamemanager\",","            \"plugin\",","            \"node-focusmanager\"","        ],","        \"skinnable\": true","    },","    \"node-pluginhost\": {","        \"requires\": [","            \"node-base\",","            \"pluginhost\"","        ]","    },","    \"node-screen\": {","        \"requires\": [","            \"dom-screen\",","            \"node-base\"","        ]","    },","    \"node-style\": {","        \"requires\": [","            \"dom-style\",","            \"node-base\"","        ]","    },","    \"oop\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"overlay\": {","        \"requires\": [","            \"widget\",","            \"widget-stdmod\",","            \"widget-position\",","            \"widget-position-align\",","            \"widget-stack\",","            \"widget-position-constrain\"","        ],","        \"skinnable\": true","    },","    \"panel\": {","        \"requires\": [","            \"widget\",","            \"widget-autohide\",","            \"widget-buttons\",","            \"widget-modality\",","            \"widget-position\",","            \"widget-position-align\",","            \"widget-position-constrain\",","            \"widget-stack\",","            \"widget-stdmod\"","        ],","        \"skinnable\": true","    },","    \"parallel\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"pjax\": {","        \"requires\": [","            \"pjax-base\",","            \"pjax-content\"","        ]","    },","    \"pjax-base\": {","        \"requires\": [","            \"classnamemanager\",","            \"node-event-delegate\",","            \"router\"","        ]","    },","    \"pjax-content\": {","        \"requires\": [","            \"io-base\",","            \"node-base\",","            \"router\"","        ]","    },","    \"pjax-plugin\": {","        \"requires\": [","            \"node-pluginhost\",","            \"pjax\",","            \"plugin\"","        ]","    },","    \"plugin\": {","        \"requires\": [","            \"base-base\"","        ]","    },","    \"pluginhost\": {","        \"use\": [","            \"pluginhost-base\",","            \"pluginhost-config\"","        ]","    },","    \"pluginhost-base\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"pluginhost-config\": {","        \"requires\": [","            \"pluginhost-base\"","        ]","    },","    \"profiler\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"querystring\": {","        \"use\": [","            \"querystring-parse\",","            \"querystring-stringify\"","        ]","    },","    \"querystring-parse\": {","        \"requires\": [","            \"yui-base\",","            \"array-extras\"","        ]","    },","    \"querystring-parse-simple\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"querystring-stringify\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"querystring-stringify-simple\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"queue-promote\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"range-slider\": {","        \"requires\": [","            \"slider-base\",","            \"slider-value-range\",","            \"clickable-rail\"","        ]","    },","    \"recordset\": {","        \"use\": [","            \"recordset-base\",","            \"recordset-sort\",","            \"recordset-filter\",","            \"recordset-indexer\"","        ]","    },","    \"recordset-base\": {","        \"requires\": [","            \"base\",","            \"arraylist\"","        ]","    },","    \"recordset-filter\": {","        \"requires\": [","            \"recordset-base\",","            \"array-extras\",","            \"plugin\"","        ]","    },","    \"recordset-indexer\": {","        \"requires\": [","            \"recordset-base\",","            \"plugin\"","        ]","    },","    \"recordset-sort\": {","        \"requires\": [","            \"arraysort\",","            \"recordset-base\",","            \"plugin\"","        ]","    },","    \"resize\": {","        \"use\": [","            \"resize-base\",","            \"resize-proxy\",","            \"resize-constrain\"","        ]","    },","    \"resize-base\": {","        \"requires\": [","            \"base\",","            \"widget\",","            \"substitute\",","            \"event\",","            \"oop\",","            \"dd-drag\",","            \"dd-delegate\",","            \"dd-drop\"","        ],","        \"skinnable\": true","    },","    \"resize-constrain\": {","        \"requires\": [","            \"plugin\",","            \"resize-base\"","        ]","    },","    \"resize-plugin\": {","        \"optional\": [","            \"resize-constrain\"","        ],","        \"requires\": [","            \"resize-base\",","            \"plugin\"","        ]","    },","    \"resize-proxy\": {","        \"requires\": [","            \"plugin\",","            \"resize-base\"","        ]","    },","    \"router\": {","        \"optional\": [","            \"querystring-parse\"","        ],","        \"requires\": [","            \"array-extras\",","            \"base-build\",","            \"history\"","        ]","    },","    \"scrollview\": {","        \"requires\": [","            \"scrollview-base\",","            \"scrollview-scrollbars\"","        ]","    },","    \"scrollview-base\": {","        \"requires\": [","            \"widget\",","            \"event-gestures\",","            \"event-mousewheel\",","            \"transition\"","        ],","        \"skinnable\": true","    },","    \"scrollview-base-ie\": {","        \"condition\": {","            \"name\": \"scrollview-base-ie\",","            \"trigger\": \"scrollview-base\",","            \"ua\": \"ie\"","        },","        \"requires\": [","            \"scrollview-base\"","        ]","    },","    \"scrollview-list\": {","        \"requires\": [","            \"plugin\",","            \"classnamemanager\"","        ],","        \"skinnable\": true","    },","    \"scrollview-paginator\": {","        \"requires\": [","            \"plugin\",","            \"classnamemanager\"","        ]","    },","    \"scrollview-scrollbars\": {","        \"requires\": [","            \"classnamemanager\",","            \"transition\",","            \"plugin\"","        ],","        \"skinnable\": true","    },","    \"selector\": {","        \"requires\": [","            \"selector-native\"","        ]","    },","    \"selector-css2\": {","        \"condition\": {","            \"name\": \"selector-css2\",","            \"test\": function (Y) {","    var DOCUMENT = Y.config.doc,","        ret = DOCUMENT && !('querySelectorAll' in DOCUMENT);","","    return ret;","},","            \"trigger\": \"selector\"","        },","        \"requires\": [","            \"selector-native\"","        ]","    },","    \"selector-css3\": {","        \"requires\": [","            \"selector-native\",","            \"selector-css2\"","        ]","    },","    \"selector-native\": {","        \"requires\": [","            \"dom-base\"","        ]","    },","    \"shim-plugin\": {","        \"requires\": [","            \"node-style\",","            \"node-pluginhost\"","        ]","    },","    \"slider\": {","        \"use\": [","            \"slider-base\",","            \"slider-value-range\",","            \"clickable-rail\",","            \"range-slider\"","        ]","    },","    \"slider-base\": {","        \"requires\": [","            \"widget\",","            \"dd-constrain\",","            \"substitute\",","            \"event-key\"","        ],","        \"skinnable\": true","    },","    \"slider-value-range\": {","        \"requires\": [","            \"slider-base\"","        ]","    },","    \"sortable\": {","        \"requires\": [","            \"dd-delegate\",","            \"dd-drop-plugin\",","            \"dd-proxy\"","        ]","    },","    \"sortable-scroll\": {","        \"requires\": [","            \"dd-scroll\",","            \"sortable\"","        ]","    },","    \"stylesheet\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"substitute\": {","        \"optional\": [","            \"dump\"","        ],","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"swf\": {","        \"requires\": [","            \"event-custom\",","            \"node\",","            \"swfdetect\",","            \"escape\"","        ]","    },","    \"swfdetect\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"tabview\": {","        \"requires\": [","            \"widget\",","            \"widget-parent\",","            \"widget-child\",","            \"tabview-base\",","            \"node-pluginhost\",","            \"node-focusmanager\"","        ],","        \"skinnable\": true","    },","    \"tabview-base\": {","        \"requires\": [","            \"node-event-delegate\",","            \"classnamemanager\",","            \"skin-sam-tabview\"","        ]","    },","    \"tabview-plugin\": {","        \"requires\": [","            \"tabview-base\"","        ]","    },","    \"test\": {","        \"requires\": [","            \"event-simulate\",","            \"event-custom\",","            \"substitute\",","            \"json-stringify\"","        ],","        \"skinnable\": true","    },","    \"test-console\": {","        \"requires\": [","            \"console-filters\",","            \"test\"","        ],","        \"skinnable\": true","    },","    \"text\": {","        \"use\": [","            \"text-accentfold\",","            \"text-wordbreak\"","        ]","    },","    \"text-accentfold\": {","        \"requires\": [","            \"array-extras\",","            \"text-data-accentfold\"","        ]","    },","    \"text-data-accentfold\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"text-data-wordbreak\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"text-wordbreak\": {","        \"requires\": [","            \"array-extras\",","            \"text-data-wordbreak\"","        ]","    },","    \"transition\": {","        \"requires\": [","            \"node-style\"","        ]","    },","    \"transition-timer\": {","        \"condition\": {","            \"name\": \"transition-timer\",","            \"test\": function (Y) {","    var DOCUMENT = Y.config.doc,","        node = (DOCUMENT) ? DOCUMENT.documentElement: null,","        ret = true;","","    if (node && node.style) {","        ret = !('MozTransition' in node.style || 'WebkitTransition' in node.style);","    } ","","    return ret;","},","            \"trigger\": \"transition\"","        },","        \"requires\": [","            \"transition\"","        ]","    },","    \"uploader\": {","        \"requires\": [","            \"uploader-html5\",","            \"uploader-flash\"","        ]","    },","    \"uploader-deprecated\": {","        \"requires\": [","            \"event-custom\",","            \"node\",","            \"base\",","            \"swf\"","        ]","    },","    \"uploader-flash\": {","        \"requires\": [","            \"swf\",","            \"widget\",","            \"substitute\",","            \"base\",","            \"cssbutton\",","            \"node\",","            \"event-custom\",","            \"file-flash\",","            \"uploader-queue\"","        ]","    },","    \"uploader-html5\": {","        \"requires\": [","            \"widget\",","            \"node-event-simulate\",","            \"substitute\",","            \"file-html5\",","            \"uploader-queue\"","        ]","    },","    \"uploader-queue\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"view\": {","        \"requires\": [","            \"base-build\",","            \"node-event-delegate\"","        ]","    },","    \"view-node-map\": {","        \"requires\": [","            \"view\"","        ]","    },","    \"widget\": {","        \"use\": [","            \"widget-base\",","            \"widget-htmlparser\",","            \"widget-skin\",","            \"widget-uievents\"","        ]","    },","    \"widget-anim\": {","        \"requires\": [","            \"anim-base\",","            \"plugin\",","            \"widget\"","        ]","    },","    \"widget-autohide\": {","        \"requires\": [","            \"base-build\",","            \"event-key\",","            \"event-outside\",","            \"widget\"","        ]","    },","    \"widget-base\": {","        \"requires\": [","            \"attribute\",","            \"base-base\",","            \"base-pluginhost\",","            \"classnamemanager\",","            \"event-focus\",","            \"node-base\",","            \"node-style\"","        ],","        \"skinnable\": true","    },","    \"widget-base-ie\": {","        \"condition\": {","            \"name\": \"widget-base-ie\",","            \"trigger\": \"widget-base\",","            \"ua\": \"ie\"","        },","        \"requires\": [","            \"widget-base\"","        ]","    },","    \"widget-buttons\": {","        \"requires\": [","            \"button-plugin\",","            \"cssbutton\",","            \"widget-stdmod\"","        ]","    },","    \"widget-child\": {","        \"requires\": [","            \"base-build\",","            \"widget\"","        ]","    },","    \"widget-htmlparser\": {","        \"requires\": [","            \"widget-base\"","        ]","    },","    \"widget-locale\": {","        \"requires\": [","            \"widget-base\"","        ]","    },","    \"widget-modality\": {","        \"requires\": [","            \"base-build\",","            \"event-outside\",","            \"widget\"","        ],","        \"skinnable\": true","    },","    \"widget-parent\": {","        \"requires\": [","            \"arraylist\",","            \"base-build\",","            \"widget\"","        ]","    },","    \"widget-position\": {","        \"requires\": [","            \"base-build\",","            \"node-screen\",","            \"widget\"","        ]","    },","    \"widget-position-align\": {","        \"requires\": [","            \"widget-position\"","        ]","    },","    \"widget-position-constrain\": {","        \"requires\": [","            \"widget-position\"","        ]","    },","    \"widget-skin\": {","        \"requires\": [","            \"widget-base\"","        ]","    },","    \"widget-stack\": {","        \"requires\": [","            \"base-build\",","            \"widget\"","        ],","        \"skinnable\": true","    },","    \"widget-stdmod\": {","        \"requires\": [","            \"base-build\",","            \"widget\"","        ]","    },","    \"widget-uievents\": {","        \"requires\": [","            \"node-event-delegate\",","            \"widget-base\"","        ]","    },","    \"yql\": {","        \"requires\": [","            \"jsonp\",","            \"jsonp-url\"","        ]","    },","    \"yui\": {},","    \"yui-base\": {},","    \"yui-later\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"yui-log\": {","        \"requires\": [","            \"yui-base\"","        ]","    },","    \"yui-throttle\": {","        \"requires\": [","            \"yui-base\"","        ]","    }","};","YUI.Env[Y.version].md5 = '2631b5fb2c08064b4e8385f1142513e5';","","","}, '@VERSION@' ,{requires:['loader-base']});","","","YUI.add('yui', function(Y){}, '@VERSION@' ,{use:['yui-base','get','features','intl-base','yui-log','yui-log-nodejs','yui-later','loader-base', 'loader-rollup', 'loader-yui3']});",""];
/**
 * The YUI module contains the components required for building the YUI seed
 * file.  This includes the script loading mechanism, a simple queue, and
 * the core utilities for the library.
 * @module yui
 * @main yui
 * @submodule yui-base
 */

_yuitest_coverage["/build/yui-nodejs/yui-nodejs.js"].lines = {"10":0,"11":0,"54":0,"55":0,"60":0,"64":0,"65":0,"68":0,"96":0,"97":0,"126":0,"127":0,"131":0,"132":0,"136":0,"141":0,"142":0,"145":0,"148":0,"150":0,"153":0,"155":0,"179":0,"180":0,"181":0,"182":0,"186":0,"188":0,"189":0,"191":0,"192":0,"196":0,"197":0,"198":0,"199":0,"203":0,"208":0,"210":0,"211":0,"212":0,"213":0,"214":0,"216":0,"217":0,"219":0,"220":0,"222":0,"224":0,"228":0,"229":0,"230":0,"239":0,"240":0,"241":0,"243":0,"244":0,"247":0,"248":0,"251":0,"263":0,"265":0,"274":0,"275":0,"276":0,"277":0,"278":0,"279":0,"280":0,"281":0,"282":0,"283":0,"284":0,"285":0,"286":0,"289":0,"294":0,"295":0,"306":0,"315":0,"326":0,"328":0,"329":0,"375":0,"378":0,"379":0,"383":0,"387":0,"388":0,"390":0,"395":0,"399":0,"403":0,"404":0,"405":0,"406":0,"407":0,"408":0,"409":0,"410":0,"416":0,"421":0,"423":0,"425":0,"426":0,"427":0,"429":0,"431":0,"432":0,"433":0,"435":0,"436":0,"437":0,"441":0,"444":0,"445":0,"449":0,"452":0,"465":0,"466":0,"467":0,"468":0,"469":0,"470":0,"472":0,"476":0,"478":0,"480":0,"481":0,"483":0,"484":0,"495":0,"500":0,"501":0,"502":0,"506":0,"507":0,"509":0,"510":0,"526":0,"527":0,"528":0,"531":0,"532":0,"533":0,"534":0,"535":0,"536":0,"537":0,"538":0,"541":0,"544":0,"583":0,"584":0,"596":0,"597":0,"598":0,"600":0,"601":0,"602":0,"603":0,"604":0,"605":0,"606":0,"607":0,"608":0,"615":0,"627":0,"639":0,"640":0,"641":0,"642":0,"643":0,"644":0,"645":0,"646":0,"647":0,"648":0,"649":0,"655":0,"656":0,"658":0,"659":0,"660":0,"661":0,"663":0,"664":0,"665":0,"667":0,"668":0,"669":0,"670":0,"676":0,"677":0,"678":0,"679":0,"680":0,"684":0,"687":0,"688":0,"689":0,"690":0,"698":0,"699":0,"700":0,"701":0,"702":0,"703":0,"706":0,"709":0,"710":0,"711":0,"712":0,"714":0,"715":0,"716":0,"719":0,"720":0,"721":0,"722":0,"723":0,"725":0,"730":0,"731":0,"732":0,"733":0,"734":0,"736":0,"741":0,"742":0,"743":0,"745":0,"746":0,"748":0,"749":0,"754":0,"755":0,"756":0,"757":0,"758":0,"760":0,"771":0,"782":0,"785":0,"787":0,"788":0,"791":0,"792":0,"793":0,"794":0,"795":0,"796":0,"851":0,"861":0,"862":0,"863":0,"864":0,"867":0,"869":0,"870":0,"873":0,"874":0,"875":0,"876":0,"877":0,"881":0,"882":0,"884":0,"885":0,"889":0,"890":0,"891":0,"893":0,"894":0,"898":0,"909":0,"910":0,"911":0,"912":0,"913":0,"914":0,"916":0,"917":0,"919":0,"920":0,"922":0,"940":0,"941":0,"944":0,"963":0,"965":0,"966":0,"969":0,"970":0,"971":0,"972":0,"973":0,"975":0,"978":0,"981":0,"983":0,"984":0,"985":0,"986":0,"990":0,"991":0,"994":0,"995":0,"996":0,"998":0,"999":0,"1000":0,"1001":0,"1005":0,"1006":0,"1008":0,"1013":0,"1014":0,"1018":0,"1019":0,"1026":0,"1034":0,"1036":0,"1037":0,"1038":0,"1039":0,"1040":0,"1041":0,"1042":0,"1043":0,"1045":0,"1050":0,"1051":0,"1052":0,"1053":0,"1054":0,"1058":0,"1059":0,"1061":0,"1062":0,"1066":0,"1067":0,"1074":0,"1075":0,"1076":0,"1077":0,"1078":0,"1081":0,"1082":0,"1083":0,"1085":0,"1088":0,"1089":0,"1095":0,"1096":0,"1097":0,"1098":0,"1099":0,"1100":0,"1101":0,"1102":0,"1105":0,"1107":0,"1110":0,"1111":0,"1112":0,"1117":0,"1118":0,"1119":0,"1120":0,"1121":0,"1122":0,"1123":0,"1124":0,"1125":0,"1127":0,"1129":0,"1131":0,"1132":0,"1133":0,"1134":0,"1135":0,"1136":0,"1137":0,"1141":0,"1142":0,"1144":0,"1145":0,"1151":0,"1152":0,"1153":0,"1157":0,"1195":0,"1197":0,"1198":0,"1199":0,"1200":0,"1201":0,"1202":0,"1203":0,"1204":0,"1207":0,"1208":0,"1211":0,"1218":0,"1236":0,"1238":0,"1239":0,"1242":0,"1243":0,"1245":0,"1248":0,"1258":0,"1259":0,"1273":0,"1274":0,"1275":0,"1280":0,"1281":0,"1283":0,"1286":0,"1287":0,"1288":0,"1289":0,"1290":0,"1292":0,"1296":0,"1305":0,"1306":0,"1307":0,"1309":0,"1310":0,"1311":0,"1325":0,"1328":0,"1329":0,"1330":0,"1366":0,"1367":0,"1368":0,"1371":0,"1372":0,"1375":0,"1377":0,"1381":0,"1383":0,"1387":0,"1389":0,"1392":0,"1393":0,"1397":0,"1398":0,"1950":0,"1972":0,"2020":0,"2021":0,"2038":0,"2039":0,"2049":0,"2050":0,"2060":0,"2061":0,"2088":0,"2089":0,"2099":0,"2100":0,"2110":0,"2111":0,"2125":0,"2126":0,"2127":0,"2138":0,"2139":0,"2149":0,"2150":0,"2162":0,"2163":0,"2165":0,"2167":0,"2171":0,"2174":0,"2186":0,"2187":0,"2201":0,"2202":0,"2203":0,"2215":0,"2216":0,"2218":0,"2219":0,"2221":0,"2232":0,"2233":0,"2235":0,"2245":0,"2246":0,"2248":0,"2278":0,"2279":0,"2286":0,"2319":0,"2320":0,"2322":0,"2324":0,"2326":0,"2327":0,"2329":0,"2331":0,"2332":0,"2335":0,"2339":0,"2342":0,"2358":0,"2359":0,"2363":0,"2364":0,"2366":0,"2367":0,"2368":0,"2372":0,"2390":0,"2391":0,"2392":0,"2394":0,"2395":0,"2396":0,"2400":0,"2427":0,"2428":0,"2432":0,"2433":0,"2434":0,"2438":0,"2455":0,"2456":0,"2459":0,"2461":0,"2462":0,"2464":0,"2465":0,"2467":0,"2468":0,"2472":0,"2473":0,"2474":0,"2478":0,"2500":0,"2501":0,"2520":0,"2521":0,"2523":0,"2524":0,"2525":0,"2529":0,"2550":0,"2551":0,"2553":0,"2554":0,"2555":0,"2556":0,"2560":0,"2561":0,"2566":0,"2584":0,"2585":0,"2586":0,"2589":0,"2604":0,"2614":0,"2624":0,"2635":0,"2637":0,"2647":0,"2651":0,"2653":0,"2664":0,"2693":0,"2694":0,"2696":0,"2697":0,"2701":0,"2702":0,"2705":0,"2725":0,"2729":0,"2735":0,"2750":0,"2751":0,"2756":0,"2757":0,"2760":0,"2797":0,"2798":0,"2803":0,"2804":0,"2807":0,"2811":0,"2812":0,"2818":0,"2819":0,"2824":0,"2825":0,"2828":0,"2829":0,"2834":0,"2836":0,"2837":0,"2838":0,"2845":0,"2846":0,"2852":0,"2854":0,"2864":0,"2865":0,"2869":0,"2873":0,"2879":0,"2880":0,"2886":0,"2888":0,"2890":0,"2891":0,"2892":0,"2899":0,"2900":0,"2904":0,"2920":0,"2942":0,"2945":0,"2948":0,"2949":0,"2950":0,"3012":0,"3024":0,"3047":0,"3048":0,"3049":0,"3052":0,"3055":0,"3056":0,"3057":0,"3058":0,"3062":0,"3063":0,"3064":0,"3069":0,"3070":0,"3071":0,"3073":0,"3074":0,"3079":0,"3099":0,"3100":0,"3105":0,"3106":0,"3109":0,"3120":0,"3121":0,"3122":0,"3124":0,"3138":0,"3139":0,"3162":0,"3163":0,"3165":0,"3166":0,"3167":0,"3171":0,"3194":0,"3195":0,"3197":0,"3198":0,"3199":0,"3200":0,"3205":0,"3221":0,"3222":0,"3223":0,"3226":0,"3230":0,"3231":0,"3234":0,"3251":0,"3252":0,"3257":0,"3258":0,"3259":0,"3262":0,"3263":0,"3265":0,"3269":0,"3281":0,"3282":0,"3317":0,"3319":0,"3320":0,"3321":0,"3322":0,"3549":0,"3552":0,"3554":0,"3556":0,"3557":0,"3558":0,"3559":0,"3560":0,"3561":0,"3562":0,"3563":0,"3564":0,"3565":0,"3566":0,"3567":0,"3571":0,"3572":0,"3574":0,"3575":0,"3577":0,"3578":0,"3581":0,"3582":0,"3583":0,"3584":0,"3586":0,"3587":0,"3588":0,"3589":0,"3594":0,"3595":0,"3597":0,"3598":0,"3599":0,"3601":0,"3602":0,"3603":0,"3605":0,"3606":0,"3607":0,"3610":0,"3611":0,"3613":0,"3615":0,"3616":0,"3617":0,"3618":0,"3619":0,"3622":0,"3623":0,"3624":0,"3626":0,"3627":0,"3628":0,"3632":0,"3633":0,"3634":0,"3635":0,"3637":0,"3638":0,"3639":0,"3641":0,"3642":0,"3647":0,"3648":0,"3649":0,"3650":0,"3651":0,"3652":0,"3655":0,"3656":0,"3657":0,"3662":0,"3664":0,"3665":0,"3666":0,"3667":0,"3669":0,"3670":0,"3671":0,"3674":0,"3675":0,"3676":0,"3677":0,"3678":0,"3681":0,"3683":0,"3684":0,"3687":0,"3688":0,"3689":0,"3691":0,"3692":0,"3693":0,"3694":0,"3695":0,"3696":0,"3705":0,"3707":0,"3709":0,"3711":0,"3712":0,"3716":0,"3720":0,"3724":0,"3746":0,"3747":0,"3749":0,"3750":0,"3753":0,"3754":0,"3756":0,"3757":0,"3758":0,"3760":0,"3761":0,"3763":0,"3764":0,"3767":0,"3768":0,"3772":0,"3774":0,"3815":0,"3823":0,"3830":0,"3834":0,"3836":0,"3837":0,"3846":0,"3847":0,"3862":0,"3863":0,"3864":0,"3866":0,"3867":0,"3868":0,"3871":0,"3881":0,"3882":0,"3883":0,"3884":0,"3895":0,"3896":0,"3898":0,"3899":0,"3903":0,"3904":0,"3905":0,"3907":0,"3911":0,"3913":0,"3914":0,"3915":0,"3917":0,"3920":0,"3921":0,"3922":0,"3924":0,"3933":0,"3934":0,"3935":0,"3938":0,"3939":0,"3941":0,"3943":0,"3944":0,"3945":0,"3947":0,"3957":0,"3958":0,"3962":0,"3963":0,"3969":0,"3970":0,"3971":0,"3972":0,"3975":0,"3976":0,"3977":0,"3978":0,"3982":0,"3983":0,"3985":0,"3986":0,"3988":0,"3989":0,"3999":0,"4002":0,"4003":0,"4009":0,"4011":0,"4024":0,"4049":0,"4050":0,"4064":0,"4067":0,"4068":0,"4069":0,"4073":0,"4089":0,"4090":0,"4094":0,"4097":0,"4099":0,"4101":0,"4102":0,"4103":0,"4106":0,"4107":0,"4108":0,"4111":0,"4115":0,"4124":0,"4126":0,"4129":0,"4132":0,"4133":0,"4136":0,"4141":0,"4155":0,"4160":0,"4163":0,"4168":0,"4172":0,"4179":0,"4181":0,"4185":0,"4187":0,"4191":0,"4194":0,"4199":0,"4206":0,"4209":0,"4210":0,"4215":0,"4218":0,"4222":0,"4227":0,"4230":0,"4234":0,"4239":0,"4242":0,"4247":0,"4252":0,"4255":0,"4260":0,"4265":0,"4268":0,"4270":0,"4275":0,"4278":0,"4280":0,"4285":0,"4288":0,"4290":0,"4296":0,"4302":0,"4308":0,"4311":0,"4314":0,"4319":0,"4322":0,"4326":0,"4327":0,"4330":0,"4335":0,"4343":0,"4354":0,"4356":0,"4380":0,"4384":0,"4385":0,"4386":0,"4387":0,"4389":0,"4394":0,"4395":0,"4398":0,"4399":0,"4400":0,"4401":0,"4404":0,"4405":0,"4406":0,"4407":0,"4409":0,"4410":0,"4411":0,"4414":0,"4415":0,"4419":0,"4425":0,"4431":0,"4441":0,"4468":0,"4469":0,"4475":0,"4477":0,"4478":0,"4479":0,"4480":0,"4481":0,"4482":0,"4483":0,"4484":0,"4485":0,"4486":0,"4489":0,"4490":0,"4491":0,"4492":0,"4493":0,"4494":0,"4495":0,"4496":0,"4497":0,"4498":0,"4502":0,"4504":0,"4505":0,"4510":0,"4519":0,"4535":0,"4536":0,"4541":0,"4543":0,"4546":0,"4547":0,"4548":0,"4550":0,"4553":0,"4555":0,"4556":0,"4557":0,"4559":0,"4560":0,"4562":0,"4566":0,"4567":0,"4568":0,"4569":0,"4571":0,"4572":0,"4574":0,"4575":0,"4578":0,"4579":0,"4581":0,"4582":0,"4584":0,"4591":0,"4592":0,"4593":0,"4595":0,"4596":0,"4598":0,"4599":0,"4601":0,"4602":0,"4604":0,"4605":0,"4606":0,"4611":0,"4614":0,"4615":0,"4621":0,"4630":0,"4657":0,"4658":0,"4659":0,"4660":0,"4662":0,"4669":0,"4670":0,"4671":0,"4673":0,"4679":0,"4683":0,"4684":0,"4685":0,"4687":0,"4693":0,"4698":0,"4706":0,"4708":0,"4709":0,"4736":0,"4742":0,"4743":0,"4744":0,"4747":0,"4751":0,"4752":0,"4753":0,"4757":0,"4759":0,"4769":0,"4777":0,"4778":0,"4779":0,"4782":0,"4790":0,"4791":0,"4793":0,"4813":0,"4835":0,"4836":0,"4837":0,"4839":0,"4841":0,"4845":0,"4846":0,"4856":0,"4904":0,"4906":0,"4909":0,"4911":0,"4965":0,"5008":0,"5016":0,"5031":0,"5040":0,"5052":0,"5059":0,"5068":0,"5077":0,"5095":0,"5103":0,"5138":0,"5145":0,"5158":0,"5165":0,"5167":0,"5197":0,"5203":0,"5208":0,"5209":0,"5211":0,"5221":0,"5229":0,"5231":0,"5233":0,"5235":0,"5237":0,"5239":0,"5241":0,"5242":0,"5267":0,"5283":0,"5290":0,"5297":0,"5301":0,"5310":0,"5312":0,"5317":0,"5325":0,"5330":0,"5331":0,"5332":0,"5333":0,"5337":0,"5338":0,"5339":0,"5340":0,"5345":0,"5346":0,"5347":0,"5359":0,"5360":0,"5361":0,"5362":0,"5366":0,"5367":0,"5368":0,"5369":0,"5370":0,"5373":0,"5374":0,"5375":0,"5376":0,"5377":0,"5382":0,"5383":0,"5384":0,"5385":0,"5429":0,"5432":0,"5433":0,"5434":0,"5435":0,"5436":0,"5437":0,"5442":0,"5443":0,"5444":0,"5445":0,"5446":0,"5447":0,"5448":0,"5450":0,"5451":0,"5453":0,"5456":0,"5458":0,"5472":0,"5477":0,"5478":0,"5481":0,"5482":0,"5486":0,"5487":0,"5490":0,"5493":0,"5494":0,"5498":0,"5499":0,"5500":0,"5501":0,"5502":0,"5507":0,"5508":0,"5509":0,"5510":0,"5511":0,"5518":0,"5519":0,"5523":0,"5524":0,"5527":0,"5536":0,"5538":0,"5539":0,"5540":0,"5541":0,"5542":0,"5543":0,"5544":0,"5546":0,"5547":0,"5548":0,"5553":0,"5554":0,"5555":0,"5556":0,"5557":0,"5558":0,"5559":0,"5560":0,"5561":0,"5562":0,"5563":0,"5570":0,"5572":0,"5573":0,"5574":0,"5577":0,"5578":0,"5579":0,"5580":0,"5583":0,"5584":0,"5585":0,"5586":0,"5588":0,"5595":0,"5597":0,"5598":0,"5599":0,"5600":0,"5601":0,"5602":0,"5606":0,"5607":0,"5608":0,"5609":0,"5610":0,"5611":0,"5612":0,"5614":0,"5617":0,"5618":0,"5619":0,"5621":0,"5622":0,"5627":0,"5645":0,"5646":0,"5647":0,"5650":0,"5664":0,"5670":0,"5671":0,"5672":0,"5673":0,"5674":0,"5675":0,"5685":0,"5686":0,"5688":0,"5689":0,"5691":0,"5696":0,"5712":0,"5713":0,"5742":0,"5745":0,"5746":0,"5747":0,"5749":0,"5750":0,"5751":0,"5752":0,"5753":0,"5758":0,"5759":0,"5760":0,"5761":0,"5762":0,"5763":0,"5765":0,"5766":0,"5803":0,"5805":0,"5806":0,"5813":0,"5819":0,"5822":0,"5824":0,"5825":0,"5828":0,"5830":0,"5831":0,"5832":0,"5833":0,"5837":0,"5838":0,"5840":0,"5842":0,"5845":0,"5851":0,"5853":0,"5860":0,"5861":0,"5862":0,"5865":0,"5866":0,"5867":0,"5868":0,"5869":0,"5875":0,"5876":0,"5883":0,"5884":0,"5885":0,"5888":0,"5889":0,"5892":0,"5893":0,"5894":0,"5895":0,"5896":0,"5897":0,"5898":0,"5899":0,"5905":0,"5906":0,"5907":0,"5909":0,"5910":0,"5911":0,"5913":0,"5914":0,"5915":0,"5917":0,"5918":0,"5921":0,"5922":0,"5924":0,"5925":0,"5926":0,"5927":0,"5928":0,"5929":0,"5931":0,"5934":0,"5936":0,"5942":0,"5944":0,"5945":0,"5946":0,"5947":0,"5948":0,"5949":0,"5951":0,"5952":0,"5955":0,"5957":0,"5958":0,"5961":0,"5963":0,"5965":0,"5966":0,"5972":0,"5973":0,"5975":0,"5977":0,"5978":0,"5981":0,"5982":0,"5990":0,"5994":0,"5995":0,"5996":0,"6000":0,"6001":0,"6002":0,"6003":0,"6004":0,"6005":0,"6006":0,"6007":0,"6008":0,"6009":0,"6010":0,"6011":0,"6018":0,"6019":0,"6020":0,"6021":0,"6023":0,"6024":0,"6027":0,"6028":0,"6029":0,"6030":0,"6031":0,"6034":0,"6035":0,"6036":0,"6037":0,"6044":0,"6045":0,"6050":0,"6051":0,"6054":0,"6055":0,"6056":0,"6061":0,"6062":0,"6063":0,"6064":0,"6065":0,"6066":0,"6070":0,"6071":0,"6072":0,"6074":0,"6075":0,"6078":0,"6087":0,"6088":0,"6089":0,"6091":0,"6103":0,"6106":0,"6107":0,"6108":0,"6109":0,"6110":0,"6111":0,"6112":0,"6113":0,"6114":0,"6115":0,"6116":0,"6117":0,"6120":0,"6126":0,"6137":0,"6138":0,"6139":0,"6141":0,"6142":0,"6144":0,"6145":0,"6146":0,"6147":0,"6149":0,"6150":0,"6151":0,"6153":0,"6157":0,"6160":0,"6162":0,"6173":0,"6175":0,"6178":0,"6180":0,"6185":0,"6199":0,"6200":0,"6201":0,"6202":0,"6203":0,"6204":0,"6210":0,"6212":0,"6213":0,"6217":0,"6218":0,"6219":0,"6220":0,"6222":0,"6223":0,"6224":0,"6226":0,"6229":0,"6230":0,"6231":0,"6233":0,"6234":0,"6235":0,"6236":0,"6237":0,"6238":0,"6239":0,"6240":0,"6242":0,"6243":0,"6250":0,"6251":0,"6252":0,"6253":0,"6258":0,"6259":0,"6262":0,"6263":0,"6265":0,"6266":0,"6267":0,"6269":0,"6270":0,"6277":0,"6278":0,"6279":0,"6280":0,"6281":0,"6282":0,"6283":0,"6284":0,"6285":0,"6287":0,"6288":0,"6295":0,"6297":0,"6299":0,"6300":0,"6301":0,"6302":0,"6303":0,"6304":0,"6305":0,"6306":0,"6311":0,"6312":0,"6313":0,"6314":0,"6318":0,"6321":0,"6322":0,"6323":0,"6324":0,"6325":0,"6326":0,"6327":0,"6328":0,"6340":0,"6341":0,"6342":0,"6343":0,"6344":0,"6345":0,"6349":0,"6350":0,"6351":0,"6352":0,"6354":0,"6355":0,"6356":0,"6357":0,"6361":0,"6362":0,"6363":0,"6368":0,"6370":0,"6372":0,"6373":0,"6374":0,"6375":0,"6376":0,"6379":0,"6382":0,"6384":0,"6386":0,"6396":0,"6397":0,"6399":0,"6405":0,"6406":0,"6410":0,"6412":0,"6413":0,"6416":0,"6417":0,"6421":0,"6423":0,"6425":0,"6435":0,"6438":0,"6439":0,"6442":0,"6443":0,"6444":0,"6446":0,"6447":0,"6448":0,"6452":0,"6453":0,"6457":0,"6468":0,"6470":0,"6471":0,"6474":0,"6475":0,"6478":0,"6480":0,"6481":0,"6483":0,"6485":0,"6486":0,"6499":0,"6503":0,"6505":0,"6507":0,"6515":0,"6516":0,"6518":0,"6519":0,"6522":0,"6523":0,"6526":0,"6528":0,"6529":0,"6530":0,"6531":0,"6535":0,"6546":0,"6549":0,"6550":0,"6551":0,"6552":0,"6556":0,"6560":0,"6563":0,"6564":0,"6573":0,"6576":0,"6577":0,"6581":0,"6582":0,"6586":0,"6587":0,"6588":0,"6593":0,"6594":0,"6595":0,"6596":0,"6601":0,"6603":0,"6614":0,"6625":0,"6629":0,"6631":0,"6632":0,"6634":0,"6635":0,"6636":0,"6637":0,"6638":0,"6639":0,"6640":0,"6642":0,"6643":0,"6644":0,"6645":0,"6648":0,"6649":0,"6664":0,"6674":0,"6675":0,"6678":0,"6684":0,"6685":0,"6686":0,"6687":0,"6691":0,"6692":0,"6695":0,"6698":0,"6699":0,"6705":0,"6706":0,"6707":0,"6708":0,"6711":0,"6712":0,"6713":0,"6715":0,"6719":0,"6720":0,"6721":0,"6725":0,"6740":0,"6742":0,"6745":0,"6746":0,"6747":0,"6749":0,"6752":0,"6754":0,"6755":0,"6758":0,"6759":0,"6760":0,"6761":0,"6762":0,"6769":0,"6780":0,"6782":0,"6783":0,"6784":0,"6790":0,"6798":0,"6802":0,"6803":0,"6804":0,"6808":0,"6810":0,"6811":0,"6812":0,"6813":0,"6814":0,"6816":0,"6821":0,"6822":0,"6823":0,"6824":0,"6825":0,"6833":0,"6841":0,"6842":0,"6843":0,"6855":0,"6857":0,"6858":0,"6861":0,"6864":0,"6865":0,"6872":0,"6882":0,"6883":0,"6884":0,"6900":0,"6907":0,"6909":0,"6910":0,"6913":0,"6917":0,"6921":0,"6922":0,"6924":0,"6927":0,"6931":0,"6935":0,"6938":0,"6940":0,"6945":0,"6946":0,"6949":0,"6955":0,"6956":0,"6961":0,"6977":0,"6978":0,"6984":0,"6988":0,"6991":0,"6993":0,"6995":0,"6996":0,"6998":0,"6999":0,"7004":0,"7005":0,"7006":0,"7008":0,"7009":0,"7010":0,"7011":0,"7013":0,"7015":0,"7019":0,"7020":0,"7021":0,"7025":0,"7026":0,"7027":0,"7028":0,"7029":0,"7030":0,"7035":0,"7037":0,"7038":0,"7039":0,"7042":0,"7046":0,"7047":0,"7055":0,"7058":0,"7061":0,"7062":0,"7063":0,"7066":0,"7067":0,"7068":0,"7073":0,"7074":0,"7084":0,"7087":0,"7090":0,"7091":0,"7092":0,"7095":0,"7096":0,"7097":0,"7108":0,"7109":0,"7110":0,"7123":0,"7124":0,"7125":0,"7126":0,"7127":0,"7129":0,"7144":0,"7157":0,"7162":0,"7163":0,"7164":0,"7167":0,"7168":0,"7169":0,"7171":0,"7172":0,"7175":0,"7188":0,"7211":0,"7219":0,"7220":0,"7223":0,"7224":0,"7226":0,"7228":0,"7230":0,"7231":0,"7234":0,"7235":0,"7238":0,"7241":0,"7242":0,"7246":0,"7247":0,"7250":0,"7251":0,"7257":0,"7260":0,"7262":0,"7264":0,"7266":0,"7267":0,"7268":0,"7269":0,"7270":0,"7271":0,"7273":0,"7276":0,"7277":0,"7279":0,"7280":0,"7281":0,"7284":0,"7285":0,"7287":0,"7288":0,"7290":0,"7293":0,"7294":0,"7298":0,"7299":0,"7302":0,"7303":0,"7304":0,"7305":0,"7306":0,"7307":0,"7309":0,"7310":0,"7311":0,"7312":0,"7314":0,"7317":0,"7318":0,"7319":0,"7320":0,"7321":0,"7322":0,"7323":0,"7324":0,"7327":0,"7329":0,"7339":0,"7340":0,"7341":0,"7342":0,"7343":0,"7344":0,"7345":0,"7346":0,"7347":0,"7348":0,"7349":0,"7350":0,"7351":0,"7354":0,"7355":0,"7356":0,"7357":0,"7358":0,"7359":0,"7361":0,"7362":0,"7363":0,"7364":0,"7365":0,"7366":0,"7367":0,"7371":0,"7372":0,"7373":0,"7376":0,"7379":0,"7384":0,"7386":0,"7409":0,"7410":0,"7412":0,"7415":0,"7417":0,"7418":0,"7421":0,"7428":0,"7447":0,"7448":0,"7452":0,"7453":0,"7454":0,"7455":0,"7456":0,"7458":0,"7459":0,"7466":0,"7467":0,"7470":0,"7471":0,"7473":0,"7474":0,"7475":0,"7476":0,"7479":0,"7480":0,"7483":0,"7486":0,"7487":0,"7491":0,"7492":0,"7493":0,"7497":0,"7498":0,"7499":0,"7500":0,"7501":0,"7506":0,"7508":0,"7509":0,"7512":0,"7519":0,"7520":0,"7527":0,"7536":0,"7639":0,"7642":0,"7643":0,"7646":0,"7804":0,"8533":0,"8620":0,"8627":0,"8629":0,"8633":0,"8635":0,"8639":0,"8642":0,"8764":0,"8765":0,"8938":0,"8942":0,"8954":0,"8958":0,"8967":0,"8972":0,"8984":0,"8989":0,"8998":0,"9000":0,"9012":0,"9014":0,"9081":0,"9083":0,"9619":0,"9622":0,"9784":0,"9788":0,"9789":0,"9792":0,"10000":0,"10006":0};
_yuitest_coverage["/build/yui-nodejs/yui-nodejs.js"].functions = {"instanceOf:59":0,"YUI:54":0,"add:178":0,"remove:185":0,"handleLoad:195":0,"getLoader:202":0,"clobber:227":0,"applyConfig:261":0,"_config:305":0,"parseBasePath:374":0,"(anonymous 2):398":0,"_init:314":0,"_setup:494":0,"applyTo:525":0,"add:582":0,"_attach:626":0,"(anonymous 5):794":0,"(anonymous 4):793":0,"(anonymous 3):791":0,"_delayCallback:780":0,"(anonymous 6):893":0,"use:850":0,"_notify:908":0,"process:961":0,"(anonymous 7):1052":0,"handleLoader:1025":0,"handleBoot:1131":0,"_use:938":0,"namespace:1194":0,"dump:1218":0,"error:1233":0,"guid:1257":0,"stamp:1272":0,"destroy:1304":0,"applyConfig:1366":0,"(anonymous 1):153":0,"_isNative:2020":0,"isArray:2038":0,"isBoolean:2049":0,"isDate:2060":0,"isFunction:2088":0,"isNull:2099":0,"isNumber:2110":0,"isObject:2125":0,"isString:2138":0,"isUndefined:2149":0,"isValue:2162":0,"(anonymous 9):2186":0,"(anonymous 10):2202":0,"sub:2201":0,"(anonymous 11):2215":0,"}:2217":0,"(anonymous 12):2232":0,"}:2234":0,"(anonymous 13):2245":0,"}:2247":0,"type:2278":0,"YArray:2319":0,"dedupe:2358":0,"(anonymous 14):2390":0,"}:2393":0,"hash:2427":0,"(anonymous 15):2455":0,"}:2457":0,"numericSort:2500":0,"(anonymous 16):2520":0,"}:2522":0,"test:2550":0,"Queue:2584":0,"_init:2596":0,"next:2613":0,"last:2623":0,"add:2634":0,"size:2646":0,"(anonymous 17):2696":0,"cached:2693":0,"getLocation:2725":0,"merge:2750":0,"mix:2797":0,"(anonymous 18):2936":0,"F:2945":0,"(anonymous 20):2948":0,"(anonymous 19):2943":0,"owns:3011":0,"keys:3047":0,"values:3099":0,"size:3120":0,"hasValue:3138":0,"each:3162":0,"some:3194":0,"getValue:3221":0,"setValue:3251":0,"isEmpty:3281":0,"(anonymous 22):3321":0,"numberify:3319":0,"parseUA:3317":0,"compareVersions:3746":0,"(anonymous 8):1950":0,"escapeWinPath:3846":0,"_exec:3862":0,"(anonymous 24):3903":0,"(anonymous 25):3920":0,"_include:3895":0,"end:3933":0,"pass:3937":0,"fail:3942":0,"check:3961":0,"(anonymous 26):3976":0,"js:3957":0,"css:4002":0,"(anonymous 23):3815":0,"add:4048":0,"(anonymous 28):4068":0,"all:4063":0,"test:4088":0,"\"test\":4128":0,"\"test\":4143":0,"\"test\":4162":0,"test:4180":0,"test:4186":0,"\"test\":4170":0,"\"test\":4208":0,"\"test\":4217":0,"\"test\":4229":0,"\"test\":4241":0,"\"test\":4254":0,"\"test\":4267":0,"\"test\":4277":0,"\"test\":4287":0,"\"test\":4310":0,"\"test\":4321":0,"(anonymous 27):4009":0,"scan:4384":0,"lookupBestLang:4378":0,"(anonymous 29):4343":0,"log:4468":0,"message:4535":0,"(anonymous 30):4431":0,"consoleColor:4555":0,"logFn:4566":0,"(anonymous 31):4541":0,"wrapper:4664":0,"cancel:4682":0,"later:4657":0,"(anonymous 32):4621":0,"yui2Update:4734":0,"galleryUpdate:4746":0,"configFn:4776":0,"(anonymous 34):4708":0,"_path:4834":0,"Loader:4904":0,"_populateCache:5324":0,"_resetModules:5358":0,"_inspectPage:5428":0,"_requires:5470":0,"(anonymous 35):5618":0,"_config:5535":0,"formatSkin:5644":0,"_addSkin:5663":0,"addAlias:5711":0,"addGroup:5741":0,"addModule:5802":0,"require:6086":0,"_explodeRollups:6102":0,"filterRequires:6136":0,"(anonymous 36):6301":0,"getRequires:6171":0,"isCSSLoaded:6394":0,"(anonymous 37):6447":0,"getProvides:6434":0,"calculate:6467":0,"_addLangPack:6498":0,"_setup:6545":0,"getLangPackName:6613":0,"_explode:6623":0,"_patternTest:6663":0,"getModule:6672":0,"_reduce:6738":0,"_finish:6778":0,"_onSuccess:6797":0,"_onProgress:6840":0,"_onFailure:6854":0,"_onTimeout:6881":0,"_sort:6897":0,"complete:7004":0,"onProgress:7054":0,"onTimeout:7057":0,"onSuccess:7060":0,"onFailure:7065":0,"onProgress:7083":0,"onTimeout:7086":0,"onSuccess:7089":0,"onFailure:7094":0,"_insert:6973":0,"_continue:7107":0,"(anonymous 38):7126":0,"insert:7122":0,"loadNext:7143":0,"_filter:7156":0,"_url:7187":0,"addSingle:7228":0,"resolve:7209":0,"onEnd:7417":0,"load:7408":0,"(anonymous 33):4698":0,"_rollup:7447":0,"(anonymous 39):7428":0,"\"test\":7638":0,"\"test\":7792":0,"\"test\":8532":0,"test:8628":0,"test:8634":0,"\"test\":8618":0,"\"test\":8763":0,"\"test\":8937":0,"\"test\":8953":0,"\"test\":8966":0,"\"test\":8983":0,"\"test\":8997":0,"\"test\":9011":0,"\"test\":9080":0,"\"test\":9618":0,"\"test\":9783":0,"(anonymous 40):7527":0};
_yuitest_coverage["/build/yui-nodejs/yui-nodejs.js"].coveredLines = 2043;
_yuitest_coverage["/build/yui-nodejs/yui-nodejs.js"].coveredFunctions = 224;
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 10);
if (typeof YUI != 'undefined') {
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 11);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 54);
var YUI = function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "YUI", 54);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 55);
var i = 0,
            Y = this,
            args = arguments,
            l = args.length,
            instanceOf = function(o, type) {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "instanceOf", 59);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 60);
return (o && o.hasOwnProperty && (o instanceof type));
            },
            gconf = (typeof YUI_config !== 'undefined') && YUI_config;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 64);
if (!(instanceOf(Y, YUI))) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 65);
Y = new YUI();
        } else {
            // set up the core environment
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 68);
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
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 96);
if (YUI.GlobalConfig) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 97);
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
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 126);
if (gconf) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 127);
Y.applyConfig(gconf);
            }

            // bind the specified additional modules for this instance
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 131);
if (!l) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 132);
Y._setup();
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 136);
if (l) {
            // Each instance can accept one or more configuration objects.
            // These are applied after YUI.GlobalConfig and YUI_Config,
            // overriding values set in those config files if there is a '
            // matching property.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 141);
for (; i < l; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 142);
Y.applyConfig(args[i]);
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 145);
Y._setup();
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 148);
Y.instanceOf = instanceOf;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 150);
return Y;
    };

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 153);
(function() {

    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 1)", 153);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 155);
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
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "add", 178);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 179);
if (el && el.addEventListener) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 180);
el.addEventListener(type, fn, capture);
            } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 181);
if (el && el.attachEvent) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 182);
el.attachEvent('on' + type, fn);
            }}
        },
        remove = function(el, type, fn, capture) {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "remove", 185);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 186);
if (el && el.removeEventListener) {
                // this can throw an uncaught exception in FF
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 188);
try {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 189);
el.removeEventListener(type, fn, capture);
                } catch (ex) {}
            } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 191);
if (el && el.detachEvent) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 192);
el.detachEvent('on' + type, fn);
            }}
        },
        handleLoad = function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "handleLoad", 195);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 196);
YUI.Env.windowLoaded = true;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 197);
YUI.Env.DOMReady = true;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 198);
if (hasWin) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 199);
remove(window, 'load', handleLoad);
            }
        },
        getLoader = function(Y, o) {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "getLoader", 202);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 203);
var loader = Y.Env._loader,
                lCore = [ 'loader-base' ],
                G_ENV = YUI.Env,
                mods = G_ENV.mods;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 208);
if (loader) {
                //loader._config(Y.config);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 210);
loader.ignoreRegistered = false;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 211);
loader.onEnd = null;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 212);
loader.data = null;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 213);
loader.required = [];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 214);
loader.loadType = null;
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 216);
loader = new Y.Loader(Y.config);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 217);
Y.Env._loader = loader;
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 219);
if (mods && mods.loader) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 220);
lCore = [].concat(lCore, YUI.Env.loaderExtras);
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 222);
YUI.Env.core = Y.Array.dedupe([].concat(YUI.Env.core, lCore));

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 224);
return loader;
        },

        clobber = function(r, s) {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "clobber", 227);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 228);
for (var i in s) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 229);
if (s.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 230);
r[i] = s[i];
                }
            }
        },

        ALREADY_DONE = { success: true };

//  Stamp the documentElement (HTML) with a class of "yui-loaded" to
//  enable styles that need to key off of JS being enabled.
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 239);
if (docEl && docClass.indexOf(DOC_LABEL) == -1) {
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 240);
if (docClass) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 241);
docClass += ' ';
    }
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 243);
docClass += DOC_LABEL;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 244);
docEl.className = docClass;
}

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 247);
if (VERSION.indexOf('@') > -1) {
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 248);
VERSION = '3.5.0'; // dev time hack for cdn test
}

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 251);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "applyConfig", 261);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 263);
o = o || NOOP;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 265);
var attr,
            name,
            // detail,
            config = this.config,
            mods = config.modules,
            groups = config.groups,
            aliases = config.aliases,
            loader = this.Env._loader;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 274);
for (name in o) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 275);
if (o.hasOwnProperty(name)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 276);
attr = o[name];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 277);
if (mods && name == 'modules') {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 278);
clobber(mods, attr);
                } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 279);
if (aliases && name == 'aliases') {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 280);
clobber(aliases, attr);
                } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 281);
if (groups && name == 'groups') {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 282);
clobber(groups, attr);
                } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 283);
if (name == 'win') {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 284);
config[name] = (attr && attr.contentWindow) || attr;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 285);
config.doc = config[name] ? config[name].document : null;
                } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 286);
if (name == '_yuid') {
                    // preserve the guid
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 289);
config[name] = attr;
                }}}}}
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 294);
if (loader) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 295);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_config", 305);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 306);
this.applyConfig(o);
    },

    /**
     * Initialize this YUI instance
     * @private
     * @method _init
     */
    _init: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_init", 314);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 315);
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
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 326);
Y.version = VERSION;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 328);
if (!Env) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 329);
Y.Env = {
                core: ['get','features','intl-base','yui-log', 'yui-log-nodejs', 'yui-later','loader-base', 'loader-rollup', 'loader-yui3'],
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
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "parseBasePath", 374);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 375);
var match = src.match(pattern),
                        path, filter;

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 378);
if (match) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 379);
path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));

                        // this is to set up the path to the loader.  The file
                        // filter for loader should match the yui include.
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 383);
filter = match[3];

                        // extract correct path for mixed combo urls
                        // http://yuilibrary.com/projects/yui3/ticket/2528423
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 387);
if (match[1]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 388);
path += '?' + match[1];
                        }
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 390);
path = {
                            filter: filter,
                            path: path
                        }
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 395);
return path;
                },
                getBase: G_ENV && G_ENV.getBase ||
                        function(pattern) {
                            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 2)", 398);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 399);
var nodes = (doc && doc.getElementsByTagName('script')) || [],
                                path = Env.cdn, parsed,
                                i, len, src;

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 403);
for (i = 0, len = nodes.length; i < len; ++i) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 404);
src = nodes[i].src;
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 405);
if (src) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 406);
parsed = Y.Env.parseBasePath(src, pattern);
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 407);
if (parsed) {
                                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 408);
filter = parsed.filter;
                                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 409);
path = parsed.path;
                                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 410);
break;
                                    }
                                }
                            }

                            // use CDN default
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 416);
return path;
                        }

            };

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 421);
Env = Y.Env;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 423);
Env._loaded[VERSION] = {};

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 425);
if (G_ENV && Y !== YUI) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 426);
Env._yidx = ++G_ENV._yidx;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 427);
Env._guidp = ('yui_' + VERSION + '_' +
                             Env._yidx + '_' + time).replace(/\./g, '_').replace(/-/g, '_');
            } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 429);
if (YUI._YUI) {

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 431);
G_ENV = YUI._YUI.Env;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 432);
Env._yidx += G_ENV._yidx;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 433);
Env._uidx += G_ENV._uidx;

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 435);
for (prop in G_ENV) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 436);
if (!(prop in Env)) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 437);
Env[prop] = G_ENV[prop];
                    }
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 441);
delete YUI._YUI;
            }}

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 444);
Y.id = Y.stamp(Y);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 445);
instances[Y.id] = Y;

        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 449);
Y.constructor = YUI;

        // configuration defaults
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 452);
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
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 465);
if (doc && !doc.getElementById(CSS_STAMP_EL)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 466);
el = doc.createElement('div');
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 467);
el.innerHTML = '<div id="' + CSS_STAMP_EL + '" style="position: absolute !important; visibility: hidden !important"></div>';
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 468);
YUI.Env.cssStampEl = el.firstChild;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 469);
if (doc.body) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 470);
doc.body.appendChild(YUI.Env.cssStampEl);
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 472);
docEl.insertBefore(YUI.Env.cssStampEl, docEl.firstChild);
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 476);
Y.config.lang = Y.config.lang || 'en-US';

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 478);
Y.config.base = YUI.config.base || Y.Env.getBase(Y.Env._BASE_RE);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 480);
if (!filter || (!('mindebug').indexOf(filter))) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 481);
filter = 'min';
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 483);
filter = (filter) ? '-' + filter : filter;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 484);
Y.config.loaderPath = YUI.config.loaderPath || 'loader/loader' + filter + '.js';

    },

    /**
     * Finishes the instance setup. Attaches whatever modules were defined
     * when the yui modules was registered.
     * @method _setup
     * @private
     */
    _setup: function(o) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_setup", 494);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 495);
var i, Y = this,
            core = [],
            mods = YUI.Env.mods,
            extras = Y.config.core || [].concat(YUI.Env.core); //Clone it..

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 500);
for (i = 0; i < extras.length; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 501);
if (mods[extras[i]]) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 502);
core.push(extras[i]);
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 506);
Y._attach(['yui-base']);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 507);
Y._attach(core);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 509);
if (Y.Loader) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 510);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "applyTo", 525);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 526);
if (!(method in APPLY_TO_AUTH)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 527);
this.log(method + ': applyTo not allowed', 'warn', 'yui');
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 528);
return null;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 531);
var instance = instances[id], nest, m, i;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 532);
if (instance) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 533);
nest = method.split('.');
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 534);
m = instance;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 535);
for (i = 0; i < nest.length; i = i + 1) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 536);
m = m[nest[i]];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 537);
if (!m) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 538);
this.log('applyTo not found: ' + method, 'warn', 'yui');
                }
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 541);
return m && m.apply(instance, args);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 544);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "add", 582);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 583);
details = details || {};
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 584);
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

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 596);
env.mods[name] = mod;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 597);
versions[version] = versions[version] || {};
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 598);
versions[version][name] = mod;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 600);
for (i in instances) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 601);
if (instances.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 602);
inst = instances[i];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 603);
if (!applied[inst.id]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 604);
applied[inst.id] = true;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 605);
loader = inst.Env._loader;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 606);
if (loader) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 607);
if (!loader.moduleInfo[name] || loader.moduleInfo[name].temp) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 608);
loader.addModule(details, name);
                        }
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 615);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_attach", 626);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 627);
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
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 639);
for (i = 0; i < len; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 640);
name = r[i];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 641);
mod = mods[name];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 642);
c.push(name);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 643);
if (loader && loader.conditions[name]) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 644);
for (j in loader.conditions[name]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 645);
if (loader.conditions[name].hasOwnProperty(j)) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 646);
def = loader.conditions[name][j];
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 647);
go = def && ((def.ua && Y.UA[def.ua]) || (def.test && def.test(Y)));
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 648);
if (go) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 649);
c.push(def.name);
                        }
                    }
                }
            }
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 655);
r = c;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 656);
len = r.length;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 658);
for (i = 0; i < len; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 659);
if (!done[r[i]]) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 660);
name = r[i];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 661);
mod = mods[name];

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 663);
if (aliases && aliases[name] && !mod) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 664);
Y._attach(aliases[name]);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 665);
continue;
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 667);
if (!mod) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 668);
if (loader && loader.moduleInfo[name]) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 669);
mod = loader.moduleInfo[name];
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 670);
moot = true;
                    }


                    //if (!loader || !loader.moduleInfo[name]) {
                    //if ((!loader || !loader.moduleInfo[name]) && !moot) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 676);
if (!moot && name) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 677);
if ((name.indexOf('skin-') === -1) && (name.indexOf('css') === -1)) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 678);
Y.Env._missed.push(name);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 679);
Y.Env._missed = Y.Array.dedupe(Y.Env._missed);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 680);
Y.message('NOT loaded: ' + name, 'warn', 'yui');
                        }
                    }
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 684);
done[name] = true;
                    //Don't like this, but in case a mod was asked for once, then we fetch it
                    //We need to remove it from the missed list ^davglass
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 687);
for (j = 0; j < Y.Env._missed.length; j++) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 688);
if (Y.Env._missed[j] === name) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 689);
Y.message('Found: ' + name + ' (was reported as missing earlier)', 'warn', 'yui');
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 690);
Y.Env._missed.splice(j, 1);
                        }
                    }
                    /*
                        If it's a temp module, we need to redo it's requirements if it's already loaded
                        since it may have been loaded by another instance and it's dependencies might
                        have been redefined inside the fetched file.
                    */
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 698);
if (loader && cache && cache[name] && cache[name].temp) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 699);
loader.getRequires(cache[name]);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 700);
req = [];
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 701);
for (j in loader.moduleInfo[name].expanded_map) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 702);
if (loader.moduleInfo[name].expanded_map.hasOwnProperty(j)) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 703);
req.push(j);
                            }
                        }
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 706);
Y._attach(req);
                    }
                    
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 709);
details = mod.details;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 710);
req = details.requires;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 711);
use = details.use;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 712);
after = details.after;
                    //Force Intl load if there is a language (Loader logic) @todo fix this shit
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 714);
if (details.lang) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 715);
req = req || [];
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 716);
req.unshift('intl');
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 719);
if (req) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 720);
for (j = 0; j < req.length; j++) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 721);
if (!done[req[j]]) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 722);
if (!Y._attach(req)) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 723);
return false;
                                }
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 725);
break;
                            }
                        }
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 730);
if (after) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 731);
for (j = 0; j < after.length; j++) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 732);
if (!done[after[j]]) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 733);
if (!Y._attach(after, true)) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 734);
return false;
                                }
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 736);
break;
                            }
                        }
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 741);
if (mod.fn) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 742);
if (Y.config.throwFail) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 743);
mod.fn(Y, name);
                            } else {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 745);
try {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 746);
mod.fn(Y, name);
                                } catch (e) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 748);
Y.error('Attach error: ' + name, e, name);
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 749);
return false;
                            }
                        }
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 754);
if (use) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 755);
for (j = 0; j < use.length; j++) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 756);
if (!done[use[j]]) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 757);
if (!Y._attach(use)) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 758);
return false;
                                }
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 760);
break;
                            }
                        }
                    }



                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 771);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_delayCallback", 780);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 782);
var Y = this,
            mod = ['event-base'];

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 785);
until = (Y.Lang.isObject(until) ? until : { event: until });

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 787);
if (until.event === 'load') {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 788);
mod.push('event-synthetic');
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 791);
return function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 3)", 791);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 792);
var args = arguments;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 793);
Y._use(mod, function() {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 4)", 793);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 794);
Y.on(until.event, function() {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 5)", 794);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 795);
args[1].delayUntil = until.event;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 796);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "use", 850);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 851);
var args = SLICE.call(arguments, 0),
            callback = args[args.length - 1],
            Y = this,
            i = 0,
            a = [],
            name,
            Env = Y.Env,
            provisioned = true;

        // The last argument supplied to use can be a load complete callback
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 861);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 862);
args.pop();
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 863);
if (Y.config.delayUntil) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 864);
callback = Y._delayCallback(callback, Y.config.delayUntil);
            }
        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 867);
callback = null;
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 869);
if (Y.Lang.isArray(args[0])) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 870);
args = args[0];
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 873);
if (Y.config.cacheUse) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 874);
while ((name = args[i++])) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 875);
if (!Env._attached[name]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 876);
provisioned = false;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 877);
break;
                }
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 881);
if (provisioned) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 882);
if (args.length) {
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 884);
Y._notify(callback, ALREADY_DONE, args);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 885);
return Y;
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 889);
if (Y._loading) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 890);
Y._useQueue = Y._useQueue || new Y.Queue();
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 891);
Y._useQueue.add([args, callback]);
        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 893);
Y._use(args, function(Y, response) {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 6)", 893);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 894);
Y._notify(callback, response, args);
            });
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 898);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_notify", 908);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 909);
if (!response.success && this.config.loadErrorFn) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 910);
this.config.loadErrorFn.call(this, this, callback, response, args);
        } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 911);
if (callback) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 912);
if (this.Env._missed && this.Env._missed.length) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 913);
response.msg = 'Missing modules: ' + this.Env._missed.join();
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 914);
response.success = false;
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 916);
if (this.config.throwFail) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 917);
callback(this, response);
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 919);
try {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 920);
callback(this, response);
                } catch (e) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 922);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_use", 938);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 940);
if (!this.Array) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 941);
this._attach(['yui-base']);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 944);
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

                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "process", 961);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 963);
var i = 0, a = [], name, len, m, req, use;

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 965);
if (!names.length) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 966);
return;
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 969);
if (aliases) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 970);
len = names.length;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 971);
for (i = 0; i < len; i++) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 972);
if (aliases[names[i]] && !mods[names[i]]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 973);
a = [].concat(a, aliases[names[i]]);
                        } else {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 975);
a.push(names[i]);
                        }
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 978);
names = a;
                }
                
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 981);
len = names.length;
                
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 983);
for (i = 0; i < len; i++) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 984);
name = names[i];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 985);
if (!skip) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 986);
r.push(name);
                    }

                    // only attach a module once
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 990);
if (used[name]) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 991);
continue;
                    }
                    
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 994);
m = mods[name];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 995);
req = null;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 996);
use = null;

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 998);
if (m) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 999);
used[name] = true;
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1000);
req = m.details.requires;
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1001);
use = m.details.use;
                    } else {
                        // CSS files don't register themselves, see if it has
                        // been loaded
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1005);
if (!G_ENV._loaded[VERSION][name]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1006);
missing.push(name);
                        } else {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1008);
used[name] = true; // probably css
                        }
                    }

                    // make sure requirements are attached
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1013);
if (req && req.length) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1014);
process(req);
                    }

                    // make sure we grab the submodule dependencies too
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1018);
if (use && use.length) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1019);
process(use, 1);
                    }
                }

            },

            handleLoader = function(fromLoader) {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "handleLoader", 1025);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1026);
var response = fromLoader || {
                        success: true,
                        msg: 'not dynamic'
                    },
                    redo, origMissing,
                    ret = true,
                    data = response.data;

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1034);
Y._loading = false;

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1036);
if (data) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1037);
origMissing = missing;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1038);
missing = [];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1039);
r = [];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1040);
process(data);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1041);
redo = missing.length;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1042);
if (redo) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1043);
if ([].concat(missing).sort().join() ==
                                origMissing.sort().join()) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1045);
redo = false;
                        }
                    }
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1050);
if (redo && data) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1051);
Y._loading = true;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1052);
Y._use(missing, function() {
                        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 7)", 1052);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1053);
if (Y._attach(data)) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1054);
Y._notify(callback, response, data);
                        }
                    });
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1058);
if (data) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1059);
ret = Y._attach(data);
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1061);
if (ret) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1062);
Y._notify(callback, response, args);
                    }
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1066);
if (Y._useQueue && Y._useQueue.size() && !Y._loading) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1067);
Y._use.apply(Y, Y._useQueue.next());
                }

            };


        // YUI().use('*'); // bind everything available
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1074);
if (firstArg === '*') {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1075);
args = [];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1076);
for (i in mods) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1077);
if (mods.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1078);
args.push(i);
                }
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1081);
ret = Y._attach(args);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1082);
if (ret) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1083);
handleLoader();
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1085);
return Y;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1088);
if ((mods.loader || mods['loader-base']) && !Y.Loader) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1089);
Y._attach(['loader' + ((!mods.loader) ? '-base' : '')]);
        }


        // use loader to expand dependencies and sort the
        // requirements if it is available.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1095);
if (boot && Y.Loader && args.length) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1096);
loader = getLoader(Y);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1097);
loader.require(args);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1098);
loader.ignoreRegistered = true;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1099);
loader._boot = true;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1100);
loader.calculate(null, (fetchCSS) ? null : 'js');
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1101);
args = loader.sorted;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1102);
loader._boot = false;
        }
        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1105);
process(args);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1107);
len = missing.length;


        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1110);
if (len) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1111);
missing = YArray.dedupe(missing);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1112);
len = missing.length;
        }


        // dynamic load
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1117);
if (boot && len && Y.Loader) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1118);
Y._loading = true;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1119);
loader = getLoader(Y);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1120);
loader.onEnd = handleLoader;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1121);
loader.context = Y;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1122);
loader.data = args;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1123);
loader.ignoreRegistered = false;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1124);
loader.require(args);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1125);
loader.insert(null, (fetchCSS) ? null : 'js');

        } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1127);
if (boot && len && Y.Get && !Env.bootstrapped) {

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1129);
Y._loading = true;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1131);
handleBoot = function() {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "handleBoot", 1131);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1132);
Y._loading = false;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1133);
queue.running = false;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1134);
Env.bootstrapped = true;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1135);
G_ENV._bootstrapping = false;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1136);
if (Y._attach(['loader'])) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1137);
Y._use(args, callback);
                }
            };

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1141);
if (G_ENV._bootstrapping) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1142);
queue.add(handleBoot);
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1144);
G_ENV._bootstrapping = true;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1145);
Y.Get.script(config.base + config.loaderPath, {
                    onEnd: handleBoot
                });
            }

        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1151);
ret = Y._attach(args);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1152);
if (ret) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1153);
handleLoader();
            }
        }}

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1157);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "namespace", 1194);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1195);
var a = arguments, o, i = 0, j, d, arg;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1197);
for (; i < a.length; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1198);
o = this; //Reset base object per argument or it will get reused from the last
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1199);
arg = a[i];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1200);
if (arg.indexOf(PERIOD) > -1) { //Skip this if no "." is present
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1201);
d = arg.split(PERIOD);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1202);
for (j = (d[0] == 'YAHOO') ? 1 : 0; j < d.length; j++) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1203);
o[d[j]] = o[d[j]] || {};
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1204);
o = o[d[j]];
                }
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1207);
o[arg] = o[arg] || {};
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1208);
o = o[arg]; //Reset base object to the new object so it's returned
            }
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1211);
return o;
    },

    // this is replaced if the log module is included
    log: NOOP,
    message: NOOP,
    // this is replaced if the dump module is included
    dump: function (o) { _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "dump", 1218);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1218);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "error", 1233);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1236);
var Y = this, ret;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1238);
if (Y.config.errorFn) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1239);
ret = Y.config.errorFn.apply(Y, arguments);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1242);
if (!ret) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1243);
throw (e || new Error(msg));
        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1245);
Y.message(msg, 'error', ''+src); // don't scrub this one
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1248);
return Y;
    },

    /**
     * Generate an id that is unique among all YUI instances
     * @method guid
     * @param pre {String} optional guid prefix.
     * @return {String} the guid.
     */
    guid: function(pre) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "guid", 1257);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1258);
var id = this.Env._guidp + '_' + (++this.Env._uidx);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1259);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "stamp", 1272);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1273);
var uid;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1274);
if (!o) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1275);
return o;
        }

        // IE generates its own unique ID for dom nodes
        // The uniqueID property of a document node returns a new ID
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1280);
if (o.uniqueID && o.nodeType && o.nodeType !== 9) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1281);
uid = o.uniqueID;
        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1283);
uid = (typeof o === 'string') ? o : o._yuid;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1286);
if (!uid) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1287);
uid = this.guid();
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1288);
if (!readOnly) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1289);
try {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1290);
o._yuid = uid;
                } catch (e) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1292);
uid = null;
                }
            }
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1296);
return uid;
    },

    /**
     * Destroys the YUI instance
     * @method destroy
     * @since 3.3.0
     */
    destroy: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "destroy", 1304);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1305);
var Y = this;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1306);
if (Y.Event) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1307);
Y.Event._unload();
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1309);
delete instances[Y.id];
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1310);
delete Y.Env;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1311);
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

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1325);
YUI.prototype = proto;

    // inheritance utilities are not available yet
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1328);
for (prop in proto) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1329);
if (proto.hasOwnProperty(prop)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1330);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1366);
YUI.applyConfig = function(o) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "applyConfig", 1366);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1367);
if (!o) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1368);
return;
        }
        //If there is a GlobalConfig, apply it first to set the defaults
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1371);
if (YUI.GlobalConfig) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1372);
this.prototype.applyConfig.call(this, YUI.GlobalConfig);
        }
        //Apply this config to it
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1375);
this.prototype.applyConfig.call(this, o);
        //Reset GlobalConfig to the combined config
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1377);
YUI.GlobalConfig = this.config;
    };

    // set up the environment
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1381);
YUI._init();

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1383);
if (hasWin) {
        // add a window load event at load time so we can capture
        // the case where it fires before dynamic loading is
        // complete.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1387);
add(window, 'load', handleLoad);
    } else {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1389);
handleLoad();
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1392);
YUI.Env.add = add;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1393);
YUI.Env.remove = remove;

    /*global exports*/
    // Support the CommonJS method for exporting our single global
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1397);
if (typeof exports == 'object') {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1398);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1950);
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

_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 8)", 1950);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 1972);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2020);
L._isNative = function (fn) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_isNative", 2020);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2021);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2038);
L.isArray = L._isNative(Array.isArray) ? Array.isArray : function (o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isArray", 2038);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2039);
return L.type(o) === 'array';
};

/**
 * Determines whether or not the provided item is a boolean.
 * @method isBoolean
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a boolean.
 */
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2049);
L.isBoolean = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isBoolean", 2049);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2050);
return typeof o === 'boolean';
};

/**
 * Determines whether or not the supplied item is a date instance.
 * @method isDate
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a date.
 */
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2060);
L.isDate = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isDate", 2060);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2061);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2088);
L.isFunction = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isFunction", 2088);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2089);
return L.type(o) === 'function';
};

/**
 * Determines whether or not the provided item is null.
 * @method isNull
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is null.
 */
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2099);
L.isNull = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isNull", 2099);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2100);
return o === null;
};

/**
 * Determines whether or not the provided item is a legal number.
 * @method isNumber
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a number.
 */
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2110);
L.isNumber = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isNumber", 2110);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2111);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2125);
L.isObject = function(o, failfn) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isObject", 2125);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2126);
var t = typeof o;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2127);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2138);
L.isString = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isString", 2138);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2139);
return typeof o === 'string';
};

/**
 * Determines whether or not the provided item is undefined.
 * @method isUndefined
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is undefined.
 */
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2149);
L.isUndefined = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isUndefined", 2149);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2150);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2162);
L.isValue = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isValue", 2162);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2163);
var t = L.type(o);

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2165);
switch (t) {
        case 'number':
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2167);
return isFinite(o);

        case 'null': // fallthru
        case 'undefined':
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2171);
return false;

        default:
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2174);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2186);
L.now = Date.now || function () {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 9)", 2186);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2187);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2201);
L.sub = function(s, o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "sub", 2201);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2202);
return s.replace ? s.replace(SUBREGEX, function (match, key) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 10)", 2202);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2203);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2215);
L.trim = STRING_PROTO.trim ? function(s) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 11)", 2215);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2216);
return s && s.trim ? s.trim() : s;
} : function (s) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "}", 2217);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2218);
try {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2219);
return s.replace(TRIMREGEX, '');
    } catch (e) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2221);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2232);
L.trimLeft = STRING_PROTO.trimLeft ? function (s) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 12)", 2232);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2233);
return s.trimLeft();
} : function (s) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "}", 2234);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2235);
return s.replace(/^\s+/, '');
};

/**
 * Returns a string without any trailing whitespace.
 * @method trimRight
 * @static
 * @param s {string} the string to trim.
 * @return {string} the trimmed string.
 */
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2245);
L.trimRight = STRING_PROTO.trimRight ? function (s) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 13)", 2245);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2246);
return s.trimRight();
} : function (s) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "}", 2247);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2248);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2278);
L.type = function(o) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "type", 2278);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2279);
return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
/**
@module yui
@submodule yui-base
*/

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2286);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2319);
function YArray(thing, startIndex, force) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "YArray", 2319);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2320);
var len, result;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2322);
startIndex || (startIndex = 0);

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2324);
if (force || YArray.test(thing)) {
        // IE throws when trying to slice HTMLElement collections.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2326);
try {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2327);
return Native.slice.call(thing, startIndex);
        } catch (ex) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2329);
result = [];

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2331);
for (len = thing.length; startIndex < len; ++startIndex) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2332);
result.push(thing[startIndex]);
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2335);
return result;
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2339);
return [thing];
}

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2342);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2358);
YArray.dedupe = function (array) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "dedupe", 2358);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2359);
var hash    = {},
        results = [],
        i, item, len;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2363);
for (i = 0, len = array.length; i < len; ++i) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2364);
item = array[i];

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2366);
if (!hasOwn.call(hash, item)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2367);
hash[item] = 1;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2368);
results.push(item);
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2372);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2390);
YArray.each = YArray.forEach = Lang._isNative(Native.forEach) ? function (array, fn, thisObj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 14)", 2390);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2391);
Native.forEach.call(array || [], fn, thisObj || Y);
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2392);
return Y;
} : function (array, fn, thisObj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "}", 2393);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2394);
for (var i = 0, len = (array && array.length) || 0; i < len; ++i) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2395);
if (i in array) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2396);
fn.call(thisObj || Y, array[i], i, array);
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2400);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2427);
YArray.hash = function (keys, values) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "hash", 2427);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2428);
var hash = {},
        vlen = (values && values.length) || 0,
        i, len;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2432);
for (i = 0, len = keys.length; i < len; ++i) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2433);
if (i in keys) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2434);
hash[keys[i]] = vlen > i && i in values ? values[i] : true;
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2438);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2455);
YArray.indexOf = Lang._isNative(Native.indexOf) ? function (array, value, from) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 15)", 2455);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2456);
return Native.indexOf.call(array, value, from);
} : function (array, value, from) {
    // http://es5.github.com/#x15.4.4.14
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "}", 2457);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2459);
var len = array.length;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2461);
from = +from || 0;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2462);
from = (from > 0 || -1) * Math.floor(Math.abs(from));

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2464);
if (from < 0) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2465);
from += len;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2467);
if (from < 0) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2468);
from = 0;
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2472);
for (; from < len; ++from) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2473);
if (from in array && array[from] === value) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2474);
return from;
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2478);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2500);
YArray.numericSort = function (a, b) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "numericSort", 2500);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2501);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2520);
YArray.some = Lang._isNative(Native.some) ? function (array, fn, thisObj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 16)", 2520);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2521);
return Native.some.call(array, fn, thisObj);
} : function (array, fn, thisObj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "}", 2522);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2523);
for (var i = 0, len = array.length; i < len; ++i) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2524);
if (i in array && fn.call(thisObj, array[i], i, array)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2525);
return true;
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2529);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2550);
YArray.test = function (obj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "test", 2550);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2551);
var result = 0;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2553);
if (Lang.isArray(obj)) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2554);
result = 1;
    } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2555);
if (Lang.isObject(obj)) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2556);
try {
            // indexed, but no tagName (element) or alert (window),
            // or functions without apply/call (Safari
            // HTMLElementCollection bug).
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2560);
if ('length' in obj && !obj.tagName && !obj.alert && !obj.apply) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2561);
result = 2;
            }
        } catch (ex) {}
    }}

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2566);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2584);
function Queue() {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "Queue", 2584);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2585);
this._init();
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2586);
this.add.apply(this, arguments);
}

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2589);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_init", 2596);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2604);
this._q = [];
    },

    /**
     * Get the next item in the queue. FIFO support
     *
     * @method next
     * @return {MIXED} the next item in the queue.
     */
    next: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "next", 2613);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2614);
return this._q.shift();
    },

    /**
     * Get the last in the queue. LIFO support.
     *
     * @method last
     * @return {MIXED} the last item in the queue.
     */
    last: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "last", 2623);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2624);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "add", 2634);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2635);
this._q.push.apply(this._q, arguments);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2637);
return this;
    },

    /**
     * Returns the current number of queued items.
     *
     * @method size
     * @return {Number} The size.
     */
    size: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "size", 2646);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2647);
return this._q.length;
    }
};

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2651);
Y.Queue = Queue;

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2653);
YUI.Env._loaderQueue = YUI.Env._loaderQueue || new Queue();

/**
The YUI module contains the components required for building the YUI seed file.
This includes the script loading mechanism, a simple queue, and the core
utilities for the library.

@module yui
@submodule yui-base
**/

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2664);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2693);
Y.cached = function (source, cache, refetch) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "cached", 2693);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2694);
cache || (cache = {});

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2696);
return function (arg) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 17)", 2696);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2697);
var key = arguments.length > 1 ?
                Array.prototype.join.call(arguments, CACHED_DELIMITER) :
                String(arg);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2701);
if (!(key in cache) || (refetch && cache[key] == refetch)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2702);
cache[key] = source.apply(source, arguments);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2705);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2725);
Y.getLocation = function () {
    // It is safer to look this up every time because yui-base is attached to a
    // YUI instance before a user's config is applied; i.e. `Y.config.win` does
    // not point the correct window object when this file is loaded.
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "getLocation", 2725);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2729);
var win = Y.config.win;

    // It is not safe to hold a reference to the `location` object outside the
    // scope in which it is being used. The WebKit engine used in Safari and
    // MobileSafari will "disconnect" the `location` object from the `window`
    // when a page is restored from back/forward history cache.
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2735);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2750);
Y.merge = function () {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "merge", 2750);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2751);
var args   = arguments,
        i      = 0,
        len    = args.length,
        result = {};

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2756);
for (; i < len; ++i) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2757);
Y.mix(result, args[i], true);
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2760);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2797);
Y.mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "mix", 2797);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2798);
var alwaysOverwrite, exists, from, i, key, len, to;

    // If no supplier is given, we return the receiver. If no receiver is given,
    // we return Y. Returning Y doesn't make much sense to me, but it's
    // grandfathered in for backcompat reasons.
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2803);
if (!receiver || !supplier) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2804);
return receiver || Y;
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2807);
if (mode) {
        // In mode 2 (prototype to prototype and object to object), we recurse
        // once to do the proto to proto mix. The object to object mix will be
        // handled later on.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2811);
if (mode === 2) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2812);
Y.mix(receiver.prototype, supplier.prototype, overwrite,
                    whitelist, 0, merge);
        }

        // Depending on which mode is specified, we may be copying from or to
        // the prototypes of the supplier and receiver.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2818);
from = mode === 1 || mode === 3 ? supplier.prototype : supplier;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2819);
to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;

        // If either the supplier or receiver doesn't actually have a
        // prototype property, then we could end up with an undefined `from`
        // or `to`. If that happens, we abort and return the receiver.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2824);
if (!from || !to) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2825);
return receiver;
        }
    } else {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2828);
from = supplier;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2829);
to   = receiver;
    }

    // If `overwrite` is truthy and `merge` is falsy, then we can skip a
    // property existence check on each iteration and save some time.
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2834);
alwaysOverwrite = overwrite && !merge;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2836);
if (whitelist) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2837);
for (i = 0, len = whitelist.length; i < len; ++i) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2838);
key = whitelist[i];

            // We call `Object.prototype.hasOwnProperty` instead of calling
            // `hasOwnProperty` on the object itself, since the object's
            // `hasOwnProperty` method may have been overridden or removed.
            // Also, some native objects don't implement a `hasOwnProperty`
            // method.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2845);
if (!hasOwn.call(from, key)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2846);
continue;
            }

            // The `key in to` check here is (sadly) intentional for backwards
            // compatibility reasons. It prevents undesired shadowing of
            // prototype members on `to`.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2852);
exists = alwaysOverwrite ? false : key in to;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2854);
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
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2864);
Y.mix(to[key], from[key], overwrite, null, 0, merge);
            } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2865);
if (overwrite || !exists) {
                // We're not in merge mode, so we'll only copy the `from` value
                // to the `to` value if we're in overwrite mode or if the
                // current key doesn't exist on the `to` object.
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2869);
to[key] = from[key];
            }}
        }
    } else {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2873);
for (key in from) {
            // The code duplication here is for runtime performance reasons.
            // Combining whitelist and non-whitelist operations into a single
            // loop or breaking the shared logic out into a function both result
            // in worse performance, and Y.mix is critical enough that the byte
            // tradeoff is worth it.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2879);
if (!hasOwn.call(from, key)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2880);
continue;
            }

            // The `key in to` check here is (sadly) intentional for backwards
            // compatibility reasons. It prevents undesired shadowing of
            // prototype members on `to`.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2886);
exists = alwaysOverwrite ? false : key in to;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2888);
if (merge && exists && isObject(to[key], true)
                    && isObject(from[key], true)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2890);
Y.mix(to[key], from[key], overwrite, null, 0, merge);
            } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2891);
if (overwrite || !exists) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2892);
to[key] = from[key];
            }}
        }

        // If this is an IE browser with the JScript enumeration bug, force
        // enumeration of the buggy properties by making a recursive call with
        // the buggy properties as the whitelist.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2899);
if (Y.Object._hasEnumBug) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2900);
Y.mix(to, from, overwrite, Y.Object._forceEnum, mode, merge);
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2904);
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

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2920);
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
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 18)", 2936);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2942);
return Object.create(obj);
} : (function () {
    // Reusable constructor function for the Object.create() shim.
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 19)", 2943);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2945);
function F() {}

    // The actual shim.
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2948);
return function (obj) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 20)", 2948);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2949);
F.prototype = obj;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 2950);
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
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "owns", 3011);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3012);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3024);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3047);
O.keys = Lang._isNative(Object.keys) ? Object.keys : function (obj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "keys", 3047);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3048);
if (!Lang.isObject(obj)) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3049);
throw new TypeError('Object.keys called on a non-object');
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3052);
var keys = [],
        i, key, len;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3055);
if (hasProtoEnumBug && typeof obj === 'function') {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3056);
for (key in obj) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3057);
if (owns(obj, key) && key !== 'prototype') {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3058);
keys.push(key);
            }
        }
    } else {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3062);
for (key in obj) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3063);
if (owns(obj, key)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3064);
keys.push(key);
            }
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3069);
if (hasEnumBug) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3070);
for (i = 0, len = forceEnum.length; i < len; ++i) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3071);
key = forceEnum[i];

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3073);
if (owns(obj, key)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3074);
keys.push(key);
            }
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3079);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3099);
O.values = function (obj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "values", 3099);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3100);
var keys   = O.keys(obj),
        i      = 0,
        len    = keys.length,
        values = [];

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3105);
for (; i < len; ++i) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3106);
values.push(obj[keys[i]]);
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3109);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3120);
O.size = function (obj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "size", 3120);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3121);
try {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3122);
return O.keys(obj).length;
    } catch (ex) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3124);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3138);
O.hasValue = function (obj, value) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "hasValue", 3138);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3139);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3162);
O.each = function (obj, fn, thisObj, proto) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "each", 3162);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3163);
var key;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3165);
for (key in obj) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3166);
if (proto || owns(obj, key)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3167);
fn.call(thisObj || Y, obj[key], key, obj);
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3171);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3194);
O.some = function (obj, fn, thisObj, proto) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "some", 3194);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3195);
var key;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3197);
for (key in obj) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3198);
if (proto || owns(obj, key)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3199);
if (fn.call(thisObj || Y, obj[key], key, obj)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3200);
return true;
            }
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3205);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3221);
O.getValue = function(o, path) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "getValue", 3221);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3222);
if (!Lang.isObject(o)) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3223);
return UNDEFINED;
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3226);
var i,
        p = Y.Array(path),
        l = p.length;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3230);
for (i = 0; o !== UNDEFINED && i < l; i++) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3231);
o = o[p[i]];
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3234);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3251);
O.setValue = function(o, path, val) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "setValue", 3251);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3252);
var i,
        p = Y.Array(path),
        leafIdx = p.length - 1,
        ref = o;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3257);
if (leafIdx >= 0) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3258);
for (i = 0; ref !== UNDEFINED && i < leafIdx; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3259);
ref = ref[p[i]];
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3262);
if (ref !== UNDEFINED) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3263);
ref[p[i]] = val;
        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3265);
return UNDEFINED;
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3269);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3281);
O.isEmpty = function (obj) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isEmpty", 3281);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3282);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3317);
YUI.Env.parseUA = function(subUA) {

    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "parseUA", 3317);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3319);
var numberify = function(s) {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "numberify", 3319);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3320);
var c = 0;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3321);
return parseFloat(s.replace(/\./g, function() {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 22)", 3321);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3322);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3549);
o.userAgent = ua;


    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3552);
o.secure = href && (href.toLowerCase().indexOf('https') === 0);

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3554);
if (ua) {

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3556);
if ((/windows|win32/i).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3557);
o.os = 'windows';
        } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3558);
if ((/macintosh|mac_powerpc/i).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3559);
o.os = 'macintosh';
        } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3560);
if ((/android/i).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3561);
o.os = 'android';
        } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3562);
if ((/symbos/i).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3563);
o.os = 'symbos';
        } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3564);
if ((/linux/i).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3565);
o.os = 'linux';
        } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3566);
if ((/rhino/i).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3567);
o.os = 'rhino';
        }}}}}}

        // Modern KHTML browsers should qualify as Safari X-Grade
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3571);
if ((/KHTML/).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3572);
o.webkit = 1;
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3574);
if ((/IEMobile|XBLWP7/).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3575);
o.mobile = 'windows';
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3577);
if ((/Fennec/).test(ua)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3578);
o.mobile = 'gecko';
        }
        // Modern WebKit browsers are at least X-Grade
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3581);
m = ua.match(/AppleWebKit\/([^\s]*)/);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3582);
if (m && m[1]) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3583);
o.webkit = numberify(m[1]);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3584);
o.safari = o.webkit;
            
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3586);
if (/PhantomJS/.test(ua)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3587);
m = ua.match(/PhantomJS\/([^\s]*)/);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3588);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3589);
o.phantomjs = numberify(m[1]);
                }
            }

            // Mobile browser check
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3594);
if (/ Mobile\//.test(ua) || (/iPad|iPod|iPhone/).test(ua)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3595);
o.mobile = 'Apple'; // iPhone or iPod Touch

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3597);
m = ua.match(/OS ([^\s]*)/);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3598);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3599);
m = numberify(m[1].replace('_', '.'));
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3601);
o.ios = m;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3602);
o.os = 'ios';
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3603);
o.ipad = o.ipod = o.iphone = 0;

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3605);
m = ua.match(/iPad|iPod|iPhone/);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3606);
if (m && m[0]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3607);
o[m[0].toLowerCase()] = o.ios;
                }
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3610);
m = ua.match(/NokiaN[^\/]*|webOS\/\d\.\d/);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3611);
if (m) {
                    // Nokia N-series, webOS, ex: NokiaN95
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3613);
o.mobile = m[0];
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3615);
if (/webOS/.test(ua)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3616);
o.mobile = 'WebOS';
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3617);
m = ua.match(/webOS\/([^\s]*);/);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3618);
if (m && m[1]) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3619);
o.webos = numberify(m[1]);
                    }
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3622);
if (/ Android/.test(ua)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3623);
if (/Mobile/.test(ua)) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3624);
o.mobile = 'Android';
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3626);
m = ua.match(/Android ([^\s]*);/);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3627);
if (m && m[1]) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3628);
o.android = numberify(m[1]);
                    }

                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3632);
if (/Silk/.test(ua)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3633);
m = ua.match(/Silk\/([^\s]*)\)/);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3634);
if (m && m[1]) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3635);
o.silk = numberify(m[1]);
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3637);
if (!o.android) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3638);
o.android = 2.34; //Hack for desktop mode in Kindle
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3639);
o.os = 'Android';
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3641);
if (/Accelerated=true/.test(ua)) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3642);
o.accel = true;
                    }
                }
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3647);
m = ua.match(/(Chrome|CrMo|CriOS)\/([^\s]*)/);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3648);
if (m && m[1] && m[2]) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3649);
o.chrome = numberify(m[2]); // Chrome
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3650);
o.safari = 0; //Reset safari back to 0
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3651);
if (m[1] === 'CrMo') {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3652);
o.mobile = 'chrome';
                }
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3655);
m = ua.match(/AdobeAIR\/([^\s]*)/);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3656);
if (m) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3657);
o.air = m[0]; // Adobe AIR 1.0 or better
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3662);
if (!o.webkit) { // not webkit
// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3664);
if (/Opera/.test(ua)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3665);
m = ua.match(/Opera[\s\/]([^\s]*)/);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3666);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3667);
o.opera = numberify(m[1]);
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3669);
m = ua.match(/Version\/([^\s]*)/);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3670);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3671);
o.opera = numberify(m[1]); // opera 10+
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3674);
if (/Opera Mobi/.test(ua)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3675);
o.mobile = 'opera';
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3676);
m = ua.replace('Opera Mobi', '').match(/Opera ([^\s]*)/);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3677);
if (m && m[1]) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3678);
o.opera = numberify(m[1]);
                    }
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3681);
m = ua.match(/Opera Mini[^;]*/);

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3683);
if (m) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3684);
o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3687);
m = ua.match(/MSIE\s([^;]*)/);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3688);
if (m && m[1]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3689);
o.ie = numberify(m[1]);
                } else { // not opera, webkit, or ie
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3691);
m = ua.match(/Gecko\/([^\s]*)/);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3692);
if (m) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3693);
o.gecko = 1; // Gecko detected, look for revision
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3694);
m = ua.match(/rv:([^\s\)]*)/);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3695);
if (m && m[1]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3696);
o.gecko = numberify(m[1]);
                        }
                    }
                }
            }
        }
    }

    //It was a parsed UA, do not assign the global value.
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3705);
if (!subUA) {

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3707);
if (typeof process == 'object') {

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3709);
if (process.versions && process.versions.node) {
                //NodeJS
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3711);
o.os = process.platform;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3712);
o.nodejs = numberify(process.versions.node);
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3716);
YUI.Env.UA = o;

    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3720);
return o;
};


_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3724);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3746);
Y.UA.compareVersions = function (a, b) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "compareVersions", 3746);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3747);
var aPart, aParts, bPart, bParts, i, len;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3749);
if (a === b) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3750);
return 0;
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3753);
aParts = (a + '').split('.');
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3754);
bParts = (b + '').split('.');

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3756);
for (i = 0, len = Math.max(aParts.length, bParts.length); i < len; ++i) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3757);
aPart = parseInt(aParts[i], 10);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3758);
bPart = parseInt(bParts[i], 10);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3760);
isNaN(aPart) && (aPart = 0);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3761);
isNaN(bPart) && (bPart = 0);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3763);
if (aPart < bPart) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3764);
return -1;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3767);
if (aPart > bPart) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3768);
return 1;
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3772);
return 0;
};
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3774);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3815);
YUI.add('get', function(Y) {

    /**
    * NodeJS specific Get module used to load remote resources. It contains the same signature as the default Get module so there is no code change needed.
    * @module get-nodejs
    * @class GetNodeJS
    */
        
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 23)", 3815);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3823);
var path = require('path'),
        vm = require('vm'),
        fs = require('fs'),
        request = require('request'),
        existsSync = fs.existsSync || path.existsSync;


    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3830);
Y.Get = function() {
    };

    //Setup the default config base path
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3834);
Y.config.base = path.join(__dirname, '../');

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3836);
YUI.require = require;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3837);
YUI.process = process;
    
    /**
    * Escape the path for Windows, they need to be double encoded when used as `__dirname` or `__filename`
    * @method escapeWinPath
    * @protected
    * @param {String} p The path to modify
    * @return {String} The encoded path
    */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3846);
var escapeWinPath = function(p) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "escapeWinPath", 3846);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3847);
return p.replace(/\\/g, '\\\\');
    };

    /**
    * Takes the raw JS files and wraps them to be executed in the YUI context so they can be loaded
    * into the YUI object
    * @method _exec
    * @private
    * @param {String} data The JS to execute
    * @param {String} url The path to the file that was parsed
    * @param {Callback} cb The callback to execute when this is completed
    * @param {Error} cb.err=null Error object
    * @param {String} cb.url The URL that was just parsed
    */

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3862);
Y.Get._exec = function(data, url, cb) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_exec", 3862);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3863);
var dirName = escapeWinPath(path.dirname(url));
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3864);
var fileName = escapeWinPath(url);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3866);
if (dirName.match(/^https?:\/\//)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3867);
dirName = '.';
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3868);
fileName = 'remoteResource';
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3871);
var mod = "(function(YUI) { var __dirname = '" + dirName + "'; "+
            "var __filename = '" + fileName + "'; " +
            "var process = YUI.process;" +
            "var require = function(file) {" +
            " if (file.indexOf('./') === 0) {" +
            "   file = __dirname + file.replace('./', '/'); }" +
            " return YUI.require(file); }; " +
            data + " ;return YUI; })";
    
        //var mod = "(function(YUI) { " + data + ";return YUI; })";
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3881);
var script = vm.createScript(mod, url);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3882);
var fn = script.runInThisContext(mod);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3883);
YUI = fn(YUI);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3884);
cb(null, url);
    };
    
    /**
    * Fetches the content from a remote URL or a file from disc and passes the content
    * off to `_exec` for parsing
    * @method _include
    * @private
    * @param {String} url The URL/File path to fetch the content from
    * @param {Callback} cb The callback to fire once the content has been executed via `_exec`
    */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3895);
Y.Get._include = function(url, cb) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_include", 3895);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3896);
var self = this;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3898);
if (url.match(/^https?:\/\//)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3899);
var cfg = {
                url: url,
                timeout: self.timeout
            };
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3903);
request(cfg, function (err, response, body) {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 24)", 3903);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3904);
if (err) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3905);
cb(err, url);
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3907);
Y.Get._exec(body, url, cb);
                }
            });
        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3911);
if (Y.config.useSync) {
                //Needs to be in useSync
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3913);
if (existsSync(url)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3914);
var mod = fs.readFileSync(url,'utf8');
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3915);
Y.Get._exec(mod, url, cb);
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3917);
cb('Path does not exist: ' + url, url);
                }
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3920);
fs.readFile(url, 'utf8', function(err, mod) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 25)", 3920);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3921);
if (err) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3922);
cb(err, url);
                    } else {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3924);
Y.Get._exec(mod, url, cb);
                    }
                });
            }
        }
        
    };


    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3933);
var end = function(cb, msg, result) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "end", 3933);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3934);
if (Y.Lang.isFunction(cb.onEnd)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3935);
cb.onEnd.call(Y, msg, result);
        }
    }, pass = function(cb) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "pass", 3937);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3938);
if (Y.Lang.isFunction(cb.onSuccess)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3939);
cb.onSuccess.call(Y, cb);
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3941);
end(cb, 'success', 'success');
    }, fail = function(cb, er) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "fail", 3942);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3943);
er.errors = [er];
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3944);
if (Y.Lang.isFunction(cb.onFailure)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3945);
cb.onFailure.call(Y, er, cb);
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3947);
end(cb, er, 'fail');
    };


    /**
    * Override for Get.script for loading local or remote YUI modules.
    * @method js
    * @param {Array|String} s The URL's to load into this context
    * @param {Object} options Transaction options
    */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3957);
Y.Get.js = function(s, options) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "js", 3957);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3958);
var A = Y.Array,
            self = this,
            urls = A(s), url, i, l = urls.length, c= 0,
            check = function() {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "check", 3961);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3962);
if (c === l) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3963);
pass(options);
                }
            };



        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3969);
for (i=0; i<l; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3970);
url = urls[i];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3971);
if (Y.Lang.isObject(url)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3972);
url = url.url;
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3975);
url = url.replace(/'/g, '%27');
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3976);
Y.Get._include(url, function(err, url) {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 26)", 3976);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3977);
if (!Y.config) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3978);
Y.config = {
                        debug: true
                    };
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3982);
if (options.onProgress) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3983);
options.onProgress.call(options.context || Y, url);
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3985);
if (err) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3986);
fail(options, err);
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3988);
c++;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3989);
check();
                }
            });
        }
    };
    
    /**
    * Alias for `Y.Get.js`
    * @method script
    */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 3999);
Y.Get.script = Y.Get.js;
    
    //Place holder for SS Dom access
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4002);
Y.Get.css = function(s, cb) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "css", 4002);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4003);
pass(cb);
    };



}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4009);
YUI.add('features', function(Y) {

_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 27)", 4009);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4011);
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

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4024);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "add", 4048);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4049);
feature_tests[cat] = feature_tests[cat] || {};
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4050);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "all", 4063);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4064);
var cat_o = feature_tests[cat],
            // results = {};
            result = [];
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4067);
if (cat_o) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4068);
Y.Object.each(cat_o, function(v, k) {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 28)", 4068);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4069);
result.push(k + ':' + (Y.Features.test(cat, k, args) ? 1 : 0));
            });
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4073);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "test", 4088);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4089);
args = args || [];
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4090);
var result, ua, test,
            cat_o = feature_tests[cat],
            feature = cat_o && cat_o[name];

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4094);
if (!feature) {
        } else {

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4097);
result = feature.result;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4099);
if (Y.Lang.isUndefined(result)) {

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4101);
ua = feature.ua;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4102);
if (ua) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4103);
result = (Y.UA[ua]);
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4106);
test = feature.test;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4107);
if (test && ((!ua) || result)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4108);
result = test.apply(Y, args);
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4111);
feature.result = result;
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4115);
return result;
    }
});

// Y.Features.add("load", "1", {});
// Y.Features.test("load", "1");
// caps=1:1;2:0;3:1;

/* This file is auto-generated by src/loader/scripts/meta_join.js */
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4124);
var add = Y.Features.add;
// app-transitions-native
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4126);
add('load', '0', {
    "name": "app-transitions-native",
    "test": function (Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4128);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4129);
var doc  = Y.config.doc,
        node = doc ? doc.documentElement : null;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4132);
if (node && node.style) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4133);
return ('MozTransition' in node.style || 'WebkitTransition' in node.style);
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4136);
return false;
},
    "trigger": "app-transitions"
});
// autocomplete-list-keys
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4141);
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
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4143);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4155);
return !(Y.UA.ios || Y.UA.android);
},
    "trigger": "autocomplete-list"
});
// dd-gestures
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4160);
add('load', '2', {
    "name": "dd-gestures",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4162);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4163);
return ((Y.config.win && ("ontouchstart" in Y.config.win)) && !(Y.UA.chrome && Y.UA.chrome < 6));
},
    "trigger": "dd-drag"
});
// dom-style-ie
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4168);
add('load', '3', {
    "name": "dom-style-ie",
    "test": function (Y) {

    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4170);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4172);
var testFeature = Y.Features.test,
        addFeature = Y.Features.add,
        WINDOW = Y.config.win,
        DOCUMENT = Y.config.doc,
        DOCUMENT_ELEMENT = 'documentElement',
        ret = false;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4179);
addFeature('style', 'computedStyle', {
        test: function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "test", 4180);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4181);
return WINDOW && 'getComputedStyle' in WINDOW;
        }
    });

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4185);
addFeature('style', 'opacity', {
        test: function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "test", 4186);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4187);
return DOCUMENT && 'opacity' in DOCUMENT[DOCUMENT_ELEMENT].style;
        }
    });

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4191);
ret =  (!testFeature('style', 'opacity') &&
            !testFeature('style', 'computedStyle'));

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4194);
return ret;
},
    "trigger": "dom-style"
});
// editor-para-ie
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4199);
add('load', '4', {
    "name": "editor-para-ie",
    "trigger": "editor-para",
    "ua": "ie",
    "when": "instead"
});
// event-base-ie
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4206);
add('load', '5', {
    "name": "event-base-ie",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4208);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4209);
var imp = Y.config.doc && Y.config.doc.implementation;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4210);
return (imp && (!imp.hasFeature('Events', '2.0')));
},
    "trigger": "node-base"
});
// graphics-canvas
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4215);
add('load', '6', {
    "name": "graphics-canvas",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4217);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4218);
var DOCUMENT = Y.config.doc,
        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4222);
return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext("2d"));
},
    "trigger": "graphics"
});
// graphics-canvas-default
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4227);
add('load', '7', {
    "name": "graphics-canvas-default",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4229);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4230);
var DOCUMENT = Y.config.doc,
        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4234);
return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext("2d"));
},
    "trigger": "graphics"
});
// graphics-svg
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4239);
add('load', '8', {
    "name": "graphics-svg",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4241);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4242);
var DOCUMENT = Y.config.doc,
        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4247);
return svg && (useSVG || !canvas);
},
    "trigger": "graphics"
});
// graphics-svg-default
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4252);
add('load', '9', {
    "name": "graphics-svg-default",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4254);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4255);
var DOCUMENT = Y.config.doc,
        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4260);
return svg && (useSVG || !canvas);
},
    "trigger": "graphics"
});
// graphics-vml
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4265);
add('load', '10', {
    "name": "graphics-vml",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4267);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4268);
var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4270);
return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
},
    "trigger": "graphics"
});
// graphics-vml-default
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4275);
add('load', '11', {
    "name": "graphics-vml-default",
    "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4277);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4278);
var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4280);
return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
},
    "trigger": "graphics"
});
// history-hash-ie
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4285);
add('load', '12', {
    "name": "history-hash-ie",
    "test": function (Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4287);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4288);
var docMode = Y.config.doc && Y.config.doc.documentMode;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4290);
return Y.UA.ie && (!('onhashchange' in Y.config.win) ||
            !docMode || docMode < 8);
},
    "trigger": "history-hash"
});
// io-nodejs
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4296);
add('load', '13', {
    "name": "io-nodejs",
    "trigger": "io-base",
    "ua": "nodejs"
});
// scrollview-base-ie
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4302);
add('load', '14', {
    "name": "scrollview-base-ie",
    "trigger": "scrollview-base",
    "ua": "ie"
});
// selector-css2
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4308);
add('load', '15', {
    "name": "selector-css2",
    "test": function (Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4310);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4311);
var DOCUMENT = Y.config.doc,
        ret = DOCUMENT && !('querySelectorAll' in DOCUMENT);

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4314);
return ret;
},
    "trigger": "selector"
});
// transition-timer
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4319);
add('load', '16', {
    "name": "transition-timer",
    "test": function (Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 4321);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4322);
var DOCUMENT = Y.config.doc,
        node = (DOCUMENT) ? DOCUMENT.documentElement: null,
        ret = true;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4326);
if (node && node.style) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4327);
ret = !('MozTransition' in node.style || 'WebkitTransition' in node.style);
    } 

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4330);
return ret;
},
    "trigger": "transition"
});
// widget-base-ie
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4335);
add('load', '17', {
    "name": "widget-base-ie",
    "trigger": "widget-base",
    "ua": "ie"
});


}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4343);
YUI.add('intl-base', function(Y) {

/**
 * The Intl utility provides a central location for managing sets of
 * localized resources (strings and formatting patterns).
 *
 * @class Intl
 * @uses EventTarget
 * @static
 */

_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 29)", 4343);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4354);
var SPLIT_REGEX = /[, ]/;

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4356);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "lookupBestLang", 4378);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4380);
var i, language, result, index;

        // check whether the list of available languages contains language;
        // if so return it
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4384);
function scan(language) {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "scan", 4384);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4385);
var i;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4386);
for (i = 0; i < availableLanguages.length; i += 1) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4387);
if (language.toLowerCase() ===
                            availableLanguages[i].toLowerCase()) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4389);
return availableLanguages[i];
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4394);
if (Y.Lang.isString(preferredLanguages)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4395);
preferredLanguages = preferredLanguages.split(SPLIT_REGEX);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4398);
for (i = 0; i < preferredLanguages.length; i += 1) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4399);
language = preferredLanguages[i];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4400);
if (!language || language === '*') {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4401);
continue;
            }
            // check the fallback sequence for one language
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4404);
while (language.length > 0) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4405);
result = scan(language);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4406);
if (result) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4407);
return result;
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4409);
index = language.lastIndexOf('-');
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4410);
if (index >= 0) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4411);
language = language.substring(0, index);
                        // one-character subtags get cut along with the
                        // following subtag
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4414);
if (index >= 2 && language.charAt(index - 2) === '-') {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4415);
language = language.substring(0, index - 2);
                        }
                    } else {
                        // nothing available for this language
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4419);
break;
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4425);
return '';
    }
});


}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4431);
YUI.add('yui-log', function(Y) {

/**
 * Provides console log capability and exposes a custom event for
 * console implementations. This module is a `core` YUI module, <a href="../classes/YUI.html#method_log">it's documentation is located under the YUI class</a>.
 *
 * @module yui
 * @submodule yui-log
 */

_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 30)", 4431);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4441);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4468);
INSTANCE.log = function(msg, cat, src, silent) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "log", 4468);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4469);
var bail, excl, incl, m, f,
        Y = INSTANCE,
        c = Y.config,
        publisher = (Y.fire) ? Y : YUI.Env.globalEvents;
    // suppress log message if the config is off or the event stack
    // or the event call stack contains a consumer of the yui:log event
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4475);
if (c.debug) {
        // apply source filters
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4477);
src = src || "";
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4478);
if (typeof src !== "undefined") {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4479);
excl = c.logExclude;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4480);
incl = c.logInclude;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4481);
if (incl && !(src in incl)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4482);
bail = 1;
            } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4483);
if (incl && (src in incl)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4484);
bail = !incl[src];
            } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4485);
if (excl && (src in excl)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4486);
bail = excl[src];
            }}}
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4489);
if (!bail) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4490);
if (c.useBrowserConsole) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4491);
m = (src) ? src + ': ' + msg : msg;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4492);
if (Y.Lang.isFunction(c.logFn)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4493);
c.logFn.call(Y, msg, cat, src);
                } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4494);
if (typeof console != UNDEFINED && console.log) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4495);
f = (cat && console[cat] && (cat in LEVELS)) ? cat : 'log';
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4496);
console[f](m);
                } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4497);
if (typeof opera != UNDEFINED) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4498);
opera.postError(m);
                }}}
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4502);
if (publisher && !silent) {

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4504);
if (publisher == Y && (!publisher.getEvent(LOGEVENT))) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4505);
publisher.publish(LOGEVENT, {
                        broadcast: 2
                    });
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4510);
publisher.fire(LOGEVENT, {
                    msg: msg,
                    cat: cat,
                    src: src
                });
            }
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4519);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4535);
INSTANCE.message = function() {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "message", 4535);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4536);
return INSTANCE.log.apply(INSTANCE, arguments);
};


}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4541);
YUI.add('yui-log-nodejs', function(Y) {

_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 31)", 4541);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4543);
var sys = require(process.binding('natives').util ? 'util' : 'sys'),
    hasColor = false;

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4546);
try {
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4547);
var stdio = require("stdio");
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4548);
hasColor = stdio.isStderrATTY();
} catch (ex) {
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4550);
hasColor = true;
}

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4553);
Y.config.useColor = hasColor;

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4555);
Y.consoleColor = function(str, num) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "consoleColor", 4555);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4556);
if (!this.config.useColor) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4557);
return str;
    }
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4559);
if (!num) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4560);
num = '32';
    }
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4562);
return "\u001b[" + num +"m" + str + "\u001b[0m";
};


_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4566);
var logFn = function(str, t, m) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "logFn", 4566);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4567);
var id = '';
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4568);
if (this.id) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4569);
id = '[' + this.id + ']:';
    }
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4571);
t = t || 'info';
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4572);
m = (m) ? this.consoleColor(' (' +  m.toLowerCase() + '):', 35) : '';
    
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4574);
if (str === null) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4575);
str = 'null';
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4578);
if ((typeof str === 'object') || str instanceof Array) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4579);
try {
            //Should we use this?
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4581);
if (str.tagName || str._yuid || str._query) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4582);
str = str.toString();
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4584);
str = sys.inspect(str);
            }
        } catch (e) {
            //Fail catcher
        }
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4591);
var lvl = '37;40', mLvl = ((str) ? '' : 31);
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4592);
t = t+''; //Force to a string..
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4593);
switch (t.toLowerCase()) {
        case 'error':
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4595);
lvl = mLvl = 31;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4596);
break;
        case 'warn':
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4598);
lvl = 33;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4599);
break;
        case 'debug':
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4601);
lvl = 34;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4602);
break;
    }
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4604);
if (typeof str === 'string') {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4605);
if (str && str.indexOf("\n") !== -1) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4606);
str = "\n" + str;
        }
    }

    // output log messages to stderr
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4611);
sys.error(this.consoleColor(t.toLowerCase() + ':', lvl) + m + ' ' + this.consoleColor(str, mLvl));
};

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4614);
if (!Y.config.logFn) {
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4615);
Y.config.logFn = logFn;
}



}, '@VERSION@' ,{requires:['yui-log']});
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4621);
YUI.add('yui-later', function(Y) {

/**
 * Provides a setTimeout/setInterval wrapper. This module is a `core` YUI module, <a href="../classes/YUI.html#method_later">it's documentation is located under the YUI class</a>.
 *
 * @module yui
 * @submodule yui-later
 */

_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 32)", 4621);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4630);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4657);
Y.later = function(when, o, fn, data, periodic) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "later", 4657);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4658);
when = when || 0;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4659);
data = (!Y.Lang.isUndefined(data)) ? Y.Array(data) : NO_ARGS;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4660);
o = o || Y.config.win || Y;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4662);
var cancelled = false,
        method = (o && Y.Lang.isString(fn)) ? o[fn] : fn,
        wrapper = function() {
            // IE 8- may execute a setInterval callback one last time
            // after clearInterval was called, so in order to preserve
            // the cancel() === no more runny-run, we have to jump through
            // an extra hoop.
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "wrapper", 4664);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4669);
if (!cancelled) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4670);
if (!method.apply) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4671);
method(data[0], data[1], data[2], data[3]);
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4673);
method.apply(o, data || NO_ARGS);
                }
            }
        },
        id = (periodic) ? setInterval(wrapper, when) : setTimeout(wrapper, when);

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4679);
return {
        id: id,
        interval: periodic,
        cancel: function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "cancel", 4682);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4683);
cancelled = true;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4684);
if (this.interval) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4685);
clearInterval(id);
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4687);
clearTimeout(id);
            }
        }
    };
};

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4693);
Y.Lang.later = Y.later;



}, '@VERSION@' ,{requires:['yui-base']});
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4698);
YUI.add('loader-base', function(Y) {

/**
 * The YUI loader core
 * @module loader
 * @submodule loader-base
 */

_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 33)", 4698);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4706);
if (!YUI.Env[Y.version]) {

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4708);
(function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 34)", 4708);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4709);
var VERSION = Y.version,
            BUILD = '/build/',
            ROOT = VERSION + BUILD,
            CDN_BASE = Y.Env.base,
            GALLERY_VERSION = '${loader.gallery}',
            TNT = '2in3',
            TNT_VERSION = '${loader.tnt}',
            YUI2_VERSION = '${loader.yui2}',
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
                    
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "yui2Update", 4734);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4736);
var root = TNT + '.' +
                        (tnt || TNT_VERSION) + '/' +
                        (yui2 || YUI2_VERSION) + BUILD,
                    base = (config && config.base) ? config.base : CDN_BASE,
                    combo = (config && config.comboBase) ? config.comboBase : COMBO_BASE;

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4742);
groups.yui2.base = base + root;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4743);
groups.yui2.root = root;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4744);
groups.yui2.comboBase = combo;
            },
            galleryUpdate = function(tag, config) {
                _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "galleryUpdate", 4746);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4747);
var root = (tag || GALLERY_VERSION) + BUILD,
                    base = (config && config.base) ? config.base : CDN_BASE,
                    combo = (config && config.comboBase) ? config.comboBase : COMBO_BASE;

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4751);
groups.gallery.base = base + root;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4752);
groups.gallery.root = root;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4753);
groups.gallery.comboBase = combo;
            };


        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4757);
groups[VERSION] = {};

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4759);
groups.gallery = {
            ext: false,
            combine: true,
            comboBase: COMBO_BASE,
            update: galleryUpdate,
            patterns: { 'gallery-': { },
                        'lang/gallery-': {},
                        'gallerycss-': { type: 'css' } }
        };

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4769);
groups.yui2 = {
            combine: true,
            ext: false,
            comboBase: COMBO_BASE,
            update: yui2Update,
            patterns: {
                'yui2-': {
                    configFn: function(me) {
                        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "configFn", 4776);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4777);
if (/-skin|reset|fonts|grids|base/.test(me.name)) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4778);
me.type = 'css';
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4779);
me.path = me.path.replace(/\.js/, '.css');
                            // this makes skins in builds earlier than
                            // 2.6.0 work as long as combine is false
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4782);
me.path = me.path.replace(/\/yui2-skin/,
                                             '/assets/skins/sam/yui2-skin');
                        }
                    }
                }
            }
        };

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4790);
galleryUpdate();
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4791);
yui2Update();

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4793);
YUI.Env[VERSION] = META;
    }());
}


/*jslint forin: true */

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

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4813);
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
    YArray = Y.Array,
    _queue = GLOBAL_ENV._loaderQueue,
    META = GLOBAL_ENV[VERSION],
    SKIN_PREFIX = 'skin-',
    L = Y.Lang,
    ON_PAGE = GLOBAL_ENV.mods,
    modulekey,
    cache,
    _path = function(dir, file, type, nomin) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_path", 4834);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4835);
var path = dir + '/' + file;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4836);
if (!nomin) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4837);
path += '-min';
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4839);
path += '.' + (type || CSS);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4841);
return path;
    };


    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4845);
if (!YUI.Env._cssLoaded) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4846);
YUI.Env._cssLoaded = {};
    }


/**
 * The component metadata is stored in Y.Env.meta.
 * Part of the loader module.
 * @property meta
 * @for YUI
 */
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4856);
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
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4904);
Y.Loader = function(o) {

    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "Loader", 4904);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4906);
var self = this;
    
    //Catch no config passed.
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4909);
o = o || {};

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4911);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 4965);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5008);
self.base = Y.Env.meta.base + Y.Env.meta.root;

    /**
     * Base path for the combo service
     * @property comboBase
     * @type string
     * @default http://yui.yahooapis.com/combo?
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5016);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5031);
self.combine = o.base &&
        (o.base.indexOf(self.comboBase.substr(0, 20)) > -1);
    
    /**
    * The default seperator to use between files in a combo URL
    * @property comboSep
    * @type {String}
    * @default Ampersand
    */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5040);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5052);
self.maxURLLength = MAX_URL_LENGTH;

    /**
     * Ignore modules registered on the YUI global
     * @property ignoreRegistered
     * @default false
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5059);
self.ignoreRegistered = o.ignoreRegistered;

    /**
     * Root path to prepend to module path for the combo
     * service
     * @property root
     * @type string
     * @default [YUI VERSION]/build/
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5068);
self.root = Y.Env.meta.root;

    /**
     * Timeout value in milliseconds.  If set, self value will be used by
     * the get utility.  the timeout event will fire if
     * a timeout occurs.
     * @property timeout
     * @type int
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5077);
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

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5095);
self.forceMap = {};

    /**
     * Should we allow rollups
     * @property allowRollup
     * @type boolean
     * @default false
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5103);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5138);
self.filters = {};

    /**
     * The list of requested modules
     * @property required
     * @type {string: boolean}
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5145);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5158);
self.patterns = {};

    /**
     * The library metadata
     * @property moduleInfo
     */
    // self.moduleInfo = Y.merge(Y.Env.meta.moduleInfo);
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5165);
self.moduleInfo = {};

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5167);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5197);
self.skin = Y.merge(Y.Env.meta.skin);

    /*
     * Map of conditional modules
     * @since 3.2.0
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5203);
self.conditions = {};

    // map of modules with a hash of modules that meet the requirement
    // self.provides = {};

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5208);
self.config = o;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5209);
self._internal = true;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5211);
self._populateCache();

    /**
     * Set when beginning to compute the dependency tree.
     * Composed of what YUI reports to be loaded combined
     * with what has been loaded by any instance on the page
     * with the version number specified in the metadata.
     * @property loaded
     * @type {string: boolean}
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5221);
self.loaded = GLOBAL_LOADED[VERSION];

    
    /**
    * Should Loader fetch scripts in `async`, defaults to `true`
    * @property async
    */

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5229);
self.async = true;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5231);
self._inspectPage();

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5233);
self._internal = false;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5235);
self._config(o);

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5237);
self.forceMap = (self.force) ? Y.Array.hash(self.force) : {};	

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5239);
self.testresults = null;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5241);
if (Y.config.tests) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5242);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5267);
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
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5283);
self.dirty = true;

    /**
     * List of modules inserted by the utility
     * @property inserted
     * @type {string: boolean}
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5290);
self.inserted = {};

    /**
     * List of skipped modules during insert() because the module
     * was not defined
     * @property skipped
     */
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5297);
self.skipped = {};

    // Y.on('yui:load', self.loadNext, self);

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5301);
self.tested = {};

    /*
     * Cached sorted calculate results
     * @property results
     * @since 3.2.0
     */
    //self.results = {};

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5310);
if (self.ignoreRegistered) {
        //Clear inpage already processed modules.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5312);
self._resetModules();
    }

};

_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5317);
Y.Loader.prototype = {
    /**
    * Checks the cache for modules and conditions, if they do not exist
    * process the default metadata and populate the local moduleInfo hash.
    * @method _populateCache
    * @private
    */
    _populateCache: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_populateCache", 5324);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5325);
var self = this,
            defaults = META.modules,
            cache = GLOBAL_ENV._renderedMods,
            i;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5330);
if (cache && !self.ignoreRegistered) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5331);
for (i in cache) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5332);
if (cache.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5333);
self.moduleInfo[i] = Y.merge(cache[i]);
                }
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5337);
cache = GLOBAL_ENV._conditions;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5338);
for (i in cache) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5339);
if (cache.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5340);
self.conditions[i] = Y.merge(cache[i]);
                }
            }

        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5345);
for (i in defaults) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5346);
if (defaults.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5347);
self.addModule(defaults[i], i);
                }
            }
        }

    },
    /**
    * Reset modules in the module cache to a pre-processed state so additional
    * computations with a different skin or language will work as expected.
    * @private _resetModules
    */
    _resetModules: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_resetModules", 5358);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5359);
var self = this, i, o;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5360);
for (i in self.moduleInfo) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5361);
if (self.moduleInfo.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5362);
var mod = self.moduleInfo[i],
                    name = mod.name,
                    details  = (YUI.Env.mods[name] ? YUI.Env.mods[name].details : null);

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5366);
if (details) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5367);
self.moduleInfo[name]._reset = true;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5368);
self.moduleInfo[name].requires = details.requires || [];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5369);
self.moduleInfo[name].optional = details.optional || [];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5370);
self.moduleInfo[name].supersedes = details.supercedes || [];
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5373);
if (mod.defaults) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5374);
for (o in mod.defaults) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5375);
if (mod.defaults.hasOwnProperty(o)) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5376);
if (mod[o]) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5377);
mod[o] = mod.defaults[o];
                            }
                        }
                    }
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5382);
delete mod.langCache;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5383);
delete mod.skinCache;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5384);
if (mod.skinnable) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5385);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_inspectPage", 5428);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5429);
var self = this, v, m, req, mr, i;

        //Inspect the page for CSS only modules and mark them as loaded.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5432);
for (i in self.moduleInfo) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5433);
if (self.moduleInfo.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5434);
v = self.moduleInfo[i];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5435);
if (v.type && v.type === CSS) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5436);
if (self.isCSSLoaded(v.name)) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5437);
self.loaded[i] = true;
                    }
                }
            }
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5442);
for (i in ON_PAGE) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5443);
if (ON_PAGE.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5444);
v = ON_PAGE[i];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5445);
if (v.details) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5446);
m = self.moduleInfo[v.name];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5447);
req = v.details.requires;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5448);
mr = m && m.requires;

                   _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5450);
if (m) {
                       _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5451);
if (!m._inspected && req && mr.length != req.length) {
                           // console.log('deleting ' + m.name);
                           _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5453);
delete m.expanded;
                       }
                   } else {
                       _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5456);
m = self.addModule(v.details, i);
                   }
                   _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5458);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_requires", 5470);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5472);
var i, rm, after_map, s,
            info = this.moduleInfo,
            m = info[mod1],
            other = info[mod2];

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5477);
if (!m || !other) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5478);
return false;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5481);
rm = m.expanded_map;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5482);
after_map = m.after_map;

        // check if this module should be sorted after the other
        // do this first to short circut circular deps
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5486);
if (after_map && (mod2 in after_map)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5487);
return true;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5490);
after_map = other.after_map;

        // and vis-versa
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5493);
if (after_map && (mod1 in after_map)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5494);
return false;
        }

        // check if this module requires one the other supersedes
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5498);
s = info[mod2] && info[mod2].supersedes;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5499);
if (s) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5500);
for (i = 0; i < s.length; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5501);
if (this._requires(mod1, s[i])) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5502);
return true;
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5507);
s = info[mod1] && info[mod1].supersedes;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5508);
if (s) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5509);
for (i = 0; i < s.length; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5510);
if (this._requires(mod2, s[i])) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5511);
return false;
                }
            }
        }

        // check if this module requires the other directly
        // if (r && YArray.indexOf(r, mod2) > -1) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5518);
if (rm && (mod2 in rm)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5519);
return true;
        }

        // external css files should be sorted below yui css
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5523);
if (m.ext && m.type == CSS && !other.ext && other.type == CSS) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5524);
return true;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5527);
return false;
    },
    /**
    * Apply a new config to the Loader instance
    * @method _config
    * @private
    * @param {Object} o The new configuration
    */
    _config: function(o) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_config", 5535);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5536);
var i, j, val, a, f, group, groupName, self = this;
        // apply config values
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5538);
if (o) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5539);
for (i in o) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5540);
if (o.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5541);
val = o[i];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5542);
if (i == 'require') {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5543);
self.require(val);
                    } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5544);
if (i == 'skin') {
                        //If the config.skin is a string, format to the expected object
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5546);
if (typeof val === 'string') {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5547);
self.skin.defaultSkin = o.skin;
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5548);
val = {
                                defaultSkin: val
                            };
                        }

                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5553);
Y.mix(self.skin, val, true);
                    } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5554);
if (i == 'groups') {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5555);
for (j in val) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5556);
if (val.hasOwnProperty(j)) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5557);
groupName = j;
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5558);
group = val[j];
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5559);
self.addGroup(group, groupName);
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5560);
if (group.aliases) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5561);
for (a in group.aliases) {
                                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5562);
if (group.aliases.hasOwnProperty(a)) {
                                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5563);
self.addAlias(group.aliases[a], a);
                                        }
                                    }
                                }
                            }
                        }

                    } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5570);
if (i == 'modules') {
                        // add a hash of module definitions
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5572);
for (j in val) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5573);
if (val.hasOwnProperty(j)) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5574);
self.addModule(val[j], j);
                            }
                        }
                    } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5577);
if (i === 'aliases') {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5578);
for (j in val) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5579);
if (val.hasOwnProperty(j)) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5580);
self.addAlias(val[j], j);
                            }
                        }
                    } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5583);
if (i == 'gallery') {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5584);
this.groups.gallery.update(val, o);
                    } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5585);
if (i == 'yui2' || i == '2in3') {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5586);
this.groups.yui2.update(o['2in3'], o.yui2, o);
                    } else {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5588);
self[i] = val;
                    }}}}}}}
                }
            }
        }

        // fix filter
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5595);
f = self.filter;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5597);
if (L.isString(f)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5598);
f = f.toUpperCase();
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5599);
self.filterName = f;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5600);
self.filter = self.FILTER_DEFS[f];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5601);
if (f == 'DEBUG') {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5602);
self.require('yui-log', 'dump');
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5606);
if (self.filterName && self.coverage) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5607);
if (self.filterName == 'COVERAGE' && L.isArray(self.coverage) && self.coverage.length) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5608);
var mods = [];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5609);
for (i = 0; i < self.coverage.length; i++) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5610);
var mod = self.coverage[i];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5611);
if (self.moduleInfo[mod] && self.moduleInfo[mod].use) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5612);
mods = [].concat(mods, self.moduleInfo[mod].use);
                    } else {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5614);
mods.push(mod);
                    }
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5617);
self.filters = self.filters || {};
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5618);
Y.Array.each(mods, function(mod) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 35)", 5618);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5619);
self.filters[mod] = self.FILTER_DEFS.COVERAGE;
                });
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5621);
self.filterName = 'RAW';
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5622);
self.filter = self.FILTER_DEFS[self.filterName];
            }
        }
        

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5627);
if (self.lang) {
            //Removed this so that when Loader is invoked
            //it doesn't request what it doesn't need.
            //self.require('intl-base', 'intl');
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "formatSkin", 5644);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5645);
var s = SKIN_PREFIX + skin;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5646);
if (mod) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5647);
s = s + '-' + mod;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5650);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_addSkin", 5663);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5664);
var mdef, pkg, name, nmod,
            info = this.moduleInfo,
            sinf = this.skin,
            ext = info[mod] && info[mod].ext;

        // Add a module definition for the module-specific skin css
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5670);
if (mod) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5671);
name = this.formatSkin(skin, mod);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5672);
if (!info[name]) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5673);
mdef = info[mod];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5674);
pkg = mdef.pkg || mod;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5675);
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
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5685);
if (mdef.base) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5686);
nmod.base = mdef.base;
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5688);
if (mdef.configFn) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5689);
nmod.configFn = mdef.configFn;
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5691);
this.addModule(nmod, name);

            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5696);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "addAlias", 5711);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5712);
YUI.Env.aliases[name] = use;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5713);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "addGroup", 5741);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5742);
var mods = o.modules,
            self = this, i, v;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5745);
name = name || o.name;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5746);
o.name = name;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5747);
self.groups[name] = o;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5749);
if (o.patterns) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5750);
for (i in o.patterns) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5751);
if (o.patterns.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5752);
o.patterns[i].group = name;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5753);
self.patterns[i] = o.patterns[i];
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5758);
if (mods) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5759);
for (i in mods) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5760);
if (mods.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5761);
v = mods[i];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5762);
if (typeof v === 'string') {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5763);
v = { name: i, fullpath: v };
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5765);
v.group = name;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5766);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "addModule", 5802);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5803);
name = name || o.name;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5805);
if (typeof o === 'string') {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5806);
o = { name: name, fullpath: o };
        }
        
        //Only merge this data if the temp flag is set
        //from an earlier pass from a pattern or else
        //an override module (YUI_config) can not be used to
        //replace a default module.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5813);
if (this.moduleInfo[name] && this.moduleInfo[name].temp) {
            //This catches temp modules loaded via a pattern
            // The module will be added twice, once from the pattern and
            // Once from the actual add call, this ensures that properties
            // that were added to the module the first time around (group: gallery)
            // are also added the second time around too.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5819);
o = Y.merge(this.moduleInfo[name], o);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5822);
o.name = name;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5824);
if (!o || !o.name) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5825);
return null;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5828);
if (!o.type) {
            //Always assume it's javascript unless the CSS pattern is matched.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5830);
o.type = JS;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5831);
var p = o.path || o.fullpath;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5832);
if (p && this.REGEX_CSS.test(p)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5833);
o.type = CSS;
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5837);
if (!o.path && !o.fullpath) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5838);
o.path = _path(name, name, o.type);
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5840);
o.supersedes = o.supersedes || o.use;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5842);
o.ext = ('ext' in o) ? o.ext : (this._internal) ? false : true;

        // Handle submodule logic
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5845);
var subs = o.submodules, i, l, t, sup, s, smod, plugins, plug,
            j, langs, packName, supName, flatSup, flatLang, lang, ret,
            overrides, skinname, when, g,
            conditions = this.conditions, trigger;
            // , existing = this.moduleInfo[name], newr;
        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5851);
this.moduleInfo[name] = o;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5853);
o.requires = o.requires || [];
        
        /*
        Only allowing the cascade of requires information, since
        optional and supersedes are far more fine grained than
        a blanket requires is.
        */
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5860);
if (this.requires) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5861);
for (i = 0; i < this.requires.length; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5862);
o.requires.push(this.requires[i]);
            }
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5865);
if (o.group && this.groups && this.groups[o.group]) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5866);
g = this.groups[o.group];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5867);
if (g.requires) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5868);
for (i = 0; i < g.requires.length; i++) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5869);
o.requires.push(g.requires[i]);
                }
            }
        }


        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5875);
if (!o.defaults) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5876);
o.defaults = {
                requires: o.requires ? [].concat(o.requires) : null,
                supersedes: o.supersedes ? [].concat(o.supersedes) : null,
                optional: o.optional ? [].concat(o.optional) : null
            };
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5883);
if (o.skinnable && o.ext && o.temp) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5884);
skinname = this._addSkin(this.skin.defaultSkin, name);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5885);
o.requires.unshift(skinname);
        }
        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5888);
if (o.requires.length) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5889);
o.requires = this.filterRequires(o.requires) || [];
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5892);
if (!o.langPack && o.lang) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5893);
langs = YArray(o.lang);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5894);
for (j = 0; j < langs.length; j++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5895);
lang = langs[j];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5896);
packName = this.getLangPackName(lang, name);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5897);
smod = this.moduleInfo[packName];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5898);
if (!smod) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5899);
smod = this._addLangPack(lang, o, packName);
                }
            }
        }


        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5905);
if (subs) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5906);
sup = o.supersedes || [];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5907);
l = 0;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5909);
for (i in subs) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5910);
if (subs.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5911);
s = subs[i];

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5913);
s.path = s.path || _path(name, i, o.type);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5914);
s.pkg = name;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5915);
s.group = o.group;

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5917);
if (s.supersedes) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5918);
sup = sup.concat(s.supersedes);
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5921);
smod = this.addModule(s, i);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5922);
sup.push(i);

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5924);
if (smod.skinnable) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5925);
o.skinnable = true;
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5926);
overrides = this.skin.overrides;
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5927);
if (overrides && overrides[i]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5928);
for (j = 0; j < overrides[i].length; j++) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5929);
skinname = this._addSkin(overrides[i][j],
                                         i, name);
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5931);
sup.push(skinname);
                            }
                        }
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5934);
skinname = this._addSkin(this.skin.defaultSkin,
                                        i, name);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5936);
sup.push(skinname);
                    }

                    // looks like we are expected to work out the metadata
                    // for the parent module language packs from what is
                    // specified in the child modules.
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5942);
if (s.lang && s.lang.length) {

                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5944);
langs = YArray(s.lang);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5945);
for (j = 0; j < langs.length; j++) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5946);
lang = langs[j];
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5947);
packName = this.getLangPackName(lang, name);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5948);
supName = this.getLangPackName(lang, i);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5949);
smod = this.moduleInfo[packName];

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5951);
if (!smod) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5952);
smod = this._addLangPack(lang, o, packName);
                            }

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5955);
flatSup = flatSup || YArray.hash(smod.supersedes);

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5957);
if (!(supName in flatSup)) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5958);
smod.supersedes.push(supName);
                            }

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5961);
o.lang = o.lang || [];

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5963);
flatLang = flatLang || YArray.hash(o.lang);

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5965);
if (!(lang in flatLang)) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5966);
o.lang.push(lang);
                            }

// Add rollup file, need to add to supersedes list too

                            // default packages
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5972);
packName = this.getLangPackName(ROOT_LANG, name);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5973);
supName = this.getLangPackName(ROOT_LANG, i);

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5975);
smod = this.moduleInfo[packName];

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5977);
if (!smod) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5978);
smod = this._addLangPack(lang, o, packName);
                            }

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5981);
if (!(supName in flatSup)) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5982);
smod.supersedes.push(supName);
                            }

// Add rollup file, need to add to supersedes list too

                        }
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5990);
l++;
                }
            }
            //o.supersedes = YObject.keys(YArray.hash(sup));
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5994);
o.supersedes = YArray.dedupe(sup);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5995);
if (this.allowRollup) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 5996);
o.rollup = (l < 4) ? l : Math.min(l - 1, 4);
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6000);
plugins = o.plugins;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6001);
if (plugins) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6002);
for (i in plugins) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6003);
if (plugins.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6004);
plug = plugins[i];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6005);
plug.pkg = name;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6006);
plug.path = plug.path || _path(name, i, o.type);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6007);
plug.requires = plug.requires || [];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6008);
plug.group = o.group;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6009);
this.addModule(plug, i);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6010);
if (o.skinnable) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6011);
this._addSkin(this.skin.defaultSkin, i, name);
                    }

                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6018);
if (o.condition) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6019);
t = o.condition.trigger;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6020);
if (YUI.Env.aliases[t]) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6021);
t = YUI.Env.aliases[t];
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6023);
if (!Y.Lang.isArray(t)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6024);
t = [t];
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6027);
for (i = 0; i < t.length; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6028);
trigger = t[i];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6029);
when = o.condition.when;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6030);
conditions[trigger] = conditions[trigger] || {};
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6031);
conditions[trigger][name] = o.condition;
                // the 'when' attribute can be 'before', 'after', or 'instead'
                // the default is after.
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6034);
if (when && when != 'after') {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6035);
if (when == 'instead') { // replace the trigger
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6036);
o.supersedes = o.supersedes || [];
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6037);
o.supersedes.push(trigger);
                    } else { // before the trigger
                        // the trigger requires the conditional mod,
                        // so it should appear before the conditional
                        // mod if we do not intersede.
                    }
                } else { // after the trigger
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6044);
o.after = o.after || [];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6045);
o.after.push(trigger);
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6050);
if (o.supersedes) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6051);
o.supersedes = this.filterRequires(o.supersedes);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6054);
if (o.after) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6055);
o.after = this.filterRequires(o.after);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6056);
o.after_map = YArray.hash(o.after);
        }

        // this.dirty = true;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6061);
if (o.configFn) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6062);
ret = o.configFn(o);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6063);
if (ret === false) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6064);
delete this.moduleInfo[name];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6065);
delete GLOBAL_ENV._renderedMods[name];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6066);
o = null;
            }
        }
        //Add to global cache
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6070);
if (o) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6071);
if (!GLOBAL_ENV._renderedMods) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6072);
GLOBAL_ENV._renderedMods = {};
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6074);
GLOBAL_ENV._renderedMods[name] = Y.mix(GLOBAL_ENV._renderedMods[name] || {}, o);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6075);
GLOBAL_ENV._conditions = conditions;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6078);
return o;
    },

    /**
     * Add a requirement for one or more module
     * @method require
     * @param {string[] | string*} what the modules to load.
     */
    require: function(what) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "require", 6086);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6087);
var a = (typeof what === 'string') ? YArray(arguments) : what;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6088);
this.dirty = true;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6089);
this.required = Y.merge(this.required, YArray.hash(this.filterRequires(a)));

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6091);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_explodeRollups", 6102);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6103);
var self = this, m, m2, i, a, v, len, len2,
        r = self.required;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6106);
if (!self.allowRollup) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6107);
for (i in r) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6108);
if (r.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6109);
m = self.getModule(i);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6110);
if (m && m.use) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6111);
len = m.use.length;
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6112);
for (a = 0; a < len; a++) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6113);
m2 = self.getModule(m.use[a]);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6114);
if (m2 && m2.use) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6115);
len2 = m2.use.length;
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6116);
for (v = 0; v < len2; v++) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6117);
r[m2.use[v]] = true;
                                }
                            } else {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6120);
r[m.use[a]] = true;
                            }
                        }
                    }
                }
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6126);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "filterRequires", 6136);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6137);
if (r) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6138);
if (!Y.Lang.isArray(r)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6139);
r = [r];
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6141);
r = Y.Array(r);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6142);
var c = [], i, mod, o, m;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6144);
for (i = 0; i < r.length; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6145);
mod = this.getModule(r[i]);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6146);
if (mod && mod.use) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6147);
for (o = 0; o < mod.use.length; o++) {
                        //Must walk the other modules in case a module is a rollup of rollups (datatype)
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6149);
m = this.getModule(mod.use[o]);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6150);
if (m && m.use) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6151);
c = Y.Array.dedupe([].concat(c, this.filterRequires(m.use)));
                        } else {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6153);
c.push(mod.use[o]);
                        }
                    }
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6157);
c.push(r[i]);
                }
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6160);
r = c;
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6162);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "getRequires", 6171);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6173);
if (!mod) {
            //console.log('returning no reqs for ' + mod.name);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6175);
return NO_REQUIREMENTS;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6178);
if (mod._parsed) {
            //console.log('returning requires for ' + mod.name, mod.requires);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6180);
return mod.expanded || NO_REQUIREMENTS;
        }

        //TODO add modue cache here out of scope..

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6185);
var i, m, j, add, packName, lang, testresults = this.testresults,
            name = mod.name, cond,
            adddef = ON_PAGE[name] && ON_PAGE[name].details,
            d, k, m1, go, def,
            r, old_mod,
            o, skinmod, skindef, skinpar, skinname,
            intl = mod.lang || mod.intl,
            info = this.moduleInfo,
            ftests = Y.Features && Y.Features.tests.load,
            hash, reparse;

        // console.log(name);

        // pattern match leaves module stub that needs to be filled out
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6199);
if (mod.temp && adddef) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6200);
old_mod = mod;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6201);
mod = this.addModule(adddef, name);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6202);
mod.group = old_mod.group;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6203);
mod.pkg = old_mod.pkg;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6204);
delete mod.expanded;
        }

        // console.log('cache: ' + mod.langCache + ' == ' + this.lang);
        
        //If a skin or a lang is different, reparse..
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6210);
reparse = !((!this.lang || mod.langCache === this.lang) && (mod.skinCache === this.skin.defaultSkin));

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6212);
if (mod.expanded && !reparse) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6213);
return mod.expanded;
        }
        

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6217);
d = [];
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6218);
hash = {};
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6219);
r = this.filterRequires(mod.requires);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6220);
if (mod.lang) {
            //If a module has a lang attribute, auto add the intl requirement.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6222);
d.unshift('intl');
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6223);
r.unshift('intl');
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6224);
intl = true;
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6226);
o = this.filterRequires(mod.optional);


        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6229);
mod._parsed = true;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6230);
mod.langCache = this.lang;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6231);
mod.skinCache = this.skin.defaultSkin;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6233);
for (i = 0; i < r.length; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6234);
if (!hash[r[i]]) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6235);
d.push(r[i]);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6236);
hash[r[i]] = true;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6237);
m = this.getModule(r[i]);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6238);
if (m) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6239);
add = this.getRequires(m);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6240);
intl = intl || (m.expanded_map &&
                        (INTL in m.expanded_map));
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6242);
for (j = 0; j < add.length; j++) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6243);
d.push(add[j]);
                    }
                }
            }
        }

        // get the requirements from superseded modules, if any
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6250);
r = this.filterRequires(mod.supersedes);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6251);
if (r) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6252);
for (i = 0; i < r.length; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6253);
if (!hash[r[i]]) {
                    // if this module has submodules, the requirements list is
                    // expanded to include the submodules.  This is so we can
                    // prevent dups when a submodule is already loaded and the
                    // parent is requested.
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6258);
if (mod.submodules) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6259);
d.push(r[i]);
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6262);
hash[r[i]] = true;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6263);
m = this.getModule(r[i]);

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6265);
if (m) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6266);
add = this.getRequires(m);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6267);
intl = intl || (m.expanded_map &&
                            (INTL in m.expanded_map));
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6269);
for (j = 0; j < add.length; j++) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6270);
d.push(add[j]);
                        }
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6277);
if (o && this.loadOptional) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6278);
for (i = 0; i < o.length; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6279);
if (!hash[o[i]]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6280);
d.push(o[i]);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6281);
hash[o[i]] = true;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6282);
m = info[o[i]];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6283);
if (m) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6284);
add = this.getRequires(m);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6285);
intl = intl || (m.expanded_map &&
                            (INTL in m.expanded_map));
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6287);
for (j = 0; j < add.length; j++) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6288);
d.push(add[j]);
                        }
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6295);
cond = this.conditions[name];

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6297);
if (cond) {
            //Set the module to not parsed since we have conditionals and this could change the dependency tree.
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6299);
mod._parsed = false;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6300);
if (testresults && ftests) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6301);
oeach(testresults, function(result, id) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 36)", 6301);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6302);
var condmod = ftests[id].name;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6303);
if (!hash[condmod] && ftests[id].trigger == name) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6304);
if (result && ftests[id]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6305);
hash[condmod] = true;
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6306);
d.push(condmod);
                        }
                    }
                });
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6311);
for (i in cond) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6312);
if (cond.hasOwnProperty(i)) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6313);
if (!hash[i]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6314);
def = cond[i];
                            //first see if they've specfied a ua check
                            //then see if they've got a test fn & if it returns true
                            //otherwise just having a condition block is enough
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6318);
go = def && ((!def.ua && !def.test) || (def.ua && Y.UA[def.ua]) ||
                                        (def.test && def.test(Y, r)));

                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6321);
if (go) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6322);
hash[i] = true;
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6323);
d.push(i);
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6324);
m = this.getModule(i);
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6325);
if (m) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6326);
add = this.getRequires(m);
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6327);
for (j = 0; j < add.length; j++) {
                                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6328);
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
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6340);
if (mod.skinnable) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6341);
skindef = this.skin.overrides;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6342);
for (i in YUI.Env.aliases) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6343);
if (YUI.Env.aliases.hasOwnProperty(i)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6344);
if (Y.Array.indexOf(YUI.Env.aliases[i], name) > -1) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6345);
skinpar = i;
                    }
                }
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6349);
if (skindef && (skindef[name] || (skinpar && skindef[skinpar]))) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6350);
skinname = name;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6351);
if (skindef[skinpar]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6352);
skinname = skinpar;
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6354);
for (i = 0; i < skindef[skinname].length; i++) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6355);
skinmod = this._addSkin(skindef[skinname][i], name);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6356);
if (!this.isCSSLoaded(skinmod, this._boot)) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6357);
d.push(skinmod);
                    }
                }
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6361);
skinmod = this._addSkin(this.skin.defaultSkin, name);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6362);
if (!this.isCSSLoaded(skinmod, this._boot)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6363);
d.push(skinmod);
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6368);
mod._parsed = false;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6370);
if (intl) {

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6372);
if (mod.lang && !mod.langPack && Y.Intl) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6373);
lang = Y.Intl.lookupBestLang(this.lang || ROOT_LANG, mod.lang);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6374);
packName = this.getLangPackName(lang, name);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6375);
if (packName) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6376);
d.unshift(packName);
                }
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6379);
d.unshift(INTL);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6382);
mod.expanded_map = YArray.hash(d);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6384);
mod.expanded = YObject.keys(mod.expanded_map);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6386);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "isCSSLoaded", 6394);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6396);
if (!name || !YUI.Env.cssStampEl || (!skip && this.ignoreRegistered)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6397);
return false;
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6399);
var el = YUI.Env.cssStampEl,
            ret = false,
            mod = YUI.Env._cssLoaded[name],
            style = el.currentStyle; //IE

        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6405);
if (mod !== undefined) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6406);
return mod;
        }

        //Add the classname to the element
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6410);
el.className = name;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6412);
if (!style) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6413);
style = Y.config.doc.defaultView.getComputedStyle(el, null);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6416);
if (style && style.display === 'none') {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6417);
ret = true;
        }


        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6421);
el.className = ''; //Reset the classname to ''

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6423);
YUI.Env._cssLoaded[name] = ret;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6425);
return ret;
    },

    /**
     * Returns a hash of module names the supplied module satisfies.
     * @method getProvides
     * @param {string} name The name of the module.
     * @return {object} what this module provides.
     */
    getProvides: function(name) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "getProvides", 6434);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6435);
var m = this.getModule(name), o, s;
            // supmap = this.provides;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6438);
if (!m) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6439);
return NOT_FOUND;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6442);
if (m && !m.provides) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6443);
o = {};
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6444);
s = m.supersedes;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6446);
if (s) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6447);
YArray.each(s, function(v) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 37)", 6447);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6448);
Y.mix(o, this.getProvides(v));
                }, this);
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6452);
o[name] = true;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6453);
m.provides = o;

        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6457);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "calculate", 6467);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6468);
if (o || type || this.dirty) {

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6470);
if (o) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6471);
this._config(o);
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6474);
if (!this._init) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6475);
this._setup();
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6478);
this._explode();

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6480);
if (this.allowRollup) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6481);
this._rollup();
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6483);
this._explodeRollups();
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6485);
this._reduce();
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6486);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_addLangPack", 6498);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6499);
var name = m.name,
            packPath, conf,
            existing = this.moduleInfo[packName];

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6503);
if (!existing) {

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6505);
packPath = _path((m.pkg || name), packName, JS, true);

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6507);
conf = {
                path: packPath,
                intl: true,
                langPack: true,
                ext: m.ext,
                group: m.group,
                supersedes: []
            };
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6515);
if (m.root) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6516);
conf.root = m.root;
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6518);
if (m.base) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6519);
conf.base = m.base;
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6522);
if (m.configFn) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6523);
conf.configFn = m.configFn;
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6526);
this.addModule(conf, packName);

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6528);
if (lang) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6529);
Y.Env.lang = Y.Env.lang || {};
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6530);
Y.Env.lang[lang] = Y.Env.lang[lang] || {};
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6531);
Y.Env.lang[lang][name] = true;
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6535);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_setup", 6545);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6546);
var info = this.moduleInfo, name, i, j, m, l,
            packName;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6549);
for (name in info) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6550);
if (info.hasOwnProperty(name)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6551);
m = info[name];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6552);
if (m) {

                    // remove dups
                    //m.requires = YObject.keys(YArray.hash(m.requires));
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6556);
m.requires = YArray.dedupe(m.requires);

                    // Create lang pack modules
                    //if (m.lang && m.lang.length) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6560);
if (m.lang) {
                        // Setup root package if the module has lang defined,
                        // it needs to provide a root language pack
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6563);
packName = this.getLangPackName(ROOT_LANG, name);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6564);
this._addLangPack(null, m, packName);
                    }

                }
            }
        }


        //l = Y.merge(this.inserted);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6573);
l = {};

        // available modules
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6576);
if (!this.ignoreRegistered) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6577);
Y.mix(l, GLOBAL_ENV.mods);
        }

        // add the ignore list to the list of loaded packages
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6581);
if (this.ignore) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6582);
Y.mix(l, YArray.hash(this.ignore));
        }

        // expand the list to include superseded modules
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6586);
for (j in l) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6587);
if (l.hasOwnProperty(j)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6588);
Y.mix(l, this.getProvides(j));
            }
        }

        // remove modules on the force list from the loaded list
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6593);
if (this.force) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6594);
for (i = 0; i < this.force.length; i++) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6595);
if (this.force[i] in l) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6596);
delete l[this.force[i]];
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6601);
Y.mix(this.loaded, l);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6603);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "getLangPackName", 6613);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6614);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_explode", 6623);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6625);
var r = this.required, m, reqs, done = {},
            self = this, name;

        // the setup phase is over, all modules have been created
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6629);
self.dirty = false;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6631);
self._explodeRollups();
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6632);
r = self.required;
       
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6634);
for (name in r) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6635);
if (r.hasOwnProperty(name)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6636);
if (!done[name]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6637);
done[name] = true;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6638);
m = self.getModule(name);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6639);
if (m) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6640);
var expound = m.expound;

                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6642);
if (expound) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6643);
r[expound] = self.getModule(expound);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6644);
reqs = self.getRequires(r[expound]);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6645);
Y.mix(r, YArray.hash(reqs));
                        }

                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6648);
reqs = self.getRequires(m);
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6649);
Y.mix(r, YArray.hash(reqs));
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_patternTest", 6663);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6664);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "getModule", 6672);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6674);
if (!mname) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6675);
return null;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6678);
var p, found, pname,
            m = this.moduleInfo[mname],
            patterns = this.patterns;

        // check the patterns library to see if we should automatically add
        // the module with defaults
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6684);
if (!m || (m && m.ext)) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6685);
for (pname in patterns) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6686);
if (patterns.hasOwnProperty(pname)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6687);
p = patterns[pname];
                    
                    //There is no test method, create a default one that tests
                    // the pattern against the mod name
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6691);
if (!p.test) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6692);
p.test = this._patternTest;
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6695);
if (p.test(mname, pname)) {
                        // use the metadata supplied for the pattern
                        // as the module definition.
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6698);
found = p;
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6699);
break;
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6705);
if (!m) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6706);
if (found) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6707);
if (p.action) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6708);
p.action.call(this, mname, pname);
                } else {
                    // ext true or false?
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6711);
m = this.addModule(Y.merge(found), mname);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6712);
if (found.configFn) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6713);
m.configFn = found.configFn;
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6715);
m.temp = true;
                }
            }
        } else {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6719);
if (found && m && found.configFn && !m.configFn) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6720);
m.configFn = found.configFn;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6721);
m.configFn(m);
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6725);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_reduce", 6738);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6740);
r = r || this.required;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6742);
var i, j, s, m, type = this.loadType,
        ignore = this.ignore ? YArray.hash(this.ignore) : false;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6745);
for (i in r) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6746);
if (r.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6747);
m = this.getModule(i);
                // remove if already loaded
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6749);
if (((this.loaded[i] || ON_PAGE[i]) &&
                        !this.forceMap[i] && !this.ignoreRegistered) ||
                        (type && m && m.type != type)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6752);
delete r[i];
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6754);
if (ignore && ignore[i]) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6755);
delete r[i];
                }
                // remove anything this module supersedes
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6758);
s = m && m.supersedes;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6759);
if (s) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6760);
for (j = 0; j < s.length; j++) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6761);
if (s[j] in r) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6762);
delete r[s[j]];
                        }
                    }
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6769);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_finish", 6778);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6780);
_queue.running = false;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6782);
var onEnd = this.onEnd;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6783);
if (onEnd) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6784);
onEnd.call(this.context, {
                msg: msg,
                data: this.data,
                success: success
            });
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6790);
this._continue();
    },
    /**
    * The default Loader onSuccess handler, calls this.onSuccess with a payload
    * @method _onSuccess
    * @private
    */
    _onSuccess: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_onSuccess", 6797);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6798);
var self = this, skipped = Y.merge(self.skipped), fn,
            failed = [], rreg = self.requireRegistration,
            success, msg, i, mod;
        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6802);
for (i in skipped) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6803);
if (skipped.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6804);
delete self.inserted[i];
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6808);
self.skipped = {};
        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6810);
for (i in self.inserted) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6811);
if (self.inserted.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6812);
mod = self.getModule(i);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6813);
if (mod && rreg && mod.type == JS && !(i in YUI.Env.mods)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6814);
failed.push(i);
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6816);
Y.mix(self.loaded, self.getProvides(i));
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6821);
fn = self.onSuccess;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6822);
msg = (failed.length) ? 'notregistered' : 'success';
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6823);
success = !(failed.length);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6824);
if (fn) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6825);
fn.call(self.context, {
                msg: msg,
                data: self.data,
                success: success,
                failed: failed,
                skipped: skipped
            });
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6833);
self._finish(msg, success);
    },
    /**
    * The default Loader onProgress handler, calls this.onProgress with a payload
    * @method _onProgress
    * @private
    */
    _onProgress: function(e) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_onProgress", 6840);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6841);
var self = this;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6842);
if (self.onProgress) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6843);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_onFailure", 6854);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6855);
var f = this.onFailure, msg = [], i = 0, len = o.errors.length;
        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6857);
for (i; i < len; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6858);
msg.push(o.errors[i].error);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6861);
msg = msg.join(',');

        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6864);
if (f) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6865);
f.call(this.context, {
                msg: msg,
                data: this.data,
                success: false
            });
        }
        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6872);
this._finish(msg, false);

    },

    /**
    * The default Loader onTimeout handler, calls this.onTimeout with a payload
    * @method _onTimeout
    * @private
    */
    _onTimeout: function() {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_onTimeout", 6881);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6882);
var f = this.onTimeout;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6883);
if (f) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6884);
f.call(this.context, {
                msg: 'timeout',
                data: this.data,
                success: false
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_sort", 6897);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6900);
var s = YObject.keys(this.required),
            // loaded = this.loaded,
            //TODO Move this out of scope
            done = {},
            p = 0, l, a, b, j, k, moved, doneKey;

        // keep going until we make a pass without moving anything
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6907);
for (;;) {

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6909);
l = s.length;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6910);
moved = false;

            // start the loop after items that are already sorted
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6913);
for (j = p; j < l; j++) {

                // check the next module on the list to see if its
                // dependencies have been met
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6917);
a = s[j];

                // check everything below current item and move if we
                // find a requirement for the current item
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6921);
for (k = j + 1; k < l; k++) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6922);
doneKey = a + s[k];

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6924);
if (!done[doneKey] && this._requires(a, s[k])) {

                        // extract the dependency so we can move it up
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6927);
b = s.splice(k, 1);

                        // insert the dependency above the item that
                        // requires it
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6931);
s.splice(j, 0, b[0]);

                        // only swap two dependencies once to short circut
                        // circular dependencies
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6935);
done[doneKey] = true;

                        // keep working
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6938);
moved = true;

                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6940);
break;
                    }
                }

                // jump out of loop if we moved something
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6945);
if (moved) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6946);
break;
                // this item is sorted, move our pointer and keep going
                } else {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6949);
p++;
                }
            }

            // when we make it here and moved is false, we are
            // finished sorting
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6955);
if (!moved) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6956);
break;
            }

        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6961);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_insert", 6973);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6977);
if (source) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6978);
this._config(source);
        }

        // build the dependency list
        // don't include type so we can process CSS and script in
        // one pass when the type is not specified.
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6984);
if (!skipcalc) {
            //this.calculate(o);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6988);
var modules = this.resolve(!skipcalc),
            self = this, comp = 0, actions = 0;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6991);
if (type) {
            //Filter out the opposite type and reset the array so the checks later work
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6993);
modules[((type === JS) ? CSS : JS)] = [];
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6995);
if (modules.js.length) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6996);
comp++;
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6998);
if (modules.css.length) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 6999);
comp++;
        }

        //console.log('Resolved Modules: ', modules);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7004);
var complete = function(d) {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "complete", 7004);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7005);
actions++;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7006);
var errs = {}, i = 0, u = '', fn;

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7008);
if (d && d.errors) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7009);
for (i = 0; i < d.errors.length; i++) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7010);
if (d.errors[i].request) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7011);
u = d.errors[i].request.url;
                    } else {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7013);
u = d.errors[i];
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7015);
errs[u] = u;
                }
            }
            
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7019);
if (d && d.data && d.data.length && (d.type === 'success')) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7020);
for (i = 0; i < d.data.length; i++) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7021);
self.inserted[d.data[i].name] = true;
                }
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7025);
if (actions === comp) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7026);
self._loading = null;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7027);
if (d && d.fn) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7028);
fn = d.fn;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7029);
delete d.fn;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7030);
fn.call(self, d);
                }
            }
        };

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7035);
this._loading = true;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7037);
if (!modules.js.length && !modules.css.length) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7038);
actions = -1;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7039);
complete({
                fn: self._onSuccess
            });
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7042);
return;
        }
        

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7046);
if (modules.css.length) { //Load CSS first
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7047);
Y.Get.css(modules.css, {
                data: modules.cssMods,
                attributes: self.cssAttributes,
                insertBefore: self.insertBefore,
                charset: self.charset,
                timeout: self.timeout,
                context: self,
                onProgress: function(e) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onProgress", 7054);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7055);
self._onProgress.call(self, e);
                },
                onTimeout: function(d) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onTimeout", 7057);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7058);
self._onTimeout.call(self, d);
                },
                onSuccess: function(d) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onSuccess", 7060);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7061);
d.type = 'success';
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7062);
d.fn = self._onSuccess;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7063);
complete.call(self, d);
                },
                onFailure: function(d) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onFailure", 7065);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7066);
d.type = 'failure';
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7067);
d.fn = self._onFailure;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7068);
complete.call(self, d);
                }
            });
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7073);
if (modules.js.length) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7074);
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
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onProgress", 7083);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7084);
self._onProgress.call(self, e);
                },
                onTimeout: function(d) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onTimeout", 7086);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7087);
self._onTimeout.call(self, d);
                },
                onSuccess: function(d) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onSuccess", 7089);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7090);
d.type = 'success';
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7091);
d.fn = self._onSuccess;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7092);
complete.call(self, d);
                },
                onFailure: function(d) {
                    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onFailure", 7094);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7095);
d.type = 'failure';
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7096);
d.fn = self._onFailure;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7097);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_continue", 7107);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7108);
if (!(_queue.running) && _queue.size() > 0) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7109);
_queue.running = true;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7110);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "insert", 7122);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7123);
var self = this, copy = Y.merge(this);
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7124);
delete copy.require;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7125);
delete copy.dirty;
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7126);
_queue.add(function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 38)", 7126);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7127);
self._insert(copy, o, type, skipsort);
        });
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7129);
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
    loadNext: function(mname) {
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "loadNext", 7143);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7144);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_filter", 7156);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7157);
var f = this.filter,
            hasFilter = name && (name in this.filters),
            modFilter = hasFilter && this.filters[name],
            groupName = group || (this.moduleInfo[name] ? this.moduleInfo[name].group : null);

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7162);
if (groupName && this.groups[groupName] && this.groups[groupName].filter) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7163);
modFilter = this.groups[groupName].filter;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7164);
hasFilter = true;
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7167);
if (u) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7168);
if (hasFilter) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7169);
f = (L.isString(modFilter)) ? this.FILTER_DEFS[modFilter.toUpperCase()] || null : modFilter;
            }
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7171);
if (f) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7172);
u = u.replace(new RegExp(f.searchExp, 'g'), f.replaceStr);
            }
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7175);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_url", 7187);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7188);
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

        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "resolve", 7209);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7211);
var len, i, m, url, fn, msg, attr, group, groupName, j, frag,
            comboSource, comboSources, mods, comboBase,
            base, urls, u = [], tmpBase, baseLen, resCombos = {},
            self = this, comboSep, maxURLLength, singles = [],
            inserted = (self.ignoreRegistered) ? {} : self.inserted,
            resolved = { js: [], jsMods: [], css: [], cssMods: [] },
            type = self.loadType || 'js';

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7219);
if (self.skin.overrides || self.skin.defaultSkin !== DEFAULT_SKIN || self.ignoreRegistered) { 
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7220);
self._resetModules();
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7223);
if (calc) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7224);
self.calculate();
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7226);
s = s || self.sorted;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7228);
var addSingle = function(m) {
            
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "addSingle", 7228);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7230);
if (m) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7231);
group = (m.group && self.groups[m.group]) || NOT_FOUND;
                
                //Always assume it's async
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7234);
if (group.async === false) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7235);
m.async = group.async;
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7238);
url = (m.fullpath) ? self._filter(m.fullpath, s[i]) :
                      self._url(m.path, s[i], group.base || m.base);
                
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7241);
if (m.attributes || m.async === false) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7242);
url = {
                        url: url,
                        async: m.async
                    };
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7246);
if (m.attributes) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7247);
url.attributes = m.attributes;
                    }
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7250);
resolved[m.type].push(url);
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7251);
resolved[m.type + 'Mods'].push(m);
            } else {
            }
            
        };

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7257);
len = s.length;

        // the default combo base
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7260);
comboBase = self.comboBase;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7262);
url = comboBase;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7264);
comboSources = {};

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7266);
for (i = 0; i < len; i++) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7267);
comboSource = comboBase;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7268);
m = self.getModule(s[i]);
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7269);
groupName = m && m.group;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7270);
group = self.groups[groupName];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7271);
if (groupName && group) {

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7273);
if (!group.combine || m.fullpath) {
                    //This is not a combo module, skip it and load it singly later.
                    //singles.push(s[i]);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7276);
addSingle(m);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7277);
continue;
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7279);
m.combine = true;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7280);
if (group.comboBase) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7281);
comboSource = group.comboBase;
                }

                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7284);
if ("root" in group && L.isValue(group.root)) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7285);
m.root = group.root;
                }
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7287);
m.comboSep = group.comboSep || self.comboSep;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7288);
m.maxURLLength = group.maxURLLength || self.maxURLLength;
            } else {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7290);
if (!self.combine) {
                    //This is not a combo module, skip it and load it singly later.
                    //singles.push(s[i]);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7293);
addSingle(m);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7294);
continue;
                }
            }

            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7298);
comboSources[comboSource] = comboSources[comboSource] || [];
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7299);
comboSources[comboSource].push(m);
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7302);
for (j in comboSources) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7303);
if (comboSources.hasOwnProperty(j)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7304);
resCombos[j] = resCombos[j] || { js: [], jsMods: [], css: [], cssMods: [] };
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7305);
url = j;
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7306);
mods = comboSources[j];
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7307);
len = mods.length;
                
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7309);
if (len) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7310);
for (i = 0; i < len; i++) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7311);
if (inserted[mods[i]]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7312);
continue;
                        }
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7314);
m = mods[i];
                        // Do not try to combine non-yui JS unless combo def
                        // is found
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7317);
if (m && (m.combine || !m.ext)) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7318);
resCombos[j].comboSep = m.comboSep;
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7319);
resCombos[j].group = m.group;
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7320);
resCombos[j].maxURLLength = m.maxURLLength;
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7321);
frag = ((L.isValue(m.root)) ? m.root : self.root) + (m.path || m.fullpath);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7322);
frag = self._filter(frag, m.name);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7323);
resCombos[j][m.type].push(frag);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7324);
resCombos[j][m.type + 'Mods'].push(m);
                        } else {
                            //Add them to the next process..
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7327);
if (mods[i]) {
                                //singles.push(mods[i].name);
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7329);
addSingle(mods[i]);
                            }
                        }

                    }
                }
            }
        }


        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7339);
for (j in resCombos) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7340);
base = j;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7341);
comboSep = resCombos[base].comboSep || self.comboSep;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7342);
maxURLLength = resCombos[base].maxURLLength || self.maxURLLength;
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7343);
for (type in resCombos[base]) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7344);
if (type === JS || type === CSS) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7345);
urls = resCombos[base][type];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7346);
mods = resCombos[base][type + 'Mods'];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7347);
len = urls.length;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7348);
tmpBase = base + urls.join(comboSep);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7349);
baseLen = tmpBase.length;
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7350);
if (maxURLLength <= base.length) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7351);
maxURLLength = MAX_URL_LENGTH;
                    }
                    
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7354);
if (len) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7355);
if (baseLen > maxURLLength) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7356);
u = [];
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7357);
for (s = 0; s < len; s++) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7358);
u.push(urls[s]);
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7359);
tmpBase = base + u.join(comboSep);

                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7361);
if (tmpBase.length > maxURLLength) {
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7362);
m = u.pop();
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7363);
tmpBase = base + u.join(comboSep);
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7364);
resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7365);
u = [];
                                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7366);
if (m) {
                                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7367);
u.push(m);
                                    }
                                }
                            }
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7371);
if (u.length) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7372);
tmpBase = base + u.join(comboSep);
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7373);
resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));
                            }
                        } else {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7376);
resolved[type].push(self._filter(tmpBase, null, resCombos[base].group));
                        }
                    }
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7379);
resolved[type + 'Mods'] = resolved[type + 'Mods'].concat(mods);
                }
            }
        }

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7384);
resCombos = null;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7386);
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
        _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "load", 7408);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7409);
if (!cb) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7410);
return;
        }
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7412);
var self = this,
            out = self.resolve(true);
        
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7415);
self.data = out;

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7417);
self.onEnd = function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "onEnd", 7417);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7418);
cb.apply(self.context || self, arguments);
        };

        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7421);
self.insert();
    }
};



}, '@VERSION@' ,{requires:['get', 'features']});
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7428);
YUI.add('loader-rollup', function(Y) {

/**
 * Optional automatic rollup logic for reducing http connections
 * when not using a combo service.
 * @module loader
 * @submodule rollup
 */

/**
 * Look for rollup packages to determine if all of the modules a
 * rollup supersedes are required.  If so, include the rollup to
 * help reduce the total number of connections required.  Called
 * by calculate().  This is an optional feature, and requires the
 * appropriate submodule to function.
 * @method _rollup
 * @for Loader
 * @private
 */
_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 39)", 7428);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7447);
Y.Loader.prototype._rollup = function() {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "_rollup", 7447);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7448);
var i, j, m, s, r = this.required, roll,
        info = this.moduleInfo, rolled, c, smod;

    // find and cache rollup modules
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7452);
if (this.dirty || !this.rollups) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7453);
this.rollups = {};
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7454);
for (i in info) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7455);
if (info.hasOwnProperty(i)) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7456);
m = this.getModule(i);
                // if (m && m.rollup && m.supersedes) {
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7458);
if (m && m.rollup) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7459);
this.rollups[i] = m;
                }
            }
        }
    }

    // make as many passes as needed to pick up rollup rollups
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7466);
for (;;) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7467);
rolled = false;

        // go through the rollup candidates
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7470);
for (i in this.rollups) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7471);
if (this.rollups.hasOwnProperty(i)) {
                // there can be only one, unless forced
                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7473);
if (!r[i] && ((!this.loaded[i]) || this.forceMap[i])) {
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7474);
m = this.getModule(i);
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7475);
s = m.supersedes || [];
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7476);
roll = false;

                    // @TODO remove continue
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7479);
if (!m.rollup) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7480);
continue;
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7483);
c = 0;

                    // check the threshold
                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7486);
for (j = 0; j < s.length; j++) {
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7487);
smod = info[s[j]];

                        // if the superseded module is loaded, we can't
                        // load the rollup unless it has been forced.
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7491);
if (this.loaded[s[j]] && !this.forceMap[s[j]]) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7492);
roll = false;
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7493);
break;
                        // increment the counter if this module is required.
                        // if we are beyond the rollup threshold, we will
                        // use the rollup module
                        } else {_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7497);
if (r[s[j]] && m.type == smod.type) {
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7498);
c++;
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7499);
roll = (c >= m.rollup);
                            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7500);
if (roll) {
                                _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7501);
break;
                            }
                        }}
                    }

                    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7506);
if (roll) {
                        // add the rollup
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7508);
r[i] = true;
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7509);
rolled = true;

                        // expand the rollup's dependencies
                        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7512);
this.getRequires(m);
                    }
                }
            }
        }

        // if we made it here w/o rolling up something, we are done
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7519);
if (!rolled) {
            _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7520);
break;
        }
    }
};


}, '@VERSION@' ,{requires:['loader-base']});
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7527);
YUI.add('loader-yui3', function(Y) {

/* This file is auto-generated by src/loader/scripts/meta_join.js */

/**
 * YUI 3 module metadata
 * @module loader
 * @submodule yui3
 */
_yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "(anonymous 40)", 7527);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7536);
YUI.Env[Y.version].modules = YUI.Env[Y.version].modules || {
    "align-plugin": {
        "requires": [
            "node-screen",
            "node-pluginhost"
        ]
    },
    "anim": {
        "use": [
            "anim-base",
            "anim-color",
            "anim-curve",
            "anim-easing",
            "anim-node-plugin",
            "anim-scroll",
            "anim-xy"
        ]
    },
    "anim-base": {
        "requires": [
            "base-base",
            "node-style"
        ]
    },
    "anim-color": {
        "requires": [
            "anim-base"
        ]
    },
    "anim-curve": {
        "requires": [
            "anim-xy"
        ]
    },
    "anim-easing": {
        "requires": [
            "anim-base"
        ]
    },
    "anim-node-plugin": {
        "requires": [
            "node-pluginhost",
            "anim-base"
        ]
    },
    "anim-scroll": {
        "requires": [
            "anim-base"
        ]
    },
    "anim-shape-transform": {
        "requires": [
            "anim-base",
            "anim-easing",
            "matrix"
        ]
    },
    "anim-xy": {
        "requires": [
            "anim-base",
            "node-screen"
        ]
    },
    "app": {
        "use": [
            "app-base",
            "app-content",
            "app-transitions",
            "lazy-model-list",
            "model",
            "model-list",
            "model-sync-rest",
            "router",
            "view",
            "view-node-map"
        ]
    },
    "app-base": {
        "requires": [
            "classnamemanager",
            "pjax-base",
            "router",
            "view"
        ]
    },
    "app-content": {
        "requires": [
            "app-base",
            "pjax-content"
        ]
    },
    "app-transitions": {
        "requires": [
            "app-base"
        ]
    },
    "app-transitions-css": {
        "type": "css"
    },
    "app-transitions-native": {
        "condition": {
            "name": "app-transitions-native",
            "test": function (Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 7638);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7639);
var doc  = Y.config.doc,
        node = doc ? doc.documentElement : null;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7642);
if (node && node.style) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7643);
return ('MozTransition' in node.style || 'WebkitTransition' in node.style);
    }

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7646);
return false;
},
            "trigger": "app-transitions"
        },
        "requires": [
            "app-transitions",
            "app-transitions-css",
            "parallel",
            "transition"
        ]
    },
    "array-extras": {
        "requires": [
            "yui-base"
        ]
    },
    "array-invoke": {
        "requires": [
            "yui-base"
        ]
    },
    "arraylist": {
        "requires": [
            "yui-base"
        ]
    },
    "arraylist-add": {
        "requires": [
            "arraylist"
        ]
    },
    "arraylist-filter": {
        "requires": [
            "arraylist"
        ]
    },
    "arraysort": {
        "requires": [
            "yui-base"
        ]
    },
    "async-queue": {
        "requires": [
            "event-custom"
        ]
    },
    "attribute": {
        "use": [
            "attribute-base",
            "attribute-complex"
        ]
    },
    "attribute-base": {
        "requires": [
            "attribute-core",
            "attribute-events",
            "attribute-extras"
        ]
    },
    "attribute-complex": {
        "requires": [
            "attribute-base"
        ]
    },
    "attribute-core": {
        "requires": [
            "oop"
        ]
    },
    "attribute-events": {
        "requires": [
            "event-custom"
        ]
    },
    "attribute-extras": {
        "requires": [
            "oop"
        ]
    },
    "autocomplete": {
        "use": [
            "autocomplete-base",
            "autocomplete-sources",
            "autocomplete-list",
            "autocomplete-plugin"
        ]
    },
    "autocomplete-base": {
        "optional": [
            "autocomplete-sources"
        ],
        "requires": [
            "array-extras",
            "base-build",
            "escape",
            "event-valuechange",
            "node-base"
        ]
    },
    "autocomplete-filters": {
        "requires": [
            "array-extras",
            "text-wordbreak"
        ]
    },
    "autocomplete-filters-accentfold": {
        "requires": [
            "array-extras",
            "text-accentfold",
            "text-wordbreak"
        ]
    },
    "autocomplete-highlighters": {
        "requires": [
            "array-extras",
            "highlight-base"
        ]
    },
    "autocomplete-highlighters-accentfold": {
        "requires": [
            "array-extras",
            "highlight-accentfold"
        ]
    },
    "autocomplete-list": {
        "after": [
            "autocomplete-sources"
        ],
        "lang": [
            "en"
        ],
        "requires": [
            "autocomplete-base",
            "event-resize",
            "node-screen",
            "selector-css3",
            "shim-plugin",
            "widget",
            "widget-position",
            "widget-position-align"
        ],
        "skinnable": true
    },
    "autocomplete-list-keys": {
        "condition": {
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
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 7792);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 7804);
return !(Y.UA.ios || Y.UA.android);
},
            "trigger": "autocomplete-list"
        },
        "requires": [
            "autocomplete-list",
            "base-build"
        ]
    },
    "autocomplete-plugin": {
        "requires": [
            "autocomplete-list",
            "node-pluginhost"
        ]
    },
    "autocomplete-sources": {
        "optional": [
            "io-base",
            "json-parse",
            "jsonp",
            "yql"
        ],
        "requires": [
            "autocomplete-base"
        ]
    },
    "base": {
        "use": [
            "base-base",
            "base-pluginhost",
            "base-build"
        ]
    },
    "base-base": {
        "after": [
            "attribute-complex"
        ],
        "requires": [
            "base-core",
            "attribute-base"
        ]
    },
    "base-build": {
        "requires": [
            "base-base"
        ]
    },
    "base-core": {
        "requires": [
            "attribute-core"
        ]
    },
    "base-pluginhost": {
        "requires": [
            "base-base",
            "pluginhost"
        ]
    },
    "button": {
        "requires": [
            "button-core",
            "cssbutton",
            "widget"
        ]
    },
    "button-core": {
        "requires": [
            "attribute-core",
            "classnamemanager",
            "node-base"
        ]
    },
    "button-group": {
        "requires": [
            "button-plugin",
            "cssbutton",
            "widget"
        ]
    },
    "button-plugin": {
        "requires": [
            "button-core",
            "cssbutton",
            "node-pluginhost"
        ]
    },
    "cache": {
        "use": [
            "cache-base",
            "cache-offline",
            "cache-plugin"
        ]
    },
    "cache-base": {
        "requires": [
            "base"
        ]
    },
    "cache-offline": {
        "requires": [
            "cache-base",
            "json"
        ]
    },
    "cache-plugin": {
        "requires": [
            "plugin",
            "cache-base"
        ]
    },
    "calendar": {
        "lang": [
            "de",
            "en",
            "fr",
            "ja",
            "nb-NO",
            "pt-BR",
            "ru",
            "zh-HANT-TW"
        ],
        "requires": [
            "calendar-base",
            "calendarnavigator"
        ],
        "skinnable": true
    },
    "calendar-base": {
        "lang": [
            "de",
            "en",
            "fr",
            "ja",
            "nb-NO",
            "pt-BR",
            "ru",
            "zh-HANT-TW"
        ],
        "requires": [
            "widget",
            "substitute",
            "datatype-date",
            "datatype-date-math",
            "cssgrids"
        ],
        "skinnable": true
    },
    "calendarnavigator": {
        "requires": [
            "plugin",
            "classnamemanager",
            "datatype-date",
            "node",
            "substitute"
        ],
        "skinnable": true
    },
    "charts": {
        "requires": [
            "charts-base"
        ]
    },
    "charts-base": {
        "requires": [
            "dom",
            "datatype-number",
            "datatype-date",
            "event-custom",
            "event-mouseenter",
            "event-touch",
            "widget",
            "widget-position",
            "widget-stack",
            "graphics"
        ]
    },
    "charts-legend": {
        "requires": [
            "charts-base"
        ]
    },
    "classnamemanager": {
        "requires": [
            "yui-base"
        ]
    },
    "clickable-rail": {
        "requires": [
            "slider-base"
        ]
    },
    "collection": {
        "use": [
            "array-extras",
            "arraylist",
            "arraylist-add",
            "arraylist-filter",
            "array-invoke"
        ]
    },
    "console": {
        "lang": [
            "en",
            "es",
            "ja"
        ],
        "requires": [
            "yui-log",
            "widget",
            "substitute"
        ],
        "skinnable": true
    },
    "console-filters": {
        "requires": [
            "plugin",
            "console"
        ],
        "skinnable": true
    },
    "controller": {
        "use": [
            "router"
        ]
    },
    "cookie": {
        "requires": [
            "yui-base"
        ]
    },
    "createlink-base": {
        "requires": [
            "editor-base"
        ]
    },
    "cssbase": {
        "after": [
            "cssreset",
            "cssfonts",
            "cssgrids",
            "cssreset-context",
            "cssfonts-context",
            "cssgrids-context"
        ],
        "type": "css"
    },
    "cssbase-context": {
        "after": [
            "cssreset",
            "cssfonts",
            "cssgrids",
            "cssreset-context",
            "cssfonts-context",
            "cssgrids-context"
        ],
        "type": "css"
    },
    "cssbutton": {
        "type": "css"
    },
    "cssfonts": {
        "type": "css"
    },
    "cssfonts-context": {
        "type": "css"
    },
    "cssgrids": {
        "optional": [
            "cssreset",
            "cssfonts"
        ],
        "type": "css"
    },
    "cssgrids-base": {
        "optional": [
            "cssreset",
            "cssfonts"
        ],
        "type": "css"
    },
    "cssgrids-units": {
        "optional": [
            "cssreset",
            "cssfonts"
        ],
        "requires": [
            "cssgrids-base"
        ],
        "type": "css"
    },
    "cssreset": {
        "type": "css"
    },
    "cssreset-context": {
        "type": "css"
    },
    "dataschema": {
        "use": [
            "dataschema-base",
            "dataschema-json",
            "dataschema-xml",
            "dataschema-array",
            "dataschema-text"
        ]
    },
    "dataschema-array": {
        "requires": [
            "dataschema-base"
        ]
    },
    "dataschema-base": {
        "requires": [
            "base"
        ]
    },
    "dataschema-json": {
        "requires": [
            "dataschema-base",
            "json"
        ]
    },
    "dataschema-text": {
        "requires": [
            "dataschema-base"
        ]
    },
    "dataschema-xml": {
        "requires": [
            "dataschema-base"
        ]
    },
    "datasource": {
        "use": [
            "datasource-local",
            "datasource-io",
            "datasource-get",
            "datasource-function",
            "datasource-cache",
            "datasource-jsonschema",
            "datasource-xmlschema",
            "datasource-arrayschema",
            "datasource-textschema",
            "datasource-polling"
        ]
    },
    "datasource-arrayschema": {
        "requires": [
            "datasource-local",
            "plugin",
            "dataschema-array"
        ]
    },
    "datasource-cache": {
        "requires": [
            "datasource-local",
            "plugin",
            "cache-base"
        ]
    },
    "datasource-function": {
        "requires": [
            "datasource-local"
        ]
    },
    "datasource-get": {
        "requires": [
            "datasource-local",
            "get"
        ]
    },
    "datasource-io": {
        "requires": [
            "datasource-local",
            "io-base"
        ]
    },
    "datasource-jsonschema": {
        "requires": [
            "datasource-local",
            "plugin",
            "dataschema-json"
        ]
    },
    "datasource-local": {
        "requires": [
            "base"
        ]
    },
    "datasource-polling": {
        "requires": [
            "datasource-local"
        ]
    },
    "datasource-textschema": {
        "requires": [
            "datasource-local",
            "plugin",
            "dataschema-text"
        ]
    },
    "datasource-xmlschema": {
        "requires": [
            "datasource-local",
            "plugin",
            "dataschema-xml"
        ]
    },
    "datatable": {
        "use": [
            "datatable-core",
            "datatable-table",
            "datatable-head",
            "datatable-body",
            "datatable-base",
            "datatable-column-widths",
            "datatable-message",
            "datatable-mutable",
            "datatable-sort",
            "datatable-datasource"
        ]
    },
    "datatable-base": {
        "requires": [
            "datatable-core",
            "datatable-table",
            "base-build",
            "widget"
        ],
        "skinnable": true
    },
    "datatable-base-deprecated": {
        "requires": [
            "recordset-base",
            "widget",
            "substitute",
            "event-mouseenter"
        ],
        "skinnable": true
    },
    "datatable-body": {
        "requires": [
            "datatable-core",
            "view",
            "classnamemanager"
        ]
    },
    "datatable-column-widths": {
        "requires": [
            "datatable-base"
        ]
    },
    "datatable-core": {
        "requires": [
            "escape",
            "model-list",
            "node-event-delegate"
        ]
    },
    "datatable-datasource": {
        "requires": [
            "datatable-base",
            "plugin",
            "datasource-local"
        ]
    },
    "datatable-datasource-deprecated": {
        "requires": [
            "datatable-base-deprecated",
            "plugin",
            "datasource-local"
        ]
    },
    "datatable-deprecated": {
        "use": [
            "datatable-base-deprecated",
            "datatable-datasource-deprecated",
            "datatable-sort-deprecated",
            "datatable-scroll-deprecated"
        ]
    },
    "datatable-head": {
        "requires": [
            "datatable-core",
            "view",
            "classnamemanager"
        ]
    },
    "datatable-message": {
        "lang": [
            "en"
        ],
        "requires": [
            "datatable-base"
        ],
        "skinnable": true
    },
    "datatable-mutable": {
        "requires": [
            "datatable-base"
        ]
    },
    "datatable-scroll": {
        "requires": [
            "datatable-base",
            "datatable-column-widths",
            "dom-screen"
        ],
        "skinnable": true
    },
    "datatable-scroll-deprecated": {
        "requires": [
            "datatable-base-deprecated",
            "plugin"
        ]
    },
    "datatable-sort": {
        "lang": [
            "en"
        ],
        "requires": [
            "datatable-base"
        ],
        "skinnable": true
    },
    "datatable-sort-deprecated": {
        "lang": [
            "en"
        ],
        "requires": [
            "datatable-base-deprecated",
            "plugin",
            "recordset-sort"
        ]
    },
    "datatable-table": {
        "requires": [
            "datatable-core",
            "datatable-head",
            "datatable-body",
            "view",
            "classnamemanager"
        ]
    },
    "datatype": {
        "use": [
            "datatype-number",
            "datatype-date",
            "datatype-xml"
        ]
    },
    "datatype-date": {
        "supersedes": [
            "datatype-date-format"
        ],
        "use": [
            "datatype-date-parse",
            "datatype-date-format"
        ]
    },
    "datatype-date-format": {
        "lang": [
            "ar",
            "ar-JO",
            "ca",
            "ca-ES",
            "da",
            "da-DK",
            "de",
            "de-AT",
            "de-DE",
            "el",
            "el-GR",
            "en",
            "en-AU",
            "en-CA",
            "en-GB",
            "en-IE",
            "en-IN",
            "en-JO",
            "en-MY",
            "en-NZ",
            "en-PH",
            "en-SG",
            "en-US",
            "es",
            "es-AR",
            "es-BO",
            "es-CL",
            "es-CO",
            "es-EC",
            "es-ES",
            "es-MX",
            "es-PE",
            "es-PY",
            "es-US",
            "es-UY",
            "es-VE",
            "fi",
            "fi-FI",
            "fr",
            "fr-BE",
            "fr-CA",
            "fr-FR",
            "hi",
            "hi-IN",
            "id",
            "id-ID",
            "it",
            "it-IT",
            "ja",
            "ja-JP",
            "ko",
            "ko-KR",
            "ms",
            "ms-MY",
            "nb",
            "nb-NO",
            "nl",
            "nl-BE",
            "nl-NL",
            "pl",
            "pl-PL",
            "pt",
            "pt-BR",
            "ro",
            "ro-RO",
            "ru",
            "ru-RU",
            "sv",
            "sv-SE",
            "th",
            "th-TH",
            "tr",
            "tr-TR",
            "vi",
            "vi-VN",
            "zh-Hans",
            "zh-Hans-CN",
            "zh-Hant",
            "zh-Hant-HK",
            "zh-Hant-TW"
        ]
    },
    "datatype-date-math": {
        "requires": [
            "yui-base"
        ]
    },
    "datatype-date-parse": {},
    "datatype-number": {
        "use": [
            "datatype-number-parse",
            "datatype-number-format"
        ]
    },
    "datatype-number-format": {},
    "datatype-number-parse": {},
    "datatype-xml": {
        "use": [
            "datatype-xml-parse",
            "datatype-xml-format"
        ]
    },
    "datatype-xml-format": {},
    "datatype-xml-parse": {},
    "dd": {
        "use": [
            "dd-ddm-base",
            "dd-ddm",
            "dd-ddm-drop",
            "dd-drag",
            "dd-proxy",
            "dd-constrain",
            "dd-drop",
            "dd-scroll",
            "dd-delegate"
        ]
    },
    "dd-constrain": {
        "requires": [
            "dd-drag"
        ]
    },
    "dd-ddm": {
        "requires": [
            "dd-ddm-base",
            "event-resize"
        ]
    },
    "dd-ddm-base": {
        "requires": [
            "node",
            "base",
            "yui-throttle",
            "classnamemanager"
        ]
    },
    "dd-ddm-drop": {
        "requires": [
            "dd-ddm"
        ]
    },
    "dd-delegate": {
        "requires": [
            "dd-drag",
            "dd-drop-plugin",
            "event-mouseenter"
        ]
    },
    "dd-drag": {
        "requires": [
            "dd-ddm-base"
        ]
    },
    "dd-drop": {
        "requires": [
            "dd-drag",
            "dd-ddm-drop"
        ]
    },
    "dd-drop-plugin": {
        "requires": [
            "dd-drop"
        ]
    },
    "dd-gestures": {
        "condition": {
            "name": "dd-gestures",
            "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 8532);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8533);
return ((Y.config.win && ("ontouchstart" in Y.config.win)) && !(Y.UA.chrome && Y.UA.chrome < 6));
},
            "trigger": "dd-drag"
        },
        "requires": [
            "dd-drag",
            "event-synthetic",
            "event-gestures"
        ]
    },
    "dd-plugin": {
        "optional": [
            "dd-constrain",
            "dd-proxy"
        ],
        "requires": [
            "dd-drag"
        ]
    },
    "dd-proxy": {
        "requires": [
            "dd-drag"
        ]
    },
    "dd-scroll": {
        "requires": [
            "dd-drag"
        ]
    },
    "dial": {
        "lang": [
            "en",
            "es"
        ],
        "requires": [
            "widget",
            "dd-drag",
            "substitute",
            "event-mouseenter",
            "event-move",
            "event-key",
            "transition",
            "intl"
        ],
        "skinnable": true
    },
    "dom": {
        "use": [
            "dom-base",
            "dom-screen",
            "dom-style",
            "selector-native",
            "selector"
        ]
    },
    "dom-base": {
        "requires": [
            "dom-core"
        ]
    },
    "dom-core": {
        "requires": [
            "oop",
            "features"
        ]
    },
    "dom-deprecated": {
        "requires": [
            "dom-base"
        ]
    },
    "dom-screen": {
        "requires": [
            "dom-base",
            "dom-style"
        ]
    },
    "dom-style": {
        "requires": [
            "dom-base"
        ]
    },
    "dom-style-ie": {
        "condition": {
            "name": "dom-style-ie",
            "test": function (Y) {

    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 8618);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8620);
var testFeature = Y.Features.test,
        addFeature = Y.Features.add,
        WINDOW = Y.config.win,
        DOCUMENT = Y.config.doc,
        DOCUMENT_ELEMENT = 'documentElement',
        ret = false;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8627);
addFeature('style', 'computedStyle', {
        test: function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "test", 8628);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8629);
return WINDOW && 'getComputedStyle' in WINDOW;
        }
    });

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8633);
addFeature('style', 'opacity', {
        test: function() {
            _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "test", 8634);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8635);
return DOCUMENT && 'opacity' in DOCUMENT[DOCUMENT_ELEMENT].style;
        }
    });

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8639);
ret =  (!testFeature('style', 'opacity') &&
            !testFeature('style', 'computedStyle'));

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8642);
return ret;
},
            "trigger": "dom-style"
        },
        "requires": [
            "dom-style"
        ]
    },
    "dump": {
        "requires": [
            "yui-base"
        ]
    },
    "editor": {
        "use": [
            "frame",
            "editor-selection",
            "exec-command",
            "editor-base",
            "editor-para",
            "editor-br",
            "editor-bidi",
            "editor-tab",
            "createlink-base"
        ]
    },
    "editor-base": {
        "requires": [
            "base",
            "frame",
            "node",
            "exec-command",
            "editor-selection"
        ]
    },
    "editor-bidi": {
        "requires": [
            "editor-base"
        ]
    },
    "editor-br": {
        "requires": [
            "editor-base"
        ]
    },
    "editor-lists": {
        "requires": [
            "editor-base"
        ]
    },
    "editor-para": {
        "requires": [
            "editor-para-base"
        ]
    },
    "editor-para-base": {
        "requires": [
            "editor-base"
        ]
    },
    "editor-para-ie": {
        "condition": {
            "name": "editor-para-ie",
            "trigger": "editor-para",
            "ua": "ie",
            "when": "instead"
        },
        "requires": [
            "editor-para-base"
        ]
    },
    "editor-selection": {
        "requires": [
            "node"
        ]
    },
    "editor-tab": {
        "requires": [
            "editor-base"
        ]
    },
    "escape": {
        "requires": [
            "yui-base"
        ]
    },
    "event": {
        "after": [
            "node-base"
        ],
        "use": [
            "event-base",
            "event-delegate",
            "event-synthetic",
            "event-mousewheel",
            "event-mouseenter",
            "event-key",
            "event-focus",
            "event-resize",
            "event-hover",
            "event-outside",
            "event-touch",
            "event-move",
            "event-flick",
            "event-valuechange"
        ]
    },
    "event-base": {
        "after": [
            "node-base"
        ],
        "requires": [
            "event-custom-base"
        ]
    },
    "event-base-ie": {
        "after": [
            "event-base"
        ],
        "condition": {
            "name": "event-base-ie",
            "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 8763);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8764);
var imp = Y.config.doc && Y.config.doc.implementation;
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8765);
return (imp && (!imp.hasFeature('Events', '2.0')));
},
            "trigger": "node-base"
        },
        "requires": [
            "node-base"
        ]
    },
    "event-contextmenu": {
        "requires": [
            "event-synthetic",
            "dom-screen"
        ]
    },
    "event-custom": {
        "use": [
            "event-custom-base",
            "event-custom-complex"
        ]
    },
    "event-custom-base": {
        "requires": [
            "oop"
        ]
    },
    "event-custom-complex": {
        "requires": [
            "event-custom-base"
        ]
    },
    "event-delegate": {
        "requires": [
            "node-base"
        ]
    },
    "event-flick": {
        "requires": [
            "node-base",
            "event-touch",
            "event-synthetic"
        ]
    },
    "event-focus": {
        "requires": [
            "event-synthetic"
        ]
    },
    "event-gestures": {
        "use": [
            "event-flick",
            "event-move"
        ]
    },
    "event-hover": {
        "requires": [
            "event-mouseenter"
        ]
    },
    "event-key": {
        "requires": [
            "event-synthetic"
        ]
    },
    "event-mouseenter": {
        "requires": [
            "event-synthetic"
        ]
    },
    "event-mousewheel": {
        "requires": [
            "node-base"
        ]
    },
    "event-move": {
        "requires": [
            "node-base",
            "event-touch",
            "event-synthetic"
        ]
    },
    "event-outside": {
        "requires": [
            "event-synthetic"
        ]
    },
    "event-resize": {
        "requires": [
            "node-base",
            "event-synthetic"
        ]
    },
    "event-simulate": {
        "requires": [
            "event-base"
        ]
    },
    "event-synthetic": {
        "requires": [
            "node-base",
            "event-custom-complex"
        ]
    },
    "event-touch": {
        "requires": [
            "node-base"
        ]
    },
    "event-valuechange": {
        "requires": [
            "event-focus",
            "event-synthetic"
        ]
    },
    "exec-command": {
        "requires": [
            "frame"
        ]
    },
    "features": {
        "requires": [
            "yui-base"
        ]
    },
    "file": {
        "requires": [
            "file-flash",
            "file-html5"
        ]
    },
    "file-flash": {
        "requires": [
            "base"
        ]
    },
    "file-html5": {
        "requires": [
            "base"
        ]
    },
    "frame": {
        "requires": [
            "base",
            "node",
            "selector-css3",
            "substitute",
            "yui-throttle"
        ]
    },
    "gesture-simulate": {
        "requires": [
            "async-queue",
            "event-simulate",
            "node-screen"
        ]
    },
    "get": {
        "requires": [
            "yui-base"
        ]
    },
    "graphics": {
        "requires": [
            "node",
            "event-custom",
            "pluginhost",
            "matrix",
            "classnamemanager"
        ]
    },
    "graphics-canvas": {
        "condition": {
            "name": "graphics-canvas",
            "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 8937);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8938);
var DOCUMENT = Y.config.doc,
        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8942);
return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext("2d"));
},
            "trigger": "graphics"
        },
        "requires": [
            "graphics"
        ]
    },
    "graphics-canvas-default": {
        "condition": {
            "name": "graphics-canvas-default",
            "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 8953);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8954);
var DOCUMENT = Y.config.doc,
        useCanvas = Y.config.defaultGraphicEngine && Y.config.defaultGraphicEngine == "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8958);
return (!svg || useCanvas) && (canvas && canvas.getContext && canvas.getContext("2d"));
},
            "trigger": "graphics"
        }
    },
    "graphics-svg": {
        "condition": {
            "name": "graphics-svg",
            "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 8966);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8967);
var DOCUMENT = Y.config.doc,
        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8972);
return svg && (useSVG || !canvas);
},
            "trigger": "graphics"
        },
        "requires": [
            "graphics"
        ]
    },
    "graphics-svg-default": {
        "condition": {
            "name": "graphics-svg-default",
            "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 8983);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8984);
var DOCUMENT = Y.config.doc,
        useSVG = !Y.config.defaultGraphicEngine || Y.config.defaultGraphicEngine != "canvas",
		canvas = DOCUMENT && DOCUMENT.createElement("canvas"),
        svg = (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8989);
return svg && (useSVG || !canvas);
},
            "trigger": "graphics"
        }
    },
    "graphics-vml": {
        "condition": {
            "name": "graphics-vml",
            "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 8997);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 8998);
var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9000);
return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
},
            "trigger": "graphics"
        },
        "requires": [
            "graphics"
        ]
    },
    "graphics-vml-default": {
        "condition": {
            "name": "graphics-vml-default",
            "test": function(Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 9011);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9012);
var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9014);
return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
},
            "trigger": "graphics"
        }
    },
    "handlebars": {
        "use": [
            "handlebars-compiler"
        ]
    },
    "handlebars-base": {
        "requires": [
            "escape"
        ]
    },
    "handlebars-compiler": {
        "requires": [
            "handlebars-base"
        ]
    },
    "highlight": {
        "use": [
            "highlight-base",
            "highlight-accentfold"
        ]
    },
    "highlight-accentfold": {
        "requires": [
            "highlight-base",
            "text-accentfold"
        ]
    },
    "highlight-base": {
        "requires": [
            "array-extras",
            "classnamemanager",
            "escape",
            "text-wordbreak"
        ]
    },
    "history": {
        "use": [
            "history-base",
            "history-hash",
            "history-hash-ie",
            "history-html5"
        ]
    },
    "history-base": {
        "requires": [
            "event-custom-complex"
        ]
    },
    "history-hash": {
        "after": [
            "history-html5"
        ],
        "requires": [
            "event-synthetic",
            "history-base",
            "yui-later"
        ]
    },
    "history-hash-ie": {
        "condition": {
            "name": "history-hash-ie",
            "test": function (Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 9080);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9081);
var docMode = Y.config.doc && Y.config.doc.documentMode;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9083);
return Y.UA.ie && (!('onhashchange' in Y.config.win) ||
            !docMode || docMode < 8);
},
            "trigger": "history-hash"
        },
        "requires": [
            "history-hash",
            "node-base"
        ]
    },
    "history-html5": {
        "optional": [
            "json"
        ],
        "requires": [
            "event-base",
            "history-base",
            "node-base"
        ]
    },
    "imageloader": {
        "requires": [
            "base-base",
            "node-style",
            "node-screen"
        ]
    },
    "intl": {
        "requires": [
            "intl-base",
            "event-custom"
        ]
    },
    "intl-base": {
        "requires": [
            "yui-base"
        ]
    },
    "io": {
        "use": [
            "io-base",
            "io-xdr",
            "io-form",
            "io-upload-iframe",
            "io-queue"
        ]
    },
    "io-base": {
        "requires": [
            "event-custom-base",
            "querystring-stringify-simple"
        ]
    },
    "io-form": {
        "requires": [
            "io-base",
            "node-base"
        ]
    },
    "io-nodejs": {
        "condition": {
            "name": "io-nodejs",
            "trigger": "io-base",
            "ua": "nodejs"
        },
        "requires": [
            "io-base"
        ]
    },
    "io-queue": {
        "requires": [
            "io-base",
            "queue-promote"
        ]
    },
    "io-upload-iframe": {
        "requires": [
            "io-base",
            "node-base"
        ]
    },
    "io-xdr": {
        "requires": [
            "io-base",
            "datatype-xml-parse"
        ]
    },
    "json": {
        "use": [
            "json-parse",
            "json-stringify"
        ]
    },
    "json-parse": {
        "requires": [
            "yui-base"
        ]
    },
    "json-stringify": {
        "requires": [
            "yui-base"
        ]
    },
    "jsonp": {
        "requires": [
            "get",
            "oop"
        ]
    },
    "jsonp-url": {
        "requires": [
            "jsonp"
        ]
    },
    "lazy-model-list": {
        "requires": [
            "model-list"
        ]
    },
    "loader": {
        "use": [
            "loader-base",
            "loader-rollup",
            "loader-yui3"
        ]
    },
    "loader-base": {
        "requires": [
            "get",
            "features"
        ]
    },
    "loader-rollup": {
        "requires": [
            "loader-base"
        ]
    },
    "loader-yui3": {
        "requires": [
            "loader-base"
        ]
    },
    "matrix": {
        "requires": [
            "yui-base"
        ]
    },
    "model": {
        "requires": [
            "base-build",
            "escape",
            "json-parse"
        ]
    },
    "model-list": {
        "requires": [
            "array-extras",
            "array-invoke",
            "arraylist",
            "base-build",
            "escape",
            "json-parse",
            "model"
        ]
    },
    "model-sync-rest": {
        "requires": [
            "model",
            "io-base",
            "json-stringify"
        ]
    },
    "node": {
        "use": [
            "node-base",
            "node-event-delegate",
            "node-pluginhost",
            "node-screen",
            "node-style"
        ]
    },
    "node-base": {
        "requires": [
            "event-base",
            "node-core",
            "dom-base"
        ]
    },
    "node-core": {
        "requires": [
            "dom-core",
            "selector"
        ]
    },
    "node-deprecated": {
        "requires": [
            "node-base"
        ]
    },
    "node-event-delegate": {
        "requires": [
            "node-base",
            "event-delegate"
        ]
    },
    "node-event-html5": {
        "requires": [
            "node-base"
        ]
    },
    "node-event-simulate": {
        "requires": [
            "node-base",
            "event-simulate",
            "gesture-simulate"
        ]
    },
    "node-flick": {
        "requires": [
            "classnamemanager",
            "transition",
            "event-flick",
            "plugin"
        ],
        "skinnable": true
    },
    "node-focusmanager": {
        "requires": [
            "attribute",
            "node",
            "plugin",
            "node-event-simulate",
            "event-key",
            "event-focus"
        ]
    },
    "node-load": {
        "requires": [
            "node-base",
            "io-base"
        ]
    },
    "node-menunav": {
        "requires": [
            "node",
            "classnamemanager",
            "plugin",
            "node-focusmanager"
        ],
        "skinnable": true
    },
    "node-pluginhost": {
        "requires": [
            "node-base",
            "pluginhost"
        ]
    },
    "node-screen": {
        "requires": [
            "dom-screen",
            "node-base"
        ]
    },
    "node-style": {
        "requires": [
            "dom-style",
            "node-base"
        ]
    },
    "oop": {
        "requires": [
            "yui-base"
        ]
    },
    "overlay": {
        "requires": [
            "widget",
            "widget-stdmod",
            "widget-position",
            "widget-position-align",
            "widget-stack",
            "widget-position-constrain"
        ],
        "skinnable": true
    },
    "panel": {
        "requires": [
            "widget",
            "widget-autohide",
            "widget-buttons",
            "widget-modality",
            "widget-position",
            "widget-position-align",
            "widget-position-constrain",
            "widget-stack",
            "widget-stdmod"
        ],
        "skinnable": true
    },
    "parallel": {
        "requires": [
            "yui-base"
        ]
    },
    "pjax": {
        "requires": [
            "pjax-base",
            "pjax-content"
        ]
    },
    "pjax-base": {
        "requires": [
            "classnamemanager",
            "node-event-delegate",
            "router"
        ]
    },
    "pjax-content": {
        "requires": [
            "io-base",
            "node-base",
            "router"
        ]
    },
    "pjax-plugin": {
        "requires": [
            "node-pluginhost",
            "pjax",
            "plugin"
        ]
    },
    "plugin": {
        "requires": [
            "base-base"
        ]
    },
    "pluginhost": {
        "use": [
            "pluginhost-base",
            "pluginhost-config"
        ]
    },
    "pluginhost-base": {
        "requires": [
            "yui-base"
        ]
    },
    "pluginhost-config": {
        "requires": [
            "pluginhost-base"
        ]
    },
    "profiler": {
        "requires": [
            "yui-base"
        ]
    },
    "querystring": {
        "use": [
            "querystring-parse",
            "querystring-stringify"
        ]
    },
    "querystring-parse": {
        "requires": [
            "yui-base",
            "array-extras"
        ]
    },
    "querystring-parse-simple": {
        "requires": [
            "yui-base"
        ]
    },
    "querystring-stringify": {
        "requires": [
            "yui-base"
        ]
    },
    "querystring-stringify-simple": {
        "requires": [
            "yui-base"
        ]
    },
    "queue-promote": {
        "requires": [
            "yui-base"
        ]
    },
    "range-slider": {
        "requires": [
            "slider-base",
            "slider-value-range",
            "clickable-rail"
        ]
    },
    "recordset": {
        "use": [
            "recordset-base",
            "recordset-sort",
            "recordset-filter",
            "recordset-indexer"
        ]
    },
    "recordset-base": {
        "requires": [
            "base",
            "arraylist"
        ]
    },
    "recordset-filter": {
        "requires": [
            "recordset-base",
            "array-extras",
            "plugin"
        ]
    },
    "recordset-indexer": {
        "requires": [
            "recordset-base",
            "plugin"
        ]
    },
    "recordset-sort": {
        "requires": [
            "arraysort",
            "recordset-base",
            "plugin"
        ]
    },
    "resize": {
        "use": [
            "resize-base",
            "resize-proxy",
            "resize-constrain"
        ]
    },
    "resize-base": {
        "requires": [
            "base",
            "widget",
            "substitute",
            "event",
            "oop",
            "dd-drag",
            "dd-delegate",
            "dd-drop"
        ],
        "skinnable": true
    },
    "resize-constrain": {
        "requires": [
            "plugin",
            "resize-base"
        ]
    },
    "resize-plugin": {
        "optional": [
            "resize-constrain"
        ],
        "requires": [
            "resize-base",
            "plugin"
        ]
    },
    "resize-proxy": {
        "requires": [
            "plugin",
            "resize-base"
        ]
    },
    "router": {
        "optional": [
            "querystring-parse"
        ],
        "requires": [
            "array-extras",
            "base-build",
            "history"
        ]
    },
    "scrollview": {
        "requires": [
            "scrollview-base",
            "scrollview-scrollbars"
        ]
    },
    "scrollview-base": {
        "requires": [
            "widget",
            "event-gestures",
            "event-mousewheel",
            "transition"
        ],
        "skinnable": true
    },
    "scrollview-base-ie": {
        "condition": {
            "name": "scrollview-base-ie",
            "trigger": "scrollview-base",
            "ua": "ie"
        },
        "requires": [
            "scrollview-base"
        ]
    },
    "scrollview-list": {
        "requires": [
            "plugin",
            "classnamemanager"
        ],
        "skinnable": true
    },
    "scrollview-paginator": {
        "requires": [
            "plugin",
            "classnamemanager"
        ]
    },
    "scrollview-scrollbars": {
        "requires": [
            "classnamemanager",
            "transition",
            "plugin"
        ],
        "skinnable": true
    },
    "selector": {
        "requires": [
            "selector-native"
        ]
    },
    "selector-css2": {
        "condition": {
            "name": "selector-css2",
            "test": function (Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 9618);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9619);
var DOCUMENT = Y.config.doc,
        ret = DOCUMENT && !('querySelectorAll' in DOCUMENT);

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9622);
return ret;
},
            "trigger": "selector"
        },
        "requires": [
            "selector-native"
        ]
    },
    "selector-css3": {
        "requires": [
            "selector-native",
            "selector-css2"
        ]
    },
    "selector-native": {
        "requires": [
            "dom-base"
        ]
    },
    "shim-plugin": {
        "requires": [
            "node-style",
            "node-pluginhost"
        ]
    },
    "slider": {
        "use": [
            "slider-base",
            "slider-value-range",
            "clickable-rail",
            "range-slider"
        ]
    },
    "slider-base": {
        "requires": [
            "widget",
            "dd-constrain",
            "substitute",
            "event-key"
        ],
        "skinnable": true
    },
    "slider-value-range": {
        "requires": [
            "slider-base"
        ]
    },
    "sortable": {
        "requires": [
            "dd-delegate",
            "dd-drop-plugin",
            "dd-proxy"
        ]
    },
    "sortable-scroll": {
        "requires": [
            "dd-scroll",
            "sortable"
        ]
    },
    "stylesheet": {
        "requires": [
            "yui-base"
        ]
    },
    "substitute": {
        "optional": [
            "dump"
        ],
        "requires": [
            "yui-base"
        ]
    },
    "swf": {
        "requires": [
            "event-custom",
            "node",
            "swfdetect",
            "escape"
        ]
    },
    "swfdetect": {
        "requires": [
            "yui-base"
        ]
    },
    "tabview": {
        "requires": [
            "widget",
            "widget-parent",
            "widget-child",
            "tabview-base",
            "node-pluginhost",
            "node-focusmanager"
        ],
        "skinnable": true
    },
    "tabview-base": {
        "requires": [
            "node-event-delegate",
            "classnamemanager",
            "skin-sam-tabview"
        ]
    },
    "tabview-plugin": {
        "requires": [
            "tabview-base"
        ]
    },
    "test": {
        "requires": [
            "event-simulate",
            "event-custom",
            "substitute",
            "json-stringify"
        ],
        "skinnable": true
    },
    "test-console": {
        "requires": [
            "console-filters",
            "test"
        ],
        "skinnable": true
    },
    "text": {
        "use": [
            "text-accentfold",
            "text-wordbreak"
        ]
    },
    "text-accentfold": {
        "requires": [
            "array-extras",
            "text-data-accentfold"
        ]
    },
    "text-data-accentfold": {
        "requires": [
            "yui-base"
        ]
    },
    "text-data-wordbreak": {
        "requires": [
            "yui-base"
        ]
    },
    "text-wordbreak": {
        "requires": [
            "array-extras",
            "text-data-wordbreak"
        ]
    },
    "transition": {
        "requires": [
            "node-style"
        ]
    },
    "transition-timer": {
        "condition": {
            "name": "transition-timer",
            "test": function (Y) {
    _yuitest_coverfunc("/build/yui-nodejs/yui-nodejs.js", "\"test\"", 9783);
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9784);
var DOCUMENT = Y.config.doc,
        node = (DOCUMENT) ? DOCUMENT.documentElement: null,
        ret = true;

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9788);
if (node && node.style) {
        _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9789);
ret = !('MozTransition' in node.style || 'WebkitTransition' in node.style);
    } 

    _yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 9792);
return ret;
},
            "trigger": "transition"
        },
        "requires": [
            "transition"
        ]
    },
    "uploader": {
        "requires": [
            "uploader-html5",
            "uploader-flash"
        ]
    },
    "uploader-deprecated": {
        "requires": [
            "event-custom",
            "node",
            "base",
            "swf"
        ]
    },
    "uploader-flash": {
        "requires": [
            "swf",
            "widget",
            "substitute",
            "base",
            "cssbutton",
            "node",
            "event-custom",
            "file-flash",
            "uploader-queue"
        ]
    },
    "uploader-html5": {
        "requires": [
            "widget",
            "node-event-simulate",
            "substitute",
            "file-html5",
            "uploader-queue"
        ]
    },
    "uploader-queue": {
        "requires": [
            "base"
        ]
    },
    "view": {
        "requires": [
            "base-build",
            "node-event-delegate"
        ]
    },
    "view-node-map": {
        "requires": [
            "view"
        ]
    },
    "widget": {
        "use": [
            "widget-base",
            "widget-htmlparser",
            "widget-skin",
            "widget-uievents"
        ]
    },
    "widget-anim": {
        "requires": [
            "anim-base",
            "plugin",
            "widget"
        ]
    },
    "widget-autohide": {
        "requires": [
            "base-build",
            "event-key",
            "event-outside",
            "widget"
        ]
    },
    "widget-base": {
        "requires": [
            "attribute",
            "base-base",
            "base-pluginhost",
            "classnamemanager",
            "event-focus",
            "node-base",
            "node-style"
        ],
        "skinnable": true
    },
    "widget-base-ie": {
        "condition": {
            "name": "widget-base-ie",
            "trigger": "widget-base",
            "ua": "ie"
        },
        "requires": [
            "widget-base"
        ]
    },
    "widget-buttons": {
        "requires": [
            "button-plugin",
            "cssbutton",
            "widget-stdmod"
        ]
    },
    "widget-child": {
        "requires": [
            "base-build",
            "widget"
        ]
    },
    "widget-htmlparser": {
        "requires": [
            "widget-base"
        ]
    },
    "widget-locale": {
        "requires": [
            "widget-base"
        ]
    },
    "widget-modality": {
        "requires": [
            "base-build",
            "event-outside",
            "widget"
        ],
        "skinnable": true
    },
    "widget-parent": {
        "requires": [
            "arraylist",
            "base-build",
            "widget"
        ]
    },
    "widget-position": {
        "requires": [
            "base-build",
            "node-screen",
            "widget"
        ]
    },
    "widget-position-align": {
        "requires": [
            "widget-position"
        ]
    },
    "widget-position-constrain": {
        "requires": [
            "widget-position"
        ]
    },
    "widget-skin": {
        "requires": [
            "widget-base"
        ]
    },
    "widget-stack": {
        "requires": [
            "base-build",
            "widget"
        ],
        "skinnable": true
    },
    "widget-stdmod": {
        "requires": [
            "base-build",
            "widget"
        ]
    },
    "widget-uievents": {
        "requires": [
            "node-event-delegate",
            "widget-base"
        ]
    },
    "yql": {
        "requires": [
            "jsonp",
            "jsonp-url"
        ]
    },
    "yui": {},
    "yui-base": {},
    "yui-later": {
        "requires": [
            "yui-base"
        ]
    },
    "yui-log": {
        "requires": [
            "yui-base"
        ]
    },
    "yui-throttle": {
        "requires": [
            "yui-base"
        ]
    }
};
_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 10000);
YUI.Env[Y.version].md5 = '2631b5fb2c08064b4e8385f1142513e5';


}, '@VERSION@' ,{requires:['loader-base']});


_yuitest_coverline("/build/yui-nodejs/yui-nodejs.js", 10006);
YUI.add('yui', function(Y){}, '@VERSION@' ,{use:['yui-base','get','features','intl-base','yui-log','yui-log-nodejs','yui-later','loader-base', 'loader-rollup', 'loader-yui3']});

