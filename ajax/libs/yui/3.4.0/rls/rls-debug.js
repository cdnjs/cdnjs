YUI.add('rls', function(Y) {

/**
* RLS (Remote Loader Service) Support
* @module yui
* @submodule rls
* @class rls
*/


Y.rls_handleTimeout = function(o) {
    Y.Get.abort(o.tId);
    o.purge();
    o.message = 'RLS request timed out, fetching loader';
    Y.rls_failure(o);
};

Y.rls_handleFailure = function(o) {
    o.message = 'RLS request failed, fetching loader';
    Y.rls_failure(o);
};

Y.rls_failure = function(o) {
    Y.log(o.message, 'warn', 'rls');
    YUI.Env.rls_disabled = true;
    Y.config.use_rls = false;
    if (o.data) {
        o.data.unshift('loader');
        Y._use(o.data, function(Y, response) {
            Y._notify(Y.rls_callback, response, o.data);
            //Call the RLS done method, so it can progress the queue
            Y.rls_advance();
        });
    }
};

/**
* Checks the environment for local modules and deals with them before firing off an RLS request.
* This needs to make sure that all dependencies are calculated before it can make an RLS request in
* order to make sure all remote dependencies are evaluated and their requirements are met.
* @method rls_locals
* @private
* @param {YUI} instance The YUI Instance we are working with.
* @param {Array} argz The requested modules.
* @param {Callback} cb The callback to be executed when we are done
* @param {YUI} cb.instance The instance is passed back to the callback
* @param {Array} cb.argz The modified list or modules needed to require
*/
Y.rls_locals = function(instance, argz, cb) {
    if (YUI.Env.rls_disabled) {
        var data = {
            message: 'RLS is disabled, moving to loader',
            data: argz
        };
        Y.rls_failure(data);
        return;
    }
    if (instance.config.modules) {
        var files = [], asked = Y.Array.hash(argz),
            PATH = 'fullpath', f,
            mods = instance.config.modules;

        for (f in mods) {
            if (mods[f][PATH]) {
                if (asked[f]) {
                    files.push(mods[f][PATH]);
                    if (mods[f].requires) {
                        Y.Array.each(mods[f].requires, function(f) {
                            if (!YUI.Env.mods[f]) {
                                if (mods[f]) {
                                    if (mods[f][PATH]) {
                                        files.push(mods[f][PATH]);
                                        argz.push(f);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        if (files.length) {
            Y.Get.script(files, {
                onEnd: function(o) {
                    cb(instance, argz);
                },
                data: argz
            });
        } else {
            cb(instance, argz);
        }
    } else {
        cb(instance, argz);
    }
};


/**
* Check the environment and the local config to determine if a module has already been registered.
* @method rls_needs
* @private
* @param {String} mod The module to check
* @param {YUI} instance The instance to check against.
*/
Y.rls_needs = function(mod, instance) {
    var self = instance || this,
        config = self.config, i,
        m = YUI.Env.aliases[mod];

    if (m) {
        Y.log('We have an alias (' + mod + '), are all the deps available?', 'info', 'rls');
        for (i = 0; i < m.length; i++) {
            if (Y.rls_needs(m[i])) {
                Y.log('Needs (' + mod + ')', 'info', 'rls');
                return true;
            }
        }
        Y.log('Does not need (' + mod + ')', 'info', 'rls');
        return false;
    }

    if (!YUI.Env.mods[mod] && !(config.modules && config.modules[mod])) {
        Y.log('Needs (' + mod + ')', 'info', 'rls');
        return true;
    }
    Y.log('Does not need (' + mod + ')', 'info', 'rls');
    return false;
};

/**
 * Implentation for building the remote loader service url.
 * @method _rls
 * @private
 * @param {Array} what the requested modules.
 * @since 3.2.0
 * @return {string} the url for the remote loader service call, returns false if no modules are required to be fetched (they are in the ENV already).
 */
Y._rls = function(what) {
    //what.push('intl');
    Y.log('Issuing a new RLS Request', 'info', 'rls');
    var config = Y.config,
        mods = config.modules,
        YArray = Y.Array,
        YObject = Y.Object,

        // the configuration
        rls = config.rls || {
            m: 1, // required in the template
            v: Y.version,
            gv: config.gallery,
            env: 1, // required in the template
            lang: config.lang,
            '2in3v': config['2in3'],
            '2v': config.yui2,
            filt: config.filter,
            filts: config.filters,
            ignore: config.ignore,
            tests: 1 // required in the template
        },
        // The rls base path
        rls_base = config.rls_base || 'http://l.yimg.com/py/load?httpcache=rls-seed&gzip=1&',

        // the template
        rls_tmpl = config.rls_tmpl || function() {
            var s = [], param;
            for (param in rls) {
                if (param in rls && rls[param]) {
                    s.push(param + '={' + param + '}');
                }
            }
            return s.join('&');
        }(),
        m = [], asked = {}, o, d, mod, a, j,
        w = [], 
        i, len = what.length,
        url;
    
    //Explode our aliases..
    for (i = 0; i < len; i++) {
        a = YUI.Env.aliases[what[i]];
        if (a) {
            for (j = 0; j < a.length; j++) {
                w.push(a[j]);
            }
        } else {
            w.push(what[i]);
        }

    }
    what = w;
    len = what.length;

    
    for (i = 0; i < len; i++) {
        asked[what[i]] = 1;
        if (Y.rls_needs(what[i])) {
            Y.log('Did not find ' + what[i] + ' in YUI.Env.mods or config.modules adding to RLS', 'info', 'rls');
            m.push(what[i]);
        } else {
            Y.log(what[i] + ' was skipped from RLS', 'info', 'rls');
        }
    }

    if (mods) {
        for (i in mods) {
            if (asked[i] && mods[i].requires && !mods[i].noop) {
                len = mods[i].requires.length;
                for (o = 0; o < len; o++) {
                    mod = mods[i].requires[o];
                    if (Y.rls_needs(mod)) {
                        m.push(mod);
                    } else {
                        d = YUI.Env.mods[mod] || mods[mod];
                        if (d) {
                            d = d.details || d;
                            if (!d.noop) {
                                if (d.requires) {
                                    YArray.each(d.requires, function(o) {
                                        if (Y.rls_needs(o)) {
                                            m.push(o);
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    YObject.each(YUI.Env.mods, function(i) {
        if (asked[i.name]) {
            if (i.details && i.details.requires) {
                if (!i.noop) {
                    YArray.each(i.details.requires, function(o) {
                        if (Y.rls_needs(o)) {
                            m.push(o);
                        }
                    });
                }
            }
        }
    });

    function addIfNeeded(module) {
        if (Y.rls_needs(module)) {
            m.unshift(module);
        }
    }

    //Add in the debug modules
    if (rls.filt === 'debug') {
        YArray.each(['dump', 'yui-log'], addIfNeeded);
    }
    //If they have a groups config, add the loader-base module
    if (Y.config.groups) {
        addIfNeeded('loader-base');
    }

    m = YArray.dedupe(m);

    //Strip Duplicates
    m = YArray.dedupe(m);
    what = YArray.dedupe(what);

    if (!m.length) {
        //Return here if there no modules to load.
        Y.log('RLS request terminated, no modules in m', 'warn', 'rls');
        return false;
    }
    // update the request
    rls.m = m.sort(); // cache proxy optimization
    rls.env = [].concat(YObject.keys(YUI.Env.mods), YArray.dedupe(YUI._rls_skins)).sort();
    rls.tests = Y.Features.all('load', [Y]);

    url = Y.Lang.sub(rls_base + rls_tmpl, rls);

    config.rls = rls;
    config.rls_tmpl = rls_tmpl;

    YUI._rls_active = {
        asked: what,
        attach: m,
        inst: Y,
        url: url
    };
    return url;
};

/**
*
* @method rls_oncomplete
* @param {Callback} cb The callback to execute when the RLS request is complete
*/
Y.rls_oncomplete = function(cb) {
    YUI._rls_active.cb = cb;
};

Y.rls_advance = function() {
    var G_ENV = YUI.Env;

    G_ENV._rls_in_progress = false;
    if (G_ENV._rls_queue.size()) {
        G_ENV._rls_queue.next()();
    }
};

/**
* Calls the callback registered with Y.rls_oncomplete when the RLS request (and it's dependency requests) is done.
* @method rls_done
* @param {Array} data The modules loaded
*/
Y.rls_done = function(data) {
    Y.log('RLS Request complete', 'info', 'rls');
    data.success = true;
    YUI._rls_active.cb(data);
};

/**
* Hash to hang on to the calling RLS instance so we can deal with the return from the server.
* @property _rls_active
* @private
* @type Object
* @static
*/
if (!YUI._rls_active) {
    YUI._rls_active = {};
}

/**
* An array of skins loaded via RLS to populate the ENV with when making future requests.
* @property _rls_skins
* @private
* @type Array
* @static
*/
if (!YUI._rls_skins) {
    YUI._rls_skins = [];
}

/**
* 
* @method $rls
* @private
* @static
* @param {Object} req The data returned from the RLS server
* @param {String} req.css Does this request need CSS? If so, load the same RLS url with &css=1 attached
* @param {Array} req.module The sorted list of modules to attach to the page.
*/
if (!YUI.$rls) {
    YUI.$rls = function(req) {
        var rls_active = YUI._rls_active,
            Y = rls_active.inst;
        if (Y) {
            Y.log('RLS request received, processing', 'info', 'rls');
            if (req.error) {
                Y.rls_failure({
                    message: req.error,
                    data: req.modules
                });
            }
            if (YUI.Env && YUI.Env.rls_disabled) {
                Y.log('RLS processing on this instance is disabled.', 'warn', 'rls');
                return;
            }
            if (req.css && Y.config.fetchCSS) {
                Y.Get.css(rls_active.url + '&css=1');
            }
            if (req.modules && !req.css) {
                if (req.modules.length) {
                    var loadInt = Y.Array.some(req.modules, function(v) {
                        return (v.indexOf('lang') === 0);
                    });
                    if (loadInt) {
                        req.modules.unshift('intl');
                    }
                }
            
                Y.Env.bootstrapped = true;
                Y.Array.each(req.modules, function(v) {
                    if (v.indexOf('skin-') > -1) {
                        Y.log('Found skin (' + v + ') caching module for future requests', 'info', 'rls');
                        YUI._rls_skins.push(v);
                    }
                });

                Y._attach([].concat(req.modules, rls_active.asked));
                
                var additional = req.missing;

                if (Y.config.groups) {
                    if (!additional) {
                        additional = [];
                    }
                    additional = [].concat(additional, rls_active.what);
                }

                if (additional && Y.Loader) {
                    Y.log('Making extra Loader request', 'info', 'rls');
                    var loader = new Y.Loader(rls_active.inst.config);
                    loader.onEnd = Y.rls_done;
                    loader.context = Y;
                    loader.data = additional;
                    loader.ignoreRegistered = false;
                    loader.require(additional);
                    loader.insert(null, (Y.config.fetchCSS) ? null : 'js');
                } else {
                    Y.rls_done({ data: req.modules });
                }
            }
        }
    };
}


}, '@VERSION@' ,{requires:['get','features']});
