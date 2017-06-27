/**
 * The YUI module contains the components required for building the YUI seed
 * file.  This includes the script loading mechanism, a simple queue, and
 * the core utilities for the library.
 * @module yui
 * @submodule yui-base
 */

if (typeof YUI != 'undefined') {
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

@class YUI
@constructor
@global
@uses EventTarget
@param o* {Object} 0..n optional configuration objects.  these values
are store in Y.config.  See <a href="config.html">Config</a> for the list of supported
properties.
*/
    /*global YUI*/
    /*global YUI_config*/
    var YUI = function() {
        var i = 0,
            Y = this,
            args = arguments,
            l = args.length,
            instanceOf = function(o, type) {
                return (o && o.hasOwnProperty && (o instanceof type));
            },
            gconf = (typeof YUI_config !== 'undefined') && YUI_config;

        if (!(instanceOf(Y, YUI))) {
            Y = new YUI();
        } else {
            // set up the core environment
            Y._init();

            /**
                YUI.GlobalConfig is a master configuration that might span
                multiple contexts in a non-browser environment.  It is applied
                first to all instances in all contexts.
                @property YUI.GlobalConfig
                @type {Object}
                @global
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
            if (YUI.GlobalConfig) {
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
            if (gconf) {
                Y.applyConfig(gconf);
            }

            // bind the specified additional modules for this instance
            if (!l) {
                Y._setup();
            }
        }

        if (l) {
            // Each instance can accept one or more configuration objects.
            // These are applied after YUI.GlobalConfig and YUI_Config,
            // overriding values set in those config files if there is a '
            // matching property.
            for (; i < l; i++) {
                Y.applyConfig(args[i]);
            }

            Y._setup();
        }

        Y.instanceOf = instanceOf;

        return Y;
    };

(function() {

    var proto, prop,
        VERSION = '@VERSION@',
        PERIOD = '.',
        BASE = 'http://yui.yahooapis.com/',
        DOC_LABEL = 'yui3-js-enabled',
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
            if (el && el.addEventListener) {
                el.addEventListener(type, fn, capture);
            } else if (el && el.attachEvent) {
                el.attachEvent('on' + type, fn);
            }
        },
        remove = function(el, type, fn, capture) {
            if (el && el.removeEventListener) {
                // this can throw an uncaught exception in FF
                try {
                    el.removeEventListener(type, fn, capture);
                } catch (ex) {}
            } else if (el && el.detachEvent) {
                el.detachEvent('on' + type, fn);
            }
        },
        handleLoad = function() {
            YUI.Env.windowLoaded = true;
            YUI.Env.DOMReady = true;
            if (hasWin) {
                remove(window, 'load', handleLoad);
            }
        },
        getLoader = function(Y, o) {
            var loader = Y.Env._loader;
            if (loader) {
                //loader._config(Y.config);
                loader.ignoreRegistered = false;
                loader.onEnd = null;
                loader.data = null;
                loader.required = [];
                loader.loadType = null;
            } else {
                loader = new Y.Loader(Y.config);
                Y.Env._loader = loader;
            }

            return loader;
        },

        clobber = function(r, s) {
            for (var i in s) {
                if (s.hasOwnProperty(i)) {
                    r[i] = s[i];
                }
            }
        },

        ALREADY_DONE = { success: true };

//  Stamp the documentElement (HTML) with a class of "yui-loaded" to
//  enable styles that need to key off of JS being enabled.
if (docEl && docClass.indexOf(DOC_LABEL) == -1) {
    if (docClass) {
        docClass += ' ';
    }
    docClass += DOC_LABEL;
    docEl.className = docClass;
}

if (VERSION.indexOf('@') > -1) {
    VERSION = '3.3.0'; // dev time hack for cdn test
}

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

        o = o || NOOP;

        var attr,
            name,
            // detail,
            config = this.config,
            mods = config.modules,
            groups = config.groups,
            rls = config.rls,
            loader = this.Env._loader;

        for (name in o) {
            if (o.hasOwnProperty(name)) {
                attr = o[name];
                if (mods && name == 'modules') {
                    clobber(mods, attr);
                } else if (groups && name == 'groups') {
                    clobber(groups, attr);
                } else if (rls && name == 'rls') {
                    clobber(rls, attr);
                } else if (name == 'win') {
                    config[name] = attr.contentWindow || attr;
                    config.doc = config[name].document;
                } else if (name == '_yuid') {
                    // preserve the guid
                } else {
                    config[name] = attr;
                }
            }
        }

        if (loader) {
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
        this.applyConfig(o);
    },

    /**
     * Initialize this YUI instance
     * @private
     * @method _init
     */
    _init: function() {
        var filter,
            Y = this,
            G_ENV = YUI.Env,
            Env = Y.Env,
            prop;

        /**
         * The version number of the YUI instance.
         * @property version
         * @type string
         */
        Y.version = VERSION;

        if (!Env) {
            Y.Env = {
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
                //    "yui-base" or "yui-rls" or "yui-foobar" that comes after a word break.  That is, it
                //    can't match "foyui" or "i_heart_simpleyui". This can be anywhere in the string.
                // 2. After #1 must come a forward slash followed by the string matched in #1, so
                //    "yui-base/yui-base" or "simpleyui/simpleyui" or "yui-pants/yui-pants".
                // 3. The second occurence of the #1 token can optionally be followed by "-debug" or "-min",
                //    so "yui/yui-min", "yui/yui-debug", "yui-base/yui-base-debug". NOT "yui/yui-tshirt".
                // 4. This is followed by ".js", so "yui/yui.js", "simpleyui/simpleyui-min.js"
                // 0. Going back to the beginning, now. If all that stuff in 1-4 comes after a "?" in the string,
                //    then capture the junk between the LAST "&" and the string in 1-4.  So
                //    "blah?foo/yui/yui.js" will capture "foo/" and "blah?some/thing.js&3.3.0/build/yui-rls/yui-rls.js"
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
                    var match = src.match(pattern),
                        path, filter;

                    if (match) {
                        path = RegExp.leftContext || src.slice(0, src.indexOf(match[0]));

                        // this is to set up the path to the loader.  The file
                        // filter for loader should match the yui include.
                        filter = match[3];

                        // extract correct path for mixed combo urls
                        // http://yuilibrary.com/projects/yui3/ticket/2528423
                        if (match[1]) {
                            path += '?' + match[1];
                        }
                        path = {
                            filter: filter,
                            path: path
                        }
                    }
                    return path;
                },
                getBase: G_ENV && G_ENV.getBase ||
                        function(pattern) {
                            var nodes = (doc && doc.getElementsByTagName('script')) || [],
                                path = Env.cdn, parsed,
                                i, len, src;

                            for (i = 0, len = nodes.length; i < len; ++i) {
                                src = nodes[i].src;
                                if (src) {
                                    parsed = Y.Env.parseBasePath(src, pattern);
                                    if (parsed) {
                                        filter = parsed.filter;
                                        path = parsed.path;
                                        break;
                                    }
                                }
                            }

                            // use CDN default
                            return path;
                        }

            };

            Env = Y.Env;

            Env._loaded[VERSION] = {};

            if (G_ENV && Y !== YUI) {
                Env._yidx = ++G_ENV._yidx;
                Env._guidp = ('yui_' + VERSION + '_' +
                             Env._yidx + '_' + time).replace(/\./g, '_');
            } else if (YUI._YUI) {

                G_ENV = YUI._YUI.Env;
                Env._yidx += G_ENV._yidx;
                Env._uidx += G_ENV._uidx;

                for (prop in G_ENV) {
                    if (!(prop in Env)) {
                        Env[prop] = G_ENV[prop];
                    }
                }

                delete YUI._YUI;
            }

            Y.id = Y.stamp(Y);
            instances[Y.id] = Y;

        }

        Y.constructor = YUI;

        // configuration defaults
        Y.config = Y.config || {
            win: win,
            doc: doc,
            debug: true,
            useBrowserConsole: true,
            throwFail: true,
            bootstrap: true,
            cacheUse: true,
            fetchCSS: true,
            use_rls: false,
            rls_timeout: 2000
        };

        if (YUI.Env.rls_disabled) {
            Y.config.use_rls = false;
        }

        Y.config.lang = Y.config.lang || 'en-US';

        Y.config.base = YUI.config.base || Y.Env.getBase(Y.Env._BASE_RE);
        
        if (!filter || (!('mindebug').indexOf(filter))) {
            filter = 'min';
        }
        filter = (filter) ? '-' + filter : filter;
        Y.config.loaderPath = YUI.config.loaderPath || 'loader/loader' + filter + '.js';

    },

    /**
     * Finishes the instance setup. Attaches whatever modules were defined
     * when the yui modules was registered.
     * @method _setup
     * @private
     */
    _setup: function(o) {
        var i, Y = this,
            core = [],
            mods = YUI.Env.mods,
            extras = Y.config.core || ['get','features','intl-base','yui-log','yui-later','loader-base', 'loader-rollup', 'loader-yui3'];

        for (i = 0; i < extras.length; i++) {
            if (mods[extras[i]]) {
                core.push(extras[i]);
            }
        }

        Y._attach(['yui-base']);
        Y._attach(core);

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
        if (!(method in APPLY_TO_AUTH)) {
            this.log(method + ': applyTo not allowed', 'warn', 'yui');
            return null;
        }

        var instance = instances[id], nest, m, i;
        if (instance) {
            nest = method.split('.');
            m = instance;
            for (i = 0; i < nest.length; i = i + 1) {
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
        details = details || {};
        var env = YUI.Env,
            mod = {
                name: name,
                fn: fn,
                version: version,
                details: details
            },
            loader,
            i, versions = env.versions;

        env.mods[name] = mod;
        versions[version] = versions[version] || {};
        versions[version][name] = mod;

        for (i in instances) {
            if (instances.hasOwnProperty(i)) {
                loader = instances[i].Env._loader;
                if (loader) {
                    if (!loader.moduleInfo[name]) {
                        loader.addModule(details, name);
                    }
                }
            }
        }

        return this;
    },

    /**
     * Executes the function associated with each required
     * module, binding the module to the YUI instance.
     * @method _attach
     * @private
     */
    _attach: function(r, moot) {
        var i, name, mod, details, req, use, after,
            mods = YUI.Env.mods,
            aliases = YUI.Env.aliases,
            Y = this, j,
            done = Y.Env._attached,
            len = r.length, loader;

        //console.info('attaching: ' + r, 'info', 'yui');

        for (i = 0; i < len; i++) {
            if (!done[r[i]]) {
                name = r[i];
                mod = mods[name];
                if (aliases && aliases[name]) {
                    Y._attach(aliases[name]);
                    continue;
                }
                if (!mod) {
                    loader = Y.Env._loader;
                    if (loader && loader.moduleInfo[name]) {
                        mod = loader.moduleInfo[name];
                        if (mod.use) {
                            moot = true;
                        }
                    }


                    //if (!loader || !loader.moduleInfo[name]) {
                    //if ((!loader || !loader.moduleInfo[name]) && !moot) {
                    if (!moot) {
                        if (name.indexOf('skin-') === -1) {
                            Y.Env._missed.push(name);
                            Y.message('NOT loaded: ' + name, 'warn', 'yui');
                        }
                    }
                } else {
                    done[name] = true;
                    //Don't like this, but in case a mod was asked for once, then we fetch it
                    //We need to remove it from the missed list
                    for (j = 0; j < Y.Env._missed.length; j++) {
                        if (Y.Env._missed[j] === name) {
                            Y.message('Found: ' + name + ' (was reported as missing earlier)', 'warn', 'yui');
                            Y.Env._missed.splice(j, 1);
                        }
                    }
                    details = mod.details;
                    req = details.requires;
                    use = details.use;
                    after = details.after;

                    if (req) {
                        for (j = 0; j < req.length; j++) {
                            if (!done[req[j]]) {
                                if (!Y._attach(req)) {
                                    return false;
                                }
                                break;
                            }
                        }
                    }

                    if (after) {
                        for (j = 0; j < after.length; j++) {
                            if (!done[after[j]]) {
                                if (!Y._attach(after, true)) {
                                    return false;
                                }
                                break;
                            }
                        }
                    }

                    if (mod.fn) {
                        try {
                            mod.fn(Y, name);
                        } catch (e) {
                            Y.error('Attach error: ' + name, e, name);
                            return false;
                        }
                    }

                    if (use) {
                        for (j = 0; j < use.length; j++) {
                            if (!done[use[j]]) {
                                if (!Y._attach(use)) {
                                    return false;
                                }
                                break;
                            }
                        }
                    }



                }
            }
        }

        return true;
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
     * @param modules* {String} 1-n modules to bind (uses arguments array).
     * @param *callback {Function} callback function executed when
     * the instance has the required functionality.  If included, it
     * must be the last parameter.
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
        var args = SLICE.call(arguments, 0),
            callback = args[args.length - 1],
            Y = this,
            i = 0,
            name,
            Env = Y.Env,
            provisioned = true;

        // The last argument supplied to use can be a load complete callback
        if (Y.Lang.isFunction(callback)) {
            args.pop();
        } else {
            callback = null;
        }
        if (Y.Lang.isArray(args[0])) {
            args = args[0];
        }

        if (Y.config.cacheUse) {
            while ((name = args[i++])) {
                if (!Env._attached[name]) {
                    provisioned = false;
                    break;
                }
            }

            if (provisioned) {
                if (args.length) {
                }
                Y._notify(callback, ALREADY_DONE, args);
                return Y;
            }
        }

        if (Y.config.cacheUse) {
            while ((name = args[i++])) {
                if (!Env._attached[name]) {
                    provisioned = false;
                    break;
                }
            }

            if (provisioned) {
                if (args.length) {
                }
                Y._notify(callback, ALREADY_DONE, args);
                return Y;
            }
        }

        if (Y._loading) {
            Y._useQueue = Y._useQueue || new Y.Queue();
            Y._useQueue.add([args, callback]);
        } else {
            Y._use(args, function(Y, response) {
                Y._notify(callback, response, args);
            });
        }

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
        if (!response.success && this.config.loadErrorFn) {
            this.config.loadErrorFn.call(this, this, callback, response, args);
        } else if (callback) {
            try {
                callback(this, response);
            } catch (e) {
                this.error('use callback error', e, args);
            }
        }
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

        if (!this.Array) {
            this._attach(['yui-base']);
        }

        var len, loader, handleBoot, handleRLS,
            Y = this,
            G_ENV = YUI.Env,
            mods = G_ENV.mods,
            Env = Y.Env,
            used = Env._used,
            queue = G_ENV._loaderQueue,
            firstArg = args[0],
            YArray = Y.Array,
            config = Y.config,
            boot = config.bootstrap,
            missing = [],
            r = [],
            ret = true,
            fetchCSS = config.fetchCSS,
            process = function(names, skip) {

                if (!names.length) {
                    return;
                }

                YArray.each(names, function(name) {

                    // add this module to full list of things to attach
                    if (!skip) {
                        r.push(name);
                    }

                    // only attach a module once
                    if (used[name]) {
                        return;
                    }

                    var m = mods[name], req, use;

                    if (m) {
                        used[name] = true;
                        req = m.details.requires;
                        use = m.details.use;
                    } else {
                        // CSS files don't register themselves, see if it has
                        // been loaded
                        if (!G_ENV._loaded[VERSION][name]) {
                            missing.push(name);
                        } else {
                            used[name] = true; // probably css
                        }
                    }

                    // make sure requirements are attached
                    if (req && req.length) {
                        process(req);
                    }

                    // make sure we grab the submodule dependencies too
                    if (use && use.length) {
                        process(use, 1);
                    }
                });
            },

            handleLoader = function(fromLoader) {
                var response = fromLoader || {
                        success: true,
                        msg: 'not dynamic'
                    },
                    redo, origMissing,
                    ret = true,
                    data = response.data;


                Y._loading = false;

                if (data) {
                    origMissing = missing;
                    missing = [];
                    r = [];
                    process(data);
                    redo = missing.length;
                    if (redo) {
                        if (missing.sort().join() ==
                                origMissing.sort().join()) {
                            redo = false;
                        }
                    }
                }

                if (redo && data) {
                    Y._loading = false;
                    Y._use(args, function() {
                        if (Y._attach(data)) {
                            Y._notify(callback, response, data);
                        }
                    });
                } else {
                    if (data) {
                        ret = Y._attach(data);
                    }
                    if (ret) {
                        Y._notify(callback, response, args);
                    }
                }

                if (Y._useQueue && Y._useQueue.size() && !Y._loading) {
                    Y._use.apply(Y, Y._useQueue.next());
                }

            };


        // YUI().use('*'); // bind everything available
        if (firstArg === '*') {
            ret = Y._attach(Y.Object.keys(mods));
            if (ret) {
                handleLoader();
            }
            return Y;
        }


        // use loader to expand dependencies and sort the
        // requirements if it is available.
        if (boot && Y.Loader && args.length) {
            loader = getLoader(Y);
            loader.require(args);
            loader.ignoreRegistered = true;
            loader.calculate(null, (fetchCSS) ? null : 'js');
            args = loader.sorted;
        }

        // process each requirement and any additional requirements
        // the module metadata specifies
        process(args);

        len = missing.length;

        if (len) {
            missing = Y.Object.keys(YArray.hash(missing));
            len = missing.length;
        }

        // dynamic load
        if (boot && len && Y.Loader) {
            Y._loading = true;
            loader = getLoader(Y);
            loader.onEnd = handleLoader;
            loader.context = Y;
            loader.data = args;
            loader.ignoreRegistered = false;
            loader.require(args);
            loader.insert(null, (fetchCSS) ? null : 'js');
            // loader.partial(missing, (fetchCSS) ? null : 'js');

        } else if (len && Y.config.use_rls && !YUI.Env.rls_enabled) {

            G_ENV._rls_queue = G_ENV._rls_queue || new Y.Queue();

            // server side loader service
            handleRLS = function(instance, argz) {

                var rls_end = function(o) {
                    handleLoader(o);
                    instance.rls_advance();
                },
                rls_url = instance._rls(argz);

                if (rls_url) {
                    instance.rls_oncomplete(function(o) {
                        rls_end(o);
                    });
                    instance.Get.script(rls_url, {
                        data: argz,
                        timeout: instance.config.rls_timeout,
                        onFailure: instance.rls_handleFailure,
                        onTimeout: instance.rls_handleTimeout
                    });
                } else {
                    rls_end({
                        success: true,
                        data: argz
                    });
                }
            };

            G_ENV._rls_queue.add(function() {
                G_ENV._rls_in_progress = true;
                Y.rls_callback = callback;
                Y.rls_locals(Y, args, handleRLS);
            });

            if (!G_ENV._rls_in_progress && G_ENV._rls_queue.size()) {
                G_ENV._rls_queue.next()();
            }

        } else if (boot && len && Y.Get && !Env.bootstrapped) {

            Y._loading = true;

            handleBoot = function() {
                Y._loading = false;
                queue.running = false;
                Env.bootstrapped = true;
                G_ENV._bootstrapping = false;
                if (Y._attach(['loader'])) {
                    Y._use(args, callback);
                }
            };

            if (G_ENV._bootstrapping) {
                queue.add(handleBoot);
            } else {
                G_ENV._bootstrapping = true;
                Y.Get.script(config.base + config.loaderPath, {
                    onEnd: handleBoot
                });
            }

        } else {
            ret = Y._attach(args);
            if (ret) {
                handleLoader();
            }
        }

        return Y;
    },


    /**
    Adds a namespace object onto the YUI global if called statically:

        // creates YUI.your.namespace.here as nested objects
        YUI.namespace("your.namespace.here");

    If called as an instance method on the YUI instance, it creates the
    namespace on the instance:

         // creates Y.property.package
         Y.namespace("property.package");
    
    Dots in the input string cause `namespace` to create nested objects for
    each token. If any part of the requested namespace already exists, the
    current object will be left in place.  This allows multiple calls to
    `namespace` to preserve existing namespaced properties.
    
    If the first token in the namespace string is "YAHOO", the token is
    discarded.

    Be careful when naming packages. Reserved words may work in some browsers
    and not others. For instance, the following will fail in some browsers:
    
         Y.namespace("really.long.nested.namespace");
    
    This fails because `long` is a future reserved word in ECMAScript
    
    @method namespace
    @param  {String[]} namespace* 1-n namespaces to create.
    @return {Object}  A reference to the last namespace object created.
    **/
    namespace: function() {
        var a = arguments, o = this, i = 0, j, d, arg;
        for (; i < a.length; i++) {
            // d = ('' + a[i]).split('.');
            arg = a[i];
            if (arg.indexOf(PERIOD)) {
                d = arg.split(PERIOD);
                for (j = (d[0] == 'YAHOO') ? 1 : 0; j < d.length; j++) {
                    o[d[j]] = o[d[j]] || {};
                    o = o[d[j]];
                }
            } else {
                o[arg] = o[arg] || {};
            }
        }
        return o;
    },

    // this is replaced if the log module is included
    log: NOOP,
    message: NOOP,
    // this is replaced if the dump module is included
    dump: function (o) { return ''+o; },

    /**
     * Report an error.  The reporting mechanism is controled by
     * the `throwFail` configuration attribute.  If throwFail is
     * not specified, the message is written to the Logger, otherwise
     * a JS error is thrown
     * @method error
     * @param msg {String} the error message.
     * @param e {Error|String} Optional JS error that was caught, or an error string.
     * @param data Optional additional info
     * and `throwFail` is specified, this error will be re-thrown.
     * @return {YUI} this YUI instance.
     */
    error: function(msg, e, data) {

        var Y = this, ret;

        if (Y.config.errorFn) {
            ret = Y.config.errorFn.apply(Y, arguments);
        }

        if (Y.config.throwFail && !ret) {
            throw (e || new Error(msg));
        } else {
            Y.message(msg, 'error'); // don't scrub this one
        }

        return Y;
    },

    /**
     * Generate an id that is unique among all YUI instances
     * @method guid
     * @param pre {String} optional guid prefix.
     * @return {String} the guid.
     */
    guid: function(pre) {
        var id = this.Env._guidp + '_' + (++this.Env._uidx);
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
        var uid;
        if (!o) {
            return o;
        }

        // IE generates its own unique ID for dom nodes
        // The uniqueID property of a document node returns a new ID
        if (o.uniqueID && o.nodeType && o.nodeType !== 9) {
            uid = o.uniqueID;
        } else {
            uid = (typeof o === 'string') ? o : o._yuid;
        }

        if (!uid) {
            uid = this.guid();
            if (!readOnly) {
                try {
                    o._yuid = uid;
                } catch (e) {
                    uid = null;
                }
            }
        }
        return uid;
    },

    /**
     * Destroys the YUI instance
     * @method destroy
     * @since 3.3.0
     */
    destroy: function() {
        var Y = this;
        if (Y.Event) {
            Y.Event._unload();
        }
        delete instances[Y.id];
        delete Y.Env;
        delete Y.config;
    }

    /**
     * instanceof check for objects that works around
     * memory leak in IE when the item tested is
     * window/document
     * @method instanceOf
     * @since 3.3.0
     */
};



    YUI.prototype = proto;

    // inheritance utilities are not available yet
    for (prop in proto) {
        if (proto.hasOwnProperty(prop)) {
            YUI[prop] = proto[prop];
        }
    }

    // set up the environment
    YUI._init();

    if (hasWin) {
        // add a window load event at load time so we can capture
        // the case where it fires before dynamic loading is
        // complete.
        add(window, 'load', handleLoad);
    } else {
        handleLoad();
    }

    YUI.Env.add = add;
    YUI.Env.remove = remove;

    /*global exports*/
    // Support the CommonJS method for exporting our single global
    if (typeof exports == 'object') {
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
 * A list of modules that defines the YUI core (overrides the default).
 *
 * @property core
 * @type string[]
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
 *              fullpath: 'http://myserver.mydomain.com/mymod1/mymod1.js'
 *          },
 *          mymod2: {
 *              requires: ['mymod1'],
 *              fullpath: 'http://myserver.mydomain.com/mymod2/mymod2.js'
 *          }
 *      }
 *
 * @property modules
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
 * @default 2.8.1
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
 * @default 1
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
 * is executed in the YUI instance context.
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
 * The parameter defaults for the remote loader service. **Requires the rls seed file.** The properties that are supported:
 * 
 *  * `m`: comma separated list of module requirements.  This
 *    must be the param name even for custom implemetations.
 *  * `v`: the version of YUI to load.  Defaults to the version
 *    of YUI that is being used.
 *  * `gv`: the version of the gallery to load (see the gallery config)
 *  * `env`: comma separated list of modules already on the page.
 *      this must be the param name even for custom implemetations.
 *  * `lang`: the languages supported on the page (see the lang config)
 *  * `'2in3v'`:  the version of the 2in3 wrapper to use (see the 2in3 config).
 *  * `'2v'`: the version of yui2 to use in the yui 2in3 wrappers
 *  * `filt`: a filter def to apply to the urls (see the filter config).
 *  * `filts`: a list of custom filters to apply per module
 *  * `tests`: this is a map of conditional module test function id keys
 * with the values of 1 if the test passes, 0 if not.  This must be
 * the name of the querystring param in custom templates.
 *
 * @since 3.2.0
 * @property rls
 * @type {Object}
 */

/**
 * The base path to the remote loader service. **Requires the rls seed file.**
 *
 * @since 3.2.0
 * @property rls_base
 * @type {String}
 */

/**
 * The template to use for building the querystring portion
 * of the remote loader service url.  The default is determined
 * by the rls config -- each property that has a value will be
 * represented. **Requires the rls seed file.**
 * 
 * @since 3.2.0
 * @property rls_tmpl
 * @type {String}
 * @example
 *      m={m}&v={v}&env={env}&lang={lang}&filt={filt}&tests={tests}
 *
 */

/**
 * Configure the instance to use a remote loader service instead of
 * the client loader. **Requires the rls seed file.**
 *
 * @since 3.2.0
 * @property use_rls
 * @type {Boolean}
 */
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

SUBREGEX  = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,
TRIMREGEX = /^\s+|\s+$/g,

// If either MooTools or Prototype is on the page, then there's a chance that we
// can't trust "native" language features to actually be native. When this is
// the case, we take the safe route and fall back to our own non-native
// implementation.
win           = Y.config.win,
unsafeNatives = win && !!(win.MooTools || win.Prototype);

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
L.isArray = (!unsafeNatives && Array.isArray) || function (o) {
    return L.type(o) === 'array';
};

/**
 * Determines whether or not the provided item is a boolean.
 * @method isBoolean
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a boolean.
 */
L.isBoolean = function(o) {
    return typeof o === 'boolean';
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
L.isFunction = function(o) {
    return L.type(o) === 'function';
};

/**
 * Determines whether or not the supplied item is a date instance.
 * @method isDate
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a date.
 */
L.isDate = function(o) {
    return L.type(o) === 'date' && o.toString() !== 'Invalid Date' && !isNaN(o);
};

/**
 * Determines whether or not the provided item is null.
 * @method isNull
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is null.
 */
L.isNull = function(o) {
    return o === null;
};

/**
 * Determines whether or not the provided item is a legal number.
 * @method isNumber
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is a number.
 */
L.isNumber = function(o) {
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
L.isObject = function(o, failfn) {
    var t = typeof o;
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
L.isString = function(o) {
    return typeof o === 'string';
};

/**
 * Determines whether or not the provided item is undefined.
 * @method isUndefined
 * @static
 * @param o The object to test.
 * @return {boolean} true if o is undefined.
 */
L.isUndefined = function(o) {
    return typeof o === 'undefined';
};

/**
 * Returns a string without any leading or trailing whitespace.  If
 * the input is not a string, the input will be returned untouched.
 * @method trim
 * @static
 * @param s {string} the string to trim.
 * @return {string} the trimmed string.
 */
L.trim = STRING_PROTO.trim ? function(s) {
    return s && s.trim ? s.trim() : s;
} : function (s) {
    try {
        return s.replace(TRIMREGEX, '');
    } catch (e) {
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
L.trimLeft = STRING_PROTO.trimLeft ? function (s) {
    return s.trimLeft();
} : function (s) {
    return s.replace(/^\s+/, '');
};

/**
 * Returns a string without any trailing whitespace.
 * @method trimRight
 * @static
 * @param s {string} the string to trim.
 * @return {string} the trimmed string.
 */
L.trimRight = STRING_PROTO.trimRight ? function (s) {
    return s.trimRight();
} : function (s) {
    return s.replace(/\s+$/, '');
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
L.isValue = function(o) {
    var t = L.type(o);

    switch (t) {
        case 'number':
            return isFinite(o);

        case 'null': // fallthru
        case 'undefined':
            return false;

        default:
            return !!t;
    }
};

/**
 * <p>
 * Returns a string representing the type of the item passed in.
 * </p>
 *
 * <p>
 * Known issues:
 * </p>
 *
 * <ul>
 *   <li>
 *     <code>typeof HTMLElementCollection</code> returns function in Safari, but
 *     <code>Y.type()</code> reports object, which could be a good thing --
 *     but it actually caused the logic in <code>Y.Lang.isObject</code> to fail.
 *   </li>
 * </ul>
 *
 * @method type
 * @param o the item to test.
 * @return {string} the detected type.
 * @static
 */
L.type = function(o) {
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
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
L.sub = function(s, o) {
    return s.replace ? s.replace(SUBREGEX, function (match, key) {
        return L.isUndefined(o[key]) ? match : o[key];
    }) : s;
};

/**
 * Returns the current time in milliseconds.
 *
 * @method now
 * @return {Number} Current time in milliseconds.
 * @static
 * @since 3.3.0
 */
L.now = Date.now || function () {
    return new Date().getTime();
};
/**
 * The YUI module contains the components required for building the YUI seed
 * file. This includes the script loading mechanism, a simple queue, and the
 * core utilities for the library.
 *
 * @module yui
 * @submodule yui-base
 */

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
function YArray(thing, startIndex, force) {
    var len, result;

    startIndex || (startIndex = 0);

    if (force || YArray.test(thing)) {
        // IE throws when trying to slice HTMLElement collections.
        try {
            return Native.slice.call(thing, startIndex);
        } catch (ex) {
            result = [];

            for (len = thing.length; startIndex < len; ++startIndex) {
                result.push(thing[startIndex]);
            }

            return result;
        }
    }

    return [thing];
}

Y.Array = YArray;

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
YArray.test = function (obj) {
    var result = 0;

    if (Lang.isArray(obj)) {
        result = 1;
    } else if (Lang.isObject(obj)) {
        try {
            // indexed, but no tagName (element) or alert (window),
            // or functions without apply/call (Safari
            // HTMLElementCollection bug).
            if ('length' in obj && !obj.tagName && !obj.alert && !obj.apply) {
                result = 2;
            }
        } catch (ex) {}
    }

    return result;
};

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
YArray.dedupe = function (array) {
    var hash    = {},
        results = [],
        i, item, len;

    for (i = 0, len = array.length; i < len; ++i) {
        item = array[i];

        if (!hasOwn.call(hash, item)) {
            hash[item] = 1;
            results.push(item);
        }
    }

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
YArray.each = YArray.forEach = Native.forEach ? function (array, fn, thisObj) {
    Native.forEach.call(array || [], fn, thisObj || Y);
    return Y;
} : function (array, fn, thisObj) {
    for (var i = 0, len = (array && array.length) || 0; i < len; ++i) {
        if (i in array) {
            fn.call(thisObj || Y, array[i], i, array);
        }
    }

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
YArray.hash = function (keys, values) {
    var hash = {},
        vlen = (values && values.length) || 0,
        i, len;

    for (i = 0, len = keys.length; i < len; ++i) {
        if (i in keys) {
            hash[keys[i]] = vlen > i && i in values ? values[i] : true;
        }
    }

    return hash;
};

/**
Returns the index of the first item in the array that's equal (using a strict
equality check) to the specified _value_, or `-1` if the value isn't found.

This method wraps the native ES5 `Array.indexOf()` method if available.

@method indexOf
@param {Array} array Array to search.
@param {Any} value Value to search for.
@return {Number} Index of the item strictly equal to _value_, or `-1` if not
  found.
@static
**/
YArray.indexOf = Native.indexOf ? function (array, value) {
    // TODO: support fromIndex
    return Native.indexOf.call(array, value);
} : function (array, value) {
    for (var i = 0, len = array.length; i < len; ++i) {
        if (array[i] === value) {
            return i;
        }
    }

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
YArray.numericSort = function (a, b) {
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
YArray.some = Native.some ? function (array, fn, thisObj) {
    return Native.some.call(array, fn, thisObj);
} : function (array, fn, thisObj) {
    for (var i = 0, len = array.length; i < len; ++i) {
        if (i in array && fn.call(thisObj, array[i], i, array)) {
            return true;
        }
    }

    return false;
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
    _init: function() {
        /**
         * The collection of enqueued items
         *
         * @property _q
         * @type Array
         * @protected
         */
        this._q = [];
    },

    /**
     * Get the next item in the queue. FIFO support
     *
     * @method next
     * @return {MIXED} the next item in the queue.
     */
    next: function() {
        return this._q.shift();
    },

    /**
     * Get the last in the queue. LIFO support.
     *
     * @method last
     * @return {MIXED} the last item in the queue.
     */
    last: function() {
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
        this._q.push.apply(this._q, arguments);

        return this;
    },

    /**
     * Returns the current number of queued items.
     *
     * @method size
     * @return {Number} The size.
     */
    size: function() {
        return this._q.length;
    }
};

Y.Queue = Queue;

YUI.Env._loaderQueue = YUI.Env._loaderQueue || new Queue();

/**
The YUI module contains the components required for building the YUI seed file.
This includes the script loading mechanism, a simple queue, and the core
utilities for the library.

@module yui
@submodule yui-base
**/

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
Y.cached = function (source, cache, refetch) {
    cache || (cache = {});

    return function (arg) {
        var key = arguments.length > 1 ?
                Array.prototype.join.call(arguments, CACHED_DELIMITER) :
                arg.toString();

        if (!(key in cache) || (refetch && cache[key] == refetch)) {
            cache[key] = source.apply(source, arguments);
        }

        return cache[key];
    };
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
Y.merge = function () {
    var args   = arguments,
        i      = 0,
        len    = args.length,
        result = {};

    for (; i < len; ++i) {
        Y.mix(result, args[i], true);
    }

    return result;
};

/**
Mixes _supplier_'s properties into _receiver_. Properties will not be
overwritten or merged unless the _overwrite_ or _merge_ parameters are `true`,
respectively.

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
@param {Int} [mode=0] Mix mode to use. See above for available modes.
@param {Boolean} [merge=false] If `true`, objects and arrays that already
  exist on the receiver will have the corresponding object/array from the
  supplier merged into them, rather than being skipped or overwritten. When
  both _overwrite_ and _merge_ are `true`, _merge_ takes precedence.
@return {Function|Object|YUI} The receiver, or the YUI instance if the
  specified receiver is falsy.
**/
Y.mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {
    var alwaysOverwrite, exists, from, i, key, len, to;

    // If no supplier is given, we return the receiver. If no receiver is given,
    // we return Y. Returning Y doesn't make much sense to me, but it's
    // grandfathered in for backcompat reasons.
    if (!receiver || !supplier) {
        return receiver || Y;
    }

    if (mode) {
        // In mode 2 (prototype to prototype and object to object), we recurse
        // once to do the proto to proto mix. The object to object mix will be
        // handled later on.
        if (mode === 2) {
            Y.mix(receiver.prototype, supplier.prototype, overwrite,
                    whitelist, 0, merge);
        }

        // Depending on which mode is specified, we may be copying from or to
        // the prototypes of the supplier and receiver.
        from = mode === 1 || mode === 3 ? supplier.prototype : supplier;
        to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;

        // If either the supplier or receiver doesn't actually have a
        // prototype property, then we could end up with an undefined `from`
        // or `to`. If that happens, we abort and return the receiver.
        if (!from || !to) {
            return receiver;
        }
    } else {
        from = supplier;
        to   = receiver;
    }

    // If `overwrite` is truthy and `merge` is falsy, then we can skip a call
    // to `hasOwnProperty` on each iteration and save some time.
    alwaysOverwrite = overwrite && !merge;

    if (whitelist) {
        for (i = 0, len = whitelist.length; i < len; ++i) {
            key = whitelist[i];

            // We call `Object.prototype.hasOwnProperty` instead of calling
            // `hasOwnProperty` on the object itself, since the object's
            // `hasOwnProperty` method may have been overridden or removed.
            // Also, some native objects don't implement a `hasOwnProperty`
            // method.
            if (!hasOwn.call(from, key)) {
                continue;
            }

            exists = alwaysOverwrite ? false : hasOwn.call(to, key);

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
                Y.mix(to[key], from[key], overwrite, null, 0, merge);
            } else if (overwrite || !exists) {
                // We're not in merge mode, so we'll only copy the `from` value
                // to the `to` value if we're in overwrite mode or if the
                // current key doesn't exist on the `to` object.
                to[key] = from[key];
            }
        }
    } else {
        for (key in from) {
            // The code duplication here is for runtime performance reasons.
            // Combining whitelist and non-whitelist operations into a single
            // loop or breaking the shared logic out into a function both result
            // in worse performance, and Y.mix is critical enough that the byte
            // tradeoff is worth it.
            if (!hasOwn.call(from, key)) {
                continue;
            }

            exists = alwaysOverwrite ? false : hasOwn.call(to, key);

            if (merge && exists && isObject(to[key], true)
                    && isObject(from[key], true)) {
                Y.mix(to[key], from[key], overwrite, null, 0, merge);
            } else if (overwrite || !exists) {
                to[key] = from[key];
            }
        }

        // If this is an IE browser with the JScript enumeration bug, force
        // enumeration of the buggy properties by making a recursive call with
        // the buggy properties as the whitelist.
        if (Y.Object._hasEnumBug) {
            Y.mix(to, from, overwrite, Y.Object._forceEnum, mode, merge);
        }
    }

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

var hasOwn = Object.prototype.hasOwnProperty,

// If either MooTools or Prototype is on the page, then there's a chance that we
// can't trust "native" language features to actually be native. When this is
// the case, we take the safe route and fall back to our own non-native
// implementations.
win           = Y.config.win,
unsafeNatives = win && !!(win.MooTools || win.Prototype),

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
O = Y.Object = (!unsafeNatives && Object.create) ? function (obj) {
    // We currently wrap the native Object.create instead of simply aliasing it
    // to ensure consistency with our fallback shim, which currently doesn't
    // support Object.create()'s second argument (properties). Once we have a
    // safe fallback for the properties arg, we can stop wrapping
    // Object.create().
    return Object.create(obj);
} : (function () {
    // Reusable constructor function for the Object.create() shim.
    function F() {}

    // The actual shim.
    return function (obj) {
        F.prototype = obj;
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
 * @type {Boolean}
 * @protected
 * @static
 */
hasEnumBug = O._hasEnumBug = !{valueOf: 0}.propertyIsEnumerable('valueOf'),

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
O.keys = (!unsafeNatives && Object.keys) || function (obj) {
    if (!Y.Lang.isObject(obj)) {
        throw new TypeError('Object.keys called on a non-object');
    }

    var keys = [],
        i, key, len;

    for (key in obj) {
        if (owns(obj, key)) {
            keys.push(key);
        }
    }

    if (hasEnumBug) {
        for (i = 0, len = forceEnum.length; i < len; ++i) {
            key = forceEnum[i];

            if (owns(obj, key)) {
                keys.push(key);
            }
        }
    }

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
O.values = function (obj) {
    var keys   = O.keys(obj),
        i      = 0,
        len    = keys.length,
        values = [];

    for (; i < len; ++i) {
        values.push(obj[keys[i]]);
    }

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
O.size = function (obj) {
    return O.keys(obj).length;
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
O.hasValue = function (obj, value) {
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
O.each = function (obj, fn, thisObj, proto) {
    var key;

    for (key in obj) {
        if (proto || owns(obj, key)) {
            fn.call(thisObj || Y, obj[key], key, obj);
        }
    }

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
O.some = function (obj, fn, thisObj, proto) {
    var key;

    for (key in obj) {
        if (proto || owns(obj, key)) {
            if (fn.call(thisObj || Y, obj[key], key, obj)) {
                return true;
            }
        }
    }

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
O.getValue = function(o, path) {
    if (!Y.Lang.isObject(o)) {
        return UNDEFINED;
    }

    var i,
        p = Y.Array(path),
        l = p.length;

    for (i = 0; o !== UNDEFINED && i < l; i++) {
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
 * @static
 * @param o             The object on which to set the sub value.
 * @param path {Array}  A path array, specifying the object traversal path
 *                      at which to set the sub value.
 * @param val {Any}     The new value for the sub-attribute.
 * @return {Object}     The modified object, with the new sub value set, or
 *                      undefined, if the path was invalid.
 */
O.setValue = function(o, path, val) {
    var i,
        p = Y.Array(path),
        leafIdx = p.length - 1,
        ref = o;

    if (leafIdx >= 0) {
        for (i = 0; ref !== UNDEFINED && i < leafIdx; i++) {
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

/**
 * Returns `true` if the object has no enumerable properties of its own.
 *
 * @method isEmpty
 * @param {Object} obj An object.
 * @return {Boolean} `true` if the object is empty.
 * @static
 * @since 3.2.0
 */
O.isEmpty = function (obj) {
    return !O.keys(obj).length;
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
* Static method for parsing the UA string. Defaults to assigning it's value to Y.UA
* @static
* @method Env.parseUA
* @param {String} subUA Parse this UA string instead of navigator.userAgent
* @returns {Object} The Y.UA object
*/
YUI.Env.parseUA = function(subUA) {

    var numberify = function(s) {
            var c = 0;
            return parseFloat(s.replace(/\./g, function() {
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
         * @type float
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
        os: null

    },

    ua = subUA || nav && nav.userAgent,

    loc = win && win.location,

    href = loc && loc.href,

    m;

    o.secure = href && (href.toLowerCase().indexOf('https') === 0);

    if (ua) {

        if ((/windows|win32/i).test(ua)) {
            o.os = 'windows';
        } else if ((/macintosh/i).test(ua)) {
            o.os = 'macintosh';
        } else if ((/rhino/i).test(ua)) {
            o.os = 'rhino';
        }

        // Modern KHTML browsers should qualify as Safari X-Grade
        if ((/KHTML/).test(ua)) {
            o.webkit = 1;
        }
        // Modern WebKit browsers are at least X-Grade
        m = ua.match(/AppleWebKit\/([^\s]*)/);
        if (m && m[1]) {
            o.webkit = numberify(m[1]);
            o.safari = o.webkit;

            // Mobile browser check
            if (/ Mobile\//.test(ua)) {
                o.mobile = 'Apple'; // iPhone or iPod Touch

                m = ua.match(/OS ([^\s]*)/);
                if (m && m[1]) {
                    m = numberify(m[1].replace('_', '.'));
                }
                o.ios = m;
                o.ipad = o.ipod = o.iphone = 0;

                m = ua.match(/iPad|iPod|iPhone/);
                if (m && m[0]) {
                    o[m[0].toLowerCase()] = o.ios;
                }
            } else {
                m = ua.match(/NokiaN[^\/]*|webOS\/\d\.\d/);
                if (m) {
                    // Nokia N-series, webOS, ex: NokiaN95
                    o.mobile = m[0];
                }
                if (/webOS/.test(ua)) {
                    o.mobile = 'WebOS';
                    m = ua.match(/webOS\/([^\s]*);/);
                    if (m && m[1]) {
                        o.webos = numberify(m[1]);
                    }
                }
                if (/ Android/.test(ua)) {
                    if (/Mobile/.test(ua)) {
                        o.mobile = 'Android';
                    }
                    m = ua.match(/Android ([^\s]*);/);
                    if (m && m[1]) {
                        o.android = numberify(m[1]);
                    }

                }
            }

            m = ua.match(/Chrome\/([^\s]*)/);
            if (m && m[1]) {
                o.chrome = numberify(m[1]); // Chrome
                o.safari = 0; //Reset safari back to 0
            } else {
                m = ua.match(/AdobeAIR\/([^\s]*)/);
                if (m) {
                    o.air = m[0]; // Adobe AIR 1.0 or better
                }
            }
        }

        if (!o.webkit) { // not webkit
// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
            m = ua.match(/Opera[\s\/]([^\s]*)/);
            if (m && m[1]) {
                o.opera = numberify(m[1]);
                m = ua.match(/Version\/([^\s]*)/);
                if (m && m[1]) {
                    o.opera = numberify(m[1]); // opera 10+
                }

                m = ua.match(/Opera Mini[^;]*/);

                if (m) {
                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                m = ua.match(/MSIE\s([^;]*)/);
                if (m && m[1]) {
                    o.ie = numberify(m[1]);
                } else { // not opera, webkit, or ie
                    m = ua.match(/Gecko\/([^\s]*)/);
                    if (m) {
                        o.gecko = 1; // Gecko detected, look for revision
                        m = ua.match(/rv:([^\s\)]*)/);
                        if (m && m[1]) {
                            o.gecko = numberify(m[1]);
                        }
                    }
                }
            }
        }
    }

    YUI.Env.UA = o;

    return o;
};


Y.UA = YUI.Env.UA || YUI.Env.parseUA();
YUI.Env.aliases = {
    "anim": ["anim-base","anim-color","anim-curve","anim-easing","anim-node-plugin","anim-scroll","anim-xy"],
    "app": ["controller","model","model-list","view"],
    "attribute": ["attribute-base","attribute-complex"],
    "autocomplete": ["autocomplete-base","autocomplete-sources","autocomplete-list","autocomplete-plugin"],
    "base": ["base-base","base-pluginhost","base-build"],
    "cache": ["cache-base","cache-offline","cache-plugin"],
    "collection": ["array-extras","arraylist","arraylist-add","arraylist-filter","array-invoke"],
    "dataschema": ["dataschema-base","dataschema-json","dataschema-xml","dataschema-array","dataschema-text"],
    "datasource": ["datasource-local","datasource-io","datasource-get","datasource-function","datasource-cache","datasource-jsonschema","datasource-xmlschema","datasource-arrayschema","datasource-textschema","datasource-polling"],
    "datatable": ["datatable-base","datatable-datasource","datatable-sort","datatable-scroll"],
    "datatype": ["datatype-number","datatype-date","datatype-xml"],
    "datatype-date": ["datatype-date-parse","datatype-date-format"],
    "datatype-number": ["datatype-number-parse","datatype-number-format"],
    "datatype-xml": ["datatype-xml-parse","datatype-xml-format"],
    "dd": ["dd-ddm-base","dd-ddm","dd-ddm-drop","dd-drag","dd-proxy","dd-constrain","dd-drop","dd-scroll","dd-delegate"],
    "dom": ["dom-base","dom-screen","dom-style","selector-native","selector"],
    "editor": ["frame","selection","exec-command","editor-base","editor-para","editor-br","editor-bidi","editor-tab","createlink-base"],
    "event": ["event-base","event-delegate","event-synthetic","event-mousewheel","event-mouseenter","event-key","event-focus","event-resize","event-hover","event-outside"],
    "event-custom": ["event-custom-base","event-custom-complex"],
    "event-gestures": ["event-flick","event-move"],
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
    "widget": ["widget-base","widget-htmlparser","widget-uievents","widget-skin"]
};


}, '@VERSION@' );
YUI.add('get', function(Y) {

/**
 * Provides a mechanism to fetch remote resources and
 * insert them into a document.
 * @module yui
 * @submodule get
 */

/**
 * Fetches and inserts one or more script or link nodes into the document
 * @class Get
 * @static
 */

var ua = Y.UA,
    L = Y.Lang,
    TYPE_JS = 'text/javascript',
    TYPE_CSS = 'text/css',
    STYLESHEET = 'stylesheet',
    SCRIPT = 'script',
    AUTOPURGE = 'autopurge',
    UTF8 = 'utf-8',
    LINK = 'link',
    ASYNC = 'async',
    ALL = true,

    // FireFox does not support the onload event for link nodes, so
    // there is no way to make the css requests synchronous. This means
    // that the css rules in multiple files could be applied out of order
    // in this browser if a later request returns before an earlier one.

    // Safari too.

    ONLOAD_SUPPORTED = {
        script: ALL,
        css: !(ua.webkit || ua.gecko)
    },

    /**
     * hash of queues to manage multiple requests
     * @property queues
     * @private
     */
    queues = {},

    /**
     * queue index used to generate transaction ids
     * @property qidx
     * @type int
     * @private
     */
    qidx = 0,

    /**
     * interal property used to prevent multiple simultaneous purge
     * processes
     * @property purging
     * @type boolean
     * @private
     */
    purging,

    /**
     * Clear timeout state 
     * 
     * @method _clearTimeout
     * @param {Object} q Queue data
     * @private
     */
    _clearTimeout = function(q) {
        var timer = q.timer;
        if (timer) {
            clearTimeout(timer);
            q.timer = null;
        }
    },

    /**
     * Generates an HTML element, this is not appended to a document
     * @method _node
     * @param {string} type the type of element.
     * @param {Object} attr the fixed set of attribute for the type.
     * @param {Object} custAttrs optional Any custom attributes provided by the user.
     * @param {Window} win optional window to create the element in.
     * @return {HTMLElement} the generated node.
     * @private
     */
    _node = function(type, attr, custAttrs, win) {
        var w = win || Y.config.win,
            d = w.document,
            n = d.createElement(type),
            i;

        if (custAttrs) {
            Y.mix(attr, custAttrs);
        }

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
     * @param {string} url the url for the css file.
     * @param {Window} win optional window to create the node in.
     * @param {object} attributes optional attributes collection to apply to the
     * new node.
     * @return {HTMLElement} the generated node.
     * @private
     */
    _linkNode = function(url, win, attributes) {
        return _node(LINK, {
                        id: Y.guid(),
                        type: TYPE_CSS,
                        rel: STYLESHEET,
                        href: url
                    }, attributes, win);
    },

    /**
     * Generates a script node
     * @method _scriptNode
     * @param {string} url the url for the script file.
     * @param {Window} win optional window to create the node in.
     * @param {object} attributes optional attributes collection to apply to the
     * new node.
     * @return {HTMLElement} the generated node.
     * @private
     */
    _scriptNode = function(url, win, attributes) {
        return _node(SCRIPT, {
                        id: Y.guid(),
                        type: TYPE_JS,
                        src: url
                    }, attributes, win);
    },

    /**
     * Returns the data payload for callback functions.
     * @method _returnData
     * @param {object} q the queue.
     * @param {string} msg the result message.
     * @param {string} result the status message from the request.
     * @return {object} the state data from the request.
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
     * @param {string} id the id of the request.
     * @param {string} msg the result message.
     * @param {string} result the status message from the request.
     * @private
     */
    _end = function(id, msg, result) {
        var q = queues[id],
            onEnd = q && q.onEnd;

        q.finished = true;

        if (onEnd) {
            onEnd.call(q.context, _returnData(q, msg, result));
        }
    },

    /**
     * The request failed, execute fail handler with whatever
     * was accomplished.  There isn't a failure case at the
     * moment unless you count aborted transactions
     * @method _fail
     * @param {string} id the id of the request
     * @private
     */
    _fail = function(id, msg) {

        var q = queues[id],
            onFailure = q.onFailure;

        _clearTimeout(q);

        if (onFailure) {
            onFailure.call(q.context, _returnData(q, msg));
        }

        _end(id, msg, 'failure');
    },


    /**
     * Abort the transaction
     * 
     * @method _abort
     * @param {Object} id
     * @private
     */
    _abort = function(id) {
        _fail(id, 'transaction ' + id + ' was aborted');
    },

    /**
     * The request is complete, so executing the requester's callback
     * @method _complete
     * @param {string} id the id of the request.
     * @private
     */
    _complete = function(id) {

        var q = queues[id],
            onSuccess = q.onSuccess;

        _clearTimeout(q);

        if (q.aborted) {
            _abort(id);
        } else {

            if (onSuccess) {
                onSuccess.call(q.context, _returnData(q));
            }

            // 3.3.0 had undefined msg for this path.
            _end(id, undefined, 'OK');
        }
    },

    /**
     * Get node reference, from string
     * 
     * @method _getNodeRef
     * @param {String|HTMLElement} nId The node id to find. If an HTMLElement is passed in, it will be returned.
     * @param {String} tId Queue id, used to determine document for queue
     * @private
     */
    _getNodeRef = function(nId, tId) {
        var q = queues[tId],
            n = (L.isString(nId)) ? q.win.document.getElementById(nId) : nId;
        if (!n) {
            _fail(tId, 'target node not found: ' + nId);
        }

        return n;
    },

    /**
     * Removes the nodes for the specified queue
     * @method _purge
     * @param {string} tId the transaction id.
     * @private
     */
    _purge = function(tId) {
        var nodes, doc, parent, sibling, node, attr, insertBefore,
            i, l,
            q = queues[tId];

        if (q) {
            nodes = q.nodes;
            l = nodes.length;

            // TODO: Why is node.parentNode undefined? Which forces us to do this...
            /*
            doc = q.win.document;
            parent = doc.getElementsByTagName('head')[0];
            insertBefore = q.insertBefore || doc.getElementsByTagName('base')[0];

            if (insertBefore) {
                sibling = _getNodeRef(insertBefore, tId);
                if (sibling) {
                    parent = sibling.parentNode;
                }
            }
            */

            for (i = 0; i < l; i++) {
                node = nodes[i];
                parent = node.parentNode;

                if (node.clearAttributes) {
                    node.clearAttributes();
                } else {
                    // This destroys parentNode ref, so we hold onto it above first.
                    for (attr in node) {
                        if (node.hasOwnProperty(attr)) {
                            delete node[attr];
                        }
                    }
                }

                parent.removeChild(node);
            }
        }

        q.nodes = [];
    },

    /**
     * Progress callback
     * 
     * @method _progress
     * @param {string} id The id of the request.
     * @param {string} The url which just completed.
     * @private
     */
    _progress = function(id, url) {
        var q = queues[id],
            onProgress = q.onProgress,
            o;

        if (onProgress) {
            o = _returnData(q);
            o.url = url;
            onProgress.call(q.context, o);
        }
    },

    /**
     * Timeout detected
     * @method _timeout
     * @param {string} id the id of the request.
     * @private
     */
    _timeout = function(id) {

        var q = queues[id],
            onTimeout = q.onTimeout;

        if (onTimeout) {
            onTimeout.call(q.context, _returnData(q));
        }

        _end(id, 'timeout', 'timeout');
    },

    /**
     * onload callback
     * @method _loaded
     * @param {string} id the id of the request.
     * @return {string} the result.
     * @private
     */
    _loaded = function(id, url) {

        var q = queues[id],
            sync = (q && !q.async);

        if (!q) {
            return;
        }

        if (sync) {
            _clearTimeout(q);
        }

        _progress(id, url);

        // TODO: Cleaning up flow to have a consistent end point

        // !q.finished check is for the async case,
        // where scripts may still be loading when we've 
        // already aborted. Ideally there should be a single path
        // for this.

        if (!q.finished) { 
            if (q.aborted) {
                _abort(id);
            } else {
                if ((--q.remaining) === 0) {
                    _complete(id);
                } else if (sync) {
                    _next(id);
                }
            }
        }
    },

    /**
     * Detects when a node has been loaded.  In the case of
     * script nodes, this does not guarantee that contained
     * script is ready to use.
     * @method _trackLoad
     * @param {string} type the type of node to track.
     * @param {HTMLElement} n the node to track.
     * @param {string} id the id of the request.
     * @param {string} url the url that is being loaded.
     * @private
     */
    _trackLoad = function(type, n, id, url) {

        // TODO: Can we massage this to use ONLOAD_SUPPORTED[type]?

        // IE supports the readystatechange event for script and css nodes
        // Opera only for script nodes.  Opera support onload for script
        // nodes, but this doesn't fire when there is a load failure.
        // The onreadystatechange appears to be a better way to respond
        // to both success and failure.

        if (ua.ie) {

            n.onreadystatechange = function() {
                var rs = this.readyState;
                if ('loaded' === rs || 'complete' === rs) {
                    n.onreadystatechange = null;
                    _loaded(id, url);
                }
            };

        } else if (ua.webkit) {

            // webkit prior to 3.x is no longer supported
            if (type === SCRIPT) {
                // Safari 3.x supports the load event for script nodes (DOM2)
                n.addEventListener('load', function() {
                    _loaded(id, url);
                }, false);
            }

        } else {

            // FireFox and Opera support onload (but not DOM2 in FF) handlers for
            // script nodes. Opera, but not FF, supports the onload event for link nodes.

            n.onload = function() {
                _loaded(id, url);
            };

            n.onerror = function(e) {
                _fail(id, e + ': ' + url);
            };
        }
    },

    _insertInDoc = function(node, id, win) {

        // Add it to the head or insert it before 'insertBefore'.  
        // Work around IE bug if there is a base tag.
        var q = queues[id],
            doc = win.document,
            insertBefore = q.insertBefore || doc.getElementsByTagName('base')[0],
            sibling;

        if (insertBefore) {
            sibling = _getNodeRef(insertBefore, id);
            if (sibling) {
                sibling.parentNode.insertBefore(node, sibling);
            }
        } else {
            // 3.3.0 assumed head is always around.
            doc.getElementsByTagName('head')[0].appendChild(node);
        }
    },

    /**
     * Loads the next item for a given request
     * @method _next
     * @param {string} id the id of the request.
     * @return {string} the result.
     * @private
     */
    _next = function(id) {

        // Assigning out here for readability
        var q = queues[id],
            type = q.type,
            attrs = q.attributes,
            win = q.win,
            timeout = q.timeout,
            node,
            url;

        if (q.url.length > 0) {

            url = q.url.shift();


            // !q.timer ensures that this only happens once for async
            if (timeout && !q.timer) {
                q.timer = setTimeout(function() {
                    _timeout(id);
                }, timeout);
            }

            if (type === SCRIPT) {
                node = _scriptNode(url, win, attrs);
            } else {
                node = _linkNode(url, win, attrs);
            }

            // add the node to the queue so we can return it in the callback 
            q.nodes.push(node);

            _trackLoad(type, node, id, url);
            _insertInDoc(node, id, win);
    
            if (!ONLOAD_SUPPORTED[type]) {
                _loaded(id, url);
            }

            if (q.async) {
                // For sync, the _next call is chained in _loaded 
                _next(id);
            }
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
     * @param {string} type the type of node to insert.
     * @param {string} url the url to load.
     * @param {object} opts the hash of options for this request.
     * @return {object} transaction object.
     * @private
     */
    _queue = function(type, url, opts) {

        opts = opts || {};

        var id = 'q' + (qidx++),
            thresh = opts.purgethreshold || Y.Get.PURGE_THRESH, 
            q;

        if (qidx % thresh === 0) {
            _autoPurge();
        }

        // Merge to protect opts (grandfathered in).
        q = queues[id] = Y.merge(opts);

        // Avoid mix, merge overhead. Known set of props.
        q.tId = id;
        q.type = type;
        q.url = url;
        q.finished = false;
        q.nodes = [];

        q.win = q.win || Y.config.win;
        q.context = q.context || q;
        q.autopurge = (AUTOPURGE in q) ? q.autopurge : (type === SCRIPT) ? true : false;
        q.attributes = q.attributes || {};
        q.attributes.charset = opts.charset || q.attributes.charset || UTF8;

        if (ASYNC in q && type === SCRIPT) {
            q.attributes.async = q.async;
        }

        q.url = (L.isString(q.url)) ? [q.url] : q.url;

        // TODO: Do we really need to account for this developer error? 
        // If the url is undefined, this is probably a trailing comma problem in IE.
        if (!q.url[0]) {
            q.url.shift();
        }

        q.remaining = q.url.length;

        _next(id);

        return {
            tId: id
        };
    };


Y.Get = {

    /**
     * The number of request required before an automatic purge.
     * Can be configured via the 'purgethreshold' config
     * @property PURGE_THRESH
     * @static
     * @type int
     * @default 20
     * @private
     */
    PURGE_THRESH: 20,

    /**
     * Abort a transaction
     * @method abort
     * @static
     * @param {string|object} o Either the tId or the object returned from
     * script() or css().
     */
    abort : function(o) {
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
     * @param {string|string[]} url the url or urls to the script(s).
     * @param {object} opts Options:
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
     * <dd>a function that executes when the transaction finishes,
     * regardless of the exit path</dd>
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
     * <dt>onProgress</dt>
     * <dd>callback to execute when each individual file is done loading 
     * (useful when passing in an array of js files). Receives the same
     * payload as onSuccess, with the addition of a <code>url</code> 
     * property, which identifies the file which was loaded.</dd>
     * <dt>async</dt>
     * <dd>
     * <p>When passing in an array of JS files, setting this flag to true 
     * will insert them into the document in parallel, as opposed to the 
     * default behavior, which is to chain load them serially. It will also
     * set the async attribute on the script node to true.</p> 
     * <p>Setting async:true
     * will lead to optimal file download performance allowing the browser to
     * download multiple scripts in parallel, and execute them as soon as they
     * are available.</p>  
     * <p>Note that async:true does not guarantee execution order of the 
     * scripts being downloaded. They are executed in whichever order they 
     * are received.</p>
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
     * <dd>node or node id that will become the new node's nextSibling.
     * If this is not specified, nodes will be inserted before a base
     * tag should it exist.  Otherwise, the nodes will be appended to the
     * end of the document head.</dd>
     * </dl>
     * <dt>charset</dt>
     * <dd>Node charset, default utf-8 (deprecated, use the attributes
     * config)</dd>
     * <dt>attributes</dt>
     * <dd>An object literal containing additional attributes to add to
     * the link tags</dd>
     * <dt>timeout</dt>
     * <dd>Number of milliseconds to wait before aborting and firing
     * the timeout event</dd>
     * <pre>
     * &nbsp; Y.Get.script(
     * &nbsp; ["http://yui.yahooapis.com/2.5.2/build/yahoo/yahoo-min.js",
     * &nbsp;  "http://yui.yahooapis.com/2.5.2/build/event/event-min.js"],
     * &nbsp; &#123;
     * &nbsp;   onSuccess: function(o) &#123;
     * &nbsp;     this.log("won't cause error because Y is the context");
     * &nbsp;                   // immediately
     * &nbsp;   &#125;,
     * &nbsp;   onFailure: function(o) &#123;
     * &nbsp;   &#125;,
     * &nbsp;   onTimeout: function(o) &#123;
     * &nbsp;   &#125;,
     * &nbsp;   data: "foo",
     * &nbsp;   timeout: 10000, // 10 second timeout
     * &nbsp;   context: Y, // make the YUI instance
     * &nbsp;   // win: otherframe // target another window/frame
     * &nbsp;   autopurge: true // allow the utility to choose when to
     * &nbsp;                   // remove the nodes
     * &nbsp;   purgetheshold: 1 // purge previous transaction before
     * &nbsp;                    // next transaction
     * &nbsp; &#125;);.
     * </pre>
     * @return {tId: string} an object containing info about the
     * transaction.
     */
    script: function(url, opts) {
        return _queue(SCRIPT, url, opts);
    },

    /**
     * Fetches and inserts one or more css link nodes into the
     * head of the current document or the document in a specified
     * window.
     * @method css
     * @static
     * @param {string} url the url or urls to the css file(s).
     * @param {object} opts Options:
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
     * <dt>onProgress</dt>
     * <dd>callback to execute when each individual file is done loading (useful when passing in an array of css files). Receives the same
     * payload as onSuccess, with the addition of a <code>url</code> property, which identifies the file which was loaded. Currently only useful for non Webkit/Gecko browsers,
     * where onload for css is detected accurately.</dd>
     * <dt>async</dt>
     * <dd>When passing in an array of css files, setting this flag to true will insert them
     * into the document in parallel, as oppposed to the default behavior, which is to chain load them (where possible). 
     * This flag is more useful for scripts currently, since for css Get only chains if not Webkit/Gecko.</dd>
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
     * <dd>Node charset, default utf-8 (deprecated, use the attributes
     * config)</dd>
     * <dt>attributes</dt>
     * <dd>An object literal containing additional attributes to add to
     * the link tags</dd>
     * </dl>
     * <pre>
     * Y.Get.css("http://localhost/css/menu.css");
     * </pre>
     * <pre>
     * &nbsp; Y.Get.css(
     * &nbsp; ["http://localhost/css/menu.css",
     * &nbsp;   insertBefore: 'custom-styles' // nodes will be inserted
     * &nbsp;                                 // before the specified node
     * &nbsp; &#125;);.
     * </pre>
     * @return {tId: string} an object containing info about the
     * transaction.
     */
    css: function(url, opts) {
        return _queue('css', url, opts);
    }
};


}, '@VERSION@' ,{requires:['yui-base']});
YUI.add('features', function(Y) {

var feature_tests = {};

Y.mix(Y.namespace('Features'), {

    tests: feature_tests,

    add: function(cat, name, o) {
        feature_tests[cat] = feature_tests[cat] || {};
        feature_tests[cat][name] = o;
    },

    all: function(cat, args) {
        var cat_o = feature_tests[cat],
            // results = {};
            result = [];
        if (cat_o) {
            Y.Object.each(cat_o, function(v, k) {
                result.push(k + ':' + (Y.Features.test(cat, k, args) ? 1 : 0));
            });
        }

        return (result.length) ? result.join(';') : '';
    },

    test: function(cat, name, args) {
        args = args || [];
        var result, ua, test,
            cat_o = feature_tests[cat],
            feature = cat_o && cat_o[name];

        if (!feature) {
        } else {

            result = feature.result;

            if (Y.Lang.isUndefined(result)) {

                ua = feature.ua;
                if (ua) {
                    result = (Y.UA[ua]);
                }

                test = feature.test;
                if (test && ((!ua) || result)) {
                    result = test.apply(Y, args);
                }

                feature.result = result;
            }
        }

        return result;
    }
});

// Y.Features.add("load", "1", {});
// Y.Features.test("load", "1");
// caps=1:1;2:0;3:1;

/* This file is auto-generated by src/loader/scripts/meta_join.py */
var add = Y.Features.add;
// graphics-canvas-default
add('load', '0', {
    "name": "graphics-canvas-default", 
    "test": function(Y) {
    var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
	return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (canvas && canvas.getContext && canvas.getContext("2d")));
}, 
    "trigger": "graphics"
});
// autocomplete-list-keys
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
    return !(Y.UA.ios || Y.UA.android);
}, 
    "trigger": "autocomplete-list"
});
// graphics-svg
add('load', '2', {
    "name": "graphics-svg", 
    "test": function(Y) {
    var DOCUMENT = Y.config.doc;
	return (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
}, 
    "trigger": "graphics"
});
// history-hash-ie
add('load', '3', {
    "name": "history-hash-ie", 
    "test": function (Y) {
    var docMode = Y.config.doc && Y.config.doc.documentMode;

    return Y.UA.ie && (!('onhashchange' in Y.config.win) ||
            !docMode || docMode < 8);
}, 
    "trigger": "history-hash"
});
// graphics-vml-default
add('load', '4', {
    "name": "graphics-vml-default", 
    "test": function(Y) {
    var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
}, 
    "trigger": "graphics"
});
// graphics-svg-default
add('load', '5', {
    "name": "graphics-svg-default", 
    "test": function(Y) {
    var DOCUMENT = Y.config.doc;
	return (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
}, 
    "trigger": "graphics"
});
// widget-base-ie
add('load', '6', {
    "name": "widget-base-ie", 
    "trigger": "widget-base", 
    "ua": "ie"
});
// transition-timer
add('load', '7', {
    "name": "transition-timer", 
    "test": function (Y) {
    var DOCUMENT = Y.config.doc,
        node = (DOCUMENT) ? DOCUMENT.documentElement: null,
        ret = true;

    if (node && node.style) {
        ret = !('MozTransition' in node.style || 'WebkitTransition' in node.style);
    } 

    return ret;
}, 
    "trigger": "transition"
});
// dom-style-ie
add('load', '8', {
    "name": "dom-style-ie", 
    "test": function (Y) {

    var testFeature = Y.Features.test,
        addFeature = Y.Features.add,
        WINDOW = Y.config.win,
        DOCUMENT = Y.config.doc,
        DOCUMENT_ELEMENT = 'documentElement',
        ret = false;

    addFeature('style', 'computedStyle', {
        test: function() {
            return WINDOW && 'getComputedStyle' in WINDOW;
        }
    });

    addFeature('style', 'opacity', {
        test: function() {
            return DOCUMENT && 'opacity' in DOCUMENT[DOCUMENT_ELEMENT].style;
        }
    });

    ret =  (!testFeature('style', 'opacity') &&
            !testFeature('style', 'computedStyle'));

    return ret;
}, 
    "trigger": "dom-style"
});
// selector-css2
add('load', '9', {
    "name": "selector-css2", 
    "test": function (Y) {
    var DOCUMENT = Y.config.doc,
        ret = DOCUMENT && !('querySelectorAll' in DOCUMENT);

    return ret;
}, 
    "trigger": "selector"
});
// event-base-ie
add('load', '10', {
    "name": "event-base-ie", 
    "test": function(Y) {
    var imp = Y.config.doc && Y.config.doc.implementation;
    return (imp && (!imp.hasFeature('Events', '2.0')));
}, 
    "trigger": "node-base"
});
// dd-gestures
add('load', '11', {
    "name": "dd-gestures", 
    "test": function(Y) {
    return (Y.config.win && ('ontouchstart' in Y.config.win && !Y.UA.chrome));
}, 
    "trigger": "dd-drag"
});
// scrollview-base-ie
add('load', '12', {
    "name": "scrollview-base-ie", 
    "trigger": "scrollview-base", 
    "ua": "ie"
});
// graphics-canvas
add('load', '13', {
    "name": "graphics-canvas", 
    "test": function(Y) {
    var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
	return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (canvas && canvas.getContext && canvas.getContext("2d")));
}, 
    "trigger": "graphics"
});
// graphics-vml
add('load', '14', {
    "name": "graphics-vml", 
    "test": function(Y) {
    var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
}, 
    "trigger": "graphics"
});


}, '@VERSION@' ,{requires:['yui-base']});
YUI.add('intl-base', function(Y) {

/**
 * The Intl utility provides a central location for managing sets of
 * localized resources (strings and formatting patterns).
 *
 * @class Intl
 * @uses EventTarget
 * @static
 */

var SPLIT_REGEX = /[, ]/;

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

        var i, language, result, index;

        // check whether the list of available languages contains language;
        // if so return it
        function scan(language) {
            var i;
            for (i = 0; i < availableLanguages.length; i += 1) {
                if (language.toLowerCase() ===
                            availableLanguages[i].toLowerCase()) {
                    return availableLanguages[i];
                }
            }
        }

        if (Y.Lang.isString(preferredLanguages)) {
            preferredLanguages = preferredLanguages.split(SPLIT_REGEX);
        }

        for (i = 0; i < preferredLanguages.length; i += 1) {
            language = preferredLanguages[i];
            if (!language || language === '*') {
                continue;
            }
            // check the fallback sequence for one language
            while (language.length > 0) {
                result = scan(language);
                if (result) {
                    return result;
                } else {
                    index = language.lastIndexOf('-');
                    if (index >= 0) {
                        language = language.substring(0, index);
                        // one-character subtags get cut along with the
                        // following subtag
                        if (index >= 2 && language.charAt(index - 2) === '-') {
                            language = language.substring(0, index - 2);
                        }
                    } else {
                        // nothing available for this language
                        break;
                    }
                }
            }
        }

        return '';
    }
});


}, '@VERSION@' ,{requires:['yui-base']});
YUI.add('yui-log', function(Y) {

/**
 * Provides console log capability and exposes a custom event for
 * console implementations. This module is a `core` YUI module, <a href="../classes/YUI.html#method_log">it's documentation is located under the YUI class</a>.
 *
 * @module yui
 * @submodule yui-log
 */

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
INSTANCE.log = function(msg, cat, src, silent) {
    var bail, excl, incl, m, f,
        Y = INSTANCE,
        c = Y.config,
        publisher = (Y.fire) ? Y : YUI.Env.globalEvents;
    // suppress log message if the config is off or the event stack
    // or the event call stack contains a consumer of the yui:log event
    if (c.debug) {
        // apply source filters
        if (src) {
            excl = c.logExclude;
            incl = c.logInclude;
            if (incl && !(src in incl)) {
                bail = 1;
            } else if (incl && (src in incl)) {
                bail = !incl[src];
            } else if (excl && (src in excl)) {
                bail = excl[src];
            }
        }
        if (!bail) {
            if (c.useBrowserConsole) {
                m = (src) ? src + ': ' + msg : msg;
                if (Y.Lang.isFunction(c.logFn)) {
                    c.logFn.call(Y, msg, cat, src);
                } else if (typeof console != UNDEFINED && console.log) {
                    f = (cat && console[cat] && (cat in LEVELS)) ? cat : 'log';
                    console[f](m);
                } else if (typeof opera != UNDEFINED) {
                    opera.postError(m);
                }
            }

            if (publisher && !silent) {

                if (publisher == Y && (!publisher.getEvent(LOGEVENT))) {
                    publisher.publish(LOGEVENT, {
                        broadcast: 2
                    });
                }

                publisher.fire(LOGEVENT, {
                    msg: msg,
                    cat: cat,
                    src: src
                });
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
 *                        Custom categories can be used as well. (opt).
 * @param  {String}  src  The source of the the message (opt).
 * @param  {boolean} silent If true, the log event won't fire.
 * @return {YUI}      YUI instance.
 */
INSTANCE.message = function() {
    return INSTANCE.log.apply(INSTANCE, arguments);
};


}, '@VERSION@' ,{requires:['yui-base']});
YUI.add('yui-later', function(Y) {

/**
 * Provides a setTimeout/setInterval wrapper. This module is a `core` YUI module, <a href="../classes/YUI.html#method_later">it's documentation is located under the YUI class</a>.
 *
 * @module yui
 * @submodule yui-later
 */

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
Y.later = function(when, o, fn, data, periodic) {
    when = when || 0;
    data = (!Y.Lang.isUndefined(data)) ? Y.Array(data) : data;

    var cancelled = false,
        method = (o && Y.Lang.isString(fn)) ? o[fn] : fn,
        wrapper = function() {
            // IE 8- may execute a setInterval callback one last time
            // after clearInterval was called, so in order to preserve
            // the cancel() === no more runny-run, we have to jump through
            // an extra hoop.
            if (!cancelled) {
                if (!method.apply) {
                    method(data[0], data[1], data[2], data[3]);
                } else {
                    method.apply(o, data || NO_ARGS);
                }
            }
        },
        id = (periodic) ? setInterval(wrapper, when) : setTimeout(wrapper, when);

    return {
        id: id,
        interval: periodic,
        cancel: function() {
            cancelled = true;
            if (this.interval) {
                clearInterval(id);
            } else {
                clearTimeout(id);
            }
        }
    };
};

Y.Lang.later = Y.later;



}, '@VERSION@' ,{requires:['yui-base']});
YUI.add('loader-base', function(Y) {

/**
 * The YUI loader core
 * @module loader
 * @submodule loader-base
 */

if (!YUI.Env[Y.version]) {

    (function() {
        var VERSION = Y.version,
            BUILD = '/build/',
            ROOT = VERSION + BUILD,
            CDN_BASE = Y.Env.base,
            GALLERY_VERSION = 'gallery-2011.08.04-15-16',
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
            yui2Update = function(tnt, yui2) {
                                  var root = TNT + '.' +
                                            (tnt || TNT_VERSION) + '/' +
                                            (yui2 || YUI2_VERSION) + BUILD;
                                  groups.yui2.base = CDN_BASE + root;
                                  groups.yui2.root = root;
                              },
            galleryUpdate = function(tag) {
                                  var root = (tag || GALLERY_VERSION) + BUILD;
                                  groups.gallery.base = CDN_BASE + root;
                                  groups.gallery.root = root;
                              };

        groups[VERSION] = {};

        groups.gallery = {
            ext: false,
            combine: true,
            comboBase: COMBO_BASE,
            update: galleryUpdate,
            patterns: { 'gallery-': { },
                        'lang/gallery-': {},
                        'gallerycss-': { type: 'css' } }
        };

        groups.yui2 = {
            combine: true,
            ext: false,
            comboBase: COMBO_BASE,
            update: yui2Update,
            patterns: {
                'yui2-': {
                    configFn: function(me) {
                        if (/-skin|reset|fonts|grids|base/.test(me.name)) {
                            me.type = 'css';
                            me.path = me.path.replace(/\.js/, '.css');
                            // this makes skins in builds earlier than
                            // 2.6.0 work as long as combine is false
                            me.path = me.path.replace(/\/yui2-skin/,
                                             '/assets/skins/sam/yui2-skin');
                        }
                    }
                }
            }
        };

        galleryUpdate();
        yui2Update();

        YUI.Env[VERSION] = META;
    }());
}


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

var NOT_FOUND = {},
    NO_REQUIREMENTS = [],
    MAX_URL_LENGTH = 2048,
    GLOBAL_ENV = YUI.Env,
    GLOBAL_LOADED = GLOBAL_ENV._loaded,
    CSS = 'css',
    JS = 'js',
    INTL = 'intl',
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
                        var path = dir + '/' + file;
                        if (!nomin) {
                            path += '-min';
                        }
                        path += '.' + (type || CSS);

                        return path;
                    };

/**
 * The component metadata is stored in Y.Env.meta.
 * Part of the loader module.
 * @property Env.meta
 * @for YUI
 */
Y.Env.meta = META;

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
 * @constructor
 * @class Loader
 * @param {object} o an optional set of configuration options.  Valid options:
 * <ul>
 *  <li>base:
 *  The base dir</li>
 *  <li>comboBase:
 *  The YUI combo service base dir. Ex: http://yui.yahooapis.com/combo?</li>
 *  <li>root:
 *  The root path to prepend to module names for the combo service.
 *  Ex: 2.5.2/build/</li>
 *  <li>filter:.
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
 *  <dd>Selects the non-minified version of the library (e.g., event.js).
 *  </dd>
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
 *  <li>filters: per-component filter specification.  If specified
 *  for a given component, this overrides the filter config. _Note:_ This does not work on combo urls, use the filter property instead.</li>
 *  <li>combine:
 *  Use the YUI combo service to reduce the number of http connections
 *  required to load your dependencies</li>
 *  <li>ignore:
 *  A list of modules that should never be dynamically loaded</li>
 *  <li>force:
 *  A list of modules that should always be loaded when required, even if
 *  already present on the page</li>
 *  <li>insertBefore:
 *  Node or id for a node that should be used as the insertion point for
 *  new nodes</li>
 *  <li>charset:
 *  charset for dynamic nodes (deprecated, use jsAttributes or cssAttributes)
 *  </li>
 *  <li>jsAttributes: object literal containing attributes to add to script
 *  nodes</li>
 *  <li>cssAttributes: object literal containing attributes to add to link
 *  nodes</li>
 *  <li>timeout:
 *  The number of milliseconds before a timeout occurs when dynamically
 *  loading nodes.  If not set, there is no timeout</li>
 *  <li>context:
 *  execution context for all callbacks</li>
 *  <li>onSuccess:
 *  callback for the 'success' event</li>
 *  <li>onFailure: callback for the 'failure' event</li>
 *  <li>onCSS: callback for the 'CSSComplete' event.  When loading YUI
 *  components with CSS the CSS is loaded first, then the script.  This
 *  provides a moment you can tie into to improve
 *  the presentation of the page while the script is loading.</li>
 *  <li>onTimeout:
 *  callback for the 'timeout' event</li>
 *  <li>onProgress:
 *  callback executed each time a script or css file is loaded</li>
 *  <li>modules:
 *  A list of module definitions.  See Loader.addModule for the supported
 *  module metadata</li>
 *  <li>groups:
 *  A list of group definitions.  Each group can contain specific definitions
 *  for base, comboBase, combine, and accepts a list of modules.  See above
 *  for the description of these properties.</li>
 *  <li>2in3: the version of the YUI 2 in 3 wrapper to use.  The intrinsic
 *  support for YUI 2 modules in YUI 3 relies on versions of the YUI 2
 *  components inside YUI 3 module wrappers.  These wrappers
 *  change over time to accomodate the issues that arise from running YUI 2
 *  in a YUI 3 sandbox.</li>
 *  <li>yui2: when using the 2in3 project, you can select the version of
 *  YUI 2 to use.  Valid values *  are 2.2.2, 2.3.1, 2.4.1, 2.5.2, 2.6.0,
 *  2.7.0, 2.8.0, and 2.8.1 [default] -- plus all versions of YUI 2
 *  going forward.</li>
 * </ul>
 */
Y.Loader = function(o) {

    var defaults = META.modules,
        self = this;

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
    self.base = Y.Env.meta.base + Y.Env.meta.root;

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
    self.combine = o.base &&
        (o.base.indexOf(self.comboBase.substr(0, 20)) > -1);
    
    /**
    * The default seperator to use between files in a combo URL
    * @property comboSep
    * @type {String}
    * @default Ampersand
    */
    self.comboSep = '&';
    /**
     * Max url length for combo urls.  The default is 2048. This is the URL
     * limit for the Yahoo! hosted combo servers.  If consuming
     * a different combo service that has a different URL limit
     * it is possible to override this default by supplying
     * the maxURLLength config option.  The config option will
     * only take effect if lower than the default.
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
     * @default false
     */
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
     * <pre>
     *  myFilter: &#123;
     *      'searchExp': "-min\\.js",
     *      'replaceStr': "-debug.js"
     *  &#125;
     * </pre>
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
     * At the moment only supporting module prefixes, but anticipate
     * supporting at least regular expressions.
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

    /*
     * Map of conditional modules
     * @since 3.2.0
     */
    self.conditions = {};

    // map of modules with a hash of modules that meet the requirement
    // self.provides = {};

    self.config = o;
    self._internal = true;


    cache = GLOBAL_ENV._renderedMods;

    if (cache) {
        oeach(cache, function modCache(v, k) {
            //self.moduleInfo[k] = Y.merge(v);
            self.moduleInfo[k] = v;
        });

        cache = GLOBAL_ENV._conditions;

        oeach(cache, function condCache(v, k) {
            //self.conditions[k] = Y.merge(v);
            self.conditions[k] = v;
        });

    } else {
        oeach(defaults, self.addModule, self);
    }

    if (!GLOBAL_ENV._renderedMods) {
        //GLOBAL_ENV._renderedMods = Y.merge(self.moduleInfo);
        //GLOBAL_ENV._conditions = Y.merge(self.conditions);
        GLOBAL_ENV._renderedMods = self.moduleInfo;
        GLOBAL_ENV._conditions = self.conditions;
    }

    self._inspectPage();

    self._internal = false;

    self._config(o);

    self.testresults = null;

    if (Y.config.tests) {
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
    self.sorted = [];

    /**
     * Set when beginning to compute the dependency tree.
     * Composed of what YUI reports to be loaded combined
     * with what has been loaded by any instance on the page
     * with the version number specified in the metadata.
     * @property loaded
     * @type {string: boolean}
     */
    self.loaded = GLOBAL_LOADED[VERSION];

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

    self.tested = {};

    /*
     * Cached sorted calculate results
     * @property results
     * @since 3.2.0
     */
    //self.results = {};

};

Y.Loader.prototype = {

    FILTER_DEFS: {
        RAW: {
            'searchExp': '-min\\.js',
            'replaceStr': '.js'
        },
        DEBUG: {
            'searchExp': '-min\\.js',
            'replaceStr': '-debug.js'
        }
    },
    /*
    * Check the pages meta-data and cache the result.
    * @method _inspectPage
    * @private
    */
    _inspectPage: function() {
        oeach(ON_PAGE, function(v, k) {
           if (v.details) {
               var m = this.moduleInfo[k],
                   req = v.details.requires,
                   mr = m && m.requires;
               if (m) {
                   if (!m._inspected && req && mr.length != req.length) {
                       // console.log('deleting ' + m.name);
                       // m.requres = YObject.keys(Y.merge(YArray.hash(req), YArray.hash(mr)));
                       delete m.expanded;
                       // delete m.expanded_map;
                   }
               } else {
                   m = this.addModule(v.details, k);
               }
               m._inspected = true;
           }
       }, this);
    },
    /*
    * returns true if b is not loaded, and is required directly or by means of modules it supersedes.
    * @private
    * @method _requires
    * @param {String} mod1 The first module to compare
    * @param {String} mod2 The second module to compare
    */
   _requires: function(mod1, mod2) {

        var i, rm, after_map, s,
            info = this.moduleInfo,
            m = info[mod1],
            other = info[mod2];

        if (!m || !other) {
            return false;
        }

        rm = m.expanded_map;
        after_map = m.after_map;

        // check if this module should be sorted after the other
        // do this first to short circut circular deps
        if (after_map && (mod2 in after_map)) {
            return true;
        }

        after_map = other.after_map;

        // and vis-versa
        if (after_map && (mod1 in after_map)) {
            return false;
        }

        // check if this module requires one the other supersedes
        s = info[mod2] && info[mod2].supersedes;
        if (s) {
            for (i = 0; i < s.length; i++) {
                if (this._requires(mod1, s[i])) {
                    return true;
                }
            }
        }

        s = info[mod1] && info[mod1].supersedes;
        if (s) {
            for (i = 0; i < s.length; i++) {
                if (this._requires(mod2, s[i])) {
                    return false;
                }
            }
        }

        // check if this module requires the other directly
        // if (r && YArray.indexOf(r, mod2) > -1) {
        if (rm && (mod2 in rm)) {
            return true;
        }

        // external css files should be sorted below yui css
        if (m.ext && m.type == CSS && !other.ext && other.type == CSS) {
            return true;
        }

        return false;
    },
    /**
    * Apply a new config to the Loader instance
    * @method _config
    * @param {Object} o The new configuration
    */
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
                                groupName = j;
                                group = val[j];
                                self.addGroup(group, groupName);
                            }
                        }

                    } else if (i == 'modules') {
                        // add a hash of module definitions
                        oeach(val, self.addModule, self);
                    } else if (i == 'gallery') {
                        this.groups.gallery.update(val);
                    } else if (i == 'yui2' || i == '2in3') {
                        this.groups.yui2.update(o['2in3'], o.yui2);
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

        if (self.lang) {
            self.require('intl-base', 'intl');
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
        var s = SKIN_PREFIX + skin;
        if (mod) {
            s = s + '-' + mod;
        }

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
        var mdef, pkg, name, nmod,
            info = this.moduleInfo,
            sinf = this.skin,
            ext = info[mod] && info[mod].ext;

        // Add a module definition for the module-specific skin css
        if (mod) {
            name = this.formatSkin(skin, mod);
            if (!info[name]) {
                mdef = info[mod];
                pkg = mdef.pkg || mod;
                nmod = {
                    name: name,
                    group: mdef.group,
                    type: 'css',
                    after: sinf.after,
                    path: (parent || pkg) + '/' + sinf.base + skin +
                          '/' + mod + '.css',
                    ext: ext
                };
                if (mdef.base) {
                    nmod.base = mdef.base;
                }
                if (mdef.configFn) {
                    nmod.configFn = mdef.configFn;
                }
                this.addModule(nmod, name);

            }
        }

        return name;
    },

    /**
     * Add a new module group
     * <dl>
     *   <dt>name:</dt>      <dd>required, the group name</dd>
     *   <dt>base:</dt>      <dd>The base dir for this module group</dd>
     *   <dt>root:</dt>      <dd>The root path to add to each combo
     *   resource path</dd>
     *   <dt>combine:</dt>   <dd>combo handle</dd>
     *   <dt>comboBase:</dt> <dd>combo service base path</dd>
     *   <dt>modules:</dt>   <dd>the group of modules</dd>
     * </dl>
     * @method addGroup
     * @param {object} o An object containing the module data.
     * @param {string} name the group name.
     */
    addGroup: function(o, name) {
        var mods = o.modules,
            self = this;
        name = name || o.name;
        o.name = name;
        self.groups[name] = o;

        if (o.patterns) {
            oeach(o.patterns, function(v, k) {
                v.group = name;
                self.patterns[k] = v;
            });
        }

        if (mods) {
            oeach(mods, function(v, k) {
                v.group = name;
                self.addModule(v, k);
            }, self);
        }
    },

    /**
     * Add a new module to the component metadata.
     * <dl>
     *     <dt>name:</dt>       <dd>required, the component name</dd>
     *     <dt>type:</dt>       <dd>required, the component type (js or css)
     *     </dd>
     *     <dt>path:</dt>       <dd>required, the path to the script from
     *     "base"</dd>
     *     <dt>requires:</dt>   <dd>array of modules required by this
     *     component</dd>
     *     <dt>optional:</dt>   <dd>array of optional modules for this
     *     component</dd>
     *     <dt>supersedes:</dt> <dd>array of the modules this component
     *     replaces</dd>
     *     <dt>after:</dt>      <dd>array of modules the components which, if
     *     present, should be sorted above this one</dd>
     *     <dt>after_map:</dt>  <dd>faster alternative to 'after' -- supply
     *     a hash instead of an array</dd>
     *     <dt>rollup:</dt>     <dd>the number of superseded modules required
     *     for automatic rollup</dd>
     *     <dt>fullpath:</dt>   <dd>If fullpath is specified, this is used
     *     instead of the configured base + path</dd>
     *     <dt>skinnable:</dt>  <dd>flag to determine if skin assets should
     *     automatically be pulled in</dd>
     *     <dt>submodules:</dt> <dd>a hash of submodules</dd>
     *     <dt>group:</dt>      <dd>The group the module belongs to -- this
     *     is set automatically when it is added as part of a group
     *     configuration.</dd>
     *     <dt>lang:</dt>
     *       <dd>array of BCP 47 language tags of languages for which this
     *           module has localized resource bundles,
     *           e.g., ["en-GB","zh-Hans-CN"]</dd>
     *     <dt>condition:</dt>
     *       <dd>Specifies that the module should be loaded automatically if
     *           a condition is met.  This is an object with up to three fields:
     *           [trigger] - the name of a module that can trigger the auto-load
     *           [test] - a function that returns true when the module is to be
     *           loaded.
     *           [when] - specifies the load order of the conditional module
     *           with regard to the position of the trigger module.
     *           This should be one of three values: 'before', 'after', or
     *           'instead'.  The default is 'after'.
     *       </dd>
     *     <dt>testresults:</dt><dd>a hash of test results from Y.Features.all()</dd>
     * </dl>
     * @method addModule
     * @param {object} o An object containing the module data.
     * @param {string} name the module name (optional), required if not
     * in the module data.
     * @return {object} the module definition or null if
     * the object passed in did not provide all required attributes.
     */
    addModule: function(o, name) {
        name = name || o.name;

        if (this.moduleInfo[name]) {
            //This catches temp modules loaded via a pattern
            // The module will be added twice, once from the pattern and
            // Once from the actual add call, this ensures that properties
            // that were added to the module the first time around (group: gallery)
            // are also added the second time around too.
            o = Y.merge(this.moduleInfo[name], o);
        }

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
        o.supersedes = o.supersedes || o.use;

        o.ext = ('ext' in o) ? o.ext : (this._internal) ? false : true;
        o.requires = this.filterRequires(o.requires) || [];

        // Handle submodule logic
        var subs = o.submodules, i, l, t, sup, s, smod, plugins, plug,
            j, langs, packName, supName, flatSup, flatLang, lang, ret,
            overrides, skinname, when,
            conditions = this.conditions, trigger;
            // , existing = this.moduleInfo[name], newr;

        this.moduleInfo[name] = o;

        if (!o.langPack && o.lang) {
            langs = YArray(o.lang);
            for (j = 0; j < langs.length; j++) {
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
            l = 0;

            for (i in subs) {
                if (subs.hasOwnProperty(i)) {
                    s = subs[i];

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
                            for (j = 0; j < overrides[i].length; j++) {
                                skinname = this._addSkin(overrides[i][j],
                                         i, name);
                                sup.push(skinname);
                            }
                        }
                        skinname = this._addSkin(this.skin.defaultSkin,
                                        i, name);
                        sup.push(skinname);
                    }

                    // looks like we are expected to work out the metadata
                    // for the parent module language packs from what is
                    // specified in the child modules.
                    if (s.lang && s.lang.length) {

                        langs = YArray(s.lang);
                        for (j = 0; j < langs.length; j++) {
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

// Add rollup file, need to add to supersedes list too

                            // default packages
                            packName = this.getLangPackName(ROOT_LANG, name);
                            supName = this.getLangPackName(ROOT_LANG, i);

                            smod = this.moduleInfo[packName];

                            if (!smod) {
                                smod = this._addLangPack(lang, o, packName);
                            }

                            if (!(supName in flatSup)) {
                                smod.supersedes.push(supName);
                            }

// Add rollup file, need to add to supersedes list too

                        }
                    }

                    l++;
                }
            }
            //o.supersedes = YObject.keys(YArray.hash(sup));
            o.supersedes = YArray.dedupe(sup);
            if (this.allowRollup) {
                o.rollup = (l < 4) ? l : Math.min(l - 1, 4);
            }
        }

        plugins = o.plugins;
        if (plugins) {
            for (i in plugins) {
                if (plugins.hasOwnProperty(i)) {
                    plug = plugins[i];
                    plug.pkg = name;
                    plug.path = plug.path || _path(name, i, o.type);
                    plug.requires = plug.requires || [];
                    plug.group = o.group;
                    this.addModule(plug, i);
                    if (o.skinnable) {
                        this._addSkin(this.skin.defaultSkin, i, name);
                    }

                }
            }
        }

        if (o.condition) {
            t = o.condition.trigger;
            if (YUI.Env.aliases[t]) {
                t = YUI.Env.aliases[t];
            }
            if (!Y.Lang.isArray(t)) {
                t = [t];
            }

            for (i = 0; i < t.length; i++) {
                trigger = t[i];
                when = o.condition.when;
                conditions[trigger] = conditions[trigger] || {};
                conditions[trigger][name] = o.condition;
                // the 'when' attribute can be 'before', 'after', or 'instead'
                // the default is after.
                if (when && when != 'after') {
                    if (when == 'instead') { // replace the trigger
                        o.supersedes = o.supersedes || [];
                        o.supersedes.push(trigger);
                    } else { // before the trigger
                        // the trigger requires the conditional mod,
                        // so it should appear before the conditional
                        // mod if we do not intersede.
                    }
                } else { // after the trigger
                    o.after = o.after || [];
                    o.after.push(trigger);
                }
            }
        }

        if (o.after) {
            o.after_map = YArray.hash(o.after);
        }

        // this.dirty = true;

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
     * @param {string[] | string*} what the modules to load.
     */
    require: function(what) {
        var a = (typeof what === 'string') ? YArray(arguments) : what;
        this.dirty = true;
        this.required = Y.merge(this.required, YArray.hash(this.filterRequires(a)));

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
        var self = this, m,
        r = self.required;
        if (!self.allowRollup) {
            oeach(r, function(v, name) {
                m = self.getModule(name);
                if (m && m.use) {
                    //delete r[name];
                    YArray.each(m.use, function(v) {
                        m = self.getModule(v);
                        if (m && m.use) {
                            //delete r[v];
                            YArray.each(m.use, function(v) {
                                r[v] = true;
                            });
                        } else {
                            r[v] = true;
                        }
                    });
                }
            });
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
        if (r) {
            if (!Y.Lang.isArray(r)) {
                r = [r];
            }
            r = Y.Array(r);
            var c = [], i, mod, o, m;

            for (i = 0; i < r.length; i++) {
                mod = this.getModule(r[i]);
                if (mod && mod.use) {
                    for (o = 0; o < mod.use.length; o++) {
                        //Must walk the other modules in case a module is a rollup of rollups (datatype)
                        m = this.getModule(mod.use[o]);
                        if (m && m.use) {
                            c = Y.Array.dedupe([].concat(c, this.filterRequires(m.use)));
                        } else {
                            c.push(mod.use[o]);
                        }
                    }
                } else {
                    c.push(r[i]);
                }
            }
            r = c;
        }
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

        if (!mod || mod._parsed) {
            return NO_REQUIREMENTS;
        }

        var i, m, j, add, packName, lang, testresults = this.testresults,
            name = mod.name, cond, go,
            adddef = ON_PAGE[name] && ON_PAGE[name].details,
            d, k, m1,
            r, old_mod,
            o, skinmod, skindef, skinpar, skinname,
            intl = mod.lang || mod.intl,
            info = this.moduleInfo,
            ftests = Y.Features && Y.Features.tests.load,
            hash;

        // console.log(name);

        // pattern match leaves module stub that needs to be filled out
        if (mod.temp && adddef) {
            old_mod = mod;
            mod = this.addModule(adddef, name);
            mod.group = old_mod.group;
            mod.pkg = old_mod.pkg;
            delete mod.expanded;
        }

        // console.log('cache: ' + mod.langCache + ' == ' + this.lang);

        // if (mod.expanded && (!mod.langCache || mod.langCache == this.lang)) {
        if (mod.expanded && (!this.lang || mod.langCache === this.lang)) {
            return mod.expanded;
        }
        

        d = [];
        hash = {};
        
        r = this.filterRequires(mod.requires);
        if (mod.lang) {
            //If a module has a lang attribute, auto add the intl requirement.
            d.unshift('intl');
            r.unshift('intl');
            intl = true;
        }
        o = mod.optional;


        mod._parsed = true;
        mod.langCache = this.lang;

        for (i = 0; i < r.length; i++) {
            if (!hash[r[i]]) {
                d.push(r[i]);
                hash[r[i]] = true;
                m = this.getModule(r[i]);
                if (m) {
                    add = this.getRequires(m);
                    intl = intl || (m.expanded_map &&
                        (INTL in m.expanded_map));
                    for (j = 0; j < add.length; j++) {
                        d.push(add[j]);
                    }
                }
            }
        }

        // get the requirements from superseded modules, if any
        r = mod.supersedes;
        if (r) {
            for (i = 0; i < r.length; i++) {
                if (!hash[r[i]]) {
                    // if this module has submodules, the requirements list is
                    // expanded to include the submodules.  This is so we can
                    // prevent dups when a submodule is already loaded and the
                    // parent is requested.
                    if (mod.submodules) {
                        d.push(r[i]);
                    }

                    hash[r[i]] = true;
                    m = this.getModule(r[i]);

                    if (m) {
                        add = this.getRequires(m);
                        intl = intl || (m.expanded_map &&
                            (INTL in m.expanded_map));
                        for (j = 0; j < add.length; j++) {
                            d.push(add[j]);
                        }
                    }
                }
            }
        }

        if (o && this.loadOptional) {
            for (i = 0; i < o.length; i++) {
                if (!hash[o[i]]) {
                    d.push(o[i]);
                    hash[o[i]] = true;
                    m = info[o[i]];
                    if (m) {
                        add = this.getRequires(m);
                        intl = intl || (m.expanded_map &&
                            (INTL in m.expanded_map));
                        for (j = 0; j < add.length; j++) {
                            d.push(add[j]);
                        }
                    }
                }
            }
        }

        cond = this.conditions[name];

        if (cond) {
            if (testresults && ftests) {
                oeach(testresults, function(result, id) {
                    var condmod = ftests[id].name;
                    if (!hash[condmod] && ftests[id].trigger == name) {
                        if (result && ftests[id]) {
                            hash[condmod] = true;
                            d.push(condmod);
                        }
                    }
                });
            } else {
                oeach(cond, function(def, condmod) {
                    if (!hash[condmod]) {
                        go = def && ((def.ua && Y.UA[def.ua]) ||
                                     (def.test && def.test(Y, r)));
                        if (go) {
                            hash[condmod] = true;
                            d.push(condmod);
                            m = this.getModule(condmod);
                            if (m) {
                                add = this.getRequires(m);
                                for (j = 0; j < add.length; j++) {
                                    d.push(add[j]);
                                }
                            }
                        }
                    }
                }, this);
            }
        }

        // Create skin modules
        if (mod.skinnable) {
            skindef = this.skin.overrides;
            oeach(YUI.Env.aliases, function(o, n) {
                if (Y.Array.indexOf(o, name) > -1) {
                    skinpar = n;
                }
            });
            if (skindef && (skindef[name] || (skinpar && skindef[skinpar]))) {
                skinname = name;
                if (skindef[skinpar]) {
                    skinname = skinpar;
                }
                for (i = 0; i < skindef[skinname].length; i++) {
                    skinmod = this._addSkin(skindef[skinname][i], name);
                    d.push(skinmod);
                }
            } else {
                skinmod = this._addSkin(this.skin.defaultSkin, name);
                d.push(skinmod);
            }
        }

        mod._parsed = false;

        if (intl) {

            if (mod.lang && !mod.langPack && Y.Intl) {
                lang = Y.Intl.lookupBestLang(this.lang || ROOT_LANG, mod.lang);
                packName = this.getLangPackName(lang, name);
                if (packName) {
                    d.unshift(packName);
                }
            }
            d.unshift(INTL);
        }

        mod.expanded_map = YArray.hash(d);

        mod.expanded = YObject.keys(mod.expanded_map);

        return mod.expanded;
    },


    /**
     * Returns a hash of module names the supplied module satisfies.
     * @method getProvides
     * @param {string} name The name of the module.
     * @return {object} what this module provides.
     */
    getProvides: function(name) {
        var m = this.getModule(name), o, s;
            // supmap = this.provides;

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
     * property.
     * @method calculate
     * @param {object} o optional options object.
     * @param {string} type optional argument to prune modules.
     */
    calculate: function(o, type) {
        if (o || type || this.dirty) {

            if (o) {
                this._config(o);
            }

            if (!this._init) {
                this._setup();
            }

            this._explode();

            if (this.allowRollup) {
                this._rollup();
            } else {
                this._explodeRollups();
            }
            this._reduce();
            this._sort();
        }
    },
    /**
    * Creates a "psuedo" package for languages provided in the lang array
    * @method _addLangPack
    * @param {String} lang The language to create
    * @param {Object} m The module definition to create the language pack around
    * @param {String} packName The name of the package (e.g: lang/datatype-date-en-US)
    * @return {Object} The module definition
    */
    _addLangPack: function(lang, m, packName) {
        var name = m.name,
            packPath,
            existing = this.moduleInfo[packName];

        if (!existing) {

            packPath = _path((m.pkg || name), packName, JS, true);

            this.addModule({ path: packPath,
                             intl: true,
                             langPack: true,
                             ext: m.ext,
                             group: m.group,
                             supersedes: [] }, packName);

            if (lang) {
                Y.Env.lang = Y.Env.lang || {};
                Y.Env.lang[lang] = Y.Env.lang[lang] || {};
                Y.Env.lang[lang][name] = true;
            }
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
        var info = this.moduleInfo, name, i, j, m, l,
            packName;

        for (name in info) {
            if (info.hasOwnProperty(name)) {
                m = info[name];
                if (m) {

                    // remove dups
                    //m.requires = YObject.keys(YArray.hash(m.requires));
                    m.requires = YArray.dedupe(m.requires);

                    // Create lang pack modules
                    if (m.lang && m.lang.length) {
                        // Setup root package if the module has lang defined,
                        // it needs to provide a root language pack
                        packName = this.getLangPackName(ROOT_LANG, name);
                        this._addLangPack(null, m, packName);
                    }

                }
            }
        }


        //l = Y.merge(this.inserted);
        l = {};

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
            for (i = 0; i < this.force.length; i++) {
                if (this.force[i] in l) {
                    delete l[this.force[i]];
                }
            }
        }

        Y.mix(this.loaded, l);

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
        var r = this.required, m, reqs, done = {},
            self = this;

        // the setup phase is over, all modules have been created
        self.dirty = false;

        self._explodeRollups();
        r = self.required;
        
        oeach(r, function(v, name) {
            if (!done[name]) {
                done[name] = true;
                m = self.getModule(name);
                if (m) {
                    var expound = m.expound;

                    if (expound) {
                        r[expound] = self.getModule(expound);
                        reqs = self.getRequires(r[expound]);
                        Y.mix(r, YArray.hash(reqs));
                    }

                    reqs = self.getRequires(m);
                    Y.mix(r, YArray.hash(reqs));
                }
            }
        });

    },
    /**
    * Get's the loader meta data for the requested module
    * @method getModule
    * @param {String} mname The module name to get
    * @return {Object} The module metadata
    */
    getModule: function(mname) {
        //TODO: Remove name check - it's a quick hack to fix pattern WIP
        if (!mname) {
            return null;
        }

        var p, found, pname,
            m = this.moduleInfo[mname],
            patterns = this.patterns;

        // check the patterns library to see if we should automatically add
        // the module with defaults
        if (!m) {
            for (pname in patterns) {
                if (patterns.hasOwnProperty(pname)) {
                    p = patterns[pname];

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
                    p.action.call(this, mname, pname);
                } else {
                    // ext true or false?
                    m = this.addModule(Y.merge(found), mname);
                    m.temp = true;
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
     * @return {object} the reduced dependency hash.
     * @private
     */
    _reduce: function(r) {

        r = r || this.required;

        var i, j, s, m, type = this.loadType,
        ignore = this.ignore ? YArray.hash(this.ignore) : false;

        for (i in r) {
            if (r.hasOwnProperty(i)) {
                m = this.getModule(i);
                // remove if already loaded
                if (((this.loaded[i] || ON_PAGE[i]) &&
                        !this.forceMap[i] && !this.ignoreRegistered) ||
                        (type && m && m.type != type)) {
                    delete r[i];
                }
                if (ignore && ignore[i]) {
                    delete r[i];
                }
                // remove anything this module supersedes
                s = m && m.supersedes;
                if (s) {
                    for (j = 0; j < s.length; j++) {
                        if (s[j] in r) {
                            delete r[s[j]];
                        }
                    }
                }
            }
        }

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

        _queue.running = false;

        var onEnd = this.onEnd;
        if (onEnd) {
            onEnd.call(this.context, {
                msg: msg,
                data: this.data,
                success: success
            });
        }
        this._continue();
    },
    /**
    * The default Loader onSuccess handler, calls this.onSuccess with a payload
    * @method _onSuccess
    * @private
    */
    _onSuccess: function() {
        var self = this, skipped = Y.merge(self.skipped), fn,
            failed = [], rreg = self.requireRegistration,
            success, msg;

        oeach(skipped, function(k) {
            delete self.inserted[k];
        });

        self.skipped = {};

        oeach(self.inserted, function(v, k) {
            var mod = self.getModule(k);
            if (mod && rreg && mod.type == JS && !(k in YUI.Env.mods)) {
                failed.push(k);
            } else {
                Y.mix(self.loaded, self.getProvides(k));
            }
        });

        fn = self.onSuccess;
        msg = (failed.length) ? 'notregistered' : 'success';
        success = !(failed.length);
        if (fn) {
            fn.call(self.context, {
                msg: msg,
                data: self.data,
                success: success,
                failed: failed,
                skipped: skipped
            });
        }
        self._finish(msg, success);
    },
    /**
    * The default Loader onFailure handler, calls this.onFailure with a payload
    * @method _onFailure
    * @private
    */
    _onFailure: function(o) {
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

    /**
    * The default Loader onTimeout handler, calls this.onTimeout with a payload
    * @method _onTimeout
    * @private
    */
    _onTimeout: function() {
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
            // loaded = this.loaded,
            done = {},
            p = 0, l, a, b, j, k, moved, doneKey;

        // keep going until we make a pass without moving anything
        for (;;) {

            l = s.length;
            moved = false;

            // start the loop after items that are already sorted
            for (j = p; j < l; j++) {

                // check the next module on the list to see if its
                // dependencies have been met
                a = s[j];

                // check everything below current item and move if we
                // find a requirement for the current item
                for (k = j + 1; k < l; k++) {
                    doneKey = a + s[k];

                    if (!done[doneKey] && this._requires(a, s[k])) {

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
                    p++;
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
    /**
    * (Unimplemented)
    * @method partial
    * @unimplemented
    */
    partial: function(partial, o, type) {
        this.sorted = partial;
        this.insert(o, type, true);
    },
    /**
    * Handles the actual insertion of script/link tags
    * @method _insert
    * @param {Object} source The YUI instance the request came from
    * @param {Object} o The metadata to include
    * @param {String} type JS or CSS
    * @param {Boolean} [skipcalc=false] Do a Loader.calculate on the meta
    */
    _insert: function(source, o, type, skipcalc) {


        // restore the state at the time of the request
        if (source) {
            this._config(source);
        }

        // build the dependency list
        // don't include type so we can process CSS and script in
        // one pass when the type is not specified.
        if (!skipcalc) {
            this.calculate(o);
        }

        this.loadType = type;

        if (!type) {

            var self = this;

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
    /**
    * Once a loader operation is completely finished, process any additional queued items.
    * @method _continue
    * @private
    */
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
     * @param {object} o optional options object.
     * @param {string} type the type of dependency to insert.
     */
    insert: function(o, type, skipsort) {
        var self = this, copy = Y.merge(this);
        delete copy.require;
        delete copy.dirty;
        _queue.add(function() {
            self._insert(copy, o, type, skipsort);
        });
        this._continue();
    },

    /**
     * Executed every time a module is loaded, and if we are in a load
     * cycle, we attempt to load the next script.  Public so that it
     * is possible to call this if using a method other than
     * Y.register to determine when scripts are fully loaded
     * @method loadNext
     * @param {string} mname optional the name of the module that has
     * been loaded (which is usually why it is time to load the next
     * one).
     */
    loadNext: function(mname) {
        // It is possible that this function is executed due to something
        // else on the page loading a YUI module.  Only react when we
        // are actively loading something
        if (!this._loading) {
            return;
        }

        var s, len, i, m, url, fn, msg, attr, group, groupName, j, frag,
            comboSource, comboSources, mods, combining, urls, comboBase,
            self = this,
            type = self.loadType,
            handleSuccess = function(o) {
                self.loadNext(o.data);
            },
            handleCombo = function(o) {
                self._combineComplete[type] = true;
                var i, len = combining.length;

                for (i = 0; i < len; i++) {
                    self.inserted[combining[i]] = true;
                }

                handleSuccess(o);
            };

        if (self.combine && (!self._combineComplete[type])) {

            combining = [];

            self._combining = combining;
            s = self.sorted;
            len = s.length;

            // the default combo base
            comboBase = self.comboBase;

            url = comboBase;
            urls = [];

            comboSources = {};

            for (i = 0; i < len; i++) {
                comboSource = comboBase;
                m = self.getModule(s[i]);
                groupName = m && m.group;
                if (groupName) {

                    group = self.groups[groupName];

                    if (!group.combine) {
                        m.combine = false;
                        continue;
                    }
                    m.combine = true;
                    if (group.comboBase) {
                        comboSource = group.comboBase;
                    }

                    if ("root" in group && L.isValue(group.root)) {
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

                    for (i = 0; i < len; i++) {
                        // m = self.getModule(s[i]);
                        m = mods[i];

                        // Do not try to combine non-yui JS unless combo def
                        // is found
                        if (m && (m.type === type) && (m.combine || !m.ext)) {

                            frag = ((L.isValue(m.root)) ? m.root : self.root) + m.path;

                            if ((url !== j) && (i <= (len - 1)) &&
                            ((frag.length + url.length) > self.maxURLLength)) {
                                //Hack until this is rewritten to use an array and not string concat:
                                if (url.substr(url.length - 1, 1) === self.comboSep) {
                                    url = url.substr(0, (url.length - 1));
                                }
                                urls.push(self._filter(url));
                                url = j;
                            }

                            url += frag;
                            if (i < (len - 1)) {
                                url += self.comboSep;
                            }

                            combining.push(m.name);
                        }

                    }

                    if (combining.length && (url != j)) {
                        //Hack until this is rewritten to use an array and not string concat:
                        if (url.substr(url.length - 1, 1) === self.comboSep) {
                            url = url.substr(0, (url.length - 1));
                        }
                        urls.push(self._filter(url));
                    }
                }
            }

            if (combining.length) {


                // if (m.type === CSS) {
                if (type === CSS) {
                    fn = Y.Get.css;
                    attr = self.cssAttributes;
                } else {
                    fn = Y.Get.script;
                    attr = self.jsAttributes;
                }

                fn(urls, {
                    data: self._loading,
                    onSuccess: handleCombo,
                    onFailure: self._onFailure,
                    onTimeout: self._onTimeout,
                    insertBefore: self.insertBefore,
                    charset: self.charset,
                    attributes: attr,
                    timeout: self.timeout,
                    autopurge: false,
                    context: self
                });

                return;

            } else {
                self._combineComplete[type] = true;
            }
        }

        if (mname) {

            // if the module that was just loaded isn't what we were expecting,
            // continue to wait
            if (mname !== self._loading) {
                return;
            }


            // The global handler that is called when each module is loaded
            // will pass that module name to this function.  Storing this
            // data to avoid loading the same module multiple times
            // centralize this in the callback
            self.inserted[mname] = true;
            // self.loaded[mname] = true;

            // provided = self.getProvides(mname);
            // Y.mix(self.loaded, provided);
            // Y.mix(self.inserted, provided);

            if (self.onProgress) {
                self.onProgress.call(self.context, {
                        name: mname,
                        data: self.data
                    });
            }
        }

        s = self.sorted;
        len = s.length;

        for (i = 0; i < len; i = i + 1) {
            // this.inserted keeps track of what the loader has loaded.
            // move on if this item is done.
            if (s[i] in self.inserted) {
                continue;
            }

            // Because rollups will cause multiple load notifications
            // from Y, loadNext may be called multiple times for
            // the same module when loading a rollup.  We can safely
            // skip the subsequent requests
            if (s[i] === self._loading) {
                return;
            }

            // log("inserting " + s[i]);
            m = self.getModule(s[i]);

            if (!m) {
                if (!self.skipped[s[i]]) {
                    msg = 'Undefined module ' + s[i] + ' skipped';
                    // self.inserted[s[i]] = true;
                    self.skipped[s[i]] = true;
                }
                continue;

            }

            group = (m.group && self.groups[m.group]) || NOT_FOUND;

            // The load type is stored to offer the possibility to load
            // the css separately from the script.
            if (!type || type === m.type) {
                self._loading = s[i];

                if (m.type === CSS) {
                    fn = Y.Get.css;
                    attr = self.cssAttributes;
                } else {
                    fn = Y.Get.script;
                    attr = self.jsAttributes;
                }

                url = (m.fullpath) ? self._filter(m.fullpath, s[i]) :
                      self._url(m.path, s[i], group.base || m.base);

                fn(url, {
                    data: s[i],
                    onSuccess: handleSuccess,
                    insertBefore: self.insertBefore,
                    charset: self.charset,
                    attributes: attr,
                    onFailure: self._onFailure,
                    onTimeout: self._onTimeout,
                    timeout: self.timeout,
                    autopurge: false,
                    context: self
                });

                return;
            }
        }

        // we are finished
        self._loading = null;

        fn = self._internalCallback;

        // internal callback for loading css first
        if (fn) {
            self._internalCallback = null;
            fn.call(self);
        } else {
            self._onSuccess();
        }
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
    _filter: function(u, name) {
        var f = this.filter,
            hasFilter = name && (name in this.filters),
            modFilter = hasFilter && this.filters[name];

        if (u) {
            if (hasFilter) {
                f = (L.isString(modFilter)) ?
                    this.FILTER_DEFS[modFilter.toUpperCase()] || null :
                    modFilter;
            }
            if (f) {
                u = u.replace(new RegExp(f.searchExp, 'g'), f.replaceStr);
            }
        }

        return u;
    },

    /**
     * Generates the full url for a module
     * @method _url
     * @param {string} path the path fragment.
     * @param {String} name The name of the module
     * @pamra {String} [base=self.base] The base url to use
     * @return {string} the full url.
     * @private
     */
    _url: function(path, name, base) {
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
        var self = this, i, m, url, out = { js: [], css: [] };

        if (calc) {
            self.calculate();
        }
        s = s || self.sorted;

        for (i = 0; i < s.length; i++) {
            m = self.getModule(s[i]);
            if (m) {
                if (self.combine) {
                    url = self._filter((self.root + m.path), m.name, self.root);
                } else {
                    url = self._filter(m.fullpath, m.name, '') || self._url(m.path, m.name);
                }
                out[m.type].push(url);
            }
        }
        if (self.combine) {
            out.js = [self.comboBase + out.js.join(self.comboSep)];
            out.css = [self.comboBase + out.css.join(self.comboSep)];
        }

        return out;
    },
    /**
    * Returns an Object hash of hashes built from `loader.sorted` or from an arbitrary list of sorted modules.
    * @method hash
    * @private
    * @param {Boolean} [calc=false] Perform a loader.calculate() before anything else
    * @param {Array} [s=loader.sorted] An override for the loader.sorted array
    * @return {Object} Object hash (js and css) of two object hashes of file lists, with the module name as the key
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
    *        var out = loader.hash(true);
    *
    */
    hash: function(calc, s) {
        var self = this, i, m, url, out = { js: {}, css: {} };

        if (calc) {
            self.calculate();
        }
        s = s || self.sorted;

        for (i = 0; i < s.length; i++) {
            m = self.getModule(s[i]);
            if (m) {
                url = self._filter(m.fullpath, m.name, '') || self._url(m.path, m.name);
                out[m.type][m.name] = url;
            }
        }

        return out;
    }
};



}, '@VERSION@' ,{requires:['get']});
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
Y.Loader.prototype._rollup = function() {
    var i, j, m, s, r = this.required, roll,
        info = this.moduleInfo, rolled, c, smod;

    // find and cache rollup modules
    if (this.dirty || !this.rollups) {
        this.rollups = {};
        for (i in info) {
            if (info.hasOwnProperty(i)) {
                m = this.getModule(i);
                // if (m && m.rollup && m.supersedes) {
                if (m && m.rollup) {
                    this.rollups[i] = m;
                }
            }
        }

        this.forceMap = (this.force) ? Y.Array.hash(this.force) : {};
    }

    // make as many passes as needed to pick up rollup rollups
    for (;;) {
        rolled = false;

        // go through the rollup candidates
        for (i in this.rollups) {
            if (this.rollups.hasOwnProperty(i)) {
                // there can be only one, unless forced
                if (!r[i] && ((!this.loaded[i]) || this.forceMap[i])) {
                    m = this.getModule(i);
                    s = m.supersedes || [];
                    roll = false;

                    // @TODO remove continue
                    if (!m.rollup) {
                        continue;
                    }

                    c = 0;

                    // check the threshold
                    for (j = 0; j < s.length; j++) {
                        smod = info[s[j]];

                        // if the superseded module is loaded, we can't
                        // load the rollup unless it has been forced.
                        if (this.loaded[s[j]] && !this.forceMap[s[j]]) {
                            roll = false;
                            break;
                        // increment the counter if this module is required.
                        // if we are beyond the rollup threshold, we will
                        // use the rollup module
                        } else if (r[s[j]] && m.type == smod.type) {
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
};


}, '@VERSION@' ,{requires:['loader-base']});
YUI.add('loader-yui3', function(Y) {

/* This file is auto-generated by src/loader/scripts/meta_join.py */

/**
 * YUI 3 module metadata
 * @module loader
 * @submodule yui3
 */
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
    "anim-xy": {
        "requires": [
            "anim-base", 
            "node-screen"
        ]
    }, 
    "app": {
        "use": [
            "controller", 
            "model", 
            "model-list", 
            "view"
        ]
    }, 
    "array-extras": {}, 
    "array-invoke": {}, 
    "arraylist": {}, 
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
            "event-custom"
        ]
    }, 
    "attribute-complex": {
        "requires": [
            "attribute-base"
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
            "attribute-base"
        ]
    }, 
    "base-build": {
        "requires": [
            "base-base"
        ]
    }, 
    "base-pluginhost": {
        "requires": [
            "base-base", 
            "pluginhost"
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
            "en", 
            "ru"
        ], 
        "requires": [
            "calendar-base", 
            "calendarnavigator"
        ], 
        "skinnable": true
    }, 
    "calendar-base": {
        "lang": [
            "en", 
            "ru"
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
            "classnamemanager"
        ], 
        "skinnable": true
    }, 
    "charts": {
        "requires": [
            "dom", 
            "datatype-number", 
            "datatype-date", 
            "event-custom", 
            "event-mouseenter", 
            "widget", 
            "widget-position", 
            "widget-stack", 
            "graphics"
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
            "es"
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
        "optional": [
            "querystring-parse"
        ], 
        "requires": [
            "array-extras", 
            "base-build", 
            "history"
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
            "datatable-base", 
            "datatable-datasource", 
            "datatable-sort", 
            "datatable-scroll"
        ]
    }, 
    "datatable-base": {
        "requires": [
            "recordset-base", 
            "widget", 
            "substitute", 
            "event-mouseenter"
        ], 
        "skinnable": true
    }, 
    "datatable-datasource": {
        "requires": [
            "datatable-base", 
            "plugin", 
            "datasource-local"
        ]
    }, 
    "datatable-scroll": {
        "requires": [
            "datatable-base", 
            "plugin", 
            "stylesheet"
        ]
    }, 
    "datatable-sort": {
        "lang": [
            "en"
        ], 
        "requires": [
            "datatable-base", 
            "plugin", 
            "recordset-sort"
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
    return (Y.config.win && ('ontouchstart' in Y.config.win && !Y.UA.chrome));
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

    var testFeature = Y.Features.test,
        addFeature = Y.Features.add,
        WINDOW = Y.config.win,
        DOCUMENT = Y.config.doc,
        DOCUMENT_ELEMENT = 'documentElement',
        ret = false;

    addFeature('style', 'computedStyle', {
        test: function() {
            return WINDOW && 'getComputedStyle' in WINDOW;
        }
    });

    addFeature('style', 'opacity', {
        test: function() {
            return DOCUMENT && 'opacity' in DOCUMENT[DOCUMENT_ELEMENT].style;
        }
    });

    ret =  (!testFeature('style', 'opacity') &&
            !testFeature('style', 'computedStyle'));

    return ret;
}, 
            "trigger": "dom-style"
        }, 
        "requires": [
            "dom-style"
        ]
    }, 
    "dump": {}, 
    "editor": {
        "use": [
            "frame", 
            "selection", 
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
            "selection"
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
            "editor-base"
        ]
    }, 
    "editor-tab": {
        "requires": [
            "editor-base"
        ]
    }, 
    "escape": {}, 
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
            "event-outside"
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
    var imp = Y.config.doc && Y.config.doc.implementation;
    return (imp && (!imp.hasFeature('Events', '2.0')));
}, 
            "trigger": "node-base"
        }, 
        "requires": [
            "node-base"
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
            "node-base"
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
    "frame": {
        "requires": [
            "base", 
            "node", 
            "selector-css3", 
            "substitute", 
            "yui-throttle"
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
            "pluginhost"
        ]
    }, 
    "graphics-canvas": {
        "condition": {
            "name": "graphics-canvas", 
            "test": function(Y) {
    var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
	return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (canvas && canvas.getContext && canvas.getContext("2d")));
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
    var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
	return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (canvas && canvas.getContext && canvas.getContext("2d")));
}, 
            "trigger": "graphics"
        }
    }, 
    "graphics-svg": {
        "condition": {
            "name": "graphics-svg", 
            "test": function(Y) {
    var DOCUMENT = Y.config.doc;
	return (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
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
    var DOCUMENT = Y.config.doc;
	return (DOCUMENT && DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
}, 
            "trigger": "graphics"
        }
    }, 
    "graphics-vml": {
        "condition": {
            "name": "graphics-vml", 
            "test": function(Y) {
    var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
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
    var DOCUMENT = Y.config.doc,
		canvas = DOCUMENT && DOCUMENT.createElement("canvas");
    return (DOCUMENT && !DOCUMENT.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") && (!canvas || !canvas.getContext || !canvas.getContext("2d")));
}, 
            "trigger": "graphics"
        }
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
    var docMode = Y.config.doc && Y.config.doc.documentMode;

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
            "datatype-xml"
        ]
    }, 
    "json": {
        "use": [
            "json-parse", 
            "json-stringify"
        ]
    }, 
    "json-parse": {}, 
    "json-stringify": {}, 
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
    "loader": {
        "use": [
            "loader-base", 
            "loader-rollup", 
            "loader-yui3"
        ]
    }, 
    "loader-base": {
        "requires": [
            "get"
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
            "event-simulate"
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
            "widget-stdmod", 
            "widget-position", 
            "widget-position-align", 
            "widget-stack", 
            "widget-position-constrain", 
            "widget-modality", 
            "widget-autohide", 
            "widget-buttons"
        ], 
        "skinnable": true
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
    "rls": {
        "requires": [
            "get", 
            "features"
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
            "plugin"
        ], 
        "skinnable": true
    }, 
    "scrollview-paginator": {
        "requires": [
            "plugin"
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
    "selection": {
        "requires": [
            "node"
        ]
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
    var DOCUMENT = Y.config.doc,
        ret = DOCUMENT && !('querySelectorAll' in DOCUMENT);

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
            "substitute"
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
    "stylesheet": {}, 
    "substitute": {
        "optional": [
            "dump"
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
    "swfdetect": {}, 
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
    "text-data-accentfold": {}, 
    "text-data-wordbreak": {}, 
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
    var DOCUMENT = Y.config.doc,
        node = (DOCUMENT) ? DOCUMENT.documentElement: null,
        ret = true;

    if (node && node.style) {
        ret = !('MozTransition' in node.style || 'WebkitTransition' in node.style);
    } 

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
            "event-custom", 
            "node", 
            "base", 
            "swf"
        ]
    }, 
    "view": {
        "requires": [
            "base-build", 
            "node-event-delegate"
        ]
    }, 
    "widget": {
        "use": [
            "widget-base", 
            "widget-htmlparser", 
            "widget-uievents", 
            "widget-skin"
        ]
    }, 
    "widget-anim": {
        "requires": [
            "plugin", 
            "anim-base", 
            "widget"
        ]
    }, 
    "widget-autohide": {
        "requires": [
            "widget", 
            "event-outside", 
            "base-build", 
            "event-key"
        ], 
        "skinnable": false
    }, 
    "widget-base": {
        "requires": [
            "attribute", 
            "event-focus", 
            "base-base", 
            "base-pluginhost", 
            "node-base", 
            "node-style", 
            "classnamemanager"
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
            "widget", 
            "base-build"
        ], 
        "skinnable": false
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
            "widget", 
            "event-outside", 
            "base-build"
        ], 
        "skinnable": false
    }, 
    "widget-parent": {
        "requires": [
            "base-build", 
            "arraylist", 
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
            "widget-base", 
            "node-event-delegate"
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
    "yui-rls": {}, 
    "yui-throttle": {
        "requires": [
            "yui-base"
        ]
    }
};
YUI.Env[Y.version].md5 = '516f2598fb0cef4337e32df3a89e5124';


}, '@VERSION@' ,{requires:['loader-base']});


YUI.add('yui', function(Y){}, '@VERSION@' ,{use:['yui-base','get','features','intl-base','yui-log','yui-later','loader-base', 'loader-rollup', 'loader-yui3' ]});

