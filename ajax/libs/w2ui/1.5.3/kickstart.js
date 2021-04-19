/* kickstart 0.2.x (nightly) (c) http://w2ui.com/kickstart, vitmalina@gmail.com */
/************************************************
*  Library: KickStart - Minimalistic Framework
*   - Dependencies: jQuery
**/

var kickStart = (function () {
    // public scope

    var app = {
        _conf   : {
            name    : 'unnamed',
            baseURL : '',
            cache   : false,
            modules : {},
            verbose : true
        },
        define    : define,
        require   : require,
        register  : register
    };
    if (!window.app) window.app = app;
    return app;

    // ===========================================
    // -- Define modules

    function define(mod, callBack) {
        // if string - it is path to the file
        if (typeof mod == 'string') {
            $.ajax({
                url      : app._conf.baseURL + mod,
                dataType : 'text',
                cache    : app._conf.cache,
                success : function (data, success, xhr) {
                    if (success != 'success') {
                        if (app._conf.verbose) console.log('ERROR: error while loading module definition from "'+ mod +'".');
                        return;
                    }
                    try {
                        mod = JSON.parse(data);
                    } catch (e) {
                        if (app._conf.verbose) console.log('ERROR: not valid JSON file  "'+ mod +'".\n'+ e);
                        return;
                    }
                    _process(mod);
                    if (typeof callBack == 'function') callBack();

                },
                error : function (data, err, errData) {
                    if (app._conf.verbose) console.log('ERROR: error while loading module definition from "'+ mod +'".');
                }
            });
        } else {
            _process(mod);
            if (typeof callBack == 'function') callBack();
        }

        function _process(mod) {
            for (var m in mod) {
                if (Array.isArray(mod[m].assets)) {
                    if (app._conf.modules.hasOwnProperty(m)) {
                        if (app._conf.verbose) console.log('ERROR: module ' + m + ' is already registered.');
                    }
                    app._conf.modules[m] = $.extend({ assets: {} }, mod[m], { ready: false, files: {} });
                } else {
                    _process(mod[m]);
                }
            }
        }
    }

    // ===========================================
    // -- Register module

    function register(name, moduleFunction) {
        // check if modules id defined
        if (app.hasOwnProperty(name)) {
            if (app._conf.verbose) console.log('ERROR: Namespace '+ name +' is already registered');
            return false;
        }
        if (!app._conf.modules.hasOwnProperty(name)) {
            if (app._conf.verbose) console.log('ERROR: Namespace '+ name +' is not defined, first define it with kickStart.define');
            return false;
        }
        // register module
        var mod = app._conf.modules[name];
        // init module
        app[name] = moduleFunction(mod.files, mod);
        app._conf.modules[name].ready = true;
        return;
    }

    // ===========================================
    // -- Load Modules

    function require(names, callBack) { // returns promise
        if (!$.isArray(names)) names = [names];
        var modCount = names.length;
        var failed  = false;
        var promise = {
            ready: function (callBack) {     // a module loaded
                promise._ready = callBack;
                return promise;
            },
            fail: function (callBack) {     // a module loading failed
                promise._fail = callBack;
                return promise;
            },
            done: function (callBack) {        // all loaded
                promise._done = callBack;
                return promise;
            },
            always: function (callBack) {
                promise._always = callBack;
                return promise;
            }
        };
        setTimeout(function () {
            for (var n in names) {
                var name = names[n];
                // already loaded ?
                if (typeof app[name] != 'undefined') {
                    modCount--;
                    isFinished();
                } else if (typeof app._conf.modules[name] == 'undefined') {
                    if (app._conf.verbose) console.log('ERROR: module ' + name + ' is not defined.');
                } else {
                    (function (name) { // need closure
                        // load dependencies
                        getFiles(app._conf.modules[name].assets.concat([app._conf.modules[name].start]), function (files) {
                            var start = files[app._conf.modules[name].start];
                            delete files[app._conf.modules[name].start];
                            // register assets
                            app._conf.modules[name].files  = files;
                            app._conf.modules[name].ready  = true;
                            // execute start file
                            eval(start); // if in try block, it would not show errors properly
                            // check ready
                            if (typeof promise._ready == 'function') promise._ready(app._conf.modules[name]);
                            modCount--;
                            isFinished();
                        });
                    })(name);
                }
            }
        }, 1);
        // promise need to be returned immediately
        return promise;

        function isFinished() {
            if (modCount == 0) {
                if (failed !== true) {
                    // if (typeof app.conf.done == 'function') app.conf.done(app._conf.modules[name]);
                    if (typeof promise._done == 'function') promise._done(app._conf.modules[name]);
                    if (typeof callBack == 'function') callBack();
                }
                // if (typeof app.conf.always == 'function') app.conf.always(app._conf.modules[name]);
                if (typeof promise._always == 'function') promise._always();
            }
        }
    }

    // ===========================================
    // -- Loads a set of files and returns
    // -- its contents to the callBack function

    function getFiles (files, callBack) {
        var bufferObj = {};
        var bufferLen = files.length;

        for (var i in files) {
            // need a closure
            (function () {
                var index = i;
                var path  = files[i];
                // check if file is loaded in script tag
                var tmp = $('script[path="'+ path +'"]');
                if (tmp.length > 0) {
                    bufferObj[path] = tmp.html();
                    loadDone();
                } else {
                    // load from url source
                    $.ajax({
                        url      : app._conf.baseURL + path,
                        dataType : 'text',
                        cache    : app._conf.cache,
                        success  : function (data, success, xhr) {
                            if (success != 'success') {
                                if (app._conf.verbose) console.log('ERROR: error while getting a file '+ path +'.');
                                return;
                            }
                            bufferObj[path] = xhr.responseText;
                            loadDone();

                        },
                        error : function (data, err, errData) {
                            if (err == 'error') {
                                if (app._conf.verbose) console.log('ERROR: failed to load '+ files[i] +'.');
                            } else {
                                if (app._conf.verbose) console.log('ERROR: file "'+ files[i] + '" is loaded, but with a parsing error(s) in line '+ errData.line +': '+ errData.message);
                                bufferObj[path] = xhr.responseText;
                                loadDone();
                            }
                        }
                    });
                }
            })();
        }
        // internal counter
        function loadDone() {
            bufferLen--;
            if (bufferLen <= 0) callBack(bufferObj);
        }
    }
})();
kickStart.define({ route: { assets: [] }});
kickStart.register('route', function () {
    // private scope
    var app     = kickStart;
    var routes  = {};
    var routeRE = {};

    addListener();

    var obj = {
        init    : init,
        add     : add,
        remove  : remove,
        go      : go,
        set     : set,
        get     : get,
        info    : info,
        process : process,
        list    : list,
        onAdd   : null,
        onRemove: null,
        onRoute : null
    };
    if (typeof w2utils != 'undefined') $.extend(obj, w2utils.event, { handlers: [] });
    return obj;

    /*
    *   Public methods
    */

    function init(route) {
        // default route is passed here
        if (get() === '') {
            go(route);
        } else {
            process();
        }
    }

    function add(route, handler) {
        if (typeof route == 'object') {
            for (var r in route) {
                var tmp = String('/'+ r).replace(/\/{2,}/g, '/');
                routes[tmp] = route[r];
            }
            return app.route;
        }
        route = String('/'+route).replace(/\/{2,}/g, '/');
        // if events are available
        if (typeof app.route.trigger == 'function') {
            var eventData = app.route.trigger({ phase: 'before', type: 'add', target: 'self', route: route, handler: handler });
            if (eventData.isCancelled === true) return false;
        }
        // default behavior
        routes[route] = handler;
        // if events are available
        if (typeof app.route.trigger == 'function') app.route.trigger($.extend(eventData, { phase: 'after' }));
        return app.route;
    }

    function remove(route) {
        route = String('/'+route).replace(/\/{2,}/g, '/');
        // if events are available
        if (typeof app.route.trigger == 'function') {
            var eventData = app.route.trigger({ phase: 'before', type: 'remove', target: 'self', route: route, handler: handler });
            if (eventData.isCancelled === true) return false;
        }
        // default behavior
        delete routes[route];
        delete routeRE[route];
        // if events are available
        if (typeof app.route.trigger == 'function') app.route.trigger($.extend(eventData, { phase: 'after' }));
        return app.route;
    }

    function go(route) {
        route = String('/'+route).replace(/\/{2,}/g, '/');
        window.history.replaceState({}, document.title, '#' + route)
        process()
        return app.route;
    }

    function set(route) {
        route = String('/'+route).replace(/\/{2,}/g, '/');
        window.history.replaceState({}, document.title, '#' + route)
        return app.route;
    }

    function get() {
        return window.location.hash.substr(1).replace(/\/{2,}/g, '/');
    }

    function info() {
        var matches = [];
        var isFound = false;
        var isExact = false;
        // match routes
        var hash = window.location.hash.substr(1).replace(/\/{2,}/g, '/');
        if (hash == '') hash = '/';

        for (var r in routeRE) {
            var params = {};
            var tmp = routeRE[r].path.exec(hash);
            if (tmp != null) { // match
                isFound = true;
                if (!isExact && r.indexOf('*') === -1) {
                    isExact = true;
                }
                var i = 1;
                for (var p in routeRE[r].keys) {
                    params[routeRE[r].keys[p].name] = tmp[i];
                    i++;
                }
                // default handler
                matches.push({ name: r, path: hash, params: params });
            }
        }
        return matches;
    }

    function list() {
        prepare();
        var res = {};
        for (var r in routes) {
            var tmp  = routeRE[r].keys;
            var keys = [];
            for (var t in tmp) keys.push(tmp[t].name);
            res[r] = keys;
        }
        return res;
    }

    function process() {
        prepare();
        // match routes
        var hash = window.location.hash.substr(1).replace(/\/{2,}/g, '/');
        if (hash == '') hash = '/';
        // process route
        var isFound = false;
        var isExact = false;
        var isAutoLoad = false;
        for (var r in routeRE) {
            var params = {};
            var tmp = routeRE[r].path.exec(hash);
            if (tmp != null) { // match
                isFound = true;
                if (!isExact && r.indexOf('*') === -1) {
                    isExact = true;
                }
                var i = 1;
                for (var p in routeRE[r].keys) {
                    params[routeRE[r].keys[p].name] = tmp[i];
                    i++;
                }
                // if events are available
                if (typeof app.route.trigger == 'function') {
                    var eventData = app.route.trigger({ phase: 'before', type: 'route', target: 'self', route: r, params: params });
                    if (eventData.isCancelled === true) return false;
                }
                // default handler
                var res = routes[r]({ name: r, path: hash, params: params }, params);
                // if events are available
                if (typeof app.route.trigger == 'function') app.route.trigger($.extend(eventData, { phase: 'after' }));
                // if hash changed (for example in handler), then do not process rest of old processings
                var current = window.location.hash.substr(1).replace(/\/{2,}/g, '/');
                if (hash !== current) return
            }
        }
        // find if a route matches a module route
        var loadCnt = 0;
        var mods    = app._conf.modules;
        var loading = [];
        for (var name in mods) {
            var mod = mods[name];
            var rt  = mod.route;
            var nearMatch = false;
            if (rt != null) {
                if (typeof rt == 'string') rt = [rt];
                if (Array.isArray(rt)) {
                    rt.forEach(function (str) { checkRoute(str) });
                }
            }
            function checkRoute(str) {
                mod.routeRE = mod.routeRE || {};
                if (mod.routeRE[str] == null) mod.routeRE[str] = prepare(str);
                if (!mod.ready && str && mod.routeRE[str].path.exec(hash) && loading.indexOf(name) == -1) {
                    if (app._conf.verbose) console.log('ROUTER: Auto Load Module "' + name + '"');
                    isAutoLoad = true;
                    loadCnt++;
                    loading.push(name);
                    app.require(name).done(function () {
                        loadCnt--;
                        if (app._conf.modules[name] && loadCnt === 0) process();
                    });
                    return;
                }
            }
        }
        if (!isAutoLoad && !isExact && app._conf.verbose) console.log('ROUTER: Exact route for "' + hash + '" not found');

        if (!isFound) {
            // path not found
            if (typeof app.route.trigger == 'function') {
                var eventData = app.route.trigger({ phase: 'before', type: 'error', target: 'self', hash: hash});
                if (eventData.isCancelled === true) return false;
            }
            if (!isAutoLoad && app._conf.verbose) console.log('ROUTER: Wild card route for "' + hash + '" not found');
            // if events are available
            if (typeof app.route.trigger == 'function') app.route.trigger($.extend(eventData, { phase: 'after' }));
        }
    }

    /*
    *   Private methods
    */

    function prepare(r) {
        if (r != null) {
            return _prepare(r)
        }
        // make sure all routes are parsed to RegEx
        for (var r in routes) {
            if (routeRE[r]) continue;
            routeRE[r] = _prepare(r)
        }

        function _prepare(r) {
            var keys = [];
            var path = r
                .replace(/\/\(/g, '(?:/')
                .replace(/\+/g, '__plus__')
                .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional) {
                    keys.push({ name: key, optional: !! optional });
                    slash = slash || '';
                    return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
                })
                .replace(/([\/.])/g, '\\$1')
                .replace(/__plus__/g, '(.+)')
                .replace(/\*/g, '(.*)');
            return {
                path : new RegExp('^' + path + '$', 'i'),
                keys : keys
            }
        }
    }

    function addListener() {
        if (window.addEventListener) {
            window.addEventListener('hashchange', process, false);
        } else {
            window.attachEvent('onhashchange', process);
        }
    }

    function removeListener() {
        if (window.removeEventListener) {
            window.removeEventListener('hashchange', process);
        } else {
            window.detachEvent('onhashchange', process);
        }
    }
});