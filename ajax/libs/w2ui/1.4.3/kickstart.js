/* kicstart 0.1.x (nightly) (c) http://w2ui.com/kickstart, vitmalina@gmail.com */
/************************************************
*  Library: KickStart - Minimalistic Framework
*   - Dependencies: jQuery
**/

var kickStart = (function () {
    var app = {};

    // public scope    
    app.modules   = {};
    app.config    = {};
    app.define    = define;
    app.require   = require;
    app.register  = register;

    return app;

    // ===========================================
    // -- Define modules

    function define (mod) {
        // if string - it is path to the file
        if (typeof mod == 'string') {
            $.ajax({ 
                url      : mod,
                dataType : 'text',
                cache    : false,
                async    : false, // do it synchronosly - otherwise errors
                success : function (data, success, xhr) {
                    if (success != 'success') {
                        console.log('ERROR: error while loading module definition from "'+ mod +'".');
                        return;
                    }
                    try { 
                        mod = JSON.parse(data); 
                    } catch (e) {
                        console.log('ERROR: not valid JSON file  "'+ mod +'".\n'+ e);
                        return;                        
                    }
                },
                error : function (data, err, errData) {
                    console.log('ERROR: error while loading module definition from "'+ mod +'".');
                }
            });
        }
        if (!$.isArray(mod)) mod = [mod];
        for (var m in mod) {
            if (app.modules.hasOwnProperty(mod[m].name)) {
                console.log('ERROR: module ' + mod[m].name + ' is already registered.');
                return false;
            }
            app.modules[mod[m].name] = $.extend({}, mod[m], { loaded: false, files: {} });
        }
        return true;
    }

    // ===========================================
    // -- Register module

    function register (name, moduleFunction) {
        // check if modules id defined
        if (app.hasOwnProperty(name)) {
            console.log('ERROR: Namespace '+ name +' is already registered');
            return false;
        }
        if (!app.modules.hasOwnProperty(name)) {
            console.log('ERROR: Namespace '+ name +' is not defined, first define it with kickStart.define');
            return false;
        }
        // register module
        var mod = null;
        for (var m in app.modules) {
            if (app.modules[m].name == name) mod = app.modules[m];
        }
        // init module
        app[name] = moduleFunction(mod.files, mod);
        app.modules[name].loaded = true;
        return;
    }

    // ===========================================
    // -- Load Modules

    function require (names, callBack) { // returns promise
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
                } else if (typeof app.modules[name] == 'undefined') { 
                    console.log('ERROR: module ' + name + ' is not defined.');
                } else { 
                    (function (name) { // need closure
                        // load dependencies
                        getFiles(app.modules[name].assets.concat([app.modules[name].main]), function (files) {
                            var main = files[app.modules[name].main];
                            delete files[app.modules[name].main];
                            // register assets
                            app.modules[name].files  = files;
                            app.modules[name].loaded = true;
                            // execute main file
                            try { 
                                eval(main); 
                            } catch (e) { 
                                failed = true;
                                // find error line
                                var err = e.stack.split('\n');
                                var tmp = err[1].match(/<anonymous>:([\d]){1,10}:([\d]{1,10})/gi);
                                if (tmp) tmp = tmp[0].split(':');
                                if (tmp) {
                                    // display error
                                    console.error('ERROR: ' + err[0] + ' ==> ' + app.modules[name].main + ', line: '+ tmp[1] + ', character: '+ tmp[2]);
                                    console.log(e.stack);
                                } else {
                                    console.error('ERROR: ' + app.modules[name].main);
                                    console.log(e.stack);
                                }
                                if (typeof app.config.fail == 'function') app.config.fail(app.modules[name]);
                                if (typeof promise._fail == 'function') promise._fail(app.modules[name]);
                            }
                            // check ready
                            if (typeof app.config.ready == 'function') app.config.ready(app.modules[name]);
                            if (typeof promise._ready == 'function') promise._ready(app.modules[name]);
                            modCount--;
                            isFinished();
                        });
                    })(name);
                }
            }
        }, 1);
        // promise need to be returned immidiately
        return promise;

        function isFinished () {
            if (modCount == 0) {
                if (failed !== true) {
                    if (typeof app.config.done == 'function') app.config.done(app.modules[name]);
                    if (typeof promise._done == 'function') promise._done(app.modules[name]);
                    if (typeof callBack == 'function') callBack();
                }
                if (typeof app.config.always == 'function') app.config.always(app.modules[name]);
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
                $.ajax({
                    url        : path,
                    dataType: 'text',
                    cache    : false,
                    success : function (data, success, xhr) {
                        if (success != 'success') {
                            console.log('ERROR: error while getting a file '+ path +'.');
                            return;
                        }
                        bufferObj[path] = xhr.responseText;
                        loadDone();

                    },
                    error : function (data, err, errData) {
                        if (err == 'error') {
                            console.log('ERROR: failed to load '+ files[i] +'.');
                        } else {
                            console.log('ERROR: file "'+ files[i] + '" is loaded, but with a parsing error(s) in line '+ errData.line +': '+ errData.message);
                            bufferObj[path] = xhr.responseText;
                            loadDone();
                        }
                    }
                });
            })();
        }
        // internal counter
        function loadDone () {
            bufferLen--;
            if (bufferLen <= 0) callBack(bufferObj);
        }
    }
})();
/************************************************
*  Library: KickStart - Minimalistic Framework
*   - Dependencies: ks-core, jQuery
**/

kickStart.define({ name: 'route' });
kickStart.register('route', function () {
    var app = kickStart;
    // private scope
    var routes  = {};
    var routeRE = {};
    var options = { debug : false };

    addListener();
    return {
        add     : add,
        remove  : remove,
        go      : go,
        get     : get,
        process : process,
        list    : list
    }

    /*
    *    Public methods
    */

    function add (route, handler) {
        if (typeof route == 'object') {
            for (var r in route) {
                var tmp = String('/'+ r).replace(/\/{2,}/g, '/');
                routes[tmp] = route[r];
            }
            return app.route;
        }
        route = String('/'+route).replace(/\/{2,}/g, '/');
        routes[route] = handler;
        return app.route;
    }

    function remove (route) {
        route = String('/'+route).replace(/\/{2,}/g, '/');
        delete routes[route];
        delete routeRE[route];
        return app.route;
    }

    function go (route) {
        route = String('/'+route).replace(/\/{2,}/g, '/');
        setTimeout(function () { window.location.hash = route; }, 1);
        return app.route;        
    }

    function get () {
        return window.location.hash.substr(1).replace(/\/{2,}/g, '/');
    }

    function list () {
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

    function process () {
        prepare();
        // match routes
        var hash = window.location.hash.substr(1).replace(/\/{2,}/g, '/');
        if (hash == '') hash = '/';
        var tmp  = hash.split('/');
        // check if modules is loaed
        if (tmp[1] && typeof app[tmp[1]] == 'undefined') {
            if (options.debug) console.log('ROUTE: load module ' + tmp[1]);
            app.require(tmp[1]).done(function () {
                if (app.modules[tmp[1]]) process();
            });
        } else {
            // process route
            for (var r in routeRE) {
                var params = {};
                var tmp = routeRE[r].path.exec(hash);
                if (tmp) { // match
                    var i = 1;
                    for (var p in routeRE[r].keys) {
                        params[routeRE[r].keys[p].name] = tmp[i];
                        i++;
                    }
                    if (options.debug) console.log('ROUTE:', r, params);
                    routes[r](r, params);
                }
            }
        }
        return app.route;
    }

    /*
    *    Private methods
    */

    function prepare () {
        // make sure all routes are parsed to RegEx
        for (var r in routes) {
            if (routeRE[r]) continue;
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
            routeRE[r] = {
                path  : new RegExp('^' + path + '$', 'i'),
                keys  : keys
            }
        }        
    }

    function addListener () {
        if (window.addEventListener) {
            window.addEventListener('hashchange', process, false);
        } else {
            window.attachEvent('onhashchange', process);
        }
    }

    function removeListener () {
        if (window.removeEventListener) {
            window.removeEventListener('hashchange', process);
        } else {
            window.detachEvent('onhashchange', process);
        }
    }
});