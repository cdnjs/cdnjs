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
_yuitest_coverage["build/yui-nodejs/yui-nodejs.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/yui-nodejs/yui-nodejs.js",
    code: []
};
_yuitest_coverage["build/yui-nodejs/yui-nodejs.js"].code=["/**","The YUI module contains the components required for building the YUI seed file.","This includes the script loading mechanism, a simple queue, and the core","utilities for the library.","","@module yui","@main yui","@submodule yui-base","**/","","/*jshint eqeqeq: false*/","if (typeof YUI != 'undefined') {","    YUI._YUI = YUI;","}","","/**","The YUI global namespace object. This is the constructor for all YUI instances.","","This is a self-instantiable factory function, meaning you don't need to precede","it with the `new` operator. You can invoke it directly like this:","","    YUI().use('*', function (Y) {","        // Y is a new YUI instance.","    });","","But it also works like this:","","    var Y = YUI();","","The `YUI` constructor accepts an optional config object, like this:","","    YUI({","        debug: true,","        combine: false","    }).use('node', function (Y) {","        // Y.Node is ready to use.","    });","","See the API docs for the <a href=\"config.html\">Config</a> class for the complete","list of supported configuration properties accepted by the YUI constuctor.","","If a global `YUI` object is already defined, the existing YUI object will not be","overwritten, to ensure that defined namespaces are preserved.","","Each YUI instance has full custom event support, but only if the event system is","available.","","@class YUI","@uses EventTarget","@constructor","@global","@param {Object} [config]* Zero or more optional configuration objects. Config","    values are stored in the `Y.config` property. See the","    <a href=\"config.html\">Config</a> docs for the list of supported properties.","**/","","    /*global YUI*/","    /*global YUI_config*/","    var YUI = function() {","        var i = 0,","            Y = this,","            args = arguments,","            l = args.length,","            instanceOf = function(o, type) {","                return (o && o.hasOwnProperty && (o instanceof type));","            },","            gconf = (typeof YUI_config !== 'undefined') && YUI_config;","","        if (!(instanceOf(Y, YUI))) {","            Y = new YUI();","        } else {","            // set up the core environment","            Y._init();","","            /**","            Master configuration that might span multiple contexts in a non-","            browser environment. It is applied first to all instances in all","            contexts.","","            @example","","                YUI.GlobalConfig = {","                    filter: 'debug'","                };","","                YUI().use('node', function (Y) {","                    // debug files used here","                });","","                YUI({","                    filter: 'min'","                }).use('node', function (Y) {","                    // min files used here","                });","","            @property {Object} GlobalConfig","            @global","            @static","            **/","            if (YUI.GlobalConfig) {","                Y.applyConfig(YUI.GlobalConfig);","            }","","            /**","            Page-level config applied to all YUI instances created on the","            current page. This is applied after `YUI.GlobalConfig` and before","            any instance-level configuration.","","            @example","","                // Single global var to include before YUI seed file","                YUI_config = {","                    filter: 'debug'","                };","","                YUI().use('node', function (Y) {","                    // debug files used here","                });","","                YUI({","                    filter: 'min'","                }).use('node', function (Y) {","                    // min files used here","                });","","            @property {Object} YUI_config","            @global","            **/","            if (gconf) {","                Y.applyConfig(gconf);","            }","","            // bind the specified additional modules for this instance","            if (!l) {","                Y._setup();","            }","        }","","        if (l) {","            // Each instance can accept one or more configuration objects.","            // These are applied after YUI.GlobalConfig and YUI_Config,","            // overriding values set in those config files if there is a","            // matching property.","            for (; i < l; i++) {","                Y.applyConfig(args[i]);","            }","","            Y._setup();","        }","","        Y.instanceOf = instanceOf;","","        return Y;","    };","","(function() {","","    var proto, prop,","        VERSION = '@VERSION@',","        PERIOD = '.',","        BASE = 'http://yui.yahooapis.com/',","        /*","            These CSS class names can't be generated by","            getClassName since it is not available at the","            time they are being used.","        */","        DOC_LABEL = 'yui3-js-enabled',","        CSS_STAMP_EL = 'yui3-css-stamp',","        NOOP = function() {},","        SLICE = Array.prototype.slice,","        APPLY_TO_AUTH = { 'io.xdrReady': 1,   // the functions applyTo","                          'io.xdrResponse': 1,   // can call. this should","                          'SWF.eventHandler': 1 }, // be done at build time","        hasWin = (typeof window != 'undefined'),","        win = (hasWin) ? window : null,","        doc = (hasWin) ? win.document : null,","        docEl = doc && doc.documentElement,","        docClass = docEl && docEl.className,","        instances = {},","        time = new Date().getTime(),","        add = function(el, type, fn, capture) {","            if (el && el.addEventListener) {","                el.addEventListener(type, fn, capture);","            } else if (el && el.attachEvent) {","                el.attachEvent('on' + type, fn);","            }","        },","        remove = function(el, type, fn, capture) {","            if (el && el.removeEventListener) {","                // this can throw an uncaught exception in FF","                try {","                    el.removeEventListener(type, fn, capture);","                } catch (ex) {}","            } else if (el && el.detachEvent) {","                el.detachEvent('on' + type, fn);","            }","        },","        handleLoad = function() {","            YUI.Env.windowLoaded = true;","            YUI.Env.DOMReady = true;","            if (hasWin) {","                remove(window, 'load', handleLoad);","            }","        },","        getLoader = function(Y, o) {","            var loader = Y.Env._loader,","                lCore = [ 'loader-base' ],","                G_ENV = YUI.Env,","                mods = G_ENV.mods;","","            if (loader) {","                //loader._config(Y.config);","                loader.ignoreRegistered = false;","                loader.onEnd = null;","                loader.data = null;","                loader.required = [];","                loader.loadType = null;","            } else {","                loader = new Y.Loader(Y.config);","                Y.Env._loader = loader;","            }","            if (mods && mods.loader) {","                lCore = [].concat(lCore, YUI.Env.loaderExtras);","            }","            YUI.Env.core = Y.Array.dedupe([].concat(YUI.Env.core, lCore));","","            return loader;","        },","","        clobber = function(r, s) {","            for (var i in s) {","                if (s.hasOwnProperty(i)) {","                    r[i] = s[i];","                }","            }","        },","","        ALREADY_DONE = { success: true };","","//  Stamp the documentElement (HTML) with a class of \"yui-loaded\" to","//  enable styles that need to key off of JS being enabled.","if (docEl && docClass.indexOf(DOC_LABEL) == -1) {","    if (docClass) {","        docClass += ' ';","    }","    docClass += DOC_LABEL;","    docEl.className = docClass;","}","","if (VERSION.indexOf('@') > -1) {","    VERSION = '3.5.0'; // dev time hack for cdn test","}","","proto = {","    /**","    Applies a new configuration object to the config of this YUI instance. This","    will merge new group/module definitions, and will also update the loader","    cache if necessary. Updating `Y.config` directly will not update the cache.","","    @method applyConfig","    @param {Object} o the configuration object.","    @since 3.2.0","    **/","    applyConfig: function(o) {","","        o = o || NOOP;","","        var attr,","            name,","            // detail,","            config = this.config,","            mods = config.modules,","            groups = config.groups,","            aliases = config.aliases,","            loader = this.Env._loader;","","        for (name in o) {","            if (o.hasOwnProperty(name)) {","                attr = o[name];","                if (mods && name == 'modules') {","                    clobber(mods, attr);","                } else if (aliases && name == 'aliases') {","                    clobber(aliases, attr);","                } else if (groups && name == 'groups') {","                    clobber(groups, attr);","                } else if (name == 'win') {","                    config[name] = (attr && attr.contentWindow) || attr;","                    config.doc = config[name] ? config[name].document : null;","                } else if (name == '_yuid') {","                    // preserve the guid","                } else {","                    config[name] = attr;","                }","            }","        }","","        if (loader) {","            loader._config(o);","        }","","    },","","    /**","    Old way to apply a config to this instance (calls `applyConfig` under the","    hood).","","    @private","    @method _config","    @param {Object} o The config to apply","    **/","    _config: function(o) {","        this.applyConfig(o);","    },","","    /**","    Initializes this YUI instance.","","    @private","    @method _init","    **/","    _init: function() {","        var filter, el,","            Y = this,","            G_ENV = YUI.Env,","            Env = Y.Env,","            prop;","","        /**","        The version number of this YUI instance.","","        This value is typically updated by a script when a YUI release is built,","        so it may not reflect the correct version number when YUI is run from","        the development source tree.","","        @property {String} version","        **/","        Y.version = VERSION;","","        if (!Env) {","            Y.Env = {","                core: ['get', 'features', 'intl-base', 'yui-log', 'yui-log-nodejs', 'yui-later', 'loader-base', 'loader-rollup', 'loader-yui3'],","                loaderExtras: ['loader-rollup', 'loader-yui3'],","                mods: {}, // flat module map","                versions: {}, // version module map","                base: BASE,","                cdn: BASE + VERSION + '/build/',","                // bootstrapped: false,","                _idx: 0,","                _used: {},","                _attached: {},","                _missed: [],","                _yidx: 0,","                _uidx: 0,","                _guidp: 'y',","                _loaded: {},","                // serviced: {},","                // Regex in English:","                // I'll start at the \\b(simpleyui).","                // 1. Look in the test string for \"simpleyui\" or \"yui\" or","                //    \"yui-base\" or \"yui-davglass\" or \"yui-foobar\" that comes after a word break.  That is, it","                //    can't match \"foyui\" or \"i_heart_simpleyui\". This can be anywhere in the string.","                // 2. After #1 must come a forward slash followed by the string matched in #1, so","                //    \"yui-base/yui-base\" or \"simpleyui/simpleyui\" or \"yui-pants/yui-pants\".","                // 3. The second occurence of the #1 token can optionally be followed by \"-debug\" or \"-min\",","                //    so \"yui/yui-min\", \"yui/yui-debug\", \"yui-base/yui-base-debug\". NOT \"yui/yui-tshirt\".","                // 4. This is followed by \".js\", so \"yui/yui.js\", \"simpleyui/simpleyui-min.js\"","                // 0. Going back to the beginning, now. If all that stuff in 1-4 comes after a \"?\" in the string,","                //    then capture the junk between the LAST \"&\" and the string in 1-4.  So","                //    \"blah?foo/yui/yui.js\" will capture \"foo/\" and \"blah?some/thing.js&3.3.0/build/yui-davglass/yui-davglass.js\"","                //    will capture \"3.3.0/build/\"","                //","                // Regex Exploded:","                // (?:\\?             Find a ?","                //   (?:[^&]*&)      followed by 0..n characters followed by an &","                //   *               in fact, find as many sets of characters followed by a & as you can","                //   ([^&]*)         capture the stuff after the last & in \\1","                // )?                but it's ok if all this ?junk&more_junk stuff isn't even there","                // \\b(simpleyui|     after a word break find either the string \"simpleyui\" or","                //    yui(?:-\\w+)?   the string \"yui\" optionally followed by a -, then more characters","                // )                 and store the simpleyui or yui-* string in \\2","                // \\/\\2              then comes a / followed by the simpleyui or yui-* string in \\2","                // (?:-(min|debug))? optionally followed by \"-min\" or \"-debug\"","                // .js               and ending in \".js\"","                _BASE_RE: /(?:\\?(?:[^&]*&)*([^&]*))?\\b(simpleyui|yui(?:-\\w+)?)\\/\\2(?:-(min|debug))?\\.js/,","                parseBasePath: function(src, pattern) {","                    var match = src.match(pattern),","                        path, filter;","","                    if (match) {","                        path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));","","                        // this is to set up the path to the loader.  The file","                        // filter for loader should match the yui include.","                        filter = match[3];","","                        // extract correct path for mixed combo urls","                        // http://yuilibrary.com/projects/yui3/ticket/2528423","                        if (match[1]) {","                            path += '?' + match[1];","                        }","                        path = {","                            filter: filter,","                            path: path","                        };","                    }","                    return path;","                },","                getBase: G_ENV && G_ENV.getBase ||","                        function(pattern) {","                            var nodes = (doc && doc.getElementsByTagName('script')) || [],","                                path = Env.cdn, parsed,","                                i, len, src;","","                            for (i = 0, len = nodes.length; i < len; ++i) {","                                src = nodes[i].src;","                                if (src) {","                                    parsed = Y.Env.parseBasePath(src, pattern);","                                    if (parsed) {","                                        filter = parsed.filter;","                                        path = parsed.path;","                                        break;","                                    }","                                }","                            }","","                            // use CDN default","                            return path;","                        }","","            };","","            Env = Y.Env;","","            Env._loaded[VERSION] = {};","","            if (G_ENV && Y !== YUI) {","                Env._yidx = ++G_ENV._yidx;","                Env._guidp = ('yui_' + VERSION + '_' +","                             Env._yidx + '_' + time).replace(/[^a-z0-9_]+/g, '_');","            } else if (YUI._YUI) {","","                G_ENV = YUI._YUI.Env;","                Env._yidx += G_ENV._yidx;","                Env._uidx += G_ENV._uidx;","","                for (prop in G_ENV) {","                    if (!(prop in Env)) {","                        Env[prop] = G_ENV[prop];","                    }","                }","","                delete YUI._YUI;","            }","","            Y.id = Y.stamp(Y);","            instances[Y.id] = Y;","","        }","","        Y.constructor = YUI;","","        // configuration defaults","        Y.config = Y.config || {","            bootstrap: true,","            cacheUse: true,","            debug: true,","            doc: doc,","            fetchCSS: true,","            throwFail: true,","            useBrowserConsole: true,","            useNativeES5: true,","            win: win,","            global: Function('return this')()","        };","","        //Register the CSS stamp element","        if (doc && !doc.getElementById(CSS_STAMP_EL)) {","            el = doc.createElement('div');","            el.innerHTML = '<div id=\"' + CSS_STAMP_EL + '\" style=\"position: absolute !important; visibility: hidden !important\"></div>';","            YUI.Env.cssStampEl = el.firstChild;","            if (doc.body) {","                doc.body.appendChild(YUI.Env.cssStampEl);","            } else {","                docEl.insertBefore(YUI.Env.cssStampEl, docEl.firstChild);","            }","        } else if (doc && doc.getElementById(CSS_STAMP_EL) && !YUI.Env.cssStampEl) {","            YUI.Env.cssStampEl = doc.getElementById(CSS_STAMP_EL);","        }","","        Y.config.lang = Y.config.lang || 'en-US';","","        Y.config.base = YUI.config.base || Y.Env.getBase(Y.Env._BASE_RE);","","        if (!filter || (!('mindebug').indexOf(filter))) {","            filter = 'min';","        }","        filter = (filter) ? '-' + filter : filter;","        Y.config.loaderPath = YUI.config.loaderPath || 'loader/loader' + filter + '.js';","","    },","","    /**","    Finishes the instance setup. Attaches whatever YUI modules were defined","    at the time that this instance was created.","","    @method _setup","    @private","    **/","    _setup: function() {","        var i, Y = this,","            core = [],","            mods = YUI.Env.mods,","            extras = Y.config.core || [].concat(YUI.Env.core); //Clone it..","","        for (i = 0; i < extras.length; i++) {","            if (mods[extras[i]]) {","                core.push(extras[i]);","            }","        }","","        Y._attach(['yui-base']);","        Y._attach(core);","","        if (Y.Loader) {","            getLoader(Y);","        }","","    },","","    /**","    Executes the named method on the specified YUI instance if that method is","    whitelisted.","","    @method applyTo","    @param {String} id YUI instance id.","    @param {String} method Name of the method to execute. For example:","        'Object.keys'.","    @param {Array} args Arguments to apply to the method.","    @return {Mixed} Return value from the applied method, or `null` if the","        specified instance was not found or the method was not whitelisted.","    **/","    applyTo: function(id, method, args) {","        if (!(method in APPLY_TO_AUTH)) {","            this.log(method + ': applyTo not allowed', 'warn', 'yui');","            return null;","        }","","        var instance = instances[id], nest, m, i;","        if (instance) {","            nest = method.split('.');","            m = instance;","            for (i = 0; i < nest.length; i = i + 1) {","                m = m[nest[i]];","                if (!m) {","                    this.log('applyTo not found: ' + method, 'warn', 'yui');","                }","            }","            return m && m.apply(instance, args);","        }","","        return null;","    },","","/**","Registers a YUI module and makes it available for use in a `YUI().use()` call or","as a dependency for other modules.","","The easiest way to create a first-class YUI module is to use","<a href=\"http://yui.github.com/shifter/\">Shifter</a>, the YUI component build","tool.","","Shifter will automatically wrap your module code in a `YUI.add()` call along","with any configuration info required for the module.","","@example","","    YUI.add('davglass', function (Y) {","        Y.davglass = function () {","        };","    }, '3.4.0', {","        requires: ['harley-davidson', 'mt-dew']","    });","","@method add","@param {String} name Module name.","@param {Function} fn Function containing module code. This function will be","    executed whenever the module is attached to a specific YUI instance.","","    @param {YUI} fn.Y The YUI instance to which this module is attached.","    @param {String} fn.name Name of the module","","@param {String} version Module version number. This is currently used only for","    informational purposes, and is not used internally by YUI.","","@param {Object} [config] Module config.","    @param {Array} [config.requires] Array of other module names that must be","        attached before this module can be attached.","    @param {Array} [config.optional] Array of optional module names that should","        be attached before this module is attached if they've already been","        loaded. If the `loadOptional` YUI option is `true`, optional modules","        that have not yet been loaded will be loaded just as if they were hard","        requirements.","    @param {Array} [config.use] Array of module names that are included within","        or otherwise provided by this module, and which should be attached","        automatically when this module is attached. This makes it possible to","        create \"virtual rollup\" modules that simply attach a collection of other","        modules or submodules.","","@return {YUI} This YUI instance.","**/","    add: function(name, fn, version, details) {","        details = details || {};","        var env = YUI.Env,","            mod = {","                name: name,","                fn: fn,","                version: version,","                details: details","            },","            //Instance hash so we don't apply it to the same instance twice","            applied = {},","            loader, inst,","            i, versions = env.versions;","","        env.mods[name] = mod;","        versions[version] = versions[version] || {};","        versions[version][name] = mod;","","        for (i in instances) {","            if (instances.hasOwnProperty(i)) {","                inst = instances[i];","                if (!applied[inst.id]) {","                    applied[inst.id] = true;","                    loader = inst.Env._loader;","                    if (loader) {","                        if (!loader.moduleInfo[name] || loader.moduleInfo[name].temp) {","                            loader.addModule(details, name);","                        }","                    }","                }","            }","        }","","        return this;","    },","","    /**","    Executes the callback function associated with each required module,","    attaching the module to this YUI instance.","","    @method _attach","    @param {Array} r The array of modules to attach","    @param {Boolean} [moot=false] If `true`, don't throw a warning if the module","        is not attached.","    @private","    **/","    _attach: function(r, moot) {","        var i, name, mod, details, req, use, after,","            mods = YUI.Env.mods,","            aliases = YUI.Env.aliases,","            Y = this, j,","            cache = YUI.Env._renderedMods,","            loader = Y.Env._loader,","            done = Y.Env._attached,","            len = r.length, loader, def, go,","            c = [];","","        //Check for conditional modules (in a second+ instance) and add their requirements","        //TODO I hate this entire method, it needs to be fixed ASAP (3.5.0) ^davglass","        for (i = 0; i < len; i++) {","            name = r[i];","            mod = mods[name];","            c.push(name);","            if (loader && loader.conditions[name]) {","                for (j in loader.conditions[name]) {","                    if (loader.conditions[name].hasOwnProperty(j)) {","                        def = loader.conditions[name][j];","                        go = def && ((def.ua && Y.UA[def.ua]) || (def.test && def.test(Y)));","                        if (go) {","                            c.push(def.name);","                        }","                    }","                }","            }","        }","        r = c;","        len = r.length;","","        for (i = 0; i < len; i++) {","            if (!done[r[i]]) {","                name = r[i];","                mod = mods[name];","","                if (aliases && aliases[name] && !mod) {","                    Y._attach(aliases[name]);","                    continue;","                }","                if (!mod) {","                    if (loader && loader.moduleInfo[name]) {","                        mod = loader.moduleInfo[name];","                        moot = true;","                    }","","","                    //if (!loader || !loader.moduleInfo[name]) {","                    //if ((!loader || !loader.moduleInfo[name]) && !moot) {","                    if (!moot && name) {","                        if ((name.indexOf('skin-') === -1) && (name.indexOf('css') === -1)) {","                            Y.Env._missed.push(name);","                            Y.Env._missed = Y.Array.dedupe(Y.Env._missed);","                            Y.message('NOT loaded: ' + name, 'warn', 'yui');","                        }","                    }","                } else {","                    done[name] = true;","                    //Don't like this, but in case a mod was asked for once, then we fetch it","                    //We need to remove it from the missed list ^davglass","                    for (j = 0; j < Y.Env._missed.length; j++) {","                        if (Y.Env._missed[j] === name) {","                            Y.message('Found: ' + name + ' (was reported as missing earlier)', 'warn', 'yui');","                            Y.Env._missed.splice(j, 1);","                        }","                    }","                    /*","                        If it's a temp module, we need to redo it's requirements if it's already loaded","                        since it may have been loaded by another instance and it's dependencies might","                        have been redefined inside the fetched file.","                    */","                    if (loader && cache && cache[name] && cache[name].temp) {","                        loader.getRequires(cache[name]);","                        req = [];","                        for (j in loader.moduleInfo[name].expanded_map) {","                            if (loader.moduleInfo[name].expanded_map.hasOwnProperty(j)) {","                                req.push(j);","                            }","                        }","                        Y._attach(req);","                    }","","                    details = mod.details;","                    req = details.requires;","                    use = details.use;","                    after = details.after;","                    //Force Intl load if there is a language (Loader logic) @todo fix this shit","                    if (details.lang) {","                        req = req || [];","                        req.unshift('intl');","                    }","","                    if (req) {","                        for (j = 0; j < req.length; j++) {","                            if (!done[req[j]]) {","                                if (!Y._attach(req)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","                    if (after) {","                        for (j = 0; j < after.length; j++) {","                            if (!done[after[j]]) {","                                if (!Y._attach(after, true)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","                    if (mod.fn) {","                            if (Y.config.throwFail) {","                                mod.fn(Y, name);","                            } else {","                                try {","                                    mod.fn(Y, name);","                                } catch (e) {","                                    Y.error('Attach error: ' + name, e, name);","                                return false;","                            }","                        }","                    }","","                    if (use) {","                        for (j = 0; j < use.length; j++) {","                            if (!done[use[j]]) {","                                if (!Y._attach(use)) {","                                    return false;","                                }","                                break;","                            }","                        }","                    }","","","","                }","            }","        }","","        return true;","    },","","    /**","    Delays the `use` callback until another event has taken place such as","    `window.onload`, `domready`, `contentready`, or `available`.","","    @private","    @method _delayCallback","    @param {Function} cb The original `use` callback.","    @param {String|Object} until Either an event name ('load', 'domready', etc.)","        or an object containing event/args keys for contentready/available.","    @return {Function}","    **/","    _delayCallback: function(cb, until) {","","        var Y = this,","            mod = ['event-base'];","","        until = (Y.Lang.isObject(until) ? until : { event: until });","","        if (until.event === 'load') {","            mod.push('event-synthetic');","        }","","        return function() {","            var args = arguments;","            Y._use(mod, function() {","                Y.on(until.event, function() {","                    args[1].delayUntil = until.event;","                    cb.apply(Y, args);","                }, until.args);","            });","        };","    },","","    /**","    Attaches one or more modules to this YUI instance. When this is executed,","    the requirements of the desired modules are analyzed, and one of several","    things can happen:","","","      * All required modules have already been loaded, and just need to be","        attached to this YUI instance. In this case, the `use()` callback will","        be executed synchronously after the modules are attached.","","      * One or more modules have not yet been loaded, or the Get utility is not","        available, or the `bootstrap` config option is `false`. In this case,","        a warning is issued indicating that modules are missing, but all","        available modules will still be attached and the `use()` callback will","        be executed synchronously.","","      * One or more modules are missing and the Loader is not available but the","        Get utility is, and `bootstrap` is not `false`. In this case, the Get","        utility will be used to load the Loader, and we will then proceed to","        the following state:","","      * One or more modules are missing and the Loader is available. In this","        case, the Loader will be used to resolve the dependency tree for the","        missing modules and load them and their dependencies. When the Loader is","        finished loading modules, the `use()` callback will be executed","        asynchronously.","","    @example","","        // Loads and attaches dd and its dependencies.","        YUI().use('dd', function (Y) {","            // ...","        });","","        // Loads and attaches dd and node as well as all of their dependencies.","        YUI().use(['dd', 'node'], function (Y) {","            // ...","        });","","        // Attaches all modules that have already been loaded.","        YUI().use('*', function (Y) {","            // ...","        });","","        // Attaches a gallery module.","        YUI().use('gallery-yql', function (Y) {","            // ...","        });","","        // Attaches a YUI 2in3 module.","        YUI().use('yui2-datatable', function (Y) {","            // ...","        });","","    @method use","    @param {String|Array} modules* One or more module names to attach.","    @param {Function} [callback] Callback function to be executed once all","        specified modules and their dependencies have been attached.","    @param {YUI} callback.Y The YUI instance created for this sandbox.","    @param {Object} callback.status Object containing `success`, `msg` and","        `data` properties.","    @chainable","    **/","    use: function() {","        var args = SLICE.call(arguments, 0),","            callback = args[args.length - 1],","            Y = this,","            i = 0,","            name,","            Env = Y.Env,","            provisioned = true;","","        // The last argument supplied to use can be a load complete callback","        if (Y.Lang.isFunction(callback)) {","            args.pop();","            if (Y.config.delayUntil) {","                callback = Y._delayCallback(callback, Y.config.delayUntil);","            }","        } else {","            callback = null;","        }","        if (Y.Lang.isArray(args[0])) {","            args = args[0];","        }","","        if (Y.config.cacheUse) {","            while ((name = args[i++])) {","                if (!Env._attached[name]) {","                    provisioned = false;","                    break;","                }","            }","","            if (provisioned) {","                if (args.length) {","                }","                Y._notify(callback, ALREADY_DONE, args);","                return Y;","            }","        }","","        if (Y._loading) {","            Y._useQueue = Y._useQueue || new Y.Queue();","            Y._useQueue.add([args, callback]);","        } else {","            Y._use(args, function(Y, response) {","                Y._notify(callback, response, args);","            });","        }","","        return Y;","    },","","    /**","    Handles Loader notifications about attachment/load errors.","","    @method _notify","    @param {Function} callback Callback to pass to `Y.config.loadErrorFn`.","    @param {Object} response Response returned from Loader.","    @param {Array} args Arguments passed from Loader.","    @private","    **/","    _notify: function(callback, response, args) {","        if (!response.success && this.config.loadErrorFn) {","            this.config.loadErrorFn.call(this, this, callback, response, args);","        } else if (callback) {","            if (this.Env._missed && this.Env._missed.length) {","                response.msg = 'Missing modules: ' + this.Env._missed.join();","                response.success = false;","            }","            if (this.config.throwFail) {","                callback(this, response);","            } else {","                try {","                    callback(this, response);","                } catch (e) {","                    this.error('use callback error', e, args);","                }","            }","        }","    },","","    /**","    Called from the `use` method queue to ensure that only one set of loading","    logic is performed at a time.","","    @method _use","    @param {String} args* One or more modules to attach.","    @param {Function} [callback] Function to call once all required modules have","        been attached.","    @private","    **/","    _use: function(args, callback) {","","        if (!this.Array) {","            this._attach(['yui-base']);","        }","","        var len, loader, handleBoot,","            Y = this,","            G_ENV = YUI.Env,","            mods = G_ENV.mods,","            Env = Y.Env,","            used = Env._used,","            aliases = G_ENV.aliases,","            queue = G_ENV._loaderQueue,","            firstArg = args[0],","            YArray = Y.Array,","            config = Y.config,","            boot = config.bootstrap,","            missing = [],","            i,","            r = [],","            ret = true,","            fetchCSS = config.fetchCSS,","            process = function(names, skip) {","","                var i = 0, a = [], name, len, m, req, use;","","                if (!names.length) {","                    return;","                }","","                if (aliases) {","                    len = names.length;","                    for (i = 0; i < len; i++) {","                        if (aliases[names[i]] && !mods[names[i]]) {","                            a = [].concat(a, aliases[names[i]]);","                        } else {","                            a.push(names[i]);","                        }","                    }","                    names = a;","                }","","                len = names.length;","","                for (i = 0; i < len; i++) {","                    name = names[i];","                    if (!skip) {","                        r.push(name);","                    }","","                    // only attach a module once","                    if (used[name]) {","                        continue;","                    }","","                    m = mods[name];","                    req = null;","                    use = null;","","                    if (m) {","                        used[name] = true;","                        req = m.details.requires;","                        use = m.details.use;","                    } else {","                        // CSS files don't register themselves, see if it has","                        // been loaded","                        if (!G_ENV._loaded[VERSION][name]) {","                            missing.push(name);","                        } else {","                            used[name] = true; // probably css","                        }","                    }","","                    // make sure requirements are attached","                    if (req && req.length) {","                        process(req);","                    }","","                    // make sure we grab the submodule dependencies too","                    if (use && use.length) {","                        process(use, 1);","                    }","                }","","            },","","            handleLoader = function(fromLoader) {","                var response = fromLoader || {","                        success: true,","                        msg: 'not dynamic'","                    },","                    redo, origMissing,","                    ret = true,","                    data = response.data;","","                Y._loading = false;","","                if (data) {","                    origMissing = missing;","                    missing = [];","                    r = [];","                    process(data);","                    redo = missing.length;","                    if (redo) {","                        if ([].concat(missing).sort().join() ==","                                origMissing.sort().join()) {","                            redo = false;","                        }","                    }","                }","","                if (redo && data) {","                    Y._loading = true;","                    Y._use(missing, function() {","                        if (Y._attach(data)) {","                            Y._notify(callback, response, data);","                        }","                    });","                } else {","                    if (data) {","                        ret = Y._attach(data);","                    }","                    if (ret) {","                        Y._notify(callback, response, args);","                    }","                }","","                if (Y._useQueue && Y._useQueue.size() && !Y._loading) {","                    Y._use.apply(Y, Y._useQueue.next());","                }","","            };","","","        // YUI().use('*'); // bind everything available","        if (firstArg === '*') {","            args = [];","            for (i in mods) {","                if (mods.hasOwnProperty(i)) {","                    args.push(i);","                }","            }","            ret = Y._attach(args);","            if (ret) {","                handleLoader();","            }","            return Y;","        }","","        if ((mods.loader || mods['loader-base']) && !Y.Loader) {","            Y._attach(['loader' + ((!mods.loader) ? '-base' : '')]);","        }","","","        // use loader to expand dependencies and sort the","        // requirements if it is available.","        if (boot && Y.Loader && args.length) {","            loader = getLoader(Y);","            loader.require(args);","            loader.ignoreRegistered = true;","            loader._boot = true;","            loader.calculate(null, (fetchCSS) ? null : 'js');","            args = loader.sorted;","            loader._boot = false;","        }","","        process(args);","","        len = missing.length;","","","        if (len) {","            missing = YArray.dedupe(missing);","            len = missing.length;","        }","","","        // dynamic load","        if (boot && len && Y.Loader) {","            Y._loading = true;","            loader = getLoader(Y);","            loader.onEnd = handleLoader;","            loader.context = Y;","            loader.data = args;","            loader.ignoreRegistered = false;","            loader.require(missing);","            loader.insert(null, (fetchCSS) ? null : 'js');","","        } else if (boot && len && Y.Get && !Env.bootstrapped) {","","            Y._loading = true;","","            handleBoot = function() {","                Y._loading = false;","                queue.running = false;","                Env.bootstrapped = true;","                G_ENV._bootstrapping = false;","                if (Y._attach(['loader'])) {","                    Y._use(args, callback);","                }","            };","","            if (G_ENV._bootstrapping) {","                queue.add(handleBoot);","            } else {","                G_ENV._bootstrapping = true;","                Y.Get.script(config.base + config.loaderPath, {","                    onEnd: handleBoot","                });","            }","","        } else {","            ret = Y._attach(args);","            if (ret) {","                handleLoader();","            }","        }","","        return Y;","    },","","","    /**","    Utility method for safely creating namespaces if they don't already exist.","    May be called statically on the YUI global object or as a method on a YUI","    instance.","","    When called statically, a namespace will be created on the YUI global","    object:","","        // Create `YUI.your.namespace.here` as nested objects, preserving any","        // objects that already exist instead of overwriting them.","        YUI.namespace('your.namespace.here');","","    When called as a method on a YUI instance, a namespace will be created on","    that instance:","","        // Creates `Y.property.package`.","        Y.namespace('property.package');","","    Dots in the input string cause `namespace` to create nested objects for each","    token. If any part of the requested namespace already exists, the current","    object will be left in place and will not be overwritten. This allows","    multiple calls to `namespace` to preserve existing namespaced properties.","","    If the first token in the namespace string is \"YAHOO\", that token is","    discarded. This is legacy behavior for backwards compatibility with YUI 2.","","    Be careful with namespace tokens. Reserved words may work in some browsers","    and not others. For instance, the following will fail in some browsers","    because the supported version of JavaScript reserves the word \"long\":","","        Y.namespace('really.long.nested.namespace');","","    Note: If you pass multiple arguments to create multiple namespaces, only the","    last one created is returned from this function.","","    @method namespace","    @param {String} namespace* One or more namespaces to create.","    @return {Object} Reference to the last namespace object created.","    **/","    namespace: function() {","        var a = arguments, o, i = 0, j, d, arg;","","        for (; i < a.length; i++) {","            o = this; //Reset base object per argument or it will get reused from the last","            arg = a[i];","            if (arg.indexOf(PERIOD) > -1) { //Skip this if no \".\" is present","                d = arg.split(PERIOD);","                for (j = (d[0] == 'YAHOO') ? 1 : 0; j < d.length; j++) {","                    o[d[j]] = o[d[j]] || {};","                    o = o[d[j]];","                }","            } else {","                o[arg] = o[arg] || {};","                o = o[arg]; //Reset base object to the new object so it's returned","            }","        }","        return o;","    },","","    // this is replaced if the log module is included","    log: NOOP,","    message: NOOP,","    // this is replaced if the dump module is included","    dump: function (o) { return ''+o; },","","    /**","    Reports an error.","","    The reporting mechanism is controlled by the `throwFail` configuration","    attribute. If `throwFail` is falsy, the message is logged. If `throwFail` is","    truthy, a JS exception is thrown.","","    If an `errorFn` is specified in the config it must return `true` to indicate","    that the exception was handled and keep it from being thrown.","","    @method error","    @param {String} msg Error message.","    @param {Error|String} [e] JavaScript error object or an error string.","    @param {String} [src] Source of the error (such as the name of the module in","        which the error occurred).","    @chainable","    **/","    error: function(msg, e, src) {","        //TODO Add check for window.onerror here","","        var Y = this, ret;","","        if (Y.config.errorFn) {","            ret = Y.config.errorFn.apply(Y, arguments);","        }","","        if (!ret) {","            throw (e || new Error(msg));","        } else {","            Y.message(msg, 'error', ''+src); // don't scrub this one","        }","","        return Y;","    },","","    /**","    Generates an id string that is unique among all YUI instances in this","    execution context.","","    @method guid","    @param {String} [pre] Prefix.","    @return {String} Unique id.","    **/","    guid: function(pre) {","        var id = this.Env._guidp + '_' + (++this.Env._uidx);","        return (pre) ? (pre + id) : id;","    },","","    /**","    Returns a unique id associated with the given object and (if *readOnly* is","    falsy) stamps the object with that id so it can be identified in the future.","","    Stamping an object involves adding a `_yuid` property to it that contains","    the object's id. One exception to this is that in Internet Explorer, DOM","    nodes have a `uniqueID` property that contains a browser-generated unique","    id, which will be used instead of a YUI-generated id when available.","","    @method stamp","    @param {Object} o Object to stamp.","    @param {Boolean} readOnly If truthy and the given object has not already","        been stamped, the object will not be modified and `null` will be","        returned.","    @return {String} Object's unique id, or `null` if *readOnly* was truthy and","        the given object was not already stamped.","    **/","    stamp: function(o, readOnly) {","        var uid;","        if (!o) {","            return o;","        }","","        // IE generates its own unique ID for dom nodes","        // The uniqueID property of a document node returns a new ID","        if (o.uniqueID && o.nodeType && o.nodeType !== 9) {","            uid = o.uniqueID;","        } else {","            uid = (typeof o === 'string') ? o : o._yuid;","        }","","        if (!uid) {","            uid = this.guid();","            if (!readOnly) {","                try {","                    o._yuid = uid;","                } catch (e) {","                    uid = null;","                }","            }","        }","        return uid;","    },","","    /**","    Destroys this YUI instance.","","    @method destroy","    @since 3.3.0","    **/","    destroy: function() {","        var Y = this;","        if (Y.Event) {","            Y.Event._unload();","        }","        delete instances[Y.id];","        delete Y.Env;","        delete Y.config;","    }","","    /**","    Safe `instanceof` wrapper that works around a memory leak in IE when the","    object being tested is `window` or `document`.","","    Unless you are testing objects that may be `window` or `document`, you","    should use the native `instanceof` operator instead of this method.","","    @method instanceOf","    @param {Object} o Object to check.","    @param {Object} type Class to check against.","    @since 3.3.0","    **/","};","","    YUI.prototype = proto;","","    // inheritance utilities are not available yet","    for (prop in proto) {","        if (proto.hasOwnProperty(prop)) {","            YUI[prop] = proto[prop];","        }","    }","","    /**","    Applies a configuration to all YUI instances in this execution context.","","    The main use case for this method is in \"mashups\" where several third-party","    scripts need to write to a global YUI config, but cannot share a single","    centrally-managed config object. This way they can all call","    `YUI.applyConfig({})` instead of overwriting the single global config.","","    @example","","        YUI.applyConfig({","            modules: {","                davglass: {","                    fullpath: './davglass.js'","                }","            }","        });","","        YUI.applyConfig({","            modules: {","                foo: {","                    fullpath: './foo.js'","                }","            }","        });","","        YUI().use('davglass', function (Y) {","            // Module davglass will be available here.","        });","","    @method applyConfig","    @param {Object} o Configuration object to apply.","    @static","    @since 3.5.0","    **/","    YUI.applyConfig = function(o) {","        if (!o) {","            return;","        }","        //If there is a GlobalConfig, apply it first to set the defaults","        if (YUI.GlobalConfig) {","            this.prototype.applyConfig.call(this, YUI.GlobalConfig);","        }","        //Apply this config to it","        this.prototype.applyConfig.call(this, o);","        //Reset GlobalConfig to the combined config","        YUI.GlobalConfig = this.config;","    };","","    // set up the environment","    YUI._init();","","    if (hasWin) {","        // add a window load event at load time so we can capture","        // the case where it fires before dynamic loading is","        // complete.","        add(window, 'load', handleLoad);","    } else {","        handleLoad();","    }","","    YUI.Env.add = add;","    YUI.Env.remove = remove;","","    /*global exports*/","    // Support the CommonJS method for exporting our single global","    if (typeof exports == 'object') {","        exports.YUI = YUI;","        /**","        * Set a method to be called when `Get.script` is called in Node.js","        * `Get` will open the file, then pass it's content and it's path","        * to this method before attaching it. Commonly used for code coverage","        * instrumentation. <strong>Calling this multiple times will only","        * attach the last hook method</strong>. This method is only","        * available in Node.js.","        * @method setLoadHook","        * @static","        * @param {Function} fn The function to set","        * @param {String} fn.data The content of the file","        * @param {String} fn.path The file path of the file","        */","        YUI.setLoadHook = function(fn) {","            YUI._getLoadHook = fn;","        };","        /**","        * Load hook for `Y.Get.script` in Node.js, see `YUI.setLoadHook`","        * @method _getLoadHook","        * @private","        * @param {String} data The content of the file","        * @param {String} path The file path of the file","        */","        YUI._getLoadHook = null;","    }","","}());","","","/**","Config object that contains all of the configuration options for","this `YUI` instance.","","This object is supplied by the implementer when instantiating YUI. Some","properties have default values if they are not supplied by the implementer.","","This object should not be updated directly because some values are cached. Use","`applyConfig()` to update the config object on a YUI instance that has already","been configured.","","@class config","@static","**/","","/**","If `true` (the default), YUI will \"bootstrap\" the YUI Loader and module metadata","if they're needed to load additional dependencies and aren't already available.","","Setting this to `false` will prevent YUI from automatically loading the Loader","and module metadata, so you will need to manually ensure that they're available","or handle dependency resolution yourself.","","@property {Boolean} bootstrap","@default true","**/","","/**","","@property {Object} aliases","**/","","/**","A hash of module group definitions.","","For each group you can specify a list of modules and the base path and","combo spec to use when dynamically loading the modules.","","@example","","    groups: {","        yui2: {","            // specify whether or not this group has a combo service","            combine: true,","","            // The comboSeperator to use with this group's combo handler","            comboSep: ';',","","            // The maxURLLength for this server","            maxURLLength: 500,","","            // the base path for non-combo paths","            base: 'http://yui.yahooapis.com/2.8.0r4/build/',","","            // the path to the combo service","            comboBase: 'http://yui.yahooapis.com/combo?',","","            // a fragment to prepend to the path attribute when","            // when building combo urls","            root: '2.8.0r4/build/',","","            // the module definitions","            modules:  {","                yui2_yde: {","                    path: \"yahoo-dom-event/yahoo-dom-event.js\"","                },","                yui2_anim: {","                    path: \"animation/animation.js\",","                    requires: ['yui2_yde']","                }","            }","        }","    }","","@property {Object} groups","**/","","/**","Path to the Loader JS file, relative to the `base` path.","","This is used to dynamically bootstrap the Loader when it's needed and isn't yet","available.","","@property {String} loaderPath","@default \"loader/loader-min.js\"","**/","","/**","If `true`, YUI will attempt to load CSS dependencies and skins. Set this to","`false` to prevent YUI from loading any CSS, or set it to the string `\"force\"`","to force CSS dependencies to be loaded even if their associated JS modules are","already loaded.","","@property {Boolean|String} fetchCSS","@default true","**/","","/**","Default gallery version used to build gallery module urls.","","@property {String} gallery","@since 3.1.0","**/","","/**","Default YUI 2 version used to build YUI 2 module urls.","","This is used for intrinsic YUI 2 support via the 2in3 project. Also see the","`2in3` config for pulling different revisions of the wrapped YUI 2 modules.","","@property {String} yui2","@default \"2.9.0\"","@since 3.1.0","**/","","/**","Revision number of YUI 2in3 modules that should be used when loading YUI 2in3.","","@property {String} 2in3","@default \"4\"","@since 3.1.0","**/","","/**","Alternate console log function that should be used in environments without a","supported native console. This function is executed with the YUI instance as its","`this` object.","","@property {Function} logFn","@since 3.1.0","**/","","/**","Callback to execute when `Y.error()` is called. It receives the error message","and a JavaScript error object if one was provided.","","This function is executed with the YUI instance as its `this` object.","","Returning `true` from this function will prevent an exception from being thrown.","","@property {Function} errorFn","@param {String} errorFn.msg Error message","@param {Object} [errorFn.err] Error object (if one was provided).","@since 3.2.0","**/","","/**","A callback to execute when Loader fails to load one or more resources.","","This could be because of a script load failure. It could also be because a","module fails to register itself when the `requireRegistration` config is `true`.","","If this function is defined, the `use()` callback will only be called when the","loader succeeds. Otherwise, `use()` will always executes unless there was a","JavaScript error when attaching a module.","","@property {Function} loadErrorFn","@since 3.3.0","**/","","/**","If `true`, Loader will expect all loaded scripts to be first-class YUI modules","that register themselves with the YUI global, and will trigger a failure if a","loaded script does not register a YUI module.","","@property {Boolean} requireRegistration","@default false","@since 3.3.0","**/","","/**","Cache serviced use() requests.","","@property {Boolean} cacheUse","@default true","@since 3.3.0","@deprecated No longer used.","**/","","/**","Whether or not YUI should use native ES5 functionality when available for","features like `Y.Array.each()`, `Y.Object()`, etc.","","When `false`, YUI will always use its own fallback implementations instead of","relying on ES5 functionality, even when ES5 functionality is available.","","@property {Boolean} useNativeES5","@default true","@since 3.5.0","**/","","/**"," * Leverage native JSON stringify if the browser has a native"," * implementation.  In general, this is a good idea.  See the Known Issues"," * section in the JSON user guide for caveats.  The default value is true"," * for browsers with native JSON support."," *"," * @property useNativeJSONStringify"," * @type Boolean"," * @default true"," * @since 3.8.0"," */",""," /**"," * Leverage native JSON parse if the browser has a native implementation."," * In general, this is a good idea.  See the Known Issues section in the"," * JSON user guide for caveats.  The default value is true for browsers with"," * native JSON support."," *"," * @property useNativeJSONParse"," * @type Boolean"," * @default true"," * @since 3.8.0"," */","","/**","Delay the `use` callback until a specific event has passed (`load`, `domready`, `contentready` or `available`)","@property delayUntil","@type String|Object","@since 3.6.0","@example","","You can use `load` or `domready` strings by default:","","    YUI({","        delayUntil: 'domready'","    }, function (Y) {","        // This will not execute until 'domeready' occurs.","    });","","Or you can delay until a node is available (with `available` or `contentready`):","","    YUI({","        delayUntil: {","            event: 'available',","            args : '#foo'","        }","    }, function (Y) {","        // This will not execute until a node matching the selector \"#foo\" is","        // available in the DOM.","    });","","@property {Object|String} delayUntil","@since 3.6.0","**/","YUI.add('yui-base', function (Y, NAME) {","","/*"," * YUI stub"," * @module yui"," * @submodule yui-base"," */","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * Provides core language utilites and extensions used throughout YUI."," *"," * @class Lang"," * @static"," */","","var L = Y.Lang || (Y.Lang = {}),","","STRING_PROTO = String.prototype,","TOSTRING     = Object.prototype.toString,","","TYPES = {","    'undefined'        : 'undefined',","    'number'           : 'number',","    'boolean'          : 'boolean',","    'string'           : 'string',","    '[object Function]': 'function',","    '[object RegExp]'  : 'regexp',","    '[object Array]'   : 'array',","    '[object Date]'    : 'date',","    '[object Error]'   : 'error'","},","","SUBREGEX        = /\\{\\s*([^|}]+?)\\s*(?:\\|([^}]*))?\\s*\\}/g,","TRIMREGEX       = /^\\s+|\\s+$/g,","NATIVE_FN_REGEX = /\\{\\s*\\[(?:native code|function)\\]\\s*\\}/i;","","// -- Protected Methods --------------------------------------------------------","","/**","Returns `true` if the given function appears to be implemented in native code,","`false` otherwise. Will always return `false` -- even in ES5-capable browsers --","if the `useNativeES5` YUI config option is set to `false`.","","This isn't guaranteed to be 100% accurate and won't work for anything other than","functions, but it can be useful for determining whether a function like","`Array.prototype.forEach` is native or a JS shim provided by another library.","","There's a great article by @kangax discussing certain flaws with this technique:","<http://perfectionkills.com/detecting-built-in-host-methods/>","","While his points are valid, it's still possible to benefit from this function","as long as it's used carefully and sparingly, and in such a way that false","negatives have minimal consequences. It's used internally to avoid using","potentially broken non-native ES5 shims that have been added to the page by","other libraries.","","@method _isNative","@param {Function} fn Function to test.","@return {Boolean} `true` if _fn_ appears to be native, `false` otherwise.","@static","@protected","@since 3.5.0","**/","L._isNative = function (fn) {","    return !!(Y.config.useNativeES5 && fn && NATIVE_FN_REGEX.test(fn));","};","","// -- Public Methods -----------------------------------------------------------","","/**"," * Determines whether or not the provided item is an array."," *"," * Returns `false` for array-like collections such as the function `arguments`"," * collection or `HTMLElement` collections. Use `Y.Array.test()` if you want to"," * test for an array-like collection."," *"," * @method isArray"," * @param o The object to test."," * @return {boolean} true if o is an array."," * @static"," */","L.isArray = L._isNative(Array.isArray) ? Array.isArray : function (o) {","    return L.type(o) === 'array';","};","","/**"," * Determines whether or not the provided item is a boolean."," * @method isBoolean"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a boolean."," */","L.isBoolean = function(o) {","    return typeof o === 'boolean';","};","","/**"," * Determines whether or not the supplied item is a date instance."," * @method isDate"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a date."," */","L.isDate = function(o) {","    return L.type(o) === 'date' && o.toString() !== 'Invalid Date' && !isNaN(o);","};","","/**"," * <p>"," * Determines whether or not the provided item is a function."," * Note: Internet Explorer thinks certain functions are objects:"," * </p>"," *"," * <pre>"," * var obj = document.createElement(\"object\");"," * Y.Lang.isFunction(obj.getAttribute) // reports false in IE"," * &nbsp;"," * var input = document.createElement(\"input\"); // append to body"," * Y.Lang.isFunction(input.focus) // reports false in IE"," * </pre>"," *"," * <p>"," * You will have to implement additional tests if these functions"," * matter to you."," * </p>"," *"," * @method isFunction"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a function."," */","L.isFunction = function(o) {","    return L.type(o) === 'function';","};","","/**"," * Determines whether or not the provided item is null."," * @method isNull"," * @static"," * @param o The object to test."," * @return {boolean} true if o is null."," */","L.isNull = function(o) {","    return o === null;","};","","/**"," * Determines whether or not the provided item is a legal number."," * @method isNumber"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a number."," */","L.isNumber = function(o) {","    return typeof o === 'number' && isFinite(o);","};","","/**"," * Determines whether or not the provided item is of type object"," * or function. Note that arrays are also objects, so"," * <code>Y.Lang.isObject([]) === true</code>."," * @method isObject"," * @static"," * @param o The object to test."," * @param failfn {boolean} fail if the input is a function."," * @return {boolean} true if o is an object."," * @see isPlainObject"," */","L.isObject = function(o, failfn) {","    var t = typeof o;","    return (o && (t === 'object' ||","        (!failfn && (t === 'function' || L.isFunction(o))))) || false;","};","","/**"," * Determines whether or not the provided item is a string."," * @method isString"," * @static"," * @param o The object to test."," * @return {boolean} true if o is a string."," */","L.isString = function(o) {","    return typeof o === 'string';","};","","/**"," * Determines whether or not the provided item is undefined."," * @method isUndefined"," * @static"," * @param o The object to test."," * @return {boolean} true if o is undefined."," */","L.isUndefined = function(o) {","    return typeof o === 'undefined';","};","","/**"," * A convenience method for detecting a legitimate non-null value."," * Returns false for null/undefined/NaN, true for other values,"," * including 0/false/''"," * @method isValue"," * @static"," * @param o The item to test."," * @return {boolean} true if it is not null/undefined/NaN || false."," */","L.isValue = function(o) {","    var t = L.type(o);","","    switch (t) {","        case 'number':","            return isFinite(o);","","        case 'null': // fallthru","        case 'undefined':","            return false;","","        default:","            return !!t;","    }","};","","/**"," * Returns the current time in milliseconds."," *"," * @method now"," * @return {Number} Current time in milliseconds."," * @static"," * @since 3.3.0"," */","L.now = Date.now || function () {","    return new Date().getTime();","};","","/**"," * Lightweight version of <code>Y.substitute</code>. Uses the same template"," * structure as <code>Y.substitute</code>, but doesn't support recursion,"," * auto-object coersion, or formats."," * @method sub"," * @param {string} s String to be modified."," * @param {object} o Object containing replacement values."," * @return {string} the substitute result."," * @static"," * @since 3.2.0"," */","L.sub = function(s, o) {","    return s.replace ? s.replace(SUBREGEX, function (match, key) {","        return L.isUndefined(o[key]) ? match : o[key];","    }) : s;","};","","/**"," * Returns a string without any leading or trailing whitespace.  If"," * the input is not a string, the input will be returned untouched."," * @method trim"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trim = STRING_PROTO.trim ? function(s) {","    return s && s.trim ? s.trim() : s;","} : function (s) {","    try {","        return s.replace(TRIMREGEX, '');","    } catch (e) {","        return s;","    }","};","","/**"," * Returns a string without any leading whitespace."," * @method trimLeft"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trimLeft = STRING_PROTO.trimLeft ? function (s) {","    return s.trimLeft();","} : function (s) {","    return s.replace(/^\\s+/, '');","};","","/**"," * Returns a string without any trailing whitespace."," * @method trimRight"," * @static"," * @param s {string} the string to trim."," * @return {string} the trimmed string."," */","L.trimRight = STRING_PROTO.trimRight ? function (s) {","    return s.trimRight();","} : function (s) {","    return s.replace(/\\s+$/, '');","};","","/**","Returns one of the following strings, representing the type of the item passed","in:",""," * \"array\""," * \"boolean\""," * \"date\""," * \"error\""," * \"function\""," * \"null\""," * \"number\""," * \"object\""," * \"regexp\""," * \"string\""," * \"undefined\"","","Known issues:",""," * `typeof HTMLElementCollection` returns function in Safari, but","    `Y.Lang.type()` reports \"object\", which could be a good thing --","    but it actually caused the logic in <code>Y.Lang.isObject</code> to fail.","","@method type","@param o the item to test.","@return {string} the detected type.","@static","**/","L.type = function(o) {","    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');","};","/**","@module yui","@submodule yui-base","*/","","var Lang   = Y.Lang,","    Native = Array.prototype,","","    hasOwn = Object.prototype.hasOwnProperty;","","/**","Provides utility methods for working with arrays. Additional array helpers can","be found in the `collection` and `array-extras` modules.","","`Y.Array(thing)` returns a native array created from _thing_. Depending on","_thing_'s type, one of the following will happen:","","  * Arrays are returned unmodified unless a non-zero _startIndex_ is","    specified.","  * Array-like collections (see `Array.test()`) are converted to arrays.","  * For everything else, a new array is created with _thing_ as the sole","    item.","","Note: elements that are also collections, such as `<form>` and `<select>`","elements, are not automatically converted to arrays. To force a conversion,","pass `true` as the value of the _force_ parameter.","","@class Array","@constructor","@param {Any} thing The thing to arrayify.","@param {Number} [startIndex=0] If non-zero and _thing_ is an array or array-like","  collection, a subset of items starting at the specified index will be","  returned.","@param {Boolean} [force=false] If `true`, _thing_ will be treated as an","  array-like collection no matter what.","@return {Array} A native array created from _thing_, according to the rules","  described above.","**/","function YArray(thing, startIndex, force) {","    var len, result;","","    /*jshint expr: true*/","    startIndex || (startIndex = 0);","","    if (force || YArray.test(thing)) {","        // IE throws when trying to slice HTMLElement collections.","        try {","            return Native.slice.call(thing, startIndex);","        } catch (ex) {","            result = [];","","            for (len = thing.length; startIndex < len; ++startIndex) {","                result.push(thing[startIndex]);","            }","","            return result;","        }","    }","","    return [thing];","}","","Y.Array = YArray;","","/**","Dedupes an array of strings, returning an array that's guaranteed to contain","only one copy of a given string.","","This method differs from `Array.unique()` in that it's optimized for use only","with strings, whereas `unique` may be used with other types (but is slower).","Using `dedupe()` with non-string values may result in unexpected behavior.","","@method dedupe","@param {String[]} array Array of strings to dedupe.","@return {Array} Deduped copy of _array_.","@static","@since 3.4.0","**/","YArray.dedupe = function (array) {","    var hash    = {},","        results = [],","        i, item, len;","","    for (i = 0, len = array.length; i < len; ++i) {","        item = array[i];","","        if (!hasOwn.call(hash, item)) {","            hash[item] = 1;","            results.push(item);","        }","    }","","    return results;","};","","/**","Executes the supplied function on each item in the array. This method wraps","the native ES5 `Array.forEach()` method if available.","","@method each","@param {Array} array Array to iterate.","@param {Function} fn Function to execute on each item in the array. The function","  will receive the following arguments:","    @param {Any} fn.item Current array item.","    @param {Number} fn.index Current array index.","    @param {Array} fn.array Array being iterated.","@param {Object} [thisObj] `this` object to use when calling _fn_.","@return {YUI} The YUI instance.","@static","**/","YArray.each = YArray.forEach = Lang._isNative(Native.forEach) ? function (array, fn, thisObj) {","    Native.forEach.call(array || [], fn, thisObj || Y);","    return Y;","} : function (array, fn, thisObj) {","    for (var i = 0, len = (array && array.length) || 0; i < len; ++i) {","        if (i in array) {","            fn.call(thisObj || Y, array[i], i, array);","        }","    }","","    return Y;","};","","/**","Alias for `each()`.","","@method forEach","@static","**/","","/**","Returns an object using the first array as keys and the second as values. If","the second array is not provided, or if it doesn't contain the same number of","values as the first array, then `true` will be used in place of the missing","values.","","@example","","    Y.Array.hash(['a', 'b', 'c'], ['foo', 'bar']);","    // => {a: 'foo', b: 'bar', c: true}","","@method hash","@param {String[]} keys Array of strings to use as keys.","@param {Array} [values] Array to use as values.","@return {Object} Hash using the first array as keys and the second as values.","@static","**/","YArray.hash = function (keys, values) {","    var hash = {},","        vlen = (values && values.length) || 0,","        i, len;","","    for (i = 0, len = keys.length; i < len; ++i) {","        if (i in keys) {","            hash[keys[i]] = vlen > i && i in values ? values[i] : true;","        }","    }","","    return hash;","};","","/**","Returns the index of the first item in the array that's equal (using a strict","equality check) to the specified _value_, or `-1` if the value isn't found.","","This method wraps the native ES5 `Array.indexOf()` method if available.","","@method indexOf","@param {Array} array Array to search.","@param {Any} value Value to search for.","@param {Number} [from=0] The index at which to begin the search.","@return {Number} Index of the item strictly equal to _value_, or `-1` if not","    found.","@static","**/","YArray.indexOf = Lang._isNative(Native.indexOf) ? function (array, value, from) {","    return Native.indexOf.call(array, value, from);","} : function (array, value, from) {","    // http://es5.github.com/#x15.4.4.14","    var len = array.length;","","    from = +from || 0;","    from = (from > 0 || -1) * Math.floor(Math.abs(from));","","    if (from < 0) {","        from += len;","","        if (from < 0) {","            from = 0;","        }","    }","","    for (; from < len; ++from) {","        if (from in array && array[from] === value) {","            return from;","        }","    }","","    return -1;","};","","/**","Numeric sort convenience function.","","The native `Array.prototype.sort()` function converts values to strings and","sorts them in lexicographic order, which is unsuitable for sorting numeric","values. Provide `Array.numericSort` as a custom sort function when you want","to sort values in numeric order.","","@example","","    [42, 23, 8, 16, 4, 15].sort(Y.Array.numericSort);","    // => [4, 8, 15, 16, 23, 42]","","@method numericSort","@param {Number} a First value to compare.","@param {Number} b Second value to compare.","@return {Number} Difference between _a_ and _b_.","@static","**/","YArray.numericSort = function (a, b) {","    return a - b;","};","","/**","Executes the supplied function on each item in the array. Returning a truthy","value from the function will stop the processing of remaining items.","","@method some","@param {Array} array Array to iterate over.","@param {Function} fn Function to execute on each item. The function will receive","  the following arguments:","    @param {Any} fn.value Current array item.","    @param {Number} fn.index Current array index.","    @param {Array} fn.array Array being iterated over.","@param {Object} [thisObj] `this` object to use when calling _fn_.","@return {Boolean} `true` if the function returns a truthy value on any of the","  items in the array; `false` otherwise.","@static","**/","YArray.some = Lang._isNative(Native.some) ? function (array, fn, thisObj) {","    return Native.some.call(array, fn, thisObj);","} : function (array, fn, thisObj) {","    for (var i = 0, len = array.length; i < len; ++i) {","        if (i in array && fn.call(thisObj, array[i], i, array)) {","            return true;","        }","    }","","    return false;","};","","/**","Evaluates _obj_ to determine if it's an array, an array-like collection, or","something else. This is useful when working with the function `arguments`","collection and `HTMLElement` collections.","","Note: This implementation doesn't consider elements that are also","collections, such as `<form>` and `<select>`, to be array-like.","","@method test","@param {Object} obj Object to test.","@return {Number} A number indicating the results of the test:","","  * 0: Neither an array nor an array-like collection.","  * 1: Real array.","  * 2: Array-like collection.","","@static","**/","YArray.test = function (obj) {","    var result = 0;","","    if (Lang.isArray(obj)) {","        result = 1;","    } else if (Lang.isObject(obj)) {","        try {","            // indexed, but no tagName (element) or scrollTo/document (window. From DOM.isWindow test which we can't use here),","            // or functions without apply/call (Safari","            // HTMLElementCollection bug).","            if ('length' in obj && !obj.tagName && !(obj.scrollTo && obj.document) && !obj.apply) {","                result = 2;","            }","        } catch (ex) {}","    }","","    return result;","};","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * A simple FIFO queue.  Items are added to the Queue with add(1..n items) and"," * removed using next()."," *"," * @class Queue"," * @constructor"," * @param {MIXED} item* 0..n items to seed the queue."," */","function Queue() {","    this._init();","    this.add.apply(this, arguments);","}","","Queue.prototype = {","    /**","     * Initialize the queue","     *","     * @method _init","     * @protected","     */","    _init: function() {","        /**","         * The collection of enqueued items","         *","         * @property _q","         * @type Array","         * @protected","         */","        this._q = [];","    },","","    /**","     * Get the next item in the queue. FIFO support","     *","     * @method next","     * @return {MIXED} the next item in the queue.","     */","    next: function() {","        return this._q.shift();","    },","","    /**","     * Get the last in the queue. LIFO support.","     *","     * @method last","     * @return {MIXED} the last item in the queue.","     */","    last: function() {","        return this._q.pop();","    },","","    /**","     * Add 0..n items to the end of the queue.","     *","     * @method add","     * @param {MIXED} item* 0..n items.","     * @return {object} this queue.","     */","    add: function() {","        this._q.push.apply(this._q, arguments);","","        return this;","    },","","    /**","     * Returns the current number of queued items.","     *","     * @method size","     * @return {Number} The size.","     */","    size: function() {","        return this._q.length;","    }","};","","Y.Queue = Queue;","","YUI.Env._loaderQueue = YUI.Env._loaderQueue || new Queue();","","/**","The YUI module contains the components required for building the YUI seed file.","This includes the script loading mechanism, a simple queue, and the core","utilities for the library.","","@module yui","@submodule yui-base","**/","","var CACHED_DELIMITER = '__',","","    hasOwn   = Object.prototype.hasOwnProperty,","    isObject = Y.Lang.isObject;","","/**","Returns a wrapper for a function which caches the return value of that function,","keyed off of the combined string representation of the argument values provided","when the wrapper is called.","","Calling this function again with the same arguments will return the cached value","rather than executing the wrapped function.","","Note that since the cache is keyed off of the string representation of arguments","passed to the wrapper function, arguments that aren't strings and don't provide","a meaningful `toString()` method may result in unexpected caching behavior. For","example, the objects `{}` and `{foo: 'bar'}` would both be converted to the","string `[object Object]` when used as a cache key.","","@method cached","@param {Function} source The function to memoize.","@param {Object} [cache={}] Object in which to store cached values. You may seed","  this object with pre-existing cached values if desired.","@param {any} [refetch] If supplied, this value is compared with the cached value","  using a `==` comparison. If the values are equal, the wrapped function is","  executed again even though a cached value exists.","@return {Function} Wrapped function.","@for YUI","**/","Y.cached = function (source, cache, refetch) {","    /*jshint expr: true*/","    cache || (cache = {});","","    return function (arg) {","        var key = arguments.length > 1 ?","                Array.prototype.join.call(arguments, CACHED_DELIMITER) :","                String(arg);","        ","        /*jshint eqeqeq: false*/","        if (!(key in cache) || (refetch && cache[key] == refetch)) {","            cache[key] = source.apply(source, arguments);","        }","","        return cache[key];","    };","};","","/**","Returns the `location` object from the window/frame in which this YUI instance","operates, or `undefined` when executing in a non-browser environment","(e.g. Node.js).","","It is _not_ recommended to hold references to the `window.location` object","outside of the scope of a function in which its properties are being accessed or","its methods are being called. This is because of a nasty bug/issue that exists","in both Safari and MobileSafari browsers:","[WebKit Bug 34679](https://bugs.webkit.org/show_bug.cgi?id=34679).","","@method getLocation","@return {location} The `location` object from the window/frame in which this YUI","    instance operates.","@since 3.5.0","**/","Y.getLocation = function () {","    // It is safer to look this up every time because yui-base is attached to a","    // YUI instance before a user's config is applied; i.e. `Y.config.win` does","    // not point the correct window object when this file is loaded.","    var win = Y.config.win;","","    // It is not safe to hold a reference to the `location` object outside the","    // scope in which it is being used. The WebKit engine used in Safari and","    // MobileSafari will \"disconnect\" the `location` object from the `window`","    // when a page is restored from back/forward history cache.","    return win && win.location;","};","","/**","Returns a new object containing all of the properties of all the supplied","objects. The properties from later objects will overwrite those in earlier","objects.","","Passing in a single object will create a shallow copy of it. For a deep copy,","use `clone()`.","","@method merge","@param {Object} objects* One or more objects to merge.","@return {Object} A new merged object.","**/","Y.merge = function () {","    var i      = 0,","        len    = arguments.length,","        result = {},","        key,","        obj;","","    for (; i < len; ++i) {","        obj = arguments[i];","","        for (key in obj) {","            if (hasOwn.call(obj, key)) {","                result[key] = obj[key];","            }","        }","    }","","    return result;","};","","/**","Mixes _supplier_'s properties into _receiver_.","","Properties on _receiver_ or _receiver_'s prototype will not be overwritten or","shadowed unless the _overwrite_ parameter is `true`, and will not be merged","unless the _merge_ parameter is `true`.","","In the default mode (0), only properties the supplier owns are copied (prototype","properties are not copied). The following copying modes are available:","","  * `0`: _Default_. Object to object.","  * `1`: Prototype to prototype.","  * `2`: Prototype to prototype and object to object.","  * `3`: Prototype to object.","  * `4`: Object to prototype.","","@method mix","@param {Function|Object} receiver The object or function to receive the mixed","  properties.","@param {Function|Object} supplier The object or function supplying the","  properties to be mixed.","@param {Boolean} [overwrite=false] If `true`, properties that already exist","  on the receiver will be overwritten with properties from the supplier.","@param {String[]} [whitelist] An array of property names to copy. If","  specified, only the whitelisted properties will be copied, and all others","  will be ignored.","@param {Number} [mode=0] Mix mode to use. See above for available modes.","@param {Boolean} [merge=false] If `true`, objects and arrays that already","  exist on the receiver will have the corresponding object/array from the","  supplier merged into them, rather than being skipped or overwritten. When","  both _overwrite_ and _merge_ are `true`, _merge_ takes precedence.","@return {Function|Object|YUI} The receiver, or the YUI instance if the","  specified receiver is falsy.","**/","Y.mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {","    var alwaysOverwrite, exists, from, i, key, len, to;","","    // If no supplier is given, we return the receiver. If no receiver is given,","    // we return Y. Returning Y doesn't make much sense to me, but it's","    // grandfathered in for backcompat reasons.","    if (!receiver || !supplier) {","        return receiver || Y;","    }","","    if (mode) {","        // In mode 2 (prototype to prototype and object to object), we recurse","        // once to do the proto to proto mix. The object to object mix will be","        // handled later on.","        if (mode === 2) {","            Y.mix(receiver.prototype, supplier.prototype, overwrite,","                    whitelist, 0, merge);","        }","","        // Depending on which mode is specified, we may be copying from or to","        // the prototypes of the supplier and receiver.","        from = mode === 1 || mode === 3 ? supplier.prototype : supplier;","        to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;","","        // If either the supplier or receiver doesn't actually have a","        // prototype property, then we could end up with an undefined `from`","        // or `to`. If that happens, we abort and return the receiver.","        if (!from || !to) {","            return receiver;","        }","    } else {","        from = supplier;","        to   = receiver;","    }","","    // If `overwrite` is truthy and `merge` is falsy, then we can skip a","    // property existence check on each iteration and save some time.","    alwaysOverwrite = overwrite && !merge;","","    if (whitelist) {","        for (i = 0, len = whitelist.length; i < len; ++i) {","            key = whitelist[i];","","            // We call `Object.prototype.hasOwnProperty` instead of calling","            // `hasOwnProperty` on the object itself, since the object's","            // `hasOwnProperty` method may have been overridden or removed.","            // Also, some native objects don't implement a `hasOwnProperty`","            // method.","            if (!hasOwn.call(from, key)) {","                continue;","            }","","            // The `key in to` check here is (sadly) intentional for backwards","            // compatibility reasons. It prevents undesired shadowing of","            // prototype members on `to`.","            exists = alwaysOverwrite ? false : key in to;","","            if (merge && exists && isObject(to[key], true)","                    && isObject(from[key], true)) {","                // If we're in merge mode, and the key is present on both","                // objects, and the value on both objects is either an object or","                // an array (but not a function), then we recurse to merge the","                // `from` value into the `to` value instead of overwriting it.","                //","                // Note: It's intentional that the whitelist isn't passed to the","                // recursive call here. This is legacy behavior that lots of","                // code still depends on.","                Y.mix(to[key], from[key], overwrite, null, 0, merge);","            } else if (overwrite || !exists) {","                // We're not in merge mode, so we'll only copy the `from` value","                // to the `to` value if we're in overwrite mode or if the","                // current key doesn't exist on the `to` object.","                to[key] = from[key];","            }","        }","    } else {","        for (key in from) {","            // The code duplication here is for runtime performance reasons.","            // Combining whitelist and non-whitelist operations into a single","            // loop or breaking the shared logic out into a function both result","            // in worse performance, and Y.mix is critical enough that the byte","            // tradeoff is worth it.","            if (!hasOwn.call(from, key)) {","                continue;","            }","","            // The `key in to` check here is (sadly) intentional for backwards","            // compatibility reasons. It prevents undesired shadowing of","            // prototype members on `to`.","            exists = alwaysOverwrite ? false : key in to;","","            if (merge && exists && isObject(to[key], true)","                    && isObject(from[key], true)) {","                Y.mix(to[key], from[key], overwrite, null, 0, merge);","            } else if (overwrite || !exists) {","                to[key] = from[key];","            }","        }","","        // If this is an IE browser with the JScript enumeration bug, force","        // enumeration of the buggy properties by making a recursive call with","        // the buggy properties as the whitelist.","        if (Y.Object._hasEnumBug) {","            Y.mix(to, from, overwrite, Y.Object._forceEnum, mode, merge);","        }","    }","","    return receiver;","};","/**"," * The YUI module contains the components required for building the YUI"," * seed file.  This includes the script loading mechanism, a simple queue,"," * and the core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * Adds utilities to the YUI instance for working with objects."," *"," * @class Object"," */","","var Lang   = Y.Lang,","    hasOwn = Object.prototype.hasOwnProperty,","","    UNDEFINED, // <-- Note the comma. We're still declaring vars.","","/**"," * Returns a new object that uses _obj_ as its prototype. This method wraps the"," * native ES5 `Object.create()` method if available, but doesn't currently"," * pass through `Object.create()`'s second argument (properties) in order to"," * ensure compatibility with older browsers."," *"," * @method ()"," * @param {Object} obj Prototype object."," * @return {Object} New object using _obj_ as its prototype."," * @static"," */","O = Y.Object = Lang._isNative(Object.create) ? function (obj) {","    // We currently wrap the native Object.create instead of simply aliasing it","    // to ensure consistency with our fallback shim, which currently doesn't","    // support Object.create()'s second argument (properties). Once we have a","    // safe fallback for the properties arg, we can stop wrapping","    // Object.create().","    return Object.create(obj);","} : (function () {","    // Reusable constructor function for the Object.create() shim.","    function F() {}","","    // The actual shim.","    return function (obj) {","        F.prototype = obj;","        return new F();","    };","}()),","","/**"," * Property names that IE doesn't enumerate in for..in loops, even when they"," * should be enumerable. When `_hasEnumBug` is `true`, it's necessary to"," * manually enumerate these properties."," *"," * @property _forceEnum"," * @type String[]"," * @protected"," * @static"," */","forceEnum = O._forceEnum = [","    'hasOwnProperty',","    'isPrototypeOf',","    'propertyIsEnumerable',","    'toString',","    'toLocaleString',","    'valueOf'","],","","/**"," * `true` if this browser has the JScript enumeration bug that prevents"," * enumeration of the properties named in the `_forceEnum` array, `false`"," * otherwise."," *"," * See:"," *   - <https://developer.mozilla.org/en/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug>"," *   - <http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation>"," *"," * @property _hasEnumBug"," * @type Boolean"," * @protected"," * @static"," */","hasEnumBug = O._hasEnumBug = !{valueOf: 0}.propertyIsEnumerable('valueOf'),","","/**"," * `true` if this browser incorrectly considers the `prototype` property of"," * functions to be enumerable. Currently known to affect Opera 11.50."," *"," * @property _hasProtoEnumBug"," * @type Boolean"," * @protected"," * @static"," */","hasProtoEnumBug = O._hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype'),","","/**"," * Returns `true` if _key_ exists on _obj_, `false` if _key_ doesn't exist or"," * exists only on _obj_'s prototype. This is essentially a safer version of"," * `obj.hasOwnProperty()`."," *"," * @method owns"," * @param {Object} obj Object to test."," * @param {String} key Property name to look for."," * @return {Boolean} `true` if _key_ exists on _obj_, `false` otherwise."," * @static"," */","owns = O.owns = function (obj, key) {","    return !!obj && hasOwn.call(obj, key);","}; // <-- End of var declarations.","","/**"," * Alias for `owns()`."," *"," * @method hasKey"," * @param {Object} obj Object to test."," * @param {String} key Property name to look for."," * @return {Boolean} `true` if _key_ exists on _obj_, `false` otherwise."," * @static"," */","O.hasKey = owns;","","/**"," * Returns an array containing the object's enumerable keys. Does not include"," * prototype keys or non-enumerable keys."," *"," * Note that keys are returned in enumeration order (that is, in the same order"," * that they would be enumerated by a `for-in` loop), which may not be the same"," * as the order in which they were defined."," *"," * This method is an alias for the native ES5 `Object.keys()` method if"," * available."," *"," * @example"," *"," *     Y.Object.keys({a: 'foo', b: 'bar', c: 'baz'});"," *     // => ['a', 'b', 'c']"," *"," * @method keys"," * @param {Object} obj An object."," * @return {String[]} Array of keys."," * @static"," */","O.keys = Lang._isNative(Object.keys) ? Object.keys : function (obj) {","    if (!Lang.isObject(obj)) {","        throw new TypeError('Object.keys called on a non-object');","    }","","    var keys = [],","        i, key, len;","","    if (hasProtoEnumBug && typeof obj === 'function') {","        for (key in obj) {","            if (owns(obj, key) && key !== 'prototype') {","                keys.push(key);","            }","        }","    } else {","        for (key in obj) {","            if (owns(obj, key)) {","                keys.push(key);","            }","        }","    }","","    if (hasEnumBug) {","        for (i = 0, len = forceEnum.length; i < len; ++i) {","            key = forceEnum[i];","","            if (owns(obj, key)) {","                keys.push(key);","            }","        }","    }","","    return keys;","};","","/**"," * Returns an array containing the values of the object's enumerable keys."," *"," * Note that values are returned in enumeration order (that is, in the same"," * order that they would be enumerated by a `for-in` loop), which may not be the"," * same as the order in which they were defined."," *"," * @example"," *"," *     Y.Object.values({a: 'foo', b: 'bar', c: 'baz'});"," *     // => ['foo', 'bar', 'baz']"," *"," * @method values"," * @param {Object} obj An object."," * @return {Array} Array of values."," * @static"," */","O.values = function (obj) {","    var keys   = O.keys(obj),","        i      = 0,","        len    = keys.length,","        values = [];","","    for (; i < len; ++i) {","        values.push(obj[keys[i]]);","    }","","    return values;","};","","/**"," * Returns the number of enumerable keys owned by an object."," *"," * @method size"," * @param {Object} obj An object."," * @return {Number} The object's size."," * @static"," */","O.size = function (obj) {","    try {","        return O.keys(obj).length;","    } catch (ex) {","        return 0; // Legacy behavior for non-objects.","    }","};","","/**"," * Returns `true` if the object owns an enumerable property with the specified"," * value."," *"," * @method hasValue"," * @param {Object} obj An object."," * @param {any} value The value to search for."," * @return {Boolean} `true` if _obj_ contains _value_, `false` otherwise."," * @static"," */","O.hasValue = function (obj, value) {","    return Y.Array.indexOf(O.values(obj), value) > -1;","};","","/**"," * Executes a function on each enumerable property in _obj_. The function"," * receives the value, the key, and the object itself as parameters (in that"," * order)."," *"," * By default, only properties owned by _obj_ are enumerated. To include"," * prototype properties, set the _proto_ parameter to `true`."," *"," * @method each"," * @param {Object} obj Object to enumerate."," * @param {Function} fn Function to execute on each enumerable property."," *   @param {mixed} fn.value Value of the current property."," *   @param {String} fn.key Key of the current property."," *   @param {Object} fn.obj Object being enumerated."," * @param {Object} [thisObj] `this` object to use when calling _fn_."," * @param {Boolean} [proto=false] Include prototype properties."," * @return {YUI} the YUI instance."," * @chainable"," * @static"," */","O.each = function (obj, fn, thisObj, proto) {","    var key;","","    for (key in obj) {","        if (proto || owns(obj, key)) {","            fn.call(thisObj || Y, obj[key], key, obj);","        }","    }","","    return Y;","};","","/**"," * Executes a function on each enumerable property in _obj_, but halts if the"," * function returns a truthy value. The function receives the value, the key,"," * and the object itself as paramters (in that order)."," *"," * By default, only properties owned by _obj_ are enumerated. To include"," * prototype properties, set the _proto_ parameter to `true`."," *"," * @method some"," * @param {Object} obj Object to enumerate."," * @param {Function} fn Function to execute on each enumerable property."," *   @param {mixed} fn.value Value of the current property."," *   @param {String} fn.key Key of the current property."," *   @param {Object} fn.obj Object being enumerated."," * @param {Object} [thisObj] `this` object to use when calling _fn_."," * @param {Boolean} [proto=false] Include prototype properties."," * @return {Boolean} `true` if any execution of _fn_ returns a truthy value,"," *   `false` otherwise."," * @static"," */","O.some = function (obj, fn, thisObj, proto) {","    var key;","","    for (key in obj) {","        if (proto || owns(obj, key)) {","            if (fn.call(thisObj || Y, obj[key], key, obj)) {","                return true;","            }","        }","    }","","    return false;","};","","/**"," * Retrieves the sub value at the provided path,"," * from the value object provided."," *"," * @method getValue"," * @static"," * @param o The object from which to extract the property value."," * @param path {Array} A path array, specifying the object traversal path"," * from which to obtain the sub value."," * @return {Any} The value stored in the path, undefined if not found,"," * undefined if the source is not an object.  Returns the source object"," * if an empty path is provided."," */","O.getValue = function(o, path) {","    if (!Lang.isObject(o)) {","        return UNDEFINED;","    }","","    var i,","        p = Y.Array(path),","        l = p.length;","","    for (i = 0; o !== UNDEFINED && i < l; i++) {","        o = o[p[i]];","    }","","    return o;","};","","/**"," * Sets the sub-attribute value at the provided path on the"," * value object.  Returns the modified value object, or"," * undefined if the path is invalid."," *"," * @method setValue"," * @static"," * @param o             The object on which to set the sub value."," * @param path {Array}  A path array, specifying the object traversal path"," *                      at which to set the sub value."," * @param val {Any}     The new value for the sub-attribute."," * @return {Object}     The modified object, with the new sub value set, or"," *                      undefined, if the path was invalid."," */","O.setValue = function(o, path, val) {","    var i,","        p = Y.Array(path),","        leafIdx = p.length - 1,","        ref = o;","","    if (leafIdx >= 0) {","        for (i = 0; ref !== UNDEFINED && i < leafIdx; i++) {","            ref = ref[p[i]];","        }","","        if (ref !== UNDEFINED) {","            ref[p[i]] = val;","        } else {","            return UNDEFINED;","        }","    }","","    return o;","};","","/**"," * Returns `true` if the object has no enumerable properties of its own."," *"," * @method isEmpty"," * @param {Object} obj An object."," * @return {Boolean} `true` if the object is empty."," * @static"," * @since 3.2.0"," */","O.isEmpty = function (obj) {","    return !O.keys(Object(obj)).length;","};","/**"," * The YUI module contains the components required for building the YUI seed"," * file.  This includes the script loading mechanism, a simple queue, and the"," * core utilities for the library."," * @module yui"," * @submodule yui-base"," */","","/**"," * YUI user agent detection."," * Do not fork for a browser if it can be avoided.  Use feature detection when"," * you can.  Use the user agent as a last resort.  For all fields listed"," * as @type float, UA stores a version number for the browser engine,"," * 0 otherwise.  This value may or may not map to the version number of"," * the browser using the engine.  The value is presented as a float so"," * that it can easily be used for boolean evaluation as well as for"," * looking for a particular range of versions.  Because of this,"," * some of the granularity of the version info may be lost.  The fields that"," * are @type string default to null.  The API docs list the values that"," * these fields can have."," * @class UA"," * @static"," */","","/**","* Static method on `YUI.Env` for parsing a UA string.  Called at instantiation","* to populate `Y.UA`.","*","* @static","* @method parseUA","* @param {String} [subUA=navigator.userAgent] UA string to parse","* @return {Object} The Y.UA object","*/","YUI.Env.parseUA = function(subUA) {","","    var numberify = function(s) {","            var c = 0;","            return parseFloat(s.replace(/\\./g, function() {","                return (c++ === 1) ? '' : '.';","            }));","        },","","        win = Y.config.win,","","        nav = win && win.navigator,","","        o = {","","        /**","         * Internet Explorer version number or 0.  Example: 6","         * @property ie","         * @type float","         * @static","         */","        ie: 0,","","        /**","         * Opera version number or 0.  Example: 9.2","         * @property opera","         * @type float","         * @static","         */","        opera: 0,","","        /**","         * Gecko engine revision number.  Will evaluate to 1 if Gecko","         * is detected but the revision could not be found. Other browsers","         * will be 0.  Example: 1.8","         * <pre>","         * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7","         * Firefox 1.5.0.9: 1.8.0.9 <-- 1.8","         * Firefox 2.0.0.3: 1.8.1.3 <-- 1.81","         * Firefox 3.0   <-- 1.9","         * Firefox 3.5   <-- 1.91","         * </pre>","         * @property gecko","         * @type float","         * @static","         */","        gecko: 0,","","        /**","         * AppleWebKit version.  KHTML browsers that are not WebKit browsers","         * will evaluate to 1, other browsers 0.  Example: 418.9","         * <pre>","         * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the","         *                                   latest available for Mac OSX 10.3.","         * Safari 2.0.2:         416     <-- hasOwnProperty introduced","         * Safari 2.0.4:         418     <-- preventDefault fixed","         * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run","         *                                   different versions of webkit","         * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been","         *                                   updated, but not updated","         *                                   to the latest patch.","         * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native","         * SVG and many major issues fixed).","         * Safari 3.0.4 (523.12) 523.12  <-- First Tiger release - automatic","         * update from 2.x via the 10.4.11 OS patch.","         * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.","         *                                   yahoo.com user agent hack removed.","         * </pre>","         * http://en.wikipedia.org/wiki/Safari_version_history","         * @property webkit","         * @type float","         * @static","         */","        webkit: 0,","","        /**","         * Safari will be detected as webkit, but this property will also","         * be populated with the Safari version number","         * @property safari","         * @type float","         * @static","         */","        safari: 0,","","        /**","         * Chrome will be detected as webkit, but this property will also","         * be populated with the Chrome version number","         * @property chrome","         * @type float","         * @static","         */","        chrome: 0,","","        /**","         * The mobile property will be set to a string containing any relevant","         * user agent information when a modern mobile browser is detected.","         * Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series","         * devices with the WebKit-based browser, and Opera Mini.","         * @property mobile","         * @type string","         * @default null","         * @static","         */","        mobile: null,","","        /**","         * Adobe AIR version number or 0.  Only populated if webkit is detected.","         * Example: 1.0","         * @property air","         * @type float","         */","        air: 0,","        /**","         * PhantomJS version number or 0.  Only populated if webkit is detected.","         * Example: 1.0","         * @property phantomjs","         * @type float","         */","        phantomjs: 0,","        /**","         * Detects Apple iPad's OS version","         * @property ipad","         * @type float","         * @static","         */","        ipad: 0,","        /**","         * Detects Apple iPhone's OS version","         * @property iphone","         * @type float","         * @static","         */","        iphone: 0,","        /**","         * Detects Apples iPod's OS version","         * @property ipod","         * @type float","         * @static","         */","        ipod: 0,","        /**","         * General truthy check for iPad, iPhone or iPod","         * @property ios","         * @type Boolean","         * @default null","         * @static","         */","        ios: null,","        /**","         * Detects Googles Android OS version","         * @property android","         * @type float","         * @static","         */","        android: 0,","        /**","         * Detects Kindle Silk","         * @property silk","         * @type float","         * @static","         */","        silk: 0,","        /**","         * Detects Kindle Silk Acceleration","         * @property accel","         * @type Boolean","         * @static","         */","        accel: false,","        /**","         * Detects Palms WebOS version","         * @property webos","         * @type float","         * @static","         */","        webos: 0,","","        /**","         * Google Caja version number or 0.","         * @property caja","         * @type float","         */","        caja: nav && nav.cajaVersion,","","        /**","         * Set to true if the page appears to be in SSL","         * @property secure","         * @type boolean","         * @static","         */","        secure: false,","","        /**","         * The operating system.  Currently only detecting windows or macintosh","         * @property os","         * @type string","         * @default null","         * @static","         */","        os: null,","","        /**","         * The Nodejs Version","         * @property nodejs","         * @type float","         * @default 0","         * @static","         */","        nodejs: 0,","        /**","        * Window8/IE10 Application host environment","        * @property winjs","        * @type Boolean","        * @static","        */","        winjs: !!((typeof Windows !== \"undefined\") && Windows.System),","        /**","        * Are touch/msPointer events available on this device","        * @property touchEnabled","        * @type Boolean","        * @static","        */","        touchEnabled: false","    },","","    ua = subUA || nav && nav.userAgent,","","    loc = win && win.location,","","    href = loc && loc.href,","","    m;","","    /**","    * The User Agent string that was parsed","    * @property userAgent","    * @type String","    * @static","    */","    o.userAgent = ua;","","","    o.secure = href && (href.toLowerCase().indexOf('https') === 0);","","    if (ua) {","","        if ((/windows|win32/i).test(ua)) {","            o.os = 'windows';","        } else if ((/macintosh|mac_powerpc/i).test(ua)) {","            o.os = 'macintosh';","        } else if ((/android/i).test(ua)) {","            o.os = 'android';","        } else if ((/symbos/i).test(ua)) {","            o.os = 'symbos';","        } else if ((/linux/i).test(ua)) {","            o.os = 'linux';","        } else if ((/rhino/i).test(ua)) {","            o.os = 'rhino';","        }","","        // Modern KHTML browsers should qualify as Safari X-Grade","        if ((/KHTML/).test(ua)) {","            o.webkit = 1;","        }","        if ((/IEMobile|XBLWP7/).test(ua)) {","            o.mobile = 'windows';","        }","        if ((/Fennec/).test(ua)) {","            o.mobile = 'gecko';","        }","        // Modern WebKit browsers are at least X-Grade","        m = ua.match(/AppleWebKit\\/([^\\s]*)/);","        if (m && m[1]) {","            o.webkit = numberify(m[1]);","            o.safari = o.webkit;","","            if (/PhantomJS/.test(ua)) {","                m = ua.match(/PhantomJS\\/([^\\s]*)/);","                if (m && m[1]) {","                    o.phantomjs = numberify(m[1]);","                }","            }","","            // Mobile browser check","            if (/ Mobile\\//.test(ua) || (/iPad|iPod|iPhone/).test(ua)) {","                o.mobile = 'Apple'; // iPhone or iPod Touch","","                m = ua.match(/OS ([^\\s]*)/);","                if (m && m[1]) {","                    m = numberify(m[1].replace('_', '.'));","                }","                o.ios = m;","                o.os = 'ios';","                o.ipad = o.ipod = o.iphone = 0;","","                m = ua.match(/iPad|iPod|iPhone/);","                if (m && m[0]) {","                    o[m[0].toLowerCase()] = o.ios;","                }","            } else {","                m = ua.match(/NokiaN[^\\/]*|webOS\\/\\d\\.\\d/);","                if (m) {","                    // Nokia N-series, webOS, ex: NokiaN95","                    o.mobile = m[0];","                }","                if (/webOS/.test(ua)) {","                    o.mobile = 'WebOS';","                    m = ua.match(/webOS\\/([^\\s]*);/);","                    if (m && m[1]) {","                        o.webos = numberify(m[1]);","                    }","                }","                if (/ Android/.test(ua)) {","                    if (/Mobile/.test(ua)) {","                        o.mobile = 'Android';","                    }","                    m = ua.match(/Android ([^\\s]*);/);","                    if (m && m[1]) {","                        o.android = numberify(m[1]);","                    }","","                }","                if (/Silk/.test(ua)) {","                    m = ua.match(/Silk\\/([^\\s]*)\\)/);","                    if (m && m[1]) {","                        o.silk = numberify(m[1]);","                    }","                    if (!o.android) {","                        o.android = 2.34; //Hack for desktop mode in Kindle","                        o.os = 'Android';","                    }","                    if (/Accelerated=true/.test(ua)) {","                        o.accel = true;","                    }","                }","            }","","            m = ua.match(/(Chrome|CrMo|CriOS)\\/([^\\s]*)/);","            if (m && m[1] && m[2]) {","                o.chrome = numberify(m[2]); // Chrome","                o.safari = 0; //Reset safari back to 0","                if (m[1] === 'CrMo') {","                    o.mobile = 'chrome';","                }","            } else {","                m = ua.match(/AdobeAIR\\/([^\\s]*)/);","                if (m) {","                    o.air = m[0]; // Adobe AIR 1.0 or better","                }","            }","        }","","        if (!o.webkit) { // not webkit","// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)","            if (/Opera/.test(ua)) {","                m = ua.match(/Opera[\\s\\/]([^\\s]*)/);","                if (m && m[1]) {","                    o.opera = numberify(m[1]);","                }","                m = ua.match(/Version\\/([^\\s]*)/);","                if (m && m[1]) {","                    o.opera = numberify(m[1]); // opera 10+","                }","","                if (/Opera Mobi/.test(ua)) {","                    o.mobile = 'opera';","                    m = ua.replace('Opera Mobi', '').match(/Opera ([^\\s]*)/);","                    if (m && m[1]) {","                        o.opera = numberify(m[1]);","                    }","                }","                m = ua.match(/Opera Mini[^;]*/);","","                if (m) {","                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316","                }","            } else { // not opera or webkit","                m = ua.match(/MSIE\\s([^;]*)/);","                if (m && m[1]) {","                    o.ie = numberify(m[1]);","                } else { // not opera, webkit, or ie","                    m = ua.match(/Gecko\\/([^\\s]*)/);","                    if (m) {","                        o.gecko = 1; // Gecko detected, look for revision","                        m = ua.match(/rv:([^\\s\\)]*)/);","                        if (m && m[1]) {","                            o.gecko = numberify(m[1]);","                        }","                    }","                }","            }","        }","    }","","    //Check for known properties to tell if touch events are enabled on this device or if","    //the number of MSPointer touchpoints on this device is greater than 0.","    if (win && nav && !(o.chrome && o.chrome < 6)) {","        o.touchEnabled = ((\"ontouchstart\" in win) || ((\"msMaxTouchPoints\" in nav) && (nav.msMaxTouchPoints > 0)));","    }","","    //It was a parsed UA, do not assign the global value.","    if (!subUA) {","","        if (typeof process === 'object') {","","            if (process.versions && process.versions.node) {","                //NodeJS","                o.os = process.platform;","                o.nodejs = numberify(process.versions.node);","            }","        }","","        YUI.Env.UA = o;","","    }","","    return o;","};","","","Y.UA = YUI.Env.UA || YUI.Env.parseUA();","","/**","Performs a simple comparison between two version numbers, accounting for","standard versioning logic such as the fact that \"535.8\" is a lower version than","\"535.24\", even though a simple numerical comparison would indicate that it's","greater. Also accounts for cases such as \"1.1\" vs. \"1.1.0\", which are","considered equivalent.","","Returns -1 if version _a_ is lower than version _b_, 0 if they're equivalent,","1 if _a_ is higher than _b_.","","Versions may be numbers or strings containing numbers and dots. For example,","both `535` and `\"535.8.10\"` are acceptable. A version string containing","non-numeric characters, like `\"535.8.beta\"`, may produce unexpected results.","","@method compareVersions","@param {Number|String} a First version number to compare.","@param {Number|String} b Second version number to compare.","@return -1 if _a_ is lower than _b_, 0 if they're equivalent, 1 if _a_ is","    higher than _b_.","**/","Y.UA.compareVersions = function (a, b) {","    var aPart, aParts, bPart, bParts, i, len;","","    if (a === b) {","        return 0;","    }","","    aParts = (a + '').split('.');","    bParts = (b + '').split('.');","","    for (i = 0, len = Math.max(aParts.length, bParts.length); i < len; ++i) {","        aPart = parseInt(aParts[i], 10);","        bPart = parseInt(bParts[i], 10);","","        /*jshint expr: true*/","        isNaN(aPart) && (aPart = 0);","        isNaN(bPart) && (bPart = 0);","","        if (aPart < bPart) {","            return -1;","        }","","        if (aPart > bPart) {","            return 1;","        }","    }","","    return 0;","};","YUI.Env.aliases = {","    \"anim\": [\"anim-base\",\"anim-color\",\"anim-curve\",\"anim-easing\",\"anim-node-plugin\",\"anim-scroll\",\"anim-xy\"],","    \"anim-shape-transform\": [\"anim-shape\"],","    \"app\": [\"app-base\",\"app-content\",\"app-transitions\",\"lazy-model-list\",\"model\",\"model-list\",\"model-sync-rest\",\"router\",\"view\",\"view-node-map\"],","    \"attribute\": [\"attribute-base\",\"attribute-complex\"],","    \"attribute-events\": [\"attribute-observable\"],","    \"autocomplete\": [\"autocomplete-base\",\"autocomplete-sources\",\"autocomplete-list\",\"autocomplete-plugin\"],","    \"axes\": [\"axis-numeric\",\"axis-category\",\"axis-time\",\"axis-stacked\"],","    \"axes-base\": [\"axis-numeric-base\",\"axis-category-base\",\"axis-time-base\",\"axis-stacked-base\"],","    \"base\": [\"base-base\",\"base-pluginhost\",\"base-build\"],","    \"cache\": [\"cache-base\",\"cache-offline\",\"cache-plugin\"],","    \"charts\": [\"charts-base\"],","    \"collection\": [\"array-extras\",\"arraylist\",\"arraylist-add\",\"arraylist-filter\",\"array-invoke\"],","    \"color\": [\"color-base\",\"color-hsl\",\"color-harmony\"],","    \"controller\": [\"router\"],","    \"dataschema\": [\"dataschema-base\",\"dataschema-json\",\"dataschema-xml\",\"dataschema-array\",\"dataschema-text\"],","    \"datasource\": [\"datasource-local\",\"datasource-io\",\"datasource-get\",\"datasource-function\",\"datasource-cache\",\"datasource-jsonschema\",\"datasource-xmlschema\",\"datasource-arrayschema\",\"datasource-textschema\",\"datasource-polling\"],","    \"datatable\": [\"datatable-core\",\"datatable-table\",\"datatable-head\",\"datatable-body\",\"datatable-base\",\"datatable-column-widths\",\"datatable-message\",\"datatable-mutable\",\"datatable-sort\",\"datatable-datasource\"],","    \"datatype\": [\"datatype-date\",\"datatype-number\",\"datatype-xml\"],","    \"datatype-date\": [\"datatype-date-parse\",\"datatype-date-format\",\"datatype-date-math\"],","    \"datatype-number\": [\"datatype-number-parse\",\"datatype-number-format\"],","    \"datatype-xml\": [\"datatype-xml-parse\",\"datatype-xml-format\"],","    \"dd\": [\"dd-ddm-base\",\"dd-ddm\",\"dd-ddm-drop\",\"dd-drag\",\"dd-proxy\",\"dd-constrain\",\"dd-drop\",\"dd-scroll\",\"dd-delegate\"],","    \"dom\": [\"dom-base\",\"dom-screen\",\"dom-style\",\"selector-native\",\"selector\"],","    \"editor\": [\"frame\",\"editor-selection\",\"exec-command\",\"editor-base\",\"editor-para\",\"editor-br\",\"editor-bidi\",\"editor-tab\",\"createlink-base\"],","    \"event\": [\"event-base\",\"event-delegate\",\"event-synthetic\",\"event-mousewheel\",\"event-mouseenter\",\"event-key\",\"event-focus\",\"event-resize\",\"event-hover\",\"event-outside\",\"event-touch\",\"event-move\",\"event-flick\",\"event-valuechange\",\"event-tap\"],","    \"event-custom\": [\"event-custom-base\",\"event-custom-complex\"],","    \"event-gestures\": [\"event-flick\",\"event-move\"],","    \"handlebars\": [\"handlebars-compiler\"],","    \"highlight\": [\"highlight-base\",\"highlight-accentfold\"],","    \"history\": [\"history-base\",\"history-hash\",\"history-hash-ie\",\"history-html5\"],","    \"io\": [\"io-base\",\"io-xdr\",\"io-form\",\"io-upload-iframe\",\"io-queue\"],","    \"json\": [\"json-parse\",\"json-stringify\"],","    \"loader\": [\"loader-base\",\"loader-rollup\",\"loader-yui3\"],","    \"node\": [\"node-base\",\"node-event-delegate\",\"node-pluginhost\",\"node-screen\",\"node-style\"],","    \"pluginhost\": [\"pluginhost-base\",\"pluginhost-config\"],","    \"querystring\": [\"querystring-parse\",\"querystring-stringify\"],","    \"recordset\": [\"recordset-base\",\"recordset-sort\",\"recordset-filter\",\"recordset-indexer\"],","    \"resize\": [\"resize-base\",\"resize-proxy\",\"resize-constrain\"],","    \"slider\": [\"slider-base\",\"slider-value-range\",\"clickable-rail\",\"range-slider\"],","    \"template\": [\"template-base\",\"template-micro\"],","    \"text\": [\"text-accentfold\",\"text-wordbreak\"],","    \"widget\": [\"widget-base\",\"widget-htmlparser\",\"widget-skin\",\"widget-uievents\"]","};","","","}, '@VERSION@', {","    \"use\": [","        \"yui-base\",","        \"get\",","        \"features\",","        \"intl-base\",","        \"yui-log\",","        \"yui-log-nodejs\",","        \"yui-later\",","        \"loader-base\",","        \"loader-rollup\",","        \"loader-yui3\"","    ]","});"];
/**
The YUI module contains the components required for building the YUI seed file.
This includes the script loading mechanism, a simple queue, and the core
utilities for the library.

@module yui
@main yui
@submodule yui-base
**/

/*jshint eqeqeq: false*/
_yuitest_coverage["build/yui-nodejs/yui-nodejs.js"].lines = {"12":0,"13":0,"59":0,"60":0,"65":0,"69":0,"70":0,"73":0,"100":0,"101":0,"129":0,"130":0,"134":0,"135":0,"139":0,"144":0,"145":0,"148":0,"151":0,"153":0,"156":0,"158":0,"182":0,"183":0,"184":0,"185":0,"189":0,"191":0,"192":0,"194":0,"195":0,"199":0,"200":0,"201":0,"202":0,"206":0,"211":0,"213":0,"214":0,"215":0,"216":0,"217":0,"219":0,"220":0,"222":0,"223":0,"225":0,"227":0,"231":0,"232":0,"233":0,"242":0,"243":0,"244":0,"246":0,"247":0,"250":0,"251":0,"254":0,"266":0,"268":0,"277":0,"278":0,"279":0,"280":0,"281":0,"282":0,"283":0,"284":0,"285":0,"286":0,"287":0,"288":0,"289":0,"292":0,"297":0,"298":0,"312":0,"322":0,"337":0,"339":0,"340":0,"386":0,"389":0,"390":0,"394":0,"398":0,"399":0,"401":0,"406":0,"410":0,"414":0,"415":0,"416":0,"417":0,"418":0,"419":0,"420":0,"421":0,"427":0,"432":0,"434":0,"436":0,"437":0,"438":0,"440":0,"442":0,"443":0,"444":0,"446":0,"447":0,"448":0,"452":0,"455":0,"456":0,"460":0,"463":0,"477":0,"478":0,"479":0,"480":0,"481":0,"482":0,"484":0,"486":0,"487":0,"490":0,"492":0,"494":0,"495":0,"497":0,"498":0,"510":0,"515":0,"516":0,"517":0,"521":0,"522":0,"524":0,"525":0,"543":0,"544":0,"545":0,"548":0,"549":0,"550":0,"551":0,"552":0,"553":0,"554":0,"555":0,"558":0,"561":0,"612":0,"613":0,"625":0,"626":0,"627":0,"629":0,"630":0,"631":0,"632":0,"633":0,"634":0,"635":0,"636":0,"637":0,"644":0,"658":0,"670":0,"671":0,"672":0,"673":0,"674":0,"675":0,"676":0,"677":0,"678":0,"679":0,"680":0,"686":0,"687":0,"689":0,"690":0,"691":0,"692":0,"694":0,"695":0,"696":0,"698":0,"699":0,"700":0,"701":0,"707":0,"708":0,"709":0,"710":0,"711":0,"715":0,"718":0,"719":0,"720":0,"721":0,"729":0,"730":0,"731":0,"732":0,"733":0,"734":0,"737":0,"740":0,"741":0,"742":0,"743":0,"745":0,"746":0,"747":0,"750":0,"751":0,"752":0,"753":0,"754":0,"756":0,"761":0,"762":0,"763":0,"764":0,"765":0,"767":0,"772":0,"773":0,"774":0,"776":0,"777":0,"779":0,"780":0,"785":0,"786":0,"787":0,"788":0,"789":0,"791":0,"802":0,"818":0,"821":0,"823":0,"824":0,"827":0,"828":0,"829":0,"830":0,"831":0,"832":0,"902":0,"911":0,"912":0,"913":0,"914":0,"917":0,"919":0,"920":0,"923":0,"924":0,"925":0,"926":0,"927":0,"931":0,"932":0,"934":0,"935":0,"939":0,"940":0,"941":0,"943":0,"944":0,"948":0,"961":0,"962":0,"963":0,"964":0,"965":0,"966":0,"968":0,"969":0,"971":0,"972":0,"974":0,"992":0,"993":0,"996":0,"1015":0,"1017":0,"1018":0,"1021":0,"1022":0,"1023":0,"1024":0,"1025":0,"1027":0,"1030":0,"1033":0,"1035":0,"1036":0,"1037":0,"1038":0,"1042":0,"1043":0,"1046":0,"1047":0,"1048":0,"1050":0,"1051":0,"1052":0,"1053":0,"1057":0,"1058":0,"1060":0,"1065":0,"1066":0,"1070":0,"1071":0,"1078":0,"1086":0,"1088":0,"1089":0,"1090":0,"1091":0,"1092":0,"1093":0,"1094":0,"1095":0,"1097":0,"1102":0,"1103":0,"1104":0,"1105":0,"1106":0,"1110":0,"1111":0,"1113":0,"1114":0,"1118":0,"1119":0,"1126":0,"1127":0,"1128":0,"1129":0,"1130":0,"1133":0,"1134":0,"1135":0,"1137":0,"1140":0,"1141":0,"1147":0,"1148":0,"1149":0,"1150":0,"1151":0,"1152":0,"1153":0,"1154":0,"1157":0,"1159":0,"1162":0,"1163":0,"1164":0,"1169":0,"1170":0,"1171":0,"1172":0,"1173":0,"1174":0,"1175":0,"1176":0,"1177":0,"1179":0,"1181":0,"1183":0,"1184":0,"1185":0,"1186":0,"1187":0,"1188":0,"1189":0,"1193":0,"1194":0,"1196":0,"1197":0,"1203":0,"1204":0,"1205":0,"1209":0,"1253":0,"1255":0,"1256":0,"1257":0,"1258":0,"1259":0,"1260":0,"1261":0,"1262":0,"1265":0,"1266":0,"1269":0,"1276":0,"1298":0,"1300":0,"1301":0,"1304":0,"1305":0,"1307":0,"1310":0,"1322":0,"1323":0,"1344":0,"1345":0,"1346":0,"1351":0,"1352":0,"1354":0,"1357":0,"1358":0,"1359":0,"1360":0,"1361":0,"1363":0,"1367":0,"1377":0,"1378":0,"1379":0,"1381":0,"1382":0,"1383":0,"1400":0,"1403":0,"1404":0,"1405":0,"1444":0,"1445":0,"1446":0,"1449":0,"1450":0,"1453":0,"1455":0,"1459":0,"1461":0,"1465":0,"1467":0,"1470":0,"1471":0,"1475":0,"1476":0,"1490":0,"1491":0,"1500":0,"1751":0,"1773":0,"1821":0,"1822":0,"1839":0,"1840":0,"1850":0,"1851":0,"1861":0,"1862":0,"1889":0,"1890":0,"1900":0,"1901":0,"1911":0,"1912":0,"1926":0,"1927":0,"1928":0,"1939":0,"1940":0,"1950":0,"1951":0,"1963":0,"1964":0,"1966":0,"1968":0,"1972":0,"1975":0,"1987":0,"1988":0,"2002":0,"2003":0,"2004":0,"2016":0,"2017":0,"2019":0,"2020":0,"2022":0,"2033":0,"2034":0,"2036":0,"2046":0,"2047":0,"2049":0,"2079":0,"2080":0,"2087":0,"2120":0,"2121":0,"2124":0,"2126":0,"2128":0,"2129":0,"2131":0,"2133":0,"2134":0,"2137":0,"2141":0,"2144":0,"2160":0,"2161":0,"2165":0,"2166":0,"2168":0,"2169":0,"2170":0,"2174":0,"2192":0,"2193":0,"2194":0,"2196":0,"2197":0,"2198":0,"2202":0,"2229":0,"2230":0,"2234":0,"2235":0,"2236":0,"2240":0,"2257":0,"2258":0,"2261":0,"2263":0,"2264":0,"2266":0,"2267":0,"2269":0,"2270":0,"2274":0,"2275":0,"2276":0,"2280":0,"2302":0,"2303":0,"2322":0,"2323":0,"2325":0,"2326":0,"2327":0,"2331":0,"2352":0,"2353":0,"2355":0,"2356":0,"2357":0,"2358":0,"2362":0,"2363":0,"2368":0,"2386":0,"2387":0,"2388":0,"2391":0,"2406":0,"2416":0,"2426":0,"2437":0,"2439":0,"2449":0,"2453":0,"2455":0,"2466":0,"2495":0,"2497":0,"2499":0,"2500":0,"2505":0,"2506":0,"2509":0,"2529":0,"2533":0,"2539":0,"2554":0,"2555":0,"2561":0,"2562":0,"2564":0,"2565":0,"2566":0,"2571":0,"2608":0,"2609":0,"2614":0,"2615":0,"2618":0,"2622":0,"2623":0,"2629":0,"2630":0,"2635":0,"2636":0,"2639":0,"2640":0,"2645":0,"2647":0,"2648":0,"2649":0,"2656":0,"2657":0,"2663":0,"2665":0,"2675":0,"2676":0,"2680":0,"2684":0,"2690":0,"2691":0,"2697":0,"2699":0,"2701":0,"2702":0,"2703":0,"2710":0,"2711":0,"2715":0,"2731":0,"2753":0,"2756":0,"2759":0,"2760":0,"2761":0,"2823":0,"2835":0,"2858":0,"2859":0,"2860":0,"2863":0,"2866":0,"2867":0,"2868":0,"2869":0,"2873":0,"2874":0,"2875":0,"2880":0,"2881":0,"2882":0,"2884":0,"2885":0,"2890":0,"2910":0,"2911":0,"2916":0,"2917":0,"2920":0,"2931":0,"2932":0,"2933":0,"2935":0,"2949":0,"2950":0,"2973":0,"2974":0,"2976":0,"2977":0,"2978":0,"2982":0,"3005":0,"3006":0,"3008":0,"3009":0,"3010":0,"3011":0,"3016":0,"3032":0,"3033":0,"3034":0,"3037":0,"3041":0,"3042":0,"3045":0,"3062":0,"3063":0,"3068":0,"3069":0,"3070":0,"3073":0,"3074":0,"3076":0,"3080":0,"3092":0,"3093":0,"3128":0,"3130":0,"3131":0,"3132":0,"3133":0,"3367":0,"3370":0,"3372":0,"3374":0,"3375":0,"3376":0,"3377":0,"3378":0,"3379":0,"3380":0,"3381":0,"3382":0,"3383":0,"3384":0,"3385":0,"3389":0,"3390":0,"3392":0,"3393":0,"3395":0,"3396":0,"3399":0,"3400":0,"3401":0,"3402":0,"3404":0,"3405":0,"3406":0,"3407":0,"3412":0,"3413":0,"3415":0,"3416":0,"3417":0,"3419":0,"3420":0,"3421":0,"3423":0,"3424":0,"3425":0,"3428":0,"3429":0,"3431":0,"3433":0,"3434":0,"3435":0,"3436":0,"3437":0,"3440":0,"3441":0,"3442":0,"3444":0,"3445":0,"3446":0,"3450":0,"3451":0,"3452":0,"3453":0,"3455":0,"3456":0,"3457":0,"3459":0,"3460":0,"3465":0,"3466":0,"3467":0,"3468":0,"3469":0,"3470":0,"3473":0,"3474":0,"3475":0,"3480":0,"3482":0,"3483":0,"3484":0,"3485":0,"3487":0,"3488":0,"3489":0,"3492":0,"3493":0,"3494":0,"3495":0,"3496":0,"3499":0,"3501":0,"3502":0,"3505":0,"3506":0,"3507":0,"3509":0,"3510":0,"3511":0,"3512":0,"3513":0,"3514":0,"3524":0,"3525":0,"3529":0,"3531":0,"3533":0,"3535":0,"3536":0,"3540":0,"3544":0,"3548":0,"3570":0,"3571":0,"3573":0,"3574":0,"3577":0,"3578":0,"3580":0,"3581":0,"3582":0,"3585":0,"3586":0,"3588":0,"3589":0,"3592":0,"3593":0,"3597":0,"3599":0};
_yuitest_coverage["build/yui-nodejs/yui-nodejs.js"].functions = {"instanceOf:64":0,"YUI:59":0,"add:181":0,"remove:188":0,"handleLoad:198":0,"getLoader:205":0,"clobber:230":0,"applyConfig:264":0,"_config:311":0,"parseBasePath:385":0,"(anonymous 2):409":0,"_init:321":0,"_setup:509":0,"applyTo:542":0,"add:611":0,"_attach:657":0,"(anonymous 5):830":0,"(anonymous 4):829":0,"(anonymous 3):827":0,"_delayCallback:816":0,"(anonymous 6):943":0,"use:901":0,"_notify:960":0,"process:1013":0,"(anonymous 7):1104":0,"handleLoader:1077":0,"handleBoot:1183":0,"_use:990":0,"namespace:1252":0,"dump:1276":0,"error:1295":0,"guid:1321":0,"stamp:1343":0,"destroy:1376":0,"applyConfig:1444":0,"setLoadHook:1490":0,"(anonymous 1):156":0,"_isNative:1821":0,"isArray:1839":0,"isBoolean:1850":0,"isDate:1861":0,"isFunction:1889":0,"isNull:1900":0,"isNumber:1911":0,"isObject:1926":0,"isString:1939":0,"isUndefined:1950":0,"isValue:1963":0,"(anonymous 9):1987":0,"(anonymous 10):2003":0,"sub:2002":0,"(anonymous 11):2016":0,"}:2018":0,"(anonymous 12):2033":0,"}:2035":0,"(anonymous 13):2046":0,"}:2048":0,"type:2079":0,"YArray:2120":0,"dedupe:2160":0,"(anonymous 14):2192":0,"}:2195":0,"hash:2229":0,"(anonymous 15):2257":0,"}:2259":0,"numericSort:2302":0,"(anonymous 16):2322":0,"}:2324":0,"test:2352":0,"Queue:2386":0,"_init:2398":0,"next:2415":0,"last:2425":0,"add:2436":0,"size:2448":0,"(anonymous 17):2499":0,"cached:2495":0,"getLocation:2529":0,"merge:2554":0,"mix:2608":0,"(anonymous 18):2747":0,"F:2756":0,"(anonymous 20):2759":0,"(anonymous 19):2754":0,"owns:2822":0,"keys:2858":0,"values:2910":0,"size:2931":0,"hasValue:2949":0,"each:2973":0,"some:3005":0,"getValue:3032":0,"setValue:3062":0,"isEmpty:3092":0,"(anonymous 22):3132":0,"numberify:3130":0,"parseUA:3128":0,"compareVersions:3570":0,"(anonymous 8):1751":0};
_yuitest_coverage["build/yui-nodejs/yui-nodejs.js"].coveredLines = 829;
_yuitest_coverage["build/yui-nodejs/yui-nodejs.js"].coveredFunctions = 99;
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 12);
if (typeof YUI != 'undefined') {
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 13);
YUI._YUI = YUI;
}

/**
The YUI global namespace object. This is the constructor for all YUI instances.

This is a self-instantiable factory function, meaning you don't need to precede
it with the `new` operator. You can invoke it directly like this:

    YUI().use('*', function (Y) {
        // Y is a new YUI instance.
    });

But it also works like this:

    var Y = YUI();

The `YUI` constructor accepts an optional config object, like this:

    YUI({
        debug: true,
        combine: false
    }).use('node', function (Y) {
        // Y.Node is ready to use.
    });

See the API docs for the <a href="config.html">Config</a> class for the complete
list of supported configuration properties accepted by the YUI constuctor.

If a global `YUI` object is already defined, the existing YUI object will not be
overwritten, to ensure that defined namespaces are preserved.

Each YUI instance has full custom event support, but only if the event system is
available.

@class YUI
@uses EventTarget
@constructor
@global
@param {Object} [config]* Zero or more optional configuration objects. Config
    values are stored in the `Y.config` property. See the
    <a href="config.html">Config</a> docs for the list of supported properties.
**/

    /*global YUI*/
    /*global YUI_config*/
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 59);
var YUI = function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "YUI", 59);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 60);
var i = 0,
            Y = this,
            args = arguments,
            l = args.length,
            instanceOf = function(o, type) {
                _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "instanceOf", 64);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 65);
return (o && o.hasOwnProperty && (o instanceof type));
            },
            gconf = (typeof YUI_config !== 'undefined') && YUI_config;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 69);
if (!(instanceOf(Y, YUI))) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 70);
Y = new YUI();
        } else {
            // set up the core environment
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 73);
Y._init();

            /**
            Master configuration that might span multiple contexts in a non-
            browser environment. It is applied first to all instances in all
            contexts.

            @example

                YUI.GlobalConfig = {
                    filter: 'debug'
                };

                YUI().use('node', function (Y) {
                    // debug files used here
                });

                YUI({
                    filter: 'min'
                }).use('node', function (Y) {
                    // min files used here
                });

            @property {Object} GlobalConfig
            @global
            @static
            **/
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 100);
if (YUI.GlobalConfig) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 101);
Y.applyConfig(YUI.GlobalConfig);
            }

            /**
            Page-level config applied to all YUI instances created on the
            current page. This is applied after `YUI.GlobalConfig` and before
            any instance-level configuration.

            @example

                // Single global var to include before YUI seed file
                YUI_config = {
                    filter: 'debug'
                };

                YUI().use('node', function (Y) {
                    // debug files used here
                });

                YUI({
                    filter: 'min'
                }).use('node', function (Y) {
                    // min files used here
                });

            @property {Object} YUI_config
            @global
            **/
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 129);
if (gconf) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 130);
Y.applyConfig(gconf);
            }

            // bind the specified additional modules for this instance
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 134);
if (!l) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 135);
Y._setup();
            }
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 139);
if (l) {
            // Each instance can accept one or more configuration objects.
            // These are applied after YUI.GlobalConfig and YUI_Config,
            // overriding values set in those config files if there is a
            // matching property.
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 144);
for (; i < l; i++) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 145);
Y.applyConfig(args[i]);
            }

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 148);
Y._setup();
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 151);
Y.instanceOf = instanceOf;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 153);
return Y;
    };

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 156);
(function() {

    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 1)", 156);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 158);
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
            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "add", 181);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 182);
if (el && el.addEventListener) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 183);
el.addEventListener(type, fn, capture);
            } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 184);
if (el && el.attachEvent) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 185);
el.attachEvent('on' + type, fn);
            }}
        },
        remove = function(el, type, fn, capture) {
            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "remove", 188);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 189);
if (el && el.removeEventListener) {
                // this can throw an uncaught exception in FF
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 191);
try {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 192);
el.removeEventListener(type, fn, capture);
                } catch (ex) {}
            } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 194);
if (el && el.detachEvent) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 195);
el.detachEvent('on' + type, fn);
            }}
        },
        handleLoad = function() {
            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "handleLoad", 198);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 199);
YUI.Env.windowLoaded = true;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 200);
YUI.Env.DOMReady = true;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 201);
if (hasWin) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 202);
remove(window, 'load', handleLoad);
            }
        },
        getLoader = function(Y, o) {
            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "getLoader", 205);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 206);
var loader = Y.Env._loader,
                lCore = [ 'loader-base' ],
                G_ENV = YUI.Env,
                mods = G_ENV.mods;

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 211);
if (loader) {
                //loader._config(Y.config);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 213);
loader.ignoreRegistered = false;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 214);
loader.onEnd = null;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 215);
loader.data = null;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 216);
loader.required = [];
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 217);
loader.loadType = null;
            } else {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 219);
loader = new Y.Loader(Y.config);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 220);
Y.Env._loader = loader;
            }
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 222);
if (mods && mods.loader) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 223);
lCore = [].concat(lCore, YUI.Env.loaderExtras);
            }
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 225);
YUI.Env.core = Y.Array.dedupe([].concat(YUI.Env.core, lCore));

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 227);
return loader;
        },

        clobber = function(r, s) {
            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "clobber", 230);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 231);
for (var i in s) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 232);
if (s.hasOwnProperty(i)) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 233);
r[i] = s[i];
                }
            }
        },

        ALREADY_DONE = { success: true };

//  Stamp the documentElement (HTML) with a class of "yui-loaded" to
//  enable styles that need to key off of JS being enabled.
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 242);
if (docEl && docClass.indexOf(DOC_LABEL) == -1) {
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 243);
if (docClass) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 244);
docClass += ' ';
    }
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 246);
docClass += DOC_LABEL;
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 247);
docEl.className = docClass;
}

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 250);
if (VERSION.indexOf('@') > -1) {
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 251);
VERSION = '3.5.0'; // dev time hack for cdn test
}

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 254);
proto = {
    /**
    Applies a new configuration object to the config of this YUI instance. This
    will merge new group/module definitions, and will also update the loader
    cache if necessary. Updating `Y.config` directly will not update the cache.

    @method applyConfig
    @param {Object} o the configuration object.
    @since 3.2.0
    **/
    applyConfig: function(o) {

        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "applyConfig", 264);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 266);
o = o || NOOP;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 268);
var attr,
            name,
            // detail,
            config = this.config,
            mods = config.modules,
            groups = config.groups,
            aliases = config.aliases,
            loader = this.Env._loader;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 277);
for (name in o) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 278);
if (o.hasOwnProperty(name)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 279);
attr = o[name];
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 280);
if (mods && name == 'modules') {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 281);
clobber(mods, attr);
                } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 282);
if (aliases && name == 'aliases') {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 283);
clobber(aliases, attr);
                } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 284);
if (groups && name == 'groups') {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 285);
clobber(groups, attr);
                } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 286);
if (name == 'win') {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 287);
config[name] = (attr && attr.contentWindow) || attr;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 288);
config.doc = config[name] ? config[name].document : null;
                } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 289);
if (name == '_yuid') {
                    // preserve the guid
                } else {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 292);
config[name] = attr;
                }}}}}
            }
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 297);
if (loader) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 298);
loader._config(o);
        }

    },

    /**
    Old way to apply a config to this instance (calls `applyConfig` under the
    hood).

    @private
    @method _config
    @param {Object} o The config to apply
    **/
    _config: function(o) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_config", 311);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 312);
this.applyConfig(o);
    },

    /**
    Initializes this YUI instance.

    @private
    @method _init
    **/
    _init: function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_init", 321);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 322);
var filter, el,
            Y = this,
            G_ENV = YUI.Env,
            Env = Y.Env,
            prop;

        /**
        The version number of this YUI instance.

        This value is typically updated by a script when a YUI release is built,
        so it may not reflect the correct version number when YUI is run from
        the development source tree.

        @property {String} version
        **/
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 337);
Y.version = VERSION;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 339);
if (!Env) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 340);
Y.Env = {
                core: ['get', 'features', 'intl-base', 'yui-log', 'yui-log-nodejs', 'yui-later', 'loader-base', 'loader-rollup', 'loader-yui3'],
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
                    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "parseBasePath", 385);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 386);
var match = src.match(pattern),
                        path, filter;

                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 389);
if (match) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 390);
path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));

                        // this is to set up the path to the loader.  The file
                        // filter for loader should match the yui include.
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 394);
filter = match[3];

                        // extract correct path for mixed combo urls
                        // http://yuilibrary.com/projects/yui3/ticket/2528423
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 398);
if (match[1]) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 399);
path += '?' + match[1];
                        }
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 401);
path = {
                            filter: filter,
                            path: path
                        };
                    }
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 406);
return path;
                },
                getBase: G_ENV && G_ENV.getBase ||
                        function(pattern) {
                            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 2)", 409);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 410);
var nodes = (doc && doc.getElementsByTagName('script')) || [],
                                path = Env.cdn, parsed,
                                i, len, src;

                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 414);
for (i = 0, len = nodes.length; i < len; ++i) {
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 415);
src = nodes[i].src;
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 416);
if (src) {
                                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 417);
parsed = Y.Env.parseBasePath(src, pattern);
                                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 418);
if (parsed) {
                                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 419);
filter = parsed.filter;
                                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 420);
path = parsed.path;
                                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 421);
break;
                                    }
                                }
                            }

                            // use CDN default
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 427);
return path;
                        }

            };

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 432);
Env = Y.Env;

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 434);
Env._loaded[VERSION] = {};

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 436);
if (G_ENV && Y !== YUI) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 437);
Env._yidx = ++G_ENV._yidx;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 438);
Env._guidp = ('yui_' + VERSION + '_' +
                             Env._yidx + '_' + time).replace(/[^a-z0-9_]+/g, '_');
            } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 440);
if (YUI._YUI) {

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 442);
G_ENV = YUI._YUI.Env;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 443);
Env._yidx += G_ENV._yidx;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 444);
Env._uidx += G_ENV._uidx;

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 446);
for (prop in G_ENV) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 447);
if (!(prop in Env)) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 448);
Env[prop] = G_ENV[prop];
                    }
                }

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 452);
delete YUI._YUI;
            }}

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 455);
Y.id = Y.stamp(Y);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 456);
instances[Y.id] = Y;

        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 460);
Y.constructor = YUI;

        // configuration defaults
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 463);
Y.config = Y.config || {
            bootstrap: true,
            cacheUse: true,
            debug: true,
            doc: doc,
            fetchCSS: true,
            throwFail: true,
            useBrowserConsole: true,
            useNativeES5: true,
            win: win,
            global: Function('return this')()
        };

        //Register the CSS stamp element
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 477);
if (doc && !doc.getElementById(CSS_STAMP_EL)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 478);
el = doc.createElement('div');
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 479);
el.innerHTML = '<div id="' + CSS_STAMP_EL + '" style="position: absolute !important; visibility: hidden !important"></div>';
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 480);
YUI.Env.cssStampEl = el.firstChild;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 481);
if (doc.body) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 482);
doc.body.appendChild(YUI.Env.cssStampEl);
            } else {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 484);
docEl.insertBefore(YUI.Env.cssStampEl, docEl.firstChild);
            }
        } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 486);
if (doc && doc.getElementById(CSS_STAMP_EL) && !YUI.Env.cssStampEl) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 487);
YUI.Env.cssStampEl = doc.getElementById(CSS_STAMP_EL);
        }}

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 490);
Y.config.lang = Y.config.lang || 'en-US';

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 492);
Y.config.base = YUI.config.base || Y.Env.getBase(Y.Env._BASE_RE);

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 494);
if (!filter || (!('mindebug').indexOf(filter))) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 495);
filter = 'min';
        }
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 497);
filter = (filter) ? '-' + filter : filter;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 498);
Y.config.loaderPath = YUI.config.loaderPath || 'loader/loader' + filter + '.js';

    },

    /**
    Finishes the instance setup. Attaches whatever YUI modules were defined
    at the time that this instance was created.

    @method _setup
    @private
    **/
    _setup: function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_setup", 509);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 510);
var i, Y = this,
            core = [],
            mods = YUI.Env.mods,
            extras = Y.config.core || [].concat(YUI.Env.core); //Clone it..

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 515);
for (i = 0; i < extras.length; i++) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 516);
if (mods[extras[i]]) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 517);
core.push(extras[i]);
            }
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 521);
Y._attach(['yui-base']);
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 522);
Y._attach(core);

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 524);
if (Y.Loader) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 525);
getLoader(Y);
        }

    },

    /**
    Executes the named method on the specified YUI instance if that method is
    whitelisted.

    @method applyTo
    @param {String} id YUI instance id.
    @param {String} method Name of the method to execute. For example:
        'Object.keys'.
    @param {Array} args Arguments to apply to the method.
    @return {Mixed} Return value from the applied method, or `null` if the
        specified instance was not found or the method was not whitelisted.
    **/
    applyTo: function(id, method, args) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "applyTo", 542);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 543);
if (!(method in APPLY_TO_AUTH)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 544);
this.log(method + ': applyTo not allowed', 'warn', 'yui');
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 545);
return null;
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 548);
var instance = instances[id], nest, m, i;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 549);
if (instance) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 550);
nest = method.split('.');
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 551);
m = instance;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 552);
for (i = 0; i < nest.length; i = i + 1) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 553);
m = m[nest[i]];
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 554);
if (!m) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 555);
this.log('applyTo not found: ' + method, 'warn', 'yui');
                }
            }
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 558);
return m && m.apply(instance, args);
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 561);
return null;
    },

/**
Registers a YUI module and makes it available for use in a `YUI().use()` call or
as a dependency for other modules.

The easiest way to create a first-class YUI module is to use
<a href="http://yui.github.com/shifter/">Shifter</a>, the YUI component build
tool.

Shifter will automatically wrap your module code in a `YUI.add()` call along
with any configuration info required for the module.

@example

    YUI.add('davglass', function (Y) {
        Y.davglass = function () {
        };
    }, '3.4.0', {
        requires: ['harley-davidson', 'mt-dew']
    });

@method add
@param {String} name Module name.
@param {Function} fn Function containing module code. This function will be
    executed whenever the module is attached to a specific YUI instance.

    @param {YUI} fn.Y The YUI instance to which this module is attached.
    @param {String} fn.name Name of the module

@param {String} version Module version number. This is currently used only for
    informational purposes, and is not used internally by YUI.

@param {Object} [config] Module config.
    @param {Array} [config.requires] Array of other module names that must be
        attached before this module can be attached.
    @param {Array} [config.optional] Array of optional module names that should
        be attached before this module is attached if they've already been
        loaded. If the `loadOptional` YUI option is `true`, optional modules
        that have not yet been loaded will be loaded just as if they were hard
        requirements.
    @param {Array} [config.use] Array of module names that are included within
        or otherwise provided by this module, and which should be attached
        automatically when this module is attached. This makes it possible to
        create "virtual rollup" modules that simply attach a collection of other
        modules or submodules.

@return {YUI} This YUI instance.
**/
    add: function(name, fn, version, details) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "add", 611);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 612);
details = details || {};
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 613);
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

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 625);
env.mods[name] = mod;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 626);
versions[version] = versions[version] || {};
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 627);
versions[version][name] = mod;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 629);
for (i in instances) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 630);
if (instances.hasOwnProperty(i)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 631);
inst = instances[i];
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 632);
if (!applied[inst.id]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 633);
applied[inst.id] = true;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 634);
loader = inst.Env._loader;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 635);
if (loader) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 636);
if (!loader.moduleInfo[name] || loader.moduleInfo[name].temp) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 637);
loader.addModule(details, name);
                        }
                    }
                }
            }
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 644);
return this;
    },

    /**
    Executes the callback function associated with each required module,
    attaching the module to this YUI instance.

    @method _attach
    @param {Array} r The array of modules to attach
    @param {Boolean} [moot=false] If `true`, don't throw a warning if the module
        is not attached.
    @private
    **/
    _attach: function(r, moot) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_attach", 657);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 658);
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
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 670);
for (i = 0; i < len; i++) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 671);
name = r[i];
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 672);
mod = mods[name];
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 673);
c.push(name);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 674);
if (loader && loader.conditions[name]) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 675);
for (j in loader.conditions[name]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 676);
if (loader.conditions[name].hasOwnProperty(j)) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 677);
def = loader.conditions[name][j];
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 678);
go = def && ((def.ua && Y.UA[def.ua]) || (def.test && def.test(Y)));
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 679);
if (go) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 680);
c.push(def.name);
                        }
                    }
                }
            }
        }
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 686);
r = c;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 687);
len = r.length;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 689);
for (i = 0; i < len; i++) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 690);
if (!done[r[i]]) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 691);
name = r[i];
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 692);
mod = mods[name];

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 694);
if (aliases && aliases[name] && !mod) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 695);
Y._attach(aliases[name]);
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 696);
continue;
                }
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 698);
if (!mod) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 699);
if (loader && loader.moduleInfo[name]) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 700);
mod = loader.moduleInfo[name];
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 701);
moot = true;
                    }


                    //if (!loader || !loader.moduleInfo[name]) {
                    //if ((!loader || !loader.moduleInfo[name]) && !moot) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 707);
if (!moot && name) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 708);
if ((name.indexOf('skin-') === -1) && (name.indexOf('css') === -1)) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 709);
Y.Env._missed.push(name);
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 710);
Y.Env._missed = Y.Array.dedupe(Y.Env._missed);
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 711);
Y.message('NOT loaded: ' + name, 'warn', 'yui');
                        }
                    }
                } else {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 715);
done[name] = true;
                    //Don't like this, but in case a mod was asked for once, then we fetch it
                    //We need to remove it from the missed list ^davglass
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 718);
for (j = 0; j < Y.Env._missed.length; j++) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 719);
if (Y.Env._missed[j] === name) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 720);
Y.message('Found: ' + name + ' (was reported as missing earlier)', 'warn', 'yui');
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 721);
Y.Env._missed.splice(j, 1);
                        }
                    }
                    /*
                        If it's a temp module, we need to redo it's requirements if it's already loaded
                        since it may have been loaded by another instance and it's dependencies might
                        have been redefined inside the fetched file.
                    */
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 729);
if (loader && cache && cache[name] && cache[name].temp) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 730);
loader.getRequires(cache[name]);
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 731);
req = [];
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 732);
for (j in loader.moduleInfo[name].expanded_map) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 733);
if (loader.moduleInfo[name].expanded_map.hasOwnProperty(j)) {
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 734);
req.push(j);
                            }
                        }
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 737);
Y._attach(req);
                    }

                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 740);
details = mod.details;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 741);
req = details.requires;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 742);
use = details.use;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 743);
after = details.after;
                    //Force Intl load if there is a language (Loader logic) @todo fix this shit
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 745);
if (details.lang) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 746);
req = req || [];
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 747);
req.unshift('intl');
                    }

                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 750);
if (req) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 751);
for (j = 0; j < req.length; j++) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 752);
if (!done[req[j]]) {
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 753);
if (!Y._attach(req)) {
                                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 754);
return false;
                                }
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 756);
break;
                            }
                        }
                    }

                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 761);
if (after) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 762);
for (j = 0; j < after.length; j++) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 763);
if (!done[after[j]]) {
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 764);
if (!Y._attach(after, true)) {
                                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 765);
return false;
                                }
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 767);
break;
                            }
                        }
                    }

                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 772);
if (mod.fn) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 773);
if (Y.config.throwFail) {
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 774);
mod.fn(Y, name);
                            } else {
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 776);
try {
                                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 777);
mod.fn(Y, name);
                                } catch (e) {
                                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 779);
Y.error('Attach error: ' + name, e, name);
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 780);
return false;
                            }
                        }
                    }

                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 785);
if (use) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 786);
for (j = 0; j < use.length; j++) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 787);
if (!done[use[j]]) {
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 788);
if (!Y._attach(use)) {
                                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 789);
return false;
                                }
                                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 791);
break;
                            }
                        }
                    }



                }
            }
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 802);
return true;
    },

    /**
    Delays the `use` callback until another event has taken place such as
    `window.onload`, `domready`, `contentready`, or `available`.

    @private
    @method _delayCallback
    @param {Function} cb The original `use` callback.
    @param {String|Object} until Either an event name ('load', 'domready', etc.)
        or an object containing event/args keys for contentready/available.
    @return {Function}
    **/
    _delayCallback: function(cb, until) {

        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_delayCallback", 816);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 818);
var Y = this,
            mod = ['event-base'];

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 821);
until = (Y.Lang.isObject(until) ? until : { event: until });

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 823);
if (until.event === 'load') {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 824);
mod.push('event-synthetic');
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 827);
return function() {
            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 3)", 827);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 828);
var args = arguments;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 829);
Y._use(mod, function() {
                _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 4)", 829);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 830);
Y.on(until.event, function() {
                    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 5)", 830);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 831);
args[1].delayUntil = until.event;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 832);
cb.apply(Y, args);
                }, until.args);
            });
        };
    },

    /**
    Attaches one or more modules to this YUI instance. When this is executed,
    the requirements of the desired modules are analyzed, and one of several
    things can happen:


      * All required modules have already been loaded, and just need to be
        attached to this YUI instance. In this case, the `use()` callback will
        be executed synchronously after the modules are attached.

      * One or more modules have not yet been loaded, or the Get utility is not
        available, or the `bootstrap` config option is `false`. In this case,
        a warning is issued indicating that modules are missing, but all
        available modules will still be attached and the `use()` callback will
        be executed synchronously.

      * One or more modules are missing and the Loader is not available but the
        Get utility is, and `bootstrap` is not `false`. In this case, the Get
        utility will be used to load the Loader, and we will then proceed to
        the following state:

      * One or more modules are missing and the Loader is available. In this
        case, the Loader will be used to resolve the dependency tree for the
        missing modules and load them and their dependencies. When the Loader is
        finished loading modules, the `use()` callback will be executed
        asynchronously.

    @example

        // Loads and attaches dd and its dependencies.
        YUI().use('dd', function (Y) {
            // ...
        });

        // Loads and attaches dd and node as well as all of their dependencies.
        YUI().use(['dd', 'node'], function (Y) {
            // ...
        });

        // Attaches all modules that have already been loaded.
        YUI().use('*', function (Y) {
            // ...
        });

        // Attaches a gallery module.
        YUI().use('gallery-yql', function (Y) {
            // ...
        });

        // Attaches a YUI 2in3 module.
        YUI().use('yui2-datatable', function (Y) {
            // ...
        });

    @method use
    @param {String|Array} modules* One or more module names to attach.
    @param {Function} [callback] Callback function to be executed once all
        specified modules and their dependencies have been attached.
    @param {YUI} callback.Y The YUI instance created for this sandbox.
    @param {Object} callback.status Object containing `success`, `msg` and
        `data` properties.
    @chainable
    **/
    use: function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "use", 901);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 902);
var args = SLICE.call(arguments, 0),
            callback = args[args.length - 1],
            Y = this,
            i = 0,
            name,
            Env = Y.Env,
            provisioned = true;

        // The last argument supplied to use can be a load complete callback
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 911);
if (Y.Lang.isFunction(callback)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 912);
args.pop();
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 913);
if (Y.config.delayUntil) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 914);
callback = Y._delayCallback(callback, Y.config.delayUntil);
            }
        } else {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 917);
callback = null;
        }
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 919);
if (Y.Lang.isArray(args[0])) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 920);
args = args[0];
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 923);
if (Y.config.cacheUse) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 924);
while ((name = args[i++])) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 925);
if (!Env._attached[name]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 926);
provisioned = false;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 927);
break;
                }
            }

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 931);
if (provisioned) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 932);
if (args.length) {
                }
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 934);
Y._notify(callback, ALREADY_DONE, args);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 935);
return Y;
            }
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 939);
if (Y._loading) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 940);
Y._useQueue = Y._useQueue || new Y.Queue();
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 941);
Y._useQueue.add([args, callback]);
        } else {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 943);
Y._use(args, function(Y, response) {
                _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 6)", 943);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 944);
Y._notify(callback, response, args);
            });
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 948);
return Y;
    },

    /**
    Handles Loader notifications about attachment/load errors.

    @method _notify
    @param {Function} callback Callback to pass to `Y.config.loadErrorFn`.
    @param {Object} response Response returned from Loader.
    @param {Array} args Arguments passed from Loader.
    @private
    **/
    _notify: function(callback, response, args) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_notify", 960);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 961);
if (!response.success && this.config.loadErrorFn) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 962);
this.config.loadErrorFn.call(this, this, callback, response, args);
        } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 963);
if (callback) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 964);
if (this.Env._missed && this.Env._missed.length) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 965);
response.msg = 'Missing modules: ' + this.Env._missed.join();
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 966);
response.success = false;
            }
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 968);
if (this.config.throwFail) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 969);
callback(this, response);
            } else {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 971);
try {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 972);
callback(this, response);
                } catch (e) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 974);
this.error('use callback error', e, args);
                }
            }
        }}
    },

    /**
    Called from the `use` method queue to ensure that only one set of loading
    logic is performed at a time.

    @method _use
    @param {String} args* One or more modules to attach.
    @param {Function} [callback] Function to call once all required modules have
        been attached.
    @private
    **/
    _use: function(args, callback) {

        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_use", 990);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 992);
if (!this.Array) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 993);
this._attach(['yui-base']);
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 996);
var len, loader, handleBoot,
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

                _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "process", 1013);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1015);
var i = 0, a = [], name, len, m, req, use;

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1017);
if (!names.length) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1018);
return;
                }

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1021);
if (aliases) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1022);
len = names.length;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1023);
for (i = 0; i < len; i++) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1024);
if (aliases[names[i]] && !mods[names[i]]) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1025);
a = [].concat(a, aliases[names[i]]);
                        } else {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1027);
a.push(names[i]);
                        }
                    }
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1030);
names = a;
                }

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1033);
len = names.length;

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1035);
for (i = 0; i < len; i++) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1036);
name = names[i];
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1037);
if (!skip) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1038);
r.push(name);
                    }

                    // only attach a module once
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1042);
if (used[name]) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1043);
continue;
                    }

                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1046);
m = mods[name];
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1047);
req = null;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1048);
use = null;

                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1050);
if (m) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1051);
used[name] = true;
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1052);
req = m.details.requires;
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1053);
use = m.details.use;
                    } else {
                        // CSS files don't register themselves, see if it has
                        // been loaded
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1057);
if (!G_ENV._loaded[VERSION][name]) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1058);
missing.push(name);
                        } else {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1060);
used[name] = true; // probably css
                        }
                    }

                    // make sure requirements are attached
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1065);
if (req && req.length) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1066);
process(req);
                    }

                    // make sure we grab the submodule dependencies too
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1070);
if (use && use.length) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1071);
process(use, 1);
                    }
                }

            },

            handleLoader = function(fromLoader) {
                _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "handleLoader", 1077);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1078);
var response = fromLoader || {
                        success: true,
                        msg: 'not dynamic'
                    },
                    redo, origMissing,
                    ret = true,
                    data = response.data;

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1086);
Y._loading = false;

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1088);
if (data) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1089);
origMissing = missing;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1090);
missing = [];
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1091);
r = [];
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1092);
process(data);
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1093);
redo = missing.length;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1094);
if (redo) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1095);
if ([].concat(missing).sort().join() ==
                                origMissing.sort().join()) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1097);
redo = false;
                        }
                    }
                }

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1102);
if (redo && data) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1103);
Y._loading = true;
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1104);
Y._use(missing, function() {
                        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 7)", 1104);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1105);
if (Y._attach(data)) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1106);
Y._notify(callback, response, data);
                        }
                    });
                } else {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1110);
if (data) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1111);
ret = Y._attach(data);
                    }
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1113);
if (ret) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1114);
Y._notify(callback, response, args);
                    }
                }

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1118);
if (Y._useQueue && Y._useQueue.size() && !Y._loading) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1119);
Y._use.apply(Y, Y._useQueue.next());
                }

            };


        // YUI().use('*'); // bind everything available
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1126);
if (firstArg === '*') {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1127);
args = [];
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1128);
for (i in mods) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1129);
if (mods.hasOwnProperty(i)) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1130);
args.push(i);
                }
            }
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1133);
ret = Y._attach(args);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1134);
if (ret) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1135);
handleLoader();
            }
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1137);
return Y;
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1140);
if ((mods.loader || mods['loader-base']) && !Y.Loader) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1141);
Y._attach(['loader' + ((!mods.loader) ? '-base' : '')]);
        }


        // use loader to expand dependencies and sort the
        // requirements if it is available.
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1147);
if (boot && Y.Loader && args.length) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1148);
loader = getLoader(Y);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1149);
loader.require(args);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1150);
loader.ignoreRegistered = true;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1151);
loader._boot = true;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1152);
loader.calculate(null, (fetchCSS) ? null : 'js');
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1153);
args = loader.sorted;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1154);
loader._boot = false;
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1157);
process(args);

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1159);
len = missing.length;


        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1162);
if (len) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1163);
missing = YArray.dedupe(missing);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1164);
len = missing.length;
        }


        // dynamic load
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1169);
if (boot && len && Y.Loader) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1170);
Y._loading = true;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1171);
loader = getLoader(Y);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1172);
loader.onEnd = handleLoader;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1173);
loader.context = Y;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1174);
loader.data = args;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1175);
loader.ignoreRegistered = false;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1176);
loader.require(missing);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1177);
loader.insert(null, (fetchCSS) ? null : 'js');

        } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1179);
if (boot && len && Y.Get && !Env.bootstrapped) {

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1181);
Y._loading = true;

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1183);
handleBoot = function() {
                _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "handleBoot", 1183);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1184);
Y._loading = false;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1185);
queue.running = false;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1186);
Env.bootstrapped = true;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1187);
G_ENV._bootstrapping = false;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1188);
if (Y._attach(['loader'])) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1189);
Y._use(args, callback);
                }
            };

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1193);
if (G_ENV._bootstrapping) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1194);
queue.add(handleBoot);
            } else {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1196);
G_ENV._bootstrapping = true;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1197);
Y.Get.script(config.base + config.loaderPath, {
                    onEnd: handleBoot
                });
            }

        } else {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1203);
ret = Y._attach(args);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1204);
if (ret) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1205);
handleLoader();
            }
        }}

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1209);
return Y;
    },


    /**
    Utility method for safely creating namespaces if they don't already exist.
    May be called statically on the YUI global object or as a method on a YUI
    instance.

    When called statically, a namespace will be created on the YUI global
    object:

        // Create `YUI.your.namespace.here` as nested objects, preserving any
        // objects that already exist instead of overwriting them.
        YUI.namespace('your.namespace.here');

    When called as a method on a YUI instance, a namespace will be created on
    that instance:

        // Creates `Y.property.package`.
        Y.namespace('property.package');

    Dots in the input string cause `namespace` to create nested objects for each
    token. If any part of the requested namespace already exists, the current
    object will be left in place and will not be overwritten. This allows
    multiple calls to `namespace` to preserve existing namespaced properties.

    If the first token in the namespace string is "YAHOO", that token is
    discarded. This is legacy behavior for backwards compatibility with YUI 2.

    Be careful with namespace tokens. Reserved words may work in some browsers
    and not others. For instance, the following will fail in some browsers
    because the supported version of JavaScript reserves the word "long":

        Y.namespace('really.long.nested.namespace');

    Note: If you pass multiple arguments to create multiple namespaces, only the
    last one created is returned from this function.

    @method namespace
    @param {String} namespace* One or more namespaces to create.
    @return {Object} Reference to the last namespace object created.
    **/
    namespace: function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "namespace", 1252);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1253);
var a = arguments, o, i = 0, j, d, arg;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1255);
for (; i < a.length; i++) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1256);
o = this; //Reset base object per argument or it will get reused from the last
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1257);
arg = a[i];
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1258);
if (arg.indexOf(PERIOD) > -1) { //Skip this if no "." is present
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1259);
d = arg.split(PERIOD);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1260);
for (j = (d[0] == 'YAHOO') ? 1 : 0; j < d.length; j++) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1261);
o[d[j]] = o[d[j]] || {};
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1262);
o = o[d[j]];
                }
            } else {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1265);
o[arg] = o[arg] || {};
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1266);
o = o[arg]; //Reset base object to the new object so it's returned
            }
        }
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1269);
return o;
    },

    // this is replaced if the log module is included
    log: NOOP,
    message: NOOP,
    // this is replaced if the dump module is included
    dump: function (o) { _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "dump", 1276);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1276);
return ''+o; },

    /**
    Reports an error.

    The reporting mechanism is controlled by the `throwFail` configuration
    attribute. If `throwFail` is falsy, the message is logged. If `throwFail` is
    truthy, a JS exception is thrown.

    If an `errorFn` is specified in the config it must return `true` to indicate
    that the exception was handled and keep it from being thrown.

    @method error
    @param {String} msg Error message.
    @param {Error|String} [e] JavaScript error object or an error string.
    @param {String} [src] Source of the error (such as the name of the module in
        which the error occurred).
    @chainable
    **/
    error: function(msg, e, src) {
        //TODO Add check for window.onerror here

        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "error", 1295);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1298);
var Y = this, ret;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1300);
if (Y.config.errorFn) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1301);
ret = Y.config.errorFn.apply(Y, arguments);
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1304);
if (!ret) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1305);
throw (e || new Error(msg));
        } else {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1307);
Y.message(msg, 'error', ''+src); // don't scrub this one
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1310);
return Y;
    },

    /**
    Generates an id string that is unique among all YUI instances in this
    execution context.

    @method guid
    @param {String} [pre] Prefix.
    @return {String} Unique id.
    **/
    guid: function(pre) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "guid", 1321);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1322);
var id = this.Env._guidp + '_' + (++this.Env._uidx);
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1323);
return (pre) ? (pre + id) : id;
    },

    /**
    Returns a unique id associated with the given object and (if *readOnly* is
    falsy) stamps the object with that id so it can be identified in the future.

    Stamping an object involves adding a `_yuid` property to it that contains
    the object's id. One exception to this is that in Internet Explorer, DOM
    nodes have a `uniqueID` property that contains a browser-generated unique
    id, which will be used instead of a YUI-generated id when available.

    @method stamp
    @param {Object} o Object to stamp.
    @param {Boolean} readOnly If truthy and the given object has not already
        been stamped, the object will not be modified and `null` will be
        returned.
    @return {String} Object's unique id, or `null` if *readOnly* was truthy and
        the given object was not already stamped.
    **/
    stamp: function(o, readOnly) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "stamp", 1343);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1344);
var uid;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1345);
if (!o) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1346);
return o;
        }

        // IE generates its own unique ID for dom nodes
        // The uniqueID property of a document node returns a new ID
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1351);
if (o.uniqueID && o.nodeType && o.nodeType !== 9) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1352);
uid = o.uniqueID;
        } else {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1354);
uid = (typeof o === 'string') ? o : o._yuid;
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1357);
if (!uid) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1358);
uid = this.guid();
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1359);
if (!readOnly) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1360);
try {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1361);
o._yuid = uid;
                } catch (e) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1363);
uid = null;
                }
            }
        }
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1367);
return uid;
    },

    /**
    Destroys this YUI instance.

    @method destroy
    @since 3.3.0
    **/
    destroy: function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "destroy", 1376);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1377);
var Y = this;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1378);
if (Y.Event) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1379);
Y.Event._unload();
        }
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1381);
delete instances[Y.id];
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1382);
delete Y.Env;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1383);
delete Y.config;
    }

    /**
    Safe `instanceof` wrapper that works around a memory leak in IE when the
    object being tested is `window` or `document`.

    Unless you are testing objects that may be `window` or `document`, you
    should use the native `instanceof` operator instead of this method.

    @method instanceOf
    @param {Object} o Object to check.
    @param {Object} type Class to check against.
    @since 3.3.0
    **/
};

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1400);
YUI.prototype = proto;

    // inheritance utilities are not available yet
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1403);
for (prop in proto) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1404);
if (proto.hasOwnProperty(prop)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1405);
YUI[prop] = proto[prop];
        }
    }

    /**
    Applies a configuration to all YUI instances in this execution context.

    The main use case for this method is in "mashups" where several third-party
    scripts need to write to a global YUI config, but cannot share a single
    centrally-managed config object. This way they can all call
    `YUI.applyConfig({})` instead of overwriting the single global config.

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

        YUI().use('davglass', function (Y) {
            // Module davglass will be available here.
        });

    @method applyConfig
    @param {Object} o Configuration object to apply.
    @static
    @since 3.5.0
    **/
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1444);
YUI.applyConfig = function(o) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "applyConfig", 1444);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1445);
if (!o) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1446);
return;
        }
        //If there is a GlobalConfig, apply it first to set the defaults
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1449);
if (YUI.GlobalConfig) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1450);
this.prototype.applyConfig.call(this, YUI.GlobalConfig);
        }
        //Apply this config to it
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1453);
this.prototype.applyConfig.call(this, o);
        //Reset GlobalConfig to the combined config
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1455);
YUI.GlobalConfig = this.config;
    };

    // set up the environment
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1459);
YUI._init();

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1461);
if (hasWin) {
        // add a window load event at load time so we can capture
        // the case where it fires before dynamic loading is
        // complete.
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1465);
add(window, 'load', handleLoad);
    } else {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1467);
handleLoad();
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1470);
YUI.Env.add = add;
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1471);
YUI.Env.remove = remove;

    /*global exports*/
    // Support the CommonJS method for exporting our single global
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1475);
if (typeof exports == 'object') {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1476);
exports.YUI = YUI;
        /**
        * Set a method to be called when `Get.script` is called in Node.js
        * `Get` will open the file, then pass it's content and it's path
        * to this method before attaching it. Commonly used for code coverage
        * instrumentation. <strong>Calling this multiple times will only
        * attach the last hook method</strong>. This method is only
        * available in Node.js.
        * @method setLoadHook
        * @static
        * @param {Function} fn The function to set
        * @param {String} fn.data The content of the file
        * @param {String} fn.path The file path of the file
        */
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1490);
YUI.setLoadHook = function(fn) {
            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "setLoadHook", 1490);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1491);
YUI._getLoadHook = fn;
        };
        /**
        * Load hook for `Y.Get.script` in Node.js, see `YUI.setLoadHook`
        * @method _getLoadHook
        * @private
        * @param {String} data The content of the file
        * @param {String} path The file path of the file
        */
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1500);
YUI._getLoadHook = null;
    }

}());


/**
Config object that contains all of the configuration options for
this `YUI` instance.

This object is supplied by the implementer when instantiating YUI. Some
properties have default values if they are not supplied by the implementer.

This object should not be updated directly because some values are cached. Use
`applyConfig()` to update the config object on a YUI instance that has already
been configured.

@class config
@static
**/

/**
If `true` (the default), YUI will "bootstrap" the YUI Loader and module metadata
if they're needed to load additional dependencies and aren't already available.

Setting this to `false` will prevent YUI from automatically loading the Loader
and module metadata, so you will need to manually ensure that they're available
or handle dependency resolution yourself.

@property {Boolean} bootstrap
@default true
**/

/**

@property {Object} aliases
**/

/**
A hash of module group definitions.

For each group you can specify a list of modules and the base path and
combo spec to use when dynamically loading the modules.

@example

    groups: {
        yui2: {
            // specify whether or not this group has a combo service
            combine: true,

            // The comboSeperator to use with this group's combo handler
            comboSep: ';',

            // The maxURLLength for this server
            maxURLLength: 500,

            // the base path for non-combo paths
            base: 'http://yui.yahooapis.com/2.8.0r4/build/',

            // the path to the combo service
            comboBase: 'http://yui.yahooapis.com/combo?',

            // a fragment to prepend to the path attribute when
            // when building combo urls
            root: '2.8.0r4/build/',

            // the module definitions
            modules:  {
                yui2_yde: {
                    path: "yahoo-dom-event/yahoo-dom-event.js"
                },
                yui2_anim: {
                    path: "animation/animation.js",
                    requires: ['yui2_yde']
                }
            }
        }
    }

@property {Object} groups
**/

/**
Path to the Loader JS file, relative to the `base` path.

This is used to dynamically bootstrap the Loader when it's needed and isn't yet
available.

@property {String} loaderPath
@default "loader/loader-min.js"
**/

/**
If `true`, YUI will attempt to load CSS dependencies and skins. Set this to
`false` to prevent YUI from loading any CSS, or set it to the string `"force"`
to force CSS dependencies to be loaded even if their associated JS modules are
already loaded.

@property {Boolean|String} fetchCSS
@default true
**/

/**
Default gallery version used to build gallery module urls.

@property {String} gallery
@since 3.1.0
**/

/**
Default YUI 2 version used to build YUI 2 module urls.

This is used for intrinsic YUI 2 support via the 2in3 project. Also see the
`2in3` config for pulling different revisions of the wrapped YUI 2 modules.

@property {String} yui2
@default "2.9.0"
@since 3.1.0
**/

/**
Revision number of YUI 2in3 modules that should be used when loading YUI 2in3.

@property {String} 2in3
@default "4"
@since 3.1.0
**/

/**
Alternate console log function that should be used in environments without a
supported native console. This function is executed with the YUI instance as its
`this` object.

@property {Function} logFn
@since 3.1.0
**/

/**
Callback to execute when `Y.error()` is called. It receives the error message
and a JavaScript error object if one was provided.

This function is executed with the YUI instance as its `this` object.

Returning `true` from this function will prevent an exception from being thrown.

@property {Function} errorFn
@param {String} errorFn.msg Error message
@param {Object} [errorFn.err] Error object (if one was provided).
@since 3.2.0
**/

/**
A callback to execute when Loader fails to load one or more resources.

This could be because of a script load failure. It could also be because a
module fails to register itself when the `requireRegistration` config is `true`.

If this function is defined, the `use()` callback will only be called when the
loader succeeds. Otherwise, `use()` will always executes unless there was a
JavaScript error when attaching a module.

@property {Function} loadErrorFn
@since 3.3.0
**/

/**
If `true`, Loader will expect all loaded scripts to be first-class YUI modules
that register themselves with the YUI global, and will trigger a failure if a
loaded script does not register a YUI module.

@property {Boolean} requireRegistration
@default false
@since 3.3.0
**/

/**
Cache serviced use() requests.

@property {Boolean} cacheUse
@default true
@since 3.3.0
@deprecated No longer used.
**/

/**
Whether or not YUI should use native ES5 functionality when available for
features like `Y.Array.each()`, `Y.Object()`, etc.

When `false`, YUI will always use its own fallback implementations instead of
relying on ES5 functionality, even when ES5 functionality is available.

@property {Boolean} useNativeES5
@default true
@since 3.5.0
**/

/**
 * Leverage native JSON stringify if the browser has a native
 * implementation.  In general, this is a good idea.  See the Known Issues
 * section in the JSON user guide for caveats.  The default value is true
 * for browsers with native JSON support.
 *
 * @property useNativeJSONStringify
 * @type Boolean
 * @default true
 * @since 3.8.0
 */

 /**
 * Leverage native JSON parse if the browser has a native implementation.
 * In general, this is a good idea.  See the Known Issues section in the
 * JSON user guide for caveats.  The default value is true for browsers with
 * native JSON support.
 *
 * @property useNativeJSONParse
 * @type Boolean
 * @default true
 * @since 3.8.0
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
    }, function (Y) {
        // This will not execute until 'domeready' occurs.
    });

Or you can delay until a node is available (with `available` or `contentready`):

    YUI({
        delayUntil: {
            event: 'available',
            args : '#foo'
        }
    }, function (Y) {
        // This will not execute until a node matching the selector "#foo" is
        // available in the DOM.
    });

@property {Object|String} delayUntil
@since 3.6.0
**/
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1751);
YUI.add('yui-base', function (Y, NAME) {

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

_yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 8)", 1751);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1773);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1821);
L._isNative = function (fn) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_isNative", 1821);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1822);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1839);
L.isArray = L._isNative(Array.isArray) ? Array.isArray : function (o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isArray", 1839);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1840);
return L.type(o) === 'array';
};

/**
 * Determines whether or not the provided item is a boolean.
 * @method isBoolean
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a boolean.
 */
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1850);
L.isBoolean = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isBoolean", 1850);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1851);
return typeof o === 'boolean';
};

/**
 * Determines whether or not the supplied item is a date instance.
 * @method isDate
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a date.
 */
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1861);
L.isDate = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isDate", 1861);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1862);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1889);
L.isFunction = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isFunction", 1889);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1890);
return L.type(o) === 'function';
};

/**
 * Determines whether or not the provided item is null.
 * @method isNull
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is null.
 */
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1900);
L.isNull = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isNull", 1900);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1901);
return o === null;
};

/**
 * Determines whether or not the provided item is a legal number.
 * @method isNumber
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a number.
 */
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1911);
L.isNumber = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isNumber", 1911);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1912);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1926);
L.isObject = function(o, failfn) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isObject", 1926);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1927);
var t = typeof o;
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1928);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1939);
L.isString = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isString", 1939);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1940);
return typeof o === 'string';
};

/**
 * Determines whether or not the provided item is undefined.
 * @method isUndefined
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is undefined.
 */
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1950);
L.isUndefined = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isUndefined", 1950);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1951);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1963);
L.isValue = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isValue", 1963);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1964);
var t = L.type(o);

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1966);
switch (t) {
        case 'number':
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1968);
return isFinite(o);

        case 'null': // fallthru
        case 'undefined':
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1972);
return false;

        default:
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1975);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1987);
L.now = Date.now || function () {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 9)", 1987);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 1988);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2002);
L.sub = function(s, o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "sub", 2002);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2003);
return s.replace ? s.replace(SUBREGEX, function (match, key) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 10)", 2003);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2004);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2016);
L.trim = STRING_PROTO.trim ? function(s) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 11)", 2016);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2017);
return s && s.trim ? s.trim() : s;
} : function (s) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "}", 2018);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2019);
try {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2020);
return s.replace(TRIMREGEX, '');
    } catch (e) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2022);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2033);
L.trimLeft = STRING_PROTO.trimLeft ? function (s) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 12)", 2033);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2034);
return s.trimLeft();
} : function (s) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "}", 2035);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2036);
return s.replace(/^\s+/, '');
};

/**
 * Returns a string without any trailing whitespace.
 * @method trimRight
 * @static
 * @param s {string} the string to trim.
 * @return {string} the trimmed string.
 */
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2046);
L.trimRight = STRING_PROTO.trimRight ? function (s) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 13)", 2046);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2047);
return s.trimRight();
} : function (s) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "}", 2048);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2049);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2079);
L.type = function(o) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "type", 2079);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2080);
return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
/**
@module yui
@submodule yui-base
*/

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2087);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2120);
function YArray(thing, startIndex, force) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "YArray", 2120);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2121);
var len, result;

    /*jshint expr: true*/
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2124);
startIndex || (startIndex = 0);

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2126);
if (force || YArray.test(thing)) {
        // IE throws when trying to slice HTMLElement collections.
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2128);
try {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2129);
return Native.slice.call(thing, startIndex);
        } catch (ex) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2131);
result = [];

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2133);
for (len = thing.length; startIndex < len; ++startIndex) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2134);
result.push(thing[startIndex]);
            }

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2137);
return result;
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2141);
return [thing];
}

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2144);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2160);
YArray.dedupe = function (array) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "dedupe", 2160);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2161);
var hash    = {},
        results = [],
        i, item, len;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2165);
for (i = 0, len = array.length; i < len; ++i) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2166);
item = array[i];

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2168);
if (!hasOwn.call(hash, item)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2169);
hash[item] = 1;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2170);
results.push(item);
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2174);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2192);
YArray.each = YArray.forEach = Lang._isNative(Native.forEach) ? function (array, fn, thisObj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 14)", 2192);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2193);
Native.forEach.call(array || [], fn, thisObj || Y);
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2194);
return Y;
} : function (array, fn, thisObj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "}", 2195);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2196);
for (var i = 0, len = (array && array.length) || 0; i < len; ++i) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2197);
if (i in array) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2198);
fn.call(thisObj || Y, array[i], i, array);
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2202);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2229);
YArray.hash = function (keys, values) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "hash", 2229);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2230);
var hash = {},
        vlen = (values && values.length) || 0,
        i, len;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2234);
for (i = 0, len = keys.length; i < len; ++i) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2235);
if (i in keys) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2236);
hash[keys[i]] = vlen > i && i in values ? values[i] : true;
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2240);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2257);
YArray.indexOf = Lang._isNative(Native.indexOf) ? function (array, value, from) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 15)", 2257);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2258);
return Native.indexOf.call(array, value, from);
} : function (array, value, from) {
    // http://es5.github.com/#x15.4.4.14
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "}", 2259);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2261);
var len = array.length;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2263);
from = +from || 0;
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2264);
from = (from > 0 || -1) * Math.floor(Math.abs(from));

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2266);
if (from < 0) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2267);
from += len;

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2269);
if (from < 0) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2270);
from = 0;
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2274);
for (; from < len; ++from) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2275);
if (from in array && array[from] === value) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2276);
return from;
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2280);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2302);
YArray.numericSort = function (a, b) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "numericSort", 2302);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2303);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2322);
YArray.some = Lang._isNative(Native.some) ? function (array, fn, thisObj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 16)", 2322);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2323);
return Native.some.call(array, fn, thisObj);
} : function (array, fn, thisObj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "}", 2324);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2325);
for (var i = 0, len = array.length; i < len; ++i) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2326);
if (i in array && fn.call(thisObj, array[i], i, array)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2327);
return true;
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2331);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2352);
YArray.test = function (obj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "test", 2352);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2353);
var result = 0;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2355);
if (Lang.isArray(obj)) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2356);
result = 1;
    } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2357);
if (Lang.isObject(obj)) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2358);
try {
            // indexed, but no tagName (element) or scrollTo/document (window. From DOM.isWindow test which we can't use here),
            // or functions without apply/call (Safari
            // HTMLElementCollection bug).
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2362);
if ('length' in obj && !obj.tagName && !(obj.scrollTo && obj.document) && !obj.apply) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2363);
result = 2;
            }
        } catch (ex) {}
    }}

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2368);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2386);
function Queue() {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "Queue", 2386);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2387);
this._init();
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2388);
this.add.apply(this, arguments);
}

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2391);
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
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "_init", 2398);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2406);
this._q = [];
    },

    /**
     * Get the next item in the queue. FIFO support
     *
     * @method next
     * @return {MIXED} the next item in the queue.
     */
    next: function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "next", 2415);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2416);
return this._q.shift();
    },

    /**
     * Get the last in the queue. LIFO support.
     *
     * @method last
     * @return {MIXED} the last item in the queue.
     */
    last: function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "last", 2425);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2426);
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
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "add", 2436);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2437);
this._q.push.apply(this._q, arguments);

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2439);
return this;
    },

    /**
     * Returns the current number of queued items.
     *
     * @method size
     * @return {Number} The size.
     */
    size: function() {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "size", 2448);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2449);
return this._q.length;
    }
};

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2453);
Y.Queue = Queue;

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2455);
YUI.Env._loaderQueue = YUI.Env._loaderQueue || new Queue();

/**
The YUI module contains the components required for building the YUI seed file.
This includes the script loading mechanism, a simple queue, and the core
utilities for the library.

@module yui
@submodule yui-base
**/

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2466);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2495);
Y.cached = function (source, cache, refetch) {
    /*jshint expr: true*/
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "cached", 2495);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2497);
cache || (cache = {});

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2499);
return function (arg) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 17)", 2499);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2500);
var key = arguments.length > 1 ?
                Array.prototype.join.call(arguments, CACHED_DELIMITER) :
                String(arg);
        
        /*jshint eqeqeq: false*/
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2505);
if (!(key in cache) || (refetch && cache[key] == refetch)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2506);
cache[key] = source.apply(source, arguments);
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2509);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2529);
Y.getLocation = function () {
    // It is safer to look this up every time because yui-base is attached to a
    // YUI instance before a user's config is applied; i.e. `Y.config.win` does
    // not point the correct window object when this file is loaded.
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "getLocation", 2529);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2533);
var win = Y.config.win;

    // It is not safe to hold a reference to the `location` object outside the
    // scope in which it is being used. The WebKit engine used in Safari and
    // MobileSafari will "disconnect" the `location` object from the `window`
    // when a page is restored from back/forward history cache.
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2539);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2554);
Y.merge = function () {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "merge", 2554);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2555);
var i      = 0,
        len    = arguments.length,
        result = {},
        key,
        obj;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2561);
for (; i < len; ++i) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2562);
obj = arguments[i];

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2564);
for (key in obj) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2565);
if (hasOwn.call(obj, key)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2566);
result[key] = obj[key];
            }
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2571);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2608);
Y.mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "mix", 2608);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2609);
var alwaysOverwrite, exists, from, i, key, len, to;

    // If no supplier is given, we return the receiver. If no receiver is given,
    // we return Y. Returning Y doesn't make much sense to me, but it's
    // grandfathered in for backcompat reasons.
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2614);
if (!receiver || !supplier) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2615);
return receiver || Y;
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2618);
if (mode) {
        // In mode 2 (prototype to prototype and object to object), we recurse
        // once to do the proto to proto mix. The object to object mix will be
        // handled later on.
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2622);
if (mode === 2) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2623);
Y.mix(receiver.prototype, supplier.prototype, overwrite,
                    whitelist, 0, merge);
        }

        // Depending on which mode is specified, we may be copying from or to
        // the prototypes of the supplier and receiver.
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2629);
from = mode === 1 || mode === 3 ? supplier.prototype : supplier;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2630);
to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;

        // If either the supplier or receiver doesn't actually have a
        // prototype property, then we could end up with an undefined `from`
        // or `to`. If that happens, we abort and return the receiver.
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2635);
if (!from || !to) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2636);
return receiver;
        }
    } else {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2639);
from = supplier;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2640);
to   = receiver;
    }

    // If `overwrite` is truthy and `merge` is falsy, then we can skip a
    // property existence check on each iteration and save some time.
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2645);
alwaysOverwrite = overwrite && !merge;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2647);
if (whitelist) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2648);
for (i = 0, len = whitelist.length; i < len; ++i) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2649);
key = whitelist[i];

            // We call `Object.prototype.hasOwnProperty` instead of calling
            // `hasOwnProperty` on the object itself, since the object's
            // `hasOwnProperty` method may have been overridden or removed.
            // Also, some native objects don't implement a `hasOwnProperty`
            // method.
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2656);
if (!hasOwn.call(from, key)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2657);
continue;
            }

            // The `key in to` check here is (sadly) intentional for backwards
            // compatibility reasons. It prevents undesired shadowing of
            // prototype members on `to`.
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2663);
exists = alwaysOverwrite ? false : key in to;

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2665);
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
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2675);
Y.mix(to[key], from[key], overwrite, null, 0, merge);
            } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2676);
if (overwrite || !exists) {
                // We're not in merge mode, so we'll only copy the `from` value
                // to the `to` value if we're in overwrite mode or if the
                // current key doesn't exist on the `to` object.
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2680);
to[key] = from[key];
            }}
        }
    } else {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2684);
for (key in from) {
            // The code duplication here is for runtime performance reasons.
            // Combining whitelist and non-whitelist operations into a single
            // loop or breaking the shared logic out into a function both result
            // in worse performance, and Y.mix is critical enough that the byte
            // tradeoff is worth it.
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2690);
if (!hasOwn.call(from, key)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2691);
continue;
            }

            // The `key in to` check here is (sadly) intentional for backwards
            // compatibility reasons. It prevents undesired shadowing of
            // prototype members on `to`.
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2697);
exists = alwaysOverwrite ? false : key in to;

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2699);
if (merge && exists && isObject(to[key], true)
                    && isObject(from[key], true)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2701);
Y.mix(to[key], from[key], overwrite, null, 0, merge);
            } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2702);
if (overwrite || !exists) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2703);
to[key] = from[key];
            }}
        }

        // If this is an IE browser with the JScript enumeration bug, force
        // enumeration of the buggy properties by making a recursive call with
        // the buggy properties as the whitelist.
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2710);
if (Y.Object._hasEnumBug) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2711);
Y.mix(to, from, overwrite, Y.Object._forceEnum, mode, merge);
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2715);
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

_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2731);
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
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 18)", 2747);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2753);
return Object.create(obj);
} : (function () {
    // Reusable constructor function for the Object.create() shim.
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 19)", 2754);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2756);
function F() {}

    // The actual shim.
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2759);
return function (obj) {
        _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 20)", 2759);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2760);
F.prototype = obj;
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2761);
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
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "owns", 2822);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2823);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2835);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2858);
O.keys = Lang._isNative(Object.keys) ? Object.keys : function (obj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "keys", 2858);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2859);
if (!Lang.isObject(obj)) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2860);
throw new TypeError('Object.keys called on a non-object');
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2863);
var keys = [],
        i, key, len;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2866);
if (hasProtoEnumBug && typeof obj === 'function') {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2867);
for (key in obj) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2868);
if (owns(obj, key) && key !== 'prototype') {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2869);
keys.push(key);
            }
        }
    } else {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2873);
for (key in obj) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2874);
if (owns(obj, key)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2875);
keys.push(key);
            }
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2880);
if (hasEnumBug) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2881);
for (i = 0, len = forceEnum.length; i < len; ++i) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2882);
key = forceEnum[i];

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2884);
if (owns(obj, key)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2885);
keys.push(key);
            }
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2890);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2910);
O.values = function (obj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "values", 2910);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2911);
var keys   = O.keys(obj),
        i      = 0,
        len    = keys.length,
        values = [];

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2916);
for (; i < len; ++i) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2917);
values.push(obj[keys[i]]);
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2920);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2931);
O.size = function (obj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "size", 2931);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2932);
try {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2933);
return O.keys(obj).length;
    } catch (ex) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2935);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2949);
O.hasValue = function (obj, value) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "hasValue", 2949);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2950);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2973);
O.each = function (obj, fn, thisObj, proto) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "each", 2973);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2974);
var key;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2976);
for (key in obj) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2977);
if (proto || owns(obj, key)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2978);
fn.call(thisObj || Y, obj[key], key, obj);
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 2982);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3005);
O.some = function (obj, fn, thisObj, proto) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "some", 3005);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3006);
var key;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3008);
for (key in obj) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3009);
if (proto || owns(obj, key)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3010);
if (fn.call(thisObj || Y, obj[key], key, obj)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3011);
return true;
            }
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3016);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3032);
O.getValue = function(o, path) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "getValue", 3032);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3033);
if (!Lang.isObject(o)) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3034);
return UNDEFINED;
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3037);
var i,
        p = Y.Array(path),
        l = p.length;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3041);
for (i = 0; o !== UNDEFINED && i < l; i++) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3042);
o = o[p[i]];
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3045);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3062);
O.setValue = function(o, path, val) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "setValue", 3062);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3063);
var i,
        p = Y.Array(path),
        leafIdx = p.length - 1,
        ref = o;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3068);
if (leafIdx >= 0) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3069);
for (i = 0; ref !== UNDEFINED && i < leafIdx; i++) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3070);
ref = ref[p[i]];
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3073);
if (ref !== UNDEFINED) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3074);
ref[p[i]] = val;
        } else {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3076);
return UNDEFINED;
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3080);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3092);
O.isEmpty = function (obj) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "isEmpty", 3092);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3093);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3128);
YUI.Env.parseUA = function(subUA) {

    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "parseUA", 3128);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3130);
var numberify = function(s) {
            _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "numberify", 3130);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3131);
var c = 0;
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3132);
return parseFloat(s.replace(/\./g, function() {
                _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "(anonymous 22)", 3132);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3133);
return (c++ === 1) ? '' : '.';
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
        nodejs: 0,
        /**
        * Window8/IE10 Application host environment
        * @property winjs
        * @type Boolean
        * @static
        */
        winjs: !!((typeof Windows !== "undefined") && Windows.System),
        /**
        * Are touch/msPointer events available on this device
        * @property touchEnabled
        * @type Boolean
        * @static
        */
        touchEnabled: false
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
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3367);
o.userAgent = ua;


    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3370);
o.secure = href && (href.toLowerCase().indexOf('https') === 0);

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3372);
if (ua) {

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3374);
if ((/windows|win32/i).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3375);
o.os = 'windows';
        } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3376);
if ((/macintosh|mac_powerpc/i).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3377);
o.os = 'macintosh';
        } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3378);
if ((/android/i).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3379);
o.os = 'android';
        } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3380);
if ((/symbos/i).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3381);
o.os = 'symbos';
        } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3382);
if ((/linux/i).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3383);
o.os = 'linux';
        } else {_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3384);
if ((/rhino/i).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3385);
o.os = 'rhino';
        }}}}}}

        // Modern KHTML browsers should qualify as Safari X-Grade
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3389);
if ((/KHTML/).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3390);
o.webkit = 1;
        }
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3392);
if ((/IEMobile|XBLWP7/).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3393);
o.mobile = 'windows';
        }
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3395);
if ((/Fennec/).test(ua)) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3396);
o.mobile = 'gecko';
        }
        // Modern WebKit browsers are at least X-Grade
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3399);
m = ua.match(/AppleWebKit\/([^\s]*)/);
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3400);
if (m && m[1]) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3401);
o.webkit = numberify(m[1]);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3402);
o.safari = o.webkit;

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3404);
if (/PhantomJS/.test(ua)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3405);
m = ua.match(/PhantomJS\/([^\s]*)/);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3406);
if (m && m[1]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3407);
o.phantomjs = numberify(m[1]);
                }
            }

            // Mobile browser check
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3412);
if (/ Mobile\//.test(ua) || (/iPad|iPod|iPhone/).test(ua)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3413);
o.mobile = 'Apple'; // iPhone or iPod Touch

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3415);
m = ua.match(/OS ([^\s]*)/);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3416);
if (m && m[1]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3417);
m = numberify(m[1].replace('_', '.'));
                }
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3419);
o.ios = m;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3420);
o.os = 'ios';
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3421);
o.ipad = o.ipod = o.iphone = 0;

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3423);
m = ua.match(/iPad|iPod|iPhone/);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3424);
if (m && m[0]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3425);
o[m[0].toLowerCase()] = o.ios;
                }
            } else {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3428);
m = ua.match(/NokiaN[^\/]*|webOS\/\d\.\d/);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3429);
if (m) {
                    // Nokia N-series, webOS, ex: NokiaN95
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3431);
o.mobile = m[0];
                }
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3433);
if (/webOS/.test(ua)) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3434);
o.mobile = 'WebOS';
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3435);
m = ua.match(/webOS\/([^\s]*);/);
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3436);
if (m && m[1]) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3437);
o.webos = numberify(m[1]);
                    }
                }
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3440);
if (/ Android/.test(ua)) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3441);
if (/Mobile/.test(ua)) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3442);
o.mobile = 'Android';
                    }
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3444);
m = ua.match(/Android ([^\s]*);/);
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3445);
if (m && m[1]) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3446);
o.android = numberify(m[1]);
                    }

                }
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3450);
if (/Silk/.test(ua)) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3451);
m = ua.match(/Silk\/([^\s]*)\)/);
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3452);
if (m && m[1]) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3453);
o.silk = numberify(m[1]);
                    }
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3455);
if (!o.android) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3456);
o.android = 2.34; //Hack for desktop mode in Kindle
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3457);
o.os = 'Android';
                    }
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3459);
if (/Accelerated=true/.test(ua)) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3460);
o.accel = true;
                    }
                }
            }

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3465);
m = ua.match(/(Chrome|CrMo|CriOS)\/([^\s]*)/);
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3466);
if (m && m[1] && m[2]) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3467);
o.chrome = numberify(m[2]); // Chrome
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3468);
o.safari = 0; //Reset safari back to 0
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3469);
if (m[1] === 'CrMo') {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3470);
o.mobile = 'chrome';
                }
            } else {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3473);
m = ua.match(/AdobeAIR\/([^\s]*)/);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3474);
if (m) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3475);
o.air = m[0]; // Adobe AIR 1.0 or better
                }
            }
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3480);
if (!o.webkit) { // not webkit
// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3482);
if (/Opera/.test(ua)) {
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3483);
m = ua.match(/Opera[\s\/]([^\s]*)/);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3484);
if (m && m[1]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3485);
o.opera = numberify(m[1]);
                }
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3487);
m = ua.match(/Version\/([^\s]*)/);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3488);
if (m && m[1]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3489);
o.opera = numberify(m[1]); // opera 10+
                }

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3492);
if (/Opera Mobi/.test(ua)) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3493);
o.mobile = 'opera';
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3494);
m = ua.replace('Opera Mobi', '').match(/Opera ([^\s]*)/);
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3495);
if (m && m[1]) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3496);
o.opera = numberify(m[1]);
                    }
                }
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3499);
m = ua.match(/Opera Mini[^;]*/);

                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3501);
if (m) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3502);
o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3505);
m = ua.match(/MSIE\s([^;]*)/);
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3506);
if (m && m[1]) {
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3507);
o.ie = numberify(m[1]);
                } else { // not opera, webkit, or ie
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3509);
m = ua.match(/Gecko\/([^\s]*)/);
                    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3510);
if (m) {
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3511);
o.gecko = 1; // Gecko detected, look for revision
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3512);
m = ua.match(/rv:([^\s\)]*)/);
                        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3513);
if (m && m[1]) {
                            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3514);
o.gecko = numberify(m[1]);
                        }
                    }
                }
            }
        }
    }

    //Check for known properties to tell if touch events are enabled on this device or if
    //the number of MSPointer touchpoints on this device is greater than 0.
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3524);
if (win && nav && !(o.chrome && o.chrome < 6)) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3525);
o.touchEnabled = (("ontouchstart" in win) || (("msMaxTouchPoints" in nav) && (nav.msMaxTouchPoints > 0)));
    }

    //It was a parsed UA, do not assign the global value.
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3529);
if (!subUA) {

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3531);
if (typeof process === 'object') {

            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3533);
if (process.versions && process.versions.node) {
                //NodeJS
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3535);
o.os = process.platform;
                _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3536);
o.nodejs = numberify(process.versions.node);
            }
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3540);
YUI.Env.UA = o;

    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3544);
return o;
};


_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3548);
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
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3570);
Y.UA.compareVersions = function (a, b) {
    _yuitest_coverfunc("build/yui-nodejs/yui-nodejs.js", "compareVersions", 3570);
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3571);
var aPart, aParts, bPart, bParts, i, len;

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3573);
if (a === b) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3574);
return 0;
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3577);
aParts = (a + '').split('.');
    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3578);
bParts = (b + '').split('.');

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3580);
for (i = 0, len = Math.max(aParts.length, bParts.length); i < len; ++i) {
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3581);
aPart = parseInt(aParts[i], 10);
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3582);
bPart = parseInt(bParts[i], 10);

        /*jshint expr: true*/
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3585);
isNaN(aPart) && (aPart = 0);
        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3586);
isNaN(bPart) && (bPart = 0);

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3588);
if (aPart < bPart) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3589);
return -1;
        }

        _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3592);
if (aPart > bPart) {
            _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3593);
return 1;
        }
    }

    _yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3597);
return 0;
};
_yuitest_coverline("build/yui-nodejs/yui-nodejs.js", 3599);
YUI.Env.aliases = {
    "anim": ["anim-base","anim-color","anim-curve","anim-easing","anim-node-plugin","anim-scroll","anim-xy"],
    "anim-shape-transform": ["anim-shape"],
    "app": ["app-base","app-content","app-transitions","lazy-model-list","model","model-list","model-sync-rest","router","view","view-node-map"],
    "attribute": ["attribute-base","attribute-complex"],
    "attribute-events": ["attribute-observable"],
    "autocomplete": ["autocomplete-base","autocomplete-sources","autocomplete-list","autocomplete-plugin"],
    "axes": ["axis-numeric","axis-category","axis-time","axis-stacked"],
    "axes-base": ["axis-numeric-base","axis-category-base","axis-time-base","axis-stacked-base"],
    "base": ["base-base","base-pluginhost","base-build"],
    "cache": ["cache-base","cache-offline","cache-plugin"],
    "charts": ["charts-base"],
    "collection": ["array-extras","arraylist","arraylist-add","arraylist-filter","array-invoke"],
    "color": ["color-base","color-hsl","color-harmony"],
    "controller": ["router"],
    "dataschema": ["dataschema-base","dataschema-json","dataschema-xml","dataschema-array","dataschema-text"],
    "datasource": ["datasource-local","datasource-io","datasource-get","datasource-function","datasource-cache","datasource-jsonschema","datasource-xmlschema","datasource-arrayschema","datasource-textschema","datasource-polling"],
    "datatable": ["datatable-core","datatable-table","datatable-head","datatable-body","datatable-base","datatable-column-widths","datatable-message","datatable-mutable","datatable-sort","datatable-datasource"],
    "datatype": ["datatype-date","datatype-number","datatype-xml"],
    "datatype-date": ["datatype-date-parse","datatype-date-format","datatype-date-math"],
    "datatype-number": ["datatype-number-parse","datatype-number-format"],
    "datatype-xml": ["datatype-xml-parse","datatype-xml-format"],
    "dd": ["dd-ddm-base","dd-ddm","dd-ddm-drop","dd-drag","dd-proxy","dd-constrain","dd-drop","dd-scroll","dd-delegate"],
    "dom": ["dom-base","dom-screen","dom-style","selector-native","selector"],
    "editor": ["frame","editor-selection","exec-command","editor-base","editor-para","editor-br","editor-bidi","editor-tab","createlink-base"],
    "event": ["event-base","event-delegate","event-synthetic","event-mousewheel","event-mouseenter","event-key","event-focus","event-resize","event-hover","event-outside","event-touch","event-move","event-flick","event-valuechange","event-tap"],
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
    "template": ["template-base","template-micro"],
    "text": ["text-accentfold","text-wordbreak"],
    "widget": ["widget-base","widget-htmlparser","widget-skin","widget-uievents"]
};


}, '@VERSION@', {
    "use": [
        "yui-base",
        "get",
        "features",
        "intl-base",
        "yui-log",
        "yui-log-nodejs",
        "yui-later",
        "loader-base",
        "loader-rollup",
        "loader-yui3"
    ]
});
